---
spec_id: admin/contemporary-research-atsc-mini
schema_version: ai4av-public-spec-v1
revision: 1
title: "Contemporary Research ATSC-mini Control Spec"
manufacturer: "Contemporary Research"
model_family: ATSC-mini
aliases: []
compatible_with:
  manufacturers:
    - "Contemporary Research"
  models:
    - ATSC-mini
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bucketeer-3c238a6b-adc2-4051-aeb1-2d2ab9e1e1b4.s3.amazonaws.com
source_urls:
  - https://bucketeer-3c238a6b-adc2-4051-aeb1-2d2ab9e1e1b4.s3.amazonaws.com/documents/ATSC-mini_Product_Manual_052026.pdf
  - https://bucketeer-3c238a6b-adc2-4051-aeb1-2d2ab9e1e1b4.s3.amazonaws.com/documents/ATSC-mini_Data_Sheet_022026.pdf
retrieved_at: 2026-07-01T13:57:17.526Z
last_checked_at: 2026-07-07T11:09:16.615Z
generated_at: 2026-07-07T11:09:16.615Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "detailed firmware compatibility ranges are not stated in the source."
  - "firmware version compatibility ranges are not stated in the source. Voltage, current, and power specifications are not stated in the source."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:09:16.615Z
  matched_actions: 122
  action_count: 122
  confidence: medium
  summary: "All 122 spec actions matched source literals; transport parameters verified; full bidirectional protocol coverage. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Contemporary Research ATSC-mini Control Spec

## Summary
The ATSC-mini is a professional ATSC tuner with bidirectional RS-232/Telnet/UDP control, an Ethernet web interface, and optional iCC-Net (Ethernet UDP) control for display switching. This spec covers the bidirectional ASCII control protocol, including serial, Telnet, and UDP transports.

<!-- UNRESOLVED: detailed firmware compatibility ranges are not stated in the source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
serial:
  baud_rate: 9600  # factory default; configurable 1200-230400 via R5
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 23  # Telnet, configurable via IX=
auth:
  type: none  # inferred: no auth procedure for RS-232/Telnet control in source
udp:
  port: 31931  # fixed, from source
```

## Traits
```yaml
- powerable   # inferred from P1/P0/PT commands
- routable    # inferred from input/tuning commands
- queryable   # inferred from ST/SV/SS/SQ status requests and VL/VI/NC queries
- levelable   # inferred from VU/VD/VH/VL volume commands
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: ">P1"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: ">P0"
  params: []

- id: power_toggle
  label: Power Toggle
  kind: action
  command: ">PT"
  params: []

- id: set_front_panel_lockout
  label: Set Front Panel Lockout Mode
  kind: action
  command: ">S4={mode}"
  params:
    - name: mode
      type: integer
      description: "0=None, 1=Ch+Menu, 2=Vol+Menu, 3=Ch+Vol+Menu, 4=Power, 6=Menu, 7=All"

- id: set_ir_receive
  label: Set IR Receive Mode
  kind: action
  command: ">Q5={mode}"
  params:
    - name: mode
      type: integer
      description: "0=Disabled, 1=Enabled"

- id: select_channel
  label: Select Channel
  kind: action
  command: ">TC={channel}"
  params:
    - name: channel
      type: string
      description: "Tune channel; analog up to 4 chars, or digital major-minor separated by ':' or '-' (e.g. '28:1', '32-0')"

- id: tune_channel_up
  label: Tune Channel Up
  kind: action
  command: ">TU"
  params: []

- id: tune_channel_down
  label: Tune Channel Down
  kind: action
  command: ">TD"
  params: []

- id: tune_previous_channel
  label: Tune Previous Channel
  kind: action
  command: ">TP"
  params: []

- id: query_channel_name
  label: Query Channel Name
  kind: query
  command: ">NC"
  params: []

- id: query_program_name
  label: Query Program Name
  kind: query
  command: ">NP"
  params: []

- id: start_channel_scan
  label: Start Channel Scan
  kind: action
  command: ">T^"
  params: []

- id: set_tuning_format
  label: Set Tuning Format
  kind: action
  command: ">S0={format}"
  params:
    - name: format
      type: integer
      description: "0=CATV, 1=Off-Air, 2=IRC, 3=HRC, 4=Cable Auto"

- id: set_analog_digital_scan_mode
  label: Set Analog/Digital Scan Mode
  kind: action
  command: ">D0={mode}"
  params:
    - name: mode
      type: integer
      description: "Analog/Digital scan filter mode (0=All per source table excerpt)"

- id: query_channel_list
  label: Query Channel List
  kind: query
  command: ">LC"
  params: []

- id: set_overscan
  label: Set Overscan
  kind: action
  command: ">D4={pct}"
  params:
    - name: pct
      type: integer
      description: "0-9 (%)"

- id: closed_captions_on
  label: Display Closed Captions On
  kind: action
  command: ">Q0=1"
  params: []

- id: closed_captions_off
  label: Display Closed Captions Off
  kind: action
  command: ">Q0=0"
  params: []

- id: set_analog_caption_service
  label: Set Analog Caption Service
  kind: action
  command: ">Q1={service}"
  params:
    - name: service
      type: integer
      description: "1=Caption 1, 2=Caption 2, 3=Caption 3, 4=Caption 4, 5=Text 1, 6=Text 2, 7=Text 3, 8=Text 4"

- id: set_digital_caption_service
  label: Set Digital Caption Service
  kind: action
  command: ">Q7={service}"
  params:
    - name: service
      type: integer
      description: "1=Service 1 through 6=Service 6"

- id: refresh_rate_59_94
  label: Refresh Rate 59.94 Hz
  kind: action
  command: ">R6"
  params: []

- id: refresh_rate_60
  label: Refresh Rate 60 Hz
  kind: action
  command: ">RM"
  params: []

- id: output_rgb
  label: Output RGB Colorspace
  kind: action
  command: ">KK=149"
  params: []

- id: output_ypbpr
  label: Output YPbPr Colorspace
  kind: action
  command: ">KK=151"
  params: []

- id: set_hdmi_dvi_mode
  label: Set HDMI/DVI Mode
  kind: action
  command: ">HD={mode}"
  params:
    - name: mode
      type: integer
      description: "0=Auto, 1=HDMI, 2=DVI"

- id: volume_ramp_up
  label: Volume Ramp Up
  kind: action
  command: ">VU"
  params: []

- id: volume_ramp_down
  label: Volume Ramp Down
  kind: action
  command: ">VD"
  params: []

- id: volume_ramp_stop
  label: Volume Ramp Stop
  kind: action
  command: ">VV"
  params: []

- id: set_volume_level_0_100
  label: Set Volume Level (0-100)
  kind: action
  command: ">VH={level}"
  params:
    - name: level
      type: integer
      description: "0-100"

- id: set_volume_level_0_63
  label: Set Volume Level (0-63 compatibility)
  kind: action
  command: ">VL={level}"
  params:
    - name: level
      type: integer
      description: "0-63"

- id: volume_mute_enable
  label: Volume Mute Enable
  kind: action
  command: ">VM"
  params: []

- id: volume_mute_disable
  label: Volume Mute Disable
  kind: action
  command: ">VX"
  params: []

- id: volume_mute_toggle
  label: Volume Mute Toggle
  kind: action
  command: ">VT"
  params: []

- id: digital_audio_ac3
  label: Set Digital Audio to AC-3
  kind: action
  command: ">KK=158"
  params: []

- id: digital_audio_pcm_fixed
  label: Set Digital Audio to PCM Fixed
  kind: action
  command: ">KK=159"
  params: []

- id: digital_audio_pcm_variable
  label: Set Digital Audio to PCM Variable
  kind: action
  command: ">KK=160"
  params: []

- id: set_hdmi_audio_mute
  label: Set HDMI Audio Mute
  kind: action
  command: ">HA={mode}"
  params:
    - name: mode
      type: integer
      description: "0=Unmuted, 1=Muted"

- id: query_t_mode_status
  label: Request T (Channel/Source) Status
  kind: query
  command: ">ST"
  params: []

- id: query_v_mode_status
  label: Request V (Audio) Status
  kind: query
  command: ">SV"
  params: []

- id: query_s_mode_status
  label: Request S (Front Panel) Status
  kind: query
  command: ">SS"
  params: []

- id: query_q_mode_status
  label: Request Q (Caption/IR) Status
  kind: query
  command: ">SQ"
  params: []

- id: query_volume_level
  label: Query Volume Level (0-63)
  kind: query
  command: ">VL"
  params: []

- id: set_ip_address
  label: Set IP Address
  kind: action
  command: ">IP={addr}"
  params:
    - name: addr
      type: string
      description: "xxx.xxx.xxx.xxx"

- id: query_ip_address
  label: Query IP/MAC/Network Info
  kind: query
  command: ">IP"
  params: []

- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  command: ">IM={mask}"
  params:
    - name: mask
      type: string
      description: "xxx.xxx.xxx.xxx"

- id: set_default_gateway
  label: Set Default Gateway
  kind: action
  command: ">IG={gw}"
  params:
    - name: gw
      type: string
      description: "xxx.xxx.xxx.xxx"

- id: set_ip_mode
  label: Set IP Mode
  kind: action
  command: ">IY={mode}"
  params:
    - name: mode
      type: integer
      description: "1=Static, 2=DHCP"

- id: set_telnet_port
  label: Set Telnet Port
  kind: action
  command: ">IX={port}"
  params:
    - name: port
      type: integer
      description: "Telnet port number"

- id: udp_reply_on
  label: Enable UDP Replies
  kind: action
  command: ">UO"
  params: []

- id: udp_reply_off
  label: Disable UDP Replies
  kind: action
  command: ">UF"
  params: []

- id: web_page_disable
  label: Web Page Access Disable
  kind: action
  command: ">DH={mode}"
  params:
    - name: mode
      type: integer
      description: "0=Enable, 1=Disable"

- id: echo_on
  label: Echo On (RS-232)
  kind: action
  command: ">EN"
  params: []

- id: echo_off
  label: Echo Off (RS-232)
  kind: action
  command: ">EF"
  params: []

- id: set_baud_rate
  label: Set Baud Rate
  kind: action
  command: ">R5={rate}"
  params:
    - name: rate
      type: integer
      description: "0=1200, 1=2400, 2=4800, 3=9600 (default), 4=19.2K, 5=38.4K, 6=115.2K, 7=230.4K"

- id: help
  label: Help - List Serial Commands
  kind: query
  command: ">HE"
  params: []

- id: set_unit_name
  label: Set Unit Name
  kind: action
  command: ">NW={name}"
  params:
    - name: name
      type: string
      description: "Limited to 20 characters"

- id: query_unit_name
  label: Get Unit Name
  kind: query
  command: ">NM"
  params: []

- id: query_unit_id
  label: Get Unit ID / Firmware Version
  kind: query
  command: ">ID"
  params: []

- id: reload_factory_defaults
  label: Reload Factory Defaults
  kind: action
  command: ">Z!"
  params: []

- id: reboot
  label: Reboot (emulate power cycle)
  kind: action
  command: ">Z]"
  params: []

- id: ir_remote_power_toggle
  label: IR Emulation: Power Toggle
  kind: action
  command: ">KK=9"
  params: []

- id: ir_remote_key_0
  label: IR Emulation: Key 0
  kind: action
  command: ">KK=10"
  params: []

- id: ir_remote_key_1
  label: IR Emulation: Key 1
  kind: action
  command: ">KK=11"
  params: []

- id: ir_remote_key_2
  label: IR Emulation: Key 2
  kind: action
  command: ">KK=12"
  params: []

- id: ir_remote_key_3
  label: IR Emulation: Key 3
  kind: action
  command: ">KK=13"
  params: []

- id: ir_remote_key_4
  label: IR Emulation: Key 4
  kind: action
  command: ">KK=14"
  params: []

- id: ir_remote_key_5
  label: IR Emulation: Key 5
  kind: action
  command: ">KK=15"
  params: []

- id: ir_remote_key_6
  label: IR Emulation: Key 6
  kind: action
  command: ">KK=16"
  params: []

- id: ir_remote_key_7
  label: IR Emulation: Key 7
  kind: action
  command: ">KK=17"
  params: []

- id: ir_remote_key_8
  label: IR Emulation: Key 8
  kind: action
  command: ">KK=18"
  params: []

- id: ir_remote_key_9
  label: IR Emulation: Key 9
  kind: action
  command: ">KK=19"
  params: []

- id: ir_remote_enter_select
  label: IR Emulation: Enter/Select
  kind: action
  command: ">KK=21"
  params: []

- id: ir_remote_channel_up
  label: IR Emulation: Channel Up
  kind: action
  command: ">KK=22"
  params: []

- id: ir_remote_channel_down
  label: IR Emulation: Channel Down
  kind: action
  command: ">KK=23"
  params: []

- id: ir_remote_volume_up
  label: IR Emulation: Volume Up
  kind: action
  command: ">KK=24"
  params: []

- id: ir_remote_volume_down
  label: IR Emulation: Volume Down
  kind: action
  command: ">KK=25"
  params: []

- id: ir_remote_mute_toggle
  label: IR Emulation: Mute Toggle
  kind: action
  command: ">KK=26"
  params: []

- id: ir_remote_power_on
  label: IR Emulation: Power On
  kind: action
  command: ">KK=27"
  params: []

- id: ir_remote_power_off
  label: IR Emulation: Power Off
  kind: action
  command: ">KK=28"
  params: []

- id: ir_remote_menu
  label: IR Emulation: Menu
  kind: action
  command: ">KK=29"
  params: []

- id: ir_remote_guide
  label: IR Emulation: Guide
  kind: action
  command: ">KK=63"
  params: []

- id: ir_remote_signal
  label: IR Emulation: Signal
  kind: action
  command: ">KK=81"
  params: []

- id: ir_remote_ratio
  label: IR Emulation: Ratio
  kind: action
  command: ">KK=82"
  params: []

- id: ir_remote_audio
  label: IR Emulation: Audio
  kind: action
  command: ">KK=85"
  params: []

- id: ir_remote_favorite
  label: IR Emulation: Favorite
  kind: action
  command: ">KK=88"
  params: []

- id: ir_remote_list
  label: IR Emulation: List
  kind: action
  command: ">KK=95"
  params: []

- id: ir_remote_add_delete_channel
  label: IR Emulation: Add/Delete Channel
  kind: action
  command: ">KK=96"
  params: []

- id: ir_remote_air_cable
  label: IR Emulation: Air/Cable
  kind: action
  command: ">KK=98"
  params: []

- id: ir_remote_dash
  label: IR Emulation: Dash
  kind: action
  command: ">KK=99"
  params: []

- id: ir_remote_info
  label: IR Emulation: Info
  kind: action
  command: ">KK=100"
  params: []

- id: ir_remote_previous_channel
  label: IR Emulation: Previous Channel
  kind: action
  command: ">KK=101"
  params: []

- id: ir_remote_menu_key
  label: IR Emulation: Menu (105)
  kind: action
  command: ">KK=105"
  params: []

- id: ir_remote_right
  label: IR Emulation: Right
  kind: action
  command: ">KK=106"
  params: []

- id: ir_remote_left
  label: IR Emulation: Left
  kind: action
  command: ">KK=107"
  params: []

- id: ir_remote_up
  label: IR Emulation: Up
  kind: action
  command: ">KK=108"
  params: []

- id: ir_remote_down
  label: IR Emulation: Down
  kind: action
  command: ">KK=109"
  params: []

- id: ir_remote_enter_select_110
  label: IR Emulation: Enter/Select (110)
  kind: action
  command: ">KK=110"
  params: []

- id: ir_remote_exit
  label: IR Emulation: Exit
  kind: action
  command: ">KK=111"
  params: []

- id: ir_remote_cc
  label: IR Emulation: CC
  kind: action
  command: ">KK=115"
  params: []

- id: ir_remote_output_resolution_1080i
  label: IR Emulation: Output Resolution 1080i
  kind: action
  command: ">KK=141"
  params: []

- id: ir_remote_output_resolution_720p
  label: IR Emulation: Output Resolution 720p
  kind: action
  command: ">KK=142"
  params: []

- id: ir_remote_output_resolution_480p
  label: IR Emulation: Output Resolution 480p
  kind: action
  command: ">KK=143"
  params: []

- id: ir_remote_output_resolution_480i
  label: IR Emulation: Output Resolution 480i
  kind: action
  command: ">KK=144"
  params: []

- id: ir_remote_output_resolution_1080p
  label: IR Emulation: Output Resolution 1080p
  kind: action
  command: ">KK=145"
  params: []

- id: ir_remote_output_resolution_2160p
  label: IR Emulation: Output Resolution 2160p
  kind: action
  command: ">KK=146"
  params: []

- id: ir_remote_output_resolution_auto
  label: IR Emulation: Output Resolution Auto
  kind: action
  command: ">KK=147"
  params: []

- id: ir_remote_output_resolution_2160p30
  label: IR Emulation: Output Resolution 2160p/30
  kind: action
  command: ">KK=148"
  params: []

- id: ir_remote_output_rgb
  label: IR Emulation: Output RGB
  kind: action
  command: ">KK=149"
  params: []

- id: ir_remote_output_ypbpr
  label: IR Emulation: Output YPbPr
  kind: action
  command: ">KK=151"
  params: []

- id: ir_remote_air
  label: IR Emulation: Air
  kind: action
  command: ">KK=153"
  params: []

- id: ir_remote_cable
  label: IR Emulation: Cable
  kind: action
  command: ">KK=154"
  params: []

- id: iccnet_power_on
  label: iCC-Net: Power On
  kind: action
  command: "$A5,{dh},{dl},2,'P1'"
  params:
    - name: dh
      type: integer
      description: "Zone number (high byte of display device)"
    - name: dl
      type: integer
      description: "Unit number (low byte); 0 for global zone"

- id: iccnet_power_off
  label: iCC-Net: Power Off
  kind: action
  command: "$A5,{dh},{dl},2,'P0'"
  params:
    - name: dh
      type: integer
      description: "Zone number (high byte)"
    - name: dl
      type: integer
      description: "Unit number (low byte)"

- id: iccnet_power_toggle
  label: iCC-Net: Power Toggle
  kind: action
  command: "$A5,{dh},{dl},2,'PT'"
  params:
    - name: dh
      type: integer
      description: "Zone number (high byte)"
    - name: dl
      type: integer
      description: "Unit number (low byte)"

- id: iccnet_set_digital_channel_th
  label: iCC-Net: Set Digital Channel (TH)
  kind: action
  command: "$A5,{dh},{dl},5,'TH',{h1},{major},{minor}"
  params:
    - name: dh
      type: integer
      description: "Zone (high byte)"
    - name: dl
      type: integer
      description: "Unit (low byte)"
    - name: h1
      type: integer
      description: "Tuning style: 0=no change, 1=5-digit one-part (high+low byte = channel), 2=two-part major-minor"
    - name: major
      type: integer
      description: "Major channel number"
    - name: minor
      type: integer
      description: "Minor channel number"

- id: iccnet_set_digital_channel_tj
  label: iCC-Net: Set Digital Channel (TJ, up to 999-999)
  kind: action
  command: "$A5,{dh},{dl},6,'TJ',{major_h},{major_l},{minor_h},{minor_l}"
  params:
    - name: dh
      type: integer
      description: "Zone (high byte)"
    - name: dl
      type: integer
      description: "Unit (low byte)"
    - name: major_h
      type: integer
      description: "Major channel high byte"
    - name: major_l
      type: integer
      description: "Major channel low byte"
    - name: minor_h
      type: integer
      description: "Minor channel high byte"
    - name: minor_l
      type: integer
      description: "Minor channel low byte"

- id: iccnet_set_tuning_style
  label: iCC-Net: Set Tuning Style
  kind: action
  command: "$A5,{dh},{dl},3,'H1',{style}"
  params:
    - name: dh
      type: integer
      description: "Zone (high byte)"
    - name: dl
      type: integer
      description: "Unit (low byte)"
    - name: style
      type: integer
      description: "1=Five-digit one-part, 2=Two-part major-minor"

- id: iccnet_channel_up
  label: iCC-Net: Channel Up
  kind: action
  command: "$A5,{dh},{dl},2,'TU'"
  params:
    - name: dh
      type: integer
      description: "Zone (high byte)"
    - name: dl
      type: integer
      description: "Unit (low byte)"

- id: iccnet_channel_down
  label: iCC-Net: Channel Down
  kind: action
  command: "$A5,{dh},{dl},2,'TD'"
  params:
    - name: dh
      type: integer
      description: "Zone (high byte)"
    - name: dl
      type: integer
      description: "Unit (low byte)"

- id: iccnet_previous_channel
  label: iCC-Net: Previous Channel
  kind: action
  command: "$A5,{dh},{dl},2,'TP'"
  params:
    - name: dh
      type: integer
      description: "Zone (high byte)"
    - name: dl
      type: integer
      description: "Unit (low byte)"

- id: iccnet_set_volume
  label: iCC-Net: Set Volume (0-63)
  kind: action
  command: "$A5,{dh},{dl},3,'VL',{level}"
  params:
    - name: dh
      type: integer
      description: "Zone (high byte)"
    - name: dl
      type: integer
      description: "Unit (low byte)"
    - name: level
      type: integer
      description: "0-63"

- id: iccnet_send_string_to_display
  label: iCC-Net: Send String to Display
  kind: action
  command: "$A5,{dh},{dl},2+strlen,'UX',{string}"
  params:
    - name: dh
      type: integer
      description: "Zone (high byte)"
    - name: dl
      type: integer
      description: "Unit (low byte)"
    - name: string
      type: string
      description: "ASCII string emitted from the RS-232 serial port to the display"
```

## Feedbacks
```yaml
- id: t_mode_status
  type: string
  values: []
  description: "Channel/Source status response (T); fields: Unit, CMD, Power, Major Channel, Mute, Video Resolution, Input, RF Channel, Minor Channel."

- id: v_mode_status
  type: string
  values: []
  description: "Audio status response (V); fields: Unit, CMD, Power, Volume1 (0-63 emulated), Mute, Stereo N/A, Volume2 (0-100 actual)."

- id: s_mode_status
  type: string
  values: []
  description: "Front Panel Mode status response (S); includes Tune Mode, Lockout, Output Resolution, Colorspace, etc."

- id: q_mode_status
  type: string
  values: []
  description: "Caption/IR Mode status response (Q); Q0 captions on/off, Q1 analog service, Q5 IR mode, Q7 digital service."

- id: volume_query_response
  type: integer
  values: []
  description: "Response to >VL query; returns 0-63 legacy volume level."

- id: channel_name
  type: string
  values: []
  description: "Channel name returned by >NC query (up to 7 characters)."

- id: program_name
  type: string
  values: []
  description: "Program name returned by >NP query (up to 30 chars, 15 more if non-ASCII)."

- id: unit_name
  type: string
  values: []
  description: "Unit name returned by >NM query (up to 20 chars)."

- id: unit_id
  type: string
  values: []
  description: "Product model and application firmware version returned by >ID query."

- id: help_text
  type: string
  values: []
  description: "List of serial commands returned by >HE query."

- id: channel_list
  type: string
  values: []
  description: "Channel list response to >LC; format 'virtual-channel:RF-program:channel-name'."
```

## Variables
```yaml
# IP address, subnet mask, gateway, IP mode, Telnet port, web-page-disable flag,
# UDP reply flag, unit name, and IR-receive / front-panel lockout state are
# all settable via the protocol but are exposed in the Actions section above.
```

## Events
```yaml
# The protocol sends status responses on command and on user/IR action; treat
# those as solicited Feedbacks (above). No unsolicited event channel beyond the
# solicited status response with ~125 mS delay is documented.
```

## Macros
```yaml
# No multi-step macros are documented in the source. The Z! (factory defaults)
# and Z] (reboot) commands perform single-step resets.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source mentions no explicit interlocks or safety warnings. The web interface
# is password-protected by default (firmware v1.10+) with default password
# derived from the last six digits of the unit MAC address.
```

## Notes
- All command strings sent to the ATSC-mini begin with ASCII '>' (attention) and end with CR ($0D). Responses begin with '<' and end with CR LF.
- Baud rate is factory default 9600; configurable 1200 to 230400 via the >R5 command.
- The equals sign in commands is optional when no parameter follows, or for parameters themselves.
- IP address settings can be edited via RS-232 using >IP=, >IM=, >IG=, >IY=.
- UDP control uses fixed destination port 31931; responses go to UDP 31932 at the directed broadcast address when enabled (>UO).
- iCC-Net commands are unidirectional, sent over Ethernet at UDP port 31934, and use a hex frame beginning with $A5.
- Two-part channels may use ':' or '-' as separator; major channels up to 999 with minor up to 999.
- Status responses are intentionally delayed ~125 mS to coalesce bursts.

<!-- UNRESOLVED: firmware version compatibility ranges are not stated in the source. Voltage, current, and power specifications are not stated in the source. -->

## Provenance

```yaml
source_domains:
  - bucketeer-3c238a6b-adc2-4051-aeb1-2d2ab9e1e1b4.s3.amazonaws.com
source_urls:
  - https://bucketeer-3c238a6b-adc2-4051-aeb1-2d2ab9e1e1b4.s3.amazonaws.com/documents/ATSC-mini_Product_Manual_052026.pdf
  - https://bucketeer-3c238a6b-adc2-4051-aeb1-2d2ab9e1e1b4.s3.amazonaws.com/documents/ATSC-mini_Data_Sheet_022026.pdf
retrieved_at: 2026-07-01T13:57:17.526Z
last_checked_at: 2026-07-07T11:09:16.615Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:09:16.615Z
matched_actions: 122
action_count: 122
confidence: medium
summary: "All 122 spec actions matched source literals; transport parameters verified; full bidirectional protocol coverage. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "detailed firmware compatibility ranges are not stated in the source."
- "firmware version compatibility ranges are not stated in the source. Voltage, current, and power specifications are not stated in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
