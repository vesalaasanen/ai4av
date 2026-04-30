---
schema_version: ai4av-public-spec-v1
device_id: nec/p552-avt
entity_id: nec_p552_avt_series
spec_id: admin/nec-p552-avt-series
revision: 1
author: admin
title: "NEC P552-AVT Series Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: P552-AVT
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - P552-AVT
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_p552_avt_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:31:10.811Z
retrieved_at: 2026-04-25T21:31:10.811Z
last_checked_at: 2026-04-25T21:31:10.811Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:31:10.811Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "All 53 spec actions matched their source commands with correct semantics; transport parameters verified verbatim in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC P552-AVT Series Control Spec

## Summary
NEC P552-AVT Series professional projector supporting both RS-232C serial and wired LAN (TCP/IP) control. The projector provides comprehensive control including power, input routing, picture/sound mute, lens control, ECO mode, and extensive status monitoring. Serial baud rates: 115200/38400/19200/9600/4800 bps (8N1). LAN uses TCP port 7142.

<!-- UNRESOLVED: input terminal code values vary by model; some codes are model-dependent -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # LAN TCP port stated in source
serial:
  baud_rate: 115200  # highest rate stated; supports 38400/19200/9600/4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # POWER ON (015), POWER OFF (016) commands present
- routable        # INPUT SW CHANGE (018), AUDIO SELECT SET (319-10) present
- queryable       # multiple status/information request commands (037, 078-x, 084, etc.)
- levelable       # VOLUME ADJUST (030-2), PICTURE ADJUST (030-1), LAMP ADJUST present
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
  label: Input Switch
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code (e.g., 01h=COMPUTER, 06h=VIDEO, 20h=LAN)

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
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
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
      description: Volume level (16-bit signed)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect
      type: integer
      description: "Aspect mode hex code: 00h=AUTO, 01h=WIDE ZOOM, 02h=16:9, 03h=NATIVE, 04h=4:3, etc."

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

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "Key code from remote control table (e.g., 02h=POWER ON, 03h=POWER OFF, 0Dh=MUTE)"

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
      description: "00h=Stop, 01h/02h/03h=drive plus, 7Fh=drive plus cont., 81h=drive minus cont., FDh/FEh/FFh=drive minus"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute value, 02h=relative value"
    - name: value
      type: integer
      description: Position value (16-bit)

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
      description: "01h=Freeze on, 02h=Freeze off"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=ON/AUTO ECO, 02h/03h=ECO, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT"

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
      description: Setting value (varies by target)

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
      description: Input terminal code
    - name: source
      type: integer
      description: "00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER"

# UNRESOLVED: commands 053-7, 053-10, 053-11 fully detailed hex values not captured above
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  type: bitfield
  description: "Bit-level error status (009). Bit0=Cover error, Bit1=Temperature, Bit3/Fan, Bit4=Fan, Bit5=Power, Bit6=Lamp off"

- id: information_request
  label: Information Request
  type: object
  description: "037: Returns projector name (DATA01-49), lamp usage seconds (DATA83-86), filter usage seconds (DATA87-90)"

- id: filter_usage_info
  label: Filter Usage Info
  type: object
  description: "037-3: Filter usage time (seconds), filter alarm start time"

- id: lamp_info_3
  label: Lamp Info 3
  type: object
  description: "037-4: Lamp usage time (seconds), lamp remaining life (%)"

- id: carbon_savings_info
  label: Carbon Savings Info
  type: object
  description: "037-6: Total carbon savings (kg + mg)"

- id: lens_control_request
  label: Lens Control Request
  type: object
  description: "053-1: Returns adjustment range (upper/lower limits) and current lens position"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  type: object
  description: "053-5: Returns lens memory option (LOAD BY SIGNAL/FORCED MUTE) and setting"

- id: lens_info
  label: Lens Info
  type: bitfield
  description: "053-7: Bitfield indicating lens memory, zoom, focus, H/V shift operation status"

- id: lens_profile_request
  label: Lens Profile Request
  type: integer
  description: "053-11: Returns selected profile number (00h=Profile 1, 01h=Profile 2)"

- id: gain_parameter_3
  label: Gain Parameter 3
  type: object
  description: "060-1: Returns picture/volume adjustment ranges and current values"

- id: setting_request
  label: Setting Request
  type: object
  description: "078-1: Returns base model type, sound/clock/sleep timer availability"

- id: running_status_request
  label: Running Status Request
  type: object
  description: "078-2: Returns power status (00h=Standby, 01h=Power on), cooling process, operation status"

- id: input_status_request
  label: Input Status Request
  type: object
  description: "078-3: Returns signal switch process, signal list number, signal types, test pattern display"

- id: mute_status_request
  label: Mute Status Request
  type: object
  description: "078-4: Returns picture/sound/onscreen/forced onscreen mute status"

- id: model_name_request
  label: Model Name Request
  type: string
  description: "078-5: Returns model name string"

- id: cover_status_request
  label: Cover Status Request
  type: enum
  values:
    - "00h: Normal (cover opened)"
    - "01h: Cover closed"

- id: information_string_request
  label: Information String Request
  type: object
  description: "084: Returns horizontal/vertical sync frequency as string"

- id: eco_mode_request
  label: Eco Mode Request
  type: integer
  description: "097-8: Returns eco mode setting"

- id: lan_projector_name_request
  label: LAN Projector Name Request
  type: string
  description: "097-45: Returns projector name"

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  type: string
  description: "097-155: Returns MAC address (hex)"

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  type: object
  description: "097-198: Returns PIP/PbP mode, start position, sub input settings"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  type: enum
  values:
    - "00h: OFF"
    - "01h: ON"

- id: base_model_type_request
  label: Base Model Type Request
  type: string
  description: "305-1: Returns base model type and model name"

- id: serial_number_request
  label: Serial Number Request
  type: string
  description: "305-2: Returns serial number"

- id: basic_information_request
  label: Basic Information Request
  type: object
  description: "305-3: Returns operation status, content displayed, signal types, mute states, freeze status"
```

## Variables
```yaml
# UNRESOLVED: continuous adjustable parameters are handled via Actions (picture_adjust, volume_adjust, etc.)
# ECO mode, projector name, PIP settings, edge blending, audio select are set via dedicated SET actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited event descriptions found in source; device sends responses only on command
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
# Note: POWER ON (015) blocks other commands while executing
# Note: POWER OFF (016) blocks other commands during cooling time
# Note: Some models require specific standby modes to receive commands via serial or LAN
```

## Notes
- Protocol uses 7-byte header + variable data + checksum structure. Header bytes: `[20h/02h/03h/00h][command][00h][00h][data_len]...<CKS>`
- Response structure: `[A0h/A1h/A2h/A3h][command][ID1][ID2][data_len][data...][CKS]`
- Error codes in ERR1/ERR2 bytes (see Error code list in source)
- Serial cable: D-SUB 9P, full duplex, RTS/CTS flow control
- LAN: TCP port 7142, wired LAN 10/100 Mbps auto-negotiate
- Standby mode requirements vary by model for receiving serial vs LAN commands
- Some input terminal codes vary by model (see Appendix in source)
- Lamp/filter usage times updated at 1-minute intervals despite 1-second resolution
<!-- UNRESOLVED: detailed hex command codes for 053-7, 053-10, 053-11, 319-10 not fully enumerated -->
<!-- UNRESOLVED: HDBaseT control mentioned but not detailed -->
<!-- UNRESOLVED: viewer/USB input code values not fully enumerated -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_p552_avt_series_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:31:10.811Z
retrieved_at: 2026-04-25T21:31:10.811Z
last_checked_at: 2026-04-25T21:31:10.811Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:31:10.811Z
matched_actions: 53
action_count: 53
confidence: high
summary: "All 53 spec actions matched their source commands with correct semantics; transport parameters verified verbatim in source."
```

## Known Gaps

```yaml
[]
```
