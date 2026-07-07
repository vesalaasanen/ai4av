---
spec_id: admin/aurora-asp-44
schema_version: ai4av-public-spec-v1
revision: 1
title: "Aurora ASP-44 Control Spec"
manufacturer: Aurora
model_family: ASP-44
aliases: []
compatible_with:
  manufacturers:
    - Aurora
  models:
    - ASP-44
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sep.turbifycdn.com
  - manualslib.com
source_urls:
  - https://sep.turbifycdn.com/ty/cdn/focusedtechnology/ASP-44-manual.pdf
  - https://www.manualslib.com/manual/609804/Aurora-Multimedia-Aspyre-Asp-44.html
retrieved_at: 2026-07-01T14:34:00.921Z
last_checked_at: 2026-07-07T10:58:23.538Z
generated_at: 2026-07-07T10:58:23.538Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The requested/intended protocol was TCP/IP, but the source document describes ONLY RS-232 serial and IR control. No TCP/IP, telnet, port number, or network configuration appears anywhere in the source. A TCP/IP spec cannot be populated from this source without fabrication."
  - "Firmware version compatibility not stated in source."
  - "Serial flow control not stated in source."
  - "Firmware-version response format not detailed in source."
  - "flow control not stated in source"
  - "source lists this hex under POWER block without a function label\""
  - "response format for the VR query is not documented in source"
  - "preset count / valid range not stated in source"
  - "no event/notification mechanism described in source"
  - "no macros documented"
  - "Requested protocol was TCP/IP but the source contains NO TCP/IP, telnet, network port, or IP configuration material. Producing a TCP/IP spec from this source would require fabrication. If a TCP/IP variant exists, a separate source document is needed."
  - "Serial flow control not stated (only baud/data/parity/stop)."
  - "Firmware-version query (VR) response format not documented."
  - "Preset count and valid range not stated."
  - "Two IR2 hex codes (0x0A, 0x0C) are listed without a function label."
  - "IR2 POWER lists two codes (0x17, 0x02); on/off distinction not stated."
verification:
  verdict: verified
  checked_at: 2026-07-07T10:58:23.538Z
  matched_actions: 67
  action_count: 67
  confidence: medium
  summary: "All 67 spec actions matched literal command tokens in source. Serial transport (9600 8N1) verified. Full bidirectional coverage achieved. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Aurora ASP-44 Control Spec

## Summary
The Aurora ASP-44 is a 4×4 matrix router controllable via RS-232 serial and IR. The serial command set uses ASCII mnemonics prefixed with `!` (activate), `?` (query), and `~` (response), each terminated by carriage return (`<cr>`, 0x0D). The device also accepts IR discrete codes through a 3.5mm IR receiver jack, with three custom-code sets (IR2/IR3/IR4).

<!-- UNRESOLVED: The requested/intended protocol was TCP/IP, but the source document describes ONLY RS-232 serial and IR control. No TCP/IP, telnet, port number, or network configuration appears anywhere in the source. A TCP/IP spec cannot be populated from this source without fabrication. -->
<!-- UNRESOLVED: Firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: Serial flow control not stated in source. -->
<!-- UNRESOLVED: Firmware-version response format not detailed in source. -->

## Transport
```yaml
# Source documents RS-232 serial only (plus IR). No TCP/IP content present.
# Serial framing is explicitly stated: 9600 baud, 8 data bits, no parity, 1 stop bit.
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth/login procedure in source
# RS-232 DB9 pinout (from source): Pin 2 = Tx, Pin 3 = Rx, Pin 5 = Ground.
# Device-ID addressing: commands carry a device ID; ID 255 broadcasts to all
# devices. Only a device whose ID matches (or 255) executes the command.
# Command framing: '!' = activate, '?' = query, '~' = response, '<cr>' (0x0D) = end.
```

## Traits
```yaml
# - routable: route-change and route-query commands present (!R / ?R) plus IR routing codes
# - queryable: ?R query command present; VR firmware query present
# - powerable: IR POWER discrete codes present (0x17 / 0x02 under IR2 POWER)
traits:
  - routable    # inferred from routing command examples
  - queryable   # inferred from query command examples
  - powerable   # inferred from IR POWER discrete codes
```

## Actions
```yaml
# ---------------------------------------------------------------------------
# SERIAL COMMANDS (RS-232). All commands end with <cr> (carriage return, 0x0D).
# '!' activates, '?' queries. Response prefix is '~'. See Transport notes.
# ---------------------------------------------------------------------------

- id: route_set
  label: Change Route
  kind: action
  command: "!R{input}to{outputs}<cr>"
  params:
    - name: input
      type: integer
      description: Source input number (1-based)
    - name: outputs
      type: string
      description: Comma-separated output numbers, e.g. "2,3,4"
  notes: Example from source - route input 1 to outputs 2,3,4: "!R1to2,3,4<cr>"

- id: route_query
  label: Query Route
  kind: query
  command: "?R{input}<cr>"
  params:
    - name: input
      type: integer
      description: Source input number to query (1-based)
  notes: Example - "?R1<cr>". Response echoes the routed outputs.

- id: preset_recall
  label: Preset Recall
  kind: action
  command: "!P{preset}<cr>"
  params:
    - name: preset
      type: integer
      description: Preset number, zero-padded two digits (e.g. 01)
  notes: Example - "!P01<cr>". Response "~P01<cr>".

- id: firmware_version_query
  label: Firmware Version Query
  kind: query
  command: "VR"
  params: []
  notes: Returns firmware version. Response format not documented.

- id: set_ir_custom_code_ir2
  label: Set IR Custom Code IR2 (default)
  kind: action
  command: ">>IR2"
  params: []
  notes: Sets IR custom code to 0x00 0xFF (factory default). Device echoes ">>IR2".

- id: set_ir_custom_code_ir3
  label: Set IR Custom Code IR3
  kind: action
  command: ">>IR3"
  params: []
  notes: Sets IR custom code to 0x12 0x21. Device echoes ">>IR3".

- id: set_ir_custom_code_ir4
  label: Set IR Custom Code IR4
  kind: action
  command: ">>IR4"
  params: []
  notes: Sets IR custom code to 0x13 0x31. Device echoes ">>IR4".

# ---------------------------------------------------------------------------
# IR DISCRETE CODES - IR2 (Default Custom Code: 0x00 0xFF)
# Each `command` is the IR data byte (verbatim from source). The full IR frame
# is [custom_code_2_bytes] + [data_byte]. Suitable formats include NEC, RC5,
# Sony 12/15/20-bit, Toshiba Micom, Grundig, Mitsubishi, Zenith, JVC, etc.
# ---------------------------------------------------------------------------

- id: ir2_power_1
  label: Power (IR2) - code 0x17
  kind: action
  command: "0x17"
  params: []
  notes: Listed under "POWER" in IR2 table. Source does not distinguish on/off.

- id: ir2_power_2
  label: Power (IR2) - code 0x02
  kind: action
  command: "0x02"
  params: []
  notes: Listed under "POWER" in IR2 table. Source does not distinguish on/off.

- id: ir2_unlabeled_1
  label: Unlabeled function (IR2) - code 0x0A
  kind: action
  command: "0x0A"
  params: []
  notes: "# UNRESOLVED: source lists this hex under POWER block without a function label"

- id: ir2_unlabeled_2
  label: Unlabeled function (IR2) - code 0x0C
  kind: action
  command: "0x0C"
  params: []
  notes: "# UNRESOLVED: source lists this hex under POWER block without a function label"

- id: ir2_source_select_1
  label: Source Select 1 (IR2)
  kind: action
  command: "0x54"
  params: []

- id: ir2_source_select_2
  label: Source Select 2 (IR2)
  kind: action
  command: "0x55"
  params: []

- id: ir2_source_select_3
  label: Source Select 3 (IR2)
  kind: action
  command: "0x56"
  params: []

- id: ir2_source_select_4
  label: Source Select 4 (IR2)
  kind: action
  command: "0x01"
  params: []

- id: ir2_f1
  label: F1 (IR2)
  kind: action
  command: "0x57"
  params: []

- id: ir2_f2
  label: F2 (IR2)
  kind: action
  command: "0x58"
  params: []

- id: ir2_f3
  label: F3 (IR2)
  kind: action
  command: "0x59"
  params: []

- id: ir2_f4
  label: F4 (IR2)
  kind: action
  command: "0x06"
  params: []

# IR2 - Output Port routing matrix (output × input)
- id: ir2_out1_in1
  label: Output Port 1 Input 1 (IR2)
  kind: action
  command: "0x18"
  params: []
- id: ir2_out1_in2
  label: Output Port 1 Input 2 (IR2)
  kind: action
  command: "0x5B"
  params: []
- id: ir2_out1_in3
  label: Output Port 1 Input 3 (IR2)
  kind: action
  command: "0x19"
  params: []
- id: ir2_out1_in4
  label: Output Port 1 Input 4 (IR2)
  kind: action
  command: "0x07"
  params: []
- id: ir2_out2_in1
  label: Output Port 2 Input 1 (IR2)
  kind: action
  command: "0x1B"
  params: []
- id: ir2_out2_in2
  label: Output Port 2 Input 2 (IR2)
  kind: action
  command: "0x5A"
  params: []
- id: ir2_out2_in3
  label: Output Port 2 Input 3 (IR2)
  kind: action
  command: "0x1A"
  params: []
- id: ir2_out2_in4
  label: Output Port 2 Input 4 (IR2)
  kind: action
  command: "0x04"
  params: []
- id: ir2_out3_in1
  label: Output Port 3 Input 1 (IR2)
  kind: action
  command: "0x0E"
  params: []
- id: ir2_out3_in2
  label: Output Port 3 Input 2 (IR2)
  kind: action
  command: "0x0D"
  params: []
- id: ir2_out3_in3
  label: Output Port 3 Input 3 (IR2)
  kind: action
  command: "0x12"
  params: []
- id: ir2_out3_in4
  label: Output Port 3 Input 4 (IR2)
  kind: action
  command: "0x05"
  params: []
- id: ir2_out4_in1
  label: Output Port 4 Input 1 (IR2)
  kind: action
  command: "0x1C"
  params: []
- id: ir2_out4_in2
  label: Output Port 4 Input 2 (IR2)
  kind: action
  command: "0x1D"
  params: []
- id: ir2_out4_in3
  label: Output Port 4 Input 3 (IR2)
  kind: action
  command: "0x1F"
  params: []
- id: ir2_out4_in4
  label: Output Port 4 Input 4 (IR2)
  kind: action
  command: "0x1E"
  params: []

# ---------------------------------------------------------------------------
# IR DISCRETE CODES - IR3 (Custom Code: 0x12 0x21)
# Source×Output routing grid. command = data byte (verbatim).
# ---------------------------------------------------------------------------

- id: ir3_s1_o1
  label: Source 1 to Output 1 (IR3)
  kind: action
  command: "0xA1"
  params: []
- id: ir3_s1_o2
  label: Source 1 to Output 2 (IR3)
  kind: action
  command: "0xB1"
  params: []
- id: ir3_s1_o3
  label: Source 1 to Output 3 (IR3)
  kind: action
  command: "0xC1"
  params: []
- id: ir3_s1_o4
  label: Source 1 to Output 4 (IR3)
  kind: action
  command: "0xD1"
  params: []
- id: ir3_s2_o1
  label: Source 2 to Output 1 (IR3)
  kind: action
  command: "0xA2"
  params: []
- id: ir3_s2_o2
  label: Source 2 to Output 2 (IR3)
  kind: action
  command: "0xB2"
  params: []
- id: ir3_s2_o3
  label: Source 2 to Output 3 (IR3)
  kind: action
  command: "0xC2"
  params: []
- id: ir3_s2_o4
  label: Source 2 to Output 4 (IR3)
  kind: action
  command: "0xD2"
  params: []
- id: ir3_s3_o1
  label: Source 3 to Output 1 (IR3)
  kind: action
  command: "0xA3"
  params: []
- id: ir3_s3_o2
  label: Source 3 to Output 2 (IR3)
  kind: action
  command: "0xB3"
  params: []
- id: ir3_s3_o3
  label: Source 3 to Output 3 (IR3)
  kind: action
  command: "0xC3"
  params: []
- id: ir3_s3_o4
  label: Source 3 to Output 4 (IR3)
  kind: action
  command: "0xD3"
  params: []
- id: ir3_s4_o1
  label: Source 4 to Output 1 (IR3)
  kind: action
  command: "0xA4"
  params: []
- id: ir3_s4_o2
  label: Source 4 to Output 2 (IR3)
  kind: action
  command: "0xB4"
  params: []
- id: ir3_s4_o3
  label: Source 4 to Output 3 (IR3)
  kind: action
  command: "0xC4"
  params: []
- id: ir3_s4_o4
  label: Source 4 to Output 4 (IR3)
  kind: action
  command: "0xD4"
  params: []

# ---------------------------------------------------------------------------
# IR DISCRETE CODES - IR4 (Custom Code: 0x13 0x31)
# Source×Output routing grid. command = data byte (verbatim).
# ---------------------------------------------------------------------------

- id: ir4_s1_o1
  label: Source 1 to Output 1 (IR4)
  kind: action
  command: "0xAE"
  params: []
- id: ir4_s1_o2
  label: Source 1 to Output 2 (IR4)
  kind: action
  command: "0xBE"
  params: []
- id: ir4_s1_o3
  label: Source 1 to Output 3 (IR4)
  kind: action
  command: "0xCE"
  params: []
- id: ir4_s1_o4
  label: Source 1 to Output 4 (IR4)
  kind: action
  command: "0xDE"
  params: []
- id: ir4_s2_o1
  label: Source 2 to Output 1 (IR4)
  kind: action
  command: "0xAD"
  params: []
- id: ir4_s2_o2
  label: Source 2 to Output 2 (IR4)
  kind: action
  command: "0xBD"
  params: []
- id: ir4_s2_o3
  label: Source 2 to Output 3 (IR4)
  kind: action
  command: "0xCD"
  params: []
- id: ir4_s2_o4
  label: Source 2 to Output 4 (IR4)
  kind: action
  command: "0xDD"
  params: []
- id: ir4_s3_o1
  label: Source 3 to Output 1 (IR4)
  kind: action
  command: "0xAC"
  params: []
- id: ir4_s3_o2
  label: Source 3 to Output 2 (IR4)
  kind: action
  command: "0xBC"
  params: []
- id: ir4_s3_o3
  label: Source 3 to Output 3 (IR4)
  kind: action
  command: "0xCC"
  params: []
- id: ir4_s3_o4
  label: Source 3 to Output 4 (IR4)
  kind: action
  command: "0xDC"
  params: []
- id: ir4_s4_o1
  label: Source 4 to Output 1 (IR4)
  kind: action
  command: "0xAB"
  params: []
- id: ir4_s4_o2
  label: Source 4 to Output 2 (IR4)
  kind: action
  command: "0xBB"
  params: []
- id: ir4_s4_o3
  label: Source 4 to Output 3 (IR4)
  kind: action
  command: "0xCB"
  params: []
- id: ir4_s4_o4
  label: Source 4 to Output 4 (IR4)
  kind: action
  command: "0xDB"
  params: []
```

## Feedbacks
```yaml
# Solicited responses (prefix '~', terminated by <cr>).
- id: route_response
  type: string
  values: []  # format "~R{input}to{outputs}<cr>", e.g. "~R1to2,3,4"
  notes: Echo of the active route; returned for both !R and ?R.

- id: preset_response
  type: string
  values: []  # format "~P{preset}<cr>", e.g. "~P01"
  notes: Echo acknowledging preset recall.

- id: ir_custom_code_echo
  type: string
  values: [">>IR2", ">>IR3", ">>IR4"]
  notes: Echo confirming IR custom-code selection.

- id: firmware_version_response
  type: string
  values: []
  # UNRESOLVED: response format for the VR query is not documented in source
```

## Variables
```yaml
# No settable continuous parameters documented. Routing and presets are
# discrete actions (see Actions). Preset range not bounded in source.
# UNRESOLVED: preset count / valid range not stated in source
```

## Events
```yaml
# No unsolicited notifications documented; all responses are solicited.
# UNRESOLVED: no event/notification mechanism described in source
```

## Macros
```yaml
# No multi-step sequences described in source.
# UNRESOLVED: no macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: firmware_update_serial_only
    description: >
      WARNING (verbatim from source): "Firmware update only can be done via
      RS-232 port and connection to PC set at COM1." Power off the ASP-44
      before running the firmware update program. Use a straight-through
      (pin-pin) cable from PC COM1 to the ASP-44 RS-232 port.
    source: explicit warning in source document
```

## Notes
- **DB9 pinout:** Pin 2 = Tx, Pin 3 = Rx, Pin 5 = Ground.
- **Device-ID addressing:** Each command targets a device ID; `255` broadcasts to all devices on the bus. Only a device whose ID matches (or 255) acts on a command.
- **Command framing:** `!` starts an activate command, `?` starts a query, `~` starts a response, `<cr>` (0x0D) terminates every frame.
- **IR connector:** 3.5mm jack for an IR receiver.
- **Supported IR data formats:** NEC, RC5, Toshiba Micom, Grundig, Sony 12/15/20-bit, Mitsubishi, Zenith, JVC, M50560-001P, MN6125H/L, MN6014_C5D7, MN6014-C6D6, MC14457P, LC7464(AHEA), Gemini_CM. Not recommended: RCA, RCM, Matsushita.
- **IR framing:** each IR action's `command` is the data byte as printed in the source. The complete IR frame is the 2-byte custom code (IR2 = `0x00 0xFF`, IR3 = `0x12 0x21`, IR4 = `0x13 0x31`) followed by the data byte. Select the active custom-code set over RS-232 via `>>IR2` / `>>IR3` / `>>IR4`.

<!-- UNRESOLVED: Requested protocol was TCP/IP but the source contains NO TCP/IP, telnet, network port, or IP configuration material. Producing a TCP/IP spec from this source would require fabrication. If a TCP/IP variant exists, a separate source document is needed. -->
<!-- UNRESOLVED: Serial flow control not stated (only baud/data/parity/stop). -->
<!-- UNRESOLVED: Firmware-version query (VR) response format not documented. -->
<!-- UNRESOLVED: Preset count and valid range not stated. -->
<!-- UNRESOLVED: Two IR2 hex codes (0x0A, 0x0C) are listed without a function label. -->
<!-- UNRESOLVED: IR2 POWER lists two codes (0x17, 0x02); on/off distinction not stated. -->
```

## Provenance

```yaml
source_domains:
  - sep.turbifycdn.com
  - manualslib.com
source_urls:
  - https://sep.turbifycdn.com/ty/cdn/focusedtechnology/ASP-44-manual.pdf
  - https://www.manualslib.com/manual/609804/Aurora-Multimedia-Aspyre-Asp-44.html
retrieved_at: 2026-07-01T14:34:00.921Z
last_checked_at: 2026-07-07T10:58:23.538Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T10:58:23.538Z
matched_actions: 67
action_count: 67
confidence: medium
summary: "All 67 spec actions matched literal command tokens in source. Serial transport (9600 8N1) verified. Full bidirectional coverage achieved. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The requested/intended protocol was TCP/IP, but the source document describes ONLY RS-232 serial and IR control. No TCP/IP, telnet, port number, or network configuration appears anywhere in the source. A TCP/IP spec cannot be populated from this source without fabrication."
- "Firmware version compatibility not stated in source."
- "Serial flow control not stated in source."
- "Firmware-version response format not detailed in source."
- "flow control not stated in source"
- "source lists this hex under POWER block without a function label\""
- "response format for the VR query is not documented in source"
- "preset count / valid range not stated in source"
- "no event/notification mechanism described in source"
- "no macros documented"
- "Requested protocol was TCP/IP but the source contains NO TCP/IP, telnet, network port, or IP configuration material. Producing a TCP/IP spec from this source would require fabrication. If a TCP/IP variant exists, a separate source document is needed."
- "Serial flow control not stated (only baud/data/parity/stop)."
- "Firmware-version query (VR) response format not documented."
- "Preset count and valid range not stated."
- "Two IR2 hex codes (0x0A, 0x0C) are listed without a function label."
- "IR2 POWER lists two codes (0x17, 0x02); on/off distinction not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
