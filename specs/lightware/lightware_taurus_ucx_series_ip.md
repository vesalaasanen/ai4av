---
spec_id: admin/lightware-taurus-ucx-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lightware Taurus UCX Series Control Spec"
manufacturer: Lightware
model_family: "Lightware Taurus UCX Series"
aliases: []
compatible_with:
  manufacturers:
    - Lightware
  models:
    - "Lightware Taurus UCX Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - go.lightware.com
source_urls:
  - https://go.lightware.com/open-api-environment
retrieved_at: 2026-04-30T04:31:17.569Z
last_checked_at: 2026-06-02T03:24:52.999Z
generated_at: 2026-06-02T03:24:52.999Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Specific port counts (input/output numbers) vary across the Taurus UCX sub-models; source uses generic placeholders I1..I9 and O1..O8."
  - "complete enumeration not present in source excerpt - only the"
  - "source does not document multi-step pre-programmed sequences"
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "Firmware version compatibility not stated in source."
  - "Full set of LW3 node tree not enumerated in source excerpt."
  - "Voltage/current/power specifications for the UCX chassis are"
verification:
  verdict: verified
  checked_at: 2026-06-02T03:24:52.999Z
  matched_actions: 36
  action_count: 36
  confidence: medium
  summary: "All 36 spec actions matched literally to source; all transport ports verified; source command catalogue fully represented. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Lightware Taurus UCX Series Control Spec

## Summary
AV control spec for the Lightware Taurus UCX Series unified-collaboration (UCX) matrix switchers. Covers the two documented Lightware-proprietary TCP protocols: LW2 (legacy curly-bracket syntax, port 10001) and LW3 (slash-delimited REST-like path syntax, port 6107). Devices expose video crosspoint switching, audio level control, EDID management, RS-232 pass-through, GPIO, and network configuration.

<!-- UNRESOLVED: Specific port counts (input/output numbers) vary across the Taurus UCX sub-models; source uses generic placeholders I1..I9 and O1..O8. -->

## Transport
```yaml
protocols:
  - tcp
  # LW3 port documented as primary modern control; LW2 port 10001 also documented
  # for backward-compatible syntax. Both are unauthenticated TCP text protocols.
addressing:
  port: 6107  # LW3 protocol; LW2 uses port 10001 (see Notes)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable  # inferred from input/output routing command examples
- queryable  # inferred from query command examples
- levelable  # inferred from VolumedB / VolumePercent control examples
```

## Actions
```yaml
# LW2 protocol commands (TCP port 10001, curly-bracket syntax)
- id: lw2_switch
  label: LW2 Switch Input to Output
  kind: action
  command: "{<input>@<output>}"
  params:
    - name: input
      type: integer
      description: Source input number (1-based)
    - name: output
      type: integer
      description: Destination output number (1-based)
  notes: |
    Example {1@5} routes Input 1 to Output 5; device replies (O05 I01)CrLf.

- id: lw2_batch_switch
  label: LW2 Batch Switch
  kind: action
  command: "{<cmd1>}{<cmd2>}{<cmd3>}"
  params:
    - name: cmd1
      type: string
      description: First LW2 switch/unmute command
    - name: cmd2
      type: string
      description: Second LW2 switch/unmute command
    - name: cmd3
      type: string
      description: Third LW2 switch/unmute command
  notes: |
    Commands arriving within 10 ms are batched; {02@01}{+06}{05@04} routes
    Input 2 to Output 1, unmutes Input 6, and routes Input 5 to Output 4 together.

- id: lw2_unmute_input
  label: LW2 Unmute Input
  kind: action
  command: "{+<input>}"
  params:
    - name: input
      type: integer
      description: Input port to unmute

- id: lw2_view_connections
  label: LW2 View Crosspoint Connections
  kind: query
  command: "{vc}"
  params: []

- id: lw2_load_preset
  label: LW2 Load Crosspoint Preset
  kind: action
  command: "{%<preset>}"
  params:
    - name: preset
      type: integer
      description: Preset number to load (1-based)

- id: lw2_input_port_status
  label: LW2 Query Input Port Signal Status
  kind: query
  command: "{:isd}"
  params: []

- id: lw2_ip_config_query
  label: LW2 Query IP Configuration
  kind: query
  command: "{ip_config=?}"
  params: []

- id: lw2_ip_config_set
  label: LW2 Set IP Configuration
  kind: action
  command: "{ip_config=<mode> <ip> <port> <mask> <gateway>}"
  params:
    - name: mode
      type: integer
      description: '0 = static, 1 = DHCP (per source example)'
    - name: ip
      type: string
      description: IPv4 address
    - name: port
      type: integer
      description: LW2 TCP port
    - name: mask
      type: string
      description: Subnet mask in dotted-quad form
    - name: gateway
      type: string
      description: Gateway IPv4 address

- id: lw2_health_status
  label: LW2 Query Health Status
  kind: query
  command: "{st}"
  params: []

- id: lw2_product_type
  label: LW2 Query Product Type
  kind: query
  command: "{i}"
  params: []

- id: lw2_set_edid
  label: LW2 Set EDID on Input Port
  kind: action
  command: "{e<input>:f<edid>}"
  params:
    - name: input
      type: integer
      description: Input port number
    - name: edid
      type: string
      description: EDID mnemonic (e.g. F10 factory EDID, or custom)

# LW3 protocol commands (TCP port 6107, slash-delimited path syntax)
- id: lw3_get_destination_connections
  label: LW3 Query Crosspoint Destination Connections
  kind: query
  command: "GET /MEDIA/VIDEO/XP.DestinationConnectionList"
  params: []

- id: lw3_switch
  label: LW3 Switch Input to Output
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:switch(I<input>:O<output>)"
  params:
    - name: input
      type: integer
      description: Source input number (1-based)
    - name: output
      type: integer
      description: Destination output number (1-based)

- id: lw3_signal_present
  label: LW3 Query Video Signal Presence on Input
  kind: query
  command: "GET /MEDIA/VIDEO/I<input>.SignalPresent"
  params:
    - name: input
      type: integer
      description: Input number (1-based)

- id: lw3_hdcp_state_query
  label: LW3 Query HDCP State on Input
  kind: query
  command: "GET /MEDIA/VIDEO/I<input>.HdcpState"
  params:
    - name: input
      type: integer
      description: Input number (1-based)

- id: lw3_hdcp_state_set
  label: LW3 Set HDCP State on Input
  kind: action
  command: "SET /MEDIA/VIDEO/I<input>.HdcpState=<state>"
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: state
      type: integer
      description: "0 = disabled, 1 = enabled"

- id: lw3_mute_sources
  label: LW3 Mute Input Ports
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:muteSource(I<input1>;I<input2>)"
  params:
    - name: input1
      type: integer
      description: First input to mute
    - name: input2
      type: integer
      description: Second input to mute

- id: lw3_source_port_status
  label: LW3 Query Source Port Status
  kind: query
  command: "GET /MEDIA/VIDEO/XP.SourcePortStatus"
  params: []

- id: lw3_cpu_temperature
  label: LW3 Query CPU Temperature
  kind: query
  command: "GET /MANAGEMENT/STATUS.CpuTemperature"
  params: []

- id: lw3_5v_main
  label: LW3 Query 5V Main Voltage
  kind: query
  command: "GET /MANAGEMENT/STATUS.5VMain"
  params: []

- id: lw3_hdbt_stat
  label: LW3 Query HDBT Cable Error Rates
  kind: query
  command: "GET /REMOTE/S<source>.HdbtStat"
  params:
    - name: source
      type: integer
      description: Source/input number (1-based)

- id: lw3_tx_ber
  label: LW3 Query HDBT Transmit BER
  kind: query
  command: "GET /REMOTE/S<source>.TxBer"
  params:
    - name: source
      type: integer
      description: Source/input number (1-based)

- id: lw3_destination_autoselect_get
  label: LW3 Get Destination Autoselect Settings
  kind: query
  command: "GET /MEDIA/VIDEO/XP.DestinationPortAutoselect"
  params: []

- id: lw3_destination_autoselect_set
  label: LW3 Set Destination Autoselect Mode
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:setDestinationPortAutoselect(O<output>:<flags>)"
  params:
    - name: output
      type: integer
      description: Output port number (1-based)
    - name: flags
      type: string
      description: "Two-letter code, e.g. EP = Enabled + Priority mode; EL = Enabled + Last-detect"

- id: lw3_set_volume_db
  label: LW3 Set Analog Audio Output Volume (dB)
  kind: action
  command: "SET /MEDIA/AUDIO/O<output>.VolumedB=<value>"
  params:
    - name: output
      type: integer
      description: Analog audio output port (1-based)
    - name: value
      type: number
      description: Volume in dB (range not stated in source excerpt)

- id: lw3_set_volume_percent
  label: LW3 Set Analog Audio Output Volume (Percent)
  kind: action
  command: "SET /MEDIA/AUDIO/O<output>.VolumePercent=<value>"
  params:
    - name: output
      type: integer
      description: Analog audio output port (1-based)
    - name: value
      type: integer
      description: Volume percent (0-100 per source)

- id: lw3_product_name
  label: LW3 Query Product Name
  kind: query
  command: "GET /.ProductName"
  params: []

- id: lw3_system_reset
  label: LW3 Reset Device
  kind: action
  command: "CALL /SYS:reset()"
  params: []

- id: lw3_dhcp_enabled_get
  label: LW3 Query DHCP State
  kind: query
  command: "GET /MANAGEMENT/NETWORK.DhcpEnabled"
  params: []

- id: lw3_dhcp_enabled_set
  label: LW3 Set DHCP State
  kind: action
  command: "SET /MANAGEMENT/NETWORK.DhcpEnabled=<state>"
  params:
    - name: state
      type: boolean
      description: true = DHCP, false = static IP

- id: lw3_static_ip_set
  label: LW3 Set Static IP Address
  kind: action
  command: "SET /MANAGEMENT/NETWORK.StaticIpAddress=<ip>"
  params:
    - name: ip
      type: string
      description: Static IPv4 address (valid only when DhcpEnabled=false)

- id: lw3_uart_baud_set
  label: LW3 Set RS-232 Port Baud Rate
  kind: action
  command: "SET /MEDIA/UART/P<port>.Baudrate=<value>"
  params:
    - name: port
      type: integer
      description: UART/serial port number (1-based; P1 = local)
    - name: value
      type: integer
      description: Baud rate index; 2 = 9600, 0 and 7 = other rates (mapping not in source excerpt)

- id: lw3_uart_send_message
  label: LW3 Send Message over RS-232 Port
  kind: action
  command: "CALL /MEDIA/UART/P<port>:sendMessage(<message>/r/n)"
  params:
    - name: port
      type: integer
      description: UART/serial port number (1-based)
    - name: message
      type: string
      description: ASCII message; terminated with CR LF (source uses /r/n)

- id: lw3_gpio_toggle
  label: LW3 Toggle GPIO Pin Output Level
  kind: action
  command: "CALL /MEDIA/GPIO/P<port>:toggle(<pin>)"
  params:
    - name: port
      type: integer
      description: GPIO port number (1-based)
    - name: pin
      type: integer
      description: Pin number on the GPIO port

- id: lw3_ethernet_tcp_text
  label: LW3 Send TCP Text Message over Ethernet
  kind: action
  command: "CALL /MEDIA/ETHERNET:tcpText(<remote>=<message>)"
  params:
    - name: remote
      type: string
      description: Destination in ip:port form (e.g. 192.168.0.11:9715)
    - name: message
      type: string
      description: ASCII text payload to send

- id: lw3_subscribe
  label: LW3 Subscribe to Node Change Notifications
  kind: action
  command: "OPEN <path>/*"
  params:
    - name: path
      type: string
      description: LW3 node path; trailing /* subscribes to all children (e.g. /MEDIA/VIDEO/*)
```

## Feedbacks
```yaml
- id: lw2_destination_connection
  type: string
  description: |
    Per-output routing/mute/lock state. Example: (O05 I01)CrLf means Output 5
    is connected to Input 1. Multi-output batch: (ALL M01 L01 01 01 02 02 02 U02)
    where M=muted, L=locked, U=muted+locked; one letter per output in order.
- id: lw2_preset_loaded
  type: string
  description: "(LPR<nn>)CrLf - preset number nn has been loaded."
- id: lw2_input_signal_status
  type: string
  description: |
    (ISD <flags>)CrLf; one digit per input, '1' = source connected (+5V present),
    '0' = no source. Length depends on device.
- id: lw2_ip_config
  type: string
  description: |
    (IP_CONFIG=<mode> <ip> <port> <mask> <gateway>)CrLf
- id: lw2_health
  type: string
  description: |
    Series of (ST ...)CrLf lines. Voltages (3V/5V/12V), internal temperature,
    and per-fan RPM lines. Exact field set depends on device.
- id: lw2_product_type
  type: string
  description: "(I: <model>)CrLf"
- id: lw2_edid_ack
  type: string
  description: |
    (E_SW_OK)CrLf immediate, then (E_S_C)CrLf after EDID switch completes.
- id: lw3_destination_connections
  type: string
  description: |
    pr /MEDIA/VIDEO/XP.DestinationConnectionList=I1;I3;I1;I3 - semicolon-separated
    input number for each output in order.
- id: lw3_signal_present
  type: enum
  values: [present, absent]
  description: pr /MEDIA/VIDEO/I<n>.SignalPresent=1 (present) or =0 (absent)
- id: lw3_hdcp_state
  type: enum
  values: [disabled, enabled]
  description: pr /MEDIA/VIDEO/I<n>.HdcpState=0 (disabled) or =1 (enabled)
- id: lw3_source_port_status
  type: string
  description: |
    pr /MEDIA/VIDEO/XP.SourcePortStatus=T000F;M000A;... - semicolon-separated
    per-input groups. Letter: T=unmuted/unlocked, M=muted, L=locked, U=locked+muted.
    Followed by 4 hex chars: 2 reserved, then E=embedded audio present,
    F=source connected + signal present (other bits not in source excerpt).
- id: lw3_cpu_temperature
  type: string
  description: "pr /MANAGEMENT/STATUS.CpuTemperature=<value> C;<lo>;<hi>;..."
- id: lw3_5v_main
  type: string
  description: "pr /MANAGEMENT/STATUS.5VMain=<voltage> V;<lo>;<hi>;..."
- id: lw3_hdbt_stat
  type: string
  description: |
    pr /REMOTE/S<n>.HdbtStat=<dB1>; <dB2>; <dB3>; <dB4> - per-twisted-pair error
    rate in dB, lower is better.
- id: lw3_tx_ber
  type: string
  description: "pr /REMOTE/S<n>.TxBer=<ber> (e.g. 1e-10)"
- id: lw3_destination_autoselect
  type: string
  description: |
    pr /MEDIA/VIDEO/XP.DestinationPortAutoselect=<flags> - two-letter code per
    output: E/D then mode letter (L=last-detect, P=priority, ...).
- id: lw3_volume_db
  type: number
  description: "pw /MEDIA/AUDIO/O<n>.VolumedB=<value> dB"
- id: lw3_product_name
  type: string
  description: "pr /.ProductName=<name>"
- id: lw3_dhcp_enabled
  type: boolean
  description: "pw /MANAGEMENT/NETWORK.DhcpEnabled=true|false"
- id: lw3_static_ip
  type: string
  description: "pw /MANAGEMENT/NETWORK.StaticIpAddress=<ip>"
- id: lw3_uart_baud
  type: integer
  description: "pw /MEDIA/UART/P<n>.Baudrate=<index>"
```

## Variables
```yaml
# Settable LW3 properties not already covered by Actions.
# (UNRESOLVED: complete enumeration not present in source excerpt - only the
# properties referenced in documented commands are captured above.)
```

## Events
```yaml
- id: lw3_change_notification
  type: string
  description: |
    Asynchronous CHG message sent to subscribers when a watched property
    changes. Example from source:
    CHG /MEDIA/VIDEO/QUALITY.QualityMode=video
    Subscription is established with OPEN <path>/* (trailing wildcard
    includes all child nodes).
- id: lw3_subscription_ack
  type: string
  description: "o- <path>/* - subscription opened acknowledgement."
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step pre-programmed sequences
# beyond the LW2 batch-switch behavior (commands within 10 ms are batched).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements are present in the source excerpt.
```

## Notes
- Two TCP protocols coexist on two different ports:
  - LW2 on port 10001 — legacy curly-bracket syntax; commands are
    case-insensitive (converted to upper-case internally), responses may mix
    case, and responses are terminated with CrLf.
  - LW3 on port 6107 — modern REST-like path syntax; case-sensitive throughout;
    responses prefixed with `mO` (method OK), `mE` (method error), `pR`/`pr`
    (read-only property response), `pw` (property written), or `pm` (property
    manual).
- LW2 batch switching: multiple LW2 commands arriving at the device within
  10 ms of each other are collected and executed together. Responses are still
  sent back individually.
- Crosspoint presets (`{%<n>}`) do not affect locked outputs.
- LW3 baud-rate index → rate mapping: source only confirms `2 = 9600`; full
  enumeration of `0` and `7` and other indices is not in this excerpt.
- LW3 subscription uses `OPEN <path>/*`; omitting the trailing `*` watches only
  the named node, not its children.
- Source device model in examples is `MX-FR17`; the Taurus UCX family
  is a separate but architecturally related product line. Port counts and
  available nodes should be verified against the actual device manual.
- The `e<port>:f<edid>` LW2 EDID command example `e5:f10` writes factory EDID
  F10 to Input 5; custom EDIDs must be uploaded separately first.

<!-- UNRESOLVED: Firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: Full set of LW3 node tree not enumerated in source excerpt. -->
<!-- UNRESOLVED: Voltage/current/power specifications for the UCX chassis are
     not present in this excerpt. -->

## Provenance

```yaml
source_domains:
  - go.lightware.com
source_urls:
  - https://go.lightware.com/open-api-environment
retrieved_at: 2026-04-30T04:31:17.569Z
last_checked_at: 2026-06-02T03:24:52.999Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T03:24:52.999Z
matched_actions: 36
action_count: 36
confidence: medium
summary: "All 36 spec actions matched literally to source; all transport ports verified; source command catalogue fully represented. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Specific port counts (input/output numbers) vary across the Taurus UCX sub-models; source uses generic placeholders I1..I9 and O1..O8."
- "complete enumeration not present in source excerpt - only the"
- "source does not document multi-step pre-programmed sequences"
- "no safety warnings, interlock procedures, or power-on sequencing"
- "Firmware version compatibility not stated in source."
- "Full set of LW3 node tree not enumerated in source excerpt."
- "Voltage/current/power specifications for the UCX chassis are"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
