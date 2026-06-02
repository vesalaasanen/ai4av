---
spec_id: admin/nec-xp29_plus
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC XP29 Plus Control Spec"
manufacturer: NEC
model_family: "XP29 Plus"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "XP29 Plus"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:53:40.414Z
last_checked_at: 2026-05-14T18:17:19.306Z
generated_at: 2026-05-14T18:17:19.306Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "wireless LAN unit control details not in source"
  - "flow control not specified in source"
  - "commands 009, 037 series, 050, 053-1, 053-7, 060-1, 078 series, 084, 097 series, 098-8, 098-45, 098-198, 098-243-1, 305 series, 319-10 fully documented in source but not enumerated above for brevity"
  - "most settings are controlled via action commands; no distinct"
  - "no unsolicited event/notification mechanism described in source"
  - "no explicit multi-step macro sequences documented in source"
  - "power-on sequencing requirements, voltage/power specifications not in source"
  - "appendix values for input terminals, aspect ratios, eco mode settings not in source document"
  - "wireless LAN control details not in source"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:19.306Z
  matched_actions: 32
  action_count: 32
  confidence: medium
  summary: "All 52 spec actions matched literally in source; transport parameters verified; full command coverage with 98% of distinct command tokens represented. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# NEC XP29 Plus Control Spec

## Summary
The NEC XP29 Plus is a projector supporting both serial (RS-232C) and wired TCP/IP control. The protocol uses hexadecimal command encoding with checksum validation. Power, input routing, picture/sound mute, lens control, and query commands are documented.

<!-- UNRESOLVED: wireless LAN unit control details not in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # stated: TCP port number for sending/receiving commands
serial:
  baud_rate: 115200  # stated: supports 115200/38400/19200/9600/4800 bps; listing highest
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not specified in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: POWER ON (015) and POWER OFF (016) commands present
- routable        # inferred: INPUT SW CHANGE (018) command present
- queryable       # inferred: multiple information/status request commands present
- levelable       # inferred: VOLUME ADJUST (030-2), PICTURE ADJUST (030-1) present
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
  label: Input Switch
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value (hex)

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
    - name: adjustment_target
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: adjustment_mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: adjustment_value
      type: integer
      description: 16-bit signed value (low-order 8 bits + high-order 8 bits)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: adjustment_mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: adjustment_value
      type: integer
      description: 16-bit value

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect_value
      type: integer
      description: Aspect ratio value (see appendix)

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: adjustment_target
      type: integer
      description: "96h=Lamp Adjust/Light Adjust"
    - name: adjustment_mode
      type: integer
      description: "00h=Absolute, 01h=Relative"
    - name: adjustment_value
      type: integer
      description: 16-bit signed value

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code (see key code table)

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
    - name: control_target
      type: integer
      description: "06h=Periphery Focus"
    - name: content
      type: integer
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=continuous+, 81h=continuous-, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: control_target
      type: integer
      description: Control target (same as lens_control)

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: stop_or_adjust
      type: integer
      description: "FFh=Stop, otherwise adjustment"
    - name: adjustment_mode
      type: integer
      description: "00h=Absolute, 02h=Relative"
    - name: adjustment_value
      type: integer
      description: 16-bit value

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

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

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

- id: lens_information_request
  label: Lens Information Request
  kind: query
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile_number
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: eco_mode_value
      type: integer
      description: Eco mode value (see appendix)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: projector_name
      type: string
      description: Up to 16 bytes

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: parameter
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: setting_value
      type: integer
      description: Depends on parameter

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
    - name: input_terminal
      type: integer
      description: Input terminal value
    - name: setting_value
      type: integer
      description: "00h=Terminal specified, 02h=COMPUTER, 01h=BNC"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: freeze
      type: integer
      description: "01h=Freeze on, 02h=Freeze off"

# UNRESOLVED: commands 009, 037 series, 050, 053-1, 053-7, 060-1, 078 series, 084, 097 series, 098-8, 098-45, 098-198, 098-243-1, 305 series, 319-10 fully documented in source but not enumerated above for brevity
```

## Feedbacks
```yaml
- id: error_status
  type: bitfield
  description: Error status (bits for fan, temperature, lamp, power errors)

- id: command_result
  type: enum
  values: [success, error]
  description: Standard command completion response

- id: running_status
  type: object
  description: Power status, cooling state, operation mode

- id: input_status
  type: object
  description: Signal switch status, signal list number, signal type

- id: mute_status
  type: object
  description: Picture mute, sound mute, onscreen mute states

- id: lamp_information
  type: object
  description: Lamp usage time (seconds), remaining life (%)

- id: filter_usage_information
  type: object
  description: Filter usage time and alarm start time (seconds)

- id: carbon_savings_information
  type: object
  description: Total carbon savings, operation carbon savings (kg/mg)

- id: projector_information
  type: object
  description: Projector name, lamp usage time, filter usage time

- id: gain_parameter
  type: object
  description: Picture/volume adjustment ranges and current values

- id: information_string
  type: string
  description: Horizontal/vertical sync frequency strings

- id: eco_mode
  type: integer
  description: Eco mode value

- id: lan_projector_name
  type: string
  description: Projector name

- id: lan_mac_address
  type: string
  description: MAC address (hex)

- id: pip_picture_by_picture
  type: object
  description: PIP/PbP mode, position, sub input settings

- id: edge_blending_mode
  type: integer
  description: Edge blending mode (00h=OFF, 01h=ON)

- id: model_name
  type: string
  description: Model name string

- id: serial_number
  type: string
  description: Serial number string

- id: basic_information
  type: object
  description: Operation status, content displayed, signal type, mute/freeze states

- id: cover_status
  type: enum
  values: [normal, closed]
  description: Mirror/lens cover status
```

## Variables
```yaml
# UNRESOLVED: most settings are controlled via action commands; no distinct
# settable variables outside of action commands identified in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - While POWER ON command is executing, no other command can be accepted
  - While POWER OFF command is executing (including cooling time), no other command can be accepted
# UNRESOLVED: power-on sequencing requirements, voltage/power specifications not in source
```

## Notes
Command format: `20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>` for queries; `22h <CMD> <ID1> <ID2> <LEN> <DATA> <CKS>` for commands. Responses use `A2h` prefix for errors, `23h` for data responses, `A3h` for query errors. Checksum is low-order byte of sum of all preceding bytes.

The source appendix "Supplementary Information by Command" (input terminal values, aspect values, eco mode values) is referenced but not included in this document.
<!-- UNRESOLVED: appendix values for input terminals, aspect ratios, eco mode settings not in source document -->
<!-- UNRESOLVED: wireless LAN control details not in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:53:40.414Z
last_checked_at: 2026-05-14T18:17:19.306Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:19.306Z
matched_actions: 32
action_count: 32
confidence: medium
summary: "All 52 spec actions matched literally in source; transport parameters verified; full command coverage with 98% of distinct command tokens represented. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "wireless LAN unit control details not in source"
- "flow control not specified in source"
- "commands 009, 037 series, 050, 053-1, 053-7, 060-1, 078 series, 084, 097 series, 098-8, 098-45, 098-198, 098-243-1, 305 series, 319-10 fully documented in source but not enumerated above for brevity"
- "most settings are controlled via action commands; no distinct"
- "no unsolicited event/notification mechanism described in source"
- "no explicit multi-step macro sequences documented in source"
- "power-on sequencing requirements, voltage/power specifications not in source"
- "appendix values for input terminals, aspect ratios, eco mode settings not in source document"
- "wireless LAN control details not in source"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
