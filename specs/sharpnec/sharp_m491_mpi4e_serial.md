---
spec_id: admin/sharp-nec-m491-mpi4e
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC M491 Mpi4E Control Spec"
manufacturer: Sharp/NEC
model_family: "M491 Mpi4E"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "M491 Mpi4E"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:01:22.548Z
last_checked_at: 2026-06-18T08:10:04.293Z
generated_at: 2026-06-18T08:10:04.293Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "ID2 model code value not stated in source (varies by model)"
  - "flow control not stated (full-duplex mode stated)"
  - "M491 Mpi4E model code not stated"
  - "variables not enumerated separately; settable values exposed via Actions."
  - "source describes no unsolicited notifications; all responses are solicited."
  - "source documents no multi-step macro sequences."
  - "no explicit safety interlock procedure stated in source"
  - "Appendix \"Supplementary Information by Command\" not present in source — input terminal, eco mode, aspect, base model type, sub input value tables missing"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:10:04.293Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC M491 Mpi4E Control Spec

## Summary
Sharp/NEC M491 Mpi4E large-venue projector control spec. Supports RS-232C serial control (cross cable, D-SUB 9P PC CONTROL port) and TCP/IP control over wired or wireless LAN. Binary command protocol using hexadecimal byte frames with checksum. This spec covers all 53 documented control commands from the BDT140013 Revision 7.1 command reference manual.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: ID2 model code value not stated in source (varies by model) -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated (full-duplex mode stated)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON (015) / POWER OFF (016) present
  - levelable       # inferred: PICTURE ADJUST (030-1) / VOLUME ADJUST (030-2) / OTHER ADJUST (030-15)
  - queryable       # inferred: many REQUEST commands present
  - routable        # inferred: INPUT SW CHANGE (018) and AUDIO SELECT SET (319-10) present
```

## Actions
```yaml
# Frame format: <lead> <cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>
# ID1 = control ID set on projector
# ID2 = model code (varies by model)  # UNRESOLVED: M491 Mpi4E model code not stated
# CKS = low-order one byte of sum of all preceding bytes
# Lead bytes: 20h/21h/22h/23h (query/set/action variants), A0h-A3h (acknowledgement)

- id: error_status_request
  label: Error Status Request (009)
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Response DATA01-12 = error bitmap (bit 0=normal, 1=error)"

- id: power_on
  label: Power On (015)
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other commands accepted while power-on in progress"

- id: power_off
  label: Power Off (016)
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other commands accepted during cooldown"

- id: input_sw_change
  label: Input SW Change (018)
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal byte (e.g. 06h = video port). See Appendix Supplementary Information by Command."
  notes: "Example to video port: 02h 03h 00h 00h 02h 01h 06h 0Eh"

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
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits)
  notes: "Example brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

- id: volume_adjust
  label: Volume Adjust (030-2)
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data03
      type: integer
      description: Adjustment value (high-order 8 bits)
  notes: "Example volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: aspect_adjust
  label: Aspect Adjust (030-12)
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Aspect value. See Appendix Supplementary Information by Command."

- id: other_adjust
  label: Other Adjust (Lamp/Light Gain) (030-15)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: integer
      description: "96h for LAMP/LIGHT ADJUST"
    - name: data02
      type: integer
      description: "FFh (per source row)"
    - name: data03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data05
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: information_request
  label: Information Request (037)
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Response DATA01-49=projector name, DATA83-86=lamp usage time (sec), DATA87-90=filter usage time (sec)"

- id: filter_usage_information_request
  label: Filter Usage Information Request (037-3)
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Response DATA01-04=filter usage time (sec), DATA05-08=filter alarm start time (sec)"

- id: lamp_information_request_3
  label: Lamp Information Request 3 (037-4)
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: integer
      description: "Content: 01h=usage time (sec), 04h=remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request (037-6)
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code (050)
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Key code low byte (see key code list)"
    - name: data02
      type: integer
      description: "Key code high byte (see key code list)"
  notes: "Key codes: POWER ON=02h/00h, POWER OFF=03h/00h, AUTO=05h/00h, MENU=06h/00h, UP=07h/00h, DOWN=08h/00h, RIGHT=09h/00h, LEFT=0Ah/00h, ENTER=0Bh/00h, EXIT=0Ch/00h, HELP=0Dh/00h, MAGNIFY UP=0Fh/00h, MAGNIFY DOWN=10h/00h, MUTE=13h/00h, PICTURE=29h/00h, COMPUTER1=4Bh/00h, COMPUTER2=4Ch/00h, VIDEO1=4Fh/00h, S-VIDEO1=51h/00h, VOLUME UP=84h/00h, VOLUME DOWN=85h/00h, FREEZE=8Ah/00h, ASPECT=A3h/00h, SOURCE=D7h/00h, LAMP MODE/ECO=EEh/00h"

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
      type: integer
      description: "06h=Periphery Focus"
    - name: data02
      type: integer
      description: "00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive +, 81h=drive -, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"

- id: lens_control_request
  label: Lens Control Request (053-1)
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: Lens target
  notes: "Response: upper/lower limits and current value (16-bit)"

- id: lens_control_2
  label: Lens Control 2 (053-2)
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lens target (FFh=Stop)"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: data03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: Lens Memory Control (053-3)
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control (053-4)
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_request
  label: Lens Memory Option Request (053-5)
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set (053-6)
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request (053-7)
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Response DATA01 bitmap: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V) (0=Stop, 1=During operation)"

- id: lens_profile_set
  label: Lens Profile Set (053-10)
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

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
      type: integer
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

- id: setting_request
  label: Setting Request (078-1)
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Response DATA01-03=base model type, DATA04=sound function, DATA05=profile number"

- id: running_status_request
  label: Running Status Request (078-2)
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Response DATA03=power status (00h=Standby,01h=On), DATA04=cooling, DATA05=power proc, DATA06=operation status"

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
      type: integer
      description: "01h=freeze ON, 02h=freeze OFF"

- id: information_string_request
  label: Information String Request (084)
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: integer
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request (097-8)
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

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

- id: pip_pbypicture_request
  label: PIP/Picture by Picture Request (097-198)
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: integer
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
      type: integer
      description: "Eco mode value. See Appendix Supplementary Information by Command."

- id: lan_projector_name_set
  label: LAN Projector Name Set (098-45)
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01-16} 00h {cks}"
  params:
    - name: data01-16
      type: string
      description: "Projector name (up to 16 bytes)"

- id: pip_pbypicture_set
  label: PIP/Picture by Picture Set (098-198)
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: integer
      description: "Setting value (mode: 00h=PIP,01h=PiP-by-PiP; start pos: 00h-03h=top-left..bottom-right)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set (098-243-1)
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: integer
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
      type: integer
      description: "Input terminal. See Appendix Supplementary Information by Command."
    - name: data02
      type: integer
      description: "00h=terminal-specified, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# All responses use frame: A0h/A1h/A2h/A3h <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# On success response data echoes back per command spec.
# On failure ERR1/ERR2 encode error cause.
# Error codes (ERR1/ERR2):
#   00h/00h = command unrecognized
#   00h/01h = command not supported by model
#   01h/00h = specified value invalid
#   01h/01h = specified input terminal invalid
#   01h/02h = specified language invalid
#   02h/00h = memory allocation error
#   02h/02h = memory in use
#   02h/03h = specified value cannot be set
#   02h/04h = forced onscreen mute on
#   02h/06h = viewer error
#   02h/07h = no signal
#   02h/08h = test pattern or filter displayed
#   02h/09h = no PC card inserted
#   02h/0Ah = memory operation error
#   02h/0Ch = entry list displayed
#   02h/0Dh = command cannot be accepted because power is off
#   02h/0Eh = command execution failed
#   02h/0Fh = no authority for operation
#   03h/00h = specified gain number incorrect
#   03h/01h = specified gain invalid
#   03h/02h = adjustment failed
```

## Variables
```yaml
# UNRESOLVED: variables not enumerated separately; settable values exposed via Actions.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications; all responses are solicited.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source documents interlock-relevant state via ERROR STATUS REQUEST (009):
#   - cover error, fan error, temperature error, power error, lamp off
#   - lamp usage time exceeded limit, lamp replacement moratorium
#   - interlock switch open (DATA09 Bit1)
#   - system errors (slave CPU, formatter)
# Power On (015) and Power Off (016) reject other commands during transitions.
<!-- UNRESOLVED: no explicit safety interlock procedure stated in source -->
```

## Notes
- Frame format: lead byte (20h-23h query/set, A0h-A3h ack) + cmd + `<ID1> <ID2>` + LEN + DATA + `<CKS>`
- Checksum: sum all preceding bytes, take low-order one byte (8 bits)
- ID1 = control ID set on projector; ID2 = model code (varies by model — UNRESOLVED for M491 Mpi4E)
- Serial cable: cross cable, D-SUB 9P PC CONTROL port (pin assignment documented in §1.1)
- LAN: TCP port 7142, 10/100 Mbps auto-switchable wired, wireless via separate LAN unit
- Many "Supplementary Information by Command" values (input terminal codes, eco mode values, aspect values, base model types) referenced in Appendix not contained in this refined source — UNRESOLVED.
- Lamp/filter usage time returned in seconds; information updated at one-minute intervals.
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not present in source — input terminal, eco mode, aspect, base model type, sub input value tables missing -->
````

Spec emitted. 53 actions, all command bytes verbatim. Serial+TCP both documented. Gaps marked UNRESOLVED (model code, flow control, appendix value tables).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:01:22.548Z
last_checked_at: 2026-06-18T08:10:04.293Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:10:04.293Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "ID2 model code value not stated in source (varies by model)"
- "flow control not stated (full-duplex mode stated)"
- "M491 Mpi4E model code not stated"
- "variables not enumerated separately; settable values exposed via Actions."
- "source describes no unsolicited notifications; all responses are solicited."
- "source documents no multi-step macro sequences."
- "no explicit safety interlock procedure stated in source"
- "Appendix \"Supplementary Information by Command\" not present in source — input terminal, eco mode, aspect, base model type, sub input value tables missing"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
