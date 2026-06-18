---
spec_id: admin/sharpnec-c651q-avt2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC C651Q Avt2 Control Spec"
manufacturer: Sharp/NEC
model_family: "C651Q Avt2"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "C651Q Avt2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:26:35.708Z
last_checked_at: 2026-06-17T19:34:38.014Z
generated_at: 2026-06-17T19:34:38.014Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic projector command reference (lens, lamp, shutter, filter commands) whose model-specific applicability to the C651Q Avt2 display is not confirmed in the document. Model code (ID2) and command support per model live in an \"Appendix / Supplementary Information by Command\" not included in the source text."
  - "flow control not stated in source (RTS/CTS pins present but setting not documented)"
  - "source does not describe any push/event mechanism."
  - "no macros documented."
  - "source contains no explicit safety warnings or power-on sequencing procedures"
  - "model-specific command applicability and ID2 model code for C651Q Avt2 not in source text."
  - "serial flow_control setting not stated."
  - "input terminal / aspect / eco mode / sub input enum value lists not in provided source (in Appendix)."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:34:38.014Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions verified against source with exact hex-command matches and transport parameters confirmed. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC C651Q Avt2 Control Spec

## Summary
Sharp/NEC display controlled via the vendor "Projector Control Command Reference Manual" (BDT140013 Revision 7.1), a binary hex-frame protocol carried over RS-232C serial and/or TCP LAN (port 7142). The spec enumerates all 53 documented commands: power, input switching, mute, picture/volume/aspect/lamp adjust, lens control and memory, shutter, freeze, status/information queries, eco mode, PIP/PbyP, edge blending, and audio select.

<!-- UNRESOLVED: source is a generic projector command reference (lens, lamp, shutter, filter commands) whose model-specific applicability to the C651Q Avt2 display is not confirmed in the document. Model code (ID2) and command support per model live in an "Appendix / Supplementary Information by Command" not included in the source text. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists supported rates 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (RTS/CTS pins present but setting not documented)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable  # inferred from POWER ON/OFF commands (015/016)
  - queryable  # inferred from numerous status/information request commands
  - routable  # inferred from INPUT SW CHANGE (018) and AUDIO SELECT SET (319-10)
  - levelable  # inferred from PICTURE ADJUST / VOLUME ADJUST / OTHER ADJUST (030-*)
```

## Actions
```yaml
# Frame format (from source §2.1): <HEADER> <CMD> <ID1> <ID2> <LEN> <DATA...> <CKS>
# ID1 = control ID, ID2 = model code (varies by model). Commands shown with ID1=00h ID2=00h.
# CKS = checksum: low-order byte of sum of all preceding bytes (source §2.2).
# Fixed (no-parameter) commands below carry the literal checksum byte verbatim.

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
  notes: "While turning on, no other command accepted."

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "While turning off (incl. cooling time), no other command accepted."

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal byte (e.g. 06h = video port). Full value list in source Appendix 'Supplementary Information by Command'."
  notes: "Example (video port): 02h 03h 00h 00h 02h 01h 06h 0Eh. Response DATA01=FFh means ended with error (no signal switch)."

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
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example (brightness=10): 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data03
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "Example (volume=10): 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Aspect value. Full value list in source Appendix 'Supplementary Information by Command'."

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment target: 96h = LAMP ADJUST / LIGHT ADJUST"
    - name: data02
      type: integer
      description: "FFh (for LAMP/LIGHT ADJUST)"
    - name: data03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: data04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

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
  notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds. -1 if undefined."

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: data02
      type: integer
      description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
  notes: "Example (lamp1 usage): 03h 96h 00h 00h 02h 00h 01h 9Ch. Negative remaining life if replacement deadline exceeded."

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Key code low byte (WORD). E.g. 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: data02
      type: integer
      description: "Key code high byte (WORD) - 00h for all listed codes"
  notes: "Example (AUTO): 02h 0Fh 00h 00h 02h 05h 00h 18h. Response DATA01=FFh means ended with error."

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
      type: integer
      description: "Target: 06h=Periphery Focus"
    - name: data02
      type: integer
      description: "Drive: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus continuous, 81h=minus continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  notes: "After 7Fh/81h, send 00h to stop. Same command re-issued during drive continues without stop."

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Lens adjustment target (same targets as lens_control)"

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "FFh=Stop"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"
  notes: "If DATA01=FFh (Stop), mode and value not referenced."

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Controls the profile selected by LENS PROFILE SET (053-10)."

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: data02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns lens operation status bitmap (lens memory, zoom, focus, lens shift H/V)."

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
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
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "Example (brightness): 03h 05h 00h 00h 03h 00h 00h 00h 0Bh. Returns adjustment range limits, default, current value."

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/clock functions (DATA05)."

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status (DATA03), cooling/power-on process (DATA04/05), operation status (DATA06)."

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number, selection signal type 1/2, test pattern, content displayed."

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
  notes: "Returns mirror/lens cover status: 00h=normal (opened), 01h=closed."

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: integer
      description: "Information type: 03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns eco mode value (or Light/Lamp mode depending on model). Values in source Appendix."

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
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
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Eco mode value. Full value list in source Appendix 'Supplementary Information by Command'."

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01..data16} 00h {cks}"
  params:
    - name: data01_data16
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)"

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: data02
      type: integer
      description: "Setting value (mode: 00h=PIP/01h=PbyP; start position: 00h=TOP-LEFT..03h=BOTTOM-RIGHT; sub input values in Appendix)"

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
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
  notes: "Returns operation status, content displayed, signal type, video/sound/onscreen mute, freeze status."

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal. Values in source Appendix 'Supplementary Information by Command'."
    - name: data02
      type: integer
      description: "Setting value: 00h=specified terminal, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  type: bitmap
  description: "12-byte error bitmap from 009. ERROR STATUS REQUEST (DATA01-12). Bit=1 indicates error."
  fields:
    - "DATA01 bit0: Cover error; bit3/4: Fan error; bit5: Power error; bit6: Lamp off; bit7: Lamp replacement moratorium"
    - "DATA02 bit0: Lamp usage time exceeded; bit1: Formatter error; bit2: Lamp 2 off; bit7: Refer to extended status"
    - "DATA03 bit1: FPGA error; bit2: Temperature error (sensor); bit5: Mirror cover error"
    - "DATA04 bit0: Lamp 2 not present; bit2: Temperature error (dust); bit3: Foreign matter sensor; bit5: Ballast comm error; bit6: Iris calibration; bit7: Lens not installed"
    - "DATA09 bit1: Interlock switch open; bit2/3: System error"

- id: power_state
  type: enum
  description: "Power status from 078-2 RUNNING STATUS REQUEST DATA03 / 305-3 BASIC INFORMATION REQUEST DATA01"
  values: [standby, power_on]

- id: operation_status
  type: enum
  description: "From 078-2 DATA06 / 305-3 DATA01"
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]

- id: mute_status
  type: composite
  description: "From 078-4 MUTE STATUS REQUEST: picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display"

- id: cover_status
  type: enum
  description: "From 078-6 COVER STATUS REQUEST"
  values: [normal_opened, closed]

- id: lamp_usage_time
  type: integer
  description: "Lamp usage time in seconds from 037-4 LAMP INFORMATION REQUEST 3 (DATA03-06). Updated at 1-minute intervals."

- id: lamp_remaining_life
  type: integer
  description: "Lamp remaining life (%) from 037-4. Negative if replacement deadline exceeded."

- id: filter_usage_time
  type: integer
  description: "Filter usage time in seconds from 037-3 (DATA01-04)."

- id: model_name
  type: string
  description: "From 078-5 MODEL NAME REQUEST"

- id: serial_number
  type: string
  description: "From 305-2 SERIAL NUMBER REQUEST"

- id: mac_address
  type: string
  description: "From 097-155 LAN MAC ADDRESS STATUS REQUEST2 (DATA01-06)"
```

## Variables
```yaml
# Settable parameters exposed as variables (non-discrete):
- id: volume
  type: integer
  description: "Set via 030-2 VOLUME ADJUST; queried via 060-1 GAIN PARAMETER REQUEST 3 (data01=05h)"

- id: brightness
  type: integer
  description: "Set via 030-1 PICTURE ADJUST (data01=00h); queried via 060-1 (data01=00h)"

- id: contrast
  type: integer
  description: "Set via 030-1 (data01=01h); queried via 060-1 (data01=01h)"

- id: color
  type: integer
  description: "Set via 030-1 (data01=02h); queried via 060-1 (data01=02h)"

- id: hue
  type: integer
  description: "Set via 030-1 (data01=03h); queried via 060-1 (data01=03h)"

- id: sharpness
  type: integer
  description: "Set via 030-1 (data01=04h); queried via 060-1 (data01=04h)"

- id: lamp_light_adjust
  type: integer
  description: "Set via 030-15 OTHER ADJUST (data01=96h); queried via 060-1 (data01=96h)"

- id: projector_name
  type: string
  description: "Set via 098-45; queried via 097-45 (up to 16 bytes)"
```

## Events
```yaml
# No unsolicited notifications documented. All responses are solicited (command/response).
# UNRESOLVED: source does not describe any push/event mechanism.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
# UNRESOLVED: no macros documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "During POWER ON execution, no other command can be accepted (source §3.2)."
  - "During POWER OFF execution (including cooling time), no other command can be accepted (source §3.3)."
  - "Error code 02h 0Dh: command cannot be accepted because power is off."
  - "Error code 02h 0Fh: no authority for the operation."
# UNRESOLVED: source contains no explicit safety warnings or power-on sequencing procedures
# beyond the command-acceptance interlocks above.
```

## Notes
- Source document: "Projector Control Command Reference Manual", BDT140013 Revision 7.1 (Sharp/NEC). This is a generic projector command reference; model-specific command support (ID2 model code) is defined in an "Appendix / Supplementary Information by Command" not present in the provided source text.
- Checksum (CKS): low-order byte of the sum of all preceding bytes in the frame (source §2.2). For fixed commands the literal checksum is shown; for parameterized commands `{cks}` must be computed.
- Frame header conventions observed: command frames begin 00h-03h; success responses begin 20h/21h/22h/23h; error responses begin A0h/A1h/A2h/A3h.
- Error responses carry ERR1/ERR2 code pairs (source §2.4 lists 24 combinations, e.g. 00h/00h = command not recognized, 01h/00h = invalid value, 02h/0Eh = execution failed).
- Serial connection uses a cross (null-modem) cable on the PC CONTROL D-SUB 9P port; LAN connection uses RJ-45 (wired) or an optional wireless LAN unit.
- Many enum value lists (input terminal, aspect, eco mode, sub input, base model type) are deferred to the source Appendix which is not included here.

<!-- UNRESOLVED: model-specific command applicability and ID2 model code for C651Q Avt2 not in source text. -->
<!-- UNRESOLVED: serial flow_control setting not stated. -->
<!-- UNRESOLVED: input terminal / aspect / eco mode / sub input enum value lists not in provided source (in Appendix). -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T19:26:35.708Z
last_checked_at: 2026-06-17T19:34:38.014Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:34:38.014Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions verified against source with exact hex-command matches and transport parameters confirmed. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic projector command reference (lens, lamp, shutter, filter commands) whose model-specific applicability to the C651Q Avt2 display is not confirmed in the document. Model code (ID2) and command support per model live in an \"Appendix / Supplementary Information by Command\" not included in the source text."
- "flow control not stated in source (RTS/CTS pins present but setting not documented)"
- "source does not describe any push/event mechanism."
- "no macros documented."
- "source contains no explicit safety warnings or power-on sequencing procedures"
- "model-specific command applicability and ID2 model code for C651Q Avt2 not in source text."
- "serial flow_control setting not stated."
- "input terminal / aspect / eco mode / sub input enum value lists not in provided source (in Appendix)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
