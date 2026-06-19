---
spec_id: admin/sharp-nec-led-fe019i2-110
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FE019I2 110 Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FE019I2 110"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FE019I2 110"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:36:38.377Z
last_checked_at: 2026-06-18T08:07:18.121Z
generated_at: 2026-06-18T08:07:18.121Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model firmware version, ID1/ID2 default values, baud rate default selection (5 options given), exact model code (ID2) value"
  - "source lists 115200/38400/19200/9600/4800 bps, default not specified"
  - "flow control not stated (RTS/CTS pins present on connector)"
  - "source does not define standalone settable variables distinct from the"
  - "source describes no unsolicited notifications. All responses are"
  - "source describes no explicit multi-step command sequences. Remove if not applicable."
  - "no power-on sequencing voltage/current specs, no interlock procedures"
  - "exact value for FE019I2 110 not in source)."
  - "default baud rate (5 options, no default marked)."
  - "ID1 (control ID) default value."
  - "ID2 (model code) value for LED FE019I2 110."
  - "serial flow control (RTS/CTS pins wired but mode not stated)."
  - "input terminal value table, aspect value table, eco mode value table, base model type table, sub input value table (referenced appendix not in source)."
  - "firmware version compatibility."
  - "power/voltage/current specifications (not in this serial control document)."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:07:18.121Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FE019I2 110 Control Spec

## Summary
Sharp/NEC LED FE019I2 110 projector. Binary control protocol over RS-232C serial and TCP/IP LAN (port 7142). Spec covers power, input switch, mute, picture/volume/aspect adjust, shutter, lens control + memory, status/information queries, eco mode, PIP/PbP, edge blending, audio select. Commands are hex byte sequences with ID1 (control ID), ID2 (model code), and CKS (checksum) parameters.

<!-- UNRESOLVED: model firmware version, ID1/ID2 default values, baud rate default selection (5 options given), exact model code (ID2) value -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # UNRESOLVED: source lists 115200/38400/19200/9600/4800 bps, default not specified
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated (RTS/CTS pins present on connector)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred: 015 POWER ON / 016 POWER OFF commands present
  - queryable       # inferred: numerous status/information request commands present
  - routable        # inferred: 018 INPUT SW CHANGE / 319-10 AUDIO SELECT SET present
  - levelable       # inferred: 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST present
```

## Actions
```yaml
actions:
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns DATA01-DATA12 error bitfields. Response: 20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>"

  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "No other command accepted during power-on. Response ACK: 22h 00h <ID1> <ID2> 00h <CKS>. Error: A2h 00h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "No other command accepted during power-off incl. cooling time. Response ACK: 22h 01h <ID1> <ID2> 00h <CKS>"

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal value (e.g. 06h = video port). See appendix Supplementary Information by Command."
    notes: "Example (video port): 02h 03h 00h 00h 02h 01h 06h 0Eh. Response FFh on DATA01 = no signal switch."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared by input/video signal switch. Response ACK: 22h 10h <ID1> <ID2> 00h <CKS>"

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
    notes: "Cleared by input/video signal switch or volume adjustment."

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
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02>-<DATA04> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA03
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: byte
        description: "Adjustment value (high-order 8 bits)"
    notes: "Brightness=10 example: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Brightness=-10: 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch"

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01>-<DATA03> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA02
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA03
        type: byte
        description: "Adjustment value (high-order 8 bits)"
    notes: "Volume=10 example: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Aspect value. See appendix Supplementary Information by Command."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01>-<DATA05> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target; DATA01=96h with DATA02=FFh = LAMP/LIGHT ADJUST"
      - name: DATA02
        type: byte
        description: "Target qualifier (FFh for LAMP/LIGHT ADJUST)"
      - name: DATA03
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: DATA04
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA05
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Response: 23h 8Ah <ID1> <ID2> 62h <DATA01>-<DATA98> <CKS>. DATA01-49=Projector name (NUL-terminated). DATA83-86=Lamp usage time (sec). DATA87-90=Filter usage time (sec). Updates at 1-min intervals."

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Response DATA01-04=Filter usage time (sec), DATA05-08=Filter alarm start time (sec). -1 if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: byte
        description: "01h=Lamp usage time (sec), 04h=Lamp remaining life (%)"
    notes: "Eco mode reflected in values. Example (lamp1 usage): 03h 96h 00h 00h 02h 00h 01h 9Ch. Negative remaining life if replacement deadline exceeded."

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    notes: "Response DATA02-05=kg (max 99999), DATA06-09=mg (max 999999)."

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Key code low byte (WORD type). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
      - name: DATA02
        type: byte
        description: "Key code high byte (00h for all listed codes)"
    notes: "AUTO example: 02h 0Fh 00h 00h 02h 05h 00h 18h"

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
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "06h=Periphery Focus"
      - name: DATA02
        type: byte
        description: "00h=Stop, 01h=+1s drive, 02h=+0.5s drive, 03h=+0.25s drive, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s drive, FEh=-0.5s drive, FFh=-1s drive"
    notes: "After 7Fh/81h, send 00h to stop. Lens can be controlled without stop by re-issuing same command while driving."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Lens adjustment target (per lens axis)"
    notes: "Response DATA02-03=upper limit, DATA04-05=lower limit, DATA06-07=current value."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01>-<DATA04> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "FFh=Stop (skips DATA02-04), otherwise lens axis target"
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: DATA03
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: DATA04
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Controls profile number set via 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    notes: "Response DATA02=setting 00h=OFF, 01h=ON."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: DATA02
        type: byte
        description: "00h=OFF, 01h=ON"

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Response DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V). 0=Stop, 1=During operation."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Response DATA01=00h=Profile 1, 01h=Profile 2."

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
    notes: "Brightness example: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Response returns upper/lower/default/current/wide/narrow adjustment ranges."

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Response DATA01-03=Base model type, DATA04=Sound function (00h=NA,01h=Available), DATA05=Profile number."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Response: DATA03=Power status (00h=Standby,01h=Power on), DATA04=Cooling, DATA05=Power On/Off process, DATA06=Operation status."

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Response: DATA01=signal switch process, DATA02=signal list number (actual = returned+1), DATA03-04=selection signal type, DATA05=signal list type, DATA06=test pattern, DATA09=content displayed."

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Response: DATA01=Picture mute, DATA02=Sound mute, DATA03=Onscreen mute, DATA04=Forced onscreen mute, DATA05=Onscreen display. 00h=Off,01h=On."

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Response DATA01-32=Model name (NUL-terminated)."

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Response DATA01: 00h=Normal (cover opened), 01h=Cover closed."

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "01h=Freeze on, 02h=Freeze off"

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    notes: "Response: variable-length label/information string (NUL-terminated)."

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns Light mode or Lamp mode depending on projector. Value meanings in appendix."

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Response DATA01-17=Projector name (NUL-terminated)."

  - id: lan_mac_address_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Response DATA01-06=MAC address."

  - id: pip_pbp_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    notes: "MODE values: 00h=PIP,01h=PICTURE BY PICTURE. START POSITION: 00h=TOP-LEFT,01h=TOP-RIGHT,02h=BOTTOM-LEFT,03h=BOTTOM-RIGHT."

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Response DATA01: 00h=OFF, 01h=ON."

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Eco mode value. See appendix Supplementary Information by Command."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01>-<DATA16> 00h <CKS>"
    params:
      - name: projector_name
        type: string
        description: "Projector name, up to 16 bytes (DATA01-16)"

  - id: pip_pbp_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: DATA02
        type: byte
        description: "Setting value. MODE: 00h=PIP,01h=PbP. START POSITION: 00h=TOP-LEFT,01h=TOP-RIGHT,02h=BOTTOM-LEFT,03h=BOTTOM-RIGHT. Sub input values per appendix."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Response: DATA01-02 & DATA12-13=Base model type, DATA03-11=Model name (NUL-terminated)."

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Response DATA01-16=Serial number (NUL-terminated)."

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Response: DATA01=Operation status, DATA02=Content displayed, DATA03-05=Selection signal type, DATA06=Video mute, DATA07=Sound mute, DATA08=Onscreen mute, DATA09=Freeze status."

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal value. See appendix Supplementary Information by Command."
      - name: DATA02
        type: byte
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: command_ack
    type: raw
    description: "Success response (no data). Format: 2Xh <cmd> <ID1> <ID2> 00h <CKS> where leading byte 20h/21h/22h/23h echoes command group."

  - id: command_error
    type: raw
    description: "Error response. Format: AXh <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>. ERR1/ERR2 per error code list."

  - id: error_code_pair
    type: enum
    description: "ERR1/ERR2 combinations from error code list"
    values:
      - "00h 00h: command not recognized"
      - "00h 01h: command not supported by model"
      - "01h 00h: specified value invalid"
      - "01h 01h: specified input terminal invalid"
      - "01h 02h: specified language invalid"
      - "02h 00h: memory allocation error"
      - "02h 02h: memory in use"
      - "02h 03h: specified value cannot be set"
      - "02h 04h: forced onscreen mute on"
      - "02h 06h: viewer error"
      - "02h 07h: no signal"
      - "02h 08h: test pattern or filter displayed"
      - "02h 09h: no PC card inserted"
      - "02h 0Ah: memory operation error"
      - "02h 0Ch: entry list displayed"
      - "02h 0Dh: command cannot be accepted (power off)"
      - "02h 0Eh: command execution failed"
      - "02h 0Fh: no authority for operation"
      - "03h 00h: specified gain number incorrect"
      - "03h 01h: specified gain invalid"
      - "03h 02h: adjustment failed"
```

## Variables
```yaml
# UNRESOLVED: source does not define standalone settable variables distinct from the
# parameterized actions above (picture/volume/aspect/gain are action-driven).
# Remove if not applicable.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications. All responses are
# command-initiated. Populate if device emits async events (not documented here).
```

## Macros
```yaml
# UNRESOLVED: source describes no explicit multi-step command sequences. Remove if not applicable.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "During POWER ON execution, no other command accepted (source §3.2)."
  - "During POWER OFF execution incl. cooling time, no other command accepted (source §3.3)."
# UNRESOLVED: no power-on sequencing voltage/current specs, no interlock procedures
# beyond the command-acceptance windows above. Error bitfield (009 command) reports
# cover error, temperature error, fan error, interlock switch open, foreign matter
# sensor - but no mitigation procedures documented.
```

## Notes
- Commands are binary hex byte frames, not ASCII. Each frame: `<lead> <cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>`. Lead byte 02h/03h/00h/01h = command group; response lead 2Xh = success, AXh = error.
- `ID1` = control ID set on projector (must be substituted). `ID2` = model code, varies by model (UNRESOLVED: exact value for FE019I2 110 not in source).
- `CKS` checksum = low-order byte of sum of all preceding bytes. Example: `20h+81h+01h+60h+01h+00h = 103h → CKS=03h`.
- Response lead bytes by group: 20h/21h/22h/23h = success (mirrors cmd group), A0h/A1h/A2h/A3h = error.
- Picture/Sound/Onscreen mute auto-clear on input/video signal switch; sound mute also clears on volume change.
- Lamp/filter usage times returned in seconds, updated at 1-minute intervals.
- Lens control: continuous-drive (7Fh/81h) requires explicit stop (00h).
- Input terminal values, aspect values, eco mode values, base model types, sub input values reference an "Appendix: Supplementary Information by Command" not included in this source extract — those enum tables are UNRESOLVED.

<!-- UNRESOLVED: default baud rate (5 options, no default marked). -->
<!-- UNRESOLVED: ID1 (control ID) default value. -->
<!-- UNRESOLVED: ID2 (model code) value for LED FE019I2 110. -->
<!-- UNRESOLVED: serial flow control (RTS/CTS pins wired but mode not stated). -->
<!-- UNRESOLVED: input terminal value table, aspect value table, eco mode value table, base model type table, sub input value table (referenced appendix not in source). -->
<!-- UNRESOLVED: firmware version compatibility. -->
<!-- UNRESOLVED: power/voltage/current specifications (not in this serial control document). -->
````

Spec ready. 53 actions, all hex payloads verbatim. Gaps marked `<!-- UNRESOLVED -->`. RS-232C + TCP both populated (port 7142). Baud left null — source gives 5 options, no default. ID1/ID2/model-code/appendix-enum-tables unresolved (not in this extract).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T12:36:38.377Z
last_checked_at: 2026-06-18T08:07:18.121Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:07:18.121Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model firmware version, ID1/ID2 default values, baud rate default selection (5 options given), exact model code (ID2) value"
- "source lists 115200/38400/19200/9600/4800 bps, default not specified"
- "flow control not stated (RTS/CTS pins present on connector)"
- "source does not define standalone settable variables distinct from the"
- "source describes no unsolicited notifications. All responses are"
- "source describes no explicit multi-step command sequences. Remove if not applicable."
- "no power-on sequencing voltage/current specs, no interlock procedures"
- "exact value for FE019I2 110 not in source)."
- "default baud rate (5 options, no default marked)."
- "ID1 (control ID) default value."
- "ID2 (model code) value for LED FE019I2 110."
- "serial flow control (RTS/CTS pins wired but mode not stated)."
- "input terminal value table, aspect value table, eco mode value table, base model type table, sub input value table (referenced appendix not in source)."
- "firmware version compatibility."
- "power/voltage/current specifications (not in this serial control document)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
