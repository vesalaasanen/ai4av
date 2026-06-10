---
spec_id: admin/sony-kdxh9288-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KD-XH9288 Series Control Spec"
manufacturer: Sony
model_family: KD-65XH9288
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - KD-65XH9288
    - KD-75XH9288
    - KD-85XH9288
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command
  - https://pro-bravia.sony.net
retrieved_at: 2026-06-10T01:17:06.564Z
last_checked_at: 2026-06-10T07:44:38.155Z
generated_at: 2026-06-10T07:44:38.155Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EU models have 3 specification variants per RED-DA compliance; per-variant command availability is not detailed in the source."
  - "getBroadcastAddress` and `getMacAddress` are footnoted as EU-model variants in the source; behavior on other regional models is unspecified."
  - "no settable parameter values outside the discrete actions above are documented in the source."
  - "no multi-step sequences described in the source."
  - "source contains no safety warnings, interlocks, or power-on sequencing requirements."
  - "firmware version compatibility not stated in source."
  - "baud rate / data bits / parity / stop bits are not applicable — protocol is TCP/IP, not serial."
verification:
  verdict: verified
  checked_at: 2026-06-10T07:44:38.155Z
  matched_actions: 74
  action_count: 74
  confidence: medium
  summary: "All 74 spec actions matched verbatim in source with correct FourCC codes and IR parameter values; all notify commands represented in Feedbacks/Events; transport port 20060 confirmed. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-10
---

# Sony KD-XH9288 Series Control Spec

## Summary
Spec covers Sony BRAVIA Professional Displays Simple IP Control (SSIP) over TCP for the KD-XH9288 series. Each message is a fixed 24-byte frame consisting of a 2-byte header, 1-byte message type, 4-byte Four-CC command, 16-byte parameter, and 1-byte LF footer. No login or authentication is required; the monitor must have Remote Device Control and Simple IP Control enabled.

<!-- UNRESOLVED: EU models have 3 specification variants per RED-DA compliance; per-variant command availability is not detailed in the source. -->
<!-- UNRESOLVED: `getBroadcastAddress` and `getMacAddress` are footnoted as EU-model variants in the source; behavior on other regional models is unspecified. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from setPowerStatus / togglePowerStatus / firePowerChange
- routable   # inferred from setInput / getInput / fireInputChange
- queryable  # inferred from getPowerStatus, getInput, getAudioVolume, getAudioMute, getPictureMute, getSceneSetting
- levelable  # inferred from setAudioVolume / getAudioVolume
```

## Actions
```yaml
# Frame template for all actions:
#   0x2A 0x53  <MsgType>  <FourCC>  <Param 16 bytes>  0x0A
# MsgType: C = 0x43 (control), E = 0x45 (enquiry), N = 0x4E (notify), A = 0x41 (answer)
# All frames are 24 bytes total. Parameters are ASCII '0'/'F'/'#' or X-pad-by-'#'.

# --- Power ---
- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR0000000000000000\n"  # 0=Standby, 1=Active
  params:
    - name: state
      type: integer
      values: [0, 1]
      description: "0 = Standby (Off), 1 = Active (On); padded as 16 ASCII chars ending in 0 or 1"

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################\n"
  params: []

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################\n"
  params: []

# --- IR codes (remote control emul) ---
- id: set_ircc_code
  label: Send IR Remote Code
  kind: action
  command: "*SCIRCC{code}##########\n"
  params:
    - name: code
      type: integer
      description: "IR code decimal value, 16 ASCII chars, right-padded with '0' (see IR Commands table)"

# IR sub-commands (one per documented code, all use C IRCC with the code in the last 2 digits)
- id: ir_display
  label: IR Display
  kind: action
  command: "*SCIRCC0000000000000005\n"
  params: []
- id: ir_home
  label: IR Home
  kind: action
  command: "*SCIRCC0000000000000006\n"
  params: []
- id: ir_options
  label: IR Options
  kind: action
  command: "*SCIRCC0000000000000007\n"
  params: []
- id: ir_return
  label: IR Return
  kind: action
  command: "*SCIRCC0000000000000008\n"
  params: []
- id: ir_up
  label: IR Up
  kind: action
  command: "*SCIRCC0000000000000009\n"
  params: []
- id: ir_down
  label: IR Down
  kind: action
  command: "*SCIRCC0000000000000010\n"
  params: []
- id: ir_right
  label: IR Right
  kind: action
  command: "*SCIRCC0000000000000011\n"
  params: []
- id: ir_left
  label: IR Left
  kind: action
  command: "*SCIRCC0000000000000012\n"
  params: []
- id: ir_confirm
  label: IR Confirm
  kind: action
  command: "*SCIRCC0000000000000013\n"
  params: []
- id: ir_red
  label: IR Red
  kind: action
  command: "*SCIRCC0000000000000014\n"
  params: []
- id: ir_green
  label: IR Green
  kind: action
  command: "*SCIRCC0000000000000015\n"
  params: []
- id: ir_yellow
  label: IR Yellow
  kind: action
  command: "*SCIRCC0000000000000016\n"
  params: []
- id: ir_blue
  label: IR Blue
  kind: action
  command: "*SCIRCC0000000000000017\n"
  params: []
- id: ir_num1
  label: IR Num 1
  kind: action
  command: "*SCIRCC0000000000000018\n"
  params: []
- id: ir_num2
  label: IR Num 2
  kind: action
  command: "*SCIRCC0000000000000019\n"
  params: []
- id: ir_num3
  label: IR Num 3
  kind: action
  command: "*SCIRCC0000000000000020\n"
  params: []
- id: ir_num4
  label: IR Num 4
  kind: action
  command: "*SCIRCC0000000000000021\n"
  params: []
- id: ir_num5
  label: IR Num 5
  kind: action
  command: "*SCIRCC0000000000000022\n"
  params: []
- id: ir_num6
  label: IR Num 6
  kind: action
  command: "*SCIRCC0000000000000023\n"
  params: []
- id: ir_num7
  label: IR Num 7
  kind: action
  command: "*SCIRCC0000000000000024\n"
  params: []
- id: ir_num8
  label: IR Num 8
  kind: action
  command: "*SCIRCC0000000000000025\n"
  params: []
- id: ir_num9
  label: IR Num 9
  kind: action
  command: "*SCIRCC0000000000000026\n"
  params: []
- id: ir_num0
  label: IR Num 0
  kind: action
  command: "*SCIRCC0000000000000027\n"
  params: []
- id: ir_volume_up
  label: IR Volume Up
  kind: action
  command: "*SCIRCC0000000000000030\n"
  params: []
- id: ir_volume_down
  label: IR Volume Down
  kind: action
  command: "*SCIRCC0000000000000031\n"
  params: []
- id: ir_mute
  label: IR Mute
  kind: action
  command: "*SCIRCC0000000000000032\n"
  params: []
- id: ir_channel_up
  label: IR Channel Up
  kind: action
  command: "*SCIRCC0000000000000033\n"
  params: []
- id: ir_channel_down
  label: IR Channel Down
  kind: action
  command: "*SCIRCC0000000000000034\n"
  params: []
- id: ir_subtitle
  label: IR Subtitle
  kind: action
  command: "*SCIRCC0000000000000035\n"
  params: []
- id: ir_dot
  label: IR DOT
  kind: action
  command: "*SCIRCC0000000000000038\n"
  params: []
- id: ir_picture_off
  label: IR Picture Off
  kind: action
  command: "*SCIRCC0000000000000050\n"
  params: []
- id: ir_wide
  label: IR Wide
  kind: action
  command: "*SCIRCC0000000000000061\n"
  params: []
- id: ir_jump
  label: IR Jump
  kind: action
  command: "*SCIRCC0000000000000062\n"
  params: []
- id: ir_sync_menu
  label: IR Sync Menu
  kind: action
  command: "*SCIRCC0000000000000076\n"
  params: []
- id: ir_forward
  label: IR Forward
  kind: action
  command: "*SCIRCC0000000000000077\n"
  params: []
- id: ir_play
  label: IR Play
  kind: action
  command: "*SCIRCC0000000000000078\n"
  params: []
- id: ir_rewind
  label: IR Rewind
  kind: action
  command: "*SCIRCC0000000000000079\n"
  params: []
- id: ir_prev
  label: IR Prev
  kind: action
  command: "*SCIRCC0000000000000080\n"
  params: []
- id: ir_stop
  label: IR Stop
  kind: action
  command: "*SCIRCC0000000000000081\n"
  params: []
- id: ir_next
  label: IR Next
  kind: action
  command: "*SCIRCC0000000000000082\n"
  params: []
- id: ir_pause
  label: IR Pause
  kind: action
  command: "*SCIRCC0000000000000084\n"
  params: []
- id: ir_flash_plus
  label: IR Flash Plus
  kind: action
  command: "*SCIRCC0000000000000086\n"
  params: []
- id: ir_flash_minus
  label: IR Flash Minus
  kind: action
  command: "*SCIRCC0000000000000087\n"
  params: []
- id: ir_tv_power
  label: IR TV Power
  kind: action
  command: "*SCIRCC0000000000000098\n"
  params: []
- id: ir_audio
  label: IR Audio
  kind: action
  command: "*SCIRCC0000000000000099\n"
  params: []
- id: ir_input
  label: IR Input
  kind: action
  command: "*SCIRCC0000000000000101\n"
  params: []
- id: ir_sleep
  label: IR Sleep
  kind: action
  command: "*SCIRCC0000000000000104\n"
  params: []
- id: ir_sleep_timer
  label: IR Sleep Timer
  kind: action
  command: "*SCIRCC0000000000000105\n"
  params: []
- id: ir_video_2
  label: IR Video 2
  kind: action
  command: "*SCIRCC0000000000000108\n"
  params: []
- id: ir_picture_mode
  label: IR Picture Mode
  kind: action
  command: "*SCIRCC0000000000000110\n"
  params: []
- id: ir_demo_surround
  label: IR Demo Surround
  kind: action
  command: "*SCIRCC0000000000000121\n"
  params: []
- id: ir_hdmi_1
  label: IR HDMI 1
  kind: action
  command: "*SCIRCC0000000000000124\n"
  params: []
- id: ir_hdmi_2
  label: IR HDMI 2
  kind: action
  command: "*SCIRCC0000000000000125\n"
  params: []
- id: ir_hdmi_3
  label: IR HDMI 3
  kind: action
  command: "*SCIRCC0000000000000126\n"
  params: []
- id: ir_hdmi_4
  label: IR HDMI 4
  kind: action
  command: "*SCIRCC0000000000000127\n"
  params: []
- id: ir_action_menu
  label: IR Action Menu
  kind: action
  command: "*SCIRCC0000000000000129\n"
  params: []
- id: ir_help
  label: IR Help
  kind: action
  command: "*SCIRCC0000000000000130\n"
  params: []

# --- Audio Volume ---
- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{volume}########\n"
  params:
    - name: volume
      type: integer
      description: "Volume value, decimal, right-aligned in 16 ASCII chars, left-padded with '0' (e.g. 41 = 0000000000000029)"

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################\n"
  params: []

# --- Audio Mute ---
- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT00000000000000{mute}\n"
  params:
    - name: mute
      type: integer
      values: [0, 1]
      description: "0 = Unmute, 1 = Mute"

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################\n"
  params: []

# --- Input ---
- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT0000000000{src}00{n}####\n"
  params:
    - name: src
      type: integer
      values: [1, 3, 4, 5]
      description: "Source type: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring"
    - name: n
      type: integer
      description: "Source instance number, 1-9999, decimal, right-aligned in 4 ASCII chars"

- id: get_input
  label: Get Current Input
  kind: query
  command: "*SEINPT################\n"
  params: []

# --- Picture Mute ---
- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT00000000000000{state}\n"
  params:
    - name: state
      type: integer
      values: [0, 1]
      description: "0 = Picture mute off, 1 = Picture mute on"

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "*SEPMUT################\n"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################\n"
  params: []

# --- Scene Setting ---
- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{pad}############\n"
  params:
    - name: pad
      type: string
      description: "Scene name: 'auto', 'auto24pSync', or 'general'; case-sensitive, right-padded with '#' to 16 chars total"

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################\n"
  params: []

# --- Network info (EU-model footnoted; behavior elsewhere UNRESOLVED) ---
- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "*SEBADReth0############\n"
  params:
    - name: interface
      type: string
      values: ["eth0"]
      description: "Interface name; only 'eth0' documented in source"

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADReth0############\n"
  params:
    - name: interface
      type: string
      values: ["eth0"]
      description: "Interface name; only 'eth0' documented in source"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  description: "Returned by getPowerStatus answer (0=Standby, 1=Active) and by firePowerChange notify (0=powering off, 1=powering on)"
- id: audio_volume
  type: integer
  description: "Returned by getAudioVolume answer as 16 ASCII decimal chars; also broadcast by fireVolumeChange"
- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
  description: "Returned by getAudioMute answer (0=Unmuted, 1=Muted) and by fireMuteChange notify (0=unmuting, 1=muting)"
- id: current_input
  type: object
  description: "Returned by getInput answer: 8-digit source type (00000001 HDMI, 00000003 Composite, 00000004 Component, 00000005 Screen Mirroring) + 4-digit source instance 0001-9999"
- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  description: "Returned by getPictureMute answer (0=Disabled, 1=Enabled); firePictureMuteChange uses 0=enabled, 1=disabled (source has this asymmetry)"
- id: scene_setting
  type: string
  description: "Returned by getSceneSetting answer as a Scene name string"
- id: control_result
  type: enum
  values: [success, not_found, error]
  description: "Generic A-frame (0x41) feedback: '0000000000000000' = success, 'NNNNNNNNNNNNNNNN' = not found/not available, 'FFFFFFFFFFFFFFFF' = error"
- id: broadcast_address
  type: string
  description: "Returned by getBroadcastAddress answer: IPv4 address, right-padded with '#' to 16 chars"
- id: mac_address
  type: string
  description: "Returned by getMacAddress answer: MAC address, right-padded with '#' to 16 chars"
```

## Variables
```yaml
# UNRESOLVED: no settable parameter values outside the discrete actions above are documented in the source.
```

## Events
```yaml
# Notify frames (MsgType N = 0x4E) are unsolicited push from monitor to client.
- id: fire_power_change
  type: enum
  values: [powering_off, powering_on]
  description: "Notify N-POWR: 0 = power off, 1 = power on"
- id: fire_input_change
  type: object
  description: "Notify N-INPT: 8-digit source type + 4-digit source instance"
- id: fire_volume_change
  type: integer
  description: "Notify N-VOLU: new volume value (16 ASCII decimal chars)"
- id: fire_mute_change
  type: enum
  values: [unmuting, muting]
  description: "Notify N-AMUT: 0 = unmuting, 1 = muting"
- id: fire_picture_mute_change
  type: enum
  values: [enabled, disabled]
  description: "Notify N-PMUT: 0 = picture mute enabled, 1 = picture mute disabled"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing requirements.
```

## Notes
- All frames are exactly 24 bytes. Outbound ASCII frames above show literal '\n' as the byte 0x0A footer; implementations must send the LF byte, not a literal backslash-n.
- Header bytes are fixed 0x2A ('*') and 0x53 ('S'). Footer is fixed 0x0A (LF).
- Message Type byte: 0x43 'C' (control), 0x45 'E' (enquiry), 0x41 'A' (answer), 0x4E 'N' (notify).
- A-frame (answer) parameter values: 16 ASCII '0' chars = success; 16 ASCII 'F' chars = error; 16 ASCII 'N' chars = not found / not available for current input. Specific commands may encode the result in the parameter (e.g. POWR 0/1, INPT src+number).
- For setInput, the source documents a byte-7 to byte-22 layout of `000000000{src}00{n}####` (7 leading zeros, 1-digit src at byte 14, 2 zeros, 4-digit n, then 4 '#' placeholders) — implementations should pad trailing bytes per the source's `setInput` row.
- EU models only: `getBroadcastAddress` and `getMacAddress` carry an EU-model footnote. Whether they are available on non-EU regional variants is not stated in the source.
- EU area models have 3 specification variants per RED-DA compliance; per-variant command availability is not detailed in the source. See https://pro-bravia.sony.net/setup/device-settings/red-da/ for the official per-spec list.
- Monitor must have [Settings]→[Network & Internet]→[Remote device settings]→[Control remotely] and [Settings]→[Network & Internet]→[Home network]→[IP control]→[Simple IP control] both enabled before commands are accepted.
- SSIP stands for the BRAVIA Professional Displays proprietary protocol (per the source's "Simple and Efficient Command Format" section).
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: baud rate / data bits / parity / stop bits are not applicable — protocol is TCP/IP, not serial. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command
  - https://pro-bravia.sony.net
retrieved_at: 2026-06-10T01:17:06.564Z
last_checked_at: 2026-06-10T07:44:38.155Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T07:44:38.155Z
matched_actions: 74
action_count: 74
confidence: medium
summary: "All 74 spec actions matched verbatim in source with correct FourCC codes and IR parameter values; all notify commands represented in Feedbacks/Events; transport port 20060 confirmed. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EU models have 3 specification variants per RED-DA compliance; per-variant command availability is not detailed in the source."
- "getBroadcastAddress` and `getMacAddress` are footnoted as EU-model variants in the source; behavior on other regional models is unspecified."
- "no settable parameter values outside the discrete actions above are documented in the source."
- "no multi-step sequences described in the source."
- "source contains no safety warnings, interlocks, or power-on sequencing requirements."
- "firmware version compatibility not stated in source."
- "baud rate / data bits / parity / stop bits are not applicable — protocol is TCP/IP, not serial."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
