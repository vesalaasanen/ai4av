---
spec_id: admin/govee-lights
schema_version: ai4av-public-spec-v1
revision: 1
title: "Govee Lights Control Spec"
manufacturer: Govee
model_family: H6601
aliases: []
compatible_with:
  manufacturers:
    - Govee
  models:
    - H6601
    - H605C
    - H7055
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - developer.govee.com
source_urls:
  - https://developer.govee.com/reference/get-you-devices
retrieved_at: 2026-04-30T04:41:17.184Z
last_checked_at: 2026-06-03T07:06:26.792Z
generated_at: 2026-06-03T07:06:26.792Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "control endpoint (PUT/POST for sending commands) not documented — only GET discovery shown"
  - "no command response format for control actions"
  - "firmware version compatibility not stated"
  - "the source describes capability types and their parameter schemas but does NOT document"
  - "no settable parameter endpoints documented beyond capability definitions"
  - "no unsolicited notification or webhook mechanism documented in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings, interlock procedures, or power-on sequencing in source"
  - "control endpoint URL and request body format not documented"
  - "no webhook or push notification mechanism for async state changes"
  - "actual per-device scene lists vary — discovery endpoint returns device-specific options"
verification:
  verdict: verified
  checked_at: 2026-06-03T07:06:26.792Z
  matched_actions: 11
  action_count: 11
  confidence: medium
  summary: "All 11 actions match capability instances in source (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Govee Lights Control Spec

## Summary
Govee RGBIC smart lights (models H6601, H605C, H7055) controlled via the Govee Open API, a cloud-hosted REST HTTP API. This spec covers the device discovery endpoint; the control endpoint for sending commands is documented only in capability definitions — actual command request format is not present in the source.

<!-- UNRESOLVED: control endpoint (PUT/POST for sending commands) not documented — only GET discovery shown -->
<!-- UNRESOLVED: no command response format for control actions -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "https://openapi.api.govee.com"
auth:
  type: api_key
  description: "API key passed via Govee-API-Key HTTP header"
rate_limit: "10000 requests/Account/Day"
```

## Traits
```yaml
- powerable       # inferred: powerSwitch on/off capability present
- levelable       # inferred: brightness (1-100%) and colorTemperatureK (2000-9000) range controls present
- queryable       # inferred: GET /router/api/v1/user/devices returns device capabilities and state
```

## Actions
```yaml
# UNRESOLVED: the source describes capability types and their parameter schemas but does NOT document
# the actual control endpoint URL, HTTP method, or request body format for sending commands.
# The capabilities below describe what the device supports based on discovery responses.

- id: power_on
  label: Power On
  kind: action
  description: "Turn device on via powerSwitch capability"
  params: []

- id: power_off
  label: Power Off
  kind: action
  description: "Turn device off via powerSwitch capability"
  params: []

- id: set_brightness
  label: Set Brightness
  kind: action
  description: "Set brightness via range capability (1-100%)"
  params:
    - name: brightness
      type: integer
      min: 1
      max: 100
      description: "Brightness percentage"

- id: set_color_rgb
  label: Set Color RGB
  kind: action
  description: "Set color via colorRgb capability (0-16777215 decimal RGB)"
  params:
    - name: rgb
      type: integer
      min: 0
      max: 16777215
      description: "RGB color as decimal integer"

- id: set_color_temperature
  label: Set Color Temperature
  kind: action
  description: "Set color temperature via colorTemperatureK capability (2000-9000K)"
  params:
    - name: kelvin
      type: integer
      min: 2000
      max: 9000
      description: "Color temperature in Kelvin"

- id: set_segment_color
  label: Set Segment Color
  kind: action
  description: "Set color on individual LED segments via segmentedColorRgb capability"
  params:
    - name: segment
      type: array
      description: "Array of segment indices (0-14)"
    - name: rgb
      type: integer
      min: 0
      max: 16777215
      description: "RGB color as decimal integer"

- id: toggle_gradient
  label: Toggle Gradient
  kind: action
  description: "Enable or disable gradient mode via gradientToggle capability"
  params:
    - name: state
      type: enum
      values: [on, off]

- id: set_light_scene
  label: Set Light Scene
  kind: action
  description: "Set a dynamic light scene via lightScene capability"
  params:
    - name: scene
      type: enum
      values:
        - Tudum
        - Party
        - Dance Party
        - Dine Together
        - Dating
        - Adventure
        - Technology
        - Sports
        - Dreamlike
        - Dynamic
        - Blossom
        - Christmas
        - Halloween
        - Fireworks
        - Ghost
        - Easter
        - "Valentine's Day"
        - Spin
        - Stacking
        - Shoot
        - Racing
        - Poker
        - Crossing
        - Fight
        - Electro Dance
        - Swing
        - Candy Crush
        - Portal
        - Freeze
        - Excited
        - Tension
        - Fright
        - Energetic
        - Doubt
        - Meditation
        - Daze
        - Action
        - Rivalry
        - Puzzle Game
        - Shooting Game
        - Racing Game
        - Card Playing

- id: set_music_mode
  label: Set Music Mode
  kind: action
  description: "Set music reactive mode via musicMode capability"
  params:
    - name: musicMode
      type: enum
      values: [Energic, Rhythm, Spectrum, Rolling]
      required: true
    - name: sensitivity
      type: integer
      min: 0
      max: 100
      description: "Music sensitivity percentage"
      required: true
    - name: autoColor
      type: enum
      values: [on, off]
      required: false
    - name: rgb
      type: integer
      min: 0
      max: 16777215
      description: "RGB color when autoColor is off"
      required: true

- id: set_diy_scene
  label: Set DIY Scene
  kind: action
  description: "Set a DIY scene via diyScene capability"
  params:
    - name: scene
      type: enum
      values: [Fade]
      description: "DIY scene name (options may vary by device)"

- id: set_snapshot
  label: Set Snapshot Scene
  kind: action
  description: "Set a snapshot scene via snapshot capability"
  params:
    - name: scene
      type: enum
      values: [Sunrise, Sunset]
      description: "Snapshot scene (options may vary by device)"
```

## Feedbacks
```yaml
- id: device_list
  type: object
  description: "GET /router/api/v1/user/devices returns array of devices with SKU, device ID, and capabilities"
  endpoint: "GET /router/api/v1/user/devices"

- id: power_state
  type: enum
  values: [on, off]
  description: "powerSwitch capability state"

- id: brightness
  type: integer
  min: 1
  max: 100
  description: "Current brightness percentage"

- id: color_rgb
  type: integer
  min: 0
  max: 16777215
  description: "Current RGB color as decimal"

- id: color_temperature
  type: integer
  min: 2000
  max: 9000
  description: "Current color temperature in Kelvin"
```

## Variables
```yaml
# UNRESOLVED: no settable parameter endpoints documented beyond capability definitions
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification or webhook mechanism documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing in source
```

## Notes
- The API uses an API key authentication model via the `Govee-API-Key` HTTP header.
- Rate limit: 10,000 requests per account per day. HTTP 429 indicates rate limit exceeded.
- HTTP 401 indicates unauthorized (invalid API key).
- Device capabilities are returned dynamically per device; the listed capabilities (powerSwitch, brightness, colorRgb, colorTemperatureK, segmentedColorRgb, gradientToggle, lightScene, musicMode, diyScene, snapshot) are from example devices H6601, H605C, and H7055.
- The source only documents the discovery endpoint (`GET /router/api/v1/user/devices`). The control endpoint for issuing commands is not present in the source material.
- Music mode enum values differ between devices (e.g., Spectrum value is 6 on H6601/H7055 but 4 on H605C; Rolling value is 4 on H6601/H7055 but 6 on H605C).
<!-- UNRESOLVED: control endpoint URL and request body format not documented -->
<!-- UNRESOLVED: no webhook or push notification mechanism for async state changes -->
<!-- UNRESOLVED: actual per-device scene lists vary — discovery endpoint returns device-specific options -->

## Provenance

```yaml
source_domains:
  - developer.govee.com
source_urls:
  - https://developer.govee.com/reference/get-you-devices
retrieved_at: 2026-04-30T04:41:17.184Z
last_checked_at: 2026-06-03T07:06:26.792Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T07:06:26.792Z
matched_actions: 11
action_count: 11
confidence: medium
summary: "All 11 actions match capability instances in source (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "control endpoint (PUT/POST for sending commands) not documented — only GET discovery shown"
- "no command response format for control actions"
- "firmware version compatibility not stated"
- "the source describes capability types and their parameter schemas but does NOT document"
- "no settable parameter endpoints documented beyond capability definitions"
- "no unsolicited notification or webhook mechanism documented in source"
- "no multi-step sequences documented in source"
- "no safety warnings, interlock procedures, or power-on sequencing in source"
- "control endpoint URL and request body format not documented"
- "no webhook or push notification mechanism for async state changes"
- "actual per-device scene lists vary — discovery endpoint returns device-specific options"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
