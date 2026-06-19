---
spec_id: admin/sharp-nec-ma491-ir
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ma491 Control Spec"
manufacturer: Sharp/NEC
model_family: Ma491
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - Ma491
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:10:23.660Z
last_checked_at: 2026-06-18T08:27:08.011Z
generated_at: 2026-06-18T08:27:08.011Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model name \"Ma491\" supplied externally; the source manual is generic and does not name a specific model. Appendix \"Supplementary Information by Command\" (referenced for input terminal, aspect, eco mode, base model type, signal type, and sub-input value lists) is not present in this refined source."
  - "flow control setting not stated in source (RTS/CTS pins wired in D-SUB 9P pinout but no flow-control mode specified)"
  - "appendix not in this source.\""
  - "value list in source Appendix not present.\""
  - "min/max/default reported by device via 060-1"
  - "no event/notification mechanism stated in source."
  - "no macros documented."
  - "input terminal value list (018, 319-10), aspect value list (030-12), eco mode value list (097-8/098-8), base model type values (078-1/305-1), selection signal type values, and sub-input setting values are defined in the source Appendix \"Supplementary Information by Command\", which is absent from this refined document."
  - "flow control mode not stated (RTS/CTS pins are wired in the D-SUB 9P pinout but no flow-control setting is specified)."
  - "firmware version compatibility not stated in source."
  - "wireless LAN unit communication conditions deferred to the wireless LAN unit's operation manual."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:27:08.011Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ma491 Control Spec

## Summary
Control spec for the Sharp/NEC Ma491 projector, derived from the vendor "Projector Control Command Reference Manual" (BDT140013 Rev 7.1). The device supports RS-232C serial control and wired/wireless LAN control over TCP port 7142, using a binary hex command protocol with checksummed frames. Covers power, input switching, mutes, picture/volume/lens adjustment, lens memory, status queries, and LAN settings.

<!-- UNRESOLVED: model name "Ma491" supplied externally; the source manual is generic and does not name a specific model. Appendix "Supplementary Information by Command" (referenced for input terminal, aspect, eco mode, base model type, signal type, and sub-input value lists) is not present in this refined source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: "4800|9600|19200|38400|115200"  # selectable (bps), per source communication conditions table; no single default stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control setting not stated in source (RTS/CTS pins wired in D-SUB 9P pinout but no flow-control mode specified)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable   # inferred from POWER ON/OFF (015/016)
- queryable   # inferred from numerous request/status commands
- levelable   # inferred from PICTURE ADJUST / VOLUME ADJUST / OTHER (LAMP) ADJUST
- routable    # inferred from INPUT SW CHANGE (018) input terminal switching
```

## Actions
```yaml
# Frame notes (verbatim from source section 2):
#  - Controller-sent command first byte is a category byte (00h-03h). Success responses
#    prefix that byte with +20h (e.g. 02h -> 22h); error responses prefix with +A0h (02h -> A2h).
#  - <CKS> = checksum = low-order one byte of the sum of ALL preceding bytes.
#  - <ID1> = control ID set on projector; <ID2> = model code. These appear in RESPONSES only,
#    not in the controller-sent payloads below.
#  - <DATAxx> placeholders are reproduced verbatim from the source command templates.
#  - Several value lists (input terminal, aspect, eco mode, base model type, signal type,
#    sub-input) are defined in the source's Appendix "Supplementary Information by Command",
#    which is not included in this refined document (marked UNRESOLVED in params).

actions:
  - id: cmd_009_error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []

  - id: cmd_015_power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []

  - id: cmd_016_power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []

  - id: cmd_018_input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: bytes
        description: "Input terminal byte (example: 06h = video port). Full value list in source Appendix 'Supplementary Information by Command'. UNRESOLVED: appendix not in this source."

  - id: cmd_020_picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []

  - id: cmd_021_picture_mute_off
    label: "021. PICTURE MUTE OFF"
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  - id: cmd_022_sound_mute_on
    label: "022. SOUND MUTE ON"
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []

  - id: cmd_023_sound_mute_off
    label: "023. SOUND MUTE OFF"
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  - id: cmd_024_onscreen_mute_on
    label: "024. ONSCREEN MUTE ON"
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []

  - id: cmd_025_onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: cmd_030_1_picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: enum
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: DATA02
        type: enum
        description: "Adjustment mode: 00h=absolute value, 01h=relative value"
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: cmd_030_2_volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: DATA01
        type: enum
        description: "Adjustment mode: 00h=absolute value, 01h=relative value"
      - name: DATA02
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA03
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: cmd_030_12_aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: bytes
        description: "Aspect value byte. Value list in source Appendix 'Supplementary Information by Command'. UNRESOLVED: appendix not in this source."

  - id: cmd_030_15_other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: DATA01
        type: bytes
        description: "Adjustment target high byte (96h for LAMP ADJUST / LIGHT ADJUST)"
      - name: DATA02
        type: bytes
        description: "Adjustment target low byte (FFh for LAMP ADJUST / LIGHT ADJUST)"
      - name: DATA03
        type: enum
        description: "Adjustment mode: 00h=absolute value, 01h=relative value"
      - name: DATA04
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA05
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: cmd_037_information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []

  - id: cmd_037_3_filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []

  - id: cmd_037_4_lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: enum
        description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (Lamp 2 only on two-lamp models)"
      - name: DATA02
        type: enum
        description: "Content: 01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

  - id: cmd_037_6_carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: enum
        description: "Scope: 00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: cmd_050_remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: bytes
        description: "Key code low byte (WORD type). Source key code list: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
      - name: DATA02
        type: bytes
        description: "Key code high byte (WORD type); 00h for all listed keys"

  - id: cmd_051_shutter_close
    label: "051. SHUTTER CLOSE"
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  - id: cmd_052_shutter_open
    label: "052. SHUTTER OPEN"
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  - id: cmd_053_lens_control
    label: "053. LENS CONTROL"
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: bytes
        description: "Lens target (06h=Periphery Focus)"
      - name: DATA02
        type: enum
        description: "Drive content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus, 81h=drive minus, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"

  - id: cmd_053_1_lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: bytes
        description: "Lens target to read adjusted values for"

  - id: cmd_053_2_lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: bytes
        description: "Lens target (FFh=Stop; when Stop, DATA02-DATA04 are not referenced)"
      - name: DATA02
        type: enum
        description: "Adjustment mode: 00h=absolute value, 02h=relative value"
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: cmd_053_3_lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: enum
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

  - id: cmd_053_4_reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: enum
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET (acts on profile set via 053-10)"

  - id: cmd_053_5_lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: enum
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: cmd_053_6_lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: enum
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: enum
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: cmd_053_7_lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

  - id: cmd_053_10_lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: enum
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  - id: cmd_053_11_lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: cmd_060_1_gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: DATA01
        type: enum
        description: "Adjusted value name: 00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"

  - id: cmd_078_1_setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []

  - id: cmd_078_2_running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []

  - id: cmd_078_3_input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []

  - id: cmd_078_4_mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []

  - id: cmd_078_5_model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  - id: cmd_078_6_cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []

  - id: cmd_079_freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: enum
        description: "Freeze state: 01h=ON, 02h=OFF"

  - id: cmd_084_information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: enum
        description: "Information type: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

  - id: cmd_097_8_eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []

  - id: cmd_097_45_lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: cmd_097_155_lan_mac_address_status_request2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: cmd_097_198_pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: enum
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: cmd_097_243_1_edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: cmd_098_8_eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: bytes
        description: "Eco mode value byte. Value list in source Appendix 'Supplementary Information by Command'. UNRESOLVED: appendix not in this source."

  - id: cmd_098_45_lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
    params:
      - name: DATA01_16
        type: bytes
        description: "Projector name, up to 16 bytes (NUL-terminated). Source writes <DATA01> - <DATA16>."

  - id: cmd_098_198_pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: enum
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: bytes
        description: "Setting value (mode: 00h=PIP/01h=PICTURE BY PICTURE; start position: 00h=TOP-LEFT,01h=TOP-RIGHT,02h=BOTTOM-LEFT,03h=BOTTOM-RIGHT; sub-input values in source Appendix)"

  - id: cmd_098_243_1_edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: enum
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: cmd_305_1_base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []

  - id: cmd_305_2_serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  - id: cmd_305_3_basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []

  - id: cmd_319_10_audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: bytes
        description: "Input terminal byte. Value list in source Appendix 'Supplementary Information by Command'. UNRESOLVED: appendix not in this source."
      - name: DATA02
        type: enum
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# One entry per observable status returned by a query response. Response frames carry
# <ID1> <ID2> and a <CKS>; error responses use prefix +A0h on the category byte.
feedbacks:
  - id: error_status
    source_action: cmd_009_error_status_request
    type: bytes
    description: "DATA01-DATA12 error bitfield; bit=0 normal, bit=1 error (cover/fan/temp/power/lamp/formatter/mirror cover/interlock/etc.)"

  - id: power_status
    source_action: cmd_078_2_running_status_request
    type: enum
    values: [standby, power_on]
    description: "DATA03: 00h=Standby, 01h=Power on"

  - id: cooling_process
    source_action: cmd_078_2_running_status_request
    type: enum
    values: [not_executed, during_execution]
    description: "DATA04: 00h=Not executed, 01h=During execution"

  - id: power_onoff_process
    source_action: cmd_078_2_running_status_request
    type: enum
    values: [not_executed, during_execution]
    description: "DATA05: 00h=Not executed, 01h=During execution"

  - id: operation_status
    source_action: cmd_078_2_running_status_request
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    description: "DATA06: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"

  - id: input_signal_status
    source_action: cmd_078_3_input_status_request
    type: bytes
    description: "Signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern, content displayed"

  - id: mute_status
    source_action: cmd_078_4_mute_status_request
    type: bytes
    description: "DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display (00h=Off / 01h=On each)"

  - id: model_name
    source_action: cmd_078_5_model_name_request
    type: string
    description: "DATA01-32 model name (NUL-terminated)"

  - id: cover_status
    source_action: cmd_078_6_cover_status_request
    type: enum
    values: [normal_opened, cover_closed]
    description: "DATA01: 00h=Normal(cover opened), 01h=Cover closed"

  - id: projector_information
    source_action: cmd_037_information_request
    type: bytes
    description: "DATA01-49 projector name; DATA83-86 lamp usage time (seconds); DATA87-90 filter usage time (seconds). Updated at 1-minute intervals."

  - id: filter_usage
    source_action: cmd_037_3_filter_usage_information_request
    type: integer
    description: "DATA01-04 filter usage time (seconds); DATA05-08 filter alarm start time (seconds); -1 if undefined"

  - id: lamp_information
    source_action: cmd_037_4_lamp_information_request_3
    type: bytes
    description: "DATA03-06 obtained info (usage seconds or remaining life %). Negative remaining life if replacement deadline exceeded."

  - id: carbon_savings
    source_action: cmd_037_6_carbon_savings_information_request
    type: bytes
    description: "DATA02-05 Carbon Savings (kg, max 99999); DATA06-09 Carbon Savings (mg, max 999999)"

  - id: lens_status
    source_action: cmd_053_7_lens_information_request
    type: bytes
    description: "DATA01 operation bits: Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift(H), Bit4 Lens Shift(V) (0=Stop, 1=During operation)"

  - id: lens_position
    source_action: cmd_053_1_lens_control_request
    type: bytes
    description: "DATA02-07 upper/lower limits and current value for the requested lens target"

  - id: lens_profile
    source_action: cmd_053_11_lens_profile_request
    type: enum
    values: [profile_1, profile_2]
    description: "DATA01: 00h=Profile 1, 01h=Profile 2"

  - id: lens_memory_option
    source_action: cmd_053_5_lens_memory_option_request
    type: bytes
    description: "DATA01 option (00h LOAD BY SIGNAL / 01h FORCED MUTE), DATA02 value (00h OFF / 01h ON)"

  - id: gain_parameter
    source_action: cmd_060_1_gain_parameter_request_3
    type: bytes
    description: "DATA01 status, DATA02-13 upper/lower/default/current/wide/narrow adjustment widths, DATA14 default validity"

  - id: setting_info
    source_action: cmd_078_1_setting_request
    type: bytes
    description: "DATA01-03 base model type, DATA04 sound function (00h not available / 01h available), DATA05 profile/clock/sleep-timer function"

  - id: eco_mode
    source_action: cmd_097_8_eco_mode_request
    type: bytes
    description: "DATA01 eco mode value. UNRESOLVED: value list in source Appendix not present."

  - id: lan_projector_name
    source_action: cmd_097_45_lan_projector_name_request
    type: string
    description: "DATA01-17 projector name (NUL-terminated)"

  - id: lan_mac_address
    source_action: cmd_097_155_lan_mac_address_status_request2
    type: bytes
    description: "DATA01-06 MAC address"

  - id: pip_picture_by_picture
    source_action: cmd_097_198_pip_picture_by_picture_request
    type: bytes
    description: "DATA01 target, DATA02 setting value (mode / start position / sub input)"

  - id: edge_blending_mode
    source_action: cmd_097_243_1_edge_blending_mode_request
    type: enum
    values: [off, on]
    description: "DATA01: 00h=OFF, 01h=ON"

  - id: base_model_type
    source_action: cmd_305_1_base_model_type_request
    type: bytes
    description: "DATA01-02 / DATA12-13 base model type; DATA03-11 model name (NUL-terminated)"

  - id: serial_number
    source_action: cmd_305_2_serial_number_request
    type: string
    description: "DATA01-16 serial number (NUL-terminated)"

  - id: basic_information
    source_action: cmd_305_3_basic_information_request
    type: bytes
    description: "DATA01 operation status, DATA02 content displayed, DATA03-05 signal types, DATA06-09 mute/freeze states"

  - id: information_string
    source_action: cmd_084_information_string_request
    type: string
    description: "Label/information string for horizontal (03h) or vertical (04h) synchronous frequency"

  - id: execution_result
    type: enum
    values: [success, error]
    description: "Common acknowledge: success responses carry category+20h; error responses carry category+A0h with <ERR1> <ERR2> codes"
```

## Variables
```yaml
# Settable continuous/level parameters. Numeric min/max/default are device-reported
# dynamically via cmd_060_1_gain_parameter_request_3 (response DATA02-DATA14), not
# fixed in the source document - ranges left UNRESOLVED.
variables:
  - id: brightness
    range: null  # UNRESOLVED: min/max/default reported by device via 060-1
    description: "PICTURE / BRIGHTNESS (set via 030-1 DATA01=00h)"
  - id: contrast
    range: null  # UNRESOLVED
    description: "PICTURE / CONTRAST (set via 030-1 DATA01=01h)"
  - id: color
    range: null  # UNRESOLVED
    description: "PICTURE / COLOR (set via 030-1 DATA01=02h)"
  - id: hue
    range: null  # UNRESOLVED
    description: "PICTURE / HUE (set via 030-1 DATA01=03h)"
  - id: sharpness
    range: null  # UNRESOLVED
    description: "PICTURE / SHARPNESS (set via 030-1 DATA01=04h)"
  - id: volume
    range: null  # UNRESOLVED
    description: "Sound volume (set via 030-2)"
  - id: lamp_light_adjust
    range: null  # UNRESOLVED
    description: "LAMP ADJUST / LIGHT ADJUST (set via 030-15 DATA01=96h DATA02=FFh)"
```

## Events
```yaml
# The source describes only command/response exchanges; no unsolicited notifications are documented.
# UNRESOLVED: no event/notification mechanism stated in source.
```

## Macros
```yaml
# No multi-step sequences are described in the source.
# UNRESOLVED: no macros documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Interlock switch is monitored: command 009 error status DATA09 Bit1 = 'The interlock switch is open.'"
  - "POWER ON (015): while turning on, no other command can be accepted until power-on completes."
  - "POWER OFF (016): while turning off (including cooling time), no other command can be accepted."
  - "Forced onscreen mute is reported as an error condition (ERR1=02h, ERR2=04h)."
# No power-on sequencing procedure beyond the command lockouts above is stated in the source.
```

## Notes
- **Source**: Projector Control Command Reference Manual, BDT140013 Rev 7.1 (Sharp/NEC). Refined excerpt; the Appendix "Supplementary Information by Command" is not included.
- **Frame format**: controller-sent commands begin with a category byte (00h-03h). Success responses add 20h to that byte (00h→20h, 01h→21h, 02h→22h, 03h→23h); error responses add A0h (→A0h/A1h/A2h/A3h) and carry `<ERR1> <ERR2>`.
- **Checksum (CKS)**: low-order one byte of the sum of all preceding bytes. Worked source example: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`.
- **ID1** = control ID set on the projector; **ID2** = model code. Both appear in responses only.
- **Error codes (ERR1/ERR2)**: 00h/00h=unrecognized command; 00h/01h=not supported by model; 01h/00h=invalid value; 01h/01h=invalid input terminal; 02h/03h=value cannot be set; 02h/0Dh=power off; 02h/0Eh=execution failed; 02h/0Fh=no authority; 03h/00h=incorrect gain number; 03h/02h=adjustment failed (full table in source section 2.4).
- **Picture mute / sound mute / onscreen mute** auto-cancel on input terminal switch or video signal switch (sound mute also cancels on volume adjustment).
- **Lens control**: after sending 7Fh (drive plus) or 81h (drive minus) in command 053 DATA02, send 00h to stop. While the lens is driving, the same command can be re-issued without a stop.
- **Usage times** (lamp/filter) are obtainable in one-second units but updated at one-minute intervals.
- **Two-lamp models**: DATA01=01h (Lamp 2) in 037-4 is effective only on two-lamp projector models.

<!-- UNRESOLVED: input terminal value list (018, 319-10), aspect value list (030-12), eco mode value list (097-8/098-8), base model type values (078-1/305-1), selection signal type values, and sub-input setting values are defined in the source Appendix "Supplementary Information by Command", which is absent from this refined document. -->
<!-- UNRESOLVED: flow control mode not stated (RTS/CTS pins are wired in the D-SUB 9P pinout but no flow-control setting is specified). -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: wireless LAN unit communication conditions deferred to the wireless LAN unit's operation manual. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:10:23.660Z
last_checked_at: 2026-06-18T08:27:08.011Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:27:08.011Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model name \"Ma491\" supplied externally; the source manual is generic and does not name a specific model. Appendix \"Supplementary Information by Command\" (referenced for input terminal, aspect, eco mode, base model type, signal type, and sub-input value lists) is not present in this refined source."
- "flow control setting not stated in source (RTS/CTS pins wired in D-SUB 9P pinout but no flow-control mode specified)"
- "appendix not in this source.\""
- "value list in source Appendix not present.\""
- "min/max/default reported by device via 060-1"
- "no event/notification mechanism stated in source."
- "no macros documented."
- "input terminal value list (018, 319-10), aspect value list (030-12), eco mode value list (097-8/098-8), base model type values (078-1/305-1), selection signal type values, and sub-input setting values are defined in the source Appendix \"Supplementary Information by Command\", which is absent from this refined document."
- "flow control mode not stated (RTS/CTS pins are wired in the D-SUB 9P pinout but no flow-control setting is specified)."
- "firmware version compatibility not stated in source."
- "wireless LAN unit communication conditions deferred to the wireless LAN unit's operation manual."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
