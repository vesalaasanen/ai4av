---
spec_id: admin/yamaha-mcp1
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
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - usa.yamaha.com
source_urls:
  - https://usa.yamaha.com/files/download/other_assets/5/2230685/MCP1-remote-V100_en.pdf
retrieved_at: 2026-06-12T01:44:11.515Z
last_checked_at: 2026-10-01T11:03:00.961Z
generated_at: 2026-10-01T11:03:00.961Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no settable continuous parameters found in source (all control is discrete command-based)"
  - "source mentions \"emergency\" run mode but does not detail interlock or safety sequencing requirements"
  - "maximum concurrent command rate / throttling not stated in source"
  - "connection timeout when no keepalive set not stated in source"
  - "preset index range (min/max) not explicitly stated in source"
verification:
  verdict: verified
  checked_at: 2026-10-01T11:03:00.961Z
  matched_actions: 15
  action_count: 15
  confidence: medium
  summary: "All 15 spec actions match the source's command catalogue; transport TCP port 49280 is verified; spec is a complete representation. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Yamaha MCP1 Control Spec

## Summary

The Yamaha MCP1 is a remote-controllable AV processor managed over Ethernet via TCP. The control protocol uses newline-terminated ASCII command strings. This spec covers device status queries, run mode control, preset recall, product info queries, and unsolicited change notifications. Up to eight controllers may connect simultaneously.

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
  - queryable  # inferred: multiple query commands (devstatus, devinfo, sscurrent, ssnum, ssinfo)
```

## Actions

```yaml
actions:
  - id: devstatus_runmode_query
    label: Device Run Mode Query
    kind: query
    command: "devstatus runmode"
    params: []
    description: Queries the current run mode of the device. Must be sent to establish initial communication.

  - id: devstatus_error_query
    label: Device Error Status Query
    kind: query
    command: "devstatus error"
    params: []
    description: Queries the current error/alert status.

  - id: devmode_set
    label: Set Device Run Mode
    kind: action
    command: "devmode {mode}"
    params:
      - name: mode
        type: enum
        values: [normal, emergency]
        description: Target run mode
    description: Changes the device run mode.

  - id: scpmode_encoding_set
    label: Set Character Encoding
    kind: action
    command: "scpmode encoding {encoding}"
    params:
      - name: encoding
        type: enum
        values: [ascii, utf8]
        description: Character encoding mode (default: ascii)
    description: Sets the encoding for result and notification strings.

  - id: scpmode_keepalive_set
    label: Set Keepalive Interval
    kind: action
    command: "scpmode keepalive {interval}"
    params:
      - name: interval
        type: integer
        description: Timeout value in milliseconds (minimum 1000). Actual timeout is increased by 1 second.
    description: Activates keepalive monitoring. Controller must send any command or LF within the interval.

  - id: sscurrent_query
    label: Current Preset Number Query
    kind: query
    command: "sscurrent"
    params: []
    description: Queries the last recalled preset index number and whether parameters have been modified.

  - id: ssrecall
    label: Recall Preset
    kind: action
    command: "ssrecall {index}"
    params:
      - name: index
        type: integer
        description: Preset index number to recall
    description: Recalls the specified preset from the preset list.

  - id: devinfo_protocolver_query
    label: Protocol Version Query
    kind: query
    command: "devinfo protocolver"
    params: []
    description: Queries the external control protocol version.

  - id: devinfo_version_query
    label: Firmware Version Query
    kind: query
    command: "devinfo version"
    params: []
    description: Queries the device firmware version.

  - id: devinfo_productname_query
    label: Product Name Query
    kind: query
    command: "devinfo productname"
    params: []
    description: Queries the product name.

  - id: devinfo_serialno_query
    label: Serial Number Query
    kind: query
    command: "devinfo serialno"
    params: []
    description: Queries the device serial number.

  - id: devinfo_deviceid_query
    label: Device ID Query
    kind: query
    command: "devinfo deviceid"
    params: []
    description: Queries the device ID (3-digit hexadecimal, corresponds to UNIT ID).

  - id: devinfo_devicename_query
    label: Device Name Query
    kind: query
    command: "devinfo devicename"
    params: []
    description: Queries the user-assigned device name. Encoding follows scpmode encoding setting.

  - id: ssnum_query
    label: Preset Count Query
    kind: query
    command: "ssnum"
    params: []
    description: Queries the total number of presets.

  - id: ssinfo_query
    label: Preset Info Query
    kind: query
    command: "ssinfo {index}"
    params:
      - name: index
        type: integer
        description: Preset index number to query
    description: Queries information for the specified preset (number, attribute, title, comment).
```

## Feedbacks

```yaml
feedbacks:
  - id: run_mode_response
    type: enum
    values: [normal, emergency, update]
    description: Response to devstatus runmode query or unsolicited run mode change notification.

  - id: error_status_response
    type: string
    description: >-
      Alert status string. Formats: "none", or
      "{type}/{message}//x{nnn} {onf} ({sssss}) ID-{xxx} {date} {time}"
      where type is flt/err/wrn.

  - id: current_preset_response
    type: string
    description: >-
      Response format: "{index} {state}" where state is "unmodified" or "modified".

  - id: preset_recall_response
    type: integer
    description: Index of the recalled preset.

  - id: protocol_version_response
    type: string
    description: Protocol version string (e.g. "1.0.0").

  - id: firmware_version_response
    type: string
    description: Firmware version string.

  - id: product_name_response
    type: string
    description: Product name string.

  - id: serial_number_response
    type: string
    description: Serial number string.

  - id: device_id_response
    type: string
    description: Device ID (3-digit hexadecimal).

  - id: device_name_response
    type: string
    description: User-assigned device name.

  - id: preset_count_response
    type: integer
    description: Total number of presets.

  - id: preset_info_response
    type: string
    description: >-
      Format: "{index} "{number}" {attrib} "{title}" "{comment}".
      attrib values: preinst, reserve, user, empty.

  - id: command_error
    type: string
    description: >-
      Error notification format: "ERROR {command} {code}".
      Error codes: UnknownCommand, WrongFormat, InvalidArgument,
      UnknownAddress, UnknownEventID, TooLongCommand, AccessDenied,
      Busy, ReadOnly, NoPermission, InternalError.
```

## Variables

```yaml
# UNRESOLVED: no settable continuous parameters found in source (all control is discrete command-based)
```

## Events

```yaml
events:
  - id: notify_runmode_change
    command: 'NOTIFY devstatus runmode "{mode}"'
    description: Unsolicited notification when device run mode changes. Mode values: "normal", "emergency", "update".

  - id: notify_error_change
    command: 'NOTIFY devstatus error "{alert}"'
    description: >-
      Unsolicited notification on error/alert status change.
      Alert format: "{type}/{message}//x{nnn} {onf} ({sssss}) ID-{xxx} {date} {time}".

  - id: notify_preset_change
    command: "NOTIFY sscurrent {index}"
    description: Unsolicited notification when the current preset number changes.

  - id: notify_preset_recall_start
    command: "NOTIFY ssrecall {index}"
    description: Unsolicited notification when preset recall processing starts.
```

## Macros

```yaml
macros:
  - id: communication_start_sequence
    label: Communication Start Sequence
    steps:
      - action: devstatus_runmode_query
        description: >-
          Send devstatus runmode at 1-second or longer intervals until device responds.
      - wait_for: run_mode_response
        condition: mode == "normal"
        description: >-
          Wait for OK devstatus runmode "normal" response indicating device is ready.
          Device may also send unsolicited NOTIFY devstatus runmode, so monitor both.
    description: >-
      Required handshake before sending control commands.
      Controller must poll devstatus runmode until device reports normal mode.
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions "emergency" run mode but does not detail interlock or safety sequencing requirements
```

## Notes

- All commands terminated with LF (0x0A). LF alone can serve as heartbeat/keepalive.
- At least one space required between command name and options, and between options.
- Commands must use ASCII characters only.
- Up to 8 simultaneous remote controller connections per MCP1.
- When recalling a preset between MCP1s, the recalling MCP1 acts as remote controller.
- Keepalive: if activated, controller must send any command or LF within the configured interval or device terminates the connection.
- `devstatus runmode` must be used as initial handshake — device only accepts commands after responding with `OK devstatus runmode "normal"`.
- Device name and preset title/comment encoding follows the `scpmode encoding` setting (default ASCII).
- Protocol specification version 1.0.0, applies to MCP1 firmware V5.0.0 and later.

<!-- UNRESOLVED: maximum concurrent command rate / throttling not stated in source -->
<!-- UNRESOLVED: connection timeout when no keepalive set not stated in source -->
<!-- UNRESOLVED: preset index range (min/max) not explicitly stated in source -->

## Provenance

```yaml
source_domains:
  - usa.yamaha.com
source_urls:
  - https://usa.yamaha.com/files/download/other_assets/5/2230685/MCP1-remote-V100_en.pdf
retrieved_at: 2026-06-12T01:44:11.515Z
last_checked_at: 2026-10-01T11:03:00.961Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T11:03:00.961Z
matched_actions: 15
action_count: 15
confidence: medium
summary: "All 15 spec actions match the source's command catalogue; transport TCP port 49280 is verified; spec is a complete representation. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no settable continuous parameters found in source (all control is discrete command-based)"
- "source mentions \"emergency\" run mode but does not detail interlock or safety sequencing requirements"
- "maximum concurrent command rate / throttling not stated in source"
- "connection timeout when no keepalive set not stated in source"
- "preset index range (min/max) not explicitly stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
