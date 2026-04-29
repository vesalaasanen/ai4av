---
schema_version: ai4av-public-spec-v1
device_id: viewsonic/viewsonic-commercial-cdxxxx
entity_id: viewsonic_viewsonic_viewboard_digital_displays_and_all_in_one_led_displays
spec_id: admin/viewsonic-commercial-cdxxxx
revision: 1
author: admin
title: "ViewSonic Commercial CDxxxx RS232 Control Spec"
status: published
manufacturer: ViewSonic
manufacturer_key: viewsonic
model_family: "ViewSonic Commercial CDxxxx"
aliases: []
compatible_with:
  manufacturers:
    - ViewSonic
  models:
    - "ViewSonic Commercial CDxxxx"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
  - https://manualslib.com/manual/3900742/Viewsonic-Cdx5562.html
  - https://viewsonic.com/us/cdx5562.html
source_documents:
  - title: "ViewSonic public source"
    url: https://viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T10:13:22.864Z
  - title: "ViewSonic public source"
    url: https://manualslib.com/manual/3900742/Viewsonic-Cdx5562.html
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-29T10:13:23.426Z
  - title: "ViewSonic public source"
    url: https://viewsonic.com/us/cdx5562.html
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-29T10:13:23.540Z
  - title: "ViewSonic public source"
    url: https://viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-29T10:18:36.499Z
  - title: "ViewSonic public source"
    url: https://viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T10:24:07.729Z
retrieved_at: 2026-04-29T10:24:07.729Z
last_checked_at: 2026-04-23T08:29:48.090Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T08:29:48.090Z
  matched_actions: 39
  action_count: 39
  confidence: high
  summary: "All 39 spec commands verified against source with exact command codes; transport parameters confirmed verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# ViewSonic Commercial CDxxxx RS232 Control Spec

## Summary
ViewSonic Commercial CDxxxx series LCD displays with RS232 control interface. Supports two protocols: Protocol 1 (with display ID for multi-display control) and Protocol 2 (without ID for single display or Network Media Player control). Both protocols provide Set-Function, Get-Function, and Remote Control pass-through modes.

<!-- UNRESOLVED: TCP/IP, HTTP, or other network protocols not addressed in source — RS-232 only -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # stated: "9600bps (fixed)"
  data_bits: 8     # stated: "8bits (fixed)"
  parity: none     # stated: "Parity: None (fixed)"
  stop_bits: 1     # stated: "Stop Bits: 1(fixed)"
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: power on/standby commands present
- queryable       # inferred: Get-Function commands present
- levelable       # inferred: volume, brightness, contrast, color, tint, bass, treble, balance control present
- routable        # inferred: input select commands present
```

## Actions
```yaml
# Protocol 1 (with ID) — 11-byte packet: [Length][ID][Type][Command][Value1][Value2][Value3][CR]
# Protocol 2 (without ID) — 5-byte packet: [Length][Command][Value1][Value2][Value3][CR]
# Type "s" (0x73) = Set Command
- id: power_set
  label: Power
  kind: action
  params:
    - name: state
      type: integer
      description: 000=STBY (standby), 001=ON
  protocol_notes: Protocol 1 packet length 8; Protocol 2 packet length 5

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: input
      type: integer
      description: "000=VGA, 001=HDMI, 002=DVI-D, 003=AV, 004=YPbPr, 005=S-Video"
  protocol_notes: Protocol 1 packet length 8; Protocol 2 packet length 5

- id: contrast_set
  label: Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: "Range: 000~100"
  protocol_notes: Protocol 1 packet length 8; Protocol 2 packet length 5

- id: brightness_set
  label: Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: "Range: 000~100"
  protocol_notes: Protocol 1 packet length 8; Protocol 2 packet length 5

- id: sharpness_set
  label: Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: "Range: 000~100"
  protocol_notes: Protocol 1 packet length 8; Protocol 2 packet length 5

- id: color_set
  label: Color
  kind: action
  params:
    - name: value
      type: integer
      description: "Range: 000~100"
  protocol_notes: Protocol 1 packet length 8; Protocol 2 packet length 5

- id: tint_set
  label: Tint
  kind: action
  params:
    - name: value
      type: integer
      description: "Range: 000~100"
  protocol_notes: Protocol 1 packet length 8; Protocol 2 packet length 5

- id: bass_set
  label: Bass
  kind: action
  params:
    - name: value
      type: integer
      description: "Range: 000~100"
  protocol_notes: Protocol 1 packet length 8; Protocol 2 packet length 5

- id: treble_set
  label: Treble
  kind: action
  params:
    - name: value
      type: integer
      description: "Range: 000~100"
  protocol_notes: Protocol 1 packet length 8; Protocol 2 packet length 5

- id: balance_set
  label: Balance
  kind: action
  params:
    - name: value
      type: integer
      description: "Range: 000~100"
  protocol_notes: Protocol 1 packet length 8; Protocol 2 packet length 5

- id: picture_size_set
  label: Picture Size
  kind: action
  params:
    - name: mode
      type: integer
      description: "000=FULL, 001=NORMAL, 002=CUSTOM, 003=DYNAMIC, 004=REAL"
  protocol_notes: Protocol 1 packet length 8; Protocol 2 packet length 5

- id: osd_language_set
  label: OSD Language
  kind: action
  params:
    - name: language
      type: integer
      description: "000=English, 001=French, 002=Spanish, 003=German, 004=Italian, 005=Simplified Chinese, 006=Russian, 007=Polish, 008=Turkish"
  protocol_notes: Protocol 1 packet length 8; Protocol 2 packet length 5

- id: osd_timeout_set
  label: OSD Timeout
  kind: action
  params:
    - name: seconds
      type: integer
      description: "Range: 005~120 seconds"
  protocol_notes: Protocol 1 packet length 8; Protocol 2 packet length 5

- id: volume_set
  label: Volume
  kind: action
  params:
    - name: value
      type: integer
      description: "Range: 000~100"
  protocol_notes: Protocol 1 packet length 8; Protocol 2 packet length 5

- id: mute_set
  label: Mute
  kind: action
  params:
    - name: state
      type: integer
      description: "000=OFF (unmuted), 001=ON (muted)"
  protocol_notes: Protocol 1 packet length 8; Protocol 2 packet length 5

- id: off_timer_set
  label: Off Timer
  kind: action
  params:
    - name: hours
      type: integer
      description: "000=OFF, 001~024=hours"
  protocol_notes: Protocol 1 packet length 8; Protocol 2 packet length 5

- id: pip_mode_set
  label: PIP Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "000=OFF, 001=PIP, 002=POP, 003=PBP, 004=PBPA"
  protocol_notes: Protocol 1 packet length 8; Protocol 2 packet length 5

- id: pip_sound_select_set
  label: PIP Sound Select
  kind: action
  params:
    - name: source
      type: integer
      description: "000=Main, 001=PIP"
  protocol_notes: Protocol 1 packet length 8; Protocol 2 packet length 5

- id: pip_position_set
  label: PIP Position
  kind: action
  params:
    - name: position
      type: integer
      description: "000=Up, 001=Down, 002=Left, 003=Right"
  protocol_notes: Protocol 1 packet length 8; Protocol 2 packet length 5

- id: pip_input_set
  label: PIP Input
  kind: action
  params:
    - name: input
      type: integer
      description: "000=VGA, 001=HDMI, 002=DVI-D, 003=AV, 004=YPbPr, 005=S-Video"
  protocol_notes: Protocol 1 packet length 8; Protocol 2 packet length 5

- id: monitor_id_set
  label: Monitor ID
  kind: action
  params:
    - name: id
      type: integer
      description: "Range: 001~026"
  protocol_notes: Protocol 1 only; Protocol 2 packet length 5

- id: key_pad_set_protocol1
  label: Key Pad (Protocol 1)
  kind: action
  params:
    - name: key
      type: integer
      description: "000=POWER, 001=SOURCE, 002=MENU/EXIT, 003=UP, 004=DOWN, 005=LEFT, 006=RIGHT, 007=MUTE"
  protocol_notes: Protocol 1 only; simulates front-panel button press

- id: remote_control_set
  label: Remote Control Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "000=Disable, 001=Enable, 002=Pass through"
  protocol_notes: "Disable: RCU has no effect. Enable: RCU controls HDTV (default). Pass through: RCU commands forwarded to PC via RS232"

- id: key_pad_set_protocol2
  label: Key Pad (Protocol 2)
  kind: action
  params:
    - name: control
      type: integer
      description: "000=Disable, 001=Enable"
  protocol_notes: Protocol 2 only; controls front-panel key pad

- id: factory_reset
  label: Factory Reset
  kind: action
  params:
    - name: dummy
      type: integer
      description: "0 = perform factory reset"
  protocol_notes: Protocol 1 packet length 8; Protocol 2 packet length 5

- id: rcu_passthrough_send
  label: RCU Pass-through (LCD to PC)
  kind: event
  params:
    - name: rcu_code1
      type: integer
      description: "RCU code MSB (HEX)"
    - name: rcu_code2
      type: integer
      description: "RCU code LSB (HEX)"
  protocol_notes: "LCD monitor sends 3-byte packet when RCU button pressed while in Pass-through mode: [Length=3][RCU-Code1][RCU-Code2][CR]"
```

## Feedbacks
```yaml
# Positive ACK: "+" (0x2B) followed by CR (0x0D)
# Negative ACK: "-" (0x2D) followed by CR (0x0D)
- id: command_ack
  label: Command Acknowledgement
  type: enum
  values:
    - "+"  # valid command
    - "-"  # invalid command
  protocol_notes: "Monitor sends ACK after every received command"

- id: power_status
  label: Power Status
  type: enum
  values:
    - "000"  # STBY (standby)
    - "001"  # ON
  query_command: l (0x6C)  # Get-Power status

- id: input_status
  label: Input Status
  type: enum
  values:
    - "000"  # VGA
    - "001"  # HDMI
    - "002"  # DVI-D
    - "003"  # AV
    - "004"  # YPbPr
    - "005"  # S-Video
  query_command: j (0x6A)  # Get-Input select

- id: contrast_value
  label: Contrast Value
  type: integer
  range: "000~100"
  query_command: a (0x61)  # Get-Contrast

- id: brightness_value
  label: Brightness Value
  type: integer
  range: "000~100"
  query_command: b (0x62)  # Get-Brightness

- id: sharpness_value
  label: Sharpness Value
  type: integer
  range: "000~100"
  query_command: c (0x63)  # Get-Sharpness

- id: color_value
  label: Color Value
  type: integer
  range: "000~100"
  query_command: d (0x64)  # Get-Color

- id: tint_value
  label: Tint Value
  type: integer
  range: "000~100"
  query_command: e (0x65)  # Get-Tint

- id: volume_value
  label: Volume Value
  type: integer
  range: "000~100"
  query_command: f (0x66)  # Get-Volume

- id: mute_status
  label: Mute Status
  type: enum
  values:
    - "000"  # OFF (unmuted)
    - "001"  # ON (muted)
  query_command: g (0x67)  # Get-Mute

- id: rcu_mode_status
  label: RCU Mode Status
  type: enum
  values:
    - "000"  # Disable
    - "001"  # Enable
    - "002"  # Pass through
  query_command: h (0x68)  # Get-RCU

- id: key_pad_status
  label: Key Pad Status
  type: enum
  values:
    - "000"  # Disable
    - "001"  # Enable
  query_command: i (0x69)  # Get-Key Pad

- id: communication_test
  label: Communication Test (Get-ACK)
  type: enum
  values:
    - "+"  # link OK
    - "-"  # link failed
  query_command: z (0x7A)  # Get-ACK
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters outside action commands identified in source
```

## Events
```yaml
# RCU Pass-through Events (LCD monitor -> PC)
- id: rcu_button_press
  label: RCU Button Press
  params:
    - name: key_code
      type: string
      description: "2-byte HEX code from RCU key mapping table"
  description: "When Remote Control is set to Pass-through mode (002), LCD sends this event when RCU button is pressed. RCU has no effect on display; all codes are forwarded to PC."
  key_code_map:
    Size: "0F"
    "Volume Up (+)": "10"
    "Volume Down (-)": "11"
    Mute: "12"
    POWER: "15"
    INPUT: "16"
    "PIP ON/OFF": "17"
    MENU: "1A"
    Up: "1B"
    Down: "1C"
    Left(-): "1D"
    Right(+): "1E"
    SET: "1F"
    "PIP INPUT": "20"
    "PIP CHANGE": "21"
    "PICTURE MODE": "22"
    "AUDIO INPUT": "23"
    "SCREEN SAVER MOTION": "24"
    "SCREEN SAVER BRIGHTNESS": "25"
    DISPLAY: "26"
    "AUTO SETUP": "27"
    EXIT: "28"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements stated in source
```

## Notes
- Protocol 1 (with ID): 11-byte command packet including 2-byte display ID. Broadcast to all displays with ID "99" (no reply returned).
- Protocol 2 (without ID): 5-byte command packet, no ID. Best for single display control or ViewSonic Network Media Players.
- Serial port: DE-9 Male connector. Requires null modem (crossover) cable for PC connection.
- All numeric values are ASCII encoded (0x30-0x39 for digits 0-9).
- Remote Control pass-through mode: When enabled, display RCU button presses are sent to PC instead of controlling the display.
<!-- UNRESOLVED: TCP/IP, HTTP, or web-based control protocols not documented in source -->
<!-- UNRESOLVED: maximum cable length, operating temperature, or electrical specifications not stated -->
<!-- UNRESOLVED: firmware update procedure not described in source -->

## Provenance

```yaml
source_urls:
  - https://viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
  - https://manualslib.com/manual/3900742/Viewsonic-Cdx5562.html
  - https://viewsonic.com/us/cdx5562.html
source_documents:
  - title: "ViewSonic public source"
    url: https://viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T10:13:22.864Z
  - title: "ViewSonic public source"
    url: https://manualslib.com/manual/3900742/Viewsonic-Cdx5562.html
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-29T10:13:23.426Z
  - title: "ViewSonic public source"
    url: https://viewsonic.com/us/cdx5562.html
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-29T10:13:23.540Z
  - title: "ViewSonic public source"
    url: https://viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-29T10:18:36.499Z
  - title: "ViewSonic public source"
    url: https://viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T10:24:07.729Z
retrieved_at: 2026-04-29T10:24:07.729Z
last_checked_at: 2026-04-23T08:29:48.090Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:29:48.090Z
matched_actions: 39
action_count: 39
confidence: high
summary: "All 39 spec commands verified against source with exact command codes; transport parameters confirmed verbatim."
```

## Known Gaps

```yaml
[]
```
