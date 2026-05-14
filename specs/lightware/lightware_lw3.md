---
spec_id: admin/lightware-lw3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lightware LW3 Control Spec"
manufacturer: Lightware
model_family: "LW3 compatible devices"
aliases: []
compatible_with:
  manufacturers:
    - Lightware
  models:
    - "LW3 compatible devices"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - archive.lightware.com
  - go.lightware.com
  - academy.lightware.com
source_urls:
  - https://archive.lightware.com/pub/media/lightware/filedownloader/file/Lightware_s_Open_API_Environment_v1.pdf
  - https://go.lightware.com/ucx-s-hum
  - https://go.lightware.com/ucx-s-pum
  - https://academy.lightware.com/courses/device-control-methods-protocols-level-3
  - https://go.lightware.com/open-api-environment
retrieved_at: 2026-04-30T00:07:53.976Z
last_checked_at: 2026-04-27T09:04:50.206Z
generated_at: 2026-04-27T09:04:50.206Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-27T09:04:50.206Z
  matched_actions: 13
  action_count: 13
  confidence: high
  summary: "All 13 semantic-id spec actions matched to documented LW3 commands; transport port and baud verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Lightware LW3 Control Spec

## Summary
ASCII-based control protocol for Lightware AV devices (matrix switchers, signal extenders, distribution amplifiers) since 2012. Tree-structured with GET/SET/CALL primitives over Ethernet (TCP port 6107), RS-232, and USB. No authentication required.

<!-- UNRESOLVED: specific model numbers not enumerated in source — "LW3 compatible devices" per source language -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 6107  # LW3 over Ethernet; LW2 uses port 10001 per source
serial:
  baud_rate: 9600  # default per source (SET /MEDIA/UART/P1.Baudrate=2)
  data_bits: 8
  parity: none
  stop_bits: 1
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred: /SYS:reset() present
- routable     # inferred: crosspoint switch commands present
- queryable    # inferred: GET commands returning state present
- levelable    # inferred: /MEDIA/AUDIO/O2.VolumedB SET present
```

## Actions
```yaml
- id: get_property
  label: GET property
  kind: action
  params:
    - name: path
      type: string
      description: LW3 node path (e.g. /MEDIA/VIDEO/XP.DestinationConnectionList)

- id: set_property
  label: SET property
  kind: action
  params:
    - name: path
      type: string
      description: LW3 node path (e.g. /MANAGEMENT/NETWORK.StaticIpAddress)
    - name: value
      type: string
      description: New value for the property

- id: call_method
  label: CALL method
  kind: action
  params:
    - name: path
      type: string
      description: LW3 node path with method name (e.g. /MEDIA/VIDEO/XP:switch)
    - name: args
      type: string
      description: Arguments in parentheses (e.g. I4:O1)

- id: switch_crosspoint
  label: Switch crosspoint
  kind: action
  params:
    - name: mapping
      type: string
      description: Input to output mapping (e.g. I4:O1 or I1;I3:O1:O2)

- id: mute_source
  label: Mute source ports
  kind: action
  params:
    - name: inputs
      type: string
      description: Semicolon-separated input port list (e.g. I1;I4)

- id: set_autoselect
  label: Set video input autoselection
  kind: action
  params:
    - name: output
      type: string
      description: Output port (e.g. O1)
    - name: mode
      type: string
      description: Mode letters (E=enabled, L=last detect, P=priority)

- id: set_volume
  label: Set audio output volume
  kind: action
  params:
    - name: output
      type: string
      description: Output port (e.g. O2)
    - name: level
      type: string
      description: Volume in dB (e.g. -15) or percent

- id: set_static_ip
  label: Set static IP address
  kind: action
  params:
    - name: ip
      type: string
      description: IPv4 address (e.g. 192.168.0.85)

- id: set_baudrate
  label: Set RS-232 baud rate
  kind: action
  params:
    - name: rate_code
      type: integer
      description: Baud rate code (0-7); 2 = 9600 per source

- id: send_serial_message
  label: Send serial message
  kind: action
  params:
    - name: port
      type: string
      description: Serial port node (e.g. P1)
    - name: message
      type: string
      description: Message text with /r/n terminator

- id: toggle_gpio
  label: Toggle GPIO pin
  kind: action
  params:
    - name: pin
      type: integer
      description: GPIO pin number

- id: send_tcp_text
  label: Send TCP message over Ethernet
  kind: action
  params:
    - name: target
      type: string
      description: IP:port target (e.g. 192.168.0.11:9715)
    - name: message
      type: string
      description: Message text

- id: reset_device
  label: Reset device
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: method_ok
  label: Method OK
  description: Command executed successfully
  prefix: "mO"

- id: method_error
  label: Method Error
  description: Command failed; error code follows
  prefix: "mE"

- id: property_read
  label: Property Read response
  description: Read-only property value
  prefix: "pr"

- id: property_write
  label: Property Write response
  description: Property value after SET
  prefix: "pw"

- id: change_notification
  label: Change notification
  description: Asynchronous property change (subscribed node)
  prefix: "CHG"
```

## Variables
```yaml
# Read/write properties discovered in source:
- id: DestinationConnectionList
  path: /MEDIA/VIDEO/XP.DestinationConnectionList
  type: string
  description: Semicolon-separated input-per-output mapping (e.g. I1;I3;I1;I3)

- id: DestinationPortAutoselect
  path: /MEDIA/VIDEO/XP.DestinationPortAutoselect
  type: string
  description: Autoselect mode letters (E/L/P)

- id: VolumedB
  path: /MEDIA/AUDIO/O{N}.VolumedB
  type: number
  description: Volume level in dB

- id: DhcpEnabled
  path: /MANAGEMENT/NETWORK.DhcpEnabled
  type: boolean
  description: DHCP enable state

- id: StaticIpAddress
  path: /MANAGEMENT/NETWORK.StaticIpAddress
  type: string
  description: Static IPv4 address

- id: Baudrate
  path: /MEDIA/UART/P1.Baudrate
  type: integer
  description: Serial baud rate code (0-7); 2 = 9600

# Read-only properties discovered in source:
- id: SignalPresent
  path: /MEDIA/VIDEO/I{N}.SignalPresent
  type: boolean
  description: Video signal presence (1=present, 0=absent)

- id: HdcpState
  path: /MEDIA/VIDEO/I{N}.HdcpState
  type: integer
  description: HDCP state (1=enabled, 0=disabled)

- id: SourcePortStatus
  path: /MEDIA/VIDEO/XP.SourcePortStatus
  type: string
  description: Port status codes (T/M/L/U + hex flags per port, semicolon-separated)

- id: CpuTemperature
  path: /MANAGEMENT/STATUS.CpuTemperature
  type: string
  description: CPU temperature in Celsius

- id: 5VMain
  path: /MANAGEMENT/STATUS.5VMain
  type: string
  description: 5V rail voltage reading

- id: HdbtStat
  path: /REMOTE/S{N}.HdbtStat
  type: string
  description: HDBT cable error rates in dB (4 values, comma-separated)

- id: TxBer
  path: /REMOTE/S{N}.TxBer
  type: string
  description: Transmitter bit error ratio (scientific notation)

- id: ProductName
  path: /.ProductName
  type: string
  description: Device product name (read-only)
```

## Events
```yaml
# Subscribed property changes (asynchronous):
# Format: CHG <path>=<value>
# Example: CHG /MEDIA/VIDEO/QUALITY.QualityMode=video
# Subscription: OPEN /MEDIA/VIDEO/*
```

## Macros
```yaml
- id: batch_switch
  label: Batch switching
  description: Multiple switch commands arriving within 10ms are collected and executed atomically as a single crosspoint change
  steps:
    - Multiple {<input>@<output>} commands sent within 10ms
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
LW3 commands over Ethernet use TCP port 6107. LW2 uses TCP port 10001 (per source). LW3 is case-sensitive, tree-structured with slash-separated node paths. Response prefixes: `mO` = method OK, `mE` = method error, `pr` = property read, `pw` = property write. Commands terminated with CR+LF. Subscription model via `OPEN <node>/*` pattern enables asynchronous change notifications prefixed with `CHG`. EDID management commands partially documented ({e5:f10} syntax in LW2; full LW3 EDID node paths not shown in source).
<!-- UNRESOLVED: full LW3 node tree not documented in source — device-specific; source recommends per-device User Manual Chapter 5-8 for LW3 Programmer's Reference -->
<!-- UNRESOLVED: GPIO pin count and capabilities not stated in source -->
<!-- UNRESOLVED: USB control command syntax not detailed in source -->
<!-- UNRESOLVED: DHCH state query (GET /MANAGEMENT/NETWORK.DhcpEnabled) shown but DHCP setting via SET not documented with example -->

## Provenance

```yaml
source_domains:
  - archive.lightware.com
  - go.lightware.com
  - academy.lightware.com
source_urls:
  - https://archive.lightware.com/pub/media/lightware/filedownloader/file/Lightware_s_Open_API_Environment_v1.pdf
  - https://go.lightware.com/ucx-s-hum
  - https://go.lightware.com/ucx-s-pum
  - https://academy.lightware.com/courses/device-control-methods-protocols-level-3
  - https://go.lightware.com/open-api-environment
retrieved_at: 2026-04-30T00:07:53.976Z
last_checked_at: 2026-04-27T09:04:50.206Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T09:04:50.206Z
matched_actions: 13
action_count: 13
confidence: high
summary: "All 13 semantic-id spec actions matched to documented LW3 commands; transport port and baud verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
