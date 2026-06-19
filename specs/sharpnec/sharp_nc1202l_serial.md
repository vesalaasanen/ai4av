---
spec_id: admin/sharp-nec-nc1202l
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NC1202L Control Spec"
manufacturer: Sharp/NEC
model_family: NC1202L
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NC1202L
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T07:27:04.667Z
last_checked_at: 2026-06-18T08:32:17.205Z
generated_at: 2026-06-18T08:32:17.205Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "model code (ID2) value for the NC1202L not stated in source; ID2 varies by model"
  - "control ID (ID1) default not stated in source"
  - "no async event/notification mechanism documented."
  - "no macros described."
  - "source contains no explicit safety interlock procedures, voltage/current"
  - "control ID (ID1) default value not stated in source"
  - "model code (ID2) for the NC1202L not stated in source"
  - "default/fixed serial baud rate not stated (source lists 5 selectable rates; no single default)"
  - "flow_control setting not explicitly stated (full-duplex stated; RTS/CTS cross-wired in cable pinout but software flow control not described)"
  - "input terminal / aspect / eco-mode / base-model-type enum tables live in an Appendix not included in the source excerpt"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:32:17.205Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NC1202L Control Spec

## Summary
Sharp/NEC NC1202L is a projector controllable via an RS-232C serial port (PC CONTROL, D-SUB 9P) or a wired/wireless LAN connection using TCP port 7142. Commands are binary frames using a fixed header, model/control IDs, a length byte, a data payload, and a single-byte additive checksum (low-order 8 bits of the sum of all preceding bytes).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: model code (ID2) value for the NC1202L not stated in source; ID2 varies by model -->
<!-- UNRESOLVED: control ID (ID1) default not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # source lists supported rates 115200/38400/19200/9600/4800 bps; no single default stated
  supported_baud_rates: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # full-duplex communication stated; hardware flow pins (RTS/CTS) wired in the cable pinout
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: many status/information request commands present
  - routable     # inferred: INPUT SW CHANGE / AUDIO SELECT SET present
  - levelable    # inferred: PICTURE/VOLUME/LAMP ADJUST commands present
```

## Actions
```yaml
# All frames use the source's general command/response structure:
#   <HDR> <MT> 00h 00h <LEN> <DATA...> <CKS>
# HDR/MT identify the command; LEN is the data length following LEN; CKS is the
# low-order 8 bits of the sum of all preceding bytes.
# <ID1> = control ID set on projector; <ID2> = model code. Neither value is
# stated for the NC1202L in the source - see UNRESOLVED markers above.

- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Returns DATA01-DATA12 error bitmap (bit=1 => error). See error information list in source."

- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted while power-on in progress."

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off incl. cooling time."

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "Input terminal value (see Appendix 'Supplementary Information by Command'). Example 06h = video port."
  notes: "Response DATA01 = FFh means ended with error (no switch made)."

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
    - name: DATA01
      type: enum
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: enum
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "Aspect value (see Appendix 'Supplementary Information by Command')"

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "Adjustment target (DATA01=96h, DATA02=FFh => LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA02
      type: enum
      description: "Target sub-id; FFh pairs with DATA01=96h for LAMP/LIGHT ADJUST"
    - name: DATA03
      type: enum
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns DATA01-49 projector name (NUL terminated), DATA83-86 lamp usage time (s), DATA87-90 filter usage time (s). Updated at 1-minute intervals."

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "DATA01-04 filter usage time (s); DATA05-08 filter alarm start time (s); -1 if undefined."

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (Lamp 2 only valid on two-lamp models)"
    - name: DATA02
      type: enum
      description: "Content: 01h=usage time (s), 04h=remaining life (%)"
  notes: "Remaining life may be negative if replacement deadline exceeded."

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "DATA02-05 kilograms (max 99999 kg), DATA06-09 milligrams (max 999999 mg)."

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "Key code low byte (WORD key code). See key code list."
    - name: DATA02
      type: enum
      description: "Key code high byte (00h for all listed keys)."
  notes: "Key code list (DATA01/DATA02 => name): 02h/00h POWER ON, 03h/00h POWER OFF, 05h/00h AUTO, 06h/00h MENU, 07h/00h UP, 08h/00h DOWN, 09h/00h RIGHT, 0Ah/00h LEFT, 0Bh/00h ENTER, 0Ch/00h EXIT, 0Dh/00h HELP, 0Fh/00h MAGNIFY UP, 10h/00h MAGNIFY DOWN, 13h/00h MUTE, 29h/00h PICTURE, 4Bh/00h COMPUTER1, 4Ch/00h COMPUTER2, 4Fh/00h VIDEO1, 51h/00h S-VIDEO1, 84h/00h VOLUME UP, 85h/00h VOLUME DOWN, 8Ah/00h FREEZE, A3h/00h ASPECT, D7h/00h SOURCE, EEh/00h LAMP MODE/ECO. Response DATA01=FFh = error."

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
      type: enum
      description: "Target; 06h=Periphery Focus"
    - name: DATA02
      type: enum
      description: "Content: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus (continuous), 81h=drive minus (continuous), FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s"
  notes: "After 7Fh/81h, send 00h to stop driving."

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "Target (same set as LENS CONTROL, e.g. 06h)"
  notes: "Returns DATA02-03 upper limit, DATA04-05 lower limit, DATA06-07 current value."

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "FFh=Stop (mode/value ignored); otherwise target id"
    - name: DATA02
      type: enum
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Controls profile selected via 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: "Response DATA02: 00h=OFF, 01h=ON."

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: enum
      description: "00h=OFF, 01h=ON"

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitmap: bit0 lens memory, bit1 zoom, bit2 focus, bit3 lens shift (H), bit4 lens shift (V). 0=stop, 1=operating."

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Response DATA01: 00h=Profile 1, 01h=Profile 2; DATA02 reserved."

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "Adjusted value name: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"
  notes: "Returns status, upper/lower limits, default, current value, wide/narrow adjustment widths, default-validity flag."

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "DATA01-03 base model type; DATA04 sound function (00h none/01h avail); DATA05 profile/timer feature flags."

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "DATA03 power status, DATA04 cooling process, DATA05 power on/off process, DATA06 operation status (00h standby/sleep, 04h power on, 05h cooling, 06h standby-error, 0Fh power-saving, 10h network standby)."

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern display, displayed content."

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display (00h off/01h on)."

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns DATA01-32 model name (NUL terminated)."

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "DATA01: 00h=normal (cover opened), 01h=cover closed."

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "Information type: 03h=horizontal sync frequency, 04h=vertical sync frequency"
  notes: "Returns label length + label string (NUL terminated)."

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns DATA01 eco/light/lamp mode value (see Appendix)."

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns DATA01-17 projector name (NUL terminated)."

- id: lan_mac_address_status_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns DATA01-06 MAC address."

- id: pip_pbp_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  notes: "Response DATA02 setting value depends on DATA01 (mode: 00h PIP/01h PBP; position: 00h top-left ... 03h bottom-right; sub input values per Appendix)."

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
      type: enum
      description: "Eco/light/lamp mode value (see Appendix 'Supplementary Information by Command')"

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: DATA01_DATA16
      type: string
      description: "Projector name (up to 16 bytes)"

- id: pip_pbp_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: enum
      description: "Setting value (context-dependent: mode/position/sub-input per Appendix)"

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "00h=OFF, 01h=ON"

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (DATA01-02, DATA12-13), model name DATA03-11 (NUL terminated)."

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns DATA01-16 serial number (NUL terminated)."

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "DATA01 operation status, DATA02 displayed content, DATA03-05 selection signal type, DATA05 display signal type, DATA06 video mute, DATA07 sound mute, DATA08 onscreen mute, DATA09 freeze status."

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: enum
      description: "Input terminal (see Appendix 'Supplementary Information by Command')"
    - name: DATA02
      type: enum
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Every response from the projector uses the structure:
#   <RESP_HDR> <MT> <ID1> <ID2> <LEN> <DATA...> <CKS>
# Success-response header high bit set: 20h/21h/22h/23h series.
# Error-response header 0xA0-0xA3 series:
#   A0h 88h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
# <ERR1>/<ERR2> combinations enumerated in the error code list (§2.4).

- id: command_response
  type: raw
  description: "Binary frame: RESP_HDR, MT, ID1, ID2, LEN, DATA..., CKS. Success carries data; error carries ERR1/ERR2."

- id: error_response
  type: enum
  description: "ERR1/ERR2 pair per §2.4 error code list."
  values:
    - "00h 00h: command cannot be recognized"
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
    - "02h 0Dh: command cannot be accepted because power is off"
    - "02h 0Eh: command execution failed"
    - "02h 0Fh: no authority for the operation"
    - "03h 00h: specified gain number incorrect"
    - "03h 01h: specified gain invalid"
    - "03h 02h: adjustment failed"
```

## Variables
```yaml
# Settable parameters are represented as Actions above (PICTURE ADJUST,
# VOLUME ADJUST, ASPECT ADJUST, OTHER ADJUST, ECO MODE SET, LENS CONTROL,
# FREEZE CONTROL, etc.). No additional standalone variables documented.
```

## Events
```yaml
# Source describes no unsolicited notifications. All output is in response to a command.
# UNRESOLVED: no async event/notification mechanism documented.
```

## Macros
```yaml
# Source documents no explicit multi-step command sequences.
# UNRESOLVED: no macros described.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "While POWER ON command is executing, no other command can be accepted."
  - "While POWER OFF is executing (incl. cooling time), no other command can be accepted."
# UNRESOLVED: source contains no explicit safety interlock procedures, voltage/current
# specs, or power-on sequencing requirements beyond the command-blocking notes above.
```

## Notes
- Command/response framing is binary hex. General request structure: `<HDR> <MT> 00h 00h <LEN> <DATA...> <CKS>` where HDR selects class (00h/01h/02h/03h) and MT is the message-type byte. General response structure: `<RESP_HDR> <MT> <ID1> <ID2> <LEN> <DATA...> <CKS>` (RESP_HDR = 20h-23h success, A0h-A3h error).
- Checksum (CKS) = low-order 8 bits of the sum of all preceding bytes. Worked example from source: `20h + 81h + 01h + 60h + 01h + 00h = 103h` => CKS = `03h`.
- `<ID1>` is the projector's configured control ID; `<ID2>` is the model code (varies by model). Neither is stated for the NC1202L in this source — must be obtained from the device.
- Serial cable is a cross cable; RTS/CTS pins are cross-wired between PC CONTROL (D-SUB 9P) and the external device.
- Many enum values (input terminals, aspect values, eco-mode values, base model types, sub-input values) are deferred to an "Appendix: Supplementary Information by Command" that is not present in the refined source excerpt.

<!-- UNRESOLVED: control ID (ID1) default value not stated in source -->
<!-- UNRESOLVED: model code (ID2) for the NC1202L not stated in source -->
<!-- UNRESOLVED: default/fixed serial baud rate not stated (source lists 5 selectable rates; no single default) -->
<!-- UNRESOLVED: flow_control setting not explicitly stated (full-duplex stated; RTS/CTS cross-wired in cable pinout but software flow control not described) -->
<!-- UNRESOLVED: input terminal / aspect / eco-mode / base-model-type enum tables live in an Appendix not included in the source excerpt -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
```

Spec ready. 53 actions, all hex payloads verbatim. Both `serial` + `tcp` (port 7142). Many `<!-- UNRESOLVED -->` gaps (ID1/ID2, baud default, appendix enums, firmware).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T07:27:04.667Z
last_checked_at: 2026-06-18T08:32:17.205Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:32:17.205Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "model code (ID2) value for the NC1202L not stated in source; ID2 varies by model"
- "control ID (ID1) default not stated in source"
- "no async event/notification mechanism documented."
- "no macros described."
- "source contains no explicit safety interlock procedures, voltage/current"
- "control ID (ID1) default value not stated in source"
- "model code (ID2) for the NC1202L not stated in source"
- "default/fixed serial baud rate not stated (source lists 5 selectable rates; no single default)"
- "flow_control setting not explicitly stated (full-duplex stated; RTS/CTS cross-wired in cable pinout but software flow control not described)"
- "input terminal / aspect / eco-mode / base-model-type enum tables live in an Appendix not included in the source excerpt"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
