---
spec_id: admin/crestron_1_beyond-iv_camptz_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Crestron 1 Beyond IV-CAMPTZ Series Control Spec"
manufacturer: "Crestron 1 Beyond"
model_family: IV-CAMPTZ-12-N-W-1B
aliases: []
compatible_with:
  manufacturers:
    - "Crestron 1 Beyond"
  models:
    - IV-CAMPTZ-12-N-W-1B
    - IV-CAMPTZ-12-N-SLVR-1B
    - IV-CAMPTZ-12-W-1B
    - IV-CAMPTZ-12-SLVR-1B
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.crestron.com
  - crestron.com
retrieved_at: 2026-05-01T02:00:50.953Z
last_checked_at: 2026-04-23T15:31:34.680Z
generated_at: 2026-04-23T15:31:34.680Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T15:31:34.680Z
  matched_actions: 90
  action_count: 90
  confidence: high
  summary: "All 90 spec actions matched literally to VISCA command table; transport parameters verified; comprehensive coverage of control commands."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-17
---

# Crestron 1 Beyond IV-CAMPTZ Series Control Spec

## Summary
Crestron 1 Beyond IV-CAMPTZ Series PTZ camera supporting VISCA over IP (TCP port 5500) and serial RS-232 VISCA communication at 9600 bps. Supports pan-tilt-zoom control, focus, white balance, exposure, preset memory, and queryable state via inquiry commands.

<!-- UNRESOLVED: RTSP port (554/5000) not integrated into structured spec as it is streaming, not control -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 5500  # VISCA over IP TCP port
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
auth:
  type: none  # inferred: no auth procedure in source
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
- id: CAM_Power_On
  label: Power On
  kind: action
  params: []
- id: CAM_Power_Off
  label: Power Off
  kind: action
  params: []
- id: CAM_Zoom_Stop
  label: Zoom Stop
  kind: action
  params: []
- id: CAM_Zoom_Tele
  label: Zoom Tele (Standard)
  kind: action
  params: []
- id: CAM_Zoom_Wide
  label: Zoom Wide (Standard)
  kind: action
  params: []
- id: CAM_Zoom_Tele_Variable
  label: Zoom Tele (Variable)
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 0 (Low) to 7 (High)
- id: CAM_Zoom_Wide_Variable
  label: Zoom Wide (Variable)
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 0 (Low) to 7 (High)
- id: CAM_Zoom_Direct
  label: Zoom Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Zoom Position (4-digit hex)
- id: CAM_Focus_Stop
  label: Focus Stop
  kind: action
  params: []
- id: CAM_Focus_Far
  label: Focus Far (Standard)
  kind: action
  params: []
- id: CAM_Focus_Near
  label: Focus Near (Standard)
  kind: action
  params: []
- id: CAM_Focus_Far_Variable
  label: Focus Far (Variable)
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 0 (Low) to 7 (High)
- id: CAM_Focus_Near_Variable
  label: Focus Near (Variable)
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 0 (Low) to 7 (High)
- id: CAM_Focus_Direct
  label: Focus Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Focus Position (4-digit hex)
- id: CAM_Focus_Auto
  label: Auto Focus On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
- id: CAM_Focus_Manual
  label: Manual Focus
  kind: action
  params: []
- id: CAM_Focus_OnePush
  label: One Push AF Trigger
  kind: action
  params: []
- id: CAM_ZoomFocus_Direct
  label: Zoom Focus Direct
  kind: action
  params:
    - name: zoom_position
      type: integer
      description: Zoom Position (4-digit hex)
    - name: focus_position
      type: integer
      description: Focus Position (4-digit hex)
- id: CAM_WB_Auto
  label: White Balance Auto
  kind: action
  params: []
- id: CAM_WB_Indoor
  label: White Balance Indoor
  kind: action
  params: []
- id: CAM_WB_Outdoor
  label: White Balance Outdoor
  kind: action
  params: []
- id: CAM_WB_OnePush
  label: White Balance One Push
  kind: action
  params: []
- id: CAM_WB_Manual
  label: White Balance Manual
  kind: action
  params: []
- id: CAM_WB_OnePush_Trigger
  label: One Push WB Trigger
  kind: action
  params: []
- id: CAM_RGain_Reset
  label: R Gain Reset
  kind: action
  params: []
- id: CAM_RGain_Up
  label: R Gain Up
  kind: action
  params: []
- id: CAM_RGain_Down
  label: R Gain Down
  kind: action
  params: []
- id: CAM_RGain_Direct
  label: R Gain Direct
  kind: action
  params:
    - name: position
      type: integer
      description: R Gain Position
- id: CAM_BGain_Reset
  label: B Gain Reset
  kind: action
  params: []
- id: CAM_BGain_Up
  label: B Gain Up
  kind: action
  params: []
- id: CAM_BGain_Down
  label: B Gain Down
  kind: action
  params: []
- id: CAM_BGain_Direct
  label: B Gain Direct
  kind: action
  params:
    - name: position
      type: integer
      description: B Gain Position
- id: CAM_AE_FullAuto
  label: Auto Exposure Full Auto
  kind: action
  params: []
- id: CAM_AE_Manual
  label: Auto Exposure Manual
  kind: action
  params: []
- id: CAM_AE_ShutterPriority
  label: Auto Exposure Shutter Priority
  kind: action
  params: []
- id: CAM_AE_IrisPriority
  label: Auto Exposure Iris Priority
  kind: action
  params: []
- id: CAM_AE_Bright
  label: Auto Exposure Bright Mode
  kind: action
  params: []
- id: CAM_Shutter_Reset
  label: Shutter Reset
  kind: action
  params: []
- id: CAM_Shutter_Up
  label: Shutter Up
  kind: action
  params: []
- id: CAM_Shutter_Down
  label: Shutter Down
  kind: action
  params: []
- id: CAM_Shutter_Direct
  label: Shutter Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Shutter Position
- id: CAM_Iris_Reset
  label: Iris Reset
  kind: action
  params: []
- id: CAM_Iris_Up
  label: Iris Up
  kind: action
  params: []
- id: CAM_Iris_Down
  label: Iris Down
  kind: action
  params: []
- id: CAM_Iris_Direct
  label: Iris Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Iris Position
- id: CAM_Gain_Reset
  label: Gain Reset
  kind: action
  params: []
- id: CAM_Gain_Up
  label: Gain Up
  kind: action
  params: []
- id: CAM_Gain_Down
  label: Gain Down
  kind: action
  params: []
- id: CAM_Gain_Direct
  label: Gain Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Gain Position
- id: CAM_Bright_Reset
  label: Bright Reset
  kind: action
  params: []
- id: CAM_Bright_Up
  label: Bright Up
  kind: action
  params: []
- id: CAM_Bright_Down
  label: Bright Down
  kind: action
  params: []
- id: CAM_Bright_Direct
  label: Bright Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Bright Position
- id: CAM_ExpComp_On
  label: Exposure Compensation On
  kind: action
  params: []
- id: CAM_ExpComp_Off
  label: Exposure Compensation Off
  kind: action
  params: []
- id: CAM_ExpComp_Reset
  label: Exposure Compensation Reset
  kind: action
  params: []
- id: CAM_ExpComp_Up
  label: Exposure Compensation Up
  kind: action
  params: []
- id: CAM_ExpComp_Down
  label: Exposure Compensation Down
  kind: action
  params: []
- id: CAM_ExpComp_Direct
  label: Exposure Compensation Direct
  kind: action
  params:
    - name: position
      type: integer
      description: ExpComp Position
- id: CAM_Backlight_On
  label: Backlight On
  kind: action
  params: []
- id: CAM_Backlight_Off
  label: Backlight Off
  kind: action
  params: []
- id: CAM_Aperture_Reset
  label: Aperture Reset
  kind: action
  params: []
- id: CAM_Aperture_Up
  label: Aperture Up
  kind: action
  params: []
- id: CAM_Aperture_Down
  label: Aperture Down
  kind: action
  params: []
- id: CAM_Aperture_Direct
  label: Aperture Direct
  kind: action
  params:
    - name: position
      type: integer
      description: Aperture Gain
- id: CAM_PictureEffect_Off
  label: Picture Effect Off
  kind: action
  params: []
- id: CAM_PictureEffect_NegArt
  label: Picture Effect Negative Art
  kind: action
  params: []
- id: CAM_PictureEffect_BW
  label: Picture Effect B&W
  kind: action
  params: []
- id: CAM_Memory_Reset
  label: Memory Reset
  kind: action
  params:
    - name: preset
      type: integer
      description: Memory Number (0 to 255)
- id: CAM_Memory_Set
  label: Memory Set
  kind: action
  params:
    - name: preset
      type: integer
      description: Memory Number (0 to 255)
- id: CAM_Memory_Recall
  label: Memory Recall
  kind: action
  params:
    - name: preset
      type: integer
      description: Memory Number (0 to 255)
- id: Freeze_On
  label: Freeze On
  kind: action
  params: []
- id: Freeze_Off
  label: Freeze Off
  kind: action
  params: []
- id: Freeze_Preset_On
  label: Freeze On When Running Preset
  kind: action
  params: []
- id: Freeze_Preset_Off
  label: Freeze Off When Running Preset
  kind: action
  params: []
- id: SYS_Menu_Off
  label: Menu Off
  kind: action
  params: []
- id: CAM_IDWrite
  label: Camera ID Write
  kind: action
  params:
    - name: camera_id
      type: integer
      description: Camera ID (0000 to FFFF)
- id: IR_Receive_On
  label: IR Receive On
  kind: action
  params: []
- id: IR_Receive_Off
  label: IR Receive Off
  kind: action
  params: []
- id: Info_Display_On
  label: Information Display On
  kind: action
  params: []
- id: Info_Display_Off
  label: Information Display Off
  kind: action
  params: []
- id: PanTilt_Up
  label: Pan Tilt Up
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan Speed (0x01 to 0x18)
    - name: tilt_speed
      type: integer
      description: Tilt Speed (0x01 to 0x14)
- id: PanTilt_Down
  label: Pan Tilt Down
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
- id: PanTilt_Left
  label: Pan Tilt Left
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
- id: PanTilt_Right
  label: Pan Tilt Right
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
- id: PanTilt_UpLeft
  label: Pan Tilt Up Left
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
- id: PanTilt_UpRight
  label: Pan Tilt Up Right
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
- id: PanTilt_DownLeft
  label: Pan Tilt Down Left
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
- id: PanTilt_DownRight
  label: Pan Tilt Down Right
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
- id: PanTilt_Stop
  label: Pan Tilt Stop
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
- id: PanTilt_AbsolutePosition
  label: Pan Tilt Absolute Position
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
    - name: pan_position
      type: integer
      description: Pan Position (4-digit)
    - name: tilt_position
      type: integer
      description: Tilt Position (4-digit)
- id: PanTilt_RelativePosition
  label: Pan Tilt Relative Position
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
    - name: pan_position
      type: integer
    - name: tilt_position
      type: integer
- id: PanTilt_Home
  label: Pan Tilt Home
  kind: action
  params: []
- id: PanTilt_Reset
  label: Pan Tilt Reset
  kind: action
  params: []
- id: PanTilt_LimitSet
  label: Pan Tilt Limit Set
  kind: action
  params:
    - name: limit_set
      type: enum
      values: [up_right, down_left]
    - name: pan_position
      type: integer
    - name: tilt_position
      type: integer
```

## Feedbacks
```yaml
- id: ACK
  type: string
  description: Acknowledgement returned when command accepted (z0 4y FF, y = Socket No.)
- id: Completion
  type: string
  description: Returned when command executed (z0 5y FF, y = Socket No.)
- id: Error_Syntax
  type: string
  description: Syntax Error (z0 60 02 FF)
- id: Error_BufferFull
  type: string
  description: Command Buffer Full (z0 60 03 FF)
- id: Error_Canceled
  type: string
  description: Command Canceled (z0 6y 04 FF)
- id: Error_NoSocket
  type: string
  description: No Socket (z0 6y 05 FF)
- id: Error_NotExecutable
  type: string
  description: Command Not Executable (z0 6y 41 FF)
```

## Variables
```yaml
- id: CAM_PowerInq
  type: enum
  values: [on, off, internal_error]
  description: Power state inquiry
- id: CAM_ZoomPosInq
  type: integer
  description: Zoom position (4-digit hex)
- id: CAM_FocusModeInq
  type: enum
  values: [auto, manual]
  description: Focus mode inquiry
- id: CAM_FocusPosInq
  type: integer
  description: Focus position (4-digit hex)
- id: CAM_WBModeInq
  type: enum
  values: [auto, indoor, outdoor, one_push, manual]
  description: White balance mode inquiry
- id: CAM_RGainInq
  type: integer
  description: R Gain position
- id: CAM_BGainInq
  type: integer
  description: B Gain position
- id: CAM_AEModeInq
  type: enum
  values: [full_auto, manual, shutter_priority, iris_priority, bright]
  description: Auto exposure mode inquiry
- id: CAM_ShutterPosInq
  type: integer
  description: Shutter position
- id: CAM_IrisPosInq
  type: integer
  description: Iris position
- id: CAM_GainPosInq
  type: integer
  description: Gain position
- id: CAM_BrightPosInq
  type: integer
  description: Bright position
- id: CAM_ExpCompModeInq
  type: enum
  values: [on, off]
  description: Exposure compensation mode inquiry
- id: CAM_ExpCompPosInq
  type: integer
  description: Exposure compensation position
- id: CAM_BacklightModeInq
  type: enum
  values: [on, off]
  description: Backlight mode inquiry
- id: CAM_ApertureInq
  type: integer
  description: Aperture gain inquiry
- id: CAM_PictureEffectModeInq
  type: enum
  values: [off, neg_art, bw]
  description: Picture effect mode inquiry
- id: CAM_MemoryInq
  type: integer
  description: Last operated memory number
- id: SYS_MenuModeInq
  type: enum
  values: [on, off]
  description: Menu display mode inquiry
- id: CAM_IDInq
  type: integer
  description: Camera ID (0000 to FFFF)
- id: CAM_VersionInq
  type: string
  description: Model code and ROM version
- id: InformationDisplayInq
  type: enum
  values: [on, off]
  description: Information display state
- id: VideoSystemInq
  type: enum
  values: [1080i60, 1080p30, 720p60, 720p30, 1080p60, 1080i50, 1080p25, 720p50, 720p25, 1080p50]
  description: Video system inquiry
- id: IR_ReceiveInq
  type: enum
  values: [on, off]
  description: IR receiver state inquiry
- id: Pan_tiltMaxSpeedInq
  type: object
  description: Pan and tilt max speeds
- id: Pan_tiltPosInq
  type: object
  description: Pan and tilt current positions
- id: Pan_tiltModeInq
  type: object
  description: Pan/tilt status
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# Reserved presets (cannot be overwritten):
# - 93: Cruise through presets 0-29 in 10s intervals
# - 95: Open OSD Menu
# - 96: Clear ALL User Presets
# - 99: Reboot Camera
# - 100-108: Video format presets
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
VISCA protocol over TCP (port 5500) or serial RS-232 (9600 bps). Default static IP: 192.168.18.77. Camera address is 1-7 for serial. RTSP port default 554 or 5000 (streaming, not control).
<!-- UNRESOLVED: serial data_bits, parity, stop_bits not explicitly stated in source -->
<!-- UNRESOLVED: flow_control settings not stated in source -->

## Provenance

```yaml
source_domains:
  - docs.crestron.com
  - crestron.com
retrieved_at: 2026-05-01T02:00:50.953Z
last_checked_at: 2026-04-23T15:31:34.680Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:31:34.680Z
matched_actions: 90
action_count: 90
confidence: high
summary: "All 90 spec actions matched literally to VISCA command table; transport parameters verified; comprehensive coverage of control commands."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
