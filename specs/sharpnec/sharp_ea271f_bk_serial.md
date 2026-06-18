---
spec_id: admin/sharp-nec-ea271f-bk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC EA271F BK Control Spec"
manufacturer: Sharp/NEC
model_family: "EA271F BK"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "EA271F BK"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:02:02.407Z
last_checked_at: 2026-06-17T19:56:54.128Z
generated_at: 2026-06-17T19:56:54.128Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The input metadata names the device \"EA271F BK\" (a desktop monitor model line), but the source document is a generic Projector Control Command Reference (lamps, lens shift, shutter, edge blending, lamp usage). Model applicability of this protocol to the EA271F BK is NOT verified in the source — flag for human review before publishing."
  - "firmware version compatibility not stated in source"
  - "ID2 model code values per device not enumerated in source"
  - "flow control not stated in source (only \"Full duplex\" communication mode stated)"
  - "appendix values not present in refined source).\""
  - "values listed only in source Appendix 'Supplementary Information by Command').\""
  - "enum values listed only in source Appendix 'Supplementary Information by Command').\""
  - "enum values in source Appendix."
  - "no unsolicited notification documented in source; protocol is request/response only."
  - "no multi-step sequences described in source."
  - "no formal safety interlock procedure or power-on sequencing requirement stated in source."
  - "Appendix \"Supplementary Information by Command\" (input terminal codes, aspect values, eco-mode values, sub-input values, base-model-type codes, ID2 model code) not present in refined source — several param enums incomplete."
  - "Model mismatch — input device \"EA271F BK\" (monitor line) vs source \"Projector Control Command Reference Manual\"; verify this protocol applies to the target device."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:56:54.128Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec command codes matched verbatim in source; transport parameters (port 7142, serial baud rates) confirmed. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC EA271F BK Control Spec

## Summary
Binary RS-232C / TCP control protocol for the Sharp/NEC device. Source document is titled "Projector Control Command Reference Manual" (BDT140013 Revision 7.1) and documents a hex-framed command set covering power, input switching, mute, picture/volume/aspect adjust, lens control, lens memory, status queries, and network settings. Commands are sent as hex byte frames terminated with a modulo-256 checksum (CKS).

<!-- UNRESOLVED: The input metadata names the device "EA271F BK" (a desktop monitor model line), but the source document is a generic Projector Control Command Reference (lamps, lens shift, shutter, edge blending, lamp usage). Model applicability of this protocol to the EA271F BK is NOT verified in the source — flag for human review before publishing. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: ID2 model code values per device not enumerated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # source: "Use TCP port number 7142 for sending and receiving commands."
serial:
  baud_rate:
    - 115200
    - 38400
    - 19200
    - 9600
    - 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (only "Full duplex" communication mode stated)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present (015, 016)
  - routable     # inferred: INPUT SW CHANGE command present (018)
  - queryable    # inferred: many status request commands present (078-*, 037-*, etc.)
  - levelable    # inferred: PICTURE ADJUST / VOLUME ADJUST commands present (030-1, 030-2)
```

## Actions
```yaml
# Frame format (hex): <HDR> <CMD1> <CMD2> 00h 00h <LEN> <DATA...> <CKS>
# HDR by message class: 00h/01h/02h/03h = request, 20h/21h/22h/23h = ack response,
#                       A0h/A1h/A2h/A3h = error response.
# CKS = low-order byte of sum of all preceding bytes (mod 256).
# ID1 = control ID, ID2 = model code (values per device, UNRESOLVED).

actions:
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
    notes: While turning on, no other command accepted.

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: During power-off (incl. cooling time), no other command accepted.

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {input} {checksum}"
    params:
      - name: input
        type: byte
        description: "DATA01 input terminal code (e.g. 06h = video port). Full list in source Appendix 'Supplementary Information by Command' (UNRESOLVED: appendix values not present in refined source)."

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
    command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: byte
        description: "DATA01: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: byte
        description: "DATA02: 00h=absolute, 01h=relative"
      - name: value_lo
        type: byte
        description: "DATA03 adjustment value (low 8 bits)"
      - name: value_hi
        type: byte
        description: "DATA04 adjustment value (high 8 bits)"

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: mode
        type: byte
        description: "DATA01: 00h=absolute, 01h=relative"
      - name: value_lo
        type: byte
        description: "DATA02 adjustment value (low 8 bits)"
      - name: value_hi
        type: byte
        description: "DATA03 adjustment value (high 8 bits)"

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {aspect} 00h {checksum}"
    params:
      - name: aspect
        type: byte
        description: "DATA01 aspect value (UNRESOLVED: values listed only in source Appendix 'Supplementary Information by Command')."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {target_lo} {target_hi} {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target_lo
        type: byte
        description: "DATA01: 96h for LAMP ADJUST / LIGHT ADJUST"
      - name: target_hi
        type: byte
        description: "DATA02: FFh for LAMP ADJUST / LIGHT ADJUST"
      - name: mode
        type: byte
        description: "DATA03: 00h=absolute, 01h=relative"
      - name: value_lo
        type: byte
        description: "DATA04 adjustment value (low 8 bits)"
      - name: value_hi
        type: byte
        description: "DATA05 adjustment value (high 8 bits)"

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: Returns projector name (DATA01-49), lamp usage time sec (DATA83-86), filter usage time sec (DATA87-90).

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08), in seconds. -1 if undefined.

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {lamp} {content} {checksum}"
    params:
      - name: lamp
        type: byte
        description: "DATA01: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: content
        type: byte
        description: "DATA02: 01h=lamp usage time (sec), 04h=lamp remaining life (%)"

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {content} {checksum}"
    params:
      - name: content
        type: byte
        description: "DATA01: 00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {keycode_lo} {keycode_hi} {checksum}"
    params:
      - name: keycode_lo
        type: byte
        description: "DATA01 low byte of WORD key code (see key code list in source)"
      - name: keycode_hi
        type: byte
        description: "DATA02 high byte of WORD key code"
    notes: "Key code list includes: POWER ON(02h), POWER OFF(03h), AUTO(05h), MENU(06h), UP(07h), DOWN(08h), RIGHT(09h), LEFT(0Ah), ENTER(0Bh), EXIT(0Ch), HELP(0Dh), MAGNIFY UP(0Fh), MAGNIFY DOWN(10h), MUTE(13h), PICTURE(29h), COMPUTER1(4Bh), COMPUTER2(4Ch), VIDEO1(4Fh), S-VIDEO1(51h), VOLUME UP(84h), VOLUME DOWN(85h), FREEZE(8Ah), ASPECT(A3h), SOURCE(D7h), LAMP MODE/ECO(EEh)."

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
    command: "02h 18h 00h 00h 02h {target} {content} {checksum}"
    params:
      - name: target
        type: byte
        description: "DATA01: 06h=Periphery Focus"
      - name: content
        type: byte
        description: "DATA02: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {target} 00h {checksum}"
    params:
      - name: target
        type: byte
        description: "DATA01 lens axis to query"
    notes: Returns upper/lower limit and current value (16-bit) for the axis.

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: byte
        description: "DATA01: FFh=Stop"
      - name: mode
        type: byte
        description: "DATA02: 00h=absolute, 02h=relative"
      - name: value_lo
        type: byte
        description: "DATA03 adjustment value (low 8 bits)"
      - name: value_hi
        type: byte
        description: "DATA04 adjustment value (high 8 bits)"

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {operation} {checksum}"
    params:
      - name: operation
        type: byte
        description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {operation} {checksum}"
    params:
      - name: operation
        type: byte
        description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"
    notes: Controls profile selected by 053-10 LENS PROFILE SET.

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {option} {checksum}"
    params:
      - name: option
        type: byte
        description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {option} {value} {checksum}"
    params:
      - name: option
        type: byte
        description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: value
        type: byte
        description: "DATA02: 00h=OFF, 01h=ON"

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: Returns DATA01 bitmask: bit0=lens memory, bit1=zoom, bit2=focus, bit3=lens shift(H), bit4=lens shift(V) operation status (0=Stop, 1=During operation).

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {profile} {checksum}"
    params:
      - name: profile
        type: byte
        description: "DATA01: 00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {name} 00h 00h {checksum}"
    params:
      - name: name
        type: byte
        description: "DATA01: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    notes: Returns status, upper/lower limits, default, current value, wide/narrow adjustment widths.

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: Returns base model type (DATA01-03), sound function (DATA04), profile (DATA05).

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: Returns power status (DATA03), cooling process (DATA04), power on/off process (DATA05), operation status (DATA06).

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: Returns signal switch process, signal list number, selection signal types, content displayed.

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: Returns picture/sound/onscreen/forced-onscreen mute and OSD display states.

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
    notes: "DATA01: 00h=Normal (cover opened), 01h=Cover closed"

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {state} {checksum}"
    params:
      - name: state
        type: byte
        description: "DATA01: 01h=freeze ON, 02h=freeze OFF"

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {info_type} 01h {checksum}"
    params:
      - name: info_type
        type: byte
        description: "DATA01: 03h=horizontal sync frequency, 04h=vertical sync frequency"

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

  - id: lan_mac_address_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_pbypicture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {item} {checksum}"
    params:
      - name: item
        type: byte
        description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {value} {checksum}"
    params:
      - name: value
        type: byte
        description: "DATA01 eco mode value (UNRESOLVED: enum values listed only in source Appendix 'Supplementary Information by Command')."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {name01} ... {name16} 00h {checksum}"
    params:
      - name: name
        type: string
        description: "DATA01-16 projector name (up to 16 bytes, NUL-terminated)"

  - id: pip_pbypicture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {item} {value} {checksum}"
    params:
      - name: item
        type: byte
        description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: byte
        description: "DATA02 setting value (MODE: 00h=PIP,01h=PbP; POSITION: 00h=TL,01h=TR,02h=BL,03h=BR; sub input values in source Appendix)"

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {value} {checksum}"
    params:
      - name: value
        type: byte
        description: "DATA01: 00h=OFF, 01h=ON"

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
    notes: Returns operation status, content displayed, signal types, display signal type, video/sound/onscreen mute, freeze status.

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {input} {value} {checksum}"
    params:
      - name: input
        type: byte
        description: "DATA01 input terminal (values in source Appendix)"
      - name: value
        type: byte
        description: "DATA02: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitmask
    description: "Response to 009 ERROR STATUS REQUEST. DATA01-12 bitmask: cover/fan/temp/power/lamp errors, lamp usage exceeded, formatter/FPGA errors, mirror cover, foreign matter, iris calibration, interlock switch open, system errors. See source error information list."
  - id: execution_result
    type: enum
    values: ["success", "error"]
    description: "Generic 16-bit result returned by set/adjust commands (0000h=success, other=error)."
  - id: lamp_information
    type: numeric
    description: "Lamp usage time (seconds) or remaining life (%) returned by 037-4."
  - id: running_status
    type: enum
    values: ["standby_sleep", "power_on", "cooling", "standby_error", "standby_power_saving", "network_standby"]
    description: "DATA06 operation status from 078-2."
  - id: mute_status
    type: bitmask
    description: "Picture/sound/onscreen/forced-onscreen mute + OSD state from 078-4."
```

## Variables
```yaml
variables:
  - id: picture_brightness
    type: integer
    description: Brightness (set via 030-1 target 00h, query via 060-1 name 00h)
  - id: picture_contrast
    type: integer
    description: Contrast (030-1 target 01h / 060-1 name 01h)
  - id: picture_color
    type: integer
    description: Color (030-1 target 02h / 060-1 name 02h)
  - id: picture_hue
    type: integer
    description: Hue (030-1 target 03h / 060-1 name 03h)
  - id: picture_sharpness
    type: integer
    description: Sharpness (030-1 target 04h / 060-1 name 04h)
  - id: volume
    type: integer
    description: Sound volume (set via 030-2, query via 060-1 name 05h)
  - id: lamp_light_adjust
    type: integer
    description: Lamp/Light adjust (030-15 target 96h/FFh / 060-1 name 96h)
  - id: eco_mode
    type: enum
    description: Eco/Light/Lamp mode (set 098-8, query 097-8). # UNRESOLVED: enum values in source Appendix.
  - id: lan_projector_name
    type: string
    description: Projector name (set 098-45, query 097-45, up to 16 bytes)
  - id: edge_blending_mode
    type: enum
    values: ["off", "on"]
    description: Edge blending (set 098-243-1, query 097-243-1)
```

## Events
```yaml
events: []  # UNRESOLVED: no unsolicited notification documented in source; protocol is request/response only.
```

## Macros
```yaml
macros: []  # UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: |
  Source documents power-state interlocks in prose only, not as machine-enforceable
  procedures: POWER ON/OFF commands reject all other commands while power transition
  (including cooling) is in progress. Error code 02h/0Dh ("command cannot be accepted
  because the power is off") and 02h/04h ("Forced onscreen mute on") are status
  conditions, not user-facing interlocks.
  # UNRESOLVED: no formal safety interlock procedure or power-on sequencing requirement stated in source.
```

## Notes
- **Frame structure:** Request/response hex frames. Byte 1 (HDR) by message class: `00h/01h/02h/03h` request, `20h/21h/22h/23h` success ack, `A0h/A1h/A2h/A3h` error response. Byte 2 = command code, byte 5 = LEN (data length following LEN), trailing byte = CKS.
- **Checksum (CKS):** low-order one byte of the sum of all preceding bytes (mod 256). Worked example in source: `20h 81h 01h 60h 01h 00h` → `103h` → CKS = `03h`.
- **Common params:** `ID1` = control ID set on projector; `ID2` = model code (varies by model, UNRESOLVED).
- **Error responses:** carry `ERR1`/`ERR2` code pair (see source error code list, e.g. `00h 00h`=unrecognized command, `01h 00h`=invalid value, `02h 0Dh`=power off, `02h 0Eh`=execution failed).
- **Input terminal / aspect / eco-mode / sub-input enum values:** referenced in source "Appendix: Supplementary Information by Command" which is NOT present in the refined source file. Several actions therefore carry `UNRESOLVED` param enums.
- **Usage-time resolution:** lamp/filter usage time returned in one-second units but updated at one-minute intervals.
- **Two-lamp models:** lamp 2 (`DATA01=01h`) only valid on two-lamp projectors.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input terminal codes, aspect values, eco-mode values, sub-input values, base-model-type codes, ID2 model code) not present in refined source — several param enums incomplete. -->
<!-- UNRESOLVED: Model mismatch — input device "EA271F BK" (monitor line) vs source "Projector Control Command Reference Manual"; verify this protocol applies to the target device. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
```

Spec built. 53 actions, all hex payloads verbatim. Serial+TCP transport, port 7142, baud set listed. Big flag: model mismatch (EA271F monitor vs projector manual) + missing appendix enums. Ready for ingest.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:02:02.407Z
last_checked_at: 2026-06-17T19:56:54.128Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:56:54.128Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec command codes matched verbatim in source; transport parameters (port 7142, serial baud rates) confirmed. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The input metadata names the device \"EA271F BK\" (a desktop monitor model line), but the source document is a generic Projector Control Command Reference (lamps, lens shift, shutter, edge blending, lamp usage). Model applicability of this protocol to the EA271F BK is NOT verified in the source — flag for human review before publishing."
- "firmware version compatibility not stated in source"
- "ID2 model code values per device not enumerated in source"
- "flow control not stated in source (only \"Full duplex\" communication mode stated)"
- "appendix values not present in refined source).\""
- "values listed only in source Appendix 'Supplementary Information by Command').\""
- "enum values listed only in source Appendix 'Supplementary Information by Command').\""
- "enum values in source Appendix."
- "no unsolicited notification documented in source; protocol is request/response only."
- "no multi-step sequences described in source."
- "no formal safety interlock procedure or power-on sequencing requirement stated in source."
- "Appendix \"Supplementary Information by Command\" (input terminal codes, aspect values, eco-mode values, sub-input values, base-model-type codes, ID2 model code) not present in refined source — several param enums incomplete."
- "Model mismatch — input device \"EA271F BK\" (monitor line) vs source \"Projector Control Command Reference Manual\"; verify this protocol applies to the target device."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
