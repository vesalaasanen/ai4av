---
spec_id: admin/sharp-nec-led-e025i-217in
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED E025I 217In Control Spec"
manufacturer: Sharp/NEC
model_family: "Sharp/NEC LED E025I 217In"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Sharp/NEC LED E025I 217In"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T08:44:44.839Z
last_checked_at: 2026-06-17T20:11:44.215Z
generated_at: 2026-06-17T20:11:44.215Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device name in source doc only says \"projector\"; \"LED E025I 217In\" supplied by operator, not corroborated inside the source text"
  - "input terminal value table referenced as \"Supplementary Information by Command\" appendix not present in refined source"
  - "ID2 model code value not stated in source (varies by model)"
  - "source states \"Full duplex\" communication mode but no explicit flow-control line"
  - "appendix values not present in source\""
  - "appendix values not present in source"
  - "no unsolicited notification mechanism described in source - all responses are command echoes"
  - "no multi-step sequences explicitly described in source"
  - "no explicit power-on sequencing requirement stated; only command-acceptance interlocks derived"
  - "input-terminal value table (DATA01 for 018/319-10) lives in \"Supplementary Information by Command\" appendix not included in refined source"
  - "aspect value table lives in same appendix — not present"
  - "eco mode value table lives in same appendix — not present"
  - "ID2 model code for this specific model not stated"
  - "firmware version compatibility not stated in source"
  - "voltage / current / power specs not in this command reference (likely in operation manual)"
verification:
  verdict: verified
  checked_at: 2026-06-17T20:11:44.215Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match verbatim command opcodes in source; all transport parameters verified; spec covers source completely. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED E025I 217In Control Spec

## Summary
Sharp/NEC projector (BDT140013 Rev 7.1 command reference) controllable via RS-232C serial and TCP/IP (wired/wireless LAN, TCP port 7142). Spec covers the binary hex command set: power, input switching, mutes, picture/volume/aspect/gain adjust, lens control & memory, status queries, eco mode, PIP/PbP, edge blending, and audio select.

<!-- UNRESOLVED: device name in source doc only says "projector"; "LED E025I 217In" supplied by operator, not corroborated inside the source text -->
<!-- UNRESOLVED: input terminal value table referenced as "Supplementary Information by Command" appendix not present in refined source -->
<!-- UNRESOLVED: ID2 model code value not stated in source (varies by model) -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # source lists supported rates 115200/38400/19200/9600/4800; 9600 chosen as a stated supported option
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Full duplex" communication mode but no explicit flow-control line
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: numerous request/query commands returning state
  - levelable    # inferred: PICTURE ADJUST, VOLUME ADJUST, gain adjustments
```

## Actions
```yaml
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

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []

  - id: input_sw_change
    label: Input SW Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Input terminal value (e.g. 06h = video). Full list in appendix 'Supplementary Information by Command'. # UNRESOLVED: appendix values not present in source"
      - name: cks
        type: string
        description: "Checksum = low-order byte of sum of all preceding bytes"

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
    command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: string
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: data02
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data03
        type: string
        description: "Adjustment value (low-order 8 bits)"
      - name: data04
        type: string
        description: "Adjustment value (high-order 8 bits)"
      - name: cks
        type: string
        description: "Checksum (low-order byte of sum of preceding bytes)"

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
    params:
      - name: data01
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data02
        type: string
        description: "Adjustment value (low-order 8 bits)"
      - name: data03
        type: string
        description: "Adjustment value (high-order 8 bits)"
      - name: cks
        type: string
        description: "Checksum"

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Aspect value. Full list in appendix 'Supplementary Information by Command'. # UNRESOLVED: appendix values not present in source"
      - name: cks
        type: string
        description: "Checksum"

  - id: other_adjust
    label: Other Adjust (Lamp/Light Gain)
    kind: action
    command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
    params:
      - name: data01
        type: string
        description: "Adjustment target high byte: 96h with DATA02=FFh = LAMP ADJUST / LIGHT ADJUST"
      - name: data02
        type: string
        description: "Adjustment target low byte: FFh"
      - name: data03
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data04
        type: string
        description: "Adjustment value (low-order 8 bits)"
      - name: data05
        type: string
        description: "Adjustment value (high-order 8 bits)"
      - name: cks
        type: string
        description: "Checksum"

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
    command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Lamp selector: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: data02
        type: string
        description: "Content: 01h=usage time (sec), 04h=remaining life (%)"
      - name: cks
        type: string
        description: "Checksum"

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
      - name: cks
        type: string
        description: "Checksum"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Key code low byte (WORD key code list: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO)"
      - name: data02
        type: string
        description: "Key code high byte (00h for all listed keys)"
      - name: cks
        type: string
        description: "Checksum"

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
        description: "Target: 06h=Periphery Focus"
      - name: data02
        type: string
        description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
      - name: cks
        type: string
        description: "Checksum"

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Target (e.g. 06h=Periphery Focus)"
      - name: cks
        type: string
        description: "Checksum"

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: string
        description: "Target (FFh=Stop)"
      - name: data02
        type: string
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: data03
        type: string
        description: "Adjustment value (low-order 8 bits)"
      - name: data04
        type: string
        description: "Adjustment value (high-order 8 bits)"
      - name: cks
        type: string
        description: "Checksum"

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
      - name: cks
        type: string
        description: "Checksum"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
      - name: cks
        type: string
        description: "Checksum"

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: cks
        type: string
        description: "Checksum"

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: data02
        type: string
        description: "Setting value: 00h=OFF, 01h=ON"
      - name: cks
        type: string
        description: "Checksum"

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"
      - name: cks
        type: string
        description: "Checksum"

  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
    params:
      - name: data01
        type: string
        description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
      - name: cks
        type: string
        description: "Checksum"

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
    command: "01h 98h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "01h=freeze on, 02h=freeze off"
      - name: cks
        type: string
        description: "Checksum"

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
    params:
      - name: data01
        type: string
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"
      - name: cks
        type: string
        description: "Checksum"

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

  - id: lan_mac_address_status_request_2
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  - id: pip_picture_by_picture_request
    label: PIP / Picture By Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: cks
        type: string
        description: "Checksum"

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Eco mode value. Full list in appendix 'Supplementary Information by Command'. # UNRESOLVED: appendix values not present in source"
      - name: cks
        type: string
        description: "Checksum"

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01..data16} 00h {cks}"
    params:
      - name: data01..data16
        type: string
        description: "Projector name (up to 16 bytes)"
      - name: cks
        type: string
        description: "Checksum"

  - id: pip_picture_by_picture_set
    label: PIP / Picture By Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: data02
        type: string
        description: "Setting value (MODE: 00h=PIP, 01h=PbP; START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT; sub input values per appendix)"
      - name: cks
        type: string
        description: "Checksum"

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Setting value: 00h=OFF, 01h=ON"
      - name: cks
        type: string
        description: "Checksum"

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
    command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Input terminal value (see appendix 'Supplementary Information by Command'). # UNRESOLVED: appendix values not present in source"
      - name: data02
        type: string
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
      - name: cks
        type: string
        description: "Checksum"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, power_on]
    # from 078-2 RUNNING STATUS REQUEST DATA03: 00h=Standby, 01h=Power on
  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    # from 078-2 / 305-3 DATA01
  - id: cooling_process
    type: enum
    values: [not_executed, during_execution]
  - id: picture_mute_state
    type: enum
    values: [off, on]
    # from 078-4 MUTE STATUS REQUEST DATA01
  - id: sound_mute_state
    type: enum
    values: [off, on]
    # from 078-4 DATA02
  - id: onscreen_mute_state
    type: enum
    values: [off, on]
    # from 078-4 DATA03
  - id: freeze_state
    type: enum
    values: [off, on]
    # from 305-3 DATA09
  - id: cover_status
    type: enum
    values: [normal_opened, cover_closed]
    # from 078-6 COVER STATUS REQUEST DATA01
  - id: lamp_remaining_life_percent
    type: number
    # from 037-4 LAMP INFORMATION REQUEST 3 (DATA02=04h); negative if past replacement deadline
  - id: error_flags
    type: bitmap
    description: "DATA01-DATA12 bitmap from 009 ERROR STATUS REQUEST - cover/fan/temperature/lamp/iris errors per error information list"
  - id: eco_mode_value
    type: enum
    # from 097-8 ECO MODE REQUEST; values in appendix # UNRESOLVED: appendix values not present in source
```

## Variables
```yaml
variables:
  - id: brightness
    description: "PICTURE / BRIGHTNESS (adjust target 00h)"
    # read via 060-1 with DATA01=00h; set via 030-1
  - id: contrast
    description: "PICTURE / CONTRAST (adjust target 01h)"
  - id: color
    description: "PICTURE / COLOR (adjust target 02h)"
  - id: hue
    description: "PICTURE / HUE (adjust target 03h)"
  - id: sharpness
    description: "PICTURE / SHARPNESS (adjust target 04h)"
  - id: volume
    description: "Sound volume (adjust target 05h)"
  - id: lamp_light_adjust
    description: "LAMP ADJUST / LIGHT ADJUST (adjust target 96h)"
```

## Events
```yaml
events: []
# UNRESOLVED: no unsolicited notification mechanism described in source - all responses are command echoes
```

## Macros
```yaml
macros: []
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "POWER ON: while command is turning on power, no other command accepted"
  - "POWER OFF: while turning off (including cooling time), no other command accepted"
  - "DATA09 bit1 of error status: interlock switch open is reported as error condition"
# UNRESOLVED: no explicit power-on sequencing requirement stated; only command-acceptance interlocks derived
```

## Notes
- Commands and responses use binary hex frames: `20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>`. `<ID1>` is the configured control ID; `<ID2>` is model code (varies by model).
- Checksum `<CKS>` = low-order byte (8 bits) of the sum of all preceding bytes. Example: `20h+81h+01h+60h+01h+00h = 103h` → CKS = `03h`.
- Response framing prefix: `A0h`/`A1h`/`A2h`/`A3h` indicate error response category paired with the command opcode; `20h`/`21h`/`22h`/`23h` are normal responses.
- Lamp usage time and filter usage time returned in seconds; updated by projector at 1-minute intervals.
- Lamp remaining life (%) returned negative once replacement deadline exceeded.
- Lens `+/-continuous` (7Fh/81h) drive requires explicit Stop (00h) afterwards.
- Error code table (ERR1/ERR2) covers 25 distinct error combinations (unrecognized cmd, unsupported, invalid value, invalid input, invalid language, memory errors, forced onscreen mute, no signal, power off rejection, no authority, gain errors, adjustment failed, etc.).
- Source doc says "projector" throughout (BDT140013 Rev 7.1). LED E025I 217In model name supplied externally.

<!-- UNRESOLVED: input-terminal value table (DATA01 for 018/319-10) lives in "Supplementary Information by Command" appendix not included in refined source -->
<!-- UNRESOLVED: aspect value table lives in same appendix — not present -->
<!-- UNRESOLVED: eco mode value table lives in same appendix — not present -->
<!-- UNRESOLVED: ID2 model code for this specific model not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: voltage / current / power specs not in this command reference (likely in operation manual) -->
```

Spec generated. 53 actions covering all commands in source BDT140013 Rev 7.1. Serial + TCP both populated (port 7142 stated). Major gap = "Supplementary Information by Command" appendix referenced but not in refined source.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T08:44:44.839Z
last_checked_at: 2026-06-17T20:11:44.215Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:11:44.215Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match verbatim command opcodes in source; all transport parameters verified; spec covers source completely. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device name in source doc only says \"projector\"; \"LED E025I 217In\" supplied by operator, not corroborated inside the source text"
- "input terminal value table referenced as \"Supplementary Information by Command\" appendix not present in refined source"
- "ID2 model code value not stated in source (varies by model)"
- "source states \"Full duplex\" communication mode but no explicit flow-control line"
- "appendix values not present in source\""
- "appendix values not present in source"
- "no unsolicited notification mechanism described in source - all responses are command echoes"
- "no multi-step sequences explicitly described in source"
- "no explicit power-on sequencing requirement stated; only command-acceptance interlocks derived"
- "input-terminal value table (DATA01 for 018/319-10) lives in \"Supplementary Information by Command\" appendix not included in refined source"
- "aspect value table lives in same appendix — not present"
- "eco mode value table lives in same appendix — not present"
- "ID2 model code for this specific model not stated"
- "firmware version compatibility not stated in source"
- "voltage / current / power specs not in this command reference (likely in operation manual)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
