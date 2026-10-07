---
spec_id: admin/optoma-uhd-suhd-series-x-a-1-0-3-0
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma UHD SUHD Series Control Spec"
manufacturer: Optoma
model_family: "UHD SUHD Series X A 1 0 3 0"
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - "UHD SUHD Series X A 1 0 3 0"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - optoma.co.uk
  - region-resource.optoma.com
  - optomaeurope.com
source_urls:
  - https://www.optoma.co.uk/uploads/RS232/EW628-RS232-en-GB.pdf
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
  - https://region-resource.optoma.com/products/import/Documents/471bc1d6-63f6-4825-aeef-2414e9cc5f99.pdf
  - https://www.optomaeurope.com/ContentStorage/Documents/731aa26e-4842-4414-999a-422879b17cee.pdf
retrieved_at: 2026-05-18T20:10:53.487Z
last_checked_at: 2026-10-01T07:29:46.649Z
generated_at: 2026-10-01T07:29:46.649Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific model variants within UHD/SUHD series not enumerated in source"
  - "TCP/IP control not mentioned — unclear if these models support network control"
  - "~XX36 has dual definitions in source (Image AI vs Color Temp) and ~XX61 has dual definitions (PC Mode vs Overscan) — collision not resolved by source"
  - "no multi-step sequences described in source"
  - "minimum cooldown period before re-powering not stated in source"
  - "lamp interlock requirements not stated in source"
  - "firmware version compatibility not stated in source"
  - "command timing / inter-command delay not stated"
  - "maximum command string length not stated"
  - "whether TCP/IP control is available in addition to RS-232"
verification:
  verdict: verified
  checked_at: 2026-10-01T07:29:46.649Z
  matched_actions: 110
  action_count: 110
  confidence: medium
  summary: "All 110 spec actions match source commands verbatim; transport parameters (9600/8/N/1/None) and 76 distinct source opcodes fully represented. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-18
---

# Optoma UHD SUHD Series Control Spec

## Summary
Optoma UHD/SUHD series projector controlled via RS-232 serial. Supports power on/off, input source selection, image adjustments (brightness, contrast, sharpness, color, keystone), display modes, volume, lamp management, and query feedback. Command format: `~XXCC V\r` where XX is projector ID (00-99), CC is command code, V is value.

<!-- UNRESOLVED: specific model variants within UHD/SUHD series not enumerated in source -->
<!-- UNRESOLVED: TCP/IP control not mentioned — unclear if these models support network control -->
<!-- UNRESOLVED: ~XX36 has dual definitions in source (Image AI vs Color Temp) and ~XX61 has dual definitions (PC Mode vs Overscan) — collision not resolved by source -->

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
  type: UNRESOLVED  # source does not describe an authentication procedure; left as UNRESOLVED rather than inferring none
```

## Traits
```yaml
traits:
  - powerable    # inferred from power on/off commands
  - queryable    # inferred from read/query commands
  - levelable    # inferred from brightness, contrast, volume controls
  - routable     # inferred from input source selection commands
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "~XX00 1"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "~XX00 2"
    params: []

  - id: resync
    label: Resync
    kind: action
    command: "~XX01 1"
    params: []

  - id: av_mute
    label: AV Mute
    kind: action
    command: "~XX02 1"
    params: []

  - id: av_unmute
    label: AV Unmute
    kind: action
    command: "~XX02 2"
    params: []

  - id: mute_on
    label: Mute On
    kind: action
    command: "~XX03 1"
    params: []

  - id: mute_off
    label: Mute Off
    kind: action
    command: "~XX03 2"
    params: []

  - id: freeze
    label: Freeze
    kind: action
    command: "~XX04 1"
    params: []

  - id: unfreeze
    label: Unfreeze
    kind: action
    command: "~XX04 2"
    params: []

  - id: zoom_plus
    label: Zoom Plus
    kind: action
    command: "~XX05 1"
    params: []

  - id: zoom_minus
    label: Zoom Minus
    kind: action
    command: "~XX06 1"
    params: []

  - id: pan_up
    label: Pan Up
    kind: action
    command: "~XX07 1"
    description: Pan under zoom mode
    params: []

  - id: pan_down
    label: Pan Down
    kind: action
    command: "~XX08 1"
    description: Pan under zoom mode
    params: []

  - id: pan_left
    label: Pan Left
    kind: action
    command: "~XX09 1"
    description: Pan under zoom mode
    params: []

  - id: pan_right
    label: Pan Right
    kind: action
    command: "~XX10 1"
    description: Pan under zoom mode
    params: []

  - id: select_source
    label: Direct Source Selection
    kind: action
    command: "~XX12 {source}"
    params:
      - name: source
        type: enum
        values:
          - value: "2"
            label: DVI-D
          - value: "3"
            label: DVI-A
          - value: "7"
            label: VGA / VGA 1 SCART
          - value: "8"
            label: VGA 1 Component
          - value: "9"
            label: S-Video
          - value: "10"
            label: Video

  - id: display_mode
    label: Display Mode
    kind: action
    command: "~XX20 {mode}"
    params:
      - name: mode
        type: enum
        values:
          - value: "1"
            label: Presentation
          - value: "2"
            label: Bright
          - value: "3"
            label: Movie
          - value: "4"
            label: sRGB
          - value: "5"
            label: User 1

  - id: set_brightness
    label: Set Brightness
    kind: action
    command: "~XX21 {value}"
    params:
      - name: value
        type: integer
        min: -50
        max: 50
        description: Brightness level (-50 to +50)

  - id: set_contrast
    label: Set Contrast
    kind: action
    command: "~XX22 {value}"
    params:
      - name: value
        type: integer
        min: -50
        max: 50
        description: Contrast level (-50 to +50)

  - id: set_sharpness
    label: Set Sharpness
    kind: action
    command: "~XX23 {value}"
    params:
      - name: value
        type: integer
        min: -50
        max: 50
        description: Sharpness level (-50 to +50)

  - id: set_red_gain
    label: Set Red Gain
    kind: action
    command: "~XX24 {value}"
    params:
      - name: value
        type: integer
        min: -50
        max: 50

  - id: set_green_gain
    label: Set Green Gain
    kind: action
    command: "~XX25 {value}"
    params:
      - name: value
        type: integer
        min: -50
        max: 50

  - id: set_blue_gain
    label: Set Blue Gain
    kind: action
    command: "~XX26 {value}"
    params:
      - name: value
        type: integer
        min: -50
        max: 50

  - id: set_red_bias
    label: Set Red Bias
    kind: action
    command: "~XX27 {value}"
    params:
      - name: value
        type: integer
        min: -50
        max: 50

  - id: set_green_bias
    label: Set Green Bias
    kind: action
    command: "~XX28 {value}"
    params:
      - name: value
        type: integer
        min: -50
        max: 50

  - id: set_blue_bias
    label: Set Blue Bias
    kind: action
    command: "~XX29 {value}"
    params:
      - name: value
        type: integer
        min: -50
        max: 50

  - id: set_cyan
    label: Set Cyan
    kind: action
    command: "~XX30 {value}"
    params:
      - name: value
        type: integer
        min: -50
        max: 50

  - id: set_yellow
    label: Set Yellow
    kind: action
    command: "~XX31 {value}"
    params:
      - name: value
        type: integer
        min: -50
        max: 50

  - id: set_magenta
    label: Set Magenta
    kind: action
    command: "~XX32 {value}"
    params:
      - name: value
        type: integer
        min: -50
        max: 50

  - id: reset_color
    label: Reset Color
    kind: action
    command: "~XX33 1"
    params: []

  - id: set_white_peaking
    label: Set White Peaking
    kind: action
    command: "~XX34 {value}"
    params:
      - name: value
        type: integer
        min: 0
        max: 10

  - id: set_degamma
    label: Set Degamma
    kind: action
    command: "~XX35 {mode}"
    params:
      - name: mode
        type: enum
        values:
          - value: "1"
            label: Film
          - value: "2"
            label: Video
          - value: "3"
            label: Graphics
          - value: "4"
            label: PC

  - id: image_ai_on
    label: Image AI On
    kind: action
    command: "~XX36 1"
    description: "Source ambiguity: ~XX36 is also defined as Color Temperature with values 1/2/3 — values overlap with Image AI; collision not resolved by source"
    params: []

  - id: image_ai_off
    label: Image AI Off
    kind: action
    command: "~XX36 2"
    description: "Source ambiguity: ~XX36 is also defined as Color Temperature with values 1/2/3 — values overlap with Image AI; collision not resolved by source"
    params: []

  - id: set_color_temperature
    label: Set Color Temperature
    kind: action
    command: "~XX36 {temp}"
    description: "Source ambiguity: ~XX36 is also defined as Image AI (On/Off) with values 1/2; values overlap with Color Temperature; collision not resolved by source"
    params:
      - name: temp
        type: enum
        values:
          - value: "1"
            label: Warm
          - value: "2"
            label: Medium
          - value: "3"
            label: Cold

  - id: set_color_space
    label: Set Color Space
    kind: action
    command: "~XX37 {mode}"
    params:
      - name: mode
        type: enum
        values:
          - value: "1"
            label: Auto
          - value: "2"
            label: RGB
          - value: "3"
            label: YUV

  - id: set_input_source
    label: Set Input Source
    kind: action
    command: "~XX39 {source}"
    description: Alternate input source command (distinct from ~XX12 direct source selection)
    params:
      - name: source
        type: enum
        values:
          - value: "2"
            label: DVI
          - value: "5"
            label: VGA
          - value: "9"
            label: S-Video
          - value: "10"
            label: Video

  - id: set_format
    label: Set Aspect Ratio Format
    kind: action
    command: "~XX60 {format}"
    params:
      - name: format
        type: enum
        values:
          - value: "1"
            label: "4:3"
          - value: "2"
            label: "16:10 / 16:9"
          - value: "5"
            label: LBX
          - value: "6"
            label: Native
          - value: "7"
            label: Auto

  - id: pc_mode_on
    label: PC Mode On
    kind: action
    command: "~XX61 1"
    description: "Source ambiguity: ~XX61 is also defined as Overscan with range 0-12; collision not resolved by source"
    params: []

  - id: pc_mode_off
    label: PC Mode Off
    kind: action
    command: "~XX61 2"
    description: "Source ambiguity: ~XX61 is also defined as Overscan with range 0-12; collision not resolved by source"
    params: []

  - id: set_overscan
    label: Set Overscan
    kind: action
    command: "~XX61 {value}"
    description: "Source ambiguity: ~XX61 is also defined as PC Mode (On/Off); collision not resolved by source"
    params:
      - name: value
        type: integer
        min: 0
        max: 12

  - id: set_zoom
    label: Set Zoom
    kind: action
    command: "~XX62 {value}"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: set_h_image_shift
    label: Set Horizontal Image Shift
    kind: action
    command: "~XX63 {value}"
    params:
      - name: value
        type: integer
        min: -50
        max: 50

  - id: set_v_image_shift
    label: Set Vertical Image Shift
    kind: action
    command: "~XX64 {value}"
    params:
      - name: value
        type: integer
        min: -50
        max: 50

  - id: set_v_keystone
    label: Set Vertical Keystone
    kind: action
    command: "~XX66 {value}"
    params:
      - name: value
        type: integer
        min: -20
        max: 20

  - id: set_language
    label: Set Language
    kind: action
    command: "~XX70 {lang}"
    params:
      - name: lang
        type: enum
        values:
          - value: "1"
            label: English
          - value: "2"
            label: German
          - value: "3"
            label: French
          - value: "4"
            label: Italian
          - value: "5"
            label: Spanish
          - value: "6"
            label: Portuguese
          - value: "7"
            label: Polish
          - value: "8"
            label: Dutch
          - value: "9"
            label: Swedish
          - value: "10"
            label: Norwegian/Danish
          - value: "11"
            label: Finnish
          - value: "12"
            label: Greek
          - value: "13"
            label: Traditional Chinese
          - value: "14"
            label: Simplified Chinese
          - value: "15"
            label: Japanese
          - value: "16"
            label: Korean
          - value: "17"
            label: Russian
          - value: "18"
            label: Hungarian
          - value: "19"
            label: Czech
          - value: "20"
            label: Arabic
          - value: "21"
            label: Thai

  - id: set_projection
    label: Set Projection Mode
    kind: action
    command: "~XX71 {mode}"
    params:
      - name: mode
        type: enum
        values:
          - value: "1"
            label: Front-Desktop
          - value: "2"
            label: Rear-Desktop
          - value: "3"
            label: Front-Ceiling
          - value: "4"
            label: Rear-Ceiling

  - id: set_menu_location
    label: Set Menu Location
    kind: action
    command: "~XX72 {location}"
    params:
      - name: location
        type: enum
        values:
          - value: "1"
            label: Top Left
          - value: "2"
            label: Top Right
          - value: "3"
            label: Centre
          - value: "4"
            label: Bottom Left
          - value: "5"
            label: Bottom Right

  - id: set_signal_frequency
    label: Set Signal Frequency
    kind: action
    command: "~XX73 {value}"
    params:
      - name: value
        type: integer
        min: -5
        max: 5

  - id: set_signal_phase
    label: Set Signal Phase
    kind: action
    command: "~XX74 {value}"
    params:
      - name: value
        type: integer
        min: 0
        max: 31

  - id: set_h_position
    label: Set Horizontal Position
    kind: action
    command: "~XX75 {value}"
    params:
      - name: value
        type: integer
        min: -5
        max: 5

  - id: set_v_position
    label: Set Vertical Position
    kind: action
    command: "~XX76 {value}"
    params:
      - name: value
        type: integer
        min: -5
        max: 5

  - id: set_security_timer
    label: Set Security Timer
    kind: action
    command: "~XX77 {value}"
    description: "Format: Month/Day/Hour as nnnnnn"
    params:
      - name: value
        type: string
        description: "Security timer value as MMDDHH"

  - id: security_on
    label: Security Settings On
    kind: action
    command: "~XX78 1"
    params: []

  - id: security_off
    label: Security Settings Off
    kind: action
    command: "~XX78 2"
    params: []

  - id: set_projector_id
    label: Set Projector ID
    kind: action
    command: "~XX79 {id}"
    params:
      - name: id
        type: integer
        min: 0
        max: 99

  - id: mute_on_alt
    label: Mute On (Alt)
    kind: action
    command: "~XX80 1"
    params: []

  - id: mute_off_alt
    label: Mute Off (Alt)
    kind: action
    command: "~XX80 2"
    params: []

  - id: set_volume
    label: Set Volume
    kind: action
    command: "~XX81 {value}"
    params:
      - name: value
        type: integer
        min: 0
        max: 15

  - id: startup_logo_on
    label: Start Up Logo On
    kind: action
    command: "~XX82 1"
    params: []

  - id: startup_logo_off
    label: Start Up Logo Off
    kind: action
    command: "~XX82 2"
    params: []

  - id: set_screen_type
    label: Set Screen Type
    kind: action
    command: "~XX83 {type}"
    params:
      - name: type
        type: enum
        values:
          - value: "1"
            label: "16:10"
          - value: "2"
            label: "16:9"

  - id: source_lock_on
    label: Source Lock On
    kind: action
    command: "~XX100 1"
    params: []

  - id: source_lock_off
    label: Source Lock Off
    kind: action
    command: "~XX100 2"
    params: []

  - id: high_altitude_on
    label: High Altitude On
    kind: action
    command: "~XX101 1"
    params: []

  - id: high_altitude_off
    label: High Altitude Off
    kind: action
    command: "~XX101 2"
    params: []

  - id: information_hide_on
    label: Information Hide On
    kind: action
    command: "~XX102 1"
    params: []

  - id: information_hide_off
    label: Information Hide Off
    kind: action
    command: "~XX102 2"
    params: []

  - id: keypad_lock_on
    label: Keypad Lock On
    kind: action
    command: "~XX103 1"
    params: []

  - id: keypad_lock_off
    label: Keypad Lock Off
    kind: action
    command: "~XX103 2"
    params: []

  - id: set_background_color
    label: Set Background Color
    kind: action
    command: "~XX104 {color}"
    params:
      - name: color
        type: enum
        values:
          - value: "1"
            label: Blue
          - value: "2"
            label: Black

  - id: direct_power_on
    label: Direct Power On
    kind: action
    command: "~XX105 1"
    params: []

  - id: direct_power_off
    label: Direct Power Off
    kind: action
    command: "~XX105 2"
    params: []

  - id: set_auto_power_off
    label: Set Auto Power Off
    kind: action
    command: "~XX106 {minutes}"
    params:
      - name: minutes
        type: integer
        min: 0
        max: 180
        description: Auto power off timer in minutes (0 = disabled)

  - id: set_sleep_timer
    label: Set Sleep Timer
    kind: action
    command: "~XX107 {minutes}"
    params:
      - name: minutes
        type: integer
        min: 0
        max: 999
        description: Sleep timer in minutes (0 = disabled)

  - id: read_lamp_hour
    label: Read Lamp Hour
    kind: action
    command: "~XX108 1"
    params: []

  - id: lamp_reminder_on
    label: Lamp Reminder On
    kind: action
    command: "~XX109 1"
    params: []

  - id: lamp_reminder_off
    label: Lamp Reminder Off
    kind: action
    command: "~XX109 2"
    params: []

  - id: set_brightness_mode_bright
    label: Brightness Mode BRIGHT
    kind: action
    command: "~XX110 1"
    params: []

  - id: set_brightness_mode_std
    label: Brightness Mode STD
    kind: action
    command: "~XX110 2"
    params: []

  - id: lamp_reset_yes
    label: Lamp Reset Yes
    kind: action
    command: "~XX111 1"
    params: []

  - id: lamp_reset_no
    label: Lamp Reset No
    kind: action
    command: "~XX111 2"
    params: []

  - id: factory_reset_yes
    label: Factory Reset Yes
    kind: action
    command: "~XX112 1"
    params: []

  - id: factory_reset_no
    label: Factory Reset No
    kind: action
    command: "~XX112 2"
    params: []

  - id: remote_power
    label: Remote - Power
    kind: action
    command: "~XX140 1"
    params: []

  - id: remote_mouse_up
    label: Remote - Mouse Up
    kind: action
    command: "~XX140 3"
    params: []

  - id: remote_mouse_left
    label: Remote - Mouse Left
    kind: action
    command: "~XX140 4"
    params: []

  - id: remote_mouse_enter
    label: Remote - Mouse Enter
    kind: action
    command: "~XX140 5"
    params: []

  - id: remote_mouse_right
    label: Remote - Mouse Right
    kind: action
    command: "~XX140 6"
    params: []

  - id: remote_mouse_down
    label: Remote - Mouse Down
    kind: action
    command: "~XX140 7"
    params: []

  - id: remote_left_click
    label: Remote - Mouse Left Click
    kind: action
    command: "~XX140 8"
    params: []

  - id: remote_right_click
    label: Remote - Mouse Right Click
    kind: action
    command: "~XX140 9"
    params: []

  - id: remote_page_up
    label: Remote - Page Up
    kind: action
    command: "~XX140 10"
    params: []

  - id: remote_source
    label: Remote - Source/Left
    kind: action
    command: "~XX140 11"
    params: []

  - id: remote_menu_enter
    label: Remote - Menu Enter
    kind: action
    command: "~XX140 12"
    params: []

  - id: remote_resync
    label: Remote - Resync/Right
    kind: action
    command: "~XX140 13"
    params: []

  - id: remote_page_down
    label: Remote - Page Down
    kind: action
    command: "~XX140 14"
    params: []

  - id: remote_keystone_plus
    label: Remote - Keystone Plus
    kind: action
    command: "~XX140 15"
    params: []

  - id: remote_keystone_minus
    label: Remote - Keystone Minus
    kind: action
    command: "~XX140 16"
    params: []

  - id: remote_volume_down
    label: Remote - Volume Down
    kind: action
    command: "~XX140 17"
    params: []

  - id: remote_volume_up
    label: Remote - Volume Up
    kind: action
    command: "~XX140 18"
    params: []

  - id: remote_brightness
    label: Remote - Brightness
    kind: action
    command: "~XX140 19"
    params: []

  - id: remote_menu
    label: Remote - Menu
    kind: action
    command: "~XX140 20"
    params: []

  - id: remote_zoom
    label: Remote - Zoom
    kind: action
    command: "~XX140 21"
    params: []

  - id: remote_dvi
    label: Remote - DVI
    kind: action
    command: "~XX140 22"
    params: []

  - id: remote_freeze
    label: Remote - Freeze
    kind: action
    command: "~XX140 23"
    params: []

  - id: remote_av_mute
    label: Remote - AV Mute
    kind: action
    command: "~XX140 24"
    params: []

  - id: remote_svideo
    label: Remote - S-Video
    kind: action
    command: "~XX140 25"
    params: []

  - id: remote_vga
    label: Remote - VGA
    kind: action
    command: "~XX140 26"
    params: []

  - id: remote_video
    label: Remote - Video
    kind: action
    command: "~XX140 27"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: input_source
    label: Input Source Query
    command: "~XX121 1"
    type: string
    description: Returns current input source

  - id: software_version
    label: Software Version Query
    command: "~XX122 1"
    type: string
    description: Returns projector firmware version

  - id: display_mode
    label: Display Mode Query
    command: "~XX123 1"
    type: string
    description: Returns current display mode

  - id: power_state
    label: Power State Query
    command: "~XX124 1"
    type: enum
    values: [on, off]
    description: Returns current power state

  - id: brightness
    label: Brightness Query
    command: "~XX125 1"
    type: integer
    description: Returns current brightness value

  - id: contrast
    label: Contrast Query
    command: "~XX126 1"
    type: integer
    description: Returns current contrast value

  - id: aspect_ratio
    label: Aspect Ratio Query
    command: "~XX127 1"
    type: string
    description: Returns current aspect ratio

  - id: color_temperature
    label: Color Temperature Query
    command: "~XX128 1"
    type: string
    description: Returns current color temperature setting

  - id: projection_mode
    label: Projection Mode Query
    command: "~XX129 1"
    type: string
    description: Returns current projection mode

  - id: information
    label: Full Information Query
    command: "~XX150 1"
    type: string
    description: >
      Returns: OKabbbbccdddde
      a=power(1=On,0=Off), bbbb=lamp hours, cc=source
      (00=None,01=DVID,02=VGA1,03=VGA2,04=S-Video,05=Video),
      dddd=firmware version, e=display mode

  - id: model_name
    label: Model Name Query
    command: "~XX151 1"
    type: string
    description: "Returns model name. Example values: EP721, EP723, EP727, EP728, EW1610"
```

## Variables
```yaml
variables:
  - id: projector_id
    label: Projector ID
    command_set: "~XX79 {value}"
    type: integer
    min: 0
    max: 99
    description: Projector address for RS-232 bus (XX in all commands)

  - id: brightness
    label: Brightness
    command_set: "~XX21 {value}"
    type: integer
    min: -50
    max: 50

  - id: contrast
    label: Contrast
    command_set: "~XX22 {value}"
    type: integer
    min: -50
    max: 50

  - id: sharpness
    label: Sharpness
    command_set: "~XX23 {value}"
    type: integer
    min: -50
    max: 50

  - id: volume
    label: Volume
    command_set: "~XX81 {value}"
    type: integer
    min: 0
    max: 15

  - id: zoom
    label: Zoom
    command_set: "~XX62 {value}"
    type: integer
    min: 0
    max: 100

  - id: v_keystone
    label: Vertical Keystone
    command_set: "~XX66 {value}"
    type: integer
    min: -20
    max: 20

  - id: h_image_shift
    label: Horizontal Image Shift
    command_set: "~XX63 {value}"
    type: integer
    min: -50
    max: 50

  - id: v_image_shift
    label: Vertical Image Shift
    command_set: "~XX64 {value}"
    type: integer
    min: -50
    max: 50

  - id: overscan
    label: Overscan
    command_set: "~XX61 {value}"
    type: integer
    min: 0
    max: 12

  - id: auto_power_off
    label: Auto Power Off
    command_set: "~XX106 {value}"
    type: integer
    min: 0
    max: 180
    unit: minutes

  - id: sleep_timer
    label: Sleep Timer
    command_set: "~XX107 {value}"
    type: integer
    min: 0
    max: 999
    unit: minutes
```

## Events
```yaml
events:
  - id: status_change
    label: Status Change Notification
    description: >
      Projector sends automatically on state change.
      INFOn n: 0=Standby, 1=Warming, 2=Cooling, 3=Out of Range, 4=Lamp Fail
    values: [standby, warming, cooling, out_of_range, lamp_fail]
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset_yes
  - lamp_reset_yes
interlocks: []
# Note: power_off command should include cooldown delay per projector warm/cool cycle.
# UNRESOLVED: minimum cooldown period before re-powering not stated in source
# UNRESOLVED: lamp interlock requirements not stated in source
```

## Notes
- All commands use format `~XXCC V\r` where XX is projector ID (00-99, 00=broadcast to all), CC is command code, V is value.
- Projector returns `P` (pass) or `F` (fail) for sent commands.
- Source shows potential command code collision: ~XX36 used for both Image AI (1/2) and Color Temperature (1/2/3), and ~XX61 used for both PC Mode (1/2) and Overscan (0-12). Verify on actual device.
- Similarly ~XX80 (Mute On/Off) duplicates ~XX03 (Mute On/Off) — may be alternate command set.
- UART16550 FIFO should be disabled per source.
- Remote emulation commands (~XX140) simulate IR remote button presses.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: command timing / inter-command delay not stated -->
<!-- UNRESOLVED: maximum command string length not stated -->
<!-- UNRESOLVED: whether TCP/IP control is available in addition to RS-232 -->

## Provenance

```yaml
source_domains:
  - optoma.co.uk
  - region-resource.optoma.com
  - optomaeurope.com
source_urls:
  - https://www.optoma.co.uk/uploads/RS232/EW628-RS232-en-GB.pdf
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
  - https://region-resource.optoma.com/products/import/Documents/471bc1d6-63f6-4825-aeef-2414e9cc5f99.pdf
  - https://www.optomaeurope.com/ContentStorage/Documents/731aa26e-4842-4414-999a-422879b17cee.pdf
retrieved_at: 2026-05-18T20:10:53.487Z
last_checked_at: 2026-10-01T07:29:46.649Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T07:29:46.649Z
matched_actions: 110
action_count: 110
confidence: medium
summary: "All 110 spec actions match source commands verbatim; transport parameters (9600/8/N/1/None) and 76 distinct source opcodes fully represented. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific model variants within UHD/SUHD series not enumerated in source"
- "TCP/IP control not mentioned — unclear if these models support network control"
- "~XX36 has dual definitions in source (Image AI vs Color Temp) and ~XX61 has dual definitions (PC Mode vs Overscan) — collision not resolved by source"
- "no multi-step sequences described in source"
- "minimum cooldown period before re-powering not stated in source"
- "lamp interlock requirements not stated in source"
- "firmware version compatibility not stated in source"
- "command timing / inter-command delay not stated"
- "maximum command string length not stated"
- "whether TCP/IP control is available in addition to RS-232"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
