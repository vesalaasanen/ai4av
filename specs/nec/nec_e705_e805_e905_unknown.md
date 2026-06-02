---
spec_id: admin/nec-e705-e805-e905
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC E705 E805 E905 Control Spec"
manufacturer: NEC
model_family: E705
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - E705
    - E805
    - E905
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T07:50:57.838Z
last_checked_at: 2026-06-02T22:10:18.656Z
generated_at: 2026-06-02T22:10:18.656Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "wireless LAN control details not in source; Appendix referenced but not included"
  - "no unsolicited event descriptions in source"
  - "no explicit macro sequences described in source"
  - "Appendix \"Supplementary Information by Command\" values (input terminal codes, aspect values, eco mode values, signal types) not included in source"
  - "wireless LAN control protocol not documented in source"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:10:18.656Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions traced to source (dip-safe re-verify). (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# NEC E705 E805 E905 Control Spec

## Summary
NEC professional projectors (E705, E805, E905) controllable via RS-232C serial and wired LAN (TCP). Protocol uses binary commands with_checksum, ID1/ID2 addressing, and supports power, mute, lens, input routing, and query operations.

<!-- UNRESOLVED: wireless LAN control details not in source; Appendix referenced but not included -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 7142
auth:
  type: none
```

## Traits
```yaml
powerable: true
routable: true
queryable: true
levelable: true
```

## Actions
```yaml
- id: error_status_request
  label: Error Status Request
  kind: action
  params: []

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
    - name: input
      type: integer
      description: Input terminal number (see Appendix for values)

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
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=Absolute, 01h=Relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute, 01h=Relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect ratio value (see Appendix)

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h=Lamp/Light Adjust"
    - name: mode
      type: integer
      description: "00h=Absolute, 01h=Relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: information_request
  label: Information Request
  kind: query
  params: []

- id: filter_usage_info_request
  label: Filter Usage Information Request
  kind: query
  params: []

- id: lamp_info_request_3
  label: Lamp Information Request 3
  kind: query
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Usage time, 04h=Remaining life"

- id: carbon_savings_info_request
  label: Carbon Savings Information Request
  kind: query
  params:
    - name: type
      type: integer
      description: "00h=Total, 01h=During operation"

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
    - name: target
      type: integer
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h/02h/03h=Drive plus, 7Fh=Drive plus cont, 81h=Drive minus cont, FDh/FEh/FFh=Drive minus"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: target
      type: integer
      description: Lens control target

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: cmd
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=Absolute, 02h=Relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: op
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: op
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: target
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

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

- id: lens_information_request
  label: Lens Information Request
  kind: query
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  params:
    - name: name
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp"

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

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=On, 02h=Off"

- id: information_string_request
  label: Information String Request
  kind: query
  params:
    - name: type
      type: integer
      description: "03h=Horizontal sync freq, 04h=Vertical sync freq"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []

- id: lan_mac_address_request
  label: LAN MAC Address Request
  kind: query
  params: []

- id: pip_pbp_request
  label: PIP/PBP Request
  kind: query
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: Eco mode value (see Appendix)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_pbp_set
  label: PIP/PBP Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

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

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal
    - name: value
      type: integer
      description: "00h=Terminal in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  type: object
  description: Error status bitfield (DATA01-DATA12)

- id: power_response
  type: object
  description: Power command acknowledgement with ERR1/ERR2

- id: input_switch_response
  type: object
  description: Input switch result with ERR1/ERR2

- id: mute_response
  type: object
  description: Mute command acknowledgement with ERR1/ERR2

- id: picture_adjust_response
  type: object
  description: Picture adjust result (0000h=success)

- id: volume_adjust_response
  type: object
  description: Volume adjust result (0000h=success)

- id: information_response
  type: object
  description: Projector info (name, lamp time, filter time)

- id: filter_usage_response
  type: object
  description: Filter usage time and alarm start time

- id: lamp_info_response
  type: object
  description: Lamp usage time and remaining life

- id: carbon_savings_response
  type: object
  description: Carbon savings in kg and mg

- id: lens_control_response
  type: object
  description: Lens control acknowledgement

- id: lens_control_request_response
  type: object
  description: Lens position values (upper/lower limits, current)

- id: lens_memory_response
  type: object
  description: Lens memory operation result

- id: lens_info_response
  type: object
  description: Lens status bitfield (memory/zoom/focus/shift)

- id: gain_parameter_response
  type: object
  description: Gain parameter values with limits and current value

- id: setting_response
  type: object
  description: Projector settings (base model, sound, clock, profile)

- id: running_status_response
  type: object
  description: Power/cooling/status state

- id: input_status_response
  type: object
  description: Input signal status and type

- id: mute_status_response
  type: object
  description: Picture/sound/onscreen/freeze mute states

- id: model_name_response
  type: string
  description: Model name string

- id: cover_status_response
  type: enum
  values:
    - "00h"
    - "01h"

- id: freeze_response
  type: object
  description: Freeze control acknowledgement

- id: info_string_response
  type: object
  description: Information string with length and text

- id: eco_mode_response
  type: integer
  description: Eco mode setting value

- id: projector_name_response
  type: string
  description: LAN projector name

- id: mac_address_response
  type: string
  description: MAC address (hex)

- id: pip_pbp_response
  type: object
  description: PIP/PBP mode, position, sub-input settings

- id: edge_blending_response
  type: enum
  values:
    - "00h"
    - "01h"

- id: serial_number_response
  type: string
  description: Serial number string

- id: basic_info_response
  type: object
  description: Operation status, content displayed, signal type, mute states

- id: audio_select_response
  type: object
  description: Audio select result
```

## Variables
```yaml
- id: eco_mode
  type: integer
  description: Eco mode setting

- id: projector_name
  type: string
  description: LAN projector name

- id: pip_pbp_mode
  type: enum
  values:
    - "00h"
    - "01h"

- id: pip_pbp_position
  type: enum
  values:
    - "00h"
    - "01h"
    - "02h"
    - "03h"

- id: edge_blending
  type: enum
  values:
    - "00h"
    - "01h"

- id: lens_profile
  type: enum
  values:
    - "00h"
    - "01h"

- id: lens_memory_option
  type: object
  description: Load-by-signal and forced mute settings
```

## Events
```yaml
# UNRESOLVED: no unsolicited event descriptions in source
```

## Macros
```yaml
# UNRESOLVED: no explicit macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
Serial supports 115200/38400/19200/9600/4800 bps auto-baud. LAN uses TCP port 7142. Command packet: `[PREAMBLE] [ID1] [ID2] [LEN] [DATA...] [CKS]` — checksum = low-order byte of sum of all preceding bytes. Response packet: `[PREAMBLE] [ID1] [ID2] [LEN] [DATA/ERR] [CKS]`. Power on/off commands block other commands during execution. "No signal" error (02h 07h) indicates input switch failure.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" values (input terminal codes, aspect values, eco mode values, signal types) not included in source -->
<!-- UNRESOLVED: wireless LAN control protocol not documented in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T07:50:57.838Z
last_checked_at: 2026-06-02T22:10:18.656Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:10:18.656Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions traced to source (dip-safe re-verify). (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "wireless LAN control details not in source; Appendix referenced but not included"
- "no unsolicited event descriptions in source"
- "no explicit macro sequences described in source"
- "Appendix \"Supplementary Information by Command\" values (input terminal codes, aspect values, eco mode values, signal types) not included in source"
- "wireless LAN control protocol not documented in source"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
