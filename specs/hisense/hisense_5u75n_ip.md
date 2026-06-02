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
last_checked_at: 2026-06-02T22:07:49.830Z
generated_at: 2026-06-02T22:07:49.830Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP control documented in separate HiSense \"IP Control User Manual\" not included in this source"
  - "no model-specific confirmation that 5U75N supports all listed commands"
  - "no continuously-variable settable parameters beyond those covered in Actions"
  - "no multi-step sequences described in source"
  - "TCP/IP transport documented in separate \"IP Control User Manual\" — command set likely overlaps but not confirmed from this source"
  - "IR discrete codes present in source but excluded from spec (not machine-serializable control)"
  - "no firmware version range stated; source revisions span 2014–2017"
  - "multiple-TV daisy-chain wiring described but pinout diagram not extractable from text"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:07:49.830Z
  matched_actions: 45
  action_count: 45
  confidence: medium
  summary: "All 45 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-05
---

# HiSense 5U75N Control Spec

## Summary
HiSense 5U75N commercial/prosumer display controllable via RS-232 serial using fixed-length ASCII command protocol. Supports power, input routing, picture/audio settings, volume, mute, channel, captions, and hospitality features. IR discrete codes also documented but not machine-controllable. TCP/IP control mentioned in discover notes but not present in this source document.

<!-- UNRESOLVED: TCP/IP control documented in separate HiSense "IP Control User Manual" not included in this source -->
<!-- UNRESOLVED: no model-specific confirmation that 5U75N supports all listed commands -->

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
    1: N/C
    2: RXD
    3: TXD
    4: DTR
    5: GND
    6: DSR
    7: RTS
    8: CTS
    9: "Power Input"
  communication_code: ASCII
auth:
  type: none  # inferred: no auth procedure in source
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
        - label: Cycle
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
```

## Feedbacks
```yaml
- id: power_on_command_status
  label: Power On Command Setting
  command: PWRE
  query_data: "????"
  type: enum
  values:
    - label: Disabled
      value: "0"
    - label: Enabled
      value: "1"

- id: power_state
  label: Power State
  command: POWR
  type: enum
  values:
    - label: Standby
      value: "0000"
    - label: On
      value: "0001"

- id: current_input
  label: Current Input Source
  command: INPT
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
  query_data: "????"
  type: integer
  min: 0
  max: 100

- id: contrast
  label: Current Contrast
  command: CONT
  query_data: "????"
  type: integer
  min: 0
  max: 100

- id: color_saturation
  label: Current Color Saturation
  command: COLR
  query_data: "????"
  type: integer
  min: 0
  max: 100

- id: tint
  label: Current Tint
  command: TINT
  query_data: "????"
  type: integer
  min: 0
  max: 100

- id: sharpness
  label: Current Sharpness
  command: SHRP
  query_data: "????"
  type: integer
  min: 0
  max: 20

- id: aspect_ratio
  label: Current Aspect Ratio
  command: ASPT
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
  query_data: "????"
  type: integer
  min: 0
  max: 100

- id: sound_mode
  label: Current Sound Mode
  command: AMOD
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
  query_data: "????"
  type: integer
  min: 0
  max: 100

- id: mute_status
  label: Mute Status
  command: MUTE
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
  query_data: "????"
  type: integer
  min: 0
  max: 100

- id: volume_control_mode
  label: Volume Control Mode
  command: SVOL
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
  query_data: "????"
  type: integer
  min: 0
  max: 100

- id: remote_key_mode
  label: Remote Key Lock Mode
  command: RMOT
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
Protocol uses fixed-length ASCII frames. Set command format: `S[CLIENT_ID][COMMAND][DATA][CHECKSUM]\r`. Query format: `Q[CLIENT_ID][COMMAND]????[CHECKSUM]\r`. ACK format: `[CLIENT_ID]:[ACK][DATA][CHECKSUM]\r`. Checksum is 8-bit sum of all bytes including checksum byte must equal zero. CLIENT ID is last 3 hex digits of Ethernet MAC address for Smart TVs, or selected in TV menu; `ALL` broadcasts to all TVs on chain. Protocol is case-sensitive. Custom Install menu must be enabled on TV (Quick Settings → "7310") before RS-232 port becomes active. Power On Command (PWRE) must be enabled separately for standby wake via RS-232.

<!-- UNRESOLVED: TCP/IP transport documented in separate "IP Control User Manual" — command set likely overlaps but not confirmed from this source -->
<!-- UNRESOLVED: IR discrete codes present in source but excluded from spec (not machine-serializable control) -->
<!-- UNRESOLVED: no firmware version range stated; source revisions span 2014–2017 -->
<!-- UNRESOLVED: multiple-TV daisy-chain wiring described but pinout diagram not extractable from text -->

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
last_checked_at: 2026-06-02T22:07:49.830Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:07:49.830Z
matched_actions: 45
action_count: 45
confidence: medium
summary: "All 45 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP control documented in separate HiSense \"IP Control User Manual\" not included in this source"
- "no model-specific confirmation that 5U75N supports all listed commands"
- "no continuously-variable settable parameters beyond those covered in Actions"
- "no multi-step sequences described in source"
- "TCP/IP transport documented in separate \"IP Control User Manual\" — command set likely overlaps but not confirmed from this source"
- "IR discrete codes present in source but excluded from spec (not machine-serializable control)"
- "no firmware version range stated; source revisions span 2014–2017"
- "multiple-TV daisy-chain wiring described but pinout diagram not extractable from text"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
