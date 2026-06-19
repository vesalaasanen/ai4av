---
spec_id: admin/sharp-nec-nc2403ml
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NC2403ML Control Spec"
manufacturer: Sharp/NEC
model_family: NC2403ML
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NC2403ML
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:18:38.894Z
last_checked_at: 2026-06-18T08:34:43.294Z
generated_at: 2026-06-18T08:34:43.294Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated. Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, base model type codes, sub input values, eco mode values) not present in refined source — many enum value ranges are referenced but not enumerated."
  - "source states \"Full duplex\" comm mode but not RTS/CTS flow control setting"
  - "source describes no unsolicited notifications. All responses"
  - "source describes no multi-step command sequences."
  - "no explicit safety interlock procedures or power-on sequencing"
  - "firmware version compatibility not stated in source."
  - "serial flow_control setting not explicitly stated (only \"Full duplex\" comm mode)."
  - "Appendix \"Supplementary Information by Command\" enum lists not present — input terminal codes, aspect values, base model types, sub-input values, eco mode values all referenced but not enumerated."
  - "default baud rate (5 valid options, no default marked)."
  - "exact leading-byte opcode convention not formally tabulated in source (inferred from examples)."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:34:43.294Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NC2403ML Control Spec

## Summary
Sharp/NEC NC2403ML projector control spec. Supports both RS-232C serial (PC CONTROL D-SUB 9P, cross cable) and TCP/IP LAN control (wired RJ-45 or wireless LAN unit). Binary framed protocol with checksum byte; ~53 documented commands covering power, input switching, mutes, lens/shutter, picture/volume/aspect adjust, status queries, eco mode, edge blending, PIP/PbP, and projector information retrieval.

<!-- UNRESOLVED: firmware version compatibility not stated. Appendix "Supplementary Information by Command" (input terminal values, aspect values, base model type codes, sub input values, eco mode values) not present in refined source — many enum value ranges are referenced but not enumerated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600  # configurable: 4800 / 9600 / 19200 / 38400 / 115200 (default UNRESOLVED)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: source states "Full duplex" comm mode but not RTS/CTS flow control setting
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 015 POWER ON / 016 POWER OFF commands
  - queryable    # inferred: extensive status/info request commands
  - levelable    # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST
  - routable     # inferred: 018 INPUT SW CHANGE routing
```

## Actions
```yaml
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
    notes: During power-off (including cooling time), no other command accepted.

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal value (e.g. 06h=video port). Full list UNRESOLVED - referenced in Appendix 'Supplementary Information by Command' not in source."

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
        description: Adjustment value low-order 8 bits
      - name: DATA04
        type: integer
        description: Adjustment value high-order 8 bits

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
        description: Adjustment value low-order 8 bits
      - name: DATA03
        type: integer
        description: Adjustment value high-order 8 bits

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Aspect value (full list UNRESOLVED - referenced in Appendix not in source)."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "96h = LAMP ADJUST / LIGHT ADJUST target"
      - name: DATA02
        type: integer
        description: "Sub-target FFh for LAMP/LIGHT ADJUST"
      - name: DATA03
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA04
        type: integer
        description: Adjustment value low-order 8 bits
      - name: DATA05
        type: integer
        description: Adjustment value high-order 8 bits

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at 1-minute intervals."

  - id: filter_usage_info_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds. -1 if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: integer
        description: "01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

  - id: carbon_savings_info_request
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
        description: "Key code low byte (see key code table, e.g. 02h=POWER ON, 0Ch=EXIT, 4Bh=COMPUTER1, D7h=SOURCE)"
      - name: DATA02
        type: integer
        description: "Key code high byte (00h for all listed keys)"

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
        description: "06h = Periphery Focus"
      - name: DATA02
        type: integer
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Lens adjustment target

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "FFh=Stop, otherwise lens target"
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: DATA03
        type: integer
        description: Adjustment value low-order 8 bits
      - name: DATA04
        type: integer
        description: Adjustment value high-order 8 bits

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
        description: "00h=OFF, 01h=ON"

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitmask: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V (0=Stop, 1=During operation)."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

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
        description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type, sound function availability, clock/sleep timer profile."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status, cooling/power process flags, operation status."

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number, selection signal types, test pattern state."

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture/sound/onscreen/forced-onscreen mute states + OSD display flag."

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
        description: "01h=freeze ON, 02h=freeze OFF"

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "03h=horizontal sync frequency, 04h=vertical sync frequency"

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
        description: "Eco/Light/Lamp mode value (full list UNRESOLVED - in Appendix not in source)."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01-16} 00h {CKS}"
    params:
      - name: name
        type: string
        description: "Projector name (up to 16 bytes, NUL-terminated) expanded across DATA01-DATA16."

  - id: pip_pbp_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: integer
        description: "Setting value (mode/position/sub-input specific; sub-input list UNRESOLVED in Appendix)."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=OFF, 01h=ON"

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
        description: "Input terminal (full list UNRESOLVED - in Appendix not in source)."
      - name: DATA02
        type: integer
        description: "00h=terminal-specified audio, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: command_ack_success
    type: raw
    description: >
      Success response: leading byte 20h/21h/22h/23h/A0h... per command type,
      followed by ID1 ID2 LEN DATA?? CKS. No-data commands return LEN=00h.
  - id: command_error
    type: enum
    description: >
      Failure response leading byte A0h/A1h/A2h/A3h with ERR1 ERR2 codes.
    values:
      - "00h 00h: command not recognized"
      - "00h 01h: command not supported by model"
      - "01h 00h: specified value invalid"
      - "01h 01h: specified input terminal invalid"
      - "01h 02h: specified language invalid"
      - "02h 00h: memory allocation error"
      - "02h 02h: memory in use"
      - "02h 03h: specified value cannot be set"
      - "02h 04h: forced onscreen mute on"
      - "02h 06h: viewer error"
      - "02h 07h: no signal"
      - "02h 08h: test pattern or filter displayed"
      - "02h 09h: no PC card inserted"
      - "02h 0Ah: memory operation error"
      - "02h 0Ch: entry list displayed"
      - "02h 0Dh: command rejected (power off)"
      - "02h 0Eh: command execution failed"
      - "02h 0Fh: no authority for operation"
      - "03h 00h: specified gain number incorrect"
      - "03h 01h: specified gain invalid"
      - "03h 02h: adjustment failed"
  - id: error_status_bits
    type: raw
    description: >
      DATA01-DATA12 bitmask from 009 ERROR STATUS REQUEST. Bit set to 1 =
      error. Covers cover/fan/temperature/power/lamp/formatter/mirror-cover/
      ballast/iris/interlock/system errors. See source section 3.1 for full
      bit-to-meaning mapping.
  - id: power_status
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
    description: DATA03 from 078-2 RUNNING STATUS REQUEST.
  - id: input_signal_status
    type: raw
    description: Multi-field response from 078-3 INPUT STATUS REQUEST.
```

## Variables
```yaml
variables:
  - id: brightness
    description: Picture brightness (set via 030-1 DATA01=00h, query via 060-1 DATA01=00h).
  - id: contrast
    description: Picture contrast (030-1 DATA01=01h / 060-1 DATA01=01h).
  - id: color
    description: Picture color (030-1 DATA01=02h / 060-1 DATA01=02h).
  - id: hue
    description: Picture hue (030-1 DATA01=03h / 060-1 DATA01=03h).
  - id: sharpness
    description: Picture sharpness (030-1 DATA01=04h / 060-1 DATA01=04h).
  - id: volume
    description: Sound volume (set via 030-2, query via 060-1 DATA01=05h).
  - id: lamp_adjust
    description: Lamp/Light adjust (030-15 DATA01=96h / 060-1 DATA01=96h).
  - id: eco_mode
    description: Eco / Light / Lamp mode (set via 098-8, query via 097-8). Value list UNRESOLVED.
  - id: projector_name
    description: LAN projector name (set via 098-45, query via 097-45). Up to 16 bytes.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications. All responses
# are replies to issued commands.
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "015 POWER ON: while turning on, no other command accepted."
  - "016 POWER OFF: during power-off (including cooling time), no other command accepted."
  - "Error 02h 0Dh: command rejected when power is off."
  - "Error 02h 0Fh: command rejected for lack of authority."
# UNRESOLVED: no explicit safety interlock procedures or power-on sequencing
# requirements stated beyond the per-command lockout notes above.
```

## Notes
- Command/response framing: leading byte, then ID1 ID2 (control ID, model code), LEN (data length in bytes after LEN), DATA??, and CKS (checksum = low byte of sum of all preceding bytes). Example: `20h 81h 01h 60h 01h 00h` → checksum 03h.
- Leading byte convention observed: `00h-03h` request classes, `20h-23h` success responses (class mirrors request class), `A0h-A3h` error responses.
- Serial: RS-232C cross cable to PC CONTROL D-SUB 9P. Pins: 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS. Full duplex.
- LAN: wired RJ-45 (10/100 Mbps auto) or optional wireless LAN unit. TCP port 7142 for command send/receive.
- Usage times (lamp/filter) reported in seconds; updated at 1-minute intervals. Lamp remaining life (%) may return negative if replacement deadline exceeded.
- Reference document: "Projector Control Command Reference Manual", BDT140013 Revision 7.1.
- Source mentions an Appendix "Supplementary Information by Command" containing input terminal values, aspect values, base model type codes, sub input values, and eco mode values — this appendix was NOT present in the refined source and corresponding enum lists are marked UNRESOLVED.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: serial flow_control setting not explicitly stated (only "Full duplex" comm mode). -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" enum lists not present — input terminal codes, aspect values, base model types, sub-input values, eco mode values all referenced but not enumerated. -->
<!-- UNRESOLVED: default baud rate (5 valid options, no default marked). -->
<!-- UNRESOLVED: exact leading-byte opcode convention not formally tabulated in source (inferred from examples). -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:18:38.894Z
last_checked_at: 2026-06-18T08:34:43.294Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:34:43.294Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated. Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, base model type codes, sub input values, eco mode values) not present in refined source — many enum value ranges are referenced but not enumerated."
- "source states \"Full duplex\" comm mode but not RTS/CTS flow control setting"
- "source describes no unsolicited notifications. All responses"
- "source describes no multi-step command sequences."
- "no explicit safety interlock procedures or power-on sequencing"
- "firmware version compatibility not stated in source."
- "serial flow_control setting not explicitly stated (only \"Full duplex\" comm mode)."
- "Appendix \"Supplementary Information by Command\" enum lists not present — input terminal codes, aspect values, base model types, sub-input values, eco mode values all referenced but not enumerated."
- "default baud rate (5 valid options, no default marked)."
- "exact leading-byte opcode convention not formally tabulated in source (inferred from examples)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
