---
spec_id: admin/coolautomation-cool_linknet
schema_version: ai4av-public-spec-v1
revision: 1
title: "CoolAutomation Cool Linknet Control Spec"
manufacturer: CoolAutomation
model_family: "Cool Linknet"
aliases: []
compatible_with:
  manufacturers:
    - CoolAutomation
  models:
    - "Cool Linknet"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - coolautomation.com
source_urls:
  - https://coolautomation.com/Lib/doc/prm/CoolAutomation-PRM-CoolMaster-v4.06.pdf
retrieved_at: 2026-05-04T18:05:10.825Z
last_checked_at: 2026-05-27T15:36:45.109Z
generated_at: 2026-05-27T15:36:45.109Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-27T15:36:45.109Z
  matched_actions: 90
  action_count: 90
  confidence: high
  summary: "All 90 spec actions matched literally to source command reference; transport parameters confirmed (TCP 10102, serial 9600/8N1); complete coverage of CoolMaster ASCII I/F protocol."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# CoolAutomation Cool Linknet Control Spec

## Summary
Cool Linknet is a CoolMaster Product Line gateway device providing ASCII I/F protocol over TCP/IP and RS-232 for controlling HVAC indoor units across multiple lines (L1-L8). Supports numerous HVAC brands (Daikin, Mitsubishi, LG, Samsung, etc.) via various bus interfaces (DIII-NET, H-Link, M-NET, KNX, ModBus, HDL). TCP/IP server (`aserver`) listens on port 10102.

<!-- UNRESOLVED: product model name appears only as "CoolMaster Product Line" in source; model "Cool Linknet" inferred from filename -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 10102  # aserver default TCP port
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
- powerable    # on, off, allon, alloff commands present
- queryable    # ls, ls2, query commands present
- levelable    # temp, feed commands present
- routable     # group, link commands present
```

## Actions
```yaml
- id: set
  label: Set / Query Settings
  kind: action
  params:
    - name: setting
      type: string
      description: Setting name (S/N, version, app, baud, echo, verbose, aserverport, aserverprompt, deg, melody, filtervisi, HVAClines, mmilock)
    - name: value
      type: string
      description: New value (optional - omit to query)
    - name: defaults
      type: string
      description: Use "defaults" to reset all settings

- id: set_defaults
  label: Set Defaults
  kind: action
  params:
    - name: defaults
      type: string
      description: Must be literal "defaults"

- id: line_query
  label: Query Line Status
  kind: query
  params: []

- id: line_property
  label: Configure Line Property
  kind: action
  params:
    - name: property
      type: string
      description: Property (master, simul, myid, baud, haux, type, scan, DCOUT, slink)
    - name: ln
      type: string
      description: Line L1-L8
    - name: val
      type: string
      description: New value

- id: ifconfig
  label: Query Network Config
  kind: query
  params: []

- id: ifconfig_set
  label: Set Network Config
  kind: action
  params:
    - name: property
      type: string
      description: Property (IP, Netmask, Gateway, DNS1, DNS2)
    - name: value
      type: string
      description: Value or "DHCP"

- id: ifconfig_enable
  label: Enable Ethernet
  kind: action
  params:
    - name: enable
      type: string
      description: Must be literal "enable"

- id: ifconfig_disable
  label: Disable Ethernet
  kind: action
  params:
    - name: disable
      type: string
      description: Must be literal "disable"

- id: boot
  label: Enter Boot Mode
  kind: action
  params: []

- id: boot_reset
  label: Reset Device
  kind: action
  params:
    - name: N
      type: integer
      description: Must be 2 to reset

- id: sddp
  label: Query SDDP Status
  kind: query
  params: []

- id: sddp_enable
  label: Enable SDDP
  kind: action
  params:
    - name: enable
      type: string
      description: Must be literal "enable"

- id: sddp_disable
  label: Disable SDDP
  kind: action
  params:
    - name: disable
      type: string
      description: Must be literal "disable"

- id: sddp_identify
  label: Send SDDP Identify
  kind: action
  params:
    - name: identify
      type: string
      description: Must be literal "identify"

- id: sddp_offline
  label: Signal SDDP Offline
  kind: action
  params:
    - name: offline
      type: string
      description: Must be literal "offline"

- id: sddp_alive
  label: Signal SDDP Alive
  kind: action
  params:
    - name: alive
      type: string
      description: Must be literal "alive"

- id: knx
  label: Query KNX Status
  kind: query
  params: []

- id: knx_addr
  label: Set KNX Physical Address
  kind: action
  params:
    - name: area
      type: integer
      description: Area (0-15)
    - name: line
      type: integer
      description: Line (0-15)
    - name: device
      type: integer
      description: Device (0-255)

- id: knx_ram
  label: Create KNX Group Database
  kind: action
  params:
    - name: R
      type: integer
      description: Number of groups

- id: knx_funcs
  label: Print KNX Functions
  kind: query
  params: []

- id: knx_group
  label: List KNX Groups
  kind: query
  params: []

- id: knx_group_ga
  label: List KNX Groups by Address
  kind: query
  params:
    - name: GA
      type: string
      description: Group address (Main/Mid/Sub or Main/Sub)

- id: knx_group_create
  label: Create KNX Group
  kind: action
  params:
    - name: GA
      type: string
      description: Group address
    - name: func
      type: string
      description: Function (onoff, ST, RT, M, Fstep, F8, F%)
    - name: direction
      type: string
      description: "<" = input to CoolMaster, ">" = output from CoolMaster
    - name: UID
      type: string
      description: Indoor unit UID

- id: knx_group_delall
  label: Delete All KNX Groups
  kind: action
  params:
    - name: dellall
      type: string
      description: Must be literal "dellall"

- id: knx_group_delete
  label: Delete KNX Group
  kind: action
  params:
    - name: G
      type: integer
      description: Group number to delete (prefix with -)

- id: props
  label: List Properties
  kind: query
  params: []

- id: props_delall
  label: Delete All Properties
  kind: action
  params:
    - name: delall
      type: string
      description: Must be literal "delall"

- id: props_set
  label: Set Indoor Unit Property
  kind: action
  params:
    - name: UID_STRICT
      type: string
      description: Indoor unit UID (Ln.XYY)
    - name: property
      type: string
      description: Property (name, visi, fspeed, mode, tlim, elock)
    - name: val
      type: string
      description: Value

- id: link
  label: List Links
  kind: query
  params: []

- id: link_delall
  label: Delete All Links
  kind: action
  params:
    - name: delall
      type: string
      description: Must be literal "delall"

- id: link_delete
  label: Delete Link
  kind: action
  params:
    - name: L
      type: integer
      description: Link number (prefix with -)

- id: link_ram
  label: Create Link Database
  kind: action
  params:
    - name: R
      type: integer
      description: Number of links

- id: link_create
  label: Create Link
  kind: action
  params:
    - name: UID1_STRICT
      type: string
      description: Source UID
    - name: type
      type: string
      description: "=" regular link, "~" haux link
    - name: UID2_STRICT
      type: string
      description: Target UID

- id: plug
  label: Forward to CoolPlug
  kind: action
  params:
    - name: UID_STRICT
      type: string
      description: CoolPlug UID
    - name: command
      type: string
      description: ASCII I/F command to forward

- id: ad
  label: Forward to CMNET-GR-GMV5
  kind: action
  params:
    - name: Ln
      type: string
      description: Line L8
    - name: command
      type: string
      description: ASCII I/F command to forward

- id: hdl
  label: List HDL Configurations
  kind: query
  params: []

- id: hdl_delall
  label: Delete All HDL Configurations
  kind: action
  params:
    - name: delall
      type: string
      description: Must be literal "delall"

- id: hdl_delete
  label: Delete HDL Configuration
  kind: action
  params:
    - name: UID_STRICT
      type: string
      description: Indoor unit UID

- id: hdl_create
  label: Create HDL Configuration
  kind: action
  params:
    - name: UID_STRICT
      type: string
      description: Indoor unit UID
    - name: channel
      type: integer
      description: Line number in AC config table
    - name: AC_No
      type: integer
      description: AC number to bind
    - name: enable
      type: integer
      description: 0=invalid, 1=valid
    - name: modes
      type: string
      description: 10-char modes string (m0m1m2m3m4f0f1f2f3, +=allowed, -=not allowed)

- id: hdl_eth
  label: Query HDL Ethernet Status
  kind: query
  params: []

- id: hdl_eth_enable
  label: Enable HDL over Ethernet
  kind: action
  params:
    - name: enable
      type: string
      description: Must be literal "enable"

- id: hdl_eth_disable
  label: Disable HDL over Ethernet
  kind: action
  params:
    - name: disable
      type: string
      description: Must be literal "disable"

- id: hdl_eth_myid
  label: Set HDL ID
  kind: action
  params:
    - name: ID
      type: string
      description: Hex SubnetID+DeviceID (e.g. 0163)

- id: simul
  label: Simulate Indoor Units
  kind: action
  params:
    - name: Ln
      type: string
      description: Line (optional)
    - name: CNT
      type: integer
      description: Number of units to simulate

- id: gpio
  label: Query GPIO Status
  kind: query
  params: []

- id: gpio_func
  label: Set GPIO Function
  kind: action
  params:
    - name: gpio_name
      type: string
      description: "A", "B", "C", or "D"
    - name: function
      type: string
      description: Function (Unused, ALL OFF, ALL ON, OOS, ALL INH, FLRS, BI, BO, AI)

- id: gpio_norm
  label: Set GPIO Normal State
  kind: action
  params:
    - name: gpio_name
      type: string
      description: "A", "B", "C", or "D"
    - name: norm
      type: string
      description: "c" (N.O. HI), "C" (N.C. LO), "o" (N.O. HI), "O" (N.C. LO)

- id: info
  label: Query DIP Switch Info
  kind: query
  params: []

- id: modbus
  label: Query ModBus Config
  kind: query
  params: []

- id: modbus_set
  label: Set ModBus Config
  kind: action
  params:
    - name: setting
      type: string
      description: Setting (IP, server port, ignore)
    - name: value
      type: string
      description: Value

- id: modbus_cg4
  label: List CoolGate 4 ModBus Addresses
  kind: query
  params: []

- id: on
  label: Turn On Indoor Unit(s)
  kind: action
  params:
    - name: UID
      type: string
      description: UID (optional - omit for all)

- id: allon
  label: Turn On All Indoor Units
  kind: action
  params: []

- id: off
  label: Turn Off Indoor Unit(s)
  kind: action
  params:
    - name: UID
      type: string
      description: UID (optional - omit for all)

- id: alloff
  label: Turn Off All Indoor Units
  kind: action
  params: []

- id: cool
  label: Set Cool Mode
  kind: action
  params:
    - name: UID
      type: string
      description: UID (optional - omit for all)

- id: heat
  label: Set Heat Mode
  kind: action
  params:
    - name: UID
      type: string
      description: UID (optional - omit for all)

- id: fan
  label: Set Fan Mode
  kind: action
  params:
    - name: UID
      type: string
      description: UID (optional - omit for all)

- id: dry
  label: Set Dry Mode
  kind: action
  params:
    - name: UID
      type: string
      description: UID (optional - omit for all)

- id: auto
  label: Set Auto Mode
  kind: action
  params:
    - name: UID
      type: string
      description: UID (optional - omit for all)

- id: temp
  label: Set Temperature
  kind: action
  params:
    - name: UID
      type: string
      description: UID (optional)
    - name: TEMP
      type: string
      description: Temperature value or ±offset

- id: feed
  label: Suggest Ambient Temperature
  kind: action
  params:
    - name: UID
      type: string
      description: UID (optional)
    - name: TEMP
      type: string
      description: Temperature value or ±offset

- id: fspeed
  label: Set Fan Speed
  kind: action
  params:
    - name: UID
      type: string
      description: UID (optional)
    - name: speed
      type: string
      description: v/V (quiet), l/L (low), m/M (medium), h/H (high), t/T (top), a/A (auto)

- id: swing
  label: Set Louver Position
  kind: action
  params:
    - name: UID
      type: string
      description: UID (optional)
    - name: position
      type: string
      description: h (horizontal), v (vertical), a (auto/swing), 3 (30°), 4 (45°), 6 (60°), - (stop)

- id: filt
  label: Reset Filter Sign
  kind: action
  params:
    - name: UID
      type: string
      description: UID (optional)

- id: ls
  label: List Indoor Unit Status
  kind: query
  params:
    - name: UID
      type: string
      description: UID (optional - omit for all visible)

- id: lsplus
  label: List All Indoor Units Including Invisible
  kind: query
  params: []

- id: ls2
  label: List Indoor Unit Status (Decimal Precision)
  kind: query
  params:
    - name: UID
      type: string
      description: UID (optional)

- id: query
  label: Query Indoor Unit Property
  kind: query
  params:
    - name: UID_STRICT
      type: string
      description: Indoor unit UID (Ln.XYY)
    - name: property
      type: string
      description: "o" (on/off), "m" (mode), "f" (fan speed), "t" (set temp), "e" (failure), "a" (ambient temp), "h" (set temp 0.01°), "s" (louver)

- id: wh
  label: Query Water Heater Status
  kind: query
  params:
    - name: UID_STRICT
      type: string
      description: Water Heater UID

- id: wh_control
  label: Control Water Heater
  kind: action
  params:
    - name: UID_STRICT
      type: string
      description: Water Heater UID
    - name: operation
      type: string
      description: "h" (heat), "e" (eco), "w" (hot), "a" (anti-freeze), "t[+|-|temp]" (tank), "b[+|-]" (booster)

- id: main_list
  label: List Main RC Settings
  kind: query
  params:
    - name: Ln
      type: string
      description: Line (optional)

- id: main_set
  label: Set Main RC
  kind: action
  params:
    - name: UID_STRICT
      type: string
      description: Indoor unit UID
    - name: value
      type: integer
      description: 0=not main RC, 1=main RC

- id: vam
  label: Query Ventilation Unit
  kind: query
  params:
    - name: UID_STRICT
      type: string
      description: Ventilation unit UID

- id: vam_list
  label: List Ventilation Units
  kind: query
  params: []

- id: vam_control
  label: Control Ventilation Unit
  kind: action
  params:
    - name: UID_STRICT
      type: string
      description: Ventilation unit UID
    - name: mode
      type: string
      description: "a" (auto), "b" (bypass), "x" (heat exchange), "n" (normal), "l" (low), "L" (low fresh-up), "h" (high), "H" (high fresh-up), "s" (super high), "t" (top), "A" (auto fan), "+" (on), "-" (off)

- id: lock_query
  label: Query Lock Status
  kind: query
  params:
    - name: UID_STRICT
      type: string
      description: Indoor unit UID

- id: lock_set
  label: Set Lock
  kind: action
  params:
    - name: UID
      type: string
      description: Indoor unit UID
    - name: locks
      type: string
      description: Lock options (+/- followed by o/m/t/n)

- id: inhibit
  label: Set Inhibit
  kind: action
  params:
    - name: UID
      type: string
      description: UID (optional - omit for all)
    - name: value
      type: integer
      description: 0=disable, 1=enable

- id: group
  label: List Groups
  kind: query
  params: []

- id: group_create
  label: Create Group
  kind: action
  params:
    - name: UID1_STRICT
      type: string
      description: Leader UID
    - name: UID2_STRICT
      type: string
      description: Follower UID

- id: group_delall
  label: Delete All Groups
  kind: action
  params:
    - name: delall
      type: string
      description: Must be literal "delall"

- id: group_delete
  label: Delete Group
  kind: action
  params:
    - name: G
      type: integer
      description: Group number (prefix with -)

- id: group_ram
  label: Create Group Database
  kind: action
  params:
    - name: R
      type: integer
      description: Number of groups

- id: va
  label: List VA Associations
  kind: query
  params: []

- id: va_auto
  label: Auto-associate VA
  kind: action
  params:
    - name: auto
      type: string
      description: Must be literal "auto"

- id: va_delall
  label: Delete All VA Associations
  kind: action
  params:
    - name: delall
      type: string
      description: Must be literal "delall"

- id: va_delete
  label: Delete VA Association
  kind: action
  params:
    - name: uid_or_va
      type: string
      description: UID_STRICT or VA number (prefix with -)

- id: va_ram
  label: Create VA Database
  kind: action
  params:
    - name: R
      type: integer
      description: Number of associations

- id: va_create
  label: Create VA Association
  kind: action
  params:
    - name: UID_STRICT
      type: string
      description: Indoor unit UID
    - name: VA
      type: integer
      description: Virtual address (001-200)
```

## Feedbacks
```yaml
- id: exit_code
  type: enum
  values:
    - "0 OK"
    - "1 No UID"
    - "2 Not Strict UID"
    - "3 Bad Format"
    - "4 Failed"
    - "5 Line Unused"
    - "6 Unknown Command"
    - "7 Bad HVAC Line"
    - "8 Bad Function"
    - "9 Bad Line Type"
    - "10 Bad Parameter"
    - "11 OK, Boot Required!"
    - "12 Bad GPIO"
    - "13 SDDP Disabled"
    - "14 Virtual Address In Use"
    - "15 Bad Property"
    - "16 Number of lines exceeded"
    - "17 Warning! Dip Switch State Incorrect"
    - "18 SDDP Not Initialized"
    - "80-86 ModBus Errors"
    - "100 Collision"
    - "101 Unsupported Feature"
    - "102 Incorrect Indoor Type"
    - "103 No ACK From Indoor"
    - "104 Time Out on Receive"
    - "105 CS Error In Received Message"
    - "106 Line Init In Progress"
    - "107 Line Error"
    - "108 Feed Disabled"
    - "150 HDL Not Initialized"
    - "151 HDL DB Overflow"
    - "152 HDL Eth Disabled"
    - "200-206 Indoor/Group/VA/Properties DB Errors"
    - "250 Link DB Overflow"
    - "251 No CoolHub Line"
    - "252 Auto Visibility Failed"
    - "253 Link already exists"
    - "307 KNX DB Overflow"
    - "309 KNX Not Connected"
    - "310 KNX Line Not Started"

- id: indoor_status_celsius
  type: string
  description: Status line format "L2.102 OFF 20C 27C High Cool OK - 0" - UID(0-5), On/Off(7-9), SetTemp(11-12), RoomTemp(15-16), FanSpeed(19-22), Mode(24-27), FailureCode(29-32), FilterSign(34), Demand(36)

- id: indoor_status_fahrenheit
  type: string
  description: Same format with Fahrenheit temperatures

- id: indoor_status_decimal_celsius
  type: string
  description: ls2 format "L1.102 ON  16.9C 27.0C High Cool OK - 0"

- id: indoor_status_decimal_fahrenheit
  type: string
  description: ls2 format with Fahrenheit
```

## Variables
```yaml
# UNRESOLVED: source does not enumerate explicit "settable parameters" separate from commands
# All settable parameters are covered by Actions above
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications from device
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step command sequences as macros
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

- UID format: `Ln.XYY` where L=line (L1-L8, L* for any), X=encoded high digit for 4-digit HVAC systems, YY=indoor number. Example: `L1.102`.
- Commands terminated with `<CR><LF>` or single `<CR>`. Responses terminated with `<CR><LF>`.
- Prompt character `>` sent on RS232; configurable on TCP aserver.
- aserver max 16 simultaneous connections, default port 10102.
- HVAC Lines L1/L5 share resources (mutually exclusive); L2/L6 share resources.
- L3 defaults to ModBus RTU RS485; L6/L7 can be linked into single L7 with polarity auto-detection.
- Temperature precision varies by HVAC brand: DK/ME/SM=0.1°C, FJ/SA/TO/PN/MH/LG=0.5°C, HT/GR/MD/CG/KT/TR/TI/MT/BSM=1°C.
- 4-digit indoor unit encoding uses hex-like scheme (0-9, A-F for first digit).
- Exit codes include both CoolMaster native (0-18) and HVAC-specific errors (100-253) and ModBus errors (80-86).
- KNX group functions: onoff (1.001), ST/RT (9.001), Mode (1.001), Fstep/F8/F% (1.001/5.010/5.001).
- Supported HVAC brands: Daikin, Mitsubishi Electric, Mitsubishi Heavy, Fujitsu, Sanyo, Toshiba, Panasonic, Hitachi, Haier, LG, Samsung, Gree, Midea, Kentatsu, Chigo, Blue Star, TICA, Trane.

<!-- UNRESOLVED: firmware version not stated in source -->
<!-- UNRESOLVED: entity_id is placeholder — operator must fill from Convex dashboard -->
<!-- UNRESOLVED: no unsolicited events documented — device may send responses only on commands -->
<!-- UNRESOLVED: no macro definitions in source -->
<!-- UNRESOLVED: no safety warnings or interlock procedures in source -->

## Provenance

```yaml
source_domains:
  - coolautomation.com
source_urls:
  - https://coolautomation.com/Lib/doc/prm/CoolAutomation-PRM-CoolMaster-v4.06.pdf
retrieved_at: 2026-05-04T18:05:10.825Z
last_checked_at: 2026-05-27T15:36:45.109Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-27T15:36:45.109Z
matched_actions: 90
action_count: 90
confidence: high
summary: "All 90 spec actions matched literally to source command reference; transport parameters confirmed (TCP 10102, serial 9600/8N1); complete coverage of CoolMaster ASCII I/F protocol."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
