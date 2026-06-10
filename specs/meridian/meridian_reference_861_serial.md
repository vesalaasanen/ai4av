---
spec_id: admin/meridian-reference-861
schema_version: ai4av-public-spec-v1
revision: 1
title: "Meridian Reference 861 Control Spec"
manufacturer: Meridian
model_family: "Reference 861"
aliases: []
compatible_with:
  manufacturers:
    - Meridian
  models:
    - "Reference 861"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - meridian-audio.info
  - meridian-audio.com
source_urls:
  - "https://www.meridian-audio.info/public/meridian861v6rs232[4342].pdf"
  - https://meridian-audio.com/meridian-uploads/download/AppNotes/861v4_232.pdf
  - "https://www.meridian-audio.info/public/861rs_27[2457].pdf"
retrieved_at: 2026-05-21T13:05:40.336Z
last_checked_at: 2026-06-09T23:24:31.769Z
generated_at: 2026-06-09T23:24:31.769Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no unsolicited event notifications described in source"
  - "no explicit multi-step macro sequences described in source"
  - "no safety warnings or interlock procedures stated in source"
  - "voltage, current, power specifications not stated in source"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-09T23:24:31.769Z
  matched_actions: 91
  action_count: 91
  confidence: medium
  summary: "All 91 spec actions matched to source commands; bidirectional coverage confirmed with no functional commands unrepresented. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Meridian Reference 861 Control Spec

## Summary
Meridian Reference 861 Surround Processor. RS-232C control via two-ASCII-character commands + carriage return. 20-character feedback string returned per command. Serial-only device.

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
- powerable       # SB Standby command present
- routable        # Source selection commands present (CD/RD/DV/AX/etc.)
- queryable       # CS1/CS2/CS3 status query commands present
- levelable       # Volume, treble, bass, balance, lip-sync, delay, level commands present
```

## Actions
```yaml
# Source Selection
- id: select_cd
  label: Select CD
  kind: action
  params: []
- id: select_radio
  label: Select Radio
  kind: action
  params: []
- id: select_dvd
  label: Select DVD
  kind: action
  params: []
- id: select_aux
  label: Select Aux
  kind: action
  params: []
- id: select_disc
  label: Select Disc
  kind: action
  params: []
- id: select_tape
  label: Select Tape
  kind: action
  params: []
- id: select_tv
  label: Select TV
  kind: action
  params: []
- id: select_cable
  label: Select Cable
  kind: action
  params: []
- id: select_satellite
  label: Select Satellite
  kind: action
  params: []
- id: select_vcr1
  label: Select VCR1
  kind: action
  params: []
- id: select_vcr2
  label: Select VCR2
  kind: action
  params: []
- id: select_game
  label: Select Game
  kind: action
  params: []

# Volume
- id: volume_up
  label: Volume Up
  kind: action
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  params: []
- id: volume_goto
  label: Goto Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 1-99
- id: mute
  label: Mute
  kind: action
  params: []

# General
- id: standby
  label: Standby
  kind: action
  params: []
- id: menu_right
  label: Menu Right
  kind: action
  params: []
- id: menu_left
  label: Menu Left
  kind: action
  params: []
- id: menu_plus
  label: Menu Plus
  kind: action
  params: []
- id: menu_minus
  label: Menu Minus
  kind: action
  params: []
- id: goto_preset
  label: Goto Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 0-21

# Playback Transport (Additional Source Commands)
- id: play
  label: Play
  kind: action
  params: []
- id: stop
  label: Stop
  kind: action
  params: []
- id: pause
  label: Pause
  kind: action
  params: []
- id: repeat
  label: Repeat
  kind: action
  params: []
- id: ab_repeat
  label: AB Repeat
  kind: action
  params: []
- id: next
  label: Next
  kind: action
  params: []
- id: previous
  label: Previous
  kind: action
  params: []
- id: display
  label: Display
  kind: action
  params: []
- id: store
  label: Store
  kind: action
  params: []
- id: clear
  label: Clear
  kind: action
  params: []
- id: decimal_point
  label: Decimal Point
  kind: action
  params: []
- id: fast_forward
  label: Fast Forward
  kind: action
  params: []
- id: fast_back
  label: Fast Back
  kind: action
  params: []
- id: open
  label: Open
  kind: action
  params: []
- id: mono
  label: Mono
  kind: action
  params: []
- id: slow
  label: Slow
  kind: action
  params: []
- id: band
  label: Band
  kind: action
  params: []
- id: audio
  label: Audio
  kind: action
  params: []
- id: subtitle_on_off
  label: Subtitle On/Off
  kind: action
  params: []
- id: subtitle_choice
  label: Subtitle Choice
  kind: action
  params: []
- id: osd
  label: OSD
  kind: action
  params: []
- id: record_copy
  label: Record/Copy
  kind: action
  params: []
- id: angle
  label: Angle
  kind: action
  params: []

# DSP Presets
- id: preset_direct
  label: Direct Preset
  kind: action
  params: []
- id: preset_music
  label: Music Preset
  kind: action
  params: []
- id: preset_trifield
  label: Trifield Preset
  kind: action
  params: []
- id: preset_ambisonics
  label: Ambisonics Preset
  kind: action
  params: []
- id: preset_super
  label: Super Preset
  kind: action
  params: []
- id: preset_stereo
  label: Stereo Preset
  kind: action
  params: []
- id: preset_music_logic
  label: Music Logic Preset
  kind: action
  params: []
- id: preset_mono
  label: Mono Preset
  kind: action
  params: []
- id: preset_tv_logic
  label: TV Logic Preset
  kind: action
  params: []
- id: preset_pliix_music
  label: PLIIx Music Preset
  kind: action
  params: []
- id: preset_pliix_movie
  label: PLIIx Movie Preset
  kind: action
  params: []
- id: preset_pliix_thx
  label: PLIIx THX Preset
  kind: action
  params: []
- id: preset_discrete
  label: Discrete Preset
  kind: action
  params: []
- id: preset_cinema
  label: Cinema Preset
  kind: action
  params: []
- id: preset_pliix_music6
  label: PLIIx Music6 Preset
  kind: action
  params: []
- id: preset_pliix_movie6
  label: PLIIx Movie6 Preset
  kind: action
  params: []
- id: preset_thx
  label: THX Preset
  kind: action
  params: []
- id: preset_thx_ex
  label: THX EX Preset
  kind: action
  params: []
- id: preset_thx_ultra_cinema
  label: THX Ultra Cinema Preset
  kind: action
  params: []
- id: preset_thx_music
  label: THX Music Preset
  kind: action
  params: []

# Direct Access (APnnxx syntax - hex values)
- id: direct_access
  label: Direct Access
  description: Direct control of menu options via APnnxx syntax (nn=menu, xx=value, hex)
  kind: action
  params:
    - name: menu
      type: integer
      description: Menu option hex code (00-4A)
    - name: value
      type: integer
      description: Value hex code
- id: phase
  label: Phase
  kind: action
  params: []
- id: number_key
  label: Number Key
  kind: action
  params:
    - name: digit
      type: integer
      description: Number key digit (0-9)
- id: tb_button
  label: T Button (MSR 3)
  kind: action
  params: []
- id: hash_button
  label: Hash Button
  kind: action
  params: []
- id: chapter
  label: Chapter (MSR 3)
  kind: action
  params: []
- id: setup
  label: Setup
  kind: action
  params: []
- id: menu
  label: Menu
  kind: action
  params: []
- id: return
  label: Return
  kind: action
  params: []
- id: enter
  label: Enter
  kind: action
  params: []
- id: top_menu
  label: Top Menu
  kind: action
  params: []
- id: next_page
  label: Next Page
  kind: action
  params: []
- id: previous_page
  label: Previous Page
  kind: action
  params: []
- id: function_clear
  label: Function Clear
  kind: action
  params: []
- id: function_store
  label: Function Store
  kind: action
  params: []
- id: function_display
  label: Function Display
  kind: action
  params: []
- id: function_mute
  label: Function Mute
  kind: action
  params: []
- id: function_menu_up
  label: Function Menu Up
  kind: action
  params: []
- id: function_menu_down
  label: Function Menu Down
  kind: action
  params: []
- id: function_menu_left
  label: Function Menu Left
  kind: action
  params: []
- id: function_menu_right
  label: Function Menu Right
  kind: action
  params: []
- id: function_volume_up
  label: Function Volume Up
  kind: action
  params: []
- id: function_volume_down
  label: Function Volume Down
  kind: action
  params: []
- id: status_query_1
  label: Query Status CS1
  kind: query
  params: []
- id: status_query_2
  label: Query Status CS2
  kind: query
  params: []
- id: status_query_3
  label: Query Status CS3
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: source_dsp_volume
  description: CS1 - Source, DSP Mode, Volume level (0-99)
  type: string
- id: source_dsp_gain
  description: CS2 - Source, DSP Mode, Gain (-99 to +99)
  type: string
- id: source_audio_rate
  description: CS3 - Source, Incoming Audio, Sample Rate
  type: string
- id: command_ack
  description: 20-character display feedback after any command
  type: string
```

## Variables
```yaml
- id: treble
  type: float
  range: [-10, 10]
  unit: dB
  steps: 0.5dB
  menu_hex: "01"
- id: bass
  type: float
  range: [-5, 5]
  unit: dB
  steps: 0.5dB
  menu_hex: "02"
- id: phase
  type: enum
  values: [off, on]
  menu_hex: "03"
- id: lr_balance
  type: integer
  range: [-10, 10]
  steps: 1
  menu_hex: "04"
- id: lipsync
  type: integer
  range: [0, 30]
  unit: ms
  steps: 0.5ms
  menu_hex: "1D"
- id: rear_level
  type: integer
  range: [-30, 10]
  unit: dB
  menu_hex: "05"
- id: centre_level
  type: float
  range: [-3, 3]
  unit: dB
  steps: 0.5dB
  menu_hex: "09"
- id: centre_delay
  type: float
  range: [-2.5, 5]
  unit: ms
  steps: 0.5ms
  menu_hex: "0A"
- id: centre_eq
  type: integer
  range: [0, 3]
  menu_hex: "0B"
- id: rear_delay
  type: float
  range: [0, 30]
  unit: ms
  steps: 0.5ms
  menu_hex: "06"
- id: rear_delay_51
  type: float
  range: [0, 30]
  unit: ms
  steps: 0.5ms
  menu_hex: "2C"
- id: rear_delay_plii
  type: float
  range: [10, 25]
  unit: ms
  steps: 0.5ms
  menu_hex: "44"
- id: rear_filter
  type: integer
  range: [0, 3]
  menu_hex: "07"
- id: rear_filter_ambisonics
  type: integer
  range: [0, 3]
  menu_hex: "12"
- id: side_level
  type: integer
  range: [-30, 10]
  unit: dB
  menu_hex: "19"
- id: side_delay
  type: float
  range: [0, 30]
  unit: ms
  steps: 0.5ms
  menu_hex: "1A"
- id: side_delay_51
  type: float
  range: [0, 30]
  unit: ms
  steps: 0.5ms
  menu_hex: "2D"
- id: side_delay_plii
  type: float
  range: [10, 25]
  unit: ms
  steps: 0.5ms
  menu_hex: "45"
- id: side_filter
  type: integer
  range: [0, 3]
  menu_hex: "16"
- id: side_filter_music
  type: integer
  range: [0, 3]
  menu_hex: "1B"
- id: axis_control
  type: integer
  range: [-2, 3]
  unit: dB
  steps: 1dB
  menu_hex: "3C"
- id: hs_out
  type: enum
  values: [off, on]
  menu_hex: "37"
- id: width
  type: float
  range: [0, 1.5]
  steps: 0.1
  menu_hex: "0E"
- id: width_super
  type: float
  range: [0, 1.0]
  steps: 0.1
  menu_hex: "0F"
- id: plii_width
  type: integer
  range: [0, 7]
  menu_hex: "40"
- id: dimension
  type: integer
  range: [0, 6]
  menu_hex: "3D"
- id: panorama
  type: enum
  values: [off, on]
  menu_hex: "3E"
- id: plii_steering
  type: integer
  range: [0, 2]
  menu_hex: "43"
- id: prologic_legacy
  type: enum
  values: [off, on]
  menu_hex: "3F"
- id: party_mode
  type: enum
  values: [off, on]
  menu_hex: "28"
- id: academy_filter
  type: enum
  values: [off, on]
  menu_hex: "13"
- id: no_of_surrounds
  type: integer
  range: [0, 2]
  menu_hex: "1E"
- id: no_of_surrounds_51
  type: integer
  range: [0, 2]
  menu_hex: "24"
- id: compression
  type: integer
  range: [0, 5]
  menu_hex: "29"
- id: contrast
  type: integer
  range: [0, 15]
  menu_hex: "2E"
- id: brightness
  type: integer
  range: [0, 15]
  menu_hex: "2F"
- id: position
  type: enum
  values: [M, A]
  menu_hex: "11"
- id: roll
  type: integer
  range: [0, 3]
  menu_hex: "14"
- id: yaw
  type: integer
  range: [0, 3]
  menu_hex: "15"
- id: mono_input
  type: integer
  range: [0, 3]
  menu_hex: "0D"
- id: two_plus_two_plus_two
  type: integer
  range: [0, 4]
  menu_hex: "46"
- id: lfe_level
  type: integer
  range: [-18, 10]
  unit: dB
  menu_hex: "4A"
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
Direct Access commands use APnnxx hex syntax. Restrictions listed per variable apply based on current DSP preset and audio mode. Direct Access command viability is dependent on incoming audio stream and DSP preset selected.

<!-- UNRESOLVED: voltage, current, power specifications not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - meridian-audio.info
  - meridian-audio.com
source_urls:
  - "https://www.meridian-audio.info/public/meridian861v6rs232[4342].pdf"
  - https://meridian-audio.com/meridian-uploads/download/AppNotes/861v4_232.pdf
  - "https://www.meridian-audio.info/public/861rs_27[2457].pdf"
retrieved_at: 2026-05-21T13:05:40.336Z
last_checked_at: 2026-06-09T23:24:31.769Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T23:24:31.769Z
matched_actions: 91
action_count: 91
confidence: medium
summary: "All 91 spec actions matched to source commands; bidirectional coverage confirmed with no functional commands unrepresented. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no unsolicited event notifications described in source"
- "no explicit multi-step macro sequences described in source"
- "no safety warnings or interlock procedures stated in source"
- "voltage, current, power specifications not stated in source"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
