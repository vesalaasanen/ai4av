---
schema_version: ai4av-public-spec-v1
device_id: nec/np-px-series
entity_id: nec_np_px_series
spec_id: admin/nec-np-px-series
revision: 1
author: admin
title: "NEC NP-PX Series Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: "NP-PX Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NP-PX Series"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_np_px_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:22:35.362Z
retrieved_at: 2026-04-25T21:22:35.362Z
last_checked_at: 2026-04-25T21:22:35.362Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:22:35.362Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions have literal command matches in NEC PX IP source; all transport parameters verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# NEC NP-PX Series Control Spec

## Summary
The NEC NP-PX Series is a family of professional projectors controllable via RS-232C serial or wired LAN (TCP). The protocol is binary, using hex byte sequences with a checksum trailer. This spec covers power control, input switching, picture/sound/onscreen muting, volume and picture adjustment, lens control (zoom, focus, shift), shutter, freeze, eco mode, edge blending, PIP, and extensive status/query commands.

<!-- UNRESOLVED: exact NP-PX model variants not listed in source; source covers multiple NEC projector families (NP4100, NP-Mxxx, NP-MExxx, NP-MCxxx). Specific NP-PX model names and input terminal codes are not documented. -->
<!-- UNRESOLVED: no firmware version compatibility ranges stated -->
<!-- UNRESOLVED: command timing constraints beyond "no other command accepted during power on/off" not documented -->
<!-- UNRESOLVED: appendix "Supplementary Information by Command" values for input terminal, aspect, eco mode per model are partially listed but NP-PX-specific values are absent -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # UNRESOLVED: default baud rate not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: RTS/CTS wiring shown but software flow control not specified
addressing:
  port: 7142  # TCP port for LAN command interface
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # power on (015) / power off (016) commands
- routable        # input switch change (018) command
- queryable       # extensive request commands (037, 060-1, 078-*, 084, 097-*, 305-*)
- levelable       # volume adjust (030-2), picture adjust (030-1), lamp adjust (030-15)
- muteable        # picture mute (020/021), sound mute (022/023), onscreen mute (024/025)
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
      description: "Input terminal code (hex). Values vary by model — see supplementary input terminal table."

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  description: "Turns picture mute on. Automatically cancelled on input/signal switch."
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
  description: "Turns sound mute on. Automatically cancelled on input/signal switch or volume adjust."
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
  description: "Turns onscreen mute on. Automatically cancelled on input/signal switch."
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
  description: "Sets aspect ratio. Values vary by model."
  params:
    - name: aspect
      type: integer
      description: "Aspect value code — see supplementary aspect table per model"

- id: lamp_adjust
  label: Lamp/Light Adjust
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  description: "Adjusts lamp/light output."
  params:
    - name: target
      type: integer
      description: "DATA01=96h, DATA02=FFh for Lamp Adjust / Light Adjust"
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
  description: "Sends a remote control key code (WORD type)."
  params:
    - name: key_code
      type: integer
      description: "WORD key code (low byte, high byte). E.g. 02h 00h=POWER ON, 05h 00h=AUTO, 06h 00h=MENU, 07h 00h=UP, 08h 00h=DOWN, 09h 00h=RIGHT, 0Ah 00h=LEFT, 0Bh 00h=ENTER, 0Ch 00h=EXIT"

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
  description: "Adjusts lens position (zoom, focus, lens shift H/V, periphery focus)."
  params:
    - name: target
      type: integer
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V, 06h=Periphery Focus"
    - name: content
      type: integer
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_2
  label: Lens Control 2 (Absolute/Relative)
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  description: "Adjusts lens position with absolute or relative values."
  params:
    - name: target
      type: integer
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V, FFh=Stop"
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
  description: "Controls lens memory (move/store/reset)."
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  description: "Controls reference lens memory for the active profile."
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  description: "Sets lens memory options (load by signal, forced mute)."
  params:
    - name: target
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
  description: "Turns freeze function on or off."
  params:
    - name: operation
      type: integer
      description: "01h=On, 02h=Off"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  description: "Sets eco/lamp mode. Values vary by model."
  params:
    - name: mode
      type: integer
      description: "Eco mode value — see supplementary eco mode table per model"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01-16> 00h <CKS>"
  description: "Sets the projector name (up to 16 bytes)."
  params:
    - name: name
      type: string
      description: "Projector name (up to 16 bytes, NUL terminated)"

- id: pip_pbp_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  description: "Sets PIP or Picture by Picture mode and options."
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "MODE: 00h=PIP, 01h=PbP; POSITION: 00h=TL, 01h=TR, 02h=BL, 03h=BR"

- id: edge_blending_set
  label: Edge Blending Mode Set
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
  description: "Sets the audio input source for a given input terminal."
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal code"
    - name: audio_source
      type: integer
      description: "00h=Same as input terminal, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  kind: feedback
  command: "00h 88h 00h 00h 00h 88h"
  response_bytes: 12
  description: "Returns 12 bytes of error bitflags (cover, fan, temperature, lamp, power, formatter, mirror cover, ballast, iris, lens, interlock, system errors)."

- id: projector_information
  label: Projector Information
  kind: feedback
  command: "03h 8Ah 00h 00h 00h 8Dh"
  response_bytes: 98
  description: "Returns projector name (bytes 1-49), lamp usage time in seconds (bytes 83-86), filter usage time in seconds (bytes 87-90)."

- id: filter_usage
  label: Filter Usage Information
  kind: feedback
  command: "03h 95h 00h 00h 00h 98h"
  response_bytes: 8
  description: "Returns filter usage time (seconds, bytes 1-4) and filter alarm start time (seconds, bytes 5-8)."

- id: lamp_information
  label: Lamp Information
  kind: feedback
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  response_bytes: 6
  description: "Returns lamp usage time or remaining life. DATA01: 00h=Lamp1, 01h=Lamp2. DATA02: 01h=usage time (s), 04h=remaining life (%)."

- id: carbon_savings
  label: Carbon Savings Information
  kind: feedback
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  response_bytes: 9
  description: "Returns carbon savings in kg (bytes 2-5) and mg (bytes 6-9). DATA01: 00h=total, 01h=during operation."

- id: running_status
  label: Running Status
  kind: feedback
  command: "00h 85h 00h 00h 01h 01h 87h"
  response_bytes: 16
  description: "Returns power status (DATA03: 00h=standby, 01h=on), cooling status, power on/off process status, operation status."

- id: input_status
  label: Input Status
  kind: feedback
  command: "00h 85h 00h 00h 01h 02h 88h"
  response_bytes: 16
  description: "Returns signal switch process, signal list number, selection signal type 1/2, signal list type, test pattern, content displayed."

- id: mute_status
  label: Mute Status
  kind: feedback
  command: "00h 85h 00h 00h 01h 03h 89h"
  response_bytes: 16
  description: "Returns picture mute (DATA01), sound mute (DATA02), onscreen mute (DATA03), forced onscreen mute (DATA04), onscreen display (DATA05). 00h=Off, 01h=On, FFh=Not supported."

- id: model_name
  label: Model Name
  kind: feedback
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  response_bytes: 32
  description: "Returns model name as NUL-terminated string (bytes 1-32)."

- id: cover_status
  label: Cover Status
  kind: feedback
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  response_bytes: 1
  description: "Returns cover status. 00h=Normal (cover opened), 01h=Cover closed."

- id: gain_parameter
  label: Gain Parameter
  kind: feedback
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  response_bytes: 16
  description: "Returns adjustment range and current value for picture/volume/lamp parameters. DATA01: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp Adjust."

- id: lens_position
  label: Lens Position
  kind: feedback
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  response_bytes: 7
  description: "Returns lens position range and current value. DATA01: 00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V."

- id: lens_memory_option
  label: Lens Memory Option
  kind: feedback
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  response_bytes: 2
  description: "Returns lens memory option value. DATA01: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE. Response: 00h=OFF, 01h=ON."

- id: lens_information
  label: Lens Information
  kind: feedback
  command: "02h 22h 00h 00h 01h 00h 25h"
  response_bytes: 1
  description: "Returns lens operation status bitflags. Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V. 0=Stop, 1=During operation."

- id: lens_profile
  label: Lens Profile
  kind: feedback
  command: "02h 28h 00h 00h 00h 2Ah"
  response_bytes: 2
  description: "Returns selected reference lens memory profile. DATA01: 00h=Profile 1, 01h=Profile 2."

- id: information_string
  label: Information String
  kind: feedback
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  description: "Returns info strings. DATA01: 03h=Horizontal sync frequency, 04h=Vertical sync frequency."

- id: eco_mode
  label: Eco Mode
  kind: feedback
  command: "03h B0h 00h 00h 01h 07h BBh"
  response_bytes: 1
  description: "Returns current eco/lamp mode value. Values vary by model."

- id: lan_projector_name
  label: LAN Projector Name
  kind: feedback
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  response_bytes: 17
  description: "Returns projector name as NUL-terminated string (up to 17 bytes)."

- id: mac_address
  label: MAC Address
  kind: feedback
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  response_bytes: 6
  description: "Returns MAC address (6 bytes)."

- id: pip_pbp_status
  label: PIP/Picture by Picture Status
  kind: feedback
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  response_bytes: 2
  description: "Returns PIP/PbP setting. DATA01: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3."

- id: edge_blending_status
  label: Edge Blending Mode Status
  kind: feedback
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  response_bytes: 1
  description: "Returns edge blending status. 00h=OFF, 01h=ON."

- id: setting_request
  label: Setting Information
  kind: feedback
  command: "00h 85h 00h 00h 01h 00h 86h"
  response_bytes: 32
  description: "Returns base model type (bytes 1-3), sound function (byte 4), profile number (byte 5)."

- id: base_model_type
  label: Base Model Type
  kind: feedback
  command: "00h BFh 00h 00h 01h 00h C0h"
  response_bytes: 15
  description: "Returns base model type (bytes 1-2), model name (bytes 3-11, NUL terminated), base model type (bytes 12-13)."

- id: serial_number
  label: Serial Number
  kind: feedback
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  response_bytes: 16
  description: "Returns serial number as NUL-terminated string."

- id: basic_information
  label: Basic Information
  kind: feedback
  command: "00h BFh 00h 00h 01h 02h C2h"
  response_bytes: 15
  description: "Returns operation status, content displayed, signal type 1/2, display signal type, video/sound/onscreen mute, freeze status."
```

## Variables
```yaml
- id: brightness
  label: Brightness
  type: integer
  min: null  # UNRESOLVED: min/max values not stated in source, queryable via gain parameter request
  max: null
  description: "Picture brightness. Adjustable via 030-1 (target 00h). Range queryable via 060-1."

- id: contrast
  label: Contrast
  type: integer
  min: null
  max: null
  description: "Picture contrast. Adjustable via 030-1 (target 01h)."

- id: color
  label: Color
  type: integer
  min: null
  max: null
  description: "Picture color saturation. Adjustable via 030-1 (target 02h)."

- id: hue
  label: Hue
  type: integer
  min: null
  max: null
  description: "Picture hue. Adjustable via 030-1 (target 03h)."

- id: sharpness
  label: Sharpness
  type: integer
  min: null
  max: null
  description: "Picture sharpness. Adjustable via 030-1 (target 04h)."

- id: volume
  label: Volume
  type: integer
  min: null
  max: null
  description: "Sound volume. Adjustable via 030-2."

- id: lamp_output
  label: Lamp Output
  type: integer
  min: null
  max: null
  description: "Lamp/light output level. Adjustable via 030-15 (target 96h FFh)."

- id: eco_mode_value
  label: Eco Mode
  type: enum
  values: []  # UNRESOLVED: values vary by model, see supplementary eco mode table
  description: "Eco/lamp operating mode. Set via 098-8, query via 097-8."
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification / event push mechanism described in source.
# All responses are command-response (synchronous). No async event subscription documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: >
  Power on (015) blocks all other commands during the power-on sequence.
  Power off (016) blocks all other commands during power-off including the cooling period.
  The error status request (009) returns interlock switch status (DATA09 Bit1: open/closed)
  and cover error (DATA01 Bit0) which may indicate safety interlock conditions.
# UNRESOLVED: no explicit safety warnings, power-on sequencing requirements, or
# interlock procedures documented beyond the blocking behavior during power transitions.
```

## Notes
- The protocol is entirely binary (hex byte sequences). Commands include fixed bytes plus variable parameters `<ID1>`, `<ID2>` (control ID and model code), and `<CKS>` (checksum — low byte of sum of all preceding bytes).
- All responses start with the command byte OR'd with 20h (success) or A0h (failure). Failure responses include ERR1/ERR2 error codes.
- Error codes are defined in section 2.4 with specific combinations for unrecognized commands, unsupported commands, invalid values, memory errors, power-off state, etc.
- Some models cannot receive commands in standby mode. Standby mode settings vary by model (see standby mode table in source).
- Input terminal codes, aspect values, and eco mode values all vary by model — supplementary tables are provided in the source but NP-PX-specific entries are absent.
- Lamp usage time is updated at one-minute intervals despite being returned in seconds.
- Picture mute, sound mute, and onscreen mute are automatically cancelled on input/signal switch. Sound mute is also cancelled on volume adjustment.
<!-- UNRESOLVED: NP-PX-specific input terminal codes not in source -->
<!-- UNRESOLVED: NP-PX-specific aspect values not in source -->
<!-- UNRESOLVED: NP-PX-specific eco mode values not in source -->
<!-- UNRESOLVED: default values for all gain parameters not stated -->
<!-- UNRESOLVED: command response timeout not documented -->
<!-- UNRESOLVED: maximum command rate / minimum inter-command delay not documented -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_np_px_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:22:35.362Z
retrieved_at: 2026-04-25T21:22:35.362Z
last_checked_at: 2026-04-25T21:22:35.362Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:22:35.362Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions have literal command matches in NEC PX IP source; all transport parameters verified verbatim."
```

## Known Gaps

```yaml
[]
```
