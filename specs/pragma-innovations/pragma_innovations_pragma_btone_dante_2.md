---
spec_id: admin/pragma_innovations-pragma_btone_dante_2
schema_version: ai4av-public-spec-v1
revision: 1
title: "PRAGMA Innovations Pragma BTone Dante 2 Control Spec"
manufacturer: "PRAGMA Innovations"
model_family: "Pragma BTone Dante 2"
aliases: []
compatible_with:
  manufacturers:
    - "PRAGMA Innovations"
  models:
    - "Pragma BTone Dante 2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pragma.swiss
source_urls:
  - https://pragma.swiss/assets/files/BTone-dante/PRAGMA-BTone-Dante-2-Control-Protocol-V1.2.2.pdf
retrieved_at: 2026-04-30T04:40:28.399Z
last_checked_at: 2026-06-02T22:13:19.502Z
generated_at: 2026-06-02T22:13:19.502Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Dante-specific control commands not documented in source"
  - "no input/output routing commands in source"
  - "no volume/gain controls in source"
  - "no safety warnings or interlock procedures in source"
  - "Dante network configuration commands not in source"
  - "firmware version compatibility not stated"
  - "binary command encoding not documented"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:13:19.502Z
  matched_actions: 38
  action_count: 38
  confidence: medium
  summary: "All 38 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# PRAGMA Innovations Pragma BTone Dante 2 Control Spec

## Summary
Bluetooth audio receiver with Dante 2 support. Communicates via UDP/IP on port 8006. Supports phone call control, audio playback control, and device configuration. Commands end with `<CR><LF>` (0x0D). Minimum idle time between commands is 1.5s.

<!-- UNRESOLVED: Dante-specific control commands not documented in source -->

## Transport
```yaml
protocols:
  - udp
addressing:
  port: 8006
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred: Info?, FW?, State?, Get_trackstate, Get_A2DPstate commands present
- routable  # UNRESOLVED: no input/output routing commands in source
- levelable  # UNRESOLVED: no volume/gain controls in source
```

## Actions
```yaml
- id: ping
  label: Ping Device
  kind: action
  params: []
- id: identify
  label: Identify Device
  kind: action
  params: []
- id: get_firmware_version
  label: Get Firmware Version
  kind: action
  params: []
- id: get_all_info
  label: Get All Information
  kind: action
  params: []
- id: get_name
  label: Get Name
  kind: action
  params: []
- id: set_name
  label: Set Name
  kind: action
  params:
    - name: name
      type: string
      description: Device name (max 30 characters)
- id: get_pin_state
  label: Get PIN State
  kind: action
  params: []
- id: set_pin_state
  label: Set PIN State
  kind: action
  params:
    - name: active
      type: boolean
      description: PIN active (true/false)
- id: get_pin_code
  label: Get PIN Code
  kind: action
  params: []
- id: set_pin_code
  label: Set PIN Code
  kind: action
  params:
    - name: pin
      type: string
      description: 4-character PIN code
- id: get_visibility
  label: Get Visibility
  kind: action
  params: []
- id: set_visibility
  label: Set Visibility
  kind: action
  params:
    - name: visible
      type: boolean
      description: "true = always visible/pairable, false = visible for 60s after button push"
- id: get_clear_paired_list
  label: Get Clear Paired List State
  kind: action
  params: []
- id: set_clear_paired_list
  label: Set Clear Paired List State
  kind: action
  params:
    - name: clear
      type: boolean
      description: "true = auto clear paired list after disconnect, false = FIFO (max 8 devices)"
- id: get_bluetooth_state
  label: Get Bluetooth State
  kind: action
  params: []
- id: open_pairing
  label: Open Pairing
  kind: action
  params: []
- id: close_pairing
  label: Close Pairing
  kind: action
  params: []
- id: release_all
  label: Release All Connections
  kind: action
  params: []
- id: clear_record
  label: Clear Paired Record List
  kind: action
  params: []
- id: dial
  label: Dial Number
  kind: action
  params:
    - name: number
      type: string
      description: Phone number to dial
- id: accept_call
  label: Accept Call
  kind: action
  params: []
- id: reject_call
  label: Reject/Hang Up Call
  kind: action
  params: []
- id: send_dtmf
  label: Send DTMF Code
  kind: action
  params:
    - name: code
      type: string
      description: DTMF code to send
- id: track_play
  label: Play Track
  kind: action
  params: []
- id: track_pause
  label: Pause Track
  kind: action
  params: []
- id: track_toggle_play_pause
  label: Toggle Play/Pause
  kind: action
  params: []
- id: track_stop
  label: Stop Track
  kind: action
  params: []
- id: track_fwd
  label: Skip Forward
  kind: action
  params: []
- id: track_bwd
  label: Skip Backwards
  kind: action
  params: []
- id: get_trackstate
  label: Get Track State
  kind: action
  params: []
- id: get_a2dp_state
  label: Get A2DP State
  kind: action
  params: []
- id: get_a2dp_encoder
  label: Get A2DP Encoder
  kind: action
  params: []
- id: get_button_state
  label: Get Button State
  kind: action
  params: []
- id: btn_enable
  label: Enable Button
  kind: action
  params: []
- id: btn_disable
  label: Disable Button
  kind: action
  params: []
- id: get_led_state
  label: Get LED State
  kind: action
  params: []
- id: led_enable
  label: Enable Button LED
  kind: action
  params: []
- id: led_disable
  label: Disable Button LED
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: pong
  type: string
  description: Pong response to ping
- id: identify_response
  type: string
  description: Device LEDs blink five times
- id: firmware_version
  type: string
  description: Firmware version string
- id: device_info
  type: object
  properties:
    - Name: string
    - Visible: boolean
    - PIN: string
    - PIN_active: boolean
    - Clear_paired_list: boolean
    - FW: string
- id: name_response
  type: string
- id: pin_active_response
  type: boolean
- id: pin_response
  type: string
- id: visible_response
  type: boolean
- id: clear_paired_list_response
  type: boolean
- id: bluetooth_state
  type: enum
  values: [Hidden, Connected, Waiting_for_connection]
- id: pairing_open
  type: string
- id: pairing_closed
  type: string
- id: released
  type: string
- id: cleared
  type: string
- id: call_accepted
  type: string
- id: call_rejected_hangup
  type: string
- id: connected_device
  type: object
  properties:
    - MAC: string
    - DeviceName: string
- id: incoming_call
  type: object
  properties:
    - number: string
    - Call_ID: string
- id: network_operator
  type: string
- id: signal_strength
  type: integer
  values: [0, 1, 2, 3, 4, 5]
- id: battery
  type: integer
  values: [0, 1, 2, 3, 4, 5]
- id: track_stat
  type: object
  properties:
    - state: integer
      values: [0, 1, 2]
      description: "0 = Stopped, 1 = Playing, 2 = Paused"
    - elapsed_ms: integer
    - total_ms: integer
- id: track_info
  type: object
  properties:
    - Artist: string
    - Title: string
    - Album: string
- id: a2dp_state
  type: integer
  values: [0, 1, 2, 3, 4]
  description: "0 = unsupported, 1 = standby, 2 = connecting, 3 = connected, 4 = streaming"
- id: a2dp_encoder
  type: integer
  values: [0, 1, 2, 3, 4, 5, 6, 7, 8]
  description: "0 = invalid, 1 = SBC, 2 = MP3, 3 = AAC, 4 = Faststream, 5 = aptX, 6 = aptX-Sprint, 7 = aptX-HD, 8 = aptX-LL"
- id: button_state
  type: enum
  values: [Enabled, Disabled]
- id: led_state
  type: enum
  values: [Enabled, Disabled]
- id: wrong_command
  type: string
  description: Response for unknown command
- id: error_no_bt_device
  type: string
  description: No BT device connected error
- id: name_too_long_error
  type: string
- id: pin_too_short_error
  type: string
```

## Variables
```yaml
# Device configuration stored on device, settable via commands:
# - Name (string, max 30 chars)
# - PIN (4 chars)
# - PIN_active (boolean)
# - Visible (boolean)
# - Clear_paired_list (boolean)
```

## Events
```yaml
# Auto responses (unsolicited) from device:
- id: connected_device_auto
  description: Auto response when phone connects
  properties:
    - MAC: string
    - DeviceName: string
- id: incoming_call_auto
  description: Auto response on incoming call
  properties:
    - number: string
    - Call_ID: string
- id: network_operator_auto
  description: Network operator of connected device
  properties:
    - operator: string
- id: signal_strength_auto
  description: Signal strength of connected device
  properties:
    - strength: integer (0-5)
- id: battery_auto
  description: Battery level of connected device
  properties:
    - level: integer (0-5)
- id: track_stat_auto
  description: Auto track state update (polled at interval)
  properties:
    - state: integer (0-2)
    - elapsed_ms: integer
    - total_ms: integer
- id: track_info_auto
  description: Auto track info update
  properties:
    - Artist: string
    - Title: string
    - Album: string
```

## Macros
```yaml
# No explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command terminator: `<CR><LF>` (0x0D). Minimum idle time between commands: 1.5s. Unknown command returns `Wrong_command!`. Device is a Bluetooth audio receiver supporting A2DP profile with various codecs (SBC, MP3, AAC, aptX family). Phone control supports dial, accept/reject calls, and DTMF. Audio player supports play/pause/stop/skip. Visibility mode `false` makes device pairable for 60s after button push. Paired device list supports max 8 devices (FIFO). PIN is 4 characters when active.
<!-- UNRESOLVED: Dante network configuration commands not in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: binary command encoding not documented -->

## Provenance

```yaml
source_domains:
  - pragma.swiss
source_urls:
  - https://pragma.swiss/assets/files/BTone-dante/PRAGMA-BTone-Dante-2-Control-Protocol-V1.2.2.pdf
retrieved_at: 2026-04-30T04:40:28.399Z
last_checked_at: 2026-06-02T22:13:19.502Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:13:19.502Z
matched_actions: 38
action_count: 38
confidence: medium
summary: "All 38 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Dante-specific control commands not documented in source"
- "no input/output routing commands in source"
- "no volume/gain controls in source"
- "no safety warnings or interlock procedures in source"
- "Dante network configuration commands not in source"
- "firmware version compatibility not stated"
- "binary command encoding not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
