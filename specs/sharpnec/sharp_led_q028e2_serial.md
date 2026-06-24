---
spec_id: admin/sharp-nec-led-q028e2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED Q028E2 Control Spec"
manufacturer: Sharp/NEC
model_family: "LED Q028E2"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED Q028E2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:35:42.270Z
last_checked_at: 2026-06-23T07:49:54.931Z
generated_at: 2026-06-23T07:49:54.931Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model code (ID2) value for Q028E2 not stated in source; control ID (ID1) is set on the projector. Input-terminal enum values, aspect values, eco-mode values, base-model-type values, and sub-input values are referenced to an \"Appendix / Supplementary Information by Command\" not included in the refined source."
  - "no explicit power-on sequencing procedure or voltage/current"
  - "default baud rate not stated (4800/9600/19200/38400/115200 are selectable)."
  - "model code (ID2) for LED Q028E2 not stated in source."
  - "input-terminal value enum, aspect value enum, eco-mode value enum, base-model-type value enum, and PIP/PbP sub-input value enum are referenced to an Appendix \"Supplementary Information by Command\" not present in the refined source."
  - "firmware version compatibility not stated."
  - "protocol version / document revision BDT140013 Rev 7.1 stated but no firmware mapping."
verification:
  verdict: verified
  checked_at: 2026-06-23T07:49:54.931Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim to source; transport verified; one-to-one coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED Q028E2 Control Spec

## Summary
Sharp/NEC LED Q028E2 projector controlled via RS-232C serial (PC CONTROL D-SUB 9P) and/or TCP/IP LAN (wired/wireless). Binary protocol using hex byte frames with a trailing checksum byte. Covers power, input switching, mutes, picture/volume/aspect/lens adjustment, lens memory, eco mode, edge blending, PIP/PbP, freeze, shutter, and a broad set of status queries.

<!-- UNRESOLVED: model code (ID2) value for Q028E2 not stated in source; control ID (ID1) is set on the projector. Input-terminal enum values, aspect values, eco-mode values, base-model-type values, and sub-input values are referenced to an "Appendix / Supplementary Information by Command" not included in the refined source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600  # selectable: 4800 / 9600 / 19200 / 38400 / 115200; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # full duplex stated; RTS/CTS pins wired (see pinout) but flow_control policy not specified
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # POWER ON / POWER OFF (015 / 016)
  - queryable     # many *REQUEST commands return state
  - levelable     # PICTURE / VOLUME / LAMP ADJUST (030-1 / 030-2 / 030-15)
  - routable      # INPUT SW CHANGE (018) and AUDIO SELECT SET (319-10)
```

## Actions
```yaml
# Framing note: commands shown verbatim as written in source. "0Xh"-prefixed bytes
# are the full command payload INCLUDING the trailing checksum byte (CKS), computed
# as the low byte of the sum of all preceding bytes. Responses use leading marker
# byte: 20h=query-data, 22h=action-ok, 23h=set-ok, 21h=control-ok; A0h/A2h/A3h/A1h
# are the error counterparts carrying <ERR1> <ERR2>. ID1=Control ID, ID2=Model code
# (projector-supplied); CKS is computed by the controller. Placeholder <DATA0N> /
# <CKS> means a value supplied/computed per source semantics.

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
  notes: "No other command accepted while power-on in progress."

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off incl. cooling time."

- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Input terminal value (e.g. 06h = video port). Full enum in Appendix 'Supplementary Information by Command' - UNRESOLVED."

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
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: byte
      description: "Mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: byte
      description: "Adjustment value (high-order 8 bits)"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: byte
      description: "Adjustment value (high-order 8 bits)"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Aspect value - full enum in Appendix 'Supplementary Information by Command' (UNRESOLVED)."

- id: other_adjust_lamp_light
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "96h for LAMP ADJUST / LIGHT ADJUST (DATA02=FFh)"
    - name: DATA03
      type: byte
      description: "Mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: byte
      description: "Adjustment value (high-order 8 bits)"

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
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: byte
      description: "01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Key code low byte (WORD-type key code). See key code list in notes."
    - name: DATA02
      type: byte
      description: "Key code high byte (always 00h in listed examples)."

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
      type: byte
      description: "06h=Periphery Focus"
    - name: DATA02
      type: byte
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus, 81h=minus, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Target (FFh=Stop)"
    - name: DATA02
      type: byte
      description: "Mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: byte
      description: "Adjustment value (high-order 8 bits)"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: byte
      description: "00h=OFF, 01h=ON"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=Profile 1, 01h=Profile 2"

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "01h=freeze ON, 02h=freeze OFF"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Eco mode value - enum in Appendix 'Supplementary Information by Command' (UNRESOLVED). Sets 'Light mode' or 'Lamp mode' depending on model."

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: DATA01_16
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)."

- id: pip_picture_by_picture_set
  label: PIP / Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: byte
      description: "Setting value. MODE: 00h=PIP, 01h=PbP. START POSITION: 00h=TL,01h=TR,02h=BL,03h=BR. Sub-input values per Appendix (UNRESOLVED)."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Input terminal - values per Appendix 'Supplementary Information by Command' (UNRESOLVED)."
    - name: DATA02
      type: byte
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Lens axis target (same values as LENS CONTROL DATA01, e.g. 06h=Periphery Focus)."

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

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
      type: byte
      description: "00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"

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

- id: lan_mac_address_request
  label: LAN MAC Address Request
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP / Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
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

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"
```

## Feedbacks
```yaml
# Response markers per command: 20h=query-data, 22h=action-ok, 23h=set-ok,
# 21h=control-ok; A0h/A2h/A3h/A1h = error response carrying <ERR1> <ERR2>.
# Error codes (ERR1/ERR2) verbatim from source §2.4:
#   00h/00h Command not recognized
#   00h/01h Command not supported by model
#   01h/00h Specified value invalid
#   01h/01h Specified input terminal invalid
#   01h/02h Specified language invalid
#   02h/00h Memory allocation error
#   02h/02h Memory in use
#   02h/03h Specified value cannot be set
#   02h/04h Forced onscreen mute on
#   02h/06h Viewer error
#   02h/07h No signal
#   02h/08h Test pattern or filter displayed
#   02h/09h No PC card inserted
#   02h/0Ah Memory operation error
#   02h/0Ch Entry list displayed
#   02h/0Dh Command not accepted (power off)
#   02h/0Eh Command execution failed
#   02h/0Fh No authority for operation
#   03h/00h Specified gain number incorrect
#   03h/01h Specified gain invalid
#   03h/02h Adjustment failed
- id: error_status
  type: bitmask
  description: "ERROR STATUS REQUEST (009) returns DATA01-12; bit=0 normal, bit=1 error (cover/fan/temp/power/lamp/formatter/mirror-cover/interlock/system)."
- id: running_status
  type: object
  description: "RUNNING STATUS REQUEST (078-2): power status, cooling, power-on/off process, operation status."
- id: input_status
  type: object
  description: "INPUT STATUS REQUEST (078-3): signal switch process, signal list number, selection signal type 1/2, test pattern, content displayed."
- id: mute_status
  type: object
  description: "MUTE STATUS REQUEST (078-4): picture/sound/onscreen/forced-onscreen mute + OSD display flags."
- id: cover_status
  type: enum
  values: [normal_opened, closed]
- id: lens_information
  type: bitmask
  description: "LENS INFORMATION REQUEST (053-7) DATA01 bits: lens memory/zoom/focus/lens-shift-H/lens-shift-V stop vs in-operation."
- id: eco_mode
  type: byte
- id: edge_blending_mode
  type: enum
  values: [off, on]
- id: pip_pbp_state
  type: object
  description: "PIP/PbP REQUEST (097-198): mode, start position, sub inputs."
- id: projector_name
  type: string
- id: mac_address
  type: string
- id: model_name
  type: string
- id: serial_number
  type: string
- id: base_model_type
  type: object
  description: "BASE MODEL TYPE REQUEST (305-1) + MODEL NAME REQUEST (078-5). Base-model-type values per Appendix (UNRESOLVED)."
- id: basic_information
  type: object
  description: "BASIC INFORMATION REQUEST (305-3): operation status, content displayed, signal types, mute/freeze flags."
- id: information_strings
  type: object
  description: "INFORMATION STRING REQUEST (084): horizontal/vertical sync frequency strings."
```

## Variables
```yaml
- id: lamp_usage_time
  type: integer
  unit: seconds
  description: "From INFORMATION REQUEST (037) DATA83-86 or LAMP INFORMATION REQUEST 3 (037-4). Updated at 1-minute intervals."
- id: filter_usage_time
  type: integer
  unit: seconds
  description: "From INFORMATION REQUEST (037) DATA87-90 or FILTER USAGE INFORMATION REQUEST (037-3) DATA01-04."
- id: filter_alarm_start_time
  type: integer
  unit: seconds
  description: "FILTER USAGE INFORMATION REQUEST (037-3) DATA05-08; -1 if undefined."
- id: lamp_remaining_life
  type: integer
  unit: percent
  description: "LAMP INFORMATION REQUEST 3 (037-4) content 04h. Negative if replacement deadline exceeded."
- id: carbon_savings_total
  type: number
  unit: kilogram
  description: "CARBON SAVINGS INFORMATION REQUEST (037-6) DATA01=00h; kg max 99999 + mg max 999999."
- id: carbon_savings_operation
  type: number
  unit: kilogram
  description: "CARBON SAVINGS INFORMATION REQUEST (037-6) DATA01=01h."
- id: picture_brightness
  type: integer
  description: "GAIN PARAMETER REQUEST 3 (060-1) DATA01=00h; returns range/default/current/wide/narrow widths."
- id: picture_contrast
  type: integer
  description: "GAIN PARAMETER REQUEST 3 (060-1) DATA01=01h."
- id: picture_color
  type: integer
  description: "GAIN PARAMETER REQUEST 3 (060-1) DATA01=02h."
- id: picture_hue
  type: integer
  description: "GAIN PARAMETER REQUEST 3 (060-1) DATA01=03h."
- id: picture_sharpness
  type: integer
  description: "GAIN PARAMETER REQUEST 3 (060-1) DATA01=04h."
- id: volume
  type: integer
  description: "GAIN PARAMETER REQUEST 3 (060-1) DATA01=05h."
- id: lamp_light_adjust
  type: integer
  description: "GAIN PARAMETER REQUEST 3 (060-1) DATA01=96h."
- id: lens_position
  type: object
  description: "LENS CONTROL REQUEST (053-1): upper/lower limit + current value per lens axis (DATA01 target)."
```

## Events
```yaml
# Source documents no unsolicited notifications. All responses are solicited.
```

## Macros
```yaml
# Source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "During power-on, no other command is accepted (015)."
  - "During power-off including cooling time, no other command is accepted (016)."
  - "Interlock switch open is reported in ERROR STATUS REQUEST (009) DATA09 bit1."
  - "Mirror/lens cover closed status reported via COVER STATUS REQUEST (078-6); cover error via ERROR STATUS REQUEST (009)."
# UNRESOLVED: no explicit power-on sequencing procedure or voltage/current
# interlocks stated in source.
```

## Notes
- **Checksum (CKS):** low-order byte of the sum of all preceding bytes. Worked example from source: `20h + 81h + 01h + 60h + 01h + 00h = 103h` → CKS = `03h`.
- **Frame parameters:** ID1 = Control ID (set on projector); ID2 = Model code (varies by model); LEN = byte length of data following LEN; DATA?? = variable-length data; ERR1/ERR2 = response error code pair.
- **Remote key code list (050 REMOTE KEY CODE), DATA01/DATA02 verbatim:** POWER ON `02h/00h`, POWER OFF `03h/00h`, AUTO `05h/00h`, MENU `06h/00h`, UP `07h/00h`, DOWN `08h/00h`, RIGHT `09h/00h`, LEFT `0Ah/00h`, ENTER `0Bh/00h`, EXIT `0Ch/00h`, HELP `0Dh/00h`, MAGNIFY UP `0Fh/00h`, MAGNIFY DOWN `10h/00h`, MUTE `13h/00h`, PICTURE `29h/00h`, COMPUTER1 `4Bh/00h`, COMPUTER2 `4Ch/00h`, VIDEO1 `4Fh/00h`, S-VIDEO1 `51h/00h`, VOLUME UP `84h/00h`, VOLUME DOWN `85h/00h`, FREEZE `8Ah/00h`, ASPECT `A3h/00h`, SOURCE `D7h/00h`, LAMP MODE/ECO `EEh/00h`.
- **Lens control (053):** after sending `7Fh` (plus) or `81h` (minus) in DATA02, stop lens by sending `00h`. While lens is being driven, lens position can be controlled without a stop by re-issuing the same command.
- **Information update granularity:** lamp/filter usage time returned in 1-second units but updated at 1-minute intervals.
- **Pinouts (from source):** PC CONTROL D-SUB 9P — pin2 RxD, pin3 TxD, pin5 GND, pin7 RTS, pin8 CTS (cross cable to external device). LAN port RJ-45 standard 10/100BASE-T pinout (TD+/TD-/RD+/RD-).

<!-- UNRESOLVED: default baud rate not stated (4800/9600/19200/38400/115200 are selectable). -->
<!-- UNRESOLVED: model code (ID2) for LED Q028E2 not stated in source. -->
<!-- UNRESOLVED: input-terminal value enum, aspect value enum, eco-mode value enum, base-model-type value enum, and PIP/PbP sub-input value enum are referenced to an Appendix "Supplementary Information by Command" not present in the refined source. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: protocol version / document revision BDT140013 Rev 7.1 stated but no firmware mapping. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:35:42.270Z
last_checked_at: 2026-06-23T07:49:54.931Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T07:49:54.931Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim to source; transport verified; one-to-one coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model code (ID2) value for Q028E2 not stated in source; control ID (ID1) is set on the projector. Input-terminal enum values, aspect values, eco-mode values, base-model-type values, and sub-input values are referenced to an \"Appendix / Supplementary Information by Command\" not included in the refined source."
- "no explicit power-on sequencing procedure or voltage/current"
- "default baud rate not stated (4800/9600/19200/38400/115200 are selectable)."
- "model code (ID2) for LED Q028E2 not stated in source."
- "input-terminal value enum, aspect value enum, eco-mode value enum, base-model-type value enum, and PIP/PbP sub-input value enum are referenced to an Appendix \"Supplementary Information by Command\" not present in the refined source."
- "firmware version compatibility not stated."
- "protocol version / document revision BDT140013 Rev 7.1 stated but no firmware mapping."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
