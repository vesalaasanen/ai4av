---
spec_id: admin/sharp-nec-pnm752
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Pnm752 Control Spec"
manufacturer: Sharp/NEC
model_family: Pnm752
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - Pnm752
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:56:05.758Z
last_checked_at: 2026-06-18T09:10:34.992Z
generated_at: 2026-06-18T09:10:34.992Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model firmware version not stated; exact model-code byte (ID2) per model not enumerated; input-terminal DATA01 value table referenced only in an external Appendix not present in source."
  - "flow control not stated (RTS/CTS pins wired but mode not specified)"
  - "response field encodings (DATA shapes) for several queries summarised; full per-bit semantics in source only."
  - "no unsolicited notification documented in source; all data returned in response to a request."
  - "no multi-step sequences described in source."
  - "no explicit safety/interlock procedure stated in source; populate only from explicit text."
  - "input-terminal DATA01 value table, eco-mode value table, base-model-type values, and PIP sub-input values are referenced to an Appendix not present in the refined source."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:10:34.992Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Pnm752 Control Spec

## Summary
The Sharp/NEC Pnm752 is a projector controllable via RS-232C serial (PC CONTROL D-SUB 9P) and wired/wireless LAN (TCP port 7142). This spec covers the binary command protocol documented in the Projector Control Command Reference Manual (BDT140013 Revision 7.1): power, input switching, mute, picture/volume/aspect/lens adjustment, lens memory, status queries, and system settings. Commands are fixed-length hex frames terminated by a one-byte checksum (low byte of the sum of all preceding bytes).

<!-- UNRESOLVED: model firmware version not stated; exact model-code byte (ID2) per model not enumerated; input-terminal DATA01 value table referenced only in an external Appendix not present in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # switchable per source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated (RTS/CTS pins wired but mode not specified)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: POWER ON / POWER OFF commands present
  - routable       # inferred: INPUT SW CHANGE + audio select commands present
  - queryable      # inferred: many REQUEST/query commands present
  - levelable      # inferred: PICTURE ADJUST, VOLUME ADJUST, LENS CONTROL present
```

## Actions
```yaml
# Protocol note: command frames are [msgtype] [cmd] [ID1] [ID2] [LEN] [DATA...] [CKS].
# ID1/ID2 default to 00h 00h (control ID / model code). CKS = low byte of sum of all
# preceding bytes. Values shown verbatim from source.

# --- Power ---
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
  notes: No other command accepted during power-off incl. cooling time.

# --- Input switching ---
- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal value (e.g. 06h = video port). Full table in Appendix not in source.
  notes: Example from source -> video port: "02h 03h 00h 00h 02h 01h 06h 0Eh".

# --- Mute ---
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: Cleared by input/video-signal switch.

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
  notes: Cleared by input/video-signal switch or volume adjustment.

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
  notes: Cleared by input/video-signal switch.

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

# --- Picture / Volume / Aspect / Other adjust ---
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
  notes: Example set brightness to 10 -> "03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h".

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
  notes: Example set volume to 10 -> "03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h".

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Aspect value (table in Appendix not in source).

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte: 96h (with DATA02 FFh) = LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: integer
      description: "Adjustment target low byte: FFh for LAMP/LIGHT ADJUST"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits)

# --- Remote key code ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: integer
      description: Key code high byte (00h for all listed keys).
  notes: Example AUTO -> "02h 0Fh 00h 00h 02h 05h 00h 18h".

# --- Shutter ---
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

# --- Lens control ---
- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target: 06h=Periphery Focus (others not enumerated in visible source)"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus, 81h=drive minus, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
  notes: After 7Fh/81h, send 00h to stop.

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "FFh=Stop, else target lens axis"
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
  notes: Operates on profile selected via LENS PROFILE SET.

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
      description: "00h=OFF, 01h=ON"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

# --- Freeze ---
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h=Freeze On, 02h=Freeze Off"

# --- Eco mode set ---
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Eco mode value (table in Appendix not in source).
  notes: Sets Light mode or Lamp mode depending on projector.

# --- LAN projector name set ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes).

# --- PIP / Picture by Picture set ---
- id: pip_pbp_set
  label: PIP / Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "MODE: 00h=PIP,01h=PBP. START POSITION: 00h=TOP-LEFT,01h=TOP-RIGHT,02h=BOTTOM-LEFT,03h=BOTTOM-RIGHT. Sub input values in Appendix not in source."

# --- Edge blending set ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=OFF, 01h=ON"

# --- Audio select set ---
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal (table in Appendix not in source).
    - name: DATA02
      type: integer
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"

# --- Queries ---
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: Response DATA01-12 carry bitfield error info (cover, fan, temp, lamp, etc.).

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: Returns projector name, lamp usage time (s), filter usage time (s). Updated at 1-min intervals.

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: Returns filter usage time (s) and filter alarm start time (s); -1 if undefined.

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "01h=Lamp usage time (s), 04h=Lamp remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens target axis.
  notes: Returns upper/lower limits and current value.

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: Returns lens operation status bitfield (lens memory, zoom, focus, lens shift H/V).

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
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: Returns status, upper/lower limits, default, current value, adjustment widths.

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: Returns base model type, sound function, profile/clock/sleep-timer capability.

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: Returns power status, cooling/power-on process status, operation status.

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: Returns signal switch process, signal list number, selection signal type 1/2, content displayed.

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: Returns picture/sound/onscreen/forced-onscreen mute and OSD display state.

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
  notes: "00h=Normal (cover opened), 01h=Cover closed."

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
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

- id: lan_mac_address_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_pbp_request
  label: PIP / Picture by Picture Request
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

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: Returns base model type and model name.

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
  notes: Returns operation status, content displayed, signal types, mute/freeze state.
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: running_status_request DATA06 / basic_information_request DATA01

- id: error_status
  type: bitmask
  description: 12-byte error bitfield (cover, fan, temperature, lamp, FPGA, mirror cover, ballast, iris, interlock, etc.).
  source: error_status_request DATA01-12

- id: mute_state
  type: object
  description: Picture/sound/onscreen/forced-onscreen mute + OSD display flags.
  source: mute_status_request DATA01-05

- id: input_signal_status
  type: object
  description: Signal switch process, signal list number, selection signal type 1/2, content displayed.
  source: input_status_request / basic_information_request

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: information_request DATA83-86 / lamp_information_request_3

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: lamp_information_request_3 (DATA02=04h)

- id: filter_usage_time
  type: integer
  unit: seconds
  source: information_request DATA87-90 / filter_usage_information_request

- id: cover_status
  type: enum
  values: [normal_opened, closed]
  source: cover_status_request

- id: eco_mode
  type: integer
  source: eco_mode_request DATA01

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: edge_blending_mode_request

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: lens_profile_request
# UNRESOLVED: response field encodings (DATA shapes) for several queries summarised; full per-bit semantics in source only.
```

## Variables
```yaml
- id: brightness
  type: integer
  description: Picture brightness; adjustable via picture_adjust (DATA01=00h).
- id: contrast
  type: integer
  description: Picture contrast (DATA01=01h).
- id: color
  type: integer
  description: Picture color (DATA01=02h).
- id: hue
  type: integer
  description: Picture hue (DATA01=03h).
- id: sharpness
  type: integer
  description: Picture sharpness (DATA01=04h).
- id: volume
  type: integer
  description: Sound volume (volume_adjust).
- id: lamp_adjust
  type: integer
  description: Lamp/Light adjust gain (other_adjust, target 96h/FFh).
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification documented in source; all data returned in response to a request.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Notes: POWER ON/OFF block all other commands while in progress (incl. cooling).
# Interlock switch open and cover errors are reported via error_status bitfields (DATA09 Bit1,
# DATA03 Bit5 mirror cover error) but no explicit safe-state interlock procedure is documented.
# UNRESOLVED: no explicit safety/interlock procedure stated in source; populate only from explicit text.
```

## Notes
- Command frame: `[msgtype] [cmd] [ID1] [ID2] [LEN] [DATA...] [CKS]`. ID1 = control ID set on projector; ID2 = model code (varies by model). Default ID1/ID2 00h used in documented examples.
- Checksum CKS = low-order byte of the sum of all preceding bytes.
- Responses use message-type prefix `2xh` (success, same cmd byte) or `Axh` (error, carries ERR1/ERR2). Error codes listed in source section 2.4 (00h/00h unrecognized, 02h/0Dh command rejected due to power off, etc.).
- Lamp/filter usage times are returned in one-second units but updated at one-minute intervals.
- Serial cable is a cross (null-modem) cable; RTS/CTS and TxD/RxD crossed per pin table.
<!-- UNRESOLVED: input-terminal DATA01 value table, eco-mode value table, base-model-type values, and PIP sub-input values are referenced to an Appendix not present in the refined source. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:56:05.758Z
last_checked_at: 2026-06-18T09:10:34.992Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:10:34.992Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model firmware version not stated; exact model-code byte (ID2) per model not enumerated; input-terminal DATA01 value table referenced only in an external Appendix not present in source."
- "flow control not stated (RTS/CTS pins wired but mode not specified)"
- "response field encodings (DATA shapes) for several queries summarised; full per-bit semantics in source only."
- "no unsolicited notification documented in source; all data returned in response to a request."
- "no multi-step sequences described in source."
- "no explicit safety/interlock procedure stated in source; populate only from explicit text."
- "input-terminal DATA01 value table, eco-mode value table, base-model-type values, and PIP sub-input values are referenced to an Appendix not present in the refined source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
