---
spec_id: admin/optoma-eh7500
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma EH7500 Control Spec"
manufacturer: Optoma
model_family: EH7500
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - EH7500
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - optomaeurope.com
  - region-resource.optoma.com
source_urls:
  - https://www.optomaeurope.com/ContentStorage/Documents/731aa26e-4842-4414-999a-422879b17cee.pdf
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
retrieved_at: 2026-06-02T03:46:41.702Z
last_checked_at: 2026-06-02T10:14:08.590Z
generated_at: 2026-06-02T10:14:08.590Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP port for network/web control not stated in source; firmware version not stated; HTTP base URL for web UI not stated"
  - "no multi-step sequences described in source"
  - "TCP port for network/web control not stated; HTTP base URL not stated; firmware version compatibility not stated; UART16550 FIFO disable and any RS-232 handshake/recovery sequences not stated"
verification:
  verdict: verified
  checked_at: 2026-06-02T10:14:08.590Z
  matched_actions: 165
  action_count: 165
  confidence: medium
  summary: "All 165 spec actions matched exactly to source ASCII commands with correct parameters; transport values confirmed; bidirectional coverage is 1:1. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Optoma EH7500 Control Spec

## Summary
Optoma EH7500 projector. RS-232 control, ASCII command protocol on a DE-9 (TXD/RXD/GND) shell, 9600 8N1, no flow control. Commands prefixed with `~XX` (XX = projector ID 00-99, 00 = all) and terminated with `<CR>` (0x0D). Network control via web browser mentioned but no TCP port stated.

<!-- UNRESOLVED: TCP port for network/web control not stated in source; firmware version not stated; HTTP base URL for web UI not stated -->

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
  type: none  # inferred: no login procedure on RS-232 in source
```

## Traits
```yaml
- powerable       # inferred from ~XX00 power on/off
- routable        # inferred from ~XX12 source select variants
- queryable       # inferred from ~XX121..~XX151 read commands
- levelable       # inferred from volume/brightness/contrast/keystone
```

## Actions
```yaml
- id: power_on
  label: Power ON
  kind: action
  command: "~XX00 1\r"
  params: []
- id: power_off
  label: Power OFF
  kind: action
  command: "~XX00 0\r"
  params: []
- id: power_on_with_password
  label: Power ON with Password
  kind: action
  command: "~XX00 1 ~{nnnn}\r"
  params:
    - name: nnnn
      type: string
      description: "4-digit password ~0000 (a=7E 30 30 30 30) through ~9999 (a=7E 39 39 39 39)"
- id: resync
  label: Resync
  kind: action
  command: "~XX01 1\r"
  params: []
- id: av_mute_on
  label: AV Mute On
  kind: action
  command: "~XX02 1\r"
  params: []
- id: av_mute_off
  label: AV Mute Off
  kind: action
  command: "~XX02 0\r"
  params: []
- id: freeze
  label: Freeze
  kind: action
  command: "~XX04 1\r"
  params: []
- id: unfreeze
  label: Unfreeze
  kind: action
  command: "~XX04 0\r"
  params: []
- id: zoom_plus
  label: Zoom Plus
  kind: action
  command: "~XX05 1\r"
  params: []
- id: zoom_minus
  label: Zoom Minus
  kind: action
  command: "~XX06 1\r"
  params: []
- id: pan_up
  label: Up (Pan under zoom)
  kind: action
  command: "~XX07 1\r"
  params: []
- id: pan_down
  label: Down (Pan under zoom)
  kind: action
  command: "~XX08 1\r"
  params: []
- id: pan_left
  label: Left (Pan under zoom)
  kind: action
  command: "~XX09 1\r"
  params: []
- id: pan_right
  label: Right (Pan under zoom)
  kind: action
  command: "~XX10 1\r"
  params: []
- id: source_hdmi
  label: Direct Source HDMI
  kind: action
  command: "~XX12 1\r"
  params: []
- id: source_bnc
  label: Direct Source BNC
  kind: action
  command: "~XX12 4\r"
  params: []
- id: source_vga1
  label: Direct Source VGA 1
  kind: action
  command: "~XX12 5\r"
  params: []
- id: source_vga2
  label: Direct Source VGA 2
  kind: action
  command: "~XX12 6\r"
  params: []
- id: source_svideo
  label: Direct Source S-Video
  kind: action
  command: "~XX12 9\r"
  params: []
- id: source_video
  label: Direct Source Video
  kind: action
  command: "~XX12 10\r"
  params: []
- id: source_component_rca
  label: Direct Source Component RCA
  kind: action
  command: "~XX12 14\r"
  params: []
- id: source_hdmi2
  label: Direct Source HDMI 2
  kind: action
  command: "~XX12 15\r"
  params: []
- id: display_mode_presentation
  label: Display Mode Presentation
  kind: action
  command: "~XX20 1\r"
  params: []
- id: display_mode_bright
  label: Display Mode Bright
  kind: action
  command: "~XX20 2\r"
  params: []
- id: display_mode_movie
  label: Display Mode Movie
  kind: action
  command: "~XX20 3\r"
  params: []
- id: display_mode_srgb
  label: Display Mode sRGB
  kind: action
  command: "~XX20 4\r"
  params: []
- id: display_mode_user1
  label: Display Mode User1
  kind: action
  command: "~XX20 5\r"
  params: []
- id: display_mode_user2
  label: Display Mode User2
  kind: action
  command: "~XX20 6\r"
  params: []
- id: display_mode_blackboard
  label: Display Mode Blackboard
  kind: action
  command: "~XX20 7\r"
  params: []
- id: display_mode_classroom
  label: Display Mode Classroom
  kind: action
  command: "~XX20 8\r"
  params: []
- id: brightness_set
  label: Brightness
  kind: action
  command: "~XX21 {n}\r"
  params:
    - name: n
      type: integer
      description: "-50 to 50 (ASCII hex form: a=30 for -50, a=31 30 30 for 50)"
- id: contrast_set
  label: Contrast
  kind: action
  command: "~XX22 {n}\r"
  params:
    - name: n
      type: integer
      description: "-50 to 50"
- id: sharpness_set
  label: Sharpness
  kind: action
  command: "~XX23 {n}\r"
  params:
    - name: n
      type: integer
      description: "1 to 15 (a=30..a=33 31)"
- id: color_red_gain
  label: Color Red Gain
  kind: action
  command: "~XX24 {n}\r"
  params:
    - name: n
      type: integer
      description: "-50 to 50"
- id: color_green_gain
  label: Color Green Gain
  kind: action
  command: "~XX25 {n}\r"
  params:
    - name: n
      type: integer
      description: "-50 to 50"
- id: color_blue_gain
  label: Color Blue Gain
  kind: action
  command: "~XX26 {n}\r"
  params:
    - name: n
      type: integer
      description: "-50 to 50"
- id: color_red_bias
  label: Color Red Bias
  kind: action
  command: "~XX27 {n}\r"
  params:
    - name: n
      type: integer
      description: "-50 to 50"
- id: color_green_bias
  label: Color Green Bias
  kind: action
  command: "~XX28 {n}\r"
  params:
    - name: n
      type: integer
      description: "-50 to 50"
- id: color_blue_bias
  label: Color Blue Bias
  kind: action
  command: "~XX29 {n}\r"
  params:
    - name: n
      type: integer
      description: "-50 to 50"
- id: color_cyan
  label: Color Cyan
  kind: action
  command: "~XX30 {n}\r"
  params:
    - name: n
      type: integer
      description: "-50 to 50"
- id: color_yellow
  label: Color Yellow
  kind: action
  command: "~XX31 {n}\r"
  params:
    - name: n
      type: integer
      description: "-50 to 50"
- id: color_magenta
  label: Color Magenta
  kind: action
  command: "~XX32 {n}\r"
  params:
    - name: n
      type: integer
      description: "-50 to 50"
- id: color_reset
  label: Color Reset
  kind: action
  command: "~XX33 1\r"
  params: []
- id: brilliantcolor
  label: BrilliantColor
  kind: action
  command: "~XX34 {n}\r"
  params:
    - name: n
      type: integer
      description: "0 to 10"
- id: degamma_film
  label: Degamma Film
  kind: action
  command: "~XX35 1\r"
  params: []
- id: degamma_video
  label: Degamma Video
  kind: action
  command: "~XX35 2\r"
  params: []
- id: degamma_graphics
  label: Degamma Graphics
  kind: action
  command: "~XX35 3\r"
  params: []
- id: degamma_pc
  label: Degamma PC
  kind: action
  command: "~XX35 4\r"
  params: []
- id: color_temp_warm
  label: Color Temp Warm
  kind: action
  command: "~XX36 1\r"
  params: []
- id: color_temp_medium
  label: Color Temp Medium
  kind: action
  command: "~XX36 2\r"
  params: []
- id: color_temp_cold
  label: Color Temp Cold
  kind: action
  command: "~XX36 3\r"
  params: []
- id: color_space_auto
  label: Color Space Auto
  kind: action
  command: "~XX37 1\r"
  params: []
- id: color_space_rgb
  label: Color Space RGB
  kind: action
  command: "~XX37 2\r"
  params: []
- id: color_space_yuv
  label: Color Space YUV
  kind: action
  command: "~XX37 3\r"
  params: []
- id: image_ai_on
  label: Image AI On
  kind: action
  command: "~XX195 1\r"
  params: []
- id: image_ai_off
  label: Image AI Off
  kind: action
  command: "~XX195 0\r"
  params: []
- id: tint_set
  label: Tint
  kind: action
  command: "~XX44 {n}\r"
  params:
    - name: n
      type: integer
      description: "0 to 100"
- id: saturation_set
  label: Color (Saturation)
  kind: action
  command: "~XX45 {n}\r"
  params:
    - name: n
      type: integer
      description: "0 to 100"
- id: format_4_3
  label: Format 4:3
  kind: action
  command: "~XX60 1\r"
  params: []
- id: format_16_9
  label: Format 16:9
  kind: action
  command: "~XX60 2\r"
  params: []
- id: format_16_10
  label: Format 16:10
  kind: action
  command: "~XX60 3\r"
  params: []
- id: format_lbx
  label: Format LBX
  kind: action
  command: "~XX60 5\r"
  params: []
- id: format_native
  label: Format Native
  kind: action
  command: "~XX60 6\r"
  params: []
- id: format_auto
  label: Format AUTO
  kind: action
  command: "~XX60 7\r"
  params: []
- id: overscan
  label: Overscan
  kind: action
  command: "~XX61 {n}\r"
  params:
    - name: n
      type: integer
      description: "0 to 10"
- id: zoom
  label: Zoom
  kind: action
  command: "~XX62 {n}\r"
  params:
    - name: n
      type: integer
      description: "-5 to 25"
- id: h_image_shift
  label: H Image Shift
  kind: action
  command: "~XX63 {n}\r"
  params:
    - name: n
      type: integer
      description: "-50 to 50"
- id: v_image_shift
  label: V Image Shift
  kind: action
  command: "~XX64 {n}\r"
  params:
    - name: n
      type: integer
      description: "-50 to 50"
- id: v_keystone
  label: V Keystone
  kind: action
  command: "~XX66 {n}\r"
  params:
    - name: n
      type: integer
      description: "-40 to 40"
- id: auto_keystone_on
  label: Auto Keystone On
  kind: action
  command: "~XX69 1\r"
  params: []
- id: auto_keystone_off
  label: Auto Keystone Off
  kind: action
  command: "~XX69 0\r"
  params: []
- id: language_english
  label: Language English
  kind: action
  command: "~XX70 1\r"
  params: []
- id: language_german
  label: Language German
  kind: action
  command: "~XX70 2\r"
  params: []
- id: language_french
  label: Language French
  kind: action
  command: "~XX70 3\r"
  params: []
- id: language_italian
  label: Language Italian
  kind: action
  command: "~XX70 4\r"
  params: []
- id: language_spanish
  label: Language Spanish
  kind: action
  command: "~XX70 5\r"
  params: []
- id: language_portuguese
  label: Language Portuguese
  kind: action
  command: "~XX70 6\r"
  params: []
- id: language_polish
  label: Language Polish
  kind: action
  command: "~XX70 7\r"
  params: []
- id: language_dutch
  label: Language Dutch
  kind: action
  command: "~XX70 8\r"
  params: []
- id: language_swedish
  label: Language Swedish
  kind: action
  command: "~XX70 9\r"
  params: []
- id: language_norwegian_danish
  label: Language Norwegian/Danish
  kind: action
  command: "~XX70 10\r"
  params: []
- id: language_finnish
  label: Language Finnish
  kind: action
  command: "~XX70 11\r"
  params: []
- id: language_greek
  label: Language Greek
  kind: action
  command: "~XX70 12\r"
  params: []
- id: language_traditional_chinese
  label: Language Traditional Chinese
  kind: action
  command: "~XX70 13\r"
  params: []
- id: language_simplified_chinese
  label: Language Simplified Chinese
  kind: action
  command: "~XX70 14\r"
  params: []
- id: language_japanese
  label: Language Japanese
  kind: action
  command: "~XX70 15\r"
  params: []
- id: language_korean
  label: Language Korean
  kind: action
  command: "~XX70 16\r"
  params: []
- id: language_russian
  label: Language Russian
  kind: action
  command: "~XX70 17\r"
  params: []
- id: language_hungarian
  label: Language Hungarian
  kind: action
  command: "~XX70 18\r"
  params: []
- id: language_czechoslovak
  label: Language Czechoslovak
  kind: action
  command: "~XX70 19\r"
  params: []
- id: language_arabic
  label: Language Arabic
  kind: action
  command: "~XX70 20\r"
  params: []
- id: language_thai
  label: Language Thai
  kind: action
  command: "~XX70 21\r"
  params: []
- id: language_turkish
  label: Language Turkish
  kind: action
  command: "~XX70 22\r"
  params: []
- id: language_farsi
  label: Language Farsi
  kind: action
  command: "~XX70 23\r"
  params: []
- id: projection_front_desktop
  label: Projection Front-Desktop
  kind: action
  command: "~XX71 1\r"
  params: []
- id: projection_rear_desktop
  label: Projection Rear-Desktop
  kind: action
  command: "~XX71 2\r"
  params: []
- id: projection_front_ceiling
  label: Projection Front-Ceiling
  kind: action
  command: "~XX71 3\r"
  params: []
- id: projection_rear_ceiling
  label: Projection Rear-Ceiling
  kind: action
  command: "~XX71 4\r"
  params: []
- id: menu_location_top_left
  label: Menu Location Top Left
  kind: action
  command: "~XX72 1\r"
  params: []
- id: menu_location_top_right
  label: Menu Location Top Right
  kind: action
  command: "~XX72 2\r"
  params: []
- id: menu_location_centre
  label: Menu Location Centre
  kind: action
  command: "~XX72 3\r"
  params: []
- id: menu_location_bottom_left
  label: Menu Location Bottom Left
  kind: action
  command: "~XX72 4\r"
  params: []
- id: menu_location_bottom_right
  label: Menu Location Bottom Right
  kind: action
  command: "~XX72 5\r"
  params: []
- id: screen_type_16_10
  label: Screen Type 16:10
  kind: action
  command: "~XX90 1\r"
  params: []
- id: screen_type_16_9
  label: Screen Type 16:9
  kind: action
  command: "~XX90 0\r"
  params: []
- id: signal_automatic_on
  label: Signal Automatic On
  kind: action
  command: "~XX91 1\r"
  params: []
- id: signal_automatic_off
  label: Signal Automatic Off
  kind: action
  command: "~XX91 0\r"
  params: []
- id: frequency
  label: Frequency
  kind: action
  command: "~XX73 {n}\r"
  params:
    - name: n
      type: integer
      description: "-5 to 5 (by signal)"
- id: phase
  label: Phase
  kind: action
  command: "~XX74 {n}\r"
  params:
    - name: n
      type: integer
      description: "0 to 31 (by signal)"
- id: h_position
  label: H. Position
  kind: action
  command: "~XX75 {n}\r"
  params:
    - name: n
      type: integer
      description: "-5 to 5 (by timing)"
- id: v_position
  label: V. Position
  kind: action
  command: "~XX76 {n}\r"
  params:
    - name: n
      type: integer
      description: "-5 to 5 (by timing)"
- id: security_timer
  label: Security Timer Month/Day/Hour
  kind: action
  command: "~XX77 {aabbcc}\r"
  params:
    - name: aabbcc
      type: string
      description: "mm/dd/hh packed; mm=00-12, dd=00-30, hh=00-24"
- id: security_on
  label: Security On
  kind: action
  command: "~XX78 1\r"
  params: []
- id: security_off
  label: Security Off
  kind: action
  command: "~XX78 0\r"
  params: []
- id: projector_id_set
  label: Projector ID
  kind: action
  command: "~XX79 {n}\r"
  params:
    - name: n
      type: integer
      description: "00 to 99"
- id: mute_on
  label: Mute On
  kind: action
  command: "~XX80 1\r"
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  command: "~XX80 0\r"
  params: []
- id: volume
  label: Volume
  kind: action
  command: "~XX81 {n}\r"
  params:
    - name: n
      type: integer
      description: "0 to 10"
- id: logo_optoma
  label: Logo Optoma
  kind: action
  command: "~XX82 1\r"
  params: []
- id: logo_user
  label: Logo User
  kind: action
  command: "~XX82 2\r"
  params: []
- id: logo_capture
  label: Logo Capture
  kind: action
  command: "~XX83 1\r"
  params: []
- id: closed_captioning_off
  label: Closed Captioning Off
  kind: action
  command: "~XX88 0\r"
  params: []
- id: closed_captioning_cc1
  label: Closed Captioning cc1
  kind: action
  command: "~XX88 1\r"
  params: []
- id: closed_captioning_cc2
  label: Closed Captioning cc2
  kind: action
  command: "~XX88 2\r"
  params: []
- id: source_lock_on
  label: Source Lock On
  kind: action
  command: "~XX100 1\r"
  params: []
- id: source_lock_off
  label: Source Lock Off
  kind: action
  command: "~XX100 0\r"
  params: []
- id: next_source
  label: Next Source
  kind: action
  command: "~XX100 3\r"
  params: []
- id: high_altitude_on
  label: High Altitude On
  kind: action
  command: "~XX101 1\r"
  params: []
- id: high_altitude_off
  label: High Altitude Off
  kind: action
  command: "~XX101 0\r"
  params: []
- id: information_hide_on
  label: Information Hide On
  kind: action
  command: "~XX102 1\r"
  params: []
- id: information_hide_off
  label: Information Hide Off
  kind: action
  command: "~XX102 0\r"
  params: []
- id: keypad_lock_on
  label: Keypad Lock On
  kind: action
  command: "~XX103 1\r"
  params: []
- id: keypad_lock_off
  label: Keypad Lock Off
  kind: action
  command: "~XX103 0\r"
  params: []
- id: background_color_blue
  label: Background Color Blue
  kind: action
  command: "~XX104 1\r"
  params: []
- id: background_color_black
  label: Background Color Black
  kind: action
  command: "~XX104 2\r"
  params: []
- id: background_color_red
  label: Background Color Red
  kind: action
  command: "~XX104 3\r"
  params: []
- id: background_color_green
  label: Background Color Green
  kind: action
  command: "~XX104 4\r"
  params: []
- id: background_color_white
  label: Background Color White
  kind: action
  command: "~XX104 5\r"
  params: []
- id: advanced_direct_power_on_on
  label: Advanced Direct Power On On
  kind: action
  command: "~XX105 1\r"
  params: []
- id: advanced_direct_power_on_off
  label: Advanced Direct Power On Off
  kind: action
  command: "~XX105 0\r"
  params: []
- id: auto_power_off_min
  label: Auto Power Off (min)
  kind: action
  command: "~XX106 {n}\r"
  params:
    - name: n
      type: integer
      description: "0 to 180, step=1"
- id: sleep_timer_min
  label: Sleep Timer (min)
  kind: action
  command: "~XX107 {n}\r"
  params:
    - name: n
      type: integer
      description: "0 to 995, step=5"
- id: power_mode_standby_eco
  label: Power Mode (Standby) Eco (<=1W)
  kind: action
  command: "~XX114 1\r"
  params: []
- id: power_mode_standby_active
  label: Power Mode (Standby) Active
  kind: action
  command: "~XX114 0\r"
  params: []
- id: lamp_reminder_on
  label: Lamp Reminder On
  kind: action
  command: "~XX109 1\r"
  params: []
- id: lamp_reminder_off
  label: Lamp Reminder Off
  kind: action
  command: "~XX109 0\r"
  params: []
- id: brightness_mode_bright
  label: Brightness Mode Bright
  kind: action
  command: "~XX110 1\r"
  params: []
- id: brightness_mode_std
  label: Brightness Mode STD
  kind: action
  command: "~XX110 0\r"
  params: []
- id: lamp_reset_yes
  label: Lamp Reset Yes
  kind: action
  command: "~XX111 1\r"
  params: []
- id: lamp_reset_no
  label: Lamp Reset No
  kind: action
  command: "~XX111 0\r"
  params: []
- id: reset_yes
  label: Reset Yes
  kind: action
  command: "~XX112 1\r"
  params: []
- id: osd_message
  label: Display message on the OSD
  kind: action
  command: "~XX210 {n}\r"
  params:
    - name: n
      type: string
      description: "1-30 characters"
- id: query_input_source
  label: Query Input Source
  kind: query
  command: "~XX121 1\r"
  params: []
- id: query_software_version
  label: Query Software Version
  kind: query
  command: "~XX122 1\r"
  params: []
- id: query_display_mode
  label: Query Display Mode
  kind: query
  command: "~XX123 1\r"
  params: []
- id: query_power_state
  label: Query Power State
  kind: query
  command: "~XX124 1\r"
  params: []
- id: query_brightness
  label: Query Brightness
  kind: query
  command: "~XX125 1\r"
  params: []
- id: query_contrast
  label: Query Contrast
  kind: query
  command: "~XX126 1\r"
  params: []
- id: query_aspect_ratio
  label: Query Aspect Ratio
  kind: query
  command: "~XX127 1\r"
  params: []
- id: query_color_temperature
  label: Query Color Temperature
  kind: query
  command: "~XX128 1\r"
  params: []
- id: query_projection_mode
  label: Query Projection Mode
  kind: query
  command: "~XX129 1\r"
  params: []
- id: query_information
  label: Query Information
  kind: query
  command: "~XX150 1\r"
  params: []
- id: query_model_name
  label: Query Model name
  kind: query
  command: "~XX151 1\r"
  params: []
- id: query_lamp_hours
  label: Query Lamp Hours
  kind: query
  command: "~XX108 1\r"
  params: []
- id: query_cumulative_lamp_hours
  label: Query Cumulative Lamp Hours
  kind: query
  command: "~XX108 2\r"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
- id: input_source
  type: enum
  values: [none, vga1, vga2, svideo, video, hdmi, hdmi2, bnc]
- id: display_mode
  type: enum
  values: [none, presentation, bright, movie, srgb, user, blackboard, classroom, user2]
- id: aspect_ratio
  type: enum
  values: ["4:3", "16:9", "16:10", lbx, native, auto]
- id: color_temperature
  type: enum
  values: [warm, medium, cold]
- id: projection_mode
  type: enum
  values: [front_desktop, rear_desktop, front_ceiling, rear_ceiling]
- id: software_version
  type: string
  description: "FW version, returned as OKdddd"
- id: lamp_hours
  type: integer
  description: "OKbbbb (4 digits)"
- id: cumulative_lamp_hours
  type: integer
  description: "OKbbbbb (5 digits)"
- id: ack_pass
  type: string
  description: "Projector return (Pass): P"
- id: ack_fail
  type: string
  description: "Projector return (Fail): F"
- id: system_status
  type: enum
  values: [standby, warming, cooling, out_of_range, lamp_fail, fan_lock, over_temperature, lamp_hours_running_out]
```

## Variables
```yaml
- id: projector_id
  type: integer
  description: "0-99; 00 = all projectors"
- id: power_on_password
  type: string
  description: "4-digit password ~0000 to ~9999, required by ~XX00 1 ~nnnn"
- id: user_password
  type: string
  description: "Web UI user password, max 15 characters"
- id: admin_password
  type: string
  description: "Web UI admin password, max 15 characters"
```

## Events
```yaml
- id: info_event
  description: "Unsolicited INFOn status (n: 0/1/2/3/4/6/7/8 = Standby/Warming/Cooling/Out of Range/Lamp fail/Fan Lock/Over Temperature/Lamp Hours Running Out)"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
All commands use ASCII prefix `~XX` (XX = projector ID, 00-99, 00 broadcasts to all) and terminate with `<CR>` (0x0D). HEX column in source is the byte-level equivalent. UART16550 FIFO: Disable. A `Power ON with Password` variant exists (`~XX00 1 ~nnnn`) supplying a 4-digit password; this is a per-command credential, not a session login. Web UI exposes User and Admin passwords (max 15 chars) plus Crestron control fields (IP 15 chars, IP ID 2 chars, Port 5 chars), but the network control port number and base URL are not stated in this document. Power Mode (Standby) = Eco disables VGA-out and RJ45 while in standby.

<!-- UNRESOLVED: TCP port for network/web control not stated; HTTP base URL not stated; firmware version compatibility not stated; UART16550 FIFO disable and any RS-232 handshake/recovery sequences not stated -->

## Provenance

```yaml
source_domains:
  - optomaeurope.com
  - region-resource.optoma.com
source_urls:
  - https://www.optomaeurope.com/ContentStorage/Documents/731aa26e-4842-4414-999a-422879b17cee.pdf
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
retrieved_at: 2026-06-02T03:46:41.702Z
last_checked_at: 2026-06-02T10:14:08.590Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T10:14:08.590Z
matched_actions: 165
action_count: 165
confidence: medium
summary: "All 165 spec actions matched exactly to source ASCII commands with correct parameters; transport values confirmed; bidirectional coverage is 1:1. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP port for network/web control not stated in source; firmware version not stated; HTTP base URL for web UI not stated"
- "no multi-step sequences described in source"
- "TCP port for network/web control not stated; HTTP base URL not stated; firmware version compatibility not stated; UART16550 FIFO disable and any RS-232 handshake/recovery sequences not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
