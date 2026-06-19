---
spec_id: admin/sharp-nec-pn-l651h
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Pn L651H Control Spec"
manufacturer: Sharp/NEC
model_family: "Pn L651H"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Pn L651H"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T07:13:48.515Z
last_checked_at: 2026-06-18T09:08:17.027Z
generated_at: 2026-06-18T09:08:17.027Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic \"Projector Control Command Reference Manual\" (BDT140013 Rev 7.1) reused across models; model-specific availability not enumerated. Appendix \"Supplementary Information by Command\" not included in source text, so input terminal values, aspect values, eco mode values, sub input values, and base model types are not fully specified here."
  - "flow control not stated in source"
  - "input terminal value list not in source"
  - "aspect value list not in source"
  - "eco mode value list not in source"
  - "enum values not in source (in Appendix)"
  - "actual range returned by GAIN PARAMETER REQUEST 3 per device"
  - "enum list not in source"
  - "source documents only command/response model; no unsolicited notifications described."
  - "source documents no multi-step sequences."
  - "firmware version compatibility not stated in source"
  - "Appendix \"Supplementary Information by Command\" not in refined source — input terminal values, aspect values, eco mode values, sub input values, base model types, signal type mappings incomplete"
  - "serial flow_control not stated"
  - "factory-default baud rate not stated"
  - "model-specific command availability for Pn L651H not enumerated (source is multi-model)"
verification:
  verdict: verified
  checked_at: 2026-06-18T09:08:17.027Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Pn L651H Control Spec

## Summary
Sharp/NEC Pn L651H large-format display/projector controlled via RS-232C serial or TCP/IP LAN (port 7142). Binary frame protocol with hex-encoded commands, ID1/ID2 bytes, data payload, and a trailing checksum byte (low-order 8 bits of sum of all preceding bytes).

<!-- UNRESOLVED: source is a generic "Projector Control Command Reference Manual" (BDT140013 Rev 7.1) reused across models; model-specific availability not enumerated. Appendix "Supplementary Information by Command" not included in source text, so input terminal values, aspect values, eco mode values, sub input values, and base model types are not fully specified here. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: POWER ON / POWER OFF commands present
  - queryable      # inferred: many *REQUEST* query commands present
  - levelable      # inferred: PICTURE ADJUST / VOLUME ADJUST present
  - routable       # inferred: INPUT SW CHANGE present
```

## Actions
```yaml
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
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

- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal byte (e.g. 06h = video port). Full list in Appendix not present in source. # UNRESOLVED: input terminal value list not in source

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
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02}-{DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)
    - name: DATA02
      type: integer
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: DATA03
      type: integer
      description: Adjustment value low-order 8 bits
    - name: DATA04
      type: integer
      description: Adjustment value high-order 8 bits

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01}-{DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjustment mode (00h=absolute, 01h=relative)
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
      description: Aspect value. Full list in Appendix not present in source. # UNRESOLVED: aspect value list not in source

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01}-{DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target high byte (96h=LAMP/LIGHT ADJUST)
    - name: DATA02
      type: integer
      description: Adjustment target low byte (FFh)
    - name: DATA03
      type: integer
      description: Adjustment mode (00h=absolute, 01h=relative)
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
      description: Lamp selector (00h=Lamp 1, 01h=Lamp 2; Lamp 2 only on two-lamp models)
    - name: DATA02
      type: integer
      description: Content (01h=Lamp usage time seconds, 04h=Lamp remaining life %)

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: 00h=Total Carbon Savings, 01h=Carbon Savings during operation

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Key code low byte (WORD type; see key code list - e.g. 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 02h=POWER ON, 03h=POWER OFF)
    - name: DATA02
      type: integer
      description: Key code high byte (typically 00h)

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
      description: Target (06h=Periphery Focus)
    - name: DATA02
      type: integer
      description: Drive content (00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+, 81h=-, FDh=-0.25s, FEh=-0.5s, FFh=-1s)

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Target (06h=Periphery Focus)

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01}-{DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Target (FFh=Stop)
    - name: DATA02
      type: integer
      description: Adjustment mode (00h=absolute, 02h=relative)
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
      description: 00h=MOVE, 01h=STORE, 02h=RESET

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: 00h=MOVE, 01h=STORE, 02h=RESET

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE
    - name: DATA02
      type: integer
      description: Setting value (00h=OFF, 01h=ON)

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
      description: Profile number (00h=Profile 1, 01h=Profile 2)

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
      description: Adjusted value name (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust)

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
      description: 01h=Freeze on, 02h=Freeze off

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Information type (03h=Horizontal sync frequency, 04h=Vertical sync frequency)

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

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3

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
      description: Eco mode value. Full list in Appendix not present in source. # UNRESOLVED: eco mode value list not in source

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
  params:
    - name: name
      type: string
      description: Projector name bytes (DATA01-16, up to 16 bytes)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3
    - name: DATA02
      type: integer
      description: Setting value (depends on DATA01; see source for mode/position/sub-input values)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Setting value (00h=OFF, 01h=ON)

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
      description: Input terminal. Full list in Appendix not present in source. # UNRESOLVED: input terminal value list not in source
    - name: DATA02
      type: integer
      description: Setting value (00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER)
```

## Feedbacks
```yaml
- id: error_status
  type: bitmask
  description: 12-byte error status (DATA01-12). Bit=0 normal, bit=1 error. Covers cover/fan/temp/power/lamp/formatter/FPGA/mirror cover/iris/interlock/system errors.
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: RUNNING STATUS REQUEST DATA03/DATA06
- id: cooling_process
  type: enum
  values: [not_executed, during_execution]
- id: power_on_off_process
  type: enum
  values: [not_executed, during_execution]
- id: picture_mute_state
  type: enum
  values: [off, on]
- id: sound_mute_state
  type: enum
  values: [off, on]
- id: onscreen_mute_state
  type: enum
  values: [off, on]
- id: forced_onscreen_mute_state
  type: enum
  values: [off, on]
- id: cover_status
  type: enum
  values: [normal_opened, closed]
- id: input_signal_status
  type: composite
  description: 16-byte input signal status incl. signal list number, signal types, test pattern, content displayed
- id: lens_operation_status
  type: bitmask
  description: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V (0=Stop, 1=During operation)
- id: eco_mode
  type: enum
  description: Eco/Light/Lamp mode value. # UNRESOLVED: enum values not in source (in Appendix)
- id: edge_blending_mode
  type: enum
  values: [off, on]
- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
```

## Variables
```yaml
- id: brightness
  type: integer
  range: dynamic  # UNRESOLVED: actual range returned by GAIN PARAMETER REQUEST 3 per device
- id: contrast
  type: integer
- id: color
  type: integer
- id: hue
  type: integer
- id: sharpness
  type: integer
- id: volume
  type: integer
- id: lamp_adjust
  type: integer
  description: Lamp/Light adjust value (target 96h)
- id: aspect
  type: enum
  description: Aspect value. # UNRESOLVED: enum list not in source
- id: projector_name
  type: string
  max_length: 16
- id: horizontal_sync_frequency
  type: string
- id: vertical_sync_frequency
  type: string
```

## Events
```yaml
# UNRESOLVED: source documents only command/response model; no unsolicited notifications described.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: "While POWER ON is executing, no other command can be accepted."
  - command: power_off
    note: "While POWER OFF is executing (including cooling time), no other command can be accepted."
# Note: error status includes interlock switch open (DATA09 Bit1) and various hardware faults.
```

## Notes
- Source document: "Projector Control Command Reference Manual" BDT140013 Rev 7.1. Document is shared across many Sharp/NEC projector/display models; command availability is model-dependent and not all commands apply to Pn L651H (a large-format display). Verify per-command support against a real device.
- Command/response format: all bytes hex; each request includes header bytes, ID1 (control ID), ID2 (model code), data length LEN, data bytes, and checksum CKS. CKS = low-order 8 bits of the sum of all preceding bytes.
- Baud rate listed as selectable (115200/38400/19200/9600/4800 bps); no factory default stated. Pick one and match projector setting.
- TCP port 7142 for LAN control (stated).
- Wire: RS-232C cross cable on PC CONTROL port (D-SUB 9P); pins 2/3 cross, 5=GND, 7/8 cross (RTS/CTS).
- Error codes table provided (ERR1/ERR2); key ones: 02h 0Dh = "command cannot be accepted because power is off", 02h 0Fh = "no authority", 03h 02h = "adjustment failed".

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not in refined source — input terminal values, aspect values, eco mode values, sub input values, base model types, signal type mappings incomplete -->
<!-- UNRESOLVED: serial flow_control not stated -->
<!-- UNRESOLVED: factory-default baud rate not stated -->
<!-- UNRESOLVED: model-specific command availability for Pn L651H not enumerated (source is multi-model) -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T07:13:48.515Z
last_checked_at: 2026-06-18T09:08:17.027Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:08:17.027Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic \"Projector Control Command Reference Manual\" (BDT140013 Rev 7.1) reused across models; model-specific availability not enumerated. Appendix \"Supplementary Information by Command\" not included in source text, so input terminal values, aspect values, eco mode values, sub input values, and base model types are not fully specified here."
- "flow control not stated in source"
- "input terminal value list not in source"
- "aspect value list not in source"
- "eco mode value list not in source"
- "enum values not in source (in Appendix)"
- "actual range returned by GAIN PARAMETER REQUEST 3 per device"
- "enum list not in source"
- "source documents only command/response model; no unsolicited notifications described."
- "source documents no multi-step sequences."
- "firmware version compatibility not stated in source"
- "Appendix \"Supplementary Information by Command\" not in refined source — input terminal values, aspect values, eco mode values, sub input values, base model types, signal type mappings incomplete"
- "serial flow_control not stated"
- "factory-default baud rate not stated"
- "model-specific command availability for Pn L651H not enumerated (source is multi-model)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
