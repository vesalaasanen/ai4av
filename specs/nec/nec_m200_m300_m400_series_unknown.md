---
spec_id: admin/nec-m200-m300-m400-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC M200 M300 M400 Series Control Spec"
manufacturer: NEC
model_family: M200
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - M200
    - M300
    - M400
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-14T17:47:46.351Z
last_checked_at: 2026-06-09T23:42:13.145Z
generated_at: 2026-06-09T23:42:13.145Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model list not explicitly enumerated in source; title references M200 M300 M400 Series"
  - "specific input terminal values require Appendix \"Supplementary Information by Command\" not included in source"
  - "eco mode values require Appendix not included in source"
  - "aspect values require Appendix not included in source"
  - "flow control not stated; full duplex mode stated"
  - "gain parameter ranges (min/max/default) are queryable per device instance"
  - "power-on sequencing timing requirements not specified."
  - "cooling duration not specified."
  - "exact default baud rate not stated (9600 is one of five options)"
  - "input terminal byte values require Appendix"
  - "eco mode values require Appendix"
  - "aspect ratio values require Appendix"
  - "base model type values require Appendix"
  - "sub input setting values for PIP/PBP require Appendix"
  - "wireless LAN communication conditions not specified"
verification:
  verdict: verified
  checked_at: 2026-06-09T23:42:13.145Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec commands verified with exact matches in source; command families expanded by spec match source's parameterized structure; bidirectional coverage complete. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# NEC M200 M300 M400 Series Control Spec

## Summary

NEC M200/M300/M400 series projectors controlled via RS-232C serial or TCP/IP LAN (wired/wireless). Binary command protocol with hex-encoded frames, checksum validation, and error response codes. Covers power, input switching, mute, picture/volume adjust, lens control, shutter, freeze, eco mode, edge blending, PIP, and various status queries.

<!-- UNRESOLVED: exact model list not explicitly enumerated in source; title references M200 M300 M400 Series -->
<!-- UNRESOLVED: specific input terminal values require Appendix "Supplementary Information by Command" not included in source -->
<!-- UNRESOLVED: eco mode values require Appendix not included in source -->
<!-- UNRESOLVED: aspect values require Appendix not included in source -->

## Transport

```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; full duplex mode stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
traits:
  - powerable
  - routable
  - queryable
  - levelable
```

## Actions

```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    description: "Turns on the projector power. No other commands accepted during power-on sequence."
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    description: "Turns off the projector power. No other commands accepted during power-off and cooling."
    params: []

  - id: input_switch
    label: Input Switch Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    description: "Switches the input terminal or entry list."
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal byte value (see Appendix). e.g. 06h = Video port"

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    description: "Turns picture mute on. Auto-off on input or signal switch."
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
    description: "Turns sound mute on. Auto-off on input/signal switch or volume adjust."
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
    description: "Turns onscreen mute on."
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
    command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02>-<DATA04> <CKS>"
    description: "Adjusts picture parameters."
    params:
      - name: target
        type: integer
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: integer
        description: "00h=Absolute, 01h=Relative"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte, high byte)"

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h <DATA01>-<DATA03> <CKS>"
    description: "Adjusts sound volume."
    params:
      - name: mode
        type: integer
        description: "00h=Absolute, 01h=Relative"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte, high byte)"

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    description: "Adjusts aspect ratio."
    params:
      - name: aspect_value
        type: integer
        description: "Aspect value (see Appendix)"

  - id: other_adjust
    label: Lamp/Light Adjust
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03>-<DATA05> <CKS>"
    description: "Adjusts lamp/light output."
    params:
      - name: target
        type: integer
        description: "96h FFh = LAMP ADJUST / LIGHT ADJUST"
      - name: mode
        type: integer
        description: "00h=Absolute, 01h=Relative"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte, high byte)"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: "Sends remote control key code."
    params:
      - name: key_code
        type: integer
        description: "WORD key code. Examples: 02h00h=POWER ON, 03h00h=POWER OFF, 05h00h=AUTO, 0Ah00h=LEFT, 0Bh00h=ENTER"

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
    description: "Adjusts lens position (zoom/focus/shift). Send 00h to stop continuous drive."
    params:
      - name: axis
        type: integer
        description: "06h=Periphery Focus"
      - name: direction
        type: integer
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01>-<DATA04> <CKS>"
    description: "Adjusts lens position with absolute/relative value."
    params:
      - name: target
        type: integer
        description: "FFh=Stop, or lens axis"
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
    description: "Controls lens memory."
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    description: "Controls reference lens memory for current profile."
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
    description: "Selects reference lens memory profile."
    params:
      - name: profile
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    description: "Toggles freeze function."
    params:
      - name: state
        type: integer
        description: "01h=On, 02h=Off"

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    description: "Sets eco/lamp/light mode."
    params:
      - name: eco_value
        type: integer
        description: "Eco mode value (see Appendix)"

  - id: projector_name_set
    label: Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01>-<DATA16> 00h <CKS>"
    description: "Sets projector name (up to 16 bytes)."
    params:
      - name: name
        type: string
        description: "Projector name up to 16 bytes"

  - id: pip_pbp_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    description: "Sets PIP or Picture by Picture mode, position, or sub-input."
    params:
      - name: parameter
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "MODE: 00h=PIP, 01h=PBP; POSITION: 00h=TL, 01h=TR, 02h=BL, 03h=BR; or sub input value"

  - id: edge_blending_set
    label: Edge Blending Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    description: "Enables or disables edge blending."
    params:
      - name: value
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    description: "Sets audio input source."
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal value (see Appendix)"
      - name: audio_source
        type: integer
        description: "00h=Terminal specified in input, 01h=BNC, 02h=COMPUTER"
  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    description: "Gets error information from the projector. Returns 12-byte error bitmap."
    params: []

  - id: information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    description: "Gets projector name, lamp usage time, and filter usage time."
    params: []

  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    description: "Gets filter usage time and filter alarm start time in seconds."
    params: []

  - id: lamp_information_request
    label: Lamp Information Request
    kind: query
    command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: "Gets lamp usage time or remaining life for specified lamp."
    params:
      - name: lamp_number
        type: integer
        description: "00h=Lamp 1, 01h=Lamp 2"
      - name: content
        type: integer
        description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    description: "Gets Carbon Saving values in kg and mg."
    params:
      - name: scope
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
    description: "Gets upper/lower adjustment limits and current value for specified lens axis."
    params:
      - name: axis
        type: integer
        description: "Lens axis. 06h=Periphery Focus"

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
    description: "Gets the ON/OFF setting for the specified lens memory option."
    params:
      - name: option
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    description: "Gets lens operation status bitmap for lens memory, zoom, focus, and shift."
    params: []

  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    description: "Gets the selected profile number of the reference lens memory."
    params: []

  - id: gain_parameter_request
    label: Gain Parameter Request
    kind: query
    command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
    description: "Gets adjusted value, limits, and default for picture, volume, or lamp/light."
    params:
      - name: gain_target
        type: integer
        description: "00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"

  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    description: "Gets projector settings: base model type, sound function, and profile number."
    params: []

  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    description: "Gets operation status: power status, cooling, power on/off process, and operation status."
    params: []

  - id: input_status_request
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    description: "Gets input signal status including signal list number, selection signal type, and content displayed."
    params: []

  - id: mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    description: "Gets mute status for picture, sound, onscreen, forced onscreen, and display."
    params: []

  - id: model_name_request
    label: Model Name Request
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    description: "Gets the projector model name string."
    params: []

  - id: cover_status_request
    label: Cover Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    description: "Gets the status of the mirror cover or lens cover."
    params: []

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
    description: "Gets horizontal or vertical synchronous frequency string."
    params:
      - name: information_type
        type: integer
        description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

  - id: eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    description: "Gets the value set for the eco mode (light mode or lamp mode)."
    params: []

  - id: lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    description: "Gets the LAN projector name (17-byte NUL-terminated string)."
    params: []

  - id: lan_mac_address_request
    label: LAN MAC Address Request
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    description: "Gets the MAC address of the projector (6 bytes)."
    params: []

  - id: pip_pbp_request
    label: PIP/Picture by Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
    description: "Gets the value set for PIP or Picture by Picture."
    params:
      - name: parameter
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    description: "Gets the value set for edge blending."
    params: []

  - id: base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    description: "Gets the base model type and model name string."
    params: []

  - id: serial_number_request
    label: Serial Number Request
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    description: "Gets the projector serial number string (16 bytes)."
    params: []

  - id: basic_information_request
    label: Basic Information Request
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    description: "Gets basic projector information: operation status, content displayed, signal types, mute and freeze status."
    params: []
```

## Feedbacks

```yaml
feedbacks:
  - id: error_status
    type: binary_bitmap
    description: "12-byte error status bitmap. Bit=0 normal, Bit=1 error. Covers cover, fan, temperature, power, lamp, formatter, FPGA, interlock, lens, iris, ballast errors."

  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
    description: "From RUNNING STATUS REQUEST DATA03/DATA06."

  - id: input_status
    type: composite
    description: "Input signal status including signal list number, selection signal type, signal list type, test pattern, content displayed."

  - id: mute_status
    type: composite
    description: "Picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display - each on/off."

  - id: model_name
    type: string
    description: "Projector model name string."

  - id: cover_status
    type: enum
    values: [normal_open, closed]
    description: "Mirror cover or lens cover status."

  - id: projector_info
    type: composite
    description: "Projector name (49 bytes), lamp usage time (seconds), filter usage time (seconds)."

  - id: filter_usage_info
    type: composite
    description: "Filter usage time (seconds) and filter alarm start time (seconds)."

  - id: lamp_info
    type: composite
    description: "Lamp usage time (seconds) or lamp remaining life (%). Supports lamp 1 and lamp 2."

  - id: carbon_savings
    type: composite
    description: "Carbon savings in kg and mg, total or during operation."

  - id: lens_position
    type: composite
    description: "Lens adjustment range (upper/lower limits) and current position for specified axis."

  - id: lens_memory_option
    type: composite
    description: "Lens memory option (LOAD BY SIGNAL / FORCED MUTE) and its ON/OFF state."

  - id: lens_information
    type: binary_bitmap
    description: "Lens operation status bitmap: lens memory, zoom, focus, lens shift H/V - stop or during operation."

  - id: lens_profile
    type: enum
    values: [profile_1, profile_2]
    description: "Selected reference lens memory profile."

  - id: gain_parameter
    type: composite
    description: "Gain parameter details: status, upper/lower limits, default, current value, adjustment widths. Targets: brightness, contrast, color, hue, sharpness, volume, lamp adjust."

  - id: running_status
    type: composite
    description: "Power status, cooling process, power on/off process, operation status."

  - id: settings_info
    type: composite
    description: "Base model type, sound function availability, profile number (clock/sleep timer)."

  - id: information_string
    type: string
    description: "Horizontal or vertical synchronous frequency string."

  - id: eco_mode
    type: enum
    description: "Current eco/lamp/light mode value (see Appendix)."

  - id: projector_name
    type: string
    description: "LAN projector name (17 bytes)."

  - id: mac_address
    type: string
    description: "MAC address (6 bytes)."

  - id: pip_pbp_status
    type: composite
    description: "PIP/PBP mode, start position, sub input settings."

  - id: edge_blending_status
    type: enum
    values: [off, on]
    description: "Edge blending mode."

  - id: base_model_type
    type: composite
    description: "Base model type and model name string."

  - id: serial_number
    type: string
    description: "Projector serial number string (16 bytes)."

  - id: basic_information
    type: composite
    description: "Operation status, content displayed, signal type, display signal type, video/sound/onscreen mute, freeze status."
```

## Variables

```yaml
# UNRESOLVED: gain parameter ranges (min/max/default) are queryable per device instance
# but not fixed in the source. Use gain_parameter_request to discover.
```

## Events

```yaml
# Source describes no unsolicited notification protocol.
# All responses are command-reply. No event section applicable.
```

## Macros

```yaml
# No multi-step macro sequences described in source.
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# Source notes: no other commands accepted during power-on or power-off (including cooling).
# Source notes: error bit for interlock switch open (DATA09 Bit1).
# UNRESOLVED: power-on sequencing timing requirements not specified.
# UNRESOLVED: cooling duration not specified.
```

## Notes

- Binary protocol: commands are hex byte sequences with checksum (low byte of sum of preceding bytes).
- Commands include ID1 (control ID, projector-settable) and ID2 (model code) in responses.
- Error responses carry ERR1/ERR2 codes (see error code table in source).
- Baud rate supports 4800/9600/19200/38400/115200 bps; 9600 listed as one option. Default not stated.
- TCP port 7142 for LAN command transport.
- Many parameter values (input terminals, eco modes, aspects, base model types) require an Appendix section not included in this source excerpt.
- Lens control supports timed drives (0.25s/0.5s/1s) and continuous drive (stop with 00h).
- Lamp remaining life can return negative value if replacement deadline exceeded.

<!-- UNRESOLVED: exact default baud rate not stated (9600 is one of five options) -->
<!-- UNRESOLVED: input terminal byte values require Appendix -->
<!-- UNRESOLVED: eco mode values require Appendix -->
<!-- UNRESOLVED: aspect ratio values require Appendix -->
<!-- UNRESOLVED: base model type values require Appendix -->
<!-- UNRESOLVED: sub input setting values for PIP/PBP require Appendix -->
<!-- UNRESOLVED: wireless LAN communication conditions not specified -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-14T17:47:46.351Z
last_checked_at: 2026-06-09T23:42:13.145Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T23:42:13.145Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec commands verified with exact matches in source; command families expanded by spec match source's parameterized structure; bidirectional coverage complete. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model list not explicitly enumerated in source; title references M200 M300 M400 Series"
- "specific input terminal values require Appendix \"Supplementary Information by Command\" not included in source"
- "eco mode values require Appendix not included in source"
- "aspect values require Appendix not included in source"
- "flow control not stated; full duplex mode stated"
- "gain parameter ranges (min/max/default) are queryable per device instance"
- "power-on sequencing timing requirements not specified."
- "cooling duration not specified."
- "exact default baud rate not stated (9600 is one of five options)"
- "input terminal byte values require Appendix"
- "eco mode values require Appendix"
- "aspect ratio values require Appendix"
- "base model type values require Appendix"
- "sub input setting values for PIP/PBP require Appendix"
- "wireless LAN communication conditions not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
