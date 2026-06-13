---
spec_id: admin/sony-xra95-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony XRA95 Series BRAVIA Simple IP Control Spec"
manufacturer: Sony
model_family: "XRA95 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "XRA95 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference
  - https://pro-bravia.sony.net/remote-display-control/rest-api
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip
retrieved_at: 2026-06-09T02:38:08.814Z
last_checked_at: 2026-06-12T19:58:16.899Z
generated_at: 2026-06-12T19:58:16.899Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EU models ship in 3 RED-DA specification variants; per-variant command availability not enumerated in source."
  - "no multi-step sequences described in source"
  - "no safety warnings, interlocks, or power-on sequencing in source"
  - "firmware version compatibility not stated in source. EU model variant matrix (3 RED-DA specs) not enumerated in source."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:58:16.899Z
  matched_actions: 74
  action_count: 74
  confidence: medium
  summary: "All 74 spec actions matched wire-level tokens in source; transport confirmed (TCP 20060, 24-byte frame format); full coverage of protocol command catalogue. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-09
---

# Sony XRA95 Series BRAVIA Simple IP Control Spec

## Summary
Spec for Sony XRA95 Series BRAVIA Professional Displays using Sony's proprietary Simple IP Control (SSIP) protocol over TCP. Covers power, input, volume, mute, picture mute, scene setting, IR command pass-through, and basic network info queries/notify events on a fixed 24-byte framed message format.

<!-- UNRESOLVED: EU models ship in 3 RED-DA specification variants; per-variant command availability not enumerated in source. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
notes: "Fixed 24-byte message frame: 0x2A 0x53 (header) | 1 byte message type (C/E/A/N) | 4 bytes FourCC command | 16 bytes params | 0x0A (footer). See Data Format table in source."
```

## Traits
```yaml
powerable: true  # inferred from setPowerStatus, getPowerStatus, togglePowerStatus
routable: true   # inferred from setInput, getInput
queryable: true  # inferred from getPowerStatus, getAudioVolume, getAudioMute, getInput, getPictureMute, getSceneSetting, getBroadcastAddress, getMacAddress
levelable: true  # inferred from setAudioVolume (numeric 0..100)
```

## Actions
```yaml
- id: set_ircc_code
  label: setIrccCode - send IR remote code
  kind: action
  command: "*SCIRCC<XXXXXXXXXXXXXXX>\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "16 bytes, right-padded with 0x23 [#]"
  params:
    - name: code
      type: string
      description: "IR code per IR Commands table (e.g. Display=...5, Num1=...18, Volume Up=...30)"
  notes: "Encodes payload as `*S` + `C` + `IRCC` + 16 ASCII bytes + LF."

- id: set_power_status
  label: setPowerStatus
  kind: action
  command: "*SCPOWR0000000000000000\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "POWR"
    params: "0x30 (Standby/Off) or 0x31 (Active/On) at byte 22"
  params:
    - name: state
      type: enum
      values: [off, on]
      description: "0=Standby, 1=Active"

- id: get_power_status
  label: getPowerStatus
  kind: query
  command: "*SEPOWR################\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x45 [E]"
    fourcc: "POWR"
    params: "16 bytes #"

- id: toggle_power_status
  label: togglePowerStatus
  kind: action
  command: "*SCTPOW################\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "TPOW"
    params: "16 bytes #"

- id: set_audio_volume
  label: setAudioVolume
  kind: action
  command: "*SCVOLU00000000000000XX\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "VOLU"
    params: "16-digit left-padded decimal (e.g. 0000000000000029 = 41)"
  params:
    - name: level
      type: integer
      description: "Volume value, left-padded with '0' to 16 digits (e.g. 29 = volume 41)"

- id: get_audio_volume
  label: getAudioVolume
  kind: query
  command: "*SEVOLU################\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x45 [E]"
    fourcc: "VOLU"
    params: "16 bytes #"

- id: set_audio_mute
  label: setAudioMute
  kind: action
  command: "*SCAMUT000000000000000X\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "AMUT"
    params: "0=Unmute, 1=Mute at byte 22"
  params:
    - name: state
      type: enum
      values: [unmuted, muted]

- id: get_audio_mute
  label: getAudioMute
  kind: query
  command: "*SEAMUT################\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x45 [E]"
    fourcc: "AMUT"
    params: "16 bytes #"

- id: set_input
  label: setInput
  kind: action
  command: "*SCINPT00000000000T0XXXX\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "INPT"
    params: "T=1 HDMI, T=3 Composite, T=4 Component, T=5 Screen Mirroring; trailing XXXX = port 1..9999 (4-digit)"
  params:
    - name: input_type
      type: enum
      values: [hdmi, composite, component, screen_mirroring]
    - name: port
      type: integer
      description: "1..9999 (4-digit, e.g. 0001)"

- id: get_input
  label: getInput
  kind: query
  command: "*SEINPT################\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x45 [E]"
    fourcc: "INPT"
    params: "16 bytes #"

- id: set_picture_mute
  label: setPictureMute
  kind: action
  command: "*SCPMUT000000000000000X\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "PMUT"
    params: "0=disable, 1=enable (screen black) at byte 22"
  params:
    - name: state
      type: enum
      values: [disabled, enabled]

- id: get_picture_mute
  label: getPictureMute
  kind: query
  command: "*SEPMUT################\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x45 [E]"
    fourcc: "PMUT"
    params: "16 bytes #"

- id: toggle_picture_mute
  label: togglePictureMute
  kind: action
  command: "*SCTPMU################\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "TPMU"
    params: "16 bytes #"

- id: set_scene_setting
  label: setSceneSetting
  kind: action
  command: "*SCSCEN<XXXXXXXXXXXXXXX>\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "SCEN"
    params: "case-sensitive string, right-padded with 0x23 [#] to 16 bytes (e.g. auto24pSync#####)"
  params:
    - name: scene
      type: enum
      values: [auto, auto24pSync, general]

- id: get_scene_setting
  label: getSceneSetting
  kind: query
  command: "*SESCEN################\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x45 [E]"
    fourcc: "SCEN"
    params: "16 bytes #"

- id: get_broadcast_address
  label: getBroadcastAddress (eth0)
  kind: query
  command: "*SEBADRe t h 0##########\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x45 [E]"
    fourcc: "BADR"
    params: "ASCII 'eth0' (bytes 0x65 0x74 0x68 0x30) at bytes 7-10, rest #"
  notes: "EU models only (per source footnote)."

- id: get_mac_address
  label: getMacAddress (eth0)
  kind: query
  command: "*SEMADRe t h 0##########\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x45 [E]"
    fourcc: "MADR"
    params: "ASCII 'eth0' at bytes 7-10, rest #"
  notes: "EU models only (per source footnote)."

- id: ircc_display
  label: IR: Display
  kind: action
  command: "*SCIRCC0000000000000005\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "0x00...0x05 (last byte 0x05)"

- id: ircc_home
  label: IR: Home
  kind: action
  command: "*SCIRCC0000000000000006\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x06"

- id: ircc_options
  label: IR: Options
  kind: action
  command: "*SCIRCC0000000000000007\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x07"

- id: ircc_return
  label: IR: Return
  kind: action
  command: "*SCIRCC0000000000000008\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x08"

- id: ircc_up
  label: IR: Up
  kind: action
  command: "*SCIRCC0000000000000009\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x09"

- id: ircc_down
  label: IR: Down
  kind: action
  command: "*SCIRCC0000000000000010\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x10"

- id: ircc_right
  label: IR: Right
  kind: action
  command: "*SCIRCC0000000000000011\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x11"

- id: ircc_left
  label: IR: Left
  kind: action
  command: "*SCIRCC0000000000000012\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x12"

- id: ircc_confirm
  label: IR: Confirm
  kind: action
  command: "*SCIRCC0000000000000013\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x13"

- id: ircc_red
  label: IR: Red
  kind: action
  command: "*SCIRCC0000000000000014\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x14"

- id: ircc_green
  label: IR: Green
  kind: action
  command: "*SCIRCC0000000000000015\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x15"

- id: ircc_yellow
  label: IR: Yellow
  kind: action
  command: "*SCIRCC0000000000000016\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x16"

- id: ircc_blue
  label: IR: Blue
  kind: action
  command: "*SCIRCC0000000000000017\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x17"

- id: ircc_num1
  label: IR: Num1
  kind: action
  command: "*SCIRCC0000000000000018\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x18"

- id: ircc_num2
  label: IR: Num2
  kind: action
  command: "*SCIRCC0000000000000019\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x19"

- id: ircc_num3
  label: IR: Num3
  kind: action
  command: "*SCIRCC0000000000000020\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x20"

- id: ircc_num4
  label: IR: Num4
  kind: action
  command: "*SCIRCC0000000000000021\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x21"

- id: ircc_num5
  label: IR: Num5
  kind: action
  command: "*SCIRCC0000000000000022\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x22"

- id: ircc_num6
  label: IR: Num6
  kind: action
  command: "*SCIRCC0000000000000023\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x23"

- id: ircc_num7
  label: IR: Num7
  kind: action
  command: "*SCIRCC0000000000000024\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x24"

- id: ircc_num8
  label: IR: Num8
  kind: action
  command: "*SCIRCC0000000000000025\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x25"

- id: ircc_num9
  label: IR: Num9
  kind: action
  command: "*SCIRCC0000000000000026\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x26"

- id: ircc_num0
  label: IR: Num0
  kind: action
  command: "*SCIRCC0000000000000027\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x27"

- id: ircc_volume_up
  label: IR: Volume Up
  kind: action
  command: "*SCIRCC0000000000000030\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x30"

- id: ircc_volume_down
  label: IR: Volume Down
  kind: action
  command: "*SCIRCC0000000000000031\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x31"

- id: ircc_mute
  label: IR: Mute
  kind: action
  command: "*SCIRCC0000000000000032\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x32"

- id: ircc_channel_up
  label: IR: Channel Up
  kind: action
  command: "*SCIRCC0000000000000033\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x33"

- id: ircc_channel_down
  label: IR: Channel Down
  kind: action
  command: "*SCIRCC0000000000000034\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x34"

- id: ircc_subtitle
  label: IR: Subtitle
  kind: action
  command: "*SCIRCC0000000000000035\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x35"

- id: ircc_dot
  label: IR: DOT
  kind: action
  command: "*SCIRCC0000000000000038\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x38"

- id: ircc_picture_off
  label: IR: Picture Off
  kind: action
  command: "*SCIRCC0000000000000050\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x50"

- id: ircc_wide
  label: IR: Wide
  kind: action
  command: "*SCIRCC0000000000000061\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x61"

- id: ircc_jump
  label: IR: Jump
  kind: action
  command: "*SCIRCC0000000000000062\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x62"

- id: ircc_sync_menu
  label: IR: Sync Menu
  kind: action
  command: "*SCIRCC0000000000000076\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x76"

- id: ircc_forward
  label: IR: Forward
  kind: action
  command: "*SCIRCC0000000000000077\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x77"

- id: ircc_play
  label: IR: Play
  kind: action
  command: "*SCIRCC0000000000000078\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x78"

- id: ircc_rewind
  label: IR: Rewind
  kind: action
  command: "*SCIRCC0000000000000079\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x79"

- id: ircc_prev
  label: IR: Prev
  kind: action
  command: "*SCIRCC0000000000000080\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x80"

- id: ircc_stop
  label: IR: Stop
  kind: action
  command: "*SCIRCC0000000000000081\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x81"

- id: ircc_next
  label: IR: Next
  kind: action
  command: "*SCIRCC0000000000000082\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x82"

- id: ircc_pause
  label: IR: Pause
  kind: action
  command: "*SCIRCC0000000000000084\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x84"

- id: ircc_flash_plus
  label: IR: Flash Plus
  kind: action
  command: "*SCIRCC0000000000000086\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x86"

- id: ircc_flash_minus
  label: IR: Flash Minus
  kind: action
  command: "*SCIRCC0000000000000087\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x87"

- id: ircc_tv_power
  label: IR: TV Power
  kind: action
  command: "*SCIRCC0000000000000098\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x98"

- id: ircc_audio
  label: IR: Audio
  kind: action
  command: "*SCIRCC0000000000000099\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x99"

- id: ircc_input
  label: IR: Input
  kind: action
  command: "*SCIRCC0000000000000101\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x01, byte 21 = 0x01"

- id: ircc_sleep
  label: IR: Sleep
  kind: action
  command: "*SCIRCC0000000000000104\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x04, byte 21 = 0x01"

- id: ircc_sleep_timer
  label: IR: Sleep Timer
  kind: action
  command: "*SCIRCC0000000000000105\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x05, byte 21 = 0x01"

- id: ircc_video_2
  label: IR: Video 2
  kind: action
  command: "*SCIRCC0000000000000108\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x08, byte 21 = 0x01"

- id: ircc_picture_mode
  label: IR: Picture Mode
  kind: action
  command: "*SCIRCC0000000000000110\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x10, byte 21 = 0x01"

- id: ircc_demo_surround
  label: IR: Demo Surround
  kind: action
  command: "*SCIRCC0000000000000121\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x21, byte 21 = 0x01"

- id: ircc_hdmi_1
  label: IR: HDMI 1
  kind: action
  command: "*SCIRCC0000000000000124\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x24, byte 21 = 0x01"

- id: ircc_hdmi_2
  label: IR: HDMI 2
  kind: action
  command: "*SCIRCC0000000000000125\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x25, byte 21 = 0x01"

- id: ircc_hdmi_3
  label: IR: HDMI 3
  kind: action
  command: "*SCIRCC0000000000000126\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x26, byte 21 = 0x01"

- id: ircc_hdmi_4
  label: IR: HDMI 4
  kind: action
  command: "*SCIRCC0000000000000127\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x27, byte 21 = 0x01"

- id: ircc_action_menu
  label: IR: Action Menu
  kind: action
  command: "*SCIRCC0000000000000129\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x29, byte 21 = 0x01"

- id: ircc_help
  label: IR: Help
  kind: action
  command: "*SCIRCC0000000000000130\n"
  command_template:
    header: "0x2A 0x53"
    type: "0x43 [C]"
    fourcc: "IRCC"
    params: "last byte 0x30, byte 21 = 0x01"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  source_command: getPowerStatus
  notes: "Answer byte 22: 0=Standby, 1=Active."

- id: audio_volume
  type: integer
  source_command: getAudioVolume
  notes: "Answer 16-byte left-padded decimal volume value."

- id: audio_mute
  type: enum
  values: [unmuted, muted]
  source_command: getAudioMute
  notes: "Answer byte 22: 0=Not Muted, 1=Muted."

- id: input_state
  type: integer
  source_command: getInput
  notes: "Answer encodes input type at byte 14 and 4-digit port at bytes 19-22. Types: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring."

- id: picture_mute
  type: enum
  values: [disabled, enabled]
  source_command: getPictureMute
  notes: "Answer byte 22: 0=Disabled, 1=Enabled."

- id: scene_setting
  type: string
  source_command: getSceneSetting
  notes: "Answer 16-byte value, right-padded with 0x23. Values: auto, auto24pSync, general."

- id: broadcast_address
  type: string
  source_command: getBroadcastAddress
  notes: "EU models only. Answer encodes IPv4 + padding."

- id: mac_address
  type: string
  source_command: getMacAddress
  notes: "EU models only. Answer encodes MAC + right-pad 0x23."
```

## Events
```yaml
- id: fire_power_change
  type: notify
  command: "*SNPOWR000000000000000X\n"
  notes: "Sent when power state changes. Byte 22: 0=powering off, 1=powering on."

- id: fire_input_change
  type: notify
  command: "*SNINPT<00000000T0XXXX>\n"
  notes: "Sent when input changes. Encoding matches getInput answer (T=1/3/4/5, port 1-9999)."

- id: fire_volume_change
  type: notify
  command: "*SNVOLU<XXXXXXXXXXXXXXX>\n"
  notes: "Sent when volume changes. 16-byte left-padded decimal value."

- id: fire_mute_change
  type: notify
  command: "*SNAMUT000000000000000X\n"
  notes: "Sent on mute toggle. Byte 22: 0=unmuting, 1=muting."

- id: fire_picture_mute_change
  type: notify
  command: "*SNPMUT000000000000000X\n"
  notes: "Sent on picture mute toggle. Byte 22: 0=enabled, 1=disabled (per source)."

- id: error_response
  type: answer
  command: "*SA????FFFFFFFFFFFFFFFFFF\n"
  notes: "All-zero answer = success. All-F answer = error (e.g. invalid parameters)."
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing in source
```

## Notes
EU models ship in 3 RED-DA specification variants; per-variant command availability differs — see https://pro-bravia.sony.net/setup/device-settings/red-da/. Protocol is Sony-proprietary "SSIP" (BRAVIA Professional Displays). All commands fit a 24-byte fixed frame: `0x2A 0x53` (header) + 1 byte type (C/E/A/N) + 4 byte FourCC + 16 byte params + `0x0A` (footer). Enable path on display: Settings → Network & Internet → Remote device settings → Control remotely, then Settings → Network & Internet → Home network → IP control → Simple IP control. No auth required (inferred).

<!-- UNRESOLVED: firmware version compatibility not stated in source. EU model variant matrix (3 RED-DA specs) not enumerated in source. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference
  - https://pro-bravia.sony.net/remote-display-control/rest-api
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip
retrieved_at: 2026-06-09T02:38:08.814Z
last_checked_at: 2026-06-12T19:58:16.899Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:58:16.899Z
matched_actions: 74
action_count: 74
confidence: medium
summary: "All 74 spec actions matched wire-level tokens in source; transport confirmed (TCP 20060, 24-byte frame format); full coverage of protocol command catalogue. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EU models ship in 3 RED-DA specification variants; per-variant command availability not enumerated in source."
- "no multi-step sequences described in source"
- "no safety warnings, interlocks, or power-on sequencing in source"
- "firmware version compatibility not stated in source. EU model variant matrix (3 RED-DA specs) not enumerated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
