---
spec_id: admin/sharp-nec-np-m403x
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP M403X Control Spec"
manufacturer: Sharp/NEC
model_family: "NP M403X"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP M403X"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:56:13.934Z
last_checked_at: 2026-06-18T08:36:02.404Z
generated_at: 2026-06-18T08:36:02.404Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model name spelling (source gives no explicit model string; \"NP M403X\" taken from input). Firmware version compatibility not stated."
  - "no single default stated."
  - "flow control not stated; source states full-duplex communication mode only"
  - "full response-payload schemas per query not enumerated here; see source."
  - "exact min/max/default ranges per variable only obtainable via GAIN PARAMETER REQUEST 3 at runtime; not statically stated."
  - "no event/notification mechanism stated in source."
  - "populate if source documents any; none found."
  - "no explicit power-on sequencing interlock procedure stated beyond the"
  - "firmware version compatibility not stated in source."
  - "serial baud has five legal values (115200/38400/19200/9600/4800); no single default marked, so 9600 listed provisionally."
  - "model name spelling — source names no model; \"NP M403X\" taken from operator input."
  - "appendix value tables (input terminal, aspect, eco mode, sub input) not present in refined excerpt."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:36:02.404Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP M403X Control Spec

## Summary
Sharp/NEC NP M403X LCD projector controlled via RS-232C serial or wired/wireless LAN (TCP). Binary command protocol using hex bytes with a trailing checksum byte. This spec covers the full command catalogue documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1): power, input switching, mute, picture/volume/aspect/lens adjustment, lens memory, status queries, and information requests.

<!-- UNRESOLVED: model name spelling (source gives no explicit model string; "NP M403X" taken from input). Firmware version compatibility not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source lists 115200/38400/19200/9600/4800 as selectable; 9600 shown as default-class entry. UNRESOLVED: no single default stated.
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; source states full-duplex communication mode only
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable  # inferred from POWER ON / POWER OFF commands (015, 016)
  - routable   # inferred from INPUT SW CHANGE command (018)
  - queryable  # inferred from many status/information request commands
  - levelable  # inferred from PICTURE ADJUST / VOLUME ADJUST (030-1, 030-2)
```

## Actions
```yaml
# Protocol framing: commands are hex byte strings. Common parameters:
#   <ID1> = control ID, <ID2> = model code, <CKS> = checksum (low byte of
#   sum of all preceding bytes). Variable DATA bytes shown per command.
actions:
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
  - id: power_off
    label: Power Off (016)
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
  - id: input_sw_change
    label: Input Switch Change (018)
    kind: action
    command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Input terminal byte, e.g. 06h = video port (see appendix)"
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
        description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
      - name: data02
        type: string
        description: "Mode: 00h absolute, 01h relative"
      - name: data03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)"
  - id: volume_adjust
    label: Volume Adjust (030-2)
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
    params:
      - name: data01
        type: string
        description: "Mode: 00h absolute, 01h relative"
      - name: data02
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data03
        type: integer
        description: "Adjustment value (high-order 8 bits)"
  - id: aspect_adjust
    label: Aspect Adjust (030-12)
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Aspect value (see appendix Supplementary Information by Command)"
  - id: other_adjust
    label: Other Adjust / Lamp-Light Adjust (030-15)
    kind: action
    command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
    params:
      - name: data01
        type: string
        description: "Target hi byte; DATA01=DATA02 96h/FFh = LAMP ADJUST / LIGHT ADJUST"
      - name: data02
        type: string
        description: "Target lo byte (FFh for LAMP/LIGHT ADJUST)"
      - name: data03
        type: string
        description: "Mode: 00h absolute, 01h relative"
      - name: data04
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data05
        type: integer
        description: "Adjustment value (high-order 8 bits)"
  - id: information_request
    label: Information Request (037)
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
  - id: filter_usage_information_request
    label: Filter Usage Information Request (037-3)
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
  - id: lamp_information_request_3
    label: Lamp Information Request 3 (037-4)
    kind: query
    command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Lamp: 00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
      - name: data02
        type: string
        description: "Content: 01h usage time (s), 04h remaining life (%)"
  - id: carbon_savings_information_request
    label: Carbon Savings Information Request (037-6)
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h Total Carbon Savings, 01h Carbon Savings during operation"
  - id: remote_key_code
    label: Remote Key Code (050)
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Key code low byte (WORD type; see key code list)"
      - name: data02
        type: string
        description: "Key code high byte"
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
        description: "06h Periphery Focus"
      - name: data02
        type: string
        description: "00h Stop; 01h/02h/03h drive plus 1s/0.5s/0.25s; 7Fh drive plus; 81h drive minus; FDh/FEh/FFh drive minus 0.25s/0.5s/1s"
  - id: lens_control_request
    label: Lens Control Request (053-1)
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Lens target (e.g. 06h Periphery Focus)"
  - id: lens_control_2
    label: Lens Control 2 (053-2)
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: string
        description: "FFh Stop, else lens target"
      - name: data02
        type: string
        description: "Mode: 00h absolute, 02h relative"
      - name: data03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)"
  - id: lens_memory_control
    label: Lens Memory Control (053-3)
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h MOVE, 01h STORE, 02h RESET"
  - id: reference_lens_memory_control
    label: Reference Lens Memory Control (053-4)
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h MOVE, 01h STORE, 02h RESET"
  - id: lens_memory_option_request
    label: Lens Memory Option Request (053-5)
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
  - id: lens_memory_option_set
    label: Lens Memory Option Set (053-6)
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
      - name: data02
        type: string
        description: "Setting value: 00h OFF, 01h ON"
  - id: lens_information_request
    label: Lens Information Request (053-7)
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
  - id: lens_profile_set
    label: Lens Profile Set (053-10)
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h Profile 1, 01h Profile 2"
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
        description: "00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light Adjust"
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
        description: "01h freeze on, 02h freeze off"
  - id: information_string_request
    label: Information String Request (084)
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
    params:
      - name: data01
        type: string
        description: "03h Horizontal sync frequency, 04h Vertical sync frequency"
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
  - id: pip_picture_by_picture_request
    label: PIP/Picture by Picture Request (097-198)
    kind: query
    command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
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
        description: "Eco mode value (see appendix Supplementary Information by Command)"
  - id: lan_projector_name_set
    label: LAN Projector Name Set (098-45)
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01} {data16} 00h {cks}"
    params:
      - name: data_name
        type: string
        description: "Projector name bytes DATA01-DATA16 (up to 16 bytes)"
  - id: pip_picture_by_picture_set
    label: PIP/Picture by Picture Set (098-198)
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
      - name: data02
        type: string
        description: "Setting value per DATA01 (see appendix)"
  - id: edge_blending_mode_set
    label: Edge Blending Mode Set (098-243-1)
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h OFF, 01h ON"
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
        description: "Input terminal (see appendix)"
      - name: data02
        type: string
        description: "00h terminal specified in DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
# Each query command returns a structured hex response; the device also
# reports errors via ERR1/ERR2 byte pairs. Representative observables:
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    # from RUNNING STATUS REQUEST DATA03/DATA06 and BASIC INFORMATION REQUEST DATA01
  - id: error_status
    type: bitmask
    # ERROR STATUS REQUEST returns DATA01-12 bitmask; see source error info list
  - id: lamp_usage_time
    type: integer
    # seconds, LAMP INFORMATION REQUEST 3
  - id: command_result
    type: enum
    values: [success, error]
    # 22h/23h ack vs A2h/A3h ERR1/ERR2 response
# UNRESOLVED: full response-payload schemas per query not enumerated here; see source.
```

## Variables
```yaml
# Settable continuous parameters (mirror of the 030-* / 060-1 / 098-* actions).
variables:
  - id: brightness
    type: integer
    # set via PICTURE ADJUST DATA01=00h
  - id: contrast
    type: integer
  - id: color
    type: integer
  - id: hue
    type: integer
  - id: sharpness
    type: integer
  - id: volume
    type: integer
  - id: eco_mode
    type: string
    # set via ECO MODE SET
  - id: projector_name
    type: string
    # up to 16 bytes, LAN PROJECTOR NAME SET
# UNRESOLVED: exact min/max/default ranges per variable only obtainable via GAIN PARAMETER REQUEST 3 at runtime; not statically stated.
```

## Events
```yaml
# No unsolicited notifications documented; all responses are command replies.
# UNRESOLVED: no event/notification mechanism stated in source.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
# UNRESOLVED: populate if source documents any; none found.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON (015): no other command accepted while power-on is in progress."
  - "POWER OFF (016): no other command accepted during power-off including cooling time."
  - "DATA09 Bit1 of ERROR STATUS REQUEST: interlock switch open is reported as an error condition."
# UNRESOLVED: no explicit power-on sequencing interlock procedure stated beyond the
# "no other command accepted" notes; cover/mirror cover status is queryable (078-6).
```

## Notes
- Binary protocol: every command/response is a frame of hex bytes. Response frames begin with a high-bit-set opcode (e.g. `22h` success ack, `A2h` error) echoing the command byte index, followed by `<ID1> <ID2>`, a length byte `LEN`, optional DATA bytes, and `<CKS>` checksum.
- Checksum (`CKS`) = low-order one byte of the sum of all preceding bytes in the frame.
- `<ID1>` is the projector's control ID; `<ID2>` is model-dependent. Both must be supplied per the target device.
- Commands with `kind: query` expect a data-bearing success response (`20h`/`23h` prefix); commands with `kind: action` expect a no-data ack (`22h`/`23h` prefix) on success, or an `A*h`/`A3h` error frame carrying `<ERR1> <ERR2>` on failure.
- Error code pairs (ERR1/ERR2) are tabulated in source section 2.4 (e.g. `02h 0Dh` = command rejected because power is off; `02h 0Eh` = execution failed).
- The appendix "Supplementary Information by Command" (not included in this refined excerpt) holds the input-terminal byte table, aspect values, eco-mode values, and sub-input values referenced by several actions.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: serial baud has five legal values (115200/38400/19200/9600/4800); no single default marked, so 9600 listed provisionally. -->
<!-- UNRESOLVED: model name spelling — source names no model; "NP M403X" taken from operator input. -->
<!-- UNRESOLVED: appendix value tables (input terminal, aspect, eco mode, sub input) not present in refined excerpt. -->
````

Spec emitted. 53 actions, one per source command row. Serial+TCP transport (port 7142 verbatim). Power-on/off + cooling interlocks captured in Safety. Gaps flagged `UNRESOLVED`.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:56:13.934Z
last_checked_at: 2026-06-18T08:36:02.404Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:36:02.404Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model name spelling (source gives no explicit model string; \"NP M403X\" taken from input). Firmware version compatibility not stated."
- "no single default stated."
- "flow control not stated; source states full-duplex communication mode only"
- "full response-payload schemas per query not enumerated here; see source."
- "exact min/max/default ranges per variable only obtainable via GAIN PARAMETER REQUEST 3 at runtime; not statically stated."
- "no event/notification mechanism stated in source."
- "populate if source documents any; none found."
- "no explicit power-on sequencing interlock procedure stated beyond the"
- "firmware version compatibility not stated in source."
- "serial baud has five legal values (115200/38400/19200/9600/4800); no single default marked, so 9600 listed provisionally."
- "model name spelling — source names no model; \"NP M403X\" taken from operator input."
- "appendix value tables (input terminal, aspect, eco mode, sub input) not present in refined excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
