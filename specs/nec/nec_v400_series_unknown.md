---
spec_id: admin/nec-v400-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC V400 Series Control Spec"
manufacturer: NEC
model_family: "NEC V400 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NEC V400 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T08:16:24.617Z
last_checked_at: 2026-05-18T16:39:33.254Z
generated_at: 2026-05-18T16:39:33.254Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact V400 Series model variants not enumerated in source"
  - "default baud rate not stated (multiple supported)"
  - "input terminal hex values referenced in appendix not included in source"
  - "eco mode values referenced in appendix not included in source"
  - "aspect values referenced in appendix not included in source"
  - "sub input values for PIP referenced in appendix not included in source"
  - "base model type values referenced in appendix not included in source"
  - "ID1 control ID and ID2 model code values not stated"
  - "flow control setting not stated for serial"
  - "default not stated; supported: 115200, 38400, 19200, 9600, 4800"
  - "flow control not stated in source"
  - "full input terminal value list in appendix not in source"
  - "aspect values in appendix not in source"
  - "other DATA01 values for zoom/shift not in source"
  - "eco mode values in appendix not in source"
  - "sub input values in appendix not in source"
  - "input terminal values in appendix not in source"
  - "eco mode return values in appendix not in source"
  - "base model type values in appendix not in source"
  - "no persistent settable variables beyond those covered by actions"
verification:
  verdict: verified
  checked_at: 2026-05-18T16:39:33.254Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions match literal command tokens in source; transport parameters verified; feedbacks represent all source query commands. (20 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# NEC V400 Series Control Spec

## Summary
NEC V400 Series projector control via RS-232 serial and TCP/IP (wired/wireless LAN). Binary protocol with hex byte frames, checksum validation, and control ID + model code parameters. Covers power, input routing, picture/sound/onscreen mute, volume, lens control, shutter, freeze, eco mode, edge blending, PIP, and extensive status queries.

<!-- UNRESOLVED: exact V400 Series model variants not enumerated in source -->
<!-- UNRESOLVED: default baud rate not stated (multiple supported) -->
<!-- UNRESOLVED: input terminal hex values referenced in appendix not included in source -->
<!-- UNRESOLVED: eco mode values referenced in appendix not included in source -->
<!-- UNRESOLVED: aspect values referenced in appendix not included in source -->
<!-- UNRESOLVED: sub input values for PIP referenced in appendix not included in source -->
<!-- UNRESOLVED: base model type values referenced in appendix not included in source -->
<!-- UNRESOLVED: ID1 control ID and ID2 model code values not stated -->
<!-- UNRESOLVED: flow control setting not stated for serial -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: null  # UNRESOLVED: default not stated; supported: 115200, 38400, 19200, 9600, 4800
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
  - powerable  # inferred from power on/off commands
  - queryable  # inferred from extensive request/status commands
  - routable  # inferred from input switch command
  - levelable  # inferred from volume, brightness, contrast, color, hue, sharpness, lamp adjust
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
    description: "Turns off projector power. No other commands accepted during power-off and cooling."
    params: []

  - id: input_switch
    label: Input Switch Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    description: "Switches the input terminal or entry list."
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal hex value. Values defined in appendix (e.g. 06h = Video)."
        # UNRESOLVED: full input terminal value list in appendix not in source

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
    description: "Turns onscreen mute on. Cleared by input switch or signal switch."
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
        type: enum
        values:
          - value: "00h"
            label: brightness
          - value: "01h"
            label: contrast
          - value: "02h"
            label: color
          - value: "03h"
            label: hue
          - value: "04h"
            label: sharpness
        description: "Adjustment target"
      - name: mode
        type: enum
        values:
          - value: "00h"
            label: absolute
          - value: "01h"
            label: relative
        description: "Adjustment mode"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte, high byte)"

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
    description: "Adjusts sound volume."
    params:
      - name: mode
        type: enum
        values:
          - value: "00h"
            label: absolute
          - value: "01h"
            label: relative
        description: "Adjustment mode"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte, high byte)"

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    description: "Adjusts the aspect ratio."
    params:
      - name: aspect
        type: integer
        description: "Aspect value. Values defined in appendix."
        # UNRESOLVED: aspect values in appendix not in source

  - id: lamp_adjust
    label: Lamp/Light Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 96h FFh <DATA03> <DATA04> <DATA05> <CKS>"
    description: "Adjusts lamp/light output."
    params:
      - name: mode
        type: enum
        values:
          - value: "00h"
            label: absolute
          - value: "01h"
            label: relative
        description: "Adjustment mode"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte, high byte)"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: "Sends a remote control key code."
    params:
      - name: key_code
        type: enum
        values:
          - value: "0200h"
            label: POWER ON
          - value: "0300h"
            label: POWER OFF
          - value: "0500h"
            label: AUTO
          - value: "0600h"
            label: MENU
          - value: "0700h"
            label: UP
          - value: "0800h"
            label: DOWN
          - value: "0900h"
            label: RIGHT
          - value: "0A00h"
            label: LEFT
          - value: "0B00h"
            label: ENTER
          - value: "0C00h"
            label: EXIT
          - value: "0D00h"
            label: HELP
          - value: "0F00h"
            label: MAGNIFY UP
          - value: "1000h"
            label: MAGNIFY DOWN
          - value: "1300h"
            label: MUTE
          - value: "2900h"
            label: PICTURE
          - value: "4B00h"
            label: COMPUTER1
          - value: "4C00h"
            label: COMPUTER2
          - value: "4F00h"
            label: VIDEO1
          - value: "5100h"
            label: S-VIDEO1
          - value: "8400h"
            label: VOLUME UP
          - value: "8500h"
            label: VOLUME DOWN
          - value: "8A00h"
            label: FREEZE
          - value: "A300h"
            label: ASPECT
          - value: "D700h"
            label: SOURCE
          - value: "EE00h"
            label: LAMP MODE/ECO
        description: "16-bit key code (DATA01=low, DATA02=high)"

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
    command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: "Adjusts lens position (focus, zoom, shift). Send 00h to stop continuous drive."
    params:
      - name: axis
        type: enum
        values:
          - value: "06h"
            label: periphery_focus
        description: "Lens axis"
        # UNRESOLVED: other DATA01 values for zoom/shift not in source
      - name: direction
        type: enum
        values:
          - value: "00h"
            label: stop
          - value: "01h"
            label: plus_1s
          - value: "02h"
            label: plus_0.5s
          - value: "03h"
            label: plus_0.25s
          - value: "7Fh"
            label: plus_continuous
          - value: "81h"
            label: minus_continuous
          - value: "FDh"
            label: minus_0.25s
          - value: "FEh"
            label: minus_0.5s
          - value: "FFh"
            label: minus_1s
        description: "Drive direction and duration"

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    description: "Adjusts lens position with absolute/relative value."
    params:
      - name: axis
        type: integer
        description: "Lens axis (FFh = stop)"
      - name: mode
        type: enum
        values:
          - value: "00h"
            label: absolute
          - value: "02h"
            label: relative
        description: "Adjustment mode"
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
        type: enum
        values:
          - value: "00h"
            label: move
          - value: "01h"
            label: store
          - value: "02h"
            label: reset

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    description: "Controls reference lens memory for current profile (MOVE/STORE/RESET)."
    params:
      - name: operation
        type: enum
        values:
          - value: "00h"
            label: move
          - value: "01h"
            label: store
          - value: "02h"
            label: reset

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: "Sets lens memory options."
    params:
      - name: option
        type: enum
        values:
          - value: "00h"
            label: load_by_signal
          - value: "01h"
            label: forced_mute
      - name: setting
        type: enum
        values:
          - value: "00h"
            label: "off"
          - value: "01h"
            label: "on"

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
    description: "Selects reference lens memory profile."
    params:
      - name: profile
        type: enum
        values:
          - value: "00h"
            label: profile_1
          - value: "01h"
            label: profile_2

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    description: "Controls freeze function on/off."
    params:
      - name: state
        type: enum
        values:
          - value: "01h"
            label: "on"
          - value: "02h"
            label: "off"

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    description: "Sets eco/lamp mode."
    params:
      - name: mode
        type: integer
        description: "Eco mode value. Values defined in appendix."
        # UNRESOLVED: eco mode values in appendix not in source

  - id: projector_name_set
    label: Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01-16> 00h <CKS>"
    description: "Sets the projector name (up to 16 bytes)."
    params:
      - name: name
        type: string
        description: "Projector name, up to 16 bytes"

  - id: pip_pbp_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    description: "Sets PIP or picture-by-picture mode, position, or sub-input."
    params:
      - name: target
        type: enum
        values:
          - value: "00h"
            label: mode
          - value: "01h"
            label: start_position
          - value: "02h"
            label: sub_input_1
          - value: "09h"
            label: sub_input_2
          - value: "0Ah"
            label: sub_input_3
      - name: value
        type: integer
        description: "Mode value or sub-input value. Appendix defines sub-input values."
        # UNRESOLVED: sub input values in appendix not in source

  - id: edge_blending_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    description: "Sets edge blending on/off."
    params:
      - name: state
        type: enum
        values:
          - value: "00h"
            label: "off"
          - value: "01h"
            label: "on"

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    description: "Sets audio input source for a given terminal."
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal value. Values defined in appendix."
        # UNRESOLVED: input terminal values in appendix not in source
      - name: audio_source
        type: enum
        values:
          - value: "00h"
            label: same_terminal
          - value: "01h"
            label: bnc
          - value: "02h"
            label: computer
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    label: Error Status
    type: binary
    command: "00h 88h 00h 00h 00h 88h"
    description: "Returns 12 bytes of error bit flags (cover, fan, temp, lamp, formatter, FPGA, etc.)."

  - id: information
    label: Projector Information
    type: string
    command: "03h 8Ah 00h 00h 00h 8Dh"
    description: "Returns projector name (49 bytes), lamp usage time (seconds), filter usage time (seconds)."

  - id: filter_usage
    label: Filter Usage Information
    type: integer
    command: "03h 95h 00h 00h 00h 98h"
    description: "Returns filter usage time and filter alarm start time (seconds)."

  - id: lamp_information
    label: Lamp Information
    type: integer
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: "Returns lamp usage time (seconds) or remaining life (%)."
    params:
      - name: lamp
        type: enum
        values:
          - value: "00h"
            label: lamp_1
          - value: "01h"
            label: lamp_2
      - name: content
        type: enum
        values:
          - value: "01h"
            label: usage_time
          - value: "04h"
            label: remaining_life_percent

  - id: carbon_savings
    label: Carbon Savings Information
    type: integer
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    description: "Returns carbon savings in kg and mg."
    params:
      - name: type
        type: enum
        values:
          - value: "00h"
            label: total
          - value: "01h"
            label: during_operation

  - id: lens_position
    label: Lens Position
    type: integer
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    description: "Returns upper/lower limits and current value for a lens axis."

  - id: lens_memory_option
    label: Lens Memory Option
    type: enum
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    description: "Returns lens memory option setting (load by signal / forced mute)."
    params:
      - name: option
        type: enum
        values:
          - value: "00h"
            label: load_by_signal
          - value: "01h"
            label: forced_mute

  - id: lens_information
    label: Lens Operation Status
    type: binary
    command: "02h 22h 00h 00h 01h 00h 25h"
    description: "Returns bit flags for lens memory, zoom, focus, shift H/V operation status."

  - id: lens_profile
    label: Lens Profile
    type: enum
    command: "02h 28h 00h 00h 00h 2Ah"
    description: "Returns selected reference lens memory profile (profile 1 or 2)."

  - id: gain_parameter
    label: Gain Parameter
    type: integer
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    description: "Returns adjustment status, range limits, default, and current value for a gain parameter."
    params:
      - name: parameter
        type: enum
        values:
          - value: "00h"
            label: brightness
          - value: "01h"
            label: contrast
          - value: "02h"
            label: color
          - value: "03h"
            label: hue
          - value: "04h"
            label: sharpness
          - value: "05h"
            label: volume
          - value: "96h"
            label: lamp_adjust

  - id: setting
    label: Projector Setting
    type: binary
    command: "00h 85h 00h 00h 01h 00h 86h"
    description: "Returns base model type, sound function availability, profile/clock/sleep info."

  - id: running_status
    label: Running Status
    type: enum
    command: "00h 85h 00h 00h 01h 01h 87h"
    description: "Returns power status, cooling status, power-on/off process, operation status."

  - id: input_status
    label: Input Status
    type: enum
    command: "00h 85h 00h 00h 01h 02h 88h"
    description: "Returns signal switch status, signal list number, selection signal type, content displayed."

  - id: mute_status
    label: Mute Status
    type: enum
    command: "00h 85h 00h 00h 01h 03h 89h"
    description: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, OSD status."

  - id: model_name
    label: Model Name
    type: string
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    description: "Returns model name string."

  - id: cover_status
    label: Cover Status
    type: enum
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    description: "Returns mirror/lens cover open/closed status."
    values:
      - "00h: normal (cover opened)"
      - "01h: cover closed"

  - id: info_string
    label: Information String
    type: string
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    description: "Returns horizontal or vertical sync frequency string."
    params:
      - name: type
        type: enum
        values:
          - value: "03h"
            label: horizontal_sync_freq
          - value: "04h"
            label: vertical_sync_freq

  - id: eco_mode
    label: Eco Mode
    type: integer
    command: "03h B0h 00h 00h 01h 07h BBh"
    description: "Returns current eco/lamp mode setting."
    # UNRESOLVED: eco mode return values in appendix not in source

  - id: projector_name
    label: Projector Name
    type: string
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    description: "Returns projector name (up to 17 bytes)."

  - id: mac_address
    label: MAC Address
    type: string
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    description: "Returns MAC address (6 bytes)."

  - id: pip_pbp_status
    label: PIP/Picture by Picture Status
    type: enum
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    description: "Returns PIP/PBP mode, start position, or sub-input setting."
    params:
      - name: target
        type: enum
        values:
          - value: "00h"
            label: mode
          - value: "01h"
            label: start_position
          - value: "02h"
            label: sub_input_1
          - value: "09h"
            label: sub_input_2
          - value: "0Ah"
            label: sub_input_3

  - id: edge_blending_status
    label: Edge Blending Status
    type: enum
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    description: "Returns edge blending on/off."
    values:
      - "00h: off"
      - "01h: on"

  - id: base_model_type
    label: Base Model Type
    type: string
    command: "00h BFh 00h 00h 01h 00h C0h"
    description: "Returns base model type and model name."
    # UNRESOLVED: base model type values in appendix not in source

  - id: serial_number
    label: Serial Number
    type: string
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    description: "Returns serial number (up to 16 bytes)."

  - id: basic_information
    label: Basic Information
    type: binary
    command: "00h BFh 00h 00h 01h 02h C2h"
    description: "Returns operation status, content displayed, signal type, mute states, freeze status."
```

## Variables
```yaml
# UNRESOLVED: no persistent settable variables beyond those covered by actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety interlock procedures or power-on sequencing documented
# Note: power on/off commands block all other commands during execution (including cooling)
```

## Notes
Binary protocol: commands are hex byte frames with structure `<header> <command> <ID1> <ID2> <LEN> <DATA...> <CKS>`. Checksum is low-order byte of sum of all preceding bytes. Response headers start with `2xh` (success) or `Axh` (error with ERR1/ERR2 codes). The protocol uses two identity parameters: ID1 (control ID, set on projector) and ID2 (model code, model-dependent). Values for these are not documented in this source.

Error responses use ERR1/ERR2 code pairs (see error code table in source). Common errors: unrecognized command (00h/00h), unsupported command (00h/01h), invalid value (01h/00h), power off rejection (02h/0Dh).

Several command parameters reference an appendix ("Supplementary Information by Command") for input terminal values, aspect values, eco mode values, base model types, and sub-input values for PIP — this appendix was not included in the refined source document.
<!-- UNRESOLVED: appendix with input terminal, aspect, eco mode, base model type, and PIP sub-input value tables not present in source -->
<!-- UNRESOLVED: flow_control not stated for serial -->
<!-- UNRESOLVED: ID1 control ID default and ID2 model code values not stated -->
<!-- UNRESOLVED: no unsolicited event/notification mechanism documented -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T08:16:24.617Z
last_checked_at: 2026-05-18T16:39:33.254Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T16:39:33.254Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions match literal command tokens in source; transport parameters verified; feedbacks represent all source query commands. (20 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact V400 Series model variants not enumerated in source"
- "default baud rate not stated (multiple supported)"
- "input terminal hex values referenced in appendix not included in source"
- "eco mode values referenced in appendix not included in source"
- "aspect values referenced in appendix not included in source"
- "sub input values for PIP referenced in appendix not included in source"
- "base model type values referenced in appendix not included in source"
- "ID1 control ID and ID2 model code values not stated"
- "flow control setting not stated for serial"
- "default not stated; supported: 115200, 38400, 19200, 9600, 4800"
- "flow control not stated in source"
- "full input terminal value list in appendix not in source"
- "aspect values in appendix not in source"
- "other DATA01 values for zoom/shift not in source"
- "eco mode values in appendix not in source"
- "sub input values in appendix not in source"
- "input terminal values in appendix not in source"
- "eco mode return values in appendix not in source"
- "base model type values in appendix not in source"
- "no persistent settable variables beyond those covered by actions"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
