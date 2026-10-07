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
last_checked_at: 2026-10-07T17:31:20.245Z
generated_at: 2026-10-07T17:31:20.245Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "USB config port protocol details beyond SIS over USB serial not fully specified"
  - "permitted range.\""
  - "the command uses X53), defined as User/Encoder/Layout Preset number — 1 to 32 (two-digit response — 0 padding), while Streaming preset is defined as X53# — 1 to 16 (two-digit response — 0 padding).\""
  - "the command uses X54%, defined as 1 = Single recording enabled, 2 = Dual recording enabled, while Thumbnail size is defined as X54^: 0 = Normal (default), 1 = Follows archive resolution.\""
  - "X62) is not defined in the source.\""
  - "the response uses X54%, defined as 1 = Single recording enabled, 2 = Dual recording enabled, while Thumbnail size is defined as X54^: 0 = Normal (default), 1 = Follows archive resolution.\""
  - "the source places X(] in the command cell and does not clearly separate the query from its response; the documented token is retained verbatim.\""
  - "the source includes X50$] in the command cell as well as the response cell; the documented token is retained verbatim.\""
  - "no multi-step macro sequences explicitly documented in source"
  - "power-on sequencing requirements not documented; recording"
  - "firmware version compatibility ranges not stated"
  - "maximum concurrent Telnet connection count not explicitly stated (E26 error exists)"
  - "USB config port protocol specifics beyond SIS serial emulation"
  - "SSL/SSH certificate management not documented in source excerpt"
  - "precise command syntax for audio output routing command incomplete in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T17:31:20.245Z
  matched_actions: 302
  action_count: 302
  confidence: medium
  summary: "All 302 action units match source SIS commands literally, and transport values are supported. Omitted source rows are only set/reset/decrement variants of represented commands. (15 unresolved item(s) noted in Known Gaps.)"
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
      description: "Writable parameters: 0=Contributor, 1=Coverage, 2=Presenter, 4=Description, 5=Format, 7=Language, 8=Publisher, 9=Relation, 10=Rights, 11=Source, 12=Subject, 13=Title, 14=Type, 15=SystemName, 16=Course; 3=Date and 6=Identifier are view only"
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

# Additional documented commands; source symbols are retained literally.
- id: reset_unit_name
  label: Reset Unit Name
  kind: action
  command: "E CN}"
  response: "IpnX10)]"

- id: reset_snmp_contact
  label: Reset SNMP Contact
  kind: action
  command: "E C • SNMP}"
  response: "SnmpC*Not•Specified]"

- id: reset_snmp_location
  label: Reset SNMP Location
  kind: action
  command: "E L•SNMP}"
  response: "SnmpL*Not•Specified]"

- id: reset_snmp_public_community
  label: Reset SNMP Public Community String
  kind: action
  command: "E P•SNMP}"
  response: "SnmpP*public]"

- id: set_snmp_private_community
  label: Set SNMP Private Community String
  kind: action
  params:
    - name: community
      type: string
      description: "X62$: SNMP private community string, up to 64 characters (default = private). SNMP names and community strings can be up to 64 alphanumeric characters including hyphens, underscores and periods."
  command: "E X X62$SNMP}"
  response: "SnmpX* X62$]"

- id: reset_snmp_private_community
  label: Reset SNMP Private Community String
  kind: action
  command: "E X•SNMP}"
  response: "SnmpX*private]"

- id: set_time_zone
  label: Set Time Zone
  kind: action
  params:
    - name: time_zone
      type: string
      description: "X1$: Time zone acronym (2 to 6 letters)"
  command: "E X1$* TZON}"
  response: "Tzon • X1$*X1%]"

- id: set_ip_address_subnet_gateway
  label: Set IP Address Subnet Mask and Gateway
  kind: action
  params:
    - name: ip
      type: string
      description: "First X1^: IP address in dotted decimal notation"
    - name: mask
      type: string
      description: "X1&: Subnet mask. Default: 255.255.0.0 (no padding)"
    - name: gateway
      type: string
      description: "Second X1^: IP address in dotted decimal notation. Default gateway IP address: 0.0.0.0"
  command: "E1*X1^*X1&*X1^CISG}"
  response: "Cisg1*IP**/**subnet bits*gateway]"

- id: set_serial_receive_timeout
  label: Set Serial Port Receive Timeout
  kind: action
  params:
    - name: first_character_timeout
      type: integer
      description: "X1(: Time in tens of milliseconds to wait for characters coming into a serial port before terminating (min = 0, max = 32767, default = 10 = 100 ms). The response is returned with leading zeros."
    - name: inter_character_timeout
      type: integer
      description: "X2): Time in tens of milliseconds to wait between characters coming into a serial port before terminating (min = 0, max = 32767, default = 2 = 20 ms). The response is returned with leading zeros. Commands using both X1( and X2) must have both values = 0 or both set to non-zero."
    - name: priority
      type: integer
      description: "X2@: Priority status for receiving timeouts — 0 = Use Send data string command parameters (if they exist) (default). 1 = Use Configure receive timeout command parameters instead."
    - name: length_or_delimiter
      type: string
      description: "X2!: Parameter to set either Length of message to receive or Delimiter value. L = # = byte count (min = 0, max = 32767, default = 0L = 0 byte count). D = Decimal value for ASCII character. (min = 0, max = 00255, default = 00000L). Value is placed prior to parameter: 3 byte length = 3L and ASCII 0A delimiter is 10D. The parameter is case sensitive, and must use capital D or capital L. The response is returned with leading zeros."
  command: "E1*X1(*X2)*X2@*X2! CE}"
  response: "Cpn01•CceX1(,X2),X2@,X2!]"

- id: set_current_port_timeout
  label: Set Current Port Timeout
  kind: action
  params:
    - name: timeout
      type: integer
      description: "X6(: Port timeout in tens of seconds (zero padded. Default: 00030 = 300 seconds). UNRESOLVED: permitted range."
  command: "E0 *X6(TC}"
  response: "Pti 0 *X6(]"

- id: set_global_ip_port_timeout
  label: Set Global IP Port Timeout
  kind: action
  params:
    - name: timeout
      type: integer
      description: "X6(: Port timeout in tens of seconds (zero padded. Default: 00030 = 300 seconds). UNRESOLVED: permitted range."
  command: "E1*X6(TC}"
  response: "Pti1 *X6(]"

- id: erase_current_directory_files
  label: Erase Current Directory and Files
  kind: action
  command: "E /EF}"
  response: "Ddl]"

- id: erase_current_directory_subdirectories
  label: Erase Current Directory and Subdirectories
  kind: action
  command: "E //EF}"
  response: "Ddl]"

- id: perform_auto_image
  label: Perform Auto-Image to Current Output
  kind: action
  params:
    - name: channel
      type: integer
      description: "X50@: Output channel: 1 = A (input 1 and 2), 2 = B (input 3, 4, and 5)"
  command: "X50@ A Img}"
  response: "X50@]"

- id: enable_auto_memory
  label: Enable Auto Memory
  kind: action
  command: "E 1AMEM}"
  response: "Amem1]"

- id: disable_auto_memory
  label: Disable Auto Memory
  kind: action
  command: "E 0AMEM}"
  response: "Amem0]"

- id: enable_audio_only_recording
  label: Enable Audio-Only Recording
  kind: action
  command: "E A1 * 1RCDR}"
  response: "RcdrA1 *1]"

- id: disable_audio_only_recording
  label: Disable Audio-Only Recording
  kind: action
  command: "E A1 * 0RCDR}"
  response: "RcdrA1 *0]"

- id: enable_rcp_executive_mode
  label: Enable RCP 101 Executive Mode
  kind: action
  command: "99 * 1X"
  response: "Exe99*1]"

- id: disable_rcp_executive_mode
  label: Disable RCP 101 Executive Mode
  kind: action
  command: "99 * 0X"
  response: "Exe99*0]"

- id: set_user_preset_name
  label: Set User Preset Name
  kind: action
  params:
    - name: preset
      type: integer
      description: "X53): User/Encoder/Layout Preset number — 1 to 32 (two-digit response — 0 padding)"
    - name: name
      type: string
      description: "X53!: Preset name — Up to 16 characters"
  command: "E1*X53),X53!PNAM}"
  response: "Pnam1*X53),X53!]"

- id: set_input_preset_name
  label: Set Input Preset Name
  kind: action
  params:
    - name: preset
      type: integer
      description: "X53@: Input preset number — 1 to 128"
    - name: name
      type: string
      description: "X53!: Preset name — Up to 16 characters"
  command: "E2*X53@,X53!PNAM}"
  response: "Pnam2*X53@,X53!]"

- id: delete_input_preset
  label: Delete Input Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "X53@: Input preset number — 1 to 128"
  command: "EX2*X53@PRST}"
  response: "PrstX2*X53@]"

- id: recall_layout_preset_without_inputs
  label: Recall Layout Preset Without Input Selections
  kind: action
  params:
    - name: preset
      type: integer
      description: "X53): User/Encoder/Layout Preset number — 1 to 32 (two-digit response — 0 padding)"
  command: "8*X53)."
  response: "8RprX53)]"

- id: set_layout_preset_name
  label: Set Layout Preset Name
  kind: action
  params:
    - name: preset
      type: integer
      description: "X53): User/Encoder/Layout Preset number — 1 to 32 (two-digit response — 0 padding)"
    - name: name
      type: string
      description: "X53!: Preset name — Up to 16 characters"
  command: "E7*X53),X53!PNAM}"
  response: "Pnam7*X53),X53!]"

- id: reset_layout_preset
  label: Reset Layout Preset to Defaults
  kind: action
  params:
    - name: preset
      type: integer
      description: "X53): User/Encoder/Layout Preset number — 1 to 32 (two-digit response — 0 padding)"
  command: "EX7 *X53)PRST}"
  response: "PrstX7*X53)]"

- id: recall_confidence_layout_preset
  label: Recall Layout Preset for Confidence
  kind: action
  params:
    - name: preset
      type: integer
      description: "X53): User/Encoder/Layout Preset number — 1 to 32 (two-digit response — 0 padding)"
  command: "9 * 3* X53)."
  response: "9Rpr3 *X53)]"

- id: save_encoder_preset
  label: Save Encoder Preset
  kind: action
  params:
    - name: stream
      type: integer
      description: "X50): Stream selection: 1 = Archive Channel A, 2 = Archive Channel B (Available for Dual Mode only), 3 = Confidence"
    - name: preset
      type: integer
      description: "X56#: Encoder Presets — 1 to 32"
  command: "4* X50) * X56# ,"
  response: "4Spr X50) * X56#]"

- id: set_encoder_preset_name
  label: Set Encoder Preset Name
  kind: action
  params:
    - name: preset
      type: integer
      description: "X56#: Encoder Presets — 1 to 32"
    - name: name
      type: string
      description: "X51$: Input name, up to 16 characters"
  command: "E 4* X56# ,X51$ PNAM}"
  response: "Pnam4* X56# , X51$]"

- id: reset_encoder_preset
  label: Reset Encoder Preset to Default
  kind: action
  params:
    - name: preset
      type: integer
      description: "X56#: Encoder Presets — 1 to 32"
  command: "E X4* X56# PRST}"
  response: "PrstX4*X56#]"

- id: save_streaming_preset
  label: Save Streaming Preset
  kind: action
  params:
    - name: stream
      type: integer
      description: "X50): Stream selection: 1 = Archive Channel A, 2 = Archive Channel B (Available for Dual Mode only), 3 = Confidence"
    - name: preset
      type: integer
      description: "UNRESOLVED: the command uses X53), defined as User/Encoder/Layout Preset number — 1 to 32 (two-digit response — 0 padding), while Streaming preset is defined as X53# — 1 to 16 (two-digit response — 0 padding)."
  command: "3* X50) * X53) ,"
  response: "3Spr X50) * X53)]"

- id: set_streaming_preset_name
  label: Set Streaming Preset Name
  kind: action
  params:
    - name: preset
      type: integer
      description: "UNRESOLVED: the command uses X53), defined as User/Encoder/Layout Preset number — 1 to 32 (two-digit response — 0 padding), while Streaming preset is defined as X53# — 1 to 16 (two-digit response — 0 padding)."
    - name: name
      type: string
      description: "X51$: Input name, up to 16 characters"
  command: "E 3* X53) ,X51$ PNAM}"
  response: "Pnam3* X53) , X51$]"

- id: delete_streaming_preset
  label: Delete or Clear Streaming Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "UNRESOLVED: the command uses X53), defined as User/Encoder/Layout Preset number — 1 to 32 (two-digit response — 0 padding), while Streaming preset is defined as X53# — 1 to 16 (two-digit response — 0 padding)."
  command: "E X3* X53) PRST}"
  response: "PrstX3*X53)]"

- id: increment_pixel_phase
  label: Increment Pixel Phase
  kind: action
  command: "E 3 + PHAS}"
  response: "Phas03 * X60#]"

- id: decrement_pixel_phase
  label: Decrement Pixel Phase
  kind: action
  command: "E 3 - PHAS}"
  response: "Phas03 * X60#]"

- id: increment_total_pixels
  label: Increment Total Pixels
  kind: action
  command: "E 3 + TPIX}"
  response: "Tpix 03 * X60%]"

- id: decrement_total_pixels
  label: Decrement Total Pixels
  kind: action
  command: "E 3 - TPIX}"
  response: "Tpix 03 * X60%]"

- id: increment_horizontal_start
  label: Increment Horizontal Start
  kind: action
  command: "E 3 + HSRT}"
  response: "Hsrt 03 * X60$]"

- id: decrement_horizontal_start
  label: Decrement Horizontal Start
  kind: action
  command: "E 3 - HSRT}"
  response: "Hsrt 03 * X60$]"

- id: set_vertical_start
  label: Set Vertical Start
  kind: action
  params:
    - name: value
      type: integer
      description: "X60$: Horizontal and vertical start — 0 to 255 (default = 128)"
  command: "E 3 * X60$ VSRT}"
  response: "Vsrt 03 * X60$]"

- id: increment_vertical_start
  label: Increment Vertical Start
  kind: action
  command: "E 3 + VSRT}"
  response: "Vsrt 03 * X60$]"

- id: decrement_vertical_start
  label: Decrement Vertical Start
  kind: action
  command: "E 3 - VSRT}"
  response: "Vsrt 03 * X60$]"

- id: increment_active_pixels
  label: Increment Active Pixels
  kind: action
  command: "E 3 + APIX}"
  response: "Apix03 * X60&]"

- id: decrement_active_pixels
  label: Decrement Active Pixels
  kind: action
  command: "E 3 - APIX}"
  response: "Apix03 * X60&]"

- id: increment_active_lines
  label: Increment Active Lines
  kind: action
  command: "E 3 + ALIN}"
  response: "Alin03 * X60^]"

- id: decrement_active_lines
  label: Decrement Active Lines
  kind: action
  command: "E 3 - ALIN}"
  response: "Alin03 * X60^]"

- id: increment_color
  label: Increment Color
  kind: action
  params:
    - name: channel
      type: integer
      description: "X50@: Output channel: 1 = A (input 1 and 2), 2 = B (input 3, 4, and 5)"
  command: "E X50@ + COLR}"
  response: "Colr X50@*X60*]"

- id: increment_tint
  label: Increment Tint
  kind: action
  params:
    - name: channel
      type: integer
      description: "X50@: Output channel: 1 = A (input 1 and 2), 2 = B (input 3, 4, and 5)"
  command: "E X50@ + TINT}"
  response: "Tint X50@ *X60*]"

- id: increment_contrast
  label: Increment Contrast
  kind: action
  params:
    - name: channel
      type: integer
      description: "X50@: Output channel: 1 = A (input 1 and 2), 2 = B (input 3, 4, and 5)"
  command: "E X50@ + CONT}"
  response: "Cont X50@ *X60*]"

- id: increment_brightness
  label: Increment Brightness
  kind: action
  params:
    - name: channel
      type: integer
      description: "X50@: Output channel: 1 = A (input 1 and 2), 2 = B (input 3, 4, and 5)"
  command: "E X50@ + BRIT}"
  response: "Brit X50@ *X60*]"

- id: increment_horizontal_centering
  label: Increment Horizontal Centering
  kind: action
  params:
    - name: channel
      type: integer
      description: "X50@: Output channel: 1 = A (input 1 and 2), 2 = B (input 3, 4, and 5)"
  command: "E 1*X50@ + HCTR}"
  response: "Hctr X50@*X60(]"

- id: increment_horizontal_size
  label: Increment Horizontal Size
  kind: action
  params:
    - name: channel
      type: integer
      description: "X50@: Output channel: 1 = A (input 1 and 2), 2 = B (input 3, 4, and 5)"
  command: "E 1*X50@ + HSIZ}"
  response: "Hsiz X50@*X61@]"

- id: increment_vertical_centering
  label: Increment Vertical Centering
  kind: action
  params:
    - name: channel
      type: integer
      description: "X50@: Output channel: 1 = A (input 1 and 2), 2 = B (input 3, 4, and 5)"
  command: "E 1*X50@ + VCTR}"
  response: "VctrX50@*X61!]"

- id: increment_vertical_size
  label: Increment Vertical Size
  kind: action
  params:
    - name: channel
      type: integer
      description: "X50@: Output channel: 1 = A (input 1 and 2), 2 = B (input 3, 4, and 5)"
  command: "E 1*X50@ + VSIZ}"
  response: "Vsiz X50@*X61#]"

- id: enable_secondary_recording
  label: Enable Secondary Recording
  kind: action
  command: "E X1*2RCDR}"
  response: "Rcdr X1*2]"

- id: set_archive_chb_recording
  label: Set Archive Channel B Recording
  kind: action
  params:
    - name: enabled
      type: integer
      description: "X(: 0 = Disabled/unassigned/off/unmuted (default), 1 = Enabled/assigned/on/muted"
  command: "E X2* X(RCDR}"
  response: "Rcdr X2*X(]"

- id: set_recording_thumbnail_size
  label: Set Recording Thumbnail Size
  kind: action
  params:
    - name: value
      type: integer
      description: "UNRESOLVED: the command uses X54%, defined as 1 = Single recording enabled, 2 = Dual recording enabled, while Thumbnail size is defined as X54^: 0 = Normal (default), 1 = Follows archive resolution."
  command: "E T X54% RCDR}"
  response: "RcdrT X54%]"

- id: enable_single_recording
  label: Enable Single Recording in Composite Mode
  kind: action
  command: "E X1*1RCDR}"
  response: "Rcdr X1*1]"

- id: disable_composite_recording
  label: Disable Recording in Composite Mode
  kind: action
  command: "E X1*0 RCDR}"
  response: "Rcdr X1*0]"

- id: return_to_root_directory
  label: Return to Root Directory
  kind: action
  command: "E / CJ}"
  response: "Dirl/]"

- id: up_one_directory
  label: Up One Directory
  kind: action
  command: "E ../ CJ}"
  response: "Dirl path/directory/]"

- id: reset_serial_port
  label: Reset Serial Port
  kind: action
  command: "E1*9600,n,8,1CP}"
  response: "Cpn 01•CcpX2%,X2^,X2&,X2*]"
```

## Feedbacks
```yaml
- id: firmware_version
  type: string
  query: "Q"
  query_command: "Q"
  response: "X1!]"
  description: "Firmware version to 2 decimal places"

- id: firmware_build_version
  type: string
  query: "*Q"
  query_command: "*Q"
  response: "X1!]"
  description: "Firmware version plus build number"

- id: model_name
  type: string
  query: "1I"
  query_command: "1I"
  description: "Model name (e.g. SMP 351)"

- id: part_number
  type: string
  query: "N"
  query_command: "N"
  description: "Part number (e.g. 60-1324-01)"

- id: unit_name
  type: string
  query: "ECN}"
  query_command: "ECN}"
  description: "Configured unit name"

- id: verbose_mode
  type: integer
  query: "ECV}"
  query_command: "ECV}"
  description: "Current verbose mode (0-3)"

- id: active_alarms
  type: string
  query: "39I"
  query_command: "39I"
  description: "Active alarms or 'None active'"

- id: telnet_connections
  type: integer
  query: "ECC}"
  query_command: "ECC}"
  description: "Number of active IP connections"

- id: telnet_port
  type: integer
  query: "E MT}"
  query_command: "E MT}"
  description: "Current Telnet port assignment"

- id: web_port
  type: integer
  query: "E MH}"
  query_command: "E MH}"
  description: "Current web port assignment"

- id: selected_input
  type: string
  query: "X50@!"
  query_command: "X50@!"
  description: "Selected input for given channel"

- id: input_selection_channel
  type: string
  query: "32I"
  query_command: "32I"
  description: "ChA and ChB input selections"

- id: record_status
  type: enum
  values: [stopped, recording, paused]
  query: "E Y RCDR}"
  query_command: "E Y RCDR}"
  description: "Current recording status"

- id: record_destination
  type: string
  query: "E D RCDR}"
  query_command: "E D RCDR}"
  description: "Current recording destination"

- id: recording_duration
  type: string
  query: "35I"
  query_command: "35I"
  description: "Recording elapsed time HH:MM:SS"

- id: record_time_remaining
  type: string
  query: "36I"
  query_command: "36I"
  description: "Time remaining for current recording"

- id: video_mute_status
  type: boolean
  query: "X50@B"
  query_command: "X50@B"
  description: "Video mute status for given output channel"

- id: audio_mute_status
  type: boolean
  query: "E M X50^ AU}"
  query_command: "E M X50^ AU}"
  description: "Audio mute status for given audio channel"

- id: audio_level
  type: integer
  query: "E G X50^ AU}"
  query_command: "E G X50^ AU}"
  description: "Audio level in 0.1 dB steps"

- id: front_panel_audio_levels
  type: string
  query: "34I"
  query_command: "34I"
  description: "Left*Right audio level indicators"

- id: ip_address
  type: string
  query: "ECI}"
  query_command: "ECI}"
  description: "Current IP address"

- id: subnet_mask
  type: string
  query: "ECS}"
  query_command: "ECS}"
  description: "Current subnet mask"

- id: gateway_address
  type: string
  query: "ECG}"
  query_command: "ECG}"
  description: "Current gateway IP address"

- id: mac_address
  type: string
  query: "ECH}"
  query_command: "ECH}"
  description: "Hardware MAC address"

- id: dns_server
  type: string
  query: "EDI}"
  query_command: "EDI}"
  description: "Current DNS server IP address"

- id: dhcp_mode
  type: boolean
  query: "EDH}"
  query_command: "EDH}"
  description: "DHCP enabled/disabled"

- id: datetime
  type: string
  query: "ECT}"
  query_command: "ECT}"
  description: "Current date and time"

- id: serial_port_settings
  type: string
  query: "E1CP}"
  query_command: "E1CP}"
  description: "Serial port baud,parity,data bits,stop bits"

- id: executive_mode
  type: integer
  query: "X5!"
  query_command: "X5!"
  description: "Executive mode status (0-3)"

- id: session_security_level
  type: integer
  query: "ECK}"
  query_command: "ECK}"
  description: "11=User, 12=Administrator"

- id: internal_storage
  type: string
  query: "55I"
  query_command: "55I"
  description: "Storage usage: used, total, free, recording time, active"

- id: system_memory_usage
  type: string
  query: "3I"
  query_command: "3I"
  description: "Bytes used out of total KBytes"

- id: eth0_link_status
  type: string
  query: "13I"
  query_command: "13I"
  description: "Link state, speed (MB), mode (full/half)"

- id: hdcp_status
  type: integer
  query: "E I X50!HDCP}"
  query_command: "E I X50!HDCP}"
  description: "0=no sink/source, 1=HDCP detected, 2=detected no HDCP"

- id: encoder_profile
  type: integer
  query: "E X50) EPRO}"
  query_command: "E X50) EPRO}"
  description: "Encoder profile (1=Base, 2=Main, 3=High)"

- id: encoding_mode
  type: integer
  query: "E 1ENCM}"
  query_command: "E 1ENCM}"
  description: "0=composite, 1=dual channel"

- id: record_resolution
  type: integer
  query: "E X50)VRES}"
  query_command: "E X50)VRES}"
  description: "Current record resolution setting"

- id: record_frame_rate
  type: integer
  query: "E X50)VFRM}"
  query_command: "E X50)VFRM}"
  description: "Current record frame rate setting"

- id: video_bitrate
  type: integer
  query: "E V X50)BITR}"
  query_command: "E V X50)BITR}"
  description: "Current video bit rate"

- id: audio_bitrate
  type: integer
  query: "E A X50)BITR}"
  query_command: "E A X50)BITR}"
  description: "Current audio bit rate"

- id: gop_length
  type: integer
  query: "E X50)GOPL}"
  query_command: "E X50)GOPL}"
  description: "Current GOP length"

- id: stream_status
  type: boolean
  query: "E X50)STRC}"
  query_command: "E X50)STRC}"
  description: "Stream enabled/disabled"

- id: rtmp_push_status
  type: boolean
  query: "E E X50)RTMP}"
  query_command: "E E X50)RTMP}"
  description: "RTMP push enabled/disabled"

- id: rtmp_status_primary
  type: integer
  query: "E S1*X50) RTMP}"
  query_command: "E S1*X50) RTMP}"
  description: "Primary RTMP connection status"

- id: overscan_mode
  type: integer
  query: "E X50$OSCN}"
  query_command: "E X50$OSCN}"
  description: "Current overscan setting"

- id: test_pattern
  type: integer
  query: "ETEST}"
  query_command: "ETEST}"
  description: "Current test pattern"

- id: output_refresh_rate
  type: integer
  query: "E RATE}"
  query_command: "E RATE}"
  description: "Preview output refresh rate"

- id: hdmi_output_mode
  type: integer
  query: "E OMOD}"
  query_command: "E OMOD}"
  description: "HDMI output mode (0=ChA, 1=ChB, 2=Confidence)"

- id: auto_memory
  type: boolean
  query: "E AMEM}"
  query_command: "E AMEM}"
  description: "Auto memory enabled/disabled"

- id: input_name
  type: string
  query: "E X50! NI}"
  query_command: "E X50! NI}"
  description: "Name assigned to input"

- id: input_aspect_ratio
  type: integer
  query: "E X50!ASPR}"
  query_command: "E X50!ASPR}"
  description: "Aspect ratio setting (01=fill, 02=follow, 03=fit)"

- id: brightness
  type: integer
  query: "E X50@ BRIT}"
  query_command: "E X50@ BRIT}"
  description: "Brightness value 0-127"

- id: contrast
  type: integer
  query: "E X50@ CONT}"
  query_command: "E X50@ CONT}"
  description: "Contrast value 0-127"

- id: color
  type: integer
  query: "E X50@ COLR}"
  query_command: "E X50@ COLR}"
  description: "Color value 0-127"

- id: tint
  type: integer
  query: "E X50@ TINT}"
  query_command: "E X50@ TINT}"
  description: "Tint value 0-127"

- id: selected_input_status
  type: string
  query: "42I"
  query_command: "42I"
  description: "Per-channel input number, name, resolution, frame rate, live status"

- id: recording_info
  type: string
  query: "1*I"
  query_command: "1*I"
  description: "Current recording configuration (composite mode)"

- id: record_resolution_framerate
  type: string
  query: "33I"
  query_command: "33I"
  description: "Horizontal x Vertical resolution and frame rate"

- id: encoder_preset_name
  type: string
  query: "E 4* X56# PNAM}"
  query_command: "E 4* X56# PNAM}"
  description: "Encoder preset name"

- id: streaming_preset_name
  type: string
  query: "E 3* X53) PNAM}"
  query_command: "E 3* X53) PNAM}"
  description: "Streaming preset name"

- id: rtmp_url
  type: string
  query: "E U1*X50)RTMP}"
  query_command: "E U1*X50)RTMP}"
  description: "Primary RTMP URL"

- id: verbose_version_info
  type: string
  query: "0Q"
  query_command: "0Q"
  response: "Sum of 2Q-3Q-4Q]"
  description: "Show bootstrap, factory-installed, and updated firmware version."

- id: bootstrap_version
  type: string
  query: "2Q"
  query_command: "2Q"
  response: "X1!]"
  description: "The bootstrap firmware is not user replaceable, but you may need this information for troubleshooting."

- id: factory_firmware_version
  type: string
  query: "3Q"
  query_command: "3Q"
  response: "X1! plus Web ver.-desc-UL date/time]"
  description: "Factory installed firmware is not user replaceable. This firmware is the version the SMP reverts to after a mode 1 reset."

- id: updated_firmware_version
  type: string
  query: "4Q"
  query_command: "4Q"
  response: "X1! plus Web ver.-desc-UL date/time]"
  description: "Use this command to find out which version of firmware has been uploaded into the SMP 300 Series."

- id: model_description
  type: string
  query: "2I"
  query_command: "2I"
  description: "Streaming•Media•Processor"

- id: file_transfer_configuration
  type: string
  query: "38I"
  query_command: "38I"
  description: "File transfer configuration"

- id: archive_cha_encoder_presets
  type: string
  query: "43I"
  query_command: "43I"
  response: "<DefaultPreset#>*<DefaultPresetName>,<SelectedPreset#>*<SelectedPresetName>]"
  description: "Archive/ChA encoder presets"

- id: chb_encoder_presets
  type: string
  query: "44I"
  query_command: "44I"
  response: "<DefaultPreset#>*<DefaultPresetName>,<SelectedPreset#>*<SelectedPresetName>]"
  description: "CHB encoder presets (Dual Channel only)"

- id: confidence_encoder_presets
  type: string
  query: "45I"
  query_command: "45I"
  response: "<DefaultPreset#>*<DefaultPresetName>,<SelectedPreset#>*<SelectedPresetName>]"
  description: "Confidence encoder presets"

- id: archive_cha_streaming_presets
  type: string
  query: "46I"
  query_command: "46I"
  response: "<SelectedPreset#>*<SelectedPresetName>]"
  description: "Archive/ChA streaming presets"

- id: chb_streaming_presets
  type: string
  query: "47I"
  query_command: "47I"
  response: "<SelectedPreset#>*<SelectedPresetName>]"
  description: "ChB streaming presets"

- id: confidence_streaming_presets
  type: string
  query: "48I"
  query_command: "48I"
  response: "<SelectedPreset#>*<SelectedPresetName>]"
  description: "Confidence streaming presets"

- id: layout_preset_status
  type: string
  query: "49I"
  query_command: "49I"
  response: "<DefaultPreset#>*<DefaultPresetName>,<SelectedPreset#>*<SelectedPresetName>]"
  description: "Layout preset"

- id: front_usb_storage
  type: string
  query: "56I"
  query_command: "56I"
  response: "<name>*<used>*<total>*free>*<recording_time>*<active>,..."
  description: "Front USB storage"

- id: rear_usb_storage
  type: string
  query: "57I"
  query_command: "57I"
  response: "<name>*<used>*<total>*free>*<recording_time>*<active>,..."
  description: "Rear USB storage"

- id: rcp_usb_storage
  type: string
  query: "58I"
  query_command: "58I"
  response: "<name>*<used>*<total>*free>*<recording_time>*<active>..."
  description: "RCP USB storage"

- id: snmp_port
  type: integer
  query: "E A PMAP}"
  query_command: "E A PMAP}"
  response: "[port#]]"
  description: "Current SNMP port assignment"

- id: ssh_port
  type: integer
  query: "E B PMAP}"
  query_command: "E B PMAP}"
  response: "[port#]]"
  description: "Current SSH port assignment"

- id: ssl_port
  type: integer
  query: "E S PMAP}"
  query_command: "E S PMAP}"
  response: "[port#]]"
  description: "Current SSL port assignment"

- id: snmp_contact
  type: string
  query: "E CSNMP}"
  query_command: "E CSNMP}"
  response: "X62!]"
  description: "SNMP contact name text, up to 64 characters (default = Not Specified)"

- id: snmp_location
  type: string
  query: "E LSNMP}"
  query_command: "E LSNMP}"
  response: "X62@]"
  description: "SNMP location, up to 64 characters (default = Not Specified)"

- id: snmp_public_community
  type: string
  query: "E PSNMP}"
  query_command: "E PSNMP}"
  response: "X62#]"
  description: "SNMP public community string, up to 64 characters (default = public)"

- id: snmp_private_community
  type: string
  query: "E XSNMP}"
  query_command: "E XSNMP}"
  response: "X62$]"
  description: "SNMP private community string, up to 64 characters (default = private)"

- id: snmp_access
  type: string
  query: "E ESNMP}"
  query_command: "E ESNMP}"
  response: "X62)]"
  description: "SNMP access view. UNRESOLVED: X62) is not defined in the source."

- id: time_zone
  type: string
  query: "ETZON}"
  query_command: "ETZON}"
  response: "X1$*X1%]"
  description: "Time zone acronym (2 to 6 letters); Greenwich Mean Time (GMT) offset value: -12:00 to 14:00."

- id: ip_address_subnet_gateway
  type: string
  query: "E1CISG}"
  query_command: "E1CISG}"
  response: "IP**/**subnet bits*gateway]"
  description: "IP address, subnet mask, gateway"

- id: serial_receive_timeout
  type: string
  query: "E1CE}"
  query_command: "E1CE}"
  response: "X1(,X2),X2@,X2!]"
  description: "Serial port receive timeout configuration"

- id: current_port_timeout
  type: integer
  query: "E0 TC}"
  query_command: "E0 TC}"
  response: "X6(]"
  description: "Port timeout in tens of seconds (zero padded. Default: 00030 = 300 seconds)"

- id: global_ip_port_timeout
  type: integer
  query: "E1 TC}"
  query_command: "E1 TC}"
  response: "X6(]"
  description: "Global IP port timeout in tens of seconds (zero padded. Default: 00030 = 300 seconds)"

- id: administrator_password_status
  type: string
  query: "E CA}"
  query_command: "E CA}"
  response: "****]"
  description: "If no password is set, the response is ] (no ****)."

- id: user_password_status
  type: string
  query: "E CU}"
  query_command: "E CU}"
  response: "****]"
  description: "View user password"

- id: current_directory
  type: string
  query: "ECJ}"
  query_command: "ECJ}"
  response: "path/directory/]"
  description: "Current directory"

- id: audio_only_recording
  type: boolean
  query: "E A1RCDR}"
  query_command: "E A1RCDR}"
  response: "X(]"
  description: "Audio-only recording status"

- id: rcp_executive_mode
  type: boolean
  query: "99 * X"
  query_command: "99 * X"
  response: "X(]"
  description: "RCP 101 executive mode status"

- id: folder_share_enabled
  type: boolean
  query: "E E1SHRF}"
  query_command: "E E1SHRF}"
  response: "X(]"
  description: "SMP recording folder shared on SMD"

- id: folder_share_path
  type: string
  query: "E P1SHRF}"
  query_command: "E P1SHRF}"
  response: "< SMP IP>:/var/uf/recordings]"
  description: "Recording folder share path"

- id: output_metadata
  type: string
  query: "EMX53*RCDR}"
  query_command: "EMX53*RCDR}"
  response: "X53(]"
  description: "For composite mode only. X53*: Metadata parameter: 0 = Contributor, 1 = Coverage, 2 = Presenter, 3 = Date (view only), 4 = Description, 5 = Format, 6 = Identifier (view only), 7 = Language, 8 = Publisher, 9 = Relation, 10 = Rights, 11 = Source, 12 = Subject, 13 = Title, 14 = Type, 15 = SystemName, 16 = Course. Metadata value — 127 character maximum."

- id: user_preset_name
  type: string
  query: "E1*X53)PNAM}"
  query_command: "E1*X53)PNAM}"
  response: "X53!]"
  description: "X53): User/Encoder/Layout Preset number — 1 to 32 (two-digit response — 0 padding). Preset name — Up to 16 characters."

- id: user_presets
  type: string
  query: "52*X50!#"
  query_command: "52*X50!#"
  response: "X(1 X(2X(3...X(16]"
  description: "Query user presets. X50!: Input number 1 to 5."

- id: input_preset_name
  type: string
  query: "E2*X53@PNAM}"
  query_command: "E2*X53@PNAM}"
  response: "X53!]"
  description: "X53@: Input preset number — 1 to 128. Preset name — Up to 16 characters."

- id: input_presets
  type: string
  query: "51#"
  query_command: "51#"
  response: "X(1 X(2X(3...X(128]"
  description: "Query input presets"

- id: layout_preset_name
  type: string
  query: "E7*X53)PNAM}"
  query_command: "E7*X53)PNAM}"
  response: "X53!]"
  description: "For composite mode only. X53): User/Encoder/Layout Preset number — 1 to 32 (two-digit response — 0 padding). Preset name — Up to 16 characters."

- id: stream_name
  type: string
  query: "EN X50) STRC}"
  query_command: "EN X50) STRC}"
  response: "X50%]"
  description: "Stream name. Verbose mode 2/3. X50): Stream selection: 1 = Archive Channel A, 2 = Archive Channel B (Available for Dual Mode only), 3 = Confidence."

- id: pixel_phase
  type: integer
  query: "E 3 PHAS}"
  query_command: "E 3 PHAS}"
  response: "X60#]"
  description: "Input 3 only. Pixel phase adjustment — 0 to 63 (default = 32)"

- id: total_pixels
  type: integer
  query: "E 3 TPIX}"
  query_command: "E 3 TPIX}"
  response: "X60%]"
  description: "Input 3 only. Total pixels — Up to +512 of the default value for the detected rate"

- id: horizontal_start
  type: integer
  query: "E 3 HSRT}"
  query_command: "E 3 HSRT}"
  response: "X60$]"
  description: "Input 3 only. Horizontal and vertical start — 0 to 255 (default = 128)"

- id: vertical_start
  type: integer
  query: "E 3 VSRT}"
  query_command: "E 3 VSRT}"
  response: "X60$]"
  description: "Input 3 only. Horizontal and vertical start — 0 to 255 (default = 128)"

- id: active_pixels
  type: integer
  query: "E 3 APIX}"
  query_command: "E 3 APIX}"
  response: "X60&]"
  description: "Input 3 only. Active pixels — Up to +512 of the default value for the detected resolution"

- id: active_lines
  type: integer
  query: "E 3 ALIN}"
  query_command: "E 3 ALIN}"
  response: "X60^]"
  description: "Input 3 only. Active lines — Up to +256 of the default value for the detected resolution"

- id: horizontal_centering
  type: integer
  query: "E 1*X50@ HCTR}"
  query_command: "E 1*X50@ HCTR}"
  response: "X60(]"
  description: "For Composite mode only. X50@: Output channel: 1 = A (input 1 and 2), 2 = B (input 3, 4, and 5). Horizontal centering — Varies based on archive resolution. Horizontal centering and horizontal size values are adjusted in multiples of 8."

- id: horizontal_size
  type: integer
  query: "E 1*X50@ HSIZ}"
  query_command: "E 1*X50@ HSIZ}"
  response: "X61@]"
  description: "For Composite mode only. X50@: Output channel: 1 = A (input 1 and 2), 2 = B (input 3, 4, and 5). Horizontal size — 120 to 4096. Horizontal centering and horizontal size values are adjusted in multiples of 8."

- id: vertical_centering
  type: integer
  query: "E 1*X50@ VCTR}"
  query_command: "E 1*X50@ VCTR}"
  response: "X61!]"
  description: "For Composite mode only. X50@: Output channel: 1 = A (input 1 and 2), 2 = B (input 3, 4, and 5). Vertical centering — Varies based on archive resolution. Vertical centering and vertical size values are adjusted in multiples of 2."

- id: vertical_size
  type: integer
  query: "E 1*X50@ VSIZ}"
  query_command: "E 1*X50@ VSIZ}"
  response: "X61#]"
  description: "For Composite mode only. X50@: Output channel: 1 = A (input 1 and 2), 2 = B (input 3, 4, and 5). Vertical size — 64 to 4096. Vertical centering and vertical size values are adjusted in multiples of 2."

- id: rtmp_url_backup
  type: string
  query: "E U2*X50)RTMP}"
  query_command: "E U2*X50)RTMP}"
  response: "X56^]"
  description: "Backup RTMP URL. X50): Stream selection: 1 = Archive Channel A, 2 = Archive Channel B (Available for Dual Mode only), 3 = Confidence."

- id: rtmp_status_backup
  type: integer
  query: "E S2*X50) RTMP}"
  query_command: "E S2*X50) RTMP}"
  response: "X*]"
  description: "Backup RTMP Status. Schedule is refreshed. X*: Status: 0 = Offline, 1 = Live. X50): Stream selection: 1 = Archive Channel A, 2 = Archive Channel B (Available for Dual Mode only), 3 = Confidence."

- id: archive_cha_recording_status
  type: integer
  query: "E X1RCDR}"
  query_command: "E X1RCDR}"
  description: "Composite mode: X58@, Recording mode: 0 = Channel A disabled, 1 = Single Recording in Composite mode, 2 = Internal + Secondary Recording in Composite mode. Dual Channel mode: X(, 0 = Disabled/unassigned/off/unmuted (default), 1 = Enabled/assigned/on/muted."

- id: archive_chb_recording_status
  type: boolean
  query: "E X2RCDR}"
  query_command: "E X2RCDR}"
  response: "X(]"
  description: "Dual Channel mode. Archive channel B recording status."

- id: output_mode
  type: integer
  query: "E1 SMOD}"
  query_command: "E1 SMOD}"
  response: "X4!]"
  description: "Output mode: 1 = Video and audio, 2 = Video only"

- id: hdmi_video_blanking_status
  type: boolean
  query: "99B"
  query_command: "99B"
  response: "X(]"
  description: "HDMI video mute status"

- id: hdmi_audio_mute_status
  type: boolean
  query: "99Z"
  query_command: "99Z"
  response: "X(]"
  description: "HDMI audio mute status"

- id: bitrate_control_type
  type: integer
  query: "E X50)BRCT}"
  query_command: "E X50)BRCT}"
  response: "X4@]"
  description: "Bit rate control type: 0 = VBR, 1 = CVBR, 2 = CBR. X50): Stream selection: 1 = Archive Channel A, 2 = Archive Channel B (Available for Dual Mode only), 3 = Confidence."

- id: recording_thumbnail_size
  type: integer
  query: "E T RCDR}"
  query_command: "E T RCDR}"
  response: "X54%]"
  description: "UNRESOLVED: the response uses X54%, defined as 1 = Single recording enabled, 2 = Dual recording enabled, while Thumbnail size is defined as X54^: 0 = Normal (default), 1 = Follows archive resolution."

- id: hdcp_authorization
  type: boolean
  query: "E E X50!HDCP}"
  query_command: "E E X50!HDCP}"
  response: "X(]"
  description: "HDMI Inputs only. X50!: Input number 1 to 5. Input HDCP authorization."

- id: hdcp_notification
  type: integer
  query: "ENHDCP}"
  query_command: "ENHDCP}"
  response: "X51@]"
  description: "HDCP notification: 0 = Off (mute output to black), 1 = On (green HDCP notification-screen) (default)"

- id: background_image_filename
  type: string
  query: "ERF}"
  query_command: "ERF}"
  description: "For composite mode only. Background filename."

- id: audio_input_format
  type: integer
  query: "E I X!AFMT}"
  query_command: "E I X!AFMT}"
  response: "X3)]"
  description: "X!: Inputs 1 to 4 (1 to 5 for SDI models). Audio format: 0 = Disable audio, 1 = Analog (default of input 3), 2 = PLCM 2 CH (default)."

- id: audio_delay
  type: integer
  query: "E 1 ADLY}"
  query_command: "E 1 ADLY}"
  response: "X56$]"
  description: "Audio delay — 0 to 999 ms"

- id: edid_assignment
  type: integer
  query: "E A X50!EDID}"
  query_command: "E A X50!EDID}"
  response: "X6*]"
  description: "X50!: Input number 1 to 5. X6*: EDID resolution (see Table 1. EDID Values)."

- id: auto_image_status
  type: boolean
  query: "X50!*A X(]"
  query_command: "X50!*A X(]"
  description: "View Auto-Image. X50!: Input number 1 to 5. X(: 0 = Disabled/unassigned/off/unmuted (default), 1 = Enabled/assigned/on/muted. UNRESOLVED: the source places X(] in the command cell and does not clearly separate the query from its response; the documented token is retained verbatim."

- id: input_3_format
  type: integer
  query: '3\ X50$]'
  query_command: '3\ X50$]'
  response: "X50$]"
  description: "View input 3 format. X50$: Input video format: 1 = YUVp/HDTV (default), 2 = YUVi, 3 = Composite, 4 = 3G-SDI, 5 = HD-SDI, 6 = SDI, 7 = Auto-SDI (Input 5 default). UNRESOLVED: the source includes X50$] in the command cell as well as the response cell; the documented token is retained verbatim."
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
last_checked_at: 2026-10-07T17:31:20.245Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T17:31:20.245Z
matched_actions: 302
action_count: 302
confidence: medium
summary: "All 302 action units match source SIS commands literally, and transport values are supported. Omitted source rows are only set/reset/decrement variants of represented commands. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "USB config port protocol details beyond SIS over USB serial not fully specified"
- "permitted range.\""
- "the command uses X53), defined as User/Encoder/Layout Preset number — 1 to 32 (two-digit response — 0 padding), while Streaming preset is defined as X53# — 1 to 16 (two-digit response — 0 padding).\""
- "the command uses X54%, defined as 1 = Single recording enabled, 2 = Dual recording enabled, while Thumbnail size is defined as X54^: 0 = Normal (default), 1 = Follows archive resolution.\""
- "X62) is not defined in the source.\""
- "the response uses X54%, defined as 1 = Single recording enabled, 2 = Dual recording enabled, while Thumbnail size is defined as X54^: 0 = Normal (default), 1 = Follows archive resolution.\""
- "the source places X(] in the command cell and does not clearly separate the query from its response; the documented token is retained verbatim.\""
- "the source includes X50$] in the command cell as well as the response cell; the documented token is retained verbatim.\""
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
