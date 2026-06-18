---
spec_id: admin/sharp-nec-ld-fa152-f
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LD Fa152 F Control Spec"
manufacturer: Sharp/NEC
model_family: "LD Fa152 F"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LD Fa152 F"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:33:06.082Z
last_checked_at: 2026-06-17T20:02:58.842Z
generated_at: 2026-06-17T20:02:58.842Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact marketing model string not printed in the source text (only doc number BDT140013 Rev 7.1); model taken from device metadata."
  - "firmware compatibility range not stated."
  - "input-terminal / aspect / eco-mode / base-model-type / sub-input value tables live in an \"Appendix: Supplementary Information by Command\" that is not present in the refined source; those enum values are not captured here."
  - "flow-control mode not stated; RTS/CTS pins are wired in the D-SUB 9P pinout (pin 7 RTS, pin 8 CTS) but the communication-conditions table lists only baud/data/parity/stop/full-duplex"
  - "flow_control mode not explicitly stated (RTS/CTS wired but not listed in comm table)."
  - "input-terminal, aspect, eco-mode, base-model-type, and sub-input value enums live in an Appendix (\"Supplementary Information by Command\") absent from the refined source."
  - "default baud rate among the five supported values not stated."
  - "exact model marketing string not printed in source body."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:02:58.842Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim hex commands in source; transport (baud/data/parity/stop/TCP port 7142) fully verified; bidirectional coverage complete. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LD Fa152 F Control Spec

## Summary
Projector control spec for the Sharp/NEC LD Fa152 F, based on the vendor Projector Control Command Reference Manual (BDT140013 Rev 7.1). The device is controllable over RS-232C serial and wired/wireless LAN (TCP). Commands are binary hex frames; responses carry a success/error prefix, the projector's control ID and model code, and a trailing checksum byte. This spec enumerates all 53 documented commands.

<!-- UNRESOLVED: exact marketing model string not printed in the source text (only doc number BDT140013 Rev 7.1); model taken from device metadata. -->
<!-- UNRESOLVED: firmware compatibility range not stated. -->
<!-- UNRESOLVED: input-terminal / aspect / eco-mode / base-model-type / sub-input value tables live in an "Appendix: Supplementary Information by Command" that is not present in the refined source; those enum values are not captured here. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [4800, 9600, 19200, 38400, 115200]  # all supported per source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow-control mode not stated; RTS/CTS pins are wired in the D-SUB 9P pinout (pin 7 RTS, pin 8 CTS) but the communication-conditions table lists only baud/data/parity/stop/full-duplex
addressing:
  port: 7142  # TCP port for command send/receive over LAN
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred: POWER ON / POWER OFF commands present
  - queryable   # inferred: many status/information request commands present
  - levelable   # inferred: VOLUME ADJUST, PICTURE ADJUST (brightness/contrast/color/hue/sharpness), LAMP ADJUST present
```

## Actions
```yaml
# Frame format (sent): fixed hex bytes; parameterized DATA fields shown as <DATA##>.
# Trailing <CKS> = checksum = low-order byte of the sum of all preceding bytes.
# Command sent frames do NOT carry ID1/ID2; those appear only in responses.
# Response success prefix mirrors command type (00h->20h, 01h->21h, 02h->22h, 03h->23h);
# error prefix is A0h/A1h/A2h/A3h with <ERR1> <ERR2>.

actions:
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
    notes: While powering on, no other command is accepted.

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: During power-off (incl. cooling time), no other command is accepted.

  - id: input_sw_change
    label: Input SW Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Input terminal value (e.g. 06h = video port). Full value list in Appendix "Supplementary Information by Command" (not in refined source).

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
        description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h absolute, 01h relative"
      - name: DATA03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA04
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment mode: 00h absolute, 01h relative"
      - name: DATA02
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA03
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Aspect value (enum in Appendix, not in refined source)

  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Adjustment target: 96h LAMP ADJUST / LIGHT ADJUST"
      - name: DATA02
        type: integer
        description: Adjustment mode (FFh fixed in target row; see source)
      - name: DATA03
        type: integer
        description: "Adjustment mode: 00h absolute, 01h relative"
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
    notes: Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90).

  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds; -1 if undefined.

  - id: lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Lamp selector: 00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
      - name: DATA02
        type: integer
        description: "Content: 01h lamp usage time (seconds), 04h lamp remaining life (%)"

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h Total Carbon Savings, 01h Carbon Savings during operation"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Key code low byte (WORD). Examples: 02h POWER ON, 03h POWER OFF, 05h AUTO, 06h MENU, 07h UP, 08h DOWN, 09h RIGHT, 0Ah LEFT, 0Bh ENTER, 0Ch EXIT, 0Dh HELP, 0Fh MAGNIFY UP, 10h MAGNIFY DOWN, 13h MUTE, 29h PICTURE, 4Bh COMPUTER1, 4Ch COMPUTER2, 4Fh VIDEO1, 51h S-VIDEO1, 84h VOLUME UP, 85h VOLUME DOWN, 8Ah FREEZE, A3h ASPECT, D7h SOURCE, EEh LAMP MODE/ECO"
      - name: DATA02
        type: integer
        description: Key code high byte (00h for all listed keys)

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
        description: "Adjustment target (e.g. 06h Periphery Focus)"
      - name: DATA02
        type: integer
        description: "Content: 00h Stop, 01h drive +1s, 02h drive +0.5s, 03h drive +0.25s, 7Fh drive +continuous, 81h drive -continuous, FDh drive -0.25s, FEh drive -0.5s, FFh drive -1s"

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: Adjustment target

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "FFh Stop (mode/value ignored), else adjustment target"
      - name: DATA02
        type: integer
        description: "Adjustment mode: 00h absolute, 02h relative"
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
        description: "00h MOVE, 01h STORE, 02h RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h MOVE, 01h STORE, 02h RESET (acts on profile set via LENS PROFILE SET)"

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
      - name: DATA02
        type: integer
        description: "Setting value: 00h OFF, 01h ON"

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: Returns lens operation bitmask (lens memory/zoom/focus/lens shift H+V stop vs in-operation).

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Profile number: 00h Profile 1, 01h Profile 2"

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
      - name: DATA01
        type: integer
        description: "Adjusted value name: 00h BRIGHTNESS, 01h CONTRAST, 02h COLOR, 03h HUE, 04h SHARPNESS, 05h VOLUME, 96h LAMP/LIGHT ADJUST"

  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: Returns base model type (DATA01-03), sound function (DATA04), profile/clock/sleep (DATA05).

  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: Returns power status, cooling process, power on/off process, operation status.

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
      - name: DATA01
        type: integer
        description: "01h freeze on, 02h freeze off"

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Information type: 03h Horizontal synchronous frequency, 04h Vertical synchronous frequency"

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
    label: PIP/Picture By Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"

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
      - name: DATA01
        type: integer
        description: Eco mode value (enum in Appendix, not in refined source)

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
    params:
      - name: DATA01_16
        type: string
        description: Projector name (up to 16 bytes, NUL-terminated)

  - id: pip_picture_by_picture_set
    label: PIP/Picture By Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
      - name: DATA02
        type: integer
        description: "Setting value (MODE: 00h PIP/01h PbP; START POSITION: 00h TL/01h TR/02h BL/03h BR; sub-input enums in Appendix)"

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    params:
      - name: DATA01
        type: integer
        description: "Setting value: 00h OFF, 01h ON"

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
      - name: DATA01
        type: integer
        description: Input terminal (enum in Appendix, not in refined source)
      - name: DATA02
        type: integer
        description: "Setting value: 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitmask
    response: "20h 88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>"
    description: 12 data bytes of error information (DATA01-12); bit set to 1 = error. Covers cover/fan/temperature/power/lamp/formatter/mirror-cover/iris/interlock/system errors.

  - id: power_state
    type: enum
    values: [standby, power_on]
    response: running_status_request DATA03 (00h Standby, 01h Power on, FFh Not supported)

  - id: running_status
    type: enum
    response: running_status_request DATA06 (00h Standby Sleep, 04h Power on, 05h Cooling, 06h Standby error, 0Fh Standby power saving, 10h Network standby)

  - id: mute_status
    type: object
    response: mute_status_request DATA01-05 (picture/sound/onscreen/forced-onscreen/onscreen-display, each 00h Off / 01h On)

  - id: input_status
    type: object
    response: input_status_request DATA01-09 (signal switch, list number, signal types, test pattern, content displayed)

  - id: cover_status
    type: enum
    values: [normal_open, closed]
    response: cover_status_request DATA01 (00h Normal/open, 01h Cover closed)

  - id: lamp_usage
    type: integer
    unit: seconds
    response: lamp_information_request_3 DATA03-06 (updated at 1-minute intervals)

  - id: lamp_remaining_life
    type: integer
    unit: percent
    response: lamp_information_request_3 (content 04h); negative if replacement deadline exceeded

  - id: filter_usage
    type: integer
    unit: seconds
    response: filter_usage_information_request DATA01-04

  - id: lens_position
    type: object
    response: lens_control_request DATA02-07 (upper/lower limit + current value, 16-bit)

  - id: lens_operation
    type: bitmask
    response: lens_information_request DATA01 (lens memory/zoom/focus/lens shift H+V: 0 stop / 1 in-operation)

  - id: gain_parameter
    type: object
    response: gain_parameter_request_3 DATA01-16 (status, upper/lower/default/current limits, wide/narrow adjustment widths)

  - id: model_name
    type: string
    response: model_name_request DATA01-32 (NUL-terminated)

  - id: projector_name
    type: string
    response: lan_projector_name_request DATA01-17 (NUL-terminated)

  - id: mac_address
    type: string
    response: lan_mac_address_status_request2 DATA01-06

  - id: serial_number
    type: string
    response: serial_number_request DATA01-16 (NUL-terminated)

  - id: base_model_type
    type: object
    response: base_model_type_request DATA01-15 (base model type + model name)

  - id: eco_mode
    type: enum
    response: eco_mode_request DATA01 (enum in Appendix)

  - id: pip_pbp_state
    type: object
    response: pip_picture_by_picture_request (mode/start-position/sub-inputs)

  - id: edge_blending_mode
    type: enum
    values: [off, on]
    response: edge_blending_mode_request DATA01 (00h OFF, 01h ON)

  - id: sync_frequencies
    type: object
    response: information_string_request (DATA01=03h horizontal, 04h vertical sync frequency strings)

  - id: error_response
    type: object
    response: "A0h/A1h/A2h/A3h <cmd> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
    description: "ERR1/ERR2 code pairs (see source §2.4): 00h/00h unrecognized, 00h/01h unsupported by model, 01h/00h invalid value, 01h/01h invalid input terminal, 02h/0Dh command rejected (power off), 02h/0Eh execution failed, 02h/0Fh no authority, 03h/00h incorrect gain number, etc."
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    description: Sound volume (set via volume_adjust, absolute/relative)
  - id: brightness
    type: integer
    description: Picture brightness (picture_adjust DATA01=00h)
  - id: contrast
    type: integer
    description: Picture contrast (picture_adjust DATA01=01h)
  - id: color
    type: integer
    description: Picture color (picture_adjust DATA01=02h)
  - id: hue
    type: integer
    description: Picture hue (picture_adjust DATA01=03h)
  - id: sharpness
    type: integer
    description: Picture sharpness (picture_adjust DATA01=04h)
  - id: lamp_light_adjust
    type: integer
    description: Lamp/Light adjust level (other_adjust DATA01=96h)
  - id: eco_mode
    type: enum
    description: Eco / Light / Lamp mode (eco_mode_set)
  - id: projector_name
    type: string
    description: LAN projector name (up to 16 bytes, lan_projector_name_set)
```

## Events
```yaml
# No unsolicited notifications documented in source. All responses are solicited (command -> response).
events: []
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes command-acceptance interlocks (not safety interlocks per se):
#  - POWER ON: while turning on, no other command accepted.
#  - POWER OFF: during power-off incl. cooling time, no other command accepted.
#  - Several commands rejected with ERR 02h/0Dh when power is off.
# No voltage/current/power, lamp-handling, or power-on sequencing safety warnings present in the refined source.
```

## Notes
- **Frame format:** commands are binary hex. Sent frames do not include ID1/ID2; responses do (`<ID1>` = projector control ID, `<ID2>` = model code).
- **Checksum (CKS):** low-order one byte of the sum of all preceding bytes. Example from source: `20h+81h+01h+60h+01h+00h = 103h` → CKS = `03h`.
- **Response prefixes:** success = `20h/21h/22h/23h` (mirrors command type `00h/01h/02h/03h`); error = `A0h/A1h/A2h/A3h` carrying `<ERR1> <ERR2>`.
- **Serial:** RS-232C cross cable to PC CONTROL port (D-SUB 9P); pins 2 RxD, 3 TxD, 5 GND, 7 RTS, 8 CTS.
- **LAN:** wired (RJ-45, 10/100 Mbps auto) or wireless LAN unit; TCP port 7142.
- **Lens control:** after a continuous-drive (`7Fh`/`81h`) lens_control, send `00h` to stop.
- **Usage-time granularity:** lamp/filter usage returned in seconds, updated at 1-minute intervals.

<!-- UNRESOLVED: flow_control mode not explicitly stated (RTS/CTS wired but not listed in comm table). -->
<!-- UNRESOLVED: input-terminal, aspect, eco-mode, base-model-type, and sub-input value enums live in an Appendix ("Supplementary Information by Command") absent from the refined source. -->
<!-- UNRESOLVED: default baud rate among the five supported values not stated. -->
<!-- UNRESOLVED: exact model marketing string not printed in source body. -->
````

Spec output above. 53 commands cataloged verbatim from source. Binary hex payloads carried in `command:` field; `<CKS>` checksum rule + frame format documented in Notes. Serial + TCP both populated (port 7142 + full RS-232C config explicitly stated). Appendix enum tables (input/aspect/eco/base-model/sub-input) absent from refined source → marked UNRESOLVED, no values fabricated.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T17:33:06.082Z
last_checked_at: 2026-06-17T20:02:58.842Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:02:58.842Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim hex commands in source; transport (baud/data/parity/stop/TCP port 7142) fully verified; bidirectional coverage complete. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact marketing model string not printed in the source text (only doc number BDT140013 Rev 7.1); model taken from device metadata."
- "firmware compatibility range not stated."
- "input-terminal / aspect / eco-mode / base-model-type / sub-input value tables live in an \"Appendix: Supplementary Information by Command\" that is not present in the refined source; those enum values are not captured here."
- "flow-control mode not stated; RTS/CTS pins are wired in the D-SUB 9P pinout (pin 7 RTS, pin 8 CTS) but the communication-conditions table lists only baud/data/parity/stop/full-duplex"
- "flow_control mode not explicitly stated (RTS/CTS wired but not listed in comm table)."
- "input-terminal, aspect, eco-mode, base-model-type, and sub-input value enums live in an Appendix (\"Supplementary Information by Command\") absent from the refined source."
- "default baud rate among the five supported values not stated."
- "exact model marketing string not printed in source body."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
