---
spec_id: admin/sharp-nec-np-m323x
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP M323X Control Spec"
manufacturer: Sharp/NEC
model_family: "NP M323X"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP M323X"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:49:44.808Z
last_checked_at: 2026-06-18T08:34:45.538Z
generated_at: 2026-06-18T08:34:45.538Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Per-input-terminal value tables (input terminal codes, eco mode values, aspect values, sub-input values, base model types) referenced as \"see Appendix Supplementary Information by Command\" but the appendix is not present in this refined excerpt."
  - "flow control not explicitly stated (RTS/CTS pins present on D-SUB 9P)"
  - "numeric ranges for volume/picture adjust default and bounds require device query."
  - "populate if device pushes async events (none described in source)."
  - "populate if source describes macros (none present)."
  - "source notes POWER ON/OFF lock out other commands during power transition"
  - "Appendix \"Supplementary Information by Command\" not present in this refined excerpt — input-terminal codes, eco mode values, aspect values, sub-input values, base model type codes, and selection signal type details are referenced but not enumerated."
  - "flow_control not explicitly stated."
  - "firmware version compatibility not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:34:45.538Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP M323X Control Spec

## Summary
Sharp/NEC NP M323X projector control spec covering RS-232C serial and TCP/IP (LAN) control. The device exposes a binary command protocol with hex-framed payloads (header byte + body + checksum) documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1). Commands cover power, input switching, mute, picture/volume/aspect adjust, lens control and memory, status queries, eco mode, PIP/PbP, edge blending, and audio select.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Per-input-terminal value tables (input terminal codes, eco mode values, aspect values, sub-input values, base model types) referenced as "see Appendix Supplementary Information by Command" but the appendix is not present in this refined excerpt. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source supports 115200/38400/19200/9600/4800 bps; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated (RTS/CTS pins present on D-SUB 9P)
addressing:
  port: 7142  # TCP port stated for LAN command send/receive
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       # inferred: POWER ON / POWER OFF commands present
# - queryable       # inferred: many status/information request commands present
# - levelable       # inferred: VOLUME ADJUST / PICTURE ADJUST present
# - routable        # inferred: INPUT SW CHANGE present
```

## Actions
```yaml
# Command framing: commands are hex byte sequences. Many use header byte (02h/03h/00h/01h)
# followed by body and a trailing checksum (CKS) computed as low byte of sum of all
# preceding bytes. ID1=Control ID, ID2=Model code (projector-assigned). Parameterized
# DATA fields shown as {DATAxx}. Computed CKS shown as {CKS} where source shows <CKS>.
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
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Input terminal code (e.g. 06h = video port). See Appendix.
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
      description: Adjustment target (00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness)
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
      description: Value set for the aspect. See Appendix.
- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target high byte (96h = LAMP ADJUST / LIGHT ADJUST)
    - name: DATA02
      type: integer
      description: Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)
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
      description: Lamp selector (00h Lamp 1, 01h Lamp 2)
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
      description: Content (00h Total Carbon Savings, 01h Carbon Savings during operation)
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Key code low byte (see Key code list)
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
      description: Adjustment target (06h Periphery Focus)
    - name: DATA02
      type: integer
      description: Drive (00h stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh plus, 81h minus, FDh -0.25s, FEh -0.5s, FFh -1s)
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target
- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Target (FFh Stop)
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
      description: Operation (00h MOVE, 01h STORE, 02h RESET)
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Operation (00h MOVE, 01h STORE, 02h RESET)
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
      description: Setting value (00h OFF, 01h ON)
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
      description: Profile number (00h Profile 1, 01h Profile 2)
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
      description: Adjusted value name (00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light Adjust)
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
      description: Freeze state (01h on, 02h off)
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Information type (03h Horizontal sync freq, 04h Vertical sync freq)
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
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Item (00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3)
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
      description: Value set for the eco mode. See Appendix.
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {DATA06} {DATA07} {DATA08} {DATA09} {DATA10} {DATA11} {DATA12} {DATA13} {DATA14} {DATA15} {DATA16} 00h {CKS}"
  params:
    - name: DATA01-16
      type: string
      description: Projector name (up to 16 bytes, NUL terminated)
- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Item (00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3)
    - name: DATA02
      type: integer
      description: Setting value (varies by item). See Appendix.
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Setting value (00h OFF, 01h ON)
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
      description: Input terminal. See Appendix.
    - name: DATA02
      type: integer
      description: Setting value (00h terminal specified in DATA01, 01h BNC, 02h COMPUTER)
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  # from RUNNING STATUS REQUEST DATA06 / BASIC INFORMATION REQUEST DATA01
- id: error_status
  type: bitmask
  description: 12-byte error information from ERROR STATUS REQUEST (cover/fan/temp/lamp/interlock bits)
- id: mute_status
  type: composite
  description: Picture/Sound/Onscreen/Forced-onscreen mute states from MUTE STATUS REQUEST
- id: cover_status
  type: enum
  values: [normal_opened, closed]
- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
```

## Variables
```yaml
# Settable parameters handled as parameterized Actions (volume, picture, aspect, eco mode,
# lens position, projector name, PIP/PbP, edge blending, audio select). No additional
# standalone variables required.
# UNRESOLVED: numeric ranges for volume/picture adjust default and bounds require device query.
```

## Events
```yaml
# Source documents no unsolicited notifications. Responses are solicited only.
# UNRESOLVED: populate if device pushes async events (none described in source).
```

## Macros
```yaml
# Source documents no explicit multi-step command sequences.
# UNRESOLVED: populate if source describes macros (none present).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source notes POWER ON/OFF lock out other commands during power transition
# and cooling, and interlock-switch status is exposed via ERROR STATUS DATA09 Bit1, but no
# explicit safety procedure or power-on sequencing requirement is documented in this excerpt.
```

## Notes
- Command framing is hex byte sequences with a trailing checksum (CKS) = low byte of sum of all preceding bytes. Example from source: `20h 81h 01h 60h 01h 00h` → sum `103h` → CKS `03h`.
- Responses use distinct header bytes by command class: `A0h/A1h/A2h/A3h` (error/ack) and `20h/21h/22h/23h` (success with optional data). Error responses carry `<ERR1> <ERR2>` codes per the error code list (e.g. `02h 0Dh` = "command cannot be accepted because the power is off").
- ID1 (Control ID) and ID2 (Model code) are projector-assigned and must be obtained from the device; not stated in source.
- Baud rate is selectable among 115200/38400/19200/9600/4800; the active value is configured on the projector. Default not stated.
- LAN control uses TCP port 7142 for both send and receive.
- Key code list (REMOTE KEY CODE) maps WORD key codes (e.g. 02h/00h POWER ON, 05h/00h AUTO, 84h/00h VOLUME UP) — full table in source §3.19.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not present in this refined excerpt — input-terminal codes, eco mode values, aspect values, sub-input values, base model type codes, and selection signal type details are referenced but not enumerated. -->
<!-- UNRESOLVED: flow_control not explicitly stated. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:49:44.808Z
last_checked_at: 2026-06-18T08:34:45.538Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:34:45.538Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Per-input-terminal value tables (input terminal codes, eco mode values, aspect values, sub-input values, base model types) referenced as \"see Appendix Supplementary Information by Command\" but the appendix is not present in this refined excerpt."
- "flow control not explicitly stated (RTS/CTS pins present on D-SUB 9P)"
- "numeric ranges for volume/picture adjust default and bounds require device query."
- "populate if device pushes async events (none described in source)."
- "populate if source describes macros (none present)."
- "source notes POWER ON/OFF lock out other commands during power transition"
- "Appendix \"Supplementary Information by Command\" not present in this refined excerpt — input-terminal codes, eco mode values, aspect values, sub-input values, base model type codes, and selection signal type details are referenced but not enumerated."
- "flow_control not explicitly stated."
- "firmware version compatibility not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
