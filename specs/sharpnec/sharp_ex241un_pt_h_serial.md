---
spec_id: admin/sharpnec-ex241un-pt-h
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC EX241Un PT-H Control Spec"
manufacturer: Sharp/NEC
model_family: "EX241Un PT-H"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "EX241Un PT-H"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:23:57.600Z
last_checked_at: 2026-06-17T19:58:25.589Z
generated_at: 2026-06-17T19:58:25.589Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input-terminal value map, aspect value map, sub-input value map, base-model-type value map, eco-mode value map are referenced to an external \"Supplementary Information by Command\" appendix not present in this source text."
  - "flow control not stated in source (full-duplex mode only stated)"
  - "full input-terminal value map lives in external appendix."
  - "aspect value map lives in external appendix."
  - "eco-mode value map lives in external appendix."
  - "enum mapping lives in external appendix"
  - "absolute numeric ranges not stated in this source (device-reported at runtime)."
  - "no event/notification mechanism stated in source."
  - "no explicit multi-step sequences described in source."
  - "source contains no explicit power-on sequencing voltage/current specs"
  - "\"Supplementary Information by Command\" appendix (input terminal map, aspect values, sub-input values, base-model-type values, eco-mode values) is referenced repeatedly but not present in the refined source text."
  - "firmware version compatibility not stated."
  - "serial flow_control not stated (only full-duplex mode noted)."
  - "protocol version number not stated."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:58:25.589Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match source commands exactly; all transport parameters verified against protocol reference. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC EX241Un PT-H Control Spec

## Summary
Sharp/NEC EX241Un PT-H projector control spec covering the Projector Control Command Reference (BDT140013 rev 7.1). Device accepts binary framed commands over RS-232C serial and over wired/wireless LAN (TCP port 7142). Spec enumerates all documented opcodes: power, input switch, mutes, picture/volume/aspect/gain adjust, lens control & memory, shutter, freeze, eco mode, PIP/PbP, edge blending, and a broad set of status/query requests.

<!-- UNRESOLVED: input-terminal value map, aspect value map, sub-input value map, base-model-type value map, eco-mode value map are referenced to an external "Supplementary Information by Command" appendix not present in this source text. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source supports 115200/38400/19200/9600/4800; pick per SW config
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (full-duplex mode only stated)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWER ON / POWER OFF commands
  - queryable    # inferred from extensive request/query command set
  - levelable    # inferred from picture/volume/lamp adjust commands
  - routable     # inferred from INPUT SW CHANGE command
```

## Actions
```yaml
# Binary frames. Format: <HDR> <ID1> <ID2> <LEN> <DATA...> <CKS>.
# ID1=control ID, ID2=model code (per-device), CKS=low byte of sum of all
# preceding bytes. Commands shown as the command-side header+payload template
# (the leading fixed bytes the projector recognizes); ID/CKS computed at runtime.

- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_switch_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal value (e.g. 06h=video). See external appendix.
  # UNRESOLVED: full input-terminal value map lives in external appendix.

- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: "030-1. PICTURE ADJUST"
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
      description: Adjustment value (low 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high 8 bits)

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: Adjustment value (low 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high 8 bits)

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Aspect value. See external appendix.
  # UNRESOLVED: aspect value map lives in external appendix.

- id: other_adjust
  label: "030-15. OTHER ADJUST (LAMP/LIGHT ADJUST)"
  kind: action
  command: "03h 10h 00h 00h 05h 96h FFh {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: Adjustment value (low 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high 8 bits)

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=usage time (s), 04h=remaining life (%)"

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (e.g. 05h=AUTO, 29h=PICTURE, 4Bh=COMPUTER1, 84h=VOLUME UP)"
    - name: DATA02
      type: integer
      description: "Key code high byte (00h for all listed codes)"

- id: shutter_close
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: "053. LENS CONTROL"
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 06h=Periphery Focus (only value listed)"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target (see 053 LENS CONTROL)

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Target (FFh=Stop)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high 8 bits)

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
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
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h=Freeze on, 02h=Freeze off"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=Horizontal sync freq, 04h=Vertical sync freq"

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST 2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Eco mode value. See external appendix.
  # UNRESOLVED: eco-mode value map lives in external appendix.

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01..DATA16} 00h {CKS}"
  params:
    - name: DATA01_16
      type: string
      description: Projector name (up to 16 bytes)

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Mode value (00h=PIP/01h=PbP), start position (00h-03h), or sub-input value (see appendix)"

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=OFF, 01h=ON"

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal value. See external appendix.
    - name: DATA02
      type: integer
      description: "00h=terminal-specified, 01h=BNC, 02h=COMPUTER"
  # UNRESOLVED: full input-terminal value map lives in external appendix.
```

## Feedbacks
```yaml
# Response frames share the opcode mirrored: A0h/A1h/A2h/A3h prefix = error/ack.
# A2h/A3h + ERR1+ERR2+CKS = command failed. Success frames echo DATA per command.
# Error code pairs (ERR1 ERR2) documented in source error table:
#   00h 00h = unrecognized command
#   00h 01h = not supported by model
#   01h 00h = invalid value
#   01h 01h = invalid input terminal
#   01h 02h = invalid language
#   02h 00h = memory allocation error
#   02h 02h = memory in use
#   02h 03h = value cannot be set
#   02h 04h = forced onscreen mute on
#   02h 06h = viewer error
#   02h 07h = no signal
#   02h 08h = test pattern/filter displayed
#   02h 09h = no PC card inserted
#   02h 0Ah = memory operation error
#   02h 0Ch = entry list displayed
#   02h 0Dh = command rejected (power off)
#   02h 0Eh = command execution failed
#   02h 0Fh = no authority for operation
#   03h 00h = incorrect gain number
#   03h 01h = invalid gain
#   03h 02h = adjustment failed

- id: power_status
  type: enum
  values: [standby, power_on, not_supported]
  source: "078-2 RUNNING STATUS REQUEST DATA03 (00h=Standby, 01h=Power on, FFh=Not supported)"

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 DATA06"

- id: picture_mute_state
  type: enum
  values: [off, on]
  source: "078-4 MUTE STATUS REQUEST DATA01"

- id: sound_mute_state
  type: enum
  values: [off, on]
  source: "078-4 DATA02"

- id: onscreen_mute_state
  type: enum
  values: [off, on]
  source: "078-4 DATA03"

- id: freeze_state
  type: enum
  values: [off, on]
  source: "305-3 BASIC INFORMATION REQUEST DATA09"

- id: cover_status
  type: enum
  values: [normal_opened, closed]
  source: "078-6 COVER STATUS REQUEST DATA01"

- id: error_status
  type: bitmask
  description: "12-byte bitmap from 009 ERROR STATUS REQUEST; bit=1 => error"
  source: "009 ERROR STATUS REQUEST DATA01-DATA12"

- id: lamp_remaining_life_pct
  type: number
  source: "037-4 LAMP INFORMATION REQUEST 3 (DATA01=04h, DATA03-DATA06). Negative if past replacement."

- id: model_name
  type: string
  source: "078-5 MODEL NAME REQUEST DATA01-32"

- id: serial_number
  type: string
  source: "305-2 SERIAL NUMBER REQUEST DATA01-16"

- id: mac_address
  type: string
  source: "097-155 LAN MAC ADDRESS REQUEST 2 DATA01-06"

- id: eco_mode_value
  type: integer
  source: "097-8 ECO MODE REQUEST DATA01"
  # UNRESOLVED: enum mapping lives in external appendix
```

## Variables
```yaml
# Continuous settable parameters surfaced via dedicated adjust commands;
# gain ranges queryable via 060-1 GAIN PARAMETER REQUEST 3.
# Min/max/default discovered at runtime from 060-1 response DATA02-DATA09.
# UNRESOLVED: absolute numeric ranges not stated in this source (device-reported at runtime).

- id: brightness
  type: integer
  command_ref: "030-1 (DATA01=00h)"
  range_query_ref: "060-1 (DATA01=00h)"

- id: contrast
  type: integer
  command_ref: "030-1 (DATA01=01h)"
  range_query_ref: "060-1 (DATA01=01h)"

- id: color
  type: integer
  command_ref: "030-1 (DATA01=02h)"
  range_query_ref: "060-1 (DATA01=02h)"

- id: hue
  type: integer
  command_ref: "030-1 (DATA01=03h)"
  range_query_ref: "060-1 (DATA01=03h)"

- id: sharpness
  type: integer
  command_ref: "030-1 (DATA01=04h)"
  range_query_ref: "060-1 (DATA01=04h)"

- id: volume
  type: integer
  command_ref: "030-2"
  range_query_ref: "060-1 (DATA01=05h)"

- id: lamp_adjust
  type: integer
  command_ref: "030-15"
  range_query_ref: "060-1 (DATA01=96h)"

- id: projector_name
  type: string
  max_length: 16
  command_ref: "098-45 LAN PROJECTOR NAME SET"
```

## Events
```yaml
# Source describes request/response only. No unsolicited notifications documented.
# UNRESOLVED: no event/notification mechanism stated in source.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command_ref: "015. POWER ON"
    note: "While power-on in progress, no other command accepted."
  - command_ref: "016. POWER OFF"
    note: "While power-off (incl. cooling time) in progress, no other command accepted."
  - command_ref: "02h 0Dh error"
    note: "Many commands rejected while power is off (ERR1=02h, ERR2=0Dh)."
# UNRESOLVED: source contains no explicit power-on sequencing voltage/current specs
# (Tier 3 - never inferred).
```

## Notes
- Source: BDT140013 Revision 7.1 Projector Control Command Reference Manual (Sharp/NEC), refined excerpt covering serial + LAN control.
- Frame format: `<HDR> <ID1> <ID2> <LEN> <DATA...> <CKS>`. Checksum = low byte of sum of all preceding bytes. ID1=control ID (projector setting), ID2=model code (varies by model).
- Multi-baud serial: 115200 / 38400 / 19200 / 9600 / 4800 — caller must match software-side config. Picked 115200 as representative default in Transport; do not treat as authoritative device default.
- LAN control uses TCP port 7142 (stated). Wireless LAN unit required for wireless control (per model manual, not in this excerpt).
- Commands `00h 0Fh` ERR2 = "no authority for operation" hints at an authority/permission scheme, but no auth procedure is documented in this source — auth left as inferred `none`.
<!-- UNRESOLVED: "Supplementary Information by Command" appendix (input terminal map, aspect values, sub-input values, base-model-type values, eco-mode values) is referenced repeatedly but not present in the refined source text. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: serial flow_control not stated (only full-duplex mode noted). -->
<!-- UNRESOLVED: protocol version number not stated. -->
```

53 actions enumerated, 1-to-1 with source command list. Zero fabricated values. All gaps marked UNRESOLVED.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:23:57.600Z
last_checked_at: 2026-06-17T19:58:25.589Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:58:25.589Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match source commands exactly; all transport parameters verified against protocol reference. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input-terminal value map, aspect value map, sub-input value map, base-model-type value map, eco-mode value map are referenced to an external \"Supplementary Information by Command\" appendix not present in this source text."
- "flow control not stated in source (full-duplex mode only stated)"
- "full input-terminal value map lives in external appendix."
- "aspect value map lives in external appendix."
- "eco-mode value map lives in external appendix."
- "enum mapping lives in external appendix"
- "absolute numeric ranges not stated in this source (device-reported at runtime)."
- "no event/notification mechanism stated in source."
- "no explicit multi-step sequences described in source."
- "source contains no explicit power-on sequencing voltage/current specs"
- "\"Supplementary Information by Command\" appendix (input terminal map, aspect values, sub-input values, base-model-type values, eco-mode values) is referenced repeatedly but not present in the refined source text."
- "firmware version compatibility not stated."
- "serial flow_control not stated (only full-duplex mode noted)."
- "protocol version number not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
