---
spec_id: admin/linn-kustom-dsm-single-stream-only
schema_version: ai4av-public-spec-v1
revision: 1
title: "Linn Kustom DSM Control Spec"
manufacturer: Linn
model_family: "Kustom DSM"
aliases: []
compatible_with:
  manufacturers:
    - Linn
  models:
    - "Kustom DSM"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.linn.co.uk
source_urls:
  - https://docs.linn.co.uk/wiki/index.php/Developer:LPEC
  - https://docs.linn.co.uk/wiki/index.php/Kustom_DSM
  - https://docs.linn.co.uk/wiki/index.php/Crestron/Linn_Crestron_4-Series_Driver_for_SIMPL_Windows
  - "https://docs.linn.co.uk/wiki/index.php/Control4_Driver_FAQ%27s"
  - https://docs.linn.co.uk/wiki/index.php/Developer:Documentation
retrieved_at: 2026-04-26T16:36:15.790Z
last_checked_at: 2026-06-12T19:25:10.318Z
generated_at: 2026-06-12T19:25:10.318Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "power on/off commands not documented in source"
  - "full action list requires UPnP service discovery per source"
  - "no multi-step sequences explicitly documented in source"
  - "no safety warnings or interlock procedures in source"
  - "complete action list requires UPnP service discovery"
  - "firmware compatibility range not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:25:10.318Z
  matched_actions: 13
  action_count: 13
  confidence: medium
  summary: "All 13 spec actions matched cleanly against LPEC protocol examples; transport confirmed; bidirectional coverage achieved. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-26
---

# Linn Kustom DSM Control Spec

## Summary
Linn Kustom DSM audio device controlled via LPEC (Linn Protocol for Eventing and Control), a TCP/IP text-based protocol on port 23. Supports media transport, volume/mute, source selection via fixed system names, and PIN selection. UPnP services exposed over raw TCP socket.

<!-- UNRESOLVED: power on/off commands not documented in source -->
<!-- UNRESOLVED: full action list requires UPnP service discovery per source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 23
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred: GetVolume, Source query examples present
- routable   # inferred: SetSourceIndex, SetSourceBySystemName examples present
```

## Actions
```yaml
- id: play
  label: Play
  kind: action
  params:
    - name: instance_id
      type: string
      description: UPnP instance ID (typically "0")
    - name: speed
      type: string
      description: Playback speed (typically "1")

- id: pause
  label: Pause
  kind: action
  params:
    - name: instance_id
      type: string
      description: UPnP instance ID (typically "0")

- id: next
  label: Next Track
  kind: action
  params:
    - name: instance_id
      type: string
      description: UPnP instance ID (typically "0")

- id: previous
  label: Previous Track
  kind: action
  params:
    - name: instance_id
      type: string
      description: UPnP instance ID (typically "0")

- id: get_volume
  label: Get Volume
  kind: action
  params:
    - name: instance_id
      type: string
      description: UPnP instance ID (typically "0")
    - name: channel
      type: string
      description: Channel name (e.g., "Master")

- id: set_mute
  label: Set Mute
  kind: action
  params:
    - name: mute
      type: string
      description: "\"true\"" or "\"false\""

- id: set_source_index
  label: Set Source Index
  kind: action
  params:
    - name: index
      type: string
      description: Source index number (0-4); may change with firmware

- id: set_source_by_system_name
  label: Set Source By System Name
  kind: action
  params:
    - name: name
      type: string
      description: Fixed system name (e.g., "Balanced", "CD12", "Playlist")

- id: set_source_index_by_name
  label: Set Source Index By Name
  kind: action
  params:
    - name: name
      type: string
      description: Source name as configured in Konfig

- id: source_query
  label: Query Source Info
  kind: action
  params:
    - name: index
      type: string
      description: Source index to query

- id: invoke_pin
  label: Invoke PIN
  kind: action
  params:
    - name: id
      type: string
      description: PIN identifier (requires Davaar 67+)

- id: read_pin_list
  label: Read PIN List
  kind: action
  params:
    - name: id
      type: string
      description: PIN identifier in array format "[ n]"

- id: get_id_array
  label: Get ID Array
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: action_response
  label: Action Response
  type: string
  description: RESPONSE "[outarg1]" "[outarg2]" ... - output args or empty on success

- id: error_response
  label: Error Response
  type: object
  description: ERROR [code] "[description]"

- id: subscribe_response
  label: Subscribe Response
  type: integer
  description: SUBSCRIBE [subscription-id]

- id: unsubscribe_response
  label: Unsubscribe Response
  type: integer
  description: UNSUBSCRIBE [subscription-id]
```

## Events
```yaml
- id: service_event
  label: Service Event
  description: EVENT [subscription-id] [sequence-no] [var-name] "[value]" ...
  params:
    - name: subscription_id
      type: integer
    - name: sequence_no
      type: integer
      description: 0 = initial state; subsequent = incremented 32-bit uint
    - name: variables
      type: object
      description: Changed variable name/value pairs

- id: alive
  label: Sub-Device Alive
  description: ALIVE [sub-device] [udn] - sent on connection and when sub-device enabled

- id: byebye
  label: Sub-Device Gone
  description: BYEBYE [sub-device] [udn] - sent when sub-device disabled; subscriptions revoked
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Max 4 simultaneous LPEC sessions; device ignores excess.
- Crestron: close TELNET before sleep to avoid port leaks.
- First command after ALIVE may error — send blank command to clear.
- SourceIndex may change with firmware or disabled sources; use SetSourceBySystemName for stability.
- PIN numbers unstable after reboot if recently altered; requires Davaar 67+.
- LPEC has no service discovery; use UPnP tools (Intel Device Spy/Monitor) to enumerate actions, then map to LPEC ACTION syntax.
<!-- UNRESOLVED: power on/off commands not documented in source -->
<!-- UNRESOLVED: complete action list requires UPnP service discovery -->
<!-- UNRESOLVED: firmware compatibility range not stated in source -->

## Provenance

```yaml
source_domains:
  - docs.linn.co.uk
source_urls:
  - https://docs.linn.co.uk/wiki/index.php/Developer:LPEC
  - https://docs.linn.co.uk/wiki/index.php/Kustom_DSM
  - https://docs.linn.co.uk/wiki/index.php/Crestron/Linn_Crestron_4-Series_Driver_for_SIMPL_Windows
  - "https://docs.linn.co.uk/wiki/index.php/Control4_Driver_FAQ%27s"
  - https://docs.linn.co.uk/wiki/index.php/Developer:Documentation
retrieved_at: 2026-04-26T16:36:15.790Z
last_checked_at: 2026-06-12T19:25:10.318Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:25:10.318Z
matched_actions: 13
action_count: 13
confidence: medium
summary: "All 13 spec actions matched cleanly against LPEC protocol examples; transport confirmed; bidirectional coverage achieved. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "power on/off commands not documented in source"
- "full action list requires UPnP service discovery per source"
- "no multi-step sequences explicitly documented in source"
- "no safety warnings or interlock procedures in source"
- "complete action list requires UPnP service discovery"
- "firmware compatibility range not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
