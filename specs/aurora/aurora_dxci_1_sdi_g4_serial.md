---
spec_id: admin/aurora-dxci-1-sdi-g4
schema_version: ai4av-public-spec-v1
revision: 1
title: "Aurora Dxci 1 Sdi G4 Control Spec"
manufacturer: Aurora
model_family: "Aurora Dxci 1 Sdi G4"
aliases: []
compatible_with:
  manufacturers:
    - Aurora
  models:
    - "Aurora Dxci 1 Sdi G4"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - web.archive.org
source_urls:
  - https://web.archive.org/web/2018/https://auroramultimedia.com/assets/2016/05/DXM-G3-Series-Users-Guide-160515.pdf
retrieved_at: 2026-07-01T05:33:46.441Z
last_checked_at: 2026-07-07T11:00:12.224Z
generated_at: 2026-07-07T11:00:12.224Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is titled \"DXM G3 Series\" rear-panel / serial commands; exact model match to Dxci 1 Sdi G4 not confirmed in source text."
  - "default TCP control port not explicitly stated; flow control not stated; firmware compatibility range not stated."
  - "flow control not stated in source (the \"O\" in \"115200-8-1-N-O\" denotes RX on, not flow control)"
  - "default TCP port not explicitly stated; 1001 appears in !TcpPort command example and is user-configurable"
  - "no continuous variables (volume/gain/brightness) documented in source."
  - "no multi-step sequences described explicitly in source."
  - "no safety warnings, interlock procedures, or power-on sequencing requirements stated in source."
  - "source text references \"DXM G3 Series\" rear panel and DXW-2 wall plate; model correspondence to \"Dxci 1 Sdi G4\" not explicitly stated in source."
  - "default TCP control port not stated (1001 only in example); flow control not stated; firmware version compatibility range not stated."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:00:12.224Z
  matched_actions: 38
  action_count: 38
  confidence: medium
  summary: "All 38 spec actions matched literally against source table; baud/parity/stop-bit/protocol transport parameters verified; one-to-one command coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Aurora Dxci 1 Sdi G4 Control Spec

## Summary
Aurora Dxci 1 Sdi G4 SDI matrix/router controlled via RS-232 (main control port) or LAN via Telnet. Spec covers the serial/Telnet ASCII command set: input-to-output routing, presets, per-port serial and HDCP configuration, IP/TCP settings, main RS-232 setup, and status queries. Commands use `!` prefix (action), `?` prefix (query), `~` prefix (response), each terminated by `<CR>` (0x0D).

<!-- UNRESOLVED: source document is titled "DXM G3 Series" rear-panel / serial commands; exact model match to Dxci 1 Sdi G4 not confirmed in source text. -->
<!-- UNRESOLVED: default TCP control port not explicitly stated; flow control not stated; firmware compatibility range not stated. -->

## Transport
```yaml
# Source documents RS-232 as "Main Control Port" and LAN "via Telnet commands".
# Same ASCII command set applies to both interfaces.
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # recommended per source ("Recommended baud rate is 115k 8N1"); example 115200-8-1-N-O; configurable, max 115kbps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (the "O" in "115200-8-1-N-O" denotes RX on, not flow control)
addressing:
  port: null  # UNRESOLVED: default TCP port not explicitly stated; 1001 appears in !TcpPort command example and is user-configurable
  base_url: null  # N/A for serial/Telnet
auth:
  type: none  # inferred: no auth procedure documented for RS-232/Telnet control interface (web server has separate user/123456 creds)
```

## Traits
```yaml
# - routable   (input->output route command !Rxtoz present)
# - queryable  (many ? queries returning state present)
traits:
  - routable
  - queryable
```

## Actions
```yaml
# All 38 distinct command-bearing rows from SERIAL COMMANDS table.
# `!` = action command, `?` = query command (kind: query). Each terminated by <CR> (0x0D).
# Timing: wait >= 250ms between commands (firmware v2.2.6 and above).

# --- Action commands (!) ---

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
      description: "output port number(s) (1-16); comma-separated for multiple, e.g. 1,4,5"

- id: preset_recall
  label: Recall Preset
  kind: action
  command: "!Px<CR>"
  params:
    - name: x
      type: integer
      description: "preset number (1-9)"

- id: preset_save
  label: Save Preset
  kind: action
  command: "!Sx<CR>"
  params:
    - name: x
      type: integer
      description: "preset number (1-9)"

- id: baud_rate_setup_input
  label: Set Input Card Baud Rate
  kind: action
  command: "!BRabINx<CR>"
  params:
    - name: a
      type: string
      description: "baud rate (2400, 4800, 9600, 19200, 38400)"
    - name: b
      type: string
      description: "bits/parity/stop (8N1, 8E1, 8O1)"
    - name: x
      type: string
      description: "input port number(s) (1-16), space-separated for multiple"

- id: baud_rate_setup_output
  label: Set Output Card Baud Rate
  kind: action
  command: "!BRabOUTx<CR>"
  params:
    - name: a
      type: string
      description: "baud rate (2400, 4800, 9600, 19200, 38400)"
    - name: b
      type: string
      description: "bits/parity/stop (8N1, 8E1, 8O1)"
    - name: x
      type: string
      description: "output port number(s) (1-16), space-separated for multiple"

- id: serial_rx_input
  label: Set Input Card Serial Receive
  kind: action
  command: "!RXaINx<CR>"
  params:
    - name: a
      type: string
      description: "OFF or ON"
    - name: x
      type: string
      description: "input port number(s) (1-16), space-separated for multiple"

- id: serial_rx_output
  label: Set Output Card Serial Receive
  kind: action
  command: "!RXaOUTx<CR>"
  params:
    - name: a
      type: string
      description: "OFF or ON"
    - name: x
      type: string
      description: "output port number(s) (1-16), space-separated for multiple"

- id: serial_transmit_input
  label: Serial Transmit to Input Port
  kind: action
  command: "!RSINxTXnns<CR>"
  params:
    - name: x
      type: string
      description: "input port number(s) (1-16), space-separated for multiple"
    - name: nn
      type: string
      description: "byte count for string (00-99), double-digit ASCII, leading zero required"
    - name: s
      type: string
      description: "ASCII string; non-printable chars allowed (URL-encoded, e.g. %0D = 0x0D counts as 1 byte)"

- id: serial_transmit_output
  label: Serial Transmit to Output Port
  kind: action
  command: "!RSOUTxTXnns<CR>"
  params:
    - name: x
      type: string
      description: "output port number(s) (1-16), space-separated for multiple"
    - name: nn
      type: string
      description: "byte count for string (00-99), double-digit ASCII, leading zero required"
    - name: s
      type: string
      description: "ASCII string; non-printable chars allowed (URL-encoded, e.g. %0D = 0x0D counts as 1 byte)"

- id: hdcp_input_negotiation
  label: Set HDCP Input Negotiation
  kind: action
  command: "!HDCPyINx<CR>"
  params:
    - name: y
      type: string
      description: "A = normal HDCP operation; W = HDCP disabled"
    - name: x
      type: string
      description: "input port number(s) (1-16), space-separated for multiple"

- id: hdcp_forced_output
  label: Set HDCP Forced Output
  kind: action
  command: "!HDCPyOUTx<CR>"
  params:
    - name: y
      type: string
      description: "A = output HDCP follows routed input; W = force HDCP on for faster switching"
    - name: x
      type: string
      description: "output port number(s) (1-16), space-separated for multiple"

- id: set_ip_address
  label: Set Main MCU IP Address
  kind: action
  command: "!IP:x<CR>"
  params:
    - name: x
      type: string
      description: "IP address in form xxx.xxx.xxx.xxx"

- id: set_subnet_mask
  label: Set Main MCU Subnet Mask
  kind: action
  command: "!Mask:x<CR>"
  params:
    - name: x
      type: string
      description: "subnet mask in form xxx.xxx.xxx.xxx"

- id: set_gateway
  label: Set Main MCU Gateway
  kind: action
  command: "!Gate:x<CR>"
  params:
    - name: x
      type: string
      description: "gateway in form xxx.xxx.xxx.xxx"

- id: set_tcp_port
  label: Set Main MCU TCP Port
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
      type: string
      description: "Server or Client"

- id: set_main_baud
  label: Set Main RS-232 Baud Rate
  kind: action
  command: "!MBaud:x<CR>"
  params:
    - name: x
      type: integer
      description: "baud rate (9600, 19200, 38400, 57600, 115200)"

- id: set_main_data_bits
  label: Set Main RS-232 Data Bits
  kind: action
  command: "!MDBits:x<CR>"
  params:
    - name: x
      type: integer
      description: "7 or 8"

- id: set_main_stop_bits
  label: Set Main RS-232 Stop Bits
  kind: action
  command: "!MSBits:x<CR>"
  params:
    - name: x
      type: integer
      description: "1 or 2"

- id: set_main_parity
  label: Set Main RS-232 Parity
  kind: action
  command: "!MParity:x<CR>"
  params:
    - name: x
      type: string
      description: "None, Even, or Odd"

# --- Query commands (?) ---

- id: query_hot_plug
  label: Query Hot Plug
  kind: query
  command: "?HPx<CR>"
  params:
    - name: x
      type: string
      description: "IN or OUT"

- id: query_input_card_baud
  label: Query Input Card Baud Rate
  kind: query
  command: "?BRINx<CR>"
  params:
    - name: x
      type: string
      description: "input port number(s) (1-16), space-separated for multiple"

- id: query_output_card_baud
  label: Query Output Card Baud Rate
  kind: query
  command: "?BROUTx<CR>"
  params:
    - name: x
      type: string
      description: "output port number(s) (1-16), space-separated for multiple"

- id: query_input_card_serial_rx
  label: Query Input Card Serial Receive
  kind: query
  command: "?RXINx<CR>"
  params:
    - name: x
      type: string
      description: "input port number(s) (1-16), space-separated for multiple"

- id: query_output_card_serial_rx
  label: Query Output Card Serial Receive
  kind: query
  command: "?RXOUTx<CR>"
  params:
    - name: x
      type: string
      description: "output port number(s) (1-16), space-separated for multiple"

- id: query_firmware_input_card
  label: Query Firmware Input Card
  kind: query
  command: "?FMINx<CR>"
  params:
    - name: x
      type: integer
      description: "port number (1-4)"

- id: query_firmware_output_card
  label: Query Firmware Output Card
  kind: query
  command: "?FMOUTCx<CR>"
  params:
    - name: x
      type: integer
      description: "port number (1-4)"

- id: query_firmware_main
  label: Query Firmware Main Processor
  kind: query
  command: "?FM0<CR>"
  params: []
  notes: "0 is default for main processor firmware query"

- id: query_input_route
  label: Query Input Route
  kind: query
  command: "?RINx<CR>"
  params:
    - name: x
      type: integer
      description: "input port number (1-16); response lists all outputs the input is routed to (space-separated)"

- id: query_ip_address
  label: Query Main MCU IP Address
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

- id: query_main_baud
  label: Query Main RS-232 Baud Rate
  kind: query
  command: "?MBaud<CR>"
  params: []

- id: query_main_data_bits
  label: Query Main RS-232 Data Bits
  kind: query
  command: "?MDBits<CR>"
  params: []

- id: query_main_stop_bits
  label: Query Main RS-232 Stop Bits
  kind: query
  command: "?MSBits<CR>"
  params: []

- id: query_main_parity
  label: Query Main RS-232 Parity
  kind: query
  command: "?MParity<CR>"
  params: []
```

## Feedbacks
```yaml
# Device echoes each successful command back as a response using ~ prefix, same case as command (e.g. !R5to1,2,3,4 -> ~R5to1,2,3,4).

- id: command_ack
  type: string
  description: "Echo of issued command with ~ prefix and same case; confirms command received/executed"

- id: hot_plug_state
  type: string
  description: "Response to ?HPIN/<CR>; per-port hot-plug state as digit string, e.g. ~HPIN1000010000<CR>"
```

## Variables
```yaml
# No settable continuous parameters beyond the discrete actions above.
# UNRESOLVED: no continuous variables (volume/gain/brightness) documented in source.
```

## Events
```yaml
# Unsolicited: serial strings received on input/output card ports are forwarded to the main RS-232 bus when that port's RX is ON, framed as ~RS{x}TX{nn}{string}<CR>. Example from DXW-2 wall plate button press: ~RSIN1TX05~BP1<CR>.

- id: serial_port_receive_forward
  type: string
  description: "Forwarded serial receive from a card port; format ~RS{IN|OUT}{ports}TX{bytecount}{string}<CR>"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements stated in source.
```

## Notes
- Command prefix convention: `!` = action command, `?` = query command, `~` = response. All case-sensitive. All responses mirror the case of the issued command.
- Every command/query terminated by `<CR>` (carriage return, hex 0x0D / decimal 13).
- **Timing:** wait at least 250ms between commands on firmware v2.2.6 and above.
- RS-232 connector: DB-9 Female. Pin 2 = TX, Pin 3 = RX, Pin 5 = GND.
- Recommended serial config 115200 8N1; main RS-232 params (baud/data/stop/parity) are runtime-configurable via front panel or the `!MBits`/`!MSBits`/`!MParity`/`!MBaud` commands. Max baud 115kbps.
- Card-level RS-232 baud/format independently configurable per input/output port via `!BR...INx` / `!BR...OUTx`.
- Default web-server IP 192.168.2.175, subnet 255.255.255.0, web login user/`123456`. These are web-server credentials, separate from the control interface (which has no documented auth).
- Serial transmit byte count (`nn`) must be double-digit ASCII with leading zero; URL-encoded hex (e.g. `%0D`) counts as a single byte toward the count.

<!-- UNRESOLVED: source text references "DXM G3 Series" rear panel and DXW-2 wall plate; model correspondence to "Dxci 1 Sdi G4" not explicitly stated in source. -->
<!-- UNRESOLVED: default TCP control port not stated (1001 only in example); flow control not stated; firmware version compatibility range not stated. -->

## Provenance

```yaml
source_domains:
  - web.archive.org
source_urls:
  - https://web.archive.org/web/2018/https://auroramultimedia.com/assets/2016/05/DXM-G3-Series-Users-Guide-160515.pdf
retrieved_at: 2026-07-01T05:33:46.441Z
last_checked_at: 2026-07-07T11:00:12.224Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:00:12.224Z
matched_actions: 38
action_count: 38
confidence: medium
summary: "All 38 spec actions matched literally against source table; baud/parity/stop-bit/protocol transport parameters verified; one-to-one command coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is titled \"DXM G3 Series\" rear-panel / serial commands; exact model match to Dxci 1 Sdi G4 not confirmed in source text."
- "default TCP control port not explicitly stated; flow control not stated; firmware compatibility range not stated."
- "flow control not stated in source (the \"O\" in \"115200-8-1-N-O\" denotes RX on, not flow control)"
- "default TCP port not explicitly stated; 1001 appears in !TcpPort command example and is user-configurable"
- "no continuous variables (volume/gain/brightness) documented in source."
- "no multi-step sequences described explicitly in source."
- "no safety warnings, interlock procedures, or power-on sequencing requirements stated in source."
- "source text references \"DXM G3 Series\" rear panel and DXW-2 wall plate; model correspondence to \"Dxci 1 Sdi G4\" not explicitly stated in source."
- "default TCP control port not stated (1001 only in example); flow control not stated; firmware version compatibility range not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
