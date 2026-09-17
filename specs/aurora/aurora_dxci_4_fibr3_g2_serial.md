---
spec_id: admin/aurora-dxci-4-fibr3-g2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Aurora DXCI-4-FIBR3-G2 Control Spec"
manufacturer: Aurora
model_family: DXCI-4-FIBR3-G2
aliases: []
compatible_with:
  manufacturers:
    - Aurora
    - "Aurora Multimedia"
  models:
    - DXCI-4-FIBR3-G2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - api.auroramultimedia.com
source_urls:
  - https://api.auroramultimedia.com/assets/b8c75f0f-957a-4f15-ae86-80ed7d2076e0
retrieved_at: 2026-09-15T11:12:24.245Z
last_checked_at: 2026-09-15T22:16:17.200Z
generated_at: 2026-09-15T22:16:17.200Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "card-specific behaviors (e.g. fiber signal status, SFP diagnostics) are not documented in the source beyond standard routing"
  - "source states recommended baud 115200 but lists 2400/4800/9600/19200/38400 as selectable via !BRab... command; default/recommended documented as 115k 8N1"
  - "unsolicited DXW wall-plate button-press feedback format (e.g. ~RSIN1TX05~BP1<CR><CR>) is documented but card-specific relevance unclear"
  - "no discrete settable parameters beyond command-enum values"
  - "source documents unsolicited wall-plate button events (e.g. ~RSIN1TX05~BP1<CR><CR>)"
  - "source documents no explicit safety warnings, interlocks, or power-on sequencing for the FIBR3-G2 card"
  - "card-specific behavior (fiber link status, SFP module health, EDID handling) not documented in the chassis RS-232 command set surfaced here"
verification:
  verdict: verified
  checked_at: 2026-09-15T22:16:17.200Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions have literal command counterparts in the source command table; transport matches 115200 8N1 default. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-15
---

# Aurora DXCI-4-FIBR3-G2 Control Spec

## Summary
The DXCI-4-FIBR3-G2 is a fiber input card for the Aurora DXM G2 Series modular matrix chassis. The card has no native control interface of its own — all control flows through the parent DXM G2 chassis, which exposes an RS-232 main control port. This spec documents the chassis-level RS-232 protocol that drives the card.

<!-- UNRESOLVED: card-specific behaviors (e.g. fiber signal status, SFP diagnostics) are not documented in the source beyond standard routing -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source

# UNRESOLVED: source states recommended baud 115200 but lists 2400/4800/9600/19200/38400 as selectable via !BRab... command; default/recommended documented as 115k 8N1
```

## Traits
```yaml
- routable  # inferred from !Rxtoz, !RTx1 x2 x3 route commands
- queryable  # inferred from ?BR..., ?RX..., ?FM..., ?R... query commands
```

## Actions
```yaml
# Route commands
- id: route_input_to_outputs
  label: Route Input to Multiple Outputs
  kind: action
  command: "!R{input}to{outputs}<CR>"
  params:
    - name: input
      type: integer
      description: Input port number 0-32 (0 = unroute)
    - name: outputs
      type: string
      description: Output port number(s) 1-32, comma-separated (e.g. "1,4,5")

- id: route_outputs_to_inputs
  label: Assign Inputs to Outputs (matrix row)
  kind: action
  command: "!RT{x1} {x2} {x3} ...<CR>"
  params:
    - name: x_positions
      type: string
      description: Space-separated input number per output position. Must match matrix size (8 positions for 8x8, 16 for 16x16, 32 for 32x32). Use 0 to unroute, X to ignore.

- id: trigger_preset
  label: Trigger Preset
  kind: action
  command: "!P{preset}<CR>"
  params:
    - name: preset
      type: integer
      description: Preset number 1-9

- id: save_preset
  label: Save Current Configuration to Preset
  kind: action
  command: "!S{preset}<CR>"
  params:
    - name: preset
      type: integer
      description: Preset slot 1-9

# Baud rate setup
- id: set_input_baud
  label: Set Input Port Baud Rate
  kind: action
  command: "!BR{baud}{bps}IN{ports}<CR>"
  params:
    - name: baud
      type: string
      description: "Baud rate: 2400, 4800, 9600, 19200, 38400"
    - name: bps
      type: string
      description: "Bits/parity/stop: 8N1, 8E1, 8O1"
    - name: ports
      type: string
      description: Space-separated port numbers 1-32

- id: set_output_baud
  label: Set Output Port Baud Rate
  kind: action
  command: "!BR{baud}{bps}OUT{ports}<CR>"
  params:
    - name: baud
      type: string
      description: "Baud rate: 2400, 4800, 9600, 19200, 38400"
    - name: bps
      type: string
      description: "Bits/parity/stop: 8N1, 8E1, 8O1"
    - name: ports
      type: string
      description: Space-separated port numbers 1-32

# Serial port receive control
- id: set_serial_input_receive
  label: Serial Input Card Port Receive
  kind: action
  command: "!RX{state}IN{ports}<CR>"
  params:
    - name: state
      type: string
      description: "ON or OFF"
    - name: ports
      type: string
      description: Space-separated port numbers 1-32

- id: set_serial_output_receive
  label: Serial Output Card Port Receive
  kind: action
  command: "!RX{state}OUT{ports}<CR>"
  params:
    - name: state
      type: string
      description: "ON or OFF"
    - name: ports
      type: string
      description: Space-separated port numbers 1-32

# Serial transmit
- id: transmit_serial_input
  label: Serial Transmit to Input Ports
  kind: action
  command: "!RSIN{ports}TX{nn}{string}<CR>"
  params:
    - name: ports
      type: string
      description: Space-separated input port numbers 1-32
    - name: nn
      type: string
      description: 2-digit ASCII byte count 00-99 (hex chars count as 1 byte)
    - name: string
      type: string
      description: ASCII string; may include non-printable bytes via hex encoding

- id: transmit_serial_output
  label: Serial Transmit to Output Ports
  kind: action
  command: "!RSOUT{ports}TX{nn}{string}<CR>"
  params:
    - name: ports
      type: string
      description: Space-separated output port numbers 1-32
    - name: nn
      type: string
      description: 2-digit ASCII byte count 00-99
    - name: string
      type: string
      description: ASCII string; may include non-printable bytes via hex encoding

# Output mode / signal commands
- id: dvi_output_force_on
  label: DVI Output Mode Force On
  kind: action
  command: "!DVION{ports}<CR>"
  params:
    - name: ports
      type: string
      description: Space-separated output port numbers 1-32

- id: dvi_output_auto
  label: DVI Output Mode Auto
  kind: action
  command: "!DVIOFF{ports}<CR>"
  params:
    - name: ports
      type: string
      description: Space-separated output port numbers 1-32

- id: hot_plug_output_auto
  label: Hot Plug Output Auto
  kind: action
  command: "!HPON{ports}<CR>"
  params:
    - name: ports
      type: string
      description: Space-separated output port numbers 1-32

- id: hot_plug_output_force_off
  label: Hot Plug Output Force Off
  kind: action
  command: "!HPOFF{ports}<CR>"
  params:
    - name: ports
      type: string
      description: Space-separated output port numbers 1-32

- id: hdcp_force_on
  label: HDCP Force On
  kind: action
  command: "!HDCPFON{ports}<CR>"
  params:
    - name: ports
      type: string
      description: Space-separated output port numbers 1-32

- id: hdcp_force_off
  label: HDCP Force Off
  kind: action
  command: "!HDCPFOFF{ports}<CR>"
  params:
    - name: ports
      type: string
      description: Space-separated output port numbers 1-32

# Front panel
- id: front_keypad_lockout
  label: Front Keypad Lockout
  kind: action
  command: "!KL{state}<CR>"
  params:
    - name: state
      type: string
      description: "ON or OFF"

# Queries (kind: query)
- id: query_input_baud
  label: Query Input Card Baud Rate
  kind: query
  command: "?BRIN{ports}<CR>"
  params:
    - name: ports
      type: string
      description: Space-separated input port numbers 1-32

- id: query_output_baud
  label: Query Output Card Baud Rate
  kind: query
  command: "?BROUT{ports}<CR>"
  params:
    - name: ports
      type: string
      description: Space-separated output port numbers 1-32

- id: query_input_serial_receive
  label: Query Input Card Serial Receive
  kind: query
  command: "?RXIN{ports}<CR>"
  params:
    - name: ports
      type: string
      description: Space-separated input port numbers 1-32

- id: query_output_serial_receive
  label: Query Output Card Serial Receive
  kind: query
  command: "?RXOUT{ports}<CR>"
  params:
    - name: ports
      type: string
      description: Space-separated output port numbers 1-32

- id: query_firmware_input_port
  label: Query Firmware Input Port
  kind: query
  command: "?FMINP{port}<CR>"
  params:
    - name: port
      type: integer
      description: Input port 1-32 (HDBaseT cards only)

- id: query_firmware_input_card
  label: Query Firmware Input Card
  kind: query
  command: "?FMINC{card}<CR>"
  params:
    - name: card
      type: integer
      description: Card number 1-8

- id: query_firmware_output_port
  label: Query Firmware Output Port
  kind: query
  command: "?FMOUTP{port}<CR>"
  params:
    - name: port
      type: integer
      description: Output port 1-32 (HDBaseT cards only)

- id: query_firmware_output_card
  label: Query Firmware Output Card
  kind: query
  command: "?FMOUTC{card}<CR>"
  params:
    - name: card
      type: integer
      description: Card number 1-8

- id: query_firmware_main
  label: Query Main Processor Firmware
  kind: query
  command: "?FM0<CR>"
  params: []

- id: query_input_route
  label: Query Input Route
  kind: query
  command: "?R{port}<CR>"
  params:
    - name: port
      type: integer
      description: Input port 1-32
```

## Feedbacks
```yaml
# Responses mirror commands with leading "~" and trailing <CR>.
# Examples from source:
#   ~R5to1,2,3,4<CR>
#   ~RT5 10 3 4 7 3 9 13 16 11 X X X X X X<CR>
#   ~BR96008N1IN1<CR>
#   ~RXOFFIN11 15<CR>
#   ~FM0-2.0.0<CR>

- id: route_response
  label: Route Acknowledgement
  description: "~R{input}to{outputs}<CR> echo of the route command"

- id: baud_response
  label: Baud Rate Response
  description: "~BR{baud}{bps}{IN|OUT}{ports}<CR>"

- id: receive_state_response
  label: Receive State Response
  description: "~RX{IN|OUT}{port}{ON|OFF}<CR>"

- id: firmware_response
  label: Firmware Version Response
  description: "~FM{N}-{version}<CR>"

- id: input_route_query_response
  label: Input Route Query Response
  description: "~R{input}to{output_list}<CR>"

# UNRESOLVED: unsolicited DXW wall-plate button-press feedback format (e.g. ~RSIN1TX05~BP1<CR><CR>) is documented but card-specific relevance unclear
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond command-enum values
```

## Events
```yaml
# UNRESOLVED: source documents unsolicited wall-plate button events (e.g. ~RSIN1TX05~BP1<CR><CR>)
# emitted on RS-232 from DXW-2 wall plates via DXM. Format documented but not a per-card event for FIBR3-G2.
```

## Macros
```yaml
# Preset save/trigger pair operates as a 2-step macro:
- id: save_and_recall_preset
  label: Save then Trigger Preset
  description: |
    Send !S{n}<CR> to store current matrix state, then !P{n}<CR> to recall.
    Preset slots 1-9.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source documents no explicit safety warnings, interlocks, or power-on sequencing for the FIBR3-G2 card
```

## Notes
**Protocol layering.** The DXCI-4-FIBR3-G2 is an input card; the RS-232 commands documented here belong to the parent DXM G2 Series chassis. A controller driving this card must connect to the chassis RS-232 port (DB-9 female, 115200 8N1 default per source).

**Command timing.** Wait ≥250ms between commands (firmware 2.2.6+).

**Case sensitivity.** Commands (`!`) and queries (`?`) are case sensitive. Responses (`~`) match case of the originating command.

**<CR> encoding.** Source notes `<CR>` = 0x0D hex / 13 decimal. Aurora recommends URL-encoded hex in control-system strings.

**Port numbering.** Inputs and outputs both numbered 1-32. Input `0` unroutes. Matrix sizes: 8x8, 16x16, 32x32.

**RS-232 pinout.** DB-9 female: pin 2 TX, pin 3 RX, pin 5 GND.

**LAN port.** Marked "Future Use" in source. If LAN control needed, source recommends using the Nugget Serial on the RS-232 port.

<!-- UNRESOLVED: card-specific behavior (fiber link status, SFP module health, EDID handling) not documented in the chassis RS-232 command set surfaced here -->

## Provenance

```yaml
source_domains:
  - api.auroramultimedia.com
source_urls:
  - https://api.auroramultimedia.com/assets/b8c75f0f-957a-4f15-ae86-80ed7d2076e0
retrieved_at: 2026-09-15T11:12:24.245Z
last_checked_at: 2026-09-15T22:16:17.200Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-15T22:16:17.200Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions have literal command counterparts in the source command table; transport matches 115200 8N1 default. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "card-specific behaviors (e.g. fiber signal status, SFP diagnostics) are not documented in the source beyond standard routing"
- "source states recommended baud 115200 but lists 2400/4800/9600/19200/38400 as selectable via !BRab... command; default/recommended documented as 115k 8N1"
- "unsolicited DXW wall-plate button-press feedback format (e.g. ~RSIN1TX05~BP1<CR><CR>) is documented but card-specific relevance unclear"
- "no discrete settable parameters beyond command-enum values"
- "source documents unsolicited wall-plate button events (e.g. ~RSIN1TX05~BP1<CR><CR>)"
- "source documents no explicit safety warnings, interlocks, or power-on sequencing for the FIBR3-G2 card"
- "card-specific behavior (fiber link status, SFP module health, EDID handling) not documented in the chassis RS-232 command set surfaced here"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
