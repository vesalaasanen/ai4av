---
spec_id: admin/extron-dtp-t-fb-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron DTP T FB Series Control Spec"
manufacturer: Extron
model_family: "DTP T FB 332"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "DTP T FB 332"
    - "DTP T FB 232"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - extron.com
  - manualslib.com
source_urls:
  - https://www.extron.com/download/files/userman/68-2682-01_D.pdf
  - https://www.extron.com/product/dtptfb232
  - https://www.manualslib.com/manual/1336409/Extron-Electronics-Dtp-T-Fb-232.html
  - https://www.manualslib.com/manual/1337376/Extron-Electronics-Dtp-T-Fb-332.html
  - "https://www.extron.com/download/get/?path=/download/files/userman/68-2682-50_B.pdf"
retrieved_at: 2026-05-17T19:54:48.844Z
last_checked_at: 2026-06-02T02:29:20.137Z
generated_at: 2026-06-02T02:29:20.137Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version range, exact model differences between 332 and 232 not detailed in source."
  - "exact payload string for signal loss/restore not stated in source excerpt"
  - "source does not document multi-step user-defined sequences"
  - "no explicit safety warnings or interlock procedures in source excerpt"
  - "differences between 332 and 232 model variants not stated in source; firmware version compatibility not stated."
verification:
  verdict: verified
  checked_at: 2026-06-02T02:29:20.137Z
  matched_actions: 62
  action_count: 62
  confidence: medium
  summary: "All 62 spec actions matched literally to source command table; complete coverage of SIS protocol; transport parameters verified. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Extron DTP T FB Series Control Spec

## Summary
SIS command set for Extron DTP T FB Series switching transmitters (models 332 and 232), controlling input switching (HDMI/VGA), audio routing/mute, EDID management, HDCP authorization, video mute, and VGA picture adjustments via RS-232 (side Remote port) or USB (top Configuration port). 9600 baud, 8-N-1, no flow control.

<!-- UNRESOLVED: firmware version range, exact model differences between 332 and 232 not detailed in source. -->

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

Note: source also references a "top panel Configuration (USB) port" using the same SIS protocol; transport interface type omitted from canonical entry per source silence on USB-specific framing.

## Traits
```yaml
- powerable       # inferred: power-on behavior described (copyright message on power)
- routable        # inferred: input switching, audio routing commands present
- queryable       # inferred: numerous status query commands present
- levelable       # inferred: pixel phase, total pixels, H/V start adjustments present
```

## Actions
```yaml
# SIS protocol: 'E' = Escape (0x1B) prefix; '}' or '|' = CR; ']' = CR/LF; '=' = space.
# Commands written verbatim from source command/response table.

# --- Input selection ---
- id: select_input
  label: Select Input
  kind: action
  command: "E {input}!"           # e.g. E 1! selects HDMI, E 2! selects VGA; manual switch mode only
  params:
    - name: input
      type: integer
      description: Input number (1=HDMI, 2=VGA)
- id: view_input
  label: View Input Selection
  kind: query
  command: "!"
  response_template: "{input}]"

# --- Switch mode ---
- id: set_switch_mode_manual
  label: Set Manual Switch Mode
  kind: action
  command: "E 0AUSW"
  response_template: "Ausw0 ]"
- id: set_switch_mode_auto_vga
  label: Set Auto Switch Mode (VGA priority)
  kind: action
  command: "E 1AUSW"
  response_template: "Ausw1 ]"
- id: set_switch_mode_auto_hdmi
  label: Set Auto Switch Mode (HDMI priority)
  kind: action
  command: "E 2AUSW"
  response_template: "Ausw2 ]"
- id: view_switch_mode
  label: View Switch Mode
  kind: query
  command: "E AUSW"
  response_template: "Ausw {mode}]"

# --- Analog audio assignment (AFLW) ---
- id: set_audio_always_output
  label: Always Output Analog Audio
  kind: action
  command: "E 0AFLW"
  response_template: "Aflw0 ]"
- id: assign_analog_audio
  label: Assign Analog Audio to Input
  kind: action
  command: "E {input}AFLW"        # input: 1=HDMI, 2=VGA
  params:
    - name: input
      type: integer
      description: Input to lock analog audio to (1=HDMI, 2=VGA)
  response_template: "Aflw {input} ]"
- id: view_audio_assignment
  label: View Audio Assignment
  kind: query
  command: "E AFLW"
  response_template: "Aflw {input}]"

# --- Input signal status ---
- id: query_all_signal_status
  label: Query Status of All Inputs and Output
  kind: query
  command: "E 0LS"
  response_template: "Sig {hdmi_status} {vga_status} {output_status}]"
  additional_info: "X$ = 0=off/disabled/not detected, 1=on/enabled/detected"

# --- HDCP status ---
- id: view_hdmi_input_hdcp
  label: View HDMI Input HDCP Status
  kind: query
  command: "E I1HDCP"
  response_template: "HdcpI {status}]"
  additional_info: "X% = 0=no source, 1=HDCP source, 2=non-HDCP source"
- id: view_output_hdcp
  label: View Output HDCP Status
  kind: query
  command: "E OHDCP"
  response_template: "HdcpO {status}]"
  additional_info: "X^ = 0=no sink, 1=HDCP sink, 2=non-HDCP sink"

# --- Output color bit depth ---
- id: set_bit_depth_auto
  label: Set Bit Depth Mode to Auto
  kind: action
  command: "E V0BITD"
  response_template: "BitdV0 ]"
- id: set_bit_depth_8bit
  label: Force Bit Depth to 8-bit
  kind: action
  command: "E V1BITD"
  response_template: "BitdV1 ]"
- id: view_bit_depth
  label: View Bit Depth Mode
  kind: query
  command: "E VBITD"
  response_template: "BitdV {mode}]"

# --- HDCP authorized device ---
- id: set_hdcp_authorized
  label: Set HDMI Input to HDCP Authorized
  kind: action
  command: "E E1HDCP"
  response_template: "HdcpE1 ]"
- id: set_hdcp_not_authorized
  label: Set HDMI Input to HDCP Not Authorized
  kind: action
  command: "E E0HDCP"
  response_template: "HdcpE0 ]"
- id: view_hdcp_authorization
  label: View HDCP Authorization Status
  kind: query
  command: "E EHDCP"
  response_template: "HdcpE {status}]"

# --- EDID Minder ---
- id: assign_edid
  label: Assign EDID to Input
  kind: action
  command: "E A {input} {edid_value}EDID"
  params:
    - name: input
      type: integer
      description: Input number (1=HDMI, 2=VGA)
    - name: edid_value
      type: integer
      description: EDID slot per EDID value table (01-56; 03 and 50 default)
  response_template: "EdidA {input} {edid_value} ]"
- id: save_edid
  label: Save EDID of Connected Display to User Location
  kind: action
  command: "E S {slot}EDID"       # slot: 66 or 67
  params:
    - name: slot
      type: integer
      description: User EDID location (66 or 67)
  response_template: "EdidS {slot} ]"
- id: view_edid_assignment
  label: View EDID Assignment
  kind: query
  command: "E A {input}EDID"
  params:
    - name: input
      type: integer
      description: Input number (1=HDMI, 2=VGA)
  response_template: "{edid_value}]"
- id: view_raw_edid
  label: View Raw EDID Data
  kind: query
  command: "E R {input}EDID"
  params:
    - name: input
      type: integer
      description: Input number (1=HDMI, 2=VGA)
  response_template: "{raw_data}]"
  additional_info: "Returns 128 or 256 hex bytes of EDID as text"
- id: view_edid_native_resolution
  label: View EDID Native Resolution
  kind: query
  command: "E N {input}EDID"
  params:
    - name: input
      type: integer
      description: Input number (1=HDMI, 2=VGA)
  response_template: "{resolution}]"
  additional_info: "Plain text, e.g. 1920x1200 @60.00Hz"

# --- Video mute ---
- id: video_mute_on
  label: Mute Video
  kind: action
  command: "1B"
  response_template: "Vmt1 ]"
- id: video_mute_off
  label: Unmute Video
  kind: action
  command: "0B"
  response_template: "Vmt0 ]"
- id: view_video_mute
  label: Read Video Mute
  kind: query
  command: "B"
  response_template: "Vmt {status}]"

# --- Analog audio mute ---
- id: analog_audio_mute_on
  label: Mute Analog Audio
  kind: action
  command: "1Z"
  response_template: "Amt1 ]"
- id: analog_audio_mute_off
  label: Unmute Analog Audio
  kind: action
  command: "0Z"
  response_template: "Amt0 ]"
- id: view_analog_audio_mute
  label: Read Analog Audio Mute
  kind: query
  command: "Z"
  response_template: "Amt {status}]"

# --- Audio routing / format (AFMT) ---
- id: set_hdmi_audio_format
  label: Set HDMI Input Audio Format
  kind: action
  command: "E I1 {routing_mode}AFMT"   # routing_mode: 0=embedded digital, 1=analog, 2=auto (digital priority)
  params:
    - name: routing_mode
      type: integer
      description: 0=embedded digital audio, 1=analog audio input, 2=auto-select (embedded digital priority)
  response_template: "AfmtI {routing_mode} ]"
- id: set_vga_audio_format
  label: Set VGA Input Audio Format
  kind: action
  command: "E I2 {embed_mode}AFMT"     # embed_mode: 0=no embed, 1=embed, 2=no embed
  params:
    - name: embed_mode
      type: integer
      description: 0=no embed, 1=embed audio, 2=no embed
  response_template: "AfmtI {embed_mode} ]"
- id: view_hdmi_audio_format
  label: View HDMI Input Audio Format
  kind: query
  command: "E I1AFMT"
  response_template: "AfmtI {routing_mode}]"
- id: view_vga_audio_format
  label: View VGA Input Audio Format
  kind: query
  command: "E I2AFMT"
  response_template: "AfmtI {embed_mode}]"
- id: hdmi_audio_mute_on
  label: Mute HDMI Audio Output
  kind: action
  command: "1AFMT"
  response_template: "Afmt1 ]"
- id: hdmi_audio_mute_off
  label: Unmute HDMI Audio Output
  kind: action
  command: "0AFMT"
  response_template: "Afmt0 ]"
- id: view_hdmi_audio_mute
  label: View HDMI Audio Mute Status
  kind: query
  command: "E AFMT"
  response_template: "Afmt {status}]"

# --- Pixel phase (VGA / input 2 only) ---
- id: set_pixel_phase
  label: Set Pixel Phase
  kind: action
  command: "E 2 {phase}PHAS"          # phase: 00-63, default 32
  params:
    - name: phase
      type: integer
      description: Pixel phase 00-63 (default 32)
  response_template: "Phas2 {phase} ]"
- id: increment_pixel_phase
  label: Increment Pixel Phase
  kind: action
  command: "E 2+PHAS"
  response_template: "Phas2 {phase} ]"
- id: decrement_pixel_phase
  label: Decrement Pixel Phase
  kind: action
  command: "E 2-PHAS"
  response_template: "Phas2 {phase} ]"
- id: view_pixel_phase
  label: View Pixel Phase
  kind: query
  command: "E 2PHAS"
  response_template: "Phas2 {phase}]"

# --- Total pixels (VGA / input 2 only) ---
- id: set_total_pixels
  label: Set Total Pixels
  kind: action
  command: "E 2 {value}TPIX"
  params:
    - name: value
      type: string
      description: Total pixels value (depends on input rate)
  response_template: "Tpix2 {value} ]"
- id: increment_total_pixels
  label: Increment Total Pixels
  kind: action
  command: "E 2+TPIX"
  response_template: "Tpix2 {value} ]"
- id: decrement_total_pixels
  label: Decrement Total Pixels
  kind: action
  command: "E 2-TPIX"
  response_template: "Tpix2 {value} ]"
- id: view_total_pixels
  label: View Total Pixels
  kind: query
  command: "E 2TPIX"
  response_template: "Tpix2 {value}]"

# --- Horizontal start (VGA / input 2 only) ---
- id: set_horizontal_start
  label: Set Horizontal Start
  kind: action
  command: "E 2 {value}HSRT"          # 000-255, default 128
  params:
    - name: value
      type: integer
      description: Horizontal start 000-255 (default 128)
  response_template: "Hsrt2 {value} ]"
- id: increment_horizontal_start
  label: Increment Horizontal Start
  kind: action
  command: "E 2+HSRT"
  response_template: "Hsrt2 {value} ]"
- id: decrement_horizontal_start
  label: Decrement Horizontal Start
  kind: action
  command: "E 2-HSRT"
  response_template: "Hsrt2 {value} ]"
- id: view_horizontal_start
  label: View Horizontal Start
  kind: query
  command: "E 2HSRT"
  response_template: "Hsrt2 {value}]"

# --- Vertical start (VGA / input 2 only) ---
- id: set_vertical_start
  label: Set Vertical Start
  kind: action
  command: "E 2 {value}VSRT"          # 000-255, default 128
  params:
    - name: value
      type: integer
      description: Vertical start 000-255 (default 128)
  response_template: "Vsrt2 {value} ]"
- id: increment_vertical_start
  label: Increment Vertical Start
  kind: action
  command: "E 2+VSRT"
  response_template: "Vsrt2 {value} ]"
- id: decrement_vertical_start
  label: Decrement Vertical Start
  kind: action
  command: "E 2-VSRT"
  response_template: "Vsrt2 {value} ]"
- id: view_vertical_start
  label: View Vertical Start
  kind: query
  command: "E 2VSRT"
  response_template: "Vsrt2 {value}]"

# --- TP function switch position (read-only via SIS) ---
- id: view_tp_switch_position
  label: View TP Function Switch Position
  kind: query
  command: "E O1HDBT"
  response_template: "HdbtO1 {position}]"
  additional_info: "Verbose mode 2/3 returns prefix. Position: 0=DTP, 1=HDBT"

# --- Device name ---
- id: set_device_name
  label: Set Device Name
  kind: action
  command: "E {name}CN"               # 24 alphanumeric chars + hyphen, must start with letter, no spaces
  params:
    - name: name
      type: string
      description: Up to 24 alphanumeric characters and hyphen; first char must be a letter, last char must not be hyphen
  response_template: "Ipn {name}]"
- id: reset_device_name
  label: Reset Device Name to Factory Default
  kind: action
  command: "E CN"
  response_template: "Ipn DTP-T-FB-332 (232) ]"
- id: view_device_name
  label: View Device Name
  kind: query
  command: "E CN"
  response_template: "Ipn {name}]"

# --- Reset ---
- id: factory_reset
  label: Reset to Factory Defaults
  kind: action
  command: "E ZXXX"
  response_template: "Zpx ]"

# --- Information requests ---
- id: information_request
  label: Information Request (full status)
  kind: query
  command: "I"
  response_template: "In {input} Aflw {audio_input} Ausw {switch_mode} Vmt {video_mute} Amt {audio_mute}]"
- id: request_part_number
  label: Request Part Number
  kind: query
  command: "N"
  response_template: "60-nnnn-nn ]"
- id: query_firmware_version
  label: Query Controller Firmware Version
  kind: query
  command: "Q"
  response_template: "{firmware}]"
  additional_info: "Format x.xx (e.g. 1.23)"

# --- Verbose mode ---
- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  command: "E {mode}CV"               # 0=clear, 1=verbose, 2=tagged, 3=verbose+tagged
  params:
    - name: mode
      type: integer
      description: 0=clear/none, 1=verbose (default for RS-232/USB), 2=tagged for queries, 3=verbose and tagged
  response_template: "Vrb {mode} ]"
- id: read_verbose_mode
  label: Read Verbose Mode
  kind: query
  command: "E CV"
  response_template: "Vrb {mode}]"
```

## Feedbacks
```yaml
- id: input_selection
  type: enum
  values: [none, hdmi, vga]
- id: switch_mode
  type: enum
  values: [manual, auto_vga, auto_hdmi]
- id: signal_status
  type: enum
  values: [off, on]
- id: hdcp_status
  type: enum
  values: [none, hdcp, non_hdcp]
- id: video_mute
  type: enum
  values: [unmuted, muted]
- id: audio_mute
  type: enum
  values: [unmuted, muted]
- id: bit_depth_mode
  type: enum
  values: [auto, forced_8bit]
- id: tp_switch_position
  type: enum
  values: [dtp, hdbt]
```

## Variables
```yaml
- id: pixel_phase
  type: integer
  range: [0, 63]
  default: 32
  description: VGA input only
- id: total_pixels
  type: string
  description: VGA input only; depends on input rate
- id: horizontal_start
  type: integer
  range: [0, 255]
  default: 128
  description: VGA input only
- id: vertical_start
  type: integer
  range: [0, 255]
  default: 128
  description: VGA input only
- id: device_name
  type: string
  max_length: 24
  description: Alphanumeric and hyphen; first char letter, last char not hyphen
- id: verbose_mode
  type: integer
  range: [0, 3]
  default: 1
- id: edid_assignment
  type: integer
  range: [1, 56]
  description: Per EDID value table; 03 and 50 are defaults
- id: user_edid_slot
  type: integer
  enum: [66, 67]
- id: hdmi_audio_routing
  type: integer
  range: [0, 2]
  description: 0=embedded digital, 1=analog, 2=auto (digital priority)
- id: vga_audio_embed
  type: integer
  range: [0, 2]
  description: 0=no embed, 1=embed, 2=no embed
- id: hdcp_authorization
  type: enum
  values: [not_authorized, authorized]
  default: authorized
```

## Events
```yaml
- id: copyright_message
  description: Sent by device on power-on
  payload: "Copyright 20yy, Extron Electronics DTP T FB 332 (232), Vx.xx, 60-nnnn-nn"
  trigger: device_power_on
- id: tp_switch_change
  description: Sent whenever side panel TP function switch is changed
  payload: "HdbtO{n}"
  params:
    - name: n
      type: integer
      description: 0=HDBT, 1=DTP
  trigger: front_panel_switch_change
- id: input_signal_change
  description: Source describes switcher-initiated messages on loss/restore of input signal
  trigger: input_signal_change
  # UNRESOLVED: exact payload string for signal loss/restore not stated in source excerpt
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step user-defined sequences
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset    # E ZXXX resets all settings; irreversible
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source excerpt
```

## Notes
- 10-second inter-character timeout: pauses of 10s+ between ASCII characters abort the command silently.
- Verbose mode 2/3 (tagged) wraps all "view" command responses with the command mnemonic prefix (e.g. `Ausw {mode}]` instead of bare `{mode}]`).
- Pixel phase, total pixels, H/V start commands use the literal `2` prefix to target VGA input 2; no equivalent for HDMI input 1.
- EDID value table covers 56 entries spanning DVI-PC, HDMI-PC, and HDMI-HDTV resolutions with 2-channel audio; 03 (1280x720@60) and 50 (720p@60) are the factory-default slots.
- HDCP authorization only applies to the HDMI input (input 1); VGA has no HDCP path.
- Source references a Configuration (USB) port on the top panel using the same SIS protocol; USB-specific transport framing is not documented in this excerpt.
<!-- UNRESOLVED: differences between 332 and 232 model variants not stated in source; firmware version compatibility not stated. -->

## Provenance

```yaml
source_domains:
  - extron.com
  - manualslib.com
source_urls:
  - https://www.extron.com/download/files/userman/68-2682-01_D.pdf
  - https://www.extron.com/product/dtptfb232
  - https://www.manualslib.com/manual/1336409/Extron-Electronics-Dtp-T-Fb-232.html
  - https://www.manualslib.com/manual/1337376/Extron-Electronics-Dtp-T-Fb-332.html
  - "https://www.extron.com/download/get/?path=/download/files/userman/68-2682-50_B.pdf"
retrieved_at: 2026-05-17T19:54:48.844Z
last_checked_at: 2026-06-02T02:29:20.137Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T02:29:20.137Z
matched_actions: 62
action_count: 62
confidence: medium
summary: "All 62 spec actions matched literally to source command table; complete coverage of SIS protocol; transport parameters verified. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version range, exact model differences between 332 and 232 not detailed in source."
- "exact payload string for signal loss/restore not stated in source excerpt"
- "source does not document multi-step user-defined sequences"
- "no explicit safety warnings or interlock procedures in source excerpt"
- "differences between 332 and 232 model variants not stated in source; firmware version compatibility not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
