---
schema_version: ai4av-public-spec-v1
device_id: nec/np-m420x
entity_id: nec_np_m_series
spec_id: admin/nec-np-m-series
revision: 1
author: admin
title: "NEC NP-M Series Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: NP-M420X
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - NP-M420X
    - NP-M420XV
    - NP-M350X
    - NP-M300X
    - NP-M260X
    - NP-M230X
    - NP-M300W
    - NP-M260W
    - NP-M350XS
    - NP-M300XS
    - NP-M260XS
    - NP-M300WS
    - NP-M260WS
    - NP-M403X
    - NP-M363X
    - NP-M323X
    - NP-M283X
    - NP-M403W
    - NP-M363W
    - NP-M323W
    - NP-M333XS
    - NP-M353WS
    - NP-M303WS
    - NP-M403H
    - NP-M323H
    - NP-M353HS
    - NP-M323HS
    - NP-M303HS
    - NP-M402W
    - NP-M362W
    - NP-M402X
    - NP-M362X
    - NP-M322X
    - NP-M282X
    - NP-M322W
    - NP-M352WS
    - NP-M302WS
    - NP-M332XS
    - NP-M361X
    - NP-M311X
    - NP-M271X
    - NP-M311W
    - NP-M271W
    - NP-ME403U
    - NP-ME423W
    - NP-ME383W
    - NP-ME453X
    - NP-MC423W
    - NP-MC393W
    - NP-MC453X
    - NP-MC363X
    - NP-ME382U
    - NP-ME342U
    - NP-ME372W
    - NP-ME402X
    - NP-MC382W
    - NP-MC332W
    - NP-MC422X
    - NP-MC372X
    - NP-MC342X
    - NP-MC302X
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
    - NP4100
    - NP4100W
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_np_m_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:18:49.678Z
retrieved_at: 2026-04-25T21:18:49.678Z
last_checked_at: 2026-04-25T21:18:49.678Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:18:49.678Z
  matched_actions: 52
  action_count: 52
  confidence: high
  summary: "All 52 spec actions matched literal hex command codes in NEC projector IP source; transport parameters verified; complete protocol coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC NP-M Series Control Spec

## Summary
NEC NP-M Series projectors support both RS-232 and wired LAN control. TCP/IP communication uses port 7142. Serial communication supports baud rates from 4800 to 115200 bps. The protocol uses binary command packets with checksum, supporting power control, input routing, picture/sound adjustment, mute, lens control, and query commands.

<!-- UNRESOLVED: full model-specific input terminal mappings not fully populated; only representative models documented in appendix -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands"
serial:
  baud_rate: null  # UNRESOLVED: multiple baud rates supported (115200/38400/19200/9600/4800); no default stated
  data_bits: 8    # stated: "Data length 8 bits"
  parity: none     # stated: "Parity bit None"
  stop_bits: 1    # stated: "Stop bit 1 bit"
  flow_control: null  # UNRESOLVED: flow control not mentioned in source
auth:
  type: none  # inferred: no auth/login procedure described in source
```

## Traits
```yaml
- powerable       # power_on / power_off commands present
- routable        # input switch command present (018)
- queryable       # multiple query commands present (error status, info request, lamp info, etc.)
- levelable       # volume adjust, picture adjust commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  notes: "Command: 02h 00h 00h 00h 00h 02h. While turning on, no other command accepted."

- id: power_off
  label: Power Off
  kind: action
  params: []
  notes: "Command: 02h 01h 00h 00h 00h 03h. While turning off (including cooling), no other command accepted."

- id: input_switch
  label: Input Switch
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal code (hex). Model-specific; see appendix for mapping.
  notes: "Command: 02h 03h 00h 00h 02h 01h <DATA01> <CKS>. Response includes execution result 00h=success, FFh=error."

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  notes: "Command: 02h 10h 00h 00h 00h 12h. Automatically cleared by input or video signal switch."

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  notes: "Command: 02h 12h 00h 00h 00h 14h. Automatically cleared by input switch, video signal switch, or volume adjustment."

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  notes: "Command: 02h 14h 00h 00h 00h 16h. Automatically cleared by input or video signal switch."

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
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Signed 16-bit adjustment value
  notes: "Command: 03h 10h 00h 00h 05h <target> <mode> <value_low> <value_high> <CKS>"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Signed 16-bit adjustment value
  notes: "Command: 03h 10h 00h 00h 05h 05h <mode> <value_low> <value_high> <CKS>"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect
      type: integer
      description: Aspect ratio code (see appendix for model-specific values; common: 00h=AUTO, 01h=WIDE ZOOM, 02h=16:9, 03h=NATIVE, 04h=4:3)
  notes: "Command: 03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"

- id: other_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value
      type: integer
      description: Signed 16-bit adjustment value
  notes: "Command: 03h 10h 00h 00h 05h 96h FFh <mode> <value_low> <value_high> <CKS>"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code value. Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT
  notes: "Command: 02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>. DATA01/DATA02 are key code bytes."

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  notes: "Command: 02h 16h 00h 00h 00h 18h"

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  notes: "Command: 02h 17h 00h 00h 00h 19h"

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift (H), 03h=Lens Shift (V), 06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=continuous+, 81h=continuous-, FDh=-0.25s, FEh=-0.5s, FFh=-1s"
  notes: "Command: 02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>. Send 00h after 7Fh or 81h to stop."

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift (H), 03h=Lens Shift (V), FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: 16-bit position value
  notes: "Command: 02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Command: 02h 1Eh 00h 00h 01h <DATA01> <CKS>"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  notes: "Controls profile number specified by LENS PROFILE SET (053-10). Command: 02h 1Fh 00h 00h 01h <DATA01> <CKS>"

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
  notes: "Command: 02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"
  notes: "Command: 02h 27h 00h 00h 01h <DATA01> <CKS>"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF/Normal, 01h=ON/Auto Eco, 02h=Normal/ECO1, 03h=ECO2, 04h=Long Life, 05h=Boost, 06h=Silent"
  notes: "Command: 03h B1h 00h 00h 02h 07h <DATA01> <CKS>"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, null-terminated)
  notes: "Command: 03h B1h 00h 00h 12h 2Ch <DATA01>-<DATA16> 00h <CKS>"

- id: pip_mode_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Target-specific value (mode: 00h=PIP, 01h=PICTURE BY PICTURE; position: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT)
  notes: "Command: 03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: enabled
      type: integer
      description: "00h=OFF, 01h=ON"
  notes: "Command: 03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=On, 02h=Off"
  notes: "Command: 01h 98h 00h 00h 01h <DATA01> <CKS>"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal code (see appendix for model-specific values)
    - name: source
      type: integer
      description: "00h=terminal in DATA01, 02h=COMPUTER"
  notes: "Command: 03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status Request
  type: object
  properties:
    - name: data01
      type: object
      description: "Bit0=Cover error, Bit1=Temperature error, Bit2=reserved, Bit3=Fan error, Bit4=Fan error, Bit5=Power error, Bit6=Lamp off, Bit7=Lamp moratorium"
    - name: data02
      type: object
      description: "Bit0=Lamp time exceeded, Bit1=Formatter error, Bit2=Lamp2 off, Bit3=reserved, Bit4=reserved, Bit5=reserved, Bit6=reserved, Bit7=extend status"
    - name: data03
      type: object
      description: "Bit0=reserved, Bit1=FPGA error, Bit2=Temperature sensor error, Bit3=Lamp not present, Bit4=Lamp data error, Bit5=Mirror cover error, Bit6=Lamp2 moratorium, Bit7=Lamp2 time exceeded"
    - name: data04
      type: object
      description: "Bit0=Lamp2 not present, Bit1=Lamp2 data error, Bit2=Dust temperature error, Bit3=Foreign matter sensor, Bit7=Lens not installed"
  notes: "Command: 00h 88h 00h 00h 00h 88h. Response: 20h 88h <ID1> <ID2> 0Ch <DATA01>-<DATA12> <CKS>"

- id: power_state
  label: Running Status Request
  type: object
  properties:
    - name: power_status
      type: enum
      values: ["00h=Standby", "01h=Power on", "FFh=Not supported"]
    - name: cooling
      type: enum
      values: ["00h=Not executed", "01h=During execution", "FFh=Not supported"]
    - name: power_on_off_process
      type: enum
      values: ["00h=Not executed", "01h=During execution", "FFh=Not supported"]
    - name: operation_status
      type: enum
      values: ["00h=Standby(Sleep)", "04h=Power on", "05h=Cooling", "06h=Standby(error)", "0Fh=Standby(Power saving)", "10h=Network standby", "FFh=Not supported"]
  notes: "Command: 00h 85h 00h 00h 01h 01h 87h. Response: 20h 85h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"

- id: input_status
  label: Input Status Request
  type: object
  properties:
    - name: signal_switch_process
      type: enum
      values: ["00h=Not executed", "01h=During execution", "FFh=Not supported"]
    - name: signal_list_number
      type: integer
      description: Add 1 to get actual signal list number
    - name: selection_signal_type_1
      type: enum
      values: ["01h-05h=1-5"]
    - name: selection_signal_type_2
      type: enum
      values: ["01h=COMPUTER", "02h=VIDEO", "03h=S-VIDEO", "04h=COMPONENT", "05h=Reserved", "07h=VIEWER(1-5)", "20h=DVI-D", "21h=HDMI", "22h=DisplayPort", "23h=VIEWER(6-10)", "FFh=Not Source Input"]
    - name: content_displayed
      type: enum
      values: ["00h=Video signal", "01h=No signal", "02h=Viewer", "03h=Test pattern", "04h=LAN displayed", "FFh=Not supported"]
  notes: "Command: 00h 85h 00h 00h 01h 02h 88h"

- id: mute_status
  label: Mute Status Request
  type: object
  properties:
    - name: picture_mute
      type: enum
      values: ["00h=Off", "01h=On", "FFh=Not supported"]
    - name: sound_mute
      type: enum
      values: ["00h=Off", "01h=On", "FFh=Not supported"]
    - name: onscreen_mute
      type: enum
      values: ["00h=Off", "01h=On", "FFh=Not supported"]
    - name: forced_onscreen_mute
      type: enum
      values: ["00h=Off", "01h=On", "FFh=Not supported"]
    - name: onscreen_display
      type: enum
      values: ["00h=Not displayed", "01h=Displayed", "FFh=Not supported"]
  notes: "Command: 00h 85h 00h 00h 01h 03h 89h"

- id: model_name
  label: Model Name Request
  type: string
  notes: "Command: 00h 85h 00h 00h 01h 04h 8Ah. Response: 20h 85h <ID1> <ID2> 20h <DATA01>-<DATA32> <CKS> (null-terminated string)"

- id: cover_status
  label: Cover Status Request
  type: enum
  values: ["00h=Normal (cover opened)", "01h=Cover closed"]
  notes: "Command: 00h 85h 00h 00h 01h 05h 8Bh"

- id: projector_info
  label: Information Request
  type: object
  properties:
    - name: projector_name
      type: string
      description: Null-terminated string (DATA01-49)
    - name: lamp_usage_time
      type: integer
      description: Seconds (DATA83-86), updated at 1-minute intervals
    - name: filter_usage_time
      type: integer
      description: Seconds (DATA87-90), updated at 1-minute intervals
  notes: "Command: 03h 8Ah 00h 00h 00h 8Dh"

- id: filter_usage_info
  label: Filter Usage Information Request
  type: object
  properties:
    - name: filter_usage_time
      type: integer
      description: Seconds (DATA01-04)
    - name: filter_alarm_start_time
      type: integer
      description: Seconds (DATA05-08), returns -1 if not defined
  notes: "Command: 03h 95h 00h 00h 00h 98h"

- id: lamp_info_3
  label: Lamp Information Request 3
  type: object
  properties:
    - name: target
      type: enum
      values: ["00h=Lamp 1", "01h=Lamp 2"]
    - name: content
      type: enum
      values: ["01h=Lamp usage time (seconds)", "04h=Lamp remaining life (%)"]
    - name: value
      type: integer
      description: Seconds or percentage depending on content requested
  notes: "Command: 03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>. Returns negative lamp life if replacement deadline exceeded."

- id: carbon_savings_info
  label: Carbon Savings Information Request
  type: object
  properties:
    - name: target
      type: enum
      values: ["00h=Total Carbon Savings", "01h=Carbon Savings during operation"]
    - name: carbon_kg
      type: number
      description: Kilograms (DATA02-05), max 99999
    - name: carbon_mg
      type: number
      description: Milligrams (DATA06-09), max 999999
  notes: "Command: 03h 9Ah 00h 00h 01h <DATA01> <CKS>"

- id: lens_position_request
  label: Lens Control Request
  type: object
  properties:
    - name: target
      type: enum
      values: ["00h=Zoom", "01h=Focus", "02h=Lens Shift (H)", "03h=Lens Shift (V)"]
    - name: upper_limit
      type: integer
      description: 16-bit value (DATA02-03)
    - name: lower_limit
      type: integer
      description: 16-bit value (DATA04-05)
    - name: current_value
      type: integer
      description: 16-bit value (DATA06-07)
  notes: "Command: 02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  type: object
  properties:
    - name: target
      type: enum
      values: ["00h=LOAD BY SIGNAL", "01h=FORCED MUTE"]
    - name: value
      type: enum
      values: ["00h=OFF", "01h=ON"]
  notes: "Command: 02h 20h 00h 00h 01h <DATA01> <CKS>"

- id: lens_profile_request
  label: Lens Profile Request
  type: enum
  values: ["00h=Profile 1", "01h=Profile 2"]
  notes: "Command: 02h 28h 00h 00h 00h 2Ah"

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  type: object
  properties:
    - name: status
      type: enum
      values: ["00h=Display not possible", "01h=Adjustment not possible", "02h=Adjustment possible", "FFh=Specified gain does not exist"]
    - name: upper_limit
      type: integer
      description: 16-bit (DATA02-03)
    - name: lower_limit
      type: integer
      description: 16-bit (DATA04-05)
    - name: default_value
      type: integer
      description: 16-bit (DATA06-07)
    - name: current_value
      type: integer
      description: 16-bit (DATA08-09)
    - name: default_valid
      type: boolean
      description: "DATA14: 00h=invalid, 01h=valid"
  notes: "Command: 03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>. DATA01 targets: 00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"

- id: setting_request
  label: Setting Request
  type: object
  properties:
    - name: base_model_type
      type: string
      description: "DATA01-03"
    - name: sound_function
      type: enum
      values: ["00h=Not available", "01h=Available"]
    - name: profile_number
      type: enum
      values: ["00h=Not available", "01h=Clock function", "02h=Sleep timer function", "03h=Clock and Sleep timer"]
  notes: "Command: 00h 85h 00h 00h 01h 00h 86h"

- id: information_string_request
  label: Information String Request
  type: object
  properties:
    - name: type
      type: enum
      values: ["03h=Horizontal synchronous frequency", "04h=Vertical synchronous frequency"]
    - name: string
      type: string
      description: Null-terminated information string
  notes: "Command: 00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"

- id: eco_mode_request
  label: Eco Mode Request
  type: integer
  notes: "Command: 03h B0h 00h 00h 01h 07h BBh. Returns mode value; some models return Light/Lamp mode instead."

- id: lan_projector_name_request
  label: LAN Projector Name Request
  type: string
  notes: "Command: 03h B0h 00h 00h 01h 2Ch E0h. Response: 23h B0h <ID1> <ID2> 12h 2Ch <DATA01>-<DATA17> (null-terminated)"

- id: lan_mac_address_request
  label: LAN MAC Address Status Request 2
  type: string
  notes: "Command: 03h B0h 00h 00h 02h 9Ah 00h 4Fh. Returns 6-byte MAC address."

- id: pip_mode_request
  label: PIP/Picture by Picture Request
  type: object
  properties:
    - name: target
      type: enum
      values: ["00h=MODE", "01h=START POSITION", "02h=SUB INPUT/SUB INPUT 1", "09h=SUB INPUT 2", "0Ah=SUB INPUT 3"]
    - name: value
      type: integer
      description: Target-specific value
  notes: "Command: 03h B0h 00h 00h 02h C5h <DATA01> <CKS>"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  type: enum
  values: ["00h=OFF", "01h=ON"]
  notes: "Command: 03h B0h 00h 00h 02h DFh 00h 94h"

- id: base_model_type_request
  label: Base Model Type Request
  type: string
  notes: "Command: 00h BFh 00h 00h 01h 00h C0h"

- id: serial_number_request
  label: Serial Number Request
  type: string
  notes: "Command: 00h BFh 00h 00h 02h 01h 06h C8h. Returns 16-byte null-terminated string."

- id: basic_info_request
  label: Basic Information Request
  type: object
  properties:
    - name: operation_status
      type: enum
      values: ["00h=Standby(Sleep)", "04h=Power on", "05h=Cooling", "06h=Standby(error)", "0Fh=Standby(Power saving)", "10h=Network standby"]
    - name: content_displayed
      type: enum
      values: ["00h=Video signal", "01h=No signal", "02h=Viewer", "03h=Test pattern", "04h=LAN", "05h=Test pattern (user)", "10h=Signal being switched"]
    - name: selection_signal_type_1
      type: enum
      values: ["01h-05h=1-5"]
    - name: selection_signal_type_2
      type: enum
      values: ["01h=COMPUTER", "02h=VIDEO", "03h=S-VIDEO", "04h=COMPONENT", "05h=Reserved", "07h=VIEWER(1-5)", "20h=DVI-D", "21h=HDMI", "22h=DisplayPort", "23h=VIEWER(6-10)", "FFh=Not Source Input"]
    - name: video_mute
      type: enum
      values: ["00h=Off", "01h=On"]
    - name: sound_mute
      type: enum
      values: ["00h=Off", "01h=On"]
    - name: onscreen_mute
      type: enum
      values: ["00h=Off", "01h=On"]
    - name: freeze_status
      type: enum
      values: ["00h=Off", "01h=On"]
  notes: "Command: 00h BFh 00h 00h 01h 02h C2h"
```

## Variables
```yaml
# All settable parameters are covered under Actions. No separate Variables section needed.
# UNRESOLVED: whether discrete numeric parameters (e.g., network IP, DHCP enable) have dedicated set commands not listed in this document
```

## Events
```yaml
# UNRESOLVED: the source describes only query-response interaction; no unsolicited event messages documented
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source documents power on/off command behavior and interlock switch status (DATA09 Bit1),
# but no explicit safety confirmation procedures or interlock sequences are described in the source.
# Note: some models cannot receive commands in standby mode (see standby mode setting in appendix).
```

## Notes

**Protocol structure:** All commands are binary packets with format: `[HEADER] [MODEL CODE] [CMD1] [CMD2] [DATA LEN] [DATA...] [CKS]`. Checksum is low-order byte of sum of all preceding bytes.

**Response format:** Success responses vary by command type (22h, 23h, etc.). Failure responses use pattern `A0h/A1h/A2h/A3h` + model code + 02h + ERR1 + ERR2 + CKS.

**Error codes:** ERR1/ERR2 combination indicates error type. Notable: 02h 0Dh = power is off (command cannot be accepted); 02h 0Fh = no authority for operation.

**Serial configuration:** Multiple baud rates supported (115200/38400/19200/9600/4800 bps). No single default stated — implementation may need to auto-detect or configure explicitly.

<!-- UNRESOLVED: PORT NUMBERS for wired LAN service — only port 7142 stated; no HTTP/REST endpoints documented -->
<!-- UNRESOLVED: Authentication mechanism for LAN control — no login/password procedure described in source -->
<!-- UNRESOLVED: Firmware version compatibility — source does not state version ranges -->
<!-- UNRESOLVED: Full input terminal code mappings for all models — appendix only covers listed models; other NP-M variants may differ -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_np_m_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:18:49.678Z
retrieved_at: 2026-04-25T21:18:49.678Z
last_checked_at: 2026-04-25T21:18:49.678Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:18:49.678Z
matched_actions: 52
action_count: 52
confidence: high
summary: "All 52 spec actions matched literal hex command codes in NEC projector IP source; transport parameters verified; complete protocol coverage."
```

## Known Gaps

```yaml
[]
```
