---
spec_id: admin/tyba-ty-k-turn
schema_version: ai4av-public-spec-v1
revision: 1
title: "Tyba TY-K-TURN Control Spec"
manufacturer: Tyba
model_family: TY-K-TURN
aliases: []
compatible_with:
  manufacturers:
    - Tyba
  models:
    - TY-K-TURN
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cloud.tybahome.com
  - drivers-api.crestron.io
  - tybahome.com
source_urls:
  - https://cloud.tybahome.com:51443/apis/rest/v1.0/artifacts/latest/turnapp/Tyba_TY-K-TURN_Public_REST_API_Documentation
  - https://cloud.tybahome.com:51443/apis/rest/v1.0/artifacts/latest/turn-crestron/Tyba-TY-K-TURN-Crestron-IP-Driver.zip
  - https://drivers-api.crestron.io/help/driver/5138
  - https://tybahome.com/resources
retrieved_at: 2026-07-22T00:47:07.582Z
last_checked_at: 2026-07-22T01:34:52.881Z
generated_at: 2026-07-22T01:34:52.881Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device firmware compatibility, authentication beyond Sender-Id requirement, and error behavior are not stated in source"
  - "no multi-step macro sequences explicitly documented in source"
  - "no safety warnings, interlock procedures, or power-on sequencing requirements stated in source"
  - "authentication credentials, error responses, retry behavior, firmware compatibility, and device-specific configured channel availability are not stated in source."
verification:
  verdict: verified
  checked_at: 2026-07-22T01:34:52.881Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions matched to source endpoints or documented payloads; port 55555 and API path verified; transport parameters confirmed. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Tyba TY-K-TURN Control Spec

## Summary
Tyba TY-K-TURN exposes a public REST API over HTTP on TCP port 55555. API base path is `/api/v1.0/`; requests require a non-empty `Sender-Id` header, and responses use JSON where documented. The API controls configurable pages, channels, global state, server-sent events, configuration, and Sonos transport integration.

<!-- UNRESOLVED: device firmware compatibility, authentication beyond Sender-Id requirement, and error behavior are not stated in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  port: 55555
  base_url: "http://{host}:55555/api/v1.0/"
auth:
  type: none  # inferred: no login or password procedure in source
```

## Traits
```yaml
traits:
  - routable  # inferred from source-selection and channel-control endpoints
  - queryable  # inferred from documented GET state and configuration endpoints
  - levelable  # inferred from percentage-based light, shade, temperature, humidity, and media-volume channels
```

## Actions
```yaml
- id: get_all_channels
  label: Get All Channels
  kind: query
  command: "GET /api/v1.0/control/channels"
  params: []

- id: get_channels_by_type
  label: Get Channels by Channel Type
  kind: query
  command: "GET /api/v1.0/control/channels/{channelType}"
  params:
    - name: channelType
      type: string
      description: Channel type

- id: get_channels_by_page
  label: Get Channels by Page
  kind: query
  command: "GET /api/v1.0/control/channels/{pageId}"
  params:
    - name: pageId
      type: string
      description: Page identifier

- id: get_channel
  label: Get Channel
  kind: query
  command: "GET /api/v1.0/control/channels/{channelId}"
  params:
    - name: channelId
      type: string
      description: Channel identifier

- id: get_channel_state
  label: Get Channel State
  kind: query
  command: "GET /api/v1.0/control/channels/{channelId}/state"
  params:
    - name: channelId
      type: string
      description: Channel identifier

- id: set_channel_state
  label: Set Channel State
  kind: action
  command: "PUT /api/v1.0/control/channels/{channelId}/state"
  params:
    - name: channelId
      type: string
      description: Channel identifier
    - name: value
      type: number
      description: Channel value
    - name: on
      type: boolean
      description: Channel on/off state

- id: get_channel_actions
  label: Get Channel Actions
  kind: query
  command: "GET /api/v1.0/control/channels/{channelId}/action/"
  params:
    - name: channelId
      type: string
      description: Channel identifier

- id: channel_action
  label: Execute Channel Action
  kind: action
  command: "POST /api/v1.0/control/channels/{channelId}/action"
  params:
    - name: channelId
      type: string
      description: Channel identifier
    - name: action
      type: string
      description: Action endpoint name
    - name: payload
      type: integer
      description: Documented action payload, normally 0 or 1

- id: increment_decrement
  label: Increment or Decrement Channel
  kind: action
  command: "{\"increment_decrement\": 0}"
  params:
    - name: increment_decrement
      type: integer
      description: 0 for decrement, 1 for increment

- id: play_action
  label: Play Action
  kind: action
  command: "{\"play_action\":\"1\"}"
  params: []

- id: pause_action
  label: Pause Action
  kind: action
  command: "{\"pause_action\":\"1\"}"
  params: []

- id: get_all_channel_events
  label: Subscribe to All Channel Events
  kind: query
  command: "GET /api/v1.0/control/events/channels"
  params: []

- id: get_channel_type_events
  label: Subscribe to Channel-Type Events
  kind: query
  command: "GET /api/v1.0/control/events/channels/{channelType}"
  params:
    - name: channelType
      type: string
      description: Channel type

- id: get_channel_index_events
  label: Subscribe to Channel-Index Events
  kind: query
  command: "GET /api/v1.0/control/events/channels/{channelIndex}"
  params:
    - name: channelIndex
      type: string
      description: Channel type and index

- id: get_channel_events
  label: Subscribe to Channel Events
  kind: query
  command: "GET /api/v1.0/control/events/channels/{channelId}"
  params:
    - name: channelId
      type: string
      description: Channel identifier

- id: get_all_control_state_events
  label: Subscribe to All Control-State Events
  kind: query
  command: "GET /api/v1.0/control/events/state"
  params: []

- id: get_control_state_events
  label: Subscribe to Control-State Events
  kind: query
  command: "GET /api/v1.0/control/events/state/{state}"
  params:
    - name: state
      type: string
      description: Control state name

- id: get_internal_temperature
  label: Get Internal Temperature
  kind: query
  command: "GET /api/v1.0/control/state/internal_temperature"
  params: []

- id: get_internal_temperature_value
  label: Get Internal Temperature Value
  kind: query
  command: "GET /api/v1.0/control/state/internal_temperature/value"
  params: []

- id: get_internal_temperature_fahrenheit
  label: Get Internal Temperature Fahrenheit
  kind: query
  command: "GET /api/v1.0/control/state/internal_temperature/fahrenheit"
  params: []

- id: get_control_state
  label: Get All Control State
  kind: query
  command: "GET /api/v1.0/control/state"
  params: []

- id: set_control_state
  label: Set Control State
  kind: action
  command: "PUT /api/v1.0/control/state"
  params:
    - name: state
      type: object
      description: Control-state object

- id: reset_control_state
  label: Reset Control State
  kind: action
  command: "POST /api/v1.0/control/action/{action}"
  params:
    - name: action
      type: string
      description: Use documented value `reset`

- id: get_configuration
  label: Get Page Configuration
  kind: query
  command: "GET /api/v1.0/config"
  params: []

- id: get_config_version
  label: Get Configuration Version
  kind: query
  command: "GET /api/v1.0/config/version"
  params: []

- id: subscribe_config_events
  label: Subscribe to Configuration Events
  kind: query
  command: "GET /api/v1.0/config/events"
  params: []

- id: get_sonos_transport_controls
  label: Get Sonos Transport Controls Policy
  kind: query
  command: "GET /api/v1.0/integrations/sonos/transportControls"
  params: []

- id: subscribe_sonos_transport_controls
  label: Subscribe to Sonos Transport Controls Policy
  kind: query
  command: "GET /api/v1.0/integrations/sonos/transportControls/stream"
  params: []
```

## Feedbacks
```yaml
- id: channel_state
  type: object
  description: Channel endpoint states, including value and on where supported

- id: internal_temperature
  type: object
  values:
    - value
    - fahrenheit

- id: control_state
  type: object
  description: Global control state values

- id: configuration
  type: object
  description: Page and channel configuration

- id: configuration_version
  type: string
  description: Configuration/API version

- id: sonos_transport_controls
  type: object
  values:
    - previousEnabled
    - nextEnabled
```

## Variables
```yaml
- id: channel_value
  type: number
  description: Channel value, constrained by channel data type

- id: channel_on
  type: boolean
  description: Channel on/off state where supported

- id: increment_decrement
  type: integer
  values: [0, 1]
  description: 0 for decrement, 1 for increment

- id: sender_id
  type: string
  description: Required non-empty Sender-Id request header
```

## Events
```yaml
- id: channel_events
  transport: sse
  command: "GET /api/v1.0/control/events/channels"

- id: channel_type_events
  transport: sse
  command: "GET /api/v1.0/control/events/channels/{channelType}"

- id: channel_index_events
  transport: sse
  command: "GET /api/v1.0/control/events/channels/{channelIndex}"

- id: channel_events_by_id
  transport: sse
  command: "GET /api/v1.0/control/events/channels/{channelId}"

- id: control_state_events
  transport: sse
  command: "GET /api/v1.0/control/events/state"

- id: control_state_events_by_name
  transport: sse
  command: "GET /api/v1.0/control/events/state/{state}"

- id: config_events
  transport: sse
  command: "GET /api/v1.0/config/events"

- id: sonos_transport_controls_stream
  transport: sse
  command: "GET /api/v1.0/integrations/sonos/transportControls/stream"

- id: sse_heartbeat
  transport: sse
  description: SSE endpoints emit `: heartbeat` every 30 seconds
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences explicitly documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements stated in source
```

## Notes
All HTTP requests require a non-empty `Sender-Id` header. Sender identifier appears in SSE events and can prevent feedback loops by allowing clients to ignore events originating from themselves. SSE heartbeat emitted every 30 seconds.

<!-- UNRESOLVED: authentication credentials, error responses, retry behavior, firmware compatibility, and device-specific configured channel availability are not stated in source. -->

## Provenance

```yaml
source_domains:
  - cloud.tybahome.com
  - drivers-api.crestron.io
  - tybahome.com
source_urls:
  - https://cloud.tybahome.com:51443/apis/rest/v1.0/artifacts/latest/turnapp/Tyba_TY-K-TURN_Public_REST_API_Documentation
  - https://cloud.tybahome.com:51443/apis/rest/v1.0/artifacts/latest/turn-crestron/Tyba-TY-K-TURN-Crestron-IP-Driver.zip
  - https://drivers-api.crestron.io/help/driver/5138
  - https://tybahome.com/resources
retrieved_at: 2026-07-22T00:47:07.582Z
last_checked_at: 2026-07-22T01:34:52.881Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:34:52.881Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions matched to source endpoints or documented payloads; port 55555 and API path verified; transport parameters confirmed. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device firmware compatibility, authentication beyond Sender-Id requirement, and error behavior are not stated in source"
- "no multi-step macro sequences explicitly documented in source"
- "no safety warnings, interlock procedures, or power-on sequencing requirements stated in source"
- "authentication credentials, error responses, retry behavior, firmware compatibility, and device-specific configured channel availability are not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
