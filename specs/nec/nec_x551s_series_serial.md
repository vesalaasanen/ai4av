---
spec_id: admin/nec-x551s-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC X551S Series Control Spec"
manufacturer: NEC
model_family: "X551S Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "X551S Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-09-02T16:48:19.793Z
last_checked_at: 2026-09-15T22:18:48.005Z
generated_at: 2026-09-15T22:18:48.005Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The provided refined source is the NEC PA-series projector command manual (BDT140013 Rev 7.1); the device slug requested is X551S Series. Command set is assumed applicable per operator; specific X551S firmware behavior not separately stated."
  - "source does not state flow control; full-duplex is the only statement"
  - "Firmware compatibility ranges not stated. Voltage/current/fault recovery sequences not stated. Specific per-model input terminal values for X551S not stated. Whether X551S supports LAN standby, HDBaseT standby, lamp-2 commands, or two-lamp features is not stated in the supplied source."
verification:
  verdict: verified
  checked_at: 2026-09-15T22:18:48.005Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match hex command literals in source verbatim; transport values (port 7142, baud rates, 8-N-1) confirmed; source command list contains exactly these 53 commands. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# NEC X551S Series Control Spec

## Summary
This spec covers the RS-232C and wired LAN (TCP) external control protocol for NEC X551S Series projectors (PA-series projector command reference). The protocol uses a framed hex byte sequence with checksum, sent over D-SUB 9P serial at 115200/38400/19200/9600/4800 bps, or over TCP port 7142. Commands include power, input switching, picture/sound/onscreen mute, picture/volume/aspect/gain adjust, information requests (lamp/filter/carbon), lens control and memory, freeze, remote key code, shutter, ECO mode, PIP/PBP, edge blending, and audio select.

<!-- UNRESOLVED: The provided refined source is the NEC PA-series projector command manual (BDT140013 Rev 7.1); the device slug requested is X551S Series. Command set is assumed applicable per operator; specific X551S firmware behavior not separately stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source lists 115200/38400/19200/9600/4800 bps; 9600 default per common practice, others selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source does not state flow control; full-duplex is the only statement
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from power on/off command examples (015, 016)
- routable  # inferred from input switch / output mute / PIP routing command examples (018, 020-025, 097-198, 098-198)
- queryable  # inferred from query command examples (037, 078-x, 097-x, 305-x)
- levelable  # inferred from volume / picture gain / lamp adjust examples (030-1, 030-2, 030-15)
```

## Actions
```yaml
- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00 88 00 00 00 88"
  params: []

- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02 00 00 00 00 02"
  params: []

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02 01 00 00 00 03"
  params: []

- id: input_switch_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02 03 00 00 02 01 {DATA01} <CKS>"
  params:
    - name: DATA01
      type: hex
      description: Input terminal code (e.g. 06h = VIDEO; see Appendix "Input terminal values for command 018")

- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02 10 00 00 00 12"
  params: []

- id: picture_mute_off
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02 11 00 00 00 13"
  params: []

- id: sound_mute_on
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02 12 00 00 00 14"
  params: []

- id: sound_mute_off
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02 13 00 00 00 15"
  params: []

- id: onscreen_mute_on
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02 14 00 00 00 16"
  params: []

- id: onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02 15 00 00 00 17"
  params: []

- id: picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03 10 00 00 05 {DATA01} FF {DATA02} {DATA03} {DATA04} <CKS>"
  params:
    - name: DATA01
      type: hex
      description: Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)
    - name: DATA02
      type: hex
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: DATA03
      type: hex
      description: Adjustment value low-order 8 bits
    - name: DATA04
      type: hex
      description: Adjustment value high-order 8 bits

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03 10 00 00 05 05 00 {DATA01} {DATA02} {DATA03} <CKS>"
  params:
    - name: DATA01
      type: hex
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: DATA02
      type: hex
      description: Adjustment value low-order 8 bits
    - name: DATA03
      type: hex
      description: Adjustment value high-order 8 bits

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03 10 00 00 05 18 00 00 {DATA01} 00 <CKS>"
  params:
    - name: DATA01
      type: hex
      description: Aspect mode (00h=AUTO, 01h=WIDE ZOOM, 02h=16:9, 03h=NATIVE, 04h=4:3, 05h=15:9, 06h=16:10, 07h=LETTER BOX/ZOOM, 09h/0Ah=FULL)

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03 10 00 00 05 {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} <CKS>"
  params:
    - name: DATA01
      type: hex
      description: Adjustment target high byte (96h for LAMP ADJUST / LIGHT ADJUST)
    - name: DATA02
      type: hex
      description: Adjustment target low byte (FFh for LAMP ADJUST / LIGHT ADJUST)
    - name: DATA03
      type: hex
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: DATA04
      type: hex
      description: Adjustment value low-order 8 bits
    - name: DATA05
      type: hex
      description: Adjustment value high-order 8 bits

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03 8A 00 00 00 8D"
  params: []

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03 95 00 00 00 98"
  params: []

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03 96 00 00 02 {DATA01} {DATA02} <CKS>"
  params:
    - name: DATA01
      type: hex
      description: Lamp selection (00h=Lamp 1, 01h=Lamp 2)
    - name: DATA02
      type: hex
      description: Content (01h=usage time sec, 04h=remaining life %)

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03 9A 00 00 01 {DATA01} <CKS>"
  params:
    - name: DATA01
      type: hex
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02 0F 00 00 02 {DATA01} {DATA02} <CKS>"
  params:
    - name: DATA01
      type: hex
      description: Key code high byte
    - name: DATA02
      type: hex
      description: Key code low byte (00h for listed keys)

- id: shutter_close
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02 16 00 00 00 18"
  params: []

- id: shutter_open
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02 17 00 00 00 19"
  params: []

- id: lens_control
  label: "053. LENS CONTROL"
  kind: action
  command: "02 18 00 00 02 {DATA01} {DATA02} <CKS>"
  params:
    - name: DATA01
      type: hex
      description: Lens drive axis (06h=Periphery Focus)
    - name: DATA02
      type: hex
      description: Drive command (00h=Stop, 01h/02h/03h=timed plus, 7Fh=plus, 81h=minus, FDh/FEh/FFh=timed minus)

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02 1C 00 00 02 {DATA01} 00 <CKS>"
  params:
    - name: DATA01
      type: hex
      description: Lens axis identifier

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02 1D 00 00 04 {DATA01} {DATA02} {DATA03} {DATA04} <CKS>"
  params:
    - name: DATA01
      type: hex
      description: Action (FFh=Stop; otherwise absolute/relative per DATA02)
    - name: DATA02
      type: hex
      description: Adjustment mode (00h=absolute, 02h=relative)
    - name: DATA03
      type: hex
      description: Adjustment value low-order 8 bits
    - name: DATA04
      type: hex
      description: Adjustment value high-order 8 bits

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02 1E 00 00 01 {DATA01} <CKS>"
  params:
    - name: DATA01
      type: hex
      description: "Action (00h=MOVE, 01h=STORE, 02h=RESET)"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02 1F 00 00 01 {DATA01} <CKS>"
  params:
    - name: DATA01
      type: hex
      description: "Action (00h=MOVE, 01h=STORE, 02h=RESET)"

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02 20 00 00 01 {DATA01} <CKS>"
  params:
    - name: DATA01
      type: hex
      description: "Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)"

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02 21 00 00 02 {DATA01} {DATA02} <CKS>"
  params:
    - name: DATA01
      type: hex
      description: "Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)"
    - name: DATA02
      type: hex
      description: "Setting value (00h=OFF, 01h=ON)"

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02 22 00 00 01 00 25"
  params: []

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02 27 00 00 01 {DATA01} <CKS>"
  params:
    - name: DATA01
      type: hex
      description: "Profile number (00h=Profile 1, 01h=Profile 2)"

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02 28 00 00 00 2A"
  params: []

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03 05 00 00 03 {DATA01} 00 00 <CKS>"
  params:
    - name: DATA01
      type: hex
      description: "Adjusted value name (00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST)"

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00 85 00 00 01 00 86"
  params: []

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00 85 00 00 01 01 87"
  params: []

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00 85 00 00 01 02 88"
  params: []

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00 85 00 00 01 03 89"
  params: []

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00 85 00 00 01 04 8A"
  params: []

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00 85 00 00 01 05 8B"
  params: []

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01 98 00 00 01 {DATA01} <CKS>"
  params:
    - name: DATA01
      type: hex
      description: "01h=Freeze on, 02h=Freeze off"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00 D0 00 00 03 00 {DATA01} 01 <CKS>"
  params:
    - name: DATA01
      type: hex
      description: "Information type (03h=Horizontal sync frequency, 04h=Vertical sync frequency)"

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03 B0 00 00 01 07 BB"
  params: []

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03 B0 00 00 01 2C E0"
  params: []

- id: lan_mac_address_status_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03 B0 00 00 02 9A 00 4F"
  params: []

- id: pip_pbp_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03 B0 00 00 02 C5 {DATA01} <CKS>"
  params:
    - name: DATA01
      type: hex
      description: "Field (00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)"

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03 B0 00 00 02 DF 00 94"
  params: []

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03 B1 00 00 02 07 {DATA01} <CKS>"
  params:
    - name: DATA01
      type: hex
      description: Eco mode value (00h=OFF/Normal, 01h=AUTO ECO/ON, 02h=ECO1, 03h=ECO2, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT)

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03 B1 00 00 12 2C {DATA01-DATA16} 00 <CKS>"
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_pbp_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03 B1 00 00 03 C5 {DATA01} {DATA02} <CKS>"
  params:
    - name: DATA01
      type: hex
      description: "Field (00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)"
    - name: DATA02
      type: hex
      description: "Setting value (depends on DATA01; e.g. for MODE: 00h=PIP, 01h=PICTURE BY PICTURE)"

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03 B1 00 00 03 DF 00 {DATA01} <CKS>"
  params:
    - name: DATA01
      type: hex
      description: "Setting value (00h=OFF, 01h=ON)"

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00 BF 00 00 01 00 C0"
  params: []

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00 BF 00 00 02 01 06 C8"
  params: []

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00 BF 00 00 01 02 C2"
  params: []

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03 C9 00 00 03 09 {DATA01} {DATA02} <CKS>"
  params:
    - name: DATA01
      type: hex
      description: Input terminal
    - name: DATA02
      type: hex
      description: "Audio select value (00h=HDMI1, 01h=HDMI2, 02h=DisplayPort, 03h=HDBaseT/LAN, 04h=USB-A, 05h=USB-B)"
```

## Feedbacks
```yaml
- id: error_status_bits
  type: bytes
  description: "12 bytes DATA01-DATA12 returned from ERROR STATUS REQUEST; each bit indicates a specific fault (cover, fan, lamp, temperature, formatter, etc.). 0=normal, 1=error."
- id: power_state
  type: enum
  values: [on, off, cooling, standby_sleep, standby_power_saving, standby_error, network_standby, not_supported]
  description: Operation status from 078-2 / 305-3 (DATA06 / DATA01: 00h=Standby (Sleep), 04h=Power on, 05h=Cooling, 06h=Standby (error), 0Fh=Standby (Power saving), 10h=Network standby, FFh=Not supported)
- id: picture_mute_state
  type: enum
  values: [off, on]
  description: From 078-4 (DATA01) / 305-3 (DATA06)
- id: sound_mute_state
  type: enum
  values: [off, on]
  description: From 078-4 (DATA02) / 305-3 (DATA07)
- id: onscreen_mute_state
  type: enum
  values: [off, on]
  description: From 078-4 (DATA03) / 305-3 (DATA08)
- id: forced_onscreen_mute_state
  type: enum
  values: [off, on]
  description: From 078-4 (DATA04)
- id: freeze_state
  type: enum
  values: [off, on]
  description: From 305-3 (DATA09)
- id: cover_state
  type: enum
  values: [open, closed]
  description: From 078-6 (DATA01: 00h=Normal/cover opened, 01h=Cover closed)
- id: selection_signal_type
  type: enum
  values: [computer, video, s_video, component, dvi_d, hdmi, displayport, viewer_1_5, viewer_6_10, sdi, hdbaset, not_source_input, not_supported]
  description: From 078-3 / 305-3 (DATA04); see appendix for full mapping
- id: content_displayed
  type: enum
  values: [video_signal, no_signal, viewer, test_pattern, lan_display, signal_being_switched, not_supported]
  description: From 078-3 (DATA09) / 305-3 (DATA02)
- id: signal_list_number
  type: integer
  description: From 078-3 (DATA02); returned value is one less than actual (add 1)
- id: lamp_usage_time_seconds
  type: integer
  description: From 037 (DATA83-DATA86) or 037-4 (DATA03-DATA06). Updated at 1-minute intervals; if exceeded, lamp remaining life returns negative.
- id: lamp_remaining_life_percent
  type: integer
  description: From 037-4 (DATA03-DATA06 with content 04h). Negative if replacement deadline exceeded.
- id: filter_usage_time_seconds
  type: integer
  description: From 037 (DATA87-DATA90) / 037-3 (DATA01-DATA04)
- id: filter_alarm_start_time_seconds
  type: integer
  description: From 037-3 (DATA05-DATA08); -1 if not defined
- id: carbon_savings_kg
  type: integer
  description: From 037-6 (DATA02-DATA05); maximum 99999 kg
- id: carbon_savings_mg
  type: integer
  description: From 037-6 (DATA06-DATA09); maximum 999999 mg
- id: lamp_info_status
  type: enum
  values: [display_not_possible, adjustment_not_possible, adjustment_possible, gain_does_not_exist]
  description: From 060-1 (DATA01)
- id: lamp_info_current_value
  type: integer
  description: From 060-1 (DATA08-DATA09)
- id: lamp_info_range
  type: object
  description: From 060-1 (DATA02-DATA07): upper limit, lower limit, default
- id: eco_mode_value
  type: hex
  description: From 097-8 (DATA01); see appendix for per-model mapping
- id: edge_blending_value
  type: enum
  values: [off, on]
  description: From 097-243-1 (DATA01)
- id: pip_pbp_mode
  type: enum
  values: [pip, picture_by_picture]
  description: From 097-198 with DATA01=00h
- id: pip_pbp_start_position
  type: enum
  values: [top_left, top_right, bottom_left, bottom_right]
  description: From 097-198 with DATA01=01h
- id: pip_pbp_sub_input
  type: hex
  description: From 097-198 with DATA01=02h/09h/0Ah
- id: model_name
  type: string
  description: From 078-5 (DATA01-DATA32, NUL-terminated)
- id: serial_number
  type: string
  description: From 305-2 (DATA01-DATA16, NUL-terminated)
- id: projector_name
  type: string
  description: From 097-45 (DATA01-DATA17, NUL-terminated)
- id: mac_address
  type: bytes
  description: From 097-155 (DATA01-DATA06, 6 bytes)
- id: base_model_type
  type: hex
  description: From 305-1 (DATA01-DATA02 and DATA12-DATA13)
- id: audio_select_result
  type: enum
  values: [ended_successfully, ended_with_error]
  description: From 319-10 response DATA02
- id: info_string
  type: string
  description: From 084 (DATA02-DATA??, NUL-terminated); type 03h=horizontal sync, 04h=vertical sync
- id: lens_drive_axis_state
  type: bits
  description: From 053-7 (DATA01): Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V (0=Stop, 1=During operation)
- id: lens_profile_number
  type: enum
  values: [profile_1, profile_2]
  description: From 053-11 (DATA01)
```

## Variables
```yaml
# Adjustable continuous parameters whose values are passed inline as DATA bytes of a parameterized command.
- id: picture_adjust_value
  label: Picture Adjust Value
  description: 16-bit signed value passed to 030-1 PICTURE ADJUST DATA03/DATA04 (low/high); target selected by DATA01.
- id: volume_adjust_value
  label: Volume Adjust Value
  description: 16-bit signed value passed to 030-2 VOLUME ADJUST DATA02/DATA03.
- id: lamp_adjust_value
  label: Lamp/Light Adjust Value
  description: 16-bit signed value passed to 030-15 OTHER ADJUST DATA04/DATA05 (target DATA01=96h, DATA02=FFh).
- id: aspect_mode
  label: Aspect Mode
  description: Hex code from "Aspect values for command 030-12" appendix.
- id: eco_mode
  label: Eco Mode
  description: Hex code from "Eco mode values for commands 097-8 / 098-8" appendix.
- id: input_terminal
  label: Input Terminal
  description: Hex code from "Input terminal values for command 018" appendix.
- id: remote_key_code
  label: Remote Key Code
  description: 2-byte (WORD) key code from "Key code list" (050 REMOTE KEY CODE).
- id: lens_drive_command
  label: Lens Drive Command
  description: Hex code from 053 LENS CONTROL DATA02 (00h=Stop, 01h-03h=timed plus, 7Fh=plus, 81h=minus, FDh-FFh=timed minus).
- id: lens_memory_action
  label: Lens Memory Action
  description: Hex code from 053-3 / 053-4 DATA01 (00h=MOVE, 01h=STORE, 02h=RESET).
- id: lens_memory_option
  label: Lens Memory Option
  description: Hex code from 053-5 / 053-6 DATA01 (00h=LOAD BY SIGNAL, 01h=FORCED MUTE); DATA02 setting 00h=OFF/01h=ON.
- id: lens_profile_number
  label: Lens Profile Number
  description: 00h=Profile 1, 01h=Profile 2 (053-10 / 053-11).
- id: audio_select_value
  label: Audio Select Value
  description: Hex code from "Audio select values for command 319-10" appendix.
```

## Events
```yaml
# The source does not describe unsolicited push notifications from the device; all responses are
# issued in reply to commands. Section retained per template, contents are UNRESOLVED.
```

## Macros
```yaml
# The source does not describe device-side macro sequences. Section retained per template, contents are UNRESOLVED.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Power on/off commands reject other commands during the transition (015/016): 'While this command is turning on the power, no other command can be accepted' / 'While this command is turning off the power (including the cooling time), no other command can be accepted'."
  - description: "ERR1=02h, ERR2=0Dh indicates 'The command cannot be accepted because the power is off' - callers must check power state before issuing picture / mute / input commands."
  - description: "ERR1=02h, ERR2=04h indicates 'Forced onscreen mute on' - OSD will override the requested display."
  - description: "ERR1=02h, ERR2=0Fh indicates 'There is no authority necessary for the operation' - operation denied."
  - description: "DATA09 Bit1 in ERROR STATUS REQUEST indicates 'The interlock switch is open' - projector is physically interlocked (e.g. cover open)."
```

## Notes
- Frame format (every command): `HEADER ID1 ID2 LEN [DATA...] CKS`. Header byte discriminates the class (00h=read command, 01h/02h/03h=set/control, 20h/A0h/21h/22h/A2h/23h/A3h=response variants). CKS is the low byte of the sum of all preceding bytes (per section 2.2 example).
- Serial pinout (D-SUB 9P PC CONTROL): pin 2 RxD, pin 3 TxD, pin 5 GND, pin 7 RTS, pin 8 CTS (crossed straight-through to host DTE).
- Serial baud rates selectable: 115200, 38400, 19200, 9600, 4800. 8-N-1, full duplex. Source does not state flow control; defaulting to none per common practice.
- LAN TCP port 7142 for sending/receiving commands; 10/100 Mbps auto-negotiation, IEEE 802.3/802.3u.
- Power on command may not be received depending on standby mode; per the appended standby-mode note, supported values vary by model and transport (e.g. NETWORK STANDBY for LAN).
- Sub input setting values for PIP/PBP and audio select value tables depend on the per-model appendix ("Supplementary Information by Command"); specific codes beyond the ones listed in this document are UNRESOLVED for X551S.
- The supplied command manual is PA-series (BDT140013 Rev 7.1); whether every command listed is fully supported by X551S Series is UNRESOLVED from the source.

<!-- UNRESOLVED: Firmware compatibility ranges not stated. Voltage/current/fault recovery sequences not stated. Specific per-model input terminal values for X551S not stated. Whether X551S supports LAN standby, HDBaseT standby, lamp-2 commands, or two-lamp features is not stated in the supplied source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-09-02T16:48:19.793Z
last_checked_at: 2026-09-15T22:18:48.005Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-15T22:18:48.005Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match hex command literals in source verbatim; transport values (port 7142, baud rates, 8-N-1) confirmed; source command list contains exactly these 53 commands. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The provided refined source is the NEC PA-series projector command manual (BDT140013 Rev 7.1); the device slug requested is X551S Series. Command set is assumed applicable per operator; specific X551S firmware behavior not separately stated."
- "source does not state flow control; full-duplex is the only statement"
- "Firmware compatibility ranges not stated. Voltage/current/fault recovery sequences not stated. Specific per-model input terminal values for X551S not stated. Whether X551S supports LAN standby, HDBaseT standby, lamp-2 commands, or two-lamp features is not stated in the supplied source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
