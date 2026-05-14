---
spec_id: admin/nec-ht_1000
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC HT-1000 Control Spec"
manufacturer: NEC
model_family: BDT140013
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - BDT140013
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-26T20:47:04.830Z
generated_at: 2026-04-26T20:47:04.830Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-26T20:47:04.830Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions matched to source commands with correct semantics; transport parameters verified; source fully represented in spec."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# NEC HT-1000 Control Spec

## Summary
NEC projector supporting both serial (RS-232C) and TCP/IP network control on port 7142. Supports power control, input routing, picture/sound muting, lens control, and queryable status information via a hexadecimal command protocol with checksum validation.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced for input terminal values and aspect values not included in source text -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number '7142'"
serial:
  baud_rate: 115200  # stated: "115200/38400/19200/9600/4800 bps" - auto-select supported
  data_bits: 8       # stated: "8 bits"
  parity: none       # stated: "None"
  stop_bits: 1       # stated: "1 bit"
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Inferred from command examples:
# - powerable: POWER ON (015) and POWER OFF (016) commands present
# - routable: INPUT SW CHANGE (018) command present
# - queryable: INFORMATION REQUEST, STATUS REQUEST, INPUT STATUS REQUEST, etc. present
# - levelable: PICTURE ADJUST (030-1), VOLUME ADJUST (030-2), ASPECT ADJUST (030-12) present
```

## Actions
```yaml
# 009. ERROR STATUS REQUEST - Gets error information
- id: error_status_request
  label: Error Status Request
  kind: action
  params: []

# 015. POWER ON - Turns on projector power
- id: power_on
  label: Power On
  kind: action
  params: []
  note: "No other command accepted while power is turning on."

# 016. POWER OFF - Turns off projector power
- id: power_off
  label: Power Off
  kind: action
  params: []
  note: "No other command accepted during cooling time."

# 018. INPUT SW CHANGE - Switches input terminal or entry list
- id: input_sw_change
  label: Input Switch
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value (see Appendix in source)

# 020. PICTURE MUTE ON
- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  note: "Cleared by input terminal switch or video signal switch."

# 021. PICTURE MUTE OFF
- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

# 022. SOUND MUTE ON
- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  note: "Cleared by input switch, video signal switch, or volume adjustment."

# 023. SOUND MUTE OFF
- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

# 024. ONSCREEN MUTE ON
- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  note: "Cleared by input terminal switch or video signal switch."

# 025. ONSCREEN MUTE OFF
- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []

# 030-1. PICTURE ADJUST
- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: |
        00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: "16-bit signed adjustment value"

# 030-2. VOLUME ADJUST
- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: "16-bit signed adjustment value"

# 030-12. ASPECT ADJUST
- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect_value
      type: integer
      description: "See Appendix in source for valid values."

# 030-15. OTHER ADJUST - LAMP ADJUST / LIGHT ADJUST
- id: lamp_light_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h = LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: "16-bit signed adjustment value"

# 050. REMOTE KEY CODE
- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: |
        Key code (WORD type):
        02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU,
        07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER,
        0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN,
        13h=MUTE, 29h=PICTURE, 4Ch=COMPUTER2, 4Fh=VIDEO1,
        51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN,
        8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO

# 051. SHUTTER CLOSE
- id: shutter_close
  label: Shutter Close
  kind: action
  params: []

# 052. SHUTTER OPEN
- id: shutter_open
  label: Shutter Open
  kind: action
  params: []

# 053. LENS CONTROL
- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: target
      type: integer
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: |
        00h=Stop, 01h=Drive +1s, 02h=Drive +0.5s, 03h=Drive +0.25s,
        7Fh=Drive+, 81h=Drive-, FDh=Drive -0.25s, FEh=Drive -0.5s, FFh=Drive -1s

# 053-2. LENS CONTROL 2
- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=Absolute value, 02h=Relative value"
    - name: value
      type: integer
      description: "16-bit position value"

# 053-3. LENS MEMORY CONTROL
- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

# 053-4. REFERENCE LENS MEMORY CONTROL
- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

# 053-6. LENS MEMORY OPTION SET
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

# 053-10. LENS PROFILE SET
- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile_number
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

# 079. FREEZE CONTROL
- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: freeze
      type: integer
      description: "01h=On, 02h=Off"

# 097-8. ECO MODE SET
- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode_value
      type: integer
      description: "Eco mode value (see Appendix in source)"

# 097-45. LAN PROJECTOR NAME SET
- id: projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)"

# 097-198. PIP/PICTURE BY PICTURE SET
- id: pip_pbp_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "Setting value (see source for valid values per target)"

# 097-243-1. EDGE BLENDING MODE SET
- id: edge_blending_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=ON"

# 319-10. AUDIO SELECT SET
- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal value (see Appendix in source)"
    - name: setting
      type: integer
      description: "00h=Terminal in DATA01, 02h=COMPUTER, 01h=BNC"
- id: information_request
  label: Information Request
  kind: query
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  params:
    - name: lamp_number
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2 (Lamp 2 effective only for two-lamp models)"
    - name: content
      type: integer
      description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  params:
    - name: type
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: target
      type: integer
      description: "06h=Periphery Focus"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_information_request
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
    - name: adjusted_value_name
      type: integer
      description: "00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"

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

- id: information_string_request
  label: Information String Request
  kind: query
  params:
    - name: information_type
      type: integer
      description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  params: []

- id: pip_pbp_request
  label: PIP/Picture by Picture Request
  kind: query
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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

- id: basic_information_request
  label: Basic Information Request
  kind: query
  params: []
```

## Feedbacks
```yaml
# Response format: A0h/A1h/A2h/A3h <ID1> <ID2> <LEN> [<DATA...] <ERR1> <ERR2> <CKS>
# ERR1/ERR2 error codes:
#   00h 00h = Command not recognized
#   00h 01h = Command not supported
#   01h 00h = Invalid value
#   01h 01h = Invalid input terminal
#   01h 02h = Invalid language
#   02h 00h = Memory allocation error
#   02h 02h = Memory in use
#   02h 03h = Value cannot be set
#   02h 04h = Forced onscreen mute on
#   02h 06h = Viewer error
#   02h 07h = No signal
#   02h 08h = Test pattern or filter displayed
#   02h 09h = No PC card inserted
#   02h 0Ah = Memory operation error
#   02h 0Ch = Entry list displayed
#   02h 0Dh = Command cannot be accepted (power off)
#   02h 0Eh = Command execution failed
#   02h 0Fh = No authority for operation
#   03h 00h = Incorrect gain number
#   03h 01h = Invalid gain
#   03h 02h = Adjustment failed

- id: error_status_response
  label: Error Status Response
  type: bitfield
  values:
    - DATA01: Bit0=Cover error, Bit1=Temperature error, Bit3=Fan error, Bit4=Fan error, Bit5=Power error, Bit6=Lamp off, Bit7=Lamp replacement moratorium
    - DATA02: Bit0=Lamp usage exceeded, Bit1=Formatter error, Bit2=Lamp 2 off, Bit7=Extended status
    - DATA03: Bit1=FPGA error, Bit2=Temperature sensor error, Bit3=Lamp not present, Bit4=Lamp data error, Bit5=Mirror cover error, Bit6=Lamp 2 moratorium, Bit7=Lamp 2 usage exceeded
    - DATA04: Bit0=Lamp 2 not present, Bit1=Lamp 2 data error, Bit2=Dust temperature error, Bit3=Foreign matter sensor, Bit7=Lens not installed
    - DATA09: Bit0=Portrait cover side up, Bit1=Interlock switch open, Bit2=System error (Slave CPU), Bit3=System error (Formatter)

- id: power_state
  label: Power State
  type: enum
  values:
    - "00h: Standby"
    - "01h: Power on"
    - "05h: Cooling"
    - "06h: Standby (error)"
    - "0Fh: Standby (Power saving)"
    - "10h: Network standby"

- id: input_status
  label: Input Status
  type: object
  properties:
    - name: signal_switch_process
      type: enum
      values: ["00h=Not executed", "01h=During execution", "FFh=Not supported"]
    - name: signal_list_number
      type: integer
      description: "0-199, add 1 to get practical number"
    - name: signal_type
      type: enum
      values: ["01h-05h=Signal types 1-5", "20h=DVI-D", "21h=HDMI", "22h=DisplayPort", "23h=VIEWER(6-10)", "FFh=No source"]
    - name: content_displayed
      type: enum
      values: ["00h=Video signal", "01h=No signal", "02h=Viewer", "03h=Test pattern", "04h=LAN displayed"]

- id: mute_status
  label: Mute Status
  type: object
  properties:
    - name: picture_mute
      type: enum
      values: ["00h=Off", "01h=On"]
    - name: sound_mute
      type: enum
      values: ["00h=Off", "01h=On"]
    - name: onscreen_mute
      type: enum
      values: ["00h=Off", "01h=On"]
    - name: forced_onscreen_mute
      type: enum
      values: ["00h=Off", "01h=On"]

- id: model_name_response
  label: Model Name Response
  type: string
  description: "Up to 32 bytes, NUL-terminated"

- id: serial_number_response
  label: Serial Number Response
  type: string
  description: "Up to 16 bytes, NUL-terminated"

- id: cover_status
  label: Cover Status
  type: enum
  values: ["00h=Normal (opened)", "01h=Cover closed"]

- id: eco_mode_response
  label: Eco Mode Response
  type: integer
  description: "Value set for eco mode (see Appendix in source)"

- id: projector_name_response
  label: Projector Name Response
  type: string
  description: "Up to 17 bytes, NUL-terminated"

- id: mac_address_response
  label: MAC Address Response
  type: string
  description: "6-byte MAC address"

- id: lamp_info_response
  label: Lamp Information Response
  type: object
  properties:
    - name: lamp_number
      type: enum
      values: ["00h=Lamp 1", "01h=Lamp 2"]
    - name: usage_time_seconds
      type: integer
      description: "Lamp usage time in seconds (updated at 1-minute intervals)"
    - name: remaining_life_percent
      type: integer
      description: "Remaining life percentage; negative if replacement deadline exceeded"

- id: filter_info_response
  label: Filter Usage Information Response
  type: object
  properties:
    - name: filter_usage_seconds
      type: integer
    - name: filter_alarm_start_seconds
      type: integer
      description: "Returns -1 if not defined"

- id: carbon_savings_response
  label: Carbon Savings Response
  type: object
  properties:
    - name: type
      type: enum
      values: ["00h=Total Carbon Savings", "01h=Carbon Savings during operation"]
    - name: carbon_kg
      type: number
      description: "Maximum 99999 kg"
    - name: carbon_mg
      type: number
      description: "Maximum 999999 mg"
```

## Variables
```yaml
# UNRESOLVED: This device uses action-based commands with parameters rather than
# standalone settable variables. All adjustments (brightness, volume, aspect, etc.)
# are handled via multi-parameter action commands documented in Actions above.
```

## Events
```yaml
# UNRESOLVED: No unsolicited event notifications described in source.
# The device only responds to commands; it does not initiate status updates.
```

## Macros
```yaml
# UNRESOLVED: No multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: No safety warnings, interlock procedures, or power-on sequencing
# requirements stated in source.
```

## Notes
- Command format: `20h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>` for requests; responses use prefix `A0h/A1h/A2h/A3h` depending on command class
- All multi-byte values use low-order byte first (little-endian)
- Checksum (CKS): low-order byte of sum of all preceding bytes
- Some commands (POWER ON, POWER OFF) block other commands during execution — wait for response before sending next command
- Lens control: after sending 7Fh or 81h, sending 00h stops driving
- Input terminal values and aspect values require Appendix "Supplementary Information by Command" which is not included in this source text
- Lamp usage time and filter usage time update at 1-minute intervals despite being queryable in 1-second resolution
<!-- UNRESOLVED: Appendix data for input terminal codes, aspect values, eco mode values, and sub input values not available in source -->
<!-- UNRESOLVED: Wireless LAN unit-specific documentation not included; requires separate manual -->
<!-- UNRESOLVED: Specific model compatibility (HT-1000 vs BDT140013 relationship) not clarified in source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-26T20:47:04.830Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T20:47:04.830Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions matched to source commands with correct semantics; transport parameters verified; source fully represented in spec."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
