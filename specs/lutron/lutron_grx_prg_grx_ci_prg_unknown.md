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
  - electricbargainstores.com
source_urls:
  - https://assets.lutron.com/a/documents/rs232protocolcommandset.040196d.pdf
  - https://assets.lutron.com/a/documents/grx-ci-prg.pdf
  - https://assets.lutron.com/a/documents/grx-prg.pdf
  - https://www.electricbargainstores.com/v/vspfiles/PDF_spec/Lutron/grafik-eye/GRX-PRG-install.pdf
  - https://assets.lutron.com/a/documents/040156a.pdf
retrieved_at: 2026-05-17T22:52:38.283Z
last_checked_at: 2026-06-02T04:56:25.964Z
generated_at: 2026-06-02T04:56:25.964Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "list any major gaps here"
  - "firmware version compatibility not stated in source."
  - "Telnet password default not stated (only login names)."
  - "maximum ethernet connection count not stated beyond \"2 connections\" implicit."
verification:
  verdict: verified
  checked_at: 2026-06-02T04:56:25.964Z
  matched_actions: 54
  action_count: 54
  confidence: medium
  summary: "All 54 spec actions (wire-literal convention) match verbatim command names in the source; transport baud/port/auth values confirmed; Feedbacks enumerate all source query/response forms with no extra source commands unrepresented. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Lutron GRX-PRG / GRX-CI-PRG Control Spec

## Summary
ASCII command-line protocol for monitoring and operating GRAFIK Eye 3000/4000 and Integrale series lighting control units via the GRX-PRG (RS-232) and GRX-CI-PRG (RS-232 + Ethernet) interface accessory controls. Carries scene select, zone raise/lower, intensity preset read/write, timeclock, super-sequence, and full programming-mode commands.

<!-- UNRESOLVED: list any major gaps here -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: telnet
  # Default Connection 1 login: "nwk"; Connection 2 login: "nwk2"
  # Login names max 8 chars, no spaces; passwords also configurable
  # (see :sln / :rln commands).
```

## Traits
```yaml
- routable      # inferred: scene select (:A), zone routing on Control Units
- levelable     # inferred: zone raise (:B), lower (:D), set intensity (:szi)
- queryable     # inferred: many query commands (:G, :rzi, :rmu, :at?, :Q?, etc.)
```

## Actions
```yaml
# ============================================================
# Ethernet Setup Commands (network config - GRX-CI-NWK-E, GRX-CI-PRG)
# ============================================================
- id: set_ip
  label: Set IP Address
  kind: action
  command: ":sip{ip}"
  params:
    - name: ip
      type: string
      description: IPv4 address xxx.xxx.xxx.xxx; each octet 0-255
- id: read_ip
  label: Read IP Address
  kind: query
  command: ":rip"
  params: []
- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  command: ":ssm{mask}"
  params:
    - name: mask
      type: string
      description: Subnet mask xxx.xxx.xxx.xxx
- id: read_subnet_mask
  label: Read Subnet Mask
  kind: query
  command: ":rsm"
  params: []
- id: set_gateway
  label: Set Gateway
  kind: action
  command: ":sgw{gateway}"
  params:
    - name: gateway
      type: string
      description: Gateway IP xxx.xxx.xxx.xxx
- id: read_gateway
  label: Read Gateway
  kind: query
  command: ":rgw"
  params: []
- id: set_login_name
  label: Set Login Name
  kind: action
  command: ":sln{conn} {existing} {new}"
  params:
    - name: conn
      type: integer
      description: Connection number 1 or 2
    - name: existing
      type: string
      description: Current login name (max 8 chars, no spaces)
    - name: new
      type: string
      description: New login name (max 8 chars, no spaces)
- id: read_login_name
  label: Read Login Name
  kind: query
  command: ":rln{conn}"
  params:
    - name: conn
      type: integer
      description: Connection number 1 or 2
- id: device_reset
  label: Device Reset
  kind: action
  command: ":rst"
  params: []

# ============================================================
# RS232 and Ethernet Commands (shared)
# ============================================================
- id: code_rev_level
  label: Code Revision Level
  kind: query
  command: ":V"
  params: []
- id: select_scene
  label: Select Scene
  kind: action
  command: ":A{scene}{control_units}"
  params:
    - name: scene
      type: string
      description: Scene char 0 (OFF) to G (16); 1-9 = scenes 1-9, A-G = scenes 10-16
    - name: control_units
      type: string
      description: Control Unit addresses 1-8 (multiple ok, e.g. "78")
- id: scene_lock
  label: Scene Lock
  kind: action
  command: ":SL{sign}{control_units}"
  params:
    - name: sign
      type: string
      description: "+" add to scene lock, "-" remove; omit to release all
    - name: control_units
      type: string
      description: Control Unit addresses 1-8
- id: request_scene_status
  label: Request Scene Status
  kind: query
  command: ":G"
  params: []
- id: sequence
  label: Sequence
  kind: action
  command: ":SQ{sign}{control_units}"
  params:
    - name: sign
      type: string
      description: "+" add to sequencing, "-" remove; omit to release all
    - name: control_units
      type: string
      description: Control Unit addresses 1-8
- id: zone_lock
  label: Zone Lock
  kind: action
  command: ":ZL{sign}{control_units}"
  params:
    - name: sign
      type: string
      description: "+" add to zone lock, "-" remove; omit to release all
    - name: control_units
      type: string
      description: Control Unit addresses 1-8
- id: zone_lower
  label: Zone Lower
  kind: action
  command: ":D{control_unit}{zones}"
  params:
    - name: control_unit
      type: string
      description: Control Unit address 1-8
    - name: zones
      type: string
      description: Zone numbers 1-8 to ramp down (optional, omit = all zones)
- id: zone_lower_stop
  label: Zone Lower Stop
  kind: action
  command: ":E"
  params: []
- id: zone_raise
  label: Zone Raise
  kind: action
  command: ":B{control_unit}{zones}"
  params:
    - name: control_unit
      type: string
      description: Control Unit address 1-8
    - name: zones
      type: string
      description: Zone numbers 1-8 to ramp up (optional, omit = all zones)
- id: zone_raise_stop
  label: Zone Raise Stop
  kind: action
  command: ":C"
  params: []
- id: set_zone_intensities
  label: Set Control Unit Zone Intensities
  kind: action
  command: ":szi {control_unit} {ft} {int1} {int2} {int3} {int4} {int5} {int6} {int7} {int8}"
  params:
    - name: control_unit
      type: string
      description: Control Unit address 1-8
    - name: ft
      type: string
      description: Fade time 0h-3Bh seconds (0-59) or 3Ch-78h minutes (1-60)
    - name: int1
      type: string
      description: Zone 1 intensity 0h-7Fh; "*" = unchanged; "0" = OFF (non-dim); 1-7F = ON (non-dim); 0=STOP/1=OPEN/2=CLOSE/3-5=presets (shade)
    - name: int2
      type: string
      description: Zone 2 intensity (same encoding as int1)
    - name: int3
      type: string
      description: Zone 3 intensity (same encoding as int1)
    - name: int4
      type: string
      description: Zone 4 intensity (same encoding as int1)
    - name: int5
      type: string
      description: Zone 5 intensity (same encoding as int1)
    - name: int6
      type: string
      description: Zone 6 intensity (same encoding as int1)
    - name: int7
      type: string
      description: Zone 7 intensity (same encoding as int1)
    - name: int8
      type: string
      description: Zone 8 intensity (same encoding as int1)
- id: read_zone_intensities
  label: Read Control Unit Zone Intensities
  kind: query
  command: ":rzi {control_unit}"
  params:
    - name: control_unit
      type: string
      description: Control Unit address 1-8

# ============================================================
# PRG Commands (GRX-PRG, GRX-CI-PRG only)
# ============================================================
- id: set_time
  label: Set Time
  kind: action
  command: ":ST {hr} {min} {mth} {day} {yr} {dayofweek}"
  params:
    - name: hr
      type: integer
      description: Hour 0-23
    - name: min
      type: integer
      description: Minute 0-59
    - name: mth
      type: integer
      description: Month 1-12
    - name: day
      type: integer
      description: Day 1-31
    - name: yr
      type: integer
      description: Year (>=50 = 1900s, <50 = 2000s)
    - name: dayofweek
      type: integer
      description: Day of week 1-7 (1=Sunday)
- id: report_time
  label: Report Time
  kind: query
  command: ":RT"
  params: []
- id: select_schedule
  label: Select Schedule
  kind: action
  command: ":SS{schedule}"
  params:
    - name: schedule
      type: integer
      description: 0=suspend, 1=weekday, 2=weekend
- id: report_schedule
  label: Report Schedule
  kind: query
  command: ":RS"
  params: []
- id: report_sunrise_sunset
  label: Report Sunrise/Sunset
  kind: query
  command: ":RA"
  params: []
- id: super_sequence_start
  label: Super Sequence Start
  kind: action
  command: ":QS"
  params: []
- id: super_sequence_pause
  label: Super Sequence Pause
  kind: action
  command: ":QP"
  params: []
- id: super_sequence_resume
  label: Super Sequence Resume
  kind: action
  command: ":QC"
  params: []
- id: report_super_sequence_status
  label: Report Super Sequence Status
  kind: query
  command: ":Q?"
  params: []
- id: set_timeclock_status
  label: Set Timeclock Status
  kind: action
  command: ":ate {bitmap}"
  params:
    - name: bitmap
      type: string
      description: Hex bitmap; bit 0 = Unit 1, bit 7 = Unit 8 (1=enable timeclock)
- id: report_timeclock_status
  label: Report Timeclock Status
  kind: query
  command: ":at?"
  params: []

# ============================================================
# Programming Mode: Control Unit Commands
# (require :spm programming mode active on GRX-PRG/GRX-CI-PRG)
# ============================================================
- id: start_programming_mode
  label: Start Programming Mode
  kind: action
  command: ":spm"
  params: []
- id: end_programming_mode
  label: End Programming Mode
  kind: action
  command: ":epm"
  params: []
- id: read_control_unit_info
  label: Read Control Unit Info
  kind: query
  command: ":rmu {control_unit}"
  params:
    - name: control_unit
      type: string
      description: Control Unit address 1-8
- id: read_load_types
  label: Read Load Types
  kind: query
  command: ":rlt {control_unit}"
  params:
    - name: control_unit
      type: string
      description: Control Unit address 1-8
- id: read_low_ends
  label: Read Low Ends
  kind: query
  command: ":rle {control_unit}"
  params:
    - name: control_unit
      type: string
      description: Control Unit address 1-8
- id: read_high_ends
  label: Read High Ends
  kind: query
  command: ":rhe {control_unit}"
  params:
    - name: control_unit
      type: string
      description: Control Unit address 1-8
- id: read_preset_scene
  label: Read Preset Scene
  kind: query
  command: ":rps {control_unit} {scene}"
  params:
    - name: control_unit
      type: string
      description: Control Unit address 1-8
    - name: scene
      type: string
      description: Scene 0h (Off) to 10h (Scene 16)
- id: stop_communication_link
  label: Stop Communication Link
  kind: action
  command: ":scl"
  params: []
- id: restart_communication_link
  label: Restart Communication Link
  kind: action
  command: ":rcl"
  params: []
- id: program_who_i_talk_to
  label: Program Who I Talk To
  kind: action
  command: ":ptt {control_unit} {bitmap}"
  params:
    - name: control_unit
      type: string
      description: Control Unit to program 1-8
    - name: bitmap
      type: string
      description: Hex bitmap of which Control Units to talk to (bit 0 = Unit 1)
- id: program_load_types
  label: Program Load Types
  kind: action
  command: ":plt {control_unit} {lt1} {lt2} {lt3} {lt4} {lt5} {lt6} {lt7} {lt8}"
  params:
    - name: control_unit
      type: string
      description: Control Unit to program 1-8
    - name: lt1
      type: string
      description: Zone 1 load type (1=Incandescent/MLV, 2=FDB, 3=Neon, 4=Non-dim last, 5=Non-dim first, 6=Tu-Wire, 7=ELV, 8=Auto, 9=0-10, 10=DSI, 11=DALI, 12=PWM, 16=AC Shade, 17=Sivoia QED Shade); "*" = unchanged
    - name: lt2
      type: string
      description: Zone 2 load type
    - name: lt3
      type: string
      description: Zone 3 load type
    - name: lt4
      type: string
      description: Zone 4 load type
    - name: lt5
      type: string
      description: Zone 5 load type
    - name: lt6
      type: string
      description: Zone 6 load type
    - name: lt7
      type: string
      description: Zone 7 load type
    - name: lt8
      type: string
      description: Zone 8 load type
- id: program_low_ends
  label: Program Low Ends
  kind: action
  command: ":ple {control_unit} {le1} {le2} {le3} {le4} {le5} {le6} {le7} {le8}"
  params:
    - name: control_unit
      type: string
      description: Control Unit to program 1-8
    - name: le1
      type: string
      description: Zone 1 low-end hex (7Fh=Non-dim); "*" = unchanged
    - name: le2
      type: string
      description: Zone 2 low-end hex
    - name: le3
      type: string
      description: Zone 3 low-end hex
    - name: le4
      type: string
      description: Zone 4 low-end hex
    - name: le5
      type: string
      description: Zone 5 low-end hex
    - name: le6
      type: string
      description: Zone 6 low-end hex
    - name: le7
      type: string
      description: Zone 7 low-end hex
    - name: le8
      type: string
      description: Zone 8 low-end hex
- id: program_high_ends
  label: Program High Ends
  kind: action
  command: ":phe {control_unit} {he1} {he2} {he3} {he4} {he5} {he6} {he7} {he8}"
  params:
    - name: control_unit
      type: string
      description: Control Unit to program 1-8
    - name: he1
      type: string
      description: Zone 1 high-end hex (7Fh=Non-dim); "*" = unchanged
    - name: he2
      type: string
      description: Zone 2 high-end hex
    - name: he3
      type: string
      description: Zone 3 high-end hex
    - name: he4
      type: string
      description: Zone 4 high-end hex
    - name: he5
      type: string
      description: Zone 5 high-end hex
    - name: he6
      type: string
      description: Zone 6 high-end hex
    - name: he7
      type: string
      description: Zone 7 high-end hex
    - name: he8
      type: string
      description: Zone 8 high-end hex
- id: program_preset_scene
  label: Program Preset Scene
  kind: action
  command: ":pps {control_unit} {scene} {ft} {int1} {int2} {int3} {int4} {int5} {int6} {int7} {int8}"
  params:
    - name: control_unit
      type: string
      description: Control Unit to program 1-8
    - name: scene
      type: string
      description: Scene 0h (Off) to 10h (Scene 16)
    - name: ft
      type: string
      description: Fade time 0h-3Bh seconds or 3Ch-78h minutes
    - name: int1
      type: string
      description: Zone 1 intensity 0h-7Fh (D0h=unaffected, *=don't change)
    - name: int2
      type: string
      description: Zone 2 intensity
    - name: int3
      type: string
      description: Zone 3 intensity
    - name: int4
      type: string
      description: Zone 4 intensity
    - name: int5
      type: string
      description: Zone 5 intensity
    - name: int6
      type: string
      description: Zone 6 intensity
    - name: int7
      type: string
      description: Zone 7 intensity
    - name: int8
      type: string
      description: Zone 8 intensity
- id: program_temporary_mode
  label: Program Temporary Mode
  kind: action
  command: ":ptm {control_unit} {tempmode}"
  params:
    - name: control_unit
      type: string
      description: Control Unit to program 1-8
    - name: tempmode
      type: string
      description: 0=Sd (save by default), 1=Sb (save by button), 2=Sn (save never), 3=4S (scene/master only), 4=bd (buttons disabled)

# ============================================================
# Programming Mode: Accessory Control Commands
# ============================================================
- id: read_accessory_control_info
  label: Read Accessory Control Info
  kind: query
  command: ":rru {acc_control}"
  params:
    - name: acc_control
      type: string
      description: Accessory Control address 1h-Fh (1-15)
- id: read_accessory_control_specific_data
  label: Read Accessory Control Specific Data
  kind: query
  command: ":rrs {acc_control} {packet}"
  params:
    - name: acc_control
      type: string
      description: Accessory Control address 1h-Fh (1-15)
    - name: packet
      type: string
      description: Packet/bank number; format depends on accessory type
- id: program_accessory_control
  label: Program Accessory Control
  kind: action
  command: ":pru {acc_control} {type} {specific_data}"
  params:
    - name: acc_control
      type: string
      description: Accessory Control address 1h-Fh (1-15)
    - name: type
      type: string
      description: Accessory type code (0=4S, 1=4Q, 2=4PS, 3=4M, 5=CIR, 7=4S IR, 8=FINETUNE, 9=2B Scene, A=2B Panic, B=2B Part, C=2B 4Q, D=2B 1S, F=DACPI, 20=A/V 4S Maint, 21=A/V 4Q, 22=A/V 4PS, 24=A/V OCC, 25=A/V 4S Mom, 42=Shade 3W/3WRL, 43=Shade 2W, 60=CCO Scene, 61=Shade 3WD, 70=Group Ctrl, 71=CCO Zone, 72=Sivoia QED IF, 80=Preset Shade 5WRL)
    - name: specific_data
      type: string
      description: Type-specific data fields per pru table in source
- id: program_accessory_control_specific_data
  label: Program Accessory Control Specific Data
  kind: action
  command: ":prs {acc_control} {packet} {type} {specific_data}"
  params:
    - name: acc_control
      type: string
      description: Accessory Control address 1h-Fh (1-15)
    - name: packet
      type: string
      description: Packet/bank (1-4 for DACPI, 0=top/1=bottom for 3WD)
    - name: type
      type: string
      description: Type code (61 for 3WD)
    - name: specific_data
      type: string
      description: Type-specific data fields

# ============================================================
# Non-Programming Mode: LED Control
# ============================================================
- id: set_remote_leds
  label: Set Remote LEDs
  kind: action
  command: ":srl {acc_control} {bitmap}"
  params:
    - name: acc_control
      type: string
      description: Accessory Control address 1h-Fh (1-15)
    - name: bitmap
      type: string
      description: Hex bitmap 0h-7Fh (lsb=LED 1); FFh = revert to normal LED function

# ============================================================
# DACPI Accessory Control Commands
# ============================================================
- id: dacpi_on
  label: DACPI On
  kind: action
  command: ":P+{acc_control}"
  params:
    - name: acc_control
      type: string
      description: DACPI Accessory Control address 1h-Fh (1-15)
- id: dacpi_off
  label: DACPI Off
  kind: action
  command: ":P-{acc_control}"
  params:
    - name: acc_control
      type: string
      description: DACPI Accessory Control address 1h-Fh (1-15)
```

## Feedbacks
```yaml
- id: code_revision
  type: string
  description: Software revision, model
  source: ":V response ~:v high_rev low_rev model"
- id: scene_status
  type: object
  description: Scene currently selected on each Control Unit (1-8) on the link
  source: ":G response ~:ss [S1][S2][S3][S4][S5][S6][S7][S8]; M = unit missing"
- id: zone_intensities
  type: object
  description: Eight hex intensities per Control Unit; 0h-7Fh (0h=OFF, 7Fh=max); shade zones use 5Eh/15h-73h (moving) or 5Eh-63h (stopped)
  source: ":rzi response ~:zi [unit] [int1] [int2] [int3] [int4] [int5] [int6] [int7] [int8]"
- id: control_unit_info
  type: object
  description: Main unit, type (35/45), zones, code rev, units_inv bitmap, temp_mode, pll, 4q bitmap, ir_addr
  source: ":rmu response ~:mu [main_unit] [type] [zones] [code_rev] [units_inv] [temp_mode] [pll] [4q] [ir_addr]"
- id: load_types
  type: object
  description: Per-zone load type code (1-17)
  source: ":rlt response ~:lt [main_unit] [lt1] [lt2] [lt3] [lt4] [lt5] [lt6] [lt7] [lt8]"
- id: low_ends
  type: object
  description: Per-zone low-end hex values (7Fh=Non-dim)
  source: ":rle response ~:le [main_unit] [le1] ... [le8]"
- id: high_ends
  type: object
  description: Per-zone high-end hex values (7Fh=Non-dim)
  source: ":rhe response ~:rhe [main_unit] [he1] ... [he8]"
- id: preset_scene
  type: object
  description: Per-zone preset intensity and fade time for a scene
  source: ":rps response ~:ps [unit] [scene] [ft] [int1] ... [int8]; D0h = unaffected"
- id: time_status
  type: object
  description: hr, min, month, day, year, dayofweek
  source: ":RT response ~:rt [hr] [min] [month] [day] [yr] [dayofweek]"
- id: schedule_status
  type: enum
  values: [0, 1, 2]
  description: 0=suspend, 1=weekday, 2=weekend
  source: ":RS response :rs [schedule]"
- id: sunrise_sunset
  type: object
  description: rise_hr, rise_min, set_hr, set_min
  source: ":RA response ~:ra [rise_hr] [rise_min] [set_hr] [set_min]"
- id: super_sequence_status
  type: object
  description: status (R=running, S=stopped), next step, min until next, sec until next
  source: ":Q? response :s? [status] [next] [min] [sec]"
- id: timeclock_status
  type: string
  description: Hex bitmap of which Control Units have timeclock enabled (bit 0=Unit 1)
  source: ":at? response ~:at [bitmap]"
- id: accessory_control_info
  type: object
  description: Acc Control address, type, code rev, and type-specific data
  source: ":rru response ~:ru [acc] [type] [code_rev] [data...]"
- id: ip_address
  type: string
  description: IPv4 address of the device
  source: ":rip response ~:ip xxx.xxx.xxx.xxx"
- id: subnet_mask
  type: string
  description: Subnet mask
  source: ":rsm response ~:sm xxx.xxx.xxx.xxx"
- id: gateway
  type: string
  description: Gateway IP
  source: ":rgw response ~:gw xxx.xxx.xxx.xxx"
- id: login_name
  type: string
  description: Login name for specified connection
  source: ":rln response ~:ln [conn] [login]"
- id: raw_button_feedback
  type: string
  description: Capital letter = button push; lowercase = release. [address][button data] per raw feedback table.
  source: "DIP switch 6 ON of RS232 Interface; reported unsolicited on link"
```

## Variables
```yaml
- id: fade_time
  type: string
  description: Fade time 0h-3Bh seconds (0-59) or 3Ch-78h minutes (1-60). Used in szi, pps, rps commands.
- id: intensity
  type: string
  description: Hex 0h-7Fh (0=OFF, 7Fh=max). D0h = unaffected in presets. 0h/1h for non-dim (0=relay open/OFF, 1-7F=relay closed/ON).
- id: scene_number
  type: string
  description: Single char 0 (OFF), 1-9 (scenes 1-9), A-G (scenes 10-16).
- id: control_unit_address
  type: string
  description: 1-8; single char in scene select; full number in read/write commands.
- id: accessory_control_address
  type: string
  description: Single char 1-G (addresses 1-16; addr 16 reserved for GRX-PRG/GRX-CI-PRG).
- id: timeclock_bitmap
  type: string
  description: Hex bitmap bit 0=Unit 1, bit 7=Unit 8 (1=enable timeclock).
- id: temporary_mode
  type: string
  description: 0=Sd, 1=Sb, 2=Sn, 3=4S, 4=bd
```

## Events
```yaml
- id: raw_button_push
  description: |
    When DIP switch 6 of any RS232 Interface is ON, the device reports button
    pushes/releases on Control Units and Accessory Controls unsolicited.
    Format: [address][button_data] (capital = push, lowercase = release).
    Control Unit addresses: A/a-H/h (1-8). Accessory Control addresses:
    I/i-X/x (1-16). For scene selection, button_data = scene char (0-G, 17=master raise,
    18=master lower on Control Units). For Special Functions (4Q/A/V/I/O),
    values are summed: Seq=1, Zone Lock=2, Scene Lock=4, Fade Override=8, Panic=16.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# No safety warnings or interlock procedures stated in source.
```

## Notes
- All commands are ASCII strings terminated with `<CR>` (0x0D); command string max 30 chars.
- All responses begin with `~` (0x7E) and end with `<CR><lf>` (0x0D 0x0A). Form: `~N OK` (no error) or `~ERROR #X N OK` (with N=number of executed commands).
- A leading `:` clears the input buffer and prefixes the command.
- Scene-locks set from RS232/Ethernet can only be cleared by the same interface.
- Programming-mode commands (:rmu, :rlt, :rle, :rhe, :rps, :ptt, :plt, :ple, :phe, :pps, :ptm, :rru, :rrs, :pru, :prs) require the GRX-PRG or GRX-CI-PRG to be in programming mode (`:spm`). Programming mode auto-ends after 10 minutes of inactivity or via `:epm`.
- Timeclock and Super Sequence commands require GRAFIK Eye 3100, 3500, 4100, 4500, or Integrale 3100/3500 series. Other PRG commands require 3500, 4500, or Integrale 3500 series.
- Network settings (`:sip`, `:ssm`, `:sgw`, `:sln`) take effect only after a `:rst` or power cycle. The Ethernet connection can be set up over RS232 on GRX-CI-PRG only.
- Systems with a GRX-PRG/GRX-CI-PRG are limited to 15 Accessory Control addresses (1-15); address 16 is reserved for the PRG unit itself.
- Telnet sessions support two simultaneous connections; default logins are `nwk` (conn 1) and `nwk2` (conn 2). Login names max 8 chars, no spaces.
- Zone raise/lower (`:B`, `:D`) and stops (`:C`, `:E`) do not affect shade zones.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: Telnet password default not stated (only login names). -->
<!-- UNRESOLVED: maximum ethernet connection count not stated beyond "2 connections" implicit. -->

## Provenance

```yaml
source_domains:
  - assets.lutron.com
  - electricbargainstores.com
source_urls:
  - https://assets.lutron.com/a/documents/rs232protocolcommandset.040196d.pdf
  - https://assets.lutron.com/a/documents/grx-ci-prg.pdf
  - https://assets.lutron.com/a/documents/grx-prg.pdf
  - https://www.electricbargainstores.com/v/vspfiles/PDF_spec/Lutron/grafik-eye/GRX-PRG-install.pdf
  - https://assets.lutron.com/a/documents/040156a.pdf
retrieved_at: 2026-05-17T22:52:38.283Z
last_checked_at: 2026-06-02T04:56:25.964Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T04:56:25.964Z
matched_actions: 54
action_count: 54
confidence: medium
summary: "All 54 spec actions (wire-literal convention) match verbatim command names in the source; transport baud/port/auth values confirmed; Feedbacks enumerate all source query/response forms with no extra source commands unrepresented. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "list any major gaps here"
- "firmware version compatibility not stated in source."
- "Telnet password default not stated (only login names)."
- "maximum ethernet connection count not stated beyond \"2 connections\" implicit."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
