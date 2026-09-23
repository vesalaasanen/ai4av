---
spec_id: admin/optoma-n3751k
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma N3751K Control Spec"
manufacturer: Optoma
model_family: N3751K
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - N3751K
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - optoma.co.uk
source_urls:
  - https://www.optoma.co.uk/ContentStorage/Documents/60495d69-222c-4eed-9500-b840e92443b3.pdf
retrieved_at: 2026-09-15T10:18:58.010Z
last_checked_at: 2026-09-17T22:20:59.735Z
generated_at: 2026-09-17T22:20:59.735Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version not stated in source; no Get Firmware action rows captured beyond the GET command (covered below)."
  - "no discrete settable parameter documents a single named property beyond what Actions already cover."
  - "no multi-step sequences described in source."
  - "firmware compatibility range not stated in source; no documented safety interlock procedures beyond temperature-warning feedback."
verification:
  verdict: verified
  checked_at: 2026-09-17T22:20:59.735Z
  matched_actions: 113
  action_count: 113
  confidence: medium
  summary: "All 113 spec actions have hex tokens that appear verbatim in the SET/GET command tables; transport values (port 23, baud 9600, 8N1, no flow control) appear verbatim. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-15
---

# Optoma N3751K Control Spec

## Summary
RS-232 / LAN (RJ45 port 23) control for Optoma N3751K interactive flat panel display. ASCII command protocol with0x7E lead, two-byte device ID, command, space, variable, 0x0D terminator. Also exposes OMS JSONRPC on TCP 1688 and OMSL telnet on TCP 23.

<!-- UNRESOLVED: firmware version not stated in source; no Get Firmware action rows captured beyond the GET command (covered below). -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # power on/off/restart + standby mode commands present
- routable        # input source selection commands present
- queryable       # GET commands returning values present
- levelable       # volume / treble / bass / brightness / contrast / etc. present
```

## Actions
```yaml
- id: power_off label: Power Off
  kind: action
  command: "7E 30 30 30 30 20 30 0d"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "7E 30 30 30 30 20 31 0d"
  params: []

- id: restart
  label: Restart
  kind: action
  command: "7E 30 30 30 30 20 33 0d"
  params: []

- id: power_mode_eco
  label: Power Mode (Standby) Eco
  kind: action
  command: "7E 30 30 31 31 34 20 30 0d"
  params: []

- id: power_mode_active
  label: Power Mode (Standby) Active
  kind: action
  command: "7E 30 30 31 31 34 20 31 0d"
  params: []

- id: set_treble
  label: Set Treble
  kind: action
  command: "7E 30 30 39 35 20 {n} 0d"
  params:
    - name: n
      type: integer
      description: Treble value (0-100)

- id: set_bass
  label: Set Bass
  kind: action
  command: "7E 30 30 39 36 20 {n} 0d"
  params:
    - name: n
      type: integer
      description: Bass value (0-100)

- id: set_balance
  label: Set Balance
  kind: action
  command: "7E 30 30 39 39 20 {n} 0d"
  params:
    - name: n
      type: integer
      description: Balance value (0-100)

- id: set_contrast
  label: Set Contrast
  kind: action
  command: "7E 30 30 32 32 20 {n} 0d"
  params:
    - name: n
      type: integer
      description: Contrast value (0-100)

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "7E 30 30 32 31 20 {n} 0d"
  params:
    - name: n
      type: integer
      description: Brightness value (0-100)

- id: set_sound_mode_standard
  label: Sound Mode Standard
  kind: action
  command: "7E 30 30 32 35 32 20 31 0d"
  params: []

- id: set_sound_mode_meeting
  label: Sound Mode Meeting
  kind: action
  command: "7E 30 30 32 35 32 20 34 0d"
  params: []

- id: set_sound_mode_user
  label: Sound Mode User
  kind: action
  command: "7E 30 30 32 35 32 20 32 0d"
  params: []

- id: set_sound_mode_classroom
  label: Sound Mode Classroom
  kind: action
  command: "7E 30 30 32 35 32 20 33 0d"
  params: []

- id: set_sound_mode_movie
  label: Sound Mode Movie
  kind: action
  command: "7E 30 30 32 35 32 20 35 0d"
  params: []

- id: set_volume
  label: Set Volume
  kind: action
  command: "7E 30 30 38 31 20 {n} 0d"
  params:
    - name: n
      type: integer
      description: Volume value (0-100)

- id: video_mute_off
  label: Video Mute Off
  kind: action
  command: "7E 30 30 31 33 20 30 0d"
  params: []

- id: video_mute_on
  label: Video Mute On
  kind: action
  command: "7E 30 30 31 33 20 31 0d"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "7E 30 30 38 30 20 30 0d"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "7E 30 30 38 30 20 31 0d"
  params: []

- id: input_hdmi1
  label: Input Source HDMI1
  kind: action
  command: "7E 30 30 31 32 20 31 0d"
  params: []

- id: input_hdmi2
  label: Input Source HDMI2
  kind: action
  command: "7E 30 30 31 32 20 31 35 0d"
  params: []

- id: input_hdmi3
  label: Input Source HDMI3
  kind: action
  command: "7E 30 30 31 32 20 31 36 0d"
  params: []

- id: input_usb_type_c
  label: Input Source USB Type C
  kind: action
  command: "7E 30 30 31 32 20 32 37 0d"
  params: []

- id: input_slot_in_pc
  label: Input Source Slot in PC
  kind: action
  command: "7E 30 30 31 32 20 32 35 0d"
  params: []

- id: input_android
  label: Input Source Android
  kind: action
  command: "7E 30 30 31 32 20 32 34 0d"
  params: []

- id: aspect_4_3
  label: Aspect Ratio 4:3
  kind: action
  command: "7E 30 30 36 30 20 31 0d"
  params: []

- id: aspect_16_9
  label: Aspect Ratio 16:9
  kind: action
  command: "7E 30 30 36 30 20 32 0d"
  params: []

- id: aspect_ptp
  label: Aspect Ratio PTP
  kind: action
  command: "7E 30 30 36 30 20 31 34 0d"
  params: []

- id: language_english
  label: Language English
  kind: action
  command: "7E 30 30 37 30 20 31 0d"
  params: []

- id: language_french
  label: Language Français
  kind: action
  command: "7E 30 30 37 30 20 33 0d"
  params: []

- id: language_spanish
  label: Language Español
  kind: action
  command: "7E 30 30 37 30 20 35 0d"
  params: []

- id: language_traditional_chinese
  label: Language Traditional Chinese
  kind: action
  command: "7E 30 30 37 30 20 31 33 0d"
  params: []

- id: language_simplified_chinese
  label: Language Simplified Chinese
  kind: action
  command: "7E 30 30 37 30 20 31 34 0d"
  params: []

- id: language_portuguese
  label: Language Português
  kind: action
  command: "7E 30 30 37 30 20 36 0d"
  params: []

- id: language_german
  label: Language German
  kind: action
  command: "7E 30 30 37 30 20 32 0d"
  params: []

- id: language_dutch
  label: Language Dutch
  kind: action
  command: "7E 30 30 37 30 20 38 0d"
  params: []

- id: language_polish
  label: Language Polish
  kind: action
  command: "7E 30 30 37 30 20 37 0d"
  params: []

- id: language_russian
  label: Language Russian
  kind: action
  command: "7E 30 30 37 30 20 31 37 0d"
  params: []

- id: language_czech
  label: Language Czech
  kind: action
  command: "7E 30 30 37 30 20 31 39 0d"
  params: []

- id: language_danish
  label: Language Danish
  kind: action
  command: "7E 30 30 37 30 20 32 34 0d"
  params: []

- id: language_swedish
  label: Language Swedish
  kind: action
  command: "7E 30 30 37 30 20 39 0d"
  params: []

- id: language_italian
  label: Language Italian
  kind: action
  command: "7E 30 30 37 30 20 34 0d"
  params: []

- id: language_turkish
  label: Language Turkish
  kind: action
  command: "7E 30 30 37 30 20 32 32 0d"
  params: []

- id: language_arabic
  label: Language Arabic
  kind: action
  command: "7E 30 30 37 30 20 32 30 0d"
  params: []

- id: language_romanian
  label: Language Romanian
  kind: action
  command: "7E 30 30 37 30 20 32 37 0d"
  params: []

- id: language_hungarian
  label: Language Hungarian
  kind: action
  command: "7E 30 30 37 30 20 31 38 0d"
  params: []

- id: language_finnish
  label: Language Finnish
  kind: action
  command: "7E 30 30 37 30 20 31 31 0d"
  params: []

- id: language_norwegian
  label: Language Norwegian (Norge)
  kind: action
  command: "7E 30 30 37 30 20 31 30 0d"
  params: []

- id: picture_mode_presentation
  label: Picture Mode Presentation
  kind: action
  command: "7E 30 30 32 30 20 31 0d"
  params: []

- id: picture_mode_bright
  label: Picture Mode Bright
  kind: action
  command: "7E 30 30 32 30 20 32 0d"
  params: []

- id: picture_mode_cinema
  label: Picture Mode Cinema
  kind: action
  command: "7E 30 30 32 30 20 33 0d"
  params: []

- id: picture_mode_user
  label: Picture Mode User
  kind: action
  command: "7E 30 30 32 30 20 35 0d"
  params: []

- id: picture_mode_hdr
  label: Picture Mode HDR
  kind: action
  command: "7E 30 30 32 30 20 32 31 0d"
  params: []

- id: set_color
  label: Set Color
  kind: action
  command: "7E 30 30 34 35 20 {n} 0d"
  params:
    - name: n
      type: integer
      description: Color value (0-100)

- id: set_backlight
  label: Set Backlight
  kind: action
  command: "7E 30 30 32 35 31 20 {n} 0d"
  params:
    - name: n
      type: integer
      description: Backlight value (0-100)

- id: color_temp_cool
  label: Color Temp Cool
  kind: action
  command: "7E 30 30 33 36 20 32 0d"
  params: []

- id: color_temp_standard
  label: Color Temp Standard
  kind: action
  command: "7E 30 30 33 36 20 31 0d"
  params: []

- id: color_temp_warm
  label: Color Temp Warm
  kind: action
  command: "7E 30 30 33 36 20 34 0d"
  params: []

- id: freeze_unfreeze
  label: Freeze Unfreeze
  kind: action
  command: "7E 30 30 30 34 20 30 0d"
  params: []

- id: freeze_on
  label: Freeze On
  kind: action
  command: "7E 30 30 30 34 20 31 0d"
  params: []

- id: pixel_shift_off
  label: Pixel Shift Interval Off
  kind: action
  command: "7E 30 30 32 35 30 20 30 0d"
  params: []

- id: pixel_shift_2
  label: Pixel Shift Interval 2 min
  kind: action
  command: "7E 30 30 32 35 30 20 32 0d"
  params: []

- id: pixel_shift_3
  label: Pixel Shift Interval 3 min
  kind: action
  command: "7E 30 30 32 35 30 20 33 0d"
  params: []

- id: pixel_shift_5
  label: Pixel Shift Interval 5 min
  kind: action
  command: "7E 30 30 32 35 30 20 35 0d"
  params: []

- id: pixel_shift_30
  label: Pixel Shift Interval 30 min
  kind: action
  command: "7E 30 30 32 35 30 20 33 30 0d"
  params: []

- id: pixel_shift_60
  label: Pixel Shift Interval 60 min
  kind: action
  command: "7E 30 30 32 35 30 20 36 30 0d"
  params: []

- id: remote_vol_down
  label: Remote Vol -
  kind: action
  command: "7E 30 30 31 34 30 20 31 37 0d"
  params: []

- id: remote_vol_up
  label: Remote Vol +
  kind: action
  command: "7E 30 30 31 34 30 20 31 38 0d"
  params: []

- id: remote_up
  label: Remote UP
  kind: action
  command: "7E 30 30 31 34 30 20 31 30 0d"
  params: []

- id: remote_down
  label: Remote DOWN
  kind: action
  command: "7E 30 30 31 34 30 20 31 34 0d"
  params: []

- id: remote_left
  label: Remote LEFT
  kind: action
  command: "7E 30 30 31 34 30 20 31 31 0d"
  params: []

- id: remote_right
  label: Remote RIGHT
  kind: action
  command: "7E 30 30 31 34 30 20 31 33 0d"
  params: []

- id: remote_ok
  label: Remote OK
  kind: action
  command: "7E 30 30 31 34 30 20 31 32 0d"
  params: []

- id: remote_menu
  label: Remote Menu Key
  kind: action
  command: "7E 30 30 31 34 30 20 32 30 0d"
  params: []

- id: remote_input_source
  label: Remote Input Source
  kind: action
  command: "7E 30 30 31 34 30 20 34 37 0d"
  params: []

- id: remote_exit
  label: Remote Exit
  kind: action
  command: "7E 30 30 31 34 30 20 37 34 0d"
  params: []

- id: display_osd_message
  label: Display message on the OSD
  kind: action
  command: "7E 30 30 32 31 30 20 {nn…n} 0d"
  params:
    - name: nn…n
      type: string
      description: Message text to display on OSD

- id: reset_to_default
  label: Reset To Default
  kind: action
  command: "7E 30 30 31 31 32 20 31 0d"
  params: []

- id: osd_lock_on_with_password
  label: OSD Lock On With Password
  kind: action
  command: "7E 30 30 32 33 39 20 31 20 {a} 0d"
  params:
    - name: a
      type: string
      description: OSD lock password

- id: osd_lock_off_with_password
  label: OSD Lock Off With Password
  kind: action
  command: "7E 30 30 32 33 39 20 32 20 {a} 0d"
  params:
    - name: a
      type: string
      description: OSD lock password

- id: get_power
  label: Get Power
  kind: query
  command: "7E 30 30 31 32 34 20 31 0d"
  params: []

- id: get_contrast
  label: Get Contrast
  kind: query
  command: "7E 30 30 31 32 36 20 31 0d"
  params: []

- id: get_brightness
  label: Get Brightness
  kind: query
  command: "7E 30 30 31 32 35 20 31 0d"
  params: []

- id: get_volume
  label: Get Volume
  kind: query
  command: "7E 30 30 31 32 30 20 31 0d"
  params: []

- id: get_video_mute
  label: Get Video Mute
  kind: query
  command: "7E 30 30 33 36 33 20 31 0d"
  params: []

- id: get_mute
  label: Get Mute
  kind: query
  command: "7E 30 30 33 35 36 20 31 0d"
  params: []

- id: get_sound_mode
  label: Get Sound Mode
  kind: query
  command: "7E 30 30 31 33 39 20 31 0d"
  params: []

- id: get_input_source
  label: Get Input Source
  kind: query
  command: "7E 30 30 31 32 31 20 31 0d"
  params: []

- id: get_aspect_ratio
  label: Get Aspect Ratio
  kind: query
  command: "7E 30 30 31 32 37 20 31 0d"
  params: []

- id: get_picture_mode
  label: Get Picture Mode
  kind: query
  command: "7E 30 30 31 32 33 20 31 0d"
  params: []

- id: get_color_temp
  label: Get Color Temp
  kind: query
  command: "7E 30 30 31 32 38 20 31 0d"
  params: []

- id: get_wlan_status
  label: Get WLAN Status
  kind: query
  command: "7E 30 30 34 35 31 20 31 0d"
  params: []

- id: get_wlan_mac  label: Get WLAN Mac Address
  kind: query
  command: "7E 30 30 35 35 35 20 32 0d"
  params: []

- id: get_wlan_ip
  label: Get WLAN IP Address
  kind: query
  command: "7E 30 30 34 35 31 20 32 0d"
  params: []

- id: get_lan_status
  label: Get LAN Status
  kind: query
  command: "7E 30 30 38 37 20 31 0d"
  params: []

- id: get_lan_mac
  label: Get LAN Mac Address
  kind: query
  command: "7E 30 30 35 35 35 20 31 0d"
  params: []

- id: get_lan_ip
  label: Get LAN IP Address
  kind: query
  command: "7E 30 30 38 37 20 33 0d"
  params: []

- id: get_fw_version
  label: Get FW Version
  kind: query
  command: "7E 30 30 31 32 32 20 31 0d"
  params: []

- id: get_usage_hour
  label: Get Usage Hour
  kind: query
  command: "7E 30 30 31 30 38 20 31 0d"
  params: []

- id: get_device_type
  label: Get Device Type
  kind: query
  command: "7E 30 30 31 34 39 20 31 0d"
  params: []

- id: get_info_string
  label: Get Information String
  kind: query
  command: "7E 30 30 31 35 30 20 31 0d"
  params: []

- id: get_native_resolution
  label: Get Device Native Resolution
  kind: query
  command: "7E 30 30 31 35 30 20 32 0d"
  params: []

- id: get_input_source_info
  label: Get Current Input Source
  kind: query
  command: "7E 30 30 31 35 30 20 33 0d"
  params: []

- id: get_source_resolution
  label: Get Source Resolution
  kind: query
  command: "7E 30 30 31 35 30 20 34 0d"
  params: []

- id: get_power_mode_standby
  label: Get Power Mode (Standby)
  kind: query
  command: "7E 30 30 31 35 30 20 31 36 0d"
  params: []

- id: get_dhcp
  label: Get DHCP
  kind: query
  command: "7E 30 30 31 35 30 20 31 37 0d"
  params: []

- id: get_soc_temperature
  label: Get System (SoC) Temperature
  kind: query
  command: "7E 30 30 31 35 30 20 31 38 0d"
  params: []

- id: get_source_refresh_rate
  label: Get Source Refresh Rate
  kind: query
  command: "7E 30 30 31 35 30 20 31 39 0d"
  params: []

- id: get_regulatory_model_name
  label: Get Regulatory Model Name
  kind: query
  command: "7E 30 30 31 35 31 20 33 0d"
  params: []

- id: get_osd_lock
  label: Get OSD Lock
  kind: query
  command: "7E 30 30 32 32 39 20 31 0d"
  params: []

- id: get_serial_number
  label: Get Serial Number
  kind: query
  command: "7E 30 30 33 35 33 20 31 0d"
  params: []

- id: get_system_temperature_level
  label: Get System Temperature Level
  kind: query
  command: "7E 30 30 31 35 35 20 31 0d"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  notes: "Returned from GET power: OK0 = off, OK1 = on"

- id: contrast
  type: integer
  range: [0, 100]
  notes: "Returned from GET contrast"

- id: brightness
  type: integer
  range: [0, 100]
  notes: "Returned from GET brightness"

- id: volume
  type: integer
  range: [0, 100]
  notes: "Returned from GET volume"

- id: video_mute
  type: enum
  values: [off, on]
  notes: "OK0 = off, OK1 = on"

- id: mute
  type: enum
  values: [off, on]
  notes: "OK0 = off, OK1 = on"

- id: sound_mode
  type: enum
  values: [standard, user, classroom, meeting, movie]
  notes: "OK1..OK5 mapping"

- id: input_source
  type: enum
  values: [hdmi1, hdmi2, hdmi3, usb_type_c, android, slot_in_pc]
  notes: "OK7=HDMI1, OK8=HDMI2, OK9=HDMI3, OK23=USB Type C, OK20=Android, OK21=Slot in PC"

- id: aspect_ratio
  type: enum
  values: ["4:3", "16:9", ptp]
  notes: "OK1, OK2, OK14"

- id: picture_mode
  type: enum
  values: [presentation, bright, cinema, user, dicom_sim, hdr]
  notes: "OK1, OK2, OK3, OK5, OK10, OK21"

- id: color_temp
  type: enum
  values: [cool, standard, warm]
  notes: "OK1=Cool, OK0=Standard, OK3=Warm"

- id: wlan_status
  type: enum
  values: [disconnected, connected]

- id: lan_status
  type: enum
  values: [disconnected, connected]

- id: power_mode_standby
  type: enum
  values: [eco, active]
  notes: "OK0=Eco, OK1=Active"

- id: dhcp
  type: enum
  values: [off, on]
  notes: "OK0=Off, OK1=On"

- id: system_temperature_level
  type: enum
  values: [green_normal, orange_notice, red_warning]
  notes: "OK1, OK2, OK3 - OK3 = about to trigger shutdown"

- id: osd_lock
  type: enum
  values: [off, on]
  notes: "OK0, OK1"

- id: serial_number
  type: string

- id: fw_version
  type: string
  notes: "Returned as OKnnnnnnnnnnnnnnn (e.g. 20190926164814)"

- id: usage_hour
  type: integer
  notes: "Hours of usage"

- id: device_type
  type: enum
  values: [fp]
  notes: "OK4 = Flat Panel"

- id: mac_address_lan
  type: string
  pattern: "^[0-9a-fA-F]{2}(:[0-9a-fA-F]{2}){5}$"

- id: mac_address_wlan
  type: string
  pattern: "^[0-9a-fA-F]{2}(:[0-9a-fA-F]{2}){5}$"

- id: ip_address_lan
  type: string
  pattern: "^\\d{1,3}(\\.\\d{1,3}){3}$"

- id: ip_address_wlan
  type: string
  pattern: "^\\d{1,3}(\\.\\d{1,3}){3}$"

- id: soc_temperature
  type: integer

- id: source_refresh_rate
  type: string
  notes: "Returned e.g. OK60Hz"

- id: source_resolution
  type: string
  notes: "Returned e.g. OK1920x1080"

- id: native_resolution
  type: integer

- id: regulatory_model_name
  type: string- id: command_success
  type: enum
  values: [P, F]
  notes: "P = Pass, F = Fail (response to any SET command)"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameter documents a single named property beyond what Actions already cover.
```

## Events
```yaml
- id: standby_mode
  payload: "INFO0"
  notes: "Auto-send when entering standby"

- id: warming_up
  payload: "INFO1"
  notes: "Auto-send during warm-up"

- id: cooling_down
  payload: "INFO2"
  notes: "Auto-send during cool-down"

- id: over_temperature
  payload: "INFO7"
  notes: "Auto-send on over-temperature event"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: "System Temperature Level Red (OK3) indicates about-to-trigger shutdown per source."
```

## Notes
Command format (RS-232 / LAN port 23): `~xxNN n` where `~` = 0x7E lead, `xx` = two-byte ASCII device ID (e.g. `3030` =00), `NN` = two-digit ASCII command code, space, `n` = ASCII variable, `0x0D` terminator. Successful SET commands return `P`; failed return `F`. GET commands return `OK<value>0x0D`.

LAN control uses identical command framing on TCP port 23.

Additional ports exposed per the Port Information table: OMS Local Advanced Command (JSONRPC) on TCP 1688 inbound; OMSL telnet on TCP 23 inbound; Creative Cast WCP Control Plane TCP 3140; mDNS/Airplay UDP 5353; plus numerous outbound service ports. These interfaces are not enumerated as actions in this spec.

<!-- UNRESOLVED: firmware compatibility range not stated in source; no documented safety interlock procedures beyond temperature-warning feedback. -->

## Provenance

```yaml
source_domains:
  - optoma.co.uk
source_urls:
  - https://www.optoma.co.uk/ContentStorage/Documents/60495d69-222c-4eed-9500-b840e92443b3.pdf
retrieved_at: 2026-09-15T10:18:58.010Z
last_checked_at: 2026-09-17T22:20:59.735Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-17T22:20:59.735Z
matched_actions: 113
action_count: 113
confidence: medium
summary: "All 113 spec actions have hex tokens that appear verbatim in the SET/GET command tables; transport values (port 23, baud 9600, 8N1, no flow control) appear verbatim. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version not stated in source; no Get Firmware action rows captured beyond the GET command (covered below)."
- "no discrete settable parameter documents a single named property beyond what Actions already cover."
- "no multi-step sequences described in source."
- "firmware compatibility range not stated in source; no documented safety interlock procedures beyond temperature-warning feedback."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
