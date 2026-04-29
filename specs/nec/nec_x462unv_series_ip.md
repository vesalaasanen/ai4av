---
schema_version: ai4av-public-spec-v1
device_id: nec/x462unv-series
entity_id: nec_x462unv_series
spec_id: admin/nec-x462unv_series
revision: 1
author: admin
title: "NEC X462UNV Series Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: "X462UNV Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "X462UNV Series"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_x462unv_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-26T21:39:59.737Z
retrieved_at: 2026-04-26T21:39:59.737Z
last_checked_at: 2026-04-26T21:39:59.737Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-26T21:39:59.737Z
  matched_actions: 64
  action_count: 64
  confidence: high
  summary: "Every spec action has a literal hex match in the source; all transport parameters verified; source command catalogue fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC X462UNV Series Control Spec

## Summary
NEC X462UNV Series professional projector supporting both RS-232C serial and wired LAN (TCP/IP) control. Commands are sent as hexadecimal-encoded packets with checksum validation. Power on/off, input routing, picture/sound/onscreen mute, lens control,eco mode, and extensive query commands are documented.

<!-- UNRESOLVED: complete input terminal code table not included — appendix references supplementary documentation -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # TCP port stated in source
serial:
  baud_rate: 115200  # auto-switchable: 115200/38400/19200/9600/4800 bps — highest rate listed
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # power on/off commands present
- routable        # input switching commands present
- queryable       # extensive status/information request commands present
- levelable       # volume, brightness, contrast, color, hue, sharpness, lamp adjust present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: Turns on projector power. No other command accepted during power-on sequence.
  hex: "02h 00h 00h 00h 00h 02h"

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Turns off projector power. No other command accepted during cooling time.
  hex: "02h 01h 00h 00h 00h 03h"

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal hex code (e.g., 06h=VIDEO, A1h=HDMI, 01h=COMPUTER, 20h=LAN)
  hex: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  hex: "02h 10h 00h 00h 00h 12h"

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []
  hex: "02h 11h 00h 00h 00h 13h"

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  hex: "02h 12h 00h 00h 00h 14h"

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []
  hex: "02h 13h 00h 00h 00h 15h"

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  hex: "02h 14h 00h 00h 00h 16h"

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []
  hex: "02h 15h 00h 00h 00h 17h"

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: "16-bit signed adjustment value (low-order then high-order 8 bits)"
  hex: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: "16-bit signed adjustment value (low-order then high-order 8 bits)"
  hex: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: "Aspect mode hex code (see appendix for values)"
  hex: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: value
      type: integer
      description: "16-bit signed adjustment value"
  hex: "03h 10h 00h 00h 05h 96h FFh <DATA03> <DATA04> <DATA05> <CKS>"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "2-byte key code (DATA01=DATA01, DATA02=00h). See key code table for values."
  hex: "02h 0Fh 00h 00h 02h <DATA01> 00h <CKS>"

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  hex: "02h 16h 00h 00h 00h 18h"

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  hex: "02h 17h 00h 00h 00h 19h"

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: content
      type: integer
      description: "06h=Periphery Focus; then DATA02: 00h=Stop, 01h/02h/03h=drive plus 1/0.5/0.25s, 7Fh=cont plus, 81h=cont minus, FDh/FEh/FFh=drive minus 0.25/0.5/1s"
  hex: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: "FFh=Stop; else DATA02: 00h=Absolute, 02h=Relative; DATA03-04=16-bit value"
    - name: mode
      type: integer
      description: "00h=Absolute value, 02h=Relative value"
    - name: value
      type: integer
      description: "16-bit adjustment value"
  hex: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  hex: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  hex: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"
  hex: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"
  hex: "02h 27h 00h 00h 01h <DATA01> <CKS>"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=On, 02h=Off"
  hex: "01h 98h 00h 00h 01h <DATA01> <CKS>"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "Eco mode hex code (see appendix for values: 00h=OFF, 01h=Normal, 02h=ECO, etc.)"
  hex: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)"
  hex: "03h B1h 00h 00h 12h 2Ch <DATA01-16> 00h <CKS>"

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "Setting value (varies by target)"
  hex: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=ON"
  hex: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal hex code"
    - name: source
      type: integer
      description: "00h=Terminal in DATA01, 01h=BNC, 02h=COMPUTER"
  hex: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"

- id: lamp_information_request
  label: Lamp Information Request 3
  kind: query
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"
  hex: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  params: []
  hex: "03h B0h 00h 00h 01h 07h BBh"

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []
  hex: "03h B0h 00h 00h 01h 2Ch E0h"

- id: lan_mac_address_request
  label: LAN MAC Address Status Request 2
  kind: query
  params: []
  hex: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  hex: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  params: []
  hex: "03h B0h 00h 00h 02h DFh 00h 94h"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  params: []
  hex: "00h BFh 00h 00h 01h 00h C0h"

- id: serial_number_request
  label: Serial Number Request
  kind: query
  params: []
  hex: "00h BFh 00h 00h 02h 01h 06h C8h"

- id: basic_information_request
  label: Basic Information Request
  kind: query
  params: []
  hex: "00h BFh 00h 00h 01h 02h C2h"
- id: error_status_cmd
  label: Error Status Request
  kind: query
  params: []
  description: Gets information about errors occurring in the projector.
  hex: "00h 88h 00h 00h 00h 88h"

- id: projector_information_cmd
  label: Information Request
  kind: query
  params: []
  hex: "03h 8Ah 00h 00h 00h 8Dh"

- id: filter_usage_info_cmd
  label: Filter Usage Information Request
  kind: query
  params: []
  hex: "03h 95h 00h 00h 00h 98h"

- id: gain_parameter_request_cmd
  label: Gain Parameter Request 3
  kind: query
  params:
    - name: gain_name
      type: integer
      description: "00h=BRIGHTNESS, 01h=CONTRAST, ..."
  hex: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"

- id: setting_request_cmd
  label: Setting Request
  kind: query
  params: []
  hex: "00h 85h 00h 00h 01h 00h 86h"

- id: running_status_cmd
  label: Running Status Request
  kind: query
  params: []
  hex: "00h 85h 00h 00h 01h 01h 87h"

- id: input_status_cmd
  label: Input Status Request
  kind: query
  params: []
  hex: "00h 85h 00h 00h 01h 02h 88h"

- id: mute_status_cmd
  label: Mute Status Request
  kind: query
  params: []
  hex: "00h 85h 00h 00h 01h 03h 89h"

- id: model_name_cmd
  label: Model Name Request
  kind: query
  params: []
  hex: "00h 85h 00h 00h 01h 04h 8Ah"

- id: cover_status_cmd
  label: Cover Status Request
  kind: query
  params: []
  hex: "00h 85h 00h 00h 01h 05h 8Bh"

- id: information_string_cmd
  label: Information String Request
  kind: query
  params:
    - name: info_type
      type: integer
  hex: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status Request
  type: bitfield
  description: "Returns 12 bytes of error status bits (cover, fan, temperature, power, lamp, etc.)"
  hex_response: "A0h 88h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"

- id: power_state_response
  label: Power Status (via Running Status Request)
  type: enum
  values:
    - "00h: Standby"
    - "01h: Power on"
    - "05h: Cooling"
    - "06h: Standby (error)"
    - "0Fh: Standby (Power saving)"
    - "10h: Network standby"

- id: running_status
  label: Running Status Request
  type: object
  fields:
    - name: power_status
      type: enum
      values: ["00h: Standby", "01h: Power on", "05h: Cooling", "06h: Standby (error)", "0Fh: Standby (Power saving)", "10h: Network standby"]
    - name: cooling_process
      type: enum
      values: ["00h: Not executed", "01h: During execution", "FFh: Not supported"]
    - name: power_on_off_process
      type: enum
      values: ["00h: Not executed", "01h: During execution", "FFh: Not supported"]
    - name: operation_status
      type: enum
      values: ["00h: Standby (Sleep)", "04h: Power on", "05h: Cooling", "06h: Standby (error)", "0Fh: Standby (Power saving)", "10h: Network standby", "FFh: Not supported"]

- id: input_status
  label: Input Status Request
  type: object
  fields:
    - name: signal_switch_process
      type: enum
      values: ["00h: Not executed", "01h: During execution", "FFh: Not supported"]
    - name: signal_list_number
      type: integer
      description: "0-199 (add 1 to get practical number)"
    - name: selection_signal_type_1
      type: integer
    - name: selection_signal_type_2
      type: integer
      description: "01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 05h=Reserved, 07h=VIEWER(1-5), 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 23h=VIEWER(6-10), C4h=SDI, BFh=HDBaseT, FFh=Not Source Input"
    - name: content_displayed
      type: enum
      values: ["00h: Video signal displayed", "01h: No signal", "02h: Viewer displayed", "03h: Test pattern displayed", "04h: LAN displayed", "FFh: Not supported"]

- id: mute_status
  label: Mute Status Request
  type: object
  fields:
    - name: picture_mute
      type: enum
      values: ["00h: Off", "01h: On"]
    - name: sound_mute
      type: enum
      values: ["00h: Off", "01h: On"]
    - name: onscreen_mute
      type: enum
      values: ["00h: Off", "01h: On"]
    - name: forced_onscreen_mute
      type: enum
      values: ["00h: Off", "01h: On"]

- id: model_name
  label: Model Name Request
  type: string
  description: "Up to 32 characters, NUL-terminated"

- id: cover_status
  label: Cover Status Request
  type: enum
  values: ["00h: Normal (cover opened)", "01h: Cover closed"]

- id: projector_information
  label: Information Request
  type: object
  description: "Returns projector name, lamp usage time (seconds), filter usage time (seconds)"
  hex_response: "23h 8Ah <ID1> <ID2> 62h <DATA01-98> <CKS>"

- id: filter_usage_info
  label: Filter Usage Information Request
  type: object
  description: "Returns filter usage time (seconds) and filter alarm start time (seconds); -1 if undefined"
  hex_response: "23h 95h <ID1> <ID2> 08h <DATA01-08> <CKS>"

- id: carbon_savings_info
  label: Carbon Savings Information Request
  type: object
  fields:
    - name: carbon_savings_kg
      type: number
      description: "Maximum 99999 kg"
    - name: carbon_savings_mg
      type: number
      description: "Maximum 999999 mg"

- id: lens_control_request
  label: Lens Control Request
  type: object
  description: "Returns upper limit, lower limit, and current value for lens position"
  hex_response: "22h 1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02-07> <CKS>"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  type: object
  fields:
    - name: load_by_signal
      type: enum
      values: ["00h: OFF", "01h: ON"]
    - name: forced_mute
      type: enum
      values: ["00h: OFF", "01h: ON"]

- id: lens_information
  label: Lens Information Request
  type: bitfield
  description: "Returns lens memory, zoom, focus, lens shift H/V operation status"
  hex_response: "22h 22h <ID1> <ID2> 02h 00h <DATA01> <CKS>"

- id: lens_profile_request
  label: Lens Profile Request
  type: enum
  values: ["00h: Profile 1", "01h: Profile 2"]

- id: gain_parameter_request
  label: Gain Parameter Request 3
  type: object
  description: "Returns adjustment status, range limits, default, current value, adjustment width"
  hex_response: "23h 05h <ID1> <ID2> 10h <DATA01-16> <CKS>"

- id: information_string
  label: Information String Request
  type: string
  description: "Horizontal/vertical sync frequency strings (English)"

- id: setting_request
  label: Setting Request
  type: object
  fields:
    - name: sound_function
      type: enum
      values: ["00h: Not available", "01h: Available"]
    - name: clock_timer_function
      type: enum
      values: ["00h: Not available", "01h: Clock function", "02h: Sleep timer function", "03h: Clock and Sleep timer"]
```

## Variables
```yaml
# UNRESOLVED: variables are typically settable parameters not tied to discrete actions.
# The document describes gain parameters (brightness, contrast, volume, etc.) as action params
# rather than independent variables. No standalone settable variables identified beyond
# the action parameters already listed above.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification messages documented.
# Device only responds to commands; no push-style status updates are described.
```

## Macros
```yaml
# No explicit multi-step macros documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Power on: no other command accepted while power-on sequence executes"
  - description: "Power off: no other command accepted during power-off/cooling sequence"
  - description: "Lens continue drive: sending same command without stop continues driving"
  - description: "Some models require specific standby modes to receive commands via serial or LAN (Normal, Active, Eco, NETWORK STANDBY, SLEEP, OFF, ON, STANDBY POWER ON)"
# UNRESOLVED: specific voltage/current/power specifications not provided in this control protocol document
```

## Notes

**Command packet structure:** All commands use hex notation. Common structure: `[HEADER] [CMD] [ID1] [ID2] [LEN] [DATA...] [CKS]`. Response format varies by command type (A0h/22h/23h prefix with error codes or data).

**Checksum calculation:** Add all preceding bytes, take low-order 8 bits as checksum.

**Standby mode requirements:** Some models require specific standby modes (Normal, NETWORK STANDBY, SLEEP, etc.) to accept serial or LAN commands. Supported modes differ between serial and LAN connections.

**Key code reference (selected):** POWER ON=0200h, POWER OFF=0300h, MENU=0600h, UP=0700h, DOWN=0800h, ENTER=0B00h, MUTE=1300h, VOLUME UP=2900h, VOLUME DOWN=2A00h, ASPECT=A300h, SOURCE=D700h, LAMP MODE/ECO=EE00h

<!-- UNRESOLVED: complete appendix values for input terminals, aspect modes, and eco modes vary by model — only partial tables provided -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: authentication credentials or tokens not described (no auth appears required) -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_x462unv_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-26T21:39:59.737Z
retrieved_at: 2026-04-26T21:39:59.737Z
last_checked_at: 2026-04-26T21:39:59.737Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T21:39:59.737Z
matched_actions: 64
action_count: 64
confidence: high
summary: "Every spec action has a literal hex match in the source; all transport parameters verified; source command catalogue fully represented."
```

## Known Gaps

```yaml
[]
```
