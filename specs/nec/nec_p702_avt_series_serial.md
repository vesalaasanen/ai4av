---
spec_id: admin/nec-p702-avt-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC P702-AVT Series Control Spec"
manufacturer: NEC
model_family: P702-AVT
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - P702-AVT
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-09-02T18:12:38.088Z
last_checked_at: 2026-09-15T22:17:28.697Z
generated_at: 2026-09-15T22:17:28.697Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not explicitly list P702-AVT as a covered model"
  - "source is a model-generic manual; per-model applicability to P702-AVT not confirmed"
  - "flow control not explicitly stated; full duplex mode noted"
  - "source does not document unsolicited notifications from the projector"
  - "source does not document multi-step macro sequences"
  - "source describes command-rejection during power transitions but no formal safety interlocks"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-09-15T22:17:28.697Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match source hex byte sequences verbatim; transport parameters (port 7142, baud 115200) confirmed; one-to-one coverage of source's command catalogue. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# NEC P702-AVT Series Control Spec

## Summary
NEC projector control commands over RS-232C serial and TCP port 7142, using a binary framed protocol with header, model code, length, data, and checksum. The P702-AVT is assumed to be among the models covered by NEC's generic "Projector Control Command Reference Manual" (BDT140013 Rev 7.1); the manual itself does not name specific models. <!-- UNRESOLVED: source does not explicitly list P702-AVT as a covered model -->

<!-- UNRESOLVED: source is a model-generic manual; per-model applicability to P702-AVT not confirmed -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; 115200 listed first as default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated; full duplex mode noted
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from power on/off commands
- routable        # inferred from input switch and PIP/PBP commands
- queryable       # inferred from many status requests
- levelable       # inferred from picture/volume adjust commands
```

## Actions
```yaml
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"  # literal hex payload, CKS computed as low byte of sum of preceding bytes
  params: []

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

- id: input_switch
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal code; see appendix "Supplementary Information by Command"

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
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target (00h brightness, 01h contrast, 02h color, 03h hue, 04h sharpness)
    - name: DATA02
      type: integer
      description: Adjustment mode (00h absolute, 01h relative)
    - name: DATA03
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA04
      type: integer
      description: Adjustment value high-order 8 bits

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjustment mode (00h absolute, 01h relative)
    - name: DATA02
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA03
      type: integer
      description: Adjustment value high-order 8 bits

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Aspect value; see appendix

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: DATA01 high byte (96h for LAMP ADJUST / LIGHT ADJUST)
    - name: DATA02
      type: integer
      description: DATA01 low byte (FFh for LAMP ADJUST / LIGHT ADJUST)
    - name: DATA03
      type: integer
      description: Adjustment mode (00h absolute, 01h relative)
    - name: DATA04
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA05
      type: integer
      description: Adjustment value high-order 8 bits

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
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lamp number (00h lamp 1, 01h lamp 2 [two-lamp models only])
    - name: DATA02
      type: integer
      description: Content (01h usage time seconds, 04h remaining life %)

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Content (00h total, 01h during operation)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Key code high byte (see Key code list)
    - name: DATA02
      type: integer
      description: Key code low byte (00h for listed keys)

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
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens axis (06h periphery focus)
    - name: DATA02
      type: integer
      description: Drive direction/duration (00h stop, 01h-03h/7Fh plus, 81h/FDh-FFh minus)

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens axis code

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Operation (FFh stop)
    - name: DATA02
      type: integer
      description: Adjustment mode (00h absolute, 02h relative)
    - name: DATA03
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA04
      type: integer
      description: Adjustment value high-order 8 bits

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Operation (00h move, 01h store, 02h reset)

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Operation (00h move, 01h store, 02h reset)

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Option (00h LOAD BY SIGNAL, 01h FORCED MUTE)

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Option (00h LOAD BY SIGNAL, 01h FORCED MUTE)
    - name: DATA02
      type: integer
      description: Setting value (00h off, 01h on)

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Profile number (00h profile 1, 01h profile 2)

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjusted value name (00h brightness, 01h contrast, 02h color, 03h hue, 04h sharpness, 05h volume, 96h lamp/light)

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

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Mode (01h on, 02h off)

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Information type (03h horizontal sync freq, 04h vertical sync freq)

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
  label: PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Target (00h mode, 01h start position, 02h sub input 1, 09h sub input 2, 0Ah sub input 3)

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Eco mode value; see appendix

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01-DATA16} 00h {CKS}"
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL terminated)

- id: pip_pbp_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Target (00h mode, 01h start position, 02h sub input 1, 09h sub input 2, 0Ah sub input 3)
    - name: DATA02
      type: integer
      description: Setting value (depends on DATA01)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Setting value (00h off, 01h on)

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

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal; see appendix
    - name: DATA02
      type: integer
      description: Setting value (00h same as DATA01 terminal, 01h BNC, 02h COMPUTER)
```

## Feedbacks
```yaml
- id: error_status
  type: bitfield
  description: Error information bytes DATA01-DATA12 in 009 Error Status Request response

- id: input_switch_result
  type: enum
  values: [success, error_ff]

- id: picture_adjust_result
  type: enum
  values: [success, error]

- id: volume_adjust_result
  type: enum
  values: [success, error]

- id: aspect_adjust_result
  type: enum
  values: [success, error]

- id: other_adjust_result
  type: enum
  values: [success, error]

- id: projector_info
  type: object
  description: Projector name, lamp/filter usage time from 037 Information Request

- id: filter_usage
  type: object
  description: Filter usage time and filter alarm start time from 037-3

- id: lamp_info
  type: object
  description: Lamp usage time (seconds) or remaining life (%) from 037-4

- id: carbon_savings
  type: object
  description: Carbon savings kg/mg from 037-6

- id: remote_key_result
  type: enum
  values: [success, error_ff]

- id: lens_control_result
  type: enum
  values: [success, error_ff]

- id: lens_position
  type: object
  description: Upper/lower limits and current lens value from 053-1

- id: lens_control_2_result
  type: object
  description: Operation result and adjustment mode from 053-2

- id: lens_memory_control_result
  type: enum
  values: [move, store, reset, error]

- id: reference_lens_memory_control_result
  type: enum
  values: [move, store, reset, error]

- id: lens_memory_option
  type: enum
  values: [off, on]

- id: lens_information
  type: bitfield
  description: Lens memory, zoom, focus, shift status bits from 053-7

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]

- id: gain_parameter
  type: object
  description: Status, limits, default, current, adjustment widths from 060-1

- id: setting_info
  type: object
  description: Base model type, sound function, profile number from 078-1

- id: running_status
  type: object
  description: Power, cooling, on/off process, operation status from 078-2

- id: input_status
  type: object
  description: Signal switch, signal list, selection signal type, signal list type, test pattern, content from 078-3

- id: mute_status
  type: object
  description: Picture/sound/onscreen/forced onscreen mute, onscreen display flags from 078-4

- id: model_name
  type: string
  description: NUL-terminated model name from 078-5

- id: cover_status
  type: enum
  values: [normal, closed]

- id: freeze_control_result
  type: integer
  description: Echo of DATA01 from 079 response

- id: information_string
  type: string
  description: Horizontal/vertical sync frequency string from 084

- id: eco_mode_value
  type: integer
  description: Eco mode setting value from 097-8

- id: lan_projector_name
  type: string
  description: NUL-terminated projector name from 097-45

- id: lan_mac_address
  type: string
  description: 6-byte MAC address from 097-155

- id: pip_pbp_value
  type: integer
  description: Setting value for selected PIP/PBP target from 097-198

- id: edge_blending_value
  type: enum
  values: [off, on]

- id: base_model_type
  type: object
  description: Base model type code and model name from 305-1

- id: serial_number
  type: string
  description: NUL-terminated serial number from 305-2

- id: basic_information
  type: object
  description: Operation status, content displayed, signal type, mute/freeze status from 305-3

- id: audio_select_result
  type: enum
  values: [success, error]
```

## Variables
```yaml
# No separate variable section; all settable parameters are exposed as parameterized actions above.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications from the projector
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source notes: "While this command is turning off the power (including the cooling time), no other command can be accepted."
  - power_on   # source notes: "While this command is turning on the power, no other command can be accepted."
interlocks: []
# UNRESOLVED: source describes command-rejection during power transitions but no formal safety interlocks
```

## Notes
- Source manual (BDT140013 Rev 7.1, dated April 2020) is model-generic; per-model applicability to P702-AVT not stated.
- Serial config supports multiple baud rates (115200/38400/19200/9600/4800); 115200 listed first.
- All commands use a framed binary protocol: header byte (20h command / 22h ack / 23h parameter ack / A0h/A2h/A3h error), model code byte (ID2), length byte (LEN), variable data, and trailing checksum (CKS = low byte of sum of preceding bytes).
- "Some models cannot receive commands in standby mode" — check appendix "Standby Mode setting for receiving commands" for P702-AVT applicability.
- Connection via LAN uses TCP port 7142; connection via serial uses RS-232C (D-SUB 9P) with cross cable.
- <!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-09-02T18:12:38.088Z
last_checked_at: 2026-09-15T22:17:28.697Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-15T22:17:28.697Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match source hex byte sequences verbatim; transport parameters (port 7142, baud 115200) confirmed; one-to-one coverage of source's command catalogue. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not explicitly list P702-AVT as a covered model"
- "source is a model-generic manual; per-model applicability to P702-AVT not confirmed"
- "flow control not explicitly stated; full duplex mode noted"
- "source does not document unsolicited notifications from the projector"
- "source does not document multi-step macro sequences"
- "source describes command-rejection during power transitions but no formal safety interlocks"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
