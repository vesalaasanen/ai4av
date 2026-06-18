---
spec_id: admin/sharp-nec-ld-e121
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld E121 Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld E121"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld E121"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:47:43.074Z
last_checked_at: 2026-06-17T19:59:54.986Z
generated_at: 2026-06-17T19:59:54.986Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal value table (DATA01 of 018) lives in \"Supplementary Information by Command\" appendix not included in this source. Aspect values, eco mode values, sub-input values, base model types likewise reference the same appendix — not in source."
  - "flow control not stated in source (full duplex noted only)"
  - "not in this source). Example 06h = video port."
  - "not in this source)"
  - "source documents no unsolicited notifications. All responses are"
  - "source documents no named multi-step sequences."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "<ID2> model code for Ld E121 not stated."
  - "input terminal DATA01 value table (018, 319-10) not in source."
  - "aspect value table (030-12) not in source."
  - "eco mode value table (097-8 / 098-8) not in source."
  - "sub-input value table (097-198 / 098-198) not in source."
  - "base model type value table (078-1 / 305-1) not in source."
  - "serial flow_control not stated."
  - "firmware version compatibility not stated."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:59:54.986Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched exact command bytes from source; transport parameters verbatim; one-to-one coverage. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld E121 Control Spec

## Summary
Sharp/NEC Ld E121 projector. Binary RS-232C control protocol, also reachable over LAN via TCP port 7142. Spec covers full command catalogue: power, input switching, mute, picture/volume/lens adjust, lens memory, status queries, eco/edge-blend/PIP set, and informational requests.

<!-- UNRESOLVED: input terminal value table (DATA01 of 018) lives in "Supplementary Information by Command" appendix not included in this source. Aspect values, eco mode values, sub-input values, base model types likewise reference the same appendix — not in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (full duplex noted only)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable  # inferred from POWER ON / POWER OFF commands (015 / 016)
  - levelable  # inferred from PICTURE ADJUST, VOLUME ADJUST, LAMP ADJUST, LENS CONTROL
  - queryable  # inferred from numerous REQUEST commands
  - routable   # inferred from INPUT SW CHANGE (018) and AUDIO SELECT SET (319-10)
```

## Actions
```yaml
# All command payloads are hex byte sequences. Format convention:
#   {class} {cmd} 00h 00h {len} {data...} {cks}
# <ID1>, <ID2>, <CKS> are runtime-computed frame fields (see Notes).
# One action per source row - 53 distinct commands.

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

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: Input terminal value (see Appendix "Supplementary Information by Command" - UNRESOLVED: not in this source). Example 06h = video port.

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
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
  params:
    - name: data01
      type: integer
      description: Adjustment target - 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness
    - name: data02
      type: integer
      description: Adjustment mode - 00h absolute, 01h relative
    - name: data03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
  params:
    - name: data01
      type: integer
      description: Adjustment mode - 00h absolute, 01h relative
    - name: data02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data03
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: integer
      description: Aspect value (see Appendix "Supplementary Information by Command" - UNRESOLVED: not in this source)

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
  params:
    - name: data01
      type: integer
      description: Adjustment target - fixed 96h (LAMP ADJUST / LIGHT ADJUST); DATA02 fixed FFh
    - name: data03
      type: integer
      description: Adjustment mode - 00h absolute, 01h relative
    - name: data04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data05
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: Lamp - 00h Lamp 1, 01h Lamp 2 (two-lamp models only)
    - name: data02
      type: integer
      description: Content - 01h usage time (seconds), 04h remaining life (%)

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: 00h Total Carbon Savings, 01h Carbon Savings during operation

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: Key code low byte (WORD type). Examples - 02h POWER ON, 03h POWER OFF, 05h AUTO, 06h MENU, 07h UP, 08h DOWN, 09h RIGHT, 0Ah LEFT, 0Bh ENTER, 0Ch EXIT, 0Dh HELP, 0Fh MAGNIFY UP, 10h MAGNIFY DOWN, 13h MUTE, 29h PICTURE, 4Bh COMPUTER1, 4Ch COMPUTER2, 4Fh VIDEO1, 51h S-VIDEO1, 84h VOLUME UP, 85h VOLUME DOWN, 8Ah FREEZE, A3h ASPECT, D7h SOURCE, EEh LAMP MODE/ECO
    - name: data02
      type: integer
      description: Key code high byte (00h for all listed keys)

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
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: Lens axis (06h Periphery Focus is the only value documented in this source)
    - name: data02
      type: integer
      description: Content - 00h Stop, 01h drive +1s, 02h drive +0.5s, 03h drive +0.25s, 7Fh drive +continuous, 81h drive -continuous, FDh drive -0.25s, FEh drive -0.5s, FFh drive -1s

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: integer
      description: Lens axis identifier

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
  params:
    - name: data01
      type: integer
      description: Lens axis; FFh = Stop (mode/value ignored)
    - name: data02
      type: integer
      description: Adjustment mode - 00h absolute, 02h relative
    - name: data03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: 00h MOVE, 01h STORE, 02h RESET

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: 00h MOVE, 01h STORE, 02h RESET

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: 00h LOAD BY SIGNAL, 01h FORCED MUTE

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: 00h LOAD BY SIGNAL, 01h FORCED MUTE
    - name: data02
      type: integer
      description: 00h OFF, 01h ON

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: Profile number - 00h Profile 1, 01h Profile 2

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: data01
      type: integer
      description: Adjusted value name - 00h PICTURE/BRIGHTNESS, 01h PICTURE/CONTRAST, 02h PICTURE/COLOR, 03h PICTURE/HUE, 04h PICTURE/SHARPNESS, 05h VOLUME, 96h LAMP ADJUST/LIGHT ADJUST

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

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

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: 01h freeze on, 02h freeze off

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: data01
      type: integer
      description: 03h horizontal sync frequency, 04h vertical sync frequency

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
  label: PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: Eco mode value (see Appendix "Supplementary Information by Command" - UNRESOLVED: not in this source)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: data01_16
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_pbp_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3
    - name: data02
      type: integer
      description: Setting value - MODE: 00h PIP / 01h PBP; START POSITION: 00h TL / 01h TR / 02h BL / 03h BR; SUB INPUT: sub-input value (see Appendix - UNRESOLVED: not in this source)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: 00h OFF, 01h ON

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
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: Input terminal (see Appendix "Supplementary Information by Command" - UNRESOLVED: not in this source)
    - name: data02
      type: integer
      description: 00h terminal-specified, 01h BNC, 02h COMPUTER
```

## Feedbacks
```yaml
# Response framing: each response begins with class byte A0h/A1h/A2h/A3h (request
# class + 20h), followed by <ID1> <ID2>, LEN byte, data, <CKS>. Error responses
# carry <ERR1> <ERR2> in place of data. See error code table in Notes.

- id: error_status
  type: bitmask
  length_bytes: 12
  description: 12-byte error bitmask returned by 009 ERROR STATUS REQUEST. Bit 0 = normal, 1 = error.

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, network_standby]
  source: 078-2 RUNNING STATUS REQUEST DATA06 / 305-3 BASIC INFORMATION REQUEST DATA01

- id: input_signal_status
  type: composite
  description: Returned by 078-3 INPUT STATUS REQUEST - signal switch process, list number, selection signal types 1/2, list type, test pattern, content displayed.

- id: mute_status
  type: composite
  fields:
    picture_mute: [off, on]
    sound_mute: [off, on]
    onscreen_mute: [off, on]
    forced_onscreen_mute: [off, on]
    onscreen_display: [not_displayed, displayed]
  source: 078-4 MUTE STATUS REQUEST

- id: cover_status
  type: enum
  values: [normal_open, closed]
  source: 078-6 COVER STATUS REQUEST

- id: lens_operation_status
  type: bitmask
  description: 053-7 LENS INFORMATION REQUEST DATA01 - bits for lens memory, zoom, focus, lens shift H/V (0 stop, 1 during operation).

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: 053-11 LENS PROFILE REQUEST

- id: eco_mode
  type: integer
  description: Value returned by 097-8 ECO MODE REQUEST (actual enum values reference appendix - UNRESOLVED).

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: 097-243-1 EDGE BLENDING MODE REQUEST

- id: mac_address
  type: string
  length_bytes: 6
  source: 097-155 LAN MAC ADDRESS STATUS REQUEST2

- id: projector_name
  type: string
  source: 097-45 LAN PROJECTOR NAME REQUEST / 037 INFORMATION REQUEST DATA01-49

- id: model_name
  type: string
  source: 078-5 MODEL NAME REQUEST

- id: serial_number
  type: string
  source: 305-2 SERIAL NUMBER REQUEST

- id: base_model_type
  type: composite
  description: 305-1 BASE MODEL TYPE REQUEST - base model type + model name (enum values reference appendix - UNRESOLVED).

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: 037-4 LAMP INFORMATION REQUEST 3 (DATA03-06); updated at 1-minute intervals

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: 037-4 LAMP INFORMATION REQUEST 3; negative if replacement deadline exceeded

- id: filter_usage_time
  type: integer
  unit: seconds
  source: 037-3 FILTER USAGE INFORMATION REQUEST (DATA01-04); -1 if undefined

- id: carbon_savings
  type: composite
  description: 037-6 returns kilograms (DATA02-05, max 99999) and milligrams (DATA06-09, max 999999); total or operation-only per DATA01.

- id: gain_parameter
  type: composite
  description: 060-1 GAIN PARAMETER REQUEST 3 returns status, upper/lower/default/current limits, wide/narrow adjustment widths, default-validity flag.

- id: execution_result
  type: enum
  values: [success, error]
  description: DATA01+DATA02 = 0000h success, other = error. Returned by 030-* and 053-* adjustment commands.
```

## Variables
```yaml
- id: volume
  type: integer
  description: Sound volume (set via 030-2 VOLUME ADJUST; queried via 060-1 with data01=05h)

- id: brightness
  type: integer
  description: Picture brightness (030-1 with data01=00h; query 060-1 data01=00h)

- id: contrast
  type: integer
  description: Picture contrast (030-1 data01=01h; query 060-1 data01=01h)

- id: color
  type: integer
  description: Picture color (030-1 data01=02h; query 060-1 data01=02h)

- id: hue
  type: integer
  description: Picture hue (030-1 data01=03h; query 060-1 data01=03h)

- id: sharpness
  type: integer
  description: Picture sharpness (030-1 data01=04h; query 060-1 data01=04h)

- id: lamp_adjust
  type: integer
  description: Lamp/Light adjust (030-15 with data01=96h; query 060-1 data01=96h)

- id: aspect
  type: integer
  description: Aspect value (030-12 ASPECT ADJUST; enum values reference appendix - UNRESOLVED)
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. All responses are
# solicited (returned after a command).
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Note only: POWER ON/OFF block other
# commands during execution/cooling (documented behavior, not a safety interlock).
```

## Notes
- **Frame format**: `{class} {cmd} 00h 00h {len} {data...} {cks}`. Classes: 00h=request-only queries, 01h=control (freeze), 02h=control, 03h=adjust/set. Response class = request class + 20h (A0h/A1h/A2h/A3h). Error responses always carry `<ERR1> <ERR2>`.
- **`<ID1>`**: projector control ID (set on device).
- **`<ID2>`**: model code, varies by model — UNRESOLVED for Ld E121 (not stated in this manual).
- **`<CKS>`**: checksum = low-order byte of sum of all preceding bytes. Worked example in source: `20h + 81h + 01h + 60h + 01h + 00h = 103h` → CKS = `03h`.
- **`<LEN>`**: byte count of the data part following LEN.
- **POWER ON** blocks other commands while turning on; **POWER OFF** blocks during power-off + cooling time.
- **Picture/Sound/Onscreen mute** auto-clear on input terminal switch or video signal switch; sound mute also clears on volume adjustment.
- **LENS CONTROL** (053): after sending `7Fh`/`81h` (continuous drive), send `00h` to stop. Lens can be re-controlled mid-drive without explicit stop.
- **Information refresh**: lamp/filter usage times are readable in 1-second units but updated only at 1-minute intervals.
- **Source manual revision**: BDT140013 Rev 7.1.
- Source repeatedly references an "Appendix: Supplementary Information by Command" for input terminal values, aspect values, eco mode values, sub-input values, selection signal types, and base model types. **That appendix is not in the provided refined source** — all such enums are marked UNRESOLVED.

<!-- UNRESOLVED: <ID2> model code for Ld E121 not stated. -->
<!-- UNRESOLVED: input terminal DATA01 value table (018, 319-10) not in source. -->
<!-- UNRESOLVED: aspect value table (030-12) not in source. -->
<!-- UNRESOLVED: eco mode value table (097-8 / 098-8) not in source. -->
<!-- UNRESOLVED: sub-input value table (097-198 / 098-198) not in source. -->
<!-- UNRESOLVED: base model type value table (078-1 / 305-1) not in source. -->
<!-- UNRESOLVED: serial flow_control not stated. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:47:43.074Z
last_checked_at: 2026-06-17T19:59:54.986Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:59:54.986Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched exact command bytes from source; transport parameters verbatim; one-to-one coverage. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal value table (DATA01 of 018) lives in \"Supplementary Information by Command\" appendix not included in this source. Aspect values, eco mode values, sub-input values, base model types likewise reference the same appendix — not in source."
- "flow control not stated in source (full duplex noted only)"
- "not in this source). Example 06h = video port."
- "not in this source)"
- "source documents no unsolicited notifications. All responses are"
- "source documents no named multi-step sequences."
- "source contains no explicit safety warnings, interlock procedures,"
- "<ID2> model code for Ld E121 not stated."
- "input terminal DATA01 value table (018, 319-10) not in source."
- "aspect value table (030-12) not in source."
- "eco mode value table (097-8 / 098-8) not in source."
- "sub-input value table (097-198 / 098-198) not in source."
- "base model type value table (078-1 / 305-1) not in source."
- "serial flow_control not stated."
- "firmware version compatibility not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
