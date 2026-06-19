---
spec_id: admin/sharp-nec-np-pe455wl
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP-PE455WL Control Spec"
manufacturer: Sharp/NEC
model_family: NP-PE455WL
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NP-PE455WL
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:21:18.367Z
last_checked_at: 2026-06-18T08:51:15.096Z
generated_at: 2026-06-18T08:51:15.096Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "appendix values for input terminal, base model type, eco mode values not present in refined source"
  - "source states \"Full duplex\" communication mode, RTS/CTS wired on D-SUB pinout but flow_control setting not explicitly named"
  - "source lists ERR1/ERR2 code combinations (00h-03h ranges) but does not enumerate a bounded enum set safely extractable here."
  - "source does not define discrete settable named variables outside of action"
  - "source describes responses only as command replies; no unsolicited"
  - "source documents no multi-step macro sequences."
  - "appendix enum values (input terminal, base model type, eco mode, selection signal type, aspect) not present in refined source"
  - "protocol version number not stated"
  - "full ERR1/ERR2 bounded enum set not safely extractable (only examples shown)"
  - "explicit serial flow_control setting not stated (RTS/CTS wired on pinout only)"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:51:15.096Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP-PE455WL Control Spec

## Summary
The Sharp/NEC NP-PE455WL is a projector controllable via RS-232C serial (PC CONTROL D-SUB 9P) and wired/wireless LAN. This spec covers the binary command protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1), including power, input switching, mute, picture/volume/lens adjustment, lens memory, status queries, and LAN/eco/PIP/edge-blend configuration commands.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: appendix values for input terminal, base model type, eco mode values not present in refined source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 as configurable; high value shown
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode, RTS/CTS wired on D-SUB pinout but flow_control setting not explicitly named
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWER ON / POWER OFF commands
  - queryable    # inferred from numerous status/information request commands
  - routable     # inferred from INPUT SW CHANGE command
  - levelable    # inferred from PICTURE/VOLUME/LENS adjustment commands
  - mutable      # inferred from PICTURE/SOUND/ONSCREEN MUTE commands
```

## Actions
```yaml
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
    notes: While turning power on, no other command is accepted.

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: During power-off (incl. cooling time), no other command is accepted.

  - id: input_sw_change
    label: Input Switch Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: Input terminal value (06h = video port example). Full list in source Appendix.
    notes: Response DATA01 FFh = ended with error (no switch made).

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: Cleared on input/video signal switch.

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
    notes: Cleared on input/video signal switch or volume adjustment.

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
    notes: Cleared on input/video signal switch.

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
        description: Adjustment target (00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness)
      - name: data02
        type: integer
        description: Adjustment mode (00h absolute, 01h relative)
      - name: data03
        type: integer
        description: Adjustment value low-order 8 bits
      - name: data04
        type: integer
        description: Adjustment value high-order 8 bits

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
    params:
      - name: data01
        type: integer
        description: Adjustment mode (00h absolute, 01h relative)
      - name: data02
        type: integer
        description: Adjustment value low-order 8 bits
      - name: data03
        type: integer
        description: Adjustment value high-order 8 bits

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
    params:
      - name: data01
        type: integer
        description: Value set for aspect (see source Appendix).

  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
    params:
      - name: data01
        type: integer
        description: Adjustment target high byte (96h = LAMP/LIGHT ADJUST)
      - name: data02
        type: integer
        description: Adjustment target low byte (FFh for LAMP/LIGHT)
      - name: data03
        type: integer
        description: Adjustment mode (00h absolute, 01h relative)
      - name: data04
        type: integer
        description: Adjustment value low-order 8 bits
      - name: data05
        type: integer
        description: Adjustment value high-order 8 bits

  - id: information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: Returns projector name, lamp usage seconds, filter usage seconds.

  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: Returns filter usage time and alarm start time (seconds). -1 if undefined.

  - id: lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: Lamp selector (00h Lamp 1, 01h Lamp 2 - Lamp 2 only for two-lamp models)
      - name: data02
        type: integer
        description: Content (01h usage time seconds, 04h remaining life %)
    notes: Updated at one-minute intervals. Negative remaining life if replacement deadline exceeded.

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: 00h Total Carbon Savings, 01h Carbon Savings during operation

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: Key code low byte (WORD key code, see source key code list)
      - name: data02
        type: integer
        description: Key code high byte

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
        description: Lens target (06h = Periphery Focus; other targets per source)
      - name: data02
        type: integer
        description: Drive action (00h Stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh + continuous, 81h - continuous, FDh -0.25s, FEh -0.5s, FFh -1s)
    notes: Send 00h to stop after continuous 7Fh/81h drive.

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    params:
      - name: data01
        type: integer
        description: Lens target selector

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: integer
        description: Lens target (FFh = Stop, otherwise lens axis selector)
      - name: data02
        type: integer
        description: Adjustment mode (00h absolute, 02h relative)
      - name: data03
        type: integer
        description: Adjustment value low-order 8 bits
      - name: data04
        type: integer
        description: Adjustment value high-order 8 bits

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: Operation (00h MOVE, 01h STORE, 02h RESET)

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: Operation (00h MOVE, 01h STORE, 02h RESET)
    notes: Controls profile selected via LENS PROFILE SET.

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: Option (00h LOAD BY SIGNAL, 01h FORCED MUTE)

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: Option (00h LOAD BY SIGNAL, 01h FORCED MUTE)
      - name: data02
        type: integer
        description: Setting value (00h OFF, 01h ON)

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: Returns bitfield of lens operation status (lens memory/zoom/focus/shift H/V).

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: Profile number (00h Profile 1, 01h Profile 2)

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
        description: Adjusted value name (00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light Adjust)

  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: Returns base model type, sound function, profile/clock capabilities.

  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: Returns power status, cooling/power process flags, operation status.

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
        description: 01h freeze on, 02h freeze off

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
    params:
      - name: data01
        type: integer
        description: Information type (03h horizontal sync frequency, 04h vertical sync frequency)

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
    label: PIP/Picture By Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: Parameter (00h MODE, 01h START POSITION, 02h SUB INPUT/1, 09h SUB INPUT 2, 0Ah SUB INPUT 3)

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
        description: Value set for eco mode (see source Appendix).

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01..data16} 00h {cks}"
    params:
      - name: name
        type: string
        description: Projector name (up to 16 bytes)

  - id: pip_picture_by_picture_set
    label: PIP/Picture By Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: Parameter (00h MODE, 01h START POSITION, 02h SUB INPUT/1, 09h SUB INPUT 2, 0Ah SUB INPUT 3)
      - name: data02
        type: integer
        description: Setting value per parameter

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: Setting value (00h OFF, 01h ON)

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
        description: Input terminal (see source Appendix)
      - name: data02
        type: integer
        description: Setting value (00h specified terminal, 01h BNC, 02h COMPUTER)
```

## Feedbacks
```yaml
feedbacks:
  - id: command_response_ack
    type: object
    description: Per-command success response (mnemonic-prefixed 2xh ACK with optional DATA, terminated by checksum).
  - id: command_response_error
    type: object
    description: Per-command failure response (Axh prefix, carries ERR1/ERR2 error code combination).
    # UNRESOLVED: source lists ERR1/ERR2 code combinations (00h-03h ranges) but does not enumerate a bounded enum set safely extractable here.
```

## Variables
```yaml
# UNRESOLVED: source does not define discrete settable named variables outside of action
# payloads; adjustable picture/volume/lens parameters are expressed as actions, not
# standing variables. Section intentionally left empty.
variables: []
```

## Events
```yaml
# UNRESOLVED: source describes responses only as command replies; no unsolicited
# event/notification stream documented.
events: []
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_on_lockout
    description: While POWER ON command is executing, no other command can be accepted.
    source: 015. POWER ON section.
  - id: power_off_lockout
    description: During POWER OFF (including cooling time), no other command can be accepted.
    source: 016. POWER OFF section.
```

## Notes
- All command/response frames use hexadecimal byte notation; checksum byte (CKS) is the low-order 8 bits of the sum of all preceding bytes. ID1 (control ID) and ID2 (model code) prefix responses.
- Frame mnemonic prefixes: `02h`/`03h` etc. on command requests, `2xh`/`3xh` on success responses, `Axh` on error responses (e.g. `A2h`, `A3h`, `A0h`, `A1h`).
- Serial connection uses a cross (null-modem) cable to the PC CONTROL D-SUB 9P port. RTS/CTS pins wired but explicit flow-control setting not named.
- Baud rate is configurable across 4800 / 9600 / 19200 / 38400 / 115200 bps; data length 8 bits, parity none, stop bit 1, full duplex.
- TCP LAN control uses port 7142 (wired 10/100BASE-T, also wireless LAN unit supported per model operation manual).
- Several DATA enum value tables (input terminal list, base model type, eco mode values, selection signal types, aspect values) are referenced as living in a source Appendix not present in the refined excerpt; those parameter descriptions are marked accordingly.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: appendix enum values (input terminal, base model type, eco mode, selection signal type, aspect) not present in refined source -->
<!-- UNRESOLVED: protocol version number not stated -->
<!-- UNRESOLVED: full ERR1/ERR2 bounded enum set not safely extractable (only examples shown) -->
<!-- UNRESOLVED: explicit serial flow_control setting not stated (RTS/CTS wired on pinout only) -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:21:18.367Z
last_checked_at: 2026-06-18T08:51:15.096Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:51:15.096Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "appendix values for input terminal, base model type, eco mode values not present in refined source"
- "source states \"Full duplex\" communication mode, RTS/CTS wired on D-SUB pinout but flow_control setting not explicitly named"
- "source lists ERR1/ERR2 code combinations (00h-03h ranges) but does not enumerate a bounded enum set safely extractable here."
- "source does not define discrete settable named variables outside of action"
- "source describes responses only as command replies; no unsolicited"
- "source documents no multi-step macro sequences."
- "appendix enum values (input terminal, base model type, eco mode, selection signal type, aspect) not present in refined source"
- "protocol version number not stated"
- "full ERR1/ERR2 bounded enum set not safely extractable (only examples shown)"
- "explicit serial flow_control setting not stated (RTS/CTS wired on pinout only)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
