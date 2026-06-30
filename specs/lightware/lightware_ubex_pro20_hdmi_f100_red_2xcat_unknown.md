---
spec_id: admin/lightware-ubex-pro20-hdmi-f100-red-2xcat
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lightware UBEX Pro20 HDMI F100 Red 2xCAT Control Spec"
manufacturer: Lightware
model_family: "UBEX Pro20 HDMI F100 Red 2xCAT"
aliases: []
compatible_with:
  manufacturers:
    - Lightware
  models:
    - "UBEX Pro20 HDMI F100 Red 2xCAT"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - go.lightware.com
  - manualslib.com
source_urls:
  - https://go.lightware.com/open-api-environment
  - https://go.lightware.com/ubex-pum
  - https://www.manualslib.com/manual/2159844/Lightware-Ubex-Pro20-Hdmi-F100.html
retrieved_at: 2026-06-29T18:32:52.660Z
last_checked_at: 2026-06-30T07:10:07.655Z
generated_at: 2026-06-30T07:10:07.655Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not state firmware version range; some examples reference unrelated model names (MX-FR17, VINX-120-HDMI-ENC) suggesting the refined doc spans multiple Lightware products. Commands included here are those documented generically; per-port applicability to the UBEX Pro20 specifically is inferred."
  - "source contains no explicit safety warnings beyond the reset side-effect noted above."
  - "firmware version range not stated in source. Full LW3 node tree not enumerated beyond examples — additional properties/methods (network, status, GPIO direction, EDID sub-nodes) exist but not documented in the refined excerpt. UART baud-rate code mapping (values 0, 2, 7 mentioned but not fully tabulated) is incomplete."
verification:
  verdict: verified
  checked_at: 2026-06-30T07:10:07.655Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "All 33 spec actions matched verbatim in source; LW2 and LW3 command sets fully represented. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-29
---

# Lightware UBEX Pro20 HDMI F100 Red 2xCAT Control Spec

## Summary
Lightware UBEX Pro20 HDMI F100 Red 2xCAT is an HDMI-over-CATx extender matrix supporting IP control via two Lightware-proprietary text protocols: LW2 (legacy, port 10001) and LW3 (modern tree-based, port 6107). This spec covers both LW2 and LW3 command sets for routing, signal/HDCP/health queries, EDID management, autoselect, audio volume, RS-232 message pass-through, GPIO, device reset, and network configuration.

<!-- UNRESOLVED: source does not state firmware version range; some examples reference unrelated model names (MX-FR17, VINX-120-HDMI-ENC) suggesting the refined doc spans multiple Lightware products. Commands included here are those documented generically; per-port applicability to the UBEX Pro20 specifically is inferred. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 10001  # LW2 protocol
auth:
  type: none  # inferred: no auth procedure in source
# LW3 protocol uses TCP port 6107 over the same Ethernet interface; see Notes.
```

## Traits
```yaml
- routable  # inferred from routing/switching/autoselect command examples
- queryable  # inferred from query command examples (vc, st, i, ip_config=?, GET ... properties)
- powerable  # inferred: device supports reset and reboot-like operations
```

## Actions
```yaml
# === LW2 Protocol Commands (TCP port 10001) ===

- id: lw2_switch_input_to_output
  label: LW2 Switch Input to Output
  kind: action
  command: "{I@O}"  # e.g. {1@5} = switch Input 1 to Output 5
  params:
    - name: I
      type: integer
      description: Input port number
    - name: O
      type: integer
      description: Output port number

- id: lw2_batch_switch
  label: LW2 Batch Switch (multiple commands within 10ms)
  kind: action
  command: "{02@01}{+06}{05@04}"
  params:
    - name: commands
      type: string
      description: Multiple LW2 commands concatenated; device batches if arrival gap < 10ms

- id: lw2_view_connections
  label: LW2 Display Crosspoint Status (View Connections)
  kind: query
  command: "{vc}"
  params: []

- id: lw2_load_preset
  label: LW2 Load Preset
  kind: action
  command: "{%N}"  # e.g. {%4} loads preset 4
  params:
    - name: N
      type: integer
      description: Preset number (1-based)

- id: lw2_query_input_signal_status
  label: LW2 Query Input Port Signal Status
  kind: query
  command: "{:isd}"
  params: []

- id: lw2_query_ip_config
  label: LW2 Query IP Address Settings
  kind: query
  command: "{ip_config=?}"
  params: []

- id: lw2_set_ip_config
  label: LW2 Set IP Address Settings
  kind: action
  command: "{ip_config=MODE IP PORT NETMASK GATEWAY}"  # e.g. {ip_config=0 192.168.2.106 10001 255.255.000.000 192.168.002.001}
  params:
    - name: MODE
      type: integer
      description: 0 = Static
    - name: IP
      type: string
      description: IPv4 address
    - name: PORT
      type: integer
      description: TCP port number
    - name: NETMASK
      type: string
      description: Subnet mask
    - name: GATEWAY
      type: string
      description: Gateway IPv4 address

- id: lw2_query_health_status
  label: LW2 Query Health Status (voltages, temperature, fans)
  kind: query
  command: "{st}"
  params: []

- id: lw2_query_product_type
  label: LW2 Query Product Type
  kind: query
  command: "{i}"
  params: []

- id: lw2_set_input_edid
  label: LW2 Set EDID on Input Port
  kind: action
  command: "{eE:fF}"  # e.g. {e5:f10} emulates EDID F10 on Input 5
  params:
    - name: E
      type: integer
      description: Input port number (1-based)
    - name: F
      type: string
      description: EDID identifier (e.g. F10 = factory preprogrammed EDID)

# === LW3 Protocol Commands (TCP port 6107) ===

- id: lw3_get_crosspoint_status
  label: LW3 Query Crosspoint Status
  kind: query
  command: "GET /MEDIA/VIDEO/XP.DestinationConnectionList"
  params: []

- id: lw3_switch_input_to_output
  label: LW3 Switch Input to Output
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:switch(I{O}:I{D})"  # e.g. CALL /MEDIA/VIDEO/XP:switch(I4:O1)
  params:
    - name: pairs
      type: string
      description: Semicolon-separated I/O pairs in form (In:On) or (In:Om)

- id: lw3_get_input_signal_present
  label: LW3 Query Input Signal Presence
  kind: query
  command: "GET /MEDIA/VIDEO/I{N}.SignalPresent"
  params:
    - name: N
      type: integer
      description: Input port number (1-based)

- id: lw3_get_input_hdcp_state
  label: LW3 Query Input HDCP State
  kind: query
  command: "GET /MEDIA/VIDEO/I{N}.HdcpState"
  params:
    - name: N
      type: integer
      description: Input port number (1-based)

- id: lw3_mute_sources
  label: LW3 Mute One or More Input Ports
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:muteSource(I1;I4)"
  params:
    - name: sources
      type: string
      description: Semicolon-separated input identifiers (e.g. I1;I4)

- id: lw3_get_source_port_status
  label: LW3 Query Status of Input Ports (single command)
  kind: query
  command: "GET /MEDIA/VIDEO/XP.SourcePortStatus"
  params: []

- id: lw3_get_cpu_temperature
  label: LW3 Query CPU Temperature
  kind: query
  command: "GET /MANAGEMENT/STATUS.CpuTemperature"
  params: []

- id: lw3_get_5v_main
  label: LW3 Query 5V Main Voltage
  kind: query
  command: "GET /MANAGEMENT/STATUS.5VMain"
  params: []

- id: lw3_get_hdbt_stat
  label: LW3 Cable Diagnostics - HDBaseT Error Rates
  kind: query
  command: "GET /REMOTE/S{N}.HdbtStat"
  params:
    - name: N
      type: integer
      description: Source number (1-based)

- id: lw3_get_tx_ber
  label: LW3 Cable Diagnostics - Transmitter BER
  kind: query
  command: "GET /REMOTE/S{N}.TxBer"
  params:
    - name: N
      type: integer
      description: Source number (1-based)

- id: lw3_get_destination_autoselect
  label: LW3 Query Video Input Autoselection Settings
  kind: query
  command: "GET /MEDIA/VIDEO/XP.DestinationPortAutoselect"
  params: []

- id: lw3_set_destination_autoselect
  label: LW3 Set Video Input Autoselection
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:setDestinationPortAutoselect(O{N}:FLAGS)"  # e.g. (O1:EP)
  params:
    - name: N
      type: integer
      description: Output port number (1-based)
    - name: FLAGS
      type: string
      description: Two-character flag string. E=Enabled, D=Disabled; P=Priority, L=Last detect, F=First detect

- id: lw3_set_volume_db
  label: LW3 Set Analog Audio Output Volume (dB)
  kind: action
  command: "SET /MEDIA/AUDIO/O{N}.VolumedB={value}"
  params:
    - name: N
      type: integer
      description: Output port number (1-based)
    - name: value
      type: number
      description: Volume in dB

- id: lw3_get_volume_db
  label: LW3 Query Analog Audio Output Volume (dB)
  kind: query
  command: "GET /MEDIA/AUDIO/O{N}.VolumedB"
  params:
    - name: N
      type: integer
      description: Output port number (1-based)

- id: lw3_get_product_name
  label: LW3 Query Product Name
  kind: query
  command: "GET /.ProductName"
  params: []

- id: lw3_reset_device
  label: LW3 Reset Device
  kind: action
  command: "CALL /SYS:reset()"
  params: []

- id: lw3_get_dhcp_enabled
  label: LW3 Query DHCP State
  kind: query
  command: "GET /MANAGEMENT/NETWORK.DhcpEnabled"
  params: []

- id: lw3_set_dhcp_enabled
  label: LW3 Set DHCP State
  kind: action
  command: "SET /MANAGEMENT/NETWORK.DhcpEnabled={value}"
  params:
    - name: value
      type: boolean
      description: true = DHCP enabled, false = static IP

- id: lw3_set_static_ip
  label: LW3 Set Static IP Address
  kind: action
  command: "SET /MANAGEMENT/NETWORK.StaticIpAddress={ip}"
  params:
    - name: ip
      type: string
      description: IPv4 address (only valid when DhcpEnabled=false)

- id: lw3_set_uart_baudrate
  label: LW3 Set RS-232 Port Baud Rate
  kind: action
  command: "SET /MEDIA/UART/P{N}.Baudrate={code}"  # 2 = 9600; full code table not in source
  params:
    - name: N
      type: integer
      description: UART port number (1-based)
    - name: code
      type: integer
      description: Baud rate code (e.g. 2 = 9600; other codes 0,7 documented but table not provided)

- id: lw3_uart_send_message
  label: LW3 Send Message Over RS-232 Port
  kind: action
  command: 'CALL /MEDIA/UART/P{N}:sendMessage({message})'  # e.g. (C00/r/n); payload closed with /r/n
  params:
    - name: N
      type: integer
      description: UART port number (1-based)
    - name: message
      type: string
      description: Message payload (terminated with /r/n in literal)

- id: lw3_gpio_toggle
  label: LW3 Toggle GPIO Pin Level
  kind: action
  command: "CALL /MEDIA/GPIO/P{N}:toggle({pin})"  # e.g. CALL /MEDIA/GPIO/P1:toggle(1)
  params:
    - name: N
      type: integer
      description: GPIO port number (1-based)
    - name: pin
      type: integer
      description: GPIO pin number

- id: lw3_tcp_send_text
  label: LW3 Send Text Message Over Ethernet
  kind: action
  command: 'CALL /MEDIA/ETHERNET:tcpText({addr}={msg})'  # e.g. 192.168.0.11:9715=C00
  params:
    - name: addr
      type: string
      description: Target IP:port (e.g. 192.168.0.11:9715)
    - name: msg
      type: string
      description: Text message to send
```

## Feedbacks
```yaml
# LW2 protocol feedback examples (responses are wrapped in round brackets, terminated by CrLf)
- id: lw2_switch_ack
  type: string
  description: LW2 successful switch acknowledgement. Example: "(O05 I01)CrLf"

- id: lw2_mute_ack
  type: string
  description: LW2 mute acknowledgement. Example: "(0MT06)CrLf"

- id: lw2_view_connections_response
  type: string
  description: LW2 crosspoint status. Example: "(ALL M01 L01 01 01 02 02 02 U02)CrLf" - eight groups for outputs 1-8; M=muted, L=locked, U=muted and locked

- id: lw2_preset_loaded
  type: string
  description: LW2 preset loaded acknowledgement. Example: "(LPR04)CrLf"

- id: lw2_input_signal_status
  type: string
  description: LW2 input signal status. Example: "(ISD 110000001)CrLf" - 1=signal present, 0=absent, per input

- id: lw2_ip_config_response
  type: string
  description: LW2 IP config. Example: "(IP_CONFIG=0 192.168.2.106 10001 255.255.000.000 192.168.002.001)CrLf" - MODE IP PORT NETMASK GATEWAY

- id: lw2_health_status
  type: string
  description: LW2 health status. Multi-line response. Example: "(ST CPU 3.32V 5.03V 3.05V 5.03V 12.11V 31.6C)CrLf" plus per-fan lines like "(ST FAN#1 1530RPM)CrLf"

- id: lw2_product_type
  type: string
  description: LW2 product type. Example: "(I: MX-FR17)CrLf"

- id: lw2_edid_set_ok
  type: string
  description: LW2 EDID applied. Example: "(E_SW_OK)CrLf" followed after delay by "(E_S_C) CrLf"

# LW3 protocol feedback prefixes
- id: lw3_method_ok
  type: string
  description: LW3 successful method execution. Prefix "mO". Example: "mO /MEDIA/VIDEO/XP:switch"

- id: lw3_method_error
  type: string
  description: LW3 method error. Prefix "mE" followed by error code

- id: lw3_property_read
  type: string
  description: LW3 read-only property response. Prefix "pR" or "pr". Example: "pr /MEDIA/VIDEO/XP.DestinationConnectionList=I1;I3;I1;I3"

- id: lw3_property_write
  type: string
  description: LW3 property write acknowledgement. Prefix "pw". Example: "pw /MEDIA/AUDIO/O2.VolumedB=-15.00"

- id: lw3_change_notification
  type: string
  description: LW3 asynchronous subscription change notification. Example: "CHG /MEDIA/VIDEO/QUALITY.QualityMode=video"

- id: lw3_subscription_ack
  type: string
  description: LW3 subscription open acknowledgement. Example: "o- /MEDIA/VIDEO/*"

- id: lw3_manual_response
  type: string
  description: LW3 node manual. Prefix "pm". Example: "pm /MEDIA/VIDEO/O1.Pwr5vMode [\"0\" | \"1\" | \"2\"] 0 - Auto, 1 - Always On, 2 - Always Off"

- id: lw3_source_port_status
  type: string
  description: LW3 source port status. Semicolon-separated groups of 5 chars. Example: "T000F;M000A;T00EF;L00AA;U000A;T000A". Position 1: T=unmuted/unlocked, M=muted, L=locked, U=locked+muted. Position 3: embedded audio present. Position 4: source connected, signal present.
```

## Safety
```yaml
confirmation_required_for:
  - lw3_reset_device  # device restart terminates Ethernet, RS-232, USB connections
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings beyond the reset side-effect noted above.
```

## Notes
- LW2 and LW3 are independent protocols on different TCP ports (LW2=10001, LW3=6107) over the same Ethernet interface. Both use plain ASCII, no authentication, no encryption.
- LW2 commands use curly-brace `{ }` framing; responses use round-bracket `( )` framing terminated with CrLf.
- LW3 is case-sensitive; node paths are slash-delimited starting from root. Three command verbs: GET (read), SET (write), CALL (execute method).
- LW3 supports subscriptions via `OPEN /path/*`; changed child properties emit asynchronous `CHG` notifications.
- LW3 query manual for any node via `MAN /path`.
- LW2 batch switching: send multiple switch commands with < 10 ms gap; device collects and executes together.
- LW3 UART `Baudrate` codes: source documents `2=9600`, `0` and `7` mentioned but no complete mapping table; treat other codes as UNRESOLVED.
- Refined source contains example responses referencing other Lightware models (MX-FR17, VINX-120-HDMI-ENC); commands are generic Lightware matrix/AV protocol surface and assumed applicable to UBEX Pro20 HDMI F100 Red 2xCAT.
- Source URL: `docs/pdfs/lightware_ubex_pro20_hdmi_f100_red_2xcat_unknown.refined.md`

<!-- UNRESOLVED: firmware version range not stated in source. Full LW3 node tree not enumerated beyond examples — additional properties/methods (network, status, GPIO direction, EDID sub-nodes) exist but not documented in the refined excerpt. UART baud-rate code mapping (values 0, 2, 7 mentioned but not fully tabulated) is incomplete. -->

## Provenance

```yaml
source_domains:
  - go.lightware.com
  - manualslib.com
source_urls:
  - https://go.lightware.com/open-api-environment
  - https://go.lightware.com/ubex-pum
  - https://www.manualslib.com/manual/2159844/Lightware-Ubex-Pro20-Hdmi-F100.html
retrieved_at: 2026-06-29T18:32:52.660Z
last_checked_at: 2026-06-30T07:10:07.655Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:10:07.655Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "All 33 spec actions matched verbatim in source; LW2 and LW3 command sets fully represented. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not state firmware version range; some examples reference unrelated model names (MX-FR17, VINX-120-HDMI-ENC) suggesting the refined doc spans multiple Lightware products. Commands included here are those documented generically; per-port applicability to the UBEX Pro20 specifically is inferred."
- "source contains no explicit safety warnings beyond the reset side-effect noted above."
- "firmware version range not stated in source. Full LW3 node tree not enumerated beyond examples — additional properties/methods (network, status, GPIO direction, EDID sub-nodes) exist but not documented in the refined excerpt. UART baud-rate code mapping (values 0, 2, 7 mentioned but not fully tabulated) is incomplete."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
