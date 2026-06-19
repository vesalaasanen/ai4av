---
spec_id: admin/sharp-nec-np-m403h
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP M403H Control Spec"
manufacturer: Sharp/NEC
model_family: "NP M403H"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP M403H"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:35:17.220Z
last_checked_at: 2026-06-18T08:36:01.645Z
generated_at: 2026-06-18T08:36:01.645Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "default baud rate not marked in source (5 values listed); firmware version not stated; flow_control not explicitly stated; input terminal values referenced in Appendix not present in refined source"
  - "source lists 115200/38400/19200/9600/4800 - no default marked"
  - "RTS/CTS pins present in pin table but flow_control setting not stated"
  - "per-command success-response payloads not individually enumerated here; see source command details"
  - "ID1/ID2 default values and configuration procedure not stated in refined source"
  - "source documents no unsolicited notifications; all responses are command-driven."
  - "source documents no multi-step command sequences."
  - "no power-on sequencing requirements or hardware interlock voltages stated."
  - "Appendix \"Supplementary Information by Command\" tables (input terminal values, aspect values, eco mode values, base model types, sub-input values) not in refined source."
  - "default baud rate among 5 listed values not specified."
  - "flow_control setting not explicitly stated (RTS/CTS pins wired per D-SUB table)."
  - "firmware version compatibility not stated in source."
  - "ID1 control ID default / configuration procedure not in refined source."
  - "ID2 model code value for NP M403H not in refined source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:36:01.645Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP M403H Control Spec

## Summary
Sharp/NEC NP M403H LCD projector. Control via RS-232C serial (PC CONTROL D-SUB 9P) and TCP/IP over LAN (wired or wireless). Binary frame protocol with hex-byte commands, ID/model/checksum framing.

<!-- UNRESOLVED: default baud rate not marked in source (5 values listed); firmware version not stated; flow_control not explicitly stated; input terminal values referenced in Appendix not present in refined source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # UNRESOLVED: source lists 115200/38400/19200/9600/4800 - no default marked
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS pins present in pin table but flow_control setting not stated
addressing:
  port: 7142  # TCP, stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 015 POWER ON / 016 POWER OFF
  - levelable    # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 053 LENS CONTROL
  - queryable    # inferred: 078-* / 097-* / 305-* request commands
  - routable     # inferred: 018 INPUT SW CHANGE, 319-10 AUDIO SELECT SET
```

## Actions
```yaml
# Hex payloads verbatim from source. <ID1> <ID2> <CKS> are runtime-computed
# framing fields: ID1 = control ID, ID2 = model code, CKS = low byte of sum of
# all preceding bytes. Command templates shown with <DATA> placeholders.
actions:
  # --- 009. ERROR STATUS REQUEST (query) ---
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []

  # --- 015. POWER ON ---
  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []

  # --- 016. POWER OFF ---
  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []

  # --- 018. INPUT SW CHANGE (parameterized) ---
  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "Input terminal value (see Appendix Supplementary Information by Command - not in refined source). Example: 06h = video port."

  # --- 020. PICTURE MUTE ON ---
  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []

  # --- 021. PICTURE MUTE OFF ---
  - id: picture_mute_off
    label: "021. PICTURE MUTE OFF"
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  # --- 022. SOUND MUTE ON ---
  - id: sound_mute_on
    label: "022. SOUND MUTE ON"
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []

  # --- 023. SOUND MUTE OFF ---
  - id: sound_mute_off
    label: "023. SOUND MUTE OFF"
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  # --- 024. ONSCREEN MUTE ON ---
  - id: onscreen_mute_on
    label: "024. ONSCREEN MUTE ON"
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []

  # --- 025. ONSCREEN MUTE OFF ---
  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  # --- 030-1. PICTURE ADJUST (parameterized) ---
  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: data01
        type: string
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: data02
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data03
        type: string
        description: "Adjustment value (low-order 8 bits)"
      - name: data04
        type: string
        description: "Adjustment value (high-order 8 bits)"

  # --- 030-2. VOLUME ADJUST (parameterized) ---
  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: data01
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data02
        type: string
        description: "Adjustment value (low-order 8 bits)"
      - name: data03
        type: string
        description: "Adjustment value (high-order 8 bits)"

  # --- 030-12. ASPECT ADJUST (parameterized) ---
  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: data01
        type: string
        description: "Aspect value (see Appendix Supplementary Information by Command - not in refined source)"

  # --- 030-15. OTHER ADJUST / LAMP ADJUST (parameterized) ---
  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: data01
        type: string
        description: "Adjustment target high byte: 96h for LAMP ADJUST / LIGHT ADJUST (DATA02=FFh)"
      - name: data02
        type: string
        description: "Adjustment target low byte (FFh when DATA01=96h)"
      - name: data03
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data04
        type: string
        description: "Adjustment value (low-order 8 bits)"
      - name: data05
        type: string
        description: "Adjustment value (high-order 8 bits)"

  # --- 037. INFORMATION REQUEST (query) ---
  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []

  # --- 037-3. FILTER USAGE INFORMATION REQUEST (query) ---
  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []

  # --- 037-4. LAMP INFORMATION REQUEST 3 (query, parameterized) ---
  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: string
        description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: data02
        type: string
        description: "Content: 01h=usage time (seconds), 04h=remaining life (%)"

  # --- 037-6. CARBON SAVINGS INFORMATION REQUEST (query, parameterized) ---
  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  # --- 050. REMOTE KEY CODE (parameterized) ---
  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: string
        description: "Key code low byte (WORD). See key code list: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
      - name: data02
        type: string
        description: "Key code high byte (always 00h per source list)"

  # --- 051. SHUTTER CLOSE ---
  - id: shutter_close
    label: "051. SHUTTER CLOSE"
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  # --- 052. SHUTTER OPEN ---
  - id: shutter_open
    label: "052. SHUTTER OPEN"
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  # --- 053. LENS CONTROL (parameterized) ---
  - id: lens_control
    label: "053. LENS CONTROL"
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: string
        description: "Lens target. 06h=Periphery Focus (other values per model)"
      - name: data02
        type: string
        description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

  # --- 053-1. LENS CONTROL REQUEST (query, parameterized) ---
  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: data01
        type: string
        description: "Lens target (same values as 053 DATA01)"

  # --- 053-2. LENS CONTROL 2 (parameterized) ---
  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: data01
        type: string
        description: "Lens target. FFh=Stop (mode/value ignored)"
      - name: data02
        type: string
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: data03
        type: string
        description: "Adjustment value (low-order 8 bits)"
      - name: data04
        type: string
        description: "Adjustment value (high-order 8 bits)"

  # --- 053-3. LENS MEMORY CONTROL (parameterized) ---
  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  # --- 053-4. REFERENCE LENS MEMORY CONTROL (parameterized) ---
  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET (applies to profile selected via 053-10)"

  # --- 053-5. LENS MEMORY OPTION REQUEST (query, parameterized) ---
  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  # --- 053-6. LENS MEMORY OPTION SET (parameterized) ---
  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: data02
        type: string
        description: "00h=OFF, 01h=ON"

  # --- 053-7. LENS INFORMATION REQUEST (query) ---
  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

  # --- 053-10. LENS PROFILE SET (parameterized) ---
  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "00h=Profile 1, 01h=Profile 2"

  # --- 053-11. LENS PROFILE REQUEST (query) ---
  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  # --- 060-1. GAIN PARAMETER REQUEST 3 (query, parameterized) ---
  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: data01
        type: string
        description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

  # --- 078-1. SETTING REQUEST (query) ---
  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []

  # --- 078-2. RUNNING STATUS REQUEST (query) ---
  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []

  # --- 078-3. INPUT STATUS REQUEST (query) ---
  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []

  # --- 078-4. MUTE STATUS REQUEST (query) ---
  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []

  # --- 078-5. MODEL NAME REQUEST (query) ---
  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  # --- 078-6. COVER STATUS REQUEST (query) ---
  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []

  # --- 079. FREEZE CONTROL (parameterized) ---
  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "01h=freeze on, 02h=freeze off"

  # --- 084. INFORMATION STRING REQUEST (query, parameterized) ---
  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: data01
        type: string
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  # --- 097-8. ECO MODE REQUEST (query) ---
  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []

  # --- 097-45. LAN PROJECTOR NAME REQUEST (query) ---
  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  # --- 097-155. LAN MAC ADDRESS STATUS REQUEST2 (query) ---
  - id: lan_mac_address_status_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  # --- 097-198. PIP/PICTURE BY PICTURE REQUEST (query, parameterized) ---
  - id: pip_pbp_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  # --- 097-243-1. EDGE BLENDING MODE REQUEST (query) ---
  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  # --- 098-8. ECO MODE SET (parameterized) ---
  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "Eco mode value (see Appendix Supplementary Information by Command - not in refined source)"

  # --- 098-45. LAN PROJECTOR NAME SET (parameterized) ---
  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
    params:
      - name: name
        type: string
        description: "Projector name, up to 16 bytes (DATA01-DATA16)"

  # --- 098-198. PIP/PICTURE BY PICTURE SET (parameterized) ---
  - id: pip_pbp_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: data02
        type: string
        description: "Setting value. MODE: 00h=PIP, 01h=PiPbyP. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. SUB INPUT: see Appendix"

  # --- 098-243-1. EDGE BLENDING MODE SET (parameterized) ---
  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: data01
        type: string
        description: "00h=OFF, 01h=ON"

  # --- 305-1. BASE MODEL TYPE REQUEST (query) ---
  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []

  # --- 305-2. SERIAL NUMBER REQUEST (query) ---
  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  # --- 305-3. BASIC INFORMATION REQUEST (query) ---
  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []

  # --- 319-10. AUDIO SELECT SET (parameterized) ---
  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: string
        description: "Input terminal value (see Appendix Supplementary Information by Command - not in refined source)"
      - name: data02
        type: string
        description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  # Response prefix byte distinguishes reply type:
  #   20h/21h/22h/23h = success (data varies by command)
  #   A0h/A1h/A2h/A3h = error, payload <ERR1> <ERR2>
  # See Error code list (2.4) for ERR1/ERR2 combinations.
  - id: command_response
    type: object
    description: "Per-command response frame. Success returns data per command; failure returns ERR1/ERR2 error codes."
  - id: power_state
    type: enum
    description: "From 078-2 DATA03: 00h=Standby, 01h=Power on, FFh=Not supported"
    values: [standby, power_on, unsupported]
  - id: error_status
    type: object
    description: "009 ERROR STATUS REQUEST returns 12 DATA bytes of bitfield error info (cover, fan, temp, lamp, etc.). See command detail for bit layout."
  # UNRESOLVED: per-command success-response payloads not individually enumerated here; see source command details
```

## Variables
```yaml
variables:
  - id: control_id
    type: string
    description: "ID1 - projector control ID, substituted into every command frame"
  - id: model_code
    type: string
    description: "ID2 - model-dependent code, substituted into every command frame"
  # UNRESOLVED: ID1/ID2 default values and configuration procedure not stated in refined source
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications; all responses are command-driven.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: "While turning on, no other command accepted (source: 015 POWER ON)"
  - command: power_off
    note: "During power-off (incl. cooling time), no other command accepted (source: 016 POWER OFF)"
  - command: picture_mute_off_on_input_change
    note: "Picture mute turns off on input terminal switch or video signal switch (source: 020)"
  - command: sound_mute_off_on_input_change
    note: "Sound mute turns off on input terminal switch, video signal switch, or volume adjust (source: 022)"
  - command: onscreen_mute_off_on_input_change
    note: "Onscreen mute turns off on input terminal switch or video signal switch (source: 024)"
  - command: lens_drive_stop_required
    note: "After 7Fh/81h continuous lens drive, must send 00h to stop (source: 053)"
# UNRESOLVED: no power-on sequencing requirements or hardware interlock voltages stated.
```

## Notes
- Binary frame protocol. Hex notation `NNh` = byte value NN. All frames end with checksum byte `<CKS>`.
- Checksum: low byte of sum of all preceding bytes (example: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`).
- ID1 (control ID) and ID2 (model code) are runtime-substituted framing parameters; values not in this refined source.
- Power state machine (per 078-2 DATA06): Standby(Sleep) → Power on → Cooling → Standby; plus Standby(error), Standby(Power saving), Network standby variants.
- Serial port = PC CONTROL D-SUB 9P (cross cable). Pin table: 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS.
- TCP port 7142 (stated). LAN: 10/100 Mbps auto, IEEE 802.3 / 802.3u.
- Input terminal / aspect / sub-input enum values referenced in "Appendix Supplementary Information by Command" — not present in refined source, marked UNRESOLVED where relevant.
- Lamp info reflects eco mode state when enabled (037-4). Lamp usage updated at 1-minute intervals despite 1-second resolution.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" tables (input terminal values, aspect values, eco mode values, base model types, sub-input values) not in refined source. -->
<!-- UNRESOLVED: default baud rate among 5 listed values not specified. -->
<!-- UNRESOLVED: flow_control setting not explicitly stated (RTS/CTS pins wired per D-SUB table). -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: ID1 control ID default / configuration procedure not in refined source. -->
<!-- UNRESOLVED: ID2 model code value for NP M403H not in refined source. -->
```

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:35:17.220Z
last_checked_at: 2026-06-18T08:36:01.645Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:36:01.645Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "default baud rate not marked in source (5 values listed); firmware version not stated; flow_control not explicitly stated; input terminal values referenced in Appendix not present in refined source"
- "source lists 115200/38400/19200/9600/4800 - no default marked"
- "RTS/CTS pins present in pin table but flow_control setting not stated"
- "per-command success-response payloads not individually enumerated here; see source command details"
- "ID1/ID2 default values and configuration procedure not stated in refined source"
- "source documents no unsolicited notifications; all responses are command-driven."
- "source documents no multi-step command sequences."
- "no power-on sequencing requirements or hardware interlock voltages stated."
- "Appendix \"Supplementary Information by Command\" tables (input terminal values, aspect values, eco mode values, base model types, sub-input values) not in refined source."
- "default baud rate among 5 listed values not specified."
- "flow_control setting not explicitly stated (RTS/CTS pins wired per D-SUB table)."
- "firmware version compatibility not stated in source."
- "ID1 control ID default / configuration procedure not in refined source."
- "ID2 model code value for NP M403H not in refined source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
