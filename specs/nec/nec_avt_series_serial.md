---
spec_id: admin/nec-avt-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC AVT Series Control Spec"
manufacturer: NEC
model_family: "NEC AVT Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NEC AVT Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:15:12.191Z
generated_at: 2026-04-25T21:15:12.191Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:15:12.191Z
  matched_actions: 54
  action_count: 54
  confidence: high
  summary: "All 54 spec actions verified against source; every command byte sequence found literally; transport parameters (port 7142, baud rates, data format) all confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC AVT Series Control Spec

## Summary
NEC AVT Series projector controlled via RS-232C serial or wired LAN (TCP/IP). The document (BDT140013 Rev 7.1) defines a binary command protocol with 50+ commands covering power, input routing, picture/sound mute, picture/sound adjustment, lens control, ECO mode, PIP/PbP, edge blending, and comprehensive status queries. Serial supports 4800–115200 baud; LAN uses TCP port 7142.

<!-- UNRESOLVED: supported model list is not enumerated in source; only "AVT Series" referenced as product family name -->
<!-- UNRESOLVED: standby mode compatibility varies by model; specific mode requirements not enumerated -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # LAN TCP port stated in source
serial:
  baud_rate: 115200  # max; supports 115200/38400/19200/9600/4800 bps (auto-selectable)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # RTS/CTS hardware handshaking present in pinout but flow_control not explicitly characterized
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: Turns on the projector. No other command accepted while power-on sequence executes.
  command_bytes: [02h, 00h, 00h, 00h, 00h, 02h]

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Turns off the projector. No other command accepted during cooling time.
  command_bytes: [02h, 01h, 00h, 00h, 00h, 03h]

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal hex code (e.g., 06h=VIDEO, 01h=COMPUTER, A1h=HDMI). Full list in Appendix of source.
  command_bytes: [02h, 03h, 00h, 00h, 02h, 01h]

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  command_bytes: [02h, 10h, 00h, 00h, 00h, 12h]

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []
  command_bytes: [02h, 11h, 00h, 00h, 00h, 13h]

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  command_bytes: [02h, 12h, 00h, 00h, 00h, 14h]

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []
  command_bytes: [02h, 13h, 00h, 00h, 00h, 15h]

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  command_bytes: [02h, 14h, 00h, 00h, 00h, 16h]

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []
  command_bytes: [02h, 15h, 00h, 00h, 00h, 17h]

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Signed 16-bit adjustment value (low-order byte first)
  command_bytes: [03h, 10h, 00h, 00h, 05h]

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Signed 16-bit volume value (low-order byte first)
  command_bytes: [03h, 10h, 00h, 00h, 05h, 05h]

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect_mode
      type: integer
      description: "Aspect mode hex code: 00h=AUTO, 01h=WIDE ZOOM, 02h=16:9, 03h=NATIVE, 04h=4:3, 05h=15:9, 06h=16:10, 07h=LETTER BOX, 08h=ZOOM, 09h=FULL, 10h=FULL"
  command_bytes: [03h, 10h, 00h, 00h, 05h, 18h, 00h, 00h]

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Signed 16-bit adjustment value (low-order byte first)
  command_bytes: [03h, 10h, 00h, 00h, 05h, 96h, FFh]

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code (WORD type). Notable codes: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 85h=VOLUME UP, 8Ah=VOLUME DOWN, 8Eh=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO
  command_bytes: [02h, 0Fh, 00h, 00h, 02h]

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  command_bytes: [02h, 16h, 00h, 00h, 00h, 18h]

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  command_bytes: [02h, 17h, 00h, 00h, 00h, 19h]

- id: lens_control
  label: Lens Control (drive)
  kind: action
  params:
    - name: target
      type: integer
      description: "Target: 06h=Periphery Focus"
    - name: direction
      type: integer
      description: "Direction: 01h=Drive +1s, 02h=Drive +0.5s, 03h=Drive +0.25s, 7Fh=Drive continuously +, 81h=Drive continuously -, FDh=Drive -0.25s, FEh=Drive -0.5s, FFh=Drive -1s, 00h=Stop"
  command_bytes: [02h, 18h, 00h, 00h, 02h]

- id: lens_control_2
  label: Lens Control 2 (absolute/relative)
  kind: action
  params:
    - name: action
      type: integer
      description: "FFh=Stop, otherwise adjustment"
    - name: mode
      type: integer
      description: "00h=Absolute value, 02h=Relative value"
    - name: value
      type: integer
      description: Signed 16-bit position value (low-order byte first)
  command_bytes: [02h, 1Dh, 00h, 00h, 04h]

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  command_bytes: [02h, 1Eh, 00h, 00h, 01h]

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  command_bytes: [02h, 1Fh, 00h, 00h, 01h]

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"
  command_bytes: [02h, 21h, 00h, 00h, 02h]

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"
  command_bytes: [02h, 27h, 00h, 00h, 01h]

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=ON/NORMAL, 02h=ECO1, 03h=ECO2, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT. Values vary by model."
  command_bytes: [03h, B1h, 00h, 00h, 02h, 07h]

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)
  command_bytes: [03h, B1h, 00h, 00h, 12h, 2Ch]

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: parameter
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "Mode values: 00h=PIP, 01h=PICTURE BY PICTURE. Position: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input: hex code per input terminal table."
  command_bytes: [03h, B1h, 00h, 00h, 03h, C5h]

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=ON"
  command_bytes: [03h, B1h, 00h, 00h, 03h, DFh, 00h]

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=Freeze on, 02h=Freeze off"
  command_bytes: [01h, 98h, 00h, 00h, 01h]

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: "Audio input terminal hex code: 00h=HDMI1, 01h=HDMI2, 02h=DisplayPort, 03h=HDBaseT, 04h=USB-A, 05h=USB-B"
    - name: source
      type: integer
      description: "00h=Terminal in DATA01, 02h=COMPUTER, 01h=BNC"
  command_bytes: [03h, C9h, 00h, 00h, 03h, 09h]
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status Request
  type: bitfield
  description: Returns error information in DATA01-DATA12. Bit fields cover cover error, temperature error, fan error, power error, lamp errors (2 lamps), formatter error, FPGA error, mirror cover error, dust temperature error, foreign matter sensor error, interlock switch, system errors, and portrait cover status.
  command_bytes: [00h, 88h, 00h, 00h, 00h, 88h]
  response_bytes: [A0h, 88h, ...]

- id: power_state
  label: Power State
  type: enum
  values:
    - standby
    - power_on
    - cooling
    - network_standby
    - standby_error
    - standby_power_saving
  description: Reported via RUNNING STATUS REQUEST (078-2) and BASIC INFORMATION REQUEST (305-3)

- id: running_status
  label: Running Status Request
  type: object
  properties:
    - power_status
    - cooling_process
    - power_on_off_process
    - operation_status
  command_bytes: [00h, 85h, 00h, 00h, 01h, 01h, 87h]

- id: input_status
  label: Input Status Request
  type: object
  description: Returns signal switch process, signal list number, signal types (DATA03=DVI/HDMI/DisplayPort/etc.), test pattern display, content displayed.
  command_bytes: [00h, 85h, 00h, 00h, 01h, 02h, 88h]

- id: mute_status
  label: Mute Status Request
  type: object
  properties:
    picture_mute: [off, on]
    sound_mute: [off, on]
    onscreen_mute: [off, on]
    forced_onscreen_mute: [off, on]
    onscreen_display: [not_displayed, displayed]
  command_bytes: [00h, 85h, 00h, 00h, 01h, 03h, 89h]

- id: model_name_request
  label: Model Name Request
  type: string
  command_bytes: [00h, 85h, 00h, 00h, 01h, 04h, 8Ah]

- id: cover_status
  label: Cover Status Request
  type: enum
  values: [normal, cover_closed]
  command_bytes: [00h, 85h, 00h, 00h, 01h, 05h, 8Bh]

- id: information_request
  label: Information Request
  type: object
  description: Returns projector name (DATA01-49), lamp usage time in seconds (DATA83-86), filter usage time in seconds (DATA87-90)
  command_bytes: [03h, 8Ah, 00h, 00h, 00h, 8Dh]

- id: filter_usage_info
  label: Filter Usage Information Request
  type: object
  description: Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds
  command_bytes: [03h, 95h, 00h, 00h, 00h, 98h]

- id: lamp_info_request_3
  label: Lamp Information Request 3
  type: object
  description: Returns lamp usage time (seconds) or remaining life (%). Supports lamp 1 (00h) and lamp 2 (01h).
  command_bytes: [03h, 96h, 00h, 00h, 02h]

- id: carbon_savings_info
  label: Carbon Savings Information Request
  type: object
  description: Returns total or operation carbon savings in kg (max 99999kg) and mg (max 999999mg)
  command_bytes: [03h, 9Ah, 00h, 00h, 01h]

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  type: object
  description: Returns adjustment range and current value for brightness, contrast, color, hue, sharpness, volume, lamp/light adjust
  command_bytes: [03h, 05h, 00h, 00h, 03h]

- id: lens_control_request
  label: Lens Control Request
  type: object
  description: Returns upper/lower adjustment limits and current position for lens
  command_bytes: [02h, 1Ch, 00h, 00h, 02h]

- id: lens_memory_option_request
  label: Lens Memory Option Request
  type: object
  description: Returns LOAD BY SIGNAL and FORCED MUTE settings
  command_bytes: [02h, 20h, 00h, 00h, 01h]

- id: lens_info_request
  label: Lens Information Request
  type: bitfield
  description: Returns lens memory, zoom, focus, lens shift H/V operation status
  command_bytes: [02h, 22h, 00h, 00h, 01h, 00h, 25h]

- id: lens_profile_request
  label: Lens Profile Request
  type: enum
  values: [profile_1, profile_2]
  command_bytes: [02h, 28h, 00h, 00h, 00h, 2Ah]

- id: eco_mode_request
  label: Eco Mode Request
  type: integer
  description: Returns eco mode value (model-dependent; may reflect Light mode or Lamp mode)
  command_bytes: [03h, B0h, 00h, 00h, 01h, 07h, BBh]

- id: lan_projector_name_request
  label: LAN Projector Name Request
  type: string
  command_bytes: [03h, B0h, 00h, 00h, 01h, 2Ch, E0h]

- id: lan_mac_address_request
  label: LAN MAC Address Request
  type: string
  description: Returns 6-byte MAC address
  command_bytes: [03h, B0h, 00h, 00h, 02h, 9Ah, 00h, 4Fh]

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  type: object
  description: Returns PIP/PbP mode, start position, sub input settings
  command_bytes: [03h, B0h, 00h, 00h, 02h, C5h]

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  type: enum
  values: [off, on]
  command_bytes: [03h, B0h, 00h, 00h, 02h, DFh, 00h, 94h]

- id: setting_request
  label: Setting Request
  type: object
  description: Returns base model type, sound function availability, clock/sleep timer function availability
  command_bytes: [00h, 85h, 00h, 00h, 01h, 00h, 86h]

- id: information_string_request
  label: Information String Request
  type: string
  description: Returns horizontal or vertical sync frequency as NUL-terminated string
  command_bytes: [00h, D0h, 00h, 00h, 03h, 00h]

- id: base_model_type_request
  label: Base Model Type Request
  type: string
  description: Returns base model type and model name
  command_bytes: [00h, BFh, 00h, 00h, 01h, 00h, C0h]

- id: serial_number_request
  label: Serial Number Request
  type: string
  command_bytes: [00h, BFh, 00h, 00h, 02h, 01h, 06h, C8h]

- id: basic_information_request
  label: Basic Information Request
  type: object
  description: Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status
  command_bytes: [00h, BFh, 00h, 00h, 01h, 02h, C2h]
```

## Variables
```yaml
# UNRESOLVED: all settable values are modeled as Actions with params. No standalone Variables section applicable.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism described in source. Device only responds to commands.
```

## Macros
```yaml
# No multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # cooling time required; no other commands accepted during power-off sequence
interlocks:
  - name: power_on_sequence
    description: While the POWER ON command is executing, no other command can be accepted.
  - name: power_off_sequence
    description: While the POWER OFF command is executing (including cooling time), no other command can be accepted.
  - name: standby_mode_requirement
    description: Some models require specific standby modes to receive serial or LAN commands. Supported standby modes vary by model (Normal, Active, Eco, Network Standby, Sleep, HDBaseT Standby, etc.). See Appendix Section "Standby Mode settings for receiving commands."
# UNRESOLVED: voltage, current, power consumption specifications not present in source
# UNRESOLVED: fault behavior and error recovery sequences beyond error code list not detailed
# UNRESOLVED: firmware version compatibility not stated
```

## Notes
The protocol uses a binary format: `<HEADER> <CONTROL_ID> <MODEL_CODE> <LEN> <DATA...> <CKS>`. There are three response types: success without data (`22h` prefix), success with data (`23h` prefix), and error (`A0h`/`A2h`/`A3h` prefix with ERR1/ERR2 codes). Checksum (CKS) is the low-order byte of the sum of all preceding bytes. Control ID (ID1) and Model Code (ID2) are required parameters set on the projector — values not stated in source. The protocol supports full duplex serial communication.

Command timeouts and inter-command delays are not specified in the source.

Input terminal hex codes vary by model. The Appendix provides common values but notes many codes differ across models.

<!-- UNRESOLVED: ID2 (model code) values not enumerated in source -->
<!-- UNRESOLVED: exact supported models list not provided; document covers "AVT Series" as generic family -->
<!-- UNRESOLVED: standby mode compatibility matrix (which models support which standby modes for LAN vs serial) not provided -->
<!-- UNRESOLVED: command timing / inter-command delay requirements not stated -->
<!-- UNRESOLVED: HDBaseT control support implied by input code BFh but not explicitly documented as separate transport -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:15:12.191Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:15:12.191Z
matched_actions: 54
action_count: 54
confidence: high
summary: "All 54 spec actions verified against source; every command byte sequence found literally; transport parameters (port 7142, baud rates, data format) all confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
