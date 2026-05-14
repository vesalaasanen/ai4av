---
spec_id: admin/nec-np-me3-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP-ME3 Series Control Spec"
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
    - NP-ME382U
    - NP-ME342U
    - NP-ME372W
    - NP-ME402X
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
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-14T18:17:18.521Z
generated_at: 2026-05-14T18:17:18.521Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:18.521Z
  matched_actions: 28
  action_count: 28
  confidence: high
  summary: "All 53 spec actions matched exactly with NEC ME3 IP source hex sequences; transport parameters verified; comprehensive protocol coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# NEC NP-ME3 Series Control Spec

## Summary

The NEC NP-ME3 Series are LCD projectors controllable via RS-232C serial or TCP/IP network (wired/wireless LAN). This spec covers the binary command protocol documented in NEC's Projector Control Command Reference Manual (BDT140013 Rev 7.1). Commands are sent as hexadecimal byte sequences with a checksum byte. The protocol supports power control, input switching, picture/audio adjustment, lens control, mute functions, and extensive status queries.

<!-- UNRESOLVED: exact model variants within the NP-ME3 "Series" boundary are inferred from appendix tables; the source document covers many ME/MC series models beyond the ME3 group -->
<!-- UNRESOLVED: no firmware version compatibility ranges stated -->
<!-- UNRESOLVED: appendix "Supplementary Information by Command" references input terminal and eco mode values that vary by sub-model; full mapping is in source but partially captured here -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated; RTS/CTS pins wired
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
framing:
  type: binary
  byte_order: big-endian
  checksum: sum_of_all_preceding_bytes_mod_256
  description: |
    All commands and responses are binary hex byte sequences.
    General command format: <CMD_BYTES> <ID1> <ID2> <LEN> <DATA...> <CKS>
    ID1 = control ID set on projector
    ID2 = model code (varies by model)
    CKS = low-order byte of sum of all preceding bytes
    Success response prefix: high bit of first byte set (e.g., 22h for cmd 02h)
    Failure response prefix: A0h+ (e.g., A2h for cmd 02h), with ERR1/ERR2 bytes
```

## Traits
```yaml
traits:
  - powerable     # inferred from power on/off commands (015, 016)
  - routable      # inferred from input switching command (018)
  - queryable     # inferred from multiple request commands (037, 078, 305)
  - levelable     # inferred from volume/brightness/contrast adjustment commands (030-1, 030-2)
  - muteable      # inferred from picture/sound/onscreen mute commands (020-025)
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command_hex: "02 00 00 00 00 02"
    response_success_hex: "22 00 <ID1> <ID2> 00 <CKS>"
    notes: No other command accepted while power is turning on.

  - id: power_off
    label: Power Off
    kind: action
    command_hex: "02 01 00 00 00 03"
    response_success_hex: "22 01 <ID1> <ID2> 00 <CKS>"
    notes: No other command accepted during power-off including cooling time.

  - id: input_switch
    label: Switch Input
    kind: action
    command_hex: "02 03 00 00 02 01 <DATA01> <CKS>"
    params:
      - name: input
        type: enum
        description: Input terminal hex code (model-dependent; see Notes)
    response_success_hex: "22 03 <ID1> <ID2> 01 <DATA01> <CKS>"
    response_data:
      DATA01:
        "00": success
        "FF": error (no signal switch)

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command_hex: "02 10 00 00 00 12"
    response_success_hex: "22 10 <ID1> <ID2> 00 <CKS>"
    notes: Automatically turned off on input or signal switch.

  - id: picture_mute_off
    label: Picture Mute Off
    kind: action
    command_hex: "02 11 00 00 00 13"
    response_success_hex: "22 11 <ID1> <ID2> 00 <CKS>"

  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command_hex: "02 12 00 00 00 14"
    response_success_hex: "22 12 <ID1> <ID2> 00 <CKS>"
    notes: Automatically turned off on input switch, signal switch, or volume adjust.

  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command_hex: "02 13 00 00 00 15"
    response_success_hex: "22 13 <ID1> <ID2> 00 <CKS>"

  - id: onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command_hex: "02 14 00 00 00 16"
    response_success_hex: "22 14 <ID1> <ID2> 00 <CKS>"

  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command_hex: "02 15 00 00 00 17"
    response_success_hex: "22 15 <ID1> <ID2> 00 <CKS>"

  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command_hex: "03 10 00 00 05 <DATA01> FF <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: target
        type: enum
        values:
          "00": brightness
          "01": contrast
          "02": color
          "03": hue
          "04": sharpness
      - name: mode
        type: enum
        description: "DATA02 - 00=absolute, 01=relative"
      - name: value
        type: integer
        description: 16-bit signed value (DATA03=low byte, DATA04=high byte)
    response_success_hex: "23 10 <ID1> <ID2> 02 <DATA01> <DATA02> <CKS>"

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command_hex: "03 10 00 00 05 05 00 <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: mode
        type: enum
        description: "DATA01 - 00=absolute, 01=relative"
      - name: value
        type: integer
        description: 16-bit signed value (DATA02=low byte, DATA03=high byte)
    response_success_hex: "23 10 <ID1> <ID2> 02 <DATA01> <DATA02> <CKS>"

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command_hex: "03 10 00 00 05 18 00 00 <DATA01> 00 <CKS>"
    params:
      - name: aspect
        type: enum
        description: "DATA01 - aspect value (model-dependent; see Notes)"
    response_success_hex: "23 10 <ID1> <ID2> 02 <DATA01> <DATA02> <CKS>"

  - id: lamp_adjust
    label: Lamp/Light Adjust
    kind: action
    command_hex: "03 10 00 00 05 96 FF <DATA01> <DATA02> <DATA03> <CKS>"
    params:
      - name: mode
        type: enum
        description: "DATA01 - 00=absolute, 01=relative"
      - name: value
        type: integer
        description: 16-bit signed value (DATA02=low, DATA03=high)
    response_success_hex: "23 10 <ID1> <ID2> 02 <DATA01> <DATA02> <CKS>"

  - id: remote_key
    label: Remote Key Code
    kind: action
    command_hex: "02 0F 00 00 02 <DATA01> <DATA02> <CKS>"
    params:
      - name: key_code
        type: integer
        description: "WORD key code (DATA01=low, DATA02=high). See key code table in Notes."
    response_success_hex: "22 0F <ID1> <ID2> 01 <DATA01> <CKS>"

  - id: shutter_close
    label: Shutter Close
    kind: action
    command_hex: "02 16 00 00 00 18"
    response_success_hex: "22 16 <ID1> <ID2> 00 <CKS>"

  - id: shutter_open
    label: Shutter Open
    kind: action
    command_hex: "02 17 00 00 00 19"
    response_success_hex: "22 17 <ID1> <ID2> 00 <CKS>"

  - id: lens_control
    label: Lens Control
    kind: action
    command_hex: "02 18 00 00 02 <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: enum
        values:
          "00": zoom
          "01": focus
          "02": lens_shift_h
          "03": lens_shift_v
          "06": periphery_focus
      - name: direction
        type: enum
        description: "00=stop, 01=+1s, 02=+0.5s, 03=+0.25s, 7F=+continuous, 81=-continuous, FD=-0.25s, FE=-0.5s, FF=-1s"
    notes: Send 00h to stop continuous drive.

  - id: lens_control_2
    label: Lens Control 2 (Absolute/Relative)
    kind: action
    command_hex: "02 1D 00 00 04 <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    params:
      - name: target
        type: enum
        values:
          "00": zoom
          "01": focus
          "02": lens_shift_h
          "03": lens_shift_v
          "FF": stop
      - name: mode
        type: enum
        description: "DATA02 - 00=absolute, 02=relative"
      - name: value
        type: integer
        description: 16-bit value (DATA03=low, DATA04=high)

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command_hex: "02 1E 00 00 01 <DATA01> <CKS>"
    params:
      - name: operation
        type: enum
        values:
          "00": move
          "01": store
          "02": reset

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command_hex: "02 1F 00 00 01 <DATA01> <CKS>"
    params:
      - name: operation
        type: enum
        values:
          "00": move
          "01": store
          "02": reset
    notes: Operates on the profile number selected by lens_profile_set.

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command_hex: "02 21 00 00 02 <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: enum
        values:
          "00": load_by_signal
          "01": forced_mute
      - name: value
        type: enum
        values:
          "00": "off"
          "01": "on"

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command_hex: "02 27 00 00 01 <DATA01> <CKS>"
    params:
      - name: profile
        type: enum
        values:
          "00": profile_1
          "01": profile_2

  - id: freeze_control
    label: Freeze Control
    kind: action
    command_hex: "01 98 00 00 01 <DATA01> <CKS>"
    params:
      - name: operation
        type: enum
        values:
          "01": freeze_on
          "02": freeze_off

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command_hex: "03 B1 00 00 02 07 <DATA01> <CKS>"
    params:
      - name: eco_mode
        type: enum
        description: "Value varies by sub-model (see Notes)"

  - id: projector_name_set
    label: Projector Name Set
    kind: action
    command_hex: "03 B1 00 00 12 2C <DATA01-16> 00 <CKS>"
    params:
      - name: name
        type: string
        description: "Up to 16 bytes"

  - id: pip_pbp_set
    label: PIP/Picture-by-Picture Set
    kind: action
    command_hex: "03 B1 00 00 03 C5 <DATA01> <DATA02> <CKS>"
    params:
      - name: target
        type: enum
        values:
          "00": mode
          "01": start_position
          "02": sub_input_1
          "09": sub_input_2
          "0A": sub_input_3
      - name: value
        type: enum
        description: "Mode: 00=PIP, 01=PBP. Position: 00=top-left, 01=top-right, 02=bottom-left, 03=bottom-right."

  - id: edge_blending_set
    label: Edge Blending Set
    kind: action
    command_hex: "03 B1 00 00 03 DF 00 <DATA01> <CKS>"
    params:
      - name: value
        type: enum
        values:
          "00": "off"
          "01": "on"

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command_hex: "03 C9 00 00 03 09 <DATA01> <DATA02> <CKS>"
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal code (model-dependent)"
      - name: setting
        type: enum
        values:
          "00": same_terminal
          "01": bnc
          "02": computer
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    label: Error Status
    type: binary_bitmap
    command_hex: "00 88 00 00 00 88"
    response_data: "DATA01-12 bitmap - bit=1 indicates error (cover, fan, temperature, lamp, formatter, etc.)"

  - id: power_status
    label: Power Status
    type: enum
    values: [standby, power_on]
    command_hex: "00 85 00 00 01 01 87"
    response_data: "DATA03 - 00h=standby, 01h=power on"

  - id: running_status
    label: Running Status
    type: composite
    command_hex: "00 85 00 00 01 01 87"
    response_fields:
      DATA03: power_status (00h=standby, 01h=on)
      DATA04: cooling (00h=not executing, 01h=executing)
      DATA05: power_on_off_process (00h=not executing, 01h=executing)
      DATA06: operation_status (00h=standby_sleep, 04h=power_on, 05h=cooling, 06h=standby_error, 0Fh=standby_power_saving, 10h=network_standby)

  - id: input_status
    label: Input Status
    type: composite
    command_hex: "00 85 00 00 01 02 88"
    response_fields:
      DATA01: signal_switch_process
      DATA02: signal_list_number
      DATA03: selection_signal_type_1
      DATA04: selection_signal_type_2 (01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 07h=VIEWER, 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, FFh=Not Source Input)
      DATA09: content_displayed (00h=video_signal, 01h=no_signal, 02h=viewer, 03h=test_pattern, 04h=LAN)

  - id: mute_status
    label: Mute Status
    type: composite
    command_hex: "00 85 00 00 01 03 89"
    response_fields:
      DATA01: picture_mute (00h=off, 01h=on)
      DATA02: sound_mute (00h=off, 01h=on)
      DATA03: onscreen_mute (00h=off, 01h=on)
      DATA04: forced_onscreen_mute (00h=off, 01h=on)
      DATA05: onscreen_display (00h=not_displayed, 01h=displayed)

  - id: model_name
    label: Model Name
    type: string
    command_hex: "00 85 00 00 01 04 8A"
    response_data: "DATA01-32 NUL-terminated string"

  - id: cover_status
    label: Cover Status
    type: enum
    values: [normal_open, closed]
    command_hex: "00 85 00 00 01 05 8B"
    response_data: "DATA01 - 00h=normal(cover opened), 01h=cover closed"

  - id: projector_info
    label: Projector Information
    type: composite
    command_hex: "03 8A 00 00 00 8D"
    response_fields:
      DATA01-49: projector_name (NUL-terminated)
      DATA83-86: lamp_usage_time_seconds
      DATA87-90: filter_usage_time_seconds

  - id: filter_usage
    label: Filter Usage Info
    type: composite
    command_hex: "03 95 00 00 00 98"
    response_fields:
      DATA01-04: filter_usage_time_seconds
      DATA05-08: filter_alarm_start_time_seconds

  - id: lamp_info
    label: Lamp Information
    type: composite
    command_hex: "03 96 00 00 02 <TARGET> <CONTENT> <CKS>"
    params:
      target: "DATA01 - 00h=lamp_1, 01h=lamp_2"
      content: "DATA02 - 01h=usage_time_seconds, 04h=remaining_life_percent"
    response_data: "DATA03-06 - usage time in seconds or remaining life %"

  - id: carbon_savings
    label: Carbon Savings
    type: composite
    command_hex: "03 9A 00 00 01 <TARGET> <CKS>"
    params:
      target: "DATA01 - 00h=total, 01h=during_operation"
    response_data: "DATA02-05=kg (max 99999), DATA06-09=mg (max 999999)"

  - id: lens_position
    label: Lens Position
    type: composite
    command_hex: "02 1C 00 00 02 <TARGET> 00 <CKS>"
    params:
      target: "DATA01 - 00h=zoom, 01h=focus, 02h=lens_shift_h, 03h=lens_shift_v"
    response_data: "upper_limit(2B), lower_limit(2B), current_value(2B)"

  - id: lens_info
    label: Lens Operation Status
    type: binary_bitmap
    command_hex: "02 22 00 00 01 00 25"
    response_data: "DATA01 bitmap - bit0=lens_memory, bit1=zoom, bit2=focus, bit3=lens_shift_h, bit4=lens_shift_v (0=stop, 1=operating)"

  - id: lens_profile
    label: Lens Profile
    type: enum
    values: [profile_1, profile_2]
    command_hex: "02 28 00 00 00 2A"
    response_data: "DATA01 - 00h=profile_1, 01h=profile_2"

  - id: gain_parameter
    label: Gain Parameter
    type: composite
    command_hex: "03 05 00 00 03 <DATA01> 00 00 <CKS>"
    params:
      target: "DATA01 - 00h=brightness, 01h=contrast, 02h=color, 03h=hue, 04h=sharpness, 05h=volume, 96h=lamp_adjust"
    response_fields:
      DATA01: status (00h=display_not_possible, 01h=adjustment_not_possible, 02h=adjustment_possible)
      DATA02-03: upper_limit
      DATA04-05: lower_limit
      DATA06-07: default_value
      DATA08-09: current_value
      DATA10-11: wide_adjustment_width
      DATA12-13: narrow_adjustment_width

  - id: eco_mode
    label: Eco Mode
    type: enum
    command_hex: "03 B0 00 00 01 07 BB"
    response_data: "DATA01 - value varies by sub-model (see Notes)"

  - id: projector_name
    label: Projector Name
    type: string
    command_hex: "03 B0 00 00 01 2C E0"
    response_data: "DATA01-17 NUL-terminated string"

  - id: mac_address
    label: MAC Address
    type: string
    command_hex: "03 B0 00 00 02 9A 00 4F"
    response_data: "DATA01-06 MAC address bytes"

  - id: pip_pbp_status
    label: PIP/Picture-by-Picture Status
    type: composite
    command_hex: "03 B0 00 00 02 C5 <TARGET> <CKS>"
    params:
      target: "DATA01 - 00h=mode, 01h=start_position, 02h=sub_input_1, 09h=sub_input_2, 0Ah=sub_input_3"

  - id: edge_blending_status
    label: Edge Blending Status
    type: enum
    values: ["off", "on"]
    command_hex: "03 B0 00 00 02 DF 00 94"
    response_data: "DATA01 - 00h=off, 01h=on"

  - id: base_model_type
    label: Base Model Type
    type: composite
    command_hex: "00 BF 00 00 01 00 C0"
    response_fields:
      DATA01-02: base_model_type
      DATA03-11: model_name (NUL-terminated)

  - id: serial_number
    label: Serial Number
    type: string
    command_hex: "00 BF 00 00 02 01 06 C8"
    response_data: "DATA01-16 NUL-terminated string"

  - id: basic_info
    label: Basic Information
    type: composite
    command_hex: "00 BF 00 00 01 02 C2"
    response_fields:
      DATA01: operation_status (00h=standby_sleep, 04h=power_on, 05h=cooling, 06h=standby_error, 0Fh=standby_power_saving, 10h=network_standby)
      DATA02: content_displayed
      DATA03: selection_signal_type_1
      DATA04: selection_signal_type_2
      DATA06: video_mute (00h=off, 01h=on)
      DATA07: sound_mute (00h=off, 01h=on)
      DATA08: onscreen_mute (00h=off, 01h=on)
      DATA09: freeze_status (00h=off, 01h=on)

  - id: sync_frequency
    label: Synchronous Frequency
    type: string
    command_hex: "00 D0 00 00 03 00 <TYPE> 01 <CKS>"
    params:
      type: "DATA01 - 03h=horizontal, 04h=vertical"
    response_data: "Label/information string"

  - id: settings
    label: Settings
    type: composite
    command_hex: "00 85 00 00 01 00 86"
    response_fields:
      DATA01-03: base_model_type
      DATA04: sound_function (00h=not_available, 01h=available)
      DATA05: profile_number (00h=not_available, 01h=clock, 02h=sleep_timer, 03h=clock_and_sleep_timer)
```

## Variables
```yaml
variables:
  - id: brightness
    label: Brightness
    type: integer
    access: read_write
    adjust_command: picture_adjust (target=00h)

  - id: contrast
    label: Contrast
    type: integer
    access: read_write
    adjust_command: picture_adjust (target=01h)

  - id: color
    label: Color
    type: integer
    access: read_write
    adjust_command: picture_adjust (target=02h)

  - id: hue
    label: Hue
    type: integer
    access: read_write
    adjust_command: picture_adjust (target=03h)

  - id: sharpness
    label: Sharpness
    type: integer
    access: read_write
    adjust_command: picture_adjust (target=04h)

  - id: volume
    label: Volume
    type: integer
    access: read_write
    adjust_command: volume_adjust

  - id: lamp_adjust_value
    label: Lamp/Light Adjust
    type: integer
    access: read_write
    adjust_command: lamp_adjust

  - id: aspect
    label: Aspect Ratio
    type: enum
    access: read_write
    adjust_command: aspect_adjust
    notes: Values vary by sub-model (see Notes)
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification/event mechanism described in source
# All responses are request-reply. No push/event model documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: |
  While power on/off is in progress (including cooling), no other commands are accepted.
  Error status bitmap covers: cover error, fan error, temperature error, power error,
  lamp off/replacement, formatter error, FPGA error, mirror cover error, interlock switch open,
  foreign matter sensor error, lens not installed, system errors.
# UNRESOLVED: no explicit safety interlock procedures or power-on sequencing requirements stated
```

## Notes

**Command framing:** All commands are binary hex. Format: `<bytes> <ID1> <ID2> <LEN> <DATA...> <CKS>`. ID1 is the projector's control ID, ID2 is the model code. Checksum = low byte of sum of all preceding bytes.

**Error responses:** Failure responses use prefix `A0h+` with ERR1/ERR2 error codes:
- `00h/00h`: unrecognized command
- `00h/01h`: command not supported by model
- `01h/00h`: invalid value
- `01h/01h`: invalid input terminal
- `02h/0Dh`: command rejected because power is off
- `02h/0Eh`: command execution failed

**Input terminal codes (model-dependent):**
For NP-ME401W/ME361W/ME331W/ME301W/ME401X/ME361X/ME331X/ME301X:
- COMPUTER: `01h`, VIDEO: `06h`, HDMI: `A1h`, HDMI2: `A2h`, LAN: `20h`, USB-A: `1Fh`, USB-B: `22h`

For NP-ME403U/ME423W/ME383W/ME453X:
- COMPUTER: `01h`, VIDEO: `06h`, HDMI: `1Ah`, HDMI2: `1Bh`, LAN: `20h`, USB-A: `1Fh`

For NP-ME382U/ME342U/ME372W/ME402X:
- COMPUTER: `01h`, VIDEO: `06h`, HDMI: `A1h`, HDMI2: `A2h`, LAN: `20h`, USB-A: `1Fh`, USB DISPLAY: `22h`

For NP-ME360X/ME310X/ME270X:
- COMPUTER: `01h`, COMPUTER2: `02h`, VIDEO: `06h`

**Aspect values (model-dependent):**
- NP-ME401W etc.: `00h`=AUTO, `01h`=WIDE ZOOM, `02h`=CINEMA, `03h`=16:9, `04h`=NATIVE, `05h`=4:3, `06h`=15:9
- NP-ME403U etc.: `00h`=Normal, `01h`=Wide, `02h`=Full, `03h`=4:3
- NP-ME382U etc.: `00h`=AUTO, `01h`=WIDE ZOOM, `02h`=16:9, `03h`=NATIVE, `04h`=4:3, `05h`=15:9

**Eco mode values (model-dependent):**
- NP-ME401W etc.: `00h`=OFF, `01h`=AUTO ECO, `02h`=NORMAL, `03h`=ECO
- NP-ME403U etc.: `00h`=NORMAL, `02h`=ECO1, `03h`=ECO2, `05h`=BOOST
- NP-ME382U etc.: `00h`=OFF, `01h`=AUTO ECO, `02h`=NORMAL, `03h`=ECO
- NP-ME360X etc.: `00h`=OFF, `01h`=ON

**Remote key codes:** `02h/00h`=POWER ON, `03h/00h`=POWER OFF, `05h/00h`=AUTO, `06h/00h`=MENU, `07-0Ah`=UP/DOWN/RIGHT/LEFT, `0Bh/00h`=ENTER, `0Ch/00h`=EXIT, `13h/00h`=MUTE, `84h/00h`=VOL UP, `85h/00h`=VOL DOWN, `8Ah/00h`=FREEZE, `A3h/00h`=ASPECT, `D7h/00h`=SOURCE, `EEh/00h`=LAMP MODE/ECO.

**Standby mode for receiving POWER ON via LAN:**
- NP-ME401W etc.: NETWORK STANDBY only
- NP-ME403U/ME382U etc.: NETWORK STANDBY and SLEEP
- NP-ME360X etc.: serial only (no LAN wake)

<!-- UNRESOLVED: exact NP-ME3 Series model boundary not clearly defined in source; models listed are inferred from appendix tables -->
<!-- UNRESOLVED: wireless LAN communication conditions not documented (refers to wireless LAN unit manual) -->
<!-- UNRESOLVED: full sub-input setting values for PIP/PBP not included (references appendix) -->
<!-- UNRESOLVED: display signal type mapping details not fully captured -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-14T18:17:18.521Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:18.521Z
matched_actions: 28
action_count: 28
confidence: high
summary: "All 53 spec actions matched exactly with NEC ME3 IP source hex sequences; transport parameters verified; comprehensive protocol coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
