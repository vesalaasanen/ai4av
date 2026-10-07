---
spec_id: admin/yamaha-mcp1-control
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha MCP1 Control Spec"
manufacturer: Yamaha
model_family: MCP1
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - MCP1
  firmware: "V5.0.0 and later"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - data.yamaha.com
  - europe.yamaha.com
source_urls:
  - https://data.yamaha.com/files/download/other_assets/5/2230685/MCP1-remote-V100_en.pdf
  - "https://europe.yamaha.com/en/products/contents/proaudio/downloads/technical_docs/index.html?c=proaudio&l=en&p=27"
retrieved_at: 2026-06-02T00:14:05.314Z
last_checked_at: 2026-10-07T13:27:21.959Z
generated_at: 2026-10-07T13:27:21.959Z
firmware_coverage: "V5.0.0 and later"
protocol_coverage: []
known_gaps:
  - "no pinout or physical connector details in source"
  - "no power-on sequencing or hardware interlock details in source"
  - "IP address assignment method (DHCP vs static) not documented"
  - "maximum command length not specified beyond TooLongCommand error code"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:27:21.959Z
  matched_actions: 19
  action_count: 19
  confidence: medium
  summary: "All 19 action units match source commands literally; port 49280 supported; auth honestly UNRESOLVED; spec covers the source catalogue. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Yamaha MCP1 Control Spec

## Summary

Yamaha MCP1 is an MC Link Controller controllable via Ethernet (TCP/IP) on port 49280. Protocol uses ASCII command strings terminated by LF (0x0A). Supports up to 8 simultaneous remote controller connections. Commands cover device status queries, run mode changes, character encoding and keepalive configuration, preset recall, and product information queries.

<!-- UNRESOLVED: no pinout or physical connector details in source -->

## Transport

```yaml
protocols:
  - tcp
addressing:
  port: 49280
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits

```yaml
traits:
  - queryable    # inferred: multiple query commands (devstatus, devinfo, sscurrent, ssnum, ssinfo)
```

## Actions

```yaml
actions:
  - id: devstatus_runmode_query
    label: Device Run Mode Query
    kind: query
    command: "devstatus runmode"
    params: []
    response: "OK devstatus runmode \"{mode}\""
    notes: Must be sent first to establish remote control session. Send at ≥1s intervals until device responds with normal mode.

  - id: devstatus_error_query
    label: Device Error Status Query
    kind: query
    command: "devstatus error"
    params: []
    response: "OK devstatus error \"{status}\""

  - id: devmode_normal
    label: Set Run Mode Normal
    kind: action
    command: "devmode normal"
    params: []
    response: "OK devmode normal"

  - id: devmode_emergency
    label: Set Run Mode Emergency
    kind: action
    command: "devmode emergency"
    params: []
    response: "OK devmode emergency"

  - id: scpmode_encoding
    label: Set Character Encoding
    kind: action
    command: "scpmode encoding {mode}"
    params:
      - name: mode
        type: enum
        values:
          - ascii
          - utf8
        description: "Character encoding mode (default: ascii)"
    response: "OK scpmode encoding {mode}"

  - id: scpmode_keepalive
    label: Set Keepalive Interval
    kind: action
    command: "scpmode keepalive {interval}"
    params:
      - name: interval
        type: integer
        description: "Timeout value in milliseconds (minimum 1000). Actual timeout increased by 1 second."
    response: "OK scpmode keepalive {interval}"

  - id: sscurrent_query
    label: Current Preset Number Query
    kind: query
    command: "sscurrent"
    params: []
    response: "OK sscurrent {index} {state}"
    notes: "Response state is 'unmodified' or 'modified' indicating whether parameters changed after preset recall."

  - id: ssrecall
    label: Preset Recall
    kind: action
    command: "ssrecall {index}"
    params:
      - name: index
        type: integer
        description: Preset index number to recall
    response: "OK ssrecall {index}"

  - id: devinfo_protocolver
    label: Protocol Version Query
    kind: query
    command: "devinfo protocolver"
    params: []
    response: "OK devinfo protocolver \"{version}\""

  - id: devinfo_version
    label: Firmware Version Query
    kind: query
    command: "devinfo version"
    params: []
    response: "OK devinfo version \"{version}\""

  - id: devinfo_productname
    label: Product Name Query
    kind: query
    command: "devinfo productname"
    params: []
    response: "OK devinfo productname \"{name}\""

  - id: devinfo_serialno
    label: Serial Number Query
    kind: query
    command: "devinfo serialno"
    params: []
    response: "OK devinfo serialno \"{serialno}\""

  - id: devinfo_deviceid
    label: Device ID Query
    kind: query
    command: "devinfo deviceid"
    params: []
    response: "OK devinfo deviceid \"{deviceid}\""
    notes: Device ID corresponds to UNIT ID. 3-digit hexadecimal.

  - id: devinfo_devicename
    label: Device Name Query
    kind: query
    command: "devinfo devicename"
    params: []
    response: "OK devinfo devicename \"{devicename}\""
    notes: Character encoding follows scpmode encoding setting.

  - id: ssnum_query
    label: Preset Count Query
    kind: query
    command: "ssnum"
    params: []
    response: "OK ssnum {count}"

  - id: ssinfo_query
    label: Nth Preset Information Query
    kind: query
    command: "ssinfo {index}"
    params:
      - name: index
        type: integer
        description: "Requested index number; range UNRESOLVED"
    response: "OK ssinfo {index} \"{display_number}\" {attribute} \"{title}\" \"{comment}\""
    notes: "Attribute values: preinst, reserve, user, empty. Character encoding for preset titles and comments follows scpmode encoding."
```

## Feedbacks

```yaml
feedbacks:
  - id: notify_devstatus_runmode
    type: enum
    values:
      - emergency
      - update
      - normal
    description: "Unsolicited run mode change notification. Command: NOTIFY devstatus runmode \"{mode}\""
    query_command: "devstatus runmode"

  - id: notify_devstatus_error
    type: string
    description: "Unsolicited error/alert notification. Command: NOTIFY devstatus error \"{alert}\". Alert format: type/message//xnnn onf (sssss) ID-xxx date time."
    query_command: "devstatus error"

  - id: notify_sscurrent
    type: integer
    description: "Unsolicited current preset number change notification. Command: NOTIFY sscurrent {index}"
    query_command: "sscurrent"

  - id: notify_ssrecall
    type: integer
    description: "Unsolicited preset recall start notification. Command: NOTIFY ssrecall {index}"

  - id: command_error
    type: enum
    values:
      - UnknownCommand
      - WrongFormat
      - InvalidArgument
      - UnknownAddress
      - UnknownEventID
      - TooLongCommand
      - AccessDenied
      - Busy
      - ReadOnly
      - NoPermission
      - InternalError
    description: "Error response. Syntax: ERROR {command} {error_code}"
```

## Variables

```yaml
variables:
  - id: run_mode
    type: enum
    values:
      - emergency
      - update
      - normal
    access: read_write
    description: Device run mode. Queried via devstatus runmode, set via devmode command.

  - id: encoding_mode
    type: enum
    values:
      - ascii
      - utf8
    access: read_write
    description: Character encoding for responses and notifications. Set via scpmode encoding.

  - id: keepalive_interval
    type: integer
    access: read_write
    description: Keepalive timeout in msec (min 1000). Actual timeout = value + 1 second. Set via scpmode keepalive.

  - id: current_preset
    type: integer
    access: read_write
    description: Current preset index. Queried via sscurrent, recalled via ssrecall.
```

## Events

```yaml
events:
  - id: runmode_changed
    description: "Device run mode changed. NOTIFY devstatus runmode \"{mode}\""
    payload_type: enum
    payload_values: [emergency, update, normal]

  - id: error_alert
    description: "Device error/alert occurred or cleared. NOTIFY devstatus error \"{alert}\""
    payload_type: string

  - id: preset_changed
    description: "Current preset changed. NOTIFY sscurrent {index}"
    payload_type: integer

  - id: preset_recall_started
    description: "Preset recall processing started. NOTIFY ssrecall {index}"
    payload_type: integer
```

## Macros

```yaml
macros:
  - id: establish_connection
    label: Establish Remote Control Connection
    steps:
      - action: devstatus_runmode_query
        notes: "Send devstatus runmode at ≥1s intervals until response received"
      - condition: "Response is OK devstatus runmode \"normal\""
        notes: "Device ready. Begin sending control commands."
```

## Safety

```yaml
confirmation_required_for:
  - devmode_emergency
interlocks:
  - description: "Preset recall (ssrecall) rejected in emergency run mode - device returns AccessDenied error"
# UNRESOLVED: no power-on sequencing or hardware interlock details in source
```

## Notes

- Commands are ASCII strings terminated by LF (0x0A). At least one space separates command name from options and options from each other.
- LF (0x0A) alone can serve as heartbeat/keepalive.
- Up to 8 simultaneous remote controller connections per MCP1.
- Communication start sequence required: controller must poll `devstatus runmode` at ≥1s intervals until device responds with `OK devstatus runmode "normal"`.
- Keepalive prevents stale connections after unexpected disconnect. After activation, controller must send any command or LF within timeout or device terminates the connection.
- `ssinfo` command listed in source table (3-8) but response parsing and index parameter are documented — however the source has a typo showing `sssinfo` in the example.
- Error responses use syntax `ERROR {command} {error_code}`.

<!-- UNRESOLVED: IP address assignment method (DHCP vs static) not documented -->
<!-- UNRESOLVED: maximum command length not specified beyond TooLongCommand error code -->
````

## Provenance

```yaml
source_domains:
  - data.yamaha.com
  - europe.yamaha.com
source_urls:
  - https://data.yamaha.com/files/download/other_assets/5/2230685/MCP1-remote-V100_en.pdf
  - "https://europe.yamaha.com/en/products/contents/proaudio/downloads/technical_docs/index.html?c=proaudio&l=en&p=27"
retrieved_at: 2026-06-02T00:14:05.314Z
last_checked_at: 2026-10-07T13:27:21.959Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:27:21.959Z
matched_actions: 19
action_count: 19
confidence: medium
summary: "All 19 action units match source commands literally; port 49280 supported; auth honestly UNRESOLVED; spec covers the source catalogue. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no pinout or physical connector details in source"
- "no power-on sequencing or hardware interlock details in source"
- "IP address assignment method (DHCP vs static) not documented"
- "maximum command length not specified beyond TooLongCommand error code"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
