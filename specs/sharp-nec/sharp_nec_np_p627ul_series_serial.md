---
spec_id: admin/sharp-nec-np-p627ul-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp-NEC NP-P627UL Series Control Spec"
manufacturer: Sharp-NEC
model_family: "NP-P627UL Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp-NEC
  models:
    - "NP-P627UL Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T10:09:19.549Z
last_checked_at: 2026-06-02T22:14:08.328Z
generated_at: 2026-06-02T22:14:08.328Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "standby mode command acceptance varies by model — NP-P627UL specific standby mode not confirmed"
  - "variables are primarily queryable state, not settable discrete parameters."
  - "no unsolicited event notifications described in source."
  - "no multi-step macro sequences are described in the source."
  - "no explicit safety interlock procedures stated in source."
  - "input terminal code mapping for NP-P627UL not in appendix — adjacent NP-M series codes may not apply"
  - "aspect ratio code values for NP-P627UL not stated in appendix"
  - "eco mode code values for NP-P627UL not stated in appendix"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:14:08.328Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Sharp-NEC NP-P627UL Series Control Spec

## Summary
Laser phosphor projector supporting RS-232C serial and wired LAN (TCP/IP) control. Uses a 7-byte header + variable data + checksum command structure. Both power on and power off commands block subsequent commands during execution (including cooling time). No login or authentication procedure described in the source.

<!-- UNRESOLVED: standby mode command acceptance varies by model — NP-P627UL specific standby mode not confirmed -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # stated: TCP port for LAN command communication
serial:
  baud_rate: 115200  # stated: highest baud rate available; source lists 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # power on/off commands present (015, 016)
- routable     # input switching command present (018)
- queryable    # status, information, and lamp-time queries present
- levelable    # volume, brightness, contrast, hue, sharpness, lamp adjust commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  notes: "Blocks all other commands during power-on execution"

- id: power_off
  label: Power Off
  kind: action
  params: []
  notes: "Blocks all other commands during power-off execution and cooling time"

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal code (varies by model; see appendix for NP-P627UL mapping)

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  notes: "Released by input terminal switch or video signal switch"

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  notes: "Released by input terminal switch, video signal switch, or volume adjustment"

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  notes: "Released by input terminal switch or video signal switch"

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
      description: "0=brightness, 1=contrast, 2=color, 3=hue, 4=sharpness"
    - name: mode
      type: integer
      description: "0=absolute, 1=relative"
    - name: value
      type: integer
      description: "16-bit signed adjustment value (low-order 8 bits in DATA03, high-order in DATA04)"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=absolute, 1=relative"
    - name: value
      type: integer
      description: "16-bit signed adjustment value"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect ratio code (model-dependent; see appendix)

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: target
      type: integer
      description: "96h= Lamp Adjust / Light Adjust"
    - name: mode
      type: integer
      description: "0=absolute, 1=relative"
    - name: value
      type: integer
      description: "16-bit signed adjustment value"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "Key code from published key code list (e.g., 2=POWER ON, 3=POWER OFF, 238=LAMP MODE/ECO)"

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
      description: "0=Zoom, 1=Focus, 2=Lens Shift (H), 3=Lens Shift (V), 6=Periphery Focus"
    - name: operation
      type: integer
      description: "0=Stop, 01h=1s plus, 02h=0.5s plus, 03h=0.25s plus, 7Fh=continuous plus, 81h=continuous minus, FDh=0.25s minus, FEh=0.5s minus, FFh=1s minus"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: target
      type: integer
      description: "0=Zoom, 1=Focus, 2=Lens Shift (H), 3=Lens Shift (V)"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: target
      type: integer
      description: "0=Zoom, 1=Focus, 2=Lens Shift (H), 3=Lens Shift (V), FFh=Stop"
    - name: mode
      type: integer
      description: "0=absolute, 2=relative"
    - name: value
      type: integer
      description: "16-bit value"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "0=MOVE, 1=STORE, 2=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "0=MOVE, 1=STORE, 2=RESET"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: target
      type: integer
      description: "0=LOAD BY SIGNAL, 1=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: target
      type: integer
      description: "0=LOAD BY SIGNAL, 1=FORCED MUTE"
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "0=Profile 1, 1=Profile 2"

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
      description: "00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"

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

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "1=On, 2=Off"

- id: information_string_request
  label: Information String Request
  kind: query
  params:
    - name: info_type
      type: integer
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

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

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  params:
    - name: target
      type: integer
      description: "0=MODE, 1=START POSITION, 2=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: Eco mode value (model-dependent; see appendix)

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
      description: "0=MODE, 1=START POSITION, 2=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value (model-dependent)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"

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

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal code
    - name: setting
      type: integer
      description: "0=terminal in DATA01, 1=BNC, 2=COMPUTER"

- id: error_status_request
  label: Error Status Request
  kind: query
  params: []

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
    - name: lamp
      type: integer
      description: "0=Lamp 1, 1=Lamp 2"
    - name: content
      type: integer
      description: "01h=usage time (seconds), 04h=remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  params:
    - name: target
      type: integer
      description: "0=Total Carbon Savings, 1=Carbon Savings during operation"
```

## Feedbacks
```yaml
# Generic success response (no data):
# 22h <ID1> <ID2> 00h <CKS>
# Generic success response (with data):
# 22h/23h <ID1> <ID2> LEN <DATA...> <CKS>
# Generic failure response:
# A0h/A1h/A2h/A3h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: execution_result
  label: Execution Result
  type: enum
  values:
    - "00h: Ended successfully"
    - "01h: Ended with error"
    - "FFh: Ended with error (for some commands)"

- id: error_status
  label: Error Status
  type: bitfield
  description: "12-byte error information block; bit=0 normal, bit=1 error"
  fields:
    DATA01: "Bit0=Cover error, Bit1=Temperature error, Bit3/Fan error, Bit4=Fan error, Bit5=Power error, Bit6=Lamp off/backlight off, Bit7=Lamp replacement moratorium"
    DATA02: "Bit0=Lamp usage time exceeded, Bit1=Formatter error, Bit2=Lamp 2 off, Bit7=Extended status"
    DATA03: "Bit1=FPGA error, Bit2=Temperature sensor error, Bit3=Lamp not present, Bit4=Lamp data error, Bit5=Mirror cover error, Bit6=Lamp 2 moratorium, Bit7=Lamp 2 usage exceeded"
    DATA04: "Bit0=Lamp 2 not present, Bit1=Lamp 2 data error, Bit2=Dust temperature error, Bit3=Foreign matter sensor, Bit5=Ballast comm error, Bit6=Iris calibration error, Bit7=Lens not installed"
    DATA09: "Bit0=Portrait cover side up, Bit1=Interlock switch open, Bit2=System error (Slave CPU), Bit3=System error (Formatter)"

- id: power_state_response
  label: Power State Response
  type: enum
  values:
    - "00h: Standby"
    - "01h: Power on"
    - "04h: Power on (alternate)"
    - "05h: Cooling"
    - "06h: Standby (error)"
    - "0Fh: Standby (Power saving)"
    - "10h: Network standby"
    - "FFh: Not supported"

- id: mute_status_response
  label: Mute Status Response
  type: object
  fields:
    picture_mute: "00h=Off, 01h=On, FFh=Not supported"
    sound_mute: "00h=Off, 01h=On, FFh=Not supported"
    onscreen_mute: "00h=Off, 01h=On, FFh=Not supported"
    forced_onscreen_mute: "00h=Off, 01h=On, FFh=Not supported"
```

## Variables
```yaml
# UNRESOLVED: variables are primarily queryable state, not settable discrete parameters.
# Lamp usage time, filter usage time, carbon savings, and eco mode values are readable
# via query commands but the source does not enumerate them as standalone Variables entries.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source.
# The projector only responds to commands; no push-style event reporting is documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences are described in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety interlock procedures stated in source.
# Source notes only that power-on and power-off commands block other commands during execution.
# Standby mode command acceptance varies by model - consult projector manual for model-specific standby behavior.
```

## Notes
Command structure: 7-byte header (command type byte + model-specific bytes + data length) + variable DATA bytes + 1-byte checksum. Checksum = low-order byte of sum of all preceding bytes.

Baud rate must match between projector and controller. Source lists 115200, 38400, 19200, 9600, 4800 bps as supported rates.

Some models cannot receive commands in standby mode — model-specific behavior not confirmed for NP-P627UL Series.

Input terminal codes, aspect values, and eco mode values are model-dependent. NP-P627UL-specific code tables are not included in the source appendix; values for adjacent model series are provided.
<!-- UNRESOLVED: input terminal code mapping for NP-P627UL not in appendix — adjacent NP-M series codes may not apply -->
<!-- UNRESOLVED: aspect ratio code values for NP-P627UL not stated in appendix -->
<!-- UNRESOLVED: eco mode code values for NP-P627UL not stated in appendix -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T10:09:19.549Z
last_checked_at: 2026-06-02T22:14:08.328Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:14:08.328Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "standby mode command acceptance varies by model — NP-P627UL specific standby mode not confirmed"
- "variables are primarily queryable state, not settable discrete parameters."
- "no unsolicited event notifications described in source."
- "no multi-step macro sequences are described in the source."
- "no explicit safety interlock procedures stated in source."
- "input terminal code mapping for NP-P627UL not in appendix — adjacent NP-M series codes may not apply"
- "aspect ratio code values for NP-P627UL not stated in appendix"
- "eco mode code values for NP-P627UL not stated in appendix"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
