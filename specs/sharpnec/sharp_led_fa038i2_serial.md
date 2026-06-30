---
spec_id: admin/sharp-nec-led-fa038i2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FA038I2 Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FA038I2"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FA038I2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:54:56.648Z
last_checked_at: 2026-06-18T08:03:37.786Z
generated_at: 2026-06-18T08:03:37.786Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "appendix \"Supplementary Information by Command\" not present in refined source — input terminal values, aspect values, eco mode values, sub-input values, base model type values referenced but not enumerated."
  - "source states \"Full duplex\" communication mode but does not specify flow control type"
  - "appendix not in refined source).\""
  - "value list in appendix, not in refined source).\""
  - "source documents no multi-step sequences."
  - "firmware version compatibility not stated in source."
  - "appendix value tables (input terminals, aspect, eco mode, sub-inputs, base model types) not in refined source."
  - "flow_control type not stated; source only says \"Full duplex\"."
  - "ID2 model code value not stated; varies by model."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:03:37.786Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FA038I2 Control Spec

## Summary
Sharp/NEC LED FA038I2 projector control spec. Binary frame protocol over RS-232C serial (PC CONTROL D-SUB 9P) and wired/wireless LAN (TCP port 7142). Covers power, input switching, mutes, picture/volume/aspect adjust, lens control and memory, status queries, and PIP/PbP/edge-blend settings.

<!-- UNRESOLVED: appendix "Supplementary Information by Command" not present in refined source — input terminal values, aspect values, eco mode values, sub-input values, base model type values referenced but not enumerated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source: 115200/38400/19200/9600/4800 selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: source states "Full duplex" communication mode but does not specify flow control type
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # POWER ON / POWER OFF
  - routable        # INPUT SW CHANGE, AUDIO SELECT SET
  - queryable       # many status/information request commands
  - levelable       # PICTURE ADJUST, VOLUME ADJUST, OTHER ADJUST, LENS CONTROL
```

## Actions
```yaml
actions:
  - id: error_status_request_009
    label: "009 ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []

  - id: power_on_015
    label: "015 POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []

  - id: power_off_016
    label: "016 POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []

  - id: input_sw_change_018
    label: "018 INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Input terminal. Example: 06h=video port. Full value list in appendix (UNRESOLVED: appendix not in refined source)."

  - id: picture_mute_on_020
    label: "020 PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []

  - id: picture_mute_off_021
    label: "021 PICTURE MUTE OFF"
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: sound_mute_on_022
    label: "022 SOUND MUTE ON"
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []

  - id: sound_mute_off_023
    label: "023 SOUND MUTE OFF"
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: onscreen_mute_on_024
    label: "024 ONSCREEN MUTE ON"
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []

  - id: onscreen_mute_off_025
    label: "025 ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust_030_1
    label: "030-1 PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: data02
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: volume_adjust_030_2
    label: "030-2 VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data02
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data03
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: aspect_adjust_030_12
    label: "030-12 ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: data01
        type: integer
        description: "Aspect value (UNRESOLVED: value list in appendix, not in refined source)."

  - id: other_adjust_030_15
    label: "030-15 OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Adjustment target: 96h=LAMP ADJUST / LIGHT ADJUST"
      - name: data02
        type: integer
        description: "DATA02 fixed FFh per source. Adjustment mode in DATA03."
      - name: data03
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data04
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data05
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: information_request_037
    label: "037 INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []

  - id: filter_usage_info_request_037_3
    label: "037-3 FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []

  - id: lamp_info_request_037_4
    label: "037-4 LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: data02
        type: integer
        description: "Content: 01h=usage time (seconds), 04h=remaining life (%)"

  - id: carbon_savings_request_037_6
    label: "037-6 CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: remote_key_code_050
    label: "050 REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Key code low byte (WORD type). See key code list e.g. 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
      - name: data02
        type: integer
        description: "Key code high byte (WORD type). Listed values all 00h."

  - id: shutter_close_051
    label: "051 SHUTTER CLOSE"
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: shutter_open_052
    label: "052 SHUTTER OPEN"
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  - id: lens_control_053
    label: "053 LENS CONTROL"
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Lens target. 06h=Periphery Focus (only value listed in source)."
      - name: data02
        type: integer
        description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus, 81h=drive minus, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"

  - id: lens_control_request_053_1
    label: "053-1 LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: data01
        type: integer
        description: "Lens target (same target space as 053 LENS CONTROL)."

  - id: lens_control_2_053_2
    label: "053-2 LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Lens target. FFh=Stop (mode/value ignored)."
      - name: data02
        type: integer
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: data03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: lens_memory_control_053_3
    label: "053-3 LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control_053_4
    label: "053-4 REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET (on profile selected via 053-10)"

  - id: lens_memory_option_request_053_5
    label: "053-5 LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set_053_6
    label: "053-6 LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: data02
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: lens_information_request_053_7
    label: "053-7 LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

  - id: lens_profile_set_053_10
    label: "053-10 LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request_053_11
    label: "053-11 LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_060_1
    label: "060-1 GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: data01
        type: integer
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST / LIGHT ADJUST"

  - id: setting_request_078_1
    label: "078-1 SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []

  - id: running_status_request_078_2
    label: "078-2 RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []

  - id: input_status_request_078_3
    label: "078-3 INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []

  - id: mute_status_request_078_4
    label: "078-4 MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []

  - id: model_name_request_078_5
    label: "078-5 MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  - id: cover_status_request_078_6
    label: "078-6 COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []

  - id: freeze_control_079
    label: "079 FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "01h=freeze ON, 02h=freeze OFF"

  - id: information_string_request_084
    label: "084 INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: data01
        type: integer
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  - id: eco_mode_request_097_8
    label: "097-8 ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []

  - id: lan_projector_name_request_097_45
    label: "097-45 LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: lan_mac_address_request_097_155
    label: "097-155 LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_pbp_request_097_198
    label: "097-198 PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_request_097_243_1
    label: "097-243-1 EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set_098_8
    label: "098-8 ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Eco mode value (UNRESOLVED: value list in appendix, not in refined source)."

  - id: lan_projector_name_set_098_45
    label: "098-45 LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
    params:
      - name: name
        type: string
        description: "Projector name, up to 16 bytes (DATA01-DATA16). NUL-terminated."

  - id: pip_pbp_set_098_198
    label: "098-198 PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: data02
        type: integer
        description: "Setting value. MODE: 00h=PIP, 01h=PbP. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub-input values in appendix (UNRESOLVED)."

  - id: edge_blending_set_098_243_1
    label: "098-243-1 EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: base_model_type_request_305_1
    label: "305-1 BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []

  - id: serial_number_request_305_2
    label: "305-2 SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  - id: basic_information_request_305_3
    label: "305-3 BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []

  - id: audio_select_set_319_10
    label: "319-10 AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: data01
        type: integer
        description: "Input terminal (values in appendix, UNRESOLVED in refined source)."
      - name: data02
        type: integer
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitmask
    description: "009 response DATA01-DATA12. Bit set to 1 = error. See source error information list (cover, fan, temp, lamp, mirror cover, interlock switch, etc.)."

  - id: power_status
    type: enum
    values: [standby, power_on]
    description: "078-2 DATA03: 00h=Standby, 01h=Power on, FFh=Not supported"

  - id: cooling_status
    type: enum
    values: [not_executed, during_execution]
    description: "078-2 DATA04"

  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    description: "078-2 DATA06: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"

  - id: mute_status
    type: composite
    description: "078-4: DATA01=Picture mute, DATA02=Sound mute, DATA03=Onscreen mute, DATA04=Forced onscreen mute, DATA05=Onscreen display. Each 00h=Off, 01h=On."

  - id: cover_status
    type: enum
    values: [normal_opened, closed]
    description: "078-6 DATA01: 00h=Normal(cover opened), 01h=Cover closed"

  - id: lens_information
    type: bitmask
    description: "053-7 DATA01: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V). 0=Stop, 1=During operation."

  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    description: "053-11 DATA01: 00h=Profile 1, 01h=Profile 2"

  - id: eco_mode
    type: raw
    description: "097-8 DATA01. Values in appendix (UNRESOLVED)."

  - id: edge_blending_mode
    type: enum
    values: ["off", "on"]
    description: "097-243-1 DATA01: 00h=OFF, 01h=ON"

  - id: projector_name
    type: string
    description: "097-45 DATA01-17, NUL-terminated."

  - id: mac_address
    type: raw
    description: "097-155 DATA01-06 (6 bytes)."

  - id: model_name
    type: string
    description: "078-5 DATA01-32, NUL-terminated."

  - id: base_model_type
    type: raw
    description: "305-1 DATA01-DATA15. Type + model name + type (values in appendix, UNRESOLVED)."

  - id: serial_number
    type: string
    description: "305-2 DATA01-16, NUL-terminated."

  - id: lamp_usage_seconds
    type: integer
    description: "037-4 (content 01h) DATA03-06. Updated at 1-minute intervals."

  - id: lamp_remaining_life_percent
    type: integer
    description: "037-4 (content 04h). Negative if replacement deadline exceeded."

  - id: filter_usage_seconds
    type: integer
    description: "037-3 DATA01-04. -1 if undefined."

  - id: carbon_savings
    type: composite
    description: "037-6: DATA02-05=kg (max 99999), DATA06-09=mg (max 999999)."
```

## Variables
```yaml
variables:
  - id: picture_brightness
    description: "030-1 target 00h"
  - id: picture_contrast
    description: "030-1 target 01h"
  - id: picture_color
    description: "030-1 target 02h"
  - id: picture_hue
    description: "030-1 target 03h"
  - id: picture_sharpness
    description: "030-1 target 04h"
  - id: volume
    description: "030-2"
  - id: aspect
    description: "030-12 (values UNRESOLVED from appendix)"
  - id: lamp_light_adjust
    description: "030-15 target 96h"
  - id: eco_mode_value
    description: "098-8 (values UNRESOLVED from appendix)"
  - id: projector_name_var
    description: "098-45 (up to 16 bytes)"
```

## Events
```yaml
# Source documents no unsolicited notifications. All responses are to commands.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on_015
    note: "While powering on, no other command accepted."
  - command: power_off_016
    note: "While powering off (including cooling time), no other command accepted."
# Error code 020h-0Dh: command rejected when power is off.
```

## Notes
- Binary frame protocol: every command/response is a hex byte sequence ending in `<CKS>` checksum. Checksum = low byte of sum of all preceding bytes (see source §2.2 example).
- Frame markers: `20h`/`21h`/`22h`/`23h` = command/response leading bytes by command-type group; `A0h`/`A1h`/`A2h`/`A3h` = error-response leading bytes.
- 9-pin D-SUB wired as cross cable: pin2(RxD)↔TxD, pin3(TxD)↔RxD, pin7(RTS)↔CTS, pin8(CTS)↔RTS, pin5(GND)↔GND.
- Error code table (§2.4) covers ERR1/ERR2 combos: command unrecognized, not supported, invalid value, invalid input, invalid language, memory errors, forced mute, viewer error, no signal, test pattern shown, no PC card, memory op error, entry list shown, power-off rejection, exec failure, no authority, invalid gain, adjustment failed.
- Information updates (lamp/filter usage, gain values) refresh at 1-minute intervals despite second-unit precision.
- 053 LENS CONTROL: continuous drive (`7Fh`/`81h`) requires explicit `00h` to stop.
- Appendix "Supplementary Information by Command" referenced for input terminal, aspect, eco mode, sub-input, and base-model-type value enumerations — not present in refined source.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: appendix value tables (input terminals, aspect, eco mode, sub-inputs, base model types) not in refined source. -->
<!-- UNRESOLVED: flow_control type not stated; source only says "Full duplex". -->
<!-- UNRESOLVED: ID2 model code value not stated; varies by model. -->
```

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:54:56.648Z
last_checked_at: 2026-06-18T08:03:37.786Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:03:37.786Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "appendix \"Supplementary Information by Command\" not present in refined source — input terminal values, aspect values, eco mode values, sub-input values, base model type values referenced but not enumerated."
- "source states \"Full duplex\" communication mode but does not specify flow control type"
- "appendix not in refined source).\""
- "value list in appendix, not in refined source).\""
- "source documents no multi-step sequences."
- "firmware version compatibility not stated in source."
- "appendix value tables (input terminals, aspect, eco mode, sub-inputs, base model types) not in refined source."
- "flow_control type not stated; source only says \"Full duplex\"."
- "ID2 model code value not stated; varies by model."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
