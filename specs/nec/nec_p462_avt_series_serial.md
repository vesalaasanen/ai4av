---
spec_id: admin/nec-p462-avt-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC P462-AVT Series Control Spec"
manufacturer: NEC
model_family: "P462-AVT Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "P462-AVT Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:29:37.346Z
generated_at: 2026-04-25T21:29:37.346Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:29:37.346Z
  matched_actions: 28
  action_count: 28
  confidence: high
  summary: "All 28 spec actions have direct semantic matches in the source command reference; serial baud rates 115200/38400/19200/9600/4800 bps and TCP port 7142 verified; feedbacks without query_command correspond to source query commands."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC P462-AVT Series Control Spec

## Summary
The NEC P462-AVT Series is a professional projector supporting both RS-232C serial and wired LAN (TCP/IP) control. This spec covers the full command set including power control, input routing, picture/sound adjustment, lens control, query commands, and ECO mode. Serial baud rate is configurable (115200/38400/19200/9600/4800 bps); LAN uses TCP port 7142. No authentication is required for either interface.

<!-- UNRESOLVED: Some commands reference an Appendix with input terminal values and aspect values that is not included in this source document -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # UNRESOLVED: multiple baud rates supported (115200/38400/19200/9600/4800 bps); no single value stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS handshake pins wired but flow control setting not stated
addressing:
  port: 7142  # LAN TCP port; serial port number not stated in source
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

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code (e.g. 01h=COMPUTER, 06h=VIDEO, A1h=HDMI)

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
      description: Adjustment target (00h=brightness, 01h=contrast, 02h=color, 03h=hue, 04h=sharpness)
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect mode hex code

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code from key code list (e.g. 02h=POWER ON, 0Dh=HELP, 29h=MUTE)

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
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=stop, 01h/02h/03h=drive plus 1/0.5/0.25s, 7Fh=drive plus, 81h=drive minus, FDh/FEh/FFh=drive minus 0.25/0.5/1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: control
      type: integer
      description: "FFh=stop"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: 16-bit adjustment value

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

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: eco_mode_set
  label: ECO Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: ECO mode hex code (see Appendix)

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
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value per target

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
    - name: value
      type: integer
      description: "00h=HDMI1, 01h=HDMI2, 02h=DisplayPort, 03h=HDBaseT, 04h=USB-A, 05h=USB-B"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status Request
  type: bitfield
  description: Returns 12 bytes of error status bits (cover, temperature, fan, power, lamp errors)

- id: command_response
  label: Command Response
  type: enum
  values:
    - success
    - error
  description: ERR1/ERR2 codes indicate failure reason

- id: power_state
  label: Running Status / Power Status
  type: enum
  values:
    - "00h: Standby"
    - "01h: Power on"
    - "04h: Power on"
    - "05h: Cooling"
    - "06h: Standby (error)"
    - "0Fh: Standby (Power saving)"
    - "10h: Network standby"
    - "FFh: Not supported"

- id: input_status
  label: Input Status Request
  type: object
  description: Returns signal switch process, signal list number, signal types, test pattern display, content displayed

- id: mute_status
  label: Mute Status Request
  type: object
  description: Picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display status

- id: model_name
  label: Model Name Request
  type: string
  description: Returns model name (up to 32 bytes, NUL-terminated)

- id: cover_status
  label: Cover Status Request
  type: enum
  values:
    - "00h: Normal (cover opened)"
    - "01h: Cover closed"

- id: projector_info
  label: Information Request
  type: object
  description: Returns projector name, lamp usage time (seconds), filter usage time (seconds)

- id: filter_usage_info
  label: Filter Usage Information Request
  type: object
  description: Returns filter usage time (seconds) and filter alarm start time (seconds)

- id: lamp_info
  label: Lamp Information Request 3
  type: object
  description: Returns lamp usage time (seconds) or lamp remaining life (%) per lamp

- id: carbon_savings_info
  label: Carbon Savings Information Request
  type: object
  description: Returns carbon savings in kg and mg

- id: lens_control_request
  label: Lens Control Request
  type: object
  description: Returns upper/lower adjustment limits and current lens position values

- id: lens_memory_option_request
  label: Lens Memory Option Request
  type: object
  description: Returns LOAD BY SIGNAL and FORCED MUTE setting values

- id: lens_profile_request
  label: Lens Profile Request
  type: enum
  values:
    - "00h: Profile 1"
    - "01h: Profile 2"

- id: lens_info
  label: Lens Information Request
  type: bitfield
  description: Lens memory, zoom, focus, lens shift H/V operation status bits

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  type: object
  description: Returns adjustment range limits, default value, current value, adjustment width for picture/volume/lamp parameters

- id: setting_request
  label: Setting Request
  type: object
  description: Returns base model type, sound function, clock/sleep timer availability

- id: information_string_request
  label: Information String Request
  type: string
  description: Returns horizontal/vertical sync frequency as NUL-terminated string

- id: eco_mode_request
  label: ECO Mode Request
  type: integer
  description: Returns current ECO mode hex code

- id: lan_projector_name_request
  label: LAN Projector Name Request
  type: string
  description: Returns projector name (up to 17 bytes, NUL-terminated)

- id: lan_mac_address_request2
  label: LAN MAC Address Status Request 2
  type: string
  description: Returns 6-byte MAC address

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  type: object
  description: Returns PIP/PbP mode, start position, sub input settings

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  type: enum
  values:
    - "00h: OFF"
    - "01h: ON"

- id: serial_number_request
  label: Serial Number Request
  type: string
  description: Returns serial number (up to 16 bytes, NUL-terminated)

- id: basic_information_request
  label: Basic Information Request
  type: object
  description: Returns operation status, content displayed, signal type, video/sound/onscreen mute, freeze status

- id: base_model_type_request
  label: Base Model Type Request
  type: object
  description: Returns base model type, model name, base model type codes
```

## Variables
```yaml
# UNRESOLVED: Many adjustment commands (picture_adjust, volume_adjust, aspect_adjust,
# eco_mode_set, etc.) modify persistent device state. The source documents these as
# Actions rather than Variables. Implementers should treat repeat set operations as
# idempotent variable writes.
```

## Events
```yaml
# UNRESOLVED: No unsolicited event notifications described in source.
# The device only responds to commands; it does not push status autonomously.
```

## Macros
```yaml
# The source does not describe multi-step macro sequences.
# UNRESOLVED: Standby mode requirements for receiving commands differ between serial
# and LAN. Serial standby modes: Normal, Active, Eco, NORMAL, NETWORK STANDBY, SLEEP,
# OFF, ON, STANDBY POWER ON. LAN standby modes: Normal, NORMAL, NETWORK STANDBY, SLEEP,
# HTBaseT STANDBY, OFF, ON, STANDBY POWER ON. Some models only support certain modes.
```

## Safety
```yaml
confirmation_required_for:
  - power_on
  - power_off
interlocks:
  - While power is turning on (POWER ON command), no other command is accepted.
  - While power is turning off (including cooling time) (POWER OFF command), no other command is accepted.
  - Some models require specific standby modes to receive serial or LAN commands.
    Supported standby modes vary by model; see Macros section for lists.
# UNRESOLVED: voltage, current, power specifications not stated in source
# UNRESOLVED: fault behavior and error recovery sequences not fully documented
```

## Notes
Command format: 20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>. All multi-byte values are big-endian. Checksum (CKS) is low-order byte of sum of all preceding bytes. Responses include ERR1/ERR2 error codes (see error code list). Serial supports RTS/CTS hardware handshake (pins 7/8 wired cross). LAN uses TCP port 7142; no login or authentication described. Some commands (e.g. INPUT SW CHANGE, ASPECT ADJUST) reference an Appendix for hex code values not included in this source document.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" referenced but not included in source; input terminal hex codes, aspect hex codes, eco mode hex codes, and selection signal type codes are partially documented in appendix excerpt only -->
<!-- UNRESOLVED: Model code (ID2) values not stated in source; must be obtained from device or supplemental docs -->
<!-- UNRESOLVED: Firmware version compatibility not stated in source -->
<!-- UNRESOLVED: HDBaseT standby mode mentioned but not detailed in source -->
<!-- UNRESOLVED: Some commands (e.g. PICTURE ADJUST, VOLUME ADJUST) use 16-bit signed values; valid range not stated -->
<!-- UNRESOLVED: Lens control commands (053-x series) — applicability depends on lens option; source does not specify which models have lens -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-04-25T21:29:37.346Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:29:37.346Z
matched_actions: 28
action_count: 28
confidence: high
summary: "All 28 spec actions have direct semantic matches in the source command reference; serial baud rates 115200/38400/19200/9600/4800 bps and TCP port 7142 verified; feedbacks without query_command correspond to source query commands."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
