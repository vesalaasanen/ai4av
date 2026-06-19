---
spec_id: admin/sharp-nec-m651-mpi4e
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC M651 Mpi4E Control Spec"
manufacturer: Sharp/NEC
model_family: "M651 Mpi4E"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "M651 Mpi4E"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:20:44.335Z
last_checked_at: 2026-06-18T08:12:29.247Z
generated_at: 2026-06-18T08:12:29.247Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated. Exact input-terminal code table (DATA01 values for 018/AUDIO SELECT) deferred to \"Supplementary Information by Command\" appendix not present in this source. Eco mode value codes likewise deferred to appendix. Sub input setting value codes deferred. Base model type value codes deferred."
  - "flow control not stated in source; RTS/CTS pins wired but mode not specified"
  - "source documents no unsolicited notifications. All output is response to a command."
  - "source documents no multi-step macro sequences."
  - "no explicit safety interlock procedures or power-on sequencing beyond"
  - "ID2 model code value for M651 Mpi4E not stated."
  - "input terminal code table, eco mode value codes, base model type codes, sub input codes — appendix not in source."
  - "firmware version compatibility not stated."
  - "serial flow control mode not specified despite RTS/CTS pinout."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:12:29.247Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC M651 Mpi4E Control Spec

## Summary
Sharp/NEC M651 Mpi4E projector. Control via RS-232C serial and TCP/IP (port 7142). Binary framed protocol: command/response hex bytes with ID1/ID2 model+control bytes, LEN length, and CKS checksum (low byte of sum of preceding bytes). Covers power, input switch, mute, picture/volume/aspect adjust, lens control and memory, status queries, eco mode, edge blending, PIP/PBP, and identity requests.

<!-- UNRESOLVED: firmware version compatibility not stated. Exact input-terminal code table (DATA01 values for 018/AUDIO SELECT) deferred to "Supplementary Information by Command" appendix not present in this source. Eco mode value codes likewise deferred to appendix. Sub input setting value codes deferred. Base model type value codes deferred. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; 115200 typical high value, all selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source; RTS/CTS pins wired but mode not specified
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred: POWER ON / POWER OFF commands present
  - queryable     # inferred: many status request commands present
  - levelable     # inferred: PICTURE/VOLUME/ASPECT/LAMP adjust commands present
  - routable      # inferred: INPUT SW CHANGE and audio select commands present
```

## Actions
```yaml
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
  notes: "No other command accepted while power-on in progress."

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off incl. cooling time."

- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal code (DATA01). Example 06h = video port. Full code table in Appendix 'Supplementary Information by Command' (UNRESOLVED)."
  notes: "Checksum CKS = low byte of sum of preceding bytes."

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
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data03
      type: integer
      description: "Adjustment value low 8 bits"
    - name: data04
      type: integer
      description: "Adjustment value high 8 bits"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data02
      type: integer
      description: "Adjustment value low 8 bits"
    - name: data03
      type: integer
      description: "Adjustment value high 8 bits"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Aspect value. Codes in Appendix 'Supplementary Information by Command' (UNRESOLVED)."

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment target high byte (DATA01=96h for LAMP ADJUST / LIGHT ADJUST)"
    - name: data02
      type: integer
      description: "Adjustment target low byte (DATA02=FFh for LAMP ADJUST / LIGHT ADJUST)"
    - name: data03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data04
      type: integer
      description: "Adjustment value low 8 bits"
    - name: data05
      type: integer
      description: "Adjustment value high 8 bits"

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (D01-49), lamp usage time seconds (D83-86), filter usage time seconds (D87-90)."

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (D01-04) and filter alarm start time (D05-08) in seconds. -1 if undefined."

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: integer
      description: "Content: 01h=lamp usage time (sec), 04h=lamp remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Key code low byte (DATA01)"
    - name: data02
      type: integer
      description: "Key code high byte (DATA02)"
  notes: "Key codes: 02h00h=POWER ON, 03h00h=POWER OFF, 05h00h=AUTO, 06h00h=MENU, 07h00h=UP, 08h00h=DOWN, 09h00h=RIGHT, 0Ah00h=LEFT, 0Bh00h=ENTER, 0Ch00h=EXIT, 0Dh00h=HELP, 0Fh00h=MAGNIFY UP, 10h00h=MAGNIFY DOWN, 13h00h=MUTE, 29h00h=PICTURE, 4Bh00h=COMPUTER1, 4Ch00h=COMPUTER2, 4Fh00h=VIDEO1, 51h00h=S-VIDEO1, 84h00h=VOLUME UP, 85h00h=VOLUME DOWN, 8Ah00h=FREEZE, A3h00h=ASPECT, D7h00h=SOURCE, EEh00h=LAMP MODE/ECO."

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
      type: integer
      description: "Lens target: 06h=Periphery Focus"
    - name: data02
      type: integer
      description: "00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive +, 81h=drive -, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Lens target (e.g. 06h Periphery Focus)"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lens target. FFh=Stop (then DATA02-04 ignored)."
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: data03
      type: integer
      description: "Adjustment value low 8 bits"
    - name: data04
      type: integer
      description: "Adjustment value high 8 bits"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Operates on profile number set via 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V) operation state."

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

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
      type: integer
      description: "00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (D01-03), sound function (D04), profile/timer function (D05)."

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "DATA03 power status (00h=Standby,01h=Power on), DATA04 cooling, DATA05 power on/off process, DATA06 operation status."

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
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: integer
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

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

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
      type: integer
      description: "Eco mode value. Codes in Appendix 'Supplementary Information by Command' (UNRESOLVED)."

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01-16} 00h {cks}"
  params:
    - name: data01-16
      type: string
      description: "Projector name, up to 16 bytes (NUL-terminated)"

- id: pip_picture_by_picture_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: integer
      description: "Setting value. MODE: 00h=PIP,01h=PBP. POSITION: 00h=TL,01h=TR,02h=BL,03h=BR. Sub input codes per appendix (UNRESOLVED)."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=OFF, 01h=ON"

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
      type: integer
      description: "Input terminal. Codes per appendix 'Supplementary Information by Command' (UNRESOLVED)."
    - name: data02
      type: integer
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Command responses follow framed format. Success response: command byte OR'd with 20h
# in first byte (e.g. 02h cmd -> 22h ack, 03h cmd -> 23h ack, 00h cmd -> 20h ack, 01h -> 21h).
# Error response: first byte OR'd with A0h (A2h, A3h, A0h, A1h) with ERR1 ERR2 fields.
# Success-no-data response shape: <ACK> <CMD> <ID1> <ID2> 00h <CKS>
# Success-with-data response shape: <ACK> <CMD> <ID1> <ID2> <LEN> <DATA...> <CKS>
# Error response shape: <ERR> <CMD> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
```

## Variables
```yaml
# Parameter settables are represented as parameterized Actions above.
# Discrete settable state: eco mode, projector name, edge blending on/off,
# PIP/PBP mode+position+sub inputs, lens memory options, freeze, picture/volume/aspect/gain values.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. All output is response to a command.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: "No other command accepted while power-on is in progress."
  - command: power_off
    note: "No other command accepted during power-off incl. cooling time."
# UNRESOLVED: no explicit safety interlock procedures or power-on sequencing beyond
# the command-busy notes above. Voltage/current/power values not present in source.
```

## Notes
- Binary framed protocol. Command first byte = group: `00h`=info queries, `01h`=freeze, `02h`=action/no-data, `03h`=action/with-data. Responses mirror with `20h`/`21h`/`22h`/`23h` (success) or `A0h`/`A1h`/`A2h`/`A3h` (error) prefixes.
- Framing: `<CMD1> <CMD2> <ID1> <ID2> <LEN> [<DATA...>] <CKS>`. Some commands omit ID1/ID2 from request (built into request shape) — follow the exact byte layout shown per command.
- `ID1` = control ID set on projector. `ID2` = model code (varies by model, UNRESOLVED exact value for M651 Mpi4E).
- `CKS` = low-order 8 bits of sum of all preceding bytes.
- Serial baud selectable among 4800/9600/19200/38400/115200 — pick highest supported by both endpoints.
- Error code table (ERR1/ERR2) covers 28 distinct codes from "command unrecognized" through "lens not installed properly" — see source §2.4 for full list.
- Full input-terminal code table, eco mode value codes, base model type codes, and sub input setting values are deferred to a "Supplementary Information by Command" appendix not included in this refined source.

<!-- UNRESOLVED: ID2 model code value for M651 Mpi4E not stated. -->
<!-- UNRESOLVED: input terminal code table, eco mode value codes, base model type codes, sub input codes — appendix not in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: serial flow control mode not specified despite RTS/CTS pinout. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:20:44.335Z
last_checked_at: 2026-06-18T08:12:29.247Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:12:29.247Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated. Exact input-terminal code table (DATA01 values for 018/AUDIO SELECT) deferred to \"Supplementary Information by Command\" appendix not present in this source. Eco mode value codes likewise deferred to appendix. Sub input setting value codes deferred. Base model type value codes deferred."
- "flow control not stated in source; RTS/CTS pins wired but mode not specified"
- "source documents no unsolicited notifications. All output is response to a command."
- "source documents no multi-step macro sequences."
- "no explicit safety interlock procedures or power-on sequencing beyond"
- "ID2 model code value for M651 Mpi4E not stated."
- "input terminal code table, eco mode value codes, base model type codes, sub input codes — appendix not in source."
- "firmware version compatibility not stated."
- "serial flow control mode not specified despite RTS/CTS pinout."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
