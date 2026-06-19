---
spec_id: admin/sharp-nec-led-fe038i2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FE038I2 Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FE038I2"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FE038I2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:13:12.366Z
last_checked_at: 2026-06-18T08:08:40.870Z
generated_at: 2026-06-18T08:08:40.870Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model code (ID2) value for this specific model not stated; control ID (ID1) must match projector setting. Appendix \"Supplementary Information by Command\" referenced but not included in refined source (input terminal codes, aspect values, eco mode values, base model types, signal types, sub-input values)."
  - "full code list not in refined source.\""
  - "full list not in refined source.\""
  - "no async event mechanism documented."
  - "no macros described."
  - "source contains no formal safety interlock procedures or power-sequencing warnings beyond the timing notes above."
  - "ID2 model code for LED FE038I2 not stated — must be looked up or queried via 078-5 MODEL NAME REQUEST / 305-1 BASE MODEL TYPE REQUEST."
  - "Appendix \"Supplementary Information by Command\" enum tables absent from refined source."
  - "firmware version compatibility not stated."
  - "full key code list for 050 REMOTE KEY CODE — 25 entries shown in source, additional keys may exist."
  - "053 LENS CONTROL target codes beyond 06h (Periphery Focus) — other lens targets not enumerated."
  - "model code (ID2), Appendix enum tables, lens target codes beyond 06h, firmware compat."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:08:40.870Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FE038I2 Control Spec

## Summary
Sharp/NEC LED projector with binary RS-232C and TCP/IP control interface. Spec covers power, input switching, mute, picture/volume/lens adjustment, lens memory, eco mode, edge blending, PIP/PbP, and status queries per BDT140013 Rev 7.1. Command frame format: hex bytes with trailing checksum byte.

<!-- UNRESOLVED: model code (ID2) value for this specific model not stated; control ID (ID1) must match projector setting. Appendix "Supplementary Information by Command" referenced but not included in refined source (input terminal codes, aspect values, eco mode values, base model types, signal types, sub-input values). -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # source: "Use TCP port number 7142 for sending and receiving commands"
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 as switchable; 115200 listed first
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source: full duplex; no explicit flow control named
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: 015 POWER ON / 016 POWER OFF
  - queryable       # inferred: extensive status query catalogue
  - levelable       # inferred: 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 053 LENS CONTROL
```

## Actions
```yaml
# Checksum (CKS) = low-order byte of sum of all preceding bytes.
# ID1 = control ID, ID2 = model code - both runtime-supplied to match projector settings.
# 00h 00h used in command frames for ID1/ID2 in source examples (default).

# --- 009. ERROR STATUS REQUEST ---
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

# --- 015. POWER ON ---
- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

# --- 016. POWER OFF ---
- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

# --- 018. INPUT SW CHANGE ---
- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {input_terminal} {checksum}"
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal code (e.g. 06h=video). See Appendix Supplementary Information by Command - UNRESOLVED: full code list not in refined source."

# --- 020. PICTURE MUTE ON ---
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

# --- 021. PICTURE MUTE OFF ---
- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

# --- 022. SOUND MUTE ON ---
- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

# --- 023. SOUND MUTE OFF ---
- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

# --- 024. ONSCREEN MUTE ON ---
- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

# --- 025. ONSCREEN MUTE OFF ---
- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

# --- 030-1. PICTURE ADJUST ---
- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: target
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value_lo
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_hi
      type: integer
      description: Adjustment value high-order 8 bits

# --- 030-2. VOLUME ADJUST ---
- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value_lo
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_hi
      type: integer
      description: Adjustment value high-order 8 bits

# --- 030-12. ASPECT ADJUST ---
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {aspect} 00h {checksum}"
  params:
    - name: aspect
      type: integer
      description: "Aspect value - see Appendix Supplementary Information by Command. UNRESOLVED: full list not in refined source."

# --- 030-15. OTHER ADJUST (LAMP/LIGHT ADJUST) ---
- id: lamp_light_adjust
  label: Lamp/Light Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 96h FFh {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value_lo
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_hi
      type: integer
      description: Adjustment value high-order 8 bits

# --- 037. INFORMATION REQUEST ---
- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

# --- 037-3. FILTER USAGE INFORMATION REQUEST ---
- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

# --- 037-4. LAMP INFORMATION REQUEST 3 ---
- id: lamp_information_request
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {lamp} {content} {checksum}"
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: content
      type: integer
      description: "01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

# --- 037-6. CARBON SAVINGS INFORMATION REQUEST ---
- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {type} {checksum}"
  params:
    - name: type
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

# --- 050. REMOTE KEY CODE ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {key_lo} {key_hi} {checksum}"
  params:
    - name: key_lo
      type: integer
      description: "Key code low byte - see key code list (e.g. 05h=AUTO, 06h=MENU, 07h=UP, 02h=POWER ON, 03h=POWER OFF, 4Bh=COMPUTER1, 4Fh=VIDEO1, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO, etc.)"
    - name: key_hi
      type: integer
      description: "Key code high byte (always 00h per source list)"

# --- 051. SHUTTER CLOSE ---
- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

# --- 052. SHUTTER OPEN ---
- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

# --- 053. LENS CONTROL ---
- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {target} {content} {checksum}"
  params:
    - name: target
      type: integer
      description: "Lens target (06h=Periphery Focus shown in source; other targets per Appendix - UNRESOLVED)"
    - name: content
      type: integer
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus-continuous, 81h=minus-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

# --- 053-1. LENS CONTROL REQUEST ---
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {target} 00h {checksum}"
  params:
    - name: target
      type: integer
      description: "Lens target (matches 053 LENS CONTROL target codes)"

# --- 053-2. LENS CONTROL 2 ---
- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {checksum}"
  params:
    - name: target
      type: integer
      description: "Lens target (FFh=Stop in source example)"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value_lo
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_hi
      type: integer
      description: Adjustment value high-order 8 bits

# --- 053-3. LENS MEMORY CONTROL ---
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

# --- 053-4. REFERENCE LENS MEMORY CONTROL ---
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {operation} {checksum}"
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

# --- 053-5. LENS MEMORY OPTION REQUEST ---
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {option} {checksum}"
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

# --- 053-6. LENS MEMORY OPTION SET ---
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {option} {value} {checksum}"
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

# --- 053-7. LENS INFORMATION REQUEST ---
- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

# --- 053-10. LENS PROFILE SET ---
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {profile} {checksum}"
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

# --- 053-11. LENS PROFILE REQUEST ---
- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

# --- 060-1. GAIN PARAMETER REQUEST 3 ---
- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {name} 00h 00h {checksum}"
  params:
    - name: name
      type: integer
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

# --- 078-1. SETTING REQUEST ---
- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

# --- 078-2. RUNNING STATUS REQUEST ---
- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

# --- 078-3. INPUT STATUS REQUEST ---
- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

# --- 078-4. MUTE STATUS REQUEST ---
- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

# --- 078-5. MODEL NAME REQUEST ---
- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

# --- 078-6. COVER STATUS REQUEST ---
- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

# --- 079. FREEZE CONTROL ---
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {state} {checksum}"
  params:
    - name: state
      type: integer
      description: "01h=freeze on, 02h=freeze off"

# --- 084. INFORMATION STRING REQUEST ---
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {info_type} 01h {checksum}"
  params:
    - name: info_type
      type: integer
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

# --- 097-8. ECO MODE REQUEST ---
- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

# --- 097-45. LAN PROJECTOR NAME REQUEST ---
- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

# --- 097-155. LAN MAC ADDRESS STATUS REQUEST2 ---
- id: lan_mac_address_request
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

# --- 097-198. PIP/PICTURE BY PICTURE REQUEST ---
- id: pip_pbp_request
  label: PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {item} {checksum}"
  params:
    - name: item
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

# --- 097-243-1. EDGE BLENDING MODE REQUEST ---
- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

# --- 098-8. ECO MODE SET ---
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {value} {checksum}"
  params:
    - name: value
      type: integer
      description: "Eco mode value - see Appendix Supplementary Information by Command. UNRESOLVED: full list not in refined source."

# --- 098-45. LAN PROJECTOR NAME SET ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {name_bytes_16} 00h {checksum}"
  params:
    - name: name_bytes_16
      type: string
      description: "Projector name, up to 16 bytes (NUL-padded)"

# --- 098-198. PIP/PICTURE BY PICTURE SET ---
- id: pip_pbp_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {item} {value} {checksum}"
  params:
    - name: item
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "Mode: 00h=PIP, 01h=PbP. Start pos: 00h=TL, 01h=TR, 02h=BL, 03h=BR. Sub-input: see Appendix."

# --- 098-243-1. EDGE BLENDING MODE SET ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {value} {checksum}"
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

# --- 305-1. BASE MODEL TYPE REQUEST ---
- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

# --- 305-2. SERIAL NUMBER REQUEST ---
- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

# --- 305-3. BASIC INFORMATION REQUEST ---
- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

# --- 319-10. AUDIO SELECT SET ---
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {input_terminal} {setting} {checksum}"
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal - see Appendix Supplementary Information by Command."
    - name: setting
      type: integer
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Response frame format: {result_byte} {cmd_echo} <ID1> <ID2> {LEN} {DATA...} <CKS>
# Result byte prefixes: A0h/A1h/A2h/A3h = error response; 20h/21h/22h/23h = success response.
# Each query action above has a matching response carrying DATA fields documented in source §3.

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: "078-2 RUNNING STATUS REQUEST DATA03/DATA06"

- id: error_status
  type: bitmask
  description: "12-byte error bitmap per 009 ERROR STATUS REQUEST - cover, fan, temp, lamp, FPGA, mirror cover, ballast, iris, interlock, foreign matter, system errors."
  source: "009 ERROR STATUS REQUEST DATA01-12"

- id: command_result
  type: enum
  values: [success, error]
  description: "ERR1/ERR2 error code pair per §2.4 - 21 distinct combinations documented."

- id: lens_operation_state
  type: bitmask
  description: "Lens memory/zoom/focus/shift operation state per 053-7 LENS INFORMATION REQUEST DATA01."
```

## Variables
```yaml
# Settable parameters exposed via dedicated adjust commands (also represented as Actions above).
# Numeric ranges retrievable via 060-1 GAIN PARAMETER REQUEST 3 (returns upper/lower/default/current/wide/narrow).
- id: brightness
  type: integer
  adjust_command: picture_adjust (target=00h)
- id: contrast
  type: integer
  adjust_command: picture_adjust (target=01h)
- id: color
  type: integer
  adjust_command: picture_adjust (target=02h)
- id: hue
  type: integer
  adjust_command: picture_adjust (target=03h)
- id: sharpness
  type: integer
  adjust_command: picture_adjust (target=04h)
- id: volume
  type: integer
  adjust_command: volume_adjust
- id: lamp_light_level
  type: integer
  adjust_command: lamp_light_adjust
```

## Events
```yaml
# Source describes no unsolicited notifications. All responses are solicited by commands.
# UNRESOLVED: no async event mechanism documented.
```

## Macros
```yaml
# Source documents no explicit multi-step sequences.
# UNRESOLVED: no macros described.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "During power-on transition, projector accepts no other commands (source: 015 POWER ON note)."
  - "During power-off incl. cooling time, projector accepts no other commands (source: 016 POWER OFF note)."
  - "Lens continuous-drive (053 DATA02=7Fh/81h) must be explicitly stopped with 00h after motion."
# UNRESOLVED: source contains no formal safety interlock procedures or power-sequencing warnings beyond the timing notes above.
```

## Notes
- BDT140013 Revision 7.1 command reference. Binary protocol: each command/response is a frame of hex bytes terminated by a checksum byte (CKS).
- Checksum = low-order byte of sum of all preceding bytes (source §2.2 worked example).
- Command frames use `00h 00h` for ID1/ID2 placeholders in source examples; runtime must substitute the projector's actual control ID and model code.
- Response result-byte prefix encodes success vs error: `20h/21h/22h/23h` = success (echoes command-group byte), `A0h/A1h/A2h/A3h` = error (carries ERR1/ERR2).
- Lamp/filter usage times returned in seconds but updated at one-minute intervals.
- Lamp remaining life (%) returned as negative value once replacement deadline exceeded.
- 020–025 mute commands auto-clear on input/video-signal switch (and volume adjust for sound mute).
- Source repeatedly references an Appendix "Supplementary Information by Command" not included in the refined document — input terminal codes, aspect values, eco mode values, base model types, selection signal types, and sub-input values live there.

<!-- UNRESOLVED: ID2 model code for LED FE038I2 not stated — must be looked up or queried via 078-5 MODEL NAME REQUEST / 305-1 BASE MODEL TYPE REQUEST. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" enum tables absent from refined source. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: full key code list for 050 REMOTE KEY CODE — 25 entries shown in source, additional keys may exist. -->
<!-- UNRESOLVED: 053 LENS CONTROL target codes beyond 06h (Periphery Focus) — other lens targets not enumerated. -->
````

Spec built. 53 actions enumerated (one per source command row). Binary payloads verbatim. 4 queries promoted to Feedbacks (power, error, command result, lens state). Multi-value commands kept as single parameterized actions per granularity rule.

Gaps flagged UNRESOLVED: model code (ID2), Appendix enum tables, lens target codes beyond 06h, firmware compat.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:13:12.366Z
last_checked_at: 2026-06-18T08:08:40.870Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:08:40.870Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model code (ID2) value for this specific model not stated; control ID (ID1) must match projector setting. Appendix \"Supplementary Information by Command\" referenced but not included in refined source (input terminal codes, aspect values, eco mode values, base model types, signal types, sub-input values)."
- "full code list not in refined source.\""
- "full list not in refined source.\""
- "no async event mechanism documented."
- "no macros described."
- "source contains no formal safety interlock procedures or power-sequencing warnings beyond the timing notes above."
- "ID2 model code for LED FE038I2 not stated — must be looked up or queried via 078-5 MODEL NAME REQUEST / 305-1 BASE MODEL TYPE REQUEST."
- "Appendix \"Supplementary Information by Command\" enum tables absent from refined source."
- "firmware version compatibility not stated."
- "full key code list for 050 REMOTE KEY CODE — 25 entries shown in source, additional keys may exist."
- "053 LENS CONTROL target codes beyond 06h (Periphery Focus) — other lens targets not enumerated."
- "model code (ID2), Appendix enum tables, lens target codes beyond 06h, firmware compat."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
