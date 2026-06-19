---
spec_id: admin/sharp-nec-led-fe012i3-220
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED FE012I3 220 Control Spec"
manufacturer: Sharp/NEC
model_family: "LED FE012I3 220"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LED FE012I3 220"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:40:24.147Z
last_checked_at: 2026-06-18T08:06:05.842Z
generated_at: 2026-06-18T08:06:05.842Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Exact model-code (ID2) value not documented in this excerpt. Power/voltage specs not in scope of this control doc."
  - "flow control not stated in source; \"Full duplex\" communication mode stated"
  - "no events section populated from source."
  - "no macros populated from source."
  - "no explicit power-on sequencing procedure or interlock procedure stated beyond the above notes."
  - "Appendix enumerations (input terminal values, aspect values, eco mode values, sub-input values, base model types, selection signal types) not in source excerpt."
  - "model code (ID2) value for LED FE012I3 220 not stated in this excerpt."
  - "default baud rate among the listed options (115200/38400/19200/9600/4800) not stated."
  - "flow_control not stated (only \"Full duplex\" communication mode documented)."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:06:05.842Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LED FE012I3 220 Control Spec

## Summary
Sharp/NEC LED FE012I3 220 projector, controlled via RS-232C serial or TCP/IP LAN. Binary command protocol with hex-encoded frames; commands carry a trailing checksum byte computed as the low-order 8 bits of the sum of all preceding bytes. Manual covers power, mute, input switching, picture/volume/aspect/gain adjustment, lens control, lens memory, status queries, and LAN configuration.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Exact model-code (ID2) value not documented in this excerpt. Power/voltage specs not in scope of this control doc. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; default not stated, listing first option
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source; "Full duplex" communication mode stated
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # inferred from POWER ON / POWER OFF commands
  - queryable       # inferred from many status request commands
  - levelable       # inferred from PICTURE ADJUST / VOLUME ADJUST / LAMP ADJUST commands
  - routable        # inferred from INPUT SW CHANGE / AUDIO SELECT SET commands
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
    command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Input terminal value (e.g. 06h = video port). See Appendix "Supplementary Information by Command".

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
    command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02}-{DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Adjustment target (00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness)
      - name: DATA02
        type: integer
        description: Adjustment mode (00h absolute, 01h relative)
      - name: DATA03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA04
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {DATA01}-{DATA03} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Adjustment mode (00h absolute, 01h relative)
      - name: DATA02
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA03
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Value set for the aspect. See Appendix "Supplementary Information by Command".

  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h {DATA01}-{DATA05} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Adjustment target high byte (96h for LAMP ADJUST / LIGHT ADJUST)
      - name: DATA02
        type: integer
        description: Adjustment target low byte (FFh)
      - name: DATA03
        type: integer
        description: Adjustment mode (00h absolute, 01h relative)
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

  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []

  - id: lamp_information_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Lamp (00h Lamp 1, 01h Lamp 2; Lamp 2 effective only for two-lamp models)
      - name: DATA02
        type: integer
        description: Content (01h usage time seconds, 04h remaining life %)

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Content (00h Total Carbon Savings, 01h Carbon Savings during operation)

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Key code low byte (WORD type). Examples - 02h POWER ON, 03h POWER OFF, 05h AUTO, 06h MENU, 07h UP, 08h DOWN, 09h RIGHT, 0Ah LEFT, 0Bh ENTER, 0Ch EXIT, 0Dh HELP, 0Fh MAGNIFY UP, 10h MAGNIFY DOWN, 13h MUTE, 29h PICTURE, 4Bh COMPUTER1, 4Ch COMPUTER2, 4Fh VIDEO1, 51h S-VIDEO1, 84h VOLUME UP, 85h VOLUME DOWN, 8Ah FREEZE, A3h ASPECT, D7h SOURCE, EEh LAMP MODE/ECO.
      - name: DATA02
        type: integer
        description: Key code high byte (WORD type; 00h in all listed examples)

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
    command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Target (06h Periphery Focus)
      - name: DATA02
        type: integer
        description: Content (00h Stop, 01h 1s plus, 02h 0.5s plus, 03h 0.25s plus, 7Fh plus continuous, 81h minus continuous, FDh 0.25s minus, FEh 0.5s minus, FFh 1s minus)

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Target (matches lens_control DATA01)

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {DATA01}-{DATA04} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Target (FFh = Stop; otherwise target per Appendix)
      - name: DATA02
        type: integer
        description: Adjustment mode (00h absolute, 02h relative)
      - name: DATA03
        type: integer
        description: Adjustment value (low-order 8 bits)
      - name: DATA04
        type: integer
        description: Adjustment value (high-order 8 bits)

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Operation (00h MOVE, 01h STORE, 02h RESET)

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Operation (00h MOVE, 01h STORE, 02h RESET)

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Target (00h LOAD BY SIGNAL, 01h FORCED MUTE)

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Target (00h LOAD BY SIGNAL, 01h FORCED MUTE)
      - name: DATA02
        type: integer
        description: Setting value (00h OFF, 01h ON)

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Profile number (00h Profile 1, 01h Profile 2)

  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Adjusted value name (00h BRIGHTNESS, 01h CONTRAST, 02h COLOR, 03h HUE, 04h SHARPNESS, 05h VOLUME, 96h LAMP/LIGHT ADJUST)

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
    command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Freeze state (01h on, 02h off)

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Information type (03h Horizontal sync frequency, 04h Vertical sync frequency)

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
    label: PIP/Picture by Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Target (00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3)

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Value set for the eco mode. See Appendix "Supplementary Information by Command".

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {DATA01}-{DATA16} 00h {CKS}"
    params:
      - name: name
        type: string
        description: Projector name bytes (DATA01-DATA16, up to 16 bytes)

  - id: pip_picture_by_picture_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Target (00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3)
      - name: DATA02
        type: integer
        description: Setting value (MODE: 00h PIP/01h PBP; START POSITION: 00h-03h corners; sub input per Appendix)

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Setting value (00h OFF, 01h ON)

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
    command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
    params:
      - name: DATA01
        type: integer
        description: Input terminal. See Appendix "Supplementary Information by Command".
      - name: DATA02
        type: integer
        description: Setting value (00h terminal specified in DATA01, 01h BNC, 02h COMPUTER)
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitmap
    description: 12-byte error bitmap (DATA01-DATA12). Bit=0 normal, bit=1 error. See error information list for bit meanings (cover, fan, temperature, lamp, mirror cover, lens not installed, etc.).

  - id: power_status
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    description: RUNNING STATUS DATA03/DATA06 composite values.

  - id: operation_status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]

  - id: mute_status
    type: composite
    description: Picture/Sound/Onscreen/Forced-onscreen mute on/off bits plus onscreen display state.

  - id: cover_status
    type: enum
    values: [normal_opened, closed]

  - id: lens_operation_status
    type: bitmap
    description: Bit0 Lens memory, Bit1 Zoom, Bit2 Focus, Bit3 Lens Shift (H), Bit4 Lens Shift (V) - each 0=Stop / 1=During operation.

  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]

  - id: eco_mode
    type: raw
    description: Eco/Light/Lamp mode value. See Appendix for enumerated values.

  - id: edge_blending_mode
    type: enum
    values: [off, on]
```

## Variables
```yaml
variables:
  - id: picture_brightness
    type: integer
    description: PICTURE/BRIGHTNESS level (adjustable via 030-1, queryable via 060-1 DATA01=00h).

  - id: picture_contrast
    type: integer
    description: PICTURE/CONTRAST level.

  - id: picture_color
    type: integer
    description: PICTURE/COLOR level.

  - id: picture_hue
    type: integer
    description: PICTURE/HUE level.

  - id: picture_sharpness
    type: integer
    description: PICTURE/SHARPNESS level.

  - id: volume
    type: integer
    description: Sound volume level.

  - id: lamp_light_adjust
    type: integer
    description: LAMP ADJUST / LIGHT ADJUST level (DATA01=96h).

  - id: lamp_usage_time_seconds
    type: integer
    description: Lamp 1/2 usage time in seconds (updated at 1-minute intervals).

  - id: lamp_remaining_life_percent
    type: integer
    description: Lamp remaining life %. Negative if replacement deadline exceeded.

  - id: filter_usage_time_seconds
    type: integer
    description: Filter usage time in seconds.

  - id: filter_alarm_start_time_seconds
    type: integer
    description: Filter alarm start time in seconds; -1 if undefined.

  - id: projector_name
    type: string
    description: LAN projector name (up to 16 bytes).

  - id: pip_pbp_mode
    type: enum
    values: [pip, picture_by_picture]

  - id: pip_pbp_start_position
    type: enum
    values: [top_left, top_right, bottom_left, bottom_right]
```

## Events
```yaml
# No unsolicited notifications documented in source. All responses are command echoes.
# UNRESOLVED: no events section populated from source.
```

## Macros
```yaml
# No multi-step sequences documented explicitly in source.
# UNRESOLVED: no macros populated from source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes:
# - POWER ON: "While this command is turning on the power, no other command can be accepted."
# - POWER OFF: "While this command is turning off the power (including the cooling time), no other command can be accepted."
# - Error 02h 0Dh: "The command cannot be accepted because the power is off."
# - Error 02h 0Fh: "There is no authority necessary for the operation."
# - Interlock switch (DATA09 Bit1) and portrait cover orientation (DATA09 Bit0) reported in error status.
# UNRESOLVED: no explicit power-on sequencing procedure or interlock procedure stated beyond the above notes.
```

## Notes
- Binary protocol: every frame is hex bytes. Response framing differs by command group — successful command echoes use prefix `2Xh` (where X matches command's first nibble), error responses use prefix `AXh`, query replies use `2Xh` with DATA.
- Checksum (CKS) = low-order 8 bits of sum of all preceding bytes. Example: `20h 81h 01h 60h 01h 00h` → sum=103h → CKS=03h.
- Parameters ID1 (control ID set on projector) and ID2 (model code, model-dependent) are inserted into responses; commands sent to projector do not include them in the leading bytes shown.
- `LEN` field = byte length of DATA part following LEN.
- Error code pairs (ERR1, ERR2) listed in §2.4 — 00h/00h unrecognized command, 00h/01h unsupported by model, 01h/00h invalid value, 02h/0Dh power off, 02h/0Eh execution failed, etc.
- Source supports both RS-232C (PC CONTROL D-SUB 9P, cross cable, pins 2/3/5/7/8 active) and TCP/IP (wired RJ-45 10/100 or optional wireless LAN unit). TCP port 7142.
- Many commands reference an "Appendix — Supplementary Information by Command" for input terminal values, aspect values, eco mode values, sub-input values, base model types, and selection signal types; that appendix is not present in this refined excerpt.

<!-- UNRESOLVED: Appendix enumerations (input terminal values, aspect values, eco mode values, sub-input values, base model types, selection signal types) not in source excerpt. -->
<!-- UNRESOLVED: model code (ID2) value for LED FE012I3 220 not stated in this excerpt. -->
<!-- UNRESOLVED: default baud rate among the listed options (115200/38400/19200/9600/4800) not stated. -->
<!-- UNRESOLVED: flow_control not stated (only "Full duplex" communication mode documented). -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
````

Spec output above. 53 actions enumerated — matches all command list rows §2. Both serial + tcp transports (port 7142 verbatim). Baud options listed, default unresolved. Checksum rule documented. No invented values.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:40:24.147Z
last_checked_at: 2026-06-18T08:06:05.842Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:06:05.842Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Exact model-code (ID2) value not documented in this excerpt. Power/voltage specs not in scope of this control doc."
- "flow control not stated in source; \"Full duplex\" communication mode stated"
- "no events section populated from source."
- "no macros populated from source."
- "no explicit power-on sequencing procedure or interlock procedure stated beyond the above notes."
- "Appendix enumerations (input terminal values, aspect values, eco mode values, sub-input values, base model types, selection signal types) not in source excerpt."
- "model code (ID2) value for LED FE012I3 220 not stated in this excerpt."
- "default baud rate among the listed options (115200/38400/19200/9600/4800) not stated."
- "flow_control not stated (only \"Full duplex\" communication mode documented)."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
