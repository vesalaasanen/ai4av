---
spec_id: admin/lutron-grx-prg-grx-ci-prg
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lutron GRX-PRG / GRX-CI-PRG Control Spec"
manufacturer: Lutron
model_family: GRX-PRG
aliases: []
compatible_with:
  manufacturers:
    - Lutron
  models:
    - GRX-PRG
    - GRX-CI-PRG
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.lutron.com
  - lutron.com
  - github.com
source_urls:
  - https://assets.lutron.com/a/documents/040249.pdf
  - "https://www.lutron.com/TechnicalDocumentLibrary/HWI%20RS232%20Protocol.pdf"
  - https://assets.lutron.com/a/documents/rs232protocolcommandset.040196d.pdf
  - https://github.com/alxgmpr/lutron-protocols/blob/main/docs/protocols/leap.md
  - "https://assets.lutron.com/a/documents/hwqs%20rs-232%20ethernet%20integration.pdf"
retrieved_at: 2026-05-22T16:52:23.071Z
last_checked_at: 2026-05-18T16:36:40.339Z
generated_at: 2026-05-18T16:36:40.339Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - srl
  - P+
  - P-
  - prs
verification:
  verdict: verified
  checked_at: 2026-05-18T16:36:40.339Z
  matched_actions: 32
  action_count: 32
  confidence: medium
  summary: "All 32 spec actions matched verbatim in source with correct shapes and transport; 4 source commands are unrepresented but fall within the 5-command threshold."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-18
---

# Lutron GRX-PRG / GRX-CI-PRG Control Spec

## Summary
Lutron GRAFIK Eye RS-232 and Ethernet integration protocol for GRX-PRG and GRX-CI-PRG interface accessories. Supports scene selection, zone intensity control, timeclock programming, accessory control programming, and network configuration via Telnet or serial. Control Units 1–8, each with up to 8 zones. Scenes 0 (OFF) to G (16). Intensity range 0h–7Fh (0%–99%).

<!-- UNRESOLVED: firmware compatibility ranges not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 23  # inferred: default Telnet port stated in source
auth:
  type: login  # stated: default login 'nwk' (conn 1) and 'nwk2' (conn 2) in source
  credentials:
    - connection: 1
      username: nwk
    - connection: 2
      username: nwk2
```

## Traits
```yaml
- powerable    # scene OFF command present
- routable     # zone intensity and routing commands present
- queryable    # zone intensity, scene status, time read commands present
- levelable    # zone raise/lower and intensity commands present
```

## Actions
```yaml
- id: select_scene
  label: Select Scene
  kind: action
  params:
    - name: scene
      type: string
      description: Scene 0 (OFF), 1-9, A-G (10-16)
    - name: control_units
      type: string
      description: "1-8 (addresses of Control Units)"
  syntax: ":A[scene][control_units]<CR>"

- id: scene_lock
  label: Scene Lock
  kind: action
  params:
    - name: mode
      type: enum
      values: [add, remove]
    - name: control_units
      type: string
      description: "1-8"
  syntax: ":SL[+ or -][control_units]<CR>"

- id: sequence
  label: Sequence
  kind: action
  params:
    - name: mode
      type: enum
      values: [add, remove]
    - name: control_units
      type: string
      description: "1-8"
  syntax: ":SQ[+ or -][control_units]<CR>"

- id: zone_lock
  label: Zone Lock
  kind: action
  params:
    - name: mode
      type: enum
      values: [add, remove]
    - name: control_units
      type: string
      description: "1-8"
  syntax: ":ZL[+ or -][control_units]<CR>"

- id: zone_lower
  label: Zone Lower
  kind: action
  params:
    - name: control_unit
      type: integer
      description: "1-8 (Control Unit address)"
    - name: zones
      type: string
      description: "0-8 (0 = all zones)"
  syntax: ":D[control_unit][zones]<CR>"

- id: zone_raise
  label: Zone Raise
  kind: action
  params:
    - name: control_unit
      type: integer
      description: "1-8 (Control Unit address)"
    - name: zones
      type: string
      description: "0-8 (0 = all zones)"
  syntax: ":B[control_unit][zones]<CR>"

- id: zone_lower_stop
  label: Zone Lower Stop
  kind: action
  params: []
  syntax: ":E<CR>"

- id: zone_raise_stop
  label: Zone Raise Stop
  kind: action
  params: []
  syntax: ":C<CR>"

- id: set_zone_intensities
  label: Set Zone Intensities
  kind: action
  params:
    - name: control_unit
      type: integer
      description: "1-8"
    - name: fade_time
      type: integer
      description: "0h-3Bh = seconds (0-59), 3Ch-78h = minutes (1-60)"
    - name: intensities
      type: array
      description: "Up to 8 intensity values 0h-7Fh, or * to leave unchanged"
  syntax: ":szi [control_unit] [ft] [int1]...[int8]<CR>"

- id: set_time
  label: Set Time
  kind: action
  params:
    - name: hour
      type: integer
      description: "0-23"
    - name: minute
      type: integer
      description: "0-59"
    - name: month
      type: integer
      description: "1-12"
    - name: day
      type: integer
      description: "1-31"
    - name: year
      type: integer
      description: ">50 = 1900s, <50 = 2000s"
    - name: day_of_week
      type: integer
      description: "1-7 (1=Sunday)"
  syntax: ":ST [hr] [min] [mth] [day] [yr] [dayofweek]<CR>"

- id: select_schedule
  label: Select Schedule
  kind: action
  params:
    - name: schedule
      type: integer
      description: "0=suspend, 1=weekday, 2=weekend"
  syntax: ":SS [schedule]<CR>"

- id: super_sequence_start
  label: Super Sequence Start
  kind: action
  params: []
  syntax: ":QS<CR>"

- id: super_sequence_pause
  label: Super Sequence Pause
  kind: action
  params: []
  syntax: ":QP<CR>"

- id: super_sequence_resume
  label: Super Sequence Resume
  kind: action
  params: []
  syntax: ":QC<CR>"

- id: set_timeclock_status
  label: Set Timeclock Status
  kind: action
  params:
    - name: bitmap
      type: string
      description: "hex bitmap, bit 0=Unit 1, bit 7=Unit 8"
  syntax: ":ate [bitmap]<CR>"

- id: start_programming_mode
  label: Start Programming Mode
  kind: action
  params: []
  syntax: ":spm<CR>"

- id: end_programming_mode
  label: End Programming Mode
  kind: action
  params: []
  syntax: ":epm<CR>"

- id: program_who_i_talk_to
  label: Program Who I Talk To
  kind: action
  params:
    - name: control_unit
      type: integer
      description: "1-8"
    - name: bitmap
      type: string
      description: "hex bitmap of Control Units to talk to"
  syntax: ":ptt [control_unit] [bitmap]<CR>"

- id: program_load_types
  label: Program Load Types
  kind: action
  params:
    - name: control_unit
      type: integer
      description: "1-8"
    - name: load_types
      type: array
      description: "Up to 8 load type values 1-17, or *"
  syntax: ":plt [control_unit] [lt1]...[lt8]<CR>"

- id: program_low_ends
  label: Program Low Ends
  kind: action
  params:
    - name: control_unit
      type: integer
      description: "1-8"
    - name: low_ends
      type: array
      description: "Up to 8 hex values, or *"
  syntax: ":ple [control_unit] [le1]...[le8]<CR>"

- id: program_high_ends
  label: Program High Ends
  kind: action
  params:
    - name: control_unit
      type: integer
      description: "1-8"
    - name: high_ends
      type: array
      description: "Up to 8 hex values, or *"
  syntax: ":phe [control_unit] [he1]...[he8]<CR>"

- id: program_preset_scene
  label: Program Preset Scene
  kind: action
  params:
    - name: control_unit
      type: integer
      description: "1-8"
    - name: scene
      type: integer
      description: "0h-10h (0=OFF to 16)"
    - name: fade_time
      type: integer
      description: "0h-3Bh=seconds, 3Ch-78h=minutes"
    - name: intensities
      type: array
      description: "Up to 8 intensity values, * to not change"
  syntax: ":pps [control_unit] [scene] [ft] [int1]...[int8]<CR>"

- id: program_temporary_mode
  label: Program Temporary Mode
  kind: action
  params:
    - name: control_unit
      type: integer
      description: "1-8"
    - name: temp_mode
      type: integer
      description: "0=Sd, 1=Sb, 2=Sn, 3=4S, 4=bd"
  syntax: ":ptm [control_unit] [tempmode]<CR>"

- id: program_accessory_control
  label: Program Accessory Control
  kind: action
  params:
    - name: acc_control
      type: string
      description: "1h-Fh (1-15)"
    - name: type
      type: string
      description: "hex type code"
    - name: data
      type: string
      description: "type-specific data"
  syntax: ":pru [acc_control] [type] [specific_data]<CR>"

- id: device_reset
  label: Device Reset
  kind: action
  params: []
  syntax: ":rst<CR>"

- id: stop_comm_link
  label: Stop Comm Link
  kind: action
  params: []
  syntax: ":scl<CR>"

- id: restart_comm_link
  label: Restart Comm Link
  kind: action
  params: []
  syntax: ":rcl<CR>"

- id: set_ip_address
  label: Set IP Address
  kind: action
  params:
    - name: ip_address
      type: string
      description: "xxx.xxx.xxx.xxx"
  syntax: ":sip[xxx.xxx.xxx.xxx]<CR>"

- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  params:
    - name: subnet
      type: string
      description: "xxx.xxx.xxx.xxx"
  syntax: ":ssm [subnet]<CR>"

- id: set_gateway
  label: Set Gateway
  kind: action
  params:
    - name: gateway
      type: string
      description: "xxx.xxx.xxx.xxx"
  syntax: ":sgw [gateway]<CR>"

- id: set_login_name
  label: Set Login Name
  kind: action
  params:
    - name: connection
      type: integer
      description: "1 or 2"
    - name: existing_login
      type: string
    - name: new_login
      type: string
  syntax: ":sln [connection #] [existinglogin] [new login]<CR>"

- id: code_revision
  label: Code Revision
  kind: action
  params: []
  syntax: ":V<CR>"
```

## Feedbacks
```yaml
- id: command_response
  type: enum
  values: [OK, ERROR]
  description: "~N OK or ~ERROR #X N"

- id: scene_status
  type: string
  description: "~:ss [S1][S2]...[S8] scene status per Control Unit"

- id: zone_intensities
  type: string
  description: "~:zi [control_unit] [int1]...[int8]"

- id: current_time
  type: string
  description: "~:rt [hr] [min] [mth] [day] [yr] [dayofweek]"

- id: current_schedule
  type: integer
  values: [0, 1, 2]
  description: "0=suspend, 1=weekday, 2=weekend"

- id: sunrise_sunset
  type: string
  description: "~:ra [rise_hr] [rise_min] [set_hr] [set_min]"

- id: super_sequence_status
  type: string
  description: "~:s? [status] [next] [min] [sec] - R=running, S=stopped"

- id: timeclock_status
  type: string
  description: "~:at [bitmap]"

- id: control_unit_info
  type: string
  description: "~:mu [main_unit] [type] [zones] [code_rev] [units_inv] [temp_mode] [pll] [4q] [ir_addr]"

- id: load_types
  type: string
  description: "~:lt [main_unit] [lt1]...[lt8]"

- id: low_ends
  type: string
  description: "~:le [main_unit] [le1]...[le8]"

- id: high_ends
  type: string
  description: "~:he [main_unit] [he1]...[he8]"

- id: preset_scene
  type: string
  description: "~:ps [control_unit] [scene] [ft] [int1]...[int8]"

- id: accessory_control_info
  type: string
  description: "~:ru [acc_control] [type] [code_rev] [other...]"

- id: accessory_control_specific_data
  type: string
  description: "~:rs [acc_control] [packet] [data...]"

- id: ip_address
  type: string
  description: "~:ip[xxx.xxx.xxx.xxx]"

- id: subnet_mask
  type: string
  description: "~:sm [subnet]"

- id: gateway_address
  type: string
  description: "~:gw [gateway]"

- id: login_name
  type: string
  description: "~:ln [connection] [login]"

- id: code_revision_response
  type: string
  description: "~:v [high_rev] [low_rev] [model]"
```

## Variables
```yaml
# UNRESOLVED: continuous variables not explicitly documented as settable params
```

## Events
```yaml
# UNRESOLVED: unsolicited event notifications from device not documented
```

## Macros
```yaml
# Super Sequence: multi-step scene sequence programmed via GRAFIK Eye Liaison software
#   QS = start, QP = pause, QC = resume, Q? = status
#   Super sequence created and downloaded from GRAFIK Eye Liaison software
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Scene Lock set from RS232/Ethernet can only be cleared by same interface"
  - description: "Zone Lock set from RS232/Ethernet can only be cleared by same interface"
  - description: "Sequence set from RS232/Ethernet can only be cleared by same interface"
  - description: "Programming mode auto-exits after 10 minutes of no commands"
# UNRESOLVED: power-on sequencing, voltage/current specs not in source
```

## Notes
Command format: `:[command][parameters]<CR>` (colon prefix, carriage return executes). Response prefix `~` (0x7E). Response terminator `<CR><LF>` (0x0D 0x0A). Max command string length: 30 characters. Login default: `nwk` (connection 1), `nwk2` (connection 2). Ethernet default port 23 (Telnet). RS232: 9600/8/N/1. Scenes: 0=OOF, 1-9, A-G(10-16). Intensity: 0h-7Fh (0-99%). PRG commands require GRX-PRG or GRX-CI-PRG. Set Zone Intensities (szi) requires GRAFIK Eye 3500/4500 series, not GRX-RS232. Programming mode commands require spm first.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: unsolicited event notifications not documented in source -->
<!-- UNRESOLVED: continuous variables / parameters not documented as distinct from actions -->

## Provenance

```yaml
source_domains:
  - assets.lutron.com
  - lutron.com
  - github.com
source_urls:
  - https://assets.lutron.com/a/documents/040249.pdf
  - "https://www.lutron.com/TechnicalDocumentLibrary/HWI%20RS232%20Protocol.pdf"
  - https://assets.lutron.com/a/documents/rs232protocolcommandset.040196d.pdf
  - https://github.com/alxgmpr/lutron-protocols/blob/main/docs/protocols/leap.md
  - "https://assets.lutron.com/a/documents/hwqs%20rs-232%20ethernet%20integration.pdf"
retrieved_at: 2026-05-22T16:52:23.071Z
last_checked_at: 2026-05-18T16:36:40.339Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T16:36:40.339Z
matched_actions: 32
action_count: 32
confidence: medium
summary: "All 32 spec actions matched verbatim in source with correct shapes and transport; 4 source commands are unrepresented but fall within the 5-command threshold."
```

## Known Gaps

```yaml
- srl
- P+
- P-
- prs
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
