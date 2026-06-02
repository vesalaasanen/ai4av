---
spec_id: admin/extron-smp-300-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron SMP 300 Series Control Spec"
manufacturer: Extron
model_family: "SMP 351"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "SMP 351"
    - "SMP 351 3G-SDI"
    - "SMP 352"
    - "SMP 352 3G-SDI"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
  - extron.com
  - manualslib.com
source_urls:
  - https://aca.im/driver_docs/Extron/extron_smp300_Series.pdf
  - https://www.extron.com/download/files/userman/smp_300_series_68-2238-01_R.pdf
  - https://www.manualslib.com/manual/2867393/Extron-Electronics-Smp-300-Series.html
  - https://www.extron.com/download/
retrieved_at: 2026-05-13T02:01:02.032Z
last_checked_at: 2026-06-02T22:07:10.083Z
generated_at: 2026-06-02T22:07:10.083Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "USB config port protocol details beyond SIS over USB serial not fully specified"
  - "command syntax for audio output routing not fully clear in source table"
  - "no multi-step macro sequences explicitly documented in source"
  - "power-on sequencing requirements not documented; recording"
  - "firmware version compatibility ranges not stated"
  - "maximum concurrent Telnet connection count not explicitly stated (E26 error exists)"
  - "USB config port protocol specifics beyond SIS serial emulation"
  - "SSL/SSH certificate management not documented in source excerpt"
  - "precise command syntax for audio output routing command incomplete in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:07:10.083Z
  matched_actions: 110
  action_count: 110
  confidence: medium
  summary: "All 110 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Extron SMP 300 Series Control Spec

## Summary
The Extron SMP 300 Series (SMP 351, SMP 351 3G-SDI, SMP 352, SMP 352 3G-SDI) are streaming media processors with recording, encoding, and streaming capabilities. Control is via the Simple Instruction Set (SIS) protocol over RS-232 serial, Telnet (TCP port 23), or USB. SIS commands are ASCII-based, case-insensitive, and terminated with CR/LF.

<!-- UNRESOLVED: USB config port protocol details beyond SIS over USB serial not fully specified -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # Telnet default; configurable via SIS or web UI
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: password  # optional: device can operate with no password set
  # Two levels: administrator and user. If no password set, device accepts
  # commands immediately after connection. Password max 128 chars (alphanumeric,
  # no pipe or space).
```

## Traits
```yaml
- powerable       # inferred: reboot command present
- queryable       # inferred: extensive query commands returning device state
- levelable       # inferred: audio level, brightness, contrast, color, tint controls
- routable        # inferred: input selection per channel
```

## Actions
```yaml
# System
- id: reboot_system
  label: Reboot System
  kind: action
  command: "E1BOOT}"
  response: "Boot1]"

- id: restart_network
  label: Restart Network
  kind: action
  command: "E2BOOT}"
  response: "Boot2]"

- id: reset_flash
  label: Reset Flash
  kind: action
  command: "EZFFF}"
  response: "Zpf]"

- id: factory_reset
  label: System Reset (Factory Defaults)
  kind: action
  command: "EZXXX}"
  response: "Zpx]"

- id: full_reset_delete_recordings
  label: Full Reset (Delete Recordings)
  kind: action
  command: "EZY}"
  response: "Zpy]"

- id: absolute_reset
  label: Absolute Reset
  kind: action
  command: "EZQQQ}"
  response: "Zpq]"

- id: clear_alarms
  label: Clear Active Alarms
  kind: action
  command: "ECALRM}"
  response: "Alrm C]"

- id: set_unit_name
  label: Set Unit Name
  kind: action
  params:
    - name: name
      type: string
      description: "Device name, max 63 chars, must comply with internet host name standards"
  command: "E {name}CN}"
  response: "Ipn{name}]"

- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=clear/none, 1=verbose, 2=tagged responses, 3=verbose+tagged"
  command: "E {mode}CV}"
  response: "Vrb{mode}]"

# Executive mode
- id: set_executive_mode
  label: Set Executive Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=off, 1=complete lockout, 2=menu lockout, 3=recording controls only"
  command: "{mode}X"
  response: "Exe{mode}]"

# Port configuration
- id: set_telnet_port
  label: Set Telnet Port
  kind: action
  params:
    - name: port
      type: integer
      description: "Port number (1024+, or 23 for default, or 0 to disable)"
  command: "E {port}MT}"
  response: "Pmt{port}]"

- id: set_web_port
  label: Set Web Port
  kind: action
  params:
    - name: port
      type: integer
      description: "Port number (1024+, or 80 for default, or 0 to disable)"
  command: "E {port}MH}"
  response: "Pmh{port}]"

# IP configuration
- id: set_dhcp
  label: Set DHCP Mode
  kind: action
  params:
    - name: enabled
      type: integer
      description: "1=on, 0=off"
  command: "E{enabled}DH}"
  response: "Idh{enabled}]"

- id: set_ip_address
  label: Set IP Address
  kind: action
  params:
    - name: ip
      type: string
      description: "IP address in dotted decimal notation"
  command: "E {ip}CI}"
  response: "Ipi {ip}]"

- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  params:
    - name: mask
      type: string
      description: "Subnet mask in dotted decimal notation"
  command: "E {mask}CS}"
  response: "Ips {mask}]"

- id: set_gateway
  label: Set Gateway IP Address
  kind: action
  params:
    - name: gateway
      type: string
      description: "Gateway IP address in dotted decimal notation"
  command: "E {gateway}CG}"
  response: "Ipg {gateway}]"

- id: set_dns_server
  label: Set DNS Server IP Address
  kind: action
  params:
    - name: dns
      type: string
      description: "DNS server IP address in dotted decimal notation"
  command: "E {dns}DI}"
  response: "Ipd {dns}]"

- id: set_datetime
  label: Set Date and Time
  kind: action
  params:
    - name: datetime
      type: string
      description: "Format MM/DD/YY-HH:MM:SS"
  command: "E {datetime} CT}"
  response: "Ipt {datetime}]"

# Serial port configuration
- id: configure_serial_port
  label: Configure Serial Port
  kind: action
  params:
    - name: baud_rate
      type: integer
      description: "9600, 19200, 38400, 57600, or 115200"
    - name: parity
      type: string
      description: "O=odd, E=even, N=none, M=mark, S=space"
    - name: data_bits
      type: integer
      description: "7 or 8"
    - name: stop_bits
      type: integer
      description: "1 or 2"
  command: "E1*{baud_rate},{parity},{data_bits},{stop_bits}CP}"
  response: "Cpn 01 Ccp{baud_rate},{parity},{data_bits},{stop_bits}]"

# Password management
- id: set_admin_password
  label: Set Administrator Password
  kind: action
  params:
    - name: password
      type: string
      description: "Max 128 chars, alphanumeric, no pipe or space"
  command: "E {password}CA}"
  response: "Ipa {password}]"

- id: set_user_password
  label: Set User Password
  kind: action
  params:
    - name: password
      type: string
      description: "Max 128 chars, alphanumeric, no pipe or space"
  command: "E {password}CU}"
  response: "Ipu {password}]"

- id: reset_admin_password
  label: Reset Administrator Password
  kind: action
  command: "E •CA}"
  response: "Ipa]"

- id: reset_user_password
  label: Reset User Password
  kind: action
  command: "E •CU}"
  response: "Ipu]"

# Backup/Restore
- id: save_configuration
  label: Save Configuration
  kind: action
  params:
    - name: type
      type: integer
      description: "0=IP config (ip.cfg), 2=box parameters (box.cfg)"
  command: "E1*{type}XF}"
  response: "Cfg1*{type}]"

- id: restore_configuration
  label: Restore Configuration
  kind: action
  params:
    - name: type
      type: integer
      description: "0=IP config (ip.cfg), 2=box parameters (box.cfg)"
  command: "E0*{type}XF}"
  response: "Cfg0*{type}]"

# Input selection
- id: select_input
  label: Select Input
  kind: action
  params:
    - name: input
      type: integer
      description: "Input number 1-5"
    - name: channel
      type: integer
      description: "Output channel: 1=A (inputs 1-2), 2=B (inputs 3-5)"
  command: "{input}*{channel}!"
  response: "In {input}*{channel}]"

- id: set_input_name
  label: Set Input Name
  kind: action
  params:
    - name: input
      type: integer
      description: "Input number 1-5"
    - name: name
      type: string
      description: "Input name, max 16 chars"
  command: "E {input},{name} NI}"
  response: "Nmi {input},{name}]"

- id: set_input_format
  label: Set Input Video Format
  kind: action
  params:
    - name: format
      type: integer
      description: "1=YUVp/HDTV, 2=YUVi, 3=Composite, 4=3G-SDI, 5=HD-SDI, 6=SDI, 7=Auto-SDI"
  command: "3* {format}"
  response: "Typ 03*{format}]"

- id: set_input_aspect_ratio
  label: Set Input Aspect Ratio
  kind: action
  params:
    - name: input
      type: integer
      description: "Input number"
    - name: mode
      type: integer
      description: "1=fill, 2=follow, 3=fit (zoom)"
  command: "E {input}*{mode}ASPR}"
  response: "Aspr {input}*{mode}]"

# Recording
- id: start_recording
  label: Start Recording
  kind: action
  command: "E Y1 RCDR}"
  response: "RcdrY1]"

- id: stop_recording
  label: Stop Recording
  kind: action
  command: "E Y0 RCDR}"
  response: "RcdrY0]"

- id: pause_recording
  label: Pause Recording
  kind: action
  command: "E Y2 RCDR}"
  response: "RcdrY2]"

- id: extend_record_time
  label: Extend Record Time
  kind: action
  params:
    - name: minutes
      type: integer
      description: "Additional minutes, 1-60"
  command: "E E {minutes} RCDR}"
  response: "RcdrE {minutes}]"

- id: add_chapter_marker
  label: Add Chapter Marker
  kind: action
  command: "E B RCDR}"
  response: "RcdrB]"

- id: set_record_destination
  label: Set Record Destination
  kind: action
  params:
    - name: destination
      type: integer
      description: "0=Auto, 1=Internal, 2=USBFront, 3=USBRear, 11=Internal+Auto, 12=Internal+USBFront, 13=Internal+USBRear, 14=Internal+USBRCP"
  command: "E D {destination} RCDR}"
  response: "RcdrD {destination}]"

- id: execute_swap
  label: Swap Channel A and B
  kind: action
  command: "% Tke"
  response: "Swap]"

# Video mute
- id: video_mute_on
  label: Mute Video Output
  kind: action
  params:
    - name: channel
      type: integer
      description: "Output channel number"
  command: "{channel}* 1B Vmt"
  response: "{channel}*01]"

- id: video_mute_off
  label: Unmute Video Output
  kind: action
  params:
    - name: channel
      type: integer
      description: "Output channel number"
  command: "{channel}* 0B Vmt"
  response: "{channel}*00]"

# HDMI video mute
- id: hdmi_video_blank_on
  label: Enable HDMI Blanking
  kind: action
  command: "99* 1B Vmt"
  response: "99*1]"

- id: hdmi_video_blank_off
  label: Disable HDMI Blanking
  kind: action
  command: "99* 0B Vmt"
  response: "99*0]"

# Audio mute
- id: audio_mute
  label: Mute Audio Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: "Audio selection ID (e.g. 40000=Analog A Left, 40001=Analog A Right, etc.)"
  command: "E M {channel}*1AU}"
  response: "DsM {channel}*1]"

- id: audio_unmute
  label: Unmute Audio Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: "Audio selection ID"
  command: "E M {channel}*0AU}"
  response: "DsM {channel}*0]"

- id: set_audio_level
  label: Set Audio Level
  kind: action
  params:
    - name: channel
      type: integer
      description: "Audio selection ID"
    - name: level
      type: integer
      description: "Level in 0.1 dB steps, -180 to 240 (-18.0 to +24.0 dB)"
  command: "E G {channel}*{level} AU}"
  response: "DsG {channel}* {level}]"

- id: set_audio_delay
  label: Set Audio Delay
  kind: action
  params:
    - name: delay_ms
      type: integer
      description: "Delay in milliseconds, 0-999"
  command: "E 1* {delay_ms} ADLY}"
  response: "Adly1* {delay_ms}]"

- id: set_audio_format
  label: Set Audio Input Format
  kind: action
  params:
    - name: input
      type: integer
      description: "Input number"
    - name: format
      type: integer
      description: "0=disable, 1=analog, 2=PLCM 2 CH"
  command: "E I {input}* {format} AFMT}"
  response: "Afmt {input}* {format}]"

# Encoder settings
- id: set_encoder_profile
  label: Set Encoder Profile
  kind: action
  params:
    - name: stream
      type: integer
      description: "Stream selection (1=Archive ChA, 2=Archive ChB, 3=Confidence)"
    - name: profile
      type: integer
      description: "1=Base, 2=Main, 3=High"
  command: "E {stream}* {profile} EPRO}"
  response: "Epro{stream}* {profile}]"

- id: set_encoding_mode
  label: Set Encoding Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=composite mode, 1=dual channel mode"
  command: "E 1* {mode} ENCM}"
  response: "Encm 1*{mode}]"

- id: set_output_mode
  label: Set Output Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "1=video and audio, 2=video only"
  command: "E1*{mode} SMOD}"
  response: "Smod1* {mode}]"

- id: set_record_resolution
  label: Set Record Resolution
  kind: action
  params:
    - name: stream
      type: integer
      description: "Stream selection"
    - name: resolution
      type: integer
      description: "1=480p, 2=720p, 3=1080p, 4=WCIF, 5=XGA, 6=SXGA, 99=Custom"
  command: "E {stream}* {resolution} VRES}"
  response: "Vres{stream}*{resolution}]"

- id: set_record_frame_rate
  label: Set Record Frame Rate
  kind: action
  params:
    - name: stream
      type: integer
      description: "Stream selection"
    - name: rate
      type: integer
      description: "1=30, 2=25, 3=24, 4=15, 5=12.5, 6=12, 7=10, 8=5"
  command: "E {stream}* {rate} VFRM}"
  response: "Vfrm{stream}*{rate}]"

- id: set_video_bitrate
  label: Set Video Bit Rate
  kind: action
  params:
    - name: stream
      type: integer
      description: "Stream selection"
    - name: bitrate
      type: integer
      description: "200 to 10000"
  command: "E V {stream}* {bitrate} BITR}"
  response: "BitrV {stream}* {bitrate}]"

- id: set_audio_bitrate
  label: Set Audio Bit Rate
  kind: action
  params:
    - name: stream
      type: integer
      description: "Stream selection"
    - name: bitrate
      type: integer
      description: "80, 96, 128, 192, 256, or 320"
  command: "E A {stream}* {bitrate} BITR}"
  response: "BitrA {stream}* {bitrate}]"

- id: set_gop_length
  label: Set GOP Length
  kind: action
  params:
    - name: stream
      type: integer
      description: "Stream selection"
    - name: length
      type: integer
      description: "1 to 30"
  command: "E {stream}* {length} GOPL}"
  response: "Gopl{stream}*{length}]"

- id: set_bitrate_control
  label: Set Bit Rate Control Type
  kind: action
  params:
    - name: stream
      type: integer
      description: "Stream selection"
    - name: type
      type: integer
      description: "0=VBR, 1=CVBR, 2=CBR"
  command: "E {stream}* {type} BRCT}"
  response: "Brct{stream}* {type}]"

- id: set_preview_refresh_rate
  label: Set Preview Output Refresh Rate
  kind: action
  params:
    - name: rate
      type: integer
      description: "1=60 Hz, 2=50 Hz"
  command: "E {rate} RATE}"
  response: "Rate {rate}]"

# RTMP streaming
- id: set_rtmp_url
  label: Set RTMP Destination URL
  kind: action
  params:
    - name: slot
      type: integer
      description: "1=primary, 2=backup"
    - name: stream
      type: integer
      description: "Stream selection"
    - name: url
      type: string
      description: "RTMP URL string"
  command: "E U{slot}*{stream}*{url}RTMP}"
  response: "RtmpU{slot}*{stream}*{url}]"

- id: enable_rtmp_push
  label: Enable/Disable RTMP Push
  kind: action
  params:
    - name: stream
      type: integer
      description: "Stream selection"
    - name: enabled
      type: integer
      description: "1=enable, 0=disable"
  command: "E E {stream}*{enabled} RTMP}"
  response: "RtmpE {stream}*{enabled}]"

- id: stream_enable
  label: Enable/Disable Stream
  kind: action
  params:
    - name: stream
      type: integer
      description: "Stream selection (1=Archive ChA, 2=Archive ChB, 3=Confidence)"
    - name: enabled
      type: integer
      description: "1=enable, 0=disable"
  command: "E {stream}*{enabled} STRC}"
  response: "Strc{stream}*{enabled}]"

# Stream name
- id: set_stream_name
  label: Set Stream Name
  kind: action
  params:
    - name: stream
      type: integer
      description: "Stream selection"
    - name: name
      type: string
      description: "Stream name"
  command: "EN {stream}* {name} STRC}"
  response: "StrcN {stream}* {name}]"

# Presets
- id: recall_user_preset
  label: Recall User Preset
  kind: action
  params:
    - name: channel
      type: integer
      description: "Output channel (1=A, 2=B)"
    - name: preset
      type: integer
      description: "Preset number 1-32"
  command: "1*{channel}*{preset}."
  response: "1Rpr{channel}*{preset}]"

- id: save_user_preset
  label: Save User Preset
  kind: action
  params:
    - name: channel
      type: integer
      description: "Output channel (1=A, 2=B)"
    - name: preset
      type: integer
      description: "Preset number 1-32"
  command: "1*{channel}*{preset},"
  response: "1Spr{channel}*{preset}]"

- id: recall_input_preset
  label: Recall Input Preset
  kind: action
  params:
    - name: input
      type: integer
      description: "Input number 1-5"
    - name: preset
      type: integer
      description: "Preset number 1-128"
  command: "2*{input}*{preset}."
  response: "2Rpr{input}*{preset}]"

- id: save_input_preset
  label: Save Input Preset
  kind: action
  params:
    - name: input
      type: integer
      description: "Input number 1-5"
    - name: preset
      type: integer
      description: "Preset number 1-128"
  command: "2*{input}*{preset},"
  response: "2Spr{input}*{preset}]"

- id: recall_layout_preset
  label: Recall Layout Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "Preset number 1-32"
  command: "7*{preset}."
  response: "7Rpr{preset}]"

- id: save_layout_preset
  label: Save Layout Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "Preset number 1-32"
  command: "7*{preset},"
  response: "7Spr{preset}]"

- id: recall_encoder_preset
  label: Recall Encoder Preset
  kind: action
  params:
    - name: stream
      type: integer
      description: "Stream selection"
    - name: preset
      type: integer
      description: "Encoder preset number 1-32"
  command: "4*{stream}* {preset}."
  response: "4Rpr {stream}*{preset}]"

- id: recall_streaming_preset
  label: Recall Streaming Preset
  kind: action
  params:
    - name: stream
      type: integer
      description: "Stream selection"
    - name: preset
      type: integer
      description: "Streaming preset number 1-16"
  command: "3*{stream}*{preset}."
  response: "3Rpr {stream}*{preset}]"

# Picture adjustments
- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: channel
      type: integer
      description: "Output channel"
    - name: value
      type: integer
      description: "0-127, default 64"
  command: "E {channel}*{value} BRIT}"
  response: "Brit {channel}*{value}]"

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: channel
      type: integer
      description: "Output channel"
    - name: value
      type: integer
      description: "0-127, default 64"
  command: "E {channel}*{value} CONT}"
  response: "Cont {channel}*{value}]"

- id: set_color
  label: Set Color
  kind: action
  params:
    - name: channel
      type: integer
      description: "Output channel"
    - name: value
      type: integer
      description: "0-127, default 64"
  command: "E {channel}*{value}COLR}"
  response: "Colr {channel}*{value}]"

- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: channel
      type: integer
      description: "Output channel"
    - name: value
      type: integer
      description: "0-127, default 64"
  command: "E {channel}*{value} TINT}"
  response: "Tint {channel}*{value}]"

# Auto-image
- id: toggle_auto_image
  label: Enable/Disable Auto-Image
  kind: action
  params:
    - name: input
      type: integer
      description: "Input number"
    - name: enabled
      type: integer
      description: "0=disabled, 1=enabled"
  command: "{input}*{enabled}A Img}"
  response: "{input}*{enabled}]"

# Overscan
- id: set_overscan
  label: Set Overscan Mode
  kind: action
  params:
    - name: input_type
      type: integer
      description: "Input video format"
    - name: mode
      type: integer
      description: "0=0%, 1=2.5%, 2=5.0%"
  command: "E {input_type}*{mode}OSCN}"
  response: "Oscn{input_type}*{mode}]"

# Test pattern
- id: set_test_pattern
  label: Set Test Pattern
  kind: action
  params:
    - name: pattern
      type: integer
      description: "0=off, 1=color bars, 2=AR 1.33, 3=AR 1.78, 4=AR 1.85, 5=crop, 6=pulse, 7=timestamp, 8=universal OSD"
  command: "E {pattern}TEST}"
  response: "Test{pattern}]"

# HDCP
- id: set_hdcp_authorization
  label: Set HDCP Authorization
  kind: action
  params:
    - name: input
      type: integer
      description: "Input number"
    - name: enabled
      type: integer
      description: "1=on, 0=off"
  command: "E E{enabled}*{input}HDCP}"
  response: "HdcpE {input}*{enabled}]"

- id: set_hdcp_notification
  label: Set HDCP Notification
  kind: action
  params:
    - name: enabled
      type: integer
      description: "1=on (green notification), 0=off (mute to black)"
  command: "E N{enabled}HDCP}"
  response: "HdcpN{enabled}]"

# EDID
- id: assign_edid
  label: Assign EDID to Input
  kind: action
  params:
    - name: input
      type: integer
      description: "Input number"
    - name: edid
      type: integer
      description: "EDID value (see EDID table)"
  command: "E A {input}*{edid}EDID}"
  response: "EdidA {input}*{edid}]"

# USB ejection
- id: eject_usb
  label: Safely Eject USB Storage
  kind: action
  params:
    - name: port
      type: integer
      description: "0=all USB, 2=USBFront, 3=USBRear, 4=USBRCP"
  command: "E {port}USBE}"
  response: "USBE{port}]"

# SNMP
- id: set_snmp_contact
  label: Set SNMP Contact
  kind: action
  params:
    - name: contact
      type: string
      description: "Contact name, max 64 chars"
  command: "E C {contact} SNMP}"
  response: "SnmpC* {contact}]"

- id: set_snmp_location
  label: Set SNMP Location
  kind: action
  params:
    - name: location
      type: string
      description: "Location, max 64 chars"
  command: "E L {location} SNMP}"
  response: "Snmp L* {location}]"

- id: enable_snmp
  label: Enable SNMP Access
  kind: action
  command: "E E1SNMP}"
  response: "SnmpE*1]"

- id: disable_snmp
  label: Disable SNMP Access
  kind: action
  command: "E E0SNMP}"
  response: "SnmpE*0]"

# File operations
- id: change_directory
  label: Change Directory
  kind: action
  params:
    - name: path
      type: string
      description: "Directory path"
  command: "E {path} CJ}"
  response: "Dirl {path}]"

- id: list_files
  label: List Files
  kind: action
  command: "E LF}"
  response: "path/filename date/time length ]"

# HDMI output
- id: set_hdmi_output
  label: Set HDMI Output Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Channel A full screen, 1=Channel B full screen, 2=Confidence layout"
  command: "E {mode} OMOD}"
  response: "Omod {mode}]"

# Audio output selection
- id: set_audio_output
  label: Set Audio Output Routing
  kind: action
  params:
    - name: mode
      type: integer
      description: "1=ChA only, 2=ChB only, 3=ChA+ChB, 4=ChA+ChB dual mono, 5=ChA dual mono+ChB"
  command: "E {mode}... "  # UNRESOLVED: command syntax for audio output routing not fully clear in source table

# Dual channel archive recording
- id: set_archive_chA_recording
  label: Set Archive Channel A Recording
  kind: action
  params:
    - name: enabled
      type: integer
      description: "0=disable, 1=enable"
  command: "E X1* {enabled}RCDR}"
  response: "Rcdr X1*{enabled}]"

# Folder share
- id: enable_folder_share
  label: Enable Folder Share on SMD
  kind: action
  command: "E E1 * 1SHRF}"
  response: "ShrfE1*1]"

- id: disable_folder_share
  label: Disable Folder Share on SMD
  kind: action
  command: "E E1 * 0SHRF}"
  response: "ShrfE1 *0]"

# Metadata
- id: set_metadata
  label: Set Output Metadata
  kind: action
  params:
    - name: parameter
      type: integer
      description: "0=Contributor, 1=Coverage, 2=Presenter, 3=Date, 4=Description, 5=Format, 6=Identifier, 7=Language, 8=Publisher, 9=Relation, 10=Rights, 11=Source, 12=Subject, 13=Title, 14=Type, 15=SystemName, 16=Course"
    - name: value
      type: string
      description: "Metadata value, max 127 chars"
  command: "EM{parameter}*{value}RCDR}"
  response: "RcdrM{parameter}*{value}]"

# Delete recording
- id: delete_recording
  label: Delete Recording Event and Files
  kind: action
  params:
    - name: db_id
      type: integer
      description: "Valid DB_ID number"
  command: "E Z {db_id}RCDR}"
  response: "RcdrZ{db_id}]"
- id: set_snmp_port
  label: Set SNMP Port
  kind: action
  params:
    - name: port
      type: integer
  command: "E A{port}PMAP}"

- id: set_ssh_port
  label: Set SSH Port
  kind: action
  params:
    - name: port
      type: integer
  command: "E B{port}PMAP}"

- id: set_ssl_port
  label: Set SSL Port
  kind: action
  params:
    - name: port
      type: integer
  command: "E S{port}PMAP}"

- id: set_edid_import
  label: Import EDID to User Location
  kind: action
  params:
    - name: location
      type: integer
    - name: filename
      type: string
  command: "E I {location},{filename}EDID}"

- id: set_edid_export
  label: Export EDID in Binary Format
  kind: action
  params:
    - name: edid
      type: integer
    - name: filename
      type: string
  command: "E E {edid}{filename}EDID}"

- id: set_background_image
  label: Select Background Image Filename
  kind: action
  params:
    - name: filename
      type: string
  command: "E {filename}RF}"

- id: mute_background_image
  label: Mute Background Image
  kind: action
  params: []
  command: "E0RF}"

- id: set_hctr
  label: Set Horizontal Centering
  kind: action
  params:
    - name: channel
      type: integer
    - name: value
      type: integer
  command: "E 1*{channel} *{value} HCTR}"

- id: set_hsiz
  label: Set Horizontal Size
  kind: action
  params:
    - name: channel
      type: integer
    - name: value
      type: integer
  command: "E 1*{channel} *{value} HSIZ}"

- id: set_vctr
  label: Set Vertical Centering
  kind: action
  params:
    - name: channel
      type: integer
    - name: value
      type: integer
  command: "E 1*{channel} *{value} VCTR}"

- id: set_vsiz
  label: Set Vertical Size
  kind: action
  params:
    - name: channel
      type: integer
    - name: value
      type: integer
  command: "E 1*{channel} *{value} VSIZ}"

- id: set_phas
  label: Set Pixel Phase
  kind: action
  params:
    - name: value
      type: integer
  command: "E 3 * {value} PHAS}"

- id: set_tpix
  label: Set Total Pixels
  kind: action
  params:
    - name: value
      type: integer
  command: "E 3 * {value} TPIX}"

- id: set_hsrt
  label: Set Horizontal Start
  kind: action
  params:
    - name: value
      type: integer
  command: "E 3 * {value} HSRT}"

- id: set_alin
  label: Set Active Lines
  kind: action
  params:
    - name: value
      type: integer
  command: "E 3 * {value} ALIN}"

- id: set_apix
  label: Set Active Pixels
  kind: action
  params:
    - name: value
      type: integer
  command: "E 3 * {value} APIX}"

- id: hdmi_audio_mute
  label: Mute HDMI Audio
  kind: action
  params: []
  command: "99* 1Z Amt"

- id: hdmi_audio_unmute
  label: Unmute HDMI Audio
  kind: action
  params: []
  command: "99* 0Z Amt"

- id: set_snmp_public_community
  label: Set SNMP Public Community String
  kind: action
  params:
    - name: community
      type: string
  command: "E P {community}SNMP}"
```

## Feedbacks
```yaml
- id: firmware_version
  type: string
  query: "Q"
  response: "X1!]"
  description: "Firmware version to 2 decimal places"

- id: firmware_build_version
  type: string
  query: "*Q"
  response: "X1!]"
  description: "Firmware version plus build number"

- id: model_name
  type: string
  query: "1I"
  description: "Model name (e.g. SMP 351)"

- id: part_number
  type: string
  query: "N"
  description: "Part number (e.g. 60-1324-01)"

- id: unit_name
  type: string
  query: "ECN}"
  description: "Configured unit name"

- id: verbose_mode
  type: integer
  query: "ECV}"
  description: "Current verbose mode (0-3)"

- id: active_alarms
  type: string
  query: "39I"
  description: "Active alarms or 'None active'"

- id: telnet_connections
  type: integer
  query: "ECC}"
  description: "Number of active IP connections"

- id: telnet_port
  type: integer
  query: "E MT}"
  description: "Current Telnet port assignment"

- id: web_port
  type: integer
  query: "E MH}"
  description: "Current web port assignment"

- id: selected_input
  type: string
  query: "X50@!"
  description: "Selected input for given channel"

- id: input_selection_channel
  type: string
  query: "32I"
  description: "ChA and ChB input selections"

- id: record_status
  type: enum
  values: [stopped, recording, paused]
  query: "E Y RCDR}"
  description: "Current recording status"

- id: record_destination
  type: string
  query: "E D RCDR}"
  description: "Current recording destination"

- id: recording_duration
  type: string
  query: "35I"
  description: "Recording elapsed time HH:MM:SS"

- id: record_time_remaining
  type: string
  query: "36I"
  description: "Time remaining for current recording"

- id: video_mute_status
  type: boolean
  query: "X50@B"
  description: "Video mute status for given output channel"

- id: audio_mute_status
  type: boolean
  query: "E M X50^ AU}"
  description: "Audio mute status for given audio channel"

- id: audio_level
  type: integer
  query: "E G X50^ AU}"
  description: "Audio level in 0.1 dB steps"

- id: front_panel_audio_levels
  type: string
  query: "34I"
  description: "Left*Right audio level indicators"

- id: ip_address
  type: string
  query: "ECI}"
  description: "Current IP address"

- id: subnet_mask
  type: string
  query: "ECS}"
  description: "Current subnet mask"

- id: gateway_address
  type: string
  query: "ECG}"
  description: "Current gateway IP address"

- id: mac_address
  type: string
  query: "ECH}"
  description: "Hardware MAC address"

- id: dns_server
  type: string
  query: "EDI}"
  description: "Current DNS server IP address"

- id: dhcp_mode
  type: boolean
  query: "EDH}"
  description: "DHCP enabled/disabled"

- id: datetime
  type: string
  query: "ECT}"
  description: "Current date and time"

- id: serial_port_settings
  type: string
  query: "E1CP}"
  description: "Serial port baud,parity,data bits,stop bits"

- id: executive_mode
  type: integer
  query: "X5!"
  description: "Executive mode status (0-3)"

- id: session_security_level
  type: integer
  query: "ECK}"
  description: "11=User, 12=Administrator"

- id: internal_storage
  type: string
  query: "55I"
  description: "Storage usage: used, total, free, recording time, active"

- id: system_memory_usage
  type: string
  query: "3I"
  description: "Bytes used out of total KBytes"

- id: eth0_link_status
  type: string
  query: "13I"
  description: "Link state, speed (MB), mode (full/half)"

- id: hdcp_status
  type: integer
  query: "E I X50!HDCP}"
  description: "0=no sink/source, 1=HDCP detected, 2=detected no HDCP"

- id: encoder_profile
  type: integer
  query: "E X50) EPRO}"
  description: "Encoder profile (1=Base, 2=Main, 3=High)"

- id: encoding_mode
  type: integer
  query: "E 1ENCM}"
  description: "0=composite, 1=dual channel"

- id: record_resolution
  type: integer
  query: "E X50)VRES}"
  description: "Current record resolution setting"

- id: record_frame_rate
  type: integer
  query: "E X50)VFRM}"
  description: "Current record frame rate setting"

- id: video_bitrate
  type: integer
  query: "E V X50)BITR}"
  description: "Current video bit rate"

- id: audio_bitrate
  type: integer
  query: "E A X50)BITR}"
  description: "Current audio bit rate"

- id: gop_length
  type: integer
  query: "E X50)GOPL}"
  description: "Current GOP length"

- id: stream_status
  type: boolean
  query: "E X50)STRC}"
  description: "Stream enabled/disabled"

- id: rtmp_push_status
  type: boolean
  query: "E E X50)RTMP}"
  description: "RTMP push enabled/disabled"

- id: rtmp_status_primary
  type: integer
  query: "E S1*X50) RTMP}"
  description: "Primary RTMP connection status"

- id: overscan_mode
  type: integer
  query: "E X50$OSCN}"
  description: "Current overscan setting"

- id: test_pattern
  type: integer
  query: "ETEST}"
  description: "Current test pattern"

- id: output_refresh_rate
  type: integer
  query: "E RATE}"
  description: "Preview output refresh rate"

- id: hdmi_output_mode
  type: integer
  query: "E OMOD}"
  description: "HDMI output mode (0=ChA, 1=ChB, 2=Confidence)"

- id: auto_memory
  type: boolean
  query: "E AMEM}"
  description: "Auto memory enabled/disabled"

- id: input_name
  type: string
  query: "E X50! NI}"
  description: "Name assigned to input"

- id: input_aspect_ratio
  type: integer
  query: "E X50!ASPR}"
  description: "Aspect ratio setting (01=fill, 02=follow, 03=fit)"

- id: brightness
  type: integer
  query: "E X50@ BRIT}"
  description: "Brightness value 0-127"

- id: contrast
  type: integer
  query: "E X50@ CONT}"
  description: "Contrast value 0-127"

- id: color
  type: integer
  query: "E X50@ COLR}"
  description: "Color value 0-127"

- id: tint
  type: integer
  query: "E X50@ TINT}"
  description: "Tint value 0-127"

- id: selected_input_status
  type: string
  query: "42I"
  description: "Per-channel input number, name, resolution, frame rate, live status"

- id: recording_info
  type: string
  query: "1*I"
  description: "Current recording configuration (composite mode)"

- id: record_resolution_framerate
  type: string
  query: "33I"
  description: "Horizontal x Vertical resolution and frame rate"

- id: encoder_preset_name
  type: string
  query: "E 4* X56# PNAM}"
  description: "Encoder preset name"

- id: streaming_preset_name
  type: string
  query: "E 3* X53) PNAM}"
  description: "Streaming preset name"

- id: rtmp_url
  type: string
  query: "E U1*X50)RTMP}"
  description: "Primary RTMP URL"
```

## Variables
```yaml
- id: audio_level_db
  type: integer
  min: -180
  max: 240
  step: 1
  unit: "0.1 dB"
  description: "Audio level per channel (-18.0 to +24.0 dB)"

- id: brightness_value
  type: integer
  min: 0
  max: 127
  step: 1
  default: 64
  description: "Brightness adjustment"

- id: contrast_value
  type: integer
  min: 0
  max: 127
  step: 1
  default: 64
  description: "Contrast adjustment"

- id: color_value
  type: integer
  min: 0
  max: 127
  step: 1
  default: 64
  description: "Color adjustment (NTSC/PAL only)"

- id: tint_value
  type: integer
  min: 0
  max: 127
  step: 1
  default: 64
  description: "Tint adjustment (NTSC only)"

- id: video_bitrate
  type: integer
  min: 200
  max: 10000
  step: 1
  description: "Video bit rate in kbps"

- id: audio_bitrate
  type: integer
  enum: [80, 96, 128, 192, 256, 320]
  description: "Audio bit rate"

- id: gop_length
  type: integer
  min: 1
  max: 30
  step: 1
  description: "Group of pictures length"

- id: audio_delay_ms
  type: integer
  min: 0
  max: 999
  step: 1
  unit: ms
  description: "Audio delay in milliseconds"

- id: telnet_port
  type: integer
  description: "Telnet port number"

- id: connection_timeout
  type: integer
  description: "Port timeout in tens of seconds (default 300 = 30 seconds)"
```

## Events
```yaml
- id: copyright_message
  description: "Sent on connection (Telnet) or power-on (RS-232). Includes product name, firmware version, part number, date/time (Telnet only)."
  format: "© Copyright 2014-2017, Extron Electronics, SMP {model}, V{n.nn}, {part-number} Day, DD MMM YYYY HH:MM:SS"

- id: password_prompt
  description: "Sent when device is password-protected, after copyright message."
  format: "Password:"

- id: login_response
  description: "Response after correct password entry."
  format: "Login Administrator | Login User"

- id: error_response
  description: "Returned when command cannot be executed."
  format: "E10 (unrecognized command) | E12 (invalid port) | E13 (invalid parameter) | E17 (invalid command for signal type) | E18 (timeout) | E22 (busy) | E24 (privilege violation) | E26 (max connections exceeded)"
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences explicitly documented in source
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset
  - full_reset_delete_recordings
  - absolute_reset
  - delete_recording
interlocks: []
# UNRESOLVED: power-on sequencing requirements not documented; recording
# operations (start/stop) have no explicit safety interlocks documented.
```

## Notes
- SIS commands are not case sensitive.
- Each response ends with CR/LF (carriage return/line feed), represented as `]` in command tables.
- SSH connections may add an extra carriage return in the final terminator (e.g., `X1!]]` instead of `X1!]`).
- Default Ethernet connection timeout is 5 minutes; Extron recommends issuing the Query (`Q`) command periodically to keep connections alive.
- Telnet connections in verbose mode 1 or 3 report changes from other sockets and front panel operations.
- Duplicate port assignments are not permitted (returns E13 error). Remapped ports must be 1024+ unless resetting to default.
- Port numbers 0 disables the service (Telnet, web, etc.).
- SNMP community strings are referred to as passwords in the web UI.
- Horizontal centering/size values adjusted in multiples of 8. Vertical centering/size in multiples of 2.
- SMP 351 part numbers: 60-1324-01 (standard), 60-1324-02 (3G-SDI), 60-1324-11 (400GB SSD), 60-1324-12 (3G-SDI + 400GB SSD).
- SMP 352 part numbers: 60-1634-11 (standard), 60-1634-12 (3G-SDI).
- Default IP: 192.168.254.254, subnet 255.255.0.0, gateway 0.0.0.0, DHCP off.
<!-- UNRESOLVED: firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: maximum concurrent Telnet connection count not explicitly stated (E26 error exists) -->
<!-- UNRESOLVED: USB config port protocol specifics beyond SIS serial emulation -->
<!-- UNRESOLVED: SSL/SSH certificate management not documented in source excerpt -->
<!-- UNRESOLVED: precise command syntax for audio output routing command incomplete in source -->

## Provenance

```yaml
source_domains:
  - aca.im
  - extron.com
  - manualslib.com
source_urls:
  - https://aca.im/driver_docs/Extron/extron_smp300_Series.pdf
  - https://www.extron.com/download/files/userman/smp_300_series_68-2238-01_R.pdf
  - https://www.manualslib.com/manual/2867393/Extron-Electronics-Smp-300-Series.html
  - https://www.extron.com/download/
retrieved_at: 2026-05-13T02:01:02.032Z
last_checked_at: 2026-06-02T22:07:10.083Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:07:10.083Z
matched_actions: 110
action_count: 110
confidence: medium
summary: "All 110 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "USB config port protocol details beyond SIS over USB serial not fully specified"
- "command syntax for audio output routing not fully clear in source table"
- "no multi-step macro sequences explicitly documented in source"
- "power-on sequencing requirements not documented; recording"
- "firmware version compatibility ranges not stated"
- "maximum concurrent Telnet connection count not explicitly stated (E26 error exists)"
- "USB config port protocol specifics beyond SIS serial emulation"
- "SSL/SSH certificate management not documented in source excerpt"
- "precise command syntax for audio output routing command incomplete in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
