---
spec_id: admin/d_and_b_audiotechnik-ds100
schema_version: ai4av-public-spec-v1
revision: 1
title: "D&B Audiotechnik DS100 Control Spec"
manufacturer: "D&B Audiotechnik"
model_family: DS100
aliases: []
compatible_with:
  manufacturers:
    - "D&B Audiotechnik"
  models:
    - DS100
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - dbaudio.com
source_urls:
  - https://www.dbaudio.com/assets/products/downloads/manuals-documentation/electronics/dbaudio-osc-protocol-ds100-1.3.12-en.pdf
retrieved_at: 2026-04-30T04:41:05.451Z
last_checked_at: 2026-06-02T22:05:40.188Z
generated_at: 2026-06-02T22:05:40.188Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232 / serial control not mentioned in source"
  - "TCP/IP control not mentioned in source"
  - "populate from source, or remove section if not applicable"
  - "DS100 does not send unsolicited OSC messages in this document"
  - "no safety warnings or interlock procedures found in source"
  - "specific firmware version compatibility not stated in source"
  - "AES70/OCA protocol details not documented in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:05:40.188Z
  matched_actions: 55
  action_count: 55
  confidence: medium
  summary: "All 55 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# D&B Audiotechnik DS100 Control Spec

## Summary
The DS100 is a audio matrix processor supporting OSC over UDP for external control. It uses UDP ports 50010 (incoming) and 50011 (outgoing). OSC wildcards (? * [range] {list}) and AES70/OCA are also supported. No authentication procedure is described.

<!-- UNRESOLVED: RS-232 / serial control not mentioned in source -->
<!-- UNRESOLVED: TCP/IP control not mentioned in source -->

## Transport
```yaml
protocols:
  - udp
addressing:
  port: 50010  # listen port; port 50011 used for replies
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# inferred from OSC command examples:
# - routable: matrix input/output routing via crosspoint enable/gain/delay
# - queryable: read commands returning state values
# - levelable: gain, delay, reverb send gain parameters
```

## Actions
```yaml
# Matrix input
- id: matrixinput_mute
  label: Matrix Input Mute
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: value
      type: integer
      description: "0 = unmute, 1 = mute"

- id: matrixinput_gain
  label: Matrix Input Gain
  kind: action
  params:
    - name: input
      type: integer
    - name: value
      type: float
      description: Gain in dB (-120.0 to 24.0)

- id: matrixinput_delay
  label: Matrix Input Delay
  kind: action
  params:
    - name: input
      type: integer
    - name: value
      type: float
      description: Delay in ms (0.0 to 500.0)

- id: matrixinput_delayenable
  label: Matrix Input Delay Enable
  kind: action
  params:
    - name: input
      type: integer
    - name: value
      type: integer
      description: "0 = off, 1 = on"

- id: matrixinput_eqenable
  label: Matrix Input EQ Enable
  kind: action
  params:
    - name: input
      type: integer
    - name: value
      type: integer
      description: "0 = off, 1 = on"

- id: matrixinput_polarity
  label: Matrix Input Polarity
  kind: action
  params:
    - name: input
      type: integer
    - name: value
      type: integer
      description: "0 = normal, 1 = reversed"

- id: matrixinput_channelname
  label: Matrix Input Channel Name
  kind: action
  params:
    - name: input
      type: integer
    - name: value
      type: string
      description: Max 31 characters

- id: matrixinput_reverbsendgain
  label: Matrix Input Reverb Send Gain
  kind: action
  params:
    - name: input
      type: integer
    - name: value
      type: float
      description: Gain in dB (-120.0 to 24.0)

# Matrix output
- id: matrixoutput_mute
  label: Matrix Output Mute
  kind: action
  params:
    - name: output
      type: integer
    - name: value
      type: integer
      description: "0 = unmute, 1 = mute"

- id: matrixoutput_gain
  label: Matrix Output Gain
  kind: action
  params:
    - name: output
      type: integer
    - name: value
      type: float
      description: Gain in dB (-120.0 to 24.0)

- id: matrixoutput_delay
  label: Matrix Output Delay
  kind: action
  params:
    - name: output
      type: integer
    - name: value
      type: float
      description: Delay in ms (0.0 to 500.0)

- id: matrixoutput_delayenable
  label: Matrix Output Delay Enable
  kind: action
  params:
    - name: output
      type: integer
    - name: value
      type: integer
      description: "0 = off, 1 = on"

- id: matrixoutput_eqenable
  label: Matrix Output EQ Enable
  kind: action
  params:
    - name: output
      type: integer
    - name: value
      type: integer
      description: "0 = off, 1 = on"

- id: matrixoutput_polarity
  label: Matrix Output Polarity
  kind: action
  params:
    - name: output
      type: integer
    - name: value
      type: integer
      description: "0 = normal, 1 = reversed"

- id: matrixoutput_channelname
  label: Matrix Output Channel Name
  kind: action
  params:
    - name: output
      type: integer
    - name: value
      type: string
      description: Max 31 characters

# Matrix node (crosspoint)
- id: matrixnode_enable
  label: Matrix Node Enable
  kind: action
  params:
    - name: input
      type: integer
    - name: output
      type: integer
    - name: value
      type: integer
      description: "0 = disabled, 1 = enabled"

- id: matrixnode_gain
  label: Matrix Node Gain
  kind: action
  params:
    - name: input
      type: integer
    - name: output
      type: integer
    - name: value
      type: float
      description: Gain in dB (-120.0 to 10.0)

- id: matrixnode_delayenable
  label: Matrix Node Delay Enable
  kind: action
  params:
    - name: input
      type: integer
    - name: output
      type: integer
    - name: value
      type: integer
      description: "0 = off, 1 = on"

- id: matrixnode_delay
  label: Matrix Node Delay
  kind: action
  params:
    - name: input
      type: integer
    - name: output
      type: integer
    - name: value
      type: float
      description: Delay in ms (0.0 to 500.0)

# General settings
- id: settings_devicename
  label: Set Device Name
  kind: action
  params:
    - name: value
      type: string
      description: Max 15 characters

# Device
- id: device_clear
  label: Device Clear
  kind: action
  params: []
  description: Resets device to factory defaults except remote settings

# Scenes
- id: scene_previous
  label: Scene Previous
  kind: action
  params: []
  description: Recalls previous scene

- id: scene_next
  label: Scene Next
  kind: action
  params: []
  description: Recalls next scene

- id: scene_recall_major
  label: Scene Recall (Major)
  kind: action
  params:
    - name: major
      type: integer
      description: Scene number (0-999), format "major"

- id: scene_recall_major_minor
  label: Scene Recall (Major/Minor)
  kind: action
  params:
    - name: major
      type: integer
      description: Major scene number (0-999)
    - name: minor
      type: integer
      description: Minor scene index (0-99)

# En-Space
- id: matrixsettings_reverbroomid
  label: En-Space Reverb Room
  kind: action
  params:
    - name: value
      type: integer
      description: "Room selector: 0=off, 1-9=preset rooms, 101-103=custom rooms"

- id: matrixsettings_reverbpredelayfactor
  label: En-Space Predelay Factor
  kind: action
  params:
    - name: value
      type: float
      description: Predelay factor (0.2 to 2.0)

- id: matrixsettings_verbrearlevel
  label: En-Space Rear Level
  kind: action
  params:
    - name: value
      type: float
      description: Rear level in dB (-24.0 to 24.0)

# En-Space input matrix
- id: reverbinput_gain
  label: En-Space Input Gain
  kind: action
  params:
    - name: input
      type: integer
    - name: zone
      type: integer
      description: Zone (1-4)
    - name: value
      type: float
      description: Gain in dB (-120.0 to 24.0)

# En-Space input processing
- id: reverbinputprocessing_gain
  label: Reverb Input Processing Gain
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: float
      description: Gain in dB (-120.0 to 24.0)

- id: reverbinputprocessing_eqenable
  label: Reverb Input Processing EQ Enable
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0 = off, 1 = on"

# En-Scene positioning
- id: positioning_source_enable
  label: Positioning Source Enable
  kind: action
  params:
    - name: input
      type: integer
    - name: value
      type: float
      description: "0 = matrix, 1 = En-Scene"

- id: positioning_source_spread
  label: Positioning Source Spread
  kind: action
  params:
    - name: input
      type: integer
    - name: value
      type: float
      description: Spread value (0.0 to 1.0, step 0.01, default 0.5)

- id: positioning_source_delaymode
  label: Positioning Source Delay Mode
  kind: action
  params:
    - name: input
      type: integer
    - name: value
      type: integer
      description: "0 = off, 1 = tight, 2 = full"

- id: positioning_source_position
  label: Positioning Source Position (XYZ)
  kind: action
  params:
    - name: input
      type: integer
    - name: x
      type: float
      description: X position in meters
    - name: y
      type: float
      description: Y position in meters
    - name: z
      type: float
      description: Z position in meters

- id: positioning_source_position_xy
  label: Positioning Source Position (XY)
  kind: action
  params:
    - name: input
      type: integer
    - name: x
      type: float
      description: X position in meters
    - name: y
      type: float
      description: Y position in meters

- id: positioning_source_position_x
  label: Positioning Source Position X
  kind: action
  params:
    - name: input
      type: integer
    - name: value
      type: float
      description: X position in meters

- id: positioning_source_position_y
  label: Positioning Source Position Y
  kind: action
  params:
    - name: input
      type: integer
    - name: value
      type: float
      description: Y position in meters

# Coordinate mapping
- id: coordinatemapping_source_position
  label: Coordinate Mapping Source Position (XYZ)
  kind: action
  params:
    - name: area
      type: integer
      description: Mapping area (1-4)
    - name: input
      type: integer
    - name: x
      type: float
    - name: y
      type: float
    - name: z
      type: float

- id: coordinatemapping_source_position_xy
  label: Coordinate Mapping Source Position (XY)
  kind: action
  params:
    - name: area
      type: integer
    - name: input
      type: integer
    - name: x
      type: float
    - name: y
      type: float

- id: coordinatemapping_source_position_x
  label: Coordinate Mapping Source Position X
  kind: action
  params:
    - name: area
      type: integer
    - name: input
      type: integer
    - name: value
      type: float

- id: coordinatemapping_source_position_y
  label: Coordinate Mapping Source Position Y
  kind: action
  params:
    - name: area
      type: integer
    - name: input
      type: integer
    - name: value
      type: float

# Sound object routing
- id: soundobjectrouting_mute
  label: Sound Object Routing Mute
  kind: action
  params:
    - name: functiongroup
      type: integer
      description: Function group (1-32)
    - name: soundobject
      type: integer
    - name: value
      type: integer
      description: "0 = unmute, 1 = mute"

- id: soundobjectrouting_gain
  label: Sound Object Routing Gain
  kind: action
  params:
    - name: functiongroup
      type: integer
    - name: soundobject
      type: integer
    - name: value
      type: float
      description: Gain in dB (-120.0 to 10.0)

# Function group
- id: functiongroup_spreadfactor
  label: Function Group Spread Factor
  kind: action
  params:
    - name: functiongroup
      type: integer
    - name: value
      type: float
      description: Spread factor (0.5 to 2.0)

- id: functiongroup_delay
  label: Function Group Delay
  kind: action
  params:
    - name: functiongroup
      type: integer
    - name: value
      type: float
      description: Delay in ms (0.0 to 500.0)
# Firmware version
- id: fixed_firmwareversion
  label: Firmware Version
  kind: query
  params: []
  description: Returns device type and firmware version string (e.g. "DS100 V3.02.02")

# Coordinate mapping settings
- id: coordinatemappingsettings_p1_real
  label: Coordinate Mapping Settings P1 Real
  kind: query
  params:
    - name: area
      type: integer
      description: Mapping area (1-4)
  description: P1 position of coordinate mapping absolute to project origin x, y, z (values in meters)

- id: coordinatemappingsettings_p2_real
  label: Coordinate Mapping Settings P2 Real
  kind: query
  params:
    - name: area
      type: integer
      description: Mapping area (1-4)
  description: P2 position of coordinate mapping absolute to project origin x, y, z (values in meters)

- id: coordinatemappingsettings_p3_real
  label: Coordinate Mapping Settings P3 Real
  kind: query
  params:
    - name: area
      type: integer
      description: Mapping area (1-4)
  description: P3 position of coordinate mapping absolute to project origin x, y, z (values in meters)

- id: coordinatemappingsettings_p4_real
  label: Coordinate Mapping Settings P4 Real
  kind: query
  params:
    - name: area
      type: integer
      description: Mapping area (1-4)
  description: P4 position of coordinate mapping absolute to project origin x, y, z (values in meters)

- id: coordinatemappingsettings_p1_virtual
  label: Coordinate Mapping Settings P1 Virtual
  kind: query
  params:
    - name: area
      type: integer
      description: Mapping area (1-4)
  description: Virtual x, y, z coordinate of point P1 of the coordinate mapping

- id: coordinatemappingsettings_p3_virtual
  label: Coordinate Mapping Settings P3 Virtual
  kind: query
  params:
    - name: area
      type: integer
      description: Mapping area (1-4)
  description: Virtual x, y, z coordinate of point P3 of the coordinate mapping

- id: coordinatemappingsettings_flip
  label: Coordinate Mapping Settings Flip
  kind: query
  params:
    - name: area
      type: integer
      description: Mapping area (1-4)
  description: "Swaps coordinates order of OSC messages (0 = x, y and 1 = y, x)"

- id: coordinatemappingsettings_name
  label: Coordinate Mapping Settings Name
  kind: query
  params:
    - name: area
      type: integer
      description: Mapping area (1-4)
  description: Name of the coordinate mapping (max 31 characters)
```

## Feedbacks
```yaml
- id: error_gnrlerr
  label: General Error Flag
  type: enum
  values: [0, 1]
  description: "0 = no error, 1 = general error"

- id: error_errortext
  label: Error Text
  type: string
  description: Max 31 characters

- id: status_statustext
  label: Status Text
  type: string
  description: Max 31 characters

- id: status_audionetworksamplestatus
  label: Audio Network Sample Rate Status
  type: enum
  values: [1, 4, 6]
  description: "1 = not in sync, 4 = 48 kHz, 6 = 96 kHz"

- id: status_matrixinputcount
  label: Matrix Input Count
  type: integer
  description: License-dependent (64-128)

- id: status_matrixoutputcount
  label: Matrix Output Count
  type: integer
  description: License-dependent (24-64)

- id: matrixinput_levelmeterpremute
  label: Matrix Input Level Meter (Pre-Mute)
  type: float
  description: Level in dB (-120.0 to 0.0)

- id: matrixinput_levelmeterpostmute
  label: Matrix Input Level Meter (Post-Mute)
  type: float
  description: Level in dB (-120.0 to 0.0)

- id: matrixoutput_levelmeterpremute
  label: Matrix Output Level Meter (Pre-Mute)
  type: float
  description: Level in dB (-120.0 to 0.0)

- id: matrixoutput_levelmeterpostmute
  label: Matrix Output Level Meter (Post-Mute)
  type: float
  description: Level in dB (-120.0 to 0.0)

- id: scene_sceneindex
  label: Scene Index
  type: string
  description: Format "major.minor", returns two integers

- id: scene_scenename
  label: Scene Name
  type: string
  description: Max 31 characters

- id: scene_scenecomment
  label: Scene Comment
  type: string
  description: Max 127 characters

- id: positioning_speaker_position
  label: Speaker Position
  type: string
  description: Returns 6 float values: X, Y, Z (meters), pan, tilt, spin (degrees)

- id: functiongroup_name
  label: Function Group Name
  type: string
  description: Max 15 characters

- id: reverbinputprocessing_levelmeter
  label: Reverb Input Processing Level Meter
  type: float
  description: Level in dB (-120.0 to 0.0)
```

## Variables
```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Events
```yaml
# UNRESOLVED: DS100 does not send unsolicited OSC messages in this document
```

## Macros
```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
OSC wildcards supported: `?` (single char), `*` (any sequence), `[range]` (character range), `{list}` (comma-separated alternatives). Matrix input/output sizes are license-dependent (DS100: 64×24 to 128×64; DS100M: 64×24 to 128×64 at 48/96 kHz). Coordinate mapping areas must be defined before setting positions. Scenes are created in R1 and recalled via OSC. En-Space and En-Scene are optional features requiring licenses.

<!-- UNRESOLVED: specific firmware version compatibility not stated in source -->
<!-- UNRESOLVED: AES70/OCA protocol details not documented in source -->

## Provenance

```yaml
source_domains:
  - dbaudio.com
source_urls:
  - https://www.dbaudio.com/assets/products/downloads/manuals-documentation/electronics/dbaudio-osc-protocol-ds100-1.3.12-en.pdf
retrieved_at: 2026-04-30T04:41:05.451Z
last_checked_at: 2026-06-02T22:05:40.188Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:05:40.188Z
matched_actions: 55
action_count: 55
confidence: medium
summary: "All 55 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232 / serial control not mentioned in source"
- "TCP/IP control not mentioned in source"
- "populate from source, or remove section if not applicable"
- "DS100 does not send unsolicited OSC messages in this document"
- "no safety warnings or interlock procedures found in source"
- "specific firmware version compatibility not stated in source"
- "AES70/OCA protocol details not documented in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
