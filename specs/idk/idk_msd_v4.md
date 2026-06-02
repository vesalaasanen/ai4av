---
spec_id: admin/idk-msd-v4
schema_version: ai4av-public-spec-v1
revision: 1
title: "IDK MSD-V4 Control Spec"
manufacturer: IDK
model_family: MSD-V42U
aliases: []
compatible_with:
  manufacturers:
    - IDK
  models:
    - MSD-V42U
    - MSD-V42UC
    - MSD-V42UT
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - idkav.com
source_urls:
  - https://www.idkav.com/content/documents/manuals/msd-v4_cm_ver.1.5.0_en.pdf
retrieved_at: 2026-05-19T15:25:46.131Z
last_checked_at: 2026-05-19T16:48:54.582Z
generated_at: 2026-05-19T16:48:54.582Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no explicit safety warnings or interlock procedures in source"
  - "control command registration (@GEC/@SEC) has variable-length, variant-dependent parameters and is not represented as a structured action entry."
verification:
  verdict: verified
  checked_at: 2026-05-19T16:48:54.582Z
  matched_actions: 61
  action_count: 61
  confidence: medium
  summary: "All 61 actions matched verbatim in source; transport verified; 54 query feedbacks including @GRC/@GCC/@GLG confirmed against source. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-19
---

# IDK MSD-V4 Control Spec

## Summary
The IDK MSD-V4 series (MSD-V42U/MSD-V42UC/MSD-V42UT) are multi-format AV switchers with 4 inputs and 2 outputs, supporting HDMI, HDBaseT, and 10GbE. Remote control is via RS-232C serial or LAN (TCP port 1100 for command control, UDP for unsolicited status notification). Commands use an ASCII protocol: `@` header + 3-character command code + comma-separated parameters, terminated with `<CR><LF>`.

<!-- Note: firmware version compatibility is not stated in the source; compatible_with firmware fields are intentionally left blank. -->
<!-- Note: the source declares serial parameter ranges only; no factory-default baud/data/parity/stop values are stated by the vendor. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1100
  # LAN factory defaults (source-stated): IP 192.168.1.199, subnet 255.255.255.0, gateway 192.168.1.200. HTTP port 80 is a web-browser config UI only.
serial:
  baud_rate: null  # vendor declares supported range only (4800/9600/14400/19200/38400/57600/115200 bps); no factory default stated in source
  data_bits: null  # vendor declares supported range only (7 or 8 bit); no factory default stated in source
  parity: null  # vendor declares supported range only (NONE/ODD/EVEN); no factory default stated in source
  stop_bits: null  # vendor declares supported range only (1 or 2 bit); no factory default stated in source
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: @GDS/@SDS start-up status (standby/on)
- routable  # inferred: @GSW/@SSW, @GSV/@SSV, @GSA/@SSA input/output routing
- queryable  # inferred: extensive G-prefixed query commands
- levelable  # inferred: @GAV/@SAV, @GSO/@SSO audio level control
```

## Actions
```yaml
- id: set_startup_status
  label: Set Start-up Status
  kind: action
  command: "@SDS,{state}"
  params:
    - name: state
      type: integer
      description: "0 = OFF (Standby), 1 = ON (Powered on)"

- id: switch_video_audio
  label: Switch Video and Audio Channel
  kind: action
  command: "@SSW,{input},{window}"
  params:
    - name: input
      type: integer
      description: "0 = INOFF, 1-4 = IN1-IN4"
    - name: window
      type: integer
      description: "0 = All windows, 1 = OUT1 main, 2 = OUT2 main, 201 = OUT1 PinP, 202 = OUT2 PinP"

- id: switch_video
  label: Switch Video Channel
  kind: action
  command: "@SSV,{input},{window}"
  params:
    - name: input
      type: integer
      description: "0 = INOFF, 1-4 = IN1-IN4"
    - name: window
      type: integer
      description: "0 = All windows, 1 = OUT1 main, 2 = OUT2 main, 201 = OUT1 PinP, 202 = OUT2 PinP"

- id: switch_audio
  label: Switch Audio Channel
  kind: action
  command: "@SSA,{input},{output}"
  params:
    - name: input
      type: integer
      description: "0 = INOFF, 1-4 = IN1-IN4"
    - name: output
      type: integer
      description: "0 = All outputs, 1 = OUT1, 2 = OUT2"

- id: set_output_resolution
  label: Set Output Resolution
  kind: action
  command: "@SOT,{output},{auto},{resolution}"
  params:
    - name: output
      type: integer
      description: "0 = All outputs, 1 = OUT1, 2 = OUT2"
    - name: auto
      type: integer
      description: "0 = Fixed resolution, 1 = AUTO_A, 2 = AUTO_B"
    - name: resolution
      type: integer
      description: "Resolution code (3-67), e.g. 15=1920x1080 VESA HD, 42=1080p 60Hz, 57=3840x2160 60Hz"

- id: set_aspect_ratio_sink
  label: Set Aspect Ratio for Sink Device
  kind: action
  command: "@SUM,{output},{aspect}"
  params:
    - name: output
      type: integer
      description: "0 = All outputs, 1 = OUT1, 2 = OUT2"
    - name: aspect
      type: integer
      description: "0=RESOLUTION, 1=FULL, 2=4:3, 3=5:3, 4=5:4, 5=16:9, 6=16:10, 7=256:135"

- id: set_image_position_size
  label: Set Image Position and Size (Output)
  kind: action
  command: "@SSD,{output},{h_position},{v_position},{h_size},{v_size}"
  params:
    - name: output
      type: integer
      description: "0=All, 1=OUT1 main, 2=OUT2 main, 201=OUT1 PinP, 202=OUT2 PinP"
    - name: h_position
      type: integer
      description: "Horizontal position -40000 to 10000 (-400.00% to 100.00%)"
    - name: v_position
      type: integer
      description: "Vertical position -40000 to 10000 (-400.00% to 100.00%)"
    - name: h_size
      type: integer
      description: "Horizontal size 2000-40000 (20.00%-400.00%)"
    - name: v_size
      type: integer
      description: "Vertical size 2000-40000 (20.00%-400.00%)"

- id: set_test_pattern
  label: Set Test Pattern
  kind: action
  command: "@STP,{output},{pattern},{scroll}"
  params:
    - name: output
      type: integer
      description: "0 = All outputs, 1 = OUT1, 2 = OUT2"
    - name: pattern
      type: integer
      description: "0=OFF, 1=V-COLOR BAR, 2=H-COLOR BAR, 3=V-GRAY SCALE, 4=H-GRAY SCALE, 5=VERTICAL RAMP, 6=HORIZONTAL RAMP, 7=100% WHITE, 8=50% WHITE, 9=RED, 10=GREEN, 11=BLUE, 12=CROSS HATCH, 13=OUTPUT FRAME, 14=VERT STRIPE, 15=HORIZ STRIPE, 16=VERT ZEBRA, 17=HORIZ ZEBRA"
    - name: scroll
      type: integer
      description: "0=OFF, 1=SLOW, 2=FAST"

- id: set_pinp_output
  label: Set PinP Output
  kind: action
  command: "@SPI,{output},{pinp_display}"
  params:
    - name: output
      type: integer
      description: "0 = All outputs, 1 = OUT1, 2 = OUT2"
    - name: pinp_display
      type: integer
      description: "0 = OFF, 1 = ON"

- id: set_signal_output
  label: Set Signal Output
  kind: action
  command: "@SVO,{output},{signal}"
  params:
    - name: output
      type: integer
      description: "0=All, 1=OUT1A, 2=OUT2A, 201=OUT1B, 202=OUT2B"
    - name: signal
      type: integer
      description: "0 = OFF, 1 = ON"

- id: set_video_mute
  label: Set Video Mute
  kind: action
  command: "@SDB,{output},{mute}"
  params:
    - name: output
      type: integer
      description: "0=All, 1=OUT1A, 2=OUT2A, 201=OUT1B, 202=OUT2B"
    - name: mute
      type: integer
      description: "0 = OFF, 1 = ON"

- id: set_hdcp_auth
  label: Set HDCP Authentication
  kind: action
  command: "@SEN,{output},{hdcp}"
  params:
    - name: output
      type: integer
      description: "0=All, 1=OUT1A, 2=OUT2A, 201=OUT1B, 202=OUT2B"
    - name: hdcp
      type: integer
      description: "0=No HDCP, 1=HDCP only if encrypted input, 2=HDCP 1.4, 3=HDCP 2.2"

- id: hdcp_reencrypt
  label: HDCP Re-encryption
  kind: action
  command: "@HAU,{output}"
  params:
    - name: output
      type: integer
      description: "1=OUT1A, 2=OUT2A, 201=OUT1B, 202=OUT2B"

- id: set_cec_connection
  label: Set CEC Connection
  kind: action
  command: "@SCE,{output},{cec}"
  params:
    - name: output
      type: integer
      description: "0=All, 1=OUT1A, 2=OUT2A, 201=OUT1B, 202=OUT2B"
    - name: cec
      type: integer
      description: "0=Not connected, 1=Input channel for main window, 2=IN1, 3=IN2, 4=IN3, 5=IN4"

- id: set_aspect_ratio_input
  label: Set Input Aspect Ratio
  kind: action
  command: "@SAP,{input},{aspect}"
  params:
    - name: input
      type: integer
      description: "1-4 = IN1-IN4"
    - name: aspect
      type: integer
      description: "0=AUTO-1, 1=AUTO-2, 2=4:3, 3=14:9, 4=16:9, 5=14:9 LB, 6=16:9 LB, 7=4:3 SP, 8=14:9 SP, 9=THROUGH, 10=FULL"

- id: set_aspect_ratio_control
  label: Set Aspect Ratio Control
  kind: action
  command: "@SAR,{input},{mode}"
  params:
    - name: input
      type: integer
      description: "1-4 = IN1-IN4"
    - name: mode
      type: integer
      description: "0=Letter box/Side panel, 1=Side cut/Top bottom cut"

- id: set_input_image_pos_size
  label: Set Input Image Position and Size
  kind: action
  command: "@SNW,{input},{h_position},{v_position},{h_size},{v_size}"
  params:
    - name: input
      type: integer
      description: "1-4 = IN1-IN4"
    - name: h_position
      type: integer
      description: "-40000 to 10000"
    - name: v_position
      type: integer
      description: "-40000 to 10000"
    - name: h_size
      type: integer
      description: "2000-40000"
    - name: v_size
      type: integer
      description: "2000-40000"

- id: set_hdcp_input
  label: Set HDCP Input
  kind: action
  command: "@SHE,{input},{hdcp}"
  params:
    - name: input
      type: integer
      description: "1-4 = IN1-IN4"
    - name: hdcp
      type: integer
      description: "0=NOT SUPPORT, 1=HDCP 1.4 SUPPORT, 2=HDCP 2.2 SUPPORT"

- id: set_signal_on_priority
  label: Set Signal ON Priority
  kind: action
  command: "@SAU,{output},{priority_in1},{priority_in2},{priority_in3},{priority_in4}"
  params:
    - name: output
      type: integer
      description: "0=All, 1=OUT1 main, 2=OUT2 main, 201=OUT1 PinP, 202=OUT2 PinP"
    - name: priority_in1
      type: integer
      description: "0=OFF, 1-4=Priority"
    - name: priority_in2
      type: integer
      description: "0=OFF, 1-4=Priority"
    - name: priority_in3
      type: integer
      description: "0=OFF, 1-4=Priority"
    - name: priority_in4
      type: integer
      description: "0=OFF, 1-4=Priority"

- id: set_signal_off_priority
  label: Set Signal OFF Priority
  kind: action
  command: "@SOF,{output},{priority_in1},{priority_in2},{priority_in3},{priority_in4},{priority_inoff}"
  params:
    - name: output
      type: integer
      description: "0=All, 1=OUT1 main, 2=OUT2 main, 201=OUT1 PinP, 202=OUT2 PinP"
    - name: priority_in1
      type: integer
      description: "0=OFF, 1-5=Priority"
    - name: priority_in2
      type: integer
      description: "0=OFF, 1-5=Priority"
    - name: priority_in3
      type: integer
      description: "0=OFF, 1-5=Priority"
    - name: priority_in4
      type: integer
      description: "0=OFF, 1-5=Priority"
    - name: priority_inoff
      type: integer
      description: "0=OFF, 1-5=Priority"

- id: set_auto_switch_mode
  label: Set Auto Switching Mode
  kind: action
  command: "@SAD,{output},{mode}"
  params:
    - name: output
      type: integer
      description: "0=All, 1=OUT1 main, 2=OUT2 main"
    - name: mode
      type: integer
      description: "0=Video and Audio, 1=Video, 2=Audio"

- id: set_audio_output
  label: Set Audio Output
  kind: action
  command: "@SUC,{output},{audio}"
  params:
    - name: output
      type: integer
      description: "0=All, 1=OUT1A, 2=OUT2A, 201=OUT1B, 202=OUT2B"
    - name: audio
      type: integer
      description: "0 = OFF, 1 = ON"

- id: set_output_audio_level
  label: Set Output Audio Level
  kind: action
  command: "@SAV,{output},{level}"
  params:
    - name: output
      type: integer
      description: "0=All, 1=OUT1, 2=OUT2, 401=ANALOG OUT1"
    - name: level
      type: integer
      description: "Audio level in dB, -100 to 10"

- id: adjust_output_audio_level
  label: Adjust Output Audio Level (Relative)
  kind: action
  command: "@SOL,{output},{updown}"
  params:
    - name: output
      type: integer
      description: "0=All, 1=OUT1, 2=OUT2, 401=ANALOG OUT1"
    - name: updown
      type: integer
      description: "Relative dB adjustment, -110 to 110"

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "@SAM,{output},{mute}"
  params:
    - name: output
      type: integer
      description: "0=All, 1=OUT1, 2=OUT2, 401=ANALOG OUT1"
    - name: mute
      type: integer
      description: "0 = OFF, 1 = ON"

- id: set_input_audio
  label: Set Input Audio Source
  kind: action
  command: "@SAS,{input},{select}"
  params:
    - name: input
      type: integer
      description: "1-4 = IN1-IN4"
    - name: select
      type: integer
      description: "0=DIGITAL, 1=ANALOG IN1"

- id: set_input_audio_level
  label: Set Input Audio Level
  kind: action
  command: "@SSO,{input},{level}"
  params:
    - name: input
      type: integer
      description: "0=All, 1-4=IN1-IN4, 201=ANALOG IN1"
    - name: level
      type: integer
      description: "Audio level in dB, -100 to 10"

- id: adjust_input_audio_level
  label: Adjust Input Audio Level (Relative)
  kind: action
  command: "@SDZ,{input},{updown}"
  params:
    - name: input
      type: integer
      description: "0=All, 1-4=IN1-IN4, 201=ANALOG IN1"
    - name: updown
      type: integer
      description: "Relative dB adjustment, -110 to 110"

- id: set_stable_wait
  label: Set Stable Wait (Audio Signal)
  kind: action
  command: "@SAW,{input},{wait}"
  params:
    - name: input
      type: integer
      description: "1-4 = IN1-IN4"
    - name: wait
      type: integer
      description: "0 = OFF, 1 = ON"

- id: set_edid_selection
  label: Set EDID Selection
  kind: action
  command: "@SED,{input},{edid}"
  params:
    - name: input
      type: integer
      description: "1-4 = IN1-IN4"
    - name: edid
      type: integer
      description: "0=BUILT-IN EDID, 1=EXT EDID OUT1A, 2=EXT EDID OUT2A, 201=EXT EDID OUT1B, 202=EXT EDID OUT2B, 401-408=COPY DATA 1-8"

- id: set_edid_resolution
  label: Set EDID Resolution
  kind: action
  command: "@SVF,{input},{resolution}"
  params:
    - name: input
      type: integer
      description: "1-4 = IN1-IN4"
    - name: resolution
      type: integer
      description: "Resolution code (0-45)"

- id: set_comm_setting
  label: Set RS-232C Communication Setting
  kind: action
  command: "@SCT,{port},{baudrate},{length},{parity},{stop}"
  params:
    - name: port
      type: integer
      description: "1=RS-232C, 101=OUT1B, 102=OUT2B"
    - name: baudrate
      type: integer
      description: "0=4800, 1=9600, 2=14400, 3=19200, 4=38400, 5=57600, 6=115200"
    - name: length
      type: integer
      description: "0=7bit, 1=8bit"
    - name: parity
      type: integer
      description: "0=NONE, 1=ODD, 2=EVEN"
    - name: stop
      type: integer
      description: "0=1bit, 1=2bit"

- id: set_operation_mode
  label: Set RS-232C Operation Mode
  kind: action
  command: "@SCF,{port},{mode}"
  params:
    - name: port
      type: integer
      description: "0=All, 1=RS-232C, 101=OUT1B, 102=OUT2B"
    - name: mode
      type: integer
      description: "0=RECEIVER, 1=TRANSMITTER"

- id: set_ip_address
  label: Set IP Address
  kind: action
  command: "@SIP,{unit_1},{unit_2},{unit_3},{unit_4}"
  params:
    - name: unit_1
      type: integer
      description: "First octet (0-255)"
    - name: unit_2
      type: integer
      description: "Second octet (0-255)"
    - name: unit_3
      type: integer
      description: "Third octet (0-255)"
    - name: unit_4
      type: integer
      description: "Fourth octet (0-255)"

- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  command: "@SSB,{unit_1},{unit_2},{unit_3},{unit_4}"
  params:
    - name: unit_1
      type: integer
      description: "First octet (0-255)"
    - name: unit_2
      type: integer
      description: "Second octet (0-255)"
    - name: unit_3
      type: integer
      description: "Third octet (0-255)"
    - name: unit_4
      type: integer
      description: "Fourth octet (0-255)"

- id: set_gateway
  label: Set Gateway Address
  kind: action
  command: "@SGW,{unit_1},{unit_2},{unit_3},{unit_4}"
  params:
    - name: unit_1
      type: integer
      description: "First octet (0-255)"
    - name: unit_2
      type: integer
      description: "Second octet (0-255)"
    - name: unit_3
      type: integer
      description: "Third octet (0-255)"
    - name: unit_4
      type: integer
      description: "Fourth octet (0-255)"

- id: set_timeout
  label: Set Automatic Disconnection Time
  kind: action
  command: "@SLD,{service},{time}"
  params:
    - name: service
      type: integer
      description: "1=SERVER (receiving), 2=CLIENT (sending)"
    - name: time
      type: integer
      description: "0=NOT DISCONNECT, 1-180=seconds"

- id: command_execution
  label: Execute Control Command
  kind: action
  command: "@EXC,{command_1}"
  params:
    - name: command_1
      type: integer
      description: "Control command number 1-64, or A-I for F1-F9 button"

- id: initialize_data
  label: Initialize Registered Command Data
  kind: action
  command: "@DEC,{no}"
  params:
    - name: no
      type: integer
      description: "1-64=control command, 101-132=reply command, 201-274=command link"

- id: store_crosspoint_memory
  label: Store Crosspoint Memory
  kind: action
  command: "@SCM,{xpoint}"
  params:
    - name: xpoint
      type: integer
      description: "Crosspoint memory number 1-9"

- id: recall_crosspoint_memory
  label: Recall Crosspoint Memory
  kind: action
  command: "@RCM,{xpoint}"
  params:
    - name: xpoint
      type: integer
      description: "Crosspoint memory number 1-9"

- id: store_preset_memory
  label: Store Preset Memory
  kind: action
  command: "@SPM,{preset}"
  params:
    - name: preset
      type: integer
      description: "Preset memory number 1-9"

- id: recall_preset_memory
  label: Recall Preset Memory
  kind: action
  command: "@RPM,{preset}"
  params:
    - name: preset
      type: integer
      description: "Preset memory number 1-9"

- id: store_pattern_memory
  label: Store Pattern Memory
  kind: action
  command: "@SWM,{pattern},{output}"
  params:
    - name: pattern
      type: integer
      description: "Pattern memory number 1-5"
    - name: output
      type: integer
      description: "1=OUT1, 2=OUT2"

- id: recall_pattern_memory
  label: Recall Pattern Memory
  kind: action
  command: "@RWM,{pattern},{output}"
  params:
    - name: pattern
      type: integer
      description: "Pattern memory number 1-5"
    - name: output
      type: integer
      description: "1=OUT1, 2=OUT2"

- id: set_bitmap_output
  label: Set Bitmap Output
  kind: action
  command: "@SBM,{output},{bitmap}"
  params:
    - name: output
      type: integer
      description: "0=All, 1=OUT1 main, 2=OUT2 main, 201=OUT1 PinP, 202=OUT2 PinP"
    - name: bitmap
      type: integer
      description: "0=OFF, 1-4=Bitmap 1-4"

- id: set_function_button
  label: Set Function Button Assignment
  kind: action
  command: "@SFA,{button},{function}"
  params:
    - name: button
      type: integer
      description: "0=All, 1-9=F1-F9"
    - name: function
      type: integer
      description: "0=COMMAND, 1=DISPLAY POWER, 21-22=OUT1/OUT2 PATTERN, 41=WINDOW SELECT, 61-69=CROSSPOINT 1-9, 81-89=PRESET 1-9"

- id: reboot
  label: Reboot
  kind: action
  command: "@RBT"
  params: []

- id: initialize
  label: Initialize (Factory Reset)
  kind: action
  command: "@CLR,{mode}"
  params:
    - name: mode
      type: integer
      description: "0=ALL INITIALIZE, 1=NORMAL INITIALIZE (keeps comm settings)"

- id: set_notification_destination
  label: Set UDP Notification Destination
  kind: action
  command: "@SDA,1,{unit_1},{unit_2},{unit_3},{unit_4},{port}"
  params:
    - name: unit_1
      type: integer
      description: "IP octet 1 (0-255)"
    - name: unit_2
      type: integer
      description: "IP octet 2 (0-255)"
    - name: unit_3
      type: integer
      description: "IP octet 3 (0-255)"
    - name: unit_4
      type: integer
      description: "IP octet 4 (0-255)"
    - name: port
      type: integer
      description: "UDP port number 1-65535"

- id: set_notification_interval
  label: Set Notification Interval
  kind: action
  command: "@SPH,{time}"
  params:
    - name: time
      type: integer
      description: "0=OFF, 1-50 (100ms to 5000ms in 100ms steps)"
- id: store_crosspoint_memory_video
  label: Store Crosspoint Memory (Video Input Channel)
  kind: action
  command: "@SCV,{xpoint}"
  params:
    - name: xpoint
      type: integer
      description: "Crosspoint memory number 1-9"

- id: store_crosspoint_memory_audio
  label: Store Crosspoint Memory (Audio Input Channel)
  kind: action
  command: "@SCA,{xpoint}"
  params:
    - name: xpoint
      type: integer
      description: "Crosspoint memory number 1-9"

- id: edit_crosspoint_memory
  label: Edit Crosspoint Memory
  kind: action
  command: "@ECM,{xpoint},{video_main_1},{audio_main_1},{video_pinp_1},{video_main_2},{audio_main_2},{video_pinp_2}"
  params:
    - name: xpoint
      type: integer
      description: "Crosspoint memory number 1-9"
    - name: video_main_1
      type: integer
      description: "-1=Not control, 0=OFF, 1-4=IN1-IN4"
    - name: audio_main_1
      type: integer
      description: "-1=Not control, 0=OFF, 1-4=IN1-IN4"
    - name: video_pinp_1
      type: integer
      description: "-1=Not control, 0=OFF, 1-4=IN1-IN4"
    - name: video_main_2
      type: integer
      description: "-1=Not control, 0=OFF, 1-4=IN1-IN4"
    - name: audio_main_2
      type: integer
      description: "-1=Not control, 0=OFF, 1-4=IN1-IN4"
    - name: video_pinp_2
      type: integer
      description: "-1=Not control, 0=OFF, 1-4=IN1-IN4"

- id: edit_crosspoint_memory_video
  label: Edit Crosspoint Memory (Video Input Channel)
  kind: action
  command: "@ECV,{xpoint},{video_main_1},{video_pinp_1},{video_main_2},{video_pinp_2}"
  params:
    - name: xpoint
      type: integer
      description: "Crosspoint memory number 1-9"
    - name: video_main_1
      type: integer
      description: "-1=Not control, 0=OFF, 1-4=IN1-IN4"
    - name: video_pinp_1
      type: integer
      description: "-1=Not control, 0=OFF, 1-4=IN1-IN4"
    - name: video_main_2
      type: integer
      description: "-1=Not control, 0=OFF, 1-4=IN1-IN4"
    - name: video_pinp_2
      type: integer
      description: "-1=Not control, 0=OFF, 1-4=IN1-IN4"

- id: edit_crosspoint_memory_audio
  label: Edit Crosspoint Memory (Audio Input Channel)
  kind: action
  command: "@ECA,{xpoint},{audio_main_1},{audio_main_2}"
  params:
    - name: xpoint
      type: integer
      description: "Crosspoint memory number 1-9"
    - name: audio_main_1
      type: integer
      description: "-1=Not control, 0=OFF, 1-4=IN1-IN4"
    - name: audio_main_2
      type: integer
      description: "-1=Not control, 0=OFF, 1-4=IN1-IN4"

- id: recall_crosspoint_memory_video
  label: Recall Crosspoint Memory (Video Input Channel)
  kind: action
  command: "@RCV,{xpoint}"
  params:
    - name: xpoint
      type: integer
      description: "Crosspoint memory number 1-9"

- id: recall_crosspoint_memory_audio
  label: Recall Crosspoint Memory (Audio Input Channel)
  kind: action
  command: "@RCA,{xpoint}"
  params:
    - name: xpoint
      type: integer
      description: "Crosspoint memory number 1-9"

- id: set_pjlink_destination
  label: Set Control Command Destination (PJLink)
  kind: action
  command: "@SLG,{destination},{ip_1},{ip_2},{ip_3},{ip_4},{pjlink}"
  params:
    - name: destination
      type: integer
      description: "Destination number 1-12"
    - name: ip_1
      type: integer
      description: "IP address octet 1 (0-255)"
    - name: ip_2
      type: integer
      description: "IP address octet 2 (0-255)"
    - name: ip_3
      type: integer
      description: "IP address octet 3 (0-255)"
    - name: ip_4
      type: integer
      description: "IP address octet 4 (0-255)"
    - name: pjlink
      type: integer
      description: "0=PJLink not used, 1=PJLink used"

- id: set_reply_command
  label: Register Reply Command
  kind: action
  command: "@SRC,{reply},{process},{length},{command},{mask},{memo}"
  params:
    - name: reply
      type: integer
      description: "Reply command number 1-32"
    - name: process
      type: integer
      description: "0=Stop processing, 1=Continue processing, 2=Resending commands"
    - name: length
      type: integer
      description: "Reply command data size in bytes (0-30)"
    - name: command
      type: string
      description: "Reply command data: length x2 hex digits (0-9, A-F)"
    - name: mask
      type: string
      description: "Mask data: length x2 hex digits (0-9, A-F), default FF"
    - name: memo
      type: string
      description: "Memo up to 14 ASCII characters (codes 20-7D, not 2C)"

- id: set_command_link
  label: Set Command Link
  kind: action
  command: "@SCC,{event},{c_1}"
  params:
    - name: event
      type: integer
      description: "Control command execution condition (1-78, e.g. 30=POWER ON, 31=STANDBY, 1-18=COMMAND F1-F9 PLANE A/B)"
    - name: c_1
      type: integer
      description: "Control command number to link: 0=Not link, 1-64=Control command 1-64"
```

## Feedbacks
```yaml
- id: startup_status
  type: enum
  command: "@GDS"
  values: [off, on]
  description: "Start-up status. 0=OFF (Standby), 1=ON"

- id: video_audio_routing
  type: string
  command: "@GSW"
  description: "Returns video_main_1, audio_main_1, video_pinp_1, video_main_2, audio_main_2, video_pinp_2"

- id: video_routing
  type: string
  command: "@GSV"
  description: "Returns video_main_1, video_pinp_1, video_main_2, video_pinp_2"

- id: audio_routing
  type: string
  command: "@GSA"
  description: "Returns audio_main_1, audio_main_2"

- id: output_resolution
  type: string
  command: "@GOT,{output}"
  description: "Returns output, auto mode, resolution code"

- id: test_pattern
  type: string
  command: "@GTP,{output}"
  description: "Returns pattern code and scroll state"

- id: signal_output
  type: enum
  command: "@GVO,{output}"
  values: [off, on]

- id: video_mute_state
  type: enum
  command: "@GDB,{output}"
  values: [off, on]

- id: hdcp_auth_state
  type: string
  command: "@GEN,{output}"
  description: "Returns HDCP authentication mode (0-3)"

- id: audio_output_state
  type: enum
  command: "@GUC,{output}"
  values: [off, on]

- id: output_audio_level
  type: integer
  command: "@GAV,{output}"
  description: "Output audio level in dB (-100 to 10)"

- id: output_audio_limit
  type: integer
  command: "@GOL,{output}"
  description: "-1=at minimum, 0=normal, 1=at maximum"

- id: audio_mute_state
  type: enum
  command: "@GAM,{output}"
  values: [off, on]

- id: input_audio_source
  type: enum
  command: "@GAS,{input}"
  values: [digital, analog_in1]

- id: input_audio_level
  type: integer
  command: "@GSO,{input}"
  description: "Input audio level in dB (-100 to 10)"

- id: input_audio_limit
  type: integer
  command: "@GDZ,{input}"
  description: "-1=at minimum, 0=normal, 1=at maximum"

- id: io_signal_status
  type: string
  command: "@GSS,{connector},{mode}"
  description: "Returns input/output signal type, resolution, audio format, HDCP, error codes"

- id: device_info
  type: string
  command: "@GIV"
  description: "Returns model number and firmware version"

- id: system_check
  type: string
  command: "@GHC"
  description: "Returns voltage status and temperature status (0=Normal, 1=Abnormal)"

- id: alarm_status
  type: string
  command: "@GAA"
  description: "Returns model, firmware, power voltage status, temperature status"

- id: input_signal_detail
  type: string
  command: "@AIN,{input}"
  description: "Returns 19 fields of input signal detail (resolution, format, HDCP, audio, etc.)"

- id: output_signal_detail
  type: string
  command: "@AOT,{output}"
  description: "Returns 25 fields of output signal detail (resolution, HDCP, sink capabilities, etc.)"

- id: error_status
  type: integer
  command: "@ERR"
  description: "Error code: 1=bad format, 2=undefined command, 3=cannot execute, 4=EDID load fail, 10=standby, 30-34=control command errors"

- id: auto_switching_mode
  type: enum
  command: "@GAD,{output}"
  values: [video_and_audio, video, audio]
  description: "Switching mode of automatic switching for the specified output window. 0=Video and Audio, 1=Video, 2=Audio. output: 0=All outputs, 1=OUT1 main window, 2=OUT2 main window"

- id: aspect_ratio
  type: enum
  command: "@GAP,{input}"
  values: [auto1, auto2, ratio_4_3, ratio_14_9, ratio_16_9, ratio_14_9_letterbox, ratio_16_9_letterbox, ratio_4_3_sidepanel, ratio_14_9_sidepanel, through, full]
  description: "Input aspect ratio for the specified input. 0=AUTO-1, 1=AUTO-2, 2=4:3, 3=14:9, 4=16:9, 5=14:9 LETTER BOX, 6=16:9 LETTER BOX, 7=4:3 SIDE PANEL, 8=14:9 SIDE PANEL, 9=THROUGH, 10=FULL"

- id: aspect_ratio_control
  type: enum
  command: "@GAR,{input}"
  values: [letterbox_sidepanel, sidecut_topbottomcut]
  description: "Aspect ratio control mode for the specified input. 0=Letter box/Side panel, 1=Side cut/Top bottom cut"

- id: signal_on_priority
  type: string
  command: "@GAU,{output}"
  description: "Signal ON priority for IN1 to IN4 for the specified output window. Returns output, priority_in1, priority_in2, priority_in3, priority_in4. 0=OFF, 1-4=Priority (Highest to Lowest)"

- id: stable_wait_audio
  type: enum
  command: "@GAW,{input}"
  values: [off, on]
  description: "Stable wait (Audio signal) setting for the specified input. 0=OFF, 1=ON"

- id: bitmap_output
  type: string
  command: "@GBM,{output}"
  description: "Bitmap output for the specified output window. Returns output, bitmap. 0=OFF, 1-4=Bitmap 1-4. output: 0=All, 1=OUT1 main, 2=OUT2 main, 201=OUT1 PinP, 202=OUT2 PinP"

- id: crosspoint_memory_audio
  type: string
  command: "@GCA,{xpoint}"
  description: "Audio input channel stored in crosspoint memory. Returns xpoint, audio_main_1, audio_main_2, name. -1=Not control, 0=OFF, 1-4=IN1-IN4"

- id: cec_connection
  type: string
  command: "@GCE,{output}"
  description: "CEC connection setting for the specified output connector. Returns output, cec. 0=Not connected, 1=Input channel selected for main window, 2-5=IN1-IN4. Available only for HDMI/HDBaseT connectors"

- id: rs232c_operation_mode
  type: enum
  command: "@GCF,{port}"
  values: [receiver, transmitter]
  description: "RS-232C operation mode for the specified port. 0=RECEIVER mode, 1=TRANSMITTER mode. port: 0=All, 1=RS-232C, 101=OUT1B, 102=OUT2B"

- id: crosspoint_memory
  type: string
  command: "@GCM,{xpoint}"
  description: "Video and audio input channels stored in crosspoint memory. Returns xpoint, video_main_1, audio_main_1, video_pinp_1, video_main_2, audio_main_2, video_pinp_2, name. -1=Not control, 0=OFF, 1-4=IN1-IN4"

- id: rs232c_communication
  type: string
  command: "@GCT,{port}"
  description: "RS-232C communication settings for the specified port. Returns port, baudrate, length, parity, stop. Baudrate: 0=4800, 1=9600, 2=14400, 3=19200, 4=38400, 5=57600, 6=115200 bps. Length: 0=7bit, 1=8bit. Parity: 0=NONE, 1=ODD, 2=EVEN. Stop: 0=1bit, 1=2bit"

- id: crosspoint_memory_video
  type: string
  command: "@GCV,{xpoint}"
  description: "Video input channels stored in crosspoint memory. Returns xpoint, video_main_1, video_pinp_1, video_main_2, video_pinp_2, name. -1=Not control, 0=OFF, 1-4=IN1-IN4"

- id: unsolicited_notification_destination
  type: string
  command: "@GDA,{reserve}"
  description: "IP address and UDP port of the unsolicited status notification destination. Returns reserve, unit_1, unit_2, unit_3, unit_4, port. reserve is fixed to 1. Default IP 192.168.1.200, default UDP port 1147"

- id: edid_selection
  type: string
  command: "@GED,{input}"
  description: "EDID selection for the specified input. Returns input, edid. 0=BUILT-IN EDID, 1=EXTERNAL EDID OUT1A, 2=EXTERNAL EDID OUT2A, 201=EXTERNAL EDID OUT1B, 202=EXTERNAL EDID OUT2B, 401-408=COPY DATA 1-8"

- id: sink_edid
  type: string
  command: "@GES,{connector},{mode}"
  description: "Sink device EDID for the specified output connector. connector: 1=OUT1A, 2=OUT2A, 201=OUT1B, 202=OUT2B. mode: 0=All, 1=Sink device name, 2=Recommended resolution and dot clock, 3=HDMI/video/color depth support, 4=Audio sampling/bit/channels support"

- id: function_button
  type: string
  command: "@GFA,{button}"
  description: "Function button assignment. Returns button, function. 0=COMMAND, 1=DISPLAY POWER, 21-22=OUT1-OUT2 PATTERN, 41=WINDOW SELECT, 61-69=CROSSPOINT No.1-9, 81-89=PRESET MEMORY No.1-9. button: 0=All, 1-9=F1-F9"

- id: gateway_address
  type: string
  command: "@GGW"
  description: "Gateway address. Returns unit_1, unit_2, unit_3, unit_4 (upper to lower byte). Default 192.168.1.200"

- id: hdcp_input
  type: enum
  command: "@GHE,{input}"
  values: [not_support, hdcp14_support, hdcp22_support]
  description: "HDCP input setting for the specified input. 0=NOT SUPPORT, 1=HDCP 1.4 SUPPORT, 2=HDCP 2.2 SUPPORT"

- id: ip_address
  type: string
  command: "@GIP"
  description: "IP address. Returns unit_1, unit_2, unit_3, unit_4 (upper to lower byte). Default 192.168.1.199"

- id: mac_address
  type: string
  command: "@GMC"
  description: "MAC address. Returns unit_1 through unit_6 (upper to lower byte, in hex)"

- id: image_position_size_input
  type: string
  command: "@GNW,{input}"
  description: "Image position and size for the specified input. Returns input, h_position, v_position, h_size, v_size. h/v_position: -40000 to 10000 (-400.00% to 100.00%). h/v_size: 2000 to 40000 (20.00% to 400.00%)"

- id: signal_off_priority
  type: string
  command: "@GOF,{output}"
  description: "Signal OFF priority for IN1-IN4 and INOFF for the specified output window. Returns output, priority_in1, priority_in2, priority_in3, priority_in4, priority_inoff. 0=OFF, 1-5=Priority (Highest to Lowest)"

- id: notification_interval
  type: string
  command: "@GPH"
  description: "Unsolicited status notification interval. Returns time, save. time: 0=OFF, 1-50=100ms to 5000ms. save: 0=Does not save, 1=Saves"

- id: pinp_output
  type: enum
  command: "@GPI,{output}"
  values: [off, on]
  description: "PinP output state for the specified output channel. 0=OFF, 1=ON. output: 0=All, 1=OUT1, 2=OUT2"

- id: subnet_mask
  type: string
  command: "@GSB"
  description: "Subnet mask. Returns unit_1, unit_2, unit_3, unit_4 (upper to lower byte). Default 255.255.255.0"

- id: image_position_size_output
  type: string
  command: "@GSD,{output}"
  description: "Image position and size for the specified output window. Returns output, h_position, v_position, h_size, v_size. h/v_position: -40000 to 10000 (-400.00% to 100.00%). h/v_size: 2000 to 40000 (20.00% to 400.00%). output: 0=All, 1=OUT1 main, 2=OUT2 main, 201=OUT1 PinP, 202=OUT2 PinP"

- id: aspect_ratio_for_sink
  type: enum
  command: "@GUM,{output}"
  values: [resolution, full, ratio_4_3, ratio_5_3, ratio_5_4, ratio_16_9, ratio_16_10, ratio_256_135]
  description: "Aspect ratio for sink device on the specified output. 0=RESOLUTION, 1=FULL, 2=4:3, 3=5:3, 4=5:4, 5=16:9, 6=16:10, 7=256:135. output: 0=All, 1=OUT1, 2=OUT2"

- id: edid_resolution
  type: string
  command: "@GVF,{input}"
  description: "Built-in EDID resolution for the specified input. Returns input, resolution code. Available only when BUILT-IN EDID is selected. Codes: 0=800x600, 1=1024x768, 2=1280x720, 3=720p, 4-21=various up to 2560x1600, 40-45=4K resolutions"

- id: reply_command
  type: string
  command: "@GRC,{reply}"
  description: "Registered reply command settings. Returns reply, process, length, command, mask, memo. reply: 1-32. process: 0=Stop processing, 1=Continue processing, 2=Resending commands. length: reply data size 0-30 bytes"

- id: command_link
  type: string
  command: "@GCC,{event}"
  description: "Control commands linked to an execution condition. Returns event, c_1 .. c_10. event: control command execution condition (1-78). c_n: 0=Not link, 1-64=Control command 1-64"

- id: control_command_destination
  type: string
  command: "@GLG,{destination}"
  description: "Control command destination settings. Returns destination, ip_1, ip_2, ip_3, ip_4, pjlink, (tcp, password). destination: 1-12. ip_n: destination IP octet (0-255). pjlink: 0=PJLink not used, 1=PJLink used"
```

## Variables
```yaml
# No standalone settable variables: all device state is exposed through the Actions and Feedbacks above.
```

## Events
```yaml
- id: unsolicited_status_notification
  type: event
  command: "@PSH"
  description: "Sent over UDP when I/O or alarm status changes. Returns bitfield for input changes, output changes, and alarm changes."
  params:
    - name: in
      description: "Input status bitmask (bit 0=IN1, bit 1=IN2, bit 2=IN3, bit 3=IN4)"
    - name: out
      description: "Output status bitmask (bit 0=OUT1A, bit 1=OUT1B, bit 2=OUT2A, bit 3=OUT2B)"
    - name: alarm
      description: "0=no change, 1=change detected"
```

## Macros
```yaml
# The device's command-link feature is represented as the set_command_link action and the command_link feedback.
# The vendor defines no pre-built macro sequences; multi-step macro authoring is left to the controller.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
# Note: @CLR (initialization) causes reboot. @RBT causes reboot. Source notes ~12 second startup delay.
```

## Notes
- Command format: `@` header + 3 alpha characters (case-insensitive) + comma-separated parameters + `<CR><LF>`.
- Setting commands use `S` as second character (e.g. `@SSW`); Getting commands use `G` (e.g. `@GSW`).
- Valid setting command response echoes the sent command. Query response appends values after the command.
- Error response: `@ERR,{code}<CR><LF>`.
- TCP supports up to 8 simultaneous connections. 30-second inactivity timeout default (configurable via `@GLD/@SLD`).
- Startup takes ~12 seconds before commands are accepted.
- UDP status notification requires enabling via `@SPH` (set interval > 0) and configuring destination via `@SDA`.
- Output connectors use dual addressing: `1-2` for OUT1A/OUT2A, `201-202` for OUT1B/OUT2B.
- PinP windows addressed as `201` (OUT1 PinP) and `202` (OUT2 PinP).

<!-- Note: the source declares serial parameter ranges only; no factory-default baud/data/parity/stop values are stated by the vendor. -->
<!-- Note: firmware version compatibility is not stated in the source. -->
<!-- Note: LAN factory defaults per source — IP 192.168.1.199, subnet 255.255.255.0, gateway 192.168.1.200. -->
<!-- Note: port 80 (HTTP) is a web-browser configuration UI only; the source documents no HTTP command API. All programmatic control is via TCP port 1100 and UDP status notification. -->
<!-- Note: reply-command registration (@GRC/@SRC), command linking (@GCC/@SCC), and PJLink control-command destination (@GLG/@SLG) are represented as actions plus query feedbacks above. -->
<!-- UNRESOLVED: control command registration (@GEC/@SEC) has variable-length, variant-dependent parameters and is not represented as a structured action entry. -->

## Provenance

```yaml
source_domains:
  - idkav.com
source_urls:
  - https://www.idkav.com/content/documents/manuals/msd-v4_cm_ver.1.5.0_en.pdf
retrieved_at: 2026-05-19T15:25:46.131Z
last_checked_at: 2026-05-19T16:48:54.582Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-19T16:48:54.582Z
matched_actions: 61
action_count: 61
confidence: medium
summary: "All 61 actions matched verbatim in source; transport verified; 54 query feedbacks including @GRC/@GCC/@GLG confirmed against source. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no explicit safety warnings or interlock procedures in source"
- "control command registration (@GEC/@SEC) has variable-length, variant-dependent parameters and is not represented as a structured action entry."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
