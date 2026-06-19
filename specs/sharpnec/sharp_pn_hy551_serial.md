---
spec_id: admin/sharp-nec-pn-hy551
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Pn Hy551 Control Spec"
manufacturer: Sharp/NEC
model_family: "Pn Hy551"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Pn Hy551"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:29:49.796Z
last_checked_at: 2026-06-18T09:08:16.271Z
generated_at: 2026-06-18T09:08:16.271Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input-terminal value table, aspect value table, eco-mode value table, sub-input setting values, base-model-type value table, and key-code→input mappings are referenced as \"see Appendix 'Supplementary Information by Command'\" which is not in the source text."
  - "source states \"Full duplex\" communication mode but does not specify flow control method"
  - "not in source).\""
  - "full target table not enumerated in this command's section.\""
  - "not enumerated in this command's section.\""
  - "source does not document push/event behaviour; none populated."
  - "none populated."
  - "source describes no explicit safety interlock procedures, power-on sequencing requirements, or voltage/current protection thresholds. Only operational command-acceptance interlocks noted above."
  - "Appendix \"Supplementary Information by Command\" is referenced throughout (input terminal codes, aspect values, eco-mode values, sub-input settings, base-model-type codes, display signal types) but is NOT present in the source text. These value tables must be supplied before the spec is verifiable end-to-end."
  - "ID1 control ID default value and ID2 model code value for Pn Hy551 not stated in source."
  - "serial flow-control method (RTS/CTS, XON/XOFF) not stated; pinout exposes RTS/CTS lines but the spec only says \"Full duplex\"."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:08:16.271Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Pn Hy551 Control Spec

## Summary
The Sharp/NEC Pn Hy551 is a projector controllable via RS-232C serial (PC CONTROL D-SUB 9P) and TCP/IP LAN (wired RJ-45 or wireless). This spec covers the binary command protocol described in BDT140013 Revision 7.1, including power, input, mute, lens, picture, eco, edge-blending, PIP, and status-query commands. Commands are framed with ID1 (control ID), ID2 (model code), a checksum byte, and command-type prefixes that mirror in the response (success: command byte + 20h; error: command byte + A0h).

<!-- UNRESOLVED: input-terminal value table, aspect value table, eco-mode value table, sub-input setting values, base-model-type value table, and key-code→input mappings are referenced as "see Appendix 'Supplementary Information by Command'" which is not in the source text. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists 115200/38400/19200/9600/4800 bps as selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode but does not specify flow control method
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred from POWER ON / POWER OFF commands
  - queryable       # inferred from many status query commands
  - levelable       # inferred from VOLUME / PICTURE / LAMP ADJUST commands
  - routable        # inferred from INPUT SW CHANGE / AUDIO SELECT SET commands
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
  notes: While turning on power, no other command accepted.

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: While turning off (incl. cooling time), no other command accepted.

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal code. Example: 06h = video port. Full value table is in the Appendix 'Supplementary Information by Command' (UNRESOLVED: not in source)."

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
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Value set for the aspect. Full value table is in the Appendix 'Supplementary Information by Command' (UNRESOLVED: not in source)."

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target low byte. Source documents DATA01=96h paired with DATA02=FFh for LAMP ADJUST / LIGHT ADJUST."
    - name: DATA02
      type: integer
      description: "Adjustment target high byte (FFh for LAMP/LIGHT ADJUST)."
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
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
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2 (Lamp 2 effective only on two-lamp models)"
    - name: DATA02
      type: integer
      description: "Content: 01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte. Documented values: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: integer
      description: "Key code high byte (WORD type); all documented codes have DATA02=00h"

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
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Lens function. Source explicitly documents 06h=Periphery Focus. Other lens-function codes referenced by LENS CONTROL REQUEST; UNRESOLVED: full target table not enumerated in this command's section."
    - name: DATA02
      type: integer
      description: "Content/drive: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Lens adjustment target code (returned value carries upper/lower/current bounds)

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Target. FFh=Stop (mode/value ignored). Other target codes UNRESOLVED: not enumerated in this command's section."
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET. Operates on profile selected via 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
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
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
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
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"

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
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h=Freeze ON, 02h=Freeze OFF"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
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
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Value set for the eco mode (Light mode or Lamp mode depending on projector). Full value table is in the Appendix 'Supplementary Information by Command' (UNRESOLVED: not in source)."

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01..DATA16} 00h {CKS}"
  params:
    - name: DATA01_DATA16
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)"

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value. For MODE: 00h=PIP, 01h=PICTURE BY PICTURE. For START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. For SUB INPUT values, see Appendix (UNRESOLVED: not in source)."

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
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
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal. Full value table in the Appendix 'Supplementary Information by Command' (UNRESOLVED: not in source)."
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  type: bitmask
  description: "12-byte error status from 009. ERROR STATUS REQUEST. DATA01-04 cover cover/fan/temp/power/lamp errors; DATA09 holds extended status (portrait cover orientation, interlock switch open, slave-CPU / formatter system errors)."

- id: power_state
  type: enum
  values: [standby, power_on]
  description: "From 078-2 RUNNING STATUS REQUEST DATA03: 00h=Standby, 01h=Power on, FFh=Not supported."

- id: cooling_process
  type: enum
  values: [not_executed, during_execution]
  description: "078-2 DATA04."

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "078-2 DATA06: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby."

- id: picture_mute_state
  type: enum
  values: [off, on]
  description: "078-4 MUTE STATUS REQUEST DATA01."

- id: sound_mute_state
  type: enum
  values: [off, on]
  description: "078-4 DATA02."

- id: onscreen_mute_state
  type: enum
  values: [off, on]
  description: "078-4 DATA03."

- id: cover_status
  type: enum
  values: [normal_open, closed]
  description: "078-6 COVER STATUS REQUEST DATA01: 00h=Normal (cover opened), 01h=Cover closed."

- id: lamp_usage_time
  type: integer
  unit: seconds
  description: "From 037 INFORMATION REQUEST DATA83-86 or 037-4 LAMP INFORMATION REQUEST 3. Updated at one-minute intervals."

- id: filter_usage_time
  type: integer
  unit: seconds
  description: "From 037-3 FILTER USAGE INFORMATION REQUEST DATA01-04. Returns -1 if undefined."

- id: lamp_remaining_life
  type: integer
  unit: percent
  description: "From 037-4 with DATA02=04h. Negative if replacement deadline exceeded."

- id: lens_information
  type: bitmask
  description: "053-7 LENS INFORMATION REQUEST DATA01. Bits: 0=Lens memory, 1=Zoom, 2=Focus, 3=Lens Shift(H), 4=Lens Shift(V). 0=Stop, 1=During operation."

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  description: "053-11 LENS PROFILE REQUEST DATA01."

- id: projector_name
  type: string
  description: "From 037 DATA01-49 (NUL-terminated) or 097-45 LAN PROJECTOR NAME REQUEST."

- id: mac_address
  type: string
  description: "6-byte MAC from 097-155 LAN MAC ADDRESS STATUS REQUEST2."

- id: model_name
  type: string
  description: "From 078-5 MODEL NAME REQUEST DATA01-32."

- id: serial_number
  type: string
  description: "From 305-2 SERIAL NUMBER REQUEST DATA01-16."

- id: eco_mode
  type: raw
  description: "097-8 ECO MODE REQUEST DATA01. Value table in Appendix (UNRESOLVED: not in source)."

- id: edge_blending_mode
  type: enum
  values: [off, on]
  description: "097-243-1 EDGE BLENDING MODE REQUEST DATA01."

- id: horizontal_sync_frequency
  type: string
  description: "084 INFORMATION STRING REQUEST with DATA01=03h."

- id: vertical_sync_frequency
  type: string
  description: "084 INFORMATION STRING REQUEST with DATA01=04h."
```

## Variables
```yaml
- id: brightness
  description: "PICTURE/BRIGHTNESS; queried via 060-1 GAIN PARAMETER REQUEST 3 with DATA01=00h; set via 030-1 PICTURE ADJUST."
- id: contrast
  description: "PICTURE/CONTRAST; 060-1 DATA01=01h; set via 030-1."
- id: color
  description: "PICTURE/COLOR; 060-1 DATA01=02h; set via 030-1."
- id: hue
  description: "PICTURE/HUE; 060-1 DATA01=03h; set via 030-1."
- id: sharpness
  description: "PICTURE/SHARPNESS; 060-1 DATA01=04h; set via 030-1."
- id: volume
  description: "VOLUME; 060-1 DATA01=05h; set via 030-2 VOLUME ADJUST."
- id: lamp_adjust
  description: "LAMP ADJUST / LIGHT ADJUST; 060-1 DATA01=96h; set via 030-15 OTHER ADJUST (DATA01=96h, DATA02=FFh)."
```

## Events
```yaml
# Source describes no unsolicited notifications. All responses are solicited by commands.
# UNRESOLVED: source does not document push/event behaviour; none populated.
```

## Macros
```yaml
# Source describes no multi-step command sequences.
# UNRESOLVED: none populated.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: "While turning on power, no other command accepted."
  - command: power_off
    note: "While turning off power (including cooling time), no other command accepted."
  - command: lens_control
    note: "After sending 7Fh/81h continuous drive, must send 00h to stop lens."
# UNRESOLVED: source describes no explicit safety interlock procedures, power-on sequencing requirements, or voltage/current protection thresholds. Only operational command-acceptance interlocks noted above.
```

## Notes
- Binary framing: every command/response is hex. Common parameters ID1 (control ID, projector-set), ID2 (model code, varies by model), CKS (checksum = low byte of sum of all preceding bytes), LEN (data length of trailing DATA?? bytes).
- Response convention: success response echoes the command-type byte (00h/01h/02h/03h) plus 20h → 20h/21h/22h/23h. Error response uses the command-type byte plus A0h → A0h/A1h/A2h/A3h, with ERR1/ERR2 codes per the error-code list (00h/00h=unrecognized, 00h/01h=not supported by model, 01h/00h=invalid value, 02h/0Dh=power off, 02h/0Fh=no authority, etc.).
- Usage-time fields (lamp, filter) update at one-minute intervals despite being readable in one-second units.
- Picture/sound/onscreen mute auto-clear on input-terminal switch or video-signal switch; sound mute also clears on volume adjustment.
- LENS CONTROL REQUEST returns target-specific upper/lower/current bounds; LENS CONTROL 2 supports FFh "Stop" without referencing mode/value.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" is referenced throughout (input terminal codes, aspect values, eco-mode values, sub-input settings, base-model-type codes, display signal types) but is NOT present in the source text. These value tables must be supplied before the spec is verifiable end-to-end. -->
<!-- UNRESOLVED: ID1 control ID default value and ID2 model code value for Pn Hy551 not stated in source. -->
<!-- UNRESOLVED: serial flow-control method (RTS/CTS, XON/XOFF) not stated; pinout exposes RTS/CTS lines but the spec only says "Full duplex". -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:29:49.796Z
last_checked_at: 2026-06-18T09:08:16.271Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:08:16.271Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input-terminal value table, aspect value table, eco-mode value table, sub-input setting values, base-model-type value table, and key-code→input mappings are referenced as \"see Appendix 'Supplementary Information by Command'\" which is not in the source text."
- "source states \"Full duplex\" communication mode but does not specify flow control method"
- "not in source).\""
- "full target table not enumerated in this command's section.\""
- "not enumerated in this command's section.\""
- "source does not document push/event behaviour; none populated."
- "none populated."
- "source describes no explicit safety interlock procedures, power-on sequencing requirements, or voltage/current protection thresholds. Only operational command-acceptance interlocks noted above."
- "Appendix \"Supplementary Information by Command\" is referenced throughout (input terminal codes, aspect values, eco-mode values, sub-input settings, base-model-type codes, display signal types) but is NOT present in the source text. These value tables must be supplied before the spec is verifiable end-to-end."
- "ID1 control ID default value and ID2 model code value for Pn Hy551 not stated in source."
- "serial flow-control method (RTS/CTS, XON/XOFF) not stated; pinout exposes RTS/CTS lines but the spec only says \"Full duplex\"."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
