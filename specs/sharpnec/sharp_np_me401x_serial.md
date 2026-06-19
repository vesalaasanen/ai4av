---
spec_id: admin/sharp-nec-np-me401x
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP ME401X Control Spec"
manufacturer: Sharp/NEC
model_family: "NP ME401X"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP ME401X"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:22:48.908Z
last_checked_at: 2026-06-18T08:38:35.054Z
generated_at: 2026-06-18T08:38:35.054Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. ID2 model code value not stated (varies by model). Control ID (ID1) default not stated. Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model types) not included in refined source."
  - "flow control not stated (RTS/CTS pins present on connector but config not specified)"
  - "full per-bit response schemas not exhaustively enumerated here; see source §3 for each command's response frame layout."
  - "enum values not in refined source (see Appendix)"
  - "none documented"
  - "source notes power-on/power-off block other commands during transition"
  - "default baud rate not stated (5 options listed). Flow control config not stated. Appendix tables (input terminal values, aspect values, eco mode values, base model types, sub-input setting values) not present in refined source — enum completions blocked. ID2 model code for NP ME401X not stated. Wireless LAN details deferred to separate wireless unit manual."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:38:35.054Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP ME401X Control Spec

## Summary
Sharp/NEC NP ME401X projector. Binary control protocol over RS-232C serial (PC CONTROL D-SUB 9P) and/or wired/wireless LAN (TCP). Commands are hex byte frames: header + ID1 (control ID) + ID2 (model code) + LEN + DATA + checksum. 53 documented commands covering power, input switching, mute, picture/volume/aspect adjust, shutter, lens control/memory, status queries, eco mode, edge blending, PIP/PbP, and audio select.

<!-- UNRESOLVED: firmware version compatibility not stated in source. ID2 model code value not stated (varies by model). Control ID (ID1) default not stated. Appendix "Supplementary Information by Command" (input terminal values, aspect values, eco mode values, base model types) not included in refined source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists 115200/38400/19200/9600/4800 as supported; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated (RTS/CTS pins present on connector but config not specified)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWER ON/OFF commands
  - routable     # inferred from INPUT SW CHANGE command
  - queryable    # inferred from many status request commands
  - levelable    # inferred from PICTURE/VOLUME adjust commands
```

## Actions
```yaml
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: Returns DATA01-DATA12 bitfield error info.

- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: No other command accepted while power-on in progress.

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: No other command accepted during power-off incl. cooling.

- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {input} {checksum}"
  params:
    - name: input
      type: integer
      description: Input terminal byte (e.g. 06h=video). See Appendix.
  notes: "Example video: 02h 03h 00h 00h 02h 01h 06h 0Eh"

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

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

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: target
      type: integer
      description: "00h=Brightness,01h=Contrast,02h=Color,03h=Hue,04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=absolute,01h=relative"
    - name: value_lo
      type: integer
      description: Adjustment value low byte
    - name: value_hi
      type: integer
      description: Adjustment value high byte
  notes: "Example brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: mode
      type: integer
      description: "00h=absolute,01h=relative"
    - name: value_lo
      type: integer
      description: Adjustment value low byte
    - name: value_hi
      type: integer
      description: Adjustment value high byte
  notes: "Example volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {value} 00h {checksum}"
  params:
    - name: value
      type: integer
      description: Aspect value byte (see Appendix)

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {target_lo} {target_hi} {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: target_lo
      type: integer
      description: "96h=LAMP ADJUST/LIGHT ADJUST"
    - name: target_hi
      type: integer
      description: "FFh (fixed)"
    - name: mode
      type: integer
      description: "00h=absolute,01h=relative"
    - name: value_lo
      type: integer
    - name: value_hi
      type: integer

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: Returns projector name, lamp usage time, filter usage time.

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: Returns filter usage time + alarm start time (seconds; -1 if undefined).

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {lamp} {content} {checksum}"
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp1,01h=Lamp2 (two-lamp models only)"
    - name: content
      type: integer
      description: "01h=usage time(s),04h=remaining life(%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {type} {checksum}"
  params:
    - name: type
      type: integer
      description: "00h=Total,01h=During operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {key_lo} {key_hi} {checksum}"
  params:
    - name: key_lo
      type: integer
      description: Key code low byte (see key code list)
    - name: key_hi
      type: integer
      description: Key code high byte (00h for listed keys)
  notes: "Key codes: 02h=POWER ON,03h=POWER OFF,05h=AUTO,06h=MENU,07h=UP,08h=DOWN,09h=RIGHT,0Ah=LEFT,0Bh=ENTER,0Ch=EXIT,0Dh=HELP,0Fh=MAGNIFY UP,10h=MAGNIFY DOWN,13h=MUTE,29h=PICTURE,4Bh=COMPUTER1,4Ch=COMPUTER2,4Fh=VIDEO1,51h=S-VIDEO1,84h=VOLUME UP,85h=VOLUME DOWN,8Ah=FREEZE,A3h=ASPECT,D7h=SOURCE,EEh=LAMP MODE/ECO"

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

- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {target} {content} {checksum}"
  params:
    - name: target
      type: integer
      description: "06h=Periphery Focus"
    - name: content
      type: integer
      description: "00h=Stop,01h=+1s,02h=+0.5s,03h=+0.25s,7Fh=plus,81h=minus,FDh=-0.25s,FEh=-0.5s,FFh=-1s"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {target} 00h {checksum}"
  params:
    - name: target
      type: integer
      description: Lens target byte

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: target
      type: integer
      description: "FFh=Stop, else lens target"
    - name: mode
      type: integer
      description: "00h=absolute,02h=relative"
    - name: value_lo
      type: integer
    - name: value_hi
      type: integer

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: integer
      description: "00h=MOVE,01h=STORE,02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: integer
      description: "00h=MOVE,01h=STORE,02h=RESET"
  notes: Controls profile set via LENS PROFILE SET.

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {option} {checksum}"
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL,01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {option} {value} {checksum}"
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL,01h=FORCED MUTE"
    - name: value
      type: integer
      description: "00h=OFF,01h=ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: Returns bitfield: lens memory/zoom/focus/shift-h/shift-v operation state.

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {profile} {checksum}"
  params:
    - name: profile
      type: integer
      description: "00h=Profile1,01h=Profile2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {target} 00h 00h {checksum}"
  params:
    - name: target
      type: integer
      description: "00h=BRIGHTNESS,01h=CONTRAST,02h=COLOR,03h=HUE,04h=SHARPNESS,05h=VOLUME,96h=LAMP/LIGHT ADJUST"

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: Returns base model type, sound function, profile/clock function.

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: Returns power status, cooling, power process, operation status.

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: Returns picture/sound/onscreen/forced-onscreen mute + OSD state.

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
  notes: "00h=normal(opened),01h=closed"

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {state} {checksum}"
  params:
    - name: state
      type: integer
      description: "01h=on,02h=off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {type} 01h {checksum}"
  params:
    - name: type
      type: integer
      description: "03h=horizontal sync freq,04h=vertical sync freq"

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

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {target} {checksum}"
  params:
    - name: target
      type: integer
      description: "00h=MODE,01h=START POSITION,02h=SUB INPUT/SUB INPUT 1,09h=SUB INPUT 2,0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {value} {checksum}"
  params:
    - name: value
      type: integer
      description: Eco mode value (see Appendix)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {name_01} - {name_16} 00h {checksum}"
  params:
    - name: name_01
      type: string
      description: Projector name bytes (up to 16 bytes)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {target} {value} {checksum}"
  params:
    - name: target
      type: integer
      description: "00h=MODE,01h=START POSITION,02h=SUB INPUT 1,09h=SUB INPUT 2,0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value per target

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {value} {checksum}"
  params:
    - name: value
      type: integer
      description: "00h=OFF,01h=ON"

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

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {input} {value} {checksum}"
  params:
    - name: input
      type: integer
      description: Input terminal (see Appendix)
    - name: value
      type: integer
      description: "00h=specified terminal,01h=BNC,02h=COMPUTER"
```

## Feedbacks
```yaml
# Query responses documented in source. Each *_request action returns a structured
# response frame. Representative observable states:

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: running_status_request DATA03/DATA06

- id: error_status
  type: bitfield
  source: error_status_request DATA01-12
  notes: 96 bits covering cover/fan/temp/power/lamp/formatter/mirror-cover/ballast/iris/lens errors.

- id: mute_state
  type: object
  fields: [picture, sound, onscreen, forced_onscreen, osd_displayed]
  source: mute_status_request DATA01-05

- id: cover_status
  type: enum
  values: [normal_opened, closed]
  source: cover_status_request DATA01

- id: input_signal
  type: object
  fields: [signal_switch_process, signal_list_number, signal_type_1, signal_type_2, content_displayed]
  source: input_status_request

# UNRESOLVED: full per-bit response schemas not exhaustively enumerated here; see source §3 for each command's response frame layout.
```

## Variables
```yaml
- id: brightness
  type: integer
  set_via: picture_adjust (target=00h)
  query_via: gain_parameter_request_3 (target=00h)

- id: contrast
  type: integer
  set_via: picture_adjust (target=01h)
  query_via: gain_parameter_request_3 (target=01h)

- id: color
  type: integer
  set_via: picture_adjust (target=02h)
  query_via: gain_parameter_request_3 (target=02h)

- id: hue
  type: integer
  set_via: picture_adjust (target=03h)
  query_via: gain_parameter_request_3 (target=03h)

- id: sharpness
  type: integer
  set_via: picture_adjust (target=04h)
  query_via: gain_parameter_request_3 (target=04h)

- id: volume
  type: integer
  set_via: volume_adjust
  query_via: gain_parameter_request_3 (target=05h)

- id: lamp_adjust
  type: integer
  set_via: other_adjust (target=96h)
  query_via: gain_parameter_request_3 (target=96h)

- id: aspect
  type: enum
  set_via: aspect_adjust
  # UNRESOLVED: enum values not in refined source (see Appendix)

- id: eco_mode
  type: enum
  set_via: eco_mode_set
  query_via: eco_mode_request
  # UNRESOLVED: enum values not in refined source (see Appendix)

- id: edge_blending_mode
  type: enum
  values: [off, on]
  set_via: edge_blending_mode_set
  query_via: edge_blending_mode_request

- id: freeze
  type: enum
  values: [on, off]
  set_via: freeze_control

- id: projector_name
  type: string
  max_length: 16
  set_via: lan_projector_name_set
  query_via: lan_projector_name_request
```

## Events
```yaml
# Source documents request/response only; no unsolicited notifications described.
# UNRESOLVED: none documented
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
# UNRESOLVED: none documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source notes power-on/power-off block other commands during transition
# (incl. cooling time) but describes no user-confirmation interlock procedure.
# Error bitfield (error_status_request) exposes safety sensors: cover error,
# temperature error (bi-metallic strip + sensor), fan error, lamp errors,
# foreign matter sensor, mirror cover error, interlock switch open (DATA09 Bit1).
# No explicit power-on sequencing requirement documented.
```

## Notes
- **Checksum**: sum all preceding bytes, use low-order byte of result. Example: `20h+81h+01h+60h+01h+00h=103h → CKS=03h`.
- **Frame structure**: command = `[cmd bytes]`; success response prefix `2Xh` where X mirrors cmd; error response prefix `AXh` with ERR1/ERR2.
- **Parameters**: ID1 = control ID (set on projector); ID2 = model code (varies by model); LEN = data length after LEN.
- **Usage time**: returned in seconds, updated at 1-minute intervals.
- **Lamp remaining life**: negative value returned if replacement deadline exceeded.
- **Cooling/power-on**: projector rejects all commands during these transitions (ERR `02h 0Dh` "command cannot be accepted because the power is off" may apply).
- **Connector**: PC CONTROL = D-SUB 9P cross cable (pin2 RxD, pin3 TxD, pin5 GND, pin7 RTS, pin8 CTS). LAN = RJ-45.

<!-- UNRESOLVED: default baud rate not stated (5 options listed). Flow control config not stated. Appendix tables (input terminal values, aspect values, eco mode values, base model types, sub-input setting values) not present in refined source — enum completions blocked. ID2 model code for NP ME401X not stated. Wireless LAN details deferred to separate wireless unit manual. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:22:48.908Z
last_checked_at: 2026-06-18T08:38:35.054Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:38:35.054Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. ID2 model code value not stated (varies by model). Control ID (ID1) default not stated. Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model types) not included in refined source."
- "flow control not stated (RTS/CTS pins present on connector but config not specified)"
- "full per-bit response schemas not exhaustively enumerated here; see source §3 for each command's response frame layout."
- "enum values not in refined source (see Appendix)"
- "none documented"
- "source notes power-on/power-off block other commands during transition"
- "default baud rate not stated (5 options listed). Flow control config not stated. Appendix tables (input terminal values, aspect values, eco mode values, base model types, sub-input setting values) not present in refined source — enum completions blocked. ID2 model code for NP ME401X not stated. Wireless LAN details deferred to separate wireless unit manual."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
