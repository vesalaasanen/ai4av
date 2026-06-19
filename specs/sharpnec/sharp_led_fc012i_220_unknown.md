---
spec_id: admin/sharp-nec-led-fc012i-220
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FC012I 220 Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FC012I 220"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FC012I 220"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:52:26.207Z
last_checked_at: 2026-06-18T08:03:39.788Z
generated_at: 2026-06-18T08:03:39.788Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model-name string, firmware version, and which appendix \"Supplementary Information by Command\" values apply to this model not stated in this source excerpt."
  - "flow control not stated (full-duplex communication mode stated)"
  - "source documents no unsolicited notifications; all responses are command-solicited."
  - "source documents no explicit multi-step macro sequences."
  - "no explicit safety interlock procedures stated beyond command-acceptance notes."
  - "Appendix \"Supplementary Information by Command\" value tables (input terminal codes, aspect values, eco mode values, sub-input values, base model type codes) not present in source."
  - "firmware version compatibility not stated."
  - "exact official model-name string for \"LED FC012I 220\" not confirmed in source (manual is a generic projector command reference, BDT140013 Rev 7.1)."
  - "serial flow_control not stated (only \"Full duplex\" communication mode stated)."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:03:39.788Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FC012I 220 Control Spec

## Summary
Sharp/NEC LED FC012I 220 projector control spec covering RS-232C serial and wired/wireless LAN (TCP) control. Based on the Projector Control Command Reference Manual (BDT140013 Rev 7.1), documenting ~53 commands including power, input switching, mutes, picture/volume/lens adjust, lens memory, status queries, and network settings.

<!-- UNRESOLVED: exact model-name string, firmware version, and which appendix "Supplementary Information by Command" values apply to this model not stated in this source excerpt. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists selectable rates: 115200/38400/19200/9600/4800 bps; 9600 shown as one supported value
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated (full-duplex communication mode stated)
addressing:
  port: 7142  # source: "Use TCP port number 7142 for sending and receiving commands"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred from POWER ON / POWER OFF commands
  - routable        # inferred from INPUT SW CHANGE command
  - levelable       # inferred from PICTURE ADJUST / VOLUME ADJUST / LENS CONTROL commands
  - queryable       # inferred from numerous status/information request commands
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
      - name: data01
        type: string
        description: "Input terminal value (e.g. 06h = video port). See Appendix Supplementary Information by Command."
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
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
    params:
      - name: data01
        type: string
        description: "Adjustment target (00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness)"
      - name: data02
        type: string
        description: "Adjustment mode (00h absolute, 01h relative)"
      - name: data03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data04
        type: integer
        description: Adjustment value (high-order 8 bits)
  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
    params:
      - name: data01
        type: string
        description: "Adjustment mode (00h absolute, 01h relative)"
      - name: data02
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data03
        type: integer
        description: Adjustment value (high-order 8 bits)
  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: data01
        type: string
        description: "Value set for the aspect. See Appendix Supplementary Information by Command."
  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
    params:
      - name: data01
        type: string
        description: "Adjustment target (DATA01=96h, DATA02=FFh for LAMP ADJUST / LIGHT ADJUST)"
      - name: data03
        type: string
        description: "Adjustment mode (00h absolute, 01h relative)"
      - name: data04
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data05
        type: integer
        description: Adjustment value (high-order 8 bits)
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
      - name: data01
        type: string
        description: "Lamp select (00h Lamp 1, 01h Lamp 2 [two-lamp models only])"
      - name: data02
        type: string
        description: "Content (01h lamp usage time seconds, 04h lamp remaining life %)"
  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "00h Total Carbon Savings, 01h Carbon Savings during operation"
  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: string
        description: "Key code low byte (WORD type). See key code list e.g. 02h POWER ON, 03h POWER OFF, 05h AUTO, 06h MENU, 07h UP, 08h DOWN, 09h RIGHT, 0Ah LEFT, 0Bh ENTER, 0Ch EXIT, 0Dh HELP, 0Fh MAGNIFY UP, 10h MAGNIFY DOWN, 13h MUTE, 29h PICTURE, 4Bh COMPUTER1, 4Ch COMPUTER2, 4Fh VIDEO1, 51h S-VIDEO1, 84h VOLUME UP, 85h VOLUME DOWN, 8Ah FREEZE, A3h ASPECT, D7h SOURCE, EEh LAMP MODE/ECO"
      - name: data02
        type: string
        description: Key code high byte
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
      - name: data01
        type: string
        description: "Adjustment target (06h Periphery Focus)"
      - name: data02
        type: string
        description: "Content (00h Stop, 01h drive +1s, 02h drive +0.5s, 03h drive +0.25s, 7Fh drive +, 81h drive -, FDh drive -0.25s, FEh drive -0.5s, FFh drive -1s)"
  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: data01
        type: string
        description: Adjustment target (lens axis)
  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
    params:
      - name: data01
        type: string
        description: "Target (FFh Stop, otherwise axis)"
      - name: data02
        type: string
        description: "Adjustment mode (00h absolute, 02h relative)"
      - name: data03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data04
        type: integer
        description: Adjustment value (high-order 8 bits)
  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "Operation (00h MOVE, 01h STORE, 02h RESET)"
  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "Operation (00h MOVE, 01h STORE, 02h RESET)"
  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: string
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
      - name: data02
        type: string
        description: "Setting value (00h OFF, 01h ON)"
  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "Profile number (00h Profile 1, 01h Profile 2)"
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
      - name: data01
        type: string
        description: "Adjusted value name (00h BRIGHTNESS, 01h CONTRAST, 02h COLOR, 03h HUE, 04h SHARPNESS, 05h VOLUME, 96h LAMP/LIGHT ADJUST)"
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
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "01h freeze on, 02h freeze off"
  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: data01
        type: string
        description: "Information type (03h Horizontal sync frequency, 04h Vertical sync frequency)"
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
  - id: pip_pbypicture_request
    label: PIP/Picture By Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "Value set for the eco mode. See Appendix Supplementary Information by Command."
  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
    params:
      - name: name
        type: string
        description: Projector name (up to 16 bytes, DATA01-DATA16)
  - id: pip_pbypicture_set
    label: PIP/Picture By Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: string
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
      - name: data02
        type: string
        description: "Setting value (MODE: 00h PIP/01h PBP; START POSITION: 00h TL/01h TR/02h BL/03h BR; or sub input value)"
  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "Setting value (00h OFF, 01h ON)"
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
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: string
        description: "Input terminal. See Appendix Supplementary Information by Command."
      - name: data02
        type: string
        description: "Setting value (00h terminal specified in DATA01, 01h BNC, 02h COMPUTER)"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitmask
    description: "DATA01-DATA12 bitfield: cover/fan/temp/power/lamp errors (see Error information list in source)"
  - id: execution_result
    type: enum
    values: [success, error]
    description: "Common 0000h success / other error response on adjust commands"
  - id: command_response_ack
    type: raw
    description: "Per-command response frames: 2xh header = success, Axh header = error with ERR1/ERR2 codes"
```

## Variables
```yaml
variables:
  - id: picture_brightness
    type: integer
    description: "Brightness (PICTURE ADJUST target 00h)"
  - id: picture_contrast
    type: integer
    description: "Contrast (PICTURE ADJUST target 01h)"
  - id: picture_color
    type: integer
    description: "Color (PICTURE ADJUST target 02h)"
  - id: picture_hue
    type: integer
    description: "Hue (PICTURE ADJUST target 03h)"
  - id: picture_sharpness
    type: integer
    description: "Sharpness (PICTURE ADJUST target 04h)"
  - id: volume
    type: integer
    description: "Sound volume (VOLUME ADJUST)"
  - id: lamp_light_adjust
    type: integer
    description: "Lamp/Light adjust (OTHER ADJUST target 96h)"
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications; all responses are command-solicited.
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source: cooling time follows, no other command accepted during power-off
  - power_on   # source: no other command accepted during power-on
interlocks: []
# UNRESOLVED: no explicit safety interlock procedures stated beyond command-acceptance notes.
# Note: error status DATA09 bit1 "interlock switch is open" is reported but interlock sequence not documented.
```

## Notes
- Commands use a hex frame format. Per source section 2.1, full frames carry a header byte, `<ID1>` (control ID), `<ID2>` (model code), `LEN` (data length), data bytes, and `<CKS>` (checksum). Checksum = low-order byte of the sum of all preceding bytes. The `command:` fields above capture the documented command payload bytes verbatim from the source; the surrounding frame wrapper (header/ID/LEN/CKS) must be applied by the integrator per section 2.2.
- Response framing: success responses begin with `2xh` (or `20h`/`23h`); error responses begin with `Axh`/`A0h`/`A3h` carrying `<ERR1> <ERR2>` per the error code list (section 2.4).
- Serial is RS-232C cross cable on PC CONTROL port (D-SUB 9P); pin assignment documented in source.
- Serial baud rate is selectable among 115200/38400/19200/9600/4800 bps — a single canonical value is not mandated; 9600 listed in Transport as one documented option.
- Several commands reference an "Appendix Supplementary Information by Command" for input terminal / aspect / eco-mode / sub-input value tables; that appendix is not present in this source excerpt.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" value tables (input terminal codes, aspect values, eco mode values, sub-input values, base model type codes) not present in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: exact official model-name string for "LED FC012I 220" not confirmed in source (manual is a generic projector command reference, BDT140013 Rev 7.1). -->
<!-- UNRESOLVED: serial flow_control not stated (only "Full duplex" communication mode stated). -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:52:26.207Z
last_checked_at: 2026-06-18T08:03:39.788Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:03:39.788Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model-name string, firmware version, and which appendix \"Supplementary Information by Command\" values apply to this model not stated in this source excerpt."
- "flow control not stated (full-duplex communication mode stated)"
- "source documents no unsolicited notifications; all responses are command-solicited."
- "source documents no explicit multi-step macro sequences."
- "no explicit safety interlock procedures stated beyond command-acceptance notes."
- "Appendix \"Supplementary Information by Command\" value tables (input terminal codes, aspect values, eco mode values, sub-input values, base model type codes) not present in source."
- "firmware version compatibility not stated."
- "exact official model-name string for \"LED FC012I 220\" not confirmed in source (manual is a generic projector command reference, BDT140013 Rev 7.1)."
- "serial flow_control not stated (only \"Full duplex\" communication mode stated)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
