---
spec_id: admin/nec-e323-e423-e463-e553
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC E323 E423 E463 E553 Control Spec"
manufacturer: NEC
model_family: E323
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - E323
    - E423
    - E463
    - E553
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T07:46:51.270Z
last_checked_at: 2026-05-16T12:37:58.490Z
generated_at: 2026-05-16T12:37:58.490Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Appendix \"Supplementary Information by Command\" referenced throughout but not included in source — input terminal values, aspect values, eco mode values, base model type values, and sub-input values for PIP are incomplete"
  - "wireless LAN connection details deferred to separate operation manual"
  - "flow_control not stated in source"
  - "flow control not stated in source"
  - "no unsolicited notification protocol described in source; all responses are query/reply"
  - "no multi-step macro sequences described in source"
  - "full power-on sequencing timing not stated"
  - "appendix with input terminal hex values not in source"
  - "appendix with aspect ratio hex values not in source"
  - "appendix with eco mode hex values not in source"
  - "appendix with base model type hex values not in source"
  - "appendix with PIP sub-input setting values not in source"
  - "wireless LAN details deferred to separate operation manual"
  - "default baud rate not stated"
  - "flow control setting not stated"
verification:
  verdict: verified
  checked_at: 2026-05-16T12:37:58.490Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions matched verbatim in source; Feedbacks section enumerates all source query commands; comprehensive bidirectional coverage of command catalogue. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# NEC E323 E423 E463 E553 Control Spec

## Summary
NEC E323, E423, E463, and E553 projectors controlled via RS-232C serial or TCP/IP (wired/wireless LAN) using a binary command protocol. Supports power control, input switching, picture/sound adjustment, lens control, shutter, freeze, eco mode, edge blending, and PIP. Document reference: BDT140013 Revision 7.1.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced throughout but not included in source — input terminal values, aspect values, eco mode values, base model type values, and sub-input values for PIP are incomplete -->
<!-- UNRESOLVED: wireless LAN connection details deferred to separate operation manual -->
<!-- UNRESOLVED: flow_control not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # also supports 38400, 19200, 9600, 4800
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
  - powerable    # power on/off commands present
  - queryable    # extensive status/information request commands
  - routable     # input switching commands present
  - levelable    # volume, brightness, contrast, color, hue, sharpness adjustments
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command_hex: "02 00 00 00 00 02"
    description: "Turns on the projector. No other commands accepted during power-on sequence."
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command_hex: "02 01 00 00 00 03"
    description: "Turns off the projector. No other commands accepted during cool-down."
    params: []

  - id: input_switch
    label: Input Switch
    kind: action
    command_hex: "02 03 00 00 02 01 <DATA01> <CKS>"
    description: "Switches the input terminal. DATA01 encodes the input terminal."
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal hex value (see appendix; e.g. 06h = Video port)"

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command_hex: "02 10 00 00 00 12"
    description: "Turns picture mute on. Cleared by input or signal switch."
    params: []

  - id: picture_mute_off
    label: Picture Mute Off
    kind: action
    command_hex: "02 11 00 00 00 13"
    description: "Turns picture mute off."
    params: []

  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command_hex: "02 12 00 00 00 14"
    description: "Turns sound mute on. Cleared by input/signal switch or volume adjust."
    params: []

  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command_hex: "02 13 00 00 00 15"
    description: "Turns sound mute off."
    params: []

  - id: onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command_hex: "02 14 00 00 00 16"
    description: "Turns onscreen mute on. Cleared by input or signal switch."
    params: []

  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command_hex: "02 15 00 00 00 17"
    description: "Turns onscreen mute off."
    params: []

  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command_hex: "03 10 00 00 05 <DATA01> FF <DATA02> <DATA03> <DATA04> <CKS>"
    description: "Adjusts picture parameters (brightness, contrast, color, hue, sharpness)."
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
    command_hex: "03 10 00 00 05 05 00 <DATA01> <DATA02> <DATA03> <CKS>"
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
    command_hex: "03 10 00 00 05 18 00 00 <DATA01> 00 <CKS>"
    description: "Sets the aspect ratio. DATA01 encodes the aspect value."
    params:
      - name: aspect
        type: integer
        description: "Aspect value (see appendix for full list)"

  - id: lamp_adjust
    label: Lamp/Light Adjust
    kind: action
    command_hex: "03 10 00 00 05 96 FF <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    description: "Adjusts lamp/light output level."
    params:
      - name: mode
        type: integer
        description: "00h=Absolute value, 01h=Relative value"
      - name: value
        type: integer
        description: "16-bit signed adjustment value"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command_hex: "02 0F 00 00 02 <DATA01> <DATA02> <CKS>"
    description: "Sends a remote control key code (WORD type)."
    params:
      - name: key_code
        type: integer
        description: "Key code WORD (low byte, high byte); e.g. 02h00h=POWER ON, 05h00h=AUTO, 06h00h=MENU, 07h00h=UP, 08h00h=DOWN, 09h00h=RIGHT, 0Ah00h=LEFT, 0Bh00h=ENTER, 0Ch00h=EXIT, 0Dh00h=HELP, 84h00h=VOLUME UP, 85h00h=VOLUME DOWN, 8Ah00h=FREEZE, A3h00h=ASPECT, D7h00h=SOURCE, EEh00h=LAMP MODE/ECO"

  - id: shutter_close
    label: Shutter Close
    kind: action
    command_hex: "02 16 00 00 00 18"
    description: "Closes the lens shutter."
    params: []

  - id: shutter_open
    label: Shutter Open
    kind: action
    command_hex: "02 17 00 00 00 19"
    description: "Opens the lens shutter."
    params: []

  - id: lens_control
    label: Lens Control
    kind: action
    command_hex: "02 18 00 00 02 <DATA01> <DATA02> <CKS>"
    description: "Drives lens motor (zoom, focus, shift, periphery focus). Timed or continuous drive."
    params:
      - name: target
        type: integer
        description: "06h=Periphery Focus; other values for zoom/focus/shift not fully listed in this excerpt"
      - name: direction_duration
        type: integer
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

  - id: lens_control_2
    label: Lens Control 2 (Absolute/Relative)
    kind: action
    command_hex: "02 1D 00 00 04 <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    description: "Adjusts lens position by absolute or relative value."
    params:
      - name: target
        type: integer
        description: "FFh=Stop; other values per lens axis"
      - name: mode
        type: integer
        description: "00h=Absolute, 02h=Relative"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte, high byte)"

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command_hex: "02 1E 00 00 01 <DATA01> <CKS>"
    description: "Controls the lens memory (move/store/reset)."
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command_hex: "02 1F 00 00 01 <DATA01> <CKS>"
    description: "Controls the reference lens memory for the currently selected profile."
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command_hex: "02 21 00 00 02 <DATA01> <DATA02> <CKS>"
    description: "Sets lens memory options (load-by-signal or forced-mute)."
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
    command_hex: "02 27 00 00 01 <DATA01> <CKS>"
    description: "Selects the reference lens memory profile number."
    params:
      - name: profile
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: freeze_control
    label: Freeze Control
    kind: action
    command_hex: "01 98 00 00 01 <DATA01> <CKS>"
    description: "Turns the freeze function on or off."
    params:
      - name: state
        type: integer
        description: "01h=On, 02h=Off"

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command_hex: "03 B1 00 00 02 07 <DATA01> <CKS>"
    description: "Sets eco/lamp/light mode. Values vary by model (see appendix)."
    params:
      - name: mode
        type: integer
        description: "Eco mode value (see appendix for model-specific values)"

  - id: projector_name_set
    label: Projector Name Set
    kind: action
    command_hex: "03 B1 00 00 12 2C <DATA01-16> 00 <CKS>"
    description: "Sets the projector name (up to 16 bytes)."
    params:
      - name: name
        type: string
        description: "Projector name (up to 16 bytes)"

  - id: pip_pbp_set
    label: PIP/Picture-by-Picture Set
    kind: action
    command_hex: "03 B1 00 00 03 C5 <DATA01> <DATA02> <CKS>"
    description: "Sets PIP or PBP mode, start position, or sub-input."
    params:
      - name: target
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "Mode: 00h=PIP, 01h=PBP; Position: 00h=TL, 01h=TR, 02h=BL, 03h=BR; Sub-input: see appendix"

  - id: edge_blending_set
    label: Edge Blending Set
    kind: action
    command_hex: "03 B1 00 00 03 DF 00 <DATA01> <CKS>"
    description: "Enables or disables edge blending."
    params:
      - name: enabled
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command_hex: "03 C9 00 00 03 09 <DATA01> <DATA02> <CKS>"
    description: "Sets the audio input source for a given input terminal."
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal value (see appendix)"
      - name: audio_source
        type: integer
        description: "00h=Same as specified terminal, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    label: Error Status
    type: binary
    description: "12-byte bitmask response; each bit indicates a specific error (cover, fan, temperature, lamp, formatter, etc.)."
    query_hex: "00 88 00 00 00 88"

  - id: information
    label: Projector Information
    type: composite
    description: "Returns projector name (49 bytes), lamp usage time (seconds), filter usage time (seconds)."
    query_hex: "03 8A 00 00 00 8D"

  - id: filter_usage
    label: Filter Usage Information
    type: composite
    description: "Returns filter usage time (seconds) and filter alarm start time (seconds)."
    query_hex: "03 95 00 00 00 98"

  - id: lamp_information
    label: Lamp Information
    type: composite
    description: "Returns lamp usage time (seconds) or remaining life (%) per lamp."
    query_hex: "03 96 00 00 02 <DATA01> <DATA02> <CKS>"
    params:
      - name: lamp
        type: integer
        description: "00h=Lamp 1, 01h=Lamp 2"
      - name: content
        type: integer
        description: "01h=Usage time (seconds), 04h=Remaining life (%)"

  - id: carbon_savings
    label: Carbon Savings Information
    type: composite
    description: "Returns carbon savings in kg and mg."
    query_hex: "03 9A 00 00 01 <DATA01> <CKS>"
    params:
      - name: type
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: lens_position
    label: Lens Position
    type: composite
    description: "Returns upper/lower adjustment limits and current value for a lens axis."
    query_hex: "02 1C 00 00 02 <DATA01> 00 <CKS>"

  - id: lens_information
    label: Lens Information
    type: bitmask
    description: "Returns bitfield indicating lens motor activity (memory, zoom, focus, shift-H, shift-V)."
    query_hex: "02 22 00 00 01 00 25"

  - id: lens_memory_option
    label: Lens Memory Option
    type: enum
    description: "Returns lens memory option setting (load-by-signal or forced-mute) and its on/off state."
    query_hex: "02 20 00 00 01 <DATA01> <CKS>"

  - id: lens_profile
    label: Lens Profile
    type: enum
    description: "Returns the currently selected reference lens memory profile number."
    query_hex: "02 28 00 00 00 2A"
    values: [profile_1, profile_2]

  - id: gain_parameter
    label: Gain Parameter
    type: composite
    description: "Returns adjustment status, range limits, default, current value, and step widths for a gain parameter."
    query_hex: "03 05 00 00 03 <DATA01> 00 00 <CKS>"
    params:
      - name: target
        type: integer
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"

  - id: setting
    label: Setting Request
    type: composite
    description: "Returns base model type, sound function availability, and profile/sleep timer capabilities."
    query_hex: "00 85 00 00 01 00 86"

  - id: running_status
    label: Running Status
    type: composite
    description: "Returns power status, cooling process, power-on/off process, and operation status."
    query_hex: "00 85 00 00 01 01 87"
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]

  - id: input_status
    label: Input Status
    type: composite
    description: "Returns signal switch process, signal list number, selection signal type, test pattern display, and content displayed."
    query_hex: "00 85 00 00 01 02 88"

  - id: mute_status
    label: Mute Status
    type: composite
    description: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, and OSD display states."
    query_hex: "00 85 00 00 01 03 89"

  - id: model_name
    label: Model Name
    type: string
    description: "Returns the model name string (up to 32 bytes, NUL-terminated)."
    query_hex: "00 85 00 00 01 04 8A"

  - id: cover_status
    label: Cover Status
    type: enum
    description: "Returns mirror cover or lens cover status."
    query_hex: "00 85 00 00 01 05 8B"
    values: [normal_cover_opened, cover_closed]

  - id: information_string
    label: Information String
    type: string
    description: "Returns horizontal or vertical sync frequency as a string."
    query_hex: "00 D0 00 00 03 00 <DATA01> 01 <CKS>"
    params:
      - name: info_type
        type: integer
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  - id: eco_mode
    label: Eco Mode
    type: enum
    description: "Returns the current eco/lamp/light mode value."
    query_hex: "03 B0 00 00 01 07 BB"

  - id: projector_name
    label: Projector Name
    type: string
    description: "Returns the projector name (up to 17 bytes, NUL-terminated)."
    query_hex: "03 B0 00 00 01 2C E0"

  - id: mac_address
    label: MAC Address
    type: string
    description: "Returns the projector MAC address (6 bytes)."
    query_hex: "03 B0 00 00 02 9A 00 4F"

  - id: pip_pbp_status
    label: PIP/PBP Status
    type: composite
    description: "Returns current PIP/PBP mode, start position, or sub-input setting."
    query_hex: "03 B0 00 00 02 C5 <DATA01> <CKS>"

  - id: edge_blending_status
    label: Edge Blending Status
    type: enum
    description: "Returns whether edge blending is on or off."
    query_hex: "03 B0 00 00 02 DF 00 94"
    values: [off, on]

  - id: base_model_type
    label: Base Model Type
    type: composite
    description: "Returns base model type and model name."
    query_hex: "00 BF 00 00 01 00 C0"

  - id: serial_number
    label: Serial Number
    type: string
    description: "Returns the projector serial number (up to 16 bytes, NUL-terminated)."
    query_hex: "00 BF 00 00 02 01 06 C8"

  - id: basic_information
    label: Basic Information
    type: composite
    description: "Returns operation status, content displayed, signal types, video/sound/onscreen mute, and freeze status."
    query_hex: "00 BF 00 00 01 02 C2"
```

## Variables
```yaml
variables:
  - id: volume
    label: Volume
    type: integer
    description: "Sound volume level, adjustable via absolute or relative value."

  - id: brightness
    label: Brightness
    type: integer
    description: "Picture brightness adjustment."

  - id: contrast
    label: Contrast
    type: integer
    description: "Picture contrast adjustment."

  - id: color
    label: Color
    type: integer
    description: "Picture color adjustment."

  - id: hue
    label: Hue
    type: integer
    description: "Picture hue adjustment."

  - id: sharpness
    label: Sharpness
    type: integer
    description: "Picture sharpness adjustment."

  - id: lamp_level
    label: Lamp/Light Level
    type: integer
    description: "Lamp or light output level adjustment."
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol described in source; all responses are query/reply
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # cooling process locks out further commands
interlocks:
  - description: "No commands accepted during power-on sequence or cooling process after power-off"
  - description: "Error status bitmask includes cover error, fan error, temperature error, lamp errors - device may refuse commands when errors are active"
# UNRESOLVED: full power-on sequencing timing not stated
```

## Notes
- Binary protocol: all commands and responses are hex byte sequences, not ASCII strings.
- Checksum (CKS) is the low byte of the sum of all preceding bytes.
- Commands include control ID (ID1) and model code (ID2) parameters that vary per installation/model.
- Input terminal values, aspect values, eco mode values, and PIP sub-input values reference an appendix ("Supplementary Information by Command") not included in the source — these lookup tables are needed for full interoperability.
- Baud rate supports 4800/9600/19200/38400/115200; default not stated.
- Sound mute is automatically cleared by input switch, signal switch, or volume adjustment.
- Picture mute is automatically cleared by input switch or signal switch.
- Remote key code command emulates physical remote control keys (POWER ON/OFF, MENU, navigation, source select, volume, freeze, aspect, eco mode).
<!-- UNRESOLVED: appendix with input terminal hex values not in source -->
<!-- UNRESOLVED: appendix with aspect ratio hex values not in source -->
<!-- UNRESOLVED: appendix with eco mode hex values not in source -->
<!-- UNRESOLVED: appendix with base model type hex values not in source -->
<!-- UNRESOLVED: appendix with PIP sub-input setting values not in source -->
<!-- UNRESOLVED: wireless LAN details deferred to separate operation manual -->
<!-- UNRESOLVED: default baud rate not stated -->
<!-- UNRESOLVED: flow control setting not stated -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T07:46:51.270Z
last_checked_at: 2026-05-16T12:37:58.490Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T12:37:58.490Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions matched verbatim in source; Feedbacks section enumerates all source query commands; comprehensive bidirectional coverage of command catalogue. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Appendix \"Supplementary Information by Command\" referenced throughout but not included in source — input terminal values, aspect values, eco mode values, base model type values, and sub-input values for PIP are incomplete"
- "wireless LAN connection details deferred to separate operation manual"
- "flow_control not stated in source"
- "flow control not stated in source"
- "no unsolicited notification protocol described in source; all responses are query/reply"
- "no multi-step macro sequences described in source"
- "full power-on sequencing timing not stated"
- "appendix with input terminal hex values not in source"
- "appendix with aspect ratio hex values not in source"
- "appendix with eco mode hex values not in source"
- "appendix with base model type hex values not in source"
- "appendix with PIP sub-input setting values not in source"
- "wireless LAN details deferred to separate operation manual"
- "default baud rate not stated"
- "flow control setting not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
