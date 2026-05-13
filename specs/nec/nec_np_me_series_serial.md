---
spec_id: admin/nec-np_me_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP-ME Series Control Spec"
manufacturer: NEC
model_family: NP-ME403U
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - NP-ME403U
    - NP-ME423W
    - NP-ME383W
    - NP-ME453X
    - NP-MC423W
    - NP-MC393W
    - NP-MC453X
    - NP-MC363X
    - NP-ME382U
    - NP-ME342U
    - NP-ME372W
    - NP-ME402X
    - NP-MC382W
    - NP-MC332W
    - NP-MC422X
    - NP-MC372X
    - NP-MC342X
    - NP-MC302X
    - NP-ME401W
    - NP-ME361W
    - NP-ME331W
    - NP-ME301W
    - NP-ME401X
    - NP-ME361X
    - NP-ME331X
    - NP-ME301X
    - NP-ME360X
    - NP-ME310X
    - NP-ME270X
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:20:07.137Z
generated_at: 2026-04-25T21:20:07.137Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:20:07.137Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions matched 1:1 to source commands; transport parameters verified verbatim; command catalogue fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC NP-ME Series Control Spec

## Summary
The NEC NP-ME Series is a family of LCD projectors supporting both RS-232C serial and wired TCP/IP control. This spec covers the full command set including power control, input routing, picture/sound adjustment, lens control, and queryable status feedback. Transport supports serial (4800–115200 bps) and TCP (port 7142). No authentication is required.

<!-- UNRESOLVED: wireless LAN unit commands not documented in this source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands"
serial:
  baud_rate: null  # UNRESOLVED: source lists 115200/38400/19200/9600/4800 bps as options; specific rate configured per device
  data_bits: 8  # stated: "Data length: 8 bits"
  parity: none   # stated: "Parity bit: None"
  stop_bits: 1   # stated: "Stop bit: 1 bit"
  flow_control: null  # UNRESOLVED: flow control not addressed in source
  # Note: all models support 4800/9600/19200/38400 bps; higher-speed models additionally support 115200 bps
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # POWER ON/OFF commands present (015, 016)
- routable        # INPUT SW CHANGE command present (018)
- queryable       # multiple request commands returning state present (009, 037, 078 series, etc.)
- levelable       # VOLUME ADJUST, PICTURE ADJUST, LENS CONTROL commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: Turns on the projector. No other command accepted while powering on.

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Turns off the projector (including cooling time). No other command accepted during cooldown.

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal code (hex). See appendix for model-specific codes. Common values: 01h=COMPUTER, 06h=VIDEO, 1Ah=HDMI, 20h=LAN, 1Fh=USB-A
  description: Switches input terminal or entry list.

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  description: Turns picture mute on. Cleared by input switch or video signal switch.

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  description: Turns sound mute on. Cleared by input switch, video signal switch, or volume adjustment.

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  description: Turns onscreen mute on. Cleared by input switch or video signal switch.

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order then high-order)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order then high-order)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect mode value. See appendix for model-specific values.

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code value (16-bit). See key code table for mappings (e.g., 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN).

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  description: Closes the lens shutter.

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift (H), 03h=Lens Shift (V), 06h=Periphery Focus"
    - name: operation
      type: integer
      description: "00h=Stop, 01h=Drive 1s plus, 02h=Drive 0.5s plus, 03h=Drive 0.25s plus, 7Fh=Drive plus, 81h=Drive minus, FDh=Drive 0.25s minus, FEh=Drive 0.5s minus, FFh=Drive 1s minus"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift (H), 03h=Lens Shift (V), FFh=Stop"
    - name: mode
      type: integer
      description: "00h=Absolute value, 02h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: ref_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2" (set via LENS PROFILE SET)

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
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
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Eco mode value. See appendix for model-specific values.

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, null-terminated)

- id: pip_pbp_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value (mode: 00h=PIP, 01h=PICTURE BY PICTURE; position: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal code
    - name: source
      type: integer
      description: "00h=Terminal in DATA01, 01h=BNC, 02h=COMPUTER"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "01h=ON, 02h=OFF"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status Request
  kind: feedback
  returns:
    type: object
    description: "12 bytes of error information. DATA01: Bit0=Cover error, Bit1=Temperature error, Bit3=Fan error, Bit4=Fan error, Bit5=Power error, Bit6=Lamp off, Bit7=Lamp moratorium. DATA02-DATA04: additional error bits. DATA05: interlock switch, system errors. DATA09: portrait cover status, interlock switch."
  command: "00h 88h 00h 00h 00h 88h"
  response_pattern: "20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>"

- id: running_status
  label: Running Status Request
  kind: feedback
  returns:
    type: object
    description: "DATA03: 00h=Standby, 01h=Power on. DATA04: 00h=No cooling, 01h=Cooling. DATA05: 00h=No power process, 01h=Power process active. DATA06: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby."
  command: "00h 85h 00h 00h 01h 01h 87h"
  response_pattern: "20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"

- id: input_status
  label: Input Status Request
  kind: feedback
  returns:
    type: object
    description: "DATA01: signal switch process. DATA02: signal list number (value+1). DATA03: signal type 1 (01h-05h). DATA04: signal type 2 (01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 05h=Reserved, 07h=VIEWER(1-5), 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 23h=VIEWER(6-10), FFh=No source). DATA05: signal list type. DATA06: test pattern display. DATA09: content displayed (00h=Video, 01h=No signal, 02h=Viewer, 03h=Test pattern, 04h=LAN)."
  command: "00h 85h 00h 00h 01h 02h 88h"

- id: mute_status
  label: Mute Status Request
  kind: feedback
  returns:
    type: object
    description: "DATA01: picture mute (00h=Off, 01h=On). DATA02: sound mute. DATA03: onscreen mute. DATA04: forced onscreen mute. DATA05: onscreen display."
  command: "00h 85h 00h 00h 01h 03h 89h"

- id: model_name_request
  label: Model Name Request
  kind: feedback
  returns:
    type: string
    description: Model name (NUL-terminated, up to 32 bytes)
  command: "00h 85h 00h 00h 01h 04h 8Ah"

- id: cover_status
  label: Cover Status Request
  kind: feedback
  returns:
    type: enum
  values:
    - 00h: Normal (cover opened)
    - 01h: Cover closed
  command: "00h 85h 00h 00h 01h 05h 8Bh"

- id: information_request
  label: Information Request
  kind: feedback
  returns:
    type: object
    description: "DATA01-49: projector name. DATA83-86: lamp usage time (seconds). DATA87-90: filter usage time (seconds). Updated at 1-minute intervals."
  command: "03h 8Ah 00h 00h 00h 8Dh"

- id: filter_usage_info
  label: Filter Usage Information Request
  kind: feedback
  returns:
    type: object
    description: "DATA01-04: filter usage time (seconds). DATA05-08: filter alarm start time (seconds). Returns -1 if not defined."
  command: "03h 95h 00h 00h 00h 98h"

- id: lamp_info_request_3
  label: Lamp Information Request 3
  kind: feedback
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Usage time (seconds), 04h=Remaining life (%)"
  returns:
    type: object
    description: "DATA01: target. DATA02: content. DATA03-06: obtained information. Lamp 2 only effective for two-lamp models. If deadline exceeded, remaining life returns negative."
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"

- id: carbon_savings_info
  label: Carbon Savings Information Request
  kind: feedback
  params:
    - name: target
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  returns:
    type: object
    description: "DATA02-05: Carbon Savings (kg, max 99999). DATA06-09: Carbon Savings (mg, max 999999)."
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"

- id: lens_control_request
  label: Lens Control Request
  kind: feedback
  params:
    - name: target
      type: integer
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift (H), 03h=Lens Shift (V)"
  returns:
    type: object
    description: "DATA02-03: upper limit. DATA04-05: lower limit. DATA06-07: current value. All 16-bit values."
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: feedback
  params:
    - name: target
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  returns:
    type: enum
  values:
    - 00h: OFF
    - 01h: ON
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"

- id: lens_info_request
  label: Lens Information Request
  kind: feedback
  returns:
    type: object
    description: "DATA01 bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V). 0=Stop, 1=During operation."
  command: "02h 22h 00h 00h 01h 00h 25h"

- id: lens_profile_request
  label: Lens Profile Request
  kind: feedback
  returns:
    type: enum
  values:
    - 00h: Profile 1
    - 01h: Profile 2
  command: "02h 28h 00h 00h 00h 2Ah"

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: feedback
  params:
    - name: parameter
      type: integer
      description: "00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"
  returns:
    type: object
    description: "DATA01: status (00h=Display not possible, 01h=Adjustment not possible, 02h=Adjustment possible, FFh=Parameter does not exist). DATA02-03: upper limit. DATA04-05: lower limit. DATA06-07: default value. DATA08-09: current value. DATA10-11: wide adjustment width. DATA12-13: narrow adjustment width. DATA14: default value valid flag."
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"

- id: eco_mode_request
  label: Eco Mode Request
  kind: feedback
  returns:
    type: integer
    description: Eco mode value. See appendix for model-specific values.
  command: "03h B0h 00h 00h 01h 07h BBh"

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: feedback
  returns:
    type: string
    description: Projector name (NUL-terminated, up to 17 bytes)
  command: "03h B0h 00h 00h 01h 2Ch E0h"

- id: lan_mac_address_request
  label: LAN MAC Address Status Request 2
  kind: feedback
  returns:
    type: string
    description: MAC address (6 bytes)
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"

- id: pip_pbp_request
  label: PIP/Picture by Picture Request
  kind: feedback
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  returns:
    type: object
    description: "DATA01: target. DATA02: setting value."
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: feedback
  returns:
    type: enum
  values:
    - 00h: OFF
    - 01h: ON
  command: "03h B0h 00h 00h 02h DFh 00h 94h"

- id: info_string_request
  label: Information String Request
  kind: feedback
  params:
    - name: type
      type: integer
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
  returns:
    type: string
    description: Label/information string (NUL-terminated)
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"

- id: base_model_type_request
  label: Base Model Type Request
  kind: feedback
  returns:
    type: object
    description: "DATA01-03: base model type. DATA04: sound function (00h=Not available, 01h=Available). DATA05: profile number (00h=Not available, 01h=Clock function, 02h=Sleep timer function, 03h=Both)."
  command: "00h BFh 00h 00h 01h 00h C0h"

- id: serial_number_request
  label: Serial Number Request
  kind: feedback
  returns:
    type: string
    description: Serial number (NUL-terminated, up to 16 bytes)
  command: "00h BFh 00h 00h 02h 01h 06h C8h"

- id: basic_info_request
  label: Basic Information Request
  kind: feedback
  returns:
    type: object
    description: "DATA01: operation status. DATA02: content displayed. DATA03: signal type 1. DATA04: signal type 2. DATA05: display signal type. DATA06: video mute. DATA07: sound mute. DATA08: onscreen mute. DATA09: freeze status."
  command: "00h BFh 00h 00h 01h 02h C2h"

- id: setting_request
  label: Setting Request
  kind: feedback
  returns:
    type: object
    description: "DATA01-03: base model type. DATA04: sound function. DATA05: profile number."
  command: "00h 85h 00h 00h 01h 00h 86h"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters found that are not action-driven.
# Variables like eco mode, aspect, volume are handled via dedicated action commands.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source.
# The projector only responds to commands; it does not initiate status pushes.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements stated in source.
# Note: commands 015 (POWER ON) and 016 (POWER OFF) block other commands during
# execution/cooling - this is documented behavior, not a safety interlock.
```

## Notes
Serial baud rate must be configured to match between host and projector; supported rates are 4800, 9600, 19200, 38400, and (on select models) 115200 bps. All models support 4800–38400; only NP-ME4xx / NP-MC4xx models add 115200.

TCP port 7142 is used for both sending and receiving commands over wired LAN. Some models cannot receive commands in standby mode — see appendix "Standby Mode setting for receiving commands" for model-specific constraints.

Command format uses 6-byte header with checksum: `[PREAMBLE] [ID1] [ID2] [LEN] [DATA...] [CKS]`. Preamble varies by command class (00h=query, 01h=freeze, 02h=control, 03h=set). Checksum is low-order byte of sum of all preceding bytes.

Error responses return ERR1/ERR2 codes. Notable: 02h 0Dh = "command cannot be accepted because the power is off".

Power-on (015) and power-off (016) commands block all other commands until completion. POWER OFF includes cooling time.

Input terminal codes vary by model — always consult the appendix for model-specific INPUT SW CHANGE codes.

<!-- UNRESOLVED: wireless LAN unit commands and configuration not documented -->
<!-- UNRESOLVED: HDBaseT interface commands not in this source -->
<!-- UNRESOLVED: precise flow control (RTS/CTS) configuration not addressed -->
<!-- UNRESOLVED: default IP address / DHCP behavior not stated -->
<!-- UNRESOLVED: command timing / inter-command delays not specified -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:20:07.137Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:20:07.137Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions matched 1:1 to source commands; transport parameters verified verbatim; command catalogue fully represented."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
