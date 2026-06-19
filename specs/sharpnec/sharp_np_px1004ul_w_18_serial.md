---
spec_id: admin/sharp-nec-np-px1004ul-w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP-PX1004UL-W Control Spec"
manufacturer: Sharp/NEC
model_family: NP-PX1004UL-W
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NP-PX1004UL-W
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:47:43.055Z
last_checked_at: 2026-06-18T08:52:30.883Z
generated_at: 2026-06-18T08:52:30.883Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "model code (ID2) value for this model not stated in source"
  - "flow_control mode not listed in source communication table"
  - "several DATA enums reference an \"Appendix - Supplementary Information by Command\" not present in this refined source (input terminal codes, aspect values, eco mode values, base model types, sub-input values)"
  - "flow control mode not stated in source communication table (RTS/CTS pins wired per D-SUB 9P assignment)"
  - "aspect enum code list is in the Appendix \"Supplementary Information by Command\" (not present in refined source)"
  - "populate if a separate notification section exists in the full manual."
  - "populate from source if applicable."
  - "no further safety warnings or power-on sequencing requirements stated in this refined source."
  - "model code (ID2) for NP-PX1004UL-W not stated in source"
  - "flow_control mode not stated in source communication table"
  - "Appendix enum code lists (input terminal, aspect, eco mode, base model type, sub-input) not present in refined source"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:52:30.883Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP-PX1004UL-W Control Spec

## Summary
Control command reference (BDT140013 Rev 7.1) for the Sharp/NEC NP-PX1004UL-W projector. Covers binary-frame control over both RS-232C serial and wired/wireless LAN (TCP). Frames are hex byte sequences with a trailing checksum byte; most commands return a success frame (`2xh`/`A xh` error) echoing ID1/ID2.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: model code (ID2) value for this model not stated in source -->
<!-- UNRESOLVED: flow_control mode not listed in source communication table -->
<!-- UNRESOLVED: several DATA enums reference an "Appendix - Supplementary Information by Command" not present in this refined source (input terminal codes, aspect values, eco mode values, base model types, sub-input values) -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: "115200/38400/19200/9600/4800 bps (switchable)"
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control mode not stated in source communication table (RTS/CTS pins wired per D-SUB 9P assignment)
addressing:
  port: 7142  # stated: TCP port 7142 for sending/receiving commands
auth:
  type: none  # inferred: no login/password/auth procedure in source
```

## Traits
```yaml
traits:
  - powerable  # inferred from POWER ON / POWER OFF commands
  - queryable  # inferred from numerous REQUEST (status query) commands
  - levelable  # inferred from volume, picture (brightness/contrast/etc.), and lens position adjust commands
```

## Actions
```yaml
# Frame layout (request): <type> <command> <ID1> <ID2> <LEN> <DATA...> <CKS>
#   - ID1 = control ID set on projector (source lists request frames with 00h)
#   - ID2 = model code (source lists request frames with 00h)
#   - CKS = checksum = low-order byte of sum of all preceding bytes
# Parameterized commands show <DATA..> / <CKS> verbatim as in source.
# Fixed commands reproduce the literal checksum byte documented by the source.

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
    - name: input_terminal
      type: integer
      description: "DATA01 input terminal code (e.g. 06h = video port). Full code list in Appendix 'Supplementary Information by Command'"

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
    - name: target
      type: integer
      description: "DATA01 adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "DATA02 adjustment mode: 00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: "DATA03 (low 8 bits) + DATA04 (high 8 bits) signed adjustment value"

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: mode
      type: integer
      description: "DATA01 adjustment mode: 00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: "DATA02 (low 8 bits) + DATA03 (high 8 bits) adjustment value"

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: aspect
      type: integer
      description: "DATA01 aspect value. Code list in Appendix 'Supplementary Information by Command'"

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: target
      type: integer
      description: "DATA01=96h, DATA02=FFh => LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "DATA03 adjustment mode: 00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: "DATA04 (low 8 bits) + DATA05 (high 8 bits) adjustment value"

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
    - name: lamp
      type: integer
      description: "DATA01: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: content
      type: integer
      description: "DATA02: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: type
      type: integer
      description: "DATA01: 00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: key_code
      type: integer
      description: "DATA01+DATA02 WORD key code. e.g. 02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU, 07h 00h=UP, 08h 00h=DOWN, 09h 00h=RIGHT, 0Ah 00h=LEFT, 0Bh 00h=ENTER, 0Ch 00h=EXIT, 0Dh 00h=HELP, 0Fh 00h=MAGNIFY UP, 10h 00h=MAGNIFY DOWN, 13h 00h=MUTE, 29h 00h=PICTURE, 4Bh 00h=COMPUTER1, 4Ch 00h=COMPUTER2, 4Fh 00h=VIDEO1, 51h 00h=S-VIDEO1, 84h 00h=VOLUME UP, 85h 00h=VOLUME DOWN, 8Ah 00h=FREEZE, A3h 00h=ASPECT, D7h 00h=SOURCE, EEh 00h=LAMP MODE/ECO"

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
    - name: target
      type: integer
      description: "DATA01 lens target (06h=Periphery Focus). Other target codes in Appendix"
    - name: content
      type: integer
      description: "DATA02: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus, 81h=drive minus, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: target
      type: integer
      description: "DATA01 lens target (same codes as LENS CONTROL target)"

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: target
      type: integer
      description: "DATA01: FFh=Stop"
    - name: mode
      type: integer
      description: "DATA02: 00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: "DATA03 (low 8 bits) + DATA04 (high 8 bits) adjustment value"

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: operation
      type: integer
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: operation
      type: integer
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET (acts on profile from LENS PROFILE SET)"

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: option
      type: integer
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: option
      type: integer
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "DATA02: 00h=OFF, 01h=ON"

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
    - name: profile
      type: integer
      description: "DATA01: 00h=Profile 1, 01h=Profile 2"

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
    - name: name
      type: integer
      description: "DATA01 adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"

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
    - name: state
      type: integer
      description: "DATA01: 01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: type
      type: integer
      description: "DATA01 information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

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
    - name: item
      type: integer
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
    - name: value
      type: integer
      description: "DATA01 eco mode value. Code list in Appendix 'Supplementary Information by Command'"

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01>..<DATA16> 00h <CKS>"
  params:
    - name: name
      type: string
      description: "DATA01-DATA16 projector name (up to 16 bytes), NUL-terminated"

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: item
      type: integer
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "DATA02 setting value. MODE: 00h=PIP,01h=PbP. START POSITION: 00h=TOP-LEFT,01h=TOP-RIGHT,02h=BOTTOM-LEFT,03h=BOTTOM-RIGHT. Sub-input codes in Appendix"

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: value
      type: integer
      description: "DATA01: 00h=OFF, 01h=ON"

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
    - name: input_terminal
      type: integer
      description: "DATA01 input terminal. Code list in Appendix 'Supplementary Information by Command'"
    - name: value
      type: integer
      description: "DATA02: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 RUNNING STATUS / 305-3 BASIC INFORMATION DATA01/operation status"

- id: cooling_process
  type: enum
  values: [not_executed, during_execution, not_supported]
  source: "078-2 DATA04"

- id: power_on_off_process
  type: enum
  values: [not_executed, during_execution, not_supported]
  source: "078-2 DATA05"

- id: error_status
  type: bitmask
  description: "12-byte error information (009 ERROR STATUS REQUEST). Bit set to 1 = error. Includes cover, fan, temperature, power, lamp, formatter, FPGA, mirror cover, foreign-matter, interlock-switch-open, system errors."
  source: "009 DATA01-DATA12"

- id: picture_mute
  type: enum
  values: [off, on]
  source: "078-4 DATA01"

- id: sound_mute
  type: enum
  values: [off, on]
  source: "078-4 DATA02"

- id: onscreen_mute
  type: enum
  values: [off, on]
  source: "078-4 DATA03"

- id: input_signal_status
  type: object
  description: "Signal switch process, signal list number, selection signal type, content displayed"
  source: "078-3 INPUT STATUS REQUEST"

- id: cover_status
  type: enum
  values: [normal_open, cover_closed]
  source: "078-6 COVER STATUS REQUEST DATA01"

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: "037-4 LAMP INFORMATION REQUEST 3"

- id: lamp_remaining_life
  type: integer
  unit: percent
  description: "Negative if lamp replacement deadline exceeded"
  source: "037-4 LAMP INFORMATION REQUEST 3"

- id: filter_usage_time
  type: integer
  unit: seconds
  source: "037-3 FILTER USAGE INFORMATION REQUEST"

- id: lens_position
  type: object
  description: "Upper/lower adjustment limits + current value for a lens target"
  source: "053-1 LENS CONTROL REQUEST"

- id: lens_operation_status
  type: bitmask
  description: "Per-target operation status: lens memory, zoom, focus, lens shift (H/V) stop/active"
  source: "053-7 LENS INFORMATION REQUEST DATA01"

- id: eco_mode
  type: enum
  description: "Light mode / Lamp mode value"
  source: "097-8 ECO MODE REQUEST"

- id: projector_name
  type: string
  source: "097-45 LAN PROJECTOR NAME REQUEST"

- id: mac_address
  type: string
  source: "097-155 LAN MAC ADDRESS STATUS REQUEST2"

- id: model_name
  type: string
  source: "078-5 MODEL NAME REQUEST"

- id: serial_number
  type: string
  source: "305-2 SERIAL NUMBER REQUEST"

- id: base_model_type
  type: object
  source: "305-1 BASE MODEL TYPE REQUEST"

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: "097-243-1 EDGE BLENDING MODE REQUEST"

- id: pip_pbp_setting
  type: object
  description: "MODE / START POSITION / SUB INPUT settings"
  source: "097-198 PIP/PICTURE BY PICTURE REQUEST"

- id: gain_parameter
  type: object
  description: "Adjustment status, limits, default, current, wide/narrow widths for a gain (brightness/contrast/color/hue/sharpness/volume/lamp adjust)"
  source: "060-1 GAIN PARAMETER REQUEST 3"
```

## Variables
```yaml
- id: volume
  type: integer
  set_via: "030-2 VOLUME ADJUST"
  query_via: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=05h)"

- id: brightness
  type: integer
  set_via: "030-1 PICTURE ADJUST (DATA01=00h)"
  query_via: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=00h)"

- id: contrast
  type: integer
  set_via: "030-1 PICTURE ADJUST (DATA01=01h)"
  query_via: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=01h)"

- id: color
  type: integer
  set_via: "030-1 PICTURE ADJUST (DATA01=02h)"
  query_via: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=02h)"

- id: hue
  type: integer
  set_via: "030-1 PICTURE ADJUST (DATA01=03h)"
  query_via: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=03h)"

- id: sharpness
  type: integer
  set_via: "030-1 PICTURE ADJUST (DATA01=04h)"
  query_via: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=04h)"

- id: lamp_adjust
  type: integer
  set_via: "030-15 OTHER ADJUST (DATA01=96h)"
  query_via: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=96h)"

- id: aspect
  type: enum
  set_via: "030-12 ASPECT ADJUST"
  # UNRESOLVED: aspect enum code list is in the Appendix "Supplementary Information by Command" (not present in refined source)
```

## Events
```yaml
# No unsolicited notifications described in source. All responses are replies to commands.
# UNRESOLVED: populate if a separate notification section exists in the full manual.
```

## Macros
```yaml
# No explicit multi-step sequences described in source.
# UNRESOLVED: populate from source if applicable.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "While POWER ON is executing, no other command can be accepted."
  - "While POWER OFF is executing (including cooling time), no other command can be accepted."
  - "Error code 02h 0Dh: command cannot be accepted because the power is off."
# UNRESOLVED: no further safety warnings or power-on sequencing requirements stated in this refined source.
```

## Notes
- Manual reference: BDT140013 Revision 7.1.
- Binary hex frames. Request frames are documented with literal `00h 00h` in the ID1/ID2 byte positions; ID1 = control ID set on the projector, ID2 = model code (value for this model UNRESOLVED). Trailing `<CKS>` byte = low-order byte of the sum of all preceding bytes.
- Response type byte encoding: success responses use high nibble `2` with the command's category in the low part (`20h/21h/22h/23h`); error responses use high nibble `A` (`A0h/A1h/A2h/A3h`) and carry `<ERR1> <ERR2>`. Error code table provided (ERR1/ERR2 combinations).
- Picture mute, sound mute, and onscreen mute auto-clear on input/video signal switch (sound mute also clears on volume adjust).
- Lamp/filter usage time resolvable to one-second units but updated at one-minute intervals.
- Several commands reference an Appendix "Supplementary Information by Command" (input terminal codes, aspect values, eco mode values, base model types, sub-input values) that is not present in this refined source — those enums are UNRESOLVED.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: model code (ID2) for NP-PX1004UL-W not stated in source -->
<!-- UNRESOLVED: flow_control mode not stated in source communication table -->
<!-- UNRESOLVED: Appendix enum code lists (input terminal, aspect, eco mode, base model type, sub-input) not present in refined source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:47:43.055Z
last_checked_at: 2026-06-18T08:52:30.883Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:52:30.883Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "model code (ID2) value for this model not stated in source"
- "flow_control mode not listed in source communication table"
- "several DATA enums reference an \"Appendix - Supplementary Information by Command\" not present in this refined source (input terminal codes, aspect values, eco mode values, base model types, sub-input values)"
- "flow control mode not stated in source communication table (RTS/CTS pins wired per D-SUB 9P assignment)"
- "aspect enum code list is in the Appendix \"Supplementary Information by Command\" (not present in refined source)"
- "populate if a separate notification section exists in the full manual."
- "populate from source if applicable."
- "no further safety warnings or power-on sequencing requirements stated in this refined source."
- "model code (ID2) for NP-PX1004UL-W not stated in source"
- "flow_control mode not stated in source communication table"
- "Appendix enum code lists (input terminal, aspect, eco mode, base model type, sub-input) not present in refined source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
