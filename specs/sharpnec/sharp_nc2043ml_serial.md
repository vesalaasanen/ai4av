---
spec_id: admin/sharp-nec-nc2043ml
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NC2043ML Control Spec"
manufacturer: Sharp/NEC
model_family: NC2043ML
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NC2043ML
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:11:28.923Z
last_checked_at: 2026-06-18T08:33:25.510Z
generated_at: 2026-06-18T08:33:25.510Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal value list (DATA01 codes) referenced as Appendix \"Supplementary Information by Command\" — not in this refined doc. Eco mode values, base model type values, aspect values also deferred to that appendix."
  - "source states \"Full duplex\" communication mode; flow_control hardware/software not specified"
  - "device may push async status - not stated in source."
  - "no explicit safety warnings, power-on sequencing procedures, or"
  - "firmware version compatibility not stated in source"
  - "input terminal DATA01 code list — deferred to Appendix"
  - "aspect value list — deferred to Appendix"
  - "eco mode value list — deferred to Appendix"
  - "base model type value list — deferred to Appendix"
  - "PIP/PbP sub-input setting value list — deferred to Appendix"
  - "serial flow_control (hardware/software) — source only states \"Full duplex\" mode"
  - "single fixed baud rate — source lists 5 selectable rates, no default stated"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:33:25.510Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NC2043ML Control Spec

## Summary
Sharp/NEC NC2043ML projector control spec. Binary command protocol over RS-232C serial (D-SUB 9P, PC CONTROL port) and wired/wireless LAN (TCP). Manual reference BDT140013 Rev 7.1 covers 53 commands: power, input switch, mutes, picture/volume/aspect/lens adjust, shutter, lens memory, info/status queries, eco mode, edge blending, PIP/PbP, audio select.

<!-- UNRESOLVED: input terminal value list (DATA01 codes) referenced as Appendix "Supplementary Information by Command" — not in this refined doc. Eco mode values, base model type values, aspect values also deferred to that appendix. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # source lists 115200/38400/19200/9600/4800 bps as selectable; single value not fixed
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode; flow_control hardware/software not specified
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       # inferred from power on/off commands
# - queryable       # inferred from extensive status query commands
# - routable        # inferred from input switch command
# - levelable       # inferred from volume/picture/aspect adjust commands
traits:
  - powerable  # inferred from 015/016 power on/off
  - queryable  # inferred from 009/037/053-1/060-1/078-*/084/097-* request commands
  - routable   # inferred from 018 input switch
  - levelable  # inferred from 030-1/030-2/030-12/030-15/053 lens adjust commands
```

## Actions
```yaml
# Command framing: every command/response is a hex byte frame, format documented as
#   20h  88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>
# where ID1 = control ID (projector-set), ID2 = model code (model-dependent),
# CKS = checksum = low-order byte of sum of all preceding bytes.
# Error responses share frame: A?h <CMD> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# Bytes below copied verbatim (incl. "h" hex suffix and double-space separators) from source.

- id: error_status_request
  label: 009. Error Status Request
  kind: query
  command: "00h  88h  00h  00h  00h  88h"
  params: []
  notes: Response DATA01-DATA12 carry bit-field error info (cover/fan/temp/lamp/formatter/etc).

- id: power_on
  label: 015. Power On
  kind: action
  command: "02h  00h  00h  00h  00h  02h"
  params: []
  notes: While turning on, no other command accepted.

- id: power_off
  label: 016. Power Off
  kind: action
  command: "02h  01h  00h  00h  00h  03h"
  params: []
  notes: During power-off incl. cooling time, no other command accepted.

- id: input_sw_change
  label: 018. Input SW Change
  kind: action
  command: "02h  03h  00h  00h  02h  01h  <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Input terminal code (e.g. 06h = video port). Full list UNRESOLVED - deferred to Appendix 'Supplementary Information by Command'."
  notes: "Example (video port): 02h  03h  00h  00h  02h  01h  06h  0Eh"

- id: picture_mute_on
  label: 020. Picture Mute On
  kind: action
  command: "02h  10h  00h  00h  00h  12h"
  params: []

- id: picture_mute_off
  label: 021. Picture Mute Off
  kind: action
  command: "02h  11h  00h  00h  00h  13h"
  params: []

- id: sound_mute_on
  label: 022. Sound Mute On
  kind: action
  command: "02h  12h  00h  00h  00h  14h"
  params: []

- id: sound_mute_off
  label: 023. Sound Mute Off
  kind: action
  command: "02h  13h  00h  00h  00h  15h"
  params: []

- id: onscreen_mute_on
  label: 024. Onscreen Mute On
  kind: action
  command: "02h  14h  00h  00h  00h  16h"
  params: []

- id: onscreen_mute_off
  label: 025. Onscreen Mute Off
  kind: action
  command: "02h  15h  00h  00h  00h  17h"
  params: []

- id: picture_adjust
  label: 030-1. Picture Adjust
  kind: action
  command: "03h  10h  00h  00h  05h  <DATA01>  FFh  <DATA02> - <DATA04> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits)
  notes: "Example brightness=10: 03h  10h  00h  00h  05h  00h  FFh  00h  0Ah  00h  21h"

- id: volume_adjust
  label: 030-2. Volume Adjust
  kind: action
  command: "03h  10h  00h  00h  05h  05h  00h  <DATA01> - <DATA03> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data03
      type: integer
      description: Adjustment value (high-order 8 bits)
  notes: "Example volume=10: 03h  10h  00h  00h  05h  05h  00h  00h  0Ah  00h  27h"

- id: aspect_adjust
  label: 030-12. Aspect Adjust
  kind: action
  command: "03h  10h  00h  00h  05h  18h  00h  00h  <DATA01>  00h  <CKS>"
  params:
    - name: data01
      type: integer
      description: "Aspect value. UNRESOLVED - list deferred to Appendix 'Supplementary Information by Command'."

- id: other_adjust
  label: 030-15. Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h  10h  00h  00h  05h  <DATA01> - <DATA05> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Adjustment target: 96h = LAMP ADJUST / LIGHT ADJUST"
    - name: data02
      type: integer
      description: "FFh fixed per source"
    - name: data03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data05
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: information_request
  label: 037. Information Request
  kind: query
  command: "03h  8Ah  00h  00h  00h  8Dh"
  params: []
  notes: "Response DATA01-49 = projector name, DATA83-86 = lamp usage time (sec), DATA87-90 = filter usage time (sec)."

- id: filter_usage_information_request
  label: 037-3. Filter Usage Information Request
  kind: query
  command: "03h  95h  00h  00h  00h  98h"
  params: []
  notes: "Response DATA01-04 = filter usage time (sec), DATA05-08 = filter alarm start time (sec). '-1' if undefined."

- id: lamp_information_request_3
  label: 037-4. Lamp Information Request 3
  kind: query
  command: "03h  96h  00h  00h  02h  <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: integer
      description: "Content: 01h=lamp usage time (sec), 04h=lamp remaining life (%)"
  notes: "Example (lamp 1 usage): 03h  96h  00h  00h  02h  00h  01h  9Ch"

- id: carbon_savings_information_request
  label: 037-6. Carbon Savings Information Request
  kind: query
  command: "03h  9Ah  00h  00h  01h  <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "Response: DATA02-05 kg (max 99999), DATA06-09 mg (max 999999)."

- id: remote_key_code
  label: 050. Remote Key Code
  kind: action
  command: "02h  0Fh  00h  00h  02h  <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Key code WORD low byte. Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: data02
      type: integer
      description: Key code WORD high byte (00h for all listed keys)
  notes: "Example (AUTO): 02h  0Fh  00h  00h  02h  05h  00h  18h"

- id: shutter_close
  label: 051. Shutter Close
  kind: action
  command: "02h  16h  00h  00h  00h  18h"
  params: []

- id: shutter_open
  label: 052. Shutter Open
  kind: action
  command: "02h  17h  00h  00h  00h  19h"
  params: []

- id: lens_control
  label: 053. Lens Control
  kind: action
  command: "02h  18h  00h  00h  02h  <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Adjustment target. 06h = Periphery Focus. (Others UNRESOLVED - source only lists 06h explicitly in this row.)"
    - name: data02
      type: integer
      description: "Content: 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus (continuous), 81h=drive minus (continuous), FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"

- id: lens_control_request
  label: 053-1. Lens Control Request
  kind: query
  command: "02h  1Ch  00h  00h  02h  <DATA01>  00h  <CKS>"
  params:
    - name: data01
      type: integer
      description: "Adjustment target (same target codes as 053 LENS CONTROL)"
  notes: "Response DATA02-03 = upper limit, DATA04-05 = lower limit, DATA06-07 = current value (16-bit)."

- id: lens_control_2
  label: 053-2. Lens Control 2
  kind: action
  command: "02h  1Dh  00h  00h  04h  <DATA01> - <DATA04> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Adjustment target. FFh = Stop (mode/value ignored)."
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: data03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: 053-3. Lens Memory Control
  kind: action
  command: "02h  1Eh  00h  00h  01h  <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: 053-4. Reference Lens Memory Control
  kind: action
  command: "02h  1Fh  00h  00h  01h  <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: Controls profile selected by 053-10 LENS PROFILE SET.

- id: lens_memory_option_request
  label: 053-5. Lens Memory Option Request
  kind: query
  command: "02h  20h  00h  00h  01h  <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: 053-6. Lens Memory Option Set
  kind: action
  command: "02h  21h  00h  00h  02h  <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: 053-7. Lens Information Request
  kind: query
  command: "02h  22h  00h  00h  01h  00h  25h"
  params: []
  notes: "Response DATA01 bit0=Lens memory, bit1=Zoom, bit2=Focus, bit3=Lens Shift (H), bit4=Lens Shift (V) - 0=Stop, 1=During operation."

- id: lens_profile_set
  label: 053-10. Lens Profile Set
  kind: action
  command: "02h  27h  00h  00h  01h  <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: 053-11. Lens Profile Request
  kind: query
  command: "02h  28h  00h  00h  00h  2Ah"
  params: []

- id: gain_parameter_request_3
  label: 060-1. Gain Parameter Request 3
  kind: query
  command: "03h  05h  00h  00h  03h  <DATA01>  00h  00h  <CKS>"
  params:
    - name: data01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "Example (brightness): 03h  05h  00h  00h  03h  00h  00h  00h  0Bh"

- id: setting_request
  label: 078-1. Setting Request
  kind: query
  command: "00h  85h  00h  00h  01h  00h  86h"
  params: []
  notes: "Response DATA01-03 = base model type, DATA04 = sound function (00h/01h), DATA05 = profile number."

- id: running_status_request
  label: 078-2. Running Status Request
  kind: query
  command: "00h  85h  00h  00h  01h  01h  87h"
  params: []
  notes: "Response DATA03 = power status (00h=Standby, 01h=Power on), DATA04 = cooling process, DATA05 = power on/off process, DATA06 = operation status."

- id: input_status_request
  label: 078-3. Input Status Request
  kind: query
  command: "00h  85h  00h  00h  01h  02h  88h"
  params: []

- id: mute_status_request
  label: 078-4. Mute Status Request
  kind: query
  command: "00h  85h  00h  00h  01h  03h  89h"
  params: []
  notes: "Response DATA01=Picture mute, DATA02=Sound mute, DATA03=Onscreen mute, DATA04=Forced onscreen mute, DATA05=Onscreen display."

- id: model_name_request
  label: 078-5. Model Name Request
  kind: query
  command: "00h  85h  00h  00h  01h  04h  8Ah"
  params: []

- id: cover_status_request
  label: 078-6. Cover Status Request
  kind: query
  command: "00h  85h  00h  00h  01h  05h  8Bh"
  params: []
  notes: "Response DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_control
  label: 079. Freeze Control
  kind: action
  command: "01h  98h  00h  00h  01h  <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "01h=Freeze on, 02h=Freeze off"

- id: information_string_request
  label: 084. Information String Request
  kind: query
  command: "00h  D0h  00h  00h  03h  00h  <DATA01>  01h  <CKS>"
  params:
    - name: data01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: 097-8. Eco Mode Request
  kind: query
  command: "03h  B0h  00h  00h  01h  07h  BBh"
  params: []
  notes: Returns "Light mode" or "Lamp mode" depending on projector. Value list UNRESOLVED - Appendix.

- id: lan_projector_name_request
  label: 097-45. LAN Projector Name Request
  kind: query
  command: "03h  B0h  00h  00h  01h  2Ch  E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: 097-155. LAN MAC Address Status Request 2
  kind: query
  command: "03h  B0h  00h  00h  02h  9Ah  00h  4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: 097-198. PIP/Picture By Picture Request
  kind: query
  command: "03h  B0h  00h  00h  02h  C5h  <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: 097-243-1. Edge Blending Mode Request
  kind: query
  command: "03h  B0h  00h  00h  02h  DFh  00h  94h"
  params: []

- id: eco_mode_set
  label: 098-8. Eco Mode Set
  kind: action
  command: "03h  B1h  00h  00h  02h  07h  <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Eco mode value. UNRESOLVED - list deferred to Appendix 'Supplementary Information by Command'."
  notes: Sets "Light mode" or "Lamp mode" depending on projector.

- id: lan_projector_name_set
  label: 098-45. LAN Projector Name Set
  kind: action
  command: "03h  B1h  00h  00h  12h  2Ch  <DATA01> - <DATA16>  00h  <CKS>"
  params:
    - name: name
      type: string
      description: "Projector name (up to 16 bytes), DATA01-16."

- id: pip_picture_by_picture_set
  label: 098-198. PIP/Picture By Picture Set
  kind: action
  command: "03h  B1h  00h  00h  03h  C5h  <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: integer
      description: "Setting value. MODE: 00h=PIP, 01h=PbP. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input values UNRESOLVED - Appendix."

- id: edge_blending_mode_set
  label: 098-243-1. Edge Blending Mode Set
  kind: action
  command: "03h  B1h  00h  00h  03h  DFh  00h  <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: base_model_type_request
  label: 305-1. Base Model Type Request
  kind: query
  command: "00h  BFh  00h  00h  01h  00h  C0h"
  params: []

- id: serial_number_request
  label: 305-2. Serial Number Request
  kind: query
  command: "00h  BFh  00h  00h  02h  01h  06h  C8h"
  params: []

- id: basic_information_request
  label: 305-3. Basic Information Request
  kind: query
  command: "00h  BFh  00h  00h  01h  02h  C2h"
  params: []
  notes: "Response DATA01=operation status, DATA02=content displayed, DATA03-05=signal types, DATA06-09=mutes/freeze."

- id: audio_select_set
  label: 319-10. Audio Select Set
  kind: action
  command: "03h  C9h  00h  00h  03h  09h  <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Input terminal code. UNRESOLVED - list deferred to Appendix."
    - name: data02
      type: integer
      description: "Setting value: 00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# One entry per observable state or query response. Most queries above return
# structured binary responses; observable state values documented below.
- id: power_state
  type: enum
  values: [standby, power_on, cooling]
  source: "078-2 DATA03: 00h=Standby, 01h=Power on; DATA06: 05h=Cooling"
- id: picture_mute_state
  type: enum
  values: [off, on]
  source: "078-4 DATA01"
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
  source: "305-3 DATA09"
- id: cover_state
  type: enum
  values: [normal_opened, closed]
  source: "078-6 DATA01"
- id: lamp_remaining_life_percent
  type: number
  source: "037-4 DATA02=04h, DATA03-06. Negative if past replacement deadline."
- id: error_flags
  type: bitmask
  source: "009 response DATA01-DATA12 - cover/fan/temp/lamp/formatter/interlock bits"
```

## Variables
```yaml
# Settable parameters that are not discrete actions.
- id: projector_name
  type: string
  max_length: 16
  set_via: "098-45 LAN PROJECTOR NAME SET"
  get_via: "097-45 LAN PROJECTOR NAME REQUEST"
- id: eco_mode
  type: enum
  set_via: "098-8 ECO MODE SET"
  get_via: "097-8 ECO MODE REQUEST"
  values: null  # UNRESOLVED - value list deferred to Appendix
- id: edge_blending_mode
  type: enum
  values: [off, on]
  set_via: "098-243-1 EDGE BLENDING MODE SET"
  get_via: "097-243-1 EDGE BLENDING MODE REQUEST"
- id: brightness
  type: integer
  set_via: "030-1 PICTURE ADJUST (DATA01=00h)"
  get_via: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=00h)"
- id: contrast
  type: integer
  set_via: "030-1 PICTURE ADJUST (DATA01=01h)"
  get_via: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=01h)"
- id: color
  type: integer
  set_via: "030-1 PICTURE ADJUST (DATA01=02h)"
  get_via: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=02h)"
- id: hue
  type: integer
  set_via: "030-1 PICTURE ADJUST (DATA01=03h)"
  get_via: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=03h)"
- id: sharpness
  type: integer
  set_via: "030-1 PICTURE ADJUST (DATA01=04h)"
  get_via: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=04h)"
- id: volume
  type: integer
  set_via: "030-2 VOLUME ADJUST"
  get_via: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=05h)"
- id: lamp_light_adjust
  type: integer
  set_via: "030-15 OTHER ADJUST (DATA01=96h)"
  get_via: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=96h)"
```

## Events
```yaml
# No unsolicited notifications documented. All responses are command-acknowledgement.
# UNRESOLVED: device may push async status - not stated in source.
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power ON (015): while turning on, no other command accepted."
  - "Power OFF (016): during power-off incl. cooling time, no other command accepted."
  - "Error code 02h 0Dh: command rejected when power is off."
# UNRESOLVED: no explicit safety warnings, power-on sequencing procedures, or
# hardware interlocks (other than command-rejection interlocks listed) stated in source.
```

## Notes
- Manual reference: BDT140013 Revision 7.1.
- Two transport options documented: RS-232C serial (D-SUB 9P cross cable) and LAN (wired RJ-45 10/100 or wireless LAN unit). TCP port 7142 for LAN.
- Serial cable pinout documented (RxD/TxD/GND/RTS/CTS) — see source connection section.
- Command framing: leading bytes set message class (00h–03h = request, 20h–23h = success response, A0h–A3h = error response). Second byte = command opcode. Followed by `<ID1> <ID2>`, length byte, data, checksum.
- Checksum: low-order byte of sum of all preceding bytes.
- Lamp/filter usage time returned in seconds, updated at 1-minute intervals.
- Many value lists (input terminal codes, aspect values, eco mode values, base model types, sub-input settings) are deferred by the source to an Appendix "Supplementary Information by Command" not contained in this refined document.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: input terminal DATA01 code list — deferred to Appendix -->
<!-- UNRESOLVED: aspect value list — deferred to Appendix -->
<!-- UNRESOLVED: eco mode value list — deferred to Appendix -->
<!-- UNRESOLVED: base model type value list — deferred to Appendix -->
<!-- UNRESOLVED: PIP/PbP sub-input setting value list — deferred to Appendix -->
<!-- UNRESOLVED: serial flow_control (hardware/software) — source only states "Full duplex" mode -->
<!-- UNRESOLVED: single fixed baud rate — source lists 5 selectable rates, no default stated -->
````

Spec built. 53 actions enumerate all source rows. Serial+TCP both populated (port 7142 stated). Baud left unresolved (5 selectable, no default). Appendix-deferred value lists marked UNRESOLVED throughout. Checksum framing preserved verbatim.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:11:28.923Z
last_checked_at: 2026-06-18T08:33:25.510Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:33:25.510Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal value list (DATA01 codes) referenced as Appendix \"Supplementary Information by Command\" — not in this refined doc. Eco mode values, base model type values, aspect values also deferred to that appendix."
- "source states \"Full duplex\" communication mode; flow_control hardware/software not specified"
- "device may push async status - not stated in source."
- "no explicit safety warnings, power-on sequencing procedures, or"
- "firmware version compatibility not stated in source"
- "input terminal DATA01 code list — deferred to Appendix"
- "aspect value list — deferred to Appendix"
- "eco mode value list — deferred to Appendix"
- "base model type value list — deferred to Appendix"
- "PIP/PbP sub-input setting value list — deferred to Appendix"
- "serial flow_control (hardware/software) — source only states \"Full duplex\" mode"
- "single fixed baud rate — source lists 5 selectable rates, no default stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
