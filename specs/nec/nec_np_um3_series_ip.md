---
spec_id: admin/nec-np-um3-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP-UM3 Series Control Spec"
manufacturer: NEC
model_family: "NP-UM3 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NP-UM3 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-14T18:17:18.735Z
generated_at: 2026-05-14T18:17:18.735Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:18.735Z
  matched_actions: 30
  action_count: 30
  confidence: high
  summary: "All 54 spec actions matched verbatim command sequences in the source; transport parameters verified; comprehensive command coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# NEC NP-UM3 Series Control Spec

## Summary
The NEC NP-UM3 Series is a projector controllable via RS-232C serial or TCP/IP (wired LAN) using a binary command protocol. Commands and responses are hex byte sequences with a trailing checksum. This spec covers power control, input switching, mute functions, picture/volume adjustment, lens control, lens memory, eco mode, PIP/PbP, edge blending, freeze, shutter, and various status queries.

<!-- UNRESOLVED: NP-UM3 Series is not explicitly listed in the supplementary tables; input terminal codes, aspect values, and eco mode values are model-specific and could not be confirmed for this exact series -->
<!-- UNRESOLVED: some models cannot receive commands in standby mode — applicability to NP-UM3 unknown -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  pinout: |
    D-SUB 9P: Pin2=RxD, Pin3=TxD, Pin5=GND, Pin7=RTS, Pin8=CTS
```

## Traits
```yaml
- powerable    # power on/off commands present
- queryable    # extensive status request commands present
- routable     # input switch command present
- levelable    # volume, brightness, contrast, color, hue, sharpness adjustment present
- muteable     # picture mute, sound mute, onscreen mute present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  response_success: "22h 00h <ID1> <ID2> 00h <CKS>"
  notes: No other commands accepted during power-on sequence.

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  response_success: "22h 01h <ID1> <ID2> 00h <CKS>"
  notes: No other commands accepted during power-off including cooling time.

- id: input_switch
  label: Input Switch
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal hex code (model-specific, e.g. 01h=COMPUTER, 06h=VIDEO, A1h=HDMI, 20h=LAN)"
  response_success: "22h 03h <ID1> <ID2> 01h <DATA01> <CKS>"
  response_data:
    DATA01: "00h=success, FFh=error (no signal switch)"

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: target
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: "16-bit signed adjustment value (low byte, high byte)"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: "16-bit signed adjustment value (low byte, high byte)"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: aspect
      type: integer
      description: "Aspect value code (model-specific)"

- id: lamp_adjust
  label: Lamp/Light Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 96h FFh <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: "16-bit signed adjustment value (low byte, high byte)"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: key_code
      type: integer
      description: "WORD key code (e.g. 0200h=POWER ON, 0300h=POWER OFF, 0500h=AUTO, 0600h=MENU, 0700h=UP, 0800h=DOWN, 0900h=RIGHT, 0A00h=LEFT, 0B00h=ENTER, 0C00h=EXIT)"

- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"

- id: lens_control
  label: Lens Control (timed)
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: target
      type: integer
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V, 06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus continuous, 81h=minus continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  notes: Send 00h to stop continuous drive.

- id: lens_control_2
  label: Lens Control (absolute/relative)
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: target
      type: integer
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V, FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute value, 02h=relative value"
    - name: value
      type: integer
      description: "16-bit adjustment value (low byte, high byte)"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: Operates on the profile selected via lens_profile_set.

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
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
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: operation
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: mode
      type: integer
      description: "Eco mode value (model-specific)"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01-16> 00h <CKS>"
  params:
    - name: name
      type: string
      description: "Projector name (up to 16 bytes)"

- id: pip_pbp_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "Mode: 00h=PIP, 01h=PbP. Position: 00h=TL, 01h=TR, 02h=BL, 03h=BR. Sub input: model-specific code."

- id: edge_blending_set
  label: Edge Blending Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: enabled
      type: integer
      description: "00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal code (model-specific)"
    - name: audio_source
      type: integer
      description: "00h=specified terminal, 01h=BNC, 02h=COMPUTER"
- id: carbon_savings_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: target
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  type: binary
  command: "00h 88h 00h 00h 00h 88h"
  response_data:
    DATA01: "Bit0=Cover error, Bit4=Fan error, Bit5=Power error, Bit6=Lamp off, Bit7=Lamp replacement moratorium"
    DATA02: "Bit0=Lamp usage exceeded, Bit1=Formatter error, Bit2=Lamp 2 off, Bit7=Extended status"
    DATA03: "Bit1=FPGA error, Bit2=Temp sensor error, Bit3=Lamp not present, Bit4=Lamp data error, Bit5=Mirror cover error"
    DATA04: "Bit0=Lamp 2 not present, Bit1=Lamp 2 data error, Bit2=Temp dust error, Bit3=Foreign matter sensor, Bit7=Lens not installed"
    DATA09: "Bit0=Portrait cover, Bit1=Interlock switch open, Bit2=System error (Slave CPU), Bit3=System error (Formatter)"
  description: 12-byte bitmask of projector error conditions

- id: power_status
  label: Power / Running Status
  type: enum
  command: "00h 85h 00h 00h 01h 01h 87h"
  response_data:
    DATA03_power: "00h=Standby, 01h=Power On"
    DATA04_cooling: "00h=Not executing, 01h=During execution"
    DATA05_power_process: "00h=Not executing, 01h=During execution"
    DATA06_operation: "00h=Standby(Sleep), 04h=Power On, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"

- id: input_status
  label: Input Status
  type: composite
  command: "00h 85h 00h 00h 01h 02h 88h"
  response_data:
    DATA01: "Signal switch: 00h=not executing, 01h=during execution"
    DATA02: "Signal list number (value - 1)"
    DATA03: "Selection signal type 1"
    DATA04: "Selection signal type 2 (01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 20h=DVI-D, 21h=HDMI, 22h=DisplayPort)"
    DATA09: "00h=Video signal, 01h=No signal, 02h=Viewer, 03h=Test pattern, 04h=LAN"

- id: mute_status
  label: Mute Status
  type: composite
  command: "00h 85h 00h 00h 01h 03h 89h"
  response_data:
    DATA01_picture_mute: "00h=Off, 01h=On, FFh=Not supported"
    DATA02_sound_mute: "00h=Off, 01h=On, FFh=Not supported"
    DATA03_onscreen_mute: "00h=Off, 01h=On, FFh=Not supported"
    DATA04_forced_onscreen_mute: "00h=Off, 01h=On, FFh=Not supported"

- id: model_name
  label: Model Name
  type: string
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  response_data:
    DATA01_32: "Model name (NUL-terminated string)"

- id: cover_status
  label: Cover Status
  type: enum
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  response_data:
    DATA01: "00h=Normal (cover opened), 01h=Cover closed"

- id: lamp_usage_time
  label: Lamp Usage Time
  type: integer
  command: "03h 8Ah 00h 00h 00h 8Dh"
  response_data:
    DATA01_49: "Projector name"
    DATA83_86: "Lamp usage time in seconds"
    DATA87_90: "Filter usage time in seconds"
  notes: Updated at one-minute intervals.

- id: lamp_info
  label: Lamp Information
  type: composite
  command: "03h 96h 00h 00h 02h <target> <content> <CKS>"
  params:
    - name: target
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      description: "01h=usage time (seconds), 04h=remaining life (%)"
  response_data:
    DATA03_06: "Obtained value (32-bit)"

- id: filter_usage_info
  label: Filter Usage Information
  type: composite
  command: "03h 95h 00h 00h 00h 98h"
  response_data:
    DATA01_04: "Filter usage time (seconds)"
    DATA05_08: "Filter alarm start time (seconds)"

- id: gain_parameter
  label: Gain Parameter
  type: composite
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: target
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"
  response_data:
    DATA01_status: "00h=Display not possible, 01h=Adjustment not possible, 02h=Adjustment possible, FFh=Gain does not exist"
    DATA02_03: "Upper limit"
    DATA04_05: "Lower limit"
    DATA06_07: "Default value"
    DATA08_09: "Current value"
    DATA14: "00h=Default invalid, 01h=Default valid"

- id: lens_position
  label: Lens Position
  type: composite
  command: "02h 1Ch 00h 00h 02h <target> 00h <CKS>"
  params:
    - name: target
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V"
  response_data:
    DATA02_03: "Upper limit"
    DATA04_05: "Lower limit"
    DATA06_07: "Current value"

- id: lens_operation_status
  label: Lens Operation Status
  type: binary
  command: "02h 22h 00h 00h 01h 00h 25h"
  response_data:
    DATA01: "Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V (0=Stop, 1=Operating)"

- id: lens_memory_option
  label: Lens Memory Option
  type: enum
  command: "02h 20h 00h 00h 01h <target> <CKS>"
  params:
    - name: target
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  response_data:
    DATA02: "00h=OFF, 01h=ON"

- id: lens_profile
  label: Lens Profile
  type: enum
  command: "02h 28h 00h 00h 00h 2Ah"
  response_data:
    DATA01: "00h=Profile 1, 01h=Profile 2"

- id: eco_mode
  label: Eco Mode
  type: enum
  command: "03h B0h 00h 00h 01h 07h BBh"
  response_data:
    DATA01: "Eco mode value (model-specific)"

- id: projector_name
  label: LAN Projector Name
  type: string
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  response_data:
    DATA01_17: "Projector name (NUL-terminated string)"

- id: mac_address
  label: MAC Address
  type: string
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  response_data:
    DATA01_06: "MAC address (6 bytes)"

- id: pip_pbp_status
  label: PIP/Picture by Picture Status
  type: composite
  command: "03h B0h 00h 00h 02h C5h <target> <CKS>"
  params:
    - name: target
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  response_data:
    DATA02: "Mode: 00h=PIP, 01h=PbP. Position: 00h=TL, 01h=TR, 02h=BL, 03h=BR."

- id: edge_blending_status
  label: Edge Blending Status
  type: enum
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  response_data:
    DATA01: "00h=OFF, 01h=ON"

- id: serial_number
  label: Serial Number
  type: string
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  response_data:
    DATA01_16: "Serial number (NUL-terminated string)"

- id: basic_information
  label: Basic Information
  type: composite
  command: "00h BFh 00h 00h 01h 02h C2h"
  response_data:
    DATA01: "00h=Standby(Sleep), 04h=Power On, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"
    DATA02: "00h=Video signal, 01h=No signal, 02h=Viewer, 03h=Test pattern, 04h=LAN"
    DATA04: "01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 21h=HDMI, 22h=DisplayPort"
    DATA06: "Video mute: 00h=Off, 01h=On"
    DATA07: "Sound mute: 00h=Off, 01h=On"
    DATA08: "Onscreen mute: 00h=Off, 01h=On"
    DATA09: "Freeze: 00h=Off, 01h=On"

- id: info_string
  label: Information String
  type: string
  command: "00h D0h 00h 00h 03h 00h <type> 01h <CKS>"
  params:
    - name: info_type
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
  response_data:
    DATA03_xx: "Label/information string (NUL-terminated)"

- id: setting_info
  label: Setting Information
  type: composite
  command: "00h 85h 00h 00h 01h 00h 86h"
  response_data:
    DATA01_03: "Base model type"
    DATA04: "Sound function: 00h=Not available, 01h=Available"
    DATA05: "Profile number: 00h=N/A, 01h=Clock, 02h=Sleep timer, 03h=Both"
```

## Variables
```yaml
# No continuously settable variables beyond what Actions already cover.
# All adjustable parameters (picture, volume, lens position) are set via Actions.
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited notifications from the projector
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power On: no other commands accepted during power-on sequence"
  - "Power Off: no other commands accepted during power-off including cooling time"
# UNRESOLVED: source mentions interlock switch (error status bit) but no explicit safety procedure documented
```

## Notes
- **Binary protocol**: All commands and responses are raw hex byte sequences, not ASCII text. Each message ends with a single-byte checksum (sum of all preceding bytes, low-order 8 bits).
- **Parameters**: `<ID1>` = control ID set on projector, `<ID2>` = model code, `<CKS>` = checksum.
- **Error responses** always follow the pattern `AXh ... <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>` where ERR1/ERR2 encode the failure reason.
- **Error codes**: `00h/00h`=unrecognized command, `00h/01h`=not supported by model, `01h/00h`=invalid value, `01h/01h`=invalid input terminal, `02h/0Dh`=power is off, `02h/0Eh`=execution failed, and others (see source section 2.4).
- **Picture/Sound mute auto-cancel**: Picture mute cancels on input switch or video signal change. Sound mute cancels on input switch, video signal change, or volume adjustment.
- **Lens continuous drive**: After sending `7Fh` (plus) or `81h` (minus), send `00h` to stop.
- **Standby mode**: Some models cannot receive LAN commands in standby. Standby mode setting required varies by model.

<!-- UNRESOLVED: input terminal hex codes are model-specific; NP-UM3 Series not listed in supplementary tables -->
<!-- UNRESOLVED: aspect values are model-specific; NP-UM3 Series not listed in supplementary tables -->
<!-- UNRESOLVED: eco mode values are model-specific; NP-UM3 Series not listed in supplementary tables -->
<!-- UNRESOLVED: sub input setting values for PIP/PbP are model-specific -->
<!-- UNRESOLVED: no firmware version compatibility range stated in source -->
<!-- UNRESOLVED: maximum number of concurrent connections not stated -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-14T18:17:18.735Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:18.735Z
matched_actions: 30
action_count: 30
confidence: high
summary: "All 54 spec actions matched verbatim command sequences in the source; transport parameters verified; comprehensive command coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
