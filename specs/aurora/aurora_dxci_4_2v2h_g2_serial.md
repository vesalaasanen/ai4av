---
spec_id: admin/aurora-dxci-4-2v2h-g2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Aurora Dxci 4 2V2H G2 Control Spec"
manufacturer: Aurora
model_family: "Dxci 4 2V2H G2"
aliases: []
compatible_with:
  manufacturers:
    - Aurora
  models:
    - "Dxci 4 2V2H G2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ia601801.us.archive.org
source_urls:
  - https://ia601801.us.archive.org/17/items/manualzilla-id-5649919/5649919.pdf
retrieved_at: 2026-07-04T19:32:10.788Z
last_checked_at: 2026-07-07T11:00:13.049Z
generated_at: 2026-07-07T11:00:13.049Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source is the DXM G2 chassis manual excerpt, not a Dxci-specific document. The card itself has no independent command set; all commands are chassis-level and apply to whatever ports the card occupies. Card-specific electrical/voltage specs not present in this excerpt."
  - "flow control not stated in source"
  - "none applicable."
  - "required spacing for firmware below 2.2.6 not stated."
  - "electrical/voltage/power specs for the card not present in this excerpt. Firmware query commands do not function on analog cards (card analog/digital classification not stated for Dxci). Exact default main-port baud rate (only 'recommended 115k' stated). Flow control not specified."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:00:13.049Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 spec actions matched exactly in source; bidirectional coverage confirmed; transport parameters verified. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-04
---

# Aurora Dxci 4 2V2H G2 Control Spec

## Summary
The Dxci 4 2V2H G2 is a 4-input AV input card (2× VGA + 2× HDMI) for the Aurora DXM G2 Series matrix chassis. It has no standalone control interface; it is driven over the chassis main RS-232 control port. This spec documents the RS-232 serial command set of the parent DXM G2 chassis that governs this card (routing, presets, per-port serial pass-through, HDCP, hot-plug, DVI mode, baud configuration, and firmware/route queries).

<!-- UNRESOLVED: Source is the DXM G2 chassis manual excerpt, not a Dxci-specific document. The card itself has no independent command set; all commands are chassis-level and apply to whatever ports the card occupies. Card-specific electrical/voltage specs not present in this excerpt. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200  # source states "Recommended baud rate is 115k 8N1"; selectable via front panel. Max 115kbps.
  data_bits: 8  # from "8N1"
  parity: none  # from "8N1"
  stop_bits: 1  # from "8N1"
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - routable  # inferred: route command examples present (!Rxtoz, !RTx1 x2 x3)
  - queryable  # inferred: query commands returning state present (?BR, ?RX, ?FM, ?R)
```

## Actions
```yaml
actions:
  - id: route_input_to_outputs
    label: Route Input to Multiple Outputs
    kind: action
    command: "!Rxtoz<cr>"
    params:
      - name: x
        type: integer
        description: "Input port number (0-32; 0 = unroute)"
      - name: z
        type: string
        description: "Output port number(s) 1-32; comma-separated for multiple (e.g. 1,4,5)"

  - id: route_outputs_to_inputs
    label: Route Outputs to Inputs (Whole-Matrix)
    kind: action
    command: "!RTx1 x2 x3<cr>"
    params:
      - name: ports
        type: string
        description: "Ordered list of input numbers (0-32; 0=unroute, X=ignore), one per output position. 8x8 needs 8 positions, 16x16 needs 16, 32x32 needs 32. Space-separated (e.g. '5 10 3 4 7 3 9 13 16 11 X X X X X X')"

  - id: preset_recall
    label: Preset Recall
    kind: action
    command: "!Px<cr>"
    params:
      - name: x
        type: integer
        description: "Preset number (1-9)"

  - id: preset_save
    label: Preset Save
    kind: action
    command: "!Sx<cr>"
    params:
      - name: x
        type: integer
        description: "Preset number (1-9)"

  - id: baud_rate_setup_input
    label: Baud Rate Setup (Input Card Serial Ports)
    kind: action
    command: "!BRabINx<cr>"
    params:
      - name: a
        type: integer
        description: "Baud rate (2400, 4800, 9600, 19200, 38400)"
      - name: b
        type: string
        description: "Bits/parity/stop (8N1, 8E1, 8O1)"
      - name: x
        type: string
        description: "Input port number(s) 1-32, space-separated for multiple"

  - id: baud_rate_setup_output
    label: Baud Rate Setup (Output Card Serial Ports)
    kind: action
    command: "!BRabOUTx<cr>"
    params:
      - name: a
        type: integer
        description: "Baud rate (2400, 4800, 9600, 19200, 38400)"
      - name: b
        type: string
        description: "Bits/parity/stop (8N1, 8E1, 8O1)"
      - name: x
        type: string
        description: "Output port number(s) 1-32, space-separated for multiple"

  - id: serial_input_port_receive_set
    label: Serial Input Card Port Receive On/Off
    kind: action
    command: "!RXaINx<cr>"
    params:
      - name: a
        type: string
        description: "OFF or ON"
      - name: x
        type: string
        description: "Input port number(s) 1-32, space-separated for multiple. Disabling limits traffic on main RS-232."

  - id: serial_output_port_receive_set
    label: Serial Output Card Port Receive On/Off
    kind: action
    command: "!RXaOUTx<cr>"
    params:
      - name: a
        type: string
        description: "OFF or ON"
      - name: x
        type: string
        description: "Output port number(s) 1-32, space-separated for multiple. Disabling limits traffic on main RS-232."

  - id: serial_transmit_input
    label: Serial Transmit (Input Card Port)
    kind: action
    command: "!RSINxTXnns<CR>"
    params:
      - name: x
        type: string
        description: "Input port number(s) 1-32, space-separated for multiple"
      - name: nn
        type: integer
        description: "Byte count for string (00-99), double-digit ASCII, leading zero for single digits"
      - name: s
        type: string
        description: "ASCII string; may include non-printable ASCII. Aurora control system uses URL-encoded hex (e.g. %0D = 0x0D, counts as 1 byte). Other systems may use 0x0D form."

  - id: serial_transmit_output
    label: Serial Transmit (Output Card Port)
    kind: action
    command: "!RSOUTxTXnns<CR>"
    params:
      - name: x
        type: string
        description: "Output port number(s) 1-32, space-separated for multiple"
      - name: nn
        type: integer
        description: "Byte count for string (00-99), double-digit ASCII, leading zero for single digits"
      - name: s
        type: string
        description: "ASCII string; may include non-printable ASCII. Aurora control system uses URL-encoded hex (e.g. %0D = 0x0D, counts as 1 byte). Other systems may use 0x0D form."

  - id: dvi_output_mode_force_on
    label: DVI Output Mode Force On
    kind: action
    command: "!DVIONx<CR>"
    params:
      - name: x
        type: string
        description: "Output port number(s) 1-32, space-separated for multiple"

  - id: dvi_output_mode_auto
    label: DVI Output Mode Auto
    kind: action
    command: "!DVIOFFx<CR>"
    params:
      - name: x
        type: string
        description: "Output port number(s) 1-32, space-separated for multiple"

  - id: hotplug_output_auto
    label: Hot Plug Output Auto
    kind: action
    command: "!HPONx<CR>"
    params:
      - name: x
        type: string
        description: "Output port number(s) 1-32, space-separated for multiple"

  - id: hotplug_output_force_off
    label: Hot Plug Output Force Off
    kind: action
    command: "!HPOFFx<CR>"
    params:
      - name: x
        type: string
        description: "Output port number(s) 1-32, space-separated for multiple"

  - id: hdcp_forced_on
    label: HDCP Forced On
    kind: action
    command: "!HDCPFONx<CR>"
    params:
      - name: x
        type: string
        description: "Output port number(s) 1-32, space-separated for multiple. HDCP is forced on regardless of routed input; forced on by default."
    notes: "HDCP is forced on by default."

  - id: hdcp_forced_off
    label: HDCP Forced Off
    kind: action
    command: "!HDCPFOFFx<CR>"
    params:
      - name: x
        type: string
        description: "Output port number(s) 1-32, space-separated for multiple. Output carries HDCP only if the routed input has HDCP; otherwise HDCP is off."
    notes: "When forced off, HDCP output follows the routed input's HDCP state."

  - id: query_input_card_baud_rate
    label: Query Input Card Baud Rate
    kind: query
    command: "?BRINx<cr>"
    params:
      - name: x
        type: string
        description: "Input port number(s) 1-32, space-separated for multiple"

  - id: query_output_card_baud_rate
    label: Query Output Card Baud Rate
    kind: query
    command: "?BROUTx<cr>"
    params:
      - name: x
        type: string
        description: "Output port number(s) 1-32, space-separated for multiple"

  - id: query_input_card_serial_receive
    label: Query Input Card Serial Receive
    kind: query
    command: "?RXINx<cr>"
    params:
      - name: x
        type: string
        description: "Input port number(s) 1-32, space-separated for multiple"

  - id: query_output_card_serial_receive
    label: Query Output Card Serial Receive
    kind: query
    command: "?RXOUTx<cr>"
    params:
      - name: x
        type: string
        description: "Output port number(s) 1-32, space-separated for multiple"

  - id: query_firmware_input_port
    label: Query Firmware Input Port (RS-232 / HDBaseT cards only)
    kind: query
    command: "?FMINPx<cr>"
    params:
      - name: x
        type: integer
        description: "Input port number (1-32). Only works for HDBaseT cards."

  - id: query_firmware_input_card
    label: Query Firmware Input Card
    kind: query
    command: "?FMINCx<cr>"
    params:
      - name: x
        type: integer
        description: "Input card number (1-8)"

  - id: query_firmware_output_port
    label: Query Firmware Output Port (RS-232 / HDBaseT cards only)
    kind: query
    command: "?FMOUTPx<cr>"
    params:
      - name: x
        type: integer
        description: "Output port number (1-32). Only works for HDBaseT cards."

  - id: query_firmware_output_card
    label: Query Firmware Output Card
    kind: query
    command: "?FMOUTCx<cr>"
    params:
      - name: x
        type: integer
        description: "Output card number (1-8)"

  - id: query_firmware_main_processor
    label: Query Firmware Main Processor
    kind: query
    command: "?FM0<cr>"
    params: []
    notes: "0 is default for main processor firmware query."

  - id: query_input_route
    label: Query Input Route
    kind: query
    command: "?Rx<cr>"
    params:
      - name: x
        type: integer
        description: "Input port number (1-32). If input is routed to multiple outputs, response lists all output ports separated by a space."
```

## Feedbacks
```yaml
feedbacks:
  - id: command_ack
    type: string
    description: "Echo acknowledgement of an executed ! command. All responses are prefixed with ~ and returned in the same case as the command. e.g. '~R5to1,2,3,4<cr>', '~P2<cr>', '~S5<cr>', '~BR96008N1IN1<cr>', '~RSIN1 3 12TX04123%0D<CR>'"

  - id: route_state
    type: string
    description: "Result of ?Rx query. e.g. '~R13to2,9,26<cr>' means input 13 routed to outputs 2, 9, 26."

  - id: baud_rate_input_state
    type: string
    description: "Result of ?BRINx. e.g. '~BR384008N1IN1<cr>'"

  - id: baud_rate_output_state
    type: string
    description: "Result of ?BROUTx. e.g. '~BR96008N1OUT4<cr>'"

  - id: serial_receive_input_state
    type: enum
    values: [ON, OFF]
    description: "Result of ?RXINx. e.g. '~RXIN1ON <cr>', '~RXIN5OFF<cr>'"

  - id: serial_receive_output_state
    type: enum
    values: [ON, OFF]
    description: "Result of ?RXOUTx. e.g. '~RXOUT1ON<cr>'"

  - id: firmware_input_port_state
    type: string
    description: "Result of ?FMINPx. e.g. '~FMIN1-2.0.0<cr>'"

  - id: firmware_input_card_state
    type: string
    description: "Result of ?FMINCx. e.g. '~FMINC1-2.0.0<cr>'"

  - id: firmware_output_port_state
    type: string
    description: "Result of ?FMOUTPx. e.g. '~FMOUT1-2.0.0<cr>'"

  - id: firmware_output_card_state
    type: string
    description: "Result of ?FMOUTCx. e.g. '~FMOUTC1-2.0.0<cr>'"

  - id: firmware_main_processor_state
    type: string
    description: "Result of ?FM0. e.g. '~FM0-2.0.0<cr>'"
```

## Variables
```yaml
# No settable continuous parameters in source; all configuration is via discrete Actions above.
# UNRESOLVED: none applicable.
```

## Events
```yaml
events:
  - id: serial_port_receive
    type: string
    description: "Unsolicited data received on an input card serial pass-through port is forwarded to the main control port as '~RSINxTXnns<CR>'. Example from a DXW-2 wall plate button press: '~RSIN1TX05~BP1<cr><cr>' - '~RSIN1' = input 1 on matrix, 'TX05' = byte count (5) of the forwarded string '~BP1<cr>'."
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
# UNRESOLVED: none applicable.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# No interlock procedures or power-on sequencing requirements stated in source.
```

## Notes
- Command vs query convention: `!` = command (case sensitive), `?` = query command (case sensitive), `~` = response (same case as the command).
- `<CR>` / `<cr>` = carriage return (hex 0x0D / decimal 13). Commands echo this literally.
- Timing: wait at least 250ms between commands (firmware version 2.2.6 and above). For older firmware, longer spacing may be required. <!-- UNRESOLVED: required spacing for firmware below 2.2.6 not stated. -->
- RS-232 connector: DB-9 Female. Pin 2 = TX, Pin 3 = RX, Pin 5 = GND; all other pins N/A.
- Baud rate selectable via front panel; recommended/typical 115k 8N1 (max 115kbps). Per-card serial ports (input/output RS-232 pass-through) accept 2400–38400 only via `!BR...` commands.
- LAN port on rear panel is future-use; for LAN operation Aurora recommends using the Nugget Serial on the RS-232 port. No Ethernet control protocol documented.
- Scope caveat: this command set is the DXM G2 chassis protocol. The Dxci 4 2V2H G2 card occupies input card slots; card-specific analog/digital distinction affects firmware queries ("Firmware query commands do not work on analog cards").

<!-- UNRESOLVED: electrical/voltage/power specs for the card not present in this excerpt. Firmware query commands do not function on analog cards (card analog/digital classification not stated for Dxci). Exact default main-port baud rate (only 'recommended 115k' stated). Flow control not specified. -->

## Provenance

```yaml
source_domains:
  - ia601801.us.archive.org
source_urls:
  - https://ia601801.us.archive.org/17/items/manualzilla-id-5649919/5649919.pdf
retrieved_at: 2026-07-04T19:32:10.788Z
last_checked_at: 2026-07-07T11:00:13.049Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:00:13.049Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 spec actions matched exactly in source; bidirectional coverage confirmed; transport parameters verified. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source is the DXM G2 chassis manual excerpt, not a Dxci-specific document. The card itself has no independent command set; all commands are chassis-level and apply to whatever ports the card occupies. Card-specific electrical/voltage specs not present in this excerpt."
- "flow control not stated in source"
- "none applicable."
- "required spacing for firmware below 2.2.6 not stated."
- "electrical/voltage/power specs for the card not present in this excerpt. Firmware query commands do not function on analog cards (card analog/digital classification not stated for Dxci). Exact default main-port baud rate (only 'recommended 115k' stated). Flow control not specified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
