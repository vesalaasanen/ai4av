---
spec_id: admin/sharp-nec-e498
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC E498 Control Spec"
manufacturer: Sharp/NEC
model_family: E498
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - E498
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:48:08.716Z
last_checked_at: 2026-06-17T19:43:26.001Z
generated_at: 2026-06-17T19:43:26.001Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "manual is generic \"Projector Control Command Reference Manual\" (BDT140013 Rev 7.1); E498 model identification supplied by operator, not stated verbatim in source text. Firmware version compatibility not stated."
  - "flow control not stated in source (communication mode is \"Full duplex\")"
  - "exact enum values not in source body - referenced to appendix \"Supplementary Information by Command\""
  - "no unsolicited notification events documented in source"
  - "no multi-step sequences documented in source"
  - "no explicit safety warnings or power-on sequencing procedures beyond command-acceptance notes"
  - "appendix \"Supplementary Information by Command\" not in source — input terminal, aspect, eco mode, and sub input enum values incomplete."
  - "firmware version compatibility not stated."
  - "flow_control not stated (full-duplex communication mode stated, but no RTS/CTS or XON/XOFF mention)."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:43:26.001Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions map exactly to source protocol commands with correct opcodes; transport parameters (port, baud rates, frame format) all verified verbatim. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC E498 Control Spec

## Summary
Sharp/NEC projector controlled via RS-232C serial or TCP/IP LAN. Binary hex-byte protocol with checksum. Covers power, input switching, mutes, picture/volume/aspect adjustment, lens control, status queries, and system settings. TCP port 7142.

<!-- UNRESOLVED: manual is generic "Projector Control Command Reference Manual" (BDT140013 Rev 7.1); E498 model identification supplied by operator, not stated verbatim in source text. Firmware version compatibility not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source lists supported rates: 115200/38400/19200/9600/4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (communication mode is "Full duplex")
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable   # inferred from POWER ON/OFF commands
- queryable   # inferred from numerous REQUEST/STATUS query commands
- levelable   # inferred from VOLUME ADJUST and PICTURE ADJUST commands
```

## Actions
```yaml
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
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Input terminal value (e.g. 06h for video port); see source appendix "Supplementary Information by Command" for full value list
    - name: cks
      type: string
      description: Checksum - low-order byte of sum of all preceding bytes

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
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data03
      type: string
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: string
      description: Adjustment value (high-order 8 bits)
    - name: cks
      type: string
      description: Checksum - low-order byte of sum of all preceding bytes

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data02
      type: string
      description: Adjustment value (low-order 8 bits)
    - name: data03
      type: string
      description: Adjustment value (high-order 8 bits)
    - name: cks
      type: string
      description: Checksum - low-order byte of sum of all preceding bytes

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: Value set for the aspect; see source appendix "Supplementary Information by Command"
    - name: cks
      type: string
      description: Checksum - low-order byte of sum of all preceding bytes

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target: 96h=LAMP ADJUST / LIGHT ADJUST (DATA02=FFh for this target)"
    - name: data02
      type: string
      description: Sub-target (FFh for LAMP/LIGHT ADJUST)
    - name: data03
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data04
      type: string
      description: Adjustment value (low-order 8 bits)
    - name: data05
      type: string
      description: Adjustment value (high-order 8 bits)
    - name: cks
      type: string
      description: Checksum - low-order byte of sum of all preceding bytes

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: Key code low byte (e.g. 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 29h=PICTURE, 4Bh=COMPUTER1)
    - name: data02
      type: string
      description: Key code high byte (typically 00h)
    - name: cks
      type: string
      description: Checksum - low-order byte of sum of all preceding bytes

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
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lens target: 06h=Periphery Focus (and others per source)"
    - name: data02
      type: string
      description: "Content: 00h=Stop, 01h=drive plus 1s, 02h=plus 0.5s, 03h=plus 0.25s, 7Fh=plus continuous, 81h=minus continuous, FDh=minus 0.25s, FEh=minus 0.5s, FFh=minus 1s"
    - name: cks
      type: string
      description: Checksum - low-order byte of sum of all preceding bytes

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Target: FFh=Stop (when FFh, mode/value not referenced), or lens axis target"
    - name: data02
      type: string
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: data03
      type: string
      description: Adjustment value (low-order 8 bits)
    - name: data04
      type: string
      description: Adjustment value (high-order 8 bits)
    - name: cks
      type: string
      description: Checksum - low-order byte of sum of all preceding bytes

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
    - name: cks
      type: string
      description: Checksum - low-order byte of sum of all preceding bytes

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
    - name: cks
      type: string
      description: Checksum - low-order byte of sum of all preceding bytes

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: string
      description: "Setting value: 00h=OFF, 01h=ON"
    - name: cks
      type: string
      description: Checksum - low-order byte of sum of all preceding bytes

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"
    - name: cks
      type: string
      description: Checksum - low-order byte of sum of all preceding bytes

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "01h=freeze on, 02h=freeze off"
    - name: cks
      type: string
      description: Checksum - low-order byte of sum of all preceding bytes

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: Value set for the eco mode; see source appendix "Supplementary Information by Command"
    - name: cks
      type: string
      description: Checksum - low-order byte of sum of all preceding bytes

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01}-{data16} 00h {cks}"
  params:
    - name: data01_16
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)
    - name: cks
      type: string
      description: Checksum - low-order byte of sum of all preceding bytes

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: string
      description: "Setting value (varies by DATA01 target; see source for sub input values)"
    - name: cks
      type: string
      description: Checksum - low-order byte of sum of all preceding bytes

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Setting value: 00h=OFF, 01h=ON"
    - name: cks
      type: string
      description: Checksum - low-order byte of sum of all preceding bytes

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: Input terminal value; see source appendix "Supplementary Information by Command"
    - name: data02
      type: string
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
    - name: cks
      type: string
      description: Checksum - low-order byte of sum of all preceding bytes

# --- Queries ---

- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

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
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: string
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
    - name: cks
      type: string
      description: Checksum - low-order byte of sum of all preceding bytes

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    - name: cks
      type: string
      description: Checksum - low-order byte of sum of all preceding bytes

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: Lens axis target (same values as Lens Control DATA01)
    - name: cks
      type: string
      description: Checksum - low-order byte of sum of all preceding bytes

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: cks
      type: string
      description: Checksum - low-order byte of sum of all preceding bytes

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    - name: cks
      type: string
      description: Checksum - low-order byte of sum of all preceding bytes

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

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: string
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    - name: cks
      type: string
      description: Checksum - low-order byte of sum of all preceding bytes

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
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: cks
      type: string
      description: Checksum - low-order byte of sum of all preceding bytes

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
```

## Feedbacks
```yaml
- id: error_status
  type: bitmask
  description: 12-byte error status (DATA01-DATA12); bit=0 normal, bit=1 error. Covers cover, fan, temperature, power, lamp, mirror cover, interlock, and system errors.

- id: power_status
  type: enum
  values: [standby, power_on, standby_error, standby_power_saving, network_standby, cooling]
  description: From RUNNING STATUS REQUEST DATA03/06

- id: mute_status
  type: enum
  description: From MUTE STATUS REQUEST - picture mute, sound mute, onscreen mute, forced onscreen mute

- id: input_status
  type: string
  description: From INPUT STATUS REQUEST - signal type, list number, content displayed

- id: cover_status
  type: enum
  values: [normal_open, closed]

- id: lens_operation_status
  type: bitmask
  description: From LENS INFORMATION REQUEST DATA01 - lens memory, zoom, focus, lens shift H/V operation flags

- id: lamp_usage_time
  type: integer
  unit: seconds
  description: From LAMP INFORMATION REQUEST 3, updated at 1-minute intervals

- id: lamp_remaining_life
  type: integer
  unit: percent
  description: From LAMP INFORMATION REQUEST 3; negative if replacement deadline exceeded

- id: filter_usage_time
  type: integer
  unit: seconds
  description: From FILTER USAGE INFORMATION REQUEST

- id: gain_parameter
  type: object
  description: From GAIN PARAMETER REQUEST 3 - upper/lower limits, default, current, wide/narrow adjustment widths
```

## Variables
```yaml
- id: volume
  type: integer
  description: Sound volume; set via VOLUME ADJUST, read via GAIN PARAMETER REQUEST 3 (DATA01=05h)

- id: brightness
  type: integer
  description: Picture brightness; set via PICTURE ADJUST (DATA01=00h), read via GAIN PARAMETER REQUEST 3 (DATA01=00h)

- id: contrast
  type: integer
  description: Picture contrast; set via PICTURE ADJUST (DATA01=01h), read via GAIN PARAMETER REQUEST 3 (DATA01=01h)

- id: color
  type: integer
  description: Picture color; set via PICTURE ADJUST (DATA01=02h), read via GAIN PARAMETER REQUEST 3 (DATA01=02h)

- id: hue
  type: integer
  description: Picture hue; set via PICTURE ADJUST (DATA01=03h), read via GAIN PARAMETER REQUEST 3 (DATA01=03h)

- id: sharpness
  type: integer
  description: Picture sharpness; set via PICTURE ADJUST (DATA01=04h), read via GAIN PARAMETER REQUEST 3 (DATA01=04h)

- id: lamp_light_adjust
  type: integer
  description: Lamp/Light adjust; set via OTHER ADJUST (DATA01=96h), read via GAIN PARAMETER REQUEST 3 (DATA01=96h)

- id: projector_name
  type: string
  maxLength: 16
  description: LAN projector name; set via LAN PROJECTOR NAME SET, read via LAN PROJECTOR NAME REQUEST

- id: eco_mode
  type: string
  description: Eco/Light/Lamp mode; set via ECO MODE SET, read via ECO MODE REQUEST
  # UNRESOLVED: exact enum values not in source body - referenced to appendix "Supplementary Information by Command"
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "POWER ON: while turning on, no other command accepted"
  - description: "POWER OFF: while turning off (including cooling time), no other command accepted"
# UNRESOLVED: no explicit safety warnings or power-on sequencing procedures beyond command-acceptance notes
```

## Notes
- Binary hex protocol. Every command/response is a framed byte sequence with a trailing checksum (CKS).
- Checksum = low-order byte (8 bits) of the sum of all preceding bytes.
- Command frame format: `<LeadByte> <CommandByte> <ID1> <ID2> <LEN> <DATA...> <CKS>`. Lead byte distinguishes direction/type (e.g. `02h`/`03h` = command, `22h`/`23h`/`20h` = success response, `A2h`/`A3h`/`A0h` = error response).
- ID1 = control ID set on projector; ID2 = model code (varies by model).
- Response errors use ERR1/ERR2 byte pair (see source section 2.4 for full error code table).
- Serial supports baud rates 115200/38400/19200/9600/4800, 8 data bits, no parity, 1 stop bit, full duplex.
- TCP port 7142 for LAN command send/receive.
- Lamp/filter usage time returned in seconds, updated at 1-minute intervals.
- Several commands reference an appendix ("Supplementary Information by Command") not included in the refined source for exact enum values (input terminal codes, aspect values, eco mode values, sub input values).
<!-- UNRESOLVED: appendix "Supplementary Information by Command" not in source — input terminal, aspect, eco mode, and sub input enum values incomplete. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: flow_control not stated (full-duplex communication mode stated, but no RTS/CTS or XON/XOFF mention). -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:48:08.716Z
last_checked_at: 2026-06-17T19:43:26.001Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:43:26.001Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions map exactly to source protocol commands with correct opcodes; transport parameters (port, baud rates, frame format) all verified verbatim. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "manual is generic \"Projector Control Command Reference Manual\" (BDT140013 Rev 7.1); E498 model identification supplied by operator, not stated verbatim in source text. Firmware version compatibility not stated."
- "flow control not stated in source (communication mode is \"Full duplex\")"
- "exact enum values not in source body - referenced to appendix \"Supplementary Information by Command\""
- "no unsolicited notification events documented in source"
- "no multi-step sequences documented in source"
- "no explicit safety warnings or power-on sequencing procedures beyond command-acceptance notes"
- "appendix \"Supplementary Information by Command\" not in source — input terminal, aspect, eco mode, and sub input enum values incomplete."
- "firmware version compatibility not stated."
- "flow_control not stated (full-duplex communication mode stated, but no RTS/CTS or XON/XOFF mention)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
