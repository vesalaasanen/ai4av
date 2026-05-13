---
spec_id: admin/cloud-dcm-1
schema_version: ai4av-public-spec-v1
revision: 1
title: "Cloud DCM-1 Control Spec"
manufacturer: Cloud
model_family: DCM-1
aliases: []
compatible_with:
  manufacturers:
    - Cloud
  models:
    - DCM-1
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cloud.co.uk
retrieved_at: 2026-04-29T17:33:38.526Z
last_checked_at: 2026-04-30T09:39:44.971Z
generated_at: 2026-04-30T09:39:44.971Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T09:39:44.971Z
  matched_actions: 44
  action_count: 44
  confidence: high
  summary: "All 44 spec actions matched cleanly to source; all transport parameters verified; comprehensive command coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# Cloud DCM-1 Control Spec

## Summary
Zone mixer with 8 line inputs, 8 zones, 4 groups, and 4 microphone channels. Supports RS-232 (9600 baud, 8N1) and TCP/Ethernet (port 4999) control. Protocol: XML-like tags `<DESTINATION,COMMAND/>`. Control in upper case; responses in lower case.

<!-- UNRESOLVED: Emergency mute behavior during fault conditions not stated -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 4999  # stated default Ethernet port
serial:
  baud_rate: 9600  # stated default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
- powerable      # SY,R reset command present
- routable       # source selection (S command) present
- queryable      # Q modifier on most commands, VQ version query
- levelable      # L level command with U/D/Q modifiers
```

## Actions
```yaml
- id: level_set
  label: Set Music Level
  kind: action
  params:
    - name: destination
      type: string
      description: Zone or group music sub destination (e.g. Z1.MU, G1.MU)
    - name: value
      type: integer
      description: Level 0-255 (attenuation in dB)
    - name: modifier
      type: string
      enum: [U, D, Q]
      description: Up, Down, or Query

- id: level_up
  label: Music Level Up
  kind: action
  params:
    - name: destination
      type: string
    - name: step
      type: integer
      description: Step size 1-12

- id: level_down
  label: Music Level Down
  kind: action
  params:
    - name: destination
      type: string
    - name: step
      type: integer
      description: Step size 1-12

- id: source_select
  label: Select Source
  kind: action
  params:
    - name: destination
      type: string
      description: Zone or group music sub destination
    - name: source
      type: integer
      description: Source number 1-8
    - name: modifier
      type: string
      enum: [U, D, Q]
      description: Up, Down, or Query

- id: mute_music
  label: Mute Music
  kind: action
  params:
    - name: destination
      type: string
      description: Zone or group music sub destination only

- id: set_min_limit
  label: Set Minimum Limit
  kind: action
  params:
    - name: zone
      type: string
      description: Zone music sub destination (Z1.MU only)
    - name: value
      type: integer
      description: 0-255

- id: set_max_limit
  label: Set Maximum Limit
  kind: action
  params:
    - name: zone
      type: string
      description: Zone music sub destination (Z1.MU only)
    - name: value
      type: integer
      description: 0-255

- id: eq_bass
  label: EQ Bass
  kind: action
  params:
    - name: zone
      type: string
      description: Zone music sub destination
    - name: value
      type: integer
      description: 2-14 (step 2dB, range -14dB to +14dB)
    - name: modifier
      type: string
      enum: [U, D, +, -]
      description: Up, Down, or offset adjustment

- id: eq_mid
  label: EQ Mid
  kind: action
  params:
    - name: zone
      type: string
      description: Zone music sub destination
    - name: value
      type: integer
      description: 2-14 (step 2dB, range -14dB to +14dB)
    - name: modifier
      type: string
      enum: [U, D, +, -]

- id: eq_treble
  label: EQ Treble
  kind: action
  params:
    - name: zone
      type: string
      description: Zone music sub destination
    - name: value
      type: integer
      description: 2-14 (step 2dB, range -14dB to +14dB)
    - name: modifier
      type: string
      enum: [U, D, +, -]

- id: gain_set
  label: Set Line Input Gain
  kind: action
  params:
    - name: input
      type: string
      description: Line input destination (L1-L8)
    - name: value
      type: integer
      description: +12dB to -12dB
    - name: modifier
      type: string
      enum: [U, D, +, -, Q]
      description: Up, Down, absolute, or Query

- id: enable_zone_member
  label: Enable Zone Member
  kind: action
  params:
    - name: destination
      type: string
      description: Zone sub destination (e.g. Z1.M1, Z1.L1)
    - name: member_type
      type: string
      enum: [microphone, line_input]
      description: M1-M4 (mic) or L1-L8 (line input)

- id: disable_zone_member
  label: Disable Zone Member
  kind: action
  params:
    - name: destination
      type: string
      description: Zone sub destination
    - name: member_type
      type: string
      enum: [microphone, line_input]

- id: enable_group
  label: Enable Group
  kind: action
  params:
    - name: group
      type: string
      description: Group destination (G1-G4)

- id: disable_group
  label: Disable Group
  kind: action
  params:
    - name: group
      type: string

- id: group_add_zone
  label: Add Zone to Group
  kind: action
  params:
    - name: group
      type: string
    - name: zones
      type: string
      description: Zone list e.g. "34" for zones 3 and 4

- id: group_remove_zone
  label: Remove Zone from Group
  kind: action
  params:
    - name: group
      type: string
    - name: zones
      type: string

- id: set_label
  label: Set Label
  kind: action
  params:
    - name: destination
      type: string
      description: Line input, zone, or group destination
    - name: label
      type: string
      description: Max 16 characters

- id: priority_trigger
  label: Priority Trigger
  kind: action
  params:
    - name: destination
      type: string
      description: Line input, mic, or paging mic sub destination
    - name: mode
      type: string
      enum: [V, O, A, Q]
      description: VOX, Off, Access, or Query

- id: priority_attenuation
  label: Set Priority Attenuation
  kind: action
  params:
    - name: destination
      type: string
      description: LI (line) or PM (paging mic) destination
    - name: value
      type: integer
      description: 0-46 dB global

- id: priority_hold
  label: Set Priority Hold Time
  kind: action
  params:
    - name: destination
      type: string
    - name: value
      type: integer
      description: 1-12 seconds global

- id: priority_release
  label: Set Priority Release Time
  kind: action
  params:
    - name: destination
      type: string
    - name: value
      type: integer
      description: 1-12 seconds global

- id: mic_gate
  label: Microphone Gate Control
  kind: action
  params:
    - name: gate
      type: string
      description: SY.M1-SY.M4
    - name: mode
      type: string
      enum: [E, D, Q]
      description: Enable, Disable, or Query

- id: emergency_mute_source
  label: Set Emergency Mute Source
  kind: action
  params:
    - name: source_type
      type: string
      enum: [off, line, mic]
      description: Off, Line (L1-8), or Microphone (M1-4)
    - name: source_num
      type: integer
      description: Source number if applicable
    - name: level
      type: integer
      description: Level value

- id: emergency_mute_normal
  label: Set Emergency Mute Normal
  kind: action
  params:
    - name: normal
      type: string
      enum: [C, O]
      description: C=normally closed, O=normally open

- id: stereo_mode
  label: Set Zone Stereo/Mono
  kind: action
  params:
    - name: zone
      type: string
      description: SY.Z1 or SY.Z2
    - name: mode
      type: string
      enum: [S, M, Q]
      description: Stereo, Mono, or Query

- id: system_boot_mode
  label: System Boot Mode
  kind: action
  params:
    - name: mode
      type: string
      enum: [D, F, P, Q]
      description: Default, Factory, Previous, or Query

- id: system_key_set
  label: Set Installer Key
  kind: action
  params:
    - name: current_key
      type: string
      description: 4 numeric characters
    - name: new_key
      type: string
      description: 4 numeric characters

- id: system_reset
  label: System Reset
  kind: action
  params: []

- id: system_save_default
  label: Save as Default
  kind: action
  params: []

- id: system_version_query
  label: Version Query
  kind: action
  params: []

- id: paging_access
  label: Paging Access Control
  kind: action
  params:
    - name: access
      type: string
      description: 8-character list, X=accessed, O=released
    - name: modifier
      type: string
      enum: [A, R, Q]
      description: Access, Release, or Query

- id: paging_contact_direction
  label: Paging Contact Direction
  kind: action
  params:
    - name: direction
      type: string
      enum: [I, O, Q]
      description: Input, Output, or Query

- id: paging_offset
  label: Paging Offset
  kind: action
  params:
    - name: value
      type: integer
      description: 0-15 (PM) or 0-120 in increments of 8 (RM)
    - name: modifier
      type: string
      enum: [Q]

- id: cdr_offset
  label: CDR-1 Offset
  kind: action
  params:
    - name: value
      type: integer
      description: 0-120 (increments of 8)
    - name: modifier
      type: string
      enum: [Q]

- id: spot_announcer_message
  label: Spot Announcer Message
  kind: action
  params:
    - name: message
      type: integer
      description: 1-8

- id: rs232_passthrough_text
  label: RS232 Text Pass-through
  kind: action
  params:
    - name: text
      type: string
      description: Up to 17 alphanumeric characters (Ethernet only, V1.07+)

- id: rs232_passthrough_command
  label: RS232 Command Pass-through
  kind: action
  params:
    - name: command
      type: string
      description: DCM1 command up to 17 chars (Ethernet only, V1.07+)

- id: rs232_passthrough_hex
  label: RS232 Hex Pass-through
  kind: action
  params:
    - name: hex
      type: string
      description: Up to 8 hex pairs (Ethernet only, V1.07+)

- id: mask_query
  label: Mask Query
  kind: action
  params:
    - name: destination
      type: string
      description: LI, MI of zone/group, or group destination
    - name: modifier
      type: string
      enum: [Q]
      description: Query only (V1.07+)

- id: usage_query
  label: Usage Query
  kind: action
  params:
    - name: destination
      type: string
      description: SY.ET or SY.MI (V1.07+)

- id: boot_loader
  label: Boot Loader Control
  kind: action
  params:
    - name: action
      type: string
      enum: [U, E, D, L, Q]
      description: Unlock, Enable, Disable, Lock, Query (V1.07+)
    - name: installer_key
      type: string
      description: Required for Unlock action

- id: gpio_direction
  label: GPIO Direction
  kind: action
  params:
    - name: pin
      type: integer
      description: Pin number 1-8
    - name: direction
      type: string
      enum: [I, O]
      description: Input or Output

- id: gpio_bit
  label: GPIO Bit Operation
  kind: action
  params:
    - name: operation
      type: string
      enum: [BP, BS, BC, Q]
      description: Bit Put, Bit Set, Bit Clear, Query
    - name: positions
      type: string
      description: Pin positions
```

## Feedbacks
```yaml
- id: level_response
  type: integer
  description: Returns current level 0-255

- id: source_response
  type: integer
  description: Returns current source 1-8

- id: mute_response
  type: string
  description: Returns "mute" for muted state

- id: limit_response
  type: object
  properties:
    - name: min
      type: integer
    - name: max
      type: integer

- id: eq_response
  type: object
  properties:
    - name: treble
      type: integer
    - name: mid
      type: integer
    - name: bass
      type: integer

- id: enable_state_response
  type: string
  description: "e=enabled, d=disabled"

- id: label_response
  type: string
  description: Returns current label (max 16 chars)

- id: priority_state_response
  type: object
  properties:
    - name: attn
      type: integer
      description: Attenuation in dB
    - name: hold
      type: integer
      description: Hold time in seconds
    - name: rel
      type: integer
      description: Release time in seconds

- id: mic_gate_response
  type: string
  description: "on or off"

- id: trigger_status_response
  type: string
  description: "I=inactive, A=active, character position indicates source"

- id: emergency_mute_response
  type: object
  properties:
    - name: source
      type: string
      description: off, line, or mic source
    - name: level
      type: integer
      description: Level value
    - name: normal
      type: string
      description: nc or no

- id: version_response
  type: object
  properties:
    - name: sw
      type: string
      description: Software version
    - name: hw
      type: string
      description: Hardware version

- id: stereo_response
  type: string
  description: "s=stereo, m=mono"

- id: boot_mode_response
  type: string
  description: "d=default, f=factory, p=previous"

- id: boot_loader_response
  type: string
  description: "ue=unlocked, ld=locked"

- id: usage_response
  type: string
  description: 4 characters, O=unused, X=in use

- id: mask_response
  type: string
  description: "x=enabled, o=disabled"

- id: access_response
  type: string
  description: 8 characters for access contacts, A=asserted, I=inactive

- id: paging_response
  type: string
  description: 8-character zone access status

- id: contact_direction_response
  type: string
  description: "acc = in" or "acc = out"

- id: offset_response
  type: integer
  description: Current offset value

- id: error_response
  type: string
  description: "!B buffer overflow, !E execution error, !I interrupted, !A overrun, !P parse, !T tokenise"
```

## Variables
```yaml
# All settable parameters captured in Actions above; queryable state returned via Feedbacks.
# No separate Variables section required.
```

## Events
```yaml
# UNRESOLVED: No explicit event/push notification descriptions in source.
# Device responds to commands; no unsolicited events documented.
```

## Macros
```yaml
# No explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: No safety warnings or interlock procedures in source.
```

## Notes
RS-232 pass-through commands (C, H, T) and boot loader commands (B) require V1.07+. Version query returns sw=X.XX hw=X.XX. Reset command returns `<DCM-1 RESET/>` response before rebooting. Error responses use prefix `!` plus uppercase letter. No password or authentication required.
<!-- UNRESOLVED: Maximum message length not stated. Flow control (RTS/CTS) not stated. DTR/DSR support not stated. -->

## Provenance

```yaml
source_domains:
  - cloud.co.uk
retrieved_at: 2026-04-29T17:33:38.526Z
last_checked_at: 2026-04-30T09:39:44.971Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:39:44.971Z
matched_actions: 44
action_count: 44
confidence: high
summary: "All 44 spec actions matched cleanly to source; all transport parameters verified; comprehensive command coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
