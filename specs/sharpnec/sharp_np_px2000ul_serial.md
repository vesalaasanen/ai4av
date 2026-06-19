---
spec_id: admin/sharpnec-np-px2000ul
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP-PX2000UL Control Spec"
manufacturer: Sharp/NEC
model_family: NP-PX2000UL
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NP-PX2000UL
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:15:56.287Z
last_checked_at: 2026-06-18T08:53:44.787Z
generated_at: 2026-06-18T08:53:44.787Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input-terminal DATA01 value map (referenced from \"Appendix - Supplementary Information by Command\" which is not included in this refined source)"
  - "eco-mode DATA01 value map (referenced appendix not in source)"
  - "sub-input value maps for PiP/PbP (referenced appendix not in source)"
  - "base-model-type value map (referenced appendix not in source)"
  - "source pins RTS/CTS but does not state flow-control mode"
  - "enum values in source Appendix.\""
  - "none additional identified from source."
  - "no event/notification mechanism stated in source."
  - "none identified."
  - "no explicit safety interlock procedure, power-on sequencing requirement,"
  - "firmware version compatibility not stated in source"
  - "input-terminal / eco-mode / sub-input / base-model-type DATA value maps (referenced appendix absent)"
  - "serial flow_control mode not stated (RTS/CTS pinned but function unspecified)"
  - "ID2 model-code value for NP-PX2000UL not stated"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:53:44.787Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP-PX2000UL Control Spec

## Summary
Sharp/NEC NP-PX2000UL professional LCD projector, controlled via RS-232C serial (PC CONTROL D-SUB 9P) or wired/wireless LAN (TCP, port 7142). This spec covers the binary command catalogue documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1): power, input switching, mutes, picture/volume/aspect/lamp adjustments, lens shift/zoom/focus and lens-memory control, shutter, freeze, eco mode, edge blending, PiP/PbP, and a broad set of status/error queries.

<!-- UNRESOLVED: input-terminal DATA01 value map (referenced from "Appendix - Supplementary Information by Command" which is not included in this refined source) -->
<!-- UNRESOLVED: eco-mode DATA01 value map (referenced appendix not in source) -->
<!-- UNRESOLVED: sub-input value maps for PiP/PbP (referenced appendix not in source) -->
<!-- UNRESOLVED: base-model-type value map (referenced appendix not in source) -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # selectable; all five listed in source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: source pins RTS/CTS but does not state flow-control mode
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

**Frame format** (from §2.1): commands/responses are hex byte frames. A typical request frame is `<hdr> <cmd> 00h 00h <LEN> <DATA...> <CKS>`. Success response header = request-header + 20h. Error response header = request-header + 80h, carrying `<ERR1> <ERR2>`. `<ID1>` = control ID, `<ID2>` = model code (variable per model). `<CKS>` = low byte of the sum of all preceding bytes.

## Traits
```yaml
traits:
  - powerable    # inferred: 015 POWER ON / 016 POWER OFF present
  - routable     # inferred: 018 INPUT SW CHANGE present
  - queryable    # inferred: extensive status request commands present
  - levelable    # inferred: 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST present
  - mutable      # inferred: picture/sound/onscreen mute on/off present
```

## Actions
```yaml
# All commands are binary hex frames. <CKS> = checksum (low byte of sum of preceding bytes).
# <ID1>/<ID2> are inserted by the transport layer per projector; literal payloads below
# reproduce the fixed opcode bytes verbatim from the source. Variable DATA bytes are
# shown as {placeholders} and described in params.

actions:
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
    notes: "While turning on, no other command is accepted."

  - id: power_off
    label: "016. POWER OFF"
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "During power-off (incl. cooling time) no other command is accepted."

  - id: input_sw_change
    label: "018. INPUT SW CHANGE"
    kind: action
    command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "Input terminal byte (e.g. 06h = video port). Full map in source Appendix - not included here."
    notes: "Response DATA01 = FFh means ended with error (no switch made)."

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
        type: byte
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: data02
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data03
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: data04
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: volume_adjust
    label: "030-2. VOLUME ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
    params:
      - name: data01
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data02
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: data03
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: aspect_adjust
    label: "030-12. ASPECT ADJUST"
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
    params:
      - name: data01
        type: byte
        description: "Aspect value (map in source Appendix - not included here)"

  - id: other_adjust
    label: "030-15. OTHER ADJUST (LAMP/LIGHT ADJUST)"
    kind: action
    command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
    params:
      - name: data01
        type: byte
        description: "Adjustment target: DATA01=96h, DATA02=FFh for LAMP ADJUST / LIGHT ADJUST"
      - name: data02
        type: byte
        description: "Sub-target (FFh for LAMP/LIGHT ADJUST)"
      - name: data03
        type: byte
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data04
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: data05
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: information_request
    label: "037. INFORMATION REQUEST"
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Returns projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90)."

  - id: filter_usage_information_request
    label: "037-3. FILTER USAGE INFORMATION REQUEST"
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds; -1 if undefined."

  - id: lamp_information_request_3
    label: "037-4. LAMP INFORMATION REQUEST 3"
    kind: query
    command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: byte
        description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: data02
        type: byte
        description: "Content: 01h=lamp usage time (s), 04h=lamp remaining life (%)"
    notes: "If lamp replacement deadline exceeded, remaining life returned as negative."

  - id: carbon_savings_information_request
    label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: remote_key_code
    label: "050. REMOTE KEY CODE"
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: byte
        description: "Key code low byte (see source key-code table)"
      - name: data02
        type: byte
        description: "Key code high byte (typically 00h)"
    notes: "Response DATA01=FFh means ended with error."

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
        type: byte
        description: "Lens target (e.g. 06h=Periphery Focus)"
      - name: data02
        type: byte
        description: "00h=Stop, 01h/+1s, 02h/+0.5s, 03h/+0.25s, 7Fh=+continuous, 81h=-continuous, FDh/-0.25s, FEh/-0.5s, FFh/-1s"
    notes: "After 7Fh/81h, send 00h to stop."

  - id: lens_control_request
    label: "053-1. LENS CONTROL REQUEST"
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    params:
      - name: data01
        type: byte
        description: "Lens target to query"
    notes: "Returns upper/lower limits and current value (16-bit)."

  - id: lens_control_2
    label: "053-2. LENS CONTROL 2"
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: byte
        description: "Lens target (FFh=Stop; mode/value ignored when Stop)"
      - name: data02
        type: byte
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: data03
        type: byte
        description: "Adjustment value (low-order 8 bits)"
      - name: data04
        type: byte
        description: "Adjustment value (high-order 8 bits)"

  - id: lens_memory_control
    label: "053-3. LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: "053-4. REFERENCE LENS MEMORY CONTROL"
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Operates on the profile number selected via 053-10."

  - id: lens_memory_option_request
    label: "053-5. LENS MEMORY OPTION REQUEST"
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_memory_option_set
    label: "053-6. LENS MEMORY OPTION SET"
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: data02
        type: byte
        description: "Setting value: 00h=OFF, 01h=ON"

  - id: lens_information_request
    label: "053-7. LENS INFORMATION REQUEST"
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Returns lens operation status bitmask (Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V)."

  - id: lens_profile_set
    label: "053-10. LENS PROFILE SET"
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: byte
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
        type: byte
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"
    notes: "Returns adjustment status, range limits, default and current values, wide/narrow step widths."

  - id: setting_request
    label: "078-1. SETTING REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Returns base model type, sound function availability, profile/clock capability."

  - id: running_status_request
    label: "078-2. RUNNING STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Returns power status, cooling/power-on process state, operation status."

  - id: input_status_request
    label: "078-3. INPUT STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Returns signal switch process, signal list number, selection signal types, content displayed."

  - id: mute_status_request
    label: "078-4. MUTE STATUS REQUEST"
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Returns picture/sound/onscreen/forced-onscreen mute state and OSD display state."

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
    notes: "00h=Normal (cover opened), 01h=Cover closed."

  - id: freeze_control
    label: "079. FREEZE CONTROL"
    kind: action
    command: "01h 98h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "01h=freeze ON, 02h=freeze OFF"

  - id: information_string_request
    label: "084. INFORMATION STRING REQUEST"
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
    params:
      - name: data01
        type: byte
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  - id: eco_mode_request
    label: "097-8. ECO MODE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Returns eco/light/lamp mode value (map in source Appendix)."

  - id: lan_projector_name_request
    label: "097-45. LAN PROJECTOR NAME REQUEST"
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  - id: lan_mac_address_request_2
    label: "097-155. LAN MAC ADDRESS STATUS REQUEST 2"
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_pbp_request
    label: "097-198. PIP / PICTURE BY PICTURE REQUEST"
    kind: query
    command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
        type: byte
        description: "Eco mode value (map in source Appendix)."

  - id: lan_projector_name_set
    label: "098-45. LAN PROJECTOR NAME SET"
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01-data16} 00h {cks}"
    params:
      - name: name
        type: string
        description: "Projector name, up to 16 bytes (DATA01-DATA16), NUL-terminated"

  - id: pip_pbp_set
    label: "098-198. PIP / PICTURE BY PICTURE SET"
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: data02
        type: byte
        description: "Setting value (MODE: 00h=PIP/01h=PbP; START POSITION: 00h-03h corners; sub-input values per Appendix)"

  - id: edge_blending_mode_set
    label: "098-243-1. EDGE BLENDING MODE SET"
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
    params:
      - name: data01
        type: byte
        description: "00h=OFF, 01h=ON"

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
    notes: "Returns operation status, content displayed, signal types, video/sound/onscreen mute, freeze status."

  - id: audio_select_set
    label: "319-10. AUDIO SELECT SET"
    kind: action
    command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
    params:
      - name: data01
        type: byte
        description: "Input terminal (map in source Appendix)"
      - name: data02
        type: byte
        description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitmap
    description: "12-byte error status from command 009; bit=1 means error. See source error-information list (cover/fan/temp/power/lamp/formatter/mirror-cover/ballast/iris/interlock)."

  - id: power_status
    type: enum
    values: [standby, power_on]
    description: "DATA03 of 078-2 response: 00h=Standby, 01h=Power on, FFh=Not supported."

  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    description: "DATA06 of 078-2 response (00h/04h/05h/06h/0Fh/10h)."

  - id: mute_status
    type: composite
    description: "078-4 response: picture/sound/onscreen/forced-onscreen mute bits."

  - id: cover_status
    type: enum
    values: [normal_opened, cover_closed]
    description: "078-6 response DATA01."

  - id: lamp_usage_time
    type: integer
    unit: seconds
    description: "From 037 / 037-4 responses; updated at one-minute intervals."

  - id: lamp_remaining_life
    type: integer
    unit: percent
    description: "From 037-4 response; negative if replacement deadline exceeded."

  - id: filter_usage_time
    type: integer
    unit: seconds
    description: "From 037-3 response."

  - id: lens_operation_status
    type: bitmap
    description: "053-7 response DATA01 (memory/zoom/focus/shift-H/shift-V operation flags)."

  - id: eco_mode_value
    type: enum
    description: "097-8 response DATA01. # UNRESOLVED: enum values in source Appendix."

  - id: edge_blending_mode
    type: enum
    values: [off, on]
    description: "097-243-1 response DATA01."
```

## Variables
```yaml
# Settable parameters that are not discrete on/off actions are represented as
# parameterized Actions above (picture adjust, volume, aspect, lens shift/zoom/focus,
# lamp/light adjust, eco mode, projector name, audio select). No separate variable set.
# UNRESOLVED: none additional identified from source.
```

## Events
```yaml
# Source documents request/response only. No unsolicited notification frames described.
# UNRESOLVED: no event/notification mechanism stated in source.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
# UNRESOLVED: none identified.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes:
  - "Power-on and power-off sequences block all other commands while in progress (015/016)."
  - "Error code 02h 0Dh = 'command cannot be accepted because the power is off' - many commands require power on."
# UNRESOLVED: no explicit safety interlock procedure, power-on sequencing requirement,
# or voltage/current/power specs stated in this refined source.
```

## Notes
- Binary protocol; all frames carry a trailing checksum `<CKS>` = low byte of the sum of all preceding bytes (see §2.2 worked example).
- Response headers: success = request-header + 20h; error = request-header + 80h with `<ERR1> <ERR2>` per §2.4 error-code table (23 distinct error codes documented).
- ID1 = projector control ID; ID2 = model code (varies per model — not enumerated in source).
- Serial pinout: D-SUB 9P cross cable, pins 2/3 RXD/TXD, 5 GND, 7/8 RTS/CTS (see §1.1).
- LAN: RJ-45, auto-sensing 10/100 Mbps; TCP port 7142 for command send/receive.
- Several DATA01 value maps (input terminal, eco mode, sub-input, base-model-type) are referenced to a source "Appendix - Supplementary Information by Command" that is NOT present in this refined document.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: input-terminal / eco-mode / sub-input / base-model-type DATA value maps (referenced appendix absent) -->
<!-- UNRESOLVED: serial flow_control mode not stated (RTS/CTS pinned but function unspecified) -->
<!-- UNRESOLVED: ID2 model-code value for NP-PX2000UL not stated -->
````

Spec done. 53 actions, all hex payloads verbatim. UNRESOLVED markers on absent appendix value-maps + flow_control + model code.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:15:56.287Z
last_checked_at: 2026-06-18T08:53:44.787Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:53:44.787Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input-terminal DATA01 value map (referenced from \"Appendix - Supplementary Information by Command\" which is not included in this refined source)"
- "eco-mode DATA01 value map (referenced appendix not in source)"
- "sub-input value maps for PiP/PbP (referenced appendix not in source)"
- "base-model-type value map (referenced appendix not in source)"
- "source pins RTS/CTS but does not state flow-control mode"
- "enum values in source Appendix.\""
- "none additional identified from source."
- "no event/notification mechanism stated in source."
- "none identified."
- "no explicit safety interlock procedure, power-on sequencing requirement,"
- "firmware version compatibility not stated in source"
- "input-terminal / eco-mode / sub-input / base-model-type DATA value maps (referenced appendix absent)"
- "serial flow_control mode not stated (RTS/CTS pinned but function unspecified)"
- "ID2 model-code value for NP-PX2000UL not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
