---
spec_id: admin/vaddio-roboshot-12-usb
schema_version: ai4av-public-spec-v1
revision: 1
title: "Vaddio RoboSHOT 12 USB Control Spec"
manufacturer: Vaddio
model_family: "RoboSHOT 12 USB"
aliases: []
compatible_with:
  manufacturers:
    - Vaddio
  models:
    - "RoboSHOT 12 USB"
    - 999-9920-000
    - 999-9920-001
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - web.archive.org
source_urls:
  - "https://web.archive.org/web/20160306091301if_/http://www.vaddio.com:80/library?path=d&file=342-0981-revb-roboshot-12-usb-manual.pdf"
  - "https://web.archive.org/web/20170625111004if_/http://www.vaddio.com/library?path=d&file=roboshot-12-usb-release-notes-instructions-2-1-2.pdf"
retrieved_at: 2026-06-12T20:50:03.114Z
last_checked_at: 2026-06-14T16:16:13.117Z
generated_at: 2026-06-14T16:16:13.117Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "IP streaming RTSP path/URL defaults not fully documented; firmware version compatibility range not stated"
  - "no event/notification protocol documented"
  - "no safety warnings, interlocks, or power-on sequencing requirements"
  - "firmware version compatibility range not stated; full RTSP URL/path defaulting scheme not documented; Iris/Preset value ranges for RoboSHOT 30 differ from RoboSHOT 12 and are mixed in source tables."
verification:
  verdict: verified
  checked_at: 2026-06-14T16:16:13.117Z
  matched_actions: 222
  action_count: 222
  confidence: medium
  summary: "All 222 spec actions matched verbatim in source; transport parameters verified; full command inventory represented. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Vaddio RoboSHOT 12 USB Control Spec

## Summary
The Vaddio RoboSHOT 12 USB is a PTZ camera offering RS-232 (modified VISCA-emulation), Telnet (ASCII CLI on TCP/23), and embedded web server control. This spec covers the RS-232 VISCA-emulation command/inquiry sets plus the Telnet Serial Command API.

<!-- UNRESOLVED: IP streaming RTSP path/URL defaults not fully documented; firmware version compatibility range not stated -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # default; 38400 also supported via DIP switch 6
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 23  # Telnet default
  default_ip: 169.254.1.1  # fallback when no DHCP
auth:
  type: password
  username: admin  # default Admin user
  password: password  # default Admin password
  notes: "Telnet requires the same admin credentials as the web server. RS-232 has no auth."
```

## Traits
```yaml
# All traits below inferred from command evidence in source
powerable: true   # CAM_Power On/Off, camera standby
routable: false   # no input switching - single imaging sensor
queryable: true   # full inquiry command set returns state
levelable: true   # zoom, focus, pan/tilt, iris, gain, shutter, brightness, detail, chroma, color
```

## Actions
```yaml
# RS-232 VISCA-emulation command set (8x 01 04 ... FF). "x" = camera address 1-7.

# --- Address / System ---
- id: address_set_broadcast
  label: Address Set (Broadcast)
  kind: action
  command: "88 30 01 FF"
  params: []

- id: if_clear_broadcast
  label: IF_Clear (Broadcast)
  kind: action
  command: "88 01 00 01 FF"
  params: []

- id: command_cancel
  label: Command Cancel
  kind: action
  command: "8x 2p FF"
  params:
    - name: socket
      type: integer
      description: Socket number 1-2

# --- Power ---
- id: cam_power_on
  label: CAM_Power On
  kind: action
  command: "8x 01 04 00 02 FF"
  params: []

- id: cam_power_off
  label: CAM_Power Off
  kind: action
  command: "8x 01 04 00 03 FF"
  params: []

# --- Zoom ---
- id: cam_zoom_stop
  label: CAM_Zoom Stop
  kind: action
  command: "8x 01 04 07 00 FF"
  params: []

- id: cam_zoom_tele_std
  label: CAM_Zoom Tele (Standard)
  kind: action
  command: "8x 01 04 07 02 FF"
  params: []

- id: cam_zoom_wide_std
  label: CAM_Zoom Wide (Standard)
  kind: action
  command: "8x 01 04 07 03 FF"
  params: []

- id: cam_zoom_tele_var
  label: CAM_Zoom Tele (Variable)
  kind: action
  command: "8x 01 04 07 2p FF"
  params:
    - name: speed
      type: integer
      description: Speed 0 (low) to 7 (high)

- id: cam_zoom_wide_var
  label: CAM_Zoom Wide (Variable)
  kind: action
  command: "8x 01 04 07 3p FF"
  params:
    - name: speed
      type: integer
      description: Speed 0 (low) to 7 (high)

- id: cam_zoom_direct
  label: CAM_Zoom Direct
  kind: action
  command: "8x 01 04 47 0p 0q 0r 0s FF"
  params:
    - name: position
      type: integer
      description: Zoom position 0x0000-0x4000

# --- Focus ---
- id: cam_focus_stop
  label: CAM_Focus Stop
  kind: action
  command: "8x 01 04 08 00 FF"
  params: []

- id: cam_focus_far_std
  label: CAM_Focus Far (Standard)
  kind: action
  command: "8x 01 04 08 02 FF"
  params: []

- id: cam_focus_near_std
  label: CAM_Focus Near (Standard)
  kind: action
  command: "8x 01 04 08 03 FF"
  params: []

- id: cam_focus_far_var
  label: CAM_Focus Far (Variable)
  kind: action
  command: "8x 01 04 08 2p FF"
  params:
    - name: speed
      type: integer
      description: Speed 0 (low) to 7 (high)

- id: cam_focus_near_var
  label: CAM_Focus Near (Variable)
  kind: action
  command: "8x 01 04 08 3p FF"
  params:
    - name: speed
      type: integer
      description: Speed 0 (low) to 7 (high)

- id: cam_focus_direct
  label: CAM_Focus Direct
  kind: action
  command: "8x 01 04 48 0p 0q 0r 0s FF"
  params:
    - name: position
      type: integer
      description: Focus position 0x1000-0xF000

- id: cam_focus_auto
  label: CAM_Focus Auto Focus
  kind: action
  command: "8x 01 04 38 02 FF"
  params: []

- id: cam_focus_manual
  label: CAM_Focus Manual Focus
  kind: action
  command: "8x 01 04 38 03 FF"
  params: []

- id: cam_focus_auto_manual
  label: CAM_Focus Auto/Manual Toggle
  kind: action
  command: "8x 01 04 08 10 FF"
  params: []

- id: cam_focus_one_push_trigger
  label: CAM_Focus One Push Trigger
  kind: action
  command: "8x 01 04 18 01 FF"
  params: []

- id: cam_focus_near_limit
  label: CAM_Focus Near Limit
  kind: action
  command: "8x 01 04 28 0p 0q 0r 0s FF"
  params:
    - name: position
      type: integer
      description: Near focus limit position

# --- Auto-Focus ---
- id: cam_af_sensitivity_normal
  label: CAM_AFSensitivity Normal
  kind: action
  command: "8x 01 04 58 02 FF"
  params: []

- id: cam_af_sensitivity_low
  label: CAM_AFSensitivity Low
  kind: action
  command: "8x 01 04 58 03 FF"
  params: []

- id: cam_af_mode_normal
  label: CAM_AFMode Normal AF
  kind: action
  command: "8x 01 04 57 00 FF"
  params: []

- id: cam_af_mode_interval
  label: CAM_AFMode Interval AF
  kind: action
  command: "8x 01 04 57 01 FF"
  params: []

- id: cam_af_mode_zoom_trigger
  label: CAM_AFMode Zoom Trigger AF
  kind: action
  command: "8x 01 04 57 02 FF"
  params: []

- id: cam_af_mode_activate_interval_time
  label: CAM_AFMode Activate/Internal Time
  kind: action
  command: "8x 01 04 27 0p 0q 0r 0s FF"
  params:
    - name: movement_time
      type: integer
      description: Movement time
    - name: interval
      type: integer
      description: Interval

# --- IR Correction ---
- id: cam_ir_correction_standard
  label: CAM_IRCorrection Standard
  kind: action
  command: "8x 01 04 11 00 FF"
  params: []

- id: cam_ir_correction_ir_light
  label: CAM_IRCorrection IR Light
  kind: action
  command: "8x 01 04 11 01 FF"
  params: []

# --- ZoomFocus Direct ---
- id: cam_zoom_focus_direct
  label: CAM_ZoomFocus Direct
  kind: action
  command: "8x 01 04 47 0p 0q 0r 0s 0t 0u 0v 0w FF"
  params:
    - name: zoom_position
      type: integer
      description: Zoom position 0x0000-0x7AC0
    - name: focus_position
      type: integer
      description: Focus position 0x1000-0xF000

# --- White Balance ---
- id: cam_wb_auto
  label: CAM_WB Auto
  kind: action
  command: "8x 01 04 35 00 FF"
  params: []

- id: cam_wb_indoor
  label: CAM_WB Indoor
  kind: action
  command: "8x 01 04 35 01 FF"
  params: []

- id: cam_wb_outdoor
  label: CAM_WB Outdoor
  kind: action
  command: "8x 01 04 35 02 FF"
  params: []

- id: cam_wb_one_push_wb
  label: CAM_WB One Push WB
  kind: action
  command: "8x 01 04 35 03 FF"
  params: []

- id: cam_wb_atw
  label: CAM_WB ATW (Auto Tracing)
  kind: action
  command: "8x 01 04 35 04 FF"
  params: []

- id: cam_wb_manual
  label: CAM_WB Manual
  kind: action
  command: "8x 01 04 35 05 FF"
  params: []

- id: cam_wb_one_push_trigger
  label: CAM_WB One Push Trigger
  kind: action
  command: "8x 01 04 10 05 FF"
  params: []

- id: cam_wb_outdoor_auto
  label: CAM_WB Outdoor Auto
  kind: action
  command: "8x 01 04 35 06 FF"
  params: []

- id: cam_wb_sodium_lamp_auto
  label: CAM_WB Sodium Lamp Auto
  kind: action
  command: "8x 01 04 35 07 FF"
  params: []

- id: cam_wb_sodium_lamp
  label: CAM_WB Sodium Lamp
  kind: action
  command: "8x 01 04 35 08 FF"
  params: []

- id: cam_wb_sodium_lamp_outdoor_auto
  label: CAM_WB Sodium Lamp Outdoor Auto
  kind: action
  command: "8x 01 04 35 09 FF"
  params: []

# --- R/B Gain ---
- id: cam_rgain_reset
  label: CAM_RGain Reset
  kind: action
  command: "8x 01 04 03 00 FF"
  params: []

- id: cam_rgain_up
  label: CAM_RGain Up
  kind: action
  command: "8x 01 04 03 01 FF"
  params: []

- id: cam_rgain_down
  label: CAM_RGain Down
  kind: action
  command: "8x 01 04 03 02 FF"
  params: []

- id: cam_rgain_direct
  label: CAM_RGain Direct
  kind: action
  command: "8x 01 04 43 00 00 0p 0q FF"
  params:
    - name: value
      type: integer
      description: Red gain 0x00-0xFF

- id: cam_bgain_reset
  label: CAM_BGain Reset
  kind: action
  command: "8x 01 04 04 00 FF"
  params: []

- id: cam_bgain_up
  label: CAM_BGain Up
  kind: action
  command: "8x 01 04 04 01 FF"
  params: []

- id: cam_bgain_down
  label: CAM_BGain Down
  kind: action
  command: "8x 01 04 04 02 FF"
  params: []

- id: cam_bgain_direct
  label: CAM_BGain Direct
  kind: action
  command: "8x 01 04 44 00 00 0p 0q FF"
  params:
    - name: value
      type: integer
      description: Blue gain 0x00-0xFF

# --- Auto Exposure Modes ---
- id: cam_ae_full_auto
  label: CAM_AE Full Auto
  kind: action
  command: "8x 01 04 39 00 FF"
  params: []

- id: cam_ae_manual
  label: CAM_AE Manual
  kind: action
  command: "8x 01 04 39 03 FF"
  params: []

- id: cam_ae_shutter_priority
  label: CAM_AE Shutter Priority
  kind: action
  command: "8x 01 04 39 0A FF"
  params: []

- id: cam_ae_iris_priority
  label: CAM_AE Iris Priority
  kind: action
  command: "8x 01 04 39 0B FF"
  params: []

- id: cam_ae_bright
  label: CAM_AE Bright
  kind: action
  command: "8x 01 04 39 0D FF"
  params: []

# --- Shutter ---
- id: cam_shutter_reset
  label: CAM_Shutter Reset
  kind: action
  command: "8x 01 04 0A 00 FF"
  params: []

- id: cam_shutter_up
  label: CAM_Shutter Up
  kind: action
  command: "8x 01 04 0A 02 FF"
  params: []

- id: cam_shutter_down
  label: CAM_Shutter Down
  kind: action
  command: "8x 01 04 0A 03 FF"
  params: []

- id: cam_shutter_direct
  label: CAM_Shutter Direct
  kind: action
  command: "8x 01 04 4A 00 00 0p 0q FF"
  params:
    - name: position
      type: integer
      description: Shutter position 0x00-0x15

# --- Iris ---
- id: cam_iris_reset
  label: CAM_Iris Reset
  kind: action
  command: "8x 01 04 0B 00 FF"
  params: []

- id: cam_iris_up
  label: CAM_Iris Up
  kind: action
  command: "8x 01 04 0B 02 FF"
  params: []

- id: cam_iris_down
  label: CAM_Iris Down
  kind: action
  command: "8x 01 04 0B 03 FF"
  params: []

- id: cam_iris_direct
  label: CAM_Iris Direct
  kind: action
  command: "8x 01 04 4B 00 00 0p 0q FF"
  params:
    - name: position
      type: integer
      description: Iris position (RoboSHOT 12: 0x00, 0x07-0x11)

# --- Gain ---
- id: cam_gain_reset
  label: CAM_Gain Reset
  kind: action
  command: "8x 01 04 0C 00 FF"
  params: []

- id: cam_gain_up
  label: CAM_Gain Up
  kind: action
  command: "8x 01 04 0C 02 FF"
  params: []

- id: cam_gain_down
  label: CAM_Gain Down
  kind: action
  command: "8x 01 04 0C 03 FF"
  params: []

- id: cam_gain_direct
  label: CAM_Gain Direct
  kind: action
  command: "8x 01 04 4C 00 00 0p 0q FF"
  params:
    - name: position
      type: integer
      description: Gain position 0x01-0x0F

- id: cam_gain_limit
  label: CAM_Gain Limit
  kind: action
  command: "8x 01 04 2C 0p FF"
  params:
    - name: limit
      type: integer
      description: Gain limit 0x04-0x0F

# --- Bright ---
- id: cam_bright_reset
  label: CAM_Bright Reset
  kind: action
  command: "8x 01 04 0D 00 FF"
  params: []

- id: cam_bright_up
  label: CAM_Bright Up
  kind: action
  command: "8x 01 04 0D 02 FF"
  params: []

- id: cam_bright_down
  label: CAM_Bright Down
  kind: action
  command: "8x 01 04 0D 03 FF"
  params: []

# --- Exposure Compensation ---
- id: cam_expcomp_on
  label: CAM_ExpComp On
  kind: action
  command: "8x 01 04 3E 02 FF"
  params: []

- id: cam_expcomp_off
  label: CAM_ExpComp Off
  kind: action
  command: "8x 01 04 3E 03 FF"
  params: []

- id: cam_expcomp_reset
  label: CAM_ExpComp Reset
  kind: action
  command: "8x 01 04 0E 00 FF"
  params: []

- id: cam_expcomp_up
  label: CAM_ExpComp Up
  kind: action
  command: "8x 01 04 0E 02 FF"
  params: []

- id: cam_expcomp_down
  label: CAM_ExpComp Down
  kind: action
  command: "8x 01 04 0E 03 FF"
  params: []

- id: cam_expcomp_direct
  label: CAM_ExpComp Direct
  kind: action
  command: "8x 01 04 4E 00 00 0p 0q FF"
  params:
    - name: position
      type: integer
      description: ExpComp position 0x00-0x0E

# --- Backlight ---
- id: cam_backlight_on
  label: CAM_BackLight On
  kind: action
  command: "8x 01 04 33 02 FF"
  params: []

- id: cam_backlight_off
  label: CAM_BackLight Off
  kind: action
  command: "8x 01 04 33 03 FF"
  params: []

# --- Tally ---
- id: cam_tally_on
  label: CAM_Tally On
  kind: action
  command: "8x 01 7E 01 0A 00 02 FF"
  params: []

- id: cam_tally_off
  label: CAM_Tally Off
  kind: action
  command: "8x 01 7E 01 0A 00 03 FF"
  params: []

# --- Wide Dynamic ---
- id: cam_wd_on
  label: CAM_WD On
  kind: action
  command: "8x 01 04 3D 02 FF"
  params: []

- id: cam_wd_off
  label: CAM_WD Off
  kind: action
  command: "8x 01 04 3D 03 FF"
  params: []

- id: cam_wd_ve_on
  label: CAM_WD VE On
  kind: action
  command: "8x 01 04 3D 06 FF"
  params: []

- id: cam_wd_set_parameter
  label: CAM_WD Set Parameter
  kind: action
  command: "8x 01 04 2D 00 0q 0r 0s 00 00 00 00 FF"
  params:
    - name: brightness
      type: integer
      description: Display brightness 0 (dark) to 6 (bright)
    - name: compensation_selection
      type: integer
      description: 0: very dark, 1: dark, 2: std, 3: bright
    - name: compensation_level
      type: integer
      description: 0: low, 1: mid, 2: high

# --- Aperture ---
- id: cam_aperture_reset
  label: CAM_Aperture Reset
  kind: action
  command: "8x 01 04 02 00 FF"
  params: []

- id: cam_aperture_up
  label: CAM_Aperture Up
  kind: action
  command: "8x 01 04 02 01 FF"
  params: []

- id: cam_aperture_down
  label: CAM_Aperture Down
  kind: action
  command: "8x 01 04 02 02 FF"
  params: []

- id: cam_aperture_direct
  label: CAM_Aperture Direct
  kind: action
  command: "8x 01 04 42 00 00 0p 0q FF"
  params:
    - name: position
      type: integer
      description: Aperture position 0x00-0xFF

# --- High Resolution / NR / Gamma / LR Reverse / Freeze ---
- id: cam_hr_on
  label: CAM_HR On
  kind: action
  command: "8x 01 04 52 02 FF"
  params: []

- id: cam_hr_off
  label: CAM_HR Off
  kind: action
  command: "8x 01 04 52 03 FF"
  params: []

- id: cam_nr_set
  label: CAM_NR Set
  kind: action
  command: "8x 01 04 53 0p FF"
  params:
    - name: level
      type: integer
      description: Noise reduction 0: off, 1-5

- id: cam_gamma_set
  label: CAM_Gamma Set
  kind: action
  command: "8x 01 04 5B 0p FF"
  params:
    - name: setting
      type: integer
      description: Gamma 0: std, 1: straight

- id: cam_lr_reverse_on
  label: CAM_LR_Reverse On
  kind: action
  command: "8x 01 04 61 02 FF"
  params: []

- id: cam_lr_reverse_off
  label: CAM_LR_Reverse Off
  kind: action
  command: "8x 01 04 61 03 FF"
  params: []

- id: cam_freeze_on
  label: CAM_Freeze On
  kind: action
  command: "8x 01 04 62 02 FF"
  params: []

- id: cam_freeze_off
  label: CAM_Freeze Off
  kind: action
  command: "8x 01 04 62 03 FF"
  params: []

# --- Picture Effect / Flip / ICR ---
- id: cam_picture_effect_off
  label: CAM_PictureEffect Off
  kind: action
  command: "8x 01 04 63 00 FF"
  params: []

- id: cam_picture_effect_neg_art
  label: CAM_PictureEffect Neg. Art
  kind: action
  command: "8x 01 04 63 02 FF"
  params: []

- id: cam_picture_effect_bw
  label: CAM_PictureEffect Black&White
  kind: action
  command: "8x 01 04 63 04 FF"
  params: []

- id: cam_picture_flip_on
  label: CAM_PictureFlip On
  kind: action
  command: "8x 01 04 66 02 FF"
  params: []

- id: cam_picture_flip_off
  label: CAM_PictureFlip Off
  kind: action
  command: "8x 01 04 66 03 FF"
  params: []

- id: cam_icr_on
  label: CAM_ICR On
  kind: action
  command: "8x 01 04 01 02 FF"
  params: []

- id: cam_icr_off
  label: CAM_ICR Off
  kind: action
  command: "8x 01 04 01 03 FF"
  params: []

# --- Camera ID Write ---
- id: cam_id_write
  label: CAM_IDWrite
  kind: action
  command: "8x 01 04 22 0p 0q 0r 0s FF"
  params:
    - name: camera_id
      type: integer
      description: Camera ID 0x0000-0xFFFF

# --- Memory (Presets) ---
- id: cam_memory_reset
  label: CAM_Memory Reset
  kind: action
  command: "8x 01 04 3F 00 0p FF"
  params:
    - name: preset
      type: integer
      description: Preset number 0x00-0x0F

- id: cam_memory_set_standard
  label: CAM_Memory Set Standard
  kind: action
  command: "8x 01 04 3F 01 0p FF"
  params:
    - name: preset
      type: integer
      description: Preset number 0x00-0x0F

- id: cam_memory_set_standard_scene
  label: CAM_Memory Set Standard with Scene
  kind: action
  command: "8x 01 04 3F 21 0p FF"
  params:
    - name: preset
      type: integer
      description: Preset number 0x00-0x0F

- id: cam_memory_set_tri_sync
  label: CAM_Memory Set Tri-Sync
  kind: action
  command: "8x 01 04 3F 11 0p 0q 0r FF"
  params:
    - name: preset
      type: integer
      description: Preset number 0x00-0x0F
    - name: speed
      type: integer
      description: Tri-sync speed 0x01-0x18

- id: cam_memory_set_tri_sync_scene
  label: CAM_Memory Set Tri-Sync with Scene
  kind: action
  command: "8x 01 04 3F 31 0p 0q 0r FF"
  params:
    - name: preset
      type: integer
      description: Preset number 0x00-0x0F
    - name: speed
      type: integer
      description: Tri-sync speed 0x01-0x18

- id: cam_memory_recall_standard
  label: CAM_Memory Recall Standard
  kind: action
  command: "8x 01 04 3F 02 0p FF"
  params:
    - name: preset
      type: integer
      description: Preset number 0x00-0x0F

- id: cam_memory_recall_tri_sync
  label: CAM_Memory Recall Tri-Sync
  kind: action
  command: "8x 01 04 3F 12 0p FF"
  params:
    - name: preset
      type: integer
      description: Preset number 0x00-0x0F

# --- Display / Mute ---
- id: cam_display_on
  label: Cam_Display On
  kind: action
  command: "8x 01 04 15 02 FF"
  params: []

- id: cam_display_on_alt
  label: Cam_Display On (Alternate)
  kind: action
  command: "8x 01 06 06 02 FF"
  params: []

- id: cam_display_off
  label: Cam_Display Off
  kind: action
  command: "8x 01 04 15 03 FF"
  params: []

- id: cam_display_off_alt
  label: Cam_Display Off (Alternate)
  kind: action
  command: "8x 01 06 06 03 FF"
  params: []

- id: cam_display_toggle
  label: Cam_Display On/Off
  kind: action
  command: "8x 01 04 15 10 FF"
  params: []

- id: cam_display_toggle_alt
  label: Cam_Display On/Off (Alternate)
  kind: action
  command: "8x 01 06 06 10 FF"
  params: []

- id: cam_mute_on
  label: Cam_Mute On
  kind: action
  command: "8x 01 04 75 02 FF"
  params: []

- id: cam_mute_off
  label: Cam_Mute Off
  kind: action
  command: "8x 01 04 75 03 FF"
  params: []

- id: cam_mute_toggle
  label: Cam_Mute On/Off
  kind: action
  command: "8x 01 04 75 10 FF"
  params: []

# --- Color Enhance / Chroma Suppress / Color Gain / Color Hue / Gamma Offset ---
- id: cam_color_enhance_set
  label: CAM_ColorEnhance Parameter Set
  kind: action
  command: "8x 01 04 20 mm 00 pp qq rr ss tt uu FF"
  params:
    - name: threshold
      type: integer
      description: mm threshold level
    - name: y_high
      type: integer
      description: Y fixed color high intensity (00-7F)
    - name: cr_high
      type: integer
      description: Cr fixed color high intensity (00-7F)
    - name: cb_high
      type: integer
      description: Cb fixed color high intensity (00-7F)
    - name: y_low
      type: integer
      description: Y fixed color low intensity (00-7F)
    - name: cr_low
      type: integer
      description: Cr fixed color low intensity (00-7F)
    - name: cb_low
      type: integer
      description: Cb fixed color low intensity (00-7F)

- id: cam_color_enhance_on
  label: CAM_ColorEnhance On
  kind: action
  command: "8x 01 04 50 02 FF"
  params: []

- id: cam_color_enhance_off
  label: CAM_ColorEnhance Off
  kind: action
  command: "8x 01 04 50 03 FF"
  params: []

- id: cam_chroma_suppress
  label: CAM_ChromaSuppress
  kind: action
  command: "8x 01 04 5F pp FF"
  params:
    - name: level
      type: integer
      description: 00 off, 01-03 on (3 levels)

- id: cam_color_gain_direct
  label: CAM_ColorGain Direct
  kind: action
  command: "8x 01 04 49 00 00 00 0p FF"
  params:
    - name: setting
      type: integer
      description: Color gain 0x00-0x04

- id: cam_color_hue_direct
  label: CAM_ColorHue Direct
  kind: action
  command: "8x 01 04 4F 00 00 00 0p FF"
  params:
    - name: setting
      type: integer
      description: Color hue 0x00 (-14°) to 0x0E (+14°)

- id: cam_gamma_offset
  label: CAM_GammaOffset Direct
  kind: action
  command: "8x 01 04 1E 00 00 00 0s 0t 0u FF"
  params:
    - name: polarity
      type: integer
      description: 0: plus, 1: minus
    - name: offset
      type: integer
      description: s=0: 00-40, s=1: 00-10

# --- Pan-Tilt Drive ---
- id: pan_tilt_up
  label: Pan-Tilt Up
  kind: action
  command: "8x 01 06 01 vv ww 03 01 FF"
  params:
    - name: pan_speed
      type: integer
      description: 0x01-0x18
    - name: tilt_speed
      type: integer
      description: 0x01-0x14

- id: pan_tilt_down
  label: Pan-Tilt Down
  kind: action
  command: "8x 01 06 01 vv ww 03 02 FF"
  params:
    - name: pan_speed
      type: integer
      description: 0x01-0x18
    - name: tilt_speed
      type: integer
      description: 0x01-0x14

- id: pan_tilt_left
  label: Pan-Tilt Left
  kind: action
  command: "8x 01 06 01 vv ww 01 03 FF"
  params:
    - name: pan_speed
      type: integer
      description: 0x01-0x18
    - name: tilt_speed
      type: integer
      description: 0x01-0x14

- id: pan_tilt_right
  label: Pan-Tilt Right
  kind: action
  command: "8x 01 06 01 vv ww 02 03 FF"
  params:
    - name: pan_speed
      type: integer
      description: 0x01-0x18
    - name: tilt_speed
      type: integer
      description: 0x01-0x14

- id: pan_tilt_up_left
  label: Pan-Tilt UpLeft
  kind: action
  command: "8x 01 06 01 vv ww 01 01 FF"
  params:
    - name: pan_speed
      type: integer
      description: 0x01-0x18
    - name: tilt_speed
      type: integer
      description: 0x01-0x14

- id: pan_tilt_up_right
  label: Pan-Tilt UpRight
  kind: action
  command: "8x 01 06 01 vv ww 02 01 FF"
  params:
    - name: pan_speed
      type: integer
      description: 0x01-0x18
    - name: tilt_speed
      type: integer
      description: 0x01-0x14

- id: pan_tilt_down_left
  label: Pan-Tilt DownLeft
  kind: action
  command: "8x 01 06 01 vv ww 01 02 FF"
  params:
    - name: pan_speed
      type: integer
      description: 0x01-0x18
    - name: tilt_speed
      type: integer
      description: 0x01-0x14

- id: pan_tilt_down_right
  label: Pan-Tilt DownRight
  kind: action
  command: "8x 01 06 01 vv ww 02 02 FF"
  params:
    - name: pan_speed
      type: integer
      description: 0x01-0x18
    - name: tilt_speed
      type: integer
      description: 0x01-0x14

- id: pan_tilt_stop
  label: Pan-Tilt Stop
  kind: action
  command: "8x 01 06 01 vv ww 03 03 FF"
  params:
    - name: pan_speed
      type: integer
      description: 0x01-0x18
    - name: tilt_speed
      type: integer
      description: 0x01-0x14

- id: pan_tilt_absolute
  label: Pan-Tilt Absolute Position
  kind: action
  command: "8x 01 06 02 vv ww 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"
  params:
    - name: pan_speed
      type: integer
      description: 0x01-0x18
    - name: tilt_speed
      type: integer
      description: 0x01-0x14
    - name: pan_position
      type: integer
      description: 0x90E2-0x6BD8
    - name: tilt_position
      type: integer
      description: 0xEB99-0x3D59

- id: pan_tilt_home
  label: Pan-Tilt Home
  kind: action
  command: "8x 01 06 04 FF"
  params: []

# --- Pan-Tilt-Zoom Drive ---
- id: ptz_up
  label: Pan-Tilt-Zoom Up
  kind: action
  command: "8x 01 06 0A vv ww rr 03 01 03 FF"
  params:
    - name: pan_speed
      type: integer
      description: 0x01-0x18
    - name: tilt_speed
      type: integer
      description: 0x01-0x14
    - name: zoom_speed
      type: integer
      description: 0x00-0x07

- id: ptz_down
  label: Pan-Tilt-Zoom Down
  kind: action
  command: "8x 01 06 0A vv ww rr 03 02 03 FF"
  params:
    - name: pan_speed
      type: integer
      description: 0x01-0x18
    - name: tilt_speed
      type: integer
      description: 0x01-0x14
    - name: zoom_speed
      type: integer
      description: 0x00-0x07

- id: ptz_left
  label: Pan-Tilt-Zoom Left
  kind: action
  command: "8x 01 06 0A vv ww rr 01 03 03 FF"
  params:
    - name: pan_speed
      type: integer
      description: 0x01-0x18
    - name: tilt_speed
      type: integer
      description: 0x01-0x14
    - name: zoom_speed
      type: integer
      description: 0x00-0x07

- id: ptz_right
  label: Pan-Tilt-Zoom Right
  kind: action
  command: "8x 01 06 0A vv ww rr 02 03 03 FF"
  params:
    - name: pan_speed
      type: integer
      description: 0x01-0x18
    - name: tilt_speed
      type: integer
      description: 0x01-0x14
    - name: zoom_speed
      type: integer
      description: 0x00-0x07

- id: ptz_in
  label: Pan-Tilt-Zoom In
  kind: action
  command: "8x 01 06 0A vv ww rr 03 03 01 FF"
  params:
    - name: pan_speed
      type: integer
      description: 0x01-0x18
    - name: tilt_speed
      type: integer
      description: 0x01-0x14
    - name: zoom_speed
      type: integer
      description: 0x00-0x07

- id: ptz_out
  label: Pan-Tilt-Zoom Out
  kind: action
  command: "8x 01 06 0A vv ww rr 03 03 02 FF"
  params:
    - name: pan_speed
      type: integer
      description: 0x01-0x18
    - name: tilt_speed
      type: integer
      description: 0x01-0x14
    - name: zoom_speed
      type: integer
      description: 0x00-0x07

- id: ptz_stop
  label: Pan-Tilt-Zoom Stop
  kind: action
  command: "8x 01 06 0A vv ww rr 03 03 03 FF"
  params:
    - name: pan_speed
      type: integer
      description: 0x01-0x18
    - name: tilt_speed
      type: integer
      description: 0x01-0x14
    - name: zoom_speed
      type: integer
      description: 0x00-0x07

- id: ptz_absolute
  label: Pan-Tilt-Zoom Absolute Position
  kind: action
  command: "8x 01 06 0B vv ww 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z 0R 0R 0R 0R FF"
  params:
    - name: pan_speed
      type: integer
      description: 0x01-0x18
    - name: tilt_speed
      type: integer
      description: 0x01-0x14
    - name: pan_position
      type: integer
      description: 0x90E2-0x6BD8
    - name: tilt_position
      type: integer
      description: 0xEB99-0x3D59
    - name: zoom_position
      type: integer
      description: 0x0000-0x7AC0

- id: ptz_home
  label: Pan-Tilt-Zoom Home
  kind: action
  command: "8x 01 06 0C FF"
  params: []

# --- PTZ Preset Speed (Non-Tri-Sync) ---
- id: cam_ptz_preset_speed
  label: CAM_PTZ_PresetSpeed (Non-Tri-Sync)
  kind: action
  command: "8x 01 7E 01 0B pp qq rr FF"
  params:
    - name: pan_speed
      type: integer
      description: 0x01-0x18
    - name: tilt_speed
      type: integer
      description: 0x01-0x14
    - name: zoom_speed
      type: integer
      description: 0x00-0x07

# ============================================================
# INQUIRY COMMANDS (kind: query)
# ============================================================
- id: cam_power_inq
  label: CAM_PowerInq
  kind: query
  command: "8x 09 04 00 FF"
  response_format: "y0 50 02 FF | y0 50 03 FF"
  params: []

- id: cam_zoom_pos_inq
  label: CAM_ZoomPosInq
  kind: query
  command: "8x 09 04 47 FF"
  response_format: "y0 50 0p 0q 0r 0s FF"
  params: []

- id: cam_focus_mode_inq
  label: CAM_FocusModeInq
  kind: query
  command: "8x 09 04 38 FF"
  response_format: "y0 50 02 FF (auto) | y0 50 03 FF (manual)"
  params: []

- id: cam_focus_pos_inq
  label: CAM_FocusPosInq
  kind: query
  command: "8x 09 04 48 FF"
  response_format: "y0 50 0p 0q 0r 0s FF"
  params: []

- id: cam_focus_near_limit_inq
  label: CAM_FocusNearLimitInq
  kind: query
  command: "8x 09 04 28 FF"
  response_format: "y0 50 0p 0q 0r 0s FF"
  params: []

- id: cam_af_sensitivity_inq
  label: CAM_AFSensitivityInq
  kind: query
  command: "8x 09 04 58 FF"
  response_format: "y0 50 02 FF (normal) | y0 50 03 FF (low)"
  params: []

- id: cam_af_mode_inq
  label: CAM_AFModeInq
  kind: query
  command: "8x 09 04 57 FF"
  response_format: "y0 50 00/01/02 FF"
  params: []

- id: cam_af_time_setting_inq
  label: CAM_AFTimeSettingInq
  kind: query
  command: "8x 09 04 27 FF"
  response_format: "y0 50 0p 0q 0r 0s FF"
  params: []

- id: cam_ir_correction_inq
  label: CAM_IRCorrectionInq
  kind: query
  command: "8x 09 04 11 FF"
  response_format: "y0 50 00/01 FF"
  params: []

- id: cam_wb_mode_inq
  label: CAM_WBModeInq
  kind: query
  command: "8x 09 04 35 FF"
  response_format: "y0 50 00-09 FF (10 modes)"
  params: []

- id: cam_rgain_inq
  label: CAM_RGainInq
  kind: query
  command: "8x 09 04 43 FF"
  response_format: "y0 50 00 00 0p 0q FF"
  params: []

- id: cam_bgain_inq
  label: CAM_BGainInq
  kind: query
  command: "8x 09 04 44 FF"
  response_format: "y0 50 00 00 0p 0q FF"
  params: []

- id: cam_ae_mode_inq
  label: CAM_AEModeInq
  kind: query
  command: "8x 09 04 39 FF"
  response_format: "y0 50 00/03/0A/0B/0D FF"
  params: []

- id: cam_shutter_pos_inq
  label: CAM_ShutterPosInq
  kind: query
  command: "8x 09 04 4A FF"
  response_format: "y0 50 00 00 0p 0q FF"
  params: []

- id: cam_iris_pos_inq
  label: CAM_IrisPosInq
  kind: query
  command: "8x 09 04 4B FF"
  response_format: "y0 50 00 00 0p 0q FF"
  params: []

- id: cam_gain_pos_inq
  label: CAM_GainPosInq
  kind: query
  command: "8x 09 04 4C FF"
  response_format: "y0 50 00 00 0p 0q FF"
  params: []

- id: cam_gain_limit_inq
  label: CAM_GainLimitInq
  kind: query
  command: "8x 09 04 2C FF"
  response_format: "y0 50 0q FF"
  params: []

- id: cam_expcomp_mode_inq
  label: CAM_ExpCompModeInq
  kind: query
  command: "8x 09 04 3E FF"
  response_format: "y0 50 02 FF (on) | y0 50 03 FF (off)"
  params: []

- id: cam_expcomp_pos_inq
  label: CAM_ExpCompPosInq
  kind: query
  command: "8x 09 04 4E FF"
  response_format: "y0 50 00 00 0p 0q FF"
  params: []

- id: cam_backlight_mode_inq
  label: CAM_BackLightModeInq
  kind: query
  command: "8x 09 04 33 FF"
  response_format: "y0 50 02 FF (on) | y0 50 03 FF (off)"
  params: []

- id: cam_tally_inq
  label: CAM_TallyInq
  kind: query
  command: "8x 09 7E 01 0A FF"
  response_format: "y0 50 02/03 FF"
  params: []

- id: cam_resolution_inq
  label: CAM_ResolutionInq
  kind: query
  command: "8x 09 06 23 FF"
  response_format: "y0 50 0p 0q FF"
  params: []

- id: cam_wd_mode_inq
  label: CAM_WDModeInq
  kind: query
  command: "8x 09 04 3D FF"
  response_format: "y0 50 02/03/06 FF"
  params: []

- id: cam_wd_parameter_inq
  label: CAM_WDParameterInq
  kind: query
  command: "8x 09 04 2D FF"
  response_format: "y0 50 00 0q 0r 0s 0t 0u 00 00 FF"
  params: []

- id: cam_aperture_inq
  label: CAM_ApertureInq
  kind: query
  command: "8x 09 04 42 FF"
  response_format: "y0 50 00 00 0p 0q FF"
  params: []

- id: cam_hr_mode_inq
  label: CAM_HRModeInq
  kind: query
  command: "8x 09 04 52 FF"
  response_format: "y0 50 02/03 FF"
  params: []

- id: cam_nr_inq
  label: CAM_NRInq
  kind: query
  command: "8x 09 04 53 FF"
  response_format: "y0 50 0p FF (0-5)"
  params: []

- id: cam_gamma_inq
  label: CAM_GammaInq
  kind: query
  command: "8x 09 04 5B FF"
  response_format: "y0 50 0p FF (0/1)"
  params: []

- id: cam_lr_reverse_mode_inq
  label: CAM_LR_ReverseModeInq
  kind: query
  command: "8x 09 04 61 FF"
  response_format: "y0 50 02/03 FF"
  params: []

- id: cam_freeze_mode_inq
  label: CAM_FreezeModeInq
  kind: query
  command: "8x 09 04 62 FF"
  response_format: "y0 50 02/03 FF"
  params: []

- id: cam_picture_effect_mode_inq
  label: CAM_PictureEffectModeInq
  kind: query
  command: "8x 09 04 63 FF"
  response_format: "y0 50 00/02/04 FF"
  params: []

- id: cam_picture_flip_mode_inq
  label: CAM_PictureFlipModeInq
  kind: query
  command: "8x 09 04 66 FF"
  response_format: "y0 50 02/03 FF"
  params: []

- id: cam_icr_mode_inq
  label: CAM_ICRModeInq
  kind: query
  command: "8x 09 04 01 FF"
  response_format: "y0 50 02/03 FF"
  params: []

- id: cam_memory_inq
  label: CAM_MemoryInq
  kind: query
  command: "8x 09 04 3F FF"
  response_format: "y0 50 pp FF (last recalled memory number)"
  params: []

- id: cam_memory_status_inq
  label: CAM_MemoryStatusInq
  kind: query
  command: "8x 09 04 3F 0p FF"
  response_format: "y0 50 0p 0q 0r 0s FF"
  params:
    - name: memory
      type: integer
      description: Memory number

- id: cam_mem_save_inq
  label: CAM_MemSaveInq
  kind: query
  command: "8x 09 04 23 0X FF"
  response_format: "y0 50 0p 0q 0r 0s FF"
  params:
    - name: address
      type: integer
      description: 0x00-0x07

- id: cam_display_mode_inq
  label: CAM_DisplayModeInq
  kind: query
  command: "8x 09 04 15 FF"
  response_format: "y0 50 02/03 FF (alt: 8x 09 06 06 FF)"
  params: []

- id: cam_mute_mode_inq
  label: CAM_MuteModeInq
  kind: query
  command: "8x 09 04 75 FF"
  response_format: "y0 50 02/03 FF"
  params: []

- id: cam_id_inq
  label: CAM_IDInq
  kind: query
  command: "8x 09 04 22 FF"
  response_format: "y0 50 0p 0q 0r 0s FF"
  params: []

- id: cam_version_inq
  label: CAM_VersionInq
  kind: query
  command: "8x 09 00 02 FF"
  response_format: "y0 50 00 10 mnpq 0E 0E 02 FF"
  params: []

- id: vaddio_model_inq
  label: Vaddio_ModelInq
  kind: query
  command: "8x 09 08 0E FF"
  response_format: "y0 50 05 00 00 00 00 FF (RoboSHOT-12) | y0 50 05 01 00 00 00 FF (RoboSHOT-30)"
  params: []

- id: cam_register_value_inq
  label: CAM_RegisterValueInq
  kind: query
  command: "8x 09 04 24 mm FF"
  response_format: "y0 50 0p 0p FF"
  params:
    - name: register
      type: integer
      description: Register number 0x00-0x7F

- id: cam_color_enhance_inq
  label: CAM_ColorEnhanceInq
  kind: query
  command: "8x 09 04 20 FF"
  response_format: "y0 50 mm 00 pp qq rr ss tt uu FF (alt: 8x 09 04 50 FF for on/off)"
  params: []

- id: cam_chroma_suppress_inq
  label: CAM_ChromaSuppressInq
  kind: query
  command: "8x 09 04 5F FF"
  response_format: "y0 50 pp FF"
  params: []

- id: cam_color_gain_inq
  label: CAM_ColorGainInq
  kind: query
  command: "8x 09 04 49 FF"
  response_format: "y0 50 00 00 00 0p FF"
  params: []

- id: cam_color_hue_inq
  label: CAM_ColorHueInq
  kind: query
  command: "8x 09 04 4F FF"
  response_format: "y0 50 00 00 00 0p FF"
  params: []

- id: cam_temp_inq
  label: CAM_TempInq
  kind: query
  command: "8x 09 04 68 FF"
  response_format: "y0 50 00 00 0p 0q FF"
  params: []

- id: cam_gamma_offset_inq
  label: CAM_GammaOffsetInq
  kind: query
  command: "8x 09 04 1E FF"
  response_format: "y0 50 00 00 00 0s 0t 0u FF"
  params: []

- id: pan_tilt_pos_inq
  label: Pan-TiltPosInq
  kind: query
  command: "8x 09 06 12 FF"
  response_format: "y0 50 0w 0w 0w 0w 0z 0z 0z 0z FF"
  params: []

# ============================================================
# TELNET SERIAL COMMAND API (TCP, ASCII, port 23)
# ============================================================
- id: telnet_camera_home
  label: Camera Home
  kind: action
  command: "camera home"
  transport: tcp
  params: []

- id: telnet_camera_pan
  label: Camera Pan
  kind: action
  command: "camera pan {direction} [{speed}]"
  transport: tcp
  params:
    - name: direction
      type: enum
      values: [left, right, stop]
    - name: speed
      type: integer
      description: Optional 1-24 (default 12)

- id: telnet_camera_tilt
  label: Camera Tilt
  kind: action
  command: "camera tilt {direction} [{speed}]"
  transport: tcp
  params:
    - name: direction
      type: enum
      values: [up, down, stop]
    - name: speed
      type: integer
      description: Optional 1-20 (default 10)

- id: telnet_camera_zoom
  label: Camera Zoom
  kind: action
  command: "camera zoom {direction} [{speed}]"
  transport: tcp
  params:
    - name: direction
      type: enum
      values: [in, out, stop]
    - name: speed
      type: integer
      description: Optional 1-7 (default 3)

- id: telnet_camera_preset_recall
  label: Camera Preset Recall
  kind: action
  command: "camera preset recall {preset}"
  transport: tcp
  params:
    - name: preset
      type: integer
      description: Preset number 1-16

- id: telnet_camera_preset_store
  label: Camera Preset Store
  kind: action
  command: "camera preset store {preset} [tri-sync {speed}] [save-ccu]"
  transport: tcp
  params:
    - name: preset
      type: integer
      description: Preset number 1-16
    - name: speed
      type: integer
      description: Optional tri-sync speed 1-24

- id: telnet_camera_focus_directional
  label: Camera Focus Directional
  kind: action
  command: "camera focus {direction} [{speed}]"
  transport: tcp
  params:
    - name: direction
      type: enum
      values: [near, far, stop]
    - name: speed
      type: integer
      description: Optional 1-8

- id: telnet_camera_focus_mode
  label: Camera Focus Mode
  kind: action
  command: "camera focus mode {mode}"
  transport: tcp
  params:
    - name: mode
      type: enum
      values: [auto, manual]

- id: telnet_camera_ccu_get
  label: Camera CCU Get
  kind: query
  command: "camera ccu get {key}"
  transport: tcp
  params:
    - name: key
      type: enum
      values: [all, auto_white_balance, red_gain, blue_gain, backlight_compensation, auto_iris, iris, gain, detail, chroma]

- id: telnet_camera_ccu_scene_recall
  label: Camera CCU Scene Recall
  kind: action
  command: "camera ccu scene recall {type} {index}"
  transport: tcp
  params:
    - name: type
      type: enum
      values: [factory, custom]
    - name: index
      type: integer
      description: factory 1-6, custom 1-3

- id: telnet_camera_ccu_scene_store
  label: Camera CCU Scene Store
  kind: action
  command: "camera ccu scene store {index}"
  transport: tcp
  params:
    - name: index
      type: integer
      description: 1-3

- id: telnet_camera_ccu_set
  label: Camera CCU Set
  kind: action
  command: "camera ccu set {key} {value}"
  transport: tcp
  params:
    - name: key
      type: enum
      values: [auto_white_balance, red_gain, blue_gain, backlight_compensation, auto_iris, iris, gain, detail, chroma]
    - name: value
      type: string
      description: "On/off for booleans; integer range per key (red/blue_gain 0-255, iris/gain 0-13, detail 0-15, chroma 0-14)"

- id: telnet_camera_standby
  label: Camera Standby
  kind: action
  command: "camera standby {state}"
  transport: tcp
  params:
    - name: state
      type: enum
      values: [on, off, toggle]

- id: telnet_streaming_settings_get
  label: Streaming Settings Get
  kind: query
  command: "streaming settings get"
  transport: tcp
  params: []

- id: telnet_history
  label: History
  kind: action
  command: "history [{limit}]"
  transport: tcp
  params:
    - name: limit
      type: integer
      description: Optional command history buffer size

- id: telnet_network_settings_get
  label: Network Settings Get
  kind: query
  command: "network settings get"
  transport: tcp
  params: []

- id: telnet_network_ping
  label: Network Ping
  kind: action
  command: "network ping [count {n}] [size {n}] {destination_ip}"
  transport: tcp
  params:
    - name: count
      type: integer
      description: Stop after count ECHO_REQUESTs (default 5)
    - name: size
      type: integer
      description: Data size in bytes (default 56)
    - name: destination_ip
      type: string
      description: Destination IP address

- id: telnet_system_factory_reset_get
  label: System Factory-Reset Get
  kind: query
  command: "system factory-reset get"
  transport: tcp
  params: []

- id: telnet_system_factory_reset_on
  label: System Factory-Reset Enable
  kind: action
  command: "system factory-reset on"
  transport: tcp
  params: []

- id: telnet_system_factory_reset_off
  label: System Factory-Reset Disable
  kind: action
  command: "system factory-reset off"
  transport: tcp
  params: []

- id: telnet_system_reboot
  label: System Reboot
  kind: action
  command: "system reboot [{seconds}]"
  transport: tcp
  params:
    - name: seconds
      type: integer
      description: Optional delay before reboot

- id: telnet_help
  label: Help
  kind: action
  command: "help"
  transport: tcp
  params: []

- id: telnet_version
  label: Version
  kind: query
  command: "version"
  transport: tcp
  params: []

- id: telnet_exit
  label: Exit
  kind: action
  command: "exit"
  transport: tcp
  params: []
```

## Feedbacks
```yaml
# RS-232 inquiry responses map directly to these observable states.
- id: power_state
  type: enum
  values: [on, standby]
  source_inquiry: cam_power_inq
- id: zoom_position
  type: integer
  description: 0x0000-0x4000
  source_inquiry: cam_zoom_pos_inq
- id: focus_mode
  type: enum
  values: [auto, manual]
  source_inquiry: cam_focus_mode_inq
- id: focus_position
  type: integer
  description: 0x1000-0xF000
  source_inquiry: cam_focus_pos_inq
- id: focus_near_limit
  type: integer
  source_inquiry: cam_focus_near_limit_inq
- id: af_sensitivity
  type: enum
  values: [normal, low]
  source_inquiry: cam_af_sensitivity_inq
- id: af_mode
  type: enum
  values: [normal, interval, zoom_trigger]
  source_inquiry: cam_af_mode_inq
- id: ir_correction
  type: enum
  values: [standard, ir_light]
  source_inquiry: cam_ir_correction_inq
- id: white_balance_mode
  type: enum
  values: [auto, indoor, outdoor, one_push_wb, atw, manual, outdoor_auto, sodium_lamp_auto, sodium_lamp, sodium_lamp_outdoor_auto]
  source_inquiry: cam_wb_mode_inq
- id: red_gain
  type: integer
  description: 0x00-0xFF
  source_inquiry: cam_rgain_inq
- id: blue_gain
  type: integer
  description: 0x00-0xFF
  source_inquiry: cam_bgain_inq
- id: ae_mode
  type: enum
  values: [full_auto, manual, shutter_priority, iris_priority, bright]
  source_inquiry: cam_ae_mode_inq
- id: shutter_position
  type: integer
  description: 0x00-0x15
  source_inquiry: cam_shutter_pos_inq
- id: iris_position
  type: integer
  description: 0x00, 0x07-0x11 for RoboSHOT 12
  source_inquiry: cam_iris_pos_inq
- id: gain_position
  type: integer
  description: 0x01-0x0F
  source_inquiry: cam_gain_pos_inq
- id: gain_limit
  type: integer
  description: 0x04-0x0F
  source_inquiry: cam_gain_limit_inq
- id: exposure_compensation_mode
  type: enum
  values: [on, off]
  source_inquiry: cam_expcomp_mode_inq
- id: exposure_compensation_position
  type: integer
  description: 0x00-0x0E
  source_inquiry: cam_expcomp_pos_inq
- id: backlight_mode
  type: enum
  values: [on, off]
  source_inquiry: cam_backlight_mode_inq
- id: tally_state
  type: enum
  values: [on, off]
  source_inquiry: cam_tally_inq
- id: video_resolution
  type: integer
  source_inquiry: cam_resolution_inq
- id: wd_mode
  type: enum
  values: [on, off, ve_on]
  source_inquiry: cam_wd_mode_inq
- id: wd_parameter
  type: object
  source_inquiry: cam_wd_parameter_inq
- id: aperture_position
  type: integer
  description: 0x00-0xFF
  source_inquiry: cam_aperture_inq
- id: high_resolution_mode
  type: enum
  values: [on, off]
  source_inquiry: cam_hr_mode_inq
- id: noise_reduction_level
  type: integer
  description: 0x00-0x05
  source_inquiry: cam_nr_inq
- id: gamma_setting
  type: enum
  values: [standard, straight]
  source_inquiry: cam_gamma_inq
- id: lr_reverse_mode
  type: enum
  values: [on, off]
  source_inquiry: cam_lr_reverse_mode_inq
- id: freeze_mode
  type: enum
  values: [on, off]
  source_inquiry: cam_freeze_mode_inq
- id: picture_effect_mode
  type: enum
  values: [off, neg_art, bw]
  source_inquiry: cam_picture_effect_mode_inq
- id: picture_flip_mode
  type: enum
  values: [on, off]
  source_inquiry: cam_picture_flip_mode_inq
- id: icr_mode
  type: enum
  values: [on, off]
  source_inquiry: cam_icr_mode_inq
- id: memory_last_recalled
  type: integer
  source_inquiry: cam_memory_inq
- id: display_mode
  type: enum
  values: [on, off]
  source_inquiry: cam_display_mode_inq
- id: mute_mode
  type: enum
  values: [on, off]
  source_inquiry: cam_mute_mode_inq
- id: camera_id
  type: integer
  description: 0x0000-0xFFFF
  source_inquiry: cam_id_inq
- id: firmware_version
  type: object
  description: "Model code mnpq in 8x 09 00 02 FF response"
  source_inquiry: cam_version_inq
- id: vaddio_model
  type: enum
  values: [roboshot_12, roboshot_30]
  source_inquiry: vaddio_model_inq
- id: color_gain
  type: integer
  description: 0x00-0x04
  source_inquiry: cam_color_gain_inq
- id: color_hue
  type: integer
  description: 0x00 (-14°) to 0x0E (+14°)
  source_inquiry: cam_color_hue_inq
- id: lens_temperature
  type: integer
  source_inquiry: cam_temp_inq
- id: pan_tilt_position
  type: object
  description: "Pan 0x90E2-0x6BD8, Tilt 0xEB99-0x3D59"
  source_inquiry: pan_tilt_pos_inq
- id: streaming_settings
  type: object
  description: "IP enabled, port (default 554), protocol (RTSP), quality, resolution, URL; USB enabled"
  source_inquiry: telnet_streaming_settings_get
- id: network_settings
  type: object
  description: "MAC address, IP, netmask, gateway, NTP server"
  source_inquiry: telnet_network_settings_get
- id: factory_reset_status
  type: object
  description: "Software and hardware factory-reset state"
  source_inquiry: telnet_system_factory_reset_get
```

## Variables
```yaml
# Telnet CCU keys - discrete, settable, gettable, beyond simple on/off actions
- id: ccu_red_gain
  type: integer
  range: 0-255
  transport: tcp
  command_set: "camera ccu set red_gain {value}"
  command_get: "camera ccu get red_gain"
- id: ccu_blue_gain
  type: integer
  range: 0-255
  transport: tcp
  command_set: "camera ccu set blue_gain {value}"
  command_get: "camera ccu get blue_gain"
- id: ccu_iris
  type: integer
  range: 0-13
  transport: tcp
  command_set: "camera ccu set iris {value}"
  command_get: "camera ccu get iris"
- id: ccu_gain
  type: integer
  range: 0-13
  transport: tcp
  command_set: "camera ccu set gain {value}"
  command_get: "camera ccu get gain"
- id: ccu_detail
  type: integer
  range: 0-15
  transport: tcp
  command_set: "camera ccu set detail {value}"
  command_get: "camera ccu get detail"
- id: ccu_chroma
  type: integer
  range: 0-14
  transport: tcp
  command_set: "camera ccu set chroma {value}"
  command_get: "camera ccu get chroma"
```

## Events
```yaml
# Source does not document unsolicited notifications.
# UNRESOLVED: no event/notification protocol documented
```

## Macros
```yaml
# Tri-Sync preset recall and Tri-Sync with scene recall are explicit multi-step coordinated
# moves documented in source - encoded as discrete CAM_Memory actions above rather than macros.
- id: preset_store_tri_sync
  label: Store Preset with Tri-Sync Speed
  description: "Stores current PTZ position as a preset, recalling with a fixed Tri-Sync speed (1-24)."
  command: "8x 01 04 3F 11 0p 0q 0r FF"
  params:
    - name: preset
      type: integer
      description: Preset number 0x00-0x0F
    - name: speed
      type: integer
      description: Tri-sync speed 0x01-0x18
- id: preset_store_tri_sync_scene
  label: Store Preset with Tri-Sync + CCU Scene
  description: "Stores current PTZ + CCU state as a preset with Tri-Sync speed (1-24)."
  command: "8x 01 04 3F 31 0p 0q 0r FF"
  params:
    - name: preset
      type: integer
      description: Preset number 0x00-0x0F
    - name: speed
      type: integer
      description: Tri-sync speed 0x01-0x18
- id: telnet_preset_store_full
  label: Telnet Preset Store with Tri-Sync and CCU
  description: "Store current camera position (and optional CCU) as preset, recall at Tri-Sync speed."
  command: "camera preset store {preset} [tri-sync {speed}] [save-ccu]"
  transport: tcp
  params:
    - name: preset
      type: integer
      description: Preset number 1-16
    - name: speed
      type: integer
      description: Optional tri-sync speed 1-24
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing requirements
# documented in source.
```

## Notes
- Protocol is "similar, but not identical to, the Sony VISCA command set" — not all VISCA commands are supported, and many Vaddio-specific commands exist.
- RS-232 uses Cat-5/5e/6 cable on a color-coded blue RJ-45 port; pinout: pin 6 = GND, pin 7 = RXD, pin 8 = TXD.
- DIP switch 6 selects baud rate: 9600 bps (default, recommended for Cat-5e distance) or 38400 bps (short control lines only).
- DIP switches 7 & 8 unused; leave UP (OFF).
- Telnet session uses same admin credentials as embedded web server (default admin/password). CTRL+5 clears the device serial buffer.
- Telnet commands are ASCII, terminated by carriage return; responses appended with VT100 ESC[J (1B 5B 4A).
- Streaming defaults: RTSP on TCP/554, USB 3.0 UVC uncompressed, both can be active simultaneously.
- Default IP fallback: 169.254.1.1 / 255.255.0.0 (link-local) when DHCP unavailable.
- Hardware factory-reset: rear panel DIP switches in down position (separate from software factory-reset).
- IR reception can be disabled via DIP switch 3 to prevent interference when using RS-232/Telnet/web control.

<!-- UNRESOLVED: firmware version compatibility range not stated; full RTSP URL/path defaulting scheme not documented; Iris/Preset value ranges for RoboSHOT 30 differ from RoboSHOT 12 and are mixed in source tables. -->

## Provenance

```yaml
source_domains:
  - web.archive.org
source_urls:
  - "https://web.archive.org/web/20160306091301if_/http://www.vaddio.com:80/library?path=d&file=342-0981-revb-roboshot-12-usb-manual.pdf"
  - "https://web.archive.org/web/20170625111004if_/http://www.vaddio.com/library?path=d&file=roboshot-12-usb-release-notes-instructions-2-1-2.pdf"
retrieved_at: 2026-06-12T20:50:03.114Z
last_checked_at: 2026-06-14T16:16:13.117Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-14T16:16:13.117Z
matched_actions: 222
action_count: 222
confidence: medium
summary: "All 222 spec actions matched verbatim in source; transport parameters verified; full command inventory represented. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "IP streaming RTSP path/URL defaults not fully documented; firmware version compatibility range not stated"
- "no event/notification protocol documented"
- "no safety warnings, interlocks, or power-on sequencing requirements"
- "firmware version compatibility range not stated; full RTSP URL/path defaulting scheme not documented; Iris/Preset value ranges for RoboSHOT 30 differ from RoboSHOT 12 and are mixed in source tables."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
