---
spec_id: admin/sharp-nec-np-p474u
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP-P474U Control Spec"
manufacturer: Sharp/NEC
model_family: NP-P474U
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NP-P474U
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:37:10.768Z
last_checked_at: 2026-06-18T08:47:46.669Z
generated_at: 2026-06-18T08:47:46.669Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, base-model-type values, eco-mode values, sub-input values) referenced by several commands but not present in the refined source. ID2 (model code) value for this specific model not stated. Firmware version compatibility not stated."
  - "source states \"Full duplex\" communication mode; flow_control hardware line not explicitly named"
  - "actual values listed in source Appendix only"
  - "source documents no unsolicited notifications. All responses are replies to commands."
  - "source documents no named multi-step sequences."
  - "source contains no formal safety interlock procedures or power-on sequencing"
  - "Appendix 'Supplementary Information by Command' (input-terminal value table, aspect values, base-model-type values, eco-mode values, sub-input values) referenced by 018/030-12/078-1/097-8/098-8/097-198/098-198/319-10 but not contained in the refined source."
  - "model code (ID2) value for NP-P474U not stated."
  - "flow_control line not explicitly named (only \"Full duplex\" stated)."
  - "firmware version compatibility not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:47:46.669Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP-P474U Control Spec

## Summary
The Sharp/NEC NP-P474U is an LCD projector controllable via RS-232C serial or wired/wireless LAN (TCP). This spec covers the binary command protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1), including power, input switching, mute, picture/volume/lens adjustment, lens memory, and a full set of status queries.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input terminal values, aspect values, base-model-type values, eco-mode values, sub-input values) referenced by several commands but not present in the refined source. ID2 (model code) value for this specific model not stated. Firmware version compatibility not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source: switchable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode; flow_control hardware line not explicitly named
addressing:
  port: 7142  # TCP port for LAN command send/receive (source §1.2)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: POWER ON / POWER OFF commands present
  - routable        # inferred: INPUT SW CHANGE + audio select present
  - queryable       # inferred: numerous status/info request commands
  - levelable       # inferred: PICTURE/VOLUME/ASPECT/OTHER adjust + gain request present
  - mutable         # inferred: picture/sound/onscreen mute on/off
```

## Actions
```yaml
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
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value (e.g. 06h = Video). Full value list in source Appendix 'Supplementary Information by Command'."
  notes: "Example to select video port: 02h 03h 00h 00h 02h 01h 06h 0Eh"

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
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value - see source Appendix 'Supplementary Information by Command'"

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 96h = LAMP ADJUST / LIGHT ADJUST (per source)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)
    - name: DATA05
      type: integer
      description: Additional value byte per command frame

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
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type); see source Key code list (e.g. 05h=AUTO, 29h=COMPUTER1, D7h=SOURCE, EEh=LAMP MODE/ECO)"
    - name: DATA02
      type: integer
      description: "Key code high byte (00h for all documented keys)"
  notes: "Example AUTO key: 02h 0Fh 00h 00h 02h 05h 00h 18h"

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
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (source documents 06h=Periphery Focus; other targets in Appendix)"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=drive +1s, 02h=+0.5s, 03h=+0.25s, 7Fh=drive plus, 81h=drive minus, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens target to query (see 053. LENS CONTROL)

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (FFh = Stop, in which case DATA02-04 not referenced)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Controls profile selected by 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

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
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

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
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Parameter: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Eco-mode value - see source Appendix 'Supplementary Information by Command'"

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01..DATA16} 00h {CKS}"
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes)

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Parameter: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value; meaning depends on DATA01 (e.g. MODE: 00h=PIP, 01h=PICTURE BY PICTURE)"

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

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
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal - see source Appendix 'Supplementary Information by Command'"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 RUNNING STATUS REQUEST DATA06"

- id: cooling_process
  type: enum
  values: [not_executed, during_execution]
  source: "078-2 RUNNING STATUS REQUEST DATA04"

- id: power_on_off_process
  type: enum
  values: [not_executed, during_execution]
  source: "078-2 RUNNING STATUS REQUEST DATA05"

- id: input_signal_type
  type: enum
  values: [COMPUTER, VIDEO, S-VIDEO, COMPONENT, DVI-D, HDMI, DisplayPort, VIEWER]
  source: "078-3 INPUT STATUS REQUEST DATA04"

- id: picture_mute
  type: enum
  values: [off, on]
  source: "078-4 MUTE STATUS REQUEST DATA01"

- id: sound_mute
  type: enum
  values: [off, on]
  source: "078-4 MUTE STATUS REQUEST DATA02"

- id: onscreen_mute
  type: enum
  values: [off, on]
  source: "078-4 MUTE STATUS REQUEST DATA03"

- id: freeze_status
  type: enum
  values: [off, on]
  source: "305-3 BASIC INFORMATION REQUEST DATA09"

- id: cover_status
  type: enum
  values: [normal_opened, cover_closed]
  source: "078-6 COVER STATUS REQUEST DATA01"

- id: eco_mode
  type: enum
  values: []  # UNRESOLVED: actual values listed in source Appendix only
  source: "097-8 ECO MODE REQUEST DATA01"

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: "097-243-1 EDGE BLENDING MODE REQUEST DATA01"

- id: error_status
  type: bitmap
  description: "12-byte error bitfield returned by 009. ERROR STATUS REQUEST (cover, fan, temperature, lamp, formatter, FPGA, ballast, iris, lens, interlock, system errors)"
  source: "009 ERROR STATUS REQUEST DATA01-DATA12"
```

## Variables
```yaml
- id: picture_brightness
  set_via: "030-1 PICTURE ADJUST (DATA01=00h)"
  read_via: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=00h)"
- id: picture_contrast
  set_via: "030-1 PICTURE ADJUST (DATA01=01h)"
  read_via: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=01h)"
- id: picture_color
  set_via: "030-1 PICTURE ADJUST (DATA01=02h)"
  read_via: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=02h)"
- id: picture_hue
  set_via: "030-1 PICTURE ADJUST (DATA01=03h)"
  read_via: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=03h)"
- id: picture_sharpness
  set_via: "030-1 PICTURE ADJUST (DATA01=04h)"
  read_via: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=04h)"
- id: volume
  set_via: "030-2 VOLUME ADJUST"
  read_via: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=05h)"
- id: lamp_light_adjust
  set_via: "030-15 OTHER ADJUST (DATA01=96h)"
  read_via: "060-1 GAIN PARAMETER REQUEST 3 (DATA01=96h)"
- id: lens_shift_h
  set_via: "053. LENS CONTROL / 053-2 LENS CONTROL 2"
  read_via: "053-1 LENS CONTROL REQUEST"
- id: lens_shift_v
  set_via: "053. LENS CONTROL / 053-2 LENS CONTROL 2"
  read_via: "053-1 LENS CONTROL REQUEST"
- id: zoom
  set_via: "053. LENS CONTROL / 053-2 LENS CONTROL 2"
  read_via: "053-1 LENS CONTROL REQUEST"
- id: focus
  set_via: "053. LENS CONTROL / 053-2 LENS CONTROL 2"
  read_via: "053-1 LENS CONTROL REQUEST"
- id: lamp_usage_time
  read_via: "037-4 LAMP INFORMATION REQUEST 3 (DATA02=01h)"
  unit: seconds
- id: lamp_remaining_life
  read_via: "037-4 LAMP INFORMATION REQUEST 3 (DATA02=04h)"
  unit: percent
- id: filter_usage_time
  read_via: "037-3 FILTER USAGE INFORMATION REQUEST"
  unit: seconds
- id: projector_name
  set_via: "098-45 LAN PROJECTOR NAME SET"
  read_via: "097-45 LAN PROJECTOR NAME REQUEST"
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. All responses are replies to commands.
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
power_on_exclusivity: "While POWER ON (015) is executing, no other command is accepted. While POWER OFF (016) is executing (including cooling time), no other command is accepted. (source §3.2, §3.3)"
# UNRESOLVED: source contains no formal safety interlock procedures or power-on sequencing
# requirements beyond the command-exclusivity notes above.
```

## Notes
- **Frame format:** `20h 88h {ID1} {ID2} 0Ch {DATA01}..{DATA12} {CKS}` style. Command responses begin with a high-bit-set variant of the command class byte: `A0h/A1h/A2h/A3h` for errors, `20h/21h/22h/23h` for success. First byte of each command/response indicates direction and message class.
- **Checksum (CKS):** sum of all preceding bytes, low-order 8 bits. Source example: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`.
- **ID1 = Control ID** set on projector; **ID2 = model code** (model-specific). ID2 value for NP-P474U not stated in this refined source.
- **Error replies:** `A0h/A1h/A2h/A3h {cmd} {ID1} {ID2} 02h {ERR1} {ERR2} {CKS}`. ERR1/ERR2 code table in source §2.4 (e.g. 02h/0Dh = "command cannot be accepted because the power is off").
- **Usage-time granularity:** lamp/filter usage obtained in 1-second units but updated at 1-minute intervals.
- **Picture/sound/onscreen mute auto-clear:** input switch or video-signal switch clears picture mute, sound mute, and onscreen mute. Volume adjustment also clears sound mute.
- **LAN:** wired 10/100 Mbps auto-sensing; wireless via optional wireless LAN unit (see operation manual). TCP port 7142 for command send/receive.
<!-- UNRESOLVED: Appendix 'Supplementary Information by Command' (input-terminal value table, aspect values, base-model-type values, eco-mode values, sub-input values) referenced by 018/030-12/078-1/097-8/098-8/097-198/098-198/319-10 but not contained in the refined source. -->
<!-- UNRESOLVED: model code (ID2) value for NP-P474U not stated. -->
<!-- UNRESOLVED: flow_control line not explicitly named (only "Full duplex" stated). -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
```

Spec done. 53 actions, all hex payloads verbatim. Inference notes on transport auth + traits. Appendix values + model code + firmware = marked UNRESOLVED (not in refined source).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:37:10.768Z
last_checked_at: 2026-06-18T08:47:46.669Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:47:46.669Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Appendix \"Supplementary Information by Command\" (input terminal values, aspect values, base-model-type values, eco-mode values, sub-input values) referenced by several commands but not present in the refined source. ID2 (model code) value for this specific model not stated. Firmware version compatibility not stated."
- "source states \"Full duplex\" communication mode; flow_control hardware line not explicitly named"
- "actual values listed in source Appendix only"
- "source documents no unsolicited notifications. All responses are replies to commands."
- "source documents no named multi-step sequences."
- "source contains no formal safety interlock procedures or power-on sequencing"
- "Appendix 'Supplementary Information by Command' (input-terminal value table, aspect values, base-model-type values, eco-mode values, sub-input values) referenced by 018/030-12/078-1/097-8/098-8/097-198/098-198/319-10 but not contained in the refined source."
- "model code (ID2) value for NP-P474U not stated."
- "flow_control line not explicitly named (only \"Full duplex\" stated)."
- "firmware version compatibility not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
