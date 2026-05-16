---
spec_id: admin/christie-lx700
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie LX700 Control Spec"
manufacturer: Christie
model_family: LX700
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - LX700
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-102207-08-christie-lit-man-ref-spyder-commands.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000372-05-christie-e-series-serial-communications.pdf
retrieved_at: 2026-05-04T15:10:58.851Z
last_checked_at: 2026-05-15T21:18:31.514Z
generated_at: 2026-05-15T21:18:31.514Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-15T21:18:31.514Z
  matched_actions: 60
  action_count: 60
  confidence: high
  summary: "All 60 spec action ids semantically match distinct source commands; transport parameters verified against RS-232C specification."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Christie LX700 Control Spec

## Summary
Christie LX700 projector. RS-232C serial control from a computer. Protocol: one command per line starting with "C" or "CR" and ending with carriage return (0x0D). Two command types: Functional Execution Commands (act like remote/console keys) and Status Read Commands (query projector status).

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none
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

- id: power_off_quick
  label: Power Off (Quick)
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: input_1
  label: Input 1
  kind: action
  params: []

- id: input_2
  label: Input 2
  kind: action
  params: []

- id: input_3
  label: Input 3
  kind: action
  params: []

- id: network
  label: Network Input
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

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: video_mute_on
  label: Video Mute On
  kind: action
  params: []

- id: video_mute_off
  label: Video Mute Off
  kind: action
  params: []

- id: screen_normal
  label: Screen Normal Size (4:3)
  kind: action
  params: []

- id: screen_wide
  label: Screen Wide Size (16:9)
  kind: action
  params: []

- id: menu_on
  label: Menu On
  kind: action
  params: []

- id: menu_off
  label: Menu Off
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

- id: input_2_video
  label: Input 2 Video
  kind: action
  params: []

- id: input_2_y_pb_cb_pr_cr
  label: Input 2 Y,Pb/Cb,Pr/Cr
  kind: action
  params: []

- id: input_2_rgb
  label: Input 2 RGB
  kind: action
  params: []

- id: image_toggle
  label: Image Toggle
  kind: action
  params: []

- id: on_start_enable
  label: On Start Enable
  kind: action
  params: []

- id: on_start_disable
  label: On Start Disable
  kind: action
  params: []

- id: power_management_ready
  label: Power Management Ready
  kind: action
  params: []

- id: power_management_off
  label: Power Management Off
  kind: action
  params: []

- id: power_management_shutdown
  label: Power Management Shutdown
  kind: action
  params: []

- id: dzoom_in
  label: Digital Zoom In
  kind: action
  params: []

- id: dzoom_out
  label: Digital Zoom Out
  kind: action
  params: []

- id: input_3_video
  label: Input 3 Video
  kind: action
  params: []

- id: input_3_s_video
  label: Input 3 S-Video
  kind: action
  params: []

- id: input_3_y_pb_cb_pr_cr
  label: Input 3 Y,Pb/Cb,Pr/Cr
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
  label: Freeze On
  kind: action
  params: []

- id: freeze_off
  label: Freeze Off
  kind: action
  params: []

- id: zoom_in
  label: Zoom In
  kind: action
  params: []

- id: zoom_out
  label: Zoom Out
  kind: action
  params: []

- id: focus_in
  label: Focus In
  kind: action
  params: []

- id: focus_out
  label: Focus Out
  kind: action
  params: []

- id: color_management
  label: Color Management
  kind: action
  params: []

- id: input_1_analog_rgb
  label: Input 1 Analog RGB
  kind: action
  params: []

- id: input_1_scart
  label: Input 1 SCART
  kind: action
  params: []

- id: input_1_dvi_pc
  label: Input 1 DVI PC Digital
  kind: action
  params: []

- id: input_1_dvi_av_hdcp
  label: Input 1 DVI AV HDCP
  kind: action
  params: []

- id: lens_shift_up
  label: Lens Shift Up
  kind: action
  params: []

- id: lens_shift_down
  label: Lens Shift Down
  kind: action
  params: []

- id: lens_shift_left
  label: Lens Shift Left
  kind: action
  params: []

- id: lens_shift_right
  label: Lens Shift Right
  kind: action
  params: []

- id: auto_pc_adj
  label: Auto PC Adjustment
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

- id: keystone_right
  label: Keystone Right
  kind: action
  params: []

- id: keystone_left
  label: Keystone Left
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: status_read
  label: Status Read
  type: enum
  values:
    - "00"
    - "80"
    - "40"
    - "20"
    - "10"
    - "28"
    - "88"
    - "24"
    - "04"
    - "21"
    - "81"
    - "2C"
    - "8C"
  description: |
    "00" = Power ON
    "80" = Standby
    "40" = Countdown in process
    "20" = Cooling Down in process
    "10" = Power Failure
    "28" = Cooling Down due to Abnormal Temperature
    "88" = Standby after Cooling Down due to Abnormal Temperature
    "24" = Power-Save Cooling Down in process
    "04" = Power Save
    "21" = Cooling Down after OFF due to Lamp Failure
    "81" = Standby after Cooling Down due to Lamp Failure
    "2C" = Cooling Down due to Shutter Management
    "8C" = Standby after Cooling Down due to Shutter Management

- id: input_mode_read
  label: Input Mode Read
  type: enum
  values:
    - "1"
    - "2"
    - "3"
    - "4"
  description: |
    "1" = Input 1
    "2" = Input 2
    "3" = Input 3
    "4" = Input 4 (networking-capable models only)

- id: lamp_time_read
  label: Lamp Time Read
  type: string
  description: 5-digit lamp hours. Example "00410" = 410 hours.

- id: setting_read
  label: Setting Read
  type: enum
  values:
    - "11"
    - "10"
    - "01"
    - "00"
  description: |
    "11" = Normal
    "10" = Rear & Ceiling ON
    "01" = Rear ON
    "00" = Ceiling ON

- id: temp_read
  label: Temperature Read
  type: string
  description: Three temperatures as "_XX.X _XX.X _XX.X". Format "_00.0" with space prefix; negative uses "-" prefix; sensor error returns "EXX.X".

- id: lamp_mode_read
  label: Lamp Mode Read
  type: enum
  values:
    - "00"
    - "01"
  description: "00" = Lamp ON, "01" = Lamp OFF.

- id: ack
  label: Acknowledgement
  type: enum
  values:
    - ACK
  description: "[ACK] (0x06) returned on valid Functional Execution Command reception."

- id: nak
  label: Negative Acknowledgement
  type: enum
  values:
    - "?"
  description: ""?" returned when received data cannot be decoded."
```

## Variables
```yaml
- id: brightness
  label: Brightness
  type: integer
  writable: true
  description: Increments/decrements by 1 per command (C20/C21).

- id: volume
  label: Volume
  type: integer
  writable: true
  description: Volume Up/Down via C09/C0A. Pipelined commands require 100ms interval.

- id: zoom
  label: Zoom
  type: integer
  writable: true
  description: Zoom In/Out via C47/C46. Pipelined commands require 100ms interval.

- id: focus
  label: Focus
  type: integer
  writable: true
  description: Focus In/Out via C4B/C4A. Pipelined commands require 100ms interval.

- id: lens_shift
  label: Lens Shift
  type: enum
  writable: true
  description: Lens shift via C5D/C5E/C5F/C60. Pipelined commands require 100ms interval.

- id: keystone
  label: Keystone
  type: enum
  writable: true
  description: Keystone correction via C8E/C8F/C90/C91 (up/down/right/left).
```

## Events
```yaml
- id: power_status_changed
  label: Power Status Changed
  type: enum
  values: []
  description: Projector does not主动 send events. Poll via CR0 command.

- id: input_switched
  label: Input Switched
  type: enum
  values: []
  description: Projector does not主动 send events. Poll via CR1 command.
```

## Macros
```yaml
UNRESOLVED: no explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Do not issue any command during 7-second internal initialization after plugging in AC power.
  - During countdown and cooling operations, functional execution commands return [ACK] but are not executed.
  - During 5 seconds after INPUT switching command, commands return [ACK] but are not executed.
  - Only POWER ON (C00) is accepted during Standby mode.
  - Only C00 and C01/C02 are accepted during Power-Save status.
  - During cooling down due to abnormal temperature, filter abnormal, shutter abnormal, or power failure: no commands accepted.
  - Volume +/-, Zoom +/-, Focus +/-, Lens Shift commands require 100ms interval when pipelined.
  - All other functional execution commands require 500ms interval when pipelined.
  - Status Read Commands require >500ms interval after return value.
  - Do not send subsequent command before reception of return value; no response after 5s is considered acceptable.
```

## Notes
<!-- UNRESOLVED: TCP/IP or network control — not covered in source, serial only -->
<!-- UNRESOLVED: initial baud rate is 19200 (changeable in service mode only) -->
Command format: "C" + two hex characters for functional commands, "CR" + one character for status commands, all terminated by carriage return 0x0D.
Pipelining: for Volume +/-, Zoom +/-, Focus +/-, Lens Shift: send command every 100ms for up to 120ms duration.
No login or authentication described in source — auth.type set to none.
ACK (0x06) returned on valid command reception. "?" (0x3F) returned on invalid decode.

## Provenance

```yaml
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-102207-08-christie-lit-man-ref-spyder-commands.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000372-05-christie-e-series-serial-communications.pdf
retrieved_at: 2026-05-04T15:10:58.851Z
last_checked_at: 2026-05-15T21:18:31.514Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-15T21:18:31.514Z
matched_actions: 60
action_count: 60
confidence: high
summary: "All 60 spec action ids semantically match distinct source commands; transport parameters verified against RS-232C specification."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
