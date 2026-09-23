---
spec_id: admin/paradox-prt3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Paradox PRT3 Printer Module Control Spec"
manufacturer: Paradox
model_family: PRT3
aliases: []
compatible_with:
  manufacturers:
    - Paradox
  models:
    - PRT3
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - paradox.ee
  - api.library.loxone.com
source_urls:
  - https://paradox.ee/wp-content/uploads/2024/02/ASCII.pdf
  - https://api.library.loxone.com/downloader/file/317/Paradox_PRT3_ASCII_commands.pdf
retrieved_at: 2026-05-04T10:18:10.393Z
last_checked_at: 2026-09-17T22:22:16.742Z
generated_at: 2026-09-17T22:22:16.742Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "maximum zone/area/user counts are panel-dependent (e.g. EVO96/EVO192/DGP-NE96). Source states up to 192 zones, 8 areas, 999 users as the maximum command range."
  - "full system-event group catalog (000-066) is partially described; only command format and selected descriptors are documented."
  - "source states panic alarms \"must be individually enabled\" in the Digiplex"
verification:
  verdict: verified
  checked_at: 2026-09-17T22:22:16.742Z
  matched_actions: 45
  action_count: 45
  confidence: medium
  summary: "All 45 spec actions map literally to source ASCII command tables (VO/VC/RA/RZ/ZL/AL/UL/AA/AQ/AD/PE/PM/PF/SR/UK); transport matches source 8N1/2400-57600. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Paradox PRT3 Printer Module Control Spec

## Summary
The Paradox PRT3 Printer Module bridges a Digiplex-series alarm control panel and a home automation system via an RS-232C ASCII protocol on a DB-9 serial port. This spec covers the ASCII command set for arming/disarming areas, controlling virtual inputs, requesting zone/area/user labels and status, triggering panic alarms, smoke reset, utility keys, and the unsolicited event/PGM reporting formats the module emits back to the home automation host.

<!-- UNRESOLVED: maximum zone/area/user counts are panel-dependent (e.g. EVO96/EVO192/DGP-NE96). Source states up to 192 zones, 8 areas, 999 users as the maximum command range. -->
<!-- UNRESOLVED: full system-event group catalog (000-066) is partially described; only command format and selected descriptors are documented. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # source: one of 2400, 9600, 19200, 57600; 9600 is the most common default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source; user PINs are arm/disarm codes, not transport auth
```

## Traits
```yaml
- queryable       # inferred: extensive RA/RZ/ZL/AL/UL status/label query commands
- routable       # inferred: per-area/per-zone/per-virtual-input command set spans many sources/sinks
```

## Actions
```yaml
# Virtual Input Open (16 inputs)
- id: virtual_input_open_01
  label: Virtual Input Open 01
  kind: action
  command: "VO001<cr>"
  params: []
- id: virtual_input_open_02
  label: Virtual Input Open 02
  kind: action
  command: "VO002<cr>"
  params: []
- id: virtual_input_open_16
  label: Virtual Input Open 16
  kind: action
  command: "VO016<cr>"
  params: []

# Virtual Input Closed (16 inputs)
- id: virtual_input_closed_01
  label: Virtual Input Closed 01
  kind: action
  command: "VC001<cr>"
  params: []
- id: virtual_input_closed_02
  label: Virtual Input Closed 02
  kind: action
  command: "VC002<cr>"
  params: []
- id: virtual_input_closed_16
  label: Virtual Input Closed 16
  kind: action
  command: "VC016<cr>"
  params: []

# Request Area Status (max 8 areas)
- id: request_area_status_01
  label: Request Area Status 01
  kind: query
  command: "RA001<cr>"
  params: []
- id: request_area_status_02
  label: Request Area Status 02
  kind: query
  command: "RA002<cr>"
  params: []
- id: request_area_status_08
  label: Request Area Status 08
  kind: query
  command: "RA008<cr>"
  params: []

# Request Zone Status (max 192 zones)
- id: request_zone_status_01
  label: Request Zone Status 01
  kind: query
  command: "RZ001<cr>"
  params: []
- id: request_zone_status_02
  label: Request Zone Status 02
  kind: query
  command: "RZ002<cr>"
  params: []
- id: request_zone_status_192
  label: Request Zone Status 192
  kind: query
  command: "RZ192<cr>"
  params: []

# Request Zone Label (max 192 zones)
- id: request_zone_label_01
  label: Request Zone Label 01
  kind: query
  command: "ZL001<cr>"
  params: []
- id: request_zone_label_02
  label: Request Zone Label 02
  kind: query
  command: "ZL002<cr>"
  params: []
- id: request_zone_label_192
  label: Request Zone Label 192
  kind: query
  command: "ZL192<cr>"
  params: []

# Request Area Label (max 8 areas)
- id: request_area_label_01
  label: Request Area Label 01
  kind: query
  command: "AL001<cr>"
  params: []
- id: request_area_label_02
  label: Request Area Label 02
  kind: query
  command: "AL002<cr>"
  params: []
- id: request_area_label_08
  label: Request Area Label 08
  kind: query
  command: "AL008<cr>"
  params: []

# Request User Label (max 999 users)
- id: request_user_label_01
  label: Request User Label 01
  kind: query
  command: "UL001<cr>"
  params: []
- id: request_user_label_02
  label: Request User Label 02
  kind: query
  command: "UL002<cr>"
  params: []
- id: request_user_label_999
  label: Request User Label 999
  kind: query
  command: "UL999<cr>"
  params: []

# Area Arm (max 8 areas, mode A/F/S/I, 6-digit code)
- id: arm_area_01
  label: Arm Area 01
  kind: action
  command: "AA001{mode}{code}<cr>"
  params:
    - name: mode
      type: enum
      values: [A, F, S, I]
      description: A=Regular, F=Force, S=Stay, I=Instant
    - name: code
      type: string
      description: User code, up to 6 digits
- id: arm_area_02
  label: Arm Area 02
  kind: action
  command: "AA002{mode}{code}<cr>"
  params:
    - name: mode
      type: enum
      values: [A, F, S, I]
    - name: code
      type: string
- id: arm_area_08
  label: Arm Area 08
  kind: action
  command: "AA008{mode}{code}<cr>"
  params:
    - name: mode
      type: enum
      values: [A, F, S, I]
    - name: code
      type: string

# Area Quick Arm (max 8 areas, mode A/F/S/I, no code; requires One-Touch enabled)
- id: quick_arm_area_01
  label: Quick Arm Area 01
  kind: action
  command: "AQ001{mode}<cr>"
  params:
    - name: mode
      type: enum
      values: [A, F, S, I]
- id: quick_arm_area_02
  label: Quick Arm Area 02
  kind: action
  command: "AQ002{mode}<cr>"
  params:
    - name: mode
      type: enum
      values: [A, F, S, I]
- id: quick_arm_area_08
  label: Quick Arm Area 08
  kind: action
  command: "AQ008{mode}<cr>"
  params:
    - name: mode
      type: enum
      values: [A, F, S, I]

# Area Disarm (max 8 areas, 6-digit code)
- id: disarm_area_01
  label: Disarm Area 01
  kind: action
  command: "AD001{code}<cr>"
  params:
    - name: code
      type: string
      description: User code, up to 6 digits
- id: disarm_area_02
  label: Disarm Area 02
  kind: action
  command: "AD002{code}<cr>"
  params:
    - name: code
      type: string
- id: disarm_area_08
  label: Disarm Area 08
  kind: action
  command: "AD008{code}<cr>"
  params:
    - name: code
      type: string

# Emergency Panic (max 8 areas)
- id: panic_emergency_area_01
  label: Panic 1 - Emergency Area 01
  kind: action
  command: "PE001<cr>"
  params: []
- id: panic_emergency_area_02
  label: Panic 1 - Emergency Area 02
  kind: action
  command: "PE002<cr>"
  params: []
- id: panic_emergency_area_08
  label: Panic 1 - Emergency Area 08
  kind: action
  command: "PE008<cr>"
  params: []

# Medical Panic (max 8 areas)
- id: panic_medical_area_01
  label: Panic 2 - Medical Area 01
  kind: action
  command: "PM001<cr>"
  params: []
- id: panic_medical_area_02
  label: Panic 2 - Medical Area 02
  kind: action
  command: "PM002<cr>"
  params: []
- id: panic_medical_area_08
  label: Panic 2 - Medical Area 08
  kind: action
  command: "PM008<cr>"
  params: []

# Fire Panic (max 8 areas)
- id: panic_fire_area_01
  label: Panic 3 - Fire Area 01
  kind: action
  command: "PF001<cr>"
  params: []
- id: panic_fire_area_02
  label: Panic 3 - Fire Area 02
  kind: action
  command: "PF002<cr>"
  params: []
- id: panic_fire_area_08
  label: Panic 3 - Fire Area 08
  kind: action
  command: "PF008<cr>"
  params: []

# Smoke Reset (max 8 areas)
- id: smoke_reset_area_01
  label: Smoke Reset Area 01
  kind: action
  command: "SR001<cr>"
  params: []
- id: smoke_reset_area_02
  label: Smoke Reset Area 02
  kind: action
  command: "SR002<cr>"
  params: []
- id: smoke_reset_area_08
  label: Smoke Reset Area 08
  kind: action
  command: "SR008<cr>"
  params: []

# Utility Key (up to 251)
- id: utility_key_01
  label: Utility Key 01
  kind: action
  command: "UK001<cr>"
  params: []
- id: utility_key_02
  label: Utility Key 02
  kind: action
  command: "UK002<cr>"
  params: []
- id: utility_key_251
  label: Utility Key 251
  kind: action
  command: "UK251<cr>"
  params: []
```

## Feedbacks
```yaml
# All responses end with <cr>. Source documents these ack shapes:
# - "<first5chars>&OK<cr>"   valid command acknowledged
# - "<first5chars>&fail<cr>" invalid command (also: invalid user code on AA/AD)
# - "!<cr>"                  reception buffer full, command not accepted
# - "COMM&fail<cr>"          PRT3 lost communication with Digiplex panel
# - "COMM&ok<cr>"            PRT3-Digiplex communication restored (also sent at startup)
- id: ack_ok
  type: string
  description: First five characters of the command followed by "&OK<cr>"
- id: ack_fail
  type: string
  description: First five characters of the command followed by "&fail<cr>" (invalid command or invalid user code)
- id: buffer_full
  type: string
  description: Exclamation point followed by <cr> - reception buffer full, command not accepted
- id: comm_fail
  type: string
  description: "COMM&fail<cr> - PRT3 cannot communicate with the Digiplex panel"
- id: comm_ok
  type: string
  description: "COMM&ok<cr> - PRT3-Digiplex communication restored (also sent at startup)"

# Request Area Status response (13 bytes)
- id: area_status
  type: object
  description: "RAxxx response: bytes 6=arm mode (D/A/F/S/I), 7=zone in memory (M/O), 8=trouble (T/O), 9=not ready (N/O), 10=in programming (P/O), 11=in alarm (A/O), 12=strobe (S/O)"

# Request Zone Status response (11 bytes)
- id: zone_status
  type: object
  description: "RZxxx response: byte 6=state (C/O/T/F), 7=in alarm (A/O), 8=fire alarm (F/O), 9=supervision lost (S/O), 10=low battery (L/O)"

# Request Zone Label response (16 chars after first 5 command bytes)
- id: zone_label
  type: string
  description: "16-character zone label returned after first 5 bytes of ZL command"

# Request Area Label response (16 chars)
- id: area_label
  type: string
  description: "16-character area label returned after first 5 bytes of AL command"

# Request User Label response (16 chars)
- id: user_label
  type: string
  description: "16-character user label returned after first 5 bytes of UL command"
```

## Events
```yaml
# Virtual PGM events (PRT3 → HA module)
- id: virtual_pgm_on
  format: "PGM{nn}ON"
  description: "Virtual PGM nn activated, nn = 01..30"
- id: virtual_pgm_off
  format: "PGM{nn}OFF<cr>"
  description: "Virtual PGM nn deactivated, nn = 01..30"

# System events (PRT3 → HA module). 12-byte format:
# G{xxx}N{yyy}A{zzz} where G=3-digit event group, N=3-digit event number,
# A=3-digit area number (000 = global/all enabled areas).
# Group descriptors (partial list from source):
#   000 Zone OK | 001 Zone Open | 002 Zone Tampered | 003 Fire Loop Trouble
#   004 Non-reportable Event | 005 User Code on Keypad | 006 Door Access
#   007 Bypass Programming | 008 TX Delay Zone Alarm | 009 Arm with Master
#   010 Arm with User Code  | 011 Arm with Keyswitch | 012 Special Arming
#   013 Disarm with Master  | 014 Disarm with User Code | 015 Disarm with Keyswitch
#   016-018 Disarm after alarm (Master/User/Keyswitch)
#   019-021 Alarm Cancelled (Master/User/Keyswitch)
#   022 Special Disarm Events | 023 Zone Bypassed | 024 Zone in Alarm
#   025 Fire Alarm | 026 Zone Alarm Restore | 027 Fire Alarm Restore
#   028 Early to Disarm | 029 Late to Disarm | 030 Special Alarm (incl. Emergency/Medical/Fire panic, Police Code, Global Shutdown)
#   031 Duress Alarm | 032 Zone Shutdown | 033 Zone Tamper | 034 Zone Tamper Restore
#   035 Special Tamper | 036 Trouble Event | 037 Trouble Restore
#   038 Module Trouble | 039 Module Trouble Restore
#   040 Fail to Communicate | 041 Low Battery Zone | 042 Zone Supervision Trouble
#   043 Low Battery Zone Restored | 044 Zone Supervision Restored
#   045 Special Events | 046 Early to Arm | 047 Late to Arm
#   048 Utility Key | 049 REX | 050 Access Denied | 051 Door Left Open Alarm
#   052 Door Forced Alarm | 053 Door Left Open Restore | 054 Door Forced Restore
#   055 Intellizone Triggered | 058 New Module on Combus | 059 Module Removed from Combus
#   062 Access Granted | 063 Access Denied
#   064 Status 1 (Armed/Force/Stay/Instant/Strobe/Silent/Audible/Fire)
#   065 Status 2 (Ready/Exit Delay/Entry Delay/Trouble/Alarm in Memory/Bypassed/Programming/Lockout)
#   066 Status 3 (Intellizone Delay/Fire Delay/Auto Arm/Voice Arming/Tamper/Low Battery/Fire Loop/Supervision)
- id: system_event
  format: "G{xxx}N{yyy}A{zzz}"
  description: "12-byte unsolicited system event from PRT3; see group table in source"
```

## Safety
```yaml
confirmation_required_for:
  - panic_emergency_area_*
  - panic_medical_area_*
  - panic_fire_area_*
interlocks: []
# UNRESOLVED: source states panic alarms "must be individually enabled" in the Digiplex
# control panel - this is a panel-side configuration dependency, not a transport interlock.
# Source does not document power-on sequencing or hardware interlock procedures beyond
# "Remove AC power and battery before adding a module to the system."
```

## Notes
- All commands to and from the PRT3 terminate with carriage return (ASCII #13, `<cr>`).
- Serial configuration: 8N1, baud selectable at 2400, 9600, 19200, or 57600 via section [016] options [2] & [3] on the PRT3.
- Section [016] option [4] must be ON to select Home Automation mode (vs. Event Reporting mode); options [5] & [6] must be OFF to select the ASCII protocol.
- Feedback convention: every command that the host sends is acknowledged with the first five characters echoed back, followed by `&OK<cr>` (success), `&fail<cr>` (invalid), or an info payload (for query commands).
- `!<cr>` indicates the PRT3 reception buffer is full and the command was not accepted.
- `COMM&fail<cr>` / `COMM&ok<cr>` are unsolicited — the PRT3 emits them on its own when communication with the Digiplex panel is lost or restored (and on startup to signal healthy communication).
- Maximum counts are panel-dependent: command set supports up to 192 zones, 8 areas, 999 users, 32 doors, 251 utility keys, 30 virtual PGMs. Actual maxima depend on the Digiplex model (e.g. DGP-848 vs. EVO96/EVO192/DGP-NE96).
- Area Arm `AA` and Disarm `AD` commands require a user code (up to 6 digits); Quick Arm `AQ` requires the One-Touch feature to be enabled on the Digiplex panel and sends no code.
- User codes are not transport-level authentication; they are arm/disarm credentials validated by the Digiplex panel. There is no separate login procedure on the PRT3 transport.
- Printer cable length on the parallel/serial printer port must not exceed 25 ft.
- Connection topology: PRT3 has four DB-9 ports (one to C-Bus via null-modem, one to the home automation host, two to the dot-matrix printer — 80-column minimum required) plus one DB-25 parallel printer port.

## Provenance

```yaml
source_domains:
  - paradox.ee
  - api.library.loxone.com
source_urls:
  - https://paradox.ee/wp-content/uploads/2024/02/ASCII.pdf
  - https://api.library.loxone.com/downloader/file/317/Paradox_PRT3_ASCII_commands.pdf
retrieved_at: 2026-05-04T10:18:10.393Z
last_checked_at: 2026-09-17T22:22:16.742Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-17T22:22:16.742Z
matched_actions: 45
action_count: 45
confidence: medium
summary: "All 45 spec actions map literally to source ASCII command tables (VO/VC/RA/RZ/ZL/AL/UL/AA/AQ/AD/PE/PM/PF/SR/UK); transport matches source 8N1/2400-57600. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "maximum zone/area/user counts are panel-dependent (e.g. EVO96/EVO192/DGP-NE96). Source states up to 192 zones, 8 areas, 999 users as the maximum command range."
- "full system-event group catalog (000-066) is partially described; only command format and selected descriptors are documented."
- "source states panic alarms \"must be individually enabled\" in the Digiplex"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
