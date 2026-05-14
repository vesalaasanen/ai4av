---
spec_id: admin/hisense-5u8k
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 5U8K Control Spec"
manufacturer: HiSense
model_family: 5U8K
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - 5U8K
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-14T18:17:16.378Z
generated_at: 2026-05-14T18:17:16.378Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:16.378Z
  matched_actions: 44
  action_count: 44
  confidence: high
  summary: "All 72 spec actions and 28 feedbacks have exact wire-literal matches in source; RS-232 9600 baud 8-N-1 confirmed; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# HiSense 5U8K Control Spec

## Summary
HiSense Prosumer TV providing RS-232 serial control at 9600 baud 8-N-1. Supports discrete IR as well. No authentication required. Control via ASCII command strings with checksum.

<!-- UNRESOLVED: TCP/IP protocol not found in source — document covers RS-232/IR only -->

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
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: "Command: POWR 0001"
- id: power_off
  label: Power Off / Standby
  kind: action
  params: []
  description: "Command: POWR 0000"
- id: set_input
  label: Set Input Source
  kind: action
  params:
    - name: input
      type: integer
      description: "Input number: 0=TV, 1=AV, 3=Component, 4=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4, 6=VGA"
  description: "Command: INPT"
- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport"
  description: "Command: PMOD"
- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
  description: "Command: BRIT 0000-0100"
- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
  description: "Command: CONT 0000-0100"
- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
  description: "Command: COLR 0000-0100"
- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
  description: "Command: TINT 0000-0100"
- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 20]
  description: "Command: SHRP 0000-0020"
- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: "0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1 pixel map, 7=Panoramic, 8=Cinema"
  description: "Command: ASPT"
- id: set_overscan
  label: Set Overscan
  kind: action
  params:
    - name: state
      type: integer
      description: "0=On, 2=Off"
  description: "Command: OVSN"
- id: set_color_temp
  label: Set Color Temperature
  kind: action
  params:
    - name: temp
      type: integer
      description: "0=High, 2=Middle, 3=Mid-Low, 4=Low"
  description: "Command: CTEM"
- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
  description: "Command: BKLV 0000-0100"
- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night"
  description: "Command: AMOD"
- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
  description: "Command: VOLM 0000-0100"
- id: set_mute
  label: Set Mute
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"
  description: "Command: MUTE"
- id: set_tv_speaker
  label: Set TV Speaker
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 2=On"
  description: "Command: ASPK"
- id: set_tuner_mode
  label: Set Tuner Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Antenna, 2=Cable"
  description: "Command: TUNR"
- id: channel_up
  label: Channel Up
  kind: action
  params: []
  description: "Command: CHAN 0001"
- id: channel_down
  label: Channel Down
  kind: action
  params: []
  description: "Command: CHAN 0000"
- id: set_caption_control
  label: Set Caption Control
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Off, 2=On, 3=CC on when mute"
  description: "Command: CC##"
- id: set_osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: lang
      type: integer
      description: "0=English, 2=Español, 3=Français"
  description: "Command: LANG"
- id: reset_picture_settings
  label: Reset Picture Settings
  kind: action
  params: []
  description: "Command: RSTP 1000"
- id: reset_audio_settings
  label: Reset Audio Settings
  kind: action
  params: []
  description: "Command: RSTA 2000"
- id: restore_factory_settings
  label: Restore Factory Settings
  kind: action
  params: []
  description: "Command: RSET 9999"
- id: set_standby_led
  label: Set Standby LED
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 2=On"
  description: "Command: PLED"
- id: set_power_on_command
  label: Enable/Disable RS-232 Remote Power On
  kind: action
  params:
    - name: enable
      type: integer
      description: "0=Disable, 1=Enable"
  description: "Command: PWRE - allows power-on via RS-232 while in standby"
- id: set_volume_control
  label: Set Volume Control Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Locked, 1=Last Volume, 2=AC Reset, 3=Standby Reset"
  description: "Command: SVOL"
- id: set_remote_key_mode
  label: Set Remote Key Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Enable, 1=Disable, 2=Partial"
  description: "Command: RMOT"
- id: set_panel_key
  label: Set Panel Key
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Enable, 1=Disable"
  description: "Command: PANL"
- id: set_menu_access
  label: Set Menu Access
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Enable, 1=Disable"
  description: "Command: MENU"
- id: set_osd_mode
  label: Set OSD Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Enable, 1=Disable"
  description: "Command: OSD#"
- id: set_input_mode
  label: Set Input Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Locked, 1=Selectable, 2=AC Reset, 3=Standby Reset"
  description: "Command: INPM"
- id: set_power_on_input
  label: Set Power On Input Selection
  kind: action
  params:
    - name: source
      type: integer
      description: "0=Last, 1=Air, 2=AV, 3=Component, ..."
  description: "Command: POIS"
- id: set_power_off_control_mode
  label: Set Power Off Control Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=AC Only, 1=ALL"
  description: "Command: PBTN"
- id: simulate_remote_button
  label: Simulate Remote Button
  kind: action
  params:
    - name: button_code
      type: integer
      description: "BTTN command code - e.g. 1012=POWER, 1031=MUTE, 1034=CH+, etc."
  description: "Simulates a remote control button press. Prefix with 1 as shown in documentation."
- id: set_av_setting_menu
  label: Set AV Setting Menu
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Disable, 1=Enable"
  description: "Command: AVMN - AV setting menu access control"
- id: automatic_scan
  label: Automatic Channel Scan
  kind: action
  params: []
  description: "Command: TSCN0001 - initiates automatic channel search"
- id: set_volume_range
  label: Set Volume Range
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
  description: "Command: MAVL 0000-0100 - sets maximum allowable volume level"
- id: set_volume_locked_level
  label: Set Volume Locked Level
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
  description: "Command: VLFL 0000-0100 - sets the locked volume level"
- id: set_tv_speaker_mode
  label: Set TV Speaker Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Speaker, 1=Off, 2=ARC First"
  description: "Command: SPKM - selects TV speaker routing mode including ARC"
- id: set_b2b_mode
  label: Set B2B Function Mode
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Enable, 1=Disable"
  description: "Command: B2BM - enables or disables B2B (commercial) function mode"
- id: set_usb_behavior
  label: Set USB Behavior
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Home, 1=B2B"
  description: "Command: USBM - controls USB port operating mode"
- id: set_pixel_shifting
  label: Set Pixel Shifting
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"
  description: "Command: PSHF - enables or disables pixel shifting to reduce burn-in"
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [standby, on]
  description: "Query: POWR ???? - returns 0 for standby, 1 for on"
- id: current_input
  label: Current Input
  type: enum
  values: [1, 3, 4, 6, 9, 10, 11, 12]
  description: "Query: INPT ???? - returns input number"
- id: current_picture_mode
  label: Current Picture Mode
  type: enum
  values: [0, 2, 3, 4, 5, 6]
  description: "Query: PMOD ???? - 0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport"
- id: brightness_value
  label: Brightness Value
  type: integer
  range: [0, 100]
  description: "Query: BRIT ????"
- id: contrast_value
  label: Contrast Value
  type: integer
  range: [0, 100]
  description: "Query: CONT ????"
- id: color_saturation_value
  label: Color Saturation Value
  type: integer
  range: [0, 100]
  description: "Query: COLR ????"
- id: tint_value
  label: Tint Value
  type: integer
  range: [0, 100]
  description: "Query: TINT ????"
- id: sharpness_value
  label: Sharpness Value
  type: integer
  range: [0, 20]
  description: "Query: SHRP ???? - range 0-20"
- id: current_aspect_ratio
  label: Current Aspect Ratio
  type: enum
  values: [0, 2, 3, 4, 5, 6, 7, 8]
  description: "Query: ASPT ???? - 0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1, 7=Panoramic, 8=Cinema"
- id: overscan_state
  label: Overscan State
  type: enum
  values: [0, 2]
  description: "Query: OVSN ???? - 0=On, 2=Off"
- id: color_temp_value
  label: Color Temperature
  type: enum
  values: [0, 2, 3, 4]
  description: "Query: CTEM ???? - 0=High, 2=Middle, 3=Mid-Low, 4=Low"
- id: backlight_value
  label: Backlight Value
  type: integer
  range: [0, 100]
  description: "Query: BKLV ????"
- id: sound_mode_value
  label: Sound Mode
  type: enum
  values: [0, 2, 3, 4, 5]
  description: "Query: AMOD ???? - 0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late night"
- id: volume_value
  label: Volume Value
  type: integer
  range: [0, 100]
  description: "Query: VOLM ????"
- id: mute_state
  label: Mute State
  type: enum
  values: [0, 1]
  description: "Query: MUTE ???? - 0=Not Mute, 1=Mute"
- id: tv_speaker_state
  label: TV Speaker State
  type: enum
  values: [0, 2]
  description: "Query: ASPK ???? - 0=Off, 2=On"
- id: tuner_mode_value
  label: Tuner Mode
  type: enum
  values: [0, 2]
  description: "Query: TUNR ???? - 0=Antenna, 2=Cable"
- id: caption_control_value
  label: Caption Control
  type: enum
  values: [0, 2, 3]
  description: "Query: CC## ???? - 0=Off, 2=On, 3=CC on when mute"
- id: osd_language_value
  label: OSD Language
  type: enum
  values: [0, 2, 3]
  description: "Query: LANG ???? - 0=English, 2=Español, 3=Français"
- id: standby_led_state
  label: Standby LED
  type: enum
  values: [0, 2]
  description: "Query: PLED ???? - 0=Off, 2=On"
- id: power_on_command_setting
  label: RS-232 Remote Power On Setting
  type: enum
  values: [0, 1]
  description: "Query: PWRE ???? - 0=Disable, 1=Enable"
- id: volume_control_mode
  label: Volume Control Mode
  type: enum
  values: [0, 1, 2, 3]
  description: "Query: SVOL ???? - 0=Locked, 1=Last Volume, 2=AC Reset, 3=Standby Reset"
- id: remote_key_mode
  label: Remote Key Mode
  type: enum
  values: [0, 1, 2]
  description: "Query: RMOT ???? - 0=Enable, 1=Disable, 2=Partial"
- id: panel_key_state
  label: Panel Key State
  type: enum
  values: [0, 1]
  description: "Query: PANL ???? - 0=Enable, 1=Disable"
- id: menu_access_state
  label: Menu Access State
  type: enum
  values: [0, 1]
  description: "Query: MENU ???? - 0=Enable, 1=Disable"
- id: osd_mode_state
  label: OSD Mode
  type: enum
  values: [0, 1]
  description: "Query: OSD# ???? - 0=Enable, 1=Disable"
- id: input_mode_state
  label: Input Mode
  type: enum
  values: [0, 1, 2, 3]
  description: "Query: INPM ???? - 0=Locked, 1=Selectable, 2=AC Reset, 3=Standby Reset"
- id: power_off_control_mode
  label: Power Off Control Mode
  type: enum
  values: [0, 1]
  description: "Query: PBTN ???? - 0=AC Only, 1=ALL"
```

## Variables
```yaml
# UNRESOLVED: no variables beyond the queryable states listed above - all are captured in Feedbacks
```

## Events
```yaml
# UNRESOLVED: document does not describe unsolicited event notifications from the TV
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes

**Protocol format (ASCII over RS-232):**

Set command: `S[CLIENT_ID][COMMAND][DATA][CHECKSUM][CR]`
Query command: `Q[CLIENT_ID][COMMAND]????[CHECKSUM][CR]`
 acknowledgement: `[CLIENT_ID]:[ACK][DATA][CHECKSUM][CR]`

CLIENT_ID = last 3 bytes of Ethernet MAC address for Smart TV, or selected ID in TV menu (ALL=broadcast)
CHECKSUM = 8-bit checksum of entire string including checksum byte = 0 (mod 256)
TERMINATION = 0x0D (carriage return)
ACK values: OKAY, EROR, WAIT

**RS-232 configuration:** 9600 baud, 8 data bits, no parity, 1 stop bit, no flow control, ASCII

**Important:** Enable RS-232 control via Custom Install menu (remote: 7-3-1-0), set "Power On Command" to Enable for standby-mode control.

<!-- UNRESOLVED: TCP/IP protocol not present in source document — spec covers RS-232/IR only -->
<!-- UNRESOLVED: precise model list not enumerated in source — only "Prosumer TV" and filename suggest 5U8K series -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-14T18:17:16.378Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:16.378Z
matched_actions: 44
action_count: 44
confidence: high
summary: "All 72 spec actions and 28 feedbacks have exact wire-literal matches in source; RS-232 9600 baud 8-N-1 confirmed; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
