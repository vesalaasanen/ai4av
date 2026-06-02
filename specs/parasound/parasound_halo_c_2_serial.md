---
spec_id: admin/parasound-halo-c-2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Parasound HALO C 2 Control Spec"
manufacturer: Parasound
model_family: "Halo C 2"
aliases: []
compatible_with:
  manufacturers:
    - Parasound
  models:
    - "Halo C 2"
    - "Halo C 1"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.shopify.com
source_urls:
  - "https://cdn.shopify.com/s/files/1/0763/0864/4159/files/C1_C2_RS232Codes.pdf?v=1719694110"
retrieved_at: 2026-05-21T16:56:39.590Z
last_checked_at: 2026-05-31T07:00:29.370Z
generated_at: 2026-05-31T07:00:29.370Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no safety warnings or interlock procedures found in source"
  - "firmware version compatibility not stated in source"
  - "maximum command rate / minimum inter-command delay not stated"
  - "error recovery or timeout behavior not documented"
  - "no TCP/IP control documented — serial only"
verification:
  verdict: verified
  checked_at: 2026-05-31T07:00:29.370Z
  matched_actions: 108
  action_count: 108
  confidence: medium
  summary: "All 108 spec actions matched literal command codes from source; transport parameters verified; source command set fully represented. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Parasound HALO C 2 Control Spec

## Summary
Parasound Halo C 2 and C 1 surround controllers with RS-232C serial control. Binary protocol at 9600 baud with fixed RS-Enable preamble required before every command. Covers power, volume, source selection, surround modes, tone/speaker trim, zone control, tape monitoring, setup menu navigation, and full status query with unsolicited feedback.

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
  pinout:
    txd: 2
    rxd: 3
    gnd: 5
  cable: "DB9 straight-through (NOT null modem)"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: power on/off/toggle commands
  - queryable    # inferred: full status report query + unsolicited feedback
  - levelable    # inferred: volume, bass, treble, trim controls
  - routable     # inferred: source selection commands
```

## Preamble
```yaml
preamble:
  description: "RS Enable command must precede every command (except full status query)"
  decimal: [224, 82, 83, 33]
  hex: [0xE0, 0x52, 0x53, 0x21]
  note: "No carriage returns required. No spaces/line feeds between bytes."
```

## Actions
```yaml
actions:
  # Power Control
  - id: power_off
    label: Power Off (Standby)
    kind: action
    params: []
    decimal: [34]
    hex: [0x22]

  - id: power_on
    label: Power On
    kind: action
    params: []
    decimal: [35]
    hex: [0x23]

  - id: power_toggle
    label: Power Toggle
    kind: action
    params: []
    decimal: [6]
    hex: [0x06]

  # Volume Control
  - id: volume_plus
    label: Volume Plus
    kind: action
    params: []
    decimal: [53]
    hex: [0x35]

  - id: volume_minus
    label: Volume Minus
    kind: action
    params: []
    decimal: [54]
    hex: [0x36]

  - id: mute_toggle
    label: Mute Toggle
    kind: action
    params: []
    decimal: [7]
    hex: [0x07]

  - id: mute_on
    label: Mute On
    kind: action
    params: []
    decimal: [32]
    hex: [0x20]

  - id: mute_off
    label: Mute Off
    kind: action
    params: []
    decimal: [33]
    hex: [0x21]

  # Source Selection
  - id: source_plus
    label: Source Plus
    kind: action
    params: []
    decimal: [8]
    hex: [0x08]

  - id: source_minus
    label: Source Minus
    kind: action
    params: []
    decimal: [9]
    hex: [0x09]

  - id: source_video_1
    label: Source Video 1
    kind: action
    params: []
    decimal: [13]
    hex: [0x0D]

  - id: source_video_2
    label: Source Video 2
    kind: action
    params: []
    decimal: [14]
    hex: [0x0E]

  - id: source_video_3
    label: Source Video 3
    kind: action
    params: []
    decimal: [15]
    hex: [0x0F]

  - id: source_video_4
    label: Source Video 4
    kind: action
    params: []
    decimal: [16]
    hex: [0x10]

  - id: source_video_5
    label: Source Video 5
    kind: action
    params: []
    decimal: [17]
    hex: [0x11]

  - id: source_video_6
    label: Source Video 6
    kind: action
    params: []
    decimal: [18]
    hex: [0x12]

  - id: source_audio_1
    label: Source Audio 1
    kind: action
    params: []
    decimal: [19]
    hex: [0x13]

  - id: source_audio_2
    label: Source Audio 2
    kind: action
    params: []
    decimal: [20]
    hex: [0x14]

  - id: source_audio_3
    label: Source Audio 3
    kind: action
    params: []
    decimal: [72]
    hex: [0x48]

  - id: source_audio_4
    label: Source Audio 4
    kind: action
    params: []
    decimal: [73]
    hex: [0x49]

  - id: source_analog_71
    label: Source Analog 7.1
    kind: action
    params: []
    decimal: [100]
    hex: [0x64]

  - id: source_analog_71_toggle
    label: Source Analog 7.1 Toggle
    kind: action
    params: []
    decimal: [136]
    hex: [0x88]

  - id: source_auto_search
    label: Active Source Auto Search
    kind: action
    params: []
    decimal: [144]
    hex: [0x90]

  # Surround Mode Selection
  - id: surround_minus
    label: Surround Mode Minus
    kind: action
    params: []
    decimal: [10]
    hex: [0x0A]

  - id: surround_plus
    label: Surround Mode Plus
    kind: action
    params: []
    decimal: [11]
    hex: [0x0B]

  - id: surround_mono
    label: Mono
    kind: action
    params: []
    decimal: [42]
    hex: [0x2A]

  - id: surround_stereo
    label: Stereo
    kind: action
    params: []
    decimal: [43]
    hex: [0x2B]

  - id: surround_prologic
    label: Prologic
    kind: action
    params: []
    decimal: [44]
    hex: [0x2C]

  - id: surround_natural
    label: Natural
    kind: action
    params: []
    decimal: [45]
    hex: [0x2D]

  - id: surround_party
    label: Party
    kind: action
    params: []
    decimal: [46]
    hex: [0x2E]

  - id: surround_club
    label: Club
    kind: action
    params: []
    decimal: [47]
    hex: [0x2F]

  - id: surround_concert
    label: Concert
    kind: action
    params: []
    decimal: [48]
    hex: [0x30]

  - id: surround_plii_movie
    label: Prologic II/IIx Movie
    kind: action
    params: []
    decimal: [160]
    hex: [0xA0]

  - id: surround_plii_music
    label: Prologic II/IIx Music
    kind: action
    params: []
    decimal: [161]
    hex: [0xA1]

  - id: surround_neo6_cinema
    label: DTS Neo6 Cinema
    kind: action
    params: []
    decimal: [162]
    hex: [0xA2]

  - id: surround_dtses_matrix
    label: DTS ES Matrix
    kind: action
    params: []
    decimal: [163]
    hex: [0xA3]

  - id: surround_direct
    label: Direct
    kind: action
    params: []
    decimal: [164]
    hex: [0xA4]

  - id: surround_neo6_music
    label: DTS Neo6 Music
    kind: action
    params: []
    decimal: [167]
    hex: [0xA7]

  - id: surround_dolby_ex
    label: Dolby EX
    kind: action
    params: []
    decimal: [168]
    hex: [0xA8]

  - id: surround_stereo_96
    label: Stereo 96
    kind: action
    params: []
    decimal: [169]
    hex: [0xA9]

  - id: late_night_on
    label: Late Night On (DYN)
    kind: action
    params: []
    decimal: [37]
    hex: [0x25]

  - id: late_night_off
    label: Late Night Off (DYN)
    kind: action
    params: []
    decimal: [38]
    hex: [0x26]

  - id: late_night_toggle
    label: Late Night Toggle (DYN)
    kind: action
    params: []
    decimal: [12]
    hex: [0x0C]

  - id: cinema_eq_toggle
    label: Cinema EQ Toggle
    kind: action
    params: []
    decimal: [99]
    hex: [0x63]

  - id: thx_toggle
    label: THX Toggle
    kind: action
    params: []
    decimal: [27]
    hex: [0x1B]

  # Tone and Speaker Trim
  - id: bass_plus
    label: Bass Plus
    kind: action
    params: []
    decimal: [68]
    hex: [0x44]

  - id: bass_minus
    label: Bass Minus
    kind: action
    params: []
    decimal: [69]
    hex: [0x45]

  - id: treble_plus
    label: Treble Plus
    kind: action
    params: []
    decimal: [70]
    hex: [0x46]

  - id: treble_minus
    label: Treble Minus
    kind: action
    params: []
    decimal: [71]
    hex: [0x47]

  - id: subwoofer_plus
    label: Subwoofer Plus
    kind: action
    params: []
    decimal: [97]
    hex: [0x61]

  - id: subwoofer_minus
    label: Subwoofer Minus
    kind: action
    params: []
    decimal: [98]
    hex: [0x62]

  - id: surround_trim_plus
    label: Surround Trim Plus
    kind: action
    params: []
    decimal: [131]
    hex: [0x83]

  - id: surround_trim_minus
    label: Surround Trim Minus
    kind: action
    params: []
    decimal: [132]
    hex: [0x84]

  - id: center_plus
    label: Center Trim Plus
    kind: action
    params: []
    decimal: [129]
    hex: [0x81]

  - id: center_minus
    label: Center Trim Minus
    kind: action
    params: []
    decimal: [130]
    hex: [0x82]

  - id: preset_1
    label: Preset 1
    kind: action
    params: []
    decimal: [124]
    hex: [0x7C]

  - id: preset_2
    label: Preset 2
    kind: action
    params: []
    decimal: [125]
    hex: [0x7D]

  - id: preset_3
    label: Preset 3
    kind: action
    params: []
    decimal: [126]
    hex: [0x7E]

  - id: preset_4
    label: Preset 4
    kind: action
    params: []
    decimal: [127]
    hex: [0x7F]

  - id: preset_5
    label: Preset 5
    kind: action
    params: []
    decimal: [128]
    hex: [0x80]

  - id: enhanced_bass_on
    label: Enhanced Bass On
    kind: action
    params: []
    decimal: [156]
    hex: [0x9C]

  - id: enhanced_bass_off
    label: Enhanced Bass Off
    kind: action
    params: []
    decimal: [157]
    hex: [0x9D]

  - id: enhanced_bass_toggle
    label: Enhanced Bass Toggle
    kind: action
    params: []
    decimal: [133]
    hex: [0x85]

  # Zone Control
  - id: zone_off
    label: Zone Off
    kind: action
    params: []
    decimal: [4]
    hex: [0x04]

  - id: zone_on
    label: Zone On
    kind: action
    params: []
    decimal: [5]
    hex: [0x05]

  - id: zone_toggle
    label: Zone On/Off Toggle
    kind: action
    params: []
    decimal: [134]
    hex: [0x86]

  - id: zone_volume_plus
    label: Zone Volume Plus
    kind: action
    params: []
    decimal: [139]
    hex: [0x8B]

  - id: zone_volume_minus
    label: Zone Volume Minus
    kind: action
    params: []
    decimal: [140]
    hex: [0x8C]

  - id: zone_mute_on
    label: Zone Mute On
    kind: action
    params: []
    decimal: [158]
    hex: [0x9E]

  - id: zone_mute_off
    label: Zone Mute Off
    kind: action
    params: []
    decimal: [159]
    hex: [0x9F]

  - id: zone_mute_toggle
    label: Zone Mute Toggle
    kind: action
    params: []
    decimal: [165]
    hex: [0xA5]

  - id: zone_source_minus
    label: Zone Source Minus
    kind: action
    params: []
    decimal: [135]
    hex: [0x87]

  - id: zone_source_plus
    label: Zone Source Plus
    kind: action
    params: []
    decimal: [141]
    hex: [0x8D]

  - id: zone_source_video_1
    label: Zone Source Video 1
    kind: action
    params: []
    decimal: [74]
    hex: [0x4A]

  - id: zone_source_video_2
    label: Zone Source Video 2
    kind: action
    params: []
    decimal: [75]
    hex: [0x4B]

  - id: zone_source_video_3
    label: Zone Source Video 3
    kind: action
    params: []
    decimal: [76]
    hex: [0x4C]

  - id: zone_source_video_4
    label: Zone Source Video 4
    kind: action
    params: []
    decimal: [77]
    hex: [0x4D]

  - id: zone_source_video_5
    label: Zone Source Video 5
    kind: action
    params: []
    decimal: [78]
    hex: [0x4E]

  - id: zone_source_video_6
    label: Zone Source Video 6
    kind: action
    params: []
    decimal: [79]
    hex: [0x4F]

  - id: zone_source_audio_1
    label: Zone Source Audio 1
    kind: action
    params: []
    decimal: [80]
    hex: [0x50]

  - id: zone_source_audio_2
    label: Zone Source Audio 2
    kind: action
    params: []
    decimal: [81]
    hex: [0x51]

  - id: zone_source_audio_3
    label: Zone Source Audio 3
    kind: action
    params: []
    decimal: [82]
    hex: [0x52]

  - id: zone_source_audio_4
    label: Zone Source Audio 4
    kind: action
    params: []
    decimal: [83]
    hex: [0x53]

  - id: zone_source_analog_71
    label: Zone Source Analog 7.1
    kind: action
    params: []
    decimal: [84]
    hex: [0x54]

  - id: zone_source_analog_71_toggle
    label: Zone Source Analog 7.1 Toggle
    kind: action
    params: []
    decimal: [137]
    hex: [0x89]

  # Tape Record Control
  - id: tape_sticky_toggle
    label: Tape Monitor Sticky Toggle
    kind: action
    params: []
    decimal: [26]
    hex: [0x1A]

  - id: tape_nonsticky_toggle
    label: Tape Monitor Non-Sticky Toggle
    kind: action
    params: []
    decimal: [31]
    hex: [0x1F]

  - id: tape_off
    label: Tape Monitor Off
    kind: action
    params: []
    decimal: [39]
    hex: [0x27]

  - id: tape_sticky_on
    label: Tape Monitor Sticky On
    kind: action
    params: []
    decimal: [40]
    hex: [0x28]

  - id: tape_nonsticky_on
    label: Tape Monitor Non-Sticky On
    kind: action
    params: []
    decimal: [41]
    hex: [0x29]

  # Setup Menu Control
  - id: setup_menu_toggle
    label: Setup Menu Toggle
    kind: action
    params: []
    decimal: [103]
    hex: [0x67]

  - id: cursor_up
    label: Cursor Up
    kind: action
    params: []
    decimal: [104]
    hex: [0x68]

  - id: cursor_down
    label: Cursor Down
    kind: action
    params: []
    decimal: [105]
    hex: [0x69]

  - id: cursor_left
    label: Cursor Left
    kind: action
    params: []
    decimal: [106]
    hex: [0x6A]

  - id: cursor_right
    label: Cursor Right
    kind: action
    params: []
    decimal: [107]
    hex: [0x6B]

  - id: cursor_select
    label: Select
    kind: action
    params: []
    decimal: [108]
    hex: [0x6C]

  - id: cursor_exit
    label: Exit Without Save (ESC)
    kind: action
    params: []
    decimal: [109]
    hex: [0x6D]

  - id: cursor_step_down
    label: Cursor Step Down
    kind: action
    params: []
    decimal: [114]
    hex: [0x72]

  - id: test_noise
    label: Test Noise (CAL)
    kind: action
    params: []
    decimal: [23]
    hex: [0x17]

  # Other
  - id: front_panel_lock_toggle
    label: Lock/Unlock Front Panel Toggle
    kind: action
    params: []
    decimal: [145]
    hex: [0x91]

  - id: show_status_onscreen
    label: Show Status On Screen
    kind: action
    params: []
    decimal: [122]
    hex: [0x7A]

  - id: ping
    label: Ping and Hello Response
    kind: action
    params: []
    decimal: [80]
    hex: [0x50]

  # Multi-byte Commands
  - id: set_main_volume
    label: Set Main Volume
    kind: action
    params:
      - name: level
        type: integer
        min: 10
        max: 106
        description: "10 = -90dB, 81 = -19dB, 100 = 0dB"
    decimal: [180]
    hex: [0xB4]
    multi_byte: true
    byte_2_decimal: "10-106"

  - id: set_zone_volume
    label: Set Zone Volume
    kind: action
    params:
      - name: level
        type: integer
        min: 10
        max: 100
        description: "10 = -90dB, 81 = -19dB, 100 = 0dB"
    decimal: [182]
    hex: [0xB6]
    multi_byte: true
    byte_2_decimal: "10-100"

  - id: set_plii_params
    label: Set PLII Parameters
    kind: action
    params:
      - name: panorama
        type: integer
        values: [0, 1]
        description: "0 = Off, 1 = On"
      - name: center_width
        type: integer
        min: 0
        max: 7
        description: "0 = Narrow, 7 = Wide"
      - name: dimension
        type: integer
        min: 0
        max: 6
        description: "0 = Front biased, 6 = Max surround"
    decimal: [184]
    hex: [0xB8]
    multi_byte: true

  - id: set_neo6_params
    label: Set Neo6 Parameters
    kind: action
    params:
      - name: center_image
        type: integer
        min: 0
        max: 5
        description: "0 = Narrow, 5 = Wide"
    decimal: [185]
    hex: [0xB9]
    multi_byte: true

  - id: show_zone_status
    label: Show Zone Status
    kind: action
    params: []
    decimal: [166]
    hex: [0xA6]

  # Full Status Query (no preamble needed)
  - id: request_full_status
    label: Request Full Status Report
    kind: query
    params: []
    decimal: [227]
    hex: [0xE3]
    note: "Do NOT send RS Enable preamble before this command"
```

## Feedbacks
```yaml
feedbacks:
  - id: main_volume
    label: Main Volume
    type: integer
    decimal_code: 225
    hex_code: 0xE1
    range: "10-106"
    mapping: "10 = -90dB, 81 = -19dB, 100 = 0dB"

  - id: mute_status
    label: Mute Status
    type: enum
    decimal_code: 226
    hex_code: 0xE2
    values:
      0: unmuted
      1: muted

  - id: current_source
    label: Current Source
    type: enum
    decimal_code: 227
    hex_code: 0xE3
    values:
      1: Video 1
      2: Video 2
      3: Video 3
      4: Video 4
      5: Video 5
      6: Video 6
      7: Audio 1
      8: Audio 2
      9: Audio 3
      10: Audio 4
      64: 7.1 Input

  - id: power_status
    label: Power Status
    type: enum
    decimal_code: 229
    hex_code: 0xE5
    values:
      0: standby
      1: on

  - id: zone_source
    label: Zone Source
    type: enum
    decimal_code: 230
    hex_code: 0xE6
    values:
      1: Video 1
      2: Video 2
      3: Video 3
      4: Video 4
      5: Video 5
      6: Video 6

  - id: zone_volume
    label: Zone Volume
    type: integer
    decimal_code: 232
    hex_code: 0xE8
    range: "10-100"
    mapping: "10 = -90dB, 81 = -19dB, 100 = 0dB"

  - id: zone_mute_status
    label: Zone Mute Status
    type: enum
    decimal_code: 233
    hex_code: 0xE9
    values:
      0: unmuted
      1: muted

  - id: dimmer_status
    label: Dimmer Status
    type: enum
    decimal_code: 234
    hex_code: 0xEA
    values:
      0: bright
      1: dimmed

  - id: surround_mode
    label: Surround Mode
    type: enum
    decimal_code: 236
    hex_code: 0xEC
    values:
      0: Direct
      1: Dolby Pro Logic
      2: Natural
      3: Club
      4: Concert
      6: Party
      7: Mono downmix
      9: Surround 6.1
      12: Stereo downmix
      13: Pro Logic II Movie
      14: Pro Logic II Music
      15: Dolby Digital EX
      16: Neo:6 Cinema
      17: Matrix / Neo:6
      20: Neo:6 Music
      21: Stereo 96
      23: Pro Logic IIx Music
      24: Pro Logic IIx Movie

  - id: audio_type
    label: Current Audio Type
    type: enum
    decimal_code: 237
    hex_code: 0xED
    values:
      2: Digital PCM
      3: Dolby Digital
      4: DTS
      6: Noise
      7: Analog
      8: Digital Error
      9: DTS-ES Matrix
      10: DTS-ES Discrete
      11: DTS 96/24
      12: DTS 96 Matrix
      13: DTS 96 Discrete

  - id: input_type
    label: Input Type
    type: bitmask
    decimal_code: 215
    hex_code: 0xD7
    description: "8-bit value encoding audio channel configuration and flags"

  - id: input_method
    label: Current Input Method
    type: enum
    decimal_code: 238
    hex_code: 0xEE
    values:
      0: Non-balanced Analog
      1: Coaxial
      2: Optical

  - id: late_night_status
    label: Late Night (DYN)
    type: enum
    decimal_code: 239
    hex_code: 0xEF
    values:
      0: compression off
      1: compression on

  - id: cinema_eq_status
    label: Cinema EQ
    type: enum
    decimal_code: 240
    hex_code: 0xF0
    values:
      0: off
      1: on

  - id: treble_trim
    label: Treble Trim
    type: integer
    decimal_code: 242
    hex_code: 0xF2
    range: "0-24"
    mapping: "0 = -12dB, 12 = 0dB, 24 = +12dB"

  - id: bass_trim
    label: Bass Trim
    type: integer
    decimal_code: 243
    hex_code: 0xF3
    range: "0-24"
    mapping: "0 = -12dB, 12 = 0dB, 24 = +12dB"

  - id: center_trim
    label: Center Trim
    type: integer
    decimal_code: 244
    hex_code: 0xF4
    range: "0-24"
    mapping: "0 = -12dB, 12 = 0dB, 24 = +12dB"

  - id: surround_trim
    label: Surround Trim
    type: integer
    decimal_code: 245
    hex_code: 0xF5
    range: "0-24"
    mapping: "0 = -12dB, 12 = 0dB, 24 = +12dB"

  - id: subwoofer_trim
    label: Subwoofer Trim
    type: integer
    decimal_code: 246
    hex_code: 0xF6
    range: "0-24"
    mapping: "0 = -12dB, 12 = 0dB, 24 = +12dB"

  - id: trigger_1_status
    label: Trigger 1 Status
    type: enum
    decimal_code: 247
    hex_code: 0xF7
    values:
      0: inactive
      1: active

  - id: trigger_2_status
    label: Trigger 2 Status
    type: enum
    decimal_code: 248
    hex_code: 0xF8
    values:
      0: inactive
      1: active

  - id: video_format
    label: Video Format
    type: enum
    decimal_code: 249
    hex_code: 0xF9
    values:
      0: unknown
      1: PAL
      2: NTSC

  - id: thx_status
    label: THX Status
    type: enum
    decimal_code: 250
    hex_code: 0xFA
    values:
      0: THX off
      1: THX Cinema
      2: THX Surround EX
      3: THX Ultra2
      4: THX Music
      5: THX Games

  - id: headphone_status
    label: Headphone Status
    type: enum
    decimal_code: 224
    hex_code: 0xE0
    values:
      0: not connected
      1: connected

  - id: plii_params
    label: PLII Parameters
    type: compound
    decimal_code: 216
    hex_code: 0xD8
    fields:
      panorama: { type: enum, values: { 0: Off, 1: On } }
      center_width: { type: integer, range: "0-7", description: "0 = Narrow, 7 = Wide" }
      dimension: { type: integer, range: "0-6", description: "0 = 3, 6 = -3" }
```

## Events
```yaml
events:
  description: "Unsolicited feedback sent out the RS-232 port whenever a parameter or function status changes. Format: <command_code> <data> <255> where 255 indicates end of transmission block."
  note: "All feedback entries in the Feedbacks section above are also sent as unsolicited events on state change."
```

## Macros
```yaml
macros:
  - id: universal_stereo
    label: Universal Stereo
    description: "Ensures surround mode goes to stereo regardless of input type"
    steps:
      - action: surround_direct
        decimal: [224, 82, 83, 33, 164]
      - action: surround_stereo
        decimal: [224, 82, 83, 33, 43]
    crestron_hex: "\\xE0\\x52\\x53\\x21\\xA4\\xE0\\x52\\x53\\x21\\x2B"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
- Binary protocol — all commands are raw byte values, not ASCII strings.
- RS Enable preamble (decimal `224 82 83 33` / hex `E0 52 53 21`) must precede every command except the full status query.
- No carriage returns or line feeds between bytes.
- Feedback format: `<parameter_code> <data> <255>` where 255 marks end of block.
- Full status query (decimal 227) does NOT require RS Enable preamble. Response starts with byte 223 (start marker) followed by 255-separated data blocks.
- Source also covers the Halo C 1 — identical command set.
- Volume byte mapping: value 10 = -90dB through value 100 = 0dB (linear in the byte but non-linear in dB; value 81 = -19dB).
- Surround mode feedback value space has gaps (e.g. 5, 8, 10, 11, 18, 19, 22 are undefined).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: maximum command rate / minimum inter-command delay not stated -->
<!-- UNRESOLVED: error recovery or timeout behavior not documented -->
<!-- UNRESOLVED: no TCP/IP control documented — serial only -->

## Provenance

```yaml
source_domains:
  - cdn.shopify.com
source_urls:
  - "https://cdn.shopify.com/s/files/1/0763/0864/4159/files/C1_C2_RS232Codes.pdf?v=1719694110"
retrieved_at: 2026-05-21T16:56:39.590Z
last_checked_at: 2026-05-31T07:00:29.370Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T07:00:29.370Z
matched_actions: 108
action_count: 108
confidence: medium
summary: "All 108 spec actions matched literal command codes from source; transport parameters verified; source command set fully represented. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no safety warnings or interlock procedures found in source"
- "firmware version compatibility not stated in source"
- "maximum command rate / minimum inter-command delay not stated"
- "error recovery or timeout behavior not documented"
- "no TCP/IP control documented — serial only"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
