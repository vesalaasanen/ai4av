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
retrieved_at: 2026-05-15T15:03:27.174Z
last_checked_at: 2026-06-02T22:09:39.092Z
generated_at: 2026-06-02T22:09:39.092Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "\"Universal Discrete Functions\" family name appears to be a database artifact; actual product is CR106"
  - "no settable continuous parameters distinct from the actions above"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures found in source"
  - "firmware version compatibility range not stated"
  - "\"Universal Discrete Functions\" family name may be a database artifact; actual product is CR106"
  - "max concurrent connection count over TCP/IP not stated"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:09:39.092Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# McIntosh CR106 Control Spec

## Summary
The McIntosh CR106 is a multi-zone preamplifier controllable via RS-232 and TCP/IP. Commands use ASCII packet format enclosed in parentheses. Up to 5 units can be linked with 6 zones each and 6 groups. Auto-status updates notify the control system of state changes.

<!-- UNRESOLVED: "Universal Discrete Functions" family name appears to be a database artifact; actual product is CR106 -->

## Transport
```yaml
protocols:
  - serial
  - tcp
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
- powerable     # PWR command
- queryable     # QRY, ZQY, GQY commands
- routable      # ZIA, GIA input selection
- levelable     # ZVL volume, ZBA balance, ZTB/ZTT tone, ITL/ZBT/ZST trim
```

## Actions
```yaml
# Core commands - no unit/zone prefix
- id: query
  label: Query All
  kind: action
  command: "(QRY)"
  params: []

- id: status_enable
  label: Status Enable
  kind: action
  command: "(STA {param})"
  params:
    - name: enabled
      type: enum
      values: ["1", "0"]
      description: "'1' = On, '0' = Off - enables automatic status messages on state change"

- id: power
  label: Power
  kind: action
  command: "(PWR {param})"
  params:
    - name: state
      type: enum
      values: ["1", "0"]
      description: "'1' = On, '0' = Off - all non-Power commands return FAILED_PRECONDITION when Off"

- id: display_brightness
  label: Display Brightness
  kind: action
  command: "(TDB {param})"
  params:
    - name: level
      type: enum
      values: ["1", "2", "3", "4"]
      description: "'1'=25%, '2'=50%, '3'=75%, '4'=100%"

- id: meter_lights
  label: Meter Lights
  kind: action
  command: "(TML {param})"
  params:
    - name: state
      type: enum
      values: ["1", "0"]
      description: "'1' = On, '0' = Off"

# Input commands - format: (CMD unit_id input_id [param])
- id: input_trim_level
  label: Input Trim Level
  kind: action
  command: "(ITL {unit_id} {input_id} {level})"
  params:
    - name: unit_id
      type: integer
      description: "Unit/Link ID, 1-5"
    - name: input_id
      type: integer
      description: "Input ID, 0-9 (0=None, 1=AUX1, 2=AUX2, 3=AUX3, 4=AUX4, 5=COAX1, 6=COAX2, 7=OPT1, 8=OPT2, 9=Bluetooth)"
    - name: level
      type: string
      description: "-10 to 10, step 0.5dB"

- id: bt_pair
  label: Bluetooth Pair
  kind: action
  command: "(IBT {unit_id} {input_id})"
  params:
    - name: unit_id
      type: integer
      description: "Unit/Link ID, 1-5"
    - name: input_id
      type: integer
      description: "Must be Bluetooth input (9)"

# Zone commands - format: (CMD unit_id zone_id [param])
- id: zone_query
  label: Zone Query
  kind: action
  command: "(ZQY {unit_id} {zone_id})"
  params:
    - name: unit_id
      type: integer
      description: "Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Zone ID, 1-6"

- id: zone_select
  label: Zone Select
  kind: action
  command: "(ZNS {unit_id} {zone_id})"
  params:
    - name: unit_id
      type: integer
      description: "Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Zone ID, 1-6 - sets display zone context"

- id: volume
  label: Zone Volume
  kind: action
  command: "(ZVL {unit_id} {zone_id} {param})"
  params:
    - name: unit_id
      type: integer
      description: "Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Zone ID, 1-6"
    - name: value
      type: string
      description: "'U'=Up 1%, 'D'=Down 1%, '0'-'100'=Set %"

- id: mute
  label: Zone Mute
  kind: action
  command: "(ZMT {unit_id} {zone_id} {param})"
  params:
    - name: unit_id
      type: integer
      description: "Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Zone ID, 1-6"
    - name: state
      type: enum
      values: ["1", "0"]
      description: "'1' = Mute, '0' = Unmute"

- id: zone_input_select
  label: Zone Input Selection
  kind: action
  command: "(ZIA {unit_id} {zone_id} {src_unit_id} {input_id})"
  params:
    - name: unit_id
      type: integer
      description: "Target Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Zone ID, 1-6"
    - name: src_unit_id
      type: integer
      description: "Source Unit ID for input"
    - name: input_id
      type: integer
      description: "Input ID, 0-9"

- id: balance
  label: Zone Balance
  kind: action
  command: "(ZBA {unit_id} {zone_id} {param})"
  params:
    - name: unit_id
      type: integer
      description: "Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Zone ID, 1-6"
    - name: value
      type: string
      description: "'L'=Left 1dB, 'R'=Right 1dB, '-50'-'50'=Set (neg=Left, pos=Right)"

- id: b_channel_trim
  label: B Channel Trim Level
  kind: action
  command: "(ZBT {unit_id} {zone_id} {level})"
  params:
    - name: unit_id
      type: integer
      description: "Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Zone ID, 1-6"
    - name: level
      type: string
      description: "-10 to 10, step 0.5dB"

- id: sub_trim
  label: Subwoofer Trim Level
  kind: action
  command: "(ZST {unit_id} {zone_id} {level})"
  params:
    - name: unit_id
      type: integer
      description: "Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Zone ID, 1-6"
    - name: level
      type: string
      description: "-10 to 10, step 0.5dB"

- id: tone_bass
  label: Tone Bass
  kind: action
  command: "(ZTB {unit_id} {zone_id} {param})"
  params:
    - name: unit_id
      type: integer
      description: "Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Zone ID, 1-6"
    - name: value
      type: string
      description: "'U'=Up 1dB, 'D'=Down 1dB, '-12'-'12'=Set"

- id: tone_treble
  label: Tone Treble
  kind: action
  command: "(ZTT {unit_id} {zone_id} {param})"
  params:
    - name: unit_id
      type: integer
      description: "Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Zone ID, 1-6"
    - name: value
      type: string
      description: "'U'=Up 1dB, 'D'=Down 1dB, '-12'-'12'=Set"

- id: equalizer
  label: Equalizer
  kind: action
  command: "(ZEQ {unit_id} {zone_id} {param})"
  params:
    - name: unit_id
      type: integer
      description: "Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Zone ID, 1-6"
    - name: preset
      type: enum
      values: ["0", "1", "2", "3", "4", "5", "6"]
      description: "'0'=Off, '1'=Music, '2'=Music II, '3'=Relaxed, '4'=Tilt, '5'=Action, '6'=Action+Movie"

- id: high_pass
  label: Zone High Pass
  kind: action
  command: "(ZHP {unit_id} {zone_id} {param})"
  params:
    - name: unit_id
      type: integer
      description: "Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Zone ID, 1-6"
    - name: value
      type: string
      description: "'0'=Disable, '1'=Enable, '40'-'120'=Set Hz"

- id: low_pass
  label: Zone Low Pass
  kind: action
  command: "(ZLP {unit_id} {zone_id} {param})"
  params:
    - name: unit_id
      type: integer
      description: "Unit/Link ID, 1-5"
    - name: zone_id
      type: integer
      description: "Zone ID, 1-6"
    - name: value
      type: string
      description: "'0'=Disable, '1'=Enable, '40'-'120'=Set Hz"

# Group commands - format: (CMD group_id [params])
- id: group_query
  label: Group Query
  kind: action
  command: "(GQY {group_id})"
  params:
    - name: group_id
      type: integer
      description: "Group ID, 1-6; omit to list all current group IDs"

- id: group_volume
  label: Group Volume
  kind: action
  command: "(GVL {group_id} {param})"
  params:
    - name: group_id
      type: integer
      description: "Group ID, 1-6"
    - name: value
      type: string
      description: "'U'=Up 1%, 'D'=Down 1%, '0'-'100'=Set %"

- id: group_mute
  label: Group Mute
  kind: action
  command: "(GMT {group_id} {param})"
  params:
    - name: group_id
      type: integer
      description: "Group ID, 1-6"
    - name: state
      type: enum
      values: ["1", "0"]
      description: "'1' = Mute, '0' = Unmute"

- id: group_input_select
  label: Group Input Selection
  kind: action
  command: "(GIA {group_id} {unit_id} {input_id})"
  params:
    - name: group_id
      type: integer
      description: "Group ID, 1-6"
    - name: unit_id
      type: integer
      description: "Source Unit ID"
    - name: input_id
      type: integer
      description: "Input ID, 0-9"

- id: group_create
  label: Create Group
  kind: action
  command: "(GMK {zones})"
  params:
    - name: zones
      type: string
      description: "Space-separated 'ij' pairs where i=Unit ID, j=Zone ID, e.g. '12 22 31 54'"

- id: group_delete
  label: Delete Group
  kind: action
  command: "(GRM {group_id})"
  params:
    - name: group_id
      type: integer
      description: "Group ID, 1-6"

- id: group_update_zones
  label: Update Group Zones
  kind: action
  command: "(GUZ {group_id} {zones})"
  params:
    - name: group_id
      type: integer
      description: "Group ID, 1-6"
    - name: zones
      type: string
      description: "Space-separated 'ij' pairs where i=Unit ID, j=Zone ID"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: ["1", "0"]
  description: "PWR query response - '1'=On, '0'=Off"

- id: status_enable_state
  type: enum
  values: ["1", "0"]
  description: "STA query response"

- id: display_brightness
  type: enum
  values: ["1", "2", "3", "4"]
  description: "TDB query response"

- id: meter_lights_state
  type: enum
  values: ["1", "0"]
  description: "TML query response"

- id: zone_volume
  type: integer
  description: "ZVL query response - 0-100%"

- id: zone_mute_state
  type: enum
  values: ["1", "0"]
  description: "ZMT query response"

- id: zone_balance
  type: integer
  description: "ZBA query response - -50 to 50"

- id: zone_equalizer
  type: enum
  values: ["0", "1", "2", "3", "4", "5", "6"]
  description: "ZEQ query response"

- id: zone_high_pass
  type: string
  description: "ZHP query - returns enable state + frequency, e.g. (ZHP 1 3 0 50)"

- id: zone_low_pass
  type: string
  description: "ZLP query - returns enable state + frequency, e.g. (ZLP 4 2 1 70)"

- id: error_response
  type: enum
  values: ["ERR 2", "ERR 3", "ERR 9", "ERR 12"]
  description: "ERR 2=Unknown, ERR 3=Invalid Argument, ERR 9=Failed Precondition, ERR 12=Unimplemented"
```

## Variables
```yaml
# UNRESOLVED: no settable continuous parameters distinct from the actions above
```

## Events
```yaml
- id: auto_status_update
  description: "When STA is enabled, the CR106 automatically transmits status messages when its state changes - allows control system to maintain current preamplifier state"
- id: boot_info
  description: "On AC connection, CR106 sends model number (CR106), serial number, and firmware version"
- id: command_echo
  description: "After processing a command, CR106 echoes the same command as acknowledgement; sends error message if invalid"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Note: PWR Off causes all non-Power commands to return FAILED_PRECONDITION error
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
- Packet format: ASCII `(CMD params)` with optional CR/LF suffix
- Parameters prefixed by space (0x20); no parameter = query current status
- Up to 5 linked units (Unit ID 1–5), 6 zones per unit, 6 groups
- RS-232 hardware: 3.5mm TRS cable — Tip=TXD, Ring=RXD, Sleeve=Ground
- Compatible with Crestron, AMX, Savant, Control4 control systems
- Disabled inputs/zones return FAILED_PRECONDITION
- Group Create (GMK) omits group_id — other group commands include it
- Source mentions TCP/IP port 57012 but section header says "RS232" — likely shared port for both transports

<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: "Universal Discrete Functions" family name may be a database artifact; actual product is CR106 -->
<!-- UNRESOLVED: max concurrent connection count over TCP/IP not stated -->

## Provenance

```yaml
source_domains:
  - mcintoshlabs.com
  - scribd.com
source_urls:
  - https://www.mcintoshlabs.com/-/media/Files/mcintoshlabs/DocumentMaster/us/CR106-External-Control.pdf
  - https://www.scribd.com/document/942837415/McIntosh-RS232ControlApplicationNote
retrieved_at: 2026-05-15T15:03:27.174Z
last_checked_at: 2026-06-02T22:09:39.092Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:09:39.092Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "\"Universal Discrete Functions\" family name appears to be a database artifact; actual product is CR106"
- "no settable continuous parameters distinct from the actions above"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures found in source"
- "firmware version compatibility range not stated"
- "\"Universal Discrete Functions\" family name may be a database artifact; actual product is CR106"
- "max concurrent connection count over TCP/IP not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
