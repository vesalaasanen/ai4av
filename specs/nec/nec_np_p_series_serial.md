---
schema_version: ai4av-public-spec-v1
device_id: nec/np-p627ul
entity_id: nec_np_p_series
spec_id: admin/nec-np-p-series
revision: 1
author: admin
title: "NEC NP-P Series Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: NP-P627UL
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - NP-P627UL
    - NP-P547UL
    - NP-P554U
    - NP-P474U
    - NP-P554W
    - NP-P474W
    - NP-P604X
    - NP-P603X
    - NP-P523X
    - NP-PE523X
    - NP-P605UL
    - NP-P525UL
    - NP-P525WL
    - NP-P506QL
    - NP-P502HL
    - NP-P502WL
    - NP-P502H
    - NP-P502W
    - NP-P452H
    - NP-P452W
    - NP-P501X
    - NP-P451X
    - NP-P451W
    - NP-P401W
    - NP-P420X
    - NP-P350X
    - NP-P350W
    - NP-PA1705UL
    - NP-PA1505UL
    - NP-PA1004UL
    - NP-PA804UL
    - NP-PA803UL
    - NP-PA703UL
    - NP-PA653UL
    - NP-PA803U
    - NP-PA723U
    - NP-PA653U
    - NP-PA853W
    - NP-PA703W
    - NP-PA903X
    - NP-PA622U
    - NP-PA522U
    - NP-PA672W
    - NP-PA572W
    - NP-PA722X
    - NP-PA622X
    - NP-PE506UL
    - NP-PE506WL
    - NP-PE501X
    - NP-PE456USL
    - NP-PE456WSL
    - NP-PH1400U
    - NP-PH1202HL
    - NP-PH1002HL
    - NP-PH1000U
    - NP-PV800UL
    - NP-PV730UL
    - NP-PV710UL
    - NP-PX2201UL
    - NP-PX2000UL
    - NP-PX1005QL
    - NP-PX1004UL
    - NP-PX803UL
    - NP-PX750U
    - NP-PX700W
    - NP-PX800X
    - NP-PX651X
    - NP-PX581W
    - NP-PX602UL
    - NP-PX602WL
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_np_p_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:20:08.860Z
retrieved_at: 2026-04-25T21:20:08.860Z
last_checked_at: 2026-04-25T21:20:08.860Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:20:08.860Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions match verbatim command sequences in NEC P-series serial source; transport parameters confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# NEC NP-P Series Control Spec

## Summary
NEC NP-P Series projectors support control via RS-232C serial and TCP/IP (wired LAN) connections. This spec covers the binary command protocol used to control power, input switching, picture/sound/onscreen mute, volume, lens adjustment, and query device status. Commands are sent as hexadecimal byte sequences with a checksum. Over 50 commands are documented, with model-specific support indicated in the source's Supported Command List appendix.

<!-- UNRESOLVED: exact list of all compatible models is extensive; the source covers NP4100 through NP-VE303X series; only NP-P and related series are listed above as primary targets -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200, 38400, 19200, 9600, 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated beyond RTS/CTS pin wiring
addressing:
  port: 7142  # TCP port for LAN connection
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # inferred from power on/off commands
  - routable      # inferred from input switching commands
  - queryable     # inferred from status request commands
  - levelable     # inferred from volume, brightness, contrast, etc. adjust commands
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command_hex: "02 00 00 00 00 02"
    description: "Turns on the projector. No other commands accepted during power-on sequence."
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command_hex: "02 01 00 00 00 03"
    description: "Turns off the projector. No other commands accepted during cooling."
    params: []

  - id: input_switch
    label: Switch Input
    kind: action
    command_hex: "02 03 00 00 02 01 <DATA01> <CKS>"
    description: "Switches the input terminal or entry list."
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal hex code (model-specific, e.g. 01h=COMPUTER, 06h=VIDEO, A1h=HDMI, A2h=HDMI2, A6h=DisplayPort, BFh=HDBaseT, 1Fh=VIEWER/USB-A)"

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command_hex: "02 10 00 00 00 12"
    description: "Turns picture mute on. Auto-released on input/signal switch."
    params: []

  - id: picture_mute_off
    label: Picture Mute Off
    kind: action
    command_hex: "02 11 00 00 00 13"
    description: "Turns picture mute off."
    params: []

  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command_hex: "02 12 00 00 00 14"
    description: "Turns sound mute on. Auto-released on input switch, signal switch, or volume adjust."
    params: []

  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command_hex: "02 13 00 00 00 15"
    description: "Turns sound mute off."
    params: []

  - id: onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command_hex: "02 14 00 00 00 16"
    description: "Turns onscreen mute on. Auto-released on input/signal switch."
    params: []

  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command_hex: "02 15 00 00 00 17"
    description: "Turns onscreen mute off."
    params: []

  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command_hex: "03 10 00 00 05 <DATA01> FF <DATA02> <DATA03> <DATA04> <CKS>"
    description: "Adjusts picture parameters (brightness, contrast, color, hue, sharpness)."
    params:
      - name: target
        type: integer
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: integer
        description: "00h=absolute, 01h=relative"
      - name: value
        type: integer
        description: "16-bit signed value (low byte, high byte)"

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command_hex: "03 10 00 00 05 05 00 <DATA01> <DATA02> <DATA03> <CKS>"
    description: "Adjusts sound volume."
    params:
      - name: mode
        type: integer
        description: "00h=absolute, 01h=relative"
      - name: value
        type: integer
        description: "16-bit signed value (low byte, high byte)"

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command_hex: "03 10 00 00 05 18 00 00 <DATA01> 00 <CKS>"
    description: "Sets the aspect ratio."
    params:
      - name: aspect
        type: integer
        description: "Aspect value (model-specific, e.g. 00h=AUTO, 03h=16:9, 04h=NATIVE, 05h=4:3)"

  - id: lamp_adjust
    label: Lamp/Light Adjust
    kind: action
    command_hex: "03 10 00 00 05 96 FF <DATA03> <DATA04> <DATA05> <CKS>"
    description: "Adjusts lamp/light output."
    params:
      - name: mode
        type: integer
        description: "00h=absolute, 01h=relative"
      - name: value
        type: integer
        description: "16-bit signed value (low byte, high byte)"

  - id: freeze_control
    label: Freeze Control
    kind: action
    command_hex: "01 98 00 00 01 <DATA01> <CKS>"
    description: "Controls the freeze function."
    params:
      - name: operation
        type: integer
        description: "01h=freeze on, 02h=freeze off"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command_hex: "02 0F 00 00 02 <DATA01> <DATA02> <CKS>"
    description: "Sends a remote control key code."
    params:
      - name: key_code
        type: integer
        description: "WORD key code (e.g. 0200h=POWER ON, 0300h=POWER OFF, 0500h=AUTO, 0600h=MENU, 13200h=VOLUME UP, 13300h=VOLUME DOWN, 13800h=FREEZE)"

  - id: shutter_close
    label: Shutter Close
    kind: action
    command_hex: "02 16 00 00 00 18"
    description: "Closes the lens shutter."
    params: []

  - id: shutter_open
    label: Shutter Open
    kind: action
    command_hex: "02 17 00 00 00 19"
    description: "Opens the lens shutter."
    params: []

  - id: lens_control
    label: Lens Control
    kind: action
    command_hex: "02 18 00 00 02 <DATA01> <DATA02> <CKS>"
    description: "Adjusts lens position (zoom, focus, lens shift)."
    params:
      - name: target
        type: integer
        description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V, 06h=Periphery Focus"
      - name: content
        type: integer
        description: "00h=Stop, 01h=drive plus 1s, 02h=plus 0.5s, 03h=plus 0.25s, 7Fh=plus continuous, 81h=minus continuous, FDh=minus 0.25s, FEh=minus 0.5s, FFh=minus 1s"

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command_hex: "02 1D 00 00 04 <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    description: "Adjusts lens position with absolute/relative values."
    params:
      - name: target
        type: integer
        description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V, FFh=Stop"
      - name: mode
        type: integer
        description: "00h=absolute, 02h=relative"
      - name: value
        type: integer
        description: "16-bit adjustment value (low byte, high byte)"

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command_hex: "02 1E 00 00 01 <DATA01> <CKS>"
    description: "Controls the lens memory."
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command_hex: "02 1F 00 00 01 <DATA01> <CKS>"
    description: "Controls the reference lens memory."
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command_hex: "02 21 00 00 02 <DATA01> <DATA02> <CKS>"
    description: "Sets lens memory options."
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
    command_hex: "02 27 00 00 01 <DATA01> <CKS>"
    description: "Selects the reference lens memory profile."
    params:
      - name: profile
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command_hex: "03 B1 00 00 02 07 <DATA01> <CKS>"
    description: "Sets the eco/lamp mode."
    params:
      - name: eco_mode
        type: integer
        description: "Value varies by model (see supplementary tables)"

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command_hex: "03 B1 00 00 12 2C <DATA01-16> 00 <CKS>"
    description: "Sets the projector name (up to 16 bytes)."
    params:
      - name: name
        type: string
        description: "Projector name up to 16 bytes"

  - id: pip_picture_by_picture_set
    label: PIP/Picture by Picture Set
    kind: action
    command_hex: "03 B1 00 00 03 C5 <DATA01> <DATA02> <CKS>"
    description: "Sets PIP or picture-by-picture mode."
    params:
      - name: target
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT"
      - name: value
        type: integer
        description: "Mode-specific value"

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command_hex: "03 B1 00 00 03 DF 00 <DATA01> <CKS>"
    description: "Sets edge blending on/off."
    params:
      - name: value
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command_hex: "03 C9 00 00 03 09 <DATA01> <DATA02> <CKS>"
    description: "Sets the audio input selection."
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal code"
      - name: audio_source
        type: integer
        description: "00h=same as terminal, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    label: Error Status
    command_hex: "00 88 00 00 00 88"
    response_data: "DATA01-DATA12"
    description: "Returns error information as bit flags (cover error, fan error, temperature error, lamp errors, etc.)"

  - id: power_status
    label: Power Status
    description: "Queried via 078-2 RUNNING STATUS REQUEST or 305-3 BASIC INFORMATION REQUEST"
    values:
      - "00h: Standby (Sleep)"
      - "04h: Power on"
      - "05h: Cooling"
      - "06h: Standby (error)"
      - "0Fh: Standby (Power saving)"
      - "10h: Network standby"

  - id: running_status
    label: Running Status
    command_hex: "00 85 00 00 01 01 87"
    response_data: "DATA01-DATA16"
    description: "Returns power status, cooling status, power on/off process, and operation status."

  - id: input_status
    label: Input Status
    command_hex: "00 85 00 00 01 02 88"
    response_data: "DATA01-DATA16"
    description: "Returns current input signal type, signal list number, and display content."

  - id: mute_status
    label: Mute Status
    command_hex: "00 85 00 00 01 03 89"
    response_data: "DATA01-DATA06"
    description: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, and OSD status."
    values:
      - "00h: Off"
      - "01h: On"
      - "FFh: Not supported"

  - id: model_name
    label: Model Name
    command_hex: "00 85 00 00 01 04 8A"
    response_data: "DATA01-DATA32"
    description: "Returns the projector model name as NUL-terminated string."

  - id: cover_status
    label: Cover Status
    command_hex: "00 85 00 00 01 05 8B"
    response_data: "DATA01"
    description: "Returns mirror cover or lens cover status."
    values:
      - "00h: Normal (cover opened)"
      - "01h: Cover closed"

  - id: projector_information
    label: Projector Information
    command_hex: "03 8A 00 00 00 8D"
    response_data: "DATA01-DATA98"
    description: "Returns projector name, lamp usage time (seconds), filter usage time (seconds)."

  - id: filter_usage
    label: Filter Usage Information
    command_hex: "03 95 00 00 00 98"
    response_data: "DATA01-DATA08"
    description: "Returns filter usage time (seconds) and filter alarm start time (seconds). Returns -1 if undefined."

  - id: lamp_information
    label: Lamp Information
    command_hex: "03 96 00 00 02 <DATA01> <DATA02> <CKS>"
    response_data: "DATA01-DATA06"
    description: "Returns lamp usage time (seconds) or remaining life (%)."
    params:
      - name: target
        type: integer
        description: "00h=Lamp 1, 01h=Lamp 2"
      - name: content
        type: integer
        description: "01h=usage time (seconds), 04h=remaining life (%)"

  - id: carbon_savings
    label: Carbon Savings Information
    command_hex: "03 9A 00 00 01 <DATA01> <CKS>"
    response_data: "DATA01-DATA09"
    description: "Returns carbon savings in kg and mg."

  - id: gain_parameter
    label: Gain Parameter
    command_hex: "03 05 00 00 03 <DATA01> 00 00 <CKS>"
    response_data: "DATA01-DATA16"
    description: "Returns current value, upper/lower limits, default, and adjustment widths for a given parameter."
    params:
      - name: parameter
        type: integer
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp Adjust"

  - id: lens_control_request
    label: Lens Position
    command_hex: "02 1C 00 00 02 <DATA01> 00 <CKS>"
    response_data: "DATA01-DATA07"
    description: "Returns upper limit, lower limit, and current value for lens position."
    params:
      - name: target
        type: integer
        description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V"

  - id: lens_information
    label: Lens Information
    command_hex: "02 22 00 00 01 00 25"
    response_data: "DATA01"
    description: "Returns lens motor operation status as bit flags (zoom, focus, lens shift H/V, lens memory)."

  - id: lens_memory_option
    label: Lens Memory Option
    command_hex: "02 20 00 00 01 <DATA01> <CKS>"
    response_data: "DATA01-DATA02"
    description: "Returns LOAD BY SIGNAL or FORCED MUTE setting."

  - id: lens_profile
    label: Lens Profile
    command_hex: "02 28 00 00 00 2A"
    response_data: "DATA01-DATA02"
    description: "Returns selected reference lens memory profile number."

  - id: setting_request
    label: Setting Request
    command_hex: "00 85 00 00 01 00 86"
    response_data: "DATA01-DATA32"
    description: "Returns base model type, sound function, and profile number."

  - id: information_string
    label: Information String
    command_hex: "00 D0 00 00 03 00 <DATA01> 01 <CKS>"
    response_data: "Variable length"
    description: "Returns horizontal or vertical sync frequency strings."
    params:
      - name: info_type
        type: integer
        description: "03h=horizontal sync frequency, 04h=vertical sync frequency"

  - id: eco_mode
    label: Eco Mode
    command_hex: "03 B0 00 00 01 07 BB"
    response_data: "DATA01"
    description: "Returns current eco/lamp mode setting."

  - id: lan_projector_name
    label: LAN Projector Name
    command_hex: "03 B0 00 00 01 2C E0"
    response_data: "DATA01-DATA17"
    description: "Returns the projector name (NUL-terminated string)."

  - id: mac_address
    label: MAC Address
    command_hex: "03 B0 00 00 02 9A 00 4F"
    response_data: "DATA01-DATA06"
    description: "Returns the projector MAC address."

  - id: pip_pbp_status
    label: PIP/Picture by Picture Status
    command_hex: "03 B0 00 00 02 C5 <DATA01> <CKS>"
    response_data: "DATA01-DATA02"
    description: "Returns PIP/PbP mode, start position, or sub-input setting."

  - id: edge_blending_status
    label: Edge Blending Status
    command_hex: "03 B0 00 00 02 DF 00 94"
    response_data: "DATA01"
    description: "Returns edge blending on/off."
    values:
      - "00h: OFF"
      - "01h: ON"

  - id: base_model_type
    label: Base Model Type
    command_hex: "00 BF 00 00 01 00 C0"
    response_data: "DATA01-DATA15"
    description: "Returns base model type codes and model name string."

  - id: serial_number
    label: Serial Number
    command_hex: "00 BF 00 00 02 01 06 C8"
    response_data: "DATA01-DATA16"
    description: "Returns serial number as NUL-terminated string."

  - id: basic_information
    label: Basic Information
    command_hex: "00 BF 00 00 01 02 C2"
    response_data: "DATA01-DATA15"
    description: "Returns operation status, content displayed, signal types, mute states, and freeze status."
```

## Variables
```yaml
variables:
  - id: volume
    label: Volume
    type: integer
    writable: true
    description: "Sound volume level, adjustable via 030-2 VOLUME ADJUST."

  - id: brightness
    label: Brightness
    type: integer
    writable: true
    description: "Picture brightness, adjustable via 030-1 PICTURE ADJUST (target 00h)."

  - id: contrast
    label: Contrast
    type: integer
    writable: true
    description: "Picture contrast, adjustable via 030-1 PICTURE ADJUST (target 01h)."

  - id: color
    label: Color
    type: integer
    writable: true
    description: "Picture color, adjustable via 030-1 PICTURE ADJUST (target 02h)."

  - id: hue
    label: Hue
    type: integer
    writable: true
    description: "Picture hue, adjustable via 030-1 PICTURE ADJUST (target 03h)."

  - id: sharpness
    label: Sharpness
    type: integer
    writable: true
    description: "Picture sharpness, adjustable via 030-1 PICTURE ADJUST (target 04h)."

  - id: lamp_output
    label: Lamp/Light Output
    type: integer
    writable: true
    description: "Lamp adjust / light adjust, adjustable via 030-15 OTHER ADJUST."

  - id: lamp_usage_time
    label: Lamp Usage Time
    type: integer
    writable: false
    unit: seconds
    description: "Queried via 037 INFORMATION REQUEST or 037-4 LAMP INFORMATION REQUEST 3."

  - id: filter_usage_time
    label: Filter Usage Time
    type: integer
    writable: false
    unit: seconds
    description: "Queried via 037-3 FILTER USAGE INFORMATION REQUEST."

  - id: lamp_remaining_life
    label: Lamp Remaining Life
    type: integer
    writable: false
    unit: percent
    description: "Queried via 037-4 LAMP INFORMATION REQUEST 3 (content 04h). Negative if replacement deadline exceeded."

  - id: eco_mode
    label: Eco Mode
    type: integer
    writable: true
    description: "Eco/lamp mode setting, queried/set via 097-8/098-8. Values vary by model."
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: >
  While powering on or off (including cooling period), no other commands can be accepted.
  The error status request (009) provides interlock-relevant data: cover error, temperature
  error, fan error, lamp errors, interlock switch status (DATA09 Bit1), and foreign matter
  sensor error. These are query-only; the source does not describe automatic interlock
  behavior beyond command rejection during power transitions.
# UNRESOLVED: no explicit safety interlock procedures or power-on sequencing requirements documented
```

## Notes
- Binary protocol: all commands and responses are hexadecimal byte sequences with a trailing checksum byte (low-order 8 bits of the sum of all preceding bytes).
- Commands include model-specific parameters ID1 (control ID) and ID2 (model code) in responses.
- Error responses return ERR1 and ERR2 codes; see error code table in source for details.
- Command support varies significantly by model; consult the "Supported Command List" appendix in the source for per-model availability.
- Input terminal codes are model-specific; consult the "Supplementary Information by Command" appendix.
- Some models cannot receive commands in standby mode; see "Standby Mode setting for receiving commands" appendix.
- Lens control continuous drive (7Fh/81h) requires sending 00h to stop.
- Picture mute and sound mute are auto-released on input switch or signal switch.
- Lamp usage time is updated at one-minute intervals despite being reported in seconds.

<!-- UNRESOLVED: exact control ID and model code values for each projector model not specified in source -->
<!-- UNRESOLVED: no warm-up or cooldown timing values specified -->
<!-- UNRESOLVED: LAN connection parameters beyond TCP port 7142 not specified -->
<!-- UNRESOLVED: no notification/subscription mechanism for unsolicited status updates -->
<!-- UNRESOLVED: eco mode values are model-specific and require supplementary lookup tables -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_np_p_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:20:08.860Z
retrieved_at: 2026-04-25T21:20:08.860Z
last_checked_at: 2026-04-25T21:20:08.860Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:20:08.860Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions match verbatim command sequences in NEC P-series serial source; transport parameters confirmed."
```

## Known Gaps

```yaml
[]
```
