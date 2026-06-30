---
spec_id: admin/sharp-nec-xp-x141q-b
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Xp X141Q B Control Spec"
manufacturer: Sharp/NEC
model_family: "Xp X141Q B"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Xp X141Q B"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T07:15:21.996Z
last_checked_at: 2026-06-19T07:53:02.787Z
generated_at: 2026-06-19T07:53:02.787Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "model code (ID2) value for this specific model not stated in source"
  - "input terminal value map referenced in \"Supplementary Information by Command\" appendix not present in refined source"
  - "flow control not stated; full-duplex noted"
  - "confirm absence of push/event model"
  - "no multi-step sequences explicitly documented in source"
  - "full power-on sequencing / interlock procedures beyond above not detailed in source"
  - "input terminal / aspect / eco-mode / base-model-type value maps missing from refined source"
  - "ID2 model code for Xp X141Q B not stated"
  - "factory-default baud rate not stated"
verification:
  verdict: verified
  checked_at: 2026-06-19T07:53:02.787Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 command entries matched verbatim against source sections 3.1-3.53; transport parameters (serial/TCP, port 7142, 9600 baud, RS-232C framing) confirmed. Complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Xp X141Q B Control Spec

## Summary
The Sharp/NEC Xp X141Q B is a projector controllable via RS-232C serial (PC CONTROL D-SUB 9P) and wired/wireless LAN (TCP). This spec covers the binary command protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1), including power, input switching, mute, picture/volume/aspect adjust, lens control & memory, status queries, and LAN settings commands. Commands are framed hex bytes with an additive low-byte checksum; responses echo the command with status/error bytes.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: model code (ID2) value for this specific model not stated in source -->
<!-- UNRESOLVED: input terminal value map referenced in "Supplementary Information by Command" appendix not present in refined source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists 115200/38400/19200/9600/4800; no single default stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; full-duplex noted
addressing:
  port: 7142  # TCP port for command send/receive (stated)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred: 015 POWER ON / 016 POWER OFF commands
  - queryable     # inferred: extensive status request commands (078-x, 037-x, 097-x, 305-x)
  - levelable     # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 053 LENS CONTROL
  - routable      # inferred: 018 INPUT SW CHANGE
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: While turning on, no other command accepted.

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: While turning off (incl. cooling time), no other command accepted.

  - id: input_sw_change
    label: Input SW Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: Input terminal value (e.g. 06h = video port). See appendix.
    notes: Response DATA01 FFh = ended with error (no signal switch).

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: Cancelled by input/video switch.

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
    notes: Cancelled by input/video switch or volume adjust.

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
        type: integer
        description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
      - name: data02
        type: integer
        description: "Adjustment mode: 00h absolute, 01h relative"
      - name: data03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data04
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
    params:
      - name: data01
        type: integer
        description: "Adjustment mode: 00h absolute, 01h relative"
      - name: data02
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data03
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
    params:
      - name: data01
        type: integer
        description: Aspect value (see appendix).

  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
    params:
      - name: data01
        type: integer
        description: "Target: 96h LAMP ADJUST / LIGHT ADJUST (DATA02=FFh)"
      - name: data02
        type: integer
        description: "FFh for LAMP/LIGHT ADJUST"
      - name: data03
        type: integer
        description: "Adjustment mode: 00h absolute, 01h relative"
      - name: data04
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data05
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "Key code low byte (WORD type). Examples: 02h POWER ON, 03h POWER OFF, 05h AUTO, 06h MENU, 07h UP, 08h DOWN, 09h RIGHT, 0Ah LEFT, 0Bh ENTER, 0Ch EXIT, 0Dh HELP, 0Fh MAGNIFY UP, 10h MAGNIFY DOWN, 13h MUTE, 29h PICTURE, 4Bh COMPUTER1, 4Ch COMPUTER2, 4Fh VIDEO1, 51h S-VIDEO1, 84h VOLUME UP, 85h VOLUME DOWN, 8Ah FREEZE, A3h ASPECT, D7h SOURCE, EEh LAMP MODE/ECO"
      - name: data02
        type: integer
        description: Key code high byte (always 00h in listed codes)

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
        type: integer
        description: "Target: 06h Periphery Focus"
      - name: data02
        type: integer
        description: "Content: 00h Stop, 01h drive 1s plus, 02h 0.5s plus, 03h 0.25s plus, 7Fh drive plus, 81h drive minus, FDh 0.25s minus, FEh 0.5s minus, FFh 1s minus"
    notes: After 7Fh/81h, send 00h to stop. While driving, same command can be reissued without stop.

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: integer
        description: "FFh = Stop (when stop, mode/value ignored)"
      - name: data02
        type: integer
        description: "Adjustment mode: 00h absolute, 02h relative"
      - name: data03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data04
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h MOVE, 01h STORE, 02h RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h MOVE, 01h STORE, 02h RESET"
    notes: Controls profile number set via 053-10 LENS PROFILE SET.

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
      - name: data02
        type: integer
        description: "Setting value: 00h OFF, 01h ON"

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "Profile number: 00h Profile 1, 01h Profile 2"

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "01h freeze on, 02h freeze off"

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: Eco mode value (see appendix; sets Light mode or Lamp mode depending on model)

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01}-{data16} 00h {cks}"
    params:
      - name: data01_to_data16
        type: string
        description: Projector name (up to 16 bytes, NUL-terminated)

  - id: pip_pbp_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
      - name: data02
        type: integer
        description: "Setting value (MODE: 00h PIP, 01h PBP; START POSITION: 00h TL, 01h TR, 02h BL, 03h BR; sub-input values per appendix)"

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h OFF, 01h ON"

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: Input terminal (see appendix)
      - name: data02
        type: integer
        description: "Setting value: 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER"

  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: Response returns DATA01-DATA12 error bitmasks (cover/fan/temp/lamp/formatter/etc.).

  - id: information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: Returns projector name (DATA01-49), lamp usage seconds (DATA83-86), filter usage seconds (DATA87-90).

  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds; -1 if undefined.

  - id: lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
      - name: data02
        type: integer
        description: "01h lamp usage time (seconds), 04h lamp remaining life (%)"
    notes: Negative remaining life returned if replacement deadline exceeded.

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h Total Carbon Savings, 01h Carbon Savings during operation"
    notes: DATA02-05 kg (max 99999), DATA06-09 mg (max 999999).

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    params:
      - name: data01
        type: integer
        description: Lens target (periphery focus etc.)

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: DATA01 bitmask - bit0 lens memory, bit1 zoom, bit2 focus, bit3 lens shift H, bit4 lens shift V (0=stop,1=operating).

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
        type: integer
        description: "00h BRIGHTNESS, 01h CONTRAST, 02h COLOR, 03h HUE, 04h SHARPNESS, 05h VOLUME, 96h LAMP/LIGHT ADJUST"

  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: Returns base model type, sound function, profile/clock/sleep-timer function.

  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: DATA03 power status, DATA04 cooling, DATA05 power process, DATA06 operation status.

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
    notes: DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 OSD.

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
    notes: DATA01 00h normal (cover open), 01h cover closed.

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00 {data01} 01h {cks}"
    params:
      - name: data01
        type: integer
        description: "03h horizontal sync freq, 04h vertical sync freq"

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
    label: PIP/Picture by Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    params:
      - name: data01
        type: integer
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"

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
    notes: Operation status, content displayed, signal types, mute/freeze status.
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    source: 078-2 RUNNING STATUS REQUEST DATA06
  - id: picture_mute
    type: enum
    values: [off, on]
    source: 078-4 MUTE STATUS REQUEST DATA01
  - id: sound_mute
    type: enum
    values: [off, on]
    source: 078-4 DATA02
  - id: onscreen_mute
    type: enum
    values: [off, on]
    source: 078-4 DATA03
  - id: freeze_state
    type: enum
    values: [off, on]
    source: 305-3 BASIC INFORMATION REQUEST DATA09
  - id: lamp_usage_seconds
    type: integer
    source: 037 INFORMATION REQUEST DATA83-86 (updated 1-min intervals)
  - id: filter_usage_seconds
    type: integer
    source: 037-3 FILTER USAGE INFORMATION REQUEST DATA01-04
  - id: lamp_remaining_life_pct
    type: integer
    source: 037-4 LAMP INFORMATION REQUEST 3 (content 04h); negative past deadline
  - id: error_status
    type: bitmask
    source: 009 ERROR STATUS REQUEST DATA01-12
  - id: command_result
    type: enum
    values: [success, error]
    notes: Response frame ERR1/ERR2 per 2.4 error code list
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    description: Sound volume (030-2 VOLUME ADJUST / 060-1 gain 05h)
  - id: brightness
    type: integer
    description: Picture brightness (030-1 target 00h / 060-1 gain 00h)
  - id: contrast
    type: integer
    description: Picture contrast (030-1 target 01h / 060-1 gain 01h)
  - id: color
    type: integer
    description: Picture color (030-1 target 02h / 060-1 gain 02h)
  - id: hue
    type: integer
    description: Picture hue (030-1 target 03h / 060-1 gain 03h)
  - id: sharpness
    type: integer
    description: Picture sharpness (030-1 target 04h / 060-1 gain 04h)
  - id: lamp_light_adjust
    type: integer
    description: Lamp/light adjust (030-15 target 96h / 060-1 gain 96h)
  - id: projector_name
    type: string
    description: LAN projector name (up to 16 bytes; 098-45 set / 097-45 request)
  - id: eco_mode
    type: integer
    description: Eco/Light/Lamp mode (098-8 set / 097-8 request)
```

## Events
```yaml
# No unsolicited notifications documented in source. Device only responds to commands.
# UNRESOLVED: confirm absence of push/event model
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON (015): no other command accepted while power-on in progress"
  - "POWER OFF (016): no other command accepted during power-off incl. cooling time"
  - "Error code 02h 0Dh: command rejected when power is off"
  - "Error code 02h 0Fh: insufficient authority for operation"
# UNRESOLVED: full power-on sequencing / interlock procedures beyond above not detailed in source
```

## Notes
- Frame format: header bytes + `<ID1> <ID2>` (control ID, model code) + LEN + DATA + checksum. Response prefix `2xh` (ack) or `Axh` (error) mirroring command opcode.
- Checksum = low-order byte of sum of all preceding bytes (see §2.2 example).
- `ID2` (model code) is model-dependent and not stated for this model in source — must be read from device or a model table.
- Baud rate selectable among 4800/9600/19200/38400/115200; no single factory default stated.
- Several commands reference an "Appendix: Supplementary Information by Command" for value maps (input terminals, aspect values, eco-mode values, base model types, selection signal types) — that appendix is not in the refined source, so those enums are UNRESOLVED.
- Pin assignments: PC CONTROL D-SUB 9P (2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS); LAN RJ-45.
<!-- UNRESOLVED: input terminal / aspect / eco-mode / base-model-type value maps missing from refined source -->
<!-- UNRESOLVED: ID2 model code for Xp X141Q B not stated -->
<!-- UNRESOLVED: factory-default baud rate not stated -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T07:15:21.996Z
last_checked_at: 2026-06-19T07:53:02.787Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:53:02.787Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 command entries matched verbatim against source sections 3.1-3.53; transport parameters (serial/TCP, port 7142, 9600 baud, RS-232C framing) confirmed. Complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "model code (ID2) value for this specific model not stated in source"
- "input terminal value map referenced in \"Supplementary Information by Command\" appendix not present in refined source"
- "flow control not stated; full-duplex noted"
- "confirm absence of push/event model"
- "no multi-step sequences explicitly documented in source"
- "full power-on sequencing / interlock procedures beyond above not detailed in source"
- "input terminal / aspect / eco-mode / base-model-type value maps missing from refined source"
- "ID2 model code for Xp X141Q B not stated"
- "factory-default baud rate not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
