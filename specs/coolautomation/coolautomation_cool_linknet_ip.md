---
spec_id: admin/coolautomation-cool-linknet
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
  - support.coolautomation.com
source_urls:
  - https://support.coolautomation.com/hc/en-us/article_attachments/17317574262557/CM5-PRM.pdf
  - https://support.coolautomation.com/hc/en-us/articles/4987468741789-ModBus-Integration-Guidelines
  - https://support.coolautomation.com/hc/en-us/articles/4987523432221-REST-API-Integration-2019
  - https://support.coolautomation.com/hc/en-us/articles/29441867901853-Modbus-Server-Integration-Registers-Sample
  - https://support.coolautomation.com/hc/en-us/articles/4987429359005-BACnet-Integration-Guidelines
retrieved_at: 2026-05-27T13:24:45.663Z
last_checked_at: 2026-06-02T00:05:10.635Z
generated_at: 2026-06-02T00:05:10.635Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Cool Linknet-specific model number / SKU not stated in source; the source uses the broader CoolMaster Product Line PRM that includes CooLinkNet."
  - "source describes no unsolicited event stream; only the aserver prompt"
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "Cool Linknet-specific hardware revisions, SKU variants, and any firmware version compatibility notes are not stated in the source. The PRM covers the broader CoolMaster Product Line."
verification:
  verdict: verified
  checked_at: 2026-06-02T00:05:10.635Z
  matched_actions: 87
  action_count: 87
  confidence: medium
  summary: "All 87 spec actions match verbatim source commands and both transport parameters (port 10102, 9600 8N1) are confirmed in the source. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# CoolAutomation Cool Linknet Control Spec

## Summary
CoolAutomation Cool Linknet is a CoolMaster Product Line gateway that bridges HVAC indoor units on L1–L8 to a control system over RS-232 (DB9) and/or TCP/IP Ethernet using a text-based ASCII I/F protocol. This spec covers both transports: the ASCII I/F IP Server ("aserver") on TCP port 10102 and the RS-232 DB9 interface at 9600 8N1.

<!-- UNRESOLVED: Cool Linknet-specific model number / SKU not stated in source; the source uses the broader CoolMaster Product Line PRM that includes CooLinkNet. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 10102
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
- powerable       # inferred from on/off/allon/alloff command examples
- routable        # inferred from line/sddp/hdl routing command examples
- queryable       # inferred from ls/ls2/query/ifconfig/set query examples
- levelable       # inferred from temp/feed/fspeed level-setting command examples
```

## Actions
```yaml
# Configuration Commands (section 6.2.1)
- id: set
  label: Get/Set Cool Linknet settings
  kind: action
  command: "set [SETTING] [VALUE]"  # e.g. "set echo 0", "set aserverport 12345"
  params:
    - name: setting
      type: string
      description: Setting name (S/N, version, app, baud, echo, verbose, aserverport, aserverprompt, deg, melody, filter visi, HVAC lines, mmi lock)
    - name: value
      type: string
      description: Setting value (defaults: baud 9600, aserverport 10102, echo 1, verbose 0)

- id: set_defaults
  label: Restore all settings to defaults
  kind: action
  command: "set defaults"
  params: []

- id: line_query
  label: Query HVAC lines status
  kind: query
  command: "line"
  params: []

- id: line_set
  label: Set HVAC line configuration
  kind: action
  command: "line PROPERTY Ln VAL"  # e.g. "line master L4 0", "line baud L3 19200 8E1"
  params:
    - name: property
      type: string
      description: master, simul, myid, baud, type, scan, DCOUT, slink, haux
    - name: line
      type: string
      description: L1..L8
    - name: value
      type: string
      description: Property value

- id: ifconfig_query
  label: Query Ethernet network configuration
  kind: query
  command: "ifconfig"
  params: []

- id: ifconfig_set
  label: Set Ethernet network configuration
  kind: action
  command: "ifconfig PROPERTY VALUE"  # e.g. "ifconfig IP 192.168.1.102"
  params:
    - name: property
      type: string
      description: IP, Netmask, Gateway, DNS1, DNS2
    - name: value
      type: string
      description: IP address string, or "DHCP"

- id: ifconfig_enable
  label: Enable Ethernet
  kind: action
  command: "ifconfig enable"
  params: []

- id: ifconfig_disable
  label: Disable Ethernet
  kind: action
  command: "ifconfig disable"
  params: []

- id: boot
  label: Enter Boot Mode
  kind: action
  command: "boot"
  params: []

- id: boot_reset
  label: Reset Cool Linknet
  kind: action
  command: "boot 2"
  params: []

- id: sddp_query
  label: Query SDDP module status
  kind: query
  command: "sddp"
  params: []

- id: sddp_enable
  label: Persistently enable SDDP module (effective after reset)
  kind: action
  command: "sddp enable"
  params: []

- id: sddp_disable
  label: Persistently disable SDDP module (effective after reset)
  kind: action
  command: "sddp disable"
  params: []

- id: sddp_identify
  label: Send SDDP IDENTIFY message to Control4 Composer
  kind: action
  command: "sddp identify"
  params: []

- id: sddp_offline
  label: Signal Cool Linknet going offline
  kind: action
  command: "sddp offline"
  params: []

- id: sddp_alive
  label: Signal Cool Linknet online
  kind: action
  command: "sddp alive"
  params: []

- id: knx_query
  label: Query KNX status
  kind: query
  command: "knx"
  params: []

- id: knx_addr
  label: Set KNX physical address
  kind: action
  command: "knx addr AREA/LINE/DEVICE"
  params:
    - name: address
      type: string
      description: KNX area/line/device address (e.g. 1/1/1)

- id: knx_ram
  label: Create KNX group Data Base (effective after reboot)
  kind: action
  command: "knx ram R"
  params:
    - name: count
      type: integer
      description: Number of KNX groups

- id: knx_funcs
  label: List all available KNX group functions
  kind: query
  command: "knx funcs"
  params: []

- id: knx_group
  label: List existing KNX groups
  kind: query
  command: "knx group"
  params: []

- id: knx_group_address
  label: List KNX groups for given group address
  kind: query
  command: "knx group GA"
  params:
    - name: ga
      type: string
      description: KNX group address (Main/Mid/Sub or Main/Sub)

- id: knx_group_create
  label: Create new KNX group linking GA to function and UID
  kind: action
  command: "knx group GA FUNC DIRECTION UID"  # e.g. "knx group 10/0/1 M < L1.100"
  params:
    - name: ga
      type: string
    - name: function
      type: string
      description: onoff, ST, RT, Mode, M, Fstep, F8, F%
    - name: direction
      type: string
      description: "<" (input to Cool Linknet) or ">" (output from Cool Linknet)
    - name: uid
      type: string
      description: Indoor Unit UID (Ln.XYY)

- id: knx_group_delall
  label: Delete all KNX groups
  kind: action
  command: "knx group dellall"
  params: []

- id: knx_group_delete
  label: Delete KNX group number G
  kind: action
  command: "knx group -G"
  params:
    - name: g
      type: integer
      description: KNX group number to delete

- id: props_query
  label: List all stored Indoor Unit properties
  kind: query
  command: "props"
  params: []

- id: props_set
  label: Change Indoor Unit property
  kind: action
  command: "props UID_STRICT PROPERTY VAL"  # e.g. "props L6.204 name Kitchen", "props L1.101 mode +c+f+hx-h-d-hh-a"
  params:
    - name: uid
      type: string
      description: UID_STRICT in form Ln.XYY
    - name: property
      type: string
      description: name, visi, fspeed, mode, tlim, elock
    - name: value
      type: string
      description: Property value

- id: props_delall
  label: Erase all Indoor Unit properties and return to defaults
  kind: action
  command: "props delall"
  params: []

- id: link_query
  label: List existing links
  kind: query
  command: "link"
  params: []

- id: link_delall
  label: Delete all links
  kind: action
  command: "link delall"
  params: []

- id: link_delete
  label: Delete link number L
  kind: action
  command: "link -L"
  params:
    - name: l
      type: integer

- id: link_ram
  label: Create link Data Base for R groups (effective after reboot)
  kind: action
  command: "link ram R"
  params:
    - name: count
      type: integer

- id: link_create
  label: Create new link between two Indoor Units
  kind: action
  command: "link UID1_STRICT[=|~]UID2_STRICT"  # e.g. "link L3.082=L1.101"
  params:
    - name: uid1
      type: string
    - name: link_type
      type: string
      description: "=" regular link or "~" haux link
    - name: uid2
      type: string

- id: plug
  label: Forward ASCII I/F command to CoolPlug on CH line
  kind: action
  command: "plug UID_STRICT ASCII_IF_COMMAND"  # e.g. "plug L3.080 set"
  params:
    - name: uid
      type: string
    - name: command
      type: string
      description: ASCII I/F command to forward

- id: ad
  label: Forward ASCII I/F command to CMNET-GR-GMV5 device on GMV5 line
  kind: action
  command: "ad Ln ASCII_IF_COMMAND"  # e.g. "ad L8 set"
  params:
    - name: line
      type: string
      description: HVAC line (e.g. L8)
    - name: command
      type: string

- id: hdl_query
  label: List existing HDL AC configurations
  kind: query
  command: "hdl"
  params: []

- id: hdl_delall
  label: Delete all HDL AC configurations
  kind: action
  command: "hdl delall"
  params: []

- id: hdl_delete
  label: Delete HDL AC configuration for specific Indoor Unit
  kind: action
  command: "hdl - UID_STRICT"
  params:
    - name: uid
      type: string

- id: hdl_create
  label: Create HDL AC configuration for Indoor Unit
  kind: action
  command: "hdl + UID_STRICT CHANNEL AC_NO ENABLE m0m1m2m3m4f0f1f2f3"  # e.g. "hdl + L2.301 2 2 1 ++----+-+"
  params:
    - name: uid
      type: string
    - name: channel
      type: integer
    - name: ac_no
      type: integer
    - name: enable
      type: integer
      description: 0 invalid, 1 valid
    - name: modes_fans
      type: string
      description: m0=cool m1=heat m2=fan m3=auto m4=dry f0=auto f1=high f2=medium f3=low; + allowed, - not allowed

- id: hdl_eth_query
  label: Print HDL ethernet status and packet counters
  kind: query
  command: "hdl eth"
  params: []

- id: hdl_eth_enable
  label: Enable HDL over ethernet (effective after reboot)
  kind: action
  command: "hdl eth enable"
  params: []

- id: hdl_eth_disable
  label: Disable HDL over ethernet (effective after reboot)
  kind: action
  command: "hdl eth disable"
  params: []

- id: hdl_eth_myid
  label: Change HDL Subnet/Device ID in hex (effective after reboot)
  kind: action
  command: "hdl eth myid ID"  # e.g. "hdl eth myid 0163"
  params:
    - name: id
      type: string
      description: 4 hex digits; MS byte = Subnet ID, LS byte = Device ID

- id: simul
  label: Simulate CNT Indoor Units on HVAC Line Ln (not persistent across reset)
  kind: action
  command: "simul [Ln] CNT"  # e.g. "simul L2 5"
  params:
    - name: line
      type: string
      description: L1..L8 (optional; default = first not Unused line)
    - name: count
      type: integer

- id: gpio_query
  label: Query GPIO functionality
  kind: query
  command: "gpio"
  params: []

- id: gpio_func
  label: Set GPIO function (effective after reboot)
  kind: action
  command: "gpio func NAME FUNCTION"  # e.g. "gpio func A Unused"
  params:
    - name: name
      type: string
      description: A, B, C, or D
    - name: function
      type: string
      description: Unused, ALL OFF, ALL ON, OOS, ALL INH, FLRS, BI, BO, AI

- id: gpio_norm
  label: Set GPIO normal signal level state
  kind: action
  command: "gpio norm NAME STATE"  # e.g. "gpio norm A C"
  params:
    - name: name
      type: string
      description: A, B, C, or D
    - name: state
      type: string
      description: "c/C" = N.C. (Normally Closed), "o/O" = N.O. (Normally Open)

- id: info
  label: Query DIP switches position and DC output on L1/L2
  kind: query
  command: "info"
  params: []

- id: modbus_query
  label: Query ModBus configurations
  kind: query
  command: "modbus"
  params: []

- id: modbus_set
  label: Set ModBus setting
  kind: action
  command: "modbus SETTING VALUE"  # e.g. "modbus IP enable", "modbus server port 500"
  params:
    - name: setting
      type: string
      description: IP, server port, ignore
    - name: value
      type: string

- id: modbus_cg4
  label: List CoolGate 4 ModBus addresses of existing Indoor Units
  kind: query
  command: "modbus cg4"
  params: []

# HVAC Status and Control Commands (section 6.2.2)
- id: on
  label: Turn on Indoor Unit(s)
  kind: action
  command: "on [UID]"  # e.g. "on L1.102", "on L2*", "on"
  params:
    - name: uid
      type: string
      description: UID (Ln.XYY, Ln*, or omitted for all)

- id: allon
  label: Turn on all Indoor Units
  kind: action
  command: "allon"
  params: []

- id: off
  label: Turn off Indoor Unit(s)
  kind: action
  command: "off [UID]"  # e.g. "off L1.102", "off L2*", "off"
  params:
    - name: uid
      type: string

- id: alloff
  label: Turn off all Indoor Units
  kind: action
  command: "alloff"
  params: []

- id: cool
  label: Set operation mode to Cool
  kind: action
  command: "cool [UID]"  # e.g. "cool L1.102", "cool L2*", "cool"
  params:
    - name: uid
      type: string

- id: heat
  label: Set operation mode to Heat
  kind: action
  command: "heat [UID]"  # e.g. "heat L1.102", "heat L2*", "heat"
  params:
    - name: uid
      type: string

- id: fan_mode
  label: Set operation mode to Fan
  kind: action
  command: "fan [UID]"  # e.g. "fan L1.102", "fan L2*", "fan"
  params:
    - name: uid
      type: string

- id: dry
  label: Set operation mode to Dry
  kind: action
  command: "dry [UID]"  # e.g. "dry L1.102", "dry L2*", "dry"
  params:
    - name: uid
      type: string

- id: auto
  label: Set operation mode to Auto
  kind: action
  command: "auto [UID]"  # e.g. "auto L1.102", "auto L2*", "auto"
  params:
    - name: uid
      type: string

- id: temp
  label: Set Indoor Unit Set Temperature
  kind: action
  command: "temp [UID] [±]TEMP"  # e.g. "temp L1.102 23", "temp L2* -2", "temp L2* 24.5"
  params:
    - name: uid
      type: string
    - name: temperature
      type: string
      description: "[±]nn or nn.n (precision depends on AC type: 0.1, 0.3, 0.5 or 1 °C)"

- id: feed
  label: Suggest Ambient Temperature to Indoor Unit(s)
  kind: action
  command: "feed [UID] [±]TEMP"  # e.g. "feed L1.102 23.5", "feed L2* -2"
  params:
    - name: uid
      type: string
    - name: temperature
      type: string
      description: "[±]nn or nn.n; 0 stops suggesting"

- id: fspeed
  label: Set Indoor Unit Fan Speed
  kind: action
  command: "fspeed [UID] SPEED"  # e.g. "fspeed L1.102 l", "fspeed L2* h", "fspeed m"
  params:
    - name: uid
      type: string
    - name: speed
      type: string
      description: "v/V very-low, l/L low, m/M medium, h/H high, t/T top, a/A auto"

- id: swing
  label: Set Indoor Unit louver position
  kind: action
  command: "swing [UID] POSITION"  # e.g. "swing L1.102 h", "swing 3"
  params:
    - name: uid
      type: string
    - name: position
      type: string
      description: "h horizontal, v vertical, a auto, 3 30°, 4 45°, 6 60°, - stop swing"

- id: filt
  label: Reset Filter Sign
  kind: action
  command: "filt [UID]"  # e.g. "filt L1.102", "filt L2*", "filt"
  params:
    - name: uid
      type: string

- id: ls
  label: List Indoor Unit(s) status (visible only)
  kind: query
  command: "ls [UID]"  # e.g. "ls L2", "ls L2.101"
  params:
    - name: uid
      type: string

- id: ls_all
  label: List all Indoor Unit(s) status including invisible ones
  kind: query
  command: "ls+"  # or "ls" with no UID but listed from example
  params: []

- id: ls2
  label: List Indoor Unit(s) status with decimal temperature precision
  kind: query
  command: "ls2 [UID]"  # e.g. "ls2 L2", "ls2 L2.101"
  params:
    - name: uid
      type: string

- id: query
  label: Query one operation condition of an Indoor Unit
  kind: query
  command: "query UID_STRICT CONDITION"  # e.g. "query L1.100 o"
  params:
    - name: uid
      type: string
      description: UID_STRICT in form Ln.XYY
    - name: condition
      type: string
      description: "o On/Off, m Mode, f Fan Speed, t Set Temp, e Failure Code, a Ambient Temp, h Set Temp 0.01°, s Louver Position"

- id: wh
  label: Control Water Heater Unit (ME / P1P2 Altherma)
  kind: action
  command: "wh UID_STRICT [OP]"  # e.g. "wh L1.101 w", "wh L4.000 t40", "wh L4.000 t+", "wh L4.000 b+", "wh L4.000"
  params:
    - name: uid
      type: string
    - name: operation
      type: string
      description: "h heat, e eco, w hot, a anti-freeze, t<+|-> or t<temp> tank, b<+|-> booster, (no letter) print status"

- id: main_query
  label: List main RC setting on a line
  kind: query
  command: "main Ln"  # e.g. "main L2"
  params:
    - name: line
      type: string

- id: main_set
  label: Change Daikin Indoor Unit main RC setting
  kind: action
  command: "main UID_STRICT 0|1"  # e.g. "main L2.206 0", "main L2.201 1"
  params:
    - name: uid
      type: string
    - name: value
      type: integer
      description: "0 unset, 1 set as main RC"

- id: vam
  label: Control Ventilation Unit
  kind: action
  command: "vam [UID_STRICT] OP"  # e.g. "vam L1.101 x", "vam L1.101 +"
  params:
    - name: uid
      type: string
    - name: operation
      type: string
      description: "a auto, b bypass, x heat-exchange, n normal, S sleep, l low fan, L low-fan fresh-up, h high fan, H high-fan fresh-up, s super-high, t top, A auto fan, + on, - off"

- id: lock_query
  label: Query locks for specific or all Indoor Units
  kind: query
  command: "lock [UID_STRICT]"  # e.g. "lock L1.103", "lock L2.101"
  params:
    - name: uid
      type: string

- id: lock_set
  label: Lock/Unlock Indoor Unit(s)
  kind: action
  command: "lock [UID] [-|+][o|m|t|n]"  # e.g. "lock L1.102 +m-t", "lock L5.002 +"
  params:
    - name: uid
      type: string
    - name: lock_ops
      type: string
      description: "Full +/- = lock/unlock all; o on/off, m mode, t setpoint, n on"

- id: inhibit
  label: Force Indoor Unit(s) to OFF state
  kind: action
  command: "inhibit [UID] 0|1"  # e.g. "inhibit L1.102 1", "inhibit 0"
  params:
    - name: uid
      type: string
    - name: value
      type: integer
      description: "1 enable inhibit, 0 remove inhibit"

- id: group_query
  label: List existing groups
  kind: query
  command: "group"
  params: []

- id: group_create
  label: Create new group; UID2 will follow UID1
  kind: action
  command: "group UID1_STRICT UID2_STRICT"  # e.g. "group L5.001 L5.002"
  params:
    - name: uid1
      type: string
    - name: uid2
      type: string

- id: group_delete
  label: Delete group number G
  kind: action
  command: "group -G"
  params:
    - name: g
      type: integer

- id: group_delall
  label: Delete all groups
  kind: action
  command: "group delall"
  params: []

- id: group_ram
  label: Create group Data Base for R groups (effective after reboot)
  kind: action
  command: "group ram R"
  params:
    - name: count
      type: integer

- id: va_query
  label: List all VA associations
  kind: query
  command: "va"
  params: []

- id: va_auto
  label: Automatically associate VA's with existing (visible) UID's
  kind: action
  command: "va auto"
  params: []

- id: va_delall
  label: Delete all VA associations
  kind: action
  command: "va delall"
  params: []

- id: va_ram
  label: Create VA Data Base for R associations (effective after reboot)
  kind: action
  command: "va ram R"
  params:
    - name: count
      type: integer

- id: va_delete
  label: Delete VA association by UID or VA number
  kind: action
  command: "va - UID_STRICT|VA"  # e.g. "va - L1.100", "va - 4"
  params:
    - name: target
      type: string
      description: UID_STRICT or VA number

- id: va_add
  label: Add new VA association
  kind: action
  command: "va + UID_STRICT VA"  # e.g. "va + L1.100 7"
  params:
    - name: uid
      type: string
    - name: va
      type: integer
```

## Feedbacks
```yaml
- id: on_off
  type: enum
  values: [on, off]

- id: set_temperature
  type: number
  description: Set Temperature in current scale (Celsius or Fahrenheit per `deg` setting); precision 0.1, 0.3, 0.5 or 1 °C depending on AC type

- id: room_temperature
  type: number
  description: Ambient temperature in current scale

- id: fan_speed
  type: enum
  values: [vlow, low, med, high, top, auto]

- id: operation_mode
  type: enum
  values: [cool, heat, fan, dry, auto]

- id: failure_code
  type: string
  description: "OK = no failure, otherwise Indoor Failure Code (e.g. U4)"

- id: filter_sign
  type: enum
  values: ["-", "#"]

- id: demand
  type: enum
  values: ["0", "1"]

- id: louver_position
  type: enum
  values: [h, v, a, "3", "4", "6", x]

- id: exit_code
  type: object
  description: Numeric `ERROR:N` or verbose form per section 6.1.2; e.g. 0 OK, 1 No UID, 6 Unknown Command, 18 SDDP Not Initialized
```

## Variables
```yaml
- id: aserverport
  type: integer
  description: ASCII I/F IP Server TCP port (default 10102)

- id: baud
  type: integer
  description: RS232 interface baud rate (default 9600, range 1200...115200)

- id: echo
  type: enum
  values: ["0", "1"]
  description: RS232 echo control; 0 disabled, 1 enabled (default 1)

- id: verbose
  type: enum
  values: ["0", "1"]
  description: Exit code format; 0 numeric, 1 verbose (default 0)

- id: aserverprompt
  type: enum
  values: ["0", "1"]
  description: ASCII I/F IP Server prompt character; 0 disabled, 1 enabled (default 1)

- id: deg
  type: enum
  values: [C, F]
  description: Temperature scale (C Celsius or F Fahrenheit) used for `temp`, `feed` and `ls` output

- id: mmi_lock
  type: enum
  values: ["0", "1"]
  description: Prohibit LCD touch screen operation (firmware ≥ 1.3.0)

- id: ip_address
  type: string
  description: Ethernet IP address; "DHCP" or static IPv4 string (set via `ifconfig IP`)

- id: netmask
  type: string
  description: Ethernet netmask (set via `ifconfig Netmask`)

- id: gateway
  type: string
  description: Ethernet gateway (set via `ifconfig Gateway`)

- id: dns1
  type: string
  description: Preferred DNS server (set via `ifconfig DNS1`)

- id: dns2
  type: string
  description: Alternate DNS server (set via `ifconfig DNS2`)

- id: modbus_ip_enabled
  type: enum
  values: [enable, disable]
  description: ModBus IP server state (effective after reboot)

- id: modbus_server_port
  type: integer
  description: ModBus IP server port (default 502)
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited event stream; only the aserver prompt
# character `>` is sent upon connection when enabled. No asynchronous event tokens
# (e.g. status change notifications) are documented.
```

## Macros
```yaml
# No multi-step sequences are explicitly described in the source. The Cool Linknet
# itself is a gateway and does not define macro sequences of its own.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements specific to the Cool Linknet unit. Per-HVAC
# line interactions (e.g. inhibit forcing Indoor Unit OFF) are operational, not
# safety-critical.
```

## Notes
- The source document is the CoolMaster Product Line PRM, which the manufacturer explicitly states applies to CooLinkNet ("Communication between DTE and CooLinkNet via ASCII I/F..."). All commands above are therefore sourced from the CoolMaster PRM, not a Cool Linknet-specific manual.
- Two transports available: RS-232 (DB9 female, 9600 8N1, no flow control) and TCP/IP Ethernet. Both use the same ASCII I/F command set.
- ASCII I/F framing: commands to the device end with `<CR><LF>` or single `<CR>` (0x0D / 0x0A / 0x0D). Responses end with `<CR><LF>`. Commands are case-sensitive; the only separator between command name and parameters is a single space (0x20).
- Prompt character: RS-232 unconditionally sends `>` after each response. Aserver prompt (`>`) is configurable via `set aserverprompt` and is enabled by default.
- Exit codes can be returned as `ERROR:N` (numeric) or verbose text per section 6.1.2; the `verbose` setting toggles between them.
- The `ls` and `ls2` commands return fixed-position status strings (see field-position tables in source). `ls2` adds decimal temperature precision.
- The `query` command supports conditions: o (On/Off), m (Mode), f (Fan Speed), t (Set Temperature natural), e (Failure Code), a (Ambient Temperature), h (Set Temperature 0.01°), s (Louver Position).
- Set Temperature precision varies by HVAC type: 0.1 °C (DK, ME, SM), 0.3 °C (FJ), 0.5 °C (SA, TO, PN, MH, LG), 1 °C (HT, GR, MD, CG, KT, TR, TI, MT, BSM).
- `feed` (Ambient Temperature suggestion) is supported only for AC types ME, PBM, SI (firmware ≥ 0.4.7), EL, GRNS, UMM (GS538/9, SMT-HOA).
- Line L3 is by default used for ModBus RTU RS485 and can also be shared with KNX, PlugBus (CoolHub), HDL buspro 4-wire, and ModBus RTU CoolGate 4/5.
- Cool Linknet maintains a constant cloud connection to CoolRemote when TCP/IP networking has internet access.
- The `props` command can set `elock` (Enforced Lock) on Indoor Units to inhibit external changes for: o (On/Off), m (Mode), t (Setpoint), c (Forced Cool), h (Forced Heat).

<!-- UNRESOLVED: Cool Linknet-specific hardware revisions, SKU variants, and any firmware version compatibility notes are not stated in the source. The PRM covers the broader CoolMaster Product Line. -->

## Provenance

```yaml
source_domains:
  - support.coolautomation.com
source_urls:
  - https://support.coolautomation.com/hc/en-us/article_attachments/17317574262557/CM5-PRM.pdf
  - https://support.coolautomation.com/hc/en-us/articles/4987468741789-ModBus-Integration-Guidelines
  - https://support.coolautomation.com/hc/en-us/articles/4987523432221-REST-API-Integration-2019
  - https://support.coolautomation.com/hc/en-us/articles/29441867901853-Modbus-Server-Integration-Registers-Sample
  - https://support.coolautomation.com/hc/en-us/articles/4987429359005-BACnet-Integration-Guidelines
retrieved_at: 2026-05-27T13:24:45.663Z
last_checked_at: 2026-06-02T00:05:10.635Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T00:05:10.635Z
matched_actions: 87
action_count: 87
confidence: medium
summary: "All 87 spec actions match verbatim source commands and both transport parameters (port 10102, 9600 8N1) are confirmed in the source. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Cool Linknet-specific model number / SKU not stated in source; the source uses the broader CoolMaster Product Line PRM that includes CooLinkNet."
- "source describes no unsolicited event stream; only the aserver prompt"
- "source contains no explicit safety warnings, interlock procedures, or"
- "Cool Linknet-specific hardware revisions, SKU variants, and any firmware version compatibility notes are not stated in the source. The PRM covers the broader CoolMaster Product Line."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
