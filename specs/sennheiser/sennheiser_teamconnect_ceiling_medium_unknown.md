---
spec_id: admin/sennheiser-teamconnect-ceiling-medium
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sennheiser TeamConnect Ceiling Medium Control Spec"
manufacturer: Sennheiser
model_family: "TeamConnect Ceiling Medium"
aliases: []
compatible_with:
  manufacturers:
    - Sennheiser
  models:
    - "TeamConnect Ceiling Medium"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sennheiser-sites.com
  - assets.sennheiser.com
source_urls:
  - https://www.sennheiser-sites.com/responsive-manuals/en/api-docs/api-docs/open-api-tc-ceiling-medium.html
  - "https://assets.sennheiser.com/download/assets/EW-DX_Sound_Control_Protocol_03_2023_EN.pdf/69f9d4bee7b611f0ae307aeaa9c3764a?attachment=true"
  - https://www.sennheiser-sites.com/responsive-manuals/en/api-docs/index.html
  - https://www.sennheiser-sites.com/responsive-manuals/en/api-docs/api-docs/sound-control-protocol.html
  - https://www.sennheiser-sites.com/responsive-manuals/en/api-docs/api-docs/sscv2-specification-2.3.html
retrieved_at: 2026-06-15T02:43:51.190Z
last_checked_at: 2026-10-01T07:21:43.117Z
generated_at: 2026-10-01T07:21:43.117Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no request/response body schemas in this excerpt (only endpoint index). auth model referenced as \"Authorize\" in Swagger UI but no procedure documented."
  - "response body schemas / value enums not included in this source excerpt"
  - "variable types, ranges, and enums not stated in this source excerpt"
  - "event payload schema and notification transport not stated in this source excerpt"
  - "no multi-step sequences described in this source excerpt"
  - "source excerpt contains no safety warnings, interlock procedures,"
  - "(1) auth/security scheme; (2) request/response body schemas and parameter enums/ranges; (3) firmware version compatibility; (4) subscription event payload format; (5) any timing/retry/backoff requirements"
verification:
  verdict: verified
  checked_at: 2026-10-01T07:21:43.117Z
  matched_actions: 57
  action_count: 57
  confidence: medium
  summary: "All 57 spec endpoints match the 57 distinct source endpoints verbatim; HTTPS/443 transport present; FastResource tag duplicates excluded per spec Notes. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Sennheiser TeamConnect Ceiling Medium Control Spec

## Summary
Sennheiser TeamConnect Ceiling Medium (TCC M) is a ceiling-array conference microphone with integrated DSP. This spec covers the device's HTTPS REST control API ("SSCv2 / OpenAPI 1.9") exposed on port 443, exposing microphone beam, zones, mute, equalizer, voice lift, LED ring, room-in-use, subscriptions, and device/firmware status endpoints. No RS-232 / TCP-telnet control documented.

<!-- UNRESOLVED: no request/response body schemas in this excerpt (only endpoint index). auth model referenced as "Authorize" in Swagger UI but no procedure documented. -->

## Transport
```yaml
protocols:
  - https
addressing:
  base_url: "https://{deviceIP}"  # deviceIP is a per-device server variable
  port: 443
auth:
  type: UNRESOLVED  # Swagger "Authorize" button has no documented scheme; no source-supported auth type can be asserted
```

## Traits
```yaml
# - queryable       (inferred: many GET status endpoints documented)
# - levelable       (inferred: microphone level, reference level, equalizer, output gain endpoints)
```

## Actions
```yaml
# All commands documented in the OpenAPI 1.9 index. GET = kind: query; PUT/DELETE = kind: action.
# Paths are verbatim from source. Request/response body schemas are NOT in this excerpt - marked UNRESOLVED in Notes.

# --- SSC (Sound Control Protocol / subscriptions) ---
- id: ssc_version_query
  label: SSC Schema Version Query
  kind: query
  command: "GET /api/ssc/version"
  params: []

- id: ssc_schema_query
  label: SSC Address Tree Query
  kind: query
  command: "GET /api/ssc/schema"
  params: []

- id: ssc_subscriptions_start
  label: Start Subscription
  kind: query
  command: "GET /api/ssc/state/subscriptions"
  params: []

- id: ssc_subscription_get
  label: Get Subscription List
  kind: query
  command: "GET /api/ssc/state/subscriptions/{sessionUUID}"
  params:
    - name: sessionUUID
      type: string
      description: Subscription session identifier

- id: ssc_subscription_set
  label: Set Subscription List
  kind: action
  command: "PUT /api/ssc/state/subscriptions/{sessionUUID}"
  params:
    - name: sessionUUID
      type: string
      description: Subscription session identifier

- id: ssc_subscription_end
  label: End Subscription
  kind: action
  command: "DELETE /api/ssc/state/subscriptions/{sessionUUID}"
  params:
    - name: sessionUUID
      type: string
      description: Subscription session identifier

- id: ssc_subscription_add
  label: Add Resources to Subscription
  kind: action
  command: "PUT /api/ssc/state/subscriptions/{sessionUUID}/add"
  params:
    - name: sessionUUID
      type: string
      description: Subscription session identifier

- id: ssc_subscription_remove
  label: Remove Resources from Subscription
  kind: action
  command: "PUT /api/ssc/state/subscriptions/{sessionUUID}/remove"
  params:
    - name: sessionUUID
      type: string
      description: Subscription session identifier

# --- Device ---
- id: device_identity_query
  label: Device Identity Query
  kind: query
  command: "GET /api/device/identity"
  params: []

- id: device_identification_get
  label: Device Identification State Query
  kind: query
  command: "GET /api/device/identification"
  params: []

- id: device_identification_set
  label: Set Device Identification State
  kind: action
  command: "PUT /api/device/identification"
  params: []

- id: device_site_query
  label: Device Site Information Query
  kind: query
  command: "GET /api/device/site"
  params: []

- id: device_state_query
  label: Device State Query
  kind: query
  command: "GET /api/device/state"
  params: []

- id: device_leds_ring_get
  label: LED Ring Settings Query
  kind: query
  command: "GET /api/device/leds/ring"
  params: []

- id: device_leds_ring_set
  label: Set LED Ring Brightness and Colors
  kind: action
  command: "PUT /api/device/leds/ring"
  params: []

- id: device_power_poe_daisychain_query
  label: PoE Daisy Chain State Query
  kind: query
  command: "GET /api/device/power/poe/daisychain"
  params: []

# --- Firmware Update ---
- id: firmware_update_state_query
  label: Firmware Update State Query
  kind: query
  command: "GET /api/firmware/update/state"
  params: []

# --- Audio ---
- id: audio_mute_get
  label: Global Mute Status Query
  kind: query
  command: "GET /api/audio/outputs/global/mute"
  params: []

- id: audio_mute_set
  label: Mute All Audio Outputs
  kind: action
  command: "PUT /api/audio/outputs/global/mute"
  params: []

- id: audio_mic_beam_get
  label: Microphone Beam Settings Query
  kind: query
  command: "GET /api/audio/inputs/microphone/beam"
  params: []

- id: audio_mic_beam_set
  label: Set Microphone Beam Settings
  kind: action
  command: "PUT /api/audio/inputs/microphone/beam"
  params: []

- id: audio_mic_beam_direction_query
  label: Microphone Beam Direction Query
  kind: query
  command: "GET /api/audio/inputs/microphone/beam/direction"
  params: []

- id: audio_mic_level_query
  label: Microphone Input Level Query
  kind: query
  command: "GET /api/audio/inputs/microphone/level"
  params: []

- id: audio_reference_level_query
  label: Digital Reference Input Level Query
  kind: query
  command: "GET /api/audio/inputs/reference/level"
  params: []

- id: audio_room_in_use_query
  label: Room In Use State Query
  kind: query
  command: "GET /api/audio/roomInUse"
  params: []

- id: audio_room_in_use_activity_query
  label: Room In Use Activity Level Query
  kind: query
  command: "GET /api/audio/roomInUse/activityLevel"
  params: []

- id: audio_room_in_use_config_query
  label: Room In Use Config Query
  kind: query
  command: "GET /api/audio/roomInUse/config"
  params: []

- id: audio_outputs_analog_get
  label: Analog Output Settings Query
  kind: query
  command: "GET /api/audio/outputs/analog"
  params: []

- id: audio_outputs_analog_set
  label: Set Analog Output Settings
  kind: action
  command: "PUT /api/audio/outputs/analog"
  params: []

- id: audio_outputs_dante_farend_get
  label: Dante Far End Output Settings Query
  kind: query
  command: "GET /api/audio/outputs/dante/farEnd"
  params: []

- id: audio_outputs_dante_farend_set
  label: Set Dante Far End Output Settings
  kind: action
  command: "PUT /api/audio/outputs/dante/farEnd"
  params: []

- id: audio_voice_lift_get
  label: Voice Lift Settings Query
  kind: query
  command: "GET /api/audio/voiceLift"
  params: []

- id: audio_voice_lift_set
  label: Set Voice Lift Settings
  kind: action
  command: "PUT /api/audio/voiceLift"
  params: []

- id: audio_outputs_dante_local_get
  label: Dante Local Output Settings Query
  kind: query
  command: "GET /api/audio/outputs/dante/local"
  params: []

- id: audio_outputs_dante_local_set
  label: Set Dante Local Output Settings
  kind: action
  command: "PUT /api/audio/outputs/dante/local"
  params: []

- id: audio_inputs_dante_reference_get
  label: Dante Reference Input Settings Query
  kind: query
  command: "GET /api/audio/inputs/dante/reference"
  params: []

- id: audio_inputs_dante_reference_set
  label: Set Dante Reference Input Settings
  kind: action
  command: "PUT /api/audio/inputs/dante/reference"
  params: []

- id: audio_equalizer_get
  label: Equalizer Settings Query
  kind: query
  command: "GET /api/audio/equalizer"
  params: []

- id: audio_equalizer_set
  label: Set Equalizer Settings
  kind: action
  command: "PUT /api/audio/equalizer"
  params: []

- id: audio_noise_gate_get
  label: Noise Gate Settings Query
  kind: query
  command: "GET /api/audio/noiseGate"
  params: []

- id: audio_noise_gate_set
  label: Set Noise Gate Settings
  kind: action
  command: "PUT /api/audio/noiseGate"
  params: []

- id: audio_mic_exclusion_zones_query
  label: Supported Exclusion Zone IDs Query
  kind: query
  command: "GET /api/audio/inputs/microphone/exclusionZones"
  params: []

- id: audio_mic_exclusion_zone_get
  label: Exclusion Zone Settings Query
  kind: query
  command: "GET /api/audio/inputs/microphone/exclusionZones/{id}"
  params:
    - name: id
      type: integer
      description: Exclusion zone identifier

- id: audio_mic_exclusion_zone_set
  label: Set Exclusion Zone Settings
  kind: action
  command: "PUT /api/audio/inputs/microphone/exclusionZones/{id}"
  params:
    - name: id
      type: integer
      description: Exclusion zone identifier

- id: audio_mic_priority_zones_query
  label: Supported Priority Zone IDs Query
  kind: query
  command: "GET /api/audio/inputs/microphone/priorityZones"
  params: []

- id: audio_mic_priority_zone_get
  label: Priority Zone Settings Query
  kind: query
  command: "GET /api/audio/inputs/microphone/priorityZones/{id}"
  params:
    - name: id
      type: integer
      description: Priority zone identifier

- id: audio_mic_priority_zone_set
  label: Set Priority Zone Settings
  kind: action
  command: "PUT /api/audio/inputs/microphone/priorityZones/{id}"
  params:
    - name: id
      type: integer
      description: Priority zone identifier

- id: audio_mic_denoiser_get
  label: Microphone Denoiser Setting Query
  kind: query
  command: "GET /api/audio/inputs/microphone/denoiser"
  params: []

- id: audio_mic_denoiser_set
  label: Set Microphone Denoiser Setting
  kind: action
  command: "PUT /api/audio/inputs/microphone/denoiser"
  params: []

- id: audio_mic_input_lowcuts_get
  label: Microphone Low-Cut Filters Status Query
  kind: query
  command: "GET /api/audio/inputs/microphone/inputLowcuts"
  params: []

- id: audio_mic_input_lowcuts_set
  label: Set Microphone Low-Cut Filters Status
  kind: action
  command: "PUT /api/audio/inputs/microphone/inputLowcuts"
  params: []

- id: audio_mic_single_capsule_mode_get
  label: Single Capsule Mode Status Query
  kind: query
  command: "GET /api/audio/inputs/microphone/singleCapsuleMode"
  params: []

- id: audio_mic_single_capsule_mode_set
  label: Set Single Capsule Mode Status
  kind: action
  command: "PUT /api/audio/inputs/microphone/singleCapsuleMode"
  params: []

- id: audio_mic_beam_freeze_auto_hold_get
  label: Beam-Freeze Auto-Hold Properties Query
  kind: query
  command: "GET /api/audio/inputs/microphone/beam/beamfreeze/autoHold"
  params: []

- id: audio_mic_beam_freeze_auto_hold_set
  label: Set Beam-Freeze Auto-Hold Properties
  kind: action
  command: "PUT /api/audio/inputs/microphone/beam/beamfreeze/autoHold"
  params: []

# --- LicenseAgreements ---
- id: device_license_agreements_query
  label: OpenSource Licenses PDF Query
  kind: query
  command: "GET /api/device/licenseAgreements/licenses"
  params: []

- id: device_license_agreements_hash_query
  label: License Agreements SHA2-256 Hash Query
  kind: query
  command: "GET /api/device/licenseAgreements/hash"
  params: []
```

## Feedbacks
```yaml
# Query responses enumerated by their GET endpoints above. Subscription stream
# delivers unsolicited updates (see Events). Concrete response body shapes are
# not present in the refined source excerpt - see OpenAPI JSON artifact for schemas:
# https://assets.sennheiser.com/download/assets/api_1.9.0.json/18b31510118311f186a21e752e7f194a
# UNRESOLVED: response body schemas / value enums not included in this source excerpt
```

## Variables
```yaml
# Settable audio parameters (exposed as PUT actions above): analog/Dante output
# gains, EQ bands, noise gate, denoiser, voice lift, beam, exclusion/priority
# zones, LED ring brightness/colors, low-cut filters, single-capsule mode.
# Concrete param schemas not in this excerpt - refer to OpenAPI JSON artifact.
# UNRESOLVED: variable types, ranges, and enums not stated in this source excerpt
```

## Events
```yaml
# The device pushes real-time state changes over the SSC subscription mechanism
# (GET /api/ssc/state/subscriptions → sessionUUID stream). Source references a
# separate "Subscription for real-time updates" page but does not document the
# event payload format in this excerpt.
# UNRESOLVED: event payload schema and notification transport not stated in this source excerpt
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in this source excerpt
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source excerpt contains no safety warnings, interlock procedures,
# or power-on sequencing requirements. Only a PoE/daisy-chain *state read* is
# documented; no power-control action.
```

## Notes
- Control interface is HTTPS REST ("SSCv2" / "TCC M OpenAPI 1.9"). Base URL is per-device: `https://{deviceIP}:443`. No RS-232, TCP-telnet, UDP, or OSC control documented in this source.
- API tag groups in source: `SSC`, `Device`, `Firmware Update`, `Audio`, `FastResource`, `LicenseAgreements`. The `FastResource` tag re-lists four `Audio`/`Device` endpoints already enumerated above (`beam/direction`, `microphone/level`, `reference/level`, `roomInUse/activityLevel`) — not duplicated.
- The OpenAPI/Swagger UI exposes an "Authorize" button but no security scheme is described in this excerpt, so the authentication model is UNRESOLVED; verify against the full `api_1.9.0.json` artifact before treating the API as unauthenticated on a real device.
- Full request/response JSON schemas are in the referenced OpenAPI artifact (`api_1.9.0.json`), not in this endpoint-index excerpt.
<!-- UNRESOLVED: (1) auth/security scheme; (2) request/response body schemas and parameter enums/ranges; (3) firmware version compatibility; (4) subscription event payload format; (5) any timing/retry/backoff requirements -->

## Provenance

```yaml
source_domains:
  - sennheiser-sites.com
  - assets.sennheiser.com
source_urls:
  - https://www.sennheiser-sites.com/responsive-manuals/en/api-docs/api-docs/open-api-tc-ceiling-medium.html
  - "https://assets.sennheiser.com/download/assets/EW-DX_Sound_Control_Protocol_03_2023_EN.pdf/69f9d4bee7b611f0ae307aeaa9c3764a?attachment=true"
  - https://www.sennheiser-sites.com/responsive-manuals/en/api-docs/index.html
  - https://www.sennheiser-sites.com/responsive-manuals/en/api-docs/api-docs/sound-control-protocol.html
  - https://www.sennheiser-sites.com/responsive-manuals/en/api-docs/api-docs/sscv2-specification-2.3.html
retrieved_at: 2026-06-15T02:43:51.190Z
last_checked_at: 2026-10-01T07:21:43.117Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T07:21:43.117Z
matched_actions: 57
action_count: 57
confidence: medium
summary: "All 57 spec endpoints match the 57 distinct source endpoints verbatim; HTTPS/443 transport present; FastResource tag duplicates excluded per spec Notes. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no request/response body schemas in this excerpt (only endpoint index). auth model referenced as \"Authorize\" in Swagger UI but no procedure documented."
- "response body schemas / value enums not included in this source excerpt"
- "variable types, ranges, and enums not stated in this source excerpt"
- "event payload schema and notification transport not stated in this source excerpt"
- "no multi-step sequences described in this source excerpt"
- "source excerpt contains no safety warnings, interlock procedures,"
- "(1) auth/security scheme; (2) request/response body schemas and parameter enums/ranges; (3) firmware version compatibility; (4) subscription event payload format; (5) any timing/retry/backoff requirements"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
