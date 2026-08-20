---
spec_id: admin/aurora-dxw3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Aurora DXW-3 Control Spec"
manufacturer: Aurora
model_family: DXW-3
aliases: []
compatible_with:
  manufacturers:
    - Aurora
  models:
    - DXW-3
    - DXW-3EUH
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.avprosupply.com
  - manualslib.com
source_urls:
  - https://files.avprosupply.com/files/attachments/509404/aurora-multimedia-dxw-3-b-manual.pdf
  - https://files.avprosupply.com/files/attachments/3706/aurora-multimedia-dxw-3-w-manual.pdf
  - https://www.manualslib.com/manual/2325888/Aurora-Dxw-3-Series.html
  - https://www.manualslib.com/products/Aurora-Dxw-3-Series-12014385.html
retrieved_at: 2026-08-07T23:07:06.191Z
last_checked_at: 2026-08-19T08:28:18.701Z
generated_at: 2026-08-19T08:28:18.701Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "any major gaps below are marked inline"
  - "flow control not stated in source"
  - "source documents ?20UL query but gives no example response string; values inferred from set command range"
  - "source documents ?20DH query but gives no example response string"
  - "source documents ?20NP query but gives no example response string"
  - "source documents ?20PSp,b query but gives no example response string; format unstated"
  - "source documents ?20CSp query but gives no example response string; format unstated"
  - "no enumerated parameter ranges beyond action params documented as separate variables"
  - "no explicit multi-step macro sequences documented in source"
  - "no safety warnings or interlock procedures explicitly documented in source beyond the USB cable length guidance (CAT 6A for >220ft) and AWV-mode signal-loss caveat."
  - "firmware compatibility ranges for individual commands (DH/NP/PS/CS require v1.21+) are noted but not enumerated as a strict spec field."
  - "literal response strings for USB length, HDCP disable, button-press disable, button-press serial string, and cable-disconnect timer queries are not shown in source."
verification:
  verdict: verified
  checked_at: 2026-08-19T08:28:18.701Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 spec actions match wire-literal command strings in the source; transport parameters (9600 8N1, no flow control) are sourced verbatim. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-01
---

# Aurora DXW-3 Control Spec

## Summary
The Aurora DXW-3 Series is a 3-input (VGA, HDMI, DisplayPort) HDBaseT wall-plate extender switcher with auto-sense and AWV (Audio without Video) features. This spec covers the RS-232 control protocol used to configure inputs, button LED behavior, auto-sense, AWV, USB extension length, HDCP handling, and to query device state.

<!-- UNRESOLVED: any major gaps below are marked inline -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # factory default; settable via !20BR command to 2400/4800/9600/19200/38400/57600/115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable  # inferred: input select / button push commands present
- queryable  # inferred: query commands returning state present
```

## Actions
```yaml
- id: set_baud_rate
  label: Baud Rate Setup
  kind: action
  command: "!20BR{y},{a},{b}\r"
  params:
    - name: y
      type: integer
      description: Port number (1 = HDBaseT, 2 = Rear Port)
    - name: a
      type: enum
      values: [2400, 4800, 9600, 19200, 38400, 57600, 115200]
      description: Baud rate
    - name: b
      type: enum
      values: ["8N1", "8E1", "8O1"]
      description: Data bits, parity, stop bits

- id: set_button_led
  label: Button LED Setup
  kind: action
  command: "!20BL{y},{z1},{z2}\r"
  params:
    - name: y
      type: integer
      description: Button number (1 = VGA, 2 = HDMI, 3 = DisplayPort)
    - name: z1
      type: enum
      values: [R, G, B, N]
      description: Released LED state (R=Red, G=Green, B=Blue, N=None)
    - name: z2
      type: enum
      values: [R, G, B, N]
      description: Pushed LED state (R=Red, G=Green, B=Blue, N=None)

- id: button_push
  label: Button Push
  kind: action
  command: "!20BP{x}\r"
  params:
    - name: x
      type: integer
      description: Button number 1-3 (1 = VGA, 2 = HDMI, 3 = DisplayPort)

- id: set_auto_sense
  label: Auto Sense Mode
  kind: action
  command: "!20AS{x}\r"
  params:
    - name: x
      type: enum
      values: [0, 1]
      description: 1 = on, 0 = off

- id: set_awv_mode
  label: AWV Mode
  kind: action
  command: "!20AW{x}\r"
  params:
    - name: x
      type: enum
      values: [0, 1]
      description: 1 = on, 0 = off

- id: set_usb_length
  label: USB Length
  kind: action
  command: "!20UL{x}\r"
  params:
    - name: x
      type: enum
      values: [1, 2, 3]
      description: USB extension length (1 = <197ft/60m, 2 = 180-220ft/60-67m, 3 = 220-262ft/67-80m)

- id: set_hdmi_hdcp_disable
  label: HDMI IN HDCP Disable (v1.21 & above)
  kind: action
  command: "!20DH{x}\r"
  params:
    - name: x
      type: enum
      values: [0, 1]
      description: 0 = Normal, 1 = HDCP Input disable

- id: set_button_press_disable
  label: Button Press Disable (v1.21 & above)
  kind: action
  command: "!20NP{x}\r"
  params:
    - name: x
      type: enum
      values: [0, 1]
      description: 0 = Normal, 1 = Disable Physical Button Press

- id: set_button_press_serial_string
  label: Button Press Serial String (v1.21 & above)
  kind: action
  command: "!20PS{p},{b},{z}\r"
  params:
    - name: p
      type: integer
      description: Serial port 1 or 2
    - name: b
      type: enum
      values: [1, 2]
      description: Button number 1 or 3 (per source table header; factory defaults list button 1 and button 2)
    - name: z
      type: string
      description: URL-encoded serial string to send on button press (empty string disables)

- id: set_cable_disconnect_timer_string
  label: Cable Disconnect Timer String (v1.21 & above)
  kind: action
  command: "!20CS{p},{d},{z}\r"
  params:
    - name: p
      type: integer
      description: Serial port 1 or 2
    - name: d
      type: integer
      description: No-cable message trigger delay in seconds (>0)
    - name: z
      type: string
      description: URL-encoded serial string for no-cable detected (empty string disables)

- id: query_baud_rate
  label: Query Baud Rate
  kind: query
  command: "?20BR{x}\r"
  params:
    - name: x
      type: integer
      description: Port number 1 or 2

- id: query_firmware_revision
  label: Query Firmware Revision
  kind: query
  command: "?20FM\r"

- id: query_button_state
  label: Query Button State
  kind: query
  command: "?20BP\r"

- id: query_button_led
  label: Query Button LED
  kind: query
  command: "?20BL{y}\r"
  params:
    - name: y
      type: integer
      description: Button number 1-3 (1 = VGA, 2 = HDMI, 3 = DisplayPort)

- id: query_auto_sense
  label: Query Auto Sense Mode
  kind: query
  command: "?20AS\r"

- id: query_awv_mode
  label: Query AWV Mode
  kind: query
  command: "?20AW\r"

- id: query_usb_length
  label: Query USB Length
  kind: query
  command: "?20UL\r"

- id: query_hdmi_hdcp_disable
  label: Query HDMI IN HDCP Disable
  kind: query
  command: "?20DH\r"

- id: query_button_press_disable
  label: Query Button Press Disable
  kind: query
  command: "?20NP\r"

- id: query_button_press_serial_string
  label: Query Button Press Serial String
  kind: query
  command: "?20PS{p},{b}\r"
  params:
    - name: p
      type: integer
      description: Serial port 1 or 2
    - name: b
      type: integer
      description: Button number

- id: query_cable_disconnect_timer_string
  label: Query Cable Disconnect Timer String
  kind: query
  command: "?20CS{p}\r"
  params:
    - name: p
      type: integer
      description: Serial port 1 or 2
```

## Feedbacks
```yaml
- id: baud_rate_response
  type: string
  description: Baud rate query response, e.g. ~20BR1,9600,8N1

- id: firmware_revision
  type: string
  description: Firmware revision string, e.g. ~20FM-2.1

- id: button_state
  type: enum
  values: ["1", "2", "3"]
  description: Currently selected button (1=VGA, 2=HDMI, 3=DisplayPort), e.g. ~20BP2

- id: button_led_state
  type: string
  description: LED release/push state pair, e.g. ~20BL1,G,R

- id: auto_sense_state
  type: enum
  values: ["0", "1"]
  description: Auto-sense state, e.g. ~20AS0

- id: awv_mode_state
  type: enum
  values: ["0", "1"]
  description: AWV mode state, e.g. ~20AW0

- id: input_change_notification
  type: string
  description: Response string sent on RS-232 ports whenever the active source changes (per Auto-Sense description)

- id: usb_length_response
  type: enum
  values: ["1", "2", "3"]
  description: USB length query response.  # UNRESOLVED: source documents ?20UL query but gives no example response string; values inferred from set command range

- id: hdcp_disable_response
  type: enum
  values: ["0", "1"]
  description: HDMI IN HDCP disable query response.  # UNRESOLVED: source documents ?20DH query but gives no example response string

- id: button_press_disable_response
  type: enum
  values: ["0", "1"]
  description: Button press disable query response.  # UNRESOLVED: source documents ?20NP query but gives no example response string

- id: button_press_serial_string_response
  type: string
  description: Button press serial string query response.  # UNRESOLVED: source documents ?20PSp,b query but gives no example response string; format unstated

- id: cable_disconnect_timer_response
  type: string
  description: Cable disconnect timer string query response.  # UNRESOLVED: source documents ?20CSp query but gives no example response string; format unstated
```

## Variables
```yaml
# UNRESOLVED: no enumerated parameter ranges beyond action params documented as separate variables
```

## Events
```yaml
- id: source_change_notification
  description: When the active source changes, the unit sends a response string on both RS-232 ports indicating the new input.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in source
- id: factory_reset
  label: Factory Reset (physical)
  description: Hold both front buttons for 5 seconds; both buttons turn cyan to confirm. All stored settings revert to factory defaults.

- id: firmware_update_mode
  label: Firmware Update Mode (physical)
  description: Press and hold both front buttons while applying power to force update mode. Requires null-modem serial cable (RX-TX, TX-RX, GND-GND) to PC connected at rear RS-232 or HDBaseT receiver RS-232. Use Aurora DXW-3 Update Utility (www.auroramm.com) to transfer file.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures explicitly documented in source beyond the USB cable length guidance (CAT 6A for >220ft) and AWV-mode signal-loss caveat.
```

## Notes
- Fixed address `20` is required for DXW commands when firmware is at or above revision 1.21; below 1.21 the address must be omitted. Response always appears on both ports; without address the command still works but both ports emit the response.
- The DXW-3EUH model uses the 2-position green power connector as DEV_DET input and ground; only remote (HDBaseT) power works on that variant.
- AWV mode sends a 640x480 VGA signal to enable audio over HDMI when no video is present; installations relying on loss of signal to switch displays on/off will not work with AWV enabled.
- Baud rate and serial format are configurable per-port; factory default 9600 8N1.
- RS-232 commands can be sent to either the local rear port or the remote HDBaseT receiver port.
- RS-232 connector is a 4-pin 3.81mm Euro style; RS-232 hardware supports 300–115200 bps. The RS-232 line carries a 5V supply intended to power an Aurora DXB-8 8-button wall plate.
- HDBaseT link accepts CAT 5e/6/6A; CAT 6A shielded required for runs over 600ft.
- Power: 24V DC local supply; if the paired Aurora receiver supplies power over HDBaseT, local power is not required.
- USB extender pairs: DXE-USB-H1 for DXW-3 (3EU), DXE-USB-D1P for DXW-3EUH (3EUH). Max USB extension 220ft (3EU) / 150ft (3EUH) with CAT 6.
<!-- UNRESOLVED: firmware compatibility ranges for individual commands (DH/NP/PS/CS require v1.21+) are noted but not enumerated as a strict spec field. -->
<!-- UNRESOLVED: literal response strings for USB length, HDCP disable, button-press disable, button-press serial string, and cable-disconnect timer queries are not shown in source. -->

## Provenance

```yaml
source_domains:
  - files.avprosupply.com
  - manualslib.com
source_urls:
  - https://files.avprosupply.com/files/attachments/509404/aurora-multimedia-dxw-3-b-manual.pdf
  - https://files.avprosupply.com/files/attachments/3706/aurora-multimedia-dxw-3-w-manual.pdf
  - https://www.manualslib.com/manual/2325888/Aurora-Dxw-3-Series.html
  - https://www.manualslib.com/products/Aurora-Dxw-3-Series-12014385.html
retrieved_at: 2026-08-07T23:07:06.191Z
last_checked_at: 2026-08-19T08:28:18.701Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:28:18.701Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 spec actions match wire-literal command strings in the source; transport parameters (9600 8N1, no flow control) are sourced verbatim. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "any major gaps below are marked inline"
- "flow control not stated in source"
- "source documents ?20UL query but gives no example response string; values inferred from set command range"
- "source documents ?20DH query but gives no example response string"
- "source documents ?20NP query but gives no example response string"
- "source documents ?20PSp,b query but gives no example response string; format unstated"
- "source documents ?20CSp query but gives no example response string; format unstated"
- "no enumerated parameter ranges beyond action params documented as separate variables"
- "no explicit multi-step macro sequences documented in source"
- "no safety warnings or interlock procedures explicitly documented in source beyond the USB cable length guidance (CAT 6A for >220ft) and AWV-mode signal-loss caveat."
- "firmware compatibility ranges for individual commands (DH/NP/PS/CS require v1.21+) are noted but not enumerated as a strict spec field."
- "literal response strings for USB length, HDCP disable, button-press disable, button-press serial string, and cable-disconnect timer queries are not shown in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
