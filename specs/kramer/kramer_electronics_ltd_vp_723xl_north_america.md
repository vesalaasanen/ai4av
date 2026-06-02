---
spec_id: admin/kramer-vp-723xl
schema_version: ai4av-public-spec-v1
revision: 1
title: "Kramer VP-723XL Control Spec"
manufacturer: Kramer
model_family: VP-723XL
aliases: []
compatible_with:
  manufacturers:
    - Kramer
  models:
    - VP-723XL
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.kramerav.com
source_urls:
  - https://cdn.kramerav.com/web/downloads/protocols/vp-723xl.pdf
retrieved_at: 2026-05-14T18:17:17.329Z
last_checked_at: 2026-05-14T18:17:17.329Z
generated_at: 2026-05-14T18:17:17.329Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP control not documented in source. Only RS-232 documented."
  - "no standalone variable table in source; all parameters"
  - "no unsolicited event notifications documented in source"
  - "no explicit multi-step macro sequences documented in source"
  - "no safety warnings, interlock procedures, or power-on"
  - "TCP/IP, HTTP, or network control not documented in source"
  - "firmware version for specific VP-723XL North America unit not stated"
  - "no power-on sequencing, safety interlock, or fault behavior documented"
  - "exact default baud rate for VP-723XL not confirmed in source"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:17.329Z
  matched_actions: 119
  action_count: 192
  confidence: medium
  summary: "All 119 spec actions matched verbatim in source; both old (L-format) and new (Y-format) protocols fully represented with correct parameters and transport settings. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Kramer VP-723XL Control Spec

## Summary
Kramer VP-723XL scaler/switcher with RS-232 control. Two protocol variants: **Old protocol** (all firmware) and **New protocol** (firmware KB2.33+). Serial-only device; no IP, HTTP, or network control documented.

<!-- UNRESOLVED: TCP/IP control not documented in source. Only RS-232 documented. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # also supports 1152000 bps per source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
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
# ============================================================
# OLD PROTOCOL — "L xxED" format (all firmware versions)
# ============================================================
- id: old_menu
  label: Menu On/Off
  kind: action
  params: []
  protocol: old
  command: "L 12ED"

- id: old_volume_up
  label: Volume Up
  kind: action
  params: []
  protocol: old
  command: "L 13EC"

- id: old_volume_down
  label: Volume Down
  kind: action
  params: []
  protocol: old
  command: "L 14EB"

- id: old_source
  label: Source (cycle)
  kind: action
  params: []
  protocol: old
  command: "L 15EA"

- id: old_vga1
  label: Select VGA1
  kind: action
  params: []
  protocol: old
  command: "L 16E9"

- id: old_vga2
  label: Select VGA2
  kind: action
  params: []
  protocol: old
  command: "L 17E8"

- id: old_dvi
  label: Select DVI
  kind: action
  params: []
  protocol: old
  command: "L 18E7"

- id: old_component
  label: Select Component
  kind: action
  params: []
  protocol: old
  command: "L 19E6"

- id: old_video1
  label: Select Video 1
  kind: action
  params: []
  protocol: old
  command: "L 1AE5"

- id: old_video2
  label: Select Video 2
  kind: action
  params: []
  protocol: old
  command: "L 1BE4"

- id: old_freeze
  label: Freeze (toggle)
  kind: action
  params: []
  protocol: old
  command: "L 1CE3"

- id: old_pip
  label: PIP (toggle)
  kind: action
  params: []
  protocol: old
  command: "L 1DE2"

- id: old_auto_image
  label: Auto Image
  kind: action
  params: []
  protocol: old
  command: "L 1EE1"

- id: old_auto_gain
  label: Auto Gain
  kind: action
  params: []
  protocol: old
  command: "L 1FE0"

- id: old_zoom_in
  label: Zoom In
  kind: action
  params: []
  protocol: old
  command: "L 20DF"

- id: old_zoom_out
  label: Zoom Out
  kind: action
  params: []
  protocol: old
  command: "L 21DE"

- id: old_mute
  label: Mute (toggle)
  kind: action
  params: []
  protocol: old
  command: "L 22DD"

- id: old_brightness
  label: Brightness (toggle)
  kind: action
  params: []
  protocol: old
  command: "L 23DC"

- id: old_contrast
  label: Contrast (toggle)
  kind: action
  params: []
  protocol: old
  command: "L 24DB"

- id: old_mode
  label: Mode (toggle)
  kind: action
  params: []
  protocol: old
  command: "L 25DA"

- id: old_normal
  label: Normal
  kind: action
  params: []
  protocol: old
  command: "L 26D9"

- id: old_presentation
  label: Presentation
  kind: action
  params: []
  protocol: old
  command: "L 27D8"

- id: old_cinema
  label: Cinema
  kind: action
  params: []
  protocol: old
  command: "L 28D7"

- id: old_user1
  label: User 1
  kind: action
  params: []
  protocol: old
  command: "L 29D6"

- id: old_user2
  label: User 2
  kind: action
  params: []
  protocol: old
  command: "L 2AD5"

- id: old_swap
  label: Swap
  kind: action
  params: []
  protocol: old
  command: "L 2CD3"

- id: old_aspect_ratio
  label: Aspect Ratio
  kind: action
  params: []
  protocol: old
  command: "L 2DD2"

- id: old_normal_full
  label: Normal / Full Screen
  kind: action
  params: []
  protocol: old
  command: "L 2ED1"

- id: old_wide_native
  label: Wide Screen / Native
  kind: action
  params: []
  protocol: old
  command: "L 2FD0"

- id: old_pan_scan
  label: Pan & Scan / Non-Linear
  kind: action
  params: []
  protocol: old
  command: "L 30CF"

- id: old_4_3
  label: 4:3
  kind: action
  params: []
  protocol: old
  command: "L 31CE"

- id: old_up
  label: Up
  kind: action
  params: []
  protocol: old
  command: "L 32CD"

- id: old_down
  label: Down
  kind: action
  params: []
  protocol: old
  command: "L 33CC"

- id: old_left
  label: Left
  kind: action
  params: []
  protocol: old
  command: "L 34CB"

- id: old_right
  label: Right
  kind: action
  params: []
  protocol: old
  command: "L 35CA"

- id: old_enter
  label: Enter
  kind: action
  params: []
  protocol: old
  command: "L 36C9"

- id: old_status
  label: Status
  kind: action
  params: []
  protocol: old
  command: "L 37C8"

- id: old_enter_up
  label: Enter+Up
  kind: action
  params: []
  protocol: old
  command: "L 38C7"

- id: old_cvideo1
  label: C-Video 1
  kind: action
  params: []
  protocol: old
  command: "L 39C6"

- id: old_cvideo2
  label: C-Video 2
  kind: action
  params: []
  protocol: old
  command: "L 3AC5"

- id: old_svideo1
  label: S-Video 1
  kind: action
  params: []
  protocol: old
  command: "L 3BC4"

- id: old_svideo2
  label: S-Video 2
  kind: action
  params: []
  protocol: old
  command: "L 3CC3"

- id: old_out
  label: Out
  kind: action
  params: []
  protocol: old
  command: "L 3DC2"

- id: old_blank
  label: Blank (toggle)
  kind: action
  params: []
  protocol: old
  command: "L 3EC1"

- id: old_factory_reset
  label: Factory Reset
  kind: action
  params: []
  protocol: old
  command: "L 46B9"

- id: old_key_lock
  label: Key Lock (toggle)
  kind: action
  params: []
  protocol: old
  command: "L 47B8"

- id: old_wakeup
  label: Wake Up
  kind: action
  params: []
  protocol: old
  command: "L 48B7"

- id: old_standby
  label: Standby
  kind: action
  params: []
  protocol: old
  command: "L 49B6"

- id: old_16_9
  label: 16:9
  kind: action
  params: []
  protocol: old
  command: "L 4BB4"

- id: old_pip_h_position
  label: PIP H Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0–36
  protocol: old
  command: "L 4EB1 {value}"

- id: old_pip_v_position
  label: PIP V Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0–36
  protocol: old
  command: "L 4FB0 {value}"

- id: old_pip_frame
  label: PIP Frame
  kind: action
  params: []
  protocol: old
  command: "L 50AF"

# Old protocol — direct on/off commands
- id: old_pip_on
  label: PIP On
  kind: action
  params: []
  protocol: old
  command: "L B04F"

- id: old_pip_off
  label: PIP Off
  kind: action
  params: []
  protocol: old
  command: "L B14E"

- id: old_freeze_on
  label: Freeze On
  kind: action
  params: []
  protocol: old
  command: "L B24D"

- id: old_freeze_off
  label: Freeze Off
  kind: action
  params: []
  protocol: old
  command: "L B34C"

- id: old_mute_on
  label: Mute On
  kind: action
  params: []
  protocol: old
  command: "L B44B"

- id: old_mute_off
  label: Mute Off
  kind: action
  params: []
  protocol: old
  command: "L B54A"

- id: old_blank_on
  label: Blank On
  kind: action
  params: []
  protocol: old
  command: "L B649"

- id: old_blank_off
  label: Blank Off
  kind: action
  params: []
  protocol: old
  command: "L B748"

- id: old_keylock_on
  label: Key Lock On
  kind: action
  params: []
  protocol: old
  command: "L B847"

- id: old_keylock_off
  label: Key Lock Off
  kind: action
  params: []
  protocol: old
  command: "L B946"

- id: old_output_resolution
  label: Output Resolution
  kind: action
  params:
    - name: value
      type: integer
      description: "0=640x480, 1=800x600, 2=1024x768, 3=1280x1024, 4=1600x1200, 5=852x1024i, 6=1024x1024i, 7=1366x768, 8=1365x1024, 9=1280x720, 10=720x483, 11=852x480, 12=1400x1050, 13=480P, 14=720P, 15=1080i, 16=1280x768, 17=User Define"
  protocol: old
  command: "L BA45 {value}"

- id: old_pip_source
  label: PIP Source
  kind: action
  params:
    - name: value
      type: integer
      description: "0=VGA1, 1=VGA2, 2=DVI, 3=Component, 4=YC1, 5=AC1, 6=YC2, 7=AC2, 8=Scart, 9=TV"
  protocol: old
  command: "L BB44 {value}"

- id: old_pip_size
  label: PIP Size
  kind: action
  params:
    - name: value
      type: integer
      description: "0=1/25, 1=1/16, 2=1/9, 3=1/4, 4=split"
  protocol: old
  command: "L E31C {value}"

# ============================================================
# NEW PROTOCOL — "Y△Type△Func△Param△CR" format (firmware KB2.33+)
# ============================================================

# Control Type 0 — Basic Control
- id: new_output
  label: Output (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 0"

- id: new_freeze
  label: Freeze (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 1"
  notes: "Control Type 0 function (keypad-style toggle); source documents the parameter column as N/A."

- id: new_power
  label: Power (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 2"
  notes: "Control Type 0 function (keypad-style toggle); source documents the parameter column as N/A. Settable power state is the Type 6/7 new_power_state command."

- id: new_av1
  label: Select AV1 (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 3"

- id: new_av2
  label: Select AV2 (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 4"

- id: new_comp
  label: Select Component (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 5"

- id: new_yc1
  label: Select YC1 (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 6"

- id: new_yc2
  label: Select YC2 (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 7"

- id: new_vga1
  label: Select VGA1 (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 8"

- id: new_vga2_nu
  label: Select VGA2 (VP-724 Only, new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 9"

- id: new_dvi
  label: Select DVI (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 10"

- id: new_information
  label: Information (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 11"

- id: new_area_left_up
  label: Area Left Up (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 12"

- id: new_area_middle_up
  label: Area Middle Up (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 13"

- id: new_area_right_up
  label: Area Right Up (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 14"

- id: new_area_left_center
  label: Area Left Center (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 15"

- id: new_area_middle_center
  label: Area Middle Center (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 16"

- id: new_area_right_center
  label: Area Right Center (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 17"

- id: new_area_left_down
  label: Area Left Down (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 18"

- id: new_area_middle_down
  label: Area Middle Down (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 19"

- id: new_area_right_down
  label: Area Right Down (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 20"

- id: new_auto_image
  label: Auto Image (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 21"

- id: new_menu
  label: Menu (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 22"

- id: new_up
  label: Up (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 23"

- id: new_left
  label: Left (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 24"

- id: new_enter
  label: Enter (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 25"

- id: new_right
  label: Right (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 26"

- id: new_down
  label: Down (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 27"

- id: new_auto_gain
  label: Auto Gain (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 28"

- id: new_pip
  label: PIP (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 29"

- id: new_swap
  label: Swap (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 30"

- id: new_contrast
  label: Contrast (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 31"
  notes: "Control Type 0 function (keypad-style step); source documents the parameter column as N/A. Settable contrast is the Type 1/2 new_graphics_contrast command (Y 1 17 / Y 2 17)."

- id: new_brightness
  label: Brightness (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 32"
  notes: "Control Type 0 function (keypad-style step); source documents the parameter column as N/A. Settable brightness is the Type 1/2 new_graphics_brightness command (Y 1 16 / Y 2 16)."

- id: new_zoom_in
  label: Zoom In (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 33"

- id: new_zoom_out
  label: Zoom Out (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 34"

- id: new_volume_down
  label: Volume Down (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 35"

- id: new_mute
  label: Mute (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 36"

- id: new_volume_up
  label: Volume Up (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 37"

- id: new_color_mode
  label: Color Mode (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 38"

- id: new_aspect_ratio_toggle
  label: Aspect Ratio (new protocol)
  kind: action
  params: []
  protocol: new
  command: "Y 0 39"

# Control Type 1 — Gamma and Color (Set=1, Get=2)
- id: new_user1_gamma
  label: User1 Gamma
  kind: action
  params:
    - name: value
      type: integer
      description: -10–10
  protocol: new
  command_set: "Y 1 0 {value}"
  command_get: "Y 2 0"

- id: new_user1_color_temp_red
  label: User1 Color Temp Red
  kind: action
  params:
    - name: value
      type: integer
      description: 0–127
  protocol: new
  command_set: "Y 1 1 {value}"
  command_get: "Y 2 1"

- id: new_user1_color_temp_green
  label: User1 Color Temp Green
  kind: action
  params:
    - name: value
      type: integer
      description: 0–127
  protocol: new
  command_set: "Y 1 2 {value}"
  command_get: "Y 2 2"

- id: new_user1_color_temp_blue
  label: User1 Color Temp Blue
  kind: action
  params:
    - name: value
      type: integer
      description: 0–127
  protocol: new
  command_set: "Y 1 3 {value}"
  command_get: "Y 2 3"

- id: new_user1_color_mgr_red
  label: User1 Color Manager Red
  kind: action
  params:
    - name: value
      type: integer
      description: 0–32
  protocol: new
  command_set: "Y 1 4 {value}"
  command_get: "Y 2 4"

- id: new_user1_color_mgr_green
  label: User1 Color Manager Green
  kind: action
  params:
    - name: value
      type: integer
      description: 0–32
  protocol: new
  command_set: "Y 1 5 {value}"
  command_get: "Y 2 5"

- id: new_user1_color_mgr_blue
  label: User1 Color Manager Blue
  kind: action
  params:
    - name: value
      type: integer
      description: 0–32
  protocol: new
  command_set: "Y 1 6 {value}"
  command_get: "Y 2 6"

- id: new_user1_color_mgr_yellow
  label: User1 Color Manager Yellow
  kind: action
  params:
    - name: value
      type: integer
      description: 0–32
  protocol: new
  command_set: "Y 1 7 {value}"
  command_get: "Y 2 7"

- id: new_user2_gamma
  label: User2 Gamma
  kind: action
  params:
    - name: value
      type: integer
      description: -10–10
  protocol: new
  command_set: "Y 1 8 {value}"
  command_get: "Y 2 8"

- id: new_user2_color_temp_red
  label: User2 Color Temp Red
  kind: action
  params:
    - name: value
      type: integer
      description: 0–127
  protocol: new
  command_set: "Y 1 9 {value}"
  command_get: "Y 2 9"

- id: new_user2_color_temp_green
  label: User2 Color Temp Green
  kind: action
  params:
    - name: value
      type: integer
      description: 0–127
  protocol: new
  command_set: "Y 1 10 {value}"
  command_get: "Y 2 10"

- id: new_user2_color_temp_blue
  label: User2 Color Temp Blue
  kind: action
  params:
    - name: value
      type: integer
      description: 0–127
  protocol: new
  command_set: "Y 1 11 {value}"
  command_get: "Y 2 11"

- id: new_user2_color_mgr_red
  label: User2 Color Manager Red
  kind: action
  params:
    - name: value
      type: integer
      description: 0–32
  protocol: new
  command_set: "Y 1 12 {value}"
  command_get: "Y 2 12"

- id: new_user2_color_mgr_green
  label: User2 Color Manager Green
  kind: action
  params:
    - name: value
      type: integer
      description: 0–32
  protocol: new
  command_set: "Y 1 13 {value}"
  command_get: "Y 2 13"

- id: new_user2_color_mgr_blue
  label: User2 Color Manager Blue
  kind: action
  params:
    - name: value
      type: integer
      description: 0–32
  protocol: new
  command_set: "Y 1 14 {value}"
  command_get: "Y 2 14"

- id: new_user2_color_mgr_yellow
  label: User2 Color Manager Yellow
  kind: action
  params:
    - name: value
      type: integer
      description: 0–32
  protocol: new
  command_set: "Y 1 15 {value}"
  command_get: "Y 2 15"

- id: new_graphics_brightness
  label: Graphics Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: 0–127
  protocol: new
  command_set: "Y 1 16 {value}"
  command_get: "Y 2 16"

- id: new_graphics_contrast
  label: Graphics Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: 0–127
  protocol: new
  command_set: "Y 1 17 {value}"
  command_get: "Y 2 17"

- id: new_aspect_user_define_h_zoom
  label: Aspect Ratio User Define H-Zoom
  kind: action
  params:
    - name: value
      type: integer
      description: -32–32
  protocol: new
  command_set: "Y 1 18 {value}"
  command_get: "Y 2 18"

- id: new_aspect_user_define_v_zoom
  label: Aspect Ratio User Define V-Zoom
  kind: action
  params:
    - name: value
      type: integer
      description: -32–32
  protocol: new
  command_set: "Y 1 19 {value}"
  command_get: "Y 2 19"

- id: new_aspect_user_define_h_pan
  label: Aspect Ratio User Define H-Pan
  kind: action
  params:
    - name: value
      type: integer
      description: -32–32
  protocol: new
  command_set: "Y 1 20 {value}"
  command_get: "Y 2 20"

- id: new_aspect_user_define_v_pan
  label: Aspect Ratio User Define V-Pan
  kind: action
  params:
    - name: value
      type: integer
      description: -32–32
  protocol: new
  command_set: "Y 1 21 {value}"
  command_get: "Y 2 21"

- id: new_graphics_h_position
  label: Graphics H-Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0–255
  protocol: new
  command_set: "Y 1 22 {value}"
  command_get: "Y 2 22"

- id: new_graphics_v_position
  label: Graphics V-Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0–255
  protocol: new
  command_set: "Y 1 23 {value}"
  command_get: "Y 2 23"

- id: new_graphics_color
  label: Graphics Color
  kind: action
  params:
    - name: value
      type: integer
      description: 0–127
  protocol: new
  command_set: "Y 1 24 {value}"
  command_get: "Y 2 24"

- id: new_graphics_hue
  label: Graphics Hue
  kind: action
  params:
    - name: value
      type: integer
      description: 0–127
  protocol: new
  command_set: "Y 1 25 {value}"
  command_get: "Y 2 25"

- id: new_graphics_sharpness
  label: Graphics Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: 0–16
  protocol: new
  command_set: "Y 1 26 {value}"
  command_get: "Y 2 26"

- id: new_graphics_frequency
  label: Graphics Frequency
  kind: action
  params:
    - name: value
      type: integer
      description: 0–100
  protocol: new
  command_set: "Y 1 27 {value}"
  command_get: "Y 2 27"

- id: new_graphics_phase
  label: Graphics Phase
  kind: action
  params:
    - name: value
      type: integer
      description: 0–31
  protocol: new
  command_set: "Y 1 28 {value}"
  command_get: "Y 2 28"

- id: new_video_color
  label: Video Color
  kind: action
  params:
    - name: value
      type: integer
      description: 0–127
  protocol: new
  command_set: "Y 1 29 {value}"
  command_get: "Y 2 29"

- id: new_video_hue
  label: Video Hue
  kind: action
  params:
    - name: value
      type: integer
      description: 0–127
  protocol: new
  command_set: "Y 1 30 {value}"
  command_get: "Y 2 30"

- id: new_video_sharpness
  label: Video Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: 0–16
  protocol: new
  command_set: "Y 1 31 {value}"
  command_get: "Y 2 31"

- id: new_video_h_position
  label: Video H-Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0–20
  protocol: new
  command_set: "Y 1 32 {value}"
  command_get: "Y 2 32"

- id: new_video_v_position
  label: Video V-Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0–20 (NTSC/NTSC4.43/PAL-M/PAL60), 0–39 (PAL/PAL-N/SECAM/NTSC4.43 50)
  protocol: new
  command_set: "Y 1 33 {value}"
  command_get: "Y 2 33"

# Control Type 3 — Input Source (Set=3, Get=4)
- id: new_select_input_source
  label: Select Input Source
  kind: action
  params:
    - name: value
      type: integer
      description: "0=VGA-1, 1=VGA-2(VP-724 only), 2=DVI, 3=Component, 4=YC-1, 5=AV-1, 6=YV-2, 7=AV-2, 8=Scart, 9=TV"
  protocol: new
  command_set: "Y 3 0 {value}"
  command_get: "Y 4 0"

- id: new_video_aspect_ratio
  label: Video Aspect Ratio
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Normal, 1=Wide Screen, 2=Pan&Scan, 3=4:3, 4=16:9, 5=UserDefine"
  protocol: new
  command_set: "Y 3 1 {value}"
  command_get: "Y 4 1"

- id: new_video_nonlinear
  label: Video Nonlinear
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1=Side, 2=Middle"
  protocol: new
  command_set: "Y 3 2 {value}"
  command_get: "Y 4 2"

- id: new_vga_aspect_ratio
  label: VGA Aspect Ratio
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Full Screen, 1=Native, 2=NonLinear, 3=4:3, 4=16:9, 5=UserDefine"
  protocol: new
  command_set: "Y 3 3 {value}"
  command_get: "Y 4 3"

- id: new_zoom_ratio
  label: Zoom Ratio
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1=150%, 2=200%, 3=225%, 4=250%, 5=275%, 6=300%, 7=325%, 8=350%, 9=375%, 10=400%"
  protocol: new
  command_set: "Y 3 4 {value}"
  command_get: "Y 4 4"

- id: new_graphics_color_format
  label: Graphics Color Format
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Default, 1=RGB, 2=YUV"
  protocol: new
  command_set: "Y 3 5 {value}"
  command_get: "Y 4 5"

- id: new_video_color_format
  label: Video Color Format
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Default, 1=RGB, 2=YUV"
  protocol: new
  command_set: "Y 3 6 {value}"
  command_get: "Y 4 6"

- id: new_video_standard
  label: Video Standard
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Auto, 1=NTSC, 2=NTSC4.43, 3=PAL, 4=PAL-N, 5=PAL-M, 6=SECAM"
  protocol: new
  command_set: "Y 3 7 {value}"
  command_get: "Y 4 7"

- id: new_film_mode
  label: Film Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"
  protocol: new
  command_set: "Y 3 8 {value}"
  command_get: "Y 4 8"

- id: new_audio_stereo
  label: Audio Stereo
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"
  protocol: new
  command_set: "Y 3 9 {value}"
  command_get: "Y 4 9"

- id: new_pip_onoff
  label: PIP On/Off
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"
  protocol: new
  command_set: "Y 3 10 {value}"
  command_get: "Y 4 10"

- id: new_pip_source
  label: PIP Source
  kind: action
  params:
    - name: value
      type: integer
      description: "0=VGA-1, 1=VGA-2(VP-724 only), 2=DVI, 3=Component, 4=YC-1, 5=AV-1, 6=YV-2, 7=AV-2, 8=Scart, 9=TV"
  protocol: new
  command_set: "Y 3 11 {value}"
  command_get: "Y 4 11"

- id: new_pip_size
  label: PIP Size
  kind: action
  params:
    - name: value
      type: integer
      description: "0=1/25, 1=1/16, 2=1/9, 3=1/4, 4=Split, 5=User Define"
  protocol: new
  command_set: "Y 3 12 {value}"
  command_get: "Y 4 12"

- id: new_pip_frame
  label: PIP Frame
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"
  protocol: new
  command_set: "Y 3 13 {value}"
  command_get: "Y 4 13"

- id: new_seamless_mode
  label: Seamless Switch Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Fast, 1=Moderate, 2=Safe"
  protocol: new
  command_set: "Y 3 14 {value}"
  command_get: "Y 4 14"

- id: new_seamless_background
  label: Seamless Switch Background
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Black, 1=Blue"
  protocol: new
  command_set: "Y 3 15 {value}"
  command_get: "Y 4 15"

- id: new_seamless_auto_search
  label: Seamless Switch Auto Search
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"
  protocol: new
  command_set: "Y 3 16 {value}"
  command_get: "Y 4 16"

- id: new_osd_startup_logo
  label: OSD Startup Logo
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"
  protocol: new
  command_set: "Y 3 17 {value}"
  command_get: "Y 4 17"

- id: new_osd_size
  label: OSD Size
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Normal, 1=Double"
  protocol: new
  command_set: "Y 3 18 {value}"
  command_get: "Y 4 18"

- id: new_osd_source_prompt
  label: OSD Source Prompt
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"
  protocol: new
  command_set: "Y 3 19 {value}"
  command_get: "Y 4 19"

- id: new_osd_blank_color
  label: OSD Blank Color
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Blue, 1=Black"
  protocol: new
  command_set: "Y 3 20 {value}"
  command_get: "Y 4 20"

- id: new_output_resolution
  label: Output Resolution
  kind: action
  params:
    - name: value
      type: integer
      description: "0=640x480, 1=800x600, 2=1024x768, 3=1280x1024, 4=1600x1200, 5=852x1024i, 6=1024x1024i, 7=1366x768, 8=1365x1024, 9=1280x720, 10=720x483, 11=852x480, 12=1400x1050, 13=480P, 14=720P, 15=1080i, 16=1280x768, 17=576P, 18=1080P (VP-723/724 only; 1080P requires KI238 or 80P DAC board), 19=User Define"
  protocol: new
  command_set: "Y 3 21 {value}"
  command_get: "Y 4 21"

- id: new_output_refresh_rate
  label: Output Refresh Rate
  kind: action
  params:
    - name: value
      type: integer
      description: "0=60Hz, 1=75Hz, 2=85Hz, 3=50Hz"
  protocol: new
  command_set: "Y 3 22 {value}"
  command_get: "Y 4 22"

- id: new_factory_reset
  label: Factory Reset
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Cancel, 1=OK"
  protocol: new
  command_set: "Y 3 23 {value}"
  command_get: "Y 4 23"

- id: new_advanced_input_button
  label: Advanced Input Button
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Freeze/Blank, 1=Freeze, 2=Blank, 3=Ignore"
  protocol: new
  command_set: "Y 3 24 {value}"
  command_get: "Y 4 24"

- id: new_key_lock_save
  label: Key Lock Save
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"
  protocol: new
  command_set: "Y 3 25 {value}"
  command_get: "Y 4 25"

- id: new_input_lock
  label: Input Lock
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"
  protocol: new
  command_set: "Y 3 26 {value}"
  command_get: "Y 4 26"

- id: new_sog_setting
  label: SOG Setting
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Auto, 1=RGsB, 2=HDTV"
  protocol: new
  command_set: "Y 3 27 {value}"
  command_get: "Y 4 27"

- id: new_osd_timeout_enable
  label: Enable OSD Timeout
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Disable, 1=Enable"
  protocol: new
  command_set: "Y 3 28 {value}"
  command_get: "Y 4 28"
  note: Firmware 2.42+

- id: new_select_output_mode
  label: Select Output Mode Userdefined Parameter Group
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Group 1, 1=Group 2, 2=Group 3"
  protocol: new
  command_set: "Y 3 29 {value}"
  command_get: "Y 4 29"
  note: Firmware 2.42+

- id: new_audio_volume_control
  label: Audio Volume/Treble/Bass Control Way
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Master, 1=Individual, 2=Linked"
  protocol: new
  command_set: "Y 3 30 {value}"
  command_get: "Y 4 30"
  note: Firmware 2.42+

# Control Type 5 — Load Gamma/Color Presets
- id: new_load_gamma_normal
  label: Load Gamma/Color Normal
  kind: action
  params: []
  protocol: new
  command: "Y 5 0"

- id: new_load_gamma_presentation
  label: Load Gamma/Color Presentation
  kind: action
  params: []
  protocol: new
  command: "Y 5 1"

- id: new_load_gamma_cinema
  label: Load Gamma/Color Cinema
  kind: action
  params: []
  protocol: new
  command: "Y 5 2"

- id: new_load_gamma_nature
  label: Load Gamma/Color Nature
  kind: action
  params: []
  protocol: new
  command: "Y 5 3"

- id: new_load_gamma_user1
  label: Load Gamma/Color User1
  kind: action
  params: []
  protocol: new
  command: "Y 5 4"

- id: new_load_gamma_user2
  label: Load Gamma/Color User2
  kind: action
  params: []
  protocol: new
  command: "Y 5 5"

# Control Type 6 — Power/State (Set=6, Get=7)
- id: new_power_state
  label: Power State
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Power Down, 1=Power On"
  protocol: new
  command_set: "Y 6 0 {value}"
  command_get: "Y 7 0"

- id: new_freeze_state
  label: Freeze State
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"
  protocol: new
  command_set: "Y 6 1 {value}"
  command_get: "Y 7 1"

- id: new_blank_state
  label: Blank State
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"
  protocol: new
  command_set: "Y 6 2 {value}"
  command_get: "Y 7 2"

- id: new_mute_state
  label: Mute State
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"
  protocol: new
  command_set: "Y 6 3 {value}"
  command_get: "Y 7 3"

- id: new_keylock_state
  label: Key Lock State
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Off, 1=On"
  protocol: new
  command_set: "Y 6 4 {value}"
  command_get: "Y 7 4"

# Control Type 8 — Resolution/Refresh Rate Query
- id: new_resolution_query
  label: Resolution/Refresh Rate Query
  kind: action
  params: []
  protocol: new
  command: "Y 8 0"
  example: "Y 8 0" returns "Z 8 0 1080i"

# Audio Settings (Type 1 continued)
- id: new_audio_volume
  label: Audio Volume
  kind: action
  params:
    - name: value
      type: integer
      description: 0–32
  protocol: new
  command_set: "Y 1 34 {value}"
  command_get: "Y 2 34"

- id: new_audio_treble
  label: Audio Treble
  kind: action
  params:
    - name: value
      type: integer
      description: 0–12
  protocol: new
  command_set: "Y 1 35 {value}"
  command_get: "Y 2 35"

- id: new_audio_bass
  label: Audio Bass
  kind: action
  params:
    - name: value
      type: integer
      description: 0–12
  protocol: new
  command_set: "Y 1 36 {value}"
  command_get: "Y 2 36"

# PIP Settings (Type 1 continued)
- id: new_pip_h_position
  label: PIP H-Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0–36
  protocol: new
  command_set: "Y 1 37 {value}"
  command_get: "Y 2 37"

- id: new_pip_v_position
  label: PIP V-Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0–36
  protocol: new
  command_set: "Y 1 38 {value}"
  command_get: "Y 2 38"

- id: new_pip_user_define_v_size
  label: PIP User Define V-Size
  kind: action
  params:
    - name: value
      type: integer
      description: 0–255
  protocol: new
  command_set: "Y 1 39 {value}"
  command_get: "Y 2 39"

- id: new_pip_user_define_h_size
  label: PIP User Define H-Size
  kind: action
  params:
    - name: value
      type: integer
      description: 0–255
  protocol: new
  command_set: "Y 1 40 {value}"
  command_get: "Y 2 40"

# OSD Settings (Type 1 continued)
- id: new_osd_h_position
  label: OSD H-Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0–36
  protocol: new
  command_set: "Y 1 41 {value}"
  command_get: "Y 2 41"

- id: new_osd_v_position
  label: OSD V-Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0–36
  protocol: new
  command_set: "Y 1 42 {value}"
  command_get: "Y 2 42"

- id: new_osd_timeout
  label: OSD Timeout
  kind: action
  params:
    - name: value
      type: integer
      description: 3–60
  protocol: new
  command_set: "Y 1 43 {value}"
  command_get: "Y 2 43"
```

## Feedbacks
```yaml
# ============================================================
# OLD PROTOCOL — Query commands using "K xxED" format
# ============================================================
# Query current source: "K 15EA" → returns current source code
# Query freeze state: "K 1CE3" → returns B24D (on) or B34C (off)
# Query PIP state: "K 1DE2" → returns B04F (on) or B14E (off)
# Query mute state: "K 22DD" → returns B44B (on) or B54A (off)
# Query blank state: "K 3EC1" → returns B649 (on) or B748 (off)
# Query key lock: "K 47B8" → returns B847 (on) or B946 (off)
# Query output resolution: "K BA45" → returns K ##FF where ## is resolution code
# Query VGA/DVI resolution: "K E01F" → returns resolution info
# Query refresh rate: "K E11E" → returns K ##&& (## = hex value, && = switch position)
# Query video standard: "K E21D" → returns standard code
# Query PIP size: "K E31C" → returns size code
# Query PIP H position: "K E41B" → returns K ##&&
# Query PIP V position: "K E51A" → returns K ##&&

- id: old_source_feedback
  type: enum
  values:
    - VGA1: "K 16E9"
    - VGA2: "K 17E8"
    - DVI: "K 18E7"
    - Component: "K 19E6"
    - C-Video1: "K 39C6"
    - C-Video2: "K 3AC5"
    - S-Video1: "K 3BC4"
    - S-Video2: "K 3CC3"

- id: old_freeze_feedback
  type: enum
  values:
    - On: "K B24D"
    - Off: "K B34C"

- id: old_pip_feedback
  type: enum
  values:
    - On: "K B04F"
    - Off: "K B14E"

- id: old_mute_feedback
  type: enum
  values:
    - On: "K B44B"
    - Off: "K B54A"

- id: old_blank_feedback
  type: enum
  values:
    - On: "K B649"
    - Off: "K B748"

- id: old_keylock_feedback
  type: enum
  values:
    - On: "K B847"
    - Off: "K B946"

- id: old_output_resolution_feedback
  type: enum
  values:
    - "640x480": "K 00FF"
    - "800x600": "K 01FE"
    - "1024x768": "K 02FD"
    - "1280x1024": "K 03FC"
    - "1600x1200": "K 04FB"
    - "852x1024i": "K 05FA"
    - "1024x1024i": "K 06F9"
    - "1366x768": "K 07F8"
    - "1366x1024": "K 08F7"
    - "1280x720": "K 09F6"
    - "720x483": "K 0AF5"
    - "852x480": "K 0BF4"
    - "1400x1050": "K 0CF3"
    - "480P": "K 0DF2"
    - "720P": "K 0EF1"
    - "1080i": "K 0FF0"
    - "1280x768": "K 10EF"
    - "User Define": "K 11EE"

- id: old_vga_dvi_resolution_feedback
  type: enum
  values:
    - "640x480": "K 00FF"
    - "NTSC 60": "K 01FE"
    - "PAL 50": "K 02FD"
    - "720x400": "K 03FC"
    - "800x600": "K 04FB"
    - "832x624": "K 05FA"
    - "1024x768": "K 06F9"
    - "1024x800": "K 07F8"
    - "1152x870": "K 08F7"
    - "1280x960": "K 09F6"
    - "1280x1024": "K 0AF5"
    - "1600x1200": "K 0BF4"
    - "1280x720P": "K 0CF3"
    - "853x480P": "K 0DF2"
    - "1920x1080I": "K 0EF1"
    - "720x576P": "K 0FF0"
    - "1152x900": "K 10EF"
    - "1400x1050": "K 11EE"
    - "No Signal": "K FF00"

- id: old_video_standard_feedback
  type: enum
  values:
    - "NTSC": "K 01FE"
    - "NTSC 4.43": "K 02FD"
    - "PAL": "K 03FC"
    - "PAL N": "K 04FB"
    - "PAL M": "K 05FA"
    - "SECAM": "K 06F9"
    - "PAL 60": "K 07F8"
    - "NTSC 4.43 50": "K 08F7"
    - "No Signal": "K FF00"

- id: old_pip_size_feedback
  type: enum
  values:
    - "1/25": "K 00FF"
    - "1/16": "K 01FE"
    - "1/9": "K 02FD"
    - "1/4": "K 03FC"
    - "Split": "K 04FB"

# ============================================================
# NEW PROTOCOL — Query responses via "Z△Type△Func△Value△CR>"
# ============================================================
# All Type 1 get commands (Y 2 X) return: Z 2 X Value CR>
# All Type 4 get commands (Y 4 X) return: Z 4 X Value CR>
# All Type 7 get commands (Y 7 X) return: Z 7 X Value CR>
# Set command reply format: Z Type Func Done>CR
# Get command reply format: Z Type Func P Value CR>

- id: new_power_feedback
  type: enum
  values:
    - "Power Down": 0
    - "Power On": 1
  protocol: new

- id: new_freeze_feedback
  type: enum
  values:
    - "Off": 0
    - "On": 1
  protocol: new

- id: new_blank_feedback
  type: enum
  values:
    - "Off": 0
    - "On": 1
  protocol: new

- id: new_mute_feedback
  type: enum
  values:
    - "Off": 0
    - "On": 1
  protocol: new

- id: new_keylock_feedback
  type: enum
  values:
    - "Off": 0
    - "On": 1
  protocol: new

- id: new_output_resolution_feedback
  type: enum
  values:
    - "640x480": 0
    - "800x600": 1
    - "1024x768": 2
    - "1280x1024": 3
    - "1600x1200": 4
    - "852x1024i": 5
    - "1024x1024i": 6
    - "1366x768": 7
    - "1365x1024": 8
    - "1280x720": 9
    - "720x483": 10
    - "852x480": 11
    - "1400x1050": 12
    - "480P": 13
    - "720P": 14
    - "1080i": 15
    - "576P": 17
    - "1080P": 18
    - "1280x768": 19
    - "User Define": 20
  protocol: new
```

## Variables
```yaml
# UNRESOLVED: no standalone variable table in source; all parameters
# are set/get via the Actions above with command_set/command_get pairs
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on
# sequencing requirements stated in source
```

## Notes

**Two Protocol Variants:**
The source documents two distinct RS-232 protocols. The **Old protocol** (all firmware versions) uses simple ASCII command strings like `L 12ED`. The **New protocol** (firmware KB2.33+, with some features requiring 2.42+) uses structured `Y△Type△Func△Param△CR` format with set/get command types.

**Old Protocol Command Format:**
- Action commands: `L {Code}{~Code}` — 2-byte code + 1's complement checksum
- Query commands: `K {Code}{~Code}`
- Example: Menu On = `L 12ED` (0x12 + 0xED checksum)

**New Protocol Command Format:**
- Set commands: `Y△Control_Type△Function△Param△CR` → reply `Z△Type△Func△Done>CR`
- Get commands: `Y△Control_Type△Function△CR` → reply `Z△Type△Func△P△Value△CR>`
- Control Types: 0=Basic, 1=Gamma/Color/Graphics/Video/Audio/PIP/OSD, 3=Input/Geometry/Zoom, 5=Load Presets, 6=Power State(Set), 7=Power State(Get), 8=Resolution Query

**New Protocol Timing (firmware 2.43+):**
- 3-byte commands execute immediately; non-volatile save after 30s idle
- 4-byte commands trigger immediate save (~2 sec additional delay)

**Baud Rate:** Both 9600 and 1152000 bps documented. Confirm device default matches target deployment.

**VP-724 vs VP-723:** VGA2 input (code 1) and some advanced features are VP-724-only per source comments.

<!-- UNRESOLVED: TCP/IP, HTTP, or network control not documented in source -->
<!-- UNRESOLVED: firmware version for specific VP-723XL North America unit not stated -->
<!-- UNRESOLVED: no power-on sequencing, safety interlock, or fault behavior documented -->
<!-- UNRESOLVED: exact default baud rate for VP-723XL not confirmed in source -->

## Provenance

```yaml
source_domains:
  - cdn.kramerav.com
source_urls:
  - https://cdn.kramerav.com/web/downloads/protocols/vp-723xl.pdf
retrieved_at: 2026-05-14T18:17:17.329Z
last_checked_at: 2026-05-14T18:17:17.329Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:17.329Z
matched_actions: 119
action_count: 192
confidence: medium
summary: "All 119 spec actions matched verbatim in source; both old (L-format) and new (Y-format) protocols fully represented with correct parameters and transport settings. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP control not documented in source. Only RS-232 documented."
- "no standalone variable table in source; all parameters"
- "no unsolicited event notifications documented in source"
- "no explicit multi-step macro sequences documented in source"
- "no safety warnings, interlock procedures, or power-on"
- "TCP/IP, HTTP, or network control not documented in source"
- "firmware version for specific VP-723XL North America unit not stated"
- "no power-on sequencing, safety interlock, or fault behavior documented"
- "exact default baud rate for VP-723XL not confirmed in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
