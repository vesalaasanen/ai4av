---
spec_id: admin/sharpnec-ld-fa192-f
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld Fa192 F Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld Fa192 F"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld Fa192 F"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:29:04.102Z
last_checked_at: 2026-06-17T20:02:59.579Z
generated_at: 2026-06-17T20:02:59.579Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version not stated. Wireless LAN unit details not in this manual (see operation manual)."
  - "device may emit async notifications but source describes only request/response model."
  - "no power-on sequencing procedure or voltage/current specs in source."
  - "appendix \"Supplementary Information by Command\" referenced for input-terminal, aspect, eco-mode, base-model-type, and sub-input value lists — not present in this refined source excerpt."
  - "ID2 model code value not stated (varies by model)."
  - "control ID (ID1) default value not stated."
  - "wireless LAN unit model compatibility not in this manual."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:02:59.579Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match source hex sequences exactly with correct parameters, and transport settings verified. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld Fa192 F Control Spec

## Summary
Sharp/NEC Ld Fa192 F projector. RS-232C serial + wired/wireless LAN (TCP) control. Binary hex command protocol with checksum byte. 53 documented commands covering power, input switch, mutes, lens control/memory, picture/volume/aspect adjust, status queries, and eco/PIP/edge-blend settings.

<!-- UNRESOLVED: firmware version not stated. Wireless LAN unit details not in this manual (see operation manual). -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps; pick highest
  baud_rates_supported: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # full duplex stated; hardware flow control not specified
addressing:
  port: 7142  # TCP port for LAN command send/receive
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - routable     # inferred: INPUT SW CHANGE command present
  - queryable    # inferred: many status request commands present
  - levelable    # inferred: PICTURE ADJUST, VOLUME ADJUST present
```

## Actions
```yaml
# Command frame format (hex). Request byte1 indicates class:
#   00h=info-query 01h=freeze 02h=basic-action 03h=extended
# Response ack byte1: 20h/21h/22h/23h = success; A0h/A1h/A2h/A3h = error (carries ERR1 ERR2).
# Checksum (CKS) = low-order byte of sum of all preceding bytes (incl. ID1 ID2 in responses).
# Fixed bytes shown verbatim from source; <DATAxx> and <CKS> are parameters/computed fields.
actions:
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
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal value (e.g. 06h = video port). See appendix Supplementary Information by Command for full value list."
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
    command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} - {DATA04} {CKS}"
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
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} - {DATA03} {CKS}"
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
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Aspect value. See appendix Supplementary Information by Command."
  - id: other_adjust_030_15
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} - {DATA05} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target high byte: 96h = LAMP ADJUST / LIGHT ADJUST"
      - name: DATA02
        type: integer
        description: "Adjustment target low byte: FFh (with DATA01=96h)"
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
  - id: filter_usage_info_request_037_3
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
  - id: lamp_info_request_3_037_4
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: integer
        description: "Content: 01h=usage time (s), 04h=remaining life (%)"
  - id: carbon_savings_info_request_037_6
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  - id: remote_key_code_050
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte (WORD type). See key code list: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
      - name: DATA02
        type: integer
        description: "Key code high byte (00h for all listed codes)"
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
    command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Target: 06h=Periphery Focus"
      - name: DATA02
        type: integer
        description: "Content: 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus (continuous), 81h=drive minus (continuous), FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"
  - id: lens_control_request_053_1
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Lens target (see LENS CONTROL targets)"
  - id: lens_control_2_053_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} - {DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Target (FFh=Stop, ignores mode/value)"
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
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
  - id: reference_lens_memory_control_053_4
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
  - id: lens_memory_option_request_053_5
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  - id: lens_memory_option_set_053_6
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: integer
        description: "Setting: 00h=OFF, 01h=ON"
  - id: lens_information_request_053_7
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
  - id: lens_profile_set_053_10
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"
  - id: lens_profile_request_053_11
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
  - id: gain_parameter_request_3_060_1
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Adjusted value name: 00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"
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
    command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "01h=freeze on, 02h=freeze off"
  - id: information_string_request_084
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"
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
  - id: lan_mac_address_request_2_097_155
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
  - id: pip_pbypicture_request_097_198
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  - id: edge_blending_mode_request_097_243_1
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
  - id: eco_mode_set_098_8
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Eco mode value. See appendix Supplementary Information by Command."
  - id: lan_projector_name_set_098_45
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01} - {DATA16} 00h {CKS}"
    params:
      - name: DATA01_DATA16
        type: string
        description: "Projector name (up to 16 bytes), NUL-terminated"
  - id: pip_pbypicture_set_098_198
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: integer
        description: "Setting value (depends on DATA01; MODE: 00h=PIP,01h=PbyP; START POSITION: 00h=TOP-LEFT,01h=TOP-RIGHT,02h=BOTTOM-LEFT,03h=BOTTOM-RIGHT)"
  - id: edge_blending_mode_set_098_243_1
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Setting: 00h=OFF, 01h=ON"
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
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal. See appendix Supplementary Information by Command."
      - name: DATA02
        type: integer
        description: "Setting: 00h=specified terminal, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: command_response_success
    type: ack
    description: "Success response frame: 20h/21h/22h/23h prefix + ID1 ID2 + LEN + data + CKS"
  - id: command_response_error
    type: error
    description: "Error response frame: A0h/A1h/A2h/A3h prefix + ID1 ID2 + 02h + ERR1 ERR2 + CKS. See error code list."
  - id: error_status_bits
    type: bitmask
    description: "DATA01-DATA12 of 009 response. Bit=0 normal, Bit=1 error. Covers cover/fan/temp/power/lamp/interlock errors."
```

## Variables
```yaml
# Settable parameters already represented as action params (PICTURE ADJUST targets,
# VOLUME, ASPECT, ECO MODE, edge blending, PIP, lens memory options). No separate
# variable namespace documented in source.
```

## Events
```yaml
# No unsolicited notifications documented in source.
# UNRESOLVED: device may emit async notifications but source describes only request/response model.
```

## Macros
```yaml
# No multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: "015. POWER ON"
    note: "While turning on power, no other command accepted."
  - command: "016. POWER OFF"
    note: "While turning off (incl. cooling time), no other command accepted."
  - command: "009. ERROR STATUS REQUEST"
    note: "DATA09 bit1 = interlock switch open (safety interlock status bit)."
# UNRESOLVED: no power-on sequencing procedure or voltage/current specs in source.
```

## Notes
Binary hex protocol. Each command/request frame ends with checksum byte. Response has class-byte prefix: `2xh` = success, `Axh` = error (carries ERR1/ERR2). Checksum = low byte of sum of all preceding bytes (responses include ID1+ID2 in sum). Error code table (ERR1/ERR2) covers unrecognized cmd, unsupported by model, invalid value, invalid input, memory errors, forced mute, no signal, power-off rejection, no authority, gain errors. Usage times updated at 1-minute intervals though queried in 1-second units. Lamp remaining life returns negative after replacement deadline exceeded.

<!-- UNRESOLVED: appendix "Supplementary Information by Command" referenced for input-terminal, aspect, eco-mode, base-model-type, and sub-input value lists — not present in this refined source excerpt. -->
<!-- UNRESOLVED: ID2 model code value not stated (varies by model). -->
<!-- UNRESOLVED: control ID (ID1) default value not stated. -->
<!-- UNRESOLVED: wireless LAN unit model compatibility not in this manual. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:29:04.102Z
last_checked_at: 2026-06-17T20:02:59.579Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:02:59.579Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match source hex sequences exactly with correct parameters, and transport settings verified. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version not stated. Wireless LAN unit details not in this manual (see operation manual)."
- "device may emit async notifications but source describes only request/response model."
- "no power-on sequencing procedure or voltage/current specs in source."
- "appendix \"Supplementary Information by Command\" referenced for input-terminal, aspect, eco-mode, base-model-type, and sub-input value lists — not present in this refined source excerpt."
- "ID2 model code value not stated (varies by model)."
- "control ID (ID1) default value not stated."
- "wireless LAN unit model compatibility not in this manual."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
