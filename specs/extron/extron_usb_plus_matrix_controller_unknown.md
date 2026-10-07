---
spec_id: admin/extron-usb-plus-matrix-controller
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron USB Plus Matrix Controller Control Spec"
manufacturer: Extron
model_family: "USB Plus Matrix Controller"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "USB Plus Matrix Controller"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/usb_plus_matrix_cntrlr_68-3056-50_K.pdf
  - https://www.extron.com/product/usbextenderplus
  - https://media.extron.com/public/download/files/userman/matrix100all-man.pdf
  - https://www.extron.com/download/files/userman/fox3_matrix_series_68-2987-01_G.pdf
  - https://www.extron.com/article/tech92
retrieved_at: 2026-05-15T01:49:11.123Z
last_checked_at: 2026-10-07T12:57:37.167Z
generated_at: 2026-10-07T12:57:37.167Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "maximum matrix size (input/output count) not explicitly stated — only example shows 4x4"
  - "USB Extender Plus firmware compatibility range not stated"
  - "no continuous variable ranges (volume, gain, brightness) found in source"
  - "no multi-step macro sequences described in source"
  - "no explicit safety warnings or interlock procedures found in source"
  - "exact ASCII byte encoding for ESC character in SIS commands not specified (assumed 0x1B)"
  - "maximum matrix input/output size not stated — source only shows example with T1–T4 / R1–R4"
  - "save-configuration command ASCII string not in command table (X1) result code defined but command syntax missing)"
verification:
  verdict: verified
  checked_at: 2026-10-07T12:57:37.167Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 action units match source SIS commands with correct shapes, transport values are supported, and the spec covers the full 26-command catalogue. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Extron USB Plus Matrix Controller Control Spec

## Summary
The Extron USB Plus Matrix Controller is a USB switching matrix that routes USB Extender Plus transmitters (inputs) to receivers (outputs). It is controlled via Ethernet (TCP, default port 22123) or RS-232 using the Extron SIS (Simple Instruction Set) protocol. Up to 20 simultaneous TCP connections are supported.

<!-- UNRESOLVED: maximum matrix size (input/output count) not explicitly stated — only example shows 4x4 -->
<!-- UNRESOLVED: USB Extender Plus firmware compatibility range not stated -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 22123
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: credential
  method: telnet_login
  notes: >
    Default username: admin. Default password: device serial number.
    After full system reset, password reverts to "extron".
```

## Traits
```yaml
traits:
  - routable    # inferred from tie make/break/view commands
  - queryable   # inferred from firmware, part number, matrix size, connection status queries
```

## Actions
```yaml
actions:
  - id: reload_configuration
    label: Reload Configuration
    kind: action
    command: "ESC RELOAD CR"
    response: "RELOAD X2) CR/LF"
    params: []
    description: Reload the current CSV configuration. Response code X2): 0=error reloading CSV, 1=success, 2=error restarting matrix, 3=error stopping matrix, 4=CSV not found.

  - id: view_all_ties
    label: View All Ties
    kind: query
    command: "ESC 0* X# *1VC CR"
    response: "Vgp00•Out X# * X![1]•X![2]...X![16]•Vid CR/LF"
    params:
      - name: start_output
        type: integer
        description: Starting output tie number (X#)
    description: View all ties starting from output X#. Up to 16 ties displayed.

  - id: view_output_tie
    label: View Output Tie Status
    kind: query
    command: "X@ !"
    response: "OUT X@ •IN X! •ALL CR/LF"
    params:
      - name: output
        type: integer
        description: Output (receiver) number (X@)

  - id: break_all_ties
    label: Break All Ties
    kind: action
    command: "0*!"
    response: varies
    params: []
    description: Remove all existing input-output ties.

  - id: make_tie
    label: Make Tie
    kind: action
    command: "X! * X@ !"
    response: "OUT X@ •IN X! •ALL CR/LF"
    params:
      - name: input
        type: integer
        description: Input (transmitter) number (X!)
      - name: output
        type: integer
        description: Output (receiver) number (X@)
    description: Create a tie between input X! and output X@.

  - id: break_tie
    label: Break Tie
    kind: action
    command: "0* X! !"
    response: "OUT00•IN X! •ALL CR/LF"
    params:
      - name: input
        type: integer
        description: Input (transmitter) number (X!)

  - id: set_clear_ties_on_startup
    label: Set Clear Ties on Startup
    kind: action
    command: "ESC CLEAR* X2@ CR"
    response: "CLEAR* X2@ CR/LF"
    params:
      - name: setting
        type: integer
        values: [0, 1]
        description: "0 = do not clear ties at startup, 1 = clear ties at startup"

  - id: view_clear_ties_on_startup
    label: View Clear Ties on Startup
    kind: query
    command: "ESC CLEARVC CR"
    response: "CLEAR* X2@ CR/LF"
    params: []

  - id: set_healing_behavior
    label: Set Healing Behavior
    kind: action
    command: "ESC HEALING* X* CR"
    response: "HEAL X* CR/LF"
    params:
      - name: behavior
        type: integer
        values: [0, 1]
        description: "0 = untie (ties not restored to replacement extender), 1 = maintain existing ties (restore ties to replacement)"
    description: Set system behavior when a USB Extender Plus is replaced.

  - id: view_healing_behavior
    label: View Healing Behavior
    kind: query
    command: "ESC HEALVC CR"
    response: "HEAL X* CR/LF"
    params: []

  - id: force_healing_check
    label: Force Healing Check
    kind: action
    command: "ESC HEALNOW CR"
    response: "FORCED CR/LF"
    params: []
    description: Force the system to perform a healing process.

  - id: set_global_timeout
    label: Set Global Timeout
    kind: action
    command: "ESC 1* X1( TC CR"
    response: "Pti1* X1( CR/LF"
    params:
      - name: timeout
        type: integer
        description: "Timeout in 10-second increments. Range 1 (10s) through 6500 (65000s). Default 30 (300s)."

  - id: view_global_timeout
    label: View Global Timeout
    kind: query
    command: "ESC 1TC CR"
    response: "Pti1* X1( CR/LF"
    params: []

  - id: view_input_connection_status
    label: View Input Connection Status
    kind: query
    command: "ESC CONNI CR"
    response: "CONNI X%[1] X%[2] ... X%[N] CR/LF"
    params: []
    description: "View connection status of all USB Plus inputs. X%: 0=offline, 1=online, -=not configured."

  - id: view_output_connection_status
    label: View Output Connection Status
    kind: query
    command: "ESC CONNO CR"
    response: "CONNO X%[1] X%[2] ... X%[N] CR/LF"
    params: []
    description: "View connection status of all USB Plus outputs. X%: 0=offline, 1=online, -=not configured."

  - id: view_extender_input_name
    label: View Extender Input Name
    kind: query
    command: "ESC ENAME*I* X! CR"
    response: "ENAME*I* X! * X2! CR/LF"
    params:
      - name: input
        type: integer
        description: Input (transmitter) number (X!)

  - id: view_extender_output_name
    label: View Extender Output Name
    kind: query
    command: "ESC ENAME*O* X@ CR"
    response: "ENAME*O* X@ * X2! CR/LF"
    params:
      - name: output
        type: integer
        description: Output (receiver) number (X@)
```

## Feedbacks
```yaml
feedbacks:
  - id: firmware_version
    label: Firmware Version
    type: string
    query_command: "Q"
    response: "Ver01* X$ CR/LF"

  - id: part_number
    label: Software Part Number
    type: string
    query_command: "N"
    response: "Pno56-002-000001 CR/LF"

  - id: matrix_size
    label: Matrix Input/Output Size
    type: string
    query_command: "I"
    response: "Info00*USB X2# * X2$ CR/LF"
    description: "X2# = input size, X2$ = output size"

  - id: serial_port_parameters
    label: Serial Port Parameters
    type: string
    query_command: "ESC 1CP CR"
    response: "Cpn001•Ccp X1@, X1#, X1$, X1% CR/LF"
    description: "Returns baud rate, parity, data bits, stop bits."

  - id: ip_address
    label: IP Address
    type: string
    query_command: "ESC CI CR"
    response: "Ipi• X1^ CR/LF"

  - id: mac_address
    label: MAC Address
    type: string
    query_command: "ESC CH CR"
    response: "Iph• X1& CR/LF"

  - id: tcp_connection_count
    label: TCP Connection Count
    type: integer
    query_command: "ESC CC CR"
    response: "Icc X1! CR/LF"
    description: Three-digit zero-padded response.

  - id: hostname
    label: Hostname
    type: string
    query_command: "ESC CN CR"
    response: "Ipn• X1* CR/LF"

  - id: controller_time
    label: Controller Time
    type: string
    query_command: "ESC CT CR"
    response: "Ipt• X2% CR/LF"
    description: "Format: Www, DD Mmm yyyy HH:MM:SS"
```

## Variables
```yaml
# UNRESOLVED: no continuous variable ranges (volume, gain, brightness) found in source
```

## Events
```yaml
events:
  - id: input_status_changed
    label: Input Status Changed
    unsolicited: true
    response_format: "CONNI X! * X^ CR/LF"
    description: "Unsolicited. Fired when an input extender changes connection status. X^: 0=offline, 1=online, 2=unknown device."

  - id: output_status_changed
    label: Output Status Changed
    unsolicited: true
    response_format: "CONNO X@ * X^ CR/LF"
    description: "Unsolicited. Fired when an output extender changes connection status. X^: 0=offline, 1=online, 2=unknown device."

  - id: healed_endpoint
    label: Healed Endpoint
    unsolicited: true
    response_format: "HEALED* X% * X( CR/LF"
    description: "Unsolicited. Fired after healing occurs. X%: connection status, X(: endpoint number."
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures found in source
```

## Notes
- Minimum 300 ms between SIS commands required for reliable execution.
- When using a third-party controller, changes (such as ties) can take up to 10 seconds to take effect or be reflected in PCS.
- The controller is locked to verbose mode 3 — all query responses are broadcast to all connected TCP clients and serial port.
- Each transmitter can be tied to no more than four receivers at a time.
- Upper- and lowercase text can be used interchangeably in commands (unless otherwise stated).
- Error codes: E01 (invalid input), E10 (invalid command), E12 (invalid output), E13 (invalid value), E14 (invalid command for config), E95 (config file missing), E96 (transmitter offline), E97 (receiver offline), E98 (max receivers tied), E99 (no config loaded).
- Port 22022 provides user-space access for CSV file and SFTP.
- All responses from controller end with CR/LF.

<!-- UNRESOLVED: exact ASCII byte encoding for ESC character in SIS commands not specified (assumed 0x1B) -->
<!-- UNRESOLVED: maximum matrix input/output size not stated — source only shows example with T1–T4 / R1–R4 -->
<!-- UNRESOLVED: save-configuration command ASCII string not in command table (X1) result code defined but command syntax missing) -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/usb_plus_matrix_cntrlr_68-3056-50_K.pdf
  - https://www.extron.com/product/usbextenderplus
  - https://media.extron.com/public/download/files/userman/matrix100all-man.pdf
  - https://www.extron.com/download/files/userman/fox3_matrix_series_68-2987-01_G.pdf
  - https://www.extron.com/article/tech92
retrieved_at: 2026-05-15T01:49:11.123Z
last_checked_at: 2026-10-07T12:57:37.167Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:57:37.167Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 action units match source SIS commands with correct shapes, transport values are supported, and the spec covers the full 26-command catalogue. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "maximum matrix size (input/output count) not explicitly stated — only example shows 4x4"
- "USB Extender Plus firmware compatibility range not stated"
- "no continuous variable ranges (volume, gain, brightness) found in source"
- "no multi-step macro sequences described in source"
- "no explicit safety warnings or interlock procedures found in source"
- "exact ASCII byte encoding for ESC character in SIS commands not specified (assumed 0x1B)"
- "maximum matrix input/output size not stated — source only shows example with T1–T4 / R1–R4"
- "save-configuration command ASCII string not in command table (X1) result code defined but command syntax missing)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
