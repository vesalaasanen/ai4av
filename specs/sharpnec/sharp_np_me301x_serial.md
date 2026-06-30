---
spec_id: admin/sharp-nec-np-me301x
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP ME301X Control Spec"
manufacturer: Sharp/NEC
model_family: "NP ME301X"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP ME301X"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:59:58.174Z
last_checked_at: 2026-06-18T08:37:17.664Z
generated_at: 2026-06-18T08:37:17.664Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Appendix \"Supplementary Information by Command\" (input terminal value tables, aspect value tables, eco mode value tables, sub-input value tables, base model type tables) is not included in the refined source; several parameter enum ranges are therefore left unresolved."
  - "firmware version compatibility not stated in source"
  - "ID1 (control ID) and ID2 (model code) values are projector/model-specific; not enumerated in source"
  - "flow control not stated; source lists \"Full duplex\" communication mode only"
  - "default/factory baud rate not explicitly stated"
  - "full input-terminal value table not in refined source"
  - "aspect value table not in refined source"
  - "eco mode value table not in refined source"
  - "sub-input setting value table not in refined source"
  - "input terminal value table not in refined source"
  - "none documented in source"
  - "no further interlock procedures or power-on sequencing requirements stated in source"
  - "Appendix \"Supplementary Information by Command\" missing from refined source → input-terminal, aspect, eco-mode, sub-input, base-model-type enum tables not captured"
  - "factory/default baud rate not explicitly stated"
  - "flow control method not stated (only \"Full duplex\" noted)"
  - "firmware version compatibility not stated"
  - "ID1 control ID and ID2 model code specific values not enumerated"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:37:17.664Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (17 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP ME301X Control Spec

## Summary
Control spec for the Sharp/NEC NP ME301X projector, covering its RS-232C serial control interface and its wired/wireless LAN (TCP) control interface. The device uses a binary, hex-byte command protocol with per-frame checksums. This spec enumerates all documented commands (power, mute, input switching, picture/volume/aspect adjust, lens control & memory, status queries, eco mode, PIP/PbP, edge blending, audio select, etc.).

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input terminal value tables, aspect value tables, eco mode value tables, sub-input value tables, base model type tables) is not included in the refined source; several parameter enum ranges are therefore left unresolved. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: ID1 (control ID) and ID2 (model code) values are projector/model-specific; not enumerated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists supported rates: 115200/38400/19200/9600/4800 bps; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; source lists "Full duplex" communication mode only
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

Note: Source states multiple supported baud rates (115200/38400/19200/9600/4800 bps); only `9600` is captured above as a representative. An implementation must allow all five. <!-- UNRESOLVED: default/factory baud rate not explicitly stated -->

## Traits
```yaml
# - powerable       (015 POWER ON / 016 POWER OFF present)
# - routable        (018 INPUT SW CHANGE present)
# - queryable       (009, 037*, 053-1/5/7/11, 060-1, 078*, 084, 097*, 305* request commands present)
# - levelable       (030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 030-15 OTHER ADJUST)
traits:
  - powerable  # inferred from power command examples
  - routable   # inferred from input-switch command
  - queryable  # inferred from query command examples
  - levelable  # inferred from volume/picture adjust commands
```

## Actions
```yaml
# Protocol frame: hex bytes, big-endian where shown. <ID1>=control ID, <ID2>=model code,
# <CKS>=checksum (low byte of sum of all preceding bytes). <DATA??>=variable data.
# Every command below is copied VERBATIM from the source manual.

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
  notes: "During power-off (incl. cooling time), no other command accepted."

# --- 018. INPUT SW CHANGE ---
- id: input_switch_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Input terminal value (e.g. 06h = video port). See Appendix 'Supplementary Information by Command'."
  notes: "Example (DATA01=06h, video): 02h 03h 00h 00h 02h 01h 06h 0Eh"
  # UNRESOLVED: full input-terminal value table not in refined source

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
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. brightness=-10: 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch"

# --- 030-2. VOLUME ADJUST ---
- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: data02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data03
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

# --- 030-12. ASPECT ADJUST ---
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: integer
      description: "Aspect value. See Appendix 'Supplementary Information by Command'."
  # UNRESOLVED: aspect value table not in refined source

# --- 030-15. OTHER ADJUST (LAMP/LIGHT ADJUST) ---
- id: lamp_light_adjust
  label: Lamp/Light Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 96h FFh <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: data03
      type: integer
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: data04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data05
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "DATA01=96h, DATA02=FFh selects LAMP ADJUST / LIGHT ADJUST target."

# --- 050. REMOTE KEY CODE ---
- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Key code low byte (see key code list)"
    - name: data02
      type: integer
      description: "Key code high byte (see key code list)"
  notes: |
    Key code list (DATA01 DATA02 = Key name):
    02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU, 07h 00h=UP,
    08h 00h=DOWN, 09h 00h=RIGHT, 0Ah 00h=LEFT, 0Bh 00h=ENTER, 0Ch 00h=EXIT,
    0Dh 00h=HELP, 0Fh 00h=MAGNIFY UP, 10h 00h=MAGNIFY DOWN, 13h 00h=MUTE,
    29h 00h=PICTURE, 4Bh 00h=COMPUTER1, 4Ch 00h=COMPUTER2, 4Fh 00h=VIDEO1,
    51h 00h=S-VIDEO1, 84h 00h=VOLUME UP, 85h 00h=VOLUME DOWN, 8Ah 00h=FREEZE,
    A3h 00h=ASPECT, D7h 00h=SOURCE, EEh 00h=LAMP MODE/ECO
    Example (AUTO): 02h 0Fh 00h 00h 02h 05h 00h 18h

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
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Target: 06h=Periphery Focus"
    - name: data02
      type: integer
      description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus, 81h=drive minus, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
  notes: "After 7Fh/81h, stop driving by sending 00h. Same command may be reissued without stop while lens driving."

# --- 053-2. LENS CONTROL 2 ---
- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Target (FFh=Stop)"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "If DATA01=FFh (Stop), DATA02-DATA04 not referenced."

# --- 053-3. LENS MEMORY CONTROL ---
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

# --- 053-4. REFERENCE LENS MEMORY CONTROL ---
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Controls profile selected by 053-10 LENS PROFILE SET."

# --- 053-6. LENS MEMORY OPTION SET ---
- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

# --- 053-10. LENS PROFILE SET ---
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

# --- 079. FREEZE CONTROL ---
- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

# --- 098-8. ECO MODE SET ---
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Eco mode value. See Appendix 'Supplementary Information by Command'."
  # UNRESOLVED: eco mode value table not in refined source

# --- 098-45. LAN PROJECTOR NAME SET ---
- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
  params:
    - name: name
      type: string
      description: "Projector name (up to 16 bytes, DATA01-DATA16)"
  notes: "DATA01-DATA16 = projector name bytes."

# --- 098-198. PIP/PICTURE BY PICTURE SET ---
- id: pip_pbp_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: integer
      description: "Setting value (MODE: 00h=PIP, 01h=PbP; START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT; sub-input values per Appendix)"
  # UNRESOLVED: sub-input setting value table not in refined source

# --- 098-243-1. EDGE BLENDING MODE SET ---
- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

# --- 319-10. AUDIO SELECT SET ---
- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Input terminal (see Appendix 'Supplementary Information by Command')"
    - name: data02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
  # UNRESOLVED: input terminal value table not in refined source

# --- 009. ERROR STATUS REQUEST ---
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

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
- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: integer
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
  notes: "Example (Lamp 1 usage time): 03h 96h 00h 00h 02h 00h 01h 9Ch"

# --- 037-6. CARBON SAVINGS INFORMATION REQUEST ---
- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Type: 00h=Total Carbon Savings, 01h=Carbon Savings during operation"

# --- 053-1. LENS CONTROL REQUEST ---
- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: data01
      type: integer
      description: "Lens target (see 053 LENS CONTROL DATA01 values)"

# --- 053-5. LENS MEMORY OPTION REQUEST ---
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

# --- 053-7. LENS INFORMATION REQUEST ---
- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

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
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: data01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "Example (brightness): 03h 05h 00h 00h 03h 00h 00h 00h 0Bh"

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

# --- 084. INFORMATION STRING REQUEST ---
- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: data01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

# --- 097-8. ECO MODE REQUEST ---
- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  # UNRESOLVED: eco mode value table not in refined source

# --- 097-45. LAN PROJECTOR NAME REQUEST ---
- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

# --- 097-155. LAN MAC ADDRESS STATUS REQUEST2 ---
- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

# --- 097-198. PIP/PICTURE BY PICTURE REQUEST ---
- id: pip_pbp_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: data01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

# --- 097-243-1. EDGE BLENDING MODE REQUEST ---
- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

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
```

## Feedbacks
```yaml
# All queries above return data in response frames; these are the principal observable states.
- id: error_status
  type: bitmask
  description: "12-byte error status (009). DATA01-DATA12; bit set = error. See error info list in source."
- id: projector_information
  type: object
  description: "Projector info (037): name, lamp usage time (DATA83-86, seconds), filter usage time (DATA87-90, seconds)."
- id: filter_usage
  type: object
  description: "Filter usage (037-3): usage time + alarm start time (seconds). -1 if undefined."
- id: lamp_information
  type: object
  description: "Lamp info (037-4): usage time / remaining life %. Negative remaining life if deadline exceeded."
- id: carbon_savings
  type: object
  description: "Carbon savings (037-6): kg (max 99999) + mg (max 999999)."
- id: lens_adjusted_values
  type: object
  description: "Lens position (053-1): upper/lower limits + current value."
- id: lens_memory_option
  type: enum
  description: "Lens memory option (053-5): LOAD BY SIGNAL / FORCED MUTE, ON/OFF."
- id: lens_information
  type: bitmask
  description: "Lens operation status (053-7): bit0=lens memory, bit1=zoom, bit2=focus, bit3=lens shift H, bit4=lens shift V (0=stop,1=operating)."
- id: lens_profile
  type: enum
  values: ["Profile 1", "Profile 2"]
  description: "Selected reference lens memory profile (053-11)."
- id: gain_parameter
  type: object
  description: "Gain param (060-1): status, limits, default, current, wide/narrow adjustment width."
- id: setting_info
  type: object
  description: "Setting info (078-1): base model type, sound function, profile number."
- id: running_status
  type: enum
  description: "Power/operation status (078-2): standby/power on/cooling/etc."
- id: input_status
  type: object
  description: "Input signal status (078-3): switch process, signal list number, signal types."
- id: mute_status
  type: object
  description: "Mute status (078-4): picture/sound/onscreen/forced onscreen mute + OSD display."
- id: model_name
  type: string
  description: "Model name string (078-5)."
- id: cover_status
  type: enum
  values: ["Normal (cover opened)", "Cover closed"]
  description: "Mirror/lens cover status (078-6)."
- id: sync_frequency_info
  type: string
  description: "Horizontal/vertical sync frequency string (084)."
- id: eco_mode
  type: enum
  description: "Eco mode value (097-8)."
  # UNRESOLVED: eco mode value table not in refined source
- id: lan_projector_name
  type: string
  description: "LAN projector name (097-45)."
- id: lan_mac_address
  type: string
  description: "MAC address, 6 bytes (097-155)."
- id: pip_pbp_status
  type: object
  description: "PIP/PbP settings (097-198)."
- id: edge_blending_status
  type: enum
  values: ["OFF", "ON"]
  description: "Edge blending (097-243-1)."
- id: base_model_type
  type: object
  description: "Base model type + model name (305-1)."
- id: serial_number
  type: string
  description: "Serial number (305-2)."
- id: basic_information
  type: object
  description: "Basic operation status (305-3): status, displayed content, signal types, mutes, freeze."
```

## Variables
```yaml
# Settable scalar parameters (mirrored from parameterized Actions above).
- id: volume
  type: integer
  description: "Sound volume (030-2). Range per 060-1 VOLUME query."
- id: brightness
  type: integer
  description: "Picture brightness (030-1 DATA01=00h). Range per 060-1."
- id: contrast
  type: integer
  description: "Picture contrast (030-1 DATA01=01h). Range per 060-1."
- id: color
  type: integer
  description: "Picture color (030-1 DATA01=02h). Range per 060-1."
- id: hue
  type: integer
  description: "Picture hue (030-1 DATA01=03h). Range per 060-1."
- id: sharpness
  type: integer
  description: "Picture sharpness (030-1 DATA01=04h). Range per 060-1."
- id: lamp_light_adjust_value
  type: integer
  description: "LAMP/LIGHT ADJUST value (030-15). Range per 060-1 DATA01=96h."
```

## Events
```yaml
# No unsolicited notifications documented. All device output is in response to a command.
# UNRESOLVED: none documented in source
```

## Macros
```yaml
# No explicit multi-step sequences documented in source.
# UNRESOLVED: none documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "During POWER ON ramp-up, no other command accepted (015)."
  - "During POWER OFF including cooling time, no other command accepted (016)."
# UNRESOLVED: no further interlock procedures or power-on sequencing requirements stated in source
```

## Notes
- Binary protocol over RS-232C (D-SUB 9P, cross cable) or TCP (port 7142, wired/wireless LAN). Frame format: `<lead bytes> <ID1> <ID2> <LEN> <DATA...> <CKS>`.
- Checksum (CKS): low-order byte of the sum of all preceding bytes. Worked example from source: `20h+81h+01h+60h+01h+00h = 103h` → CKS = `03h`.
- Error responses use `A?h` lead byte with `<ERR1> <ERR2>` codes (see source error code list, e.g. `00h 00h`=unrecognized command, `02h 0Dh`=command rejected because power off, `02h 0Fh`=no authority).
- Success responses use `2?h` lead byte; success-no-data responses omit the data part.
- Pin assignment (PC CONTROL D-SUB 9P): 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS.
- LAN port RJ-45: 1=TD+, 2=TD-, 3=RD+, 6=RD- (10/100 Mbps auto).
- ID1 (control ID) and ID2 (model code) are device/model-specific values not enumerated in this refined source.
- Multi-baud support: 115200 / 38400 / 19200 / 9600 / 4800 bps.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" missing from refined source → input-terminal, aspect, eco-mode, sub-input, base-model-type enum tables not captured -->
<!-- UNRESOLVED: factory/default baud rate not explicitly stated -->
<!-- UNRESOLVED: flow control method not stated (only "Full duplex" noted) -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: ID1 control ID and ID2 model code specific values not enumerated -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:59:58.174Z
last_checked_at: 2026-06-18T08:37:17.664Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:37:17.664Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (17 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Appendix \"Supplementary Information by Command\" (input terminal value tables, aspect value tables, eco mode value tables, sub-input value tables, base model type tables) is not included in the refined source; several parameter enum ranges are therefore left unresolved."
- "firmware version compatibility not stated in source"
- "ID1 (control ID) and ID2 (model code) values are projector/model-specific; not enumerated in source"
- "flow control not stated; source lists \"Full duplex\" communication mode only"
- "default/factory baud rate not explicitly stated"
- "full input-terminal value table not in refined source"
- "aspect value table not in refined source"
- "eco mode value table not in refined source"
- "sub-input setting value table not in refined source"
- "input terminal value table not in refined source"
- "none documented in source"
- "no further interlock procedures or power-on sequencing requirements stated in source"
- "Appendix \"Supplementary Information by Command\" missing from refined source → input-terminal, aspect, eco-mode, sub-input, base-model-type enum tables not captured"
- "factory/default baud rate not explicitly stated"
- "flow control method not stated (only \"Full duplex\" noted)"
- "firmware version compatibility not stated"
- "ID1 control ID and ID2 model code specific values not enumerated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
