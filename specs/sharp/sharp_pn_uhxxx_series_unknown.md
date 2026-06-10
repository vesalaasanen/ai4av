---
spec_id: admin/sharp-pn-uhxxx-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp PN-UHxxx Series Control Spec"
manufacturer: Sharp
model_family: "PN-UHxxx Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "PN-UHxxx Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharp-displays.jp.sharp
  - business.sharpusa.com
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
  - https://business.sharpusa.com/portals/0/downloads/manuals/pn-pxx6_pn-mxx2_n_format_external_control_manual.pdf
  - https://business.sharpusa.com/portals/0/downloads/manuals/pn-la862-la752-la652_n-format_command_manual_en_rev1.pdf
  - https://business.sharpusa.com
  - https://business.sharpusa.com/portals/0/downloads/manuals/pn-lc862-lc752-lc652_s-format_command_manual.pdf
retrieved_at: 2026-05-18T11:39:42.815Z
last_checked_at: 2026-06-10T02:16:45.040Z
generated_at: 2026-06-10T02:16:45.040Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "complete model list not stated in source; family name used"
  - "scheduling commands not fully detailed in source"
  - "temperature sensor read - only partially documented (sensor selection and raw value decoding present, but full command syntax unclear)"
  - "source does not describe unsolicited event notifications from monitor"
  - "no safety warnings or interlock procedures in source"
  - "complete model list (PN-UH601, PN-UH701, PN-UH861, etc.) not enumerated in source"
  - "TV tuner commands (*1标记) only for US models"
  - "Local Dimming (*3标记) not supported on E328 model"
verification:
  verdict: verified
  checked_at: 2026-06-10T02:16:45.040Z
  matched_actions: 87
  action_count: 87
  confidence: medium
  summary: "All 87 spec actions match source VCP/CTL commands; all 84 source commands are covered and transport params confirmed. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-18
---

# Sharp PN-UHxxx Series Control Spec

## Summary
Sharp PN-UHxxx series LCD flat panel display. External control via RS-232C (9600 baud, 8/N/1) and TCP/IP (port 7142). Two command types: VCP (Variable Content Protocol) for read/write parameters, and CTL (Control) for system operations. Requires >600ms packet interval between commands. Supports power control, input selection, audio/video parameter adjustment, and temperature monitoring.

<!-- UNRESOLVED: complete model list not stated in source; family name used -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 7142  # stated: TCP port 7142 fixed
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # CTL-01D6 power status read, CTL-C203-D6 power control
- queryable       # VCP get parameter, CTL-C216 serial no., CTL-C217 model name
- routable        # VCP-00-60 input select, multiple input types defined
- levelable       # VCP-00-10 backlight, VCP-00-12 contrast, VCP-00-16/18/1A color gain
```

## Actions
```yaml
# VCP - read/write parameters via OP code page + OP code
# Format: message_type (A=cmd, C=get, E=set) + STX + OP page + OP code + value + ETX + BCC + CR

- id: power_on
  label: Power On
  kind: action
  params:
    - name: monitor_id
      type: string
      description: Monitor ID (1-100) or '*' for all

- id: power_off
  label: Power Off
  kind: action
  params:
    - name: monitor_id
      type: string

- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      description: 0x0000-0x0064 (0-100)
    - name: monitor_id
      type: string

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: 0x0000-0x0064 (0-100)
    - name: monitor_id
      type: string

- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: 0x0000-0x0064 (0-100)
    - name: monitor_id
      type: string

- id: set_color_gain_r
  label: Set Color Gain R
  kind: action
  params:
    - name: value
      type: integer
      description: 0x0000-0x0064
    - name: monitor_id
      type: string

- id: set_color_gain_g
  label: Set Color Gain G
  kind: action
  params:
    - name: value
      type: integer
      description: 0x0000-0x0064
    - name: monitor_id
      type: string

- id: set_color_gain_b
  label: Set Color Gain B
  kind: action
  params:
    - name: value
      type: integer
      description: 0x0000-0x0064
    - name: monitor_id
      type: string

- id: select_input
  label: Select Input
  kind: action
  params:
    - name: input
      type: integer
      description: >
        Input code: 0x0001=VGA(RGB), 0x0005=AV, 0x0009=Tuner1(TV),
        0x000C=VGA(YPbPr), 0x0011=HDMI1, 0x0012=HDMI2, 0x0082=HDMI3, 0x0087=MP(Media Player)
    - name: monitor_id
      type: string

- id: save_current_settings
  label: Save Current Settings
  kind: action
  params:
    - name: monitor_id
      type: string
  description: Store adjusted values to non-volatile memory

- id: get_timing_report
  label: Get Timing Report
  kind: action
  params:
    - name: monitor_id
      type: string
  description: Returns H/V frequency and sync polarity

- id: get_power_status
  label: Get Power Status
  kind: action
  params:
    - name: monitor_id
      type: string
  description: Returns power mode (ON=1, Standby=2, OFF=4)

- id: control_power
  label: Control Power
  kind: action
  params:
    - name: mode
      type: integer
      description: "1=ON, 4=OFF"
    - name: monitor_id
      type: string

- id: read_serial_number
  label: Read Serial Number
  kind: action
  params:
    - name: monitor_id
      type: string
  description: Returns up to 30-byte ASCII serial number

- id: read_model_name
  label: Read Model Name
  kind: action
  params:
    - name: monitor_id
      type: string
  description: Returns up to 36-byte ASCII model name

- id: read_mac_address
  label: Read MAC Address
  kind: action
  params:
    - name: monitor_id
      type: string
  description: Returns 12-byte hex MAC address

- id: read_firmware_version
  label: Read Firmware Version
  kind: action
  params:
    - name: monitor_id
      type: string
  description: Returns firmware revision string

- id: set_input_name
  label: Set Input Name
  kind: action
  params:
    - name: terminal
      type: integer
      description: Input terminal code
    - name: name
      type: string
      description: Max 14 character input name
    - name: monitor_id
      type: string

- id: reset_input_name
  label: Reset Input Name
  kind: action
  params:
    - name: terminal
      type: integer
      description: "0=ALL, 1=VGA(RGB), 5=AV, 9=Tuner, C=VGA(YPbPr), 11=HDMI1, 12=HDMI2, 82=HDMI3, 87=MP"
    - name: monitor_id
      type: string

- id: send_remote_control_code
  label: Send Remote Control Code
  kind: action
  params:
    - name: code
      type: integer
      description: "Remote control data code (hex). Common: 1D=PICTURE, 29=ASPECT, 43=SOUND, 08-0F=digits, 12=0, 20=MENU, 1F=EXIT, 15=UP, 14=DOWN, 21=LEFT, 22=RIGHT, 23=OK, 17=VOL+, 16=VOL-, 33=CH+, 32=CH-, 1B=MUTE"
    - name: repeat
      type: integer
      description: Repeat count
    - name: monitor_id
      type: string

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0003H=HighBright, 0004H=Standard, 0008H=Custom, 0017H=Dynamic, 0018H=EnergySavings, 001BH=HDRVideo, 001DH=Conferencing"
    - name: monitor_id
      type: string

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: "0001H=NORMAL, 0002H=FULL, 0004H=ZOOM, 0007H=1:1"
    - name: monitor_id
      type: string

- id: set_color_temperature
  label: Set Color Temperature
  kind: action
  params:
    - name: temp
      type: integer
      description: "0023H=Warm, 003FH=Normal, 005AH=Cool, 0002H=Native"
    - name: monitor_id
      type: string

- id: set_gamma
  label: Set Gamma
  kind: action
  params:
    - name: gamma
      type: integer
      description: "0001H=Native, 0004H=2.2, 0008H=2.4, 0010H=HDR-HybridLog, 0011H=HDR-ST2084(PQ)"
    - name: monitor_id
      type: string

- id: set_dimming_mode
  label: Set Dimming Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0001H=OFF, 0002H=Dynamic Backlight, 0003H=Local Dimming"
    - name: monitor_id
      type: string

- id: set_noise_reduction
  label: Set Noise Reduction
  kind: action
  params:
    - name: level
      type: integer
      description: "0000H=OFF, 0001H=Low, 0002H=Mid, 0003H=High"
    - name: monitor_id
      type: string

- id: execute_auto_setup
  label: Execute Auto Setup
  kind: action
  params:
    - name: monitor_id
      type: string
  description: Executes auto adjustment (VCP-00-1E)

- id: factory_reset
  label: Factory Reset
  kind: action
  params:
    - name: scope
      type: integer
      description: "0001H=All, 0002H=Picture, 0003H=Adjust, 0004H=Audio, 0010H=Network"
    - name: monitor_id
      type: string

# UNRESOLVED: scheduling commands not fully detailed in source
# UNRESOLVED: temperature sensor read - only partially documented (sensor selection and raw value decoding present, but full command syntax unclear)
- id: read_input_name
  label: Read Input Name
  kind: action
  params:
    - name: terminal
      type: integer
      description: '00=No mean, 01=VGA(RGB), 05=AV, 09=Tuner, 0C=VGA(YPbPr), 11=HDMI1, 12=HDMI2, 82=HDMI3, 87=MP'
    - name: monitor_id
      type: string
  description: CTL-CA04-03; reads current name of designated input terminal

- id: read_tv_channel
  label: Read TV Channel
  kind: action
  params:
    - name: monitor_id
      type: string
  description: CTL-C22C; returns Major Channel High/Low and Minor Channel

- id: write_tv_channel
  label: Write TV Channel
  kind: action
  params:
    - name: major_channel_high
      type: integer
      description: Major channel high bytes (H)(L)
    - name: major_channel_low
      type: integer
      description: Major channel low bytes (H)(L)
    - name: minor_channel
      type: integer
      description: Minor channel bytes (H)(L)
    - name: monitor_id
      type: string
  description: CTL-C22D; writes Direct TV Channel

- id: set_overscan
  label: Set Overscan
  kind: action
  params:
    - name: mode
      type: integer
      description: '0001H=Off, 0002H=On, 0003H=Auto'
    - name: monitor_id
      type: string

- id: set_color_temperature_native
  label: Set Color Temperature Native/Custom
  kind: action
  params:
    - name: mode
      type: integer
      description: 'VCP-00-14: 0002H=Native, 000BH=Custom'
    - name: monitor_id
      type: string

- id: set_noise_reduction_2
  label: Set Noise Reduction 2
  kind: action
  params:
    - name: level
      type: integer
      description: 'VCP-02-26: 0000H=OFF, 0001H=Low, 0002H=Mid, 0003H=High'
    - name: monitor_id
      type: string

- id: set_adaptive_contrast
  label: Set Adaptive Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: '0001H=Off, 0002H=Low, 0003H=Mid, 0004H=High'
    - name: monitor_id
      type: string

- id: set_ambient_light_sensing
  label: Set Ambient Light Sensing
  kind: action
  params:
    - name: mode
      type: integer
      description: '0001H=Off, 0002H=On'
    - name: monitor_id
      type: string

- id: set_color_enhance
  label: Set Color Enhance
  kind: action
  params:
    - name: mode
      type: integer
      description: '0001H=Off, 0002H=Vivid, 0003H=Wide'
    - name: monitor_id
      type: string

- id: set_hdr_mode
  label: Set HDR Mode
  kind: action
  params:
    - name: level
      type: integer
      description: '0004H=Low, 0005H=Mid, 0006H=High'
    - name: monitor_id
      type: string

- id: set_video_black_level
  label: Set Video Black Level
  kind: action
  params:
    - name: value
      type: integer
      description: '0000H-0064H (To Dark - To Bright)'
    - name: monitor_id
      type: string

- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: 'VCP-00-87: 0000H-0064H (Dull - Sharp)'
    - name: monitor_id
      type: string

- id: set_sharpness_2
  label: Set Sharpness 2
  kind: action
  params:
    - name: value
      type: integer
      description: 'VCP-00-8C: 0000H-0064H (Dull - Sharp)'
    - name: monitor_id
      type: string

- id: set_color
  label: Set Color
  kind: action
  params:
    - name: value
      type: integer
      description: 'VCP-00-8A: 0000H-0064H (Pale - To Deep)'
    - name: monitor_id
      type: string

- id: set_color_2
  label: Set Color 2
  kind: action
  params:
    - name: value
      type: integer
      description: 'VCP-02-1F: 0000H-0064H (Pale - To Deep)'
    - name: monitor_id
      type: string

- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      description: '0000H-0064H (To Purplish - To Greenish)'
    - name: monitor_id
      type: string

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: '0001H=Standard, 0002H=Movie, 0003H=Music, 0005H=Custom'
    - name: monitor_id
      type: string

- id: set_balance
  label: Set Balance
  kind: action
  params:
    - name: value
      type: integer
      description: '0000H-0064H (To Left - To Right)'
    - name: monitor_id
      type: string

- id: set_surround
  label: Set Surround
  kind: action
  params:
    - name: mode
      type: integer
      description: '0001H=Off, 0002H=On'
    - name: monitor_id
      type: string

- id: set_internal_speakers
  label: Set Internal Speakers
  kind: action
  params:
    - name: mode
      type: integer
      description: '0000H=No mean, 0001H=Off, 0002H=On, 0003H=Auto'
    - name: monitor_id
      type: string

- id: set_audio_input
  label: Set Audio Input
  kind: action
  params:
    - name: input
      type: integer
      description: '0001H=Audio1, 0002H=Audio2(AV), 0004H=HDMI1, 0006H=TV, 000AH=HDMI2, 000BH=HDMI3, 000DH=MP'
    - name: monitor_id
      type: string

- id: set_audio_delay
  label: Set Audio Delay
  kind: action
  params:
    - name: value
      type: integer
      description: '0000H-0064H (Small - Large)'
    - name: monitor_id
      type: string

- id: set_audio_source
  label: Set Audio Source MTS
  kind: action
  params:
    - name: source
      type: integer
      description: '0000H=No mean, 0001H=main, 0002H=sub, 0003H=main+sub, 0004H=stereo, 0005H=mono, 0006H=dual, 0007H=SAP'
    - name: monitor_id
      type: string

- id: set_audio_language
  label: Set Audio Language
  kind: action
  params:
    - name: language
      type: integer
      description: '0002H=English, 0003H=Français, 000AH=Español'
    - name: monitor_id
      type: string

- id: reset_audio
  label: Reset Audio Settings
  kind: action
  params:
    - name: value
      type: integer
      description: 'VCP-02-31: 0001H=Reset'
    - name: monitor_id
      type: string

- id: set_osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: language
      type: integer
      description: '0001H=English, 0002H=Deutsch, 0003H=Français, 0004H=Español'
    - name: monitor_id
      type: string

- id: set_osd_transparency
  label: Set OSD Transparency
  kind: action
  params:
    - name: level
      type: integer
      description: '0001H=Off, 0002H=30%, 0003H=50%, 0004H=70%'
    - name: monitor_id
      type: string

- id: set_information_osd
  label: Set Information OSD
  kind: action
  params:
    - name: mode
      type: integer
      description: '0000H=Off, 0005H=On'
    - name: monitor_id
      type: string

- id: set_caption_display
  label: Set Caption Display
  kind: action
  params:
    - name: mode
      type: integer
      description: '0000H=No mean, 0001H=Off, 0002H=CC1, 0003H=CC2, 0004H=CC3, 0005H=CC4, 0006H=Text1, 0007H=Text2, 0008H=Text3, 0009H=Text4'
    - name: monitor_id
      type: string

- id: set_digital_captions
  label: Set Digital Captions
  kind: action
  params:
    - name: mode
      type: integer
      description: '0000H=No mean, 0001H=Off, 0002H=CS1, 0003H=CS2, 0004H=CS3, 0005H=CS4, 0006H=CS5, 0007H=CS6'
    - name: monitor_id
      type: string

- id: set_quick_start
  label: Set Quick Start
  kind: action
  params:
    - name: mode
      type: integer
      description: '0001H=Off, 0002H=On'
    - name: monitor_id
      type: string

- id: set_auto_input_change
  label: Set Auto Input Change
  kind: action
  params:
    - name: mode
      type: integer
      description: '0000H=First, 0002H=None, 0004H=Custom'
    - name: monitor_id
      type: string

- id: set_auto_input_1
  label: Set Auto Input Change Input 1
  kind: action
  params:
    - name: input
      type: integer
      description: 'VCP-10-2E: 0001H=VGA, 0005H=Video1(AV), 000CH=DVD/HD1, 0011H=HDMI1, 0012H=HDMI2, 0082H=HDMI3'
    - name: monitor_id
      type: string

- id: set_auto_input_2
  label: Set Auto Input Change Input 2
  kind: action
  params:
    - name: input
      type: integer
      description: 'VCP-10-2F: 0001H=VGA, 0005H=Video1(AV), 000CH=DVD/HD1, 0011H=HDMI1, 0012H=HDMI2, 0082H=HDMI3'
    - name: monitor_id
      type: string

- id: set_auto_input_3
  label: Set Auto Input Change Input 3
  kind: action
  params:
    - name: input
      type: integer
      description: 'VCP-10-30: 0001H=VGA, 0005H=Video1(AV), 000CH=DVD/HD1, 0011H=HDMI1, 0012H=HDMI2, 0082H=HDMI3'
    - name: monitor_id
      type: string

- id: set_cec
  label: Set CEC
  kind: action
  params:
    - name: mode
      type: integer
      description: '0001H=Off, 0002H=On'
    - name: monitor_id
      type: string

- id: set_cec_auto_turn_off
  label: Set CEC Auto Turn Off
  kind: action
  params:
    - name: mode
      type: integer
      description: '0001H=Disable, 0002H=Enable'
    - name: monitor_id
      type: string

- id: set_cec_audio_receiver
  label: Set CEC Audio Receiver
  kind: action
  params:
    - name: mode
      type: integer
      description: '0001H=Disable, 0002H=Enable'
    - name: monitor_id
      type: string

- id: set_cec_device_list
  label: Set CEC Device List
  kind: action
  params:
    - name: mode
      type: integer
      description: '0001H=NO, 0002H=YES'
    - name: monitor_id
      type: string

- id: set_hdmi_edid_mode
  label: Set HDMI EDID Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: '0001H=Mode 0, 0002H=Mode 1, 0003H=Mode 2'
    - name: monitor_id
      type: string

- id: set_hdmi_video_range
  label: Set HDMI Video Range
  kind: action
  params:
    - name: range
      type: integer
      description: '0001H=Expanded Signal, 0002H=Raw Signal, 0003H=Auto'
    - name: monitor_id
      type: string

- id: set_vga_mode
  label: Set VGA Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: '0001H=RGB, 0002H=YPbPr'
    - name: monitor_id
      type: string

- id: set_h_position
  label: Set H.Position
  kind: action
  params:
    - name: value
      type: integer
      description: '0000H-0064H (Left Side - Right Side)'
    - name: monitor_id
      type: string

- id: set_v_position
  label: Set V.Position
  kind: action
  params:
    - name: value
      type: integer
      description: '0000H-0064H (Bottom Side - Top Side)'
    - name: monitor_id
      type: string

- id: set_clock
  label: Set Clock
  kind: action
  params:
    - name: value
      type: integer
      description: 'VCP-00-0E: 0000H-0064H'
    - name: monitor_id
      type: string

- id: set_phase
  label: Set Phase
  kind: action
  params:
    - name: value
      type: integer
      description: 'VCP-00-3E: 0000H-0064H'
    - name: monitor_id
      type: string

- id: set_h_resolution
  label: Set H.Resolution
  kind: action
  params:
    - name: value
      type: integer
      description: 'VCP-02-50: 0000H-FFFFH (Low - High)'
    - name: monitor_id
      type: string

- id: set_v_resolution
  label: Set V.Resolution
  kind: action
  params:
    - name: value
      type: integer
      description: 'VCP-02-51: 0000H-FFFFH (Low - High)'
    - name: monitor_id
      type: string

- id: set_key_lock
  label: Set Key Lock
  kind: action
  params:
    - name: mode
      type: integer
      description: '0000H=Off, 0001H=Mode2, 0002H=Mode1'
    - name: monitor_id
      type: string

- id: set_ir_lock
  label: Set IR Lock
  kind: action
  params:
    - name: mode
      type: integer
      description: '0001H=Off, 0004H=Mode2, 0005H=Mode1'
    - name: monitor_id
      type: string

- id: set_power_supply
  label: Set Power Supply
  kind: action
  params:
    - name: mode
      type: integer
      description: '0001H=ON, 0003H=OFF'
    - name: monitor_id
      type: string

- id: set_led_indicator
  label: Set LED Indicator
  kind: action
  params:
    - name: mode
      type: integer
      description: '0001H=ON, 0002H=OFF'
    - name: monitor_id
      type: string

- id: set_mute_settings
  label: Set Mute Settings
  kind: action
  params:
    - name: mode
      type: integer
      description: '0001H=Audio, 0002H=Video, 0003H=Audio & Video'
    - name: monitor_id
      type: string

- id: set_thermal_warning
  label: Set Thermal Warning
  kind: action
  params:
    - name: mode
      type: integer
      description: '0000H=No mean, 0001H=Off, 0002H=On'
    - name: monitor_id
      type: string

- id: set_thermal_shutdown
  label: Set Thermal Shutdown
  kind: action
  params:
    - name: mode
      type: integer
      description: '0001H=Off, 0002H=On'
    - name: monitor_id
      type: string

- id: set_monitor_id
  label: Set Monitor ID
  kind: action
  params:
    - name: id
      type: integer
      description: 'VCP-02-3E: 0001H-0064H (1-100)'
    - name: monitor_id
      type: string

- id: set_control_interface
  label: Set Control Interface
  kind: action
  params:
    - name: interface
      type: integer
      description: '0001H=RS-232C, 0002H=LAN'
    - name: monitor_id
      type: string

- id: select_temperature_sensor
  label: Select Temperature Sensor
  kind: action
  params:
    - name: sensor
      type: integer
      description: 'VCP-02-78: sensor number (01h=sensor 1); reply returns total sensor count'
    - name: monitor_id
      type: string

- id: read_temperature
  label: Read Temperature
  kind: action
  params:
    - name: monitor_id
      type: string
  description: 'VCP-02-79; returns 2s complement temperature value (0032h=25C, FFCEh=-25C)'
```

## Feedbacks
```yaml
# VCP get/set parameter reply
- id: parameter_reply
  type: object
  properties:
    - name: result
      type: string
      description: "00h=No Error, 01h=Unsupported"
    - name: op_code_page
      type: string
    - name: op_code
      type: string
    - name: type
      type: string
      description: "00h=Set parameter, 01h=Momentary"
    - name: max_value
      type: integer
    - name: current_value
      type: integer

# CTL command replies follow similar result code pattern
- id: command_reply
  type: object
  properties:
    - name: result
      type: string
      description: "00h=No Error, 01h=Unsupported/Error"
    - name: message
      type: string

# Power status reply
- id: power_status_reply
  type: enum
  values: [1, 2, 3, 4]
  description: "1=ON, 2=Stand-by, 3=Reserved, 4=OFF"

# Timing report reply
- id: timing_report
  type: object
  properties:
    - name: status
      type: object
      description: "Bit7=Sync out of range, Bit6=Unstable, Bit1=H polarity, Bit0=V polarity"
    - name: h_freq
      type: integer
      description: Horizontal frequency in 0.01kHz units
    - name: v_freq
      type: integer
      description: Vertical frequency in 0.01Hz units

# Serial number reply
- id: serial_number_reply
  type: string
  description: Up to 30-byte ASCII serial number

# Model name reply
- id: model_name_reply
  type: string
  description: Up to 36-byte ASCII model name

# MAC address reply
- id: mac_address_reply
  type: string
  description: 12-byte hex MAC address

# Firmware version reply
- id: firmware_version_reply
  type: string
  description: ASCII firmware revision string (e.g. R1.234)

# Temperature sensor reply
- id: temperature_reply
  type: object
  description: 2's complement temperature value; 0032h=25C, FFCEh=-25C, FF92h=-55C

# NULL message reply (error/timeout/busy)
- id: null_reply
  type: enum
  values: [timeout_error, unsupported, bcc_error, not_ready, busy]
  description: "Monitor returns NULL when: timeout (10s), unsupported msg, BCC error, not ready, or busy during power-on/off/auto-setup/input change"
```

## Variables
```yaml
# VCP read/write parameters - settable via set_* actions above
# Backlight: VCP-00-10, range 0-100
# Contrast: VCP-00-12, range 0-100
# Brightness: VCP-00-10, range 0-100
# Color Gain R/G/B: VCP-00-16/18/1A, range 0-100
# Color: VCP-00-8A or VCP-02-1F, range 0-100
# Tint: VCP-00-90, range 0-100
# Sharpness: VCP-00-87/8C, range 0-100
# Picture Mode: VCP-02-1A
# Aspect Ratio: VCP-02-70
# Color Temperature: VCP-00-0C (warm/normal/cool), VCP-00-14 (native/custom)
# Gamma: VCP-02-68
# Noise Reduction: VCP-02-20
# Dimming Mode: VCP-11-4E
# Overscan: VCP-02-E3
# Adaptive Contrast: VCP-02-8D
# Ambient Light Sensing: VCP-10-C8
# HDR Mode: VCP-11-E5
# Video Black Level: VCP-00-92

# Audio variables
# Sound Mode: VCP-10-B2, values 1=Standard, 2=Movie, 3=Music, 5=Custom
# Balance: VCP-00-93, range 0-100 (Left-Right)
# Surround: VCP-02-34, 1=Off, 2=On
# Internal Speakers: VCP-11-BA, 0=No mean, 1=Off, 2=On, 3=Auto
# Audio Input: VCP-02-2E
# Audio Delay: VCP-10-CB, range 0-100
# Audio Source (MTS): VCP-02-2C
# Audio Language: VCP-10-B3

# Network/control variables
# Monitor ID: VCP-02-3E, range 1-100
# Control Interface: VCP-10-3E, 1=RS-232C, 2=LAN
# Quick Start: VCP-11-EA
# LED Indicator: VCP-02-BE
# Mute Settings: VCP-11-E9
# Thermal Warning: VCP-11-ED
# Thermal Shutdown: VCP-10-8A
# CEC: VCP-11-76
# HDMI EDID Mode: VCP-10-AA
# HDMI Video Range: VCP-10-40
# VGA Mode: VCP-10-8E (RGB/YPbPr)
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited event notifications from monitor
# The monitor only replies to controller commands; no push-style events documented
```

## Macros
```yaml
# The document provides two complete procedure examples:
#
# Backlight change procedure (5 steps):
# 1. Get current backlight (VCP get, page 00, op 10)
# 2. Monitor replies with current value and max (64h=100)
# 3. Set backlight to new value (VCP set)
# 4. Monitor replies with confirmation
# 5. Save settings (CTL-0C command)
#
# Temperature read procedure (4 steps):
# 1. Select sensor (VCP set, page 02, op 78, value 01)
# 2. Monitor replies with sensor count and selection
# 3. Read temperature (VCP get, page 02, op 79)
# 4. Monitor replies with 2's complement temperature value

# Common command sequence for any parameter change:
# Get → Set → (optional Get to verify) → Save Current Settings
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
# Note: monitor returns NULL (busy) during power-on/off/auto-setup operations;
# controller must re-connect after 15 minutes of no activity (TCP)
```

## Notes
- Command packet structure: SOH(01h) + Reserved('0') + Destination + Source + MessageType + MessageLength(2 bytes ASCII) + STX + Message + ETX + CheckCode(BCC) + CR(0Dh)
- BCC = XOR of all bytes from byte1 to ETX (D1 xor D2 xor ... xor D16)
- Message types: A=Command, B=Command reply, C=Get parameter, D=Get reply, E=Set parameter, F=Set reply
- Destination address: Monitor ID 1-100 maps to ASCII 'A'-'X'; '*'=2Ah for broadcast
- Source address: Controller always '0'(30h); monitor echoes its own ID in replies
- IP default: DHCP=On; port 7142 fixed; 15-minute connection timeout
- 600ms minimum packet interval required between commands
- Temperature readout uses 2's complement encoding (see temperature table in source)
- Remote control code sending (CTL-C210) allows sending IR codes directly via RS-232C

<!-- UNRESOLVED: complete model list (PN-UH601, PN-UH701, PN-UH861, etc.) not enumerated in source -->
<!-- UNRESOLVED: TV tuner commands (*1标记) only for US models -->
<!-- UNRESOLVED: Local Dimming (*3标记) not supported on E328 model -->

## Provenance

```yaml
source_domains:
  - sharp-displays.jp.sharp
  - business.sharpusa.com
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
  - https://business.sharpusa.com/portals/0/downloads/manuals/pn-pxx6_pn-mxx2_n_format_external_control_manual.pdf
  - https://business.sharpusa.com/portals/0/downloads/manuals/pn-la862-la752-la652_n-format_command_manual_en_rev1.pdf
  - https://business.sharpusa.com
  - https://business.sharpusa.com/portals/0/downloads/manuals/pn-lc862-lc752-lc652_s-format_command_manual.pdf
retrieved_at: 2026-05-18T11:39:42.815Z
last_checked_at: 2026-06-10T02:16:45.040Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T02:16:45.040Z
matched_actions: 87
action_count: 87
confidence: medium
summary: "All 87 spec actions match source VCP/CTL commands; all 84 source commands are covered and transport params confirmed. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "complete model list not stated in source; family name used"
- "scheduling commands not fully detailed in source"
- "temperature sensor read - only partially documented (sensor selection and raw value decoding present, but full command syntax unclear)"
- "source does not describe unsolicited event notifications from monitor"
- "no safety warnings or interlock procedures in source"
- "complete model list (PN-UH601, PN-UH701, PN-UH861, etc.) not enumerated in source"
- "TV tuner commands (*1标记) only for US models"
- "Local Dimming (*3标记) not supported on E328 model"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
