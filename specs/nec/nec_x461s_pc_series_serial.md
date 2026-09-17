---
spec_id: admin/nec-x461s-pc-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC X461S-PC Series Control Spec"
manufacturer: NEC
model_family: "X461S-PC Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "X461S-PC Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-09-02T20:32:45.845Z
last_checked_at: 2026-09-15T22:18:08.331Z
generated_at: 2026-09-15T22:18:08.331Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "ID1 (control ID) and ID2 (model code) byte values are device-configured and not stated in source. Input terminal, aspect, eco mode, and sub-input value tables vary by model; appendix values are listed where given."
  - "flow control not stated in source (RTS/CTS pins wired per pin table)"
  - "range not stated; query device via 060-1"
  - "firmware version compatibility not stated in source."
  - "default baud rate not stated (five rates listed as supported)."
  - "ID1 control ID and ID2 model code values not stated; device-configured."
  - "base model type values, sub input setting values, and per-model input terminal hex codes only partially specified in appendix."
verification:
  verdict: verified
  checked_at: 2026-09-15T22:18:08.331Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions and feedback queries match source hex/hex+DATA patterns; command list in source is fully covered. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# NEC X461S-PC Series Control Spec

## Summary
NEC X461S-PC Series projector controlled via the NEC PC CONTROL (RS-232C, D-SUB 9P) serial port or wired LAN (TCP port 7142), using the binary frame protocol defined in NEC's Projector Control Command Reference Manual (BDT140013 Rev 7.1). This spec covers power, input switching, mute, picture/volume/aspect adjustment, lens and lens-memory control, and the full status/query command set.

<!-- UNRESOLVED: ID1 (control ID) and ID2 (model code) byte values are device-configured and not stated in source. Input terminal, aspect, eco mode, and sub-input value tables vary by model; appendix values are listed where given. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: "115200/38400/19200/9600/4800"  # source lists all five supported rates
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (RTS/CTS pins wired per pin table)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 015 POWER ON / 016 POWER OFF commands present
  - routable     # inferred: 018 INPUT SW CHANGE command present
  - queryable    # inferred: extensive request command set (009, 037, 078, 097, 305, ...)
  - levelable    # inferred: 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST commands present
```

## Actions
```yaml
- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: input_terminal
      type: string
      description: "DATA01 input terminal code: 01h=COMPUTER, 02h=COMPUTER2, 03h/1Ah=COMPUTER3, 06h=VIDEO, 02h=BNC(CV) on some models, 0Bh=S-VIDEO, 10h=Component, A1h/1Ah=HDMI, A2h/1Bh=HDMI2, A6h=DisplayPort, A7h=DisplayPort2, ABh/1Ch=SLOT, 2Eh=STEREO DVI, 9Ch=DVI-D, 1Fh=VIEWER, 22h=USB-B, 22h/23h=USB DISPLAY, 20h=NETWORK/LAN/ETHERNET, BFh=HDBaseT, C4h=SDI, C5h=SDI2, C6h=SDI3, C7h=SDI4, 23h=APPS. Example (VIDEO): 02h 03h 00h 00h 02h 01h 06h 0Eh"

- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

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
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: target
      type: string
      description: "DATA01 adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: string
      description: "DATA02 adjustment mode: 00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: "DATA03/DATA04 adjustment value, 16-bit little-endian, signed (example +10: 0Ah 00h; -10: F6h FFh)"

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: mode
      type: string
      description: "DATA01 adjustment mode: 00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: "DATA02/DATA03 adjustment value, 16-bit little-endian (example volume 10: 0Ah 00h)"

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: aspect
      type: string
      description: "DATA01 aspect value: 00h=AUTO, 01h=WIDE ZOOM, 02h=16:9, 03h=NATIVE, 04h=4:3, 05h=15:9, 06h=16:10, 07h=LETTER BOX, 07h/08h=ZOOM, 02h/03h=WIDE SCREEN, 09h/10h=FULL"

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: target
      type: string
      description: "DATA01/DATA02 adjustment target: 96h FFh=LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: string
      description: "DATA03 adjustment mode: 00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: "DATA04/DATA05 adjustment value, 16-bit little-endian"

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: lamp
      type: string
      description: "DATA01 lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: content
      type: string
      description: "DATA02 content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%). Example: 03h 96h 00h 00h 02h 00h 01h 9Ch"

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: type
      type: string
      description: "DATA01: 00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: key_code
      type: string
      description: "DATA01/DATA02 key code (WORD): 02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU, 07h 00h=UP, 08h 00h=DOWN, 09h 00h=RIGHT, 0Ah 00h=LEFT, 0Bh 00h=ENTER, 0Ch 00h=EXIT, 0Dh 00h=HELP, 0Fh 00h=MAGNIFY UP, 10h 00h=MAGNIFY DOWN, 13h 00h=MUTE, 29h 00h=PICTURE, 4Bh 00h=COMPUTER1, 4Ch 00h=COMPUTER2, 4Fh 00h=VIDEO1, 51h 00h=S-VIDEO1, 84h 00h=VOLUME UP, 85h 00h=VOLUME DOWN, 8Ah 00h=FREEZE, A3h 00h=ASPECT, D7h 00h=SOURCE, EEh 00h=LAMP MODE/ECO. Example (AUTO): 02h 0Fh 00h 00h 02h 05h 00h 18h"

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
    - name: target
      type: string
      description: "DATA01: 06h=Periphery Focus"
    - name: motion
      type: string
      description: "DATA02: 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus (continuous, stop with 00h), 81h=drive minus (continuous, stop with 00h), FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: target
      type: string
      description: "DATA01 lens adjustment target (lens position axis)"

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: control
      type: string
      description: "DATA01: FFh=Stop (mode and value not referenced)"
    - name: mode
      type: string
      description: "DATA02 adjustment mode: 00h=absolute value, 02h=relative value"
    - name: value
      type: integer
      description: "DATA03/DATA04 adjustment value, 16-bit little-endian"

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: operation
      type: string
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: operation
      type: string
      description: "DATA01: 00h=MOVE, 01h=STORE, 02h=RESET; controls profile selected by 053-10 LENS PROFILE SET"

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: option
      type: string
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: option
      type: string
      description: "DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: string
      description: "DATA02 setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: profile
      type: string
      description: "DATA01 profile number: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: target
      type: string
      description: "DATA01 adjusted value name: 00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST. Example (brightness): 03h 05h 00h 00h 03h 00h 00h 00h 0Bh"

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: state
      type: string
      description: "DATA01: 01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: info_type
      type: string
      description: "DATA01 information type: 03h=horizontal synchronous frequency, 04h=vertical synchronous frequency"

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: item
      type: string
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3. MODE values: 00h=PIP, 01h=PICTURE BY PICTURE. START POSITION values: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input values: see Appendix (model-dependent)"

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: mode
      type: string
      description: "DATA01 eco mode value: 00h=OFF, 00h/01h=Normal/NORMAL, 02h/03h=ECO, 02h=ECO1, 03h=ECO2, 01h=AUTO ECO, 01h=ON, 04h=LONG LIFE, 06h=SILENT, 05h=BOOST"

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
  params:
    - name: name
      type: string
      description: "DATA01-DATA16 projector name, up to 16 bytes, NUL-terminated"

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: item
      type: string
      description: "DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3. MODE values: 00h=PIP, 01h=PICTURE BY PICTURE. START POSITION values: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input values: see Appendix (model-dependent)"

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: value
      type: string
      description: "DATA01 setting value: 00h=OFF, 01h=ON"

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: input_terminal
      type: string
      description: "DATA01 input terminal code (see 018 INPUT SW CHANGE values: 00h=HDMI1, 01h=HDMI2, 02h=DisplayPort, 03h=HDBaseT, 04h=USB-A, 05h=USB-B per audio-select appendix)"
    - name: audio_source
      type: string
      description: "DATA02 setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: command_ack
  type: string
  description: "Success response echoes command type with ID1/ID2: 22h/23h (02h/03h frames), 20h (00h frames), 21h (01h frames). Query responses append DATA bytes and LEN. Example POWER ON ack: 22h 00h <ID1> <ID2> 00h <CKS>"

- id: error_response
  type: string
  description: "Error response: A0h/A1h/A2h/A3h <code> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>. ERR1/ERR2 codes per error code list (e.g. 00h 00h=command not recognized, 02h 0Dh=power off, 02h 0Eh=execution failed)"

- id: power_state
  type: enum
  values:
    - standby_sleep
    - power_on
    - cooling
    - standby_error
    - standby_power_saving
    - network_standby

- id: error_status
  type: bitmask
  description: "DATA01-DATA12 bit flags from 009 ERROR STATUS REQUEST: cover error, fan error, temperature error, power error, lamp off, lamp replacement moratorium, lamp usage time exceeded, formatter error, FPGA error, lamp data error, mirror cover error, ballast communication error, iris calibration error, lens not installed, interlock switch open, system errors. Bit 0 = normal, bit 1 = error"

- id: input_status
  type: string
  description: "078-3 response: signal switch process, signal list number (returned value + 1 = practical number), selection signal type 1/2 (01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 07h=VIEWER(1-5), 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 23h=VIEWER(6-10), FFh=not source input), content displayed"

- id: mute_status
  type: string
  description: "078-4 response: picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display - each 00h=Off, 01h=On"

- id: cover_status
  type: enum
  values:
    - normal_cover_open
    - cover_closed

- id: lamp_usage_time
  type: integer
  description: "Seconds from 037-4 LAMP INFORMATION REQUEST 3 (DATA01=00h, DATA02=01h); updated at one-minute intervals"

- id: lamp_remaining_life
  type: integer
  description: "Percent from 037-4 LAMP INFORMATION REQUEST 3 (DATA01=00h, DATA02=04h); negative if replacement deadline exceeded"

- id: filter_usage_time
  type: integer
  description: "Seconds from 037-3; -1 returned if no time defined"

- id: projector_name
  type: string
  description: "From 037 INFORMATION REQUEST (DATA01-49) and 097-45 LAN PROJECTOR NAME REQUEST (DATA01-17), NUL-terminated"

- id: model_name
  type: string
  description: "From 078-5 MODEL NAME REQUEST, DATA01-32, NUL-terminated"

- id: serial_number
  type: string
  description: "From 305-2 SERIAL NUMBER REQUEST, DATA01-16, NUL-terminated"

- id: mac_address
  type: string
  description: "6 bytes from 097-155 LAN MAC ADDRESS STATUS REQUEST2 (DATA01-06)"

- id: eco_mode
  type: string
  description: "From 097-8 ECO MODE REQUEST; values per eco mode table (OFF, NORMAL, ECO, AUTO ECO, LONG LIFE, SILENT, BOOST)"

- id: edge_blending_mode
  type: enum
  values:
    - "off"
    - "on"

- id: lens_status
  type: bitmask
  description: "053-7 response DATA01: bit0 lens memory, bit1 zoom, bit2 focus, bit3 lens shift H, bit4 lens shift V - 0=stop, 1=during operation"
```

## Variables
```yaml
- id: volume
  type: integer
  description: "Sound volume via 030-2 VOLUME ADJUST; range queryable via 060-1 GAIN PARAMETER REQUEST 3 (DATA01=05h)"
  min: null  # UNRESOLVED: range not stated; query device via 060-1
  max: null  # UNRESOLVED: range not stated; query device via 060-1

- id: picture_brightness
  type: integer
  description: "Via 030-1 PICTURE ADJUST (DATA01=00h); range queryable via 060-1 (DATA01=00h)"
  min: null  # UNRESOLVED: range not stated; query device via 060-1
  max: null  # UNRESOLVED: range not stated; query device via 060-1

- id: picture_contrast
  type: integer
  description: "Via 030-1 PICTURE ADJUST (DATA01=01h); range queryable via 060-1 (DATA01=01h)"
  min: null  # UNRESOLVED: range not stated; query device via 060-1
  max: null  # UNRESOLVED: range not stated; query device via 060-1

- id: picture_color
  type: integer
  description: "Via 030-1 PICTURE ADJUST (DATA01=02h); range queryable via 060-1 (DATA01=02h)"
  min: null  # UNRESOLVED: range not stated; query device via 060-1
  max: null  # UNRESOLVED: range not stated; query device via 060-1

- id: picture_hue
  type: integer
  description: "Via 030-1 PICTURE ADJUST (DATA01=03h); range queryable via 060-1 (DATA01=03h)"
  min: null  # UNRESOLVED: range not stated; query device via 060-1
  max: null  # UNRESOLVED: range not stated; query device via 060-1

- id: picture_sharpness
  type: integer
  description: "Via 030-1 PICTURE ADJUST (DATA01=04h); range queryable via 060-1 (DATA01=04h)"
  min: null  # UNRESOLVED: range not stated; query device via 060-1
  max: null  # UNRESOLVED: range not stated; query device via 060-1

- id: lamp_light_adjust
  type: integer
  description: "Via 030-15 OTHER ADJUST (96h FFh); range queryable via 060-1 (DATA01=96h)"
  min: null  # UNRESOLVED: range not stated; query device via 060-1
  max: null  # UNRESOLVED: range not stated; query device via 060-1
```

## Events
```yaml
# No unsolicited notifications documented in source. All responses are solicited command replies.
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "While 015 POWER ON is executing, no other command is accepted."
  - "While 016 POWER OFF is executing (including cooling time), no other command is accepted."
  - "015 POWER ON via serial or LAN requires the projector to be in a supported standby mode (serial: Normal, Active, Eco, NORMAL, NETWORK STANDBY, SLEEP, OFF, ON, STANDBY POWER ON; wired LAN: Normal, NORMAL, NETWORK STANDBY, SLEEP, HTBaseT STANDBY, OFF, ON, STANDBY POWER ON; supported modes vary by model)."
```

## Notes
- Command frame format: `<type> <code> 00h 00h <LEN> <DATA...> <CKS>`. Command type bytes: 00h/01h/02h/03h; response types 20h/21h/22h/23h mirror them; error responses use A0h/A1h/A2h/A3h with ERR1/ERR2 payload.
- ID1 = control ID set on the projector; ID2 = model code (varies by model) — both appear in response frames, not command frames.
- Checksum: sum all preceding bytes, use low-order byte (e.g. 20h+81h+01h+60h+01h+00h=103h → CKS=03h).
- Serial settings: RS-232C, 115200/38400/19200/9600/4800 bps, 8 data bits, no parity, 1 stop bit, full duplex. PC CONTROL port is D-SUB 9P (RxD pin 2, TxD pin 3, GND pin 5, RTS pin 7, CTS pin 8).
- LAN: wired RJ-45, 10/100 Mbps auto-switching, TCP port 7142 for send/receive.
- Picture mute / onscreen mute auto-clear on input terminal switch or video signal switch; sound mute also auto-clears on volume adjustment.
- Usage-time values (lamp, filter) update at one-minute intervals though reported in one-second units.
- Lamp remaining life (%) returns negative after replacement deadline exceeded.
- 053 LENS CONTROL continuous drive (7Fh/81h) stopped by sending 00h; lens can be driven without stop by repeating the same command.
- Full ERR1/ERR2 error code table in source section 2.4 (00h-03h ranges: unrecognized command, unsupported, invalid value, invalid input, memory errors, forced onscreen mute, no signal, power off, execution failed, no authority, gain errors).

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: default baud rate not stated (five rates listed as supported). -->
<!-- UNRESOLVED: ID1 control ID and ID2 model code values not stated; device-configured. -->
<!-- UNRESOLVED: base model type values, sub input setting values, and per-model input terminal hex codes only partially specified in appendix. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-09-02T20:32:45.845Z
last_checked_at: 2026-09-15T22:18:08.331Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-15T22:18:08.331Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions and feedback queries match source hex/hex+DATA patterns; command list in source is fully covered. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "ID1 (control ID) and ID2 (model code) byte values are device-configured and not stated in source. Input terminal, aspect, eco mode, and sub-input value tables vary by model; appendix values are listed where given."
- "flow control not stated in source (RTS/CTS pins wired per pin table)"
- "range not stated; query device via 060-1"
- "firmware version compatibility not stated in source."
- "default baud rate not stated (five rates listed as supported)."
- "ID1 control ID and ID2 model code values not stated; device-configured."
- "base model type values, sub input setting values, and per-model input terminal hex codes only partially specified in appendix."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
