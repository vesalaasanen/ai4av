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
source_urls:
  - https://www.optomaeurope.com/ContentStorage/Documents/731aa26e-4842-4414-999a-422879b17cee.pdf
retrieved_at: 2026-05-02T12:10:27.190Z
last_checked_at: 2026-05-14T18:17:19.549Z
generated_at: 2026-05-14T18:17:19.549Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:19.549Z
  matched_actions: 162
  action_count: 162
  confidence: high
  summary: "All 164 spec actions matched their source command equivalents; transport parameters verified against RS-232 protocol specification."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Optoma EH7500 Control Spec

## Summary
Optoma EH7500 is a professional projector supporting RS-232 serial control and TCP/IP web-based control. RS-232 uses 9600 baud, 8 data bits, no parity, 1 stop bit, with ASCII command format terminated by <CR>. TCP/IP provides a web interface for configuration and Crestron integration. No authentication is required for serial control; web interface supports password configuration but no default is stated.

<!-- UNRESOLVED: TCP port number for web control not stated in source -->
<!-- UNRESOLVED: default admin/user password for web control not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure for RS-232 in source
```

## Traits
```yaml
- powerable
- queryable
- routable
- levelable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: power_on_with_password
  label: Power On with Password
  kind: action
  params:
    - name: password
      type: integer
      description: Password value (~0000 to ~9999 encoded as 7E 30 30 30 30 to 7E 39 39 39 39)

- id: resync
  label: Resync
  kind: action
  params: []

- id: av_mute_on
  label: AV Mute On
  kind: action
  params: []

- id: av_mute_off
  label: AV Mute Off
  kind: action
  params: []

- id: freeze
  label: Freeze
  kind: action
  params: []

- id: unfreeze
  label: Unfreeze
  kind: action
  params: []

- id: zoom_plus
  label: Zoom Plus
  kind: action
  params: []

- id: zoom_minus
  label: Zoom Minus
  kind: action
  params: []

- id: pan_up
  label: Up (Pan under zoom)
  kind: action
  params: []

- id: pan_down
  label: Down (Pan under zoom)
  kind: action
  params: []

- id: pan_left
  label: Left (Pan under zoom)
  kind: action
  params: []

- id: pan_right
  label: Right (Pan under zoom)
  kind: action
  params: []

- id: direct_source_hdmi
  label: Direct Source Command HDMI
  kind: action
  params: []

- id: direct_source_hdmi2
  label: Direct Source Command HDMI 2
  kind: action
  params: []

- id: direct_source_bnc
  label: Direct Source Command BNC
  kind: action
  params: []

- id: direct_source_vga1
  label: Direct Source Command VGA 1
  kind: action
  params: []

- id: direct_source_vga2
  label: Direct Source Command VGA 2
  kind: action
  params: []

- id: direct_source_svideo
  label: Direct Source Command S-Video
  kind: action
  params: []

- id: direct_source_video
  label: Direct Source Command Video
  kind: action
  params: []

- id: direct_source_component_rca
  label: Direct Source Command Component RCA
  kind: action
  params: []

- id: display_mode_presentation
  label: Display Mode Presentation
  kind: action
  params: []

- id: display_mode_bright
  label: Display Mode Bright
  kind: action
  params: []

- id: display_mode_movie
  label: Display Mode Movie
  kind: action
  params: []

- id: display_mode_srgb
  label: Display Mode sRGB
  kind: action
  params: []

- id: display_mode_user1
  label: Display Mode User1
  kind: action
  params: []

- id: display_mode_user2
  label: Display Mode User2
  kind: action
  params: []

- id: display_mode_blackboard
  label: Display Mode Blackboard
  kind: action
  params: []

- id: display_mode_classroom
  label: Display Mode Classroom
  kind: action
  params: []

- id: brightness_set
  label: Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: contrast_set
  label: Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: sharpness_set
  label: Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: 1 to 15

- id: color_red_gain_set
  label: Color Red Gain
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_green_gain_set
  label: Color Green Gain
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_blue_gain_set
  label: Color Blue Gain
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_red_bias_set
  label: Color Red Bias
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_green_bias_set
  label: Color Green Bias
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_blue_bias_set
  label: Color Blue Bias
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_cyan_set
  label: Color Cyan
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_yellow_set
  label: Color Yellow
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_magenta_set
  label: Color Magenta
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: color_reset
  label: Color Reset
  kind: action
  params: []

- id: brilliantcolor_set
  label: BrilliantColor
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 10

- id: degamma_film
  label: Degamma Film
  kind: action
  params: []

- id: degamma_video
  label: Degamma Video
  kind: action
  params: []

- id: degamma_graphics
  label: Degamma Graphics
  kind: action
  params: []

- id: degamma_pc
  label: Degamma PC
  kind: action
  params: []

- id: color_temp_warm
  label: Color Temp. Warm
  kind: action
  params: []

- id: color_temp_medium
  label: Color Temp. Medium
  kind: action
  params: []

- id: color_temp_cold
  label: Color Temp. Cold
  kind: action
  params: []

- id: color_space_auto
  label: Color Space Auto
  kind: action
  params: []

- id: color_space_rgb
  label: Color Space RGB
  kind: action
  params: []

- id: color_space_yuv
  label: Color Space YUV
  kind: action
  params: []

- id: image_ai_on
  label: Image AI On
  kind: action
  params: []

- id: image_ai_off
  label: Image AI Off
  kind: action
  params: []

- id: tint_set
  label: Tint
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 100

- id: saturation_set
  label: Color (Saturation)
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 100

- id: format_4_3
  label: Format 4:3
  kind: action
  params: []

- id: format_16_9
  label: Format 16:9
  kind: action
  params: []

- id: format_16_10
  label: Format 16:10
  kind: action
  params: []

- id: format_lbx
  label: Format LBX
  kind: action
  params: []

- id: format_native
  label: Format Native
  kind: action
  params: []

- id: format_auto
  label: Format AUTO
  kind: action
  params: []

- id: overscan_set
  label: Overscan
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 10

- id: zoom_set
  label: Zoom
  kind: action
  params:
    - name: value
      type: integer
      description: -5 to 25

- id: h_image_shift_set
  label: H Image Shift
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: v_image_shift_set
  label: V Image Shift
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to 50

- id: v_keystone_set
  label: V Keystone
  kind: action
  params:
    - name: value
      type: integer
      description: -40 to 40

- id: auto_keystone_on
  label: Auto Keystone On
  kind: action
  params: []

- id: auto_keystone_off
  label: Auto Keystone Off
  kind: action
  params: []

- id: language_english
  label: Language English
  kind: action
  params: []

- id: language_german
  label: Language German
  kind: action
  params: []

- id: language_french
  label: Language French
  kind: action
  params: []

- id: language_italian
  label: Language Italian
  kind: action
  params: []

- id: language_spanish
  label: Language Spanish
  kind: action
  params: []

- id: language_portuguese
  label: Language Portuguese
  kind: action
  params: []

- id: language_polish
  label: Language Polish
  kind: action
  params: []

- id: language_dutch
  label: Language Dutch
  kind: action
  params: []

- id: language_swedish
  label: Language Swedish
  kind: action
  params: []

- id: language_norwegian_danish
  label: Language Norwegian/Danish
  kind: action
  params: []

- id: language_finnish
  label: Language Finnish
  kind: action
  params: []

- id: language_greek
  label: Language Greek
  kind: action
  params: []

- id: language_traditional_chinese
  label: Language Traditional Chinese
  kind: action
  params: []

- id: language_simplified_chinese
  label: Language Simplified Chinese
  kind: action
  params: []

- id: language_japanese
  label: Language Japanese
  kind: action
  params: []

- id: language_korean
  label: Language Korean
  kind: action
  params: []

- id: language_russian
  label: Language Russian
  kind: action
  params: []

- id: language_hungarian
  label: Language Hungarian
  kind: action
  params: []

- id: language_czechoslovak
  label: Language Czechoslovak
  kind: action
  params: []

- id: language_arabic
  label: Language Arabic
  kind: action
  params: []

- id: language_thai
  label: Language Thai
  kind: action
  params: []

- id: language_turkish
  label: Language Turkish
  kind: action
  params: []

- id: language_farsi
  label: Language Farsi
  kind: action
  params: []

- id: projection_front_desktop
  label: Projection Front-Desktop
  kind: action
  params: []

- id: projection_rear_desktop
  label: Projection Rear-Desktop
  kind: action
  params: []

- id: projection_front_ceiling
  label: Projection Front-Ceiling
  kind: action
  params: []

- id: projection_rear_ceiling
  label: Projection Rear-Ceiling
  kind: action
  params: []

- id: menu_location_top_left
  label: Menu Location Top Left
  kind: action
  params: []

- id: menu_location_top_right
  label: Menu Location Top Right
  kind: action
  params: []

- id: menu_location_centre
  label: Menu Location Centre
  kind: action
  params: []

- id: menu_location_bottom_left
  label: Menu Location Bottom Left
  kind: action
  params: []

- id: menu_location_bottom_right
  label: Menu Location Bottom Right
  kind: action
  params: []

- id: screen_type_16_10
  label: Screen Type 16:10
  kind: action
  params: []

- id: screen_type_16_9
  label: Screen Type 16:9
  kind: action
  params: []

- id: signal_automatic_on
  label: Signal Automatic On
  kind: action
  params: []

- id: signal_automatic_off
  label: Signal Automatic Off
  kind: action
  params: []

- id: frequency_set
  label: Frequency
  kind: action
  params:
    - name: value
      type: integer
      description: -5 to 5

- id: phase_set
  label: Phase
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 31

- id: h_position_set
  label: H. Position
  kind: action
  params:
    - name: value
      type: integer
      description: -5 to 5

- id: v_position_set
  label: V. Position
  kind: action
  params:
    - name: value
      type: integer
      description: -5 to 5

- id: security_timer_set
  label: Security Timer Month/Day/Hour
  kind: action
  params:
    - name: mm
      type: integer
      description: Month 00-12
    - name: dd
      type: integer
      description: Day 00-30
    - name: hh
      type: integer
      description: Hour 00-24

- id: security_on
  label: Security On
  kind: action
  params: []

- id: security_off
  label: Security Off
  kind: action
  params: []

- id: projector_id_set
  label: Projector ID
  kind: action
  params:
    - name: value
      type: integer
      description: 00 to 99

- id: mute_on
  label: Mute On
  kind: action
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  params: []

- id: volume_set
  label: Volume
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 10

- id: logo_optoma
  label: Logo Optoma
  kind: action
  params: []

- id: logo_user
  label: Logo User
  kind: action
  params: []

- id: logo_capture
  label: Logo Capture
  kind: action
  params: []

- id: closed_captioning_off
  label: Closed Captioning Off
  kind: action
  params: []

- id: closed_captioning_cc1
  label: Closed Captioning cc1
  kind: action
  params: []

- id: closed_captioning_cc2
  label: Closed Captioning cc2
  kind: action
  params: []

- id: source_lock_on
  label: Source Lock On
  kind: action
  params: []

- id: source_lock_off
  label: Source Lock Off
  kind: action
  params: []

- id: next_source
  label: Next Source
  kind: action
  params: []

- id: high_altitude_on
  label: High Altitude On
  kind: action
  params: []

- id: high_altitude_off
  label: High Altitude Off
  kind: action
  params: []

- id: information_hide_on
  label: Information Hide On
  kind: action
  params: []

- id: information_hide_off
  label: Information Hide Off
  kind: action
  params: []

- id: keypad_lock_on
  label: Keypad Lock On
  kind: action
  params: []

- id: keypad_lock_off
  label: Keypad Lock Off
  kind: action
  params: []

- id: background_color_blue
  label: Background Color Blue
  kind: action
  params: []

- id: background_color_black
  label: Background Color Black
  kind: action
  params: []

- id: background_color_red
  label: Background Color Red
  kind: action
  params: []

- id: background_color_green
  label: Background Color Green
  kind: action
  params: []

- id: background_color_white
  label: Background Color White
  kind: action
  params: []

- id: direct_power_on_on
  label: Advanced Direct Power On On
  kind: action
  params: []

- id: direct_power_on_off
  label: Advanced Direct Power On Off
  kind: action
  params: []

- id: auto_power_off_set
  label: Auto Power Off (min)
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 180 minutes

- id: sleep_timer_set
  label: Sleep Timer (min)
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 995 minutes (step 5)

- id: power_mode_eco
  label: Power Mode (Standby) Eco (<=1W)
  kind: action
  params: []

- id: power_mode_active
  label: Power Mode (Standby) Active
  kind: action
  params: []

- id: lamp_reminder_on
  label: Lamp Reminder On
  kind: action
  params: []

- id: lamp_reminder_off
  label: Lamp Reminder Off
  kind: action
  params: []

- id: brightness_mode_bright
  label: Brightness Mode Bright
  kind: action
  params: []

- id: brightness_mode_std
  label: Brightness Mode STD
  kind: action
  params: []

- id: lamp_reset_yes
  label: Lamp Reset Yes
  kind: action
  params: []

- id: lamp_reset_no
  label: Lamp Reset No
  kind: action
  params: []

- id: reset_yes
  label: Reset Yes
  kind: action
  params: []

- id: display_message
  label: Display message on the OSD
  kind: action
  params:
    - name: message
      type: string
      description: 1-30 characters
- id: query_input_source
  label: Query Input Source
  kind: query
  params: []

- id: query_software_version
  label: Query Software Version
  kind: query
  params: []

- id: query_display_mode
  label: Query Display Mode
  kind: query
  params: []

- id: query_power_state
  label: Query Power State
  kind: query
  params: []

- id: query_brightness
  label: Query Brightness
  kind: query
  params: []

- id: query_contrast
  label: Query Contrast
  kind: query
  params: []

- id: query_aspect_ratio
  label: Query Aspect Ratio
  kind: query
  params: []

- id: query_color_temperature
  label: Query Color Temperature
  kind: query
  params: []

- id: query_projection_mode
  label: Query Projection Mode
  kind: query
  params: []

- id: query_information
  label: Query Full Information
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: projector_response_pass
  label: Projector Return (Pass)
  type: string
  values:
    - P

- id: projector_response_fail
  label: Projector Return (Fail)
  type: string
  values:
    - F

- id: system_status_event
  label: System status
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
    - "4"
    - "6"
    - "7"
    - "8"
  description: 0=Standby, 1=Warming, 2=Cooling, 3=Out of Range, 4=Lamp fail, 6=Fan Lock, 7=Over Temperature, 8=Lamp Hours Running Out

- id: input_source_status
  label: Input Source
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
    - "4"
    - "5"
    - "6"
    - "7"
  description: 0=None, 1=VGA1, 2=VGA2, 3=S-Video, 4=Video, 5=HDMI, 6=HDMI2, 7=BNC

- id: software_version_status
  label: Software Version
  type: string
  description: Returns OKdddd where dddd is FW version

- id: display_mode_status
  label: Display Mode
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
    - "4"
    - "5"
    - "6"
    - "7"
    - "8"
  description: 0=None, 1=Presentation, 2=Bright, 3=Movie, 4=sRGB, 5=User, 6=Blackboard, 7=Classroom, 8=User2

- id: power_state_status
  label: Power State
  type: enum
  values:
    - "0"
    - "1"
  description: 0=Off, 1=On

- id: brightness_status
  label: Brightness
  type: integer

- id: contrast_status
  label: Contrast
  type: integer

- id: aspect_ratio_status
  label: Aspect Ratio
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
    - "4"
  description: 0=4:3, 1=16:9 or 16:10, 2=LBX, 3=Native, 4=AUTO

- id: color_temperature_status
  label: Color Temperature
  type: enum
  values:
    - "0"
    - "1"
    - "2"
  description: 0=Warm, 1=Medium, 2=Cold

- id: projection_mode_status
  label: Projection Mode
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
  description: 0=Front-Desktop, 1=Rear-Desktop, 2=Front-Ceiling, 3=Rear-Ceiling

- id: information_status
  label: Information
  type: string
  description: Returns OKabbbbccdddde where a=power, bbbb=lamp hours, cc=source, dddd=fw version, e=display mode

- id: model_name_status
  label: Model name
  type: string
  description: Returns OKn where n=10 for EH7500

- id: lamp_hours_status
  label: Lamp Hours
  type: integer
  description: Returns OKbbbb lamp hours (4 digits)

- id: lamp_hours_cumulative_status
  label: Cumulative Lamp Hours
  type: integer
  description: Returns OKbbbbb total lamp hours (5 digits)
```

## Variables
```yaml
# All settable parameters that can be queried via READ commands
# See Feedbacks section for query operations
```

## Events
```yaml
- id: system_status_changed
  label: System Status Changed
  description: Projector automatically sends system status when state changes. Format INFOn where n=0/1/2/3/4/6/7/8 (Standby/Warming/Cooling/Out of Range/Lamp fail/Fan Lock/Over Temperature/Lamp Hours Running Out)
```

## Macros
```yaml
# No explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
Projector ID (XX) in commands ranges from 00-99; XX=00 broadcasts to all projectors. All commands terminate with <CR> (0x0D). Serial responses are single character: P (pass) or F (fail). Web interface supports Crestron control integration with configurable IP ID and port. When Power Mode (Standby) is set to Eco (<=1W), VGA-out and RJ45 functions are disabled during standby.
<!-- UNRESOLVED: TCP port number for web control not stated in source -->
<!-- UNRESOLVED: default admin/user password for web interface not stated in source -->
<!-- UNRESOLVED: Eco mode voltage/power specifications not stated in source -->

## Provenance

```yaml
source_domains:
  - optomaeurope.com
source_urls:
  - https://www.optomaeurope.com/ContentStorage/Documents/731aa26e-4842-4414-999a-422879b17cee.pdf
retrieved_at: 2026-05-02T12:10:27.190Z
last_checked_at: 2026-05-14T18:17:19.549Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:19.549Z
matched_actions: 162
action_count: 162
confidence: high
summary: "All 164 spec actions matched their source command equivalents; transport parameters verified against RS-232 protocol specification."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
