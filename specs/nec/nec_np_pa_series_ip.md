---
spec_id: admin/nec-np-pa-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP-PA Series Control Spec"
manufacturer: NEC
model_family: NP-PA1705UL
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - NP-PA1705UL
    - NP-PA1505UL
    - NP-PA1004UL
    - NP-PA804UL
    - NP-PA803UL
    - NP-PA703UL
    - NP-PA653UL
    - NP-PA803U
    - NP-PA723U
    - NP-PA653U
    - NP-PA853W
    - NP-PA703W
    - NP-PA903X
    - NP-PA622U
    - NP-PA522U
    - NP-PA672W
    - NP-PA572W
    - NP-PA722X
    - NP-PA622X
    - NP-PA621U
    - NP-PA521U
    - NP-PA671W
    - NP-PA571W
    - NP-PA721X
    - NP-PA621X
    - NP-PA600X
    - NP-PA500X
    - NP-PA550W
    - NP-PA500U
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:52:22.476Z
last_checked_at: 2026-06-02T22:10:55.029Z
generated_at: 2026-06-02T22:10:55.029Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "authentication/login procedure not described in source"
  - "command timing constraints beyond stated power-on/off lockout not documented"
  - "Variables section not applicable - all settable parameters are discrete actions"
  - "No unsolicited event notifications described in source - device only responds to commands"
  - "No explicit multi-step macro sequences documented in source"
  - "Safety warnings and interlock procedures not explicitly stated in source."
  - "Input terminal values vary by model — see appendix for exact mappings"
  - "Aspect ratio values, eco mode values, and sub input values vary by model — see appendix"
  - "Serial baud rate must be configured on the projector; multiple rates supported (4800-115200 bps)"
  - "Some models support wireless LAN control (NP-PA621U through NP-PA500U) but details not in this doc"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:10:55.029Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC NP-PA Series Control Spec

## Summary
NEC NP-PA Series professional projectors support both serial (RS-232C) and wired TCP/IP control. TCP port 7142 is used for command communication. The protocol uses binary command packets with checksum validation and requires a Control ID and Model Code for targeting specific projectors.

<!-- UNRESOLVED: authentication/login procedure not described in source -->
<!-- UNRESOLVED: command timing constraints beyond stated power-on/off lockout not documented -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands"
serial:
  baud_rate: 115200  # stated: supports 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # stated: full duplex communication
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: POWER ON (015) and POWER OFF (016) commands present
- routable        # inferred: INPUT SW CHANGE (018) command present
- queryable       # inferred: multiple information request commands present (037, 078-series, 305-series)
- levelable       # inferred: VOLUME ADJUST (030-2), PICTURE ADJUST (030-1), GAIN PARAMETER REQUEST (060-1)
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  notes: No other command accepted while power is turning on.

- id: power_off
  label: Power Off
  kind: action
  params: []
  notes: No other command accepted while power is turning off (including cooling time).

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value (see appendix for model-specific mappings, e.g. 01h=COMPUTER, 06h=VIDEO, 0Bh=S-VIDEO, A1h=HDMI)

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  notes: Cleared by input terminal switch or video signal switch.

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  notes: Cleared by input terminal switch, video signal switch, or volume adjustment.

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  notes: Cleared by input terminal switch or video signal switch.

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
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect ratio value (model-dependent; see appendix)

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: target
      type: integer
      description: "96hFFh=Lamp Adjust/Light Adjust"
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code (see key code table for values, e.g. 02h=POWER ON, 03h=POWER OFF, 0Dh=HELP)

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
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift(H), 03h=Lens Shift(V), 06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=continuous+, 81h=continuous-, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift(H), 03h=Lens Shift(V), FFh=Stop"
    - name: mode
      type: integer
      description: "00h=Absolute value, 02h=Relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

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
    - name: target
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile_number
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "01h=ON, 02h=OFF"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: Eco mode value (model-dependent; see appendix)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value (model-dependent)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal for audio selection
    - name: value
      type: integer
      description: "00h=Terminal in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status Request
  type: bitfield
  values: # See DATA01-DATA09 bit definitions in command 009

- id: command_response
  label: Command Response (Generic)
  type: object
  fields:
    - name: execution_result
      type: enum
      values:
        - 00h: Success (no data)
        - 00h-01h: Success/error code in data response
        - FFh: Error (for some commands)

- id: information_request
  label: Information Request
  type: object
  fields:
    - name: projector_name
      type: string
    - name: lamp_usage_time
      type: integer
      description: Seconds (updated at 1-minute intervals)
    - name: filter_usage_time
      type: integer
      description: Seconds (updated at 1-minute intervals)

- id: filter_usage_info
  label: Filter Usage Information Request
  type: object
  fields:
    - name: filter_usage_time
      type: integer
      description: Seconds
    - name: filter_alarm_start_time
      type: integer
      description: Seconds, or -1 if not defined

- id: lamp_info_3
  label: Lamp Information Request 3
  type: object
  fields:
    - name: target
      type: enum
      values: ["00h=Lamp 1", "01h=Lamp 2"]
    - name: content
      type: enum
      values: ["01h=Lamp usage time (seconds)", "04h=Lamp remaining life (%)"]
    - name: value
      type: integer

- id: carbon_savings_info
  label: Carbon Savings Information Request
  type: object
  fields:
    - name: target
      type: enum
      values: ["00h=Total Carbon Savings", "01h=Carbon Savings during operation"]
    - name: kilograms
      type: integer
      description: Maximum 99999 kg
    - name: milligrams
      type: integer
      description: Maximum 999999 mg

- id: lens_control_request
  label: Lens Control Request
  type: object
  fields:
    - name: target
      type: enum
      values: ["00h=Zoom", "01h=Focus", "02h=Lens Shift(H)", "03h=Lens Shift(V)"]
    - name: upper_limit
      type: integer
    - name: lower_limit
      type: integer
    - name: current_value
      type: integer

- id: lens_memory_option_request
  label: Lens Memory Option Request
  type: object
  fields:
    - name: target
      type: enum
      values: ["00h=LOAD BY SIGNAL", "01h=FORCED MUTE"]
    - name: value
      type: enum
      values: ["00h=OFF", "01h=ON"]

- id: lens_profile_request
  label: Lens Profile Request
  type: enum
  values: ["00h=Profile 1", "01h=Profile 2"]

- id: lens_info
  label: Lens Information Request
  type: bitfield
  values: # Lens operation status bits

- id: gain_parameter_3
  label: Gain Parameter Request 3
  type: object
  fields:
    - name: status
      type: enum
      values: ["00h=Display not possible", "01h=Adjustment not possible", "02h=Adjustment possible", "FFh=Does not exist"]
    - name: upper_limit
      type: integer
    - name: lower_limit
      type: integer
    - name: default_value
      type: integer
    - name: current_value
      type: integer
    - name: wide_adjustment_width
      type: integer
    - name: narrow_adjustment_width
      type: integer

- id: setting_request
  label: Setting Request
  type: object
  fields:
    - name: base_model_type
      type: integer
    - name: sound_function
      type: enum
      values: ["00h=Not available", "01h=Available"]
    - name: profile_number
      type: enum
      values: ["00h=Not available", "01h=Clock function", "02h=Sleep timer function", "03h=Both"]

- id: running_status
  label: Running Status Request
  type: object
  fields:
    - name: power_status
      type: enum
      values: ["00h=Standby", "01h=Power on"]
    - name: cooling_process
      type: enum
      values: ["00h=Not executed", "01h=During execution"]
    - name: power_on_off_process
      type: enum
      values: ["00h=Not executed", "01h=During execution"]
    - name: operation_status
      type: enum
      values: ["00h=Standby(Sleep)", "04h=Power on", "05h=Cooling", "06h=Standby(error)", "0Fh=Standby(Power saving)", "10h=Network standby"]

- id: input_status
  label: Input Status Request
  type: object
  fields:
    - name: signal_switch_process
      type: enum
      values: ["00h=Not executed", "01h=During execution"]
    - name: signal_list_number
      type: integer
    - name: signal_type_1
      type: enum
      values: ["01h-05h"]
    - name: signal_type_2
      type: enum
      values: ["01h=COMPUTER", "02h=VIDEO", "03h=S-VIDEO", "04h=COMPONENT", "05h=Reserved", "07h=VIEWER(1-5)", "20h=DVI-D", "21h=HDMI", "22h=DisplayPort", "23h=VIEWER(6-10)", "FFh=Not Source Input"]
    - name: content_displayed
      type: enum
      values: ["00h=Video signal displayed", "01h=No signal", "02h=Viewer displayed", "03h=Test pattern displayed", "04h=LAN displayed"]

- id: mute_status
  label: Mute Status Request
  type: object
  fields:
    - name: picture_mute
      type: enum
      values: ["00h=Off", "01h=On", "FFh=Not supported"]
    - name: sound_mute
      type: enum
      values: ["00h=Off", "01h=On", "FFh=Not supported"]
    - name: onscreen_mute
      type: enum
      values: ["00h=Off", "01h=On", "FFh=Not supported"]
    - name: forced_onscreen_mute
      type: enum
      values: ["00h=Off", "01h=On", "FFh=Not supported"]

- id: model_name_request
  label: Model Name Request
  type: string

- id: cover_status
  label: Cover Status Request
  type: enum
  values: ["00h=Normal (cover opened)", "01h=Cover closed"]

- id: information_string_request
  label: Information String Request
  type: object
  fields:
    - name: type
      type: enum
      values: ["03h=Horizontal sync frequency", "04h=Vertical sync frequency"]
    - name: string
      type: string

- id: eco_mode_request
  label: Eco Mode Request
  type: integer

- id: lan_projector_name_request
  label: LAN Projector Name Request
  type: string

- id: lan_mac_address_status_2
  label: LAN MAC Address Status Request 2
  type: string
  format: MAC address (hex)

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  type: object
  fields:
    - name: target
      type: enum
      values: ["00h=MODE", "01h=START POSITION", "02h=SUB INPUT", "09h=SUB INPUT 2", "0Ah=SUB INPUT 3"]
    - name: value
      type: integer

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  type: enum
  values: ["00h=OFF", "01h=ON"]

- id: base_model_type_request
  label: Base Model Type Request
  type: object
  fields:
    - name: base_model_type
      type: integer
    - name: model_name
      type: string

- id: serial_number_request
  label: Serial Number Request
  type: string

- id: basic_information_request
  label: Basic Information Request
  type: object
  fields:
    - name: operation_status
      type: enum
      values: ["00h=Standby(Sleep)", "04h=Power on", "05h=Cooling", "06h=Standby(error)", "0Fh=Standby(Power saving)", "10h=Network standby"]
    - name: content_displayed
      type: enum
      values: ["00h=Video signal displayed", "01h=No signal", "02h=Viewer displayed", "03h=Test pattern displayed", "04h=LAN displayed", "05h=Test pattern(user)", "10h=Signal being switched"]
    - name: signal_type_1
      type: integer
    - name: signal_type_2
      type: enum
      values: ["01h=COMPUTER", "02h=VIDEO", "03h=S-VIDEO", "04h=COMPONENT", "05h=Reserved", "07h=VIEWER(1-5)", "20h=DVI-D", "21h=HDMI", "22h=DisplayPort", "23h=VIEWER(6-10)", "FFh=Not Source Input"]
    - name: video_mute
      type: enum
      values: ["00h=Off", "01h=On"]
    - name: sound_mute
      type: enum
      values: ["00h=Off", "01h=On"]
    - name: onscreen_mute
      type: enum
      values: ["00h=Off", "01h=On"]
    - name: freeze_status
      type: enum
      values: ["00h=Off", "01h=On"]
```

## Variables
```yaml
# UNRESOLVED: Variables section not applicable - all settable parameters are discrete actions
```

## Events
```yaml
# UNRESOLVED: No unsolicited event notifications described in source - device only responds to commands
```

## Macros
```yaml
# UNRESOLVED: No explicit multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: Safety warnings and interlock procedures not explicitly stated in source.
# Note: Some models cannot receive commands in standby mode (see appendix "Standby Mode setting for receiving commands").
```

## Notes
- Command format: `20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>` for queries; responses follow similar pattern with success (20h/22h/23h prefix) or error (A0h/A2h/A3h prefix).
- Checksum (CKS): Low-order byte of sum of all preceding bytes.
- Control ID (ID1) and Model Code (ID2) must match the target projector.
- Error codes: ERR1/ERR2 combinations indicate specific failure reasons (see error code table).
- Some commands (POWER ON/OFF) block other commands during execution.
- <!-- UNRESOLVED: Input terminal values vary by model — see appendix for exact mappings -->
- <!-- UNRESOLVED: Aspect ratio values, eco mode values, and sub input values vary by model — see appendix -->
- <!-- UNRESOLVED: Serial baud rate must be configured on the projector; multiple rates supported (4800-115200 bps) -->
- <!-- UNRESOLVED: Some models support wireless LAN control (NP-PA621U through NP-PA500U) but details not in this doc -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:52:22.476Z
last_checked_at: 2026-06-02T22:10:55.029Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:10:55.029Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "authentication/login procedure not described in source"
- "command timing constraints beyond stated power-on/off lockout not documented"
- "Variables section not applicable - all settable parameters are discrete actions"
- "No unsolicited event notifications described in source - device only responds to commands"
- "No explicit multi-step macro sequences documented in source"
- "Safety warnings and interlock procedures not explicitly stated in source."
- "Input terminal values vary by model — see appendix for exact mappings"
- "Aspect ratio values, eco mode values, and sub input values vary by model — see appendix"
- "Serial baud rate must be configured on the projector; multiple rates supported (4800-115200 bps)"
- "Some models support wireless LAN control (NP-PA621U through NP-PA500U) but details not in this doc"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
