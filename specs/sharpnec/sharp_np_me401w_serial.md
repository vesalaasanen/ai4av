---
spec_id: admin/sharpnec-np-me401w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP ME401W Control Spec"
manufacturer: Sharp/NEC
model_family: "NP ME401W"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP ME401W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:00:53.077Z
last_checked_at: 2026-06-18T08:38:34.308Z
generated_at: 2026-06-18T08:38:34.308Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Appendix \"Supplementary Information by Command\" not included in refined source — many enum value lists (input terminal codes, aspect codes, base model type codes, eco mode values, sub input values) are referenced but not enumerated here."
  - "flow control not stated (RTS/CTS pins present on D-SUB but no flow-control setting described)"
  - "appendix not in source."
  - "full value list in Appendix, not in source."
  - "full list in Appendix, not in source."
  - "numeric min/max/default bounds are device-reported at runtime; not stated statically in source."
  - "populate from source if a separate events section exists in the full manual."
  - "populate from source if applicable."
  - "source does not describe a separate power-on sequencing procedure or"
  - "Appendix \"Supplementary Information by Command\" not present in the refined source — input terminal codes, aspect codes, base model type codes, eco mode value codes, sub input codes, and per-model-supported-parameter matrix are referenced but not enumerated."
  - "factory default baud rate not stated."
  - "serial flow control not stated (RTS/CTS pins wired per pin table but no setting described)."
  - "firmware version compatibility range not stated."
  - "ID1 (control ID) and ID2 (model code) static values not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:38:34.308Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP ME401W Control Spec

## Summary
Sharp/NEC NP ME401W projector control spec covering the PC CONTROL command protocol (document BDT140013 Rev 7.1). The device accepts control over RS-232C (PC CONTROL D-SUB 9P, cross cable) and over a wired/wireless LAN using TCP port 7142. Commands are framed binary messages with a trailing checksum byte (low-order 8 bits of the sum of all preceding bytes).

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not included in refined source — many enum value lists (input terminal codes, aspect codes, base model type codes, eco mode values, sub input values) are referenced but not enumerated here. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists selectable rates 115200/38400/19200/9600/4800; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated (RTS/CTS pins present on D-SUB but no flow-control setting described)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred from POWER ON / POWER OFF commands
  - queryable      # inferred from numerous *REQUEST query commands
  - levelable      # inferred from PICTURE ADJUST / VOLUME ADJUST / LENS CONTROL commands
  - routable       # inferred from INPUT SW CHANGE / AUDIO SELECT SET commands
```

## Actions
```yaml
# All payloads are hex bytes exactly as written in the source.
# Checksum byte (CKS) is the low-order 8 bits of the sum of all preceding bytes.
# Frame parameters ID1 (control ID) and ID2 (model code) are device-assigned.
actions:
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
        description: Input terminal code (e.g. 06h = video port). Full value list in Appendix "Supplementary Information by Command" - UNRESOLVED: appendix not in source.

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
        description: Adjustment value (low-order 8 bits)
      - name: DATA04
        type: integer
        description: Adjustment value (high-order 8 bits)

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
        description: Adjustment value (low-order 8 bits)
      - name: DATA03
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Aspect value code - UNRESOLVED: full value list in Appendix, not in source.

  - id: other_adjust
    label: "030-15. OTHER ADJUST (LAMP/LIGHT)"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target (96h = LAMP ADJUST / LIGHT ADJUST)"
      - name: DATA02
        type: integer
        description: "Sub-target (FFh for LAMP ADJUST / LIGHT ADJUST)"
      - name: DATA03
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA04
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA05
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte (see key code list: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO)"
      - name: DATA02
        type: integer
        description: Key code high byte (00h for all listed keys)

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
        description: "Lens target (06h = Periphery Focus)"
      - name: DATA02
        type: integer
        description: "Drive command: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

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
        description: Adjustment value (low-order 8 bits)
      - name: DATA04
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "01h=freeze on, 02h=freeze off"

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Eco mode value code - UNRESOLVED: full value list in Appendix, not in source.

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {DATA06} {DATA07} {DATA08} {DATA09} {DATA10} {DATA11} {DATA12} {DATA13} {DATA14} {DATA15} {DATA16} 00h {CKS}"
    params:
      - name: DATA01
        type: string
        description: Projector name byte 1 (up to 16 bytes total)

  - id: pip_pbp_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: integer
        description: "Setting value (mode: 00h=PIP, 01h=PbP; position: 00h=TL, 01h=TR, 02h=BL, 03h=BR; sub-input codes per Appendix - UNRESOLVED)"

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Input terminal code - UNRESOLVED: full list in Appendix, not in source.
      - name: DATA02
        type: integer
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"

  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []

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
        description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: integer
        description: "Content: 01h=usage time (seconds), 04h=remaining life (%)"

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Lens target code (per source tables)

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

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

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

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

  - id: pip_pbp_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

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
```

## Feedbacks
```yaml
feedbacks:
  - id: command_response_success
    type: struct
    description: "Ack frame for a successful command. Format: <AckByte> <CmdByte> <ID1> <ID2> <LEN> [<DATA...>] <CKS>. AckByte by command class: A0h/A1h/A2h/A3h = success; ack high nibble '2' prefix mirrors command class."

  - id: command_response_error
    type: struct
    description: "Error frame: <AckByte> <CmdByte> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>. ERR1/ERR2 combination per source error code list (00h00h=unrecognized, 00h01h=unsupported by model, 01h00h=invalid value, 01h01h=invalid input terminal, 01h02h=invalid language, 02h00h=memory alloc error, 02h02h=memory in use, 02h03h=value cannot be set, 02h04h=forced onscreen mute on, 02h06h=viewer error, 02h07h=no signal, 02h08h=test pattern displayed, 02h09h=no PC card, 02h0Ah=memory op error, 02h0Ch=entry list displayed, 02h0Dh=power off, 02h0Eh=execution failed, 02h0Fh=no authority, 03h00h=wrong gain number, 03h01h=invalid gain, 03h02h=adjustment failed)."

  - id: error_status
    type: struct
    description: "ERROR STATUS REQUEST response (12 data bytes). Bit flags across DATA01-DATA12 per source error information list (cover, fan, temperature, lamp off, lamp replacement moratorium, lamp usage exceeded, formatter, FPGA, lamp not present, lamp data error, mirror cover, foreign matter, ballast comms, iris calibration, lens not installed, interlock switch open, system errors)."

  - id: power_status
    type: enum
    description: "From RUNNING STATUS REQUEST DATA03: 00h=Standby, 01h=Power on, FFh=Not supported"

  - id: operation_status
    type: enum
    description: "From RUNNING STATUS REQUEST DATA06: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"

  - id: cover_status
    type: enum
    values: [normal_open, closed]
    description: "00h=Normal (cover opened), 01h=Cover closed"
```

## Variables
```yaml
# Settable scalars referenced by adjustment commands. Values and ranges are
# obtained at runtime via GAIN PARAMETER REQUEST 3 (060-1).
variables:
  - name: brightness
    description: PICTURE/BRIGHTNESS - range queried via 060-1 DATA01=00h
  - name: contrast
    description: PICTURE/CONTRAST - range queried via 060-1 DATA01=01h
  - name: color
    description: PICTURE/COLOR - range queried via 060-1 DATA01=02h
  - name: hue
    description: PICTURE/HUE - range queried via 060-1 DATA01=03h
  - name: sharpness
    description: PICTURE/SHARPNESS - range queried via 060-1 DATA01=04h
  - name: volume
    description: VOLUME - range queried via 060-1 DATA01=05h
  - name: lamp_light_adjust
    description: LAMP/LIGHT ADJUST - range queried via 060-1 DATA01=96h
  # UNRESOLVED: numeric min/max/default bounds are device-reported at runtime; not stated statically in source.
```

## Events
```yaml
# Device does not document unsolicited notifications. All output is in response to a command.
# UNRESOLVED: populate from source if a separate events section exists in the full manual.
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
# UNRESOLVED: populate from source if applicable.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source: "While this command is turning off the power (including the cooling time), no other command can be accepted."
  - power_on   # source: "While this command is turning on the power, no other command can be accepted."
interlocks:
  - "Power on/off commands lock out all other commands for the duration of the transition (including cooling time)."
  - "Error status DATA09 Bit1: interlock switch open is a fault condition."
  - "Error status DATA04 Bit7: lens not installed properly is a fault condition."
# UNRESOLVED: source does not describe a separate power-on sequencing procedure or
# hardware interlock wiring; only the command-lockout behaviour during power transitions
# and the error-status bit flags are stated.
```

## Notes
- Command framing: every message is `20h|02h|03h|01h <CMD> <ID1> <ID2> <LEN> <DATA...> <CKS>` (request bytes vary by command class — see each command's literal payload). Checksum = low-order 8 bits of the sum of all preceding bytes (worked example in source §2.2: `20h 81h 01h 60h 01h 00h` → CKS = `03h`).
- `ID1` = control ID set on projector; `ID2` = model code (device-assigned). Neither value is stated statically in this source.
- Acknowledgement high byte by class: `A0h`/`A1h`/`A2h`/`A3h` replace the request's leading byte (`00h`/`01h`/`02h`/`03h`) on success.
- Serial baud rate is selectable among 4800/9600/19200/38400/115200 — the source does not state which is the factory default.
- Information updates (lamp/filter usage) are reported in one-second units but refreshed at one-minute intervals.
- Lamp remaining life (%) may be negative if the replacement deadline is exceeded.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not present in the refined source — input terminal codes, aspect codes, base model type codes, eco mode value codes, sub input codes, and per-model-supported-parameter matrix are referenced but not enumerated. -->
<!-- UNRESOLVED: factory default baud rate not stated. -->
<!-- UNRESOLVED: serial flow control not stated (RTS/CTS pins wired per pin table but no setting described). -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: ID1 (control ID) and ID2 (model code) static values not stated. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:00:53.077Z
last_checked_at: 2026-06-18T08:38:34.308Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:38:34.308Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Appendix \"Supplementary Information by Command\" not included in refined source — many enum value lists (input terminal codes, aspect codes, base model type codes, eco mode values, sub input values) are referenced but not enumerated here."
- "flow control not stated (RTS/CTS pins present on D-SUB but no flow-control setting described)"
- "appendix not in source."
- "full value list in Appendix, not in source."
- "full list in Appendix, not in source."
- "numeric min/max/default bounds are device-reported at runtime; not stated statically in source."
- "populate from source if a separate events section exists in the full manual."
- "populate from source if applicable."
- "source does not describe a separate power-on sequencing procedure or"
- "Appendix \"Supplementary Information by Command\" not present in the refined source — input terminal codes, aspect codes, base model type codes, eco mode value codes, sub input codes, and per-model-supported-parameter matrix are referenced but not enumerated."
- "factory default baud rate not stated."
- "serial flow control not stated (RTS/CTS pins wired per pin table but no setting described)."
- "firmware version compatibility range not stated."
- "ID1 (control ID) and ID2 (model code) static values not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
