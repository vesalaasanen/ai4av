---
spec_id: admin/sharp-nec-v551
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC V551 Control Spec"
manufacturer: Sharp/NEC
model_family: V551
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - V551
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:38:48.943Z
last_checked_at: 2026-06-18T09:14:18.094Z
generated_at: 2026-06-18T09:14:18.094Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal value map, eco mode value map, aspect value map, sub-input value map, and base-model-type value map are referenced in an \"Appendix: Supplementary Information by Command\" that is not present in this source."
  - "flow control not stated; pin table shows RTS/CTS cross-wired but \"Communication mode: Full duplex\" is the only mode stated"
  - "eco mode value enum is in Appendix, not in this source"
  - "none documented in source."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "ID2 model code for V551 not stated."
  - "input-terminal value map (used by 018 INPUT SW CHANGE and 319-10 AUDIO SELECT SET) referenced but absent from this excerpt."
  - "eco-mode value map referenced but absent."
  - "aspect value map referenced but absent."
  - "sub-input setting value map (PIP/PbP) referenced but absent."
  - "base-model-type value map referenced but absent."
  - "serial flow_control not stated (RTS/CTS pins present in connector table but mode not declared)."
  - "firmware version compatibility not stated."
  - "voltage / power specs not present in this control-protocol excerpt."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:14:18.094Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC V551 Control Spec

## Summary
Projector control spec for the Sharp/NEC V551. Covers RS-232C serial and wired/wireless LAN (TCP) control using a binary, checksum-framed command protocol (document BDT140013 Rev 7.1). Supports power, input switching, mutes, lens/shutter, picture/volume adjust, status queries, and lens memory control.

<!-- UNRESOLVED: input terminal value map, eco mode value map, aspect value map, sub-input value map, and base-model-type value map are referenced in an "Appendix: Supplementary Information by Command" that is not present in this source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [4800, 9600, 19200, 38400, 115200]  # source lists all as switchable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; pin table shows RTS/CTS cross-wired but "Communication mode: Full duplex" is the only mode stated
addressing:
  port: 7142  # source: "Use TCP port number 7142"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON / POWER OFF commands present
  - routable        # inferred: INPUT SW CHANGE command present
  - queryable       # inferred: many status request commands present
  - levelable       # inferred: PICTURE ADJUST / VOLUME ADJUST present
```

## Actions
```yaml
# Commands use binary frames with checksum (CKS = low byte of sum of all
# preceding bytes). <ID1> = control ID, <ID2> = model code. Parameterized
# DATA?? fields shown as placeholders. All payloads verbatim from source.

actions:
  # --- 009. ERROR STATUS REQUEST ---
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []

  # --- 015. POWER ON ---
  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []

  # --- 016. POWER OFF ---
  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []

  # --- 018. INPUT SW CHANGE ---
  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"  # DATA01 = input terminal; e.g. 06h → video
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal code (see Appendix 'Supplementary Information by Command', not in this source)"

  # --- 020. PICTURE MUTE ON ---
  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []

  # --- 021. PICTURE MUTE OFF ---
  - id: picture_mute_off
    label: "021. PICTURE MUTE OFF"
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  # --- 022. SOUND MUTE ON ---
  - id: sound_mute_on
    label: "022. SOUND MUTE ON"
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []

  # --- 023. SOUND MUTE OFF ---
  - id: sound_mute_off
    label: "023. SOUND MUTE OFF"
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  # --- 024. ONSCREEN MUTE ON ---
  - id: onscreen_mute_on
    label: "024. ONSCREEN MUTE ON"
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []

  # --- 025. ONSCREEN MUTE OFF ---
  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  # --- 030-1. PICTURE ADJUST ---
  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: target
        type: integer
        description: "00h=Brightness 01h=Contrast 02h=Color 03h=Hue 04h=Sharpness"
      - name: mode
        type: integer
        description: "00h=absolute 01h=relative"
      - name: value
        type: integer
        description: "16-bit adjustment value (DATA03 low, DATA04 high); signed"

  # --- 030-2. VOLUME ADJUST ---
  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: mode
        type: integer
        description: "00h=absolute 01h=relative"
      - name: value
        type: integer
        description: "16-bit adjustment value (DATA02 low, DATA03 high)"

  # --- 030-12. ASPECT ADJUST ---
  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: aspect
        type: integer
        description: "Aspect value (see Appendix 'Supplementary Information by Command', not in this source)"

  # --- 030-15. OTHER ADJUST ---
  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: target
        type: integer
        description: "DATA01=96h, DATA02=FFh → LAMP ADJUST / LIGHT ADJUST"
      - name: mode
        type: integer
        description: "DATA03: 00h=absolute 01h=relative"
      - name: value
        type: integer
        description: "16-bit (DATA04 low, DATA05 high)"

  # --- 037. INFORMATION REQUEST ---
  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []

  # --- 037-3. FILTER USAGE INFORMATION REQUEST ---
  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []

  # --- 037-4. LAMP INFORMATION REQUEST 3 ---
  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: lamp
        type: integer
        description: "DATA01: 00h=Lamp1 01h=Lamp2 (two-lamp models only)"
      - name: content
        type: integer
        description: "DATA02: 01h=usage time(s) 04h=remaining life(%)"

  # --- 037-6. CARBON SAVINGS INFORMATION REQUEST ---
  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: content
        type: integer
        description: "DATA01: 00h=total 01h=during operation"

  # --- 050. REMOTE KEY CODE ---
  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: key_code
        type: integer
        description: "WORD key code (e.g. 05h 00h=AUTO, 06h 00h=MENU, 29h 00h=PICTURE, 4Bh 00h=COMPUTER1, D7h 00h=SOURCE, EEh 00h=LAMP MODE/ECO). Full list in source §3.19."

  # --- 051. SHUTTER CLOSE ---
  - id: shutter_close
    label: "051. SHUTTER CLOSE"
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  # --- 052. SHUTTER OPEN ---
  - id: shutter_open
    label: "052. SHUTTER OPEN"
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  # --- 053. LENS CONTROL ---
  - id: lens_control
    label: "053. LENS CONTROL"
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: integer
        description: "DATA01 (target enumerated elsewhere in source family; only 06h=Periphery Focus shown in this excerpt)"
      - name: motion
        type: integer
        description: "DATA02: 00h=Stop 01h=+1s 02h=+0.5s 03h=+0.25s 7Fh=+ 81h=- FDh=-0.25s FEh=-0.5s FFh=-1s"

  # --- 053-1. LENS CONTROL REQUEST ---
  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: target
        type: integer
        description: "DATA01 lens axis target"

  # --- 053-2. LENS CONTROL 2 ---
  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: target
        type: integer
        description: "DATA01; FFh=Stop (mode/value ignored)"
      - name: mode
        type: integer
        description: "DATA02: 00h=absolute 02h=relative"
      - name: value
        type: integer
        description: "16-bit (DATA03 low, DATA04 high)"

  # --- 053-3. LENS MEMORY CONTROL ---
  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: op
        type: integer
        description: "DATA01: 00h=MOVE 01h=STORE 02h=RESET"

  # --- 053-4. REFERENCE LENS MEMORY CONTROL ---
  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: op
        type: integer
        description: "DATA01: 00h=MOVE 01h=STORE 02h=RESET"

  # --- 053-5. LENS MEMORY OPTION REQUEST ---
  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: option
        type: integer
        description: "DATA01: 00h=LOAD BY SIGNAL 01h=FORCED MUTE"

  # --- 053-6. LENS MEMORY OPTION SET ---
  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: option
        type: integer
        description: "DATA01: 00h=LOAD BY SIGNAL 01h=FORCED MUTE"
      - name: value
        type: integer
        description: "DATA02: 00h=OFF 01h=ON"

  # --- 053-7. LENS INFORMATION REQUEST ---
  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

  # --- 053-10. LENS PROFILE SET ---
  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: profile
        type: integer
        description: "DATA01: 00h=Profile1 01h=Profile2"

  # --- 053-11. LENS PROFILE REQUEST ---
  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  # --- 060-1. GAIN PARAMETER REQUEST 3 ---
  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: target
        type: integer
        description: "DATA01: 00h=BRIGHTNESS 01h=CONTRAST 02h=COLOR 03h=HUE 04h=SHARPNESS 05h=VOLUME 96h=LAMP/LIGHT ADJUST"

  # --- 078-1. SETTING REQUEST ---
  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []

  # --- 078-2. RUNNING STATUS REQUEST ---
  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []

  # --- 078-3. INPUT STATUS REQUEST ---
  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []

  # --- 078-4. MUTE STATUS REQUEST ---
  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []

  # --- 078-5. MODEL NAME REQUEST ---
  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  # --- 078-6. COVER STATUS REQUEST ---
  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []

  # --- 079. FREEZE CONTROL ---
  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: state
        type: integer
        description: "DATA01: 01h=freeze on 02h=freeze off"

  # --- 084. INFORMATION STRING REQUEST ---
  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: info_type
        type: integer
        description: "DATA01: 03h=horizontal sync freq 04h=vertical sync freq"

  # --- 097-8. ECO MODE REQUEST ---
  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []

  # --- 097-45. LAN PROJECTOR NAME REQUEST ---
  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  # --- 097-155. LAN MAC ADDRESS STATUS REQUEST2 ---
  - id: lan_mac_address_status_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  # --- 097-198. PIP/PICTURE BY PICTURE REQUEST ---
  - id: pip_pbp_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: target
        type: integer
        description: "DATA01: 00h=MODE 01h=START POSITION 02h=SUB INPUT/SUB INPUT 1 09h=SUB INPUT 2 0Ah=SUB INPUT 3"

  # --- 097-243-1. EDGE BLENDING MODE REQUEST ---
  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  # --- 098-8. ECO MODE SET ---
  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: value
        type: integer
        description: "DATA01 eco mode value (see Appendix 'Supplementary Information by Command', not in this source)"

  # --- 098-45. LAN PROJECTOR NAME SET ---
  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
    params:
      - name: name
        type: string
        description: "Projector name, up to 16 bytes (DATA01-DATA16)"

  # --- 098-198. PIP/PICTURE BY PICTURE SET ---
  - id: pip_pbp_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: integer
        description: "DATA01: 00h=MODE 01h=START POSITION 02h=SUB INPUT/SUB INPUT 1 09h=SUB INPUT 2 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "DATA02; MODE→00h=PIP 01h=PbP; START POSITION→00h=TL 01h=TR 02h=BL 03h=BR; sub-input value map in Appendix"

  # --- 098-243-1. EDGE BLENDING MODE SET ---
  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: value
        type: integer
        description: "DATA01: 00h=OFF 01h=ON"

  # --- 305-1. BASE MODEL TYPE REQUEST ---
  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []

  # --- 305-2. SERIAL NUMBER REQUEST ---
  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  # --- 305-3. BASIC INFORMATION REQUEST ---
  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []

  # --- 319-10. AUDIO SELECT SET ---
  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: input_terminal
        type: integer
        description: "DATA01 input terminal code (Appendix, not in source)"
      - name: value
        type: integer
        description: "DATA02: 00h=terminal-specified 01h=BNC 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitmask
    source_query: error_status_request
    description: "12-byte error bitmask (DATA01-DATA12). Bit=1 indicates error (cover, fan, temp, lamp, etc.). Full bit map in source §3.1."

  - id: power_state
    type: enum
    source_query: running_status_request
    values: [standby, power_on]
    description: "DATA03 of RUNNING STATUS: 00h=Standby 01h=Power on"

  - id: cooling_process
    type: enum
    source_query: running_status_request
    values: [not_executed, during_execution]

  - id: operation_status
    type: enum
    source_query: running_status_request
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]

  - id: mute_status
    type: composite
    source_query: mute_status_request
    description: "Picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display (each 00h/01h)"

  - id: cover_status
    type: enum
    source_query: cover_status_request
    values: [normal_open, closed]

  - id: lamp_usage_time
    type: integer
    unit: seconds
    source_query: lamp_information_request_3
    description: "Updated at 1-minute intervals."

  - id: lamp_remaining_life
    type: integer
    unit: percent
    source_query: lamp_information_request_3
    description: "Negative if replacement deadline exceeded."

  - id: filter_usage_time
    type: integer
    unit: seconds
    source_query: filter_usage_information_request

  - id: lens_motion_status
    type: bitmask
    source_query: lens_information_request
    description: "DATA01 bits: lens memory / zoom / focus / lens-shift-H / lens-shift-V - each 0=Stop 1=During operation"

  - id: command_ack
    type: enum
    description: "Per-command response. 22h/23h prefix = success; A2h/A3h prefix + ERR1/ERR2 = error (see source §2.4 error code list)."
```

## Variables
```yaml
variables:
  - id: picture_brightness
    set_action: picture_adjust
    request_action: gain_parameter_request_3
    description: "PICTURE/BRIGHTNESS gain; range returned by GAIN PARAMETER REQUEST 3."

  - id: picture_contrast
    set_action: picture_adjust
    request_action: gain_parameter_request_3

  - id: picture_color
    set_action: picture_adjust
    request_action: gain_parameter_request_3

  - id: picture_hue
    set_action: picture_adjust
    request_action: gain_parameter_request_3

  - id: picture_sharpness
    set_action: picture_adjust
    request_action: gain_parameter_request_3

  - id: volume
    set_action: volume_adjust
    request_action: gain_parameter_request_3

  - id: lamp_light_adjust
    set_action: other_adjust
    request_action: gain_parameter_request_3

  - id: eco_mode
    set_action: eco_mode_set
    request_action: eco_mode_request
    # UNRESOLVED: eco mode value enum is in Appendix, not in this source

  - id: projector_name
    set_action: lan_projector_name_set
    request_action: lan_projector_name_request
    description: "Up to 16 bytes"
```

## Events
```yaml
# No unsolicited notifications documented. All responses are request/response.
# UNRESOLVED: none documented in source.
```

## Macros
```yaml
# No multi-step sequences explicitly documented as macros.
# UNRESOLVED: none documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: "While POWER ON is executing, no other command can be accepted. (source §3.2)"
  - command: power_off
    note: "While POWER OFF is executing (including cooling time), no other command can be accepted. (source §3.3)"
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements beyond the two command-lockout notes above.
```

## Notes
- **Frame format:** All commands/responses are hex byte streams. Layout: `<CMD> <SUB> <ID1> <ID2> <LEN> <DATA...> <CKS>` (per §2.1/2.2). Request frames prefix `00h-03h`; success-response prefixes are `20h`/`21h`/`22h`/`23h`; error-response prefixes are `A0h`/`A1h`/`A2h`/`A3h`.
- **Checksum (CKS):** low-order byte of the sum of all preceding bytes (§2.2).
- **ID1:** projector control ID. **ID2:** model code (varies by model, not enumerated in this source).
- **Error responses:** carry `ERR1`/`ERR2` byte pair; full error-code table in source §2.4 (29 codes, e.g. `02h 0Dh` = "command cannot be accepted because power is off").
- **Lens drive:** after sending continuous-direction codes (`7Fh`/`81h`), drive must be stopped explicitly with `00h` (§3.22).
- **Usage-time resolution:** lamp and filter usage times are stored in seconds but only refreshed by the projector at 1-minute intervals.

<!-- UNRESOLVED: ID2 model code for V551 not stated. -->
<!-- UNRESOLVED: input-terminal value map (used by 018 INPUT SW CHANGE and 319-10 AUDIO SELECT SET) referenced but absent from this excerpt. -->
<!-- UNRESOLVED: eco-mode value map referenced but absent. -->
<!-- UNRESOLVED: aspect value map referenced but absent. -->
<!-- UNRESOLVED: sub-input setting value map (PIP/PbP) referenced but absent. -->
<!-- UNRESOLVED: base-model-type value map referenced but absent. -->
<!-- UNRESOLVED: serial flow_control not stated (RTS/CTS pins present in connector table but mode not declared). -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: voltage / power specs not present in this control-protocol excerpt. -->
````

Spec above. 56 commands enumerated, all source rows covered. Gaps marked `UNRESOLVED` — biggest one: referenced Appendix ("Supplementary Information by Command") absent from excerpt, so input-terminal/eco/aspect/sub-input/base-model value maps missing.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:38:48.943Z
last_checked_at: 2026-06-18T09:14:18.094Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:14:18.094Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal value map, eco mode value map, aspect value map, sub-input value map, and base-model-type value map are referenced in an \"Appendix: Supplementary Information by Command\" that is not present in this source."
- "flow control not stated; pin table shows RTS/CTS cross-wired but \"Communication mode: Full duplex\" is the only mode stated"
- "eco mode value enum is in Appendix, not in this source"
- "none documented in source."
- "source contains no explicit safety warnings, interlock procedures,"
- "ID2 model code for V551 not stated."
- "input-terminal value map (used by 018 INPUT SW CHANGE and 319-10 AUDIO SELECT SET) referenced but absent from this excerpt."
- "eco-mode value map referenced but absent."
- "aspect value map referenced but absent."
- "sub-input setting value map (PIP/PbP) referenced but absent."
- "base-model-type value map referenced but absent."
- "serial flow_control not stated (RTS/CTS pins present in connector table but mode not declared)."
- "firmware version compatibility not stated."
- "voltage / power specs not present in this control-protocol excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
