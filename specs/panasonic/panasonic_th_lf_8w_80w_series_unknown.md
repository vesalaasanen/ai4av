---
spec_id: admin/panasonic-th-lf8-lf80
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic TH-LF8/LF80 Series Control Spec"
manufacturer: Panasonic
model_family: TH-42LF8
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - TH-42LF8
    - TH-49LF8
    - TH-55LF8
    - TH-42LF80
    - TH-49LF80
    - TH-55LF80
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.connect.panasonic.com
source_urls:
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/LF8_80_SerialCommandList.pdf
  - https://docs.connect.panasonic.com/prodisplays/support/rs232c_commandlist.html
  - https://docs.connect.panasonic.com/prodisplays/support/rs232c_commandlist_prev.html
retrieved_at: 2026-05-15T00:18:09.067Z
last_checked_at: 2026-06-10T00:35:46.487Z
generated_at: 2026-06-10T00:35:46.487Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "LAN/TCP port number not stated in source"
  - "LAN protocol framing details not stated (assumed same STX/ETX over TCP)"
  - "firmware version compatibility not stated"
  - "TCP port not stated in source"
  - "no explicit safety interlock procedures in source"
  - "TCP port default value not stated"
  - "LAN protocol framing not specified (likely mirrors serial STX/ETX)"
  - "maximum command rate or minimum inter-command delay not stated"
  - "connection mode (persistent TCP vs per-command) not stated"
verification:
  verdict: verified
  checked_at: 2026-06-10T00:35:46.487Z
  matched_actions: 150
  action_count: 150
  confidence: medium
  summary: "All 150 actions verified against source (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Panasonic TH-LF8/LF80 Series Control Spec

## Summary
FullHD LCD displays (42/49/55 inch) controllable via RS-232C serial and LAN. Command set covers power, input selection, audio, picture adjustment, display positioning, screensaver, multi-display, scheduled timers, failover/failback, and USB media player. Commands use STX/ETX framed ASCII with 3-character command codes.

<!-- UNRESOLVED: LAN/TCP port number not stated in source -->
<!-- UNRESOLVED: LAN protocol framing details not stated (assumed same STX/ETX over TCP) -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred: source title "RS232C/LAN command list", LAN control protocol option LP1/LP2 present
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: null  # UNRESOLVED: TCP port not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # PON/POF commands
  - queryable    # extensive Qxx inquiry commands
  - levelable    # volume, backlight, contrast, brightness, etc.
  - routable     # input selection (HDMI, DVI, PC, etc.)
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: PON
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: POF
    params: []

  - id: input_change
    label: Input Change
    kind: action
    command: "IMS:***"
    params:
      - name: input
        type: enum
        values: [HM1, HM2, DL1, DV1, PC1, YP1, VD1, UD1]
        description: "HM1=HDMI1, HM2=HDMI2, DL1=DIGITAL LINK(LF80), DV1=DVI-D, PC1=PC, YP1=COMPONENT, VD1=VIDEO, UD1=USB Display"

  - id: digital_link_input_select
    label: Digital Link Input Select (YFB Series)
    kind: action
    command: "IMS:DL1***"
    params:
      - name: input
        type: enum
        values: [HD1, HD2, PC1, PC2, SVD, VID]
        description: "HD1=HDMI1, HD2=HDMI2, PC1=COMPUTER1, PC2=COMPUTER2, SVD=S-VIDEO(YFB100), VID=VIDEO. LF80 only"

  - id: audio_volume_set
    label: Set Audio Volume
    kind: action
    command: "AVL:***"
    params:
      - name: volume
        type: integer
        min: 0
        max: 100
        description: "Volume 0-100, 3-digit zero-padded"

  - id: volume_up
    label: Volume Up
    kind: action
    command: AUU
    params: []

  - id: volume_down
    label: Volume Down
    kind: action
    command: AUD
    params: []

  - id: audio_mute_toggle
    label: Audio Mute Toggle
    kind: action
    command: "AMT:*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=Off, 1=On (toggle if no param)"

  - id: video_mute_toggle
    label: Video Mute Toggle
    kind: action
    command: "VMT:*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=Off, 1=On (toggle if no param)"

  - id: aspect_change
    label: Aspect Change
    kind: action
    command: "DAM:****"
    params:
      - name: mode
        type: enum
        values: [FULL, NORM, ZOOM, ZOM2]
        description: "FULL/NORMAL/ZOOM1/ZOOM2"

  - id: picture_mode_set
    label: Picture Mode
    kind: action
    command: "VPC:MEN***"
    params:
      - name: mode
        type: enum
        values: [VIV, NAT, STD, SUV, GRH, DCM]
        description: "VIVID/NATURAL/STANDARD/SURVEILLANCE/GRAPHIC/DICOM"

  - id: backlight_set
    label: Set Backlight
    kind: action
    command: "VPC:BLT***"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: "0-100, DEF for shipping value"

  - id: contrast_set
    label: Set Contrast
    kind: action
    command: "VPC:PIC***"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: brightness_set
    label: Set Brightness
    kind: action
    command: "VPC:BLK***"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: color_set
    label: Set Color
    kind: action
    command: "VPC:COL***"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: tint_set
    label: Set Tint
    kind: action
    command: "VPC:TIN***"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: sharpness_set
    label: Set Sharpness
    kind: action
    command: "VPC:SHP***"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: gamma_set
    label: Set Gamma
    kind: action
    command: "VWB:GMM**"
    params:
      - name: value
        type: enum
        values: ["20", "22", "24", "26", DC]
        description: "2.0/2.2/2.4/2.6/DICOM"

  - id: color_temperature_set
    label: Set Color Temperature
    kind: action
    command: "VPC:TMP***"
    params:
      - name: value
        type: enum
        values: ["032", "040", "050", "065", "075", "093", "107", NTV, U01, U02]
        description: "3200K-10700K/Native/USER1/USER2"

  - id: red_gain_set
    label: Set Red Gain
    kind: action
    command: "VWB:RGN****"
    params:
      - name: value
        type: integer
        min: 0
        max: 255
        description: "Available when Color Temp is USER1/USER2"

  - id: green_gain_set
    label: Set Green Gain
    kind: action
    command: "VWB:GGN****"
    params:
      - name: value
        type: integer
        min: 0
        max: 255

  - id: blue_gain_set
    label: Set Blue Gain
    kind: action
    command: "VWB:BGN****"
    params:
      - name: value
        type: integer
        min: 0
        max: 255

  - id: red_bias_set
    label: Set Red Bias
    kind: action
    command: "VWB:RBS****"
    params:
      - name: value
        type: integer
        min: -127
        max: 128

  - id: green_bias_set
    label: Set Green Bias
    kind: action
    command: "VWB:GBS****"
    params:
      - name: value
        type: integer
        min: -127
        max: 128

  - id: blue_bias_set
    label: Set Blue Bias
    kind: action
    command: "VWB:BBS****"
    params:
      - name: value
        type: integer
        min: -127
        max: 128

  - id: dynamic_contrast_set
    label: Set Dynamic Contrast
    kind: action
    command: "VPC:DCO**"
    params:
      - name: value
        type: integer
        min: 0
        max: 10

  - id: sound_output_select
    label: Sound Output Select
    kind: action
    command: "AAC:OUT***"
    params:
      - name: output
        type: enum
        values: [SPO, LNO]
        description: "SPEAKERS/AUDIO OUT"

  - id: sound_mode_set
    label: Sound Mode
    kind: action
    command: "AAC:MEN***"
    params:
      - name: mode
        type: enum
        values: [STD, DYN, CLR]
        description: "STANDARD(AUTO)/DYNAMIC/CLEAR. Speakers only"

  - id: bass_set
    label: Set Bass
    kind: action
    command: "AAC:BAS***"
    params:
      - name: value
        type: integer
        min: -20
        max: 20

  - id: treble_set
    label: Set Treble
    kind: action
    command: "AAC:TRE***"
    params:
      - name: value
        type: integer
        min: -20
        max: 20

  - id: balance_set
    label: Set Balance
    kind: action
    command: "AAC:BAL***"
    params:
      - name: value
        type: integer
        min: -20
        max: 20

  - id: surround_set
    label: Set Surround
    kind: action
    command: "AAC:SUR***"
    params:
      - name: state
        type: enum
        values: [MON, OFF]
        description: "ON/OFF"

  - id: h_position_set
    label: Set Horizontal Position
    kind: action
    command: "DGE:HPO****"
    params:
      - name: value
        type: integer
        min: -100
        max: 100

  - id: h_size_set
    label: Set Horizontal Size
    kind: action
    command: "DGE:HSZ****"
    params:
      - name: value
        type: integer
        min: -100
        max: 100

  - id: v_position_set
    label: Set Vertical Position
    kind: action
    command: "DGE:VPO****"
    params:
      - name: value
        type: integer
        min: -100
        max: 100

  - id: v_size_set
    label: Set Vertical Size
    kind: action
    command: "DGE:VSZ****"
    params:
      - name: value
        type: integer
        min: -100
        max: 100

  - id: auto_setup
    label: Auto Setup
    kind: action
    command: "DGE:ASU*"
    params:
      - name: execute
        type: enum
        values: ["1"]
        description: "1=Execution start"

  - id: display_orientation_set
    label: Set Display Orientation
    kind: action
    command: "SSU:DOR*"
    params:
      - name: orientation
        type: enum
        values: ["0", "1"]
        description: "0=Landscape, 1=Portrait"

  - id: display_name_set
    label: Set Display Name
    kind: action
    command: "SSU:LDN*...*"
    params:
      - name: name
        type: string
        max_length: 8
        description: "ASCII printable characters, max 8"

  - id: network_setup
    label: Network Setup
    kind: action
    command: "SSU:NET***"
    params:
      - name: ip_bytes
        type: string
        description: "13 params: IP(4)+Subnet(4)+Gateway(4)+DHCP(0/1)"

  - id: lan_port_set
    label: Set LAN Port Number
    kind: action
    command: "SSU:LCP*****"
    params:
      - name: port
        type: integer
        min: 1024
        max: 65535
        description: "Excluded: 4352, 10000, 20000, 41794"

  - id: lan_control_protocol_set
    label: Set LAN Control Protocol
    kind: action
    command: "OSP:LPN***"
    params:
      - name: protocol
        type: enum
        values: [LP1, LP2]
        description: "Protocol1/Protocol2"

  - id: osd_toggle
    label: OSD On/Off
    kind: action
    command: "OSP:OSD*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: initial_input_set
    label: Set Initial Input
    kind: action
    command: "OSP:IIN***"
    params:
      - name: input
        type: enum
        values: [OFF, HM1, HM2, DL1, DV1, PC1, YP1, VD1, UD1]

  - id: input_lock_set
    label: Set Input Lock
    kind: action
    command: "OSP:INL***"
    params:
      - name: input
        type: enum
        values: [OFF, HM1, HM2, DL1, DV1, PC1, YP1, VD1, UD1]

  - id: button_lock_set
    label: Set Button Lock
    kind: action
    command: "OSP:BTL***"
    params:
      - name: mode
        type: enum
        values: [OFF, MEN, ALL]
        description: "OFF/MENU&ENTER/ON"

  - id: initial_volume_set
    label: Set Initial Volume Level
    kind: action
    command: "OSP:IVL****"
    params:
      - name: function
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"
      - name: volume
        type: integer
        min: 0
        max: 100

  - id: max_volume_set
    label: Set Maximum Volume Level
    kind: action
    command: "OSP:MVL****"
    params:
      - name: function
        type: enum
        values: ["0", "1"]
      - name: volume
        type: integer
        min: 0
        max: 100

  - id: screensaver_toggle
    label: Screensaver On/Off
    kind: action
    command: "OSP:SCR*"
    params:
      - name: state
        type: enum
        values: ["0", "5"]
        description: "0=stop, 5=operating"

  - id: multi_display_toggle
    label: Multi Display On/Off
    kind: action
    command: "MDC:*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]

  - id: timer_program_set
    label: Set Timer Program
    kind: action
    command: "TIM:PRG**"
    params:
      - name: program_number
        type: integer
        min: 1
        max: 20
      - name: function
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"
      - name: day
        type: enum
        values: [SUN, MON, TUE, WED, THU, FRI, SAT, EVD]
        description: "EVD=Everyday"
      - name: action
        type: enum
        values: [PON, POF]
      - name: time
        type: string
        description: "HHMM format 0000-2359"
      - name: startup_input
        type: enum
        values: [HM1, HM2, DL1, DV1, PC1, YP1, VD1, UD1]

  - id: set_date_time
    label: Set Date/Time
    kind: action
    command: "TIM:DAT**********"
    params:
      - name: datetime
        type: string
        description: "YYYYMMDDhhmm format"

  - id: failover_mode_off
    label: Failover Mode Off
    kind: action
    command: "SBI:OFF"
    params:
      - name: auto_switch_back
        type: enum
        values: ["0"]
        description: "0=Disable auto switch back"

  - id: failover_mode_quick
    label: Failover Mode Quick
    kind: action
    command: "SBI:QIC"
    params:
      - name: primary_backup
        type: enum
        values: [NON, HM1, HM2, DL1, DV1]
      - name: secondary_backup
        type: enum
        values: [NON, HM1, HM2, DL1, DV1]
      - name: auto_switch_back
        type: enum
        values: ["0", "1"]
        description: "0=Disable, 1=Enable"

  - id: failover_mode_normal
    label: Failover Mode Normal
    kind: action
    command: "SBI:NOR"
    params:
      - name: primary_backup
        type: enum
        values: [NON, HM1, HM2, DL1, DV1, PC1, YP1, VD1, UD1]
      - name: secondary_backup
        type: enum
        values: [NON, HM1, HM2, DL1, DV1, PC1, YP1, VD1, UD1]
      - name: auto_switch_back
        type: enum
        values: ["0", "1"]

  - id: manual_switch_back
    label: Manual Switch Back
    kind: action
    command: "BIP:FSB"
    params: []

  - id: reset
    label: Reset Display
    kind: action
    command: "SSU:LRT"
    params: []

  - id: recall
    label: Recall Display
    kind: action
    command: DDS
    params: []

  - id: osd_clear
    label: OSD Clear
    kind: action
    command: VDO
    params: []

  - id: off_timer_set
    label: Set Off Timer
    kind: action
    command: "ZOT:**"
    params:
      - name: minutes
        type: integer
        min: 0
        max: 90

  - id: audio_input_select_current
    label: Audio Input Select (Current)
    kind: action
    command: "SAI:A+++"
    params:
      - name: video_input
        type: enum
        values: [HM1, HM2, DL1, DV1, PC1, YP1, VD1]
      - name: audio_input
        type: enum
        values: [HM1, HM2, DL1, PC1, VD1, NAD]
        description: "NAD=NO AUDIO"

  - id: usb_media_player_next
    label: USB Media Player Next
    kind: action
    command: "UMP:NXT"
    params: []

  - id: usb_media_player_previous
    label: USB Media Player Previous
    kind: action
    command: "UMP:PRE"
    params: []

  - id: usb_media_player_replay
    label: USB Media Player Replay
    kind: action
    command: "UMP:RPY"
    params: []

  - id: serial_id_setup
    label: Serial ID Setup
    kind: action
    command: "SIF:*"
    params:
      - name: enable
        type: enum
        values: ["0", "1"]
      - name: display_id
        type: integer
        min: 0
        max: 100

  - id: wobbling_set
    label: Set Wobbling
    kind: action
    command: "OSP:WOB*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]

  - id: no_activity_power_off_set
    label: Set No Activity Power Off
    kind: action
    command: "SSU:NAO*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]

  - id: no_signal_power_off_set
    label: Set No Signal Power Off
    kind: action
    command: "SSU:AOF*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]

  - id: power_save_set
    label: Set Power Save
    kind: action
    command: "SSU:ECO*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]

  - id: startup_mode_set
    label: Set Initial Startup Mode
    kind: action
    command: "OSP:ISU***"
    params:
      - name: mode
        type: enum
        values: [LST, PON, STB]
        description: "LST=Last memory, PON=ON, STB=STANDBY"
  - id: enhance_level_set
    label: Set Enhance Level
    kind: action
    command: "VPC:SHE*"
    params:
      - name: level
        type: enum
        values: ["1", "2"]
        description: "1=low, 2=high"

  - id: color_enhancement_set
    label: Set Color Enhancement
    kind: action
    command: "VPC:PAJ*"
    params:
      - name: value
        type: enum
        values: ["0", "1", "2", "3"]
        description: "0=OFF, 1=Low, 2=Mid, 3=High"

  - id: refine_enhancer_set
    label: Set Refine Enhancer
    kind: action
    command: "VPC:SRC*"
    params:
      - name: value
        type: enum
        values: ["0", "1", "2", "3"]
        description: "0=OFF, 1=Low, 2=Mid, 3=High"

  - id: gradation_smoother_set
    label: Set Gradation Smoother
    kind: action
    command: "VPC:GRS*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=off, 1=on"

  - id: color_management_toggle
    label: 6-Segment Color Management On/Off
    kind: action
    command: "VWB:CMF*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=off, 1=on"

  - id: color_management_select
    label: 6-Segment Color Management Select Color
    kind: action
    command: "VWB:CML*"
    params:
      - name: color
        type: enum
        values: [R, Y, G, C, B, M]
        description: "Red/Yellow/Green/Cyan/Blue/Magenta"
      - name: tint
        type: integer
        min: -511
        max: 511
      - name: saturation
        type: integer
        min: -127
        max: 127
      - name: value
        type: integer
        min: -127
        max: 127

  - id: color_management_reset
    label: 6-Segment Color Management Reset
    kind: action
    command: "VWB:CMR"
    params: []

  - id: picture_memory_delete
    label: Picture Memory Delete
    kind: action
    command: "VPF:DEL**"
    params:
      - name: memory_number
        type: integer
        min: 1
        max: 6
        description: "Memory No.1-No.6, 2-digit zero-padded"

  - id: picture_memory_load
    label: Picture Memory Load
    kind: action
    command: "VPF:LOD**"
    params:
      - name: memory_number
        type: integer
        min: 1
        max: 6
        description: "Memory No.1-No.6, 2-digit zero-padded"

  - id: picture_memory_save
    label: Picture Memory Save
    kind: action
    command: "VPF:SAV**"
    params:
      - name: memory_number
        type: integer
        min: 1
        max: 6
      - name: name
        type: string
        max_length: 20
        description: "Memory name up to 20 ASCII characters"

  - id: picture_memory_name_change
    label: Picture Memory Name Change
    kind: action
    command: "VPF:NAM**"
    params:
      - name: memory_number
        type: integer
        min: 1
        max: 6
      - name: name
        type: string
        max_length: 20
        description: "Memory name up to 20 ASCII characters"

  - id: clock_phase_set
    label: Set Clock Phase
    kind: action
    command: "DGE:CLK***"
    params:
      - name: value
        type: integer
        min: 0
        max: 30

  - id: dot_clock_set
    label: Set Dot Clock
    kind: action
    command: "DGE:DCL***"
    params:
      - name: value
        type: integer
        min: -5
        max: 5

  - id: pixel_1to1_mode_set
    label: Set 1:1 Pixel Mode
    kind: action
    command: "DGE:DBD*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: overscan_set
    label: Set Overscan
    kind: action
    command: "DGE:OVS*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: pos_size_lump_set
    label: Position/Size Lump Setting
    kind: action
    command: "DGE:PSZ****"
    params:
      - name: h_position
        type: integer
        min: -100
        max: 100
      - name: h_size
        type: integer
        min: -100
        max: 100
      - name: v_position
        type: integer
        min: -100
        max: 100
      - name: v_size
        type: integer
        min: -100
        max: 100

  - id: osd_language_set
    label: Set OSD Language
    kind: action
    command: "SSU:LNG***"
    params:
      - name: language
        type: enum
        values: [ENG, DEU, FRA, ITL, ESP, USA, CHA, JPN, RUS]
        description: "English(UK)/German/French/Italian/Spanish/English(US)/Chinese/Japanese/Russian"

  - id: power_management_mode_set
    label: Set Power Management Mode
    kind: action
    command: "SSU:ECS*"
    params:
      - name: mode
        type: enum
        values: ["0", "1"]
        description: "0=CUSTOM, 1=ON"

  - id: pc_power_management_set
    label: Set PC Power Management
    kind: action
    command: "SSU:DPM*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: dvi_d1_power_management_set
    label: Set DVI-D1 Power Management
    kind: action
    command: "SSU:D1V*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: hdmi1_power_management_set
    label: Set HDMI1 Power Management
    kind: action
    command: "SSU:D1H*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: hdmi2_power_management_set
    label: Set HDMI2 Power Management
    kind: action
    command: "SSU:D2H*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: digital_link_power_management_set
    label: Set DIGITAL LINK Power Management
    kind: action
    command: "SSU:D1L*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON. Available LF80 only"

  - id: menu_position_set
    label: Set Menu Position
    kind: action
    command: "SSU:OPS*"
    params:
      - name: position
        type: enum
        values: ["1", "2", "3", "4", "5"]
        description: "1=Upper/left, 2=Upper/right, 3=Center, 4=Lower/left, 5=Lower/right"

  - id: menu_display_duration_set
    label: Set Menu Display Duration
    kind: action
    command: "SSU:MDT***"
    params:
      - name: seconds
        type: integer
        min: 5
        max: 180
        description: "5-180 seconds (5 second unit)"

  - id: menu_transparency_set
    label: Set Menu Transparency
    kind: action
    command: "SSU:MTL***"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: "0-100% (10% unit)"

  - id: serial_control_set
    label: Set Serial Control
    kind: action
    command: "SCT:SEC***"
    params:
      - name: source
        type: enum
        values: [SE1, DL1]
        description: "SE1=Serial in, DL1=DIGITAL LINK. Available LF80 only"

  - id: digital_link_mode_set
    label: Set DIGITAL LINK Mode
    kind: action
    command: "SSU:DLM**"
    params:
      - name: mode
        type: enum
        values: [AT, DL, EN, LR]
        description: "Auto/DIGITAL LINK/Ethernet/Long Reach. Available LF80 only"

  - id: amx_dd_set
    label: Set AMX D.D.
    kind: action
    command: "SSU:ADD*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: crestron_connected_set
    label: Set Crestron Connected
    kind: action
    command: "SSU:CRV*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: extron_xtp_set
    label: Set Extron XTP
    kind: action
    command: "SSU:EXP*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON. Available LF80 only"

  - id: component_rgb_in_select
    label: Component/RGB-IN Select
    kind: action
    command: "SSU:CMP***"
    params:
      - name: signal
        type: enum
        values: [YBR, RGB]
        description: "YBR Signal/RGB Signal. Available when PC1/YP1 selected"

  - id: yuv_rgb_in_select
    label: YUV/RGB-IN Select
    kind: action
    command: "SSU:DYR***"
    params:
      - name: signal
        type: enum
        values: [YUV, RGB]
        description: "YUV/RGB Signal. Available for HDMI/DIGITAL LINK/DVI-D"

  - id: yc_filter_3d_set
    label: Set 3D Y/C Filter
    kind: action
    command: "SSG:YCS*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: color_system_set
    label: Set Color System
    kind: action
    command: "SSG:COS***"
    params:
      - name: system
        type: enum
        values: [NTS, PAL, SCM, "4NT", MPA, NPA, AUT]
        description: "NTSC/PAL/SECAM/NTSC4.43/PAL-M/PAL-N/AUTO"

  - id: sync_signal_set
    label: Set Sync Signal
    kind: action
    command: "SSG:SNC***"
    params:
      - name: mode
        type: enum
        values: [HAV, GRN, HVS]
        description: "Auto detection/Sync On Green/Hvsync. PC input only"

  - id: cinema_reality_set
    label: Set Cinema Reality 3:2 Pull Down
    kind: action
    command: "SSG:DCR*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: xga_mode_set
    label: Set XGA Mode
    kind: action
    command: "SSG:XGA*"
    params:
      - name: mode
        type: enum
        values: ["1", "2", "3", "4"]
        description: "1=1024x768, 2=1280x768, 3=1366x768, 4=Auto"

  - id: noise_reduction_set
    label: Set Noise Reduction
    kind: action
    command: "SSG:NRS***"
    params:
      - name: mode
        type: enum
        values: [OFF, AUT, LOW, MID, HIG]
        description: "OFF/Auto/Low/Middle/High"

  - id: mpeg_noise_reduction_set
    label: Set MPEG Noise Reduction
    kind: action
    command: "SSG:MNR***"
    params:
      - name: mode
        type: enum
        values: [OFF, LOW, MID, HIG]
        description: "OFF/Low/Middle/High"

  - id: signal_range_set
    label: Set Signal Range
    kind: action
    command: "SSG:HRC***"
    params:
      - name: range
        type: enum
        values: [VID, FUL, AUT]
        description: "Video/FULL/Auto"

  - id: input_level_set
    label: Set Input Level
    kind: action
    command: "VWB:ILV***"
    params:
      - name: value
        type: integer
        min: -16
        max: 16

  - id: dynamic_backlight_control_set
    label: Set Dynamic Backlight Control
    kind: action
    command: "SSG:DBC*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: screensaver_mode_set
    label: Set Screensaver Mode
    kind: action
    command: "SSC:MOD*"
    params:
      - name: mode
        type: enum
        values: ["0", "1", "2", "3", "4"]
        description: "0=OFF, 1=Interval, 2=Time Designation, 3=ON, 4=Standby after Screensaver"

  - id: screensaver_interval_set
    label: Set Interval Screensaver
    kind: action
    command: "SSC:INT****"
    params:
      - name: periodic_time
        type: string
        description: "HHMM format 0000-2359"
      - name: operating_time
        type: string
        description: "HHMM format 0000-2359"

  - id: screensaver_time_designation_set
    label: Set Time Designation Screensaver
    kind: action
    command: "SSC:TIM****"
    params:
      - name: start_time
        type: string
        description: "HHMM format 0000-2359"
      - name: finish_time
        type: string
        description: "HHMM format 0000-2359"

  - id: screensaver_standby_after_set
    label: Set Standby After Screensaver Time
    kind: action
    command: "SSC:AOF****"
    params:
      - name: time
        type: string
        description: "HHMM format 0000-2359"

  - id: input_label_current_set
    label: Set Label for Current Input
    kind: action
    command: "SSU:ILA***"
    params:
      - name: label
        type: enum
        values: [INP, PCN, DV1, DV2, DV3, BD1, BD2, BD3, CTV, VCR, STB, SKP]
        description: "INP=reset(non-PC), PCN=reset(PC), DVD1-3, Blu-ray1-3, CATV, VCR, STB, Skip"

  - id: input_label_each_set
    label: Set Label for Each Input
    kind: action
    command: "SSU:ILA+++***"
    params:
      - name: input
        type: enum
        values: [HM1, HM2, DL1, DV1, PC1, YP1, VD1]
        description: "HDMI1/HDMI2/DIGITAL LINK/DVI-D/PC/COMPONENT/VIDEO"
      - name: label
        type: enum
        values: [INP, DV1, DV2, DV3, BD1, BD2, BD3, CTV, VCR, STB, SKP]
        description: "Reset input name, DVD1-3, Blu-ray1-3, CATV, VCR, STB, Skip"

  - id: function_group_set
    label: Set Function Group
    kind: action
    command: "OSP:KGR***"
    params:
      - name: group
        type: enum
        values: [INP, MEM, ACT]
        description: "INPUT/MEMORY/ACTION & MENU(SHORTCUT)"

  - id: function_button_set
    label: Set Function Button
    kind: action
    command: "OSP:KFN****"
    params:
      - name: key
        type: enum
        values: ["1", "2", "3", "4", "5", "6"]
        description: "Function key 1-6"
      - name: assignment
        type: enum
        values: [SIG, SSV, SUT, LNS, ECO, OSH, DZM, MLT, HM1, HM2, DL1, DV1, PC1, YP1, VD1, UD1]
        description: "Action/Menu or Input assignment"

  - id: function_guide_set
    label: Set Function Guide
    kind: action
    command: "OSP:KFG*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: multi_display_setup
    label: Multi Display Setup Detail
    kind: action
    command: "MDC:EXP*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"
      - name: h_scale
        type: integer
        min: 1
        max: 10
        description: "Horizontal Scale 1-10"
      - name: v_scale
        type: integer
        min: 1
        max: 10
        description: "Vertical Scale 1-10"
      - name: bezel_h
        type: integer
        min: 0
        max: 100
        description: "Bezel H Adjustment 0-100"
      - name: bezel_v
        type: integer
        min: 0
        max: 100
        description: "Bezel V Adjustment 0-100"
      - name: location
        type: integer
        min: 1
        max: 100
        description: "Location A1-J10"

  - id: controller_user_level_set
    label: Set Controller User Level
    kind: action
    command: "OSP:RCM*"
    params:
      - name: level
        type: enum
        values: ["0", "1", "2", "3"]
        description: "0=OFF, 1=User1, 2=User2, 3=User3"

  - id: pc_auto_setting_set
    label: Set PC Auto Setting
    kind: action
    command: "OSP:PAS*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: off_timer_function_set
    label: Set Off Timer Function
    kind: action
    command: "OSP:OFT*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: startup_logo_set
    label: Set Startup Logo
    kind: action
    command: "OSP:LOG*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: serial_id_function_set
    label: Set Serial ID Function
    kind: action
    command: "SID:SID*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: serial_response_id_all_set
    label: Set Serial Response ID All
    kind: action
    command: "SCT:RIA*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: serial_daisy_chain_position_set
    label: Set Serial Daisy Chain Position
    kind: action
    command: "SCT:DCP***"
    params:
      - name: position
        type: enum
        values: [TOP, DEF, END]
        description: "TOP/---/END"

  - id: power_on_screen_delay_set
    label: Set Power ON Screen Delay
    kind: action
    command: "OSP:POD**"
    params:
      - name: delay
        type: string
        description: "AT=Auto, 00-30=0-30 seconds"

  - id: clock_display_set
    label: Set Clock Display
    kind: action
    command: "OSP:CLK*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: power_on_message_no_activity_set
    label: Power On Message No Activity Power Off
    kind: action
    command: "OSP:NAP*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: power_on_message_power_management_set
    label: Power On Message Power Management
    kind: action
    command: "OSP:PMM*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: input_search_set
    label: Set Input Search
    kind: action
    command: "ISH:FNC***"
    params:
      - name: mode
        type: enum
        values: [OFF, ALL, PRI]
        description: "OFF/ALL inputs/Custom"

  - id: input_search_first_set
    label: Set 1st Search Input
    kind: action
    command: "ISH:PRI***"
    params:
      - name: input
        type: enum
        values: [NON, HM1, HM2, DL1, DV1, PC1, YP1, VD1, UD1]
        description: "none/HDMI1/HDMI2/DIGITAL LINK/DVI-D/PC/COMPONENT/VIDEO/USB"

  - id: input_search_second_set
    label: Set 2nd Search Input
    kind: action
    command: "ISH:SCI***"
    params:
      - name: input
        type: enum
        values: [NON, HM1, HM2, DL1, DV1, PC1, YP1, VD1, UD1]
        description: "none/HDMI1/HDMI2/DIGITAL LINK/DVI-D/PC/COMPONENT/VIDEO/USB"

  - id: failover_changing_mode_set
    label: Set Failover Changing Mode
    kind: action
    command: "SBI:CHM*"
    params:
      - name: speed
        type: enum
        values: ["2", "1"]
        description: "2=High speed, 1=Normal speed. When Quick mode selected"

  - id: audio_input_select_each
    label: Audio Input Select for Each Input
    kind: action
    command: "SAI:V***A+++"
    params:
      - name: video_input
        type: enum
        values: [HM1, HM2, DL1, DV1, PC1, YP1, VD1]
        description: "HDMI1/HDMI2/DIGITAL LINK/DVI-D/PC/COMPONENT/VIDEO"
      - name: audio_input
        type: enum
        values: [HM1, HM2, DL1, PC1, VD1, NAD]
        description: "HDMI1/HDMI2/DIGITAL LINK/AUDIO1/AUDIO2/NO AUDIO"

  - id: no_signal_warning_set
    label: Set No Signal Warning
    kind: action
    command: "SIT:NSW*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=Off, 1=On"

  - id: no_signal_warning_timing_set
    label: Set No Signal Warning Timing
    kind: action
    command: "SIT:SWT**"
    params:
      - name: minutes
        type: integer
        min: 1
        max: 60

  - id: no_signal_error_set
    label: Set No Signal Error
    kind: action
    command: "SIT:NSE*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=Off, 1=On"

  - id: no_signal_error_timing_set
    label: Set No Signal Error Timing
    kind: action
    command: "SIT:SET**"
    params:
      - name: minutes
        type: integer
        min: 1
        max: 90

  - id: temperature_warning_set
    label: Set Temperature Warning
    kind: action
    command: "SIT:TPW*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=Off, 1=On"

  - id: audio_mute_direct
    label: Audio Mute Direct
    kind: action
    command: "AOC:*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=MUTE OFF, 1=MUTE ON"

  - id: digital_zoom_set
    label: Set Digital Zoom
    kind: action
    command: "DZM:****"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"
      - name: factor
        type: enum
        values: ["1", "2", "3", "4"]
        description: "Enlargement factor"
      - name: h_position
        type: enum
        values: ["1", "2", "3", "4", "5"]
        description: "Display position Horizontal"
      - name: v_position
        type: enum
        values: ["1", "2", "3", "4", "5"]
        description: "Display position Vertical"

  - id: auto_command_send_set
    label: Set Auto Command Send
    kind: action
    command: "RCM:**"
    params:
      - name: qss_send
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON for QSS command"
      - name: qss_stserr_send
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON for QSS:STSERR"

  - id: usb_media_player_enable_set
    label: Set USB Media Player Enable
    kind: action
    command: "SUS:UMP*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=Disable, 1=Enable"

  - id: usb_media_player_resume_set
    label: Set USB Media Player Resume Play
    kind: action
    command: "SUS:RSP*"
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: usb_media_player_slide_show_duration_set
    label: Set USB Media Player Slide Show Duration
    kind: action
    command: "SUS:SSD***"
    params:
      - name: seconds
        type: integer
        min: 10
        max: 600
        description: "10-600 seconds (5 second unit)"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power Status
    command: QPW
    reply: "QPW:*"
    type: enum
    values: ["0", "1"]
    description: "0=Standby(Off), 1=Power ON(On)"

  - id: input_state
    label: Current Input
    command: QMI
    reply: "QMI:***"
    type: enum
    values: [HM1, HM2, DL1, DV1, PC1, YP1, VD1, UD1]

  - id: volume_state
    label: Current Volume
    command: QAV
    reply: "QAV:***"
    type: integer
    min: 0
    max: 100

  - id: audio_mute_state
    label: Audio Mute State
    command: QAM
    reply: "QAM:*"
    type: enum
    values: ["0", "1"]

  - id: video_mute_state
    label: Video Mute State
    command: QVM
    reply: "QVM:*"
    type: enum
    values: ["0", "1"]

  - id: aspect_state
    label: Current Aspect
    command: QAS
    reply: "QAS:****"
    type: enum
    values: [FULL, NORM, ZOOM, ZOM2]

  - id: auto_setup_state
    label: Auto Setup State
    command: "QGE:ASU"
    reply: "QGE:ASU**"
    type: enum
    values: [OK, NG, OF, NW]
    description: "OK/NG/Not performing/Adjusting"

  - id: model_name
    label: Model Name
    command: QMN
    reply: "QMN:**-*-**"
    type: string

  - id: model_info
    label: Model Info
    command: QID
    reply: "QID:**.***..*"
    type: string

  - id: serial_number
    label: Serial Number
    command: QSN
    reply: "QSN:*****"
    type: string
    description: "9-15 ASCII characters"

  - id: software_version_main
    label: Software Version Main MCU
    command: QRV
    reply: "QRV:*.****"
    type: string

  - id: software_version_sub
    label: Software Version Sub MCU
    command: "QRV:STB"
    reply: "QRV:STB**.**"
    type: string

  - id: signal_frequency
    label: Signal Frequency
    command: QFR
    reply: "QFR:H***.**V***.**"
    type: string
    description: "Horizontal and Vertical frequency"

  - id: signal_format
    label: Signal Format
    command: QSF
    reply: "QSF:********************"
    type: string
    description: "Max 20 characters"

  - id: backup_input_status
    label: Backup Input Status
    command: "QBI:STS"
    reply: "QBI:STS*-*-**"
    type: string

  - id: backup_signal_status
    label: Backup Input Signal Status
    command: "QBI:SIG"
    reply: "QBI:SIG*-*-*"
    type: string
    description: "Signal present for main/primary/secondary"

  - id: no_signal_warning
    label: No Signal Warning Status
    command: "QST:NSW"
    reply: "QST:NSW*"
    type: enum
    values: ["0", "1"]

  - id: no_signal_error
    label: No Signal Error Status
    command: "QST:NSE"
    reply: "QST:NSE*"
    type: enum
    values: ["0", "1"]

  - id: temperature_warning
    label: Temperature Warning Status
    command: "QST:TO"
    reply: "QST:TO*"
    type: enum
    values: ["0", "1"]
    description: "0=NORMAL, 1=HIGH TEMPERATURE"

  - id: sos_status
    label: SOS Status
    command: "QSS:STS"
    reply: "QSS:STS***"
    type: enum
    values: [NON, ERR, EXT]
    description: "NON=no SOS, ERR=SOS generating, EXT=SOS history"

  - id: display_id
    label: Display ID
    command: "QID:DID"
    reply: "QID:DID***"
    type: integer
    min: 0
    max: 100

  - id: day_state
    label: Current Day
    command: "QIM:DAY"
    reply: "QIM:DAY***"
    type: enum
    values: [SUN, MON, TUE, WED, THU, FRI, SAT]

  - id: time_state
    label: Current Time
    command: "QIM:NOW"
    reply: "QIM:NOW0****"
    type: string
    description: "HHMM format"
```

## Variables
```yaml
variables: []  # All variable-like controls are represented as actions with params
```

## Events
```yaml
events:
  - id: no_signal_warning_auto
    description: "Auto-sent while RS-232C controls active when no signal warning triggers"
    reply: "QST:NSW*"

  - id: no_signal_error_auto
    description: "Auto-sent while RS-232C controls active when no signal error triggers"
    reply: "QST:NSE*"

  - id: temperature_warning_auto
    description: "Auto-sent while RS-232C controls active when temperature warning triggers"
    reply: "QST:TO*"

  - id: error_response
    description: "Sent when incorrect command received"
    reply: "ER401"
```

## Macros
```yaml
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "In standby mode, only PON and QPW commands are accepted"
# UNRESOLVED: no explicit safety interlock procedures in source
```

## Notes
- Commands use STX (0x02) / ETX (0x03) framing: `<STX>CCC:PPP<ETX>` where CCC is 3-char command.
- Must wait for response before sending next command.
- Display ID addressing uses extended format: `<STX>AD94;RAD:DDD;CCC:PPP<ETX>` (serial only).
- Error response `ER401` sent for incorrect commands.
- DL1 (DIGITAL LINK) commands available on LF80 models only.
- Network port range 1024-65535 (excluding 4352, 10000, 20000, 41794).
- LAN Control Protocol selectable between Protocol1 and Protocol2 (LP1/LP2).
<!-- UNRESOLVED: TCP port default value not stated -->
<!-- UNRESOLVED: LAN protocol framing not specified (likely mirrors serial STX/ETX) -->
<!-- UNRESOLVED: maximum command rate or minimum inter-command delay not stated -->
<!-- UNRESOLVED: connection mode (persistent TCP vs per-command) not stated -->

## Provenance

```yaml
source_domains:
  - docs.connect.panasonic.com
source_urls:
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/LF8_80_SerialCommandList.pdf
  - https://docs.connect.panasonic.com/prodisplays/support/rs232c_commandlist.html
  - https://docs.connect.panasonic.com/prodisplays/support/rs232c_commandlist_prev.html
retrieved_at: 2026-05-15T00:18:09.067Z
last_checked_at: 2026-06-10T00:35:46.487Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T00:35:46.487Z
matched_actions: 150
action_count: 150
confidence: medium
summary: "All 150 actions verified against source (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "LAN/TCP port number not stated in source"
- "LAN protocol framing details not stated (assumed same STX/ETX over TCP)"
- "firmware version compatibility not stated"
- "TCP port not stated in source"
- "no explicit safety interlock procedures in source"
- "TCP port default value not stated"
- "LAN protocol framing not specified (likely mirrors serial STX/ETX)"
- "maximum command rate or minimum inter-command delay not stated"
- "connection mode (persistent TCP vs per-command) not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
