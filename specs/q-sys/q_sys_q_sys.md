---
schema_version: ai4av-public-spec-v1
device_id: q-sys/q-sys-core-family
entity_id: q_sys_q_sys
spec_id: admin/q_sys-q_sys_companion
revision: 1
author: admin
title: "Q-SYS QRC Control Protocol Spec"
status: published
manufacturer: Q-SYS
manufacturer_key: q-sys
model_family: "Q-SYS Core (family)"
aliases: []
compatible_with:
  manufacturers:
    - Q-SYS
  models:
    - "Q-SYS Core (family)"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: q_sys_q_sys_companion.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T09:45:16.344Z
retrieved_at: 2026-04-27T09:45:16.344Z
last_checked_at: 2026-04-27T09:45:16.344Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T09:45:16.344Z
  matched_actions: 37
  action_count: 37
  confidence: high
  summary: "All 37 spec actions map to documented QRC methods with matching wire tokens; transport parameters verified verbatim in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Q-SYS QRC Control Protocol Spec

## Summary
QRC is a Unicode-based TCP/IP control protocol for Q-SYS audio/video cores. Client connects to port 1710 and sends JSON-RPC 2.0 null-terminated commands. Requires user credentials created in Q-SYS Designer software. Supports named control get/set, component control, change group polling, mixer control, loop player, and snapshot save/load.

<!-- UNRESOLVED: specific Core model numbers not enumerated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 1710
auth:
  type: logon  # Logon method requires User/Password; credentials created in Q-SYS Designer Users admin
```

## Traits
```yaml
# inferred from source:
# - queryable: Control.Get, Component.Get, StatusGet return values
# - levelable: gain, delay, mute controls present
# - routable: mixer crosspoint control present
# - snapshotable: Snapshot.Load/Save present
traits:
  - queryable
  - levelable
  - routable
  - snapshotable
```

## Actions
```yaml
# Connection / session management
- id: logon
  label: Logon
  kind: action
  params:
    - name: User
      type: string
      description: Username
    - name: Password
      type: string
      description: Password

- id: noop
  label: NoOp
  kind: action
  params: []

# Status
- id: status_get
  label: StatusGet
  kind: query
  params: []
  response:
    Platform: Core model string
    State: Idle | Active | Standby
    DesignName: string
    DesignCode: GUID string
    IsRedundant: boolean
    IsEmulator: boolean

# Control - named controls
- id: control_get
  label: Control.Get
  kind: query
  params:
    - name: controls
      type: array
      description: Array of Named Control strings
  response:
    - Name: string
      Value: number | string | boolean
      String: string

- id: control_set
  label: Control.Set
  kind: action
  params:
    - name: Name
      type: string
      description: Named Control name
    - name: Value
      type: any
      description: New value
    - name: Ramp
      type: number
      description: Optional ramp time in seconds

# Component control
- id: component_get
  label: Component.Get
  kind: query
  params:
    - name: Name
      type: string
      description: Named Component name
    - name: Controls
      type: array
      description: Array of control names

- id: component_get_controls
  label: Component.GetControls
  kind: query
  params:
    - name: Name
      type: string
      description: Named Component name
  response:
    - Name: string
      Type: Boolean | Float | String
      Value: any
      ValueMin: number
      ValueMax: number
      String: string
      Position: number
      Direction: Read/Write | Read only | Write only

- id: component_set
  label: Component.Set
  kind: action
  params:
    - name: Name
      type: string
      description: Named Component name
    - name: Controls
      type: array
      description: Array of control value objects
    - name: ResponseValues
      type: boolean
      description: Optional - return new values

- id: component_get_components
  label: Component.GetComponents
  kind: query
  params: []
  response:
    - ID: string
      Name: string
      Type: string
      Properties: array
      Controls: null
      ControlSource: number

# Change groups - max 4 per session
- id: change_group_add_control
  label: ChangeGroup.AddControl
  kind: action
  params:
    - name: Id
      type: string
      description: Change group ID
    - name: Controls
      type: array
      description: Array of Named Control names

- id: change_group_add_component_control
  label: ChangeGroup.AddComponentControl
  kind: action
  params:
    - name: Id
      type: string
      description: Change group ID
    - name: Component
      type: object
      description: "{ Name: string, Controls: array }"

- id: change_group_remove
  label: ChangeGroup.Remove
  kind: action
  params:
    - name: Id
      type: string
      description: Change group ID
    - name: Controls
      type: array
      description: Array of control names

- id: change_group_poll
  label: ChangeGroup.Poll
  kind: query
  params:
    - name: Id
      type: string
      description: Change group ID

- id: change_group_destroy
  label: ChangeGroup.Destroy
  kind: action
  params:
    - name: Id
      type: string
      description: Change group ID

- id: change_group_invalidate
  label: ChangeGroup.Invalidate
  kind: action
  params:
    - name: Id
      type: string
      description: Change group ID

- id: change_group_clear
  label: ChangeGroup.Clear
  kind: action
  params:
    - name: Id
      type: string
      description: Change group ID

- id: change_group_auto_poll
  label: ChangeGroup.AutoPoll
  kind: action
  params:
    - name: Id
      type: string
      description: Change group ID
    - name: Rate
      type: number
      description: Polling interval in seconds

# Mixer - string syntax: * | num | num-num | !negation
- id: mixer_set_cross_point_gain
  label: Mixer.SetCrossPointGain
  kind: action
  params:
    - name: Name
      type: string
      description: Mixer name
    - name: Inputs
      type: string
      description: Input channel spec
    - name: Outputs
      type: string
      description: Output channel spec
    - name: Value
      type: number
      description: Gain in dB
    - name: Ramp
      type: number
      description: Optional ramp time in seconds

- id: mixer_set_cross_point_delay
  label: Mixer.SetCrossPointDelay
  kind: action
  params:
    - name: Name
      type: string
      description: Mixer name
    - name: Inputs
      type: string
      description: Input channel spec
    - name: Outputs
      type: string
      description: Output channel spec
    - name: Value
      type: number
      description: Delay in ms
    - name: Ramp
      type: number
      description: Optional ramp time in seconds

- id: mixer_set_cross_point_mute
  label: Mixer.SetCrossPointMute
  kind: action
  params:
    - name: Name
      type: string
      description: Mixer name
    - name: Inputs
      type: string
      description: Input channel spec
    - name: Outputs
      type: string
      description: Output channel spec
    - name: Value
      type: boolean

- id: mixer_set_cross_point_solo
  label: Mixer.SetCrossPointSolo
  kind: action
  params:
    - name: Name
      type: string
      description: Mixer name
    - name: Inputs
      type: string
      description: Input channel spec
    - name: Outputs
      type: string
      description: Output channel spec
    - name: Value
      type: boolean

- id: mixer_set_input_gain
  label: Mixer.SetInputGain
  kind: action
  params:
    - name: Name
      type: string
      description: Mixer name
    - name: Inputs
      type: string
      description: Input channel spec
    - name: Value
      type: number
      description: Gain in dB
    - name: Ramp
      type: number
      description: Optional ramp time in seconds

- id: mixer_set_input_mute
  label: Mixer.SetInputMute
  kind: action
  params:
    - name: Name
      type: string
      description: Mixer name
    - name: Inputs
      type: string
      description: Input channel spec
    - name: Value
      type: boolean

- id: mixer_set_input_solo
  label: Mixer.SetInputSolo
  kind: action
  params:
    - name: Name
      type: string
      description: Mixer name
    - name: Inputs
      type: string
      description: Input channel spec
    - name: Value
      type: boolean

- id: mixer_set_output_gain
  label: Mixer.SetOutputGain
  kind: action
  params:
    - name: Name
      type: string
      description: Mixer name
    - name: Outputs
      type: string
      description: Output channel spec
    - name: Value
      type: number
      description: Gain in dB
    - name: Ramp
      type: number
      description: Optional ramp time in seconds

- id: mixer_set_output_mute
  label: Mixer.SetOutputMute
  kind: action
  params:
    - name: Name
      type: string
      description: Mixer name
    - name: Outputs
      type: string
      description: Output channel spec
    - name: Value
      type: boolean

- id: mixer_set_cue_mute
  label: Mixer.SetCueMute
  kind: action
  params:
    - name: Name
      type: string
      description: Mixer name
    - name: Cues
      type: string
      description: Cue spec
    - name: Value
      type: boolean

- id: mixer_set_cue_gain
  label: Mixer.SetCueGain
  kind: action
  params:
    - name: Name
      type: string
      description: Mixer name
    - name: Cues
      type: string
      description: Cue spec
    - name: Value
      type: number
      description: Gain in dB
    - name: Ramp
      type: number
      description: Optional ramp time in seconds

- id: mixer_set_input_cue_enable
  label: Mixer.SetInputCueEnable
  kind: action
  params:
    - name: Name
      type: string
      description: Mixer name
    - name: Cues
      type: string
      description: Cue spec
    - name: Inputs
      type: string
      description: Input channel spec
    - name: Value
      type: boolean

- id: mixer_set_input_cue_afl
  label: Mixer.SetInputCueAfl
  kind: action
  params:
    - name: Name
      type: string
      description: Mixer name
    - name: Cues
      type: string
      description: Cue spec
    - name: Inputs
      type: string
      description: Input channel spec
    - name: Value
      type: boolean

# Loop Player
- id: loop_player_start
  label: LoopPlayer.Start
  kind: action
  params:
    - name: Name
      type: string
      description: Loop Player name
    - name: StartTime
      type: number
      description: Time of day in seconds
    - name: Files
      type: array
      description: Array of file specs
    - name: Loop
      type: boolean
    - name: Log
      type: boolean

- id: loop_player_stop
  label: LoopPlayer.Stop
  kind: action
  params:
    - name: Name
      type: string
      description: Loop Player name
    - name: Outputs
      type: array
      description: Array of output numbers
    - name: Log
      type: boolean

- id: loop_player_cancel
  label: LoopPlayer.Cancel
  kind: action
  params:
    - name: Name
      type: string
      description: Loop Player name
    - name: Outputs
      type: array
      description: Array of output numbers
    - name: Log
      type: boolean

# Snapshot
- id: snapshot_load
  label: Snapshot.Load
  kind: action
  params:
    - name: Name
      type: string
      description: Snapshot bank name
    - name: Bank
      type: integer
      description: Snapshot number (1-based)
    - name: Ramp
      type: number
      description: Optional ramp time in seconds

- id: snapshot_save
  label: Snapshot.Save
  kind: action
  params:
    - name: Name
      type: string
      description: Snapshot bank name
    - name: Bank
      type: integer
      description: Snapshot number (1-based)
```

## Feedbacks
```yaml
# Unsolicited events:
- id: engine_status
  type: object
  description: Sent on connect and on any inventory status change
  fields:
    State: Idle | Active | Standby
    DesignName: string
    DesignCode: GUID string
    IsRedundant: boolean
    IsEmulator: boolean

# Error codes returned in JSON-RPC error objects:
- id: error_code
  type: enum
  values:
    - -32700  # Parse error
    - -32600  # Invalid request
    - -32601  # Method not found
    - -32602  # Invalid params
    - -32603  # Server error
    - -32604  # Core on standby (redundant config)
    - 2       # Invalid Page Request ID
    - 3       # Bad Page Request
    - 4       # Missing file
    - 5       # Change Groups exhausted
    - 6       # Unknown change group
    - 7       # Unknown component name
    - 8       # Unknown control
    - 9       # Illegal mixer channel index
    - 10      # Logon required
```

## Variables
```yaml
# Any Named Control or Component Control is a variable.
# The source does not enumerate a fixed variable list - controls are
# defined in the Q-SYS design file and accessed via Control.Get/Set.
# UNRESOLVED: enumerate specific variable names - determined by design
```

## Events
```yaml
# EngineStatus - sent unsolicited on connect and on inventory change
# LoopPlayer.Error - sent when a loop player job fails (includes RefId)
# UNRESOLVED: full event list not documented in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: In redundant Core configuration, commands return code -32604 (Core on Standby) when received by the non-active Core. All control must target the active Core.
  # UNRESOLVED: power-on sequencing, fault recovery procedures not documented in source
```

## Notes
- All QRC commands must be null-terminated (zero character after escape).
- `id` in JSON-RPC requests is returned verbatim in responses — can be any number.
- Change groups: maximum 4 groups, unlimited controls per group.
- Mixer string syntax supports: `*` (all), `1 2 3` (list), `1-6` (range), `!negation` (exclude).
- Null character termination requirement is a CRITICAL implementation detail.
<!-- UNRESOLVED: voltage/current/power specs not in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: specific model numbers not enumerated beyond "Core" family reference -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: q_sys_q_sys_companion.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T09:45:16.344Z
retrieved_at: 2026-04-27T09:45:16.344Z
last_checked_at: 2026-04-27T09:45:16.344Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T09:45:16.344Z
matched_actions: 37
action_count: 37
confidence: high
summary: "All 37 spec actions map to documented QRC methods with matching wire tokens; transport parameters verified verbatim in source."
```

## Known Gaps

```yaml
[]
```
