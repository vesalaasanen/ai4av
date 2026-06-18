---
spec_id: admin/sharp-nec-ea271f-bk-sv
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC EA271F BK SV Control Spec"
manufacturer: Sharp/NEC
model_family: "EA271F BK SV"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "EA271F BK SV"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:59:07.028Z
last_checked_at: 2026-06-17T19:56:54.916Z
generated_at: 2026-06-17T19:56:54.916Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Device name in input header (\"EA271F BK SV\" — a monitor) does not match source document (\"Projector Control Command Reference Manual\", a projector). Confirm whether source artifact applies to this entity. Model-specific opcodes (ID2/model code) not stated in source. Appendix referenced for several enum values (input terminal, base model type, eco mode, sub input) not present in refined source."
  - "flow control not stated; pinout exposes RTS/CTS"
  - "default baud rate not stated; source only enumerates valid rates. Model code (ID2) value required to address this projector not specified in source."
  - "full input terminal value list not in refined source (Appendix referenced)"
  - "aspect value list in Appendix (not in refined source)"
  - "eco mode value list in Appendix (not in refined source)"
  - "sub input setting value list in Appendix (not in refined source)"
  - "input terminal value list in Appendix (not in refined source)"
  - "source documents no unsolicited notification events. All responses are command-reply only."
  - "source documents no multi-step command sequences."
  - "source mentions safety-relevant bits (interlock switch open in 009 DATA09 Bit1, foreign matter sensor, fan/temperature errors) but no explicit power-on sequencing procedure or voltage/current specs."
  - "Device name mismatch — input header identifies a monitor (EA271F BK SV) while source artifact is a Projector Command Reference Manual (BDT140013 Rev 7.1). Confirm artifact-to-entity mapping before ingest."
  - "model code (ID2) value not specified in source."
  - "input terminal value list (018, 319-10), eco mode value list (097-8/098-8), base model type list (305-1, 078-1), and sub input value list (097-198/098-198) all reference an Appendix not present in refined source."
  - "default baud rate not stated; flow_control not stated."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:56:54.916Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim in source; transport parameters (port 7142, baud rates, data/parity/stop bits) all verified. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC EA271F BK SV Control Spec

## Summary
Control protocol spec derived from "Projector Control Command Reference Manual" (BDT140013 Rev 7.1). Binary frame protocol over RS-232C and TCP/IP (port 7142). Covers power, input switch, mute, lens, lamp/filter info, eco mode, edge blending, PIP/PBP, and status queries.

<!-- UNRESOLVED: Device name in input header ("EA271F BK SV" — a monitor) does not match source document ("Projector Control Command Reference Manual", a projector). Confirm whether source artifact applies to this entity. Model-specific opcodes (ID2/model code) not stated in source. Appendix referenced for several enum values (input terminal, base model type, eco mode, sub input) not present in refined source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source lists selectable rates: 115200/38400/19200/9600/4800; default not stated - 9600 shown as one option, not as default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; pinout exposes RTS/CTS
auth:
  type: none  # inferred: no auth procedure in source
```

<!-- UNRESOLVED: default baud rate not stated; source only enumerates valid rates. Model code (ID2) value required to address this projector not specified in source. -->

## Traits
```yaml
traits:
  - powerable     # inferred: 015 POWER ON / 016 POWER OFF
  - queryable     # inferred: numerous request commands (078-*, 037-*, 305-*, etc.)
  - levelable     # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 030-15 OTHER ADJUST
  - routable      # inferred: 018 INPUT SW CHANGE
```

## Actions
```yaml
actions:
  - id: error_status_request
    label: 009. ERROR STATUS REQUEST
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []

  - id: power_on
    label: 015. POWER ON
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []

  - id: power_off
    label: 016. POWER OFF
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []

  - id: input_sw_change
    label: 018. INPUT SW CHANGE
    kind: action
    command: "02h 03h 00h 00h 02h 01h {input} {cks}"
    params:
      - name: input
        type: integer
        description: Input terminal selector byte (e.g. 06h = video). Full value list in Appendix.
        # UNRESOLVED: full input terminal value list not in refined source (Appendix referenced)

  - id: picture_mute_on
    label: 020. PICTURE MUTE ON
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []

  - id: picture_mute_off
    label: 021. PICTURE MUTE OFF
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: sound_mute_on
    label: 022. SOUND MUTE ON
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []

  - id: sound_mute_off
    label: 023. SOUND MUTE OFF
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: onscreen_mute_on
    label: 024. ONSCREEN MUTE ON
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []

  - id: onscreen_mute_off
    label: 025. ONSCREEN MUTE OFF
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: 030-1. PICTURE ADJUST
    kind: action
    command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} {cks}"
    params:
      - name: target
        type: enum
        description: "Adjustment target. 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
      - name: mode
        type: enum
        description: "00h=absolute, 01h=relative."
      - name: value_lo
        type: integer
        description: Adjustment value (low-order 8 bits).
      - name: value_hi
        type: integer
        description: Adjustment value (high-order 8 bits).

  - id: volume_adjust
    label: 030-2. VOLUME ADJUST
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {cks}"
    params:
      - name: mode
        type: enum
        description: "00h=absolute, 01h=relative."
      - name: value_lo
        type: integer
        description: Adjustment value (low-order 8 bits).
      - name: value_hi
        type: integer
        description: Adjustment value (high-order 8 bits).

  - id: aspect_adjust
    label: 030-12. ASPECT ADJUST
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {value} 00h {cks}"
    params:
      - name: value
        type: integer
        description: Aspect value byte.
        # UNRESOLVED: aspect value list in Appendix (not in refined source)

  - id: other_adjust
    label: 030-15. OTHER ADJUST
    kind: action
    command: "03h 10h 00h 00h 05h {target_lo} {target_hi} {mode} {value_lo} {value_hi} {cks}"
    params:
      - name: target_lo
        type: enum
        description: "Adjustment target low byte. Source lists DATA01=96h / DATA02=FFh = LAMP ADJUST / LIGHT ADJUST only."
      - name: target_hi
        type: integer
        description: Adjustment target high byte.
      - name: mode
        type: enum
        description: "00h=absolute, 01h=relative."
      - name: value_lo
        type: integer
        description: Adjustment value (low-order 8 bits).
      - name: value_hi
        type: integer
        description: Adjustment value (high-order 8 bits).

  - id: information_request
    label: 037. INFORMATION REQUEST
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []

  - id: filter_usage_information_request
    label: 037-3. FILTER USAGE INFORMATION REQUEST
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []

  - id: lamp_information_request_3
    label: 037-4. LAMP INFORMATION REQUEST 3
    kind: query
    command: "03h 96h 00h 00h 02h {lamp} {content} {cks}"
    params:
      - name: lamp
        type: enum
        description: "00h=Lamp 1, 01h=Lamp 2 (Lamp 2 only on two-lamp models)."
      - name: content
        type: enum
        description: "01h=lamp usage time (s), 04h=lamp remaining life (%)."

  - id: carbon_savings_information_request
    label: 037-6. CARBON SAVINGS INFORMATION REQUEST
    kind: query
    command: "03h 9Ah 00h 00h 01h {type} {cks}"
    params:
      - name: type
        type: enum
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."

  - id: remote_key_code
    label: 050. REMOTE KEY CODE
    kind: action
    command: "02h 0Fh 00h 00h 02h {keycode_lo} {keycode_hi} {cks}"
    params:
      - name: keycode_lo
        type: integer
        description: Key code (WORD type) low byte. See key code list (e.g. 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO).
      - name: keycode_hi
        type: integer
        description: Key code high byte (always 00h per source list).

  - id: shutter_close
    label: 051. SHUTTER CLOSE
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: shutter_open
    label: 052. SHUTTER OPEN
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  - id: lens_control
    label: 053. LENS CONTROL
    kind: action
    command: "02h 18h 00h 00h 02h {target} {content} {cks}"
    params:
      - name: target
        type: enum
        description: "Lens target. Source lists DATA01=06h=Periphery Focus only."
      - name: content
        type: enum
        description: "00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus (continuous), 81h=drive minus (continuous), FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus."

  - id: lens_control_request
    label: 053-1. LENS CONTROL REQUEST
    kind: query
    command: "02h 1Ch 00h 00h 02h {target} 00h {cks}"
    params:
      - name: target
        type: integer
        description: Lens target byte (matches 053 LENS CONTROL DATA01).

  - id: lens_control_2
    label: 053-2. LENS CONTROL 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {cks}"
    params:
      - name: target
        type: enum
        description: "FFh=Stop, otherwise adjustment target."
      - name: mode
        type: enum
        description: "00h=absolute, 02h=relative."
      - name: value_lo
        type: integer
        description: Adjustment value (low-order 8 bits).
      - name: value_hi
        type: integer
        description: Adjustment value (high-order 8 bits).

  - id: lens_memory_control
    label: 053-3. LENS MEMORY CONTROL
    kind: action
    command: "02h 1Eh 00h 00h 01h {operation} {cks}"
    params:
      - name: operation
        type: enum
        description: "00h=MOVE, 01h=STORE, 02h=RESET."

  - id: reference_lens_memory_control
    label: 053-4. REFERENCE LENS MEMORY CONTROL
    kind: action
    command: "02h 1Fh 00h 00h 01h {operation} {cks}"
    params:
      - name: operation
        type: enum
        description: "00h=MOVE, 01h=STORE, 02h=RESET."

  - id: lens_memory_option_request
    label: 053-5. LENS MEMORY OPTION REQUEST
    kind: query
    command: "02h 20h 00h 00h 01h {option} {cks}"
    params:
      - name: option
        type: enum
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."

  - id: lens_memory_option_set
    label: 053-6. LENS MEMORY OPTION SET
    kind: action
    command: "02h 21h 00h 00h 02h {option} {value} {cks}"
    params:
      - name: option
        type: enum
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: value
        type: enum
        description: "00h=OFF, 01h=ON."

  - id: lens_information_request
    label: 053-7. LENS INFORMATION REQUEST
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

  - id: lens_profile_set
    label: 053-10. LENS PROFILE SET
    kind: action
    command: "02h 27h 00h 00h 01h {profile} {cks}"
    params:
      - name: profile
        type: enum
        description: "00h=Profile 1, 01h=Profile 2."

  - id: lens_profile_request
    label: 053-11. LENS PROFILE REQUEST
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: 060-1. GAIN PARAMETER REQUEST 3
    kind: query
    command: "03h 05h 00h 00h 03h {name} 00h 00h {cks}"
    params:
      - name: name
        type: enum
        description: "00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST."

  - id: setting_request
    label: 078-1. SETTING REQUEST
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []

  - id: running_status_request
    label: 078-2. RUNNING STATUS REQUEST
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []

  - id: input_status_request
    label: 078-3. INPUT STATUS REQUEST
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []

  - id: mute_status_request
    label: 078-4. MUTE STATUS REQUEST
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []

  - id: model_name_request
    label: 078-5. MODEL NAME REQUEST
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  - id: cover_status_request
    label: 078-6. COVER STATUS REQUEST
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []

  - id: freeze_control
    label: 079. FREEZE CONTROL
    kind: action
    command: "01h 98h 00h 00h 01h {state} {cks}"
    params:
      - name: state
        type: enum
        description: "01h=freeze ON, 02h=freeze OFF."

  - id: information_string_request
    label: 084. INFORMATION STRING REQUEST
    kind: query
    command: "00h D0h 00h 00h 03h 00h {type} 01h {cks}"
    params:
      - name: type
        type: enum
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency."

  - id: eco_mode_request
    label: 097-8. ECO MODE REQUEST
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []

  - id: lan_projector_name_request
    label: 097-45. LAN PROJECTOR NAME REQUEST
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: lan_mac_address_status_request_2
    label: 097-155. LAN MAC ADDRESS STATUS REQUEST 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_picture_by_picture_request
    label: 097-198. PIP/PICTURE BY PICTURE REQUEST
    kind: query
    command: "03h B0h 00h 00h 02h C5h {target} {cks}"
    params:
      - name: target
        type: enum
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."

  - id: edge_blending_mode_request
    label: 097-243-1. EDGE BLENDING MODE REQUEST
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set
    label: 098-8. ECO MODE SET
    kind: action
    command: "03h B1h 00h 00h 02h 07h {value} {cks}"
    params:
      - name: value
        type: integer
        description: Eco mode value byte.
        # UNRESOLVED: eco mode value list in Appendix (not in refined source)

  - id: lan_projector_name_set
    label: 098-45. LAN PROJECTOR NAME SET
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {name_01-16} 00h {cks}"
    params:
      - name: name_01-16
        type: string
        description: Projector name, up to 16 bytes (NUL-terminated).

  - id: pip_picture_by_picture_set
    label: 098-198. PIP/PICTURE BY PICTURE SET
    kind: action
    command: "03h B1h 00h 00h 03h C5h {target} {value} {cks}"
    params:
      - name: target
        type: enum
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: value
        type: integer
        description: Setting value for target.
        # UNRESOLVED: sub input setting value list in Appendix (not in refined source)

  - id: edge_blending_mode_set
    label: 098-243-1. EDGE BLENDING MODE SET
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {value} {cks}"
    params:
      - name: value
        type: enum
        description: "00h=OFF, 01h=ON."

  - id: base_model_type_request
    label: 305-1. BASE MODEL TYPE REQUEST
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []

  - id: serial_number_request
    label: 305-2. SERIAL NUMBER REQUEST
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  - id: basic_information_request
    label: 305-3. BASIC INFORMATION REQUEST
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []

  - id: audio_select_set
    label: 319-10. AUDIO SELECT SET
    kind: action
    command: "03h C9h 00h 00h 03h 09h {input} {value} {cks}"
    params:
      - name: input
        type: integer
        description: Input terminal byte.
        # UNRESOLVED: input terminal value list in Appendix (not in refined source)
      - name: value
        type: enum
        description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
```

## Feedbacks
```yaml
feedbacks:
  - id: power_status
    type: enum
    values: [standby, power_on]  # from 078-2 DATA03: 00h=Standby, 01h=Power on, FFh=Not supported

  - id: cooling_process
    type: enum
    values: [not_executed, during_execution]  # from 078-2 DATA04

  - id: power_on_off_process
    type: enum
    values: [not_executed, during_execution]  # from 078-2 DATA05

  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]  # from 078-2 DATA06

  - id: picture_mute_state
    type: enum
    values: [off, on]  # from 078-4 DATA01

  - id: sound_mute_state
    type: enum
    values: [off, on]  # from 078-4 DATA02

  - id: onscreen_mute_state
    type: enum
    values: [off, on]  # from 078-4 DATA03

  - id: forced_onscreen_mute_state
    type: enum
    values: [off, on]  # from 078-4 DATA04

  - id: cover_status
    type: enum
    values: [normal_opened, cover_closed]  # from 078-6 DATA01

  - id: freeze_status
    type: enum
    values: [off, on]  # from 305-3 DATA09

  - id: error_status
    type: bitmask
    values: []  # bitmask field - DATA01-12 from 009; bit layout documented in source
    # 12-byte error bitmap; full bit-by-bit semantics in source section 3.1

  - id: lamp_remaining_life
    type: integer
    # returned via 037-4 with content=04h; may be negative past deadline

  - id: edge_blending_mode
    type: enum
    values: [off, on]  # from 097-243-1 / 098-243-1
```

## Variables
```yaml
variables:
  - id: brightness
    description: Picture brightness (030-1 target=00h, query via 060-1 name=00h)
  - id: contrast
    description: Picture contrast (030-1 target=01h, query via 060-1 name=01h)
  - id: color
    description: Picture color (030-1 target=02h, query via 060-1 name=02h)
  - id: hue
    description: Picture hue (030-1 target=03h, query via 060-1 name=03h)
  - id: sharpness
    description: Picture sharpness (030-1 target=04h, query via 060-1 name=04h)
  - id: volume
    description: Sound volume (030-2, query via 060-1 name=05h)
  - id: lamp_light_adjust
    description: Lamp/Light adjust (030-15 target=96h/FFh, query via 060-1 name=96h)
  - id: eco_mode
    description: Eco mode setting (set via 098-8, query via 097-8). Value encoding in Appendix.
    # UNRESOLVED: eco mode value list in Appendix (not in refined source)
  - id: projector_name
    description: LAN projector name (set via 098-45, query via 097-45). Up to 16 bytes.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notification events. All responses are command-reply only.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # 016 POWER OFF: cooling time locks out other commands
  - shutter_close  # 051 SHUTTER CLOSE: blocks projection
  - lens_memory_reset  # 053-3/053-4 RESET operation
interlocks:
  - power_on_lockout: "015 POWER ON: no other command accepted during power-on sequence."
  - power_off_lockout: "016 POWER OFF: no other command accepted during power-off incl. cooling time."
  - cover_status: "078-6 cover closed status may block optical output."
# UNRESOLVED: source mentions safety-relevant bits (interlock switch open in 009 DATA09 Bit1, foreign matter sensor, fan/temperature errors) but no explicit power-on sequencing procedure or voltage/current specs.
```

## Notes
- Frame format: `20h/21h/22h/23h/02h/03h/01h/00h/A0h..A3h <HEADER> <ID1> <ID2> <LEN> <DATA...> <CKS>`. First byte distinguishes direction (02h/03h = command from PC; 22h/23h = success response; A2h/A3h = error response).
- Checksum (CKS): sum of all preceding bytes, take low-order 8 bits. Example from source: `20h+81h+01h+60h+01h+00h = 103h → 03h`.
- ID1 = control ID set on projector. ID2 = model code (model-specific value not in source).
- ERR1/ERR2 error code combinations documented in section 2.4 (e.g. 00h/00h = unrecognized command, 02h/0Dh = power off, 02h/0Fh = no authority).
- Lamp usage time returned in seconds, updated at 1-minute intervals.
- Recommended TCP port: 7142 (source explicitly states for both send/receive).
- Serial baud is selectable from {4800, 9600, 19200, 38400, 115200}; default rate not stated in source.
- Wired/wireless LAN support referenced; wireless LAN unit manual out of scope.

<!-- UNRESOLVED: Device name mismatch — input header identifies a monitor (EA271F BK SV) while source artifact is a Projector Command Reference Manual (BDT140013 Rev 7.1). Confirm artifact-to-entity mapping before ingest. -->
<!-- UNRESOLVED: model code (ID2) value not specified in source. -->
<!-- UNRESOLVED: input terminal value list (018, 319-10), eco mode value list (097-8/098-8), base model type list (305-1, 078-1), and sub input value list (097-198/098-198) all reference an Appendix not present in refined source. -->
<!-- UNRESOLVED: default baud rate not stated; flow_control not stated. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:59:07.028Z
last_checked_at: 2026-06-17T19:56:54.916Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:56:54.916Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim in source; transport parameters (port 7142, baud rates, data/parity/stop bits) all verified. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Device name in input header (\"EA271F BK SV\" — a monitor) does not match source document (\"Projector Control Command Reference Manual\", a projector). Confirm whether source artifact applies to this entity. Model-specific opcodes (ID2/model code) not stated in source. Appendix referenced for several enum values (input terminal, base model type, eco mode, sub input) not present in refined source."
- "flow control not stated; pinout exposes RTS/CTS"
- "default baud rate not stated; source only enumerates valid rates. Model code (ID2) value required to address this projector not specified in source."
- "full input terminal value list not in refined source (Appendix referenced)"
- "aspect value list in Appendix (not in refined source)"
- "eco mode value list in Appendix (not in refined source)"
- "sub input setting value list in Appendix (not in refined source)"
- "input terminal value list in Appendix (not in refined source)"
- "source documents no unsolicited notification events. All responses are command-reply only."
- "source documents no multi-step command sequences."
- "source mentions safety-relevant bits (interlock switch open in 009 DATA09 Bit1, foreign matter sensor, fan/temperature errors) but no explicit power-on sequencing procedure or voltage/current specs."
- "Device name mismatch — input header identifies a monitor (EA271F BK SV) while source artifact is a Projector Command Reference Manual (BDT140013 Rev 7.1). Confirm artifact-to-entity mapping before ingest."
- "model code (ID2) value not specified in source."
- "input terminal value list (018, 319-10), eco mode value list (097-8/098-8), base model type list (305-1, 078-1), and sub input value list (097-198/098-198) all reference an Appendix not present in refined source."
- "default baud rate not stated; flow_control not stated."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
