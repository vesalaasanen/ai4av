---
spec_id: admin/bss-audio-muse-extension-for-vs-code
schema_version: ai4av-public-spec-v1
revision: 1
title: "BSS Audio MUSE Extension For VS Code Control Spec"
manufacturer: "BSS Audio"
model_family: "BSS Audio MUSE Extension For VS Code"
aliases: []
compatible_with:
  manufacturers:
    - "BSS Audio"
  models:
    - "BSS Audio MUSE Extension For VS Code"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - dextra.com.mx
  - amx.com
source_urls:
  - https://dextra.com.mx/img/files/PRODUCTOS/AMX/05-MU-1000/Programming-Guide---AMX-MUSE.pdf
  - https://www.amx.com/en/products/muse-extension-for-vscode
retrieved_at: 2026-06-30T02:59:18.902Z
last_checked_at: 2026-06-30T06:58:27.612Z
generated_at: 2026-06-30T06:58:27.612Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "spec describes programming interface rather than a single end-device protocol. Action surface is bound to attached peripheral descriptors, not enumerated here."
  - "source describes programmatic API (Thing API, device:invoke) and"
  - "parameter schema is descriptor-driven and varies per attached device."
  - "no multi-step sequences described."
  - "source contains no safety warnings or interlock procedures."
  - "firmware/protocol version of MUSE Controller not stated. Descriptor files are device-specific; concrete action enumeration requires a target peripheral."
verification:
  verdict: verified
  checked_at: 2026-06-30T06:58:27.612Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 spec actions match literal CLI commands in source; TCP/SSH transport verified; complete coverage of MUSE CLI and Thing API. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# BSS Audio MUSE Extension For VS Code Control Spec

## Summary
Software toolchain providing VS Code scripting access to the BSS Audio MUSE (Mojo Universal Scripting Engine) Controller. Document covers ICSP, HiQNet, and HControl device bindings, CLI commands, and Thing API used to drive downstream AV devices from scripts. Underlying control plane is TCP/IP; ICSP URL mode listens on TCP 1319 (1320 for ICSPS).

<!-- UNRESOLVED: spec describes programming interface rather than a single end-device protocol. Action surface is bound to attached peripheral descriptors, not enumerated here. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 1319  # ICSP URL Mode default; ICSPS uses 1320
auth:
  type: ssh  # SSH login required for CLI on MUSE Controller
```

## Traits
```yaml
- queryable       # inferred: device:parameters / device:get commands present
```

## Actions
```yaml
# UNRESOLVED: source describes programmatic API (Thing API, device:invoke) and
# a general CLI command surface, but does not enumerate device-specific
# commands for the MUSE extension itself. Concrete action payloads depend on
# attached peripheral descriptor files.

- id: device_invoke
  label: Invoke Command on Device
  kind: action
  command: "device:invoke {instance_id} {command_name} [{arguments}]"
  params:
    - name: instance_id
      type: string
      description: Device instance id (e.g. dvDVD)
    - name: command_name
      type: string
      description: Command path (e.g. power/0/cycle)
    - name: arguments
      type: string
      description: "Optional name=value pairs"

- id: device_set_parameter
  label: Set Device Parameter
  kind: action
  command: "device:set {instance_id} {parameter_path} {value}"
  params:
    - name: instance_id
      type: string
    - name: parameter_path
      type: string
      description: e.g. discTransport/0/discTransport
    - name: value
      type: string

- id: device_get_parameter
  label: Get Device Parameter
  kind: query
  command: "device:get {instance_id} {parameter_path}"
  params:
    - name: instance_id
      type: string
    - name: parameter_path
      type: string

- id: device_list
  label: List Devices
  kind: query
  command: "device:list"

- id: device_commands
  label: List Device Commands
  kind: query
  command: "device:commands {instance_id}"
  params:
    - name: instance_id
      type: string

- id: device_parameters
  label: List Device Parameters
  kind: query
  command: "device:parameters {instance_id}"
  params:
    - name: instance_id
      type: string

- id: driver_describe
  label: Describe Device Driver
  kind: query
  command: "driver:describe [-j] {instance_id}"
  params:
    - name: json
      type: boolean
      description: Pass -j to return raw JSON descriptor

- id: log_tail
  label: Tail Log Stream
  kind: query
  command: "log:tail"

- id: network_ip
  label: Get/Set Network IP
  kind: action
  command: "network:ip [options]"
  params:
    - name: ethinterface
      type: string
      description: "eth0 or eth1"
    - name: mode
      type: string
      description: "dhcp | static | ipv6d | ipv6s"
    - name: subnet
      type: string
    - name: gateway
      type: string
    - name: ip
      type: string
    - name: enable
      type: boolean
      description: Enable eth1
    - name: disable
      type: boolean
      description: Disable eth1
```

## Feedbacks
```yaml
- id: device_online
  label: Device Online State
  type: boolean
  description: "isOnline() / isOffline() method on Device handle; observable via .online()/.offline() callbacks"
```

## Variables
```yaml
# UNRESOLVED: parameter schema is descriptor-driven and varies per attached device.
```

## Events
```yaml
- id: parameter_update
  label: Parameter Change
  description: |
    Delivered to .watch() callback. Fields: path (string), id (string),
    value (variant), newValue (variant), oldValue (variant), normalized (float 0..1),
    source (object ref).
  fields:
    - name: path
      type: string
    - name: id
      type: string
    - name: value
      type: variant
    - name: newValue
      type: variant
    - name: oldValue
      type: variant
    - name: normalized
      type: float
    - name: source
      type: object

- id: device_event
  label: Device Event
  description: |
    Delivered to .listen() callback. Fields: path (string), id (string),
    arguments (array), oldValue (variant), source (object ref).
  fields:
    - name: path
      type: string
    - name: id
      type: string
    - name: arguments
      type: array
    - name: oldValue
      type: variant
    - name: source
      type: object

- id: timeline_expired
  label: Timeline Expired
  description: |
    Delivered to tickListener. tlEvent.arguments fields: sequence, time, repetition.
  fields:
    - name: sequence
      type: integer
    - name: time
      type: integer
    - name: repetition
      type: integer
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures.
```

## Notes
- MUSE extension is a software developer surface to the MUSE Controller; it is not a standalone controllable AV device.
- ICSP URL Mode: peripherals connect to MUSE Controller on TCP 1319 (1320 for ICSPS); controller-initiated Listen Mode uses same port.
- HControl devices: controller connects to device-selected driver com.amx.thing.hcontrol.generic; source gives no default port.
- SSH login required to reach CLI (web server, SSH, or Virtual COM via USB-C).
- Timeline service: `tick.start([times], relative, repetition)` where repetition -1 = forever, 0 = once.
- Parity enum example on serial port: NONE, EVEN, ODD, MARK, SPACE (default NONE).
- Serial poll example byte stream from log:tail: STX>PLYcFWD     17ETX (request) / STX >PLYsFWD     27 ETX (ack) — vendor-specific framing for downstream device, not for the MUSE extension itself.

<!-- UNRESOLVED: firmware/protocol version of MUSE Controller not stated. Descriptor files are device-specific; concrete action enumeration requires a target peripheral. -->

## Provenance

```yaml
source_domains:
  - dextra.com.mx
  - amx.com
source_urls:
  - https://dextra.com.mx/img/files/PRODUCTOS/AMX/05-MU-1000/Programming-Guide---AMX-MUSE.pdf
  - https://www.amx.com/en/products/muse-extension-for-vscode
retrieved_at: 2026-06-30T02:59:18.902Z
last_checked_at: 2026-06-30T06:58:27.612Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T06:58:27.612Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 spec actions match literal CLI commands in source; TCP/SSH transport verified; complete coverage of MUSE CLI and Thing API. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "spec describes programming interface rather than a single end-device protocol. Action surface is bound to attached peripheral descriptors, not enumerated here."
- "source describes programmatic API (Thing API, device:invoke) and"
- "parameter schema is descriptor-driven and varies per attached device."
- "no multi-step sequences described."
- "source contains no safety warnings or interlock procedures."
- "firmware/protocol version of MUSE Controller not stated. Descriptor files are device-specific; concrete action enumeration requires a target peripheral."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
