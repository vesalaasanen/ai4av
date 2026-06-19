---
spec_id: admin/sharp-nec-v864q-mpi
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC V864Q Mpi Control Spec"
manufacturer: Sharp/NEC
model_family: "V864Q Mpi"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "V864Q Mpi"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:19:41.206Z
last_checked_at: 2026-06-19T07:43:57.642Z
generated_at: 2026-06-19T07:43:57.642Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "ID2 model code value not stated for V864Q Mpi — varies by model. Control ID (ID1) default not stated. Flow control not stated. Input-terminal value appendix not included in source."
  - "flow control not stated in source"
  - "no explicit power-on sequencing voltage/current warnings in source."
  - "firmware version compatibility not stated in source."
  - "control ID (ID1) default value not stated."
  - "model code (ID2) for V864Q Mpi not stated."
  - "input-terminal value appendix (\"Supplementary Information by Command\") not included in refined source."
  - "eco mode value table not included in refined source."
  - "base model type value table not included in refined source."
  - "serial flow control not stated."
  - "voltage/current/power specs not in source (control manual only)."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:43:57.642Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC V864Q Mpi Control Spec

## Summary
Sharp/NEC V864Q Mpi is an MPI-series professional projector controllable over RS-232C (PC CONTROL D-SUB 9P) and wired/wireless LAN. This spec covers the binary-framed command protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1). Commands use a hex-byte frame `20h 88h <ID1> <ID2> <LEN> <DATA> <CKS>` with a one-byte additive checksum.

<!-- UNRESOLVED: ID2 model code value not stated for V864Q Mpi — varies by model. Control ID (ID1) default not stated. Flow control not stated. Input-terminal value appendix not included in source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated in source: "Use TCP port number 7142"
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps; high value shown
  # NOTE: baud rate is selectable; other valid rates: 38400, 19200, 9600, 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON (015) / POWER OFF (016) commands present
  - queryable    # inferred: many status request commands present
  - routable     # inferred: INPUT SW CHANGE (018) routing command present
  - levelable    # inferred: PICTURE/VOLUME/LAMP adjust commands present
```

## Actions
```yaml
# Binary protocol. Frame: <hdr> <ID1> <ID2> <LEN> <DATA...> <CKS>
# ID1 = control ID, ID2 = model code (both set on projector, values not in source).
# CKS = additive checksum (low byte of sum of all preceding bytes).
# Literal payloads verbatim from source; parameterized actions show variable parts.

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
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Input terminal value (06h = video port example). Full value table in source appendix "Supplementary Information by Command" (not included in source).

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
    command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA04
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA02
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA03
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Value set for the aspect (full table in source appendix - not included)

  - id: other_adjust
    label: Other Adjust (Lamp/Light Gain)
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target: 96h=LAMP ADJUST / LIGHT ADJUST"
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA04
        type: integer
        description: Adjustment value (high-order 8 bits)
      - name: DATA05
        type: integer
        description: "Adjustment target (high byte): FFh paired with DATA01=96h"

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
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: integer
        description: "Content: 01h=usage time (s), 04h=remaining life (%)"

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte. Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
      - name: DATA02
        type: integer
        description: Key code high byte (00h for all listed codes)

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
    command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lens target: 06h=Periphery Focus"
      - name: DATA02
        type: integer
        description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive +, 81h=drive -, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Lens adjustment target

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "FFh=Stop (mode/value ignored); otherwise lens target"
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: DATA03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA04
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

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
    command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "01h=freeze on, 02h=freeze off"

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

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

  - id: pip_picture_by_picture_request
    label: PIP/Picture by Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: DATA01
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
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Value set for the eco mode (full table in source appendix - not included)

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01-16} 00h {CKS}"
    params:
      - name: DATA01-16
        type: string
        description: Projector name (up to 16 bytes, NUL-terminated)

  - id: pip_picture_by_picture_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: integer
        description: "Setting value (varies by DATA01; MODE: 00h=PIP, 01h=PbP; START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT)"

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
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
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Input terminal (full table in source appendix - not included)
      - name: DATA02
        type: integer
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Responses returned for each command. Success frame prefix per command group:
#   20h-series queries: A0h <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
#   22h-series actions: response echo <cmd> <ID1> <ID2> <LEN> <DATA> <CKS>; error A2h
#   23h-series param ops: error A3h
feedbacks:
  - id: command_result
    type: enum
    description: Per-command ack. Success returns echoed command with LEN/DATA; failure returns A0h/A2h/A3h prefix with ERR1/ERR2.
  - id: error_code
    type: bitmap
    description: "ERR1+ERR2 pair. Documented codes include 00h00h=unrecognized, 00h01h=unsupported by model, 01h00h=invalid value, 01h01h=invalid input terminal, 02h0Dh=power off, 02h0Eh=execution failed, 02h0Fh=no authority, etc."
  - id: power_status
    type: enum
    values: [standby, power_on, cooling]
    description: "From RUNNING STATUS REQUEST DATA03: 00h=Standby, 01h=Power on (FFh=unsupported)"
  - id: error_status_bits
    type: bitmap
    description: 12-byte error bitmap from ERROR STATUS REQUEST (cover, fan, temp, lamp, mirror cover, interlock switch, etc.)
```

## Variables
```yaml
# Settable parameters exposed via dedicated query/set pairs.
variables:
  - name: lamp_adjust
    description: Lamp/Light gain (030-15 + 060-1 96h)
  - name: picture_brightness
  - name: picture_contrast
  - name: picture_color
  - name: picture_hue
  - name: picture_sharpness
  - name: volume
  - name: aspect
  - name: eco_mode
  - name: edge_blending_mode
  - name: projector_name
  - name: pip_pbp_mode
  - name: lens_memory_option
  - name: lens_profile
```

## Events
```yaml
# No unsolicited notifications documented in source.
# All responses are replies to commands.
```

## Macros
```yaml
# No multi-step sequences explicitly documented in source.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source: during power-off incl. cooling time, no other command accepted
  - shutter_close
interlocks:
  - description: "POWER ON (015): no other command accepted while power-on in progress."
  - description: "POWER OFF (016): no other command accepted during power-off and cooling time."
  - description: "Picture/onscreen/sound mute auto-cleared on input switch or video signal switch."
  - description: "Error DATA09 Bit1: interlock switch open - indicates cover/interlock fault."
# UNRESOLVED: no explicit power-on sequencing voltage/current warnings in source.
```

## Notes
- **Protocol:** RS-232C-compliant serial + TCP/IP on port 7142 (both wired and optional wireless LAN units).
- **Checksum:** Additive — sum all bytes preceding CKS, use low-order one byte. Example: `20h+81h+01h+60h+01h+00h=103h → CKS=03h`.
- **Frame layout:** `<header> <ID1> <ID2> <LEN> <DATA??...> <CKS>`. Header byte groups: 00h=read-only queries (ack A0h), 01h/02h=actions (ack 21h/22h, error A1h/A2h), 03h=parameterized ops (ack 23h, error A3h).
- **ID1 (control ID):** set on projector; ID2 (model code): varies by model. Both values not stated in this source.
- **Lamp/filter usage time:** returned in seconds; displayed info updated at 1-minute intervals.
- **Two-lamp models:** DATA01=01h (Lamp 2) effective only on two-lamp projector models.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: control ID (ID1) default value not stated. -->
<!-- UNRESOLVED: model code (ID2) for V864Q Mpi not stated. -->
<!-- UNRESOLVED: input-terminal value appendix ("Supplementary Information by Command") not included in refined source. -->
<!-- UNRESOLVED: eco mode value table not included in refined source. -->
<!-- UNRESOLVED: base model type value table not included in refined source. -->
<!-- UNRESOLVED: serial flow control not stated. -->
<!-- UNRESOLVED: voltage/current/power specs not in source (control manual only). -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:19:41.206Z
last_checked_at: 2026-06-19T07:43:57.642Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:43:57.642Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "ID2 model code value not stated for V864Q Mpi — varies by model. Control ID (ID1) default not stated. Flow control not stated. Input-terminal value appendix not included in source."
- "flow control not stated in source"
- "no explicit power-on sequencing voltage/current warnings in source."
- "firmware version compatibility not stated in source."
- "control ID (ID1) default value not stated."
- "model code (ID2) for V864Q Mpi not stated."
- "input-terminal value appendix (\"Supplementary Information by Command\") not included in refined source."
- "eco mode value table not included in refined source."
- "base model type value table not included in refined source."
- "serial flow control not stated."
- "voltage/current/power specs not in source (control manual only)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
