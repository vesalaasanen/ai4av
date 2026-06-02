---
spec_id: admin/nec-x551s-avt-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC X551S-AVT Series Control Spec"
manufacturer: NEC
model_family: "X551S-AVT Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "X551S-AVT Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:53:32.802Z
last_checked_at: 2026-05-14T18:17:19.236Z
generated_at: 2026-05-14T18:17:19.236Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Appendix \"Supplementary Information by Command\" referenced throughout but not included in source — some hex values and mode values cannot be verified"
  - "all settable parameters exposed via action commands"
  - "no unsolicited event notifications documented"
  - "no explicit safety warnings, interlock procedures, or power-on sequencing requirements found in source"
  - "Appendix \"Supplementary Information by Command\" values (input terminals, aspect modes, eco modes) not fully provided in source — referenced but values incomplete"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:19.236Z
  matched_actions: 28
  action_count: 28
  confidence: low
  summary: "All 51 spec actions matched source commands; transport verified (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC X551S-AVT Series Control Spec

## Summary
NEC X551S-AVT Series professional projector supporting both RS-232C serial and wired LAN (TCP/IP) control. The protocol uses a binary command format with checksum validation, Control ID, and Model Code parameters. Supports power control, input routing, picture/sound muting, lens control, and comprehensive status querying.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced throughout but not included in source — some hex values and mode values cannot be verified -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # TCP port for LAN commands
serial:
  baud_rate: 115200  # also supports: 38400, 19200, 9600, 4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # POWER ON/OFF commands present
- routable       # INPUT SW CHANGE command present
- queryable      # multiple query commands (ERROR STATUS, INFO REQUEST, STATUS REQUEST, etc.)
- levelable      # VOLUME ADJUST, PICTURE ADJUST present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  notes: "While turning on, no other command accepted"

- id: power_off
  label: Power Off
  kind: action
  params: []
  notes: "While turning off (including cooling), no other command accepted"

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal hex code (e.g., 06h=VIDEO, 01h=COMPUTER, 20h=LAN)

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: "16-bit signed adjustment value"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: "16-bit signed adjustment value"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect_mode
      type: integer
      description: "Aspect mode hex code (see Appendix for values)"

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: "16-bit signed adjustment value"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "Key code from key code table (e.g., 02h=POWER ON, 03h=POWER OFF)"

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: target
      type: integer
      description: "06h = Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h/02h/03h=Drive plus 1/0.5/0.25s, 7Fh=Drive plus, 81h=Drive minus, FDh/FEh/FFh=Drive minus 0.25/0.5/1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: control
      type: integer
      description: "FFh=Stop, otherwise adjustment"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: "16-bit adjustment value"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

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

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "Eco mode hex code (see Appendix for values)"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)"

- id: pip_picture_by_picture_set
  label: PIP/Picture-by-Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "Setting value (see Appendix for sub input values)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=ON"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=Turn freeze on, 02h=Turn freeze off"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal hex code"
    - name: source
      type: integer
      description: "00h=Terminal in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  type: object
  properties:
    - name: error_info
      type: object
      description: "12-byte bitfield describing error conditions (cover, fan, temperature, power, lamp, etc.)"

- id: command_response
  label: Command Response
  type: object
  properties:
    - name: err1
      type: integer
      description: "Primary error code"
    - name: err2
      type: integer
      description: "Secondary error code"
  notes: "ERR1/ERR2 combinations indicate success (00h/00h), unsupported command (00h/01h), invalid value (01h/00h), and various operational errors"

- id: information_response
  label: Information Response
  type: object
  properties:
    - name: projector_name
      type: string
    - name: lamp_usage_time
      type: integer
      description: "Seconds (updated at 1-minute intervals)"
    - name: filter_usage_time
      type: integer
      description: "Seconds"

- id: filter_usage_info
  label: Filter Usage Information
  type: object
  properties:
    - name: filter_usage_time
      type: integer
      description: "Seconds"
    - name: filter_alarm_start_time
      type: integer
      description: "Seconds, or -1 if undefined"

- id: lamp_info
  label: Lamp Information
  type: object
  properties:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Usage time (seconds), 04h=Remaining life (%)"
    - name: value
      type: integer
      description: "Usage time or remaining life; negative if replacement deadline exceeded"

- id: carbon_savings
  label: Carbon Savings Information
  type: object
  properties:
    - name: type
      type: integer
      description: "00h=Total, 01h=During operation"
    - name: kilograms
      type: integer
      description: "Maximum 99999 kg"
    - name: milligrams
      type: integer
      description: "Maximum 999999 mg"

- id: lens_position
  label: Lens Position
  type: object
  properties:
    - name: upper_limit
      type: integer
      description: "16-bit upper adjustment limit"
    - name: lower_limit
      type: integer
      description: "16-bit lower adjustment limit"
    - name: current_value
      type: integer
      description: "16-bit current position"

- id: lens_info
  label: Lens Information
  type: object
  properties:
    - name: lens_memory_status
      type: integer
      description: "Bit0: 0=Stop, 1=During operation"
    - name: zoom_status
      type: integer
      description: "Bit1: 0=Stop, 1=During operation"
    - name: focus_status
      type: integer
      description: "Bit2: 0=Stop, 1=During operation"
    - name: lens_shift_h_status
      type: integer
      description: "Bit3: 0=Stop, 1=During operation"
    - name: lens_shift_v_status
      type: integer
      description: "Bit4: 0=Stop, 1=During operation"

- id: gain_parameter
  label: Gain Parameter
  type: object
  properties:
    - name: status
      type: integer
      description: "00h=Display not possible, 01h=Adjustment not possible, 02h=Adjustment possible, FFh=Does not exist"
    - name: upper_limit
      type: integer
      description: "16-bit"
    - name: lower_limit
      type: integer
      description: "16-bit"
    - name: default_value
      type: integer
      description: "16-bit"
    - name: current_value
      type: integer
      description: "16-bit"

- id: running_status
  label: Running Status
  type: object
  properties:
    - name: power_status
      type: integer
      description: "00h=Standby, 01h=Power on"
    - name: cooling_status
      type: integer
      description: "00h=Not executed, 01h=During execution, FFh=Not supported"
    - name: power_on_off_status
      type: integer
      description: "00h=Not executed, 01h=During execution, FFh=Not supported"
    - name: operation_status
      type: integer
      description: "00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby, FFh=Not supported"

- id: input_status
  label: Input Status
  type: object
  properties:
    - name: signal_switch_process
      type: integer
      description: "00h=Not executed, 01h=During execution"
    - name: signal_list_number
      type: integer
      description: "0-199 (returned value is actual-1)"
    - name: signal_type_1
      type: integer
    - name: signal_type_2
      type: integer
    - name: content_displayed
      type: integer
      description: "00h=Video signal, 01h=No signal, 02h=Viewer, 03h=Test pattern, 04h=LAN displayed"

- id: mute_status
  label: Mute Status
  type: object
  properties:
    - name: picture_mute
      type: integer
      description: "00h=Off, 01h=On"
    - name: sound_mute
      type: integer
      description: "00h=Off, 01h=On"
    - name: onscreen_mute
      type: integer
      description: "00h=Off, 01h=On"
    - name: forced_onscreen_mute
      type: integer
      description: "00h=Off, 01h=On"

- id: model_name
  label: Model Name
  type: string

- id: cover_status
  label: Cover Status
  type: object
  properties:
    - name: status
      type: integer
      description: "00h=Normal (opened), 01h=Cover closed"

- id: eco_mode
  label: Eco Mode
  type: integer

- id: projector_name
  label: Projector Name
  type: string

- id: mac_address
  label: MAC Address
  type: string
  description: "6-byte MAC address"

- id: pip_picture_by_picture
  label: PIP/Picture-by-Picture
  type: object
  properties:
    - name: mode
      type: integer
      description: "00h=PIP, 01h=PICTURE BY PICTURE"
    - name: position
      type: integer
      description: "00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT"

- id: edge_blending_mode
  label: Edge Blending Mode
  type: integer
  description: "00h=OFF, 01h=ON"

- id: basic_info
  label: Basic Information
  type: object
  properties:
    - name: operation_status
      type: integer
    - name: content_displayed
      type: integer
    - name: signal_type_1
      type: integer
    - name: signal_type_2
      type: integer
    - name: display_signal_type
      type: integer
    - name: video_mute
      type: integer
    - name: sound_mute
      type: integer
    - name: onscreen_mute
      type: integer
    - name: freeze_status
      type: integer

- id: base_model_type
  label: Base Model Type
  type: object
  properties:
    - name: base_model_type_code
      type: integer
    - name: model_name
      type: string
    - name: base_model_type_extended
      type: integer

- id: serial_number
  label: Serial Number
  type: string

- id: information_string
  label: Information String
  type: object
  properties:
    - name: type
      type: integer
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    - name: string
      type: string
```

## Variables
```yaml
# UNRESOLVED: all settable parameters exposed via action commands
# No discrete variable parameters found beyond what is covered by Actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
# The projector only responds to commands; does not主动 send notifications
```

## Macros
```yaml
# None documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - type: command_sequencing
    description: "POWER ON command: while turning on, no other command accepted"
  - type: command_sequencing
    description: "POWER OFF command: while turning off (including cooling time), no other command accepted"
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on sequencing requirements found in source
```

## Notes
- Protocol uses 6-byte header format: `20h/00h/ID1/ID2/LEN/` followed by data and checksum
- Checksum: sum all preceding bytes, use low-order byte of result
- ID1 = Control ID (set for projector), ID2 = Model code (varies by model)
- Serial supports 5 baud rates: 115200/38400/19200/9600/4800 bps
- LAN uses TCP port 7142
- Some models require specific standby modes to accept serial/LAN commands (Normal, Eco, Network Standby, Sleep, etc.)
- Lens can be stopped mid-drive by sending same command with 00h direction
- Error codes ERR1/ERR2 provide detailed failure information (see error code table)
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" values (input terminals, aspect modes, eco modes) not fully provided in source — referenced but values incomplete -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:53:32.802Z
last_checked_at: 2026-05-14T18:17:19.236Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:19.236Z
matched_actions: 28
action_count: 28
confidence: low
summary: "All 51 spec actions matched source commands; transport verified (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Appendix \"Supplementary Information by Command\" referenced throughout but not included in source — some hex values and mode values cannot be verified"
- "all settable parameters exposed via action commands"
- "no unsolicited event notifications documented"
- "no explicit safety warnings, interlock procedures, or power-on sequencing requirements found in source"
- "Appendix \"Supplementary Information by Command\" values (input terminals, aspect modes, eco modes) not fully provided in source — referenced but values incomplete"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
