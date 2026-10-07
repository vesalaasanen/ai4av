---
spec_id: admin/hisense-116u7qg-pro-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hisense 116U7QG PRO Series Control Spec"
manufacturer: Hisense
model_family: "116U7QG PRO Series"
aliases: []
compatible_with:
  manufacturers:
    - Hisense
  models:
    - "116U7QG PRO Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-05-12T19:13:05.398Z
last_checked_at: 2026-10-07T17:31:25.870Z
generated_at: 2026-10-07T17:31:25.870Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "discrete IR codes ( Pronto CCF ) not mapped to structured actions — raw hex only"
  - "no unsolicited event notifications described in source"
  - "no multi-step macro sequences described in source"
  - "TCP/IP control path not documented — only RS-232 and discrete IR in source"
  - "discrete IR pronto CCF codes not structured as actions — raw hex arrays only"
  - "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
verification:
  verdict: verified
  checked_at: 2026-10-07T17:31:25.870Z
  matched_actions: 80
  action_count: 80
  confidence: medium
  summary: "All 80 action units (45 actions, 35 query feedbacks) map to source commands and transport matches. Source is generic Prosumer TV doc, so 116U7QG applicability is unconfirmed. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-12
---

# Hisense 116U7QG PRO Series Control Spec

## Summary
Prosumer large-format TV with RS-232 control protocol. Supports power on/off, input routing, picture and audio adjustment, queryable state. Discrete IR also documented; RS-232 is primary control interface. Exact applicability of this generic prosumer protocol to the 116U7QG PRO Series is UNRESOLVED; the source does not identify this model.

<!-- UNRESOLVED: discrete IR codes ( Pronto CCF ) not mapped to structured actions — raw hex only -->

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
  type: UNRESOLVED
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

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: select_input
  label: Select Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input identifier (0=Change Input Signal One at a Time, 1=TV, 3=Component, 4=AV, 6=VGA, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4)

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Standard, 2=Vivid, 3=EnergySaving, 4=Theater, 5=Game, 6=Sport

- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: 0-20

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: 0=Auto, 2=Normal, 3=Zoom, 4=Wide, 5=Direct, 6=1-to-1 pixel map, 7=Panoramic, 8=Cinema

- id: set_overscan
  label: Set Overscan
  kind: action
  params:
    - name: state
      type: integer
      description: 0=On, 2=Off

- id: reset_picture_settings
  label: Reset Picture Settings
  kind: action
  params: []

- id: set_color_temp
  label: Set Color Temperature
  kind: action
  params:
    - name: temp
      type: integer
      description: 0=High, 2=Middle, 3=Mid-Low, 4=Low

- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Standard, 2=Theater, 3=Music, 4=Speech, 5=Late Night

- id: reset_audio_settings
  label: Reset Audio Settings
  kind: action
  params: []

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: set_mute
  label: Set Mute
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On

- id: set_tv_speaker
  label: Set TV Speaker
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 2=On

- id: set_tuner_mode
  label: Set Tuner Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Antenna, 2=Cable

- id: channel_up
  label: Channel Up
  kind: action
  params: []

- id: channel_down
  label: Channel Down
  kind: action
  params: []

- id: set_caption_control
  label: Set Caption Control
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Off, 2=On, 3=CC on when mute

- id: reset_factory_settings
  label: Restore Factory Settings
  kind: action
  params: []

- id: set_osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: lang
      type: integer
      description: 0=English, 2=Español, 3=Français

- id: set_standby_led
  label: Set Standby LED
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 2=On

- id: set_power_off_control_mode
  label: Set Power Off Control Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=AC ONLY, 1=ALL

- id: set_volume_control
  label: Set Volume Control
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Locked, 1=Last Volume, 2=AC Reset, 3=Standby Reset

- id: set_volume_locked_level
  label: Set Volume Locked Level
  kind: action
  params:
    - name: level
      type: integer
      description: 0-100

- id: set_remote_key
  label: Set Remote Key
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Enable, 1=Disable, 2=Partial

- id: set_panel_key
  label: Set Panel Key
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Enable, 1=Disable

- id: set_menu_access
  label: Set Menu Access
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Enable, 1=Disable

- id: set_av_setting_menu
  label: Set AV Setting Menu
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Disable, 1=Enable

- id: set_osd_mode
  label: Set OSD Mode
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Enable, 1=Disable

- id: set_input_mode
  label: Set Input Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Locked, 1=Selectable, 2=AC Reset, 3=Standby Reset

- id: set_power_on_input_select
  label: Set Power On Input Select
  kind: action
  params:
    - name: source
      type: integer
      description: 0=LAST, 1=Air, 2=AV, 3=Component, 4=VGA, 5=HDMI1, 6=HDMI2, 7=HDMI3, 8=HDMI4

- id: set_power_on_command
  label: Set Power On Command
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Disable RS-232 Remote Power On, 1=Enable RS-232 Remote Power On (PWRE0000, PWRE0001)

- id: automatic_search
  label: Automatic Search
  kind: action
  params: []

- id: set_remote_control_button
  label: Set Remote Control Button
  kind: action
  params:
    - name: button
      type: string
      description: CH+=BTTN1034, CH-=BTTN1035, VOL-=BTTN1032, VOL+=BTTN1033, BACK=BTTN1045, POWER=BTTN1012, MUTE=BTTN1031, —(DASH)=BTTN1010, INPUT=BTTN1036, Media Player=BTTN1023, 0=BTTN1000, 1=BTTN1001, 2=BTTN1002, 3=BTTN1003, 4=BTTN1004, 5=BTTN1005, 6=BTTN1006, 7=BTTN1007, 8=BTTN1008, 9=BTTN1009, SLEEP=BTTN1024, MTS/SAP=BTTN1054, Live TV=BTTN1055, PAUSE=BTTN1018, PLAY=BTTN1016, MENU=BTTN1038, EXIT=BTTN1046, STOP=BTTN1020, FRW <<=BTTN1015, CC=BTTN1027, Red button=BTTN1050, Green button=BTTN1051, Yellow button=BTTN1053, Blue button=BTTN1052, UP=BTTN1041, DOWN=BTTN1042, LEFT=BTTN1043, RIGHT=BTTN1044, OK/ENTER=BTTN1040, FFW >>=BTTN1017, PREVIOUS <<=BTTN1019, NEXT >>=BTTN1021, Connected Home=BTTN1039

- id: set_volume_range
  label: Set Volume Range
  kind: action
  params:
    - name: value
      type: integer
      description: 0000-0100 (MAVL`（`0000-0100`）`)

- id: set_tv_speaker_mode
  label: Set TV Speaker Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=SPEAKER, 1=OFF, 2=ARC FIRST (SPKM0000, SPKM0001, SPKM0002)

- id: set_b2b_function_mode
  label: Set B2B Function Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=ENABLE, 1=DISABLE (B2BM0000, B2BM0001)

- id: set_usb_behavior
  label: Set USB Behavior
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Home, 1=B2B (USBM0000, USBM0001)

- id: set_pixel_shifting
  label: Set Pixel Shifting
  kind: action
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On (PSHF0000, PSHF0001)

- id: send_discrete_ir_command
  label: Send Discrete IR Command
  kind: action
  params:
    - name: function
      type: string
      description: POWER (toggle)=04 FB 70 8F; POWER ON=04 FB 71 8E; POWER OFF=04 FB 72 8D; INPUT (toggle)=04 FB 73 8C; TV TUNER1=04 FB 74 8B; TV TUNER2=04 FB 75 8A; AV1=04 FB 76 89; AV2=04 FB 77 88; SCART/AV3=04 FB 78 87; COMPONENT1=04 FB 79 86; COMPONENT2=04 FB 7A 85; COMPONENT3=04 FB 7B 84; HDMI.1=04FB 7C83; HDMI.2=04FB 7D82; HDMI.3=04FB 7E81; HDMI.4=04FB 7F80; HDMI.5=04FB 807F; VGA=04FB 817E; USB=04FB 827D; PICTURE MODE (toggle)=04FB 837C; SOUND MODE (toggle)=04FB 847B; ASPECT RATIO: WIDE 16:9=04FB 857A; ASPECT RATIO: NOMAL 4:3=04FB 8679; ASPECT RATIO: CINEMA=04FB 8778; ASPECT RATIO: PANORAMA=04FB 8877; ASPECT RATIO: ZOOM=04FB 8976; CHANNEL LIST=04FB 8A75; FAV CHANNEL=04FB 8B74; SLEEP=04FB 8C73; TV MENU (toggle)=04FB 8D72; HOME=04FB 8E71; TOOLS (SECOND MENU)=04FB 8F70; Digit “0”=04FB 906F; Digit “1”=04FB 916E; Digit “2”=04FB 926D; Digit “3”=04FB 936C; Digit “4”=04FB 946B; Digit “5”=04FB 956A; Digit “6”=04FB 9669; Digit “7”=04FB 9768; Digit “8”=04FB 9867; Digit “9”=04FB 9966; Digit “-“ (dash)=04FB 9A65; PREVIOUS CHANNEL=04FB 9B64; UP ARROW=04FB 9C63; DOWN ARROW=04FB 9D62; LEFT ARROW=04FB 9E61; RIGHT ARROW=04FB 9F60; ENTER=04FB A05F; SELECT (OK)=04FB A15E; RETURN=04FB A25D; EXIT=04FB A35C; INFO/DISPLAY (toggle)=04FBA45B; VOLUME -=04FB A55A; VOLUME +=04FB A659; CHANNEL -=04FB A758; CHANNEL +=04FB A857; PIP (toggle)=04FB A956; PIP INPUT=04FB AA55; PIP SWAP=04FB AB54; PIP POSITION=04FB AC53; PIP SIZE=04FB AD52; Guide (toggle)=04FB AE51; Freeze (toggle)=04FB AF50
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, on]

- id: current_input
  type: enum
  values: [0, 1, 3, 4, 6, 9, 10, 11, 12]
  query_command: "INPT????"

- id: current_picture_mode
  type: enum
  values: [0, 2, 3, 4, 5, 6]
  query_command: "PMOD????"

- id: current_aspect_ratio
  type: enum
  values: [0, 2, 3, 4, 5, 6, 7, 8]
  query_command: "ASPT????"

- id: overscan_state
  type: enum
  values: [0, 2]
  query_command: "OVSN????"

- id: current_color_temp
  type: enum
  values: [0, 2, 3, 4]
  query_command: "CTEM????"

- id: current_sound_mode
  type: enum
  values: [0, 2, 3, 4, 5]
  query_command: "AMOD????"

- id: mute_state
  type: enum
  values: [0, 1]
  query_command: "MUTE????"

- id: current_tv_speaker
  type: enum
  values: [0, 2]
  query_command: "ASPK????"

- id: current_tuner_mode
  type: enum
  values: [0, 2]
  query_command: "TUNR????"

- id: caption_control_state
  type: enum
  values: [0, 2, 3]
  query_command: "CC##????"

- id: current_osd_language
  type: enum
  values: [0, 2, 3]
  query_command: "LANG????"

- id: standby_led_state
  type: enum
  values: [0, 2]
  query_command: "PLED????"

- id: current_power_off_control_mode
  type: enum
  values: [0, 1]
  query_command: "PBTN????"

- id: current_volume_control
  type: enum
  values: [0, 1, 2, 3]
  query_command: "SVOL????"

- id: current_remote_key
  type: enum
  values: [0, 1, 2]
  query_command: "RMOT????"

- id: current_panel_key
  type: enum
  values: [0, 1]
  query_command: "PANL????"

- id: current_menu_access
  type: enum
  values: [0, 1]
  query_command: "MENU????"

- id: current_av_setting_menu
  type: enum
  values: [0, 1]
  query_command: "AVMN????"

- id: current_osd_mode
  type: enum
  values: [0, 1]
  query_command: "OSD#????"

- id: current_input_mode
  type: enum
  values: [0, 1, 2, 3]
  query_command: "INPM????"

- id: current_power_on_input_select
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6, 7, 8]
  query_command: "POIS????"

- id: current_power_on_command_setting
  type: enum
  values: [0, 1]
  query_command: "PWRE????"

- id: brightness
  type: integer
  range: "0-100"
  query_command: "BRIT????"

- id: contrast
  type: integer
  range: "0-100"
  query_command: "CONT????"

- id: color_saturation
  type: integer
  range: "0-100"
  query_command: "COLR????"

- id: tint
  type: integer
  range: "0-100"
  query_command: "TINT????"

- id: sharpness
  type: integer
  range: "0-20"
  query_command: "SHRP????"

- id: backlight
  type: integer
  range: "0-100"
  query_command: "BKLV????"

- id: volume
  type: integer
  range: "0-100"
  query_command: "VOLM????"

- id: volume_range
  type: integer
  range: "0-100"
  query_command: "MAVL????"

- id: volume_locked_level
  type: integer
  range: "0-100"
  query_command: "VLFL????"

- id: current_tv_speaker_mode
  type: enum
  values: [0, 1, 2]
  query_command: "SPKM????"

- id: current_b2b_function_mode
  type: enum
  values: [0, 1]
  query_command: "B2BM????"

- id: current_usb_behavior
  type: enum
  values: [0, 1]
  query_command: "USBM????"

- id: pixel_shifting_state
  type: enum
  values: [0, 1]
  query_command: "PSHF????"
```

## Variables
```yaml
- id: brightness
  type: integer
  range: [0, 100]

- id: contrast
  type: integer
  range: [0, 100]

- id: color_saturation
  type: integer
  range: [0, 100]

- id: tint
  type: integer
  range: [0, 100]

- id: sharpness
  type: integer
  range: [0, 20]

- id: backlight
  type: integer
  range: [0, 100]

- id: volume
  type: integer
  range: [0, 100]

- id: volume_locked_level
  type: integer
  range: [0, 100]
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - name: RS-232 during standby
    description: To keep RS-232 port active while TV is in standby, set "Power On Command" to Enable in the Custom Install menu before exiting. Without this, the TV cannot be powered on via RS-232 from standby.
  - name: Custom Install menu required
    description: RS-232 control requires enabling it in the Custom Install menu (access code 7310) before use.
```

## Notes
RS-232 protocol is case-sensitive. Commands are ASCII with checksum. Termination is carriage return (0x0D). Client ID for Smart TVs is the last 3 bytes of the Ethernet MAC address; for Feature TVs it is selected in the TV menu; "ALL" broadcasts to all TVs. Query commands return 4-byte response data followed by checksum.

Command format: `S[CLIENT_ID][COMMAND][DATA][CHECKSUM][0x0D]` for set, `Q[CLIENT_ID][COMMAND]????[CHECKSUM][0x0D]` for query. Acknowledgements: `OKAY`, `EROR`, `WAIT`.

Broadcast (ALL) uses generic HEX command format; TV-specific commands include MAC address suffix.

<!-- UNRESOLVED: TCP/IP control path not documented — only RS-232 and discrete IR in source -->
<!-- UNRESOLVED: discrete IR pronto CCF codes not structured as actions — raw hex arrays only -->

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-05-12T19:13:05.398Z
last_checked_at: 2026-10-07T17:31:25.870Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T17:31:25.870Z
matched_actions: 80
action_count: 80
confidence: medium
summary: "All 80 action units (45 actions, 35 query feedbacks) map to source commands and transport matches. Source is generic Prosumer TV doc, so 116U7QG applicability is unconfirmed. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "discrete IR codes ( Pronto CCF ) not mapped to structured actions — raw hex only"
- "no unsolicited event notifications described in source"
- "no multi-step macro sequences described in source"
- "TCP/IP control path not documented — only RS-232 and discrete IR in source"
- "discrete IR pronto CCF codes not structured as actions — raw hex arrays only"
- "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
