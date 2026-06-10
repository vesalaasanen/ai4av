---
spec_id: admin/nec-mc-300-400-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC MC 300 400 Series Control Spec"
manufacturer: NEC
model_family: "MC 300 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "MC 300 Series"
    - "MC 400 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-14T23:59:10.902Z
last_checked_at: 2026-06-09T23:30:30.427Z
generated_at: 2026-06-09T23:30:30.427Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input terminal value mapping references an \"Appendix: Supplementary Information by Command\" not included in source"
  - "eco mode value mapping references an appendix not included in source"
  - "aspect value mapping references an appendix not included in source"
  - "source lists multiple supported rates (115200/38400/19200/9600/4800); default unknown"
  - "flow control not stated in source"
  - "lens axis target not explicitly enumerated in this section\""
  - "range not stated in source, query gain_parameter for device-specific limits"
  - "source does not describe unsolicited notifications from projector"
  - "source does not describe multi-step sequences"
  - "source mentions cooling-time lockout during power-off and command rejection"
  - "baud_rate default unknown — source lists 115200/38400/19200/9600/4800 as supported"
  - "input terminal value mapping (appendix not in source)"
  - "aspect value mapping (appendix not in source)"
  - "eco mode value mapping (appendix not in source)"
  - "sub-input / PIP input value mapping (appendix not in source)"
  - "base model type value mapping (appendix not in source)"
  - "flow_control not stated in source"
  - "unsolicited event/notification mechanism not described"
verification:
  verdict: verified
  checked_at: 2026-06-09T23:30:30.427Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions verified against source Command List; no fabrication, drift, or gaps detected (18 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# NEC MC 300 400 Series Control Spec

## Summary
NEC MC 300/400 Series projectors with RS-232C serial and TCP/IP network control. Binary command protocol with hex-encoded frames, checksum validation, and control ID + model code addressing. Covers power, input switching, mute, picture/volume adjustment, lens control, shutter, freeze, eco mode, edge blending, PIP, and extensive status queries.

<!-- UNRESOLVED: input terminal value mapping references an "Appendix: Supplementary Information by Command" not included in source -->
<!-- UNRESOLVED: eco mode value mapping references an appendix not included in source -->
<!-- UNRESOLVED: aspect value mapping references an appendix not included in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # UNRESOLVED: source lists multiple supported rates (115200/38400/19200/9600/4800); default unknown
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable       # power on/off commands present
  - queryable       # extensive status request commands
  - levelable       # volume, brightness, contrast, color, hue, sharpness, lamp adjust
  - routable        # input switching commands present
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On (015)
    kind: action
    params: []
    notes: No other commands accepted while powering on.

  - id: power_off
    label: Power Off (016)
    kind: action
    params: []
    notes: No other commands accepted during power-off including cooling time.

  - id: input_switch
    label: Input Switch (018)
    kind: action
    params:
      - name: input
        type: integer
        description: Input terminal selector byte (see appendix for values)
    notes: Returns FFh on error (no signal switch made).

  - id: picture_mute_on
    label: Picture Mute On (020)
    kind: action
    params: []
    notes: Auto-released on input switch or video signal change.

  - id: picture_mute_off
    label: Picture Mute Off (021)
    kind: action
    params: []

  - id: sound_mute_on
    label: Sound Mute On (022)
    kind: action
    params: []
    notes: Auto-released on input switch, video signal change, or volume adjustment.

  - id: sound_mute_off
    label: Sound Mute Off (023)
    kind: action
    params: []

  - id: onscreen_mute_on
    label: Onscreen Mute On (024)
    kind: action
    params: []
    notes: Auto-released on input switch or video signal change.

  - id: onscreen_mute_off
    label: Onscreen Mute Off (025)
    kind: action
    params: []

  - id: picture_adjust
    label: Picture Adjust (030-1)
    kind: action
    params:
      - name: target
        type: integer
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: integer
        description: "00h=Absolute, 01h=Relative"
      - name: value
        type: integer
        description: Adjustment value (16-bit signed)

  - id: volume_adjust
    label: Volume Adjust (030-2)
    kind: action
    params:
      - name: mode
        type: integer
        description: "00h=Absolute, 01h=Relative"
      - name: value
        type: integer
        description: Adjustment value (16-bit signed)

  - id: aspect_adjust
    label: Aspect Adjust (030-12)
    kind: action
    params:
      - name: aspect
        type: integer
        description: Aspect value (see appendix for mapping)

  - id: other_adjust
    label: Other Adjust / Lamp Adjust (030-15)
    kind: action
    params:
      - name: mode
        type: integer
        description: "00h=Absolute, 01h=Relative"
      - name: value
        type: integer
        description: Adjustment value (16-bit signed)
    notes: Target is lamp/light adjust (DATA01=96h, DATA02=FFh).

  - id: remote_key_code
    label: Remote Key Code (050)
    kind: action
    params:
      - name: key_code
        type: integer
        description: "WORD key code (e.g. 02h 00h=Power On, 03h 00h=Power Off, 05h 00h=Auto, 0Dh 00h=Help)"

  - id: shutter_close
    label: Shutter Close (051)
    kind: action
    params: []

  - id: shutter_open
    label: Shutter Open (052)
    kind: action
    params: []

  - id: lens_control
    label: Lens Control (053)
    kind: action
    params:
      - name: target
        type: integer
        description: "06h=Periphery Focus"
      - name: direction
        type: integer
        description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

  - id: lens_control_2
    label: Lens Control 2 (053-2)
    kind: action
    params:
      - name: target
        type: integer
        description: "FFh=Stop"
      - name: mode
        type: integer
        description: "00h=Absolute, 02h=Relative"
      - name: value
        type: integer
        description: Adjustment value (16-bit)

  - id: lens_memory_control
    label: Lens Memory Control (053-3)
    kind: action
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control (053-4)
    kind: action
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: Operates on profile selected by lens_profile_set.

  - id: lens_memory_option_set
    label: Lens Memory Option Set (053-6)
    kind: action
    params:
      - name: option
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: value
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: lens_profile_set
    label: Lens Profile Set (053-10)
    kind: action
    params:
      - name: profile
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"

  - id: freeze_control
    label: Freeze Control (079)
    kind: action
    params:
      - name: state
        type: integer
        description: "01h=Freeze On, 02h=Freeze Off"

  - id: eco_mode_set
    label: Eco Mode Set (098-8)
    kind: action
    params:
      - name: value
        type: integer
        description: Eco mode value (see appendix for mapping)

  - id: lan_projector_name_set
    label: LAN Projector Name Set (098-45)
    kind: action
    params:
      - name: name
        type: string
        description: Projector name (up to 16 bytes)

  - id: pip_pbp_set
    label: PIP/Picture by Picture Set (098-198)
    kind: action
    params:
      - name: property
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "MODE: 00h=PIP, 01h=PbP; POSITION: 00h=TL, 01h=TR, 02h=BL, 03h=BR"

  - id: edge_blending_set
    label: Edge Blending Mode Set (098-243-1)
    kind: action
    params:
      - name: state
        type: integer
        description: "00h=OFF, 01h=ON"

  - id: audio_select_set
    label: Audio Select Set (319-10)
    kind: action
    params:
      - name: input_terminal
        type: integer
        description: Input terminal value (see appendix)
      - name: audio_source
        type: integer
        description: "00h=Same as DATA01 terminal, 01h=BNC, 02h=COMPUTER"
  - id: error_status_request
    label: Error Status Request (009)
    kind: query
    params: []
    notes: Returns 12-byte error bitmap across DATA01-DATA12.

  - id: information_request
    label: Information Request (037)
    kind: query
    params: []
    notes: Returns projector name, lamp usage time, and filter usage time in seconds.

  - id: filter_usage_info_request
    label: Filter Usage Information Request (037-3)
    kind: query
    params: []
    notes: Returns filter usage time and filter alarm start time in seconds; -1 if undefined.

  - id: lamp_information_request
    label: Lamp Information Request (037-4)
    kind: query
    params:
      - name: lamp
        type: integer
        description: "00h=Lamp 1, 01h=Lamp 2 (dual-lamp models only)"
      - name: content
        type: integer
        description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"
    notes: Negative remaining life (%) indicates replacement deadline exceeded.

  - id: carbon_savings_request
    label: Carbon Savings Information Request (037-6)
    kind: query
    params:
      - name: scope
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    notes: Returns carbon savings in kilograms and milligrams; maximum 99999 kg.

  - id: lens_control_request
    label: Lens Control Request (053-1)
    kind: query
    params:
      - name: target
        type: integer
        description: "UNRESOLVED: lens axis target not explicitly enumerated in this section"
    notes: Returns upper/lower adjustment limits and current value (16-bit each).

  - id: lens_memory_option_request
    label: Lens Memory Option Request (053-5)
    kind: query
    params:
      - name: option
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    notes: Returns ON/OFF setting for the specified lens memory option.

  - id: lens_information_request
    label: Lens Information Request (053-7)
    kind: query
    params: []
    notes: Returns bitmask of lens operation states (bit0=Memory, bit1=Zoom, bit2=Focus, bit3=Shift-H, bit4=Shift-V).

  - id: lens_profile_request
    label: Lens Profile Request (053-11)
    kind: query
    params: []
    notes: Returns selected profile number (00h=Profile 1, 01h=Profile 2).

  - id: gain_parameter_request
    label: Gain Parameter Request (060-1)
    kind: query
    params:
      - name: target
        type: integer
        description: "00h=PICTURE/BRIGHTNESS, 01h=PICTURE/CONTRAST, 02h=PICTURE/COLOR, 03h=PICTURE/HUE, 04h=PICTURE/SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"
    notes: Returns adjustment status, upper/lower limits, default value, current value, and adjustment widths.

  - id: setting_request
    label: Setting Request (078-1)
    kind: query
    params: []
    notes: Returns base model type, sound function availability, and profile number.

  - id: running_status_request
    label: Running Status Request (078-2)
    kind: query
    params: []
    notes: Returns power status, cooling process, power on/off process, and operation status.

  - id: input_status_request
    label: Input Status Request (078-3)
    kind: query
    params: []
    notes: Returns signal switch process, signal list number, selection signal types, and content displayed.

  - id: mute_status_request
    label: Mute Status Request (078-4)
    kind: query
    params: []
    notes: Returns picture, sound, onscreen, forced onscreen mute states and onscreen display status.

  - id: model_name_request
    label: Model Name Request (078-5)
    kind: query
    params: []
    notes: Returns model name string (up to 32 bytes, NUL-terminated).

  - id: cover_status_request
    label: Cover Status Request (078-6)
    kind: query
    params: []
    notes: Returns mirror or lens cover status (00h=Normal/opened, 01h=Cover closed).

  - id: information_string_request
    label: Information String Request (084)
    kind: query
    params:
      - name: info_type
        type: integer
        description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"
    notes: Returns NUL-terminated information string displayed on the projector.

  - id: eco_mode_request
    label: Eco Mode Request (097-8)
    kind: query
    params: []
    notes: Returns current eco mode/light mode/lamp mode value; see appendix for value mapping.

  - id: lan_projector_name_request
    label: LAN Projector Name Request (097-45)
    kind: query
    params: []
    notes: Returns projector name (up to 17 bytes, NUL-terminated).

  - id: lan_mac_address_request
    label: LAN MAC Address Request (097-155)
    kind: query
    params: []
    notes: Returns 6-byte MAC address.

  - id: pip_pbp_request
    label: PIP/Picture by Picture Request (097-198)
    kind: query
    params:
      - name: property
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    notes: Returns setting value for the specified PIP/PbP property.

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request (097-243-1)
    kind: query
    params: []
    notes: Returns edge blending setting (00h=OFF, 01h=ON).

  - id: base_model_type_request
    label: Base Model Type Request (305-1)
    kind: query
    params: []
    notes: Returns base model type codes and model name string.

  - id: serial_number_request
    label: Serial Number Request (305-2)
    kind: query
    params: []
    notes: Returns serial number string (up to 16 bytes, NUL-terminated).

  - id: basic_information_request
    label: Basic Information Request (305-3)
    kind: query
    params: []
    notes: Returns operation status, content displayed, signal types, mute states, and freeze status.
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: binary
    label: Error Status (009)
    description: 12-byte bitmap of error states (cover, fan, temperature, power, lamp, formatter, FPGA, mirror cover, ballast, iris, interlock, etc.)

  - id: projector_information
    type: object
    label: Projector Information (037)
    description: Returns projector name (49 bytes), lamp usage time (seconds), filter usage time (seconds).

  - id: filter_usage_info
    type: object
    label: Filter Usage Information (037-3)
    description: Filter usage time (seconds) and filter alarm start time (seconds). Returns -1 if undefined.

  - id: lamp_information
    type: object
    label: Lamp Information (037-4)
    description: Per-lamp usage time (seconds) or remaining life (%). Negative remaining life indicates exceeded replacement deadline.
    params:
      - name: lamp
        description: "00h=Lamp 1, 01h=Lamp 2 (dual-lamp models only)"
      - name: content
        description: "01h=Usage time, 04h=Remaining life %"

  - id: carbon_savings
    type: object
    label: Carbon Savings Information (037-6)
    description: Carbon savings in kg and mg. Max 99999 kg.

  - id: lens_control_position
    type: object
    label: Lens Control Request (053-1)
    description: Upper/lower adjustment limits and current value (16-bit each).

  - id: lens_memory_option
    type: object
    label: Lens Memory Option (053-5)
    description: "Options: LOAD BY SIGNAL or FORCED MUTE, each ON/OFF."

  - id: lens_information
    type: binary
    label: Lens Information (053-7)
    description: "Bitmask of lens operation states: Bit0=Memory, Bit1=Zoom, Bit2=Focus, Bit3=Shift-H, Bit4=Shift-V."

  - id: lens_profile
    type: enum
    label: Lens Profile (053-11)
    values: ["Profile 1", "Profile 2"]

  - id: gain_parameter
    type: object
    label: Gain Parameter Request (060-1)
    description: "Returns adjustment status, upper/lower limits, default, current value, wide/narrow adjustment widths. Targets: Brightness, Contrast, Color, Hue, Sharpness, Volume, Lamp Adjust."

  - id: setting_info
    type: object
    label: Setting Request (078-1)
    description: Base model type, sound function availability, profile number (clock/sleep timer).

  - id: running_status
    type: object
    label: Running Status (078-2)
    description: "Power status (Standby/On), cooling process, power on/off process, operation status (Standby Sleep/On/Cooling/Error/Power saving/Network standby)."

  - id: input_status
    type: object
    label: Input Status (078-3)
    description: Signal switch process, signal list number, selection signal type 1 & 2, signal list type, test pattern display, content displayed.

  - id: mute_status
    type: object
    label: Mute Status (078-4)
    description: "Picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display - each On/Off."

  - id: model_name
    type: string
    label: Model Name (078-5)
    description: Model name string (up to 32 bytes, NUL-terminated).

  - id: cover_status
    type: enum
    label: Cover Status (078-6)
    description: Mirror cover or lens cover status.
    values: ["Normal (cover opened)", "Cover closed"]

  - id: information_string
    type: string
    label: Information String (084)
    description: "Horizontal sync frequency (03h) or vertical sync frequency (04h) as NUL-terminated string."

  - id: eco_mode
    type: integer
    label: Eco Mode (097-8)
    description: Current eco mode / light mode / lamp mode setting.

  - id: lan_projector_name
    type: string
    label: LAN Projector Name (097-45)
    description: Projector name (up to 17 bytes, NUL-terminated).

  - id: mac_address
    type: string
    label: MAC Address (097-155)
    description: 6-byte MAC address.

  - id: pip_pbp_status
    type: object
    label: PIP/Picture by Picture Status (097-198)
    description: "MODE (PIP/PbP), START POSITION (TL/TR/BL/BR), SUB INPUT settings."

  - id: edge_blending_status
    type: enum
    label: Edge Blending Mode (097-243-1)
    values: ["OFF", "ON"]

  - id: base_model_type
    type: object
    label: Base Model Type (305-1)
    description: Base model type codes and model name string.

  - id: serial_number
    type: string
    label: Serial Number (305-2)
    description: Serial number string (up to 16 bytes, NUL-terminated).

  - id: basic_information
    type: object
    label: Basic Information (305-3)
    description: "Operation status, content displayed, signal types, display signal type, video/sound/onscreen mute, freeze status."
```

## Variables
```yaml
variables:
  - id: brightness
    type: integer
    label: Brightness
    description: Picture brightness level
    min: null  # UNRESOLVED: range not stated in source, query gain_parameter for device-specific limits
    max: null

  - id: contrast
    type: integer
    label: Contrast
    description: Picture contrast level
    min: null
    max: null

  - id: color
    type: integer
    label: Color
    description: Picture color level
    min: null
    max: null

  - id: hue
    type: integer
    label: Hue
    description: Picture hue level
    min: null
    max: null

  - id: sharpness
    type: integer
    label: Sharpness
    description: Picture sharpness level
    min: null
    max: null

  - id: volume
    type: integer
    label: Volume
    description: Sound volume level
    min: null
    max: null

  - id: lamp_adjust
    type: integer
    label: Lamp Adjust
    description: Lamp/light adjust level
    min: null
    max: null
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited notifications from projector
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions cooling-time lockout during power-off and command rejection
# during power-on, but no explicit safety interlock procedures or confirmation requirements stated.
```

## Notes
- Binary protocol: all commands and responses are hex-encoded byte frames with embedded checksum (low-order byte of sum of preceding bytes).
- Each command frame includes control ID (ID1) and model code (ID2) parameters.
- Power on/off commands block all other commands during execution (including cooling period for power-off).
- Picture mute, sound mute, and onscreen mute auto-release on input switch or video signal change; sound mute also auto-releases on volume adjustment.
- Lamp remaining life (%) returns negative value when replacement deadline exceeded.
- Error status response is a 12-byte bitmap with per-bit error indicators (cover, fan, temperature, lamp, FPGA, ballast, iris, interlock, etc.).
- Dual-lamp models support Lamp 2 queries (DATA01=01h).
- Input terminal, aspect, eco mode, and sub-input value mappings reference an appendix ("Supplementary Information by Command") not included in the refined source.

<!-- UNRESOLVED: baud_rate default unknown — source lists 115200/38400/19200/9600/4800 as supported -->
<!-- UNRESOLVED: input terminal value mapping (appendix not in source) -->
<!-- UNRESOLVED: aspect value mapping (appendix not in source) -->
<!-- UNRESOLVED: eco mode value mapping (appendix not in source) -->
<!-- UNRESOLVED: sub-input / PIP input value mapping (appendix not in source) -->
<!-- UNRESOLVED: base model type value mapping (appendix not in source) -->
<!-- UNRESOLVED: flow_control not stated in source -->
<!-- UNRESOLVED: unsolicited event/notification mechanism not described -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-14T23:59:10.902Z
last_checked_at: 2026-06-09T23:30:30.427Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T23:30:30.427Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions verified against source Command List; no fabrication, drift, or gaps detected (18 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input terminal value mapping references an \"Appendix: Supplementary Information by Command\" not included in source"
- "eco mode value mapping references an appendix not included in source"
- "aspect value mapping references an appendix not included in source"
- "source lists multiple supported rates (115200/38400/19200/9600/4800); default unknown"
- "flow control not stated in source"
- "lens axis target not explicitly enumerated in this section\""
- "range not stated in source, query gain_parameter for device-specific limits"
- "source does not describe unsolicited notifications from projector"
- "source does not describe multi-step sequences"
- "source mentions cooling-time lockout during power-off and command rejection"
- "baud_rate default unknown — source lists 115200/38400/19200/9600/4800 as supported"
- "input terminal value mapping (appendix not in source)"
- "aspect value mapping (appendix not in source)"
- "eco mode value mapping (appendix not in source)"
- "sub-input / PIP input value mapping (appendix not in source)"
- "base model type value mapping (appendix not in source)"
- "flow_control not stated in source"
- "unsolicited event/notification mechanism not described"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
