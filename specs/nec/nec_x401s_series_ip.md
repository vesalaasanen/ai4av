---
spec_id: admin/nec-x401s-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC X401S Series Control Spec"
manufacturer: NEC
model_family: "X401S Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "X401S Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:34:41.302Z
generated_at: 2026-04-25T21:34:41.302Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:34:41.302Z
  matched_actions: 43
  action_count: 43
  confidence: high
  summary: "All 43 spec actions matched source commands literally; transport parameters verified verbatim; no command-level drift detected."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC X401S Series Control Spec

## Summary
NEC projector supporting both RS-232C serial and wired LAN (TCP/IP) control. TCP port 7142 is used for sending and receiving commands. Supports power control, input routing, picture/sound/onscreen mute, volume, aspect ratio, lens control, eco mode, and comprehensive status queries. No authentication required.

<!-- UNRESOLVED: standalone model name not confirmed in source — spec derived from generic NEC projector command reference BDT140013 Rev 7.1 -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands"
serial:
  baud_rate: 115200  # stated: supports 115200/38400/19200/9600/4800 bps - lowest common
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: RTS/CTS pins present in pinout but flow control mode not specified
auth:
  type: none  # inferred: no auth/password/login procedure in source
```

## Traits
```yaml
- powerable       # 015. POWER ON, 016. POWER OFF present
- routable        # 018. INPUT SW CHANGE present
- queryable       # 009, 037 series, 078 series, 305 series present
- levelable       # 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST present
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
  label: Input Switch
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code (e.g., 01h=COMPUTER, 06h=VIDEO, A1h=HDMI, 20h=LAN/NETWORK)

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
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Volume level (16-bit signed)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: "00h=AUTO, 01h=WIDE ZOOM, 02h=16:9, 03h=NATIVE, 04h=4:3, 05h=15:9, 06h=16:10, 07h=LETTER BOX, 09h=FULL"

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: target
      type: integer
      description: "96h=Lamp Adjust/Light Adjust"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "Key code: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []

- id: lens_control
  label: Lens Control (Drive)
  kind: action
  params:
    - name: target
      type: integer
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h/02h/03h=Drive plus 1s/0.5s/0.25s, 7Fh=Drive plus, 81h=Drive minus, FDh/FEh/FFh=Drive minus 0.25s/0.5s/1s"

- id: lens_control_2
  label: Lens Control 2 (Position)
  kind: action
  params:
    - name: action
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: Position value (16-bit)

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
      description: "01h=On, 02h=Off"

- id: eco_mode_set
  label: ECO Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=NORMAL/AUTO ECO/ON, 02h=ECO1, 03h=ECO2, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture-by-Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "Mode: 00h=PIP, 01h=PICTURE BY PICTURE. Position: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT"

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
      description: "00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status Request
  kind: feedback
  returns:
    type: object
    fields:
      - name: data01
        type: object
        description: "Bit0=Cover error, Bit1=Temperature, Bit3=Fan error, Bit4=Fan error, Bit5=Power error, Bit6=Lamp off, Bit7=Lamp moratorium"
      - name: data02
        type: object
        description: "Bit0=Lamp time exceeded, Bit1=Formatter error, Bit2=Lamp 2 off, Bit3=Extended status"
      - name: data03
        type: object
        description: "Bit1=FPGA error, Bit2=Temperature sensor, Bit3=Lamp not present, Bit4=Lamp data error, Bit5=Mirror cover error, Bit6=Lamp 2 moratorium, Bit7=Lamp 2 time exceeded"
      - name: data04
        type: object
        description: "Bit0=Lamp 2 not present, Bit1=Lamp 2 data error, Bit2=Temperature dust, Bit3=Foreign matter, Bit5=Ballast comm error, Bit6=Iris calib error, Bit7=Lens not installed"
      - name: data09
        type: object
        description: "Bit0=Portrait cover side up, Bit1=Interlock switch open, Bit2=System error (Slave CPU), Bit3=System error (Formatter)"

- id: information_request
  label: Information Request
  kind: feedback
  returns:
    type: object
    fields:
      - name: projector_name
        type: string
        description: DATA01-49, NUL-terminated
      - name: lamp_usage_seconds
        type: integer
        description: DATA83-86 in seconds
      - name: filter_usage_seconds
        type: integer
        description: DATA87-90 in seconds

- id: filter_usage_info
  label: Filter Usage Information Request
  kind: feedback
  returns:
    type: object
    fields:
      - name: filter_usage_seconds
        type: integer
        description: DATA01-04
      - name: filter_alarm_start_seconds
        type: integer
        description: DATA05-08, returns -1 if undefined

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
    fields:
      - name: value
        type: integer
        description: Returns negative if replacement deadline exceeded

- id: carbon_savings_info
  label: Carbon Savings Information Request
  kind: feedback
  params:
    - name: type
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
  returns:
    type: object
    description: DATA02-05 = Kilograms (max 99999), DATA06-09 = Milligrams (max 999999)

- id: lens_control_request
  label: Lens Control Request
  kind: feedback
  returns:
    type: object
    fields:
      - name: upper_limit
        type: integer
        description: 16-bit
      - name: lower_limit
        type: integer
        description: 16-bit
      - name: current_value
        type: integer
        description: 16-bit

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: feedback
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  returns:
    type: object
    fields:
      - name: value
        type: integer
        description: "00h=OFF, 01h=ON"

- id: lens_profile_request
  label: Lens Profile Request
  kind: feedback
  returns:
    type: object
    fields:
      - name: profile
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

- id: lens_info_request
  label: Lens Information Request
  kind: feedback
  returns:
    type: object
    description: "Bit0=Lens memory (0=Stop, 1=Operating), Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V"

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: feedback
  params:
    - name: target
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light"
  returns:
    type: object
    fields:
      - name: status
        type: integer
        description: "00h=Display not possible, 01h=Adjustment not possible, 02h=Adjustment possible, FFh=Gain does not exist"
      - name: upper_limit
        type: integer
        description: 16-bit
      - name: lower_limit
        type: integer
        description: 16-bit
      - name: default_value
        type: integer
        description: 16-bit
      - name: current_value
        type: integer
        description: 16-bit

- id: setting_request
  label: Setting Request
  kind: feedback
  returns:
    type: object
    fields:
      - name: base_model_type
        type: integer
        description: DATA01-03
      - name: sound_function
        type: integer
        description: "00h=Not available, 01h=Available"
      - name: profile
        type: integer
        description: "00h=Not available, 01h=Clock, 02h=Sleep timer, 03h=Clock+Sleep timer"

- id: running_status_request
  label: Running Status Request
  kind: feedback
  returns:
    type: object
    fields:
      - name: power_status
        type: integer
        description: "00h=Standby, 01h=Power on"
      - name: cooling_process
        type: integer
        description: "00h=Not executed, 01h=During execution"
      - name: power_on_off_process
        type: integer
        description: "00h=Not executed, 01h=During execution"
      - name: operation_status
        type: integer
        description: "00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"

- id: input_status_request
  label: Input Status Request
  kind: feedback
  returns:
    type: object
    description: Returns signal switch process, signal list number (add 1), signal types, content displayed

- id: mute_status_request
  label: Mute Status Request
  kind: feedback
  returns:
    type: object
    fields:
      - name: picture_mute
        type: integer
        description: "00h=Off, 01h=On"
      - name: sound_mute
        type: integer
        description: "00h=Off, 01h=On"
      - name: onscreen_mute
        type: integer
        description: "00h=Off, 01h=On"
      - name: forced_onscreen_mute
        type: integer
        description: "00h=Off, 01h=On"
      - name: onscreen_display
        type: integer
        description: "00h=Not displayed, 01h=Displayed"

- id: model_name_request
  label: Model Name Request
  kind: feedback
  returns:
    type: string
    description: DATA01-32, NUL-terminated model name

- id: cover_status_request
  label: Cover Status Request
  kind: feedback
  returns:
    type: object
    fields:
      - name: status
        type: integer
        description: "00h=Normal (opened), 01h=Cover closed"

- id: info_string_request
  label: Information String Request
  kind: feedback
  params:
    - name: type
      type: integer
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
  returns:
    type: object
    description: Label string length + string (NUL-terminated)

- id: eco_mode_request
  label: ECO Mode Request
  kind: feedback
  returns:
    type: integer
    description: Eco mode value

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: feedback
  returns:
    type: string
    description: DATA01-17, NUL-terminated

- id: lan_mac_address_request
  label: LAN MAC Address Request
  kind: feedback
  returns:
    type: string
    description: MAC address as hex bytes

- id: pip_picture_by_picture_request
  label: PIP/Picture-by-Picture Request
  kind: feedback
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  returns:
    type: object

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: feedback
  returns:
    type: integer
    description: "00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: feedback
  returns:
    type: object

- id: serial_number_request
  label: Serial Number Request
  kind: feedback
  returns:
    type: string
    description: DATA01-16, NUL-terminated

- id: basic_information_request
  label: Basic Information Request
  kind: feedback
  returns:
    type: object
    description: Operation status, content displayed, signal types, video/sound/onscreen mute, freeze status
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters identified that are not Actions
# Volume and picture adjustments use action+params pattern rather than separate variables
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification format described in source
# Device appears to be poll-only (commands return responses, no autonomous notifications)
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "While POWER ON command is executing, no other command can be accepted"
  - "While POWER OFF command is executing (including cooling time), no other command can be accepted"
  - "Some models require specific standby modes to receive commands via serial or LAN (Normal, Active, Eco, Network Standby, Sleep, etc.)"
  - "Interlock switch status reported: Bit1 of DATA09 indicates interlock switch open state"
# UNRESOLVED: no explicit safety warnings for high voltage, laser, or lamp replacement procedures in source
```

## Notes
- Command format: `20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>` — all multi-byte values are big-endian
- Checksum (CKS): low-order byte of sum of all preceding bytes
- ID1 = Control ID (set on projector), ID2 = Model code (varies by model)
- Power commands (015, 016) block all other commands during execution
- Lens control supports continuous drive (7Fh/81h) with stop command (00h) to halt
- Eco mode affects lamp information values returned by 037-4 command
- Lamp usage time updated at 1-minute intervals (can query in 1-second units)
- Negative lamp remaining life indicates replacement deadline exceeded
- Input terminal hex codes vary by model — appendix lists common values
- Serial connection uses D-SUB 9P connector with RTS/CTS flow control pins
- LAN supports 10/100 Mbps Auto-Negotiation (IEEE802.3 / IEEE802.3u)
- Standby mode requirements differ between serial and LAN control
<!-- UNRESOLVED: complete input terminal code table not provided — appendix references "Supplementary Information by Command" not included in source -->
<!-- UNRESOLVED: base model type values not enumerated in source -->
<!-- UNRESOLVED: aspect mode hex codes vary (some have dual codes) — noted in appendix -->
<!-- UNRESOLVED: eco mode hex codes vary by model — appendix shows multiple possible values -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:34:41.302Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:34:41.302Z
matched_actions: 43
action_count: 43
confidence: high
summary: "All 43 spec actions matched source commands literally; transport parameters verified verbatim; no command-level drift detected."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
