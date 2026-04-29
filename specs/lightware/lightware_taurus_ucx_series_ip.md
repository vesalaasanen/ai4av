---
schema_version: ai4av-public-spec-v1
device_id: lightware/taurus-ucx-series
entity_id: lightware_taurus_ucx_series
spec_id: admin/lightware-taurus-ucx-series
revision: 1
author: admin
title: "Lightware Taurus UCX Series Control Spec"
status: published
manufacturer: Lightware
manufacturer_key: lightware
model_family: "Taurus UCX Series"
aliases: []
compatible_with:
  manufacturers:
    - Lightware
  models:
    - "Taurus UCX Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: lightware_taurus_ucx_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T08:05:22.856Z
retrieved_at: 2026-04-23T08:05:22.856Z
last_checked_at: 2026-04-23T08:05:22.856Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "Not stated in exported source metadata."
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T08:05:22.856Z
  matched_actions: 15
  action_count: 15
  confidence: high
  summary: "All 15 spec actions matched literally in source; transport verified; comprehensive LW2 and LW3 protocol coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# Lightware Taurus UCX Series Control Spec

## Summary
Matrix switcher supporting USB-C, HDMI, and analog audio routing. Controlled via Ethernet using LW2 protocol (port 10001) or LW3 protocol (port 6107). RS-232 also available for serial control. Supports input/output routing, crosspoint presets, mute, EDID management, HDCP control, volume adjustment, and device health monitoring.

<!-- UNRESOLVED: device physical port count not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial  # RS-232 available; config settable via LW3
addressing:
  port: 10001  # LW2 protocol
  port_alt: 6107  # LW3 protocol
serial:
  baud_rate: 9600  # default baud rate; configurable via LW3
  data_bits: 8
  parity: none
  stop_bits: 1
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: lw2_switch
  label: LW2 Switch Input to Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: output
      type: integer
      description: Output number (1-based)
  example: "{1@5}"  # Input 1 to Output 5

- id: lw3_switch
  label: LW3 Switch Input to Output
  kind: action
  params:
    - name: destination
      type: string
      description: "Destination: <input>:<output>, e.g. I4:O1"
  example: "CALL /MEDIA/VIDEO/XP:switch(I4:O1)"

- id: load_preset
  label: Load Crosspoint Preset
  kind: action
  params:
    - name: preset_number
      type: integer
      description: Preset number (1-based)
  example: "{%4}"  # Load preset 4

- id: lw2_mute_source
  label: LW2 Mute Source
  kind: action
  params:
    - name: input
      type: integer
      description: Input number to mute
  example: "{+06}"  # Mute input 6

- id: lw3_mute_source
  label: LW3 Mute Source Ports
  kind: action
  params:
    - name: inputs
      type: string
      description: Semicolon-separated input list, e.g. "I1;I4"
  example: "CALL /MEDIA/VIDEO/XP:muteSource(I1;I4)"

- id: set_edid
  label: Set EDID on Input Port
  kind: action
  params:
    - name: input
      type: string
      description: Input port (e.g. "e5" for Input 5)
    - name: edid
      type: string
      description: EDID number or hex code
  example: "{e5:f10}"

- id: set_autoselect
  label: Set Video Input Autoselection
  kind: action
  params:
    - name: output
      type: string
      description: Output port (e.g. "O1")
    - name: mode
      type: string
      description: "Autoselect mode: E=enable, P=priority, L=last detect, D=disable"
  example: "CALL /MEDIA/VIDEO/XP:setDestinationPortAutoselect(O1:EP)"

- id: set_volume_db
  label: Set Audio Volume (dB)
  kind: action
  params:
    - name: output
      type: string
      description: Output port (e.g. "O2")
    - name: volume_db
      type: number
      description: Volume in dB (range implied by hardware)
  example: "SET /MEDIA/AUDIO/O2.VolumedB=-15"

- id: lw3_toggle_gpio
  label: Toggle GPIO Pin
  kind: action
  params:
    - name: pin
      type: integer
      description: GPIO pin number
  example: "CALL /MEDIA/GPIO/P1:toggle(1)"

- id: reset_device
  label: Reset Device
  kind: action
  params: []
  example: "CALL /SYS:reset()"

- id: set_static_ip
  label: Set Static IP Address
  kind: action
  params:
    - name: ip
      type: string
      description: Static IP address
  example: "SET /MANAGEMENT/NETWORK.StaticIpAddress=192.168.0.85"

- id: set_dhcp_enabled
  label: Set DHCP Enabled
  kind: action
  params:
    - name: enabled
      type: boolean
      description: "true to enable DHCP, false for static IP"
  example: "SET /MANAGEMENT/NETWORK.DhcpEnabled=false"

- id: set_baudrate
  label: Set RS-232 Baud Rate
  kind: action
  params:
    - name: baudrate_code
      type: integer
      description: "Baud rate code: 0-7"
  example: "SET /MEDIA/UART/P1.Baudrate=2"

- id: send_rs232_message
  label: Send RS-232 Message
  kind: action
  params:
    - name: message
      type: string
      description: Message to send via serial port
  example: "CALL /MEDIA/UART/P1:sendMessage(C00/r/n)"

- id: send_ethernet_message
  label: Send Ethernet Message
  kind: action
  params:
    - name: target
      type: string
      description: "Target IP:port"
    - name: message
      type: string
      description: Message content
  example: "CALL /MEDIA/ETHERNET:tcpText(192.168.0.11:9715=C00)"
```

## Feedbacks
```yaml
- id: lw2_crosspoint_status
  label: LW2 Crosspoint Status
  type: string
  description: "8-group response showing input assignments per output. M=muted, L=locked, U=muted+locked."
  example: "(ALL M01 L01 01 01 02 02 02 U02)"

- id: lw3_crosspoint_status
  label: LW3 Crosspoint Status
  type: string
  description: "Semicolon-separated list of inputs per output"
  example: "pr /MEDIA/VIDEO/XP.DestinationConnectionList=I1;I3;I1;I3"

- id: source_port_status
  label: Source Port Status
  type: string
  description: "6-char group per input: Letter(T/M/L/U) + HEX status. T=unmuted/unlocked, M=muted, L=locked, U=locked+muted, hex encodes audio/HDCP/connection/signal"
  example: "T00EF"

- id: input_signal_present
  label: Input Signal Present
  type: boolean
  description: "'1' = signal present, '0' = no signal"
  example: "pr /MEDIA/VIDEO/I1.SignalPresent=1"

- id: input_hdcp_state
  label: Input HDCP State
  type: boolean
  description: "'1' = HDCP enabled, '0' = disabled"
  example: "pr /MEDIA/VIDEO/I1.HdcpState=1"

- id: autoselect_status
  label: Autoselect Status
  type: string
  description: "Two-letter code: E=enable, P=priority, L=last detect, D=disable"
  example: "pr /MEDIA/VIDEO/XP.DestinationPortAutoselect=EL"
```

## Variables
```yaml
- id: volume_db
  label: Audio Volume (dB)
  type: number
  path: "/MEDIA/AUDIO/O{port}.VolumedB"
  example: "-15.00"

- id: hdcp_state
  label: HDCP State
  type: boolean
  path: "/MEDIA/VIDEO/I{port}.HdcpState"
  example: "1"

- id: signal_present
  label: Signal Present
  type: boolean
  path: "/MEDIA/VIDEO/I{port}.SignalPresent"
  example: "1"

- id: static_ip_address
  label: Static IP Address
  type: string
  path: "/MANAGEMENT/NETWORK.StaticIpAddress"
  example: "192.168.0.85"

- id: dhcp_enabled
  label: DHCP Enabled
  type: boolean
  path: "/MANAGEMENT/NETWORK.DhcpEnabled"
  example: "true"

- id: ip_config
  label: IP Configuration
  type: string
  description: "Static flag, IP, port, subnet, gateway"
  example: "IP_CONFIG=0 192.168.2.106 10001 255.255.000.000 192.168.002.001"
```

## Events
```yaml
# UNRESOLVED: explicit unsubscribe mechanism not detailed; OPEN/CALL with subscription
# yields asynchronous CHG messages when properties change. Unsolicited event format
# confirmed but full event list not enumerated in source.
```

## Macros
```yaml
# Batch switching: send multiple switch commands within 10ms to group-execute
# Example: "{02@01}{+06}{05@04}" executes three switches atomically
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
LW2 protocol uses `{command}` syntax with `(response)` on success. LW3 uses tree-based GET/SET/CALL with prefixes: `mO`=method OK, `mE`=error, `pR`=property read. Both protocols can coexist on the same device via different ports. RS-232 pass-through (TPS) allows remote serial control over the Ethernet connection. Batch switching groups commands within 10ms for atomic execution.
<!-- UNRESOLVED: physical port count (number of inputs/outputs) not stated in source -->
<!-- UNRESOLVED: firmware version not stated in source -->
<!-- UNRESOLVED: EDID custom creation procedure not detailed in source -->
<!-- UNRESOLVED: GPIO pin count/direction settings not enumerated in source -->
<!-- UNRESOLVED: DHCP/static IP default state not explicitly confirmed in source -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: lightware_taurus_ucx_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T08:05:22.856Z
retrieved_at: 2026-04-23T08:05:22.856Z
last_checked_at: 2026-04-23T08:05:22.856Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:05:22.856Z
matched_actions: 15
action_count: 15
confidence: high
summary: "All 15 spec actions matched literally in source; transport verified; comprehensive LW2 and LW3 protocol coverage confirmed."
```

## Known Gaps

```yaml
[]
```
