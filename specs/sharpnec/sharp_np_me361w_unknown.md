---
spec_id: admin/sharp-nec-np-me361w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP ME361W Control Spec"
manufacturer: Sharp/NEC
model_family: "NP ME361W"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP ME361W"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:57:41.603Z
last_checked_at: 2026-06-18T08:38:32.837Z
generated_at: 2026-06-18T08:38:32.837Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "input terminal DATA01 value map deferred to \"Supplementary Information by Command\" appendix not present in refined source"
  - "eco mode DATA01 value map deferred to appendix not present in source"
  - "sub input setting value map deferred to appendix not present in source"
  - "base model type value map deferred to appendix not present in source"
  - "source documents parameter-setting sub-commands (picture adjust,"
  - "source describes only request/response model. No unsolicited"
  - "source documents no multi-step command sequences."
  - "input terminal value map (018, 319-10) — appendix not in source"
  - "aspect value map (030-12) — appendix not in source"
  - "eco mode value map (097-8, 098-8) — appendix not in source"
  - "sub input setting value map (097-198, 098-198) — appendix not in source"
  - "base model type value map (078-1, 305-1) — appendix not in source"
  - "053 LENS CONTROL DATA01 documents only 06h (Periphery Focus) — other lens targets (zoom/focus/shift) implied but not enumerated in source"
  - "power / voltage / lamp wattage specs not in this control-protocol document"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:38:32.837Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP ME361W Control Spec

## Summary
Sharp/NEC NP ME361W projector control spec. Supports RS-232C serial and TCP/IP LAN control. Binary command protocol with hex-byte frames, checksum (low-order byte of sum of preceding bytes). 53 distinct commands covering power, input switching, mutes, picture/volume/aspect/lamp adjust, lens control and memory, status queries, eco mode, edge blending, PIP/PbP, audio select.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: input terminal DATA01 value map deferred to "Supplementary Information by Command" appendix not present in refined source -->
<!-- UNRESOLVED: eco mode DATA01 value map deferred to appendix not present in source -->
<!-- UNRESOLVED: sub input setting value map deferred to appendix not present in source -->
<!-- UNRESOLVED: base model type value map deferred to appendix not present in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source states supported rates: 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: full-duplex communication mode stated, no flow control field in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred from POWER ON/OFF commands (015/016)
  - queryable       # inferred from many request/status commands (009/037/078/097/305)
  - levelable       # inferred from picture/volume/lamp adjust commands (030-1/030-2/030-15)
  - routable        # inferred from INPUT SW CHANGE (018) and audio select (319-10)
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
      type: byte
      description: "Input terminal. Value map deferred to appendix 'Supplementary Information by Command' - UNRESOLVED. Example 06h = video port."

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
      type: byte
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: byte
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: DATA03
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: byte
      description: "Adjustment value (high-order 8 bits)"

- id: volume_adjust_030_2
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: DATA02
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: byte
      description: "Adjustment value (high-order 8 bits)"

- id: aspect_adjust_030_12
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Value set for aspect. Map deferred to appendix 'Supplementary Information by Command' - UNRESOLVED."

- id: other_adjust_030_15
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Adjustment target (DATA01=96h, DATA02=FFh → LAMP ADJUST / LIGHT ADJUST per source table)"
    - name: DATA02
      type: byte
      description: "Sub-target; FFh pairs with DATA01=96h for LAMP/LIGHT ADJUST"
    - name: DATA03
      type: byte
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: DATA04
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: byte
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

- id: lamp_information_request_3_037_4
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Lamp select: 00h=Lamp 1, 01h=Lamp 2 (Lamp 2 only on two-lamp models)"
    - name: DATA02
      type: byte
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

- id: carbon_savings_information_request_037_6
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code_050
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Key code low byte (WORD type). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: byte
      description: "Key code high byte (always 00h per source table)"

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
      type: byte
      description: "Lens target: 06h=Periphery Focus (only value documented in source table)"
    - name: DATA02
      type: byte
      description: "Content: 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"

- id: lens_control_request_053_1
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Lens target (see 053 LENS CONTROL)"

- id: lens_control_2_053_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Target: FFh=Stop (adjustment mode/value not referenced when FFh)"
    - name: DATA02
      type: byte
      description: "Adjustment mode: 00h=absolute value, 02h=relative value"
    - name: DATA03
      type: byte
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: byte
      description: "Adjustment value (high-order 8 bits)"

- id: lens_memory_control_053_3
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control_053_4
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_request_053_5
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set_053_6
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: byte
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
      type: byte
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request_053_11
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3_060_1
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: byte
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
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request_084
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Information type: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

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
      type: byte
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
      type: byte
      description: "Value set for eco mode. Map deferred to appendix 'Supplementary Information by Command' - UNRESOLVED."

- id: lan_projector_name_set_098_45
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: DATA01_to_DATA16
      type: string
      description: "Projector name (up to 16 bytes), NUL-terminated"

- id: pip_picture_by_picture_set_098_198
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: byte
      description: "Setting value. For MODE: 00h=PIP, 01h=PICTURE BY PICTURE. For START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. For SUB INPUT: sub input value (map deferred to appendix - UNRESOLVED)"

- id: edge_blending_mode_set_098_243_1
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: byte
      description: "Setting value: 00h=OFF, 01h=ON"

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
      type: byte
      description: "Input terminal. Value map deferred to appendix 'Supplementary Information by Command' - UNRESOLVED."
    - name: DATA02
      type: byte
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  type: bitmask
  description: "12-byte error bitmap returned by 009 ERROR STATUS REQUEST. DATA01-DATA12. Bit=0 normal, Bit=1 error. Source defines bit meanings for DATA01-04 (cover/fan/temp/power/lamp errors), DATA09 (extended status: portrait orientation, interlock switch open, slave/formatter system errors). DATA05-08, DATA10-12 reserved."

- id: command_execution_result
  type: enum
  values: [success, error]
  description: "Ack response returned by A2h/A3h prefix commands; success carries data or empty, failure carries ERR1/ERR2 pair. ERR1/ERR2 map per source §2.4."

- id: input_switch_result
  type: enum
  values: [switched, error_no_signal]
  description: "018 INPUT SW CHANGE response DATA01: FFh = ended with error (no signal switch made)."

- id: remote_key_result
  type: enum
  values: [accepted, error]
  description: "050 REMOTE KEY CODE response DATA01: FFh = ended with error."

- id: lens_control_result
  type: enum
  values: [accepted, error]
  description: "053 LENS CONTROL response DATA01: FFh = ended with error."

- id: lens_memory_result
  type: enum
  values: [move, store, reset, error]
  description: "053-3/053-4 response DATA01: 00h=MOVE, 01h=STORE, 02h=RESET, FFh=error."

- id: power_status
  type: enum
  values: [standby, power_on]
  description: "078-2 RUNNING STATUS REQUEST DATA03: 00h=Standby, 01h=Power on, FFh=Not supported."

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "078-2 DATA06: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby."

- id: mute_status
  type: object
  description: "078-4 returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display each as 00h=off / 01h=on."

- id: cover_status
  type: enum
  values: [normal_open, closed]
  description: "078-6 COVER STATUS REQUEST DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: eco_mode_value
  type: byte
  description: "097-8 ECO MODE REQUEST returns eco/light/lamp mode value. Map deferred to appendix - UNRESOLVED."

- id: edge_blending_mode
  type: enum
  values: [off, on]
  description: "097-243-1 returns DATA01: 00h=OFF, 01h=ON."

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  description: "053-11 LENS PROFILE REQUEST DATA01: 00h=Profile 1, 01h=Profile 2."

- id: lens_information_bitmask
  type: bitmask
  description: "053-7 LENS INFORMATION REQUEST DATA01 bits: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V); 0=Stop, 1=During operation."

- id: lamp_information
  type: object
  description: "037-4 returns lamp usage time (seconds) or remaining life (%) per DATA02 select. Negative remaining life if replacement deadline exceeded."

- id: carbon_savings
  type: object
  description: "037-6 returns DATA02-05 kilograms (max 99999 kg) + DATA06-09 milligrams (max 999999 mg)."

- id: filter_usage
  type: object
  description: "037-3 returns filter usage time (seconds) + filter alarm start time (seconds). -1 if undefined."
```

## Variables
```yaml
# UNRESOLVED: source documents parameter-setting sub-commands (picture adjust,
# volume adjust, aspect, eco mode, lens position) but exposes them as discrete
# actions rather than named settable variables. No separate variable namespace
# is described. Populate as actions instead.
```

## Events
```yaml
# UNRESOLVED: source describes only request/response model. No unsolicited
# notification / push event documented.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON (015): no other command accepted while power is turning on."
  - "POWER OFF (016): no other command accepted during power-off including cooling time."
# Source contains no explicit safety interlock procedure beyond power-state
# command-acceptance windows above. Error bitmap (009) surfaces interlock-switch-open
# (DATA09 Bit1) and cover errors - treat as status observability, not control interlock.
```

## Notes
- Checksum (CKS): low-order one byte of sum of all preceding bytes. Worked example in source §2.2.
- Command/response frame format (hex): `20h 88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>`. ID1 = control ID set on projector; ID2 = model code (varies by model).
- Error responses use prefix A0h/A1h/A2h/A3h carrying `<ERR1> <ERR2> <CKS>`. ERR1/ERR2 code table in source §2.4 (00h/00h=unrecognized, 02h/0Dh=power off reject, 02h/0Fh=no authority, etc.).
- Usage-time queries (lamp, filter) update at one-minute intervals despite one-second resolution.
- Source refers to an Appendix "Supplementary Information by Command" for several value maps (input terminal, aspect, eco mode, sub input, base model type). Appendix not present in refined source → those params marked UNRESOLVED.

<!-- UNRESOLVED: input terminal value map (018, 319-10) — appendix not in source -->
<!-- UNRESOLVED: aspect value map (030-12) — appendix not in source -->
<!-- UNRESOLVED: eco mode value map (097-8, 098-8) — appendix not in source -->
<!-- UNRESOLVED: sub input setting value map (097-198, 098-198) — appendix not in source -->
<!-- UNRESOLVED: base model type value map (078-1, 305-1) — appendix not in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: 053 LENS CONTROL DATA01 documents only 06h (Periphery Focus) — other lens targets (zoom/focus/shift) implied but not enumerated in source -->
<!-- UNRESOLVED: power / voltage / lamp wattage specs not in this control-protocol document -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:57:41.603Z
last_checked_at: 2026-06-18T08:38:32.837Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:38:32.837Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "input terminal DATA01 value map deferred to \"Supplementary Information by Command\" appendix not present in refined source"
- "eco mode DATA01 value map deferred to appendix not present in source"
- "sub input setting value map deferred to appendix not present in source"
- "base model type value map deferred to appendix not present in source"
- "source documents parameter-setting sub-commands (picture adjust,"
- "source describes only request/response model. No unsolicited"
- "source documents no multi-step command sequences."
- "input terminal value map (018, 319-10) — appendix not in source"
- "aspect value map (030-12) — appendix not in source"
- "eco mode value map (097-8, 098-8) — appendix not in source"
- "sub input setting value map (097-198, 098-198) — appendix not in source"
- "base model type value map (078-1, 305-1) — appendix not in source"
- "053 LENS CONTROL DATA01 documents only 06h (Periphery Focus) — other lens targets (zoom/focus/shift) implied but not enumerated in source"
- "power / voltage / lamp wattage specs not in this control-protocol document"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
