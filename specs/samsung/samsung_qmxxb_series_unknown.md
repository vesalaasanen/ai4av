---
spec_id: admin/samsung-qmxxb-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Samsung QMxxB Series Control Spec"
manufacturer: Samsung
model_family: "Samsung QMxxB Series"
aliases: []
compatible_with:
  manufacturers:
    - Samsung
  models:
    - "Samsung QMxxB Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
  - image-us.samsung.com
  - support.justaddpower.com
  - aca.im
  - justaddpower.happyfox.com
source_urls:
  - https://raw.githubusercontent.com/vgavro/samsung-mdc/master/MDC-Protocol.pdf
  - https://image-us.samsung.com/SamsungUS/samsungbusiness/tv-ci-resources/Samsung-RS232-Control.pdf
  - https://support.justaddpower.com/kb/article/245-samsung-rs232-control-rs232c/
  - "https://aca.im/driver_docs/Samsung/MDC%20Protocol%202015%20v13.7c.pdf"
  - https://justaddpower.happyfox.com/kb/article/Samsung-RS232-Codes-RS232C
retrieved_at: 2026-05-14T19:50:54.646Z
last_checked_at: 2026-10-07T22:03:31.924Z
generated_at: 2026-10-07T22:03:31.924Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact QMxxB model variants not enumerated separately in source; source is a generic MDC protocol doc covering many Samsung LFD models"
  - "firmware version compatibility not stated"
  - "orientation codes are not stated in this command section\""
  - "the Command Table additionally lists 0, 1 without meanings\""
  - "prose states 0 ~ 3, but the table lists 0x03 Flashing, 0x04 Flash All, 0x05 Off\""
  - "prose states 0 ~ 3, while the table defines 0x00 Solid, 0x01 Transparent, 0x02 Translucent\""
  - "complete 0x0D field layout is not recoverable from the extracted tables\""
  - "structured list serialization. Type1/Type2 use source/picture-size pairs for Sub Screen1,2 or 1,2,3; Type3 uses source bytes for Sub Screen0,1,2,3. Sources refer to 0x14; picture sizes are 0x09 Full(Screen Fit), 0x20 Original(Aspect Ratio).\""
  - "brightness limit codes are not stated\""
  - "source orientation codes are not stated in this command section\""
  - "PIP orientation codes are not stated in this command section\""
  - "the source reply tables use 0x83 instead of the request subcommand 0x85\""
  - "request table prints data length 0x03e\""
  - "overview calls this XOR Output Activation mode (Set Only), while the detailed section documents Scanning Rate Mode with a query\""
  - "gain range and list serialization. Each command can handle 1~3 Gain data, high byte then low byte. Type1 packs Reset/Module ID/X/Y into Module Info; Type2 sends Module ID and Module Postion separately. Reset with X/Y 0x0F resets the module; all-module reset is 0xff for Type1 or 0xff,0xff for Type2.\""
  - "gain range and list serialization. Each command can handle 1~3 Gain data; Cabinet Gain High and Low carry R/G/B selection and Cabinet Gain Data. Reserved bits can be 0 or 1.\""
  - "correction range and list serialization. Each command can handle 1 or 4 Edge Correction data, high byte then low byte. Type1 packs Module Info; Type2 sends Module ID and Module Edgeinfo separately. Reset bit with Edge Info 0x0F resets all edges of the module; 0xff resets all modules.\""
  - "block ID range, gain range and list serialization. Block ID contains Reset; Reset when data is 1. Block records contain BlockID and RGB gain high/low bytes. 0xff in the Block ID position is the documented reset form.\""
  - "gain range and list serialization. CabinetCC Position precedes Cabinet Gain high/low bytes; 0xff resets Cabinet CC to default.\""
  - "module ID range and list serialization. Repeated Module ID/Edge Info pairs; Edge Info bits are Bottom, Right, Left, Top in bits 3..0; Left is 0x02, Bottom is 0x08. Omitted for Clear.\""
verification:
  verdict: verified
  checked_at: 2026-10-07T22:03:31.924Z
  matched_actions: 219
  action_count: 219
  confidence: medium
  summary: "All 219 action units match source commands with correct opcodes, sub-commands and values. Transport is supported and auth is left UNRESOLVED. Coverage is about 0.97. (20 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Samsung QMxxB Series Control Spec

## Summary
Samsung QMxxB Series large-format displays controlled via Samsung MDC (Multiple Display Control) protocol v15.0 over RS-232 or TCP/IP (RJ45). Binary protocol using 0xAA header byte with command byte, device ID, data length, payload, and checksum. Supports power, volume, input routing, picture adjustments, video wall, PIP, timers, network config, and more.

<!-- UNRESOLVED: exact QMxxB model variants not enumerated separately in source; source is a generic MDC protocol doc covering many Samsung LFD models -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1515
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable    # 0x11 power on/off/reboot
- routable     # 0x14 input source selection
- queryable    # 0x00 status query, 0x0D display status, 0x08 maintenance
- levelable    # 0x12 volume, 0x24 contrast, 0x25 brightness, 0x26 sharpness, 0x27 color, 0x28 tint
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  command: "0xAA 0x11 <ID> 0x01 0x01 <checksum>"

- id: power_off
  label: Power Off
  kind: action
  params: []
  command: "0xAA 0x11 <ID> 0x01 0x00 <checksum>"

- id: power_reboot
  label: Reboot
  kind: action
  params: []
  command: "0xAA 0x11 <ID> 0x01 0x02 <checksum>"

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: volume
      type: integer
      min: 0
      max: 100
      description: Volume level
  command: "0xAA 0x12 <ID> 0x01 <volume> <checksum>"

- id: volume_up
  label: Volume Up
  kind: action
  params: []
  command: "0xAA 0x62 <ID> 0x01 0x00 <checksum>"

- id: volume_down
  label: Volume Down
  kind: action
  params: []
  command: "0xAA 0x62 <ID> 0x01 0x01 <checksum>"

- id: mute_on
  label: Mute On
  kind: action
  params: []
  command: "0xAA 0x13 <ID> 0x01 0x01 <checksum>"

- id: mute_off
  label: Mute Off
  kind: action
  params: []
  command: "0xAA 0x13 <ID> 0x01 0x00 <checksum>"

- id: select_input
  label: Select Input Source
  kind: action
  params:
    - name: input
      type: enum
      values:
        - pc
        - dvi
        - av1
        - av2
        - component
        - s_video
        - hdmi1
        - hdmi2
        - hdmi3
        - hdmi4
        - displayport1
        - displayport2
        - displayport3
        - magicinfo
        - hdbaset
        - media_magicinfo_s
        - url_launcher
        - internal_usb
      description: Input source code (0x14=PC, 0x18=DVI, 0x21=HDMI1, 0x25=DP1, etc.). DVI_VIDEO, HDMI1_PC, HDMI2_PC, HDMI3_PC, HDMI4_PC are Get Only (reported, not settable).
  command: "0xAA 0x14 <ID> 0x01 <input_code> <checksum>"

- id: set_picture_size
  label: Set Picture Size
  kind: action
  params:
    - name: aspect
      type: enum
      values: ["16:9", "4:3", "original_ratio", "21:9", "custom", "auto_wide", "zoom", "zoom1", "zoom2", "just_scan", "wide_fit", "smart_view_1", "smart_view_2", "wide_zoom"]
      description: Picture aspect ratio code
  command: "0xAA 0x15 <ID> 0x01 <aspect_code> <checksum>"

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: contrast
      type: integer
      min: 0
      max: 100
  command: "0xAA 0x24 <ID> 0x01 <contrast> <checksum>"

- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: brightness
      type: integer
      min: 0
      max: 100
  command: "0xAA 0x25 <ID> 0x01 <brightness> <checksum>"

- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: sharpness
      type: integer
      min: 0
      max: 100
  command: "0xAA 0x26 <ID> 0x01 <sharpness> <checksum>"

- id: set_color
  label: Set Color
  kind: action
  params:
    - name: color
      type: integer
      min: 0
      max: 100
  command: "0xAA 0x27 <ID> 0x01 <color> <checksum>"

- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: tint
      type: integer
      min: 0
      max: 100
      description: R/G tint ratio in steps of 2
  command: "0xAA 0x28 <ID> 0x01 <tint> <checksum>"

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: pmode
      type: enum
      values: [dynamic, standard, movie, custom, natural, calibration, off, live, shop_mall_video, shop_mall_text, office_school_video, office_school_text, terminal_station_video, terminal_station_text, videowall_video, videowall_text]
      description: Picture mode code (0x71)
  command: "0xAA 0x71 <ID> 0x01 <pmode_code> <checksum>"

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  params:
    - name: smode
      type: enum
      values: [standard, music, movie, speech, custom, amplify, optimized]
  command: "0xAA 0x72 <ID> 0x01 <smode_code> <checksum>"

- id: set_color_tone
  label: Set Color Tone
  kind: action
  params:
    - name: tone
      type: enum
      values: [cool_2, cool_1, normal, warm_1, warm_2, natural, off]
  command: "0xAA 0x3E <ID> 0x01 <tone_code> <checksum>"

- id: set_color_temperature
  label: Set Color Temperature
  kind: action
  params:
    - name: temp
      type: integer
      min: 2800
      max: 16000
      description: Color temperature in Kelvin (extended range)
  command: "0xAA 0x3F <ID> 0x01 <temp_code> <checksum>"

- id: pip_on
  label: PIP On
  kind: action
  params: []
  command: "0xAA 0x3C <ID> 0x01 0x01 <checksum>"

- id: pip_off
  label: PIP Off
  kind: action
  params: []
  command: "0xAA 0x3C <ID> 0x01 0x00 <checksum>"

- id: set_pip_source
  label: Set PIP Source
  kind: action
  params:
    - name: source
      type: integer
      description: PIP input source code (same as 0x14 input codes)
  command: "0xAA 0x40 <ID> 0x01 <source_code> <checksum>"

- id: set_pip_size
  label: Set PIP Size
  kind: action
  params:
    - name: size
      type: enum
      values: [off, double_1, double_2, medium, large, small, double_3_pop, custom]
  command: "0xAA 0x42 <ID> 0x01 <size_code> <checksum>"

- id: set_pip_position
  label: Set PIP Position
  kind: action
  params:
    - name: position
      type: enum
      values: [upper_left, upper_right, lower_right, lower_left]
  command: "0xAA 0x43 <ID> 0x01 <position_code> <checksum>"

- id: video_wall_on
  label: Video Wall On
  kind: action
  params: []
  command: "0xAA 0x84 <ID> 0x01 0x01 <checksum>"

- id: video_wall_off
  label: Video Wall Off
  kind: action
  params: []
  command: "0xAA 0x84 <ID> 0x01 0x00 <checksum>"

- id: set_video_wall_mode
  label: Set Video Wall Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [natural, full]
  command: "0xAA 0x5C <ID> 0x01 <mode_code> <checksum>"

- id: set_video_wall_divider
  label: Set Video Wall Divider
  kind: action
  params:
    - name: divider
      type: integer
      description: Wall divider code (e.g. 0x11=row1col1, supports up to 15x15)
    - name: serial
      type: integer
      description: Device serial number position in wall (1-225)
  command: "0xAA 0x89 <ID> 0x02 <divider> <serial> <checksum>"

- id: set_video_wall_direct
  label: Set Video Wall Direct
  kind: action
  params:
    - name: on_off
      type: integer
      description: "0=off, 1=on"
    - name: mode
      type: integer
      description: "0=natural, 1=full"
    - name: divider
      type: integer
    - name: serial
      type: integer
    - name: input
      type: integer
      description: Input source code (0x14 codes)
  command: "0xAA 0x8B <ID> 0x05 <on_off> <mode> <divider> <serial> <input> <checksum>"

- id: set_mdc_connection_type
  label: Set MDC Connection Type
  kind: action
  params:
    - name: type
      type: enum
      values: [rs232c, rj45]
  command: "0xAA 0x1D <ID> 0x01 <type_code> <checksum>"

- id: set_network_config
  label: Set Network Configuration
  kind: action
  params:
    - name: ip_1
      type: integer
    - name: ip_2
      type: integer
    - name: ip_3
      type: integer
    - name: ip_4
      type: integer
    - name: subnet_1
      type: integer
    - name: subnet_2
      type: integer
    - name: subnet_3
      type: integer
    - name: subnet_4
      type: integer
    - name: gateway_1
      type: integer
    - name: gateway_2
      type: integer
    - name: gateway_3
      type: integer
    - name: gateway_4
      type: integer
    - name: dns_1
      type: integer
    - name: dns_2
      type: integer
    - name: dns_3
      type: integer
    - name: dns_4
      type: integer
  command: "0xAA 0x1B <ID> 0x11 0x82 <ip1>..<dns4> <checksum>"

- id: set_network_ip_mode
  label: Set Network IP Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [dynamic, static]
  command: "0xAA 0x1B <ID> 0x02 0x85 <mode_code> <checksum>"

- id: set_safety_lock
  label: Set Safety Lock
  kind: action
  params:
    - name: lock
      type: enum
      values: ["off", "on"]
  command: "0xAA 0x5D <ID> 0x01 <lock_code> <checksum>"

- id: set_panel_lock
  label: Set Panel Lock
  kind: action
  params:
    - name: lock
      type: enum
      values: [unlock, lock]
  command: "0xAA 0x5F <ID> 0x01 <lock_code> <checksum>"

- id: set_all_keys_lock
  label: Set All Keys Lock
  kind: action
  params:
    - name: lock
      type: enum
      values: ["off", "on"]
  command: "0xAA 0x77 <ID> 0x01 <lock_code> <checksum>"

- id: set_remote_control
  label: Set Remote Control
  kind: action
  params:
    - name: enabled
      type: enum
      values: [disable, enable]
  command: "0xAA 0x36 <ID> 0x01 <enabled_code> <checksum>"

- id: set_osd
  label: Set OSD On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: ["off", "on"]
  command: "0xAA 0x70 <ID> 0x01 <state_code> <checksum>"

- id: clear_menu
  label: Clear Menu
  kind: action
  params: []
  command: "0xAA 0x34 <ID> 0x01 0x00 <checksum>"

- id: set_manual_lamp
  label: Set Manual Lamp (Backlight)
  kind: action
  params:
    - name: value
      type: integer
      min: 0
      max: 100
  command: "0xAA 0x58 <ID> 0x01 <value> <checksum>"

- id: set_energy_saving
  label: Set Energy Saving
  kind: action
  params:
    - name: mode
      type: enum
      values: ["off", "low", "medium", "high", "picture_off"]
  command: "0xAA 0x92 <ID> 0x01 <mode_code> <checksum>"

- id: set_auto_power
  label: Set Auto Power
  kind: action
  params:
    - name: state
      type: enum
      values: ["off", "on"]
  command: "0xAA 0x33 <ID> 0x01 <state_code> <checksum>"

- id: set_standby
  label: Set Standby Control
  kind: action
  params:
    - name: mode
      type: enum
      values: ["off", "on", "auto"]
  command: "0xAA 0x4A <ID> 0x01 <mode_code> <checksum>"

- id: set_speaker_select
  label: Set Speaker Select
  kind: action
  params:
    - name: speaker
      type: enum
      values: [internal, external]
  command: "0xAA 0x68 <ID> 0x01 <speaker_code> <checksum>"

- id: set_auto_volume
  label: Set Auto Volume
  kind: action
  params:
    - name: mode
      type: enum
      values: ["off", "normal", "night"]
  command: "0xAA 0x48 <ID> 0x01 <mode_code> <checksum>"

- id: set_sound_select
  label: Set Sound Select (Main/PIP)
  kind: action
  params:
    - name: source
      type: enum
      values: [sub, main]
  command: "0xAA 0x47 <ID> 0x01 <source_code> <checksum>"

- id: set_dynamic_contrast
  label: Set Dynamic Contrast
  kind: action
  params:
    - name: mode
      type: enum
      values: ["off", "low", "medium", "high"]
  command: "0xAA 0x87 <ID> 0x01 <mode_code> <checksum>"

- id: set_brightness_sensor
  label: Set Brightness Sensor
  kind: action
  params:
    - name: state
      type: enum
      values: ["off", "on"]
  command: "0xAA 0x86 <ID> 0x01 <state_code> <checksum>"

- id: set_dynamic_backlight
  label: Set Dynamic Backlight
  kind: action
  params:
    - name: mode
      type: enum
      values: ["off", "on_low", "standard", "high"]
  command: "0xAA 0x21 <ID> 0x02 0x51 <mode_code> <checksum>"

- id: set_game_mode
  label: Set Game Mode
  kind: action
  params:
    - name: state
      type: enum
      values: ["off", "on"]
  command: "0xAA 0x90 <ID> 0x01 <state_code> <checksum>"

- id: set_still
  label: Set Still Mode
  kind: action
  params:
    - name: state
      type: enum
      values: ["off", "on"]
  command: "0xAA 0x1F <ID> 0x01 <state_code> <checksum>"

- id: set_network_standby
  label: Set Network Standby
  kind: action
  params:
    - name: state
      type: enum
      values: ["off", "on"]
  command: "0xAA 0xB5 <ID> 0x01 <state_code> <checksum>"

- id: set_rgb_contrast
  label: Set RGB Contrast
  kind: action
  params:
    - name: contrast
      type: integer
      min: 0
      max: 100
  command: "0xAA 0x37 <ID> 0x01 <contrast> <checksum>"

- id: set_rgb_brightness
  label: Set RGB Brightness
  kind: action
  params:
    - name: brightness
      type: integer
      min: 0
      max: 100
  command: "0xAA 0x38 <ID> 0x01 <brightness> <checksum>"

- id: set_fan_speed
  label: Set Fan Speed
  kind: action
  params:
    - name: speed
      type: integer
      min: 0
      max: 100
  command: "0xAA 0x44 <ID> 0x01 <speed> <checksum>"

- id: set_fan_mode
  label: Set Fan Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [manual, auto, "off", "on"]
  command: "0xAA 0x8F <ID> 0x01 <mode_code> <checksum>"

- id: set_pixel_shift
  label: Set Pixel Shift
  kind: action
  params:
    - name: shift
      type: enum
      values: ["off", "on"]
    - name: h_dot
      type: integer
      min: 0
      max: 4
    - name: v_line
      type: integer
      min: 0
      max: 4
    - name: s_time
      type: integer
      min: 1
      max: 4
  command: "0xAA 0x4C <ID> 0x04 <shift> <h_dot> <v_line> <s_time> <checksum>"

- id: run_safety_screen
  label: Run Safety Screen
  kind: action
  params:
    - name: type
      type: enum
      values: ["off", "signal_pattern", "all_white", "scroll", "bar", "eraser", "pixel", "rolling_bar", "fading_screen"]
  command: "0xAA 0x59 <ID> 0x01 <type_code> <checksum>"

- id: set_safety_screen_timer
  label: Set Safety Screen Timer
  kind: action
  params:
    - name: type
      type: integer
      description: "Timer type code (repeat or interval mode)"
    - name: period_or_start_hour
      type: integer
    - name: time_or_start_min
      type: integer
  command: "0xAA 0x5B <ID> <data_length> <type> <params...> <checksum>"

- id: reset
  label: Reset
  kind: action
  params:
    - name: category
      type: enum
      values: [picture, sound, setup_system, all, screen_display]
  command: "0xAA 0x9F <ID> 0x01 <category_code> <checksum>"

- id: set_color_space
  label: Set Color Space
  kind: action
  params:
    - name: space
      type: enum
      values: [auto, native, custom, dci_p3, adobe_rgb, bt_709]
  command: "0xAA 0x9D <ID> 0x01 <space_code> <checksum>"

- id: set_gamma
  label: Set Gamma
  kind: action
  params:
    - name: gamma
      type: integer
      description: "0=natural, 1-5=mode1-5, 0x11-0x15=mode -1 to -5, 0x20=custom"
  command: "0xAA 0x96 <ID> 0x01 <gamma_code> <checksum>"

- id: set_dp_daisy_chain
  label: Set DisplayPort Daisy Chain
  kind: action
  params:
    - name: mode
      type: enum
      values: [clone, expand]
  command: "0xAA 0xB1 <ID> 0x01 <mode_code> <checksum>"

- id: set_menu_orientation
  label: Set Menu Orientation
  kind: action
  params:
    - name: mode
      type: enum
      values: [landscape, portrait_270, "180", "90"]
  command: "0xAA 0xC8 <ID> 0x02 0x81 <mode_code> <checksum>"

- id: virtual_remote
  label: Virtual Remote Control Key
  kind: action
  params:
    - name: key_code
      type: integer
      description: "Virtual remote key code (0x01=SOURCE, 0x02=POWER, 0x07=VOL_UP, 0x0B=VOL_DOWN, 0x0F=MUTE, 0x60=UP, 0x61=DOWN, 0x62=RIGHT, 0x65=LEFT, 0x68=ENTER, etc.)"
  command: "0xAA 0xB0 <ID> 0x01 <key_code> <checksum>"

- id: set_weekly_restart
  label: Set Weekly Restart Schedule
  kind: action
  params:
    - name: weekday_bitmask
      type: integer
      description: "Bits for Mon-Sun (bit0=Reserved, bit1=Mon..bit7=Sun)"
    - name: hour
      type: integer
      min: 0
      max: 23
    - name: minute
      type: integer
      min: 0
      max: 59
  command: "0xAA 0x1B <ID> 0x04 0xA2 <weekday> <hour> <minute> <checksum>"

- id: set_magicinfo_channel
  label: Set MagicInfo Channel
  kind: action
  params:
    - name: channel
      type: integer
  command: "0xAA 0x1C <ID> 0x03 0x81 <channel_high> <channel_low> <checksum>"

- id: set_play_via_mode
  label: Set Play Via Mode (Launcher)
  kind: action
  params:
    - name: mode
      type: enum
      values: [magicinfo, url_launcher, magiciwb]
  command: "0xAA 0xC7 <ID> 0x02 0x81 <mode_code> <checksum>"

- id: set_url_address
  label: Set URL Address
  kind: action
  params:
    - name: url
      type: string
      description: "ASCII URL, max 200 characters"
  command: "0xAA 0xC7 <ID> <length> 0x82 <url_bytes...> <checksum>"

- id: set_auto_adjustment
  label: Trigger Auto Adjustment
  kind: action
  params: []
  command: "0xAA 0x3D <ID> 0x01 0x00 <checksum>"

- id: set_outdoor_mode
  label: Set Outdoor Mode
  kind: action
  params:
    - name: state
      type: enum
      values: ["off", "on"]
  command: "0xAA 0x1A <ID> 0x02 0x81 <state_code> <checksum>"

- id: set_display_id
  label: Set Display ID Visibility
  kind: action
  params:
    - name: state
      type: enum
      values: ["off", "on"]
  command: "0xAA 0xB9 <ID> 0x01 <state_code> <checksum>"

- id: set_auto_motion_plus
  label: Set Auto Motion Plus
  kind: action
  params:
    - name: mode
      type: enum
      values: ["0x00", "0x01", "0x02", "0x03", "0x04", "0x05", "0x06"]
      description: "Off, Clear, Standard, Smooth, Custom, Demo, Auto"
    - name: blur_reduction
      type: integer
      min: 0
      max: 10
      description: "It is only for “Mode: Custom”."
    - name: judder_reduction
      type: integer
      min: 0
      max: 10
      description: "It is only for “Mode: Custom”."
  command: "0x0F"

- id: set_direct_channel
  label: Set Direct Channel
  kind: action
  params:
    - name: country
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "0 : Korea, 1: USA, …."
    - name: atv_dtv
      type: enum
      values: [0, 1]
      description: "0 : Analog TV, 1: Digital TV"
    - name: air_cable
      type: enum
      values: [0, 1]
      description: "0 : general, 1: cabled"
    - name: channel
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "Analog TV :  1 ~ 135 ,  Digital TV : 0 ~ 999; high byte then low byte"
    - name: select_minor
      type: enum
      values: [0, 1]
      description: "0 : minor channel not selected. 1: minor channel selected."
    - name: minor_channel
      type: integer
      min: 0
      max: 999
      description: High byte then low byte
  command: "0x17"

- id: set_screen_mode
  label: Set Screen Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: ["0x01", "0x04", "0x0B", "0x31"]
      description: "16 : 9, Zoom, 4 : 3, Wide Zoom"
  command: "0x18"

- id: set_internal_heatex_fan_speed
  label: Set Internal HeatEx Fan Speed
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x82"]
    - name: speed
      type: integer
      min: 0
      max: 100
      description: "Data range will be 0~100"
  command: "0x1A"

- id: add_network_access_point
  label: Add Network Access Point
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x8A"]
    - name: ssid
      type: string
      description: "0x00 (SSID); Data1 : Followed data Size; Data2~ : String type data of access point SSID; maximum length UNRESOLVED"
    - name: password
      type: string
      description: "0x01(Password); Data1 : Followed data Size; Data2~ : String type data of access point password; maximum length UNRESOLVED"
  command: "0x1B"

- id: set_magicinfo_server
  label: Set MagicInfo Server Settings
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x82"]
    - name: url
      type: string
      description: "URL address max length is limited 252 bytes; example http://10.88.8.73:7001"
  command: "0x1C"

- id: set_magicinfo_content_orientation
  label: Set MagicInfo Content Orientation
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x83"]
    - name: orientation_mode
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "UNRESOLVED: orientation codes are not stated in this command section"
  command: "0x1C"

- id: set_led_picture_size
  label: Set LED Picture Size
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x01"]
    - name: size
      type: enum
      values: ["0x00", "0x01"]
      description: "Original, Custom"
  command: "0x21"

- id: set_picture_size_custom_fit_size
  label: Set Picture Size Custom Fit Size
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x02"]
    - name: width
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "Custom screen width size; high byte then low byte; product-dependent limits and 2pixel unit configuration"
    - name: height
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "High byte then low byte; product-dependent limits and 2pixel unit configuration"
  command: "0x21"

- id: set_hdr_inverse_tone_mapping
  label: Set HDR Inverse Tone Mapping
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x03"]
    - name: state
      type: enum
      values: ["0x00", "0x01"]
      description: "Off, On"
  command: "0x21"

- id: set_hdr_dynamic_peaking
  label: Set HDR Dynamic Peaking
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x04"]
    - name: state
      type: enum
      values: [0, 1]
      description: "0, 1 documented in the Command Table; value meanings UNRESOLVED; backlight control may not work with Dynamic peaking : on"
  command: "0x21"

- id: set_hdr_color_mapping
  label: Set HDR Color Mapping
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x05"]
    - name: state
      type: enum
      values: [0, 1]
      description: "0, 1 documented in the Command Table; value meanings UNRESOLVED"
  command: "0x21"

- id: set_picture_size_fit_to_screen
  label: Set Picture Size Fit To Screen
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x06"]
    - name: state
      type: enum
      values: [0, 1]
      description: "0, 1 documented in the Command Table; value meanings UNRESOLVED"
  command: "0x21"

- id: set_hdmi_uhd_color
  label: Set HDMI UHD Color
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x07"]
    - name: source
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "Same as defined info on 0x14; only product-supported sources"
    - name: state
      type: enum
      values: ["0x00", "0x01"]
      description: "0x00(Off) , 0x01(On); Source/state pairs may repeat; value changes automatically reboot the device"
  command: "0x21"

- id: set_fhd_uhd_output
  label: Set FHD UHD Output
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x08"]
    - name: output
      type: enum
      values: ["0x00", "0x01"]
      description: "FHD, UHD; value changes automatically reboot the device"
  command: "0x21"

- id: set_live_mode
  label: Set Live Mode
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x09"]
    - name: mode
      type: enum
      values: ["0x00", "0x01"]
      description: "Normal, Live; value changes automatically reboot the device"
  command: "0x21"

- id: set_hdr_dynamic_range_extension
  label: Set HDR Dynamic Range Extension
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x0A"]
    - name: mode
      type: enum
      values: ["0x00", "0x01", "0x02", "0x03"]
      description: "Off, Low, Medium, High; value changes automatically reboot the device"
  command: "0x21"

- id: set_screen_position
  label: Set Screen Position
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x0B"]
    - name: position_x
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "Screen x position data; high byte then low byte; product-dependent limits and 2pixel unit configuration"
    - name: position_y
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "Screen y position data; high byte then low byte; product-dependent limits and 2pixel unit configuration"
  command: "0x21"

- id: set_hdr_multilink
  label: Set HDR MultiLink
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x0C"]
    - name: state
      type: enum
      values: ["0x00", "0x01", "0xFF"]
      description: "Off, On, Do not change; 0xFF leaves Multi Link HDR unchanged while the other data remain valid"
    - name: total_device_num
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: Device num for multi link HDR
    - name: device_id
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: Device ID under multi link HDR
  command: "0x21"

- id: set_color_enhancement
  label: Set Color Enhancement
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x50"]
    - name: state
      type: enum
      values: [0, 1]
      description: "0, 1 documented in the Command Table; value meanings UNRESOLVED"
  command: "0x21"

- id: set_fit_to_screen
  label: Set Fit To Screen
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x52"]
    - name: mode
      type: enum
      values: ["0x02"]
      description: "Auto; UNRESOLVED: the Command Table additionally lists 0, 1 without meanings"
  command: "0x21"

- id: set_uniformity
  label: Set Uniformity
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x53"]
    - name: mode
      type: enum
      values: [0, 1]
      description: "0, 1 documented in the Command Table; value meanings UNRESOLVED; value changes automatically reboot the device"
  command: "0x21"

- id: set_gamma_mode
  label: Set Gamma Mode
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x54"]
    - name: mode
      type: enum
      values: ["0x00", "0x01", "0x02", "0x03"]
      description: "HLG, ST.2084, BT.1886, S Curve"
  command: "0x21"

- id: set_black_equalizer
  label: Set Black Equalizer
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x55"]
    - name: mode
      type: enum
      values: ["0x00", "0x01", "0x02"]
      description: "Off, Low, High"
  command: "0x21"

- id: set_hdr_plus
  label: Set HDR Plus
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x56"]
    - name: state
      type: enum
      values: ["0x00", "0x01"]
      description: "Off, On"
  command: "0x21"

- id: adjust_coarse
  label: Adjust Coarse
  kind: action
  params:
    - name: direction
      type: enum
      values: ["0x00", "0x01"]
      description: "Decrease, Increase; PC source with video wall on"
  command: "0x2F"

- id: adjust_fine
  label: Adjust Fine
  kind: action
  params:
    - name: direction
      type: enum
      values: ["0x00", "0x01"]
      description: "Decrease, Increase; PC source with video wall on"
  command: "0x30"

- id: set_horizontal_position
  label: Set Horizontal Position
  kind: action
  params:
    - name: value
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "Common protocol: 0x00 Move to Left, 0x01 Move to Right. Annex A.2 with HKIA support option: Value of 0 ~ 100; 50 default position. Select encoding according to product specification."
  command: "0x31"

- id: set_vertical_position
  label: Set Vertical Position
  kind: action
  params:
    - name: value
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "Common protocol: 0x00 Move Up, 0x01 Move Down. Annex A.3 with HKIA support option: Value of 0 ~ 100; 50 default position. Select encoding according to product specification."
  command: "0x32"

- id: user_auto_color
  label: User Auto Color
  kind: action
  params:
    - name: mode
      type: enum
      values: ["0x00", "0x01"]
      description: "Reset, Auto Color; PC(D-Sub) source only"
  command: "0x45"

- id: adjust_video_picture_position_size
  label: Adjust Video Picture Position And Size
  kind: action
  params:
    - name: type
      type: enum
      values: ["0x00", "0x01", "0x02"]
      description: "Reset, Position, Size; 0x03 RESERVED is not an operation"
    - name: direction
      type: enum
      values: ["0x00", "0x01", "0x02", "0x03"]
      description: "Position: Down, Up, Left, Right. Size: Vertical Scale Down, Vertical Scale Up, Horizontal Scale Down, Horizontal Scale Up. Ignored for Reset."
  command: "0x4B"

- id: set_energy_saving_lfd
  label: Set Energy Saving LFD
  kind: action
  params:
    - name: state
      type: enum
      values: ["0x00", "0x01"]
      description: "Energy Saving Off, Energy Saving On; may control Max Power Saving"
  command: "0x56"

- id: set_auto_lamp
  label: Set Auto Lamp Schedule
  kind: action
  params:
    - name: lmax_hour
      type: integer
      min: 1
      max: 12
    - name: lmax_minute
      type: integer
      min: 0
      max: 59
    - name: lmax_am_pm
      type: enum
      values: [1, 0]
      description: "AM :1 / PM:0"
    - name: lmax_value
      type: integer
      min: 0
      max: 100
    - name: lmin_hour
      type: integer
      min: 1
      max: 12
    - name: lmin_minute
      type: integer
      min: 0
      max: 59
    - name: lmin_am_pm
      type: enum
      values: [1, 0]
      description: "AM :1 / PM:0"
    - name: lmin_value
      type: integer
      min: 0
      max: 100
      description: "When Manual Lamp Control is on, Auto Lamp Control will automatically turn off; does not operate with Dynamic contrast On"
  command: "0x57"

- id: set_inverse
  label: Set Inverse
  kind: action
  params:
    - name: state
      type: enum
      values: ["0x00", "0x01"]
      description: "OFF, ON; may work as panel control depending on product specification"
  command: "0x5A"

- id: channel_up_down
  label: Channel Up Down
  kind: action
  params:
    - name: direction
      type: enum
      values: ["0x00", "0x01"]
      description: "Up, Down; only works with models include TV"
  command: "0x61"

- id: set_ticker
  label: Set Ticker
  kind: action
  params:
    - name: state
      type: integer
      min: 0
      max: 1
    - name: start_hour
      type: integer
      min: 1
      max: 12
    - name: start_minute
      type: integer
      min: 0
      max: 59
    - name: start_am_pm
      type: enum
      values: ["0x00", "0x01"]
      description: "PM, AM"
    - name: end_hour
      type: integer
      min: 1
      max: 12
    - name: end_minute
      type: integer
      min: 0
      max: 59
    - name: end_am_pm
      type: enum
      values: ["0x00", "0x01"]
      description: "PM, AM"
    - name: position_horizontal
      type: integer
      min: 0
      max: 2
      description: "0x00 Center, 0x01 Left, 0x02 Right"
    - name: position_vertical
      type: integer
      min: 0
      max: 2
      description: "0x00 Middle, 0x01 Top, 0x02 Bottom"
    - name: motion_state
      type: integer
      min: 0
      max: 1
    - name: motion_direction
      type: integer
      min: 0
      max: 3
      description: "0x00 Left, 0x01 Right, 0x02 Up, 0x03 Down"
    - name: motion_speed
      type: integer
      min: 0
      max: 2
      description: "0x00 Normal, 0x01 Slow, 0x02 Fast"
    - name: font_size
      type: integer
      min: 0
      max: 2
      description: "0x00 Standard, 0x01 Small, 0x02 Large"
    - name: foreground_color
      type: integer
      min: 0
      max: 7
      description: "0x00 Black, 0x01 White, 0x02 Red, 0x03 Green, 0x04 Blue, 0x05 Yellow, 0x06 Magenta, 0x07 Cyan"
    - name: background_color
      type: integer
      min: 0
      max: 7
      description: "0x00 Black, 0x01 White, 0x02 Red, 0x03 Green, 0x04 Blue, 0x05 Yellow, 0x06 Magenta, 0x07 Cyan"
    - name: foreground_opacity
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "UNRESOLVED: prose states 0 ~ 3, but the table lists 0x03 Flashing, 0x04 Flash All, 0x05 Off"
    - name: background_opacity
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "UNRESOLVED: prose states 0 ~ 3, while the table defines 0x00 Solid, 0x01 Transparent, 0x02 Translucent"
    - name: message
      type: string
      description: "Message data can be entered up to 232 bytes; UTF8 support depends on product specification"
  command: "0x63"

- id: set_sound_select_alternate
  label: Set Alternate Sound Select
  kind: action
  params:
    - name: source
      type: enum
      values: ["0x00", "0x01"]
      description: "Sub, Main; same function as 0x47 using the separately documented 0x65 opcode"
  command: "0x65"

- id: set_device_name
  label: Set Device Name
  kind: action
  params:
    - name: name
      type: string
      description: "The maximum length of device name is 15; setting support depends on product specification"
  command: "0x67"

- id: set_digital_nr
  label: Set Digital Noise Reduction
  kind: action
  params:
    - name: mode
      type: enum
      values: ["0x00", "0x01", "0x02", "0x03", "0x04", "0x05"]
      description: "NR Mode Off, NR Mode Low(On), NR Mode Medium, NR Mode High, NR Mode Auto, NR Mode Auto Visualization"
  command: "0x73"

- id: set_pc_color_tone
  label: Set PC Color Tone
  kind: action
  params:
    - name: tone
      type: enum
      values: ["0x00", "0x01", "0x02", "0x03", "0x05", "0x50"]
      description: "Custom, Cool, Normal, Warm, Natural, Off"
  command: "0x75"

- id: set_auto_auto_adjustment
  label: Set Auto Auto Adjustment
  kind: action
  params:
    - name: state
      type: enum
      values: ["0x00", "0x01"]
      description: "Disable, Enable; Disable prevents Auto Adjustment"
  command: "0x76"

- id: set_srs_tsxt
  label: Set SRS TSXT
  kind: action
  params:
    - name: state
      type: enum
      values: ["0x00", "0x01"]
      description: "SRS OFF, SRS ON"
  command: "0x78"

- id: set_film_mode
  label: Set Film Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: ["0x00", "0x01", "0x02", "0x03"]
      description: "Film Mode OFF, Film Mode Auto1, Film Mode Auto2, Film Cinema Smooth"
  command: "0x79"

- id: set_frame_alignment
  label: Set Frame Alignment
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x81"]
    - name: mode
      type: enum
      values: ["0x00", "0x01", "0x02"]
      description: "Off, On, Auto"
  command: "0x8C"

- id: set_hdmi_black_level
  label: Set HDMI Black Level
  kind: action
  params:
    - name: level
      type: enum
      values: ["0x00", "0x01", "0x02"]
      description: "Normal, Low, Auto"
  command: "0x94"

- id: set_black_adjust
  label: Set Black Adjust
  kind: action
  params:
    - name: level
      type: enum
      values: ["0x00", "0x01", "0x02", "0x03"]
      description: "Black Adjust Control OFF or Off; Black Adjust Control Low(ON) or Dark; Black Adjust Control Medium or Darker; Black Adjust Control High or Darkest"
  command: "0x95"

- id: set_edge_enhancement
  label: Set Edge Enhancement
  kind: action
  params:
    - name: state
      type: enum
      values: ["0x00", "0x01"]
      description: "Edge Enhancement Control OFF, Edge Enhancement Control ON"
  command: "0x9C"

- id: set_xvycc
  label: Set xvYCC
  kind: action
  params:
    - name: state
      type: enum
      values: ["0x00", "0x01"]
      description: "xvYCC Control OFF, xvYCC Control ON"
  command: "0x9E"

- id: set_ambient_brightness
  label: Set Ambient Brightness
  kind: action
  params:
    - name: mode
      type: enum
      values: ["0x00", "0x01"]
      description: "Ambient Brightness Mode Off, Ambient Brightness Mode On"
    - name: valid_lamp_value
      type: enum
      values: ["0x00", "0x01"]
      description: "Invalid Lamp Value(Don’t apply), Valid Lamp Value (Apply)"
    - name: lamp_value
      type: integer
      min: 0
      max: 100
  command: "0xA1"

- id: set_osd_display_type
  label: Set OSD Display Type
  kind: action
  params:
    - name: type
      type: enum
      values: ["0x00", "0x01", "0x02", "0x03", "0x04"]
      description: "Source OSD, Not Optimum Mode OSD, No Signal OSD, MDC OSD, Schedule Channel Info"
    - name: state
      type: enum
      values: ["0x00", "0x01"]
      description: "OSD Off, OSD On"
  command: "0xA3"

- id: set_timer
  label: Set Timer Schedule
  kind: action
  params:
    - name: timer_command
      type: enum
      values: ["0xA4", "0xA5", "0xA6", "0xAB", "0xAC", "0xAD", "0xAE"]
      description: "Timer 1, Timer 2, Timer 3, Timer4, Timer5, Timer6, Timer7; selects the command byte"
    - name: data_length
      type: enum
      values: ["0x0D", "0x0F"]
      description: "Product-dependent formats; UNRESOLVED: complete 0x0D field layout is not recoverable from the extracted tables"
    - name: on_hour
      type: integer
      min: 1
      max: 12
    - name: on_minute
      type: integer
      min: 0
      max: 59
    - name: on_am_pm
      type: enum
      values: ["0x00", "0x01"]
      description: "PM, AM"
    - name: on_active
      type: integer
      min: 0
      max: 1
      description: "0(off)~1(on)"
    - name: off_hour
      type: integer
      min: 1
      max: 12
    - name: off_minute
      type: integer
      min: 0
      max: 59
    - name: off_am_pm
      type: enum
      values: ["0x00", "0x01"]
      description: "PM, AM"
    - name: off_active
      type: integer
      min: 0
      max: 1
      description: "0(off)~1(on)"
    - name: repeat_on
      type: integer
      min: 0
      max: 5
      description: "0x00 Once, 0x01 Everyday, 0x02 Mon~Fri, 0x03 Mon~Sat, 0x04 Sat~Sun, 0x05 Manual Weekday"
    - name: manual_weekday_on
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "Weekday value; Don’t care for BIT7; bit mapping UNRESOLVED"
    - name: repeat_off
      type: integer
      min: 0
      max: 5
      description: "0x00 Once, 0x01 Everyday, 0x02 Mon~Fri, 0x03 Mon~Sat, 0x04 Sat~Sun, 0x05 Manual Weekday"
    - name: manual_weekday_off
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "Weekday value; Don’t care for BIT7; bit mapping UNRESOLVED"
    - name: volume
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "Volume to be set on TV/Monitor; timer-specific range UNRESOLVED"
    - name: source
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "Source code; 0x61, WiDi is not available, 0x62 : Internal/USB, USB"
    - name: holiday_apply
      type: integer
      min: 0
      max: 3
      description: "0x02 On Timer only Apply, 0x03 Off Timer only Apply; meanings of 0 and 1 UNRESOLVED"
  command: "0xA4"

- id: set_clock
  label: Set Clock
  kind: action
  params:
    - name: day
      type: integer
      min: 1
      max: 31
    - name: hour
      type: integer
      min: 1
      max: 12
    - name: minute
      type: integer
      min: 0
      max: 59
    - name: month
      type: integer
      min: 1
      max: 12
    - name: year
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: Year1 high byte followed by Year2 low byte
    - name: am_pm
      type: enum
      values: ["0x00", "0x01"]
      description: "PM, AM"
  command: "0xA7"

- id: manage_holiday
  label: Manage Holiday
  kind: action
  params:
    - name: management_command
      type: enum
      values: ["0x00", "0x01", "0x02"]
      description: "Add Holiday, Delete Holiday, Delete All"
    - name: start_month
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
    - name: start_day
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
    - name: end_month
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
    - name: end_day
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "If param is Delete All, Data 2 ~ Data 5 must be set 0."
  command: "0xA8"

- id: set_edit_name
  label: Set Edit Name
  kind: action
  params:
    - name: name_code
      type: enum
      values: ["0x00", "0x01", "0x02", "0x03", "0x04", "0x05", "0x06", "0x07", "0x08", "0x09", "0x0A", "0x0B", "0x0C", "0x0D", "0x0E", "0x0F", "0x10", "0x11", "0x12", "0x13", "0x14"]
      description: "NONE, VCR, DVD, Cable STB, Satelite STB, PVR STB, AV Receiver, Game, Camcorder, PC, DVI PC, DVI Devices, TV, IPTV, Blu-ray, HD DVD, DMA, DVD Receiver, HD STB, DVD Combo, DHR"
  command: "0xAF"

- id: set_divided_screen
  label: Set Divided Screen
  kind: action
  params:
    - name: data_length
      type: enum
      values: ["0x08", "0x0A", "0x06"]
      description: "Type1 3Screen, Type2 4Screen, Type3 4Screen without picture size"
    - name: mode
      type: enum
      values: ["0x00", "0x01", "0x02"]
      description: "Divided screen Off, 3Screen On, 4Screen On"
    - name: sound_select
      type: enum
      values: ["0x00", "0x01", "0x02", "0x03"]
      description: "Main Screen, Sub Screen1, Sub Screen2, Sub Screen3"
    - name: screen_size
      type: enum
      values: ["0x00", "0x01", "0x02", "0x03", "0x04", "0x05"]
      description: "Mode1, Mode2, Mode3, Mode4 (960:960), Mode5 (1440:480), Mode6 (1280:640); omitted for Type3"
    - name: main_picture_size
      type: enum
      values: ["0x09", "0x20"]
      description: "Full(Screen Fit), Original(Aspect Ratio); omitted for Type3"
    - name: sub_screen_data
      type: string
      description: "UNRESOLVED: structured list serialization. Type1/Type2 use source/picture-size pairs for Sub Screen1,2 or 1,2,3; Type3 uses source bytes for Sub Screen0,1,2,3. Sources refer to 0x14; picture sizes are 0x09 Full(Screen Fit), 0x20 Original(Aspect Ratio)."
  command: "0xB2"

- id: set_video_conference_sound
  label: Set Video Conference Sound
  kind: action
  params:
    - name: state
      type: enum
      values: ["0x00", "0x01"]
      description: "Video Conference Sound Off, Video Conference Sound On"
  command: "0xB3"

- id: set_dst
  label: Set Daylight Saving Time
  kind: action
  params:
    - name: mode
      type: enum
      values: ["0x00", "0x01", "0x02"]
      description: "Tuner supported Model: DST Off, Auto, Manual. Tunerless Model: 0x00 DST Off, 0x02 DST On; 0x01 is not a tunerless option."
    - name: start_month
      type: integer
      min: 0
      max: 11
      description: "0x00 : Jan ~ 0x0b : Dec"
    - name: start_week
      type: enum
      values: ["0x00", "0x01", "0x02", "0x03", "0x04"]
      description: "1st, 2nd, 3rd, 4th, Last"
    - name: start_weekday
      type: integer
      min: 0
      max: 6
      description: "0x00 : Mon ~ 0x06 : Sun"
    - name: start_hour
      type: integer
      min: 0
      max: 23
    - name: start_minute
      type: integer
      min: 0
      max: 59
    - name: end_month
      type: integer
      min: 0
      max: 11
      description: "0x00 : Jan ~ 0x0b : Dec"
    - name: end_week
      type: enum
      values: ["0x00", "0x01", "0x02", "0x03", "0x04"]
      description: "1st, 2nd, 3rd, 4th, Last"
    - name: end_weekday
      type: integer
      min: 0
      max: 6
      description: "0x00 : Mon ~ 0x06 : Sun"
    - name: end_hour
      type: integer
      min: 0
      max: 23
    - name: end_minute
      type: integer
      min: 0
      max: 59
    - name: offset
      type: enum
      values: ["0x00", "0x01"]
      description: "+1:00, +2:00"
  command: "0xB6"

- id: set_custom_pip
  label: Set Custom PIP
  kind: action
  params:
    - name: horizontal_position
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "Interval 10 Pixel; position and size must not exceed panel H, V size"
    - name: vertical_position
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "Interval 10 Pixel; position and size must not exceed panel H, V size"
    - name: size
      type: enum
      values: ["512*288", "672*378", "832*468", "992*558", "1152*648", "1312*738", "1472*828", "1632*918"]
      description: "H/V Size : 512 * 288 ~ 1632 * 918  (H Interval : 160 pixel, V Interval : 90 pixel); transmit H Size and V Size as high/low bytes"
  command: "0xB7"

- id: set_auto_id_status
  label: Set Auto ID Status
  kind: action
  params:
    - name: status
      type: enum
      values: ["0x00", "0x01"]
      description: "Auto ID Setting START, Auto ID Setting END"
  command: "0xB8"

- id: set_clock_with_seconds
  label: Set Clock With Seconds
  kind: action
  params:
    - name: day
      type: integer
      min: 1
      max: 31
    - name: hour
      type: integer
      min: 1
      max: 12
    - name: minute
      type: integer
      min: 0
      max: 59
    - name: second
      type: integer
      min: 0
      max: 59
    - name: month
      type: integer
      min: 1
      max: 12
    - name: year
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: Year1 high byte followed by Year2 low byte
    - name: am_pm
      type: enum
      values: ["0x00", "0x01"]
      description: "PM, AM"
  command: "0xC5"

- id: set_auto_power_off
  label: Set Auto Power Off
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x81"]
    - name: mode
      type: enum
      values: ["0x00", "0x01", "0x02", "0x03", "0x04"]
      description: "Off, 4 Hour(On), 6 Hour, 8 Hour, 16 Hour; models with On/Off only use Data 0 Off and Data 1 On"
  command: "0xC6"

- id: set_brightness_limit
  label: Set Brightness Limit
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x82"]
    - name: value
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "UNRESOLVED: brightness limit codes are not stated"
  command: "0xC6"

- id: set_source_content_orientation
  label: Set Source Content Orientation
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x82"]
    - name: orientation_mode
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "UNRESOLVED: source orientation codes are not stated in this command section"
  command: "0xC8"

- id: set_rotated_aspect_ratio
  label: Set Rotated Aspect Ratio
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x83"]
    - name: aspect
      type: enum
      values: ["0x00", "0x01"]
      description: "Full Screen, Original"
  command: "0xC8"

- id: set_pip_rotation
  label: Set PIP Rotation
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x84"]
    - name: orientation_mode
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "UNRESOLVED: PIP orientation codes are not stated in this command section"
  command: "0xC8"

- id: set_menu_size
  label: Set Menu Size
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x85"]
    - name: size
      type: enum
      values: ["0x00", "0x01", "0x02"]
      description: "Original, Medium, Small; UNRESOLVED: the source reply tables use 0x83 instead of the request subcommand 0x85"
  command: "0xC8"

- id: set_hdmi_sound
  label: Set HDMI Sound
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x81"]
    - name: source
      type: enum
      values: ["0x00", "0x01"]
      description: "HDMI Signal Sound, Audio In Sound"
  command: "0xC9"

- id: set_sound_menu_equalizer
  label: Set Sound Menu Equalizer
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x82", "0x83", "0x84", "0x85"]
      description: "EQ 200Hz, EQ 500Hz, EQ 2kHz, EQ 5kHz"
    - name: value
      type: integer
      min: 0
      max: 20
      description: "Command Table: 0 ~ 20; menu -10 level is 0, 0 level is 0x0a, 10 level is 0x14"
  command: "0xC9"

- id: set_dimming_mode
  label: Set Dimming Mode
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x61"]
    - name: mode
      type: enum
      values: ["0x00", "0x01", "0x02", "0x03"]
      description: "Auto, Light Sensor, Sun Rise / Sun Set, Off"
  command: "0xCA"

- id: set_night_time_constant_brightness
  label: Set Night Time Constant Brightness
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x62"]
    - name: mode
      type: enum
      values: [0, 1]
      description: "0,1 documented in the Command Table; value meanings UNRESOLVED"
  command: "0xCA"

- id: set_brightness_change_period
  label: Set Brightness Change Period
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x63"]
    - name: minutes
      type: integer
      min: 10
      max: 70
      description: "10~70(minutes); only when dimming mode is Location mode"
  command: "0xCA"

- id: set_light_sensor_effective_range
  label: Set Light Sensor Effective Range
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x64"]
    - name: data_type
      type: enum
      values: ["0x00", "0x01"]
      description: "Minimum Effective Range, Maximum Effective Range"
    - name: value
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "Lux unit data; data-type/value pairs may repeat; encoded data width UNRESOLVED"
  command: "0xCA"

- id: set_brightness_output_range
  label: Set Brightness Output Range And Default Output
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x65"]
    - name: data_type
      type: enum
      values: ["0x00", "0x01", "0x02"]
      description: "Minimum Output Range, Maximum Output Range, Default Output"
    - name: value
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "% unit data; data-type/value pairs may repeat; encoded data width UNRESOLVED"
  command: "0xCA"

- id: set_location_info
  label: Set Latitude Longitude Information
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x66"]
    - name: data_type
      type: enum
      values: ["0x00", "0x01"]
      description: "Latitude, Longitude"
    - name: value
      type: string
      description: "String data of each data type, preceded by Data Type Data Length; data-type/length/string records may repeat; range and string format UNRESOLVED"
  command: "0xCA"

- id: set_cec
  label: Set CEC
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x70"]
    - name: state
      type: enum
      values: ["0x00", "0x01"]
      description: "Off, On"
  command: "0xCA"

- id: set_multi_device_grouping
  label: Set Multi Device Grouping
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x71"]
    - name: group_mode
      type: integer
      min: 0
      max: UNRESOLVED
      description: "0x00 Off, 0x01 Group 1, 0x02 Group 2, Up to group N; UNRESOLVED: request table prints data length 0x03e"
    - name: role
      type: enum
      values: ["0x00", "0x01"]
      description: "Sub, Main"
  command: "0xCA"

- id: set_auto_source_switch
  label: Set Auto Source Switch
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x81"]
    - name: state
      type: enum
      values: ["0x00", "0x01"]
      description: "Off, On(Preset Input)"
  command: "0xCA"

- id: set_auto_source_switch_config
  label: Set Auto Source Switch Configuration
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x82"]
    - name: primary_source_recovery
      type: enum
      values: ["0x00", "0x01"]
      description: "Off, On"
    - name: primary_source
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "Same code as 0x14 Input Source Control; All is 0x00"
    - name: secondary_source
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "Same code as 0x14 Input Source Control"
  command: "0xCA"

- id: set_power_on_delay
  label: Set Power On Delay
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x83"]
    - name: seconds
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "Power on delay time of the device(second unit); Pls refer device menu for range"
  command: "0xCA"

- id: set_synced_power_on
  label: Set Synced Power On
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x84"]
    - name: state
      type: enum
      values: [0, 1]
      description: "0,1 documented in the Command Table; value meanings UNRESOLVED"
  command: "0xCA"

- id: set_synced_power_off
  label: Set Synced Power Off
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x85"]
    - name: state
      type: enum
      values: [0, 1]
      description: "0,1 documented in the Command Table; value meanings UNRESOLVED"
  command: "0xCA"

- id: set_power_button
  label: Set Power Button
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x91"]
    - name: mode
      type: enum
      values: ["0x00", "0x01"]
      description: "Power On Only, Power On/Off"
  command: "0xCA"

- id: set_touch_admin_lock
  label: Set Touch Admin Lock
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x92"]
    - name: state
      type: enum
      values: [0, 1]
      description: "0, 1 documented in the Command Table; value meanings UNRESOLVED"
  command: "0xCA"

- id: set_dicom_mode
  label: Set DICOM Mode
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x93"]
    - name: mode
      type: enum
      values: [0, 1]
      description: "0, 1 documented in the Command Table; value meanings UNRESOLVED"
  command: "0xCA"

- id: set_no_signal_power_off
  label: Set No Signal Power Off
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0xA1"]
    - name: mode
      type: enum
      values: ["0x00", "0x01", "0x02", "0x03", "0x04"]
      description: "Off, 15 min, 30 min, 60 min, 10 min"
  command: "0xCA"

- id: set_eco_sensor_minimal_backlight
  label: Set Eco Sensor Minimal Backlight
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0xB0"]
    - name: value
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: Minimal backlight limit value of eco sensor related control
  command: "0xCA"

- id: set_abl_mode
  label: Set ABL Mode
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x85"]
    - name: state
      type: enum
      values: ["0x00", "0x01"]
      description: "Off, On"
  command: "0xD0"

- id: set_scanning_rate_mode
  label: Set Scanning Rate Mode
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x86"]
    - name: state
      type: enum
      values: ["0x00", "0x01"]
      description: "Off, On; UNRESOLVED: overview calls this XOR Output Activation mode (Set Only), while the detailed section documents Scanning Rate Mode with a query"
  command: "0xD0"

- id: lod_recheck
  label: LOD Recheck
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x87"]
    - name: value
      type: enum
      values: ["0x00"]
  command: "0xD0"

- id: set_module_white_balance
  label: Set Module White Balance
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x92"]
    - name: module_id
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: Module id of each cabinet
    - name: reset
      type: enum
      values: [0, 1]
      description: "Reset when data is 1"
    - name: x
      type: enum
      values: [0, 1, 2, 3]
      description: "Red = 0, Green = 1, Blue = 2, All Y Line = 3"
    - name: y
      type: enum
      values: [0, 1, 2, 3]
      description: "Red = 0, Green = 1, Blue = 2, All X Line = 3"
    - name: gain_data
      type: string
      description: "UNRESOLVED: gain range and list serialization. Each command can handle 1~3 Gain data, high byte then low byte. Type1 packs Reset/Module ID/X/Y into Module Info; Type2 sends Module ID and Module Postion separately. Reset with X/Y 0x0F resets the module; all-module reset is 0xff for Type1 or 0xff,0xff for Type2."
  command: "0xD0"

- id: set_cabinet_cc
  label: Set Cabinet Color Correction
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x93"]
    - name: gain_data
      type: string
      description: "UNRESOLVED: gain range and list serialization. Each command can handle 1~3 Gain data; Cabinet Gain High and Low carry R/G/B selection and Cabinet Gain Data. Reserved bits can be 0 or 1."
  command: "0xD0"

- id: set_cabinet_backlight
  label: Set Cabinet Backlight
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x94"]
    - name: value
      type: integer
      min: 0
      max: 10
      description: "0x00 ~ 0x0A( 0 ~ 10)"
  command: "0xD0"

- id: set_cabinet_pixel_cc
  label: Set Cabinet Pixel Color Correction
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x95"]
    - name: state
      type: enum
      values: ["0x00", "0x01"]
      description: "Off, On"
  command: "0xD0"

- id: set_cabinet_gamut
  label: Set Cabinet Gamut
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x96"]
    - name: gamut
      type: enum
      values: ["0x00", "0x01", "0x02", "0x03"]
      description: "Natural(Or Custom) (off), S-RGB(or BT.709), Adobe RGB, DCI-P3"
  command: "0xD0"

- id: set_cabinet_seam_correction
  label: Set Cabinet Seam Correction
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x97"]
    - name: module_id
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
    - name: reset
      type: enum
      values: [1, 0]
      description: "1-Reset, 0-Do Nothing"
    - name: edge
      type: enum
      values: ["0x00", "0x01", "0x02", "0x03", "0x04"]
      description: "Up side edge, Left side edge, Bottom side edge, Right side edge, All edge"
    - name: correction_data
      type: string
      description: "UNRESOLVED: correction range and list serialization. Each command can handle 1 or 4 Edge Correction data, high byte then low byte. Type1 packs Module Info; Type2 sends Module ID and Module Edgeinfo separately. Reset bit with Edge Info 0x0F resets all edges of the module; 0xff resets all modules."
  command: "0xD0"

- id: set_cabinet_seam_correction_enabled
  label: Set Cabinet Seam Correction Enabled
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x98"]
    - name: state
      type: enum
      values: ["0x00", "0x01"]
      description: "Off, On"
  command: "0xD0"

- id: set_module_white_balance_enabled
  label: Set Module White Balance Enabled
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x99"]
    - name: state
      type: enum
      values: ["0x00", "0x01"]
      description: "Off, On"
  command: "0xD0"

- id: reload_cabinet_data
  label: Reload Cabinet Data
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x9A"]
    - name: data_type
      type: enum
      values: ["0x01", "0x02", "0x03", "0x04"]
      description: "Pixel RGB, Over Voltage Count, LOD, RM Data"
  command: "0xD0"

- id: set_block_white_balance
  label: Set Block White Balance
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x9B"]
    - name: color_mode
      type: enum
      values: ["0x00", "0x01"]
      description: "low, high"
    - name: module_id
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
    - name: block_data
      type: string
      description: "UNRESOLVED: block ID range, gain range and list serialization. Block ID contains Reset; Reset when data is 1. Block records contain BlockID and RGB gain high/low bytes. 0xff in the Block ID position is the documented reset form."
  command: "0xD0"

- id: set_cabinet_white_balance
  label: Set Cabinet White Balance
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x9C"]
    - name: x
      type: enum
      values: [0, 1, 2, 3]
      description: "Red = 0, Green = 1, Blue = 2, All Y Line = 3"
    - name: y
      type: enum
      values: [0, 1, 2, 3]
      description: "Red = 0, Green = 1, Blue = 2, All X Line = 3"
    - name: gain_data
      type: string
      description: "UNRESOLVED: gain range and list serialization. CabinetCC Position precedes Cabinet Gain high/low bytes; 0xff resets Cabinet CC to default."
  command: "0xD0"

- id: set_block_white_balance_enabled
  label: Set Block White Balance Enabled
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x9D"]
    - name: state
      type: enum
      values: ["0x00", "0x01"]
      description: "Off, On"
  command: "0xD0"

- id: set_cabinet_white_balance_enabled
  label: Set Cabinet White Balance Enabled
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x9E"]
    - name: state
      type: enum
      values: ["0x00", "0x01"]
      description: "Off, On"
  command: "0xD0"

- id: set_multiple_edge_offset
  label: Set Multiple Edge Offset
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x9F"]
    - name: information
      type: enum
      values: ["0x00", "0x01", "0x02"]
      description: "Preview, Apply, Clear"
    - name: offset
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "Edge seam correction offset data(Signed integer), high byte then low byte; omitted for Clear"
    - name: module_edges
      type: string
      description: "UNRESOLVED: module ID range and list serialization. Repeated Module ID/Edge Info pairs; Edge Info bits are Bottom, Right, Left, Top in bits 3..0; Left is 0x02, Bottom is 0x08. Omitted for Clear."
  command: "0xD0"

- id: set_block_gradation
  label: Set Block Gradation
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0xA2"]
    - name: module_id
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
    - name: block_data
      type: string
      description: "UNRESOLVED: block ID range, gradation range and list serialization. Repeated Block ID and Block Gradation Red/Green/Blue high/low bytes; Module ID followed by 0xff is the reset-all-blocks form."
  command: "0xD0"

- id: set_block_gradation_enabled
  label: Set Block Gradation Enabled
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0xA3"]
    - name: state
      type: enum
      values: ["0x00", "0x01"]
      description: "Off, On; UNRESOLVED: source query table gives 0x03 data length with no payload beyond the subcommand"
  command: "0xD0"

- id: start_led_auto_id
  label: Start LED Auto ID
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0xC3"]
    - name: value
      type: enum
      values: ["0x01"]
      description: "First device ID is fixed as 2"
  command: "0xD0"

- id: download_file
  label: Download File
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x20"]
    - name: download_mode
      type: enum
      values: ["0x00"]
      description: Download Only
    - name: file_type
      type: enum
      values: ["0x0000", "0x0001"]
      description: "802.1x Authentification - Root, 802.1x Authentification - Client"
    - name: file_name
      type: string
      description: "Preceded by File Name Length; maximum length UNRESOLVED"
    - name: file_data
      type: string
      description: "UNRESOLVED: binary data representation and File Data Length field width. This command uses Data Length High/Low rather than the ordinary one-byte data length."
  command: "0xD2"

- id: set_net_pip
  label: Set Net PIP
  kind: action
  params:
    - name: state
      type: enum
      values: ["0x00", "0x01"]
      description: "PIP Off, PIP On; Off sends only this byte, On uses data length 0x14 and the following fields"
    - name: horizontal_position
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "High byte then low byte; must not exceed panel H, V size"
    - name: vertical_position
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "High byte then low byte; must not exceed panel H, V size"
    - name: horizontal_size
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "High byte then low byte; must not exceed panel H, V size"
    - name: vertical_size
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "High byte then low byte; must not exceed panel H, V size"
    - name: source
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: Input table of Command 0x14
    - name: tv_channel
      type: integer
      min: 0
      max: 99
      description: "460Txn Only; Platform LFD don’t use this byte"
    - name: sound_select
      type: enum
      values: ["0x00", "0x01"]
      description: "MagicInfo Sound, PIP Sound"
    - name: country
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "0 : Korea, 1 : U.S.A, ..."
    - name: atv_dtv
      type: enum
      values: [0, 1]
      description: "0 : Analog TV, 1 : Digital TV"
    - name: air_cable
      type: enum
      values: [0, 1]
      description: "0 : Air, 1 : Cable"
    - name: channel
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "Analog TV : 1 ~ 135, Digital TV : 0 ~ 999; high byte then low byte"
    - name: select_minor
      type: enum
      values: [0, 1]
      description: "0 : Enable, 1 : Disable; DTV Only"
    - name: minor_channel
      type: integer
      min: 0
      max: 999
      description: "High byte then low byte; DTV Only. Channel bytes 0xFF, select_minor 0x01 and minor-channel bytes 0xFF tune the last remembered TV channel."
  command: "0xE0"

- id: set_video_wall_apply_to
  label: Set Video Wall Apply To
  kind: action
  params:
    - name: status
      type: enum
      values: ["0x00", "0x01"]
      description: "Current Source, MagicInfo Player S"
  command: "0xE4"

- id: set_panel_state
  label: Set Panel State
  kind: action
  params:
    - name: state
      type: enum
      values: ["0x01", "0x00"]
      description: "PANEL OFF, PANEL ON"
  command: "0xF9"

- id: set_auto_id_data_path
  label: Set Auto ID Data Path
  kind: action
  params:
    - name: rs_status
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "Bit4: 1 Initialize Monitor ID to 0. Bit0: 1 RS232 Loop Out Disable, 0 RS232 Loop Out Enable. Other bits shown as 0."
    - name: monitor_id
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "Change ID(1~253); M_ID 0 preserves the previous ID; ignored when reset bit is set; actual range depends on product"
  command: "0xFD"

- id: set_white_balance_mode
  label: Set White Balance Mode
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x62"]
    - name: mode
      type: enum
      values: ["0x00", "0x01"]
      description: "Custom, Color Expert"
  command: "0xFE"

- id: set_white_balance_component
  label: Set White Balance Component
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x81", "0x91", "0xA1", "0xB1", "0xC1", "0xD1"]
      description: "Red Gain, Green Gain, Blue Gain, Red Offset, Green Offset, Blue Offset"
    - name: value
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: "Value range/default value can differ by product specification"
  command: "0xFE"

- id: save_white_balance_from_magicnet
  label: Save White Balance From MagicNet
  kind: action
  params:
    - name: sub_command
      type: enum
      values: ["0x02"]
    - name: source
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
      description: Input table of Command 0x14
    - name: red_gain
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
    - name: green_gain
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
    - name: blue_gain
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
    - name: red_offset
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
    - name: green_offset
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
    - name: blue_offset
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
    - name: sub_bright
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
    - name: sub_contrast
      type: integer
      min: UNRESOLVED
      max: UNRESOLVED
  command: "0xFE"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: ["off", "on"]
  query_command: "0xAA 0x11 <ID> 0x00 <checksum>"
  response: "ACK 0xAA 0xFF <ID> 0x03 'A' 0x11 <power>"

- id: volume_level
  type: integer
  min: 0
  max: 100
  query_command: "0xAA 0x12 <ID> 0x00 <checksum>"
  response: "ACK 0xAA 0xFF <ID> 0x03 'A' 0x12 <volume>"

- id: mute_state
  type: enum
  values: ["off", "on"]
  query_command: "0xAA 0x13 <ID> 0x00 <checksum>"
  response: "ACK 0xAA 0xFF <ID> 0x03 'A' 0x13 <mute>"

- id: input_source
  type: enum
  values: [pc, dvi, hdmi1, hdmi2, hdmi3, hdmi4, displayport1, displayport2, displayport3, av, component, magicinfo, media, hdbaset]
  query_command: "0xAA 0x14 <ID> 0x00 <checksum>"
  response: "ACK 0xAA 0xFF <ID> 0x03 'A' 0x14 <input>"

- id: device_status
  type: multi
  description: "Combined status from 0x00: power, volume, mute, input, aspect, timer info"
  query_command: "0xAA 0x00 <ID> 0x00 <checksum>"
  response: "ACK with power, volume, mute, input, aspect, timer fields"

- id: display_status
  type: multi
  description: "Lamp error, temperature error, brightness sensor error, sync error, current temp, fan error"
  query_command: "0xAA 0x0D <ID> 0x00 <checksum>"
  response: "ACK with lamp_error, temp_error, bright_sensor_error, no_sync_error, cur_temp, fan_error"

- id: video_settings
  type: multi
  description: "Contrast, brightness, sharpness, color, tint, color tone, color temp"
  query_command: "0xAA 0x04 <ID> 0x00 <checksum>"

- id: rgb_settings
  type: multi
  description: "RGB contrast, brightness, color tone, color temp, red/green/blue gain"
  query_command: "0xAA 0x06 <ID> 0x00 <checksum>"

- id: sound_settings
  type: multi
  description: "Volume, balance, EQ bands (100Hz-10kHz), SRS"
  query_command: "0xAA 0x09 <ID> 0x00 <checksum>"

- id: serial_number
  type: string
  query_command: "0xAA 0x0B <ID> 0x00 <checksum>"

- id: sw_version
  type: string
  query_command: "0xAA 0x0E <ID> 0x00 <checksum>"

- id: model_number
  type: multi
  description: "Panel type, model number code, TV support"
  query_command: "0xAA 0x10 <ID> 0x00 <checksum>"

- id: model_name
  type: string
  query_command: "0xAA 0x8A <ID> 0x00 <checksum>"

- id: screen_size
  type: integer
  description: Screen diagonal in inches
  query_command: "0xAA 0x19 <ID> 0x00 <checksum>"

- id: panel_on_time
  type: integer
  description: "Panel on time (increments every 10 min, high+low byte)"
  query_command: "0xAA 0x83 <ID> 0x00 <checksum>"

- id: light_sensor
  type: integer
  description: Light sensor lux value (high+low byte)
  query_command: "0xAA 0x50 <ID> 0x01 0x00 <checksum>"

- id: heatex_temperature
  type: integer
  min: -60
  max: 125
  unit: celsius
  query_command: "0xAA 0x50 <ID> 0x01 0x01 <checksum>"

- id: led_plate_temperature
  type: integer
  min: -60
  max: 125
  unit: celsius
  query_command: "0xAA 0x50 <ID> 0x01 0x02 <checksum>"

- id: final_duty
  type: integer
  min: 0
  max: 1023
  query_command: "0xAA 0x50 <ID> 0x01 0x03 <checksum>"

- id: pip_status
  type: multi
  description: "PIP size, PIP source"
  query_command: "0xAA 0x07 <ID> 0x00 <checksum>"

- id: maintenance_status
  type: multi
  description: "Power, PIP, lamp schedule, burn protection, video wall config"
  query_command: "0xAA 0x08 <ID> 0x00 <checksum>"

- id: network_config
  type: multi
  description: "IP address, subnet mask, gateway, DNS server"
  query_command: "0xAA 0x1B <ID> 0x01 0x82 <checksum>"

- id: network_ip_mode
  type: enum
  values: [dynamic, static]
  query_command: "0xAA 0x1B <ID> 0x01 0x85 <checksum>"

- id: mdc_connection_type
  type: enum
  values: [rs232c, rj45]
  query_command: "0xAA 0x1D <ID> 0x00 <checksum>"

- id: pc_module_detection
  type: enum
  values: ["0x00", "0x01", "0x02"]
  description: "Not Detected, MagicInfo, Plug In Module; ordinary query data length 0x00"
  query_command: "0x66"

- id: module_software_versions
  type: multi
  description: "System Configuration subcommand 0xA4; query data length 0x01; returns Number Of SW Ver Data and typed length-prefixed software version strings for HW modules"
  query_command: "0x1B"

- id: holiday_schedule
  type: multi
  description: "Query data length 0x00 requests Total Number of Holiday; data length 0x01 with Index requests Each holiday schedule. Index range UNRESOLVED. Reply contains Index, Month1, Day1, Month2, Day2. All date values 0 mean a count reply; 0xFF means the requested index has no holiday."
  query_command: "0xA9"

- id: sbox_mode
  type: enum
  values: ["0x00", "0x01"]
  description: "Indoor, Outdoor; System Menu Control subcommand 0x60; query data length 0x01"
  query_command: "0xCA"

- id: led_information
  type: multi
  description: "LED Product Feature subcommand 0x78; query data length 0x01; returns LED Info Type, cabinet gamut/backlight/CC, module CC, seam correction, dynamic peaking and software version data"
  query_command: "0xD0"

- id: led_device_type
  type: enum
  values: ["0x00", "0x01", "0x02", "0x03", "0x04", "0x05", "0x06", "0x07"]
  description: "Reserved, SendBox, Cabinet IS / IFH / IFH-D, Cabinet IFJ( H2in1), Cabinet IWJ, Cabinet IWR, Cabinet IER, WALL 2.0; LED Product Feature subcommand 0x81; query data length 0x01"
  query_command: "0xD0"

- id: led_input_source_info
  type: multi
  description: "LED Product Feature subcommand 0x82; query data length 0x01; returns Source List, Connection Status, Current Source, Res Width and Res Height"
  query_command: "0xD0"

- id: led_product_information
  type: multi
  description: "LED Product Feature subcommand 0x83; query data length 0x01; returns Pitch, Resolution, Phy size, Aspect Ratio and Modules"
  query_command: "0xD0"

- id: led_monitoring
  type: multi
  description: "LED Product Feature subcommand 0x84; query data length 0x01; returns Power&IC, HDBT Status, Temperature 0~254 (℃), Illuminance 0~100 and optional per-module LED error data"
  query_command: "0xD0"

- id: led_diagnosis_information
  type: multi
  description: "LED Product Feature subcommand 0xC2; query data length 0x01; returns Diagnosis Info Type and combined product information, ABL mode, auto source switch, OSD, monitoring and module errors"
  query_command: "0xD0"
```

## Variables
```yaml
- id: volume
  type: integer
  min: 0
  max: 100
  command: 0x12

- id: contrast
  type: integer
  min: 0
  max: 100
  command: 0x24

- id: brightness
  type: integer
  min: 0
  max: 100
  command: 0x25

- id: sharpness
  type: integer
  min: 0
  max: 100
  command: 0x26

- id: color
  type: integer
  min: 0
  max: 100
  command: 0x27

- id: tint
  type: integer
  min: 0
  max: 100
  command: 0x28

- id: manual_lamp
  type: integer
  min: 0
  max: 100
  description: Backlight/lamp level
  command: 0x58

- id: fan_speed
  type: integer
  min: 0
  max: 100
  command: 0x44

- id: temperature_threshold
  type: integer
  min: 75
  max: 124
  unit: celsius
  description: Auto power-off temperature threshold
  command: 0x85

- id: eq_100hz
  type: integer
  min: 0
  max: 20
  command: 0x51

- id: eq_300hz
  type: integer
  min: 0
  max: 20
  command: 0x52

- id: eq_1khz
  type: integer
  min: 0
  max: 20
  command: 0x53

- id: eq_3khz
  type: integer
  min: 0
  max: 20
  command: 0x54

- id: eq_10khz
  type: integer
  min: 0
  max: 20
  command: 0x55
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - power_reboot
  - reset_all
interlocks:
  - "Power On via RJ45 requires re-connecting socket after 10 seconds"
  - "When Monitor is Power Off and connected by RJ45, must transmit WOL protocol instead of MDC for Power On (when Network Standby is Off)"
  - "Power On/Off commands must retry 3 times every 2 seconds until ACK; no ACK within 3 tries means failure"
# UNRESOLVED: specific power-on sequencing requirements for QMxxB not detailed beyond above
```

## Notes
- Protocol uses binary framing: Header (0xAA) + Command + ID + Data Length + Data + Checksum.
- Checksum = sum of all bytes excluding header, modulo 256 (two hex digits; discard overflow).
- Device ID range 0-253; ID 0xFE = broadcast to all devices (no ACK response).
- ACK format: 0xAA + 0xFF + ID + Data Length + 'A' (0x41) + r-CMD + data + checksum.
- NAK format: 0xAA + 0xFF + ID + 0x03 + 'N' (0x4E) + r-CMD + ERR + checksum.
- Not all commands supported on all models; unsupported fields return 0xFF.
- RS-232 cable limited to 4m distance; uses pins 2 (RxD), 3 (TxD), 5 (GND).
- Default TCP/IP address: 192.168.0.10, port 1515.
- Supports daisy-chain via RS-232 and mixed RJ45+RS-232 topologies.
- Supports up to 15x15 video wall configurations.
- Timers 1-7 support on/off scheduling with repeat/weekday/holiday apply.
- Safety screen burn protection: scroll, pixel, bar, eraser, all white, rolling bar, fading screen.

<!-- UNRESOLVED: exact QMxxB-specific command subset not enumerated; source covers entire Samsung MDC protocol range -->
<!-- UNRESOLVED: whether QMxxB supports outdoor mode, LED product features, or MagicInfo features -->
<!-- UNRESOLVED: maximum RS-232 daisy-chain device count for QMxxB specifically -->
<!-- UNRESOLVED: exact pixel shift parameters and safety screen timer ranges for QMxxB -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
  - image-us.samsung.com
  - support.justaddpower.com
  - aca.im
  - justaddpower.happyfox.com
source_urls:
  - https://raw.githubusercontent.com/vgavro/samsung-mdc/master/MDC-Protocol.pdf
  - https://image-us.samsung.com/SamsungUS/samsungbusiness/tv-ci-resources/Samsung-RS232-Control.pdf
  - https://support.justaddpower.com/kb/article/245-samsung-rs232-control-rs232c/
  - "https://aca.im/driver_docs/Samsung/MDC%20Protocol%202015%20v13.7c.pdf"
  - https://justaddpower.happyfox.com/kb/article/Samsung-RS232-Codes-RS232C
retrieved_at: 2026-05-14T19:50:54.646Z
last_checked_at: 2026-10-07T22:03:31.924Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T22:03:31.924Z
matched_actions: 219
action_count: 219
confidence: medium
summary: "All 219 action units match source commands with correct opcodes, sub-commands and values. Transport is supported and auth is left UNRESOLVED. Coverage is about 0.97. (20 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact QMxxB model variants not enumerated separately in source; source is a generic MDC protocol doc covering many Samsung LFD models"
- "firmware version compatibility not stated"
- "orientation codes are not stated in this command section\""
- "the Command Table additionally lists 0, 1 without meanings\""
- "prose states 0 ~ 3, but the table lists 0x03 Flashing, 0x04 Flash All, 0x05 Off\""
- "prose states 0 ~ 3, while the table defines 0x00 Solid, 0x01 Transparent, 0x02 Translucent\""
- "complete 0x0D field layout is not recoverable from the extracted tables\""
- "structured list serialization. Type1/Type2 use source/picture-size pairs for Sub Screen1,2 or 1,2,3; Type3 uses source bytes for Sub Screen0,1,2,3. Sources refer to 0x14; picture sizes are 0x09 Full(Screen Fit), 0x20 Original(Aspect Ratio).\""
- "brightness limit codes are not stated\""
- "source orientation codes are not stated in this command section\""
- "PIP orientation codes are not stated in this command section\""
- "the source reply tables use 0x83 instead of the request subcommand 0x85\""
- "request table prints data length 0x03e\""
- "overview calls this XOR Output Activation mode (Set Only), while the detailed section documents Scanning Rate Mode with a query\""
- "gain range and list serialization. Each command can handle 1~3 Gain data, high byte then low byte. Type1 packs Reset/Module ID/X/Y into Module Info; Type2 sends Module ID and Module Postion separately. Reset with X/Y 0x0F resets the module; all-module reset is 0xff for Type1 or 0xff,0xff for Type2.\""
- "gain range and list serialization. Each command can handle 1~3 Gain data; Cabinet Gain High and Low carry R/G/B selection and Cabinet Gain Data. Reserved bits can be 0 or 1.\""
- "correction range and list serialization. Each command can handle 1 or 4 Edge Correction data, high byte then low byte. Type1 packs Module Info; Type2 sends Module ID and Module Edgeinfo separately. Reset bit with Edge Info 0x0F resets all edges of the module; 0xff resets all modules.\""
- "block ID range, gain range and list serialization. Block ID contains Reset; Reset when data is 1. Block records contain BlockID and RGB gain high/low bytes. 0xff in the Block ID position is the documented reset form.\""
- "gain range and list serialization. CabinetCC Position precedes Cabinet Gain high/low bytes; 0xff resets Cabinet CC to default.\""
- "module ID range and list serialization. Repeated Module ID/Edge Info pairs; Edge Info bits are Bottom, Right, Left, Top in bits 3..0; Left is 0x02, Bottom is 0x08. Omitted for Clear.\""
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
