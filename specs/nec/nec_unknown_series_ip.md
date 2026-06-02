---
spec_id: admin/nec-unknown_series-ip
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC UNKNOWN Series Control Spec"
manufacturer: NEC
model_family: "NEC UNKNOWN Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NEC UNKNOWN Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:53:11.848Z
last_checked_at: 2026-05-14T18:17:18.999Z
generated_at: 2026-05-14T18:17:18.999Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific model names within the UNKNOWN Series are not enumerated in the source"
  - "flow control not stated in source"
  - "actual range not stated, inferred from 8-bit values"
  - "source does not document unsolicited event notifications from the device"
  - "safety warnings related to lamp replacement, dust exposure, or portrait cover orientation not explicitly documented"
  - "specific input terminal hex codes vary by model - source references appendix for full list"
  - "base model type values not enumerated in source"
  - "protocol version not stated in source"
  - "HDBaseT standby mode availability not fully clarified"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:18.999Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 54 hex-encoded command patterns match source section 3 verbatim; all transport parameters verified; no extra commands in source. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC UNKNOWN Series Control Spec

## Summary
NEC UNKNOWN Series projector supporting both RS-232C serial and wired LAN (TCP/IP) control. Document BDT140013 Rev 7.1. Commands are hex-encoded with checksum validation. Power on/off, input routing, picture/sound mute, lens control, and extensive query commands are documented.

<!-- UNRESOLVED: specific model names within the UNKNOWN Series are not enumerated in the source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142"
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # stated: "115200/38400/19200/9600/4800 bps"
  data_bits: 8  # stated: "8 bits"
  parity: none  # stated: "None"
  stop_bits: 1  # stated: "1 bit"
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Source documents power, routing, and query commands:
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# Actions use hex-encoded commands with format:
# [Header] [Model] [ID1] [ID2] [LEN] [DATA...] [CKS]
# Responses follow similar encoding with ERR1/ERR2 codes

- id: power_on
  label: Power On
  kind: action
  params: []
  hex_example: "02h 00h 00h 00h 00h 02h"

- id: power_off
  label: Power Off
  kind: action
  params: []
  hex_example: "02h 01h 00h 00h 00h 03h"

- id: input_sw_change
  label: Input Switch
  kind: action
  params:
    - name: input_terminal
      type: hex
      description: Hex code for input terminal (see Appendix for codes)
  hex_example: "02h 03h 00h 00h 02h 01h 06h 0Eh"

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  hex_example: "02h 10h 00h 00h 00h 12h"

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []
  hex_example: "02h 11h 00h 00h 00h 13h"

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  hex_example: "02h 12h 00h 00h 00h 14h"

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []
  hex_example: "02h 13h 00h 00h 00h 15h"

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  hex_example: "02h 14h 00h 00h 00h 16h"

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []
  hex_example: "02h 15h 00h 00h 00h 17h"

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: adjustment_target
      type: hex
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: adjustment_mode
      type: hex
      description: "00h=absolute, 01h=relative"
    - name: adjustment_value
      type: integer
      description: 16-bit signed value (low-order 8 bits then high-order 8 bits)
  hex_example: "03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: adjustment_mode
      type: hex
      description: "00h=absolute, 01h=relative"
    - name: adjustment_value
      type: integer
      description: 16-bit value
  hex_example: "03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect_value
      type: hex
      description: Hex code for aspect mode (see Appendix)
  hex_example: "03h 10h 00h 00h 05h 18h 00h 00h [DATA01] 00h [CKS]"

- id: lamp_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: adjustment_mode
      type: hex
      description: "00h=absolute, 01h=relative"
    - name: adjustment_value
      type: integer
      description: 16-bit value
  hex_example: "03h 10h 00h 00h 05h 96h FFh [DATA03] [DATA04] [DATA05] [CKS]"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: hex
      description: Key code from documented key code list
  hex_example: "02h 0Fh 00h 00h 02h [DATA01] 00h [CKS]"

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  hex_example: "02h 16h 00h 00h 00h 18h"

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  hex_example: "02h 17h 00h 00h 00h 19h"

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: target
      type: hex
      description: "06h=Periphery Focus"
    - name: direction
      type: hex
      description: "00h=Stop, 01h/02h/03h=plus, 7Fh=cont_plus, 81h=minus, FDh/FEh/FFh=minus_timed"
  hex_example: "02h 18h 00h 00h 02h [DATA01] [DATA02] [CKS]"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: control
      type: hex
      description: "FFh=Stop, else adjustment mode"
    - name: adjustment_mode
      type: hex
      description: "00h=absolute, 02h=relative"
    - name: adjustment_value
      type: integer
      description: 16-bit value
  hex_example: "02h 1Dh 00h 00h 04h [DATA01]-[DATA04] [CKS]"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: hex
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  hex_example: "02h 1Eh 00h 00h 01h [DATA01] [CKS]"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: hex
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  hex_example: "02h 1Fh 00h 00h 01h [DATA01] [CKS]"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: target
      type: hex
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: hex
      description: "00h=OFF, 01h=ON"
  hex_example: "02h 21h 00h 00h 02h [DATA01] [DATA02] [CKS]"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile_number
      type: hex
      description: "00h=Profile 1, 01h=Profile 2"
  hex_example: "02h 27h 00h 00h 01h [DATA01] [CKS]"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: eco_mode
      type: hex
      description: Hex code for eco mode (see Appendix)
  hex_example: "03h B1h 00h 00h 02h 07h [DATA01] [CKS]"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: projector_name
      type: string
      description: Up to 16 bytes, NUL-terminated
  hex_example: "03h B1h 00h 00h 12h 2Ch [DATA01-16] 00h [CKS]"

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: setting_type
      type: hex
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: hex
      description: Setting value (varies by setting_type)
  hex_example: "03h B1h 00h 00h 03h C5h [DATA01] [DATA02] [CKS]"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: hex
      description: "00h=OFF, 01h=ON"
  hex_example: "03h B1h 00h 00h 03h DFh 00h [DATA01] [CKS]"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: freeze
      type: hex
      description: "01h=ON, 02h=OFF"
  hex_example: "01h 98h 00h 00h 01h [DATA01] [CKS]"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: hex
      description: Hex code for input terminal
    - name: setting_value
      type: hex
      description: "00h=terminal_specified, 01h=BNC, 02h=COMPUTER"
  hex_example: "03h C9h 00h 00h 03h 09h [DATA01] [DATA02] [CKS]"

- id: error_status_request
  label: Error Status Request
  kind: query
  params: []
  hex_example: "00h 88h 00h 00h 00h 88h"

- id: information_request
  label: Information Request
  kind: query
  params: []
  hex_example: "03h 8Ah 00h 00h 00h 8Dh"

- id: filter_usage_info_request
  label: Filter Usage Information Request
  kind: query
  params: []
  hex_example: "03h 95h 00h 00h 00h 98h"

- id: lamp_info_request_3
  label: Lamp Information Request 3
  kind: query
  params:
    - name: lamp_number
      type: hex
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: hex
      description: "01h=usage_time, 04h=remaining_life"
  hex_example: "03h 96h 00h 00h 02h [DATA01] [DATA02] [CKS]"

- id: carbon_savings_request
  label: Carbon Savings Information Request
  kind: query
  params:
    - name: type
      type: hex
      description: "00h=Total, 01h=During operation"
  hex_example: "03h 9Ah 00h 00h 01h [DATA01] [CKS]"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: target
      type: hex
      description: "06h=Periphery Focus"
  hex_example: "02h 1Ch 00h 00h 02h [DATA01] 00h [CKS]"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: target
      type: hex
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  hex_example: "02h 20h 00h 00h 01h [DATA01] [CKS]"

- id: lens_info_request
  label: Lens Information Request
  kind: query
  params: []
  hex_example: "02h 22h 00h 00h 01h 00h 25h"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []
  hex_example: "02h 28h 00h 00h 00h 2Ah"

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  params:
    - name: adjusted_value_name
      type: hex
      description: "00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP"
  hex_example: "03h 05h 00h 00h 03h [DATA01] 00h 00h [CKS]"

- id: setting_request
  label: Setting Request
  kind: query
  params: []
  hex_example: "00h 85h 00h 00h 01h 00h 86h"

- id: running_status_request
  label: Running Status Request
  kind: query
  params: []
  hex_example: "00h 85h 00h 00h 01h 01h 87h"

- id: input_status_request
  label: Input Status Request
  kind: query
  params: []
  hex_example: "00h 85h 00h 00h 01h 02h 88h"

- id: mute_status_request
  label: Mute Status Request
  kind: query
  params: []
  hex_example: "00h 85h 00h 00h 01h 03h 89h"

- id: model_name_request
  label: Model Name Request
  kind: query
  params: []
  hex_example: "00h 85h 00h 00h 01h 04h 8Ah"

- id: cover_status_request
  label: Cover Status Request
  kind: query
  params: []
  hex_example: "00h 85h 00h 00h 01h 05h 8Bh"

- id: info_string_request
  label: Information String Request
  kind: query
  params:
    - name: info_type
      type: hex
      description: "03h=Horizontal sync freq, 04h=Vertical sync freq"
  hex_example: "00h D0h 00h 00h 03h 00h [DATA01] 01h [CKS]"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  params: []
  hex_example: "03h B0h 00h 00h 01h 07h BBh"

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []
  hex_example: "03h B0h 00h 00h 01h 2Ch E0h"

- id: lan_mac_address_request2
  label: LAN MAC Address Status Request 2
  kind: query
  params: []
  hex_example: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  params:
    - name: setting_type
      type: hex
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  hex_example: "03h B0h 00h 00h 02h C5h [DATA01] [CKS]"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  params: []
  hex_example: "03h B0h 00h 00h 02h DFh 00h 94h"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  params: []
  hex_example: "00h BFh 00h 00h 01h 00h C0h"

- id: serial_number_request
  label: Serial Number Request
  kind: query
  params: []
  hex_example: "00h BFh 00h 00h 02h 01h 06h C8h"

- id: basic_info_request
  label: Basic Information Request
  kind: query
  params: []
  hex_example: "00h BFh 00h 00h 01h 02h C2h"
```

## Feedbacks
```yaml
# Response format: [Response Header] [Model] [ID1] [ID2] [LEN] [ERR1] [ERR2] [CKS]
# Or with data: [Response Header] [Model] [ID1] [ID2] [LEN] [DATA...] [CKS]
# ERR1=00h/ERR2=00h = success; non-zero indicates error

- id: error_status_response
  label: Error Status Response
  type: object
  properties:
    - name: error_info
      type: bitfield
      description: 12 bytes of error information (see bit tables in section 3.1)

- id: general_response
  label: General Response
  type: object
  properties:
    - name: err1
      type: hex
      description: Error high byte
    - name: err2
      type: hex
      description: Error low byte
    - name: cks
      type: hex
      description: Checksum

- id: data_response
  label: Data Response
  type: object
  properties:
    - name: data
      type: bytes
      description: Variable length data (varies by command)

# Error codes (ERR1/ERR2):
# 00h/00h: Command not recognized
# 00h/01h: Command not supported by model
# 01h/00h: Invalid value
# 01h/01h: Invalid input terminal
# 01h/02h: Invalid language
# 02h/00h: Memory allocation error
# 02h/02h: Memory in use
# 02h/03h: Value cannot be set
# 02h/04h: Forced onscreen mute on
# 02h/06h: Viewer error
# 02h/07h: No signal
# 02h/08h: Test pattern or filter displayed
# 02h/09h: No PC card inserted
# 02h/0Ah: Memory operation error
# 02h/0Ch: Entry list displayed
# 02h/0Dh: Power is off
# 02h/0Eh: Command execution failed
# 02h/0Fh: No authority
# 03h/00h: Incorrect gain number
# 03h/01h: Invalid gain
# 03h/02h: Adjustment failed
```

## Variables
```yaml
# Source documents adjustable parameters via GAIN PARAMETER REQUEST 3:
- id: brightness
  label: Brightness
  type: integer
  range: [0, 255]  # UNRESOLVED: actual range not stated, inferred from 8-bit values

- id: contrast
  label: Contrast
  type: integer
  range: [0, 255]

- id: color
  label: Color
  type: integer
  range: [0, 255]

- id: hue
  label: Hue
  type: integer
  range: [0, 255]

- id: sharpness
  label: Sharpness
  type: integer
  range: [0, 255]

- id: volume
  label: Volume
  type: integer
  range: [0, 255]

- id: lamp_light_adjust
  label: Lamp/Light Adjust
  type: integer
  range: [0, 255]

- id: eco_mode
  label: Eco Mode
  type: enum
  values: [off, normal, eco, auto_eco, long_life, silent, boost]

- id: projector_name
  label: Projector Name
  type: string
  max_length: 16

- id: pip_mode
  label: PIP Mode
  type: enum
  values: [off, pip, picture_by_picture]

- id: edge_blending
  label: Edge Blending
  type: boolean

- id: lens_profile
  label: Lens Profile
  type: enum
  values: [profile_1, profile_2]
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited event notifications from the device
```

## Macros
```yaml
# Source documents standby mode requirements for receiving commands:
# Serial standby modes: Normal, Active, Eco, NORMAL, NETWORK STANDBY, SLEEP, OFF, ON, STANDBY POWER ON
# LAN standby modes: Normal, NORMAL, NETWORK STANDBY, SLEEP, HTBaseT STANDBY, OFF, ON, STANDBY POWER ON
# Some models only support certain standby modes for LAN vs serial control
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - name: power_on_block
    description: "While POWER ON command is executing, no other command can be accepted"
  - name: power_off_block
    description: "While POWER OFF command is executing (including cooling time), no other command can be accepted"
  - name: lens_stop
    description: "After sending 7Fh or 81h in lens control, stop driving by sending 00h"
# UNRESOLVED: safety warnings related to lamp replacement, dust exposure, or portrait cover orientation not explicitly documented
```

## Notes
- Command checksum (CKS) calculated as low-order one byte of sum of all preceding bytes
- Data length (LEN) indicates byte count of data portion following LEN
- Control ID (ID1) and Model Code (ID2) must match projector settings
- Standby mode must be properly set for device to accept commands via serial or LAN
- Lamp usage time updated at 1-minute intervals despite 1-second resolution
- Some commands return FFh for error conditions
<!-- UNRESOLVED: specific input terminal hex codes vary by model - source references appendix for full list -->
<!-- UNRESOLVED: base model type values not enumerated in source -->
<!-- UNRESOLVED: protocol version not stated in source -->
<!-- UNRESOLVED: HDBaseT standby mode availability not fully clarified -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:53:11.848Z
last_checked_at: 2026-05-14T18:17:18.999Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:18.999Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 54 hex-encoded command patterns match source section 3 verbatim; all transport parameters verified; no extra commands in source. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific model names within the UNKNOWN Series are not enumerated in the source"
- "flow control not stated in source"
- "actual range not stated, inferred from 8-bit values"
- "source does not document unsolicited event notifications from the device"
- "safety warnings related to lamp replacement, dust exposure, or portrait cover orientation not explicitly documented"
- "specific input terminal hex codes vary by model - source references appendix for full list"
- "base model type values not enumerated in source"
- "protocol version not stated in source"
- "HDBaseT standby mode availability not fully clarified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
