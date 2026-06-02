---
spec_id: admin/extron-dtpcrosspoint84
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron DTP CrossPoint 84 Control Spec"
manufacturer: Extron
model_family: "DTP CrossPoint 84"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "DTP CrossPoint 84"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/68-2349-01_D.pdf
  - https://www.extron.com
retrieved_at: 2026-05-18T07:44:52.721Z
last_checked_at: 2026-06-02T00:54:04.624Z
generated_at: 2026-06-02T00:54:04.624Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "USB Configuration port protocol is for firmware/upload only and is not covered. Web browser SIS-over-HTTP is mentioned for file directory queries but not detailed as a control surface."
  - "source does not document explicit safety warnings, power-on sequencing, or destructive"
  - "web browser SIS-over-HTTP is mentioned for file directory responses but not detailed as a control surface; no full HTTP path/method catalogue given."
verification:
  verdict: verified
  checked_at: 2026-06-02T00:54:04.624Z
  matched_actions: 179
  action_count: 179
  confidence: medium
  summary: "All 179 spec actions matched literally to source commands with correct wire tokens and parameter shapes; transport parameters (port 23, 9600 baud, 8 data bits, no parity, 1 stop bit, no flow control) verified in source; source command inventory fully represented by spec. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Extron DTP CrossPoint 84 Control Spec

## Summary
The Extron DTP CrossPoint 84 is an 8x4 matrix switcher with integrated audio DSP, scaling output, and HDBaseT/HDMI I/O. This spec covers the Extron Simple Instruction Set (SIS) used to control the device over RS-232 (Remote captive-screw port) and TCP/IP (Ethernet, port 23). It enumerates matrix tying, EDID management, HDCP control, video/audio mute, scaler output, audio DSP, and configuration commands.

<!-- UNRESOLVED: USB Configuration port protocol is for firmware/upload only and is not covered. Web browser SIS-over-HTTP is mentioned for file directory queries but not detailed as a control surface. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: password  # source describes optional administrator and user passwords (up to 12 alphanumeric chars)
```

## Traits
```yaml
- routable  # inferred from input/output tying and audio routing commands
- levelable  # inferred from scaler brightness/contrast and DSP gain commands
- queryable  # inferred from extensive "View" / "Read" commands throughout
```

## Actions
```yaml
# Create Ties
- id: tie_input_to_output_video_audio
  label: Tie Input Video and Audio to Output
  kind: action
  command: "X!*X@!"
  params:
    - name: input
      type: integer
      description: Input number 01-08
    - name: output
      type: integer
      description: Output number 01-04
- id: tie_input_video_only
  label: Tie Input Video Only to Output
  kind: action
  command: "X!*X@%"
  params:
    - name: input
      type: integer
      description: Input number 01-08
    - name: output
      type: integer
      description: Output number 01-04
- id: tie_input_audio_only
  label: Tie Input Audio Only to Output
  kind: action
  command: "X!*X@$"
  params:
    - name: input
      type: integer
      description: Input number 01-08
    - name: output
      type: integer
      description: Output number 01-04
- id: untie_output
  label: Untie Input from Output (Video and Audio)
  kind: action
  command: "0*X@!"
  params:
    - name: output
      type: integer
      description: Output number 01-04
- id: quick_multiple_tie
  label: Quick Multiple Tie
  kind: action
  command: "E+Q X!*X@! ... X!*X@$ }"
  params:
    - name: ties
      type: string
      description: Up to 8 tie commands concatenated, each followed by separator
- id: tie_input_to_all_outputs_av
  label: Tie Input to All Outputs (Video and Audio)
  kind: action
  command: "X!*!"
  params:
    - name: input
      type: integer
      description: Input number 01-08 (0 clears all)
- id: tie_input_to_all_outputs_video
  label: Tie Input to All Outputs (Video Only)
  kind: action
  command: "X!*%"
  params:
    - name: input
      type: integer
      description: Input number 01-08
- id: tie_input_to_all_outputs_audio
  label: Tie Input to All Outputs (Audio Only)
  kind: action
  command: "X!*$"
  params:
    - name: input
      type: integer
      description: Input number 01-08

# Read Ties
- id: read_video_output_tie
  label: Read Video Output Tie
  kind: query
  command: "X@%"
  params:
    - name: output
      type: integer
      description: Output number 01-04
- id: read_audio_output_tie
  label: Read Audio Output Tie
  kind: query
  command: "X@$"
  params:
    - name: output
      type: integer
      description: Output number 01-04

# EDID Commands
- id: write_edid
  label: Write EDID
  kind: action
  command: "EEX#*X!EDID }"
  params:
    - name: edid_value
      type: integer
      description: EDID value 01-82 (01-04 output pass-through, 05-74 built-in, 75-82 user slots)
    - name: input
      type: integer
      description: Input number 01-08
- id: read_edid
  label: Read EDID
  kind: query
  command: "EEX!EDID }"
  params:
    - name: input
      type: integer
      description: Input number 01-08
- id: copy_edid
  label: Copy EDID
  kind: action
  command: "ECX!*X@EDID }"
  params:
    - name: source_input
      type: integer
      description: Source input number 01-08
    - name: dest_input
      type: integer
      description: Destination input number 01-08

# Video Mutes
- id: mute_video_only
  label: Mute Video Only
  kind: action
  command: "X@*1B"
  params:
    - name: output
      type: integer
      description: Output number 01-04
- id: mute_video_and_sync
  label: Mute Video and Sync
  kind: action
  command: "X@*2B"
  params:
    - name: output
      type: integer
      description: Output number 01-04
- id: unmute_video
  label: Unmute Video
  kind: action
  command: "X@*0B"
  params:
    - name: output
      type: integer
      description: Output number 01-04
- id: read_video_mute
  label: Read Video Mute
  kind: query
  command: "X@B"
  params:
    - name: output
      type: integer
      description: Output number 01-04
- id: global_video_mute
  label: Global Video Mute
  kind: action
  command: "1*B"
- id: global_video_sync_mute
  label: Global Video and Sync Mute
  kind: action
  command: "2*B"
- id: global_video_unmute
  label: Global Video Unmute
  kind: action
  command: "0*B"

# Audio Routing Selections
- id: set_input_audio_selection
  label: Set Input Audio Selection
  kind: action
  command: "EIX!*X^AFMT }"
  params:
    - name: input
      type: integer
      description: Input number 01-08
    - name: audio_source
      type: integer
      description: Audio source (0=Auto digital priority, 1-8=analog from input N)
- id: view_input_audio_selection
  label: View Input Audio Selection
  kind: query
  command: "EIX!AFMT }"
  params:
    - name: input
      type: integer
      description: Input number 01-08
- id: view_all_input_audio_selections
  label: View All Input Audio Selections
  kind: query
  command: "EIAFMT }"
- id: set_output_audio_hdmi
  label: Set Output Audio HDMI Embed Source
  kind: action
  command: "EOX@*X&AFMT }"
  params:
    - name: output
      type: integer
      description: Output number 01-04
    - name: audio_source
      type: integer
      description: Audio source 0-8
- id: view_output_audio_breakaway
  label: View Output Audio Breakaway Selection
  kind: query
  command: "EOX@AFMT }"
  params:
    - name: output
      type: integer
      description: Output number 01-04
- id: view_all_output_audio_breakaway
  label: View All Output Audio Breakaway Selections
  kind: query
  command: "EOAFMT }"

# Audio Input Format
- id: view_detected_digital_audio_format
  label: View Detected Digital Input Audio Format
  kind: query
  command: "E40*X!STAT }"
  params:
    - name: input
      type: integer
      description: Input number 01-08

# HDCP Authorized Reporting
- id: set_hdcp_authorized
  label: Set Input to Report as HDCP Authorized
  kind: action
  command: "EEX!*1HDCP }"
  params:
    - name: input
      type: integer
      description: Input number 01-08
- id: set_hdcp_not_authorized
  label: Set Input to Report as Not HDCP Authorized
  kind: action
  command: "EEX!*0HDCP }"
  params:
    - name: input
      type: integer
      description: Input number 01-08
- id: view_hdcp_authorized_status
  label: View HDCP Authorized Status
  kind: query
  command: "EEX!HDCP }"
  params:
    - name: input
      type: integer
      description: Input number 01-08

# HDMI Output HDCP Settings
- id: set_output_hdcp_auto
  label: Set Output HDCP Mode to Auto
  kind: action
  command: "ESX@*0HDCP }"
  params:
    - name: output
      type: integer
      description: Output number 01-04
- id: set_output_hdcp_follow_dvi
  label: Set Output HDCP Mode to Follow (DVI)
  kind: action
  command: "ESX@*2HDCP }"
  params:
    - name: output
      type: integer
      description: Output number 01-04
- id: set_output_hdcp_on
  label: Set Output HDCP Mode to On
  kind: action
  command: "ESX@*1HDCP }"
  params:
    - name: output
      type: integer
      description: Output number 01-04
- id: set_output_hdcp_on_dvi
  label: Set Output HDCP Mode to On (DVI)
  kind: action
  command: "ESX@*3HDCP }"
  params:
    - name: output
      type: integer
      description: Output number 01-04
- id: view_output_hdcp_mode
  label: View Output HDCP Mode
  kind: query
  command: "ESX@HDCP }"
  params:
    - name: output
      type: integer
      description: Output number 01-04

# HDCP Status
- id: view_input_hdcp_status
  label: View Input HDCP Status
  kind: query
  command: "EIX!HDCP }"
  params:
    - name: input
      type: integer
      description: Input number 01-08
- id: view_all_input_hdcp_status
  label: View HDCP Status of All Inputs
  kind: query
  command: "EIHDCP }"
- id: view_output_hdcp_status
  label: View Output HDCP Status
  kind: query
  command: "EOX@HDCP }"
  params:
    - name: output
      type: integer
      description: Output number 01-04
- id: view_all_output_hdcp_status
  label: View HDCP Status of All Outputs
  kind: query
  command: "EOHDCP }"

# Output Format
- id: set_output_format
  label: Set Output Format
  kind: action
  command: "EX@*X1#VTPO }"
  params:
    - name: output
      type: integer
      description: Output number 01-04
    - name: format_code
      type: integer
      description: Output format code (refer to source for HDCP/voltage values)
- id: view_output_format
  label: View Output Format
  kind: query
  command: "EX@VTPO }"
  params:
    - name: output
      type: integer
      description: Output number 01-04

# Output Video Bit Depth
- id: set_output_bit_depth
  label: Set Output Bit Depth
  kind: action
  command: "EX@*X1$BITD }"
  params:
    - name: output
      type: integer
      description: Output number 01-04
    - name: bit_depth
      type: integer
      description: Bit depth value
- id: view_output_bit_depth
  label: View Output Bit Depth
  kind: query
  command: "EX@BITD }"
  params:
    - name: output
      type: integer
      description: Output number 01-04

# View Ties and Mutes
- id: view_video_output_mutes
  label: View Video Output Mutes
  kind: query
  command: "EVM }"

# Input Sync Detection
- id: view_all_input_connections
  label: View All Input Connections
  kind: query
  command: "0LS"
- id: view_input_switch_position
  label: View Input Switch Position
  kind: query
  command: "EIX1&HDBT }"
  params:
    - name: input
      type: integer
      description: Input number 01-08
- id: view_output_switch_position
  label: View Output Switch Position
  kind: query
  command: "EOX1(HDBT }"
  params:
    - name: output
      type: integer
      description: Output number 01-04

# Names
- id: write_input_name
  label: Write Input Name
  kind: action
  command: "EX!,X2)NI }"
  params:
    - name: input
      type: integer
      description: Input number 01-08
    - name: name
      type: string
      description: Name string
- id: read_input_name
  label: Read Input Name
  kind: query
  command: "EX!NI }"
  params:
    - name: input
      type: integer
      description: Input number 01-08
- id: write_output_name
  label: Write Output Name
  kind: action
  command: "EX@,X2)NO }"
  params:
    - name: output
      type: integer
      description: Output number 01-04
    - name: name
      type: string
      description: Name string
- id: read_output_name
  label: Read Output Name
  kind: query
  command: "EX@NO }"
  params:
    - name: output
      type: integer
      description: Output number 01-04
- id: write_edid_name
  label: Write EDID Name
  kind: action
  command: "EEX#*X2)UNAM }"
  params:
    - name: edid_slot
      type: integer
      description: EDID slot 75-82
    - name: name
      type: string
      description: Name string
- id: clear_edid_name
  label: Clear EDID Name
  kind: action
  command: "EEX#* UNAM }"
  params:
    - name: edid_slot
      type: integer
      description: EDID slot 75-82
- id: read_edid_name
  label: Read EDID Name
  kind: query
  command: "EEX#UNAM }"
  params:
    - name: edid_slot
      type: integer
      description: EDID slot 75-82
- id: write_scaler_preset_name
  label: Write Scaler Preset Name
  kind: action
  command: "E2*X2#,X2)PNAM }"
  params:
    - name: preset
      type: integer
      description: Scaler preset 001-128
    - name: name
      type: string
      description: Name string
- id: read_scaler_preset_name
  label: Read Scaler Preset Name
  kind: query
  command: "E2*X2#PNAM }"
  params:
    - name: preset
      type: integer
      description: Scaler preset 001-128

# Recall Presets
- id: recall_global_preset
  label: Recall Global Preset
  kind: action
  command: "X2!."
  params:
    - name: preset
      type: integer
      description: Preset number (up to 32)

# Resets
- id: system_reset_factory_default
  label: System Reset (Factory Default)
  kind: action
  command: "EZXXX }"
- id: absolute_reset_including_ip
  label: Absolute Reset (Including IP)
  kind: action
  command: "EZQQQ }"
- id: absolute_reset_excluding_ip
  label: Absolute Reset (Excluding IP)
  kind: action
  command: "EZY }"

# Executive Modes
- id: lock_all_front_panel
  label: Lock All Front Panel Functions (Mode 1)
  kind: action
  command: "1X"
- id: lock_advanced_front_panel
  label: Lock Advanced Front Panel Functions (Mode 2)
  kind: action
  command: "2X"
- id: unlock_front_panel
  label: Unlock All Front Panel Functions (Mode 0)
  kind: action
  command: "0X"
- id: view_lock_status
  label: View Lock Status
  kind: query
  command: "X"

# Information Requests
- id: information_request
  label: Information Request
  kind: query
  command: "I"
- id: request_part_number
  label: Request Part Number
  kind: query
  command: "N"
- id: query_firmware_version
  label: Query Controller Firmware Version
  kind: query
  command: "Q"
- id: query_firmware_version_verbose
  label: Query Controller Firmware Version (Verbose)
  kind: query
  command: "0Q"
- id: request_system_status
  label: Request System Status
  kind: query
  command: "S"
- id: view_file_directory_rs232
  label: View File Directory (RS-232/Telnet)
  kind: query
  command: "EDF }"
- id: view_file_directory_web
  label: View File Directory (Web)
  kind: query
  command: "EDF }"

# Scaler Output - Brightness
- id: set_brightness
  label: Set Brightness Value
  kind: action
  command: "EX1(*X2(BRIT }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
    - name: value
      type: integer
      description: Picture adjustment value
- id: increment_brightness
  label: Increment Brightness
  kind: action
  command: "EX1(+BRIT }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: decrement_brightness
  label: Decrement Brightness
  kind: action
  command: "EX1(-BRIT }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: view_brightness
  label: View Brightness
  kind: query
  command: "EX1(BRIT }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04

# Scaler Output - Contrast
- id: set_contrast
  label: Set Contrast Value
  kind: action
  command: "EX1(*X2(CONT }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
    - name: value
      type: integer
      description: Picture adjustment value
- id: increment_contrast
  label: Increment Contrast
  kind: action
  command: "EX1(+CONT }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: decrement_contrast
  label: Decrement Contrast
  kind: action
  command: "EX1(-CONT }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: view_contrast
  label: View Contrast
  kind: query
  command: "EX1(CONT }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04

# Scaler Output - Detail
- id: set_detail
  label: Set Detail Value
  kind: action
  command: "EX1(*X2(HDET }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
    - name: value
      type: integer
      description: Picture adjustment value
- id: increment_detail
  label: Increment Detail
  kind: action
  command: "EX1(+HDET }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: decrement_detail
  label: Decrement Detail
  kind: action
  command: "EX1(-HDET }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: view_detail
  label: View Detail
  kind: query
  command: "EX1(HDET }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04

# Scaler Output - Horizontal Shift
- id: set_horizontal_shift
  label: Set Horizontal Shift
  kind: action
  command: "EX1(*X3)HCTR }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
    - name: position
      type: integer
      description: Position value (pixels, signed)
- id: increment_horizontal_shift
  label: Increment Horizontal Shift
  kind: action
  command: "EX1(+HCTR }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: decrement_horizontal_shift
  label: Decrement Horizontal Shift
  kind: action
  command: "EX1(-HCTR }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: view_horizontal_shift
  label: View Horizontal Shift
  kind: query
  command: "EX1(HCTR }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04

# Scaler Output - Vertical Shift
- id: set_vertical_shift
  label: Set Vertical Shift
  kind: action
  command: "EX1(*X3)VCTR }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
    - name: position
      type: integer
      description: Position value (lines, signed)
- id: increment_vertical_shift
  label: Increment Vertical Shift
  kind: action
  command: "EX1(+VCTR }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: decrement_vertical_shift
  label: Decrement Vertical Shift
  kind: action
  command: "EX1(-VCTR }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: view_vertical_shift
  label: View Vertical Shift
  kind: query
  command: "EX1(VCTR }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04

# Scaler Output - Horizontal Size
- id: set_horizontal_size
  label: Set Horizontal Size
  kind: action
  command: "EX1(*X3)HSIZ }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
    - name: size
      type: integer
      description: Size value (pixels)
- id: increment_horizontal_size
  label: Increment Horizontal Size
  kind: action
  command: "EX1(+HSIZ }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: decrement_horizontal_size
  label: Decrement Horizontal Size
  kind: action
  command: "EX1(-HSIZ }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: view_horizontal_size
  label: View Horizontal Size
  kind: query
  command: "EX1(HSIZ }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04

# Scaler Output - Vertical Size
- id: set_vertical_size
  label: Set Vertical Size
  kind: action
  command: "EX1(*X3)VSIZ }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
    - name: size
      type: integer
      description: Size value (pixels)
- id: increment_vertical_size
  label: Increment Vertical Size
  kind: action
  command: "EX1(+VSIZ }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: decrement_vertical_size
  label: Decrement Vertical Size
  kind: action
  command: "EX1(-VSIZ }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: view_vertical_size
  label: View Vertical Size
  kind: query
  command: "EX1(VSIZ }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04

# Scaler Output - Image (all values)
- id: specify_all_size_position
  label: Specify All Size and Position Values
  kind: action
  command: "EX1(,X3)*X3)*X3)*X3)XIMG }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
    - name: hpos
      type: integer
      description: Horizontal position (signed)
    - name: vpos
      type: integer
      description: Vertical position (signed)
    - name: hsize
      type: integer
      description: Horizontal size
    - name: vsize
      type: integer
      description: Vertical size
- id: view_all_size_position
  label: View All Size and Position Values
  kind: query
  command: "EX1(XIMG }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: view_active_pixels
  label: View Active Pixels
  kind: query
  command: "EX1(APIX }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: view_active_lines
  label: View Active Lines
  kind: query
  command: "EX1(ALIN }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: view_defaults
  label: View Defaults
  kind: query
  command: "EVX1(SPEC }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: set_aspect_fill
  label: Set Aspect Ratio to Fill
  kind: action
  command: "EX1(*1ASPR }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: set_aspect_follow
  label: Set Aspect Ratio to Follow Input
  kind: action
  command: "EX1(*2ASPR }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: view_aspect_ratio
  label: View Aspect Ratio
  kind: query
  command: "EX1(ASPR }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: execute_auto_image
  label: Execute Auto-Image
  kind: action
  command: "X1(*A"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: set_overscan
  label: Set Overscan Value
  kind: action
  command: "E6*X3#OSCN }"
  params:
    - name: value
      type: integer
      description: Overscan value (SMPTE input rates only)
- id: read_overscan
  label: Read Overscan Value
  kind: query
  command: "E6OSCN }"

# Save and Recall Scaler Presets
- id: save_scaler_preset
  label: Save a Scaler Preset
  kind: action
  command: "2*X1(*X2#,"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
    - name: preset
      type: integer
      description: Scaler preset 001-128
- id: recall_scaler_preset
  label: Recall a Scaler Preset
  kind: action
  command: "2*X1(*X2#."
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
    - name: preset
      type: integer
      description: Scaler preset 001-128
- id: erase_scaler_preset
  label: Erase a Scaler Preset
  kind: action
  command: "EX2*X2#PRST }"
  params:
    - name: preset
      type: integer
      description: Scaler preset 001-128
- id: show_scaler_preset_availabilities
  label: Show Scaler Preset Availabilities
  kind: query
  command: "51#"

# Auto Memories
- id: enable_auto_memories
  label: Enable Auto Memories
  kind: action
  command: "EX1(*1AMEM }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: disable_auto_memories
  label: Disable Auto Memories
  kind: action
  command: "EX1(*0AMEM }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: show_auto_memory_status
  label: Show Auto Memory Status
  kind: query
  command: "EX1(AMEM }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04

# Test Pattern
- id: enable_test_pattern
  label: Enable Test Pattern
  kind: action
  command: "EX1(*X3$TEST }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
    - name: pattern
      type: integer
      description: Test pattern code (00=disable, 01=crop, 02=alt pixels, 03=crosshatch, 04=color bars, 05=grayscale, 06=blue)
- id: disable_test_pattern
  label: Disable Test Pattern
  kind: action
  command: "EX1(*0TEST }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: view_test_pattern
  label: View Test Pattern Selection
  kind: query
  command: "EX1(TEST }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04

# Screen Saver
- id: set_screen_saver_immediate
  label: Set Screen Saver to Go Black Immediately
  kind: action
  command: "ETX1(*0SSAV }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: set_screen_saver_timeout
  label: Set Screen Saver Timeout Duration
  kind: action
  command: "ETX1(*X3%SSAV }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
    - name: timeout_seconds
      type: integer
      description: Duration in seconds (001-500, 501=never)
- id: set_screen_saver_never
  label: Set Screen Saver to Never Go Black
  kind: action
  command: "ETX1(*501SSAV }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: view_screen_saver_timeout
  label: View Screen Saver Timeout
  kind: query
  command: "ETX1(SSAV }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
- id: view_screen_saver_status
  label: View Screen Saver Status
  kind: query
  command: "ESX1(SSAV }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04

# Scaler Output Rate
- id: set_scaler_output_rate
  label: Set Scaler Output Rate
  kind: action
  command: "EX1(*X3&RATE }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04
    - name: rate_code
      type: integer
      description: Output rate code (see source table for resolution/rate mapping)
- id: view_scaler_output_rate
  label: View Scaler Output Rate
  kind: query
  command: "EX1(RATE }"
  params:
    - name: output
      type: integer
      description: TP/insertion output 03 or 04

# RS-232 Insertion
- id: enable_input_captive_screw_insertion
  label: Enable Input Captive Screw RS-232 Insertion
  kind: action
  command: "EIX1&*0LRPT }"
  params:
    - name: input
      type: integer
      description: Input number (7 or 8 per source example)
- id: enable_input_ethernet_insertion
  label: Enable Input Ethernet RS-232 Insertion
  kind: action
  command: "EIX1&*1LRPT }"
  params:
    - name: input
      type: integer
      description: Input number (7 or 8 per source example)
- id: set_all_rs232_input_insertions
  label: Set All RS-232 Input Insertions
  kind: action
  command: "EIX3**LRPT }"
  params:
    - name: value
      type: integer
      description: 0=captive screw, 1=Ethernet UART
- id: view_input_insertion
  label: View Input Insertion
  kind: query
  command: "EIX1&LRPT }"
  params:
    - name: input
      type: integer
      description: Input number
- id: view_all_input_insertions
  label: View All Input Insertions
  kind: query
  command: "EILRPT }"
- id: enable_output_captive_screw_insertion
  label: Enable Output Captive Screw RS-232 Insertion
  kind: action
  command: "EOX1(*0LRPT }"
  params:
    - name: output
      type: integer
      description: Output number (3 or 4 per source example)
- id: enable_output_ethernet_insertion
  label: Enable Output Ethernet RS-232 Insertion
  kind: action
  command: "EOX1(*1LRPT }"
  params:
    - name: output
      type: integer
      description: Output number (3 or 4 per source example)
- id: set_all_rs232_output_insertions
  label: Set All RS-232 Output Insertions
  kind: action
  command: "EOX3**LRPT }"
  params:
    - name: value
      type: integer
      description: 0=captive screw, 1=Ethernet UART
- id: view_output_insertion
  label: View RS-232 Output Insertion
  kind: query
  command: "EOX1(LRPT }"
  params:
    - name: output
      type: integer
      description: Output number
- id: view_all_output_insertions
  label: View All Output Insertions
  kind: query
  command: "EOLRPT }"
- id: set_serial_port_parameters
  label: Set Serial Port Parameters (Insertion)
  kind: action
  command: "EX3(*X4),X4!,X4@,X4#CP }"
  params:
    - name: port
      type: integer
      description: Port identifier
    - name: baud
      type: integer
      description: Baud rate (9600, 19200, 38400, 115200)
    - name: parity
      type: string
      description: Parity (o/e/n/m/s, first letter)
    - name: data_bits
      type: integer
      description: Data bits (7 or 8)
    - name: stop_bits
      type: integer
      description: Stop bits (1 or 2)
- id: read_serial_port_parameters
  label: Read Serial Port Parameters (Insertion)
  kind: query
  command: "EX3(CP }"
  params:
    - name: port
      type: integer
      description: Port identifier
- id: configure_current_port_timeout
  label: Configure Current Port Timeout (Insertion)
  kind: action
  command: "E0*X4$TC }"
  params:
    - name: timeout
      type: integer
      description: Timeout value
- id: read_current_port_timeout
  label: Read Current Port Timeout (Insertion)
  kind: query
  command: "E0TC }"
- id: configure_global_ip_port_timeout
  label: Configure Global IP Port Timeout (Insertion)
  kind: action
  command: "E1*X4$TC }"
  params:
    - name: timeout
      type: integer
      description: Timeout value
- id: read_global_ip_port_timeout
  label: Read Global IP Port Timeout (Insertion)
  kind: query
  command: "E1TC }"
- id: set_uart_start_port
  label: Set UART Start Point
  kind: action
  command: "EX4%MD }"
  params:
    - name: start_port
      type: integer
      description: Initial (lowest) port number for range

# Port Specific SIS Commands
- id: set_administrator_password
  label: Set Administrator Password
  kind: action
  command: "EX5)CA }"
  params:
    - name: password
      type: string
      description: Up to 12 alphanumeric characters
- id: read_administrator_password
  label: Read Administrator Password
  kind: query
  command: "ECA }"
- id: reset_administrator_password
  label: Reset (Clear) Administrator Password
  kind: action
  command: "E•CA }"
- id: set_user_password
  label: Set User Password
  kind: action
  command: "EX5)CU }"
  params:
    - name: password
      type: string
      description: Up to 12 alphanumeric characters
- id: read_user_password
  label: Read User Password
  kind: query
  command: "ECU }"
- id: reset_user_password
  label: Reset (Clear) User Password
  kind: action
  command: "E•CU }"
- id: set_host_serial_port_parameters
  label: Set Host Serial Port Parameters
  kind: action
  command: "EX5!*X5@,X5#,X5$,X5%CP }"
  params:
    - name: port
      type: integer
      description: Port number (01 = Remote RS-232)
    - name: baud
      type: integer
      description: Baud rate (9600 default, 19200, 38400, 115200)
    - name: parity
      type: string
      description: Parity (o/e/n/m/s, first letter; none = default)
    - name: data_bits
      type: integer
      description: Data bits (7 or 8, 8=default)
    - name: stop_bits
      type: integer
      description: Stop bits (1 or 2, 1=default)
- id: read_host_serial_port_parameters
  label: Read Host Serial Port Parameters
  kind: query
  command: "EX5!CP }"
  params:
    - name: port
      type: integer
      description: Port number (01 = Remote RS-232)
- id: configure_flow_control
  label: Configure Flow Control
  kind: action
  command: "EX5!*Y8^,Y8&CF }"
  params:
    - name: port
      type: integer
      description: Port number
    - name: flow_control
      type: string
      description: H=Hardware RTS/CTS, N=None, S=Software XON/XOFF
    - name: dtr
      type: string
      description: H=Hardware, N=None
- id: read_flow_control
  label: Read Flow Control
  kind: query
  command: "EX5!CF }"
  params:
    - name: port
      type: integer
      description: Port number
- id: configure_receive_timeout
  label: Configure Receive Timeout
  kind: action
  command: "EX5!*Y8*,Y8(CE }"
  params:
    - name: port
      type: integer
      description: Port number
    - name: seconds
      type: integer
      description: Receive timeout seconds
    - name: milliseconds
      type: integer
      description: Receive timeout milliseconds
- id: read_receive_timeout
  label: Read Receive Timeout
  kind: query
  command: "EX5!CE }"
  params:
    - name: port
      type: integer
      description: Port number
- id: set_mode
  label: Set Mode
  kind: action
  command: "EX5!*X5^CY }"
  params:
    - name: port
      type: integer
      description: Port number
    - name: mode
      type: string
      description: Mode value
- id: read_mode
  label: Read Mode
  kind: query
  command: "EX5!CY }"
  params:
    - name: port
      type: integer
      description: Port number
- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  command: "EX5&CV }"
  params:
    - name: level
      type: integer
      description: 0=none, 1=verbose 1, 2=verbose 2, 3=verbose 3
- id: read_verbose_mode
  label: Read Verbose Mode
  kind: query
  command: "ECV }"

# DSP - Analog Trim/Gain/Mix
- id: set_analog_dsp_value
  label: Set Analog DSP Trim, Gain, or Mix-point
  kind: action
  command: "EGX6)*X6!AU }"
  params:
    - name: object_id
      type: integer
      description: DSP object ID (see source tables for valid IDs)
    - name: level
      type: integer
      description: Level in 0.1 dB increments (e.g. 56 = 5.6 dB)
- id: read_analog_dsp_value
  label: Read Analog DSP Trim or Mix-point
  kind: query
  command: "EGX6)AU }"
  params:
    - name: object_id
      type: integer
      description: DSP object ID

# DSP - Digital Trim/Gain/Mix
- id: set_digital_dsp_value
  label: Set Digital DSP Trim, Gain, or Mix-point
  kind: action
  command: "EHX6)*X6!AU }"
  params:
    - name: object_id
      type: integer
      description: DSP object ID
    - name: level
      type: integer
      description: Level in 0.1 dB increments
- id: read_digital_dsp_value
  label: Read Digital DSP Trim or Mix-point
  kind: query
  command: "EHX6)AU }"
  params:
    - name: object_id
      type: integer
      description: DSP object ID

# DSP - Audio Mute
- id: audio_mute
  label: Audio Mute
  kind: action
  command: "EMX6)*1AU }"
  params:
    - name: object_id
      type: integer
      description: DSP object ID
- id: audio_unmute
  label: Audio Unmute
  kind: action
  command: "EMX6)*0AU }"
  params:
    - name: object_id
      type: integer
      description: DSP object ID
- id: read_audio_mute
  label: Read Audio Mute
  kind: query
  command: "EMX6)AU }"
  params:
    - name: object_id
      type: integer
      description: DSP object ID

# DSP - Phantom Power
- id: phantom_power_on
  label: Phantom Power On
  kind: action
  command: "EZX6)*1AU }"
  params:
    - name: object_id
      type: integer
      description: Mic input gain object ID (40000-40003)
- id: phantom_power_off
  label: Phantom Power Off
  kind: action
  command: "EZX6)*0AU }"
  params:
    - name: object_id
      type: integer
      description: Mic input gain object ID (40000-40003)
- id: read_phantom_power_status
  label: Read Phantom Power Status
  kind: query
  command: "EZX6)AU }"
  params:
    - name: object_id
      type: integer
      description: Mic input gain object ID (40000-40003)

# DSP - Group Masters
- id: set_group_fader
  label: Set Group Fader Control
  kind: action
  command: "EDX6#*X6$GRPM }"
  params:
    - name: group
      type: integer
      description: Group master number 01-32
    - name: level
      type: integer
      description: Group fader level in 0.1 dB increments
- id: raise_group_fader
  label: Raise Group Fader
  kind: action
  command: "EDX6#*X6%+GRPM }"
  params:
    - name: group
      type: integer
      description: Group master number 01-32
    - name: increment
      type: integer
      description: Increment in 0.1 dB
- id: lower_group_fader
  label: Lower Group Fader
  kind: action
  command: "EDX6#*X6%-GRPM }"
  params:
    - name: group
      type: integer
      description: Group master number 01-32
    - name: decrement
      type: integer
      description: Decrement in 0.1 dB
- id: view_group_fader
  label: View Group Fader
  kind: query
  command: "EDX6#GRPM }"
  params:
    - name: group
      type: integer
      description: Group master number 01-32
- id: view_group_mute
  label: View Group Mute
  kind: query
  command: "EDX6#GRPM }"
  params:
    - name: group
      type: integer
      description: Group master number 01-32
- id: set_group_soft_limits
  label: Set Group Soft Limits
  kind: action
  command: "ELX6#*X6^[upper]*X6^[lower]GRPM }"
  params:
    - name: group
      type: integer
      description: Group master number 01-32
    - name: upper
      type: integer
      description: Upper soft limit in 0.1 dB
    - name: lower
      type: integer
      description: Lower soft limit in 0.1 dB
- id: view_group_soft_limits
  label: View Group Soft Limits
  kind: query
  command: "ELX6#GRPM }"
  params:
    - name: group
      type: integer
      description: Group master number 01-32
- id: view_group_type
  label: View Group Type
  kind: query
  command: "EPX6#GRPM }"
  params:
    - name: group
      type: integer
      description: Group master number 01-32
- id: view_group_members
  label: View Group Members
  kind: query
  command: "EOX6#GRPM }"
  params:
    - name: group
      type: integer
      description: Group master number 01-32
```

## Feedbacks
```yaml
- id: video_output_tie
  type: integer
  description: Input number tied to a video output (response to X@%)
- id: audio_output_tie
  type: integer
  description: Input number tied to an audio output (response to X@$)
- id: video_mute_state
  type: integer
  description: Video mute status of an output 0-2 (response to X@B, see Vmt format)
- id: global_video_mute_state
  type: integer
  description: Global video mute state (Vmt0/Vmt1/Vmt2)
- id: hdcp_input_authorized_status
  type: integer
  description: HDCP authorization status 0=off, 1=on
- id: hdcp_output_status
  type: integer
  description: Output HDCP status 0=no monitor, 1=HDCP-compliant, 2=non-compliant
- id: hdcp_input_status
  type: integer
  description: Input HDCP status 0=no source, 1=HDCP source, 2=non-HDCP source
- id: firmware_version
  type: string
  description: Firmware version x.xx (response to Q)
- id: firmware_version_verbose
  type: string
  description: Verbose firmware version with date and load info (response to 0Q)
- id: system_status
  type: string
  description: System status: voltage, temperature C, fan1 RPM, fan2 RPM (response to S)
- id: part_number
  type: string
  description: Part number 60-nnnn-nn (response to N)
- id: executive_mode
  type: integer
  description: Front panel lock status 0/1/2
- id: scaler_output_rate_code
  type: integer
  description: Output rate code (response to EX1(RATE })
- id: audio_mute_state
  type: integer
  description: Audio mute 0=off, 1=on
- id: phantom_power_state
  type: integer
  description: Phantom power 0=off, 1=on
- id: group_fader_value
  type: integer
  description: Group fader level in 0.1 dB
- id: group_type
  type: integer
  description: Group type 6=gain, 12=mute
- id: error_e01
  type: string
  description: Invalid input channel number (out of range)
- id: error_e10
  type: string
  description: Invalid command
- id: error_e11
  type: string
  description: Invalid preset number (out of range)
- id: error_e12
  type: string
  description: Invalid output number (out of range)
- id: error_e13
  type: string
  description: Invalid value (out of range)
- id: error_e14
  type: string
  description: Invalid command for this configuration
- id: error_e22
  type: string
  description: Busy
- id: error_e24
  type: string
  description: Privileges violation
- id: error_e25
  type: string
  description: Device not present
- id: error_e26
  type: string
  description: Maximum number of connections exceeded
- id: error_e28
  type: string
  description: Bad filename or file not found
```

## Variables
```yaml
# Scaler picture adjustments - discrete action variants above; numeric ranges implicit in commands
- id: brightness
  type: integer
  description: Per-output brightness adjustment (TP outputs 03/04)
- id: contrast
  type: integer
  description: Per-output contrast adjustment (TP outputs 03/04)
- id: detail
  type: integer
  description: Per-output detail adjustment (TP outputs 03/04)
- id: hposition
  type: integer
  description: Per-output horizontal position in pixels (TP outputs 03/04)
- id: vposition
  type: integer
  description: Per-output vertical position in lines (TP outputs 03/04)
- id: hsize
  type: integer
  description: Per-output horizontal size in pixels (TP outputs 03/04)
- id: vsize
  type: integer
  description: Per-output vertical size in pixels (TP outputs 03/04)
- id: dsp_level
  type: integer
  description: DSP level value in 0.1 dB increments (range depends on object ID class; see DSP Command Format section)
- id: screen_saver_timeout
  type: integer
  description: Per-output screen saver timeout in seconds (001-500, 501=never)
- id: screen_saver_status
  type: integer
  description: 0=active input, 1=timer running, 2=timer expired
- id: aspect_ratio
  type: integer
  description: 1=fill, 2=follow
- id: overscan
  type: integer
  description: Overscan value (SMPTE input rates only)
- id: test_pattern
  type: integer
  description: 00=disable, 01=crop, 02=alt pixels, 03=crosshatch, 04=color bars, 05=grayscale, 06=blue
- id: input_audio_source
  type: integer
  description: Per-input audio source (0=auto/digital priority, 1-8=analog from input N)
- id: output_audio_source
  type: integer
  description: Per-output HDMI audio embed source (0-8)
- id: group_fader_soft_limit_upper
  type: integer
  description: Per-group upper soft limit in 0.1 dB
- id: group_fader_soft_limit_lower
  type: integer
  description: Per-group lower soft limit in 0.1 dB
```

## Events
```yaml
- id: copyright_banner
  description: Switcher startup banner "(c) Copyright 20_yy_, Extron Electronics DTPCP84, Vx.xx, 60-nnnn-nn" followed by CR/LF, day/date/time, then CR/LF
- id: password_prompt
  description: "Password:" prompt followed by CR/LF (issued on TCP connect when password is configured)
- id: login_administrator
  description: "[Login][Administrator]" followed by CR/LF
- id: login_user
  description: "[Login][User]" followed by CR/LF
- id: qik
  description: "Qik" - front panel tie creation occurred
- id: rpr
  description: "RprNN" - memory preset N recalled
- id: amt
  description: "AmtNN*X" - output N audio mute toggled, X=0 off / 1 on
- id: grpmd
  description: "GrpmD N*Y" - front panel Volume knob adjusted (N=1 mic/2 vol, Y=variable)
- id: exe
  description: "ExeN" - front panel security lockout toggled, N=0/1/2
```

## Macros
```yaml
# Source describes a "Quick multiple tie" composite form (E+Q X!*X@! ... } ) allowing chained tie commands in one
# line. Treat as a documented multi-step sequence.
- id: quick_multiple_tie_sequence
  description: Compose multiple tie commands in a single line using the E+Q prefix and CR-separated tie commands
  steps:
    - command: "E+Q3*4!3*3%3*2$ }"
      description: Tie input 3 video+audio to output 4, input 3 video only to output 3, input 2 audio only to output 3
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document explicit safety warnings, power-on sequencing, or destructive
# command interlocks. Resets (E ZXXX }, E ZQQQ }, E ZY }) are destructive but are not flagged as requiring
# confirmation in the source.
```

## Notes
- SIS commands use `}` (carriage return, hex 0D) as the line terminator for write commands and `]` (CR/LF, hex 0D 0A) terminates responses.
- For URL-encoded commands, use `|` in place of `}` (carriage return). For web/browser SIS, use `W` in place of `E` (escape, hex 1B).
- The pipe character `|` and other special characters are rejected inside names, passwords, and file names: `+ ~ , @ = ' [ ] { } < > ' " ; : \ ?` (space allowed in names only).
- Default IP address: 192.168.254.254, subnet 255.255.0.0, gateway 0.0.0.0. IPCP Pro 350 variant uses 192.168.254.250 / 255.255.255.0.
- Default TCP connection timeout: 5 minutes. Maximum 200 simultaneous TCP connections.
- Configurable host RS-232 baud rates: 9600 (default), 19200, 38400, 115200. Data bits 7 or 8 (default 8). Parity odd/even/none/mark/space (default none). Stop bits 1 or 2 (default 1). Flow control hardware (RTS/CTS), none, or software (XON/XOFF).
- Ethernet: 10Base-T / 100Base-T, half- and full-duplex.
- Passwords (admin and user) are optional; if set, login prompt is sent on TCP connect. Up to 12 alphanumeric characters.
- Verbose mode levels 0/1/2/3 control response verbosity globally; many commands have alternate verbose response forms listed in the source.
- Scaler adjustment commands (BRIT, CONT, HDET, HCTR, VCTR, HSIZ, VSIZ, ASPR, OSCN, TEST, SSAV, RATE, AMEM, XIMG) apply only to TP/scaled outputs (X1( = 03 or 04) and insertion outputs; the two mirror HDMI outputs (1, 2) do not have scaler adjustments per the source variable X1( definition.
- DSP object IDs are organized into named blocks (A line inputs, B mic inputs, D virtual returns, E expansion inputs, F post-matrix gains, G/H/I/J/M/N mixer blocks, K line output gains). See source for the full ID range table.
- Mic input object IDs 40000-40003 support phantom power via the `E Z ... AU }` command family.
- DSP level values use 0.1 dB increments; valid range depends on object class (e.g. line input gain -180..+240, mic gain -180..+800, line trim -120..+120, line output gain -1000..0).
- System status (`S`) reports voltage, internal temperature (C), and two fan RPMs.
- HDCP status: input response codes 0=no source, 1=HDCP-compliant, 2=non-compliant; output codes 0=no monitor, 1=HDCP-compliant, 2=non-compliant.
- `E ZXXX }` (system reset) clears all ties and presets. `E ZQQQ }` also clears IP to defaults. `E ZY }` resets everything except IP/unit name/DHCP/port mapping (recommended after firmware update).
- Front panel `1X`/`2X` lock modes do not disable RS-232/TCP SIS control per the source description; they only restrict front panel access.

<!-- UNRESOLVED: web browser SIS-over-HTTP is mentioned for file directory responses but not detailed as a control surface; no full HTTP path/method catalogue given. -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/68-2349-01_D.pdf
  - https://www.extron.com
retrieved_at: 2026-05-18T07:44:52.721Z
last_checked_at: 2026-06-02T00:54:04.624Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T00:54:04.624Z
matched_actions: 179
action_count: 179
confidence: medium
summary: "All 179 spec actions matched literally to source commands with correct wire tokens and parameter shapes; transport parameters (port 23, 9600 baud, 8 data bits, no parity, 1 stop bit, no flow control) verified in source; source command inventory fully represented by spec. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "USB Configuration port protocol is for firmware/upload only and is not covered. Web browser SIS-over-HTTP is mentioned for file directory queries but not detailed as a control surface."
- "source does not document explicit safety warnings, power-on sequencing, or destructive"
- "web browser SIS-over-HTTP is mentioned for file directory responses but not detailed as a control surface; no full HTTP path/method catalogue given."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
