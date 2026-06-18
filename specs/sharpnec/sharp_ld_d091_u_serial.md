---
spec_id: admin/sharp-nec-ld-d091-u
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld D091 U Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld D091 U"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld D091 U"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:43:21.278Z
last_checked_at: 2026-06-17T19:58:28.107Z
generated_at: 2026-06-17T19:58:28.107Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "ID2 (model code) value for this specific model not stated in source; must be set per model."
  - "Firmware version compatibility not stated in source."
  - "Default control ID (ID1) value not stated in source."
  - "flow_control not stated; source says full-duplex communication mode"
  - "appendix not in provided source excerpt).\""
  - "full target list not in provided source excerpt.\""
  - "appendix not in provided excerpt).\""
  - "range from gain parameter request, not enumerated statically in source"
  - "ID2 (model code) for Ld D091 U not stated in source."
  - "Default control ID (ID1) not stated in source."
  - "Default baud rate not stated (five supported rates enumerated)."
  - "Serial flow control not explicitly stated (source lists \"Full duplex\" communication mode only)."
  - "Source Appendix \"Supplementary Information by Command\" not in provided excerpt — input terminal, aspect, eco mode, sub-input, base model type enum value lists unavailable."
  - "Full DATA01 target list for 053 LENS CONTROL (only 06h=Periphery Focus documented)."
  - "Adjustment value ranges for brightness/contrast/color/hue/sharpness/volume/lamp not enumerated statically (must be queried via 060-1 GAIN PARAMETER REQUEST 3)."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:58:28.107Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched with exact hex command sequences confirmed verbatim in source document; transport parameters verified; complete bidirectional coverage. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld D091 U Control Spec

## Summary
Control spec for the Sharp/NEC Ld D091 U projector (document revision BDT140013 7.1). Supports RS-232C serial control and TCP/IP LAN control. Binary framed command protocol with checksum bytes; 53 documented commands covering power, input switching, mute, picture/volume/aspect/lens adjustment, lens memory, information/status queries, eco mode, PIP/PbP, edge blending, and audio select.

<!-- UNRESOLVED: ID2 (model code) value for this specific model not stated in source; must be set per model. -->
<!-- UNRESOLVED: Firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: Default control ID (ID1) value not stated in source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists all five as supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow_control not stated; source says full-duplex communication mode
auth:
  type: none  # inferred: no auth procedure in source
# Framing: commands are hex byte frames. Header byte selects class
# (00h=query-class A0h response, 01h=21h, 02h=22h, 03h=23h, etc.). Frame includes
# ID1 (control ID), ID2 (model code), LEN (data length), DATA..., and CKS
# (checksum = low-order byte of sum of all preceding bytes).
# ID2 is model-dependent; value for Ld D091 U is UNRESOLVED (not stated in source).
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON (015) / POWER OFF (016) commands present
  - queryable    # inferred: extensive status query commands (009, 037*, 078*, 097*, 305*)
  - routable     # inferred: INPUT SW CHANGE (018) routing command present
  - levelable    # inferred: VOLUME ADJUST (030-2), PICTURE ADJUST (030-1) level controls
```

## Actions
```yaml
# All payloads verbatim from source. Hex byte frames; CKS = checksum byte.
# Frames containing <ID1> <ID2> are the actual command form sent to device
# (ID1=control ID set on projector, ID2=model code). CKS computed per source
# rule (low byte of sum of all preceding bytes).
actions:
  - id: cmd_009_error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns 12 bytes of error bitfield (DATA01-DATA12). Bit=1 indicates error."

  - id: cmd_015_power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "While turning on power, no other command accepted."

  - id: cmd_016_power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "While turning off (incl. cooling time), no other command accepted."

  - id: cmd_018_input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal value (DATA01). Example: 06h=video port. Full value list in source Appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not in provided source excerpt)."
    notes: "Example (video port): 02h 03h 00h 00h 02h 01h 06h 0Eh"

  - id: cmd_020_picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared by input/video signal switch."

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
    notes: "Cleared by input/video signal switch or volume adjust."

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
    notes: "Cleared by input/video signal switch."

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
      - name: target
        type: enum
        description: "DATA01 adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: enum
        description: "DATA02 adjustment mode: 00h=absolute, 01h=relative"
      - name: value_low
        type: integer
        description: "DATA03 adjustment value (low-order 8 bits)"
      - name: value_high
        type: integer
        description: "DATA04 adjustment value (high-order 8 bits)"
    notes: "Set brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Set brightness=-10: 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch"

  - id: cmd_030_2_volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: mode
        type: enum
        description: "DATA01 adjustment mode: 00h=absolute, 01h=relative"
      - name: value_low
        type: integer
        description: "DATA02 adjustment value (low-order 8 bits)"
      - name: value_high
        type: integer
        description: "DATA03 adjustment value (high-order 8 bits)"
    notes: "Set volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

  - id: cmd_030_12_aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: aspect_value
        type: integer
        description: "DATA01 aspect value. Full value list in source Appendix (UNRESOLVED: appendix not in provided source excerpt)."

  - id: cmd_030_15_other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: target_low
        type: integer
        description: "DATA01 target low byte. Documented: DATA01=96h with DATA02=FFh => LAMP ADJUST / LIGHT ADJUST"
      - name: target_high
        type: integer
        description: "DATA02 target high byte"
      - name: mode
        type: enum
        description: "DATA03 adjustment mode: 00h=absolute, 01h=relative"
      - name: value_low
        type: integer
        description: "DATA04 adjustment value (low-order 8 bits)"
      - name: value_high
        type: integer
        description: "DATA05 adjustment value (high-order 8 bits)"
    notes: "Adjusts various gains (e.g. LAMP ADJUST / LIGHT ADJUST)."

  - id: cmd_037_information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Usage time updated at 1-minute intervals."

  - id: cmd_037_3_filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (DATA01-04, seconds) and filter alarm start time (DATA05-08, seconds). -1 if undefined."

  - id: cmd_037_4_lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: lamp
        type: enum
        description: "DATA01 lamp selector: 00h=Lamp 1, 01h=Lamp 2 (Lamp 2 only valid on two-lamp models)"
      - name: content
        type: enum
        description: "DATA02 content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
    notes: "Eco mode values reflect eco mode if enabled. Negative remaining life if replacement deadline exceeded."

  - id: cmd_037_6_carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: type
        type: enum
        description: "DATA01: 00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    notes: "Returns kilograms (DATA02-05, max 99999 kg) and milligrams (DATA06-09, max 999999 mg)."

  - id: cmd_050_remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: key_code
        type: integer
        description: "DATA01+DATA02 form WORD key code. Documented keys: POWER ON (02h 00h), POWER OFF (03h 00h), AUTO (05h 00h), MENU (06h 00h), UP (07h 00h), DOWN (08h 00h), RIGHT (09h 00h), LEFT (0Ah 00h), ENTER (0Bh 00h), EXIT (0Ch 00h), HELP (0Dh 00h), MAGNIFY UP (0Fh 00h), MAGNIFY DOWN (10h 00h), MUTE (13h 00h), PICTURE (29h 00h), COMPUTER1 (4Bh 00h), COMPUTER2 (4Ch 00h), VIDEO1 (4Fh 00h), S-VIDEO1 (51h 00h), VOLUME UP (84h 00h), VOLUME DOWN (85h 00h), FREEZE (8Ah 00h), ASPECT (A3h 00h), SOURCE (D7h 00h), LAMP MODE/ECO (EEh 00h)"
    notes: "Example (AUTO): 02h 0Fh 00h 00h 02h 05h 00h 18h"

  - id: cmd_051_shutter_close
    label: "051. SHUTTER CLOSE"
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []
    notes: "Closes the lens shutter."

  - id: cmd_052_shutter_open
    label: "052. SHUTTER OPEN"
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []
    notes: "Opens the lens shutter."

  - id: cmd_053_lens_control
    label: "053. LENS CONTROL"
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: integer
        description: "DATA01 lens target. Documented: 06h=Periphery Focus. UNRESOLVED: full target list not in provided source excerpt."
      - name: content
        type: enum
        description: "DATA02 drive action: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus (continuous), 81h=drive minus (continuous), FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
    notes: "After 7Fh/81h continuous drive, send 00h to stop. Lens can be controlled without stop while driving by issuing same command."

  - id: cmd_053_1_lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: target
        type: integer
        description: "DATA01 lens target (see cmd_053_lens_control)"
    notes: "Returns upper/lower adjustment range and current value."

  - id: cmd_053_2_lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: target
        type: integer
        description: "DATA01 target; FFh=Stop (mode/value ignored when stop)"
      - name: mode
        type: enum
        description: "DATA02 adjustment mode: 00h=absolute, 02h=relative"
      - name: value_low
        type: integer
        description: "DATA03 adjustment value (low-order 8 bits)"
      - name: value_high
        type: integer
        description: "DATA04 adjustment value (high-order 8 bits)"
    notes: "Adjusts lens position."

  - id: cmd_053_3_lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: operation
        type: enum
        description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "For reference lens memory use cmd_053_4."

  - id: cmd_053_4_reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: operation
        type: enum
        description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Operates on profile selected via cmd_053_10 LENS PROFILE SET."

  - id: cmd_053_5_lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: option
        type: enum
        description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    notes: "Returns DATA02 setting value: 00h=OFF, 01h=ON"

  - id: cmd_053_6_lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: option
        type: enum
        description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: value
        type: enum
        description: "DATA02 setting value: 00h=OFF, 01h=ON"

  - id: cmd_053_7_lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitfield lens operation status: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V). 0=Stop, 1=During operation. Bits5-7 reserved."

  - id: cmd_053_10_lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: profile
        type: enum
        description: "DATA01 profile number: 00h=Profile 1, 01h=Profile 2"
    notes: "Selects reference lens memory profile number."

  - id: cmd_053_11_lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns selected reference lens memory profile number (DATA01: 00h=Profile 1, 01h=Profile 2)."

  - id: cmd_060_1_gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: target
        type: enum
        description: "DATA01 adjusted value name: 00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"
    notes: "Returns 16 bytes: status, upper/lower limits, default, current value, wide/narrow adjustment widths, default-validity flag."

  - id: cmd_078_1_setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns 32 bytes: base model type (DATA01-03), sound function (DATA04), profile number (DATA05)."

  - id: cmd_078_2_running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status, cooling process, power on/off process, operation status."

  - id: cmd_078_3_input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns input signal switch process, signal list number, selection signal types, test pattern display, content displayed."

  - id: cmd_078_4_mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display."

  - id: cmd_078_5_model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Returns 32-byte model name (NUL-terminated)."

  - id: cmd_078_6_cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns mirror/lens cover status: 00h=Normal (cover opened), 01h=Cover closed."

  - id: cmd_079_freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: state
        type: enum
        description: "DATA01: 01h=freeze on, 02h=freeze off"

  - id: cmd_084_information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: info_type
        type: enum
        description: "DATA01: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"
    notes: "Returns label string length and label/information strings (NUL-terminated)."

  - id: cmd_097_8_eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns eco mode value (Light mode or Lamp mode depending on projector). Value list in source Appendix (UNRESOLVED: appendix not in provided excerpt)."

  - id: cmd_097_45_lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns 17-byte projector name (NUL-terminated)."

  - id: cmd_097_155_lan_mac_address_status_request2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns 6-byte MAC address."

  - id: cmd_097_198_pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: item
        type: enum
        description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    notes: "Returns setting value (MODE: 00h=PIP/01h=PICTURE BY PICTURE; START POSITION: 00h=TOP-LEFT/01h=TOP-RIGHT/02h=BOTTOM-LEFT/03h=BOTTOM-RIGHT; or sub input value)."

  - id: cmd_097_243_1_edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Returns edge blending setting: 00h=OFF, 01h=ON."

  - id: cmd_098_8_eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: eco_mode_value
        type: integer
        description: "DATA01 eco mode value. Value list in source Appendix (UNRESOLVED: appendix not in provided excerpt)."

  - id: cmd_098_45_lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
    params:
      - name: name
        type: string
        description: "DATA01-DATA16 projector name (up to 16 bytes)"
    notes: "Sets projector name (up to 16 bytes)."

  - id: cmd_098_198_pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: item
        type: enum
        description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "DATA02 setting value (per item; see request variant). Sub-input values in source Appendix (UNRESOLVED)."

  - id: cmd_098_243_1_edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: value
        type: enum
        description: "DATA01 setting value: 00h=OFF, 01h=ON"

  - id: cmd_305_1_base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type (DATA01-02) and model name (DATA03-11). Value list in source Appendix (UNRESOLVED)."

  - id: cmd_305_2_serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns 16-byte serial number (NUL-terminated)."

  - id: cmd_305_3_basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status."

  - id: cmd_319_10_audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: input_terminal
        type: integer
        description: "DATA01 input terminal. Value list in source Appendix (UNRESOLVED: appendix not in provided excerpt)."
      - name: setting_value
        type: enum
        description: "DATA02 setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Response framing per command class:
#   - 20h / A0h response pair (00h-class queries): success 20h, error A0h
#   - 22h / A2h (02h-class commands)
#   - 23h / A3h (03h-class commands)
#   - 21h / A1h (01h-class commands)
# Error frame: <Ax>h <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# ERR1/ERR2 codes documented in source section 2.4 (e.g. 00h 00h=unrecognized,
# 00h 01h=not supported by model, 01h 00h=invalid value, 02h 0Dh=power off,
# 02h 0Eh=execution failed).
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    notes: "From 078-2 DATA03/06 power status and operation status."
  - id: input_signal_state
    type: object
    notes: "From 078-3 INPUT STATUS REQUEST: signal switch, signal list number, selection signal types 1+2, test pattern, content displayed."
  - id: mute_state
    type: object
    notes: "From 078-4: picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display."
  - id: error_status
    type: bitfield
    notes: "From 009 ERROR STATUS REQUEST: 12-byte error bitfield covering cover, fan, temperature, power, lamp, formatter, FPGA, mirror cover, foreign matter sensor, interlock switch, system errors."
  - id: command_ack
    type: enum
    values: [success, error]
    notes: "Per-command success/error response with ERR1/ERR2 codes on failure."
```

## Variables
```yaml
# Settable parameters (mirrored from action params; these are the live-adjustable values):
variables:
  - id: brightness
    type: integer
    range: null  # UNRESOLVED: range from gain parameter request, not enumerated statically in source
  - id: contrast
    type: integer
    range: null  # UNRESOLVED
  - id: color
    type: integer
    range: null  # UNRESOLVED
  - id: hue
    type: integer
    range: null  # UNRESOLVED
  - id: sharpness
    type: integer
    range: null  # UNRESOLVED
  - id: volume
    type: integer
    range: null  # UNRESOLVED
  - id: lamp_adjust
    type: integer
    range: null  # UNRESOLVED
  - id: aspect
    type: integer
    notes: "Value list in source Appendix (UNRESOLVED)."
  - id: eco_mode
    type: integer
    notes: "Value list in source Appendix (UNRESOLVED)."
  - id: projector_name
    type: string
    max_length: 16
  - id: pip_pbp_mode
    type: enum
    values: [pip, picture_by_picture]
  - id: pip_pbp_start_position
    type: enum
    values: [top_left, top_right, bottom_left, bottom_right]
  - id: edge_blending
    type: enum
    values: [off, on]
  - id: freeze
    type: enum
    values: [off, on]
  - id: picture_mute
    type: enum
    values: [off, on]
  - id: sound_mute
    type: enum
    values: [off, on]
  - id: onscreen_mute
    type: enum
    values: [off, on]
  - id: lens_shutter
    type: enum
    values: [open, closed]
  - id: lens_memory_load_by_signal
    type: enum
    values: [off, on]
  - id: lens_memory_forced_mute
    type: enum
    values: [off, on]
  - id: reference_lens_memory_profile
    type: enum
    values: [profile_1, profile_2]
```

## Events
```yaml
# No unsolicited notifications documented in source. Device is strictly
# request/response.
events: []
```

## Macros
```yaml
# No multi-step sequences documented in source.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: "015. POWER ON"
    note: "While power-on is in progress, no other command is accepted."
  - command: "016. POWER OFF"
    note: "While power-off is in progress (including cooling time), no other command is accepted."
  - command: "020. PICTURE MUTE ON"
    note: "Picture mute is cleared by input terminal switch or video signal switch."
  - command: "022. SOUND MUTE ON"
    note: "Sound mute is cleared by input terminal switch, video signal switch, or volume adjustment."
  - command: "024. ONSCREEN MUTE ON"
    note: "Onscreen mute is cleared by input terminal switch or video signal switch."
  - command: "053. LENS CONTROL"
    note: "After continuous drive (7Fh/81h) a Stop (00h) must be sent to halt lens motion."
# Error code 02h 0Dh "The command cannot be accepted because the power is off"
# indicates many commands are inert while projector is in standby.
```

## Notes
- **Protocol framing:** All commands are hex byte frames, not ASCII. Each frame carries ID1 (control ID), ID2 (model code), LEN (data length), DATA..., and CKS (checksum = low-order byte of sum of all preceding bytes). Worked checksum example in source: `20h 81h 01h 60h 01h 00h` => sum `103h` => checksum `03h`.
- **Command class headers:** `00h`/`01h`/`02h`/`03h` lead bytes correspond to response lead bytes `20h`/`21h`/`22h`/`23h` on success, `A0h`/`A1h`/`A2h`/`A3h` on error.
- **ID2 model code:** Varies per projector model; value for Ld D091 U is not stated in this source excerpt and must be sourced from a model-specific table.
- **Baud rate:** Source enumerates five supported rates (115200, 38400, 19200, 9600, 4800 bps) — default is not stated.
- **Update granularity:** Lamp and filter usage times are returned in one-second units but refreshed at one-minute intervals.
- **Appendix references:** Multiple commands (018 input values, 030-12 aspect values, 097-8/098-8 eco mode values, 097-198/098-198 sub-input values, 305-1 base model types, 319-10 input terminal values) refer to a source Appendix ("Supplementary Information by Command") that is not present in the provided refined excerpt — those enum/parameter value lists are marked UNRESOLVED.

<!-- UNRESOLVED: ID2 (model code) for Ld D091 U not stated in source. -->
<!-- UNRESOLVED: Default control ID (ID1) not stated in source. -->
<!-- UNRESOLVED: Default baud rate not stated (five supported rates enumerated). -->
<!-- UNRESOLVED: Serial flow control not explicitly stated (source lists "Full duplex" communication mode only). -->
<!-- UNRESOLVED: Firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: Source Appendix "Supplementary Information by Command" not in provided excerpt — input terminal, aspect, eco mode, sub-input, base model type enum value lists unavailable. -->
<!-- UNRESOLVED: Full DATA01 target list for 053 LENS CONTROL (only 06h=Periphery Focus documented). -->
<!-- UNRESOLVED: Adjustment value ranges for brightness/contrast/color/hue/sharpness/volume/lamp not enumerated statically (must be queried via 060-1 GAIN PARAMETER REQUEST 3). -->
```

53 actions emitted — one per source-documented command row (009 → 319-10). Nothing fabricated; UNRESOLVED markers on ID2, baud default, appendix enums, ranges.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:43:21.278Z
last_checked_at: 2026-06-17T19:58:28.107Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:58:28.107Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched with exact hex command sequences confirmed verbatim in source document; transport parameters verified; complete bidirectional coverage. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "ID2 (model code) value for this specific model not stated in source; must be set per model."
- "Firmware version compatibility not stated in source."
- "Default control ID (ID1) value not stated in source."
- "flow_control not stated; source says full-duplex communication mode"
- "appendix not in provided source excerpt).\""
- "full target list not in provided source excerpt.\""
- "appendix not in provided excerpt).\""
- "range from gain parameter request, not enumerated statically in source"
- "ID2 (model code) for Ld D091 U not stated in source."
- "Default control ID (ID1) not stated in source."
- "Default baud rate not stated (five supported rates enumerated)."
- "Serial flow control not explicitly stated (source lists \"Full duplex\" communication mode only)."
- "Source Appendix \"Supplementary Information by Command\" not in provided excerpt — input terminal, aspect, eco mode, sub-input, base model type enum value lists unavailable."
- "Full DATA01 target list for 053 LENS CONTROL (only 06h=Periphery Focus documented)."
- "Adjustment value ranges for brightness/contrast/color/hue/sharpness/volume/lamp not enumerated statically (must be queried via 060-1 GAIN PARAMETER REQUEST 3)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
