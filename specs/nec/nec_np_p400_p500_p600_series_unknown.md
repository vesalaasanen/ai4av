---
spec_id: admin/nec-np-p400-p500-p600-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP P400 P500 P600 Series Control Spec"
manufacturer: NEC
model_family: "NP P400"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NP P400"
    - "NP P500"
    - "NP P600"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T08:33:19.724Z
last_checked_at: 2026-10-07T12:41:03.260Z
generated_at: 2026-10-07T12:41:03.260Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "appendix tables for input terminal values, aspect values, eco mode values, and base model type values referenced but not included in refined source"
  - "flow_control not explicitly stated for serial"
  - "model code (ID2) values not documented — must be discovered per unit"
  - "exact range not in source (query gain_parameter for device-specific limits)"
  - "no unsolicited notification events documented in source"
  - "no multi-step macro sequences documented in source"
  - "source notes that no commands are accepted during power-on sequence or"
  - "appendix \"Supplementary Information by Command\" not included — input terminal hex values, aspect values, eco mode values, signal type details, and base model type codes are missing"
  - "exact adjustment ranges for brightness/contrast/color/hue/sharpness/volume/lamp not stated — query gain_parameter_request per device"
  - "which NP P400/P500/P600 specific ID2 model code values apply"
  - "wireless LAN communication conditions reference external documentation not included"
  - "DATA01 values for lens_control axes beyond periphery focus (06h) not documented in this excerpt"
verification:
  verdict: verified
  checked_at: 2026-10-07T12:41:03.260Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 action units (28 actions, 25 query feedbacks) match source frames byte-for-byte; transport values are supported; the source's 53-command list is fully covered. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# NEC NP P400 P500 P600 Series Control Spec

## Summary
NEC NP P400/P500/P600 series projectors with binary RS-232C serial and TCP/IP control interfaces. Commands use hex-encoded frames with checksums. Covers power, input switching, mute (picture/sound/onscreen), picture/volume/aspect adjustment, lens control with memory, shutter, freeze, eco mode, edge blending, PIP/PbP, and extensive status queries.

<!-- UNRESOLVED: appendix tables for input terminal values, aspect values, eco mode values, and base model type values referenced but not included in refined source -->
<!-- UNRESOLVED: flow_control not explicitly stated for serial -->
<!-- UNRESOLVED: model code (ID2) values not documented — must be discovered per unit -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: UNRESOLVED  # Source wires RTS/CTS but does not specify flow control.
addressing:
  port: 7142
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
traits:
  - powerable    # power on/off commands
  - routable     # input switching commands
  - queryable    # extensive status query commands
  - levelable    # volume, brightness, contrast, color, hue, sharpness, lamp adjust
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    description: "Turns on projector power. No other commands accepted during power-on sequence."
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    description: "Turns off projector power. No other commands accepted during cooldown."
    params: []

  - id: input_switch
    label: Input Switch
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    description: "Switches the input terminal."
    params:
      - name: input
        type: integer
        description: "Input terminal hex value (e.g. 06h = Video). See appendix for full list."

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    description: "Turns picture mute on. Cleared by input switch or video signal switch."
    params: []

  - id: picture_mute_off
    label: Picture Mute Off
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    description: "Turns picture mute off."
    params: []

  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    description: "Turns sound mute on. Cleared by input switch, signal switch, or volume adjust."
    params: []

  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    description: "Turns sound mute off."
    params: []

  - id: onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    description: "Turns onscreen mute on. Cleared by input switch or video signal switch."
    params: []

  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    description: "Turns onscreen mute off."
    params: []

  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
    description: "Adjusts picture parameters."
    params:
      - name: target
        type: integer
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: integer
        description: "00h=Absolute value, 01h=Relative value"
      - name: value
        type: integer
        description: "16-bit signed adjustment value (low byte, high byte)"

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    description: "Adjusts sound volume."
    params:
      - name: mode
        type: integer
        description: "00h=Absolute value, 01h=Relative value"
      - name: value
        type: integer
        description: "16-bit signed adjustment value (low byte, high byte)"

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    description: "Adjusts aspect ratio."
    params:
      - name: aspect
        type: integer
        description: "Aspect value (see appendix for full list)"

  - id: lamp_adjust
    label: Lamp Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 96h FFh <DATA03> <DATA04> <DATA05> <CKS>"
    description: "Adjusts lamp/light output."
    params:
      - name: mode
        type: integer
        description: "00h=Absolute value, 01h=Relative value"
      - name: value
        type: integer
        description: "16-bit signed adjustment value (low byte, high byte)"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: "Sends a remote control key code."
    params:
      - name: key_code
        type: integer
        description: "WORD key code (e.g. 05h00h=AUTO, 06h00h=MENU, 07h00h=UP, 08h00h=DOWN)"

  - id: shutter_close
    label: Shutter Close
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    description: "Closes the lens shutter."
    params: []

  - id: shutter_open
    label: Shutter Open
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    description: "Opens the lens shutter."
    params: []

  - id: lens_control
    label: Lens Control
    kind: action
    command: "02h 18h 00h 00h 02h 06h <DATA02> <CKS>"
    description: "Adjusts periphery focus lens position."
    params:
      - name: direction
        type: integer
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    description: "Adjusts lens position with absolute or relative values."
    params:
      - name: target
        type: integer
        description: "FFh=Stop, other values for lens axis"
      - name: mode
        type: integer
        description: "00h=Absolute, 02h=Relative"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte, high byte)"

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    description: "Controls lens memory (MOVE/STORE/RESET)."
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    description: "Controls reference lens memory for the selected profile."
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: "Sets lens memory options."
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
    description: "Selects the reference lens memory profile number."
    params:
      - name: profile
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    description: "Toggles freeze function on or off."
    params:
      - name: state
        type: integer
        description: "01h=On, 02h=Off"

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    description: "Sets eco/light/lamp mode."
    params:
      - name: mode
        type: integer
        description: "Eco mode value (see appendix for full list)"

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01>-<DATA16> 00h <CKS>"
    description: "Sets the projector name (up to 16 bytes)."
    params:
      - name: name
        type: string
        description: "Projector name (max 16 bytes)"

  - id: pip_pbp_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    description: "Sets PIP or PbP mode and parameters."
    params:
      - name: parameter
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "For MODE: 00h=PIP, 01h=PbP. For POSITION: 00h=TL, 01h=TR, 02h=BL, 03h=BR."

  - id: edge_blending_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    description: "Enables or disables edge blending."
    params:
      - name: state
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    description: "Sets the audio input source."
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal value (see appendix)"
      - name: source
        type: integer
        description: "00h=Terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    label: Error Status
    type: binary_flags
    description: "Returns 12 bytes of error bit flags (cover, fan, temp, lamp, formatter, interlock, etc.)"
    command: "00h 88h 00h 00h 00h 88h"
    query_command: "00h  88h  00h  00h  00h  88h"

  - id: information
    label: Projector Information
    type: string
    description: "Returns projector name (49 bytes), lamp usage time (seconds), filter usage time (seconds)."
    command: "03h 8Ah 00h 00h 00h 8Dh"
    query_command: "03h  8Ah  00h  00h  00h  8Dh"

  - id: filter_usage
    label: Filter Usage Information
    type: numeric
    description: "Returns filter usage time (seconds) and filter alarm start time (seconds)."
    command: "03h 95h 00h 00h 00h 98h"
    query_command: "03h  95h  00h  00h  00h  98h"

  - id: lamp_information
    label: Lamp Information
    type: numeric
    description: "Returns lamp usage time (seconds) or remaining life (%). Eco mode affects values."
    command: "03h 96h 00h 00h 02h <lamp> <content> <CKS>"
    query_command: "03h  96h  00h  00h  02h _<DATA01> <DATA02> <CKS>_"
    params:
      - name: lamp
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: content
        description: "01h=Usage time (seconds), 04h=Remaining life (%)"

  - id: carbon_savings
    label: Carbon Savings Information
    type: numeric
    description: "Returns carbon savings in kg and mg."
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    query_command: "03h  9Ah  00h  00h  01h _<DATA01> <CKS>_"
    params:
      - name: type
        description: "00h=Total, 01h=During operation"

  - id: lens_control_request
    label: Lens Control Position
    type: numeric
    description: "Returns adjustment range limits and current value for a lens axis."
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    query_command: "02h  1Ch  00h  00h  02h _<DATA01>_ 00h _<CKS>_"

  - id: lens_memory_option
    label: Lens Memory Option
    type: enum
    description: "Returns LOAD BY SIGNAL or FORCED MUTE setting (ON/OFF)."
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    query_command: "02h  20h  00h  00h  01h _<DATA01> <CKS>_"

  - id: lens_information
    label: Lens Information
    type: binary_flags
    description: "Returns operation status per lens axis (memory, zoom, focus, shift-H, shift-V)."
    command: "02h 22h 00h 00h 01h 00h 25h"
    query_command: "02h  22h  00h  00h  01h  00h  25h"

  - id: lens_profile
    label: Lens Profile
    type: enum
    description: "Returns selected reference lens memory profile (Profile 1 or Profile 2)."
    command: "02h 28h 00h 00h 00h 2Ah"
    query_command: "02h  28h  00h  00h  00h  2Ah"

  - id: gain_parameter
    label: Gain Parameter
    type: numeric
    description: "Returns adjustment range, default, current value, and step widths for a gain parameter."
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    query_command: "03h  05h  00h  00h  03h _<DATA01>_ 00h  00h _<CKS>_"
    params:
      - name: parameter
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp Adjust"

  - id: setting_request
    label: Projector Settings
    type: composite
    description: "Returns base model type, sound function availability, and profile/clock info."
    command: "00h 85h 00h 00h 01h 00h 86h"
    query_command: "00h  85h  00h  00h  01h  00h  86h"

  - id: running_status
    label: Running Status
    type: enum
    description: "Returns power status, cooling status, power-on/off process status, operation status."
    command: "00h 85h 00h 00h 01h 01h 87h"
    query_command: "00h  85h  00h  00h  01h  01h  87h"

  - id: input_status
    label: Input Status
    type: composite
    description: "Returns signal switch process, signal list number, selection signal type, test pattern, and content displayed."
    command: "00h 85h 00h 00h 01h 02h 88h"
    query_command: "00h  85h  00h  00h  01h  02h  88h"

  - id: mute_status
    label: Mute Status
    type: enum
    description: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, and OSD status."
    command: "00h 85h 00h 00h 01h 03h 89h"
    query_command: "00h  85h  00h  00h  01h  03h  89h"

  - id: model_name
    label: Model Name
    type: string
    description: "Returns the projector model name (NUL-terminated)."
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    query_command: "00h  85h  00h  00h  01h  04h  8Ah"

  - id: cover_status
    label: Cover Status
    type: enum
    description: "Returns mirror cover or lens cover status."
    values: ["normal_open", "closed"]
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    query_command: "00h  85h  00h  00h  01h  05h  8Bh"

  - id: information_string
    label: Information String
    type: string
    description: "Returns horizontal or vertical sync frequency as a string."
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    query_command: "00h  D0h  00h  00h  03h  00h _<DATA01>_ 01h _<CKS>_"
    params:
      - name: type
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  - id: eco_mode
    label: Eco Mode
    type: enum
    description: "Returns current eco/light/lamp mode setting."
    command: "03h B0h 00h 00h 01h 07h BBh"
    query_command: "03h  B0h  00h  00h  01h  07h  BBh"

  - id: lan_projector_name
    label: LAN Projector Name
    type: string
    description: "Returns the projector name (17 bytes, NUL-terminated)."
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    query_command: "03h  B0h  00h  00h  01h  2Ch  E0h"

  - id: lan_mac_address
    label: LAN MAC Address
    type: string
    description: "Returns the projector MAC address (6 bytes)."
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    query_command: "03h  B0h  00h  00h  02h  9Ah  00h  4Fh"

  - id: pip_pbp_status
    label: PIP/PbP Status
    type: composite
    description: "Returns PIP/PbP mode, start position, or sub-input settings."
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    query_command: "03h  B0h  00h  00h  02h  C5h _<DATA01> <CKS>_"

  - id: edge_blending_status
    label: Edge Blending Status
    type: enum
    description: "Returns edge blending ON/OFF status."
    values: ["off", "on"]
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    query_command: "03h  B0h  00h  00h  02h  DFh  00h  94h"

  - id: base_model_type
    label: Base Model Type
    type: composite
    description: "Returns base model type and model name."
    command: "00h BFh 00h 00h 01h 00h C0h"
    query_command: "00h  BFh  00h  00h  01h  00h  C0h"

  - id: serial_number
    label: Serial Number
    type: string
    description: "Returns the projector serial number (16 bytes, NUL-terminated)."
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    query_command: "00h  BFh  00h  00h  02h  01h  06h  C8h"

  - id: basic_information
    label: Basic Information
    type: composite
    description: "Returns operation status, content displayed, signal types, mute states, and freeze status."
    command: "00h BFh 00h 00h 01h 02h C2h"
    query_command: "00h  BFh  00h  00h  01h  02h  C2h"
```

## Variables
```yaml
variables:
  - id: brightness
    label: Brightness
    type: integer
    min: null  # UNRESOLVED: exact range not in source (query gain_parameter for device-specific limits)
    max: null

  - id: contrast
    label: Contrast
    type: integer
    min: null
    max: null

  - id: color
    label: Color
    type: integer
    min: null
    max: null

  - id: hue
    label: Hue
    type: integer
    min: null
    max: null

  - id: sharpness
    label: Sharpness
    type: integer
    min: null
    max: null

  - id: volume
    label: Volume
    type: integer
    min: null
    max: null

  - id: lamp_adjust
    label: Lamp Output Level
    type: integer
    min: null
    max: null
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source notes that no commands are accepted during power-on sequence or
# cooling period (commands 015/016), but no explicit safety interlock procedures are documented.
```

## Notes
- Binary protocol: all commands and responses are hex-encoded byte frames. Commands start with a header byte (00h–03h range), followed by command byte, two null bytes, data length, data payload, and checksum.
- Checksum: sum all preceding bytes, use low-order 8 bits.
- Response frames start with the command header byte ORed with A0h (e.g., 02h → A2h). Successful responses echo the command byte; error responses include ERR1/ERR2 codes.
- Control ID (ID1) and Model Code (ID2) are device-specific parameters included in response frames. ID2 varies by model.
- Input terminal values, aspect values, eco mode values, and base model type values are defined in an appendix not included in the refined source — these must be obtained from the full manual.

<!-- UNRESOLVED: appendix "Supplementary Information by Command" not included — input terminal hex values, aspect values, eco mode values, signal type details, and base model type codes are missing -->
<!-- UNRESOLVED: exact adjustment ranges for brightness/contrast/color/hue/sharpness/volume/lamp not stated — query gain_parameter_request per device -->
<!-- UNRESOLVED: which NP P400/P500/P600 specific ID2 model code values apply -->
<!-- UNRESOLVED: wireless LAN communication conditions reference external documentation not included -->
<!-- UNRESOLVED: DATA01 values for lens_control axes beyond periphery focus (06h) not documented in this excerpt -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T08:33:19.724Z
last_checked_at: 2026-10-07T12:41:03.260Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:41:03.260Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 action units (28 actions, 25 query feedbacks) match source frames byte-for-byte; transport values are supported; the source's 53-command list is fully covered. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "appendix tables for input terminal values, aspect values, eco mode values, and base model type values referenced but not included in refined source"
- "flow_control not explicitly stated for serial"
- "model code (ID2) values not documented — must be discovered per unit"
- "exact range not in source (query gain_parameter for device-specific limits)"
- "no unsolicited notification events documented in source"
- "no multi-step macro sequences documented in source"
- "source notes that no commands are accepted during power-on sequence or"
- "appendix \"Supplementary Information by Command\" not included — input terminal hex values, aspect values, eco mode values, signal type details, and base model type codes are missing"
- "exact adjustment ranges for brightness/contrast/color/hue/sharpness/volume/lamp not stated — query gain_parameter_request per device"
- "which NP P400/P500/P600 specific ID2 model code values apply"
- "wireless LAN communication conditions reference external documentation not included"
- "DATA01 values for lens_control axes beyond periphery focus (06h) not documented in this excerpt"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
