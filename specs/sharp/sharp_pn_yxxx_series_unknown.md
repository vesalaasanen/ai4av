---
spec_id: admin/sharp-pn-yxxx-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp PN Yxxx Series Control Spec"
manufacturer: Sharp
model_family: "Sharp PN Yxxx Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "Sharp PN Yxxx Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharp-displays.jp.sharp
  - business.sharpusa.com
  - my.sharp-asia.com
  - docs.aws.sharp.eu
  - sharp.ca
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
  - https://business.sharpusa.com/portals/0/downloads/manuals/pn-lc862-lc752-lc652_s-format_command_manual.pdf
  - https://my.sharp-asia.com/wp-content/uploads/2024/01/PN-LC862_LC752_LC652_External_Control_S-Format_ver1-1.pdf
  - https://docs.aws.sharp.eu/Marketing/Operational_manuals/PN-LC862_LC752_LC652_External_Control_N-Format_ver1-0.pdf
  - https://sharp.ca/uploads/product_downloads/PNY326_436_469_556_OM.pdf
retrieved_at: 2026-05-13T20:48:25.500Z
last_checked_at: 2026-06-10T01:19:25.719Z
generated_at: 2026-06-10T01:19:25.719Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact PN-Yxxx model variants not enumerated in source"
  - "monitor does not send unsolicited events; all communication is request-reply"
  - "no safety warnings or interlock procedures stated in source"
  - "complete VCP code table not in source (chapter 8 referenced but not included)"
  - "power-on sequencing time requirements not stated"
  - "TV tuner commands (*) only for US model - applicability not verified"
verification:
  verdict: verified
  checked_at: 2026-06-10T01:19:25.719Z
  matched_actions: 80
  action_count: 80
  confidence: medium
  summary: "All 80 spec Actions map 1-to-1 to documented CTL/VCP codes in the source; 4 VCP codes (02-1A, 02-70, 00-0C, 02-68) appear in spec Variables rather than Actions and are represented in the spec; transport values match verbatim; shapes and parameter ranges agree throughout. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-13
---

# Sharp PN Yxxx Series Control Spec

## Summary
Sharp commercial LCD display supporting dual control interfaces: RS-232C (9600-8N1) and TCP/IP (port 7142). Protocol is packet-based with Header/Message/CheckCode/Delimiter framing. Commands split into VCP (VCP codes for get/set) and CTL (control commands for power, identity, timing). 600ms packet interval required between commands.

<!-- UNRESOLVED: exact PN-Yxxx model variants not enumerated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # stated: "7142 (Fixed)" for LAN control
serial:
  baud_rate: 9600  # stated: "9600bps"
  data_bits: 8     # stated: "8bits"
  parity: none     # stated: "None"
  stop_bits: 1    # stated: "1 bit"
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # CTL-01D6 power status read, CTL-C203-D6 power control
- queryable    # serial no (CTL-C216), model name (CTL-C217), firmware (CTL-CA02), MAC (CTL-C220), timing (CTL-07), temp sensors (VCP-02-78/79)
- levelable    # backlight (VCP-00-10), contrast (VCP-00-12), brightness, color, tint, sharpness, gamma
- routable     # input select via VCP-00-60
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params:
    - name: mode
      type: integer
      description: Power mode 0001h=ON, 0004h=OFF (same as IR power off)
  notes: "CTL-C203-D6; ON=0001, Stand-by=0002, Reserved=0003, OFF=0004"

- id: power_off
  label: Power Off
  kind: action
  params:
    - name: mode
      type: integer
      description: Power mode 0004h=OFF

- id: save_current_settings
  label: Save Current Settings
  kind: action
  params: []
  notes: "CTL-0C; saves adjusted values to non-volatile storage"

- id: get_power_status
  label: Get Power Status
  kind: action
  params: []
  notes: "CTL-01D6; returns ON/Standby/OFF"

- id: get_timing_report
  label: Get Timing Report
  kind: action
  params: []
  notes: "CTL-07; returns H frequency (0.01kHz), V frequency (0.01Hz), sync status"

- id: get_serial_number
  label: Get Serial Number
  kind: action
  params: []
  notes: "CTL-C216; returns up to 30 ASCII chars"

- id: get_model_name
  label: Get Model Name
  kind: action
  params: []
  notes: "CTL-C217; returns up to 36 ASCII chars"

- id: get_mac_address
  label: Get MAC Address
  kind: action
  params: []
  notes: "CTL-C220; returns 12 hex chars"

- id: get_firmware_version
  label: Get Firmware Version
  kind: action
  params: []
  notes: "CTL-CA02; returns revision string e.g. R1.234ABC"

- id: set_input
  label: Set Input
  kind: action
  params:
    - name: input
      type: integer
      description: |
        Input selector:
        0001h=VGA(RGB), 0005h=Video1(AV), 0009h=Tuner(TV), 000Ch=VGA(YPbPr)
        0011h=HDMI1, 0012h=HDMI2, 0082h=HDMI3, 0087h=MP(Media Player)
  notes: "VCP-00-60; use save_current_settings after change"

- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      description: 0000h-0064h (dark to bright)
  notes: "VCP-00-10"

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: 0000h-0064h (low to high)
  notes: "VCP-00-12"

- id: send_remote_control_code
  label: Send Remote Control Data Code
  kind: action
  params:
    - name: key_code
      type: string
      description: Hex key code e.g. "1D"=PICTURE, "08"=1, "10"=9, "17"=VOL+, "16"=VOL-, "1F"=EXIT, "15"=UP, "14"=DOWN, "21"=LEFT, "22"=RIGHT, "23"=OK, "1B"=MUTE
    - name: repeat
      type: integer
      description: Repeat count (HL format)
  notes: "CTL-C210; sends IR remote code via RS-232C"

- id: get_temperature
  label: Get Temperature Sensor
  kind: action
  params:
    - name: sensor
      type: integer
      description: Sensor number (1-based); select sensor via VCP-02-78, read via VCP-02-79
  notes: "Temperature in Celsius, 2's complement readout (e.g. 0032h=+25°C)"

- id: set_input_name
  label: Set Input Name
  kind: action
  params:
    - name: terminal
      type: integer
      description: Terminal code (same as set_input)
    - name: name
      type: string
      description: Max 14 ASCII chars
  notes: "CTL-CA04-04"

- id: reset_input_name
  label: Reset Input Name
  kind: action
  params:
    - name: terminal
      type: integer
      description: 0000h=ALL, else specific terminal
  notes: "CTL-CA04-05"

- id: read_tv_channel
  label: Read TV Channel
  kind: action
  params: []
  notes: "CTL-C22C; returns Major(MH,ML) and Minor channel"

- id: write_tv_channel
  label: Write TV Channel
  kind: action
  params:
    - name: major_high
      type: integer
    - name: major_low
      type: integer
    - name: minor
      type: integer
  notes: "CTL-C22D"
- id: get_input_name
  label: Get Input Name
  kind: action
  params:
    - name: terminal
      type: integer
      description: 01h=VGA(RGB), 05h=AV, 09h=Tuner, 0Ch=VGA(YPbPr), 11h=HDMI1, 12h=HDMI2, 82h=HDMI3, 87h=MP
  notes: CTL-CA04-03; returns up to 14 ASCII char input name for designated terminal

- id: set_overscan
  label: Set Overscan
  kind: action
  params:
    - name: mode
      type: integer
      description: 0001h=Off, 0002h=On, 0003h=Auto
  notes: VCP-02-E3

- id: set_dimming_setting
  label: Set Dimming Setting
  kind: action
  params:
    - name: mode
      type: integer
      description: 0001h=OFF, 0002h=Dynamic Backlight, 0003h=Local Dimming
  notes: VCP-11-4E

- id: set_color_temperature_native
  label: Set Color Temperature Native/Custom
  kind: action
  params:
    - name: value
      type: integer
      description: 0002h=Native, 000Bh=Custom
  notes: VCP-00-14

- id: set_red_gain
  label: Set Red Gain
  kind: action
  params:
    - name: value
      type: integer
      description: 0000h-0064h (Dark to Bright)
  notes: VCP-00-16

- id: set_green_gain
  label: Set Green Gain
  kind: action
  params:
    - name: value
      type: integer
      description: 0000h-0064h (Dark to Bright)
  notes: VCP-00-18

- id: set_blue_gain
  label: Set Blue Gain
  kind: action
  params:
    - name: value
      type: integer
      description: 0000h-0064h (Dark to Bright)
  notes: VCP-00-1A

- id: set_noise_reduction
  label: Set Noise Reduction
  kind: action
  params:
    - name: level
      type: integer
      description: 0000h=OFF, 0001h=Low, 0002h=Mid, 0003h=High
  notes: VCP-02-20

- id: set_mpeg_noise_reduction
  label: Set MPEG Noise Reduction
  kind: action
  params:
    - name: level
      type: integer
      description: 0000h=OFF, 0001h=Low, 0002h=Mid, 0003h=High
  notes: VCP-02-26

- id: set_adaptive_contrast
  label: Set Adaptive Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: 0001h=Off, 0002h=Low, 0003h=Mid, 0004h=High
  notes: VCP-02-8D

- id: set_ambient_light_sensing
  label: Set Ambient Light Sensing
  kind: action
  params:
    - name: mode
      type: integer
      description: 0001h=Off, 0002h=On
  notes: VCP-10-C8

- id: set_color_enhance
  label: Set Color Enhance
  kind: action
  params:
    - name: mode
      type: integer
      description: 0001h=Off, 0002h=Vivid, 0003h=Wide
  notes: VCP-11-EC

- id: set_hdr_mode
  label: Set HDR Mode
  kind: action
  params:
    - name: level
      type: integer
      description: 0004h=Low, 0005h=Mid, 0006h=High
  notes: VCP-11-E5

- id: set_video_black_level
  label: Set Video Black Level
  kind: action
  params:
    - name: value
      type: integer
      description: 0000h-0064h (Dark to Bright)
  notes: VCP-00-92

- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: 0000h-0064h (Dull to Sharp)
  notes: VCP-00-87

- id: set_sharpness_fine
  label: Set Sharpness Fine
  kind: action
  params:
    - name: value
      type: integer
      description: 0000h-0064h (Dull to Sharp)
  notes: VCP-00-8C

- id: set_color_saturation
  label: Set Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: 0000h-0064h (Pale to Deep)
  notes: VCP-00-8A

- id: set_color_saturation_alt
  label: Set Color Saturation Alt
  kind: action
  params:
    - name: value
      type: integer
      description: 0000h-0064h (Pale to Deep)
  notes: VCP-02-1F

- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      description: 0000h-0064h (To Purplish to To Greenish)
  notes: VCP-00-90

- id: reset_settings
  label: Reset Settings
  kind: action
  params:
    - name: target
      type: integer
      description: 0001h=All, 0002h=Picture, 0003h=Adjust, 0004h=Audio, 0010h=Network
  notes: VCP-02-CB

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0001h=Standard, 0002h=Movie, 0003h=Music, 0005h=Custom
  notes: VCP-10-B2

- id: set_audio_balance
  label: Set Audio Balance
  kind: action
  params:
    - name: value
      type: integer
      description: 0000h-0064h (To Left to To Right)
  notes: VCP-00-93

- id: set_audio_surround
  label: Set Audio Surround
  kind: action
  params:
    - name: mode
      type: integer
      description: 0001h=Off, 0002h=On
  notes: VCP-02-34

- id: set_internal_speakers
  label: Set Internal Speakers
  kind: action
  params:
    - name: mode
      type: integer
      description: 0000h=No mean, 0001h=Off, 0002h=On, 0003h=Auto
  notes: VCP-11-BA

- id: set_audio_input
  label: Set Audio Input
  kind: action
  params:
    - name: input
      type: integer
      description: 0001h=Audio1, 0002h=Audio2(AV), 0004h=HDMI1, 0006h=TV, 000Ah=HDMI2, 000Bh=HDMI3, 000Dh=MP
  notes: VCP-02-2E

- id: set_audio_delay
  label: Set Audio Delay
  kind: action
  params:
    - name: value
      type: integer
      description: 0000h-0064h (Small to Large)
  notes: VCP-10-CB

- id: set_audio_source_mts
  label: Set Audio Source MTS
  kind: action
  params:
    - name: mode
      type: integer
      description: 0000h=No mean, 0001h=main, 0002h=sub, 0003h=main+sub, 0004h=stereo, 0005h=mono, 0006h=dual, 0007h=SAP
  notes: VCP-02-2C

- id: set_audio_language
  label: Set Audio Language
  kind: action
  params:
    - name: language
      type: integer
      description: 0002h=English, 0003h=Francais, 000Ah=Espanol
  notes: VCP-10-B3

- id: reset_audio_settings
  label: Reset Audio Settings
  kind: action
  params:
    - name: mode
      type: integer
      description: 0001h=Reset
  notes: VCP-02-31

- id: set_osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: language
      type: integer
      description: 0001h=English, 0002h=Deutsch, 0003h=Francais, 0004h=Espanol
  notes: VCP-00-68

- id: set_osd_transparency
  label: Set OSD Transparency
  kind: action
  params:
    - name: level
      type: integer
      description: 0001h=Off, 0002h=30%, 0003h=50%, 0004h=70%
  notes: VCP-02-B8

- id: set_information_osd
  label: Set Information OSD
  kind: action
  params:
    - name: mode
      type: integer
      description: 0000h=Off, 0005h=On
  notes: VCP-02-3D

- id: set_closed_caption
  label: Set Closed Caption
  kind: action
  params:
    - name: mode
      type: integer
      description: 0000h=No mean, 0001h=Off, 0002h=CC1, 0003h=CC2, 0004h=CC3, 0005h=CC4, 0006h=Text1, 0007h=Text2, 0008h=Text3, 0009h=Text4
  notes: VCP-10-84

- id: set_digital_captions
  label: Set Digital Captions
  kind: action
  params:
    - name: service
      type: integer
      description: 0000h=No mean, 0001h=Off, 0002h=CS1, 0003h=CS2, 0004h=CS3, 0005h=CS4, 0006h=CS5, 0007h=CS6
  notes: VCP-10-A1

- id: set_quick_start
  label: Set Quick Start
  kind: action
  params:
    - name: mode
      type: integer
      description: 0001h=Off, 0002h=On
  notes: VCP-11-EA

- id: set_auto_input_change
  label: Set Auto Input Change
  kind: action
  params:
    - name: mode
      type: integer
      description: 0000h=First, 0002h=None, 0004h=Custom
  notes: VCP-02-40

- id: set_auto_input_priority_1
  label: Set Auto Input Priority 1
  kind: action
  params:
    - name: input
      type: integer
      description: 0001h=VGA, 0005h=Video1(AV), 000Ch=VGA(YPbPr), 0011h=HDMI1, 0012h=HDMI2, 0082h=HDMI3
  notes: VCP-10-2E

- id: set_auto_input_priority_2
  label: Set Auto Input Priority 2
  kind: action
  params:
    - name: input
      type: integer
      description: 0001h=VGA, 0005h=Video1(AV), 000Ch=VGA(YPbPr), 0011h=HDMI1, 0012h=HDMI2, 0082h=HDMI3
  notes: VCP-10-2F

- id: set_auto_input_priority_3
  label: Set Auto Input Priority 3
  kind: action
  params:
    - name: input
      type: integer
      description: 0001h=VGA, 0005h=Video1(AV), 000Ch=VGA(YPbPr), 0011h=HDMI1, 0012h=HDMI2, 0082h=HDMI3
  notes: VCP-10-30

- id: set_cec
  label: Set HDMI CEC
  kind: action
  params:
    - name: mode
      type: integer
      description: 0001h=Off, 0002h=On
  notes: VCP-11-76

- id: set_cec_auto_turn_off
  label: Set CEC Auto Turn Off
  kind: action
  params:
    - name: mode
      type: integer
      description: 0001h=Disable, 0002h=Enable
  notes: VCP-11-77

- id: set_cec_audio_receiver
  label: Set CEC Audio Receiver
  kind: action
  params:
    - name: mode
      type: integer
      description: 0001h=Disable, 0002h=Enable
  notes: VCP-11-78

- id: set_cec_device_list
  label: Set CEC Device List
  kind: action
  params:
    - name: mode
      type: integer
      description: 0001h=NO, 0002h=YES
  notes: VCP-11-79

- id: set_edid
  label: Set EDID Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0001h=Mode 0, 0002h=Mode 1, 0003h=Mode 2
  notes: VCP-10-AA

- id: set_video_range
  label: Set Video Range
  kind: action
  params:
    - name: mode
      type: integer
      description: 0001h=Expanded Signal, 0002h=Raw Signal, 0003h=Auto
  notes: VCP-10-40

- id: set_vga_mode
  label: Set VGA Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0001h=RGB, 0002h=YPbPr
  notes: VCP-10-8E

- id: execute_auto_adjust
  label: Execute Auto Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: 0001h=Execute
  notes: VCP-00-1E

- id: set_h_position
  label: Set Horizontal Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0000h-0064h (Left Side to Right Side)
  notes: VCP-00-20

- id: set_v_position
  label: Set Vertical Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0000h-0064h (Bottom Side to Top Side)
  notes: VCP-00-30

- id: set_clock
  label: Set Clock
  kind: action
  params:
    - name: value
      type: integer
      description: 0000h-0064h
  notes: VCP-00-0E

- id: set_phase
  label: Set Phase
  kind: action
  params:
    - name: value
      type: integer
      description: 0000h-0064h
  notes: VCP-00-3E

- id: set_h_resolution
  label: Set Horizontal Resolution
  kind: action
  params:
    - name: value
      type: integer
      description: 0000h-FFFFh (Low to High)
  notes: VCP-02-50

- id: set_v_resolution
  label: Set Vertical Resolution
  kind: action
  params:
    - name: value
      type: integer
      description: 0000h-FFFFh (Low to High)
  notes: VCP-02-51

- id: set_key_lock
  label: Set Key Lock
  kind: action
  params:
    - name: mode
      type: integer
      description: 0000h=Off, 0001h=Mode2, 0002h=Mode1
  notes: VCP-00-FB

- id: set_ir_lock
  label: Set IR Lock
  kind: action
  params:
    - name: mode
      type: integer
      description: 0001h=Off, 0004h=Mode2, 0005h=Mode1
  notes: VCP-02-3F

- id: set_power_supply
  label: Set Power Supply
  kind: action
  params:
    - name: mode
      type: integer
      description: 0001h=ON, 0003h=OFF
  notes: VCP-11-75

- id: set_led_indicator
  label: Set LED Indicator
  kind: action
  params:
    - name: mode
      type: integer
      description: 0001h=ON, 0002h=OFF
  notes: VCP-02-BE

- id: set_mute_settings
  label: Set Mute Settings
  kind: action
  params:
    - name: target
      type: integer
      description: 0001h=Audio, 0002h=Video, 0003h=Audio and Video
  notes: VCP-11-E9

- id: set_thermal_warning
  label: Set Thermal Warning Message
  kind: action
  params:
    - name: mode
      type: integer
      description: 0000h=No mean, 0001h=Off, 0002h=On
  notes: VCP-11-ED

- id: set_thermal_shutdown
  label: Set Thermal Shutdown
  kind: action
  params:
    - name: mode
      type: integer
      description: 0001h=Off, 0002h=On
  notes: VCP-10-8A

- id: set_control_interface
  label: Set Control Interface
  kind: action
  params:
    - name: interface
      type: integer
      description: 0001h=RS-232C, 0002h=LAN
  notes: VCP-10-3E

- id: set_monitor_id
  label: Set Monitor ID
  kind: action
  params:
    - name: id
      type: integer
      description: 0001h-0064h
  notes: VCP-02-3E
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values:
    - "0001"  # ON
    - "0002"  # Stand-by (power save)
    - "0003"  # Reserved
    - "0004"  # OFF (same as IR power off)
  notes: "Reply to CTL-01D6 / CTL-C203-D6"

- id: command_result
  type: enum
  values:
    - "00"  # No Error
    - "01"  # Unsupported operation or under current condition
  notes: "Present in all replies"

- id: input_selected
  type: integer
  values_description: |
    0001h=VGA(RGB), 0005h=Video1(AV), 0009h=Tuner1(TV), 000Ch=DVD/HD1(VGA-YPbPr)
    0011h=HDMI1, 0012h=HDMI2, 0082h=HDMI3, 0087h=MP(Media Player)

- id: backlight_level
  type: integer
  range: [0, 100]
  notes: "VCP-00-10 max=0064h=100"

- id: contrast_level
  type: integer
  range: [0, 100]
  notes: "VCP-00-12"

- id: temperature_value
  type: integer
  notes: "VCP-02-79; 2's complement, e.g. 0032h=+25°C, FFFEh=-2°C"

- id: timing_report
  type: object
  fields:
    - name: status
      type: object
      description: |
        Bit 7=1: Sync out of range/no signal
        Bit 6=1: Unstable count
        Bit 1: 1=Positive H sync, 0=Negative H sync
        Bit 0: 1=Positive V sync, 0=Negative V sync
    - name: h_freq
      type: integer
      description: Horizontal frequency in 0.01kHz
    - name: v_freq
      type: integer
      description: Vertical frequency in 0.01Hz
  notes: "Reply to CTL-07"
```

## Variables
```yaml
# VCP get/set parameters - settable via VCP-00-xx and VCP-02-xx
- id: backlight
  type: integer
  range: [0, 100]
  vcp_code: "00-10"

- id: contrast
  type: integer
  range: [0, 100]
  vcp_code: "00-12"

- id: brightness
  type: integer
  range: [0, 100]
  vcp_code: "00-10"

- id: color_temperature
  type: enum
  values: ["0023h=Warm", "003Fh=Normal", "005Ah=Cool", "0002h=Native"]
  vcp_code: "00-0C"

- id: gamma
  type: enum
  values: ["0001h=Native", "0004h=2.2", "0008h=2.4", "0010h=HDR-Hybrid Log", "0011h=HDR-ST2084(PQ)"]
  vcp_code: "02-68"

- id: aspect_ratio
  type: enum
  values: ["0001h=NORMAL", "0002h=FULL", "0004h=ZOOM", "0007h=1:1"]
  vcp_code: "02-70"

- id: picture_mode
  type: enum
  values: ["0003h=HighBright", "0004h=Standard", "0008h=Custom", "0017h=Dynamic", "0018h=Energy Savings", "001Bh=HDR Video", "001Dh=Conferencing"]
  vcp_code: "02-1A"
```

## Events
```yaml
# UNRESOLVED: monitor does not send unsolicited events; all communication is request-reply
# NULL message (CTL-BE) returned in these cases:
#   - timeout (default 10sec)
#   - unsupported message type
#   - BCC error
#   - monitor has no answer (not ready)
#   - another message received during execution of: Power ON/OFF, Auto Setup, Input, PIP Input, Auto Setup, Factory reset
```

## Macros
```yaml
# From section 6.1: backlight change sequence
- id: set_backlight_with_save
  label: Set Backlight and Save
  steps:
    - get_parameter VCP-00-10  # read current backlight + max
    - set_parameter VCP-00-10 <value>
    - save_current_settings CTL-0C
  notes: "Repeat get after set to verify; required save to persist"

# From section 6.2: temperature read sequence
- id: read_temperature
  label: Read Temperature Sensor
  steps:
    - set_parameter VCP-02-78 <sensor_num>  # select sensor
    - get_parameter VCP-02-79  # read temperature value
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
# Note: monitor returns NULL message during power-on sequencing; allow 600ms packet interval
```

## Notes
- Packet interval: >600ms between commands (both RS-232C and LAN)
- LAN disconnect after 15min inactivity; controller must reconnect
- Default IP: DHCP=on
- Communication code: ASCII throughout
- Check code (BCC): XOR from byte 2 (after SOH) through ETX; delimiter=CR(0Dh)
- Monitor echoes Monitor ID in reply Source field
- VCP commands use 2-byte op code page + 2-byte op code; encoded as ASCII hex pairs
- 15min LAN timeout means long-running applications must ping periodically

<!-- UNRESOLVED: complete VCP code table not in source (chapter 8 referenced but not included) -->
<!-- UNRESOLVED: power-on sequencing time requirements not stated -->
<!-- UNRESOLVED: TV tuner commands (*) only for US model - applicability not verified -->

## Provenance

```yaml
source_domains:
  - sharp-displays.jp.sharp
  - business.sharpusa.com
  - my.sharp-asia.com
  - docs.aws.sharp.eu
  - sharp.ca
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
  - https://business.sharpusa.com/portals/0/downloads/manuals/pn-lc862-lc752-lc652_s-format_command_manual.pdf
  - https://my.sharp-asia.com/wp-content/uploads/2024/01/PN-LC862_LC752_LC652_External_Control_S-Format_ver1-1.pdf
  - https://docs.aws.sharp.eu/Marketing/Operational_manuals/PN-LC862_LC752_LC652_External_Control_N-Format_ver1-0.pdf
  - https://sharp.ca/uploads/product_downloads/PNY326_436_469_556_OM.pdf
retrieved_at: 2026-05-13T20:48:25.500Z
last_checked_at: 2026-06-10T01:19:25.719Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T01:19:25.719Z
matched_actions: 80
action_count: 80
confidence: medium
summary: "All 80 spec Actions map 1-to-1 to documented CTL/VCP codes in the source; 4 VCP codes (02-1A, 02-70, 00-0C, 02-68) appear in spec Variables rather than Actions and are represented in the spec; transport values match verbatim; shapes and parameter ranges agree throughout. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact PN-Yxxx model variants not enumerated in source"
- "monitor does not send unsolicited events; all communication is request-reply"
- "no safety warnings or interlock procedures stated in source"
- "complete VCP code table not in source (chapter 8 referenced but not included)"
- "power-on sequencing time requirements not stated"
- "TV tuner commands (*) only for US model - applicability not verified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
