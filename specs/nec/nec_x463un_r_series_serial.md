---
spec_id: admin/nec-x463un-r-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC X463UN-R Series Control Spec"
manufacturer: NEC
model_family: X463UN-R
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - X463UN-R
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:53:31.161Z
last_checked_at: 2026-06-02T22:12:25.086Z
generated_at: 2026-06-02T22:12:25.086Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal codes in Appendix reference external appendix not included in this source; aspect and eco mode value tables partially populated from available hex codes"
  - "eco mode value table varies by model; see Appendix"
  - "no discrete Variables section applicable - all parameters use action commands."
  - "no unsolicited event notifications documented in source."
  - "no multi-step macro sequences documented in source."
  - "no explicit safety warnings or confirmation dialogs documented beyond command-blocking behavior."
  - "complete input terminal code table (Appendix) — only partial codes available in this source"
  - "eco mode value cross-reference by model not included in this source"
  - "base model type codes not enumerated in this source"
  - "sub input selection signal type values for PIP/PBP not fully documented"
  - "firmware version compatibility not stated"
  - "TCP keepalive or connection maintenance requirements not documented"
  - "command timing / inter-command delay requirements not stated"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:12:25.086Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions traced to source (dip-safe re-verify). (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC X463UN-R Series Control Spec

## Summary
NEC X463UN-R is a professional projector supporting both RS-232C serial and wired LAN (TCP/IP) control. This spec covers the full command set including power control, input routing, picture/sound adjustment, mute functions, lens control, eco mode, and queryable status variables. Both serial (115200/38400/19200/9600/4800 bps, 8N1) and TCP (port 7142) transports are documented.

<!-- UNRESOLVED: input terminal codes in Appendix reference external appendix not included in this source; aspect and eco mode value tables partially populated from available hex codes -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # highest listed; source shows 115200/38400/19200/9600/4800 selectable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 7142  # TCP port for LAN control, stated in source
auth:
  type: none  # inferred: no auth procedure in source
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
  hex: "02 00 00 00 00 02"

- id: power_off
  label: Power Off
  kind: action
  params: []
  hex: "02 01 00 00 00 03"

- id: input_sw_change
  label: Input Switch
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code (e.g., 06h=VIDEO, 01h=COMPUTER, A1h=HDMI)
  hex_template: "02 03 00 00 02 01 {input}"

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  hex: "02 10 00 00 00 12"

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []
  hex: "02 11 00 00 00 13"

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  hex: "02 12 00 00 00 14"

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []
  hex: "02 13 00 00 00 15"

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  hex: "02 14 00 00 00 16"

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []
  hex: "02 15 00 00 00 17"

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)
  hex_template: "03 10 00 00 05 {target} {mode} {value_low} {value_high}"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: Volume value (16-bit signed)
  hex_template: "03 10 00 00 05 05 {mode} {value_low} {value_high}"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: "Aspect mode hex code: 00h=AUTO, 01h=WIDE ZOOM, 02h=16:9, 03h=NATIVE, 04h=4:3, 05h=15:9, 06h=16:10, 07h=LETTER BOX"
  hex_template: "03 10 00 00 05 18 00 00 {value}"

- id: lamp_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)
  hex_template: "03 10 00 00 05 96 FF {mode} {value_low} {value_high}"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "Key code from table (e.g., 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU)"
  hex_template: "02 0F 00 00 02 {key_code_low} {key_code_high}"

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  hex: "02 16 00 00 00 18"

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  hex: "02 17 00 00 00 19"

- id: lens_control
  label: Lens Control (Periphery Focus)
  kind: action
  params:
    - name: direction
      type: integer
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=continuous+, 81h=continuous-, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  hex_template: "02 18 00 00 02 06 {direction}"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: stop
      type: integer
      description: "FFh=Stop (ignores other params)"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: 16-bit adjustment value
  hex_template: "02 1D 00 00 04 {stop} {mode} {value_low} {value_high}"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  hex_template: "02 1E 00 00 01 {operation}"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  hex_template: "02 1F 00 00 01 {operation}"

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
  hex_template: "02 21 00 00 02 {option} {value}"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"
  hex_template: "02 27 00 00 01 {profile}"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=NORMAL/AUTO ECO, 02h=ECO1, 03h=ECO2, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT"
  hex_template: "03 B1 00 00 02 07 {mode}"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)
  hex_template: "03 B1 00 00 12 2C {name_bytes} 00"

- id: pip_pbp_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value per target
  hex_template: "03 B1 00 00 03 C5 {target} {value}"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=ON"
  hex_template: "03 B1 00 00 03 DF 00 {mode}"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=ON, 02h=OFF"
  hex_template: "01 98 00 00 01 {state}"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal code
    - name: value
      type: integer
      description: "00h=specified terminal, 01h=BNC, 02h=COMPUTER"
  hex_template: "03 C9 00 00 03 09 {input} {value}"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status Request
  type: bitfield
  response_hex_template: "A0 88 {id1} {id2} 02 {data01} {data02} ... {err1} {err2} {cks}"
  fields:
    data01:
      - Bit0: Cover error
      - Bit1: Temperature error (bi-metallic strip)
      - Bit2: Reserved
      - Bit3: Fan error
      - Bit4: Fan error
      - Bit5: Power error
      - Bit6: Lamp off or backlight off
      - Bit7: Lamp in replacement moratorium
    data02:
      - Bit0: Lamp usage time exceeded
      - Bit1: Formatter error
      - Bit2: Lamp 2 off
    data03:
      - Bit0: Reserved
      - Bit1: FPGA error
      - Bit2: Temperature sensor error
      - Bit3: Lamp not present
      - Bit4: Lamp data error
      - Bit5: Mirror cover error
      - Bit6: Lamp 2 moratorium
      - Bit7: Lamp 2 usage exceeded
    data04:
      - Bit0: Lamp 2 not present
      - Bit1: Lamp 2 data error
      - Bit2: Temperature due to dust
      - Bit3: Foreign matter sensor error
      - Bit7: Lens not installed properly
    data09:
      - Bit0: Portrait cover side up
      - Bit1: Interlock switch open
      - Bit2: System error (Slave CPU)
      - Bit3: System error (Formatter)

- id: power_state
  label: Running Status / Power State
  type: enum
  query_hex: "00 85 00 00 01 01 87"
  response_data:
    data03:
      - "00h: Standby"
      - "01h: Power on"
    data06:
      - "00h: Standby (Sleep)"
      - "04h: Power on"
      - "05h: Cooling"
      - "06h: Standby (error)"
      - "0Fh: Standby (Power saving)"
      - "10h: Network standby"

- id: input_status
  label: Input Status Request
  type: object
  query_hex: "00 85 00 00 01 02 88"
  fields:
    - data01: Signal switch process
    - data02: Signal list number
    - data03: Selection signal type 1
    - data04: Selection signal type 2
    - data06: Test pattern display
    - data09: Content displayed

- id: mute_status
  label: Mute Status Request
  type: object
  query_hex: "00 85 00 00 01 03 89"
  fields:
    data01:
      - "00h: Off"
      - "01h: On"
    data02: Sound mute
    data03: Onscreen mute
    data04: Forced onscreen mute

- id: information_request
  label: Information Request
  type: object
  query_hex: "03 8A 00 00 00 8D"
  response_length: 62h
  fields:
    data01_49: Projector name (NUL-terminated string)
    data83_86: Lamp usage time (seconds)
    data87_90: Filter usage time (seconds)

- id: filter_usage_info
  label: Filter Usage Information Request
  type: object
  query_hex: "03 95 00 00 00 98"
  fields:
    data01_04: Filter usage time (seconds)
    data05_08: Filter alarm start time (seconds)

- id: lamp_info_3
  label: Lamp Information Request 3
  type: object
  query_hex: "03 96 00 00 02 {lamp} {content} {cks}"
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Lamp usage time, 04h=Lamp remaining life %"
  response_fields:
    data03_06: Obtained information

- id: carbon_savings_info
  label: Carbon Savings Information Request
  type: object
  query_hex: "03 9A 00 00 01 {type} {cks}"
  params:
    - name: type
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: lens_control_request
  label: Lens Control Request
  type: object
  query_hex: "02 1C 00 00 02 {target} 00 {cks}"
  fields:
    data02_03: Upper limit of adjustment range
    data04_05: Lower limit of adjustment range
    data06_07: Current value

- id: lens_memory_option_request
  label: Lens Memory Option Request
  type: object
  query_hex: "02 20 00 00 01 {option} {cks}"
  fields:
    data01: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    data02: "00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request
  type: object
  query_hex: "02 22 00 00 01 00 25"
  fields:
    data01:
      - Bit0: Lens memory status
      - Bit1: Zoom status
      - Bit2: Focus status
      - Bit3: Lens Shift (H) status
      - Bit4: Lens Shift (V) status

- id: lens_profile_request
  label: Lens Profile Request
  type: object
  query_hex: "02 28 00 00 00 2A"
  fields:
    data01: "00h=Profile 1, 01h=Profile 2"

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  type: object
  query_hex: "03 05 00 00 03 {target} 00 00 {cks}"
  params:
    - name: target
      type: integer
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT"
  response_fields:
    data01: Adjustment status
    data02_03: Upper limit
    data04_05: Lower limit
    data06_07: Default value
    data08_09: Current value

- id: setting_request
  label: Setting Request
  type: object
  query_hex: "00 85 00 00 01 00 86"
  fields:
    data01_03: Base model type
    data04: Sound function available
    data05: Clock/sleep timer function

- id: model_name_request
  label: Model Name Request
  type: string
  query_hex: "00 85 00 00 01 04 8A"
  response_length: 20h
  response_data: Model name (NUL-terminated, 32 bytes max)

- id: cover_status_request
  label: Cover Status Request
  type: enum
  query_hex: "00 85 00 00 01 05 8B"
  values:
    - "00h: Normal (cover opened)"
    - "01h: Cover closed"

- id: information_string_request
  label: Information String Request
  type: string
  query_hex: "00 D0 00 00 03 00 {type} 01 {cks}"
  params:
    - name: type
      type: integer
      description: "03h=Horizontal sync freq, 04h=Vertical sync freq"

- id: eco_mode_request
  label: Eco Mode Request
  type: enum
  query_hex: "03 B0 00 00 01 07 BB"
  # UNRESOLVED: eco mode value table varies by model; see Appendix

- id: lan_projector_name_request
  label: LAN Projector Name Request
  type: string
  query_hex: "03 B0 00 00 01 2C E0"
  response_length: 12h
  response_data: Projector name (NUL-terminated)

- id: lan_mac_address_request2
  label: LAN MAC Address Status Request 2
  type: string
  query_hex: "03 B0 00 00 02 9A 00 4F"
  response_length: 08h
  response_data: MAC address (6 bytes)

- id: pip_pbp_request
  label: PIP/Picture by Picture Request
  type: object
  query_hex: "03 B0 00 00 02 C5 {target} {cks}"
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  type: enum
  query_hex: "03 B0 00 00 02 DF 00 94"
  values:
    - "00h: OFF"
    - "01h: ON"

- id: base_model_type_request
  label: Base Model Type Request
  type: object
  query_hex: "00 BF 00 00 01 00 C0"
  response_length: 10h
  fields:
    data01_02: Base model type
    data03_11: Model name
    data12_13: Base model type

- id: serial_number_request
  label: Serial Number Request
  type: string
  query_hex: "00 BF 00 00 02 01 06 C8"
  response_length: 12h
  response_data: Serial number (NUL-terminated, 16 bytes)

- id: basic_information_request
  label: Basic Information Request
  type: object
  query_hex: "00 BF 00 00 01 02 C2"
  response_length: 10h
  fields:
    data01: Operation status
    data02: Content displayed
    data03: Selection signal type 1
    data04: Selection signal type 2
    data05: Display signal type
    data06: Video mute
    data07: Sound mute
    data08: Onscreen mute
    data09: Freeze status
```

## Variables
```yaml
# All settable parameters are covered by Actions above.
# UNRESOLVED: no discrete Variables section applicable - all parameters use action commands.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Power on command (015): While turning on, no other command can be accepted."
  - description: "Power off command (016): While turning off (including cooling time), no other command can be accepted."
  - description: "Lens control: After sending continuous drive (7Fh/81h), send 00h to stop."
  - description: "Interlock switch (data09, bit1): Open interlock prevents operation."
# UNRESOLVED: no explicit safety warnings or confirmation dialogs documented beyond command-blocking behavior.
```

## Notes
**Command format:** All commands use hex notation with the structure: `[HEADER] [CMD] [ID1] [ID2] [LEN] [DATA...] [CKS]`. Checksum (CKS) is low-order byte of sum of all preceding bytes.

**Serial configuration:** The source lists multiple baud rates (115200/38400/19200/9600/4800). The highest (115200) is listed first but the projector likely ships at 9600. No explicit "default" is stated.

**LAN port:** TCP 7142 is stated for LAN control. No mention of HTTP/REST protocol — commands are sent raw over TCP.

**Input terminal values:** Appendix lists many hex codes for input selection (018 command). Some codes vary by model (e.g., HDMI can be A1h or 1Ah). Full model-specific appendix not included.

**Aspect values:** Some aspect modes have multiple hex codes (e.g., ZOOM=07h or 08h, WIDE SCREEN=02h or 03h, FULL=09h or 10h) — model-dependent.

**Eco mode values:** Eco mode codes vary significantly by model (OFF=00h, NORMAL=00h or 01h, ECO=02h or 03h, etc.) — model-specific appendix required.

**Standby modes:** Some models require specific standby mode settings to accept serial or LAN commands while in standby. Modes listed: Normal, Active, Eco, NORMAL, NETWORK STANDBY, SLEEP, OFF, ON, STANDBY POWER ON for serial; Normal, NORMAL, NETWORK STANDBY, SLEEP, HTBaseT STANDBY, OFF, ON, STANDBY POWER ON for LAN. Supported modes vary by model.

<!-- UNRESOLVED: complete input terminal code table (Appendix) — only partial codes available in this source -->
<!-- UNRESOLVED: eco mode value cross-reference by model not included in this source -->
<!-- UNRESOLVED: base model type codes not enumerated in this source -->
<!-- UNRESOLVED: sub input selection signal type values for PIP/PBP not fully documented -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: TCP keepalive or connection maintenance requirements not documented -->
<!-- UNRESOLVED: command timing / inter-command delay requirements not stated -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:53:31.161Z
last_checked_at: 2026-06-02T22:12:25.086Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:12:25.086Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions traced to source (dip-safe re-verify). (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal codes in Appendix reference external appendix not included in this source; aspect and eco mode value tables partially populated from available hex codes"
- "eco mode value table varies by model; see Appendix"
- "no discrete Variables section applicable - all parameters use action commands."
- "no unsolicited event notifications documented in source."
- "no multi-step macro sequences documented in source."
- "no explicit safety warnings or confirmation dialogs documented beyond command-blocking behavior."
- "complete input terminal code table (Appendix) — only partial codes available in this source"
- "eco mode value cross-reference by model not included in this source"
- "base model type codes not enumerated in this source"
- "sub input selection signal type values for PIP/PBP not fully documented"
- "firmware version compatibility not stated"
- "TCP keepalive or connection maintenance requirements not documented"
- "command timing / inter-command delay requirements not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
