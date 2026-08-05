---
spec_id: admin/nec-exx2
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC Exx2 Control Spec"
manufacturer: NEC
model_family: Exx2
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - Exx2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-27T05:44:15.333Z
last_checked_at: 2026-07-21T23:36:06.796Z
generated_at: 2026-07-21T23:36:06.796Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "final model name not stated; \"Exx2\" is a manufacturer-wide control protocol designation. Input terminal numeric codes reference an appendix not present in source."
  - "no default stated in source; supported rates = 115200/38400/19200/9600/4800 bps"
  - "eco mode values mapping not stated in source appendix"
  - "aspect ratio values mapping not stated in source appendix"
  - "input terminal numeric codes not stated in source appendix"
  - "PIP/PBP sub-input values not stated in source appendix"
  - "no standalone settable parameter block identified in source; picture/volume/gain are action-based encapsulated commands"
  - "source documents no unsolicited event notifications from the projector"
  - "no explicit multi-step macro sequences described in source"
  - "voltage/current/power specifications not stated in source"
  - "exact numeric values for input terminals, aspect modes, eco mode, and sub-input settings — reference appendix \"Supplementary Information by Command\" not present in source. UNRESOLVED: wireless LAN unit specifications not in source. UNRESOLVED: serial default baud rate not stated (multiple rates supported but no default specified). UNRESOLVED: firmware version compatibility not stated. UNRESOLVED: ID2 model code values not enumerated in source."
verification:
  verdict: verified
  checked_at: 2026-07-21T23:36:06.796Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim to source command reference; transport parameters verified; complete coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# NEC Exx2 Control Spec

## Summary
NEC Exx2 projector RS-232C and TCP/IP control protocol. Supports serial (RS-232C cross cable) and wired LAN (TCP port 7142). Full duplex communication with checksum-based packet framing. Source documents 53 command groups covering power, input routing, mute, picture/sound adjustment, lens control, eco mode, freeze, PIP, edge blending, and status queries.

<!-- UNRESOLVED: final model name not stated; "Exx2" is a manufacturer-wide control protocol designation. Input terminal numeric codes reference an appendix not present in source. -->

## Transport
```yaml
# Packet framing: command/response expressed as hex byte strings.
# General response frame: <type> <op> <ID1> <ID2> <LEN> <DATA...> <CKS>
# ID1 = control ID set on projector; ID2 = model code (varies by model).
# CKS = checksum = low-order byte of sum of all preceding bytes.
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: null  # UNRESOLVED: no default stated in source; supported rates = 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # communication mode: full duplex (source 1.2)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred from 015 POWER ON / 016 POWER OFF
- routable     # inferred from 018 INPUT SW CHANGE
- queryable    # inferred from numerous status/error/information request commands
- levelable    # inferred from 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST
```

## Actions
```yaml
# Notes on payloads:
# - Fixed commands carry a complete literal hex payload including the checksum byte.
# - Parameterized commands show <DATA##> placeholders verbatim from source plus a
#   <CKS> placeholder; checksum = low-order byte of sum of all preceding bytes.
# - ID1 (control ID) / ID2 (model code) appear in responses, not in the literal
#   command bytes documented for these operations.

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

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: input_terminal
      type: integer
      description: "DATA01 = Input terminal code (see appendix; source references appendix for numeric values). Example: 06h = video port."

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
    - name: target
      type: integer
      description: "DATA01 = 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
    - name: mode
      type: integer
      description: "DATA02 = 00h Absolute value, 01h Relative value"
    - name: value
      type: integer
      description: "16-bit signed adjustment value (DATA03 = low-order 8 bits, DATA04 = high-order 8 bits)"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: mode
      type: integer
      description: "DATA01 = 00h Absolute value, 01h Relative value"
    - name: value
      type: integer
      description: "16-bit signed volume value (DATA02 = low-order 8 bits, DATA03 = high-order 8 bits)"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: value
      type: integer
      description: "DATA01 = Aspect ratio code (see appendix in source for values)"

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: target
      type: integer
      description: "DATA01=96h DATA02=FFh => Lamp Adjust / Light Adjust"
    - name: mode
      type: integer
      description: "DATA03 = 00h Absolute value, 01h Relative value"
    - name: value
      type: integer
      description: "16-bit signed adjustment value (DATA04 low, DATA05 high)"

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: lamp_number
      type: integer
      description: "DATA01 = 00h Lamp 1, 01h Lamp 2 (Lamp 2 only on two-lamp models)"
    - name: content
      type: integer
      description: "DATA02 = 01h Lamp usage time (seconds), 04h Lamp remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: type
      type: integer
      description: "DATA01 = 00h Total Carbon Savings, 01h Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: key_code
      type: integer
      description: "16-bit key code (DATA01 low, DATA02 high). Codes: POWER ON(02h), POWER OFF(03h), AUTO(05h), MENU(06h), UP(07h), DOWN(08h), RIGHT(09h), LEFT(0Ah), ENTER(0Bh), EXIT(0Ch), HELP(0Dh), MAGNIFY UP(0Fh), MAGNIFY DOWN(10h), MUTE(13h), PICTURE(29h), COMPUTER1(4Bh), COMPUTER2(4Ch), VIDEO1(4Fh), S-VIDEO1(51h), VOLUME UP(84h), VOLUME DOWN(85h), FREEZE(8Ah), ASPECT(A3h), SOURCE(D7h), LAMP MODE/ECO(EEh)"

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
    - name: target
      type: integer
      description: "DATA01 = 06h Periphery Focus"
    - name: direction
      type: integer
      description: "DATA02 = 00h Stop, 01h Drive 1s plus, 02h Drive 0.5s plus, 03h Drive 0.25s plus, 7Fh Drive plus (continuous), 81h Drive minus (continuous), FDh Drive 0.25s minus, FEh Drive 0.5s minus, FFh Drive 1s minus"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: target
      type: integer
      description: "DATA01 = 06h Periphery Focus"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: command
      type: integer
      description: "DATA01 = FFh Stop (when Stop, mode/value not referenced)"
    - name: mode
      type: integer
      description: "DATA02 = 00h Absolute value, 02h Relative value"
    - name: value
      type: integer
      description: "16-bit signed adjustment value (DATA03 low, DATA04 high)"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: operation
      type: integer
      description: "DATA01 = 00h MOVE, 01h STORE, 02h RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: operation
      type: integer
      description: "DATA01 = 00h MOVE, 01h STORE, 02h RESET (operates on profile set via LENS PROFILE SET)"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: target
      type: integer
      description: "DATA01 = 00h LOAD BY SIGNAL, 01h FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: target
      type: integer
      description: "DATA01 = 00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: value
      type: integer
      description: "DATA02 = 00h OFF, 01h ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params:
    - name: target
      type: integer
      description: "DATA01 (fixed 00h in command); response byte = lens operation status bitfield"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: profile_number
      type: integer
      description: "DATA01 = 00h Profile 1, 01h Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: adjusted_value_name
      type: integer
      description: "DATA01 = 00h PICTURE/BRIGHTNESS, 01h PICTURE/CONTRAST, 02h PICTURE/COLOR, 03h PICTURE/HUE, 04h PICTURE/SHARPNESS, 05h VOLUME, 96h LAMP ADJUST/LIGHT ADJUST"

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

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

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: state
      type: integer
      description: "DATA01 = 01h Freeze on, 02h Freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: information_type
      type: integer
      description: "DATA01 = 03h Horizontal synchronous frequency, 04h Vertical synchronous frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: target
      type: integer
      description: "DATA01 = 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: value
      type: integer
      description: "DATA01 = Eco mode value (see appendix in source for numeric mapping; sets Light mode or Lamp mode depending on model)"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: name
      type: string
      description: "DATA01-DATA16 = Projector name (up to 16 bytes), followed by 00h NUL terminator"

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: target
      type: integer
      description: "DATA01 = 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: value
      type: integer
      description: "DATA02 = setting value per target. MODE: 00h PIP, 01h PICTURE BY PICTURE. START POSITION: 00h TOP-LEFT, 01h TOP-RIGHT, 02h BOTTOM-LEFT, 03h BOTTOM-RIGHT. Sub input values: see appendix"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: value
      type: integer
      description: "DATA01 = 00h OFF, 01h ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

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

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: input_terminal
      type: integer
      description: "DATA01 = Input terminal code (see appendix in source for numeric values)"
    - name: setting_value
      type: integer
      description: "DATA02 = 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values:
    - standby
    - power_on
    - cooling
    - network_standby
    - standby_error
    - standby_power_saving

- id: error_status
  type: bitfield
  description: "Error information bitfield, 12 bytes (DATA01-DATA12). Bits map to cover error, temp error, fan error, power error, lamp status, formatter error, FPGA error, mirror cover error, dust sensor, and extended interlock/status bits."

- id: mute_state
  type: object
  fields:
    - name: picture_mute
      type: enum
      values: [off, on]
    - name: sound_mute
      type: enum
      values: [off, on]
    - name: onscreen_mute
      type: enum
      values: [off, on]
    - name: forced_onscreen_mute
      type: enum
      values: [off, on]

- id: lamp_info
  type: object
  fields:
    - name: lamp_number
      type: integer
    - name: usage_time_seconds
      type: integer
    - name: remaining_life_percent
      type: integer
      description: "Negative if replacement deadline exceeded"

- id: filter_usage_info
  type: object
  fields:
    - name: usage_time_seconds
      type: integer
    - name: alarm_start_time_seconds
      type: integer
      description: "Returns -1 if no time defined"

- id: carbon_savings_info
  type: object
  fields:
    - name: type
      type: integer
    - name: kilograms
      type: integer
      description: "Max 99999 kg"
    - name: milligrams
      type: integer
      description: "Max 999999 mg"

- id: projector_name
  type: string
  description: "NUL-terminated string"

- id: model_name
  type: string
  description: "NUL-terminated string, up to 32 bytes"

- id: serial_number
  type: string
  description: "NUL-terminated string, up to 16 bytes"

- id: mac_address
  type: string
  description: "6-byte MAC address"

- id: lens_position_range
  type: object
  fields:
    - name: upper_limit
      type: integer
    - name: lower_limit
      type: integer
    - name: current_value
      type: integer

- id: lens_info
  type: bitfield
  description: "Lens operation status bits (lens memory, zoom, focus, lens shift H/V)"

- id: input_status
  type: object
  fields:
    - name: signal_switch_process
      type: integer
    - name: signal_list_number
      type: integer
    - name: selection_signal_type_1
      type: integer
    - name: selection_signal_type_2
      type: integer
    - name: signal_list_type
      type: integer
    - name: test_pattern_display
      type: integer
    - name: content_displayed
      type: integer

- id: cover_status
  type: enum
  values: [normal, cover_closed]

# UNRESOLVED: eco mode values mapping not stated in source appendix
# UNRESOLVED: aspect ratio values mapping not stated in source appendix
# UNRESOLVED: input terminal numeric codes not stated in source appendix
# UNRESOLVED: PIP/PBP sub-input values not stated in source appendix
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameter block identified in source; picture/volume/gain are action-based encapsulated commands
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited event notifications from the projector
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "While the power-on command is executing, no other command can be accepted (source: section 3.2)"
  - description: "While the power-off command is executing (including cooling time), no other command can be accepted (source: section 3.3)"
  - description: "Portrait cover side must not be up; interlock switch open state returned in extended error DATA09 (source: section 2.4)"
# UNRESOLVED: voltage/current/power specifications not stated in source
```

<!-- UNRESOLVED: exact numeric values for input terminals, aspect modes, eco mode, and sub-input settings — reference appendix "Supplementary Information by Command" not present in source. UNRESOLVED: wireless LAN unit specifications not in source. UNRESOLVED: serial default baud rate not stated (multiple rates supported but no default specified). UNRESOLVED: firmware version compatibility not stated. UNRESOLVED: ID2 model code values not enumerated in source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-27T05:44:15.333Z
last_checked_at: 2026-07-21T23:36:06.796Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T23:36:06.796Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim to source command reference; transport parameters verified; complete coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "final model name not stated; \"Exx2\" is a manufacturer-wide control protocol designation. Input terminal numeric codes reference an appendix not present in source."
- "no default stated in source; supported rates = 115200/38400/19200/9600/4800 bps"
- "eco mode values mapping not stated in source appendix"
- "aspect ratio values mapping not stated in source appendix"
- "input terminal numeric codes not stated in source appendix"
- "PIP/PBP sub-input values not stated in source appendix"
- "no standalone settable parameter block identified in source; picture/volume/gain are action-based encapsulated commands"
- "source documents no unsolicited event notifications from the projector"
- "no explicit multi-step macro sequences described in source"
- "voltage/current/power specifications not stated in source"
- "exact numeric values for input terminals, aspect modes, eco mode, and sub-input settings — reference appendix \"Supplementary Information by Command\" not present in source. UNRESOLVED: wireless LAN unit specifications not in source. UNRESOLVED: serial default baud rate not stated (multiple rates supported but no default specified). UNRESOLVED: firmware version compatibility not stated. UNRESOLVED: ID2 model code values not enumerated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
