---
spec_id: admin/sharp-nec-ld-a1381f
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld A1381F Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld A1381F"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld A1381F"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:53:00.231Z
last_checked_at: 2026-06-17T19:58:27.343Z
generated_at: 2026-06-17T19:58:27.343Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Input-terminal value tables and several enum appendix values (\"Supplementary Information by Command\") not present in this refined excerpt."
  - "appendix not in source excerpt.\""
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "input-terminal value table (command 018, 319-10) not in source excerpt."
  - "eco-mode value table (commands 097-8, 098-8) not in source excerpt."
  - "aspect value table (command 030-12) not in source excerpt."
  - "PIP/PbP sub-input value table (commands 097-198, 098-198) not in source excerpt."
  - "base-model-type value table (commands 078-1, 305-1) not in source excerpt."
  - "default baud rate, ID2 model code, firmware version compatibility not stated."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:58:27.343Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched literally against source commands with correct hex sequences and parameters; transport fully verified. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld A1381F Control Spec

## Summary
Sharp/NEC Ld A1381F projector control spec covering the binary command protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1). Supports RS-232C serial and wired/wireless LAN (TCP port 7142). Commands use a fixed binary frame with header bytes, optional control ID/model code, variable-length DATA fields, and a trailing checksum byte (low-order 8 bits of the sum of all preceding bytes).

<!-- UNRESOLVED: firmware version compatibility not stated in source. Input-terminal value tables and several enum appendix values ("Supplementary Information by Command") not present in this refined excerpt. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists selectable: 115200/38400/19200/9600/4800 bps - default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source states full-duplex; RTS/CTS wired per pin table but no sw flow-control value stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable    (POWER ON / POWER OFF commands present)
# - queryable    (many status request commands returning values)
# - levelable    (PICTURE ADJUST, VOLUME ADJUST, LAMP ADJUST)
# - routable     (INPUT SW CHANGE selects input terminal)
traits:
  - powerable
  - queryable
  - levelable
  - routable
```

## Actions
```yaml
# All payloads verbatim from source. Hex bytes space-separated as in source.
# <ID1> = control ID, <ID2> = model code, <CKS> = checksum (computed: low byte of sum of preceding bytes).
# Reference response/error frames documented in Feedbacks section.

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
  notes: "While turning on, no other command accepted."

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "While turning off (incl. cooling time), no other command accepted."

- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal byte (e.g. 06h = video port). Full value list in appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in source excerpt."
  notes: "Example from source: 02h 03h 00h 00h 02h 01h 06h 0Eh (switch to video port). Response DATA01 = FFh means ended with error (no signal switch)."

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Turned off by input terminal switch or video signal switch."

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
  notes: "Turned off by input terminal switch, video signal switch, or volume adjustment."

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
  notes: "Turned off by input terminal switch or video signal switch."

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
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Source examples: brightness=10 -> 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h; brightness=-10 -> 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch."

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
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Source example: volume=10 -> 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value. Full list in appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in source excerpt."

- id: other_adjust_lamp_light
  label: Other Adjust (Lamp Adjust / Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte. Source row: DATA01=96h, DATA02=FFh for LAMP ADJUST / LIGHT ADJUST."
    - name: DATA02
      type: integer
      description: "Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)."
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at 1-minute intervals."

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds. -1 if undefined."

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
  notes: "Eco-mode values reflect eco mode. Negative remaining-life % returned if replacement deadline exceeded."

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "Returns kilograms (DATA02-05, max 99999 kg) and milligrams (DATA06-09, max 999999 mg)."

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type)."
    - name: DATA02
      type: integer
      description: "Key code high byte (WORD type)."
  notes: "Key code list (DATA01/DATA02/Name): 02h/00h POWER ON, 03h/00h POWER OFF, 05h/00h AUTO, 06h/00h MENU, 07h/00h UP, 08h/00h DOWN, 09h/00h RIGHT, 0Ah/00h LEFT, 0Bh/00h ENTER, 0Ch/00h EXIT, 0Dh/00h HELP, 0Fh/00h MAGNIFY UP, 10h/00h MAGNIFY DOWN, 13h/00h MUTE, 29h/00h PICTURE, 4Bh/00h COMPUTER1, 4Ch/00h COMPUTER2, 4Fh/00h VIDEO1, 51h/00h S-VIDEO1, 84h/00h VOLUME UP, 85h/00h VOLUME DOWN, 8Ah/00h FREEZE, A3h/00h ASPECT, D7h/00h SOURCE, EEh/00h LAMP MODE/ECO. Example AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h."

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
      description: "Lens target. Source row: 06h=Periphery Focus."
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus (continuous), 81h=drive minus (continuous), FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s."
  notes: "Send 00h to stop a continuous (7Fh/81h) drive. Same command can be reissued during drive without stop."

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (same values as lens_control)."
  notes: "Returns upper/lower adjustment range and current value (DATA02-07)."

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target. FFh=Stop (mode/value ignored)."
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

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
  notes: "Operates on profile selected by LENS PROFILE SET (053-10)."

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
  notes: "Returns DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V). 0=Stop, 1=During operation."

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
  notes: "Returns profile number (00h=Profile 1, 01h=Profile 2)."

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST / LIGHT ADJUST"
  notes: "Returns DATA01 status (00h display-not-possible, 01h adjust-not-possible, 02h adjustable, FFh not-exist) plus range/default/current/wide/narrow widths."

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/clock function (DATA05)."

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status (DATA03), cooling process (DATA04), power on/off process (DATA05), operation status (DATA06)."

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number (value = practical-1), selection signal type 1/2, signal list type, test pattern display, content displayed."

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture/sound/onscreen/forced-onscreen mute and onscreen display flags."

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
  notes: "Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed."

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
      description: "Information type: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns 'Light mode' or 'Lamp mode' value depending on projector."

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
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
      description: "Eco mode value. Full list in appendix - UNRESOLVED: appendix not in source excerpt."

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01..DATA16} 00h {CKS}"
  params:
    - name: DATA01_16
      type: string
      description: "Projector name, up to 16 bytes (NUL-terminated)."

- id: pip_picture_by_picture_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value. MODE: 00h=PIP, 01h=PICTURE BY PICTURE. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT."

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
  notes: "Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11)."

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
  notes: "Returns operation status, content displayed, signal type, display signal type, video/sound/onscreen mute, freeze status."

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal. Full list in appendix - UNRESOLVED: appendix not in source excerpt."
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Reference response frames per command class. Header byte encodes command class:
#   20h/21h/22h/23h = success response (matches command group 00h/01h/02h/03h)
#   A0h/A1h/A2h/A3h = error response, with <ERR1> <ERR2> <CKS>

- id: success_response
  type: frame
  description: "Success response. Format: {20h|21h|22h|23h} {CMD} <ID1> <ID2> {LEN} [DATA...] <CKS>. LEN=00h when no data returned."

- id: error_response
  type: frame
  description: "Error response. Format: {A0h|A1h|A2h|A3h} {CMD} <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>."

- id: error_codes
  type: enum_table
  description: "ERR1/ERR2 error code pairs (verbatim from source)."
  values:
    - "00h/00h: command cannot be recognized"
    - "00h/01h: command not supported by model"
    - "01h/00h: specified value invalid"
    - "01h/01h: specified input terminal invalid"
    - "01h/02h: specified language invalid"
    - "02h/00h: memory allocation error"
    - "02h/02h: memory in use"
    - "02h/03h: specified value cannot be set"
    - "02h/04h: forced onscreen mute on"
    - "02h/06h: viewer error"
    - "02h/07h: no signal"
    - "02h/08h: test pattern or filter displayed"
    - "02h/09h: no PC card inserted"
    - "02h/0Ah: memory operation error"
    - "02h/0Ch: entry list displayed"
    - "02h/0Dh: command cannot be accepted (power off)"
    - "02h/0Eh: command execution failed"
    - "02h/0Fh: no authority for operation"
    - "03h/00h: specified gain number incorrect"
    - "03h/01h: specified gain invalid"
    - "03h/02h: adjustment failed"
```

## Variables
```yaml
# Picture/volume/lamp levels are set via parameterized Actions (030-1, 030-2, 030-15),
# not standalone variables. Current values obtainable via GAIN PARAMETER REQUEST 3.
```

## Events
```yaml
# Source describes no unsolicited notifications. All responses are command-acknowledgement only.
```

## Macros
```yaml
# Source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements beyond the note that POWER ON / POWER OFF block
# other commands while in progress.
```

## Notes
- Checksum rule (verbatim): sum all preceding bytes, take low-order 8 bits. Example from source: `20h + 81h + 01h + 60h + 01h + 00h = 103h` → checksum `03h`.
- Command frame notation: `{head} {cmd} <ID1> <ID2> {LEN} {DATA...} <CKS>` where `head` 00h/01h/02h/03h = command class, and the same byte prefixed with `A` (A0h/A1h/A2h/A3h) denotes the matching error response.
- ID2 (model code) varies by model — value not stated for Ld A1381F in this excerpt.
- Baud rate is selectable across 4800/9600/19200/38400/115200 bps; default not stated.
- RS-232 pinout: D-SUB 9P, pins 2/3 = RxD/TxD, pin 5 = GND, pins 7/8 = RTS/CTS (crossed).
- LAN: wired RJ-45 (10/100 Mbps auto) and optional wireless LAN unit; both use TCP port 7142.
- Several commands reference an appendix "Supplementary Information by Command" for full input-terminal and eco-mode value tables; that appendix is not present in this refined excerpt and is marked UNRESOLVED where relevant.

<!-- UNRESOLVED: input-terminal value table (command 018, 319-10) not in source excerpt. -->
<!-- UNRESOLVED: eco-mode value table (commands 097-8, 098-8) not in source excerpt. -->
<!-- UNRESOLVED: aspect value table (command 030-12) not in source excerpt. -->
<!-- UNRESOLVED: PIP/PbP sub-input value table (commands 097-198, 098-198) not in source excerpt. -->
<!-- UNRESOLVED: base-model-type value table (commands 078-1, 305-1) not in source excerpt. -->
<!-- UNRESOLVED: default baud rate, ID2 model code, firmware version compatibility not stated. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:53:00.231Z
last_checked_at: 2026-06-17T19:58:27.343Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:58:27.343Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched literally against source commands with correct hex sequences and parameters; transport fully verified. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Input-terminal value tables and several enum appendix values (\"Supplementary Information by Command\") not present in this refined excerpt."
- "appendix not in source excerpt.\""
- "source contains no explicit safety warnings, interlock procedures, or"
- "input-terminal value table (command 018, 319-10) not in source excerpt."
- "eco-mode value table (commands 097-8, 098-8) not in source excerpt."
- "aspect value table (command 030-12) not in source excerpt."
- "PIP/PbP sub-input value table (commands 097-198, 098-198) not in source excerpt."
- "base-model-type value table (commands 078-1, 305-1) not in source excerpt."
- "default baud rate, ID2 model code, firmware version compatibility not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
