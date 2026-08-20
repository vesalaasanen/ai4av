---
spec_id: admin/domintell-dac1w01
schema_version: ai4av-public-spec-v1
revision: 1
title: "Domintell Dac1W01 Control Spec"
manufacturer: Domintell
model_family: Dac1W01
aliases: []
compatible_with:
  manufacturers:
    - Domintell
  models:
    - Dac1W01
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro2.mydomintell.com
  - pro.mydomintell.com
  - domintell.com
  - archive.org
source_urls:
  - https://pro2.mydomintell.com/share/manual/DETH02-DRS23202/DS_RS232_ETH_Interfaces_v1_19_17.pdf
  - https://pro.mydomintell.com/share/manual/DETH02-DRS23202/DS_RS232_ETH_Interfaces_v1_27_08.pdf
  - https://www.domintell.com/en/products/features/controle-dacces/dac1w01/
  - https://www.domintell.com/en/1-wire/
  - https://archive.org/details/manualzilla-id-5989576
retrieved_at: 2026-08-11T04:49:56.269Z
last_checked_at: 2026-08-19T09:19:24.021Z
generated_at: 2026-08-19T09:19:24.021Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The supplied source document covers the Domintell RS-232 / Ethernet gateway module family (DRS23201, DRS23202, DRS23203, DETH02, DETH03, DETH04), not a product specifically named \"Dac1W01\". The Dac1W01 model name does not appear verbatim in the source. The spec below treats the document as the control interface for the Dac1W01 family and populates fields from the gateway protocol description; fields unique to a Dac1W01 device are not stated in the source."
  - "sample shows \"AMP000003-4\" with no separator - template unclear"
  - "settable parameter ranges are expressed as inline %Dxxx / %Txx.x / %Fxxx,xxxx within command strings rather than as discrete variables. No standalone variable table is present in the source."
  - "All Feedbacks above are unsolicited status frames pushed by DRS23202/DETH02 on every state change (the \"Light Protocol\" real-time status). Each Feedbacks entry implicitly doubles as an event source. No separate event vocabulary is defined in the source."
  - "source does not document any multi-step macro sequences; macro-like behaviour is achieved by chaining commands separated by '&' in a single frame."
  - "No safety warnings, interlock procedures, or power-on sequencing requirements are stated in the source. The only cautionary text relates to networking (router port-forwarding risks) and DFAN01 valve/fan behaviour (valves must follow setpoint; if valves OFF the fan will not start), neither of which constitutes a control-protocol safety interlock."
  - "firmware version compatibility (e.g. which features require v1.16.02 / v1.17.02 / v1.19.17) is documented per-feature in the source but not summarized as a single Dac1W01 firmware baseline."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:19:24.021Z
  matched_actions: 78
  action_count: 78
  confidence: medium
  summary: "All 78 spec wire-literal commands appear verbatim in the source's input-protocol sample table; transport params (57600 8/N/1, UDP 17481, LOGIN password) verified. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Domintell Dac1W01 Control Spec

## Summary
This spec covers the Domintell Dac1W01 RS-232C and Ethernet control interface used to integrate third-party devices with a Domintell installation. ASCII strings are exchanged bidirectionally between the host system and Domintell modules (DRS23201/02/03 and DETH02/03/04) over RS-232 or UDP. The spec documents the input protocol for sending commands to the Domintell installation, the Light Protocol output frames emitted by DRS23202/DETH02, and the DETH02 SDK library functions for session login.

<!-- UNRESOLVED: The supplied source document covers the Domintell RS-232 / Ethernet gateway module family (DRS23201, DRS23202, DRS23203, DETH02, DETH03, DETH04), not a product specifically named "Dac1W01". The Dac1W01 model name does not appear verbatim in the source. The spec below treats the document as the control interface for the Dac1W01 family and populates fields from the gateway protocol description; fields unique to a Dac1W01 device are not stated in the source. -->

## Transport
```yaml
protocols:
  - serial
  - udp
serial:
  baud_rate: 57600  # DRS23202 baud rate is fixed at 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 17481  # DETH02 default UDP port; configurable
auth:
  type: password  # DETH02: send "LOGIN" (or "LOGIN<encrypted-password>") to open a session; DRS2320x has no login procedure
```

## Traits
```yaml
- powerable
- routable  # inferred: output routing commands present (per-module output change)
- queryable  # inferred: %S status query commands present
- levelable  # inferred: dimmer/volume level commands present (%Dxxx, %I%Dxxx, %O%Dxxx)
```

## Actions
```yaml
- id: ping
  label: Ping (ask all statuses)
  kind: query
  command: "PING"
  params: []

- id: app_info
  label: Request application info
  kind: query
  command: "APPINFO"
  params: []

- id: mod_version
  label: Request module firmware version
  kind: query
  command: "MOD_VERSION"
  params: []

- id: hello
  label: Hello (reserved)
  kind: query
  command: "HELLO"
  params: []

- id: login
  label: Open session (DETH02)
  kind: action
  command: "LOGIN"  # or "LOGIN<encrypted-password>" if a password is set
  params: []

- id: logout
  label: Close session (DETH02)
  kind: action
  command: "LOGOUT"
  params: []

- id: discover
  label: Discovery (DETH02)
  kind: query
  command: "DISCOVER"
  params: []

- id: set_ip
  label: Set IP (DETH02)
  kind: action
  command: "SETIP={ip}"
  params:
    - name: ip
      type: string
      description: IP address to assign

- id: change_pbu_output
  label: Change output on DPBU01/02/04/06
  kind: action
  command: "BU{module_type}{serial_hex}-{output}"
  params:
    - name: module_type
      type: string
      description: 1=DPBU01, 2=DPBU02, 4=DPBU04, 6=DPBU06
    - name: serial_hex
      type: string
      description: 6-char hex product label (no separator)
    - name: output
      type: integer
      description: Output number

- id: get_pbu_status
  label: Get status of input/LED on DPBUxx
  kind: query
  command: "BU{module_type}{serial_hex}%S"
  params:
    - name: module_type
      type: string
      description: 1=DPBU01
    - name: serial_hex
      type: string
      description: 6-char hex product label

- id: simulate_pbu_push
  label: Simulate push on DPBUxx button
  kind: action
  command: "BU{module_type}{serial_hex}-{output}%P{push}"
  params:
    - name: module_type
      type: string
      description: 1=DPBU01, 2=DPBU02, 4=DPBU04, 6=DPBU06
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: output
      type: integer
      description: Button number
    - name: push
      type: integer
      description: 1=Begin short push, 2=End short push, 3=Begin long push, 4=End long push

- id: change_bir_output
  label: Change output on DBIR01
  kind: action
  command: "BIR{serial_hex}-{output}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: output
      type: integer
      description: Output number (1-8)

- id: set_bir_output
  label: Set output on DBIR01
  kind: action
  command: "BIR{serial_hex}-{output}%I"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: output
      type: integer
      description: Output number

- id: reset_bir_output
  label: Reset output on DBIR01
  kind: action
  command: "BIR{serial_hex}-{output}%O"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: output
      type: integer
      description: Output number

- id: change_trv_output
  label: Change shutter on DTRV01
  kind: action
  command: "TRV{serial_hex}-{shutter}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: shutter
      type: integer
      description: Shutter number

- id: trv_go_high
  label: Shutter goes High (v1.19.17)
  kind: action
  command: "TRV{serial_hex}-{shutter}%H"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: shutter
      type: integer
      description: Shutter number

- id: trv_go_low
  label: Shutter goes Low (v1.19.17)
  kind: action
  command: "TRV{serial_hex}-{shutter}%L"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: shutter
      type: integer
      description: Shutter number

- id: trv_stop
  label: Stop shutter on DTRV01
  kind: action
  command: "TRV{serial_hex}-{shutter}%O"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: shutter
      type: integer
      description: Shutter number

- id: change_trp_output
  label: Change output on DPBU06 via DTRP01
  kind: action
  command: "TRP{serial_hex}-{output}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: output
      type: integer
      description: Output number

- id: change_dim_output
  label: Change output on DDIM01
  kind: action
  command: "DIM{serial_hex}-{output}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: output
      type: integer
      description: Output number (1-8)

- id: set_dim_output
  label: Set dimmer output to percent
  kind: action
  command: "DIM{serial_hex}-{output}%D{percent}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: output
      type: integer
      description: Output number
    - name: percent
      type: integer
      description: Dimmer value (0-100)

- id: dim_start
  label: Start dim on DDIM01 output (v1.17.02)
  kind: action
  command: "DIM{serial_hex}-{output}%DB"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: output
      type: integer
      description: Output number

- id: dim_stop
  label: Stop dim on DDIM01 output (v1.17.02)
  kind: action
  command: "DIM{serial_hex}-{output}%DE"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: output
      type: integer
      description: Output number

- id: dim_increase
  label: Increase dimmer by step percent (v1.17.02)
  kind: action
  command: "DIM{serial_hex}-{output}%I%D{step}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: output
      type: integer
      description: Output number
    - name: step
      type: integer
      description: Step percent (stops at 100)

- id: dim_decrease
  label: Decrease dimmer by step percent (v1.17.02)
  kind: action
  command: "DIM{serial_hex}-{output}%O%D{step}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: output
      type: integer
      description: Output number
    - name: step
      type: integer
      description: Step percent (stops at 0)

- id: change_led_output
  label: Change output on DLED01
  kind: action
  command: "LED{serial_hex}-{output}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: output
      type: integer
      description: Output number (1-4)

- id: change_variable
  label: Change variable
  kind: action
  command: "VAR{n}"
  params:
    - name: n
      type: integer
      description: Variable number

- id: change_system_variable
  label: Change system variable
  kind: action
  command: "SYS{n}"
  params:
    - name: n
      type: integer
      description: System variable number

- id: get_system_variable
  label: Get status of system variable
  kind: query
  command: "SYS{n}%S"
  params:
    - name: n
      type: integer
      description: System variable number

- id: change_tpv_output
  label: Change shutter on DTRPV01
  kind: action
  command: "TPV{serial_hex}-{shutter}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: shutter
      type: integer
      description: Shutter number

- id: change_d10_output
  label: Change output on DOUT10V01
  kind: action
  command: "D10{serial_hex}-{output}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: output
      type: integer
      description: Output number

- id: set_d10_output
  label: Set 0-10V output to percent
  kind: action
  command: "D10{serial_hex}-{output}%D{percent}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: output
      type: integer
      description: Output number
    - name: percent
      type: integer
      description: Percent value (0-100)

- id: d10_increase
  label: Increase 0-10V output by step percent (v1.17.02)
  kind: action
  command: "D10{serial_hex}-{output}%I%D{step}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: output
      type: integer
      description: Output number
    - name: step
      type: integer
      description: Step percent

- id: d10_decrease
  label: Decrease 0-10V output by step percent (v1.17.02)
  kind: action
  command: "D10{serial_hex}-{output}%O%D{step}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: output
      type: integer
      description: Output number
    - name: step
      type: integer
      description: Step percent

- id: dmx_set_channel
  label: Set DMX channel value on DDMX01
  kind: action
  command: "DMX{serial_hex}-{device}-{channel}%X{value}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: device
      type: integer
      description: Device number
    - name: channel
      type: integer
      description: Channel number
    - name: value
      type: integer
      description: DMX value (0-255)

- id: change_v24_output
  label: Change shutter on DTRVBT01
  kind: action
  command: "V24{serial_hex}-{shutter}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: shutter
      type: integer
      description: Shutter number

- id: tsc_set_temperature_tsb
  label: Set temperature on DTSC01/03
  kind: action
  command: "TSB{serial_hex}%T{temp}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: temp
      type: string
      description: Temperature with 1 decimal place (e.g. 24.5)

- id: tsc_set_temperature_lt2
  label: Set temperature on DTSC02
  kind: action
  command: "LT2{serial_hex}%T{temp}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: temp
      type: string
      description: Temperature with 1 decimal place

- id: tsc_set_temperature_lt4
  label: Set temperature on DTSC04
  kind: action
  command: "LT4{serial_hex}%T{temp}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: temp
      type: string
      description: Temperature with 1 decimal place

- id: tsc_set_temperature_t35
  label: Set temperature on DTSC35
  kind: action
  command: "T35{serial_hex}%T{temp}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: temp
      type: string
      description: Temperature with 1 decimal place

- id: temp_set_mode
  label: Set DTEMP01 temperature mode
  kind: action
  command: "TE2{serial_hex}%M{mode}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: mode
      type: integer
      description: 1=?, 2=Absence (per sample); other modes not enumerated in source

- id: get_i10_status
  label: Ask status of DIN10V input
  kind: query
  command: "I10{serial_hex}%S"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label

- id: amp_set_output_aux
  label: Set DAMPLI01 output to Aux at volume
  kind: action
  command: "AMP{serial_hex}-{output}%D{volume}%A{aux}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: output
      type: integer
      description: Output number
    - name: volume
      type: integer
      description: Volume percent (0-100)
    - name: aux
      type: integer
      description: Aux source 1-4 (Tuner = 5)

- id: amp_volume_increase
  label: Increase DAMPLI01 output volume by step (v1.17.02)
  kind: action
  command: "AMP{serial_hex}-{output}%I%D{step}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: output
      type: integer
      description: Output number
    - name: step
      type: integer
      description: Step percent

- id: amp_volume_decrease
  label: Decrease DAMPLI01 output volume by step (v1.17.02)
  kind: action
  command: "AMP{serial_hex}-{output}%O%D{step}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: output
      type: integer
      description: Output number
    - name: step
      type: integer
      description: Step percent

- id: amp_set_output_tuner
  label: Set DAMPLI01 output to Tuner with volume and frequency
  kind: action
  command: "AMP{serial_hex}-{output}%D{volume}%F{freq_mhz}%A5"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: output
      type: integer
      description: Output number
    - name: volume
      type: integer
      description: Volume percent (0-100)
    - name: freq_mhz
      type: string
      description: Tuner frequency in MHz (e.g. 99.1)

- id: amp_change_output_volume
  label: Change DAMPLI01 output volume
  kind: action
  command: "AMP{serial}-"  # UNRESOLVED: sample shows "AMP000003-4" with no separator - template unclear
  params:
    - name: serial
      type: string
      description: 6-char hex product label (no separator per sample)
    - name: output
      type: integer
      description: Output number

- id: amp_get_status
  label: Ask status of all DAMPLI01 outputs
  kind: query
  command: "AMP{serial_hex}%S"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label

- id: mem_set_mixed
  label: SET Mixed Memo (v1.16.02)
  kind: action
  command: "MEM{serial_hex}%I"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label

- id: mem_reset_mixed
  label: RESET Mixed Memo (v1.16.02)
  kind: action
  command: "MEM{serial_hex}%O"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label

- id: mem_set_dimmer
  label: SET dimmer percent on Dimmer Memo (v1.16.03)
  kind: action
  command: "MEM{serial_hex}%D{percent}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: percent
      type: integer
      description: Dimmer percent (0-100)

- id: mem_dimmer_increase
  label: Increase Dimmer Memo by step (v1.17.02)
  kind: action
  command: "MEM{serial_hex}%I%D{step}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: step
      type: integer
      description: Step percent

- id: mem_dimmer_decrease
  label: Decrease Dimmer Memo by step (v1.17.02)
  kind: action
  command: "MEM{serial_hex}%O%D{step}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: step
      type: integer
      description: Step percent

- id: mem_shutter_off
  label: Shutter Memo Group OFF
  kind: action
  command: "MEM{group}%O"
  params:
    - name: group
      type: integer
      description: Shutter memo group number

- id: mem_shutter_up
  label: Shutter Memo Group UP (High)
  kind: action
  command: "MEM{group}%H"
  params:
    - name: group
      type: integer
      description: Shutter memo group number

- id: mem_shutter_down
  label: Shutter Memo Group Down (Low)
  kind: action
  command: "MEM{group}%L"
  params:
    - name: group
      type: integer
      description: Shutter memo group number

- id: sfe_set
  label: SET Sfere (v1.16.03)
  kind: action
  command: "SFE{serial_hex}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label

- id: sfe_set_alt
  label: SET Sfere alternate form (v1.16.03)
  kind: action
  command: "SFE{serial_hex}%I"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label

- id: sfe_get_status
  label: Get status of each item in Sfere (v1.17.02)
  kind: query
  command: "SFE{serial_hex}%S"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label

- id: pbl_set_output
  label: SET DPBTLCD0x output
  kind: action
  command: "PBL{serial_hex}-{output}%I"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: output
      type: string
      description: Hex output identifier (e.g. C-6)

- id: pbl_reset_output
  label: RESET DPBTLCD0x output
  kind: action
  command: "PBL{serial_hex}-{output}%O"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: output
      type: string
      description: Hex output identifier (e.g. C-1)

- id: pbl_simulate_push
  label: Simulate begin/end of short push on DPBTLCD0x (v1.17.02)
  kind: action
  command: "PBL{serial_hex}-{output}%P{push}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: output
      type: string
      description: Hex output identifier
    - name: push
      type: integer
      description: 1=Begin short push, 2=End short push

- id: pbl_get_status
  label: Return DPBTLCD0x status (v1.17.02)
  kind: query
  command: "PBL{serial_hex}%S"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label

- id: fan_set_speed
  label: Set DFAN01 speed
  kind: action
  command: "FAN{serial_hex}-{speed}%I"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: speed
      type: integer
      description: Fan speed (1, 2, 3)

- id: fan_set_heating
  label: Set DFAN01 to heating mode
  kind: action
  command: "FAN{serial_hex}-4%I"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label

- id: fan_set_cooling
  label: Set DFAN01 to cooling mode
  kind: action
  command: "FAN{serial_hex}-5%I"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label

- id: fan_set_manual_mode
  label: Set DFAN01 manual mode
  kind: action
  command: "FAN{serial_hex}-6%I"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label

- id: fan_set_auto_mode
  label: Set DFAN01 automatic mode
  kind: action
  command: "FAN{serial_hex}-6%O"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label

- id: zon_increment_setpoint
  label: T° Zone 1, increment setpoint
  kind: action
  command: "ZON{serial_hex}%I"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label

- id: zon_decrement_setpoint
  label: T° Zone 1, decrement setpoint
  kind: action
  command: "ZON{serial_hex}%O"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label

- id: zon_set_setpoint
  label: T° Zone 1, set setpoint
  kind: action
  command: "ZON{serial_hex}%T{temp}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: temp
      type: string
      description: Setpoint temperature (e.g. 15.5)

- id: zon_set_absence_mode
  label: T° Zone 1, set absence mode
  kind: action
  command: "ZON{serial_hex}%M1"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label

- id: zon_set_auto_mode
  label: T° Zone 1, set automatic mode
  kind: action
  command: "ZON{serial_hex}%M2"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label

- id: zon_set_comfort_mode
  label: T° Zone 1, set comfort mode
  kind: action
  command: "ZON{serial_hex}%M5"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label

- id: zon_set_frost_mode
  label: T° Zone 1, set frost mode (if enabled)
  kind: action
  command: "ZON{serial_hex}%M6"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label

- id: clk_set
  label: Set Clock (v1.17.02)
  kind: action
  command: "CLK{serial_hex}%K{hh}:{mm}:{ss} {day_mask} {dd}/{mm}/{yy}"
  params:
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: hh
      type: string
      description: Hour (00-23)
    - name: mm
      type: string
      description: Minute (00-59)
    - name: ss
      type: string
      description: Second (00-59)
    - name: day_mask
      type: string
      description: 2-char hex day mask (b0=sun, b1=mon, ...); FF disables clock
    - name: dd
      type: string
      description: Day
    - name: mm
      type: string
      description: Month
    - name: yy
      type: string
      description: Year (last 2 digits)

- id: is_simulate_push
  label: Simulate push on DISMxx input
  kind: action
  command: "IS{module_type}{serial_hex}-{input}%P{push}"
  params:
    - name: module_type
      type: string
      description: 4=DISM04, 8=DISM08
    - name: serial_hex
      type: string
      description: 6-char hex product label
    - name: input
      type: integer
      description: Input number
    - name: push
      type: integer
      description: 1=Begin short, 2=End short, 3=Begin long, 4=End long

- id: setip
  label: Set module IP (DETH02)
  kind: action
  command: "SETIP={ip}"
  params:
    - name: ip
      type: string
      description: IPv4 address (DHCP by default; static IP assignable via this command)
```

## Feedbacks
```yaml
- id: pong
  label: Pong reply to PING
  type: string
  description: "Answer 'PONG<CR><LF>' from DRS23202/DETH02 after a 'PING' string"

- id: mod_version_rs232
  label: Module version (DRS23202)
  type: string
  description: "Answer 'MOD_VERSION=SER_V{xx}' after 'MOD_VERSION' (hex)"

- id: mod_version_eth
  label: Module version (DETH02)
  type: string
  description: "Answer 'MOD_VERSION=ETH_V{xx}_STK_V{xx}' after 'MOD_VERSION' (hex)"

- id: appinfo_block
  label: APPINFO application description
  type: string
  description: Application/program info block returned after 'APPINFO'

- id: temperature_status
  label: Temperature status frame
  type: string
  description: Format: "{T}{serial}T{measure} {setpoint} {mode} {range}" where mode ∈ {AUTO, ABSENCE, COMFORT, ...}

- id: binary_input_state
  label: Input bits byte
  type: string
  description: 2-char hex byte; LSB=input 0, MSB=input 7 (Data Type 'I')

- id: binary_output_state
  label: Output bits byte
  type: string
  description: 2-char hex byte; LSB=output 0, MSB=output 7 (Data Type 'O')

- id: dimmer_state
  label: Dimmer percent bytes
  type: string
  description: Two hex bytes per output; '64' = 100% (Data Type 'D')

- id: dmx_state
  label: DMX channel bytes
  type: string
  description: Two hex bytes per channel; 'C0' = 192 (Data Type 'X')

- id: ir_command_code
  label: IR command code
  type: string
  description: 2-char hex per key; key 1 = '01' (Data Type 'C')

- id: sound_state
  label: Sound module state
  type: string
  description: Format "{output}-{volume}-{source}-{freq_mhz_hex}" e.g. '1-32-TUNE-63-03E8' (Data Type 'S', since card version 5)

- id: button_state
  label: Button press state
  type: string
  description: 2 bytes button number + 2 bytes (00=released, 01=pressed) (Data Type 'B')

- id: temp_plage_state
  label: Temp plage state
  type: string
  description: "Format '{hh}:{mm}:{ss} {setpoint}'" (Data Type 'P')

- id: clock_state
  label: Clock state
  type: string
  description: Format "{hh}:{mm}:{ss}-{day_mask}-{mm}/{dd}/{yy}-{name}[{SUNSET|SUNRISE|RESET}]" (Data Type 'K')

- id: fan_state
  label: DFAN01 state
  type: string
  description: Format 'O{byte}' e.g. 'O20'=OFF manual, 'O11'=cooling speed1 auto, 'O0C'=heating speed3 auto, 'O32'=cooling speed2 manual

- id: variable_state
  label: Variable state
  type: string
  description: Format 'O{byte}' (True/False) or 'D{hex}' (percent) for VAR/SYS

- id: shutter_state
  label: Shutter state
  type: string
  description: Format 'O{byte}' e.g. 'O01' = shutter 1 UP (DTRP02 / DTRVBT01)

- id: dmx_channel_state
  label: DMX channel state
  type: string
  description: Per-channel hex bytes emitted by DDMX01 (Data Type 'X')
```

## Variables
```yaml
# UNRESOLVED: settable parameter ranges are expressed as inline %Dxxx / %Txx.x / %Fxxx,xxxx within command strings rather than as discrete variables. No standalone variable table is present in the source.
```

## Events
```yaml
# UNRESOLVED: All Feedbacks above are unsolicited status frames pushed by DRS23202/DETH02 on every state change (the "Light Protocol" real-time status). Each Feedbacks entry implicitly doubles as an event source. No separate event vocabulary is defined in the source.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step macro sequences; macro-like behaviour is achieved by chaining commands separated by '&' in a single frame.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

<!-- UNRESOLVED: No safety warnings, interlock procedures, or power-on sequencing requirements are stated in the source. The only cautionary text relates to networking (router port-forwarding risks) and DFAN01 valve/fan behaviour (valves must follow setpoint; if valves OFF the fan will not start), neither of which constitutes a control-protocol safety interlock. -->

## Notes
- The DRS23201 string-exchange firmware has no login procedure; the DRS23202 "Light Protocol" firmware uses fixed 57600/8/N/1; the DRS23203 Bang & Olufsen interface is not covered by this document.
- DRS23201 baud rate is configurable: 1200, 2400, 4800, 9600, 19200, 38400, 76800 (default depends on configuration). Parity selectable (since version 4): none/even/odd. DRS23202 baud rate is fixed at 57600 with parity none.
- DETH02 default UDP port is 17481 (configurable). DHCP is used by default for IP assignment.
- Login on DETH02: send UDP "LOGIN" (no password) or "LOGIN<encrypted-password>" computed via the libdeth `deth_encryptpsw` function. Password min 4, max 10 ASCII characters; SDK must be >= 2.0.0 (binary incompatible with 1.0.0).
- Lowercase is auto-uppercased; leading/trailing spaces stripped; messages capped at 30 chars; 25 ms minimum gap between RS-232 messages (or use '&' as inline separator).
- Control characters may be embedded with `<xx>` where `xx` is decimal 00-31, exactly two digits (extended mode since version 5).
- DFAN01 outputs 1-5 are fan speeds; output 6 selects working mode (0=auto, 1=manual). For safety reasons valves always follow setpoint regulation.
- The source document describes the gateway family (DRS23201/02/03, DETH02/03/04), not a product named "Dac1W01". The Dac1W01 model string does not appear in the source — see Summary.
- DMX frame format pre-v11 (DETH02) / v16 (DRS23202) used a second `-` between device and channel; that form is obsolete and not enumerated separately here.

<!-- UNRESOLVED: firmware version compatibility (e.g. which features require v1.16.02 / v1.17.02 / v1.19.17) is documented per-feature in the source but not summarized as a single Dac1W01 firmware baseline. -->

## Provenance

```yaml
source_domains:
  - pro2.mydomintell.com
  - pro.mydomintell.com
  - domintell.com
  - archive.org
source_urls:
  - https://pro2.mydomintell.com/share/manual/DETH02-DRS23202/DS_RS232_ETH_Interfaces_v1_19_17.pdf
  - https://pro.mydomintell.com/share/manual/DETH02-DRS23202/DS_RS232_ETH_Interfaces_v1_27_08.pdf
  - https://www.domintell.com/en/products/features/controle-dacces/dac1w01/
  - https://www.domintell.com/en/1-wire/
  - https://archive.org/details/manualzilla-id-5989576
retrieved_at: 2026-08-11T04:49:56.269Z
last_checked_at: 2026-08-19T09:19:24.021Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:19:24.021Z
matched_actions: 78
action_count: 78
confidence: medium
summary: "All 78 spec wire-literal commands appear verbatim in the source's input-protocol sample table; transport params (57600 8/N/1, UDP 17481, LOGIN password) verified. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The supplied source document covers the Domintell RS-232 / Ethernet gateway module family (DRS23201, DRS23202, DRS23203, DETH02, DETH03, DETH04), not a product specifically named \"Dac1W01\". The Dac1W01 model name does not appear verbatim in the source. The spec below treats the document as the control interface for the Dac1W01 family and populates fields from the gateway protocol description; fields unique to a Dac1W01 device are not stated in the source."
- "sample shows \"AMP000003-4\" with no separator - template unclear"
- "settable parameter ranges are expressed as inline %Dxxx / %Txx.x / %Fxxx,xxxx within command strings rather than as discrete variables. No standalone variable table is present in the source."
- "All Feedbacks above are unsolicited status frames pushed by DRS23202/DETH02 on every state change (the \"Light Protocol\" real-time status). Each Feedbacks entry implicitly doubles as an event source. No separate event vocabulary is defined in the source."
- "source does not document any multi-step macro sequences; macro-like behaviour is achieved by chaining commands separated by '&' in a single frame."
- "No safety warnings, interlock procedures, or power-on sequencing requirements are stated in the source. The only cautionary text relates to networking (router port-forwarding risks) and DFAN01 valve/fan behaviour (valves must follow setpoint; if valves OFF the fan will not start), neither of which constitutes a control-protocol safety interlock."
- "firmware version compatibility (e.g. which features require v1.16.02 / v1.17.02 / v1.19.17) is documented per-feature in the source but not summarized as a single Dac1W01 firmware baseline."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
