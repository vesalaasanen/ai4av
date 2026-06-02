---
spec_id: admin/hisense-100u88km-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 100U88KM Series Control Spec"
manufacturer: HiSense
model_family: "100U88KM Series"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "100U88KM Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-05-03T16:27:43.952Z
last_checked_at: 2026-06-02T22:07:37.864Z
generated_at: 2026-06-02T22:07:37.864Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "User-specified \"Known protocol: TCP/IP\" but source document only covers RS-232 serial and IR. No TCP port, IP addressing, or network protocol details in source."
  - "Source document models (55F1600, 55U1600, 65U1600, 75U1600, 86U1600) do not include 100U88KM; protocol compatibility assumed."
  - "No firmware version compatibility ranges stated."
  - "TCP/IP transport claimed by user but no port, addressing, or protocol adaptation documented in source."
  - "no unsolicited notification protocol documented in source"
  - "no power-on sequencing requirements or safety interlocks beyond PWRE documented in source"
  - "user claimed TCP/IP support but source only documents RS-232 serial"
  - "source document models differ from 100U88KM; protocol compatibility assumed not verified"
  - "no timing/latency specs for command-response cycle"
  - "POIS query may have additional input values (HDMI1-4, VGA) not shown in truncated source"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:07:37.864Z
  matched_actions: 42
  action_count: 42
  confidence: medium
  summary: "All 42 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-03
---

# HiSense 100U88KM Series Control Spec

## Summary
HiSense Prosumer TV with RS-232 serial control and discrete IR codes. Serial protocol uses fixed-length ASCII command frames with 8-bit checksum. Supports power control, input selection, picture/audio adjustments, volume, mute, channel tuning, and various hospitality/installation settings. Source document (v3.6, April 2017) lists model families 55F1600 through 86U1600; the 100U88KM Series is assumed to share the same protocol.

<!-- UNRESOLVED: User-specified "Known protocol: TCP/IP" but source document only covers RS-232 serial and IR. No TCP port, IP addressing, or network protocol details in source. -->
<!-- UNRESOLVED: Source document models (55F1600, 55U1600, 65U1600, 75U1600, 86U1600) do not include 100U88KM; protocol compatibility assumed. -->
<!-- UNRESOLVED: No firmware version compatibility ranges stated. -->

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
  connector: DB9 D-sub female chassis mount
  pinout:
    1: N/C
    2: RXD
    3: TXD
    4: DTR
    5: GND
    6: DSR
    7: RTS
    8: CTS
    9: Power Input
  communication_code: ASCII
auth:
  type: none  # inferred: no auth procedure in source
```

<!-- UNRESOLVED: TCP/IP transport claimed by user but no port, addressing, or protocol adaptation documented in source. -->

## Traits
```yaml
traits:
  - powerable     # POWR command (power on/standby)
  - routable      # INPT command (input source selection)
  - queryable     # extensive query support (INPT????, POWR????, etc.)
  - levelable     # VOLM, BRIT, CONT, BKLV, etc. (continuous value ranges)
```

## Actions
```yaml
actions:
  - id: power_on_remote_enable
    label: Enable RS-232 Remote Power On
    kind: action
    command: "S{client_id}PWRE0001{checksum}\\r"
    description: "Enable RS-232 Remote Power On. Must be enabled before POWR0001 works from standby."
    params:
      - name: client_id
        type: string
        description: "3-char hex ID (last 3 bytes of MAC) or ALL"

  - id: power_on_remote_disable
    label: Disable RS-232 Remote Power On
    kind: action
    command: "S{client_id}PWRE0000{checksum}\\r"
    description: "Disable RS-232 Remote Power On"
    params:
      - name: client_id
        type: string
        description: "3-char hex ID or ALL"

  - id: power_on
    label: Power On
    kind: action
    command: "S{client_id}POWR0001{checksum}\\r"
    description: "Power on TV"
    params:
      - name: client_id
        type: string
        description: "3-char hex ID or ALL"

  - id: power_standby
    label: Power Standby
    kind: action
    command: "S{client_id}POWR0000{checksum}\\r"
    description: "Set TV to standby"
    params:
      - name: client_id
        type: string
        description: "3-char hex ID or ALL"

  - id: select_input
    label: Select Input Source
    kind: action
    command: "S{client_id}INPT{value:04d}{checksum}\\r"
    description: "Set input source"
    params:
      - name: client_id
        type: string
        description: "3-char hex ID or ALL"
      - name: input
        type: enum
        values:
          - value: "0001"
            label: TV
          - value: "0004"
            label: AV
          - value: "0003"
            label: Component
          - value: "0009"
            label: HDMI1
          - value: "0010"
            label: HDMI2
          - value: "0011"
            label: HDMI3
          - value: "0012"
            label: HDMI4
          - value: "0006"
            label: VGA

  - id: select_input_cycle
    label: Cycle Input
    kind: action
    command: "S{client_id}INPT0000{checksum}\\r"
    description: "Change input signal one at a time (cycle)"
    params:
      - name: client_id
        type: string

  - id: set_picture_mode
    label: Set Picture Mode
    kind: action
    command: "S{client_id}PMOD{value:04d}{checksum}\\r"
    description: "Set picture mode"
    params:
      - name: client_id
        type: string
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
    label: Set Brightness
    kind: action
    command: "S{client_id}BRIT{value:04d}{checksum}\\r"
    description: "Set brightness (0-100)"
    params:
      - name: client_id
        type: string
      - name: brightness
        type: integer
        min: 0
        max: 100

  - id: set_contrast
    label: Set Contrast
    kind: action
    command: "S{client_id}CONT{value:04d}{checksum}\\r"
    description: "Set contrast (0-100)"
    params:
      - name: client_id
        type: string
      - name: contrast
        type: integer
        min: 0
        max: 100

  - id: set_color_saturation
    label: Set Color Saturation
    kind: action
    command: "S{client_id}COLR{value:04d}{checksum}\\r"
    description: "Set color saturation (0-100)"
    params:
      - name: client_id
        type: string
      - name: saturation
        type: integer
        min: 0
        max: 100

  - id: set_tint
    label: Set Tint
    kind: action
    command: "S{client_id}TINT{value:04d}{checksum}\\r"
    description: "Set tint (0-100)"
    params:
      - name: client_id
        type: string
      - name: tint
        type: integer
        min: 0
        max: 100

  - id: set_sharpness
    label: Set Sharpness
    kind: action
    command: "S{client_id}SHRP{value:04d}{checksum}\\r"
    description: "Set sharpness (0-20)"
    params:
      - name: client_id
        type: string
      - name: sharpness
        type: integer
        min: 0
        max: 20

  - id: set_aspect_ratio
    label: Set Aspect Ratio
    kind: action
    command: "S{client_id}ASPT{value:04d}{checksum}\\r"
    description: "Set aspect ratio mode"
    params:
      - name: client_id
        type: string
      - name: mode
        type: enum
        values:
          - value: "0000"
            label: Auto
          - value: "0002"
            label: Normal
          - value: "0003"
            label: Zoom
          - value: "0004"
            label: Wide
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
    command: "S{client_id}OVSN{value:04d}{checksum}\\r"
    description: "Set overscan on/off"
    params:
      - name: client_id
        type: string
      - name: state
        type: enum
        values:
          - value: "0000"
            label: On
          - value: "0002"
            label: Off

  - id: reset_picture
    label: Reset Picture Settings
    kind: action
    command: "S{client_id}RSTP1000{checksum}\\r"
    description: "Reset all picture settings to defaults"
    params:
      - name: client_id
        type: string

  - id: set_color_temp
    label: Set Color Temperature
    kind: action
    command: "S{client_id}CTEM{value:04d}{checksum}\\r"
    description: "Set color temperature"
    params:
      - name: client_id
        type: string
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
    label: Set Backlight
    kind: action
    command: "S{client_id}BKLV{value:04d}{checksum}\\r"
    description: "Set backlight value (0-100)"
    params:
      - name: client_id
        type: string
      - name: backlight
        type: integer
        min: 0
        max: 100

  - id: set_sound_mode
    label: Set Sound Mode
    kind: action
    command: "S{client_id}AMOD{value:04d}{checksum}\\r"
    description: "Set sound mode"
    params:
      - name: client_id
        type: string
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
    command: "S{client_id}RSTA2000{checksum}\\r"
    description: "Reset all audio settings to defaults"
    params:
      - name: client_id
        type: string

  - id: set_volume
    label: Set Volume
    kind: action
    command: "S{client_id}VOLM{value:04d}{checksum}\\r"
    description: "Set volume level (0-100)"
    params:
      - name: client_id
        type: string
      - name: volume
        type: integer
        min: 0
        max: 100

  - id: set_mute
    label: Set Mute
    kind: action
    command: "S{client_id}MUTE{value:04d}{checksum}\\r"
    description: "Set mute on/off"
    params:
      - name: client_id
        type: string
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
    command: "S{client_id}ASPK{value:04d}{checksum}\\r"
    description: "Enable/disable TV internal speaker"
    params:
      - name: client_id
        type: string
      - name: state
        type: enum
        values:
          - value: "0000"
            label: Off
          - value: "0002"
            label: On

  - id: set_tuner_mode
    label: Set Tuner Mode
    kind: action
    command: "S{client_id}TUNR{value:04d}{checksum}\\r"
    description: "Set tuner mode"
    params:
      - name: client_id
        type: string
      - name: mode
        type: enum
        values:
          - value: "0000"
            label: Antenna
          - value: "0002"
            label: Cable

  - id: auto_search
    label: Automatic Channel Search
    kind: action
    command: "S{client_id}TSCN0001{checksum}\\r"
    description: "Start automatic channel search"
    params:
      - name: client_id
        type: string

  - id: channel_up
    label: Channel Up
    kind: action
    command: "S{client_id}CHAN0001{checksum}\\r"
    description: "Channel up"
    params:
      - name: client_id
        type: string

  - id: channel_down
    label: Channel Down
    kind: action
    command: "S{client_id}CHAN0000{checksum}\\r"
    description: "Channel down"
    params:
      - name: client_id
        type: string

  - id: set_caption
    label: Set Caption Control
    kind: action
    command: "S{client_id}CC##{value:04d}{checksum}\\r"
    description: "Set closed caption mode"
    params:
      - name: client_id
        type: string
      - name: mode
        type: enum
        values:
          - value: "0000"
            label: Off
          - value: "0002"
            label: On
          - value: "0003"
            label: CC On When Mute

  - id: factory_reset
    label: Restore Factory Settings
    kind: action
    command: "S{client_id}RSET9999{checksum}\\r"
    description: "Full factory reset"
    params:
      - name: client_id
        type: string

  - id: set_language
    label: Set OSD Language
    kind: action
    command: "S{client_id}LANG{value:04d}{checksum}\\r"
    description: "Set on-screen display language"
    params:
      - name: client_id
        type: string
      - name: language
        type: enum
        values:
          - value: "0000"
            label: English
          - value: "0002"
            label: "Español"
          - value: "0003"
            label: Français

  - id: set_standby_led
    label: Set Standby LED
    kind: action
    command: "S{client_id}PLED{value:04d}{checksum}\\r"
    description: "Enable/disable standby LED"
    params:
      - name: client_id
        type: string
      - name: state
        type: enum
        values:
          - value: "0000"
            label: Off
          - value: "0002"
            label: On

  - id: remote_button
    label: Simulate Remote Button
    kind: action
    command: "S{client_id}BTTN{button_code}{checksum}\\r"
    description: "Simulate a remote control button press via serial"
    params:
      - name: client_id
        type: string
      - name: button
        type: enum
        values:
          - value: "1034"
            label: CH+
          - value: "1035"
            label: CH-
          - value: "1032"
            label: VOL-
          - value: "1033"
            label: VOL+
          - value: "1045"
            label: BACK
          - value: "1012"
            label: POWER
          - value: "1031"
            label: MUTE
          - value: "1010"
            label: DASH
          - value: "1036"
            label: INPUT
          - value: "1023"
            label: HiMedia
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
          - value: "1024"
            label: SLEEP
          - value: "1054"
            label: MTS/SAP
          - value: "1055"
            label: Live TV
          - value: "1018"
            label: PAUSE
          - value: "1016"
            label: PLAY
          - value: "1038"
            label: MENU
          - value: "1046"
            label: EXIT
          - value: "1020"
            label: STOP
          - value: "1015"
            label: FRW
          - value: "1027"
            label: CC
          - value: "1050"
            label: Red
          - value: "1051"
            label: Green
          - value: "1053"
            label: Yellow
          - value: "1052"
            label: Blue
          - value: "1041"
            label: UP
          - value: "1042"
            label: DOWN
          - value: "1043"
            label: LEFT
          - value: "1044"
            label: RIGHT
          - value: "1040"
            label: OK/ENTER
          - value: "1017"
            label: FFW
          - value: "1019"
            label: PREVIOUS
          - value: "1021"
            label: NEXT
          - value: "1039"
            label: HiSmart

  - id: set_power_off_mode
    label: Set Power Off Control Mode
    kind: action
    command: "S{client_id}PBTN{value:04d}{checksum}\\r"
    description: "Set power off control mode"
    params:
      - name: client_id
        type: string
      - name: mode
        type: enum
        values:
          - value: "0000"
            label: AC Only
          - value: "0001"
            label: All

  - id: set_volume_range
    label: Set Maximum Volume Level
    kind: action
    command: "S{client_id}MAVL{value:04d}{checksum}\\r"
    description: "Set maximum volume level (0-100)"
    params:
      - name: client_id
        type: string
      - name: max_volume
        type: integer
        min: 0
        max: 100

  - id: set_volume_control
    label: Set Volume Control Mode
    kind: action
    command: "S{client_id}SVOL{value:04d}{checksum}\\r"
    description: "Set volume control behavior on power-up"
    params:
      - name: client_id
        type: string
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
    label: Set Volume Locked Level
    kind: action
    command: "S{client_id}VLFL{value:04d}{checksum}\\r"
    description: "Set volume locked level when volume control is locked (0-100)"
    params:
      - name: client_id
        type: string
      - name: level
        type: integer
        min: 0
        max: 100

  - id: set_remote_key
    label: Set Remote Key Lock
    kind: action
    command: "S{client_id}RMOT{value:04d}{checksum}\\r"
    description: "Control remote control key access"
    params:
      - name: client_id
        type: string
      - name: mode
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
    command: "S{client_id}PANL{value:04d}{checksum}\\r"
    description: "Enable/disable front panel keys"
    params:
      - name: client_id
        type: string
      - name: mode
        type: enum
        values:
          - value: "0000"
            label: Enable
          - value: "0001"
            label: Disable

  - id: set_menu_access
    label: Set Menu Access
    kind: action
    command: "S{client_id}MENU{value:04d}{checksum}\\r"
    description: "Enable/disable menu access"
    params:
      - name: client_id
        type: string
      - name: mode
        type: enum
        values:
          - value: "0000"
            label: Enable
          - value: "0001"
            label: Disable

  - id: set_av_setting_menu
    label: Set AV Setting Menu
    kind: action
    command: "S{client_id}AVMN{value:04d}{checksum}\\r"
    description: "Enable/disable AV setting menu"
    params:
      - name: client_id
        type: string
      - name: mode
        type: enum
        values:
          - value: "0000"
            label: Disable
          - value: "0001"
            label: Enable

  - id: set_osd_mode
    label: Set OSD Mode
    kind: action
    command: "S{client_id}OSD#{value:04d}{checksum}\\r"
    description: "Enable/disable on-screen display"
    params:
      - name: client_id
        type: string
      - name: mode
        type: enum
        values:
          - value: "0000"
            label: Enable
          - value: "0001"
            label: Disable

  - id: set_input_mode
    label: Set Input Mode
    kind: action
    command: "S{client_id}INPM{value:04d}{checksum}\\r"
    description: "Set input mode behavior"
    params:
      - name: client_id
        type: string
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

  - id: set_power_on_input
    label: Set Power On Input Selection
    kind: action
    command: "S{client_id}POIS{value:04d}{checksum}\\r"
    description: "Set which input is selected on power-on"
    params:
      - name: client_id
        type: string
      - name: input
        type: enum
        values:
          - value: "0000"
            label: Last
          - value: "0001"
            label: TV/Air
          - value: "0002"
            label: AV
          - value: "0003"
            label: Component
```

## Feedbacks
```yaml
feedbacks:
  - id: power_on_remote_query
    label: Query Power On Command Setting
    type: enum
    command: "Q{client_id}PWRE????{checksum}\\r"
    response: "{client_id}:OKAY{data}{checksum}\\r"
    values:
      - value: "0"
        label: Disabled
      - value: "1"
        label: Enabled

  - id: input_source_query
    label: Query Current Input Source
    type: enum
    command: "Q{client_id}INPT????{checksum}\\r"
    response: "{client_id}:OKAY{data}{checksum}\\r"
    values:
      - value: "1"
        label: TV
      - value: "4"
        label: AV
      - value: "3"
        label: Component
      - value: "9"
        label: HDMI1
      - value: "10"
        label: HDMI2
      - value: "11"
        label: HDMI3
      - value: "12"
        label: HDMI4
      - value: "6"
        label: VGA

  - id: picture_mode_query
    label: Query Picture Mode
    type: enum
    command: "Q{client_id}PMOD????{checksum}\\r"
    response: "{client_id}:OKAY{data}{checksum}\\r"
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

  - id: brightness_query
    label: Query Brightness
    type: integer
    range: [0, 100]
    command: "Q{client_id}BRIT????{checksum}\\r"

  - id: contrast_query
    label: Query Contrast
    type: integer
    range: [0, 100]
    command: "Q{client_id}CONT????{checksum}\\r"

  - id: color_saturation_query
    label: Query Color Saturation
    type: integer
    range: [0, 100]
    command: "Q{client_id}COLR????{checksum}\\r"

  - id: tint_query
    label: Query Tint
    type: integer
    range: [0, 100]
    command: "Q{client_id}TINT????{checksum}\\r"

  - id: sharpness_query
    label: Query Sharpness
    type: integer
    range: [0, 20]
    command: "Q{client_id}SHRP????{checksum}\\r"

  - id: aspect_ratio_query
    label: Query Aspect Ratio
    type: enum
    command: "Q{client_id}ASPT????{checksum}\\r"
    values:
      - value: "0"
        label: Auto
      - value: "2"
        label: Normal
      - value: "3"
        label: Zoom
      - value: "4"
        label: Wide
      - value: "5"
        label: Direct
      - value: "6"
        label: 1-to-1 Pixel Map
      - value: "7"
        label: Panoramic
      - value: "8"
        label: Cinema

  - id: overscan_query
    label: Query Overscan
    type: enum
    command: "Q{client_id}OVSN????{checksum}\\r"
    values:
      - value: "0"
        label: On
      - value: "2"
        label: Off

  - id: color_temp_query
    label: Query Color Temperature
    type: enum
    command: "Q{client_id}CTEM????{checksum}\\r"
    values:
      - value: "0"
        label: High
      - value: "2"
        label: Middle
      - value: "3"
        label: Mid-Low
      - value: "4"
        label: Low

  - id: backlight_query
    label: Query Backlight
    type: integer
    range: [0, 100]
    command: "Q{client_id}BKLV????{checksum}\\r"

  - id: sound_mode_query
    label: Query Sound Mode
    type: enum
    command: "Q{client_id}AMOD????{checksum}\\r"
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

  - id: volume_query
    label: Query Volume
    type: integer
    range: [0, 100]
    command: "Q{client_id}VOLM????{checksum}\\r"

  - id: mute_query
    label: Query Mute Status
    type: enum
    command: "Q{client_id}MUTE????{checksum}\\r"
    values:
      - value: "0"
        label: Not Muted
      - value: "1"
        label: Muted

  - id: tv_speaker_query
    label: Query TV Speaker
    type: enum
    command: "Q{client_id}ASPK????{checksum}\\r"
    values:
      - value: "0"
        label: Off
      - value: "2"
        label: On

  - id: tuner_mode_query
    label: Query Tuner Mode
    type: enum
    command: "Q{client_id}TUNR????{checksum}\\r"
    values:
      - value: "0"
        label: Antenna
      - value: "2"
        label: Cable

  - id: caption_query
    label: Query Caption Control
    type: enum
    command: "Q{client_id}CC##????{checksum}\\r"
    values:
      - value: "0"
        label: Off
      - value: "2"
        label: On
      - value: "3"
        label: CC On When Mute

  - id: language_query
    label: Query OSD Language
    type: enum
    command: "Q{client_id}LANG????{checksum}\\r"
    values:
      - value: "0"
        label: English
      - value: "2"
        label: "Español"
      - value: "3"
        label: Français

  - id: standby_led_query
    label: Query Standby LED
    type: enum
    command: "Q{client_id}PLED????{checksum}\\r"
    values:
      - value: "0"
        label: Off
      - value: "2"
        label: On

  - id: power_off_mode_query
    label: Query Power Off Control Mode
    type: enum
    command: "Q{client_id}PBTN????{checksum}\\r"
    values:
      - value: "0"
        label: AC Only
      - value: "1"
        label: All

  - id: volume_range_query
    label: Query Volume Range
    type: integer
    range: [0, 100]
    command: "Q{client_id}MAVL????{checksum}\\r"

  - id: volume_control_query
    label: Query Volume Control Mode
    type: enum
    command: "Q{client_id}SVOL????{checksum}\\r"
    values:
      - value: "0"
        label: Locked
      - value: "1"
        label: Last Volume
      - value: "2"
        label: AC Reset
      - value: "3"
        label: Standby Reset

  - id: volume_locked_level_query
    label: Query Volume Locked Level
    type: integer
    range: [0, 100]
    command: "Q{client_id}VLFL????{checksum}\\r"

  - id: remote_key_query
    label: Query Remote Key Lock
    type: enum
    command: "Q{client_id}RMOT????{checksum}\\r"
    values:
      - value: "0"
        label: Enable
      - value: "1"
        label: Disable
      - value: "2"
        label: Partial

  - id: panel_key_query
    label: Query Panel Key Lock
    type: enum
    command: "Q{client_id}PANL????{checksum}\\r"
    values:
      - value: "0"
        label: Enable
      - value: "1"
        label: Disable

  - id: menu_access_query
    label: Query Menu Access
    type: enum
    command: "Q{client_id}MENU????{checksum}\\r"
    values:
      - value: "0"
        label: Enable
      - value: "1"
        label: Disable

  - id: av_setting_menu_query
    label: Query AV Setting Menu
    type: enum
    command: "Q{client_id}AVMN????{checksum}\\r"
    values:
      - value: "0"
        label: Disable
      - value: "1"
        label: Enable

  - id: osd_mode_query
    label: Query OSD Mode
    type: enum
    command: "Q{client_id}OSD#????{checksum}\\r"
    values:
      - value: "0"
        label: Enable
      - value: "1"
        label: Disable

  - id: input_mode_query
    label: Query Input Mode
    type: enum
    command: "Q{client_id}INPM????{checksum}\\r"
    values:
      - value: "0"
        label: Locked
      - value: "1"
        label: Selectable
      - value: "2"
        label: AC Reset
      - value: "3"
        label: Standby Reset

  - id: power_on_input_query
    label: Query Power On Input Selection
    type: enum
    command: "Q{client_id}POIS????{checksum}\\r"
    values:
      - value: "0"
        label: Last
      - value: "1"
        label: TV/Air
      - value: "2"
        label: AV
      - value: "3"
        label: Component
```

## Variables
```yaml
variables:
  - id: volume
    label: Volume Level
    type: integer
    min: 0
    max: 100
    set_command: "S{client_id}VOLM{value:04d}{checksum}\\r"
    query_command: "Q{client_id}VOLM????{checksum}\\r"

  - id: brightness
    label: Brightness
    type: integer
    min: 0
    max: 100
    set_command: "S{client_id}BRIT{value:04d}{checksum}\\r"
    query_command: "Q{client_id}BRIT????{checksum}\\r"

  - id: contrast
    label: Contrast
    type: integer
    min: 0
    max: 100
    set_command: "S{client_id}CONT{value:04d}{checksum}\\r"
    query_command: "Q{client_id}CONT????{checksum}\\r"

  - id: color_saturation
    label: Color Saturation
    type: integer
    min: 0
    max: 100
    set_command: "S{client_id}COLR{value:04d}{checksum}\\r"
    query_command: "Q{client_id}COLR????{checksum}\\r"

  - id: tint
    label: Tint
    type: integer
    min: 0
    max: 100
    set_command: "S{client_id}TINT{value:04d}{checksum}\\r"
    query_command: "Q{client_id}TINT????{checksum}\\r"

  - id: sharpness
    label: Sharpness
    type: integer
    min: 0
    max: 20
    set_command: "S{client_id}SHRP{value:04d}{checksum}\\r"
    query_command: "Q{client_id}SHRP????{checksum}\\r"

  - id: backlight
    label: Backlight
    type: integer
    min: 0
    max: 100
    set_command: "S{client_id}BKLV{value:04d}{checksum}\\r"
    query_command: "Q{client_id}BKLV????{checksum}\\r"

  - id: max_volume
    label: Maximum Volume Level
    type: integer
    min: 0
    max: 100
    set_command: "S{client_id}MAVL{value:04d}{checksum}\\r"
    query_command: "Q{client_id}MAVL????{checksum}\\r"

  - id: volume_locked_level
    label: Volume Locked Level
    type: integer
    min: 0
    max: 100
    set_command: "S{client_id}VLFL{value:04d}{checksum}\\r"
    query_command: "Q{client_id}VLFL????{checksum}\\r"
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol documented in source
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset
interlocks:
  - description: "PWRE (RS-232 Remote Power On) must be enabled before POWR0001 can power on from standby. PWRE is not available in standby mode itself."
# UNRESOLVED: no power-on sequencing requirements or safety interlocks beyond PWRE documented in source
```

## Notes
- **Protocol is case sensitive** — all commands must be uppercase ASCII.
- **Fixed-length frame format**: `OPERATION(1) + CLIENT_ID(3) + COMMAND(4) + DATA(4) + CHECKSUM(1) + CR(1)` = 14 bytes.
- **Checksum**: 8-bit XOR of all preceding bytes including the checksum byte itself must equal zero.
- **CLIENT_ID**: Last 3 hex bytes of TV's Ethernet MAC address, or `ALL` for broadcast to all TVs on serial bus.
- **ACK responses**: Common acknowledgements are `OKAY`, `EROR`, `WAIT`.
- **Custom Install menu**: RS-232 port must be enabled via TV menu (Quick Settings → enter "7310" → Custom Install → Enable) before serial control works.
- **DB9 connector**: Female chassis mount on TV; pin 9 provides power input for external adapter.
- **Multi-TV support**: Same RS-232 bus can address individual TVs by MAC-suffix client ID or broadcast with `ALL`.
- Source also documents extensive discrete IR Pronto CCF codes (not included in this spec — serial control only).
<!-- UNRESOLVED: user claimed TCP/IP support but source only documents RS-232 serial -->
<!-- UNRESOLVED: source document models differ from 100U88KM; protocol compatibility assumed not verified -->
<!-- UNRESOLVED: no timing/latency specs for command-response cycle -->
<!-- UNRESOLVED: POIS query may have additional input values (HDMI1-4, VGA) not shown in truncated source -->

## Provenance

```yaml
source_domains:
  - assets.hisense-usa.com
source_urls:
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-05-03T16:27:43.952Z
last_checked_at: 2026-06-02T22:07:37.864Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:07:37.864Z
matched_actions: 42
action_count: 42
confidence: medium
summary: "All 42 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "User-specified \"Known protocol: TCP/IP\" but source document only covers RS-232 serial and IR. No TCP port, IP addressing, or network protocol details in source."
- "Source document models (55F1600, 55U1600, 65U1600, 75U1600, 86U1600) do not include 100U88KM; protocol compatibility assumed."
- "No firmware version compatibility ranges stated."
- "TCP/IP transport claimed by user but no port, addressing, or protocol adaptation documented in source."
- "no unsolicited notification protocol documented in source"
- "no power-on sequencing requirements or safety interlocks beyond PWRE documented in source"
- "user claimed TCP/IP support but source only documents RS-232 serial"
- "source document models differ from 100U88KM; protocol compatibility assumed not verified"
- "no timing/latency specs for command-response cycle"
- "POIS query may have additional input values (HDMI1-4, VGA) not shown in truncated source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
