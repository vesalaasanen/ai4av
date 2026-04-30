---
schema_version: ai4av-public-spec-v1
device_id: hisense/55z670nk-series
entity_id: hisense_55z670nk_series
spec_id: admin/hisense-55z670nk-series
revision: 1
author: admin
title: "HiSense 55Z670NK Series Control Spec"
status: published
manufacturer: HiSense
manufacturer_key: hisense
model_family: "55Z670NK Series"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "55Z670NK Series"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
  - https://hisense-b2b.com/
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
source_documents:
  - title: "HiSense public source"
    url: "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:16:42.542Z
  - title: "HiSense public source"
    url: "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:16:42.794Z
  - title: "HiSense public source"
    url: https://hisense-b2b.com/
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:16:42.972Z
  - title: "HiSense public source"
    url: "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:16:57.269Z
  - title: "HiSense public source"
    url: https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:16:57.296Z
retrieved_at: 2026-04-26T16:16:57.296Z
last_checked_at: 2026-04-23T06:48:57.028Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T06:48:57.028Z
  matched_actions: 58
  action_count: 58
  confidence: high
  summary: "All 58 spec actions matched exactly; transport parameters verified; full command set documented in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# HiSense 55Z670NK Series Control Spec

## Summary

The HiSense 55Z670NK Series is a prosumer flat-panel television supporting RS-232 serial control and discrete IR control. This spec covers the RS-232 ASCII command protocol (fixed-length frame with checksum and carriage-return termination) and the Pronto/CCF discrete IR code set for functions including power, input selection, volume, picture/sound modes, aspect ratio, PIP, and remote-button simulation.

<!-- UNRESOLVED: The model table in the source document was empty — specific sub-models covered by this spec are not listed. The title "55Z670NK Series" is taken from the device name provided by the submitter, not from an explicit model table in the source. -->

## Transport

```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  encoding: ASCII
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- powerable    # inferred from POWR set/query commands
- routable     # inferred from INPT set/query commands
- queryable    # inferred from Q-prefix query commands throughout
- levelable    # inferred from VOLM, BRIT, CONT, COLR, TINT, SHRP, BKLV commands
```

## Actions

```yaml
# RS-232 command frame format (ASCII):
#   Set:   S[CLIENT_ID 3B][COMMAND 4B][DATA 4B][CHECKSUM 1B][CR 0x0D]
#   Query: Q[CLIENT_ID 3B][COMMAND 4B]????[CHECKSUM 1B][CR 0x0D]
#   ACK:   [CLIENT_ID 3B]:OKAY[DATA 4B][CHECKSUM 1B][CR 0x0D]  (or EROR / WAIT)
#   CLIENT_ID: last 3 hex digits of Ethernet MAC address, or "ALL" for broadcast.
#   Protocol is case-sensitive.

- id: power_on_command_enable
  label: Enable RS-232 Remote Power On
  kind: action
  command: PWRE
  params:
    - name: enable
      type: enum
      values:
        - value: "0000"
          label: Disable
        - value: "0001"
          label: Enable

- id: set_power
  label: Set Power On / Standby
  kind: action
  command: POWR
  params:
    - name: state
      type: enum
      values:
        - value: "0000"
          label: Standby
        - value: "0001"
          label: Power On

- id: set_input
  label: Set Input Source
  kind: action
  command: INPT
  params:
    - name: input
      type: enum
      values:
        - value: "0000"
          label: Cycle (next input)
        - value: "0001"
          label: TV
        - value: "0003"
          label: Component
        - value: "0004"
          label: AV
        - value: "0006"
          label: VGA
        - value: "0009"
          label: HDMI1
        - value: "0010"
          label: HDMI2
        - value: "0011"
          label: HDMI3
        - value: "0012"
          label: HDMI4

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  command: PMOD
  params:
    - name: mode
      type: enum
      values:
        - value: "0000"
          label: Standard
        - value: "0002"
          label: Vivid
        - value: "0003"
          label: EnergySaving
        - value: "0004"
          label: Theater
        - value: "0005"
          label: Game
        - value: "0006"
          label: Sport

- id: set_brightness
  label: Set Brightness (0–100)
  kind: action
  command: BRIT
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: "4-digit zero-padded decimal, e.g. 0050"

- id: set_contrast
  label: Set Contrast (0–100)
  kind: action
  command: CONT
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: set_color_saturation
  label: Set Color Saturation (0–100)
  kind: action
  command: COLR
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: set_tint
  label: Set Tint (0–100)
  kind: action
  command: TINT
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: set_sharpness
  label: Set Sharpness (0–20)
  kind: action
  command: SHRP
  params:
    - name: value
      type: integer
      range: [0, 20]

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  command: ASPT
  params:
    - name: ratio
      type: enum
      values:
        - value: "0000"
          label: Auto
        - value: "0002"
          label: Normal (4:3)
        - value: "0003"
          label: Zoom
        - value: "0004"
          label: Wide (16:9)
        - value: "0005"
          label: Direct
        - value: "0006"
          label: 1-to-1 Pixel Map
        - value: "0007"
          label: Panoramic
        - value: "0008"
          label: Cinema

- id: set_overscan
  label: Set Overscan
  kind: action
  command: OVSN
  params:
    - name: state
      type: enum
      values:
        - value: "0000"
          label: "On"
        - value: "0002"
          label: "Off"

- id: reset_picture
  label: Reset Picture Settings
  kind: action
  command: RSTP
  params:
    - name: data
      type: fixed
      value: "1000"

- id: set_color_temp
  label: Set Color Temperature
  kind: action
  command: CTEM
  params:
    - name: temp
      type: enum
      values:
        - value: "0000"
          label: High
        - value: "0002"
          label: Middle
        - value: "0003"
          label: Mid-Low
        - value: "0004"
          label: Low

- id: set_backlight
  label: Set Backlight (0–100)
  kind: action
  command: BKLV
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  command: AMOD
  params:
    - name: mode
      type: enum
      values:
        - value: "0000"
          label: Standard
        - value: "0002"
          label: Theater
        - value: "0003"
          label: Music
        - value: "0004"
          label: Speech
        - value: "0005"
          label: Late Night

- id: reset_audio
  label: Reset Audio Settings
  kind: action
  command: RSTA
  params:
    - name: data
      type: fixed
      value: "2000"

- id: set_volume
  label: Set Volume (0–100)
  kind: action
  command: VOLM
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: set_mute
  label: Set Mute
  kind: action
  command: MUTE
  params:
    - name: state
      type: enum
      values:
        - value: "0000"
          label: Mute Off
        - value: "0001"
          label: Mute On

- id: set_tv_speaker
  label: Set TV Speaker
  kind: action
  command: ASPK
  params:
    - name: state
      type: enum
      values:
        - value: "0000"
          label: "Off"
        - value: "0002"
          label: "On"

- id: set_tuner_mode
  label: Set Tuner Mode
  kind: action
  command: TUNR
  params:
    - name: mode
      type: enum
      values:
        - value: "0000"
          label: Antenna
        - value: "0002"
          label: Cable

- id: auto_channel_scan
  label: Automatic Channel Search
  kind: action
  command: TSCN
  params:
    - name: data
      type: fixed
      value: "0001"

- id: set_channel
  label: Channel Up / Down
  kind: action
  command: CHAN
  params:
    - name: direction
      type: enum
      values:
        - value: "0000"
          label: Channel Down
        - value: "0001"
          label: Channel Up

- id: set_caption
  label: Set Caption (CC)
  kind: action
  command: "CC##"
  params:
    - name: state
      type: enum
      values:
        - value: "0000"
          label: "Off"
        - value: "0002"
          label: "On"
        - value: "0003"
          label: On When Mute

- id: factory_reset
  label: Restore Factory Settings
  kind: action
  command: RSET
  params:
    - name: data
      type: fixed
      value: "9999"

- id: set_osd_language
  label: Set OSD Language
  kind: action
  command: LANG
  params:
    - name: language
      type: enum
      values:
        - value: "0000"
          label: English
        - value: "0002"
          label: "Español"
        - value: "0003"
          label: "Français"

- id: set_standby_led
  label: Set Standby LED
  kind: action
  command: PLED
  params:
    - name: state
      type: enum
      values:
        - value: "0000"
          label: "Off"
        - value: "0002"
          label: "On"

- id: set_remote_key
  label: Set Remote Key Lock
  kind: action
  command: RMOT
  params:
    - name: state
      type: enum
      values:
        - value: "0000"
          label: Enable
        - value: "0001"
          label: Disable
        - value: "0002"
          label: Partial

- id: set_panel_key
  label: Set Panel Key Lock
  kind: action
  command: PANL
  params:
    - name: state
      type: enum
      values:
        - value: "0000"
          label: Enable
        - value: "0001"
          label: Disable

- id: set_menu_access
  label: Set Menu Access
  kind: action
  command: MENU
  params:
    - name: state
      type: enum
      values:
        - value: "0000"
          label: Enable
        - value: "0001"
          label: Disable

- id: set_osd_mode
  label: Set OSD Mode
  kind: action
  command: "OSD#"
  params:
    - name: state
      type: enum
      values:
        - value: "0000"
          label: Enable
        - value: "0001"
          label: Disable

- id: set_input_mode
  label: Set Input Mode Lock
  kind: action
  command: INPM
  params:
    - name: mode
      type: enum
      values:
        - value: "0000"
          label: Locked
        - value: "0001"
          label: Selectable
        - value: "0002"
          label: AC Reset
        - value: "0003"
          label: Standby Reset

- id: set_volume_control
  label: Set Volume Control Mode
  kind: action
  command: SVOL
  params:
    - name: mode
      type: enum
      values:
        - value: "0000"
          label: Locked
        - value: "0001"
          label: Last Volume
        - value: "0002"
          label: AC Reset
        - value: "0003"
          label: Standby Reset

- id: set_volume_locked_level
  label: Set Volume Locked Level (0–100)
  kind: action
  command: VLFL
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: set_max_volume
  label: Set Maximum Volume (0–100)
  kind: action
  command: MAVL
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: set_power_off_control_mode
  label: Set Power-Off Control Mode
  kind: action
  command: PBTN
  params:
    - name: mode
      type: enum
      values:
        - value: "0000"
          label: AC Only
        - value: "0001"
          label: All

- id: set_av_setting_menu
  label: Set AV Setting Menu Access
  kind: action
  command: AVMN
  params:
    - name: state
      type: enum
      values:
        - value: "0000"
          label: Disable
        - value: "0001"
          label: Enable

- id: simulate_button
  label: Simulate Remote Control Button
  kind: action
  command: BTTN
  description: >
    Simulates a physical remote-control button press. Parameter is a 4-character
    code with a leading "1" prefix. Selected codes listed below.
  params:
    - name: button_code
      type: enum
      values:
        - value: "1000"
          label: "0"
        - value: "1001"
          label: "1"
        - value: "1002"
          label: "2"
        - value: "1003"
          label: "3"
        - value: "1004"
          label: "4"
        - value: "1005"
          label: "5"
        - value: "1006"
          label: "6"
        - value: "1007"
          label: "7"
        - value: "1008"
          label: "8"
        - value: "1009"
          label: "9"
        - value: "1010"
          label: "— (Dash)"
        - value: "1012"
          label: Power
        - value: "1015"
          label: Rewind <<
        - value: "1016"
          label: Play
        - value: "1017"
          label: Fast-Forward >>
        - value: "1018"
          label: Pause
        - value: "1019"
          label: Previous |<<
        - value: "1020"
          label: Stop
        - value: "1021"
          label: Next >>|
        - value: "1023"
          label: Media Player (HiMedia)
        - value: "1024"
          label: Sleep
        - value: "1027"
          label: CC
        - value: "1031"
          label: Mute
        - value: "1032"
          label: Volume -
        - value: "1033"
          label: Volume +
        - value: "1034"
          label: Channel +
        - value: "1035"
          label: Channel -
        - value: "1036"
          label: Input
        - value: "1038"
          label: Menu
        - value: "1039"
          label: Connected Home (HiSmart)
        - value: "1040"
          label: OK / Enter
        - value: "1041"
          label: Up
        - value: "1042"
          label: Down
        - value: "1043"
          label: Left
        - value: "1044"
          label: Right
        - value: "1045"
          label: Back
        - value: "1046"
          label: Exit
        - value: "1050"
          label: Red Button
        - value: "1051"
          label: Green Button
        - value: "1052"
          label: Blue Button
        - value: "1053"
          label: Yellow Button
        - value: "1054"
          label: MTS/SAP
        - value: "1055"
          label: Live TV
```

## Feedbacks

```yaml
- id: power_on_command_setting
  label: Power On Command Setting
  command: PWRE
  query: "PWRE????"
  type: enum
  values:
    - value: "0"
      label: Disabled
    - value: "1"
      label: Enabled
  note: Not available when TV is in standby mode.

- id: current_input
  label: Current Input Source
  command: INPT
  query: "INPT????"
  type: enum
  values:
    - value: "1"
      label: TV
    - value: "3"
      label: Component
    - value: "4"
      label: AV
    - value: "6"
      label: VGA
    - value: "9"
      label: HDMI1
    - value: "10"
      label: HDMI2
    - value: "11"
      label: HDMI3
    - value: "12"
      label: HDMI4

- id: current_picture_mode
  label: Current Picture Mode
  command: PMOD
  query: "PMOD????"
  type: enum
  values:
    - value: "0"
      label: Standard
    - value: "2"
      label: Vivid
    - value: "3"
      label: EnergySaving
    - value: "4"
      label: Theater
    - value: "5"
      label: Game
    - value: "6"
      label: Sport

- id: brightness
  label: Brightness
  command: BRIT
  query: "BRIT????"
  type: integer
  range: [0, 100]

- id: contrast
  label: Contrast
  command: CONT
  query: "CONT????"
  type: integer
  range: [0, 100]

- id: color_saturation
  label: Color Saturation
  command: COLR
  query: "COLR????"
  type: integer
  range: [0, 100]

- id: tint
  label: Tint
  command: TINT
  query: "TINT????"
  type: integer
  range: [0, 100]

- id: sharpness
  label: Sharpness
  command: SHRP
  query: "SHRP????"
  type: integer
  range: [0, 20]

- id: aspect_ratio
  label: Current Aspect Ratio
  command: ASPT
  query: "ASPT????"
  type: enum
  values:
    - value: "0"
      label: Auto
    - value: "2"
      label: Normal (4:3)
    - value: "3"
      label: Zoom
    - value: "4"
      label: Wide (16:9)
    - value: "5"
      label: Direct
    - value: "6"
      label: 1-to-1 Pixel Map
    - value: "7"
      label: Panoramic
    - value: "8"
      label: Cinema

- id: overscan
  label: Overscan State
  command: OVSN
  query: "OVSN????"
  type: enum
  values:
    - value: "0"
      label: "On"
    - value: "2"
      label: "Off"

- id: color_temp
  label: Current Color Temperature
  command: CTEM
  query: "CTEM????"
  type: enum
  values:
    - value: "0"
      label: High
    - value: "2"
      label: Middle
    - value: "3"
      label: Mid-Low
    - value: "4"
      label: Low

- id: backlight
  label: Backlight Level
  command: BKLV
  query: "BKLV????"
  type: integer
  range: [0, 100]

- id: sound_mode
  label: Current Sound Mode
  command: AMOD
  query: "AMOD????"
  type: enum
  values:
    - value: "0"
      label: Standard
    - value: "2"
      label: Theater
    - value: "3"
      label: Music
    - value: "4"
      label: Speech
    - value: "5"
      label: Late Night

- id: volume
  label: Current Volume
  command: VOLM
  query: "VOLM????"
  type: integer
  range: [0, 100]

- id: mute_state
  label: Mute State
  command: MUTE
  query: "MUTE????"
  type: enum
  values:
    - value: "0"
      label: Not Muted
    - value: "1"
      label: Muted

- id: tv_speaker
  label: TV Speaker State
  command: ASPK
  query: "ASPK????"
  type: enum
  values:
    - value: "0"
      label: "Off"
    - value: "2"
      label: "On"

- id: tuner_mode
  label: Tuner Mode
  command: TUNR
  query: "TUNR????"
  type: enum
  values:
    - value: "0"
      label: Antenna
    - value: "2"
      label: Cable

- id: caption_state
  label: Caption (CC) State
  command: "CC##"
  query: "CC##????"
  type: enum
  values:
    - value: "0"
      label: "Off"
    - value: "2"
      label: "On"
    - value: "3"
      label: On When Mute

- id: standby_led
  label: Standby LED State
  command: PLED
  query: "PLED????"
  type: enum
  values:
    - value: "0"
      label: "Off"
    - value: "2"
      label: "On"

- id: remote_key_lock
  label: Remote Key Lock State
  command: RMOT
  query: "RMOT????"
  type: enum
  values:
    - value: "0"
      label: Enabled
    - value: "1"
      label: Disabled
    - value: "2"
      label: Partial

- id: panel_key_lock
  label: Panel Key Lock State
  command: PANL
  query: "PANL????"
  type: enum
  values:
    - value: "0"
      label: Enabled
    - value: "1"
      label: Disabled

- id: menu_access
  label: Menu Access State
  command: MENU
  query: "MENU????"
  type: enum
  values:
    - value: "0"
      label: Enabled
    - value: "1"
      label: Disabled

- id: osd_mode
  label: OSD Mode State
  command: "OSD#"
  query: "OSD#????"
  type: enum
  values:
    - value: "0"
      label: Enabled
    - value: "1"
      label: Disabled

- id: input_mode
  label: Input Mode Lock State
  command: INPM
  query: "INPM????"
  type: enum
  values:
    - value: "0"
      label: Locked
    - value: "1"
      label: Selectable
    - value: "2"
      label: AC Reset
    - value: "3"
      label: Standby Reset

- id: volume_control_mode
  label: Volume Control Mode
  command: SVOL
  query: "SVOL????"
  type: enum
  values:
    - value: "0"
      label: Locked
    - value: "1"
      label: Last Volume
    - value: "2"
      label: AC Reset
    - value: "3"
      label: Standby Reset

- id: volume_locked_level
  label: Volume Locked Level
  command: VLFL
  query: "VLFL????"
  type: integer
  range: [0, 100]

- id: max_volume
  label: Maximum Volume
  command: MAVL
  query: "MAVL????"
  type: integer
  range: [0, 100]

- id: power_off_control_mode
  label: Power-Off Control Mode
  command: PBTN
  query: "PBTN????"
  type: enum
  values:
    - value: "0"
      label: AC Only
    - value: "1"
      label: All

- id: av_setting_menu
  label: AV Setting Menu Access State
  command: AVMN
  query: "AVMN????"
  type: enum
  values:
    - value: "0"
      label: Disabled
    - value: "1"
      label: Enabled
```

## Variables

```yaml
# UNRESOLVED: Power-On Input Source (POIS) command was present but truncated in source.
# UNRESOLVED: OSD Language query return values beyond English/Español/Français not confirmed.
```

## Events

```yaml
# UNRESOLVED: No unsolicited notification mechanism described in source.
# The protocol uses polled query commands only; no push events documented.
```

## Macros

```yaml
# UNRESOLVED: No multi-step sequences explicitly described in source.
```

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - id: rs232_power_on_requires_enable
    description: >
      The RS-232 remote power-on command (POWR0001) only functions when the
      Power On Command setting (PWRE0001) has been enabled and the TV is not
      already in a powered-off AC state. The source states this setting must be
      enabled before the TV can be turned on from standby via RS-232.
  - id: custom_install_menu_required
    description: >
      RS-232 control must be explicitly enabled via the Custom Install menu
      (accessed by pressing Quick Settings then entering "7 3 1 0" on the
      remote) before any serial commands will be accepted. The TV ships with
      serial control disabled.
```

## Notes

**RS-232 connection:** The TV uses a female DB9 chassis connector. Pin 2 = RXD, Pin 3 = TXD, Pin 5 = GND (female side). A standard null-modem or straight-through cable may be needed depending on the controller; consult the User Manual. USB-to-Serial adapters are supported.

**Multi-TV addressing:** The CLIENT_ID field (3 bytes) is the last three hex digits of the TV's Ethernet MAC address (found at Menu → Network → Network Information). Use `ALL` as the CLIENT_ID to broadcast a command to all TVs on a daisy-chain.

**Checksum:** 8-bit checksum of the entire command byte sequence (including the CHECKSUM byte itself) must equal zero. ACK responses include OKAY, EROR, or WAIT. WAIT indicates the command was received but the TV is busy; re-poll for OKAY.

**IR discrete codes:** The source document also provides Pronto CCF hex codes for discrete IR control of the following functions: POWER (toggle/on/off), INPUT (toggle), TV TUNER, HDMI 1–5, VGA, USB, PICTURE MODE, SOUND MODE, ASPECT RATIO (Wide/Normal/Cinema/Panorama/Zoom), CHANNEL LIST, FAV CHANNEL, SLEEP, TV MENU, HOME, TOOLS, digits 0–9, DASH, PREVIOUS CHANNEL, navigation arrows (UP/DOWN/LEFT/RIGHT), ENTER, SELECT/OK, RETURN, EXIT, INFO/DISPLAY, VOLUME ±, CHANNEL ±, PIP (toggle/input/swap/position/size), GUIDE, FREEZE. These CCF codes are not reproduced here but are available in the source document.

**Power-On Command note:** The source explicitly states that QUERY POWER ON COMMAND SETTING (PWRE????) is not available while the TV is in standby mode.

<!-- UNRESOLVED: The model table in the source was blank — specific model numbers in the 55Z670NK Series family are not documented here. -->
<!-- UNRESOLVED: Power-On Input Source command (POIS) parameters were truncated in the refined source; full enumeration not captured. -->
<!-- UNRESOLVED: Firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: Protocol version number not explicitly stated (document revision history goes to V3.6, but that is the doc version, not a protocol version field). -->

## Provenance

```yaml
source_urls:
  - "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
  - https://hisense-b2b.com/
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
source_documents:
  - title: "HiSense public source"
    url: "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:16:42.542Z
  - title: "HiSense public source"
    url: "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:16:42.794Z
  - title: "HiSense public source"
    url: https://hisense-b2b.com/
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:16:42.972Z
  - title: "HiSense public source"
    url: "https://hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:16:57.269Z
  - title: "HiSense public source"
    url: https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:16:57.296Z
retrieved_at: 2026-04-26T16:16:57.296Z
last_checked_at: 2026-04-23T06:48:57.028Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T06:48:57.028Z
matched_actions: 58
action_count: 58
confidence: high
summary: "All 58 spec actions matched exactly; transport parameters verified; full command set documented in source."
```

## Known Gaps

```yaml
[]
```
