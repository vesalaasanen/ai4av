---
spec_id: admin/crestron-1-beyond-iv-cam-i-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Crestron 1 Beyond IV-CAM-I Series Control Spec"
manufacturer: "Crestron 1 Beyond"
model_family: "IV-CAM-I Series"
aliases: []
compatible_with:
  manufacturers:
    - "Crestron 1 Beyond"
  models:
    - "IV-CAM-I Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.crestron.com
source_urls:
  - https://docs.crestron.com/en-us/9440/Content/Topics/NextGenCameras/Configuration/VISCA-Commands.htm
retrieved_at: 2026-04-30T04:31:08.341Z
last_checked_at: 2026-06-02T22:05:38.730Z
generated_at: 2026-06-02T22:05:38.730Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact models within the IV-CAM-I Series are not enumerated in the source"
  - "serial data bits, parity, stop bits, and flow control not stated in source"
  - "no authentication or login procedure described in source"
  - "data_bits not stated in source"
  - "parity not stated in source"
  - "stop_bits not stated in source"
  - "flow_control not stated in source"
  - "no continuous settable variables beyond the direct-position actions already"
  - "source does not describe unsolicited notification events"
  - "no multi-step sequences described in source"
  - "source does not contain safety warnings, interlock procedures, or"
  - "exact IV-CAM-I Series sub-models not enumerated"
  - "serial data bits, parity, stop bits, flow control not specified"
  - "command timing constraints and inter-command delays not specified"
  - "maximum connection count or concurrent session limits not specified"
  - "whether TCP connection is persistent or per-command not specified"
  - "VISCA protocol version not stated"
  - "applicability of CAM_MountMode to IV-CAM-I Series not confirmed"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:05:38.730Z
  matched_actions: 91
  action_count: 91
  confidence: medium
  summary: "All 91 spec actions traced to source (dip-safe re-verify). (18 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Crestron 1 Beyond IV-CAM-I Series Control Spec

## Summary

The Crestron 1 Beyond IV-CAM-I Series is a PTZ camera controllable via the VISCA binary protocol over TCP/IP (port 5500) or serial (RS‑232 / RS‑485, 9600 baud). This spec covers pan/tilt/zoom, focus, white balance, exposure, presets, freeze, and inquiry commands documented in the vendor VISCA command reference.

<!-- UNRESOLVED: exact models within the IV-CAM-I Series are not enumerated in the source -->
<!-- UNRESOLVED: serial data bits, parity, stop bits, and flow control not stated in source -->
<!-- UNRESOLVED: no authentication or login procedure described in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 5500
serial:
  baud_rate: 9600
  # UNRESOLVED: data_bits not stated in source
  # UNRESOLVED: parity not stated in source
  # UNRESOLVED: stop_bits not stated in source
  # UNRESOLVED: flow_control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # power on/off commands present
  - queryable    # extensive inquiry command set
  - levelable    # zoom, focus, gain, iris, shutter, bright have variable/direct control
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "8x 01 04 00 02 FF"
    params:
      - name: camera_address
        type: integer
        description: "VISCA camera address (replaces x in command bytes)"
    notes: "x = camera address"

  - id: power_off
    label: Power Off
    kind: action
    command: "8x 01 04 00 03 FF"
    params:
      - name: camera_address
        type: integer
        description: "VISCA camera address (replaces x in command bytes)"

  - id: zoom_stop
    label: Zoom Stop
    kind: action
    command: "8x 01 04 07 00 FF"
    params:
      - name: camera_address
        type: integer

  - id: zoom_tele_standard
    label: Zoom Tele (Standard)
    kind: action
    command: "8x 01 04 07 02 FF"
    params:
      - name: camera_address
        type: integer

  - id: zoom_wide_standard
    label: Zoom Wide (Standard)
    kind: action
    command: "8x 01 04 07 03 FF"
    params:
      - name: camera_address
        type: integer

  - id: zoom_tele_variable
    label: Zoom Tele (Variable)
    kind: action
    command: "8x 01 04 07 2p FF"
    params:
      - name: camera_address
        type: integer
      - name: speed
        type: integer
        description: "Speed 0 (low) to 7 (high), replaces p in command bytes"

  - id: zoom_wide_variable
    label: Zoom Wide (Variable)
    kind: action
    command: "8x 01 04 07 3p FF"
    params:
      - name: camera_address
        type: integer
      - name: speed
        type: integer
        description: "Speed 0 (low) to 7 (high), replaces p in command bytes"

  - id: zoom_direct
    label: Zoom Direct
    kind: action
    command: "8x 01 04 47 0p 0q 0r 0s FF"
    params:
      - name: camera_address
        type: integer
      - name: position
        type: string
        description: "Zoom position as 4 hex nibbles (p,q,r,s)"

  - id: zoom_absolute
    label: Zoom Absolute Position
    kind: action
    command: "8x 01 04 47 0t 0p 01 04 0s FF"
    params:
      - name: camera_address
        type: integer
      - name: speed
        type: integer
        description: "Speed 0-7, replaces t"
      - name: position
        type: string
        description: "Zoom position as hex nibbles (p,q,r,s)"

  - id: focus_stop
    label: Focus Stop
    kind: action
    command: "8x 01 04 08 00 FF"
    params:
      - name: camera_address
        type: integer

  - id: focus_far_standard
    label: Focus Far (Standard)
    kind: action
    command: "8x 01 04 08 02 FF"
    params:
      - name: camera_address
        type: integer

  - id: focus_near_standard
    label: Focus Near (Standard)
    kind: action
    command: "8x 01 04 08 03 FF"
    params:
      - name: camera_address
        type: integer

  - id: focus_far_variable
    label: Focus Far (Variable)
    kind: action
    command: "8x 01 04 08 2p FF"
    params:
      - name: camera_address
        type: integer
      - name: speed
        type: integer
        description: "Speed 0 (low) to 7 (high), replaces p"

  - id: focus_near_variable
    label: Focus Near (Variable)
    kind: action
    command: "8x 01 04 08 3p FF"
    params:
      - name: camera_address
        type: integer
      - name: speed
        type: integer
        description: "Speed 0 (low) to 7 (high), replaces p"

  - id: focus_direct
    label: Focus Direct
    kind: action
    command: "8x 01 04 48 0p 0q 0r 0s FF"
    params:
      - name: camera_address
        type: integer
      - name: position
        type: string
        description: "Focus position as 4 hex nibbles (p,q,r,s)"

  - id: auto_focus_on
    label: Auto Focus On
    kind: action
    command: "8x 01 04 38 02 FF"
    params:
      - name: camera_address
        type: integer

  - id: manual_focus
    label: Manual Focus
    kind: action
    command: "8x 01 04 38 03 FF"
    params:
      - name: camera_address
        type: integer

  - id: focus_auto_manual_toggle
    label: Auto/Manual Focus Toggle
    kind: action
    command: "8x 01 04 38 10 FF"
    params:
      - name: camera_address
        type: integer

  - id: one_push_af_trigger
    label: One Push AF Trigger
    kind: action
    command: "8x 01 04 18 01 FF"
    params:
      - name: camera_address
        type: integer

  - id: zoom_focus_direct
    label: Zoom + Focus Direct
    kind: action
    command: "8x 01 04 47 0p 0q 0r 0s 0t 0u 0v 0w FF"
    params:
      - name: camera_address
        type: integer
      - name: zoom_position
        type: string
        description: "Zoom position as 4 hex nibbles (p,q,r,s)"
      - name: focus_position
        type: string
        description: "Focus position as 4 hex nibbles (t,u,v,w)"

  - id: wb_auto
    label: White Balance Auto
    kind: action
    command: "8x 01 04 35 00 FF"
    params:
      - name: camera_address
        type: integer

  - id: wb_indoor
    label: White Balance Indoor
    kind: action
    command: "8x 01 04 35 01 FF"
    params:
      - name: camera_address
        type: integer

  - id: wb_outdoor
    label: White Balance Outdoor
    kind: action
    command: "8x 01 04 35 02 FF"
    params:
      - name: camera_address
        type: integer

  - id: wb_one_push
    label: White Balance One Push Mode
    kind: action
    command: "8x 01 04 35 03 FF"
    params:
      - name: camera_address
        type: integer

  - id: wb_manual
    label: White Balance Manual
    kind: action
    command: "8x 01 04 35 05 FF"
    params:
      - name: camera_address
        type: integer

  - id: wb_one_push_trigger
    label: White Balance One Push Trigger
    kind: action
    command: "8x 01 04 10 05 FF"
    params:
      - name: camera_address
        type: integer

  - id: r_gain_reset
    label: R Gain Reset
    kind: action
    command: "8x 01 04 03 00 FF"
    params:
      - name: camera_address
        type: integer

  - id: r_gain_up
    label: R Gain Up
    kind: action
    command: "8x 01 04 03 02 FF"
    params:
      - name: camera_address
        type: integer

  - id: r_gain_down
    label: R Gain Down
    kind: action
    command: "8x 01 04 03 03 FF"
    params:
      - name: camera_address
        type: integer

  - id: r_gain_direct
    label: R Gain Direct
    kind: action
    command: "8x 01 04 43 00 00 0p 0q FF"
    params:
      - name: camera_address
        type: integer
      - name: gain
        type: string
        description: "R gain as 2 hex nibbles (p,q)"

  - id: b_gain_reset
    label: B Gain Reset
    kind: action
    command: "8x 01 04 04 00 FF"
    params:
      - name: camera_address
        type: integer

  - id: b_gain_up
    label: B Gain Up
    kind: action
    command: "8x 01 04 04 02 FF"
    params:
      - name: camera_address
        type: integer

  - id: b_gain_down
    label: B Gain Down
    kind: action
    command: "8x 01 04 04 03 FF"
    params:
      - name: camera_address
        type: integer

  - id: b_gain_direct
    label: B Gain Direct
    kind: action
    command: "8x 01 04 44 00 00 0p 0q FF"
    params:
      - name: camera_address
        type: integer
      - name: gain
        type: string
        description: "B gain as 2 hex nibbles (p,q)"

  - id: ae_full_auto
    label: AE Full Auto
    kind: action
    command: "8x 01 04 39 00 FF"
    params:
      - name: camera_address
        type: integer

  - id: ae_manual
    label: AE Manual
    kind: action
    command: "8x 01 04 39 03 FF"
    params:
      - name: camera_address
        type: integer

  - id: ae_shutter_priority
    label: AE Shutter Priority
    kind: action
    command: "8x 01 04 39 0A FF"
    params:
      - name: camera_address
        type: integer

  - id: ae_iris_priority
    label: AE Iris Priority
    kind: action
    command: "8x 01 04 39 0B FF"
    params:
      - name: camera_address
        type: integer

  - id: ae_bright
    label: AE Bright Mode
    kind: action
    command: "8x 01 04 39 0D FF"
    params:
      - name: camera_address
        type: integer

  - id: shutter_reset
    label: Shutter Reset
    kind: action
    command: "8x 01 04 0A 00 FF"
    params:
      - name: camera_address
        type: integer

  - id: shutter_up
    label: Shutter Up
    kind: action
    command: "8x 01 04 0A 02 FF"
    params:
      - name: camera_address
        type: integer

  - id: shutter_down
    label: Shutter Down
    kind: action
    command: "8x 01 04 0A 03 FF"
    params:
      - name: camera_address
        type: integer

  - id: shutter_direct
    label: Shutter Direct
    kind: action
    command: "8x 01 04 4A 00 00 0p 0q FF"
    params:
      - name: camera_address
        type: integer
      - name: position
        type: string
        description: "Shutter position as 2 hex nibbles (p,q)"

  - id: iris_reset
    label: Iris Reset
    kind: action
    command: "8x 01 04 0B 00 FF"
    params:
      - name: camera_address
        type: integer

  - id: iris_up
    label: Iris Up
    kind: action
    command: "8x 01 04 0B 02 FF"
    params:
      - name: camera_address
        type: integer

  - id: iris_down
    label: Iris Down
    kind: action
    command: "8x 01 04 0B 03 FF"
    params:
      - name: camera_address
        type: integer

  - id: iris_direct
    label: Iris Direct
    kind: action
    command: "8x 01 04 4B 00 00 0p 0q FF"
    params:
      - name: camera_address
        type: integer
      - name: position
        type: string
        description: "Iris position as 2 hex nibbles (p,q)"

  - id: gain_reset
    label: Gain Reset
    kind: action
    command: "8x 01 04 0C 00 FF"
    params:
      - name: camera_address
        type: integer

  - id: gain_up
    label: Gain Up
    kind: action
    command: "8x 01 04 0C 02 FF"
    params:
      - name: camera_address
        type: integer

  - id: gain_down
    label: Gain Down
    kind: action
    command: "8x 01 04 0C 03 FF"
    params:
      - name: camera_address
        type: integer

  - id: gain_direct
    label: Gain Direct
    kind: action
    command: "8x 01 04 4C 00 00 0p 0q FF"
    params:
      - name: camera_address
        type: integer
      - name: position
        type: string
        description: "Gain position as 2 hex nibbles (p,q)"

  - id: bright_reset
    label: Bright Reset
    kind: action
    command: "8x 01 04 0D 00 FF"
    params:
      - name: camera_address
        type: integer

  - id: bright_up
    label: Bright Up
    kind: action
    command: "8x 01 04 0D 02 FF"
    params:
      - name: camera_address
        type: integer

  - id: bright_down
    label: Bright Down
    kind: action
    command: "8x 01 04 0D 03 FF"
    params:
      - name: camera_address
        type: integer

  - id: bright_direct
    label: Bright Direct
    kind: action
    command: "8x 01 04 4D 00 00 0p 0q FF"
    params:
      - name: camera_address
        type: integer
      - name: position
        type: string
        description: "Bright position as 2 hex nibbles (p,q)"

  - id: exp_comp_on
    label: Exposure Compensation On
    kind: action
    command: "8x 01 04 3E 02 FF"
    params:
      - name: camera_address
        type: integer

  - id: exp_comp_off
    label: Exposure Compensation Off
    kind: action
    command: "8x 01 04 3E 03 FF"
    params:
      - name: camera_address
        type: integer

  - id: exp_comp_reset
    label: Exposure Compensation Reset
    kind: action
    command: "8x 01 04 0E 00 FF"
    params:
      - name: camera_address
        type: integer

  - id: exp_comp_up
    label: Exposure Compensation Up
    kind: action
    command: "8x 01 04 0E 02 FF"
    params:
      - name: camera_address
        type: integer

  - id: exp_comp_down
    label: Exposure Compensation Down
    kind: action
    command: "8x 01 04 0E 03 FF"
    params:
      - name: camera_address
        type: integer

  - id: exp_comp_direct
    label: Exposure Compensation Direct
    kind: action
    command: "8x 01 04 4E 00 00 0p 0q FF"
    params:
      - name: camera_address
        type: integer
      - name: position
        type: string
        description: "ExpComp position as 2 hex nibbles (p,q)"

  - id: backlight_on
    label: Backlight Compensation On
    kind: action
    command: "8x 01 04 33 02 FF"
    params:
      - name: camera_address
        type: integer

  - id: backlight_off
    label: Backlight Compensation Off
    kind: action
    command: "8x 01 04 33 03 FF"
    params:
      - name: camera_address
        type: integer

  - id: memory_reset
    label: Memory Reset
    kind: action
    command: "8x 01 04 3F 00 pp FF"
    params:
      - name: camera_address
        type: integer
      - name: memory_number
        type: integer
        description: "Memory number 0-255, replaces pp as hex"

  - id: memory_set
    label: Memory Set (Save Preset)
    kind: action
    command: "8x 01 04 3F 01 pp FF"
    params:
      - name: camera_address
        type: integer
      - name: memory_number
        type: integer
        description: "Memory number 0-255, replaces pp as hex"

  - id: memory_recall
    label: Memory Recall (Call Preset)
    kind: action
    command: "8x 01 04 3F 02 pp FF"
    params:
      - name: camera_address
        type: integer
      - name: memory_number
        type: integer
        description: "Memory number 0-255, replaces pp as hex"

  - id: freeze_on
    label: Freeze On
    kind: action
    command: "8x 01 04 62 02 FF"
    params:
      - name: camera_address
        type: integer

  - id: freeze_off
    label: Freeze Off
    kind: action
    command: "8x 01 04 62 03 FF"
    params:
      - name: camera_address
        type: integer

  - id: preset_freeze_on
    label: Preset Freeze On
    kind: action
    command: "8x 01 04 62 22 FF"
    params:
      - name: camera_address
        type: integer
    notes: "Freeze on when running preset"

  - id: preset_freeze_off
    label: Preset Freeze Off
    kind: action
    command: "8x 01 04 62 23 FF"
    params:
      - name: camera_address
        type: integer
    notes: "Freeze off when running preset"

  - id: ir_receive_on
    label: IR Receive On
    kind: action
    command: "8x 01 06 08 02 FF"
    params:
      - name: camera_address
        type: integer

  - id: ir_receive_off
    label: IR Receive Off
    kind: action
    command: "8x 01 06 08 03 FF"
    params:
      - name: camera_address
        type: integer

  - id: pantilt_up
    label: Pan-Tilt Up
    kind: action
    command: "8x 01 06 01 VV WW 03 01 FF"
    params:
      - name: camera_address
        type: integer
      - name: pan_speed
        type: string
        description: "Pan speed 0x01 (low) to 0x18 (high), replaces VV"
      - name: tilt_speed
        type: string
        description: "Tilt speed 0x01 (low) to 0x14 (high), replaces WW"

  - id: pantilt_down
    label: Pan-Tilt Down
    kind: action
    command: "8x 01 06 01 VV WW 03 02 FF"
    params:
      - name: camera_address
        type: integer
      - name: pan_speed
        type: string
      - name: tilt_speed
        type: string

  - id: pantilt_left
    label: Pan-Tilt Left
    kind: action
    command: "8x 01 06 01 VV WW 01 03 FF"
    params:
      - name: camera_address
        type: integer
      - name: pan_speed
        type: string
      - name: tilt_speed
        type: string

  - id: pantilt_right
    label: Pan-Tilt Right
    kind: action
    command: "8x 01 06 01 VV WW 02 03 FF"
    params:
      - name: camera_address
        type: integer
      - name: pan_speed
        type: string
      - name: tilt_speed
        type: string

  - id: pantilt_up_left
    label: Pan-Tilt Up Left
    kind: action
    command: "8x 01 06 01 VV WW 01 01 FF"
    params:
      - name: camera_address
        type: integer
      - name: pan_speed
        type: string
      - name: tilt_speed
        type: string

  - id: pantilt_up_right
    label: Pan-Tilt Up Right
    kind: action
    command: "8x 01 06 01 VV WW 02 01 FF"
    params:
      - name: camera_address
        type: integer
      - name: pan_speed
        type: string
      - name: tilt_speed
        type: string

  - id: pantilt_down_left
    label: Pan-Tilt Down Left
    kind: action
    command: "8x 01 06 01 VV WW 01 02 FF"
    params:
      - name: camera_address
        type: integer
      - name: pan_speed
        type: string
      - name: tilt_speed
        type: string

  - id: pantilt_down_right
    label: Pan-Tilt Down Right
    kind: action
    command: "8x 01 06 01 VV WW 02 02 FF"
    params:
      - name: camera_address
        type: integer
      - name: pan_speed
        type: string
      - name: tilt_speed
        type: string

  - id: pantilt_stop
    label: Pan-Tilt Stop
    kind: action
    command: "8x 01 06 01 VV WW 03 03 FF"
    params:
      - name: camera_address
        type: integer
      - name: pan_speed
        type: string
      - name: tilt_speed
        type: string

  - id: pantilt_absolute_position
    label: Pan-Tilt Absolute Position
    kind: action
    command: "8x 01 06 02 VV WW 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"
    params:
      - name: camera_address
        type: integer
      - name: pan_speed
        type: string
        description: "Replaces VV"
      - name: tilt_speed
        type: string
        description: "Replaces WW"
      - name: pan_position
        type: string
        description: "Pan position as 4 hex nibbles (YYYY)"
      - name: tilt_position
        type: string
        description: "Tilt position as 4 hex nibbles (ZZZZ)"

  - id: pantilt_relative_position
    label: Pan-Tilt Relative Position
    kind: action
    command: "8x 01 06 03 VV WW 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"
    params:
      - name: camera_address
        type: integer
      - name: pan_speed
        type: string
      - name: tilt_speed
        type: string
      - name: pan_position
        type: string
        description: "Relative pan position as 4 hex nibbles (YYYY)"
      - name: tilt_position
        type: string
        description: "Relative tilt position as 4 hex nibbles (ZZZZ)"

  - id: pantilt_home
    label: Pan-Tilt Home
    kind: action
    command: "8x 01 06 04 FF"
    params:
      - name: camera_address
        type: integer

  - id: pantilt_reset
    label: Pan-Tilt Reset
    kind: action
    command: "8x 01 06 05 FF"
    params:
      - name: camera_address
        type: integer

  - id: pantilt_limit_set
    label: Pan-Tilt Limit Set
    kind: action
    command: "8x 01 06 07 00 0W 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"
    params:
      - name: camera_address
        type: integer
      - name: corner
        type: integer
        description: "1 = Up Right, 0 = Down Left"
      - name: pan_position
        type: string
        description: "Pan limit position as 4 hex nibbles (YYYY)"
      - name: tilt_position
        type: string
        description: "Tilt limit position as 4 hex nibbles (ZZZZ)"

  - id: mount_mode_stand
    label: Mount Mode Stand
    kind: action
    command: "8x 01 04 A4 02 FF"
    params:
      - name: camera_address
        type: integer
    notes: "IV-CAM-P12 and IV-CAM-P20 only; inverted video and PTZ control off"

  - id: mount_mode_ceiling
    label: Mount Mode Ceiling
    kind: action
    command: "8x 01 04 A4 03 FF"
    params:
      - name: camera_address
        type: integer
    notes: "IV-CAM-P12 and IV-CAM-P20 only; inverted video and PTZ control on"

  - id: address_set_broadcast
    label: Address Set (Broadcast)
    kind: action
    command: "88 30 01 FF"
    params: []

  - id: if_clear
    label: Interface Clear (Broadcast)
    kind: action
    command: "88 01 00 01 FF"
    params: []

  - id: command_cancel
    label: Command Cancel
    kind: action
    command: "8x 2p FF"
    params:
      - name: camera_address
        type: integer
      - name: socket
        type: integer
        description: "Socket number (1 or 2), replaces p"
```

## Feedbacks
```yaml
feedbacks:
  - id: ack
    type: raw
    response: "z0 4y FF"
    description: "ACK - command accepted. y = socket number. z = device address + 8."

  - id: completion
    type: raw
    response: "z0 5y FF"
    description: "Completion - command executed. y = socket number."

  - id: error_syntax
    type: raw
    response: "z0 60 02 FF"
    description: "Syntax error - command format incorrect or illegal parameters."

  - id: error_buffer_full
    type: raw
    response: "z0 60 03 FF"
    description: "Command buffer full - two sockets already in use."

  - id: error_command_canceled
    type: raw
    response: "z0 6y 04 FF"
    description: "Command canceled in specified socket. y = socket number."

  - id: error_no_socket
    type: raw
    response: "z0 6y 05 FF"
    description: "No command executing in specified socket. y = socket number."

  - id: error_not_executable
    type: raw
    response: "z0 6y 41 FF"
    description: "Command not executable under current conditions. y = socket number."

  - id: power_state_inquiry
    type: inquiry
    command: "8x 09 04 00 FF"
    response_map:
      "y0 50 02 FF": "On"
      "y0 50 03 FF": "Off (Standby)"
      "y0 50 04 FF": "Internal power circuit error"

  - id: zoom_position_inquiry
    type: inquiry
    command: "8x 09 04 47 FF"
    response: "y0 50 0p 0q 0r 0s FF"
    description: "Returns zoom position as 4 hex nibbles (p,q,r,s)."

  - id: focus_mode_inquiry
    type: inquiry
    command: "8x 09 04 38 FF"
    response_map:
      "y0 50 02 FF": "Auto Focus"
      "y0 50 03 FF": "Manual Focus"

  - id: focus_position_inquiry
    type: inquiry
    command: "8x 09 04 48 FF"
    response: "y0 50 0p 0q 0r 0s FF"
    description: "Returns focus position as 4 hex nibbles (p,q,r,s)."

  - id: wb_mode_inquiry
    type: inquiry
    command: "8x 09 04 35 FF"
    response_map:
      "y0 50 00 FF": "Auto"
      "y0 50 01 FF": "Indoor"
      "y0 50 02 FF": "Outdoor"
      "y0 50 03 FF": "One Push WB"
      "y0 50 05 FF": "Manual"

  - id: r_gain_inquiry
    type: inquiry
    command: "8x 09 04 43 FF"
    response: "y0 50 00 00 0p 0q FF"
    description: "Returns R gain as 2 hex nibbles (p,q)."

  - id: b_gain_inquiry
    type: inquiry
    command: "8x 09 04 44 FF"
    response: "y0 50 00 00 0p 0q FF"
    description: "Returns B gain as 2 hex nibbles (p,q)."

  - id: ae_mode_inquiry
    type: inquiry
    command: "8x 09 04 39 FF"
    response_map:
      "y0 50 00 FF": "Full Auto"
      "y0 50 03 FF": "Manual"
      "y0 50 0A FF": "Shutter Priority"
      "y0 50 0B FF": "Iris Priority"
      "y0 50 0D FF": "Bright"

  - id: shutter_position_inquiry
    type: inquiry
    command: "8x 09 04 4A FF"
    response: "y0 50 00 00 0p 0q FF"
    description: "Returns shutter position as 2 hex nibbles (p,q)."

  - id: iris_position_inquiry
    type: inquiry
    command: "8x 09 04 4B FF"
    response: "y0 50 00 00 0p 0q FF"
    description: "Returns iris position as 2 hex nibbles (p,q)."

  - id: gain_position_inquiry
    type: inquiry
    command: "8x 09 04 4C FF"
    response: "y0 50 00 00 0p 0q FF"
    description: "Returns gain position as 2 hex nibbles (p,q)."

  - id: bright_position_inquiry
    type: inquiry
    command: "8x 09 04 4D FF"
    response: "y0 50 00 00 0p 0q FF"
    description: "Returns bright position as 2 hex nibbles (p,q)."

  - id: exp_comp_mode_inquiry
    type: inquiry
    command: "8x 09 04 3E FF"
    response_map:
      "y0 50 02 FF": "On"
      "y0 50 03 FF": "Off"

  - id: exp_comp_position_inquiry
    type: inquiry
    command: "8x 09 04 4E FF"
    response: "y0 50 00 00 0p 0q FF"
    description: "Returns exposure compensation position as 2 hex nibbles (p,q)."

  - id: backlight_mode_inquiry
    type: inquiry
    command: "8x 09 04 33 FF"
    response_map:
      "y0 50 02 FF": "On"
      "y0 50 03 FF": "Off"

  - id: memory_inquiry
    type: inquiry
    command: "8x 09 04 3F FF"
    response: "y0 50 0p FF"
    description: "Returns last operated memory number (p)."

  - id: version_inquiry
    type: inquiry
    command: "8x 09 00 02 FF"
    response: "y0 50 00 01 mn pq rs tu vw FF"
    description: "Returns model code (m,n,p,q), ROM version (r,s,t,u), socket number (v,w)."

  - id: video_system_inquiry
    type: inquiry
    command: "8x 09 06 23 FF"
    response_map:
      "y0 50 00 FF": "1920x1080i/60 (60 Hz)"
      "y0 50 01 FF": "1920x1080p/30 (60 Hz)"
      "y0 50 02 FF": "1280x720p/60 (60 Hz)"
      "y0 50 03 FF": "1280x720p/30 (60 Hz)"
      "y0 50 07 FF": "1920x1080p/60 (60 Hz)"
      "y0 50 08 FF": "1920x1080i/50 (50 Hz)"
      "y0 50 09 FF": "1920x1080p/25 (50 Hz)"
      "y0 50 0A FF": "1280x720p/50 (50 Hz)"
      "y0 50 0B FF": "1280x720p/25 (50 Hz)"
      "y0 50 0F FF": "1920x1080p/50 (50 Hz)"

  - id: ir_receive_inquiry
    type: inquiry
    command: "8x 09 06 08 FF"
    response_map:
      "y0 50 02 FF": "On"
      "y0 50 03 FF": "Off"

  - id: pantilt_max_speed_inquiry
    type: inquiry
    command: "8x 09 06 11 FF"
    response: "y0 50 ww zz FF"
    description: "Returns pan max speed (ww) and tilt max speed (zz)."

  - id: pantilt_position_inquiry
    type: inquiry
    command: "8x 09 06 12 FF"
    response: "y0 50 0w 0w 0w 0w 0z 0z 0z 0z FF"
    description: "Returns pan position (wwww) and tilt position (zzzz) as 4 hex nibbles each."

  - id: pantilt_mode_inquiry
    type: inquiry
    command: "8x 09 06 10 FF"
    response: "y0 50 pq rs FF"
    description: "Returns pan/tilt status as 4 hex nibbles (p,q,r,s)."

  - id: tracking_inquiry
    type: inquiry
    command: "8x 09 08 01 FF"
    response_map:
      "y0 50 02 FF": "Tracking active"
      "y0 50 03 FF": "Tracking paused"

  - id: mount_mode_inquiry
    type: inquiry
    command: "8x 09 04 A4 FF"
    response_map:
      "y0 50 02 FF": "Stand"
      "y0 50 03 FF": "Ceiling"
```

## Variables
```yaml
# UNRESOLVED: no continuous settable variables beyond the direct-position actions already
# documented in Actions. Zoom, focus, iris, gain, shutter, bright, and exp_comp all use
# direct-position commands that could be modeled as variables, but they are discrete actions
# in the VISCA binary protocol.
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited notification events
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes

This device uses the Sony VISCA binary protocol over TCP (port 5500) or serial (RS‑232 / RS‑485, 9600 baud). All commands are hex byte sequences where `x` represents the camera address and `z` = device address + 8. The protocol supports two command sockets; if both are in use, a buffer-full error is returned.

VISCA commands use a request/response pattern: the camera returns an ACK (`z0 4y FF`) when a command is accepted and a completion message (`z0 5y FF`) when execution finishes. Inquiry commands return their data in the completion message.

Pan speed range is 0x01 (low) to 0x18 (high). Tilt speed range is 0x01 (low) to 0x14 (high).

Memory/preset numbers range from 0 to 255.

The `CAM_MountMode` commands (stand/ceiling) are noted as applicable to IV-CAM-P12 and IV-CAM-P20 models only; applicability to IV-CAM-I Series is not explicitly stated.

Zoom position lookup tables for 12x and 20x optical zoom ratios are provided in the source (hex position values for each zoom ratio multiplier).

<!-- UNRESOLVED: exact IV-CAM-I Series sub-models not enumerated -->
<!-- UNRESOLVED: serial data bits, parity, stop bits, flow control not specified -->
<!-- UNRESOLVED: command timing constraints and inter-command delays not specified -->
<!-- UNRESOLVED: maximum connection count or concurrent session limits not specified -->
<!-- UNRESOLVED: whether TCP connection is persistent or per-command not specified -->
<!-- UNRESOLVED: VISCA protocol version not stated -->
<!-- UNRESOLVED: applicability of CAM_MountMode to IV-CAM-I Series not confirmed -->

## Provenance

```yaml
source_domains:
  - docs.crestron.com
source_urls:
  - https://docs.crestron.com/en-us/9440/Content/Topics/NextGenCameras/Configuration/VISCA-Commands.htm
retrieved_at: 2026-04-30T04:31:08.341Z
last_checked_at: 2026-06-02T22:05:38.730Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:05:38.730Z
matched_actions: 91
action_count: 91
confidence: medium
summary: "All 91 spec actions traced to source (dip-safe re-verify). (18 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact models within the IV-CAM-I Series are not enumerated in the source"
- "serial data bits, parity, stop bits, and flow control not stated in source"
- "no authentication or login procedure described in source"
- "data_bits not stated in source"
- "parity not stated in source"
- "stop_bits not stated in source"
- "flow_control not stated in source"
- "no continuous settable variables beyond the direct-position actions already"
- "source does not describe unsolicited notification events"
- "no multi-step sequences described in source"
- "source does not contain safety warnings, interlock procedures, or"
- "exact IV-CAM-I Series sub-models not enumerated"
- "serial data bits, parity, stop bits, flow control not specified"
- "command timing constraints and inter-command delays not specified"
- "maximum connection count or concurrent session limits not specified"
- "whether TCP connection is persistent or per-command not specified"
- "VISCA protocol version not stated"
- "applicability of CAM_MountMode to IV-CAM-I Series not confirmed"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
