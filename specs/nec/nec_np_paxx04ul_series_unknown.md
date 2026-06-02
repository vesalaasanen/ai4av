---
spec_id: admin/nec-np-paxx04ul-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP PAxx04UL Series Control Spec"
manufacturer: NEC
model_family: "NEC NP PAxx04UL Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NEC NP PAxx04UL Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
  - assets.sharpnecdisplays.us
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
  - https://assets.sharpnecdisplays.us/documents/miscellaneous/pj-control-command-codes.pdf
retrieved_at: 2026-05-13T08:38:54.077Z
last_checked_at: 2026-05-18T16:36:42.443Z
generated_at: 2026-05-18T16:36:42.443Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Appendix \"Supplementary Information by Command\" not included in source — input terminal values, aspect values, eco mode values, base model type values, and sub-input values reference this appendix but actual enum tables are absent"
  - "flow_control not stated for serial"
  - "wireless LAN communication conditions reference separate operation manual"
  - "flow control not stated in source"
  - "no unsolicited notification protocol described in source"
  - "no multi-step macro sequences described in source"
  - "Appendix \"Supplementary Information by Command\" not in source — missing enum tables for input terminals, aspect values, eco mode values, base model types, sub-input values"
  - "flow_control setting for serial not stated"
  - "default baud rate not stated"
  - "ID1 (control ID) default value and configuration method not stated"
  - "ID2 (model code) values for PAxx04UL series not stated"
  - "no firmware version compatibility stated -->Spec generated. Key gaps: Appendix tables missing (input terminal enums, aspect values, eco mode values, model codes). Baud rate default and flow control unstated. Serial + TCP on port 7142. 40+ commands with full hex frames documented."
verification:
  verdict: verified
  checked_at: 2026-05-18T16:36:42.443Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions matched literal hex commands in source; all query commands covered by feedbacks; transport parameters verified; bidirectional coverage confirmed. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# NEC NP PAxx04UL Series Control Spec

## Summary
NEC PAxx04UL series projectors controlled via binary protocol over RS-232 serial or TCP/IP (wired/wireless LAN). Command frame format uses hexadecimal byte sequences with control ID, model code, data payload, and checksum. 40+ commands covering power, input switching, picture/sound/on-screen mute, lens control, volume, aspect, eco mode, edge blending, PIP, freeze, shutter, and various status queries.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not included in source — input terminal values, aspect values, eco mode values, base model type values, and sub-input values reference this appendix but actual enum tables are absent -->
<!-- UNRESOLVED: flow_control not stated for serial -->
<!-- UNRESOLVED: wireless LAN communication conditions reference separate operation manual -->

## Transport
```yaml
protocols:
  - serial
  - tcp
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
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from power on/off commands (015, 016)
- routable  # inferred from input switch command (018)
- queryable  # inferred from multiple request commands (037, 078-*, 060-1, etc.)
- levelable  # inferred from volume adjust (030-2), picture adjust (030-1)
- muteable  # inferred from picture/sound/onscreen mute commands
```

## Actions
```yaml
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
  description: "Turns off the projector power. No other commands accepted during cooldown."
  params: []

- id: input_switch
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  description: "Switches the input terminal or entry list."
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal value (hex). See Appendix for full list. Example: 06h = video port."

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
  description: "Turns sound mute on. Cleared by input switch, video signal switch, or volume adjustment."
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
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
  description: "Adjusts picture parameters (brightness, contrast, color, hue, sharpness)."
  params:
    - name: target
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: "Adjustment value (16-bit, low byte in DATA03, high byte in DATA04)"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
  description: "Adjusts sound volume."
  params:
    - name: mode
      type: integer
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: "Adjustment value (16-bit, low byte in DATA02, high byte in DATA03)"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  description: "Adjusts the aspect ratio."
  params:
    - name: aspect_value
      type: integer
      description: "Aspect value. See Appendix for full list."

- id: lamp_adjust
  label: Lamp/Light Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 96h FFh <DATA01> - <DATA05> <CKS>"
  description: "Adjusts lamp/light output."
  params:
    - name: mode
      type: integer
      description: "Adjustment mode: 00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: "Adjustment value (16-bit)"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  description: "Sends a remote control key code."
  params:
    - name: key_code
      type: integer
      description: "Key code (WORD type). Examples: 02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU, 07h 00h=UP, 08h 00h=DOWN, 09h 00h=RIGHT, 0Ah 00h=LEFT, 0Bh 00h=ENTER, 0Ch 00h=EXIT"

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
  description: "Adjusts lens position (periphery focus). Supports timed and continuous drive."
  params:
    - name: drive
      type: integer
      description: "Drive command: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=continuous+, 81h=continuous-, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
  description: "Adjusts lens position with absolute or relative value."
  params:
    - name: target
      type: integer
      description: "Lens axis: FFh=Stop (skips mode/value)"
    - name: mode
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: "Adjustment value (16-bit)"

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
  description: "Controls the reference lens memory for the selected profile."
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
  description: "Selects the reference lens memory profile."
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
      description: "01h=freeze on, 02h=freeze off"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  description: "Sets eco/light/lamp mode."
  params:
    - name: mode
      type: integer
      description: "Eco mode value. See Appendix for full list."

- id: projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  description: "Sets the projector name (up to 16 bytes)."
  params:
    - name: name
      type: string
      description: "Projector name (up to 16 bytes, NUL terminated)"

- id: pip_pbp_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  description: "Sets PIP or Picture by Picture mode."
  params:
    - name: parameter
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "For MODE: 00h=PIP, 01h=PBP. For POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT"

- id: edge_blending_set
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
  description: "Sets the audio input selection."
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal value. See Appendix for full list."
    - name: setting
      type: integer
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  type: binary
  command: "00h 88h 00h 00h 00h 88h"
  description: "Returns 12 bytes of error bitfield. Bit=0 normal, Bit=1 error. Covers cover error, fan error, temperature error, power error, lamp status, formatter error, FPGA error, mirror cover, ballast communication, interlock switch, etc."

- id: projector_information
  label: Projector Information
  type: compound
  command: "03h 8Ah 00h 00h 00h 8Dh"
  description: "Returns projector name (49 bytes), lamp usage time in seconds (4 bytes), filter usage time in seconds (4 bytes). Updated at 1-minute intervals."

- id: filter_usage
  label: Filter Usage Information
  type: compound
  command: "03h 95h 00h 00h 00h 98h"
  description: "Returns filter usage time (seconds) and filter alarm start time (seconds). -1 if not defined."

- id: lamp_information
  label: Lamp Information
  type: compound
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  description: "Returns lamp usage time (seconds) or remaining life (%). Negative remaining life if replacement deadline exceeded."
  params:
    - name: lamp
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: content
      description: "01h=usage time (seconds), 04h=remaining life (%)"

- id: carbon_savings
  label: Carbon Savings Information
  type: compound
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  description: "Returns carbon savings in kg (max 99999) and mg (max 999999)."
  params:
    - name: type
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: running_status
  label: Running Status
  type: enum
  command: "00h 85h 00h 00h 01h 01h 87h"
  description: "Returns power status, cooling status, power-on/off process status, operation status."
  values:
    power_status:
      00h: standby
      01h: power_on
    cooling:
      00h: not_executed
      01h: during_execution
    power_process:
      00h: not_executed
      01h: during_execution
    operation_status:
      00h: standby_sleep
      04h: power_on
      05h: cooling
      06h: standby_error
      0Fh: standby_power_saving
      10h: network_standby

- id: input_status
  label: Input Status
  type: compound
  command: "00h 85h 00h 00h 01h 02h 88h"
  description: "Returns signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern, content displayed."

- id: mute_status
  label: Mute Status
  type: compound
  command: "00h 85h 00h 00h 01h 03h 89h"
  description: "Returns picture mute (00h=off/01h=on), sound mute, onscreen mute, forced onscreen mute, onscreen display."

- id: model_name
  label: Model Name
  type: string
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  description: "Returns model name (NUL-terminated string, up to 32 bytes)."

- id: cover_status
  label: Cover Status
  type: enum
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  description: "Mirror/lens cover status."
  values: [normal_open, closed]

- id: lens_control_position
  label: Lens Control Position
  type: compound
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  description: "Returns upper limit, lower limit, and current value for a lens axis."

- id: lens_information
  label: Lens Information
  type: binary
  command: "02h 22h 00h 00h 01h 00h 25h"
  description: "Returns lens operation status as bitfield: Bit0=lens memory, Bit1=zoom, Bit2=focus, Bit3=lens shift H, Bit4=lens shift V (0=stop, 1=operating)."

- id: lens_memory_option
  label: Lens Memory Option
  type: compound
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  description: "Returns lens memory option setting. 00h=LOAD BY SIGNAL, 01h=FORCED MUTE. Value: 00h=OFF, 01h=ON."

- id: lens_profile
  label: Lens Profile
  type: enum
  command: "02h 28h 00h 00h 00h 2Ah"
  description: "Returns selected reference lens memory profile number."
  values: [profile_1, profile_2]

- id: gain_parameter
  label: Gain Parameter
  type: compound
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  description: "Returns adjustment status, upper/lower limits, default, current value, wide/narrow widths for brightness, contrast, color, hue, sharpness, volume, or lamp adjust."
  params:
    - name: target
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"

- id: setting_info
  label: Setting Information
  type: compound
  command: "00h 85h 00h 00h 01h 00h 86h"
  description: "Returns base model type, sound function availability, profile number."

- id: information_string
  label: Information String
  type: string
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  description: "Returns horizontal or vertical sync frequency as string."
  params:
    - name: type
      description: "03h=horizontal sync frequency, 04h=vertical sync frequency"

- id: eco_mode
  label: Eco Mode
  type: enum
  command: "03h B0h 00h 00h 01h 07h BBh"
  description: "Returns current eco/light/lamp mode value."

- id: projector_name
  label: LAN Projector Name
  type: string
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  description: "Returns projector name (NUL-terminated string, up to 17 bytes)."

- id: mac_address
  label: MAC Address
  type: string
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  description: "Returns 6-byte MAC address."

- id: pip_pbp_status
  label: PIP/Picture by Picture Status
  type: compound
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  description: "Returns PIP/PBP mode, start position, or sub-input setting."

- id: edge_blending_status
  label: Edge Blending Status
  type: enum
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  description: "Returns edge blending setting."
  values: [off, on]

- id: base_model_type
  label: Base Model Type
  type: compound
  command: "00h BFh 00h 00h 01h 00h C0h"
  description: "Returns base model type and model name string."

- id: serial_number
  label: Serial Number
  type: string
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  description: "Returns serial number (NUL-terminated string, up to 16 bytes)."

- id: basic_information
  label: Basic Information
  type: compound
  command: "00h BFh 00h 00h 01h 02h C2h"
  description: "Returns operation status, content displayed, signal type, video/sound/onscreen mute, freeze status."
```

## Variables
```yaml
- id: brightness
  label: Brightness
  type: integer
  description: "Picture brightness. Adjustable via PICTURE ADJUST (030-1) target 00h."

- id: contrast
  label: Contrast
  type: integer
  description: "Picture contrast. Adjustable via PICTURE ADJUST (030-1) target 01h."

- id: color
  label: Color
  type: integer
  description: "Picture color. Adjustable via PICTURE ADJUST (030-1) target 02h."

- id: hue
  label: Hue
  type: integer
  description: "Picture hue. Adjustable via PICTURE ADJUST (030-1) target 03h."

- id: sharpness
  label: Sharpness
  type: integer
  description: "Picture sharpness. Adjustable via PICTURE ADJUST (030-1) target 04h."

- id: volume
  label: Volume
  type: integer
  description: "Sound volume. Adjustable via VOLUME ADJUST (030-2)."

- id: lamp_adjust
  label: Lamp/Light Adjust
  type: integer
  description: "Lamp/light output level. Adjustable via OTHER ADJUST (030-15)."

- id: eco_mode
  label: Eco/Lamp Mode
  type: enum
  description: "Eco mode setting. Values defined in Appendix."

- id: projector_name
  label: Projector Name
  type: string
  description: "LAN projector name, up to 16 bytes."

- id: edge_blending
  label: Edge Blending
  type: enum
  values: [off, on]
  description: "Edge blending enable/disable."
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes power-on and power-off block all other commands during execution.
# Error status bitfield includes: cover error, fan error, temperature error, power error,
# lamp replacement moratorium, interlock switch open, lens not installed properly.
# These are queryable error states, not interlocks enforced by the protocol.
```

## Notes
- Binary protocol. All commands and responses are hexadecimal byte sequences. Frame structure: header bytes + ID1 (control ID) + ID2 (model code) + LEN + DATA payload + CKS (checksum).
- Checksum = low-order byte of sum of all preceding bytes.
- Response success indicated by data returned; failure indicated by ERR1/ERR2 error code bytes.
- Multiple baud rates supported (115200, 38400, 19200, 9600, 4800). Default not stated.
- TCP port 7142 for LAN command transport.
- Power on/off commands block all other commands during execution (including cooling period).
- Picture mute, sound mute, and onscreen mute are independently controllable.
- Sound mute automatically cleared by input switch, signal switch, or volume adjustment.
- Lamp usage time updated at 1-minute intervals despite 1-second granularity.
- Two-lamp projector models supported for lamp-specific queries (DATA01=01h for Lamp 2).
- Lens control supports both timed drive (0.25s/0.5s/1s) and continuous drive (stop with 00h).

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not in source — missing enum tables for input terminals, aspect values, eco mode values, base model types, sub-input values -->
<!-- UNRESOLVED: flow_control setting for serial not stated -->
<!-- UNRESOLVED: default baud rate not stated -->
<!-- UNRESOLVED: ID1 (control ID) default value and configuration method not stated -->
<!-- UNRESOLVED: ID2 (model code) values for PAxx04UL series not stated -->
<!-- UNRESOLVED: wireless LAN communication conditions reference separate operation manual -->
<!-- UNRESOLVED: no firmware version compatibility stated -->Spec generated. Key gaps: Appendix tables missing (input terminal enums, aspect values, eco mode values, model codes). Baud rate default and flow control unstated. Serial + TCP on port 7142. 40+ commands with full hex frames documented.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
  - assets.sharpnecdisplays.us
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
  - https://assets.sharpnecdisplays.us/documents/miscellaneous/pj-control-command-codes.pdf
retrieved_at: 2026-05-13T08:38:54.077Z
last_checked_at: 2026-05-18T16:36:42.443Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T16:36:42.443Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions matched literal hex commands in source; all query commands covered by feedbacks; transport parameters verified; bidirectional coverage confirmed. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Appendix \"Supplementary Information by Command\" not included in source — input terminal values, aspect values, eco mode values, base model type values, and sub-input values reference this appendix but actual enum tables are absent"
- "flow_control not stated for serial"
- "wireless LAN communication conditions reference separate operation manual"
- "flow control not stated in source"
- "no unsolicited notification protocol described in source"
- "no multi-step macro sequences described in source"
- "Appendix \"Supplementary Information by Command\" not in source — missing enum tables for input terminals, aspect values, eco mode values, base model types, sub-input values"
- "flow_control setting for serial not stated"
- "default baud rate not stated"
- "ID1 (control ID) default value and configuration method not stated"
- "ID2 (model code) values for PAxx04UL series not stated"
- "no firmware version compatibility stated -->Spec generated. Key gaps: Appendix tables missing (input terminal enums, aspect values, eco mode values, model codes). Baud rate default and flow control unstated. Serial + TCP on port 7142. 40+ commands with full hex frames documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
