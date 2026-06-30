---
spec_id: admin/sharp-nec-e436
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC E436 Control Spec"
manufacturer: Sharp/NEC
model_family: E436
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - E436
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:02:55.869Z
last_checked_at: 2026-06-17T19:43:24.486Z
generated_at: 2026-06-17T19:43:24.486Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "model code (ID2) value for E436 not stated in source — varies by model"
  - "control ID (ID1) default not stated in source"
  - "absolute min/max/default range model-specific; query 060-1 for limits"
  - "value enumeration not in source body - deferred to Appendix"
  - "value enumeration deferred to Appendix"
  - "source describes no unsolicited notifications / push events."
  - "source documents no multi-step command sequences."
  - "no power-on sequencing requirements or hardware interlock procedures stated beyond the per-command constraints above."
  - "default ID1 and E436-specific ID2 not stated"
  - "input terminal value list (DATA01 of 018/319-10) deferred to Appendix \"Supplementary Information by Command\" not present in refined source"
  - "eco mode value enumeration deferred to Appendix"
  - "aspect value enumeration deferred to Appendix"
  - "sub input setting value list (PIP/PBP) deferred to Appendix"
  - "base model type value list deferred to Appendix"
  - "ID2 (model code) for E436 not stated"
  - "firmware version compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-06-17T19:43:24.486Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec commands matched verbatim against source with correct hex payloads and parameter structures; transport parameters verified in source documentation. (17 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC E436 Control Spec

## Summary
The Sharp/NEC E436 is a projector controllable over RS-232C serial (PC CONTROL D-SUB 9P) and TCP/IP LAN (wired RJ-45 or wireless LAN unit). This spec covers the binary command protocol documented in the vendor Projector Control Command Reference Manual (BDT140013 Rev 7.1). Commands use a fixed-length frame with a leading byte (00h–03h), command byte, ID1/ID2, length, optional DATA bytes, and a trailing checksum byte (low-order 8 bits of the sum of all preceding bytes).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: model code (ID2) value for E436 not stated in source — varies by model -->
<!-- UNRESOLVED: control ID (ID1) default not stated in source -->

## Transport
```yaml
# Source documents both RS-232C serial and TCP/IP LAN. Wireless LAN unit
# pinout/standards deferred to operation manual of the wireless LAN unit.
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # TCP port stated verbatim in source (section 1.2)
serial:
  baud_rate: [4800, 9600, 19200, 38400, 115200]  # source lists all five selectable rates
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: full_duplex  # source: "Communication mode | Full duplex"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred from 015/016 POWER ON/OFF commands
  - queryable   # inferred from numerous *REQUEST query commands
  - levelable   # inferred from 030-1 PICTURE ADJUST and 030-2 VOLUME ADJUST
  - routable    # inferred from 018 INPUT SW CHANGE command
```

## Actions
```yaml
# All 53 distinct commands from the source Command List, each with its
# verbatim hex payload. Parameterized DATA fields are shown as <DATAxx>;
# the final <CKS> checksum is computed per source rule (sum of all preceding
# bytes, low-order 8 bits). ID1 = control ID, ID2 = model code (both omitted
# from command strings below where the source omits them in the literal
# "command" line - they appear in the response/ack frames).
#
# Source frame convention: every command frame begins with 00h-03h (command
# class) and ends with <CKS>. Response frames echo with leading byte +20h
# (A=ack type) on success or +80h (error) on failure.

- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

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
  notes: "No other command accepted during power-off incl. cooling time."

- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal selector (e.g. 06h = video port). See Appendix 'Supplementary Information by Command' for full value list."
  notes: "Example verbatim: '02h 03h 00h 00h 02h 01h 06h 0Eh' switches to video."

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
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
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
  notes: "Example verbatim: '03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h' sets brightness=10."

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
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
  notes: "Example verbatim: '03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h' sets volume=10."

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value. See Appendix 'Supplementary Information by Command'."

- id: other_adjust_lamp_light
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target high byte - source pairs DATA01=96h with DATA02=FFh for LAMP/LIGHT ADJUST"
    - name: DATA02
      type: integer
      description: "Target low byte (FFh for LAMP/LIGHT ADJUST)"
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
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage time (DATA83-86 sec), filter usage time (DATA87-90 sec). Updated at 1-minute intervals."

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage time (DATA01-04 sec) and filter alarm start time (DATA05-08 sec); -1 if undefined."

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=lamp usage time (sec), 04h=lamp remaining life (%)"
  notes: "Example verbatim: '03h 96h 00h 00h 02h 00h 01h 9Ch' gets Lamp 1 usage time. Negative remaining life when replacement deadline exceeded."

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  notes: "Returns kg (DATA02-05, max 99999) and mg (DATA06-09, max 999999)."

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). See Key code list in source."
    - name: DATA02
      type: integer
      description: "Key code high byte (always 00h in source table)."
  notes: "Example verbatim: '02h 0Fh 00h 00h 02h 05h 00h 18h' = AUTO. Key list includes POWER ON/OFF, MENU, UP/DOWN/LEFT/RIGHT, ENTER, EXIT, MUTE, COMPUTER1/2, VIDEO1, S-VIDEO1, VOLUME UP/DOWN, FREEZE, ASPECT, SOURCE, LAMP MODE/ECO."

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
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target. 06h = Periphery Focus documented in source."
    - name: DATA02
      type: integer
      description: "Motion: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  notes: "To stop continuous drive (7Fh/81h), send DATA02=00h."

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Lens target selector
  notes: "Returns upper/lower limit and current value (16-bit each)."

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (FFh = Stop - mode/value ignored)"
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
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Operates on profile number selected via 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
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
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: "Returns DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V) - 0=Stop, 1=During operation."

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []
  notes: "Returns selected reference lens memory profile number (00h=Profile 1, 01h=Profile 2)."

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  notes: "Example verbatim: '03h 05h 00h 00h 03h 00h 00h 00h 0Bh' gets brightness. Returns upper/lower limit, default, current, wide/narrow adjustment width (16-bit each)."

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: "Returns base model type (DATA01-03), sound function (DATA04), profile/clock/sleep-timer function (DATA05)."

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: "Returns power status (DATA03), cooling process (DATA04), power On/Off process (DATA05), operation status (DATA06)."

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: "Returns signal switch process, signal list number (practical = returned + 1), selection signal type 1/2, signal list type, test pattern display, content displayed."

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: "Returns picture mute (DATA01), sound mute (DATA02), onscreen mute (DATA03), forced onscreen mute (DATA04), onscreen display (DATA05)."

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []
  notes: "Returns model name (DATA01-32, NUL-terminated)."

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []
  notes: "Returns mirror/lens cover status: 00h=Normal (opened), 01h=Cover closed."

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h=Freeze ON, 02h=Freeze OFF"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: "Returns eco mode value (Light mode or Lamp mode depending on model). See Appendix for value list."

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []
  notes: "Returns projector name (DATA01-17, NUL-terminated)."

- id: lan_mac_address_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []
  notes: "Returns 6-byte MAC address (DATA01-06)."

- id: pip_pbp_request
  label: PIP/Picture-by-Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []
  notes: "Returns edge blending setting: 00h=OFF, 01h=ON."

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value (Light mode or Lamp mode). See Appendix 'Supplementary Information by Command'."

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
  params:
    - name: DATA01
      type: string
      description: "Projector name byte 1 (up to 16 bytes total, DATA01-16)"
  notes: "Sets projector name (up to 16 bytes), terminated with 00h."

- id: pip_pbp_set
  label: PIP/Picture-by-Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (varies by DATA01: MODE→PIP/PBP, START POSITION→corner, SUB INPUT→input selector)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
  notes: "Returns base model type (DATA01-02, DATA12-13) and model name (DATA03-11, NUL-terminated)."

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []
  notes: "Returns serial number (DATA01-16, NUL-terminated)."

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []
  notes: "Returns operation status (DATA01), content displayed (DATA02), signal type 1/2 (DATA03-04), display signal type (DATA05), video/sound/onscreen mute (DATA06-08), freeze status (DATA09)."

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal. See Appendix 'Supplementary Information by Command'."
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, network_standby]
  source: 078-2 RUNNING STATUS REQUEST DATA06

- id: cooling_in_progress
  type: enum
  values: [not_executed, during_execution]
  source: 078-2 DATA04

- id: picture_mute
  type: enum
  values: [off, on]
  source: 078-4 MUTE STATUS REQUEST DATA01

- id: sound_mute
  type: enum
  values: [off, on]
  source: 078-4 DATA02

- id: onscreen_mute
  type: enum
  values: [off, on]
  source: 078-4 DATA03

- id: freeze_status
  type: enum
  values: [off, on]
  source: 305-3 BASIC INFORMATION REQUEST DATA09

- id: cover_status
  type: enum
  values: [normal_opened, cover_closed]
  source: 078-6 COVER STATUS REQUEST

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: 097-243-1 EDGE BLENDING MODE REQUEST

- id: error_status
  type: bitfield
  description: "12-byte error info bitfield from 009 ERROR STATUS REQUEST (cover/fan/temp/power/lamp/formatter/mirror-cover/interlock/system errors)"
  source: 009 DATA01-12

- id: model_name
  type: string
  source: 078-5 MODEL NAME REQUEST

- id: serial_number
  type: string
  source: 305-2 SERIAL NUMBER REQUEST

- id: mac_address
  type: string
  source: 097-155 LAN MAC ADDRESS STATUS REQUEST 2

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: 037-4 LAMP INFORMATION REQUEST 3 (DATA01=00h, DATA02=01h)

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: 037-4 LAMP INFORMATION REQUEST 3 (DATA01=00h, DATA02=04h); negative when deadline exceeded

- id: filter_usage_time
  type: integer
  unit: seconds
  source: 037-3 FILTER USAGE INFORMATION REQUEST
```

## Variables
```yaml
- id: volume
  type: integer
  writable: true
  source: 030-2 VOLUME ADJUST / 060-1 DATA01=05h
  # UNRESOLVED: absolute min/max/default range model-specific; query 060-1 for limits

- id: brightness
  type: integer
  writable: true
  source: 030-1 PICTURE ADJUST (DATA01=00h) / 060-1 DATA01=00h

- id: contrast
  type: integer
  writable: true
  source: 030-1 PICTURE ADJUST (DATA01=01h) / 060-1 DATA01=01h

- id: color
  type: integer
  writable: true
  source: 030-1 PICTURE ADJUST (DATA01=02h) / 060-1 DATA01=02h

- id: hue
  type: integer
  writable: true
  source: 030-1 PICTURE ADJUST (DATA01=03h) / 060-1 DATA01=03h

- id: sharpness
  type: integer
  writable: true
  source: 030-1 PICTURE ADJUST (DATA01=04h) / 060-1 DATA01=04h

- id: lamp_light_adjust
  type: integer
  writable: true
  source: 030-15 OTHER ADJUST (DATA01=96h, DATA02=FFh) / 060-1 DATA01=96h

- id: eco_mode
  type: integer
  writable: true
  source: 098-8 ECO MODE SET / 097-8 ECO MODE REQUEST
  # UNRESOLVED: value enumeration not in source body - deferred to Appendix

- id: aspect
  type: integer
  writable: true
  source: 030-12 ASPECT ADJUST
  # UNRESOLVED: value enumeration deferred to Appendix

- id: projector_name
  type: string
  writable: true
  max_length: 16
  source: 098-45 LAN PROJECTOR NAME SET / 097-45 LAN PROJECTOR NAME REQUEST
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications / push events.
# Protocol is strictly request/response - all data is obtained by polling.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source: "no other command can be accepted" during cooldown - destructive to ongoing presentation
  - shutter_close  # blanks output
interlocks:
  - command: power_on
    constraint: "No other command accepted while power-on in progress."
  - command: power_off
    constraint: "No other command accepted during power-off incl. cooling time."
  - command: picture_mute_on
    constraint: "Cleared automatically on input terminal switch or video signal switch."
  - command: sound_mute_on
    constraint: "Cleared automatically on input terminal switch, video signal switch, or volume adjustment."
  - command: onscreen_mute_on
    constraint: "Cleared automatically on input terminal switch or video signal switch."
  - command: "*"
    constraint: "Error code 02h 0Dh returned when command issued while power is off."
# UNRESOLVED: no power-on sequencing requirements or hardware interlock procedures stated beyond the per-command constraints above.
```

## Notes
- **Checksum rule (verbatim from source):** add all bytes preceding the checksum; the low-order 8 bits of the sum is the checksum. Example: `20h + 81h + 01h + 60h + 01h + 00h = 103h` → checksum = `03h`.
- **Frame leading byte:** commands start with `00h`–`03h`; success responses echo with `+20h` (ack class), errors with `+80h` (`A?h`). The literal "command" line in the source is the host→projector frame; the `2?h`/`A?h` lines are projector→host responses.
- **ID1/ID2:** omitted from command literals where the source omits them. ID1 = projector control ID (set on device); ID2 = model code (varies by model). Both appear in response frames between the leading byte and LEN. <!-- UNRESOLVED: default ID1 and E436-specific ID2 not stated -->
- **Error code table (ERR1/ERR2)** documents 26 distinct error conditions including unrecognized command, unsupported feature, invalid value, memory errors, forced mute, no signal, power-off rejection, and authority errors.
- **Time granularity:** lamp/filter usage times are returned in 1-second units but updated at 1-minute intervals.
- **Signal list number:** returned value is 1 less than the practical number (add 1).
- **Wireless LAN:** physical layer details deferred to the wireless LAN unit's operation manual.

<!-- UNRESOLVED: input terminal value list (DATA01 of 018/319-10) deferred to Appendix "Supplementary Information by Command" not present in refined source -->
<!-- UNRESOLVED: eco mode value enumeration deferred to Appendix -->
<!-- UNRESOLVED: aspect value enumeration deferred to Appendix -->
<!-- UNRESOLVED: sub input setting value list (PIP/PBP) deferred to Appendix -->
<!-- UNRESOLVED: base model type value list deferred to Appendix -->
<!-- UNRESOLVED: ID2 (model code) for E436 not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:02:55.869Z
last_checked_at: 2026-06-17T19:43:24.486Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:43:24.486Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec commands matched verbatim against source with correct hex payloads and parameter structures; transport parameters verified in source documentation. (17 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "model code (ID2) value for E436 not stated in source — varies by model"
- "control ID (ID1) default not stated in source"
- "absolute min/max/default range model-specific; query 060-1 for limits"
- "value enumeration not in source body - deferred to Appendix"
- "value enumeration deferred to Appendix"
- "source describes no unsolicited notifications / push events."
- "source documents no multi-step command sequences."
- "no power-on sequencing requirements or hardware interlock procedures stated beyond the per-command constraints above."
- "default ID1 and E436-specific ID2 not stated"
- "input terminal value list (DATA01 of 018/319-10) deferred to Appendix \"Supplementary Information by Command\" not present in refined source"
- "eco mode value enumeration deferred to Appendix"
- "aspect value enumeration deferred to Appendix"
- "sub input setting value list (PIP/PBP) deferred to Appendix"
- "base model type value list deferred to Appendix"
- "ID2 (model code) for E436 not stated"
- "firmware version compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
