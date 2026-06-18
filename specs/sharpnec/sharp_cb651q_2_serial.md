---
spec_id: admin/sharp-nec-cb651q-2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Cb651Q 2 Control Spec"
manufacturer: Sharp/NEC
model_family: "Cb651Q 2"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Cb651Q 2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:57:09.495Z
last_checked_at: 2026-06-17T19:39:01.013Z
generated_at: 2026-06-17T19:39:01.013Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input-terminal value table, aspect value table, eco-mode value table, and base-model-type values are referenced to an \"Appendix / Supplementary Information by Command\" that is not present in this refined source extract."
  - "RTS/CTS pins wired in pinout, but flow-control setting not explicitly stated in source"
  - "exact enum values referenced to Appendix \"Supplementary Information by Command\""
  - "source describes no unsolicited notifications; all data is returned only in response to a request command."
  - "source describes no multi-step command sequences."
  - "no explicit safety interlock procedures or power-on sequencing requirements stated in source."
  - "firmware version compatibility not stated in source."
  - "input-terminal value table (018 / 319-10), aspect value table (030-12), eco-mode value table (097-8/098-8), base-model-type values (078-1/305-1), and sub-input setting values (097-198/098-198) are all referenced to an Appendix \"Supplementary Information by Command\" absent from this refined extract."
  - "serial flow_control setting not explicitly stated (RTS/CTS pins wired but flow-control mode undocumented)."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:39:01.013Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec commands match source verbatim with correct hex sequences; transport parameters verified; source command inventory fully represented. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Cb651Q 2 Control Spec

## Summary
The Sharp/NEC Cb651Q 2 is a projector controllable via RS-232C serial (PC CONTROL D-SUB 9P) and wired/wireless LAN. This spec covers the binary command protocol described in the Projector Control Command Reference Manual (BDT140013 Rev 7.1), including power, input switching, muting, lens control, picture/volume adjust, status queries, and system information requests. Commands are hex-byte frames with a trailing checksum (low-order byte of the sum of all preceding bytes); responses distinguish success (`2xh`/`0xh`) from error (`Axh`) frames.

<!-- UNRESOLVED: input-terminal value table, aspect value table, eco-mode value table, and base-model-type values are referenced to an "Appendix / Supplementary Information by Command" that is not present in this refined source extract. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate:
    - 4800
    - 9600
    - 19200
    - 38400
    - 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS pins wired in pinout, but flow-control setting not explicitly stated in source
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWER ON / POWER OFF commands
  - queryable    # inferred from many request/query commands
  - levelable    # inferred from PICTURE ADJUST / VOLUME ADJUST commands
  - routable     # inferred from INPUT SW CHANGE command
```

## Actions
```yaml
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []
  notes: "Returns DATA01-DATA12 error bit fields (cover, fan, temp, lamp, mirror cover, etc.)."

- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted while power-on is in progress."

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted while power-off (incl. cooling time) is in progress."

- id: input_sw_change
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {checksum}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value (e.g. 06h = video port). Full value table UNRESOLVED - referenced to Appendix 'Supplementary Information by Command'."
  notes: "Response DATA01 = FFh means ended with error (no signal switch made)."

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA03} {DATA04} {checksum}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative (fixed FFh in frame)."
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)."

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {checksum}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: DATA02
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: DATA03
      type: integer
      description: "Adjustment value (high-order 8 bits)."

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {checksum}"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value. Full value table UNRESOLVED - referenced to Appendix 'Supplementary Information by Command'."

- id: other_adjust
  label: Other Adjust
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {checksum}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 96h=LAMP ADJUST / LIGHT ADJUST."
    - name: DATA02
      type: integer
      description: "Sub-target (e.g. FFh)."
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative."
    - name: DATA04
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: DATA05
      type: integer
      description: "Adjustment value (high-order 8 bits)."

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated at one-minute intervals."

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time seconds (DATA01-04) and filter alarm start time seconds (DATA05-08). Returns -1 if undefined."

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {checksum}"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time seconds, 04h=lamp remaining life %."
  notes: "Eco-mode affects returned values. Negative remaining life % returned if replacement deadline exceeded."

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {checksum}"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."
  notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {checksum}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). E.g. 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO."
    - name: DATA02
      type: integer
      description: "Key code high byte (always 00h in listed codes)."
  notes: "Response DATA01 = FFh means ended with error."

- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {checksum}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (e.g. 06h=Periphery Focus)."
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s."
  notes: "Send 00h to stop after 7Fh/81h continuous drive. Same command can be re-issued without stop while driving."

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {checksum}"
  params:
    - name: DATA01
      type: integer
      description: "Lens target to query."
  notes: "Returns upper/lower limits and current value (16-bit, DATA02-07)."

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {checksum}"
  params:
    - name: DATA01
      type: integer
      description: "Target (FFh=Stop; mode/value ignored when Stop)."
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative."
    - name: DATA03
      type: integer
      description: "Adjustment value (low-order 8 bits)."
    - name: DATA04
      type: integer
      description: "Adjustment value (high-order 8 bits)."

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {checksum}"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {checksum}"
  params:
    - name: DATA01
      type: integer
      description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."
  notes: "Operates on profile selected via 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {checksum}"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
  notes: "Returns setting value: 00h=OFF, 01h=ON."

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {checksum}"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
    - name: DATA02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON."

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bit field: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V) - 0=Stop, 1=During operation."

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {checksum}"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2."

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns selected profile number: 00h=Profile 1, 01h=Profile 2."

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {checksum}"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST."
  notes: "Returns status, upper/lower limits, default, current value, wide/narrow adjustment width, default validity."

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile number (DATA05)."

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status (DATA03), cooling process (DATA04), power on/off process (DATA05), operation status (DATA06)."

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number, selection signal types, test pattern display, content displayed."

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display (each 00h=off, 01h=on)."

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns model name string (DATA01-32, NUL-terminated)."

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns mirror/lens cover status: 00h=Normal(opened), 01h=Cover closed."

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {checksum}"
  params:
    - name: DATA01
      type: integer
      description: "01h=Freeze on, 02h=Freeze off."

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {checksum}"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency."
  notes: "Returns label/info string (NUL-terminated)."

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns eco/light/lamp mode value. Full value table UNRESOLVED - referenced to Appendix."

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns projector name string (DATA01-17, NUL-terminated)."

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns MAC address bytes (DATA01-06)."

- id: pip_picture_by_picture_request
  label: PIP / Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {checksum}"
  params:
    - name: DATA01
      type: integer
      description: "Item: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
  notes: "Sub-input setting values UNRESOLVED - referenced to Appendix."

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns edge blending setting: 00h=OFF, 01h=ON."

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {checksum}"
  params:
    - name: DATA01
      type: integer
      description: "Eco/light/lamp mode value. Full value table UNRESOLVED - referenced to Appendix."

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01-16} 00h {checksum}"
  params:
    - name: DATA01-16
      type: string
      description: "Projector name (up to 16 bytes)."

- id: pip_picture_by_picture_set
  label: PIP / Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {checksum}"
  params:
    - name: DATA01
      type: integer
      description: "Item: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
    - name: DATA02
      type: integer
      description: "Setting value (MODE: 00h=PIP/01h=PiPbP; POSITION: 00h=TL/01h=TR/02h=BL/03h=BR; or sub-input value)."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {checksum}"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON."

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11). Value table UNRESOLVED - referenced to Appendix."

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns serial number string (DATA01-16, NUL-terminated)."

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status, content displayed, selection signal types, display signal type, video/sound/onscreen mute, freeze status."

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {checksum}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value. Full value table UNRESOLVED - referenced to Appendix."
    - name: DATA02
      type: integer
      description: "Setting value: 00h=specified terminal, 01h=BNC, 02h=COMPUTER."
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: running_status_request DATA06 / basic_information_request DATA01

- id: cooling_in_progress
  type: enum
  values: [not_executed, during_execution]
  source: running_status_request DATA04

- id: power_onoff_in_progress
  type: enum
  values: [not_executed, during_execution]
  source: running_status_request DATA05

- id: picture_mute_state
  type: enum
  values: [off, on]
  source: mute_status_request DATA01

- id: sound_mute_state
  type: enum
  values: [off, on]
  source: mute_status_request DATA02

- id: onscreen_mute_state
  type: enum
  values: [off, on]
  source: mute_status_request DATA03

- id: forced_onscreen_mute_state
  type: enum
  values: [off, on]
  source: mute_status_request DATA04

- id: cover_state
  type: enum
  values: [normal_opened, cover_closed]
  source: cover_status_request DATA01

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: lens_profile_request DATA01

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: edge_blending_mode_request DATA01

- id: freeze_state
  type: enum
  values: [off, on]
  source: basic_information_request DATA09

- id: lamp_usage_seconds
  type: integer
  source: lamp_information_request_3 (content 01h), DATA03-06; updated at one-minute intervals

- id: lamp_remaining_life_percent
  type: integer
  source: lamp_information_request_3 (content 04h), DATA03-06; negative if replacement deadline exceeded

- id: filter_usage_seconds
  type: integer
  source: filter_usage_information_request DATA01-04

- id: projector_name
  type: string
  source: lan_projector_name_request / information_request DATA01-49

- id: mac_address
  type: string
  source: lan_mac_address_status_request_2 DATA01-06

- id: serial_number
  type: string
  source: serial_number_request DATA01-16

- id: error_status
  type: bitmask
  source: error_status_request DATA01-12 (cover/fan/temp/lamp/mirror-cover/interlock/system errors)
```

## Variables
```yaml
- id: volume
  type: integer
  set_via: volume_adjust
  query_via: gain_parameter_request_3 (DATA01=05h)

- id: brightness
  type: integer
  set_via: picture_adjust (DATA01=00h)
  query_via: gain_parameter_request_3 (DATA01=00h)

- id: contrast
  type: integer
  set_via: picture_adjust (DATA01=01h)
  query_via: gain_parameter_request_3 (DATA01=01h)

- id: color
  type: integer
  set_via: picture_adjust (DATA01=02h)
  query_via: gain_parameter_request_3 (DATA01=02h)

- id: hue
  type: integer
  set_via: picture_adjust (DATA01=03h)
  query_via: gain_parameter_request_3 (DATA01=03h)

- id: sharpness
  type: integer
  set_via: picture_adjust (DATA01=04h)
  query_via: gain_parameter_request_3 (DATA01=04h)

- id: lamp_light_adjust
  type: integer
  set_via: other_adjust (DATA01=96h)
  query_via: gain_parameter_request_3 (DATA01=96h)

- id: eco_mode
  type: integer  # UNRESOLVED: exact enum values referenced to Appendix "Supplementary Information by Command"
  set_via: eco_mode_set
  query_via: eco_mode_request
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications; all data is returned only in response to a request command.
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes: POWER ON/OFF block all other commands during power transition + cooling.
# Error bit DATA09 Bit1 = interlock switch open (informational, not a command interlock procedure).
# UNRESOLVED: no explicit safety interlock procedures or power-on sequencing requirements stated in source.
```

## Notes
- Command frame format: `{cmd_class} {cmd_code} 00h 00h {LEN} {DATA...} {CKS}`. Response success prefix replaces first byte with `2xh` (action) or `0xh`/`20h` (query); error prefix is `Axh` with `<ERR1> <ERR2>` codes.
- Checksum (`CKS`) = low-order byte of the sum of all preceding bytes in the frame.
- `ID1` = projector control ID; `ID2` = model code (varies by model). Both are present in responses only.
- Serial cable is a **cross cable** (null modem) to the PC CONTROL D-SUB 9P port. RTS/CTS and TxD/RxD crossed.
- Picture/Sound/Onscreen mute auto-clear on input switch or video signal switch (sound mute also clears on volume adjust).
- Lamp/filter usage times are updated at one-minute intervals despite one-second resolution.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: input-terminal value table (018 / 319-10), aspect value table (030-12), eco-mode value table (097-8/098-8), base-model-type values (078-1/305-1), and sub-input setting values (097-198/098-198) are all referenced to an Appendix "Supplementary Information by Command" absent from this refined extract. -->
<!-- UNRESOLVED: serial flow_control setting not explicitly stated (RTS/CTS pins wired but flow-control mode undocumented). -->
```

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:57:09.495Z
last_checked_at: 2026-06-17T19:39:01.013Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:39:01.013Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec commands match source verbatim with correct hex sequences; transport parameters verified; source command inventory fully represented. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input-terminal value table, aspect value table, eco-mode value table, and base-model-type values are referenced to an \"Appendix / Supplementary Information by Command\" that is not present in this refined source extract."
- "RTS/CTS pins wired in pinout, but flow-control setting not explicitly stated in source"
- "exact enum values referenced to Appendix \"Supplementary Information by Command\""
- "source describes no unsolicited notifications; all data is returned only in response to a request command."
- "source describes no multi-step command sequences."
- "no explicit safety interlock procedures or power-on sequencing requirements stated in source."
- "firmware version compatibility not stated in source."
- "input-terminal value table (018 / 319-10), aspect value table (030-12), eco-mode value table (097-8/098-8), base-model-type values (078-1/305-1), and sub-input setting values (097-198/098-198) are all referenced to an Appendix \"Supplementary Information by Command\" absent from this refined extract."
- "serial flow_control setting not explicitly stated (RTS/CTS pins wired but flow-control mode undocumented)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
