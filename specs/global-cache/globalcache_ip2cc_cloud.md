---
spec_id: admin/globalcache-ip2cc
schema_version: ai4av-public-spec-v1
revision: 1
title: "Global Caché iTach IP2CC Control Spec"
manufacturer: "Global Caché"
model_family: "iTach IP2CC"
aliases: []
compatible_with:
  manufacturers:
    - "Global Caché"
  models:
    - "iTach IP2CC"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - globalcache.com
source_urls:
  - https://www.globalcache.com/files/docs/api-gc-unifiedtcp.pdf
  - https://www.globalcache.com/files/docs/datasheet_itach_ip.pdf
  - https://www.globalcache.com/files/docs/QS_iTachIP_distrib.pdf
  - https://www.globalcache.com/downloads.html
retrieved_at: 2026-04-29T21:45:14.451Z
last_checked_at: 2026-06-02T22:07:20.866Z
generated_at: 2026-06-02T22:07:20.866Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "iTach IP2CC-specific capability details (contact closure ratings, voltage, current, switching capacity) are not in this source. The source is the family-wide Unified TCP API manual, not an IP2CC datasheet."
  - "source describes parameters as positional command arguments, not"
  - "source does not define multi-step sequences or named macros"
  - "source contains no safety warnings, interlock procedures, or"
  - "IP2CC electrical specifications (contact rating, max voltage/current, switching cycles) are not in this source."
  - "IP2CC mechanical/enclosure specs, power input, PoE class, and indicator-LED behavior are not in this source."
  - "confirmation-required safety actions (e.g. whether the API requires explicit unlock for high-risk outputs) are not documented."
verification:
  verdict: verified
  checked_at: 2026-06-02T22:07:20.866Z
  matched_actions: 10
  action_count: 10
  confidence: medium
  summary: "All 10 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Global Caché iTach IP2CC Control Spec

## Summary
Covers Global Caché iTach IP2CC (Contact Closure / relay) over the vendor's Unified TCP API on port 4998. IP2CC is a relay-output module (1:1–1:3) controlled via the unified ASCII command/response protocol shared across GC-100, iTach, Flex, and Global Connect families.

<!-- UNRESOLVED: iTach IP2CC-specific capability details (contact closure ratings, voltage, current, switching capacity) are not in this source. The source is the family-wide Unified TCP API manual, not an IP2CC datasheet. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 4998
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# No power on/off commands in source (relay state is a separate concern).
# No queryable trait for relay state alone - queryable triggered by getstate.
# No routable, no levelable, no powerable - only relay-state control is present.
queryable: true   # inferred from getstate command examples
```

## Actions
```yaml
# Unified TCP API commands applicable to iTach IP2CC relay outputs.
# Module = 1, port = 1|2|3 on IP2CC per source module/port table.
# Every request is a single line ending with carriage return (ASCII 13).
# Response format mirrors request with `state,` prefix.

- id: relay_getstate
  label: Get Relay State
  kind: query
  command: "getstate,1:{port}"
  params:
    - name: port
      type: integer
      description: Relay port address (1-3 on IP2CC)

- id: relay_getstate_notify
  label: Get Relay State (Enable Change Notification)
  kind: query
  command: "getstate,1:{port},notify"
  params:
    - name: port
      type: integer
      description: Relay port address (1-3 on IP2CC)
  notes: |
    Enables TCP change notification for the duration of the client's
    TCP connection. Notification messages use format
    `state,1:{port},{state}`.

- id: relay_setstate
  label: Set Relay State
  kind: action
  command: "setstate,1:{port},{state}"
  params:
    - name: port
      type: integer
      description: Relay port address (1-3 on IP2CC)
    - name: state
      type: integer
      description: |
        0 = off/open
        1 = on/closed (SPST; on1 for SPDT/DPDT)
        2 = on2 (SPDT/DPDT second throw)
  notes: |
    State is not persistent through device reset or power-cycle;
    always reverts to 0 (off/open) after reset.

- id: relay_setstate_pulse
  label: Pulse Relay (Timed Closure)
  kind: action
  command: "setstate,1:{port},{state},{period}"
  params:
    - name: port
      type: integer
      description: Relay port address (1-3 on IP2CC)
    - name: state
      type: integer
      description: "0, 1, or 2 (see relay_setstate)"
    - name: period
      type: integer
      description: Pulse period in ms, range 1-4294967295
  notes: Optional period parameter only applies to setstate.

- id: get_version
  label: Get Device Version
  kind: query
  command: "getversion"
  params: []
  notes: |
    iTach IP2CC family version prefix: 710-1008-XX. Example
    response: `version,0,710-1008-XX`.

- id: get_devices
  label: Get Device Capabilities
  kind: query
  command: "getdevices"
  params: []
  notes: |
    Response enumerates available modules and ports with type
    (e.g. RELAY, RELAYSENSOR, etc.). Multi-line response
    terminated by `endlistdevices`.

- id: get_network_config
  label: Get Network Configuration
  kind: query
  command: "get_NET,0:0"
  params: []
  notes: |
    Response: `NET,0:0,<cfglock>,<IPconfig>,<IPaddr>,<subnet>,<gateway>`.
    IPconfig: STATIC or DHCP. cfglock: UNLOCKED or LOCKED.

- id: get_serial_config
  label: Get Serial Port Configuration
  kind: query
  command: "get_SERIAL,1:{port}"
  params:
    - name: port
      type: integer
      description: "Port address (1 for iTach)"
  notes: |
    IP2CC-specific serial commands are not in this source, but
    the unified `get_SERIAL` command is documented for the
    iTach family. Use only if IP2CC exposes a serial port.

- id: get_IRL
  label: Enable IR Learner
  kind: query
  command: "get_IRL"
  params: []
  notes: |
    Returns `IR Learner Enabled` followed by `IR <IR_code>` lines
    for each received IR sequence. Module/port fixed at 1 in
    received codes. Stays enabled until `stop_IRL` or connection
    close.

- id: stop_IRL
  label: Disable IR Learner
  kind: query
  command: "stop_IRL"
  params: []
  notes: Returns `IR Learner Disabled`.

# Common error responses (informational; not callable):
# ERR 001 - invalid module address
# ERR 002 - invalid port address
# ERR 003 - no carriage return
# ERR 004 - not supported
# ERR 005 - invalid parameter
# ERR 007 - settings locked
# RO001 - invalid logical relay type
# RO002 - invalid relay state
# RO003 - unsupported operation
# RO004 - logical relay disabled/unavailable
# SI001 - not a sensor or relay
```

## Feedbacks
```yaml
- id: relay_state
  type: enum
  values:
    - "0"   # off/open
    - "1"   # on/closed (SPST; on1 for SPDT/DPDT)
    - "2"   # on2 (SPDT/DPDT second throw)
  response_format: "state,1:{port},{state}"
  notes: |
    Returned by getstate (query) and unsolicited via TCP change
    notification (statechange) when enabled with `notify` mode.
    State is not persistent across reset/power-cycle.

- id: network_config
  type: object
  response_format: "NET,0:0,<cfglock>,<IPconfig>,<IPaddr>,<subnet>,<gateway>"
  notes: |
    cfglock: UNLOCKED|LOCKED. IPconfig: STATIC|DHCP. IP addresses
    in IPV4 dotted form.

- id: device_capabilities
  type: object
  response_format: "device,<module>,<ports> <type>[_subtype] ... endlistdevices"
  notes: |
    Types: ETHERNET, WIFI, MODULE, IR, SERIAL, RELAY, SENSOR,
    RELAYSENSOR, IR_BLASTER, IRTRIPORT, IRTRIPORT_BLASTER, SWITCH.
    Subtypes: DIGITAL, IN, OUT, RS232, RS485, SPST_3A, HDMI_3:1.

- id: ir_learned_code
  type: string
  response_format: "IR <IR_code>"
  notes: |
    Streamed while IR Learner is enabled (`get_IRL`).
    Format is Global Caché IR Format with module/port fixed at 1.
```

## Variables
```yaml
# UNRESOLVED: source describes parameters as positional command arguments, not
# persistent named variables. No persistent storage variables are documented.
```

## Events
```yaml
- id: relay_state_change
  description: |
    Unsolicited state change notification on the TCP connection
    that issued `getstate,<module>:<port>,notify`. Format:
    `state,<module>:<port>,<state>`. Persists for life of the
    originating TCP connection.
  response_format: "state,<module>:<port>,<state>"

- id: ir_received_code
  description: |
    Streamed by iTach while IR receive mode is enabled via
    `receiveIR,<module>:<port>,enabled`. Format follows IR
    Learner output: Global Caché IR code string with module/port
    fixed at 1.
  response_format: "sendir,1:1,1,<freq>,<repeat>,<offset>,<on1>,<off1>,..."
```

## Macros
```yaml
# UNRESOLVED: source does not define multi-step sequences or named macros
# for IP2CC.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. IP2CC contact-closure electrical ratings
# (voltage/current/load) are not present in this source and must be obtained
# from the IP2CC datasheet before field deployment.
```

## Notes
- Source is Global Caché's Unified TCP API manual covering GC-100, iTach, Flex, and Global Connect families. iTach IP2CC is a relay-only Contact Closure module; commands marked applicable to IP2CC follow the iTach row of the module/port tables in the source.
- All TCP API requests are a single line of printable text terminated with carriage return (ASCII 13). Commands and parameters are case sensitive.
- Connections can be momentary (one request/response) or persistent (open socket for multiple requests and notifications). Max 8 simultaneous TCP connections per iTach.
- iTach IP2CC firmware family prefix: `710-1008-XX` (exact version not stated in source).
- DHCP by default; fallback to static IP if no DHCP server. Network configured via `get_NET`/`set_NET` (set_NET not supported on iTach/Flex/Global Connect per source).
- IP2CC relay state does not persist through reset/power-cycle — always returns to `0` (off/open).
- This spec covers only TCP API control. IR, serial, sensor, and HDMI-matrix sub-commands present in the unified manual are not part of IP2CC's primary function and are listed only where the IP2CC exposes a port of that class.

<!-- UNRESOLVED: IP2CC electrical specifications (contact rating, max voltage/current, switching cycles) are not in this source. -->
<!-- UNRESOLVED: IP2CC mechanical/enclosure specs, power input, PoE class, and indicator-LED behavior are not in this source. -->
<!-- UNRESOLVED: confirmation-required safety actions (e.g. whether the API requires explicit unlock for high-risk outputs) are not documented. -->

## Provenance

```yaml
source_domains:
  - globalcache.com
source_urls:
  - https://www.globalcache.com/files/docs/api-gc-unifiedtcp.pdf
  - https://www.globalcache.com/files/docs/datasheet_itach_ip.pdf
  - https://www.globalcache.com/files/docs/QS_iTachIP_distrib.pdf
  - https://www.globalcache.com/downloads.html
retrieved_at: 2026-04-29T21:45:14.451Z
last_checked_at: 2026-06-02T22:07:20.866Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:07:20.866Z
matched_actions: 10
action_count: 10
confidence: medium
summary: "All 10 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "iTach IP2CC-specific capability details (contact closure ratings, voltage, current, switching capacity) are not in this source. The source is the family-wide Unified TCP API manual, not an IP2CC datasheet."
- "source describes parameters as positional command arguments, not"
- "source does not define multi-step sequences or named macros"
- "source contains no safety warnings, interlock procedures, or"
- "IP2CC electrical specifications (contact rating, max voltage/current, switching cycles) are not in this source."
- "IP2CC mechanical/enclosure specs, power input, PoE class, and indicator-LED behavior are not in this source."
- "confirmation-required safety actions (e.g. whether the API requires explicit unlock for high-risk outputs) are not documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
