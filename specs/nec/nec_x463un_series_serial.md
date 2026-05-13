---
spec_id: admin/nec-x463un_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC X463UN Series Control Spec"
manufacturer: NEC
model_family: "X463UN Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "X463UN Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:36:51.524Z
generated_at: 2026-04-25T21:36:51.524Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:36:51.524Z
  matched_actions: 51
  action_count: 51
  confidence: high
  summary: "All 51 spec actions matched exactly to source commands with correct transport parameters verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC X463UN Series Control Spec

## Summary
The NEC X463UN Series is a projector supporting both RS-232C serial and wired LAN (TCP/IP) control. This spec covers the complete command set including power control, input routing, picture/sound adjustment, lens control, and status queries. Communication uses a binary protocol with checksum validation.

<!-- UNRESOLVED: input terminal value tables (Appendix) are partially documented; some values vary by model -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # TCP port for LAN control; stated in source
serial:
  baud_rate: 115200  # source lists: 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: hardware flow control pins present (RTS/CTS) but usage not documented
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # power on/off commands present
- routable        # input switching command present
- queryable       # multiple status/information request commands present
- levelable       # picture adjust, volume adjust, brightness, contrast, etc.
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: Turns on the projector. No other command accepted while power is turning on.

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Turns off the projector. No other command accepted during cooling time.

- id: input_sw_change
  label: Input Switch
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code (e.g., 01h=COMPUTER, 06h=VIDEO, A1h=HDMI)

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  description: Mutes video output. Cleared by input switch or video signal switch.

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  description: Mutes audio. Cleared by input switch, video signal switch, or volume adjustment.

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  description: Blanks the on-screen display. Cleared by input switch or video signal switch.

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
      description: Adjustment target (00h=brightness, 01h=contrast, 02h=color, 03h=hue, 04h=sharpness)
    - name: mode
      type: integer
      description: 00h=absolute, 01h=relative
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: 00h=absolute, 01h=relative
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: Aspect mode hex code

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: Adjustment target (96h/FFh = LAMP ADJUST / LIGHT ADJUST)
    - name: mode
      type: integer
      description: 00h=absolute, 01h=relative
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code value (see key code table)

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
    - name: function
      type: integer
      description: 06h=Periphery Focus; direction codes: 01h/02h/03h = plus 1s/0.5s/0.25s; 7Fh=plus continuous; 81h=minus continuous; FDh/FEh/FFh = minus 1s/0.5s/0.25s; 00h=stop

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: FFh=stop; otherwise adjustment command
    - name: mode
      type: integer
      description: 00h=absolute, 02h=relative
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: 00h=MOVE, 01h=STORE, 02h=RESET

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: 00h=MOVE, 01h=STORE, 02h=RESET

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: option
      type: integer
      description: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE
    - name: value
      type: integer
      description: 00h=OFF, 01h=ON

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: 00h=Profile 1, 01h=Profile 2

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: 01h=freeze on, 02h=freeze off

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Eco mode hex code

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_pbp_set
  label: PIP/Picture By Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3
    - name: value
      type: integer
      description: Setting value per target

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: 00h=OFF, 01h=ON

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code
    - name: source
      type: integer
      description: 00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER

- id: error_status_request
  label: Error Status Request
  kind: action
  params: []
  description: Gets error information. Returns 12 bytes of bit-mapped error status.

- id: information_request
  label: Information Request
  kind: action
  params: []
  description: Gets projector info including name, lamp time, filter time.

- id: filter_usage_request
  label: Filter Usage Information Request
  kind: action
  params: []
  description: Gets filter usage time and alarm start time.

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: action
  params:
    - name: lamp
      type: integer
      description: 00h=Lamp 1, 01h=Lamp 2
    - name: content
      type: integer
      description: 01h=usage time, 04h=remaining life

- id: carbon_savings_request
  label: Carbon Savings Information Request
  kind: action
  params:
    - name: type
      type: integer
      description: 00h=total, 01h=during operation

- id: lens_control_request
  label: Lens Control Request
  kind: action
  params:
    - name: function
      type: integer
      description: 06h=Periphery Focus

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: action
  params:
    - name: option
      type: integer
      description: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE

- id: lens_profile_request
  label: Lens Profile Request
  kind: action
  params: []
  description: Gets selected profile number of reference lens memory.

- id: lens_information_request
  label: Lens Information Request
  kind: action
  params: []
  description: Gets lens status (memory, zoom, focus, shift operations).

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: action
  params:
    - name: target
      type: integer
      description: 00h=brightness, 01h=contrast, 02h=color, 03h=hue, 04h=sharpness, 05h=volume, 96h=lamp/light

- id: setting_request
  label: Setting Request
  kind: action
  params: []
  description: Gets projector settings (base model type, sound function, clock/sleep timer availability).

- id: running_status_request
  label: Running Status Request
  kind: action
  params: []
  description: Gets power status, cooling state, operation status.

- id: input_status_request
  label: Input Status Request
  kind: action
  params: []
  description: Gets input signal status, signal type, test pattern display state.

- id: mute_status_request
  label: Mute Status Request
  kind: action
  params: []
  description: Gets picture/sound/onscreen mute status.

- id: model_name_request
  label: Model Name Request
  kind: action
  params: []
  description: Gets the model name of the projector.

- id: cover_status_request
  label: Cover Status Request
  kind: action
  params: []
  description: Gets mirror/lens cover status.

- id: information_string_request
  label: Information String Request
  kind: action
  params:
    - name: type
      type: integer
      description: 03h=horizontal sync freq, 04h=vertical sync freq

- id: eco_mode_request
  label: Eco Mode Request
  kind: action
  params: []
  description: Gets eco mode setting.

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: action
  params: []
  description: Gets projector name.

- id: lan_mac_address_request
  label: LAN MAC Address Request
  kind: action
  params: []
  description: Gets MAC address of projector.

- id: pip_pbp_request
  label: PIP/Picture By Picture Request
  kind: action
  params:
    - name: target
      type: integer
      description: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3

- id: edge_blending_request
  label: Edge Blending Mode Request
  kind: action
  params: []
  description: Gets edge blending setting.

- id: base_model_type_request
  label: Base Model Type Request
  kind: action
  params: []
  description: Gets base model type and model name.

- id: serial_number_request
  label: Serial Number Request
  kind: action
  params: []
  description: Gets projector serial number.

- id: basic_information_request
  label: Basic Information Request
  kind: action
  params: []
  description: Gets operation status, signal type, mute states, freeze state.
```

## Feedbacks
```yaml
- id: command_response
  label: Command Response
  kind: feedback
  params:
    - name: error1
      type: integer
      description: ERR1 error code
    - name: error2
      type: integer
      description: ERR2 error code

- id: query_response
  label: Query Response
  kind: feedback
  params: []
  description: Data response for query commands (varies by command)

- id: error_status_response
  label: Error Status
  type: object
  description: 12-byte bit-mapped error status (cover, temp, fan, lamp, power errors)
  properties:
    - data01: Bit0=cover error, Bit1=temp (bi-metallic), Bit3=fan, Bit4=fan, Bit5=power, Bit6=lamp off, Bit7=lamp moratorium
    - data02: Bit0=lamp time exceeded, Bit1=formatter error, Bit2=lamp 2 off
    - data03: Bit1=FPGA error, Bit2=temp sensor, Bit3=lamp not present, Bit4=lamp data error, Bit5=mirror cover, Bit6=lamp 2 moratorium, Bit7=lamp 2 time exceeded
    - data04: Bit0=lamp 2 not present, Bit1=lamp 2 data error, Bit2=temp dust, Bit3=foreign matter, Bit5=ballast comm, Bit6=iris cal, Bit7=lens not installed
    - data09: Bit0=portrait cover up, Bit1=interlock switch open, Bit2=system error (slave CPU), Bit3=system error (formatter)

- id: power_state
  label: Power State
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]

- id: input_status
  label: Input Status
  type: object
  properties:
    - signal_switch: enum [not_executed, in_progress]
    - signal_list_number: integer
    - signal_type_1: integer
    - signal_type_2: integer
    - test_pattern: enum [not_displayed, displayed]
    - content: enum [video_signal, no_signal, viewer, test_pattern, lan_displayed]

- id: mute_status
  label: Mute Status
  type: object
  properties:
    - picture: enum [off, on]
    - sound: enum [off, on]
    - onscreen: enum [off, on]
    - forced_onscreen: enum [off, on]
    - onscreen_display: enum [not_displayed, displayed]
```

## Variables
```yaml
- id: brightness
  label: Brightness
  kind: variable
  type: integer
  range: [0, 255]
  description: Picture brightness adjustment.

- id: contrast
  label: Contrast
  kind: variable
  type: integer
  range: [0, 255]
  description: Picture contrast adjustment.

- id: color
  label: Color
  kind: variable
  type: integer
  range: [0, 255]
  description: Picture color adjustment.

- id: hue
  label: Hue
  kind: variable
  type: integer
  range: [0, 255]
  description: Picture hue adjustment.

- id: sharpness
  label: Sharpness
  kind: variable
  type: integer
  range: [0, 255]
  description: Picture sharpness adjustment.

- id: volume
  label: Volume
  kind: variable
  type: integer
  range: [0, 255]
  description: Sound volume adjustment.

- id: lamp_light_adjust
  label: Lamp/Light Adjust
  kind: variable
  type: integer
  range: [0, 255]
  description: Lamp or light output adjustment.

- id: aspect
  label: Aspect Mode
  kind: variable
  type: enum
  values: [auto, wide_zoom, 16_9, native, 4_3, 15_9, 16_10, letter_box, zoom, wide_screen, full]

- id: lens_position
  label: Lens Position
  kind: variable
  type: integer
  description: Absolute or relative lens position value.

- id: eco_mode
  label: Eco Mode
  kind: variable
  type: enum
  values: [off, normal, eco, auto_eco, long_life, boost, silent]

- id: projector_name
  label: Projector Name
  kind: variable
  type: string
  maxLength: 16

- id: pip_mode
  label: PIP/PBP Mode
  kind: variable
  type: enum
  values: [pip, picture_by_picture, off]

- id: edge_blending
  label: Edge Blending
  kind: variable
  type: enum
  values: [off, on]
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited event notifications from projector
```

## Macros
```yaml
- id: power_on_sequence
  label: Power On Sequence
  description: |
    Send 015. POWER ON command. Wait until command completes before sending any other command.
    During power-on sequence, all other commands are rejected.
    Command: 02h 00h 00h 00h 00h 02h

- id: power_off_sequence
  label: Power Off Sequence
  description: |
    Send 016. POWER OFF command. Wait through cooling time before sending any other command.
    During power-off (including cooling), all other commands are rejected.
    Command: 02h 01h 00h 00h 00h 03h

- id: lens_continuous_drive
  label: Lens Continuous Drive
  description: |
    Send 053. LENS CONTROL with DATA02=7Fh (drive plus) or 81h (drive minus).
    Send 053. LENS CONTROL with DATA02=00h to stop.
    While lens is being driven, same command can be reissued without stop.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Some models require specific standby mode settings to accept commands via serial or LAN. Supported standby modes vary by model - see Appendix "Standby Mode settings" in source.
  - description: During power-on or power-off sequence, no other commands are accepted by the projector.
# UNRESOLVED: safety warnings for lamp replacement, temperature limits, or dust accumulation not found in source
```

## Notes
The protocol uses a binary format with checksum. Command structure: `[HEADER] [MODEL] [CMD] [DATA...] [CKS]` where CKS is low-order byte of sum of all preceding bytes. Query commands use header byte 00h or 03h; control commands use 01h or 02h. Response codes: success=0000h in data; failure returns ERR1/ERR2 codes.

Input terminal and aspect values vary across models. The Appendix in the source document provides hex code mappings but notes some values are model-dependent.

<!-- UNRESOLVED: serial hardware flow control (RTS/CTS) — pins present on DB-9 but no usage documented -->
<!-- UNRESOLVED: HDBaseT standby mode — mentioned as available for some models but not detailed -->
<!-- UNRESOLVED: maximum command rate / inter-command delay not stated in source -->
<!-- UNRESOLVED: response timeout values not documented -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:36:51.524Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:36:51.524Z
matched_actions: 51
action_count: 51
confidence: high
summary: "All 51 spec actions matched exactly to source commands with correct transport parameters verified verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
