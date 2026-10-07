---
spec_id: admin/audioflow-3s-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Audioflow 3S Series Control Spec"
manufacturer: Audioflow
model_family: 3S-2Z
aliases: []
compatible_with:
  manufacturers:
    - Audioflow
  models:
    - 3S-2Z
    - 3S-3Z
    - 3S-4Z
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - flow.audio
source_urls:
  - "https://flow.audio/Audioflow%20API.pdf"
retrieved_at: 2026-05-07T06:17:53.390Z
last_checked_at: 2026-10-07T10:11:25.983Z
generated_at: 2026-10-07T10:11:25.983Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no serial (RS-232) interface documented; HTTP-only"
  - "no settable parameters beyond discrete actions documented"
  - "no unsolicited notifications documented in source"
  - "no multi-step sequences documented in source"
  - "no explicit safety warnings or interlock procedures in source"
  - "HTTP port not explicitly stated (assumed 80); firmware version range not specified; no auth mechanism documented"
verification:
  verdict: verified
  checked_at: 2026-10-07T10:11:25.983Z
  matched_actions: 10
  action_count: 10
  confidence: medium
  summary: "All 10 spec actions match source endpoints and the afping discovery payload with correct shapes; port and auth are UNRESOLVED and base URL is supported. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Audioflow 3S Series Control Spec

## Summary
Audioflow 3S Series network-controlled stereo speaker switches (2, 3, and 4 zone variants). Spec covers HTTP REST API v2-0 for switch identity, zone state/name, exclusive mode, and reboot, plus UDP discovery on port 10499.

<!-- UNRESOLVED: no serial (RS-232) interface documented; HTTP-only -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  port: UNRESOLVED  # source does not state this (was 80)
  base_url: "http://audioflow/"
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- queryable  # inferred from GET /switch, GET /zones endpoints
- routable   # inferred from zone on/off routing endpoints
```

## Actions
```yaml
- id: get_switch_info
  label: Get Switch Info
  kind: query
  command: "GET /switch"
  params: []

- id: set_switch_name
  label: Set Switch Name
  kind: action
  command: "PUT /switch"
  params:
    - name: name
      type: string
      description: New switch name (plain ASCII, max 15 characters)

- id: get_zones
  label: Get All Zones
  kind: query
  command: "GET /zones"
  params: []

- id: set_zones_all
  label: Set All Zones
  kind: action
  command: "PUT /zones"
  params:
    - name: states
      type: string
      description: 4 space-separated digits (0=OFF, 1=ON) for zones A B C D

- id: get_zone
  label: Get Zone State
  kind: query
  command: "GET /zones/{N}"
  params:
    - name: N
      type: integer
      description: Zone number 1-4 (A=1, B=2, C=3, D=4)

- id: set_zone_state
  label: Set Zone State
  kind: action
  command: "PUT /zones/{N}"
  params:
    - name: N
      type: integer
      description: Zone number 1-4
    - name: state
      type: string
      description: '0' = OFF, '1' = ON, 'T' = TOGGLE

- id: set_zone_name
  label: Set Zone Name and Enabled State
  kind: action
  command: "PUT /zonename/{N}"
  params:
    - name: N
      type: integer
      description: Zone number 1-4
    - name: payload
      type: string
      description: Leading digit (0=disabled, 1=enabled) concatenated with new name (e.g. "1Lounge")

- id: set_exclusive
  label: Set Exclusive Mode
  kind: action
  command: "PUT /exclusive"
  params:
    - name: mode
      type: string
      description: '"enable" or "disable"'

- id: reboot
  label: Reboot Switch
  kind: action
  command: "GET /reboot_now"
  params: []

- id: discover
  label: UDP Switch Discovery
  kind: action
  command: "afping"  # UDP broadcast payload on port 10499
  params: []
```

## Feedbacks
```yaml
- id: switch_info
  type: object
  description: Switch name, model, serial, firmware version, wifi, alexa flag, exclusive flag

- id: zone_state
  type: object
  description: Per-zone id, name, enabled flag, on/off state

- id: exclusive_state
  type: enum
  values: [enabled, disabled]

- id: discovery_response
  type: object
  description: UDP payload containing afpong magic, model, serial on port 10499
```

## Variables
```yaml
# UNRESOLVED: no settable parameters beyond discrete actions documented
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for:
  - reboot
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
```

## Notes
- Switch discovery via UDP broadcast `afping` on port 10499 (hex `0x61 0x66 0x70 0x69 0x6E 0x67`); response payload begins with magic `afpong` (`0x61 0x66 0x70 0x6F 0x6E 0x67`).
- Base URL pattern: `http://audioflow/` (mDNS hostname assumed; source does not state IP/port).
- GET /zones/N is supported from v1.10.000035. The source gives conflicting firmware support statements for PUT /zones/N (all firmware versions and from v1.10.000035 onwards); its firmware applicability is UNRESOLVED. PUT /exclusive and GET /reboot_now are supported from v1.10.000035; field "version" in GET /switch response is displayed from v1.10.000037.
- All firmware versions support: GET /switch, PUT /switch, GET /zones, PUT /zones, PUT /zonename/N.
- Zone numbering: N=1 → Zone A, N=2 → Zone B, N=3 → Zone C, N=4 → Zone D. 3S-2Z supports only zones 1-2; 3S-3Z supports zones 1-3; 3S-4Z supports all 4.
- Exclusive mode restricts operation to one zone at a time.
- No authentication mechanism described in source.

<!-- UNRESOLVED: HTTP port not explicitly stated (assumed 80); firmware version range not specified; no auth mechanism documented -->

## Provenance

```yaml
source_domains:
  - flow.audio
source_urls:
  - "https://flow.audio/Audioflow%20API.pdf"
retrieved_at: 2026-05-07T06:17:53.390Z
last_checked_at: 2026-10-07T10:11:25.983Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T10:11:25.983Z
matched_actions: 10
action_count: 10
confidence: medium
summary: "All 10 spec actions match source endpoints and the afping discovery payload with correct shapes; port and auth are UNRESOLVED and base URL is supported. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no serial (RS-232) interface documented; HTTP-only"
- "no settable parameters beyond discrete actions documented"
- "no unsolicited notifications documented in source"
- "no multi-step sequences documented in source"
- "no explicit safety warnings or interlock procedures in source"
- "HTTP port not explicitly stated (assumed 80); firmware version range not specified; no auth mechanism documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
