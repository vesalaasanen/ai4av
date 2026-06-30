---
spec_id: admin/sharp-nec-m551-2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC M551 2 Control Spec"
manufacturer: Sharp/NEC
model_family: "M551 2"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "M551 2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:40:57.277Z
last_checked_at: 2026-06-18T08:11:17.933Z
generated_at: 2026-06-18T08:11:17.933Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. The manual is a generic reference covering multiple projector models; exact model-specific command support (e.g. two-lamp vs single-lamp, available input terminals) is not enumerated for M551 2 specifically."
  - "flow control type not stated (RTS/CTS pins wired per pinout, but setting not documented)"
  - "exact range obtained at runtime via 060-1 GAIN PARAMETER REQUEST 3"
  - "values in Appendix \"Supplementary Information by Command\" not included in source excerpt"
  - "no event/notification mechanism described."
  - "populate from source, or remove section if not applicable"
  - "no explicit safety warnings or interlock procedures stated beyond"
  - "firmware version compatibility not stated in source."
  - "exact model-specific support for two-lamp vs single-lamp commands not confirmed for M551 2."
  - "appendix enum values (input terminals, aspect, eco mode, base model types) not available in refined source."
  - "serial flow_control type not documented (RTS/CTS pins wired but setting not stated)."
  - "input terminal value list for 018 INPUT SW CHANGE and 319-10 AUDIO SELECT SET not in source excerpt."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:11:17.933Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC M551 2 Control Spec

## Summary
Control spec for the Sharp/NEC M551 2 projector, derived from the Projector Control Command Reference Manual (BDT140013 Rev 7.1). The device supports RS-232C serial control and TCP/IP LAN control (port 7142) using a binary hex-frame command protocol. The spec covers power, input switching, mute, picture/volume/aspect adjust, lens control, lens memory, shutter, freeze, eco mode, edge blending, PIP/PBP, and numerous status query commands.

<!-- UNRESOLVED: firmware version compatibility not stated in source. The manual is a generic reference covering multiple projector models; exact model-specific command support (e.g. two-lamp vs single-lamp, available input terminals) is not enumerated for M551 2 specifically. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists all five as options
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control type not stated (RTS/CTS pins wired per pinout, but setting not documented)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWER ON / POWER OFF commands
  - queryable    # inferred from numerous status request commands
  - routable     # inferred from INPUT SW CHANGE command
  - levelable    # inferred from VOLUME / PICTURE / LAMP adjust commands
```

## Actions
```yaml
# Binary hex-frame protocol. Commands sent to projector begin with 00h-03h.
# Last byte of every fixed command is the pre-computed checksum (CKS).
# Parameterized commands end with <CKS> (computed at runtime).
# Checksum = low-order byte of sum of all preceding bytes.

# --- Power ---
- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted while power-on is in progress."

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off including cooling time."

# --- Input switching ---
- id: input_switch
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal code (e.g. 06h = video port). See Appendix 'Supplementary Information by Command' for full value list."
  notes: "Example for video port: 02h 03h 00h 00h 02h 01h 06h 0Eh"

# --- Picture mute ---
- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: "Turned off by input terminal switch or video signal switch."

- id: picture_mute_off
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

# --- Sound mute ---
- id: sound_mute_on
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: "Turned off by input switch, video signal switch, or volume adjustment."

- id: sound_mute_off
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

# --- Onscreen mute ---
- id: onscreen_mute_on
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: "Turned off by input terminal switch or video signal switch."

- id: onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

# --- Picture adjust ---
- id: picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: string
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example set brightness to 10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

# --- Volume adjust ---
- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: data02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data03
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example set volume to 10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

# --- Aspect adjust ---
- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Aspect value. See Appendix 'Supplementary Information by Command'."

# --- Other adjust (lamp/light gain) ---
- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: string
      description: "Adjustment target: 96h=LAMP ADJUST / LIGHT ADJUST"
    - name: data02
      type: string
      description: "FFh (fixed per source)"
    - name: data03
      type: string
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

# --- Remote key code ---
- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Key code low byte (see key code list in notes)"
    - name: data02
      type: string
      description: "Key code high byte (see key code list in notes)"
  notes: |
    Key code list (DATA01 DATA02 = Key name):
    02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU,
    07h 00h=UP, 08h 00h=DOWN, 09h 00h=RIGHT, 0Ah 00h=LEFT, 0Bh 00h=ENTER,
    0Ch 00h=EXIT, 0Dh 00h=HELP, 0Fh 00h=MAGNIFY UP, 10h 00h=MAGNIFY DOWN,
    13h 00h=MUTE, 29h 00h=PICTURE, 4Bh 00h=COMPUTER1, 4Ch 00h=COMPUTER2,
    4Fh 00h=VIDEO1, 51h 00h=S-VIDEO1, 84h 00h=VOLUME UP, 85h 00h=VOLUME DOWN,
    8Ah 00h=FREEZE, A3h 00h=ASPECT, D7h 00h=SOURCE, EEh 00h=LAMP MODE/ECO

# --- Shutter ---
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

# --- Lens control ---
- id: lens_control
  label: "053. LENS CONTROL"
  kind: action
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Lens target: 06h=Periphery Focus"
    - name: data02
      type: string
      description: "00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus (continuous), 81h=drive minus (continuous), FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"
  notes: "After 7Fh or 81h, send 00h to stop."

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: string
      description: "FFh=Stop, otherwise lens target"
    - name: data02
      type: string
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "If DATA01=FFh (Stop), DATA02-DATA04 not referenced."

# --- Lens memory ---
- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Controls profile number specified by 053-10 LENS PROFILE SET."

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: string
      description: "00h=OFF, 01h=ON"

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Profile 1, 01h=Profile 2"

# --- Freeze ---
- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "01h=freeze on, 02h=freeze off"

# --- Eco mode set ---
- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "Eco mode value. See Appendix 'Supplementary Information by Command'."
  notes: "Sets 'Light mode' or 'Lamp mode' depending on projector."

# --- LAN projector name set ---
- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01-16} 00h {cks}"
  params:
    - name: data01_16
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)"

# --- PIP / Picture by Picture set ---
- id: pip_pbp_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: string
      description: "When MODE: 00h=PIP, 01h=PBP. When START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. For SUB INPUT values see Appendix."

# --- Edge blending set ---
- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=OFF, 01h=ON"

# --- Audio select set ---
- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "Input terminal. See Appendix 'Supplementary Information by Command'."
    - name: data02
      type: string
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"

# =====================================================================
# QUERIES (kind: query)
# =====================================================================

- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Returns DATA01-DATA12 error bitfield (bit=1 means error)."

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
  notes: "Returns filter usage time (DATA01-04, seconds) and filter alarm start time (DATA05-08, seconds). -1 if undefined."

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: string
      description: "01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: string
      description: "Lens target (same as LENS CONTROL DATA01)"
  notes: "Returns upper/lower limit and current value (16-bit each)."

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  notes: "Returns DATA01 (option) and DATA02 (00h=OFF, 01h=ON)."

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V) (0=stop, 1=operating)."

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns DATA01: 00h=Profile 1, 01h=Profile 2."

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: string
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"
  notes: "Returns status, upper/lower limits, default, current value, wide/narrow adjustment width."

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/clock function (DATA05)."

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
  notes: "Returns signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern display, content displayed."

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display (each 00h=off, 01h=on)."

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns model name (DATA01-32, NUL-terminated)."

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: string
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
  notes: "Returns label/information string (NUL-terminated)."

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns eco mode value (DATA01). Values in Appendix."

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns projector name (DATA01-17, NUL-terminated)."

- id: lan_mac_address_request
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns MAC address (DATA01-06, 6 bytes)."

- id: pip_pbp_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: string
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  notes: "Returns current setting value for the queried PIP/PBP parameter."

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns DATA01: 00h=OFF, 01h=ON."

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (DATA01-02), model name (DATA03-11), base model type 2 (DATA12-13)."

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns serial number (DATA01-16, NUL-terminated)."

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status."
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, standby_sleep, standby_error, cooling, standby_power_saving, network_standby]
  source: "078-2 RUNNING STATUS REQUEST DATA03 / DATA06; 305-3 BASIC INFORMATION REQUEST DATA01"

- id: error_status
  type: bitfield
  values: [cover_error, temperature_error_bimetallic, fan_error, power_error, lamp_off, lamp_replacement_due, lamp_usage_exceeded, formatter_error, lamp2_off, fpga_error, temperature_error_sensor, lamp_not_present, lamp_data_error, mirror_cover_error, lamp2_replacement_due, lamp2_usage_exceeded, lamp2_not_present, lamp2_data_error, temperature_error_dust, foreign_matter_sensor_error, ballast_comm_error, iris_calibration_error, lens_not_installed, interlock_switch_open, system_error_slave_cpu, system_error_formatter]
  source: "009 ERROR STATUS REQUEST DATA01-DATA12"

- id: mute_status
  type: composite
  values: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute]
  source: "078-4 MUTE STATUS REQUEST"

- id: input_status
  type: composite
  values: [signal_type_1, signal_type_2, signal_list_number, content_displayed, test_pattern]
  source: "078-3 INPUT STATUS REQUEST"

- id: cover_status
  type: enum
  values: [normal_opened, cover_closed]
  source: "078-6 COVER STATUS REQUEST"

- id: lens_operation_status
  type: bitfield
  values: [lens_memory, zoom, focus, lens_shift_h, lens_shift_v]
  source: "053-7 LENS INFORMATION REQUEST"

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: "053-11 LENS PROFILE REQUEST"

- id: eco_mode
  type: string
  source: "097-8 ECO MODE REQUEST"

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: "097-243-1 EDGE BLENDING MODE REQUEST"

- id: execution_result
  type: enum
  values: [success, error]
  source: "Common response DATA01-DATA02 (0000h=success, other=error) for adjust commands"

- id: error_response
  type: composite
  values: [unrecognized_command, unsupported_model, invalid_value, invalid_input_terminal, invalid_language, memory_allocation_error, memory_in_use, value_cannot_be_set, forced_onscreen_mute, viewer_error, no_signal, test_pattern_displayed, no_pc_card, memory_operation_error, entry_list_displayed, power_off, execution_failed, no_authority, incorrect_gain_number, invalid_gain, adjustment_failed]
  source: "Error code list ERR1/ERR2 combinations"
```

## Variables
```yaml
- id: brightness
  type: integer
  range: null  # UNRESOLVED: exact range obtained at runtime via 060-1 GAIN PARAMETER REQUEST 3
  adjustable_via: "030-1 PICTURE ADJUST (DATA01=00h)"

- id: contrast
  type: integer
  range: null  # UNRESOLVED
  adjustable_via: "030-1 PICTURE ADJUST (DATA01=01h)"

- id: color
  type: integer
  range: null  # UNRESOLVED
  adjustable_via: "030-1 PICTURE ADJUST (DATA01=02h)"

- id: hue
  type: integer
  range: null  # UNRESOLVED
  adjustable_via: "030-1 PICTURE ADJUST (DATA01=03h)"

- id: sharpness
  type: integer
  range: null  # UNRESOLVED
  adjustable_via: "030-1 PICTURE ADJUST (DATA01=04h)"

- id: volume
  type: integer
  range: null  # UNRESOLVED
  adjustable_via: "030-2 VOLUME ADJUST"

- id: lamp_light_adjust
  type: integer
  range: null  # UNRESOLVED
  adjustable_via: "030-15 OTHER ADJUST (DATA01=96h)"

- id: aspect
  type: enum
  values: null  # UNRESOLVED: values in Appendix "Supplementary Information by Command" not included in source excerpt
  adjustable_via: "030-12 ASPECT ADJUST"

- id: pip_pbp_mode
  type: enum
  values: [pip, picture_by_picture]
  adjustable_via: "098-198 PIP/PBP SET (DATA01=00h)"

- id: pip_pbp_start_position
  type: enum
  values: [top_left, top_right, bottom_left, bottom_right]
  adjustable_via: "098-198 PIP/PBP SET (DATA01=01h)"
```

## Events
```yaml
# No unsolicited notifications documented in source.
# All responses are solicited (command-response model).
# UNRESOLVED: no event/notification mechanism described.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: "015. POWER ON"
    note: "No other command accepted while power-on is in progress."
  - command: "016. POWER OFF"
    note: "No other command accepted during power-off including cooling time."
# UNRESOLVED: no explicit safety warnings or interlock procedures stated beyond
# the command-acceptance locks above. The error status bitfield includes
# interlock_switch_open and cover_error indicators but no procedural interlock
# sequence is documented.
```

## Notes
- Command protocol uses binary hex frames. Commands sent to projector begin with bytes `00h`–`03h`. Success responses begin with `20h`–`23h`. Error responses begin with `A0h`–`A3h`.
- Every frame ends with a checksum byte (CKS): low-order 8 bits of the sum of all preceding bytes.
- Response frames include `<ID1>` (control ID set on projector) and `<ID2>` (model code) after the second byte. These are echoed back by the projector; the controller does not send them in the command frame.
- Several commands reference an "Appendix: Supplementary Information by Command" for full enum value lists (input terminals, aspect values, eco mode values, sub input values, base model types). These appendix values are not included in the refined source excerpt.
- Lamp usage and filter usage times are returned in seconds; updated at 1-minute intervals.
- If lamp replacement deadline is exceeded, remaining life (%) is returned as a negative value.
- Serial cable must be a cross cable connected to the PC CONTROL port (D-SUB 9P). Pins 2/3 (RxD/TxD) and 7/8 (RTS/CTS) are cross-wired.
- LAN connection uses TCP port 7142 for sending and receiving commands.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: exact model-specific support for two-lamp vs single-lamp commands not confirmed for M551 2. -->
<!-- UNRESOLVED: appendix enum values (input terminals, aspect, eco mode, base model types) not available in refined source. -->
<!-- UNRESOLVED: serial flow_control type not documented (RTS/CTS pins wired but setting not stated). -->
<!-- UNRESOLVED: input terminal value list for 018 INPUT SW CHANGE and 319-10 AUDIO SELECT SET not in source excerpt. -->
```

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T14:40:57.277Z
last_checked_at: 2026-06-18T08:11:17.933Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:11:17.933Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. The manual is a generic reference covering multiple projector models; exact model-specific command support (e.g. two-lamp vs single-lamp, available input terminals) is not enumerated for M551 2 specifically."
- "flow control type not stated (RTS/CTS pins wired per pinout, but setting not documented)"
- "exact range obtained at runtime via 060-1 GAIN PARAMETER REQUEST 3"
- "values in Appendix \"Supplementary Information by Command\" not included in source excerpt"
- "no event/notification mechanism described."
- "populate from source, or remove section if not applicable"
- "no explicit safety warnings or interlock procedures stated beyond"
- "firmware version compatibility not stated in source."
- "exact model-specific support for two-lamp vs single-lamp commands not confirmed for M551 2."
- "appendix enum values (input terminals, aspect, eco mode, base model types) not available in refined source."
- "serial flow_control type not documented (RTS/CTS pins wired but setting not stated)."
- "input terminal value list for 018 INPUT SW CHANGE and 319-10 AUDIO SELECT SET not in source excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
