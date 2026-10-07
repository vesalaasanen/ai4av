---
spec_id: admin/extron-mlc-62-rs
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron MLC 62 RS Control Spec"
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
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/68-2166-01_E_MLC_60_Series_UG.pdf
  - https://www.extron.com/product/mlc62rscc
  - https://www.extron.com
retrieved_at: 2026-07-01T03:31:33.398Z
last_checked_at: 2026-10-07T12:50:26.448Z
generated_at: 2026-10-07T12:50:26.448Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The user-designated device name \"MLC62RSCC\" is not explicitly named in the source, which documents the broader MLC 60 Series (MLC 62 RS D / EU / MK, MLC 62 IR D, MLC 64 RS D). \"CC\" may denote a configuration/feature variant not covered by this document."
  - "Power on/off commands for the controller itself are not documented (the MLC has no PW-type power command); only a power-on copyright message is emitted."
  - "no multi-step command sequences described in source"
  - "source contains no explicit safety interlock procedures,"
  - "Device name \"MLC62RSCC\" / \"CC\" variant not named in source; source documents MLC 60 Series (MLC 62 RS D/EU/MK, MLC 62 IR D, MLC 64 RS D)."
  - "firmware version compatibility range not stated in source."
verification:
  verdict: verified
  checked_at: 2026-10-07T12:50:26.448Z
  matched_actions: 23
  action_count: 23
  confidence: medium
  summary: "All 23 action units match literal SIS commands in the source, serial transport values are supported, and the source catalogue is fully covered. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Extron MLC 62 RS Control Spec

## Summary
The Extron MLC 60 Series MediaLink Controllers are wall-mounted control panels that issue RS-232, IR, relay, and digital-input control signals to attached displays, switchers, and room devices. This spec covers the SIS (Simple Instruction Set) command set delivered over a bidirectional RS-232 (Remote) serial connection, with discrete audio volume, relay, digital-input, front-panel lockout, device-naming, and information-query commands.

<!-- UNRESOLVED: The user-designated device name "MLC62RSCC" is not explicitly named in the source, which documents the broader MLC 60 Series (MLC 62 RS D / EU / MK, MLC 62 IR D, MLC 64 RS D). "CC" may denote a configuration/feature variant not covered by this document. -->

<!-- UNRESOLVED: Power on/off commands for the controller itself are not documented (the MLC has no PW-type power command); only a power-on copyright message is emitted. -->

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
  type: UNRESOLVED
# RS-232 is delivered via the rear-panel 3-pole captive-screw REMOTE port
# (bidirectional; host→Tx/Rx/G). Unidirectional serial control out of the
# device also exists via PORT A COM and PORT B IR/S, but SIS is issued to the
# controller through the REMOTE port.
```

## Traits
```yaml
# - queryable  (inferred from query command examples: Q, N, I, X@ O, etc.)
# - levelable  (inferred from volume table / +V -V commands)
```

## Actions
```yaml
# SIS symbol legend (verbatim from source):
#   E      = Escape key (0x1B), prefix for extended commands
#   ]      = CR/LF (0x0D 0A), terminates most responses and is the documented
#            command for viewing digital-input state
#   }      = Soft carriage return (0x0D), command terminator (no LF)
#   space  = literal space character
#   X!     = button number 01..10 (front panel top-left to bottom-right)
#   X@     = relay port 1..2
#   X#     = pulse length 1..255 in 0.5s increments (default 1 = 0.5s)
#   X(     = volume table level, up to 3 digits, >= 0
#   X1@    = device name, up to 24 alphanumeric chars
# Commands are NOT case-sensitive unless otherwise indicated.

- id: trigger_button
  label: Trigger Button
  kind: action
  command: "E B* {button} BTNO}"
  params:
    - name: button
      type: integer
      description: "Front-panel button number (01..10), zero-padded"

- id: set_volume_level
  label: Set Volume Level
  kind: action
  command: "{level}V"
  params:
    - name: level
      type: integer
      description: "Volume table level (up to 3 digits, >= 0; leading zeros optional). MLC 62 RS models with volume tables only."

- id: increment_volume
  label: Increment Volume
  kind: action
  command: "+V"
  params: []

- id: decrement_volume
  label: Decrement Volume
  kind: action
  command: "-V"
  params: []

- id: view_volume_level
  label: View Volume Level
  kind: query
  command: "V"
  params: []

- id: pulse_relay
  label: Pulse Relay
  kind: action
  command: "{relay}*3*{pulse}O"
  params:
    - name: relay
      type: integer
      description: "Relay port (1..2)"
    - name: pulse
      type: integer
      description: "Pulse length in 0.5s increments (1..255; 1=0.5s, 255≈130s)"

- id: toggle_relay
  label: Toggle Relay
  kind: action
  command: "{relay}*2O"
  params:
    - name: relay
      type: integer
      description: "Relay port (1..2)"

- id: force_relay_on
  label: Force Relay On
  kind: action
  command: "{relay}*1O"
  params:
    - name: relay
      type: integer
      description: "Relay port (1..2)"

- id: force_relay_off
  label: Force Relay Off
  kind: action
  command: "{relay}*0O"
  params:
    - name: relay
      type: integer
      description: "Relay port (1..2)"

- id: view_relay_state
  label: View Relay State
  kind: query
  command: "{relay}O"
  params:
    - name: relay
      type: integer
      description: "Relay port (1..2)"

- id: view_digital_input_state
  label: View Digital Input State
  kind: query
  command: "]"
  params: []

- id: front_panel_lockout_off
  label: Front Panel Lockout Off
  kind: action
  command: "0X"
  params: []

- id: front_panel_lockout_on
  label: Front Panel Lockout On
  kind: action
  command: "1X"
  params: []

- id: view_lockout_status
  label: View Lockout Status
  kind: query
  command: "X"
  params: []

- id: set_unit_name
  label: Set Unit Name
  kind: action
  command: "E {name} CN}"
  params:
    - name: name
      type: string
      description: "Device name, up to 24 alphanumeric chars; first char alphabetic, last char not a hyphen/minus; no spaces."

- id: set_unit_name_default
  label: Set Unit Name to Default
  kind: action
  command: "E CN}"
  params: []

- id: configuration_reset
  label: Configuration Reset
  kind: action
  command: "E ZXXX}"
  params: []

- id: query_firmware_version
  label: Query Firmware Version
  kind: query
  command: "Q"
  params: []

- id: query_firmware_compat_version
  label: Query Firmware Compatibility Version
  kind: query
  command: "**Q"
  params: []

- id: query_device_config_compat_version
  label: Query Device Configuration Compatibility Version
  kind: query
  command: "E DIMQ}"
  params: []

- id: request_part_number
  label: Request Controller Part Number
  kind: query
  command: "N"
  params: []

- id: query_model_name
  label: Query Model Name
  kind: query
  command: "I"
  params: []

- id: query_led_status
  label: Query LED Status
  kind: query
  command: "E LC}"
  params: []
```

## Feedbacks
```yaml
- id: button_press_response
  type: string
  values: ["BtnoB*{button}]"]
  description: "Response when a button is triggered (e.g. BtnoB*05]). Format: BtnoB*<button>]."

- id: relay_state_response
  type: string
  values: ["Rly{relay}*{state}]"]
  description: "Relay action/state response. {state}: 0=open (disengaged), 1=closed (engaged)."

- id: volume_level_response
  type: string
  values: ["Vol{level}]", "Vol+]", "Vol-]", "---]"]
  description: "Volume responses. With volume table: Vol<level>]; without table: Vol+/Vol-/---."

- id: lockout_status_response
  type: enum
  values: ["Exe0", "Exe1", "{state}"]
  description: "0X/1X return Exe0/Exe1; view (X) returns X1! (0=off, 1=on)."

- id: firmware_version_response
  type: string
  description: "Firmware version to two decimals (e.g. 1.00])."

- id: led_status_response
  type: string
  description: "32-digit LED status number; each digit 0..4 (0=off,1=dim,2=on,3=slow blink,4=fast blink). Digits in descending LED order 32..1."

- id: error_response
  type: enum
  values: ["E10", "E13", "E14", "E22"]
  description: "E10 invalid command/parameter; E13 invalid value (out of range); E14 not valid for this configuration; E22 busy."
```

## Variables
```yaml
- id: volume_level
  type: integer
  description: "Current volume table level (devices with volume tables only)."

- id: device_name
  type: string
  description: "MLC device name (up to 24 alphanumeric chars)."

- id: relay_state
  type: enum
  values: [open, closed]
  description: "Per-relay-port state (relay 1, relay 2)."

- id: lockout_mode
  type: enum
  values: [off, on]
  description: "Front-panel executive lockout state."

- id: digital_input_state
  type: enum
  values: [low, high]
  description: "Digital Input port state (0=low, 1=high)."

- id: led_status
  type: string
  description: "32-digit LED status string (front-panel LED states)."
```

## Events
```yaml
- id: button_press_notification
  description: "Controller-initiated message sent on a local event (e.g. front-panel button press) indicating the selection entered. No host response required."

- id: power_on_copyright
  description: "Sent only when the MLC first powers on (RS-232 only; not via USB). Format: (c)Copyright20nn,ExtronElectronics,MLCnn,vn.nn,60-nnnn-nn - encodes model, firmware version, and part number."
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety interlock procedures,
# confirmation requirements, or power-on sequencing. Stated electrical ratings
# (relays: 24 V, 1 A normally open; Digital Input: 0-24 VDC, low <1.0 VDC,
# high >1.5 VDC, internal selectable +5 VDC pull-up) are informational specs,
# not interlock procedures, and are recorded in Notes.
```

## Notes
- SIS commands are strings of one or more characters per field; no special start/end characters are required to begin or end a command sequence (only the terminators `}` and `]` apply as defined in the symbol table).
- Most responses end with CR/LF (`]` = `0D 0A`).
- Commands are NOT case-sensitive unless otherwise indicated.
- Relays are normally-open, rated 24 V, 1 A (source-stated).
- Digital Input port accepts 0–24 VDC; threshold low <1.0 VDC, high >1.5 VDC; internal selectable +5 VDC pull-up.
- Relay/Digital-Input/Discrete-volume features are RS-model only; IR models omit them.
- Discrete volume (`X(V`) works only on MLC 62 RS models with driver volume tables; on drivers without a volume table, `X(V` returns `E14`.
- Part-number map (source-stated): MLC 62 RS D = 60-1005-02; MLC 62 RS EU = 60-1005-35; MLC 62 RS MK = 60-1005-23; MLC 62 IR D = 60-1006-02; MLC 64 RS D = 60-1182-02.
- Compatibility version numbers: X2% (firmware) and X2^ (device config) are 6-digit (3 major + 3 minor after decimal); matching major numbers = compatible.
- The source documents `]` as the host command to view digital-input state; the response is `X^]` (0=low, 1=high).

<!-- UNRESOLVED: Device name "MLC62RSCC" / "CC" variant not named in source; source documents MLC 60 Series (MLC 62 RS D/EU/MK, MLC 62 IR D, MLC 64 RS D). -->
<!-- UNRESOLVED: firmware version compatibility range not stated in source. -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/68-2166-01_E_MLC_60_Series_UG.pdf
  - https://www.extron.com/product/mlc62rscc
  - https://www.extron.com
retrieved_at: 2026-07-01T03:31:33.398Z
last_checked_at: 2026-10-07T12:50:26.448Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:50:26.448Z
matched_actions: 23
action_count: 23
confidence: medium
summary: "All 23 action units match literal SIS commands in the source, serial transport values are supported, and the source catalogue is fully covered. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The user-designated device name \"MLC62RSCC\" is not explicitly named in the source, which documents the broader MLC 60 Series (MLC 62 RS D / EU / MK, MLC 62 IR D, MLC 64 RS D). \"CC\" may denote a configuration/feature variant not covered by this document."
- "Power on/off commands for the controller itself are not documented (the MLC has no PW-type power command); only a power-on copyright message is emitted."
- "no multi-step command sequences described in source"
- "source contains no explicit safety interlock procedures,"
- "Device name \"MLC62RSCC\" / \"CC\" variant not named in source; source documents MLC 60 Series (MLC 62 RS D/EU/MK, MLC 62 IR D, MLC 64 RS D)."
- "firmware version compatibility range not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
