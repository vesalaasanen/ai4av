---
spec_id: admin/aurora-dxcihdmi1g3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Aurora Dxcihdmi1G3 Control Spec"
manufacturer: Aurora
model_family: Dxcihdmi1G3
aliases: []
compatible_with:
  manufacturers:
    - Aurora
  models:
    - Dxcihdmi1G3
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.avprosupply.com
source_urls:
  - https://files.avprosupply.com/files/attachments/11777/aurora-multimedia-dxm-88-g3-103484-manual.pdf
retrieved_at: 2026-07-03T19:54:56.265Z
last_checked_at: 2026-07-07T11:02:06.204Z
generated_at: 2026-07-07T11:02:06.204Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact matrix size (number of inputs/outputs) for the Dxcihdmi1G3 card not explicitly stated; command syntax implies up to 16 ports"
  - "flow control not stated in source"
  - "default TCP port not explicitly stated (example shows TcpPort:1001 but as a settable value, not the default)"
  - "complete list of unsolicited event types not enumerated in source."
  - "no multi-step sequences described in source."
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "default TCP/Telnet control port not explicitly stated (TcpPort example value 1001 not confirmed as default)."
  - "Telnet authentication procedure not described (web UI creds do not apply to control path)."
  - "exact card port count for Dxcihdmi1G3 not stated; syntax supports up to 16 ports."
  - "firmware query parameter semantics (?FMOUTC uses 'C' suffix) not explained in source."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:02:06.204Z
  matched_actions: 38
  action_count: 38
  confidence: medium
  summary: "All 38 spec actions matched literally in source with correct parameter shapes; bidirectional coverage complete. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-03
---

# Aurora Dxcihdmi1G3 Control Spec

## Summary
The Aurora Dxcihdmi1G3 is an HDBaseT/HDMI matrix card in the DXM G3 series. This spec covers control via the main RS-232 serial port and LAN Telnet control. The device routes HDMI/HDBaseT inputs to outputs (up to 16x16), supports presets, per-port serial pass-through, HDCP negotiation, and network/serial configuration commands.

<!-- UNRESOLVED: exact matrix size (number of inputs/outputs) for the Dxcihdmi1G3 card not explicitly stated; command syntax implies up to 16 ports -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source states recommended baud rate is 115k
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
addressing:
  port: null  # UNRESOLVED: default TCP port not explicitly stated (example shows TcpPort:1001 but as a settable value, not the default)
auth:
  type: none  # inferred: no serial/Telnet auth procedure in source (web server has user/123456, but that is the web UI, not the control path)
```

## Traits
```yaml
traits:
  - routable   # inferred: route command !Rxtoz present
  - queryable  # inferred: many query commands (? prefix) present
```

## Actions
```yaml
# Commands use: ! = command, ? = query, ~ = response. <CR> = 0x0D.
# Wait >= 250ms between commands (firmware 2.2.6 and above).
- id: route
  label: Route Input to Output
  kind: action
  command: "!Rxtoz<CR>"
  params:
    - name: x
      type: integer
      description: "input port number (0-16; 0 = unroute)"
    - name: z
      type: string
      description: "output port number(s) 1-16, comma-separated for multiple (e.g. 1,4,5)"
- id: preset_recall
  label: Recall Preset
  kind: action
  command: "!Px<CR>"
  params:
    - name: x
      type: integer
      description: "preset number 1-9"
- id: preset_save
  label: Save Preset
  kind: action
  command: "!Sx<CR>"
  params:
    - name: x
      type: integer
      description: "preset number 1-9"
- id: baud_rate_setup_input
  label: Set Input Card Baud Rate
  kind: action
  command: "!BRabINx<CR>"
  params:
    - name: a
      type: enum
      description: "baud rate: 2400, 4800, 9600, 19200, 38400"
    - name: b
      type: enum
      description: "bits/parity/stop: 8N1, 8E1, 8O1"
    - name: x
      type: string
      description: "port number(s) 1-16, space-separated for multiple"
- id: baud_rate_setup_output
  label: Set Output Card Baud Rate
  kind: action
  command: "!BRabOUTx<CR>"
  params:
    - name: a
      type: enum
      description: "baud rate: 2400, 4800, 9600, 19200, 38400"
    - name: b
      type: enum
      description: "bits/parity/stop: 8N1, 8E1, 8O1"
    - name: x
      type: string
      description: "port number(s) 1-16, space-separated for multiple"
- id: serial_input_port_receive
  label: Set Input Card Serial Receive
  kind: action
  command: "!RXaINx<CR>"
  params:
    - name: a
      type: enum
      description: "OFF or ON"
    - name: x
      type: string
      description: "port number(s) 1-16, space-separated for multiple"
- id: serial_output_port_receive
  label: Set Output Card Serial Receive
  kind: action
  command: "!RXaOUTx<CR>"
  params:
    - name: a
      type: enum
      description: "OFF or ON"
    - name: x
      type: string
      description: "port number(s) 1-16, space-separated for multiple"
- id: serial_transmit_input
  label: Serial Transmit to Input Port
  kind: action
  command: "!RSINxTXnns<CR>"
  params:
    - name: x
      type: string
      description: "port number(s) 1-16, space-separated for multiple"
    - name: nn
      type: string
      description: "byte count 00-99, double-digit ASCII (zero-padded); %0D hex counts as 1 byte"
    - name: s
      type: string
      description: "ASCII string; non-printable via URL-encoded (%0D) or 0x0D hex"
- id: serial_transmit_output
  label: Serial Transmit to Output Port
  kind: action
  command: "!RSOUTxTXnns<CR>"
  params:
    - name: x
      type: string
      description: "port number(s) 1-16, space-separated for multiple"
    - name: nn
      type: string
      description: "byte count 00-99, double-digit ASCII (zero-padded)"
    - name: s
      type: string
      description: "ASCII string; non-printable via URL-encoded (%0D) or 0x0D hex"
- id: hdcp_input_negotiation
  label: Set HDCP Input Negotiation
  kind: action
  command: "!HDCPyINx<CR>"
  params:
    - name: y
      type: enum
      description: "A = normal HDCP operation; W = HDCP disabled"
    - name: x
      type: string
      description: "port number(s) 1-16, space-separated for multiple"
- id: hdcp_forced_output
  label: Set HDCP Forced Output
  kind: action
  command: "!HDCPyOUTx<CR>"
  params:
    - name: y
      type: enum
      description: "A = output HDCP follows routed input; W = force HDCP on for faster switching"
    - name: x
      type: string
      description: "port number(s) 1-16, space-separated for multiple"
- id: set_ip_address
  label: Set MCU IP Address
  kind: action
  command: "!IP:x<CR>"
  params:
    - name: x
      type: string
      description: "IP address in form xxx.xxx.xxx.xxx"
- id: set_subnet_mask
  label: Set MCU Subnet Mask
  kind: action
  command: "!Mask:x<CR>"
  params:
    - name: x
      type: string
      description: "subnet mask in form xxx.xxx.xxx.xxx"
- id: set_gateway
  label: Set MCU Gateway
  kind: action
  command: "!Gate:x<CR>"
  params:
    - name: x
      type: string
      description: "gateway in form xxx.xxx.xxx.xxx"
- id: set_tcp_port
  label: Set MCU TCP Port
  kind: action
  command: "!TcpPort:x<CR>"
  params:
    - name: x
      type: integer
      description: "TCP port number"
- id: set_tcp_protocol
  label: Set TCP Server or Client
  kind: action
  command: "!TcpProtocol:x<CR>"
  params:
    - name: x
      type: enum
      description: "Server or Client"
- id: set_main_baudrate
  label: Set Main RS232 Baud Rate
  kind: action
  command: "!MBaud:x<CR>"
  params:
    - name: x
      type: enum
      description: "9600, 19200, 38400, 57600, 115200"
- id: set_main_data_bits
  label: Set Main RS232 Data Bits
  kind: action
  command: "!MDBits:x<CR>"
  params:
    - name: x
      type: enum
      description: "7 or 8"
- id: set_main_stop_bits
  label: Set Main RS232 Stop Bits
  kind: action
  command: "!MSBits:x<CR>"
  params:
    - name: x
      type: enum
      description: "1 or 2"
- id: set_main_parity
  label: Set Main RS232 Parity
  kind: action
  command: "!MParity:x<CR>"
  params:
    - name: x
      type: enum
      description: "None, Even, Odd"
- id: query_hot_plug
  label: Query Hot Plug
  kind: query
  command: "?HPx<CR>"
  params:
    - name: x
      type: enum
      description: "IN or OUT"
- id: query_input_card_baud_rate
  label: Query Input Card Baud Rate
  kind: query
  command: "?BRINx<CR>"
  params:
    - name: x
      type: string
      description: "port number(s) 1-16, space-separated for multiple"
- id: query_output_card_baud_rate
  label: Query Output Card Baud Rate
  kind: query
  command: "?BROUTx<CR>"
  params:
    - name: x
      type: string
      description: "port number(s) 1-16, space-separated for multiple"
- id: query_input_card_serial_receive
  label: Query Input Card Serial Receive
  kind: query
  command: "?RXINx<CR>"
  params:
    - name: x
      type: string
      description: "port number(s) 1-16, space-separated for multiple"
- id: query_output_card_serial_receive
  label: Query Output Card Serial Receive
  kind: query
  command: "?RXOUTx<CR>"
  params:
    - name: x
      type: string
      description: "port number(s) 1-16, space-separated for multiple"
- id: query_firmware_input_card
  label: Query Firmware Input Card
  kind: query
  command: "?FMINx<CR>"
  params:
    - name: x
      type: integer
      description: "port number 1-4"
- id: query_firmware_output_card
  label: Query Firmware Output Card
  kind: query
  command: "?FMOUTCx<CR>"
  params:
    - name: x
      type: integer
      description: "port number 1-4"
- id: query_firmware_main_processor
  label: Query Firmware Main Processor
  kind: query
  command: "?FM0<CR>"
  params: []
- id: query_input_route
  label: Query Input Route
  kind: query
  command: "?RINx<CR>"
  params:
    - name: x
      type: integer
      description: "port number 1-16; response lists multiple outputs space-separated if input routed to more than one output"
- id: query_ip_address
  label: Query MCU IP Address
  kind: query
  command: "?IP<CR>"
  params: []
- id: query_subnet_mask
  label: Query Subnet Mask
  kind: query
  command: "?Mask<CR>"
  params: []
- id: query_gateway
  label: Query Gateway
  kind: query
  command: "?Gate<CR>"
  params: []
- id: query_tcp_port
  label: Query TCP Port
  kind: query
  command: "?TcpPort<CR>"
  params: []
- id: query_tcp_protocol
  label: Query TCP Server or Client
  kind: query
  command: "?TcpProtocol<CR>"
  params: []
- id: query_main_baudrate
  label: Query Main RS232 Baud Rate
  kind: query
  command: "?MBaud<CR>"
  params: []
- id: query_main_data_bits
  label: Query Main RS232 Data Bits
  kind: query
  command: "?MDBits<CR>"
  params: []
- id: query_main_stop_bits
  label: Query Main RS232 Stop Bits
  kind: query
  command: "?MSBits<CR>"
  params: []
- id: query_main_parity
  label: Query Main RS232 Parity
  kind: query
  command: "?MParity<CR>"
  params: []
```

## Feedbacks
```yaml
# Responses use ~ prefix, same case as the command, terminated by <CR>.
- id: route_response
  type: string
  description: "Echo of route command, e.g. ~R5to1,2,3,4<CR>"
- id: preset_response
  type: string
  description: "Echo of preset command, e.g. ~P2<CR>"
- id: preset_save_response
  type: string
  description: "Echo of preset-save command, e.g. ~S5<CR>"
- id: baud_rate_setup_input_response
  type: string
  description: "Echo of input baud setup, e.g. ~BR96008N1IN1<CR>"
- id: baud_rate_setup_output_response
  type: string
  description: "Echo of output baud setup, e.g. ~BR192008N1OUT1 3 5 13<CR>"
- id: serial_receive_input_response
  type: string
  description: "Echo of input receive toggle, e.g. ~RXOFFIN11 15<CR>"
- id: serial_receive_output_response
  type: string
  description: "Echo of output receive toggle, e.g. ~RXONOUT11 15<CR>"
- id: serial_transmit_input_response
  type: string
  description: "Echo of input serial transmit, e.g. ~RSIN1 3 12TX04123%0D<CR>"
- id: serial_transmit_output_response
  type: string
  description: "Echo of output serial transmit, e.g. ~RSOUT1 3 12TX04123%0D<CR>"
- id: hot_plug_response
  type: string
  description: "Hot-plug query response, e.g. ~HPIN1000010000<CR>"
- id: serial_passthrough_report
  type: string
  description: "Unsolicited serial pass-through from DXW wall plate, e.g. ~RSIN1TX05~BP1<CR><CR>"
```

## Variables
```yaml
# Settable parameters covered by dedicated set commands above (baud, data/stop/parity bits,
# IP/mask/gateway, TCP port, TCP protocol). No additional settable variables beyond those actions.
```

## Events
```yaml
# Unsolicited serial pass-through events arrive as ~RSIN{x}TX{nn}{string} when a connected
# wall plate (e.g. DXW-2) sends data. Example: ~RSIN1TX05~BP1<CR><CR>.
# UNRESOLVED: complete list of unsolicited event types not enumerated in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements stated in source.
```

## Notes
- Command/query/response markers: `!` = command, `?` = query, `~` = response. Case sensitive. Queries/commands share case with their response.
- `<CR>` = carriage return (0x0D / decimal 13).
- Timing: wait at least 250ms between commands (firmware 2.2.6 and above).
- Serial pass-through byte count `nn` must be double-digit ASCII, zero-padded (e.g. 04). Hex via URL-encoding (`%0D`) counts as 1 byte; some systems use `0x0D` instead.
- RS-232 connector: DB-9 Female. Pin 2 = TX, Pin 3 = RX, Pin 5 = GND.
- LAN: 10/100 Mbps, RJ-45. Default IP 192.168.2.175, default subnet 255.255.255.0. Web server default credentials: user `user` / password `123456` (web UI only).
- Main RS-232 config is selectable via front panel; recommended 115200 8N1.

<!-- UNRESOLVED: default TCP/Telnet control port not explicitly stated (TcpPort example value 1001 not confirmed as default). -->
<!-- UNRESOLVED: Telnet authentication procedure not described (web UI creds do not apply to control path). -->
<!-- UNRESOLVED: exact card port count for Dxcihdmi1G3 not stated; syntax supports up to 16 ports. -->
<!-- UNRESOLVED: firmware query parameter semantics (?FMOUTC uses 'C' suffix) not explained in source. -->

---

## Provenance

```yaml
source_domains:
  - files.avprosupply.com
source_urls:
  - https://files.avprosupply.com/files/attachments/11777/aurora-multimedia-dxm-88-g3-103484-manual.pdf
retrieved_at: 2026-07-03T19:54:56.265Z
last_checked_at: 2026-07-07T11:02:06.204Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:02:06.204Z
matched_actions: 38
action_count: 38
confidence: medium
summary: "All 38 spec actions matched literally in source with correct parameter shapes; bidirectional coverage complete. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact matrix size (number of inputs/outputs) for the Dxcihdmi1G3 card not explicitly stated; command syntax implies up to 16 ports"
- "flow control not stated in source"
- "default TCP port not explicitly stated (example shows TcpPort:1001 but as a settable value, not the default)"
- "complete list of unsolicited event types not enumerated in source."
- "no multi-step sequences described in source."
- "no safety warnings, interlock procedures, or power-on sequencing"
- "default TCP/Telnet control port not explicitly stated (TcpPort example value 1001 not confirmed as default)."
- "Telnet authentication procedure not described (web UI creds do not apply to control path)."
- "exact card port count for Dxcihdmi1G3 not stated; syntax supports up to 16 ports."
- "firmware query parameter semantics (?FMOUTC uses 'C' suffix) not explained in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
