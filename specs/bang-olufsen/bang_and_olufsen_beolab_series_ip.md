---
spec_id: admin/bang-olufsen-beolab-series-ip
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bang & Olufsen Beolab Series Control Spec"
manufacturer: "Bang & Olufsen"
model_family: "Beolab 8"
aliases: []
compatible_with:
  manufacturers:
    - "Bang & Olufsen"
  models:
    - "Beolab 8"
    - "Beolab 28"
    - "Beosound 2 3rd gen"
    - "Beosound A5"
    - "Beosound A9 5th gen"
    - "Beosound Balance"
    - "Beosound Emerge"
    - "Beosound Level"
    - "Beosound Premiere"
    - "Beosound Theatre"
    - "Beoconnect Core"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bang-olufsen.github.io
source_urls:
  - https://bang-olufsen.github.io/mozart-open-api/
retrieved_at: 2026-05-07T06:17:53.402Z
last_checked_at: 2026-05-20T05:10:36.374Z
generated_at: 2026-05-20T05:10:36.374Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - connect_notifications
  - close_api_client
  - "specific endpoint paths and request/response schemas not detailed in source; only high-level category list and Python SDK method signatures provided"
  - "detailed parameter schemas not provided; source lists schema names"
  - "multi-step sequences not documented in source"
  - "safety warnings and interlock procedures not present in source"
  - "specific REST endpoint paths, HTTP methods (GET/POST/PUT/DELETE), request/response body schemas not stated in source"
  - "Power on/off command syntax not detailed despite Power endpoint category existing"
  - "Audio tuning parameters (Bass, Treble, Loudness, Balance, Surround) listed as schemas but no command syntax or value ranges documented"
  - "SpeakerGroup, Scene, Bluetooth, Stand, Display control commands not detailed beyond schema names"
verification:
  verdict: verified
  checked_at: 2026-05-20T05:10:36.374Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 spec actions match source methods; transport parameters verified; methods connect_notifications and close_api_client not represented in spec but do not preclude verification. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Bang & Olufsen Beolab Series Control Spec

## Summary
Mozart platform REST API with WebSocket notification channel for Bang & Olufsen Beolab/Beosound devices. Local IP control via HTTP; MDNS discovery on port 5353. No authentication procedure described. OpenAPI spec version 5.3.1.108.

<!-- UNRESOLVED: specific endpoint paths and request/response schemas not detailed in source; only high-level category list and Python SDK method signatures provided -->

## Transport
```yaml
protocols:
  - http
  - tcp
addressing:
  base_url: http://<device_ip>
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
- id: activate_preset
  label: Activate Preset
  kind: action
  params:
    - name: id
      type: integer
      description: Preset number
- id: playback_play
  label: Play
  kind: action
  params: []
- id: playback_pause
  label: Pause
  kind: action
  params: []
- id: playback_next
  label: Next Track
  kind: action
  params: []
- id: playback_previous
  label: Previous Track
  kind: action
  params: []
- id: set_volume_level
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level (0-100)
- id: beolink_expand
  label: Beolink Expand
  kind: action
  params:
    - name: jid
      type: string
      description: "Beolink JID target (format: <serial_group>.<serial_number>.<device_id>@products.bang-olufsen.com)"
- id: beolink_join_latest
  label: Join Latest Beolink Experience
  kind: action
  params: []
- id: beolink_join_peer
  label: Join Beolink Peer
  kind: action
  params:
    - name: jid
      type: string
      description: Beolink JID of peer device
- id: query_beolink_listeners
  label: Query Beolink Listeners
  kind: query
  params: []
- id: discover
  label: Discover Devices
  kind: action
  params: []
- id: get_beolink_join_result
  label: Get Beolink Join Result
  kind: query
  params:
    - name: join_request
      type: object
      description: BeolinkJoinRequest received from join_latest_beolink_experience or join_beolink_peer
```

## Feedbacks
```yaml
- id: volume_state
  type: object
  description: Current volume state via WebSocket notifications
- id: beo_remote_button
  type: string
  description: "Remote button press notifications via WebSocket (requires remote_control=True on connect)"
- id: beolink_listeners
  type: array
  description: Active Beolink listeners
- id: beolink_join_result
  type: object
  description: Beolink join result after session join
- id: battery_state
  type: object
  description: Battery state notifications via WebSocket (WebSocketEventBatteryState)
- id: beolink_state
  type: object
  description: Beolink state change notifications via WebSocket (WebSocketEventBeolink)
- id: button_event
  type: object
  description: Physical button press notifications via WebSocket (WebSocketEventButtonEvent)
```

## Variables
```yaml
# UNRESOLVED: detailed parameter schemas not provided; source lists schema names
# (Bass, Treble, Loudness, Balance, Surround, StandPosition, SoundMode, SoundProfile, etc.)
# but does not document their ranges, command paths, or value types
```

## Events
```yaml
- id: connection_lost
  label: Connection Lost
  type: notification
  description: WebSocket disconnection notification
- id: connection_established
  label: Connection Established
  type: notification
  description: WebSocket connection established notification
```

## Macros
```yaml
# UNRESOLVED: multi-step sequences not documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety warnings and interlock procedures not present in source
```

## Notes
Discovery via MDNS `_bangolufsen._tcp.local.` port 5353. OpenAPI spec version 5.3.1.108. API categories: Power, Beolink, Content, Output, Overlay, Playback, Deezer, Product, Remote, Scenes, Bluetooth, Settings, Software update, Sound, SpeakerGroup, Stand.

Beolink JID format: `<serial_group>.<serial_number>.<device_id>@products.bang-olufsen.com`. Device serial numbers are 8 digits. `post_beolink_expand` raises NotFoundException if listener not found; async variant polls with 5-second timeout. `beolink_join_result` only available after device has joined; raises ApiException until then; async variant retries with 5-second timeout.

Receiving WebSocketEventBeoRemoteButton requires `remote_control=True` in `connect_notifications()`. Notification callbacks available: on connection lost, on connection, all notifications, all notifications raw.

<!-- UNRESOLVED: specific REST endpoint paths, HTTP methods (GET/POST/PUT/DELETE), request/response body schemas not stated in source -->
<!-- UNRESOLVED: Power on/off command syntax not detailed despite Power endpoint category existing -->
<!-- UNRESOLVED: Audio tuning parameters (Bass, Treble, Loudness, Balance, Surround) listed as schemas but no command syntax or value ranges documented -->
<!-- UNRESOLVED: SpeakerGroup, Scene, Bluetooth, Stand, Display control commands not detailed beyond schema names -->

## Provenance

```yaml
source_domains:
  - bang-olufsen.github.io
source_urls:
  - https://bang-olufsen.github.io/mozart-open-api/
retrieved_at: 2026-05-07T06:17:53.402Z
last_checked_at: 2026-05-20T05:10:36.374Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T05:10:36.374Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 spec actions match source methods; transport parameters verified; methods connect_notifications and close_api_client not represented in spec but do not preclude verification. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- connect_notifications
- close_api_client
- "specific endpoint paths and request/response schemas not detailed in source; only high-level category list and Python SDK method signatures provided"
- "detailed parameter schemas not provided; source lists schema names"
- "multi-step sequences not documented in source"
- "safety warnings and interlock procedures not present in source"
- "specific REST endpoint paths, HTTP methods (GET/POST/PUT/DELETE), request/response body schemas not stated in source"
- "Power on/off command syntax not detailed despite Power endpoint category existing"
- "Audio tuning parameters (Bass, Treble, Loudness, Balance, Surround) listed as schemas but no command syntax or value ranges documented"
- "SpeakerGroup, Scene, Bluetooth, Stand, Display control commands not detailed beyond schema names"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
