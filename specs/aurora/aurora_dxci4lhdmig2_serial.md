---
spec_id: admin/aurora-dxci4lhdmig2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Aurora Dxci4Lhdmig2 Control Spec"
manufacturer: Aurora
model_family: Dxci4Lhdmig2
aliases: []
compatible_with:
  manufacturers:
    - Aurora
  models:
    - Dxci4Lhdmig2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ia601801.us.archive.org
  - archive.org
source_urls:
  - https://ia601801.us.archive.org/17/items/manualzilla-id-5649919/5649919.pdf
  - https://archive.org/download/manualzz-id-864145/864145.pdf
retrieved_at: 2026-07-01T04:41:58.526Z
last_checked_at: 2026-07-07T11:02:05.411Z
generated_at: 2026-07-07T11:02:05.411Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "LAN port documented as \"Future Use\" — no TCP/IP control documented. Firmware version compatibility not stated beyond v2.2.6 timing note. Power on/off control not documented."
  - "flow control not stated in source"
  - "no continuous-level parameters (volume/gain/brightness) documented in source."
  - "no other unsolicited notification types documented in source."
  - "no multi-step sequences explicitly documented in source."
  - "source contains no safety warnings, interlock procedures, or"
  - "flow_control not stated. Power on/off control absent from source — matrix power management not documented. Default/factory baud rate before front-panel selection not stated (115200 8N1 is \"recommended\"). Error/fault behavior and recovery sequences not documented."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:02:05.411Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 spec commands matched literally in source; transport parameters (115200 8N1) verified; full bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Aurora Dxci4Lhdmig2 Control Spec

## Summary
Aurora DXM G2 Series HDMI matrix router controlled via RS-232C serial. Supports input-to-output routing, presets, per-port baud configuration, serial pass-through transmit/receive, HDCP/DVI/hot-plug output mode control, and firmware/route/status queries. Main control port is RS-232 (DB-9 female); recommended serial config is 115200 8N1.

<!-- UNRESOLVED: LAN port documented as "Future Use" — no TCP/IP control documented. Firmware version compatibility not stated beyond v2.2.6 timing note. Power on/off control not documented. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200  # source: "Recommended baud rate is 115k 8N1" / "Max 115kbps"
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable   # inferred: route commands present (!Rxtoz, !RTx1 x2 x3)
- queryable  # inferred: query commands present (?BRIN, ?R, ?FM0, etc.)
```

## Actions
```yaml
# Protocol notes: commands prefixed "!" = command, "?" = query (case sensitive).
# All command strings terminate with <CR> (0x0D). Responses prefixed "~" echo the
# command in same case. Wait >= 250ms between commands (firmware v2.2.6+).
# Port numbers x = 1-32 unless noted; multiple ports separated by space.

- id: route_input_to_outputs
  label: Route Input To Outputs
  kind: action
  command: "!Rxtoz<CR>"
  params:
    - name: x
      type: integer
      description: "Input port number 0-32 (0 = unroute)"
    - name: z
      type: string
      description: "Output port number(s) 1-32; comma-separated for multiple (e.g. 1,4,5)"

- id: route_outputs_to_inputs
  label: Route Outputs To Inputs (Positional)
  kind: action
  command: "!RTx1 x2 x3<CR>"
  params:
    - name: ports
      type: string
      description: "Space-separated input port numbers; one position per output in order (0=unroute, X=ignore). 8x8=8 positions, 16x16=16 positions, 32x32=32 positions"

- id: preset_recall
  label: Preset Recall
  kind: action
  command: "!Px<CR>"
  params:
    - name: x
      type: integer
      description: "Preset number 1-9"

- id: preset_save
  label: Preset Save
  kind: action
  command: "!Sx<CR>"
  params:
    - name: x
      type: integer
      description: "Preset number 1-9"

- id: set_baud_rate_input
  label: Set Baud Rate (Input Port)
  kind: action
  command: "!BRabINx<CR>"
  params:
    - name: a
      type: string
      description: "Baud rate: 2400, 4800, 9600, 19200, 38400"
    - name: b
      type: string
      description: "Bits/parity/stop: 8N1, 8E1, 8O1"
    - name: x
      type: string
      description: "Port number(s) 1-32; multiple ports space-separated"

- id: set_baud_rate_output
  label: Set Baud Rate (Output Port)
  kind: action
  command: "!BRabOUTx<CR>"
  params:
    - name: a
      type: string
      description: "Baud rate: 2400, 4800, 9600, 19200, 38400"
    - name: b
      type: string
      description: "Bits/parity/stop: 8N1, 8E1, 8O1"
    - name: x
      type: string
      description: "Port number(s) 1-32; multiple ports space-separated"

- id: serial_receive_input
  label: Serial Input Card Port Receive Enable/Disable
  kind: action
  command: "!RXaINx<CR>"
  params:
    - name: a
      type: string
      description: "OFF or ON"
    - name: x
      type: string
      description: "Port number(s) 1-32; multiple ports space-separated"

- id: serial_receive_output
  label: Serial Output Card Port Receive Enable/Disable
  kind: action
  command: "!RXaOUTx<CR>"
  params:
    - name: a
      type: string
      description: "OFF or ON"
    - name: x
      type: string
      description: "Port number(s) 1-32; multiple ports space-separated"

- id: serial_transmit_input
  label: Serial Transmit (Input Port)
  kind: action
  command: "!RSINxTXnns<CR>"
  params:
    - name: x
      type: string
      description: "Port number(s) 1-32; multiple ports space-separated"
    - name: nn
      type: string
      description: "Byte count 00-99, two ASCII digits (zero-padded). Hex escape counts as 1 byte."
    - name: s
      type: string
      description: "ASCII string; may contain non-printable chars. Aurora uses URL-encoded hex (e.g. %0D = 0x0D). Other systems may use 0x0D form."

- id: serial_transmit_output
  label: Serial Transmit (Output Port)
  kind: action
  command: "!RSOUTxTXnns<CR>"
  params:
    - name: x
      type: string
      description: "Port number(s) 1-32; multiple ports space-separated"
    - name: nn
      type: string
      description: "Byte count 00-99, two ASCII digits (zero-padded). Hex escape counts as 1 byte."
    - name: s
      type: string
      description: "ASCII string; may contain non-printable chars. Aurora uses URL-encoded hex (e.g. %0D = 0x0D)."

- id: dvi_output_force_on
  label: DVI Output Mode Force On
  kind: action
  command: "!DVIONx<CR>"
  params:
    - name: x
      type: string
      description: "Port number(s) 1-32; multiple ports space-separated"

- id: dvi_output_auto
  label: DVI Output Mode Auto
  kind: action
  command: "!DVIOFFx<CR>"
  params:
    - name: x
      type: string
      description: "Port number(s) 1-32; multiple ports space-separated"

- id: hot_plug_output_auto
  label: Hot Plug Output Auto
  kind: action
  command: "!HPONx<CR>"
  params:
    - name: x
      type: string
      description: "Port number(s) 1-32; multiple ports space-separated"

- id: hot_plug_output_force_off
  label: Hot Plug Output Force Off
  kind: action
  command: "!HPOFFx<CR>"
  params:
    - name: x
      type: string
      description: "Port number(s) 1-32; multiple ports space-separated"

- id: hdcp_forced_on
  label: HDCP Forced ON
  kind: action
  command: "!HDCPFONx<CR>"
  params:
    - name: x
      type: string
      description: "Port number(s) 1-32; multiple ports space-separated"

- id: hdcp_forced_off
  label: HDCP Forced OFF
  kind: action
  command: "!HDCPFOFFx<CR>"
  params:
    - name: x
      type: string
      description: "Port number(s) 1-32; multiple ports space-separated"

- id: query_input_baud_rate
  label: Query Input Card Baud Rate
  kind: query
  command: "?BRINx<CR>"
  params:
    - name: x
      type: string
      description: "Port number(s) 1-32; multiple ports space-separated"

- id: query_output_baud_rate
  label: Query Output Card Baud Rate
  kind: query
  command: "?BROUTx<CR>"
  params:
    - name: x
      type: string
      description: "Port number(s) 1-32; multiple ports space-separated"

- id: query_input_serial_receive
  label: Query Input Card Serial Receive
  kind: query
  command: "?RXINx<CR>"
  params:
    - name: x
      type: string
      description: "Port number(s) 1-32; multiple ports space-separated"

- id: query_output_serial_receive
  label: Query Output Card Serial Receive
  kind: query
  command: "?RXOUTx<CR>"
  params:
    - name: x
      type: string
      description: "Port number(s) 1-32; multiple ports space-separated"

- id: query_firmware_input_port
  label: Query Firmware Input Port
  kind: query
  command: "?FMINPx<CR>"
  params:
    - name: x
      type: integer
      description: "Port number 1-32. HDBaseT cards only; does not work on analog cards."

- id: query_firmware_input_card
  label: Query Firmware Input Card
  kind: query
  command: "?FMINCx<CR>"
  params:
    - name: x
      type: integer
      description: "Card number 1-8"

- id: query_firmware_output_port
  label: Query Firmware Output Port
  kind: query
  command: "?FMOUTPx<CR>"
  params:
    - name: x
      type: integer
      description: "Port number 1-32. HDBaseT cards only; does not work on analog cards."

- id: query_firmware_output_card
  label: Query Firmware Output Card
  kind: query
  command: "?FMOUTCx<CR>"
  params:
    - name: x
      type: integer
      description: "Card number 1-8"

- id: query_firmware_main
  label: Query Firmware Main Processor
  kind: query
  command: "?FM0<CR>"
  params: []

- id: query_input_route
  label: Query Input Route
  kind: query
  command: "?Rx<CR>"
  params:
    - name: x
      type: integer
      description: "Input port number 1-32. Response lists all outputs separated by space if routed to multiple."
```

## Feedbacks
```yaml
# Responses use "~" prefix and echo the command string in the same case as sent.
# All responses terminate with <CR>.

- id: route_response
  type: string
  description: "Echo of route command, e.g. ~R5to1,2,3,4<CR> or ~RT5 10 3 ... <CR>"

- id: preset_response
  type: string
  description: "Echo of preset command, e.g. ~P2<CR> or ~S5<CR>"

- id: baud_rate_set_response
  type: string
  description: "Echo of baud setup command, e.g. ~BR96008N1IN1<CR>"

- id: serial_receive_response
  type: string
  description: "Echo of receive enable/disable command, e.g. ~RXOFFIN11 15<CR>"

- id: baud_rate_query_response
  type: string
  values: ["~BR{baud}{bps}IN{x}", "~BR{baud}{bps}OUT{x}"]
  description: "Baud rate query response per port, e.g. ~BR384008N1IN1<CR>. One response line per port queried."

- id: serial_receive_query_response
  type: enum
  values: ["ON", "OFF"]
  description: "Receive state per port, e.g. ~RXIN1ON<CR>, ~RXIN5OFF<CR>"

- id: firmware_response
  type: string
  description: "Firmware version string, e.g. ~FMIN1-2.0.0<CR>, ~FMOUTC1-2.0.0<CR>, ~FM0-2.0.0<CR>"

- id: input_route_response
  type: string
  description: "Route mapping, e.g. ~R13to2,9,26<CR> (outputs space-separated when multiple)"

- id: serial_pass_through_response
  type: string
  description: "Unsolicited serial data from attached device, wrapped as ~RS{x}TX{nn}{s}<CR> where x=input port, nn=byte count, s=payload string"
```

## Variables
```yaml
# UNRESOLVED: no continuous-level parameters (volume/gain/brightness) documented in source.
# Baud rate per port is settable via discrete command but is a configuration value, not a runtime level.
```

## Events
```yaml
# Unsolicited serial pass-through: when an attached DXW-2 wall plate (or other serial
# device) sends data via a receive-enabled input port, the matrix forwards it wrapped:
# ~RSIN{x}TX{nn}{s}<CR>
# Example: ~RSIN1TX05~BP1<CR><CR>  (button 1 press on DXW-2 at input 1)
# UNRESOLVED: no other unsolicited notification types documented in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
- Command prefix `!` = command, `?` = query, `~` = response (all case sensitive — response matches command case).
- `<CR>` = carriage return (0x0D / decimal 13). Terminates all commands and responses.
- **Timing:** wait at least 250ms between commands (firmware v2.2.6 and above).
- Baud rate selectable via front panel menu and via `!BRab...` commands; per-port configuration supported on input and output cards independently.
- Serial pass-through: byte count `nn` must be two ASCII digits (zero-padded); hex escapes (`%0D` in Aurora URL-encoded form, or `0x0D` on other systems) count as 1 byte.
- DB-9 female connector: pin 2 = TX, pin 3 = RX, pin 5 = GND.
- LAN port documented as "Future Use" — if LAN needed, source recommends Nugget Serial on the RS-232 port.
- Firmware query commands do not work on analog cards.

<!-- UNRESOLVED: flow_control not stated. Power on/off control absent from source — matrix power management not documented. Default/factory baud rate before front-panel selection not stated (115200 8N1 is "recommended"). Error/fault behavior and recovery sequences not documented. -->

## Provenance

```yaml
source_domains:
  - ia601801.us.archive.org
  - archive.org
source_urls:
  - https://ia601801.us.archive.org/17/items/manualzilla-id-5649919/5649919.pdf
  - https://archive.org/download/manualzz-id-864145/864145.pdf
retrieved_at: 2026-07-01T04:41:58.526Z
last_checked_at: 2026-07-07T11:02:05.411Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:02:05.411Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 spec commands matched literally in source; transport parameters (115200 8N1) verified; full bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "LAN port documented as \"Future Use\" — no TCP/IP control documented. Firmware version compatibility not stated beyond v2.2.6 timing note. Power on/off control not documented."
- "flow control not stated in source"
- "no continuous-level parameters (volume/gain/brightness) documented in source."
- "no other unsolicited notification types documented in source."
- "no multi-step sequences explicitly documented in source."
- "source contains no safety warnings, interlock procedures, or"
- "flow_control not stated. Power on/off control absent from source — matrix power management not documented. Default/factory baud rate before front-panel selection not stated (115200 8N1 is \"recommended\"). Error/fault behavior and recovery sequences not documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
