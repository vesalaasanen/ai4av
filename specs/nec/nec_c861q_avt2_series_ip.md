---
spec_id: admin/nec-c861q-avt2-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC C861Q-AVT2 Series Control Spec"
manufacturer: NEC
model_family: "C861Q-AVT2 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "C861Q-AVT2 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:16:19.452Z
generated_at: 2026-04-25T21:16:19.452Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:16:19.452Z
  matched_actions: 42
  action_count: 42
  confidence: high
  summary: "All 42 spec actions and feedbacks match NEC source; transport parameters verified; comprehensive command reference coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC C861Q-AVT2 Series Control Spec

## Summary
The NEC C861Q-AVT2 Series is a professional projector supporting both RS-232 serial and wired LAN (TCP/IP) control. This spec covers the full command set documented in the NEC Projector Control Command Reference Manual (BDT140013 Rev 7.1), including power, input routing, picture/sound mute, picture adjustment, volume, lens control, eco mode, and query commands. Control via TCP uses port 7142.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" values are referenced but not fully enumerated in this spec; some hex values vary by model -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands"
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # stated: all five baud rates supported
  data_bits: 8  # stated
  parity: none  # stated
  stop_bits: 1  # stated
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Evidence from command examples:
# - POWER ON / POWER OFF commands present
# - INPUT SW CHANGE command present
# - PICTURE ADJUST, VOLUME ADJUST present
# - INFORMATION REQUEST, STATUS REQUEST, QUERY commands present
# - LENS CONTROL commands present
Traits: [powerable, routable, levelable, queryable]
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: Turns on the power. No other command accepted while power is turning on.

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Turns off the power. No other command accepted during cooling time.

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal hex code. Common values: COMPUTER=01h, COMPUTER2=02h, VIDEO=06h, HDMI=A1h/1Ah, HDMI2=A2h/1Bh, DisplayPort=A6h, LAN=20h, HDBaseT=BFh. Full list in Appendix.

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  description: Turns picture mute on. Automatically cleared on input switch or video signal switch.

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  description: Turns sound mute on. Automatically cleared on input switch, video signal switch, or volume adjustment.

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  description: Turns onscreen mute on. Automatically cleared on input switch or video signal switch.

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
      description: Adjustment target. 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness
    - name: mode
      type: integer
      description: Adjustment mode. 00h=absolute value, 01h=relative value
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order byte first)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: Adjustment mode. 00h=absolute value, 01h=relative value
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order byte first)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect mode hex code. AUTO=00h, WIDE ZOOM=01h, 16:9=02h, NATIVE=03h, 4:3=04h, 15:9=05h, 16:10=06h, FULL=09h/10h. See Appendix for full list.

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: Adjustment target. 96h FFh=LAMP ADJUST/LIGHT ADJUST
    - name: mode
      type: integer
      description: Adjustment mode. 00h=absolute value, 01h=relative value
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order byte first)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code (16-bit WORD). POWER ON=0200h, POWER OFF=0300h, MENU=0600h, UP=0700h, DOWN=0800h, VOLUME UP=8A00h, VOLUME DOWN=8500h, etc. See key code table for full list.

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  description: Closes the lens shutter.

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  description: Opens the lens shutter.

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: target
      type: integer
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h=Drive +1s, 02h=Drive +0.5s, 03h=Drive +0.25s, 7Fh=Drive continuous +, 81h=Drive continuous -, FDh=Drive -0.25s, FEh=Drive -0.5s, FFh=Drive -1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute value, 02h=relative value"
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

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
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

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=ON/Normal, 02h/03h=ECO, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT. Varies by model. See Appendix for full list."

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
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value per target. MODE: 00h=PIP, 01h=PICTURE BY PICTURE. POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT.

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=ON"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=Turn freeze on, 02h=Turn freeze off"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal for audio. 00h=HDMI1, 01h=HDMI2, 02h=DisplayPort, 03h=HDBaseT, 04h=USB-A, 05h=USB-B. Varies by model.
    - name: value
      type: integer
      description: "00h=Terminal specified in DATA01, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  type: bitfield
  description: Error information. Bit0=Cover error, Bit1=Temp error, Bit3=Fan error, Bit4=Fan error, Bit5=Power error, Bit6=Lamp off, Bit7=Lamp replacement moratorium, etc. See error status data table.

- id: command_result
  label: Command Result
  type: enum
  values: [success, error]
  description: Success when ERR1 ERR2 = 00h 00h. Error codes vary. See error code list.

- id: running_status
  label: Running Status
  type: object
  description: Operation status. Power status (00h=Standby, 01h=Power on), cooling process, power on/off process, operation status (00h=Standby Sleep, 04h=Power on, 05h=Cooling, 06h=Standby error, 0Fh=Standby Power saving, 10h=Network standby).

- id: input_status
  label: Input Status
  type: object
  description: Input signal status. Signal switch process, signal list number, signal type (01h=COMPUTER, 02h=VIDEO, 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, etc.), content displayed (00h=Video, 01h=No signal, 03h=Test pattern).

- id: mute_status
  label: Mute Status
  type: object
  description: Picture mute (00h=Off, 01h=On), sound mute, onscreen mute, forced onscreen mute, onscreen display.

- id: model_name
  label: Model Name
  type: string
  description: Model name string (up to 32 bytes, NUL-terminated).

- id: cover_status
  label: Cover Status
  type: enum
  values: [normal, closed]
  description: "00h=Normal (cover opened), 01h=Cover closed"

- id: information_request
  label: Information Request
  type: object
  description: Projector name (DATA01-49), lamp usage time seconds (DATA83-86), filter usage time seconds (DATA87-90).

- id: filter_usage_info
  label: Filter Usage Information
  type: object
  description: Filter usage time seconds (DATA01-04), filter alarm start time seconds (DATA05-08).

- id: lamp_info_3
  label: Lamp Information 3
  type: object
  description: Lamp usage time seconds, lamp remaining life percentage. DATA01: 00h=Lamp1, 01h=Lamp2. DATA02: 01h=usage time, 04h=remaining life.

- id: carbon_savings_info
  label: Carbon Savings Information
  type: object
  description: Total or operation carbon savings. DATA01: 00h=Total, 01h=During operation. DATA02-05=Kilogram (max 99999kg), DATA06-09=Milligram (max 999999mg).

- id: eco_mode
  label: Eco Mode
  type: integer
  description: Eco mode value. OFF=00h, Normal=00h/01h, ECO=02h/03h, LONG LIFE=04h, BOOST=05h, SILENT=06h, AUTO ECO=01h. Varies by model.

- id: lan_projector_name
  label: LAN Projector Name
  type: string
  description: Projector name string (up to 17 bytes, NUL-terminated).

- id: lan_mac_address
  label: LAN MAC Address
  type: string
  description: MAC address (6 bytes, e.g. 01h-23h-45h-67h-89h-ABh).

- id: pip_picture_by_picture
  label: PIP/Picture by Picture
  type: object
  description: PIP/PbP mode, position, sub input settings.

- id: edge_blending_mode
  label: Edge Blending Mode
  type: enum
  values: [off, on]
  description: "00h=OFF, 01h=ON"

- id: base_model_type
  label: Base Model Type
  type: object
  description: Base model type, model name, serial number.

- id: serial_number
  label: Serial Number
  type: string
  description: Serial number (up to 16 bytes, NUL-terminated).

- id: basic_info
  label: Basic Information
  type: object
  description: Operation status, content displayed, signal type, video mute, sound mute, onscreen mute, freeze status. See data table.

- id: gain_parameter_3
  label: Gain Parameter 3
  type: object
  description: Adjusted value status (00h=display not possible, 01h=adjustment not possible, 02h=adjustment possible, FFh=not found), adjustment range (upper/lower limits), default value, current value, adjustment width.

- id: lens_control_request
  label: Lens Control Request
  type: object
  description: Lens position adjustment range (upper/lower limits) and current value.

- id: lens_memory_option_request
  label: Lens Memory Option Request
  type: object
  description: LOAD BY SIGNAL/FORCED MUTE option and setting value.

- id: lens_profile_request
  label: Lens Profile Request
  type: integer
  description: Selected profile number. 00h=Profile 1, 01h=Profile 2.

- id: lens_info
  label: Lens Information
  type: bitfield
  description: Lens status bits. Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V.

- id: information_string
  label: Information String
  type: string
  description: Horizontal or vertical sync frequency string. DATA01: 03h=horizontal sync freq, 04h=vertical sync freq.
```

## Variables
```yaml
# UNRESOLVED: variables are primarily settable via Actions (picture_adjust, volume_adjust, eco_mode_set, etc.)
# which are covered above. No separate Variables section required based on source evidence.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism described in source.
# The document describes only a request-response pattern; no push events are documented.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source.
# However, the document notes that certain operations automatically clear mute states:
# - Picture mute auto-clears on input switch or video signal switch
# - Sound mute auto-clears on input switch, video signal switch, or volume adjustment
# - Onscreen mute auto-clears on input switch or video signal switch
# These are behaviors, not explicit user-defined macros.
```

## Safety
```yaml
confirmation_required_for:
  - power_on  # "While this command is turning on the power, no other command can be accepted"
  - power_off  # "While this command is turning off the power (including the cooling time), no other command can be accepted"
interlocks: []
# UNRESOLVED: no safety-critical interlocks or voltage/power specifications in source.
# Source notes standby mode requirements: "Some models require specific standby modes to receive commands via serial or LAN"
# but does not specify which modes for which models.
```

## Notes
The NEC C861Q-AVT2 Series supports dual transport control: RS-232C serial and wired LAN (TCP/IP) on port 7142. All commands use a consistent binary packet format with ID1 (control ID), ID2 (model code), checksum (CKS), and variable data payload. Responses always include ERR1/ERR2 error codes. Commands requiring power-on or cooling periods block other commands during execution. The document references an Appendix with model-specific values (input terminal hex codes, aspect modes, eco modes, signal types) that vary by model; this spec cannot enumerate all variant values. Lens control supports continuous drive mode requiring explicit Stop command.

<!-- UNRESOLVED: model-specific variant hex values in Appendix not enumerated -->
<!-- UNRESOLVED: standby mode compatibility matrix by model not stated -->
<!-- UNRESOLVED: flow control (RTS/CTS) configuration not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:16:19.452Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:16:19.452Z
matched_actions: 42
action_count: 42
confidence: high
summary: "All 42 spec actions and feedbacks match NEC source; transport parameters verified; comprehensive command reference coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
