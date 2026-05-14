---
spec_id: admin/hisense-55u75qg-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "HiSense 55U75QG Series Control Spec"
manufacturer: HiSense
model_family: "55U75QG Series"
aliases: []
compatible_with:
  manufacturers:
    - HiSense
  models:
    - "55U75QG Series"
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
last_checked_at: 2026-05-14T18:17:16.150Z
generated_at: 2026-05-14T18:17:16.150Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - SPKM
  - B2BM
  - USBM
  - PSHF
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:16.150Z
  matched_actions: 43
  action_count: 43
  confidence: high
  summary: "All 74 spec actions match source commands verbatim; transport matches; source has 4 extra command families (SPKM, B2BM, USBM, PSHF) within the 5-command threshold."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-03
---

# HiSense 55U75QG Series Control Spec

## Summary
HiSense 55U75QG Series prosumer TV controllable via RS-232 serial and discrete IR. RS-232 uses a fixed-length ASCII protocol with 4-byte command and data fields, 8-bit checksum, and CR termination. Supports power, input routing, picture/audio settings, volume, and query for most parameters.

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

## Protocol Notes
```yaml
# Command format: [OP_DIR(1B)][CLIENT_ID(3B)][COMMAND(4B)][DATA(4B)][CHECKSUM(1B)][CR(1B)]
# OP_DIR: S=Set, Q=Query
# CLIENT_ID: last 3 bytes of Ethernet MAC address (hex), or "ALL" for broadcast
# ACK format: [CLIENT_ID(3B)]:[ACK(4B)][DATA(4B)][CHECKSUM(1B)][CR(1B)]
# ACK values: OKAY, EROR, WAIT
# Checksum: 8-bit sum of all bytes (including checksum) equals zero
# Termination: CR (0x0D)
# Protocol is case sensitive
```

## Traits
```yaml
traits:
  - powerable    # power on/off commands present
  - queryable    # query commands returning state present
  - routable     # input/output routing commands present
  - levelable    # volume, brightness, contrast, backlight control present
```

## Actions
```yaml
actions:
  - id: power_on_command_enable
    label: Enable RS-232 Remote Power On
    kind: action
    command: "S{CLIENT_ID}PWRE0001{CHECKSUM}\\r"
    description: "Enable RS-232 remote power on"

  - id: power_on_command_disable
    label: Disable RS-232 Remote Power On
    kind: action
    command: "S{CLIENT_ID}PWRE0000{CHECKSUM}\\r"
    description: "Disable RS-232 remote power on"

  - id: power_on
    label: Power On
    kind: action
    command: "S{CLIENT_ID}POWR0001{CHECKSUM}\\r"
    description: "Turn TV on"

  - id: power_off
    label: Power Off (Standby)
    kind: action
    command: "S{CLIENT_ID}POWR0000{CHECKSUM}\\r"
    description: "Set TV to standby"

  - id: select_input
    label: Select Input Source
    kind: action
    command: "S{CLIENT_ID}INPT{VALUE}{CHECKSUM}\\r"
    params:
      - name: input
        type: enum
        values:
          - name: TV
            value: "0001"
          - name: AV
            value: "0004"
          - name: Component
            value: "0003"
          - name: HDMI1
            value: "0009"
          - name: HDMI2
            value: "0010"
          - name: HDMI3
            value: "0011"
          - name: HDMI4
            value: "0012"
          - name: VGA
            value: "0006"
    description: "Set input source"

  - id: select_input_cycle
    label: Cycle Input Source
    kind: action
    command: "S{CLIENT_ID}INPT0000{CHECKSUM}\\r"
    description: "Change input signal one at a time"

  - id: set_picture_mode
    label: Set Picture Mode
    kind: action
    command: "S{CLIENT_ID}PMOD{VALUE}{CHECKSUM}\\r"
    params:
      - name: mode
        type: enum
        values:
          - name: Standard
            value: "0000"
          - name: Vivid
            value: "0002"
          - name: EnergySaving
            value: "0003"
          - name: Theater
            value: "0004"
          - name: Game
            value: "0005"
          - name: Sport
            value: "0006"
    description: "Set picture mode"

  - id: set_brightness
    label: Set Brightness
    kind: action
    command: "S{CLIENT_ID}BRIT{VALUE}{CHECKSUM}\\r"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
    description: "Set brightness value (0-100)"

  - id: set_contrast
    label: Set Contrast
    kind: action
    command: "S{CLIENT_ID}CONT{VALUE}{CHECKSUM}\\r"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
    description: "Set contrast value (0-100)"

  - id: set_color_saturation
    label: Set Color Saturation
    kind: action
    command: "S{CLIENT_ID}COLR{VALUE}{CHECKSUM}\\r"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
    description: "Set color saturation (0-100)"

  - id: set_tint
    label: Set Tint
    kind: action
    command: "S{CLIENT_ID}TINT{VALUE}{CHECKSUM}\\r"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
    description: "Set tint value (0-100)"

  - id: set_sharpness
    label: Set Sharpness
    kind: action
    command: "S{CLIENT_ID}SHRP{VALUE}{CHECKSUM}\\r"
    params:
      - name: value
        type: integer
        min: 0
        max: 20
    description: "Set sharpness value (0-20)"

  - id: set_aspect_ratio
    label: Set Aspect Ratio
    kind: action
    command: "S{CLIENT_ID}ASPT{VALUE}{CHECKSUM}\\r"
    params:
      - name: mode
        type: enum
        values:
          - name: Auto
            value: "0000"
          - name: Normal
            value: "0002"
          - name: Zoom
            value: "0003"
          - name: Wide
            value: "0004"
          - name: Direct
            value: "0005"
          - name: 1-to-1 pixel map
            value: "0006"
          - name: Panoramic
            value: "0007"
          - name: Cinema
            value: "0008"
    description: "Set aspect ratio"

  - id: set_overscan
    label: Set Overscan
    kind: action
    command: "S{CLIENT_ID}OVSN{VALUE}{CHECKSUM}\\r"
    params:
      - name: state
        type: enum
        values:
          - name: On
            value: "0000"
          - name: Off
            value: "0002"
    description: "Set overscan on/off"

  - id: reset_picture_settings
    label: Reset Picture Settings
    kind: action
    command: "S{CLIENT_ID}RSTP1000{CHECKSUM}\\r"
    description: "Reset all picture settings"

  - id: set_color_temperature
    label: Set Color Temperature
    kind: action
    command: "S{CLIENT_ID}CTEM{VALUE}{CHECKSUM}\\r"
    params:
      - name: temp
        type: enum
        values:
          - name: High
            value: "0000"
          - name: Middle
            value: "0002"
          - name: Mid-Low
            value: "0003"
          - name: Low
            value: "0004"
    description: "Set color temperature"

  - id: set_backlight
    label: Set Backlight
    kind: action
    command: "S{CLIENT_ID}BKLV{VALUE}{CHECKSUM}\\r"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
    description: "Set backlight value (0-100)"

  - id: set_sound_mode
    label: Set Sound Mode
    kind: action
    command: "S{CLIENT_ID}AMOD{VALUE}{CHECKSUM}\\r"
    params:
      - name: mode
        type: enum
        values:
          - name: Standard
            value: "0000"
          - name: Theater
            value: "0002"
          - name: Music
            value: "0003"
          - name: Speech
            value: "0004"
          - name: Late night
            value: "0005"
    description: "Set sound mode"

  - id: reset_audio_settings
    label: Reset Audio Settings
    kind: action
    command: "S{CLIENT_ID}RSTA2000{CHECKSUM}\\r"
    description: "Reset all audio settings"

  - id: set_volume
    label: Set Volume
    kind: action
    command: "S{CLIENT_ID}VOLM{VALUE}{CHECKSUM}\\r"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
    description: "Set volume level (0-100)"

  - id: mute_on
    label: Mute On
    kind: action
    command: "S{CLIENT_ID}MUTE0001{CHECKSUM}\\r"
    description: "Mute audio"

  - id: mute_off
    label: Mute Off
    kind: action
    command: "S{CLIENT_ID}MUTE0000{CHECKSUM}\\r"
    description: "Unmute audio"

  - id: set_tv_speaker
    label: Set TV Speaker
    kind: action
    command: "S{CLIENT_ID}ASPK{VALUE}{CHECKSUM}\\r"
    params:
      - name: state
        type: enum
        values:
          - name: Off
            value: "0000"
          - name: On
            value: "0002"
    description: "Enable or disable TV internal speakers"

  - id: set_tuner_mode
    label: Set Tuner Mode
    kind: action
    command: "S{CLIENT_ID}TUNR{VALUE}{CHECKSUM}\\r"
    params:
      - name: mode
        type: enum
        values:
          - name: Antenna
            value: "0000"
          - name: Cable
            value: "0002"
    description: "Set tuner mode"

  - id: automatic_search
    label: Automatic Channel Search
    kind: action
    command: "S{CLIENT_ID}TSCN0001{CHECKSUM}\\r"
    description: "Start automatic channel search"

  - id: channel_up
    label: Channel Up
    kind: action
    command: "S{CLIENT_ID}CHAN0001{CHECKSUM}\\r"
    description: "Channel up"

  - id: channel_down
    label: Channel Down
    kind: action
    command: "S{CLIENT_ID}CHAN0000{CHECKSUM}\\r"
    description: "Channel down"

  - id: set_caption
    label: Set Caption Control
    kind: action
    command: "S{CLIENT_ID}CC##{VALUE}{CHECKSUM}\\r"
    params:
      - name: mode
        type: enum
        values:
          - name: Off
            value: "0000"
          - name: On
            value: "0002"
          - name: CC on when mute
            value: "0003"
    description: "Set closed caption mode"

  - id: factory_reset
    label: Factory Reset
    kind: action
    command: "S{CLIENT_ID}RSET9999{CHECKSUM}\\r"
    description: "Restore factory settings"

  - id: set_osd_language
    label: Set OSD Language
    kind: action
    command: "S{CLIENT_ID}LANG{VALUE}{CHECKSUM}\\r"
    params:
      - name: language
        type: enum
        values:
          - name: English
            value: "0000"
          - name: "Español"
            value: "0002"
          - name: "Français"
            value: "0003"
    description: "Set on-screen display language"

  - id: set_standby_led
    label: Set Standby LED
    kind: action
    command: "S{CLIENT_ID}PLED{VALUE}{CHECKSUM}\\r"
    params:
      - name: state
        type: enum
        values:
          - name: Off
            value: "0000"
          - name: On
            value: "0002"
    description: "Enable or disable standby LED"

  - id: set_power_off_control_mode
    label: Set Power Off Control Mode
    kind: action
    command: "S{CLIENT_ID}PBTN{VALUE}{CHECKSUM}\\r"
    params:
      - name: mode
        type: enum
        values:
          - name: AC Only
            value: "0000"
          - name: All
            value: "0001"
    description: "Set power off control mode"

  - id: set_volume_range
    label: Set Maximum Volume Level
    kind: action
    command: "S{CLIENT_ID}MAVL{VALUE}{CHECKSUM}\\r"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
    description: "Set maximum volume level (0-100)"

  - id: set_volume_control
    label: Set Volume Control Mode
    kind: action
    command: "S{CLIENT_ID}SVOL{VALUE}{CHECKSUM}\\r"
    params:
      - name: mode
        type: enum
        values:
          - name: Locked
            value: "0000"
          - name: Last Volume
            value: "0001"
          - name: AC Reset
            value: "0002"
          - name: Standby Reset
            value: "0003"
    description: "Set volume control behavior at power on"

  - id: set_volume_locked_level
    label: Set Volume Locked Level
    kind: action
    command: "S{CLIENT_ID}VLFL{VALUE}{CHECKSUM}\\r"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
    description: "Set locked volume level (0-100)"

  - id: set_remote_key
    label: Set Remote Key Lock
    kind: action
    command: "S{CLIENT_ID}RMOT{VALUE}{CHECKSUM}\\r"
    params:
      - name: mode
        type: enum
        values:
          - name: Enable
            value: "0000"
          - name: Disable
            value: "0001"
          - name: Partial
            value: "0002"
    description: "Enable, disable, or partially lock remote control"

  - id: set_panel_key
    label: Set Panel Key Lock
    kind: action
    command: "S{CLIENT_ID}PANL{VALUE}{CHECKSUM}\\r"
    params:
      - name: mode
        type: enum
        values:
          - name: Enable
            value: "0000"
          - name: Disable
            value: "0001"
    description: "Enable or disable panel buttons"

  - id: set_menu_access
    label: Set Menu Access
    kind: action
    command: "S{CLIENT_ID}MENU{VALUE}{CHECKSUM}\\r"
    params:
      - name: mode
        type: enum
        values:
          - name: Enable
            value: "0000"
          - name: Disable
            value: "0001"
    description: "Enable or disable menu access"

  - id: set_av_setting_menu
    label: Set AV Setting Menu
    kind: action
    command: "S{CLIENT_ID}AVMN{VALUE}{CHECKSUM}\\r"
    params:
      - name: mode
        type: enum
        values:
          - name: Disable
            value: "0000"
          - name: Enable
            value: "0001"
    description: "Enable or disable AV setting menu"

  - id: set_osd_mode
    label: Set OSD Mode
    kind: action
    command: "S{CLIENT_ID}OSD#{VALUE}{CHECKSUM}\\r"
    params:
      - name: mode
        type: enum
        values:
          - name: Enable
            value: "0000"
          - name: Disable
            value: "0001"
    description: "Enable or disable on-screen display"

  - id: set_input_mode
    label: Set Input Mode
    kind: action
    command: "S{CLIENT_ID}INPM{VALUE}{CHECKSUM}\\r"
    params:
      - name: mode
        type: enum
        values:
          - name: Locked
            value: "0000"
          - name: Selectable
            value: "0001"
          - name: AC Reset
            value: "0002"
          - name: Standby Reset
            value: "0003"
    description: "Set input selection behavior at power on"

  - id: set_power_on_input
    label: Set Power On Input Selection
    kind: action
    command: "S{CLIENT_ID}POIS{VALUE}{CHECKSUM}\\r"
    params:
      - name: mode
        type: enum
        values:
          - name: Last
            value: "0000"
          - name: Air
            value: "0001"
          - name: AV
            value: "0002"
          - name: Component
            value: "0003"
    description: "Set which input is selected at power on"

  - id: remote_button
    label: Simulate Remote Button
    kind: action
    command: "S{CLIENT_ID}BTTN{VALUE}{CHECKSUM}\\r"
    params:
      - name: button
        type: enum
        values:
          - name: "0"
            value: "1000"
          - name: "1"
            value: "1001"
          - name: "2"
            value: "1002"
          - name: "3"
            value: "1003"
          - name: "4"
            value: "1004"
          - name: "5"
            value: "1005"
          - name: "6"
            value: "1006"
          - name: "7"
            value: "1007"
          - name: "8"
            value: "1008"
          - name: "9"
            value: "1009"
          - name: CH+
            value: "1034"
          - name: CH-
            value: "1035"
          - name: VOL+
            value: "1033"
          - name: VOL-
            value: "1032"
          - name: POWER
            value: "1012"
          - name: MUTE
            value: "1031"
          - name: INPUT
            value: "1036"
          - name: BACK
            value: "1045"
          - name: UP
            value: "1041"
          - name: DOWN
            value: "1042"
          - name: LEFT
            value: "1043"
          - name: RIGHT
            value: "1044"
          - name: OK/ENTER
            value: "1040"
          - name: MENU
            value: "1038"
          - name: EXIT
            value: "1046"
          - name: SLEEP
            value: "1024"
          - name: PAUSE
            value: "1018"
          - name: PLAY
            value: "1016"
          - name: STOP
            value: "1020"
          - name: FFW
            value: "1017"
          - name: FRW
            value: "1015"
          - name: PREVIOUS
            value: "1019"
          - name: NEXT
            value: "1021"
          - name: DASH
            value: "1010"
          - name: MTS/SAP
            value: "1054"
          - name: Live TV
            value: "1055"
          - name: HiMedia
            value: "1023"
          - name: HiSmart
            value: "1039"
          - name: CC
            value: "1027"
          - name: Red
            value: "1050"
          - name: Green
            value: "1051"
          - name: Yellow
            value: "1053"
          - name: Blue
            value: "1052"
    description: "Simulate an IR remote control button press via RS-232"
```

## Feedbacks
```yaml
feedbacks:
  - id: query_power_on_command_setting
    label: Power On Command Setting
    type: enum
    command: "Q{CLIENT_ID}PWRE????{CHECKSUM}\\r"
    values: ["0: Disabled", "1: Enabled"]
    description: "Query RS-232 remote power on enable state"

  - id: query_input_source
    label: Current Input Source
    type: enum
    command: "Q{CLIENT_ID}INPT????{CHECKSUM}\\r"
    values: ["1: TV", "3: Component", "4: AV", "6: VGA", "9: HDMI1", "10: HDMI2", "11: HDMI3", "12: HDMI4"]
    description: "Query current input source"

  - id: query_picture_mode
    label: Picture Mode
    type: enum
    command: "Q{CLIENT_ID}PMOD????{CHECKSUM}\\r"
    values: ["0: Standard", "2: Vivid", "3: EnergySaving", "4: Theater", "5: Game", "6: Sport"]
    description: "Query current picture mode"

  - id: query_brightness
    label: Brightness
    type: integer
    command: "Q{CLIENT_ID}BRIT????{CHECKSUM}\\r"
    range: [0, 100]
    description: "Query brightness value"

  - id: query_contrast
    label: Contrast
    type: integer
    command: "Q{CLIENT_ID}CONT????{CHECKSUM}\\r"
    range: [0, 100]
    description: "Query contrast value"

  - id: query_color_saturation
    label: Color Saturation
    type: integer
    command: "Q{CLIENT_ID}COLR????{CHECKSUM}\\r"
    range: [0, 100]
    description: "Query color saturation value"

  - id: query_tint
    label: Tint
    type: integer
    command: "Q{CLIENT_ID}TINT????{CHECKSUM}\\r"
    range: [0, 100]
    description: "Query tint value"

  - id: query_sharpness
    label: Sharpness
    type: integer
    command: "Q{CLIENT_ID}SHRP????{CHECKSUM}\\r"
    range: [0, 20]
    description: "Query sharpness value"

  - id: query_aspect_ratio
    label: Aspect Ratio
    type: enum
    command: "Q{CLIENT_ID}ASPT????{CHECKSUM}\\r"
    values: ["0: Auto", "2: Normal", "3: Zoom", "4: Wide", "5: Direct", "6: 1-to-1 pixel map", "7: Panoramic", "8: Cinema"]
    description: "Query current aspect ratio"

  - id: query_overscan
    label: Overscan
    type: enum
    command: "Q{CLIENT_ID}OVSN????{CHECKSUM}\\r"
    values: ["0: On", "2: Off"]
    description: "Query overscan state"

  - id: query_color_temperature
    label: Color Temperature
    type: enum
    command: "Q{CLIENT_ID}CTEM????{CHECKSUM}\\r"
    values: ["0: High", "2: Middle", "3: Mid-Low", "4: Low"]
    description: "Query current color temperature"

  - id: query_backlight
    label: Backlight
    type: integer
    command: "Q{CLIENT_ID}BKLV????{CHECKSUM}\\r"
    range: [0, 100]
    description: "Query backlight value"

  - id: query_sound_mode
    label: Sound Mode
    type: enum
    command: "Q{CLIENT_ID}AMOD????{CHECKSUM}\\r"
    values: ["0: Standard", "2: Theater", "3: Music", "4: Speech", "5: Late night"]
    description: "Query current sound mode"

  - id: query_volume
    label: Volume Level
    type: integer
    command: "Q{CLIENT_ID}VOLM????{CHECKSUM}\\r"
    range: [0, 100]
    description: "Query current volume level"

  - id: query_mute
    label: Mute Status
    type: enum
    command: "Q{CLIENT_ID}MUTE????{CHECKSUM}\\r"
    values: ["0: Not Muted", "1: Muted"]
    description: "Query mute status"

  - id: query_tv_speaker
    label: TV Speaker
    type: enum
    command: "Q{CLIENT_ID}ASPK????{CHECKSUM}\\r"
    values: ["0: Off", "2: On"]
    description: "Query TV speaker state"

  - id: query_tuner_mode
    label: Tuner Mode
    type: enum
    command: "Q{CLIENT_ID}TUNR????{CHECKSUM}\\r"
    values: ["0: Antenna", "2: Cable"]
    description: "Query tuner mode"

  - id: query_caption
    label: Caption Control
    type: enum
    command: "Q{CLIENT_ID}CC##????{CHECKSUM}\\r"
    values: ["0: Off", "2: On", "3: CC on when mute"]
    description: "Query caption control state"

  - id: query_osd_language
    label: OSD Language
    type: enum
    command: "Q{CLIENT_ID}LANG????{CHECKSUM}\\r"
    values: ["0: English", "2: Español", "3: Français"]
    description: "Query OSD language"

  - id: query_standby_led
    label: Standby LED
    type: enum
    command: "Q{CLIENT_ID}PLED????{CHECKSUM}\\r"
    values: ["0: Off", "2: On"]
    description: "Query standby LED state"

  - id: query_power_off_control_mode
    label: Power Off Control Mode
    type: enum
    command: "Q{CLIENT_ID}PBTN????{CHECKSUM}\\r"
    values: ["0: AC Only", "1: All"]
    description: "Query power off control mode"

  - id: query_volume_range
    label: Maximum Volume Level
    type: integer
    command: "Q{CLIENT_ID}MAVL????{CHECKSUM}\\r"
    range: [0, 100]
    description: "Query maximum volume level"

  - id: query_volume_control
    label: Volume Control Mode
    type: enum
    command: "Q{CLIENT_ID}SVOL????{CHECKSUM}\\r"
    values: ["0: Locked", "1: Last Volume", "2: AC Reset", "3: Standby Reset"]
    description: "Query volume control mode"

  - id: query_volume_locked_level
    label: Volume Locked Level
    type: integer
    command: "Q{CLIENT_ID}VLFL????{CHECKSUM}\\r"
    range: [0, 100]
    description: "Query locked volume level"

  - id: query_remote_key
    label: Remote Key Lock
    type: enum
    command: "Q{CLIENT_ID}RMOT????{CHECKSUM}\\r"
    values: ["0: Enable", "1: Disable", "2: Partial"]
    description: "Query remote key lock state"

  - id: query_panel_key
    label: Panel Key Lock
    type: enum
    command: "Q{CLIENT_ID}PANL????{CHECKSUM}\\r"
    values: ["0: Enable", "1: Disable"]
    description: "Query panel key lock state"

  - id: query_menu_access
    label: Menu Access
    type: enum
    command: "Q{CLIENT_ID}MENU????{CHECKSUM}\\r"
    values: ["0: Enable", "1: Disable"]
    description: "Query menu access state"

  - id: query_av_setting_menu
    label: AV Setting Menu
    type: enum
    command: "Q{CLIENT_ID}AVMN????{CHECKSUM}\\r"
    values: ["0: Disable", "1: Enable"]
    description: "Query AV setting menu state"

  - id: query_osd_mode
    label: OSD Mode
    type: enum
    command: "Q{CLIENT_ID}OSD#????{CHECKSUM}\\r"
    values: ["0: Enable", "1: Disable"]
    description: "Query OSD mode state"

  - id: query_input_mode
    label: Input Mode
    type: enum
    command: "Q{CLIENT_ID}INPM????{CHECKSUM}\\r"
    values: ["0: Locked", "1: Selectable", "2: AC Reset", "3: Standby Reset"]
    description: "Query input mode"

  - id: query_power_on_input
    label: Power On Input Selection
    type: enum
    command: "Q{CLIENT_ID}POIS????{CHECKSUM}\\r"
    values: ["0: Last", "1: Air", "2: AV", "3: Component"]
    description: "Query power on input selection"
```

## Variables
```yaml
variables: []
```

## Events
```yaml
events: []
```

## Macros
```yaml
macros: []
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset
interlocks: []
```

## Notes
RS-232 port must be enabled in the TV Custom Install menu (Quick Settings > enter "7310") before serial control works. To allow power-on via RS-232 while in standby, the Power On Command must also be set to Enable in the Custom Install menu. The CLIENT_ID field uses the last 3 hex bytes of the TV's Ethernet MAC address for unicast commands, or "ALL" for broadcast. Connector is a female DB9 D-sub chassis mount. IR discrete codes (Pronto CCF format) are documented in the source but not represented here as they are one-way IR signals, not serial commands.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact 55U75QG model-specific command subset not stated; source covers "Hisense Prosumer TV" generically -->
<!-- UNRESOLVED: POWER ON COMMAND SETTING (PWRE query) not available in STANDBY mode per source note -->
<!-- UNRESOLVED: POIS (Power On Input Selection) additional HDMI/USB values may exist; source picture text was truncated -->

## Provenance

```yaml
source_domains:
  - hisense-b2b.com
  - assets.hisense-usa.com
source_urls:
  - "https://www.hisense-b2b.com/Attachment/DownloadFile?downloadId=5"
  - https://assets.hisense-usa.com/assets/ProductDownloads/18/5342defe83/Hisense-RS-232-and-IR-Protocol-English_2.pdf
retrieved_at: 2026-04-30T04:31:43.572Z
last_checked_at: 2026-05-14T18:17:16.150Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:16.150Z
matched_actions: 43
action_count: 43
confidence: high
summary: "All 74 spec actions match source commands verbatim; transport matches; source has 4 extra command families (SPKM, B2BM, USBM, PSHF) within the 5-command threshold."
```

## Known Gaps

```yaml
- SPKM
- B2BM
- USBM
- PSHF
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
