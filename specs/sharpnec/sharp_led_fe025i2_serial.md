---
spec_id: admin/sharp-nec-led-fe025i2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FE025I2 Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FE025I2"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FE025I2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:06:07.547Z
last_checked_at: 2026-06-18T08:07:20.985Z
generated_at: 2026-06-18T08:07:20.985Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal value table, base model type values, sub-input setting values, eco mode values, and aspect values are referenced as \"see Appendix\" but the appendix is not present in the refined source. Control ID (ID1) and model code (ID2) default values not stated."
  - "default baud rate not stated (five options documented)"
  - "flow control not stated; full-duplex mode stated"
  - "appendix not in source.\""
  - "default value, valid range, and adjustment bounds are returned"
  - "no events found in source."
  - "no macros found in source."
  - "no explicit power-on sequencing procedure or confirmation"
  - "source references an \"Appendix: Supplementary Information by Command\" containing value tables for input terminals, base model types, sub-input setting values, eco mode values, and aspect values. The appendix is NOT present in the refined source document. Default ID1 (control ID) and ID2 (model code) byte values are not stated. Firmware/protocol version not stated beyond manual revision BDT140013 Rev 7.1. Wireless LAN unit models not specified."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:07:20.985Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FE025I2 Control Spec

## Summary
Sharp/NEC LED FE025I2 projector, controlled via binary hex-byte command protocol over RS-232C serial or wired/wireless LAN (TCP). This spec covers the command set described in the Projector Control Command Reference Manual (BDT140013 Rev 7.1): power, input switching, mute, picture/volume/aspect/gain adjustment, lens control & memory, status queries, eco/PIP/edge-blending settings, and information requests.

<!-- UNRESOLVED: input terminal value table, base model type values, sub-input setting values, eco mode values, and aspect values are referenced as "see Appendix" but the appendix is not present in the refined source. Control ID (ID1) and model code (ID2) default values not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands"
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; no single default stated
  # UNRESOLVED: default baud rate not stated (five options documented)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; full-duplex mode stated
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 015 POWER ON / 016 POWER OFF commands present
  - queryable    # inferred: many request commands returning values (078-*, 037-*, 097-*, etc.)
  - levelable    # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 030-15 OTHER ADJUST
  - routable     # inferred: 018 INPUT SW CHANGE (input terminal switch)
```

## Actions
```yaml
# Common parameters for ALL commands:
#   ID1  = control ID (projector-set value)
#   ID2  = model code (varies by model)
#   CKS  = checksum = low byte of sum of all preceding bytes
# Format examples in source use "NNh" hex notation and <PARAM> placeholders.
# Fixed payload bytes are emitted verbatim; <DATA0N> are command-specific params (see params).

- id: error_status_request
  label: Error Status Request (009)
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: Power On (015)
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "While turning on, no other command accepted."

- id: power_off
  label: Power Off (016)
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "During power-off incl. cooling time, no other command accepted."

- id: input_sw_change
  label: Input SW Change (018)
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal hex (e.g. 06h=video). Full list: see Appendix - UNRESOLVED: appendix not in source."

- id: picture_mute_on
  label: Picture Mute On (020)
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: Picture Mute Off (021)
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: Sound Mute On (022)
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: Sound Mute Off (023)
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On (024)
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off (025)
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust (030-1)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: string
      description: "Mode: 00h=absolute, 01h=relative"
    - name: data03
      type: string
      description: "Value low-order 8 bits"
    - name: data04
      type: string
      description: "Value high-order 8 bits"

- id: volume_adjust
  label: Volume Adjust (030-2)
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: string
      description: "Mode: 00h=absolute, 01h=relative"
    - name: data02
      type: string
      description: "Value low-order 8 bits"
    - name: data03
      type: string
      description: "Value high-order 8 bits"

- id: aspect_adjust
  label: Aspect Adjust (030-12)
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Aspect value. Full list: see Appendix - UNRESOLVED: appendix not in source."

- id: other_adjust
  label: Other Adjust / Lamp Adjust (030-15)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: string
      description: "Target hi: 96h = LAMP ADJUST / LIGHT ADJUST"
    - name: data02
      type: string
      description: "Target lo: FFh (paired with 96h)"
    - name: data03
      type: string
      description: "Mode: 00h=absolute, 01h=relative"
    - name: data04
      type: string
      description: "Value low-order 8 bits"
    - name: data05
      type: string
      description: "Value high-order 8 bits"

- id: information_request
  label: Information Request (037)
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time sec (DATA83-86), filter usage time sec (DATA87-90). Updated at 1-min intervals."

- id: filter_usage_information_request
  label: Filter Usage Information Request (037-3)
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time sec (DATA01-04) and filter alarm start time sec (DATA05-08); -1 if undefined."

- id: lamp_information_request_3
  label: Lamp Information Request 3 (037-4)
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: string
      description: "Content: 01h=usage time sec, 04h=remaining life %"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request (037-6)
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code (050)
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Key code low byte (see key code list)"
    - name: data02
      type: string
      description: "Key code high byte (WORD type)"
  notes: "Key code list (key: data01 data02 = name): 02h 00h POWER ON, 03h 00h POWER OFF, 05h 00h AUTO, 06h 00h MENU, 07h 00h UP, 08h 00h DOWN, 09h 00h RIGHT, 0Ah 00h LEFT, 0Bh 00h ENTER, 0Ch 00h EXIT, 0Dh 00h HELP, 0Fh 00h MAGNIFY UP, 10h 00h MAGNIFY DOWN, 13h 00h MUTE, 29h 00h PICTURE, 4Bh 00h COMPUTER1, 4Ch 00h COMPUTER2, 4Fh 00h VIDEO1, 51h 00h S-VIDEO1, 84h 00h VOLUME UP, 85h 00h VOLUME DOWN, 8Ah 00h FREEZE, A3h 00h ASPECT, D7h 00h SOURCE, EEh 00h LAMP MODE/ECO."

- id: shutter_close
  label: Shutter Close (051)
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: Shutter Open (052)
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: Lens Control (053)
  kind: action
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lens axis: 06h=Periphery Focus (only documented value)"
    - name: data02
      type: string
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_request
  label: Lens Control Request (053-1)
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Lens axis (e.g. 06h Periphery Focus)"

- id: lens_control_2
  label: Lens Control 2 (053-2)
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "FFh=Stop, otherwise axis selector"
    - name: data02
      type: string
      description: "Mode: 00h=absolute, 02h=relative"
    - name: data03
      type: string
      description: "Value low-order 8 bits"
    - name: data04
      type: string
      description: "Value high-order 8 bits"

- id: lens_memory_control
  label: Lens Memory Control (053-3)
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control (053-4)
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Operates on profile set by 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: Lens Memory Option Request (053-5)
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set (053-6)
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: string
      description: "00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request (053-7)
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitfield: Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift(H), Bit4 Lens Shift(V) - each 0=Stop/1=During operation."

- id: lens_profile_set
  label: Lens Profile Set (053-10)
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request (053-11)
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3 (060-1)
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: string
      description: "00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"

- id: setting_request
  label: Setting Request (078-1)
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: Running Status Request (078-2)
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: Input Status Request (078-3)
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: Mute Status Request (078-4)
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: Model Name Request (078-5)
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: Cover Status Request (078-6)
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: Freeze Control (079)
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "01h=freeze ON, 02h=freeze OFF"

- id: information_string_request
  label: Information String Request (084)
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: string
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request (097-8)
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Eco mode values: see Appendix - UNRESOLVED: appendix not in source."

- id: lan_projector_name_request
  label: LAN Projector Name Request (097-45)
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2 (097-155)
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_pictute_by_picture_request
  label: PIP/Picture by Picture Request (097-198)
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request (097-243-1)
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set (098-8)
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Eco mode value. Full list: see Appendix - UNRESOLVED: appendix not in source."

- id: lan_projector_name_set
  label: LAN Projector Name Set (098-45)
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01}-{data16} 00h {cks}"
  params:
    - name: projector_name
      type: string
      description: "Projector name, up to 16 bytes (DATA01-16)"

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set (098-198)
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: string
      description: "Value - MODE: 00h=PIP,01h=PbP; START POSITION: 00h=TL,01h=TR,02h=BL,03h=BR; sub-input values: see Appendix - UNRESOLVED."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set (098-243-1)
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request (305-1)
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: Serial Number Request (305-2)
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: Basic Information Request (305-3)
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: Audio Select Set (319-10)
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal. Full list: see Appendix - UNRESOLVED: appendix not in source."
    - name: data02
      type: string
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Query responses documented in source. Status bitfields and structured data
# returned by the request commands above. Response frame format:
#   Ack (success):  A<h> <cmdhi> <ID1> <ID2> <LEN> [<DATA...>] <CKS>
#   Nak (failure):  A<h> <cmdhi> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# ERR1/ERR2 error codes are enumerated in source section 2.4 (28 combinations).

- id: power_state
  type: enum
  source: 078-2 DATA03
  values: [standby, power_on]

- id: cooling_process
  type: enum
  source: 078-2 DATA04
  values: [not_executed, during_execution]

- id: operation_status
  type: enum
  source: 078-2 DATA06
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]

- id: error_status
  type: bitfield
  source: 009 DATA01-DATA12
  notes: "12-byte error bitmap; bit-to-error map documented in source section 3.1 (e.g. DATA01 Bit0 cover error, Bit3/Bit4 fan error, Bit5 power error; DATA09 Bit1 interlock switch open)."

- id: mute_status
  type: composite
  source: 078-4 DATA01-DATA05
  fields: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute, onscreen_display]
```

## Variables
```yaml
- id: brightness
  set_via: picture_adjust (data01=00h)
  query_via: gain_parameter_request_3 (data01=00h)

- id: contrast
  set_via: picture_adjust (data01=01h)
  query_via: gain_parameter_request_3 (data01=01h)

- id: color
  set_via: picture_adjust (data01=02h)
  query_via: gain_parameter_request_3 (data01=02h)

- id: hue
  set_via: picture_adjust (data01=03h)
  query_via: gain_parameter_request_3 (data01=03h)

- id: sharpness
  set_via: picture_adjust (data01=04h)
  query_via: gain_parameter_request_3 (data01=04h)

- id: volume
  set_via: volume_adjust
  query_via: gain_parameter_request_3 (data01=05h)

- id: lamp_light_adjust
  set_via: other_adjust (data01=96h)
  query_via: gain_parameter_request_3 (data01=96h)

- id: lamp_usage_time
  query_via: information_request, lamp_information_request_3
  unit: seconds

- id: filter_usage_time
  query_via: information_request, filter_usage_information_request
  unit: seconds

- id: lamp_remaining_life
  query_via: lamp_information_request_3 (data02=04h)
  unit: percent

- id: projector_name
  set_via: lan_projector_name_set
  query_via: lan_projector_name_request

# UNRESOLVED: default value, valid range, and adjustment bounds are returned
# dynamically by gain_parameter_request_3 (DATA02-DATA13) - not enumerated in source.
```

## Events
```yaml
# Source describes request/response model only. No unsolicited notifications
# documented.
# UNRESOLVED: no events found in source.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
# UNRESOLVED: no macros found in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes:
  - "015 POWER ON: while powering on, no other command accepted (source 3.2)."
  - "016 POWER OFF: during power-off incl. cooling time, no other command accepted (source 3.3)."
  - "Error bitfield 009 reports interlock switch open (DATA09 Bit1), lens not installed properly (DATA04 Bit7), cover errors, fan errors, temperature errors - observable via query, not enforced by protocol."
# UNRESOLVED: no explicit power-on sequencing procedure or confirmation
# requirement stated in source. Voltage/current/power specs not present.
```

## Notes
- Binary hex-byte protocol. Every frame ends with checksum byte = low-order 8 bits of sum of all preceding bytes (worked example in source: `20h+81h+01h+60h+01h+00h=103h` → CKS=`03h`).
- Command frame first byte indicates type: `00h`=query-class, `01h`/`02h`/`03h`=action-class (with LEN byte counts differing). Response first byte = command byte OR'd with `20h` (success) or `A0h` (failure).
- RS-232C: cross cable, D-SUB 9P, pins 2/3/5/7/8 used (pin assignment documented).
- LAN: RJ-45 8-pin, 10/100 Mbps auto-switchable; wireless LAN via optional dongle (see separate manual).
- 28 ERR1/ERR2 error combinations enumerated (source 2.4) — e.g. `00h 00h` unrecognized command, `01h 00h` invalid value, `02h 0Dh` power off cannot accept, `02h 0Fh` no authority.
- Lamp/filter usage times returned in seconds, updated at 1-minute intervals.
- Negative lamp remaining life returned when replacement deadline exceeded.

<!-- UNRESOLVED: source references an "Appendix: Supplementary Information by Command" containing value tables for input terminals, base model types, sub-input setting values, eco mode values, and aspect values. The appendix is NOT present in the refined source document. Default ID1 (control ID) and ID2 (model code) byte values are not stated. Firmware/protocol version not stated beyond manual revision BDT140013 Rev 7.1. Wireless LAN unit models not specified. -->
````

Spec done. 53 actions enumerated verbatim with payloads. RS-232C + TCP/7142 both populated from source. Appendix value tables marked UNRESOLVED (not in refined source).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:06:07.547Z
last_checked_at: 2026-06-18T08:07:20.985Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:07:20.985Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal value table, base model type values, sub-input setting values, eco mode values, and aspect values are referenced as \"see Appendix\" but the appendix is not present in the refined source. Control ID (ID1) and model code (ID2) default values not stated."
- "default baud rate not stated (five options documented)"
- "flow control not stated; full-duplex mode stated"
- "appendix not in source.\""
- "default value, valid range, and adjustment bounds are returned"
- "no events found in source."
- "no macros found in source."
- "no explicit power-on sequencing procedure or confirmation"
- "source references an \"Appendix: Supplementary Information by Command\" containing value tables for input terminals, base model types, sub-input setting values, eco mode values, and aspect values. The appendix is NOT present in the refined source document. Default ID1 (control ID) and ID2 (model code) byte values are not stated. Firmware/protocol version not stated beyond manual revision BDT140013 Rev 7.1. Wireless LAN unit models not specified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
