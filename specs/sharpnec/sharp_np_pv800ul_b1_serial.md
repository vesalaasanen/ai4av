---
spec_id: admin/sharp-nec-np-pv800ul-b1
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP-PV800UL-B1 Control Spec"
manufacturer: Sharp/NEC
model_family: NP-PV800UL-B1
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NP-PV800UL-B1
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:16:43.416Z
last_checked_at: 2026-06-18T08:51:18.882Z
generated_at: 2026-06-18T08:51:18.882Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact firmware versions, model code (ID2) value, and base-model-type codes are not stated in this manual (referenced appendix \"Supplementary Information by Command\" not included in source)."
  - "flow control not stated; pinout shows RTS/CTS cross-wired (hardware handshaking implied)"
  - "full enum value set not in source (appendix reference)"
  - "no unsolicited notification events documented in source."
  - "no multi-step macro sequences documented in source."
  - "source references portrait-cover / interlock-switch error bits"
  - "firmware version compatibility range not stated."
  - "ID2 model code value for NP-PV800UL-B1 not stated."
  - "input-terminal code table, aspect value table, base-model-type codes, eco-mode enum, sub-input codes — all referenced to appendix not included in source."
  - "flow_control setting — RTS/CTS pins cross-wired in pinout but explicit flow-control mode not stated."
  - "response timing / inter-command delay requirements not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:51:18.882Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP-PV800UL-B1 Control Spec

## Summary
The Sharp/NEC NP-PV800UL-B1 is a projector controllable via RS-232C (PC CONTROL D-SUB 9P) and TCP/IP LAN (wired RJ-45 or wireless). This spec covers the binary command protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1): power, input switching, mute, picture/volume/aspect adjustment, lens control and memory, shutter, freeze, status queries, lamp/filter/carbon information, and LAN/PIP/edge-blending settings.

<!-- UNRESOLVED: exact firmware versions, model code (ID2) value, and base-model-type codes are not stated in this manual (referenced appendix "Supplementary Information by Command" not included in source). -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands."
serial:
  baud_rate: 9600  # source states supported set: 115200/38400/19200/9600/4800 bps (configurable)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; pinout shows RTS/CTS cross-wired (hardware handshaking implied)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred from POWER ON (015) / POWER OFF (016) commands
  - queryable     # inferred from many status/information request commands
  - levelable     # inferred from PICTURE ADJUST, VOLUME ADJUST, LENS CONTROL commands
  - routable      # inferred from INPUT SW CHANGE / AUDIO SELECT SET commands
```

## Actions
```yaml
# Binary frame format: <Lead> <Cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>
# Lead byte indicates message class:
#   00h = get request (type A)     01h = set/control (type A)
#   02h = command/action (type B)  03h = get/set request (type C)
# Response leads: 20h/21h/22h/23h (success), A0h/A1h/A2h/A3h (error).
# CKS = low-order byte of sum of all preceding bytes.

actions:
  - id: error_status_request
    label: 009 ERROR STATUS REQUEST
    kind: query
    command: "00 88 00 00 00 88"
    params: []
    notes: "Returns DATA01-12 bitfields: cover/fan/temp/power/lamp/ formatter/iris errors + extended status."

  - id: power_on
    label: 015 POWER ON
    kind: action
    command: "02 00 00 00 00 02"
    params: []
    notes: "No other command accepted while power-on in progress."

  - id: power_off
    label: 016 POWER OFF
    kind: action
    command: "02 01 00 00 00 03"
    params: []
    notes: "No other command accepted during power-off incl. cooling time."

  - id: input_sw_change
    label: 018 INPUT SW CHANGE
    kind: action
    command: "02 03 00 00 02 01 {input} {checksum}"
    params:
      - name: input
        type: integer
        description: "Input terminal code (DATA01). Example: 06h = video port. Full set in appendix not provided."
    notes: "Response FFh = ended with error (no signal switch made)."

  - id: picture_mute_on
    label: 020 PICTURE MUTE ON
    kind: action
    command: "02 10 00 00 00 12"
    params: []

  - id: picture_mute_off
    label: 021 PICTURE MUTE OFF
    kind: action
    command: "02 11 00 00 00 13"
    params: []

  - id: sound_mute_on
    label: 022 SOUND MUTE ON
    kind: action
    command: "02 12 00 00 00 14"
    params: []

  - id: sound_mute_off
    label: 023 SOUND MUTE OFF
    kind: action
    command: "02 13 00 00 00 15"
    params: []

  - id: onscreen_mute_on
    label: 024 ONSCREEN MUTE ON
    kind: action
    command: "02 14 00 00 00 16"
    params: []

  - id: onscreen_mute_off
    label: 025 ONSCREEN MUTE OFF
    kind: action
    command: "02 15 00 00 00 17"
    params: []

  - id: picture_adjust
    label: 030-1 PICTURE ADJUST
    kind: action
    command: "03 10 00 00 05 {target} FF {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: integer
        description: "00h=Brightness 01h=Contrast 02h=Color 03h=Hue 04h=Sharpness"
      - name: mode
        type: integer
        description: "00h=absolute 01h=relative"
      - name: value_lo
        type: integer
        description: "Adjustment value low 8 bits (signed; F6h FFh = -10)"
      - name: value_hi
        type: integer
        description: "Adjustment value high 8 bits"
    notes: "Response DATA01-02 = 0000h success, else error."

  - id: volume_adjust
    label: 030-2 VOLUME ADJUST
    kind: action
    command: "03 10 00 00 05 05 00 {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: mode
        type: integer
        description: "00h=absolute 01h=relative"
      - name: value_lo
        type: integer
        description: "Adjustment value low 8 bits"
      - name: value_hi
        type: integer
        description: "Adjustment value high 8 bits"

  - id: aspect_adjust
    label: 030-12 ASPECT ADJUST
    kind: action
    command: "03 10 00 00 05 18 00 00 {aspect} 00 {checksum}"
    params:
      - name: aspect
        type: integer
        description: "DATA01 aspect value. Full set in appendix not provided."

  - id: other_adjust
    label: 030-15 OTHER ADJUST
    kind: action
    command: "03 10 00 00 05 {target_lo} {target_hi} {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target_lo
        type: integer
        description: "DATA01 (96h for LAMP/LIGHT ADJUST)"
      - name: target_hi
        type: integer
        description: "DATA02 (FFh for LAMP/LIGHT ADJUST)"
      - name: mode
        type: integer
        description: "00h=absolute 01h=relative"
      - name: value_lo
        type: integer
        description: "Adjustment value low 8 bits"
      - name: value_hi
        type: integer
        description: "Adjustment value high 8 bits"
    notes: "Only documented target is 96h/FFh = LAMP ADJUST / LIGHT ADJUST."

  - id: information_request
    label: 037 INFORMATION REQUEST
    kind: query
    command: "03 8A 00 00 00 8D"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage seconds (DATA83-86), filter usage seconds (DATA87-90). Updated at 1-min intervals."

  - id: filter_usage_information_request
    label: 037-3 FILTER USAGE INFORMATION REQUEST
    kind: query
    command: "03 95 00 00 00 98"
    params: []
    notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08), seconds. -1 if undefined."

  - id: lamp_information_request_3
    label: 037-4 LAMP INFORMATION REQUEST 3
    kind: query
    command: "03 96 00 00 02 {lamp} {content} {checksum}"
    params:
      - name: lamp
        type: integer
        description: "DATA01: 00h=Lamp1 01h=Lamp2 (Lamp2 only on two-lamp models)"
      - name: content
        type: integer
        description: "DATA02: 01h=usage time (s) 04h=remaining life (%)"
    notes: "Reflects eco mode. Negative remaining life if replacement deadline exceeded."

  - id: carbon_savings_information_request
    label: 037-6 CARBON SAVINGS INFORMATION REQUEST
    kind: query
    command: "03 9A 00 00 01 {type} {checksum}"
    params:
      - name: type
        type: integer
        description: "DATA01: 00h=Total Carbon Savings 01h=Carbon Savings during operation"
    notes: "Returns kg (DATA02-05) + mg (DATA06-09)."

  - id: remote_key_code
    label: 050 REMOTE KEY CODE
    kind: action
    command: "02 0F 00 00 02 {key_lo} {key_hi} {checksum}"
    params:
      - name: key_lo
        type: integer
        description: "DATA01 low byte of key code (WORD). See key code list."
      - name: key_hi
        type: integer
        description: "DATA02 high byte of key code (always 00h in listed codes)."
    notes: "Key code list: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO."

  - id: shutter_close
    label: 051 SHUTTER CLOSE
    kind: action
    command: "02 16 00 00 00 18"
    params: []

  - id: shutter_open
    label: 052 SHUTTER OPEN
    kind: action
    command: "02 17 00 00 00 19"
    params: []

  - id: lens_control
    label: 053 LENS CONTROL
    kind: action
    command: "02 18 00 00 02 {target} {content} {checksum}"
    params:
      - name: target
        type: integer
        description: "DATA01 lens axis. 06h=Periphery Focus documented; others (shift/zoom/focus) in appendix."
      - name: content
        type: integer
        description: "DATA02: 00h=stop 01h=+1s 02h=+0.5s 03h=+0.25s 7Fh=+continuous 81h=-continuous FDh=-0.25s FEh=-0.5s FFh=-1s"
    notes: "After 7Fh/81h continuous drive, send 00h to stop."

  - id: lens_control_request
    label: 053-1 LENS CONTROL REQUEST
    kind: query
    command: "02 1C 00 00 02 {target} 00 {checksum}"
    params:
      - name: target
        type: integer
        description: "DATA01 lens axis to query."
    notes: "Returns upper/lower bounds + current value (each as 16-bit)."

  - id: lens_control_2
    label: 053-2 LENS CONTROL 2
    kind: action
    command: "02 1D 00 00 04 {target} {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: integer
        description: "DATA01 lens axis (FFh=Stop)"
      - name: mode
        type: integer
        description: "DATA02: 00h=absolute 02h=relative"
      - name: value_lo
        type: integer
        description: "Adjustment value low 8 bits"
      - name: value_hi
        type: integer
        description: "Adjustment value high 8 bits"

  - id: lens_memory_control
    label: 053-3 LENS MEMORY CONTROL
    kind: action
    command: "02 1E 00 00 01 {operation} {checksum}"
    params:
      - name: operation
        type: integer
        description: "DATA01: 00h=MOVE 01h=STORE 02h=RESET"

  - id: reference_lens_memory_control
    label: 053-4 REFERENCE LENS MEMORY CONTROL
    kind: action
    command: "02 1F 00 00 01 {operation} {checksum}"
    params:
      - name: operation
        type: integer
        description: "DATA01: 00h=MOVE 01h=STORE 02h=RESET"
    notes: "Operates on profile selected by 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request
    label: 053-5 LENS MEMORY OPTION REQUEST
    kind: query
    command: "02 20 00 00 01 {option} {checksum}"
    params:
      - name: option
        type: integer
        description: "DATA01: 00h=LOAD BY SIGNAL 01h=FORCED MUTE"
    notes: "Returns DATA02 setting: 00h=OFF 01h=ON."

  - id: lens_memory_option_set
    label: 053-6 LENS MEMORY OPTION SET
    kind: action
    command: "02 21 00 00 02 {option} {value} {checksum}"
    params:
      - name: option
        type: integer
        description: "DATA01: 00h=LOAD BY SIGNAL 01h=FORCED MUTE"
      - name: value
        type: integer
        description: "DATA02: 00h=OFF 01h=ON"

  - id: lens_information_request
    label: 053-7 LENS INFORMATION REQUEST
    kind: query
    command: "02 22 00 00 01 00 25"
    params: []
    notes: "Returns DATA01 bitfield: Bit0=lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V (0=stop, 1=operating)."

  - id: lens_profile_set
    label: 053-10 LENS PROFILE SET
    kind: action
    command: "02 27 00 00 01 {profile} {checksum}"
    params:
      - name: profile
        type: integer
        description: "DATA01: 00h=Profile 1 01h=Profile 2"

  - id: lens_profile_request
    label: 053-11 LENS PROFILE REQUEST
    kind: query
    command: "02 28 00 00 00 2A"
    params: []
    notes: "Returns DATA01: 00h=Profile 1 01h=Profile 2."

  - id: gain_parameter_request_3
    label: 060-1 GAIN PARAMETER REQUEST 3
    kind: query
    command: "03 05 00 00 03 {name} 00 00 {checksum}"
    params:
      - name: name
        type: integer
        description: "DATA01: 00h=BRIGHTNESS 01h=CONTRAST 02h=COLOR 03h=HUE 04h=SHARPNESS 05h=VOLUME 96h=LAMP/LIGHT ADJUST"
    notes: "Returns status, upper/lower bounds, default, current value, wide/narrow adjustment widths (each 16-bit)."

  - id: setting_request
    label: 078-1 SETTING REQUEST
    kind: query
    command: "00 85 00 00 01 00 86"
    params: []
    notes: "Returns base model type (DATA01-03), sound function (DATA04), profile features (DATA05)."

  - id: running_status_request
    label: 078-2 RUNNING STATUS REQUEST
    kind: query
    command: "00 85 00 00 01 01 87"
    params: []
    notes: "Returns DATA03 power status (00h=Standby 01h=PowerOn), DATA04 cooling, DATA05 power-on/off process, DATA06 operation status (00h=Standby Sleep 04h=PowerOn 05h=Cooling 06h=Standby error 0Fh=Power saving 10h=Network standby)."

  - id: input_status_request
    label: 078-3 INPUT STATUS REQUEST
    kind: query
    command: "00 85 00 00 01 02 88"
    params: []
    notes: "Returns signal switch process, signal list number (returned value = practical - 1), selection signal types 1&2, signal list type, test pattern, content displayed."

  - id: mute_status_request
    label: 078-4 MUTE STATUS REQUEST
    kind: query
    command: "00 85 00 00 01 03 89"
    params: []
    notes: "Returns DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display (00h=off 01h=on each)."

  - id: model_name_request
    label: 078-5 MODEL NAME REQUEST
    kind: query
    command: "00 85 00 00 01 04 8A"
    params: []
    notes: "Returns model name NUL-terminated string (DATA01-32)."

  - id: cover_status_request
    label: 078-6 COVER STATUS REQUEST
    kind: query
    command: "00 85 00 00 01 05 8B"
    params: []
    notes: "Returns DATA01: 00h=Normal (cover opened) 01h=Cover closed."

  - id: freeze_control
    label: 079 FREEZE CONTROL
    kind: action
    command: "01 98 00 00 01 {state} {checksum}"
    params:
      - name: state
        type: integer
        description: "DATA01: 01h=freeze ON 02h=freeze OFF"

  - id: information_string_request
    label: 084 INFORMATION STRING REQUEST
    kind: query
    command: "00 D0 00 00 03 00 {info_type} 01 {checksum}"
    params:
      - name: info_type
        type: integer
        description: "DATA01: 03h=Horizontal sync frequency 04h=Vertical sync frequency"
    notes: "Returns variable-length label/string (NUL-terminated)."

  - id: eco_mode_request
    label: 097-8 ECO MODE REQUEST
    kind: query
    command: "03 B0 00 00 01 07 BB"
    params: []
    notes: "Returns eco/light/lamp mode value. Full value set in appendix."

  - id: lan_projector_name_request
    label: 097-45 LAN PROJECTOR NAME REQUEST
    kind: query
    command: "03 B0 00 00 01 2C E0"
    params: []
    notes: "Returns projector name NUL-terminated (DATA01-17)."

  - id: lan_mac_address_request_2
    label: 097-155 LAN MAC ADDRESS STATUS REQUEST 2
    kind: query
    command: "03 B0 00 00 02 9A 00 4F"
    params: []
    notes: "Returns 6-byte MAC address (DATA01-06)."

  - id: pip_pbp_request
    label: 097-198 PIP / PICTURE BY PICTURE REQUEST
    kind: query
    command: "03 B0 00 00 02 C5 {param} {checksum}"
    params:
      - name: param
        type: integer
        description: "DATA01: 00h=MODE 01h=START POSITION 02h=SUB INPUT/SUB INPUT 1 09h=SUB INPUT 2 0Ah=SUB INPUT 3"
    notes: "MODE returns 00h=PIP 01h=PBP. START POSITION returns 00h=TOP-LEFT 01h=TOP-RIGHT 02h=BOTTOM-LEFT 03h=BOTTOM-RIGHT."

  - id: edge_blending_mode_request
    label: 097-243-1 EDGE BLENDING MODE REQUEST
    kind: query
    command: "03 B0 00 00 02 DF 00 94"
    params: []
    notes: "Returns DATA01: 00h=OFF 01h=ON."

  - id: eco_mode_set
    label: 098-8 ECO MODE SET
    kind: action
    command: "03 B1 00 00 02 07 {value} {checksum}"
    params:
      - name: value
        type: integer
        description: "DATA01 eco/light/lamp mode value. Full set in appendix."

  - id: lan_projector_name_set
    label: 098-45 LAN PROJECTOR NAME SET
    kind: action
    command: "03 B1 00 00 12 2C {name_0} {name_1} ... {name_15} 00 {checksum}"
    params:
      - name: name
        type: string
        description: "Projector name up to 16 bytes (DATA01-16)."
    notes: "Frame carries up to 16 name bytes plus trailing 00h."

  - id: pip_pbp_set
    label: 098-198 PIP / PICTURE BY PICTURE SET
    kind: action
    command: "03 B1 00 00 03 C5 {param} {value} {checksum}"
    params:
      - name: param
        type: integer
        description: "DATA01: 00h=MODE 01h=START POSITION 02h=SUB INPUT/SUB INPUT 1 09h=SUB INPUT 2 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "DATA02 setting value. MODE: 00h=PIP 01h=PBP. START POSITION: 00h=TOP-LEFT 01h=TOP-RIGHT 02h=BOTTOM-LEFT 03h=BOTTOM-RIGHT."

  - id: edge_blending_mode_set
    label: 098-243-1 EDGE BLENDING MODE SET
    kind: action
    command: "03 B1 00 00 03 DF 00 {value} {checksum}"
    params:
      - name: value
        type: integer
        description: "DATA01: 00h=OFF 01h=ON"

  - id: base_model_type_request
    label: 305-1 BASE MODEL TYPE REQUEST
    kind: query
    command: "00 BF 00 00 01 00 C0"
    params: []
    notes: "Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11)."

  - id: serial_number_request
    label: 305-2 SERIAL NUMBER REQUEST
    kind: query
    command: "00 BF 00 00 02 01 06 C8"
    params: []
    notes: "Returns serial number NUL-terminated (DATA01-16)."

  - id: basic_information_request
    label: 305-3 BASIC INFORMATION REQUEST
    kind: query
    command: "00 BF 00 00 01 02 C2"
    params: []
    notes: "Returns operation status, content displayed, selection signal types 1&2, display signal type, video/sound/onscreen mute, freeze status."

  - id: audio_select_set
    label: 319-10 AUDIO SELECT SET
    kind: action
    command: "03 C9 00 00 03 09 {input} {value} {checksum}"
    params:
      - name: input
        type: integer
        description: "DATA01 input terminal code. Full set in appendix."
      - name: value
        type: integer
        description: "DATA02: 00h=terminal specified in DATA01 01h=BNC 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    source: "078-2 DATA06; 305-3 DATA01"
  - id: picture_mute_state
    type: enum
    values: [off, on]
    source: "078-4 DATA01; 305-3 DATA06"
  - id: sound_mute_state
    type: enum
    values: [off, on]
    source: "078-4 DATA02; 305-3 DATA07"
  - id: onscreen_mute_state
    type: enum
    values: [off, on]
    source: "078-4 DATA03; 305-3 DATA08"
  - id: freeze_state
    type: enum
    values: [off, on]
    source: "305-3 DATA09"
  - id: cover_state
    type: enum
    values: [normal_open, closed]
    source: "078-6 DATA01"
  - id: lens_operation
    type: bitmask
    bits: [lens_memory, zoom, focus, lens_shift_h, lens_shift_v]
    source: "053-7 DATA01"
  - id: error_status
    type: bitmask
    description: "12-byte error bitfield from 009 (cover/fan/temp/power/lamp/formatter/iris/foreign-matter/interlock/system errors)."
  - id: lamp_remaining_life_pct
    type: integer
    source: "037-4 content=04h"
  - id: edge_blending_state
    type: enum
    values: [off, on]
    source: "097-243-1 DATA01"
  - id: eco_mode
    type: integer
    source: "097-8 DATA01"
    # UNRESOLVED: full enum value set not in source (appendix reference)
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    description: "Sound volume level"
    query: "060-1 name=05h"
    set: "030-2"
  - id: brightness
    type: integer
    description: "Picture brightness"
    query: "060-1 name=00h"
    set: "030-1 target=00h"
  - id: contrast
    type: integer
    query: "060-1 name=01h"
    set: "030-1 target=01h"
  - id: color
    type: integer
    query: "060-1 name=02h"
    set: "030-1 target=02h"
  - id: hue
    type: integer
    query: "060-1 name=03h"
    set: "030-1 target=03h"
  - id: sharpness
    type: integer
    query: "060-1 name=04h"
    set: "030-1 target=04h"
  - id: lamp_light_adjust
    type: integer
    query: "060-1 name=96h"
    set: "030-15 target=96h/FFh"
  - id: projector_name
    type: string
    max_length: 16
    query: "097-45"
    set: "098-45"
  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    query: "053-11"
    set: "053-10"
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source.
# All responses are solicited replies to commands.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: "015 POWER ON"
    rule: "No other command accepted while power-on in progress."
  - command: "016 POWER OFF"
    rule: "No other command accepted during power-off (including cooling time)."
  - command: "053 LENS CONTROL"
    rule: "After continuous drive (7Fh/81h) must send 00h to stop."
# UNRESOLVED: source references portrait-cover / interlock-switch error bits
# (009 DATA09 Bit0/Bit1) but no explicit power-on sequencing interlock procedure documented.
```

## Notes
- Binary protocol; all bytes shown in source as hexadecimal with `h` suffix (e.g. `02h`). Spec normalizes to two-digit hex without suffix in command fields.
- Checksum (CKS) = low-order 8 bits of the arithmetic sum of all preceding bytes (including lead, command, ID1, ID2, LEN, and DATA bytes). Worked example from source: `20h+81h+01h+60h+01h+00h = 103h → CKS=03h`.
- ID1 = projector control ID; ID2 = model code (varies by model). Both are runtime-configured and not fixed by this spec.
- Error responses use lead bytes A0h/A1h/A2h/A3h with ERR1/ERR2 codes per §2.4 (e.g. ERR1=02h ERR2=0Dh = "command cannot be accepted because the power is off").
- Source repeatedly references an Appendix "Supplementary Information by Command" for full enumerations of input-terminal codes, aspect values, base-model-type codes, eco-mode values, and sub-input values. That appendix was not present in the refined source document — all such enumerations are marked UNRESOLVED where they affect implementability.
- Cooling/standby timing values, voltage/lamp wattage, and fan thresholds are not stated.
- Communication mode is full-duplex RS-232C; serial cable is cross (null-modem).

<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: ID2 model code value for NP-PV800UL-B1 not stated. -->
<!-- UNRESOLVED: input-terminal code table, aspect value table, base-model-type codes, eco-mode enum, sub-input codes — all referenced to appendix not included in source. -->
<!-- UNRESOLVED: flow_control setting — RTS/CTS pins cross-wired in pinout but explicit flow-control mode not stated. -->
<!-- UNRESOLVED: response timing / inter-command delay requirements not stated. -->
```

Spec done. 53 commands enumerated verbatim from source — each carries literal hex payload, parameterized where source shows DATA fields. Gaps marked `UNRESOLVED`: appendix tables (input codes, aspect values, eco-mode enum, sub-input codes), firmware range, ID2 model code, flow-control mode, response timing. Baud rate listed as configurable set per source; port 7142 stated; serial 8N1 stated.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:16:43.416Z
last_checked_at: 2026-06-18T08:51:18.882Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:51:18.882Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact firmware versions, model code (ID2) value, and base-model-type codes are not stated in this manual (referenced appendix \"Supplementary Information by Command\" not included in source)."
- "flow control not stated; pinout shows RTS/CTS cross-wired (hardware handshaking implied)"
- "full enum value set not in source (appendix reference)"
- "no unsolicited notification events documented in source."
- "no multi-step macro sequences documented in source."
- "source references portrait-cover / interlock-switch error bits"
- "firmware version compatibility range not stated."
- "ID2 model code value for NP-PV800UL-B1 not stated."
- "input-terminal code table, aspect value table, base-model-type codes, eco-mode enum, sub-input codes — all referenced to appendix not included in source."
- "flow_control setting — RTS/CTS pins cross-wired in pinout but explicit flow-control mode not stated."
- "response timing / inter-command delay requirements not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
