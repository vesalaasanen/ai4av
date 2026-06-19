---
spec_id: admin/sharpnec-xp-m421w-w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Xp M421W W Control Spec"
manufacturer: Sharp/NEC
model_family: "Xp M421W W"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Xp M421W W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:19:27.139Z
last_checked_at: 2026-06-19T07:51:17.847Z
generated_at: 2026-06-19T07:51:17.847Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "manual is generic across many Sharp/NEC projectors; model-specific command availability (\"Supplementary Information by Command\" appendix) not present in source. Firmware version compatibility not stated. Input terminal value table, eco-mode value table, aspect value table, sub-input value tables referenced but not included."
  - "no separate continuous-variable surface beyond Actions."
  - "none expected."
  - "no explicit confirmation-required list stated in source."
  - "ID1 (control ID) and ID2 (model code) values for this projector not stated in source."
  - "default baud rate not stated (9600 placeholder above)."
  - "model-specific command availability table (Appendix) not in source."
  - "input terminal value table, eco mode value table, aspect value table, sub-input value table, base model type table not in source."
  - "firmware version compatibility not stated."
  - "voltage/current/power specs not in this manual."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:51:17.847Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim to source command opcodes; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Xp M421W W Control Spec

## Summary
Sharp/NEC Xp M421W W projector control spec. Covers RS-232C serial and wired/wireless LAN (TCP) control per Projector Control Command Reference Manual (BDT140013 Rev 7.1). Binary frame protocol with hex opcodes, checksum bytes, and ID/model bytes.

<!-- UNRESOLVED: manual is generic across many Sharp/NEC projectors; model-specific command availability ("Supplementary Information by Command" appendix) not present in source. Firmware version compatibility not stated. Input terminal value table, eco-mode value table, aspect value table, sub-input value tables referenced but not included. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # supported: 4800/9600/19200/38400/115200; default not stated in source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source states "Full duplex" communication mode; specific flow control not named
addressing:
  port: 7142  # TCP port stated for LAN command send/receive
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON / POWER OFF commands
  - queryable       # inferred: many REQUEST commands return state
  - levelable       # inferred: PICTURE ADJUST, VOLUME ADJUST
  - routable        # inferred: INPUT SW CHANGE
```

## Actions
```yaml
actions:
  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns DATA01-DATA12 bitfield error info (cover, fan, temp, lamp, etc.)"

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
        type: byte
        description: "Input terminal value (e.g. 06h=video). See Appendix 'Supplementary Information by Command'."
    notes: "Response FFh = ended with error (no signal switch)."

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
        type: byte
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: data02
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data03
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: data04
        type: byte
        description: "Adjustment value (high-order 8 bits)"
    notes: "Example brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
    params:
      - name: data01
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data02
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: data03
        type: byte
        description: "Adjustment value (high-order 8 bits)"
    notes: "Example volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
    params:
      - name: data01
        type: byte
        description: "Aspect value. See Appendix 'Supplementary Information by Command'."

  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
    params:
      - name: data01
        type: byte
        description: "Adjustment target (96h=LAMP ADJUST / LIGHT ADJUST). DATA02=FFh per source template."
      - name: data02
        type: byte
        description: "FFh (per source template)."
      - name: data03
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data04
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: data05
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns DATA01-DATA98: projector name, lamp usage time (sec), filter usage time (sec)."

  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns DATA01-04 filter usage time (sec), DATA05-08 filter alarm start time (sec). '-1' if undefined."

  - id: lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: byte
        description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: data02
        type: byte
        description: "Content: 01h=lamp usage time (sec), 04h=lamp remaining life (%)"
    notes: "Remaining life may be negative if replacement deadline exceeded. Updated at 1-min intervals."

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    notes: "Returns DATA02-05 (kg, max 99999), DATA06-09 (mg, max 999999)."

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: byte
        description: "Key code low byte (see key code list)"
      - name: data02
        type: byte
        description: "Key code high byte (typically 00h)"
    notes: "Key codes: 02h/00h=POWER ON, 03h/00h=POWER OFF, 05h/00h=AUTO, 06h/00h=MENU, 07h/00h=UP, 08h/00h=DOWN, 09h/00h=RIGHT, 0Ah/00h=LEFT, 0Bh/00h=ENTER, 0Ch/00h=EXIT, 0Dh/00h=HELP, 0Fh/00h=MAGNIFY UP, 10h/00h=MAGNIFY DOWN, 13h/00h=MUTE, 29h/00h=PICTURE, 4Bh/00h=COMPUTER1, 4Ch/00h=COMPUTER2, 4Fh/00h=VIDEO1, 51h/00h=S-VIDEO1, 84h/00h=VOLUME UP, 85h/00h=VOLUME DOWN, 8Ah/00h=FREEZE, A3h/00h=ASPECT, D7h/00h=SOURCE, EEh/00h=LAMP MODE/ECO."

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
        type: byte
        description: "Target (06h=Periphery Focus per source row)"
      - name: data02
        type: byte
        description: "00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus, 81h=drive minus, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
    notes: "Send 00h after 7Fh/81h to stop. Lens can be re-driven without stop during motion."

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    params:
      - name: data01
        type: byte
        description: "Target (matches Lens Control DATA01)"
    notes: "Returns upper/lower/current adjustment bounds."

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: byte
        description: "Target (FFh=Stop - when Stop, mode/value ignored)"
      - name: data02
        type: byte
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: data03
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: data04
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Operates on profile selected by LENS PROFILE SET."

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: data02
        type: byte
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V) (0=Stop, 1=During operation)."

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns DATA01 profile number (00h=Profile 1, 01h=Profile 2)."

  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
    params:
      - name: data01
        type: byte
        description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    notes: "Returns status, upper/lower/default/current values, wide/narrow adjustment widths."

  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns DATA01-03 base model type, DATA04 sound function, DATA05 profile/clock/sleep timer function."

  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns DATA03 power status, DATA04 cooling process, DATA05 power on/off process, DATA06 operation status."

  - id: input_status_request
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number, selection signal type, content displayed."

  - id: mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display."

  - id: model_name_request
    label: Model Name Request
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Returns DATA01-32 model name string."

  - id: cover_status_request
    label: Cover Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed."

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "01h=freeze on, 02h=freeze off"

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
    params:
      - name: data01
        type: byte
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    notes: "Returns label/information string (NUL-terminated)."

  - id: eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns 'Light mode' or 'Lamp mode' value depending on projector. See Appendix."

  - id: lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns DATA01-17 projector name string."

  - id: lan_mac_address_status_request_2
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns DATA01-06 MAC address."

  - id: pip_picture_by_picture_request
    label: PIP/Picture by Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Returns DATA01: 00h=OFF, 01h=ON."

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "Eco mode value. See Appendix 'Supplementary Information by Command'."
    notes: "Sets 'Light mode' or 'Lamp mode' depending on projector."

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01} {data02} {data03} {data04} {data05} {data06} {data07} {data08} {data09} {data10} {data11} {data12} {data13} {data14} {data15} {data16} 00h {cks}"
    params:
      - name: data01
        type: byte
        description: "Projector name byte 1 (up to 16 bytes total DATA01-16)"
    notes: "Sets projector name (up to 16 bytes)."

  - id: pip_picture_by_picture_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: data02
        type: byte
        description: "Setting value (mode/position/sub-input per DATA01). See Appendix."

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h=OFF, 01h=ON"

  - id: base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type and model name string."

  - id: serial_number_request
    label: Serial Number Request
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns DATA01-16 serial number string."

  - id: basic_information_request
    label: Basic Information Request
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, signal types, mute states, freeze status."

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
    params:
      - name: data01
        type: byte
        description: "Input terminal. See Appendix 'Supplementary Information by Command'."
      - name: data02
        type: byte
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Responses are framed binary replies prefixed by A0h/A1h/A2h/A3h with ID1, ID2,
# ERR1, ERR2, CKS. All commands return success (2xh echo) or error frame
# (Axh ... ERR1 ERR2 CKS). Error code table:
#   00h/00h=command not recognized, 00h/01h=not supported by model,
#   01h/00h=invalid value, 01h/01h=invalid input terminal, 01h/02h=invalid language,
#   02h/00h=memory allocation error, 02h/02h=memory in use, 02h/03h=value cannot be set,
#   02h/04h=forced onscreen mute on, 02h/06h=viewer error, 02h/07h=no signal,
#   02h/08h=test pattern/filter displayed, 02h/09h=no PC card inserted,
#   02h/0Ah=memory operation error, 02h/0Ch=entry list displayed,
#   02h/0Dh=command not accepted (power off), 02h/0Eh=execution failed,
#   02h/0Fh=no authority, 03h/00h=incorrect gain number, 03h/01h=invalid gain,
#   03h/02h=adjustment failed.
feedbacks:
  - id: command_result
    type: frame
    description: "Success or error response frame for any command."
  - id: error_status
    type: bitfield
    description: "12-byte error status (cover, fan, temp, lamp, mirror cover, interlock, etc.)."
  - id: running_status
    type: composite
    description: "Power status, cooling process, power on/off process, operation status."
  - id: input_status
    type: composite
    description: "Signal switch process, signal list, selection signal type, content displayed."
  - id: mute_status
    type: composite
    description: "Picture/sound/onscreen mute + forced onscreen mute + OSD display state."
```

## Variables
```yaml
# Settable parameters that are not discrete actions. The source documents
# parameter-set commands individually; those appear as Actions above.
# UNRESOLVED: no separate continuous-variable surface beyond Actions.
```

## Events
```yaml
# Source describes no unsolicited notifications. All responses are solicited
# replies to commands.
# UNRESOLVED: none expected.
```

## Macros
```yaml
# Source documents no multi-step command sequences.
# UNRESOLVED: none expected.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON: no other command accepted while power-on in progress."
  - "POWER OFF: no other command accepted during power-off (incl. cooling time)."
  - "Cover/interlock error bits reported in ERROR STATUS REQUEST (DATA09 Bit1: interlock switch open)."
# UNRESOLVED: no explicit confirmation-required list stated in source.
```

## Notes
- Binary frame protocol. Format: `{hdr} {cmd} <ID1> <ID2> {LEN} <DATA...> <CKS>`. Header byte distinguishes direction/type (00h/01h/02h/03h = commands by category; 20h/21h/22h/23h = success responses; A0h/A1h/A2h/A3h = error responses).
- ID1 = control ID set on projector; ID2 = model code (varies by model). Both must be supplied by the controller — values not in source.
- Checksum (CKS): sum of all preceding bytes, low-order one byte. Example: `20h+81h+01h+60h+01h+00h = 103h → CKS=03h`.
- Serial cable: cross cable, D-SUB 9P, pin 2 RxD / 3 TxD / 5 GND / 7 RTS / 8 CTS.
- LAN: wired RJ-45 (10/100 auto) or optional wireless LAN unit. TCP port 7142.
- Baud rates 4800/9600/19200/38400/115200 supported; default not stated in source — 9600 used as placeholder above, treat as UNRESOLVED for default.
- Manual is shared across many Sharp/NEC projector models. Per-command model availability is governed by an "Appendix: Supplementary Information by Command" not present in this source — value tables for input terminals, eco mode, aspect, sub-inputs, and base model types are UNRESOLVED.
- Lamp/filter usage times returned in seconds, updated at 1-minute intervals.

<!-- UNRESOLVED: ID1 (control ID) and ID2 (model code) values for this projector not stated in source. -->
<!-- UNRESOLVED: default baud rate not stated (9600 placeholder above). -->
<!-- UNRESOLVED: model-specific command availability table (Appendix) not in source. -->
<!-- UNRESOLVED: input terminal value table, eco mode value table, aspect value table, sub-input value table, base model type table not in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: voltage/current/power specs not in this manual. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:19:27.139Z
last_checked_at: 2026-06-19T07:51:17.847Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:51:17.847Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim to source command opcodes; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "manual is generic across many Sharp/NEC projectors; model-specific command availability (\"Supplementary Information by Command\" appendix) not present in source. Firmware version compatibility not stated. Input terminal value table, eco-mode value table, aspect value table, sub-input value tables referenced but not included."
- "no separate continuous-variable surface beyond Actions."
- "none expected."
- "no explicit confirmation-required list stated in source."
- "ID1 (control ID) and ID2 (model code) values for this projector not stated in source."
- "default baud rate not stated (9600 placeholder above)."
- "model-specific command availability table (Appendix) not in source."
- "input terminal value table, eco mode value table, aspect value table, sub-input value table, base model type table not in source."
- "firmware version compatibility not stated."
- "voltage/current/power specs not in this manual."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
