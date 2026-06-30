---
spec_id: admin/sharp-nec-xp-v731u-w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC XP V731U W Control Spec"
manufacturer: Sharp/NEC
model_family: "XP V731U W"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "XP V731U W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:51:08.920Z
last_checked_at: 2026-06-19T07:51:20.847Z
generated_at: 2026-06-19T07:51:20.847Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the source manual is a generic command reference shared across many NEC projectors; per-model command support (which commands/params are valid for the XP V731U W specifically) is documented only in an \"Appendix: Supplementary Information by Command\" that is not present in this refined source."
  - "flow control not stated in source (RTS/CTS pins present on D-SUB but only \"Full duplex\" stated)"
  - "no asynchronous event mechanism stated in source."
  - "populate if a later source documents macro sequences."
  - "no explicit power-on sequencing procedure or safety interlock"
  - "input-terminal value table (for INPUT SW CHANGE, AUDIO SELECT SET) not in source."
  - "eco-mode value table not in source."
  - "base-model-type values not in source."
  - "PIP/PbP sub-input setting values not in source."
  - "aspect value table not in source."
  - "LENS CONTROL DATA01 target table (only 06h=Periphery Focus shown) not in source."
  - "firmware version compatibility not stated."
  - "flow_control not stated (only \"Full duplex\" stated; RTS/CTS pins present)."
  - "ID2 model code for XP V731U W not stated (defaults to 00h in examples)."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:51:20.847Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match literal hex sequences in source; all transport parameters (port 7142, baud rates, serial settings) verified verbatim. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC XP V731U W Control Spec

## Summary
Control spec for the Sharp/NEC XP V731U W projector, derived from the NEC Projector Control Command Reference Manual (BDT140013 Rev 7.1). The device is controllable over RS-232C serial (PC CONTROL D-SUB 9P) and over wired/wireless LAN using TCP. Commands are binary frames; each frame carries a control ID (ID1), model code (ID2), and a trailing checksum byte (CKS).

<!-- UNRESOLVED: the source manual is a generic command reference shared across many NEC projectors; per-model command support (which commands/params are valid for the XP V731U W specifically) is documented only in an "Appendix: Supplementary Information by Command" that is not present in this refined source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
# Source documents both RS-232C (PC CONTROL port, D-SUB 9P) and LAN (TCP port 7142).
addressing:
  port: 7142
serial:
  baud_rate: [4800, 9600, 19200, 38400, 115200]  # configurable per source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (RTS/CTS pins present on D-SUB but only "Full duplex" stated)
  duplex: full  # Communication mode: Full duplex
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: many status/information request commands present
  - levelable    # inferred: PICTURE ADJUST / VOLUME ADJUST / gain adjustment commands present
  - routable     # inferred: INPUT SW CHANGE command present
  - mutable      # inferred: picture/sound/onscreen mute on/off commands present
```

## Actions
```yaml
# Frame conventions (from source §2.1-2.2):
#   - <ID1> = control ID set on the projector (00h in examples = default)
#   - <ID2> = model code (00h in examples = default; varies by model)
#   - <CKS> = checksum = low-order byte of sum of all preceding bytes
#   - <LEN> = byte length of the DATA part following LEN
# Commands below are copied verbatim from source. Parameterized commands show
# the variable DATA bytes as placeholders; CKS must be recomputed for actual IDs/data.

# --- Power ---
- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted while power-on is in progress."

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off incl. cooling time."

# --- Input selection ---
- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Input terminal selector. Example: 06h = video port. Full value list in Appendix 'Supplementary Information by Command' (not in source)."
  notes: "Response DATA01=FFh means ended with error (no signal switch made)."

# --- Picture mute ---
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

# --- Sound mute ---
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

# --- Onscreen mute ---
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

# --- Adjustments (030 group) ---
- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)"
    - name: DATA02
      type: byte
      description: "Adjustment mode (00h=absolute, 01h=relative)"
    - name: DATA03
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: byte
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example (brightness=10): 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment mode (00h=absolute, 01h=relative)"
    - name: DATA02
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: byte
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example (volume=10): 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Aspect value (see Appendix 'Supplementary Information by Command' - not in source)"

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment target high byte (96h for LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA02
      type: byte
      description: "Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)"
    - name: DATA03
      type: byte
      description: "Adjustment mode (00h=absolute, 01h=relative)"
    - name: DATA04
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: byte
      description: "Adjustment value (high-order 8 bits)"

# --- Remote key code ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Key code low byte (WORD type). Examples: 02h=POWER ON, 05h=AUTO, 06h=MENU, 07h=UP, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 4Bh=COMPUTER1, 4Fh=VIDEO1, 84h=VOLUME UP, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: byte
      description: "Key code high byte (00h for all listed keys)"

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

# --- Lens control (053 group) ---
- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Lens target (e.g. 06h=Periphery Focus; full list not in source)"
    - name: DATA02
      type: byte
      description: "Drive command (00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=drive +, 81h=drive -, FDh=-0.25s, FEh=-0.5s, FFh=-1s)"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Lens target (FFh=Stop)"
    - name: DATA02
      type: byte
      description: "Adjustment mode (00h=absolute, 02h=relative)"
    - name: DATA03
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: byte
      description: "Adjustment value (high-order 8 bits)"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Operation (00h=MOVE, 01h=STORE, 02h=RESET)"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Operation (00h=MOVE, 01h=STORE, 02h=RESET). Acts on profile set by LENS PROFILE SET."

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)"
    - name: DATA02
      type: byte
      description: "Setting value (00h=OFF, 01h=ON)"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Profile number (00h=Profile 1, 01h=Profile 2)"

# --- Freeze ---
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "01h=freeze on, 02h=freeze off"

# --- Eco mode set ---
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Eco mode value (sets 'Light mode' or 'Lamp mode' by model). Value list in Appendix - not in source."

# --- LAN projector name set ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
  params:
    - name: DATA01_16
      type: string
      description: "Projector name, up to 16 bytes (NUL-terminated)"

# --- PIP / Picture by Picture set ---
- id: pip_pbyb_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)"
    - name: DATA02
      type: byte
      description: "Setting value. MODE: 00h=PIP,01h=PBP. START POSITION: 00h=TL,01h=TR,02h=BL,03h=BR. Sub input values in Appendix - not in source."

# --- Edge blending mode set ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Setting value (00h=OFF, 01h=ON)"

# --- Audio select set ---
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Input terminal (see Appendix - not in source)"
    - name: DATA02
      type: byte
      description: "Setting value (00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER)"

# === Queries (kind: query) ===
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Returns DATA01-12 bitmap of error info (cover/fan/temp/lamp/etc.)."

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90)."

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08), seconds; -1 if undefined."

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Lamp (00h=Lamp 1, 01h=Lamp 2 - two-lamp models only)"
    - name: DATA02
      type: byte
      description: "Content (01h=lamp usage time seconds, 04h=lamp remaining life %)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Lens target (same encoding as LENS CONTROL DATA01)"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitmap: lens memory/zoom/focus/lens-shift(H)/(V) operation status."

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
      type: byte
      description: "Adjusted value name (00h=BRIGHTNESS,01h=CONTRAST,02h=COLOR,03h=HUE,04h=SHARPNESS,05h=VOLUME,96h=LAMP/LIGHT ADJUST)"

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/timer function (DATA05)."

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

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture/sound/onscreen/forced-onscreen mute + onscreen display states."

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
  notes: "Returns 00h=normal(cover open), 01h=cover closed."

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Information type (03h=horizontal sync frequency, 04h=vertical sync frequency)"

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

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_pbyb_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: byte
      description: "Target (00h=MODE,01h=START POSITION,02h=SUB INPUT/SUB INPUT 1,09h=SUB INPUT 2,0Ah=SUB INPUT 3)"

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
  notes: "Returns operation status, content displayed, selection signal type, display signal type, video/sound/onscreen mute, freeze status."
```

## Feedbacks
```yaml
# Each command returns a framed response. Ack frame first byte indicates type:
#   20h/21h/22h/23h = success response (mirrors command group + 20h offset)
#   A0h/A1h/A2h/A3h = error response, carries <ERR1> <ERR2> <CKS>
- id: command_ack
  type: enum
  values: [success, error]

- id: error_code
  type: struct
  description: "ERR1/ERR2 pair from §2.4 error code list."
  fields:
    - err1_err2: "00h 00h"
      meaning: "Command cannot be recognized."
    - err1_err2: "00h 01h"
      meaning: "Command not supported by the model."
    - err1_err2: "01h 00h"
      meaning: "Specified value is invalid."
    - err1_err2: "01h 01h"
      meaning: "Specified input terminal is invalid."
    - err1_err2: "01h 02h"
      meaning: "Specified language is invalid."
    - err1_err2: "02h 00h"
      meaning: "Memory allocation error."
    - err1_err2: "02h 02h"
      meaning: "Memory in use."
    - err1_err2: "02h 03h"
      meaning: "Specified value cannot be set."
    - err1_err2: "02h 04h"
      meaning: "Forced onscreen mute on."
    - err1_err2: "02h 06h"
      meaning: "Viewer error."
    - err1_err2: "02h 07h"
      meaning: "No signal."
    - err1_err2: "02h 08h"
      meaning: "A test pattern or filter is displayed."
    - err1_err2: "02h 09h"
      meaning: "No PC card is inserted."
    - err1_err2: "02h 0Ah"
      meaning: "Memory operation error."
    - err1_err2: "02h 0Ch"
      meaning: "An entry list is displayed."
    - err1_err2: "02h 0Dh"
      meaning: "Command cannot be accepted because the power is off."
    - err1_err2: "02h 0Eh"
      meaning: "Command execution failed."
    - err1_err2: "02h 0Fh"
      meaning: "No authority for the operation."
    - err1_err2: "03h 00h"
      meaning: "Specified gain number is incorrect."
    - err1_err2: "03h 01h"
      meaning: "Specified gain is invalid."
    - err1_err2: "03h 02h"
      meaning: "Adjustment failed."

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "From RUNNING STATUS REQUEST DATA03/DATA06 and BASIC INFORMATION REQUEST DATA01."

- id: error_status_bitmap
  type: struct
  description: "From ERROR STATUS REQUEST DATA01-12; bit=0 normal, bit=1 error. Covers cover/fan/temperature/power/lamp/mirror-cover/interlock/formatter/FPGA/iris/lens-install errors."
```

## Variables
```yaml
# Settable parameters surfaced as continuous/range values rather than discrete actions:
- name: picture_brightness
  range_from: gain_parameter_request_3
  description: "Adjusted via PICTURE ADJUST DATA01=00h. Bounds returned by GAIN PARAMETER REQUEST 3."
- name: picture_contrast
  range_from: gain_parameter_request_3
  description: "DATA01=01h."
- name: picture_color
  range_from: gain_parameter_request_3
  description: "DATA01=02h."
- name: picture_hue
  range_from: gain_parameter_request_3
  description: "DATA01=03h."
- name: picture_sharpness
  range_from: gain_parameter_request_3
  description: "DATA01=04h."
- name: volume
  range_from: gain_parameter_request_3
  description: "DATA01=05h. Set via VOLUME ADJUST."
- name: lamp_light_adjust
  range_from: gain_parameter_request_3
  description: "DATA01=96h. Set via OTHER ADJUST."
- name: lens_position
  description: "Zoom/Focus/Lens-shift via LENS CONTROL / LENS CONTROL 2; bounds from LENS CONTROL REQUEST."
```

## Events
```yaml
# No unsolicited notifications documented in source. All responses are solicited
# (returned after a command is sent). 
# UNRESOLVED: no asynchronous event mechanism stated in source.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
# UNRESOLVED: populate if a later source documents macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes operational interlocks (not safety interlocks per se):
#   - POWER ON rejects all other commands while power-on is in progress.
#   - POWER OFF rejects all other commands during power-off incl. cooling time.
#   - Command 02h 0Dh error: "command cannot be accepted because the power is off."
#   - ERROR STATUS REQUEST reports interlock-switch-open (DATA09 Bit1) and
#     mirror-cover/lens-cover errors - treat as safety-relevant status.
# <!-- UNRESOLVED: no explicit power-on sequencing procedure or safety interlock
#      procedure stated in this source. -->
```

## Notes
- Manual is shared across many Sharp/NEC projectors (doc BDT140013 Rev 7.1). Per-model command validity, input-terminal value tables, eco-mode value tables, base-model-type values, and sub-input values live in an "Appendix: Supplementary Information by Command" that is **not present** in this refined source. Those DATA fields are left parameterized.
- Command frame layout (§2.1): `[marker] [sub] <ID1> <ID2> <LEN> <DATA...> <CKS>`. Responses prepend a 0xA0h-group ack/error marker (e.g. `A2h`) instead of the command marker (`02h`).
- Checksum (§2.2): sum all preceding bytes, take low-order 8 bits. Worked example from source: `20h+81h+01h+60h+01h+00h = 103h → CKS=03h`.
- Lamp/filter usage times are returned in **seconds**, updated at one-minute intervals. If lamp replacement deadline is exceeded, remaining-life % is returned negative.
- Carbon Savings returned as kilograms (DATA02-05, max 99999 kg) + milligrams (DATA06-09, max 999999 mg).
- For two-lamp models only: LAMP INFORMATION REQUEST 3 DATA01=01h (Lamp 2) is valid.

<!-- UNRESOLVED: input-terminal value table (for INPUT SW CHANGE, AUDIO SELECT SET) not in source. -->
<!-- UNRESOLVED: eco-mode value table not in source. -->
<!-- UNRESOLVED: base-model-type values not in source. -->
<!-- UNRESOLVED: PIP/PbP sub-input setting values not in source. -->
<!-- UNRESOLVED: aspect value table not in source. -->
<!-- UNRESOLVED: LENS CONTROL DATA01 target table (only 06h=Periphery Focus shown) not in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: flow_control not stated (only "Full duplex" stated; RTS/CTS pins present). -->
<!-- UNRESOLVED: ID2 model code for XP V731U W not stated (defaults to 00h in examples). -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:51:08.920Z
last_checked_at: 2026-06-19T07:51:20.847Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:51:20.847Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match literal hex sequences in source; all transport parameters (port 7142, baud rates, serial settings) verified verbatim. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the source manual is a generic command reference shared across many NEC projectors; per-model command support (which commands/params are valid for the XP V731U W specifically) is documented only in an \"Appendix: Supplementary Information by Command\" that is not present in this refined source."
- "flow control not stated in source (RTS/CTS pins present on D-SUB but only \"Full duplex\" stated)"
- "no asynchronous event mechanism stated in source."
- "populate if a later source documents macro sequences."
- "no explicit power-on sequencing procedure or safety interlock"
- "input-terminal value table (for INPUT SW CHANGE, AUDIO SELECT SET) not in source."
- "eco-mode value table not in source."
- "base-model-type values not in source."
- "PIP/PbP sub-input setting values not in source."
- "aspect value table not in source."
- "LENS CONTROL DATA01 target table (only 06h=Periphery Focus shown) not in source."
- "firmware version compatibility not stated."
- "flow_control not stated (only \"Full duplex\" stated; RTS/CTS pins present)."
- "ID2 model code for XP V731U W not stated (defaults to 00h in examples)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
