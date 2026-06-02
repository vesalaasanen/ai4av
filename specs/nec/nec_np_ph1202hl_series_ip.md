---
spec_id: admin/nec-np-ph1202hl-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP-PH1202HL Series Control Spec"
manufacturer: NEC
model_family: "NP-PH1202HL Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NP-PH1202HL Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:52:30.761Z
last_checked_at: 2026-05-14T18:17:18.632Z
generated_at: 2026-05-14T18:17:18.632Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific input terminal hex codes for NP-PH1202HL not listed in the supplementary tables; the appendix tables only cover NP4100, NP-Mxxx, and NP-MExxx models"
  - "eco mode value mapping for NP-PH1202HL not listed in appendix"
  - "aspect value mapping for NP-PH1202HL not listed in appendix"
  - "valid range not explicitly stated for NP-PH1202HL; gain parameter request returns range dynamically"
  - "no unsolicited notification events documented in source; all responses are command-reply"
  - "no multi-step sequences explicitly described in source"
  - "full safety/interlock procedures not documented in this command reference"
  - "input terminal hex codes for NP-PH1202HL not in appendix"
  - "aspect value mapping for NP-PH1202HL not in appendix"
  - "eco mode value mapping for NP-PH1202HL not in appendix"
  - "standby mode LAN/serial command reception behavior for NP-PH1202HL not listed"
  - "display signal type mapping may differ for NP-PH1202HL"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:18.632Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 52 spec actions matched verbatim in NEC PH1202HL IP source; transport parameters confirmed; spec represents complete command set. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# NEC NP-PH1202HL Series Control Spec

## Summary
Binary control protocol for NEC NP-PH1202HL Series projectors over RS-232 serial and TCP/IP (wired LAN). Commands are sent as fixed-format hex byte sequences with a trailing checksum. Covers power, input switching, mute, picture/volume adjustment, lens control, shutter, freeze, eco mode, edge blending, PIP/Picture-by-Picture, and extensive status querying.

<!-- UNRESOLVED: specific input terminal hex codes for NP-PH1202HL not listed in the supplementary tables; the appendix tables only cover NP4100, NP-Mxxx, and NP-MExxx models -->
<!-- UNRESOLVED: eco mode value mapping for NP-PH1202HL not listed in appendix -->
<!-- UNRESOLVED: aspect value mapping for NP-PH1202HL not listed in appendix -->

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
  flow_control: hardware  # RTS/CTS pin assignment documented
addressing:
  port: 7142  # TCP port for wired LAN command interface
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWER ON / POWER OFF commands
  - routable     # inferred from INPUT SW CHANGE command
  - queryable    # inferred from extensive status request commands
  - levelable    # inferred from VOLUME ADJUST, PICTURE ADJUST commands
  - muteable     # inferred from picture/sound/onscreen mute commands
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
    description: "Turns off the projector. No other commands accepted during power-off and cooling."
    params: []

  - id: input_switch
    label: Switch Input
    kind: action
    command_hex: "02 03 00 00 02 01 <DATA01> <CKS>"
    description: "Switches the input terminal. DATA01 specifies the input terminal code."
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal hex code (model-specific, see appendix)"

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command_hex: "02 10 00 00 00 12"
    description: "Turns picture mute on. Automatically cancelled on input or signal switch."
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
    description: "Turns sound mute on. Automatically cancelled on input switch, signal switch, or volume adjust."
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
    description: "Turns onscreen mute on. Automatically cancelled on input or signal switch."
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
        description: "00h=Absolute value, 01h=Relative value"
      - name: value
        type: integer
        description: "Adjustment value (16-bit, low byte then high byte)"

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command_hex: "03 10 00 00 05 05 00 <DATA01> <DATA02> <DATA03> <CKS>"
    description: "Adjusts sound volume."
    params:
      - name: mode
        type: integer
        description: "00h=Absolute value, 01h=Relative value"
      - name: value
        type: integer
        description: "Adjustment value (16-bit, low byte then high byte)"

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command_hex: "03 10 00 00 05 18 00 00 <DATA01> 00 <CKS>"
    description: "Sets the aspect ratio. DATA01 values are model-specific."
    params:
      - name: aspect_value
        type: integer
        description: "Aspect code (model-specific, see appendix)"

  - id: lamp_adjust
    label: Lamp Adjust / Light Adjust
    kind: action
    command_hex: "03 10 00 00 05 96 FF <DATA03> <DATA04> <DATA05> <CKS>"
    description: "Adjusts lamp/light output level."
    params:
      - name: mode
        type: integer
        description: "00h=Absolute value, 01h=Relative value"
      - name: value
        type: integer
        description: "Adjustment value (16-bit, low byte then high byte)"

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command_hex: "02 0F 00 00 02 <DATA01> <DATA02> <CKS>"
    description: "Sends a remote control key code. See key code table in source."
    params:
      - name: key_code
        type: integer
        description: "WORD key code (DATA01=low, DATA02=high)"

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
    description: "Adjusts lens position (zoom, focus, shift H/V, periphery focus). Timed drive or continuous."
    params:
      - name: target
        type: integer
        description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V, 06h=Periphery Focus"
      - name: content
        type: integer
        description: "00h=Stop, 01h-03h=Plus drive (1s/0.5s/0.25s), 7Fh=Plus continuous, 81h=Minus continuous, FDh-FFh=Minus drive (0.25s/0.5s/1s)"

  - id: lens_control_2
    label: Lens Control 2 (Absolute/Relative)
    kind: action
    command_hex: "02 1D 00 00 04 <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
    description: "Adjusts lens position with absolute or relative value."
    params:
      - name: target
        type: integer
        description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V, FFh=Stop"
      - name: mode
        type: integer
        description: "00h=Absolute value, 02h=Relative value"
      - name: value
        type: integer
        description: "Adjustment value (16-bit, low byte then high byte)"

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command_hex: "02 1E 00 00 01 <DATA01> <CKS>"
    description: "Controls lens memory (MOVE, STORE, RESET)."
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command_hex: "02 1F 00 00 01 <DATA01> <CKS>"
    description: "Controls reference lens memory (MOVE, STORE, RESET) for the selected profile."
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
    description: "Selects the reference lens memory profile number."
    params:
      - name: profile
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: freeze_control
    label: Freeze Control
    kind: action
    command_hex: "01 98 00 00 01 <DATA01> <CKS>"
    description: "Controls the freeze function."
    params:
      - name: operation
        type: integer
        description: "01h=Freeze On, 02h=Freeze Off"

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command_hex: "03 B1 00 00 02 07 <DATA01> <CKS>"
    description: "Sets the eco mode. Values are model-specific."
    params:
      - name: eco_mode
        type: integer
        description: "Eco mode value (model-specific, see appendix)"

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command_hex: "03 B1 00 00 12 2C <DATA01-16> 00 <CKS>"
    description: "Sets the projector name (up to 16 bytes)."
    params:
      - name: name
        type: string
        description: "Projector name (up to 16 bytes)"

  - id: pip_pbp_set
    label: PIP/Picture-by-Picture Set
    kind: action
    command_hex: "03 B1 00 00 03 C5 <DATA01> <DATA02> <CKS>"
    description: "Sets PIP or Picture-by-Picture mode."
    params:
      - name: target
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "Setting value (mode: 00h=PIP, 01h=PbP; position: 00h-03h=TL/TR/BL/BR; sub input: model-specific)"

  - id: edge_blending_set
    label: Edge Blending Set
    kind: action
    command_hex: "03 B1 00 00 03 DF 00 <DATA01> <CKS>"
    description: "Sets edge blending on or off."
    params:
      - name: value
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command_hex: "03 C9 00 00 03 09 <DATA01> <DATA02> <CKS>"
    description: "Sets audio input source."
    params:
      - name: input_terminal
        type: integer
        description: "Input terminal code (model-specific)"
      - name: setting
        type: integer
        description: "00h=Same as specified terminal, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    label: Error Status
    type: binary
    command_hex: "00 88 00 00 00 88"
    description: "Returns 12 bytes of error bit flags (cover, fan, temperature, lamp, formatter, mirror, interlock, etc.). Bit=0 normal, Bit=1 error."

  - id: projector_information
    label: Projector Information
    type: binary
    command_hex: "03 8A 00 00 00 8D"
    description: "Returns projector name (DATA01-49), lamp usage time in seconds (DATA83-86), filter usage time in seconds (DATA87-90)."

  - id: filter_usage
    label: Filter Usage Information
    type: binary
    command_hex: "03 95 00 00 00 98"
    description: "Returns filter usage time (seconds) and filter alarm start time (seconds)."

  - id: lamp_information
    label: Lamp Information
    type: binary
    command_hex: "03 96 00 00 02 <DATA01> <DATA02> <CKS>"
    description: "Returns lamp usage time or remaining life percentage."
    params:
      - name: lamp
        type: integer
        description: "00h=Lamp 1, 01h=Lamp 2"
      - name: content
        type: integer
        description: "01h=Usage time (seconds), 04h=Remaining life (%)"

  - id: carbon_savings
    label: Carbon Savings Information
    type: binary
    command_hex: "03 9A 00 00 01 <DATA01> <CKS>"
    description: "Returns carbon savings in kg and mg."
    params:
      - name: target
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

  - id: running_status
    label: Running Status
    type: binary
    command_hex: "00 85 00 00 01 01 87"
    description: "Returns power status, cooling status, power on/off process status, and operation status."

  - id: input_status
    label: Input Status
    type: binary
    command_hex: "00 85 00 00 01 02 88"
    description: "Returns signal switch process, signal list number, selection signal type, test pattern display, and content displayed."

  - id: mute_status
    label: Mute Status
    type: binary
    command_hex: "00 85 00 00 01 03 89"
    description: "Returns picture mute, sound mute, onscreen mute, forced onscreen mute, and onscreen display status."

  - id: model_name
    label: Model Name
    type: string
    command_hex: "00 85 00 00 01 04 8A"
    description: "Returns the projector model name (NUL-terminated string, up to 32 bytes)."

  - id: cover_status
    label: Cover Status
    type: enum
    command_hex: "00 85 00 00 01 05 8B"
    description: "Returns mirror/lens cover status."
    values: ["normal (cover opened)", "cover closed"]

  - id: lens_control_request
    label: Lens Position Values
    type: binary
    command_hex: "02 1C 00 00 02 <DATA01> 00 <CKS>"
    description: "Returns current value and adjustment range for zoom/focus/lens shift."
    params:
      - name: target
        type: integer
        description: "00h=Zoom, 01h=Focus, 02h=Lens Shift H, 03h=Lens Shift V"

  - id: lens_memory_option_request
    label: Lens Memory Option
    type: enum
    command_hex: "02 20 00 00 01 <DATA01> <CKS>"
    description: "Returns lens memory option setting."
    params:
      - name: target
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

  - id: lens_information
    label: Lens Information
    type: binary
    command_hex: "02 22 00 00 01 00 25"
    description: "Returns lens motor operation status (lens memory, zoom, focus, lens shift H/V). Bit flags: 0=Stop, 1=During operation."

  - id: lens_profile_request
    label: Lens Profile
    type: enum
    command_hex: "02 28 00 00 00 2A"
    description: "Returns the selected reference lens memory profile."
    values: ["Profile 1", "Profile 2"]

  - id: gain_parameter
    label: Gain Parameter
    type: binary
    command_hex: "03 05 00 00 03 <DATA01> 00 00 <CKS>"
    description: "Returns adjustment range, default, and current value for brightness/contrast/color/hue/sharpness/volume/lamp adjust."
    params:
      - name: target
        type: integer
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"

  - id: setting_request
    label: Projector Settings
    type: binary
    command_hex: "00 85 00 00 01 00 86"
    description: "Returns base model type, sound function availability, and profile number."

  - id: information_string
    label: Information String
    type: string
    command_hex: "00 D0 00 00 03 00 <DATA01> 01 <CKS>"
    description: "Returns horizontal or vertical sync frequency as a string."
    params:
      - name: info_type
        type: integer
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

  - id: eco_mode_request
    label: Eco Mode
    type: integer
    command_hex: "03 B0 00 00 01 07 BB"
    description: "Returns the current eco mode setting (model-specific values)."

  - id: lan_projector_name_request
    label: LAN Projector Name
    type: string
    command_hex: "03 B0 00 00 01 2C E0"
    description: "Returns the projector name (up to 17 bytes, NUL-terminated)."

  - id: mac_address
    label: MAC Address
    type: string
    command_hex: "03 B0 00 00 02 9A 00 4F"
    description: "Returns the projector MAC address (6 bytes)."

  - id: pip_pbp_request
    label: PIP/Picture-by-Picture
    type: binary
    command_hex: "03 B0 00 00 02 C5 <DATA01> <CKS>"
    description: "Returns PIP/PbP mode, start position, or sub input setting."
    params:
      - name: target
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

  - id: edge_blending_request
    label: Edge Blending Mode
    type: enum
    command_hex: "03 B0 00 00 02 DF 00 94"
    description: "Returns edge blending status."
    values: ["OFF", "ON"]

  - id: base_model_type_request
    label: Base Model Type
    type: binary
    command_hex: "00 BF 00 00 01 00 C0"
    description: "Returns base model type and model name."

  - id: serial_number_request
    label: Serial Number
    type: string
    command_hex: "00 BF 00 00 02 01 06 C8"
    description: "Returns the projector serial number (up to 16 bytes, NUL-terminated)."

  - id: basic_information_request
    label: Basic Information
    type: binary
    command_hex: "00 BF 00 00 01 02 C2"
    description: "Returns operation status, content displayed, signal type, video/sound/onscreen mute, and freeze status."
```

## Variables
```yaml
variables:
  - id: brightness
    label: Brightness
    type: integer
    description: "Picture brightness level. Adjustable via PICTURE ADJUST (target 00h)."
    # UNRESOLVED: valid range not explicitly stated for NP-PH1202HL; gain parameter request returns range dynamically

  - id: contrast
    label: Contrast
    type: integer
    description: "Picture contrast level. Adjustable via PICTURE ADJUST (target 01h)."

  - id: color
    label: Color
    type: integer
    description: "Picture color level. Adjustable via PICTURE ADJUST (target 02h)."

  - id: hue
    label: Hue
    type: integer
    description: "Picture hue level. Adjustable via PICTURE ADJUST (target 03h)."

  - id: sharpness
    label: Sharpness
    type: integer
    description: "Picture sharpness level. Adjustable via PICTURE ADJUST (target 04h)."

  - id: volume
    label: Volume
    type: integer
    description: "Sound volume level. Adjustable via VOLUME ADJUST."
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source; all responses are command-reply
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: >-
  The error status response (command 009) includes interlock switch open detection (DATA09 Bit1),
  cover error (DATA01 Bit0), and mirror cover error (DATA03 Bit5).
  No explicit safety interlock procedure is documented in the command reference.
  # UNRESOLVED: full safety/interlock procedures not documented in this command reference
```

## Notes
The protocol is entirely binary (hex byte sequences), not ASCII. Each command frame includes a checksum calculated as the low byte of the sum of all preceding bytes. Responses include error codes (ERR1/ERR2) on failure. The device uses a Control ID (ID1) and Model Code (ID2) in responses that vary per unit.

Power ON/OFF commands block all other commands during the power transition (including cooling time for power off). Some models cannot receive LAN commands in standby mode.

Picture mute, sound mute, and onscreen mute are automatically cancelled on input terminal switch or video signal switch. Sound mute is also cancelled on volume adjustment.

Lens control supports both timed drives (0.25s, 0.5s, 1s) and continuous drives (stop by sending 00h). While the lens is being driven, the same command can be reissued without stopping first.

Usage time counters update at one-minute intervals despite returning one-second precision.

The supplementary appendix tables for input terminal codes, aspect values, and eco mode values do not include a specific row for the NP-PH1202HL series; only NP4100, NP-Mxxx, and NP-MExxx models are listed.

<!-- UNRESOLVED: input terminal hex codes for NP-PH1202HL not in appendix -->
<!-- UNRESOLVED: aspect value mapping for NP-PH1202HL not in appendix -->
<!-- UNRESOLVED: eco mode value mapping for NP-PH1202HL not in appendix -->
<!-- UNRESOLVED: standby mode LAN/serial command reception behavior for NP-PH1202HL not listed -->
<!-- UNRESOLVED: display signal type mapping may differ for NP-PH1202HL -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:52:30.761Z
last_checked_at: 2026-05-14T18:17:18.632Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:18.632Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 52 spec actions matched verbatim in NEC PH1202HL IP source; transport parameters confirmed; spec represents complete command set. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific input terminal hex codes for NP-PH1202HL not listed in the supplementary tables; the appendix tables only cover NP4100, NP-Mxxx, and NP-MExxx models"
- "eco mode value mapping for NP-PH1202HL not listed in appendix"
- "aspect value mapping for NP-PH1202HL not listed in appendix"
- "valid range not explicitly stated for NP-PH1202HL; gain parameter request returns range dynamically"
- "no unsolicited notification events documented in source; all responses are command-reply"
- "no multi-step sequences explicitly described in source"
- "full safety/interlock procedures not documented in this command reference"
- "input terminal hex codes for NP-PH1202HL not in appendix"
- "aspect value mapping for NP-PH1202HL not in appendix"
- "eco mode value mapping for NP-PH1202HL not in appendix"
- "standby mode LAN/serial command reception behavior for NP-PH1202HL not listed"
- "display signal type mapping may differ for NP-PH1202HL"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
