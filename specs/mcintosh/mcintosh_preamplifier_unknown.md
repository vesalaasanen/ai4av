---
spec_id: admin/mcintosh-cr106
schema_version: ai4av-public-spec-v1
revision: 1
title: "McIntosh CR106 Control Spec"
manufacturer: McIntosh
model_family: CR106
aliases: []
compatible_with:
  manufacturers:
    - McIntosh
  models:
    - CR106
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - mcintoshlabs.com
  - scribd.com
source_urls:
  - https://www.mcintoshlabs.com/-/media/Files/mcintoshlabs/DocumentMaster/us/CR106-External-Control.pdf
  - https://www.scribd.com/document/942837415/McIntosh-RS232ControlApplicationNote
retrieved_at: 2026-08-01T20:36:33.586Z
last_checked_at: 2026-08-05T08:31:47.600Z
generated_at: 2026-08-05T08:31:47.600Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model family marketing name not stated beyond \"CR106\"; firmware version range not stated"
  - "source defines no distinct variable channel beyond the actions above."
  - "no macros documented."
  - "marketing model family name beyond CR106 not stated"
  - "firmware version compatibility range not stated"
  - "protocol version not stated"
  - "max concurrent TCP connections / keepalive behavior not stated"
  - "whether TCP and RS232 can operate simultaneously not stated"
verification:
  verdict: verified
  checked_at: 2026-08-05T08:31:47.600Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions match source opcodes verbatim; transport values (port 57012, 115200, 8/N/1) verified; source catalogue fully represented. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-01
---

# McIntosh CR106 Control Spec

## Summary
The McIntosh CR106 is a multi-zone preamplifier supporting RS232 and TCP/IP external control via an ASCII packet protocol. This spec covers core (power, status, display), per-input, per-zone, and group (multi-zone) commands. Control is compatible with Crestron, AMX, Savant, Control4, and other RS232-based systems.

<!-- UNRESOLVED: model family marketing name not stated beyond "CR106"; firmware version range not stated -->

## Transport
```yaml
protocols:
  - tcp
  - serial
# Source states both RS232 and TCP/IP carry the same ASCII packet protocol.
# "The CR106 RS232 uses port 57012 for these communications." (TCP port for IP control)
addressing:
  port: 57012
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from PWR power on/off command
  - queryable    # inferred from QRY / ZQY / GQY query commands
  - routable     # inferred from ZIA / GIA input selection commands
  - levelable    # inferred from ZVL volume, ZBA balance, trim and tone commands
```

## Actions
```yaml
# Packet structure (verbatim from source):
#   Start Byte 0x28 '(' | Command ID (3 bytes) | Parameters (each prefixed 0x20 space) | Stop Byte 0x29 ')'
# Optional CR/NL (0x0D 0x0A) terminator for readability.
# Command IDs are 3-char ASCII. Param ordering follows source packet tables.
# Conventions: Unit ID 1-5 (0x31-0x35); Zone ID 1-6 (0x31-0x36); Group ID 1-6 (0x31-0x36).
# Input ID values: 0=NONE, 1=AUX1, 2=AUX2, 3=AUX3, 4=AUX4, 5=COAX1, 6=COAX2, 7=OPT1, 8=OPT2, 9=BLUETOOTH.

# --- Core Commands ---
- id: query
  label: Query
  kind: query
  command: "(QRY)"
  params: []
  notes: "With no parameter specified, returns status for the requested command."

- id: status_enable
  label: Status Enable
  kind: action
  command: "(STA {state})"
  params:
    - name: state
      type: enum
      values: ["1", "0"]
      description: "'1' -> On (auto status messages on state change); '0' -> Off"

- id: power
  label: Power
  kind: action
  command: "(PWR {state})"
  params:
    - name: state
      type: enum
      values: ["1", "0"]
      description: "'1' -> On; '0' -> Off. If Power is Off, all non-Power commands return FAILED_PRECONDITION."

- id: display_brightness
  label: Display Brightness
  kind: action
  command: "(TDB {level})"
  params:
    - name: level
      type: enum
      values: ["1", "2", "3", "4"]
      description: "'1'->25%, '2'->50%, '3'->75%, '4'->100%"

- id: meter_lights
  label: Meter Lights
  kind: action
  command: "(TML {state})"
  params:
    - name: state
      type: enum
      values: ["1", "0"]
      description: "'1' -> On; '0' -> Off"

# --- Input Commands ---  packet: (CMD UnitID InputID [Param])
- id: input_trim_level
  label: Input Trim Level
  kind: action
  command: "(ITL {unit_id} {input_id} {level})"
  params:
    - name: unit_id
      type: integer
      description: "Target CR106 Unit/Link ID, 1-5"
    - name: input_id
      type: integer
      description: "Input ID 0-9 (see Input ID map)"
    - name: level
      type: string
      description: "'-10' to '10' set level; step size 0.5dB"

- id: bt_pair
  label: BT Pair
  kind: action
  command: "(IBT {unit_id} {input_id})"
  params:
    - name: unit_id
      type: integer
      description: "Target CR106 Unit/Link ID, 1-5"
    - name: input_id
      type: integer
      description: "Must be 9 (BLUETOOTH); status not supported"
  notes: "Only valid for Bluetooth input; status query not supported."

# --- Zone Commands ---  packet: (CMD UnitID ZoneID [Param])
- id: zone_query
  label: Zone Query
  kind: query
  command: "(ZQY {unit_id} {zone_id})"
  params:
    - name: unit_id
      type: integer
      description: "Target CR106 Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Target Zone index, 1-6"
  notes: "Returns all settings for the requested Zone."

- id: zone_select
  label: Zone Select
  kind: action
  command: "(ZNS {unit_id} {zone_id})"
  params:
    - name: unit_id
      type: integer
      description: "Target CR106 Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Target Zone index, 1-6"
  notes: "Sets the Zone Context of the display."

- id: zone_volume
  label: Zone Volume
  kind: action
  command: "(ZVL {unit_id} {zone_id} {value})"
  params:
    - name: unit_id
      type: integer
      description: "Target CR106 Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Target Zone index, 1-6"
    - name: value
      type: string
      description: "'U' -> Up 1%; 'D' -> Down 1%; '0'-'100' -> Set %"

- id: zone_mute
  label: Zone Mute
  kind: action
  command: "(ZMT {unit_id} {zone_id} {state})"
  params:
    - name: unit_id
      type: integer
      description: "Target CR106 Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Target Zone index, 1-6"
    - name: state
      type: enum
      values: ["1", "0"]
      description: "'1' -> Mute; '0' -> Unmute"

- id: zone_input_selection
  label: Zone Input Selection
  kind: action
  command: "(ZIA {unit_id} {zone_id} {source_unit_id} {input_id})"
  params:
    - name: unit_id
      type: integer
      description: "Target CR106 Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Target Zone index, 1-6"
    - name: source_unit_id
      type: integer
      description: "Parameter 1 = source Unit ID"
    - name: input_id
      type: integer
      description: "Parameter 2 = Input ID (see Input ID map)"

- id: zone_balance
  label: Zone Balance
  kind: action
  command: "(ZBA {unit_id} {zone_id} {value})"
  params:
    - name: unit_id
      type: integer
      description: "Target CR106 Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Target Zone index, 1-6"
    - name: value
      type: string
      description: "'L' -> Left 1dB; 'R' -> Right 1dB; '-50' to '50' -> Set Value (sign: - Left, + Right)"

- id: zone_b_channel_trim
  label: Zone B Channel Trim Level
  kind: action
  command: "(ZBT {unit_id} {zone_id} {level})"
  params:
    - name: unit_id
      type: integer
      description: "Target CR106 Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Target Zone index, 1-6"
    - name: level
      type: string
      description: "'-10' to '10' set level; step size 0.5dB"

- id: zone_subwoofer_trim
  label: Zone Subwoofer Trim Level
  kind: action
  command: "(ZST {unit_id} {zone_id} {level})"
  params:
    - name: unit_id
      type: integer
      description: "Target CR106 Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Target Zone index, 1-6"
    - name: level
      type: string
      description: "'-10' to '10' set level; step size 0.5dB"

- id: zone_tone_bass
  label: Zone Tone Bass
  kind: action
  command: "(ZTB {unit_id} {zone_id} {value})"
  params:
    - name: unit_id
      type: integer
      description: "Target CR106 Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Target Zone index, 1-6"
    - name: value
      type: string
      description: "'U' -> Up 1dB; 'D' -> Down 1dB; '-12' to '12' -> Set Level"

- id: zone_tone_treble
  label: Zone Tone Treble
  kind: action
  command: "(ZTT {unit_id} {zone_id} {value})"
  params:
    - name: unit_id
      type: integer
      description: "Target CR106 Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Target Zone index, 1-6"
    - name: value
      type: string
      description: "'U' -> Up 1dB; 'D' -> Down 1dB; '-12' to '12' -> Set Level"

- id: zone_equalizer
  label: Zone Equalizer
  kind: action
  command: "(ZEQ {unit_id} {zone_id} {preset})"
  params:
    - name: unit_id
      type: integer
      description: "Target CR106 Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Target Zone index, 1-6"
    - name: preset
      type: enum
      values: ["0", "1", "2", "3", "4", "5", "6"]
      description: "'0'->Off, '1'->Music, '2'->Music II, '3'->Relaxed, '4'->Tilt, '5'->Action, '6'->Action + Movie"

- id: zone_high_pass
  label: Zone High Pass
  kind: action
  command: "(ZHP {unit_id} {zone_id} {value})"
  params:
    - name: unit_id
      type: integer
      description: "Target CR106 Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Target Zone index, 1-6"
    - name: value
      type: string
      description: "'0' -> Disable; '1' -> Enable; '40'-'120' -> Set Hertz"
  notes: "Status returns enable + frequency, e.g. (ZHP 1 3 0 50) = 1-ZONE3 high pass disabled at 50Hz."

- id: zone_low_pass
  label: Zone Low Pass
  kind: action
  command: "(ZLP {unit_id} {zone_id} {value})"
  params:
    - name: unit_id
      type: integer
      description: "Target CR106 Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Target Zone index, 1-6"
    - name: value
      type: string
      description: "'0' -> Disable; '1' -> Enable; '40'-'120' -> Set Hertz"
  notes: "Status returns enable + frequency, e.g. (ZLP 4 2 1 70) = 4-ZONE2 low pass enabled at 70Hz."

# --- Group Commands ---  packet: (CMD GroupID [Param])  (GMK omits Group ID)
- id: group_query
  label: Group Query
  kind: query
  command: "(GQY {group_id})"
  params:
    - name: group_id
      type: integer
      description: "Target Group index, 1-6"
  notes: "Returns all settings for the requested Group. If Group ID omitted, returns list of current Group IDs."

- id: group_volume
  label: Group Volume
  kind: action
  command: "(GVL {group_id} {value})"
  params:
    - name: group_id
      type: integer
      description: "Target Group index, 1-6"
    - name: value
      type: string
      description: "'U' -> Up 1%; 'D' -> Down 1%; '0'-'100' -> Set %"

- id: group_mute
  label: Group Mute
  kind: action
  command: "(GMT {group_id} {state})"
  params:
    - name: group_id
      type: integer
      description: "Target Group index, 1-6"
    - name: state
      type: enum
      values: ["1", "0"]
      description: "'1' -> Mute; '0' -> Unmute"

- id: group_input_selection
  label: Group Input Selection
  kind: action
  command: "(GIA {group_id} {source_unit_id} {input_id})"
  params:
    - name: group_id
      type: integer
      description: "Target Group index, 1-6"
    - name: source_unit_id
      type: integer
      description: "Parameter 1 = source Unit ID"
    - name: input_id
      type: integer
      description: "Parameter 2 = Input ID (see Input ID map)"

- id: create_group
  label: Create Group
  kind: action
  command: "(GMK {zones})"
  params:
    - name: zones
      type: string
      description: "Repeated 'ij' tokens; i=Unit ID, j=Zone ID. Omits Group ID and its preceding space."
  notes: "e.g. (GMK 12 22 31 54) creates a group with 1-ZONE2, 2-ZONE2, 3-ZONE1, 5-ZONE4."

- id: delete_group
  label: Delete Group
  kind: action
  command: "(GRM {group_id})"
  params:
    - name: group_id
      type: integer
      description: "Target Group index, 1-6"

- id: update_group_zones
  label: Update Group Zones
  kind: action
  command: "(GUZ {group_id} {zones})"
  params:
    - name: group_id
      type: integer
      description: "Target Group index, 1-6"
    - name: zones
      type: string
      description: "Repeated 'ij' tokens; i=Unit ID, j=Zone ID"
  notes: "e.g. (GUZ 3 12 22 31 54) updates Group 3 to 1-ZONE2, 2-ZONE2, 3-ZONE1, 5-ZONE4."
```

## Feedbacks
```yaml
# Source: device echoes the same Command as an acknowledgement after processing.
# Invalid/corrupt commands yield an Error Message instead (see Events).
- id: command_ack
  type: string
  description: "Echo of the processed command packet, used as acknowledgement."

- id: power_state
  type: enum
  values: [on, off]
  description: "Reported via PWR status / QRY."

- id: zone_settings
  type: string
  description: "Returned by ZQY; all settings for the requested Zone."

- id: group_settings
  type: string
  description: "Returned by GQY; all settings for the requested Group (or list of Group IDs if Group ID omitted)."
```

## Variables
```yaml
# Settable continuous/level parameters are expressed as Actions (ZVL, ZBA, trims, tone, ZHP/ZLP freq).
# No separate non-action variables documented in source.
# UNRESOLVED: source defines no distinct variable channel beyond the actions above.
```

## Events
```yaml
# Unsolicited messages the CR106 transmits automatically.
- id: status_update
  type: string
  description: "On state change, the CR106 auto-transmits status updates (only when STA enabled), letting the host maintain current state."

- id: connect_banner
  type: string
  description: "On first AC connection, sends model, serial, and firmware: (CR106), (Serial Number: XXX####), (FW Version: #.#.#)."

# Error messages (verbatim from source):
- id: err_unknown
  type: string
  description: "(ERR 2) - Default message for all unclassified errors."
- id: err_invalid_argument
  type: string
  description: "(ERR 3) - Parameter is invalid for specified command."
- id: err_failed_precondition
  type: string
  description: "(ERR 9) - Parameter incompatible with current value(s) for one or more other settings."
- id: err_unimplemented
  type: string
  description: "(ERR 12) - Command is not supported/recognized."
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
# UNRESOLVED: no macros documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power off precondition: when PWR is Off, all non-Power RS232 commands return FAILED_PRECONDITION (ERR 9)."
# Source contains no explicit safety warnings, power-on sequencing, or interlock procedures
# beyond the power-off command-precondition above. No values inferred.
```

## Notes
- **Hardware:** RS232C serial control via 3.5mm TRS cable. Pinout — Tip: TXD (transmitted by CR106), Ring: RXD (received by CR106), Sleeve: Ground.
- **Compatibility:** Protocol compatible with Crestron, AMX, Savant, Control4, and other RS232-based control systems.
- **Unit/Link ID range 1-5; Zone ID range 1-6; Group ID range 1-6.**
- **Input ID map:** 0=NONE (zones/groups only), 1=AUX1, 2=AUX2, 3=AUX3, 4=AUX4, 5=COAX1, 6=COAX2, 7=OPT1, 8=OPT2, 9=BLUETOOTH.
- **Trim step sizes:** ITL/ZBT/ZST use 0.5dB steps over -10..10.
- **Disabled inputs/zones:** Requesting a disabled Input or Zone returns FAILED_PRECONDITION (ERR 9).

<!-- UNRESOLVED: marketing model family name beyond CR106 not stated -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: protocol version not stated -->
<!-- UNRESOLVED: max concurrent TCP connections / keepalive behavior not stated -->
<!-- UNRESOLVED: whether TCP and RS232 can operate simultaneously not stated -->
````

## Provenance

```yaml
source_domains:
  - mcintoshlabs.com
  - scribd.com
source_urls:
  - https://www.mcintoshlabs.com/-/media/Files/mcintoshlabs/DocumentMaster/us/CR106-External-Control.pdf
  - https://www.scribd.com/document/942837415/McIntosh-RS232ControlApplicationNote
retrieved_at: 2026-08-01T20:36:33.586Z
last_checked_at: 2026-08-05T08:31:47.600Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:31:47.600Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions match source opcodes verbatim; transport values (port 57012, 115200, 8/N/1) verified; source catalogue fully represented. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model family marketing name not stated beyond \"CR106\"; firmware version range not stated"
- "source defines no distinct variable channel beyond the actions above."
- "no macros documented."
- "marketing model family name beyond CR106 not stated"
- "firmware version compatibility range not stated"
- "protocol version not stated"
- "max concurrent TCP connections / keepalive behavior not stated"
- "whether TCP and RS232 can operate simultaneously not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
