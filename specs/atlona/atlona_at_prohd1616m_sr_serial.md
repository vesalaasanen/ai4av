---
spec_id: admin/atlona-at-prohd1616m-sr
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-PROHD1616M-SR Control Spec"
manufacturer: Atlona
model_family: AT-PROHD1616M-SR
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-PROHD1616M-SR
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-PRO2HD_V1.pdf
  - https://atlona.com/downloads/AMX_AT-PRO2HD1616M.zip
  - https://atlona.com/downloads/CRM_AT-PRO2HD1616M.zip
  - https://atlona.com/pdf/AT-UHD-PRO3-1616M_API.pdf
retrieved_at: 2026-05-20T18:32:28.305Z
last_checked_at: 2026-06-02T17:21:25.472Z
generated_at: 2026-06-02T17:21:25.472Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "receiver model AT-PRO2HDREC mentioned as baud-target only; no receiver-side command set documented."
  - "no explicit power-cycle entry beyond PWON/PWOFF — `powerable` not emitted as no on-state persistence is described."
  - "source documents no unsolicited device-pushed notifications."
  - "source documents no multi-step sequences."
  - "source contains no safety warnings, interlocks, or power-on sequencing requirements."
  - "firmware version not stated in source."
  - "receiver-side command set for AT-PRO2HDREC not provided in source."
  - "error-recovery / fault behavior not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:25.472Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions matched literal commands in source; transport parameters verified. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Atlona AT-PROHD1616M-SR Control Spec

## Summary
Atlona AT-PROHD1616M-SR is a 16x16 HDMI matrix switcher with bidirectional RS-232 control. This spec covers the RS-232C command set for routing, presets, EDID, front-panel lock, and serial-parameter configuration of the matrix and its receiver zones.

<!-- UNRESOLVED: receiver model AT-PRO2HDREC mentioned as baud-target only; no receiver-side command set documented. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200  # matrix default per source; also configurable via CSpara[...]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # Allowed baud values per source: 2400, 4800, 9600, 19200, 38400, 57600, 115200
  # Connector: 9-pin female D-sub. Pin 2 = Tx, Pin 3 = Rx, Pin 5 = Gnd.
  # Receiver (zone) port default per source: 9600 8N1.
auth:
  type: none  # inferred: no auth procedure in source
```

**Termination:** commands end with CR (`0x0D`); feedback ends with CRLF (`0x0D 0x0A`). Commands are case-sensitive — do not alter capitalization. On error the device replies `Command FAILED`.

## Traits
```yaml
- routable      # inferred from x1AVx2, x1All, All#, x1$, All$, x1AVx2,x3,x4 commands
- queryable     # inferred from Type, Version, PWSTA, Status, Statusx1, RS232para commands
```

<!-- UNRESOLVED: no explicit power-cycle entry beyond PWON/PWOFF — `powerable` not emitted as no on-state persistence is described. -->

## Actions
```yaml
- id: model_info_query
  label: Model Info Query
  kind: query
  command: "Type"
  params: []
  feedback: "(Model #)"

- id: lock_front_panel
  label: Lock Front Panel
  kind: action
  command: "Lock"
  params: []
  feedback: "Lock"

- id: unlock_front_panel
  label: Unlock Front Panel
  kind: action
  command: "Unlock"
  params: []
  feedback: "Unlock"

- id: firmware_version_query
  label: Firmware Version Query
  kind: query
  command: "Version"
  params: []
  feedback: "(Firmware #)"

- id: rs232_zone_passthrough
  label: RS-232 Zone Passthrough
  kind: action
  command: "RS232zoneX[cmd]"
  params:
    - name: zone
      type: integer
      description: Zone number (output number)
    - name: cmd
      type: string
      description: Command to forward to the receiver's RS-232 port (one of the commands in this table)
  feedback: "RS232zoneX[cmd]"

- id: power_on
  label: Power On
  kind: action
  command: "PWON"
  params: []
  feedback: "PWON"

- id: power_off
  label: Power Off
  kind: action
  command: "PWOFF"
  params: []
  feedback: "PWOFF"

- id: power_status_query
  label: Power Status Query
  kind: query
  command: "PWSTA"
  params: []
  feedback: "PWx  (e.g. PWON / PWOFF)"

- id: output_route_query
  label: Output Route Query (single)
  kind: query
  command: "Status{output}"
  params:
    - name: output
      type: integer
      description: Output number to query (1-16)
  feedback: "x7AVx1  (input on output)"

- id: full_route_query
  label: Full Route Status Query
  kind: query
  command: "Status"
  params: []
  feedback: "x1AVx1, x2AVx2, x3AVx4, ...."

- id: save_preset
  label: Save Preset
  kind: action
  command: "Save{preset}"
  params:
    - name: preset
      type: integer
      description: Preset slot 0-9
  feedback: "Save{preset}"

- id: recall_preset
  label: Recall Preset
  kind: action
  command: "Recall{preset}"
  params:
    - name: preset
      type: integer
      description: Preset slot 0-9
  feedback: "Recall{preset}"

- id: clear_preset
  label: Clear Preset
  kind: action
  command: "Clear{preset}"
  params:
    - name: preset
      type: integer
      description: Preset slot 0-9
  feedback: "Clear{preset}"

- id: route_input_to_all
  label: Route Input To All Outputs
  kind: action
  command: "{input}All"
  params:
    - name: input
      type: integer
      description: Input number 1-16
  feedback: "{input}All"

- id: route_input_to_matching_output
  label: Route Input To Matching Output
  kind: action
  command: "{input}#"
  params:
    - name: input
      type: integer
      description: Input number 1-16 (also used as output number)
  feedback: "{input}#"

- id: reset_all_routes
  label: Reset All Routes (input n to output n)
  kind: action
  command: "All#"
  params: []
  feedback: "All#"

- id: turn_off_output
  label: Turn Off Output
  kind: action
  command: "{output}$"
  params:
    - name: output
      type: integer
      description: Output number 1-16
  feedback: "{output}$"

- id: turn_off_all_outputs
  label: Turn Off All Outputs
  kind: action
  command: "All$"
  params: []
  feedback: "All$"

- id: route_input_to_output
  label: Route Input To Single Output
  kind: action
  command: "{input}AV{output}"
  params:
    - name: input
      type: integer
      description: Input number 1-16
    - name: output
      type: integer
      description: Output number 1-16
  feedback: "{input}AV{output}"

- id: route_input_to_multiple_outputs
  label: Route Input To Multiple Outputs
  kind: action
  command: "{input}AV{out1},{out2},{out3}"
  params:
    - name: input
      type: integer
      description: Input number 1-16
    - name: out1
      type: integer
      description: First output number 1-16
    - name: out2
      type: integer
      description: Second output number 1-16
    - name: out3
      type: integer
      description: Third output number 1-16
  feedback: "{input}AV{out1},{out2},{out3}"

- id: matrix_factory_reset
  label: Matrix Factory Reset
  kind: action
  command: "Mreset"
  params: []
  feedback: "Mreset"

- id: set_edid_default
  label: Set EDID To Default
  kind: action
  command: "EDIDMSet{input} default"
  params:
    - name: input
      type: integer
      description: Input number 1-16
  feedback: "EDIDMSet{input} default"

- id: set_edid_saved
  label: Set EDID To Saved Memory
  kind: action
  command: "EDIDMSet{input} save{memory}"
  params:
    - name: input
      type: integer
      description: Input number 1-16
    - name: memory
      type: integer
      description: Saved EDID memory slot
  feedback: "EDIDMSet{input} save{memory}"

- id: set_edid_internal
  label: Set EDID To Internal
  kind: action
  command: "EDIDMSet{input} int{edid}"
  params:
    - name: input
      type: integer
      description: Input number 1-16
    - name: edid
      type: integer
      description: Internal EDID index 1-12 (see Variables.edid_internal)
  feedback: "EDIDMSet{input} int{edid}"

- id: set_matrix_serial_params
  label: Set Matrix Serial Parameters
  kind: action
  command: "CSpara[{baud},{data},{parity},{stop}]"
  params:
    - name: baud
      type: integer
      description: Baud rate (2400, 4800, 9600, 19200, 38400, 57600, 115200)
    - name: data
      type: integer
      description: Data length - must be 8 for matrix
    - name: parity
      type: integer
      description: Parity - 0=none, 1=odd, 2=even (must be 0 for matrix)
    - name: stop
      type: integer
      description: Stop bits - must be 1 for matrix
  feedback: "CSpara[...]"

- id: query_receiver_serial_params
  label: Query Receiver Serial Parameters
  kind: query
  command: "RS232para"
  params: []
  feedback: "Multi-line per-port parameter list (see Notes)"

- id: set_receiver_serial_params
  label: Set Receiver Serial Parameters
  kind: action
  command: "RS232para{zone}[{baud},{data},{parity},{stop}]"
  params:
    - name: zone
      type: integer
      description: Zone/output number 1-16
    - name: baud
      type: integer
      description: Baud rate (2400, 4800, 9600, 19200, 38400, 57600, 115200)
    - name: data
      type: integer
      description: Data length (7 or 8)
    - name: parity
      type: integer
      description: Parity (0=none, 1=odd, 2=even)
    - name: stop
      type: integer
      description: Stop bits (1 or 2)
  feedback: "RS232para{zone}[...]"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  notes: "Reported by PWSTA as PWON or PWOFF."

- id: matrix_route_state
  type: string
  notes: "Reported by Status. Comma-separated list of x{input}AVx{output} pairs."

- id: output_route_state
  type: string
  notes: "Reported by Status{output} as x{input}AVx{output}."

- id: receiver_serial_params
  type: string
  notes: "Reported by RS232para. Multi-line: one line per output port 1-16 with BaudRate, DataBits, Parity, StopBits."
```

## Variables
```yaml
- id: baud_rate
  type: enum
  values: [2400, 4800, 9600, 19200, 38400, 57600, 115200]
  applies_to: [matrix, receiver]
  notes: "Matrix baud is set via CSpara[...]. Receiver baud is set via RS232para{zone}[...]."

- id: data_bits
  type: enum
  values: [7, 8]
  applies_to: [receiver]
  notes: "Matrix data length is fixed at 8."

- id: parity
  type: enum
  values: [none, odd, even]
  applies_to: [receiver]
  notes: "Encoded as 0/1/2 in CSpara and RS232paraX commands. Matrix parity is fixed at none."

- id: stop_bits
  type: enum
  values: [1, 2]
  applies_to: [receiver]
  notes: "Matrix stop bits fixed at 1."

- id: preset_slot
  type: integer
  range: [0, 9]
  notes: "Used by Save/Recall/Clear preset commands."

- id: input_number
  type: integer
  range: [1, 16]
  notes: "Matrix input selector."

- id: output_number
  type: integer
  range: [1, 16]
  notes: "Matrix output selector."

- id: edid_internal
  type: integer
  range: [1, 12]
  notes: "Internal EDID index. 1=1080P 2CH, 2=1080P multichannel, 3=1080P DD 5.1, 4=1080P 3D 2CH, 5=1080P 3D Multi, 6=1080P 3D DD 5.1, 7=720P 2CH, 8=720P DD 5.1, 9=1280x800 RGB 2CH, 10=1366x768 RGB 2CH, 11=1080P DVI, 12=1280x800 DVI."
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited device-pushed notifications.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing requirements.
```

## Notes
- Commands are case-sensitive per source. Do not alter capitalization, spacing, or lettering.
- Line discipline: every command is terminated with CR; every feedback is terminated with CRLF.
- On invalid command, the device replies with the literal string `Command FAILED` (no terminating bytes specified in source).
- `Mreset` returns the matrix to default settings; effect is destructive — clarify with user before exposing as a user-facing control.
- Receiver (zone) port default per source: Baud 9600, Data 8, Parity None, Stop 1.
- `RS232zoneX[cmd]` is a passthrough: it forwards any matrix command to a connected receiver's RS-232 port (e.g. `RS232zone1[PWON]`). The forwarded command set is the same as the matrix command set.
- `Status` returns a variable-length list of `x{i}AVx{j}` pairs — caller must parse the comma-separated response.
- `RS232para` returns one line per port (1-16), each line formatted `Port N :BaudRate Xbps, DataBits N, Parity XXX, StopBits N.`

<!-- UNRESOLVED: firmware version not stated in source. -->
<!-- UNRESOLVED: receiver-side command set for AT-PRO2HDREC not provided in source. -->
<!-- UNRESOLVED: error-recovery / fault behavior not stated in source. -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-PRO2HD_V1.pdf
  - https://atlona.com/downloads/AMX_AT-PRO2HD1616M.zip
  - https://atlona.com/downloads/CRM_AT-PRO2HD1616M.zip
  - https://atlona.com/pdf/AT-UHD-PRO3-1616M_API.pdf
retrieved_at: 2026-05-20T18:32:28.305Z
last_checked_at: 2026-06-02T17:21:25.472Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:25.472Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions matched literal commands in source; transport parameters verified. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "receiver model AT-PRO2HDREC mentioned as baud-target only; no receiver-side command set documented."
- "no explicit power-cycle entry beyond PWON/PWOFF — `powerable` not emitted as no on-state persistence is described."
- "source documents no unsolicited device-pushed notifications."
- "source documents no multi-step sequences."
- "source contains no safety warnings, interlocks, or power-on sequencing requirements."
- "firmware version not stated in source."
- "receiver-side command set for AT-PRO2HDREC not provided in source."
- "error-recovery / fault behavior not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
