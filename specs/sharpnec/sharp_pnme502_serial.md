---
spec_id: admin/sharp-nec-pnme502
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Pnme502 Control Spec"
manufacturer: Sharp/NEC
model_family: Pnme502
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - Pnme502
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:57:57.073Z
last_checked_at: 2026-06-18T09:11:47.429Z
generated_at: 2026-06-18T09:11:47.429Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "default baud rate not stated (source lists 5 supported rates, no default marked)"
  - "ID2 model code value for Pnme502 not stated (varies by model)"
  - "input-terminal DATA01 value map referenced to \"Appendix\" not present in refined source"
  - "source documents no unsolicited notifications; all responses are replies to commands"
  - "source states POWER ON and POWER OFF block all other commands during execution (including cooling time), but does not describe formal interlock sequences or power-on ordering requirements"
  - "firmware version compatibility not stated"
  - "default baud rate not designated among the five supported rates"
  - "ID2 model code value for Pnme502 not in source"
  - "input-terminal DATA01 value map (vendor Appendix not in refined source)"
  - "eco-mode DATA01 value map (vendor Appendix not in refined source)"
  - "base model type value map (vendor Appendix not in refined source)"
  - "sub-input setting value map for PIP/PbP (vendor Appendix not in refined source)"
verification:
  verdict: verified
  checked_at: 2026-06-18T09:11:47.429Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Pnme502 Control Spec

## Summary
Sharp/NEC Pnme502 projector control spec covering RS-232C serial and wired/wireless LAN (TCP) control. Binary frame protocol with hex-byte commands, ID1/ID2 addressing, and a trailing checksum byte. Source: BDT140013 Revision 7.1 Projector Control Command Reference Manual.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: default baud rate not stated (source lists 5 supported rates, no default marked) -->
<!-- UNRESOLVED: ID2 model code value for Pnme502 not stated (varies by model) -->
<!-- UNRESOLVED: input-terminal DATA01 value map referenced to "Appendix" not present in refined source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate:
    - 115200
    - 38400
    - 19200
    - 9600
    - 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null
addressing:
  port: 7142
auth:
  type: none
```

## Traits
```yaml
traits:
  - powerable
  - queryable
  - levelable
```

## Actions
```yaml
actions:
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
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Input terminal selector byte (values documented in vendor Appendix, not present in refined source)
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
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
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
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
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
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Aspect value (values documented in vendor Appendix, not present in refined source)
  - id: other_adjust
    label: Other Adjust
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Adjustment target high byte (96h=LAMP/LIGHT ADJUST)
      - name: DATA02
        type: integer
        description: Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)
      - name: DATA03
        type: integer
        description: Adjustment mode (00h=absolute, 01h=relative)
      - name: DATA04
        type: integer
        description: Adjustment value low-order 8 bits
      - name: DATA05
        type: integer
        description: Adjustment value high-order 8 bits
  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Key code low byte (see key code list in source)
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
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Lens target (06h=Periphery Focus; additional values per source)
      - name: DATA02
        type: integer
        description: Drive content (00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus, 81h=minus, FDh=-0.25s, FEh=-0.5s, FFh=-1s)
  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Lens target (FFh=Stop)
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
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Operation (00h=MOVE, 01h=STORE, 02h=RESET)
  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Operation (00h=MOVE, 01h=STORE, 02h=RESET)
  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)
      - name: DATA02
        type: integer
        description: Setting value (00h=OFF, 01h=ON)
  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Profile number (00h=Profile 1, 01h=Profile 2)
  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: State (01h=ON, 02h=OFF)
  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Eco mode value (values documented in vendor Appendix, not present in refined source)
  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01..DATA16> 00h <CKS>"
    params:
      - name: DATA01_DATA16
        type: string
        description: Projector name (up to 16 bytes, NUL-terminated)
  - id: pip_picture_by_picture_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)
      - name: DATA02
        type: integer
        description: Setting value (value depends on DATA01 target; sub-input values in vendor Appendix)
  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Setting value (00h=OFF, 01h=ON)
  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Input terminal (values documented in vendor Appendix, not present in refined source)
      - name: DATA02
        type: integer
        description: Setting value (00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER)
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
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Lamp selector (00h=Lamp 1, 01h=Lamp 2; Lamp 2 only valid on two-lamp models)
      - name: DATA02
        type: integer
        description: Content (01h=usage time seconds, 04h=remaining life percent)
  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Content (00h=Total Carbon Savings, 01h=Carbon Savings during operation)
  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Lens target selector
  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)
  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
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
  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
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
  - id: lan_mac_address_status_request_2
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
  - id: pip_picture_by_picture_request
    label: PIP/Picture by Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)
  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
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
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitmask
    description: 12-byte error information block (DATA01-DATA12) returned by 009. ERROR STATUS REQUEST; bit set to 1 indicates error
  - id: power_status
    type: enum
    values: [standby, power_on]
    description: DATA03 of 078-2 RUNNING STATUS REQUEST (00h=Standby, 01h=Power On)
  - id: cooling_process_status
    type: enum
    values: [not_executed, during_execution]
    description: DATA04 of 078-2 (00h=Not executed, 01h=During execution)
  - id: power_on_off_process_status
    type: enum
    values: [not_executed, during_execution]
    description: DATA05 of 078-2 (00h=Not executed, 01h=During execution)
  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    description: DATA06 of 078-2 and DATA01 of 305-3
  - id: picture_mute_state
    type: enum
    values: [off, on]
    description: DATA01 of 078-4 MUTE STATUS REQUEST
  - id: sound_mute_state
    type: enum
    values: [off, on]
    description: DATA02 of 078-4
  - id: onscreen_mute_state
    type: enum
    values: [off, on]
    description: DATA03 of 078-4
  - id: cover_status
    type: enum
    values: [normal_opened, closed]
    description: DATA01 of 078-6 COVER STATUS REQUEST (00h=Normal/cover opened, 01h=Cover closed)
  - id: lens_operation_status
    type: bitmask
    description: DATA01 of 053-7 LENS INFORMATION REQUEST (Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V; 0=Stop, 1=During operation)
  - id: command_execution_result
    type: enum
    values: [success, error]
    description: Generic 0000h/non-0000h result returned by 030-1, 030-2, 030-12, 030-15, 319-10
  - id: command_error
    type: enum
    description: ERR1/ERR2 byte pair returned on failed command (see vendor error code table)
```

## Variables
```yaml
variables:
  - id: brightness
    type: integer
    description: Picture brightness, adjusted via 030-1 PICTURE ADJUST (DATA01=00h)
  - id: contrast
    type: integer
    description: Picture contrast, adjusted via 030-1 (DATA01=01h)
  - id: color
    type: integer
    description: Picture color, adjusted via 030-1 (DATA01=02h)
  - id: hue
    type: integer
    description: Picture hue, adjusted via 030-1 (DATA01=03h)
  - id: sharpness
    type: integer
    description: Picture sharpness, adjusted via 030-1 (DATA01=04h)
  - id: volume
    type: integer
    description: Sound volume, adjusted via 030-2 VOLUME ADJUST
  - id: aspect
    type: integer
    description: Aspect setting, adjusted via 030-12 ASPECT ADJUST
  - id: lamp_light_adjust
    type: integer
    description: Lamp/Light adjust gain, adjusted via 030-15 OTHER ADJUST (DATA01=96h)
  - id: eco_mode
    type: integer
    description: Eco/Light/Lamp mode, set via 098-8 and queried via 097-8
  - id: edge_blending_mode
    type: enum
    values: [off, on]
    description: Edge blending state, set via 098-243-1 and queried via 097-243-1
  - id: freeze_state
    type: enum
    values: [on, off]
    description: Freeze state, controlled via 079 FREEZE CONTROL
```

## Events
```yaml
events: []
```

<!-- UNRESOLVED: source documents no unsolicited notifications; all responses are replies to commands -->

## Macros
```yaml
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

<!-- UNRESOLVED: source states POWER ON and POWER OFF block all other commands during execution (including cooling time), but does not describe formal interlock sequences or power-on ordering requirements -->

## Notes
- Frame format: commands are hex byte sequences. Byte positions 3-4 of fixed-form commands carry ID1 (Control ID) and ID2 (Model code); the source's literal examples assume ID1=00h, ID2=00h. Checksum byte (CKS) is the low-order 8 bits of the sum of all preceding bytes.
- Success response prefix = 20h + command-type byte; error response prefix = A0h + command-type byte. ERR1/ERR2 byte pairs carry failure reasons (see source section 2.4).
- Supported serial baud rates: 115200, 38400, 19200, 9600, 4800 bps. Source does not designate a default.
- TCP control port 7142 (explicitly stated for wired/wireless LAN command transport).
- ID2 (model code) is model-dependent and not stated in source for Pnme502.
- Several commands reference a vendor "Appendix: Supplementary Information by Command" for input-terminal and sub-input value maps; that appendix is not present in the refined source text and those value lists are therefore unresolved.
- Commands 078-2 RUNNING STATUS REQUEST, 078-4 MUTE STATUS REQUEST, 078-5 MODEL NAME REQUEST, 078-6 COVER STATUS REQUEST show no explicit error-response line in the source; the standard A0h-prefixed error frame is presumed by convention but not literally documented for those rows.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: default baud rate not designated among the five supported rates -->
<!-- UNRESOLVED: ID2 model code value for Pnme502 not in source -->
<!-- UNRESOLVED: input-terminal DATA01 value map (vendor Appendix not in refined source) -->
<!-- UNRESOLVED: eco-mode DATA01 value map (vendor Appendix not in refined source) -->
<!-- UNRESOLVED: base model type value map (vendor Appendix not in refined source) -->
<!-- UNRESOLVED: sub-input setting value map for PIP/PbP (vendor Appendix not in refined source) -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:57:57.073Z
last_checked_at: 2026-06-18T09:11:47.429Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:11:47.429Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "default baud rate not stated (source lists 5 supported rates, no default marked)"
- "ID2 model code value for Pnme502 not stated (varies by model)"
- "input-terminal DATA01 value map referenced to \"Appendix\" not present in refined source"
- "source documents no unsolicited notifications; all responses are replies to commands"
- "source states POWER ON and POWER OFF block all other commands during execution (including cooling time), but does not describe formal interlock sequences or power-on ordering requirements"
- "firmware version compatibility not stated"
- "default baud rate not designated among the five supported rates"
- "ID2 model code value for Pnme502 not in source"
- "input-terminal DATA01 value map (vendor Appendix not in refined source)"
- "eco-mode DATA01 value map (vendor Appendix not in refined source)"
- "base model type value map (vendor Appendix not in refined source)"
- "sub-input setting value map for PIP/PbP (vendor Appendix not in refined source)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
