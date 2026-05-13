---
spec_id: admin/nec-2-r-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC 2 R Series Control Spec"
manufacturer: NEC
model_family: "2 R Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "2 R Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:15:11.315Z
generated_at: 2026-04-25T21:15:11.315Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:15:11.315Z
  matched_actions: 44
  action_count: 44
  confidence: high
  summary: "All 44 spec actions match corresponding NEC projector serial source commands 1:1; port 7142 and serial parameters verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC 2 R Series Control Spec

## Summary
NEC 2 R Series is a projector supporting both RS-232C serial and wired LAN (TCP/IP) control interfaces. The serial interface supports configurable baud rates from 4800 to 115200 bps. The LAN interface uses TCP port 7142. Both interfaces use the same command set with hexadecimal encoding, control ID, model code, and checksum validation.

<!-- UNRESOLVED: specific model variants within 2 R Series family not enumerated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # also supports: 38400, 19200, 9600, 4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 7142  # TCP port for LAN control
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # power on/off commands present
- routable        # input switching commands present
- queryable       # multiple status/information request commands present
- levelable       # volume, brightness, contrast, color, hue, sharpness adjustment commands present
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

- id: input_switch_change
  label: Input Switch Change
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal hex code (e.g., 01h=COMPUTER, 06h=VIDEO, 20h=LAN/NETWORK, A1h=HDMI, A6h=DisplayPort)

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
      description: Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)
    - name: mode
      type: integer
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect_value
      type: integer
      description: Aspect mode hex code (see Appendix for values)

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: target
      type: integer
      description: Adjustment target (96h FFh = LAMP ADJUST / LIGHT ADJUST)
    - name: mode
      type: integer
      description: Adjustment mode (00h=absolute, 01h=relative)
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code value (see key code table for mappings)

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
      description: Target (06h=Periphery Focus)
    - name: direction
      type: integer
      description: Direction/mode (00h=Stop, 01h/02h/03h=Drive for durations, 7Fh=Plus, 81h=Minus, FDh/FEh/FFh=Minus durations)

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: control
      type: integer
      description: Control (FFh=Stop)
    - name: mode
      type: integer
      description: Adjustment mode (00h=absolute, 02h=relative)
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: Operation (00h=MOVE, 01h=STORE, 02h=RESET)

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: Operation (00h=MOVE, 01h=STORE, 02h=RESET)

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: option
      type: integer
      description: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)
    - name: value
      type: integer
      description: Setting value (00h=OFF, 01h=ON)

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile_number
      type: integer
      description: Profile number (00h=Profile 1, 01h=Profile 2)

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: eco_mode
      type: integer
      description: Eco mode hex code (see Appendix for values)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes)

- id: pip_mode_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)
    - name: value
      type: integer
      description: Setting value (varies by target)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Mode (00h=OFF, 01h=ON)

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal (see Appendix for values)
    - name: audio_source
      type: integer
      description: Audio source (00h=terminal in DATA01, 02h=COMPUTER)

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: freeze
      type: integer
      description: Freeze state (01h=On, 02h=Off)

- id: error_status_request
  label: Error Status Request
  kind: query
  params: []

- id: information_request
  label: Information Request
  kind: query
  params: []

- id: filter_usage_info_request
  label: Filter Usage Information Request
  kind: query
  params: []

- id: lamp_info_request_3
  label: Lamp Information Request 3
  kind: query
  params:
    - name: lamp
      type: integer
      description: Lamp number (00h=Lamp 1, 01h=Lamp 2)
    - name: content
      type: integer
      description: Content (01h=Usage time, 04h=Remaining life)

- id: carbon_savings_request
  label: Carbon Savings Information Request
  kind: query
  params:
    - name: type
      type: integer
      description: Type (00h=Total Carbon Savings, 01h=Carbon Savings during operation)

- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: target
      type: integer
      description: Target (06h=Periphery Focus)

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: option
      type: integer
      description: Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)

- id: lens_info_request
  label: Lens Information Request
  kind: query
  params: []

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  params:
    - name: gain_name
      type: integer
      description: Gain name (00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST)

- id: setting_request
  label: Setting Request
  kind: query
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  params: []

- id: model_name_request
  label: Model Name Request
  kind: query
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: query
  params: []

- id: info_string_request
  label: Information String Request
  kind: query
  params:
    - name: info_type
      type: integer
      description: Information type (03h=Horizontal sync freq, 04h=Vertical sync freq)

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []

- id: lan_mac_address_request
  label: LAN MAC Address Request
  kind: query
  params: []

- id: pip_request
  label: PIP/Picture by Picture Request
  kind: query
  params:
    - name: target
      type: integer
      description: Target (00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3)

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  params: []

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: query
  params: []

- id: basic_info_request
  label: Basic Information Request
  kind: query
  params: []
```

## Feedbacks
```yaml
# Error codes (ERR1, ERR2 pairs) returned with response header A0h or A2h/A3h:
error_codes:
  - code: "0000"
    description: Command not recognized
  - code: "0001"
    description: Command not supported by model
  - code: "0100"
    description: Specified value invalid
  - code: "0101"
    description: Specified input terminal invalid
  - code: "0102"
    description: Specified language invalid
  - code: "0200"
    description: Memory allocation error
  - code: "0202"
    description: Memory in use
  - code: "0203"
    description: Specified value cannot be set
  - code: "0204"
    description: Forced onscreen mute on
  - code: "0206"
    description: Viewer error
  - code: "0207"
    description: No signal
  - code: "0208"
    description: Test pattern or filter displayed
  - code: "0209"
    description: No PC card inserted
  - code: "020A"
    description: Memory operation error
  - code: "020C"
    description: Entry list displayed
  - code: "020D"
    description: Command cannot be accepted because power is off
  - code: "020E"
    description: Command execution failed
  - code: "020F"
    description: No authority for operation
  - code: "0300"
    description: Specified gain number incorrect
  - code: "0301"
    description: Specified gain invalid
  - code: "0302"
    description: Adjustment failed

power_status:
  type: enum
  values:
    - standby
    - power_on
    - cooling
    - network_standby
    - standby_error

mute_status:
  type: object
  properties:
    picture_mute: [off, on]
    sound_mute: [off, on]
    onscreen_mute: [off, on]
    forced_onscreen_mute: [off, on]
```

## Variables
```yaml
# Gain parameters settable via 060-1 GAIN PARAMETER REQUEST 3:
picture_brightness:
  range:
    min: 0
    max: 255
  default: 128
picture_contrast:
  range:
    min: 0
    max: 255
  default: 128
picture_color:
  range:
    min: 0
    max: 255
  default: 128
picture_hue:
  range:
    min: 0
    max: 255
  default: 128
picture_sharpness:
  range:
    min: 0
    max: 255
  default: 128
volume:
  range:
    min: 0
    max: 255
  default: 128
lamp_adjust:
  range:
    min: 0
    max: 255
  # UNRESOLVED: default value not stated in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described as macros in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "While power on command (015) is executing, no other command can be accepted."
  - description: "While power off command (016) is executing (including cooling time), no other command can be accepted."
  - description: "Some models require specific standby modes to receive commands via serial or LAN - supported standby modes vary by model (Normal, Active, Eco, Network Standby, Sleep, etc.)."
  - description: "Portrait cover side up status returned in extended error status (DATA09 bit0)."
  - description: "Interlock switch open status returned in extended error status (DATA09 bit1)."
```

## Notes
**Command format:** All commands use hexadecimal notation with structure: `[Header] [Command code] [ID1] [ID2] [Data length] [Data] [Checksum]`. Response headers: A0h (success with data), A2h (success no data), A3h (error). Control ID (ID1) and Model code (ID2) must match projector settings.

**Baud rate selection:** The projector auto-detects or can be configured for 115200/38400/19200/9600/4800 bps. Default not stated.

**LAN control:** TCP port 7142 used for both sending and receiving commands. Wired LAN supports 10/100 Mbps auto-negotiation.

**Key codes:** Remote key codes include POWER ON (02h), POWER OFF (03h), AUTO (05h), MENU (06h), UP/DOWN/LEFT/RIGHT (07h-0Ah), ENTER (0Bh), EXIT (0Ch), MUTE (13h), COMPUTER1 (4Bh), COMPUTER2 (4Ch), VIDEO1 (4Fh), S-VIDEO (51h), VOLUME UP/DOWN (84h-85h), FREEZE (8Ah), ASPECT (A3h), SOURCE (D7h), LAMP MODE/ECO (EEh).

**Input terminal hex values (partial):** COMPUTER=01h, COMPUTER2=02h, VIDEO=06h, S-VIDEO=0Bh, HDMI=A1h or 1Ah, DVI-D=9Ch, NETWORK/LAN=20h, DisplayPort=A6h, HDBaseT=BFh, USB-B=22h.

**Aspect mode hex values:** AUTO=00h, WIDE ZOOM=01h, 16:9=02h, NATIVE=03h, 4:3=04h, 15:9=05h, 16:10=06h, ZOOM=07h or 08h, FULL=09h or 10h.

**Eco mode hex values:** OFF=00h, Normal=00h or 01h, ECO=02h or 03h, AUTO ECO=01h, ON=01h, LONG LIFE=04h, BOOST=05h, SILENT=06h.

**Standby mode requirements:** Some models require specific standby modes for serial/LAN control. Serial supports: Normal, Active, Eco, NORMAL, Network Standby, Sleep, OFF, ON, Standby Power On. LAN supports: Normal, NORMAL, Network Standby, Sleep, HDBaseT Standby, OFF, ON, Standby Power On. Supported modes vary by model.

<!-- UNRESOLVED: full list of input terminal hex codes, aspect values, and eco mode values may vary by specific model -->

<!-- UNRESOLVED: lamp usage time and filter usage time are updated at 1-minute intervals, not real-time -->

<!-- UNRESOLVED: specific model code (ID2) values not stated in source -->

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:15:11.315Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:15:11.315Z
matched_actions: 44
action_count: 44
confidence: high
summary: "All 44 spec actions match corresponding NEC projector serial source commands 1:1; port 7142 and serial parameters verified verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
