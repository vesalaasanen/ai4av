---
spec_id: admin/sharp-nec-p555-pc5
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC P555 Pc5 Control Spec"
manufacturer: Sharp/NEC
model_family: "P555 Pc5"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "P555 Pc5"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:29:42.800Z
last_checked_at: 2026-06-18T09:02:50.529Z
generated_at: 2026-06-18T09:02:50.529Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "model name \"P555 Pc5\" supplied by operator; source manual is generic and does not name the model"
  - "serial flow_control not stated in source"
  - "auth procedure not described anywhere in source; auth.type=none inferred (Tier 2)"
  - "input-terminal value map referenced to an Appendix not included in the refined source"
  - "model name taken from operator-supplied device name; source manual is model-generic"
  - "auth.type=none inferred (no auth procedure described) — Tier 2 inference"
  - "input-terminal, aspect, eco-mode, base-model-type, sub-input value maps referenced to an Appendix not present in refined source"
  - "key code list partially reproduced (050 REMOTE KEY CODE); full code set should be confirmed against source Appendix"
verification:
  verdict: verified
  checked_at: 2026-06-18T09:02:50.529Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC P555 Pc5 Control Spec

## Summary
Sharp/NEC P555 Pc5 large-venue projector. Binary control protocol over RS-232C serial (D-SUB 9P, PC CONTROL port) and wired/wireless LAN (TCP). Commands are hex-framed with a trailing checksum byte. This spec enumerates all commands documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: model name "P555 Pc5" supplied by operator; source manual is generic and does not name the model -->
<!-- UNRESOLVED: serial flow_control not stated in source -->
<!-- UNRESOLVED: auth procedure not described anywhere in source; auth.type=none inferred (Tier 2) -->
<!-- UNRESOLVED: input-terminal value map referenced to an Appendix not included in the refined source -->

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
  - routable
  - queryable
  - levelable
```

## Actions
```yaml
actions:
  - id: error_status_request
    label: 009. ERROR STATUS REQUEST
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []

  - id: power_on
    label: 015. POWER ON
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []

  - id: power_off
    label: 016. POWER OFF
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []

  - id: input_sw_change
    label: 018. INPUT SW CHANGE
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal (see Appendix Supplementary Information by Command; e.g. 06h = video port)"

  - id: picture_mute_on
    label: 020. PICTURE MUTE ON
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []

  - id: picture_mute_off
    label: 021. PICTURE MUTE OFF
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: sound_mute_on
    label: 022. SOUND MUTE ON
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []

  - id: sound_mute_off
    label: 023. SOUND MUTE OFF
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: onscreen_mute_on
    label: 024. ONSCREEN MUTE ON
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []

  - id: onscreen_mute_off
    label: 025. ONSCREEN MUTE OFF
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: 030-1. PICTURE ADJUST
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target (00h=Brightness,01h=Contrast,02h=Color,03h=Hue,04h=Sharpness)"
      - name: DATA02
        type: integer
        description: "Adjustment mode (00h=absolute,01h=relative)"
      - name: DATA03
        type: integer
        description: Adjustment value low-order 8 bits
      - name: DATA04
        type: integer
        description: Adjustment value high-order 8 bits

  - id: volume_adjust
    label: 030-2. VOLUME ADJUST
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment mode (00h=absolute,01h=relative)"
      - name: DATA02
        type: integer
        description: Adjustment value low-order 8 bits
      - name: DATA03
        type: integer
        description: Adjustment value high-order 8 bits

  - id: aspect_adjust
    label: 030-12. ASPECT ADJUST
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Aspect value (see Appendix Supplementary Information by Command)"

  - id: other_adjust
    label: 030-15. OTHER ADJUST
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target high byte (96h=LAMP ADJUST / LIGHT ADJUST)"
      - name: DATA02
        type: integer
        description: "Adjustment target low byte (FFh for LAMP/LIGHT ADJUST)"
      - name: DATA03
        type: integer
        description: "Adjustment mode (00h=absolute,01h=relative)"
      - name: DATA04
        type: integer
        description: Adjustment value low-order 8 bits
      - name: DATA05
        type: integer
        description: Adjustment value high-order 8 bits

  - id: information_request
    label: 037. INFORMATION REQUEST
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []

  - id: filter_usage_information_request
    label: 037-3. FILTER USAGE INFORMATION REQUEST
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []

  - id: lamp_information_request_3
    label: 037-4. LAMP INFORMATION REQUEST 3
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Lamp (00h=Lamp 1,01h=Lamp 2; Lamp 2 only two-lamp models)"
      - name: DATA02
        type: integer
        description: "Content (01h=usage time seconds,04h=remaining life %)"

  - id: carbon_savings_information_request
    label: 037-6. CARBON SAVINGS INFORMATION REQUEST
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Scope (00h=Total,01h=during operation)"

  - id: remote_key_code
    label: 050. REMOTE KEY CODE
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Key code low byte (see Key code list)
      - name: DATA02
        type: integer
        description: Key code high byte

  - id: shutter_close
    label: 051. SHUTTER CLOSE
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: shutter_open
    label: 052. SHUTTER OPEN
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  - id: lens_control
    label: 053. LENS CONTROL
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Lens target (06h=Periphery Focus)"
      - name: DATA02
        type: integer
        description: "Content (00h=Stop,01h=+1s,02h=+0.5s,03h=+0.25s,7Fh=+continuous,81h=-continuous,FDh=-0.25s,FEh=-0.5s,FFh=-1s)"

  - id: lens_control_request
    label: 053-1. LENS CONTROL REQUEST
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Lens target

  - id: lens_control_2
    label: 053-2. LENS CONTROL 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Target (FFh=Stop)"
      - name: DATA02
        type: integer
        description: "Adjustment mode (00h=absolute,02h=relative)"
      - name: DATA03
        type: integer
        description: Adjustment value low-order 8 bits
      - name: DATA04
        type: integer
        description: Adjustment value high-order 8 bits

  - id: lens_memory_control
    label: 053-3. LENS MEMORY CONTROL
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Operation (00h=MOVE,01h=STORE,02h=RESET)"

  - id: reference_lens_memory_control
    label: 053-4. REFERENCE LENS MEMORY CONTROL
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Operation (00h=MOVE,01h=STORE,02h=RESET)"

  - id: lens_memory_option_request
    label: 053-5. LENS MEMORY OPTION REQUEST
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Option (00h=LOAD BY SIGNAL,01h=FORCED MUTE)"

  - id: lens_memory_option_set
    label: 053-6. LENS MEMORY OPTION SET
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Option (00h=LOAD BY SIGNAL,01h=FORCED MUTE)"
      - name: DATA02
        type: integer
        description: "Setting (00h=OFF,01h=ON)"

  - id: lens_information_request
    label: 053-7. LENS INFORMATION REQUEST
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

  - id: lens_profile_set
    label: 053-10. LENS PROFILE SET
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Profile number (00h=Profile 1,01h=Profile 2)"

  - id: lens_profile_request
    label: 053-11. LENS PROFILE REQUEST
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: 060-1. GAIN PARAMETER REQUEST 3
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjusted value name (00h=Brightness,01h=Contrast,02h=Color,03h=Hue,04h=Sharpness,05h=Volume,96h=Lamp/Light Adjust)"

  - id: setting_request
    label: 078-1. SETTING REQUEST
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []

  - id: running_status_request
    label: 078-2. RUNNING STATUS REQUEST
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []

  - id: input_status_request
    label: 078-3. INPUT STATUS REQUEST
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []

  - id: mute_status_request
    label: 078-4. MUTE STATUS REQUEST
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []

  - id: model_name_request
    label: 078-5. MODEL NAME REQUEST
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  - id: cover_status_request
    label: 078-6. COVER STATUS REQUEST
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []

  - id: freeze_control
    label: 079. FREEZE CONTROL
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Freeze (01h=ON,02h=OFF)"

  - id: information_string_request
    label: 084. INFORMATION STRING REQUEST
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Information type (03h=Horizontal sync freq,04h=Vertical sync freq)"

  - id: eco_mode_request
    label: 097-8. ECO MODE REQUEST
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []

  - id: lan_projector_name_request
    label: 097-45. LAN PROJECTOR NAME REQUEST
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: lan_mac_address_status_request2
    label: 097-155. LAN MAC ADDRESS STATUS REQUEST2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_picture_by_picture_request
    label: 097-198. PIP/PICTURE BY PICTURE REQUEST
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Item (00h=MODE,01h=START POSITION,02h=SUB INPUT/SUB INPUT 1,09h=SUB INPUT 2,0Ah=SUB INPUT 3)"

  - id: edge_blending_mode_request
    label: 097-243-1. EDGE BLENDING MODE REQUEST
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set
    label: 098-8. ECO MODE SET
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Eco mode value (see Appendix Supplementary Information by Command)"

  - id: lan_projector_name_set
    label: 098-45. LAN PROJECTOR NAME SET
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
    params:
      - name: DATA
        type: string
        description: Projector name up to 16 bytes (DATA01 - DATA16)

  - id: pip_picture_by_picture_set
    label: 098-198. PIP/PICTURE BY PICTURE SET
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Item (00h=MODE,01h=START POSITION,02h=SUB INPUT/SUB INPUT 1,09h=SUB INPUT 2,0Ah=SUB INPUT 3)"
      - name: DATA02
        type: integer
        description: Setting value dependent on DATA01

  - id: edge_blending_mode_set
    label: 098-243-1. EDGE BLENDING MODE SET
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Setting value (00h=OFF,01h=ON)"

  - id: base_model_type_request
    label: 305-1. BASE MODEL TYPE REQUEST
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []

  - id: serial_number_request
    label: 305-2. SERIAL NUMBER REQUEST
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  - id: basic_information_request
    label: 305-3. BASIC INFORMATION REQUEST
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []

  - id: audio_select_set
    label: 319-10. AUDIO SELECT SET
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal (see Appendix Supplementary Information by Command)"
      - name: DATA02
        type: integer
        description: "Setting value (00h=terminal specified in DATA01,01h=BNC,02h=COMPUTER)"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitmask
    description: "12-byte error status (DATA01-DATA12); bit set to 1 indicates error"
  - id: command_result
    type: enum
    description: "Ack byte; FFh = ended with an error"
  - id: error_code
    type: struct
    description: "ERR1/ERR2 pair per Error code list (section 2.4)"
```

## Variables
```yaml
variables: []
```

## Events
```yaml
events: []
```

## Macros
```yaml
macros: []
```

## Safety
```yaml
confirmation_required_for:
  - power_off
  - shutter_close
interlocks:
  - "Power On: while turning on, no other command accepted"
  - "Power Off: during power-off (incl. cooling time), no other command accepted"
```

## Notes
- Commands use binary hex framing. Each frame ends with a checksum byte (CKS) computed as the low-order 8 bits of the sum of all preceding bytes.
- ID1 = control ID set on projector; ID2 = model code (varies by model).
- Success responses begin with 2xh (where x = command group); error responses begin with Axh carrying ERR1/ERR2.
- Power and mute commands accept no other command during their execution window.
- Full duplex communication mode over serial; TCP port 7142 for LAN.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: model name taken from operator-supplied device name; source manual is model-generic -->
<!-- UNRESOLVED: serial flow_control not stated in source -->
<!-- UNRESOLVED: auth.type=none inferred (no auth procedure described) — Tier 2 inference -->
<!-- UNRESOLVED: input-terminal, aspect, eco-mode, base-model-type, sub-input value maps referenced to an Appendix not present in refined source -->
<!-- UNRESOLVED: key code list partially reproduced (050 REMOTE KEY CODE); full code set should be confirmed against source Appendix -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:29:42.800Z
last_checked_at: 2026-06-18T09:02:50.529Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:02:50.529Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "model name \"P555 Pc5\" supplied by operator; source manual is generic and does not name the model"
- "serial flow_control not stated in source"
- "auth procedure not described anywhere in source; auth.type=none inferred (Tier 2)"
- "input-terminal value map referenced to an Appendix not included in the refined source"
- "model name taken from operator-supplied device name; source manual is model-generic"
- "auth.type=none inferred (no auth procedure described) — Tier 2 inference"
- "input-terminal, aspect, eco-mode, base-model-type, sub-input value maps referenced to an Appendix not present in refined source"
- "key code list partially reproduced (050 REMOTE KEY CODE); full code set should be confirmed against source Appendix"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
