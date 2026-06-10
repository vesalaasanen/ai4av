---
spec_id: admin/sharp-pne-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp PNE Series Control Spec"
manufacturer: Sharp
model_family: "PNE Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "PNE Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
retrieved_at: 2026-05-27T11:29:13.162Z
last_checked_at: 2026-06-10T01:59:20.767Z
generated_at: 2026-06-10T01:59:20.767Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TV tuner commands (section 7.5) available on US TV tuner models only. UNRESOLVED: specific PNE model numbers not listed in source."
  - "monitor does not initiate unsolicited messages. All communication is request/reply."
  - "no explicit multi-step macros in source. However typical procedure example (section 6)"
  - "no safety warnings or interlock procedures in source."
  - "model-specific sub-commands (*1 note — TV tuner items, *3 — E328 Local Dimming)."
  - "firmware version compatibility ranges not stated."
  - "voltage/current/power specifications not provided."
verification:
  verdict: verified
  checked_at: 2026-06-10T01:59:20.767Z
  matched_actions: 89
  action_count: 89
  confidence: medium
  summary: "All 89 spec actions verified: 14 CTL commands (CTL-0C through CTL-CA04-05), 2 generic VCP protocol operations, and 73 specific VCP code actions covering all 70 distinct source VCP codes with correct enum values; transport baud 9600 and port 7142 confirmed verbatim; three spec actions (set_brightness, power_on, power_off) over-represent source commands already covered by set_backlight/power_control but all have valid source backing. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Sharp PNE Series Control Spec

## Summary
Sharp PNE Series LCD monitor controllable via RS-232C (9600bps8-N-1) and TCP/IP (port 7142). Binary packet protocol with Header/Message/BCC/Delimiter structure. Supports VCP (Video Control Page) get/set operations and CTL (control) commands for power, timing, serial number, model name, firmware version, input names, and remote control passthrough.

<!-- UNRESOLVED: TV tuner commands (section 7.5) available on US TV tuner models only. UNRESOLVED: specific PNE model numbers not listed in source. -->

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
  port: 7142  # stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Add only traits supported by evidence from source:
# - powerable       (CTL-01D6 power status read, CTL-C203-D6 power control)
# - queryable       (VCP get parameter, CTL commands returning values)
# - routable        (input select VCP-00-60, HDMI CEC commands)
# - levelable       (backlight, contrast, brightness, sharpness, color, tint, balance, audio delay)
```

## Actions
```yaml
# VCP Get current parameter
- id: vcp_get  label: VCP Get Parameter
  kind: query
  params:
    - name: page      type: integer
      description: OP code page (hex, ASCII-encoded)
    - name: code
      type: integer
      description: OP code (hex, ASCII-encoded)

# VCP Set parameter
- id: vcp_set
  label: VCP Set Parameter
  kind: action
  params:
    - name: page
      type: integer
      description: OP code page (hex, ASCII-encoded)
    - name: code
      type: integer
      description: OP code (hex, ASCII-encoded)
    - name: value
      type: integer
      description: 16-bit set value (ASCII-encoded)

# CTL-0C / CTL-000C: Save Current Settings
- id: save_current_settings
  label: Save Current Settings
  kind: action
  params: []

# CTL-07 / CTL-0007: Get Timing Report
- id: get_timing_report  label: Get Timing Report
  kind: query
  params: []

# CTL-01D6: Power status read
- id: power_status_read
  label: Power Status Read
  kind: query
  params: []

# CTL-C203-D6: Power control
- id: power_control
  label: Power Control
  kind: action
  params:
    - name: mode
      type: integer
      description: "1=ON, 2=Do not set, 3=Do not set, 4=OFF"

# CTL-C216: Serial number read
- id: serial_number_read
  label: Serial Number Read
  kind: query
  params: []

# CTL-C217: Model name read
- id: model_name_read
  label: Model Name Read
  kind: query
  params: []

# CTL-C220: MAC address read
- id: mac_address_read
  label: MAC Address Read
  kind: query
  params: []

# CTL-C22C: Direct TV channel read (US tuner models only)
- id: direct_tv_channel_read
  label: Direct TV Channel Read
  kind: query
  params: []

# CTL-C22D: Direct TV channel write (US tuner models only)
- id: direct_tv_channel_write
  label: Direct TV Channel Write
  kind: action
  params:
    - name: major_high
      type: integer
    - name: major_low
      type: integer
    - name: minor
      type: integer

# CTL-C210: Remote control data code via RS-232C
- id: remote_control_data_code
  label: Remote Control Data Code
  kind: action
  params:
    - name: data_code      type: integer
      description: Remote control code (e.g. 1D=PICTURE, 29=ASPECT, 08-10=1-9, 12=0, etc.)
    - name: repeat_times
      type: integer
      description: Repeat count# CTL-CA02: Firmware version read
- id: firmware_version_read
  label: Firmware Version Read  kind: query
  params:
    - name: firmware_type
      type: integer
      description: "00=Firmware Revision"

# CTL-CA04-03: Input name of designated terminal read
- id: input_name_read
  label: Input Name Read
  kind: query
  params:
    - name: terminal
      type: integer
      description: "01=VGA(RGB), 05=AV, 09=Tuner, 0C=VGA(YPbPr), 11=HDMI1, 12=HDMI2, 82=HDMI3, 87=MP"

# CTL-CA04-04: Input name of designated terminal write
- id: input_name_write
  label: Input Name Write
  kind: action
  params:
    - name: terminal
      type: integer
    - name: name
      type: string

# CTL-CA04-05: Input name of designated terminal reset
- id: input_name_reset
  label: Input Name Reset
  kind: action
  params:
    - name: terminal
      type: integer
      description: "00=ALL, 01=VGA(RGB), 05=AV, 09=Tuner, 0C=VGA(YPbPr), 11=HDMI1, 12=HDMI2, 82=HDMI3, 87=MP"

# VCP actions from OSD table (representative set - full VCP table has many items)
- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 (VCP-00-10)"

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 (VCP-00-12)"

- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 (VCP-00-10)"

- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 (VCP-00-87)"

- id: set_color
  label: Set Color
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 (VCP-00-8A)"

- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 (VCP-00-90)"

- id: set_audio_balance
  label: Set Audio Balance
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 (VCP-00-93)"

- id: input_select  label: Input Select
  kind: action
  params:
    - name: input
      type: integer
      description: "0001=VGA(RGB), 0005=Video1(AV), 0009=Tuner1, 000C=DVD/HD1(VGA-YPbPr), 0011=HDMI1, 0012=HDMI2, 0082=HDMI3, 0087=MP"

- id: power_on  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: factory_reset
  label: Factory Reset
  kind: action
  params:
    - name: scope
      type: integer
      description: "0001=All, 0002=Picture, 0003=Adjust, 0004=Audio, 0010=Network"
- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: value
      type: integer
      description: '0003H=HighBright, 0004H=Standard, 0008H=Custom, 0017H=Dynamic, 0018H=Energy Savings, 001BH=HDR Video, 001DH=Conferencing (VCP-02-1A)'
- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=NORMAL, 0002H=FULL, 0004H=ZOOM, 0007H=1:1 (VCP-02-70)'
- id: set_overscan
  label: Set Overscan
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=Off, 0002H=On, 0003H=Auto (VCP-02-E3)'
- id: set_dimming_setting
  label: Set Dimming Setting
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=OFF, 0002H=Dynamic Backlight, 0003H=Local Dimming (VCP-11-4E)'
- id: set_color_temperature
  label: Set Color Temperature
  kind: action
  params:
    - name: value
      type: integer
      description: '0023H=Warm, 003FH=Normal, 005AH=Cool (VCP-00-0C)'
- id: set_color_temperature_type
  label: Set Color Temperature Type
  kind: action
  params:
    - name: value
      type: integer
      description: '0002H=Native, 000BH=Custom (VCP-00-14)'
- id: set_red_gain
  label: Set Red Gain
  kind: action
  params:
    - name: value
      type: integer
      description: '0000H-0064H dark to bright (VCP-00-16)'
- id: set_green_gain
  label: Set Green Gain
  kind: action
  params:
    - name: value
      type: integer
      description: '0000H-0064H dark to bright (VCP-00-18)'
- id: set_blue_gain
  label: Set Blue Gain
  kind: action
  params:
    - name: value
      type: integer
      description: '0000H-0064H dark to bright (VCP-00-1A)'
- id: set_noise_reduction
  label: Set Noise Reduction
  kind: action
  params:
    - name: value
      type: integer
      description: '0000H=OFF, 0001H=Low, 0002H=Mid, 0003H=High (VCP-02-20)'
- id: set_noise_reduction_2
  label: Set Noise Reduction 2
  kind: action
  params:
    - name: value
      type: integer
      description: '0000H=OFF, 0001H=Low, 0002H=Mid, 0003H=High (VCP-02-26)'
- id: set_adaptive_contrast
  label: Set Adaptive Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=Off, 0002H=Low, 0003H=Mid, 0004H=High (VCP-02-8D)'
- id: set_gamma
  label: Set Gamma
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=Native, 0004H=2.2, 0008H=2.4, 0010H=HDR-Hybrid Log, 0011H=HDR-ST2084(PQ) (VCP-02-68)'
- id: set_ambient_light_sensing
  label: Set Ambient Light Sensing
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=Off, 0002H=On (VCP-10-C8)'
- id: set_color_enhance
  label: Set Color Enhance
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=Off, 0002H=Vivid, 0003H=Wide (VCP-11-EC)'
- id: set_hdr_mode
  label: Set HDR Mode
  kind: action
  params:
    - name: value
      type: integer
      description: '0004H=Low, 0005H=Mid, 0006H=High (VCP-11-E5)'
- id: set_video_black_level
  label: Set Video Black Level
  kind: action
  params:
    - name: value
      type: integer
      description: '0000H-0064H (VCP-00-92)'
- id: set_sharpness_2
  label: Set Sharpness 2
  kind: action
  params:
    - name: value
      type: integer
      description: '0000H-0064H dull to sharp (VCP-00-8C)'
- id: set_color_2
  label: Set Color 2
  kind: action
  params:
    - name: value
      type: integer
      description: '0000H-0064H pale to deep (VCP-02-1F)'
- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=Standard, 0002H=Movie, 0003H=Music, 0005H=Custom (VCP-10-B2)'
- id: set_surround
  label: Set Surround
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=Off, 0002H=On (VCP-02-34)'
- id: set_internal_speakers
  label: Set Internal Speakers
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=Off, 0002H=On, 0003H=Auto (VCP-11-BA)'
- id: set_audio_input
  label: Set Audio Input
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=Audio1(Audio In), 0002H=Audio2(AV), 0004H=HDMI1, 0006H=TV, 000AH=HDMI2, 000BH=HDMI3, 000DH=MP (VCP-02-2E)'
- id: set_audio_delay
  label: Set Audio Delay
  kind: action
  params:
    - name: value
      type: integer
      description: '0000H-0064H small to large (VCP-10-CB)'
- id: set_audio_source_mts
  label: Set Audio Source MTS
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=main, 0002H=sub, 0003H=main+sub, 0004H=stereo, 0005H=mono, 0006H=dual, 0007H=SAP (VCP-02-2C)'
- id: set_audio_language
  label: Set Audio Language
  kind: action
  params:
    - name: value
      type: integer
      description: '0002H=English, 0003H=Francais, 000AH=Espanol (VCP-10-B3)'
- id: set_osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=English, 0002H=Deutsch, 0003H=Francais, 0004H=Espanol (VCP-00-68)'
- id: set_osd_transparency
  label: Set OSD Transparency
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=Off, 0002H=30%, 0003H=50%, 0004H=70% (VCP-02-B8)'
- id: set_information_osd
  label: Set Information OSD
  kind: action
  params:
    - name: value
      type: integer
      description: '0000H=Off, 0005H=On (VCP-02-3D)'
- id: set_caption_display
  label: Set Caption Display
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=Off, 0002H=CC1, 0003H=CC2, 0004H=CC3, 0005H=CC4, 0006H=Text1, 0007H=Text2, 0008H=Text3, 0009H=Text4 (VCP-10-84)'
- id: set_digital_captions
  label: Set Digital Captions
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=Off, 0002H=CS1, 0003H=CS2, 0004H=CS3, 0005H=CS4, 0006H=CS5, 0007H=CS6 (VCP-10-A1)'
- id: set_quick_start
  label: Set Quick Start
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=Off, 0002H=On (VCP-11-EA)'
- id: set_auto_input_change
  label: Set Auto Input Change
  kind: action
  params:
    - name: value
      type: integer
      description: '0000H=First, 0002H=None, 0004H=Custom (VCP-02-40)'
- id: set_auto_input_1
  label: Set Auto Input Change Input 1
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=VGA, 0005H=Video1(AV), 000CH=DVD/HD1(VGA-YPbPr), 0011H=HDMI1, 0012H=HDMI2, 0082H=HDMI3 (VCP-10-2E)'
- id: set_auto_input_2
  label: Set Auto Input Change Input 2
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=VGA, 0005H=Video1(AV), 000CH=DVD/HD1(VGA-YPbPr), 0011H=HDMI1, 0012H=HDMI2, 0082H=HDMI3 (VCP-10-2F)'
- id: set_auto_input_3
  label: Set Auto Input Change Input 3
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=VGA, 0005H=Video1(AV), 000CH=DVD/HD1(VGA-YPbPr), 0011H=HDMI1, 0012H=HDMI2, 0082H=HDMI3 (VCP-10-30)'
- id: set_cec
  label: Set CEC
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=Off, 0002H=On (VCP-11-76)'
- id: set_cec_auto_turn_off
  label: Set CEC Auto Turn Off
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=Disable, 0002H=Enable (VCP-11-77)'
- id: set_cec_audio_receiver
  label: Set CEC Audio Receiver
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=Disable, 0002H=Enable (VCP-11-78)'
- id: set_cec_device_list
  label: Set CEC Device List
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=NO, 0002H=YES (VCP-11-79)'
- id: set_edid
  label: Set EDID
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=Mode 0, 0002H=Mode 1, 0003H=Mode 2 (VCP-10-AA)'
- id: set_video_range
  label: Set Video Range
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=Expanded Signal, 0002H=Raw Signal, 0003H=Auto (VCP-10-40)'
- id: set_vga_mode
  label: Set VGA Mode
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=RGB, 0002H=YPbPr (VCP-10-8E)'
- id: auto_adjust
  label: Auto Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=Execute (VCP-00-1E)'
- id: set_h_position
  label: Set H Position
  kind: action
  params:
    - name: value
      type: integer
      description: '0000H-0064H left to right (VCP-00-20)'
- id: set_v_position
  label: Set V Position
  kind: action
  params:
    - name: value
      type: integer
      description: '0000H-0064H bottom to top (VCP-00-30)'
- id: set_clock
  label: Set Clock
  kind: action
  params:
    - name: value
      type: integer
      description: '0000H-0064H (VCP-00-0E)'
- id: set_phase
  label: Set Phase
  kind: action
  params:
    - name: value
      type: integer
      description: '0000H-0064H (VCP-00-3E)'
- id: set_h_resolution
  label: Set H Resolution
  kind: action
  params:
    - name: value
      type: integer
      description: '0000H-FFFFh low to high (VCP-02-50)'
- id: set_v_resolution
  label: Set V Resolution
  kind: action
  params:
    - name: value
      type: integer
      description: '0000H-FFFFh low to high (VCP-02-51)'
- id: set_key_lock
  label: Set Key Lock
  kind: action
  params:
    - name: value
      type: integer
      description: '0000H=Off, 0001H=Mode2, 0002H=Mode1 (VCP-00-FB)'
- id: set_ir_lock
  label: Set IR Lock
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=Off, 0004H=Mode2, 0005H=Mode1 (VCP-02-3F)'
- id: set_power_supply
  label: Set Power Supply
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=ON, 0003H=OFF (VCP-11-75)'
- id: set_led_indicator
  label: Set LED Indicator
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=ON, 0002H=OFF (VCP-02-BE)'
- id: set_mute_settings
  label: Set Mute Settings
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=Audio, 0002H=Video, 0003H=Audio & Video (VCP-11-E9)'
- id: set_thermal_warning
  label: Set Thermal Warning
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=Off, 0002H=On (VCP-11-ED)'
- id: set_thermal_shutdown
  label: Set Thermal Shutdown
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=Off, 0002H=On (VCP-10-8A)'
- id: set_control_interface
  label: Set Control Interface
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=RS-232C, 0002H=LAN (VCP-10-3E)'
- id: set_monitor_id
  label: Set Monitor ID
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H-0064H (VCP-02-3E)'
- id: select_temperature_sensor
  label: Select Temperature Sensor
  kind: action
  params:
    - name: sensor_index
      type: integer
      description: 'Select sensor 1 to N; max value field returns sensor count (VCP-02-78)'
- id: get_temperature
  label: Get Temperature
  kind: query
  params:
    - name: value
      type: integer
      description: '2-complement readout; 0032h=25C, FFFFh=-0.5C (VCP-02-79)'
- id: reset_audio_settings
  label: Reset Audio Settings
  kind: action
  params:
    - name: value
      type: integer
      description: '0001H=Reset (VCP-02-31)'
```

## Feedbacks
```yaml
# VCP Get parameter reply
- id: vcp_get_reply
  type: object
  fields:
    - name: result_code
      type: integer
      description: "00=No Error, 01=Unsupported"
    - name: op_code_page
      type: integer
    - name: op_code
      type: integer
    - name: type
      type: integer
      description: "00=Set parameter, 01=Momentary"
    - name: max_value
      type: integer
    - name: current_value
      type: integer

# VCP Set parameter reply
- id: vcp_set_reply
  type: object
  fields:
    - name: result_code
      type: integer
    - name: op_code_page
      type: integer
    - name: op_code
      type: integer
    - name: type
      type: integer
    - name: max_value
      type: integer
    - name: requested_value
      type: integer

# Power status reply
- id: power_status_reply
  type: enum
  values: [on, stand-by, reserved, off]
  description: "0001=ON, 0002=Stand-by, 0003=Reserved, 0004=OFF"

# Timing report reply
- id: timing_report_reply
  type: object
  fields:
    - name: status_byte
      type: integer
      description: Bitfield - Bit7=sync out of range, Bit6=unstable, Bit1=h-polarity, Bit0=v-polarity
    - name: h_freq
      type: integer
      description: Horizontal frequency in0.01kHz
    - name: v_freq
      type: integer
      description: Vertical frequency in 0.01Hz# NULL message reply
- id: null_message_reply
  type: enum
  values: [timeout_error, unsupported_msg_type, bcc_error, no_answer, execution_in_progress]
```

## Variables
```yaml
# Temperature sensors (read-only via VCP page 2 op78/79)
# Input names (read/write via CTL-CA04)

# Example VCP-controllable parameters:
- id: backlight
  type: integer  range: [0, 100]
  description: "VCP-00-10"

- id: contrast  type: integer
  range: [0, 100]
  description: "VCP-00-12"

- id: power_mode
  type: enum
  values: [on, stand-by, reserved, off]
  description: "Power mode via CTL-01D6 / CTL-C203-D6"
```

## Events
```yaml
# UNRESOLVED: monitor does not initiate unsolicited messages. All communication is request/reply.
# However, NULL message (5.5.3) may be returned when monitor is busy executing prior command.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros in source. However typical procedure example (section 6)
# demonstrates: (1) get current value, (2) set new value, (3) reply confirmation, (4) save settings.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source.
```

## Notes
- Packet interval between commands must exceed 600ms for both RS-232C and LAN.
- LAN connection disconnects after 15 minutes of no packet data; controller must reconnect.
- All multi-byte numeric values (OP code page, OP code, set value, etc.) are ASCII-encoded hex digits.
- Monitor ID / Group ID addressing uses address conversion table (section 4.1.1).
- Check code (BCC) is XOR of all bytes from D1 to D16 after ETX.
- Delimiter is ASCII CR (0Dh).
- Remote control data codes via CTL-C210 are for IR remote passthrough; available codes include PICTURE(1D), ASPECT(29), SOUND(43), 1-9(08-10), 0(12), INFO(19), MENU(20), EXIT(1F), UP(15), DOWN(14), LEFT(21), RIGHT(22), OK(23), VOL+-(17/16), CH+-(33/32), MUTE(1B), FREEZE(27), CC(2C), MTS(1A).
<!-- UNRESOLVED: model-specific sub-commands (*1 note — TV tuner items, *3 — E328 Local Dimming). -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated. -->
<!-- UNRESOLVED: voltage/current/power specifications not provided. -->

## Provenance

```yaml
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
retrieved_at: 2026-05-27T11:29:13.162Z
last_checked_at: 2026-06-10T01:59:20.767Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T01:59:20.767Z
matched_actions: 89
action_count: 89
confidence: medium
summary: "All 89 spec actions verified: 14 CTL commands (CTL-0C through CTL-CA04-05), 2 generic VCP protocol operations, and 73 specific VCP code actions covering all 70 distinct source VCP codes with correct enum values; transport baud 9600 and port 7142 confirmed verbatim; three spec actions (set_brightness, power_on, power_off) over-represent source commands already covered by set_backlight/power_control but all have valid source backing. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TV tuner commands (section 7.5) available on US TV tuner models only. UNRESOLVED: specific PNE model numbers not listed in source."
- "monitor does not initiate unsolicited messages. All communication is request/reply."
- "no explicit multi-step macros in source. However typical procedure example (section 6)"
- "no safety warnings or interlock procedures in source."
- "model-specific sub-commands (*1 note — TV tuner items, *3 — E328 Local Dimming)."
- "firmware version compatibility ranges not stated."
- "voltage/current/power specifications not provided."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
