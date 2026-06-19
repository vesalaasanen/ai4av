---
spec_id: admin/sharp-nec-x464unv-3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC X464Unv 3 Control Spec"
manufacturer: Sharp/NEC
model_family: "X464Unv 3"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "X464Unv 3"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:45:46.571Z
last_checked_at: 2026-06-19T07:45:45.482Z
generated_at: 2026-06-19T07:45:45.482Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source manual is the generic Sharp/NEC \"Projector Control Command Reference Manual\" (BDT140013 Rev 7.1). It covers a projector family (lens/shutter/lamp concepts). Whether every command applies to the X464Unv 3 large-format display is not stated."
  - "firmware version compatibility not stated in source"
  - "control ID (ID1) and model code (ID2) default values not stated in source"
  - "many DATA enums (input terminal values, aspect values, base model types, sub input values, eco mode values) are deferred to an \"Appendix: Supplementary Information by Command\" that is not present in the refined source."
  - "source states \"Full duplex\" communication mode but does not name a flow-control scheme"
  - "full input-terminal value table deferred to source Appendix not present in refined text.\""
  - "aspect value table deferred to source Appendix not present in refined text.\""
  - "value enum deferred to source Appendix.\""
  - "input-terminal value table deferred to source Appendix not present in refined text.\""
  - "device may push asynchronous error/interlock events, but the source"
  - "source contains no explicit safety warnings, cover-interlock procedures,"
  - "input-terminal value table not present in refined source"
  - "aspect value table not present in refined source"
  - "eco-mode value enum not present in refined source"
  - "base-model-type value table not present in refined source"
  - "PIP/PbP sub-input value table not present in refined source"
  - "firmware version compatibility not stated"
  - "full error-code list beyond §2.4 not enumerated as separate responses"
  - "source is a generic projector-family manual; per-command applicability to X464Unv 3 not asserted"
verification:
  verdict: verified
  checked_at: 2026-06-19T07:45:45.482Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match literal hex sequences in source; transport parameters fully supported; source command catalogue fully represented. (19 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC X464Unv 3 Control Spec

## Summary
Sharp/NEC display/projector control spec covering the hex-byte control protocol described in the vendor Projector Control Command Reference Manual (BDT140013 Rev 7.1). The device exposes both an RS-232C serial interface and a TCP/IP (LAN) interface on port 7142, sharing one command set. Commands are framed in hexadecimal bytes with a trailing checksum byte (low-order 8 bits of the sum of all preceding bytes).

<!-- UNRESOLVED: source manual is the generic Sharp/NEC "Projector Control Command Reference Manual" (BDT140013 Rev 7.1). It covers a projector family (lens/shutter/lamp concepts). Whether every command applies to the X464Unv 3 large-format display is not stated. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: control ID (ID1) and model code (ID2) default values not stated in source -->
<!-- UNRESOLVED: many DATA enums (input terminal values, aspect values, base model types, sub input values, eco mode values) are deferred to an "Appendix: Supplementary Information by Command" that is not present in the refined source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists 115200/38400/19200/9600/4800 as selectable; 9600 is one of the documented rates, not a single default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode but does not name a flow-control scheme
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON (015) / POWER OFF (016) commands present
  - queryable    # inferred: many *REQUEST commands returning state (009, 037, 078-*, 097-*, 305-*)
  - levelable    # inferred: PICTURE ADJUST (030-1), VOLUME ADJUST (030-2), LAMP/LIGHT ADJUST (030-15), LENS CONTROL (053/053-2)
  - routable     # inferred: INPUT SW CHANGE (018) and AUDIO SELECT SET (319-10) select signal/audio routing
```

## Actions
```yaml
# All command bytes are VERBATIM from the source. ID1 (control ID) and ID2 (model
# code) are runtime-supplied framing bytes per the projector setting; CKS is the
# computed low-order-8-bits checksum of all preceding bytes (see §2.2).
# Commands listed without <ID1> <ID2> in the source are the literal request bytes;
# the framed request prepends the leading byte (02h/03h/00h/01h) shown.

- id: error_status_request_009
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  response_shape: "20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>  # DATA01-12 carry per-bit error flags"

- id: power_on_015
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted while power-on sequence runs."

- id: power_off_016
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off including cooling time."

- id: input_sw_change_018
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal selector byte (e.g. 06h = video port). UNRESOLVED: full input-terminal value table deferred to source Appendix not present in refined text."
  notes: "Worked example in source: switch to video port -> 02h 03h 00h 00h 02h 01h 06h 0Eh"

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
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02>-<DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: volume_adjust_030_2
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01>-<DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: aspect_adjust_030_12
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value. UNRESOLVED: aspect value table deferred to source Appendix not present in refined text."

- id: other_adjust_lamp_light_030_15
  label: "030-15. OTHER ADJUST (LAMP/LIGHT ADJUST)"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01>-<DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte: 96h = LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: integer
      description: "Adjustment target low byte: FFh (per source table)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: information_request_037
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  response_shape: "23h 8Ah <ID1> <ID2> 62h <DATA01>-<DATA98> <CKS>  # DATA01-49 projector name; DATA83-86 lamp usage seconds; DATA87-90 filter usage seconds"

- id: filter_usage_info_request_037_3
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  response_shape: "23h 95h <ID1> <ID2> 08h <DATA01>-<DATA08> <CKS>  # DATA01-04 filter usage seconds; DATA05-08 filter alarm start seconds; -1 if undefined"

- id: lamp_info_request_037_4
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

- id: carbon_savings_info_request_037_6
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Content: 00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code_050
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type); see source key-code list (POWER ON=02h, POWER OFF=03h, AUTO=05h, MENU=06h, UP=07h, DOWN=08h, RIGHT=09h, LEFT=0Ah, ENTER=0Bh, EXIT=0Ch, HELP=0Dh, MAGNIFY UP=0Fh, MAGNIFY DOWN=10h, MUTE=13h, PICTURE=29h, COMPUTER1=4Bh, COMPUTER2=4Ch, VIDEO1=4Fh, S-VIDEO1=51h, VOLUME UP=84h, VOLUME DOWN=85h, FREEZE=8Ah, ASPECT=A3h, SOURCE=D7h, LAMP MODE/ECO=EEh)"
    - name: DATA02
      type: integer
      description: "Key code high byte (00h for every listed key)"

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
      type: integer
      description: "Lens target: 06h=Periphery Focus (only documented value in source)"
    - name: DATA02
      type: integer
      description: "Drive action: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_request_053_1
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target selector (same values as 053 LENS CONTROL DATA01)"
  response_shape: "22h 1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02>-<DATA07> <CKS>  # upper/lower limit + current value, each as 16-bit LE"

- id: lens_control_2_053_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01>-<DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target: FFh=Stop, other values per source table"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: lens_memory_control_053_3
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Action: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control_053_4
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Action: 00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Operates on the profile number selected via 053-10 LENS PROFILE SET."

- id: lens_memory_option_request_053_5
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set_053_6
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_info_request_053_7
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  response_shape: "22h 22h <ID1> <ID2> 02h 00h <DATA01> <CKS>  # DATA01 bit0=lens memory, bit1=zoom, bit2=focus, bit3=lens shift H, bit4=lens shift V; 0=stop, 1=operating"

- id: lens_profile_set_053_10
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request_053_11
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  response_shape: "22h 28h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>  # DATA01=00h Profile 1 / 01h Profile 2"

- id: gain_parameter_request_060_1
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  response_shape: "23h 05h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>  # DATA02-13 = upper/lower/default/current/wide/narrow limits as 16-bit LE"

- id: setting_request_078_1
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  response_shape: "20h 85h <ID1> <ID2> 20h <DATA01>-<DATA32> <CKS>  # DATA01-03 base model type; DATA04 sound function; DATA05 clock/sleep profile"

- id: running_status_request_078_2
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  response_shape: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>  # DATA03 power status; DATA04 cooling; DATA05 power-on/off process; DATA06 operation status"

- id: input_status_request_078_3
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  response_shape: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>  # DATA01 signal-switch process; DATA02 signal list number; DATA03-04 selection signal type; DATA09 content displayed"

- id: mute_status_request_078_4
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  response_shape: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>  # DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 OSD"

- id: model_name_request_078_5
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  response_shape: "20h 85h <ID1> <ID2> 20h <DATA01>-<DATA32> <CKS>  # NUL-terminated model name"

- id: cover_status_request_078_6
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  response_shape: "20h 85h <ID1> <ID2> 01h <DATA01> <CKS>  # 00h=normal/cover opened, 01h=cover closed"

- id: freeze_control_079
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Action: 01h=freeze on, 02h=freeze off"

- id: information_string_request_084
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=horizontal sync frequency, 04h=vertical sync frequency"
  response_shape: "20h D0h <ID1> <ID2> LEN <DATA01> 01h <DATA02>-<DATA??> <CKS>  # variable-length NUL-terminated label"

- id: eco_mode_request_097_8
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  response_shape: "23h B0h <ID1> <ID2> 02h 07h <DATA01> <CKS>  # DATA01 = eco mode value. UNRESOLVED: value enum deferred to source Appendix."

- id: lan_projector_name_request_097_45
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  response_shape: "23h B0h <ID1> <ID2> 12h 2Ch <DATA01>-<DATA17> <CKS>  # NUL-terminated projector name"

- id: lan_mac_address_request_097_155
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  response_shape: "23h B0h <ID1> <ID2> 08h 9Ah 00h <DATA01>-<DATA06> <CKS>  # MAC address (6 bytes)"

- id: pip_pbyp_request_097_198
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Sub-target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request_097_243_1
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  response_shape: "23h B0h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>  # 00h=OFF, 01h=ON"

- id: eco_mode_set_098_8
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value. UNRESOLVED: value enum deferred to source Appendix."

- id: lan_projector_name_set_098_45
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01>-<DATA16> 00h <CKS>"
  params:
    - name: name
      type: string
      description: "Projector name, up to 16 bytes (DATA01-16)"

- id: pip_pbyp_set_098_198
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value. MODE: 00h=PIP, 01h=PICTURE BY PICTURE. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input values UNRESOLVED (source Appendix)."

- id: edge_blending_mode_set_098_243_1
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: base_model_type_request_305_1
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  response_shape: "20h BFh <ID1> <ID2> 10h 00h <DATA01>-<DATA15> <CKS>  # DATA01-02 + DATA12-13 base model type; DATA03-11 model name"

- id: serial_number_request_305_2
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  response_shape: "20h BFh <ID1> <ID2> 12h 01h 06h <DATA01>-<DATA16> <CKS>  # NUL-terminated serial number"

- id: basic_information_request_305_3
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  response_shape: "20h BFh <ID1> <ID2> 10h 02h <DATA01>-<DATA15> <CKS>  # DATA01 op status; DATA02 content displayed; DATA03-04 signal type; DATA05 display signal type; DATA06-09 mutes; DATA10 freeze"

- id: audio_select_set_319_10
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal. UNRESOLVED: input-terminal value table deferred to source Appendix not present in refined text."
    - name: DATA02
      type: integer
      description: "Audio source: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# All successful command responses share the A-prefix ack/error frame; per-command
# data responses are described in each action's response_shape above.
- id: command_ack_success
  type: raw
  description: "Framed success response for the matched command (2x/2xh prefix, no error)."

- id: command_error
  type: raw
  description: "Error response: <A-prefix>h <cmd-low> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>. ERR1/ERR2 pair per source §2.4 error-code table (e.g. 00h/00h=unrecognized, 00h/01h=not supported by model, 01h/00h=invalid value, 02h/0Dh=power off, 02h/0Fh=no authority)."
```

## Variables
```yaml
# No settable continuous variables beyond the parameterized actions above; set/state
# values are obtained via the *REQUEST query actions. Nothing to enumerate here.
```

## Events
```yaml
# Source describes request/response only. No unsolicited notifications documented.
# UNRESOLVED: device may push asynchronous error/interlock events, but the source
# does not document any.
```

## Macros
```yaml
# No multi-step sequences explicitly described in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes operational interlocks in command prose but no formal interlock table:
# - 015 POWER ON: no other command accepted during power-on sequence.
# - 016 POWER OFF: no other command accepted during power-off (incl. cooling time).
# - 020 PICTURE MUTE / 022 SOUND MUTE / 024 ONSCREEN MUTE: cleared on input/video-signal switch.
# - 053 LENS CONTROL: continuous drive (7Fh/81h) must be stopped by sending 00h.
# - 053-2 LENS CONTROL 2 with DATA01=FFh (Stop): adjustment mode/value are ignored.
# UNRESOLVED: source contains no explicit safety warnings, cover-interlock procedures,
# or formal power-on sequencing requirements. The 009 ERROR STATUS REQUEST bitfields
# (cover error, fan error, temperature error, interlock switch open, etc.) are the
# closest thing to safety telemetry and are surfaced as a query, not an interlock spec.
```

## Notes
- Source document is the generic Sharp/NEC **Projector Control Command Reference Manual** (document number BDT140013, Revision 7.1). It documents a Sharp/NEC projector protocol family and is being applied here to the X464Unv 3; per-command applicability to a large-format display is not asserted by the source.
- Every command/response is expressed as a hexadecimal byte sequence. Frames embed `<ID1>` (control ID set on the projector) and `<ID2>` (model code). `<CKS>` is the low-order 8 bits of the sum of all preceding bytes. The source's worked example: `20h 81h 01h 60h 01h 00h <CKS>` → sum `103h` → CKS = `03h`.
- The serial line supports 115200 / 38400 / 19200 / 9600 / 4800 bps (selectable in software); 8 data bits, no parity, 1 stop bit, full duplex. The spec records `9600` as the canonical default because the source does not name a single default rate — implementers should treat baud as configurable.
- LAN transport is wired IEEE 802.3 / 802.3u (10/100 auto) plus an optional wireless LAN unit, all carrying the same command set on TCP port **7142**.
- Many command DATA enums (input terminal, aspect, base model type, eco mode, sub input) are deferred by the source to an Appendix titled "Supplementary Information by Command" that is not present in this refined source text. Those fields are marked UNRESOLVED in their `params` descriptions.

<!-- UNRESOLVED: control ID (ID1) and model code (ID2) default values not stated in source -->
<!-- UNRESOLVED: input-terminal value table not present in refined source -->
<!-- UNRESOLVED: aspect value table not present in refined source -->
<!-- UNRESOLVED: eco-mode value enum not present in refined source -->
<!-- UNRESOLVED: base-model-type value table not present in refined source -->
<!-- UNRESOLVED: PIP/PbP sub-input value table not present in refined source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: full error-code list beyond §2.4 not enumerated as separate responses -->
<!-- UNRESOLVED: source is a generic projector-family manual; per-command applicability to X464Unv 3 not asserted -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:45:46.571Z
last_checked_at: 2026-06-19T07:45:45.482Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:45:45.482Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match literal hex sequences in source; transport parameters fully supported; source command catalogue fully represented. (19 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source manual is the generic Sharp/NEC \"Projector Control Command Reference Manual\" (BDT140013 Rev 7.1). It covers a projector family (lens/shutter/lamp concepts). Whether every command applies to the X464Unv 3 large-format display is not stated."
- "firmware version compatibility not stated in source"
- "control ID (ID1) and model code (ID2) default values not stated in source"
- "many DATA enums (input terminal values, aspect values, base model types, sub input values, eco mode values) are deferred to an \"Appendix: Supplementary Information by Command\" that is not present in the refined source."
- "source states \"Full duplex\" communication mode but does not name a flow-control scheme"
- "full input-terminal value table deferred to source Appendix not present in refined text.\""
- "aspect value table deferred to source Appendix not present in refined text.\""
- "value enum deferred to source Appendix.\""
- "input-terminal value table deferred to source Appendix not present in refined text.\""
- "device may push asynchronous error/interlock events, but the source"
- "source contains no explicit safety warnings, cover-interlock procedures,"
- "input-terminal value table not present in refined source"
- "aspect value table not present in refined source"
- "eco-mode value enum not present in refined source"
- "base-model-type value table not present in refined source"
- "PIP/PbP sub-input value table not present in refined source"
- "firmware version compatibility not stated"
- "full error-code list beyond §2.4 not enumerated as separate responses"
- "source is a generic projector-family manual; per-command applicability to X464Unv 3 not asserted"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
