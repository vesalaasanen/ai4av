---
spec_id: admin/extron-dtp-t-fb-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron DTP T FB Series Control Spec"
manufacturer: Extron
model_family: "DTP T FB Series"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "DTP T FB Series"
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
last_checked_at: 2026-05-18T16:33:17.239Z
generated_at: 2026-05-18T16:33:17.239Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-18T16:33:17.239Z
  matched_actions: 27
  action_count: 27
  confidence: high
  summary: "All 27 spec actions matched semantically in source; transport parameters fully verified in RS-232 protocol section."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# Extron DTP T FB Series Control Spec

## Summary
Extron DTP T FB Series is a switching transmitter with HDMI and VGA inputs. Control via RS-232 (9600 8N1) or USB configuration port using SIS command set. Supports input selection, auto-switching modes, audio routing, EDID management, video/audio muting, and image adjustments.

<!-- UNRESOLVED: USB control protocol details not documented in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable    # inferred: input selection and auto-switch modes present
- queryable   # inferred: status request commands present
- levelable   # inferred: pixel phase, total pixels, start adjustments present
```

## Actions
```yaml
- id: select_input
  label: Select Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1 = HDMI, 2 = VGA)
  notes: Switcher must be in manual switch mode (E06 if auto mode)

- id: set_manual_switch_mode
  label: Set Manual Switch Mode
  kind: action
  params: []

- id: set_auto_switch_mode_vga
  label: Set Auto Switch Mode (VGA)
  kind: action
  params: []

- id: set_auto_switch_mode_hdmi
  label: Set Auto Switch Mode (HDMI)
  kind: action
  params: []

- id: assign_analog_audio
  label: Assign Analog Audio
  kind: action
  params:
    - name: input
      type: integer
      description: "0 = Always output, 1 = HDMI input, 2 = VGA input"

- id: set_bit_depth_mode_auto
  label: Set Bit Depth Mode (Auto)
  kind: action
  params: []

- id: set_bit_depth_mode_8bit
  label: Set Bit Depth Mode (8-bit)
  kind: action
  params: []

- id: set_hdcp_authorized
  label: Set HDCP Authorized
  kind: action
  params:
    - name: authorized
      type: boolean
      description: "true = authorized, false = not authorized"

- id: assign_edid
  label: Assign EDID to Input
  kind: action
  params:
    - name: input
      type: integer
      description: "1 = HDMI, 2 = VGA"
    - name: edid
      type: integer
      description: EDID value (see EDID table in source)

- id: save_edid
  label: Save EDID to User Location
  kind: action
  params:
    - name: location
      type: integer
      description: "66 or 67"

- id: mute_video
  label: Mute Video
  kind: action
  params: []

- id: unmute_video
  label: Unmute Video
  kind: action
  params: []

- id: mute_analog_audio
  label: Mute Analog Audio
  kind: action
  params: []

- id: unmute_analog_audio
  label: Unmute Analog Audio
  kind: action
  params: []

- id: set_hdmi_audio_format
  label: Set HDMI Input Audio Format
  kind: action
  params:
    - name: format
      type: integer
      description: "0 = Embedded digital, 1 = Analog, 2 = Auto select"

- id: set_vga_audio_embed
  label: Set VGA Audio Embed
  kind: action
  params:
    - name: embed
      type: integer
      description: "0 = No embed, 1 = Embed audio, 2 = No embed"

- id: mute_hdmi_audio
  label: Mute HDMI Audio Output
  kind: action
  params: []

- id: unmute_hdmi_audio
  label: Unmute HDMI Audio Output
  kind: action
  params: []

- id: set_pixel_phase
  label: Set Pixel Phase
  kind: action
  params:
    - name: phase
      type: integer
      description: "00-63 (default 32)"

- id: increment_pixel_phase
  label: Increment Pixel Phase
  kind: action
  params: []

- id: decrement_pixel_phase
  label: Decrement Pixel Phase
  kind: action
  params: []

- id: set_total_pixels
  label: Set Total Pixels
  kind: action
  params:
    - name: pixels
      type: integer
      description: Depends on input rate

- id: set_horizontal_start
  label: Set Horizontal Start
  kind: action
  params:
    - name: start
      type: integer
      description: "000-255 (default 128)"

- id: set_vertical_start
  label: Set Vertical Start
  kind: action
  params:
    - name: start
      type: integer
      description: "000-255 (default 128)"

- id: set_device_name
  label: Set Device Name
  kind: action
  params:
    - name: name
      type: string
      description: "Up to 24 alphanumeric characters and hyphen"

- id: reset_factory
  label: Reset to Factory Defaults
  kind: action
  params: []

- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0 = Clear, 1 = Verbose, 2 = Tagged, 3 = Verbose and tagged"
```

## Feedbacks
```yaml
- id: input_selection_response
  type: integer
  values_context: "1 = HDMI, 2 = VGA"

- id: switch_mode_response
  type: integer
  values_context: "0 = Manual, 1 = Auto VGA, 2 = Auto HDMI"

- id: audio_assignment_response
  type: integer
  values_context: "0 = Always output, 1 = HDMI, 2 = VGA"

- id: signal_status_response
  type: string
  description: Returns signal status for HDMI, VGA, and output

- id: hdcp_input_status
  type: integer
  values_context: "0 = No source, 1 = HDCP source, 2 = No HDCP source"

- id: hdcp_output_status
  type: integer
  values_context: "0 = No sink, 1 = HDCP sink, 2 = No HDCP sink"

- id: bit_depth_mode_response
  type: integer
  values_context: "0 = Auto, 1 = 8-bit"

- id: hdcp_authorized_response
  type: integer
  values_context: "0 = Not authorized, 1 = Authorized"

- id: edid_assignment_response
  type: integer
  description: Returns EDID value

- id: raw_edid_response
  type: string
  description: 128 or 256 bytes of hexadecimal EDID data

- id: edid_native_resolution_response
  type: string
  description: Resolution and rate in plain text (e.g. 1920x1200 @60Hz)

- id: video_mute_response
  type: integer
  values_context: "0 = Unmuted, 1 = Muted"

- id: analog_audio_mute_response
  type: integer
  values_context: "0 = Unmuted, 1 = Muted"

- id: hdmi_audio_mute_response
  type: integer
  values_context: "0 = Disabled, 1 = Enabled"

- id: hdmi_audio_format_response
  type: integer
  values_context: "0 = Embedded digital, 1 = Analog, 2 = Auto select"

- id: vga_audio_embed_response
  type: integer
  values_context: "0 = No embed, 1 = Embed, 2 = No embed"

- id: pixel_phase_response
  type: integer
  range: "00-63"

- id: total_pixels_response
  type: integer

- id: horizontal_start_response
  type: integer
  range: "000-255"

- id: vertical_start_response
  type: integer
  range: "000-255"

- id: tp_switch_position_response
  type: integer
  values_context: "0 = DTP, 1 = HDBT"

- id: device_name_response
  type: string

- id: info_request_response
  type: string
  description: Returns input selection, audio assignment, switch mode, video mute, audio mute status

- id: part_number_response
  type: string

- id: firmware_version_response
  type: string
  format: "x.xx"

- id: verbose_mode_response
  type: integer
  values_context: "0 = Clear, 1 = Verbose, 2 = Tagged, 3 = Verbose and tagged"

- id: error_response
  type: string
  values_context: "E01 = Invalid input, E06 = Invalid change, E10 = Invalid command, E13 = Invalid parameter"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters outside action context
```

## Events
```yaml
# UNRESOLVED: no explicit event definitions in source
# NOTE: source mentions switcher-initiated messages (copyright on power-on,
# HdbtO1*n on TP function switch change) but full syntax not detailed
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - When TP switch is in HDBT position, both transmitter and receiver require separate local 12 VDC power supplies
  - When TP switch is in DTP position, one 12 VDC power supply connected to either unit can power both units
```

## Notes
- SIS commands do not require special characters to begin or end sequences
- Command timeout: 10 seconds between ASCII characters
- All responses end with CR/LF (`\r\n`)
- RS-232 connector: 3.5mm, 3-pole captive screw (Tx Rx G)
- USB Configuration port also available for control
- EDID table provides 16 PC modes, 16 DVI-PC modes, 8 HDMI-PC modes, 6 HDMI-HDTV modes
- Verbose modes affect response prefix format; modes 2 and 3 return "HdbtO1" prefix for TP position query
<!-- UNRESOLVED: USB command protocol details not documented in source -->

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
last_checked_at: 2026-05-18T16:33:17.239Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T16:33:17.239Z
matched_actions: 27
action_count: 27
confidence: high
summary: "All 27 spec actions matched semantically in source; transport parameters fully verified in RS-232 protocol section."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
