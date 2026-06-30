---
spec_id: admin/sharp-nec-c651q-avt3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC C651Q Avt3 Control Spec"
manufacturer: Sharp/NEC
model_family: "C651Q Avt3"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "C651Q Avt3"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:31:18.145Z
last_checked_at: 2026-06-17T19:34:38.759Z
generated_at: 2026-06-17T19:34:38.759Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The source is a generic projector command manual; it does not explicitly enumerate the C651Q Avt3 model name. Model mapping assumed from the request. Firmware version compatibility not stated in source. Wireless LAN unit details not in source."
  - "detailed bit-field decoding for error_status and full enum tables for eco_mode, input terminal, aspect, and sub-input values reference a source Appendix (\"Supplementary Information by Command\") that is not present in the provided refined source text."
  - "enum values referenced in source Appendix, not present in refined text"
  - "no explicit safety warnings or interlock procedures stated in the provided refined source."
  - "(1) Source Appendix \"Supplementary Information by Command\" referenced for input terminal values, aspect values, eco mode values, sub-input values, and base model types is NOT present in the provided refined text — those enum tables cannot be populated. (2) Source is a generic projector manual; C651Q Avt3 model not explicitly named. (3) Firmware version compatibility not stated. (4) Wireless LAN unit specifications not in source. (5) Whether RTS/CTS hardware flow control is required is not stated (pins wired but mode listed as full duplex only)."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:34:38.759Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match source command frames verbatim; transport parameters fully supported; coverage ratio 1.0. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC C651Q Avt3 Control Spec

## Summary
Sharp/NEC C651Q Avt3 projector, controlled via RS-232C serial (D-SUB 9P, cross cable) or wired/wireless LAN (TCP port 7142). This spec covers the binary command protocol documented in "Projector Control Command Reference Manual" (BDT140013 Rev 7.1): power, input switching, picture/sound/onscreen mutes, picture/volume/aspect/gain adjustments, lens and lens-memory control, shutter, freeze, eco mode, edge blending, PIP/Picture-by-Picture, audio select, and a full set of status and information queries. Commands and responses are hexadecimal byte frames with a trailing checksum byte.

<!-- UNRESOLVED: The source is a generic projector command manual; it does not explicitly enumerate the C651Q Avt3 model name. Model mapping assumed from the request. Firmware version compatibility not stated in source. Wireless LAN unit details not in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists all five as supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # full duplex per source; RTS/CTS pins are wired (pin 7/8) but hardware flow control is not stated as enabled
addressing:
  port: 7142  # TCP command port per source ("Use TCP port number 7142")
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred from POWER ON/OFF commands (015, 016)
  - queryable   # inferred from numerous status/information request commands (009, 037, 078, 097, 305, etc.)
  - routable    # inferred from INPUT SW CHANGE command (018)
  - levelable   # inferred from VOLUME ADJUST, PICTURE ADJUST, OTHER ADJUST gain commands (030-1/030-2/030-15)
```

## Actions
```yaml
# Common parameters for ALL commands (not repeated per action):
#   ID1  = control ID set on the projector (1 byte)
#   ID2  = model code, varies by model (1 byte)
#   CKS  = checksum: low-order one byte of the sum of all preceding bytes
#
# Response framing:
#   Success (no data):  2Xh <cmd> <ID1> <ID2> <LEN> <CKS>
#   Success (with data): 2Xh <cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>
#   Failure:            AXh <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# (X is the command-class nibble; see source "2.3 Responses".)

actions:
  - id: error_status_request
    label: 009. ERROR STATUS REQUEST
    kind: query
    command: "00h  88h  00h  00h  00h  88h"
    params: []
    notes: "Response: 20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>. DATA01-12 carry bit-packed error flags (cover, fan, temperature, lamp, mirror cover, lens, interlock switch, etc.). See source error information list."

  - id: power_on
    label: 015. POWER ON
    kind: action
    command: "02h  00h  00h  00h  00h  02h"
    params: []
    notes: "While turning on, no other command is accepted. Success ack: 22h 00h <ID1> <ID2> 00h <CKS>."

  - id: power_off
    label: 016. POWER OFF
    kind: action
    command: "02h  01h  00h  00h  00h  03h"
    params: []
    notes: "While turning off (including cooling time), no other command is accepted. Success ack: 22h 01h <ID1> <ID2> 00h <CKS>."

  - id: input_sw_change
    label: 018. INPUT SW CHANGE
    kind: action
    command: "02h  03h  00h  00h  02h  01h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal value (hex). Example from source: 06h = video port. Full value table in source Appendix 'Supplementary Information by Command'."
    notes: "Example (switch to video, DATA01=06h): 02h 03h 00h 00h 02h 01h 06h 0Eh. Response DATA01 FFh = ended with error (no switch made)."

  - id: picture_mute_on
    label: 020. PICTURE MUTE ON
    kind: action
    command: "02h  10h  00h  00h  00h  12h"
    params: []
    notes: "Cleared by input/video signal switch."

  - id: picture_mute_off
    label: 021. PICTURE MUTE OFF
    kind: action
    command: "02h  11h  00h  00h  00h  13h"
    params: []

  - id: sound_mute_on
    label: 022. SOUND MUTE ON
    kind: action
    command: "02h  12h  00h  00h  00h  14h"
    params: []
    notes: "Cleared by input/video signal switch or volume adjustment."

  - id: sound_mute_off
    label: 023. SOUND MUTE OFF
    kind: action
    command: "02h  13h  00h  00h  00h  15h"
    params: []

  - id: onscreen_mute_on
    label: 024. ONSCREEN MUTE ON
    kind: action
    command: "02h  14h  00h  00h  00h  16h"
    params: []
    notes: "Cleared by input/video signal switch."

  - id: onscreen_mute_off
    label: 025. ONSCREEN MUTE OFF
    kind: action
    command: "02h  15h  00h  00h  00h  17h"
    params: []

  - id: picture_adjust
    label: 030-1. PICTURE ADJUST
    kind: action
    command: "03h  10h  00h  00h  05h  <DATA01>  FFh  <DATA02>  <DATA03>  <DATA04>  <CKS>"
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
    notes: "Example (brightness=10): 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Example (brightness=-10): ... 00h F6h FFh 0Ch."

  - id: volume_adjust
    label: 030-2. VOLUME ADJUST
    kind: action
    command: "03h  10h  00h  00h  05h  05h  00h  <DATA01>  <DATA02>  <DATA03>  <CKS>"
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
    notes: "Example (volume=10): 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

  - id: aspect_adjust
    label: 030-12. ASPECT ADJUST
    kind: action
    command: "03h  10h  00h  00h  05h  18h  00h  00h  <DATA01>  00h  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Aspect value (hex). Full value table in source Appendix 'Supplementary Information by Command'."

  - id: other_adjust
    label: 030-15. OTHER ADJUST
    kind: action
    command: "03h  10h  00h  00h  05h  <DATA01>  <DATA02>  <DATA03>  <DATA04>  <DATA05>  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Target high byte (source shows 96h for LAMP ADJUST / LIGHT ADJUST)"
      - name: DATA02
        type: integer
        description: "Target low byte (source shows FFh paired with 96h for LAMP/LIGHT ADJUST)"
      - name: DATA03
        type: integer
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA04
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA05
        type: integer
        description: "Adjustment value (high-order 8 bits)"

  - id: remote_key_code
    label: 050. REMOTE KEY CODE
    kind: action
    command: "02h  0Fh  00h  00h  02h  <DATA01>  <DATA02>  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte (WORD-typed key code). Examples from source key code list: POWER ON=02h/00h, POWER OFF=03h/00h, AUTO=05h/00h, MENU=06h/00h, UP=07h/00h, DOWN=08h/00h, RIGHT=09h/00h, LEFT=0Ah/00h, ENTER=0Bh/00h, EXIT=0Ch/00h, HELP=0Dh/00h, MAGNIFY UP=0Fh/00h, MAGNIFY DOWN=10h/00h, MUTE=13h/00h, PICTURE=29h/00h, COMPUTER1=4Bh/00h, COMPUTER2=4Ch/00h, VIDEO1=4Fh/00h, S-VIDEO1=51h/00h, VOLUME UP=84h/00h, VOLUME DOWN=85h/00h, FREEZE=8Ah/00h, ASPECT=A3h/00h, SOURCE=D7h/00h, LAMP MODE/ECO=EEh/00h."
      - name: DATA02
        type: integer
        description: "Key code high byte (00h for all listed keys)."
    notes: "Example (AUTO): 02h 0Fh 00h 00h 02h 05h 00h 18h. Response DATA01 FFh = ended with error."

  - id: shutter_close
    label: 051. SHUTTER CLOSE
    kind: action
    command: "02h  16h  00h  00h  00h  18h"
    params: []

  - id: shutter_open
    label: 052. SHUTTER OPEN
    kind: action
    command: "02h  17h  00h  00h  00h  19h"
    params: []

  - id: lens_control
    label: 053. LENS CONTROL
    kind: action
    command: "02h  18h  00h  00h  02h  <DATA01>  <DATA02>  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Lens target (source example: 06h = Periphery Focus)"
      - name: DATA02
        type: integer
        description: "Motion: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive +, 81h=drive -, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
    notes: "After 7Fh/81h, send 00h to stop. While driving, same command can be issued without a stop."

  - id: lens_control_2
    label: 053-2. LENS CONTROL 2
    kind: action
    command: "02h  1Dh  00h  00h  04h  <DATA01>  <DATA02>  <DATA03>  <DATA04>  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Target (FFh = Stop; other values select lens axis)"
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: DATA03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: integer
        description: "Adjustment value (high-order 8 bits)"
    notes: "If DATA01=FFh (Stop), mode and value are ignored."

  - id: lens_memory_control
    label: 053-3. LENS MEMORY CONTROL
    kind: action
    command: "02h  1Eh  00h  00h  01h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "For reference lens memory see 053-4."

  - id: reference_lens_memory_control
    label: 053-4. REFERENCE LENS MEMORY CONTROL
    kind: action
    command: "02h  1Fh  00h  00h  01h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Controls the profile number selected by 053-10 LENS PROFILE SET."

  - id: lens_memory_option_set
    label: 053-6. LENS MEMORY OPTION SET
    kind: action
    command: "02h  21h  00h  00h  02h  <DATA01>  <DATA02>  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: lens_profile_set
    label: 053-10. LENS PROFILE SET
    kind: action
    command: "02h  27h  00h  00h  01h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  - id: freeze_control
    label: 079. FREEZE CONTROL
    kind: action
    command: "01h  98h  00h  00h  01h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "01h=freeze on, 02h=freeze off"

  - id: eco_mode_set
    label: 098-8. ECO MODE SET
    kind: action
    command: "03h  B1h  00h  00h  02h  07h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Eco mode value (hex). Full value table in source Appendix. Depending on model, sets 'Light mode' or 'Lamp mode'."

  - id: lan_projector_name_set
    label: 098-45. LAN PROJECTOR NAME SET
    kind: action
    command: "03h  B1h  00h  00h  12h  2Ch  <DATA01>-<DATA16>  00h  <CKS>"
    params:
      - name: DATA01_DATA16
        type: string
        description: "Projector name, up to 16 bytes (DATA01-DATA16), NUL-terminated."

  - id: pip_pbp_set
    label: 098-198. PIP/PICTURE BY PICTURE SET
    kind: action
    command: "03h  B1h  00h  00h  03h  C5h  <DATA01>  <DATA02>  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Setting: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: integer
        description: "Value. MODE: 00h=PIP,01h=PbP. START POSITION: 00h=TOP-LEFT,01h=TOP-RIGHT,02h=BOTTOM-LEFT,03h=BOTTOM-RIGHT. SUB INPUT values in source Appendix."

  - id: edge_blending_mode_set
    label: 098-243-1. EDGE BLENDING MODE SET
    kind: action
    command: "03h  B1h  00h  00h  03h  DFh  00h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: audio_select_set
    label: 319-10. AUDIO SELECT SET
    kind: action
    command: "03h  C9h  00h  00h  03h  09h  <DATA01>  <DATA02>  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Input terminal (hex). Full value table in source Appendix."
      - name: DATA02
        type: integer
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"

  # ---- Query commands (kind: query) ----

  - id: information_request
    label: 037. INFORMATION REQUEST
    kind: query
    command: "03h  8Ah  00h  00h  00h  8Dh"
    params: []
    notes: "Response: 23h 8Ah <ID1> <ID2> 62h <DATA01-98> <CKS>. DATA01-49=projector name, DATA83-86=lamp usage time (s), DATA87-90=filter usage time (s). Updated at 1-minute intervals."

  - id: filter_usage_information_request
    label: 037-3. FILTER USAGE INFORMATION REQUEST
    kind: query
    command: "03h  95h  00h  00h  00h  98h"
    params: []
    notes: "Response: 23h 95h <ID1> <ID2> 08h <DATA01-08> <CKS>. DATA01-04=filter usage time (s), DATA05-08=filter alarm start time (s). -1 if undefined."

  - id: lamp_information_request_3
    label: 037-4. LAMP INFORMATION REQUEST 3
    kind: query
    command: "03h  96h  00h  00h  02h  <DATA01>  <DATA02>  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: integer
        description: "Content: 01h=lamp usage time (s), 04h=lamp remaining life (%)"
    notes: "Example (lamp1 usage): 03h 96h 00h 00h 02h 00h 01h 9Ch. Remaining life is negative if replacement deadline exceeded."

  - id: carbon_savings_information_request
    label: 037-6. CARBON SAVINGS INFORMATION REQUEST
    kind: query
    command: "03h  9Ah  00h  00h  01h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    notes: "Response DATA02-05=kg (max 99999), DATA06-09=mg (max 999999)."

  - id: lens_control_request
    label: 053-1. LENS CONTROL REQUEST
    kind: query
    command: "02h  1Ch  00h  00h  02h  <DATA01>  00h  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Lens target (selects which axis limits/current value to read)"
    notes: "Response: 22h 1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02-07> <CKS>. DATA02/03=upper limit, DATA04/05=lower limit, DATA06/07=current value."

  - id: lens_memory_option_request
    label: 053-5. LENS MEMORY OPTION REQUEST
    kind: query
    command: "02h  20h  00h  00h  01h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    notes: "Response DATA02: 00h=OFF, 01h=ON."

  - id: lens_information_request
    label: 053-7. LENS INFORMATION REQUEST
    kind: query
    command: "02h  22h  00h  00h  01h  00h  25h"
    params: []
    notes: "Response DATA01 is bit-packed lens operation status (bit0=lens memory, bit1=zoom, bit2=focus, bit3=lens shift H, bit4=lens shift V; 0=stop,1=operating)."

  - id: lens_profile_request
    label: 053-11. LENS PROFILE REQUEST
    kind: query
    command: "02h  28h  00h  00h  00h  2Ah"
    params: []
    notes: "Response DATA01: 00h=Profile 1, 01h=Profile 2."

  - id: gain_parameter_request_3
    label: 060-1. GAIN PARAMETER REQUEST 3
    kind: query
    command: "03h  05h  00h  00h  03h  <DATA01>  00h  00h  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    notes: "Response returns status, upper/lower limits, default, current value, wide/narrow adjustment widths."

  - id: setting_request
    label: 078-1. SETTING REQUEST
    kind: query
    command: "00h  85h  00h  00h  01h  00h  86h"
    params: []
    notes: "Response DATA01-03=base model type, DATA04=sound function, DATA05=profile/timer function."

  - id: running_status_request
    label: 078-2. RUNNING STATUS REQUEST
    kind: query
    command: "00h  85h  00h  00h  01h  01h  87h"
    params: []
    notes: "Response DATA03=power status (00h=Standby,01h=Power on), DATA04=cooling, DATA05=power on/off process, DATA06=operation status (00h=Standby(Sleep),04h=Power on,05h=Cooling,06h=Standby(error),0Fh=Power saving,10h=Network standby)."

  - id: input_status_request
    label: 078-3. INPUT STATUS REQUEST
    kind: query
    command: "00h  85h  00h  00h  01h  02h  88h"
    params: []
    notes: "Response carries signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern display, and content displayed."

  - id: mute_status_request
    label: 078-4. MUTE STATUS REQUEST
    kind: query
    command: "00h  85h  00h  00h  01h  03h  89h"
    params: []
    notes: "Response DATA01=picture mute, DATA02=sound mute, DATA03=onscreen mute, DATA04=forced onscreen mute, DATA05=onscreen display (00h=Off,01h=On)."

  - id: model_name_request
    label: 078-5. MODEL NAME REQUEST
    kind: query
    command: "00h  85h  00h  00h  01h  04h  8Ah"
    params: []
    notes: "Response DATA01-32=model name (NUL-terminated)."

  - id: cover_status_request
    label: 078-6. COVER STATUS REQUEST
    kind: query
    command: "00h  85h  00h  00h  01h  05h  8Bh"
    params: []
    notes: "Response DATA01: 00h=Normal (cover opened), 01h=Cover closed."

  - id: information_string_request
    label: 084. INFORMATION STRING REQUEST
    kind: query
    command: "00h  D0h  00h  00h  03h  00h  <DATA01>  01h  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    notes: "Response DATA03+ = label/information string (NUL-terminated)."

  - id: eco_mode_request
    label: 097-8. ECO MODE REQUEST
    kind: query
    command: "03h  B0h  00h  00h  01h  07h  BBh"
    params: []
    notes: "Response DATA01 = eco mode value (full table in source Appendix). Returns 'Light mode' or 'Lamp mode' depending on projector."

  - id: lan_projector_name_request
    label: 097-45. LAN PROJECTOR NAME REQUEST
    kind: query
    command: "03h  B0h  00h  00h  01h  2Ch  E0h"
    params: []
    notes: "Response DATA01-17 = projector name (NUL-terminated)."

  - id: lan_mac_address_status_request_2
    label: 097-155. LAN MAC ADDRESS STATUS REQUEST2
    kind: query
    command: "03h  B0h  00h  00h  02h  9Ah  00h  4Fh"
    params: []
    notes: "Response DATA01-06 = MAC address."

  - id: pip_pbp_request
    label: 097-198. PIP/PICTURE BY PICTURE REQUEST
    kind: query
    command: "03h  B0h  00h  00h  02h  C5h  <DATA01>  <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Setting: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    notes: "Response DATA02 = value for the requested setting."

  - id: edge_blending_mode_request
    label: 097-243-1. EDGE BLENDING MODE REQUEST
    kind: query
    command: "03h  B0h  00h  00h  02h  DFh  00h  94h"
    params: []
    notes: "Response DATA01: 00h=OFF, 01h=ON."

  - id: base_model_type_request
    label: 305-1. BASE MODEL TYPE REQUEST
    kind: query
    command: "00h  BFh  00h  00h  01h  00h  C0h"
    params: []
    notes: "Response DATA01-02 and DATA12-13 = base model type; DATA03-11 = model name (NUL-terminated)."

  - id: serial_number_request
    label: 305-2. SERIAL NUMBER REQUEST
    kind: query
    command: "00h  BFh  00h  00h  02h  01h  06h  C8h"
    params: []
    notes: "Response DATA01-16 = serial number (NUL-terminated)."

  - id: basic_information_request
    label: 305-3. BASIC INFORMATION REQUEST
    kind: query
    command: "00h  BFh  00h  00h  01h  02h  C2h"
    params: []
    notes: "Response DATA01=operation status, DATA02=content displayed, DATA03/04=selection signal type, DATA05=display signal type, DATA06=video mute, DATA07=sound mute, DATA08=onscreen mute, DATA09=freeze status."
```

## Feedbacks
```yaml
# Observable query responses (full response frames shown in the Actions notes above).
feedbacks:
  - id: power_status
    source_query: running_status_request  # 078-2, DATA03
    type: enum
    values: [standby, power_on]

  - id: operation_status
    source_query: running_status_request  # 078-2, DATA06
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]

  - id: cooling_process
    source_query: running_status_request  # 078-2, DATA04
    type: enum
    values: [not_executed, during_execution]

  - id: picture_mute_state
    source_query: mute_status_request  # 078-4, DATA01
    type: enum
    values: [off, on]

  - id: sound_mute_state
    source_query: mute_status_request  # 078-4, DATA02
    type: enum
    values: [off, on]

  - id: onscreen_mute_state
    source_query: mute_status_request  # 078-4, DATA03
    type: enum
    values: [off, on]

  - id: cover_status
    source_query: cover_status_request  # 078-6, DATA01
    type: enum
    values: [normal_opened, closed]

  - id: freeze_status
    source_query: basic_information_request  # 305-3, DATA09
    type: enum
    values: [off, on]

  - id: edge_blending_state
    source_query: edge_blending_mode_request  # 097-243-1
    type: enum
    values: [off, on]

  - id: lamp_usage_time
    source_query: lamp_information_request_3  # 037-4, DATA02=01h
    type: integer
    unit: seconds

  - id: lamp_remaining_life
    source_query: lamp_information_request_3  # 037-4, DATA02=04h
    type: integer
    unit: percent
    notes: "Negative value if replacement deadline exceeded."

  - id: filter_usage_time
    source_query: filter_usage_information_request  # 037-3
    type: integer
    unit: seconds

  - id: error_status
    source_query: error_status_request  # 009
    type: bitmask
    notes: "DATA01-12 bit-packed error flags (cover/fan/temperature/lamp/mirror cover/lens/interlock, etc.)."

# UNRESOLVED: detailed bit-field decoding for error_status and full enum tables for eco_mode, input terminal, aspect, and sub-input values reference a source Appendix ("Supplementary Information by Command") that is not present in the provided refined source text.
```

## Variables
```yaml
variables:
  - id: volume
    set_via: volume_adjust  # 030-2
    request_via: gain_parameter_request_3  # 060-1, DATA01=05h
    type: integer

  - id: brightness
    set_via: picture_adjust  # 030-1, DATA01=00h
    request_via: gain_parameter_request_3  # 060-1, DATA01=00h
    type: integer

  - id: contrast
    set_via: picture_adjust  # 030-1, DATA01=01h
    request_via: gain_parameter_request_3  # 060-1, DATA01=01h
    type: integer

  - id: color
    set_via: picture_adjust  # 030-1, DATA01=02h
    request_via: gain_parameter_request_3  # 060-1, DATA01=02h
    type: integer

  - id: hue
    set_via: picture_adjust  # 030-1, DATA01=03h
    request_via: gain_parameter_request_3  # 060-1, DATA01=03h
    type: integer

  - id: sharpness
    set_via: picture_adjust  # 030-1, DATA01=04h
    request_via: gain_parameter_request_3  # 060-1, DATA01=04h
    type: integer

  - id: lamp_light_adjust
    set_via: other_adjust  # 030-15, DATA01=96h
    request_via: gain_parameter_request_3  # 060-1, DATA01=96h
    type: integer

  - id: projector_name
    set_via: lan_projector_name_set  # 098-45
    request_via: lan_projector_name_request  # 097-45
    type: string
    max_length: 16

  - id: eco_mode
    set_via: eco_mode_set  # 098-8
    request_via: eco_mode_request  # 097-8
    type: enum
    # UNRESOLVED: enum values referenced in source Appendix, not present in refined text
```

## Events
```yaml
# No unsolicited notifications documented in the source. All device data is obtained via explicit query commands.
events: []
```

## Macros
```yaml
# No explicit multi-step command sequences documented in the source.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures stated in the provided refined source.
# Source notes (not interlocks): while POWER ON/OFF is in progress (incl. cooling), no other command is accepted.
```

## Notes
- Command framing: every command/response is a hexadecimal byte sequence. The first byte encodes the command class (00h/01h/02h/03h for requests; 20h/21h/22h/23h for success responses; A0h/A1h/A2h/A3h for error responses). `<ID1>` = control ID, `<ID2>` = model code, `<CKS>` = checksum = low-order byte of the sum of all preceding bytes (worked example in source: 20h+81h+01h+60h+01h+00h=103h → CKS=03h).
- Error responses carry `<ERR1> <ERR2>`; source lists ~25 error-code combinations (unrecognized command, unsupported command, invalid value, invalid input terminal, power off, no signal, forced onscreen mute, no authority, gain errors, etc.).
- Serial cable is a cross (null-modem) cable on the PC CONTROL D-SUB 9P port (pin 2 RxD, 3 TxD, 5 GND, 7 RTS, 8 CTS).
- Usage-time counters (lamp/filter) are readable in one-second units but updated at one-minute intervals.

<!-- UNRESOLVED: (1) Source Appendix "Supplementary Information by Command" referenced for input terminal values, aspect values, eco mode values, sub-input values, and base model types is NOT present in the provided refined text — those enum tables cannot be populated. (2) Source is a generic projector manual; C651Q Avt3 model not explicitly named. (3) Firmware version compatibility not stated. (4) Wireless LAN unit specifications not in source. (5) Whether RTS/CTS hardware flow control is required is not stated (pins wired but mode listed as full duplex only). -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:31:18.145Z
last_checked_at: 2026-06-17T19:34:38.759Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:34:38.759Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match source command frames verbatim; transport parameters fully supported; coverage ratio 1.0. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The source is a generic projector command manual; it does not explicitly enumerate the C651Q Avt3 model name. Model mapping assumed from the request. Firmware version compatibility not stated in source. Wireless LAN unit details not in source."
- "detailed bit-field decoding for error_status and full enum tables for eco_mode, input terminal, aspect, and sub-input values reference a source Appendix (\"Supplementary Information by Command\") that is not present in the provided refined source text."
- "enum values referenced in source Appendix, not present in refined text"
- "no explicit safety warnings or interlock procedures stated in the provided refined source."
- "(1) Source Appendix \"Supplementary Information by Command\" referenced for input terminal values, aspect values, eco mode values, sub-input values, and base model types is NOT present in the provided refined text — those enum tables cannot be populated. (2) Source is a generic projector manual; C651Q Avt3 model not explicitly named. (3) Firmware version compatibility not stated. (4) Wireless LAN unit specifications not in source. (5) Whether RTS/CTS hardware flow control is required is not stated (pins wired but mode listed as full duplex only)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
