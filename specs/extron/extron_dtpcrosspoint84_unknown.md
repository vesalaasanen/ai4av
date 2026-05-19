---
spec_id: admin/extron-dtp-crosspoint-84
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
  - extron.com
  - media.extron.com
source_urls:
  - https://www.extron.com/download/files/userman/Matrix3200_6400_Wideband_A.pdf
  - https://media.extron.com/public/download/files/userman/XP_Plus_MAV_D.pdf
  - https://media.extron.com/public/download/files/userman/matrix100all-man.pdf
retrieved_at: 2026-05-01T02:11:30.714Z
last_checked_at: 2026-05-18T16:33:18.637Z
generated_at: 2026-05-18T16:33:18.637Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-18T16:33:18.637Z
  matched_actions: 71
  action_count: 71
  confidence: high
  summary: "All 71 spec actions matched to corresponding semantic functions in source with correct transport parameters; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-18
---

# Extron DTP CrossPoint 84 Control Spec

## Summary
8x4 matrix switcher with RS-232, USB, and Ethernet control interfaces. Supports video/audio breakaway routing, EDID management, HDCP control, per-output scaling, DSP audio processing with mixing and phantom power, test patterns, and screen saver. SIS (Simple Instruction Set) command protocol over TCP (port 23) or serial RS-232.

<!-- UNRESOLVED: USB control protocol not documented in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # explicit: "Open TCP socket to port 23"
serial:
  baud_rate: 9600  # explicit default
  data_bits: 8      # explicit default
  parity: none      # explicit default
  stop_bits: 1      # explicit default
  flow_control: none  # explicit default
auth:
  type: null  # UNRESOLVED: source shows password-protected login but does not state default password or whether it is pre-configured
```

## Traits
```yaml
- routable   # matrix routing with video/audio breakaway
- queryable  # extensive query commands for ties, EDID, HDCP, audio format, sync status
- levelable  # scaler brightness/contrast/detail, DSP gain/mix, volume
```

## Actions
```yaml
# Matrix Ties
- id: tie_video_audio
  label: Tie Input Video and Audio to Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number 01-08
    - name: output
      type: integer
      description: Output number 01-04

- id: tie_video_only
  label: Tie Input Video Only to Output
  kind: action
  params:
    - name: input
      type: integer
    - name: output
      type: integer

- id: tie_audio_only
  label: Tie Input Audio Only to Output
  kind: action
  params:
    - name: input
      type: integer
    - name: output
      type: integer

- id: untie
  label: Untie Input Video and Audio from Output
  kind: action
  params:
    - name: output
      type: integer

- id: tie_input_to_all_video_audio
  label: Tie Input to All Outputs (Video and Audio)
  kind: action
  params:
    - name: input
      type: integer

- id: tie_input_to_all_video_only
  label: Tie Input to All Outputs (Video Only)
  kind: action
  params:
    - name: input
      type: integer

- id: tie_input_to_all_audio_only
  label: Tie Input to All Outputs (Audio Only)
  kind: action
  params:
    - name: input
      type: integer

- id: clear_all_ties
  label: Clear All Ties
  kind: action

# EDID
- id: write_edid
  label: Write EDID
  kind: action
  params:
    - name: edid
      type: integer
      description: EDID number (01-34 for DVI/HDMI PC, 61-74 for HDMI HDTV, 75-82 for User EDID)
    - name: input
      type: integer
      description: Input number 01-08

- id: copy_edid
  label: Copy EDID
  kind: action
  params:
    - name: source_input
      type: integer
    - name: dest_input
      type: integer

# Video Mute
- id: mute_video
  label: Mute Output Video (Video Off, Sync On)
  kind: action
  params:
    - name: output
      type: integer

- id: mute_video_and_sync
  label: Mute Output Video and Sync
  kind: action
  params:
    - name: output
      type: integer

- id: unmute_video
  label: Unmute Output Video
  kind: action
  params:
    - name: output
      type: integer

- id: global_mute_video
  label: Mute All Video Outputs
  kind: action

- id: global_mute_video_and_sync
  label: Mute All Video and Sync Outputs
  kind: action

- id: global_unmute_video
  label: Unmute All Video Outputs
  kind: action

# Audio
- id: set_input_audio_source
  label: Set Input Audio Source
  kind: action
  params:
    - name: input
      type: integer
    - name: source
      type: integer
      description: Audio source number (0 = Auto - digital priority)

- id: set_output_hdmi_audio
  label: Set Output HDMI Audio Breakaway Source
  kind: action
  params:
    - name: output
      type: integer
    - name: source
      type: integer

# HDCP
- id: set_input_hdcp_authorized
  label: Set Input HDCP Authorized
  kind: action
  params:
    - name: input
      type: integer
    - name: authorized
      type: integer
      description: "1 = authorized, 0 = not authorized"

- id: set_output_hdcp_mode
  label: Set Output HDCP Mode
  kind: action
  params:
    - name: output
      type: integer
    - name: mode
      type: integer
      description: "0 = auto, 1 = on (always encrypted), 2 = follow (DVI), 3 = on (DVI)"

# Output Format / Bit Depth
- id: set_output_format
  label: Set Output Format
  kind: action
  params:
    - name: output
      type: integer
    - name: format_code
      type: integer
      description: Scaler output rate code (see RATE command reference table)

- id: set_output_bit_depth
  label: Set Output Video Bit Depth
  kind: action
  params:
    - name: output
      type: integer
    - name: bit_depth
      type: integer

# Names
- id: write_input_name
  label: Write Input Name
  kind: action
  params:
    - name: input
      type: integer
    - name: name
      type: string

- id: write_output_name
  label: Write Output Name
  kind: action
  params:
    - name: output
      type: integer
    - name: name
      type: string

# Presets
- id: recall_preset
  label: Recall Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (00-99)

# Resets
- id: system_reset
  label: System Reset (Factory Default)
  kind: action

- id: absolute_reset_with_ip
  label: Absolute Reset Including IP Settings
  kind: action

- id: absolute_reset_without_ip
  label: Absolute Reset Excluding IP Settings
  kind: action

# Executive / Lock
- id: lock_front_panel
  label: Lock All Front Panel Functions
  kind: action

- id: lock_advanced_front_panel
  label: Lock Advanced Front Panel Functions
  kind: action

- id: unlock_front_panel
  label: Unlock All Front Panel Functions
  kind: action

# Scaler Controls
- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: output
      type: integer
      description: TP output number 03 or 04
    - name: value
      type: integer

- id: increment_brightness
  label: Increment Brightness
  kind: action
  params:
    - name: output
      type: integer

- id: decrement_brightness
  label: Decrement Brightness
  kind: action
  params:
    - name: output
      type: integer

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: output
      type: integer
    - name: value
      type: integer

- id: increment_contrast
  label: Increment Contrast
  kind: action
  params:
    - name: output
      type: integer

- id: decrement_contrast
  label: Decrement Contrast
  kind: action
  params:
    - name: output
      type: integer

- id: set_detail
  label: Set Detail
  kind: action
  params:
    - name: output
      type: integer
    - name: value
      type: integer

- id: increment_detail
  label: Increment Detail
  kind: action
  params:
    - name: output
      type: integer

- id: decrement_detail
  label: Decrement Detail
  kind: action
  params:
    - name: output
      type: integer

- id: set_horizontal_shift
  label: Set Horizontal Shift
  kind: action
  params:
    - name: output
      type: integer
    - name: value
      type: integer

- id: set_vertical_shift
  label: Set Vertical Shift
  kind: action
  params:
    - name: output
      type: integer
    - name: value
      type: integer

- id: set_horizontal_size
  label: Set Horizontal Size
  kind: action
  params:
    - name: output
      type: integer
    - name: value
      type: integer

- id: set_vertical_size
  label: Set Vertical Size
  kind: action
  params:
    - name: output
      type: integer
    - name: value
      type: integer

- id: set_all_size_position
  label: Set All Size and Position Values
  kind: action
  params:
    - name: output
      type: integer
    - name: hctr
      type: integer
    - name: vctr
      type: integer
    - name: hsiz
      type: integer
    - name: vsiz
      type: integer

- id: execute_auto_image
  label: Execute Auto-Image
  kind: action
  params:
    - name: output
      type: integer

- id: set_overscan
  label: Set Overscan Value
  kind: action
  params:
    - name: value
      type: integer

- id: set_aspect_ratio_fill
  label: Set Aspect Ratio to Fill
  kind: action
  params:
    - name: output
      type: integer

- id: set_aspect_ratio_follow
  label: Set Aspect Ratio to Follow Input
  kind: action
  params:
    - name: output
      type: integer

# Scaler Presets
- id: save_scaler_preset
  label: Save Scaler Preset
  kind: action
  params:
    - name: output
      type: integer
    - name: preset
      type: integer
      description: Preset number 001-128

- id: recall_scaler_preset
  label: Recall Scaler Preset
  kind: action
  params:
    - name: output
      type: integer
    - name: preset
      type: integer

- id: erase_scaler_preset
  label: Erase Scaler Preset
  kind: action
  params:
    - name: preset
      type: integer

# Auto Memories
- id: enable_auto_memories
  label: Enable Auto Memories
  kind: action
  params:
    - name: output
      type: integer

- id: disable_auto_memories
  label: Disable Auto Memories
  kind: action
  params:
    - name: output
      type: integer

# Test Pattern
- id: enable_test_pattern
  label: Enable Test Pattern
  kind: action
  params:
    - name: output
      type: integer
    - name: pattern
      type: integer
      description: "00=Disable, 01=Crop, 02=Alternating pixels, 03=Crosshatch, 04=Color bars, 05=Grayscale, 06=Blue mode"

- id: disable_test_patterns
  label: Disable Test Patterns
  kind: action
  params:
    - name: output
      type: integer

# Screen Saver
- id: screen_saver_immediate
  label: Set Screen Saver to Black Immediately
  kind: action
  params:
    - name: output
      type: integer

- id: set_screen_saver_timeout
  label: Set Screen Saver Timeout Duration
  kind: action
  params:
    - name: output
      type: integer
    - name: seconds
      type: integer
      description: "001-500 seconds, 501 = never timeout"

- id: screen_saver_never
  label: Set Screen Saver to Never Go Black
  kind: action
  params:
    - name: output
      type: integer

# Scaler Output Rate
- id: set_scaler_output_rate
  label: Set Scaler Output Rate
  kind: action
  params:
    - name: output
      type: integer
    - name: rate_code
      type: integer
      description: See rate code table (11-92)

# RS-232 Insertion
- id: set_input_rs232_insertion
  label: Set Input RS-232 Insertion Mode
  kind: action
  params:
    - name: input
      type: integer
    - name: mode
      type: integer
      description: "0 = captive screw, 1 = Ethernet (UART)"

- id: set_output_rs232_insertion
  label: Set Output RS-232 Insertion Mode
  kind: action
  params:
    - name: output
      type: integer
    - name: mode
      type: integer
      description: "0 = captive screw, 1 = Ethernet (UART)"

# DSP Audio
- id: set_analog_dsp_level
  label: Set Analog DSP Trim/Gain/Mix-Point
  kind: action
  params:
    - name: object_id
      type: integer
      description: DSP object ID (see DSP object tables)
    - name: level
      type: integer
      description: Level in 0.1 dB increments (e.g., 56 = 5.6 dB)

- id: set_digital_dsp_level
  label: Set Digital DSP Trim/Gain/Mix-Point
  kind: action
  params:
    - name: object_id
      type: integer
    - name: level
      type: integer

- id: audio_mute
  label: Audio Mute
  kind: action
  params:
    - name: object_id
      type: integer
    - name: mute
      type: integer
      description: "1 = mute on, 0 = mute off"

- id: phantom_power_on
  label: Phantom Power On
  kind: action
  params:
    - name: object_id
      type: integer
      description: Mic input gain object IDs 40000-40003 only

- id: phantom_power_off
  label: Phantom Power Off
  kind: action
  params:
    - name: object_id
      type: integer

# Group Masters
- id: set_group_fader
  label: Set Group Fader Control
  kind: action
  params:
    - name: group
      type: integer
      description: Group number 01-32
    - name: level
      type: integer
      description: Level in 0.1 dB increments

- id: raise_group_fader
  label: Raise Group Fader
  kind: action
  params:
    - name: group
      type: integer
    - name: increment
      type: integer
      description: Increment in dB

- id: lower_group_fader
  label: Lower Group Fader
  kind: action
  params:
    - name: group
      type: integer
    - name: decrement
      type: integer

- id: set_soft_limits
  label: Set Group Soft Limits
  kind: action
  params:
    - name: group
      type: integer
    - name: upper
      type: integer
      description: Upper limit in 0.1 dB
    - name: lower
      type: integer
      description: Lower limit in 0.1 dB
```

## Feedbacks
```yaml
- id: video_tie_response
  type: string
  description: "Video input tied to output, e.g. Out03•In01•Vid]"

- id: audio_tie_response
  type: string
  description: "Audio input tied to output, e.g. Out04•In08•Aud]"

- id: all_tie_response
  type: string
  description: "Video and audio tie, e.g. Out03•In01•All]"

- id: edid_write_response
  type: string
  description: "EdidE X# * X!]"

- id: edid_read_response
  type: string
  description: "EDID number assigned to input"

- id: video_mute_response
  type: string
  description: "Vmt X@ * X] where X=0 unmute, 1 video mute, 2 video+sync mute"

- id: audio_mute_response
  type: string
  description: "DsM X6) * X6@]"

- id: read_audio_mute_status
  type: enum
  values: [0, 1]
  description: "0 = mute off, 1 = mute on"

- id: edid_copy_response
  type: string

- id: hdcp_set_response
  type: string

- id: hdcp_status_response
  type: string
  description: "X1! for inputs (0=no source, 1=HDCP-compliant, 2=non-compliant); X1@ for outputs (0=no monitor, 1=HDCP-compliant, 2=non-compliant)"

- id: output_format_response
  type: integer
  description: "Scaler output rate code"

- id: output_bit_depth_response
  type: integer

- id: input_name_response
  type: string

- id: output_name_response
  type: string

- id: preset_recall_response
  type: string
  description: "Rprnn]"

- id: input_tie_response
  type: integer
  description: "Input number currently tied to output"

- id: system_status_response
  type: string
  description: "Sts00*voltage•temp°C•fan1RPM•fan2RPM, e.g. 12.250•35.000•1976•2004"

- id: firmware_version_response
  type: string
  description: "X2$ firmware version to second decimal place"

- id: verbose_firmware_response
  type: string
  description: "Firmware version with build date details"

- id: brightness_response
  type: integer

- id: contrast_response
  type: integer

- id: detail_response
  type: integer

- id: horizontal_shift_response
  type: integer

- id: vertical_shift_response
  type: integer

- id: horizontal_size_response
  type: integer

- id: vertical_size_response
  type: integer

- id: aspect_ratio_response
  type: integer
  description: "1 = fill, 2 = follow input"

- id: overscan_response
  type: integer

- id: screen_saver_timeout_response
  type: integer
  description: "Seconds 001-500, 0 = instant, 501 = never"

- id: screen_saver_status_response
  type: integer
  description: "0 = active input, 1 = timer running, 2 = timer expired"

- id: scaler_output_rate_response
  type: integer

- id: test_pattern_response
  type: integer
  description: "00=Disable, 01=Crop, 02=Alternating pixels, 03=Crosshatch, 04=Color bars, 05=Grayscale, 06=Blue mode"

- id: auto_memory_status_response
  type: integer

- id: rs232_insertion_response
  type: integer
  description: "0 = captive screw, 1 = Ethernet (UART)"

- id: dsp_analog_level_response
  type: integer
  description: "Level value in 0.1 dB increments"

- id: dsp_digital_level_response
  type: integer

- id: phantom_power_response
  type: string
  description: "X6) * X6@] where X6@=0 off, 1 on"

- id: group_fader_response
  type: integer
  description: "Group fader level in 0.1 dB"

- id: group_mute_response
  type: integer
  description: "0 = mute off, 1 = mute on"

- id: group_soft_limits_response
  type: string

- id: group_type_response
  type: integer
  description: "6 = gain, 12 = mute"

- id: group_members_response
  type: string

- id: input_connection_status
  type: string
  description: "0LS response: connection status for all 8 inputs"

- id: hdcp_authorized_status
  type: integer
  description: "For inputs: 0=no source, 1=HDCP-compliant, 2=non-compliant"

- id: hdcp_monitor_status
  type: integer
  description: "For outputs: 0=no monitor, 1=HDCP-compliant, 2=non-compliant"

- id: digital_input_audio_format
  type: string
  description: "Format detected on input X! via E 40* X! STAT }"

- id: input_audio_selection_response
  type: string

- id: output_audio_selection_response
  type: string

- id: input_sync_response
  type: string

- id: output_sync_response
  type: string

# Error Responses
- id: error_e01
  type: string
  description: "E01 - Invalid input channel number"

- id: error_e10
  type: string
  description: "E10 - Invalid command"

- id: error_e11
  type: string
  description: "E11 - Invalid preset number"

- id: error_e12
  type: string
  description: "E12 - Invalid output number"

- id: error_e13
  type: string
  description: "E13 - Invalid value"

- id: error_e14
  type: string
  description: "E14 - Invalid command for this configuration"

- id: error_e22
  type: string
  description: "E22 - Busy"

- id: error_e24
  type: string
  description: "E24 - Privileges violation"

- id: error_e25
  type: string
  description: "E25 - Device not present"

- id: error_e26
  type: string
  description: "E26 - Maximum connections exceeded"

- id: error_e28
  type: string
  description: "E28 - Bad filename or file not found"

# Switcher-Initiated Messages
- id: boot_message
  type: string
  description: "(c) Copyright 20_yy_, Extron Electronics DTPCP84, Vx.xx, 60-nnnn-nn_]_"

- id: password_prompt
  type: string
  description: "Password:]_]"

- id: login_administrator_prompt
  type: string
  description: "_[Login][Administrator]_]_]"

- id: login_user_prompt
  type: string
  description: "_[Login][User]_]_]"

- id: qik_message
  type: string
  description: "Qik]_] - Front panel tie creation occurred"

- id: preset_recalled_message
  type: string
  description: "Rpr_nn_]_] - Memory preset recalled (switcher-initiated)"

- id: audio_mute_toggle_message
  type: string
  description: "Amt_nn_*_x_]_] - Output audio mute toggled"

- id: volume_adjustment_message
  type: string
  description: "GrpmD_n_*_y_]_] - Front panel volume knob adjusted"

- id: executive_lock_message
  type: string
  description: "Exe_n_]_] - Front panel security lockout toggled"
```

## Variables
```yaml
# No standalone Variables section - settable parameters are expressed as Actions with
# get/set pairs using the same command keys.
# UNRESOLVED: Port-specific serial parameters (baud rate, parity, data bits, stop bits,
# flow control, timeout) via E X5! * ... CP } / E X5! CP } - could not determine if these
# map to a separate API surface vs. Actions.
```

## Events
```yaml
# Switcher-initiated (unsolicited):
- id: tie_created_event
  description: "Qik]_] - Triggered when front panel creates a tie"
- id: preset_recalled_event
  description: "Rpr_nn_]_] - Memory preset recalled from front panel"
- id: audio_mute_toggle_event
  description: "Amt_nn_*_x_]_] - Output audio mute toggled from front panel"
- id: volume_knob_event
  description: "GrpmD_n_*_y_]_] - Front panel volume knob adjusted"
- id: executive_lock_event
  description: "Exe_n_]_] - Front panel security lockout toggled"
```

## Macros
```yaml
# UNRESOLVED: No explicit multi-step macro sequences described in source.
# Quick multiple tie command E +Q allows chaining multiple ties in one command string.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: No safety warnings or interlock procedures stated in source
```

## Notes
**Command terminator:** CR/LF (] = hex 0D 0A). For URL-encoded commands, use | (pipe) instead of CR/LF.

**Special characters rejected in names/passwords:** {space} + ~ , @ = ' [ ] { } < > ' " ; : | \ and ?

**Key variable ranges:**
- Inputs: 01–08
- Outputs: 01–04
- Scaler outputs (TP): 03 or 04 only
- Presets: 00–99 (global), 001–128 (scaler)
- Groups: 01–32
- DSP object IDs: see DSP Object ID tables (lines 473–553 of source)
- EDID codes: 01–34 (DVI PC), 35–60 (HDMI PC), 61–74 (HDMI HDTV), 75–82 (User)

**Scaler output rate codes (X3&):** 11–92. Full table in source lines 371–391.

**Connection timeout:** Default 5 minutes. Maximum 200 simultaneous TCP connections.

**Default IP:** 192.168.254.254 / 255.255.0.0.

**USB control protocol:** Not documented in source.

<!-- UNRESOLVED: Firmware version compatibility range not stated -->
<!-- UNRESOLVED: Default administrator/user password not stated (source references password-protected login but no default) -->
<!-- UNRESOLVED: USB mini-B control protocol not documented in source -->
<!-- UNRESOLVED: Voltage, current, power specifications not provided in source -->
<!-- UNRESOLVED: Fault behavior and error recovery sequences not stated in source -->
<!-- UNRESOLVED: Connection timeout configuration range not explicitly stated -->
<!-- UNRESOLVED: Serial port timeout configuration range not explicitly stated -->

## Provenance

```yaml
source_domains:
  - extron.com
  - media.extron.com
source_urls:
  - https://www.extron.com/download/files/userman/Matrix3200_6400_Wideband_A.pdf
  - https://media.extron.com/public/download/files/userman/XP_Plus_MAV_D.pdf
  - https://media.extron.com/public/download/files/userman/matrix100all-man.pdf
retrieved_at: 2026-05-01T02:11:30.714Z
last_checked_at: 2026-05-18T16:33:18.637Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T16:33:18.637Z
matched_actions: 71
action_count: 71
confidence: high
summary: "All 71 spec actions matched to corresponding semantic functions in source with correct transport parameters; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
