---
spec_id: admin/hisense-5u75n
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 5U75N Control Spec"
manufacturer: HiSense
model_family: 5U75N
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - 5U75N
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
  - hisense-b2b.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://assets.hisense-usa.com/assets/ProductDownloads/16/283bdaa7ef/Hisense-Serial-Commands-for-copy-paste_0.pdf
  - "https://www.hisense-b2b.com/en/Attachment/DownloadFile?downloadId=519"
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
retrieved_at: 2026-05-04T21:09:11.021Z
last_checked_at: 2026-10-07T18:12:48.135Z
generated_at: 2026-10-07T18:12:48.135Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP control is not documented in the supplied source"
  - "the supplied source's model list is blank and does not confirm 5U75N support"
  - "no continuously-variable settable parameters beyond those covered in Actions"
  - "no multi-step sequences described in source"
  - "TCP/IP transport is not documented in the supplied source"
  - "the source's model list is blank and does not confirm 5U75N applicability"
  - "multiple-TV daisy-chain wiring is not specified in the supplied source text"
  - "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
verification:
  verdict: verified
  checked_at: 2026-10-07T18:12:48.135Z
  matched_actions: 144
  action_count: 144
  confidence: medium
  summary: "All 144 action units match source RS-232 and IR codes with correct values; serial transport matches; source catalogue is fully represented. Model list in source is blank. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-05
---

# HiSense 5U75N Control Spec

## Summary
The supplied Hisense Prosumer TV source documents fixed-length ASCII RS-232 control for power, input routing, picture and audio settings, volume, mute, channel, captions, and hospitality features. It also documents discrete IR codes. The source's model list is blank, so applicability to the 5U75N is unresolved. This source does not document TCP/IP control.

<!-- UNRESOLVED: TCP/IP control is not documented in the supplied source -->
<!-- UNRESOLVED: the supplied source's model list is blank and does not confirm 5U75N support -->

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
  connector: DB9_D-sub_female
  pinout:
    1: RI
    2: TXD
    3: RXD
    4: DSR
    5: GND
    6: DTR
    7: CTS
    8: RTS
    9: Power Input/DCD
auth:
  type: UNRESOLVED
```

## Traits
```yaml
- powerable
- queryable
- routable
- levelable
```

## Actions
```yaml
- id: power_on_command_enable
  label: Enable RS-232 Remote Power On
  kind: action
  command: PWRE
  data: "0001"
  description: Enable RS-232 remote power on command

- id: power_on_command_disable
  label: Disable RS-232 Remote Power On
  kind: action
  command: PWRE
  data: "0000"
  description: Disable RS-232 remote power on command

- id: power_on
  label: Power On
  kind: action
  command: POWR
  data: "0001"
  description: Power on the display

- id: power_standby
  label: Power Standby
  kind: action
  command: POWR
  data: "0000"
  description: Set display to standby

- id: select_input
  label: Select Input Source
  kind: action
  command: INPT
  params:
    - name: input
      type: enum
      values:
        - label: Change Input Signal One at a Time
          value: "0000"
        - label: TV
          value: "0001"
        - label: Component
          value: "0003"
        - label: AV
          value: "0004"
        - label: VGA
          value: "0006"
        - label: HDMI1
          value: "0009"
        - label: HDMI2
          value: "0010"
        - label: HDMI3
          value: "0011"
        - label: HDMI4
          value: "0012"
      description: Input source selection code

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  command: PMOD
  params:
    - name: mode
      type: enum
      values:
        - label: Standard
          value: "0000"
        - label: Vivid
          value: "0002"
        - label: EnergySaving
          value: "0003"
        - label: Theater
          value: "0004"
        - label: Game
          value: "0005"
        - label: Sport
          value: "0006"
      description: Picture mode

- id: set_brightness
  label: Set Brightness
  kind: action
  command: BRIT
  params:
    - name: value
      type: integer
      min: 0
      max: 100
      description: Brightness value 0-100

- id: set_contrast
  label: Set Contrast
  kind: action
  command: CONT
  params:
    - name: value
      type: integer
      min: 0
      max: 100
      description: Contrast value 0-100

- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  command: COLR
  params:
    - name: value
      type: integer
      min: 0
      max: 100
      description: Color saturation value 0-100

- id: set_tint
  label: Set Tint
  kind: action
  command: TINT
  params:
    - name: value
      type: integer
      min: 0
      max: 100
      description: Tint value 0-100

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: SHRP
  params:
    - name: value
      type: integer
      min: 0
      max: 20
      description: Sharpness value 0-20

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  command: ASPT
  params:
    - name: mode
      type: enum
      values:
        - label: Auto
          value: "0000"
        - label: Normal
          value: "0002"
        - label: Zoom
          value: "0003"
        - label: Wide
          value: "0004"
        - label: Direct
          value: "0005"
        - label: 1-to-1 Pixel Map
          value: "0006"
        - label: Panoramic
          value: "0007"
        - label: Cinema
          value: "0008"
      description: Aspect ratio mode

- id: set_overscan
  label: Set Overscan
  kind: action
  command: OVSN
  params:
    - name: state
      type: enum
      values:
        - label: On
          value: "0000"
        - label: Off
          value: "0002"
      description: Overscan on/off

- id: reset_picture_settings
  label: Reset Picture Settings
  kind: action
  command: RSTP
  data: "1000"
  description: Reset all picture settings to defaults

- id: set_color_temp
  label: Set Color Temperature
  kind: action
  command: CTEM
  params:
    - name: mode
      type: enum
      values:
        - label: High
          value: "0000"
        - label: Middle
          value: "0002"
        - label: Mid-Low
          value: "0003"
        - label: Low
          value: "0004"
      description: Color temperature preset

- id: set_backlight
  label: Set Backlight
  kind: action
  command: BKLV
  params:
    - name: value
      type: integer
      min: 0
      max: 100
      description: Backlight value 0-100

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  command: AMOD
  params:
    - name: mode
      type: enum
      values:
        - label: Standard
          value: "0000"
        - label: Theater
          value: "0002"
        - label: Music
          value: "0003"
        - label: Speech
          value: "0004"
        - label: Late Night
          value: "0005"
      description: Sound mode preset

- id: reset_audio_settings
  label: Reset Audio Settings
  kind: action
  command: RSTA
  data: "2000"
  description: Reset all audio settings to defaults

- id: set_volume
  label: Set Volume
  kind: action
  command: VOLM
  params:
    - name: value
      type: integer
      min: 0
      max: 100
      description: Volume level 0-100

- id: set_mute
  label: Set Mute
  kind: action
  command: MUTE
  params:
    - name: state
      type: enum
      values:
        - label: Mute Off
          value: "0000"
        - label: Mute On
          value: "0001"
      description: Mute on or off

- id: set_tv_speaker
  label: Set TV Speaker
  kind: action
  command: ASPK
  params:
    - name: state
      type: enum
      values:
        - label: Off
          value: "0000"
        - label: On
          value: "0002"
      description: Enable or disable TV internal speakers

- id: set_tuner_mode
  label: Set Tuner Mode
  kind: action
  command: TUNR
  params:
    - name: mode
      type: enum
      values:
        - label: Antenna
          value: "0000"
        - label: Cable
          value: "0002"
      description: Tuner input mode

- id: automatic_search
  label: Automatic Channel Search
  kind: action
  command: TSCN
  data: "0001"
  description: Start automatic channel search

- id: channel_down
  label: Channel Down
  kind: action
  command: CHAN
  data: "0000"
  description: Decrement channel

- id: channel_up
  label: Channel Up
  kind: action
  command: CHAN
  data: "0001"
  description: Increment channel

- id: set_caption
  label: Set Caption Control
  kind: action
  command: "CC##"
  params:
    - name: mode
      type: enum
      values:
        - label: Off
          value: "0000"
        - label: On
          value: "0002"
        - label: CC on when Mute
          value: "0003"
      description: Closed caption mode

- id: restore_factory
  label: Restore Factory Settings
  kind: action
  command: RSET
  data: "9999"
  description: Full factory reset

- id: set_osd_language
  label: Set OSD Language
  kind: action
  command: LANG
  params:
    - name: language
      type: enum
      values:
        - label: English
          value: "0000"
        - label: "Español"
          value: "0002"
        - label: "Français"
          value: "0003"
      description: On-screen display language

- id: set_standby_led
  label: Set Standby LED
  kind: action
  command: PLED
  params:
    - name: state
      type: enum
      values:
        - label: Off
          value: "0000"
        - label: On
          value: "0002"
      description: Standby LED on/off

- id: set_power_off_control_mode
  label: Set Power Off Control Mode
  kind: action
  command: PBTN
  params:
    - name: mode
      type: enum
      values:
        - label: AC Only
          value: "0000"
        - label: All
          value: "0001"
      description: Power off control mode

- id: set_volume_range
  label: Set Maximum Volume Level
  kind: action
  command: MAVL
  params:
    - name: value
      type: integer
      min: 0
      max: 100
      description: Maximum volume level 0-100

- id: set_volume_control
  label: Set Volume Control Mode
  kind: action
  command: SVOL
  params:
    - name: mode
      type: enum
      values:
        - label: Locked
          value: "0000"
        - label: Last Volume
          value: "0001"
        - label: AC Reset
          value: "0002"
        - label: Standby Reset
          value: "0003"
      description: Volume control behavior

- id: set_volume_locked_level
  label: Set Volume Locked Level
  kind: action
  command: VLFL
  params:
    - name: value
      type: integer
      min: 0
      max: 100
      description: Volume locked level 0-100

- id: set_remote_key
  label: Set Remote Key Lock
  kind: action
  command: RMOT
  params:
    - name: mode
      type: enum
      values:
        - label: Enable
          value: "0000"
        - label: Disable
          value: "0001"
        - label: Partial
          value: "0002"
      description: Remote control key lock mode

- id: set_panel_key
  label: Set Panel Key Lock
  kind: action
  command: PANL
  params:
    - name: mode
      type: enum
      values:
        - label: Enable
          value: "0000"
        - label: Disable
          value: "0001"
      description: Physical panel button lock

- id: set_menu_access
  label: Set Menu Access
  kind: action
  command: MENU
  params:
    - name: mode
      type: enum
      values:
        - label: Enable
          value: "0000"
        - label: Disable
          value: "0001"
      description: Menu access control

- id: set_av_setting_menu
  label: Set AV Setting Menu
  kind: action
  command: AVMN
  params:
    - name: mode
      type: enum
      values:
        - label: Disable
          value: "0000"
        - label: Enable
          value: "0001"
      description: AV setting menu visibility

- id: set_osd_mode
  label: Set OSD Display Mode
  kind: action
  command: "OSD#"
  params:
    - name: mode
      type: enum
      values:
        - label: Enable
          value: "0000"
        - label: Disable
          value: "0001"
      description: OSD display on/off

- id: set_input_mode
  label: Set Input Mode
  kind: action
  command: INPM
  params:
    - name: mode
      type: enum
      values:
        - label: Locked
          value: "0000"
        - label: Selectable
          value: "0001"
        - label: AC Reset
          value: "0002"
        - label: Standby Reset
          value: "0003"
      description: Input selection behavior

- id: set_power_on_input
  label: Set Power On Input Selection
  kind: action
  command: POIS
  params:
    - name: mode
      type: enum
      values:
        - label: Last
          value: "0000"
        - label: Air
          value: "0001"
        - label: AV
          value: "0002"
        - label: Component
          value: "0003"
        - label: VGA
          value: "0004"
        - label: HDMI1
          value: "0005"
        - label: HDMI2
          value: "0006"
        - label: HDMI3
          value: "0007"
        - label: HDMI4
          value: "0008"
      description: Power-on default input source

- id: simulate_remote_button
  label: Simulate Remote Button
  kind: action
  command: BTTN
  params:
    - name: button
      type: enum
      values:
        - label: "0"
          value: "1000"
        - label: "1"
          value: "1001"
        - label: "2"
          value: "1002"
        - label: "3"
          value: "1003"
        - label: "4"
          value: "1004"
        - label: "5"
          value: "1005"
        - label: "6"
          value: "1006"
        - label: "7"
          value: "1007"
        - label: "8"
          value: "1008"
        - label: "9"
          value: "1009"
        - label: Dash
          value: "1010"
        - label: Power
          value: "1012"
        - label: Play
          value: "1016"
        - label: Pause
          value: "1018"
        - label: Stop
          value: "1020"
        - label: Previous
          value: "1019"
        - label: Next
          value: "1021"
        - label: Rewind
          value: "1015"
        - label: Fast Forward
          value: "1017"
        - label: Media Player
          value: "1023"
        - label: Sleep
          value: "1024"
        - label: CC
          value: "1027"
        - label: VOL-
          value: "1032"
        - label: VOL+
          value: "1033"
        - label: CH+
          value: "1034"
        - label: CH-
          value: "1035"
        - label: Input
          value: "1036"
        - label: Menu
          value: "1038"
        - label: Connected Home
          value: "1039"
        - label: OK/Enter
          value: "1040"
        - label: Up
          value: "1041"
        - label: Down
          value: "1042"
        - label: Left
          value: "1043"
        - label: Right
          value: "1044"
        - label: Back
          value: "1045"
        - label: Exit
          value: "1046"
        - label: Mute
          value: "1031"
        - label: MTS/SAP
          value: "1054"
        - label: Live TV
          value: "1055"
        - label: Red
          value: "1050"
        - label: Green
          value: "1051"
        - label: Blue
          value: "1052"
        - label: Yellow
          value: "1053"
      description: Simulate IR remote control button press

- id: set_tv_speaker_mode
  label: Set TV Speaker Mode
  kind: action
  command: SPKM
  params:
    - name: mode
      type: enum
      values:
        - label: Speaker
          value: "0000"
        - label: Off
          value: "0001"
        - label: ARC First
          value: "0002"
      description: TV speaker output routing mode

- id: set_b2b_mode
  label: Set B2B Function Mode
  kind: action
  command: B2BM
  params:
    - name: mode
      type: enum
      values:
        - label: Enable
          value: "0000"
        - label: Disable
          value: "0001"
      description: Business-to-business function mode enable/disable

- id: set_usb_behavior
  label: Set USB Behavior
  kind: action
  command: USBM
  params:
    - name: mode
      type: enum
      values:
        - label: Home
          value: "0000"
        - label: B2B
          value: "0001"
      description: USB port behavior mode

- id: set_pixel_shifting
  label: Set Pixel Shifting
  kind: action
  command: PSHF
  params:
    - name: state
      type: enum
      values:
        - label: Off
          value: "0000"
        - label: On
          value: "0001"
      description: Pixel shifting on/off

- id: ir_tv_tuner_1
  label: TV Tuner1
  kind: action
  command: 04FB748B
  description: Discrete IR code for TV TUNER1

- id: ir_tv_tuner_2
  label: TV Tuner2
  kind: action
  command: 04FB758A
  description: Discrete IR code for TV TUNER2

- id: ir_av_1
  label: AV1
  kind: action
  command: 04FB7689
  description: Discrete IR code for AV1

- id: ir_av_2
  label: AV2
  kind: action
  command: 04FB7788
  description: Discrete IR code for AV2

- id: ir_scart_av_3
  label: SCART/AV3
  kind: action
  command: 04FB7887
  description: Discrete IR code for SCART/AV3

- id: ir_component_1
  label: Component1
  kind: action
  command: 04FB7986
  description: Discrete IR code for COMPONENT1

- id: ir_component_2
  label: Component2
  kind: action
  command: 04FB7A85
  description: Discrete IR code for COMPONENT2

- id: ir_component_3
  label: Component3
  kind: action
  command: 04FB7B84
  description: Discrete IR code for COMPONENT3

- id: ir_hdmi_5
  label: HDMI.5
  kind: action
  command: 04FB807F
  description: Discrete IR code for HDMI.5

- id: ir_usb
  label: USB
  kind: action
  command: 04FB827D
  description: Discrete IR code for USB

- id: ir_pip_toggle
  label: PIP Toggle
  kind: action
  command: 04FBA956
  description: Discrete IR code for PIP (toggle)

- id: ir_pip_input
  label: PIP Input
  kind: action
  command: 04FBAA55
  description: Discrete IR code for PIP INPUT

- id: ir_pip_swap
  label: PIP Swap
  kind: action
  command: 04FBAB54
  description: Discrete IR code for PIP SWAP

- id: ir_pip_position
  label: PIP Position
  kind: action
  command: 04FBAC53
  description: Discrete IR code for PIP POSITION

- id: ir_pip_size
  label: PIP Size
  kind: action
  command: 04FBAD52
  description: Discrete IR code for PIP SIZE

- id: ir_guide_toggle
  label: Guide Toggle
  kind: action
  command: 04FBAE51
  description: Discrete IR code for Guide (toggle)

- id: ir_freeze_toggle
  label: Freeze Toggle
  kind: action
  command: 04FBAF50
  description: Discrete IR code for Freeze (toggle)

- id: ir_favorite_channel
  label: Favorite Channel
  kind: action
  command: 04FB8B74
  description: Discrete IR code for FAV CHANNEL

- id: ir_channel_list
  label: Channel List
  kind: action
  command: 04FB8A75
  description: Discrete IR code for CHANNEL LIST

- id: ir_tools_second_menu
  label: Tools Second Menu
  kind: action
  command: 04FB8F70
  description: Discrete IR code for TOOLS (SECOND MENU)

- id: ir_power_toggle
  label: Power Toggle
  kind: action
  command: 04FB708F
  description: Discrete IR code for POWER (toggle)

- id: ir_power_on
  label: Power On
  kind: action
  command: 04FB718E
  description: Discrete IR code for POWER ON

- id: ir_power_off
  label: Power Off
  kind: action
  command: 04FB728D
  description: Discrete IR code for POWER OFF

- id: ir_input_toggle
  label: Input Toggle
  kind: action
  command: 04FB738C
  description: Discrete IR code for INPUT (toggle)

- id: ir_hdmi_1
  label: HDMI.1
  kind: action
  command: 04FB7C83
  description: Discrete IR code for HDMI.1

- id: ir_hdmi_2
  label: HDMI.2
  kind: action
  command: 04FB7D82
  description: Discrete IR code for HDMI.2

- id: ir_hdmi_3
  label: HDMI.3
  kind: action
  command: 04FB7E81
  description: Discrete IR code for HDMI.3

- id: ir_hdmi_4
  label: HDMI.4
  kind: action
  command: 04FB7F80
  description: Discrete IR code for HDMI.4

- id: ir_vga
  label: VGA
  kind: action
  command: 04FB817E
  description: Discrete IR code for VGA

- id: ir_picture_mode_toggle
  label: Picture Mode Toggle
  kind: action
  command: 04FB837C
  description: Discrete IR code for PICTURE MODE (toggle)

- id: ir_sound_mode_toggle
  label: Sound Mode Toggle
  kind: action
  command: 04FB847B
  description: Discrete IR code for SOUND MODE (toggle)

- id: ir_aspect_ratio_wide
  label: Aspect Ratio Wide 16:9
  kind: action
  command: 04FB857A
  description: Discrete IR code for ASPECT RATIO: WIDE 16:9

- id: ir_aspect_ratio_normal
  label: Aspect Ratio Normal 4:3
  kind: action
  command: 04FB8679
  description: Discrete IR code for ASPECT RATIO: NOMAL 4:3

- id: ir_aspect_ratio_cinema
  label: Aspect Ratio Cinema
  kind: action
  command: 04FB8778
  description: Discrete IR code for ASPECT RATIO: CINEMA

- id: ir_aspect_ratio_panorama
  label: Aspect Ratio Panorama
  kind: action
  command: 04FB8877
  description: Discrete IR code for ASPECT RATIO: PANORAMA

- id: ir_aspect_ratio_zoom
  label: Aspect Ratio Zoom
  kind: action
  command: 04FB8976
  description: Discrete IR code for ASPECT RATIO: ZOOM

- id: ir_sleep
  label: Sleep
  kind: action
  command: 04FB8C73
  description: Discrete IR code for SLEEP

- id: ir_tv_menu_toggle
  label: TV Menu Toggle
  kind: action
  command: 04FB8D72
  description: Discrete IR code for TV MENU (toggle)

- id: ir_home
  label: Home
  kind: action
  command: 04FB8E71
  description: Discrete IR code for HOME

- id: ir_digit_0
  label: Digit 0
  kind: action
  command: 04FB906F
  description: Discrete IR code for Digit “0”

- id: ir_digit_1
  label: Digit 1
  kind: action
  command: 04FB916E
  description: Discrete IR code for Digit “1”

- id: ir_digit_2
  label: Digit 2
  kind: action
  command: 04FB926D
  description: Discrete IR code for Digit “2”

- id: ir_digit_3
  label: Digit 3
  kind: action
  command: 04FB936C
  description: Discrete IR code for Digit “3”

- id: ir_digit_4
  label: Digit 4
  kind: action
  command: 04FB946B
  description: Discrete IR code for Digit “4”

- id: ir_digit_5
  label: Digit 5
  kind: action
  command: 04FB956A
  description: Discrete IR code for Digit “5”

- id: ir_digit_6
  label: Digit 6
  kind: action
  command: 04FB9669
  description: Discrete IR code for Digit “6”

- id: ir_digit_7
  label: Digit 7
  kind: action
  command: 04FB9768
  description: Discrete IR code for Digit “7”

- id: ir_digit_8
  label: Digit 8
  kind: action
  command: 04FB9867
  description: Discrete IR code for Digit “8”

- id: ir_digit_9
  label: Digit 9
  kind: action
  command: 04FB9966
  description: Discrete IR code for Digit “9”

- id: ir_dash
  label: Digit Dash
  kind: action
  command: 04FB9A65
  description: Discrete IR code for Digit “-“ (dash)

- id: ir_previous_channel
  label: Previous Channel
  kind: action
  command: 04FB9B64
  description: Discrete IR code for PREVIOUS CHANNEL

- id: ir_up_arrow
  label: Up Arrow
  kind: action
  command: 04FB9C63
  description: Discrete IR code for UP ARROW

- id: ir_down_arrow
  label: Down Arrow
  kind: action
  command: 04FB9D62
  description: Discrete IR code for DOWN ARROW

- id: ir_left_arrow
  label: Left Arrow
  kind: action
  command: 04FB9E61
  description: Discrete IR code for LEFT ARROW

- id: ir_right_arrow
  label: Right Arrow
  kind: action
  command: 04FB9F60
  description: Discrete IR code for RIGHT ARROW

- id: ir_enter
  label: Enter
  kind: action
  command: 04FBA05F
  description: Discrete IR code for ENTER

- id: ir_select_ok
  label: Select OK
  kind: action
  command: 04FBA15E
  description: Discrete IR code for SELECT (OK)

- id: ir_return
  label: Return
  kind: action
  command: 04FBA25D
  description: Discrete IR code for RETURN

- id: ir_exit
  label: Exit
  kind: action
  command: 04FBA35C
  description: Discrete IR code for EXIT

- id: ir_info_display_toggle
  label: Info Display Toggle
  kind: action
  command: 04FBA45B
  description: Discrete IR code for INFO/DISPLAY (toggle)

- id: ir_volume_minus
  label: Volume Minus
  kind: action
  command: 04FBA55A
  description: Discrete IR code for VOLUME -

- id: ir_volume_plus
  label: Volume Plus
  kind: action
  command: 04FBA659
  description: Discrete IR code for VOLUME +

- id: ir_channel_minus
  label: Channel Minus
  kind: action
  command: 04FBA758
  description: Discrete IR code for CHANNEL -

- id: ir_channel_plus
  label: Channel Plus
  kind: action
  command: 04FBA857
  description: Discrete IR code for CHANNEL +
```

## Feedbacks
```yaml
- id: power_on_command_status
  label: Power On Command Setting
  command: PWRE
  query_command: PWRE????
  query_data: "????"
  type: enum
  values:
    - label: Disabled
      value: "0"
    - label: Enabled
      value: "1"
  description: This query is not available while the TV is in standby.

- id: power_state
  label: Power State
  command: UNRESOLVED  # Source documents POWR set commands but no POWR query.
  type: enum
  values:
    - label: Standby
      value: "0000"
    - label: On
      value: "0001"

- id: current_input
  label: Current Input Source
  command: INPT
  query_command: INPT????
  query_data: "????"
  type: enum
  values:
    - label: TV
      value: "1"
    - label: Component
      value: "3"
    - label: AV
      value: "4"
    - label: VGA
      value: "6"
    - label: HDMI1
      value: "9"
    - label: HDMI2
      value: "10"
    - label: HDMI3
      value: "11"
    - label: HDMI4
      value: "12"

- id: picture_mode
  label: Current Picture Mode
  command: PMOD
  query_command: PMOD????
  query_data: "????"
  type: enum
  values:
    - label: Standard
      value: "0"
    - label: Vivid
      value: "2"
    - label: EnergySaving
      value: "3"
    - label: Theater
      value: "4"
    - label: Game
      value: "5"
    - label: Sport
      value: "6"

- id: brightness
  label: Current Brightness
  command: BRIT
  query_command: BRIT????
  query_data: "????"
  type: integer
  min: 0
  max: 100

- id: contrast
  label: Current Contrast
  command: CONT
  query_command: CONT????
  query_data: "????"
  type: integer
  min: 0
  max: 100

- id: color_saturation
  label: Current Color Saturation
  command: COLR
  query_command: COLR????
  query_data: "????"
  type: integer
  min: 0
  max: 100

- id: tint
  label: Current Tint
  command: TINT
  query_command: TINT????
  query_data: "????"
  type: integer
  min: 0
  max: 100

- id: sharpness
  label: Current Sharpness
  command: SHRP
  query_command: SHRP????
  query_data: "????"
  type: integer
  min: 0
  max: 20

- id: aspect_ratio
  label: Current Aspect Ratio
  command: ASPT
  query_command: ASPT????
  query_data: "????"
  type: enum
  values:
    - label: Auto
      value: "0"
    - label: Normal
      value: "2"
    - label: Zoom
      value: "3"
    - label: Wide
      value: "4"
    - label: Direct
      value: "5"
    - label: 1-to-1 Pixel Map
      value: "6"
    - label: Panoramic
      value: "7"
    - label: Cinema
      value: "8"

- id: overscan
  label: Current Overscan
  command: OVSN
  query_command: OVSN????
  query_data: "????"
  type: enum
  values:
    - label: On
      value: "0"
    - label: Off
      value: "2"

- id: color_temp
  label: Current Color Temperature
  command: CTEM
  query_command: CTEM????
  query_data: "????"
  type: enum
  values:
    - label: High
      value: "0"
    - label: Middle
      value: "2"
    - label: Mid-Low
      value: "3"
    - label: Low
      value: "4"

- id: backlight
  label: Current Backlight
  command: BKLV
  query_command: BKLV????
  query_data: "????"
  type: integer
  min: 0
  max: 100

- id: sound_mode
  label: Current Sound Mode
  command: AMOD
  query_command: AMOD????
  query_data: "????"
  type: enum
  values:
    - label: Standard
      value: "0"
    - label: Theater
      value: "2"
    - label: Music
      value: "3"
    - label: Speech
      value: "4"
    - label: Late Night
      value: "5"

- id: volume
  label: Current Volume
  command: VOLM
  query_command: VOLM????
  query_data: "????"
  type: integer
  min: 0
  max: 100

- id: mute_status
  label: Mute Status
  command: MUTE
  query_command: MUTE????
  query_data: "????"
  type: enum
  values:
    - label: Not Muted
      value: "0"
    - label: Muted
      value: "1"

- id: tv_speaker
  label: TV Speaker Status
  command: ASPK
  query_command: ASPK????
  query_data: "????"
  type: enum
  values:
    - label: Off
      value: "0"
    - label: On
      value: "2"

- id: tuner_mode
  label: Current Tuner Mode
  command: TUNR
  query_command: TUNR????
  query_data: "????"
  type: enum
  values:
    - label: Antenna
      value: "0"
    - label: Cable
      value: "2"

- id: caption_status
  label: Caption Status
  command: "CC##"
  query_command: "CC##????"
  query_data: "????"
  type: enum
  values:
    - label: Off
      value: "0"
    - label: On
      value: "2"
    - label: CC on when Mute
      value: "3"

- id: osd_language
  label: Current OSD Language
  command: LANG
  query_command: LANG????
  query_data: "????"
  type: enum
  values:
    - label: English
      value: "0"
    - label: "Español"
      value: "2"
    - label: "Français"
      value: "3"

- id: standby_led
  label: Standby LED Status
  command: PLED
  query_command: PLED????
  query_data: "????"
  type: enum
  values:
    - label: Off
      value: "0"
    - label: On
      value: "2"

- id: power_off_control_mode
  label: Power Off Control Mode
  command: PBTN
  query_command: PBTN????
  query_data: "????"
  type: enum
  values:
    - label: AC Only
      value: "0"
    - label: All
      value: "1"

- id: volume_range
  label: Maximum Volume Level
  command: MAVL
  query_command: MAVL????
  query_data: "????"
  type: integer
  min: 0
  max: 100

- id: volume_control_mode
  label: Volume Control Mode
  command: SVOL
  query_command: SVOL????
  query_data: "????"
  type: enum
  values:
    - label: Locked
      value: "0"
    - label: Last Volume
      value: "1"
    - label: AC Reset
      value: "2"
    - label: Standby Reset
      value: "3"

- id: volume_locked_level
  label: Volume Locked Level
  command: VLFL
  query_command: VLFL????
  query_data: "????"
  type: integer
  min: 0
  max: 100

- id: remote_key_mode
  label: Remote Key Lock Mode
  command: RMOT
  query_command: RMOT????
  query_data: "????"
  type: enum
  values:
    - label: Enable
      value: "0"
    - label: Disable
      value: "1"
    - label: Partial
      value: "2"

- id: panel_key_mode
  label: Panel Key Lock Mode
  command: PANL
  query_command: PANL????
  query_data: "????"
  type: enum
  values:
    - label: Enable
      value: "0"
    - label: Disable
      value: "1"

- id: menu_access
  label: Menu Access
  command: MENU
  query_command: MENU????
  query_data: "????"
  type: enum
  values:
    - label: Enable
      value: "0"
    - label: Disable
      value: "1"

- id: av_setting_menu
  label: AV Setting Menu
  command: AVMN
  query_command: AVMN????
  query_data: "????"
  type: enum
  values:
    - label: Disable
      value: "0"
    - label: Enable
      value: "1"

- id: osd_mode
  label: OSD Mode
  command: "OSD#"
  query_command: "OSD#????"
  query_data: "????"
  type: enum
  values:
    - label: Enable
      value: "0"
    - label: Disable
      value: "1"

- id: input_mode
  label: Input Mode
  command: INPM
  query_command: INPM????
  query_data: "????"
  type: enum
  values:
    - label: Locked
      value: "0"
    - label: Selectable
      value: "1"
    - label: AC Reset
      value: "2"
    - label: Standby Reset
      value: "3"

- id: power_on_input
  label: Power On Input Selection
  command: POIS
  query_command: POIS????
  query_data: "????"
  type: enum
  values:
    - label: Last
      value: "0"
    - label: Air
      value: "1"
    - label: AV
      value: "2"
    - label: Component
      value: "3"
    - label: VGA
      value: "4"
    - label: HDMI1
      value: "5"
    - label: HDMI2
      value: "6"
    - label: HDMI3
      value: "7"
    - label: HDMI4
      value: "8"

- id: tv_speaker_mode
  label: TV Speaker Mode
  command: SPKM
  query_command: SPKM????
  query_data: "????"
  type: enum
  values:
    - label: Speaker
      value: "0"
    - label: Off
      value: "1"

- id: b2b_mode
  label: B2B Function Mode
  command: B2BM
  query_command: B2BM????
  query_data: "????"
  type: enum
  values:
    - label: Enable
      value: "0"
    - label: Disable
      value: "1"

- id: usb_behavior
  label: USB Behavior
  command: USBM
  query_command: USBM????
  query_data: "????"
  type: enum
  values:
    - label: Home
      value: "0"
    - label: B2B
      value: "1"

- id: pixel_shifting
  label: Pixel Shifting
  command: PSHF
  query_command: PSHF????
  query_data: "????"
  type: enum
  values:
    - label: Off
      value: "0"
    - label: On
      value: "1"
```

## Variables
```yaml
# UNRESOLVED: no continuously-variable settable parameters beyond those covered in Actions
```

## Events
```yaml
# Source does not document unsolicited notifications from the TV.
# ACK responses (OKAY, EROR, WAIT) are solicited replies, not events.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - restore_factory
interlocks: []
```

## Notes
Protocol uses fixed-length ASCII frames. Set command format: `S[CLIENT_ID][COMMAND][DATA][CHECKSUM]\r`. Query format: `Q[CLIENT_ID][COMMAND]????[CHECKSUM]\r`. ACK format: `[CLIENT_ID]:[ACK][DATA][CHECKSUM]\r`. Checksum is an 8-bit checksum of a sequence of hexadecimal bytes; the checksum of the whole command string including the checksum byte equals zero. CLIENT ID is the last three bytes of the Ethernet MAC address for Smart TVs, or selected in the TV menu for Feature TVs; `ALL` broadcasts to all TVs on a system. Protocol is case-sensitive. Enable Custom Installation in the TV's Custom Install menu (Quick Settings → "7310") to enable the RS-232 port. Enable Power On Command separately for RS-232 wake from standby. The source says the Power On Command query is unavailable while the TV is in standby.

<!-- UNRESOLVED: TCP/IP transport is not documented in the supplied source -->
<!-- UNRESOLVED: the source's model list is blank and does not confirm 5U75N applicability -->
<!-- UNRESOLVED: multiple-TV daisy-chain wiring is not specified in the supplied source text -->

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
  - hisense-b2b.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://assets.hisense-usa.com/assets/ProductDownloads/16/283bdaa7ef/Hisense-Serial-Commands-for-copy-paste_0.pdf
  - "https://www.hisense-b2b.com/en/Attachment/DownloadFile?downloadId=519"
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=784"
retrieved_at: 2026-05-04T21:09:11.021Z
last_checked_at: 2026-10-07T18:12:48.135Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T18:12:48.135Z
matched_actions: 144
action_count: 144
confidence: medium
summary: "All 144 action units match source RS-232 and IR codes with correct values; serial transport matches; source catalogue is fully represented. Model list in source is blank. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP control is not documented in the supplied source"
- "the supplied source's model list is blank and does not confirm 5U75N support"
- "no continuously-variable settable parameters beyond those covered in Actions"
- "no multi-step sequences described in source"
- "TCP/IP transport is not documented in the supplied source"
- "the source's model list is blank and does not confirm 5U75N applicability"
- "multiple-TV daisy-chain wiring is not specified in the supplied source text"
- "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
