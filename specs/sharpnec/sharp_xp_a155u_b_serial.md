---
spec_id: admin/sharp-nec-xp-a155u-b
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Xp A155U B Control Spec"
manufacturer: Sharp/NEC
model_family: "Xp A155U B"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Xp A155U B"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:46:23.778Z
last_checked_at: 2026-06-19T07:48:10.353Z
generated_at: 2026-06-19T07:48:10.353Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal value list, eco mode value list, aspect value list, and sub-input setting values are referenced to an \"Appendix: Supplementary Information by Command\" not included in this source excerpt."
  - "source states full-duplex communication mode but no explicit flow-control setting"
  - "full input terminal value list not in source excerpt\""
  - "aspect value list not in source excerpt\""
  - "eco mode value list not in source excerpt\""
  - "full value list not in source excerpt\""
  - "no events present in source"
  - "no macros present in source"
  - "no explicit power-on sequencing requirements or safety interlock procedures"
  - "input terminal value list (Appendix 'Supplementary Information by Command') not in source excerpt"
  - "eco mode value list (Appendix) not in source excerpt"
  - "aspect value list (Appendix) not in source excerpt"
  - "sub-input setting values for PIP/PbP (Appendix) not in source excerpt"
  - "base model type value list (Appendix) not in source excerpt"
  - "default baud rate among supported set not stated"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-19T07:48:10.353Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched exactly with source command documentation; transport parameters (port 7142, baud rates 4800-115200) verified in source; complete bidirectional coverage. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Xp A155U B Control Spec

## Summary
Control spec for the Sharp/NEC Xp A155U B projector (BDT140013 Rev 7.1 command reference). The device supports both RS-232C serial control and TCP/IP LAN control (port 7142). Commands are binary hex frames; each frame carries a checksum computed as the low-order byte of the sum of all preceding bytes.

<!-- UNRESOLVED: input terminal value list, eco mode value list, aspect value list, and sub-input setting values are referenced to an "Appendix: Supplementary Information by Command" not included in this source excerpt. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 4800  # source lists supported set: 4800/9600/19200/38400/115200 bps; default UNRESOLVED
  supported_baud_rates: [4800, 9600, 19200, 38400, 115200]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states full-duplex communication mode but no explicit flow-control setting
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: POWER ON (015) / POWER OFF (016) commands present
  - routable       # inferred: INPUT SW CHANGE (018) input switching present
  - queryable      # inferred: many status/information request commands present
  - levelable      # inferred: VOLUME ADJUST (030-2), PICTURE ADJUST (030-1), LENS CONTROL present
```

## Actions
```yaml
# Command frame: <CMD> ... <CKS>. CKS = low-order byte of sum of all preceding bytes.
# Responses: success uses 2xh/A-prefix bytes; error uses Axh with ERR1/ERR2/CKS.
# <ID1> = control ID; <ID2> = model code (varies by model).

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

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal byte (example: 06h = video port). Values in Appendix 'Supplementary Information by Command'. # UNRESOLVED: full input terminal value list not in source excerpt"

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
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

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
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Value set for the aspect (Appendix 'Supplementary Information by Command'). # UNRESOLVED: aspect value list not in source excerpt"

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte (e.g. 96h = LAMP/LIGHT ADJUST)"
    - name: DATA02
      type: integer
      description: "Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)"
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
      description: "Content: 01h=lamp usage time (sec), 04h=lamp remaining life (%)"

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
      description: "Key code low byte (see key code list)"
    - name: DATA02
      type: integer
      description: "Key code high byte (see key code list)"
  key_codes:
    - {key: 2, DATA01: "02h", DATA02: "00h", name: POWER ON}
    - {key: 3, DATA01: "03h", DATA02: "00h", name: POWER OFF}
    - {key: 5, DATA01: "05h", DATA02: "00h", name: AUTO}
    - {key: 6, DATA01: "06h", DATA02: "00h", name: MENU}
    - {key: 7, DATA01: "07h", DATA02: "00h", name: UP}
    - {key: 8, DATA01: "08h", DATA02: "00h", name: DOWN}
    - {key: 9, DATA01: "09h", DATA02: "00h", name: RIGHT}
    - {key: 10, DATA01: "0Ah", DATA02: "00h", name: LEFT}
    - {key: 11, DATA01: "0Bh", DATA02: "00h", name: ENTER}
    - {key: 12, DATA01: "0Ch", DATA02: "00h", name: EXIT}
    - {key: 13, DATA01: "0Dh", DATA02: "00h", name: HELP}
    - {key: 15, DATA01: "0Fh", DATA02: "00h", name: MAGNIFY UP}
    - {key: 16, DATA01: "10h", DATA02: "00h", name: MAGNIFY DOWN}
    - {key: 19, DATA01: "13h", DATA02: "00h", name: MUTE}
    - {key: 41, DATA01: "29h", DATA02: "00h", name: PICTURE}
    - {key: 75, DATA01: "4Bh", DATA02: "00h", name: COMPUTER1}
    - {key: 76, DATA01: "4Ch", DATA02: "00h", name: COMPUTER2}
    - {key: 79, DATA01: "4Fh", DATA02: "00h", name: VIDEO1}
    - {key: 81, DATA01: "51h", DATA02: "00h", name: S-VIDEO1}
    - {key: 132, DATA01: "84h", DATA02: "00h", name: VOLUME UP}
    - {key: 133, DATA01: "85h", DATA02: "00h", name: VOLUME DOWN}
    - {key: 138, DATA01: "8Ah", DATA02: "00h", name: FREEZE}
    - {key: 163, DATA01: "A3h", DATA02: "00h", name: ASPECT}
    - {key: 215, DATA01: "D7h", DATA02: "00h", name: SOURCE}
    - {key: 238, DATA01: "EEh", DATA02: "00h", name: LAMP MODE/ECO}

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
      description: "Lens target (e.g. 06h = Periphery Focus)"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h/+1s, 02h/+0.5s, 03h/+0.25s, 7Fh=drive plus, 81h=drive minus, FDh/-0.25s, FEh/-0.5s, FFh/-1s"

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target"

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (FFh = Stop)"
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
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=horizontal sync frequency, 04h=vertical sync frequency"

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

- id: lan_mac_address_status_request2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
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
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
      description: "Value set for the eco mode (Appendix 'Supplementary Information by Command'). # UNRESOLVED: eco mode value list not in source excerpt"

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {DATA06} {DATA07} {DATA08} {DATA09} {DATA10} {DATA11} {DATA12} {DATA13} {DATA14} {DATA15} {DATA16} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Projector name byte 1 (up to 16 bytes total)"

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (MODE: 00h=PIP/01h=PiP-by-PiP; START POSITION: 00h-03h corners; sub-input values in Appendix)"

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

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
      description: "Input terminal (Appendix 'Supplementary Information by Command'). # UNRESOLVED: full value list not in source excerpt"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Error response frame (all commands): Axh <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
- id: command_error
  type: error
  values:
    - {ERR1: "00h", ERR2: "00h", description: "The command cannot be recognized."}
    - {ERR1: "00h", ERR2: "01h", description: "The command is not supported by the model in use."}
    - {ERR1: "01h", ERR2: "00h", description: "The specified value is invalid."}
    - {ERR1: "01h", ERR2: "01h", description: "The specified input terminal is invalid."}
    - {ERR1: "01h", ERR2: "02h", description: "The specified language is invalid."}
    - {ERR1: "02h", ERR2: "00h", description: "Memory allocation error"}
    - {ERR1: "02h", ERR2: "02h", description: "Memory in use"}
    - {ERR1: "02h", ERR2: "03h", description: "The specified value cannot be set."}
    - {ERR1: "02h", ERR2: "04h", description: "Forced onscreen mute on"}
    - {ERR1: "02h", ERR2: "06h", description: "Viewer error"}
    - {ERR1: "02h", ERR2: "07h", description: "No signal"}
    - {ERR1: "02h", ERR2: "08h", description: "A test pattern or filter is displayed."}
    - {ERR1: "02h", ERR2: "09h", description: "No PC card is inserted."}
    - {ERR1: "02h", ERR2: "0Ah", description: "Memory operation error"}
    - {ERR1: "02h", ERR2: "0Ch", description: "An entry list is displayed."}
    - {ERR1: "02h", ERR2: "0Dh", description: "The command cannot be accepted because the power is off."}
    - {ERR1: "02h", ERR2: "0Eh", description: "The command execution failed."}
    - {ERR1: "02h", ERR2: "0Fh", description: "There is no authority necessary for the operation."}
    - {ERR1: "03h", ERR2: "00h", description: "The specified gain number is incorrect."}
    - {ERR1: "03h", ERR2: "01h", description: "The specified gain is invalid."}
    - {ERR1: "03h", ERR2: "02h", description: "Adjustment failed."}

- id: error_status_bits
  type: bitmap
  description: "009 response DATA01-DATA12 error information; bit=1 indicates error"
```

## Variables
```yaml
# Query responses return dynamic values (lamp usage time, filter usage time, gain ranges,
# model name, serial number, MAC address, etc.). These are read via the query Actions above.
# No standalone settable parameter variables beyond those expressed as Actions.
```

## Events
```yaml
# Source describes only command/response. No unsolicited notification events documented.
# UNRESOLVED: no events present in source
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
# UNRESOLVED: no macros present in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON (015): while turning on power, no other command can be accepted."
  - "POWER OFF (016): while turning off power (including cooling time), no other command can be accepted."
  - "PICTURE/SOUND/ONSCREEN mute turned off automatically on input terminal switch or video signal switch."
  - "Sound mute turned off on sound volume adjustment."
# UNRESOLVED: no explicit power-on sequencing requirements or safety interlock procedures
# beyond command-acceptance locks stated in source.
```

## Notes
- Command reference manual revision: BDT140013 Rev 7.1.
- Serial cable must be a cross cable; connect to PC CONTROL port (D-SUB 9P). Pinout: 2(RxD)/3(TxD)/5(GND)/7(RTS)/8(CTS).
- LAN wired: 10/100 Mbps auto-switchable (IEEE802.3, IEEE802.3u). Wireless LAN via optional wireless LAN unit (see separate manual).
- Checksum (CKS): low-order one byte of the sum of all preceding bytes. Example: `20h+81h+01h+60h+01h+00h=103h → CKS=03h`.
- Success response opcode prefix is `2xh` (e.g. 22h/23h); error response opcode prefix is `Axh` (e.g. A2h/A3h) with ERR1/ERR2.
- <ID1> = control ID set on projector; <ID2> = model code (varies by model, not fixed in this source).
- Lamp usage time and filter usage time update at one-minute intervals though returned in one-second units.
- Lamp remaining life (%) returns negative if lamp replacement deadline is exceeded.
- Edge blending SET response in source lists DATA02 return values as `00h/01h` (likely mirrors setting 00h/01h).
<!-- UNRESOLVED: input terminal value list (Appendix 'Supplementary Information by Command') not in source excerpt -->
<!-- UNRESOLVED: eco mode value list (Appendix) not in source excerpt -->
<!-- UNRESOLVED: aspect value list (Appendix) not in source excerpt -->
<!-- UNRESOLVED: sub-input setting values for PIP/PbP (Appendix) not in source excerpt -->
<!-- UNRESOLVED: base model type value list (Appendix) not in source excerpt -->
<!-- UNRESOLVED: default baud rate among supported set not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:46:23.778Z
last_checked_at: 2026-06-19T07:48:10.353Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:48:10.353Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched exactly with source command documentation; transport parameters (port 7142, baud rates 4800-115200) verified in source; complete bidirectional coverage. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal value list, eco mode value list, aspect value list, and sub-input setting values are referenced to an \"Appendix: Supplementary Information by Command\" not included in this source excerpt."
- "source states full-duplex communication mode but no explicit flow-control setting"
- "full input terminal value list not in source excerpt\""
- "aspect value list not in source excerpt\""
- "eco mode value list not in source excerpt\""
- "full value list not in source excerpt\""
- "no events present in source"
- "no macros present in source"
- "no explicit power-on sequencing requirements or safety interlock procedures"
- "input terminal value list (Appendix 'Supplementary Information by Command') not in source excerpt"
- "eco mode value list (Appendix) not in source excerpt"
- "aspect value list (Appendix) not in source excerpt"
- "sub-input setting values for PIP/PbP (Appendix) not in source excerpt"
- "base model type value list (Appendix) not in source excerpt"
- "default baud rate among supported set not stated"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
