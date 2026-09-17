---
spec_id: admin/nec-np502hl-np502wl
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP502HL/NP502WL Control Spec"
manufacturer: NEC
model_family: NP502HL
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - NP502HL
    - NP502WL
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T08:19:37.838Z
last_checked_at: 2026-09-15T22:16:48.556Z
generated_at: 2026-09-15T22:16:48.556Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic NEC projector protocol manual (BDT140013 Rev7.1) covering multiple models; specific NP502HL/NP502WL command set not differentiated in this document."
  - "flow control not explicitly stated; D-SUB 9P pinout shows RTS/CTS lines exist but config not stated"
  - "gain parameter values, aspect values, eco mode values, PIP/PBP sub-input values, edge blending settings all reference \"Appendix Supplementary Information by Command\" which is not included in source"
  - "source does not document unsolicited notifications"
  - "source does not document multi-step sequences"
  - "source mentions portrait cover interlock switch in error status DATA09 bit1 (\"The interlock switch is open\") but does not document procedure or behavior in detail"
  - "input terminal codes (used in 018 INPUT SW CHANGE, 319-10 AUDIO SELECT SET); aspect ratio codes; eco mode values; PIP/PBP sub-input values; base model type codes"
verification:
  verdict: verified
  checked_at: 2026-09-15T22:16:48.556Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match source commands 1:1 with identical hex payloads and transport values substantiated verbatim. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-03
---

# NEC NP502HL/NP502WL Control Spec

## Summary
NEC NP502HL and NP502WL projector control via RS-232C serial (D-SUB 9P PC CONTROL port) and wired/wireless LAN (TCP port 7142). Commands use binary framed protocol with checksum.

<!-- UNRESOLVED: source is a generic NEC projector protocol manual (BDT140013 Rev7.1) covering multiple models; specific NP502HL/NP502WL command set not differentiated in this document. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 115200  # highest of supported list; 38400/19200/9600/4800 also supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none # UNRESOLVED: flow control not explicitly stated; D-SUB 9P pinout shows RTS/CTS lines exist but config not stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from power on/off commands (015, 016)
- routable   # inferred from input switch command (018) and PIP/PBP commands
- queryable  # inferred from extensive status query commands
- levelable  # inferred from picture/volume/lamp adjust commands
```

## Actions
```yaml
# Frame format: header(2) ID1 ID2 LEN DATA... CKS
# Response prefix echoes header with 2xh (success) or Axh (error)

- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"  # literal from source
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"  # literal from source
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"  # literal from source
  params: []

- id: input_switch_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"  # DATA01 = input terminal code
  params:
    - name: DATA01
      type: integer
      description: Input terminal code (see Appendix "Supplementary Information by Command")

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"  # literal from source
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"  # literal from source
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"  # literal from source
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"  # literal from source
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"  # literal from source
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"  # literal from source
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
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
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
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
      description: Aspect value (see Appendix "Supplementary Information by Command")

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target high byte (96h)
    - name: DATA02
      type: integer
      description: Adjustment target low byte (FFh for LAMP ADJUST / LIGHT ADJUST)
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
  command: "03h 8Ah 00h 00h 00h 8Dh"  # literal from source
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"  # literal from source
  params: []

- id: lamp_information_request
  label: Lamp Information Request  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lamp number (00h=Lamp 1, 01h=Lamp 2; Lamp 2 only for two-lamp models)
    - name: DATA02
      type: integer
      description: Content (01h=usage time seconds, 04h=remaining life percent)

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Type (00h=Total, 01h=During operation)

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
      description: Key code low byte (always 00h per source table)

- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"  # literal from source
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"  # literal from source
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
      description: Action (00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus drive, 81h=minus drive, FDh=-0.25s, FEh=-0.5s, FFh=-1s)

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
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Action (FFh=Stop; else referenced)
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
      description: Operation (00h=MOVE, 01h=STORE, 02h=RESET)

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Operation (00h=MOVE, 01h=STORE, 02h=RESET)

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)
    - name: DATA02
      type: integer
      description: Value (00h=OFF, 01h=ON)

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"  # literal from source
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
  command: "02h 28h 00h 00h 00h 2Ah"  # literal from source
  params: []

- id: gain_parameter_request
  label: Gain Parameter Request
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Gain name (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light)

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"  # literal from source
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"  # literal from source
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"  # literal from source
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"  # literal from source
  params: []

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"  # literal from source
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"  # literal from source
  params: []

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Mode (01h=On, 02h=Off)

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Information type (03h=H-sync frequency, 04h=V-sync frequency)

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"  # literal from source
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"  # literal from source
  params: []

- id: lan_mac_address_request
  label: LAN MAC Address Request
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"  # literal from source
  params: []

- id: pip_pbp_request
  label: PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Property (00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"  # literal from source
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Eco mode value (see Appendix "Supplementary Information by Command")

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01-DATA16} 00h {CKS}"
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_pbp_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Property (00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 03h=SUB INPUT 2, 04h=SUB INPUT 3)
    - name: DATA02
      type: integer
      description: Setting value (see source for valid ranges per property)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Setting (00h=OFF, 01h=ON)

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"  # literal from source
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"  # literal from source
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"  # literal from source
  params: []

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal (see Appendix "Supplementary Information by Command")
    - name: DATA02
      type: integer
      description: Setting (00h=DATA01 terminal, 01h=BNC, 02h=COMPUTER)
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby, not_supported]
- id: picture_mute_state
  type: enum
  values: [off, on]
- id: sound_mute_state
  type: enum
  values: [off, on]
- id: onscreen_mute_state
  type: enum
  values: [off, on]
- id: cover_state
  type: enum
  values: [open, closed]
- id: error_status
  type: object
  description: 12-byte error information field from009 Error Status Request
- id: lamp_usage_time_seconds
  type: integer
- id: filter_usage_time_seconds
  type: integer
- id: lamp_remaining_life_percent
  type: integer
- id: carbon_savings
  type: object
  description: Carbon savings in kg + mg
- id: input_signal_type
  type: object
  description: Signal type, content displayed, selection signal type
- id: freeze_state
  type: enum
  values: [off, on]
- id: lens_motion_state
  type: object
  description: Bitfield: memory/zoom/focus/H-shift/V-shift motion flags
- id: mac_address
  type: string
- id: projector_name
  type: string
- id: model_name
  type: string
- id: serial_number
  type: string
```

## Variables
```yaml
<!-- UNRESOLVED: gain parameter values, aspect values, eco mode values, PIP/PBP sub-input values, edge blending settings all reference "Appendix Supplementary Information by Command" which is not included in source -->
```

## Events
```yaml
<!-- UNRESOLVED: source does not document unsolicited notifications -->
```

## Macros
```yaml
<!-- UNRESOLVED: source does not document multi-step sequences -->
```

## Safety
```yaml
confirmation_required_for:
  - power_off # inferred from source: "While this command is turning off the power (including the cooling time), no other command can be accepted"
interlocks: []
<!-- UNRESOLVED: source mentions portrait cover interlock switch in error status DATA09 bit1 ("The interlock switch is open") but does not document procedure or behavior in detail -->
```

## Notes
Serial baud rate list per source: 115200/38400/19200/9600/4800 bps. Spec defaulted to 115200 (highest listed). ID1 (Control ID) and ID2 (Model code) bytes must be substituted per target projector; checksum byte computed as low-order 8 bits of sum of preceding bytes. Source references an Appendix "Supplementary Information by Command" for input terminal codes, aspect values, eco mode values, sub-input values, and base model types — these are not present in this document and marked UNRESOLVED.

<!-- UNRESOLVED: input terminal codes (used in 018 INPUT SW CHANGE, 319-10 AUDIO SELECT SET); aspect ratio codes; eco mode values; PIP/PBP sub-input values; base model type codes -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T08:19:37.838Z
last_checked_at: 2026-09-15T22:16:48.556Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-15T22:16:48.556Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match source commands 1:1 with identical hex payloads and transport values substantiated verbatim. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic NEC projector protocol manual (BDT140013 Rev7.1) covering multiple models; specific NP502HL/NP502WL command set not differentiated in this document."
- "flow control not explicitly stated; D-SUB 9P pinout shows RTS/CTS lines exist but config not stated"
- "gain parameter values, aspect values, eco mode values, PIP/PBP sub-input values, edge blending settings all reference \"Appendix Supplementary Information by Command\" which is not included in source"
- "source does not document unsolicited notifications"
- "source does not document multi-step sequences"
- "source mentions portrait cover interlock switch in error status DATA09 bit1 (\"The interlock switch is open\") but does not document procedure or behavior in detail"
- "input terminal codes (used in 018 INPUT SW CHANGE, 319-10 AUDIO SELECT SET); aspect ratio codes; eco mode values; PIP/PBP sub-input values; base model type codes"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
