---
spec_id: admin/sharp-nec-ld-d151-f
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld D151 F Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld D151 F"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld D151 F"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:44:48.150Z
last_checked_at: 2026-06-17T19:59:52.711Z
generated_at: 2026-06-17T19:59:52.711Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "model code (ID2) value for Ld D151 F not stated in source — varies by model"
  - "control ID (ID1) default value not stated in source"
  - "appendix \"Supplementary Information by Command\" (input terminal values, aspect values, base model types, sub input values, eco mode values) not present in refined source"
  - "source describes no unsolicited notifications / push events."
  - "source describes no multi-step macro sequences."
  - "no power-on sequencing interlocks beyond command-acceptance notes above."
  - "default value not stated"
  - "Ld D151 F model code not stated"
  - "appendix not present in refined source"
  - "ID1 (control ID) default value not stated"
  - "ID2 (model code) for Ld D151 F not stated"
  - "input terminal DATA01 value enumeration (referenced appendix missing)"
  - "aspect value enumeration (referenced appendix missing)"
  - "base model type value enumeration (referenced appendix missing)"
  - "eco mode value enumeration (referenced appendix missing)"
  - "PIP/PbP sub input setting value enumeration (referenced appendix missing)"
verification:
  verdict: verified
  checked_at: 2026-06-17T19:59:52.711Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec action commands match verbatim with source protocol documentation; transport parameters confirmed in source; full bidirectional coverage. (17 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld D151 F Control Spec

## Summary
Sharp/NEC Ld D151 F is a projector controllable over RS-232C serial (PC CONTROL D-SUB 9P) and TCP/IP LAN (wired RJ-45 or wireless LAN unit, TCP port 7142). The protocol uses binary command frames in hexadecimal notation, terminated by a low-byte additive checksum (CKS). This spec enumerates all 53 commands documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: model code (ID2) value for Ld D151 F not stated in source — varies by model -->
<!-- UNRESOLVED: control ID (ID1) default value not stated in source -->
<!-- UNRESOLVED: appendix "Supplementary Information by Command" (input terminal values, aspect values, base model types, sub input values, eco mode values) not present in refined source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source lists 115200/38400/19200/9600/4800 as supported; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source states "Full duplex" communication mode
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: POWER ON / POWER OFF commands present
  - queryable      # inferred: many request commands returning state present
  - levelable      # inferred: PICTURE / VOLUME / LAMP ADJUST commands present
  - routable       # inferred: INPUT SW CHANGE command present
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "While turning power on, no other command is accepted."

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "During power-off (including cooling time), no other command is accepted."

  - id: input_switch
    label: Input SW Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Input terminal value (e.g. 06h = video port). Values listed in Appendix 'Supplementary Information by Command' (not in refined source)."
      - name: cks
        type: string
        description: "Checksum: low-order byte of additive sum of all preceding bytes."

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Cleared on input/video signal switch."

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
    notes: "Cleared on input/video switch or volume adjustment."

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
    notes: "Cleared on input/video signal switch."

  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: string
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness."
      - name: data02
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: data03
        type: string
        description: "Adjustment value (low-order 8 bits)."
      - name: data04
        type: string
        description: "Adjustment value (high-order 8 bits)."
      - name: cks
        type: string
        description: "Checksum: low-order byte of additive sum of all preceding bytes."

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
    params:
      - name: data01
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: data02
        type: string
        description: "Adjustment value (low-order 8 bits)."
      - name: data03
        type: string
        description: "Adjustment value (high-order 8 bits)."
      - name: cks
        type: string
        description: "Checksum: low-order byte of additive sum of all preceding bytes."

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Aspect value. Values listed in Appendix 'Supplementary Information by Command' (not in refined source)."
      - name: cks
        type: string
        description: "Checksum: low-order byte of additive sum of all preceding bytes."

  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
    params:
      - name: data01
        type: string
        description: "Adjustment target. Source documents DATA01=96h, DATA02=FFh as LAMP ADJUST / LIGHT ADJUST."
      - name: data02
        type: string
        description: "FFh for LAMP ADJUST / LIGHT ADJUST target."
      - name: data03
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative."
      - name: data04
        type: string
        description: "Adjustment value (low-order 8 bits)."
      - name: data05
        type: string
        description: "Adjustment value (high-order 8 bits)."
      - name: cks
        type: string
        description: "Checksum: low-order byte of additive sum of all preceding bytes."

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Key code low byte (WORD type). Source table: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO."
      - name: data02
        type: string
        description: "Key code high byte. Always 00h per source key code list."
      - name: cks
        type: string
        description: "Checksum: low-order byte of additive sum of all preceding bytes."

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
    command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Adjustment target. Source documents 06h=Periphery Focus."
      - name: data02
        type: string
        description: "Content: 00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus, 81h=drive minus, FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus."
      - name: cks
        type: string
        description: "Checksum: low-order byte of additive sum of all preceding bytes."
    notes: "While lens driving, can re-issue same command to change direction without stop."

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: string
        description: "Adjustment target. FFh=Stop (skips mode/value)."
      - name: data02
        type: string
        description: "Adjustment mode: 00h=absolute, 02h=relative."
      - name: data03
        type: string
        description: "Adjustment value (low-order 8 bits)."
      - name: data04
        type: string
        description: "Adjustment value (high-order 8 bits)."
      - name: cks
        type: string
        description: "Checksum: low-order byte of additive sum of all preceding bytes."

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."
      - name: cks
        type: string
        description: "Checksum: low-order byte of additive sum of all preceding bytes."

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET."
      - name: cks
        type: string
        description: "Checksum: low-order byte of additive sum of all preceding bytes."
    notes: "Controls the profile number specified by LENS PROFILE SET (053-10)."

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: data02
        type: string
        description: "Setting value: 00h=OFF, 01h=ON."
      - name: cks
        type: string
        description: "Checksum: low-order byte of additive sum of all preceding bytes."

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Profile number: 00h=Profile 1, 01h=Profile 2."
      - name: cks
        type: string
        description: "Checksum: low-order byte of additive sum of all preceding bytes."

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "01h=freeze on, 02h=freeze off."
      - name: cks
        type: string
        description: "Checksum: low-order byte of additive sum of all preceding bytes."

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Value set for the eco mode. Values listed in Appendix 'Supplementary Information by Command' (not in refined source)."
      - name: cks
        type: string
        description: "Checksum: low-order byte of additive sum of all preceding bytes."
    notes: "Sets 'Light mode' or 'Lamp mode' depending on projector."

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01-16} 00h {cks}"
    params:
      - name: data01-16
        type: string
        description: "Projector name (up to 16 bytes, NUL-terminated)."
      - name: cks
        type: string
        description: "Checksum: low-order byte of additive sum of all preceding bytes."

  - id: pip_picture_by_picture_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: data02
        type: string
        description: "Setting value. For MODE: 00h=PIP, 01h=PICTURE BY PICTURE. For START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input values listed in Appendix (not in refined source)."
      - name: cks
        type: string
        description: "Checksum: low-order byte of additive sum of all preceding bytes."

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Setting value: 00h=OFF, 01h=ON."
      - name: cks
        type: string
        description: "Checksum: low-order byte of additive sum of all preceding bytes."

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Input terminal. Values listed in Appendix 'Supplementary Information by Command' (not in refined source)."
      - name: data02
        type: string
        description: "Setting value: 00h=the terminal specified in DATA01, 01h=BNC, 02h=COMPUTER."
      - name: cks
        type: string
        description: "Checksum: low-order byte of additive sum of all preceding bytes."

  # --- Queries ---
  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns DATA01-DATA12, bitfield error info (cover, fan, temp, lamp, etc.)."

  - id: information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90). Updated 1-min intervals."

  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds. -1 if undefined."

  - id: lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)."
      - name: data02
        type: string
        description: "Content: 01h=lamp usage time (seconds), 04h=lamp remaining life (%)."
      - name: cks
        type: string
        description: "Checksum: low-order byte of additive sum of all preceding bytes."
    notes: "Negative remaining life (%) returned if replacement deadline exceeded."

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation."
      - name: cks
        type: string
        description: "Checksum: low-order byte of additive sum of all preceding bytes."

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Adjustment target (e.g. 06h=Periphery Focus)."
      - name: cks
        type: string
        description: "Checksum: low-order byte of additive sum of all preceding bytes."
    notes: "Returns upper/lower adjustment limits and current value."

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE."
      - name: cks
        type: string
        description: "Checksum: low-order byte of additive sum of all preceding bytes."

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns bitfield lens operation status (lens memory, zoom, focus, lens shift H/V)."

  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Returns selected profile number (00h=Profile 1, 01h=Profile 2)."

  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST / LIGHT ADJUST."
      - name: cks
        type: string
        description: "Checksum: low-order byte of additive sum of all preceding bytes."

  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type (DATA01-03), sound function availability (DATA04), profile/clock function (DATA05)."

  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status, cooling process, power on/off process, operation status."

  - id: input_status_request
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern, content displayed."

  - id: mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display states."

  - id: model_name_request
    label: Model Name Request
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  - id: cover_status_request
    label: Cover Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Returns mirror/lens cover status: 00h=Normal (opened), 01h=Cover closed."

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
    params:
      - name: data01
        type: string
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency."
      - name: cks
        type: string
        description: "Checksum: low-order byte of additive sum of all preceding bytes."

  - id: eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns eco mode / light mode / lamp mode value. Values listed in Appendix (not in refined source)."

  - id: lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: lan_mac_address_status_request_2
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_picture_by_picture_request
    label: PIP/Picture by Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT / SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."
      - name: cks
        type: string
        description: "Checksum: low-order byte of additive sum of all preceding bytes."

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Returns base model type and model name. Type values listed in Appendix (not in refined source)."

  - id: serial_number_request
    label: Serial Number Request
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  - id: basic_information_request
    label: Basic Information Request
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Returns operation status, content displayed, signal types, mute states, freeze status."
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitfield
    description: "DATA01-DATA12 error bits (cover, fan, temperature, lamp off/replacement, formatter, FPGA, mirror cover, ballast comms, iris calibration, lens install, interlock switch open, system errors)."

  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    description: "From RUNNING STATUS REQUEST DATA03-DATA06 and BASIC INFORMATION REQUEST DATA01."

  - id: mute_state
    type: composite
    description: "From MUTE STATUS REQUEST: picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display."

  - id: cover_state
    type: enum
    values: [normal_opened, cover_closed]

  - id: lens_operation_state
    type: bitfield
    description: "From LENS INFORMATION REQUEST DATA01: lens memory, zoom, focus, lens shift H, lens shift V (stop / during operation)."

  - id: input_signal_state
    type: composite
    description: "From INPUT STATUS REQUEST: signal list number, signal type, content displayed, test pattern state."
```

## Variables
```yaml
variables:
  - id: lamp_usage_time
    type: integer
    unit: seconds
    description: "From INFORMATION REQUEST DATA83-86 or LAMP INFORMATION REQUEST 3. Updated 1-min intervals."

  - id: filter_usage_time
    type: integer
    unit: seconds
    description: "From INFORMATION REQUEST DATA87-90 or FILTER USAGE INFORMATION REQUEST DATA01-04."

  - id: lamp_remaining_life
    type: integer
    unit: percent
    description: "From LAMP INFORMATION REQUEST 3 (content 04h). Negative if deadline exceeded."

  - id: carbon_savings
    type: composite
    unit: "kg + mg"
    description: "From CARBON SAVINGS INFORMATION REQUEST. Max 99999 kg + 999999 mg."

  - id: picture_brightness
    type: integer
    description: "Adjustment range and current value from GAIN PARAMETER REQUEST 3 (00h)."

  - id: picture_contrast
    type: integer
    description: "From GAIN PARAMETER REQUEST 3 (01h)."

  - id: picture_color
    type: integer
    description: "From GAIN PARAMETER REQUEST 3 (02h)."

  - id: picture_hue
    type: integer
    description: "From GAIN PARAMETER REQUEST 3 (03h)."

  - id: picture_sharpness
    type: integer
    description: "From GAIN PARAMETER REQUEST 3 (04h)."

  - id: volume
    type: integer
    description: "From GAIN PARAMETER REQUEST 3 (05h)."

  - id: lamp_light_adjust
    type: integer
    description: "From GAIN PARAMETER REQUEST 3 (96h)."
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications / push events.
# All data is obtained via explicit request commands.
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: "While powering on, no other command is accepted."
  - command: power_off
    note: "During power-off (including cooling time), no other command is accepted."
  - command: "*"
    note: "Commands return ERR1=02h ERR2=0Dh when power is off ('The command cannot be accepted because the power is off')."
# UNRESOLVED: no power-on sequencing interlocks beyond command-acceptance notes above.
```

## Notes
- **Frame format:** Commands are binary hex frames. Format documented as `<header> <cmd byte> <ID1> <ID2> <LEN> <DATA...> <CKS>`. Response headers: `2xh`=success (no data), `2xh` with DATA=success (with data), `Axh`=error with ERR1/ERR2.
- **Checksum (CKS):** Low-order one byte (8 bits) of additive sum of all preceding bytes. Example: `20h+81h+01h+60h+01h+00h = 103h → CKS = 03h`.
- **ID1 (Control ID):** Value of "control ID" set on projector. <!-- UNRESOLVED: default value not stated -->
- **ID2 (Model code):** Varies by model. <!-- UNRESOLVED: Ld D151 F model code not stated -->
- **Serial:** RS-232C cross cable, D-SUB 9P PC CONTROL port. Pin assignment: 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS.
- **LAN:** TCP port 7142. Wired RJ-45 (10/100 Mbps auto) or wireless LAN unit.
- **Error codes:** Full ERR1/ERR2 table documented in source section 2.4 (00h-03h ranges covering unrecognized command, unsupported model, invalid value, invalid input, memory errors, no signal, power off, no authority, gain errors, etc.).
- **Appendix "Supplementary Information by Command"** referenced for: input terminal values, aspect values, base model types, sub input values, eco mode values. <!-- UNRESOLVED: appendix not present in refined source -->

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: ID1 (control ID) default value not stated -->
<!-- UNRESOLVED: ID2 (model code) for Ld D151 F not stated -->
<!-- UNRESOLVED: input terminal DATA01 value enumeration (referenced appendix missing) -->
<!-- UNRESOLVED: aspect value enumeration (referenced appendix missing) -->
<!-- UNRESOLVED: base model type value enumeration (referenced appendix missing) -->
<!-- UNRESOLVED: eco mode value enumeration (referenced appendix missing) -->
<!-- UNRESOLVED: PIP/PbP sub input setting value enumeration (referenced appendix missing) -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T18:44:48.150Z
last_checked_at: 2026-06-17T19:59:52.711Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:59:52.711Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec action commands match verbatim with source protocol documentation; transport parameters confirmed in source; full bidirectional coverage. (17 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "model code (ID2) value for Ld D151 F not stated in source — varies by model"
- "control ID (ID1) default value not stated in source"
- "appendix \"Supplementary Information by Command\" (input terminal values, aspect values, base model types, sub input values, eco mode values) not present in refined source"
- "source describes no unsolicited notifications / push events."
- "source describes no multi-step macro sequences."
- "no power-on sequencing interlocks beyond command-acceptance notes above."
- "default value not stated"
- "Ld D151 F model code not stated"
- "appendix not present in refined source"
- "ID1 (control ID) default value not stated"
- "ID2 (model code) for Ld D151 F not stated"
- "input terminal DATA01 value enumeration (referenced appendix missing)"
- "aspect value enumeration (referenced appendix missing)"
- "base model type value enumeration (referenced appendix missing)"
- "eco mode value enumeration (referenced appendix missing)"
- "PIP/PbP sub input setting value enumeration (referenced appendix missing)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
