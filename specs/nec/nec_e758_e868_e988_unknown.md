---
spec_id: admin/nec-e758-e868-e988
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC E758 E868 E988 Control Spec"
manufacturer: NEC
model_family: E758
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - E758
    - E868
    - E988
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T07:53:01.351Z
last_checked_at: 2026-05-16T12:37:59.381Z
generated_at: 2026-05-16T12:37:59.381Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Appendix \"Supplementary Information by Command\" referenced throughout but not included in source — input terminal values, aspect values, eco mode values, base model type values, and sub-input values for PIP are incomplete."
  - "flow_control not stated in source"
  - "wireless LAN specifics deferred to separate wireless LAN unit manual"
  - "flow control not stated in source"
  - "complete input terminal value list not in source"
  - "aspect values listed in Appendix not included in source"
  - "other target values not documented in this section"
  - "eco mode values listed in Appendix not included in source"
  - "input terminal values listed in Appendix not included in source"
  - "eco mode return values listed in Appendix not included in source"
  - "no unsolicited event/notification mechanism described in source"
  - "no multi-step macro sequences described in source"
  - "source mentions interlock switch in error status bitfield (DATA09 Bit1)"
  - "Appendix \"Supplementary Information by Command\" not included — missing input terminal values, aspect values, eco mode values, base model type values, selection signal type details, and sub-input PIP values"
  - "flow_control serial parameter not stated"
  - "default baud rate not specified (multiple supported: 115200/38400/19200/9600/4800)"
  - "lens control target values beyond 06h (Periphery Focus) not documented in provided sections"
  - "no notification/event mechanism for asynchronous status changes described"
verification:
  verdict: verified
  checked_at: 2026-05-16T12:37:59.381Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions matched verbatim with source opcodes; Feedbacks section represents all source query commands; bidirectional coverage complete. (18 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# NEC E758 E868 E988 Control Spec

## Summary
NEC E758, E868, E988 LCD projectors. Binary control protocol over RS-232 serial and TCP/IP (wired/wireless LAN). Supports power, input switching, picture/audio/onscreen mute, lens control, shutter, freeze, eco mode, PIP, edge blending, and extensive status queries.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced throughout but not included in source — input terminal values, aspect values, eco mode values, base model type values, and sub-input values for PIP are incomplete. -->
<!-- UNRESOLVED: flow_control not stated in source -->
<!-- UNRESOLVED: wireless LAN specifics deferred to separate wireless LAN unit manual -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate:
    - 115200
    - 38400
    - 19200
    - 9600
    - 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred: power on/off commands present
  - queryable     # inferred: extensive status query commands present
  - routable      # inferred: input switch change command present
  - levelable     # inferred: volume, brightness, contrast, color, hue, sharpness adjust present
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    description: Turns on projector power. No other commands accepted during power-on sequence.
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    description: Turns off projector power. No other commands accepted during cooldown.
    params: []

  - id: input_switch
    label: Input Switch Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    description: Switches input terminal or entry list.
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal value (hex). E.g. 06h = Video port. Full list in Appendix."
        # UNRESOLVED: complete input terminal value list not in source

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    description: Turns picture mute on. Cleared on input switch or video signal switch.
    params: []

  - id: picture_mute_off
    label: Picture Mute Off
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    description: Turns picture mute off.
    params: []

  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    description: Turns sound mute on. Cleared on input switch, video signal switch, or volume adjust.
    params: []

  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    description: Turns sound mute off.
    params: []

  - id: onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    description: Turns onscreen mute on. Cleared on input switch or video signal switch.
    params: []

  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    description: Turns onscreen mute off.
    params: []

  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02>-<DATA04> <CKS>"
    description: Adjusts picture parameters.
    params:
      - name: target
        type: integer
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: integer
        description: "00h=absolute, 01h=relative"
      - name: value
        type: integer
        description: "Signed 16-bit value (low byte, high byte)"

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01>-<DATA03> <CKS>"
    description: Adjusts sound volume.
    params:
      - name: mode
        type: integer
        description: "00h=absolute, 01h=relative"
      - name: value
        type: integer
        description: "Signed 16-bit value (low byte, high byte)"

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    description: Sets aspect ratio.
    params:
      - name: aspect
        type: integer
        description: Aspect value
        # UNRESOLVED: aspect values listed in Appendix not included in source

  - id: lamp_adjust
    label: Lamp/Light Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 96h FFh <DATA03>-<DATA05> <CKS>"
    description: Adjusts lamp/light output.
    params:
      - name: mode
        type: integer
        description: "00h=absolute, 01h=relative"
      - name: value
        type: integer
        description: "Signed 16-bit value (low byte, high byte)"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: Sends remote control key code.
    params:
      - name: key_code
        type: integer
        description: "WORD key code. Examples: 02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU, 07h 00h=UP, 08h 00h=DOWN, 09h 00h=RIGHT, 0Ah 00h=LEFT, 0Bh 00h=ENTER, 0Ch 00h=EXIT, 84h 00h=VOLUME UP, 85h 00h=VOLUME DOWN, 8Ah 00h=FREEZE, A3h 00h=ASPECT, D7h 00h=SOURCE, EEh 00h=LAMP MODE/ECO"

  - id: shutter_close
    label: Shutter Close
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    description: Closes lens shutter.
    params: []

  - id: shutter_open
    label: Shutter Open
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    description: Opens lens shutter.
    params: []

  - id: lens_control
    label: Lens Control
    kind: action
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: Adjusts lens position (focus, zoom, shift).
    params:
      - name: target
        type: integer
        description: "06h=Periphery Focus"
        # UNRESOLVED: other target values not documented in this section
      - name: direction
        type: integer
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01>-<DATA04> <CKS>"
    description: Adjusts lens position with absolute/relative values.
    params:
      - name: target
        type: integer
        description: "FFh=Stop, others for specific lens axis"
      - name: mode
        type: integer
        description: "00h=absolute, 02h=relative"
      - name: value
        type: integer
        description: "Signed 16-bit value (low byte, high byte)"

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    description: Controls lens memory (move/store/reset).
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    description: Controls reference lens memory for the profile set via lens profile set.
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: Sets lens memory options.
    params:
      - name: option
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: value
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    description: Selects reference lens memory profile number.
    params:
      - name: profile
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    description: Turns freeze function on or off.
    params:
      - name: state
        type: integer
        description: "01h=On, 02h=Off"

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    description: Sets eco/light/lamp mode.
    params:
      - name: mode
        type: integer
        description: Eco mode value
        # UNRESOLVED: eco mode values listed in Appendix not included in source

  - id: projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01>-<DATA16> 00h <CKS>"
    description: Sets projector name (up to 16 bytes).
    params:
      - name: name
        type: string
        description: Projector name up to 16 bytes

  - id: pip_pbp_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    description: Sets PIP or Picture by Picture mode.
    params:
      - name: target
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "MODE: 00h=PIP, 01h=PBP. POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input values in Appendix."

  - id: edge_blending_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    description: Sets edge blending on or off.
    params:
      - name: state
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    description: Sets audio input selection for a given terminal.
    params:
      - name: input_terminal
        type: integer
        description: Input terminal value (see Appendix)
        # UNRESOLVED: input terminal values listed in Appendix not included in source
      - name: audio_source
        type: integer
        description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    label: Error Status
    type: binary
    command: "00h 88h 00h 00h 00h 88h"
    description: Returns 12 bytes of error bit flags (cover, fan, temperature, lamp, formatter, FPGA, mirror, interlock, etc.).

  - id: projector_information
    label: Information Request
    type: composite
    command: "03h 8Ah 00h 00h 00h 8Dh"
    description: Returns projector name (DATA01-49), lamp usage time in seconds (DATA83-86), filter usage time in seconds (DATA87-90).

  - id: filter_usage
    label: Filter Usage Information
    type: composite
    command: "03h 95h 00h 00h 00h 98h"
    description: Returns filter usage time (seconds) and filter alarm start time (seconds).

  - id: lamp_information
    label: Lamp Information
    type: composite
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: Returns lamp usage time (seconds) or remaining life (%).
    params:
      - name: lamp
        type: integer
        description: "00h=Lamp 1, 01h=Lamp 2"
      - name: content
        type: integer
        description: "01h=usage time (seconds), 04h=remaining life (%)"

  - id: carbon_savings
    label: Carbon Savings Information
    type: composite
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    description: Returns carbon savings in kg and mg.
    params:
      - name: type
        type: integer
        description: "00h=Total, 01h=During operation"

  - id: lens_control_request
    label: Lens Control Request
    type: composite
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    description: Returns adjustment range (upper/lower limits) and current value for a lens axis.

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    type: composite
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    description: Returns lens memory option setting.
    params:
      - name: option
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_information
    label: Lens Information Request
    type: composite
    command: "02h 22h 00h 00h 01h 00h 25h"
    description: Returns bitfield of lens motor activity (memory, zoom, focus, shift H, shift V).

  - id: lens_profile_request
    label: Lens Profile Request
    type: enum
    command: "02h 28h 00h 00h 00h 2Ah"
    description: Returns selected reference lens memory profile number (00h=Profile 1, 01h=Profile 2).
    values: ["Profile 1", "Profile 2"]

  - id: gain_parameter_request
    label: Gain Parameter Request
    type: composite
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    description: Returns adjustment range, default, current value, and adjustment width for a gain parameter.
    params:
      - name: target
        type: integer
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"

  - id: setting_request
    label: Setting Request
    type: composite
    command: "00h 85h 00h 00h 01h 00h 86h"
    description: Returns base model type, sound function availability, profile number.

  - id: running_status
    label: Running Status Request
    type: composite
    command: "00h 85h 00h 00h 01h 01h 87h"
    description: Returns power status, cooling process, power on/off process, operation status.

  - id: input_status
    label: Input Status Request
    type: composite
    command: "00h 85h 00h 00h 01h 02h 88h"
    description: Returns signal switch process, signal list number, selection signal type, test pattern, content displayed.

  - id: mute_status
    label: Mute Status Request
    type: composite
    command: "00h 85h 00h 00h 01h 03h 89h"
    description: Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display states.

  - id: model_name
    label: Model Name Request
    type: string
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    description: Returns model name string.

  - id: cover_status
    label: Cover Status Request
    type: enum
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    description: Returns mirror/lens cover status.
    values: ["Normal (cover opened)", "Cover closed"]

  - id: information_string
    label: Information String Request
    type: string
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    description: Returns horizontal or vertical sync frequency string.
    params:
      - name: info_type
        type: integer
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  - id: eco_mode_request
    label: Eco Mode Request
    type: integer
    command: "03h B0h 00h 00h 01h 07h BBh"
    description: Returns current eco/light/lamp mode setting.
    # UNRESOLVED: eco mode return values listed in Appendix not included in source

  - id: projector_name_request
    label: LAN Projector Name Request
    type: string
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    description: Returns projector name (up to 17 bytes).

  - id: mac_address
    label: LAN MAC Address Request
    type: string
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    description: Returns 6-byte MAC address.

  - id: pip_pbp_request
    label: PIP/Picture by Picture Request
    type: composite
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    description: Returns PIP/PBP mode, start position, or sub input setting.
    params:
      - name: target
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_request
    label: Edge Blending Mode Request
    type: enum
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    description: Returns edge blending setting.
    values: ["OFF", "ON"]

  - id: base_model_type
    label: Base Model Type Request
    type: composite
    command: "00h BFh 00h 00h 01h 00h C0h"
    description: Returns base model type and model name.

  - id: serial_number
    label: Serial Number Request
    type: string
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    description: Returns projector serial number string.

  - id: basic_information
    label: Basic Information Request
    type: composite
    command: "00h BFh 00h 00h 01h 02h C2h"
    description: Returns operation status, content displayed, signal type, video/sound/onscreen mute, freeze status.
```

## Variables
```yaml
variables:
  - id: brightness
    label: Brightness
    type: integer
    description: Picture brightness. Adjustable via picture adjust (target 00h).

  - id: contrast
    label: Contrast
    type: integer
    description: Picture contrast. Adjustable via picture adjust (target 01h).

  - id: color
    label: Color
    type: integer
    description: Picture color saturation. Adjustable via picture adjust (target 02h).

  - id: hue
    label: Hue
    type: integer
    description: Picture hue. Adjustable via picture adjust (target 03h).

  - id: sharpness
    label: Sharpness
    type: integer
    description: Picture sharpness. Adjustable via picture adjust (target 04h).

  - id: volume
    label: Volume
    type: integer
    description: Sound volume level. Adjustable via volume adjust.

  - id: lamp_output
    label: Lamp/Light Output
    type: integer
    description: Lamp brightness adjustment. Adjustable via other adjust (target 96h FFh).
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions interlock switch in error status bitfield (DATA09 Bit1)
# but no interlock procedure or safety sequencing is explicitly documented.
```

## Notes
Binary protocol uses hex byte frames. Each command frame includes a checksum (CKS) calculated as the low byte of the sum of all preceding bytes. Commands include ID1 (control ID) and ID2 (model code) parameters in responses. Error responses use ERR1/ERR2 byte pairs. Lamp usage time updates at one-minute intervals despite second-resolution reporting. Lens control supports continuous drive (7Fh/81h) requiring explicit stop (00h) to halt.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not included — missing input terminal values, aspect values, eco mode values, base model type values, selection signal type details, and sub-input PIP values -->
<!-- UNRESOLVED: flow_control serial parameter not stated -->
<!-- UNRESOLVED: default baud rate not specified (multiple supported: 115200/38400/19200/9600/4800) -->
<!-- UNRESOLVED: lens control target values beyond 06h (Periphery Focus) not documented in provided sections -->
<!-- UNRESOLVED: no notification/event mechanism for asynchronous status changes described -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T07:53:01.351Z
last_checked_at: 2026-05-16T12:37:59.381Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T12:37:59.381Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions matched verbatim with source opcodes; Feedbacks section represents all source query commands; bidirectional coverage complete. (18 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Appendix \"Supplementary Information by Command\" referenced throughout but not included in source — input terminal values, aspect values, eco mode values, base model type values, and sub-input values for PIP are incomplete."
- "flow_control not stated in source"
- "wireless LAN specifics deferred to separate wireless LAN unit manual"
- "flow control not stated in source"
- "complete input terminal value list not in source"
- "aspect values listed in Appendix not included in source"
- "other target values not documented in this section"
- "eco mode values listed in Appendix not included in source"
- "input terminal values listed in Appendix not included in source"
- "eco mode return values listed in Appendix not included in source"
- "no unsolicited event/notification mechanism described in source"
- "no multi-step macro sequences described in source"
- "source mentions interlock switch in error status bitfield (DATA09 Bit1)"
- "Appendix \"Supplementary Information by Command\" not included — missing input terminal values, aspect values, eco mode values, base model type values, selection signal type details, and sub-input PIP values"
- "flow_control serial parameter not stated"
- "default baud rate not specified (multiple supported: 115200/38400/19200/9600/4800)"
- "lens control target values beyond 06h (Periphery Focus) not documented in provided sections"
- "no notification/event mechanism for asynchronous status changes described"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
