---
spec_id: admin/shinybow-sb-5645
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shinybow SB-5645 Control Spec"
manufacturer: Shinybow
model_family: SB-5645
aliases: []
compatible_with:
  manufacturers:
    - Shinybow
  models:
    - SB-5645
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - shinybowusa.com
source_urls:
  - https://shinybowusa.com/PDF/RS232_V1.0.pdf
retrieved_at: 2026-06-01T22:48:42.875Z
last_checked_at: 2026-10-07T18:44:52.302Z
generated_at: 2026-10-07T18:44:52.302Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes no TCP/IP, REST, UDP, or OSC control path"
  - "firmware version compatibility not stated in source"
  - "source row maps suffix O4 to \"Channel 3 Updated\", but the"
  - "same suffix-vs-channel mismatch as channel_3_updated."
  - "source documents no settable parameters separate from the"
  - "source does not describe unsolicited (push) events outside of"
  - "source documents no multi-step macro sequences."
  - "source contains no safety warnings, interlock procedures, or"
  - "command terminator (CR / LF / none) not stated in source"
  - "response timing / inter-command delay not stated"
  - "serial connector pinout and cable wiring (straight vs null-modem) not stated in the refined source"
  - "behavior when an out-of-range input (e.g. 07+) is requested not stated"
verification:
  verdict: verified
  checked_at: 2026-10-07T18:44:52.302Z
  matched_actions: 20
  action_count: 20
  confidence: medium
  summary: "All 20 action units match source commands and feedback frames, the serial parameters are confirmed, and the spec covers essentially the whole command catalogue. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Shinybow SB-5645 Control Spec

## Summary
Shinybow SB-5645 is a 6-input × 4-output matrix switcher controllable via RS-232. This spec covers the 8-byte ASCII command protocol documented in the vendor's "RS-232 Protocol Version 1.0" guide (Part no. Encl00RS23200a0, FEB 2016), including power, routing, panel lock, reset, and status-query commands plus their feedback acknowledgements.

<!-- UNRESOLVED: source describes no TCP/IP, REST, UDP, or OSC control path -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

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
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable   # inferred from SBSYSMON / SBSYSMOF power commands
- routable    # inferred from SBI{input}O{output} routing commands
- queryable   # inferred from SBASKSTA status query
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "SBSYSMON"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "SBSYSMOF"
  params: []

- id: route_to_output_1
  label: Channel 1 Setting (route input to output 1)
  kind: action
  command: "SBI{input}O01"
  params:
    - name: input
      type: string
      description: Input number as zero-padded two-digit ASCII (01..06)
      enum: ["01", "02", "03", "04", "05", "06"]

- id: route_to_output_2
  label: Channel 2 Setting (route input to output 2)
  kind: action
  command: "SBI{input}O02"
  params:
    - name: input
      type: string
      description: Input number as zero-padded two-digit ASCII (01..06)
      enum: ["01", "02", "03", "04", "05", "06"]

- id: route_to_output_3
  label: Channel 3 Setting (route input to output 3)
  kind: action
  command: "SBI{input}O03"
  params:
    - name: input
      type: string
      description: Input number as zero-padded two-digit ASCII (01..06)
      enum: ["01", "02", "03", "04", "05", "06"]

- id: route_to_output_4
  label: Channel 4 Setting (route input to output 4)
  kind: action
  command: "SBI{input}O04"
  params:
    - name: input
      type: string
      description: Input number as zero-padded two-digit ASCII (01..06)
      enum: ["01", "02", "03", "04", "05", "06"]

- id: panel_lock_on
  label: Front Panel Lock Toggle On
  kind: action
  command: "SBSYSMLK"
  params: []

- id: panel_lock_off
  label: Front Panel Lock Toggle Off
  kind: action
  command: "SBSYSMUK"
  params: []

- id: reset
  label: Reset (all destinations to Source 1)
  kind: action
  command: "SBALLRST"
  params: []

- id: ask_status
  label: Ask Status
  kind: query
  command: "SBASKSTA"
  params: []
  # Device replies sequentially with: status ack (SBSTATAK), power state (SBALONAK/SBALOFAK),
  # IN/OUT state (SBUD0000XXYY), and lock state (SBSYSLOK/SBSYSULK).
```

## Feedbacks
```yaml
- id: power_on_ack
  label: Power On Acknowledgement
  type: literal
  command: "SBALONAK"
  query_command: "SBASKSTA"

- id: power_off_ack
  label: Power Off Acknowledgement
  type: literal
  command: "SBALOFAK"
  query_command: "SBASKSTA"

- id: channel_1_updated
  label: Channel 1 Updated
  type: pattern
  command: "SBUD{input}O1"
  query_command: "SBASKSTA"
  params:
    - name: input
      type: string
      description: Selected source as zero-padded two-digit ASCII (01..06)

- id: channel_2_updated
  label: Channel 2 Updated
  type: pattern
  command: "SBUD{input}O2"
  query_command: "SBASKSTA"
  params:
    - name: input
      type: string
      description: Selected source as zero-padded two-digit ASCII (01..06)

- id: channel_3_updated
  label: Channel 3 Updated
  type: pattern
  command: "SBUD{input}O4"   # verbatim from source row 5; description says channel 3
  query_command: "SBASKSTA"
  params:
    - name: input
      type: string
      description: Selected source as zero-padded two-digit ASCII (01..06)
  # UNRESOLVED: source row maps suffix O4 to "Channel 3 Updated", but the
  # ask-status reply format note (SBUD0000XXYY where YY is output port) implies
  # YY should equal the output number. Likely vendor doc typo or OCR artifact;
  # confirm against a real device before relying on this suffix.

- id: channel_4_updated
  label: Channel 4 Updated
  type: pattern
  command: "SBUD{input}O3"   # verbatim from source row 6; description says channel 4
  query_command: "SBASKSTA"
  params:
    - name: input
      type: string
      description: Selected source as zero-padded two-digit ASCII (01..06)
  # UNRESOLVED: same suffix-vs-channel mismatch as channel_3_updated.

- id: lock_on
  label: Lock On
  type: literal
  command: "SBSYSLOK"
  query_command: "SBASKSTA"

- id: lock_off
  label: Lock Off
  type: literal
  command: "SBSYSULK"
  query_command: "SBASKSTA"

- id: reset_ack
  label: Reset Acknowledgement
  type: literal
  command: "SBRSTACK"

- id: status_ack
  label: Status Acknowledge (first frame in status reply sequence)
  type: literal
  command: "SBSTATAK"
  query_command: "SBASKSTA"

- id: status_in_out_state
  label: IN/OUT State (per output, returned during status reply)
  type: pattern
  command: "SBUD0000{input}{output}"
  query_command: "SBASKSTA"
  params:
    - name: input
      type: string
      description: Input port as zero-padded two-digit ASCII (01..06)
    - name: output
      type: string
      description: Output port as zero-padded two-digit ASCII (01..06)
  # Per source note: SBUD0000XXYY - XX = input port, YY = output port.
```

## Variables
```yaml
# UNRESOLVED: source documents no settable parameters separate from the
# discrete action / feedback opcodes above (no volume, gain, EDID, etc.).
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited (push) events outside of
# the feedback acks emitted in response to controller commands.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-sequencing requirements.
```

## Notes
- All commands are exactly 8 ASCII bytes, sent from controller to device. No terminator (CR/LF) is documented in the source; verify against a real device.
- "When locked on, all status' are changed by RS-232 only" — front-panel lock affects panel input, not RS-232. Source uses the same phrasing for both lock-on (SBSYSMLK) and lock-off (SBSYSMUK) descriptions, which appears to be a vendor doc copy-paste error; assume SBSYSMUK re-enables front-panel control.
- `SBALLRST` resets all 4 outputs to Source 1.
- `SBASKSTA` triggers a multi-frame reply sequence (status ack, power state, per-output IN/OUT state, lock state) per the remark at the end of the feedback table.
- Source command spellings have OCR-induced mixed case (e.g. "SBSYSmon"); normalized to all-uppercase here to match the explicit uppercase examples in the status-reply note ("SBASKSTA", "SBUD0000XXYY"). Verify byte-exact case against a real device.
- Protocol header states "RS-232 Protocol Version 1.0, applies to all devices except SB-5688". SB-5645 is therefore in scope.
<!-- UNRESOLVED: command terminator (CR / LF / none) not stated in source -->
<!-- UNRESOLVED: response timing / inter-command delay not stated -->
<!-- UNRESOLVED: serial connector pinout and cable wiring (straight vs null-modem) not stated in the refined source -->
<!-- UNRESOLVED: behavior when an out-of-range input (e.g. 07+) is requested not stated -->

## Provenance

```yaml
source_domains:
  - shinybowusa.com
source_urls:
  - https://shinybowusa.com/PDF/RS232_V1.0.pdf
retrieved_at: 2026-06-01T22:48:42.875Z
last_checked_at: 2026-10-07T18:44:52.302Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T18:44:52.302Z
matched_actions: 20
action_count: 20
confidence: medium
summary: "All 20 action units match source commands and feedback frames, the serial parameters are confirmed, and the spec covers essentially the whole command catalogue. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes no TCP/IP, REST, UDP, or OSC control path"
- "firmware version compatibility not stated in source"
- "source row maps suffix O4 to \"Channel 3 Updated\", but the"
- "same suffix-vs-channel mismatch as channel_3_updated."
- "source documents no settable parameters separate from the"
- "source does not describe unsolicited (push) events outside of"
- "source documents no multi-step macro sequences."
- "source contains no safety warnings, interlock procedures, or"
- "command terminator (CR / LF / none) not stated in source"
- "response timing / inter-command delay not stated"
- "serial connector pinout and cable wiring (straight vs null-modem) not stated in the refined source"
- "behavior when an out-of-range input (e.g. 07+) is requested not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
