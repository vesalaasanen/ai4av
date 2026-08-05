---
spec_id: admin/boeckeler-pointmaker-cpn-5000
schema_version: ai4av-public-spec-v1
revision: 1
title: "Boeckeler Pointmaker CPN-5000 Control Spec"
manufacturer: Boeckeler
model_family: "Pointmaker CPN-5000"
aliases: []
compatible_with:
  manufacturers:
    - Boeckeler
  models:
    - "Pointmaker CPN-5000"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - williamsav.com
source_urls:
  - https://williamsav.com/wp-content/uploads/2020/04/cpn-5000-UG-0213.pdf
retrieved_at: 2026-07-24T20:32:22.873Z
last_checked_at: 2026-08-05T08:13:54.695Z
generated_at: 2026-08-05T08:13:54.695Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "PTR (Display Right Arrow)"
  - "TCP command transport framing and control port are not stated in source."
  - "Feedback response coverage is limited; source documents only echo behavior and an optional OK response."
  - "Firmware compatibility version is not stated in source."
  - "unsolicited notifications are not stated in source"
  - "explicit multi-step macros are not stated in source"
  - "device error responses and fault recovery sequence not stated in source."
  - "firmware compatibility range not stated in source."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:13:54.695Z
  matched_actions: 205
  action_count: 205
  confidence: medium
  summary: "All 205 spec actions match wire tokens in source; transport parameters (9600 baud, 8/N/1, hardware handshaking) verified; only PTR is not represented in spec. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-24
---

# Boeckeler Pointmaker CPN-5000 Control Spec

## Summary
Boeckeler Pointmaker CPN-5000 is an audiovisual annotation and video-overlay controller. It accepts ASCII RS-232 control commands and can also receive Pointmaker commands over TCP/IP. RS-232 commands begin with `<Esc>(`.

<!-- UNRESOLVED: TCP command transport framing and control port are not stated in source. -->
<!-- UNRESOLVED: Feedback response coverage is limited; source documents only echo behavior and an optional OK response. -->
<!-- UNRESOLVED: Firmware compatibility version is not stated in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing: {}
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: hardware
auth:
  type: none
```

## Traits
```yaml
- queryable
- levelable
```

## Actions
```yaml
- id: autodetect_enable
  label: Enable Autodetect
  kind: action
  command: "<Esc>(A1"
  params: []

- id: autodetect_disable
  label: Disable Autodetect
  kind: action
  command: "<Esc>(AØ"
  params: []

- id: background_video
  label: Video Background
  kind: action
  command: "<Esc>(BV"
  params: []

- id: background_chalkboard
  label: Chalkboard Background
  kind: action
  command: "<Esc>(BC"
  params: []

- id: background_toggle
  label: Video/Chalkboard Toggle
  kind: action
  command: "<Esc>(BT"
  params: []

- id: text_background_enable
  label: Display Text Background
  kind: action
  command: "<Esc>(BL1"
  params: []

- id: text_background_disable
  label: No Text Background
  kind: action
  command: "<Esc>(BLØ"
  params: []

- id: text_background_toggle
  label: Toggle Text Background
  kind: action
  command: "<Esc>(BLT"
  params: []

- id: assign_calibration
  label: Assign Calibration to COMM Port
  kind: action
  command: "<Esc>(CA0pnn"
  params:
    - name: port
      type: integer
      description: COMM port selector digit, 0-9, designating ports 1-10
    - name: calibration
      type: integer
      description: Calibration number, 1-10

- id: calibrate_usb
  label: Activate USB PVI-PC20 Calibration
  kind: action
  command: "<Esc>(CDP"
  params: []

- id: calibrate_touchscreen
  label: Activate Touchscreen Calibration
  kind: action
  command: "<Esc>(CDT"
  params: []

- id: calibrate_whiteboard
  label: Activate Whiteboard Calibration
  kind: action
  command: "<Esc>(CDW"
  params: []

- id: color_enable_black
  label: Enable Black
  kind: action
  command: "<Esc>(CEB1"
  params: []

- id: color_disable_black
  label: Disable Black
  kind: action
  command: "<Esc>(CEBØ"
  params: []

- id: color_enable_cyan
  label: Enable Cyan
  kind: action
  command: "<Esc>(CEC1"
  params: []

- id: color_disable_cyan
  label: Disable Cyan
  kind: action
  command: "<Esc>(CECØ"
  params: []

- id: color_enable_green
  label: Enable Green
  kind: action
  command: "<Esc>(CEG1"
  params: []

- id: color_disable_green
  label: Disable Green
  kind: action
  command: "<Esc>(CEGØ"
  params: []

- id: color_enable_green_highlight
  label: Enable Green Highlight
  kind: action
  command: "<Esc>(CEHG1"
  params: []

- id: color_disable_green_highlight
  label: Disable Green Highlight
  kind: action
  command: "<Esc>(CEHGØ"
  params: []

- id: color_enable_pink_highlight
  label: Enable Pink Highlight
  kind: action
  command: "<Esc>(CEHP1"
  params: []

- id: color_disable_pink_highlight
  label: Disable Pink Highlight
  kind: action
  command: "<Esc>(CEHPØ"
  params: []

- id: color_enable_yellow_highlight
  label: Enable Yellow Highlight
  kind: action
  command: "<Esc>(CEHY1"
  params: []

- id: color_disable_yellow_highlight
  label: Disable Yellow Highlight
  kind: action
  command: "<Esc>(CEHYØ"
  params: []

- id: color_enable_pink
  label: Enable Pink
  kind: action
  command: "<Esc>(CEP1"
  params: []

- id: color_disable_pink
  label: Disable Pink
  kind: action
  command: "<Esc>(CEPØ"
  params: []

- id: color_enable_red
  label: Enable Red
  kind: action
  command: "<Esc>(CER1"
  params: []

- id: color_disable_red
  label: Disable Red
  kind: action
  command: "<Esc>(CERØ"
  params: []

- id: color_enable_white
  label: Enable White
  kind: action
  command: "<Esc>(CEW1"
  params: []

- id: color_disable_white
  label: Disable White
  kind: action
  command: "<Esc>(CEWØ"
  params: []

- id: color_enable_yellow
  label: Enable Yellow
  kind: action
  command: "<Esc>(CEY1"
  params: []

- id: color_disable_yellow
  label: Disable Yellow
  kind: action
  command: "<Esc>(CEYØ"
  params: []

- id: clear_markers
  label: Clear All Markers
  kind: action
  command: "<Esc>(CL"
  params: []

- id: move_active_marker
  label: Move Active Marker
  kind: action
  command: "<Esc>(CMXXXXYYYY"
  params:
    - name: x
      type: integer
      description: Horizontal coordinate on 2048-unit grid
    - name: y
      type: integer
      description: Vertical coordinate on 2048-unit grid

- id: freeze_off
  label: Turn Freeze Off
  kind: action
  command: "<Esc>(CPFØ"
  params: []

- id: freeze_on
  label: Activate Freeze
  kind: action
  command: "<Esc>(CPF1"
  params: []

- id: freeze_toggle
  label: Toggle Freeze
  kind: action
  command: "<Esc>(CPFT"
  params: []

- id: read_usb_image
  label: Read Image from USB Stick
  kind: action
  command: "<Esc>(CPInnnnn"
  params:
    - name: index
      type: integer
      description: Five-digit image index

- id: read_tftp_image
  label: Read Image from TFTP
  kind: action
  command: "<Esc>(CPNnnnnn"
  params:
    - name: index
      type: integer
      description: Five-digit image index

- id: print_current_image
  label: Print Current Image
  kind: action
  command: "<Esc>(CPP"
  params: []

- id: read_current_image
  label: Read Current Image
  kind: action
  command: "<Esc>(CPRD"
  params: []

- id: store_current_image
  label: Store Current Image
  kind: action
  command: "<Esc>(CPSD"
  params: []

- id: read_current_tftp_image
  label: Read Current TFTP Image
  kind: action
  command: "<Esc>(CPRT"
  params: []

- id: store_current_tftp_image
  label: Store Current TFTP Image
  kind: action
  command: "<Esc>(CPST"
  params: []

- id: select_black
  label: Select Black
  kind: action
  command: "<Esc>(CSB"
  params: []

- id: select_cyan
  label: Select Cyan
  kind: action
  command: "<Esc>(CSC"
  params: []

- id: display_color_change
  label: Display Color Change
  kind: action
  command: "<Esc>(CSD1"
  params: []

- id: hide_color_change
  label: Do Not Display Color Change
  kind: action
  command: "<Esc>(CSDØ"
  params: []

- id: toggle_color_change
  label: Toggle Color Change Display
  kind: action
  command: "<Esc>(CSDT"
  params: []

- id: select_previous_color
  label: Select Previous Color
  kind: action
  command: "<Esc>(CSE"
  params: []

- id: select_green
  label: Select Green
  kind: action
  command: "<Esc>(CSG"
  params: []

- id: select_green_highlight
  label: Select Green Highlight
  kind: action
  command: "<Esc>(CSHG"
  params: []

- id: select_pink_highlight
  label: Select Pink Highlight
  kind: action
  command: "<Esc>(CSHP"
  params: []

- id: select_yellow_highlight
  label: Select Yellow Highlight
  kind: action
  command: "<Esc>(CSHY"
  params: []

- id: select_highlight_color_mode
  label: Select Highlight Color Mode
  kind: action
  command: "<Esc>(CSMH"
  params: []

- id: select_multiplex_color_mode
  label: Select Multiplex Color Mode
  kind: action
  command: "<Esc>(CSMM"
  params: []

- id: toggle_color_mode
  label: Toggle Color Modes
  kind: action
  command: "<Esc>(CSMT"
  params: []

- id: select_next_color
  label: Select Next Color
  kind: action
  command: "<Esc>(CSN"
  params: []

- id: select_pink
  label: Select Pink
  kind: action
  command: "<Esc>(CSP"
  params: []

- id: select_red
  label: Select Red
  kind: action
  command: "<Esc>(CSR"
  params: []

- id: select_white
  label: Select White
  kind: action
  command: "<Esc>(CSW"
  params: []

- id: select_yellow
  label: Select Yellow
  kind: action
  command: "<Esc>(CSY"
  params: []

- id: assign_comm_device_type
  label: Assign COMM Port Device Type
  kind: action
  command: "<Esc>(DCTptt"
  params:
    - name: port
      type: integer
      description: COMM port selector digit, 0-9, designating ports 1-10
    - name: device_type
      type: integer
      description: Two-digit device type code

- id: initialize_comm_port
  label: Initialize COMM Port Immediately
  kind: action
  command: "<Esc>(DCAp"
  params:
    - name: port
      type: integer
      description: COMM port selector digit, 0-9, designating ports 1-10

- id: draw_line
  label: Draw Line
  kind: action
  command: "<Esc>(DLXXXXYYYYXXXXYYYY"
  params:
    - name: x1
      type: integer
      description: Starting horizontal coordinate
    - name: y1
      type: integer
      description: Starting vertical coordinate
    - name: x2
      type: integer
      description: Ending horizontal coordinate
    - name: y2
      type: integer
      description: Ending vertical coordinate

- id: disable_dvi_d_output
  label: Disable DVI-D Output
  kind: action
  command: "<Esc>(DODØ"
  params: []

- id: enable_dvi_d_output
  label: Enable DVI-D Output
  kind: action
  command: "<Esc>(DOD1"
  params: []

- id: toggle_dvi_d_output
  label: Toggle DVI-D Output
  kind: action
  command: "<Esc>(DODT"
  params: []

- id: disable_hdmi_output
  label: Disable HDMI Output
  kind: action
  command: "<Esc>(DOHØ"
  params: []

- id: enable_hdmi_output
  label: Enable HDMI Output
  kind: action
  command: "<Esc>(DOH1"
  params: []

- id: toggle_hdmi_output
  label: Toggle HDMI Output
  kind: action
  command: "<Esc>(DOHT"
  params: []

- id: disable_dvi_a_output
  label: Disable DVI-A Output
  kind: action
  command: "<Esc>(DOVØ"
  params: []

- id: enable_dvi_a_output
  label: Enable DVI-A Output
  kind: action
  command: "<Esc>(DOV1"
  params: []

- id: toggle_dvi_a_output
  label: Toggle DVI-A Output
  kind: action
  command: "<Esc>(DOVT"
  params: []

- id: drop_marker
  label: Drop Active Marker
  kind: action
  command: "<Esc>(DPXXXXYYYY"
  params:
    - name: x
      type: integer
      description: Horizontal coordinate
    - name: y
      type: integer
      description: Vertical coordinate

- id: assign_usb_vendor_product_type
  label: Assign USB Vendor and Product Device Type
  kind: action
  command: "<Esc>(DUIvvvvpppptt"
  params:
    - name: vendor
      type: integer
      description: Four-digit vendor number
    - name: product
      type: integer
      description: Four-digit product ID
    - name: device_type
      type: integer
      description: Device type code

- id: assign_usb_port_type
  label: Assign USB Port Device Type
  kind: action
  command: "<Esc>(DUPpptt"
  params:
    - name: port
      type: integer
      description: Two-digit USB port selector, 00-14
    - name: device_type
      type: integer
      description: Device type code

- id: echo_all
  label: Echo All Input
  kind: action
  command: "<Esc>(EA"
  params: []

- id: echo_except_commands
  label: Echo All Except Commands
  kind: action
  command: "<Esc>(EC"
  params: []

- id: echo_disable
  label: Disable Echo
  kind: action
  command: "<Esc>(EN"
  params: []

- id: echo_ok
  label: Echo OK
  kind: action
  command: "<Esc>(EO"
  params: []

- id: erase_undo
  label: Erase Method Undo
  kind: action
  command: "<Esc>(EM0"
  params: []

- id: erase_small
  label: Erase Using Small Eraser
  kind: action
  command: "<Esc>(EM1"
  params: []

- id: erase_medium
  label: Erase Using Medium Eraser
  kind: action
  command: "<Esc>(EM2"
  params: []

- id: erase_large
  label: Erase Using Large Eraser
  kind: action
  command: "<Esc>(EM3"
  params: []

- id: frame_size
  label: Set Active Frame Size
  kind: action
  command: "<Esc>(FSXXXXYYYY"
  params:
    - name: width
      type: integer
      description: Horizontal dimension, 0001-2048
    - name: height
      type: integer
      description: Vertical dimension, 0001-2048

- id: frame_box
  label: Box Frame
  kind: action
  command: "<Esc>(FTBØ"
  params: []

- id: frame_filled_box
  label: Filled Box Frame
  kind: action
  command: "<Esc>(FTB1"
  params: []

- id: frame_circle
  label: Circle Frame
  kind: action
  command: "<Esc>(FTCØ"
  params: []

- id: frame_filled_circle
  label: Filled Circle Frame
  kind: action
  command: "<Esc>(FTC1"
  params: []

- id: frame_next
  label: Next Frame
  kind: action
  command: "<Esc>(FTN"
  params: []

- id: brightness_absolute
  label: Set Marker Brightness
  kind: action
  command: "<Esc>(ISXXX"
  params:
    - name: level
      type: integer
      description: Absolute brightness value, -256 to 256

- id: brightness_increase
  label: Increase Marker Brightness
  kind: action
  command: "<Esc>(ICXXX"
  params:
    - name: level
      type: integer
      description: Relative brightness value, -256 to 256

- id: brightness_decrease
  label: Decrease Marker Brightness
  kind: action
  command: "<Esc>(IC-XXX"
  params:
    - name: level
      type: integer
      description: Relative brightness value, -256 to 256

- id: image_directory
  label: Set Image File Directory
  kind: action
  command: "<Esc>(IFDccc..."
  params:
    - name: directory
      type: string
      description: Directory, maximum 8 characters, terminated by carriage return

- id: image_index
  label: Set Image File Index
  kind: action
  command: "<Esc>(IFInnnnn"
  params:
    - name: index
      type: integer
      description: Five-digit image index

- id: image_prefix
  label: Set Image File Prefix
  kind: action
  command: "<Esc>(IFPccc..."
  params:
    - name: prefix
      type: string
      description: Prefix, maximum 3 characters, terminated by carriage return

- id: identify_open_mode
  label: Assign Open Mode
  kind: action
  command: "<Esc>(IMO"
  params: []

- id: identify_selective_mode
  label: Assign Selective Mode
  kind: action
  command: "<Esc>(IMS"
  params: []

- id: identify_priority_mode
  label: Assign Priority User Mode
  kind: action
  command: "<Esc>(IMP"
  params: []

- id: identify_priority_comm_port
  label: Set Priority User COMM Port
  kind: action
  command: "<Esc>(IMCXX"
  params:
    - name: port
      type: integer
      description: COMM port number, 01-10

- id: line_fine
  label: Fine Line
  kind: action
  command: "<Esc>(LF"
  params: []

- id: line_fine_shadow
  label: Fine Line with Drop Shadow
  kind: action
  command: "<Esc>(LSF"
  params: []

- id: line_medium
  label: Medium Line
  kind: action
  command: "<Esc>(LM"
  params: []

- id: line_medium_shadow
  label: Medium Line with Drop Shadow
  kind: action
  command: "<Esc>(LSM"
  params: []

- id: line_bold
  label: Bold Line
  kind: action
  command: "<Esc>(LB"
  params: []

- id: line_bold_shadow
  label: Bold Line with Drop Shadow
  kind: action
  command: "<Esc>(LSB"
  params: []

- id: line_wide
  label: Wide Line
  kind: action
  command: "<Esc>(LW"
  params: []

- id: line_wide_shadow
  label: Wide Line with Shadow
  kind: action
  command: "<Esc>(LSW"
  params: []

- id: line_previous
  label: Previous Line Style
  kind: action
  command: "<Esc>(LP"
  params: []

- id: line_next
  label: Next Line Style
  kind: action
  command: "<Esc>(LN"
  params: []

- id: keyboard_input
  label: Keyboard Input
  kind: action
  command: "<Esc>(Knn"
  params:
    - name: key
      type: string
      description: Two-digit hexadecimal key code

- id: video_input_composite_1_ntsc
  label: Composite 1 NTSC
  kind: action
  command: "<Esc>(MC1N"
  params: []

- id: video_input_composite_2_ntsc
  label: Composite 2 NTSC
  kind: action
  command: "<Esc>(MC2N"
  params: []

- id: video_input_yc_ntsc
  label: Y/C NTSC
  kind: action
  command: "<Esc>(MYN"
  params: []

- id: video_input_composite_1_pal
  label: Composite 1 PAL
  kind: action
  command: "<Esc>(MC1P"
  params: []

- id: video_input_composite_2_pal
  label: Composite 2 PAL
  kind: action
  command: "<Esc>(MC2P"
  params: []

- id: video_input_yc_pal
  label: Y/C 1 PAL
  kind: action
  command: "<Esc>(MYP"
  params: []

- id: video_input_vga
  label: VGA
  kind: action
  command: "<Esc>(MV"
  params: []

- id: video_input_dvi_a_1
  label: DVI-A1
  kind: action
  command: "<Esc>(MDA1"
  params: []

- id: video_input_dvi_a_2
  label: DVI-A2
  kind: action
  command: "<Esc>(MDA2"
  params: []

- id: video_input_dvi_d_1
  label: DVI-D1
  kind: action
  command: "<Esc>(MDD1"
  params: []

- id: video_input_dvi_d_2
  label: DVI-D2
  kind: action
  command: "<Esc>(MDD2"
  params: []

- id: video_input_hdmi_1
  label: HDMI1
  kind: action
  command: "<Esc>(MH1"
  params: []

- id: video_input_hdmi_2
  label: HDMI2
  kind: action
  command: "<Esc>(MH2"
  params: []

- id: verify_ok
  label: Verify Dialog OK
  kind: action
  command: "<Esc>(MEØ"
  params: []

- id: verify_retry
  label: Verify Dialog Retry
  kind: action
  command: "<Esc>(ME1"
  params: []

- id: verify_cancel
  label: Verify Dialog Cancel
  kind: action
  command: "<Esc>(ME2"
  params: []

- id: pass_through_enable
  label: Enable Pass-through
  kind: action
  command: "<Esc>(PA1"
  params: []

- id: pass_through_disable
  label: Disable Pass-through
  kind: action
  command: "<Esc>(PAØ"
  params: []

- id: pass_through_toggle
  label: Toggle Pass-through
  kind: action
  command: "<Esc>(PAT"
  params: []

- id: pointer_circle
  label: Display Circle Pointer
  kind: action
  command: "<Esc>(PTC"
  params: []

- id: pointer_down_left
  label: Display Down Left Arrow
  kind: action
  command: "<Esc>(PTDL"
  params: []

- id: pointer_down
  label: Display Down Arrow
  kind: action
  command: "<Esc>(PTDØ"
  params: []

- id: pointer_down_right
  label: Display Down Right Arrow
  kind: action
  command: "<Esc>(PTDR"
  params: []

- id: pointer_left
  label: Display Left Arrow
  kind: action
  command: "<Esc>(PTL"
  params: []

- id: pointer_hide
  label: Hide Pointer
  kind: action
  command: "<Esc>(PTN"
  params: []

- id: pointer_crosshairs
  label: Display Cross Hairs
  kind: action
  command: "<Esc>(PTP"
  params: []

- id: pointer_small_circle
  label: Display Small Circle
  kind: action
  command: "<Esc>(PTSC"
  params: []

- id: pointer_small_crosshairs
  label: Display Small Cross Hairs
  kind: action
  command: "<Esc>(PTSP"
  params: []

- id: pointer_toggle_enable
  label: Enable Pointer Toggle
  kind: action
  command: "<Esc>(PTT1"
  params: []

- id: pointer_toggle_off
  label: Turn Pointer Off
  kind: action
  command: "<Esc>(PTT2"
  params: []

- id: pointer_toggle_on
  label: Turn Pointer On
  kind: action
  command: "<Esc>(PTT3"
  params: []

- id: pointer_toggle
  label: Toggle Pointer On/Off
  kind: action
  command: "<Esc>(PTT4"
  params: []

- id: pointer_next
  label: Display Next Pointer
  kind: action
  command: "<Esc>(PTT5"
  params: []

- id: pointer_toggle_disable
  label: Disable Pointer Toggle
  kind: action
  command: "<Esc>(PTTØ"
  params: []

- id: pointer_up_left
  label: Display Up Left Arrow
  kind: action
  command: "<Esc>(PTUL"
  params: []

- id: pointer_up
  label: Display Up Arrow
  kind: action
  command: "<Esc>(PTUØ"
  params: []

- id: pointer_up_right
  label: Display Up Right Arrow
  kind: action
  command: "<Esc>(PTUR"
  params: []

- id: proximity_on
  label: Turn Proximity On
  kind: action
  command: "<Esc>(PX1"
  params: []

- id: proximity_off
  label: Turn Proximity Off
  kind: action
  command: "<Esc>(PXØ"
  params: []

- id: proximity_toggle
  label: Toggle Proximity
  kind: action
  command: "<Esc>(PXT"
  params: []

- id: restart_soft
  label: Restart Saving Settings and Markers
  kind: action
  command: "<Esc>(RS"
  params: []

- id: restart_hard
  label: Restart Clearing Settings and Markers
  kind: action
  command: "<Esc>(RH"
  params: []

- id: date_time_time_only
  label: Display Date/Time Marker in Time-only Mode
  kind: action
  command: "<Esc>(STØ"
  params: []

- id: date_only
  label: Display Date/Time Marker in Date-only Mode
  kind: action
  command: "<Esc>(SDØ"
  params: []

- id: date_time_toggle
  label: Display Date/Time Marker in Time-only Mode
  kind: action
  command: "<Esc>(SDT"
  params: []

- id: set_date
  label: Set Date
  kind: action
  command: "<Esc>(SDSMMDDYYYY"
  params:
    - name: date
      type: string
      description: Date formatted as MMDDYYYY

- id: set_time_am
  label: Set AM Time
  kind: action
  command: "<Esc>(STAHHMM"
  params:
    - name: time
      type: string
      description: Time formatted as HHMM

- id: set_time_pm
  label: Set PM Time
  kind: action
  command: "<Esc>(STPHHMM"
  params:
    - name: time
      type: string
      description: Time formatted as HHMM

- id: scaler_auto_adjust
  label: Scaler Auto Adjust
  kind: action
  command: "<Esc>(SCA"
  params: []

- id: scaler_output_format
  label: Set Scaler Output Format
  kind: action
  command: "<Esc>(SCOnn"
  params:
    - name: format
      type: integer
      description: Numeric output-format code, 00-23

- id: sync_horizontal_default
  label: Default Horizontal Sync Polarity
  kind: action
  command: "<Esc>(SCPHD"
  params: []

- id: sync_horizontal_negative
  label: Negative Horizontal Sync Polarity
  kind: action
  command: "<Esc>(SCPHD"
  params: []

- id: sync_horizontal_positive
  label: Positive Horizontal Sync Polarity
  kind: action
  command: "<Esc>(SCPHD"
  params: []

- id: sync_vertical_default
  label: Default Vertical Sync Polarity
  kind: action
  command: "<Esc>(SCPVD"
  params: []

- id: sync_vertical_negative
  label: Negative Vertical Sync Polarity
  kind: action
  command: "<Esc>(SCPVD"
  params: []

- id: sync_vertical_positive
  label: Positive Vertical Sync Polarity
  kind: action
  command: "<Esc>(SCPVD"
  params: []

- id: scaler_reinitialize
  label: Reinitialize Scaler
  kind: action
  command: "<Esc>(SCR"
  params: []

- id: activate_menu
  label: Activate Menu System
  kind: action
  command: "<Esc>(SUM"
  params: []

- id: display_character
  label: Display Single Character
  kind: action
  command: "<Esc>(TTc"
  params:
    - name: character
      type: string
      description: Displayable character

- id: display_text_block
  label: Display Text Block
  kind: action
  command: "<Esc>(TBccc..."
  params:
    - name: text
      type: string
      description: Displayable text block

- id: font_ti_roman
  label: Change Font to TI Roman
  kind: action
  command: "<Esc>(TFØ"
  params: []

- id: font_helvetica
  label: Change Font to Helvetica
  kind: action
  command: "<Esc>(TF1"
  params: []

- id: font_ti_dom_casual
  label: Change Font to TI Dom Casual
  kind: action
  command: "<Esc>(TF2"
  params: []

- id: font_fargo
  label: Change Font to Fargo
  kind: action
  command: "<Esc>(TF3"
  params: []

- id: font_symbol
  label: Change Font to Symbol
  kind: action
  command: "<Esc>(TF4"
  params: []

- id: font_map
  label: Change Font to Map
  kind: action
  command: "<Esc>(TF5"
  params: []

- id: font_next
  label: Change to Next Font
  kind: action
  command: "<Esc>(TN"
  params: []

- id: font_previous
  label: Change to Previous Font
  kind: action
  command: "<Esc>(TP"
  params: []

- id: font_size_small
  label: Small Font Size
  kind: action
  command: "<Esc>(TSØ"
  params: []

- id: font_size_medium
  label: Medium Font Size
  kind: action
  command: "<Esc>(TS1"
  params: []

- id: font_size_large
  label: Large Font Size
  kind: action
  command: "<Esc>(TS2"
  params: []

- id: font_size_extra_large
  label: Extra Large Font Size
  kind: action
  command: "<Esc>(TS3"
  params: []

- id: template_presenter
  label: Presenter Template
  kind: action
  command: "<Esc>(TAØ"
  params: []

- id: template_broadcaster
  label: Broadcaster Template
  kind: action
  command: "<Esc>(TA1"
  params: []

- id: template_pc
  label: PC Template
  kind: action
  command: "<Esc>(TA2"
  params: []

- id: touchscreen_corners_disable
  label: Disable Corner Function Areas
  kind: action
  command: "<Esc>(TCØ"
  params: []

- id: touchscreen_corners_enable
  label: Enable Corner Function Areas
  kind: action
  command: "<Esc>(TC1"
  params: []

- id: touchscreen_corners_toggle
  label: Toggle Corner Function Areas
  kind: action
  command: "<Esc>(TC2"
  params: []

- id: right_click_disable
  label: Disable Touchscreen Right Click Emulation
  kind: action
  command: "<Esc>(TRØ"
  params: []

- id: right_click_enable
  label: Enable Touchscreen Right Click Emulation
  kind: action
  command: "<Esc>(TR1"
  params: []

- id: right_click_toggle
  label: Toggle Touchscreen Right Click Emulation
  kind: action
  command: "<Esc>(TRT"
  params: []

- id: undo_marker
  label: Undo Last Anchored Marker
  kind: action
  command: "<Esc>(U"
  params: []

- id: display_overlay
  label: Display Overlay
  kind: action
  command: "<Esc>(V#"
  params:
    - name: overlay
      type: integer
      description: Overlay number

- id: next_overlay
  label: Display Next Overlay
  kind: action
  command: "<Esc>(VN"
  params: []

- id: previous_overlay
  label: Display Previous Overlay
  kind: action
  command: "<Esc>(VP"
  params: []

- id: video_input_change_display_disable
  label: Do Not Display Video Input Change
  kind: action
  command: "<Esc>(VCDØ"
  params: []

- id: video_input_change_display_enable
  label: Display Video Input Change
  kind: action
  command: "<Esc>(VCD1"
  params: []

- id: video_input_change_display_toggle
  label: Toggle Video Input Change Display
  kind: action
  command: "<Esc>(VCDT"
  params: []

- id: next_video_input
  label: Next Video Input
  kind: action
  command: "<Esc>(VIN"
  params: []

- id: previous_video_input
  label: Previous Video Input
  kind: action
  command: "<Esc>(VIP"
  params: []

- id: hdcp_off
  label: HDCP Off
  kind: action
  command: "<Esc>(VIHØ"
  params: []

- id: hdcp_on
  label: HDCP On
  kind: action
  command: "<Esc>(VIH1"
  params: []

- id: hdcp_toggle
  label: Toggle HDCP
  kind: action
  command: "<Esc>(VIHT"
  params: []
```

## Feedbacks
```yaml
- id: command_ok
  type: acknowledgment
  command: "OK <cr> <lf>"
  description: Returned when echo-OK mode is enabled and command OK is received.
```

## Variables
```yaml
- id: marker_brightness
  type: integer
  range:
    min: -256
    max: 256
  description: Marker intensity or brightness level.
```

## Events
```yaml
# UNRESOLVED: unsolicited notifications are not stated in source
```

## Macros
```yaml
# UNRESOLVED: explicit multi-step macros are not stated in source
```

## Safety
```yaml
confirmation_required_for:
  - restart_hard
interlocks:
  - Only one of the two COMM ports may be assigned as Control Port.
```

## Notes
All RS-232 commands begin with ASCII Escape followed by `(`. Hardware handshaking is required, and the source specifies use of a null modem cable. Factory serial settings are 9600 baud, no parity, 1 stop bit, and 8 data bits.

The source warns that COMM port pin 9 may supply voltage to DTX-DRV RS-232 line drivers and can cause unexpected issues with other devices. COMM ports have hardware-handshake lines on pins 7 and 8.

TCP/IP networking supports sending Pointmaker commands, but the command socket port is not stated. Port 515 is documented for network PostScript printing, port 10001 for Multipoint, and port 69 for TFTP; these are service ports, not identified as Pointmaker command-control ports.

<!-- UNRESOLVED: device error responses and fault recovery sequence not stated in source. -->
<!-- UNRESOLVED: firmware compatibility range not stated in source. -->

## Provenance

```yaml
source_domains:
  - williamsav.com
source_urls:
  - https://williamsav.com/wp-content/uploads/2020/04/cpn-5000-UG-0213.pdf
retrieved_at: 2026-07-24T20:32:22.873Z
last_checked_at: 2026-08-05T08:13:54.695Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:13:54.695Z
matched_actions: 205
action_count: 205
confidence: medium
summary: "All 205 spec actions match wire tokens in source; transport parameters (9600 baud, 8/N/1, hardware handshaking) verified; only PTR is not represented in spec. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "PTR (Display Right Arrow)"
- "TCP command transport framing and control port are not stated in source."
- "Feedback response coverage is limited; source documents only echo behavior and an optional OK response."
- "Firmware compatibility version is not stated in source."
- "unsolicited notifications are not stated in source"
- "explicit multi-step macros are not stated in source"
- "device error responses and fault recovery sequence not stated in source."
- "firmware compatibility range not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
