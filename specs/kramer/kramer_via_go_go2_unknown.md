---
spec_id: admin/kramer-vp720xl-vp724xl
schema_version: ai4av-public-spec-v1
revision: 1
title: "Kramer VP-720XL / VP-724XL Control Spec"
manufacturer: Kramer
model_family: VP-720XL
aliases: []
compatible_with:
  manufacturers:
    - Kramer
  models:
    - VP-720XL
    - VP-724XL
    - VP-723
    - VP-724DS
  firmware: "\"KI2.33 or later\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.kramerav.com
source_urls:
  - https://cdn.kramerav.com/web/downloads/protocols/vp-719xl_720xl_vp-724xl_protocol.pdf
retrieved_at: 2026-05-15T09:25:58.835Z
last_checked_at: 2026-05-20T15:42:30.226Z
generated_at: 2026-05-20T15:42:30.226Z
firmware_coverage: "\"KI2.33 or later\""
protocol_coverage: []
known_gaps:
  - "source filename refers to \"VIA GO GO2\" but the refined text documents the VP-720XL / VP-724XL series. The two are different Kramer product lines. The spec body follows the source text; the entity_id placeholder supplied with the request (\"kramer_via_go_go2\") does not match the products documented here."
  - "parity not stated in source"
  - "flow control not stated in source"
  - "no event channel documented."
  - "macro / preset-recording functionality not documented in this protocol."
  - "no other safety warnings, interlocks, or power-on sequencing"
  - "parity, flow control, RS-232 pinout, and cable gender not stated in source"
  - "no TCP/IP, REST, HTTP, OSC, or UDP interface mentioned — RS-232 only"
  - "no authentication or login mechanism described in source"
  - "no event/notification scheme described in source (request/response only)"
verification:
  verdict: verified
  checked_at: 2026-05-20T15:42:30.226Z
  matched_actions: 189
  action_count: 189
  confidence: medium
  summary: "All 189 actions matched; transport verified. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Kramer VP-720XL / VP-724XL Control Spec

## Summary
RS-232 serial control protocol for Kramer VP-720XL, VP-723, VP-724, and VP-724DS presentation switchers / scalers. The host sends ASCII command strings of the form `Y <control_type> <function> [<param>]<CR>` and the device replies with `Z <control_type> <function> [<param>]<CR>` followed by `Done<CR>` on success. The protocol covers front-panel button emulation (input switching, navigation, freeze, blank, audio), a wide set of image / color / geometry / PIP / OSD / output-resolution parameters, gamma / color preset loading, and several system commands (power, mute, key lock, factory reset).

<!-- UNRESOLVED: source filename refers to "VIA GO GO2" but the refined text documents the VP-720XL / VP-724XL series. The two are different Kramer product lines. The spec body follows the source text; the entity_id placeholder supplied with the request ("kramer_via_go_go2") does not match the products documented here. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # source also lists 115200 (written as "1152000" in source - apparent typo)
  data_bits: 8
  parity: null  # UNRESOLVED: parity not stated in source
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

**Frame format (verbatim from source):**
- Space separator = ASCII `0x20`
- `<CR>` = ASCII `0x0D` or `0x0A`
- Set command: `Y <control_type> <function> <param><CR>` → reply `Z <control_type> <function> <param><CR>` then `Done<CR>`
- Get command: `Y <control_type> <function><CR>` → reply `Z <control_type> <function> <value><CR>` then `Done<CR>`
- `Y` = host send prefix; `Z` = device reply prefix

## Traits
```yaml
- powerable   # inferred: control_type 0/2 Power, control_type 6/7 Power commands present
- routable    # inferred: Select Input Source, PIP Source commands present
- queryable   # inferred: every section has Get (control_type 2 / 4 / 7 / 8) variants
- levelable   # inferred: Brightness, Contrast, Volume, Treble, Bass, Gamma, Phase, etc. present
```

## Actions

### Section 0 — Front-panel button emulation (no parameter, kind: action)
```yaml
- id: output_select
  label: Output
  kind: action
  command: "Y 0 0 CR"
- id: freeze_toggle_button
  label: Freeze
  kind: action
  command: "Y 0 1 CR"
- id: power_toggle_button
  label: Power (button)
  kind: action
  command: "Y 0 2 CR"
- id: input_av1
  label: AV1
  kind: action
  command: "Y 0 3 CR"
- id: input_av2
  label: AV2
  kind: action
  command: "Y 0 4 CR"
- id: input_component
  label: Component
  kind: action
  command: "Y 0 5 CR"
- id: input_yc1
  label: YC1 (S-Video 1)
  kind: action
  command: "Y 0 6 CR"
- id: input_yc2
  label: YC2 (S-Video 2)
  kind: action
  command: "Y 0 7 CR"
- id: input_vga1
  label: VGA1
  kind: action
  command: "Y 0 8 CR"
- id: input_vga2
  label: VGA2
  kind: action
  command: "Y 0 9 CR"  # VP-724 DS/XL only per source
- id: input_dvi
  label: DVI
  kind: action
  command: "Y 0 10 CR"
- id: information
  label: Information
  kind: action
  command: "Y 0 11 CR"
- id: area_left_up
  label: Area - Left Up
  kind: action
  command: "Y 0 12 CR"
- id: area_middle_up
  label: Area - Middle Up
  kind: action
  command: "Y 0 13 CR"
- id: area_right_up
  label: Area - Right Up
  kind: action
  command: "Y 0 14 CR"
- id: area_left_center
  label: Area - Left Center
  kind: action
  command: "Y 0 15 CR"
- id: area_middle_center
  label: Area - Middle Center
  kind: action
  command: "Y 0 16 CR"
- id: area_right_center
  label: Area - Right Center
  kind: action
  command: "Y 0 17 CR"
- id: area_left_down
  label: Area - Left Down
  kind: action
  command: "Y 0 18 CR"
- id: area_middle_down
  label: Area - Middle Down
  kind: action
  command: "Y 0 19 CR"
- id: area_right_down
  label: Area - Right Down
  kind: action
  command: "Y 0 20 CR"
- id: auto_image
  label: Auto Image
  kind: action
  command: "Y 0 21 CR"
- id: menu_toggle
  label: Menu
  kind: action
  command: "Y 0 22 CR"
- id: nav_up
  label: Up
  kind: action
  command: "Y 0 23 CR"
- id: nav_left
  label: Left
  kind: action
  command: "Y 0 24 CR"
- id: nav_enter
  label: Enter
  kind: action
  command: "Y 0 25 CR"
- id: nav_right
  label: Right
  kind: action
  command: "Y 0 26 CR"
- id: nav_down
  label: Down
  kind: action
  command: "Y 0 27 CR"
- id: auto_gain
  label: Auto Gain
  kind: action
  command: "Y 0 28 CR"
- id: pip_toggle
  label: PIP
  kind: action
  command: "Y 0 29 CR"
- id: pip_swap
  label: Swap (PIP)
  kind: action
  command: "Y 0 30 CR"
- id: contrast_button
  label: Contrast (button)
  kind: action
  command: "Y 0 31 CR"
- id: brightness_button
  label: Brightness (button)
  kind: action
  command: "Y 0 32 CR"
- id: zoom_in
  label: Zoom In
  kind: action
  command: "Y 0 33 CR"
- id: zoom_out
  label: Zoom Out
  kind: action
  command: "Y 0 34 CR"
- id: volume_down
  label: Volume Down
  kind: action
  command: "Y 0 35 CR"
- id: mute_toggle_button
  label: Mute (button)
  kind: action
  command: "Y 0 36 CR"
- id: volume_up
  label: Volume Up
  kind: action
  command: "Y 0 37 CR"
- id: color_mode
  label: Color Mode
  kind: action
  command: "Y 0 38 CR"
- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "Y 0 39 CR"
```

### Section 1/2 — Image, color, geometry, audio, OSD, sync parameters
Pattern: set = `Y 1 <fn> <value> CR`; get = `Y 2 <fn> CR`.
```yaml
- id: set_user1_gamma
  label: Set User1 Gamma
  kind: action
  command: "Y 1 0 {value} CR"
  params:
    - name: value
      type: integer
      range: [-10, 10]
- id: get_user1_gamma
  label: Get User1 Gamma
  kind: query
  command: "Y 2 0 CR"
- id: set_user1_color_temp_red
  label: Set User1 Color Temp Red
  kind: action
  command: "Y 1 1 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 127]
- id: get_user1_color_temp_red
  label: Get User1 Color Temp Red
  kind: query
  command: "Y 2 1 CR"
- id: set_user1_color_temp_green
  label: Set User1 Color Temp Green
  kind: action
  command: "Y 1 2 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 127]
- id: get_user1_color_temp_green
  label: Get User1 Color Temp Green
  kind: query
  command: "Y 2 2 CR"
- id: set_user1_color_temp_blue
  label: Set User1 Color Temp Blue
  kind: action
  command: "Y 1 3 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 127]
- id: get_user1_color_temp_blue
  label: Get User1 Color Temp Blue
  kind: query
  command: "Y 2 3 CR"
- id: set_user1_color_manager_red
  label: Set User1 Color Manager Red
  kind: action
  command: "Y 1 4 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 32]
- id: get_user1_color_manager_red
  label: Get User1 Color Manager Red
  kind: query
  command: "Y 2 4 CR"
- id: set_user1_color_manager_green
  label: Set User1 Color Manager Green
  kind: action
  command: "Y 1 5 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 32]
- id: get_user1_color_manager_green
  label: Get User1 Color Manager Green
  kind: query
  command: "Y 2 5 CR"
- id: set_user1_color_manager_blue
  label: Set User1 Color Manager Blue
  kind: action
  command: "Y 1 6 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 32]
- id: get_user1_color_manager_blue
  label: Get User1 Color Manager Blue
  kind: query
  command: "Y 2 6 CR"
- id: set_user1_color_manager_yellow
  label: Set User1 Color Manager Yellow
  kind: action
  command: "Y 1 7 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 32]
- id: get_user1_color_manager_yellow
  label: Get User1 Color Manager Yellow
  kind: query
  command: "Y 2 7 CR"
- id: set_user2_gamma
  label: Set User2 Gamma
  kind: action
  command: "Y 1 8 {value} CR"
  params:
    - name: value
      type: integer
      range: [-10, 10]
- id: get_user2_gamma
  label: Get User2 Gamma
  kind: query
  command: "Y 2 8 CR"
- id: set_user2_color_temp_red
  label: Set User2 Color Temp Red
  kind: action
  command: "Y 1 9 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 127]
- id: get_user2_color_temp_red
  label: Get User2 Color Temp Red
  kind: query
  command: "Y 2 9 CR"
- id: set_user2_color_temp_green
  label: Set User2 Color Temp Green
  kind: action
  command: "Y 1 10 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 127]
- id: get_user2_color_temp_green
  label: Get User2 Color Temp Green
  kind: query
  command: "Y 2 10 CR"
- id: set_user2_color_temp_blue
  label: Set User2 Color Temp Blue
  kind: action
  command: "Y 1 11 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 127]
- id: get_user2_color_temp_blue
  label: Get User2 Color Temp Blue
  kind: query
  command: "Y 2 11 CR"
- id: set_user2_color_manager_red
  label: Set User2 Color Manager Red
  kind: action
  command: "Y 1 12 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 32]
- id: get_user2_color_manager_red
  label: Get User2 Color Manager Red
  kind: query
  command: "Y 2 12 CR"
- id: set_user2_color_manager_green
  label: Set User2 Color Manager Green
  kind: action
  command: "Y 1 13 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 32]
- id: get_user2_color_manager_green
  label: Get User2 Color Manager Green
  kind: query
  command: "Y 2 13 CR"
- id: set_user2_color_manager_blue
  label: Set User2 Color Manager Blue
  kind: action
  command: "Y 1 14 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 32]
- id: get_user2_color_manager_blue
  label: Get User2 Color Manager Blue
  kind: query
  command: "Y 2 14 CR"
- id: set_user2_color_manager_yellow
  label: Set User2 Color Manager Yellow
  kind: action
  command: "Y 1 15 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 32]
- id: get_user2_color_manager_yellow
  label: Get User2 Color Manager Yellow
  kind: query
  command: "Y 2 15 CR"
- id: set_brightness
  label: Set Brightness
  kind: action
  command: "Y 1 16 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 127]
- id: get_brightness
  label: Get Brightness
  kind: query
  command: "Y 2 16 CR"
- id: set_contrast
  label: Set Contrast
  kind: action
  command: "Y 1 17 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 127]
- id: get_contrast
  label: Get Contrast
  kind: query
  command: "Y 2 17 CR"
- id: set_aspect_user_h_zoom
  label: Set Aspect User Define H-Zoom
  kind: action
  command: "Y 1 18 {value} CR"
  params:
    - name: value
      type: integer
      range: [-32, 32]
- id: get_aspect_user_h_zoom
  label: Get Aspect User Define H-Zoom
  kind: query
  command: "Y 2 18 CR"
- id: set_aspect_user_v_zoom
  label: Set Aspect User Define V-Zoom
  kind: action
  command: "Y 1 19 {value} CR"
  params:
    - name: value
      type: integer
      range: [-32, 32]
- id: get_aspect_user_v_zoom
  label: Get Aspect User Define V-Zoom
  kind: query
  command: "Y 2 19 CR"
- id: set_aspect_user_h_pan
  label: Set Aspect User Define H-Pan
  kind: action
  command: "Y 1 20 {value} CR"
  params:
    - name: value
      type: integer
      range: [-32, 32]
- id: get_aspect_user_h_pan
  label: Get Aspect User Define H-Pan
  kind: query
  command: "Y 2 20 CR"
- id: set_aspect_user_v_pan
  label: Set Aspect User Define V-Pan
  kind: action
  command: "Y 1 21 {value} CR"
  params:
    - name: value
      type: integer
      range: [-32, 32]
- id: get_aspect_user_v_pan
  label: Get Aspect User Define V-Pan
  kind: query
  command: "Y 2 21 CR"
- id: set_graphics_h_position
  label: Set Graphics H-Position
  kind: action
  command: "Y 1 22 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 255]
- id: get_graphics_h_position
  label: Get Graphics H-Position
  kind: query
  command: "Y 2 22 CR"
- id: set_graphics_v_position
  label: Set Graphics V-Position
  kind: action
  command: "Y 1 23 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 255]
- id: get_graphics_v_position
  label: Get Graphics V-Position
  kind: query
  command: "Y 2 23 CR"
- id: set_graphics_color
  label: Set Graphics Color
  kind: action
  command: "Y 1 24 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 127]
- id: get_graphics_color
  label: Get Graphics Color
  kind: query
  command: "Y 2 24 CR"
- id: set_graphics_hue
  label: Set Graphics Hue
  kind: action
  command: "Y 1 25 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 127]
- id: get_graphics_hue
  label: Get Graphics Hue
  kind: query
  command: "Y 2 25 CR"
- id: set_graphics_sharpness
  label: Set Graphics Sharpness
  kind: action
  command: "Y 1 26 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 16]
- id: get_graphics_sharpness
  label: Get Graphics Sharpness
  kind: query
  command: "Y 2 26 CR"
- id: set_graphics_frequency
  label: Set Graphics Frequency
  kind: action
  command: "Y 1 27 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 100]
- id: get_graphics_frequency
  label: Get Graphics Frequency
  kind: query
  command: "Y 2 27 CR"
- id: set_graphics_phase
  label: Set Graphics Phase
  kind: action
  command: "Y 1 28 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 31]
- id: get_graphics_phase
  label: Get Graphics Phase
  kind: query
  command: "Y 2 28 CR"
- id: set_video_color
  label: Set Video Color
  kind: action
  command: "Y 1 29 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 127]
- id: get_video_color
  label: Get Video Color
  kind: query
  command: "Y 2 29 CR"
- id: set_video_hue
  label: Set Video Hue
  kind: action
  command: "Y 1 30 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 127]
- id: get_video_hue
  label: Get Video Hue
  kind: query
  command: "Y 2 30 CR"
- id: set_video_sharpness
  label: Set Video Sharpness
  kind: action
  command: "Y 1 31 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 16]
- id: get_video_sharpness
  label: Get Video Sharpness
  kind: query
  command: "Y 2 31 CR"
- id: set_video_h_position
  label: Set Video H-Position
  kind: action
  command: "Y 1 32 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 20]
- id: get_video_h_position
  label: Get Video H-Position
  kind: query
  command: "Y 2 32 CR"
- id: set_video_v_position
  label: Set Video V-Position
  kind: action
  command: "Y 1 33 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 39]  # source lists 0~20 for some standards, 0~39 for others
- id: get_video_v_position
  label: Get Video V-Position
  kind: query
  command: "Y 2 33 CR"
- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "Y 1 34 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 32]
- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "Y 2 34 CR"
- id: set_audio_treble
  label: Set Audio Treble
  kind: action
  command: "Y 1 35 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 12]
- id: get_audio_treble
  label: Get Audio Treble
  kind: query
  command: "Y 2 35 CR"
- id: set_audio_bass
  label: Set Audio Bass
  kind: action
  command: "Y 1 36 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 12]
- id: get_audio_bass
  label: Get Audio Bass
  kind: query
  command: "Y 2 36 CR"
- id: set_pip_h_position
  label: Set PIP H-Position
  kind: action
  command: "Y 1 37 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 36]
- id: get_pip_h_position
  label: Get PIP H-Position
  kind: query
  command: "Y 2 37 CR"
- id: set_pip_v_position
  label: Set PIP V-Position
  kind: action
  command: "Y 1 38 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 36]
- id: get_pip_v_position
  label: Get PIP V-Position
  kind: query
  command: "Y 2 38 CR"
- id: set_pip_v_size
  label: Set PIP User Define V-Size
  kind: action
  command: "Y 1 39 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 255]
- id: get_pip_v_size
  label: Get PIP User Define V-Size
  kind: query
  command: "Y 2 39 CR"
- id: set_pip_h_size
  label: Set PIP User Define H-Size
  kind: action
  command: "Y 1 40 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 255]
- id: get_pip_h_size
  label: Get PIP User Define H-Size
  kind: query
  command: "Y 2 40 CR"
- id: set_osd_h_position
  label: Set OSD H-Position
  kind: action
  command: "Y 1 41 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 36]
- id: get_osd_h_position
  label: Get OSD H-Position
  kind: query
  command: "Y 2 41 CR"
- id: set_osd_v_position
  label: Set OSD V-Position
  kind: action
  command: "Y 1 42 {value} CR"
  params:
    - name: value
      type: integer
      range: [0, 36]
- id: get_osd_v_position
  label: Get OSD V-Position
  kind: query
  command: "Y 2 42 CR"
- id: set_osd_timeout
  label: Set OSD Time Out
  kind: action
  command: "Y 1 43 {value} CR"
  params:
    - name: value
      type: integer
      range: [3, 60]  # seconds per source context
- id: get_osd_timeout
  label: Get OSD Time Out
  kind: query
  command: "Y 2 43 CR"
- id: set_ht_h_sync_cycle
  label: Set HT (H-Sync Cycle)
  kind: action
  command: "Y 1 44 {value} CR"
  params:
    - name: value
      type: integer
      min: 100  # source shows "> 100"
- id: get_ht_h_sync_cycle
  label: Get HT (H-Sync Cycle)
  kind: query
  command: "Y 2 44 CR"
- id: set_hw_h_sync_width
  label: Set HW (H-Sync Width)
  kind: action
  command: "Y 1 45 {value} CR"
  params:
    - name: value
      type: integer
      min: 0
- id: get_hw_h_sync_width
  label: Get HW (H-Sync Width)
  kind: query
  command: "Y 2 45 CR"
- id: set_hs_active_pixel_start
  label: Set HS (Active Pixel Start)
  kind: action
  command: "Y 1 46 {value} CR"
  params:
    - name: value
      type: integer
      min: 0
- id: get_hs_active_pixel_start
  label: Get HS (Active Pixel Start)
  kind: query
  command: "Y 2 46 CR"
- id: set_ha_active_pixel
  label: Set HA (Active Pixel)
  kind: action
  command: "Y 1 47 {value} CR"  # source range column shows "-"; treat as integer
  params:
    - name: value
      type: integer
- id: get_ha_active_pixel
  label: Get HA (Active Pixel)
  kind: query
  command: "Y 2 47 CR"
- id: set_hp_h_sync_polarity
  label: Set HP (H-Sync Polarity)
  kind: action
  command: "Y 1 48 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1]  # 0=positive, 1=negative
- id: get_hp_h_sync_polarity
  label: Get HP (H-Sync Polarity)
  kind: query
  command: "Y 2 48 CR"
- id: set_vt_v_sync_cycle
  label: Set VT (V-Sync Cycle)
  kind: action
  command: "Y 1 49 {value} CR"
  params:
    - name: value
      type: integer
      min: 0
- id: get_vt_v_sync_cycle
  label: Get VT (V-Sync Cycle)
  kind: query
  command: "Y 2 49 CR"
- id: set_vw_v_sync_width
  label: Set VW (V-Sync Width)
  kind: action
  command: "Y 1 50 {value} CR"
  params:
    - name: value
      type: integer
      min: 0
- id: get_vw_v_sync_width
  label: Get VW (V-Sync Width)
  kind: query
  command: "Y 2 50 CR"
- id: set_vs_active_line_start
  label: Set VS (Active Line Start)
  kind: action
  command: "Y 1 51 {value} CR"
  params:
    - name: value
      type: integer
      min: 0
- id: get_vs_active_line_start
  label: Get VS (Active Line Start)
  kind: query
  command: "Y 2 51 CR"
- id: set_va_active_line
  label: Set VA (Active Line)
  kind: action
  command: "Y 1 52 {value} CR"  # source range column shows "-"; treat as integer
  params:
    - name: value
      type: integer
- id: get_va_active_line
  label: Get VA (Active Line)
  kind: query
  command: "Y 2 52 CR"
- id: set_vp_v_sync_polarity
  label: Set VP (V-Sync Polarity)
  kind: action
  command: "Y 1 53 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1]  # 0=positive, 1=negative
- id: get_vp_v_sync_polarity
  label: Get VP (V-Sync Polarity)
  kind: query
  command: "Y 2 53 CR"
- id: set_oclk
  label: Set OCLK
  kind: action
  command: "Y 1 54 {value} CR"
  params:
    - name: value
      type: integer
      min: 100  # OCLK = param / 10 MHz, per source note
- id: get_oclk
  label: Get OCLK
  kind: query
  command: "Y 2 54 CR"
```

### Section 3/4 — Input source, geometry, color format, PIP, OSD, output resolution, system
Pattern: set = `Y 3 <fn> <value> CR`; get = `Y 4 <fn> CR`.
```yaml
- id: set_input_source
  label: Set Select Input Source
  kind: action
  command: "Y 3 0 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      description: "0=VGA-1 1=VGA-2 (VP-724 only) 2=DVI 3=Component 4=YC-1 5=AV-1 6=YC-2 7=AV-2 8=Scart 9=TV"
- id: get_input_source
  label: Get Select Input Source
  kind: query
  command: "Y 4 0 CR"
- id: set_video_aspect_ratio
  label: Set Geometry Video Aspect Ratio
  kind: action
  command: "Y 3 1 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3, 4, 5]
      description: "0=Normal 1=Wide Screen 2=Pan&Scan 3=4:3 4=16:9 5=User Define"
- id: get_video_aspect_ratio
  label: Get Geometry Video Aspect Ratio
  kind: query
  command: "Y 4 1 CR"
- id: set_video_nonlinear
  label: Set Geometry Video Nonlinear
  kind: action
  command: "Y 3 2 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2]
      description: "0=Off 1=Side 2=Middle"
- id: get_video_nonlinear
  label: Get Geometry Video Nonlinear
  kind: query
  command: "Y 4 2 CR"
- id: set_vga_aspect_ratio
  label: Set Geometry VGA Aspect Ratio
  kind: action
  command: "Y 3 3 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3, 4, 5]
      description: "0=Full Screen 1=Native 2=NonLinear 3=4:3 4=16:9 5=User Define"
- id: get_vga_aspect_ratio
  label: Get Geometry VGA Aspect Ratio
  kind: query
  command: "Y 4 3 CR"
- id: set_zoom_ratio
  label: Set Zoom Ratio
  kind: action
  command: "Y 3 4 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      description: "0=Off 1=150% 2=200% 3=225% 4=250% 5=275% 6=300% 7=325% 8=350% 9=375% 10=400%"
- id: get_zoom_ratio
  label: Get Zoom Ratio
  kind: query
  command: "Y 4 4 CR"
- id: set_graphics_color_format
  label: Set Graphics Color Format
  kind: action
  command: "Y 3 5 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2]
      description: "0=Default 1=RGB 2=YUV"
- id: get_graphics_color_format
  label: Get Graphics Color Format
  kind: query
  command: "Y 4 5 CR"
- id: set_video_color_format
  label: Set Video Color Format
  kind: action
  command: "Y 3 6 {value} CR"  # Set only per source
  params:
    - name: value
      type: integer
      enum: [0, 1, 2]
      description: "0=Default 1=RGB 2=YUV"
- id: get_video_color_format
  label: Get Video Color Format
  kind: query
  command: "Y 4 6 CR"
- id: set_video_standard
  label: Set Video Standard
  kind: action
  command: "Y 3 7 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3, 4, 5, 6]
      description: "0=Auto 1=NTSC 2=NTSC 4.43 3=PAL 4=PAL-N 5=PAL-M 6=SECAM"
- id: get_video_standard
  label: Get Video Standard
  kind: query
  command: "Y 4 7 CR"
- id: set_film_mode
  label: Set Film Mode
  kind: action
  command: "Y 3 8 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: "0=Off 1=On"
- id: get_film_mode
  label: Get Film Mode
  kind: query
  command: "Y 4 8 CR"
- id: set_audio_stereo
  label: Set Audio Stereo
  kind: action
  command: "Y 3 9 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: "0=Off 1=On"
- id: get_audio_stereo
  label: Get Audio Stereo
  kind: query
  command: "Y 4 9 CR"
- id: set_pip_on_off
  label: Set PIP On/Off
  kind: action
  command: "Y 3 10 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: "0=Off 1=On"
- id: get_pip_on_off
  label: Get PIP On/Off
  kind: query
  command: "Y 4 10 CR"
- id: set_pip_source
  label: Set PIP Source
  kind: action
  command: "Y 3 11 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      description: "0=VGA-1 1=VGA-2 (VP-724 only) 2=DVI 3=Component 4=YC-1 5=AV-1 6=YC-2 7=AV-2 8=SCART 9=TV"
- id: get_pip_source
  label: Get PIP Source
  kind: query
  command: "Y 4 11 CR"
- id: set_pip_size
  label: Set PIP Size
  kind: action
  command: "Y 3 12 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3, 4, 5]
      description: "0=1/25 1=1/16 2=1/9 3=1/4 4=Split 5=User Define"
- id: get_pip_size
  label: Get PIP Size
  kind: query
  command: "Y 4 12 CR"
- id: set_pip_frame
  label: Set PIP Frame
  kind: action
  command: "Y 3 13 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: "0=Off 1=On"
- id: get_pip_frame
  label: Get PIP Frame
  kind: query
  command: "Y 4 13 CR"
- id: set_seamless_mode
  label: Set Seamless Switch Mode
  kind: action
  command: "Y 3 14 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2]
      description: "0=Fast 1=Moderate 2=Safe"
- id: get_seamless_mode
  label: Get Seamless Switch Mode
  kind: query
  command: "Y 4 14 CR"
- id: set_seamless_background
  label: Set Seamless Switch Background
  kind: action
  command: "Y 3 15 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2]
      description: "0=Black 1=Blue 2=Disable Analog Syncs"
- id: get_seamless_background
  label: Get Seamless Switch Background
  kind: query
  command: "Y 4 15 CR"
- id: set_seamless_auto_search
  label: Set Seamless Switch Auto Search
  kind: action
  command: "Y 3 16 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: "0=Off 1=On"
- id: get_seamless_auto_search
  label: Get Seamless Switch Auto Search
  kind: query
  command: "Y 4 16 CR"
- id: set_osd_startup_logo
  label: Set OSD Startup Logo
  kind: action
  command: "Y 3 17 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: "0=Off 1=On"
- id: get_osd_startup_logo
  label: Get OSD Startup Logo
  kind: query
  command: "Y 4 17 CR"
- id: set_osd_size
  label: Set OSD Size
  kind: action
  command: "Y 3 18 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: "0=Normal 1=Double"
- id: get_osd_size
  label: Get OSD Size
  kind: query
  command: "Y 4 18 CR"
- id: set_osd_source_prompt
  label: Set OSD Source Prompt
  kind: action
  command: "Y 3 19 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: "0=Off 1=On"
- id: get_osd_source_prompt
  label: Get OSD Source Prompt
  kind: query
  command: "Y 4 19 CR"
- id: set_osd_blank_color
  label: Set OSD Blank Color
  kind: action
  command: "Y 3 20 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: "0=Blue 1=Black"
- id: get_osd_blank_color
  label: Get OSD Blank Color
  kind: query
  command: "Y 4 20 CR"
- id: set_output_resolution
  label: Set Output Resolution
  kind: action
  command: "Y 3 21 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
      description: "0=640x480 1=800x600 2=1024x768 3=1280x1024 4=1600x1200 5=852x1024i 6=1024x1024i 7=1366x768 8=1365x1024 9=1280x720 10=720x483 11=852x480 12=1400x1050 13=480P 14=720P 15=1080i 16=576P 17=1080P 18=1280x768 19=User Define"
- id: get_output_resolution
  label: Get Output Resolution
  kind: query
  command: "Y 4 21 CR"
- id: set_output_refresh_rate
  label: Set Output Refresh Rate
  kind: action
  command: "Y 3 22 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3]
      description: "0=60Hz 1=75Hz 2=85Hz 3=50Hz"
- id: get_output_refresh_rate
  label: Get Output Refresh Rate
  kind: query
  command: "Y 4 22 CR"
- id: factory_reset
  label: Factory Reset
  kind: action
  command: "Y 3 23 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: "0=Cancel 1=OK (execute factory reset)"
- id: get_factory_reset
  label: Get Factory Reset State
  kind: query
  command: "Y 4 23 CR"
- id: set_advanced_input_button
  label: Set Advanced Input Button
  kind: action
  command: "Y 3 24 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3]
      description: "0=Freeze/Blank 1=Freeze 2=Blank 3=Ignore"
- id: get_advanced_input_button
  label: Get Advanced Input Button
  kind: query
  command: "Y 4 24 CR"
- id: set_key_lock_save
  label: Set Key Lock Save
  kind: action
  command: "Y 3 25 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1]
- id: get_key_lock_save
  label: Get Key Lock Save
  kind: query
  command: "Y 4 25 CR"
- id: set_input_lock
  label: Set Input Lock
  kind: action
  command: "Y 3 26 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1]
- id: get_input_lock
  label: Get Input Lock
  kind: query
  command: "Y 4 26 CR"
- id: set_sog_setting
  label: Set SOG Setting
  kind: action
  command: "Y 3 27 {value} CR"  # KI239 only per source
  params:
    - name: value
      type: integer
      enum: [0, 1, 2]
      description: "0=Auto 1=RGsB 2=DTV"
- id: get_sog_setting
  label: Get SOG Setting
  kind: query
  command: "Y 4 27 CR"
- id: set_enable_osd_timeout
  label: Set Enable OSD Timeout
  kind: action
  command: "Y 3 28 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: "0=Disable 1=Enable"
- id: get_enable_osd_timeout
  label: Get Enable OSD Timeout
  kind: query
  command: "Y 4 28 CR"
- id: set_userdefined_group
  label: Set Select Output Mode Userdefined Parameter Group
  kind: action
  command: "Y 3 29 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2]
      description: "0=Group 1 1=Group 2 2=Group 3"
- id: get_userdefined_group
  label: Get Select Output Mode Userdefined Parameter Group
  kind: query
  command: "Y 4 29 CR"
- id: set_audio_save_mode
  label: Set Audio Save Mode
  kind: action
  command: "Y 3 30 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2]
      description: "0=Master 1=Individual 2=Linked"
- id: get_audio_save_mode
  label: Get Audio Save Mode
  kind: query
  command: "Y 4 30 CR"
```

### Section 5 — Load Gamma/Color preset (no parameter, kind: action)
```yaml
- id: load_gamma_normal
  label: Load Gamma/Color - Normal
  kind: action
  command: "Y 5 0 CR"
- id: load_gamma_presentation
  label: Load Gamma/Color - Presentation
  kind: action
  command: "Y 5 1 CR"
- id: load_gamma_cinema
  label: Load Gamma/Color - Cinema
  kind: action
  command: "Y 5 2 CR"
- id: load_gamma_nature
  label: Load Gamma/Color - Nature
  kind: action
  command: "Y 5 3 CR"
- id: load_gamma_user1
  label: Load Gamma/Color - User1
  kind: action
  command: "Y 5 4 CR"
- id: load_gamma_user2
  label: Load Gamma/Color - User2
  kind: action
  command: "Y 5 5 CR"
```

### Section 6/7 — System state (Power / Freeze / Blank / Mute / Key Lock)
Pattern: set = `Y 6 <fn> <value> CR`; get = `Y 7 <fn> CR`.
```yaml
- id: set_power
  label: Set Power
  kind: action
  command: "Y 6 0 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: "0=Power Down 1=Power On"
- id: get_power
  label: Get Power
  kind: query
  command: "Y 7 0 CR"
- id: set_freeze
  label: Set Freeze
  kind: action
  command: "Y 6 1 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1]
- id: get_freeze
  label: Get Freeze
  kind: query
  command: "Y 7 1 CR"
- id: set_blank
  label: Set Blank
  kind: action
  command: "Y 6 2 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1]
- id: get_blank
  label: Get Blank
  kind: query
  command: "Y 7 2 CR"
- id: set_mute
  label: Set Mute
  kind: action
  command: "Y 6 3 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1]
- id: get_mute
  label: Get Mute
  kind: query
  command: "Y 7 3 CR"
- id: set_key_lock
  label: Set Key Lock
  kind: action
  command: "Y 6 4 {value} CR"
  params:
    - name: value
      type: integer
      enum: [0, 1]
- id: get_key_lock
  label: Get Key Lock
  kind: query
  command: "Y 7 4 CR"
```

### Section 8 — System status query
```yaml
- id: get_output_status
  label: Get Output Resolution / Refresh Rate / Video Standard
  kind: query
  command: "Y 8 0 CR"
  # source example: "Y 8 0 CR" returns "Z 8 0 1080i CR" - value encodes current output mode
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  source: control_type 7, function 0
- id: freeze_state
  type: enum
  values: [off, on]
  source: control_type 7, function 1
- id: blank_state
  type: enum
  values: [off, on]
  source: control_type 7, function 2
- id: mute_state
  type: enum
  values: [off, on]
  source: control_type 7, function 3
- id: key_lock_state
  type: enum
  values: [off, on]
  source: control_type 7, function 4
- id: input_source
  type: enum
  values: [vga1, vga2, dvi, component, yc1, av1, yc2, av2, scart, tv]
  source: control_type 4, function 0
- id: output_resolution
  type: string  # e.g. "1080i" - see source example
  source: control_type 8, function 0
```

## Variables
```yaml
# All settable numeric ranges enumerated in the source. Each maps to a get/set pair in
# the Actions section above. Listed here as a quick reference for implementers.
- id: brightness
  range: [0, 127]
- id: contrast
  range: [0, 127]
- id: audio_volume
  range: [0, 32]
- id: audio_treble
  range: [0, 12]
- id: audio_bass
  range: [0, 12]
- id: graphics_h_position
  range: [0, 255]
- id: graphics_v_position
  range: [0, 255]
- id: graphics_color
  range: [0, 127]
- id: graphics_hue
  range: [0, 127]
- id: graphics_sharpness
  range: [0, 16]
- id: graphics_frequency
  range: [0, 100]
- id: graphics_phase
  range: [0, 31]
- id: video_h_position
  range: [0, 20]
- id: video_v_position
  range: [0, 39]
- id: osd_timeout_seconds
  range: [3, 60]
- id: user1_gamma
  range: [-10, 10]
- id: user2_gamma
  range: [-10, 10]
- id: aspect_user_h_zoom
  range: [-32, 32]
- id: aspect_user_v_zoom
  range: [-32, 32]
- id: aspect_user_h_pan
  range: [-32, 32]
- id: aspect_user_v_pan
  range: [-32, 32]
- id: pip_h_position
  range: [0, 36]
- id: pip_v_position
  range: [0, 36]
- id: pip_h_size
  range: [0, 255]
- id: pip_v_size
  range: [0, 255]
- id: osd_h_position
  range: [0, 36]
- id: osd_v_position
  range: [0, 36]
```

## Events
```yaml
# No unsolicited notification scheme is documented in the source. All device
# reporting uses request/response. UNRESOLVED: no event channel documented.
```

## Macros
```yaml
# No multi-step macro sequences are defined in the source.
# UNRESOLVED: macro / preset-recording functionality not documented in this protocol.
```

## Safety
```yaml
confirmation_required_for:
  - id: factory_reset
    note: "Factory Reset (control_type 3, function 23) accepts 1=OK to execute. Host should
           prompt the operator before sending value=1; this is a destructive, non-recoverable
           operation that restores all parameters to factory defaults."
interlocks: []
# UNRESOLVED: no other safety warnings, interlocks, or power-on sequencing
# requirements appear in the source.
```

## Notes

**Source / product mismatch.** The refined source file is named
`kramer_via_go_go2_unknown.refined.md`, but its body documents the
**VP-720XL / VP-724XL** RS-232 protocol series (with explicit revision
history referencing firmware `KB2.33` / `KI2.38` / `KI2.39` / `KI2.42` /
`KI2.49` and 2005–2008 issue dates). The Kramer VIA GO and VIA GO² are
**wireless presentation / collaboration** devices — a different product
line from the VP-720XL / VP-724XL presentation switchers. The spec body
follows the source text. The `entity_id` placeholder supplied with the
request (`kramer_via_go_go2`) is preserved verbatim, but should be
re-pointed to the VP-720XL / VP-724XL entity in Convex before publish.

**Model applicability.** Source explicitly calls out the following model
suffixes throughout the command list:
- `VP-724 DS/XL Only` — applies to certain commands (e.g. VGA-2 input `Y 0 9`, 1080P resolution)
- `KI239 Only` — SOG setting (`Y 3 27`)
- `KI238 and 80P DAC Board` — 1080P output resolution
- `HDTV output is VP723/724 Only`

**Baud rate.** Source text reads `9600/1152000bps`. The `1152000` is an
apparent typo for `115200`; the spec lists `9600` (unambiguous) and notes
the likely intended `115200`. Hosts should be configured to one of these
two rates.

**Firmware compatibility.** The source's revision history lists
five firmware revisions:
- `KB2.33` (v1.00, 2005-09-23)
- `KI2.38` (v1.02, 2006-06-28) — adds 1080P resolution command
- `KI2.39` (v1.03, 2006-10-05) — adds SOG setting
- `KI2.42` (v1.05, 2007-03-22) — adds OSD timeout, user define, audio functions
- `KI2.49` (v1.06, 2008-06-18) — adds word-mark commands

Hosts targeting older firmware must check against the version table
before issuing newer commands.

**Command row coverage.** Per the spec population policy, every distinct
command row in the source's `0`–`54` (sections 0/1/2) and `0`–`30`
(sections 3/4) tables is enumerated separately, including the per-input
selection variants and per-preset load commands. Each set/get pair is
emitted as two actions (one `kind: action`, one `kind: query`) to keep
the payload rule satisfied.

**Set-only caveat.** Section 3 function 6 (Video Color Format) is marked
"Set" only in the source table; the get variant `Y 4 6 CR` is included
for completeness but may be rejected by older firmware.

**Sync timing parameters.** Functions 44–54 (HT, HW, HS, HA, HP, VT, VW,
VS, VA, VP, OCLK) expose raw sync timing. The source warns that "Setting
Command should be a reasonable value" — sending arbitrary values can
cause the scaler to lose lock or display garbage. Hosts should treat
these as expert-level and not modify them without operator intent.

<!-- UNRESOLVED: parity, flow control, RS-232 pinout, and cable gender not stated in source -->
<!-- UNRESOLVED: no TCP/IP, REST, HTTP, OSC, or UDP interface mentioned — RS-232 only -->
<!-- UNRESOLVED: no authentication or login mechanism described in source -->
<!-- UNRESOLVED: no event/notification scheme described in source (request/response only) -->

## Provenance

```yaml
source_domains:
  - cdn.kramerav.com
source_urls:
  - https://cdn.kramerav.com/web/downloads/protocols/vp-719xl_720xl_vp-724xl_protocol.pdf
retrieved_at: 2026-05-15T09:25:58.835Z
last_checked_at: 2026-05-20T15:42:30.226Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T15:42:30.226Z
matched_actions: 189
action_count: 189
confidence: medium
summary: "All 189 actions matched; transport verified. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source filename refers to \"VIA GO GO2\" but the refined text documents the VP-720XL / VP-724XL series. The two are different Kramer product lines. The spec body follows the source text; the entity_id placeholder supplied with the request (\"kramer_via_go_go2\") does not match the products documented here."
- "parity not stated in source"
- "flow control not stated in source"
- "no event channel documented."
- "macro / preset-recording functionality not documented in this protocol."
- "no other safety warnings, interlocks, or power-on sequencing"
- "parity, flow control, RS-232 pinout, and cable gender not stated in source"
- "no TCP/IP, REST, HTTP, OSC, or UDP interface mentioned — RS-232 only"
- "no authentication or login mechanism described in source"
- "no event/notification scheme described in source (request/response only)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
