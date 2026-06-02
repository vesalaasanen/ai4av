---
spec_id: admin/nec-x551s-pc-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC X551S-PC Series Control Spec"
manufacturer: NEC
model_family: "X551S-PC Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "X551S-PC Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:53:33.331Z
last_checked_at: 2026-06-02T22:12:29.948Z
generated_at: 2026-06-02T22:12:29.948Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Some commands reference an appendix (\"Supplementary Information by Command\") that is not included in this source. Input terminal hex codes, aspect mode codes, eco mode codes, and audio select codes are partially documented in the appendix section of this source."
  - "Variables are typically settable parameters exposed as queryable state."
  - "The source document does not describe unsolicited event notifications"
  - "The source document does not describe multi-step command sequences"
  - "Appendix \"Supplementary Information by Command\" referenced throughout this spec is only partially captured. Full appendix content should be verified against the complete manual."
  - "Firmware version compatibility not stated in source."
  - "The document references a \"control ID\" (ID1) and \"model code\" (ID2) that must be set for communication, but the valid ranges and how to obtain them are not documented in this source excerpt."
  - "HDBaseT standby mode mentioned but not detailed."
verification:
  verdict: verified
  checked_at: 2026-06-02T22:12:29.948Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC X551S-PC Series Control Spec

## Summary
The NEC X551S-PC Series is a professional projector supporting both RS-232C serial and wired TCP/IP control. This spec covers the full command set including power control, input routing, picture/sound adjustments, lens control, eco mode, and status queries. Both transport protocols are documented: RS-232C with configurable baud rates, and TCP on port 7142.

<!-- UNRESOLVED: Some commands reference an appendix ("Supplementary Information by Command") that is not included in this source. Input terminal hex codes, aspect mode codes, eco mode codes, and audio select codes are partially documented in the appendix section of this source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 7142
auth:
  type: none
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code (e.g., 06h for VIDEO, 01h for COMPUTER, A1h for HDMI)

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []

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
      description: Adjustment value (16-bit, low-order first)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order first)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect mode hex code

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order first)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "Key code (WORD): 02h=POWER ON, 03h=POWER OFF, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []

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
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=Drive+, 81h=Drive-, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: action
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=Absolute, 02h=Relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: action
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: action
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
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
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=Freeze on, 02h=Freeze off"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Eco mode hex code (00h=OFF, 01h=NORMAL/AUTO ECO, 02h=ECO1, 03h=ECO2, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: item
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value dependent on item

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code
    - name: source
      type: integer
      description: "00h=Terminal in DATA01, 02h=COMPUTER, 01h=BNC"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status Request
  type: bitfield
  values:
    - DATA01: Bit0=Cover error, Bit1=Temperature error, Bit3=Fan error, Bit4=Fan error, Bit5=Power error, Bit6=Lamp off, Bit7=Lamp replacement moratorium
    - DATA02: Bit0=Lamp time exceeded, Bit1=Formatter error, Bit2=Lamp 2 off
    - DATA03: Bit0=Reserved, Bit1=FPGA error, Bit2=Temperature sensor error, Bit3=Lamp not present, Bit4=Lamp data error, Bit5=Mirror cover error, Bit6=Lamp 2 moratorium, Bit7=Lamp 2 time exceeded
    - DATA04: Bit0=Lamp 2 not present, Bit1=Lamp 2 data error, Bit2=Dust temperature error, Bit3=Foreign matter sensor, Bit7=Lens not installed

- id: information_request
  label: Information Request
  type: struct
  values:
    - DATA01-49: Projector name
    - DATA83-86: Lamp usage time (seconds)
    - DATA87-90: Filter usage time (seconds)

- id: filter_usage_info
  label: Filter Usage Information Request
  type: struct
  values:
    - DATA01-04: Filter usage time (seconds)
    - DATA05-08: Filter alarm start time (seconds)

- id: lamp_info_3
  label: Lamp Information Request 3
  type: struct
  values:
    - DATA01: "00h=Lamp 1, 01h=Lamp 2"
    - DATA03-06: Lamp usage time (seconds) or remaining life (%)

- id: carbon_savings_info
  label: Carbon Savings Information Request
  type: struct
  values:
    - DATA02-05: Carbon Savings (kg, max 99999)
    - DATA06-09: Carbon Savings (mg, max 999999)

- id: lens_control_request
  label: Lens Control Request
  type: struct
  values:
    - DATA02-03: Upper limit (16-bit)
    - DATA04-05: Lower limit (16-bit)
    - DATA06-07: Current value (16-bit)

- id: lens_memory_option_request
  label: Lens Memory Option Request
  type: enum
  values:
    - DATA01: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - DATA02: "00h=OFF, 01h=ON"

- id: lens_info_request
  label: Lens Information Request
  type: bitfield
  values:
    - DATA01: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V)

- id: lens_profile_request
  label: Lens Profile Request
  type: enum
  values:
    - DATA01: "00h=Profile 1, 01h=Profile 2"

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  type: struct
  values:
    - DATA01: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=VOLUME, 96h=LAMP/LIGHT"
    - DATA02: "00h=Display not possible, 01h=Adjustment not possible, 02h=Adjustment possible, FFh=Gain does not exist"
    - DATA03-04: Upper limit (16-bit)
    - DATA05-06: Lower limit (16-bit)
    - DATA07-08: Default value (16-bit)
    - DATA09-10: Current value (16-bit)
    - DATA11-12: Wide adjustment width (16-bit)
    - DATA13-14: Narrow adjustment width (16-bit)
    - DATA15: "00h=Default invalid, 01h=Default valid"

- id: setting_request
  label: Setting Request
  type: struct
  values:
    - DATA01-03: Base model type
    - DATA04: "00h=Sound not available, 01h=Sound available"
    - DATA05: "00h=Not available, 01h=Clock, 02h=Sleep timer, 03h=Clock+Sleep timer"

- id: running_status_request
  label: Running Status Request
  type: struct
  values:
    - DATA03: "00h=Standby, 01h=Power on"
    - DATA04: "00h=Not executed, 01h=Cooling in progress"
    - DATA05: "00h=Not executed, 01h=Power process in progress"
    - DATA06: "00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"

- id: input_status_request
  label: Input Status Request
  type: struct
  values:
    - DATA01: "00h=Not executed, 01h=In progress"
    - DATA02: Signal list number (add 1 for practical value)
    - DATA03: Signal type 1
    - DATA04: Signal type 2
    - DATA05: "00h=Default, 01h=User"
    - DATA06: "00h=No test pattern, 01h=Test pattern displayed"
    - DATA09: "00h=Video signal, 01h=No signal, 02h=Viewer, 03h=Test pattern, 04h=LAN"

- id: mute_status_request
  label: Mute Status Request
  type: struct
  values:
    - DATA01: "00h=Off, 01h=On (Picture mute)"
    - DATA02: "00h=Off, 01h=On (Sound mute)"
    - DATA03: "00h=Off, 01h=On (Onscreen mute)"
    - DATA04: "00h=Off, 01h=On (Forced onscreen mute)"
    - DATA05: "00h=Not displayed, 01h=Displayed"

- id: model_name_request
  label: Model Name Request
  type: string
  values:
    - DATA01-32: Model name (NUL-terminated)

- id: cover_status_request
  label: Cover Status Request
  type: enum
  values:
    - DATA01: "00h=Normal (opened), 01h=Cover closed"

- id: information_string_request
  label: Information String Request
  type: struct
  values:
    - DATA01: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    - DATA02: String length
    - DATA03-??: String (NUL-terminated)

- id: eco_mode_request
  label: Eco Mode Request
  type: integer
  values: Eco mode hex code

- id: lan_projector_name_request
  label: LAN Projector Name Request
  type: string
  values:
    - DATA01-17: Projector name (NUL-terminated)

- id: lan_mac_address_request2
  label: LAN MAC Address Request 2
  type: string
  values:
    - DATA01-06: MAC address (hex)

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  type: struct
  values:
    - DATA01: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - DATA02: Setting value

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  type: enum
  values:
    - DATA01: "00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request
  type: struct
  values:
    - DATA01-02: Base model type
    - DATA03-11: Model name
    - DATA12-13: Base model type

- id: serial_number_request
  label: Serial Number Request
  type: string
  values:
    - DATA01-16: Serial number (NUL-terminated)

- id: basic_information_request
  label: Basic Information Request
  type: struct
  values:
    - DATA01: "00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"
    - DATA02: "00h=Video signal, 01h=No signal, 02h=Viewer, 03h=Test pattern, 04h=LAN, 05h=Test pattern(user), 10h=Signal switching"
    - DATA03: Signal type 1
    - DATA04: Signal type 2
    - DATA05: Display signal type
    - DATA06: "00h=Off, 01h=On (Video mute)"
    - DATA07: "00h=Off, 01h=On (Sound mute)"
    - DATA08: "00h=Off, 01h=On (Onscreen mute)"
    - DATA09: "00h=Off, 01h=On (Freeze)"
```

## Variables
```yaml
# UNRESOLVED: Variables are typically settable parameters exposed as queryable state.
# The document describes SET commands that write parameters but does not clarify
# which parameters are persisted as independent Variables vs. tied to Actions.
# Remove this comment when reviewed against device behavior.
```

## Events
```yaml
# UNRESOLVED: The source document does not describe unsolicited event notifications
# or status push messages sent by the projector without a prior command.
# Remove this comment if the device sends asynchronous status updates.
```

## Macros
```yaml
# UNRESOLVED: The source document does not describe multi-step command sequences
# or macro functionality. Remove this comment if macros are documented.
```

## Safety
```yaml
confirmation_required_for:
  - power_on
  - power_off
interlocks: []
```

## Notes
The projector requires a specific standby mode to accept commands via serial or LAN. Supported standby modes vary by model: Normal, Active, Eco, NORMAL, NETWORK STANDBY, SLEEP, OFF, ON, STANDBY POWER ON for serial; Normal, NORMAL, NETWORK STANDBY, SLEEP, HTBaseT STANDBY, OFF, ON, STANDBY POWER ON for wired LAN. Some models only support certain standby modes for LAN vs. serial control.

While the lens is being driven via Lens Control (command 053), issuing the same command again continues driving without requiring a stop. After sending drive direction (7Fh or 81h) in DATA02, sending 00h stops the lens.

The power on command (015) blocks other commands while executing. The power off command (016) blocks other commands during cooling time.

Input terminal values, aspect mode values, eco mode values, and audio select values are documented in the Appendix of this source. Some values vary across models (e.g., HDMI may be A1h or 1Ah depending on model).

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced throughout this spec is only partially captured. Full appendix content should be verified against the complete manual. -->
<!-- UNRESOLVED: Firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: The document references a "control ID" (ID1) and "model code" (ID2) that must be set for communication, but the valid ranges and how to obtain them are not documented in this source excerpt. -->
<!-- UNRESOLVED: HDBaseT standby mode mentioned but not detailed. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:53:33.331Z
last_checked_at: 2026-06-02T22:12:29.948Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:12:29.948Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Some commands reference an appendix (\"Supplementary Information by Command\") that is not included in this source. Input terminal hex codes, aspect mode codes, eco mode codes, and audio select codes are partially documented in the appendix section of this source."
- "Variables are typically settable parameters exposed as queryable state."
- "The source document does not describe unsolicited event notifications"
- "The source document does not describe multi-step command sequences"
- "Appendix \"Supplementary Information by Command\" referenced throughout this spec is only partially captured. Full appendix content should be verified against the complete manual."
- "Firmware version compatibility not stated in source."
- "The document references a \"control ID\" (ID1) and \"model code\" (ID2) that must be set for communication, but the valid ranges and how to obtain them are not documented in this source excerpt."
- "HDBaseT standby mode mentioned but not detailed."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
