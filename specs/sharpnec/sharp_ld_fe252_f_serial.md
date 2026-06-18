---
spec_id: admin/sharp-nec-ld-fe252-f
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld Fe252 F Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld Fe252 F"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld Fe252 F"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:37:18.192Z
last_checked_at: 2026-06-17T20:08:43.438Z
generated_at: 2026-06-17T20:08:43.438Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Model code (ID2) value per-device not stated. Control ID (ID1) default value not stated. Input terminal DATA01 value map referenced in \"Supplementary Information by Command\" appendix, not present in refined source."
  - "flow control not explicitly stated (RTS/CTS pins present but mode not named)"
  - "not in refined source).\""
  - "source documents no named multi-step sequences."
  - "no explicit safety warnings, power-on sequencing, or interlock"
  - "Control ID (ID1) default value not stated."
  - "Model code (ID2) for Ld Fe252 F not stated in this refined source."
  - "Appendix \"Supplementary Information by Command\" referenced for input terminal values, aspect values, eco mode values, sub-input values — not present in refined source."
  - "Firmware version compatibility not stated."
  - "LAN authentication / login procedure not described (auth.type:none inferred from absence)."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:08:43.438Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched literally to source commands; transport parameters verified; source command catalogue fully represented by spec. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld Fe252 F Control Spec

## Summary
Sharp/NEC projector ("Ld Fe252 F"). Binary control protocol over RS-232C serial (cross cable, D-SUB 9P) and TCP/IP (wired/wireless LAN, port 7142). Commands are hex byte frames with checksum (low byte of sum of preceding bytes). Covers power, input switching, mute (picture/sound/onscreen), picture/volume/aspect/gain adjust, lens control + memory + profile, freeze, shutter, eco mode, edge blending, PIP/PbP, info/status queries.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Model code (ID2) value per-device not stated. Control ID (ID1) default value not stated. Input terminal DATA01 value map referenced in "Supplementary Information by Command" appendix, not present in refined source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands."
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; high stated first
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated (RTS/CTS pins present but mode not named)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: POWER ON / POWER OFF commands present
- queryable       # inferred: many status/info request commands present
- routable        # inferred: INPUT SW CHANGE / AUDIO SELECT SET present
- levelable       # inferred: VOLUME ADJUST / PICTURE ADJUST / OTHER ADJUST present
```

## Actions
```yaml
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
  notes: "While turning on power, no other command accepted."

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "While turning off power (incl. cooling time), no other command accepted."

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value (e.g. 06h = video). Full value map in appendix 'Supplementary Information by Command' (UNRESOLVED: not in refined source)."

- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Cleared by input/video signal switch."

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
  notes: "Cleared by input/video switch or volume adjust."

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
  notes: "Cleared by input/video signal switch."

- id: onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: "030-1. PICTURE ADJUST"
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
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
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

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value (value map in appendix 'Supplementary Information by Command'; UNRESOLVED: not in refined source)."

- id: other_adjust_lamp
  label: "030-15. OTHER ADJUST (LAMP/LIGHT)"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Must be 96h (LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA02
      type: integer
      description: "Must be FFh"
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
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time (DATA83-86 sec), filter usage time (DATA87-90 sec). Updated at 1-min intervals."

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (DATA01-04 sec), filter alarm start time (DATA05-08 sec). -1 if undefined."

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=Lamp usage time (sec), 04h=Lamp remaining life (%)"
  notes: "Values reflect eco mode when enabled. Negative remaining life if past replacement deadline."

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "Returns kg (DATA02-05, max 99999) + mg (DATA06-09, max 999999)."

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (see key code list)"
    - name: DATA02
      type: integer
      description: "Key code high byte (00h for all listed keys)"
  notes: "Key code list: POWER ON(02h/00h), POWER OFF(03h/00h), AUTO(05h/00h), MENU(06h/00h), UP(07h/00h), DOWN(08h/00h), RIGHT(09h/00h), LEFT(0Ah/00h), ENTER(0Bh/00h), EXIT(0Ch/00h), HELP(0Dh/00h), MAGNIFY UP(0Fh/00h), MAGNIFY DOWN(10h/00h), MUTE(13h/00h), PICTURE(29h/00h), COMPUTER1(4Bh/00h), COMPUTER2(4Ch/00h), VIDEO1(4Fh/00h), S-VIDEO1(51h/00h), VOLUME UP(84h/00h), VOLUME DOWN(85h/00h), FREEZE(8Ah/00h), ASPECT(A3h/00h), SOURCE(D7h/00h), LAMP MODE/ECO(EEh/00h)."

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
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target: 06h=Periphery Focus"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive +, 81h=drive -, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
  notes: "After 7Fh/81h, send 00h to stop. Lens can be controlled without stop while driving."

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target (periphery focus axis)"
  notes: "Returns upper/lower adjustment limits + current value (DATA02-07)."

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target: FFh=Stop (then mode/value ignored)"
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
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Operates on profile number set by 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitfield: bit0 Lens memory, bit1 Zoom, bit2 Focus, bit3 Lens Shift (H), bit4 Lens Shift (V) (0=Stop, 1=During operation)."

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Profile: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "Returns status, upper/lower limits, default, current, wide/narrow adjustment widths."

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile (DATA05)."

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status (DATA03), cooling process (DATA04), power on/off process (DATA05), operation status (DATA06)."

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number, selection signal type 1/2, test pattern, displayed content."

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture mute (DATA01), sound mute (DATA02), onscreen mute (DATA03), forced onscreen mute (DATA04), onscreen display (DATA05)."

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
  notes: "DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze ON, 02h=freeze OFF"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns Light mode or Lamp mode depending on projector. Value map in appendix (UNRESOLVED: not in refined source)."

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value (Light mode or Lamp mode; value map in appendix UNRESOLVED: not in refined source)."

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
  params:
    - name: name
      type: string
      description: "Projector name (up to 16 bytes), placed into DATA01-16."

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (MODE: 00h=PIP/01h=PbP; START POSITION: 00h=TL/01h=TR/02h=BL/03h=BR; SUB INPUT: value map in appendix UNRESOLVED)."

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (DATA01-02), model name (DATA03-11)."

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
  notes: "Returns operation status, displayed content, signal type, video/sound/onscreen mute, freeze status."

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal (value map in appendix UNRESOLVED: not in refined source)."
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Response frame format (success): ACK byte + cmd echo + ID1 ID2 + LEN + DATA... + CKS
# Response frame format (error): Axh + cmd echo + ID1 ID2 + 02h + ERR1 ERR2 + CKS
# Error codes (ERR1/ERR2):
#   00h/00h = command not recognized
#   00h/01h = command not supported by model
#   01h/00h = specified value invalid
#   01h/01h = specified input terminal invalid
#   01h/02h = specified language invalid
#   02h/00h = memory allocation error
#   02h/02h = memory in use
#   02h/03h = specified value cannot be set
#   02h/04h = forced onscreen mute on
#   02h/06h = viewer error
#   02h/07h = no signal
#   02h/08h = test pattern/filter displayed
#   02h/09h = no PC card inserted
#   02h/0Ah = memory operation error
#   02h/0Ch = entry list displayed
#   02h/0Dh = command cannot be accepted (power off)
#   02h/0Eh = command execution failed
#   02h/0Fh = no authority for operation
#   03h/00h = specified gain number incorrect
#   03h/01h = specified gain invalid
#   03h/02h = adjustment failed

- id: error_status_bitfield
  type: bytes
  description: "009 response DATA01-12 bitfield (1=error). Covers cover/fan/temperature/power/lamp errors, mirror cover, interlock switch, lens installation."

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "From 078-2 DATA06 / 305-3 DATA01."

- id: mute_state
  type: enum
  values: [off, on]
  description: "From 078-4: picture/sound/onscreen/forced-onscreen mute flags."

- id: cover_state
  type: enum
  values: [normal_opened, closed]
  description: "From 078-6 DATA01."

- id: lens_operation_status
  type: bitfield
  description: "From 053-7 DATA01: lens memory/zoom/focus/shift H/shift V operation bits."
```

## Variables
```yaml
# Settable parameters surfaced as distinct commands (030-1 PICTURE ADJUST targets,
# 030-2 VOLUME, 030-15 LAMP ADJUST, eco mode, edge blending, PIP/PbP) are enumerated
# as Actions above. No additional standalone settable parameters documented.
```

## Events
```yaml
# Source documents no unsolicited notifications. All responses are replies to commands.
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes relevant to safe operation (not formal interlocks, listed for context):
# - POWER ON/OFF block all other commands during the on/off ramp + cooling time.
# - 009 ERROR STATUS REQUEST exposes cover error, fan error, temperature error,
#   interlock switch open, foreign matter sensor, lens-not-installed bits.
# UNRESOLVED: no explicit safety warnings, power-on sequencing, or interlock
# procedures stated in the refined source.
```

## Notes
Binary protocol. Frame layout per §2.1: header byte + cmd echo + `<ID1> <ID2>` + `LEN` + `DATA...` + `<CKS>`. ID1 = control ID (device-set); ID2 = model code (per-model). Checksum = low byte of sum of all preceding bytes. Two transport paths: RS-232C (D-SUB 9P cross cable, baud selectable 4800-115200, 8N1, full duplex) and TCP port 7142 (wired/wireless LAN).

Response ACK byte convention: success reply prefix = header byte + 20h (e.g. command 02h → ack 22h; 03h → 23h; 00h → 20h; 01h → 21h); error reply prefix = command byte + A0h (02h→A2h, 03h→A3h, 00h→A0h, 01h→A1h). Several query commands share the same command byte (e.g. `00h 85h` for all 078-* requests, `03h B0h` for 097-* requests, `00h BFh` for 305-* requests), disambiguated by the DATA selector byte.

<!-- UNRESOLVED: Control ID (ID1) default value not stated. -->
<!-- UNRESOLVED: Model code (ID2) for Ld Fe252 F not stated in this refined source. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced for input terminal values, aspect values, eco mode values, sub-input values — not present in refined source. -->
<!-- UNRESOLVED: Firmware version compatibility not stated. -->
<!-- UNRESOLVED: LAN authentication / login procedure not described (auth.type:none inferred from absence). -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T10:37:18.192Z
last_checked_at: 2026-06-17T20:08:43.438Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:08:43.438Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched literally to source commands; transport parameters verified; source command catalogue fully represented by spec. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Model code (ID2) value per-device not stated. Control ID (ID1) default value not stated. Input terminal DATA01 value map referenced in \"Supplementary Information by Command\" appendix, not present in refined source."
- "flow control not explicitly stated (RTS/CTS pins present but mode not named)"
- "not in refined source).\""
- "source documents no named multi-step sequences."
- "no explicit safety warnings, power-on sequencing, or interlock"
- "Control ID (ID1) default value not stated."
- "Model code (ID2) for Ld Fe252 F not stated in this refined source."
- "Appendix \"Supplementary Information by Command\" referenced for input terminal values, aspect values, eco mode values, sub-input values — not present in refined source."
- "Firmware version compatibility not stated."
- "LAN authentication / login procedure not described (auth.type:none inferred from absence)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
