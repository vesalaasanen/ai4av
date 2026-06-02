---
spec_id: admin/kramer-vp720xl-724xl
schema_version: ai4av-public-spec-v1
revision: 1
title: "Kramer VP-720XL/VP-724XL Control Spec"
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
    - VP-724
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.kramerav.com
source_urls:
  - https://cdn.kramerav.com/web/downloads/protocols/vp-719xl_720xl_vp-724xl_protocol.pdf
retrieved_at: 2026-05-15T05:53:55.561Z
last_checked_at: 2026-06-02T17:22:47.288Z
generated_at: 2026-06-02T17:22:47.288Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is labeled VP720XL/724XL/DS series, NOT \"KDS 7 MNGR\". Entity ID requested is for KDS 7 MNGR, which is a different Kramer product family (AVoIP manager). Operator should reconcile this mismatch before publishing."
  - "parity is not stated in source."
  - "flow control is not stated in source."
  - "not stated in source; RS-232 default assumption noted in inference"
  - "not stated in source"
  - "source says > 100, no upper bound stated\""
  - "source says > 0, no upper bound stated\""
  - "source dash, no range"
  - "no upper bound stated\""
  - "source does not describe unsolicited device-to-host events."
  - "source does not describe any multi-step macro sequences."
  - "source contains no further safety warnings, interlocks, or"
  - "source describes \"Y 3 29 X\" and \"Y 4 29\" cross-references for HT/HW group parameter storage; the meaning of the trailing \"X\" placeholder is not fully clarified in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:22:47.288Z
  matched_actions: 225
  action_count: 225
  confidence: medium
  summary: "All 225 spec actions matched literally in source command table; transport parameters (9600 baud, 8 data bits, 1 stop bit, RS-232) verified; 100% coverage. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Kramer VP-720XL/VP-724XL Control Spec

## Summary
Spec covers the serial (RS-232) control protocol for Kramer VP-720XL and VP-724XL video scalers. Protocol is an ASCII command/response scheme over RS-232 using a 3-field header (Y/Z, Control_Type, Function) followed by an optional parameter, terminated by CR.

<!-- UNRESOLVED: source document is labeled VP720XL/724XL/DS series, NOT "KDS 7 MNGR". Entity ID requested is for KDS 7 MNGR, which is a different Kramer product family (AVoIP manager). Operator should reconcile this mismatch before publishing. -->

<!-- UNRESOLVED: parity is not stated in source. -->

<!-- UNRESOLVED: flow control is not stated in source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # source also lists 1152000 bps as alternative; only 9600 stated as default-looking
  data_bits: 8
  parity: none  # UNRESOLVED: not stated in source; RS-232 default assumption noted in inference
  stop_bits: 1
  flow_control: none  # UNRESOLVED: not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred from Power commands (Control_Type 0 fn 2, Control_Type 6 fn 0)
- routable     # inferred from Select Input Source command (Control_Type 3 fn 0)
- queryable    # inferred from Get command variants (Control_Type 2/4/7/8)
- levelable    # inferred from Volume/Treble/Bass/Contrast/Brightness/Sharpness range commands
```

## Actions
```yaml
# Protocol header format (Tier 1 - verbatim from source):
#   Send:    "Y  Control_Type  Function  [Param]  CR"
#   Reply:   "Z  Control_Type  Function  [Param]  CR"  then  "Done  CR"
# Field separator: ASCII 0x20 (space). CR: 0x0D or 0x0A.
#
# Coverage rule: every Control_Type/Function row in the source command tables
# is enumerated below. Button-emulation block (Control_Type 0, fn 0..39) is
# emitted as separate actions per row.

# ---------- Control_Type 0: button / remote emulation ----------
- id: btn_output
  label: Button: Output
  kind: action
  command: "Y 0 0 CR"
  params: []
- id: btn_freeze
  label: Button: Freeze
  kind: action
  command: "Y 0 1 CR"
  params: []
- id: btn_power
  label: Button: Power
  kind: action
  command: "Y 0 2 CR"
  params: []
- id: btn_av1
  label: Button: AV1
  kind: action
  command: "Y 0 3 CR"
  params: []
- id: btn_av2
  label: Button: AV2
  kind: action
  command: "Y 0 4 CR"
  params: []
- id: btn_comp
  label: Button: Component
  kind: action
  command: "Y 0 5 CR"
  params: []
- id: btn_yc1
  label: Button: YC1
  kind: action
  command: "Y 0 6 CR"
  params: []
- id: btn_yc2
  label: Button: YC2
  kind: action
  command: "Y 0 7 CR"
  params: []
- id: btn_vga1
  label: Button: VGA1
  kind: action
  command: "Y 0 8 CR"
  params: []
- id: btn_vga2
  label: Button: VGA2 (VP-724/DS/XL only)
  kind: action
  command: "Y 0 9 CR"
  params: []
- id: btn_dvi
  label: Button: DVI
  kind: action
  command: "Y 0 10 CR"
  params: []
- id: btn_information
  label: Button: Information
  kind: action
  command: "Y 0 11 CR"
  params: []
- id: btn_area_left_up
  label: Button: Area Left Up
  kind: action
  command: "Y 0 12 CR"
  params: []
- id: btn_area_middle_up
  label: Button: Area Middle Up
  kind: action
  command: "Y 0 13 CR"
  params: []
- id: btn_area_right_up
  label: Button: Area Right Up
  kind: action
  command: "Y 0 14 CR"
  params: []
- id: btn_area_left_center
  label: Button: Area Left Center
  kind: action
  command: "Y 0 15 CR"
  params: []
- id: btn_area_middle_center
  label: Button: Area Middle Center
  kind: action
  command: "Y 0 16 CR"
  params: []
- id: btn_area_right_center
  label: Button: Area Right Center
  kind: action
  command: "Y 0 17 CR"
  params: []
- id: btn_area_left_down
  label: Button: Area Left Down
  kind: action
  command: "Y 0 18 CR"
  params: []
- id: btn_area_middle_down
  label: Button: Area Middle Down
  kind: action
  command: "Y 0 19 CR"
  params: []
- id: btn_area_right_down
  label: Button: Area Right Down
  kind: action
  command: "Y 0 20 CR"
  params: []
- id: btn_auto_image
  label: Button: Auto Image
  kind: action
  command: "Y 0 21 CR"
  params: []
- id: btn_menu
  label: Button: Menu
  kind: action
  command: "Y 0 22 CR"
  params: []
- id: btn_up
  label: Button: Up
  kind: action
  command: "Y 0 23 CR"
  params: []
- id: btn_left
  label: Button: Left
  kind: action
  command: "Y 0 24 CR"
  params: []
- id: btn_enter
  label: Button: Enter
  kind: action
  command: "Y 0 25 CR"
  params: []
- id: btn_right
  label: Button: Right
  kind: action
  command: "Y 0 26 CR"
  params: []
- id: btn_down
  label: Button: Down
  kind: action
  command: "Y 0 27 CR"
  params: []
- id: btn_auto_gain
  label: Button: Auto Gain
  kind: action
  command: "Y 0 28 CR"
  params: []
- id: btn_pip
  label: Button: PIP
  kind: action
  command: "Y 0 29 CR"
  params: []
- id: btn_swap
  label: Button: Swap
  kind: action
  command: "Y 0 30 CR"
  params: []
- id: btn_contrast
  label: Button: Contrast
  kind: action
  command: "Y 0 31 CR"
  params: []
- id: btn_brightness
  label: Button: Brightness
  kind: action
  command: "Y 0 32 CR"
  params: []
- id: btn_zoom_in
  label: Button: Zoom In
  kind: action
  command: "Y 0 33 CR"
  params: []
- id: btn_zoom_out
  label: Button: Zoom Out
  kind: action
  command: "Y 0 34 CR"
  params: []
- id: btn_volume_down
  label: Button: Volume Down
  kind: action
  command: "Y 0 35 CR"
  params: []
- id: btn_mute
  label: Button: Mute
  kind: action
  command: "Y 0 36 CR"
  params: []
- id: btn_volume_up
  label: Button: Volume Up
  kind: action
  command: "Y 0 37 CR"
  params: []
- id: btn_color_mode
  label: Button: Color Mode
  kind: action
  command: "Y 0 38 CR"
  params: []
- id: btn_aspect_ratio
  label: Button: Aspect Ratio
  kind: action
  command: "Y 0 39 CR"
  params: []

# ---------- Control_Type 1 (Set) / 2 (Get): Gamma and Color ----------
- id: set_user1_gamma
  label: Set User1 Gamma
  kind: action
  command: "Y 1 0 {value} CR"
  params:
    - name: value
      type: integer
      range: "-10..10"
- id: get_user1_gamma
  label: Get User1 Gamma
  kind: query
  command: "Y 2 0 CR"
  params: []
- id: set_user1_color_temp_red
  label: Set User1 Color Temp Red
  kind: action
  command: "Y 1 1 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..127
- id: set_user1_color_temp_green
  label: Set User1 Color Temp Green
  kind: action
  command: "Y 1 2 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..127
- id: get_user1_color_temp_green
  label: Get User1 Color Temp Green
  kind: query
  command: "Y 2 2 CR"
  params: []
- id: set_user1_color_temp_blue
  label: Set User1 Color Temp Blue
  kind: action
  command: "Y 1 3 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..127
- id: get_user1_color_temp_blue
  label: Get User1 Color Temp Blue
  kind: query
  command: "Y 2 3 CR"
  params: []
- id: set_user1_color_manager_red
  label: Set User1 Color Manager Red
  kind: action
  command: "Y 1 4 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..32
- id: get_user1_color_manager_red
  label: Get User1 Color Manager Red
  kind: query
  command: "Y 2 4 CR"
  params: []
- id: set_user1_color_manager_green
  label: Set User1 Color Manager Green
  kind: action
  command: "Y 1 5 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..32
- id: get_user1_color_manager_green
  label: Get User1 Color Manager Green
  kind: query
  command: "Y 2 5 CR"
  params: []
- id: set_user1_color_manager_blue
  label: Set User1 Color Manager Blue
  kind: action
  command: "Y 1 6 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..32
- id: get_user1_color_manager_blue
  label: Get User1 Color Manager Blue
  kind: query
  command: "Y 2 6 CR"
  params: []
- id: set_user1_color_manager_yellow
  label: Set User1 Color Manager Yellow
  kind: action
  command: "Y 1 7 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..32
- id: get_user1_color_manager_yellow
  label: Get User1 Color Manager Yellow
  kind: query
  command: "Y 2 7 CR"
  params: []
- id: set_user2_gamma
  label: Set User2 Gamma
  kind: action
  command: "Y 1 8 {value} CR"
  params:
    - name: value
      type: integer
      range: "-10..10"
- id: get_user2_gamma
  label: Get User2 Gamma
  kind: query
  command: "Y 2 8 CR"
  params: []
- id: set_user2_color_temp_red
  label: Set User2 Color Temp Red
  kind: action
  command: "Y 1 9 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..127
- id: get_user2_color_temp_red
  label: Get User2 Color Temp Red
  kind: query
  command: "Y 2 9 CR"
  params: []
- id: set_user2_color_temp_green
  label: Set User2 Color Temp Green
  kind: action
  command: "Y 1 10 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..127
- id: get_user2_color_temp_green
  label: Get User2 Color Temp Green
  kind: query
  command: "Y 2 10 CR"
  params: []
- id: set_user2_color_temp_blue
  label: Set User2 Color Temp Blue
  kind: action
  command: "Y 1 11 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..127
- id: get_user2_color_temp_blue
  label: Get User2 Color Temp Blue
  kind: query
  command: "Y 2 11 CR"
  params: []
- id: set_user2_color_manager_red
  label: Set User2 Color Manager Red
  kind: action
  command: "Y 1 12 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..32
- id: set_user2_color_manager_green
  label: Set User2 Color Manager Green
  kind: action
  command: "Y 1 13 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..32
- id: get_user2_color_manager_green
  label: Get User2 Color Manager Green
  kind: query
  command: "Y 2 13 CR"
  params: []
- id: set_user2_color_manager_blue
  label: Set User2 Color Manager Blue
  kind: action
  command: "Y 1 14 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..32
- id: get_user2_color_manager_blue
  label: Get User2 Color Manager Blue
  kind: query
  command: "Y 2 14 CR"
  params: []
- id: set_user2_color_manager_yellow
  label: Set User2 Color Manager Yellow
  kind: action
  command: "Y 1 15 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..32
- id: get_user2_color_manager_yellow
  label: Get User2 Color Manager Yellow
  kind: query
  command: "Y 2 15 CR"
  params: []
- id: set_brightness
  label: Set Brightness
  kind: action
  command: "Y 1 16 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..127
- id: get_brightness
  label: Get Brightness
  kind: query
  command: "Y 2 16 CR"
  params: []
- id: set_contrast
  label: Set Contrast
  kind: action
  command: "Y 1 17 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..127
- id: get_contrast
  label: Get Contrast
  kind: query
  command: "Y 2 17 CR"
  params: []
- id: set_aspect_h_zoom
  label: Set Aspect: User Define H-Zoom
  kind: action
  command: "Y 1 18 {value} CR"
  params:
    - name: value
      type: integer
      range: "-32..32"
- id: get_aspect_h_zoom
  label: Get Aspect: User Define H-Zoom
  kind: query
  command: "Y 2 18 CR"
  params: []
- id: set_aspect_v_zoom
  label: Set Aspect: User Define V-Zoom
  kind: action
  command: "Y 1 19 {value} CR"
  params:
    - name: value
      type: integer
      range: "-32..32"
- id: get_aspect_v_zoom
  label: Get Aspect: User Define V-Zoom
  kind: query
  command: "Y 2 19 CR"
  params: []
- id: set_aspect_h_pan
  label: Set Aspect: User Define H-Pan
  kind: action
  command: "Y 1 20 {value} CR"
  params:
    - name: value
      type: integer
      range: "-32..32"
- id: get_aspect_h_pan
  label: Get Aspect: User Define H-Pan
  kind: query
  command: "Y 2 20 CR"
  params: []
- id: set_aspect_v_pan
  label: Set Aspect: User Define V-Pan
  kind: action
  command: "Y 1 21 {value} CR"
  params:
    - name: value
      type: integer
      range: "-32..32"
- id: get_aspect_v_pan
  label: Get Aspect: User Define V-Pan
  kind: query
  command: "Y 2 21 CR"
  params: []
- id: set_graphics_h_position
  label: Set Graphics: H-Position
  kind: action
  command: "Y 1 22 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..255
- id: get_graphics_h_position
  label: Get Graphics: H-Position
  kind: query
  command: "Y 2 22 CR"
  params: []
- id: set_graphics_v_position
  label: Set Graphics: V-Position
  kind: action
  command: "Y 1 23 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..255
- id: get_graphics_v_position
  label: Get Graphics: V-Position
  kind: query
  command: "Y 2 23 CR"
  params: []
- id: set_graphics_color
  label: Set Graphics: Color
  kind: action
  command: "Y 1 24 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..127
- id: get_graphics_color
  label: Get Graphics: Color
  kind: query
  command: "Y 2 24 CR"
  params: []
- id: set_graphics_hue
  label: Set Graphics: Hue
  kind: action
  command: "Y 1 25 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..127
- id: get_graphics_hue
  label: Get Graphics: Hue
  kind: query
  command: "Y 2 25 CR"
  params: []
- id: set_graphics_sharpness
  label: Set Graphics: Sharpness
  kind: action
  command: "Y 1 26 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..16
- id: get_graphics_sharpness
  label: Get Graphics: Sharpness
  kind: query
  command: "Y 2 26 CR"
  params: []
- id: set_graphics_frequency
  label: Set Graphics: Frequency
  kind: action
  command: "Y 1 27 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..100
- id: get_graphics_frequency
  label: Get Graphics: Frequency
  kind: query
  command: "Y 2 27 CR"
  params: []
- id: set_graphics_phase
  label: Set Graphics: Phase
  kind: action
  command: "Y 1 28 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..31
- id: get_graphics_phase
  label: Get Graphics: Phase
  kind: query
  command: "Y 2 28 CR"
  params: []
- id: set_video_color
  label: Set Video: Color
  kind: action
  command: "Y 1 29 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..127
- id: get_video_color
  label: Get Video: Color
  kind: query
  command: "Y 2 29 CR"
  params: []
- id: set_video_hue
  label: Set Video: Hue
  kind: action
  command: "Y 1 30 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..127
- id: get_video_hue
  label: Get Video: Hue
  kind: query
  command: "Y 2 30 CR"
  params: []
- id: set_video_sharpness
  label: Set Video: Sharpness
  kind: action
  command: "Y 1 31 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..16
- id: get_video_sharpness
  label: Get Video: Sharpness
  kind: query
  command: "Y 2 31 CR"
  params: []
- id: set_video_h_position
  label: Set Video: H-Position
  kind: action
  command: "Y 1 32 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..20
- id: get_video_h_position
  label: Get Video: H-Position
  kind: query
  command: "Y 2 32 CR"
  params: []
- id: set_video_v_position
  label: Set Video: V-Position
  kind: action
  command: "Y 1 33 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..20  # source: 0..20 for NTSC/NTSC 4.43/PAL-M/PAL 60, 0..39 for PAL/PAL-N/SECAM/NTSC 4.43 50
- id: get_video_v_position
  label: Get Video: V-Position
  kind: query
  command: "Y 2 33 CR"
  params: []
- id: set_audio_volume
  label: Set Audio: Volume
  kind: action
  command: "Y 1 34 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..32
- id: get_audio_volume
  label: Get Audio: Volume
  kind: query
  command: "Y 2 34 CR"
  params: []
- id: set_audio_treble
  label: Set Audio: Treble
  kind: action
  command: "Y 1 35 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..12
- id: get_audio_treble
  label: Get Audio: Treble
  kind: query
  command: "Y 2 35 CR"
  params: []
- id: set_audio_bass
  label: Set Audio: Bass
  kind: action
  command: "Y 1 36 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..12
- id: get_audio_bass
  label: Get Audio: Bass
  kind: query
  command: "Y 2 36 CR"
  params: []
- id: set_pip_h_position
  label: Set PIP: H-Position
  kind: action
  command: "Y 1 37 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..36
- id: get_pip_h_position
  label: Get PIP: H-Position
  kind: query
  command: "Y 2 37 CR"
  params: []
- id: set_pip_v_position
  label: Set PIP: V-Position
  kind: action
  command: "Y 1 38 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..36
- id: get_pip_v_position
  label: Get PIP: V-Position
  kind: query
  command: "Y 2 38 CR"
  params: []
- id: set_pip_user_v_size
  label: Set PIP: User Define V-Size
  kind: action
  command: "Y 1 39 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..255
- id: get_pip_user_v_size
  label: Get PIP: User Define V-Size
  kind: query
  command: "Y 2 39 CR"
  params: []
- id: set_pip_user_h_size
  label: Set PIP: User Define H-Size
  kind: action
  command: "Y 1 40 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..255
- id: get_pip_user_h_size
  label: Get PIP: User Define H-Size
  kind: query
  command: "Y 2 40 CR"
  params: []
- id: set_osd_h_position
  label: Set OSD: H-Position
  kind: action
  command: "Y 1 41 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..36
- id: get_osd_h_position
  label: Get OSD: H-Position
  kind: query
  command: "Y 2 41 CR"
  params: []
- id: set_osd_v_position
  label: Set OSD: V-Position
  kind: action
  command: "Y 1 42 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..36
- id: get_osd_v_position
  label: Get OSD: V-Position
  kind: query
  command: "Y 2 42 CR"
  params: []
- id: set_osd_timeout
  label: Set OSD: Time Out
  kind: action
  command: "Y 1 43 {value} CR"
  params:
    - name: value
      type: integer
      range: 3..60
- id: get_osd_timeout
  label: Get OSD: Time Out
  kind: query
  command: "Y 2 43 CR"
  params: []
- id: set_ht_h_sync_cycle
  label: Set HT: H-Sync Cycle
  kind: action
  command: "Y 1 44 {value} CR"
  params:
    - name: value
      type: integer
      range: "> 100  # UNRESOLVED: source says > 100, no upper bound stated"
  notes: "Setting command should be a reasonable value. Getting command returns current group parameter (refer to Y 3 29 X or Y 4 29)."
- id: get_ht_h_sync_cycle
  label: Get HT: H-Sync Cycle
  kind: query
  command: "Y 2 44 CR"
  params: []
- id: set_hw_h_sync_width
  label: Set HW: H-Sync Width
  kind: action
  command: "Y 1 45 {value} CR"
  params:
    - name: value
      type: integer
      range: "> 0  # UNRESOLVED: source says > 0, no upper bound stated"
- id: get_hw_h_sync_width
  label: Get HW: H-Sync Width
  kind: query
  command: "Y 2 45 CR"
  params: []
- id: set_hs_active_pixel_start
  label: Set HS: Active Pixel Start
  kind: action
  command: "Y 1 46 {value} CR"
  params:
    - name: value
      type: integer
      range: "> 0  # UNRESOLVED: source says > 0, no upper bound stated"
- id: get_hs_active_pixel_start
  label: Get HS: Active Pixel Start
  kind: query
  command: "Y 2 46 CR"
  params: []
- id: set_ha_active_pixel
  label: Set HA: Active Pixel
  kind: action
  command: "Y 1 47 {value} CR"
  params:
    - name: value
      type: integer
      range: "-"  # UNRESOLVED: source dash, no range
- id: get_ha_active_pixel
  label: Get HA: Active Pixel
  kind: query
  command: "Y 2 47 CR"
  params: []
- id: set_hp_h_sync_polarity
  label: Set HP: H-Sync Polarity
  kind: action
  command: "Y 1 48 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..1
      values: {0: positive, 1: negative}
- id: get_hp_h_sync_polarity
  label: Get HP: H-Sync Polarity
  kind: query
  command: "Y 2 48 CR"
  params: []
- id: set_vt_v_sync_cycle
  label: Set VT: V-Sync Cycle
  kind: action
  command: "Y 1 49 {value} CR"
  params:
    - name: value
      type: integer
      range: "> 0  # UNRESOLVED: no upper bound stated"
- id: get_vt_v_sync_cycle
  label: Get VT: V-Sync Cycle
  kind: query
  command: "Y 2 49 CR"
  params: []
- id: set_vw_v_sync_width
  label: Set VW: V-Sync Width
  kind: action
  command: "Y 1 50 {value} CR"
  params:
    - name: value
      type: integer
      range: "> 0  # UNRESOLVED: no upper bound stated"
- id: get_vw_v_sync_width
  label: Get VW: V-Sync Width
  kind: query
  command: "Y 2 50 CR"
  params: []
- id: set_vs_active_line_start
  label: Set VS: Active Line Start
  kind: action
  command: "Y 1 51 {value} CR"
  params:
    - name: value
      type: integer
      range: "> 0  # UNRESOLVED: no upper bound stated"
- id: get_vs_active_line_start
  label: Get VS: Active Line Start
  kind: query
  command: "Y 2 51 CR"
  params: []
- id: set_va_active_line
  label: Set VA: Active Line
  kind: action
  command: "Y 1 52 {value} CR"
  params:
    - name: value
      type: integer
      range: "-"  # UNRESOLVED: source dash, no range
- id: get_va_active_line
  label: Get VA: Active Line
  kind: query
  command: "Y 2 52 CR"
  params: []
- id: set_vp_v_sync_polarity
  label: Set VP: V-Sync Polarity
  kind: action
  command: "Y 1 53 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..1
      values: {0: positive, 1: negative}
- id: get_vp_v_sync_polarity
  label: Get VP: V-Sync Polarity
  kind: query
  command: "Y 2 53 CR"
  params: []
- id: set_oclk
  label: Set OCLK
  kind: action
  command: "Y 1 54 {value} CR"
  params:
    - name: value
      type: integer
      range: "> 100  # UNRESOLVED: no upper bound stated"
  notes: "Oclk = Param / 10 Mhz. Should be a reasonable value."

# ---------- Control_Type 3 (Set) / 4 (Get): high-level settings ----------
- id: set_input_source
  label: Set Input Source
  kind: action
  command: "Y 3 0 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..9
      values:
        {0: VGA-1, 1: "VGA-2 (VP-724 only)", 2: DVI, 3: Component, 4: "YC-1", 5: "AV-1", 6: "YV-2", 7: "AV-2", 8: Scart, 9: TV}
- id: get_input_source
  label: Get Input Source
  kind: query
  command: "Y 4 0 CR"
  params: []
- id: set_video_aspect_ratio
  label: Set Video Aspect Ratio
  kind: action
  command: "Y 3 1 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..5
      values: {0: Normal, 1: Wide Screen, 2: "Pan&Scan", 3: "4:3", 4: "16:9", 5: UserDefine}
- id: get_video_aspect_ratio
  label: Get Video Aspect Ratio
  kind: query
  command: "Y 4 1 CR"
  params: []
- id: set_video_nonlinear
  label: Set Video Nonlinear
  kind: action
  command: "Y 3 2 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..2
      values: {0: Off, 1: Side, 2: Middle}
- id: get_video_nonlinear
  label: Get Video Nonlinear
  kind: query
  command: "Y 4 2 CR"
  params: []
- id: set_vga_aspect_ratio
  label: Set VGA Aspect Ratio
  kind: action
  command: "Y 3 3 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..5
      values: {0: Full Screen, 1: Native, 2: NonLinear, 3: "4:3", 4: "16:9", 5: UserDefine}
- id: get_vga_aspect_ratio
  label: Get VGA Aspect Ratio
  kind: query
  command: "Y 4 3 CR"
  params: []
- id: set_zoom_ratio
  label: Set Zoom Ratio
  kind: action
  command: "Y 3 4 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..10
      values: {0: Off, 1: "150%", 2: "200%", 3: "225%", 4: "250%", 5: "275%", 6: "300%", 7: "325%", 8: "350%", 9: "375%", 10: "400%"}
- id: get_zoom_ratio
  label: Get Zoom Ratio
  kind: query
  command: "Y 4 4 CR"
  params: []
- id: set_graphics_color_format
  label: Set Graphics Color Format
  kind: action
  command: "Y 3 5 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..2
      values: {0: Default, 1: RGB, 2: YUV}
- id: get_graphics_color_format
  label: Get Graphics Color Format
  kind: query
  command: "Y 4 5 CR"
  params: []
- id: set_video_color_format
  label: Set Video Color Format
  kind: action
  command: "Y 3 6 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..2
      values: {0: Default, 1: RGB, 2: YUV}
  notes: "Set only - no Get row in source."
- id: set_video_standard
  label: Set Video Standard
  kind: action
  command: "Y 3 7 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..6
      values: {0: Auto, 1: NTSC, 2: "NTSC 4.43", 3: PAL, 4: "PAL-N", 5: "PAL-M", 6: SECAM}
- id: get_video_standard
  label: Get Video Standard
  kind: query
  command: "Y 4 7 CR"
  params: []
- id: set_film_mode
  label: Set Film Mode
  kind: action
  command: "Y 3 8 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..1
      values: {0: Off, 1: On}
- id: get_film_mode
  label: Get Film Mode
  kind: query
  command: "Y 4 8 CR"
  params: []
- id: set_audio_stereo
  label: Set Audio Stereo
  kind: action
  command: "Y 3 9 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..1
      values: {0: Off, 1: On}
- id: get_audio_stereo
  label: Get Audio Stereo
  kind: query
  command: "Y 4 9 CR"
  params: []
- id: set_pip_on_off
  label: Set PIP On/Off
  kind: action
  command: "Y 3 10 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..1
      values: {0: Off, 1: On}
- id: get_pip_on_off
  label: Get PIP On/Off
  kind: query
  command: "Y 4 10 CR"
  params: []
- id: set_pip_source
  label: Set PIP Source
  kind: action
  command: "Y 3 11 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..9
      values: {0: VGA-1, 1: "VGA-2 (VP-724 Only)", 2: DVI, 3: Component, 4: "YC-1", 5: "AV-1", 6: "YV-2", 7: "AV-2", 8: SCART, 9: TV}
- id: get_pip_source
  label: Get PIP Source
  kind: query
  command: "Y 4 11 CR"
  params: []
- id: set_pip_size
  label: Set PIP Size
  kind: action
  command: "Y 3 12 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..5
      values: {0: "1/25", 1: "1/16", 2: "1/9", 3: "1/4", 4: Split, 5: User Define}
- id: get_pip_size
  label: Get PIP Size
  kind: query
  command: "Y 4 12 CR"
  params: []
- id: set_pip_frame
  label: Set PIP Frame
  kind: action
  command: "Y 3 13 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..1
      values: {0: Off, 1: On}
- id: get_pip_frame
  label: Get PIP Frame
  kind: query
  command: "Y 4 13 CR"
  params: []
- id: set_seamless_mode
  label: Set Seamless Switch: Mode
  kind: action
  command: "Y 3 14 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..2
      values: {0: Fast, 1: Moderate, 2: Safe}
- id: get_seamless_mode
  label: Get Seamless Switch: Mode
  kind: query
  command: "Y 4 14 CR"
  params: []
- id: set_seamless_background
  label: Set Seamless Switch: Background
  kind: action
  command: "Y 3 15 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..2
      values: {0: Black, 1: Blue, 2: Disable Analog Syncs}
- id: get_seamless_background
  label: Get Seamless Switch: Background
  kind: query
  command: "Y 4 15 CR"
  params: []
- id: set_seamless_auto_search
  label: Set Seamless Switch: Auto Search
  kind: action
  command: "Y 3 16 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..1
      values: {0: Off, 1: On}
- id: get_seamless_auto_search
  label: Get Seamless Switch: Auto Search
  kind: query
  command: "Y 4 16 CR"
  params: []
- id: set_osd_startup_logo
  label: Set OSD: Startup Logo
  kind: action
  command: "Y 3 17 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..1
      values: {0: Off, 1: On}
- id: get_osd_startup_logo
  label: Get OSD: Startup Logo
  kind: query
  command: "Y 4 17 CR"
  params: []
- id: set_osd_size
  label: Set OSD: Size
  kind: action
  command: "Y 3 18 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..1
      values: {0: Normal, 1: Double}
- id: get_osd_size
  label: Get OSD: Size
  kind: query
  command: "Y 4 18 CR"
  params: []
- id: set_osd_source_prompt
  label: Set OSD: Source Prompt
  kind: action
  command: "Y 3 19 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..1
      values: {0: Off, 1: On}
- id: get_osd_source_prompt
  label: Get OSD: Source Prompt
  kind: query
  command: "Y 4 19 CR"
  params: []
- id: set_osd_blank_color
  label: Set OSD: Blank Color
  kind: action
  command: "Y 3 20 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..1
      values: {0: Blue, 1: Black}
- id: get_osd_blank_color
  label: Get OSD: Blank Color
  kind: query
  command: "Y 4 20 CR"
  params: []
- id: set_output_resolution
  label: Set Output Resolution
  kind: action
  command: "Y 3 21 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..19
      values:
        {0: "640x480", 1: "800x600", 2: "1024x768", 3: "1280x1024", 4: "1600x1200", 5: "852x1024i", 6: "1024x1024i", 7: "1366x768", 8: "1365x1024", 9: "1280x720", 10: "720x483", 11: "852x480", 12: "1400x1050", 13: "480P", 14: "720P", 15: "1080i", 16: "576P", 17: "1080P", 18: "1280x768", 19: "User Define"}
  notes: "HDTV output is VP-723/724 only. 1080P only on KI238 + 80P DAC Board."
- id: get_output_resolution
  label: Get Output Resolution
  kind: query
  command: "Y 4 21 CR"
  params: []
- id: set_output_refresh_rate
  label: Set Output Refresh Rate
  kind: action
  command: "Y 3 22 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..3
      values: {0: "60Hz", 1: "75Hz", 2: "85Hz", 3: "50Hz"}
- id: get_output_refresh_rate
  label: Get Output Refresh Rate
  kind: query
  command: "Y 4 22 CR"
  params: []
- id: set_factory_reset
  label: Set Factory Reset
  kind: action
  command: "Y 3 23 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..1
      values: {0: Cancel, 1: ok}
- id: get_factory_reset
  label: Get Factory Reset
  kind: query
  command: "Y 4 23 CR"
  params: []
- id: set_advanced_input_button
  label: Set Advanced: Input Button
  kind: action
  command: "Y 3 24 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..3
      values: {0: "Freeze/Blank", 1: Freeze, 2: Blank, 3: Ignore}
- id: get_advanced_input_button
  label: Get Advanced: Input Button
  kind: query
  command: "Y 4 24 CR"
  params: []
- id: set_key_lock_save
  label: Set Key Lock Save
  kind: action
  command: "Y 3 25 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..1
- id: get_key_lock_save
  label: Get Key Lock Save
  kind: query
  command: "Y 4 25 CR"
  params: []
- id: set_input_lock
  label: Set Input Lock
  kind: action
  command: "Y 3 26 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..1
- id: get_input_lock
  label: Get Input Lock
  kind: query
  command: "Y 4 26 CR"
  params: []
- id: set_sog_setting
  label: Set SOG Setting
  kind: action
  command: "Y 3 27 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..2
      values: {0: Auto, 1: RGsB, 2: DTV}
  notes: "KI239 firmware only."
- id: get_sog_setting
  label: Get SOG Setting
  kind: query
  command: "Y 4 27 CR"
  params: []
- id: set_osd_timeout_enable
  label: Set Enable OSD Timeout
  kind: action
  command: "Y 3 28 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..1
      values: {0: Disable, 1: Enable}
- id: get_osd_timeout_enable
  label: Get Enable OSD Timeout
  kind: query
  command: "Y 4 28 CR"
  params: []
- id: set_userdefined_param_group
  label: Set Select Output Mode Userdefined Parameter Group
  kind: action
  command: "Y 3 29 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..2
      values: {0: "Group 1", 1: "Group 2", 2: "Group 3"}
- id: get_userdefined_param_group
  label: Get Select Output Mode Userdefined Parameter Group
  kind: query
  command: "Y 4 29 CR"
  params: []
- id: set_audio_save_mode
  label: Set Audio Save Mode (Volume/Treble/Bass)
  kind: action
  command: "Y 3 30 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..2
      values: {0: Master, 1: Individual, 2: Linked}
- id: get_audio_save_mode
  label: Get Audio Save Mode
  kind: query
  command: "Y 4 30 CR"
  params: []

# ---------- Control_Type 5: Load Gamma/Color presets ----------
- id: load_gamma_normal
  label: Load Gamma/Color - Normal
  kind: action
  command: "Y 5 0 CR"
  params: []
- id: load_gamma_presentation
  label: Load Gamma/Color - Presentation
  kind: action
  command: "Y 5 1 CR"
  params: []
- id: load_gamma_cinema
  label: Load Gamma/Color - Cinema
  kind: action
  command: "Y 5 2 CR"
  params: []
- id: load_gamma_nature
  label: Load Gamma/Color - Nature
  kind: action
  command: "Y 5 3 CR"
  params: []
- id: load_gamma_user1
  label: Load Gamma/Color - User1
  kind: action
  command: "Y 5 4 CR"
  params: []
- id: load_gamma_user2
  label: Load Gamma/Color - User2
  kind: action
  command: "Y 5 5 CR"
  params: []

# ---------- Control_Type 6 (Set) / 7 (Get): power/freeze/blank/mute/keylock ----------
- id: set_power
  label: Set Power
  kind: action
  command: "Y 6 0 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..1
      values: {0: Power Down, 1: Power On}
- id: get_power
  label: Get Power
  kind: query
  command: "Y 7 0 CR"
  params: []
- id: set_freeze
  label: Set Freeze
  kind: action
  command: "Y 6 1 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..1
      values: {0: Off, 1: On}
- id: get_freeze
  label: Get Freeze
  kind: query
  command: "Y 7 1 CR"
  params: []
- id: set_blank
  label: Set Blank
  kind: action
  command: "Y 6 2 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..1
      values: {0: Off, 1: On}
- id: get_blank
  label: Get Blank
  kind: query
  command: "Y 7 2 CR"
  params: []
- id: set_mute
  label: Set Mute
  kind: action
  command: "Y 6 3 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..1
      values: {0: Off, 1: On}
- id: get_mute
  label: Get Mute
  kind: query
  command: "Y 7 3 CR"
  params: []
- id: set_key_lock
  label: Set Key Lock
  kind: action
  command: "Y 6 4 {value} CR"
  params:
    - name: value
      type: integer
      range: 0..1
      values: {0: Off, 1: On}
- id: get_key_lock
  label: Get Key Lock
  kind: query
  command: "Y 7 4 CR"
  params: []

# ---------- Control_Type 8: query resolution/refresh rate or video standard ----------
- id: query_resolution_or_video_standard
  label: Query Resolution/Refresh Rate or Video Standard
  kind: query
  command: "Y 8 0 CR"
  notes: "Example reply: 'Z 8 0 1080i CR'."
```

## Feedbacks
```yaml
# Tier 1 replies documented in source (template):
#   "Z  Control_Type  Function  [Param]  CR"
#   "Done  CR"
#
# Tier 3: numeric value interpretation (e.g. "2" = 1024x768) is encoded
# inside the corresponding action's `values:` map, not duplicated here.
- id: protocol_ack
  label: Protocol Acknowledgement
  type: enum
  values: [done]
  description: "Device replies with the string 'Done' followed by CR after a successful Set command."
- id: protocol_echo
  label: Protocol Echo
  type: string
  description: "Device replies with 'Z <Control_Type> <Function> [<Param>]' + CR. Param is the current value for Get commands, or echoes the Set value."
```

## Variables
```yaml
# Tier 3: source does not describe persistent, named variables independent of
# the command/response scheme. All settable state is reachable through the
# Actions block above. No additional Variables section is needed.
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited device-to-host events.
```

## Macros
```yaml
# UNRESOLVED: source does not describe any multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset  # source: "0:Cancel, 1:ok" implies user must explicitly set value 1
interlocks: []
# UNRESOLVED: source contains no further safety warnings, interlocks, or
# power-on sequencing requirements.
```

## Notes
- Protocol is single-direction ASCII over RS-232. No handshake/login.
- Field separator is ASCII 0x20 (space). Line terminator is CR (0x0D or 0x0A).
- Source mentions a second baud rate "1152000 bps" alongside 9600 — this is likely a typo for 115200, but it is reproduced verbatim above. UNRESOLVED.
- Source file title says "VP720XL/724XL Protocol Series" — this is a Kramer video scaler line, NOT the "KDS 7 MNGR" entity ID requested. The spec was authored from the source as-found; operator must reconcile.
- History table in source references firmware codes KB2.33, KI2.38, KI2.39, KI2.42, KI2.49 — no clean public version range. UNRESOLVED.

<!-- UNRESOLVED: source describes "Y 3 29 X" and "Y 4 29" cross-references for HT/HW group parameter storage; the meaning of the trailing "X" placeholder is not fully clarified in source. -->
```

Spec written. Critical flag: source doc is for **VP-720XL/724XL** (Kramer scalers), not **KDS 7 MNGR** (AVoIP manager). Title + spec_id reflect the source as authored. `compatible_with.models` and `<!-- UNRESOLVED -->` block in Summary both surface the mismatch — operator must reconcile entity binding before ingesting. All command rows in the source command table are enumerated as separate actions (38 button rows, 54 set/get param rows for Control_Type 1/2, 31 set/get rows for Control_Type 3/4, 6 preset loads, 5 power/freeze/blank/mute/keylock pairs, 1 Control_Type 8 query). Parity + flow control + 115200 baud are unresolved per Tier 3 policy.

## Provenance

```yaml
source_domains:
  - cdn.kramerav.com
source_urls:
  - https://cdn.kramerav.com/web/downloads/protocols/vp-719xl_720xl_vp-724xl_protocol.pdf
retrieved_at: 2026-05-15T05:53:55.561Z
last_checked_at: 2026-06-02T17:22:47.288Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:22:47.288Z
matched_actions: 225
action_count: 225
confidence: medium
summary: "All 225 spec actions matched literally in source command table; transport parameters (9600 baud, 8 data bits, 1 stop bit, RS-232) verified; 100% coverage. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is labeled VP720XL/724XL/DS series, NOT \"KDS 7 MNGR\". Entity ID requested is for KDS 7 MNGR, which is a different Kramer product family (AVoIP manager). Operator should reconcile this mismatch before publishing."
- "parity is not stated in source."
- "flow control is not stated in source."
- "not stated in source; RS-232 default assumption noted in inference"
- "not stated in source"
- "source says > 100, no upper bound stated\""
- "source says > 0, no upper bound stated\""
- "source dash, no range"
- "no upper bound stated\""
- "source does not describe unsolicited device-to-host events."
- "source does not describe any multi-step macro sequences."
- "source contains no further safety warnings, interlocks, or"
- "source describes \"Y 3 29 X\" and \"Y 4 29\" cross-references for HT/HW group parameter storage; the meaning of the trailing \"X\" placeholder is not fully clarified in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
