---
spec_id: admin/sharp-nec-pnme432
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC PN-ME432 Projector Control Spec"
manufacturer: Sharp/NEC
model_family: PN-ME432
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - PN-ME432
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:57:14.032Z
last_checked_at: 2026-06-18T09:11:46.526Z
generated_at: 2026-06-18T09:11:46.526Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated. Control ID (ID1) and model code (ID2) runtime values not stated. Input terminal / aspect / eco-mode value tables referenced as \"Supplementary Information by Command\" appendix not present in this source."
  - "source lists 115200/38400/19200/9600/4800 bps as supported but states no default"
  - "source states \"Full duplex\" communication mode but no flow-control setting; inferred none"
  - "absolute min/max numeric ranges not stated in source (device-dependent)."
  - "no explicit safety interlock procedures or power-on sequencing requirements"
  - "firmware version compatibility not stated."
  - "control ID (ID1) and model code (ID2) runtime values not stated."
  - "default baud rate not stated (5 supported rates listed)."
  - "input-terminal / aspect / eco-mode / base-model-type enum tables live in a missing appendix."
  - "flow-control setting not explicitly stated (only \"Full duplex\")."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:11:46.526Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC PN-ME432 Projector Control Spec

## Summary
Sharp/NEC projector (PN-ME432) controlled via a binary/hex command protocol over RS-232C serial (PC CONTROL D-SUB 9P) or wired/wireless LAN (TCP port 7142). Commands are framed as hexadecimal byte sequences with a trailing checksum byte. This spec covers the 53 documented control commands (power, input switch, mute, picture/volume/lens adjust, lens memory, shutter, freeze, eco mode, PIP/PbP, edge blending, and a broad set of status/error/information queries).

<!-- UNRESOLVED: firmware version compatibility not stated. Control ID (ID1) and model code (ID2) runtime values not stated. Input terminal / aspect / eco-mode value tables referenced as "Supplementary Information by Command" appendix not present in this source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: null  # UNRESOLVED: source lists 115200/38400/19200/9600/4800 bps as supported but states no default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode but no flow-control setting; inferred none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - routable     # inferred: INPUT SW CHANGE + AUDIO SELECT SET present
  - levelable    # inferred: PICTURE ADJUST / VOLUME ADJUST / LENS CONTROL present
  - queryable    # inferred: many *REQUEST commands return values
```

## Actions
```yaml
- id: error_status_request_009
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
- id: power_on_015
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
- id: power_off_016
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
- id: input_sw_change_018
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value (e.g. 06h = Video port). Full value list in 'Supplementary Information by Command' appendix."
- id: picture_mute_on_020
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
- id: picture_mute_off_021
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []
- id: sound_mute_on_022
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
- id: sound_mute_off_023
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []
- id: onscreen_mute_on_024
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
- id: onscreen_mute_off_025
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []
- id: picture_adjust_030_1
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
- id: volume_adjust_030_2
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"
- id: aspect_adjust_030_12
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value. Full value list in 'Supplementary Information by Command' appendix."
- id: other_adjust_030_15
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 96h=LAMP ADJUST / LIGHT ADJUST (only documented value)"
    - name: DATA02
      type: integer
      description: "FFh (fixed, paired with 96h target)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"
- id: information_request_037
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
- id: filter_usage_information_request_037_3
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
- id: lamp_information_request_037_4
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"
- id: carbon_savings_information_request_037_6
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
- id: remote_key_code_050
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (see key code list; e.g. 05h=AUTO, 29h=PICTURE, 4Bh=COMPUTER1)"
    - name: DATA02
      type: integer
      description: "Key code high byte (00h for all listed keys)"
- id: shutter_close_051
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []
- id: shutter_open_052
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []
- id: lens_control_053
  label: "053. LENS CONTROL"
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target; 06h=Periphery Focus (documented value)"
    - name: DATA02
      type: integer
      description: "Drive content: 00h=Stop, 01h/02h/03h=plus 1s/0.5s/0.25s, 7Fh=plus continuous, 81h=minus continuous, FDh/FEh/FFh=minus 0.25s/0.5s/1s"
- id: lens_control_request_053_1
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (same set as 053 LENS CONTROL)"
- id: lens_control_2_053_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target; FFh=Stop"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
- id: lens_memory_control_053_3
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
- id: reference_lens_memory_control_053_4
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET (applies to profile set via 053-10)"
- id: lens_memory_option_request_053_5
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
- id: lens_memory_option_set_053_6
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"
- id: lens_information_request_053_7
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
- id: lens_profile_set_053_10
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"
- id: lens_profile_request_053_11
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
- id: gain_parameter_request_060_1
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
- id: setting_request_078_1
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
- id: running_status_request_078_2
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
- id: input_status_request_078_3
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
- id: mute_status_request_078_4
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
- id: model_name_request_078_5
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
- id: cover_status_request_078_6
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
- id: freeze_control_079
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"
- id: information_string_request_084
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
- id: eco_mode_request_097_8
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
- id: lan_projector_name_request_097_45
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
- id: lan_mac_address_status_request_097_155
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
- id: pip_picture_by_picture_request_097_198
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
- id: edge_blending_mode_request_097_243_1
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
- id: eco_mode_set_098_8
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Eco-mode value. Full value list in 'Supplementary Information by Command' appendix."
- id: lan_projector_name_set_098_45
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA16> 00h <CKS>"
  params:
    - name: DATA01_DATA16
      type: string
      description: "Projector name, up to 16 bytes (DATA01-DATA16), NUL-terminated"
- id: pip_picture_by_picture_set_098_198
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (varies by DATA01; sub-input values in appendix)"
- id: edge_blending_mode_set_098_243_1
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=OFF, 01h=ON"
- id: base_model_type_request_305_1
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
- id: serial_number_request_305_2
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
- id: basic_information_request_305_3
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
- id: audio_select_set_319_10
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal (value list in 'Supplementary Information by Command' appendix)"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Responses are framed: A<h>/2<h> <ID1> <ID2> <LEN> <ERR1> <ERR2> <CKS> (error) or
# 2<h>/2<h> <ID1> <ID2> <LEN> <DATA...> <CKS> (success). Each query action above has
# a matching response documented in the source. Enumerate key observable states:
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 RUNNING STATUS DATA03/DATA06; 305-3 DATA01"
- id: error_status
  type: bitmask
  description: "12-byte error info from 009 ERROR STATUS REQUEST (DATA01-DATA12)"
- id: lamp_usage_time_seconds
  type: integer
  source: "037-4 LAMP INFORMATION REQUEST 3 (DATA03-06)"
- id: lamp_remaining_life_percent
  type: integer
  source: "037-4 LAMP INFORMATION REQUEST 3 (DATA03-06)"
- id: filter_usage_time_seconds
  type: integer
  source: "037-3 FILTER USAGE INFORMATION REQUEST (DATA01-04)"
- id: execution_result
  type: enum
  values: [success, error]
  description: "0000h = success; other = error. Used by 030-1/030-2/030-12/030-15 adjust commands."
```

## Variables
```yaml
# Adjustment ranges returned dynamically by 060-1 GAIN PARAMETER REQUEST 3:
# picture (brightness/contrast/color/hue/sharpness), volume, lamp/light adjust.
# Each has upper/lower limit, default, current, wide/narrow step. Treat as runtime-queried
# variables rather than fixed specs.
# UNRESOLVED: absolute min/max numeric ranges not stated in source (device-dependent).
```

## Events
```yaml
# Source describes no unsolicited notifications / push events. All data is request/response.
```

## Macros
```yaml
# Source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON: while turning on, no other command accepted."
  - "POWER OFF: while turning off (incl. cooling time), no other command accepted."
# UNRESOLVED: no explicit safety interlock procedures or power-on sequencing requirements
# beyond the power-command lockout notes above.
```

## Notes
- All commands/responses are hexadecimal byte frames, NOT ASCII strings. A trailing `<CKS>` checksum byte is required on every frame. Checksum = low-order byte of the sum of all preceding bytes. Example: `20h 81h 01h 60h 01h 00h` → sum `103h` → checksum `03h`.
- Frames carry `<ID1>` (control ID set on projector) and `<ID2>` (model code, model-dependent) after the second byte. Runtime values not given in source.
- LAN: TCP port **7142**. Serial: RS-232C, D-SUB 9P cross cable, PC CONTROL port. Pin assignment documented (pin2 RxD, pin3 TxD, pin5 GND, pin7 RTS, pin8 CTS).
- Error responses use `<ERR1> <ERR2>` code pairs (e.g. `00h 00h` = unrecognized command, `02h 0Dh` = power off, `02h 0Fh` = no authority). Full error table in source §2.4.
- Several commands reference an "Appendix: Supplementary Information by Command" for input-terminal, aspect, eco-mode, and base-model-type value tables. That appendix is **not present** in this refined source, so those enum spaces are left unresolved.

<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: control ID (ID1) and model code (ID2) runtime values not stated. -->
<!-- UNRESOLVED: default baud rate not stated (5 supported rates listed). -->
<!-- UNRESOLVED: input-terminal / aspect / eco-mode / base-model-type enum tables live in a missing appendix. -->
<!-- UNRESOLVED: flow-control setting not explicitly stated (only "Full duplex"). -->
````

53 commands cataloged. Serial+TCP. Draft/low. No values invented.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:57:14.032Z
last_checked_at: 2026-06-18T09:11:46.526Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:11:46.526Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated. Control ID (ID1) and model code (ID2) runtime values not stated. Input terminal / aspect / eco-mode value tables referenced as \"Supplementary Information by Command\" appendix not present in this source."
- "source lists 115200/38400/19200/9600/4800 bps as supported but states no default"
- "source states \"Full duplex\" communication mode but no flow-control setting; inferred none"
- "absolute min/max numeric ranges not stated in source (device-dependent)."
- "no explicit safety interlock procedures or power-on sequencing requirements"
- "firmware version compatibility not stated."
- "control ID (ID1) and model code (ID2) runtime values not stated."
- "default baud rate not stated (5 supported rates listed)."
- "input-terminal / aspect / eco-mode / base-model-type enum tables live in a missing appendix."
- "flow-control setting not explicitly stated (only \"Full duplex\")."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
