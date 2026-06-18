---
spec_id: admin/sharp-nec-ld-fe193
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LD FE193 Control Spec"
manufacturer: Sharp/NEC
model_family: "LD FE193"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LD FE193"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:30:13.205Z
last_checked_at: 2026-06-17T20:08:42.490Z
generated_at: 2026-06-17T20:08:42.490Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not state device-specific input terminal value table (cross-references an \"Appendix\" not included). Many DATA enums reference appendix values not present in this document."
  - "enum not in source). Example 06h = video port.\""
  - "enum not in source)\""
  - "sub-input enum not in source)\""
  - "source describes no unsolicited notifications; responses are request/reply only."
  - "source documents no explicit multi-step sequences."
  - "source lists no power-on sequencing procedure or external interlock wiring requirements."
  - "model name \"LD FE193\" taken from user-supplied device name; source doc is a generic \"Projector Control Command Reference Manual\" (BDT140013 Rev 7.1) and does not name the model."
  - "firmware version not stated."
  - "default baud rate not stated; 9600 chosen as conservative placeholder — confirm against device menu."
  - "ID2 model-code value not in source."
  - "Appendix enums for input terminal, eco mode, PIP sub-input not included in source."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:08:42.490Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match literal hex command sequences from BDT140013 Rev 7.1 source; transport parameters verified; complete coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LD FE193 Control Spec

## Summary
Sharp/NEC projector (LD FE193) controlled via RS-232C serial or wired/wireless LAN (TCP port 7142). Binary hex command protocol with leading-byte + trailing checksum framing. Spec covers the full BDT140013 Rev 7.1 command catalogue: power, input select, mute, picture/volume/aspect adjust, lens control & memory, status/usage queries, eco/PIP/edge-blend/audio settings.

<!-- UNRESOLVED: source does not state device-specific input terminal value table (cross-references an "Appendix" not included). Many DATA enums reference appendix values not present in this document. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600   # source lists 115200/38400/19200/9600/4800; default not stated - UNRESOLVED which is default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: full duplex stated, no flow-control field given
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: POWER ON / POWER OFF commands
  - queryable      # inferred: many *REQUEST commands
  - levelable      # inferred: PICTURE ADJUST, VOLUME ADJUST
  - routable       # inferred: INPUT SW CHANGE
```

## Actions
```yaml
actions:
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []

  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal value (see Appendix - UNRESOLVED: enum not in source). Example 06h = video port."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []

  - id: picture_mute_off
    label: "021. PICTURE MUTE OFF"
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: sound_mute_on
    label: "022. SOUND MUTE ON"
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []

  - id: sound_mute_off
    label: "023. SOUND MUTE OFF"
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: onscreen_mute_on
    label: "024. ONSCREEN MUTE ON"
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []

  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h absolute, 01h relative"
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment mode: 00h absolute, 01h relative"
      - name: DATA02
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA03
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Aspect value (see Appendix - UNRESOLVED: enum not in source)"

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target (fixed 96h = LAMP/LIGHT ADJUST per source)"
      - name: DATA02
        type: integer
        description: "Fixed FFh"
      - name: DATA03
        type: integer
        description: "Adjustment mode: 00h absolute, 01h relative"
      - name: DATA04
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA05
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Lamp: 00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: integer
        description: "Content: 01h usage time (s), 04h remaining life (%)"

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h Total, 01h during operation"

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte (WORD key code, see key code list in source)"
      - name: DATA02
        type: integer
        description: "Key code high byte"

  - id: shutter_close
    label: "051. SHUTTER CLOSE"
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: shutter_open
    label: "052. SHUTTER OPEN"
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  - id: lens_control
    label: "053. LENS CONTROL"
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Target: 06h Periphery Focus"
      - name: DATA02
        type: integer
        description: "Content: 00h stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh +continuous, 81h −continuous, FDh −0.25s, FEh −0.5s, FFh −1s"

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target (e.g. 06h Periphery Focus)"

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Target: FFh Stop, else adjustment target"
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h absolute, 02h relative"
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h MOVE, 01h STORE, 02h RESET"

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h MOVE, 01h STORE, 02h RESET"

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
      - name: DATA02
        type: integer
        description: "Setting value: 00h OFF, 01h ON"

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Profile number: 00h Profile 1, 01h Profile 2"

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjusted value: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light Adjust"

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "01h freeze on, 02h freeze off"

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Information type: 03h Horizontal sync freq, 04h Vertical sync freq"

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: lan_mac_address_status_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Eco mode value (see Appendix - UNRESOLVED: enum not in source)"

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
    params:
      - name: DATA01_16
        type: string
        description: "Projector name (up to 16 bytes, NUL-terminated)"

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
      - name: DATA02
        type: integer
        description: "Setting value (see Appendix - UNRESOLVED: sub-input enum not in source)"

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Setting value: 00h OFF, 01h ON"

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal (see Appendix - UNRESOLVED: enum not in source)"
      - name: DATA02
        type: integer
        description: "Setting value: 00h specified terminal, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, standby_sleep, cooling, standby_error]
    # from 078-2 RUNNING STATUS DATA03/DATA06
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
    values: [normal_opened, closed]
  - id: lamp_usage_time_seconds
    type: integer
  - id: filter_usage_time_seconds
    type: integer
  - id: lamp_remaining_life_percent
    type: integer
  - id: error_status
    type: bitmask
    description: "DATA01-12 bitfield per source error information list"
  - id: lens_status
    type: bitmask
    description: "DATA01: bits = lens memory/zoom/focus/shift(h)/(v) operating state"
  - id: command_execution_result
    type: enum
    values: [success, error]
    # response framing: success 2Xh / error A_Xh with ERR1 ERR2
```

## Variables
```yaml
variables:
  - id: brightness
    type: integer
    description: "PICTURE/BRIGHTNESS (030-1 DATA01=00h, 060-1 DATA01=00h)"
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
  - id: lamp_light_adjust
    type: integer
    description: "OTHER ADJUST target 96h"
  - id: projector_name
    type: string
    description: "LAN projector name (up to 16 bytes)"
  - id: eco_mode
    type: integer
    description: "value per Appendix - UNRESOLVED"
```

## Events
```yaml
events: []
# UNRESOLVED: source describes no unsolicited notifications; responses are request/reply only.
```

## Macros
```yaml
macros: []
# UNRESOLVED: source documents no explicit multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - condition: "POWER ON command in progress"
    behavior: "no other command accepted while power is turning on"
  - condition: "POWER OFF command in progress (including cooling time)"
    behavior: "no other command accepted during power-off and cooling"
  - condition: "Error code 02h 0Dh"
    behavior: "command rejected because power is off"
  - condition: "Error code 02h 0Fh"
    behavior: "no authority for operation"
# UNRESOLVED: source lists no power-on sequencing procedure or external interlock wiring requirements.
```

## Notes
- Binary hex framing. Format: `<lead> <cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>`. Lead bytes: `00h`/`01h`/`02h`/`03h` command, `20h`/`21h`/`22h`/`23h` reply (success), `A0h`–`A3h` reply (error).
- Checksum = low-order byte of sum of all preceding bytes.
- `ID1` = projector control ID; `ID2` = model code (varies per model).
- Multiple baud rates supported (115200/38400/19200/9600/4800); default not stated.
- Several commands reference an "Appendix: Supplementary Information by Command" for input-terminal / eco-mode / sub-input value enums — that appendix is not present in this source document.

<!-- UNRESOLVED: model name "LD FE193" taken from user-supplied device name; source doc is a generic "Projector Control Command Reference Manual" (BDT140013 Rev 7.1) and does not name the model. -->
<!-- UNRESOLVED: firmware version not stated. -->
<!-- UNRESOLVED: default baud rate not stated; 9600 chosen as conservative placeholder — confirm against device menu. -->
<!-- UNRESOLVED: ID2 model-code value not in source. -->
<!-- UNRESOLVED: Appendix enums for input terminal, eco mode, PIP sub-input not included in source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:30:13.205Z
last_checked_at: 2026-06-17T20:08:42.490Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:08:42.490Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match literal hex command sequences from BDT140013 Rev 7.1 source; transport parameters verified; complete coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not state device-specific input terminal value table (cross-references an \"Appendix\" not included). Many DATA enums reference appendix values not present in this document."
- "enum not in source). Example 06h = video port.\""
- "enum not in source)\""
- "sub-input enum not in source)\""
- "source describes no unsolicited notifications; responses are request/reply only."
- "source documents no explicit multi-step sequences."
- "source lists no power-on sequencing procedure or external interlock wiring requirements."
- "model name \"LD FE193\" taken from user-supplied device name; source doc is a generic \"Projector Control Command Reference Manual\" (BDT140013 Rev 7.1) and does not name the model."
- "firmware version not stated."
- "default baud rate not stated; 9600 chosen as conservative placeholder — confirm against device menu."
- "ID2 model-code value not in source."
- "Appendix enums for input terminal, eco mode, PIP sub-input not included in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
