---
spec_id: admin/coolautomation-coolinkbridge
schema_version: ai4av-public-spec-v1
revision: 1
title: "CoolAutomation CooLinkBridge Control Spec"
manufacturer: CoolAutomation
model_family: CooLinkBridge
aliases: []
compatible_with:
  manufacturers:
    - CoolAutomation
  models:
    - CooLinkBridge
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - coolautomation.com
  - support.coolautomation.com
source_urls:
  - https://coolautomation.com/Lib/doc/prm/CoolAutomation-PRM-CoolMaster-v4.06.pdf
  - https://support.coolautomation.com/hc/en-us/articles/4417614903953-CoolMaster-PRM-Programmers-Reference-Manual
  - https://coolautomation.com/Lib/doc/CoolMasterNet/prm/CoolMasterNet-PRM-v0.9.pdf
  - https://coolautomation.com/products/coolinkbridge/
  - https://coolautomation.com/products/api/
retrieved_at: 2026-04-29T21:22:41.675Z
last_checked_at: 2026-06-02T21:41:17.400Z
generated_at: 2026-06-02T21:41:17.400Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "refined source documents the Cool Master command set and RS-232 transport. The CooLinkBridge product line typically also exposes a TCP/IP interface, but no TCP/IP, port, HTTP, REST, or authentication details appear in the source. Treat the device as RS-232-only per the source until contradicted."
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "TCP/IP, port, HTTP, REST, authentication, and any cloud/Coohub-specific endpoints for the CooLinkBridge are not described in this source. The baud-rate list in `set` includes 18200 (likely a typo for 19200) — preserved verbatim from the source."
verification:
  verdict: verified
  checked_at: 2026-06-02T21:41:17.400Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions matched literally in source command reference; transport parameters verified verbatim; bidirectional coverage complete. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# CoolAutomation CooLinkBridge Control Spec

## Summary
The CoolAutomation CooLinkBridge exposes a text-based RS-232 control protocol (referred to in the source as the "Cool Master" protocol) used to command and query HVAC indoor units addressed by 3-character UIDs. This spec covers the command set, response format, and serial transport parameters documented in the vendor reference.

<!-- UNRESOLVED: refined source documents the Cool Master command set and RS-232 transport. The CooLinkBridge product line typically also exposes a TCP/IP interface, but no TCP/IP, port, HTTP, REST, or authentication details appear in the source. Treat the device as RS-232-only per the source until contradicted. -->

## Transport
```yaml
# Source explicitly documents RS-232 only (section 2). No TCP/IP, HTTP, or
# authentication material is present in the source.
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable  # inferred from on/off/allon/alloff command examples
# - queryable  # inferred from stat/stat2/stat3/stat4/query command examples
# - levelable  # inferred from temp/fspeed/swing command examples
```

## Actions
```yaml
- id: alloff
  label: All Indoor Units Off
  kind: action
  command: "alloff"
  params: []

- id: allon
  label: All Indoor Units On
  kind: action
  command: "allon"
  params: []

- id: boot
  label: Enter Bootloader Mode
  kind: action
  command: "boot"
  params: []

- id: cool
  label: Set Unit Mode To Cool
  kind: action
  command: "cool {uid}"
  params:
    - name: uid
      type: string
      description: 3-character indoor unit address (e.g. 102)

- id: dry
  label: Set Unit Mode To Dry
  kind: action
  command: "dry {uid}"
  params:
    - name: uid
      type: string
      description: 3-character indoor unit address

- id: heat
  label: Set Unit Mode To Heat
  kind: action
  command: "heat {uid}"
  params:
    - name: uid
      type: string
      description: 3-character indoor unit address

- id: auto_mode
  label: Set Unit Mode To Auto
  kind: action
  command: "auto {uid}"
  params:
    - name: uid
      type: string
      description: 3-character indoor unit address

- id: fan_mode
  label: Set Unit Mode To Fan
  kind: action
  command: "fan {uid}"
  params:
    - name: uid
      type: string
      description: 3-character indoor unit address

- id: filt
  label: Reset Filter Sign
  kind: action
  command: "filt {uid}"
  params:
    - name: uid
      type: string
      description: 3-character indoor unit address

- id: fspeed
  label: Set Fan Speed
  kind: action
  command: "fspeed {uid} {speed}"
  params:
    - name: uid
      type: string
      description: 3-character indoor unit address
    - name: speed
      type: string
      description: "Fan speed letter: l (low), m (medium), h (high), a (auto), t (top). Supported letters depend on CoolMaster model."

- id: off
  label: Turn Unit Off
  kind: action
  command: "off {uid} {output?}"
  params:
    - name: uid
      type: string
      description: 3-character indoor unit address
    - name: output
      type: integer
      description: "Optional PAC-YG66 digital output number 1..6 (CoolMaster 4000M v2.5.6+ only)"

- id: on
  label: Turn Unit On
  kind: action
  command: "on {uid} {output?}"
  params:
    - name: uid
      type: string
      description: 3-character indoor unit address
    - name: output
      type: integer
      description: "Optional PAC-YG66 digital output number 1..6 (CoolMaster 4000M v2.5.6+ only)"

- id: set
  label: Query Or Set Configuration
  kind: action
  command: "set {option} {value?}"
  params:
    - name: option
      type: string
      description: "Configuration option. Read-only: S/N, version, CS count, TO count, Collisio, NA Count, MB CRC. Read/Write: myid, echo, baud, deg (C|F), slink, master, lcd, simul, modaddr, ignore."
    - name: value
      type: string
      description: "Option value. Omitted for query. For deg use C or F. For echo use 0 or 1. For baud use 1200/2400/4800/9600/18200/38400/57600/115200."

- id: simul
  label: Simulate Indoor Units
  kind: action
  command: "simul {n}"
  params:
    - name: n
      type: integer
      description: "Number of indoor units to simulate. 0 to exit simulation mode."

- id: stat
  label: Get Indoor Unit Status
  kind: query
  command: "stat {uid?}"
  params:
    - name: uid
      type: string
      description: "Optional 3-character indoor unit address. Omit for all units."

- id: stat2
  label: Get Indoor Unit Status With Filter Sign
  kind: query
  command: "stat2 {uid?}"
  params:
    - name: uid
      type: string
      description: "Optional 3-character indoor unit address. Omit for all units."

- id: stat3
  label: Get Indoor Unit Status (Integer Temperature)
  kind: query
  command: "stat3 {uid?}"
  params:
    - name: uid
      type: string
      description: "Optional 3-character indoor unit address. Omit for all units."

- id: stat4
  label: Get Indoor Unit Status With Thermostat
  kind: query
  command: "stat4 {uid?}"
  params:
    - name: uid
      type: string
      description: "Optional 3-character indoor unit address. Omit for all units."

- id: query
  label: Query Single Parameter
  kind: query
  command: "query {uid} {parameter}"
  params:
    - name: uid
      type: string
      description: 3-character indoor unit address
    - name: parameter
      type: string
      description: "Parameter letter: o (on/off), m (mode), f (fan speed), t (set temp), e (failure code), a (ambient temp), h (set temp 0.01 precision), s (swing)"

- id: swing
  label: Set Swing Position
  kind: action
  command: "swing {uid} {position}"
  params:
    - name: uid
      type: string
      description: 3-character indoor unit address
    - name: position
      type: string
      description: "a (auto), h (horizontal), 3 (30 deg), 4 (45 deg), 6 (60 deg), v (vertical)"

- id: temp
  label: Set Temperature
  kind: action
  command: "temp {uid} {temperature}"
  params:
    - name: uid
      type: string
      description: 3-character indoor unit address
    - name: temperature
      type: string
      description: "Decimal number, optionally prefixed with + or - for relative delta. With 0.01 precision suffix (XX.xx) for high-resolution set."

- id: group
  label: Group Units
  kind: action
  command: "group {uid_master} {uid}"
  params:
    - name: uid_master
      type: string
      description: Master unit UID; second unit will follow this unit's settings. Omit (or use delall) to list/delete groups.
    - name: uid
      type: string
      description: "Follower unit UID. Use literal delall to delete all groups. Power reset required to take effect."

- id: vam
  label: VAM Unit Mode And Fan
  kind: action
  command: "vam {uid} {letter}"
  params:
    - name: uid
      type: string
      description: 3-character VAM unit address
    - name: letter
      type: string
      description: "a (Auto Mode), b (Bypass), x (Heat Exchange), n (Normal), l (Low Fan), L (Low Fan w/ Fresh-Up), h (High Fan), H (High Fan w/ Fresh-Up), s (Super High Fan), A (Auto Fan). Compatibility per CoolMaster model."

- id: lock
  label: Lock Wall Controller
  kind: action
  command: "lock {uid} {operation?}"
  params:
    - name: uid
      type: string
      description: 3-character indoor unit address
    - name: operation
      type: string
      description: "Omit to query. Use + or - to lock/unlock all. Use +/- followed by o (on/off), m (mode change), s (set temp), n (on, 1000D only), t to toggle specific operations. Multiple +/- tokens allowed."

- id: wh
  label: Water Heating Unit Mode
  kind: action
  command: "wh {uid} {letter}"
  params:
    - name: uid
      type: string
      description: 3-character water heating unit address (CoolMaster 4000M only)
    - name: letter
      type: string
      description: "h (Heating), e (ECO), w (Hot Water), a (Anti-freeze)"

- id: unknown_command_response
  label: Unknown Command Error
  kind: feedback
  command: "Unknown command"

- id: bad_parameters_response
  label: Bad Parameters Error
  kind: feedback
  command: "Bad parameters"
```

## Feedbacks
```yaml
# Responses to the stat family of queries. Format is positional and depends
# on which stat variant was issued. Values below reflect stat (the base form).
- id: stat_response
  type: object
  description: |
    One line per indoor unit. Positions: 0-2 centralized address (NNN);
    4-6 on/off (ON|OFF); 8-10 set temperature (NNC, NNNF in Fahrenheit);
    12-17 room temperature (NN,NNC); 19-22 fan speed (Low|Med|High|Auto|Top);
    24-27 mode (Cool|Heat|Fan|Dry|Auto, with AutC/AutH for auto-cooling/auto-heating);
    29-32 status (OK or Xn/Xnn/nnnn failure code).
  fields:
    - name: address
      type: string
    - name: on_off
      type: enum
      values: [ON, OFF]
    - name: set_temp
      type: string
    - name: room_temp
      type: string
    - name: fan_speed
      type: enum
      values: [Low, Med, High, Auto, Top]
    - name: mode
      type: enum
      values: [Cool, Heat, Fan, Dry, Auto, AutC, AutH]
    - name: status
      type: string

# stat2 adds a trailing 0/1 filter-reset-sign column.
# stat3 drops the fractional part of room temperature and adds the filter sign.
# stat4 extends stat3 with a trailing THERMOSTAT_ON column (1=On, 0=Off).
# PAC-YG66 (digital I/O, CoolMaster 4000M v2.5.6+) response:
#   "NNN DIG IN:XXXXXX OUT:XXXXXXX OK" - 6 digital inputs and 6/7 digital outputs.
# PAC-YG63 (analog I/O, CoolMaster 4000M v2.5.6+) response:
#   "NNN ANA NNN.n NNN.n OK" - two analog input values with 0.1 precision.
#
# query responses are single values; see the `query` action's parameter table.
```

## Variables
```yaml
# Read/write CoolMaster configuration options exposed by the `set` command.
# Values are read with `set <option>` (no value) and written with
# `set <option> <value>`. Some options are read-only.
- id: myid
  type: string
  access: read_write
  description: Own centralized address (hex 0A, etc.)
- id: echo
  type: integer
  access: read_write
  values: [0, 1]
  description: Command echo. 0=disable, 1=enable.
- id: baud
  type: integer
  access: read_write
  values: [1200, 2400, 4800, 9600, 18200, 38400, 57600, 115200]
  description: "RS-232 baud rate. Default 9600. Change takes effect only after power reset."
- id: deg
  type: string
  access: read_write
  values: [C, F]
  description: Temperature scale. C=Celsius, F=Fahrenheit.
- id: slink
  type: string
  access: read_write
  values: [O, N]
  description: A/C line link type for CoolMaster 8000I(MH). O=Old, N=New.
- id: master
  type: integer
  access: read_write
  values: [0, 1]
  description: "1=Master, 0=Slave. For CoolMaster 6000L/1000D."
- id: lcd
  type: string
  access: read_write
  description: LCD size.
- id: simul
  type: integer
  access: read_write
  description: "Number of indoor units permanently simulated. Non-zero keeps simulation active after reset."
- id: modaddr
  type: string
  access: read_write
  description: "Modbus address (Coolgate only)."
- id: ignore
  type: string
  access: read_write
  description: "Ignore flags. r = ignore Modbus Illegal Data Address (Coolgate only)."
- id: serial_number
  type: string
  access: read_only
  description: CoolMaster unit serial number.
- id: version
  type: string
  access: read_only
  description: Firmware version.
- id: cs_count
  type: integer
  access: read_only
  description: Check sum errors counter.
- id: to_count
  type: integer
  access: read_only
  description: Timeout errors counter.
- id: collision_count
  type: integer
  access: read_only
  description: Collision counter.
- id: na_count
  type: integer
  access: read_only
  description: NAK counter.
- id: mb_crc
  type: integer
  access: read_only
  description: Modbus bad CRC counter (Coolgate only).
```

## Events
```yaml
# The bridge emits a `>` prompt character when ready to accept a new command.
# No other unsolicited notifications are documented in the source.
- id: prompt_ready
  payload: ">"
  description: Bridge is ready to accept a new command.
```

## Macros
```yaml
# Grouping is the only multi-step / relational operation explicitly described.
# Source: section 4.1.21. Grouping only takes effect after a power reset of
# the bridge.
- id: group_units
  description: Make a follower UID mirror all settings of a master UID.
  steps:
    - "lock {follower_uid} +   # optional: lock follower's wall controller to prevent manual override"
    - "group {master_uid} {follower_uid}"
    - "Power-reset the bridge to activate the group."
- id: ungroup_all
  description: Remove all group bindings.
  steps:
    - "group delall"
    - "Power-reset the bridge to deactivate the groups."
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements are stated in the source. The only sequencing note is that
# `group` and `baud` changes take effect only after a power reset of the bridge.
```

## Notes
- **Prompt:** The bridge emits a `>` prompt character when ready. Commands are case-sensitive, must not contain leading/trailing spaces, and use a single space as the only separator between command name and parameters.
- **Termination:** Commands are terminated by CR LF (`\r\n`) or a single CR (`\r`). Responses (except the prompt) are terminated by CR LF.
- **Exit codes:** Successful commands return `OK`. The `stat` family also returns a per-unit status of `OK` or a failure code (`Xn`, `Xnn`, `nnnn`).
- **Address model:** UIDs are 3 characters — first char is system number 0-9 or A-F (or `Z` for centralized address mode), followed by two hex/decimal digits. Supported UID ranges vary by CoolMaster model (see source section 3.2).
- **Backward compatibility:** The `stat` command is documented as obsolete; `stat2`/`stat3`/`stat4` are preferred. Unit numbers 0-15 may also be written as hex pairs (e.g. `10A` = centralized 1-15); source discourages this.
- **Mode status reporting:** In `Auto` mode, `stat` may report `Auto`, `AutC` (auto-cooling), or `AutH` (auto-heating).
- **Filter sign:** Only `stat2`/`stat3`/`stat4` include the filter-reset-sign column.
- **Source/target mismatch:** The refined source documents the Cool Master RS-232 protocol. The CooLinkBridge product name was supplied separately; if a CooLinkBridge-specific TCP/IP or REST surface exists, it is not captured in this source and is left as UNRESOLVED.
<!-- UNRESOLVED: TCP/IP, port, HTTP, REST, authentication, and any cloud/Coohub-specific endpoints for the CooLinkBridge are not described in this source. The baud-rate list in `set` includes 18200 (likely a typo for 19200) — preserved verbatim from the source. -->

## Provenance

```yaml
source_domains:
  - coolautomation.com
  - support.coolautomation.com
source_urls:
  - https://coolautomation.com/Lib/doc/prm/CoolAutomation-PRM-CoolMaster-v4.06.pdf
  - https://support.coolautomation.com/hc/en-us/articles/4417614903953-CoolMaster-PRM-Programmers-Reference-Manual
  - https://coolautomation.com/Lib/doc/CoolMasterNet/prm/CoolMasterNet-PRM-v0.9.pdf
  - https://coolautomation.com/products/coolinkbridge/
  - https://coolautomation.com/products/api/
retrieved_at: 2026-04-29T21:22:41.675Z
last_checked_at: 2026-06-02T21:41:17.400Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:41:17.400Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions matched literally in source command reference; transport parameters verified verbatim; bidirectional coverage complete. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "refined source documents the Cool Master command set and RS-232 transport. The CooLinkBridge product line typically also exposes a TCP/IP interface, but no TCP/IP, port, HTTP, REST, or authentication details appear in the source. Treat the device as RS-232-only per the source until contradicted."
- "no safety warnings, interlock procedures, or power-on sequencing"
- "TCP/IP, port, HTTP, REST, authentication, and any cloud/Coohub-specific endpoints for the CooLinkBridge are not described in this source. The baud-rate list in `set` includes 18200 (likely a typo for 19200) — preserved verbatim from the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
