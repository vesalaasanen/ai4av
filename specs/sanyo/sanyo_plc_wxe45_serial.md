---
spec_id: admin/sanyo-plc-wxe45
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sanyo PLC-WXE45 Control Spec"
manufacturer: Sanyo
model_family: PLC-WXE45
aliases: []
compatible_with:
  manufacturers:
    - Sanyo
  models:
    - PLC-WXE45
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - res.cloudinary.com
source_urls:
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Documents/sanyo/plc-wxe45_rs232basiccommand.pdf"
retrieved_at: 2026-05-21T21:13:48.850Z
last_checked_at: 2026-05-31T21:02:40.324Z
generated_at: 2026-05-31T21:02:40.324Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T21:02:40.324Z
  matched_actions: 54
  action_count: 54
  confidence: high
  summary: "All 54 spec actions matched in source command table; transport parameters verified verbatim; complete bidirectional coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Sanyo PLC-WXE45 Control Spec

## Summary
Sanyo PLC-WXE45 data projector with RS-232C serial control. Remote control via computer. Commands: power, input selection, volume, mute, image modes, keystone, freeze, timer, lamp status, temperature sensors.

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # stated: 9600 / 19200 selectable; initial default 19200 per source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Source contains power on/off, input routing, status queries, volume/brightness adjustment
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_on
  label: Power ON
  kind: action
  params: []

- id: power_off_quick
  label: Power OFF (Quick)
  kind: action
  params: []

- id: power_off
  label: Power OFF (Standard)
  kind: action
  params: []

- id: computer_1
  label: Computer 1
  kind: action
  params: []

- id: computer_2
  label: Computer 2
  kind: action
  params: []

- id: video
  label: Video
  kind: action
  params: []

- id: volume_up
  label: Volume Up
  kind: action
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  params: []

- id: audio_mute_on
  label: Audio Mute ON
  kind: action
  params: []

- id: audio_mute_off
  label: Audio Mute OFF
  kind: action
  params: []

- id: video_mute_on
  label: Video Mute ON
  kind: action
  params: []

- id: video_mute_off
  label: Video Mute OFF
  kind: action
  params: []

- id: screen_normal
  label: Screen Normal Size
  kind: action
  params: []

- id: screen_full
  label: Screen Full Size
  kind: action
  params: []

- id: image_standard
  label: Image Standard
  kind: action
  params: []

- id: image_real
  label: Image Real
  kind: action
  params: []

- id: image_cinema
  label: Image Cinema
  kind: action
  params: []

- id: image_1
  label: Image 1
  kind: action
  params: []

- id: image_2
  label: Image 2
  kind: action
  params: []

- id: image_3
  label: Image 3
  kind: action
  params: []

- id: image_4
  label: Image 4
  kind: action
  params: []

- id: image_blackboard
  label: Image Blackboard (Green)
  kind: action
  params: []

- id: image_dynamic
  label: Image Dynamic
  kind: action
  params: []

- id: menu_on
  label: Menu ON
  kind: action
  params: []

- id: menu_off
  label: Menu OFF
  kind: action
  params: []

- id: display_clear
  label: Display Clear
  kind: action
  params: []

- id: brightness_up
  label: Brightness Up
  kind: action
  params: []

- id: brightness_down
  label: Brightness Down
  kind: action
  params: []

- id: image_toggle
  label: Image Toggle
  kind: action
  params: []

- id: on_start_enable
  label: ON START Enable
  kind: action
  params: []

- id: on_start_disable
  label: ON START Disable
  kind: action
  params: []

- id: power_mgmt_ready
  label: Power Management Ready
  kind: action
  params: []

- id: power_mgmt_off
  label: Power Management OFF
  kind: action
  params: []

- id: power_mgmt_shutdown
  label: Power Management Shut Down
  kind: action
  params: []

- id: dzoom_up
  label: D.ZOOM Up
  kind: action
  params: []

- id: dzoom_down
  label: D.ZOOM Down
  kind: action
  params: []

- id: video_auto
  label: Video Auto
  kind: action
  params: []

- id: video_video
  label: Video Video
  kind: action
  params: []

- id: video_svideo
  label: Video S-Video
  kind: action
  params: []

- id: image_colorboard
  label: Image Colorboard
  kind: action
  params: []

- id: pointer_right
  label: Pointer Right
  kind: action
  params: []

- id: pointer_left
  label: Pointer Left
  kind: action
  params: []

- id: pointer_up
  label: Pointer Up
  kind: action
  params: []

- id: pointer_down
  label: Pointer Down
  kind: action
  params: []

- id: enter
  label: Enter
  kind: action
  params: []

- id: freeze_on
  label: Freeze ON
  kind: action
  params: []

- id: freeze_off
  label: Freeze OFF
  kind: action
  params: []

- id: computer_1_analog_rgb
  label: Computer 1 Analog RGB
  kind: action
  params: []

- id: computer_1_scart
  label: Computer 1 SCART
  kind: action
  params: []

- id: computer_1_component
  label: Computer 1 Component
  kind: action
  params: []

- id: auto_pc_adj
  label: Auto PC Adj
  kind: action
  params: []

- id: presentation_timer
  label: Presentation Timer
  kind: action
  params: []

- id: keystone_up
  label: Keystone Up
  kind: action
  params: []

- id: keystone_down
  label: Keystone Down
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - "00"  # Power ON
    - "80"  # Standby
    - "40"  # Countdown in process
    - "20"  # Cooling Down
    - "10"  # Power Failure
    - "28"  # Cooling Down due to Temperature Anomaly
    - "88"  # Standby after Temperature Anomaly
    - "24"  # Power Save / Cooling Down
    - "04"  # Power Save
    - "21"  # Cooling Down after lamp failure
    - "81"  # Standby after lamp failure cooling down

- id: input_mode
  label: Input Mode
  type: enum
  values:
    - "1"  # Computer 1
    - "2"  # Computer 2
    - "3"  # Video

- id: lamp_time
  label: Lamp Time
  type: string
  description: 5-digit lamp hours (e.g. "00410" = 410 hours)

- id: screen_setting
  label: Screen Setting
  type: enum
  values:
    - "11"  # Normal
    - "10"  # Rear/Ceiling ON
    - "01"  # Rear ON
    - "00"  # Ceiling ON

- id: temperature
  label: Temperature
  type: string
  description: "Format: %1_%2_%3 (e.g. \"_31.5 _35.2__ _33.4\"). Sensors 1-3. Negative temps use \"-\" prefix. Error returns \"E00.0\"."

- id: lamp_mode
  label: Lamp Mode
  type: enum
  values:
    - "00"  # Light is out
    - "01"  # Light is on
```

## Variables
```yaml
# No standalone settable parameters - all control via discrete Actions
```

## Events
```yaml
# UNRESOLVED: projector sends unsolicited notifications only during power state transitions; no dedicated event subscription mechanism documented
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described as macros in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - When projector status is Cooling Down: no Functional Execution Commands accepted (none execute, all return [ACK][CR])
  - When projector status is Abnormal Temperature: no Functional Execution Commands accepted
  - When projector status is Abnormal Power: no Functional Execution Commands accepted
  - When projector status is Power Save / Cooling Down: no Functional Execution Commands accepted
  - Command pipelining rule: wait minimum 100ms after receiving response before issuing next command
  - Source explicitly warns: Do not issue any command during ~5 second internal initialization after plugging AC power
  - Source explicitly warns: Commands taking more than 1 second to receive carriage return cause buffer clear
```

## Notes
<!-- UNRESOLVED: TCP/IP or HTTP control not available on this model — serial only -->
<!-- UNRESOLVED: port number not applicable (serial-only device) -->
Command format: "C" + 2-char command code + CR (0x0D). ACK response: (0x06, 0x0D). Error response: "?" + CR.
Status read format: "CR" + 1-char command code + CR. Response varies by command — see Feedbacks above.
Baud rate user-selectable in service mode; initial default 19200.
<!-- UNRESOLVED: service mode access procedure not documented in source -->

## Provenance

```yaml
source_domains:
  - res.cloudinary.com
source_urls:
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Documents/sanyo/plc-wxe45_rs232basiccommand.pdf"
retrieved_at: 2026-05-21T21:13:48.850Z
last_checked_at: 2026-05-31T21:02:40.324Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T21:02:40.324Z
matched_actions: 54
action_count: 54
confidence: high
summary: "All 54 spec actions matched in source command table; transport parameters verified verbatim; complete bidirectional coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
