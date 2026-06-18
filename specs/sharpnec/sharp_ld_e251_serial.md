---
spec_id: admin/sharp-nec-ld-e251
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld E251 Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld E251"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld E251"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:34:07.904Z
last_checked_at: 2026-06-17T20:01:19.661Z
generated_at: 2026-06-17T20:01:19.661Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Many command parameter value tables reference an \"Appendix / Supplementary Information by Command\" not present in the refined source, so exact enum values for input terminals, aspect, eco mode, base model type, and sub-input settings are not enumerated here."
  - "flow control not stated; full-duplex communication mode stated"
  - "settable parameters (brightness/contrast/color/volume/lamp-adjust) are"
  - "no unsolicited notification documented; all responses are command-reply."
  - "no multi-step sequences described in source."
  - "source states POWER ON/OFF block other commands during transition (incl."
  - "firmware version compatibility not stated in source."
  - "default baud rate not stated (9600 chosen from supported set 4800-115200)."
  - "serial flow control not stated."
  - "input terminal / aspect / eco-mode / base-model-type / sub-input enum values not in refined source."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:01:19.661Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec action commands matched exactly against source documentation with correct opcodes, parameters, and transport settings. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld E251 Control Spec

## Summary
Sharp/NEC Ld E251 projector controlled via RS-232C serial or wired/wireless LAN (TCP port 7142). Binary, hex-encoded command frames with a trailing checksum byte (low-order 8 bits of the sum of all preceding bytes). Covers power, input switching, mute, lens control, lamp/filter diagnostics, and numerous status queries.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Many command parameter value tables reference an "Appendix / Supplementary Information by Command" not present in the refined source, so exact enum values for input terminals, aspect, eco mode, base model type, and sub-input settings are not enumerated here. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated for LAN command send/receive
serial:
  baud_rate: 9600  # one of 115200/38400/19200/9600/4800 bps supported; default not stated in source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; full-duplex communication mode stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred: POWER ON / POWER OFF commands present
  - routable    # inferred: INPUT SW CHANGE command present
  - queryable   # inferred: many status request commands present
  - levelable   # inferred: PICTURE ADJUST / VOLUME ADJUST commands present
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
    notes: While powering on, no other command accepted.

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: During power-off (including cooling time), no other command accepted.

  - id: input_sw_change
    label: Input SW Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Input terminal value (e.g. 06h = video). Full value list in source Appendix.
    notes: Example to video port: "02h 03h 00h 00h 02h 01h 06h 0Eh".

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: Turned off on input/video signal switch.

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
    notes: Turned off on input/video switch or volume adjust.

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
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target: 00h=Brightness,01h=Contrast,02h=Color,03h=Hue,04h=Sharpness"
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h=absolute,01h=relative"
      - name: DATA03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA04
        type: integer
        description: Adjustment value (high-order 8 bits)
    notes: Brightness=10 example: "03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h".

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment mode: 00h=absolute,01h=relative"
      - name: DATA02
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA03
        type: integer
        description: Adjustment value (high-order 8 bits)
    notes: Volume=10 example: "03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h".

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Value set for the aspect. Full list in source Appendix.

  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target: 96h=LAMP ADJUST/LIGHT ADJUST"
      - name: DATA02
        type: integer
        description: "Adjustment target sub: FFh (for 96h)"
      - name: DATA03
        type: integer
        description: "Adjustment mode: 00h=absolute,01h=relative"
      - name: DATA04
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA05
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: Returns projector name, lamp usage time, filter usage time.

  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: Returns filter usage time and alarm start time. -1 if undefined.

  - id: lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=Lamp 1,01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: integer
        description: "01h=Lamp usage time (sec),04h=Lamp remaining life (%)"

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=Total Carbon Savings,01h=Carbon Savings during operation"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte (WORD type); e.g. POWER ON=02h,AUTO=05h,MENU=06h,UP=07h,DOWN=08h,RIGHT=09h,LEFT=0Ah,ENTER=0Bh,EXIT=0Ch,HELP=0Dh,MAGNIFY UP=0Fh,MAGNIFY DOWN=10h,MUTE=13h,PICTURE=29h,COMPUTER1=4Bh,COMPUTER2=4Ch,VIDEO1=4Fh,S-VIDEO1=51h,VOLUME UP=84h,VOLUME DOWN=85h,FREEZE=8Ah,ASPECT=A3h,SOURCE=D7h,LAMP MODE/ECO=EEh"
      - name: DATA02
        type: integer
        description: Key code high byte (00h for listed codes)

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
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Target: 06h=Periphery Focus"
      - name: DATA02
        type: integer
        description: "Content: 00h=Stop,01h=drive +1s,02h=drive +0.5s,03h=drive +0.25s,7Fh=drive plus,81h=drive minus,FDh=drive -0.25s,FEh=drive -0.5s,FFh=drive -1s"

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Lens target identifier.

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Lens target; FFh=Stop"
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h=absolute,02h=relative"
      - name: DATA03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA04
        type: integer
        description: Adjustment value (high-order 8 bits)
    notes: When DATA01=FFh (Stop), mode/value not referenced.

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE,01h=STORE,02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MOVE,01h=STORE,02h=RESET"
    notes: Controls profile number set via 053-10 LENS PROFILE SET.

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL,01h=FORCED MUTE"

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL,01h=FORCED MUTE"
      - name: DATA02
        type: integer
        description: "Setting value: 00h=OFF,01h=ON"

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: Returns lens operation state (memory/zoom/focus/lens shift H/V).

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Profile number: 00h=Profile 1,01h=Profile 2"

  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjusted value name: 00h=Brightness,01h=Contrast,02h=Color,03h=Hue,04h=Sharpness,05h=Volume,96h=Lamp/Light Adjust"

  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: Returns base model type, sound function, profile number.

  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: Returns power/cooling/power-on-off/operation status.

  - id: input_status_request
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: Returns signal switch, signal list number, selection signal type.

  - id: mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: Returns picture/sound/onscreen/forced-onscreen mute + OSD state.

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
    notes: Returns mirror cover / lens cover state.

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "01h=Freeze on,02h=Freeze off"

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "03h=Horizontal sync frequency,04h=Vertical sync frequency"

  - id: eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: Returns Light mode / Lamp mode per projector.

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
    label: PIP / Picture by Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE,01h=START POSITION,02h=SUB INPUT/SUB INPUT 1,09h=SUB INPUT 2,0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Value set for eco mode. Full list in source Appendix.

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
    params:
      - name: DATA01-16
        type: string
        description: Projector name (up to 16 bytes).

  - id: pip_picture_by_picture_set
    label: PIP / Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE,01h=START POSITION,02h=SUB INPUT/SUB INPUT 1,09h=SUB INPUT 2,0Ah=SUB INPUT 3"
      - name: DATA02
        type: integer
        description: "Setting value; e.g. for MODE 00h=PIP,01h=PbP; for START POSITION 00h=TOP-LEFT..03h=BOTTOM-RIGHT"

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Setting value: 00h=OFF,01h=ON"

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
    notes: Returns operation status, displayed content, signal type, mute/freeze state.

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Input terminal. Full value list in source Appendix.
      - name: DATA02
        type: integer
        description: "Setting value: 00h=terminal in DATA01,01h=BNC,02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitmask
    description: Error information across DATA01-DATA12 (bit set = error).

  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]

  - id: input_signal_state
    type: object
    description: Signal switch, list number, selection signal type.

  - id: mute_state
    type: object
    description: Picture/sound/onscreen/forced-onscreen mute + OSD state.

  - id: cover_state
    type: enum
    values: [normal_opened, cover_closed]

  - id: lens_state
    type: bitmask
    description: Lens memory/zoom/focus/lens-shift operation bits.

  - id: execution_result
    type: enum
    values: [success, error]
    description: Common 0000h=success / other=error response for adjust commands.

  - id: response_error
    type: object
    description: ERR1/ERR2 error code pair (see source §2.4 error code list).
```

## Variables
```yaml
# UNRESOLVED: settable parameters (brightness/contrast/color/volume/lamp-adjust) are
# represented as parameterized actions above; no separate variable registry described.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification documented; all responses are command-reply.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source states POWER ON/OFF block other commands during transition (incl.
# cooling), and notes an interlock switch state in error-status DATA09. No explicit
# safety interlock procedure or power-on sequencing requirement documented.
```

## Notes
- Command/response framing: `20h 88h <ID1> <ID2> 0Ch <DATA01>...<DATA12> <CKS>` (hex). `<ID1>` = control ID set on projector; `<ID2>` = model code (varies by model); `<CKS>` = checksum (low-order byte of sum of all preceding bytes).
- Example checksum: `20h + 81h + 01h + 60h + 01h + 00h = 103h` → `CKS = 03h`.
- Communication mode full duplex. RS-232C uses a cross (null-modem) serial cable on the PC CONTROL D-SUB 9P port.
- LAN: wired IEEE802.3/802.3u auto 10/100 Mbps, or optional wireless LAN unit.
- Usage times update at one-minute intervals though queryable in one-second units.
- Several value enums (input terminal, aspect, eco mode, base model type, sub-input) live in a source "Appendix / Supplementary Information by Command" not present in the refined source text.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: default baud rate not stated (9600 chosen from supported set 4800-115200). -->
<!-- UNRESOLVED: serial flow control not stated. -->
<!-- UNRESOLVED: input terminal / aspect / eco-mode / base-model-type / sub-input enum values not in refined source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:34:07.904Z
last_checked_at: 2026-06-17T20:01:19.661Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:01:19.661Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec action commands matched exactly against source documentation with correct opcodes, parameters, and transport settings. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Many command parameter value tables reference an \"Appendix / Supplementary Information by Command\" not present in the refined source, so exact enum values for input terminals, aspect, eco mode, base model type, and sub-input settings are not enumerated here."
- "flow control not stated; full-duplex communication mode stated"
- "settable parameters (brightness/contrast/color/volume/lamp-adjust) are"
- "no unsolicited notification documented; all responses are command-reply."
- "no multi-step sequences described in source."
- "source states POWER ON/OFF block other commands during transition (incl."
- "firmware version compatibility not stated in source."
- "default baud rate not stated (9600 chosen from supported set 4800-115200)."
- "serial flow control not stated."
- "input terminal / aspect / eco-mode / base-model-type / sub-input enum values not in refined source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
