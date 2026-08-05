---
spec_id: admin/extron-mlc62btnkit
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron MLC 60 Series Control Spec"
manufacturer: Extron
model_family: "MLC 62 RS D"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "MLC 62 RS D"
    - "MLC 62 RS EU"
    - "MLC 62 RS MK"
    - "MLC 62 IR D"
    - "MLC 64 RS D"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/68-2166-01_E_MLC_60_Series_UG.pdf
  - https://www.extron.com/download/download-center
retrieved_at: 2026-07-11T01:28:41.914Z
last_checked_at: 2026-07-12T08:59:05.565Z
generated_at: 2026-07-12T08:59:05.565Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "USB configuration port commands not documented in this source. Port A Com and Port B IR/S output port user-programmed command strings not covered — configured via MLC configuration software, not via SIS. IR emitter commands not documented."
  - "no multi-step sequences described explicitly in source"
  - "exact byte layout of ESC-prefixed commands — spaces between backtick-quoted tokens in source may be documentation formatting. Verify with device testing."
  - "en-dash (–) in volume decrement command may represent ASCII minus (0x2D). Verify with device testing."
  - "firmware version compatibility ranges not stated in source"
  - "USB port SIS command set not documented in this source"
  - "IR emitter command protocol not documented in this source"
  - "Port A Com / Port B IR/S user-programmed output command configuration not documented (configured via MLC configuration software)"
verification:
  verdict: verified
  checked_at: 2026-07-12T08:59:05.565Z
  matched_actions: 23
  action_count: 23
  confidence: medium
  summary: "All 23 spec actions matched literal commands in source; transport parameters verified; full command coverage confirmed. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-11
---

# Extron MLC 60 Series Control Spec

## Summary

Extron MLC 60 Series MediaLink Controllers are media room control panels providing RS-232, IR, relay, and digital input control for display devices and switchers. This spec covers the Simple Instruction Set (SIS) commands used to control the MLC via the bidirectional RS-232 Remote port. The MLC62BTNKIT is a button kit accessory; the controllable device is the MLC 60 Series controller (MLC 62 RS, MLC 62 IR, MLC 64 RS variants).

<!-- UNRESOLVED: USB configuration port commands not documented in this source. Port A Com and Port B IR/S output port user-programmed command strings not covered — configured via MLC configuration software, not via SIS. IR emitter commands not documented. -->

## Transport
```yaml
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
- queryable  # inferred from query command examples (Q, N, I, etc.)
- levelable  # inferred from volume control commands (+V, -V, X(V)
```

## Actions
```yaml
# SIS Symbol Key (from source):
#   E   = ESC (0x1B)
#   }   = soft carriage return (0x0D, no line feed)
#   ]   = CR/LF (0x0D 0x0A)
#   •   = space (0x20)
#   X!  = button number: 01-10
#   X@  = relay port number: 1 or 2
#   X#  = pulse length: 1-255 (increments of 0.5 seconds)
#   X(  = volume level: up to 3 digits
#   X1@ = device name: up to 24 alphanumeric chars
#   X1! = lockout mode: 0=off, 1=on
#   X^  = digital input state: 0=low, 1=high
#   X*  = firmware version (n.nn)
#   X2% = firmware compatibility version (nnn.nnn)
#   X2^ = device config compatibility version (nnn.nnn)
#   X2# = relay status: 0=open, 1=closed
#   X4( = default product name
#   X5) = LED status: 32-digit number
#
# NOTE: Commands are NOT case-sensitive unless otherwise indicated.
# Spaces between backtick-quoted tokens in source tables are documentation
# formatting; concatenate tokens for actual transmission. The • symbol
# inside a token represents an actual space byte (0x20).

- id: trigger_button
  label: Trigger Button
  kind: action
  command: "E B*{button}BTNO}"
  params:
    - name: button
      type: string
      description: "Button number 01-10. Buttons numbered from front panel top-left (01) to bottom-right (10)."
  notes: "Executes commands programmed to the button. Same as pressing the button on the front panel."

- id: set_volume_level
  label: Set Volume Level
  kind: action
  command: "{level}V"
  params:
    - name: level
      type: string
      description: "Volume table level, up to 3 digits. Leading zeros optional. Only positive values allowed. Only for MLC 62 RS models with volume tables."
  notes: "Out-of-range values return E13. Devices without volume tables return E14."

- id: volume_increment
  label: Volume Increment
  kind: action
  command: "+V"
  params: []
  notes: "Response: 'Vol{level}]' on devices with volume tables; 'Vol+]' on devices without."

- id: volume_decrement
  label: Volume Decrement
  kind: action
  command: "-V"
  params: []
  notes: "Source uses en-dash (-, U+2013); may represent ASCII minus (0x2D). Response: 'Vol{level}]' on devices with volume tables; 'Vol-]' on devices without."

- id: volume_view
  label: View Volume Level
  kind: query
  command: "V"
  params: []
  notes: "Response: '{level}]' on devices with volume tables; '---]' on devices without."

- id: pulse_relay
  label: Pulse Relay
  kind: action
  command: "{relay}*3*{pulse_length}O"
  params:
    - name: relay
      type: integer
      description: "Relay port number: 1 = Relay 1, 2 = Relay 2"
    - name: pulse_length
      type: integer
      description: "Pulse length in 0.5-second increments: 1 = 0.5s, 2 = 1s, ..., 255 ≈ 130s. Default is 1."
  notes: "Response includes relay status: 'Rly{relay}*{status}]'."

- id: toggle_relay
  label: Toggle Relay
  kind: action
  command: "{relay}*2O"
  params:
    - name: relay
      type: integer
      description: "Relay port number: 1 = Relay 1, 2 = Relay 2"
  notes: "Toggles relay between on (closed) and off (open). Response: 'Rly{relay}*{status}]'."

- id: force_relay_on
  label: Force Relay On
  kind: action
  command: "{relay}*1O"
  params:
    - name: relay
      type: integer
      description: "Relay port number: 1 = Relay 1, 2 = Relay 2"
  notes: "Sets relay to closed (on). Response: 'Rly{relay}*1]'."

- id: force_relay_off
  label: Force Relay Off
  kind: action
  command: "{relay}*0O"
  params:
    - name: relay
      type: integer
      description: "Relay port number: 1 = Relay 1, 2 = Relay 2"
  notes: "Sets relay to open (off). Response: 'Rly{relay}*0]'."

- id: view_relay_state
  label: View Relay State
  kind: query
  command: "{relay}O"
  params:
    - name: relay
      type: integer
      description: "Relay port number: 1 = Relay 1, 2 = Relay 2"
  notes: "Response: status (0=open, 1=closed) + CR/LF."

- id: view_digital_input_state
  label: View Digital Input State
  kind: query
  command: "]"
  params: []
  notes: "Command is CR/LF (0x0D 0x0A). Response: state (0=low, 1=high) + CR/LF. RS models only."

- id: front_panel_lockout_off
  label: Front Panel Lockout Off
  kind: action
  command: "0X"
  params: []
  notes: "Unlocks all front panel buttons. Response: 'Exe0]'."

- id: front_panel_lockout_on
  label: Front Panel Lockout On
  kind: action
  command: "1X"
  params: []
  notes: "Locks all front panel buttons (executive mode). Response: 'Exe1]'."

- id: view_lockout_status
  label: View Lockout Status
  kind: query
  command: "X"
  params: []
  notes: "Response: lockout state (0=off, 1=on) + CR/LF."

- id: set_unit_name
  label: Set Unit Name
  kind: action
  command: "E {name} CN}"
  params:
    - name: name
      type: string
      description: "Device name up to 24 alphanumeric characters. First character must be alphabetic. Last character cannot be hyphen/minus (-). No spaces permitted."
  notes: "Response: 'Ipn•{name}]'."

- id: set_unit_name_default
  label: Set Unit Name to Default
  kind: action
  command: "E•CN}"
  params: []
  notes: "Resets name to factory default. Response: 'Ipn•{default_name}]'. Default names: MLC-62-RS, MLC-62-IR, MLC-64-RS-D."

- id: configuration_reset
  label: Configuration Reset
  kind: action
  command: "E ZXXX}"
  params: []
  notes: "Resets MLC configuration to factory default. Response: 'ZapXXX]'."

- id: query_firmware_version
  label: Query Firmware Version
  kind: query
  command: "Q"
  params: []
  notes: "Response: firmware version (n.nn) + CR/LF. Example: '1.00]'."

- id: query_firmware_compatibility_version
  label: Query Firmware Compatibility Version
  kind: query
  command: "**Q"
  params: []
  notes: "Response: firmware compatibility version (nnn.nnn) + CR/LF."

- id: query_device_config_compatibility_version
  label: Query Device Config Compatibility Version
  kind: query
  command: "E DIMQ}"
  params: []
  notes: "Response: device config compatibility version (nnn.nnn) + CR/LF. Example: '002.100]'."

- id: request_part_number
  label: Request Part Number
  kind: query
  command: "N"
  params: []
  notes: "Response: part number + CR/LF. Known values: MLC 62 RS D = 60-1005-02, MLC 62 RS EU = 60-1005-35, MLC 62 RS MK = 60-1005-23, MLC 62 IR D = 60-1006-02, MLC 64 RS D = 60-1182-02."

- id: query_model_name
  label: Query Model Name
  kind: query
  command: "I"
  params: []
  notes: "Response: model name + CR/LF. Examples: 'MLC•62•RS•D]', 'MLC•62•RS•EU]', 'MLC•62•RS•MK]', 'MLC•62•IR•D]', 'MLC•64•RS•D]'."

- id: query_led_status
  label: Query LED Status
  kind: query
  command: "E LC}"
  params: []
  notes: "Response: 32-digit number + CR/LF. Each digit (0-4) represents an LED status: 0=off, 1=dim, 2=on(bright), 3=slow blink, 4=fast blink. Digits ordered LED 32 (leftmost) to LED 1 (rightmost). See LED maps in source for MLC 62 vs MLC 64."
```

## Feedbacks
```yaml
- id: button_press_notification
  type: string
  description: "Unsolicited message sent when front panel button is pressed locally. Format: 'BtnoB*{button}]'."

- id: power_on_copyright
  type: string
  description: "Sent only on power-on via RS-232 (not USB). Format: '(c)Copyright20nn,ExtronElectronics,MLCnn,vn.nn,60-nnnn-nn'. Contains model name, firmware version, and part number."

- id: error_response
  type: enum
  values:
    - E10  # Invalid command or parameter
    - E13  # Invalid value (out of range)
    - E14  # Not valid for this configuration
    - E22  # Busy
  description: "Returned when command is invalid or cannot be executed. Format: 'E{code}' + CR/LF."

- id: volume_level_response
  type: string
  description: "Response to volume query/increment/decrement. With volume tables: 'Vol{level}]' or '{level}]'. Without: 'Vol+]', 'Vol-]', or '---]'."

- id: relay_state_response
  type: string
  description: "Response to relay commands. Format: 'Rly{relay}*{status}]' or '{status}]'. Status: 0=open, 1=closed."

- id: digital_input_state_response
  type: enum
  values: ["0", "1"]
  description: "Response to digital input query. 0=low, 1=high."

- id: lockout_status_response
  type: string
  description: "Response to lockout commands. 'Exe0]' (off), 'Exe1]' (on), or '{state}]' (query)."

- id: firmware_version_response
  type: string
  description: "Firmware version to two decimal places (n.nn)."

- id: firmware_compatibility_response
  type: string
  description: "Firmware compatibility version (nnn.nnn). Major (first 3 digits) must match for compatibility."

- id: device_config_compatibility_response
  type: string
  description: "Device config compatibility version (nnn.nnn). Major (first 3 digits) must match for compatibility."

- id: part_number_response
  type: string
  description: "Controller part number (60-nnnn-nn)."

- id: model_name_response
  type: string
  description: "Model name with space separators (e.g. 'MLC•62•RS•D')."

- id: led_status_response
  type: string
  description: "32-digit number, each digit 0-4 representing LED status."

- id: device_name_response
  type: string
  description: "Response to set name command. Format: 'Ipn•{name}]'."
```

## Variables
```yaml
# All settable parameters are covered by discrete Actions above:
# - Volume level (set_volume_level, volume_increment, volume_decrement)
# - Relay states (force_relay_on/off, toggle_relay, pulse_relay)
# - Lockout mode (front_panel_lockout_on/off)
# - Device name (set_unit_name, set_unit_name_default)
# No additional continuous variables documented in source.
```

## Events
```yaml
- id: button_pressed
  description: "Sent when a front panel button is pressed locally. No host response required."
  payload: "BtnoB*{button}]"
  params:
    - name: button
      type: string
      description: "Button number 01-10 that was pressed."

- id: power_on_message
  description: "Sent only when MLC first powers on via RS-232 connection. Does not appear with USB connection."
  payload: "(c)Copyright20nn,ExtronElectronics,MLCnn,vn.nn,60-nnnn-nn"
  params:
    - name: year
      type: string
      description: "Copyright year (20nn)"
    - name: model
      type: string
      description: "MLC model name (MLCnn)"
    - name: firmware_version
      type: string
      description: "Firmware version (n.nn)"
    - name: part_number
      type: string
      description: "Model part number (60-nnnn-nn)"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source documents relay ratings (normally open, 24 V, 1 A) and digital input
# voltage thresholds (0-24 VDC; <1.0 VDC = low, >1.5 VDC = high) but does not
# describe safety warnings, interlock procedures, or power-on sequencing
# requirements. Relay ratings and voltage thresholds noted in Notes section.
```

## Notes

**Device mapping:** MLC62BTNKIT is a button kit accessory (cosmetic button caps/bezel). The controllable RS-232 device is the MLC 60 Series controller family: MLC 62 RS D, MLC 62 RS EU, MLC 62 RS MK, MLC 62 IR D, and MLC 64 RS D.

**SIS communication:** SIS commands are strings of one or more characters. No special characters required to begin or end a command sequence. The MLC validates and executes valid commands, then sends a response. Most responses end with CR/LF (0x0D 0x0A).

**Serial connection:** The Remote port is a 3-pole, 3.5 mm captive screw connector for bidirectional RS-232. Pin 1 = Tx, Pin 2 = Rx, Pin 3 = G. Use a female 9-pin to bare wire RS-232 cable or universal control cable (UC50', UC100').

**Port architecture:**
- Remote port (Port A) — bidirectional RS-232 for SIS control and configuration
- Port A Com (RS models) — unidirectional RS-232 output to control display/switcher
- Port B IR/S (RS models) — unidirectional RS-232 or IR output (configurable)
- Port A IR (MLC 62 IR D) — IR output only
- Relays port (RS models) — 2 normally open relays, rated 24 V, 1 A
- Digital Input port (RS models) — accepts 0-24 VDC; <1.0 VDC = logic low, >1.5 VDC = logic high; internal +5 VDC selectable pull-up resistor

**Volume table behavior:** MLC 62 RS models may have serial drivers with volume tables. Devices with volume tables support discrete level setting (`{level}V`). Devices without return E14 for discrete set attempts. Increment/decrement/view commands work on both but return different response formats.

**Compatibility versioning:** Firmware (X2%) and device config (X2^) compatibility versions each have major (first 3 digits) and minor (last 3 digits) numbers. Matching major numbers = compatible. Mismatched minor numbers may not be backward compatible.

**LED status (X5)):** 32-digit number, digits ordered LED 32 (leftmost) to LED 1 (rightmost). MLC 62 uses LEDs 1-25 (26-32 unused). MLC 64 uses LEDs 1-20 (21-32 unused). Each digit: 0=off, 1=dim, 2=on, 3=slow blink, 4=fast blink.

<!-- UNRESOLVED: exact byte layout of ESC-prefixed commands — spaces between backtick-quoted tokens in source may be documentation formatting. Verify with device testing. -->
<!-- UNRESOLVED: en-dash (–) in volume decrement command may represent ASCII minus (0x2D). Verify with device testing. -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated in source -->
<!-- UNRESOLVED: USB port SIS command set not documented in this source -->
<!-- UNRESOLVED: IR emitter command protocol not documented in this source -->
<!-- UNRESOLVED: Port A Com / Port B IR/S user-programmed output command configuration not documented (configured via MLC configuration software) -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/68-2166-01_E_MLC_60_Series_UG.pdf
  - https://www.extron.com/download/download-center
retrieved_at: 2026-07-11T01:28:41.914Z
last_checked_at: 2026-07-12T08:59:05.565Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-12T08:59:05.565Z
matched_actions: 23
action_count: 23
confidence: medium
summary: "All 23 spec actions matched literal commands in source; transport parameters verified; full command coverage confirmed. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "USB configuration port commands not documented in this source. Port A Com and Port B IR/S output port user-programmed command strings not covered — configured via MLC configuration software, not via SIS. IR emitter commands not documented."
- "no multi-step sequences described explicitly in source"
- "exact byte layout of ESC-prefixed commands — spaces between backtick-quoted tokens in source may be documentation formatting. Verify with device testing."
- "en-dash (–) in volume decrement command may represent ASCII minus (0x2D). Verify with device testing."
- "firmware version compatibility ranges not stated in source"
- "USB port SIS command set not documented in this source"
- "IR emitter command protocol not documented in this source"
- "Port A Com / Port B IR/S user-programmed output command configuration not documented (configured via MLC configuration software)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
