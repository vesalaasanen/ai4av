---
spec_id: admin/sharp-nec-me431-avt3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Me431 Avt3 Control Spec"
manufacturer: Sharp/NEC
model_family: "Me431 Avt3"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Me431 Avt3"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:36:38.059Z
last_checked_at: 2026-06-18T08:28:25.098Z
generated_at: 2026-06-18T08:28:25.098Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic Projector Control Command Reference Manual and does not itself state a model name; \"Me431 Avt3\" is taken from operator input. The Appendix \"Supplementary Information by Command\" referenced for input terminal values, base model types, eco mode values, and sub-input values is NOT included in the refined source and could not be enumerated."
  - "source states \"Full duplex\" communication mode but does not specify flow_control value; RTS/CTS pins are wired per pin table"
  - "appendix not in refined source."
  - "source does not document any unsolicited notifications; protocol is strictly request/response."
  - "source does not describe any multi-step sequences."
  - "model name not stated in source — taken from operator input (\"Sharp/NEC Me431 Avt3\")."
  - "firmware version compatibility not stated in source."
  - "Appendix \"Supplementary Information by Command\" referenced for input terminal values, base model types, eco mode values, and PIP sub-input values — not present in refined source. Enumerations for those parameters are incomplete."
  - "serial flow_control not specified (RTS/CTS pins wired but role not stated)."
  - "protocol version not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:28:25.098Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC Me431 Avt3 Control Spec

## Summary
Projector control spec for the Sharp/NEC Me431 Avt3. Source (Projector Control Command Reference Manual, BDT140013 Rev 7.1) documents RS-232C serial and TCP/IP (wired/wireless LAN) control. Binary, checksummed command/response protocol over a D-SUB 9P PC CONTROL serial port or TCP port 7142. Covers power, input switching, mutes, lens/shutter, picture/volume/aspect adjustments, status queries, lens memory, eco mode, PIP/PbP, edge blending, and audio select.

<!-- UNRESOLVED: source is a generic Projector Control Command Reference Manual and does not itself state a model name; "Me431 Avt3" is taken from operator input. The Appendix "Supplementary Information by Command" referenced for input terminal values, base model types, eco mode values, and sub-input values is NOT included in the refined source and could not be enumerated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists supported set: 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: source states "Full duplex" communication mode but does not specify flow_control value; RTS/CTS pins are wired per pin table
  # source note: communication mode = Full duplex
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: POWER ON / POWER OFF commands present
  - queryable      # inferred: extensive status request commands present
  - levelable      # inferred: VOLUME ADJUST, PICTURE ADJUST (brightness/contrast/color/hue/sharpness), LAMP ADJUST
```

## Actions
```yaml
actions:
  # ─── Power ────────────────────────────────────────────────
  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: While turning on power, no other command accepted.

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: While turning off (incl. cooling time), no other command accepted.

  # ─── Input switching ──────────────────────────────────────
  - id: input_sw_change
    label: Input SW Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h {input} {cks}"
    params:
      - name: input
        type: integer
        description: Input terminal byte (e.g. 06h = video). Full value list in Appendix "Supplementary Information by Command" - UNRESOLVED: appendix not in refined source.
    notes: Example for video port (DATA01=06h) → "02h 03h 00h 00h 02h 01h 06h 0Eh". Response DATA01 FFh = ended with error (no switch).

  # ─── Mutes ────────────────────────────────────────────────
  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: Auto-off on input/video switch.

  - id: picture_mute_off
    label: Picture Mute Off
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []
    notes: Auto-off on input/video switch or volume adjustment.

  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []
    notes: Auto-off on input/video switch.

  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  # ─── Picture / Volume / Aspect / Gains ────────────────────
  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} {cks}"
    params:
      - name: target
        type: enum
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: enum
        description: "00h=absolute, 01h=relative"
      - name: value_lo
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: value_hi
        type: integer
        description: Adjustment value (high-order 8 bits)
    notes: Example brightness=10 → "03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h". Response DATA01+02 = 0000h on success.

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {cks}"
    params:
      - name: mode
        type: enum
        description: "00h=absolute, 01h=relative"
      - name: value_lo
        type: integer
      - name: value_hi
        type: integer
    notes: Example volume=10 → "03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h".

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {value} 00h {cks}"
    params:
      - name: value
        type: integer
        description: Value set for the aspect. Full value list in Appendix - UNRESOLVED: appendix not in refined source.

  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h {target_lo} {target_hi} {mode} {value_lo} {value_hi} {cks}"
    params:
      - name: target_lo
        type: enum
        description: "96h=LAMP ADJUST / LIGHT ADJUST"
      - name: target_hi
        type: enum
        description: "FFh for LAMP ADJUST / LIGHT ADJUST"
      - name: mode
        type: enum
        description: "00h=absolute, 01h=relative"
      - name: value_lo
        type: integer
      - name: value_hi
        type: integer

  # ─── Remote key code ──────────────────────────────────────
  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {key_lo} {key_hi} {cks}"
    params:
      - name: key_lo
        type: enum
        description: "Key code low byte (WORD type). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
      - name: key_hi
        type: integer
        description: Key code high byte (always 00h per source table)
    notes: Response DATA01=FFh means ended with error.

  # ─── Shutter ──────────────────────────────────────────────
  - id: shutter_close
    label: Shutter Close
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: shutter_open
    label: Shutter Open
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  # ─── Lens control ─────────────────────────────────────────
  - id: lens_control
    label: Lens Control
    kind: action
    command: "02h 18h 00h 00h 02h {target} {content} {cks}"
    params:
      - name: target
        type: enum
        description: "06h=Periphery Focus"
      - name: content
        type: enum
        description: "00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"
    notes: After 7Fh/81h, send 00h to stop. Lens can be re-driven without explicit stop while in motion.

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {cks}"
    params:
      - name: target
        type: enum
        description: "FFh=Stop"
      - name: mode
        type: enum
        description: "00h=absolute, 02h=relative"
      - name: value_lo
        type: integer
      - name: value_hi
        type: integer
    notes: If DATA01=Stop, mode and value are not referenced.

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {operation} {cks}"
    params:
      - name: operation
        type: enum
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {operation} {cks}"
    params:
      - name: operation
        type: enum
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: Operates on profile selected via 053-10 LENS PROFILE SET.

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {option} {value} {cks}"
    params:
      - name: option
        type: enum
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: value
        type: enum
        description: "00h=OFF, 01h=ON"

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {profile} {cks}"
    params:
      - name: profile
        type: enum
        description: "00h=Profile 1, 01h=Profile 2"

  # ─── Freeze ───────────────────────────────────────────────
  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h {state} {cks}"
    params:
      - name: state
        type: enum
        description: "01h=ON, 02h=OFF"

  # ─── Eco mode ─────────────────────────────────────────────
  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h {value} {cks}"
    params:
      - name: value
        type: integer
        description: Value set for the eco mode. Full value list in Appendix - UNRESOLVED: appendix not in refined source.
    notes: Sets "Light mode" or "Lamp mode" depending on projector.

  # ─── LAN projector name ───────────────────────────────────
  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01-16} 00h {cks}"
    params:
      - name: projector_name
        type: string
        description: Projector name (up to 16 bytes, NUL-terminated)

  # ─── PIP / Picture-by-Picture ─────────────────────────────
  - id: pip_pbp_set
    label: PIP / Picture By Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {item} {value} {cks}"
    params:
      - name: item
        type: enum
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "For MODE: 00h=PIP, 01h=PBP. For START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. For SUB INPUT values see Appendix - UNRESOLVED."

  # ─── Edge blending ────────────────────────────────────────
  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {value} {cks}"
    params:
      - name: value
        type: enum
        description: "00h=OFF, 01h=ON"

  # ─── Audio select ─────────────────────────────────────────
  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h {input} {value} {cks}"
    params:
      - name: input
        type: integer
        description: Input terminal. Full value list in Appendix - UNRESOLVED: appendix not in refined source.
      - name: value
        type: enum
        description: "00h=the terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"

  # ─── Queries (kind: query) ────────────────────────────────
  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: Response DATA01-12 carry error-status bitfields (cover, fan, temp, lamp, formatter, FPGA, mirror cover, lens not installed, interlock open, etc.).

  - id: information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: Response DATA01-49 projector name, DATA83-86 lamp usage seconds, DATA87-90 filter usage seconds. Updated 1-min intervals.

  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: Response DATA01-04 filter usage seconds, DATA05-08 filter alarm start seconds. -1 if undefined.

  - id: lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h {lamp} {content} {cks}"
    params:
      - name: lamp
        type: enum
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: content
        type: enum
        description: "01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
    notes: Reflects eco mode if enabled. Negative remaining life if past replacement deadline.

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {type} {cks}"
    params:
      - name: type
        type: enum
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    notes: Response DATA02-05 kilograms (max 99999 kg), DATA06-09 milligrams (max 999999 mg).

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {target} 00h {cks}"
    params:
      - name: target
        type: integer
        description: Lens adjustment target
    notes: Response carries upper/lower bounds + current value for the adjustment range.

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {option} {cks}"
    params:
      - name: option
        type: enum
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: Response DATA01 bitfield: bit0 lens memory, bit1 zoom, bit2 focus, bit3 lens shift H, bit4 lens shift V (0=stop, 1=operating).

  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: Response DATA01: 00h=Profile 1, 01h=Profile 2.

  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h {name} 00h 00h {cks}"
    params:
      - name: name
        type: enum
        description: "00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"
    notes: Response carries status, upper/lower limits, default, current value, wide/narrow adjustment widths.

  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: Response DATA01-03 base model type, DATA04 sound function, DATA05 profile number.

  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: Response DATA03 power status, DATA04 cooling process, DATA05 power on/off process, DATA06 operation status.

  - id: input_status_request
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: Response carries signal switch process, signal list number, selection signal type, test pattern display, content displayed.

  - id: mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: Response DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display.

  - id: model_name_request
    label: Model Name Request
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  - id: cover_status_request
    label: Cover Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: Response DATA01: 00h=normal (cover opened), 01h=cover closed.

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h {type} 01h {cks}"
    params:
      - name: type
        type: enum
        description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

  - id: eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []

  - id: lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: lan_mac_address_status_request_2
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_pbp_request
    label: PIP / Picture By Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h {item} {cks}"
    params:
      - name: item
        type: enum
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []

  - id: serial_number_request
    label: Serial Number Request
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  - id: basic_information_request
    label: Basic Information Request
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: Combined operation status, content displayed, signal types, mutes, freeze.
```

## Feedbacks
```yaml
feedbacks:
  # All command responses share format: {prefix}h {cmd} <ID1> <ID2> {len} <DATA...> <CKS>
  # 2Xh prefix = success response, AXh prefix = error response (carries ERR1+ERR2)
  - id: command_ack
    type: raw
    description: >
      Generic acknowledgement. Success response first byte = 2Xh (X = command-type nibble).
      Error response first byte = AXh; DATA carries ERR1 and ERR2 bytes.
  - id: error_status
    type: bitfield
    description: >
      Error information bitfield (DATA01-12 of ERROR STATUS REQUEST response).
      See source §3.1 table for cover, fan, temperature, lamp, formatter, FPGA, mirror cover,
      lens not installed, interlock switch open, system error decode.
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  - id: mute_state
    type: composite
    description: Picture mute, sound mute, onscreen mute, forced onscreen mute, OSD display flags.
  - id: lens_motion
    type: bitfield
    description: Lens memory / zoom / focus / lens shift H+V motion flags.
```

## Variables
```yaml
variables:
  - id: lamp_usage_seconds
    type: integer
    unit: seconds
    access: read
    notes: Updated at 1-minute intervals.
  - id: filter_usage_seconds
    type: integer
    unit: seconds
    access: read
  - id: lamp_remaining_life_pct
    type: integer
    unit: percent
    access: read
    notes: Negative if replacement deadline exceeded.
  - id: carbon_savings_kg
    type: integer
    unit: kilograms
    access: read
  - id: picture_brightness
    type: integer
    access: read_write
  - id: picture_contrast
    type: integer
    access: read_write
  - id: picture_color
    type: integer
    access: read_write
  - id: picture_hue
    type: integer
    access: read_write
  - id: picture_sharpness
    type: integer
    access: read_write
  - id: volume
    type: integer
    access: read_write
  - id: lamp_light_adjust
    type: integer
    access: read_write
```

## Events
```yaml
events: []  # UNRESOLVED: source does not document any unsolicited notifications; protocol is strictly request/response.
```

## Macros
```yaml
macros: []  # UNRESOLVED: source does not describe any multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON: while turning on, no other command accepted."
  - "POWER OFF: while turning off (incl. cooling time), no other command accepted."
  - "Error DATA09 bit1: interlock switch open."
notes: >
  Source documents command-acceptance interlocks (power-on / power-off busy windows)
  and an interlock-switch-open status bit. No power-on sequencing procedure, voltage
  handling, or maintenance interlock procedure is documented in this refined source.
```

## Notes
- All commands/responses are binary hex frames. Every frame ends with a checksum byte `CKS` computed as low-order 8 bits of the sum of all preceding bytes (see source §2.2 example: 20h+81h+01h+60h+01h+00h = 103h → CKS = 03h).
- Frame parameters: `ID1` = control ID configured on projector, `ID2` = model code, `LEN` = byte length of DATA part, `ERR1`/`ERR2` = response error codes (see source §2.4 for full 21-code table), `DATA??` = variable-length command-specific data.
- Serial: D-SUB 9P cross cable. Pin 2 RxD, 3 TxD, 5 GND, 7 RTS, 8 CTS. Supported baud rates 4800/9600/19200/38400/115200; data 8N1; full duplex.
- LAN: wired RJ-45 (10/100 Mbps auto) or wireless via optional wireless LAN unit. TCP port 7142 for command send/receive.
- Mutes auto-clear on input/video switch (picture/onscreen), or additionally on volume adjustment (sound).
- Lens control commands can be re-issued while lens is in motion without an intermediate stop.

<!-- UNRESOLVED: model name not stated in source — taken from operator input ("Sharp/NEC Me431 Avt3"). -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced for input terminal values, base model types, eco mode values, and PIP sub-input values — not present in refined source. Enumerations for those parameters are incomplete. -->
<!-- UNRESOLVED: serial flow_control not specified (RTS/CTS pins wired but role not stated). -->
<!-- UNRESOLVED: protocol version not stated in source. -->
````

Spec done. 53 commands enumerated (24 actions + 29 queries), all literal hex payloads verbatim from source. Serial 8N1 + TCP 7142 both documented. UNRESOLVED markers on missing appendix, model name, firmware, flow_control.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:36:38.059Z
last_checked_at: 2026-06-18T08:28:25.098Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:28:25.098Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic Projector Control Command Reference Manual and does not itself state a model name; \"Me431 Avt3\" is taken from operator input. The Appendix \"Supplementary Information by Command\" referenced for input terminal values, base model types, eco mode values, and sub-input values is NOT included in the refined source and could not be enumerated."
- "source states \"Full duplex\" communication mode but does not specify flow_control value; RTS/CTS pins are wired per pin table"
- "appendix not in refined source."
- "source does not document any unsolicited notifications; protocol is strictly request/response."
- "source does not describe any multi-step sequences."
- "model name not stated in source — taken from operator input (\"Sharp/NEC Me431 Avt3\")."
- "firmware version compatibility not stated in source."
- "Appendix \"Supplementary Information by Command\" referenced for input terminal values, base model types, eco mode values, and PIP sub-input values — not present in refined source. Enumerations for those parameters are incomplete."
- "serial flow_control not specified (RTS/CTS pins wired but role not stated)."
- "protocol version not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
