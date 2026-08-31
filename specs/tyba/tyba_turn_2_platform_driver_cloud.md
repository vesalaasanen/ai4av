---
spec_id: admin/tyba-turn-2-platform-driver
schema_version: ai4av-public-spec-v1
revision: 1
title: "Tyba Turn 2 Platform Driver Control Spec"
manufacturer: Tyba
model_family: "Turn 2"
aliases: []
compatible_with:
  manufacturers:
    - Tyba
  models:
    - "Turn 2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cloud.tybahome.com
source_urls:
  - https://cloud.tybahome.com:51443/apis/rest/v1.0/artifacts/latest/turnapp/Tyba_TY-K-TURN_Public_REST_API_Documentation
retrieved_at: 2026-07-17T02:45:35.193Z
last_checked_at: 2026-08-28T22:17:21.678Z
generated_at: 2026-08-28T22:17:21.678Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "error response formats / status codes beyond 200 not documented in source"
  - "rate limits, request timeouts not stated in source"
  - "Sonos integration endpoint response schema only described in prose, example not shown in source"
  - "exact payload values for next vs previous not stated in source\""
  - "no multi-step sequences explicitly described in source"
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "firmware version compatibility not stated in source"
  - "media/1/5 (next/prev) payload values not stated in source"
  - "HTTP error status codes and error body schema not documented in source"
  - "private API endpoints not documented in this source"
verification:
  verdict: verified
  checked_at: 2026-08-28T22:17:21.678Z
  matched_actions: 56
  action_count: 56
  confidence: medium
  summary: "All 56 spec actions match documented endpoints, Table 5/6 control-endpoint cells and payload shapes; transport port 55555 and base path verbatim. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-28
---

# Tyba Turn 2 Platform Driver Control Spec

## Summary
The Tyba Turn 2 is a wall-mounted rotary-dial control platform for lighting, shades, climate, and media, exposed via a public REST API served on each Turn device at `http://{host}:55555/api/v1.0/` returning JSON. Control is organized around pages and channels; each channel (e.g. `light/1/1`) carries state (`value`, `on`) modifiable by GET/PUT on `/control/channels/{channelId}/state` plus POST actions, with SSE feeds (`/control/events/...`) for subscriptions. This spec covers the public API documented in "Turn 2 Public API Documentation (1.4.4)"; the private API (page configuration, network settings) is out of scope.

<!-- UNRESOLVED: error response formats / status codes beyond 200 not documented in source -->
<!-- UNRESOLVED: rate limits, request timeouts not stated in source -->
<!-- UNRESOLVED: Sonos integration endpoint response schema only described in prose, example not shown in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://{host}:55555/api/v1.0/"
  port: 55555
auth:
  type: none  # inferred: no auth procedure in source. All requests DO require a "Sender-Id" header (any non-empty string) for event-source identification, not authentication.
```

## Traits
```yaml
# Add only traits supported by evidence from source:
traits:
  - queryable   # inferred from GET state/channel/config endpoints
  - levelable   # inferred from percentage/temperature setpoint channels (lights, shades, volume, climate setpoints)
```

## Actions
```yaml
# --- Core channel endpoints ---
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
      description: "Channel type e.g. light, shade, fan, modes, current_temperature, media_volume"

- id: get_channels_by_page
  label: Get Channels by Page
  kind: query
  command: "GET /api/v1.0/control/channels/{pageId}"
  params:
    - name: pageId
      type: string
      description: "Page id e.g. light/1"

- id: get_channel
  label: Get Channel by Id
  kind: query
  command: "GET /api/v1.0/control/channels/{channelId}"
  params:
    - name: channelId
      type: string
      description: "Channel id e.g. light/1/1"

- id: get_channel_state
  label: Get Channel State
  kind: query
  command: "GET /api/v1.0/control/channels/{channelId}/state"
  params:
    - name: channelId
      type: string
      description: "Channel id e.g. light/1/1"

- id: set_channel_state
  label: Set Channel State
  kind: action
  command: "PUT /api/v1.0/control/channels/{channelId}/state"
  body: '{"value": 50, "on": true}'
  params:
    - name: channelId
      type: string
      description: "Channel to modify"
    - name: value
      type: integer
      description: "State value per channel data type (percentage 0-100, temperature 0-212, preset 0-8); send value OR on"
    - name: on
      type: boolean
      description: "Switch state; send on OR value"

- id: get_channel_actions
  label: Get Channel Actions
  kind: query
  command: "GET /api/v1.0/control/channels/{channelId}/action/"
  params:
    - name: channelId
      type: string
      description: "Channel id e.g. light/1/1 (returns e.g. [\"increment_decrement\"])"

- id: post_channel_action
  label: Post Channel Action
  kind: action
  command: "POST /api/v1.0/control/channels/{channelId}/action"
  body: '{"increment_decrement": 0}'
  params:
    - name: channelId
      type: string
      description: "Channel to modify"
    - name: action_payload
      type: integer
      description: "Payloads are either 0 or 1; key is the action name e.g. increment_decrement, play_action, pause_action"

# --- Per-channel semantic actions (Table 6 rows; light/shade pages 1-5 parameterized as in source) ---
- id: set_light_value
  label: Set Light Level
  kind: action
  command: "PUT /api/v1.0/control/channels/light/{page}/1/state"
  body: '{"value": {level}}'
  params:
    - name: page
      type: integer
      description: "Light page 1-5"
    - name: level
      type: integer
      description: "Percentage 0-100"

- id: set_light_on
  label: Set Light On/Off
  kind: action
  command: "PUT /api/v1.0/control/channels/light/{page}/1/state"
  body: '{"on": {bool}}'
  params:
    - name: page
      type: integer
      description: "Light page 1-5"
    - name: bool
      type: boolean
      description: "true/false"

- id: light_increment_decrement
  label: Light Increment/Decrement
  kind: action
  command: "POST /api/v1.0/control/channels/light/{page}/1/action"
  body: '{"increment_decrement": {dir}}'
  params:
    - name: page
      type: integer
      description: "Light page 1-5"
    - name: dir
      type: integer
      description: "0 for decrement, 1 for increment"

- id: set_shade_value
  label: Set Shade Position
  kind: action
  command: "PUT /api/v1.0/control/channels/shade/{page}/1/state"
  body: '{"value": {level}}'
  params:
    - name: page
      type: integer
      description: "Shade page 1-5"
    - name: level
      type: integer
      description: "Percentage 0-100"

- id: set_shade_on
  label: Set Shade On/Off
  kind: action
  command: "PUT /api/v1.0/control/channels/shade/{page}/1/state"
  body: '{"on": {bool}}'
  params:
    - name: page
      type: integer
      description: "Shade page 1-5"
    - name: bool
      type: boolean
      description: "true/false"

- id: shade_increment_decrement
  label: Shade Increment/Decrement
  kind: action
  command: "POST /api/v1.0/control/channels/shade/{page}/1/action"
  body: '{"increment_decrement": {dir}}'
  params:
    - name: page
      type: integer
      description: "Shade page 1-5"
    - name: dir
      type: integer
      description: "0 for decrement, 1 for increment"

- id: set_light_scenes_preset
  label: Set Light Scenes Preset
  kind: action
  command: "PUT /api/v1.0/control/channels/light_scenes/1/1/state"
  body: '{"value": {preset}}'
  params:
    - name: preset
      type: integer
      description: "Preset 0-8"

- id: set_light_scenes_on
  label: Set Light Scenes On/Off
  kind: action
  command: "PUT /api/v1.0/control/channels/light_scenes/1/1/state"
  body: '{"on": {bool}}'
  params:
    - name: bool
      type: boolean
      description: "true/false"

- id: light_scenes_increment_decrement
  label: Light Scenes Increment/Decrement
  kind: action
  command: "POST /api/v1.0/control/channels/light_scenes/1/1/action"
  body: '{"increment_decrement": {dir}}'
  params:
    - name: dir
      type: integer
      description: "0 for decrement, 1 for increment"

- id: set_shade_scenes_preset
  label: Set Shade Scenes Preset
  kind: action
  command: "PUT /api/v1.0/control/channels/shade_scenes/1/1/state"
  body: '{"value": {preset}}'
  params:
    - name: preset
      type: integer
      description: "Preset 0-8"

- id: set_shade_scenes_on
  label: Set Shade Scenes On/Off
  kind: action
  command: "PUT /api/v1.0/control/channels/shade_scenes/1/1/state"
  body: '{"on": {bool}}'
  params:
    - name: bool
      type: boolean
      description: "true/false"

- id: shade_scenes_increment_decrement
  label: Shade Scenes Increment/Decrement
  kind: action
  command: "POST /api/v1.0/control/channels/shade_scenes/1/1/action"
  body: '{"increment_decrement": {dir}}'
  params:
    - name: dir
      type: integer
      description: "0 for decrement, 1 for increment"

- id: set_temperature_setpoint
  label: Set Temperature Setpoint
  kind: action
  command: "PUT /api/v1.0/control/channels/temperature/1/1/state"
  body: '{"value": {temp}}'
  params:
    - name: temp
      type: number
      description: "Temperature 0-212"

- id: temperature_increment_decrement
  label: Temperature Setpoint Increment/Decrement
  kind: action
  command: "POST /api/v1.0/control/channels/temperature/1/1/action"
  body: '{"increment_decrement": {dir}}'
  params:
    - name: dir
      type: integer
      description: "0 for decrement, 1 for increment"

- id: set_humidity_setpoint
  label: Set Humidity Setpoint
  kind: action
  command: "PUT /api/v1.0/control/channels/humidity/1/1/state"
  body: '{"value": {level}}'
  params:
    - name: level
      type: integer
      description: "Percentage 0-100"

- id: humidity_increment_decrement
  label: Humidity Setpoint Increment/Decrement
  kind: action
  command: "POST /api/v1.0/control/channels/humidity/1/1/action"
  body: '{"increment_decrement": {dir}}'
  params:
    - name: dir
      type: integer
      description: "0 for decrement, 1 for increment"

- id: set_fan_preset
  label: Set Fan Preset
  kind: action
  command: "PUT /api/v1.0/control/channels/fan/1/1/state"
  body: '{"value": {preset}}'
  params:
    - name: preset
      type: integer
      description: "Preset 0-8"

- id: set_fan_on
  label: Set Fan On/Off
  kind: action
  command: "PUT /api/v1.0/control/channels/fan/1/1/state"
  body: '{"on": {bool}}'
  params:
    - name: bool
      type: boolean
      description: "true/false"

- id: fan_increment_decrement
  label: Fan Increment/Decrement
  kind: action
  command: "POST /api/v1.0/control/channels/fan/1/1/action"
  body: '{"increment_decrement": {dir}}'
  params:
    - name: dir
      type: integer
      description: "0 for decrement, 1 for increment"

- id: set_modes_preset
  label: Set Mode
  kind: action
  command: "PUT /api/v1.0/control/channels/modes/1/1/state"
  body: '{"value": {preset}}'
  params:
    - name: preset
      type: integer
      description: "Preset index; names configured per device (example: Off,Heat,Cool,Away,Home)"

- id: set_modes_on
  label: Set Modes On/Off
  kind: action
  command: "PUT /api/v1.0/control/channels/modes/1/1/state"
  body: '{"on": {bool}}'
  params:
    - name: bool
      type: boolean
      description: "true/false"

- id: modes_increment_decrement
  label: Modes Increment/Decrement
  kind: action
  command: "POST /api/v1.0/control/channels/modes/1/1/action"
  body: '{"increment_decrement": {dir}}'
  params:
    - name: dir
      type: integer
      description: "0 for decrement, 1 for increment"

- id: set_media_volume
  label: Set Media Volume
  kind: action
  command: "PUT /api/v1.0/control/channels/media/1/1/state"
  body: '{"value": {level}}'
  params:
    - name: level
      type: integer
      description: "Percentage 0-100"

- id: media_volume_increment_decrement
  label: Media Volume Increment/Decrement
  kind: action
  command: "POST /api/v1.0/control/channels/media/1/1/action"
  body: '{"increment_decrement": {dir}}'
  params:
    - name: dir
      type: integer
      description: "0 for decrement, 1 for increment"

- id: set_media_play_pause
  label: Set Media Play/Pause
  kind: action
  command: "PUT /api/v1.0/control/channels/media/1/2/state"
  body: '{"value": {bool}}'
  params:
    - name: bool
      type: boolean
      description: "true for play, false for pause (method 1)"

- id: media_play_action
  label: Media Play Action
  kind: action
  command: "POST /api/v1.0/control/channels/media/1/2/action"
  body: '{"play_action": "1"}'
  params: []

- id: media_pause_action
  label: Media Pause Action
  kind: action
  command: "POST /api/v1.0/control/channels/media/1/2/action"
  body: '{"pause_action": "1"}'
  params: []

- id: set_media_play_stop
  label: Set Media Play/Stop
  kind: action
  command: "PUT /api/v1.0/control/channels/media/1/3/state"
  body: '{"value": {bool}}'
  params:
    - name: bool
      type: boolean
      description: "true=play, false=stop; playing requires media/1/3 true AND media/1/4 false (method 3)"

- id: set_media_pause_unpause
  label: Set Media Pause/Unpause
  kind: action
  command: "PUT /api/v1.0/control/channels/media/1/4/state"
  body: '{"value": {bool}}'
  params:
    - name: bool
      type: boolean
      description: "false=unpaused; playing requires media/1/3 true AND media/1/4 false (method 3)"

- id: set_media_skip
  label: Media Next/Previous
  kind: action
  command: "PUT /api/v1.0/control/channels/media/1/5/state"
  body: '{"value": {payload}}'
  params:
    - name: payload
      type: string
      description: "media_transport_skip channel, dataType action (string payload). UNRESOLVED: exact payload values for next vs previous not stated in source"

- id: set_media_mute
  label: Set Media Mute
  kind: action
  command: "PUT /api/v1.0/control/channels/media/1/6/state"
  body: '{"value": {bool}}'
  params:
    - name: bool
      type: boolean
      description: "true/false switch"

- id: set_source_select
  label: Select Media Source
  kind: action
  command: "PUT /api/v1.0/control/channels/source/1/1/state"
  body: '{"value": {preset}}'
  params:
    - name: preset
      type: integer
      description: "Preset index selecting one of up to 8 configured sources"

# --- Global state ---
- id: get_all_control_states
  label: Get All Control States
  kind: query
  command: "GET /api/v1.0/control/state"
  params: []

- id: put_control_state
  label: Put Control State
  kind: action
  command: "PUT /api/v1.0/control/state"
  body: '{"ready": "false"}'
  params:
    - name: state_key
      type: string
      description: "Control state key to set e.g. ready"

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

- id: global_action_reset
  label: Global Reset
  kind: action
  command: "POST /api/v1.0/control/action/reset"
  params: []
  # resets all control states and channels to their initial state

# --- Config ---
- id: get_config
  label: Get Config
  kind: query
  command: "GET /api/v1.0/config"
  params: []

- id: get_config_version
  label: Get Config Version
  kind: query
  command: "GET /api/v1.0/config/version"
  params: []

- id: get_integrations
  label: Get Integrations
  kind: query
  command: "GET /api/v1.0/integrations"
  params: []

# --- SSE subscriptions ---
- id: subscribe_all_channel_events
  label: Subscribe All Channel Events
  kind: query
  command: "GET /api/v1.0/control/events/channels"
  params: []

- id: subscribe_channel_events_by_type
  label: Subscribe Channel Events by Type
  kind: query
  command: "GET /api/v1.0/control/events/channels/{channelType}"
  params:
    - name: channelType
      type: string
      description: "The channel type"

- id: subscribe_channel_events_by_page
  label: Subscribe Channel Events by Page
  kind: query
  command: "GET /api/v1.0/control/events/channels/{channelIndex}"
  params:
    - name: channelIndex
      type: string
      description: "The channel type/index to listen to"

- id: subscribe_channel_events_by_id
  label: Subscribe Channel Events by Id
  kind: query
  command: "GET /api/v1.0/control/events/channels/{channelId}"
  params:
    - name: channelId
      type: string
      description: "The channel to listen to"

- id: subscribe_all_control_state_events
  label: Subscribe All Control State Events
  kind: query
  command: "GET /api/v1.0/control/events/state"
  params: []

- id: subscribe_control_state_events_by_state
  label: Subscribe Control State Events by State
  kind: query
  command: "GET /api/v1.0/control/events/state/{state}"
  params:
    - name: state
      type: string
      description: "The state to listen to e.g. internal_temperature"

- id: subscribe_config_events
  label: Subscribe Config Events
  kind: query
  command: "GET /api/v1.0/config/events"
  params: []
```

## Feedbacks
```yaml
- id: channel_state
  type: object
  values: [value, on]
  description: "Per-channel state mapping e.g. {\"value\": 0, \"on\": \"false\"}; retrieved via GET /control/channels/{channelId}/state"

- id: current_temperature
  type: number
  description: "temperature/1/2 current_temperature channel, dataType temperature 0-212"

- id: current_humidity
  type: number
  description: "humidity/1/2 current_humidity channel, dataType percentage 0-100"

- id: air_quality
  type: string
  description: "info/1/1 ppm_string endpoint; value rounded half-up and appended with \"ppm\""

- id: air_pressure
  type: string
  description: "info/2/1 pa_string endpoint; value rounded half-up and appended with \"Pa\""

- id: media_artwork
  type: string
  description: "source/1/2 media_artwork channel, image URL string"

- id: media_metadata_artist
  type: string
  description: "source/1/3 media_metadata channel (Artist)"

- id: media_metadata_track
  type: string
  description: "source/1/4 media_metadata channel (Track)"

- id: internal_temperature
  type: object
  description: "{\"value\": \"0.0\", \"fahrenheit\": \"32.0\"}"

- id: internal_temperature_fahrenheit
  type: number
  description: "{\"fahrenheit\": \"32.0\"}"

- id: all_control_states
  type: object
  description: "GET /control/state e.g. {\"internal_temperature\": 0}"

- id: config
  type: object
  description: "Page configuration from GET /config (pages, channels, sources)"

- id: config_version
  type: string
  description: "Feature/version indicator e.g. \"2.0.0\"; corresponds to API documentation version"
```

## Variables
```yaml
- id: light_level
  type: integer
  range: "0-100"
  description: "Per light page (light/1/1 .. light/5/1), percentage"

- id: shade_position
  type: integer
  range: "0-100"
  description: "Per shade page (shade/1/1 .. shade/5/1), percentage"

- id: temperature_setpoint
  type: number
  range: "0-212"
  description: "temperature/1/1 setpoint_temperature"

- id: humidity_setpoint
  type: integer
  range: "0-100"
  description: "humidity/1/1 setpoint_humidity, percentage"

- id: media_volume
  type: integer
  range: "0-100"
  description: "media/1/1 media_volume, percentage"

- id: fan_preset
  type: integer
  range: "0-8"
  description: "fan/1/1 preset"

- id: modes_preset
  type: integer
  range: "0-8"
  description: "modes/1/1 preset; count/names per device config"

- id: light_scenes_preset
  type: integer
  range: "0-8"
  description: "light_scenes/1/1 preset"

- id: shade_scenes_preset
  type: integer
  range: "0-8"
  description: "shade_scenes/1/1 preset"

- id: source_select
  type: integer
  range: "0-8"
  description: "source/1/1 preset; up to 8 selectable sources"
```

## Events
```yaml
- id: channel_state_changed
  description: "SSE push on channel state change; subscribe via /control/events/channels (all), /{channelType}, /{channelIndex}, or /{channelId}. Events carry the Sender-Id of the originator"

- id: control_state_changed
  description: "SSE push on global control state change; subscribe via /control/events/state or /control/events/state/{state} (e.g. internal_temperature)"

- id: config_updated
  description: "SSE config update notification; subscribe via /config/events"

- id: heartbeat
  description: "All SSE endpoints emit a heartbeat comment (`: heartbeat`) every 30 seconds; ignore or use for connection health monitoring"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements found in source
```

## Notes
- All HTTP requests require a `Sender-Id` header (any non-empty string, example `TybaHome`). It is echoed in SSE events so clients can ignore self-originated events and avoid feedback loops.
- Three synchronized play/pause methods exist for transport sources: (1) `media/1/2` value true/false; (2) `play_action`/`pause_action` POST actions with payload `"1"` on `media/1/2`; (3) `media/1/3` (play/stop) true AND `media/1/4` (pause/unpause) false = playing. Pick one; all stay in sync.
- Channel endpoints stay synchronized: setting `value` 0→20 also flips `on` to true.
- `increment_decrement` payload: 0 = decrement, 1 = increment.
- `ppm_string`/`pa_string` endpoints accept string/int/float, round half-up to integer, return string suffixed "ppm"/"Pa".
- Page limits: light/shade pages 0-5 each, scenes 0-1, climate pages 0-1, media 0-1. Sources page lists up to 8 sources (config `sources` property: name, power, transport, controlType main_bus|sonos).
- API is split public (this spec) / private (page configuration, network settings, sleep timeout — not documented here).
- API documentation version 1.4.4; `GET /config/version` reports config feature version (e.g. "2.0.0").
- Sonos integration exposed at `/api/v1.0/integrations`; includes endpoint for next/previous transport-controls enabled status.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: media/1/5 (next/prev) payload values not stated in source -->
<!-- UNRESOLVED: HTTP error status codes and error body schema not documented in source -->
<!-- UNRESOLVED: private API endpoints not documented in this source -->

## Provenance

```yaml
source_domains:
  - cloud.tybahome.com
source_urls:
  - https://cloud.tybahome.com:51443/apis/rest/v1.0/artifacts/latest/turnapp/Tyba_TY-K-TURN_Public_REST_API_Documentation
retrieved_at: 2026-07-17T02:45:35.193Z
last_checked_at: 2026-08-28T22:17:21.678Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-28T22:17:21.678Z
matched_actions: 56
action_count: 56
confidence: medium
summary: "All 56 spec actions match documented endpoints, Table 5/6 control-endpoint cells and payload shapes; transport port 55555 and base path verbatim. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "error response formats / status codes beyond 200 not documented in source"
- "rate limits, request timeouts not stated in source"
- "Sonos integration endpoint response schema only described in prose, example not shown in source"
- "exact payload values for next vs previous not stated in source\""
- "no multi-step sequences explicitly described in source"
- "no safety warnings, interlock procedures, or power-on sequencing"
- "firmware version compatibility not stated in source"
- "media/1/5 (next/prev) payload values not stated in source"
- "HTTP error status codes and error body schema not documented in source"
- "private API endpoints not documented in this source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
