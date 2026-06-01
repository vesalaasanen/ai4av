---
spec_id: admin/parasound-halo-c-1
schema_version: ai4av-public-spec-v1
revision: 1
title: "Parasound Halo C 1 Control Spec"
manufacturer: Parasound
model_family: "Halo C 1"
aliases: []
compatible_with:
  manufacturers:
    - Parasound
  models:
    - "Halo C 1"
    - "Halo C 2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.shopify.com
source_urls:
  - "https://cdn.shopify.com/s/files/1/0763/0864/4159/files/C1_C2_RS232Codes.pdf?v=1719694110"
  - "https://cdn.shopify.com/s/files/1/0763/0864/4159/files/200_Pre_Int-rs-232-guide.pdf?v=1718769361"
  - "https://cdn.shopify.com/s/files/1/0763/0864/4159/files/Zpre3RS-232Guide.pdf?v=1718771526"
retrieved_at: 2026-05-21T17:00:47.559Z
last_checked_at: 2026-05-31T07:00:28.605Z
generated_at: 2026-05-31T07:00:28.605Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T07:00:28.605Z
  matched_actions: 107
  action_count: 107
  confidence: high
  summary: "All 107 spec actions matched wire-level hex codes in source; every transport parameter verified verbatim in source documentation."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Parasound Halo C 1 Control Spec

## Summary
Parasound Halo C 1 and C 2 are surround sound controllers with RS-232C control interface. All commands require a 4-byte RS Enable prefix (224 82 83 33). Serial config: 9600 baud, 8N1, no flow control. Device sends unsolicited status feedback on parameter changes.

<!-- UNRESOLVED: multi-zone details, trigger output specs, video format switching behavior -->

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
- id: rs_enable
  label: RS Enable
  kind: action
  params: []
  description: Must precede every command. Decimal 224 82 83 33, Hex E0 52 53 21

- id: power_off
  label: Power Off
  kind: action
  params: []
  hex: "22"

- id: power_on
  label: Power On
  kind: action
  params: []
  hex: "23"

- id: power_toggle
  label: Power Toggle
  kind: action
  params: []
  hex: "06"

- id: volume_plus
  label: Volume Plus
  kind: action
  params: []
  hex: "35"

- id: volume_minus
  label: Volume Minus
  kind: action
  params: []
  hex: "36"

- id: mute_toggle
  label: Mute Toggle
  kind: action
  params: []
  hex: "07"

- id: mute_on
  label: Mute On
  kind: action
  params: []
  hex: "20"

- id: mute_off
  label: Mute Off
  kind: action
  params: []
  hex: "21"

- id: source_plus
  label: Source Plus
  kind: action
  params: []
  hex: "08"

- id: source_minus
  label: Source Minus
  kind: action
  params: []
  hex: "09"

- id: source_video_1
  label: Source Video 1
  kind: action
  params: []
  hex: "0D"

- id: source_video_2
  label: Source Video 2
  kind: action
  params: []
  hex: "0E"

- id: source_video_3
  label: Source Video 3
  kind: action
  params: []
  hex: "0F"

- id: source_video_4
  label: Source Video 4
  kind: action
  params: []
  hex: "10"

- id: source_video_5
  label: Source Video 5
  kind: action
  params: []
  hex: "11"

- id: source_video_6
  label: Source Video 6
  kind: action
  params: []
  hex: "12"

- id: source_audio_1
  label: Source Audio 1
  kind: action
  params: []
  hex: "13"

- id: source_audio_2
  label: Source Audio 2
  kind: action
  params: []
  hex: "14"

- id: source_audio_3
  label: Source Audio 3
  kind: action
  params: []
  hex: "48"

- id: source_audio_4
  label: Source Audio 4
  kind: action
  params: []
  hex: "49"

- id: source_analog_71
  label: Source Analog 7.1
  kind: action
  params: []
  hex: "64"

- id: source_analog_71_toggle
  label: Source Analog 7.1 Toggle
  kind: action
  params: []
  hex: "88"

- id: source_auto_search
  label: Active Source Auto Search
  kind: action
  params: []
  hex: "90"

- id: surround_mode_minus
  label: Surround Mode Minus
  kind: action
  params: []
  hex: "0A"

- id: surround_mode_plus
  label: Surround Mode Plus
  kind: action
  params: []
  hex: "0B"

- id: surround_mono
  label: Mono
  kind: action
  params: []
  hex: "2A"

- id: surround_stereo
  label: Stereo
  kind: action
  params: []
  hex: "2B"

- id: surround_prologic
  label: Prologic
  kind: action
  params: []
  hex: "2C"

- id: surround_natural
  label: Natural
  kind: action
  params: []
  hex: "2D"

- id: surround_party
  label: Party
  kind: action
  params: []
  hex: "2E"

- id: surround_club
  label: Club
  kind: action
  params: []
  hex: "2F"

- id: surround_concert
  label: Concert
  kind: action
  params: []
  hex: "30"

- id: surround_plii_movie
  label: Prologic II or IIx Movie
  kind: action
  params: []
  hex: "A0"

- id: surround_plii_music
  label: Prologic II or IIx Music
  kind: action
  params: []
  hex: "A1"

- id: surround_dts_neo6_cinema
  label: DTS Neo6 Cinema
  kind: action
  params: []
  hex: "A2"

- id: surround_dtses_matrix
  label: DTSES Matrix
  kind: action
  params: []
  hex: "A3"

- id: surround_direct
  label: Direct
  kind: action
  params: []
  hex: "A4"

- id: surround_dts_neo6_music
  label: DTS NEO6 Music
  kind: action
  params: []
  hex: "A7"

- id: surround_dolby_ex
  label: Dolby EX
  kind: action
  params: []
  hex: "A8"

- id: surround_stereo_96
  label: Stereo 96
  kind: action
  params: []
  hex: "A9"

- id: late_night_on
  label: Late Night On (DYN)
  kind: action
  params: []
  hex: "25"

- id: late_night_off
  label: Late Night Off (DYN)
  kind: action
  params: []
  hex: "26"

- id: late_night_toggle
  label: Late Night Toggle (DYN)
  kind: action
  params: []
  hex: "0C"

- id: cinema_eq_toggle
  label: Cinema EQ Toggle
  kind: action
  params: []
  hex: "63"

- id: thx_toggle
  label: THX Toggle
  kind: action
  params: []
  hex: "1B"

- id: bass_plus
  label: Bass Plus
  kind: action
  params: []
  hex: "44"

- id: bass_minus
  label: Bass Minus
  kind: action
  params: []
  hex: "45"

- id: treble_plus
  label: Treble Plus
  kind: action
  params: []
  hex: "46"

- id: treble_minus
  label: Treble Minus
  kind: action
  params: []
  hex: "47"

- id: subwoofer_plus
  label: Subwoofer Plus
  kind: action
  params: []
  hex: "61"

- id: subwoofer_minus
  label: Subwoofer Minus
  kind: action
  params: []
  hex: "62"

- id: surround_trim_plus
  label: Surround Plus
  kind: action
  params: []
  hex: "83"

- id: surround_trim_minus
  label: Surround Minus
  kind: action
  params: []
  hex: "84"

- id: center_trim_plus
  label: Center Plus
  kind: action
  params: []
  hex: "81"

- id: center_trim_minus
  label: Center Minus
  kind: action
  params: []
  hex: "82"

- id: preset_1
  label: Preset 1
  kind: action
  params: []
  hex: "7C"

- id: preset_2
  label: Preset 2
  kind: action
  params: []
  hex: "7D"

- id: preset_3
  label: Preset 3
  kind: action
  params: []
  hex: "7E"

- id: preset_4
  label: Preset 4
  kind: action
  params: []
  hex: "7F"

- id: preset_5
  label: Preset 5
  kind: action
  params: []
  hex: "80"

- id: enhanced_bass_on
  label: Enhanced Bass On
  kind: action
  params: []
  hex: "9C"

- id: enhanced_bass_off
  label: Enhanced Bass Off
  kind: action
  params: []
  hex: "9D"

- id: enhanced_bass_toggle
  label: Enhanced Bass Toggle
  kind: action
  params: []
  hex: "85"

- id: zone_off
  label: Zone Off
  kind: action
  params: []
  hex: "04"

- id: zone_on
  label: Zone On
  kind: action
  params: []
  hex: "05"

- id: zone_toggle
  label: Zone On/Off Toggle
  kind: action
  params: []
  hex: "86"

- id: zone_volume_plus
  label: Zone Volume Plus
  kind: action
  params: []
  hex: "8B"

- id: zone_volume_minus
  label: Zone Volume Minus
  kind: action
  params: []
  hex: "8C"

- id: zone_mute_on
  label: Zone Mute On
  kind: action
  params: []
  hex: "9E"

- id: zone_mute_off
  label: Zone Mute Off
  kind: action
  params: []
  hex: "9F"

- id: zone_mute_toggle
  label: Zone Mute Toggle
  kind: action
  params: []
  hex: "A5"

- id: zone_status
  label: Show Zone Status
  kind: action
  params: []
  hex: "A6"

- id: zone_source_minus
  label: Zone Source minus
  kind: action
  params: []
  hex: "87"

- id: zone_source_plus
  label: Zone Source Plus
  kind: action
  params: []
  hex: "8D"

- id: zone_source_video_1
  label: Zone Source Video 1
  kind: action
  params: []
  hex: "4A"

- id: zone_source_video_2
  label: Zone Source Video 2
  kind: action
  params: []
  hex: "4B"

- id: zone_source_video_3
  label: Zone Source Video 3
  kind: action
  params: []
  hex: "4C"

- id: zone_source_video_4
  label: Zone Source Video 4
  kind: action
  params: []
  hex: "4D"

- id: zone_source_video_5
  label: Zone Source Video 5
  kind: action
  params: []
  hex: "4E"

- id: zone_source_video_6
  label: Zone Source Video 6
  kind: action
  params: []
  hex: "4F"

- id: zone_source_audio_1
  label: Zone Source Audio 1
  kind: action
  params: []
  hex: "6E"

- id: zone_source_audio_2
  label: Zone Source Audio 2
  kind: action
  params: []
  hex: "6F"

- id: zone_source_audio_3
  label: Zone Source Audio 3
  kind: action
  params: []
  hex: "70"

- id: zone_source_audio_4
  label: Zone Source Audio 4
  kind: action
  params: []
  hex: "71"

- id: tape_monitor_sticky_toggle
  label: Tape Monitor Sticky Toggle
  kind: action
  params: []
  hex: "1A"

- id: tape_monitor_nonsticky_toggle
  label: Tape Monitor Non-Sticky Toggle
  kind: action
  params: []
  hex: "1F"

- id: tape_monitor_off
  label: Tape Monitor Off
  kind: action
  params: []
  hex: "27"

- id: tape_monitor_sticky_on
  label: Tape Monitor Sticky On
  kind: action
  params: []
  hex: "28"

- id: tape_monitor_nonsticky_on
  label: Tape Monitor Non-Sticky On
  kind: action
  params: []
  hex: "29"

- id: setup_menu_toggle
  label: Setup Menu Toggle
  kind: action
  params: []
  hex: "67"

- id: cursor_up
  label: Cursor Up
  kind: action
  params: []
  hex: "68"

- id: cursor_down
  label: Cursor Down
  kind: action
  params: []
  hex: "69"

- id: cursor_left
  label: Cursor Left
  kind: action
  params: []
  hex: "6A"

- id: cursor_right
  label: Cursor Right
  kind: action
  params: []
  hex: "6B"

- id: select
  label: Select
  kind: action
  params: []
  hex: "6C"

- id: exit_no_save
  label: Exit Without Save (ESC)
  kind: action
  params: []
  hex: "6D"

- id: cursor_step_down
  label: Cursor Step Down
  kind: action
  params: []
  hex: "72"

- id: test_noise
  label: Test Noise (CAL)
  kind: action
  params: []
  hex: "17"

- id: front_panel_toggle
  label: Lock/Unlock Front Panel Toggle
  kind: action
  params: []
  hex: "91"

- id: show_status
  label: Show Status On Screen
  kind: action
  params: []
  hex: "7A"

- id: ping_hello
  label: Ping and Hello Response
  kind: action
  params: []
  hex: "50"

- id: set_main_volume
  label: Set Main Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 10 (-90dB) to 100 (0dB), 81 = -19dB
  hex: "B4"
  multi_byte: true
  format: "<RS Enable> B4 <level>"

- id: set_zone_volume
  label: Set Zone Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 10 (-90dB) to 100 (0dB), 81 = -19dB
  hex: "B6"
  multi_byte: true
  format: "<RS Enable> B6 <level>"

- id: set_plii_params
  label: Set PLII Parameters
  kind: action
  params:
    - name: panorama
      type: integer
      description: "0 = Off, 1 = On"
    - name: center_width
      type: integer
      description: "0 (Narrow) to 7 (Wide)"
    - name: dimension
      type: integer
      description: "0 (Front biased) to 6 (Max surround)"
  hex: "B8"
  multi_byte: true
  format: "<RS Enable> B8 <panorama> <center_width> <dimension>"

- id: set_neo6_params
  label: Set Neo6 Parameters
  kind: action
  params:
    - name: center_image
      type: integer
      description: "0 (Narrow) to 5 (Wide)"
  hex: "B9"
  multi_byte: true
  format: "<RS Enable> B9 <center_image>"

- id: query_full_status
  label: Query Full Status Report
  kind: action
  params: []
  hex: "E3"
  note: "Does NOT require RS Enable prefix"
```

## Feedbacks
```yaml
# Device sends unsolicited status on changes. Format: <param_code> <data> <255>
# Example: 225 81 255 = Main volume changed to -19dB

- id: feedback_input_type
  label: Input Type
  type: object
  param_code: 215
  fields:
    bits_0_2:
      description: "000=1+1 dual mono, 001=1/0, 010=2/0, 011=3/0, 100=2/1, 101=3/1, 110=2/2, 111=3/2"
    bit_3:
      description: "0=No LFE, 1=LFE"
    bits_4_5:
      description: "00=not indicated, 01=not Dolby, 10=Dolby surround, 11=reserved"
    bit_6:
      description: "0=non ES/EX, 1=ES/EX flag"

- id: feedback_plii_params
  label: PLII Parameters
  type: object
  param_code: 216
  fields:
    panorama: "0=Off, 1=On"
    width: "0-7 (Narrow to Wide)"
    dimension: "0-6 (Front to Max surround)"

- id: feedback_headphones
  label: Headphones Status
  type: enum
  param_code: 224
  values:
    - 0
    - 1
  descriptions:
    0: not connected
    1: connected

- id: feedback_main_volume
  label: Main Volume
  type: range
  param_code: 225
  range: 10..100
  descriptions:
    10: "-90dB"
    81: "-19dB"
    100: "0dB"

- id: feedback_mute
  label: Mute Status
  type: enum
  param_code: 226
  values:
    - 0
    - 1
  descriptions:
    0: unmuted
    1: muted

- id: feedback_current_source
  label: Current Source
  type: enum
  param_code: 227
  values: [1..64]
  descriptions:
    1: Video 1
    2: Video 2
    10: Audio 4
    64: "7.1 Input"

- id: feedback_power_status
  label: Power Status
  type: enum
  param_code: 229
  values:
    - 0
    - 1
  descriptions:
    0: standby
    1: on

- id: feedback_zone_source
  label: Zone Source
  type: enum
  param_code: 230
  values: [1..6]
  descriptions:
    1: Video 1
    2: Video 2
    10: Audio 4

- id: feedback_zone_volume
  label: Zone Volume
  type: range
  param_code: 232
  range: 10..100
  descriptions:
    10: "-90dB"
    81: "-19dB"
    100: "0dB"

- id: feedback_zone_mute
  label: Zone Mute Status
  type: enum
  param_code: 233
  values:
    - 0
    - 1
  descriptions:
    0: unmuted
    1: muted

- id: feedback_dimmer
  label: Dimmer Status
  type: enum
  param_code: 234
  values:
    - 0
    - 1
  descriptions:
    0: bright
    1: dimmed

- id: feedback_surround_mode
  label: Surround Mode
  type: enum
  param_code: 236
  values: [0..24]
  descriptions:
    0: "Direct (Stereo)"
    1: "Dolby Pro Logic"
    2: Natural
    3: Club
    4: Concert
    6: Party
    7: "Mono downmix"
    9: "Surround 6.1"
    12: "Stereo downmix"
    13: "Pro Logic II Movie"
    14: "Pro Logic II Music"
    15: "Dolby Digital EX"
    16: "Neo:6 Cinema"
    17: "Matrix/Neo:6"
    20: "Neo:6 Music"
    21: "Stereo 96"
    23: "Pro Logic IIx Music"
    24: "Pro Logic IIx Movie"

- id: feedback_audio_type
  label: Current Audio Type
  type: enum
  param_code: 237
  values: [0..13]
  descriptions:
    2: "Digital PCM"
    3: "Dolby Digital"
    4: DTS
    6: "Noise (DSP)"
    7: Analog
    8: "Digital Error"
    9: "DTS-ES Matrix"
    10: "DTS-ES Discrete"
    11: "DTS 96/24"
    12: "DTS 96 Matrix"
    13: "DTS 96 Discrete"

- id: feedback_input_method
  label: Current Input Method
  type: enum
  param_code: 238
  values:
    - 0
    - 1
    - 2
  descriptions:
    0: "Non-balanced Analog"
    1: Coaxial
    2: Optical

- id: feedback_late_night
  label: Late Night (DYN)
  type: enum
  param_code: 239
  values:
    - 0
    - 1
  descriptions:
    0: "compression off"
    1: "compression on"

- id: feedback_cinema_eq
  label: Cinema EQ
  type: enum
  param_code: 240
  values:
    - 0
    - 1
  descriptions:
    0: Cine EQ off
    1: Cine EQ on

- id: feedback_treble_trim
  label: Treble Trim
  type: range
  param_code: 242
  range: 0..24
  descriptions:
    0: "-12dB"
    12: "0dB"
    24: "+12dB"

- id: feedback_bass_trim
  label: Bass Trim
  type: range
  param_code: 243
  range: 0..24
  descriptions:
    0: "-12dB"
    12: "0dB"
    24: "+12dB"

- id: feedback_center_trim
  label: Center Trim
  type: range
  param_code: 244
  range: 0..24
  descriptions:
    0: "-12dB"
    12: "0dB"
    24: "+12dB"

- id: feedback_surround_trim
  label: Surround Trim
  type: range
  param_code: 245
  range: 0..24
  descriptions:
    0: "-12dB"
    12: "0dB"
    24: "+12dB"

- id: feedback_subwoofer_trim
  label: Subwoofer Trim
  type: range
  param_code: 246
  range: 0..24
  descriptions:
    0: "-12dB"
    12: "0dB"
    24: "+12dB"

- id: feedback_trigger_1
  label: Trigger 1 Status
  type: enum
  param_code: 247
  values:
    - 0
    - 1
  descriptions:
    0: inactive
    1: active

- id: feedback_trigger_2
  label: Trigger 2 Status
  type: enum
  param_code: 248
  values:
    - 0
    - 1
  descriptions:
    0: inactive
    1: active

- id: feedback_video_format
  label: Video Format
  type: enum
  param_code: 249
  values:
    - 0
    - 1
    - 2
  descriptions:
    0: unknown
    1: PAL
    2: NTSC

- id: feedback_thx_status
  label: THX Status
  type: enum
  param_code: 250
  values: [0..5]
  descriptions:
    0: THX off
    1: "THX Cinema"
    2: "THX Surround EX"
    3: THX Ultra2
    4: "THX Music"
    5: "THX Games"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond multi-byte commands listed in Actions
```

## Events
```yaml
# Device sends unsolicited feedback when any parameter changes
# Format: <param_code> <data> <255>
# Example: 225 81 255 = Main volume changed to -19dB
# No separate event subscription mechanism - feedback is always-on
```

## Macros
```yaml
- id: stereo_recommended
  label: Universal Stereo Command
  description: "2-step macro: first issue Direct (164), then Stereo (43). Ensures stereo regardless of input type."
  steps:
    - command: rs_enable
    - command: surround_direct
    - command: rs_enable
    - command: surround_stereo
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Every command (except `query_full_status`) requires RS Enable prefix 224 82 83 33 (E0 52 53 21)
- No carriage return or line feed needed between bytes
- DB9 straight-through cable required (NOT null modem)
- TXD on pin 2, RXD on pin 3, GND on pin 5
- Ping command (80) returns Hello Response — can be used to verify connection
- Full status query (227) does NOT require RS Enable prefix
- Stereo mode recommended via 2-step macro: Direct then Stereo
<!-- UNRESOLVED: firmware version compatibility, trigger output electrical specs, video format switching behavior -->

## Provenance

```yaml
source_domains:
  - cdn.shopify.com
source_urls:
  - "https://cdn.shopify.com/s/files/1/0763/0864/4159/files/C1_C2_RS232Codes.pdf?v=1719694110"
  - "https://cdn.shopify.com/s/files/1/0763/0864/4159/files/200_Pre_Int-rs-232-guide.pdf?v=1718769361"
  - "https://cdn.shopify.com/s/files/1/0763/0864/4159/files/Zpre3RS-232Guide.pdf?v=1718771526"
retrieved_at: 2026-05-21T17:00:47.559Z
last_checked_at: 2026-05-31T07:00:28.605Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T07:00:28.605Z
matched_actions: 107
action_count: 107
confidence: high
summary: "All 107 spec actions matched wire-level hex codes in source; every transport parameter verified verbatim in source documentation."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
