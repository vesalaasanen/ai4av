---
spec_id: admin/aurora-dxm1616g3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Aurora DXM1616G3 Control Spec"
manufacturer: Aurora
model_family: DXM1616G3
aliases: []
compatible_with:
  manufacturers:
    - Aurora
  models:
    - DXM1616G3
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.avprosupply.com
source_urls:
  - https://files.avprosupply.com/files/attachments/11776/aurora-multimedia-dxm-1616-g3-manual.pdf
retrieved_at: 2026-07-01T04:47:52.333Z
last_checked_at: 2026-07-07T11:04:02.501Z
generated_at: 2026-07-07T11:04:02.501Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "web server authentication uses default credentials (user/123456) but no login procedure is documented for RS-232 or Telnet control interfaces. Default TCP control port not explicitly stated (1001 appears only as command-template example)."
  - "flow control not stated in source"
  - "exact response format for ?RINx not shown verbatim in source"
  - "no separate continuous/level variables documented in source."
  - "no documented event for output-card serial passthrough as unsolicited"
  - "no multi-step sequences described in source."
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "default TCP/Telnet control port not explicitly stated (1001 appears only as command-template example)."
  - "main firmware version range and compatibility not stated (queryable via ?FM0)."
  - "exact verbatim response format for ?RINx route query not shown."
  - "flow_control not documented."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:04:02.501Z
  matched_actions: 38
  action_count: 38
  confidence: medium
  summary: "All 38 spec actions matched verbatim against source command table with correct parameter shapes and transport parameters verified. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Aurora DXM1616G3 Control Spec

## Summary
The Aurora DXM1616G3 is a 16×16 HDMI/HDBaseT matrix switcher from the DXM G3 Series. This spec covers RS-232C main control and LAN (Telnet/TCP) operation, including input-to-output routing, presets, per-port serial (RS-232) pass-through, HDCP negotiation, and main-MCU/network configuration commands.

<!-- UNRESOLVED: web server authentication uses default credentials (user/123456) but no login procedure is documented for RS-232 or Telnet control interfaces. Default TCP control port not explicitly stated (1001 appears only as command-template example). -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200    # recommended: "115k 8N1"; selectable 9600/19200/38400/57600/115200 via !MBaud
  data_bits: 8         # recommended; 7 or 8 via !MDBits
  parity: none         # recommended; None/Even/Odd via !MParity
  stop_bits: 1         # recommended; 1 or 2 via !MSBits
  flow_control: null   # UNRESOLVED: flow control not stated in source
addressing:
  port: 1001           # value shown in !TcpPort command template/example; not explicitly stated as default
auth:
  type: none  # inferred: no auth procedure described for RS-232 or Telnet control
```

## Traits
```yaml
# - routable    (route command !Rxtoz present)
# - queryable   (extensive ? query set present)
traits:
  - routable
  - queryable
```

## Actions
```yaml
actions:
  # --- Routing / Presets ---
  - id: route
    label: Route Input to Output
    kind: action
    command: "!Rxtoz<CR>"
    params:
      - name: x
        type: integer
        description: "Input port number 0-16 (0 = unroute)"
      - name: z
        type: string
        description: "Output port number(s) 1-16; comma-separate multiples (e.g. 1,4,5)"

  - id: preset_recall
    label: Recall Preset
    kind: action
    command: "!Px<CR>"
    params:
      - name: x
        type: integer
        description: "Preset number 1-9"

  - id: preset_save
    label: Save Preset
    kind: action
    command: "!Sx<CR>"
    params:
      - name: x
        type: integer
        description: "Preset number 1-9"

  # --- Per-Port Baud Rate Setup ---
  - id: set_input_baud
    label: Set Input Card Baud Rate
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
        description: "Input port number(s) 1-16; space-separate multiples"

  - id: set_output_baud
    label: Set Output Card Baud Rate
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
        description: "Output port number(s) 1-16; space-separate multiples"

  # --- Serial Card Receive Enable ---
  - id: set_input_serial_receive
    label: Set Input Card Serial Receive
    kind: action
    command: "!RXaINx<CR>"
    params:
      - name: a
        type: string
        description: "OFF or ON"
      - name: x
        type: string
        description: "Input port number(s) 1-16; space-separate multiples"

  - id: set_output_serial_receive
    label: Set Output Card Serial Receive
    kind: action
    command: "!RXaOUTx<CR>"
    params:
      - name: a
        type: string
        description: "OFF or ON"
      - name: x
        type: string
        description: "Output port number(s) 1-16; space-separate multiples"

  # --- Serial String Pass-through ---
  - id: serial_transmit_input
    label: Serial Transmit to Input Port
    kind: action
    command: "!RSINxTXnns<CR>"
    params:
      - name: x
        type: string
        description: "Input port number(s) 1-16; space-separate multiples"
      - name: nn
        type: string
        description: "Byte count 00-99 (double digit ASCII)"
      - name: s
        type: string
        description: "ASCII string (hex via %0D / 0x0D notation; hex counts as 1 byte)"

  - id: serial_transmit_output
    label: Serial Transmit to Output Port
    kind: action
    command: "!RSOUTxTXnns<CR>"
    params:
      - name: x
        type: string
        description: "Output port number(s) 1-16; space-separate multiples"
      - name: nn
        type: string
        description: "Byte count 00-99 (double digit ASCII)"
      - name: s
        type: string
        description: "ASCII string (hex via %0D / 0x0D notation; hex counts as 1 byte)"

  # --- HDCP ---
  - id: set_hdcp_input
    label: Set HDCP Input Negotiation
    kind: action
    command: "!HDCPyINx<CR>"
    params:
      - name: y
        type: string
        description: "A = normal HDCP operation; W = HDCP disabled"
      - name: x
        type: string
        description: "Input port number(s) 1-16; space-separate multiples"

  - id: set_hdcp_output
    label: Set HDCP Forced Output
    kind: action
    command: "!HDCPyOUTx<CR>"
    params:
      - name: y
        type: string
        description: "A = output HDCP follows routed input; W = force HDCP on always (faster switching)"
      - name: x
        type: string
        description: "Output port number(s) 1-16; space-separate multiples"

  # --- Main MCU Network Config ---
  - id: set_ip_address
    label: Set IP Address of Main MCU
    kind: action
    command: "!IP:x<CR>"
    params:
      - name: x
        type: string
        description: "IP address in form xxx.xxx.xxx.xxx"

  - id: set_subnet_mask
    label: Set Subnet Mask of Main MCU
    kind: action
    command: "!Mask:x<CR>"
    params:
      - name: x
        type: string
        description: "Subnet mask in form xxx.xxx.xxx.xxx"

  - id: set_gateway
    label: Set Gateway of Main MCU
    kind: action
    command: "!Gate:x<CR>"
    params:
      - name: x
        type: string
        description: "Gateway in form xxx.xxx.xxx.xxx"

  - id: set_tcp_port
    label: Set TCP Port of MCU
    kind: action
    command: "!TcpPort:1001<CR>"
    params:
      - name: x
        type: integer
        description: "Port number (1001 shown as example in source)"

  - id: set_tcp_protocol
    label: Set TCP Server or Client
    kind: action
    command: "!TcpProtocol:Server<CR>"
    params:
      - name: x
        type: string
        description: "Server or Client"

  # --- Main RS-232 Config ---
  - id: set_main_baud
    label: Set Main RS-232 Baud Rate
    kind: action
    command: "!MBaud:9600<CR>"
    params:
      - name: x
        type: integer
        description: "9600, 19200, 38400, 57600, 115200"

  - id: set_main_data_bits
    label: Set Main RS-232 Data Bits
    kind: action
    command: "!MDBits:8<CR>"
    params:
      - name: x
        type: integer
        description: "7 or 8"

  - id: set_main_stop_bits
    label: Set Main RS-232 Stop Bits
    kind: action
    command: "!MSBits:1<CR>"
    params:
      - name: x
        type: integer
        description: "1 or 2"

  - id: set_main_parity
    label: Set Main RS-232 Parity
    kind: action
    command: "!MParity:None<CR>"
    params:
      - name: x
        type: string
        description: "None, Even, Odd"

  # --- Queries ---
  - id: query_hot_plug
    label: Query Hot Plug
    kind: query
    command: "?HPx<CR>"
    params:
      - name: x
        type: string
        description: "IN or OUT"

  - id: query_input_baud
    label: Query Input Card Baud Rate
    kind: query
    command: "?BRINx<CR>"
    params:
      - name: x
        type: string
        description: "Input port number(s) 1-16; space-separate multiples"

  - id: query_output_baud
    label: Query Output Card Baud Rate
    kind: query
    command: "?BROUTx<CR>"
    params:
      - name: x
        type: string
        description: "Output port number(s) 1-16; space-separate multiples"

  - id: query_input_serial_receive
    label: Query Input Card Serial Receive
    kind: query
    command: "?RXINx<CR>"
    params:
      - name: x
        type: string
        description: "Input port number(s) 1-16; space-separate multiples"

  - id: query_output_serial_receive
    label: Query Output Card Serial Receive
    kind: query
    command: "?RXOUTx<CR>"
    params:
      - name: x
        type: string
        description: "Output port number(s) 1-16; space-separate multiples"

  - id: query_firmware_input_card
    label: Query Firmware Input Card
    kind: query
    command: "?FMINx<CR>"
    params:
      - name: x
        type: integer
        description: "Port number 1-4"

  - id: query_firmware_output_card
    label: Query Firmware Output Card
    kind: query
    command: "?FMOUTCx<CR>"
    params:
      - name: x
        type: integer
        description: "Port number 1-4"

  - id: query_firmware_main
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
        description: "Input port number 1-16 (response lists multiple outputs space-separated)"

  - id: query_ip_address
    label: Query IP Address of Main MCU
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
    label: Query TCP Port of MCU
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
    label: Query Main RS-232 Parity Bits
    kind: query
    command: "?MParity<CR>"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  # Responses use "~" prefix, same case as command, terminated by <CR>.
  - id: route_echo
    type: string
    description: "Ack on route: ~R{x}to{z}<CR> (echo of route command)"
    example: "~R5to1,2,3,4<CR>"

  - id: preset_echo
    type: string
    description: "Ack on preset recall: ~P{x}<CR>"
    example: "~P2<CR>"

  - id: preset_save_echo
    type: string
    description: "Ack on preset save: ~S{x}<CR>"
    example: "~S5<CR>"

  - id: baud_echo
    type: string
    description: "Ack on baud-rate set (input/output card): ~BR{a}{b}{IN|OUT}{x}<CR>"
    example: "~BR192008N1OUT1 3 5 13<CR>"

  - id: serial_receive_echo
    type: string
    description: "Ack on RX receive toggle: ~RX{a}{IN|OUT}{x}<CR>"
    example: "~RXONOUT11 15<CR>"

  - id: serial_transmit_echo
    type: string
    description: "Ack on serial transmit: ~RS{IN|OUT}{x}TX{nn}{s}<CR>"
    example: "~RSIN1 3 12TX04123%0D<CR>"

  - id: hot_plug_response
    type: string
    description: "Hot-plug query response, one digit per port (1=present, 0=absent)"
    example: "~HPIN1000010000<CR>"

  - id: input_route_response
    type: string
    description: "Lists output ports the queried input is routed to (space-separated if >1)"
  # UNRESOLVED: exact response format for ?RINx not shown verbatim in source
```

## Variables
```yaml
# All settable parameters are expressed as discrete actions (see Actions).
# UNRESOLVED: no separate continuous/level variables documented in source.
```

## Events
```yaml
events:
  - id: serial_input_passthrough
    type: unsolicited
    description: >
      Unsolicited serial string received on an input card is forwarded to the
      main RS-232/Telnet bus when that port's RX is ON. Format:
      ~RSIN{x}TX{nn}{string}<CR><CR>. Example from DXW-2 wall plate via input 1:
      ~RSIN1TX05~BP1<cr><cr>
  # UNRESOLVED: no documented event for output-card serial passthrough as unsolicited
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
# requirements documented in the control-relevant source excerpt.
```

## Notes
- **Command syntax markers:** `!` = command (case-sensitive), `?` = query (case-sensitive), `~` = response (same case as issued command).
- **Terminator:** `<CR>` = carriage return (0x0D / decimal 13). Terminate every command and response.
- **Command timing:** Wait at least **250 ms between commands** (firmware version 2.2.6 and above). Earlier firmware may require longer spacing.
- **Recommended main RS-232 config:** 115200 baud, 8N1 (selectable via front panel or `!MBaud` / `!MDBits` / `!MSBits` / `!MParity`). RS-232 connector is DB-9 Female (pin 2 = TX, pin 3 = RX, pin 5 = GND).
- **Serial pass-through strings:** Byte count `nn` must be double-digit ASCII (e.g. `04`). Aurora control systems use URL-encoded hex (e.g. `%0D` = 0x0D) and each hex escape counts as **1 byte** toward `nn`. Other systems may use `0x0D` notation.
- **Routing:** Input `0` means unroute. Multiple outputs comma-separated (e.g. `1,4,5`); multiple ports for card config commands are space-separated (e.g. `1 3 5 13`).
- **LAN:** 10/100 Mbps, 8P8C RJ-45. Operates via Telnet using the same command set. Default web-server IP 192.168.2.175, subnet 255.255.255.0.
- **Web server default credentials:** User ID `user`, Password `123456` (change before deployment). These apply to the web UI; no login is documented for RS-232 or Telnet.

<!-- UNRESOLVED: default TCP/Telnet control port not explicitly stated (1001 appears only as command-template example). -->
<!-- UNRESOLVED: main firmware version range and compatibility not stated (queryable via ?FM0). -->
<!-- UNRESOLVED: exact verbatim response format for ?RINx route query not shown. -->
<!-- UNRESOLVED: flow_control not documented. -->

## Provenance

```yaml
source_domains:
  - files.avprosupply.com
source_urls:
  - https://files.avprosupply.com/files/attachments/11776/aurora-multimedia-dxm-1616-g3-manual.pdf
retrieved_at: 2026-07-01T04:47:52.333Z
last_checked_at: 2026-07-07T11:04:02.501Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:04:02.501Z
matched_actions: 38
action_count: 38
confidence: medium
summary: "All 38 spec actions matched verbatim against source command table with correct parameter shapes and transport parameters verified. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "web server authentication uses default credentials (user/123456) but no login procedure is documented for RS-232 or Telnet control interfaces. Default TCP control port not explicitly stated (1001 appears only as command-template example)."
- "flow control not stated in source"
- "exact response format for ?RINx not shown verbatim in source"
- "no separate continuous/level variables documented in source."
- "no documented event for output-card serial passthrough as unsolicited"
- "no multi-step sequences described in source."
- "no safety warnings, interlock procedures, or power-on sequencing"
- "default TCP/Telnet control port not explicitly stated (1001 appears only as command-template example)."
- "main firmware version range and compatibility not stated (queryable via ?FM0)."
- "exact verbatim response format for ?RINx route query not shown."
- "flow_control not documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
