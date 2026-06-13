---
spec_id: admin/extron-dtp3-t-212-d
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron DTP3 T 212 D Control Spec"
manufacturer: Extron
model_family: "DTP3 T 212 D"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "DTP3 T 212 D"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/DTP3_T_212_D_68-3709-01_C.pdf
  - https://www.extron.com/download/files/userman/DTP3_T_203_68-3702-01_F.pdf
  - https://www.extron.com/download/files/userman/dtp3_t_203_ports_protocols_68-3702-51_A.pdf
  - https://media.extron.com/public/download/files/userman/dtp3_cp_series_68-3058-50_E.pdf
  - https://media.extron.com/public/download/files/userman/DTP3_TR_331_68-3892-01_A.pdf
retrieved_at: 2026-06-11T05:30:17.816Z
last_checked_at: 2026-06-11T13:42:35.554Z
generated_at: 2026-06-11T13:42:35.554Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not state a TCP/IP control port, authentication, firmware version, voltage, or power specifications."
  - "no multi-step sequences described in source."
  - "no explicit safety warnings, interlocks, or power-on sequencing documented in source."
  - "TCP/IP control port not documented; firmware version compatibility, voltage/current/power, and authentication requirements not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-11T13:42:35.554Z
  matched_actions: 38
  action_count: 38
  confidence: medium
  summary: "All 38 spec action commands matched exactly with source command table. Transport (9600 baud, 8-N-1, no flow control) verified verbatim. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-11
---

# Extron DTP3 T 212 D Control Spec

## Summary
The Extron DTP3 T 212 D is a 2-input HDMI / USB-C transmitter for DTP3 / HDBT extension, controllable via RS-232 (rear Remote port) or USB-C configuration port (front panel) using the Extron Simple Instruction Set (SIS) ASCII command protocol. This spec covers the SIS command and response table, including video input selection, mute, HDCP control, audio format, auto-switch mode, device naming, status queries, and factory reset.

<!-- UNRESOLVED: source does not state a TCP/IP control port, authentication, firmware version, voltage, or power specifications. -->

## Transport
```yaml
# Source mentions rear-panel RS-232 Remote port (9600/8/N/1, no flow control)
# and front-panel USB-C configuration port (uses same SIS protocol).
# No TCP/IP control port documented.
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
- routable   # inferred: input selection commands (HDMI, USB-C) present
- queryable  # inferred: status query commands (LS, IHDCP, OHDCP, RPWR, OHDBT, N, I, Q, etc.) present
```

## Actions
```yaml
# === Video Configuration - Signal Status ===
- id: view_all_signal_status
  label: View All Signal Status
  kind: query
  command: "E LS }"
  params: []

- id: view_input_hdcp_status
  label: View Input HDCP Status
  kind: query
  command: "E IHDCP }"
  params:
    - name: input
      type: integer
      description: Input number (1-2): 1=HDMI, 2=USB-C

- id: view_output_hdcp_status
  label: View Output HDCP Status
  kind: query
  command: "E OHDCP }"
  params: []

# === Video Input Selection ===
- id: set_input
  label: Set Input
  kind: action
  command: "X! !"
  params:
    - name: input
      type: integer
      description: Input number (1-2): 1=HDMI (default), 2=USB-C

- id: view_current_input
  label: View Current Input Selection
  kind: query
  command: "!"
  params: []

# === Auto-Switch Mode ===
- id: set_auto_switch_mode
  label: Set Auto-Switch Mode
  kind: action
  command: "E X# AUSW }"
  params:
    - name: mode
      type: integer
      description: 0=Disabled, 1=Enabled highest-active (USB-C, default), 2=Enabled lowest-active (HDMI)

- id: view_auto_switch_mode
  label: View Auto-Switch Mode
  kind: query
  command: "E AUSW }"
  params: []

# === Video Mute ===
- id: set_video_mute
  label: Set Video Mute
  kind: action
  command: "X$ B/b"
  params:
    - name: mute
      type: integer
      description: 0=Unmute (default), 1=Mute to black, 2=Mute video and sync

- id: view_video_mute
  label: View Video Mute Status
  kind: query
  command: "B/b"
  params: []

# === Input HDCP Authorized Device ===
- id: set_hdcp_authorization_per_input
  label: Set HDCP Authorization Per Input
  kind: action
  command: "E E X! * X@ HDCP }"
  params:
    - name: input
      type: integer
      description: Input number (1-2): 1=HDMI, 2=USB-C
    - name: status
      type: integer
      description: 0=Off/disabled, 1=On/enabled (default)

- id: set_hdcp_authorization_both_inputs
  label: Set HDCP Authorization Both Inputs
  kind: action
  command: "E E X@ HDCP }"
  params:
    - name: status
      type: integer
      description: 0=Off/disabled, 1=On/enabled (default)

- id: view_hdcp_authorization
  label: View HDCP Authorization Status
  kind: query
  command: "E EHDCP }"
  params: []

# === Output HDCP Mode ===
- id: set_output_hdcp_mode
  label: Set Output HDCP Mode
  kind: action
  command: "E S X& HDCP }"
  params:
    - name: mode
      type: integer
      description: 0=Encrypt as required by input (default), 1=Always encrypt

- id: view_output_hdcp_mode
  label: View Output HDCP Mode
  kind: query
  command: "E SHDCP }"
  params: []

# === DisplayPort Alt Mode Lane Configuration ===
- id: set_dp_alt_mode_lanes
  label: Set DP Alt Mode Lane Configuration
  kind: action
  command: "E F2* X^ USBC }"
  params:
    - name: lanes
      type: integer
      description: 1=2 lanes of DP video, 2=4 lanes of DP video (default)

- id: view_dp_alt_mode_lanes
  label: View DP Alt Mode Lane Configuration
  kind: query
  command: "E F2USBC }"
  params: []

# === Audio Configuration - Input Audio Format ===
- id: set_input_audio_format
  label: Set Input Audio Format
  kind: action
  command: "E I X! * X% AFMT }"
  params:
    - name: input
      type: integer
      description: Input number (1-2): 1=HDMI, 2=USB-C
    - name: format
      type: integer
      description: 1=Auto (default), 2=Digital embedded, 3=Analog

- id: view_input_audio_format
  label: View Input Audio Format
  kind: query
  command: "E I X! AFMT }"
  params:
    - name: input
      type: integer
      description: Input number (1-2): 1=HDMI, 2=USB-C

- id: set_audio_format_all_inputs
  label: Set Audio Format (All Inputs)
  kind: action
  command: "E I* X% AFMT }"
  params:
    - name: format
      type: integer
      description: 1=Auto (default), 2=Digital embedded, 3=Analog

- id: view_audio_format_all_inputs
  label: View Audio Format (All Inputs)
  kind: query
  command: "E IAFMT }"
  params: []

# === Audio Mute ===
- id: set_audio_mute
  label: Mute Embedded Audio
  kind: action
  command: "X1@ Z"
  params:
    - name: mute
      type: integer
      description: 0=Unmute (default), 1=Muted

- id: view_audio_mute
  label: View Audio Mute Status
  kind: query
  command: "Z"
  params: []

# === Verbose Mode ===
- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  command: "E X1) CV }"
  params:
    - name: mode
      type: integer
      description: 0=Clear/none, 1=Verbose (default), 2=Tagged responses for queries, 3=Verbose + tagged

- id: view_verbose_mode
  label: View Verbose Mode
  kind: query
  command: "E CV }"
  params: []

# === Serial UART Port Configuration ===
- id: set_output_uart_port
  label: Set Output UART Port
  kind: action
  command: "E O1* X1% LRPT }"
  params:
    - name: mode
      type: integer
      description: 1=Over TP Pass through (default), 2=Host mode

- id: view_output_uart_port
  label: View Output UART Port Setting
  kind: query
  command: "E O1LRPT }"
  params: []

# === Device Name ===
- id: set_unit_name
  label: Set Unit Name
  kind: action
  command: "E X1! CN }"
  params:
    - name: name
      type: string
      description: Up to 24 chars from A-Z, 0-9, hyphen. First char letter, last char not hyphen.

- id: set_unit_name_default
  label: Set Unit Name To Factory Default
  kind: action
  command: "E • CN }"
  params: []

- id: view_unit_name
  label: View Unit Name
  kind: query
  command: "E CN }"
  params: []

# === Status Queries ===
- id: view_output_remote_power_status
  label: View Output Remote Power Status
  kind: query
  command: "E RPWR }"
  params: []

- id: view_dtphdbt_switch_status
  label: View DTP/HDBT Switch Status
  kind: query
  command: "E OHDBT }"
  params: []

- id: view_part_number
  label: View Part Number
  kind: query
  command: "N/n"
  params: []

- id: view_model_name
  label: View Model Name
  kind: query
  command: "1I/i"
  params: []

- id: view_model_description
  label: View Model Description
  kind: query
  command: "2I/i"
  params: []

- id: view_firmware_version
  label: View Firmware Version
  kind: query
  command: "Q/q"
  params: []

- id: view_firmware_version_with_build
  label: View Firmware Version With Build
  kind: query
  command: "*Q/q"
  params: []

- id: view_detailed_firmware_versions
  label: View Detailed Firmware Versions
  kind: query
  command: "0Q/q"
  params: []

# === Resets ===
- id: full_factory_reset
  label: Full Factory Reset
  kind: action
  command: "E ZXXX }"
  params: []
```

## Feedbacks
```yaml
# Unsolicited responses (device-initiated broadcasts) from source
- id: input_selection_change
  description: Broadcast when input selection changes
  response: "In X!• All"

- id: signal_status_change
  description: Broadcast when signal status changes on any input or output
  response: "Sig X@•X@"

- id: input_hdcp_change
  description: Broadcast when HDCP status changes on any input
  response: "HdcpI X!•X*"

- id: output_hdcp_change
  description: Broadcast when HDCP status changes on the output
  response: "HdcpO X("

- id: remote_power_toggle_change
  description: Broadcast when remote power toggle switch changes state
  response: "Rpwr X1$"

- id: dtphdbt_toggle_change
  description: Broadcast when DTP/HDBT toggle switch changes state
  response: "HdbtO X1#"

# Power-up message
- id: device_powerup_message
  description: Issued to host when device completes startup
  response: "© Copyright 202x, Extron DTP3 T 212 D, Vx.xx, 60-1714-nn"
```

## Variables
```yaml
# Discrete settable parameters covered as Actions above (input selection, mute,
# HDCP mode, audio format, auto-switch, verbose mode, UART port, device name,
# DP alt-mode lanes). No additional continuous/scalar variables documented.
```

## Events
```yaml
# Device-initiated unsolicited responses (also captured in Feedbacks):
unsolicited_responses:
  - trigger: input selection changes
    message: "In X!• All"
  - trigger: signal status changes on any input or output
    message: "Sig X@•X@"
  - trigger: HDCP status changes on any input
    message: "HdcpI X!•X*"
  - trigger: HDCP status changes on the output
    message: "HdcpO X("
  - trigger: remote power toggle switch changes state
    message: "Rpwr X1$"
  - trigger: DTP/HDBT toggle switch changes state
    message: "HdbtO X1#"
power_up_message: "© Copyright 202x, Extron DTP3 T 212 D, Vx.xx, 60-1714-nn"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for:
  - full_factory_reset
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlocks, or power-on sequencing documented in source.
```

## Notes
All SIS commands and responses use CR/LF (carriage return + line feed) as the response terminator. Only spaces marked with `•` in the source are required; other whitespace is purely for readability. Pauses of 10 seconds or longer between command characters cause a 10-second timeout and the command is aborted with no indication. Error responses: E01 (invalid input number), E06 (invalid channel change), E10 (invalid command), E13 (invalid parameter), E14 (invalid for this configuration), E17 (invalid command for signal type). The factory-boot reset is performed only via the physical front-panel RESET button (hold while applying power), not via SIS. Front-panel USB-C configuration port uses the same SIS command set after installing the Extron USB driver.

<!-- UNRESOLVED: TCP/IP control port not documented; firmware version compatibility, voltage/current/power, and authentication requirements not stated in source. -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/DTP3_T_212_D_68-3709-01_C.pdf
  - https://www.extron.com/download/files/userman/DTP3_T_203_68-3702-01_F.pdf
  - https://www.extron.com/download/files/userman/dtp3_t_203_ports_protocols_68-3702-51_A.pdf
  - https://media.extron.com/public/download/files/userman/dtp3_cp_series_68-3058-50_E.pdf
  - https://media.extron.com/public/download/files/userman/DTP3_TR_331_68-3892-01_A.pdf
retrieved_at: 2026-06-11T05:30:17.816Z
last_checked_at: 2026-06-11T13:42:35.554Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-11T13:42:35.554Z
matched_actions: 38
action_count: 38
confidence: medium
summary: "All 38 spec action commands matched exactly with source command table. Transport (9600 baud, 8-N-1, no flow control) verified verbatim. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not state a TCP/IP control port, authentication, firmware version, voltage, or power specifications."
- "no multi-step sequences described in source."
- "no explicit safety warnings, interlocks, or power-on sequencing documented in source."
- "TCP/IP control port not documented; firmware version compatibility, voltage/current/power, and authentication requirements not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
