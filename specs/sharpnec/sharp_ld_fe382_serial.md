---
spec_id: admin/sharp-nec-ld-fe382
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld Fe382 Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld Fe382"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld Fe382"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:27:44.320Z
last_checked_at: 2026-06-17T20:08:45.688Z
generated_at: 2026-06-17T20:08:45.688Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "appendix \"Supplementary Information by Command\" not present in refined source — input terminal values, aspect values, eco mode values, base model type values, sub input values, and selection signal type mappings could not be enumerated."
  - "flow control not stated (RTS/CTS pins wired but handshake mode not described)"
  - "source documents no unsolicited notifications; protocol is request/response only."
  - "source documents no multi-step command sequences."
  - "source states no confirmation procedures, no power-on sequencing beyond the lockout windows, and no voltage/current specs."
  - "appendix \"Supplementary Information by Command\" referenced throughout (input terminal values, aspect values, eco mode values, base model type values, sub input values, selection signal type mappings) is not present in the refined source and could not be enumerated."
  - "flow_control not stated (RTS/CTS pins are wired per pin table but handshake semantics not described)."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:08:45.688Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions have literal command-byte matches in the source with correct parameters; bidirectional coverage is complete. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld Fe382 Control Spec

## Summary
The Sharp/NEC Ld Fe382 is a projector controllable via RS-232C serial (PC CONTROL D-SUB 9P) and wired/wireless LAN. This spec covers the binary command protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1): power, input switching, mutes, picture/volume/aspect/gain adjust, lens control and memory, shutter, freeze, remote key code, eco mode, edge blending, PIP/PbP, and a broad set of status/information requests. Commands are fixed-length hex frames with a trailing checksum byte.

<!-- UNRESOLVED: appendix "Supplementary Information by Command" not present in refined source — input terminal values, aspect values, eco mode values, base model type values, sub input values, and selection signal type mappings could not be enumerated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists auto-switchable: 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated (RTS/CTS pins wired but handshake mode not described)
addressing:
  port: 7142  # TCP port for LAN command send/receive
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred from POWER ON / POWER OFF commands
  - queryable       # inferred from extensive status/information request commands
  - routable        # inferred from INPUT SW CHANGE command
  - levelable       # inferred from PICTURE ADJUST / VOLUME ADJUST / OTHER ADJUST
```

## Actions
```yaml
# All payloads verbatim from source. Hex bytes separated by spaces as written.
# Frame format: <CMD> <ID1> <ID2> <LEN> <DATA...> <CKS>  (request frames carry literal bytes; CKS = low byte of sum of all preceding bytes)
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
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal (see Appendix "Supplementary Information by Command"; example 06h = video port)

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
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target (00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness)
    - name: DATA02
      type: integer
      description: Adjustment mode (00h absolute, 01h relative)
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjustment mode (00h absolute, 01h relative)
    - name: DATA02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Value set for the aspect (see Appendix "Supplementary Information by Command")

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target high byte (96h when DATA02=FFh = LAMP ADJUST / LIGHT ADJUST)
    - name: DATA02
      type: integer
      description: Adjustment target low byte (FFh = LAMP ADJUST / LIGHT ADJUST)
    - name: DATA03
      type: integer
      description: Adjustment mode (00h absolute, 01h relative)
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
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
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lamp selector (00h Lamp 1, 01h Lamp 2 - only two-lamp models)
    - name: DATA02
      type: integer
      description: Content (01h usage time seconds, 04h remaining life %)

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Content (00h Total Carbon Savings, 01h Carbon Savings during operation)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Key code low byte (see key code list, e.g. 05h = AUTO)
    - name: DATA02
      type: integer
      description: Key code high byte (typically 00h)

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
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens target (06h Periphery Focus)
    - name: DATA02
      type: integer
      description: Drive content (00h Stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh plus continuous, 81h minus continuous, FDh -0.25s, FEh -0.5s, FFh -1s)

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens target

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Target (FFh = Stop)
    - name: DATA02
      type: integer
      description: Adjustment mode (00h absolute, 02h relative)
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Operation (00h MOVE, 01h STORE, 02h RESET)

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Operation (00h MOVE, 01h STORE, 02h RESET)

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Option (00h LOAD BY SIGNAL, 01h FORCED MUTE)

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Option (00h LOAD BY SIGNAL, 01h FORCED MUTE)
    - name: DATA02
      type: integer
      description: Setting value (00h OFF, 01h ON)

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Profile number (00h Profile 1, 01h Profile 2)

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjusted value name (00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light Adjust)

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
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: State (01h freeze on, 02h freeze off)

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Information type (03h horizontal sync frequency, 04h vertical sync frequency)

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

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Content (00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3)

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Value set for the eco mode (see Appendix "Supplementary Information by Command")

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {DATA06} {DATA07} {DATA08} {DATA09} {DATA10} {DATA11} {DATA12} {DATA13} {DATA14} {DATA15} {DATA16} 00h {CKS}"
  params:
    - name: DATA01_16
      type: string
      description: Projector name (up to 16 bytes, NUL terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Content (00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3)
    - name: DATA02
      type: integer
      description: Setting value (MODE: 00h PIP, 01h PbP; START POSITION: 00h TL, 01h TR, 02h BL, 03h BR; sub input per Appendix)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Setting value (00h OFF, 01h ON)

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
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal (see Appendix "Supplementary Information by Command")
    - name: DATA02
      type: integer
      description: Setting value (00h terminal specified in DATA01, 01h BNC, 02h COMPUTER)
```

## Feedbacks
```yaml
# Successful response opcode prefixes: A0h/A1h/A2h/A3h + command index; error response uses AXh with ERR1/ERR2.
- id: error_status
  type: bitmap
  description: 12-byte error information (DATA01-DATA12); bit=0 normal, bit=1 error. Covers cover/fan/temp/power/lamp/ formatter/FPGA/mirror-cover/interlock/system errors.

- id: execution_result
  type: enum
  values: [success, error]
  description: 0000h ended successfully; other = error (returned in DATA01-DATA02 of adjust commands)

- id: response_error
  type: struct
  description: ERR1/ERR2 code pair per source error table (e.g. 00h/00h unrecognized, 00h/01h unsupported, 01h/00h invalid value, 02h/0Dh power off, 02h/0Fh no authority)

- id: power_status
  type: enum
  values: [standby, power_on, not_supported]
  description: From RUNNING STATUS REQUEST DATA03 (00h Standby, 01h Power on, FFh Not supported)

- id: cover_status
  type: enum
  values: [normal_open, closed]
  description: From COVER STATUS REQUEST DATA01 (00h normal/open, 01h closed)
```

## Variables
```yaml
- id: lamp_usage_time_seconds
  type: integer
  description: Lamp usage time in seconds (INFORMATION REQUEST DATA83-86; updated per minute)
- id: filter_usage_time_seconds
  type: integer
  description: Filter usage time in seconds (FILTER USAGE INFORMATION REQUEST DATA01-04)
- id: lamp_remaining_life_percent
  type: integer
  description: Lamp remaining life percent (LAMP INFORMATION REQUEST 3, content 04h; negative if past deadline)
- id: eco_mode
  type: enum
  description: Eco/Light/Lamp mode (values per Appendix)
- id: projector_name
  type: string
  description: LAN projector name (up to 16 bytes)
- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
- id: edge_blending_mode
  type: enum
  values: [off, on]
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications; protocol is request/response only.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "During POWER ON execution no other command can be accepted (source: 015. POWER ON)."
  - description: "During POWER OFF execution including cooling time no other command can be accepted (source: 016. POWER OFF)."
  - description: "Commands rejected with ERR 02h/0Dh when power is off."
  - description: "Picture/Sound/Onscreen mute auto-clear on input terminal switch or video signal switch (per commands 020/022/024)."
# UNRESOLVED: source states no confirmation procedures, no power-on sequencing beyond the lockout windows, and no voltage/current specs.
```

## Notes
- Checksum (CKS) = low-order byte of the sum of all preceding bytes in the frame (including the leading command/index bytes). Worked example from source: `20h+81h+01h+60h+01h+00h = 103h → CKS=03h`.
- Frame layout: leading byte denotes response class (request opcodes 00h-03h; success-response opcodes 20h/21h/22h/23h; error-response opcode A0h-A3h mirroring the request's low nibble), followed by `<ID1> <ID2> <LEN> <DATA...> <CKS>`.
- ID1 = projector control ID; ID2 = model code (varies by model).
- Lamp usage time is returned in one-second units but only refreshed at one-minute intervals.
- LAMP INFORMATION REQUEST 3 with DATA01=01h (Lamp 2) is effective only on two-lamp models.
- Auto baud detect: serial port accepts 115200/38400/19200/9600/4800 bps; configure the controlling software to one of these.

<!-- UNRESOLVED: appendix "Supplementary Information by Command" referenced throughout (input terminal values, aspect values, eco mode values, base model type values, sub input values, selection signal type mappings) is not present in the refined source and could not be enumerated. -->
<!-- UNRESOLVED: flow_control not stated (RTS/CTS pins are wired per pin table but handshake semantics not described). -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
```

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:27:44.320Z
last_checked_at: 2026-06-17T20:08:45.688Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:08:45.688Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions have literal command-byte matches in the source with correct parameters; bidirectional coverage is complete. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "appendix \"Supplementary Information by Command\" not present in refined source — input terminal values, aspect values, eco mode values, base model type values, sub input values, and selection signal type mappings could not be enumerated."
- "flow control not stated (RTS/CTS pins wired but handshake mode not described)"
- "source documents no unsolicited notifications; protocol is request/response only."
- "source documents no multi-step command sequences."
- "source states no confirmation procedures, no power-on sequencing beyond the lockout windows, and no voltage/current specs."
- "appendix \"Supplementary Information by Command\" referenced throughout (input terminal values, aspect values, eco mode values, base model type values, sub input values, selection signal type mappings) is not present in the refined source and could not be enumerated."
- "flow_control not stated (RTS/CTS pins are wired per pin table but handshake semantics not described)."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
