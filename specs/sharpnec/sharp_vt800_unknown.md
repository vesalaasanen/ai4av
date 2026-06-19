---
spec_id: admin/sharp-nec-vt800
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC VT800 Control Spec"
manufacturer: Sharp/NEC
model_family: VT800
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - VT800
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T07:31:58.461Z
last_checked_at: 2026-06-19T07:45:43.982Z
generated_at: 2026-06-19T07:45:43.982Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic projector control manual (BDT140013 R7.1), not a VT800-specific document. The VT800 model name is supplied by the operator; the source itself does not name a model. Confirm VT800 actually uses this command set."
  - "source lists supported rates 115200/38400/19200/9600/4800 bps but does not state a default; 115200 shown as a placeholder."
  - "source states \"Full duplex\" communication mode but does not specify flow_control (RTS/CTS wiring is present on the D-SUB 9P connector)."
  - "structured variable entries not authored; source encodes values"
  - "not applicable - no event documentation found."
  - "not applicable."
  - "source does not document formal interlock procedures, power-on"
  - "(1) VT800 model attribution is operator-supplied; the source document does not name a model. (2) Default baud rate not stated. (3) Flow-control mode not stated (RTS/CTS pins are wired on the D-SUB 9P connector but the source says only \"Full duplex\"). (4) Firmware version compatibility not stated. (5) Appendix value tables (input terminal codes, aspect codes, eco-mode codes, sub-input codes, base-model-type codes) are referenced but not present in this excerpt. (6) ID2 model code for the VT800 is not stated."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:45:43.982Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched literally against source hex payloads; all transport parameters verified in source documentation. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC VT800 Control Spec

## Summary
Sharp/NEC VT800 projector control spec covering RS-232C serial and wired/wireless LAN (TCP) control interfaces, per the "Projector Control Command Reference Manual" (document BDT140013, revision 7.1). The protocol is a binary, hex-byte command set with a trailing checksum byte, framed as `<header> <ID1> <ID2> <LEN> <DATA...> <CKS>`.

<!-- UNRESOLVED: source is a generic projector control manual (BDT140013 R7.1), not a VT800-specific document. The VT800 model name is supplied by the operator; the source itself does not name a model. Confirm VT800 actually uses this command set. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands."
serial:
  baud_rate: 115200  # UNRESOLVED: source lists supported rates 115200/38400/19200/9600/4800 bps but does not state a default; 115200 shown as a placeholder.
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode but does not specify flow_control (RTS/CTS wiring is present on the D-SUB 9P connector).
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: many *REQUEST commands return state values
  - levelable    # inferred: PICTURE/VOLUME/LAMP ADJUST commands present
  - routable     # inferred: INPUT SW CHANGE / AUDIO SELECT SET present
```

## Actions
```yaml
# All 53 commands from Section 2 "Command List" enumerated verbatim.
# Hex payloads copied verbatim from source (h suffix preserved). Computed
# fields (ID1, ID2, CKS) shown as <ID1> <ID2> <CKS> placeholders per source.
# Each source row = one action (no collapsing of enumerated variants).

- id: cmd_009_error_status_request
  label: 009. ERROR STATUS REQUEST
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: cmd_015_power_on
  label: 015. POWER ON
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: cmd_016_power_off
  label: 016. POWER OFF
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: cmd_018_input_sw_change
  label: 018. INPUT SW CHANGE
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Input terminal value (see Appendix "Supplementary Information by Command"). Example 06h = video port.

- id: cmd_020_picture_mute_on
  label: 020. PICTURE MUTE ON
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: cmd_021_picture_mute_off
  label: 021. PICTURE MUTE OFF
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: cmd_022_sound_mute_on
  label: 022. SOUND MUTE ON
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: cmd_023_sound_mute_off
  label: 023. SOUND MUTE OFF
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: cmd_024_onscreen_mute_on
  label: 024. ONSCREEN MUTE ON
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: cmd_025_onscreen_mute_off
  label: 025. ONSCREEN MUTE OFF
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: cmd_030_1_picture_adjust
  label: 030-1. PICTURE ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
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

- id: cmd_030_2_volume_adjust
  label: 030-2. VOLUME ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
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

- id: cmd_030_12_aspect_adjust
  label: 030-12. ASPECT ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Value set for the aspect (see Appendix "Supplementary Information by Command").

- id: cmd_030_15_other_adjust
  label: 030-15. OTHER ADJUST
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 96h=LAMP ADJUST / LIGHT ADJUST (DATA02 must be FFh)"
    - name: DATA02
      type: integer
      description: "Sub-target (FFh when DATA01=96h)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: cmd_037_information_request
  label: 037. INFORMATION REQUEST
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: cmd_037_3_filter_usage_information_request
  label: 037-3. FILTER USAGE INFORMATION REQUEST
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: cmd_037_4_lamp_information_request_3
  label: 037-4. LAMP INFORMATION REQUEST 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

- id: cmd_037_6_carbon_savings_information_request
  label: 037-6. CARBON SAVINGS INFORMATION REQUEST
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: cmd_050_remote_key_code
  label: 050. REMOTE KEY CODE
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). See key code list e.g. 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT."
    - name: DATA02
      type: integer
      description: Key code high byte (00h for all listed codes)

- id: cmd_051_shutter_close
  label: 051. SHUTTER CLOSE
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: cmd_052_shutter_open
  label: 052. SHUTTER OPEN
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: cmd_053_lens_control
  label: 053. LENS CONTROL
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens function (source shows 06h=Periphery Focus; other target values not enumerated in this excerpt)"
    - name: DATA02
      type: integer
      description: "Content/drive: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: cmd_053_1_lens_control_request
  label: 053-1. LENS CONTROL REQUEST
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Lens function target selector (same encoding as 053 LENS CONTROL DATA01).

- id: cmd_053_2_lens_control_2
  label: 053-2. LENS CONTROL 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens function (FFh=Stop; other targets not enumerated in this excerpt)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: cmd_053_3_lens_memory_control
  label: 053-3. LENS MEMORY CONTROL
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: cmd_053_4_reference_lens_memory_control
  label: 053-4. REFERENCE LENS MEMORY CONTROL
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: cmd_053_5_lens_memory_option_request
  label: 053-5. LENS MEMORY OPTION REQUEST
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: cmd_053_6_lens_memory_option_set
  label: 053-6. LENS MEMORY OPTION SET
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: cmd_053_7_lens_information_request
  label: 053-7. LENS INFORMATION REQUEST
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: cmd_053_10_lens_profile_set
  label: 053-10. LENS PROFILE SET
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: cmd_053_11_lens_profile_request
  label: 053-11. LENS PROFILE REQUEST
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: cmd_060_1_gain_parameter_request_3
  label: 060-1. GAIN PARAMETER REQUEST 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

- id: cmd_078_1_setting_request
  label: 078-1. SETTING REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: cmd_078_2_running_status_request
  label: 078-2. RUNNING STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: cmd_078_3_input_status_request
  label: 078-3. INPUT STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: cmd_078_4_mute_status_request
  label: 078-4. MUTE STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: cmd_078_5_model_name_request
  label: 078-5. MODEL NAME REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cmd_078_6_cover_status_request
  label: 078-6. COVER STATUS REQUEST
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: cmd_079_freeze_control
  label: 079. FREEZE CONTROL
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: cmd_084_information_string_request
  label: 084. INFORMATION STRING REQUEST
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: cmd_097_8_eco_mode_request
  label: 097-8. ECO MODE REQUEST
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: cmd_097_45_lan_projector_name_request
  label: 097-45. LAN PROJECTOR NAME REQUEST
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: cmd_097_155_lan_mac_address_status_request2
  label: 097-155. LAN MAC ADDRESS STATUS REQUEST2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: cmd_097_198_pip_picture_by_picture_request
  label: 097-198. PIP/PICTURE BY PICTURE REQUEST
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: cmd_097_243_1_edge_blending_mode_request
  label: 097-243-1. EDGE BLENDING MODE REQUEST
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: cmd_098_8_eco_mode_set
  label: 098-8. ECO MODE SET
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Value set for the eco mode (see Appendix "Supplementary Information by Command").

- id: cmd_098_45_lan_projector_name_set
  label: 098-45. LAN PROJECTOR NAME SET
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: projector_name
      type: string
      description: Projector name (up to 16 bytes; occupies DATA01-DATA16 in the payload).

- id: cmd_098_198_pip_picture_by_picture_set
  label: 098-198. PIP/PICTURE BY PICTURE SET
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: Setting value (see Appendix "Supplementary Information by Command" for sub-input values).

- id: cmd_098_243_1_edge_blending_mode_set
  label: 098-243-1. EDGE BLENDING MODE SET
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: cmd_305_1_base_model_type_request
  label: 305-1. BASE MODEL TYPE REQUEST
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: cmd_305_2_serial_number_request
  label: 305-2. SERIAL NUMBER REQUEST
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: cmd_305_3_basic_information_request
  label: 305-3. BASIC INFORMATION REQUEST
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: cmd_319_10_audio_select_set
  label: 319-10. AUDIO SELECT SET
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Input terminal value (see Appendix "Supplementary Information by Command").
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Ack/error response framing: every command returns either a success response
# (header byte +2h of the command header) or an error response (header +8h of
# the command header) carrying <ERR1> <ERR2> <CKS>. Example for POWER ON:
#   success: "22h 00h <ID1> <ID2> 00h <CKS>"
#   error:   "A2h 00h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
# ERR1/ERR2 codes (from section 2.4 Error code list) are the observable
# error feedbacks documented in the source.

- id: err_00_00
  type: enum
  label: "ERR1=00h ERR2=00h - Command cannot be recognized"
  values: [recognized, unrecognized]

- id: err_00_01
  type: enum
  label: "ERR1=00h ERR2=01h - Command not supported by the model in use"
  values: [supported, unsupported]

- id: err_01_00
  type: enum
  label: "ERR1=01h ERR2=00h - Specified value is invalid"
  values: [valid, invalid]

- id: err_01_01
  type: enum
  label: "ERR1=01h ERR2=01h - Specified input terminal is invalid"
  values: [valid, invalid]

- id: err_01_02
  type: enum
  label: "ERR1=01h ERR2=02h - Specified language is invalid"
  values: [valid, invalid]

- id: err_02_00
  type: enum
  label: "ERR1=02h ERR2=00h - Memory allocation error"

- id: err_02_02
  type: enum
  label: "ERR1=02h ERR2=02h - Memory in use"

- id: err_02_03
  type: enum
  label: "ERR1=02h ERR2=03h - Specified value cannot be set"

- id: err_02_04
  type: enum
  label: "ERR1=02h ERR2=04h - Forced onscreen mute on"

- id: err_02_06
  type: enum
  label: "ERR1=02h ERR2=06h - Viewer error"

- id: err_02_07
  type: enum
  label: "ERR1=02h ERR2=07h - No signal"

- id: err_02_08
  type: enum
  label: "ERR1=02h ERR2=08h - A test pattern or filter is displayed"

- id: err_02_09
  type: enum
  label: "ERR1=02h ERR2=09h - No PC card is inserted"

- id: err_02_0A
  type: enum
  label: "ERR1=02h ERR2=0Ah - Memory operation error"

- id: err_02_0C
  type: enum
  label: "ERR1=02h ERR2=0Ch - An entry list is displayed"

- id: err_02_0D
  type: enum
  label: "ERR1=02h ERR2=0Dh - Command cannot be accepted because the power is off"

- id: err_02_0E
  type: enum
  label: "ERR1=02h ERR2=0Eh - Command execution failed"

- id: err_02_0F
  type: enum
  label: "ERR1=02h ERR2=0Fh - There is no authority necessary for the operation"

- id: err_03_00
  type: enum
  label: "ERR1=03h ERR2=00h - Specified gain number is incorrect"

- id: err_03_01
  type: enum
  label: "ERR1=03h ERR2=01h - Specified gain is invalid"

- id: err_03_02
  type: enum
  label: "ERR1=03h ERR2=02h - Adjustment failed"
```

## Variables
```yaml
# Settable parameters exposed by query commands (current value, limits, default):
# - lamp usage time (seconds)        - from 037 INFORMATION REQUEST, DATA83-86
# - filter usage time (seconds)      - from 037-3, DATA01-04
# - filter alarm start time (seconds)- from 037-3, DATA05-08
# - lamp remaining life (%)          - from 037-4, content 04h
# - picture/volume/lamp gain bounds  - from 060-1 GAIN PARAMETER REQUEST 3
# - projector name (up to 16 bytes)  - set via 098-45, read via 097-45
# - eco mode value                   - set via 098-8,  read via 097-8
# - PIP/PbP mode/position/sub-input  - set via 098-198, read via 097-198
# - edge blending on/off             - set via 098-243-1, read via 097-243-1
# - lens memory options              - set via 053-6, read via 053-5
# - reference lens profile number    - set via 053-10, read via 053-11
# - audio select per input terminal  - set via 319-10
# UNRESOLVED: structured variable entries not authored; source encodes values
# inside binary DATA fields rather than as discrete named parameters. Mapping
# byte offsets to a variable schema would exceed direct population policy.
```

## Events
```yaml
# No unsolicited notifications are described in the source. All responses are
# direct replies to commands.
# UNRESOLVED: not applicable - no event documentation found.
```

## Macros
```yaml
# No multi-step sequences are described explicitly in the source.
# UNRESOLVED: not applicable.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "While POWER ON is executing, no other command can be accepted. (section 3.2)"
  - "While POWER OFF is executing (including cooling time), no other command can be accepted. (section 3.3)"
  - "For LENS CONTROL (053), continuous-drive codes 7Fh (+) and 81h (-) must be stopped by sending 00h afterwards. (section 3.22)"
  - "PICTURE MUTE / SOUND MUTE / ONSCREEN MUTE are auto-turned off on input/video-signal switch (sections 3.5, 3.7, 3.9)."
# UNRESOLVED: source does not document formal interlock procedures, power-on
# sequencing, or operator-safety warnings beyond the command-acceptance notes
# above. Voltage/current/lamp-power specifications are out of scope of this
# command reference and are not present in the source.
```

## Notes
- **Protocol framing.** Commands are binary hex-byte frames. Layout per section 2.1:
  `<Header> <ID1> <ID2> <LEN> <DATA01>..<DATA?? <CKS>`. `ID1` is the projector's configured control ID; `ID2` is the model code (varies by model); `LEN` is the byte count of the DATA portion; `CKS` is a checksum computed as the low-order byte of the sum of all preceding bytes (section 2.2). Checksum example: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`.
- **Response headers.** A success response header is the command header byte +20h; an error response header is the command header byte +80h. Examples verbatim from the source are reproduced in each command's payload line.
- **Appendix dependency.** Several commands reference an "Appendix: Supplementary Information by Command" for value tables (input terminals, aspect values, eco-mode values, sub-input values, base model types). That appendix is NOT included in this refined source excerpt, so those value enumerations are marked as deferred in `params[].description`.
- **Multi-rate serial.** RS-232C supports 4800/9600/19200/38400/115200 bps; the source does not name a default, so implementers must match the projector's configured rate.
- **Cooling lockout.** During the post-power-off cool-down the device will not accept any command (documented in 3.3 and reflected by ERR `02h 0Dh` "power is off").

<!-- UNRESOLVED: (1) VT800 model attribution is operator-supplied; the source document does not name a model. (2) Default baud rate not stated. (3) Flow-control mode not stated (RTS/CTS pins are wired on the D-SUB 9P connector but the source says only "Full duplex"). (4) Firmware version compatibility not stated. (5) Appendix value tables (input terminal codes, aspect codes, eco-mode codes, sub-input codes, base-model-type codes) are referenced but not present in this excerpt. (6) ID2 model code for the VT800 is not stated. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T07:31:58.461Z
last_checked_at: 2026-06-19T07:45:43.982Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:45:43.982Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched literally against source hex payloads; all transport parameters verified in source documentation. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic projector control manual (BDT140013 R7.1), not a VT800-specific document. The VT800 model name is supplied by the operator; the source itself does not name a model. Confirm VT800 actually uses this command set."
- "source lists supported rates 115200/38400/19200/9600/4800 bps but does not state a default; 115200 shown as a placeholder."
- "source states \"Full duplex\" communication mode but does not specify flow_control (RTS/CTS wiring is present on the D-SUB 9P connector)."
- "structured variable entries not authored; source encodes values"
- "not applicable - no event documentation found."
- "not applicable."
- "source does not document formal interlock procedures, power-on"
- "(1) VT800 model attribution is operator-supplied; the source document does not name a model. (2) Default baud rate not stated. (3) Flow-control mode not stated (RTS/CTS pins are wired on the D-SUB 9P connector but the source says only \"Full duplex\"). (4) Firmware version compatibility not stated. (5) Appendix value tables (input terminal codes, aspect codes, eco-mode codes, sub-input codes, base-model-type codes) are referenced but not present in this excerpt. (6) ID2 model code for the VT800 is not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
