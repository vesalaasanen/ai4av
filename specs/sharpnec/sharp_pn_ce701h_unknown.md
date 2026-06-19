---
spec_id: admin/sharpnec-pn-ce701h
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC PN-CE701H Control Spec"
manufacturer: Sharp/NEC
model_family: PN-CE701H
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - PN-CE701H
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:25:20.014Z
last_checked_at: 2026-06-18T09:05:39.873Z
generated_at: 2026-06-18T09:05:39.873Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source."
  - "default baud rate among the supported set not designated in source."
  - "flow-control mode (hardware/software/none) not explicitly stated; only \"full duplex\" communication mode stated."
  - "control ID (ID1) and model code (ID2) per-unit values must be read from the projector; example commands use 00h/00h."
  - "default rate not designated; 9600 listed as one supported option"
  - "flow control not explicitly stated; communication mode is \"full duplex\""
  - "no separate variable table in source."
  - "source describes no unsolicited push/notification events. All data is"
  - "source documents no named multi-step command sequences."
  - "default baud rate among supported set (115200/38400/19200/9600/4800) not designated in source."
  - "flow-control mode (none/hardware/software) not explicitly stated; only \"full duplex\" communication mode stated."
  - "ID1 control ID and ID2 model code values are per-unit/per-model and not fixed in source (examples use 00h/00h)."
  - "Appendix 'Supplementary Information by Command' (input terminal codes, aspect values, eco mode values, sub input values, base model types) not included in the provided source text."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:05:39.873Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC PN-CE701H Control Spec

## Summary
Sharp/NEC PN-CE701H projector control spec covering RS-232C serial and TCP/IP (wired/wireless LAN) control. The device uses a framed binary command protocol (hex bytes, trailing checksum) documented in "Projector Control Command Reference Manual" BDT140013 Rev 7.1. This spec enumerates all 53 documented commands: power, input switching, mute, picture/volume/aspect/gain adjust, shutter, lens control and memory, freeze, eco mode, edge blending, PIP/PbP, and a broad set of status/identity queries.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: default baud rate among the supported set not designated in source. -->
<!-- UNRESOLVED: flow-control mode (hardware/software/none) not explicitly stated; only "full duplex" communication mode stated. -->
<!-- UNRESOLVED: control ID (ID1) and model code (ID2) per-unit values must be read from the projector; example commands use 00h/00h. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  # Baud rate supported set (no single default stated in source): 115200 / 38400 / 19200 / 9600 / 4800 bps
  baud_rate: 9600  # UNRESOLVED: default rate not designated; 9600 listed as one supported option
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not explicitly stated; communication mode is "full duplex"
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWER ON / POWER OFF commands (015 / 016)
  - queryable    # inferred from many status/information request commands
  - levelable    # inferred from VOLUME / PICTURE / gain adjust commands (030-1 / 030-2 / 030-15)
  - routable     # inferred from INPUT SW CHANGE command (018)
```

## Actions
```yaml
actions:
  # --- Status / error queries (0xx) ---
  - id: error_status_request
    label: "009. ERROR STATUS REQUEST"
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns DATA01-DATA12 bitfield error flags (cover, fan, temp, lamp, etc.). Success response: 20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>."

  # --- Power ---
  - id: power_on
    label: "015. POWER ON"
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "No other command accepted while power is turning on."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "No other command accepted during power-off (including cooling time)."

  # --- Input switching ---
  - id: input_switch_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal code (see Appendix 'Supplementary Information by Command'). Example 06h = video port; verbatim example to video: 02h 03h 00h 00h 02h 01h 06h 0Eh."
    notes: "Success response DATA01=FFh means ended with error (no switch made)."

  # --- Mutes ---
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

  # --- Adjustments (030-*) ---
  - id: picture_adjust
    label: "030-1. PICTURE ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: DATA03
        type: byte
        description: "Adjustment value (low-order 8 bits)."
      - name: DATA04
        type: byte
        description: "Adjustment value (high-order 8 bits)."
    notes: "Example set brightness to +10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h. Response result 0000h=success."

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: DATA02
        type: byte
        description: "Adjustment value (low-order 8 bits)."
      - name: DATA03
        type: byte
        description: "Adjustment value (high-order 8 bits)."
    notes: "Example set volume to 10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Aspect value (see Appendix 'Supplementary Information by Command')."

  - id: other_adjust
    label: "030-15. OTHER ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Adjustment target high byte (96h for LAMP ADJUST / LIGHT ADJUST when DATA02=FFh)."
      - name: DATA02
        type: byte
        description: "Adjustment target low byte (FFh with DATA01=96h = LAMP/LIGHT ADJUST)."
      - name: DATA03
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: DATA04
        type: byte
        description: "Adjustment value (low-order 8 bits)."
      - name: DATA05
        type: byte
        description: "Adjustment value (high-order 8 bits)."

  # --- Information requests (037-*) ---
  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at 1-minute intervals."
  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds; -1 if undefined."
  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
      - name: DATA02
        type: byte
        description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)."
    notes: "Example get lamp 1 usage time: 03h 96h 00h 00h 02h 00h 01h 9Ch. Remaining life is negative if replacement deadline exceeded."
  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."
    notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

  # --- Remote / shutter ---
  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Key code low byte (WORD). See key code list: e.g. 02h=POWER ON, 06h=MENU, 07h=UP, 29h=PICTURE, 4Bh=COMPUTER1, 84h=VOLUME UP, 8Ah=FREEZE, D7h=SOURCE, EEh=LAMP MODE/ECO."
      - name: DATA02
        type: byte
        description: "Key code high byte (00h for all listed keys)."
    notes: "Example send AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h. Response DATA01=FFh means error."
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

  # --- Lens (053-*) ---
  - id: lens_control
    label: "053. LENS CONTROL"
    kind: action
    command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Lens target: 06h=Periphery Focus (per source table)."
      - name: DATA02
        type: byte
        description: "Motion: 00h=Stop, 01h=drive +1s, 02h=drive +0.5s, 03h=drive +0.25s, 7Fh=drive plus, 81h=drive minus, FDh=drive -0.25s, FEh=drive -0.5s, FFh=drive -1s."
    notes: "After 7Fh/81h, send 00h to stop. Lens can be re-driven without stop while moving."
  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Lens target (e.g. 06h=Periphery Focus)."
    notes: "Returns upper/lower/current adjustment range (16-bit) in DATA02-DATA07."
  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Lens target; FFh=Stop (mode/value ignored)."
      - name: DATA02
        type: byte
        description: "Adjustment mode: 00h=absolute, 02h=relative."
      - name: DATA03
        type: byte
        description: "Adjustment value (low-order 8 bits)."
      - name: DATA04
        type: byte
        description: "Adjustment value (high-order 8 bits)."
  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET."
  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET."
    notes: "Acts on profile selected by 053-10 LENS PROFILE SET."
  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    notes: "Returns setting value DATA02: 00h=OFF, 01h=ON."
  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: DATA02
        type: byte
        description: "Setting value: 00h=OFF, 01h=ON."
  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns DATA01 bitfield: Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift (H), Bit4 Lens Shift (V) (0=Stop, 1=During operation)."
  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Profile number: 00h=Profile 1, 01h=Profile 2."
  - id: lens_profile_request
    label: "053-11. LENS PROFILE REQUEST"
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns DATA01 profile number: 00h=Profile 1, 01h=Profile 2."

  # --- Gain parameter request ---
  - id: gain_parameter_request_3
    label: "060-1. GAIN PARAMETER REQUEST 3"
    kind: query
    command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
    notes: "Example get brightness: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Returns status, upper/lower/default/current ranges, wide/narrow adjustment widths."

  # --- Status requests (078-*) ---
  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/timer functions (DATA05)."
  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status (DATA03), cooling process (DATA04), power on/off process (DATA05), operation status (DATA06)."
  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number (returned value is practical-1), selection signal type 1/2, signal list type, test pattern, content displayed."
  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture mute (DATA01), sound mute (DATA02), onscreen mute (DATA03), forced onscreen mute (DATA04), onscreen display (DATA05); each 00h=Off/01h=On."
  - id: model_name_request
    label: "078-5. MODEL NAME REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Returns model name string DATA01-32 (NUL-terminated)."
  - id: cover_status_request
    label: "078-6. COVER STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed."

  # --- Freeze ---
  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "01h=freeze on, 02h=freeze off."

  # --- Information string ---
  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Information type: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency."
    notes: "Returns label length (DATA02) and label/info strings (DATA03+, NUL-terminated)."

  # --- LAN / eco / PIP / edge-blending requests (097-*) ---
  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns eco mode value (DATA01); may map to Light mode or Lamp mode depending on model."
  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Returns projector name DATA01-17 (NUL-terminated)."
  - id: lan_mac_address_status_request2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Returns MAC address DATA01-06."
  - id: pip_picture_by_picture_request
    label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
  - id: edge_blending_mode_request
    label: "097-243-1. EDGE BLENDING MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Returns DATA01: 00h=OFF, 01h=ON."

  # --- LAN / eco / PIP / edge-blending sets (098-*) ---
  - id: eco_mode_set
    label: "098-8. ECO MODE SET"
    kind: action
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Eco mode value (see Appendix 'Supplementary Information by Command'); sets Light mode or Lamp mode depending on model."
  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
    params:
      - name: DATA01-DATA16
        type: bytes
        description: "Projector name, up to 16 bytes (NUL-terminated)."
  - id: pip_picture_by_picture_set
    label: "098-198. PIP/PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: DATA02
        type: byte
        description: "Setting value. MODE: 00h=PIP/01h=PbP. START POSITION: 00h=TOP-LEFT..03h=BOTTOM-RIGHT. Sub input values per Appendix."
  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Setting value: 00h=OFF, 01h=ON."

  # --- Identity / basic info (305-*) ---
  - id: base_model_type_request
    label: "305-1. BASE MODEL TYPE REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11, NUL-terminated)."
  - id: serial_number_request
    label: "305-2. SERIAL NUMBER REQUEST"
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Returns serial number string DATA01-16 (NUL-terminated)."
  - id: basic_information_request
    label: "305-3. BASIC INFORMATION REQUEST"
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status (DATA01), content displayed (DATA02), selection signal type 1/2 (DATA03/04), display signal type (DATA05), video/sound/onscreen mute, freeze status (DATA06-09)."

  # --- Audio select ---
  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: byte
        description: "Input terminal (see Appendix 'Supplementary Information by Command')."
      - name: DATA02
        type: byte
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitfield
    source: error_status_request
    description: "DATA01-DATA12 error flags: cover, fan, temperature, power, lamp off/replacement, lamp usage limit, formatter/FPGA, mirror cover, ballast, iris, lens install, interlock switch open, system errors."
  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
    source: running_status_request
    description: "From RUNNING STATUS DATA06 (and DATA03 power status)."
  - id: input_status
    type: object
    source: input_status_request
    description: "Signal list number, selection signal type 1/2, signal list type, test pattern, content displayed."
  - id: mute_status
    type: object
    source: mute_status_request
    description: "Picture/sound/onscreen/forced-onscreen mute and onscreen display flags."
  - id: cover_status
    type: enum
    values: [normal_open, closed]
    source: cover_status_request
  - id: lamp_usage_time
    type: integer
    unit: seconds
    source: lamp_information_request_3
  - id: lamp_remaining_life
    type: integer
    unit: percent
    source: lamp_information_request_3
    notes: "Negative if replacement deadline exceeded."
  - id: filter_usage_time
    type: integer
    unit: seconds
    source: filter_usage_information_request
  - id: model_name
    type: string
    source: model_name_request
  - id: serial_number
    type: string
    source: serial_number_request
  - id: projector_name
    type: string
    source: lan_projector_name_request
  - id: mac_address
    type: string
    source: lan_mac_address_status_request2
  - id: eco_mode
    type: enum
    source: eco_mode_request
    notes: "Concrete enum values not enumerated in source - see Appendix 'Supplementary Information by Command'."
  - id: lens_operation_status
    type: bitfield
    source: lens_information_request
    description: "Lens memory / zoom / focus / lens shift H+V operation flags (0=stop, 1=moving)."
  - id: edge_blending_mode
    type: enum
    values: [off, on]
    source: edge_blending_mode_request
  - id: pip_pbp_setting
    type: object
    source: pip_picture_by_picture_request
  - id: basic_information
    type: object
    source: basic_information_request
```

## Variables
```yaml
# Settable continuous levels are represented as parameterized Actions (030-1 PICTURE
# ADJUST, 030-2 VOLUME ADJUST, 030-15 OTHER ADJUST, 053-* lens controls). No additional
# stand-alone variables are documented outside those actions.
# UNRESOLVED: no separate variable table in source.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited push/notification events. All data is
# returned only in response to an explicit request command.
```

## Macros
```yaml
# UNRESOLVED: source documents no named multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_transition_lockout
    description: "While POWER ON (015) or POWER OFF (016) is executing (including cooling time), no other command is accepted."
    source: "POWER ON / POWER OFF command notes."
  - id: interlock_switch
    description: "Error status DATA09 Bit1 'The interlock switch is open' is reported via ERROR STATUS REQUEST (009)."
    source: "009 ERROR STATUS REQUEST error information list."
  - id: power_off_rejection
    description: "Error code ERR1=02h ERR2=0Dh: 'The command cannot be accepted because the power is off.'"
    source: "2.4 Error code list."
notes: "No explicit confirmation-before-execute requirement is documented. Operational lockouts above are the only safety-relevant behaviors in source."
```

## Notes
- **Command framing:** All commands and responses are hex-byte frames. Layout: `[header/type] [code] [ID1] [ID2] [LEN] [DATA...] [CKS]`.
  - Command header/type byte: `00h`=get, `01h`/`02h`/`03h`=set categories.
  - Success response header = type `| 0x20` (e.g. `20h`, `21h`, `22h`, `23h`); error response header = type `| 0xA0` (`A0h`, `A1h`, `A2h`, `A3h`).
  - `ID1` = control ID set on the projector; `ID2` = model code (varies by model). Documented example commands use `ID1=00h ID2=00h`.
  - `LEN` = byte length of the DATA part following LEN.
  - `CKS` = checksum = low-order byte (8 bits) of the sum of all preceding bytes. Worked example: `20h+81h+01h+60h+01h+00h = 103h` → `CKS = 03h`.
- **Serial:** RS-232C, D-SUB 9P PC CONTROL port, cross cable. Pinout: 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS. Full duplex.
- **LAN:** wired RJ-45 (10/100 Mbps auto, IEEE 802.3 / 802.3u) or optional wireless LAN unit. Commands sent/received over TCP port **7142**.
- **Errors:** `ERR1`/`ERR2` code table in section 2.4 (unrecognized command, unsupported, invalid value, invalid input, memory errors, forced onscreen mute, no signal, power off rejection, no authority, gain errors, etc.).
- Several DATA value enumerations (input terminal codes, aspect values, eco mode values, sub input values, base model types) are deferred to an "Appendix: Supplementary Information by Command" that is **not present in this refined source excerpt**.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: default baud rate among supported set (115200/38400/19200/9600/4800) not designated in source. -->
<!-- UNRESOLVED: flow-control mode (none/hardware/software) not explicitly stated; only "full duplex" communication mode stated. -->
<!-- UNRESOLVED: ID1 control ID and ID2 model code values are per-unit/per-model and not fixed in source (examples use 00h/00h). -->
<!-- UNRESOLVED: Appendix 'Supplementary Information by Command' (input terminal codes, aspect values, eco mode values, sub input values, base model types) not included in the provided source text. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:25:20.014Z
last_checked_at: 2026-06-18T09:05:39.873Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:05:39.873Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source."
- "default baud rate among the supported set not designated in source."
- "flow-control mode (hardware/software/none) not explicitly stated; only \"full duplex\" communication mode stated."
- "control ID (ID1) and model code (ID2) per-unit values must be read from the projector; example commands use 00h/00h."
- "default rate not designated; 9600 listed as one supported option"
- "flow control not explicitly stated; communication mode is \"full duplex\""
- "no separate variable table in source."
- "source describes no unsolicited push/notification events. All data is"
- "source documents no named multi-step command sequences."
- "default baud rate among supported set (115200/38400/19200/9600/4800) not designated in source."
- "flow-control mode (none/hardware/software) not explicitly stated; only \"full duplex\" communication mode stated."
- "ID1 control ID and ID2 model code values are per-unit/per-model and not fixed in source (examples use 00h/00h)."
- "Appendix 'Supplementary Information by Command' (input terminal codes, aspect values, eco mode values, sub input values, base model types) not included in the provided source text."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
