---
spec_id: admin/nec-x461s-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC X461S Series Control Spec"
manufacturer: NEC
model_family: X461S
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - X461S
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:53:21.461Z
last_checked_at: 2026-04-26T21:32:02.053Z
generated_at: 2026-04-26T21:32:02.053Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exhaustively documenting all parameters and data field values since the source references an appendix for many hex code tables"
  - "commands 053-3 through 053-11 documented but lens memory control commands are fully described above"
  - "commands 319-10 AUDIO SELECT SET partially documented above"
  - "exhaustively documenting all data field values from INFORMATION REQUEST and other multi-byte response fields"
  - "many settable parameters exist via adjustment commands but discrete Variables section not applicable - parameters are passed via action params"
  - "no unsolicited event notifications described in source; device only responds to commands"
  - "no multi-step macro sequences described explicitly in source"
  - "standby mode requirements vary by model — some models require specific standby modes to receive commands via serial or LAN. See Appendix section \"Standby Mode settings for receiving commands\" for supported modes per connection type."
verification:
  verdict: verified
  checked_at: 2026-04-26T21:32:02.053Z
  matched_actions: 47
  action_count: 47
  confidence: medium
  summary: "All 47 spec actions matched source; transport verified (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC X461S Series Control Spec

## Summary
The NEC X461S is a professional data projector supporting both RS-232C serial and wired LAN (TCP/IP) control. The serial interface operates at configurable baud rates up to 115200 bps with 8-N-1 framing. The LAN interface uses TCP port 7142. Commands use a hex-encoded binary protocol with a checksum.

<!-- UNRESOLVED: exhaustively documenting all parameters and data field values since the source references an appendix for many hex code tables -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # also supports 38400/19200/9600/4800; highest listed value used
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 7142  # stated for LAN TCP control
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- queryable
- routable
- levelable
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
    - name: input
      type: integer
      description: Input terminal hex code (e.g. 01h=COMPUTER, 06h=VIDEO, A1h=HDMI)

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
      description: Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect mode hex code

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: Adjustment target (96h/FFh=LAMP ADJUST)
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code (e.g. 02h=POWER ON, 03h=POWER OFF, 0Ah=LEFT, 0Bh=RIGHT)

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
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h/02h/03h=Drive plus 1s/0.5s/0.25s, 7Fh=Drive plus, 81h=Drive minus, FDh/FEh/FFh=Drive minus 0.25s/0.5s/1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: action
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: 16-bit position value

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: action
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: action
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

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=On, 02h=Off"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Eco mode hex code (00h=OFF, 01h-03h=ECO variants, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture By Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value (varies by target)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code
    - name: value
      type: integer
      description: Audio source (00h=terminal specified, 01h=BNC, 02h=COMPUTER)

# UNRESOLVED: commands 053-3 through 053-11 documented but lens memory control commands are fully described above
# UNRESOLVED: commands 319-10 AUDIO SELECT SET partially documented above
- id: error_status_request
  label: Error Status Request
  kind: query
  params: []
- id: information_request_cmd
  label: Information Request
  kind: query
  params: []
- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  params: []
- id: lamp_information_request
  label: Lamp Information Request
  kind: query
  params: []
- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  params: []
- id: lens_control_request
  label: Lens Control Status Request
  kind: query
  params: []
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params: []
- id: lens_information_request
  label: Lens Information Request
  kind: query
  params: []
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params: []
- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []
- id: gain_parameter_request
  label: Gain Parameter Request
  kind: query
  params: []
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
  params: []
- id: eco_mode_request
  label: Eco Mode Status Request
  kind: query
  params: []
- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: error_status
  type: bitfield
  description: Error information with bit fields for cover error, fan error, temperature error, power error, lamp status, and extended status

- id: power_state
  type: enum
  values: [standby, power_on, cooling]
  description: From RUNNING STATUS REQUEST

- id: input_status
  type: object
  description: From INPUT STATUS REQUEST - signal switch process, signal list number, signal type, mute status

- id: mute_status
  type: object
  description: Picture, sound, onscreen, and forced onscreen mute states

- id: model_name
  type: string
  description: From MODEL NAME REQUEST (up to 32 bytes NUL-terminated)

- id: cover_status
  type: enum
  values: [normal, closed]

- id: information_request
  type: object
  description: Projector name, lamp usage time (seconds), filter usage time (seconds)

- id: filter_usage_info
  type: object
  description: Filter usage time and alarm start time in seconds

- id: lamp_info
  type: object
  description: Lamp usage time (seconds) or remaining life (%) for lamp 1 or 2

- id: carbon_savings_info
  type: object
  description: Total or operation carbon savings in kg and mg

- id: lens_position
  type: object
  description: Upper/lower adjustment limits and current lens position values

- id: lens_info
  type: bitfield
  description: Lens memory, zoom, focus, lens shift H/V operation status

- id: eco_mode
  type: integer
  description: Eco mode value from request

- id: projector_name
  type: string
  description: LAN projector name (up to 17 bytes NUL-terminated)

- id: mac_address
  type: string
  description: MAC address as hex bytes

- id: pip_picture_by_picture
  type: object
  description: PIP/PBP mode, position, sub input settings

- id: edge_blending_mode
  type: enum
  values: [off, on]

- id: running_status
  type: object
  description: Power status, cooling process, operation status

- id: basic_info
  type: object
  description: Operation status, content displayed, signal type, video/sound/onscreen mute, freeze status

- id: gain_parameter
  type: object
  description: Adjustment range, default value, current value for picture/volume parameters

- id: information_string
  type: string
  description: Horizontal/vertical sync frequency strings

- id: serial_number
  type: string
  description: Serial number (up to 16 bytes NUL-terminated)

- id: base_model_type
  type: object
  description: Base model type and model name

# UNRESOLVED: exhaustively documenting all data field values from INFORMATION REQUEST and other multi-byte response fields
```

## Variables
```yaml
# UNRESOLVED: many settable parameters exist via adjustment commands but discrete Variables section not applicable - parameters are passed via action params
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source; device only responds to commands
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described explicitly in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "POWER ON: While the power is turning on, no other command can be accepted."
  - description: "POWER OFF: While the power is turning off (including cooling time), no other command can be accepted."
```
<!-- UNRESOLVED: standby mode requirements vary by model — some models require specific standby modes to receive commands via serial or LAN. See Appendix section "Standby Mode settings for receiving commands" for supported modes per connection type. -->

## Notes
The protocol uses a binary hex-encoded command structure: `20h <88h> <ID1> <ID2> 0Ch <DATA...> <CKS>`. Responses follow similar format with prefix `A0h`/`A2h`/`A3h` for success or `A0h`/`A2h`/`A3h` with `<ERR1> <ERR2>` for errors. All multi-byte values are little-endian. Checksum (CKS) is the low-order byte of the sum of all preceding bytes.

Input terminal hex codes, aspect values, eco mode values, and signal type values include model-dependent variants — the appendix lists common and alternate codes.

Standby mode must be appropriately configured for the model to receive serial or LAN commands. Some models only support certain standby modes per connection type.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:53:21.461Z
last_checked_at: 2026-04-26T21:32:02.053Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T21:32:02.053Z
matched_actions: 47
action_count: 47
confidence: medium
summary: "All 47 spec actions matched source; transport verified (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exhaustively documenting all parameters and data field values since the source references an appendix for many hex code tables"
- "commands 053-3 through 053-11 documented but lens memory control commands are fully described above"
- "commands 319-10 AUDIO SELECT SET partially documented above"
- "exhaustively documenting all data field values from INFORMATION REQUEST and other multi-byte response fields"
- "many settable parameters exist via adjustment commands but discrete Variables section not applicable - parameters are passed via action params"
- "no unsolicited event notifications described in source; device only responds to commands"
- "no multi-step macro sequences described explicitly in source"
- "standby mode requirements vary by model — some models require specific standby modes to receive commands via serial or LAN. See Appendix section \"Standby Mode settings for receiving commands\" for supported modes per connection type."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
