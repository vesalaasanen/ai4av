---
spec_id: admin/sharp-nec-c751q-mpi
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC C751Q Mpi Control Spec"
manufacturer: Sharp/NEC
model_family: "C751Q Mpi"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "C751Q Mpi"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:24:51.263Z
last_checked_at: 2026-06-17T19:37:23.612Z
generated_at: 2026-06-17T19:37:23.612Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device class (projector vs large-format display) ambiguous — manual titled \"Projector\" but model C751Q is a commercial display; command set is shared. Firmware version compatibility not stated. Input-terminal value appendix not included in refined source."
  - "not listed in comm conditions table; RTS/CTS pins are cross-wired in the D-SUB 9P connector"
  - "full aspect enum not in refined source."
  - "source describes only request/response; no push/event mechanism stated."
  - "populate if source contains explicit macro sequences."
  - "firmware version compatibility not stated in source."
  - "Appendix \"Supplementary Information by Command\" (input terminal codes, aspect values, eco mode values, sub-input values, base model types) not present in refined source — several enum payloads reference it."
  - "default baud rate among the five supported rates not stated."
  - "flow_control mode not stated in the serial communication conditions table."
  - "wireless LAN unit details deferred to separate operation manual."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:37:23.612Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions verified against source; each command matched verbatim; all transport parameters confirmed; one-to-one coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC C751Q Mpi Control Spec

## Summary
Sharp/NEC large-format display / projector controllable via RS-232C serial and wired/wireless LAN (TCP). This spec covers the binary hex command protocol documented in the "Projector Control Command Reference Manual" (BDT140013 Rev 7.1): power, input switching, mute, picture/volume/aspect adjust, lens control & memory, shutter, freeze, eco mode, edge blending, PIP/PbP, and a broad set of status queries. Commands are framed binary byte sequences with a trailing checksum.

<!-- UNRESOLVED: device class (projector vs large-format display) ambiguous — manual titled "Projector" but model C751Q is a commercial display; command set is shared. Firmware version compatibility not stated. Input-terminal value appendix not included in refined source. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # TCP port for command send/receive over LAN (stated verbatim)
serial:
  baud_rate: [4800, 9600, 19200, 38400, 115200]  # all supported per source; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: not listed in comm conditions table; RTS/CTS pins are cross-wired in the D-SUB 9P connector
auth:
  type: none  # inferred: no auth/login procedure described in source
```

## Traits
```yaml
traits:
  - powerable   # inferred: POWER ON / POWER OFF commands present
  - queryable   # inferred: many status-request commands returning values
  - levelable   # inferred: volume, brightness, contrast, lens position adjustment present
```

## Actions
```yaml
# Frame: hex byte sequence, trailing <CKS> = low-order byte of sum of all preceding bytes.
# Parameterized bytes shown verbatim as <DATA01>..<DATA??> and <CKS> per source notation.
# ID1 = control ID set on projector; ID2 = model code. Both carried in response frames only.

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
  notes: While powering on, no other command can be accepted.

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: During power-off (incl. cooling time), no other command can be accepted.

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal code (e.g. 06h = video port). Full value list in Appendix 'Supplementary Information by Command' - not in refined source."

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
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: DATA02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value - full list in Appendix 'Supplementary Information by Command' (not in refined source)."

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte (96h = LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA02
      type: integer
      description: "Adjustment target low byte (FFh with DATA01=96h)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits)

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
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: integer
      description: Key code high byte (00h for all listed codes)

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
      type: integer
      description: "Adjustment target (e.g. 06h=Periphery Focus)"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus"

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Adjustment target (same targets as 053 LENS CONTROL)

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target (FFh=Stop; when Stop, DATA02-04 not referenced)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute value, 02h=relative value"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET (acts on profile set via 053-10)"

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

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
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

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
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

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
    - name: DATA01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

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
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
    - name: DATA01
      type: integer
      description: "Eco mode value - full list in Appendix 'Supplementary Information by Command' (not in refined source). Sets 'Light mode' or 'Lamp mode' depending on model."

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
  params:
    - name: DATA01-16
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value - MODE: 00h=PIP,01h=PbP; START POSITION: 00h=TOP-LEFT,01h=TOP-RIGHT,02h=BOTTOM-LEFT,03h=BOTTOM-RIGHT; sub-input values per Appendix."

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

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
    - name: DATA01
      type: integer
      description: "Input terminal - values per Appendix 'Supplementary Information by Command' (not in refined source)."
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Response frame prefix indicates result: 20h/21h/22h/23h = success (with optional DATA),
# A0h/A1h/A2h/A3h = error (carries <ERR1> <ERR2>). ERR1/ERR2 codes per error table in Notes.

- id: error_status
  type: bitmask
  description: "12-byte error bitmap (009 response). Bit=1 indicates error. DATA01-12 cover cover/fan/temp/power/lamp/formatter/interlock/system errors."

- id: power_state
  type: enum
  values: [standby, power_on]
  description: "078-2 DATA03: 00h=Standby, 01h=Power on (FFh=not supported)."

- id: cooling_process
  type: enum
  values: [not_executed, during_execution]
  description: "078-2 DATA04: 00h=Not executed, 01h=During execution."

- id: power_on_off_process
  type: enum
  values: [not_executed, during_execution]
  description: "078-2 DATA05: 00h=Not executed, 01h=During execution."

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "078-2 DATA06: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby."

- id: lamp_usage_time
  type: integer
  unit: seconds
  description: "037 DATA83-86 / 037-4 DATA03-06. Updated at 1-minute intervals."

- id: lamp_remaining_life
  type: integer
  unit: percent
  description: "037-4 (DATA02=04h) DATA03-06. Negative if replacement deadline exceeded."

- id: filter_usage_time
  type: integer
  unit: seconds
  description: "037-3 DATA01-04. -1 if undefined."

- id: filter_alarm_start_time
  type: integer
  unit: seconds
  description: "037-3 DATA05-08. -1 if undefined."

- id: carbon_savings
  type: object
  description: "037-6: DATA02-05 = kilograms (max 99999), DATA06-09 = milligrams (max 999999)."

- id: input_status
  type: object
  description: "078-3: signal switch process, signal list number (returned value is practical-1), selection signal type 1/2, signal list type, test pattern display, content displayed."

- id: mute_status
  type: object
  description: "078-4: DATA01=picture mute, DATA02=sound mute, DATA03=onscreen mute, DATA04=forced onscreen mute, DATA05=onscreen display (each 00h=Off, 01h=On)."

- id: model_name
  type: string
  description: "078-5 DATA01-32, NUL-terminated."

- id: cover_status
  type: enum
  values: [normal_opened, closed]
  description: "078-6 DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: freeze_status
  type: enum
  values: [off, on]
  description: "305-3 DATA09: 00h=Off, 01h=On."

- id: sync_frequency
  type: object
  description: "084: horizontal (DATA01=03h) / vertical (DATA01=04h) synchronous frequency strings."

- id: eco_mode
  type: integer
  description: "097-8 DATA01 - value list per Appendix (returns 'Light mode' or 'Lamp mode' depending on model)."

- id: projector_name
  type: string
  description: "097-45 DATA01-17, NUL-terminated."

- id: mac_address
  type: string
  description: "097-155 DATA01-06 (6 bytes)."

- id: pip_pbp_status
  type: object
  description: "097-198: mode (PIP/PbP), start position, sub inputs 1/2/3."

- id: edge_blending_mode
  type: enum
  values: [off, on]
  description: "097-243-1 DATA01: 00h=OFF, 01h=ON."

- id: lens_information
  type: bitmask
  description: "053-7 DATA01: bit0=lens memory, bit1=zoom, bit2=focus, bit3=lens shift H, bit4=lens shift V (0=Stop, 1=During operation)."

- id: lens_position
  type: object
  description: "053-1: upper/lower limits + current value for requested target."

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  description: "053-11 DATA01: 00h=Profile 1, 01h=Profile 2."

- id: lens_memory_option
  type: object
  description: "053-5: LOAD BY SIGNAL / FORCED MUTE setting (OFF/ON)."

- id: gain_parameter
  type: object
  description: "060-1: status, upper/lower limits, default, current value, wide/narrow adjustment width, default validity."

- id: setting_info
  type: object
  description: "078-1: base model type, sound function availability, profile/timer function."

- id: base_model_type
  type: object
  description: "305-1: base model type + model name string."

- id: serial_number
  type: string
  description: "305-2 DATA01-16, NUL-terminated."

- id: basic_information
  type: object
  description: "305-3: operation status, content displayed, selection signal type, display signal type, video/sound/onscreen mute, freeze."
```

## Variables
```yaml
- id: volume
  description: Sound volume (030-2 VOLUME ADJUST).
  unit: level

- id: brightness
  description: Picture brightness (030-1 DATA01=00h).

- id: contrast
  description: Picture contrast (030-1 DATA01=01h).

- id: color
  description: Picture color (030-1 DATA01=02h).

- id: hue
  description: Picture hue (030-1 DATA01=03h).

- id: sharpness
  description: Picture sharpness (030-1 DATA01=04h).

- id: lamp_light_adjust
  description: Lamp/Light adjust level (030-15 / 060-1 DATA01=96h).

- id: lens_position
  description: Lens position (focus/zoom/shift) per target (053 / 053-2).

- id: eco_mode
  description: Eco / Light / Lamp mode (098-8).

- id: edge_blending
  description: Edge blending on/off (098-243-1).

- id: pip_pbp_mode
  description: PIP / Picture-by-Picture mode + start position + sub inputs (098-198).

- id: projector_name
  description: LAN projector name, up to 16 bytes (098-45).

- id: lens_profile
  description: Reference lens memory profile (053-10).

- id: lens_memory_load_by_signal
  description: Lens memory LOAD BY SIGNAL on/off (053-6).

- id: lens_memory_forced_mute
  description: Lens memory FORCED MUTE on/off (053-6).

- id: audio_select
  description: Audio select per input terminal (319-10).

- id: aspect
  description: Aspect ratio value (030-12) - value list per Appendix.
  # UNRESOLVED: full aspect enum not in refined source.
```

## Events
```yaml
# No unsolicited notifications documented in source.
# UNRESOLVED: source describes only request/response; no push/event mechanism stated.
```

## Macros
```yaml
# No multi-step sequences explicitly documented in source.
# UNRESOLVED: populate if source contains explicit macro sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source: during power-off (incl. cooling time) no other command accepted
  - power_on   # source: while powering on no other command accepted
interlocks:
  - "Interlock switch: 009 ERROR STATUS DATA09 bit1 = 'interlock switch is open' (safety-related)."
  - "Cover status: 078-6 reports mirror/lens cover open/closed."
  - "Lens not installed properly: 009 ERROR STATUS DATA04 bit7."
  - "Temperature errors: 009 ERROR STATUS DATA01 bit1/bit2 (bi-metallic strip / sensor) and DATA04 bit2 (dust)."
# Source contains error/interlock status reporting only; no explicit power-on sequencing
# procedure or safety confirmation workflow is documented.
```

## Notes
- Manual: "Projector Control Command Reference Manual", document BDT140013 Revision 7.1. Shared across Sharp/NEC projector/display models; applied here to C751Q Mpi.
- Command framing: all commands are binary hex byte sequences. Frames begin with a command-class lead byte (00h–03h for requests, 20h–23h for success responses, A0h–A3h for error responses). `<ID1>` = control ID set on the projector; `<ID2>` = model code. These appear in responses, not in the request payloads listed above.
- Checksum `<CKS>`: low-order one byte (8 bits) of the sum of all preceding bytes. Example from source: `20h+81h+01h+60h+01h+00h = 103h` → checksum `03h`.
- Error responses carry `<ERR1> <ERR2>`. Key codes: `00h 00h`=unrecognized command; `00h 01h`=not supported by model; `01h 00h`=invalid value; `01h 01h`=invalid input terminal; `02h 0Dh`=command rejected because power is off; `02h 0Eh`=execution failed; `02h 0Fh`=no authority; `03h 00h`=incorrect gain number; `03h 02h`=adjustment failed. (Full 25-row table in source.)
- Serial connector: D-SUB 9P, cross cable. Pin 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS (RTS↔CTS cross-connected). LAN: RJ-45, 10/100 Mbps auto-sensing, TCP port 7142.
- Timing: lamp/filter usage times are returned in 1-second units but updated at 1-minute intervals.
- Two-lamp models: lamp 2 selectors (DATA01=01h) effective only on two-lamp projector models.
- Parameterized commands use `<DATA01>..<DATA??>` and `<CKS>` placeholders exactly as written in the source.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input terminal codes, aspect values, eco mode values, sub-input values, base model types) not present in refined source — several enum payloads reference it. -->
<!-- UNRESOLVED: default baud rate among the five supported rates not stated. -->
<!-- UNRESOLVED: flow_control mode not stated in the serial communication conditions table. -->
<!-- UNRESOLVED: wireless LAN unit details deferred to separate operation manual. -->
```

Spec done. 53 actions, all verbatim payloads. Both serial+TCP populated (port 7142 stated). Baud as 5-value list (no default stated). Appendix-driven enums flagged UNRESOLVED.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:24:51.263Z
last_checked_at: 2026-06-17T19:37:23.612Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:37:23.612Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions verified against source; each command matched verbatim; all transport parameters confirmed; one-to-one coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device class (projector vs large-format display) ambiguous — manual titled \"Projector\" but model C751Q is a commercial display; command set is shared. Firmware version compatibility not stated. Input-terminal value appendix not included in refined source."
- "not listed in comm conditions table; RTS/CTS pins are cross-wired in the D-SUB 9P connector"
- "full aspect enum not in refined source."
- "source describes only request/response; no push/event mechanism stated."
- "populate if source contains explicit macro sequences."
- "firmware version compatibility not stated in source."
- "Appendix \"Supplementary Information by Command\" (input terminal codes, aspect values, eco mode values, sub-input values, base model types) not present in refined source — several enum payloads reference it."
- "default baud rate among the five supported rates not stated."
- "flow_control mode not stated in the serial communication conditions table."
- "wireless LAN unit details deferred to separate operation manual."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
