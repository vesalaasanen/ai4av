---
spec_id: admin/sharpnec-c861q-mpi
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC C861Q Mpi Control Spec"
manufacturer: Sharp/NEC
model_family: "C861Q Mpi"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "C861Q Mpi"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:57:59.234Z
last_checked_at: 2026-06-17T19:38:57.937Z
generated_at: 2026-06-17T19:38:57.937Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input-terminal value map, eco-mode value map, and \"Supplementary Information by Command\" appendix values are referenced by the source but not reproduced here. Firmware version compatibility not stated."
  - "flow control not stated in source (full-duplex mode stated)"
  - "bounds returned by 060-1 response, not fixed in source"
  - "source documents no unsolicited notifications; device is poll/response only."
  - "source documents no explicit multi-step sequences."
  - "no explicit external-interlock wiring or power-on sequencing steps beyond the command lockout notes."
  - "ID1 (control ID) and ID2 (model code) default values for C861Q Mpi not stated in this excerpt."
  - "Appendix \"Supplementary Information by Command\" referenced for input-terminal values, eco-mode values, aspect values, sub-input values, base-model-type codes — not present in this refined excerpt."
  - "flow_control mode (RTS/CTS pinout shown in pin table but no explicit hardware/software flow-control policy stated)."
  - "firmware version compatibility range not stated."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:38:57.937Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match literal hex commands from the source protocol reference; transport parameters verified; source command inventory fully represented. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC C861Q Mpi Control Spec

## Summary
Projector Control Command Reference (BDT140013 Rev 7.1) for the Sharp/NEC C861Q Mpi projector. Binary framing protocol over RS-232C serial (D-SUB 9P cross cable) and/or wired/wireless LAN (TCP port 7142). Commands use a fixed-frame hex layout: `20h/02h/03h/01h/00h <opcode> 00h 00h <LEN> <DATA...> <CKS>` with low-byte checksum of all preceding bytes.

<!-- UNRESOLVED: input-terminal value map, eco-mode value map, and "Supplementary Information by Command" appendix values are referenced by the source but not reproduced here. Firmware version compatibility not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists all as supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (full-duplex mode stated)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred: POWER ON / POWER OFF commands present
  - queryable     # inferred: many status/info request commands present
  - levelable     # inferred: PICTURE/VOLUME/LAMP ADJUST commands present
```

## Actions
```yaml
actions:
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Response returns DATA01-DATA12 bitfield error status; see source error info list."

  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "While turning power on, no other command accepted."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "During power-off (incl. cooling time) no other command accepted."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {input} {checksum}"
    params:
      - name: input
        type: string
        description: "DATA01 input terminal hex byte (e.g. 06h = video). See Appendix 'Supplementary Information by Command'."
      - name: checksum
        type: string
        description: "Computed CKS = low byte of sum of all preceding bytes."

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
        type: string
        description: "DATA01: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: string
        description: "DATA02: 00h=absolute, 01h=relative"
      - name: value_lo
        type: string
        description: "DATA03 low-order 8 bits"
      - name: value_hi
        type: string
        description: "DATA04 high-order 8 bits"
      - name: checksum
        type: string

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: mode
        type: string
        description: "DATA01: 00h=absolute, 01h=relative"
      - name: value_lo
        type: string
      - name: value_hi
        type: string
      - name: checksum
        type: string

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {value} 00h {checksum}"
    params:
      - name: value
        type: string
        description: "DATA01 aspect value (see Appendix 'Supplementary Information by Command')"
      - name: checksum
        type: string

  - id: other_adjust_lamp_light
    label: "030-15. OTHER ADJUST (LAMP/LIGHT)"
    kind: action
    command: "03h 10h 00h 00h 05h 96h FFh {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: mode
        type: string
        description: "DATA03: 00h=absolute, 01h=relative"
      - name: value_lo
        type: string
      - name: value_hi
        type: string
      - name: checksum
        type: string
    notes: "DATA01=96h DATA02=FFh selects LAMP ADJUST / LIGHT ADJUST."

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name, lamp usage time, filter usage time. Updates at 1-min intervals."

  - id: filter_usage_info_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []

  - id: lamp_info_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {lamp} {content} {checksum}"
    params:
      - name: lamp
        type: string
        description: "DATA01: 00h=Lamp1, 01h=Lamp2 (two-lamp models only)"
      - name: content
        type: string
        description: "DATA02: 01h=usage time (s), 04h=remaining life (%)"
      - name: checksum
        type: string

  - id: carbon_savings_info_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {type} {checksum}"
    params:
      - name: type
        type: string
        description: "DATA01: 00h=Total, 01h=during operation"
      - name: checksum
        type: string

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {key_lo} {key_hi} {checksum}"
    params:
      - name: key_lo
        type: string
        description: "DATA01 low byte of WORD key code (see source Key code list, e.g. 05h=AUTO)"
      - name: key_hi
        type: string
        description: "DATA02 high byte (typically 00h)"
      - name: checksum
        type: string

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
    command: "02h 18h 00h 00h 02h {target} {motion} {checksum}"
    params:
      - name: target
        type: string
        description: "DATA01 lens axis (e.g. 06h=Periphery Focus)"
      - name: motion
        type: string
        description: "DATA02: 00h=stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
      - name: checksum
        type: string

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {target} 00h {checksum}"
    params:
      - name: target
        type: string
      - name: checksum
        type: string

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: string
        description: "DATA01: FFh=stop (mode/value ignored)"
      - name: mode
        type: string
        description: "DATA02: 00h=absolute, 02h=relative"
      - name: value_lo
        type: string
      - name: value_hi
        type: string
      - name: checksum
        type: string

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {op} {checksum}"
    params:
      - name: op
        type: string
        description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"
      - name: checksum
        type: string

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {op} {checksum}"
    params:
      - name: op
        type: string
        description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"
      - name: checksum
        type: string
    notes: "Operates on profile selected by LENS PROFILE SET."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {option} {checksum}"
    params:
      - name: option
        type: string
        description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: checksum
        type: string

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {option} {value} {checksum}"
    params:
      - name: option
        type: string
        description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: value
        type: string
        description: "DATA02: 00h=OFF, 01h=ON"
      - name: checksum
        type: string

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns operation status bitfield (lens memory/zoom/focus/shift H/shift V)."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {profile} {checksum}"
    params:
      - name: profile
        type: string
        description: "DATA01: 00h=Profile 1, 01h=Profile 2"
      - name: checksum
        type: string

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
        type: string
        description: "DATA01: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
      - name: checksum
        type: string

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
    command: "01h 98h 00h 00h 01h {state} {checksum}"
    params:
      - name: state
        type: string
        description: "DATA01: 01h=ON, 02h=OFF"
      - name: checksum
        type: string

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {type} 01h {checksum}"
    params:
      - name: type
        type: string
        description: "DATA01: 03h=Horizontal sync freq, 04h=Vertical sync freq"
      - name: checksum
        type: string

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

  - id: pip_pbp_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {item} {checksum}"
    params:
      - name: item
        type: string
        description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: checksum
        type: string

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
        type: string
        description: "DATA01 eco mode value (see Appendix 'Supplementary Information by Command')"
      - name: checksum
        type: string

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {name_bytes_01-16} 00h {checksum}"
    params:
      - name: name_bytes_01-16
        type: string
        description: "DATA01-DATA16 projector name, up to 16 bytes (NUL-terminated)"
      - name: checksum
        type: string

  - id: pip_pbp_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {item} {value} {checksum}"
    params:
      - name: item
        type: string
        description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: string
        description: "DATA02 setting value (mode: 00h=PIP/01h=PbP; position: 00h=TL/01h=TR/02h=BL/03h=BR)"
      - name: checksum
        type: string

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {value} {checksum}"
    params:
      - name: value
        type: string
        description: "DATA01: 00h=OFF, 01h=ON"
      - name: checksum
        type: string

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
    command: "03h C9h 00h 00h 03h 09h {input} {value} {checksum}"
    params:
      - name: input
        type: string
        description: "DATA01 input terminal (see Appendix)"
      - name: value
        type: string
        description: "DATA02: 00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER"
      - name: checksum
        type: string
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    notes: "From 078-2 DATA06 and 305-3 DATA01."
  - id: error_status
    type: bitfield
    values: [cover_error, temperature_bimetal, fan_error, power_error, lamp_off, lamp_replacement_due, lamp_usage_exceeded, formatter_error, lamp2_off, lamp2_replacement_due, fpga_error, temperature_sensor, lamp_not_present, mirror_cover_error, lamp2_not_present, lamp2_data_error, temperature_dust, foreign_matter, ballast_comm_error, iris_calibration_error, lens_not_installed, portrait_cover_up, interlock_open, system_error_slave, system_error_formatter]
    notes: "From 009 response DATA01-DATA09 bitfield."
  - id: mute_status
    type: composite
    notes: "From 078-4: picture/sound/onscreen/forced-onscreen mute + onscreen display booleans."
  - id: input_status
    type: composite
    notes: "From 078-3: signal list number, selection type 1/2, test pattern display, content displayed."
  - id: cover_status
    type: enum
    values: [normal_opened, closed]
  - id: lens_operation
    type: bitfield
    values: [lens_memory, zoom, focus, lens_shift_h, lens_shift_v]
    notes: "Per-axis stop/during-operation from 053-7."
  - id: edge_blending_mode
    type: enum
    values: [off, on]
```

## Variables
```yaml
variables:
  - id: brightness
    range: null  # UNRESOLVED: bounds returned by 060-1 response, not fixed in source
  - id: contrast
    range: null
  - id: color
    range: null
  - id: hue
    range: null
  - id: sharpness
    range: null
  - id: volume
    range: null
  - id: lamp_light_adjust
    range: null
  - id: lamp_usage_time_seconds
    type: integer
  - id: filter_usage_time_seconds
    type: integer
  - id: lamp_remaining_life_percent
    type: integer
```

## Events
```yaml
events: []
# UNRESOLVED: source documents no unsolicited notifications; device is poll/response only.
```

## Macros
```yaml
macros: []
# UNRESOLVED: source documents no explicit multi-step sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source notes cooling time + command lockout during power transitions
  - power_on   # source notes no other command accepted during power-on
interlocks:
  - "02h 0Dh error (ERR2): 'command cannot be accepted because the power is off' - many commands rejected when device in standby."
  - "POWER ON / POWER OFF lock out all other commands during transition (including cooling)."
# UNRESOLVED: no explicit external-interlock wiring or power-on sequencing steps beyond the command lockout notes.
```

## Notes
- All commands use a hex-byte frame. First byte is the response-class indicator (`00h`=info query, `01h`/`02h`/`03h`=set/action). Second byte is the command opcode. Bytes 3-4 are always `00h 00h`. Byte 5 is LEN (data length). Then DATA bytes. Final byte CKS = low-order 8 bits of the sum of all preceding bytes.
- ACK responses echo the opcode with high bit set (`22h`/`23h`/`21h`/`20h`) and prepend `<ID1> <ID2>` (control ID + model code) plus the LEN byte. Error responses use `A0h`/`A1h`/`A2h`/`A3h` prefix with `<ERR1> <ERR2>`.
- ID1 = projector control ID (set on device); ID2 = model code (varies by model) — both UNRESOLVED for this model.
- Information fields (lamp/filter usage) update only at 1-minute intervals despite 1-second resolution.
- Full error code table (ERR1/ERR2) documented in source §2.4; key examples: `00h 00h`=unrecognized, `00h 01h`=unsupported by model, `01h 00h`=invalid value, `02h 0Dh`=power off, `02h 0Eh`=execution failed.

<!-- UNRESOLVED: ID1 (control ID) and ID2 (model code) default values for C861Q Mpi not stated in this excerpt. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced for input-terminal values, eco-mode values, aspect values, sub-input values, base-model-type codes — not present in this refined excerpt. -->
<!-- UNRESOLVED: flow_control mode (RTS/CTS pinout shown in pin table but no explicit hardware/software flow-control policy stated). -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:57:59.234Z
last_checked_at: 2026-06-17T19:38:57.937Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:38:57.937Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match literal hex commands from the source protocol reference; transport parameters verified; source command inventory fully represented. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input-terminal value map, eco-mode value map, and \"Supplementary Information by Command\" appendix values are referenced by the source but not reproduced here. Firmware version compatibility not stated."
- "flow control not stated in source (full-duplex mode stated)"
- "bounds returned by 060-1 response, not fixed in source"
- "source documents no unsolicited notifications; device is poll/response only."
- "source documents no explicit multi-step sequences."
- "no explicit external-interlock wiring or power-on sequencing steps beyond the command lockout notes."
- "ID1 (control ID) and ID2 (model code) default values for C861Q Mpi not stated in this excerpt."
- "Appendix \"Supplementary Information by Command\" referenced for input-terminal values, eco-mode values, aspect values, sub-input values, base-model-type codes — not present in this refined excerpt."
- "flow_control mode (RTS/CTS pinout shown in pin table but no explicit hardware/software flow-control policy stated)."
- "firmware version compatibility range not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
