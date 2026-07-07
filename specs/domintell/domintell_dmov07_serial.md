---
spec_id: admin/domintell-dmov07
schema_version: ai4av-public-spec-v1
revision: 1
title: "Domintell Dmov07 Control Spec"
manufacturer: Domintell
model_family: Dmov07
aliases: []
compatible_with:
  manufacturers:
    - Domintell
  models:
    - Dmov07
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro.mydomintell.com
  - pro2.mydomintell.com
source_urls:
  - https://pro.mydomintell.com/share/manual/DETH0x/DS_RS232_ETH_Interfaces_v1_27_02.pdf
  - https://pro2.mydomintell.com/share/manual/DETH02-DRS23202/DS_RS232_ETH_Interfaces_v1_19_17.pdf
retrieved_at: 2026-07-03T08:52:02.971Z
last_checked_at: 2026-07-07T11:35:03.625Z
generated_at: 2026-07-07T11:35:03.625Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source documents the DRS2320x / DETH0x gateway family. No module named \"Dmov07\" appears in the source text; the spec is authored against the family-level Light Protocol."
  - "firmware version compatibility ranges (v15 DRS23202, v7 DETH02) are stated only for multi-module installations, not as a blanket floor requirement."
  - "source enumerates output Light Protocol frames but does not name a single"
  - "source does not document a macro/sequencing layer at the protocol surface."
  - "source describes the DRS2320x / DETH0x gateway family in general terms but does not name \"Dmov07\" anywhere. Treat the spec as authoritative for the family and assess against actual hardware before publication."
  - "source does not provide a Tx/Rx command timing budget beyond the 5–100 ms DETH02 reply range."
  - "fault behavior, error-recovery sequences, and watchdog semantics are not documented."
  - "percent value encoding for the older `%D00` / `%D01` syntax on SYS Regulation appears inconsistent in the source (mixed zero-padding). Treat values as integers, validate against the actual device."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:35:03.625Z
  matched_actions: 70
  action_count: 70
  confidence: medium
  summary: "All 70 spec actions matched literally in source; transport fully verified; coverage is complete. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-03
---

# Domintell Dmov07 Control Spec

## Summary
Light-protocol RS-232 / Ethernet interface for the Domintell home-automation bus. Third-party software exchanges ASCII Light Protocol frames with the host over serial or UDP; variant modules (DRS23201, DRS23202, DETH02) expose configuration-string I/O, hex I/O, and session-managed IP control respectively.

<!-- UNRESOLVED: source documents the DRS2320x / DETH0x gateway family. No module named "Dmov07" appears in the source text; the spec is authored against the family-level Light Protocol.

UNRESOLVED: firmware version compatibility ranges (v15 DRS23202, v7 DETH02) are stated only for multi-module installations, not as a blanket floor requirement. -->

## Transport
```yaml
protocols:
  - serial
  - udp
serial:
  baud_rate: 57600  # DRS23202 fixed; DRS23201 selectable: 1200, 2400, 4800, 9600, 19200, 38400, 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 17481  # DETH02 default; source notes "can be changed"
auth:
  type: password  # DETH02: "Possibility to set a password"; DRS23202: no auth described
```

**Notes on transport:**
- DB-9 wiring: TX = pin 2, RX = pin 3, GND = pin 5; pins 1/7/8/9 = NC; pins 4/6 reserved (handshake, unused).
- Recommended cable: straight female-male DB9 to a computer, null-modem male-male DB9 to a target device such as a projector.
- DETH02: UDP only, single concurrent client.
- Inter-frame gap on RS-232: minimum 25 ms OR use the reserved `&` character.
- Maximum Light Protocol message length: 30 characters.
- Reserved characters: `%` (starts additional parameters), `&` (frame concat / inter-message gap).

## Traits
```yaml
- queryable
- levelable
- routable
```

## Actions
```yaml
- id: ping
  label: Ping (DETH02)
  kind: action
  command: "PING"
  params: []
- id: mod_version_query
  label: Module Version Query
  kind: query
  command: "MOD_VERSION"
  params: []
- id: login
  label: Login (DETH02)
  kind: action
  command: "LOGIN"
  params: []
- id: login_with_password
  label: Login with Password (DETH02)
  kind: action
  command: "LOGIN{encrypted}"
  params:
    - name: encrypted
      type: string
      description: Password encrypted with libdeth 2.0+ deth_encryptpsw(), 4-10 ASCII chars; SDK appends "LOGIN" suffix
- id: logout
  label: Logout (DETH02)
  kind: action
  command: "LOGOUT"
  params: []
- id: hello
  label: Keep Session Open (DETH02)
  kind: action
  command: "HELLO"
  params: []
- id: appinfo
  label: Download Module List (DETH02)
  kind: action
  command: "APPINFO"
  params: []
- id: help
  label: Help (DETH02)
  kind: query
  command: "HELP"
  params: []
- id: lp_dim_set
  label: Set Dimmer Percent (Light Protocol)
  kind: action
  command: "DIM{serial}-%D{percent}"
  params:
    - name: serial
      type: string
      description: 3-char module type (DIM) then 6-char hex serial (e.g. 19F), no space
    - name: output
      type: integer
      description: Output number (1-8) on DDIM01
    - name: percent
      type: integer
      description: Dimmer value 0-100 percent
- id: lp_dim_start
  label: Start Dim Ramp (Light Protocol)
  kind: action
  command: "DIM{serial}-{output}%DB"
  params:
    - name: serial
      type: string
      description: DDIM01 module serial, 6 hex chars
    - name: output
      type: integer
      description: Output number 1-8
- id: lp_dim_stop
  label: Stop Dim Ramp (Light Protocol)
  kind: action
  command: "DIM{serial}-{output}%DE"
  params:
    - name: serial
      type: string
      description: DDIM01 module serial, 6 hex chars
    - name: output
      type: integer
      description: Output number 1-8
- id: lp_dim_inc
  label: Increase Dimmer by Step (Light Protocol)
  kind: action
  command: "DIM{serial}-{output}%I%D{step}"
  params:
    - name: serial
      type: string
      description: DDIM01 module serial, 6 hex chars
    - name: output
      type: integer
      description: Output number 1-8
    - name: step
      type: integer
      description: Step in percent (clamps at 100)
- id: lp_dim_dec
  label: Decrease Dimmer by Step (Light Protocol)
  kind: action
  command: "DIM{serial}-{output}%O%D{step}"
  params:
    - name: serial
      type: string
      description: DDIM01 module serial, 6 hex chars
    - name: output
      type: integer
      description: Output number 1-8
    - name: step
      type: integer
      description: Step in percent (clamps at 0)
- id: lp_d10_set
  label: Set 0-10V Output Percent
  kind: action
  command: "D10{serial}-{output}%D{percent}"
  params:
    - name: serial
      type: string
      description: DOUT10V02 module serial, 6 hex chars
    - name: output
      type: integer
      description: Output number on DOUT10V02
    - name: percent
      type: integer
      description: Output value 0-100 percent
- id: lp_d10_inc
  label: Increase 0-10V Output by Step
  kind: action
  command: "D10{serial}-{output}%I%D{step}"
  params:
    - name: serial
      type: string
      description: DOUT10V02 module serial, 6 hex chars
    - name: output
      type: integer
      description: Output number on DOUT10V02
    - name: step
      type: integer
      description: Step in percent
- id: lp_d10_dec
  label: Decrease 0-10V Output by Step
  kind: action
  command: "D10{serial}-{output}%O%D{step}"
  params:
    - name: serial
      type: string
      description: DOUT10V02 module serial, 6 hex chars
    - name: output
      type: integer
      description: Output number on DOUT10V02
    - name: step
      type: integer
      description: Step in percent
- id: lp_dmx_set_channel
  label: Set DMX Channel Value (DDMX01)
  kind: action
  command: "DMX{serial}-{device}-{channel}%X{value_hex}"
  params:
    - name: serial
      type: string
      description: DDMX01 module serial, 6 hex chars
    - name: device
      type: integer
      description: DMX device slot
    - name: channel
      type: integer
      description: DMX channel within device
    - name: value_hex
      type: string
      description: DMX value 0x00-0xFF, as hex
- id: lp_dali_request
  label: DALI Ballast Request (DINTDALI01)
  kind: action
  command: "DAL{serial}-{address}%D{percent}"
  params:
    - name: serial
      type: string
      description: DINTDALI01 module serial, 6 hex chars
    - name: address
      type: string
      description: 2-hex-digit DALI address
    - name: percent
      type: integer
      description: Dimmer percent 0-100
- id: lp_bu_toggle
  label: Toggle DPBUxx Output
  kind: action
  command: "BU{n}{serial}-{output}"
  params:
    - name: n
      type: integer
      description: DPBU channel count 1/2/4/6
    - name: serial
      type: string
      description: 6 hex chars
    - name: output
      type: integer
      description: Output number 1-n
- id: lp_bu_status
  label: DPBUxx Input/Output Status Query
  kind: query
  command: "BU{n}{serial}%S"
  params:
    - name: n
      type: integer
      description: DPBU channel count 1/2/4/6
    - name: serial
      type: string
      description: 6 hex chars
- id: lp_trv_toggle
  label: Toggle Shutter (DTRV01)
  kind: action
  command: "TRV{serial}-{shutter}"
  params:
    - name: serial
      type: string
      description: DTRV01 serial, 6 hex chars
    - name: shutter
      type: integer
      description: Shutter number 1-4
- id: lp_trv_up
  label: Shutter Up (DTRV01)
  kind: action
  command: "TRV{serial}-{shutter}%H"
  params:
    - name: serial
      type: string
      description: DTRV01 serial, 6 hex chars
    - name: shutter
      type: integer
      description: Shutter number 1-4
- id: lp_trv_down
  label: Shutter Down (DTRV01)
  kind: action
  command: "TRV{serial}-{shutter}%L"
  params:
    - name: serial
      type: string
      description: DTRV01 serial, 6 hex chars
    - name: shutter
      type: integer
      description: Shutter number 1-4
- id: lp_trv_stop
  label: Shutter Stop (DTRV01)
  kind: action
  command: "TRV{serial}-{shutter}%O"
  params:
    - name: serial
      type: string
      description: DTRV01 serial, 6 hex chars
    - name: shutter
      type: integer
      description: Shutter number 1-4
- id: lp_bir_toggle
  label: Toggle DBIR01 Output
  kind: action
  command: "BIR{serial}-{output}"
  params:
    - name: serial
      type: string
      description: DBIR01 serial, 6 hex chars
    - name: output
      type: integer
      description: Output 1-8
- id: lp_bir_set
  label: Set DBIR01 Output
  kind: action
  command: "BIR{serial}-{output}%I"
  params:
    - name: serial
      type: string
      description: DBIR01 serial, 6 hex chars
    - name: output
      type: integer
      description: Output 1-8
- id: lp_bir_reset
  label: Reset DBIR01 Output
  kind: action
  command: "BIR{serial}-{output}%O"
  params:
    - name: serial
      type: string
      description: DBIR01 serial, 6 hex chars
    - name: output
      type: integer
      description: Output 1-8
- id: lp_amp_volume_set
  label: Set Amplifier Output Volume + Source
  kind: action
  command: "AMP{serial}-{output}%D{vol}%A{aux}"
  params:
    - name: serial
      type: string
      description: DAMPLI01 serial, 6 hex chars
    - name: output
      type: integer
      description: Output number on DAMPLI01
    - name: vol
      type: integer
      description: Volume 0-100 (decimal in source: 50, 60, ...)
    - name: aux
      type: integer
      description: Auxiliary source 1-4; 5 = Tuner
- id: lp_amp_tuner_set
  label: Set Amplifier Tuner Output
  kind: action
  command: "AMP{serial}-{output}%D{vol}%F{freq_mhz}%A{aux}"
  params:
    - name: serial
      type: string
      description: DAMPLI01 serial, 6 hex chars
    - name: output
      type: integer
      description: Output number on DAMPLI01
    - name: vol
      type: integer
      description: Volume 0-100
    - name: freq_mhz
      type: string
      description: Tuner frequency, decimal Mhz (e.g. 99.1)
    - name: aux
      type: integer
      description: Source, 5 = Tuner
- id: lp_amp_volume_inc
  label: Increase Amplifier Volume by Step
  kind: action
  command: "AMP{serial}-{output}%I%D{step}"
  params:
    - name: serial
      type: string
      description: DAMPLI01 serial, 6 hex chars
    - name: output
      type: integer
      description: Output number
    - name: step
      type: integer
      description: Step percent
- id: lp_amp_volume_dec
  label: Decrease Amplifier Volume by Step
  kind: action
  command: "AMP{serial}-{output}%O%D{step}"
  params:
    - name: serial
      type: string
      description: DAMPLI01 serial, 6 hex chars
    - name: output
      type: integer
      description: Output number
    - name: step
      type: integer
      description: Step percent
- id: lp_amp_status
  label: Amplifier Status Query
  kind: query
  command: "AMP{serial}%S"
  params:
    - name: serial
      type: string
      description: DAMPLI01 serial, 6 hex chars
- id: lp_sfeer_set
  label: Activate Sfeer (Scene)
  kind: action
  command: "SFE{n}"
  params:
    - name: n
      type: integer
      description: Scene number
- id: lp_sfeer_query
  label: Sfeer Item Status Query
  kind: query
  command: "SFE{n}%S"
  params:
    - name: n
      type: integer
      description: Scene number
- id: lp_var_toggle
  label: Toggle Software Variable
  kind: action
  command: "VAR{n}"
  params:
    - name: n
      type: integer
      description: Variable number in configuration appearance order
- id: lp_var_query
  label: Software Variable Status (status format inferred from output example)
  kind: action
  command: "VAR{n}%S"
  params:
    - name: n
      type: integer
      description: Variable number
- id: lp_sys_query
  label: System Variable Status Query
  kind: query
  command: "SYS{n}%S"
  params:
    - name: n
      type: integer
      description: System variable number
- id: lp_sys_temp_mode_set
  label: Set System Temperature Mode
  kind: action
  command: "SYS{n}%M{mode}"
  params:
    - name: n
      type: integer
      description: System variable number
    - name: mode
      type: integer
      description: Mode: 1=absence, 2=auto, 5=comfort, 6=frost
- id: lp_sys_reg_mode_set
  label: Set System Regulation Mode
  kind: action
  command: "SYS{n}%R{mode}"
  params:
    - name: n
      type: integer
      description: System variable number
    - name: mode
      type: integer
      description: Mode: 0=off, 1=heating, 2=cooling, 3=mixed
- id: lp_sys_reg_d_set
  label: Set System Regulation (D variant)
  kind: action
  command: "SYS{n}%D{code}"
  params:
    - name: n
      type: integer
      description: System variable number
    - name: code
      type: integer
      description: Code: 0=off, 01=heating, 2=cooling, 03=mixed
- id: lp_push_simulate
  label: Simulate Button Push
  kind: action
  command: "{MOD}{serial}-{input}%P{code}"
  params:
    - name: MOD
      type: string
      description: Module type mnemonic (BU1/BU2/BU4/BU6, IS4/IS8, PBL, PRL, ...)
    - name: serial
      type: string
      description: 6-char hex serial
    - name: input
      type: integer
      description: Input/button number
    - name: code
      type: integer
      description: 1=begin short, 2=end short, 3=begin long, 4=end long
- id: lp_module_status_query
  label: Generic Module Status Query
  kind: query
  command: "{MOD}{serial}%S"
  params:
    - name: MOD
      type: string
      description: Module type mnemonic
    - name: serial
      type: string
      description: 6-char hex serial
- id: lp_temperature_heat_set
  label: Set Heating Setpoint (TSC-class)
  kind: action
  command: "{MOD}{serial}%T{temp}"
  params:
    - name: MOD
      type: string
      description: DTSC module mnemonic (TSB, LT2, T35, ...)
    - name: serial
      type: string
      description: 6-char hex serial
    - name: temp
      type: string
      description: Decimal temperature, e.g. 22.7
- id: lp_temperature_cool_set
  label: Set Cooling Setpoint (TSC-class)
  kind: action
  command: "{MOD}{serial}%U{temp}"
  params:
    - name: MOD
      type: string
      description: DTSC module mnemonic (LT4, T35, ...)
    - name: serial
      type: string
      description: 6-char hex serial
    - name: temp
      type: string
      description: Decimal temperature, e.g. 21.5
- id: lp_zone_setpoint_set
  label: T° Zone Setpoint (ZON)
  kind: action
  command: "ZON{n}%T{temp}"
  params:
    - name: n
      type: integer
      description: Zone number
    - name: temp
      type: string
      description: Decimal setpoint, e.g. 15.5
- id: lp_zone_inc
  label: Increment T° Zone Setpoint
  kind: action
  command: "ZON{n}%I"
  params:
    - name: n
      type: integer
      description: Zone number
- id: lp_zone_dec
  label: Decrement T° Zone Setpoint
  kind: action
  command: "ZON{n}%O"
  params:
    - name: n
      type: integer
      description: Zone number
- id: lp_zone_temp_mode
  label: T° Zone Temperature Mode
  kind: action
  command: "ZON{n}%M{mode}"
  params:
    - name: n
      type: integer
      description: Zone number
    - name: mode
      type: integer
      description: Mode: 1=absence, 2=auto, 5=comfort, 6=frost
- id: lp_clock_set
  label: Set Clock Programme
  kind: action
  command: "CLK{n}%K{h:m:s} {mask} {dd/mm/yy}"
  params:
    - name: n
      type: integer
      description: Clock number
    - name: h_m_s
      type: string
      description: Time hh:mm:ss
    - name: mask
      type: string
      description: Weekday mask byte (b0=sun, b1=mon, ...). FF disables clock.
    - name: dd_mm_yy
      type: string
      description: dd/mm/yy
- id: lp_memo_set
  label: Set Mixed Memo
  kind: action
  command: "MEM{n}%I"
  params:
    - name: n
      type: integer
      description: Memo number
- id: lp_memo_reset
  label: Reset Mixed Memo
  kind: action
  command: "MEM{n}%O"
  params:
    - name: n
      type: integer
      description: Memo number
- id: lp_memo_dim_set
  label: Set Dimmer Memo
  kind: action
  command: "MEM{n}%D{percent}"
  params:
    - name: n
      type: integer
      description: Memo number
    - name: percent
      type: integer
      description: 0-100 dimmer percent
- id: lp_memo_dim_inc
  label: Increase Dimmer Memo by Step
  kind: action
  command: "MEM{n}%I%D{step}"
  params:
    - name: n
      type: integer
      description: Memo number
    - name: step
      type: integer
      description: Step percent
- id: lp_memo_dim_dec
  label: Decrease Dimmer Memo by Step
  kind: action
  command: "MEM{n}%O%D{step}"
  params:
    - name: n
      type: integer
      description: Memo number
    - name: step
      type: integer
      description: Step percent
- id: lp_memo_shutter_off
  label: Shutter Memo Group Off
  kind: action
  command: "MEM{n}%O"
  params:
    - name: n
      type: integer
      description: Memo group number
- id: lp_memo_shutter_up
  label: Shutter Memo Group Up
  kind: action
  command: "MEM{n}%H"
  params:
    - name: n
      type: integer
      description: Memo group number
- id: lp_memo_shutter_down
  label: Shutter Memo Group Down
  kind: action
  command: "MEM{n}%L"
  params:
    - name: n
      type: integer
      description: Memo group number
- id: lp_fan_speed_set
  label: DFAN Fan Speed Set
  kind: action
  command: "FAN{serial}-{speed}%I"
  params:
    - name: serial
      type: string
      description: DFAN serial, 6 hex chars
    - name: speed
      type: integer
      description: 1-3 fan speed, 4=heating, 5=cooling, 6=manual mode
- id: lp_fan_auto
  label: DFAN Auto Mode
  kind: action
  command: "FAN{serial}-6%O"
  params:
    - name: serial
      type: string
      description: DFAN serial, 6 hex chars
- id: lp_dmv_speed
  label: DMV01 Speed / Auxiliary Set
  kind: action
  command: "DMV{serial}-{slot}%I"
  params:
    - name: serial
      type: string
      description: DMV serial, 6 hex chars
    - name: slot
      type: integer
      description: 1-3 speed, 4=Aux1, 5=Aux2
- id: lp_bl_set
  label: Push Button Lythos / Rainbow / LCD - Set Output
  kind: action
  command: "{MOD}{serial}-{output}%I"
  params:
    - name: MOD
      type: string
      description: Module mnemonic B81/B82/B84/B86, BR2/BR4/BR6, PBL, PRL
    - name: serial
      type: string
      description: 6 hex chars
    - name: output
      type: integer
      description: Output index
- id: lp_bl_reset
  label: Push Button Lythos / Rainbow / LCD - Reset Output
  kind: action
  command: "{MOD}{serial}-{output}%O"
  params:
    - name: MOD
      type: string
      description: Module mnemonic B81/B82/B84/B86, BR2/BR4/BR6, PBL, PRL
    - name: serial
      type: string
      description: 6 hex chars
    - name: output
      type: integer
      description: Output index
- id: lp_pblcd_status
  label: DPBTLCD02 / DPBRLCD02 Status
  kind: query
  command: "{MOD}{serial}%S"
  params:
    - name: MOD
      type: string
      description: PBL or PRL
    - name: serial
      type: string
      description: 6 hex chars
- id: lp_tpv_toggle
  label: Toggle TPV Shutter (DTRP02)
  kind: action
  command: "TPV{serial}-{shutter}"
  params:
    - name: serial
      type: string
      description: DTRP02 serial, 6 hex chars
    - name: shutter
      type: integer
      description: Shutter 1-2
- id: lp_v24_toggle
  label: Toggle DC Shutter (DTRVBT01)
  kind: action
  command: "V24{serial}-{shutter}"
  params:
    - name: serial
      type: string
      description: DTRVBT01 serial, 6 hex chars
    - name: shutter
      type: integer
      description: Shutter 1
- id: lp_trp_toggle
  label: Toggle Teleruptor (DTRP01)
  kind: action
  command: "TRP{serial}-{output}"
  params:
    - name: serial
      type: string
      description: DTRP01 serial, 6 hex chars
    - name: output
      type: integer
      description: Output 1-4
- id: lp_led_toggle
  label: Toggle DLED01 Output
  kind: action
  command: "LED{serial}-{output}"
  params:
    - name: serial
      type: string
      description: DLED01 serial, 6 hex chars
    - name: output
      type: integer
      description: Output 1-4
- id: lp_i10_status
  label: DIN10V Status
  kind: query
  command: "I10{serial}%S"
  params:
    - name: serial
      type: string
      description: DIN10V serial, 6 hex chars
- id: lp_te2_temp_mode
  label: DTEM02 Temperature Mode
  kind: action
  command: "TE2{serial}%M{mode}"
  params:
    - name: serial
      type: string
      description: DTEM02 serial
    - name: mode
      type: integer
      description: 1=absence
- id: lp_te2_reg_mode
  label: DTEM02 Regulation Mode
  kind: action
  command: "TE2{serial}%R{mode}"
  params:
    - name: serial
      type: string
      description: DTEM02 serial
    - name: mode
      type: integer
      description: 2=cooling
```

## Feedbacks
```yaml
- id: pong
  type: string
  values:
    - "PONG"
  description: Reply to PING
- id: mod_version
  type: string
  description: Reply to MOD_VERSION, format "MOD_VERSION=SER_Vxx" or "MOD_VERSION=ETH_Vxx_STK_Vxx"
- id: appinfo_record
  type: string
  description: Per-module record from APPINFO, format described in source; follows header `APPINFO (PROG M x.yy dd/mm/yy hh:mm Rev=n)` and ends with `END APPINFO - Send "HELP" from ETH.`
- id: please_upgrade
  type: string
  description: Banner string `!! PLEASE UPGRADE DRS23202 FIRMWARE >= NN` or `!! PLEASE UPGRADE DETH02 FIRMWARE >= NN`
- id: dim_status
  type: string
  description: Dimmer output frame: `DIM{serial}D p1 p2 p3 p4 p5 p6 p7 p8`, percentages as 2-digit hex
- id: outputs_octet
  type: string
  description: Outputs-frame code O, value is hex byte, LSB = out 0, MSB = out 7
- id: inputs_octet
  type: string
  description: Inputs-frame code I, value is hex byte, LSB = in 0, MSB = in 7
- id: button_event
  type: string
  description: `B` type, 2 bytes button number + 2 bytes (00=released, 01=pressed)
- id: temperature_t
  type: string
  description: Heating setpoint frame: `T{measure} {setpoint} {mode} {profile_value}`
- id: temperature_u
  type: string
  description: Cooling setpoint frame: `U{measure} {setpoint} {mode} {profile_value}`
- id: dmx_frame
  type: string
  description: `DMX{serial}-{device}X{2_hex_per_channel}` (modern) or older 2nd dash variant; channel value hex
- id: amp_sound_frame
  type: string
  description: `AMP{serial}S{output}-{vol}-{source}-{freq_hex}-{tens_hex}` since card version 5
- id: clock_k
  type: string
  description: `CLK{n}K{hh:mm:ss}-{mask}-{dd/mm/yy}-{name}[{type}]`, type ∈ {blank, SUNSET, SUNRISE, RESET}
- id: tuner_station
  type: string
  description: `STA{n}STU {name}[FM={vol_hex}-{freq_hex}]`
- id: temp_plage_p
  type: string
  description: `TPL{n}P{setpoint}-{hh:mm:ss}`
- id: profile_name
  type: string
  description: `TPR{n}{name}`
- id: ascii_link_output
  type: string
  description: Output ASCII string emitted to the third-party device, content arbitrary, configured in Domintell2 software
- id: hex_output
  type: string
  description: Output non-printable (hex) data block emitted by DRS23201 to third-party device
- id: session_info
  type: string
  description: `INFO:Session opened:INFO` / `INFO:Session closed:INFO` / `INFO:World:INFO`
```

## Variables
```yaml
# Additional Parameters are not state variables; they form the parameter language of Light
# Protocol messages. Listed here as a glossary.
- id: param_D_set
  type: integer
  description: "Percent assignment for dimmer / volume / 0-10V output, %Dxxx decimal"
- id: param_DB
  type: string
  description: "%DB - execute a Start dim on a dimmer output"
- id: param_DE
  type: string
  description: "%DE - execute a Stop dim on a dimmer output"
- id: param_ID
  type: string
  description: "%I%Dxxx - Increase dimmer/volume value by step xxx percent"
- id: param_OD
  type: string
  description: "%O%Dxxx - Decrease dimmer/volume value by step xxx percent"
- id: param_T_temp
  type: string
  description: "%Txx.x - decimal Heating setpoint"
- id: param_U_temp
  type: string
  description: "%Uxx.x - decimal Cooling setpoint"
- id: param_A_aux
  type: integer
  description: "%Ax - Sound Auxiliary selection 1..4, Tuner = 5"
- id: param_F_freq
  type: string
  description: "%Fxxx,xxxx - Tuner Frequency in MHz"
- id: param_I
  type: string
  description: "%I - set the output"
- id: param_O
  type: string
  description: "%O - reset the output (stop on shutters)"
- id: param_M_mode
  type: integer
  description: "%Mx - Temperature mode 1=absence, 2=auto, 5=comfort, 6=frost"
- id: param_R_regmode
  type: integer
  description: "%Rx - Regulation mode 0=off, 1=heating, 2=cooling, 3=mixed"
- id: param_H
  type: string
  description: "%H - shutter goes High (Up)"
- id: param_L
  type: string
  description: "%L - shutter goes Low (Down)"
- id: param_S
  type: string
  description: "%S - ask status of module (does not work with MEMO)"
- id: param_P_push
  type: integer
  description: "%Px - simulated push 1=Begin short 2=End short 3=Begin long 4=End long"
- id: param_K_clock
  type: string
  description: "%K{hh:mm:ss} {weekday_mask} {dd/mm/yy} - Clock programme"
- id: param_X_dmx
  type: string
  description: "%X{hex} - DMX channel value"
```

## Events
```yaml
# UNRESOLVED: source enumerates output Light Protocol frames but does not name a single
# discrete "event" channel; subscribers parse the continuous ASCII stream from the
# interface. Examples appear in the Feedbacks section.
```

## Macros
```yaml
# UNRESOLVED: source does not document a macro/sequencing layer at the protocol surface.
# Scenes ("Sfeer") exist in Domintell2 configuration but are triggered by single
# SCENE-style actions above (lp_sfeer_set), not multi-step macro scripts.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: |
      Do NOT connect the Domintell bus on the DETH0x RJ45 connector; this can cause
      fatal damage to the DETH0x module. The RJ45 is intended for LAN only.
  - description: |
      On multi-module installations with multiple DRS23202 and DETH02, configuration
      software must be ≥ 1.19.11 and firmware must be ≥ v15 (DRS23202) or ≥ v7 (DETH02).
  - description: |
      Output Light Protocol from Domintell is only available in installations with fewer
      than 241 modules.
  - description: |
      DETH02 allows only one concurrent client; always LOGOUT before exiting the
      application to release the module for other clients.
  - description: |
      Wait for the previous reply before sending the next DETH02 command; new commands
      are dropped otherwise. Specific DETH0x commands cannot be concatenated with `&`
      and exactly one DETH0x command may be sent per UDP frame.
  - description: |
      libdeth 1.0.0 binary is not compatible with libdeth 2.0.0; recompile against the
      new SDK before switching.
```

## Notes
- Strings NOT case sensitive; lowercase auto-uppercased. Avoid accented characters on UTF-8 systems (multi-byte).
- STRINGS `<CR>`, `<LF>`, `<TAB>` decoded as ASCII 0x0D, 0x0A, 0x09. Domintell auto-trims leading/trailing SPACE.
- Light Protocol strings take priority over user-defined ASCII strings — if a "string" link in Domintell2 matches a Light Protocol mnemonic (e.g. `BIR000B4B-1`), it will be decoded as Light Protocol and the user link will not fire.
- Avoid >100 "string" links on one input; the diagnostic function will surface a WARNING.
- DETH02 reply latency: 5–100 ms depending on frame length and bus load.
- DOMINTELL information message `!! PLEASE UPGRADE DRS23202 FIRMWARE ≥ NN` and `!! PLEASE UPGRADE DETH02 FIRMWARE ≥ NN` indicates incompatible firmware vs. master module OS version; also triggered if DETH02/DRS23202 receives an unsupported module-type status.
- Light Protocol `&` is the reserved character for multi-message concatenation and as the inter-message gap alternative (≥ 25 ms).
- DRS23202 has fixed 57600 8-N-1; DRS23201 allows baud selection (1200/2400/4800/9600/19200/38400/57600).
- DRS23202 Light Protocol requires configuration software ≥ 1.19.11 and firmware ≥ v15 if used in installations with other DRS23202/DETH02 modules.

<!-- UNRESOLVED: source describes the DRS2320x / DETH0x gateway family in general terms but does not name "Dmov07" anywhere. Treat the spec as authoritative for the family and assess against actual hardware before publication.

UNRESOLVED: source does not provide a Tx/Rx command timing budget beyond the 5–100 ms DETH02 reply range.

UNRESOLVED: fault behavior, error-recovery sequences, and watchdog semantics are not documented.

UNRESOLVED: percent value encoding for the older `%D00` / `%D01` syntax on SYS Regulation appears inconsistent in the source (mixed zero-padding). Treat values as integers, validate against the actual device. -->

## Provenance

```yaml
source_domains:
  - pro.mydomintell.com
  - pro2.mydomintell.com
source_urls:
  - https://pro.mydomintell.com/share/manual/DETH0x/DS_RS232_ETH_Interfaces_v1_27_02.pdf
  - https://pro2.mydomintell.com/share/manual/DETH02-DRS23202/DS_RS232_ETH_Interfaces_v1_19_17.pdf
retrieved_at: 2026-07-03T08:52:02.971Z
last_checked_at: 2026-07-07T11:35:03.625Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:35:03.625Z
matched_actions: 70
action_count: 70
confidence: medium
summary: "All 70 spec actions matched literally in source; transport fully verified; coverage is complete. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source documents the DRS2320x / DETH0x gateway family. No module named \"Dmov07\" appears in the source text; the spec is authored against the family-level Light Protocol."
- "firmware version compatibility ranges (v15 DRS23202, v7 DETH02) are stated only for multi-module installations, not as a blanket floor requirement."
- "source enumerates output Light Protocol frames but does not name a single"
- "source does not document a macro/sequencing layer at the protocol surface."
- "source describes the DRS2320x / DETH0x gateway family in general terms but does not name \"Dmov07\" anywhere. Treat the spec as authoritative for the family and assess against actual hardware before publication."
- "source does not provide a Tx/Rx command timing budget beyond the 5–100 ms DETH02 reply range."
- "fault behavior, error-recovery sequences, and watchdog semantics are not documented."
- "percent value encoding for the older `%D00` / `%D01` syntax on SYS Regulation appears inconsistent in the source (mixed zero-padding). Treat values as integers, validate against the actual device."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
