---
spec_id: admin/sharp-pn-m-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp PN-M Series Control Spec"
manufacturer: Sharp
model_family: "PN-M Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "PN-M Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - business.sharpusa.com
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/Manuals/PN-M401_M501_operation_manual.pdf
retrieved_at: 2026-05-02T23:19:32.799Z
last_checked_at: 2026-05-14T18:17:20.470Z
generated_at: 2026-05-14T18:17:20.470Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact PN-M model numbers (PN-M401, PN-M501, PN-M601, etc.) not listed in source; only \"PN-M Series\" referenced"
  - "firmware version compatibility not stated in source"
  - "LAN Telnet protocol details beyond login handshake not fully specified"
  - "source does not document unsolicited event notifications from the monitor"
  - "specific power-on sequencing requirements beyond POWER ON DELAY not detailed in source"
  - "exact PN-M model variants not specified in source"
  - "LAN protocol beyond basic Telnet login not fully documented"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:20.470Z
  matched_actions: 92
  action_count: 96
  confidence: medium
  summary: "All 92 spec actions (66 from Actions, 26 query Feedbacks) matched literals in source; transport parameters verified verbatim; source command catalogue fully represented. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-03
---

# Sharp PN-M Series Control Spec

## Summary
Sharp PN-M Series professional displays support external control via RS-232C serial and LAN (Telnet-style TCP) connections. Commands use a fixed 4-character command field plus 4-character parameter field. Up to 4 monitors can be daisy-chained via RS-232C with individual ID addressing (1–255). This spec covers power, input selection, picture adjustment, PIP/multi-screen, scheduling, LAN setup, and diagnostic queries.

<!-- UNRESOLVED: exact PN-M model numbers (PN-M401, PN-M501, PN-M601, etc.) not listed in source; only "PN-M Series" referenced -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: LAN Telnet protocol details beyond login handshake not fully specified -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 10008
auth:
  type: credential
  method: telnet_login
  description: >-
    LAN connection requires Telnet-style login sequence.
    Connect to IP:10008, receive "Login:" prompt, send username + space,
    receive "Password:" prompt, send password + space.
    If credentials not set, send space for each.
    Successful login returns "OK ". Send "QUIT " to disconnect.
    RS-232C has no authentication.
```

## Traits
```yaml
traits:
  - powerable     # inferred from POWR command
  - queryable     # inferred from multiple R-direction commands
  - routable      # inferred from INPS input selection and MWIP PIP source
  - levelable     # inferred from VOLM volume and VLMP brightness controls
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
    command: "INPS????"
    description: Selects input source
    params:
      - name: input
        type: integer
        enum:
          - value: 2
            label: D-SUB RGB
          - value: 3
            label: D-SUB Component
          - value: 10
            label: HDMI1
          - value: 13
            label: HDMI2
          - value: 14
            label: DisplayPort
          - value: 21
            label: OPTION
          - value: 24
            label: APPLICATION
        description: Input source number (zero-padded to 4 digits)

  - id: set_brightness
    label: Set Brightness
    kind: action
    command: "VLMP????"
    description: Sets brightness level
    params:
      - name: level
        type: integer
        min: 0
        max: 31
        description: Brightness level (zero-padded to 4 digits)

  - id: set_color_mode
    label: Set Color Mode
    kind: action
    command: "BMOD????"
    description: Sets color mode
    params:
      - name: mode
        type: integer
        enum:
          - value: 0
            label: STD
          - value: 2
            label: VIVID
          - value: 3
            label: sRGB
          - value: 4
            label: HIGH ILLUMINANCE
        description: Color mode value (zero-padded to 4 digits)

  - id: set_white_balance
    label: Set White Balance Mode
    kind: action
    command: "WHBL????"
    description: Sets white balance mode
    params:
      - name: mode
        type: integer
        enum:
          - value: 0
            label: THRU
          - value: 1
            label: PRESET
          - value: 2
            label: USER
        description: White balance mode (zero-padded to 4 digits)

  - id: set_color_temperature
    label: Set Color Temperature Preset
    kind: action
    command: "CTMP????"
    description: Sets color temperature preset (1=3000K to 15=10000K in 500K steps, 16=5600K, 17=9300K, 18=3200K, 19=10500K to 28=15000K). ERR when WHBL is not set to 1.
    params:
      - name: preset
        type: integer
        min: 1
        max: 28
        description: Color temperature preset number (zero-padded to 4 digits)

  - id: set_r_contrast
    label: Set R-Contrast
    kind: action
    command: "CRTR????"
    description: Sets red contrast. ERR when WHBL is not set to 2.
    params:
      - name: value
        type: integer
        min: 0
        max: 256
        description: Red contrast value (zero-padded to 4 digits)

  - id: set_g_contrast
    label: Set G-Contrast
    kind: action
    command: "CRTG????"
    description: Sets green contrast. ERR when WHBL is not set to 2.
    params:
      - name: value
        type: integer
        min: 0
        max: 256
        description: Green contrast value (zero-padded to 4 digits)

  - id: set_b_contrast
    label: Set B-Contrast
    kind: action
    command: "CRTB????"
    description: Sets blue contrast. ERR when WHBL is not set to 2.
    params:
      - name: value
        type: integer
        min: 0
        max: 256
        description: Blue contrast value (zero-padded to 4 digits)

  - id: set_r_offset
    label: Set R-Offset
    kind: action
    command: "OFSR????"
    description: Sets red offset
    params:
      - name: value
        type: integer
        min: -127
        max: 127
        description: Red offset value (3-digit signed, zero-padded)

  - id: set_g_offset
    label: Set G-Offset
    kind: action
    command: "OFSG????"
    description: Sets green offset
    params:
      - name: value
        type: integer
        min: -127
        max: 127
        description: Green offset value (3-digit signed, zero-padded)

  - id: set_b_offset
    label: Set B-Offset
    kind: action
    command: "OFSB????"
    description: Sets blue offset
    params:
      - name: value
        type: integer
        min: -127
        max: 127
        description: Blue offset value (3-digit signed, zero-padded)

  - id: copy_preset_to_user
    label: Copy Preset to User
    kind: action
    command: CPTU0000
    description: Copies a preset value to the user setting
    params: []

  - id: set_rgb_input_range
    label: Set RGB Input Range
    kind: action
    command: "INPR????"
    description: Sets RGB input range. ERR when input is D-SUB RGB, D-SUB Component, or APPLICATION.
    params:
      - name: range
        type: integer
        enum:
          - value: 0
            label: AUTO
          - value: 1
            label: FULL
          - value: 2
            label: LIMITED
        description: RGB input range (zero-padded to 4 digits)

  - id: set_date_time
    label: Set Date/Time
    kind: action
    command: "DATE??????"
    description: Sets date and time (AABBCCDDEE = Year,Month,Day,Hour,Minute)
    params:
      - name: datetime
        type: string
        description: 10-digit string AABBCCDDEE (AA=Year, BB=Month, CC=Day, DD=Hour, EE=Minute)

  - id: set_schedule
    label: Set Schedule
    kind: action
    command: "SCXX???????"
    description: Sets schedule (SC01-SC08). Parameter ABCDEFFGGH format. A=effective(0/1), B=power(0=OFF/1=ON/2=Android restart), C=day pattern(0=once/1=weekly/2=daily), D=day1(0=Sun..6=Sat/9=NA), E=day2(0=Sun..6=Sat/9=NA), F=hour(00-23), G=minute(00-59), H=input(0=unspecified/1=APP/2=DP/3=HDMI1/4=HDMI2/5=D-SUB/6=OPTION)
    params:
      - name: schedule_num
        type: integer
        min: 1
        max: 8
        description: Schedule number (01-08)
      - name: param
        type: string
        description: 9-character schedule parameter string

  - id: set_schedule_brightness
    label: Set Schedule Brightness
    kind: action
    command: "SBXX????"
    description: Sets screen brightness for schedule (SB01-SB08). Value 0-31 or 99 to disable.
    params:
      - name: schedule_num
        type: integer
        min: 1
        max: 8
        description: Schedule number (01-08)
      - name: brightness
        type: integer
        description: Brightness 0-31 or 99 to disable (zero-padded to 4 digits)

  - id: set_control_interface
    label: Set Control Interface
    kind: action
    command: "CTLS????"
    description: Selects RS-232C or LAN control
    params:
      - name: interface
        type: integer
        enum:
          - value: 0
            label: RS-232C
          - value: 1
            label: LAN
        description: Interface selection (zero-padded to 4 digits)

  - id: set_id_number
    label: Set ID Number
    kind: action
    command: "IDST????"
    description: Sets monitor ID number (0 means no ID number)
    params:
      - name: id
        type: integer
        min: 0
        max: 255
        description: Monitor ID number (zero-padded to 4 digits)

  - id: set_id_once
    label: Set ID Once (IDSL)
    kind: action
    command: "IDSL????"
    description: Sets target monitor ID for the immediately next command only. 0 clears designation.
    params:
      - name: id
        type: integer
        min: 0
        max: 255
        description: Monitor ID number (zero-padded to 4 digits)

  - id: set_id_subsequent
    label: Set ID Subsequent (IDLK)
    kind: action
    command: "IDLK????"
    description: Sets target monitor ID for all subsequent commands. Remains until canceled or power off. 0 clears.
    params:
      - name: id
        type: integer
        min: 0
        max: 255
        description: Monitor ID number (zero-padded to 4 digits)

  - id: check_id
    label: Check ID
    kind: action
    command: IDCK0000
    description: Displays monitor's own ID and selected IDLK ID on screen. Response format "ID : xxx  IDLK : yyy"
    params: []

  - id: set_id_display
    label: Set ID Display
    kind: action
    command: "IDDP????"
    description: Controls on-screen display of IP/MAC address and ID
    params:
      - name: mode
        type: integer
        enum:
          - value: 0
            label: OFF
          - value: 1
            label: ON
          - value: 2
            label: "ON (auto-off after 4 sec)"
        description: Display mode (zero-padded to 4 digits)

  - id: set_orientation
    label: Set Orientation
    kind: action
    command: "STDR????"
    description: Sets portrait or landscape orientation
    params:
      - name: orientation
        type: integer
        enum:
          - value: 0
            label: LANDSCAPE
          - value: 1
            label: PORTRAIT
        description: Orientation (zero-padded to 4 digits)

  - id: set_horizontal_install
    label: Set Horizontal Installation
    kind: action
    command: "MLAY????"
    description: Sets horizontal installation mode
    params:
      - name: mode
        type: integer
        enum:
          - value: 0
            label: OFF
          - value: 1
            label: FACE UP
          - value: 2
            label: FACE DOWN
        description: Installation mode (zero-padded to 4 digits)

  - id: set_enlarge
    label: Set Enlarge Mode
    kind: action
    command: "ENLG????"
    description: Enables or disables enlarge mode
    params:
      - name: mode
        type: integer
        enum:
          - value: 0
            label: OFF
          - value: 1
            label: ON
        description: Enlarge mode (zero-padded to 4 digits)

  - id: set_enlarge_layout
    label: Set Enlarge Layout
    kind: action
    command: "EMHV????"
    description: Sets enlarge grid layout (mn where m=longest direction count, n=shortest direction count). Range 12 or 21 through 55.
    params:
      - name: layout
        type: string
        description: Two-digit layout code (e.g. 12 for 1x2, 55 for 5x5)

  - id: set_image_position
    label: Set Image Position
    kind: action
    command: "EPHV????"
    description: Sets image position within enlarge grid (longest/shortest direction). Range 11-55.
    params:
      - name: position
        type: string
        description: Two-digit position code (11-55)

  - id: set_bezel_compensation
    label: Set Bezel Compensation
    kind: action
    command: "BZCO????"
    description: Enables or disables bezel compensation
    params:
      - name: mode
        type: integer
        enum:
          - value: 0
            label: OFF
          - value: 1
            label: ON
        description: Bezel compensation mode (zero-padded to 4 digits)

  - id: set_bezel_width_top
    label: Set Bezel Width Top
    kind: action
    command: "BZWT????"
    description: Sets top bezel width
    params:
      - name: width
        type: integer
        min: 0
        max: 100
        description: Bezel width (zero-padded to 4 digits)

  - id: set_bezel_width_bottom
    label: Set Bezel Width Bottom
    kind: action
    command: "BZWB????"
    description: Sets bottom bezel width
    params:
      - name: width
        type: integer
        min: 0
        max: 100
        description: Bezel width (zero-padded to 4 digits)

  - id: set_bezel_width_right
    label: Set Bezel Width Right
    kind: action
    command: "BZWR????"
    description: Sets right bezel width
    params:
      - name: width
        type: integer
        min: 0
        max: 100
        description: Bezel width (zero-padded to 4 digits)

  - id: set_bezel_width_left
    label: Set Bezel Width Left
    kind: action
    command: "BZWL????"
    description: Sets left bezel width
    params:
      - name: width
        type: integer
        min: 0
        max: 100
        description: Bezel width (zero-padded to 4 digits)

  - id: set_enlarge_and_position
    label: Set Enlarge and Position
    kind: action
    command: "ESHV????"
    description: Combined enlarge mode and image position (XX=mode same as EMHV, YY=position same as EPHV)
    params:
      - name: value
        type: string
        description: Four-digit code XXYY (XX=enlarge mode, YY=image position)

  - id: set_pip_mode
    label: Set PIP Mode
    kind: action
    command: "MWIN????"
    description: Sets PIP mode
    params:
      - name: mode
        type: integer
        enum:
          - value: 0
            label: OFF
          - value: 1
            label: PIP
          - value: 2
            label: PbyP
        description: PIP mode (zero-padded to 4 digits)

  - id: set_pip_size
    label: Set PIP Size
    kind: action
    command: "MPSZ????"
    description: Sets PIP window size
    params:
      - name: size
        type: integer
        min: 1
        max: 64
        description: PIP size (zero-padded to 4 digits)

  - id: set_pip_horizontal_position
    label: Set PIP Horizontal Position
    kind: action
    command: "MHPS????"
    description: Sets PIP horizontal position (longest direction)
    params:
      - name: position
        type: integer
        min: 0
        max: 100
        description: Position percentage (zero-padded to 4 digits)

  - id: set_pip_vertical_position
    label: Set PIP Vertical Position
    kind: action
    command: "MVPS????"
    description: Sets PIP vertical position (shortest direction)
    params:
      - name: position
        type: integer
        min: 0
        max: 100
        description: Position percentage (zero-padded to 4 digits)

  - id: set_pip_position_batch
    label: Set PIP Position Batch
    kind: action
    command: "MPOS???????"
    description: Sets PIP position in MPOSxxxyyy format (xxx=longer side, yyy=shorter side)
    params:
      - name: horizontal
        type: integer
        min: 0
        max: 100
        description: Longer side position (zero-padded to 3 digits)
      - name: vertical
        type: integer
        min: 0
        max: 100
        description: Shorter side position (zero-padded to 3 digits)

  - id: set_pip_source
    label: Set PIP Source
    kind: action
    command: "MWIP????"
    description: Sets PIP sub-window input source
    params:
      - name: input
        type: integer
        enum:
          - value: 2
            label: D-SUB RGB
          - value: 3
            label: D-SUB Component
          - value: 10
            label: HDMI1
          - value: 13
            label: HDMI2
          - value: 14
            label: DisplayPort
          - value: 21
            label: OPTION
          - value: 24
            label: APPLICATION
        description: Input source number (zero-padded to 4 digits)

  - id: set_sound_change
    label: Set Sound Change
    kind: action
    command: "MWAD????"
    description: Switches audio between main and sub in PIP mode
    params:
      - name: channel
        type: integer
        enum:
          - value: 1
            label: MAIN
          - value: 2
            label: SUB
        description: Audio channel (zero-padded to 4 digits)

  - id: reset_pip
    label: Reset PIP
    kind: action
    command: RPIP0001
    description: Resets PIP settings
    params: []

  - id: all_reset
    label: All Reset
    kind: action
    command: "RSET????"
    description: Performs full reset
    params:
      - name: type
        type: integer
        enum:
          - value: 0
            label: ALL RESET 1
          - value: 1
            label: ALL RESET 2
        description: Reset type (zero-padded to 4 digits)

  - id: set_adjustment_lock
    label: Set Adjustment Lock
    kind: action
    command: "ALCK????"
    description: Sets adjustment lock
    params:
      - name: mode
        type: integer
        enum:
          - value: 0
            label: OFF
          - value: 1
            label: "ON 1"
          - value: 2
            label: "ON 2"
        description: Lock mode (zero-padded to 4 digits)

  - id: set_adjustment_lock_target
    label: Set Adjustment Lock Target
    kind: action
    command: "ALTG????"
    description: Sets which inputs are locked
    params:
      - name: target
        type: integer
        enum:
          - value: 0
            label: REMOTE CONTROL
          - value: 1
            label: MONITOR BUTTONS
          - value: 2
            label: BOTH
        description: Lock target (zero-padded to 4 digits)

  - id: application_reboot
    label: Application Reboot
    kind: action
    command: AARB0001
    description: Reboots the application
    params: []

  - id: set_screen_size
    label: Set Screen Size
    kind: action
    command: "WIDE????"
    description: Sets screen size mode
    params:
      - name: mode
        type: integer
        enum:
          - value: 1
            label: WIDE
          - value: 2
            label: NORMAL
          - value: 3
            label: Dot by Dot
          - value: 4
            label: ZOOM1
          - value: 5
            label: ZOOM2
        description: Screen size mode (zero-padded to 4 digits)

  - id: set_volume
    label: Set Volume
    kind: action
    command: "VOLM????"
    description: Sets audio volume level
    params:
      - name: level
        type: integer
        min: 0
        max: 31
        description: Volume level (zero-padded to 4 digits)

  - id: set_mute
    label: Set Mute
    kind: action
    command: "MUTE????"
    description: Sets audio mute state
    params:
      - name: state
        type: integer
        enum:
          - value: 0
            label: OFF
          - value: 1
            label: ON
        description: Mute state (zero-padded to 4 digits)

  - id: init_standby_cause
    label: Initialize Standby Cause
    kind: action
    command: STCA0000
    description: Initializes/resets the last standby cause record
    params: []

  - id: set_dhcp
    label: Set DHCP Client
    kind: action
    command: "DHCP????"
    description: Enables or disables DHCP client. Must apply with NTUP command.
    params:
      - name: state
        type: integer
        enum:
          - value: 0
            label: OFF
          - value: 1
            label: ON
        description: DHCP state (zero-padded to 4 digits)

  - id: set_ip_address
    label: Set IP Address
    kind: action
    command: "IPAD????????????"
    description: Sets IP address as 12-digit numeric string (e.g. 192168150001 for 192.168.150.1). Apply with NTUP.
    params:
      - name: address
        type: string
        description: 12-digit IP address (each octet zero-padded to 3 digits)

  - id: set_subnet_mask
    label: Set Subnet Mask
    kind: action
    command: "SBMK????????????"
    description: Sets subnet mask as 12-digit numeric string. Apply with NTUP.
    params:
      - name: mask
        type: string
        description: 12-digit subnet mask (each octet zero-padded to 3 digits)

  - id: set_default_gateway
    label: Set Default Gateway
    kind: action
    command: "DFGW????????????"
    description: Sets default gateway as 12-digit numeric string. Apply with NTUP.
    params:
      - name: gateway
        type: string
        description: 12-digit gateway address (each octet zero-padded to 3 digits)

  - id: set_ftp
    label: Set FTP Connection
    kind: action
    command: "FCHE????"
    description: Enables or disables FTP connection
    params:
      - name: state
        type: integer
        enum:
          - value: 0
            label: FTP OFF
          - value: 1
            label: FTP ON
        description: FTP state (zero-padded to 4 digits)

  - id: set_monitor_name
    label: Set Monitor Name
    kind: action
    command: "MNTR????????????????"
    description: Sets monitor name (up to 16 half-width alphanumeric, hyphen, underscore characters in two 8-char fields)
    params:
      - name: name
        type: string
        description: Monitor name (up to 16 characters)

  - id: set_ftp_username
    label: Set FTP Username
    kind: action
    command: "FUSR????????"
    description: Sets FTP username (up to 8 half-width alphanumeric, hyphen, underscore characters)
    params:
      - name: username
        type: string
        description: FTP username (up to 8 characters)

  - id: set_ftp_password
    label: Set FTP Password
    kind: action
    command: "FPAS????????"
    description: Sets FTP password (up to 8 half-width alphanumeric, hyphen, underscore characters)
    params:
      - name: password
        type: string
        description: FTP password (up to 8 characters)

  - id: set_username
    label: Set Username
    kind: action
    command: "USER????????"
    description: Sets LAN control username (up to 8 half-width alphanumeric, hyphen, underscore characters)
    params:
      - name: username
        type: string
        description: Username (up to 8 characters)

  - id: set_password
    label: Set Password
    kind: action
    command: "PASS????????"
    description: Sets LAN control password (up to 8 half-width alphanumeric, hyphen, underscore characters)
    params:
      - name: password
        type: string
        description: Password (up to 8 characters)

  - id: set_auto_logout_time
    label: Set Auto Logout Time
    kind: action
    command: "LOTM?????????"
    description: Sets auto logout time in minutes
    params:
      - name: minutes
        type: integer
        min: 0
        max: 65535
        description: Auto logout time in minutes (zero-padded to 5 digits)

  - id: set_data_port
    label: Set Data Port
    kind: action
    command: "TCPP?????????"
    description: Sets TCP data port number. Apply with NTUP.
    params:
      - name: port
        type: integer
        min: 1025
        max: 65535
        description: TCP port number (zero-padded to 5 digits)

  - id: apply_lan_settings
    label: Apply LAN Settings
    kind: action
    command: NTUP0001
    description: Applies DHCP, IP address, subnet mask, default gateway, and data port settings
    params: []

  - id: lan_quit
    label: LAN Disconnect
    kind: action
    command: "QUIT "
    description: Disconnects LAN session. Monitor responds with "goodbye".
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    type: enum
    query_command: "POWR????"
    values:
      - value: 0
        label: Standby mode
      - value: 1
        label: Normal mode
      - value: 2
        label: Input signal waiting mode

  - id: input_source
    label: Input Source
    type: enum
    query_command: "INPS????"
    values:
      - value: 2
        label: D-SUB RGB
      - value: 3
        label: D-SUB Component
      - value: 10
        label: HDMI1
      - value: 13
        label: HDMI2
      - value: 14
        label: DisplayPort
      - value: 21
        label: OPTION
      - value: 24
        label: APPLICATION

  - id: resolution
    label: Resolution
    type: string
    query_command: "PXCK????"
    description: Returns current resolution as hhh,vvv

  - id: brightness_level
    label: Brightness Level
    type: integer
    query_command: "VLMP????"
    min: 0
    max: 31

  - id: color_mode
    label: Color Mode
    type: enum
    query_command: "BMOD????"
    values:
      - value: 0
        label: STD
      - value: 2
        label: VIVID
      - value: 3
        label: sRGB
      - value: 4
        label: HIGH ILLUMINANCE

  - id: white_balance_mode
    label: White Balance Mode
    type: enum
    query_command: "WHBL????"
    values:
      - value: 0
        label: THRU
      - value: 1
        label: PRESET
      - value: 2
        label: USER

  - id: color_temperature
    label: Color Temperature Preset
    type: integer
    query_command: "CTMP????"
    min: 1
    max: 28

  - id: r_contrast
    label: R-Contrast
    type: integer
    query_command: "CRTR????"
    min: 0
    max: 256

  - id: g_contrast
    label: G-Contrast
    type: integer
    query_command: "CRTG????"
    min: 0
    max: 256

  - id: b_contrast
    label: B-Contrast
    type: integer
    query_command: "CRTB????"
    min: 0
    max: 256

  - id: r_offset
    label: R-Offset
    type: integer
    query_command: "OFSR????"
    min: -127
    max: 127

  - id: g_offset
    label: G-Offset
    type: integer
    query_command: "OFSG????"
    min: -127
    max: 127

  - id: b_offset
    label: B-Offset
    type: integer
    query_command: "OFSB????"
    min: -127
    max: 127

  - id: rgb_input_range
    label: RGB Input Range
    type: enum
    query_command: "INPR????"
    values:
      - value: 0
        label: AUTO
      - value: 1
        label: FULL
      - value: 2
        label: LIMITED

  - id: orientation
    label: Orientation
    type: enum
    query_command: "STDR????"
    values:
      - value: 0
        label: LANDSCAPE
      - value: 1
        label: PORTRAIT

  - id: horizontal_install
    label: Horizontal Installation
    type: enum
    query_command: "MLAY????"
    values:
      - value: 0
        label: OFF
      - value: 1
        label: FACE UP
      - value: 2
        label: FACE DOWN

  - id: volume_level
    label: Volume Level
    type: integer
    query_command: "VOLM????"
    min: 0
    max: 31

  - id: mute_state
    label: Mute State
    type: enum
    query_command: "MUTE????"
    values:
      - value: 0
        label: OFF
      - value: 1
        label: ON

  - id: model_info
    label: Model Information
    type: string
    query_command: "INF1????"
    description: Returns monitor model name

  - id: serial_number
    label: Serial Number
    type: string
    query_command: "SRNO????"
    description: Returns monitor serial number

  - id: temperature_sensor_status
    label: Temperature Sensor Status
    type: enum
    query_command: "DSTA????"
    values:
      - value: 0
        label: Internal temperature normal
      - value: 1
        label: Internal temperature abnormal - monitor in standby
      - value: 2
        label: Internal temperature abnormal occurred
      - value: 3
        label: Internal temperature abnormal - backlight dimmed
      - value: 4
        label: Temperature sensor abnormal

  - id: temperature_value
    label: Temperature Value
    type: integer
    query_command: "ERRT????"
    description: Returns temperature sensor reading. Value 126 indicates sensor abnormality.

  - id: standby_cause
    label: Last Standby Cause
    type: enum
    query_command: "STCA????"
    values:
      - value: 0
        label: No detectable error
      - value: 1
        label: Standby by POWER/MONITOR OFF button
      - value: 2
        label: Main power off by main power switch
      - value: 3
        label: Standby by RS-232C or LAN
      - value: 4
        label: Input signal waiting by No Signal
      - value: 6
        label: Standby by abnormal temperature
      - value: 8
        label: Standby by SCHEDULE setting
      - value: 20
        label: Standby by OFF IF NO OPERATION

  - id: screen_size
    label: Screen Size Mode
    type: enum
    query_command: "WIDE????"
    values:
      - value: 1
        label: WIDE
      - value: 2
        label: NORMAL
      - value: 3
        label: Dot by Dot
      - value: 4
        label: ZOOM1
      - value: 5
        label: ZOOM2

  - id: adjustment_lock
    label: Adjustment Lock
    type: enum
    query_command: "ALCK????"
    values:
      - value: 0
        label: OFF
      - value: 1
        label: "ON 1"
      - value: 2
        label: "ON 2"

  - id: control_interface
    label: Control Interface
    type: enum
    query_command: "CTLS????"
    values:
      - value: 0
        label: RS-232C
      - value: 1
        label: LAN

  - id: dhcp_state
    label: DHCP Client State
    type: enum
    query_command: "DHCP????"
    values:
      - value: 0
        label: OFF
      - value: 1
        label: ON

  - id: pip_mode
    label: PIP Mode
    type: enum
    query_command: "MWIN????"
    values:
      - value: 0
        label: OFF
      - value: 1
        label: PIP
      - value: 2
        label: PbyP

  - id: pip_source
    label: PIP Source
    type: enum
    query_command: "MWIP????"
    values:
      - value: 2
        label: D-SUB RGB
      - value: 3
        label: D-SUB Component
      - value: 10
        label: HDMI1
      - value: 13
        label: HDMI2
      - value: 14
        label: DisplayPort
      - value: 21
        label: OPTION
      - value: 24
        label: APPLICATION

  - id: schedule_brightness
    label: Schedule Brightness
    type: integer
    query_command: "SBXX????"
    description: Returns brightness for schedule SB01-SB08 (0-31 or 99 for disabled)
```

## Variables
```yaml
variables: []
# All settable parameters are represented as Actions with corresponding query Feedbacks.
```

## Events
```yaml
events: []
# UNRESOLVED: source does not document unsolicited event notifications from the monitor
```

## Macros
```yaml
macros:
  - id: daisy_chain_auto_id
    label: Daisy Chain Auto-ID Assignment
    description: >-
      Uses IDST command with repeater control to automatically assign sequential
      ID numbers to all monitors in a daisy chain. Send "IDST001+" to assign
      IDs 1, 2, 3, 4 etc. to each monitor in order. Each monitor responds
      "OK" with its assigned ID number.
    steps:
      - Send IDST001+ (ID set command with repeater)
      - Wait for WAIT response
      - Wait for OK responses from all monitors (each includes ID number)

  - id: repeater_set_volume_all
    label: Set Volume on All Monitors
    description: >-
      Sets volume on all daisy-chained monitors simultaneously using repeater
      control. Set 4th character of parameter to "+".
    steps:
      - Send VOLM0xxx+ where xxx is desired volume (zero-padded)
      - Wait for WAIT response
      - Wait for OK responses from all monitors

  - id: lan_login
    label: LAN Login Sequence
    description: >-
      Connect to monitor via LAN and authenticate. Port 10008.
    steps:
      - Connect TCP to monitor IP address port 10008
      - Receive "Login:" prompt
      - Send username followed by space character
      - Receive "Password:" prompt
      - Send password followed by space character (space if no password set)
      - Receive "OK " on success
```

## Safety
```yaml
confirmation_required_for:
  - all_reset
  - application_reboot
interlocks:
  - description: >-
      After sending RSET (all reset), wait at least 30 seconds before sending
      next command.
  - description: >-
      After POWR (power on) with POWER ON DELAY active, wait POWER ON DELAY
      period + 10 seconds before sending next command.
  - description: >-
      Commands IDSL, IDLK, RSET, POWR, RPIP return WAIT and require at least
      10 seconds before sending next command. Resend if no response.
  - description: >-
      Command timeout should be 10 seconds or longer. In daisy chain, multiply
      monitor position by 10 seconds for timeout.
# UNRESOLVED: specific power-on sequencing requirements beyond POWER ON DELAY not detailed in source
```

## Notes
- Command format is 4-character command field + 4-character parameter field, terminated with return code (0DH 0AH or 0DH). Parameters must be exactly 4 characters, padded with spaces.
- Repeater control: setting the 4th parameter character to "+" broadcasts to all daisy-chained monitors.
- Query commands (Direction R) use "?" characters as parameters to read current values (e.g., `VOLM????`).
- Up to 4 monitors can be daisy-chained via RS-232C with ID numbers 1-255.
- RS-232C and LAN control cannot be used simultaneously (select via CTLS command).
- Baud rate default is 38400 bps; configurable via SETUP menu BAUD RATE setting.
- Minimum 100 ms interval required between command response and next command transmission.
- LAN control uses same RS-232C command set over Telnet-style connection on port 10008.
- LAN login required: connect to port 10008, authenticate with username/password, then send commands.
- When POWER SAVE MODE is ON, some RS-232C commands and LAN control are unavailable in standby mode.
- Response codes: "OK" (success), "ERR" (invalid command or wrong state), "WAIT" (processing, wait 10+ seconds), "UNSELECTED" (RS-232C/LAN SELECT is set to the other interface).
- IDSL targets one next command; IDLK targets all subsequent commands until canceled.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact PN-M model variants not specified in source -->
<!-- UNRESOLVED: LAN protocol beyond basic Telnet login not fully documented -->

## Provenance

```yaml
source_domains:
  - business.sharpusa.com
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/Manuals/PN-M401_M501_operation_manual.pdf
retrieved_at: 2026-05-02T23:19:32.799Z
last_checked_at: 2026-05-14T18:17:20.470Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:20.470Z
matched_actions: 92
action_count: 96
confidence: medium
summary: "All 92 spec actions (66 from Actions, 26 query Feedbacks) matched literals in source; transport parameters verified verbatim; source command catalogue fully represented. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact PN-M model numbers (PN-M401, PN-M501, PN-M601, etc.) not listed in source; only \"PN-M Series\" referenced"
- "firmware version compatibility not stated in source"
- "LAN Telnet protocol details beyond login handshake not fully specified"
- "source does not document unsolicited event notifications from the monitor"
- "specific power-on sequencing requirements beyond POWER ON DELAY not detailed in source"
- "exact PN-M model variants not specified in source"
- "LAN protocol beyond basic Telnet login not fully documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
