---
spec_id: admin/sharp-nec-v754q-avt3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC V754Q Avt3 Control Spec"
manufacturer: Sharp/NEC
model_family: "V754Q Avt3"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "V754Q Avt3"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:25:26.148Z
last_checked_at: 2026-06-18T09:14:18.836Z
generated_at: 2026-06-18T09:14:18.836Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal enum values, aspect values, eco mode values, base model type values, and sub-input setting values are defined in the source's \"Supplementary Information by Command\" appendix, which is NOT present in the refined document. Parameter slots are emitted but enum value lists are unresolved."
  - "flow control not stated in source (full-duplex mode only stated)"
  - "input terminal value list not present in refined source"
  - "aspect value list not present in refined source"
  - "eco mode value list not present in refined source"
  - "sub-input setting value list not present in refined source"
  - "no additional continuous variables beyond action parameters identified in source."
  - "source describes no unsolicited notifications; all responses are"
  - "source describes no multi-step command sequences."
  - "no voltage/current/power specs, no full power-on sequencing procedure stated."
  - "\"Supplementary Information by Command\" appendix (input terminal, aspect, eco mode, base model type, sub-input values) not present in refined source."
  - "full lens axis enum for 053 LENS CONTROL (only 06h Periphery Focus shown) not present."
  - "firmware version compatibility range not stated."
  - "protocol version (BDT140013 Rev 7.1) is manual revision, not device protocol version."
verification:
  verdict: verified
  checked_at: 2026-06-18T09:14:18.836Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC V754Q Avt3 Control Spec

## Summary
Commercial projector (Sharp/NEC V754Q Avt3) controllable via RS-232C serial and TCP/IP LAN. Binary, checksummed command protocol framed as `{lead} {cmd} 00h 00h {LEN} {DATA...} {CKS}`. This spec covers the full BDT140013 Rev 7.1 command catalogue: power, input switching, mute, picture/volume/aspect adjust, lens control & memory, shutter, freeze, eco mode, edge blending, PiP/PbP, and status/error queries.

<!-- UNRESOLVED: input terminal enum values, aspect values, eco mode values, base model type values, and sub-input setting values are defined in the source's "Supplementary Information by Command" appendix, which is NOT present in the refined document. Parameter slots are emitted but enum value lists are unresolved. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600  # source supports 4800/9600/19200/38400/115200; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source (full-duplex mode only stated)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON / POWER OFF commands present
  - queryable    # inferred: many status request commands present
  - levelable    # inferred: VOLUME ADJUST / PICTURE ADJUST present
  - routable     # inferred: INPUT SW CHANGE / AUDIO SELECT SET present
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
        description: Input terminal byte (e.g. 06h = video port). Full enum in appendix.
        # UNRESOLVED: input terminal value list not present in refined source

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
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data04
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
    params:
      - name: data01
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data02
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data03
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
    params:
      - name: data01
        type: string
        description: Value set for the aspect.
        # UNRESOLVED: aspect value list not present in refined source

  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
    params:
      - name: data01
        type: string
        description: "Adjustment target (96h = LAMP ADJUST / LIGHT ADJUST)"
      - name: data02
        type: string
        description: "Sub-target (FFh for lamp/light)"
      - name: data03
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data04
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data05
        type: integer
        description: Adjustment value (high-order 8 bits)

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
        description: "Content: 01h=usage time (s), 04h=remaining life (%)"

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Key code low byte (e.g. 05h=AUTO, 0Dh=HELP, 29h=PICTURE, 4Bh=COMPUTER1)"
      - name: data02
        type: string
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
    command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "Lens axis (06h = Periphery Focus listed; other axes referenced)"
      - name: data02
        type: string
        description: "Drive content: 00h=Stop, 01h/02h/03h=+1s/+0.5s/+0.25s, 7Fh=+, 81h=-, FDh/FEh/FFh=-0.25s/-0.5s/-1s"

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
    params:
      - name: data01
        type: string
        description: Lens axis selector

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
    params:
      - name: data01
        type: string
        description: "FFh = Stop; otherwise lens axis selector"
      - name: data02
        type: string
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: data03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: data04
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

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

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
    params:
      - name: data01
        type: string
        description: "Information type: 03h=horizontal sync frequency, 04h=vertical sync frequency"

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

  - id: pip_pbp_request
    label: PIP/Picture-by-Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
        description: Value set for the eco mode.
        # UNRESOLVED: eco mode value list not present in refined source

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01} {data02} {data03} {data04} {data05} {data06} {data07} {data08} {data09} {data10} {data11} {data12} {data13} {data14} {data15} {data16} 00h {cks}"
    params:
      - name: data01
        type: string
        description: Projector name byte 1 (up to 16 bytes total, NUL-terminated)

  - id: pip_pbp_set
    label: PIP/Picture-by-Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
    params:
      - name: data01
        type: string
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: data02
        type: string
        description: "Setting value (MODE: 00h=PIP,01h=PbP; START POSITION: 00h-03h; sub-input value for others)"
        # UNRESOLVED: sub-input setting value list not present in refined source

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
    params:
      - name: data01
        type: string
        description: "Setting value: 00h=OFF, 01h=ON"

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
        description: Input terminal byte.
        # UNRESOLVED: input terminal value list not present in refined source
      - name: data02
        type: string
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitmask
    description: 12-byte error bitmap (DATA01-DATA12). Bit set = error.
    fields:
      - data01_bit0: cover error
      - data01_bit3: fan error
      - data01_bit4: fan error
      - data01_bit5: power error
      - data01_bit6: lamp/backlight off
      - data01_bit7: lamp in replacement moratorium
      - data02_bit0: lamp usage time exceeded
      - data02_bit1: formatter error
      - data02_bit2: lamp 2 off
      - data03_bit2: temperature error (sensor)
      - data03_bit5: mirror cover error
      - data03_bit7: lamp 2 usage time exceeded
      - data04_bit5: ballast communication error
      - data09_bit1: interlock switch open
      - data09_bit2: system error (slave CPU)
      - data09_bit3: system error (formatter)

  - id: command_error
    type: enum
    description: Returned in ERR1/ERR2 bytes on command failure.
    values:
      - "00h 00h: command not recognized"
      - "00h 01h: command not supported by model"
      - "01h 00h: specified value invalid"
      - "01h 01h: specified input terminal invalid"
      - "01h 02h: specified language invalid"
      - "02h 00h: memory allocation error"
      - "02h 02h: memory in use"
      - "02h 03h: specified value cannot be set"
      - "02h 04h: forced onscreen mute on"
      - "02h 06h: viewer error"
      - "02h 07h: no signal"
      - "02h 08h: test pattern or filter displayed"
      - "02h 09h: no PC card inserted"
      - "02h 0Ah: memory operation error"
      - "02h 0Ch: entry list displayed"
      - "02h 0Dh: command not accepted (power off)"
      - "02h 0Eh: command execution failed"
      - "02h 0Fh: no authority for operation"
      - "03h 00h: specified gain number incorrect"
      - "03h 01h: specified gain invalid"
      - "03h 02h: adjustment failed"

  - id: power_status
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]

  - id: mute_status
    type: bitmask
    fields: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute, onscreen_display]

  - id: cover_status
    type: enum
    values: [normal_open, cover_closed]
```

## Variables
```yaml
# Discrete settables already modelled as actions (volume, picture gains, eco mode,
# aspect, lens position, lens memory, edge blending, PiP/PbP, projector name).
# UNRESOLVED: no additional continuous variables beyond action parameters identified in source.
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications; all responses are
# command-acknowledgement only.
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source: cooling time follows, no other commands accepted during
interlocks:
  - power_on_in_progress: "While POWER ON is executing, no other command accepted."
  - power_off_cooling: "While POWER OFF is executing (incl. cooling time), no other command accepted."
  - lens_drive_continuous: "After 7Fh/81h lens drive, must send 00h to stop."
# UNRESOLVED: no voltage/current/power specs, no full power-on sequencing procedure stated.
```

## Notes
- Command frame: `{lead} {cmd} 00h 00h {LEN} {DATA...} {CKS}`. Lead byte indicates message class (00h=GET/query-no-data, 01h=set-1-byte, 02h=set-action, 03h=set-with-data/query-with-data). Response leads mirror with high nibble A/2/3 (Ax = error, 2x = ack).
- Checksum = low-order byte of sum of all preceding bytes (incl. lead, cmd, zeros, LEN, DATA).
- Baud rate is selectable among 4800/9600/19200/38400/115200; default not stated — 9600 chosen as conservative placeholder, mark for device confirmation.
- Projector accepts both RS-232C (D-SUB 9P cross cable, PC CONTROL port) and TCP port 7142 over wired/wireless LAN.
- Lamp usage/filter usage times update once per minute despite one-second resolution.
- Lamp remaining life (%) returns negative when replacement deadline exceeded.

<!-- UNRESOLVED: "Supplementary Information by Command" appendix (input terminal, aspect, eco mode, base model type, sub-input values) not present in refined source. -->
<!-- UNRESOLVED: full lens axis enum for 053 LENS CONTROL (only 06h Periphery Focus shown) not present. -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: protocol version (BDT140013 Rev 7.1) is manual revision, not device protocol version. -->
````

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:25:26.148Z
last_checked_at: 2026-06-18T09:14:18.836Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T09:14:18.836Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal enum values, aspect values, eco mode values, base model type values, and sub-input setting values are defined in the source's \"Supplementary Information by Command\" appendix, which is NOT present in the refined document. Parameter slots are emitted but enum value lists are unresolved."
- "flow control not stated in source (full-duplex mode only stated)"
- "input terminal value list not present in refined source"
- "aspect value list not present in refined source"
- "eco mode value list not present in refined source"
- "sub-input setting value list not present in refined source"
- "no additional continuous variables beyond action parameters identified in source."
- "source describes no unsolicited notifications; all responses are"
- "source describes no multi-step command sequences."
- "no voltage/current/power specs, no full power-on sequencing procedure stated."
- "\"Supplementary Information by Command\" appendix (input terminal, aspect, eco mode, base model type, sub-input values) not present in refined source."
- "full lens axis enum for 053 LENS CONTROL (only 06h Periphery Focus shown) not present."
- "firmware version compatibility range not stated."
- "protocol version (BDT140013 Rev 7.1) is manual revision, not device protocol version."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
