---
spec_id: admin/sharp-pn-b-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp PN-B Series Control Spec"
manufacturer: Sharp
model_family: PN-B501
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - PN-B501
    - PN-B401
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.sharpnecdisplays.us
  - sharp-displays.jp.sharp
  - business.sharpusa.com
retrieved_at: 2026-04-30T10:43:39.739Z
last_checked_at: 2026-04-30T15:23:24.197Z
generated_at: 2026-04-30T15:23:24.197Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T15:23:24.197Z
  matched_actions: 97
  action_count: 97
  confidence: high
  summary: "All 97 spec actions matched literally; full coverage verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# Sharp PN-B Series Control Spec

## Summary
Sharp PN-B501 and PN-B401 professional LCD monitors with RS-232C serial and LAN (TCP) control. Supports daisy-chain operation up to 25 monitors with ID-based addressing and repeater control. Command format is 4-character command + 4-character parameter (8 bytes total).

<!-- UNRESOLVED: exact firmware versions or protocol version not stated -->
<!-- UNRESOLVED: PN-B401/PN-B501 may be discontinued; model naming variants (PN-40B401) unconfirmed -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 38400  # initial/default setting; configurable via SETUP menu
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 10008  # default data port for LAN control; configurable via TCPP command
auth:
  serial:
    type: none  # inferred: no auth procedure for RS-232C in source
  tcp:
    type: credential  # username + password login sequence over LAN
```

## Traits
```yaml
traits:
  - powerable     # POWR command for standby/on
  - queryable     # many commands support R (read) direction
  - routable      # INPS input selection, MWIP PIP source selection
  - levelable     # VOLM volume, VLMP brightness
```

## Actions
```yaml
actions:
  - id: power_standby
    label: Power Standby
    kind: action
    command: POWR0000
    description: Switches monitor to standby mode
    params: []

  - id: power_on
    label: Power On
    kind: action
    command: POWR0001
    description: Returns from standby mode
    params: []

  - id: input_toggle
    label: Input Toggle
    kind: action
    command: INPS0000
    description: Toggle change for input mode
    params: []

  - id: select_input
    label: Select Input
    kind: action
    command: "INPS{value:04d}"
    description: Select input source
    params:
      - name: input
        type: integer
        values:
          2: D-SUB RGB
          3: D-SUB Component
          10: HDMI1
          13: HDMI2
          14: DisplayPort
          21: OPTION
          24: APPLICATION

  - id: brightness_set
    label: Set Brightness
    kind: action
    command: "VLMP{value:04d}"
    description: Set brightness level
    params:
      - name: level
        type: integer
        min: 0
        max: 31

  - id: color_mode_set
    label: Set Color Mode
    kind: action
    command: "BMOD{value:04d}"
    description: Set color mode
    params:
      - name: mode
        type: integer
        values:
          0: STD
          2: VIVID
          3: sRGB
          4: HIGH ILLUMINANCE

  - id: white_balance_set
    label: Set White Balance Mode
    kind: action
    command: "WHBL{value:04d}"
    description: Set white balance mode
    params:
      - name: mode
        type: integer
        values:
          0: THRU
          1: PRESET
          2: USER

  - id: color_temp_preset_set
    label: Set Color Temperature Preset
    kind: action
    command: "CTMP{value:04d}"
    description: "Set color temperature preset (1-28). 1=~3000K to 15=~10000K (500K steps), 16=~5600K, 17=~9300K, 18=~3200K, 19=~10500K to 28=~15000K (500K steps). ERR when WHBL not set to 1."
    params:
      - name: preset
        type: integer
        min: 1
        max: 28

  - id: r_contrast_set
    label: Set R-Contrast
    kind: action
    command: "CRTR{value:04d}"
    description: "ERR when WHBL not set to 2"
    params:
      - name: value
        type: integer
        min: 0
        max: 256

  - id: g_contrast_set
    label: Set G-Contrast
    kind: action
    command: "CRTG{value:04d}"
    params:
      - name: value
        type: integer
        min: 0
        max: 256

  - id: b_contrast_set
    label: Set B-Contrast
    kind: action
    command: "CRTB{value:04d}"
    params:
      - name: value
        type: integer
        min: 0
        max: 256

  - id: r_offset_set
    label: Set R-Offset
    kind: action
    command: "OFSR{value:04d}"
    description: Negative values use minus sign, e.g. OFSR-127
    params:
      - name: value
        type: integer
        min: -127
        max: 127

  - id: g_offset_set
    label: Set G-Offset
    kind: action
    command: "OFSG{value:04d}"
    params:
      - name: value
        type: integer
        min: -127
        max: 127

  - id: b_offset_set
    label: Set B-Offset
    kind: action
    command: "OFSB{value:04d}"
    params:
      - name: value
        type: integer
        min: -127
        max: 127

  - id: copy_preset_to_user
    label: Copy Preset to User
    kind: action
    command: CPTU0000
    description: Copies a preset value to the user white balance setting
    params: []

  - id: rgb_input_range_set
    label: Set RGB Input Range
    kind: action
    command: "INPR{value:04d}"
    description: "ERR when input mode is D-SUB RGB or D-SUB Component"
    params:
      - name: range
        type: integer
        values:
          0: AUTO
          1: FULL
          2: LIMITED

  - id: date_time_set
    label: Set Date/Time
    kind: action
    command: "DATE{YYMMDDHHMM}"
    description: "Set date and time. Format: YYMMDDHHMM (Year, Month, Day, Hour, Minute)"
    params:
      - name: datetime
        type: string
        description: 10-digit string YYMMDDHHMM

  - id: schedule_set
    label: Set Schedule
    kind: action
    command: "SC{num:02d}{ABCDEFFGGH}"
    description: "Set schedule 1-8. A=enable(0/1), B=power(0=OFF/1=ON/2=Android reboot), C=repeat(0=once/1=weekly/2=daily), D=day1(0=Sun-6=Sat/9=none), E=day2, F=hour(00-23), G=minute(00-59), H=input(0=none/1=APP/2=DP/3=HDMI1/4=HDMI2/5=DSUB/6=OPTION)"
    params:
      - name: schedule_num
        type: integer
        min: 1
        max: 8
      - name: config
        type: string

  - id: schedule_brightness_set
    label: Set Schedule Brightness
    kind: action
    command: "SB{num:02d}{value:04d}"
    description: "Set brightness for schedule 1-8. Value 0-31 or 99 to disable."
    params:
      - name: schedule_num
        type: integer
        min: 1
        max: 8
      - name: brightness
        type: integer
        min: 0
        max: 99

  - id: comm_select_set
    label: Set RS-232C/LAN Select
    kind: action
    command: "CTLS{value:04d}"
    description: Select communication method
    params:
      - name: mode
        type: integer
        values:
          0: RS-232C
          1: LAN

  - id: id_set
    label: Set Monitor ID
    kind: action
    command: "IDST{value:04d}"
    description: "Set monitor ID number (0 = no ID). Supports repeater control with + suffix."
    params:
      - name: id
        type: integer
        min: 0
        max: 255

  - id: id_select_once
    label: Select ID Once
    kind: action
    command: "IDSL{value:04d}"
    description: Target next command to specified monitor ID. Effective for one command only. 0 clears.
    params:
      - name: id
        type: integer
        min: 0
        max: 255

  - id: id_lock
    label: Lock ID
    kind: action
    command: "IDLK{value:04d}"
    description: Target all subsequent commands to specified monitor ID until canceled or power off. 0 clears.
    params:
      - name: id
        type: integer
        min: 0
        max: 255

  - id: id_check
    label: Check ID
    kind: action
    command: IDCK0000
    description: Displays monitor ID and current IDLK setting on screen and in response
    params: []

  - id: id_display
    label: ID Display
    kind: action
    command: "IDDP{value:04d}"
    description: "Display IP and MAC address. 0=OFF, 1=ON, 2=ON (auto OFF after 4 sec)"
    params:
      - name: mode
        type: integer
        min: 0
        max: 2

  - id: orientation_set
    label: Set Portrait/Landscape
    kind: action
    command: "STDR{value:04d}"
    description: Set installation orientation
    params:
      - name: mode
        type: integer
        values:
          0: LANDSCAPE
          1: PORTRAIT

  - id: horizontal_install_set
    label: Set Horizontal Installation
    kind: action
    command: "MLAY{value:04d}"
    params:
      - name: mode
        type: integer
        values:
          0: OFF
          1: FACE UP
          2: FACE DOWN

  - id: enlarge_set
    label: Set Enlarge Mode
    kind: action
    command: "ENLG{value:04d}"
    params:
      - name: mode
        type: integer
        values:
          0: OFF
          1: ON

  - id: enlarge_grid_set
    label: Set Enlarge Grid
    kind: action
    command: "EMHV{value:04d}"
    description: "Set enlarge grid from 1x2 to 5x5. Format mn where m=longest, n=shortest direction."
    params:
      - name: grid
        type: integer
        min: 11
        max: 55

  - id: image_position_set
    label: Set Image Position
    kind: action
    command: "EPHV{value:04d}"
    description: "Specify position in longest/shortest direction. Format XY where X=longest, Y=shortest."
    params:
      - name: position
        type: integer
        min: 11
        max: 55

  - id: bezel_adjust_set
    label: Set Bezel Adjust
    kind: action
    command: "BZCO{value:04d}"
    params:
      - name: mode
        type: integer
        values:
          0: OFF
          1: ON

  - id: bezel_top_set
    label: Set Bezel Top
    kind: action
    command: "BZCT{value:04d}"
    params:
      - name: mode
        type: integer
        values:
          0: OFF
          1: ON

  - id: bezel_bottom_set
    label: Set Bezel Bottom
    kind: action
    command: "BZCB{value:04d}"
    params:
      - name: mode
        type: integer
        values:
          0: OFF
          1: ON

  - id: bezel_right_set
    label: Set Bezel Right
    kind: action
    command: "BZCR{value:04d}"
    params:
      - name: mode
        type: integer
        values:
          0: OFF
          1: ON

  - id: bezel_left_set
    label: Set Bezel Left
    kind: action
    command: "BZCL{value:04d}"
    params:
      - name: mode
        type: integer
        values:
          0: OFF
          1: ON

  - id: bezel_width_top_set
    label: Set Bezel Width Top
    kind: action
    command: "BZWT{value:04d}"
    params:
      - name: width
        type: integer
        min: 0
        max: 100

  - id: bezel_width_bottom_set
    label: Set Bezel Width Bottom
    kind: action
    command: "BZWB{value:04d}"
    params:
      - name: width
        type: integer
        min: 0
        max: 100

  - id: bezel_width_right_set
    label: Set Bezel Width Right
    kind: action
    command: "BZWR{value:04d}"
    params:
      - name: width
        type: integer
        min: 0
        max: 100

  - id: bezel_width_left_set
    label: Set Bezel Width Left
    kind: action
    command: "BZWL{value:04d}"
    params:
      - name: width
        type: integer
        min: 0
        max: 100

  - id: enlarge_position_combined_set
    label: Set Enlarge + Position Combined
    kind: action
    command: "ESHV{value:04d}"
    description: "XX=ENLARGE MODE (same as EMHV), YY=IMAGE POSITION (same as EPHV)"
    params:
      - name: value
        type: integer

  - id: pip_mode_set
    label: Set PIP Mode
    kind: action
    command: "MWIN{value:04d}"
    params:
      - name: mode
        type: integer
        values:
          0: OFF
          1: PIP
          2: PbyP

  - id: pip_size_set
    label: Set PIP Size
    kind: action
    command: "MPSZ{value:04d}"
    params:
      - name: size
        type: integer
        min: 1
        max: 64

  - id: pip_pos_longest_set
    label: Set PIP Position Longest Direction
    kind: action
    command: "MHPS{value:04d}"
    params:
      - name: position
        type: integer
        min: 0
        max: 100

  - id: pip_pos_shortest_set
    label: Set PIP Position Shortest Direction
    kind: action
    command: "MVPS{value:04d}"
    params:
      - name: position
        type: integer
        min: 0
        max: 100

  - id: pip_pos_batch_set
    label: Set PIP Position Batch
    kind: action
    command: "MPOS{xxx}{yyy}"
    description: "Combined position. xxx=longest side (0-100), yyy=shortest side (0-100). e.g. MPOS010097"
    params:
      - name: longest
        type: integer
        min: 0
        max: 100
      - name: shortest
        type: integer
        min: 0
        max: 100

  - id: pip_source_set
    label: Set PIP Source
    kind: action
    command: "MWIP{value:04d}"
    params:
      - name: source
        type: integer
        values:
          2: D-SUB RGB
          3: D-SUB Component
          10: HDMI1
          13: HDMI2
          14: DisplayPort
          21: OPTION
          24: APPLICATION

  - id: sound_change_set
    label: Set Sound Change
    kind: action
    command: "MWAD{value:04d}"
    params:
      - name: channel
        type: integer
        values:
          1: MAIN
          2: SUB

  - id: pip_reset
    label: Reset PIP
    kind: action
    command: RPIP0001
    params: []

  - id: all_reset
    label: All Reset
    kind: action
    command: "RSET{value:04d}"
    description: "0=ALL RESET1, 1=ALL RESET2. Timeout 30+ seconds recommended."
    params:
      - name: mode
        type: integer
        values:
          0: ALL RESET1
          1: ALL RESET2

  - id: adjustment_lock_set
    label: Set Adjustment Lock
    kind: action
    command: "ALCK{value:04d}"
    params:
      - name: mode
        type: integer
        values:
          0: OFF
          1: "ON (mode 1)"
          2: "ON (mode 2)"

  - id: adjustment_lock_target_set
    label: Set Adjustment Lock Target
    kind: action
    command: "ALTG{value:04d}"
    params:
      - name: target
        type: integer
        values:
          0: REMOTE CONTROL
          1: MONITOR BUTTONS
          2: BOTH
          3: NO

  - id: application_reboot
    label: Application Reboot
    kind: action
    command: AARB0001
    description: Restart APPLICATION mode (Android system)
    params: []

  - id: screen_size_set
    label: Set Screen Size
    kind: action
    command: "WIDE{value:04d}"
    params:
      - name: mode
        type: integer
        values:
          1: WIDE
          2: NORMAL
          3: Dot by Dot
          4: ZOOM1
          5: ZOOM2

  - id: volume_set
    label: Set Volume
    kind: action
    command: "VOLM{value:04d}"
    params:
      - name: level
        type: integer
        min: 0
        max: 31

  - id: mute_set
    label: Set Mute
    kind: action
    command: "MUTE{value:04d}"
    params:
      - name: mode
        type: integer
        values:
          0: OFF
          1: ON

  - id: standby_cause_init
    label: Initialize Standby Cause
    kind: action
    command: STCA0000
    description: Initialize/clear cause of last standby mode
    params: []

  - id: dhcp_set
    label: Set DHCP Client
    kind: action
    command: "DHCP{value:04d}"
    description: Apply with NTUP command after setting
    params:
      - name: mode
        type: integer
        values:
          0: OFF
          1: ON

  - id: ip_address_set
    label: Set IP Address
    kind: action
    command: "IPAD{XXXXXXXXXXXX}"
    description: "12-digit string. e.g. 192168150001. Apply with NTUP."
    params:
      - name: address
        type: string

  - id: subnet_mask_set
    label: Set Subnet Mask
    kind: action
    command: "SBMK{XXXXXXXXXXXX}"
    description: "12-digit string. e.g. 255255255000. Apply with NTUP."
    params:
      - name: mask
        type: string

  - id: default_gateway_set
    label: Set Default Gateway
    kind: action
    command: "DFGW{XXXXXXXXXXXX}"
    description: "12-digit string. e.g. 000000000000. Apply with NTUP."
    params:
      - name: gateway
        type: string

  - id: ftp_connection_set
    label: Set FTP Connection
    kind: action
    command: "FCHE{value:04d}"
    params:
      - name: mode
        type: integer
        values:
          0: OFF
          1: ON

  - id: monitor_name_set
    label: Set Monitor Name
    kind: action
    command: "MNTR{XXXXXXXX}"
    description: "Up to 16 chars, half-width alphanumeric, dash, underscore. No spaces."
    params:
      - name: name
        type: string

  - id: ftp_username_set
    label: Set FTP Username
    kind: action
    command: "FUSR{XXXXXXXX}"
    description: "Up to 8 chars, half-width alphanumeric, dash, underscore. Required."
    params:
      - name: username
        type: string

  - id: ftp_password_set
    label: Set FTP Password
    kind: action
    command: "FPAS{XXXXXXXX}"
    description: "Up to 8 chars, half-width alphanumeric, dash, underscore. Required."
    params:
      - name: password
        type: string

  - id: username_set
    label: Set Username
    kind: action
    command: "USER{XXXXXXXX}"
    description: "Up to 8 chars, half-width alphanumeric, dash, underscore. Can be blank."
    params:
      - name: username
        type: string

  - id: password_set
    label: Set Password
    kind: action
    command: "PASS{XXXXXXXX}"
    description: "Up to 8 chars, half-width alphanumeric, dash, underscore. Can be blank."
    params:
      - name: password
        type: string

  - id: auto_logout_set
    label: Set Auto Logout Time
    kind: action
    command: "LOTM{value:05d}"
    description: Auto logout time in minutes
    params:
      - name: minutes
        type: integer
        min: 0
        max: 65535

  - id: data_port_set
    label: Set Data Port
    kind: action
    command: "TCPP{value:05d}"
    description: Set TCP data port. Apply with NTUP.
    params:
      - name: port
        type: integer
        min: 1025
        max: 65535

  - id: apply_lan_settings
    label: Apply LAN Settings
    kind: action
    command: NTUP0001
    description: Applies DHCP, IP address, subnet mask, default gateway, and data port settings
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    command: "POWR????"
    values:
      0: standby
      1: normal_mode
      2: input_signal_waiting

  - id: input_source
    type: enum
    command: "INPS????"
    values:
      2: D-SUB_RGB
      3: D-SUB_COMPONENT
      10: HDMI1
      13: HDMI2
      14: DisplayPort
      21: OPTION
      24: APPLICATION

  - id: resolution
    type: string
    command: "PXCK????"
    description: "Returns hhh,vvv format"

  - id: brightness
    type: integer
    command: "VLMP????"
    min: 0
    max: 31

  - id: color_mode
    type: enum
    command: "BMOD????"
    values:
      0: STD
      2: VIVID
      3: sRGB
      4: HIGH_ILLUMINANCE

  - id: white_balance_mode
    type: enum
    command: "WHBL????"
    values:
      0: THRU
      1: PRESET
      2: USER

  - id: color_temp_preset
    type: integer
    command: "CTMP????"
    min: 1
    max: 28

  - id: r_contrast
    type: integer
    command: "CRTR????"
    min: 0
    max: 256

  - id: g_contrast
    type: integer
    command: "CRTG????"
    min: 0
    max: 256

  - id: b_contrast
    type: integer
    command: "CRTB????"
    min: 0
    max: 256

  - id: r_offset
    type: integer
    command: "OFSR????"
    min: -127
    max: 127

  - id: g_offset
    type: integer
    command: "OFSG????"
    min: -127
    max: 127

  - id: b_offset
    type: integer
    command: "OFSB????"
    min: -127
    max: 127

  - id: rgb_input_range
    type: enum
    command: "INPR????"
    values:
      0: AUTO
      1: FULL
      2: LIMITED

  - id: orientation
    type: enum
    command: "STDR????"
    values:
      0: LANDSCAPE
      1: PORTRAIT

  - id: horizontal_install
    type: enum
    command: "MLAY????"
    values:
      0: OFF
      1: FACE_UP
      2: FACE_DOWN

  - id: pip_mode
    type: enum
    command: "MWIN????"
    values:
      0: OFF
      1: PIP
      2: PbyP

  - id: volume
    type: integer
    command: "VOLM????"
    min: 0
    max: 31

  - id: mute_state
    type: enum
    command: "MUTE????"
    values:
      0: OFF
      1: ON

  - id: model_info
    type: string
    command: "INF1????"

  - id: serial_number
    type: string
    command: "SRNO????"

  - id: temperature_status
    type: enum
    command: "DSTA????"
    values:
      0: normal
      1: abnormal_standby
      2: abnormal_detected
      3: abnormal_dimmed
      4: sensor_abnormal

  - id: temperature_value
    type: integer
    command: "ERRT????"
    description: "Temperature sensor reading. 126 indicates sensor abnormality."

  - id: standby_cause
    type: enum
    command: "STCA????"
    values:
      0: no_error
      1: power_button
      2: main_power_switch
      3: rs232c_or_lan
      4: no_signal
      6: abnormal_temperature
      8: schedule
      20: no_operation_timeout

  - id: screen_size
    type: enum
    command: "WIDE????"
    values:
      1: WIDE
      2: NORMAL
      3: DOT_BY_DOT
      4: ZOOM1
      5: ZOOM2

  - id: dhcp_state
    type: enum
    command: "DHCP????"
    values:
      0: OFF
      1: ON

  - id: adjustment_lock
    type: enum
    command: "ALCK????"
    values:
      0: OFF
      1: "ON1"
      2: "ON2"

  - id: comm_select
    type: enum
    command: "CTLS????"
    values:
      0: RS-232C
      1: LAN
```

## Variables
```yaml
# UNRESOLVED: no distinct settable parameters beyond those covered by Actions and Feedbacks
```

## Events
```yaml
# No unsolicited notifications described. Device only responds to commands.
# WAIT is returned during long operations but is a command response, not an event.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described beyond repeater control and LAN login
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: RSET
    description: "ALL RESET. Timeout 30+ seconds required."
  - command: AARB
    description: "Application reboot (Android system restart)."
  - command: POWR
    description: "When POWER ON DELAY is active, timeout = POWER ON DELAY period + 10 seconds minimum."
# UNRESOLVED: no explicit safety warnings or interlock procedures in source beyond timing constraints
```

## Notes
- **Command format:** 4-character command + 4-character parameter (8 bytes). Pad parameters with spaces. Return code: 0x0D 0x0A (or 0x0D alone).
- **Negative parameters:** Use 3-digit value with minus sign, e.g. `OFSR-127`.
- **5+ char parameters:** Use without padding, e.g. `MPOS010097`.
- **Query format:** Use `?` in parameter field (e.g. `VOLM????`) for commands with R (read) direction.
- **Repeater control:** Set 4th parameter character to `+` to broadcast to all daisy-chained monitors (e.g. `VOLM030+`). Cancels any active IDSL/IDLK designation.
- **Response codes:** `OK` (success), `ERR` (invalid command or wrong state), `WAIT` (long operation in progress — do not send new commands).
- **Timing:** 100ms minimum interval between response and next command. Timeout: 10+ seconds (longer for daisy chain: position * 10 seconds).
- **Daisy chain:** Up to 25 monitors via RS-232 pass-through. All monitors must use same baud rate.
- **LAN login sequence:** Connect to port 10008, receive `Login:`, send username + space, receive `Password:`, send password + space, receive `OK`. Send `QUIT` + space to disconnect.
- **LAN commands identical to RS-232C** once authenticated.
- **RS-232C and LAN cannot be used simultaneously.** Set via CTLS command or SETUP menu.
- **POWER SAVE MODE ON** disables certain RS-232C/LAN commands in standby mode. Commands marked with bullet/circle symbols in source indicate availability by power state.
<!-- UNRESOLVED: exact model naming variants (PN-40B401 etc.) not confirmed -->
<!-- UNRESOLVED: POWER SAVE MODE ON/OFF command code not in source -->
<!-- UNRESOLVED: OFF IF NO OPERATION command code not in source -->
<!-- UNRESOLVED: AUTO ASSIGN ID command code not in source -->

## Provenance

```yaml
source_domains:
  - assets.sharpnecdisplays.us
  - sharp-displays.jp.sharp
  - business.sharpusa.com
retrieved_at: 2026-04-30T10:43:39.739Z
last_checked_at: 2026-04-30T15:23:24.197Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T15:23:24.197Z
matched_actions: 97
action_count: 97
confidence: high
summary: "All 97 spec actions matched literally; full coverage verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
