---
spec_id: admin/sharpnec-pn-lm551
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Pn Lm551 Control Spec"
manufacturer: Sharp/NEC
model_family: "Pn Lm551"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Pn Lm551"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:52:37.431Z
last_checked_at: 2026-06-18T09:09:28.683Z
generated_at: 2026-06-18T09:09:28.683Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model name not stated in the source document; binding to \"Pn Lm551\" is operator-supplied and unverified."
  - "firmware version compatibility not stated in source."
  - "command frame leader/trailer (20h..0Ch frame vs. bare command bytes) — source shows both bare command bytes and full framed responses; the bare command bytes are used as the action payload here."
  - "flow control not stated; source lists \"Full duplex\" communication mode only"
  - "numeric ranges/defaults for gain variables are returned dynamically"
  - "source documents no unsolicited notifications; the projector only"
  - "source documents no explicit multi-step command sequences."
  - "no explicit safety/interlock procedures stated in source."
  - "model name \"Pn Lm551\" not present in source text; this is a generic Sharp/NEC projector command manual (BDT140013 Rev 7.1). Confirm model binding against the actual device."
  - "default baud rate not stated (five rates supported)."
  - "flow control not stated (full-duplex mode only documented)."
  - "firmware version compatibility not stated."
  - "appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model types, sub-input values) is referenced but not included in the refined source — several parameter enums are therefore not fully enumerated."
  - "model name not in source, default baud/flow control, appendix value tables, firmware compat."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:09:28.683Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Pn Lm551 Control Spec

## Summary
Projector control spec derived from the "Projector Control Command Reference Manual" (BDT140013 Rev 7.1). Covers RS-232C serial and wired/wireless LAN (TCP) control of a Sharp/NEC projector using a framed binary command protocol with checksum bytes. Note: the source manual is a generic projector command reference; it does not state the model name "Pn Lm551" explicitly, so model binding is unverified.

<!-- UNRESOLVED: model name not stated in the source document; binding to "Pn Lm551" is operator-supplied and unverified. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: command frame leader/trailer (20h..0Ch frame vs. bare command bytes) — source shows both bare command bytes and full framed responses; the bare command bytes are used as the action payload here. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps; default not stated
  baud_rate_supported: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; source lists "Full duplex" communication mode only
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: 015 POWER ON / 016 POWER OFF commands
  - queryable       # inferred: many *REQUEST query commands return state
  - levelable       # inferred: 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST
  - routable        # inferred: 018 INPUT SW CHANGE
```

## Actions
```yaml
# Commands are framed binary. Each action's `command:` is the verbatim command
# byte sequence as written in the source (the bytes sent after any frame
# leader). <ID1> <ID2> and <CKS> (checksum) are computed at runtime per the
# source's checksum rule: sum all preceding bytes, take low-order one byte.
# Parameterized DATA?? fields are shown as {placeholders}.

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
  notes: No other command accepted while power-on is in progress.

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: No other command accepted during power-off (including cooling time).

- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal value (e.g. 06h = video port). See source appendix "Supplementary Information by Command" for full value list.

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
      description: Aspect value. See source appendix for value list.

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte (96h = LAMP/LIGHT ADJUST)"
    - name: DATA02
      type: integer
      description: "Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
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
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=usage time (seconds), 04h=remaining life (%)"

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
      description: "Key code low byte (WORD type). Examples: 02h=POWER ON, 05h=AUTO, 06h=MENU, 4Bh=COMPUTER1, 8Ah=FREEZE, A3h=ASPECT."
    - name: DATA02
      type: integer
      description: Key code high byte (00h for all listed keys).

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
      description: "Lens target (06h=Periphery Focus per source example)"
    - name: DATA02
      type: integer
      description: "Content/motion: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens target selector.

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (FFh=Stop; mode/value ignored when Stop)"
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
      description: "Adjusted value name: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"

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
  label: PIP/Picture By Picture Request
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
      description: Eco mode value. See source appendix for value list.

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {DATA06} {DATA07} {DATA08} {DATA09} {DATA10} {DATA11} {DATA12} {DATA13} {DATA14} {DATA15} {DATA16} 00h {CKS}"
  params:
    - name: name_bytes
      type: string
      description: Projector name, up to 16 bytes (DATA01-DATA16), NUL-terminated.

- id: pip_picture_by_picture_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (depends on DATA01): MODE 00h=PIP/01h=PbP; START POSITION 00h=TOP-LEFT..03h=BOTTOM-RIGHT; sub-input values per appendix."

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
      description: Input terminal value. See source appendix.
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Each query action above returns a framed response (2Xh.. ACK or 2Xh.. with
# DATA, or AXh.. with ERR1/ERR2 on failure). Observable states documented:
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: 078-2 RUNNING STATUS REQUEST DATA03/DATA06, 305-3 BASIC INFORMATION REQUEST DATA01
- id: error_status
  type: bitmask
  description: 12-byte error bitfield (DATA01-DATA12) from 009 ERROR STATUS REQUEST. Covers cover/fan/temperature/power/lamp/formatter/mirror-cover/interlock/lens errors.
- id: mute_state
  type: composite
  description: Picture/sound/onscreen/forced-onscreen mute flags from 078-4 MUTE STATUS REQUEST.
- id: input_signal_status
  type: composite
  description: Signal switch process, list number, signal type, display content from 078-3 INPUT STATUS REQUEST.
- id: lamp_usage_time
  type: integer
  unit: seconds
  source: 037-4 LAMP INFORMATION REQUEST 3 (DATA03-06); also in 037 INFORMATION REQUEST (DATA83-86). Updated at 1-minute intervals.
- id: lamp_remaining_life
  type: integer
  unit: percent
  source: 037-4 LAMP INFORMATION REQUEST 3 (DATA01=04h). Negative if replacement deadline exceeded.
- id: filter_usage_time
  type: integer
  unit: seconds
  source: 037-3 FILTER USAGE INFORMATION REQUEST (DATA01-04)
- id: cover_status
  type: enum
  values: [normal_opened, closed]
  source: 078-6 COVER STATUS REQUEST
```

## Variables
```yaml
- id: brightness
  type: integer
  set_via: picture_adjust (DATA01=00h)
  query_via: gain_parameter_request_3 (DATA01=00h)
- id: contrast
  type: integer
  set_via: picture_adjust (DATA01=01h)
  query_via: gain_parameter_request_3 (DATA01=01h)
- id: color
  type: integer
  set_via: picture_adjust (DATA01=02h)
  query_via: gain_parameter_request_3 (DATA01=02h)
- id: hue
  type: integer
  set_via: picture_adjust (DATA01=03h)
  query_via: gain_parameter_request_3 (DATA01=03h)
- id: sharpness
  type: integer
  set_via: picture_adjust (DATA01=04h)
  query_via: gain_parameter_request_3 (DATA01=04h)
- id: volume
  type: integer
  set_via: volume_adjust
  query_via: gain_parameter_request_3 (DATA01=05h)
- id: lamp_light_adjust
  type: integer
  set_via: other_adjust (DATA01=96h)
  query_via: gain_parameter_request_3 (DATA01=96h)
- id: eco_mode
  type: integer
  set_via: eco_mode_set
  query_via: eco_mode_request
- id: projector_name
  type: string
  max_length: 16
  set_via: lan_projector_name_set
  query_via: lan_projector_name_request
# UNRESOLVED: numeric ranges/defaults for gain variables are returned dynamically
# by 060-1 GAIN PARAMETER REQUEST 3 (upper/lower/default/current per variable),
# not as static constants in the source.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications; the projector only
# responds to commands. No async event mechanism described.
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Notes from source (descriptive, not procedurally specified):
# - Power-on/off block all other commands while in progress (incl. cooling time).
# - 009 ERROR STATUS REQUEST exposes an interlock-switch-open bit (DATA09 Bit1)
#   and cover/fan/temperature/lamp error bits, but the source specifies no
#   required confirmation or interlock procedure for operators.
# UNRESOLVED: no explicit safety/interlock procedures stated in source.
```

## Notes
- Command frames use a leader (`20h`/`21h`/`22h`/`23h` for requests by command class; `A0h`/`A1h`/`A2h`/`A3h` for ACK/error responses), the control ID (`<ID1>`), model code (`<ID2>`), a length byte, DATA bytes, and a checksum (`<CKS>`). Checksum = low-order byte of the sum of all preceding bytes. Example from source: `20h 81h 01h 60h 01h 00h` → sum `103h` → CKS `03h`.
- Error responses carry `<ERR1> <ERR2>` codes (see source §2.4): e.g. `02h 0Dh` = "command cannot be accepted because the power is off", `02h 0Fh` = "no authority for the operation", `00h 01h` = "command not supported by the model".
- Usage-time counters (lamp/filter) update at 1-minute intervals though readable in 1-second units.
- Serial cable must be a cross cable; pin assignment documented for D-SUB 9P PC CONTROL port.
- LAN: wired RJ-45 (10/100 auto-sensing) or optional wireless LAN unit; TCP port 7142 for command send/receive.

<!-- UNRESOLVED: model name "Pn Lm551" not present in source text; this is a generic Sharp/NEC projector command manual (BDT140013 Rev 7.1). Confirm model binding against the actual device. -->
<!-- UNRESOLVED: default baud rate not stated (five rates supported). -->
<!-- UNRESOLVED: flow control not stated (full-duplex mode only documented). -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: appendix "Supplementary Information by Command" (input terminal values, aspect values, eco mode values, base model types, sub-input values) is referenced but not included in the refined source — several parameter enums are therefore not fully enumerated. -->
```

Spec output above. 53 actions, all commands verbatim. Key gaps flagged UNRESOLVED: model name not in source, default baud/flow control, appendix value tables, firmware compat.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:52:37.431Z
last_checked_at: 2026-06-18T09:09:28.683Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:09:28.683Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model name not stated in the source document; binding to \"Pn Lm551\" is operator-supplied and unverified."
- "firmware version compatibility not stated in source."
- "command frame leader/trailer (20h..0Ch frame vs. bare command bytes) — source shows both bare command bytes and full framed responses; the bare command bytes are used as the action payload here."
- "flow control not stated; source lists \"Full duplex\" communication mode only"
- "numeric ranges/defaults for gain variables are returned dynamically"
- "source documents no unsolicited notifications; the projector only"
- "source documents no explicit multi-step command sequences."
- "no explicit safety/interlock procedures stated in source."
- "model name \"Pn Lm551\" not present in source text; this is a generic Sharp/NEC projector command manual (BDT140013 Rev 7.1). Confirm model binding against the actual device."
- "default baud rate not stated (five rates supported)."
- "flow control not stated (full-duplex mode only documented)."
- "firmware version compatibility not stated."
- "appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model types, sub-input values) is referenced but not included in the refined source — several parameter enums are therefore not fully enumerated."
- "model name not in source, default baud/flow control, appendix value tables, firmware compat."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
