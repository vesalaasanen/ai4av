---
spec_id: admin/sharp-nec-ea241f-bk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Projector Control Spec"
manufacturer: Sharp/NEC
model_family: "EA241F BK"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "EA241F BK"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:01:29.316Z
last_checked_at: 2026-06-17T19:46:43.128Z
generated_at: 2026-06-17T19:46:43.128Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific projector model not named in source; supplied model"
  - "no authentication procedure described in source."
  - "input-terminal value table lives in an \"Appendix / Supplementary"
  - "source states \"Communication mode: Full duplex\" but no flow-control setting (RTS/CTS/XON-XOFF) is named. Serial cable pins 7(RTS)/8(CTS) are cross-connected."
  - "input-terminal value enum not present in refined excerpt"
  - "aspect value enum not present in refined excerpt"
  - "eco-mode value enum not present in refined excerpt"
  - "absolute min/max/default ranges for each variable are returned"
  - "no event/notification mechanism documented."
  - "no multi-step sequences described explicitly in source."
  - "source states operational lockouts (no other command accepted"
  - "model identity — supplied device \"EA241F BK\" (a monitor) is not corroborated by this projector manual; verify the correct device + source pairing."
  - "firmware version compatibility not stated in source."
  - "protocol version number not stated in source."
  - "flow-control setting not stated (only \"Full duplex\" communication mode)."
  - "input-terminal / aspect / eco-mode / base-model-type / sub-input enum tables live in an appendix not present in the refined source excerpt."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:46:43.128Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim to source hex commands; transport (TCP/serial, port, baud rates) fully supported. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Projector Control Spec

## Summary
Binary RS-232C and TCP/LAN control protocol for a Sharp/NEC projector, as documented in "Projector Control Command Reference Manual" (document BDT140013, Revision 7.1). Commands are framed hex byte sequences with an additive low-byte checksum; the catalogue covers power, input switching, mutes (picture/sound/onscreen), picture/volume/aspect/lens adjustment, lens memory, shutter, freeze, eco mode, edge blending, PIP/Picture-by-Picture, and a broad set of status/information queries.

<!-- UNRESOLVED: specific projector model not named in source; supplied model
     "EA241F BK" is a monitor and could not be corroborated. -->
<!-- UNRESOLVED: no authentication procedure described in source. -->
<!-- UNRESOLVED: input-terminal value table lives in an "Appendix / Supplementary
     Information by Command" not present in the refined source excerpt; several
     DATA01 input-terminal enums are therefore unresolved. -->

## Transport
```yaml
# Source documents BOTH a serial (RS-232C) interface and a wired/wireless LAN
# (TCP) interface. Both protocol groups emitted.
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands."
auth:
  type: none  # inferred: no auth procedure in source
serial:
  baud_rate:
    - 4800
    - 9600
    - 19200
    - 38400
    - 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: source states "Communication mode: Full duplex" but no flow-control setting (RTS/CTS/XON-XOFF) is named. Serial cable pins 7(RTS)/8(CTS) are cross-connected.
```

## Traits
```yaml
- powerable  # inferred from 015 POWER ON / 016 POWER OFF
- queryable  # inferred from extensive status/information request commands
- levelable  # inferred from 030-1 PICTURE ADJUST and 030-2 VOLUME ADJUST
- routable   # inferred from 018 INPUT SW CHANGE (input terminal selection)
```

## Actions
```yaml
# All command payloads copied verbatim from source (hex byte frames).
# General frame parameters (per source §2.2):
#   ID1 = control ID set on projector
#   ID2 = model code (varies by model)
#   CKS = checksum = low-order byte of sum of all preceding bytes
#   LEN = data length of DATA part following LEN
# Commands below that include <CKS> require a computed checksum at runtime.

- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h  88h  00h  00h  00h  88h"
  params: []

- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02h  00h  00h  00h  00h  02h"
  params: []
  notes: "No other command accepted while power-on is in progress."

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h  01h  00h  00h  00h  03h"
  params: []
  notes: "No other command accepted during power-off (including cooling time)."

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h  03h  00h  00h  02h  01h  <DATA01>  <CKS>"
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal value (DATA01). Source example: 06h = video port. Full value table is in source Appendix 'Supplementary Information by Command'."
      # UNRESOLVED: input-terminal value enum not present in refined excerpt
  notes: "Example from source (switch to video, DATA01=06h): 02h  03h  00h  00h  02h  01h  06h  0Eh"

- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h  10h  00h  00h  00h  12h"
  params: []

- id: picture_mute_off
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02h  11h  00h  00h  00h  13h"
  params: []

- id: sound_mute_on
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02h  12h  00h  00h  00h  14h"
  params: []

- id: sound_mute_off
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02h  13h  00h  00h  00h  15h"
  params: []

- id: onscreen_mute_on
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02h  14h  00h  00h  00h  16h"
  params: []

- id: onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h  15h  00h  00h  00h  17h"
  params: []

- id: picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h  10h  00h  00h  05h  <DATA01>  FFh  <DATA02>  <DATA03>  <DATA04>  <CKS>"
  params:
    - name: target
      type: enum
      description: "Adjustment target (DATA01): 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: enum
      description: "Adjustment mode (DATA02): 00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: "Adjustment value, 16-bit little-endian (DATA03 low, DATA04 high)"
  notes: "Source example (brightness=10): 03h  10h  00h  00h  05h  00h  FFh  00h  0Ah  00h  21h"

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h  10h  00h  00h  05h  05h  00h  <DATA01>  <DATA02>  <DATA03>  <CKS>"
  params:
    - name: mode
      type: enum
      description: "Adjustment mode (DATA01): 00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: "Adjustment value, 16-bit little-endian (DATA02 low, DATA03 high)"
  notes: "Source example (volume=10): 03h  10h  00h  00h  05h  05h  00h  00h  0Ah  00h  27h"

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h  10h  00h  00h  05h  18h  00h  00h  <DATA01>  00h  <CKS>"
  params:
    - name: aspect
      type: integer
      description: "Value set for the aspect (DATA01). Enum in source Appendix 'Supplementary Information by Command'."
      # UNRESOLVED: aspect value enum not present in refined excerpt

- id: other_adjust
  label: "030-15. OTHER ADJUST (LAMP/LIGHT ADJUST)"
  kind: action
  command: "03h  10h  00h  00h  05h  <DATA01>  <DATA02>  <DATA03>  <DATA04>  <DATA05>  <CKS>"
  params:
    - name: target
      type: enum
      description: "DATA01=96h, DATA02=FFh => LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: enum
      description: "Adjustment mode (DATA03): 00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: "Adjustment value, 16-bit little-endian (DATA04 low, DATA05 high)"

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h  8Ah  00h  00h  00h  8Dh"
  params: []
  notes: "Returns projector name, lamp usage time (s), filter usage time (s). Updated at 1-minute intervals."

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h  95h  00h  00h  00h  98h"
  params: []
  notes: "Returns filter usage time (s) and filter alarm start time (s); -1 if undefined."

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h  96h  00h  00h  02h  <DATA01>  <DATA02>  <CKS>"
  params:
    - name: lamp
      type: enum
      description: "DATA01: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: content
      type: enum
      description: "DATA02: 01h=lamp usage time (s), 04h=lamp remaining life (%)"

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h  9Ah  00h  00h  01h  <DATA01>  <CKS>"
  params:
    - name: type
      type: enum
      description: "DATA01: 00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h  0Fh  00h  00h  02h  <DATA01>  <DATA02>  <CKS>"
  params:
    - name: key_code
      type: enum
      description: "Key code (WORD, DATA01 low / DATA02 high). Source key-code list: 02h/00h=POWER ON, 03h/00h=POWER OFF, 05h/00h=AUTO, 06h/00h=MENU, 07h/00h=UP, 08h/00h=DOWN, 09h/00h=RIGHT, 0Ah/00h=LEFT, 0Bh/00h=ENTER, 0Ch/00h=EXIT, 0Dh/00h=HELP, 0Fh/00h=MAGNIFY UP, 10h/00h=MAGNIFY DOWN, 13h/00h=MUTE, 29h/00h=PICTURE, 4Bh/00h=COMPUTER1, 4Ch/00h=COMPUTER2, 4Fh/00h=VIDEO1, 51h/00h=S-VIDEO1, 84h/00h=VOLUME UP, 85h/00h=VOLUME DOWN, 8Ah/00h=FREEZE, A3h/00h=ASPECT, D7h/00h=SOURCE, EEh/00h=LAMP MODE/ECO"
  notes: "Source example (AUTO): 02h  0Fh  00h  00h  02h  05h  00h  18h"

- id: shutter_close
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02h  16h  00h  00h  00h  18h"
  params: []

- id: shutter_open
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02h  17h  00h  00h  00h  19h"
  params: []

- id: lens_control
  label: "053. LENS CONTROL"
  kind: action
  command: "02h  18h  00h  00h  02h  <DATA01>  <DATA02>  <CKS>"
  params:
    - name: target
      type: enum
      description: "DATA01: 06h=Periphery Focus"
    - name: content
      type: enum
      description: "DATA02: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus (continuous), 81h=drive minus (continuous), FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
  notes: "After 7Fh/81h, send 00h to stop. Lens can be re-commanded without stop while driving."

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h  1Ch  00h  00h  02h  <DATA01>  00h  <CKS>"
  params:
    - name: target
      type: integer
      description: "Lens target (DATA01)"
  notes: "Returns upper/lower adjustment limits and current value."

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h  1Dh  00h  00h  04h  <DATA01>  <DATA02>  <DATA03>  <DATA04>  <CKS>"
  params:
    - name: target
      type: enum
      description: "DATA01: FFh=Stop; otherwise adjustment target"
    - name: mode
      type: enum
      description: "DATA02: 00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: "Adjustment value, 16-bit little-endian (DATA03 low, DATA04 high)"
  notes: "If DATA01=FFh (Stop), mode/value are ignored."

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h  1Eh  00h  00h  01h  <DATA01>  <CKS>"
  params:
    - name: operation
      type: enum
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h  1Fh  00h  00h  01h  <DATA01>  <CKS>"
  params:
    - name: operation
      type: enum
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Operates on the profile number set by 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h  20h  00h  00h  01h  <DATA01>  <CKS>"
  params:
    - name: option
      type: enum
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h  21h  00h  00h  02h  <DATA01>  <DATA02>  <CKS>"
  params:
    - name: option
      type: enum
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: enum
      description: "DATA02: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h  22h  00h  00h  01h  00h  25h"
  params: []
  notes: "DATA01 bitfield: bit0=lens memory, bit1=zoom, bit2=focus, bit3=lens shift(H), bit4=lens shift(V) - 0=stop, 1=in operation."

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h  27h  00h  00h  01h  <DATA01>  <CKS>"
  params:
    - name: profile
      type: enum
      description: "DATA01: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h  28h  00h  00h  00h  2Ah"
  params: []

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h  05h  00h  00h  03h  <DATA01>  00h  00h  <CKS>"
  params:
    - name: name
      type: enum
      description: "Adjusted value name (DATA01): 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h  85h  00h  00h  01h  00h  86h"
  params: []

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h  85h  00h  00h  01h  01h  87h"
  params: []

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h  85h  00h  00h  01h  02h  88h"
  params: []

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h  85h  00h  00h  01h  03h  89h"
  params: []

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h  85h  00h  00h  01h  04h  8Ah"
  params: []

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h  85h  00h  00h  01h  05h  8Bh"
  params: []

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h  98h  00h  00h  01h  <DATA01>  <CKS>"
  params:
    - name: state
      type: enum
      description: "DATA01: 01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h  D0h  00h  00h  03h  00h  <DATA01>  01h  <CKS>"
  params:
    - name: type
      type: enum
      description: "DATA01: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h  B0h  00h  00h  01h  07h  BBh"
  params: []
  notes: "Returns Light mode or Lamp mode value depending on projector."

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h  B0h  00h  00h  01h  2Ch  E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h  B0h  00h  00h  02h  9Ah  00h  4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h  B0h  00h  00h  02h  C5h  <DATA01>  <CKS>"
  params:
    - name: item
      type: enum
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h  B0h  00h  00h  02h  DFh  00h  94h"
  params: []

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h  B1h  00h  00h  02h  07h  <DATA01>  <CKS>"
  params:
    - name: value
      type: integer
      description: "Eco mode value (DATA01). Enum in source Appendix 'Supplementary Information by Command'."
      # UNRESOLVED: eco-mode value enum not present in refined excerpt

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h  B1h  00h  00h  12h  2Ch  <DATA01>  <DATA02>  <DATA03>  <DATA04>  <DATA05>  <DATA06>  <DATA07>  <DATA08>  <DATA09>  <DATA10>  <DATA11>  <DATA12>  <DATA13>  <DATA14>  <DATA15>  <DATA16>  00h  <CKS>"
  params:
    - name: name
      type: string
      description: "Projector name (DATA01-DATA16, up to 16 bytes, NUL-terminated)"

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h  B1h  00h  00h  03h  C5h  <DATA01>  <DATA02>  <CKS>"
  params:
    - name: item
      type: enum
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "Setting value (DATA02). MODE: 00h=PIP, 01h=PbP. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub-input enum in source Appendix."

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h  B1h  00h  00h  03h  DFh  00h  <DATA01>  <CKS>"
  params:
    - name: value
      type: enum
      description: "DATA01: 00h=OFF, 01h=ON"

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h  BFh  00h  00h  01h  00h  C0h"
  params: []

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h  BFh  00h  00h  02h  01h  06h  C8h"
  params: []

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h  BFh  00h  00h  01h  02h  C2h"
  params: []

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h  C9h  00h  00h  03h  09h  <DATA01>  <DATA02>  <CKS>"
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal (DATA01). Value table in source Appendix 'Supplementary Information by Command'."
      # UNRESOLVED: input-terminal value enum not present in refined excerpt
    - name: value
      type: enum
      description: "DATA02: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  type: bitfield
  description: "009 response DATA01-DATA12. Bit set: cover error, fan error, temperature error, power error, lamp off/replacement, formatter/FPGA error, mirror cover error, foreign-matter sensor, lens not installed, interlock switch open, system error (slave CPU / formatter). See source §3.1 bit table."

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "078-2 DATA03/DATA06 and 305-3 DATA01."

- id: input_signal_status
  type: composite
  description: "078-3 / 305-3: signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern, content displayed."

- id: mute_status
  type: composite
  description: "078-4: picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display (each on/off)."

- id: cover_status
  type: enum
  values: [normal_open, closed]
  description: "078-6: mirror/lens cover."

- id: lamp_usage_time
  type: integer
  unit: seconds
  description: "037 DATA83-86 / 037-4 (content 01h). Updated 1-minute intervals."

- id: lamp_remaining_life
  type: integer
  unit: percent
  description: "037-4 (content 04h). Negative if replacement deadline exceeded."

- id: filter_usage_time
  type: integer
  unit: seconds
  description: "037-3 DATA01-04."

- id: model_name
  type: string
  description: "078-5 / 305-1 model-name field."

- id: base_model_type
  type: integer
  description: "305-1 / 078-1. Value table in source Appendix."

- id: serial_number
  type: string
  description: "305-2."

- id: mac_address
  type: string
  description: "097-155 (6 bytes)."

- id: projector_name
  type: string
  description: "097-45 / 037 DATA01-49 (up to 16 bytes settable)."

- id: eco_mode
  type: integer
  description: "097-8 (Light mode / Lamp mode). Value table in source Appendix."

- id: gain_parameter
  type: composite
  description: "060-1: status, upper/lower limits, default, current, wide/narrow adjustment width for brightness/contrast/color/hue/sharpness/volume/lamp-adjust."

- id: lens_position
  type: composite
  description: "053-1: upper/lower limits and current value per lens target."

- id: lens_operation_status
  type: bitfield
  description: "053-7: lens memory / zoom / focus / lens shift(H) / lens shift(V) operation state."

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  description: "053-11."

- id: lens_memory_option
  type: composite
  description: "053-5: LOAD BY SIGNAL / FORCED MUTE on/off."

- id: information_string
  type: string
  description: "084: horizontal/vertical sync frequency strings."

- id: pip_pbyp_state
  type: composite
  description: "097-198: mode (PIP/PbP), start position, sub inputs 1-3."

- id: edge_blending_mode
  type: enum
  values: [off, on]
  description: "097-243-1."

- id: carbon_savings
  type: composite
  description: "037-6: total / during-operation carbon savings (kg + mg)."

- id: running_status
  type: composite
  description: "078-2: power status, cooling process, power on/off process, operation status."
```

## Variables
```yaml
- id: volume
  type: integer
  description: "Sound volume (030-2 / 060-1 name 05h)."
- id: brightness
  type: integer
  description: "Picture brightness (030-1 target 00h / 060-1 name 00h)."
- id: contrast
  type: integer
  description: "Picture contrast (030-1 target 01h / 060-1 name 01h)."
- id: color
  type: integer
  description: "Picture color (030-1 target 02h / 060-1 name 02h)."
- id: hue
  type: integer
  description: "Picture hue (030-1 target 03h / 060-1 name 03h)."
- id: sharpness
  type: integer
  description: "Picture sharpness (030-1 target 04h / 060-1 name 04h)."
- id: lamp_light_adjust
  type: integer
  description: "Lamp/Light adjust (030-15 / 060-1 name 96h)."
# UNRESOLVED: absolute min/max/default ranges for each variable are returned
# dynamically by 060-1 GAIN PARAMETER REQUEST 3; static bounds not tabulated in source.
```

## Events
```yaml
# Source describes no unsolicited notifications - all responses are solicited
# (returned after a command). 
# UNRESOLVED: no event/notification mechanism documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source states operational lockouts (no other command accepted
# during power-on or during power-off incl. cooling time; error 02h/0Dh =
# "command cannot be accepted because the power is off"; error 02h/0Fh =
# "no authority for the operation") but describes no explicit safety interlock
# procedure or power-on sequencing requirement.
```

## Notes
- Document is a generic Sharp/NEC projector command reference (BDT140013 Rev 7.1); it names no individual product model.
- Command/response framing: leading byte distinguishes direction/type — `0xh` request, `2xh` success response, `Axh` error response. Parameters `ID1` (control ID), `ID2` (model code), `CKS` (checksum), `LEN` (data length) are common to all commands.
- Checksum (CKS) = low-order one byte of the sum of all preceding bytes. Example from source: `20h+81h+01h+60h+01h+00h = 103h` → CKS = `03h`.
- Serial config: RS-232C cross cable on the PC CONTROL port (D-SUB 9P); pins 2(RxD)/3(TxD)/5(GND)/7(RTS)/8(CTS) cross-connected. Full-duplex.
- LAN: wired RJ-45 (10/100 Mbps auto) or wireless LAN unit; TCP port 7142 for command send/receive.
- Error responses carry `ERR1`/`ERR2` code pairs (source §2.4 list, e.g. 00h/00h = unrecognized command, 01h/00h = invalid value, 02h/0Dh = power off, 02h/0Fh = no authority).
- Mute states auto-clear on input/video-signal switch (picture/onscreen mute) and additionally on volume change (sound mute).
- Several enums (input-terminal values, aspect values, eco-mode values, base-model-type values, sub-input values) are defined in a source "Appendix / Supplementary Information by Command" that is absent from this refined excerpt — marked UNRESOLVED where referenced.

<!-- UNRESOLVED: model identity — supplied device "EA241F BK" (a monitor) is not corroborated by this projector manual; verify the correct device + source pairing. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: protocol version number not stated in source. -->
<!-- UNRESOLVED: flow-control setting not stated (only "Full duplex" communication mode). -->
<!-- UNRESOLVED: input-terminal / aspect / eco-mode / base-model-type / sub-input enum tables live in an appendix not present in the refined source excerpt. -->
````

Spec ready. 53 distinct command actions enumerated verbatim. Flag top issue: source = projector manual, supplied device = monitor → confirm pairing.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:01:29.316Z
last_checked_at: 2026-06-17T19:46:43.128Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:46:43.128Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim to source hex commands; transport (TCP/serial, port, baud rates) fully supported. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific projector model not named in source; supplied model"
- "no authentication procedure described in source."
- "input-terminal value table lives in an \"Appendix / Supplementary"
- "source states \"Communication mode: Full duplex\" but no flow-control setting (RTS/CTS/XON-XOFF) is named. Serial cable pins 7(RTS)/8(CTS) are cross-connected."
- "input-terminal value enum not present in refined excerpt"
- "aspect value enum not present in refined excerpt"
- "eco-mode value enum not present in refined excerpt"
- "absolute min/max/default ranges for each variable are returned"
- "no event/notification mechanism documented."
- "no multi-step sequences described explicitly in source."
- "source states operational lockouts (no other command accepted"
- "model identity — supplied device \"EA241F BK\" (a monitor) is not corroborated by this projector manual; verify the correct device + source pairing."
- "firmware version compatibility not stated in source."
- "protocol version number not stated in source."
- "flow-control setting not stated (only \"Full duplex\" communication mode)."
- "input-terminal / aspect / eco-mode / base-model-type / sub-input enum tables live in an appendix not present in the refined source excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
