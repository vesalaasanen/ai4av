---
spec_id: admin/lightware-mx12x12dvi-slim
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lightware Mx12X12Dvi Slim Control Spec"
manufacturer: Lightware
model_family: "Mx12X12Dvi Slim"
aliases: []
compatible_with:
  manufacturers:
    - Lightware
  models:
    - "Mx12X12Dvi Slim"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - go.lightware.com
source_urls:
  - https://go.lightware.com/open-api-environment
  - https://go.lightware.com/mx-dvi-slim-series-pum
retrieved_at: 2026-08-07T18:07:02.347Z
last_checked_at: 2026-08-19T09:30:41.658Z
generated_at: 2026-08-19T09:30:41.658Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes commands generically; several command examples reference features (e.g. GPIO, UART, HDBaseT remote ports, EDID F10) that may not exist on the Mx12X12Dvi Slim hardware. Treat as evidence of protocol grammar, not as confirmed device features."
  - "HDBaseT support on Mx12X12Dvi Slim not confirmed.\""
  - "full mapping not in source).\""
  - "GPIO availability on Mx12X12Dvi Slim not confirmed.\""
  - "no explicit power on/off commands in source. Device reset restarts but is not a power toggle.\""
  - "HDBaseT support not confirmed for this model.\""
  - "full index-to-rate mapping not in source.\""
  - "no explicit multi-step sequences documented in source."
  - "no explicit safety warnings, electrical interlocks, or power-on"
  - "firmware version compatibility not stated in source."
  - "RS-232 default baud rate, data bits, parity, stop bits not stated in source."
  - "device-specific feature confirmation (HDBaseT, GPIO, analog audio, EDID F10 availability) requires hardware check."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:30:41.658Z
  matched_actions: 38
  action_count: 38
  confidence: medium
  summary: "All 38 spec actions (LW2 + LW3) are present verbatim in the source; both ports 10001 and 6107 are documented; coverage ratio is 1.0. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-07
---

# Lightware Mx12X12Dvi Slim Control Spec

## Summary
Lightware Mx12X12Dvi Slim is a DVI matrix switcher with 12 inputs and 12 outputs. This spec covers both control protocols documented in the source: the legacy LW2 protocol (TCP port 10001) and the tree-based LW3 protocol (TCP port 6107). LW2 uses bracket-delimited ASCII commands; LW3 uses slash-separated node paths with GET/SET/CALL verbs.

<!-- UNRESOLVED: source describes commands generically; several command examples reference features (e.g. GPIO, UART, HDBaseT remote ports, EDID F10) that may not exist on the Mx12X12Dvi Slim hardware. Treat as evidence of protocol grammar, not as confirmed device features. -->

## Transport
```yaml
# Two control protocols supported in parallel: LW2 (port 10001) and LW3 (port 6107).
# Source explicitly states both port numbers.
protocols:
  - tcp
addressing:
  port: 10001  # LW2 protocol port
  # LW3 also listens on TCP port 6107 (noted in source)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable  # inferred: input-to-output switching commands present in both protocols
- queryable  # inferred: query commands returning state present in both protocols
- powerable  # inferred: device reset/restart command present
- levelable  # inferred: analog audio output volume commands present (LW3)
```

## Actions
```yaml
# --- LW2 Protocol Commands ---

- id: lw2_switch_input_to_output
  label: LW2 Switch Input to Output
  kind: action
  command: "{input}@{output}"
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: output
      type: integer
      description: Output number (1-based)
  notes: "Example: {1@5} switches Input 1 to Output 5. Response: (O05 I01)."

- id: lw2_batch_switch
  label: LW2 Batch Switch
  kind: action
  command: "{input}@{output}"
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number
  notes: "Send multiple switch commands within 10ms for atomic batch switching. Example: {02@01}{+06}{05@04}."

- id: lw2_unmute_input
  label: LW2 Unmute Input
  kind: action
  command: "{+input}"
  params:
    - name: input
      type: integer
      description: Input number to unmute
  notes: "Used in batch switching examples."

- id: lw2_view_crosspoint
  label: LW2 View Crosspoint Connections
  kind: query
  command: "{vc}"
  params: []
  notes: "Response example: (ALL M01 L01 01 01 02 02 02 U02). M=muted, L=locked, U=muted and locked."

- id: lw2_load_preset
  label: LW2 Load Crosspoint Preset
  kind: action
  command: "{%preset}"
  params:
    - name: preset
      type: integer
      description: Preset number
  notes: "Example: {%4} loads preset 4. Response: (LPR04). Preset loading does not affect locked outputs."

- id: lw2_query_input_status
  label: LW2 Query Input Port Signal Status
  kind: query
  command: "{:isd}"
  params: []
  notes: "Response: (ISD <bitstring>). 1 = source connected, 0 = no source."

- id: lw2_query_ip_config
  label: LW2 Query IP Configuration
  kind: query
  command: "{ip_config=?}"
  params: []
  notes: "Response: (IP_CONFIG=<static> <ip> <port> <subnet> <gateway>)."

- id: lw2_set_ip_config
  label: LW2 Set IP Configuration
  kind: action
  command: "{ip_config=<static> <ip> <port> <subnet> <gateway>}"
  params:
    - name: static
      type: integer
      description: 0 = static IP
    - name: ip
      type: string
      description: IP address
    - name: port
      type: integer
      description: TCP port number
    - name: subnet
      type: string
      description: Subnet mask
    - name: gateway
      type: string
      description: Gateway address

- id: lw2_query_health
  label: LW2 Query Health Status
  kind: query
  command: "{st}"
  params: []
  notes: "Response: (ST CPU <3V> <5V> <12V> <temp>) and (ST FAN#N <rpm>)."

- id: lw2_query_product_type
  label: LW2 Query Product Type
  kind: query
  command: "{i}"
  params: []
  notes: "Response example: (I: MX-FR17). Read-only identification."

- id: lw2_set_input_edid
  label: LW2 Set EDID on Input Port
  kind: action
  command: "{e<input>:f<edid>}"
  params:
    - name: input
      type: integer
      description: Input port number
    - name: edid
      type: string
      description: EDID identifier (e.g. F10)
  notes: "Example: {e5:f10} emulates EDID F10 on Input 5. Response: (E_SW_OK) then (E_S_C)."

# --- LW3 Protocol Commands ---

- id: lw3_open_subscription
  label: LW3 Open Subscription
  kind: action
  command: "OPEN /<node>/*"
  params:
    - name: node
      type: string
      description: Node path to subscribe to (e.g. /MEDIA/VIDEO)
  notes: "Subscribe to a node for change notifications. Without * only the node itself is checked."

- id: lw3_get_node_manual
  label: LW3 Get Node Manual
  kind: query
  command: "MAN /<path>"
  params:
    - name: path
      type: string
      description: Full node path
  notes: "Returns human-readable manual text. Example: MAN /MEDIA/VIDEO/O1.Pwr5vMode."

- id: lw3_query_crosspoint
  label: LW3 Query Crosspoint Connections
  kind: query
  command: "GET /MEDIA/VIDEO/XP.DestinationConnectionList"
  params: []
  notes: "Response: pr /MEDIA/VIDEO/XP.DestinationConnectionList=I1;I3;I1;I3"

- id: lw3_switch_input_to_output
  label: LW3 Switch Input to Output
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:switch(I{input}:O{output})"
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number
  notes: "Example: CALL /MEDIA/VIDEO/XP:switch(I4:O1). Multiple I:O pairs can be supplied for batch switching."

- id: lw3_query_input_signal
  label: LW3 Query Input Video Signal Presence
  kind: query
  command: "GET /MEDIA/VIDEO/I{input}.SignalPresent"
  params:
    - name: input
      type: integer
      description: Input number
  notes: "1 = signal present, 0 = no signal."

- id: lw3_query_hdcp_state
  label: LW3 Query HDCP State
  kind: query
  command: "GET /MEDIA/VIDEO/I{input}.HdcpState"
  params:
    - name: input
      type: integer
      description: Input number
  notes: "1 = HDCP enabled, 0 = HDCP disabled."

- id: lw3_set_hdcp_state
  label: LW3 Set HDCP State
  kind: action
  command: "SET /MEDIA/VIDEO/I{input}.HdcpState={state}"
  params:
    - name: input
      type: integer
      description: Input number
    - name: state
      type: integer
      description: 0 = disabled, 1 = enabled

- id: lw3_mute_sources
  label: LW3 Mute Input Ports
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:muteSource(I{input1};I{input2})"
  params:
    - name: input1
      type: integer
      description: First input to mute
    - name: input2
      type: integer
      description: Second input to mute
  notes: "Multiple inputs can be muted in one call, separated by semicolons."

- id: lw3_query_source_port_status
  label: LW3 Query Source Port Status
  kind: query
  command: "GET /MEDIA/VIDEO/XP.SourcePortStatus"
  params: []
  notes: "Returns per-input status groups: T=unmuted+unlocked, M=muted, L=locked, U=locked+muted, followed by 2 hex bytes for audio/HDCP/signal state."

- id: lw3_query_cpu_temperature
  label: LW3 Query CPU Temperature
  kind: query
  command: "GET /MANAGEMENT/STATUS.CpuTemperature"
  params: []
  notes: "Returns current temperature plus min/max/warning thresholds."

- id: lw3_query_5v_main
  label: LW3 Query 5V Main Voltage
  kind: query
  command: "GET /MANAGEMENT/STATUS.5VMain"
  params: []
  notes: "Returns current voltage plus min/max/warning thresholds."

- id: lw3_query_hdbt_stat
  label: LW3 Query HDBaseT Cable Status
  kind: query
  command: "GET /REMOTE/S{port}.HdbtStat"
  params:
    - name: port
      type: integer
      description: Source port number
  notes: "Returns 4 error rate values in dB (one per twisted pair). UNRESOLVED: HDBaseT support on Mx12X12Dvi Slim not confirmed."

- id: lw3_query_tx_ber
  label: LW3 Query Transmitter Bit Error Ratio
  kind: query
  command: "GET /REMOTE/S{port}.TxBer"
  params:
    - name: port
      type: integer
      description: Source port number
  notes: "Returns BER value. UNRESOLVED: HDBaseT support on Mx12X12Dvi Slim not confirmed."

- id: lw3_query_autoselect
  label: LW3 Query Video Input Autoselection
  kind: query
  command: "GET /MEDIA/VIDEO/XP.DestinationPortAutoselect"
  params: []
  notes: "Returns per-output flag. E=Enabled, L=Last detect mode, P=Priority mode, D=Disabled."

- id: lw3_set_autoselect
  label: LW3 Set Video Input Autoselection
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:setDestinationPortAutoselect(O{output}:{mode})"
  params:
    - name: output
      type: integer
      description: Output port number
    - name: mode
      type: string
      description: "Mode flags, e.g. EP (Enabled+Priority), EL (Enabled+Last detect)"

- id: lw3_set_volume_db
  label: LW3 Set Analog Audio Output Volume (dB)
  kind: action
  command: "SET /MEDIA/AUDIO/O{output}.VolumedB={value}"
  params:
    - name: output
      type: integer
      description: Analog audio output port number
    - name: value
      type: integer
      description: Volume in dB

- id: lw3_set_volume_percent
  label: LW3 Set Analog Audio Output Volume (Percent)
  kind: action
  command: "SET /MEDIA/AUDIO/O{output}.VolumePercent={value}"
  params:
    - name: output
      type: integer
      description: Analog audio output port number
    - name: value
      type: integer
      description: Volume percent (0-100)

- id: lw3_query_product_name
  label: LW3 Query Product Name
  kind: query
  command: "GET /.ProductName"
  params: []
  notes: "Read-only."

- id: lw3_reset_device
  label: LW3 Reset Device
  kind: action
  command: "CALL /SYS:reset()"
  params: []
  notes: "Restarts device. Terminates Ethernet, RS-232, USB connections."

- id: lw3_query_dhcp
  label: LW3 Query DHCP State
  kind: query
  command: "GET /MANAGEMENT/NETWORK.DhcpEnabled"
  params: []

- id: lw3_set_dhcp
  label: LW3 Set DHCP State
  kind: action
  command: "SET /MANAGEMENT/NETWORK.DhcpEnabled={value}"
  params:
    - name: value
      type: boolean
      description: true = DHCP, false = static IP

- id: lw3_query_static_ip
  label: LW3 Query Static IP Address
  kind: query
  command: "GET /MANAGEMENT/NETWORK.StaticIpAddress"
  params: []

- id: lw3_set_static_ip
  label: LW3 Set Static IP Address
  kind: action
  command: "SET /MANAGEMENT/NETWORK.StaticIpAddress={ip}"
  params:
    - name: ip
      type: string
      description: IPv4 address
  notes: "Only effective when DhcpEnabled is false."

- id: lw3_set_uart_baudrate
  label: LW3 Set RS-232 UART Baud Rate
  kind: action
  command: "SET /MEDIA/UART/P{port}.Baudrate={index}"
  params:
    - name: port
      type: integer
      description: UART port number
    - name: index
      type: integer
      description: "Baud rate index. 2 = 9600. Other indices map to different rates (UNRESOLVED: full mapping not in source)."

- id: lw3_uart_send_message
  label: LW3 Send Message over RS-232
  kind: action
  command: 'CALL /MEDIA/UART/P{port}:sendMessage({message}/r/n)'
  params:
    - name: port
      type: integer
      description: UART port number
    - name: message
      type: string
      description: Message text terminated with CR LF

- id: lw3_gpio_toggle
  label: LW3 Toggle GPIO Pin
  kind: action
  command: "CALL /MEDIA/GPIO/P{port}:toggle({pin})"
  params:
    - name: port
      type: integer
      description: GPIO port number
    - name: pin
      type: integer
      description: Pin number
  notes: "Pin direction must be set to Output first. UNRESOLVED: GPIO availability on Mx12X12Dvi Slim not confirmed."

- id: lw3_ethernet_tcp_text
  label: LW3 Send TCP Text over Ethernet
  kind: action
  command: "CALL /MEDIA/ETHERNET:tcpText({ip}:{port}={message})"
  params:
    - name: ip
      type: string
      description: Target IP address
    - name: port
      type: integer
      description: Target TCP port
    - name: message
      type: string
      description: Message text to send
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  notes: "UNRESOLVED: no explicit power on/off commands in source. Device reset restarts but is not a power toggle."

- id: crosspoint_connection
  type: string
  description: "Current input-to-output mapping. Source: LW2 {vc} or LW3 GET /MEDIA/VIDEO/XP.DestinationConnectionList."

- id: input_signal_present
  type: enum
  values: [present, absent]
  description: "Source: LW2 {:isd} or LW3 GET /MEDIA/VIDEO/I{n}.SignalPresent."

- id: hdcp_state
  type: enum
  values: [enabled, disabled]
  description: "Source: LW3 GET /MEDIA/VIDEO/I{n}.HdcpState."

- id: source_port_status
  type: string
  description: "Per-input mute/lock/audio/signal status. Source: LW3 GET /MEDIA/VIDEO/XP.SourcePortStatus."

- id: cpu_temperature
  type: string
  description: "CPU temperature in Celsius plus thresholds. Source: LW3 GET /MANAGEMENT/STATUS.CpuTemperature."

- id: voltage_5v_main
  type: string
  description: "5V rail voltage plus thresholds. Source: LW3 GET /MANAGEMENT/STATUS.5VMain."

- id: product_name
  type: string
  description: "Read-only product identification. Source: LW3 GET /.ProductName or LW2 {i}."

- id: ip_config
  type: string
  description: "Static/DHCP flag, IP, port, subnet, gateway. Source: LW2 {ip_config=?}."

- id: hdbt_cable_status
  type: string
  description: "Per-pair error rates in dB. UNRESOLVED: HDBaseT support not confirmed for this model."

- id: hdbt_tx_ber
  type: string
  description: "Transmitter bit error ratio. UNRESOLVED: HDBaseT support not confirmed for this model."

- id: autoselect_mode
  type: string
  description: "Per-output autoselect flags (E/L/P/D). Source: LW3 GET /MEDIA/VIDEO/XP.DestinationPortAutoselect."
```

## Variables
```yaml
- id: volume_db
  type: number
  description: "Analog audio output volume in dB. Source: LW3 SET /MEDIA/AUDIO/O{n}.VolumedB."

- id: volume_percent
  type: number
  range: [0, 100]
  description: "Analog audio output volume percent. Source: LW3 SET /MEDIA/AUDIO/O{n}.VolumePercent."

- id: static_ip_address
  type: string
  description: "Static IPv4 address. Source: LW3 SET /MANAGEMENT/NETWORK.StaticIpAddress."

- id: dhcp_enabled
  type: boolean
  description: "DHCP state. Source: LW3 SET /MANAGEMENT/NETWORK.DhcpEnabled."

- id: uart_baudrate
  type: integer
  description: "UART baud rate as index (2 = 9600). Source: LW3 SET /MEDIA/UART/P{n}.Baudrate. UNRESOLVED: full index-to-rate mapping not in source."
```

## Events
```yaml
- id: lw3_change_notification
  type: string
  description: "Asynchronous change message for subscribed nodes. Source: CHG /<path>.<property>=<value>. Requires prior OPEN /<node>/* subscription."

- id: lw2_unexpected_responses
  type: string
  description: "LW2 emits per-command responses asynchronously when batched. Each command in a batch produces its own (response) line."
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented in source.
# Batch switching in LW2 ({02@01}{+06}{05@04}) is a syntactic batching pattern, not a stored macro.
```

## Safety
```yaml
confirmation_required_for:
  - lw3_reset_device  # Restarts device, terminates all control connections.
interlocks: []
# UNRESOLVED: no explicit safety warnings, electrical interlocks, or power-on
# sequencing documented in source.
```

## Notes
Two parallel protocols: LW2 on TCP 10001 and LW3 on TCP 6107. LW2 uses {curly bracket} commands with round-bracketed responses; LW3 uses slash-separated node paths with GET/SET/CALL verbs and prefix-coded responses (mO success, mE error, pr/pw read/write property).

LW2 commands uppercased on input; responses may mix case. Both protocols terminate responses with CR LF.

Several LW3 command examples in the source reference subsystems (HDBaseT remote ports, GPIO, analog audio outputs, EDID F10) that may not exist on the Mx12X12Dvi Slim hardware. Treat them as protocol-grammar evidence rather than confirmed device features until verified against a unit.

Baud rate for the RS-232 port is referenced via LW3 index value 2 (= 9600); the full index-to-rate table is not present in this excerpt.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: RS-232 default baud rate, data bits, parity, stop bits not stated in source. -->
<!-- UNRESOLVED: device-specific feature confirmation (HDBaseT, GPIO, analog audio, EDID F10 availability) requires hardware check. -->

## Provenance

```yaml
source_domains:
  - go.lightware.com
source_urls:
  - https://go.lightware.com/open-api-environment
  - https://go.lightware.com/mx-dvi-slim-series-pum
retrieved_at: 2026-08-07T18:07:02.347Z
last_checked_at: 2026-08-19T09:30:41.658Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:30:41.658Z
matched_actions: 38
action_count: 38
confidence: medium
summary: "All 38 spec actions (LW2 + LW3) are present verbatim in the source; both ports 10001 and 6107 are documented; coverage ratio is 1.0. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes commands generically; several command examples reference features (e.g. GPIO, UART, HDBaseT remote ports, EDID F10) that may not exist on the Mx12X12Dvi Slim hardware. Treat as evidence of protocol grammar, not as confirmed device features."
- "HDBaseT support on Mx12X12Dvi Slim not confirmed.\""
- "full mapping not in source).\""
- "GPIO availability on Mx12X12Dvi Slim not confirmed.\""
- "no explicit power on/off commands in source. Device reset restarts but is not a power toggle.\""
- "HDBaseT support not confirmed for this model.\""
- "full index-to-rate mapping not in source.\""
- "no explicit multi-step sequences documented in source."
- "no explicit safety warnings, electrical interlocks, or power-on"
- "firmware version compatibility not stated in source."
- "RS-232 default baud rate, data bits, parity, stop bits not stated in source."
- "device-specific feature confirmation (HDBaseT, GPIO, analog audio, EDID F10 availability) requires hardware check."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
