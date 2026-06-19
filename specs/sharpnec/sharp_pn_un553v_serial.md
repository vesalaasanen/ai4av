---
spec_id: admin/sharp-nec-pn-un553v
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC PN-UN553V Control Spec"
manufacturer: Sharp/NEC
model_family: PN-UN553V
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - PN-UN553V
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:34:24.866Z
last_checked_at: 2026-06-18T09:09:30.221Z
generated_at: 2026-06-18T09:09:30.221Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The source document is a generic Sharp/NEC projector command reference (BDT140013 Rev 7.1) and does not name the PN-UN553V model explicitly; the model name above is supplied from the entity metadata. Confirm this manual is the correct protocol reference for the PN-UN553V display."
  - "Input terminal value codes, aspect values, eco-mode values, and sub-input values are referenced to an \"Appendix / Supplementary Information by Command\" that is NOT included in the refined source excerpt."
  - "Outgoing command frames in this manual omit ID1/ID2 (control ID / model code); the full framing/insertion of ID1/ID2 into commands is not shown. Only response frames carry ID1/ID2."
  - "flow control not stated in source (communication mode = full duplex is stated, but is not flow control)"
  - "source does not document unsolicited notifications. All responses are"
  - "source documents no explicit multi-step macro sequences."
  - "no explicit safety/interlock/power-sequencing procedure stated in source."
  - "Appendix \"Supplementary Information by Command\" (input terminal codes, aspect values, eco-mode values, base-model-type codes, sub-input codes) is not present in the refined source excerpt."
  - "firmware version compatibility not stated."
  - "whether PN-UN553V (a large-format display) actually implements all projector commands in BDT140013 Rev 7.1 is unconfirmed against a real device."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:09:30.221Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC PN-UN553V Control Spec

## Summary
Binary control spec for the Sharp/NEC PN-UN553V, derived from the Sharp/NEC "Projector Control Command Reference Manual" (BDT140013 Rev 7.1). The device is controllable over RS-232C serial and over wired/wireless LAN (TCP). Commands are fixed-length hex frames with a trailing additive checksum (low-order byte of the sum of all preceding bytes). Covers power, input switching, mute groups, lens/shutter, picture/volume/aspect adjust, eco/PIP/edge-blend settings, and a large set of status queries.

<!-- UNRESOLVED: The source document is a generic Sharp/NEC projector command reference (BDT140013 Rev 7.1) and does not name the PN-UN553V model explicitly; the model name above is supplied from the entity metadata. Confirm this manual is the correct protocol reference for the PN-UN553V display. -->
<!-- UNRESOLVED: Input terminal value codes, aspect values, eco-mode values, and sub-input values are referenced to an "Appendix / Supplementary Information by Command" that is NOT included in the refined source excerpt. -->
<!-- UNRESOLVED: Outgoing command frames in this manual omit ID1/ID2 (control ID / model code); the full framing/insertion of ID1/ID2 into commands is not shown. Only response frames carry ID1/ID2. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source lists selectable rates: 4800 / 9600 / 19200 / 38400 / 115200 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (communication mode = full duplex is stated, but is not flow control)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred from POWER ON / POWER OFF commands
- levelable    # inferred from VOLUME ADJUST / PICTURE ADJUST / LAMP ADJUST commands
- queryable    # inferred from numerous *REQUEST query commands
- routable     # inferred from INPUT SW CHANGE / AUDIO SELECT SET commands
```

## Actions
```yaml
# All payloads are hex bytes, verbatim from BDT140013 Rev 7.1.
# Framing: outgoing command frame = [cmdType] [cmdCode] 00h 00h [LEN] [DATA...] [CKS]
#   CKS = low-order byte of the sum of all preceding bytes (additive, mod 256).
# Response success frames begin 2Xh; error frames begin AXh with <ERR1><ERR2>.
# ID1/ID2 (control ID / model code) are returned in responses only.
# Where a command is parameterized, <DATA..> placeholders are shown verbatim from source.

# ---- Power ----
- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: While powering on, no other command is accepted.

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: During power-off (including cooling time), no other command is accepted.

# ---- Input switching ----
- id: input_switch_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Input terminal code (e.g. 06h = video port). Full code list in Appendix "Supplementary Information by Command".
  notes: Response 22h 03h <ID1> <ID2> 01h <DATA01> <CKS>; FFh = ended with error (no signal switch).

# ---- Mute group ----
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: Cleared by input/video signal switch.

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
  notes: Cleared by input/video signal switch or volume adjustment.

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
  notes: Cleared by input/video signal switch.

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

# ---- Picture / Volume / Aspect / Other adjust ----
- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
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
  notes: Example set brightness=10 -> "03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h".

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
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
  notes: Example set volume=10 -> "03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h".

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Aspect value; full code list in Appendix "Supplementary Information by Command".
  notes: UNRESOLVED aspect value codes (referenced appendix not in source excerpt).

- id: other_adjust_lamp_light
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 96h=LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: integer
      description: Sub-target; source shows 96h/FFh grouping for LAMP/LIGHT ADJUST.
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits)

# ---- Remote key code ----
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Key code low byte (see key code list, e.g. 05h=AUTO).
    - name: DATA02
      type: integer
      description: Key code high byte (00h for all listed keys).
  notes: Full key code list in source (POWER ON/OFF, AUTO, MENU, UP/DOWN/LEFT/RIGHT, ENTER, EXIT, HELP, MAGNIFY UP/DOWN, MUTE, PICTURE, COMPUTER1/2, VIDEO1, S-VIDEO1, VOLUME UP/DOWN, FREEZE, ASPECT, SOURCE, LAMP MODE/ECO). Response FFh = error.

# ---- Shutter ----
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

# ---- Lens control ----
- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (e.g. 06h=Periphery Focus)"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop; 01h=+1s; 02h=+0.5s; 03h=+0.25s; 7Fh=+continuous; 81h=-continuous; FDh=-0.25s; FEh=-0.5s; FFh=-1s"
  notes: After 7Fh/81h, send 00h to stop. Same command can be reissued while driving.

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target (FFh=Stop)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)
  notes: If DATA01=FFh (Stop), mode/value are not referenced.

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: Controls profile number selected via LENS PROFILE SET.

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

# ---- Freeze ----
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

# ---- Settings ----
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Eco mode value; full code list in Appendix (UNRESOLVED).
  notes: Sets "Light mode" or "Lamp mode" depending on model.

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
  params:
    - name: DATA01-16
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated).

- id: pip_pbp_set
  label: PIP / Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Value (MODE: 00h=PIP,01h=PbP; START POSITION: 00h=TL,01h=TR,02h=BL,03h=BR; sub-input codes in Appendix)."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Input terminal; code list in Appendix (UNRESOLVED).
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"

# ---- Queries (kind: query) ----
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: Returns DATA01-12 bitmap of error status (cover, fan, temp, lamp, etc.).

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: Returns projector name (DATA01-49), lamp usage seconds (DATA83-86), filter usage seconds (DATA87-90).

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08), seconds. -1 if undefined.

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=usage time (s), 04h=remaining life (%)"
  notes: Reflects eco mode. Negative remaining-life % if replacement deadline exceeded.

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: Returns kg (DATA02-05) and mg (DATA06-09).

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Lens target (e.g. 06h=Periphery Focus).
  notes: Returns upper/lower limit and current value (16-bit).

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: Returns setting value 00h=OFF / 01h=ON.

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: Returns DATA01 bitmap (lens memory, zoom, focus, lens shift H/V in-operation flags).

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: Returns selected reference lens memory profile (00h=Profile 1, 01h=Profile 2).

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS,01h=CONTRAST,02h=COLOR,03h=HUE,04h=SHARPNESS,05h=VOLUME,96h=LAMP/LIGHT ADJUST"
  notes: Returns adjustability status + upper/lower/default/current/wide/narrow ranges.

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: Returns base model type, sound function, profile/clock/sleep-timer function.

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: Returns power status, cooling process, power on/off process, operation status.

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: Returns signal switch process, signal list number, selection signal types, test pattern, content displayed.

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: Returns picture/sound/onscreen/forced-onscreen mute + OSD display flags.

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: Returns model name string (DATA01-32, NUL-terminated).

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: Returns 00h=Normal (cover opened), 01h=Cover closed.

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=horizontal sync frequency, 04h=vertical sync frequency"
  notes: Returns label + information string (NUL-terminated).

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: Returns eco/light/lamp mode value (codes in Appendix, UNRESOLVED).

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: Returns projector name (DATA01-17, NUL-terminated).

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: Returns 6-byte MAC address.

- id: pip_pbp_request
  label: PIP / Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE,01h=START POSITION,02h=SUB INPUT/SUB INPUT 1,09h=SUB INPUT 2,0Ah=SUB INPUT 3"
  notes: Returns current mode/start-position/sub-input value.

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: Returns 00h=OFF, 01h=ON.

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: Returns base model type + model name string (codes in Appendix, UNRESOLVED).

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: Returns serial number string (DATA01-16, NUL-terminated).

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status.
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: running_status_request DATA03 / DATA06

- id: error_status
  type: bitmap
  description: DATA01-09 bitmap from error_status_request (cover/fan/temperature/lamp/formatter/FPGA/mirror-cover/interlock/system errors).

- id: mute_state
  type: composite
  description: picture/sound/onscreen/forced-onscreen mute flags from mute_status_request.

- id: cover_state
  type: enum
  values: [normal_opened, cover_closed]

- id: lens_operation
  type: bitmap
  description: lens memory / zoom / focus / lens-shift H/V in-operation flags from lens_information_request.
```

## Variables
```yaml
- id: picture_brightness
  set_via: picture_adjust (DATA01=00h)
  query_via: gain_parameter_request_3 (DATA01=00h)

- id: picture_contrast
  set_via: picture_adjust (DATA01=01h)
  query_via: gain_parameter_request_3 (DATA01=01h)

- id: picture_color
  set_via: picture_adjust (DATA01=02h)
  query_via: gain_parameter_request_3 (DATA01=02h)

- id: picture_hue
  set_via: picture_adjust (DATA01=03h)
  query_via: gain_parameter_request_3 (DATA01=03h)

- id: picture_sharpness
  set_via: picture_adjust (DATA01=04h)
  query_via: gain_parameter_request_3 (DATA01=04h)

- id: volume
  set_via: volume_adjust
  query_via: gain_parameter_request_3 (DATA01=05h)

- id: lamp_light_adjust
  set_via: other_adjust_lamp_light (DATA01=96h)
  query_via: gain_parameter_request_3 (DATA01=96h)

- id: lamp_usage_seconds
  query_via: information_request / lamp_information_request_3
  read_only: true

- id: filter_usage_seconds
  query_via: filter_usage_information_request
  read_only: true

- id: eco_mode
  set_via: eco_mode_set
  query_via: eco_mode_request
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications. All responses are
# solicited (command -> response). Populate if device pushes async status.
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes (not safety interlocks, but operational constraints):
# - POWER ON / POWER OFF accept no other command while the power transition
#   (including cooling time) is in progress.
# - error_status_request DATA09 Bit1 "interlock switch is open" is reported as an
#   error condition (portrait-cover / interlock). No explicit interlock procedure
#   is documented in this excerpt.
# UNRESOLVED: no explicit safety/interlock/power-sequencing procedure stated in source.
```

## Notes
- Command/response framing: outgoing frames begin with a command-type byte (`0Xh`); success responses begin `2Xh` and echo `<ID1> <ID2>` (control ID, model code); error responses begin `AXh` and carry `<ERR1> <ERR2>`. `CKS` = low-order byte of the sum of all preceding bytes.
- Error code table (ERR1/ERR2) is documented in section 2.4 (e.g. 00h/00h = unrecognized command; 02h/0Dh = command rejected because power is off; 02h/0Fh = no authority).
- Serial is RS-232C cross-cable on the PC CONTROL D-SUB 9P port (pinout in source). LAN uses TCP port 7142 over wired (10/100BASE-TX) or optional wireless LAN unit.
- Usage-time values update at one-minute intervals even though they are returned in one-second units.
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input terminal codes, aspect values, eco-mode values, base-model-type codes, sub-input codes) is not present in the refined source excerpt. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: whether PN-UN553V (a large-format display) actually implements all projector commands in BDT140013 Rev 7.1 is unconfirmed against a real device. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:34:24.866Z
last_checked_at: 2026-06-18T09:09:30.221Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:09:30.221Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The source document is a generic Sharp/NEC projector command reference (BDT140013 Rev 7.1) and does not name the PN-UN553V model explicitly; the model name above is supplied from the entity metadata. Confirm this manual is the correct protocol reference for the PN-UN553V display."
- "Input terminal value codes, aspect values, eco-mode values, and sub-input values are referenced to an \"Appendix / Supplementary Information by Command\" that is NOT included in the refined source excerpt."
- "Outgoing command frames in this manual omit ID1/ID2 (control ID / model code); the full framing/insertion of ID1/ID2 into commands is not shown. Only response frames carry ID1/ID2."
- "flow control not stated in source (communication mode = full duplex is stated, but is not flow control)"
- "source does not document unsolicited notifications. All responses are"
- "source documents no explicit multi-step macro sequences."
- "no explicit safety/interlock/power-sequencing procedure stated in source."
- "Appendix \"Supplementary Information by Command\" (input terminal codes, aspect values, eco-mode values, base-model-type codes, sub-input codes) is not present in the refined source excerpt."
- "firmware version compatibility not stated."
- "whether PN-UN553V (a large-format display) actually implements all projector commands in BDT140013 Rev 7.1 is unconfirmed against a real device."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
