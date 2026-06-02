---
spec_id: admin/atlasied-atmosphere-v1-0
schema_version: ai4av-public-spec-v1
revision: 1
title: "AtlasIED Atmosphere AZM4/AZM8 Control Spec"
manufacturer: AtlasIED
model_family: "Atmosphere AZM4"
aliases: []
compatible_with:
  manufacturers:
    - AtlasIED
  models:
    - "Atmosphere AZM4"
    - "Atmosphere AZM8"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlasied.com
source_urls:
  - https://www.atlasied.com/ATS006993-B-AZM4-AZM8-3rd-Party-Control.pdf
retrieved_at: 2026-04-29T17:13:54.183Z
last_checked_at: 2026-06-02T21:39:55.597Z
generated_at: 2026-06-02T21:39:55.597Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no power on/off commands found — device may lack remote power control"
  - "no error response format documented beyond method name \"error\""
  - "error response payload format not documented beyond method name"
  - "no multi-step macro sequences documented in source"
  - "no safety warnings or interlock procedures in source"
  - "maximum number of simultaneous TCP connections not stated"
  - "error response format beyond method name \"error\" not documented"
  - "UDP metering subscription response format details beyond example"
  - "no power on/off commands documented"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:39:55.597Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "Complete JSON-RPC 2.0 protocol with parameter control, metering, and subscription support (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# AtlasIED Atmosphere AZM4/AZM8 Control Spec

## Summary
AtlasIED Atmosphere AZM4 (4-zone) and AZM8 (8-zone) audio DSP/mixer controllers. Control via JSON-RPC 2.0 over TCP (port 5321) for parameter set/get/subscribe; UDP (port 3131) for metering subscription updates. Parameter names are dynamically assigned during AZM4/AZM8 configuration and may change when zones, sources, mixes, or groups are added/removed.

<!-- UNRESOLVED: no power on/off commands found — device may lack remote power control -->
<!-- UNRESOLVED: no error response format documented beyond method name "error" -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 5321
  udp_port: 3131
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - queryable    # inferred: "get" method returns current parameter values
  - levelable    # inferred: Gain parameters with -80..0 dB range, pct support
  - routable     # inferred: ZoneSource and GroupSource route sources to zones/groups
```

## Actions
```yaml
actions:
  - id: set_source_gain
    label: Set Source Gain
    kind: action
    description: Set gain for a source channel
    params:
      - name: param
        type: string
        description: "Source parameter name e.g. SourceGain_0"
      - name: val
        type: integer
        description: "Gain in dB (-80 to 0)"
      - name: pct
        type: integer
        description: "Gain as percentage (0 to 100)"
    command: '{"jsonrpc":"2.0","method":"set","params":{"param":"{param}","val":{val}}}\n'

  - id: set_source_mute
    label: Set Source Mute
    kind: action
    description: Mute or unmute a source channel
    params:
      - name: param
        type: string
        description: "Source mute parameter name e.g. SourceMute_2"
      - name: val
        type: integer
        description: "0=unmute, 1=mute"
    command: '{"jsonrpc":"2.0","method":"set","params":{"param":"{param}","val":{val}}}\n'

  - id: set_mix_gain
    label: Set Mix Gain
    kind: action
    description: Set gain for a mix bus
    params:
      - name: param
        type: string
        description: "Mix parameter name e.g. MixGain_0"
      - name: val
        type: integer
        description: "Gain in dB (-80 to 0)"
    command: '{"jsonrpc":"2.0","method":"set","params":{"param":"{param}","val":{val}}}\n'

  - id: set_mix_mute
    label: Set Mix Mute
    kind: action
    description: Mute or unmute a mix bus
    params:
      - name: param
        type: string
        description: "Mix mute parameter name e.g. MixMute_0"
      - name: val
        type: integer
        description: "0=unmute, 1=mute"
    command: '{"jsonrpc":"2.0","method":"set","params":{"param":"{param}","val":{val}}}\n'

  - id: set_zone_gain
    label: Set Zone Gain
    kind: action
    description: Set gain for a zone
    params:
      - name: param
        type: string
        description: "Zone parameter name e.g. ZoneGain_0"
      - name: val
        type: integer
        description: "Gain in dB (-80 to 0)"
      - name: pct
        type: integer
        description: "Gain as percentage (0 to 100)"
    command: '{"jsonrpc":"2.0","method":"set","params":{"param":"{param}","val":{val}}}\n'

  - id: set_zone_mute
    label: Set Zone Mute
    kind: action
    description: Mute or unmute a zone
    params:
      - name: param
        type: string
        description: "Zone mute parameter name e.g. ZoneMute_0"
      - name: val
        type: integer
        description: "0=unmute, 1=mute"
    command: '{"jsonrpc":"2.0","method":"set","params":{"param":"{param}","val":{val}}}\n'

  - id: set_zone_source
    label: Set Zone Source
    kind: action
    description: Route a source to a zone
    params:
      - name: param
        type: string
        description: "Zone source parameter name e.g. ZoneSource_0"
      - name: val
        type: integer
        description: "Source index (-1 = no source, 0-based index from SourceName)"
    command: '{"jsonrpc":"2.0","method":"set","params":{"param":"{param}","val":{val}}}\n'

  - id: set_group_gain
    label: Set Group Gain
    kind: action
    description: Set gain for a group
    params:
      - name: param
        type: string
        description: "Group parameter name e.g. GroupGain_0"
      - name: val
        type: integer
        description: "Gain in dB (-80 to 0)"
    command: '{"jsonrpc":"2.0","method":"set","params":{"param":"{param}","val":{val}}}\n'

  - id: set_group_mute
    label: Set Group Mute
    kind: action
    description: Mute or unmute a group
    params:
      - name: param
        type: string
        description: "Group mute parameter name e.g. GroupMute_0"
      - name: val
        type: integer
        description: "0=unmute, 1=mute"
    command: '{"jsonrpc":"2.0","method":"set","params":{"param":"{param}","val":{val}}}\n'

  - id: set_group_source
    label: Set Group Source
    kind: action
    description: Route a source to a group
    params:
      - name: param
        type: string
        description: "Group source parameter name e.g. GroupSource_0"
      - name: val
        type: integer
        description: "Source index (-1 = no source, 0-based index from SourceName)"
    command: '{"jsonrpc":"2.0","method":"set","params":{"param":"{param}","val":{val}}}\n'

  - id: set_group_active
    label: Set Group Active
    kind: action
    description: Activate (combine) or deactivate (uncombine) zones in a group
    params:
      - name: param
        type: string
        description: "Group active parameter name e.g. GroupActive_0"
      - name: val
        type: integer
        description: "0=deactivate, 1=activate"
    command: '{"jsonrpc":"2.0","method":"set","params":{"param":"{param}","val":{val}}}\n'

  - id: bump_gain
    label: Bump Gain
    kind: action
    description: Relative gain adjustment on any gain-type parameter
    params:
      - name: param
        type: string
        description: "Parameter name e.g. SourceGain_0"
      - name: val
        type: integer
        description: "Relative change in dB"
    command: '{"jsonrpc":"2.0","method":"bmp","params":[{"param":"{param}","val":{val}}]}\n'

  - id: play_message
    label: Play Message
    kind: action
    description: Trigger a pre-configured message/paging announcement
    params:
      - name: param
        type: string
        description: "PlayMessage parameter name e.g. PlayMessage_0"
      - name: val
        type: integer
        description: "1 to trigger playback"
    command: '{"jsonrpc":"2.0","method":"set","params":{"param":"{param}","val":{val}}}\n'

  - id: recall_routine
    label: Recall Routine
    kind: action
    description: Recall a pre-configured routine
    params:
      - name: param
        type: string
        description: "RecallRoutine parameter name e.g. RecallRoutine_0"
      - name: val
        type: integer
        description: "1 to trigger recall"
    command: '{"jsonrpc":"2.0","method":"set","params":{"param":"{param}","val":{val}}}\n'

  - id: recall_scene
    label: Recall Scene
    kind: action
    description: Recall a pre-configured scene
    params:
      - name: param
        type: string
        description: "RecallScene parameter name e.g. RecallScene_0"
      - name: val
        type: integer
        description: "1 to trigger recall"
    command: '{"jsonrpc":"2.0","method":"set","params":{"param":"{param}","val":{val}}}\n'

  - id: recall_gpo_preset
    label: Recall GPO Preset
    kind: action
    description: Recall a GPO preset
    params:
      - name: param
        type: string
        description: "RecallGpoPreset parameter name e.g. RecallGpoPreset_0"
      - name: val
        type: integer
        description: "1 to trigger recall"
    command: '{"jsonrpc":"2.0","method":"set","params":{"param":"{param}","val":{val}}}\n'

  - id: set_bell_schedule
    label: Set Today's Bell Schedule
    kind: action
    description: Select which bell schedule is active today
    params:
      - name: param
        type: string
        description: "TodaysBellSchedule parameter name e.g. TodaysBellSchedule_0"
      - name: val
        type: integer
        description: "Bell schedule index (0-based from BellScheduleName)"
    command: '{"jsonrpc":"2.0","method":"set","params":{"param":"{param}","val":{val}}}\n'

  - id: subscribe
    label: Subscribe to Parameter
    kind: action
    description: Subscribe to receive updates for one or more parameters
    params:
      - name: params
        type: array
        description: "Array of {param, fmt} objects"
    command: '{"jsonrpc":"2.0","method":"sub","params":{params}}\n'

  - id: unsubscribe
    label: Unsubscribe from Parameter
    kind: action
    description: Unsubscribe from updates for one or more parameters
    params:
      - name: params
        type: array
        description: "Array of {param, fmt} objects"
    command: '{"jsonrpc":"2.0","method":"unsub","params":{params}}\n'

  - id: get_parameter
    label: Get Parameter Value
    kind: action
    description: Get current value of a parameter at a point in time
    params:
      - name: param
        type: string
        description: "Parameter name e.g. ZoneGain_0"
      - name: fmt
        type: string
        description: "Response format: val, pct, or str"
    command: '{"jsonrpc":"2.0","method":"get","params":{"param":"{param}","fmt":"{fmt}"}}\n'

  - id: keep_alive
    label: Keep Alive
    kind: action
    description: Send keep-alive to prevent connection timeout. Send at least every 5 minutes.
    params: []
    command: '{"jsonrpc":"2.0","method":"get","params":{"param":"KeepAlive","fmt":"str"}}\n'
```

## Feedbacks
```yaml
feedbacks:
  - id: source_meter
    type: number
    description: Source audio level in dB (-80 to 0)
    transport: udp

  - id: mix_meter
    type: number
    description: Mix bus audio level in dB (-80 to 0)
    transport: udp

  - id: zone_meter
    type: number
    description: Zone audio level in dB (-80 to 0)
    transport: udp

  - id: group_meter
    type: number
    description: Group audio level in dB (-80 to 0)
    transport: udp

  - id: loud_noise
    type: enum
    values: [0, 1]
    description: Loud noise detection flag (read-only)

  - id: gpo_state
    type: enum
    values: [0, 1]
    description: GPO state (read-only)

  - id: zone_grouped
    type: enum
    values: [0, 1]
    description: Whether zone is included in a group (read-only)

  - id: firmware_version
    type: string
    description: Device firmware version (read-only)
```

## Variables
```yaml
variables:
  - id: source_gain
    description: Source gain in dB (-80 to 0) or percent (0 to 100)
    type: integer
    writable: true

  - id: source_mute
    description: Source mute state (0=unmute, 1=mute)
    type: integer
    writable: true

  - id: mix_gain
    description: Mix gain in dB (-80 to 0) or percent (0 to 100)
    type: integer
    writable: true

  - id: mix_mute
    description: Mix mute state (0=unmute, 1=mute)
    type: integer
    writable: true

  - id: zone_gain
    description: Zone gain in dB (-80 to 0) or percent (0 to 100)
    type: integer
    writable: true

  - id: zone_mute
    description: Zone mute state (0=unmute, 1=mute)
    type: integer
    writable: true

  - id: zone_source
    description: Zone routed source index (-1=none)
    type: integer
    writable: true

  - id: group_gain
    description: Group gain in dB (-80 to 0) or percent (0 to 100)
    type: integer
    writable: true

  - id: group_mute
    description: Group mute state (0=unmute, 1=mute)
    type: integer
    writable: true

  - id: group_source
    description: Group routed source index (-1=none)
    type: integer
    writable: true

  - id: group_active
    description: Group combine state (0=inactive, 1=active)
    type: integer
    writable: true
```

## Events
```yaml
events:
  - id: subscription_update_tcp
    description: Parameter value update pushed via TCP for subscribed non-meter parameters
    method: update
    format: '{"jsonrpc":"2.0","method":"update","params":[{"param":"{name}","val":{value}}]}'

  - id: subscription_update_udp
    description: Meter value update pushed via UDP for subscribed meter parameters
    method: update
    format: '{"jsonrpc":"2.0","method":"update","params":[{"param":"{name}","val":{value}}]}'

  - id: error_response
    description: Error response from device
    method: error
    format: '{"jsonrpc":"2.0","method":"error",...}'
    # UNRESOLVED: error response payload format not documented beyond method name
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Parameter names are **dynamic** — assigned during AZM4/AZM8 configuration. Removing/adding zones, sources, mixes, groups, or messages may reassign parameter names. Programming should be done after configuration is finalized.
- Multiple parameters can be addressed in a single message by using an array for `params`.
- Messages that normally generate no response (e.g. `unsub`, or `set`/`bmp` on non-subscribed params) can be forced to respond by appending an `"id"` field.
- TCP connection termination (by client or device) drops all subscriptions for that client. Resubscribe in the next session.
- Keep-alive required at least every 5 minutes on idle TCP/UDP connections to avoid termination.
- Read-only parameters (*Name, ZoneGrouped, LoudNoise, GpoState, FirmwareVersion) accept only `sub`, `unsub`, and `get` — not `set` or `bmp`.
- Action parameters (PlayMessage, RecallScene, RecallRoutine, RecallGpoPreset) trigger actions on `set`/`bmp` but their value does not represent action state. Subscribing yields one update when the action fires.
- AZM4 = 4-zone model, AZM8 = 8-zone model. Protocol is identical between models.

<!-- UNRESOLVED: maximum number of simultaneous TCP connections not stated -->
<!-- UNRESOLVED: error response format beyond method name "error" not documented -->
<!-- UNRESOLVED: UDP metering subscription response format details beyond example -->
<!-- UNRESOLVED: no power on/off commands documented -->

## Provenance

```yaml
source_domains:
  - atlasied.com
source_urls:
  - https://www.atlasied.com/ATS006993-B-AZM4-AZM8-3rd-Party-Control.pdf
retrieved_at: 2026-04-29T17:13:54.183Z
last_checked_at: 2026-06-02T21:39:55.597Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:39:55.597Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "Complete JSON-RPC 2.0 protocol with parameter control, metering, and subscription support (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no power on/off commands found — device may lack remote power control"
- "no error response format documented beyond method name \"error\""
- "error response payload format not documented beyond method name"
- "no multi-step macro sequences documented in source"
- "no safety warnings or interlock procedures in source"
- "maximum number of simultaneous TCP connections not stated"
- "error response format beyond method name \"error\" not documented"
- "UDP metering subscription response format details beyond example"
- "no power on/off commands documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
