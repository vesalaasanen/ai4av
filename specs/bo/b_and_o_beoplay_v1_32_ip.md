---
spec_id: admin/bo-beoplay-v1-32
schema_version: ai4av-public-spec-v1
revision: 1
title: "B&O BeoPlay V1-32 Control Spec"
manufacturer: "B&O"
model_family: "BeoPlay V1-32"
aliases: []
compatible_with:
  manufacturers:
    - "B&O"
  models:
    - "BeoPlay V1-32"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
  - documenter.getpostman.com
  - khimo.github.io
source_urls:
  - https://raw.githubusercontent.com/tanumkroken/beonetapi/master/openapi_beonet.yml
  - https://documenter.getpostman.com/view/1053298/T1LTe4Lt
  - https://khimo.github.io/help_drivers/BeoLink/
retrieved_at: 2026-08-30T10:33:29.760Z
last_checked_at: 2026-08-30T22:16:05.851Z
generated_at: 2026-08-30T22:16:05.851Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is community_report and explicitly notes \"The protocol is also supported by B&O video products, but this is not covered by the API.\" V1-32 support per endpoint is not confirmed."
  - "valid range not stated in source)"
  - "object schema not specified in source"
  - "enum values not stated in source"
  - "response body schemas not specified in source beyond data type hints."
  - "full schema not in source"
  - "valid range not in source"
  - "explicit schema not in source"
  - "source defines request bodies as opaque \"object\" types without property schemas."
  - "notification stream payload schema not specified in source."
  - "no multi-step sequences documented in source."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "firmware version compatibility, RS-232/serial config, alternative transport (PUC/IR), PUC table mapping, video-specific endpoints (HDMI switching, picture mode, tuner control)."
verification:
  verdict: verified
  checked_at: 2026-08-30T22:16:05.851Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "All 33 spec actions are HTTP endpoints present verbatim in the source Command Summary; transport base URL and port match. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - community_report
license: ODbL-1.0
created_at: 2026-08-30
---

# B&O BeoPlay V1-32 Control Spec

## Summary
HTTP/REST control interface for B&O BeoPlay V1-32 television based on the B&O Net Remote TCP/IP protocol. Base URL `http://beoproduct.local:8080`, JSON request/response. Source is a community OpenAPI spec that explicitly excludes video products from its supported list — applicability to V1-32 is unverified.

<!-- UNRESOLVED: source is community_report and explicitly notes "The protocol is also supported by B&O video products, but this is not covered by the API." V1-32 support per endpoint is not confirmed. -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http://beoproduct.local:8080
  port: 8080  # inferred from base URL in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from PUT power-state endpoint
- routable        # inferred from ActiveSources endpoints
- queryable       # inferred from GET polling endpoints
- levelable       # inferred from Volume Level endpoints
```

## Actions
```yaml
- id: get_notifications
  label: Get Notifications
  kind: query
  command: "GET http://beoproduct.local:8080/BeoNotify/Notifications"
  params: []
  notes: Long-polling notification stream. Cover art, metadata, source, volume, play state, song progress, friendly name, standby status.

- id: get_region_settings
  label: Get Regional Settings
  kind: query
  command: "GET http://beoproduct.local:8080/BeoDevice/regionalSettings"
  params: []

- id: get_volume_level
  label: Get Volume Level
  kind: query
  command: "GET http://beoproduct.local:8080/BeoZone/Zone/Sound/Volume/Speaker/Level"
  params: []

- id: put_volume_level
  label: Set Volume Level
  kind: action
  command: "PUT http://beoproduct.local:8080/BeoZone/Zone/Sound/Volume/Speaker/Level"
  params:
    - name: level
      type: integer
      description: Volume level (UNRESOLVED: valid range not stated in source)

- id: get_mute_state
  label: Get Mute State
  kind: query
  command: "GET http://beoproduct.local:8080/BeoZone/Zone/Sound/Volume/Speaker/Muted"
  params: []

- id: put_mute_state
  label: Toggle Mute
  kind: action
  command: "PUT http://beoproduct.local:8080/BeoZone/Zone/Sound/Volume/Speaker/Muted"
  params: []

- id: get_power_state
  label: Get Power State
  kind: query
  command: "GET http://beoproduct.local:8080/BeoDevice/powerManagement/standby"
  params: []

- id: put_power_state
  label: Set Power State
  kind: action
  command: "PUT http://beoproduct.local:8080/BeoDevice/powerManagement/standby"
  params:
    - name: standby
      type: object
      description: UNRESOLVED: object schema not specified in source

- id: post_volume_up_down
  label: Regulate Volume (Up/Down)
  kind: action
  command: "POST http://beoproduct.local:8080/BeoZone/Zone/Sound/Volume/Speaker/ContinuousLevelAction"
  params:
    - name: continuousLevelAction
      type: string
      description: UNRESOLVED: enum values not stated in source
    - name: continuousLevelTimeoutAction
      type: integer
      description: Timeout in ms. 0 = immediate release (1 step)

- id: get_active_sources
  label: Get Active Sources
  kind: query
  command: "GET http://beoproduct.local:8080/BeoZone/Zone/ActiveSources"
  params: []

- id: post_active_source
  label: Set Active Source
  kind: action
  command: "POST http://beoproduct.local:8080/BeoZone/Zone/ActiveSources"
  params:
    - name: primaryExperience
      type: object
      description: UNRESOLVED: object schema not specified in source

- id: get_active_sound_mode
  label: Get Active Sound Mode
  kind: query
  command: "GET http://beoproduct.local:8080/BeoZone/Zone/Sound/Mode/Active"
  params: []

- id: get_sources
  label: Get Sources
  kind: query
  command: "GET http://beoproduct.local:8080/BeoZone/Zone/Sources"
  params: []

- id: get_terms_and_conditions
  label: Get Terms and Conditions
  kind: query
  command: "GET http://beoproduct.local:8080/BeoDevice/termsAndConditions"
  params: []

- id: get_sound_adjustment
  label: Get Sound Adjustment
  kind: query
  command: "GET http://beoproduct.local:8080/BeoZone/Zone/Sound/Adjustment"
  params: []

- id: post_sound_adjustment
  label: Set Sound Adjustment
  kind: action
  command: "POST http://beoproduct.local:8080/BeoZone/Zone/Sound/Adjustment"
  params:
    - name: adjustment
      type: object
      description: UNRESOLVED: object schema not specified in source

- id: get_source_activation
  label: Get Source Activation
  kind: query
  command: "GET http://beoproduct.local:8080/BeoZone/Zone/SourceActivation"
  params: []

- id: post_source_activation
  label: Set Source Activation
  kind: action
  command: "POST http://beoproduct.local:8080/BeoZone/Zone/SourceActivation"
  params:
    - name: primaryExperience
      type: object
      description: UNRESOLVED: object schema not specified in source

- id: post_volume_default_level
  label: Set Volume Default Level
  kind: action
  command: "POST http://beoproduct.local:8080/BeoZone/Zone/Sound/Volume/Speaker/DefaultLevel"
  params: []

- id: get_volume_range
  label: Get Volume Range
  kind: query
  command: "GET http://beoproduct.local:8080/BeoZone/Zone/Sound/Volume/Speaker/Range"
  params: []

- id: post_volume_range
  label: Set Volume Range
  kind: action
  command: "POST http://beoproduct.local:8080/BeoZone/Zone/Sound/Volume/Speaker/Range"
  params:
    - name: range
      type: object
      description: UNRESOLVED: object schema not specified in source

- id: get_sound_mode
  label: Get Sound Mode
  kind: query
  command: "GET http://beoproduct.local:8080/BeoZone/Zone/Sound/Mode/1"
  params: []

- id: post_sound_mode
  label: Set Sound Mode
  kind: action
  command: "POST http://beoproduct.local:8080/BeoZone/Zone/Sound/Mode/1"
  params:
    - name: mode
      type: object
      description: UNRESOLVED: object schema not specified in source

- id: post_queue
  label: Play From Queue
  kind: action
  command: "POST http://beoproduct.local:8080/BeoZone/Zone/PlayQueue/"
  params:
    - name: instantplay
      type: string
      description: "Play the current item. Supported sources: spotify, music."
  notes: Returns 403 for unsupported sources.

- id: get_stream
  label: Get Stream
  kind: query
  command: "GET http://beoproduct.local:8080/BeoZone/Zone/Stream"
  params: []

- id: post_stream_play
  label: Play Stream
  kind: action
  command: "POST http://beoproduct.local:8080/BeoZone/Zone/Stream/Play"
  params: []

- id: post_stream_pause
  label: Pause Stream
  kind: action
  command: "POST http://beoproduct.local:8080/BeoZone/Zone/Stream/Pause"
  params: []

- id: post_stream_skip
  label: Skip Stream
  kind: action
  command: "POST http://beoproduct.local:8080/BeoZone/Zone/Stream/Skip"
  params: []

- id: post_stream_next
  label: Skip Stream (Next)
  kind: action
  command: "POST http://beoproduct.local:8080/BeoZone/Zone/Stream/Next"
  params: []

- id: post_stream_stop
  label: Stop Stream
  kind: action
  command: "POST http://beoproduct.local:8080/BeoZone/Zone/Stream/Stop"
  params: []

- id: post_stream_forward
  label: Forward Stream
  kind: action
  command: "POST http://beoproduct.local:8080/BeoZone/Zone/Stream/Forward"
  params: []

- id: get_play_queue
  label: Get Play Queue
  kind: query
  command: "GET http://beoproduct.local:8080/BeoZone/Zone/PlayQueue"
  params: []

- id: get_primary_active_source
  label: Get Primary Active Source
  kind: query
  command: "GET http://beoproduct.local:8080/BeoZone/Zone/ActiveSources/primaryExperience"
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: response body schemas not specified in source beyond data type hints.
# Only the notification stream list is documented (cover art, metadata, source, volume, play state, song progress, friendly name, standby status).
- id: power_state
  type: object
  notes: UNRESOLVED: full schema not in source
- id: volume_level
  type: integer
  notes: UNRESOLVED: valid range not in source
- id: mute_state
  type: boolean
  notes: UNRESOLVED: explicit schema not in source
```

## Variables
```yaml
# UNRESOLVED: source defines request bodies as opaque "object" types without property schemas.
# No discrete settable parameters documented beyond the body objects referenced above.
```

## Events
```yaml
# UNRESOLVED: notification stream payload schema not specified in source.
# Documented payload fields: cover art, metadata (song/artist/album/genre), source, volume, play state, song progress, friendly name, standby status.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
Source is a community OpenAPI spec (tanumkroken/beonetapi) for B&O Net Remote TCP/IP protocol. Explicitly excludes video products: "The protocol is also supported by B&O video products, but this is not covered by the API." Applicability to BeoPlay V1-32 is unverified — endpoints listed are documented as-is from the community spec.

Base URL `http://beoproduct.local:8080` relies on mDNS hostname resolution. Port 8080 extracted from base URL.

PUT/POST body schemas documented as `object` with no property-level detail in source — implementation will require schema discovery on device.

Supported audio product list in source: BeoPlay M3, M5, A6, A9 MK2, BeoSound Essence MK2, BeoSound Core, BeoSound Moment, BeoSound 1, BeoSound 2, BeoSound 35, BeoSound Shape, BeoSound Edge. V1-32 not listed.

<!-- UNRESOLVED: firmware version compatibility, RS-232/serial config, alternative transport (PUC/IR), PUC table mapping, video-specific endpoints (HDMI switching, picture mode, tuner control). -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
  - documenter.getpostman.com
  - khimo.github.io
source_urls:
  - https://raw.githubusercontent.com/tanumkroken/beonetapi/master/openapi_beonet.yml
  - https://documenter.getpostman.com/view/1053298/T1LTe4Lt
  - https://khimo.github.io/help_drivers/BeoLink/
retrieved_at: 2026-08-30T10:33:29.760Z
last_checked_at: 2026-08-30T22:16:05.851Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-30T22:16:05.851Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "All 33 spec actions are HTTP endpoints present verbatim in the source Command Summary; transport base URL and port match. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is community_report and explicitly notes \"The protocol is also supported by B&O video products, but this is not covered by the API.\" V1-32 support per endpoint is not confirmed."
- "valid range not stated in source)"
- "object schema not specified in source"
- "enum values not stated in source"
- "response body schemas not specified in source beyond data type hints."
- "full schema not in source"
- "valid range not in source"
- "explicit schema not in source"
- "source defines request bodies as opaque \"object\" types without property schemas."
- "notification stream payload schema not specified in source."
- "no multi-step sequences documented in source."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "firmware version compatibility, RS-232/serial config, alternative transport (PUC/IR), PUC table mapping, video-specific endpoints (HDMI switching, picture mode, tuner control)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
