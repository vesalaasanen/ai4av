---
spec_id: admin/nec-p484-avt2-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC P484-AVT2 Series Control Spec"
manufacturer: NEC
model_family: "P484-AVT2 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "P484-AVT2 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:29:50.963Z
generated_at: 2026-04-25T21:29:50.963Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:29:50.963Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions have literal matches in the source command reference; transport parameters verified; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC P484-AVT2 Series Control Spec

## Summary
NEC P484-AVT2 Series professional projector supporting both RS-232C serial and wired LAN (TCP/IP) control. The projector accepts hexadecimal command packets with checksum validation and returns acknowledgements with error codes. Supports power control, input routing, picture/sound adjustment, lens control, and extensive query commands for status monitoring.

<!-- UNRESOLVED: specific input terminal hex values vary by model - Appendix references model-specific supplements -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # LAN TCP port for sending and receiving commands
serial:
  baud_rate: null  # UNRESOLVED: multiple rates supported (115200/38400/19200/9600/4800 bps); no default stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not documented
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- queryable
- levelable
- routable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal hex code (e.g. 06h for VIDEO, A1h for HDMI)

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
      description: "Mode: 00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "Mode: 00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect mode hex code

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: target
      type: integer
      description: "Target: 96h FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "Mode: 00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "Key code (WORD type). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU"

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
      description: "Target: 06h=Periphery Focus"
    - name: direction
      type: integer
      description: "Direction: 00h=Stop, 01h/02h/03h=Drive plus 1s/0.5s/0.25s, 7Fh=Drive plus, 81h=Drive minus, FDh/FEh/FFh=Drive minus 0.25s/0.5s/1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: "Command: FFh=Stop"
    - name: mode
      type: integer
      description: "Mode: 00h=absolute value, 02h=relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: option
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "Value: 00h=OFF, 01h=ON"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "Eco mode hex code"

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
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "Mode: 00h=OFF, 01h=ON"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "State: 01h=Freeze on, 02h=Freeze off"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal hex code
    - name: value
      type: integer
      description: "Setting: 00h=specified terminal, 02h=COMPUTER"

- id: error_status_request
  label: Error Status Request
  kind: query
  params: []

- id: information_request
  label: Information Request
  kind: query
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  params:
    - name: lamp
      type: integer
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "Content: 01h=usage time, 04h=remaining life"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  params:
    - name: type
      type: integer
      description: "Type: 00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: target
      type: integer
      description: "Target: 06h=Periphery Focus"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: option
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  params: []

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  params:
    - name: target
      type: integer
      description: "Target: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST"

- id: setting_request
  label: Setting Request
  kind: query
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  params: []

- id: model_name_request
  label: Model Name Request
  kind: query
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: query
  params: []

- id: information_string_request
  label: Information String Request
  kind: query
  params:
    - name: type
      type: integer
      description: "Type: 03h=Horizontal sync freq, 04h=Vertical sync freq"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  params:
    - name: target
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  params: []

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: query
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: command_response
  type: object
  description: Standard command response format
  properties:
    - name: result_code
      type: hex
      description: "A0h/A1h/A2h/A3h = response type indicator"
    - name: id1
      type: hex
      description: Control ID
    - name: id2
      type: hex
      description: Model code
    - name: err1
      type: hex
      description: Error code high byte
    - name: err2
      type: hex
      description: Error code low byte
    - name: cks
      type: hex
      description: Checksum

- id: error_codes
  type: table
  description: ERR1/ERR2 error code combinations
  values: []
  # UNRESOLVED: full table too large; major codes:
  # 00h/00h=unrecognized, 00h/01h=unsupported, 01h/00h=invalid value
  # 02h/00h=memory alloc error, 02h/0Dh=power off, 02h/0Fh=no authority
  # 03h/00h=incorrect gain number, 03h/01h=invalid gain
```

## Variables
```yaml
# UNRESOLVED: no discrete variables separate from query responses documented
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented; device only responds to commands
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power on command (015) blocks all other commands until power-on completes"
  - "Power off command (016) blocks all other commands during cooling period"
  - "Some models require specific standby modes to receive commands via serial or LAN"
  - "Supported standby modes vary by model: Normal, Active, Eco, NORMAL, NETWORK STANDBY, SLEEP, OFF, ON, STANDBY POWER ON"
```

## Notes

**Command packet format:** All commands are hexadecimal byte sequences. Standard format:
`[PREFIX] [CMD] [ID1] [ID2] [LEN] [DATA...] [CKS]`

**Checksum calculation:** Add all bytes preceding checksum, take low-order byte of sum.

**Input terminal hex codes (common):** COMPUTER=01h, COMPUTER2=02h, VIDEO=06h, HDMI=A1h or 1Ah, HDMI2=A2h or 1Bh, DisplayPort=A6h, LAN/NETWORK=20h, HDBaseT=BFh

**Aspect mode hex codes:** AUTO=00h, WIDE ZOOM=01h, 16:9=02h, NATIVE=03h, 4:3=04h, 15:9=05h, 16:10=06h, LETTER BOX=07h

**Eco mode hex codes:** OFF=00h, Normal=00h/01h, ECO=02h/03h, AUTO ECO=01h, LONG LIFE=04h, BOOST=05h, SILENT=06h

**Standby mode requirement:** Some models require specific standby modes (Normal, Active, Eco, NETWORK STANDBY, SLEEP, etc.) to receive serial or LAN commands. Some models support HDBaseT standby mode.

<!-- UNRESOLVED: full input terminal code table varies by model - Appendix references model-specific supplements -->
<!-- UNRESOLVED: aspect and eco mode hex codes vary by model - Appendix references model-specific supplements -->
<!-- UNRESOLVED: audio select values vary by model - Appendix references model-specific supplements -->
<!-- UNRESOLVED: selection signal type values vary by model - Appendix references model-specific supplements -->
<!-- UNRESOLVED: base model type values not enumerated - Appendix references model-specific supplements -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:29:50.963Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:29:50.963Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions have literal matches in the source command reference; transport parameters verified; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
