---
spec_id: admin/sharp-nec-np-v302h
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP V302H Control Spec"
manufacturer: Sharp/NEC
model_family: "NP V302H"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP V302H"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:36:48.544Z
last_checked_at: 2026-09-20T22:18:20.427Z
generated_at: 2026-09-20T22:18:20.427Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The manual defers per-model data to an Appendix (\"Connecting an External Device\", \"Supplementary Information by Command\") that is not included in the source text — input-terminal values, aspect values, eco-mode values, base-model types, sub-input values, and per-model command availability are unknown. Manual covers many projector models; V302H-specific support for LAN control not confirmable from source."
  - "flow control not stated in source (RTS/CTS pins wired per pinout table)"
  - "aspect values not in source"
  - "target values not in source"
  - "eco mode values not in source"
  - "sub input values not in source"
  - "input terminal values not in source"
  - "no safety warnings, interlock procedures, or power-on sequencing requirements"
  - "input terminal codes, aspect values, eco mode values, base model type values, PIP/PbP sub-input values, per-model command availability, standby command reception setting, flow control — all in manual Appendix not included in source."
  - "firmware version compatibility not stated in source."
  - "V302H-specific LAN control support not confirmable from source (manual is multi-model)."
  - "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
verification:
  verdict: verified
  checked_at: 2026-09-20T22:18:20.427Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match source command numbers/hex frames; transport (port 7142, baud 4800-115200) verified verbatim in source. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Sharp/NEC NP V302H Control Spec

## Summary
Sharp/NEC NP V302H DLP projector controlled via binary hex frames over RS-232C (PC CONTROL port) and/or TCP/IP (LAN). Source is the vendor "Projector Control Command Reference Manual" (BDT140013 Revision 7.1) documenting 53 commands: power, input switch, mutes, picture/volume/aspect adjust, lens control and memory, status queries, eco mode, PIP/PbP, edge blending, and identity requests.

<!-- UNRESOLVED: The manual defers per-model data to an Appendix ("Connecting an External Device", "Supplementary Information by Command") that is not included in the source text — input-terminal values, aspect values, eco-mode values, base-model types, sub-input values, and per-model command availability are unknown. Manual covers many projector models; V302H-specific support for LAN control not confirmable from source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # both connection methods documented in source; per-model availability in Appendix (not in source)
serial:
  # RS-232C, D-SUB 9P "PC CONTROL" port, cross cable (pinout: 2 RxD/TxD, 3 TxD/RxD, 5 GND, 7 RTS/CTS, 8 CTS/RTS)
  baud_rate: [4800, 9600, 19200, 38400, 115200]  # supported values stated; default not stated in source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (RTS/CTS pins wired per pinout table)
addressing:
  port: 7142  # "Use TCP port number 7142 for sending and receiving commands"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable    (015 POWER ON / 016 POWER OFF)  # inferred from power command examples
# - routable     (018 INPUT SW CHANGE)           # inferred from input routing command
# - queryable    (009/037/078/097/305 family)    # inferred from query command examples
# - levelable    (030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 030-15 OTHER ADJUST)  # inferred
traits:
  - powerable
  - routable
  - queryable
  - levelable
```

## Actions
```yaml
# Frame note: commands below are verbatim from source. Responses echo <ID1> <ID2> (control ID /
# model code) and append <CKS>. Checksum = low-order byte of the sum of all preceding bytes.
actions:
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Response DATA01-DATA12 are error bitmaps (bit=1 means error): cover, fan, temperature, power, lamp off/replacement, lamp usage limit, formatter, FPGA, ballast comm, iris calibration, lens install, interlock switch open, system errors."

  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "While turning on, no other command is accepted."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "While turning off (including cooling time), no other command is accepted."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: input_terminal
        type: integer
        description: "DATA01 input terminal code. Values in Appendix 'Supplementary Information by Command' (not in source). Source example: 06h = video port."
    notes: "Response DATA01 FFh = ended with error (no signal switch made)."

  - id: picture_mute_on
    label: "020. PICTURE MUTE ON"
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Mute cancelled by input terminal switch or video signal switch."

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
    notes: "Mute cancelled by input switch, video signal switch, or volume adjustment."

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
    notes: "Mute cancelled by input terminal switch or video signal switch."

  - id: onscreen_mute_off
    label: "025. ONSCREEN MUTE OFF"
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
    params:
      - name: target
        type: enum
        description: "DATA01: 00h brightness, 01h contrast, 02h color, 03h hue, 04h sharpness."
        values: ["00h", "01h", "02h", "03h", "04h"]
      - name: mode
        type: enum
        description: "DATA02: 00h absolute value, 01h relative value."
        values: ["00h", "01h"]
      - name: value
        type: integer
        description: "DATA03/DATA04 adjustment value, 16-bit little-endian (low byte, high byte). Signed for relative. Source examples set brightness +10 and -10."

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
    params:
      - name: mode
        type: enum
        description: "DATA01: 00h absolute value, 01h relative value."
        values: ["00h", "01h"]
      - name: value
        type: integer
        description: "DATA02/DATA03 adjustment value, 16-bit little-endian."

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: aspect
        type: integer
        description: "DATA01 aspect value. Values in Appendix (not in source)."  # UNRESOLVED: aspect values not in source

  - id: other_adjust
    label: "030-15. OTHER ADJUST (LAMP/LIGHT ADJUST)"
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
    params:
      - name: target
        type: enum
        description: "DATA01/DATA02: 96h FFh = LAMP ADJUST / LIGHT ADJUST."
        values: ["96h FFh"]
      - name: mode
        type: enum
        description: "DATA03: 00h absolute value, 01h relative value."
        values: ["00h", "01h"]
      - name: value
        type: integer
        description: "DATA04/DATA05 adjustment value, 16-bit little-endian."

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Response: DATA01-49 projector name (NUL-terminated), DATA83-86 lamp usage time (seconds), DATA87-90 filter usage time (seconds). Updated at one-minute intervals."

  - id: filter_usage_info_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Response: DATA01-04 filter usage time (seconds), DATA05-08 filter alarm start time (seconds); -1 if undefined."

  - id: lamp_info_request3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: lamp
        type: enum
        description: "DATA01: 00h lamp 1, 01h lamp 2 (two-lamp models only)."
        values: ["00h", "01h"]
      - name: content
        type: enum
        description: "DATA02: 01h lamp usage time (seconds), 04h lamp remaining life (%)."
        values: ["01h", "04h"]
    notes: "Values reflect eco mode when enabled. Remaining life goes negative past replacement deadline. Source example command: 03h 96h 00h 00h 02h 00h 01h 9Ch."

  - id: carbon_savings_info_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: type
        type: enum
        description: "DATA01: 00h total carbon savings, 01h carbon savings during operation."
        values: ["00h", "01h"]
    notes: "Response: DATA02-05 kg (max 99999), DATA06-09 mg (max 999999)."

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: key_code
        type: enum
        description: "DATA01/DATA02 WORD key code (DATA02 always 00h in list). 02h POWER ON, 03h POWER OFF, 05h AUTO, 06h MENU, 07h UP, 08h DOWN, 09h RIGHT, 0Ah LEFT, 0Bh ENTER, 0Ch EXIT, 0Dh HELP, 0Fh MAGNIFY UP, 10h MAGNIFY DOWN, 13h MUTE, 29h PICTURE, 4Bh COMPUTER1, 4Ch COMPUTER2, 4Fh VIDEO1, 51h S-VIDEO1, 84h VOLUME UP, 85h VOLUME DOWN, 8Ah FREEZE, A3h ASPECT, D7h SOURCE, EEh LAMP MODE/ECO."
        values: ["02h", "03h", "05h", "06h", "07h", "08h", "09h", "0Ah", "0Bh", "0Ch", "0Dh", "0Fh", "10h", "13h", "29h", "4Bh", "4Ch", "4Fh", "51h", "84h", "85h", "8Ah", "A3h", "D7h", "EEh"]
    notes: "Source example (AUTO): 02h 0Fh 00h 00h 02h 05h 00h 18h. Response DATA01 FFh = error."

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
        type: enum
        description: "DATA01 adjustment target; 06h Periphery Focus is the value documented in source."
        values: ["06h"]
      - name: motion
        type: enum
        description: "DATA02: 00h stop, 01h drive +1s, 02h drive +0.5s, 03h drive +0.25s, 7Fh drive plus (continuous), 81h drive minus (continuous), FDh drive -0.25s, FEh drive -0.5s, FFh drive -1s."
        values: ["00h", "01h", "02h", "03h", "7Fh", "81h", "FDh", "FEh", "FFh"]
    notes: "After 7Fh/81h continuous drive, stop by sending 00h. Same command can be re-issued while driving without a stop."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: target
        type: integer
        description: "DATA01 lens adjustment target. Target values not listed in source."  # UNRESOLVED: target values not in source
    notes: "Response: DATA02-03 upper limit, DATA04-05 lower limit, DATA06-07 current value (16-bit LE)."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
    params:
      - name: target
        type: enum
        description: "DATA01: FFh = stop (mode and value not referenced when stopping)."
        values: ["FFh"]
      - name: mode
        type: enum
        description: "DATA02: 00h absolute value, 02h relative value."
        values: ["00h", "02h"]
      - name: value
        type: integer
        description: "DATA03/DATA04 adjustment value, 16-bit little-endian."

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: operation
        type: enum
        description: "DATA01: 00h MOVE, 01h STORE, 02h RESET."
        values: ["00h", "01h", "02h"]

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: operation
        type: enum
        description: "DATA01: 00h MOVE, 01h STORE, 02h RESET."
        values: ["00h", "01h", "02h"]
    notes: "Controls the profile number selected via LENS PROFILE SET."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: option
        type: enum
        description: "DATA01: 00h LOAD BY SIGNAL, 01h FORCED MUTE."
        values: ["00h", "01h"]
    notes: "Response DATA02: 00h OFF, 01h ON."

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: option
        type: enum
        description: "DATA01: 00h LOAD BY SIGNAL, 01h FORCED MUTE."
        values: ["00h", "01h"]
      - name: value
        type: enum
        description: "DATA02: 00h OFF, 01h ON."
        values: ["00h", "01h"]

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Response DATA01 bitmap of lens operations in progress: bit0 lens memory, bit1 zoom, bit2 focus, bit3 lens shift H, bit4 lens shift V (0=stop, 1=operating)."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: profile
        type: enum
        description: "DATA01: 00h profile 1, 01h profile 2."
        values: ["00h", "01h"]

  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Response DATA01: 00h profile 1, 01h profile 2."

  - id: gain_parameter_request3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    params:
      - name: target
        type: enum
        description: "DATA01: 00h picture/brightness, 01h picture/contrast, 02h picture/color, 03h picture/hue, 04h picture/sharpness, 05h volume, 96h lamp adjust/light adjust."
        values: ["00h", "01h", "02h", "03h", "04h", "05h", "96h"]
    notes: "Response: DATA01 status (00h display not possible, 01h adjustment not possible, 02h adjustable, FFh gain nonexistent), DATA02-05 upper/lower limits, DATA06-07 default, DATA08-09 current, DATA10-13 wide/narrow adjustment widths, DATA14 default validity. Source example (brightness): 03h 05h 00h 00h 03h 00h 00h 00h 0Bh."

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Response: DATA01-03 base model type (values in Appendix), DATA04 sound function (00h not available/01h available), DATA05 profile (00h none, 01h clock, 02h sleep timer, 03h both)."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Response: DATA03 power status (00h standby, 01h power on, FFh unsupported), DATA04 cooling process, DATA05 power on/off process, DATA06 operation status (00h standby sleep, 04h power on, 05h cooling, 06h standby error, 0Fh standby power saving, 10h network standby)."

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Response: DATA01 signal switch process, DATA02 signal list number (returned value = actual - 1), DATA03 selection signal type 1, DATA04 selection signal type 2 (01h COMPUTER, 02h VIDEO, 03h S-VIDEO, 04h COMPONENT, 20h DVI-D, 21h HDMI, 22h DisplayPort), DATA05 signal list type, DATA06 test pattern display, DATA09 content displayed."

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Response: DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display (00h off/not displayed, 01h on/displayed)."

  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Response DATA01-32 model name (NUL-terminated)."

  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Response DATA01: 00h normal (cover opened), 01h cover closed."

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: state
        type: enum
        description: "DATA01: 01h freeze on, 02h freeze off."
        values: ["01h", "02h"]

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: info_type
        type: enum
        description: "DATA01: 03h horizontal synchronous frequency, 04h vertical synchronous frequency."
        values: ["03h", "04h"]
    notes: "Response strings in English, NUL-terminated."

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Response DATA01 eco mode value. Values in Appendix (not in source). Returns 'Light mode' or 'Lamp mode' value depending on projector."  # UNRESOLVED: eco mode values not in source

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Response DATA01-17 projector name (NUL-terminated)."

  - id: lan_mac_address_status_request2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Response DATA01-06 MAC address."

  - id: pip_pbp_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: item
        type: enum
        description: "DATA01: 00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3."
        values: ["00h", "01h", "02h", "09h", "0Ah"]
    notes: "Response DATA02: MODE 00h PIP / 01h PICTURE BY PICTURE; START POSITION 00h top-left, 01h top-right, 02h bottom-left, 03h bottom-right. Sub input values in Appendix."

  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Response DATA01: 00h OFF, 01h ON."

  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    params:
      - name: value
        type: integer
        description: "DATA01 eco mode value. Values in Appendix (not in source). Sets 'Light mode' or 'Lamp mode' depending on projector."  # UNRESOLVED: eco mode values not in source

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
    params:
      - name: name
        type: string
        description: "DATA01-16 projector name, up to 16 bytes."

  - id: pip_pbp_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: item
        type: enum
        description: "DATA01: 00h MODE, 01h START POSITION, 02h SUB INPUT / SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3."
        values: ["00h", "01h", "02h", "09h", "0Ah"]
      - name: value
        type: integer
        description: "DATA02 setting value. MODE: 00h PIP / 01h PICTURE BY PICTURE. START POSITION: 00h top-left, 01h top-right, 02h bottom-left, 03h bottom-right. Sub input values in Appendix (not in source)."  # UNRESOLVED: sub input values not in source

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: value
        type: enum
        description: "DATA01 setting value: 00h OFF, 01h ON (per request command definition)."
        values: ["00h", "01h"]

  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Response: DATA01-02 base model type (values in Appendix), DATA03-11 model name (NUL-terminated)."

  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Response DATA01-16 serial number (NUL-terminated)."

  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Response: DATA01 operation status, DATA02 content displayed, DATA03/04 selection signal type, DATA05 display signal type (video formats), DATA06 video mute, DATA07 sound mute, DATA08 onscreen mute, DATA09 freeze status."

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    params:
      - name: input_terminal
        type: integer
        description: "DATA01 input terminal. Values in Appendix (not in source)."  # UNRESOLVED: input terminal values not in source
      - name: audio_source
        type: enum
        description: "DATA02 setting value: 00h the terminal specified in DATA01, 01h BNC, 02h COMPUTER."
        values: ["00h", "01h", "02h"]
    notes: "Response DATA02 execution result: 00h success, 01h error."
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitmask
    description: "12-byte error bitmap from 009 response: cover, fan, temperature (bimetal and sensor), power, lamp off/replacement moratorium, lamp usage limit, formatter, FPGA, ballast comm, iris calibration, lens install, foreign matter, interlock switch open, portrait cover, system errors."
  - id: power_state
    type: enum
    values: [standby, power_on]
    description: "078-2 DATA03 power status: 00h standby, 01h power on."
  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    description: "078-2 DATA06 / 305-3 DATA01: 00h standby sleep, 04h power on, 05h cooling, 06h standby error, 0Fh standby power saving, 10h network standby."
  - id: cooling_in_progress
    type: boolean
    description: "078-2 DATA04 cooling process: 01h during execution."
  - id: input_signal_status
    type: object
    description: "078-3 / 305-3 response: signal switch process, signal list number (returned = actual-1), selection signal type 1/2 (COMPUTER/VIDEO/S-VIDEO/COMPONENT/DVI-D/HDMI/DisplayPort/VIEWER), signal list type, test pattern display, content displayed, display signal type."
  - id: picture_mute_state
    type: enum
    values: [off, on]
    description: "078-4 DATA01."
  - id: sound_mute_state
    type: enum
    values: [off, on]
    description: "078-4 DATA02."
  - id: onscreen_mute_state
    type: enum
    values: [off, on]
    description: "078-4 DATA03."
  - id: freeze_state
    type: enum
    values: [off, on]
    description: "305-3 DATA09."
  - id: lamp_usage_time
    type: integer
    description: "037 DATA83-86 / 037-4 response, in seconds; updated at one-minute intervals. Negative remaining-life % if replacement deadline exceeded."
  - id: lamp_remaining_life
    type: integer
    description: "037-4 content 04h, percent."
  - id: filter_usage_time
    type: integer
    description: "037 DATA87-90 / 037-3 DATA01-04, in seconds."
  - id: filter_alarm_start_time
    type: integer
    description: "037-3 DATA05-08, seconds; -1 if undefined."
  - id: carbon_savings
    type: object
    description: "037-6 response: total or operating, kg (DATA02-05) + mg (DATA06-09)."
  - id: projector_name
    type: string
    description: "037 DATA01-49 and 097-45 DATA01-17 (NUL-terminated)."
  - id: model_name
    type: string
    description: "078-5 / 305-1 response (NUL-terminated)."
  - id: serial_number
    type: string
    description: "305-2 DATA01-16 (NUL-terminated)."
  - id: base_model_type
    type: integer
    description: "078-1 DATA01-03 / 305-1 DATA01-02. Value meanings in Appendix (not in source)."
  - id: mac_address
    type: string
    description: "097-155 response DATA01-06."
  - id: eco_mode_value
    type: integer
    description: "097-8 DATA01. Value meanings in Appendix (not in source)."
  - id: lens_position
    type: object
    description: "053-1 response: upper limit, lower limit, current value (16-bit LE)."
  - id: lens_operation_status
    type: bitmask
    description: "053-7 DATA01: bit0 lens memory, bit1 zoom, bit2 focus, bit3 lens shift H, bit4 lens shift V (0 stop, 1 operating)."
  - id: lens_profile
    type: enum
    values: ["profile_1", "profile_2"]
    description: "053-11 DATA01: 00h profile 1, 01h profile 2."
  - id: lens_memory_option
    type: enum
    values: [off, on]
    description: "053-5 response DATA02 for LOAD BY SIGNAL / FORCED MUTE."
  - id: gain_parameter
    type: object
    description: "060-1 response: status, upper/lower limits, default, current value, wide/narrow adjustment widths, default validity - for brightness, contrast, color, hue, sharpness, volume, lamp/light adjust."
  - id: cover_status
    type: enum
    values: [opened, closed]
    description: "078-6 DATA01: 00h normal (opened), 01h closed."
  - id: sync_frequency_strings
    type: string
    description: "084 response: horizontal/vertical synchronous frequency strings (English)."
  - id: pip_pbp_mode
    type: enum
    values: [pip, picture_by_picture]
    description: "097-198 DATA01=00h response DATA02."
  - id: edge_blending_mode
    type: enum
    values: [off, on]
    description: "097-243-1 DATA01."
  - id: settings_info
    type: object
    description: "078-1 response: sound function availability, profile (clock/sleep timer) capability."
  - id: command_error
    type: object
    description: "Error response frame (Ax prefix with ERR1/ERR2): 00h00h unrecognized command, 00h01h unsupported by model, 01h00h invalid value, 01h01h invalid input terminal, 01h02h invalid language, 02h0Dh power is off, 02h0Eh execution failed, 02h03h value cannot be set, plus memory/fan/signal/gain errors - see source section 2.4 for full list."
```

## Variables
```yaml
# All settable parameters in the source are expressed as discrete Actions (eco mode set,
# projector name set, PIP/PbP set, edge blending set, audio select set, picture/volume adjust).
# No additional settable variables documented.
variables: []
```

## Events
```yaml
# No unsolicited notifications documented in source; all responses are solicited.
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
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements
# found in the source text. (Error bitmap includes an interlock-switch-open bit, but no
# operator interlock procedure is described.)
```

## Notes
- Command/response frames are hex byte sequences. Response frames start with command byte + 20h (e.g. command 02h → normal response 22h, error response A2h), then `<ID1> <ID2>` (control ID, model code), LEN, data, `<CKS>`.
- Checksum: add all preceding bytes, take low-order one byte of the sum. Source example: 20h+81h+01h+60h+01h+00h=103h → CKS=03h.
- No other command is accepted while power-on or power-off (including cooling) is in progress.
- Picture/onscreen mute auto-cancel on input switch or signal switch; sound mute also cancels on volume adjustment.
- Lamp/filter usage times have one-second resolution but update at one-minute intervals.
- Some models cannot receive commands in standby mode (see Appendix "Standby Mode setting for receiving commands" — not in source).
- Signal list numbers returned are actual value minus 1.
- Lens continuous drive (7Fh plus / 81h minus) must be stopped by sending 00h; repeated identical commands keep the lens moving without stop.

<!-- UNRESOLVED: input terminal codes, aspect values, eco mode values, base model type values, PIP/PbP sub-input values, per-model command availability, standby command reception setting, flow control — all in manual Appendix not included in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: V302H-specific LAN control support not confirmable from source (manual is multi-model). -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:36:48.544Z
last_checked_at: 2026-09-20T22:18:20.427Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-20T22:18:20.427Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match source command numbers/hex frames; transport (port 7142, baud 4800-115200) verified verbatim in source. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The manual defers per-model data to an Appendix (\"Connecting an External Device\", \"Supplementary Information by Command\") that is not included in the source text — input-terminal values, aspect values, eco-mode values, base-model types, sub-input values, and per-model command availability are unknown. Manual covers many projector models; V302H-specific support for LAN control not confirmable from source."
- "flow control not stated in source (RTS/CTS pins wired per pinout table)"
- "aspect values not in source"
- "target values not in source"
- "eco mode values not in source"
- "sub input values not in source"
- "input terminal values not in source"
- "no safety warnings, interlock procedures, or power-on sequencing requirements"
- "input terminal codes, aspect values, eco mode values, base model type values, PIP/PbP sub-input values, per-model command availability, standby command reception setting, flow control — all in manual Appendix not included in source."
- "firmware version compatibility not stated in source."
- "V302H-specific LAN control support not confirmable from source (manual is multi-model)."
- "source applicability inferred: the manufacturer protocol document names no model; commands verified against it but not confirmed for this exact model"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
