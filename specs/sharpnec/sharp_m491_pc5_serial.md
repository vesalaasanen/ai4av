---
spec_id: admin/sharp-nec-m491-pc5
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC M491 Pc5 Control Spec"
manufacturer: Sharp/NEC
model_family: "M491 Pc5"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "M491 Pc5"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:51:05.546Z
last_checked_at: 2026-06-18T08:20:51.678Z
generated_at: 2026-06-18T08:20:51.678Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Model code (ID2) value not stated; varies by model. Control ID (ID1) default value not stated."
  - "no continuous-variable set model beyond per-action DATA bytes."
  - "device may emit async error notifications but source does not document any."
  - "no multi-step sequences described explicitly in source."
  - "no power-on sequencing procedure, voltage specs, or formal interlock"
  - "Control ID (ID1) default and Model code (ID2) value for M491 Pc5 not stated."
  - "Appendix enum tables (input terminal, aspect, eco mode, base model type, sub-input) not in this source excerpt."
  - "firmware version, voltage/power specs, wireless LAN unit part numbers not stated."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:20:51.678Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions have exact hex opcode matches in source command reference (3.1-3.53); transport parameters match verbatim; source contains exactly 53 commands. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC M491 Pc5 Control Spec

## Summary
The Sharp/NEC M491 Pc5 is a projector controllable via an RS-232C serial link (PC CONTROL D-SUB 9P) or a wired/wireless LAN using TCP port 7142. This spec covers the binary command protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1), including power, input switching, mutes, picture/volume/aspect adjustment, lens control and memory, status/error queries, and LAN/eco/PIP/edge-blending settings.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Model code (ID2) value not stated; varies by model. Control ID (ID1) default value not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # source: "Use TCP port number 7142 for sending and receiving commands."
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists all five as supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: full_duplex  # source: "Communication mode: Full duplex"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: 015 POWER ON / 016 POWER OFF
  - routable       # inferred: 018 INPUT SW CHANGE
  - levelable      # inferred: 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST
  - queryable      # inferred: many status/info request commands
```

## Actions
```yaml
# Notes on framing:
# - Commands/responses are hex bytes. Format preserved verbatim from source.
# - <ID1> = Control ID (set on projector); <ID2> = Model code (varies by model).
# - <CKS> = checksum: low-order byte of the sum of all preceding bytes.
# - Parameterized commands show the variable DATA bytes; fixed bytes are literal.
actions:
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Response carries DATA01-DATA12 error bitmasks (cover, fan, temp, lamp, mirror cover, interlock, etc.)."

  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "While turning on, no other command accepted."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "During power-off (incl. cooling time), no other command accepted."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "Input terminal value (see Appendix 'Supplementary Information by Command'); e.g. 06h = video port."
    notes: "Response DATA01=FFh means ended with an error (no signal switch made)."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared by input/video signal switch."

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
    notes: "Cleared by input/video signal switch."

  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: byte
        description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness."
      - name: data02
        type: byte
        description: "Adjustment mode: 00h absolute, 01h relative."
      - name: data03
        type: byte
        description: "Adjustment value (low-order 8 bits)."
      - name: data04
        type: byte
        description: "Adjustment value (high-order 8 bits)."
    notes: "Example (brightness=10): 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h."

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
    params:
      - name: data01
        type: byte
        description: "Adjustment mode: 00h absolute, 01h relative."
      - name: data02
        type: byte
        description: "Adjustment value (low-order 8 bits)."
      - name: data03
        type: byte
        description: "Adjustment value (high-order 8 bits)."
    notes: "Example (volume=10): 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
    params:
      - name: data01
        type: byte
        description: "Aspect value (see Appendix 'Supplementary Information by Command')."
    params_extra: []

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
    params:
      - name: data01
        type: byte
        description: "Adjustment target high byte: 96h."
      - name: data02
        type: byte
        description: "Adjustment target low byte: FFh. Combined DATA01:DATA02 = LAMP ADJUST / LIGHT ADJUST."
      - name: data03
        type: byte
        description: "Adjustment mode: 00h absolute, 01h relative."
      - name: data04
        type: byte
        description: "Adjustment value (low-order 8 bits)."
      - name: data05
        type: byte
        description: "Adjustment value (high-order 8 bits)."

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90)."

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08), seconds. -1 if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: byte
        description: "Lamp select: 00h Lamp 1, 01h Lamp 2 (two-lamp models only)."
      - name: data02
        type: byte
        description: "Content: 01h lamp usage time (seconds), 04h lamp remaining life (%)."

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h Total Carbon Savings, 01h Carbon Savings during operation."

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: byte
        description: "Key code low byte (WORD type)."
      - name: data02
        type: byte
        description: "Key code high byte. Key code table: 02h/00h POWER ON, 03h/00h POWER OFF, 05h/00h AUTO, 06h/00h MENU, 07h/00h UP, 08h/00h DOWN, 09h/00h RIGHT, 0Ah/00h LEFT, 0Bh/00h ENTER, 0Ch/00h EXIT, 0Dh/00h HELP, 0Fh/00h MAGNIFY UP, 10h/00h MAGNIFY DOWN, 13h/00h MUTE, 29h/00h PICTURE, 4Bh/00h COMPUTER1, 4Ch/00h COMPUTER2, 4Fh/00h VIDEO1, 51h/00h S-VIDEO1, 84h/00h VOLUME UP, 85h/00h VOLUME DOWN, 8Ah/00h FREEZE, A3h/00h ASPECT, D7h/00h SOURCE, EEh/00h LAMP MODE/ECO."

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
    command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: byte
        description: "Lens target; e.g. 06h Periphery Focus."
      - name: data02
        type: byte
        description: "Content: 00h Stop, 01h drive +1s, 02h drive +0.5s, 03h drive +0.25s, 7Fh drive +continuous, 81h drive -continuous, FDh drive -0.25s, FEh drive -0.5s, FFh drive -1s."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    params:
      - name: data01
        type: byte
        description: "Lens target (periphery focus etc.)."
    notes: "Returns upper/lower/current limits (16-bit each) in DATA02-DATA07."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: byte
        description: "Lens target; FFh = Stop (mode/value ignored)."
      - name: data02
        type: byte
        description: "Adjustment mode: 00h absolute, 02h relative."
      - name: data03
        type: byte
        description: "Adjustment value (low-order 8 bits)."
      - name: data04
        type: byte
        description: "Adjustment value (high-order 8 bits)."

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h MOVE, 01h STORE, 02h RESET."

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h MOVE, 01h STORE, 02h RESET."
    notes: "Controls profile selected by 053-10 LENS PROFILE SET."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE."
      - name: data02
        type: byte
        description: "Setting value: 00h OFF, 01h ON."

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitmask: bit0 lens memory, bit1 zoom, bit2 focus, bit3 lens shift (H), bit4 lens shift (V) (0=Stop, 1=During operation)."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h Profile 1, 01h Profile 2."

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns selected profile (00h Profile 1, 01h Profile 2)."

  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
    params:
      - name: data01
        type: byte
        description: "00h PICTURE/BRIGHTNESS, 01h CONTRAST, 02h COLOR, 03h HUE, 04h SHARPNESS, 05h VOLUME, 96h LAMP/LIGHT ADJUST."
    notes: "Example (brightness): 03h 05h 00h 00h 03h 00h 00h 00h 0Bh."

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type (DATA01-03), sound function (DATA04), profile number (DATA05)."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status, cooling process, power on/off process, operation status."

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number (practical = returned + 1), selection signal type 1/2, signal list type, test pattern display, content displayed."

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture/sound/onscreen/forced-onscreen mute and onscreen display status."

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Returns model name string (DATA01-32)."

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns 00h Normal (cover opened), 01h Cover closed."

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "01h freeze on, 02h freeze off."

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
    params:
      - name: data01
        type: byte
        description: "03h horizontal sync frequency, 04h vertical sync frequency."

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns Light mode / Lamp mode value (see Appendix)."

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns projector name (DATA01-17)."

  - id: lan_mac_address_status_request2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns 6-byte MAC address (DATA01-06)."

  - id: pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3."

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Returns 00h OFF, 01h ON."

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "Eco/Light/Lamp mode value (see Appendix)."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01..data16} 00h {cks}"
    params:
      - name: data01_data16
        type: bytes
        description: "Projector name (up to 16 bytes)."

  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3."
      - name: data02
        type: byte
        description: "Value per DATA01 (e.g. MODE: 00h PIP/01h PBP; START POSITION: 00h TOP-LEFT ... 03h BOTTOM-RIGHT)."

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h OFF, 01h ON."

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11)."

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns serial number string (DATA01-16)."

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, signal type, video/sound/onscreen mute, freeze status."

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
    params:
      - name: data01
        type: byte
        description: "Input terminal (see Appendix)."
      - name: data02
        type: byte
        description: "00h terminal specified in DATA01, 01h BNC, 02h COMPUTER."
```

## Feedbacks
```yaml
# Response framing: success responses prefix with A0h/A1h/A2h/A3h (matches command
# first nibble + 8), carry <ID1> <ID2>, LEN, optional DATA, and <CKS>. Failure
# responses replace DATA with <ERR1> <ERR2>. Error code pairs (ERR1/ERR2):
feedbacks:
  - id: error_code_unrecognized_command
    type: enum
    values: ["ERR1=00h ERR2=00h: command cannot be recognized"]
  - id: error_code_not_supported
    type: enum
    values: ["ERR1=00h ERR2=01h: command not supported by model"]
  - id: error_code_invalid_value
    type: enum
    values: ["ERR1=01h ERR2=00h: specified value is invalid"]
  - id: error_code_invalid_input_terminal
    type: enum
    values: ["ERR1=01h ERR2=01h: specified input terminal invalid"]
  - id: error_code_invalid_language
    type: enum
    values: ["ERR1=01h ERR2=02h: specified language invalid"]
  - id: error_code_memory_allocation
    type: enum
    values: ["ERR1=02h ERR2=00h: memory allocation error"]
  - id: error_code_memory_in_use
    type: enum
    values: ["ERR1=02h ERR2=02h: memory in use"]
  - id: error_code_value_not_settable
    type: enum
    values: ["ERR1=02h ERR2=03h: specified value cannot be set"]
  - id: error_code_forced_onscreen_mute
    type: enum
    values: ["ERR1=02h ERR2=04h: forced onscreen mute on"]
  - id: error_code_viewer_error
    type: enum
    values: ["ERR1=02h ERR2=06h: viewer error"]
  - id: error_code_no_signal
    type: enum
    values: ["ERR1=02h ERR2=07h: no signal"]
  - id: error_code_test_pattern_or_filter
    type: enum
    values: ["ERR1=02h ERR2=08h: a test pattern or filter is displayed"]
  - id: error_code_no_pc_card
    type: enum
    values: ["ERR1=02h ERR2=09h: no PC card inserted"]
  - id: error_code_memory_operation
    type: enum
    values: ["ERR1=02h ERR2=0Ah: memory operation error"]
  - id: error_code_entry_list_displayed
    type: enum
    values: ["ERR1=02h ERR2=0Ch: an entry list is displayed"]
  - id: error_code_power_off
    type: enum
    values: ["ERR1=02h ERR2=0Dh: command cannot be accepted because the power is off"]
  - id: error_code_execution_failed
    type: enum
    values: ["ERR1=02h ERR2=0Eh: command execution failed"]
  - id: error_code_no_authority
    type: enum
    values: ["ERR1=02h ERR2=0Fh: no authority necessary for the operation"]
  - id: error_code_wrong_gain_number
    type: enum
    values: ["ERR1=03h ERR2=00h: specified gain number incorrect"]
  - id: error_code_invalid_gain
    type: enum
    values: ["ERR1=03h ERR2=01h: specified gain invalid"]
  - id: error_code_adjustment_failed
    type: enum
    values: ["ERR1=03h ERR2=02h: adjustment failed"]
```

## Variables
```yaml
# All settable parameters are exposed as discrete Actions above (picture/volume/
# aspect/eco/lens/PIP/edge-blending/audio-select). No separate variable model
# documented beyond the gain-parameter query range response (060-1).
# UNRESOLVED: no continuous-variable set model beyond per-action DATA bytes.
```

## Events
```yaml
# No unsolicited notifications documented. All responses are command-acknowledgements.
# UNRESOLVED: device may emit async error notifications but source does not document any.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "While 015 POWER ON is executing, no other command is accepted."
  - "While 016 POWER OFF is executing (including cooling time), no other command is accepted."
  - "078-6 COVER STATUS REQUEST and 009 ERROR STATUS REQUEST expose cover/interlock-switch state (DATA09 bit1: interlock switch open)."
# UNRESOLVED: no power-on sequencing procedure, voltage specs, or formal interlock
# reset sequence stated in source.
```

## Notes
- Binary protocol. Bytes shown in source as `NNh`. Multi-byte params use `DATA01..` naming.
- Framing example: `20h  88h <ID1> <ID2> 0Ch <DATA01> ... <DATA12> <CKS>`.
- Checksum = low-order byte of sum of all preceding bytes (incl. fixed header and DATA, excl. CKS itself). Worked example: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`.
- Success response first byte = command first byte | 0x80 (e.g. `02h` cmd → `22h` ack normal, `A2h` ack with ERR). `00h` → `20h`/`A0h`, `03h` → `23h`/`A3h`, `01h` → `21h`/`A1h`.
- RS-232 uses a cross (null-modem) cable on PC CONTROL (D-SUB 9P): pin2 RxD↔TxD, pin3 TxD↔RxD, pin5 GND, pin7 RTS↔CTS, pin8 CTS↔RTS.
- LAN: wired RJ-45 (10/100 Mbps auto) or optional wireless LAN unit. Commands use TCP port 7142.
- Several DATA byte enums reference an "Appendix: Supplementary Information by Command" not present in this refined excerpt (input terminal values, aspect values, eco mode values, base model types, sub-input values). Those enum bodies are UNRESOLVED.

<!-- UNRESOLVED: Control ID (ID1) default and Model code (ID2) value for M491 Pc5 not stated. -->
<!-- UNRESOLVED: Appendix enum tables (input terminal, aspect, eco mode, base model type, sub-input) not in this source excerpt. -->
<!-- UNRESOLVED: firmware version, voltage/power specs, wireless LAN unit part numbers not stated. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:51:05.546Z
last_checked_at: 2026-06-18T08:20:51.678Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:20:51.678Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions have exact hex opcode matches in source command reference (3.1-3.53); transport parameters match verbatim; source contains exactly 53 commands. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Model code (ID2) value not stated; varies by model. Control ID (ID1) default value not stated."
- "no continuous-variable set model beyond per-action DATA bytes."
- "device may emit async error notifications but source does not document any."
- "no multi-step sequences described explicitly in source."
- "no power-on sequencing procedure, voltage specs, or formal interlock"
- "Control ID (ID1) default and Model code (ID2) value for M491 Pc5 not stated."
- "Appendix enum tables (input terminal, aspect, eco mode, base model type, sub-input) not in this source excerpt."
- "firmware version, voltage/power specs, wireless LAN unit part numbers not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
