---
spec_id: admin/nec-np-mexxxw-mexxxx
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP MExxxW MExxxX Control Spec"
manufacturer: NEC
model_family: "NP MExxxW"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NP MExxxW"
    - "NP MExxxX"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T08:32:31.256Z
last_checked_at: 2026-06-02T22:10:48.831Z
generated_at: 2026-06-02T22:10:48.831Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific model variants within MExxxW/MExxxX family not enumerated — source uses generic series name"
  - "input terminal value mapping deferred to vendor appendix \"Supplementary Information by Command\" — not present in this source"
  - "eco mode value mapping deferred to vendor appendix"
  - "aspect value mapping deferred to vendor appendix"
  - "flow control not stated; RTS/CTS pins present on connector"
  - "no settable continuous parameters beyond actions already listed (volume, picture gains set via action commands)"
  - "source does not document unsolicited notifications from projector"
  - "no multi-step sequences described in source"
  - "no explicit safety interlock sequences documented in source"
  - "input terminal byte-value mapping (appendix not in source)"
  - "eco mode / lamp mode byte-value mapping"
  - "aspect ratio byte-value mapping"
  - "PIP/PbP sub input value mapping"
  - "base model type value mapping"
  - "wireless LAN command specifics (referred to wireless LAN unit manual)"
  - "flow control configuration for serial (RTS/CTS pins wired but no software flow control documented)"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:10:48.831Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions traced to source (dip-safe re-verify). (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# NEC NP MExxxW MExxxX Control Spec

## Summary

NEC NP MExxxW / NP MExxxX series projectors. Binary control protocol over RS-232C serial and TCP/IP (wired/wireless LAN). Commands are hex byte sequences with a single-byte additive checksum. Covers power, input switching, picture/audio adjustment, lens control (zoom/focus/shift/memory), shutter, muting, freeze, eco mode, edge blending, PIP, and extensive status queries.

<!-- UNRESOLVED: specific model variants within MExxxW/MExxxX family not enumerated — source uses generic series name -->
<!-- UNRESOLVED: input terminal value mapping deferred to vendor appendix "Supplementary Information by Command" — not present in this source -->
<!-- UNRESOLVED: eco mode value mapping deferred to vendor appendix -->
<!-- UNRESOLVED: aspect value mapping deferred to vendor appendix -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # supported: 115200, 38400, 19200, 9600, 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated; RTS/CTS pins present on connector
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # power on/off commands
  - queryable     # extensive status request commands
  - levelable     # brightness, contrast, color, hue, sharpness, volume, lamp adjust
  - routable      # input terminal switching
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    description: "Turns on the projector. No other commands accepted during power-on sequence."
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    description: "Turns off the projector. No other commands accepted during cooldown."
    params: []

  - id: input_switch
    label: Switch Input
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    description: "Switches the input terminal."
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal byte value (e.g. 06h = video). Full mapping in vendor appendix."

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    description: "Turns picture mute on. Cleared by input/signal switch."
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
    description: "Turns sound mute on. Cleared by input/signal switch or volume adjustment."
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
    description: "Turns onscreen mute on. Cleared by input/signal switch."
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
    description: "Adjusts picture parameters (brightness, contrast, color, hue, sharpness)."
    params:
      - name: target
        type: integer
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: integer
        description: "00h=absolute, 01h=relative"
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
        type: integer
        description: "00h=absolute, 01h=relative"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte, high byte)"

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    description: "Adjusts aspect ratio. Value mapping in vendor appendix."
    params:
      - name: aspect_value
        type: integer
        description: "Aspect value byte (mapping in vendor appendix)"

  - id: lamp_adjust
    label: Lamp/Light Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 96h FFh <DATA03> <DATA04> <DATA05> <CKS>"
    description: "Adjusts lamp/light output."
    params:
      - name: mode
        type: integer
        description: "00h=absolute, 01h=relative"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte, high byte)"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: "Sends a remote control key code (WORD)."
    params:
      - name: key_code
        type: integer
        description: "16-bit key code (e.g. 0200h=POWER ON, 0300h=POWER OFF, 0500h=AUTO, 8400h=VOL UP, 8500h=VOL DOWN)"

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
    description: "Drives lens motor (periphery focus). Timed or continuous drive."
    params:
      - name: axis
        type: integer
        description: "06h=Periphery Focus"
      - name: direction
        type: integer
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=continuous+, 81h=continuous-, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    description: "Adjusts lens position with absolute or relative values."
    params:
      - name: axis
        type: integer
        description: "FFh=Stop; other values for axis selection"
      - name: mode
        type: integer
        description: "00h=absolute, 02h=relative"
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
    description: "Controls reference lens memory for the selected profile (MOVE/STORE/RESET)."
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
    description: "Sets lens memory options (LOAD BY SIGNAL or FORCED MUTE)."
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
    description: "Turns freeze function on or off."
    params:
      - name: state
        type: integer
        description: "01h=On, 02h=Off"

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    description: "Sets eco/lamp/light mode. Value mapping in vendor appendix."
    params:
      - name: mode
        type: integer
        description: "Eco mode value (mapping in vendor appendix)"

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
    label: PIP/Picture-by-Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    description: "Sets PIP or Picture-by-Picture mode, position, or sub input."
    params:
      - name: parameter
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "Mode: 00h=PIP, 01h=PbP; Position: 00h=TL, 01h=TR, 02h=BL, 03h=BR; Sub input: see appendix"

  - id: edge_blending_set
    label: Edge Blending Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
    description: "Sets edge blending on or off."
    params:
      - name: state
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
    description: "Sets audio input selection."
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal value (see appendix)"
      - name: audio_source
        type: integer
        description: "00h=follows specified terminal, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    label: Error Status
    type: binary_bitmap
    command: "00h 88h 00h 00h 00h 88h"
    description: "Returns 12 bytes of error bitmaps (cover, fan, temperature, lamp, power, formatter, FPGA, ballast, interlock, lens, iris errors)."

  - id: projector_information
    label: Projector Information
    type: composite
    command: "03h 8Ah 00h 00h 00h 8Dh"
    description: "Returns projector name (49 bytes), lamp usage time (seconds), filter usage time (seconds)."

  - id: filter_usage
    label: Filter Usage Information
    type: composite
    command: "03h 95h 00h 00h 00h 98h"
    description: "Returns filter usage time and filter alarm start time (seconds)."

  - id: lamp_information
    label: Lamp Information
    type: composite
    command: "03h 96h 00h 00h 02h <lamp> <content> <CKS>"
    description: "Returns lamp usage time (seconds) or remaining life (%). Lamp: 00h=Lamp1, 01h=Lamp2. Content: 01h=usage time, 04h=remaining life."

  - id: carbon_savings
    label: Carbon Savings Information
    type: composite
    command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
    description: "Returns carbon savings in kg and mg. DATA01: 00h=total, 01h=during operation."

  - id: running_status
    label: Running Status
    type: enum
    command: "00h 85h 00h 00h 01h 01h 87h"
    description: "Returns power status, cooling status, power-on/off process status, operation status."
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]

  - id: input_status
    label: Input Status
    type: composite
    command: "00h 85h 00h 00h 01h 02h 88h"
    description: "Returns signal switch status, signal list number, selection signal type, test pattern, content displayed."

  - id: mute_status
    label: Mute Status
    type: composite
    command: "00h 85h 00h 00h 01h 03h 89h"
    description: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, OSD status."

  - id: model_name
    label: Model Name
    type: string
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    description: "Returns model name as NUL-terminated string (up to 32 bytes)."

  - id: cover_status
    label: Cover Status
    type: enum
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    description: "Returns mirror cover or lens cover status."
    values: [normal_cover_opened, cover_closed]

  - id: lens_control_position
    label: Lens Control Position
    type: composite
    command: "02h 1Ch 00h 00h 02h <axis> 00h <CKS>"
    description: "Returns adjustment range (upper/lower limits) and current value for a lens axis."

  - id: lens_memory_option
    label: Lens Memory Option
    type: composite
    command: "02h 20h 00h 00h 01h <option> <CKS>"
    description: "Returns lens memory option setting. Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE."

  - id: lens_information
    label: Lens Information
    type: binary_bitmap
    command: "02h 22h 00h 00h 01h 00h 25h"
    description: "Returns bitmap of lens motor activity (memory, zoom, focus, shift H, shift V)."

  - id: lens_profile
    label: Lens Profile
    type: enum
    command: "02h 28h 00h 00h 00h 2Ah"
    description: "Returns selected reference lens memory profile."
    values: [profile_1, profile_2]

  - id: gain_parameter
    label: Gain Parameter
    type: composite
    command: "03h 05h 00h 00h 03h <param> 00h 00h <CKS>"
    description: "Returns adjustment range, default, and current value for a gain parameter. Param: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp Adjust."

  - id: setting_information
    label: Setting Information
    type: composite
    command: "00h 85h 00h 00h 01h 00h 86h"
    description: "Returns base model type, sound function availability, profile number."

  - id: information_string
    label: Information String
    type: string
    command: "00h D0h 00h 00h 03h 00h <type> 01h <CKS>"
    description: "Returns horizontal or vertical sync frequency string. Type: 03h=H-sync, 04h=V-sync."

  - id: eco_mode
    label: Eco Mode
    type: enum
    command: "03h B0h 00h 00h 01h 07h BBh"
    description: "Returns current eco/lamp/light mode. Value mapping in vendor appendix."

  - id: projector_name
    label: Projector Name
    type: string
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    description: "Returns projector name as NUL-terminated string (up to 17 bytes)."

  - id: mac_address
    label: MAC Address
    type: string
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    description: "Returns 6-byte MAC address."

  - id: pip_pbp_status
    label: PIP/Picture-by-Picture Status
    type: composite
    command: "03h B0h 00h 00h 02h C5h <param> <CKS>"
    description: "Returns PIP/PbP mode, start position, or sub input setting."

  - id: edge_blending_status
    label: Edge Blending Status
    type: enum
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    description: "Returns edge blending on/off state."
    values: [off, on]

  - id: base_model_type
    label: Base Model Type
    type: composite
    command: "00h BFh 00h 00h 01h 00h C0h"
    description: "Returns base model type and model name string."

  - id: serial_number
    label: Serial Number
    type: string
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    description: "Returns serial number as NUL-terminated string (up to 16 bytes)."

  - id: basic_information
    label: Basic Information
    type: composite
    command: "00h BFh 00h 00h 01h 02h C2h"
    description: "Returns operation status, content displayed, signal type, mute states, freeze status."
```

## Variables
```yaml
# UNRESOLVED: no settable continuous parameters beyond actions already listed (volume, picture gains set via action commands)
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications from projector
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Notes: Power on/off commands block all other commands during execution (including cooldown).
# Error status bitmap includes interlock switch state (DATA09 Bit1) and temperature errors.
# UNRESOLVED: no explicit safety interlock sequences documented in source
```

## Notes

- Protocol uses raw hex byte sequences with additive single-byte checksum (low byte of sum of all preceding bytes).
- Command frames include control ID (ID1) and model code (ID2) parameters — these must match the target projector.
- Multiple baud rates supported (4800–115200); projector likely auto-detects or must be configured via OSD.
- Input terminal, aspect, and eco mode value mappings are deferred to a vendor appendix not included in this source.
- Two-lamp projector models support Lamp 2 variants on lamp-related commands.
- Lens control supports both timed (0.25s/0.5s/1s) and continuous drive modes; continuous drive requires explicit stop command.
- Response format: successful commands echo with `2xh` prefix; errors return `Axh` prefix with ERR1/ERR2 error codes.
- TCP port 7142 stated for LAN control; same binary protocol over both serial and TCP.
- Picture mute, sound mute, and onscreen mute are automatically cleared on input/signal switch.

<!-- UNRESOLVED: input terminal byte-value mapping (appendix not in source) -->
<!-- UNRESOLVED: eco mode / lamp mode byte-value mapping -->
<!-- UNRESOLVED: aspect ratio byte-value mapping -->
<!-- UNRESOLVED: PIP/PbP sub input value mapping -->
<!-- UNRESOLVED: base model type value mapping -->
<!-- UNRESOLVED: wireless LAN command specifics (referred to wireless LAN unit manual) -->
<!-- UNRESOLVED: flow control configuration for serial (RTS/CTS pins wired but no software flow control documented) -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T08:32:31.256Z
last_checked_at: 2026-06-02T22:10:48.831Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:10:48.831Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions traced to source (dip-safe re-verify). (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific model variants within MExxxW/MExxxX family not enumerated — source uses generic series name"
- "input terminal value mapping deferred to vendor appendix \"Supplementary Information by Command\" — not present in this source"
- "eco mode value mapping deferred to vendor appendix"
- "aspect value mapping deferred to vendor appendix"
- "flow control not stated; RTS/CTS pins present on connector"
- "no settable continuous parameters beyond actions already listed (volume, picture gains set via action commands)"
- "source does not document unsolicited notifications from projector"
- "no multi-step sequences described in source"
- "no explicit safety interlock sequences documented in source"
- "input terminal byte-value mapping (appendix not in source)"
- "eco mode / lamp mode byte-value mapping"
- "aspect ratio byte-value mapping"
- "PIP/PbP sub input value mapping"
- "base model type value mapping"
- "wireless LAN command specifics (referred to wireless LAN unit manual)"
- "flow control configuration for serial (RTS/CTS pins wired but no software flow control documented)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
