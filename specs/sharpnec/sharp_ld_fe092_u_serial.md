---
spec_id: admin/sharpnec-ld-fe092-u
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LD Fe092 U Control Spec"
manufacturer: Sharp/NEC
model_family: "LD Fe092 U"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LD Fe092 U"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:03:52.050Z
last_checked_at: 2026-06-17T20:05:35.021Z
generated_at: 2026-06-17T20:05:35.021Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model code (ID2) for LD Fe092 U not stated in source; must be read from device or model-specific appendix. Control ID (ID1) default value not stated."
  - "source describes no unsolicited notifications / push events. All responses are"
  - "source describes no explicit multi-step macro sequences."
  - "source notes \"While this command is turning on the power, no other command can"
  - "control ID (ID1) default value not stated."
  - "model code (ID2) for LD Fe092 U not stated."
  - "serial flow control mode (none/hardware) not explicitly stated — RTS/CTS pins wired."
  - "Appendix \"Supplementary Information by Command\" not in source — input terminal values, aspect values, eco mode values, base model types, sub-input values, key code sub-values."
  - "firmware version compatibility not stated."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:05:35.021Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command bytes; transport (TCP 7142 + RS-232 9600bps) fully supported; source command list exactly equals spec coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LD Fe092 U Control Spec

## Summary
Sharp/NEC LD Fe092 U projector, controlled via RS-232C serial or wired/wireless LAN (TCP port 7142). Spec covers 53 documented commands: power, input switching, mutes, picture/volume/aspect/gain adjust, lens control & memory, shutter, freeze, eco mode, edge blending, PIP/PbP, and a broad set of status/error/information queries. Binary command frames use a leading 2xh/3xh prefix, model/control ID bytes, a length byte, DATA bytes, and a checksum byte.

<!-- UNRESOLVED: exact model code (ID2) for LD Fe092 U not stated in source; must be read from device or model-specific appendix. Control ID (ID1) default value not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source lists 115200/38400/19200/9600/4800 - device auto-configurable; pick one at config time
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source: Full duplex; RTS/CTS pins present but flow-control mode not specified
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON / POWER OFF commands (015, 016)
  - routable        # inferred: INPUT SW CHANGE (018), AUDIO SELECT SET (319-10)
  - queryable       # inferred: many query/REQUEST commands
  - levelable       # inferred: PICTURE ADJUST, VOLUME ADJUST, OTHER ADJUST (030-*)
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
  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
  - id: input_sw_change
    label: Input SW Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Input terminal value (e.g. 06h = video port). See Appendix "Supplementary Information by Command".
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
    command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} - {DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Adjustment target (00h=Brightness,01h=Contrast,02h=Color,03h=Hue,04h=Sharpness)
      - name: DATA02
        type: integer
        description: Adjustment mode (00h=absolute,01h=relative)
      - name: DATA03
        type: integer
        description: Adjustment value (low 8 bits)
      - name: DATA04
        type: integer
        description: Adjustment value (high 8 bits)
  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} - {DATA03} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Adjustment mode (00h=absolute,01h=relative)
      - name: DATA02
        type: integer
        description: Adjustment value (low 8 bits)
      - name: DATA03
        type: integer
        description: Adjustment value (high 8 bits)
  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Aspect value. See Appendix "Supplementary Information by Command".
  - id: other_adjust
    label: Other Adjust
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} - {DATA05} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Adjustment target high byte (96h, FFh for LAMP/LIGHT ADJUST)
      - name: DATA02
        type: integer
        description: Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)
      - name: DATA03
        type: integer
        description: Adjustment mode (00h=absolute,01h=relative)
      - name: DATA04
        type: integer
        description: Adjustment value (low 8 bits)
      - name: DATA05
        type: integer
        description: Adjustment value (high 8 bits)
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
        description: Lamp (00h=Lamp 1, 01h=Lamp 2; Lamp 2 only for two-lamp models)
      - name: DATA02
        type: integer
        description: Content (01h=usage time seconds, 04h=remaining life %)
  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: 00h=Total Carbon Savings, 01h=Carbon Savings during operation
  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Key code low byte (see Key code list, e.g. 02h=POWER ON, 0Dh=MENU, 09h=UP, etc.)
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
        description: Lens target (06h=Periphery Focus; other values per source)
      - name: DATA02
        type: integer
        description: Direction/duration (00h=Stop,01h=+1s,02h=+0.5s,03h=+0.25s,7Fh=+,81h=-,FDh=-0.25s,FEh=-0.5s,FFh=-1s)
  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Lens target
  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} - {DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Lens target (FFh=Stop)
      - name: DATA02
        type: integer
        description: Adjustment mode (00h=absolute,02h=relative)
      - name: DATA03
        type: integer
        description: Adjustment value (low 8 bits)
      - name: DATA04
        type: integer
        description: Adjustment value (high 8 bits)
  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Operation (00h=MOVE,01h=STORE,02h=RESET)
  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Operation (00h=MOVE,01h=STORE,02h=RESET)
  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE
  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE
      - name: DATA02
        type: integer
        description: Setting value (00h=OFF,01h=ON)
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
        description: Profile number (00h=Profile 1, 01h=Profile 2)
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
        description: Adjusted value name (00h=Brightness,01h=Contrast,02h=Color,03h=Hue,04h=Sharpness,05h=Volume,96h=Lamp/Light Adjust)
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
        description: 01h=Freeze On, 02h=Freeze Off
  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Information type (03h=Horizontal sync freq, 04h=Vertical sync freq)
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
    label: PIP/Picture By Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: 00h=MODE,01h=START POSITION,02h=SUB INPUT/SUB INPUT 1,09h=SUB INPUT 2,0Ah=SUB INPUT 3
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
        description: Value set for eco mode. See Appendix "Supplementary Information by Command".
  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01} - {DATA16} 00h {CKS}"
    params:
      - name: DATA01_16
        type: string
        description: Projector name (up to 16 bytes)
  - id: pip_pbp_set
    label: PIP/Picture By Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: 00h=MODE,01h=START POSITION,02h=SUB INPUT/SUB INPUT 1,09h=SUB INPUT 2,0Ah=SUB INPUT 3
      - name: DATA02
        type: integer
        description: Setting value (per mode). See source for MODE/START POSITION/SUB INPUT value tables.
  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Setting value (00h=OFF,01h=ON)
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
        description: Input terminal. See Appendix "Supplementary Information by Command".
      - name: DATA02
        type: integer
        description: Setting value (00h=specified terminal,01h=BNC,02h=COMPUTER)
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitmap
    description: 12-byte error info (DATA01-12). Bit=0 normal, bit=1 error. See source Error information list (cover, fan, temp, lamp, mirror cover, foreign matter, interlock, system, etc.).
  - id: information_response
    type: object
    description: 98-byte info block: projector name (DATA01-49), lamp usage seconds (DATA83-86), filter usage seconds (DATA87-90).
  - id: filter_usage_info
    type: object
    description: Filter usage seconds (DATA01-04), filter alarm start seconds (DATA05-08). "-1" if undefined.
  - id: lamp_usage_info
    type: object
    description: Lamp usage seconds or remaining life % (DATA03-06). Negative remaining life if lamp replacement deadline exceeded.
  - id: carbon_savings_info
    type: object
    description: Carbon Savings kg (DATA02-05) and mg (DATA06-09).
  - id: remote_key_response
    type: enum
    description: Echo DATA01; FFh = error.
  - id: lens_control_request_response
    type: object
    description: Adjustment range upper/lower limit + current value (DATA02-07), 16-bit each.
  - id: lens_memory_control_response
    type: enum
    description: DATA01 echo (00h MOVE,01h STORE,02h RESET,FFh error).
  - id: lens_memory_option_response
    type: object
    description: DATA01 option (00h LOAD BY SIGNAL,01h FORCED MUTE), DATA02 value (00h OFF,01h ON).
  - id: lens_information
    type: bitmap
    description: DATA01 bitfield: Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift (H), Bit4 Lens Shift (V). 0=Stop,1=During operation.
  - id: lens_profile_response
    type: enum
    description: Profile number (00h=Profile 1, 01h=Profile 2).
  - id: gain_parameter_response
    type: object
    description: 16-byte gain block: status, upper/lower/default/current values, wide/narrow adjustment widths, default validity.
  - id: setting_response
    type: object
    description: 32-byte setting block: base model type (DATA01-03), sound function (DATA04), profile/clock/sleep (DATA05).
  - id: running_status_response
    type: object
    description: 16-byte status: power status (DATA03), cooling (DATA04), power process (DATA05), operation status (DATA06).
  - id: input_status_response
    type: object
    description: 16-byte input status: signal switch process, signal list number, selection signal types, test pattern, content displayed.
  - id: mute_status_response
    type: object
    description: 16-byte mute block: picture/sound/onscreen mute, forced onscreen mute, OSD display.
  - id: model_name_response
    type: string
    description: Model name string (NUL-terminated), DATA01-32.
  - id: cover_status_response
    type: enum
    description: 00h=Normal (cover opened), 01h=Cover closed.
  - id: freeze_response
    type: enum
    description: DATA01 echo (01h On,02h Off).
  - id: information_string_response
    type: string
    description: Label/information string for the requested type (H/V sync freq).
  - id: eco_mode_response
    type: integer
    description: DATA01 value for eco mode. See Appendix.
  - id: lan_projector_name_response
    type: string
    description: Projector name (DATA01-17, NUL-terminated).
  - id: lan_mac_address_response
    type: string
    description: MAC address bytes (DATA01-06).
  - id: pip_pbp_response
    type: object
    description: PIP/PbP setting for requested DATA01 (MODE, START POSITION, SUB INPUTs).
  - id: edge_blending_response
    type: enum
    description: 00h=OFF, 01h=ON.
  - id: base_model_type_response
    type: object
    description: Base model type (DATA01-02, DATA12-13), model name (DATA03-11).
  - id: serial_number_response
    type: string
    description: Serial number string (DATA01-16, NUL-terminated).
  - id: basic_information_response
    type: object
    description: 15-byte basic status: operation status, content displayed, signal types, video/sound/onscreen mute, freeze.
  - id: audio_select_response
    type: enum
    description: Execution result (00h success, 01h error) per input terminal.
  - id: command_error
    type: object
    description: Response prefix Axh with ERR1/ERR2 error codes (00h-03h). See source Error code list (unrecognized, unsupported, invalid value, invalid terminal, memory error, power off, no authority, gain error, etc.).
```

## Variables
```yaml
# Discrete settable parameters already represented as parameterized actions above.
# Per-source single-value settings (eco mode, edge blending, projector name, audio select)
# are exposed as actions with params rather than named variables.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications / push events. All responses are
# replies to commands.
```

## Macros
```yaml
# UNRESOLVED: source describes no explicit multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source notes "While this command is turning on the power, no other command can
# be accepted" (POWER ON/OFF, including cooling time) but no explicit safety interlock list,
# confirmation procedure, or power-on sequencing requirement is documented.
```

## Notes
- Command frame format: leading byte 00h-03h (request prefix) or 20h-23h (response prefix), command byte, ID1 (Control ID), ID2 (Model code), LEN, DATA bytes, CKS.
- Checksum (CKS) = low-order 8 bits of the sum of all preceding bytes (including prefix, command, ID1, ID2, LEN, and all DATA bytes).
- ID1 (Control ID) is the projector's configured control ID — value not stated in source.
- ID2 (Model code) is model-specific — value for LD Fe092 U not stated in source.
- Serial cable is a cross (null-modal) cable wired to PC CONTROL D-SUB 9P. Pin 2 RxD, Pin 3 TxD, Pin 5 GND, Pin 7 RTS→CTS, Pin 8 CTS←RTS.
- LAN: TCP port 7142 for both send and receive.
- Power On/Off commands reject all other commands while power transition (including cooling) is in progress.
- Lamp/filter usage times update at 1-minute intervals though stored in 1-second units.
- Lens control: after sending 7Fh (+) or 81h (-) in DATA02, send 00h to stop. Same command can be issued mid-drive without an explicit stop.
- 050 REMOTE KEY CODE: source lists 25 key codes (POWER ON, POWER OFF, AUTO, MENU, UP/DOWN/LEFT/RIGHT, ENTER, EXIT, HELP, MAGNIFY UP/DOWN, MUTE, PICTURE, COMPUTER1/2, VIDEO1, S-VIDEO1, VOLUME UP/DOWN, FREEZE, ASPECT, SOURCE, LAMP MODE/ECO). All share DATA02=00h; this spec represents them as one parameterized action.
- Many DATA fields reference an "Appendix — Supplementary Information by Command" not included in the refined source; values for input terminal, aspect, eco mode, base model type, and sub-input are UNRESOLVED without that appendix.

<!-- UNRESOLVED: control ID (ID1) default value not stated. -->
<!-- UNRESOLVED: model code (ID2) for LD Fe092 U not stated. -->
<!-- UNRESOLVED: serial flow control mode (none/hardware) not explicitly stated — RTS/CTS pins wired. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not in source — input terminal values, aspect values, eco mode values, base model types, sub-input values, key code sub-values. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
````

Self-check pass: no voltage/current/power invented, port 7142 + baud list verbatim from source, `status: draft` + `declared_confidence: low` set, all 53 commands enumerated with verbatim payloads.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:03:52.050Z
last_checked_at: 2026-06-17T20:05:35.021Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:05:35.021Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command bytes; transport (TCP 7142 + RS-232 9600bps) fully supported; source command list exactly equals spec coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model code (ID2) for LD Fe092 U not stated in source; must be read from device or model-specific appendix. Control ID (ID1) default value not stated."
- "source describes no unsolicited notifications / push events. All responses are"
- "source describes no explicit multi-step macro sequences."
- "source notes \"While this command is turning on the power, no other command can"
- "control ID (ID1) default value not stated."
- "model code (ID2) for LD Fe092 U not stated."
- "serial flow control mode (none/hardware) not explicitly stated — RTS/CTS pins wired."
- "Appendix \"Supplementary Information by Command\" not in source — input terminal values, aspect values, eco mode values, base model types, sub-input values, key code sub-values."
- "firmware version compatibility not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
