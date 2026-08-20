---
spec_id: admin/domintell-dpbt04-b
schema_version: ai4av-public-spec-v1
revision: 1
title: "Domintell DPBTLCD0x (Dpbt04 B) Control Spec"
manufacturer: Domintell
model_family: DPBTLCD0x
aliases: []
compatible_with:
  manufacturers:
    - Domintell
  models:
    - DPBTLCD0x
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro2.mydomintell.com
  - pro.mydomintell.com
  - github.com
source_urls:
  - https://pro2.mydomintell.com/share/manual/DETH02-DRS23202/DS_RS232_ETH_Interfaces_v1_19_17.pdf
  - https://pro.mydomintell.com/share/manual/DETH02-DRS23202/DS_RS232_ETH_Interfaces_v1_27_08.pdf
  - https://github.com/zilvinasbin/python-domintell
retrieved_at: 2026-08-11T04:54:10.428Z
last_checked_at: 2026-08-19T09:20:22.327Z
generated_at: 2026-08-19T09:20:22.327Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TRP   151-4"
  - "exact model \"Dpbt04 B\" not found in source. Spec covers DPBTLCD0x family as best match. Dpbt04 B firmware version not stated."
  - "no explicit power on/off commands in source"
  - "source describes per-module output/input bits and dimmer values as protocol data, not as settable runtime variables outside the protocol commands above."
  - "source does not document multi-step command sequences beyond the Sfere (SFE) scenes which are configured server-side; not protocol macros."
  - "Dpbt04 B model identification, firmware compatibility, exact baud when target is RS-232 only vs full DETH02."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:20:22.327Z
  matched_actions: 80
  action_count: 80
  confidence: medium
  summary: "All 80 spec actions match verbatim input-protocol strings or reserved command strings in the source; transport (57600 8N1, UDP 17481) confirmed. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Domintell DPBTLCD0x (Dpbt04 B) Control Spec

## Summary
Control interface specification for the Domintell DPBTLCD0x module family (the "Dpbt04 B" model name is not found verbatim in the source). The doc covers Domintell's RS-232 (DRS23201/02/03) and Ethernet (DETH02/03/04) gateway modules, which translate ASCII command strings into Domintell bus actions (lights, shutters, dimmers, sensors, etc.). Commands and responses are exchanged as plain ASCII text on either RS-232 or UDP.

<!-- UNRESOLVED: exact model "Dpbt04 B" not found in source. Spec covers DPBTLCD0x family as best match. Dpbt04 B firmware version not stated. -->

## Transport
```yaml
protocols:
  - serial
  - udp
serial:
  baud_rate: 57600  # DRS23202 fixed; DRS23201 selectable1200-76800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 17481  # DETH02 default UDP port (Domintell UDP Port)
auth:
  type: none  # inferred: default password = none; LOGIN may be sent without password if none set
```

## Traits
```yaml
powerable: false  # UNRESOLVED: no explicit power on/off commands in source
routable: true  # inferred from input/output routing command examples
queryable: true  # inferred from %S, PING, APPINFO query commands
levelable: true  # inferred from dimmer/volume commands (%D, %I, %O)
```

## Actions
```yaml
# Input protocol - strings sent TO the Domintell installation.
# Each command references a module type, serial number, and optional output/parameter.

# --- System / session commands ---
- id: ping label: Ping (request full status)
  kind: action
  command: "PING"
  params: []

- id: app_info
  label: Application Info Dump
  kind: query
  command: "APPINFO"
  params: []

- id: mod_version
  label: Module Version Query
  kind: query
  command: "MOD_VERSION"
  params: []

- id: hello
  label: Hello (Ethernet session)
  kind: action
  command: "HELLO"
  params: []

- id: login
  label: Login (Ethernet session)
  kind: action
  command: "LOGIN{encrypted_password}"
  params:
    - name: encrypted_password
      type: string
      description: Encrypted password (omit if no password set); produced via libdeth `deth_encryptpsw`

- id: logout
  label: Logout (Ethernet session)
  kind: action
  command: "LOGOUT"
  params: []

- id: discover
  label: Discover (Ethernet)
  kind: action
  command: "DISCOVER"
  params: []

- id: set_ip
  label: Set IP (Ethernet)
  kind: action
  command: "SETIP={ip}"
  params:
    - name: ip
      type: string
      description: IP address to assign

# --- DPBU (Push Button) modules: change output ---
- id: dpbu_toggle_output
  label: Toggle DPBUxx Output
  kind: action
  command: "BU{n_outputs}{serial}-{output}"
  params:
    - name: n_outputs
      type: string
      description: "Module output count (1, 2, 4, or 6) - encodes module type"
    - name: serial
      type: string
      description:6-char hex serial number
    - name: output
      type: integer
      description: Output number

- id: dpbu_status
  label: DPBUxx Status Query
  kind: query
  command: "BU{n_outputs}{serial}%S"
  params:
    - name: n_outputs
      type: string
      description: "Module output count (1, 2, 4, or 6)"
    - name: serial
      type: string
      description: 6-char hex serial number

- id: dpbu_simulate_short_push_begin
  label: Simulate Begin Short Push (DPBUxx)
  kind: action
  command: "BU{n_outputs}{serial}-{output}%P1"
  params:
    - name: n_outputs
      type: string
      description: "Module output count (1, 2, 4, or 6)"
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: output
      type: integer
      description: Button number

- id: dpbu_simulate_short_push_end
  label: Simulate End Short Push (DPBUxx)
  kind: action
  command: "BU{n_outputs}{serial}-{output}%P2"
  params:
    - name: n_outputs
      type: string
      description: "Module output count (1, 2, 4, or 6)"
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: output
      type: integer
      description: Button number

# --- DISM (Inputs) modules ---
- id: dism_simulate_long_push_begin
  label: Simulate Begin Long Push (DISMxx)
  kind: action
  command: "IS{n_inputs}{serial}-{input}%P3"
  params:
    - name: n_inputs
      type: string
      description: "Input count (4 or 8)"
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: input
      type: integer
      description: Input number

- id: dism_simulate_long_push_end
  label: Simulate End Long Push (DISMxx)
  kind: action
  command: "IS{n_inputs}{serial}-{input}%P4"
  params:
    - name: n_inputs
      type: string
      description: "Input count (4 or 8)"
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: input
      type: integer
      description: Input number

# --- DBIR01 (bipolar relays) ---
- id: bir_toggle_output
  label: Toggle DBIR01 Output
  kind: action
  command: "BIR{serial}-{output}"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: output
      type: integer
      description: Output number (1-8)

- id: bir_set_output
  label: Set DBIR01 Output
  kind: action
  command: "BIR{serial}-{output}%I"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: output
      type: integer
      description: Output number (1-8)

- id: bir_reset_output
  label: Reset DBIR01 Output
  kind: action
  command: "BIR{serial}-{output}%O"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: output
      type: integer
      description: Output number (1-8)

# --- DTRV01 (shutter inverters) ---
- id: trv_toggle
  label: Toggle DTRV01 Shutter
  kind: action
  command: "TRV{serial}-{shutter}"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: shutter
      type: integer
      description: Shutter number (1-4)

- id: trv_shutter_high
  label: Shutter UP (DTRV01)
  kind: action
  command: "TRV{serial}-{shutter}%H"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: shutter
      type: integer
      description: Shutter number (1-4)

- id: trv_shutter_low
  label: Shutter DOWN (DTRV01)
  kind: action
  command: "TRV{serial}-{shutter}%L"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: shutter
      type: integer
      description: Shutter number (1-4)

- id: trv_shutter_stop
  label: Shutter STOP (DTRV01)
  kind: action
  command: "TRV{serial}-{shutter}%O"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: shutter
      type: integer
      description: Shutter number (1-4)

# --- DTRP02 (shutter teleruptors) ---
- id: trp_toggle
  label: Toggle DTRP02 Shutter
  kind: action
  command: "TPV{serial}-{shutter}"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: shutter
      type: integer
      description: Shutter number

# --- DTRVBT01 (DC shutter) ---
- id: v24_toggle
  label: Toggle DTRVBT01 Shutter
  kind: action
  command: "V24{serial}-{shutter}"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: shutter
      type: integer
      description: Shutter number

# --- DDIM01 (8-dimmer) ---
- id: dim_toggle
  label: Toggle DDIM01 Output
  kind: action
  command: "DIM{serial}-{output}"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: output
      type: integer
      description: Output number (1-8)

- id: dim_set_level
  label: Set Dimmer Level
  kind: action
  command: "DIM{serial}-{output}%D{level}"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: output
      type: integer
      description: Output number (1-8)
    - name: level
      type: integer
      description: Percent (0-100)

- id: dim_start_dim
  label: Start Dimming
  kind: action
  command: "DIM{serial}-{output}%DB"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: output
      type: integer
      description: Output number (1-8)

- id: dim_stop_dim
  label: Stop Dimming
  kind: action
  command: "DIM{serial}-{output}%DE"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: output
      type: integer
      description: Output number (1-8)

- id: dim_increase
  label: Increase Dimmer by Step
  kind: action
  command: "DIM{serial}-{output}%I%D{step}"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: output
      type: integer
      description: Output number (1-8)
    - name: step
      type: integer
      description: Step percent (stops at 100)

- id: dim_decrease
  label: Decrease Dimmer by Step
  kind: action
  command: "DIM{serial}-{output}%O%D{step}"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: output
      type: integer
      description: Output number (1-8)
    - name: step
      type: integer
      description: Step percent (stops at 0)

# --- DLED01 (LED driver) ---
- id: led_toggle
  label: Toggle DLED01 Output
  kind: action
  command: "LED{serial}-{output}"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: output
      type: integer
      description: Output number (1-4)

# --- DOUT10V01 (0/1-10V dimmer) ---
- id: d10_toggle
  label: Toggle DOUT10V01 Output
  kind: action
  command: "D10{serial}-{output}"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: output
      type: integer
      description: Output number

- id: d10_set_level
  label: Set0/1-10V Output Level
  kind: action
  command: "D10{serial}-{output}%D{level}"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: output
      type: integer
      description: Output number
    - name: level
      type: integer
      description: Percent (0-100)

- id: d10_increase
  label: Increase 0/1-10V by Step
  kind: action
  command: "D10{serial}-{output}%I%D{step}"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: output
      type: integer
      description: Output number
    - name: step
      type: integer
      description: Step percent

- id: d10_decrease
  label: Decrease 0/1-10V by Step
  kind: action
  command: "D10{serial}-{output}%O%D{step}"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: output
      type: integer
      description: Output number
    - name: step
      type: integer
      description: Step percent

# --- DDMX01 (DMX module) ---
- id: dmx_set_channel
  label: Set DMX Channel
  kind: action
  command: "DMX{serial}-{device}-{channel}%X{value}"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: device
      type: integer
      description: DMX device number
    - name: channel
      type: integer
      description: DMX channel number
    - name: value
      type: integer
      description: DMX value (0-255)

# --- DTSC01/03 (touchscreen T°) ---
- id: tsb_set_temperature
  label: Set DTSC01/03 Setpoint
  kind: action
  command: "TSB{serial}%T{temperature}"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: temperature
      type: string
      description: Decimal degrees C with dot or comma (e.g. 24.5)

# --- DTSC02 (TFT touchscreen) ---
- id: lt2_set_temperature
  label: Set DTSC02 Setpoint
  kind: action
  command: "LT2{serial}%T{temperature}"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: temperature
      type: string
      description: Decimal degrees C

# --- DTSC04 (TFT touchscreen with video) ---
- id: lt4_set_temperature
  label: Set DTSC04 Setpoint
  kind: action
  command: "LT4{serial}%T{temperature}"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: temperature
      type: string
      description: Decimal degrees C

# --- DTSC35 (3.5" TFT touchscreen) ---
- id: t35_set_temperature
  label: Set DTSC35 Setpoint
  kind: action
  command: "T35{serial}%T{temperature}"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: temperature
      type: string
      description: Decimal degrees C

# --- DTEMP01 ---
- id: te2_set_mode
  label: Set DTEMP01 Mode
  kind: action
  command: "TE2{serial}%M{mode}"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: mode
      type: integer
      description: "Mode code (e.g. 2=absence)"

# --- DIN10V (I10) ---
- id: i10_status
  label: DIN10V Status Query
  kind: query
  command: "I10{serial}%S"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number

# --- DAMPLI01 (sound amplifier) ---
- id: amp_set_volume_source
  label: Set AMP Output Volume + Aux Source
  kind: action
  command: "AMP{serial}-{output}%D{level}%A{aux}"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: output
      type: integer
      description: Output number
    - name: level
      type: integer
      description: Volume percent (0-100)
    - name: aux
      type: integer
      description: "Aux input (1-4);5 = Tuner"

- id: amp_volume_increase
  label: Increase AMP Output Volume by Step
  kind: action
  command: "AMP{serial}-{output}%I%D{step}"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: output
      type: integer
      description: Output number
    - name: step
      type: integer
      description: Step percent

- id: amp_volume_decrease
  label: Decrease AMP Output Volume by Step
  kind: action
  command: "AMP{serial}-{output}%O%D{step}"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: output
      type: integer
      description: Output number
    - name: step
      type: integer
      description: Step percent

- id: amp_set_tuner
  label: Set AMP Output to Tuner Frequency
  kind: action
  command: "AMP{serial}-{output}%D{level}%F{freq}%A5"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: output
      type: integer
      description: Output number
    - name: level
      type: integer
      description: Volume percent (0-100)
    - name: freq
      type: string
      description: Tuner frequency in MHz, decimal (e.g. 99.1)

- id: amp_toggle_output
  label: Toggle AMP Output (no volume change)
  kind: action
  command: "AMP{serial}-{output}"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number (no leading zero padding when used here)
    - name: output
      type: integer
      description: Output number

- id: amp_status
  label: AMP Status Query
  kind: query
  command: "AMP{serial}%S"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number (no leading zero padding)

# --- Memos ---
- id: memo_set_mixed
  label: Set Mixed Memo
  kind: action
  command: "MEM{memo_id}%I"
  params:
    - name: memo_id
      type: integer
      description: Memo number

- id: memo_reset_mixed
  label: Reset Mixed Memo
  kind: action
  command: "MEM{memo_id}%O"
  params:
    - name: memo_id
      type: integer
      description: Memo number

- id: memo_set_dimmer
  label: Set Dimmer Memo Percent
  kind: action
  command: "MEM{memo_id}%D{level}"
  params:
    - name: memo_id
      type: integer
      description: Memo number
    - name: level
      type: integer
      description: Percent (0-100)

- id: memo_dimmer_increase
  label: Increase Dimmer Memo by Step
  kind: action
  command: "MEM{memo_id}%I%D{step}"
  params:
    - name: memo_id
      type: integer
      description: Memo number
    - name: step
      type: integer
      description: Step percent

- id: memo_dimmer_decrease
  label: Decrease Dimmer Memo by Step
  kind: action
  command: "MEM{memo_id}%O%D{step}"
  params:
    - name: memo_id
      type: integer
      description: Memo number
    - name: step
      type: integer
      description: Step percent

- id: memo_shutter_off
  label: Shutter Memo Group OFF
  kind: action
  command: "MEM{memo_id}%O"
  params:
    - name: memo_id
      type: integer
      description: Shutter memo number

- id: memo_shutter_up
  label: Shutter Memo Group UP (High)
  kind: action
  command: "MEM{memo_id}%H"
  params:
    - name: memo_id
      type: integer
      description: Shutter memo number

- id: memo_shutter_down
  label: Shutter Memo Group DOWN (Low)
  kind: action
  command: "MEM{memo_id}%L"
  params:
    - name: memo_id
      type: integer
      description: Shutter memo number

# --- Sfere (scenes) ---
- id: sfe_set
  label: Set Sfere (Scene)
  kind: action
  command: "SFE{sfe_id}"
  params:
    - name: sfe_id
      type: integer
      description: Sfere ID

- id: sfe_set_alt
  label: Set Sfere (Alt syntax)
  kind: action
  command: "SFE{sfe_id}%I"
  params:
    - name: sfe_id
      type: integer
      description: Sfere ID

- id: sfe_status
  label: Sfere Status Query
  kind: query
  command: "SFE{sfe_id}%S"
  params:
    - name: sfe_id
      type: integer
      description: Sfere ID

# --- DPBTLCD0x (LCD push buttons) ---
- id: pbl_set_output
  label: Set DPBTLCD0x Output
  kind: action
  command: "PBL{serial}-{output}%I"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: output
      type: integer
      description: Output number

- id: pbl_reset_output
  label: Reset DPBTLCD0x Output
  kind: action
  command: "PBL{serial}-{output}%O"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: output
      type: integer
      description: Output number

- id: pbl_simulate_short_push_begin
  label: Simulate Begin Short Push (DPBTLCD0x)
  kind: action
  command: "PBL{serial}-{button}%P2"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number
    - name: button
      type: integer
      description: Button number

- id: pbl_status
  label: DPBTLCD0x Status Query
  kind: query
  command: "PBL{serial}%S"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number

# --- DFAN01 (fan controller) ---
- id: fan_set_speed1
  label: Fan Speed 1 (DFAN01)
  kind: action
  command: "FAN{serial}-1%I"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number

- id: fan_set_speed2
  label: Fan Speed 2 (DFAN01)
  kind: action
  command: "FAN{serial}-2%I"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number

- id: fan_set_speed3
  label: Fan Speed 3 (DFAN01)
  kind: action
  command: "FAN{serial}-3%I"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number

- id: fan_set_heating
  label: Fan Heating Mode (DFAN01)
  kind: action
  command: "FAN{serial}-4%I"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number

- id: fan_set_cooling
  label: Fan Cooling Mode (DFAN01)
  kind: action
  command: "FAN{serial}-5%I"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number

- id: fan_set_manual
  label: Fan Manual Mode (DFAN01)
  kind: action
  command: "FAN{serial}-6%I"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number

- id: fan_set_auto
  label: Fan Automatic Mode (DFAN01)
  kind: action
  command: "FAN{serial}-6%O"
  params:
    - name: serial
      type: string
      description: 6-char hex serial number

# --- Temperature zones ---
- id: zon_increment_setpoint
  label: Increment Zone Setpoint
  kind: action
  command: "ZON{zone}%I"
  params:
    - name: zone
      type: integer
      description: Zone ID

- id: zon_decrement_setpoint
  label: Decrement Zone Setpoint
  kind: action
  command: "ZON{zone}%O"
  params:
    - name: zone
      type: integer
      description: Zone ID

- id: zon_set_setpoint
  label: Set Zone Setpoint
  kind: action
  command: "ZON{zone}%T{setpoint}"
  params:
    - name: zone
      type: integer
      description: Zone ID
    - name: setpoint
      type: string
      description: Decimal degrees C

- id: zon_mode_absence
  label: Zone Mode Absence
  kind: action
  command: "ZON{zone}%M1"
  params:
    - name: zone
      type: integer
      description: Zone ID

- id: zon_mode_auto
  label: Zone Mode Automatic
  kind: action
  command: "ZON{zone}%M2"
  params:
    - name: zone
      type: integer
      description: Zone ID

- id: zon_mode_comfort
  label: Zone Mode Comfort
  kind: action
  command: "ZON{zone}%M5"
  params:
    - name: zone
      type: integer
      description: Zone ID

- id: zon_mode_frost
  label: Zone Mode Frost
  kind: action
  command: "ZON{zone}%M6"
  params:
    - name: zone
      type: integer
      description: Zone ID

# --- Clocks ---
- id: clk_set
  label: Set Clock Programme
  kind: action
  command: "CLK{clock_id}%K{time} {daymask} {name}"
  params:
    - name: clock_id
      type: integer
      description: Clock ID
    - name: time
      type: string
      description: "Time hh:mm:ss"
    - name: daymask
      type: string
      description: "Day bitmask (b0=Sun, b1=Mon, ...); FF disables clock"
    - name: name
      type: string
      description: "Date/period string e.g. 00/05/09 (May 2009)"

# --- Variables ---
- id: var_toggle
  label: Toggle Variable
  kind: action
  command: "VAR{var_id}"
  params:
    - name: var_id
      type: integer
      description: Variable ID (1-based)

- id: sys_toggle
  label: Toggle System Variable
  kind: action
  command: "SYS{sys_id}"
  params:
    - name: sys_id
      type: integer
      description: System variable ID

- id: sys_status
  label: System Variable Status Query
  kind: query
  command: "SYS{sys_id}%S"
  params:
    - name: sys_id
      type: integer
      description: System variable ID
```

## Feedbacks
```yaml
- id: pong
  type: string
  description: Reply to PING
- id: mod_version_drs23202
  type: string
  description: Reply from DRS23202 to MOD_VERSION, e.g. "MOD_VERSION=SER_V0A"
- id: mod_version_deth02
  type: string
  description: Reply from DETH02 to MOD_VERSION, e.g. "MOD_VERSION=ETH_V01_STK_V01"
- id: temp_status
  type: string
  description: "Temperature status: '{ModType} {serial}T{meas} {setpoint} {mode} {range}', e.g. TE1 6CT25.2 21.0 AUTO 19.5"
- id: output_bitmap
  type: string
  description: "Output bitmask: '{ModType} {serial}O{hex}', e.g. BU2    52O01 (LSB = output 0)"
- id: input_bitmap
  type: string
  description: "Input bitmask: '{ModType} {serial}I{hex}', e.g. IS4     7I00"
- id: dimmer_levels
  type: string
  description: "Dimmer levels: '{ModType} {serial}D {h1} {h2} ...' (2 hex chars per dimmer)"
- id: var_status
  type: string
  description: "Variable: 'VAR {id}O{00|01}' (bool) or 'VAR{id}D{hex}' (dimmer-style)"
- id: sys_status
  type: string
  description: "System var: 'SYS {id}O{00|01}'"
- id: shutter_up
  type: string
  description: "Shutter UP: 'TPV {serial}O01'"
- id: d10_level
  type: string
  description: "0-10V level: 'D10 {serial}D{hex}', e.g. D10     1D32 = 50%"
- id: amp_status
  type: string
  description: "AMP sound status: 'AMP {serial}S{out}-{vol}-{src}-{freq}', e.g. AMP 3S1-1D-TUNE-6A-0FA0"
- id: fan_status
  type: string
  description: "DFAN01 status: 'FAN{serial}O{hex}', e.g. FAN000001O20 (off, manual)"
- id: i10_status
  type: string
  description: "DIN10V status: 'I10{serial}D{hex}'"
- id: dmx_status
  type: string
  description: "DDMX01 status: 'DMX {serial}-{dev}X{ch1}{ch2}...' (hex per channel)"
- id: clock_status
  type: string
  description: "Clock status: 'CLK {id}K{time}-{daymask}-{name}-{type}'"
- id: pbl_button_event
  type: string
  description: "DPBTLCD button event: 'PBL {serial}B{btn}{00|01}'"
- id: pbl_temperature
  type: string
  description: "DPBTLCD02 temperature: 'PBL {serial}T{meas} {setpoint} {mode} {range}'"
- id: app_info_dump
  type: string
  description: "APPINFO application description dump (lines terminated by 'END APPINFO ...')"
```

## Variables
```yaml
# UNRESOLVED: source describes per-module output/input bits and dimmer values as protocol data, not as settable runtime variables outside the protocol commands above.
```

## Events
```yaml
# Unsolicited status notifications sent from Domintell to the host - see Feedbacks above for the canonical output frames (status changes are pushed as the bitmaps/dimmers/temperature strings). Source does not enumerate discrete event IDs beyond the per-change notifications.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step command sequences beyond the Sfere (SFE) scenes which are configured server-side; not protocol macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "DFAN01 valves follow setpoint regulation; toggle valves only by changing the associated sensor setpoint. If valves are OFF, the fan will not start."
  - description: "6th DFAN01 output selects working mode: 0 = auto, 1 = manual."
  - description: "Do NOT connect Domintell bus on the DETH0x RJ45 connector - can cause fatal damages to the DETH0x module."
  - description: "Allowing incoming Internet connections exposes the LAN if router is misconfigured."
```

## Notes
Source is the Domintell RS232/ETHERNET communication datasheet (v1.19.17, 12/01/2012). It covers the gateway modules DRS23201, DRS23202, DRS23203, DETH02, DETH03, DETH04 and the protocol used to command Domintell bus modules (DPBU, DISM, DBIR01, DTRV, DTRP, DDIM01, DOUT10V01, DTEM, DDIR01, DLED01, DMOV01, DTSC, DTRVBT01, DAMPLI01, DFAN01, DMR01, DIN10V01, DPBTLCD0x, DDMX01). Device model "Dpbt04 B" is not literally present in the source; DPBTLCD0x is the closest match.

Differences between DRS23201 (string exchange) and DRS23202/DETH02 (light protocol):
- DRS23201: 8/N/1, parity selectable (since v4). Baud 1200–76800.
- DRS23202: 8/N/1, baud fixed 57600.
- DETH02: UDP port 17481 (default), DHCP ports 67/68, optional LOGIN session.

Frame encapsulation: multiple commands may be combined in one message using the reserved '&' character (25 ms minimum spacing between RS-232 messages). Maximum 30 characters per message. Lower-case is auto-uppercased. Control chars via `<xx>` decimal (00-31) since DRS23201 v5.

Ethernet login: `LOGIN` (no password) or `LOGIN{encrypted_password}` (min 4 / max 10 chars, encrypted via libdeth `deth_encryptpsw`). "Exclusive session" option prevents concurrent logins.

<!-- UNRESOLVED: Dpbt04 B model identification, firmware compatibility, exact baud when target is RS-232 only vs full DETH02. -->

## Provenance

```yaml
source_domains:
  - pro2.mydomintell.com
  - pro.mydomintell.com
  - github.com
source_urls:
  - https://pro2.mydomintell.com/share/manual/DETH02-DRS23202/DS_RS232_ETH_Interfaces_v1_19_17.pdf
  - https://pro.mydomintell.com/share/manual/DETH02-DRS23202/DS_RS232_ETH_Interfaces_v1_27_08.pdf
  - https://github.com/zilvinasbin/python-domintell
retrieved_at: 2026-08-11T04:54:10.428Z
last_checked_at: 2026-08-19T09:20:22.327Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:20:22.327Z
matched_actions: 80
action_count: 80
confidence: medium
summary: "All 80 spec actions match verbatim input-protocol strings or reserved command strings in the source; transport (57600 8N1, UDP 17481) confirmed. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TRP   151-4"
- "exact model \"Dpbt04 B\" not found in source. Spec covers DPBTLCD0x family as best match. Dpbt04 B firmware version not stated."
- "no explicit power on/off commands in source"
- "source describes per-module output/input bits and dimmer values as protocol data, not as settable runtime variables outside the protocol commands above."
- "source does not document multi-step command sequences beyond the Sfere (SFE) scenes which are configured server-side; not protocol macros."
- "Dpbt04 B model identification, firmware compatibility, exact baud when target is RS-232 only vs full DETH02."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
