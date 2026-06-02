---
spec_id: admin/idk-fdx-s
schema_version: ai4av-public-spec-v1
revision: 2
title: "IDK Corporation FDX-S Control Spec"
manufacturer: IDK
model_family: FDX-S08U
aliases: []
compatible_with:
  manufacturers:
    - IDK
    - "IDK Corporation"
  models:
    - FDX-S08U
    - FDX-S16U
    - FDX-S32U
    - FDX-S64U
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - idkav.com
  - manualslib.com
source_urls:
  - https://www.idkav.com/content/documents/manuals/fdx-s_cm_ver.4.10.0_en.pdf
  - https://www.manualslib.com/manual/1871261/Idk-Fdx-S-Series.html
retrieved_at: 2026-04-29T23:58:51.825Z
last_checked_at: 2026-05-21T10:50:41.108Z
generated_at: 2026-05-21T10:50:41.108Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "detailed signal format specifications for 4K@60 boards beyond EDID values; multi-window memory structure not documented"
  - "comprehensive variable enumeration - source documents individual get/set pairs"
  - "device sends unsolicited notifications via UDP/TCP/RS-232C when status changes"
  - "multi-step sequences not explicitly documented as macros"
  - "no explicit safety warnings or interlock procedures in source"
  - "UDP notification port default (1147) stated but source does not confirm if configurable"
verification:
  verdict: verified
  checked_at: 2026-05-21T10:50:41.108Z
  matched_actions: 112
  action_count: 112
  confidence: medium
  summary: "Merged from amendment (sidecar: data/skill-outputs-amendments/idk_fdx_s.amend.md). All 112 actions traced to source. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# IDK Corporation FDX-S Control Spec

## Summary
IDK FDX-S is a modular matrix switcher supporting 8 to 64 I/O channels depending on model. Control via RS-232C (up to 38.4 kbps) or LAN (TCP ports 1100/6000-6999, HTTP port 80). No login authentication required. Command format: `@` prefix + 3-letter command + comma-separated parameters, terminated with CR+LF.

<!-- UNRESOLVED: detailed signal format specifications for 4K@60 boards beyond EDID values; multi-window memory structure not documented -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
  - http
serial:
  baud_rate: 4800  # 4800/9600/14400/19200/38400 bps - source states range
  data_bits: 8  # 7/8 bit - source states range, default 8
  parity: none  # NONE/EVEN/ODD - source states range, default NONE
  stop_bits: 1  # 1/2 - source states range, default 1
  flow_control: none
  delimiter: "CR+LF (0x0D 0x0A)"
addressing:
  port: 1100  # TCP command port; range 6000-6999 also valid
  http_port: 80  # WEB browser control
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: POWER ON command in transmission mode examples
- routable  # inferred: I/O channel switching commands present (@GSW/@SSW)
- queryable  # inferred: status query commands present (@GIS, @GOS, @GIV, @GHC, @GAA)
- levelable  # inferred: brightness/contrast/hue/saturation/gamma commands present
```

## Actions
```yaml
- id: io_channel_switch
  label: I/O Channel Switching
  kind: action
  params:
    - name: in_ch
      type: integer
      description: Input channel (0=OFF, 1 to n=IN1 to INn)
    - name: out_ch
      type: integer
      description: Output channel (0=All, 1 to n=OUT1 to OUTn)

- id: straight_channel_switch
  label: Straight Channel Switching
  kind: action
  params: []

- id: input_channel_selection_copy
  label: Input Channel Selection Copy
  kind: action
  params:
    - name: sch
      type: integer
      description: Source output channel (1 to n=OUT1 to OUTn)
    - name: dch
      type: integer
      description: Destination output channel (0=All outputs, 1 to n=OUT1 to OUTn)

- id: output_resolution
  label: Output Resolution
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output channel (1 to n=OUT1 to OUTn)
    - name: auto
      type: integer
      description: "0=Manual resolution, 1=Auto"
    - name: resolution
      type: integer
      description: "1=VGA, 3=XGA, 7=SXGA, 15=VESAHD(1920x1080), 16=WUXGA(1920x1200), 18=WQHD, 50-57=2160p, 60-67=4096x2160"

- id: output_brightness
  label: Output Brightness
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output channel (1 to n=OUT1 to OUTn)
    - name: brightness
      type: integer
      description: "0-200 (default 100)"

- id: output_contrast
  label: Output Contrast
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output channel (1 to n=OUT1 to OUTn)
    - name: red
      type: integer
      description: Red contrast 0-200 (default 100)
    - name: green
      type: integer
      description: Green contrast 0-200 (default 100)
    - name: blue
      type: integer
      description: Blue contrast 0-200 (default 100)

- id: output_gamma
  label: Output Gamma
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output channel (1 to n=OUT1 to OUTn)
    - name: gamma
      type: integer
      description: "1-30 = 0.1 to 3.0 (default 10 = 1.0)"

- id: input_brightness
  label: Input Brightness
  kind: action
  params:
    - name: in_ch
      type: integer
      description: Input channel (1 to n=IN1 to INn)
    - name: brightness
      type: integer
      description: "0-200 (default 100)"

- id: input_contrast
  label: Input Contrast
  kind: action
  params:
    - name: in_ch
      type: integer
      description: Input channel (1 to n=IN1 to INn)
    - name: red
      type: integer
      description: Red contrast 0-200 (default 100)
    - name: green
      type: integer
      description: Green contrast 0-200 (default 100)
    - name: blue
      type: integer
      description: Blue contrast 0-200 (default 100)

- id: input_hue
  label: Input Hue
  kind: action
  params:
    - name: in_ch
      type: integer
      description: Input channel (1 to n=IN1 to INn)
    - name: hue
      type: integer
      description: "0-359 degrees (default 0)"

- id: input_saturation
  label: Input Saturation
  kind: action
  params:
    - name: in_ch
      type: integer
      description: Input channel (1 to n=IN1 to INn)
    - name: saturation
      type: integer
      description: "0-200 (default 100)"

- id: input_sharpness
  label: Input Sharpness
  kind: action
  params:
    - name: in_ch
      type: integer
      description: Input channel (1 to n=IN1 to INn)
    - name: sharp
      type: integer
      description: "-5 to 15 (default 0)"

- id: mute
  label: Audio Mute
  kind: action
  params:
    - name: out_ch
      type: integer
      description: "Output channel: 0=All, 1 to n=OUT1 to OUTn, 300=All analog, 301-312=ANALOG OUT1-12, 500=All Dante, 501-532=DANTE OUT1-32"
    - name: mode
      type: integer
      description: "0=Not outputting, 1=Outputting"

- id: output_lip_sync
  label: Output Lip Sync
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output channel
    - name: time
      type: integer
      description: "Lip sync delay 0-256 ms (default 0)"

- id: audio_embedding_deembedding
  label: Audio Embedding/De-embedding
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output channel
    - name: select
      type: integer
      description: "Audio selection: 0=Video input channel audio, 301-304=ANALOG IN1-4, 501-532=DANTE IN1-32"

- id: hdcp_output
  label: HDCP Output
  kind: action
  params:
    - name: out_ch
      type: integer
      description: "Output channel (0=All, 1 to n=OUT1 to OUTn)"
    - name: hdcp
      type: integer
      description: "0=HDCP2.2 priority, 1=HDCP1.4 encrypted, 2=Encrypted only if input has HDCP, 3=Not encrypted"

- id: edid_resolution
  label: EDID Resolution
  kind: action
  params:
    - name: in_ch
      type: integer
      description: Input channel (1 to n=IN1 to INn)
    - name: edid
      type: integer
      description: "0=External, 1-4=Copied EDID, 5=1080p, 6=720p, 9=XGA, 14=SXGA, 40-45=4K resolutions"

- id: rs232c_config
  label: RS-232C Configuration
  kind: action
  params:
    - name: baudrate
      type: integer
      description: "0=4800, 1=9600, 2=14400, 3=19200, 4=38400 bps"
    - name: length
      type: integer
      description: "0=7 bit, 1=8 bit"
    - name: parity
      type: integer
      description: "0=NONE, 1=ODD, 2=EVEN"
    - name: stop
      type: integer
      description: "0=1 bit, 1=2 bit"

- id: ip_address_set
  label: Set IP Address
  kind: action
  params:
    - name: unit_1
      type: integer
      description: First octet (0-255)
    - name: unit_2
      type: integer
      description: Second octet (0-255)
    - name: unit_3
      type: integer
      description: Third octet (0-255)
    - name: unit_4
      type: integer
      description: Fourth octet (0-255)

- id: subnet_mask_set
  label: Set Subnet Mask
  kind: action
  params:
    - name: unit_1
      type: integer
      description: First octet (0-255)
    - name: unit_2
      type: integer
      description: Second octet (0-255)
    - name: unit_3
      type: integer
      description: Third octet (0-255)
    - name: unit_4
      type: integer
      description: Fourth octet (0-255)

- id: gateway_address_set
  label: Set Gateway Address
  kind: action
  params:
    - name: unit_1
      type: integer
      description: First octet (0-255)
    - name: unit_2
      type: integer
      description: Second octet (0-255)
    - name: unit_3
      type: integer
      description: Third octet (0-255)
    - name: unit_4
      type: integer
      description: Fourth octet (0-255)

- id: tcp_port_set
  label: Set TCP Port Number
  kind: action
  params:
    - name: port
      type: integer
      description: "TCP port: 1100, 6000-6999"
    - name: connection
      type: integer
      description: "1=Fixed (8-connection setting)"

- id: auto_disconnect_set
  label: Set Automatic Disconnection Time
  kind: action
  params:
    - name: service
      type: integer
      description: "1 (fixed)"
    - name: time
      type: integer
      description: "0=Not disconnect, 1-180 seconds (default 30)"

- id: preset_recall
  label: Recall Preset Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: "Preset number 1-32"

- id: preset_save
  label: Save Preset Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: "Preset number 1-32"
    - name: name
      type: string
      description: "Memory name (up to 10 ASCII chars 0x20-0x7D)"

- id: reboot
  label: Reboot
  kind: action
  params: []

- id: initialization
  label: Initialize
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=All settings, 1=Excluding communication settings"

- id: front_panel_lock
  label: Front Panel Security Lockout
  kind: action
  params:
    - name: lock
      type: integer
      description: "0=Unlock, 1=Lock, 2=Change current setting"

- id: unsolicited_notification_ip_set
  label: Set Unsolicited Notification IP/UDP Port
  kind: action
  params:
    - name: unit_1
      type: integer
      description: First octet of IP (0-255)
    - name: unit_2
      type: integer
      description: Second octet (0-255)
    - name: unit_3
      type: integer
      description: Third octet (0-255)
    - name: unit_4
      type: integer
      description: Fourth octet (0-255)
    - name: port
      type: integer
      description: "UDP port 1-65535 (default 1147)"

- id: unsolicited_notification_udp_interval_set
  label: Set UDP Unsolicited Notification Interval
  kind: action
  params:
    - name: time
      type: integer
      description: "0=OFF, 1-50=100ms-5000ms in 100ms steps"
    - name: save
      type: integer
      description: "0=Not saved, 1=Save setting"

- id: unsolicited_notification_tcp_interval_set
  label: Set TCP/RS-232C Unsolicited Notification Interval
  kind: action
  params:
    - name: time
      type: integer
      description: "0=OFF, 1-50=100ms-5000ms in 100ms steps"

- id: rs232c_transmission_mode
  label: RS-232C Transmission Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Normal, 1=RS-232C mode"

- id: lan_transmission_mode
  label: LAN Transmission Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Normal, 1=LAN mode"

- id: rs232c_transmission_sending_channel
  label: RS-232C Transmission Sending Channel
  kind: action
  params:
    - name: ch
      type: integer
      description: "1 to n=OUT1 to OUTn, 101 to 100+n=IN1 to INn"

- id: rs232c_transmission_receiving_channel
  label: RS-232C Transmission Receiving Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: "1 to n=OUT1 to OUTn, 101 to 100+n=IN1 to INn"

- id: lan_transmission_sending_channel
  label: LAN Transmission Sending Channel
  kind: action
  params:
    - name: ch
      type: integer
      description: "1 to n=OUT1 to OUTn, 101 to 100+n=IN1 to INn"

- id: lan_transmission_receiving_channel
  label: LAN Transmission Receiving Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: "1 to n=OUT1 to OUTn, 101 to 100+n=IN1 to INn"

- id: output_aspect_ratio
  label: Output Aspect Ratio for Sink Device
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output channel (1 to n=OUT1 to OUTn)
    - name: aspect
      type: integer
      description: "0=RESOLUTION [Default], 1=4:3, 2=5:3, 3=5:4, 4=16:9, 5=16:10, -2=No scan conversion output board installed (response only)"

- id: output_image_size_position
  label: Output Image Size/Image Position
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output channel (1 to n=OUT1 to OUTn)
    - name: h_zoom
      type: integer
      description: "Horizontal image size 2000 to 210000 = 20.00% to 2100.00% [Default] 10000 (100.00%)"
    - name: v_zoom
      type: integer
      description: "Vertical image size 2000 to 210000 = 20.00% to 2100.00% [Default] 10000 (100.00%)"
    - name: h_posi
      type: integer
      description: "Horizontal image position -210000 to +210000 = -2100.00% to +2100.00% [Default] +0"
    - name: v_posi
      type: integer
      description: "Vertical image position -210000 to +210000 = -2100.00% to +2100.00% [Default] +0"

- id: output_background_color
  label: Output Background Color
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output channel (1 to n=OUT1 to OUTn)
    - name: b_red
      type: integer
      description: Background color Red 0-255 [Default] 0
    - name: b_green
      type: integer
      description: Background color Green 0-255 [Default] 0
    - name: b_blue
      type: integer
      description: Background color Blue 0-255 [Default] 0
    - name: m_red
      type: integer
      description: Blank color Red 0-255 [Default] 0
    - name: m_green
      type: integer
      description: Blank color Green 0-255 [Default] 0
    - name: m_blue
      type: integer
      description: Blank color Blue 0-255 [Default] 0

- id: output_test_pattern
  label: Output Test Pattern
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output channel (1 to n=OUT1 to OUTn)
    - name: pattern
      type: integer
      description: "0=OFF [Default], 1=COLOR BAR, 2=16 STEP GRAY, 3=256 STEP GRAY, 4=WHITE RASTER, 5=RED RASTER, 6=GREEN RASTER, 7=BLUE RASTER, 8=CROSS HATCH, 9=VERTICAL STRIPE, 10=OUTPUT FRAME"

- id: output_videowall_config
  label: Output Videowall Configuration/Image Position
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output channel (1 to n=OUT1 to OUTn)
    - name: h_type
      type: integer
      description: "Videowall horizontal screen number 0=Not control, 1 to 20=1 to 20 screens [Default] 1"
    - name: v_type
      type: integer
      description: "Videowall vertical screen number 0=Not control, 1 to 20=1 to 20 screens [Default] 1"
    - name: h_posi
      type: integer
      description: "Videowall horizontal image position 0=Not control, 1 to 20=1 to 20 from left [Default] 1"
    - name: v_posi
      type: integer
      description: "Videowall vertical image position 0=Not control, 1 to 20=1 to 20 from top [Default] 1"

- id: output_frame_delay
  label: Output Frame Delay
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output channel (0=All outputs, 1 to n=OUT1 to OUTn)
    - name: delay
      type: integer
      description: "0=OFF (No frame delay) [Default], 1=1 frame delay, 2=-1 frame delay"

- id: output_sync_mode
  label: Output Synchronization Mode
  kind: action
  params:
    - name: slot_1
      type: integer
      description: Output board 1 (1 to x=Output board 1 to Output board x)
    - name: mode_1
      type: integer
      description: "0=THROUGH [Default], 1=FOLLOWER, 2=LEADER A, 3=LEADER B, 4=LEADER C, 5=LEADER D"

- id: output_video_sync
  label: Output Video Synchronization
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output channel (0=All outputs for setting only, 1 to n=OUT1 to OUTn)
    - name: mode
      type: integer
      description: "0=OFF [Default], 1=ON"

- id: output_settings
  label: Output Settings
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output channel (1 to n=OUT1 to OUTn)
    - name: auto
      type: integer
      description: "Output resolution mode 0=Resolution specified by resolution param, 1=Auto [Default]"
    - name: resolution
      type: integer
      description: "Output resolution 1=VGA, 3=XGA, 4=WXGA, 5=WXGA(1280x800), 7=SXGA, 15=VESAHD, 16=WUXGA, 18=WQHD, 26=1080p 50Hz, 27=1080p 59.94Hz, 37=1080p 60Hz, 50-57=2160p 3840x2160, 60-67=4096x2160"
    - name: aspect
      type: integer
      description: "Aspect ratio for sink 0=RESOLUTION [Default], 1=4:3, 2=5:3, 3=5:4, 4=16:9, 5=16:10, 6=256:135"
    - name: pattern
      type: integer
      description: "Test pattern 0=OFF [Default], 1=COLOR BAR, 2=16 STEP GRAY, 3=256 STEP GRAY, 4=100% WHITE RASTER, 5=100% RED RASTER, 6=100% GREEN RASTER, 7=100% BLUE RASTER, 8=CROSS HATCH, 9=VERTICAL STRIPE, 10=OUTPUT FRAME"
    - name: h_zoom
      type: integer
      description: "Horizontal image size 2000 to 210000 = 20.00% to 2100.00% [Default] 10000"
    - name: v_zoom
      type: integer
      description: "Vertical image size 2000 to 210000 = 20.00% to 2100.00% [Default] 10000"
    - name: h_posi
      type: integer
      description: "Horizontal image position -210000 to +210000 [Default] +0"
    - name: v_posi
      type: integer
      description: "Vertical image position -210000 to +210000 [Default] +0"
    - name: m_red
      type: integer
      description: Blank color Red 0-255 [Default] 0
    - name: m_green
      type: integer
      description: Blank color Green 0-255 [Default] 0
    - name: m_blue
      type: integer
      description: Blank color Blue 0-255 [Default] 0
    - name: b_red
      type: integer
      description: Background color Red 0-255 [Default] 0
    - name: b_green
      type: integer
      description: Background color Green 0-255 [Default] 0
    - name: b_blue
      type: integer
      description: Background color Blue 0-255 [Default] 0
    - name: c_red
      type: integer
      description: Output contrast Red 0-200 [Default] 100
    - name: c_green
      type: integer
      description: Output contrast Green 0-200 [Default] 100
    - name: c_blue
      type: integer
      description: Output contrast Blue 0-200 [Default] 100
    - name: brightness
      type: integer
      description: Output brightness 0-200 [Default] 100
    - name: mode
      type: integer
      description: "Effect mode 0=CUT, 1=FADE OUT-IN [Default], 2=FREEZE"
    - name: hdcp
      type: integer
      description: "HDCP output 0=HDCP 2.2 priority, 1=HDCP 1.4 encrypted, 2=HDCP encrypted only if input has HDCP, 3=HDCP not encrypted"

- id: output_no_signal_sync_disable
  label: Disable Synchronous Signal Output When No Video Input
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output channel (1 to n=OUT1 to OUTn)
    - name: time
      type: integer
      description: "Time before sync signal stopped: 4=OFF (continue output) [Default], 5 to 60=5 sec. to 60 sec."

- id: output_no_input_video
  label: Output Video for When No Input Video
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output channel (1 to n=OUT1 to OUTn)
    - name: video
      type: integer
      description: "0=BACK COLOR [Default], 1 to 4=BITMAP1 to BITMAP4"

- id: output_format
  label: Output Format
  kind: action
  params:
    - name: out_1
      type: integer
      description: Output channel (0=All outputs, 1 to n=OUT1 to OUTn)
    - name: mode_1
      type: integer
      description: "0=AUTO [Default], 1=DVI, 2=HDMI YCbCr 4:4:4, 3=HDMI YCbCr 4:2:2, 4=HDMI RGB, 5=HDMI YCbCr 4:2:0 (4K@60/59.94/50 only)"

- id: output_deep_color
  label: Output Deep Color
  kind: action
  params:
    - name: out_1
      type: integer
      description: Output channel (0=All outputs, 1 to n=OUT1 to OUTn)
    - name: color_1
      type: integer
      description: "Color depth 0=24 bit/pixel (8 bit/component) [Default], 1=30 bit/pixel (10 bit/component), 2=36 bit/pixel (12 bit/component)"

- id: output_transition_effect
  label: Output Video Transition Effect
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output channel (0=All outputs for setting only, 1 to n=OUT1 to OUTn)
    - name: mode
      type: integer
      description: "0=CUT, 1=FADE OUT-IN [Default], 2=FREEZE"

- id: output_sink_edid_check
  label: Output Sink Device EDID Check
  kind: action
  params:
    - name: out_1
      type: integer
      description: Output channel (0=All outputs, 1 to n=OUT1 to OUTn)
    - name: mode_1
      type: integer
      description: "0=In case of EDID load error treat sink as DVI device [Default], 1=Treat as HDMI device without SCDC, 2=Always treat as HDMI device without SCDC, 3=Treat as HDMI device with SCDC on error, 4=Always treat as HDMI device with SCDC"

- id: output_hot_plug_duration
  label: Output Hot Plug Ignoring Duration
  kind: action
  params:
    - name: out_1
      type: integer
      description: Output channel (0=All outputs, 1 to n=OUT1 to OUTn)
    - name: mask_1
      type: integer
      description: "Hot plug ignoring duration 1=OFF [Default], 2 to 15=2 sec. to 15 sec."

- id: output_sdi_format_conversion
  label: SDI Output Format Conversion
  kind: action
  params:
    - name: out_1
      type: integer
      description: Output channel (0=All outputs, 1 to n=OUT1 to OUTn)
    - name: conv_1
      type: integer
      description: "0=OFF (outputs color space as input), 1=ON (converts to YCbCr 4:2:2 10 bit standard format) [Default]"

- id: output_sdi_gearbox_mode
  label: SDI Output Gearbox Mode
  kind: action
  params:
    - name: slot_1
      type: integer
      description: Output board (0=All output boards, 1 to m=Output board 1 to m)
    - name: mode_1
      type: integer
      description: "1=Single link signal output [Default], 2=3G dual link signal output, 3=6G dual link signal output, 4=3G quad link signal output"

- id: input_aspect_ratio
  label: Input Aspect Ratio
  kind: action
  params:
    - name: in_ch
      type: integer
      description: Input channel (1 to n=IN1 to INn)
    - name: aspect
      type: integer
      description: "0=AUTO [Default], 1=FULL, 2=4:3, 3=5:3, 4=5:4, 5=16:9, 6=16:10, 7=16:9 LETTER BOX"

- id: input_settings
  label: Input Settings
  kind: action
  params:
    - name: in_ch
      type: integer
      description: Input channel (1 to n=IN1 to INn)
    - name: h_size
      type: integer
      description: "Horizontal active area [dot] -100 to +100 [Default] +0"
    - name: v_size
      type: integer
      description: "Vertical active area [line] -30 to +30 [Default] +0"
    - name: h_posi
      type: integer
      description: "Horizontal start position [dot] -100 to +100 [Default] +0"
    - name: v_posi
      type: integer
      description: "Vertical start position [line] -30 to +30 [Default] +0"
    - name: aspect
      type: integer
      description: "Aspect ratio 0=AUTO [Default], 1=FULL, 2=4:3, 3=5:3, 4=5:4, 5=16:9, 6=16:10, 7=16:9 LETTER BOX"
    - name: red
      type: integer
      description: Input contrast Red 0-200 [Default] 100
    - name: green
      type: integer
      description: Input contrast Green 0-200 [Default] 100
    - name: blue
      type: integer
      description: Input contrast Blue 0-200 [Default] 100
    - name: brightness
      type: integer
      description: Input brightness 0-200 [Default] 100
    - name: sharpness
      type: integer
      description: "Sharpness -5 to 15 [Default] 0"
    - name: hue
      type: integer
      description: Hue 0-359 [Default] 0
    - name: saturation
      type: integer
      description: Saturation 0-200 [Default] 100

- id: input_no_signal_monitoring
  label: Input No-Signal Monitoring
  kind: action
  params:
    - name: in_1
      type: integer
      description: Input channel (0=All inputs, 1 to n=IN1 to INn)
    - name: time_1
      type: integer
      description: "No-signal input monitoring time 0=OFF, 3 to 15=3 sec. to 15 sec. [Default] 10 sec."

- id: input_hdcp
  label: HDCP Input
  kind: action
  params:
    - name: in_1
      type: integer
      description: Input channel (0=All inputs, 1 to n=IN1 to INn)
    - name: hdcp_1
      type: integer
      description: "HDCP input 0=DISABLE, 1=HDCP 1.4, 2=HDCP 2.2 [Default]"

- id: input_3g_sdi_dual_stream
  label: 3G-SDI Dual Stream
  kind: action
  params:
    - name: in_1
      type: integer
      description: Input channel (0=All inputs, 1 to n=IN1 to INn)
    - name: select_1
      type: integer
      description: "Input video 1=Video stream 1 [Default], 2=Video stream 2"

- id: input_sdi_gearbox_mode
  label: SDI Input Gearbox Mode
  kind: action
  params:
    - name: slot_1
      type: integer
      description: Input board (0=All input boards, 1 to m=Input board 1 to m)
    - name: mode_1
      type: integer
      description: "0=Determines automatically by CH-A input payload ID, 1=Single link signal input [Default], 2=3G dual link signal input, 3=6G dual link signal input, 4=3G quad link signal input"

- id: input_timing_start_position
  label: Input Horizontal/Vertical Start Position
  kind: action
  params:
    - name: in_ch
      type: integer
      description: Input channel (1 to n=IN1 to INn)
    - name: h_posi
      type: integer
      description: "Horizontal start position [dot] -100 to +100 [Default] +0"
    - name: v_posi
      type: integer
      description: "Vertical start position [line] -30 to +30 [Default] +0"

- id: input_timing_active_area
  label: Input Horizontal/Vertical Active Area
  kind: action
  params:
    - name: in_ch
      type: integer
      description: Input channel (1 to n=IN1 to INn)
    - name: h_size
      type: integer
      description: "Horizontal active area [dot] -100 to +100 [Default] +0"
    - name: v_size
      type: integer
      description: "Vertical active area [line] -30 to +30 [Default] +0"

- id: output_audio_setting
  label: Output Audio Setting (Multiview)
  kind: action
  params:
    - name: out_ch_1
      type: integer
      description: Output channel (0=All output channels, 1 to n=OUT1 to OUTn)
    - name: window_1
      type: integer
      description: "Audio selection window 1 to 4=Window A to Window D [Default] Window A"

- id: output_sdi_audio_group
  label: SDI Output Audio Group
  kind: action
  params:
    - name: out_1
      type: integer
      description: Output channel (0=All outputs, 1 to n=OUT1 to OUTn)
    - name: primary_1
      type: integer
      description: "Primary audio 1=Audio group 1 (1ch to 4ch) [Default], 2=Audio group 2 (5ch to 8ch), 3=Audio group 3 (9ch to 12ch), 4=Audio group 4 (13ch to 16ch)"
    - name: secondary_1
      type: integer
      description: "Secondary audio 1=Audio group 1, 2=Audio group 2 [Default], 3=Audio group 3, 4=Audio group 4"

- id: input_audio_stable_wait
  label: Input Stable Audio Input Wait
  kind: action
  params:
    - name: in_1
      type: integer
      description: Input channel (0=All inputs, 1 to n=IN1 to INn)
    - name: wait_1
      type: integer
      description: "Waiting time 0=OFF, 1=SHORT, 2=MID [Default], 3=LONG"

- id: input_sdi_audio_group
  label: SDI Input Audio Group
  kind: action
  params:
    - name: in_1
      type: integer
      description: Input channel (0=All inputs, 1 to n=IN1 to INn)
    - name: primary_1
      type: integer
      description: "Primary audio 1=Audio group 1 (1ch to 4ch) [Default], 2=Audio group 2 (5ch to 8ch), 3=Audio group 3 (9ch to 12ch), 4=Audio group 4 (13ch to 16ch)"
    - name: secondary_1
      type: integer
      description: "Secondary audio 2=Audio group 2 [Default], 1=Audio group 1, 3=Audio group 3, 4=Audio group 4"

- id: edid_copy
  label: Copy EDID
  kind: action
  params:
    - name: out
      type: integer
      description: Channel to read EDID from (1 to n=OUT1 to OUTn; 12G-SDI output channel cannot be selected)
    - name: number
      type: integer
      description: "Destination memory number 1 to 4=Destination 1 to Destination 4"

- id: edid_external_channel
  label: EDID External Channel
  kind: action
  params:
    - name: in_1
      type: integer
      description: Input channel (0=All inputs, 1 to n=IN1 to INn)
    - name: out_1
      type: integer
      description: "External EDID output channel 1 to n=OUT1 to OUTn [Default] 1"

- id: edid_frame_rate
  label: EDID Frame Rate
  kind: action
  params:
    - name: in_1
      type: integer
      description: Input channel (0=All inputs, 1 to n=IN1 to INn)
    - name: mode_1
      type: integer
      description: "0=60 Hz/30 Hz [Default], 1=50 Hz/25 Hz"

- id: edid_deep_color
  label: EDID Deep Color
  kind: action
  params:
    - name: in_1
      type: integer
      description: Input channel (0=All inputs, 1 to n=IN1 to INn)
    - name: color_1
      type: integer
      description: "0=24 bit/pixel (8 bit/component) [Default], 1=30 bit/pixel (10 bit/component), 2=36 bit/pixel (12 bit/component)"

- id: edid_audio_format
  label: EDID Audio Format
  kind: action
  params:
    - name: in
      type: integer
      description: Input channel (1 to n=IN1 to INn)
    - name: format_1
      type: integer
      description: "Audio format 0=LPCM, 1=AC-3/Dolby Digital, 2=AAC, 3=Dolby Digital Plus, 4=DTS, 5=DTS-HD, 6=Dolby TrueHD"
    - name: frequency_1
      type: integer
      description: "Maximum sampling frequency 0=OFF (Not output), 1=32 kHz, 2=44.1 kHz, 3=48 kHz, 4=88.2 kHz, 5=96 kHz, 6=176.4 kHz, 7=192 kHz"

- id: edid_speaker_config
  label: EDID Speaker Configuration
  kind: action
  params:
    - name: in_1
      type: integer
      description: Input channel (0=All inputs, 1 to n=IN1 to INn)
    - name: ch_1
      type: integer
      description: "Speaker configuration 0=LR [Default], 1=2.1 channel surround sound, 2=5.1 channel surround sound, 3=7.1 channel surround sound"

- id: crosspoint_recall
  label: Recall Crosspoint Memory
  kind: action
  params:
    - name: memory
      type: integer
      description: Crosspoint memory number 1-32

- id: crosspoint_save
  label: Save Crosspoint Memory
  kind: action
  params:
    - name: memory
      type: integer
      description: Crosspoint memory number 1-32
    - name: name
      type: string
      description: Memory name (up to 10 characters from ASCII code 0x20 to 0x7D, optional)

- id: crosspoint_save_extended
  label: Save Crosspoint Memory (Extended)
  kind: action
  params:
    - name: memory
      type: integer
      description: Crosspoint memory number 1-32
    - name: name
      type: string
      description: Memory name (up to 10 characters from ASCII code 0x20 to 0x7D, optional)

- id: crosspoint_edit
  label: Edit Crosspoint Memory
  kind: action
  params:
    - name: memory
      type: integer
      description: Crosspoint memory number 1-32
    - name: v_1
      type: integer
      description: "Input channel selected for output channel -1=Not controlled [Default], 0=OFF, 1 to n=IN1 to INn"

- id: preset_memory_matching
  label: Preset Memory Number Matching I/O Channel Status
  kind: query
  params: []

- id: bitmap_image_output
  label: Bitmap Image Output
  kind: action
  params:
    - name: out_1
      type: integer
      description: Output channel (0=All outputs, 1 to n=OUT1 to OUTn)
    - name: mode_1
      type: integer
      description: "0=OFF [Default], 1 to 4=BITMAP1 to BITMAP4"

- id: bitmap_background_color
  label: Bitmap Background Color
  kind: action
  params:
    - name: ch
      type: integer
      description: Output channel (0=All outputs, 1 to n=OUT1 to OUTn)
    - name: bitmap
      type: integer
      description: "Bitmap number 0=ALL BITMAPS, 1=BITMAP1, 2=BITMAP2, 3=BITMAP3, 4=BITMAP4"
    - name: red
      type: integer
      description: Background color Red 0-255 [Default] 0
    - name: green
      type: integer
      description: Background color Green 0-255 [Default] 0
    - name: blue
      type: integer
      description: Background color Blue 0-255 [Default] 0

- id: bitmap_aspect_ratio
  label: Bitmap Aspect Ratio
  kind: action
  params:
    - name: ch
      type: integer
      description: Output channel (0=All outputs, 1 to n=OUT1 to OUTn)
    - name: bitmap
      type: integer
      description: "Bitmap number 0=ALL BITMAPS, 1=BITMAP1, 2=BITMAP2, 3=BITMAP3, 4=BITMAP4"
    - name: aspect
      type: integer
      description: "0=AUTO [Default], 1=FULL, 2=THROUGH"

- id: bitmap_image_position
  label: Bitmap Image Position
  kind: action
  params:
    - name: ch
      type: integer
      description: Output channel (0=All outputs, 1 to n=OUT1 to OUTn)
    - name: bitmap
      type: integer
      description: "Bitmap number 0=ALL BITMAPS, 1=BITMAP1, 2=BITMAP2, 3=BITMAP3, 4=BITMAP4"
    - name: position
      type: integer
      description: "0=CENTER [Default], 1=TOP-LEFT, 2=BOTTOM-LEFT, 3=TOP-RIGHT, 4=BOTTOM-RIGHT"

- id: bitmap_startup_output
  label: Start-up Bitmap Output
  kind: action
  params:
    - name: out_1
      type: integer
      description: Output channel (0=All outputs, 1 to n=OUT1 to OUTn)
    - name: mode_1
      type: integer
      description: "0=OFF [Default], 1 to 4=BITMAP1 to BITMAP4"

- id: multiwindow_window_size_position
  label: Multi Window Size/Window Position
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output window (1 to n=OUT1 to OUTn)
    - name: h_zoom
      type: integer
      description: "Horizontal image size 500 to 40000=5.00% to 400.00% [Default] 5000 (50.00%)"
    - name: v_zoom
      type: integer
      description: "Vertical image size 500 to 40000=5.00% to 400.00% [Default] 5000 (50.00%)"
    - name: h_posi
      type: integer
      description: "Horizontal image position -40000 to +10000=-400.00% to +100.00% [Default] +0 (0.00%)"
    - name: v_posi
      type: integer
      description: "Vertical image position -40000 to +10000=-400.00% to +100.00% [Default] +0 (0.00%)"

- id: multiwindow_image_size_position
  label: Multi Window Image Size/Image Position
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output window (1 to n=OUT1 to OUTn)
    - name: h_zoom
      type: integer
      description: "Horizontal image size 2000 to 40000=20.00% to 400.00% [Default] 10000 (100.00%)"
    - name: v_zoom
      type: integer
      description: "Vertical image size 2000 to 40000=20.00% to 400.00% [Default] 10000 (100.00%)"
    - name: h_posi
      type: integer
      description: "Horizontal image position -40000 to +10000=-400.00% to +100.00% [Default] +0 (0.00%)"
    - name: v_posi
      type: integer
      description: "Vertical image position -40000 to +10000=-400.00% to +100.00% [Default] +0 (0.00%)"

- id: multiwindow_background_color
  label: Multi Window Background Color
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output window (1 to n=OUT1 to OUTn)
    - name: red
      type: integer
      description: Background color Red 0-255 [Default] 0
    - name: green
      type: integer
      description: Background color Green 0-255 [Default] 0
    - name: blue
      type: integer
      description: Background color Blue 0-255 [Default] 0

- id: multiwindow_layer_order
  label: Multi Window Layer Order
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Channel of output board (1 to n=OUT1 to OUTn)
    - name: window_a
      type: integer
      description: "Window A layer order 1 to 4=Front to back [Default] 1"
    - name: window_b
      type: integer
      description: "Window B layer order 1 to 4=Front to back [Default] 2"
    - name: window_c
      type: integer
      description: "Window C layer order 1 to 4=Front to back [Default] 3"
    - name: window_d
      type: integer
      description: "Window D layer order 1 to 4=Front to back [Default] 4"

- id: multiwindow_transition_effect
  label: Multi Window Video Transition Effect
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output window (0=All outputs for setting only, 1 to n=OUT1 to OUTn)
    - name: mode
      type: integer
      description: "Fade out/Fade in 0=OFF, 1=ON [Default]"

- id: multiwindow_on_off
  label: Multi Window ON/OFF
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output window (0=All outputs for setting only, 1 to n=OUT1 to OUTn)
    - name: mode
      type: integer
      description: "0=OFF, 1=ON [Default]"

- id: multiwindow_overlay_text_position
  label: Multi Window Overlay Text Position
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output window (0=All outputs for setting only, 1 to n=OUT1 to OUTn)
    - name: position
      type: integer
      description: "0=OFF, 1=TOP-LEFT [Default], 2=TOP-CENTER, 3=TOP-RIGHT, 4=BOTTOM-LEFT, 5=BOTTOM-CENTER, 6=BOTTOM-RIGHT"

- id: multiwindow_overlay_text_size
  label: Multi Window Overlay Text Size
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output window (0=All outputs for setting only, 1 to n=OUT1 to OUTn)
    - name: mode
      type: integer
      description: "0=SMALL, 1=LARGE [Default]"

- id: multiwindow_border_size
  label: Multi Window Border Size
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output window (1 to n=OUT1 to OUTn)
    - name: width
      type: integer
      description: "Window border size 0 to 15=0 pixel to 15 pixels [Default] 0 pixel"

- id: multiwindow_border_color
  label: Multi Window Border Color
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output window (1 to n=OUT1 to OUTn)
    - name: red
      type: integer
      description: Window border color Red 0-255 [Default] 0
    - name: green
      type: integer
      description: Window border color Green 0-255 [Default] 0
    - name: blue
      type: integer
      description: Window border color Blue 0-255 [Default] 0

- id: multiwindow_sync_mode
  label: Multi Window Synchronous Mode
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Output channel (0=All outputs for setting only, 1 to n=OUT1 to OUTn)
    - name: mode
      type: integer
      description: "Synchronous mode of Window D 0=OFF, 1=ON [Default]"

- id: multiwindow_memory_recall
  label: Recall Multi Window Memory
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Channel of output board (1 to n=OUT1 to OUTn)
    - name: preset
      type: integer
      description: Multi window memory number 1-10

- id: multiwindow_memory_save
  label: Save Multi Window Memory
  kind: action
  params:
    - name: out_ch
      type: integer
      description: Channel of output board (1 to n=OUT1 to OUTn)
    - name: preset
      type: integer
      description: Multi window memory number 1-10
    - name: name
      type: string
      description: Memory name (up to 10 characters from ASCII code 0x20 to 0x7D, optional)

- id: front_panel_group_lock
  label: Grouping Front Panel Security Lockout
  kind: action
  params:
    - name: channel
      type: integer
      description: "INPUT SELECT buttons, OUTPUT SELECT buttons, I/O channel selection buttons 0=Not locked, 1=Locked [Default]"
    - name: menu
      type: integer
      description: "MENU/ENTER button, Navigation buttons 0=Not locked, 1=Locked [Default]"
    - name: preset
      type: integer
      description: "PRESET LOAD button 0=Not locked, 1=Locked [Default]"

- id: mac_address_read
  label: Get MAC Address
  kind: query
  params: []

- id: hdbaset_information
  label: HDBaseT Information
  kind: query
  params:
    - name: ch
      type: integer
      description: "I/O channels 1 to n=OUT1 to OUTn, 101 to 100+n=IN1 to INn"
    - name: mode
      type: integer
      description: "Target information 0=All statuses, 1=Video signal information, 2=Link status, 3=Connection between source and sink devices, 4=Device type, 5=Version ID, 6=Operation mode, 7=Connected device type, 8=Connected version ID, 9=Operation mode of remote device, 10=Category cable length, 11=Bit error rate, 12=Video signal quality, 13=Maximum video signal quality, 14=Video signal residual gap, 15=Maximum video signal residual gap"

- id: input_signal_status_detailed
  label: Input Signal Status Detailed (Per Channel)
  kind: query
  params:
    - name: in
      type: integer
      description: Input channel (1 to n=IN1 to INn)

- id: output_signal_status_detailed
  label: Output Signal Status Detailed (Per Channel)
  kind: query
  params:
    - name: out
      type: integer
      description: Output channel (1 to n=OUT1 to OUTn)
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  type: enum
  values:
    - "1: Erroneous parameter format or value"
    - "2: Undefined command or wrong format"
    - "3: Currently cannot be used"
    - "4: Loading EDID failed"
  response: "@ERR,error<CR><LF>"

- id: input_signal_status
  label: Input Signal Status (For Each Channel)
  type: object
  fields:
    - name: mode
      type: integer
      description: "0=All, 1=Mode/color depth, 2=Resolution/freq, 3=Color space, 4=Audio, 5=HDCP"
  response: "@GIS,in,mode,status_1,...,status_5<CR><LF>"

- id: output_signal_status
  label: Output Signal Status (For Each Channel)
  type: object
  fields:
    - name: mode
      type: integer
      description: "0=All, 1=HDCP, 2=HDCP authentication"
  response: "@GOS,out,mode,status_1(,status_2)<CR><LF>"

- id: system_status
  label: System Status
  type: object
  response: "@GHC,voltage,rpm,temp,in,out,audio<CR><LF>"
  fields:
    - name: voltage
      type: integer
      description: "0=Normal, 1=Abnormal power supply"
    - name: rpm
      type: integer
      description: "0=Normal, 1=Abnormal fan"
    - name: temp
      type: integer
      description: "0=Normal, 1=Abnormal temperature"
    - name: in
      type: integer
      description: "0=Normal, 1=Abnormal input board comm"
    - name: out
      type: integer
      description: "0=Normal, 1=Abnormal output board comm"
    - name: audio
      type: integer
      description: "0=Normal, 1=Abnormal audio board"

- id: version
  label: Version
  type: object
  response: "@GIV,id,version,input,output<CR><LF>"
  fields:
    - name: id
      type: string
      description: Model number (e.g. FDX-S16U)
    - name: version
      type: string
      description: Firmware version
    - name: input
      type: integer
      description: Number of inputs
    - name: output
      type: integer
      description: Number of outputs

- id: board_status
  label: Board Status
  type: object
  response: "@GBS,board,slot,temp,status<CR><LF>"

- id: board_mounting_status
  label: Board Mounting Status
  type: object
  response: "@GSS,board,slot_1,...,slot_m<CR><LF>"

- id: fan_status
  label: Fan Status
  type: object
  response: "@GFS,rpm_1,s_1,rpm_2,s_2,...<CR><LF>"

- id: power_supply_voltage_status
  label: Power Supply Voltage Status
  type: object
  response: "@GPS,status1(,status2)(,status3)(,status4)<CR><LF>"

- id: alarm_status
  label: Alarm Status
  type: object
  response: "@GAA,model,version,count,power,input_1..n,output_1..n,fan_1..m<CR><LF>"

- id: unsolicited_status_notification
  label: Unsolicited Status Notification
  type: object
  response: "@PSH,in,out,system<CR><LF>"
  description: "Bitmask of changed input/output channels; in/out are hex values where bit 0=IN1/OUT1"
```

## Variables
```yaml
# UNRESOLVED: comprehensive variable enumeration - source documents individual get/set pairs
# but does not provide a dedicated Variables section
```

## Events
```yaml
# UNRESOLVED: device sends unsolicited notifications via UDP/TCP/RS-232C when status changes
# Enable via @SUH (UDP) or @SPH (TCP/RS-232C)
# Notification format: @PSH response or @AIN/@AOT responses
```

## Macros
```yaml
# UNRESOLVED: multi-step sequences not explicitly documented as macros
# Source shows transmission mode sequences (RS-232C over LAN/HDBaseT) but no named macro format
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
# Note: @CLR initialization causes device reboot
```

## Notes
Channel counts by model: FDX-S08U (8ch/2 boards), FDX-S16U (16ch/4 boards), FDX-S32U (32ch/8 boards), FDX-S64U (64ch/16 boards). Command format uses `@` prefix (0x40) + 3 alphabetical chars + parameters. All commands terminated with CR+LF (0x0D 0x0A). Error responses: `@ERR,1` through `@ERR,4`. Up to 8 simultaneous TCP connections supported. Auto-disconnect timeout: 1-180 sec (default 30 sec). For HDBaseT/SDVoE boards only: RS-232C and LAN transmission modes allow passing serial data through to external devices.

<!-- UNRESOLVED: UDP notification port default (1147) stated but source does not confirm if configurable -->

## Provenance

```yaml
source_domains:
  - idkav.com
  - manualslib.com
source_urls:
  - https://www.idkav.com/content/documents/manuals/fdx-s_cm_ver.4.10.0_en.pdf
  - https://www.manualslib.com/manual/1871261/Idk-Fdx-S-Series.html
retrieved_at: 2026-04-29T23:58:51.825Z
last_checked_at: 2026-05-21T10:50:41.108Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-21T10:50:41.108Z
matched_actions: 112
action_count: 112
confidence: medium
summary: "Merged from amendment (sidecar: data/skill-outputs-amendments/idk_fdx_s.amend.md). All 112 actions traced to source. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "detailed signal format specifications for 4K@60 boards beyond EDID values; multi-window memory structure not documented"
- "comprehensive variable enumeration - source documents individual get/set pairs"
- "device sends unsolicited notifications via UDP/TCP/RS-232C when status changes"
- "multi-step sequences not explicitly documented as macros"
- "no explicit safety warnings or interlock procedures in source"
- "UDP notification port default (1147) stated but source does not confirm if configurable"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
