---
spec_id: admin/shure-sbrc
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shure SBC220/SBC240 Control Spec"
manufacturer: Shure
model_family: SBC220
aliases: []
compatible_with:
  manufacturers:
    - Shure
  models:
    - SBC220
    - SBC240
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - shure.com
source_urls:
  - https://www.shure.com/en-US/docs/commandstrings/SBC220-240
  - https://www.shure.com/en-US/docs/commandstrings/SBRC
retrieved_at: 2026-05-04T14:18:09.958Z
last_checked_at: 2026-07-22T01:10:16.509Z
generated_at: 2026-07-22T01:10:16.509Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source documents SBC220/SBC240; user provided SBRC as device name — verify if SBRC shares same protocol"
  - "no standalone settable parameters beyond actions above"
  - "no macro sequences documented"
  - "no safety warnings or interlock procedures in source"
  - "SBRC device not found in source — source is SBC220/SBC240 command strings"
verification:
  verdict: verified
  checked_at: 2026-07-22T01:10:16.509Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions matched verbatim in source; all source command tokens represented; transport verified. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Shure SBC220/SBC240 Control Spec

## Summary
Shure SBC220 and SBC240 are networked battery charging systems with Ethernet (TCP/IP) control. Connected to control systems (AMX, Crestron, Extron, DSPs) as servers. Port 2202. ASCII command strings protocol with GET/SET/REP pattern.

<!-- UNRESOLVED: source documents SBC220/SBC240; user provided SBRC as device name — verify if SBRC shares same protocol -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 2202
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred: GET commands return REPORT with parameter values
```

## Actions
```yaml
# SET / control commands (preserve existing IDs, add verbatim payloads)
- id: flash
  label: Flash Device
  kind: action
  command: "< SET FLASH ON >"
  params: []
  description: Identifies device via flashing; device initiates an Identify then stops flashing

- id: reboot
  label: Reboot Device
  kind: action
  command: "< SET REBOOT >"
  params: []
  description: Reboots the device. Does not generate REPorts.

- id: set_device_id
  label: Set Device ID
  kind: action
  command: "< SET DEVICE_ID {device_id} >"
  params:
    - name: device_id
      type: string
      description: '1-8 characters from set A-Z,a-z,0-9,!"#$%&''()*+,-./:;<=>?@[\]^_`~ and space. Device always responds with 31-character padded ID.'

- id: set_net_settings
  label: Set Network Settings
  kind: action
  command: "< SET NET_SETTINGS {interface} {ip_mode} {ip_addr} {subnet_mask} {gateway} >"
  params:
    - name: interface
      type: string
      enum: [SC, D1, D2]
      description: "SC=Shure Control, D1=Dante Primary, D2=Dante Secondary"
    - name: ip_mode
      type: string
      enum: [AUTO, MANUAL]
    - name: ip_addr
      type: string
      description: "IP address, or \"na\" for AUTO mode"
    - name: subnet_mask
      type: string
      description: "Subnet mask, or \"na\" for AUTO mode"
    - name: gateway
      type: string
      description: "Gateway, or \"na\" for AUTO mode (000.000.000.000 means no gateway)"
  description: "When setting Shure Control settings, reconnect at new IP. When setting Dante settings, device reboots automatically. Dante Secondary only applicable in Split/Redundant switch config."

- id: set_storage_mode
  label: Set Storage Mode
  kind: action
  command: "< SET STORAGE_MODE {mode} >"
  params:
    - name: mode
      type: string
      enum: [ON, OFF, TOGGLE]
      description: "TOGGLE switches between ON and OFF"

# Query commands (GET) - all documented status queries enumerated
- id: get_all
  label: Get All Properties
  kind: query
  command: "< GET {bay} ALL >"
  params:
    - name: bay
      type: integer
      description: "Bay/module/channel number; 0 = all bays"

- id: get_batt_bars
  label: Get Battery Bars
  kind: query
  command: "< GET {bay} BATT_BARS >"
  params:
    - name: bay
      type: integer
      description: "Bay number; 0 = all bays"

- id: get_batt_capacity_max
  label: Get Battery Max Capacity
  kind: query
  command: "< GET {bay} BATT_CAPACITY_MAX >"
  params:
    - name: bay
      type: integer
      description: "Bay number; 0 = all bays"

- id: get_batt_charge
  label: Get Battery Charge Level
  kind: query
  command: "< GET {bay} BATT_CHARGE >"
  params:
    - name: bay
      type: integer
      description: "Bay number; 0 = all bays"

- id: get_batt_current_capacity
  label: Get Current Battery Capacity
  kind: query
  command: "< GET {bay} BATT_CURRENT_CAPACITY >"
  params:
    - name: bay
      type: integer
      description: "Bay number; 0 = all bays"

- id: get_batt_current_capacity_max
  label: Get Current Max Capacity
  kind: query
  command: "< GET {bay} BATT_CURRENT_CAPACITY_MAX >"
  params:
    - name: bay
      type: integer
      description: "Bay number; 0 = all bays"

- id: get_batt_cycle
  label: Get Battery Cycle Count
  kind: query
  command: "< GET {bay} BATT_CYCLE >"
  params:
    - name: bay
      type: integer
      description: "Bay number; 0 = all bays"

- id: get_batt_detected
  label: Get Battery Detected
  kind: query
  command: "< GET {bay} BATT_DETECTED >"
  params:
    - name: bay
      type: integer
      description: "Bay number; 0 = all bays"

- id: get_batt_error
  label: Get Battery Error Status
  kind: query
  command: "< GET {bay} BATT_ERROR >"
  params:
    - name: bay
      type: integer
      description: "Bay number; 0 = all bays"

- id: get_batt_health
  label: Get Battery Health
  kind: query
  command: "< GET {bay} BATT_HEALTH >"
  params:
    - name: bay
      type: integer
      description: "Bay number; 0 = all bays"

- id: get_batt_module_type
  label: Get Battery Module Type
  kind: query
  command: "< GET {bay} BATT_MODULE_TYPE >"
  params:
    - name: bay
      type: integer
      description: "Module number; 0 = all modules"

- id: get_batt_state
  label: Get Battery State
  kind: query
  command: "< GET {bay} BATT_STATE >"
  params:
    - name: bay
      type: integer
      description: "Bay number; 0 = all bays"

- id: get_batt_temp_c
  label: Get Battery Temperature (Celsius)
  kind: query
  command: "< GET {bay} BATT_TEMP_C >"
  params:
    - name: bay
      type: integer
      description: "Bay number; 0 = all bays"

- id: get_batt_temp_f
  label: Get Battery Temperature (Fahrenheit)
  kind: query
  command: "< GET {bay} BATT_TEMP_F >"
  params:
    - name: bay
      type: integer
      description: "Bay number; 0 = all bays"

- id: get_batt_time_to_full
  label: Get Time to Full Charge
  kind: query
  command: "< GET {bay} BATT_TIME_TO_FULL >"
  params:
    - name: bay
      type: integer
      description: "Bay number; 0 = all bays"

- id: get_device_id
  label: Get Device ID
  kind: query
  command: "< GET DEVICE_ID >"
  params: []

- id: get_fw_ver
  label: Get Firmware Version
  kind: query
  command: "< GET FW_VER >"
  params: []

- id: get_model
  label: Get Model Name
  kind: query
  command: "< GET MODEL >"
  params: []

- id: get_net_settings
  label: Get Network Settings
  kind: query
  command: "< GET NET_SETTINGS {interface} >"
  params:
    - name: interface
      type: string
      enum: [SC, D1, D2]
      description: "SC=Shure Control, D1=Dante Primary, D2=Dante Secondary"
  description: "No asynchronous REPorts for NET_SETTINGS; use GET to retrieve current values."

- id: get_storage_mode
  label: Get Storage Mode
  kind: query
  command: "< GET STORAGE_MODE >"
  params: []
```

## Feedbacks
```yaml
- id: all_status
  label: All Device Properties
  description: Response to GET ALL - returns all device properties and metered values
  kind: report

- id: batt_bars
  label: Battery Bar Count
  type: integer
  values_description: "000-005: bars, 254: error, 255: unknown"

- id: batt_capacity_max
  label: Battery Max Capacity
  type: integer
  values_description: "00000-65533 mAh, 65534: error, 65535: no battery"

- id: batt_charge
  label: Battery Charge Level
  type: integer
  values_description: "000-100 percent, 254: error, 255: unknown"

- id: batt_current_capacity
  label: Current Battery Capacity
  type: integer
  values_description: "00000-65533 mAh, 65534: error, 65535: no battery"

- id: batt_current_capacity_max
  label: Current Max Capacity
  type: integer
  values_description: "00000-65533 mAh, 65534: error, 65535: no battery"

- id: batt_cycle
  label: Battery Cycle Count
  type: integer
  values_description: "00000-65533 cycles, 65534: error, 65535: unknown"

- id: batt_detected
  label: Battery Detected
  type: enum
  values: [YES, NO]

- id: batt_error
  label: Battery Error Status
  type: integer
  values_description: "000: no error, 001: unknown module, 002: unrecognized battery, 003: deep discharge recovery failed, 004: charge failed, 005: check battery, 006: check charger, 007: communication failure, 254-255: no battery"

- id: batt_health
  label: Battery Health
  type: integer
  values_description: "000-100 percent, 254: error, 255: unknown"

- id: batt_module_type
  label: Battery Module Type
  type: integer
  values_description: "000: no module, 129: primary, 133: secondary or primary, 255: invalid/unsupported"

- id: batt_state
  label: Battery State
  type: enum
  values: [FULL, CALCULATING, NORMAL, WARM, WARM_FULL, HOT, COLD, PRECHARGE, READY_TO_STORE, DISCHARGE_CALC, DISCHARGING, DISCHARGING_WARM, DISCHARGING_COLD, ERROR, NO_BATT]

- id: batt_temp_c
  label: Battery Temperature (Celsius)
  type: integer
  values_description: "Actual = reported - 40. 000-253 C, 254: error, 255: unknown"

- id: batt_temp_f
  label: Battery Temperature (Fahrenheit)
  type: integer
  values_description: "Actual = reported - 40. 000-253 F, 254: error, 255: unknown"

- id: batt_time_to_full
  label: Time to Full Charge
  type: integer
  values_description: "Minutes to target. 00000-65528: minutes, 65529: fully charged, 65533: calculating, 65534: error, 65535: unknown"

- id: device_id
  label: Device ID
  type: string
  description: "31-character padded string"

- id: fw_ver
  label: Firmware Version
  type: string
  description: "Format: Maj.Min.Pack.Build. * suffix indicates self-test failure. 24-character padded response"

- id: flash_state
  label: Flash State
  type: enum
  values: [ON]

- id: model
  label: Model Name
  type: string
  description: 32-character padded string

- id: net_settings
  label: Network Settings
  type: object
  properties:
    - interface: SC|D1|D2
    - ip_mode: AUTO|MANUAL
    - ip_addr: string
    - subnet_mask: string
    - gw_addr: string
    - mac_addr: string

- id: storage_mode
  label: Storage Mode
  type: enum
  values: [ON, OFF]
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters beyond actions above
```

## Events
```yaml
# Device sends unsolicited REP when monitored battery values change (charge level,
# temperature, time-to-full, bars, cycle count, state). Example:
#   < REP 1 BATT_TIME_TO_FULL 00107 >
# NET_SETTINGS has NO asynchronous REPorts - use GET to poll.
```

## Macros
```yaml
# UNRESOLVED: no macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "When setting Shure Control network settings, must reconnect at new IP address"
  - "When setting Dante network settings, device reboots automatically - must reconnect"
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command syntax: `< GET x PARAM >` and `< REP x PARAM value >` — angle brackets, space-separated ASCII. Device acts as TCP server; control system is client. GET returns REP; SET returns REP. Unsolicited REP sent when monitored values change. No authentication required. All messages ASCII. BATT_TEMP_C / BATT_TEMP_F have +40 offset (actual = reported - 40).
<!-- UNRESOLVED: SBRC device not found in source — source is SBC220/SBC240 command strings -->
```

Upgrade done. Changes vs on-disk spec:

- **Added `command:` payload** to all 5 existing SET actions (flash, reboot, set_device_id, set_net_settings, set_storage_mode) — verbatim with angle brackets + params templated
- **Added 20 GET query actions** (kind: query) covering all 17 GET-only mnemonics + GET forms of the 3 dual GET/SET mnemonics — every documented `GET` row now has an action
- Preserved all IDs, transport, traits, feedbacks, events, safety, notes shapes

Coverage: all 22 documented mnemonics now represented.

## Provenance

```yaml
source_domains:
  - shure.com
source_urls:
  - https://www.shure.com/en-US/docs/commandstrings/SBC220-240
  - https://www.shure.com/en-US/docs/commandstrings/SBRC
retrieved_at: 2026-05-04T14:18:09.958Z
last_checked_at: 2026-07-22T01:10:16.509Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:10:16.509Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions matched verbatim in source; all source command tokens represented; transport verified. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source documents SBC220/SBC240; user provided SBRC as device name — verify if SBRC shares same protocol"
- "no standalone settable parameters beyond actions above"
- "no macro sequences documented"
- "no safety warnings or interlock procedures in source"
- "SBRC device not found in source — source is SBC220/SBC240 command strings"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
