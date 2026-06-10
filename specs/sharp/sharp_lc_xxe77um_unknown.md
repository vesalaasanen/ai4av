---
spec_id: admin/sharp-lc-xxe77um
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp LC-xxE77UM Control Spec"
manufacturer: Sharp
model_family: LC-60E77UM
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - LC-60E77UM
    - LC-52E77U
    - LC-46E77UM
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharp-displays.jp.sharp
  - files.sharpusa.com
  - manualsdir.com
  - docs.aws.sharp.eu
  - assets.sharpnecdisplays.us
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
  - https://files.sharpusa.com/Downloads/ForHome/HomeEntertainment/LCDTVs/Manuals/tel_man_LC40E67UN_LC40E77UN.pdf
  - "https://www.manualsdir.com/manuals/150757/sharp-aquos-lc-40e77un-lc-40e67un.html?page=42"
  - https://docs.aws.sharp.eu/Marketing/Operational_manuals/PN-LC862_LC752_LC652_External_Control_N-Format_ver1-0.pdf
  - https://assets.sharpnecdisplays.us/documents/usermanuals/uhd-external_control.pdf
retrieved_at: 2026-05-13T20:19:16.791Z
last_checked_at: 2026-06-10T00:44:56.677Z
generated_at: 2026-06-10T00:44:56.677Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model variants (LC-60E77UM vs LC-52E77U) share the same protocol; family-wide applicability confirmed by shared doc title. UNRESOLVED: TV tuner commands (*1 models) not verified for all variants."
  - "flow control not stated in source"
  - "monitor does not send unsolicited events. NULL message (CTL-C2xx BE) is returned on timeout/error only."
  - "no explicit multi-step macros in source. Typical procedure (Section 6) demonstrates:"
  - "no explicit safety interlocks for power sequencing, voltage, or current stated in source."
  - "IP address assignment method (DHCP vs static) not documented beyond \"DHCP:On\". UNRESOLVED: flow control (RTS/CTS or XON/XOFF) not stated. UNRESOLVED: TV tuner models (*1) channel commands not verified for all E77UM variants. UNRESOLVED: video input resolution via VCP-02-50/51 readout values not fully specified."
verification:
  verdict: verified
  checked_at: 2026-06-10T00:44:56.677Z
  matched_actions: 81
  action_count: 81
  confidence: medium
  summary: "All 81 spec actions match documented CTL/VCP wire tokens verbatim; transport baud 9600 and TCP port 7142 confirmed; source S=84 at spec granularity yields 81/84=0.96 coverage ratio above 0.9 threshold, remaining 3 source commands (CTL-CA04-03, VCP-10-3E, VCP-02-3E) represented in spec Variables section. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-13
---

# Sharp LC-xxE77UM Control Spec

## Summary
Sharp Aquos LCD monitor supporting dual-control interfaces: RS-232C (9-pin D-Sub, 9600bps ASCII) and LAN (TCP port 7142). Protocol stack uses VCP (Variable Content Protocol) for standard parameters and CTL (Control) commands for special operations. Command packet structure: SOH header + STX message block + BCC check code + CR delimiter. Minimum packet interval: 600ms.

<!-- UNRESOLVED: exact model variants (LC-60E77UM vs LC-52E77U) share the same protocol; family-wide applicability confirmed by shared doc title. UNRESOLVED: TV tuner commands (*1 models) not verified for all variants. -->

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
  flow_control: null  # UNRESOLVED: flow control not stated in source
addressing:
  port: 7142  # LAN TCP port (fixed)
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
- id: power_control
  label: Power Control
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # ON
        - "0002"  # Do not set
        - "0003"  # Do not set
        - "0004"  # OFF (same as IR power off)
  note: "CTL-C203-D6. Requires packet interval >600ms."

- id: save_current_settings
  label: Save Current Settings
  kind: action
  params: []
  note: "CTL-0C. Stores adjusted values to non-volatile memory."

- id: get_timing_report
  label: Get Timing Report
  kind: action
  params: []
  note: "CTL-07. Returns H/V frequency and sync status."

- id: get_power_status
  label: Get Power Status
  kind: action
  params: []
  note: "CTL-01D6. Returns: 0001=ON, 0002=Stand-by, 0003=Reserved, 0004=OFF."
  response:
    - id: power_mode
      type: enum
      values:
        - "0001"  # ON
        - "0002"  # Stand-by (power save)
        - "0003"  # Reserved
        - "0004"  # OFF

- id: get_serial_number
  label: Get Serial Number
  kind: action
  params: []
  note: "CTL-C216. Max 30 ASCII characters."

- id: get_model_name
  label: Get Model Name
  kind: action
  params: []
  note: "CTL-C217. Max 36 ASCII characters."

- id: get_mac_address
  label: Get MAC Address
  kind: action
  params: []
  note: "CTL-C220. D05-D06 fixed '00'. Max 12 hex digits."

- id: send_remote_code
  label: Send Remote Control Data Code
  kind: action
  params:
    - name: remote_code
      type: string
      description: "2-byte hex remote control code. Examples: 1D=PICTURE, 29=ASPECT, 08-10=1-9, 12=0, 17=VOL+, 16=VOL-, 33=CH+, 32=CH-, 1B=MUTE, 1F=EXIT, 15=UP, 14=DOWN, 21=LEFT, 22=RIGHT, 23=OK, 20=MENU"
    - name: repeat_times
      type: string
      description: "HL format 2-byte hex repeat count"
  note: "CTL-C210. Sends IR remote code via RS-232C."

- id: get_firmware_version
  label: Get Firmware Version
  kind: action
  params:
    - name: firmware_type
      type: enum
      values:
        - "00"  # F/W Revision
  note: "CTL-CA02. Returns ASCII version string (e.g. R1.002.003AB)."

- id: set_input_name
  label: Set Input Name of Designated Terminal
  kind: action
  params:
    - name: terminal
      type: enum
      values:
        - "00"  # No mean
        - "01"  # VGA(RGB)
        - "05"  # AV
        - "09"  # Tuner(*1)
        - "0C"  # VGA(YPbPr)
        - "11"  # HDMI1
        - "12"  # HDMI2
        - "82"  # HDMI3
        - "87"  # MP(Media player)
    - name: name
      type: string
      description: "Max 14 ASCII characters"
  note: "CTL-CA04-04. (*1) Tuner models for US only."

- id: reset_input_name
  label: Reset Input Name of Designated Terminal
  kind: action
  params:
    - name: terminal
      type: enum
      values:
        - "00"  # ALL Terminal
        - "01"  # VGA(RGB)
        - "05"  # AV
        - "09"  # Tuner(*1)
        - "0C"  # VGA(YPbPr)
        - "11"  # HDMI1
        - "12"  # HDMI2
        - "82"  # HDMI3
        - "87"  # MP(Media player)
  note: "CTL-CA04-05. (*1) Tuner models for US only."

- id: select_input
  label: Select Input
  kind: action
  params:
    - name: input
      type: enum
      values:
        - "0000"  # No mean
        - "0001"  # VGA(RGB)
        - "0005"  # Video1(AV)
        - "0009"  # Tuner1(TV) (*1)
        - "000C"  # DVD/HD1 (VGA(YPbPr))
        - "0011"  # HDMI1
        - "0012"  # HDMI2
        - "0082"  # HDMI3
        - "0087"  # MP(Media Player)
  note: "VCP-00-60. (*1) TV tuner model for US only."

- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 (0000H-0064H)"
  note: "VCP-00-10. Max value confirmed as 100 (0064H) from Get reply."

- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 (0000H-0064H)"
  note: "VCP-00-10."

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 (0000H-0064H)"
  note: "VCP-00-12."

- id: get_temperature
  label: Get Temperature Sensor
  kind: action
  params:
    - name: sensor
      type: integer
      description: "Sensor number (1-based)"
  note: "VCP-02-78 (select sensor), VCP-02-79 (read value). 2's complement readout. Max 3 sensors."

- id: factory_reset
  label: Factory Reset
  kind: action
  params:
    - name: scope
      type: enum
      values:
        - "0001"  # All (=Factory Reset)
        - "0002"  # Picture
        - "0003"  # Adjust
        - "0004"  # Audio
        - "0010"  # Network
  note: "VCP-02-CB."
- id: get_direct_tv_channel
  label: Direct TV Channel Read
  kind: action
  params: []
  note: "CTL-C22C. Tuner models only. Returns Major Channel High/Low and Minor Channel."
- id: set_direct_tv_channel
  label: Direct TV Channel Write
  kind: action
  params:
    - name: major_channel_high
      type: string
      description: "4-char hex HL-format Major Channel High"
    - name: major_channel_low
      type: string
      description: "4-char hex HL-format Major Channel Low"
    - name: minor_channel
      type: string
      description: "4-char hex HL-format Minor Channel"
  note: "CTL-C22D. Tuner models only."
- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0003"  # HighBright
        - "0004"  # Standard
        - "0008"  # Custom
        - "0017"  # Dynamic
        - "0018"  # Energy Savings
        - "001B"  # HDR Video
        - "001D"  # Conferencing
  note: "VCP-02-1A."
- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # NORMAL
        - "0002"  # FULL
        - "0004"  # ZOOM
        - "0007"  # 1:1
  note: "VCP-02-70."
- id: set_overscan
  label: Set Overscan
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # Off
        - "0002"  # On
        - "0003"  # Auto
  note: "VCP-02-E3."
- id: set_dimming
  label: Set Dimming Setting
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # OFF
        - "0002"  # Dynamic Backlight
        - "0003"  # Local Dimming
  note: "VCP-11-4E."
- id: set_color_temperature_preset
  label: Set Color Temperature Preset
  kind: action
  params:
    - name: preset
      type: enum
      values:
        - "0023"  # Warm
        - "003F"  # Normal
        - "005A"  # Cool
  note: "VCP-00-0C."
- id: set_color_temperature_type
  label: Set Color Temperature Type
  kind: action
  params:
    - name: type
      type: enum
      values:
        - "0002"  # Native
        - "000B"  # Custom
  note: "VCP-00-14."
- id: set_red_level
  label: Set Red Level
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 (0000H-0064H)"
  note: "VCP-00-16."
- id: set_green_level
  label: Set Green Level
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 (0000H-0064H)"
  note: "VCP-00-18."
- id: set_blue_level
  label: Set Blue Level
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 (0000H-0064H)"
  note: "VCP-00-1A."
- id: set_noise_reduction
  label: Set Noise Reduction
  kind: action
  params:
    - name: level
      type: enum
      values:
        - "0000"  # OFF
        - "0001"  # Low
        - "0002"  # Mid
        - "0003"  # High
  note: "VCP-02-20."
- id: set_noise_reduction_2
  label: Set Noise Reduction 2
  kind: action
  params:
    - name: level
      type: enum
      values:
        - "0000"  # OFF
        - "0001"  # Low
        - "0002"  # Mid
        - "0003"  # High
  note: "VCP-02-26."
- id: set_adaptive_contrast
  label: Set Adaptive Contrast
  kind: action
  params:
    - name: level
      type: enum
      values:
        - "0001"  # Off
        - "0002"  # Low
        - "0003"  # Mid
        - "0004"  # High
  note: "VCP-02-8D."
- id: set_gamma
  label: Set Gamma
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # Native
        - "0004"  # 2.2
        - "0008"  # 2.4
        - "0010"  # HDR-Hybrid Log
        - "0011"  # HDR-ST2084(PQ)
  note: "VCP-02-68."
- id: set_ambient_light_sensing
  label: Set Ambient Light Sensing
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # Off
        - "0002"  # On
  note: "VCP-10-C8."
- id: set_color_enhance
  label: Set Color Enhance
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # Off
        - "0002"  # Vivid
        - "0003"  # Wide
  note: "VCP-11-EC."
- id: set_hdr_mode
  label: Set HDR Mode
  kind: action
  params:
    - name: level
      type: enum
      values:
        - "0004"  # Low
        - "0005"  # Mid
        - "0006"  # High
  note: "VCP-11-E5."
- id: set_video_black_level
  label: Set Video Black Level
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 (0000H-0064H)"
  note: "VCP-00-92."
- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 (0000H-0064H)"
  note: "VCP-00-87."
- id: set_sharpness_2
  label: Set Sharpness 2
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 (0000H-0064H)"
  note: "VCP-00-8C."
- id: set_color
  label: Set Color
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 (0000H-0064H)"
  note: "VCP-00-8A."
- id: set_color_2
  label: Set Color 2
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 (0000H-0064H)"
  note: "VCP-02-1F."
- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 (0000H-0064H)"
  note: "VCP-00-90."
- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # Standard
        - "0002"  # Movie
        - "0003"  # Music
        - "0005"  # Custom
  note: "VCP-10-B2."
- id: set_balance
  label: Set Balance
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 (0000H-0064H)"
  note: "VCP-00-93."
- id: set_surround
  label: Set Surround
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # Off
        - "0002"  # On
  note: "VCP-02-34."
- id: set_internal_speakers
  label: Set Internal Speakers
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0000"  # No mean
        - "0001"  # Off
        - "0002"  # On
        - "0003"  # Auto
  note: "VCP-11-BA."
- id: set_audio_input
  label: Set Audio Input
  kind: action
  params:
    - name: input
      type: enum
      values:
        - "0001"  # Audio1 (Audio In)
        - "0002"  # Audio2 (AV)
        - "0004"  # HDMI1
        - "0006"  # TV (*1)
        - "000A"  # HDMI2
        - "000B"  # HDMI3
        - "000D"  # MP
  note: "VCP-02-2E."
- id: set_audio_delay
  label: Set Audio Delay
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 (0000H-0064H)"
  note: "VCP-10-CB."
- id: set_audio_source_mts
  label: Set Audio Source MTS
  kind: action
  params:
    - name: source
      type: enum
      values:
        - "0000"  # No mean
        - "0001"  # main
        - "0002"  # sub
        - "0003"  # main+sub
        - "0004"  # stereo
        - "0005"  # mono
        - "0006"  # dual
        - "0007"  # SAP
  note: "VCP-02-2C. (*1) TV tuner model for US only."
- id: set_audio_language
  label: Set Audio Language
  kind: action
  params:
    - name: language
      type: enum
      values:
        - "0002"  # English
        - "0003"  # Français
        - "000A"  # Español
  note: "VCP-10-B3. (*1) TV tuner model for US only."
- id: reset_audio
  label: Reset Audio Settings
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # Reset
  note: "VCP-02-31."
- id: set_osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: language
      type: enum
      values:
        - "0001"  # English
        - "0002"  # Deutsch
        - "0003"  # Français
        - "0004"  # Español
  note: "VCP-00-68."
- id: set_osd_transparency
  label: Set OSD Transparency
  kind: action
  params:
    - name: level
      type: enum
      values:
        - "0001"  # Off
        - "0002"  # 30%
        - "0003"  # 50%
        - "0004"  # 70%
  note: "VCP-02-B8."
- id: set_information_osd
  label: Set Information OSD
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0000"  # Off
        - "0005"  # On
  note: "VCP-02-3D."
- id: set_caption_display
  label: Set Caption Display
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0000"  # No mean
        - "0001"  # Off
        - "0002"  # CC1
        - "0003"  # CC2
        - "0004"  # CC3
        - "0005"  # CC4
        - "0006"  # Text1
        - "0007"  # Text2
        - "0008"  # Text3
        - "0009"  # Text4
  note: "VCP-10-84. (*1) TV tuner model for US only."
- id: set_digital_captions
  label: Set Digital Captions
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0000"  # No mean
        - "0001"  # Off
        - "0002"  # CS1
        - "0003"  # CS2
        - "0004"  # CS3
        - "0005"  # CS4
        - "0006"  # CS5
        - "0007"  # CS6
  note: "VCP-10-A1. (*1) TV tuner model for US only."
- id: set_quick_start
  label: Set Quick Start
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # Off
        - "0002"  # On
  note: "VCP-11-EA."
- id: set_auto_input_change
  label: Set Auto Input Change
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0000"  # First
        - "0002"  # None
        - "0004"  # Custom
  note: "VCP-02-40."
- id: set_auto_input_change_priority_1
  label: Set Auto Input Change Priority 1
  kind: action
  params:
    - name: input
      type: enum
      values:
        - "0001"  # VGA
        - "0005"  # Video1(AV)
        - "000C"  # DVD/HD1(VGA(YPbPr))
        - "0011"  # HDMI1
        - "0012"  # HDMI2
        - "0082"  # HDMI3
  note: "VCP-10-2E."
- id: set_auto_input_change_priority_2
  label: Set Auto Input Change Priority 2
  kind: action
  params:
    - name: input
      type: enum
      values:
        - "0001"  # VGA
        - "0005"  # Video1(AV)
        - "000C"  # DVD/HD1(VGA(YPbPr))
        - "0011"  # HDMI1
        - "0012"  # HDMI2
        - "0082"  # HDMI3
  note: "VCP-10-2F."
- id: set_auto_input_change_priority_3
  label: Set Auto Input Change Priority 3
  kind: action
  params:
    - name: input
      type: enum
      values:
        - "0001"  # VGA
        - "0005"  # Video1(AV)
        - "000C"  # DVD/HD1(VGA(YPbPr))
        - "0011"  # HDMI1
        - "0012"  # HDMI2
        - "0082"  # HDMI3
  note: "VCP-10-30."
- id: set_cec
  label: Set CEC
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # Off
        - "0002"  # On
  note: "VCP-11-76."
- id: set_cec_auto_turn_off
  label: Set CEC Auto Turn Off
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # Disable
        - "0002"  # Enable
  note: "VCP-11-77."
- id: set_cec_audio_receiver
  label: Set CEC Audio Receiver
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # Disable
        - "0002"  # Enable
  note: "VCP-11-78."
- id: set_cec_device_list
  label: Set CEC Device List
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # NO
        - "0002"  # YES
  note: "VCP-11-79."
- id: set_edid
  label: Set EDID
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # Mode 0
        - "0002"  # Mode 1
        - "0003"  # Mode 2
  note: "VCP-10-AA."
- id: set_video_range
  label: Set Video Range
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # Expanded Signal
        - "0002"  # Raw Signal
        - "0003"  # Auto
  note: "VCP-10-40."
- id: set_vga_mode
  label: Set VGA Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # RGB
        - "0002"  # YPbPr
  note: "VCP-10-8E."
- id: auto_adjust
  label: Auto Adjust
  kind: action
  params:
    - name: execute
      type: enum
      values:
        - "0001"  # Execute
  note: "VCP-00-1E."
- id: set_h_position
  label: Set H.Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 (0000H-0064H)"
  note: "VCP-00-20."
- id: set_v_position
  label: Set V.Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 (0000H-0064H)"
  note: "VCP-00-30."
- id: set_clock
  label: Set Clock
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 (0000H-0064H)"
  note: "VCP-00-0E."
- id: set_phase
  label: Set Phase
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100 (0000H-0064H)"
  note: "VCP-00-3E."
- id: get_h_resolution
  label: Get H.Resolution
  kind: action
  params: []
  note: "VCP-02-50. Read-only. Returns 0000H-FFFFH."
- id: get_v_resolution
  label: Get V.Resolution
  kind: action
  params: []
  note: "VCP-02-51. Read-only. Returns 0000H-FFFFH."
- id: set_key_lock
  label: Set Key Lock Settings
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0000"  # Off
        - "0001"  # Mode2
        - "0002"  # Mode1
  note: "VCP-00-FB."
- id: set_ir_lock
  label: Set IR Lock Settings
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # Off
        - "0004"  # Mode2
        - "0005"  # Mode1
  note: "VCP-02-3F."
- id: set_power_supply
  label: Set Power Supply
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # ON
        - "0003"  # OFF
  note: "VCP-11-75."
- id: set_led_indicator
  label: Set LED Indicator
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # ON
        - "0002"  # OFF
  note: "VCP-02-BE."
- id: set_mute_settings
  label: Set Mute Settings
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # Audio
        - "0002"  # Video
        - "0003"  # Audio & Video
  note: "VCP-11-E9."
- id: set_thermal_warning
  label: Set Thermal Warning Message
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0000"  # No mean
        - "0001"  # Off
        - "0002"  # On
  note: "VCP-11-ED."
- id: set_thermal_shutdown
  label: Set Thermal Management Shutdown
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # Off
        - "0002"  # On
  note: "VCP-10-8A."
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status
  type: enum
  values:
    - "0001"  # ON
    - "0002"  # Stand-by (power save)
    - "0003"  # Reserved
    - "0004"  # OFF

- id: backlight_current
  label: Backlight Current Value
  type: integer
  note: "Returns 0-100 via VCP-00-10 reply. Max is 100."

- id: temperature_readout
  label: Temperature Readout
  type: integer
  note: "2's complement. 0032H = +25°C, FFFFH = -0.5°C, FFCEH = -25°C, FF92H = -55°C."

- id: result_code
  label: Command Result Code
  type: enum
  values:
    - "00"  # No Error
    - "01"  # Unsupported operation or under current condition
```

## Variables
```yaml
# VCP read/write parameters (select input first via VCP-02-78, then read via VCP-02-79 for temperature)
- id: temperature_sensor_select
  label: Temperature Sensor Select
  kind: variable
  params:
    - name: sensor
      type: integer
      description: "Sensor number 1-3"
  note: "VCP-02-78. Max 3 sensors."

- id: input_name_read
  label: Input Name of Designated Terminal Read
  kind: variable
  params:
    - name: terminal
      type: enum
      values:
        - "00"  # No mean
        - "01"  # VGA(RGB)
        - "05"  # AV
        - "09"  # Tuner(*1)
        - "0C"  # VGA(YPbPr)
        - "11"  # HDMI1
        - "12"  # HDMI2
        - "82"  # HDMI3
        - "87"  # MP(Media player)
  note: "CTL-CA04-03. Max 14-char string. (*1) TV tuner models for US only."

- id: control_interface
  label: Control Interface Selection
  kind: variable
  params:
    - name: mode
      type: enum
      values:
        - "0001"  # RS-232C
        - "0002"  # LAN
  note: "VCP-10-3E."

- id: monitor_id
  label: Monitor ID
  kind: variable
  params:
    - name: id
      type: integer
      description: "1-100 (0001H-0064H)"
  note: "VCP-02-3E."
```

## Events
```yaml
# UNRESOLVED: monitor does not send unsolicited events. NULL message (CTL-C2xx BE) is returned on timeout/error only.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros in source. Typical procedure (Section 6) demonstrates:
#   1. Get current value (VCP Get)
#   2. Set new value (VCP Set)
#   3. Confirm (VCP Set reply)
#   4. Save (CTL-0C Save Current Settings)
# This 4-step pattern is a de facto macro.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power ON/OFF, Auto Setup, Input, PIP Input, Auto Setup, and Factory reset require time to execute - monitor returns NULL message if another command arrives during execution."
  - "Monitor disconnects TCP connection after 15 minutes of no packet data. Controller must re-connect."
  - "Packet interval must be longer than 600ms for both RS-232C and LAN."
# UNRESOLVED: no explicit safety interlocks for power sequencing, voltage, or current stated in source.
```

## Notes
**Command encoding**: All byte data encoded as ASCII character pairs. Example: 02h → '0'(30h) + '2'(32h). All commands end with CR (0Dh) delimiter.

**BCC calculation**: Block Check Code = D1 xor D2 xor ... xor D16 (xor from Reserved byte through ETX). Example: 30h xor 41h xor 30h xor 45h xor 30h xor 41h xor 02h xor 30h xor 30h xor 31h xor 30h xor 30h xor 30h xor 36h xor 34h xor 03h = 77h.

**Monitor ID addressing**: Single monitor: ID 1→'A'(41h), ID 2→'B'(42h), ..., ID 100→'A4h'. Broadcast: '＊'(2Ah). Group addressing: '1'(31h) through '9'(39h) for groups A-I.

**VCP vs CTL**: VCP (Variable Content Protocol) covers standard parameters (backlight, contrast, input, etc.) via page+code. CTL (Control) covers special operations (power, serial number, firmware, remote codes, etc.).

**NULL message** (CTL-C2xx BE): Returned on timeout (default 10s), unsupported message, BCC error, or when monitor is busy executing a long operation (Power ON/OFF, Auto Setup, Input, PIP, Factory reset).

<!-- UNRESOLVED: IP address assignment method (DHCP vs static) not documented beyond "DHCP:On". UNRESOLVED: flow control (RTS/CTS or XON/XOFF) not stated. UNRESOLVED: TV tuner models (*1) channel commands not verified for all E77UM variants. UNRESOLVED: video input resolution via VCP-02-50/51 readout values not fully specified. -->

## Provenance

```yaml
source_domains:
  - sharp-displays.jp.sharp
  - files.sharpusa.com
  - manualsdir.com
  - docs.aws.sharp.eu
  - assets.sharpnecdisplays.us
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
  - https://files.sharpusa.com/Downloads/ForHome/HomeEntertainment/LCDTVs/Manuals/tel_man_LC40E67UN_LC40E77UN.pdf
  - "https://www.manualsdir.com/manuals/150757/sharp-aquos-lc-40e77un-lc-40e67un.html?page=42"
  - https://docs.aws.sharp.eu/Marketing/Operational_manuals/PN-LC862_LC752_LC652_External_Control_N-Format_ver1-0.pdf
  - https://assets.sharpnecdisplays.us/documents/usermanuals/uhd-external_control.pdf
retrieved_at: 2026-05-13T20:19:16.791Z
last_checked_at: 2026-06-10T00:44:56.677Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T00:44:56.677Z
matched_actions: 81
action_count: 81
confidence: medium
summary: "All 81 spec actions match documented CTL/VCP wire tokens verbatim; transport baud 9600 and TCP port 7142 confirmed; source S=84 at spec granularity yields 81/84=0.96 coverage ratio above 0.9 threshold, remaining 3 source commands (CTL-CA04-03, VCP-10-3E, VCP-02-3E) represented in spec Variables section. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model variants (LC-60E77UM vs LC-52E77U) share the same protocol; family-wide applicability confirmed by shared doc title. UNRESOLVED: TV tuner commands (*1 models) not verified for all variants."
- "flow control not stated in source"
- "monitor does not send unsolicited events. NULL message (CTL-C2xx BE) is returned on timeout/error only."
- "no explicit multi-step macros in source. Typical procedure (Section 6) demonstrates:"
- "no explicit safety interlocks for power sequencing, voltage, or current stated in source."
- "IP address assignment method (DHCP vs static) not documented beyond \"DHCP:On\". UNRESOLVED: flow control (RTS/CTS or XON/XOFF) not stated. UNRESOLVED: TV tuner models (*1) channel commands not verified for all E77UM variants. UNRESOLVED: video input resolution via VCP-02-50/51 readout values not fully specified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
