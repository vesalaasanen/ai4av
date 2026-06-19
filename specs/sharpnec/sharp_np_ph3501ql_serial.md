---
spec_id: admin/sharp-nec-np-ph3501ql
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP-PH3501QL Control Spec"
manufacturer: Sharp/NEC
model_family: NP-PH3501QL
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NP-PH3501QL
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:17:28.160Z
last_checked_at: 2026-06-18T08:51:16.410Z
generated_at: 2026-06-18T08:51:16.410Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact input-terminal value table, eco-mode value table, base-model-type table, and PIP/PbP sub-input value table are referenced as Appendix \"Supplementary Information by Command\" which is not present in the refined source text."
  - "source lists multiple supported rates (115200/38400/19200/9600/4800) but does not state a single default"
  - "not stated; RTS/CTS pins present in pinout but mode not named"
  - "min/max obtained dynamically via 060-1 GAIN PARAMETER REQUEST 3 (DATA01=00h)\""
  - "via 060-1 (DATA01=01h)\""
  - "via 060-1 (DATA01=02h)\""
  - "via 060-1 (DATA01=03h)\""
  - "via 060-1 (DATA01=04h)\""
  - "via 060-1 (DATA01=05h)\""
  - "via 060-1 (DATA01=96h)\""
  - "value enum in Appendix 'Supplementary Information by Command' not in source\""
  - "no unsolicited notification documented in source. All responses are replies to commands."
  - "no multi-step sequences explicitly described in source."
  - "input-terminal value appendix, eco-mode value appendix, base-model-type value appendix, and PIP/PbP sub-input value appendix referenced but not included in the refined source."
  - "default/factory baud rate not stated — source lists supported rates (115200/38400/19200/9600/4800) but does not identify the default."
  - "serial flow_control mode not named in source."
  - "firmware version compatibility not stated in source."
  - "no voltage/current/power specifications present in this command-reference source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:51:16.410Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (18 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP-PH3501QL Control Spec

## Summary
Sharp/NEC NP-PH3501QL is a projector controllable via an RS-232C serial interface and a wired/wireless LAN using TCP port 7142. This spec covers the binary command protocol described in the Projector Control Command Reference Manual (BDT140013 Rev 7.1), including power, input switching, mute, picture/volume/aspect adjustment, lens and lens-memory control, and a broad set of status information requests.

<!-- UNRESOLVED: exact input-terminal value table, eco-mode value table, base-model-type table, and PIP/PbP sub-input value table are referenced as Appendix "Supplementary Information by Command" which is not present in the refined source text. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: null  # UNRESOLVED: source lists multiple supported rates (115200/38400/19200/9600/4800) but does not state a single default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: not stated; RTS/CTS pins present in pinout but mode not named
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 015/016 POWER ON/OFF commands present
  - routable     # inferred: 018 INPUT SW CHANGE present
  - queryable    # inferred: numerous REQUEST commands present
  - levelable    # inferred: 030-1/030-2 picture & volume adjust present
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
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Input terminal value (see Appendix 'Supplementary Information by Command'); e.g. 06h = Video port"

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
        type: string
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: DATA02
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA02
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA03
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Aspect value (see Appendix 'Supplementary Information by Command')"

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Adjustment target high byte: 96h = LAMP ADJUST / LIGHT ADJUST"
      - name: DATA02
        type: string
        description: "Adjustment target low byte: FFh for LAMP/LIGHT ADJUST"
      - name: DATA03
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative"
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
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: string
        description: "Content: 01h=Lamp usage time (sec), 04h=Lamp remaining life (%)"

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte (see Key code list, e.g. 05h=AUTO, 29h=PICTURE)"
      - name: DATA02
        type: integer
        description: "Key code high byte (typically 00h)"

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
        type: string
        description: "Lens target: 06h=Periphery Focus"
      - name: DATA02
        type: string
        description: "Motion: 00h=Stop, 01h/+1s, 02h/+0.5s, 03h/+0.25s, 7Fh/+continuous, 81h/-continuous, FDh/-0.25s, FEh/-0.5s, FFh/-1s"

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: string
        description: "Lens target (same values as 053 LENS CONTROL DATA01)"

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "FFh=Stop, otherwise lens target"
      - name: DATA02
        type: string
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: string
        description: "00h=OFF, 01h=ON"

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
        type: string
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
        type: string
        description: "Adjusted value name: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"

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
        type: string
        description: "01h=Freeze ON, 02h=Freeze OFF"

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: string
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
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST 2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
        type: string
        description: "Eco mode value (see Appendix 'Supplementary Information by Command')"

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
    params:
      - name: DATA01_DATA16
        type: string
        description: "Projector name, up to 16 bytes (NUL-terminated)"

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: string
        description: "Setting value (MODE: 00h=PIP/01h=PbP; START POSITION: 00h=top-left ... 03h=bottom-right; sub-input values per Appendix)"

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: string
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
        type: string
        description: "Input terminal value (see Appendix 'Supplementary Information by Command')"
      - name: DATA02
        type: string
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on]
    source: "078-2 RUNNING STATUS REQUEST DATA03"

  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    source: "078-2 RUNNING STATUS REQUEST DATA06"

  - id: cooling_process
    type: enum
    values: [not_executed, during_execution]
    source: "078-2 RUNNING STATUS REQUEST DATA04"

  - id: power_on_off_process
    type: enum
    values: [not_executed, during_execution]
    source: "078-2 RUNNING STATUS REQUEST DATA05"

  - id: picture_mute_state
    type: enum
    values: [off, on]
    source: "078-4 MUTE STATUS REQUEST DATA01"

  - id: sound_mute_state
    type: enum
    values: [off, on]
    source: "078-4 MUTE STATUS REQUEST DATA02"

  - id: onscreen_mute_state
    type: enum
    values: [off, on]
    source: "078-4 MUTE STATUS REQUEST DATA03"

  - id: forced_onscreen_mute_state
    type: enum
    values: [off, on]
    source: "078-4 MUTE STATUS REQUEST DATA04"

  - id: cover_status
    type: enum
    values: [normal_opened, cover_closed]
    source: "078-6 COVER STATUS REQUEST DATA01"

  - id: lens_status
    type: bitmask
    description: "DATA01 bitfield: bit0=Lens memory, bit1=Zoom, bit2=Focus, bit3=Lens Shift (H), bit4=Lens Shift (V) - 0=Stop, 1=During operation"
    source: "053-7 LENS INFORMATION REQUEST"

  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    source: "053-11 LENS PROFILE REQUEST"

  - id: edge_blending_mode_state
    type: enum
    values: [off, on]
    source: "097-243-1 EDGE BLENDING MODE REQUEST"

  - id: error_status
    type: bitmask
    description: "12-byte error bitfield (DATA01-DATA12); bit=0 normal, bit=1 error. See Error information list."
    source: "009 ERROR STATUS REQUEST"
```

## Variables
```yaml
variables:
  - id: picture_brightness
    range: "UNRESOLVED: min/max obtained dynamically via 060-1 GAIN PARAMETER REQUEST 3 (DATA01=00h)"
    set_via: "030-1 PICTURE ADJUST (DATA01=00h)"

  - id: picture_contrast
    range: "UNRESOLVED: via 060-1 (DATA01=01h)"
    set_via: "030-1 PICTURE ADJUST (DATA01=01h)"

  - id: picture_color
    range: "UNRESOLVED: via 060-1 (DATA01=02h)"
    set_via: "030-1 PICTURE ADJUST (DATA01=02h)"

  - id: picture_hue
    range: "UNRESOLVED: via 060-1 (DATA01=03h)"
    set_via: "030-1 PICTURE ADJUST (DATA01=03h)"

  - id: picture_sharpness
    range: "UNRESOLVED: via 060-1 (DATA01=04h)"
    set_via: "030-1 PICTURE ADJUST (DATA01=04h)"

  - id: volume
    range: "UNRESOLVED: via 060-1 (DATA01=05h)"
    set_via: "030-2 VOLUME ADJUST"

  - id: lamp_light_adjust
    range: "UNRESOLVED: via 060-1 (DATA01=96h)"
    set_via: "030-15 OTHER ADJUST (DATA01=96h DATA02=FFh)"

  - id: eco_mode
    values: "UNRESOLVED: value enum in Appendix 'Supplementary Information by Command' not in source"
    set_via: "098-8 ECO MODE SET"

  - id: projector_name
    type: string
    max_length: 16
    set_via: "098-45 LAN PROJECTOR NAME SET"
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification documented in source. All responses are replies to commands.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: "015. POWER ON"
    note: "While turning on power, no other command can be accepted."
  - command: "016. POWER OFF"
    note: "While turning off power (including cooling time), no other command can be accepted."
  - command: "053. LENS CONTROL"
    note: "Continuous drive (DATA02=7Fh/+ or 81h/-) must be stopped by sending DATA02=00h."
# Source documents error code 02h 0Dh "command cannot be accepted because the power is off" -
# many commands require power-on. No external-interlock procedure beyond the bitfield
# "interlock switch is open" reported in 009 ERROR STATUS REQUEST DATA09 bit1.
```

## Notes
- All commands are binary; responses are framed as `A<major>h <minor>h <ID1> <ID2> <LEN> <DATA...> <CKS>`. Successful responses use major byte `2Xh` (mirroring the command's major byte); error responses use `AXh` with `<ERR1> <ERR2>`.
- Checksum (CKS) = low-order byte of the sum of all preceding bytes.
- `ID1` = projector control ID; `ID2` = model code (varies by model).
- Lamp usage time and filter usage time are returned in seconds and updated at one-minute intervals.
- Lamp remaining life (%) may be negative if the replacement deadline is exceeded.
- Error codes are a two-byte combination of ERR1/ERR2 (see §2.4).
- Commands `02h`-prefixed (POWER/MUTE/SHUTTER/LENS CONTROL etc.) use response major `22h`; `03h`-prefixed use `23h`; `00h`-prefixed use `20h`; `01h`-prefixed (FREEZE) uses `21h`.
- RS-232C uses a D-SUB 9P cross cable; RTS/CTS pins are wired but no named flow-control mode is documented.
- Pin 1 of the LAN port function labels (TD±/RD±) are stated; PHY is auto-sensing 10/100.

<!-- UNRESOLVED: input-terminal value appendix, eco-mode value appendix, base-model-type value appendix, and PIP/PbP sub-input value appendix referenced but not included in the refined source. -->
<!-- UNRESOLVED: default/factory baud rate not stated — source lists supported rates (115200/38400/19200/9600/4800) but does not identify the default. -->
<!-- UNRESOLVED: serial flow_control mode not named in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: no voltage/current/power specifications present in this command-reference source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:17:28.160Z
last_checked_at: 2026-06-18T08:51:16.410Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:51:16.410Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (18 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact input-terminal value table, eco-mode value table, base-model-type table, and PIP/PbP sub-input value table are referenced as Appendix \"Supplementary Information by Command\" which is not present in the refined source text."
- "source lists multiple supported rates (115200/38400/19200/9600/4800) but does not state a single default"
- "not stated; RTS/CTS pins present in pinout but mode not named"
- "min/max obtained dynamically via 060-1 GAIN PARAMETER REQUEST 3 (DATA01=00h)\""
- "via 060-1 (DATA01=01h)\""
- "via 060-1 (DATA01=02h)\""
- "via 060-1 (DATA01=03h)\""
- "via 060-1 (DATA01=04h)\""
- "via 060-1 (DATA01=05h)\""
- "via 060-1 (DATA01=96h)\""
- "value enum in Appendix 'Supplementary Information by Command' not in source\""
- "no unsolicited notification documented in source. All responses are replies to commands."
- "no multi-step sequences explicitly described in source."
- "input-terminal value appendix, eco-mode value appendix, base-model-type value appendix, and PIP/PbP sub-input value appendix referenced but not included in the refined source."
- "default/factory baud rate not stated — source lists supported rates (115200/38400/19200/9600/4800) but does not identify the default."
- "serial flow_control mode not named in source."
- "firmware version compatibility not stated in source."
- "no voltage/current/power specifications present in this command-reference source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
