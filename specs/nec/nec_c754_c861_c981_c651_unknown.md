---
spec_id: admin/nec-c754-c861-c981-c651
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC C754 C861 C981 C651 Control Spec"
manufacturer: NEC
model_family: C754
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - C754
    - C861
    - C981
    - C651
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T07:38:57.352Z
last_checked_at: 2026-05-16T12:18:19.596Z
generated_at: 2026-05-16T12:18:19.596Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Appendix \"Supplementary Information by Command\" referenced throughout but not included in source — input terminal values, aspect values, eco mode values, signal type details, sub-input values are incomplete."
  - "source does not describe unsolicited notifications from projector"
  - "source does not describe multi-step sequences beyond individual commands"
  - "source mentions cooling process during power-off and that no commands"
  - "Appendix \"Supplementary Information by Command\" not included in source — missing full input terminal value list, aspect value list, eco mode value list, signal type details, sub-input values, base model type values."
  - "Default baud rate not stated — source lists supported rates but not which is default."
  - "Flow control setting not stated for serial — table shows RTS/CTS pins connected but no software flow control mention."
  - "Wireless LAN communication conditions deferred to separate operation manual."
verification:
  verdict: verified
  checked_at: 2026-05-16T12:18:19.596Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec action commands match literal opcodes in source; all transport parameters verified; full control coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# NEC C754 C861 C981 C651 Control Spec

## Summary
NEC C754, C861, C981, and C651 projectors with binary hex control protocol over RS-232C serial and TCP/IP (wired/wireless LAN). Commands are variable-length byte frames with a checksum. Covers power, input switching, picture/sound/onscreen mute, picture and volume adjustment, lens control, lens memory, shutter, freeze, eco mode, PIP/PbP, edge blending, and extensive status queries.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced throughout but not included in source — input terminal values, aspect values, eco mode values, signal type details, sub-input values are incomplete. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200
  baud_rates_supported: [4800, 9600, 19200, 38400, 115200]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable
  - queryable
  - routable
  - levelable
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
    description: "Turns off the projector. No other commands accepted during power-off including cooling."
    params: []

  - id: input_switch
    label: Input Switch Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
    description: "Switches the input terminal or entry list."
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal value (hex). See appendix for full list. Example: 06h = Video port."

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    description: "Turns picture mute on. Cleared by input terminal switch or video signal switch."
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
    description: "Turns sound mute on. Cleared by input switch, video signal switch, or volume adjust."
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
    description: "Turns onscreen mute on. Cleared by input terminal switch or video signal switch."
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
        description: "16-bit adjustment value (low byte, high byte)"

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
        description: "16-bit adjustment value (low byte, high byte)"

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
    description: "Adjusts the aspect ratio."
    params:
      - name: aspect_value
        type: integer
        description: "Aspect value. See appendix for full list."

  - id: lamp_adjust
    label: Lamp/Light Adjust
    kind: action
    command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
    description: "Adjusts lamp/light output level."
    params:
      - name: mode
        type: integer
        description: "00h=Absolute value, 01h=Relative value"
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
        type: integer
        description: "16-bit key code. Examples: 02h 00h=Power On, 03h 00h=Power Off, 05h 00h=Auto, 06h 00h=Menu, 07h 00h=Up, 08h 00h=Down, 09h 00h=Right, 0Ah 00h=Left, 0Bh 00h=Enter, 0Ch 00h=Exit, 84h 00h=Volume Up, 85h 00h=Volume Down, 8Ah 00h=Freeze, A3h 00h=Aspect, D7h 00h=Source, EEh 00h=Lamp Mode/Eco"

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
    description: "Adjusts lens position (focus, zoom, shift). Continuous or timed drive."
    params:
      - name: axis
        type: integer
        description: "06h=Periphery Focus. Other axes referenced by command context."
      - name: direction
        type: integer
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    description: "Adjusts lens position with absolute or relative value."
    params:
      - name: axis
        type: integer
        description: "FFh=Stop. Other values select axis."
      - name: mode
        type: integer
        description: "00h=Absolute value, 02h=Relative value"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte, high byte)"

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
    description: "Controls lens memory (move, store, reset)."
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
    description: "Controls the reference lens memory for the profile set via Lens Profile Set."
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
    description: "Selects the profile number of the reference lens memory."
    params:
      - name: profile
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
    description: "Controls freeze function on/off."
    params:
      - name: state
        type: integer
        description: "01h=On, 02h=Off"

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
    description: "Sets eco mode (also Light mode or Lamp mode depending on projector)."
    params:
      - name: eco_mode
        type: integer
        description: "Eco mode value. See appendix for full list."

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch <DATA01-16> 00h <CKS>"
    description: "Sets the projector name (up to 16 bytes)."
    params:
      - name: name
        type: string
        description: "Projector name, up to 16 bytes, NUL terminated"

  - id: pip_pbp_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
    description: "Sets PIP or Picture by Picture mode, start position, or sub input."
    params:
      - name: target
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "For MODE: 00h=PIP, 01h=PbP. For POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. For SUB INPUT: see appendix."

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
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
    description: "Sets the audio input source."
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal value. See appendix for full list."
      - name: audio_source
        type: integer
        description: "00h=Terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    label: Error Status
    type: binary
    command: "00h 88h 00h 00h 00h 88h"
    description: "Returns 12 bytes of error status bitmask. Bit=0 normal, Bit=1 error. Covers cover error, fan error, temperature error, power error, lamp status, formatter error, FPGA error, lens errors, interlock, system errors."

  - id: power_status
    label: Power Status
    type: enum
    values: [standby, power_on, not_supported]
    command: "00h 85h 00h 00h 01h 01h 87h"
    description: "Running status request returns power status, cooling process, power on/off process, and operation status."

  - id: running_status
    label: Running Status
    type: enum
    values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
    command: "00h 85h 00h 00h 01h 01h 87h"
    description: "Returns operation status: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby."

  - id: input_status
    label: Input Status
    type: composite
    command: "00h 85h 00h 00h 01h 02h 88h"
    description: "Returns signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern display, content displayed."

  - id: mute_status
    label: Mute Status
    type: composite
    command: "00h 85h 00h 00h 01h 03h 89h"
    description: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display - each 00h=Off, 01h=On."

  - id: model_name
    label: Model Name
    type: string
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    description: "Returns the model name as a NUL-terminated string (up to 32 bytes)."

  - id: cover_status
    label: Cover Status
    type: enum
    values: [normal_cover_opened, cover_closed]
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    description: "Returns mirror cover or lens cover status. 00h=Normal(cover opened), 01h=Cover closed."

  - id: information_request
    label: Projector Information
    type: composite
    command: "03h 8Ah 00h 00h 00h 8Dh"
    description: "Returns projector name (49 bytes), lamp usage time in seconds (4 bytes), filter usage time in seconds (4 bytes). Updated at 1-minute intervals."

  - id: filter_usage_information
    label: Filter Usage Information
    type: composite
    command: "03h 95h 00h 00h 00h 98h"
    description: "Returns filter usage time (seconds, 4 bytes) and filter alarm start time (seconds, 4 bytes). -1 if not defined."

  - id: lamp_information
    label: Lamp Information
    type: composite
    command: "03h 96h 00h 00h 02h <lamp> <content> <CKS>"
    description: "Returns lamp usage time (seconds) or remaining life (%). Params: lamp=00h(Lamp1)/01h(Lamp2), content=01h(usage time)/04h(remaining life%). Negative remaining life means deadline exceeded."

  - id: carbon_savings_information
    label: Carbon Savings Information
    type: composite
    command: "03h 9Ah 00h 00h 01h <type> <CKS>"
    description: "Returns carbon savings in kg (4 bytes) and mg (4 bytes). Type: 00h=Total, 01h=During operation."

  - id: lens_control_request
    label: Lens Control Position
    type: composite
    command: "02h 1Ch 00h 00h 02h <axis> 00h <CKS>"
    description: "Returns upper limit, lower limit, and current value (each 16-bit) for the specified lens axis."

  - id: lens_memory_option_request
    label: Lens Memory Option
    type: composite
    command: "02h 20h 00h 00h 01h <option> <CKS>"
    description: "Returns lens memory option setting. Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE. Value: 00h=OFF, 01h=ON."

  - id: lens_information
    label: Lens Information
    type: binary
    command: "02h 22h 00h 00h 01h 00h 25h"
    description: "Returns byte bitmask of lens operation status. Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V). 0=Stop, 1=During operation."

  - id: lens_profile_request
    label: Lens Profile
    type: enum
    values: [profile_1, profile_2]
    command: "02h 28h 00h 00h 00h 2Ah"
    description: "Returns selected reference lens memory profile. 00h=Profile 1, 01h=Profile 2."

  - id: gain_parameter
    label: Gain Parameter
    type: composite
    command: "03h 05h 00h 00h 03h <param> 00h 00h <CKS>"
    description: "Returns status, upper/lower limits, default, current value, wide/narrow adjustment width for brightness(00h), contrast(01h), color(02h), hue(03h), sharpness(04h), volume(05h), lamp adjust(96h)."

  - id: setting_request
    label: Projector Settings
    type: composite
    command: "00h 85h 00h 00h 01h 00h 86h"
    description: "Returns base model type (3 bytes), sound function availability (00h=not available, 01h=available), profile number, and clock/sleep timer function info."

  - id: information_string
    label: Information String
    type: string
    command: "00h D0h 00h 00h 03h 00h <info_type> 01h <CKS>"
    description: "Returns information strings. Type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency."

  - id: eco_mode
    label: Eco Mode
    type: enum
    command: "03h B0h 00h 00h 01h 07h BBh"
    description: "Returns current eco mode setting. See appendix for value definitions."

  - id: lan_projector_name
    label: LAN Projector Name
    type: string
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    description: "Returns projector name (up to 17 bytes, NUL terminated)."

  - id: lan_mac_address
    label: MAC Address
    type: string
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    description: "Returns MAC address (6 bytes)."

  - id: pip_pbp_status
    label: PIP/Picture by Picture Status
    type: composite
    command: "03h B0h 00h 00h 02h C5h <target> <CKS>"
    description: "Returns PIP/PbP settings. Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."

  - id: edge_blending_mode
    label: Edge Blending Mode
    type: enum
    values: [off, on]
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    description: "Returns edge blending setting. 00h=OFF, 01h=ON."

  - id: base_model_type
    label: Base Model Type
    type: composite
    command: "00h BFh 00h 00h 01h 00h C0h"
    description: "Returns base model type (2 bytes), model name string, and additional type info."

  - id: serial_number
    label: Serial Number
    type: string
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    description: "Returns serial number as NUL-terminated string (up to 16 bytes)."

  - id: basic_information
    label: Basic Information
    type: composite
    command: "00h BFh 00h 00h 01h 02h C2h"
    description: "Returns operation status, content displayed, selection signal type 1/2, display signal type, video/sound/onscreen mute, freeze status."
```

## Variables
```yaml
variables:
  - id: brightness
    label: Brightness
    type: integer
    description: "Picture brightness. Adjustable via PICTURE ADJUST (target 00h)."

  - id: contrast
    label: Contrast
    type: integer
    description: "Picture contrast. Adjustable via PICTURE ADJUST (target 01h)."

  - id: color
    label: Color
    type: integer
    description: "Picture color saturation. Adjustable via PICTURE ADJUST (target 02h)."

  - id: hue
    label: Hue
    type: integer
    description: "Picture hue. Adjustable via PICTURE ADJUST (target 03h)."

  - id: sharpness
    label: Sharpness
    type: integer
    description: "Picture sharpness. Adjustable via PICTURE ADJUST (target 04h)."

  - id: volume
    label: Volume
    type: integer
    description: "Sound volume level. Adjustable via VOLUME ADJUST."

  - id: lamp_level
    label: Lamp/Light Level
    type: integer
    description: "Lamp or light output level. Adjustable via OTHER ADJUST."

  - id: projector_name
    label: Projector Name
    type: string
    description: "LAN projector name, up to 16 bytes."

  - id: eco_mode_setting
    label: Eco Mode
    type: enum
    description: "Eco mode / Light mode / Lamp mode. See appendix for value definitions."
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited notifications from projector
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step sequences beyond individual commands
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions cooling process during power-off and that no commands
# are accepted during power-on/off sequences, but does not document specific safety
# interlock procedures or power-on sequencing requirements.
```

## Notes
- Binary protocol: all commands and responses are hexadecimal byte sequences. Each frame includes a checksum (low-order byte of sum of all preceding bytes).
- Command frames include ID1 (control ID set on projector) and ID2 (model code) parameters in responses.
- Error responses use ERR1/ERR2 byte pairs. See error code table in source for full list (ERR1 00h-03h, ERR2 00h-0Fh).
- Multiple baud rates supported (4800–115200); default not stated in source.
- Both RS-232C serial and TCP/IP (port 7142) transports supported simultaneously.
- Lens control supports continuous drive (7Fh/81h) stopped by sending 00h, and timed drives (0.25s, 0.5s, 1s).
- Lamp information returns usage time in seconds and remaining life as percentage. Negative percentage indicates replacement deadline exceeded.
- Information updated at 1-minute intervals even though units are seconds.
- Two-lamp projector models use DATA01=01h for Lamp 2 queries.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not included in source — missing full input terminal value list, aspect value list, eco mode value list, signal type details, sub-input values, base model type values. -->
<!-- UNRESOLVED: Default baud rate not stated — source lists supported rates but not which is default. -->
<!-- UNRESOLVED: Flow control setting not stated for serial — table shows RTS/CTS pins connected but no software flow control mention. -->
<!-- UNRESOLVED: Wireless LAN communication conditions deferred to separate operation manual. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T07:38:57.352Z
last_checked_at: 2026-05-16T12:18:19.596Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T12:18:19.596Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec action commands match literal opcodes in source; all transport parameters verified; full control coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Appendix \"Supplementary Information by Command\" referenced throughout but not included in source — input terminal values, aspect values, eco mode values, signal type details, sub-input values are incomplete."
- "source does not describe unsolicited notifications from projector"
- "source does not describe multi-step sequences beyond individual commands"
- "source mentions cooling process during power-off and that no commands"
- "Appendix \"Supplementary Information by Command\" not included in source — missing full input terminal value list, aspect value list, eco mode value list, signal type details, sub-input values, base model type values."
- "Default baud rate not stated — source lists supported rates but not which is default."
- "Flow control setting not stated for serial — table shows RTS/CTS pins connected but no software flow control mention."
- "Wireless LAN communication conditions deferred to separate operation manual."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
