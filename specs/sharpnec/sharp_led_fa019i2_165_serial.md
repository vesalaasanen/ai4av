---
spec_id: admin/sharp-nec-led-fa019i2-165
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FA019I2-165 Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FA019I2-165"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FA019I2-165"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:15:54.534Z
last_checked_at: 2026-06-17T20:38:43.117Z
generated_at: 2026-06-17T20:38:43.117Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model code (ID2) value for this specific model not stated in source"
  - "control ID (ID1) default not stated in source"
  - "firmware version compatibility not stated"
  - "appendix \"Supplementary Information by Command\" enumerations (input terminal values, aspect values, eco mode values, base model types) not present in refined source"
  - "source states \"Full duplex\" communication mode but no flow_control value"
  - "enumeration absent from refined source). Example 06h = video port.\""
  - "enumeration absent from refined source).\""
  - "enumeration absent).\""
  - "source describes no unsolicited notifications; all responses are request/reply."
  - "source documents no named multi-step macro sequences."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "model code (ID2) for LED FA019I2-165 not in source"
  - "control ID (ID1) default not stated"
  - "appendix enumerations for input terminal, aspect, eco mode, base model type, sub input values absent from refined source"
  - "flow_control value not stated"
verification:
  verdict: verified
  checked_at: 2026-06-17T20:38:43.117Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 hex command sequences verified as literal matches in source; transport parameters confirmed; one-to-one coverage with no gaps. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FA019I2-165 Control Spec

## Summary
Sharp/NEC LED FA019I2-165 large-format LED display / projector-class device. Control via RS-232C serial (PC CONTROL D-SUB 9P) and wired/wireless LAN (TCP port 7142). Binary command protocol with hex framing, checksum byte, control ID, model code, and data length fields. Spec covers full command catalogue from BDT140013 Rev 7.1 reference manual.

<!-- UNRESOLVED: model code (ID2) value for this specific model not stated in source -->
<!-- UNRESOLVED: control ID (ID1) default not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: appendix "Supplementary Information by Command" enumerations (input terminal values, aspect values, eco mode values, base model types) not present in refined source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source: 115200/38400/19200/9600/4800 bps supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: source states "Full duplex" communication mode but no flow_control value
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: 015 POWER ON / 016 POWER OFF commands present
  - queryable       # inferred: extensive query command set (009, 037, 078, 097, 305 series)
  - levelable       # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 030-15 OTHER ADJUST
```

## Actions
```yaml
actions:
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Response: 20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>. DATA1-12 = error bitmap."

  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "No other command accepted while power-on in progress."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "No other command accepted during power-off incl. cooling time."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal value (see Appendix Supplementary Information - UNRESOLVED: enumeration absent from refined source). Example 06h = video port."
    notes: "Checksum CKS = low byte of sum of all preceding bytes."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared by input/video switch."

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
    notes: "Cleared by input/video switch."

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
        type: byte
        description: "Adjustment target. 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
      - name: DATA02
        type: byte
        description: "Mode. 00h=absolute, 01h=relative."
      - name: DATA03
        type: byte
        description: "Value low-order 8 bits."
      - name: DATA04
        type: byte
        description: "Value high-order 8 bits."

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Mode. 00h=absolute, 01h=relative."
      - name: DATA02
        type: byte
        description: "Value low-order 8 bits."
      - name: DATA03
        type: byte
        description: "Value high-order 8 bits."

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Aspect value (see Appendix Supplementary Information - UNRESOLVED: enumeration absent from refined source)."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Target. 96h = LAMP ADJUST / LIGHT ADJUST."
      - name: DATA02
        type: byte
        description: "Must be FFh when DATA01=96h."
      - name: DATA03
        type: byte
        description: "Mode. 00h=absolute, 01h=relative."
      - name: DATA04
        type: byte
        description: "Value low-order 8 bits."
      - name: DATA05
        type: byte
        description: "Value high-order 8 bits."

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage time sec (DATA83-86), filter usage time sec (DATA87-90)."

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds; -1 if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Lamp selector. 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
      - name: DATA02
        type: byte
        description: "Content. 01h=usage time (sec), 04h=remaining life (%)."

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Key code low byte (WORD type). See key code list."
      - name: DATA02
        type: byte
        description: "Key code high byte. All documented keys have DATA02=00h."
    notes: "Key code list: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO."

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
        type: byte
        description: "Lens target. 06h=Periphery Focus."
      - name: DATA02
        type: byte
        description: "00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive +, 81h=drive -, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Lens target (per 053 LENS CONTROL)."
    notes: "Returns upper/lower limit and current value (DATA02-07)."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Lens target; FFh=Stop (mode/value ignored)."
      - name: DATA02
        type: byte
        description: "Mode. 00h=absolute, 02h=relative."
      - name: DATA03
        type: byte
        description: "Value low-order 8 bits."
      - name: DATA04
        type: byte
        description: "Value high-order 8 bits."

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET."

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET. Acts on profile selected by 053-10."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: DATA02
        type: byte
        description: "00h=OFF, 01h=ON."

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitmap: Bit0=lens memory, Bit1=zoom, Bit2=focus, Bit3=lens shift H, Bit4=lens shift V operation status (0=stop,1=operating)."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=Profile 1, 01h=Profile 2."

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
        type: byte
        description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/timer function (DATA05)."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status (DATA03), cooling (DATA04), power process (DATA05), operation status (DATA06)."

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch (DATA01), list number (DATA02), signal types (DATA03-04), test pattern (DATA06), content (DATA09)."

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture/sound/onscreen/forced-onscreen mute and OSD display state (DATA01-05)."

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Returns model name string DATA01-32 (NUL-terminated)."

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "DATA01: 00h=normal (cover opened), 01h=cover closed."

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "01h=freeze ON, 02h=freeze OFF."

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "03h=horizontal sync frequency, 04h=vertical sync frequency."

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns Light/Lamp mode value (see Appendix - UNRESOLVED: enumeration absent)."

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns projector name DATA01-17 (NUL-terminated)."

  - id: lan_mac_address_status_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns MAC address DATA01-06."

  - id: pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "DATA01: 00h=OFF, 01h=ON."

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Eco/Light/Lamp mode value (see Appendix - UNRESOLVED: enumeration absent)."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01-16} 00h {CKS}"
    params:
      - name: name
        type: string
        description: "Projector name, up to 16 bytes (DATA01-16)."

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: DATA02
        type: byte
        description: "MODE: 00h=PIP,01h=PbP. POSITION: 00h=TL,01h=TR,02h=BL,03h=BR. SUB INPUT: see Appendix (UNRESOLVED)."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=OFF, 01h=ON."

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type (DATA01-02, DATA12-13) and model name string (DATA03-11)."

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns serial number DATA01-16 (NUL-terminated)."

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze (DATA01-09)."

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal (see Appendix - UNRESOLVED: enumeration absent)."
      - name: DATA02
        type: byte
        description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
    source: "078-2 RUNNING STATUS REQUEST DATA03/DATA06"
  - id: error_status
    type: bitmap
    source: "009 ERROR STATUS REQUEST DATA01-12"
  - id: mute_state
    type: struct
    source: "078-4 MUTE STATUS REQUEST: picture/sound/onscreen/forced/OSD"
  - id: input_signal_status
    type: struct
    source: "078-3 INPUT STATUS REQUEST"
  - id: cover_status
    type: enum
    values: [normal_opened, closed]
    source: "078-6 COVER STATUS REQUEST DATA01"
  - id: lens_operation
    type: bitmap
    source: "053-7 LENS INFORMATION REQUEST DATA01"
```

## Variables
```yaml
variables:
  - id: brightness
    set_via: "030-1 PICTURE ADJUST (DATA01=00h)"
    query_via: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=00h)"
  - id: contrast
    set_via: "030-1 (DATA01=01h)"
    query_via: "060-1 (DATA01=01h)"
  - id: color
    set_via: "030-1 (DATA01=02h)"
    query_via: "060-1 (DATA01=02h)"
  - id: hue
    set_via: "030-1 (DATA01=03h)"
    query_via: "060-1 (DATA01=03h)"
  - id: sharpness
    set_via: "030-1 (DATA01=04h)"
    query_via: "060-1 (DATA01=04h)"
  - id: volume
    set_via: "030-2 VOLUME ADJUST"
    query_via: "060-1 (DATA01=05h)"
  - id: lamp_light_adjust
    set_via: "030-15 OTHER ADJUST (DATA01=96h)"
    query_via: "060-1 (DATA01=96h)"
  - id: eco_mode
    set_via: "098-8 ECO MODE SET"
    query_via: "097-8 ECO MODE REQUEST"
  - id: projector_name
    set_via: "098-45 LAN PROJECTOR NAME SET"
    query_via: "097-45 LAN PROJECTOR NAME REQUEST"
  - id: edge_blending_mode
    set_via: "098-243-1 EDGE BLENDING MODE SET"
    query_via: "097-243-1 EDGE BLENDING MODE REQUEST"
  - id: pip_pbp_setting
    set_via: "098-198 PIP/PbP SET"
    query_via: "097-198 PIP/PbP REQUEST"
  - id: lens_profile
    set_via: "053-10 LENS PROFILE SET"
    query_via: "053-11 LENS PROFILE REQUEST"
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications; all responses are request/reply.
events: []
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step macro sequences.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Power on/off commands block other commands
# during transitions (documented behaviour, not safety interlock).
```

## Notes
- Framing: every command/response hex byte sequence, `<ID1>` = control ID set on projector, `<ID2>` = model code (model-specific, value UNRESOLVED), `<CKS>` = checksum = low byte of sum of all preceding bytes, `<LEN>` = data length following LEN, `<ERR1>/<ERR2>` = response error codes.
- Response prefixes: `2xh` = success echo of command group `x`, `Axh` = error response. e.g. command `02h` → success `22h`, error `A2h`.
- Error code table (ERR1/ERR2): 00h/00h=unrecognized command; 00h/01h=command not supported by model; 01h/00h=invalid value; 01h/01h=invalid input terminal; 01h/02h=invalid language; 02h/00h=memory allocation; 02h/02h=memory in use; 02h/03h=value cannot be set; 02h/04h=forced onscreen mute on; 02h/06h=viewer error; 02h/07h=no signal; 02h/08h=test pattern/filter displayed; 02h/09h=no PC card; 02h/0Ah=memory op error; 02h/0Ch=entry list displayed; 02h/0Dh=command rejected (power off); 02h/0Eh=execution failed; 02h/0Fh=no authority; 03h/00h=incorrect gain number; 03h/01h=invalid gain; 03h/02h=adjustment failed.
- Serial: D-SUB 9P cross cable, PC CONTROL port. Pins: 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS.
- LAN: wired RJ-45 (10/100 auto) or optional wireless LAN unit. TCP port 7142.
- Lamp/filter usage time returned in 1-second units, updated at 1-minute intervals.
- Lamp remaining life (%) returns negative value past replacement deadline.
- LENS CONTROL: continuous-drive modes (7Fh/+ and 81h/-) require follow-up `00h` to stop.

<!-- UNRESOLVED: model code (ID2) for LED FA019I2-165 not in source -->
<!-- UNRESOLVED: control ID (ID1) default not stated -->
<!-- UNRESOLVED: appendix enumerations for input terminal, aspect, eco mode, base model type, sub input values absent from refined source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: flow_control value not stated -->
````

53 actions, one per source command row. Both serial + tcp emitted. Ports/baud/data-bits from source only.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:15:54.534Z
last_checked_at: 2026-06-17T20:38:43.117Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:38:43.117Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 hex command sequences verified as literal matches in source; transport parameters confirmed; one-to-one coverage with no gaps. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model code (ID2) value for this specific model not stated in source"
- "control ID (ID1) default not stated in source"
- "firmware version compatibility not stated"
- "appendix \"Supplementary Information by Command\" enumerations (input terminal values, aspect values, eco mode values, base model types) not present in refined source"
- "source states \"Full duplex\" communication mode but no flow_control value"
- "enumeration absent from refined source). Example 06h = video port.\""
- "enumeration absent from refined source).\""
- "enumeration absent).\""
- "source describes no unsolicited notifications; all responses are request/reply."
- "source documents no named multi-step macro sequences."
- "source contains no explicit safety warnings, interlock procedures,"
- "model code (ID2) for LED FA019I2-165 not in source"
- "control ID (ID1) default not stated"
- "appendix enumerations for input terminal, aspect, eco mode, base model type, sub input values absent from refined source"
- "flow_control value not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
