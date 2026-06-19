---
spec_id: admin/sharp-nec-un552s
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC UN552S Control Spec"
manufacturer: Sharp/NEC
model_family: UN552S
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - UN552S
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:16:35.536Z
last_checked_at: 2026-06-18T09:12:56.197Z
generated_at: 2026-06-18T09:12:56.197Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The source is a generic projector command reference; model-specific coverage (e.g. which input terminals, aspect values, eco-mode values, sub-input values, base-model types apply to the UN552S) is referenced in an \"Appendix: Supplementary Information by Command\" that is not included in the refined source text."
  - "firmware version compatibility not stated in source."
  - "default baud rate not stated (multiple supported rates listed)."
  - "flow control not stated (source lists only \"Full duplex\" communication mode)"
  - "no unsolicited events documented in source"
  - "no macros documented in source"
  - "source contains no explicit safety interlock procedures or"
  - "Appendix \"Supplementary Information by Command\" is not in the refined source — input terminal values, aspect values, eco-mode values, PIP/PbP sub-input values, and base-model-type values could not be enumerated."
  - "default baud rate not stated (five rates supported: 115200/38400/19200/9600/4800)."
  - "flow control not stated (full-duplex mode only)."
  - "firmware version compatibility not stated."
  - "ID1 (control ID) and ID2 (model code) default values for the UN552S not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:12:56.197Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC UN552S Control Spec

## Summary
Control spec for the Sharp/NEC UN552S, derived from the Projector Control Command Reference Manual (BDT140013 Revision 7.1). The device is controllable via RS-232C serial and over a wired/wireless LAN using TCP port 7142, using a binary command protocol with hex payloads and a trailing checksum byte. The catalogue covers power, input switching, mute, picture/volume/aspect/gain adjustment, lens and lens-memory control, shutter, freeze, status queries, eco/edge-blending/PIP/PbP configuration, and identity/information requests.

<!-- UNRESOLVED: The source is a generic projector command reference; model-specific coverage (e.g. which input terminals, aspect values, eco-mode values, sub-input values, base-model types apply to the UN552S) is referenced in an "Appendix: Supplementary Information by Command" that is not included in the refined source text. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: default baud rate not stated (multiple supported rates listed). -->

## Transport
```yaml
# Binary protocol. Commands/responses are hexadecimal byte sequences.
# Frame: <header> <ID1> <ID2> <LEN> <DATA...> <CKS>
# ID1 = projector control ID, ID2 = model code (both device-assigned).
# CKS (checksum) = low-order byte of the sum of all preceding bytes.
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands"
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # all rates listed in source; no single default stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated (source lists only "Full duplex" communication mode)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable   (POWER ON / POWER OFF commands present)
# - queryable   (many *REQUEST commands returning state present)
# - levelable   (VOLUME ADJUST, PICTURE ADJUST gain controls present)
traits:
  - powerable
  - queryable
  - levelable
```

## Actions
```yaml
# All payloads are hex byte sequences, verbatim from the source.
# Fixed commands include the trailing checksum byte (last byte).
# Parameterized commands show the variable DATA bytes and <CKS> (computed).
# kind: query => command returns data in the response (see Feedbacks).
#
# NOTE: Several parameter value lists (input terminals, aspect values,
# eco-mode values, PIP/PbP sub-input values, base-model types) are defined in
# the source's "Appendix: Supplementary Information by Command", which is NOT
# present in the refined source text - those enums are marked UNRESOLVED.

actions:
  # --- 009. ERROR STATUS REQUEST ---
  - id: error_status_request
    label: "009. Error Status Request"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []

  # --- 015. POWER ON ---
  - id: power_on
    label: "015. Power On"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []

  # --- 016. POWER OFF ---
  - id: power_off
    label: "016. Power Off"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []

  # --- 018. INPUT SW CHANGE ---
  - id: input_sw_change
    label: "018. Input SW Change"
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "Input terminal byte (e.g. 06h = video port). Full value list UNRESOLVED - defined in source Appendix not included here."

  # --- 020. PICTURE MUTE ON ---
  - id: picture_mute_on
    label: "020. Picture Mute On"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []

  # --- 021. PICTURE MUTE OFF ---
  - id: picture_mute_off
    label: "021. Picture Mute Off"
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  # --- 022. SOUND MUTE ON ---
  - id: sound_mute_on
    label: "022. Sound Mute On"
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []

  # --- 023. SOUND MUTE OFF ---
  - id: sound_mute_off
    label: "023. Sound Mute Off"
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  # --- 024. ONSCREEN MUTE ON ---
  - id: onscreen_mute_on
    label: "024. Onscreen Mute On"
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []

  # --- 025. ONSCREEN MUTE OFF ---
  - id: onscreen_mute_off
    label: "025. Onscreen Mute Off"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  # --- 030-1. PICTURE ADJUST ---
  - id: picture_adjust
    label: "030-1. Picture Adjust"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: data01
        type: string
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: data02
        type: string
        description: "Adjustment mode: 00h=absolute value, 01h=relative value"
      - name: data03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  # --- 030-2. VOLUME ADJUST ---
  - id: volume_adjust
    label: "030-2. Volume Adjust"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: data01
        type: string
        description: "Adjustment mode: 00h=absolute value, 01h=relative value"
      - name: data02
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data03
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  # --- 030-12. ASPECT ADJUST ---
  - id: aspect_adjust
    label: "030-12. Aspect Adjust"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: data01
        type: string
        description: "Aspect value. Full value list UNRESOLVED - defined in source Appendix not included here."

  # --- 030-15. OTHER ADJUST ---
  - id: other_adjust
    label: "030-15. Other Adjust (Lamp/Light Adjust)"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: data01
        type: string
        description: "Target high byte (96h for LAMP ADJUST / LIGHT ADJUST)"
      - name: data02
        type: string
        description: "Target low byte (FFh for LAMP ADJUST / LIGHT ADJUST)"
      - name: data03
        type: string
        description: "Adjustment mode: 00h=absolute value, 01h=relative value"
      - name: data04
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data05
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  # --- 037. INFORMATION REQUEST ---
  - id: information_request
    label: "037. Information Request"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []

  # --- 037-3. FILTER USAGE INFORMATION REQUEST ---
  - id: filter_usage_information_request
    label: "037-3. Filter Usage Information Request"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []

  # --- 037-4. LAMP INFORMATION REQUEST 3 ---
  - id: lamp_information_request_3
    label: "037-4. Lamp Information Request 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: string
        description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: data02
        type: string
        description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

  # --- 037-6. CARBON SAVINGS INFORMATION REQUEST ---
  - id: carbon_savings_information_request
    label: "037-6. Carbon Savings Information Request"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  # --- 050. REMOTE KEY CODE ---
  - id: remote_key_code
    label: "050. Remote Key Code"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: string
        description: "Key code low byte (WORD key code). Documented codes: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
      - name: data02
        type: string
        description: "Key code high byte (00h for all documented codes)"

  # --- 051. SHUTTER CLOSE ---
  - id: shutter_close
    label: "051. Shutter Close"
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  # --- 052. SHUTTER OPEN ---
  - id: shutter_open
    label: "052. Shutter Open"
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  # --- 053. LENS CONTROL ---
  - id: lens_control
    label: "053. Lens Control"
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: string
        description: "Lens axis/target (e.g. 06h=Periphery Focus)"
      - name: data02
        type: string
        description: "Drive content: 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"

  # --- 053-1. LENS CONTROL REQUEST ---
  - id: lens_control_request
    label: "053-1. Lens Control Request"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: data01
        type: string
        description: "Lens axis/target to read"

  # --- 053-2. LENS CONTROL 2 ---
  - id: lens_control_2
    label: "053-2. Lens Control 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: data01
        type: string
        description: "Lens axis/target (FFh=Stop)"
      - name: data02
        type: string
        description: "Adjustment mode: 00h=absolute value, 02h=relative value"
      - name: data03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  # --- 053-3. LENS MEMORY CONTROL ---
  - id: lens_memory_control
    label: "053-3. Lens Memory Control"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  # --- 053-4. REFERENCE LENS MEMORY CONTROL ---
  - id: reference_lens_memory_control
    label: "053-4. Reference Lens Memory Control"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  # --- 053-5. LENS MEMORY OPTION REQUEST ---
  - id: lens_memory_option_request
    label: "053-5. Lens Memory Option Request"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  # --- 053-6. LENS MEMORY OPTION SET ---
  - id: lens_memory_option_set
    label: "053-6. Lens Memory Option Set"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: data02
        type: string
        description: "Setting value: 00h=OFF, 01h=ON"

  # --- 053-7. LENS INFORMATION REQUEST ---
  - id: lens_information_request
    label: "053-7. Lens Information Request"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

  # --- 053-10. LENS PROFILE SET ---
  - id: lens_profile_set
    label: "053-10. Lens Profile Set"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  # --- 053-11. LENS PROFILE REQUEST ---
  - id: lens_profile_request
    label: "053-11. Lens Profile Request"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  # --- 060-1. GAIN PARAMETER REQUEST 3 ---
  - id: gain_parameter_request_3
    label: "060-1. Gain Parameter Request 3"
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: data01
        type: string
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

  # --- 078-1. SETTING REQUEST ---
  - id: setting_request
    label: "078-1. Setting Request"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []

  # --- 078-2. RUNNING STATUS REQUEST ---
  - id: running_status_request
    label: "078-2. Running Status Request"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []

  # --- 078-3. INPUT STATUS REQUEST ---
  - id: input_status_request
    label: "078-3. Input Status Request"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []

  # --- 078-4. MUTE STATUS REQUEST ---
  - id: mute_status_request
    label: "078-4. Mute Status Request"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []

  # --- 078-5. MODEL NAME REQUEST ---
  - id: model_name_request
    label: "078-5. Model Name Request"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  # --- 078-6. COVER STATUS REQUEST ---
  - id: cover_status_request
    label: "078-6. Cover Status Request"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []

  # --- 079. FREEZE CONTROL ---
  - id: freeze_control
    label: "079. Freeze Control"
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "01h=freeze on, 02h=freeze off"

  # --- 084. INFORMATION STRING REQUEST ---
  - id: information_string_request
    label: "084. Information String Request"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: data01
        type: string
        description: "Information type: 03h=horizontal sync frequency, 04h=vertical sync frequency"

  # --- 097-8. ECO MODE REQUEST ---
  - id: eco_mode_request
    label: "097-8. Eco Mode Request"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []

  # --- 097-45. LAN PROJECTOR NAME REQUEST ---
  - id: lan_projector_name_request
    label: "097-45. LAN Projector Name Request"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  # --- 097-155. LAN MAC ADDRESS STATUS REQUEST2 ---
  - id: lan_mac_address_status_request_2
    label: "097-155. LAN MAC Address Status Request 2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  # --- 097-198. PIP/PICTURE BY PICTURE REQUEST ---
  - id: pip_picture_by_picture_request
    label: "097-198. PIP/Picture by Picture Request"
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  # --- 097-243-1. EDGE BLENDING MODE REQUEST ---
  - id: edge_blending_mode_request
    label: "097-243-1. Edge Blending Mode Request"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  # --- 098-8. ECO MODE SET ---
  - id: eco_mode_set
    label: "098-8. Eco Mode Set"
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "Eco-mode value. Full value list UNRESOLVED - defined in source Appendix not included here."

  # --- 098-45. LAN PROJECTOR NAME SET ---
  - id: lan_projector_name_set
    label: "098-45. LAN Projector Name Set"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
    params:
      - name: name
        type: string
        description: "Projector name, up to 16 bytes (DATA01-DATA16), NUL-terminated"

  # --- 098-198. PIP/PICTURE BY PICTURE SET ---
  - id: pip_picture_by_picture_set
    label: "098-198. PIP/Picture by Picture Set"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: data02
        type: string
        description: "Setting value (MODE: 00h=PIP,01h=PbP; START POSITION: 00h=TL,01h=TR,02h=BL,03h=BR; sub-input values UNRESOLVED per Appendix)"

  # --- 098-243-1. EDGE BLENDING MODE SET ---
  - id: edge_blending_mode_set
    label: "098-243-1. Edge Blending Mode Set"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "Setting value: 00h=OFF, 01h=ON"

  # --- 305-1. BASE MODEL TYPE REQUEST ---
  - id: base_model_type_request
    label: "305-1. Base Model Type Request"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []

  # --- 305-2. SERIAL NUMBER REQUEST ---
  - id: serial_number_request
    label: "305-2. Serial Number Request"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  # --- 305-3. BASIC INFORMATION REQUEST ---
  - id: basic_information_request
    label: "305-3. Basic Information Request"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []

  # --- 319-10. AUDIO SELECT SET ---
  - id: audio_select_set
    label: "319-10. Audio Select Set"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: string
        description: "Input terminal. Full value list UNRESOLVED - defined in source Appendix not included here."
      - name: data02
        type: string
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Observable states returned by the query (kind: query) commands above.
feedbacks:
  - id: error_status
    type: bitmask
    description: "12-byte error bitmap returned by 009 ERROR STATUS REQUEST (bit=1 => error)"

  - id: power_status
    type: enum
    values: [standby, power_on]
    description: "From 078-2 RUNNING STATUS REQUEST DATA03: 00h=Standby, 01h=Power on"

  - id: cooling_process
    type: enum
    values: [not_executed, during_execution]
    description: "From 078-2 DATA04"

  - id: power_on_off_process
    type: enum
    values: [not_executed, during_execution]
    description: "From 078-2 DATA05"

  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    description: "From 078-2 DATA06 / 305-3 DATA01"

  - id: picture_mute
    type: enum
    values: [off, on]
    description: "From 078-4 MUTE STATUS REQUEST DATA01"

  - id: sound_mute
    type: enum
    values: [off, on]
    description: "From 078-4 DATA02"

  - id: onscreen_mute
    type: enum
    values: [off, on]
    description: "From 078-4 DATA03"

  - id: input_signal_status
    type: object
    description: "Signal switch process, signal list number, signal types, test pattern, displayed content from 078-3 INPUT STATUS REQUEST"

  - id: cover_status
    type: enum
    values: [normal_open, closed]
    description: "From 078-6 COVER STATUS REQUEST DATA01: 00h=Normal (open), 01h=Cover closed"

  - id: lamp_usage_time
    type: integer
    unit: seconds
    description: "From 037 INFORMATION REQUEST (DATA83-86) / 037-4 LAMP INFORMATION REQUEST 3. Updated at 1-minute intervals."

  - id: lamp_remaining_life
    type: integer
    unit: percent
    description: "From 037-4. Negative if lamp replacement deadline exceeded."

  - id: filter_usage_time
    type: integer
    unit: seconds
    description: "From 037-3 FILTER USAGE INFORMATION REQUEST (DATA01-04)"

  - id: carbon_savings
    type: object
    description: "Total / operation Carbon Savings (kg + mg) from 037-6"

  - id: lens_status
    type: bitmask
    description: "Lens operation bits (memory/zoom/focus/shift H/shift V) from 053-7 LENS INFORMATION REQUEST"

  - id: eco_mode
    type: string
    description: "From 097-8 ECO MODE REQUEST. Enum values UNRESOLVED - defined in source Appendix."

  - id: projector_name
    type: string
    description: "From 097-45 LAN PROJECTOR NAME REQUEST"

  - id: mac_address
    type: string
    description: "6-byte MAC address from 097-155"

  - id: edge_blending_mode
    type: enum
    values: [off, on]
    description: "From 097-243-1"

  - id: model_name
    type: string
    description: "From 078-5 MODEL NAME REQUEST"

  - id: serial_number
    type: string
    description: "From 305-2 SERIAL NUMBER REQUEST"

  - id: base_model_type
    type: object
    description: "From 305-1. Base model type enum values UNRESOLVED - defined in source Appendix."

  - id: sync_frequencies
    type: object
    description: "Horizontal/vertical sync frequency strings from 084 INFORMATION STRING REQUEST"

  - id: gain_parameter
    type: object
    description: "Adjustment range/default/current value block from 060-1 GAIN PARAMETER REQUEST 3"
```

## Variables
```yaml
# Settable scalar parameters exposed via adjust commands (companion to Actions).
variables:
  - id: volume
    type: integer
    description: "Audio volume, set via 030-2 VOLUME ADJUST (absolute/relative)"

  - id: brightness
    type: integer
    description: "Picture brightness, set via 030-1 PICTURE ADJUST (target 00h)"

  - id: contrast
    type: integer
    description: "Picture contrast, set via 030-1 (target 01h)"

  - id: color
    type: integer
    description: "Picture color, set via 030-1 (target 02h)"

  - id: hue
    type: integer
    description: "Picture hue, set via 030-1 (target 03h)"

  - id: sharpness
    type: integer
    description: "Picture sharpness, set via 030-1 (target 04h)"

  - id: lamp_light_adjust
    type: integer
    description: "Lamp/Light adjust, set via 030-15 OTHER ADJUST (DATA01=96h, DATA02=FFh)"
```

## Events
```yaml
# The source describes only command/response interaction; no unsolicited
# notification protocol is documented.
# UNRESOLVED: no unsolicited events documented in source
```

## Macros
```yaml
# No multi-step command sequences are explicitly described in the source.
# UNRESOLVED: no macros documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety interlock procedures or
# power-on sequencing requirements. Operational lockouts are noted below but
# are device behavior, not safety interlocks - never inferred as safety.
```

## Notes
- **Protocol is binary, not ASCII.** Commands/responses are hex byte sequences. Frame structure: `<header> <ID1> <ID2> <LEN> <DATA...> <CKS>`. `ID1` is the projector's control ID; `ID2` is the model code (device-assigned). `LEN` is the byte length of the DATA part. `CKS` is the checksum = low-order byte of the sum of all preceding bytes (e.g. `20h+81h+01h+60h+01h+00h = 103h` → `CKS = 03h`).
- **Command payloads include the checksum.** Fixed commands ship with a precomputed trailing checksum byte (shown verbatim). Parameterized commands require the integrator to compute `CKS` over the final byte stream including any DATA bytes.
- **Response framing.** Successful no-data responses echo `2xh`; successful data responses use `2xh ... <LEN> <DATA> <CKS>`; error responses use `Axh ... 02h <ERR1> <ERR2> <CKS>`. Error codes are documented in §2.4 (e.g. `02h 0Dh` = "command cannot be accepted because the power is off"; `02h 0Fh` = no authority for the operation).
- **Command lockout during power transitions.** While POWER ON is executing, no other command is accepted. While POWER OFF is executing (including cooling time), no other command is accepted.
- **Auto-clearing mutes.** Picture mute (020), onscreen mute (024) clear on input/video-signal switch; sound mute (022) also clears on volume adjustment.
- **Lens drive.** For 053 LENS CONTROL, continuous drive (`7Fh` plus / `81h` minus) is stopped by sending `00h`; the same command can be reissued during motion without an intermediate stop.
- **Lamp/filter timers.** Usage times are reported in one-second units but are only updated at one-minute intervals.
- **Two-lamp models.** Lamp 2 selectors (`DATA01=01h`) are effective only on two-lamp projector models.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" is not in the refined source — input terminal values, aspect values, eco-mode values, PIP/PbP sub-input values, and base-model-type values could not be enumerated. -->
<!-- UNRESOLVED: default baud rate not stated (five rates supported: 115200/38400/19200/9600/4800). -->
<!-- UNRESOLVED: flow control not stated (full-duplex mode only). -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: ID1 (control ID) and ID2 (model code) default values for the UN552S not stated. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:16:35.536Z
last_checked_at: 2026-06-18T09:12:56.197Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:12:56.197Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The source is a generic projector command reference; model-specific coverage (e.g. which input terminals, aspect values, eco-mode values, sub-input values, base-model types apply to the UN552S) is referenced in an \"Appendix: Supplementary Information by Command\" that is not included in the refined source text."
- "firmware version compatibility not stated in source."
- "default baud rate not stated (multiple supported rates listed)."
- "flow control not stated (source lists only \"Full duplex\" communication mode)"
- "no unsolicited events documented in source"
- "no macros documented in source"
- "source contains no explicit safety interlock procedures or"
- "Appendix \"Supplementary Information by Command\" is not in the refined source — input terminal values, aspect values, eco-mode values, PIP/PbP sub-input values, and base-model-type values could not be enumerated."
- "default baud rate not stated (five rates supported: 115200/38400/19200/9600/4800)."
- "flow control not stated (full-duplex mode only)."
- "firmware version compatibility not stated."
- "ID1 (control ID) and ID2 (model code) default values for the UN552S not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
