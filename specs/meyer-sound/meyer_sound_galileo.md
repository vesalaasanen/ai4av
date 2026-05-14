---
spec_id: admin/meyer_sound-galileo
schema_version: ai4av-public-spec-v1
revision: 1
title: "Meyer Sound Galileo GALAXY Control Spec"
manufacturer: "Meyer Sound"
model_family: "GALAXY 408"
aliases: []
compatible_with:
  manufacturers:
    - "Meyer Sound"
  models:
    - "GALAXY 408"
    - "GALAXY 816"
    - "GALAXY 816-AES"
    - "Bluehorn 816"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.meyersound.com
  - applicationmarket.crestron.com
source_urls:
  - https://docs.meyersound.com/products/en/programming-guide---galileo-galaxy.html
  - https://docs.meyersound.com/products/en/user-guide---galileo-galaxy.html
  - https://applicationmarket.crestron.com/meyer-sound-galileo/
retrieved_at: 2026-04-26T18:21:57.350Z
last_checked_at: 2026-04-27T09:45:14.158Z
generated_at: 2026-04-27T09:45:14.158Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-27T09:45:14.158Z
  matched_actions: 14
  action_count: 14
  confidence: high
  summary: "All spec actions matched literally in source; transport parameters verified; OSC/ASCII protocols both covered."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-26
---

# Meyer Sound Galileo GALAXY Control Spec

## Summary
Meyer Sound Galileo GALAXY is a network platform audio processor supporting OSC and ASCII protocols over TCP and UDP. Controls loudspeaker processing including EQ, gain, delay, mute, routing matrix, and snapshot management. Physical GALAXY listens on ASCII port 25003 and OSC port 25004; virtual GALAXY ports vary by mode.

<!-- UNRESOLVED: RS-232 serial control not documented in source -->

## Transport
```yaml
protocols:
  - tcp
  - udp
  - osc
addressing:
  port: 25003  # ASCII server
  osc_port: 25004  # OSC server
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable       # control point get commands and description queries present
- routable        # matrix routing and input/output selection present
- levelable       # gain control on inputs and outputs present
- snapshotable    # recall/create/delete/update snapshot commands present
```

## Actions
```yaml
- id: recall_snapshot
  label: Recall Snapshot
  kind: action
  params:
    - name: snapshot_id
      type: integer
      description: Snapshot number (0-255)
    - name: exclusion_code
      type: integer
      required: false
      description: Optional exclusion bitmap (add codes to exclude settings on recall)

- id: update_snapshot
  label: Update Snapshot
  kind: action
  params:
    - name: snapshot_id
      type: integer
      description: Snapshot number to update to current settings

- id: create_snapshot
  label: Create Snapshot
  kind: action
  params:
    - name: name
      type: string
      required: false
      description: Optional snapshot name
    - name: comment
      type: string
      required: false
      description: Optional snapshot comment

- id: delete_snapshot
  label: Delete Snapshot
  kind: action
  params:
    - name: snapshot_id
      type: integer
      description: Snapshot number to delete

- id: ping
  label: Ping
  kind: action
  params:
    - name: keyword
      type: string
      required: false
      description: Identifier for pong response matching

- id: set_control_point
  label: Set Control Point Value
  kind: action
  params:
    - name: address
      type: string
      description: OSC/ASCII control point path (e.g., /processing/input/1/mute)
    - name: value
      type: string
      description: New value for the control point

- id: subscribe
  label: Subscribe to Control Point
  kind: action
  params:
    - name: address
      type: string
      description: Control point path to subscribe to
    - name: update_rate_ms
      type: integer
      required: false
      default: 30
      description: Update rate in ms (0-100). Default 30ms if omitted.

- id: unsubscribe
  label: Unsubscribe from Control Point
  kind: action
  params:
    - name: address
      type: string
      description: Control point path to unsubscribe from

- id: mute_input
  label: Mute Input Channel
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-8)

- id: unmute_input
  label: Unmute Input Channel
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-8)

- id: mute_output
  label: Mute Output Channel
  kind: action
  params:
    - name: output
      type: integer
      description: Output number (1-16)

- id: unmute_output
  label: Unmute Output Channel
  kind: action
  params:
    - name: output
      type: integer
      description: Output number (1-16)

- id: set_input_gain
  label: Set Input Gain
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-8)
    - name: gain_db
      type: number
      description: Gain in dB (-90 to 0, where -90 = -inf)

- id: set_output_gain
  label: Set Output Gain
  kind: action
  params:
    - name: output
      type: integer
      description: Output number (1-16)
    - name: gain_db
      type: number
      description: Gain in dB (-90 to 0, where -90 = -inf)
```

## Feedbacks
```yaml
# Control point value responses
- id: control_point_value
  type: string
  description: Response to get/set control point commands. Format: /path=value

- id: control_point_description
  type: object
  description: Response to ? command. Contains description, read_only, name, value, minimum, maximum, default, step, units.

- id: pong
  type: string
  description: Response to ping command with echoed keyword identifier

- id: snapshot_response
  type: string
  description: Response to snapshot commands
```

## Variables
```yaml
# Processing - Input (1-8)
- id: input_delay
  path: /processing/input/{n}/delay
  type: number
  default: 0
  description: Input delay value

- id: input_delay_type
  path: /processing/input/{n}/delay_type
  type: integer
  description: Delay type setting

- id: input_eq_bypass
  path: /processing/input/{n}/eq/bypass
  type: boolean
  default: false

- id: input_eq_band_bypass
  path: /processing/input/{n}/eq/{band}/band_bypass
  type: boolean
  description: Per-band bypass, bands 1-5

- id: input_eq_band_frequency
  path: /processing/input/{n}/eq/{band}/frequency
  type: number
  description: EQ band frequency in Hz (32, 125, 500, 2000, 8000 per band)

- id: input_eq_band_gain
  path: /processing/input/{n}/eq/{band}/gain
  type: number
  default: 0
  description: EQ band gain in dB

- id: input_eq_band_bandwidth
  path: /processing/input/{n}/eq/{band}/bandwidth
  type: number
  default: 1

- id: input_equalization_bypass
  path: /processing/input/{n}/equalization_bypass
  type: boolean
  default: false

- id: input_gain
  path: /processing/input/{n}/gain
  type: number
  default: 0
  description: Input gain in dB (-90 to 0, -90 = -inf)

- id: input_mute
  path: /processing/input/{n}/mute
  type: boolean
  default: true

- id: input_ushaping_bypass
  path: /processing/input/{n}/ushaping/bypass
  type: boolean
  default: false

- id: input_ushaping_frequency
  path: /processing/input/{n}/ushaping/{band}/frequency
  type: number
  description: U-shaping frequency per band (62, 250, 1000, 4000 Hz)

- id: input_ushaping_gain
  path: /processing/input/{n}/ushaping/{band}/gain
  type: number
  default: 0

- id: input_ushaping_slope
  path: /processing/input/{n}/ushaping/{band}/slope
  type: integer
  default: 2

# Processing - Output (1-16)
- id: output_delay
  path: /processing/output/{n}/delay
  type: number
  default: 0

- id: output_delay_type
  path: /processing/output/{n}/delay_type
  type: integer

- id: output_eq_bypass
  path: /processing/output/{n}/eq/bypass
  type: boolean
  default: false

- id: output_eq_band_bypass
  path: /processing/output/{n}/eq/{band}/band_bypass
  type: boolean
  default: false

- id: output_eq_band_frequency
  path: /processing/output/{n}/eq/{band}/frequency
  type: number
  description: EQ band frequency (32, 63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000 Hz)

- id: output_eq_band_gain
  path: /processing/output/{n}/eq/{band}/gain
  type: number
  default: 0

- id: output_eq_band_bandwidth
  path: /processing/output/{n}/eq/{band}/bandwidth
  type: number
  default: 1

- id: output_equalization_bypass
  path: /processing/output/{n}/equalization_bypass
  type: boolean
  default: false

- id: output_gain
  path: /processing/output/{n}/gain
  type: number
  default: 0

- id: output_highpass_bypass
  path: /processing/output/{n}/highpass/bypass
  type: boolean
  default: true

- id: output_highpass_frequency
  path: /processing/output/{n}/highpass/frequency
  type: number
  default: 40

- id: output_highpass_type
  path: /processing/output/{n}/highpass/type
  type: integer
  default: 11

- id: output_lowpass_bypass
  path: /processing/output/{n}/lowpass/bypass
  type: boolean
  default: true

- id: output_lowpass_frequency
  path: /processing/output/{n}/lowpass/frequency
  type: number
  default: 160

- id: output_lowpass_type
  path: /processing/output/{n}/lowpass/type
  type: integer
  default: 11

- id: output_mute
  path: /processing/output/{n}/mute
  type: boolean
  default: false

- id: output_polarity_reversal
  path: /processing/output/{n}/polarity_reversal
  type: boolean
  default: false

- id: output_atmospheric_bypass
  path: /processing/output/{n}/atmospheric/bypass
  type: boolean
  default: true

- id: output_atmospheric_distance
  path: /processing/output/{n}/atmospheric/distance
  type: number
  default: 0

- id: output_atmospheric_gain
  path: /processing/output/{n}/atmospheric/gain
  type: number
  default: 10

- id: output_ushaping_bypass
  path: /processing/output/{n}/ushaping/bypass
  type: boolean
  default: false

# Matrix (inputs 1-32, outputs 1-16)
- id: matrix_delay
  path: /processing/matrix/{input}/{output}/delay
  type: number
  default: 0

- id: matrix_delay_bypass
  path: /processing/matrix/{input}/{output}/delay_bypass
  type: boolean
  default: false

- id: matrix_delay_type
  path: /processing/matrix/{input}/{output}/delay_type
  type: integer

- id: matrix_gain
  path: /processing/matrix/{input}/{output}/gain
  type: number
  default: 0  # most default to -90 except first 8 cross points

# System
- id: front_panel_lockout
  path: /system/hardware/front_panel_lockout
  type: boolean
  default: false

- id: network_static_ip
  path: /system/network/{port}/static/ip_address
  type: string

- id: network_static_netmask
  path: /system/network/{port}/static/net_mask
  type: string

- id: network_static_gateway
  path: /system/network/{port}/static/gateway
  type: string

# Device preferences
- id: preferences_brightness
  path: /device/preferences/brightness
  type: integer
  default: 1

- id: preferences_display_color
  path: /device/preferences/display_color
  type: integer
  default: 3

# Processed inputs (1-8)
- id: input_name
  path: /device/input/{n}/name
  type: string
  default: "Input A" through "Input H"

- id: input_mode
  path: /device/input/{n}/mode
  type: integer
  default: 1

- id: input_select
  path: /device/input/{n}/select
  type: boolean
  default: false

- id: input_isolate
  path: /device/input/{n}/isolate
  type: boolean
  default: false

- id: input_scale
  path: /device/input/{n}/scale
  type: integer
  default: 26

# Project snapshots (0-255)
- id: snapshot_name
  path: /project/snapshot/{n}/name
  type: string

- id: snapshot_locked
  path: /project/snapshot/{n}/locked
  type: boolean

- id: snapshot_modified
  path: /project/snapshot/{n}/modified
  type: boolean

- id: active_snapshot_id
  path: /project/snapshot/active/id
  type: integer
  default: -1
```

## Events
```yaml
# UNRESOLVED: explicit unsolicited event documentation not found in source.
# TCP subscriptions remain active until unsubscribe or connection break.
# UDP subscriptions timeout after 30s without packets; keepalive ping recommended.
```

## Macros
```yaml
# Exclusion codes for recall_snapshot (add together to combine):
# 1  = exclusion enabled, nothing excluded
# 2  = exclude Input Channel Types
# 4  = exclude Input and Output Voltage Ranges
# 8  = exclude Input and Output Mute
# 16 = exclude Update active snapshot before recall
# 32 = exclude SIM3 Bus Address
# 64 = exclude SIM3 Probe Point
# 128 = exclude Clock Sync Mode
# 256 = exclude AVB Configuration
# Example: 511 excludes all settings and updates active snapshot before recall
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
- ASCII commands prefixed with `:` (e.g., `:recall_snapshot 3`). All ASCII commands end with CR or LF (`0d` or `0a`).
- OSC server port 25004 (physical) or 50504+ (virtual normal mode) or 25004+ (virtual Spacemap mode). ASCII server port 25003 (physical) or 50503+ (virtual normal mode) or 25003+ (virtual Spacemap mode). Virtual port numbering: decrement by 100 per additional virtual in normal mode; increment by 100 per additional in Spacemap mode.
- Control point wildcards: `.` matches any single char, `*` wildcard, `\d` integer wildcard, `\d+` greedy integer wildcard.
- UDP subscriptions expire after 30s without packets; send empty ping OSC to keep alive.
- OSC arguments: i (32-bit int), f (32-bit float), s (string), h (64-bit int), T (true), F (false). GALAXY casts positive integers to Boolean True.
- Regular expressions allowed in control point paths for bulk set/query operations.
<!-- UNRESOLVED: RS-232 serial protocol not documented in source -->
<!-- UNRESOLVED: authentication credentials not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: binary command byte encodings beyond hex tables shown -->
<!-- UNRESOLVED: fault behavior and error recovery sequences not documented -->

## Provenance

```yaml
source_domains:
  - docs.meyersound.com
  - applicationmarket.crestron.com
source_urls:
  - https://docs.meyersound.com/products/en/programming-guide---galileo-galaxy.html
  - https://docs.meyersound.com/products/en/user-guide---galileo-galaxy.html
  - https://applicationmarket.crestron.com/meyer-sound-galileo/
retrieved_at: 2026-04-26T18:21:57.350Z
last_checked_at: 2026-04-27T09:45:14.158Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T09:45:14.158Z
matched_actions: 14
action_count: 14
confidence: high
summary: "All spec actions matched literally in source; transport parameters verified; OSC/ASCII protocols both covered."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
