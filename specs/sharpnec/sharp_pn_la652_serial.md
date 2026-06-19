---
spec_id: admin/sharp-nec-pn-la652
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC PN-LA652 Control Spec"
manufacturer: Sharp/NEC
model_family: PN-LA652
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - PN-LA652
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:28:01.468Z
last_checked_at: 2026-06-18T09:08:18.503Z
generated_at: 2026-06-18T09:08:18.503Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model name not explicitly printed in source; taken from the supplied device name. Firmware version, voltage/power specs, and protocol version not stated."
  - "flow control not stated; source states \"Communication mode: Full duplex\" only"
  - "min/max not fixed in source; queryable via gain_parameter_request_3 (DATA02-DATA05)"
  - "queryable via gain_parameter_request_3"
  - "source describes no unsolicited notifications. All responses are solicited replies to commands."
  - "source documents no named multi-step command sequences."
  - "no explicit power-on sequencing requirement stated beyond the command lockout"
  - "firmware/protocol version not stated. Voltage, current, power specs not in source (out of scope for this command reference). Default baud rate not pinned (multiple selectable rates listed). Flow control not specified. Full input-terminal / aspect / eco-mode / base-model-type value tables require the appendix not included in the refined source."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:08:18.503Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC PN-LA652 Control Spec

## Summary
Sharp/NEC large-format display/projector controlled via a binary RS-232C or TCP/IP command protocol (document BDT140013 Rev 7.1). Commands are hex frames consisting of a lead byte, command code, ID1 (control ID), ID2 (model code), data length, data bytes, and a checksum. This spec covers the full documented command catalogue: power, input switching, mute, picture/volume/aspect/gain adjust, shutter, lens control and memory, status/information queries, eco mode, PIP/PbP, edge blending, and audio select.

<!-- UNRESOLVED: model name not explicitly printed in source; taken from the supplied device name. Firmware version, voltage/power specs, and protocol version not stated. -->

## Transport
```yaml
# Source documents both RS-232C (serial) and wired/wireless LAN (TCP).
# Commands are identical binary frames over either transport.
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source lists selectable rates: 115200 / 38400 / 19200 / 9600 / 4800 bps (no single default stated)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated; source states "Communication mode: Full duplex" only
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
# - powerable   (POWER ON / POWER OFF commands present)
# - routable    (INPUT SW CHANGE - input terminal switching present)
# - queryable   (many status/information request commands present)
# - levelable   (picture adjust, volume adjust, gain adjust present)
traits:
  - powerable
  - routable
  - queryable
  - levelable
```

## Actions
```yaml
# Frame format (verbatim from source §2.1/§2.2):
#   <lead> <cmd1> [<cmd2>] <ID1> <ID2> <LEN> <DATA...> <CKS>
# - ID1 = control ID (00h = broadcast/default in examples)
# - ID2 = model code (00h in examples)
# - CKS (checksum) = low-order byte of the sum of ALL preceding bytes.
#     Example: 20h+81h+01h+60h+01h+00h = 103h -> CKS = 03h
# Commands below show the request payload verbatim. For parameterized
# commands, {dataNN} marks the variable byte(s) and {cks} is the computed
# checksum (low byte of sum of all preceding bytes including ID1=00h ID2=00h).
# Response leads: 20h/21h/22h/23h = success; A0h/A1h/A2h/A3h = error (carries ERR1 ERR2).
# See Notes for the full error-code table.

actions:
  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []

  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []

  - id: input_sw_change
    label: Input Switch Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Input terminal hex value (e.g. 06h = video port). Full value list in appendix 'Supplementary Information by Command' (not reproduced in this source excerpt)."

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []

  - id: picture_mute_off
    label: Picture Mute Off
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []

  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []

  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: string
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: data02
        type: string
        description: "Adjustment mode: 00h=absolute value, 01h=relative value"
      - name: data03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data04
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
    params:
      - name: data01
        type: string
        description: "Adjustment mode: 00h=absolute value, 01h=relative value"
      - name: data02
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data03
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Aspect value (see appendix 'Supplementary Information by Command'; not reproduced in this source excerpt)."

  - id: other_adjust
    label: Other Adjust (Gain)
    kind: action
    command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
    params:
      - name: data01
        type: string
        description: "Adjustment target high byte: 96h (with DATA02=FFh = LAMP ADJUST / LIGHT ADJUST)"
      - name: data02
        type: string
        description: "Adjustment target low byte: FFh (for LAMP/LIGHT ADJUST)"
      - name: data03
        type: string
        description: "Adjustment mode: 00h=absolute value, 01h=relative value"
      - name: data04
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data05
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []

  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []

  - id: lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: data02
        type: string
        description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Key code low byte (WORD key code split across data01/data02). Examples from key code list: POWER ON=02h, POWER OFF=03h, AUTO=05h, MENU=06h, UP=07h, DOWN=08h, RIGHT=09h, LEFT=0Ah, ENTER=0Bh, EXIT=0Ch, HELP=0Dh, MAGNIFY UP=0Fh, MAGNIFY DOWN=10h, MUTE=13h, PICTURE=29h, COMPUTER1=4Bh, COMPUTER2=4Ch, VIDEO1=4Fh, S-VIDEO1=51h, VOLUME UP=84h, VOLUME DOWN=85h, FREEZE=8Ah, ASPECT=A3h, SOURCE=D7h, LAMP MODE/ECO=EEh"
      - name: data02
        type: string
        description: "Key code high byte (00h for all listed keys)."

  - id: shutter_close
    label: Shutter Close
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: shutter_open
    label: Shutter Open
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  - id: lens_control
    label: Lens Control
    kind: action
    command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Lens target. Source explicitly shows 06h=Periphery Focus; other target codes not fully reproduced in this excerpt."
      - name: data02
        type: string
        description: "Drive content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s. After 7Fh/81h, send 00h to stop."

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    params:
      - name: data01
        type: string
        description: Lens target to read adjustment range/current value for.

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: string
        description: "Lens target (FFh=Stop; when Stop, data02-data04 not referenced)."
      - name: data02
        type: string
        description: "Adjustment mode: 00h=absolute value, 02h=relative value"
      - name: data03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data04
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET (operates on profile selected via lens_profile_set)"

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: data02
        type: string
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST / LIGHT ADJUST"

  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []

  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []

  - id: input_status_request
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []

  - id: mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []

  - id: model_name_request
    label: Model Name Request
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  - id: cover_status_request
    label: Cover Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "01h=freeze on, 02h=freeze off"

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
    params:
      - name: data01
        type: string
        description: "Information type: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

  - id: eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []

  - id: lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: lan_mac_address_status_request_2
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_pbp_request
    label: PIP / Picture by Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Eco mode value (sets 'Light mode' or 'Lamp mode' depending on model; full value list in appendix 'Supplementary Information by Command')."

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01} {data02} {data03} {data04} {data05} {data06} {data07} {data08} {data09} {data10} {data11} {data12} {data13} {data14} {data15} {data16} 00h {cks}"
    params:
      - name: name
        type: string
        description: "Projector name, up to 16 bytes (DATA01-DATA16), NUL-terminated."

  - id: pip_pbp_set
    label: PIP / Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: data02
        type: string
        description: "Setting value (depends on data01): MODE 00h=PIP/01h=PbP; START POSITION 00h=TOP-LEFT/01h=TOP-RIGHT/02h=BOTTOM-LEFT/03h=BOTTOM-RIGHT; sub-input value list in appendix."

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []

  - id: serial_number_request
    label: Serial Number Request
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  - id: basic_information_request
    label: Basic Information Request
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Input terminal (value list in appendix 'Supplementary Information by Command')."
      - name: data02
        type: string
        description: "Setting value: 00h=audio from terminal specified in data01, 01h=BNC"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    source_query: running_status_request
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    notes: "running_status_request DATA06 (00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby). DATA03 also gives Power status (00h=Standby, 01h=Power on)."

  - id: mute_state
    type: object
    source_query: mute_status_request
    notes: "DATA01=Picture mute, DATA02=Sound mute, DATA03=Onscreen mute, DATA04=Forced onscreen mute, DATA05=Onscreen display. Each 00h=Off/01h=On."

  - id: input_status
    type: object
    source_query: input_status_request
    notes: "DATA02=signal list number (practical = returned + 1), DATA03/04=selection signal type, DATA05=signal list type, DATA06=test pattern display, DATA09=content displayed."

  - id: error_status
    type: bitmask
    source_query: error_status_request
    notes: "DATA01-DATA12 bitmask. DATA01: cover/fan/temp/power/lamp errors. DATA02: lamp usage limit/formatter/lamp2. DATA03: FPGA/temp sensor/lamp presence/mirror cover/lamp2. DATA04: lamp2/temp-dust/foreign-matter/ballast/iris/lens. DATA09 extended: portrait cover/interlock switch open/system errors. 0=normal, 1=error."

  - id: lamp_usage_time
    type: integer
    unit: seconds
    source_query: lamp_information_request_3
    notes: "DATA03-06, updated at 1-minute intervals. Reported in seconds; divide by 3600 for hours."

  - id: lamp_remaining_life
    type: integer
    unit: percent
    source_query: lamp_information_request_3
    notes: "DATA03-06 when content=04h. Negative if lamp replacement deadline exceeded."

  - id: filter_usage_time
    type: integer
    unit: seconds
    source_query: filter_usage_information_request
    notes: "DATA01-04 usage time; DATA05-08 filter alarm start time. '-1' returned if undefined."

  - id: cover_status
    type: enum
    source_query: cover_status_request
    values: [normal_open, closed]
    notes: "DATA01: 00h=Normal (cover opened), 01h=Cover closed."

  - id: freeze_status
    type: enum
    source_query: basic_information_request
    values: [off, on]
    notes: "basic_information_request DATA09: 00h=Off, 01h=On."

  - id: lens_operation_status
    type: bitmask
    source_query: lens_information_request
    notes: "DATA01 bits: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V). 0=Stop, 1=During operation."

  - id: eco_mode
    type: string
    source_query: eco_mode_request
    notes: "Returns 'Light mode' or 'Lamp mode' value (full value list in appendix)."

  - id: edge_blending_mode
    type: enum
    source_query: edge_blending_mode_request
    values: [off, on]

  - id: model_name
    type: string
    source_query: model_name_request
  - id: serial_number
    type: string
    source_query: serial_number_request
  - id: mac_address
    type: string
    source_query: lan_mac_address_status_request_2
  - id: projector_name
    type: string
    source_query: lan_projector_name_request
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    set_action: volume_adjust
    range: null  # UNRESOLVED: min/max not fixed in source; queryable via gain_parameter_request_3 (DATA02-DATA05)
  - id: brightness
    type: integer
    set_action: picture_adjust (data01=00h)
    range: null  # UNRESOLVED: queryable via gain_parameter_request_3
  - id: contrast
    type: integer
    set_action: picture_adjust (data01=01h)
    range: null  # UNRESOLVED
  - id: color
    type: integer
    set_action: picture_adjust (data01=02h)
    range: null  # UNRESOLVED
  - id: hue
    type: integer
    set_action: picture_adjust (data01=03h)
    range: null  # UNRESOLVED
  - id: sharpness
    type: integer
    set_action: picture_adjust (data01=04h)
    range: null  # UNRESOLVED
  - id: lamp_light_adjust
    type: integer
    set_action: other_adjust (data01=96h, data02=FFh)
    range: null  # UNRESOLVED
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications. All responses are solicited replies to commands.
events: []
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step command sequences.
macros: []
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # turns off device; no other command accepted during power-off incl. cooling time
interlocks:
  - "POWER ON: while turning on, no other command can be accepted (source §3.2)."
  - "POWER OFF: while turning off (including cooling time), no other command can be accepted (source §3.3)."
  - "Interlock switch state is observable via error_status_request DATA09 bit1 (open = error) (source §3.1)."
  - "Forced onscreen mute on is reported as error code ERR1=02h ERR2=04h (source §2.4)."
power_on_sequence: null  # UNRESOLVED: no explicit power-on sequencing requirement stated beyond the command lockout
```

## Notes
- Binary protocol. Every request frame = `<lead> <cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>`. ID1=control ID, ID2=model code (both 00h/broadcast in all source examples). CKS = low byte of the sum of all preceding bytes.
- Responses: success leads 20h/21h/22h/23h (carry DATA + CKS); error leads A0h/A1h/A2h/A3h (carry ERR1, ERR2, CKS).
- Picture/volume/gain adjustments accept absolute (00h) or relative (01h/02h) modes with 16-bit signed values (low byte then high byte).
- Error-code table (ERR1 ERR2 -> description), verbatim from source §2.4:
  - 00h 00h = command not recognized
  - 00h 01h = command not supported by model
  - 01h 00h = specified value invalid
  - 01h 01h = specified input terminal invalid
  - 01h 02h = specified language invalid
  - 02h 00h = memory allocation error
  - 02h 02h = memory in use
  - 02h 03h = specified value cannot be set
  - 02h 04h = forced onscreen mute on
  - 02h 06h = viewer error
  - 02h 07h = no signal
  - 02h 08h = test pattern or filter displayed
  - 02h 09h = no PC card inserted
  - 02h 0Ah = memory operation error
  - 02h 0Ch = entry list displayed
  - 02h 0Dh = command cannot be accepted because power is off
  - 02h 0Eh = command execution failed
  - 02h 0Fh = no authority for the operation
  - 03h 00h = specified gain number incorrect
  - 03h 01h = specified gain invalid
  - 03h 02h = adjustment failed
- Several commands reference an appendix "Supplementary Information by Command" for full value lists (input terminal codes, aspect values, eco-mode values, base-model-type codes, sub-input codes). That appendix is not present in this source excerpt — affected parameter descriptions are marked accordingly.

<!-- UNRESOLVED: firmware/protocol version not stated. Voltage, current, power specs not in source (out of scope for this command reference). Default baud rate not pinned (multiple selectable rates listed). Flow control not specified. Full input-terminal / aspect / eco-mode / base-model-type value tables require the appendix not included in the refined source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:28:01.468Z
last_checked_at: 2026-06-18T09:08:18.503Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:08:18.503Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model name not explicitly printed in source; taken from the supplied device name. Firmware version, voltage/power specs, and protocol version not stated."
- "flow control not stated; source states \"Communication mode: Full duplex\" only"
- "min/max not fixed in source; queryable via gain_parameter_request_3 (DATA02-DATA05)"
- "queryable via gain_parameter_request_3"
- "source describes no unsolicited notifications. All responses are solicited replies to commands."
- "source documents no named multi-step command sequences."
- "no explicit power-on sequencing requirement stated beyond the command lockout"
- "firmware/protocol version not stated. Voltage, current, power specs not in source (out of scope for this command reference). Default baud rate not pinned (multiple selectable rates listed). Flow control not specified. Full input-terminal / aspect / eco-mode / base-model-type value tables require the appendix not included in the refined source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
