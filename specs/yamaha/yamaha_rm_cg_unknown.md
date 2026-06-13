---
spec_id: admin/yamaha-rm-cg
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha RM-CG Control Spec"
manufacturer: Yamaha
model_family: RM-CG
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - RM-CG
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - usa.yamaha.com
source_urls:
  - https://usa.yamaha.com/files/download/other_assets/5/2230685/MCP1-remote-V100_en.pdf
  - https://usa.yamaha.com/files/download/other_assets/2/1525882/sp-rm-series-remote-V3.0.0-en.pdf
  - https://usa.yamaha.com/files/download/other_assets/9/1382189/RM-CG_reference_manual_En_H1.pdf
  - https://usa.yamaha.com/files/download/other_assets/9/2233489/RM-CR_RM-CG_RM-TT_Device_Manager_operation_guide_En_C0.pdf
retrieved_at: 2026-06-12T05:02:54.800Z
last_checked_at: 2026-06-12T20:01:03.245Z
generated_at: 2026-06-12T20:01:03.245Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes the MCP1 protocol family; RM-CG-specific firmware binding not explicitly stated, doc says \"applies to MCP1 V5.0.0 and later\""
  - "source does not document specific electrical or mechanical safety warnings"
  - "source does not state a specific RM-CG firmware version, port discovery mechanism, or default IP address assignment method"
verification:
  verdict: verified
  checked_at: 2026-06-12T20:01:03.245Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched literally in source; transport port verified; complete coverage of documented control commands. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Yamaha RM-CG Control Spec

## Summary
Network control protocol (MCP1) for the Yamaha RM-CG. Communication is line-oriented ASCII over TCP port 49280, LF (0x0A) terminated, with up to eight concurrent remote controllers. Covers device status, run mode, preset recall, product info, and preset metadata queries.

<!-- UNRESOLVED: source describes the MCP1 protocol family; RM-CG-specific firmware binding not explicitly stated, doc says "applies to MCP1 V5.0.0 and later" -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 49280
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable       # inferred from query command examples (devstatus, devinfo, ssnum, ssinfo, sscurrent)
- routable        # inferred: devmode normal/emergency sets device run state
```

## Actions
```yaml
- id: devstatus_runmode_query
  label: Device run mode query
  kind: query
  command: "devstatus runmode"
  params: []
- id: devstatus_error_query
  label: Device error status query
  kind: query
  command: "devstatus error"
  params: []
- id: devmode_normal
  label: Set device run mode to normal
  kind: action
  command: "devmode normal"
  params: []
- id: devmode_emergency
  label: Set device run mode to emergency
  kind: action
  command: "devmode emergency"
  params: []
- id: scpmode_encoding_ascii
  label: Set character encoding to ASCII
  kind: action
  command: "scpmode encoding ascii"
  params: []
- id: scpmode_encoding_utf8
  label: Set character encoding to UTF-8
  kind: action
  command: "scpmode encoding utf8"
  params: []
- id: scpmode_keepalive
  label: Activate keepalive with timeout
  kind: action
  command: "scpmode keepalive {interval}"
  params:
    - name: interval
      type: integer
      description: Timeout value in msec; must be > 1000; actual value is increased by 1 second
- id: sscurrent_query
  label: Current preset number query
  kind: query
  command: "sscurrent"
  params: []
- id: ssrecall
  label: Preset recall
  kind: action
  command: "ssrecall {index}"
  params:
    - name: index
      type: integer
      description: Preset index number
- id: devinfo_protocolver
  label: External control protocol version query
  kind: query
  command: "devinfo protocolver"
  params: []
- id: devinfo_version
  label: Firmware version query
  kind: query
  command: "devinfo version"
  params: []
- id: devinfo_productname
  label: Product name query
  kind: query
  command: "devinfo productname"
  params: []
- id: devinfo_serialno
  label: Serial number query
  kind: query
  command: "devinfo serialno"
  params: []
- id: devinfo_deviceid
  label: Device ID query
  kind: query
  command: "devinfo deviceid"
  params: []
- id: devinfo_devicename
  label: Device name query
  kind: query
  command: "devinfo devicename"
  params: []
- id: ssnum
  label: Preset number query
  kind: query
  command: "ssnum"
  params: []
- id: ssinfo
  label: Nth preset information query
  kind: query
  command: "ssinfo {index}"
  params:
    - name: index
      type: integer
      description: Preset index number
```

## Feedbacks
```yaml
- id: runmode
  type: enum
  values: [normal, emergency, update]
  description: Device run mode returned by devstatus runmode query and NOTIFY devstatus runmode
- id: error_status
  type: string
  description: Error/fault/warning alert string or "none"; format: type/message//xnnn onf (count) ID-xxx YYYY/M/D H:M:S
- id: sscurrent_index
  type: integer
  description: Current preset index number returned by sscurrent query
- id: sscurrent_modified
  type: enum
  values: [unmodified, modified]
  description: Whether parameters changed after preset recall
- id: protocol_version
  type: string
  description: External control protocol version returned by devinfo protocolver
- id: firmware_version
  type: string
  description: Firmware version returned by devinfo version
- id: product_name
  type: string
  description: Product name returned by devinfo productname
- id: serial_number
  type: string
  description: Serial number returned by devinfo serialno
- id: device_id
  type: string
  description: 3-digit hexadecimal device ID returned by devinfo deviceid
- id: device_name
  type: string
  description: User-assigned device name returned by devinfo devicename
- id: preset_count
  type: integer
  description: Number of presets returned by ssnum
- id: preset_info
  type: object
  description: Per-preset info from ssinfo: index, display number, attribute (preinst/reserve/user/empty), title, comment
```

## Variables
```yaml
- name: encoding_mode
  type: enum
  values: [ascii, utf8]
  description: Character encoding for result/notification and preset text (set via scpmode encoding)
- name: keepalive_interval
  type: integer
  description: Keepalive timeout in msec; > 1000, actual timeout increased by 1 second
```

## Events
```yaml
- id: notify_devstatus_runmode
  description: Device run mode change notification
  payload: "NOTIFY devstatus runmode \"{mode}\""  # mode in: emergency, update, normal
- id: notify_devstatus_error
  description: Device error/fault/warning notification
  payload: "NOTIFY devstatus error \"{alert}\""  # alert: none, flt/xxxx, err/xxxx, wrn/xxxx
- id: notify_sscurrent
  description: Current preset number change notification
  payload: "NOTIFY sscurrent {index}"
- id: notify_ssrecall
  description: Preset recall start notification
  payload: "NOTIFY ssrecall {index}"
- id: error_notification
  description: Command error notification
  payload: "ERROR {command_name} {error_code}"  # error codes: UnknownCommand, WrongFormat, InvalidArgument, UnknownAddress, UnknownEventID, TooLongCommand, AccessDenied, Busy, ReadOnly, NoPermission, InternalError
```

## Macros
```yaml
- id: communication_start_sequence
  description: Establish remote control session
  steps:
    - description: Open TCP session to port 49280
    - description: Send devstatus runmode at >=1s intervals
    - description: Wait for response "OK devstatus runmode \"normal\""
    - description: Controller may now send other commands
- id: keepalive_heartbeat
  description: Send LF (0x0A) or any command within the keepalive interval to keep connection alive
  steps:
    - description: Send any command or LF byte within timeout set by scpmode keepalive
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Run mode change to emergency via devmode emergency"
  - "Commands may be rejected with AccessDenied when device is not in normal running state (e.g. ssrecall in emergency mode)"
# UNRESOLVED: source does not document specific electrical or mechanical safety warnings
```

## Notes
- Commands are ASCII, LF (0x0A) terminated; LF alone acts as a heartbeat.
- At least one space required between command name and options and between options.
- Up to 8 remote controllers can connect concurrently.
- Communication start sequence: send `devstatus runmode` at 1s+ intervals until `OK devstatus runmode "normal"` returned.
- Encoding setting (`scpmode encoding`) affects how device name and preset title/comment strings are interpreted.
- Keepalive recommended to avoid stuck "connected" state on the device after unexpected disconnects.
- Source is the MCP1 protocol spec, which explicitly states it applies to MCP1 V5.0.0 and later; RM-CG firmware version not separately documented here.

<!-- UNRESOLVED: source does not state a specific RM-CG firmware version, port discovery mechanism, or default IP address assignment method -->

## Provenance

```yaml
source_domains:
  - usa.yamaha.com
source_urls:
  - https://usa.yamaha.com/files/download/other_assets/5/2230685/MCP1-remote-V100_en.pdf
  - https://usa.yamaha.com/files/download/other_assets/2/1525882/sp-rm-series-remote-V3.0.0-en.pdf
  - https://usa.yamaha.com/files/download/other_assets/9/1382189/RM-CG_reference_manual_En_H1.pdf
  - https://usa.yamaha.com/files/download/other_assets/9/2233489/RM-CR_RM-CG_RM-TT_Device_Manager_operation_guide_En_C0.pdf
retrieved_at: 2026-06-12T05:02:54.800Z
last_checked_at: 2026-06-12T20:01:03.245Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T20:01:03.245Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched literally in source; transport port verified; complete coverage of documented control commands. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes the MCP1 protocol family; RM-CG-specific firmware binding not explicitly stated, doc says \"applies to MCP1 V5.0.0 and later\""
- "source does not document specific electrical or mechanical safety warnings"
- "source does not state a specific RM-CG firmware version, port discovery mechanism, or default IP address assignment method"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
