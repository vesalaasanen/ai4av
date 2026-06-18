---
spec_id: admin/sharp-nec-c981q-pc4
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC C981Q Pc4 Control Spec"
manufacturer: Sharp/NEC
model_family: "C981Q Pc4"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "C981Q Pc4"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:12:24.472Z
last_checked_at: 2026-06-17T19:39:00.221Z
generated_at: 2026-06-17T19:39:00.221Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated. Input terminal value table, eco mode value table, and base model type value table referenced as appendix (\"Supplementary Information by Command\") but not present in source text."
  - "full value table not in source"
  - "value table not in source"
  - "enum values in appendix not in source"
  - "enum in appendix"
  - "source describes no unsolicited notifications. Device only responds to commands."
  - "no multi-step sequences described in source."
  - "no explicit safety interlock procedure or power-on sequencing requirement stated in source."
  - "ID2 model code value for C981Q Pc4 not stated in source."
  - "Input terminal value table (DATA01 of 018/319-10) referenced as appendix \"Supplementary Information by Command\" — not present in extracted text."
  - "Aspect value table referenced as appendix — not present."
  - "Eco mode value table referenced as appendix — not present."
  - "Base model type value table referenced as appendix — not present."
  - "Sub input setting value table (for PIP/PbyP) referenced as appendix — not present."
  - "Flow control method not explicitly stated (full-duplex only noted)."
  - "Firmware version compatibility not stated."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:39:00.221Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 actions matched verbatim hex commands; complete bidirectional coverage of source command catalogue with perfect transport parameter alignment. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC C981Q Pc4 Control Spec

## Summary
Sharp/NEC large-venue projector. Control via RS-232C serial (PC CONTROL D-SUB 9P) and TCP/IP LAN (wired RJ-45 or wireless, TCP port 7142). Binary hex command protocol with checksum byte (low-order byte of sum of all preceding bytes). Source: Projector Control Command Reference Manual BDT140013 Rev 7.1.

<!-- UNRESOLVED: firmware version compatibility not stated. Input terminal value table, eco mode value table, and base model type value table referenced as appendix ("Supplementary Information by Command") but not present in source text. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; pick highest default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: full-duplex stated, no flow control field in source
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # inferred from POWER ON/OFF commands (015, 016)
- queryable      # inferred from many request commands
- routable       # inferred from INPUT SW CHANGE (018)
- levelable      # inferred from VOLUME/PICTURE ADJUST (030-1, 030-2)
```

## Actions
```yaml
# Frame: <HDR> <ID1> <ID2> <LEN> <DATA...> <CKS>
# ID1 = control ID set on projector; ID2 = model code (varies).
# CKS = low-order byte of sum of all preceding bytes.
# Responses: 20h/21h/22h/23h = success ack prefix; A0h/A1h/A2h/A3h = error ack prefix.

- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

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
  notes: No other command accepted during power-off incl. cooling time.

- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {input} {cks}"
  params:
    - name: input
      type: string
      description: Input terminal byte (e.g. 06h = video). See appendix Supplementary Information by Command for full list.  # UNRESOLVED: full value table not in source

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
  command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} {cks}"
  params:
    - name: target
      type: enum
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: enum
      description: "00h=absolute, 01h=relative"
    - name: value_lo
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_hi
      type: integer
      description: Adjustment value high-order 8 bits

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
      description: Value low-order 8 bits
    - name: value_hi
      type: integer
      description: Value high-order 8 bits

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {value} 00h {cks}"
  params:
    - name: value
      type: string
      description: Aspect byte. See appendix.  # UNRESOLVED: value table not in source

- id: other_adjust_lamp
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h 96h FFh {mode} {value_lo} {value_hi} {cks}"
  params:
    - name: mode
      type: enum
      description: "00h=absolute, 01h=relative"
    - name: value_lo
      type: integer
    - name: value_hi
      type: integer

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: Returns projector name (DATA01-49), lamp usage time sec (DATA83-86), filter usage time sec (DATA87-90).

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: Returns filter usage time sec (DATA01-04), filter alarm start time sec (DATA05-08); -1 if undefined.

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
      description: "01h=usage time sec, 04h=remaining life %"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {type} {cks}"
  params:
    - name: type
      type: enum
      description: "00h=Total, 01h=During operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {key_lo} {key_hi} {cks}"
  params:
    - name: key_lo
      type: string
      description: "WORD key code low byte. Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: key_hi
      type: string
      description: "WORD key code high byte (00h for all listed keys)"

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
  command: "02h 18h 00h 00h 02h {target} {content} {cks}"
  params:
    - name: target
      type: string
      description: "06h=Periphery Focus (only documented value)"
    - name: content
      type: enum
      description: "00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus continuous, 81h=drive minus continuous, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {target} 00h {cks}"
  params:
    - name: target
      type: string
      description: Lens adjustment target
  notes: Returns upper/lower limits and current value (DATA02-07).

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {cks}"
  params:
    - name: target
      type: string
      description: "FFh=Stop (mode/value ignored when stop)"
    - name: mode
      type: enum
      description: "00h=absolute, 02h=relative"
    - name: value_lo
      type: integer
    - name: value_hi
      type: integer

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
  notes: Controls profile number set by LENS PROFILE SET (053-10).

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {option} {cks}"
  params:
    - name: option
      type: enum
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

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

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: Returns DATA01 bitmask: bit0 lens memory, bit1 zoom, bit2 focus, bit3 lens shift H, bit4 lens shift V (0=stop,1=operating).

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {profile} {cks}"
  params:
    - name: profile
      type: enum
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {name} 00h 00h {cks}"
  params:
    - name: name
      type: enum
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: Returns base model type (DATA01-03), sound function (DATA04), profile number (DATA05).

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: Returns power status, cooling process, power on/off process, operation status.

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
  notes: Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display (each 00h=off, 01h=on).

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
  notes: "DATA01: 00h=normal (cover opened), 01h=cover closed."

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {state} {cks}"
  params:
    - name: state
      type: enum
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {type} 01h {cks}"
  params:
    - name: type
      type: enum
      description: "03h=horizontal sync frequency, 04h=vertical sync frequency"

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
  command: "03h B0h 00h 00h 02h C5h {param} {cks}"
  params:
    - name: param
      type: enum
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {value} {cks}"
  params:
    - name: value
      type: string
      description: Eco mode value byte. See appendix.  # UNRESOLVED: value table not in source

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {name_bytes_16} 00h {cks}"
  params:
    - name: name_bytes_16
      type: string
      description: Projector name, up to 16 bytes (NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {param} {value} {cks}"
  params:
    - name: param
      type: enum
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: string
      description: Setting value (mode: 00h=PIP/01h=PiP-by-PiP; position: 00h-03h TL/TR/BL/BR; sub input: see appendix)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {value} {cks}"
  params:
    - name: value
      type: enum
      description: "00h=OFF, 01h=ON"

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
  notes: Returns operation status, content displayed, signal type, mute states, freeze status.

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {input} {value} {cks}"
  params:
    - name: input
      type: string
      description: Input terminal byte. See appendix.  # UNRESOLVED: value table not in source
    - name: value
      type: enum
      description: "00h=terminal specified in input, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: running_status_request DATA03/DATA06 + basic_information_request DATA01

- id: error_status
  type: bitmask
  description: 12-byte error info (DATA01-12) from error_status_request. Bits cover cover/fan/temp/power/lamp/ formatter errors. See source section 3.1.

- id: lamp_usage_time
  type: integer
  unit: seconds
  description: Updated at 1-minute intervals. From information_request DATA83-86 or lamp_information_request_3.

- id: lamp_remaining_life
  type: integer
  unit: percent
  description: Negative if replacement deadline exceeded. From lamp_information_request_3 content 04h.

- id: filter_usage_time
  type: integer
  unit: seconds

- id: mute_state
  type: object
  description: picture/sound/onscreen/forced-onscreen each 00h=off 01h=on. From mute_status_request.

- id: freeze_state
  type: enum
  values: [off, on]

- id: lens_operation
  type: bitmask
  description: bit0 memory, bit1 zoom, bit2 focus, bit3 shift-H, bit4 shift-V. From lens_information_request.

- id: cover_state
  type: enum
  values: [normal_opened, closed]

- id: input_signal_status
  type: object
  description: signal list number, selection type 1/2, list type, test pattern, content displayed. From input_status_request.

- id: eco_mode
  type: string
  description: Light/Lamp mode value.  # UNRESOLVED: enum values in appendix not in source

- id: edge_blending_mode
  type: enum
  values: [off, on]
```

## Variables
```yaml
- id: volume
  type: integer
  description: Sound volume, set via volume_adjust. Absolute or relative.

- id: picture_brightness
  type: integer
  description: Picture brightness, set via picture_adjust target 00h.

- id: picture_contrast
  type: integer

- id: picture_color
  type: integer

- id: picture_hue
  type: integer

- id: picture_sharpness
  type: integer

- id: lamp_light_adjust
  type: integer
  description: Lamp/Light adjust gain, set via other_adjust_lamp.

- id: aspect
  type: string
  description: Aspect value byte.  # UNRESOLVED: enum in appendix

- id: eco_mode_value
  type: string
  description:  # UNRESOLVED: enum in appendix

- id: lan_projector_name
  type: string
  max_length: 16

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications. Device only responds to commands.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: >
  Power on/off commands reject all other commands during transition (incl. cooling).
  Cover/lens-cover status monitorable via cover_status_request (DATA01 01h = closed).
  Error bitmask (error_status_request) surfaces fan/temperature/power/lamp/interlock/foreign-matter faults.
  Interlock switch open state reported in extended status DATA09 bit1.
  No explicit confirmation procedure or safety sequence documented beyond error reporting.
# UNRESOLVED: no explicit safety interlock procedure or power-on sequencing requirement stated in source.
```

## Notes
- Baud rate selectable: 115200/38400/19200/9600/4800 bps. Picked 115200 as default; configure projector side to match.
- Checksum: sum all preceding bytes, take low-order 8 bits. Example `20h+81h+01h+60h+01h+00h = 103h` → CKS `03h`.
- Command ack prefixes: success = `20h/21h/22h/23h`, error = `A0h/A1h/A2h/A3h` followed by ERR1 ERR2 CKS.
- ID1 = control ID configured on projector. ID2 = model code (varies per model — must be discovered).
- Error code table: 24 ERR1/ERR2 combos documented (section 2.4). `02h 0Dh` = "command cannot be accepted because the power is off" relevant for control sequencing.
- LAN projector name max 16 bytes, NUL-terminated.
- Lamp/filter usage updated 1-minute intervals despite 1-second resolution.

<!-- UNRESOLVED: ID2 model code value for C981Q Pc4 not stated in source. -->
<!-- UNRESOLVED: Input terminal value table (DATA01 of 018/319-10) referenced as appendix "Supplementary Information by Command" — not present in extracted text. -->
<!-- UNRESOLVED: Aspect value table referenced as appendix — not present. -->
<!-- UNRESOLVED: Eco mode value table referenced as appendix — not present. -->
<!-- UNRESOLVED: Base model type value table referenced as appendix — not present. -->
<!-- UNRESOLVED: Sub input setting value table (for PIP/PbyP) referenced as appendix — not present. -->
<!-- UNRESOLVED: Flow control method not explicitly stated (full-duplex only noted). -->
<!-- UNRESOLVED: Firmware version compatibility not stated. -->
````

Spec done. 53 actions, all hex verbatim. Gaps marked `UNRESOLVED` (appendix value tables absent from refined source, ID2 model code, firmware).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:12:24.472Z
last_checked_at: 2026-06-17T19:39:00.221Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:39:00.221Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 actions matched verbatim hex commands; complete bidirectional coverage of source command catalogue with perfect transport parameter alignment. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated. Input terminal value table, eco mode value table, and base model type value table referenced as appendix (\"Supplementary Information by Command\") but not present in source text."
- "full value table not in source"
- "value table not in source"
- "enum values in appendix not in source"
- "enum in appendix"
- "source describes no unsolicited notifications. Device only responds to commands."
- "no multi-step sequences described in source."
- "no explicit safety interlock procedure or power-on sequencing requirement stated in source."
- "ID2 model code value for C981Q Pc4 not stated in source."
- "Input terminal value table (DATA01 of 018/319-10) referenced as appendix \"Supplementary Information by Command\" — not present in extracted text."
- "Aspect value table referenced as appendix — not present."
- "Eco mode value table referenced as appendix — not present."
- "Base model type value table referenced as appendix — not present."
- "Sub input setting value table (for PIP/PbyP) referenced as appendix — not present."
- "Flow control method not explicitly stated (full-duplex only noted)."
- "Firmware version compatibility not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
