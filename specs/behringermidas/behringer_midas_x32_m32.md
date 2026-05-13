---
spec_id: admin/behringer-midas-x32-m32
schema_version: ai4av-public-spec-v1
revision: 1
title: "Behringer/Midas X32/M32 Control Spec"
manufacturer: Behringer/Midas
model_family: X32
aliases: []
compatible_with:
  manufacturers:
    - Behringer/Midas
  models:
    - X32
    - M32
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - web.archive.org
retrieved_at: 2026-04-30T04:40:39.256Z
last_checked_at: 2026-04-23T15:19:42.315Z
generated_at: 2026-04-23T15:19:42.315Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T15:19:42.315Z
  matched_actions: 30
  action_count: 30
  confidence: high
  summary: "All 30 spec actions matched literally to OSC paths and response types in source; transport confirmed; bidirectional coverage achieved."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Behringer/Midas X32/M32 Control Spec

## Summary
Behringer X32 and Midas M32 are professional digital mixing consoles controllable via OSC (Open Sound Control) over UDP. All OSC communication uses port 10023. The protocol supports two modes: Immediate (request/response) and Deferred (continuous updates via /xremote registration).

<!-- UNRESOLVED: physical connection specifications (Ethernet speed, Wi-Fi support) not stated -->

## Transport
```yaml
protocols:
  - udp
addressing:
  port: 10023  # stated: "UDP port 10023 for all OSC communication"
auth:
  type: none  # inferred: no authentication procedure in source
```

## Traits
```yaml
- powerable   # inferred: power state commands available via /config
- queryable   # inferred: /info, /status, /showdump query commands present
- routable    # inferred: routing commands via /ch, /bus, /mtx, /main, /outputs
- levelable   # inferred: level parameter types and /meters endpoint present
```

## Actions
```yaml
# Server ↔ Client OSC paths (get/set parameters)
- id: config
  label: Configuration
  kind: action
  params:
    - name: parameter
      type: string
      description: OSC path under /config
    - name: value
      type: mixed
      description: Parameter value (float, int, string, or blob)

- id: channel
  label: Channel Control
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number (1-based)
    - name: parameter
      type: string
      description: Parameter path under /ch

- id: auxin
  label: Aux Input
  kind: action
  params:
    - name: input
      type: integer
      description: Aux input number

- id: fx_return
  label: FX Return
  kind: action
  params:
    - name: return_num
      type: integer
      description: FX return number (1-8)
    - name: parameter
      type: string

- id: bus
  label: Bus Control
  kind: action
  params:
    - name: bus
      type: integer
      description: Bus number
    - name: parameter
      type: string

- id: matrix
  label: Matrix
  kind: action
  params:
    - name: matrix
      type: integer
    - name: parameter
      type: string

- id: main_stereo
  label: Main Stereo
  kind: action
  params:
    - name: parameter
      type: string

- id: main_mono
  label: Main Mono
  kind: action
  params:
    - name: parameter
      type: string

- id: dca
  label: DCA Groups
  kind: action
  params:
    - name: dca
      type: integer
    - name: parameter
      type: string

- id: effects
  label: Effects
  kind: action
  params:
    - name: fx_num
      type: integer
      description: Effects unit number (1-8)
    - name: parameter
      type: string

- id: outputs
  label: Output Control
  kind: action
  params:
    - name: output_set
      type: integer
    - name: parameter
      type: string

- id: headamp
  label: Headamp
  kind: action
  params:
    - name: headamp_id
      type: integer
    - name: parameter
      type: string

- id: show_control
  label: Show Control
  kind: action
  params:
    - name: action
      type: string
      description: Action path under /-show

- id: preferences
  label: Preferences
  kind: action
  params:
    - name: parameter
      type: string

- id: usb
  label: USB
  kind: action
  params:
    - name: parameter
      type: string

- id: action_trigger
  label: Action Trigger
  kind: action
  params:
    - name: action_id
      type: string

- id: status
  label: Status Query
  kind: action
  params:
    - name: parameter
      type: string

- id: node
  label: Node
  kind: action
  params:
    - name: parameter
      type: string

- id: renew
  label: Renew
  kind: action
  params: []

- id: xremote
  label: Deferred Update Subscription
  kind: action
  params: []
  description: Subscribe to continuous updates. Server sends changes until timeout.

- id: info
  label: Info Query
  kind: action
  params: []
  description: Returns server info (48 bytes)

- id: meters
  label: Meter Request
  kind: action
  params:
    - name: meter_id
      type: integer
      description: Meter subscription ID
    - name: duration
      type: integer
      description: Duration in seconds (sent as big-endian 32-bit)
  description: Returns meter blob every 50ms for specified duration (max 10s timeout)
```

## Feedbacks
```yaml
# Deferred/async updates (server-initiated)
- id: action_update
  type: blob
  description: Action data updates from server

- id: undo_update
  type: blob
  description: Undo/scene data updates

- id: show_update
  type: blob
  description: Scene data updates

- id: stat_update
  type: blob
  description: Status data updates

# Query responses (immediate mode)
- id: info_response
  type: blob
  description: Server info response (48 bytes): version, type, osc-server, model, firmware

- id: status_response
  type: blob
  description: Server status response (52 bytes): active flag, IP address

- id: parameter_response
  type: mixed
  description: Float, int, or string parameter values

- id: meter_blob
  type: blob
  description: Meter data blob format: <meter_id>,b~~<length><count><nativefloats>
```

## Variables
```yaml
# Parameter types from OSC specification
- id: param_string
  type: string
  description: Character string up to max characters, null-terminated

- id: param_enum
  type: enum
  description: Integer corresponding to element in a list

- id: param_int
  type: integer
  description: Signed 32-bit integer in [min, max] range

- id: param_linf
  type: float
  description: Linear float in [min, max] with step size

- id: param_logf
  type: float
  description: Logarithmic float in [min, max] with steps

- id: param_level
  type: float
  description: "Float 0.0-1.0 mapped to 4 dB ranges: 0.0-0.0625 (-∞ to -60dB), 0.0625-0.25 (-60 to -30dB), 0.25-0.5 (-30 to -10dB), 0.5-1.0 (-10 to +10dB)"
```

## Events
```yaml
# Server-initiated communications (require /xremote registration)
- id: server_action
  path: /action
  description: Action data changes from server UI or connected clients

- id: server_undo_show
  path: /-undo, /-show
  description: Scene/undo data changes

- id: server_status
  path: /-stat
  description: Status data changes
```

## Macros
```yaml
# Show dump (full state snapshot)
- id: showdump
  label: Show Dump
  description: Request full configuration state. May return multiple replies.
  steps:
    - action: /showdump
    - response: Multiple blob responses containing full show state

# Meter streaming
- id: meter_subscription
  label: Meter Subscription
  description: Request continuous meter updates for 10 seconds
  steps:
    - action: /meters with duration parameter
    - response: Blob response every 50ms containing meter values
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

**OSC Encoding Requirements:**
- All parameters: big-endian, 4-byte aligned (padding with null bytes)
- Float range: 0.0 – 1.0 mapped to 0x00000000 – 0x3f800000
- Integer/float: signed 32-bit
- Boolean: OSC integer type
- Strings: null-terminated
- Blobs: follow section-specific rules

**Meter Blob Format:**
`<meter_id>,b~~<int1><int2><nativefloat>...`
- `int1`: blob length in bytes (32-bit big-endian)
- `int2`: number of native floats (32-bit little-endian)
- `nativefloat`: 32-bit little-endian floats (0.0-1.0 representing audio level, can exceed 1.0 up to 8.0 / +18 dBFS)

**Supported Effects (via /fx/[1..8]/par/[01..64]):**
Reverbs (Hall, Plate, Ambience, Rich Plate, Room, Chamber, Vintage Room, Gated, Reverse), Delays (Stereo, 3 Tap, 4 Tap), Modulation (Stereo Chorus/Flanger/Phaser, Dimensional Chorus, Mood Filter, Rotary Speaker, Tremola/Panner, Sub Octaver), Dynamics (True/Stereo Graphic EQ, Stereo/Dual De-Esser, Stereo/Dual Program EQ, Stereo/Dual Midrange EQ, Wave Designer, Precision Limiter), Combiners (Stereo/Dual Combinator, Compressors, Enhancers, Exciter, Edison EX1, Sound Maxer, Guitar Amp, Tube Stage, Pitch Shifter)

**User Definable Controls:**
- /config/userctrl for 4 rotary encoders (1-4) and 8 buttons (5-12)

<!-- UNRESOLVED: physical dimensions, power requirements, port pinouts not in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: specific command syntax for power on/off not detailed -->

## Provenance

```yaml
source_domains:
  - web.archive.org
retrieved_at: 2026-04-30T04:40:39.256Z
last_checked_at: 2026-04-23T15:19:42.315Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:19:42.315Z
matched_actions: 30
action_count: 30
confidence: high
summary: "All 30 spec actions matched literally to OSC paths and response types in source; transport confirmed; bidirectional coverage achieved."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
