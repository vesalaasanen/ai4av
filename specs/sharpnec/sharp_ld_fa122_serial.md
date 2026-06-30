---
spec_id: admin/sharp-nec-ld-fa122
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld Fa122 Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld Fa122"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld Fa122"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:22:33.559Z
last_checked_at: 2026-06-17T20:01:20.474Z
generated_at: 2026-06-17T20:01:20.474Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated; appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model types, sub input values) not included in the refined source — several enum ranges reference it."
  - "flow control not stated in source (RTS/CTS pins wired but comm-conditions table omits flow control)"
  - "absolute min/max not in refined source (returned dynamically by cmd_060_1)"
  - "no event/notification mechanism described in source."
  - "populate if source contains macro sequences - none found."
  - "no explicit safety interlock procedures or power-on sequencing requirements stated"
  - "input terminal value table, aspect value table, eco mode value table, base model type table, and sub-input value table are referenced to a source Appendix (\"Supplementary Information by Command\") not present in the refined source text. Firmware version compatibility not stated. Wireless LAN unit details deferred to separate operation manual."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:01:20.474Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec commands matched verbatim against source protocol reference; transport parameters verified; full bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld Fa122 Control Spec

## Summary
Sharp/NEC Ld Fa122 projector controlled via a binary hex RS-232C or TCP/IP (LAN) command protocol. Each command is a framed byte sequence with a trailing additive checksum (low-order byte). This spec covers all 53 documented commands spanning power, input switching, mute, picture/volume/lens adjustment, status queries, lens memory, eco mode, PIP/PbP, edge blending, and audio select.

<!-- UNRESOLVED: firmware version compatibility not stated; appendix "Supplementary Information by Command" (input terminal values, aspect values, eco mode values, base model types, sub input values) not included in the refined source — several enum ranges reference it. -->

## Transport
```yaml
# Source documents BOTH a serial (RS-232C) interface and a LAN (TCP) interface.
# Both populated from explicit source statements (Tier 1).
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # TCP port stated in source ("Use TCP port number 7142")
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # all five stated as switchable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (RTS/CTS pins wired but comm-conditions table omits flow control)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# All inferred from command examples (Tier 2)
traits:
  - powerable    # inferred: 015 POWER ON / 016 POWER OFF
  - queryable    # inferred: numerous status request commands
  - levelable    # inferred: 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST
  - routable     # inferred: 018 INPUT SW CHANGE
```

## Actions
```yaml
# Protocol note: command frame = [marker] [opcode] 00h 00h [LEN] [DATA...] [CKS].
# CKS = low-order byte of the sum of all preceding bytes (additive checksum).
# Marker byte encodes command category: 00h=read-class, 01h/02h/03h=write/action-class.
# ID1 (control ID) and ID2 (model code) appear only in responses, not in outbound commands.
# For parameterized commands the variable DATA byte(s) are shown as {placeholders};
# CKS is computed at runtime and therefore shown as {checksum} for templated commands.

- id: cmd_009_error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: cmd_015_power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: While powering on, no other command is accepted.

- id: cmd_016_power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: During power-off (incl. cooling time), no other command is accepted.

- id: cmd_018_input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {input_terminal} {checksum}"
  params:
    - name: input_terminal
      type: byte
      description: "Input terminal value (e.g. 06h = video port). Full list in source Appendix 'Supplementary Information by Command'."
  notes: Example for video port (DATA01=06h): "02h 03h 00h 00h 02h 01h 06h 0Eh"

- id: cmd_020_picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: cmd_021_picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: cmd_022_sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: cmd_023_sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: cmd_024_onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: cmd_025_onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: cmd_030_1_picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_low} {value_high} {checksum}"
  params:
    - name: target
      type: byte
      enum: ["00h=Brightness", "01h=Contrast", "02h=Color", "03h=Hue", "04h=Sharpness"]
    - name: mode
      type: byte
      enum: ["00h=absolute", "01h=relative"]
    - name: value_low
      type: byte
      description: Adjustment value (low-order 8 bits)
    - name: value_high
      type: byte
      description: Adjustment value (high-order 8 bits)
  notes: Example brightness=10: "03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

- id: cmd_030_2_volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_low} {value_high} {checksum}"
  params:
    - name: mode
      type: byte
      enum: ["00h=absolute", "01h=relative"]
    - name: value_low
      type: byte
    - name: value_high
      type: byte
  notes: Example volume=10: "03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: cmd_030_12_aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {aspect_value} 00h {checksum}"
  params:
    - name: aspect_value
      type: byte
      description: "Aspect value - full list in source Appendix 'Supplementary Information by Command'."

- id: cmd_030_15_other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {target_low} {target_high} {mode} {value_low} {value_high} {checksum}"
  params:
    - name: target_low
      type: byte
      description: "96h (with target_high FFh) = LAMP ADJUST / LIGHT ADJUST"
    - name: target_high
      type: byte
      description: "FFh for LAMP/LIGHT ADJUST"
    - name: mode
      type: byte
      enum: ["00h=absolute", "01h=relative"]
    - name: value_low
      type: byte
    - name: value_high
      type: byte

- id: cmd_037_information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: Returns projector name, lamp usage time, filter usage time.

- id: cmd_037_3_filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: Returns filter usage time (s) and filter alarm start time (s); -1 if undefined.

- id: cmd_037_4_lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {lamp} {content} {checksum}"
  params:
    - name: lamp
      type: byte
      enum: ["00h=Lamp 1", "01h=Lamp 2 (two-lamp models only)"]
    - name: content
      type: byte
      enum: ["01h=usage time (s)", "04h=remaining life (%)"]
  notes: Example lamp1 usage: "03h 96h 00h 00h 02h 00h 01h 9Ch". Negative remaining life if deadline exceeded.

- id: cmd_037_6_carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {content} {checksum}"
  params:
    - name: content
      type: byte
      enum: ["00h=Total Carbon Savings", "01h=Carbon Savings during operation"]

- id: cmd_050_remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {key_low} {key_high} {checksum}"
  params:
    - name: key_low
      type: byte
      description: "Key code (WORD). Documented values (key_low, key_high=00h): 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: key_high
      type: byte
      description: "High byte of key code (00h for all documented keys)"
  notes: Example AUTO: "02h 0Fh 00h 00h 02h 05h 00h 18h"

- id: cmd_051_shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: cmd_052_shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: cmd_053_lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {target} {drive_content} {checksum}"
  params:
    - name: target
      type: byte
      description: "Lens target (e.g. 06h=Periphery Focus); others in source Appendix."
    - name: drive_content
      type: byte
      enum: ["00h=Stop", "01h=+1s", "02h=+0.5s", "03h=+0.25s", "7Fh=drive +", "81h=drive -", "FDh=-0.25s", "FEh=-0.5s", "FFh=-1s"]
  notes: After 7Fh/81h, send 00h to stop. Continuous lens drive allowed without stop between same commands.

- id: cmd_053_1_lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {target} 00h {checksum}"
  params:
    - name: target
      type: byte
      description: Lens adjustment target

- id: cmd_053_2_lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {target} {mode} {value_low} {value_high} {checksum}"
  params:
    - name: target
      type: byte
      description: "FFh = Stop (mode/value ignored when stop)"
    - name: mode
      type: byte
      enum: ["00h=absolute", "02h=relative"]
    - name: value_low
      type: byte
    - name: value_high
      type: byte

- id: cmd_053_3_lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: byte
      enum: ["00h=MOVE", "01h=STORE", "02h=RESET"]

- id: cmd_053_4_reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: byte
      enum: ["00h=MOVE", "01h=STORE", "02h=RESET"]
  notes: Controls profile number selected by 053-10 LENS PROFILE SET.

- id: cmd_053_5_lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {option} {checksum}"
  params:
    - name: option
      type: byte
      enum: ["00h=LOAD BY SIGNAL", "01h=FORCED MUTE"]

- id: cmd_053_6_lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {option} {setting} {checksum}"
  params:
    - name: option
      type: byte
      enum: ["00h=LOAD BY SIGNAL", "01h=FORCED MUTE"]
    - name: setting
      type: byte
      enum: ["00h=OFF", "01h=ON"]

- id: cmd_053_7_lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: Returns per-target operation status bits (lens memory, zoom, focus, lens shift H/V).

- id: cmd_053_10_lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {profile} {checksum}"
  params:
    - name: profile
      type: byte
      enum: ["00h=Profile 1", "01h=Profile 2"]

- id: cmd_053_11_lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: cmd_060_1_gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {name} 00h 00h {checksum}"
  params:
    - name: name
      type: byte
      enum: ["00h=Brightness", "01h=Contrast", "02h=Color", "03h=Hue", "04h=Sharpness", "05h=Volume", "96h=Lamp/Light Adjust"]
  notes: Example brightness: "03h 05h 00h 00h 03h 00h 00h 00h 0Bh". Returns range/default/current/width values.

- id: cmd_078_1_setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: Returns base model type, sound function, profile/clock function.

- id: cmd_078_2_running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: Returns power status, cooling process, power on/off process, operation status.

- id: cmd_078_3_input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: cmd_078_4_mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: cmd_078_5_model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cmd_078_6_cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: cmd_079_freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {state} {checksum}"
  params:
    - name: state
      type: byte
      enum: ["01h=Freeze On", "02h=Freeze Off"]

- id: cmd_084_information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {info_type} 01h {checksum}"
  params:
    - name: info_type
      type: byte
      enum: ["03h=Horizontal sync frequency", "04h=Vertical sync frequency"]

- id: cmd_097_8_eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: Returns Light mode or Lamp mode depending on projector. Values in source Appendix.

- id: cmd_097_45_lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: cmd_097_155_lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: cmd_097_198_pip_picture_by_picture_request
  label: PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {item} {checksum}"
  params:
    - name: item
      type: byte
      enum: ["00h=MODE", "01h=START POSITION", "02h=SUB INPUT / SUB INPUT 1", "09h=SUB INPUT 2", "0Ah=SUB INPUT 3"]

- id: cmd_097_243_1_edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: cmd_098_8_eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {eco_value} {checksum}"
  params:
    - name: eco_value
      type: byte
      description: "Eco/Light/Lamp mode value - full list in source Appendix 'Supplementary Information by Command'."

- id: cmd_098_45_lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {name_byte_01} .. {name_byte_16} 00h {checksum}"
  params:
    - name: name
      type: string
      description: "Projector name (up to 16 bytes), NUL-terminated."

- id: cmd_098_198_pip_picture_by_picture_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {item} {setting} {checksum}"
  params:
    - name: item
      type: byte
      enum: ["00h=MODE", "01h=START POSITION", "02h=SUB INPUT / SUB INPUT 1", "09h=SUB INPUT 2", "0Ah=SUB INPUT 3"]
    - name: setting
      type: byte
      description: "MODE: 00h=PIP, 01h=PbP. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input values in source Appendix."

- id: cmd_098_243_1_edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {setting} {checksum}"
  params:
    - name: setting
      type: byte
      enum: ["00h=OFF", "01h=ON"]

- id: cmd_305_1_base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: cmd_305_2_serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: cmd_305_3_basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: Returns operation status, displayed content, signal types, mute/freeze status.

- id: cmd_319_10_audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {input_terminal} {setting} {checksum}"
  params:
    - name: input_terminal
      type: byte
      description: "Input terminal - full list in source Appendix 'Supplementary Information by Command'."
    - name: setting
      type: byte
      enum: ["00h=terminal specified in input_terminal", "01h=BNC", "02h=COMPUTER"]
```

## Feedbacks
```yaml
# Observable states documented via query responses.
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: cmd_078_2_running_status_request (DATA06) / cmd_305_3_basic_information_request (DATA01)

- id: error_status
  type: bitmask
  description: "12-byte error information bitmap (cover, fan, temperature, lamp, formatter, FPGA, mirror cover, interlock, system, etc.)"
  source: cmd_009_error_status_request

- id: picture_mute
  type: enum
  values: [off, on]
  source: cmd_078_4_mute_status_request (DATA01)

- id: sound_mute
  type: enum
  values: [off, on]
  source: cmd_078_4_mute_status_request (DATA02)

- id: onscreen_mute
  type: enum
  values: [off, on]
  source: cmd_078_4_mute_status_request (DATA03)

- id: cover_status
  type: enum
  values: [normal_opened, closed]
  source: cmd_078_6_cover_status_request

- id: freeze_status
  type: enum
  values: [off, on]
  source: cmd_305_3_basic_information_request (DATA09)

- id: lens_operation
  type: bitmask
  description: "Per-target lens operation bits (lens memory, zoom, focus, lens shift H/V)"
  source: cmd_053_7_lens_information_request

- id: lamp_remaining_life_percent
  type: number
  source: cmd_037_4_lamp_information_request_3

- id: lamp_usage_time_seconds
  type: number
  source: cmd_037_4_lamp_information_request_3 / cmd_037_information_request
```

## Variables
```yaml
# Settable parameters exposed as named gains (read via cmd_060_1, set via cmd_030_*).
- id: brightness
  type: integer
  range: null  # UNRESOLVED: absolute min/max not in refined source (returned dynamically by cmd_060_1)
- id: contrast
  type: integer
  range: null  # UNRESOLVED
- id: color
  type: integer
  range: null  # UNRESOLVED
- id: hue
  type: integer
  range: null  # UNRESOLVED
- id: sharpness
  type: integer
  range: null  # UNRESOLVED
- id: volume
  type: integer
  range: null  # UNRESOLVED
- id: lamp_light_adjust
  type: integer
  range: null  # UNRESOLVED
```

## Events
```yaml
# Source documents no unsolicited notifications; device responds only to commands.
# UNRESOLVED: no event/notification mechanism described in source.
```

## Macros
```yaml
# Source documents no explicit multi-step command sequences.
# UNRESOLVED: populate if source contains macro sequences - none found.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power On (015) blocks all other commands during power-on sequence."
  - "Power Off (016) blocks all other commands during power-off incl. cooling time."
  - "Cover error, fan error, temperature error, lamp moratorium flags reported in error status (009)."
# UNRESOLVED: no explicit safety interlock procedures or power-on sequencing requirements stated
# beyond the command-acceptance blocks above.
```

## Notes
- Binary protocol: every frame ends with an additive checksum (CKS) = low-order byte of the sum of all preceding bytes. Outbound commands set CKS; responses include CKS computed over the response bytes.
- Outbound command frames omit ID1/ID2 (set to 00h 00h); the projector echoes its control ID (ID1) and model code (ID2) in responses.
- Response leading byte: command-marker + 20h = success response (e.g. 02h→22h, 03h→23h, 00h→20h, 01h→21h); + A0h = error response (e.g. A2h, A3h, A0h, A1h). Error responses carry ERR1/ERR2 codes (see source §2.4 error code list).
- Serial cross-cable required (PC CONTROL D-SUB 9P): pin2↔TxD/RxD, pin3↔RxD/TxD, pin5=GND, pin7 RTS↔CTS, pin8 CTS↔RTS.
- Usage times returned in one-second units but updated at one-minute intervals.
- Lamp remaining life (%) is negative when replacement deadline is exceeded.

<!-- UNRESOLVED: input terminal value table, aspect value table, eco mode value table, base model type table, and sub-input value table are referenced to a source Appendix ("Supplementary Information by Command") not present in the refined source text. Firmware version compatibility not stated. Wireless LAN unit details deferred to separate operation manual. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:22:33.559Z
last_checked_at: 2026-06-17T20:01:20.474Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:01:20.474Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec commands matched verbatim against source protocol reference; transport parameters verified; full bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated; appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco mode values, base model types, sub input values) not included in the refined source — several enum ranges reference it."
- "flow control not stated in source (RTS/CTS pins wired but comm-conditions table omits flow control)"
- "absolute min/max not in refined source (returned dynamically by cmd_060_1)"
- "no event/notification mechanism described in source."
- "populate if source contains macro sequences - none found."
- "no explicit safety interlock procedures or power-on sequencing requirements stated"
- "input terminal value table, aspect value table, eco mode value table, base model type table, and sub-input value table are referenced to a source Appendix (\"Supplementary Information by Command\") not present in the refined source text. Firmware version compatibility not stated. Wireless LAN unit details deferred to separate operation manual."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
