---
spec_id: admin/meridian-861-surround-processor
schema_version: ai4av-public-spec-v1
revision: 1
title: "Meridian 861 Surround Processor Control Spec"
manufacturer: Meridian
model_family: "861 Surround Processor"
aliases: []
compatible_with:
  manufacturers:
    - Meridian
  models:
    - "861 Surround Processor"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - meridian-audio.info
  - meridian-audio.com
source_urls:
  - "https://www.meridian-audio.info/public/meridian861v6rs232%5B4342%5D.pdf"
  - https://meridian-audio.com/meridian-uploads/download/AppNotes/861v4_232.pdf
  - https://meridian-audio.com/meridian-uploads/download/Handbooks/500_Series/562v2user.pdf
retrieved_at: 2026-06-12T01:42:23.409Z
last_checked_at: 2026-06-12T19:25:11.057Z
generated_at: 2026-06-12T19:25:11.057Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no TCP/IP or other transport mentioned; RS-232 only"
  - "firmware version compatibility not stated in source"
  - "exact parsing grammar for 20-char feedback not specified"
  - "no unsolicited notification protocol described in source"
  - "no multi-step sequences described in source"
  - "source describes restrictions on direct access commands per DSP mode"
  - "exact firmware versions or hardware revisions this doc covers"
  - "whether 562 shares identical protocol (title says \"Meridian 861\" only)"
  - "full parsing grammar for 20-char feedback string"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:25:11.057Z
  matched_actions: 103
  action_count: 103
  confidence: medium
  summary: "All 103 spec actions matched verbatim to source commands; transport parameters fully verified; complete coverage of source protocol. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Meridian 861 Surround Processor Control Spec

## Summary
Meridian 861 Surround Processor controlled via RS-232C null modem cable. Basic commands are two ASCII characters plus carriage return; the 861 replies with a twenty-character feedback string mirroring its front-panel display. Direct-access commands (`APnnxx`) use hex parameters for DSP/EQ control.

<!-- UNRESOLVED: no TCP/IP or other transport mentioned; RS-232 only -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

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
# Source commands
- id: select_cd
  label: Select CD Source
  kind: action
  command: "CD\r"
  params: []

- id: select_radio
  label: Select Radio
  kind: action
  command: "RD\r"
  params: []

- id: select_dvd
  label: Select DVD
  kind: action
  command: "DV\r"
  params: []

- id: select_aux
  label: Select Aux
  kind: action
  command: "AX\r"
  params: []

- id: select_disc
  label: Select Disc
  kind: action
  command: "DC\r"
  params: []

- id: select_tape
  label: Select Tape
  kind: action
  command: "TA\r"
  params: []

- id: select_tv
  label: Select TV
  kind: action
  command: "TV\r"
  params: []

- id: select_cable
  label: Select Cable
  kind: action
  command: "CB\r"
  params: []

- id: select_satellite
  label: Select Satellite
  kind: action
  command: "SA\r"
  params: []

- id: select_vcr1
  label: Select VCR1
  kind: action
  command: "V1\r"
  params: []

- id: select_vcr2
  label: Select VCR2
  kind: action
  command: "V2\r"
  params: []

- id: select_game
  label: Select Game
  kind: action
  command: "GA\r"
  params: []

# Volume commands
- id: volume_up
  label: Volume Up
  kind: action
  command: "VP\r"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "VM\r"
  params: []

- id: goto_volume
  label: Goto Volume
  kind: action
  command: "VN{level}\r"
  params:
    - name: level
      type: integer
      min: 1
      max: 99
      description: Target volume level (1-99)

- id: mute
  label: Mute
  kind: action
  command: "MU\r"
  params: []

# General commands
- id: standby
  label: Standby
  kind: action
  command: "SB\r"
  params: []

- id: menu_right
  label: Menu Right
  kind: action
  command: "MR\r"
  params: []

- id: menu_left
  label: Menu Left
  kind: action
  command: "ML\r"
  params: []

- id: menu_plus
  label: Menu Plus (Up)
  kind: action
  command: "MP\r"
  params: []

- id: menu_minus
  label: Menu Minus (Down)
  kind: action
  command: "MM\r"
  params: []

- id: goto_preset
  label: Goto Preset
  kind: action
  command: "PN{preset}\r"
  params:
    - name: preset
      type: integer
      description: Preset number

# Additional source commands
- id: play
  label: Play
  kind: action
  command: "PL\r"
  params: []

- id: stop
  label: Stop
  kind: action
  command: "ST\r"
  params: []

- id: pause
  label: Pause
  kind: action
  command: "PS\r"
  params: []

- id: repeat
  label: Repeat
  kind: action
  command: "RP\r"
  params: []

- id: next
  label: Next
  kind: action
  command: "NE\r"
  params: []

- id: previous
  label: Previous
  kind: action
  command: "PR\r"
  params: []

- id: display
  label: Display
  kind: action
  command: "DI\r"
  params: []

- id: store
  label: Store
  kind: action
  command: "SR\r"
  params: []

- id: clear
  label: Clear
  kind: action
  command: "CL\r"
  params: []

- id: decimal_point
  label: Decimal Point
  kind: action
  command: "DP\r"
  params: []

- id: fast_forward
  label: Fast Forward
  kind: action
  command: "FF\r"
  params: []

- id: fast_back
  label: Fast Back
  kind: action
  command: "FB\r"
  params: []

- id: num_0
  label: Number Key 0
  kind: action
  command: "N0\r"
  params: []

- id: num_1
  label: Number Key 1
  kind: action
  command: "N1\r"
  params: []

- id: num_2
  label: Number Key 2
  kind: action
  command: "N2\r"
  params: []

- id: num_3
  label: Number Key 3
  kind: action
  command: "N3\r"
  params: []

- id: num_4
  label: Number Key 4
  kind: action
  command: "N4\r"
  params: []

- id: num_5
  label: Number Key 5
  kind: action
  command: "N5\r"
  params: []

- id: num_6
  label: Number Key 6
  kind: action
  command: "N6\r"
  params: []

- id: num_7
  label: Number Key 7
  kind: action
  command: "N7\r"
  params: []

- id: num_8
  label: Number Key 8
  kind: action
  command: "N8\r"
  params: []

- id: num_9
  label: Number Key 9
  kind: action
  command: "N9\r"
  params: []

- id: open
  label: Open
  kind: action
  command: "OP\r"
  params: []

- id: mono
  label: Mono
  kind: action
  command: "MO\r"
  params: []

- id: slow
  label: Slow
  kind: action
  command: "SL\r"
  params: []

- id: band
  label: Band
  kind: action
  command: "BA\r"
  params: []

- id: audio
  label: Audio
  kind: action
  command: "AU\r"
  params: []

- id: subtitle_on_off
  label: Subtitle On/Off
  kind: action
  command: "SU\r"
  params: []

- id: subtitle_choice
  label: Subtitle Choice
  kind: action
  command: "su\r"
  params: []

- id: osd
  label: OSD
  kind: action
  command: "OS\r"
  params: []

- id: record_copy
  label: Record/Copy
  kind: action
  command: "RC\r"
  params: []

- id: angle
  label: Angle
  kind: action
  command: "AN\r"
  params: []

- id: ab_repeat_lower
  label: AB Repeat (lower)
  kind: action
  command: "rp\r"
  params: []

- id: ab_repeat
  label: AB Repeat
  kind: action
  command: "AB\r"
  params: []

- id: phase_lower
  label: Phase (lower)
  kind: action
  command: "PH\r"
  params: []

- id: t_msr3
  label: T (MSR 3)
  kind: action
  command: "TB\r"
  params: []

- id: hash_button
  label: "# Button"
  kind: action
  command: "#B\r"
  params: []

- id: chapter_msr3
  label: Chapter (MSR 3)
  kind: action
  command: "CH\r"
  params: []

- id: setup
  label: Setup
  kind: action
  command: "SE\r"
  params: []

- id: menu
  label: Menu
  kind: action
  command: "ME\r"
  params: []

- id: return_cmd
  label: Return
  kind: action
  command: "RT\r"
  params: []

- id: enter
  label: Enter
  kind: action
  command: "EN\r"
  params: []

- id: top_menu
  label: TopMenu
  kind: action
  command: "TM\r"
  params: []

- id: next_page
  label: Next Page
  kind: action
  command: "NP\r"
  params: []

- id: previous_page
  label: Previous Page
  kind: action
  command: "PP\r"
  params: []

- id: function_clear
  label: Function + Clear
  kind: action
  command: "cl\r"
  params: []

- id: function_store
  label: Function + Store
  kind: action
  command: "sr\r"
  params: []

- id: function_display
  label: Function + Display
  kind: action
  command: "di\r"
  params: []

- id: function_mute
  label: Function + Mute
  kind: action
  command: "mu\r"
  params: []

- id: function_menu_up
  label: Function + Menu Up
  kind: action
  command: "mp\r"
  params: []

- id: function_menu_down
  label: Function + Menu Down
  kind: action
  command: "mm\r"
  params: []

- id: function_menu_left
  label: Function + Menu Left
  kind: action
  command: "ml\r"
  params: []

- id: function_menu_right
  label: Function + Menu Right
  kind: action
  command: "mr\r"
  params: []

- id: function_volume_up
  label: Function + Volume Up
  kind: action
  command: "vp\r"
  params: []

- id: function_volume_dn
  label: Function + Volume DN
  kind: action
  command: "vm\r"
  params: []

# DSP Preset commands (PN0-PN21)
- id: preset_direct
  label: Preset Direct
  kind: action
  command: "PN0\r"
  params: []

- id: preset_music
  label: Preset Music
  kind: action
  command: "PN1\r"
  params: []

- id: preset_trifield
  label: Preset Trifield
  kind: action
  command: "PN2\r"
  params: []

- id: preset_ambisonics
  label: Preset Ambisonics
  kind: action
  command: "PN3\r"
  params: []

- id: preset_super
  label: Preset Super
  kind: action
  command: "PN4\r"
  params: []

- id: preset_stereo
  label: Preset Stereo
  kind: action
  command: "PN5\r"
  params: []

- id: preset_music_logic
  label: Preset Music Logic
  kind: action
  command: "PN6\r"
  params: []

- id: preset_na_7
  label: Preset n/a (7)
  kind: action
  command: "PN7\r"
  params: []

- id: preset_na_8
  label: Preset n/a (8)
  kind: action
  command: "PN8\r"
  params: []

- id: preset_mono
  label: Preset Mono
  kind: action
  command: "PN9\r"
  params: []

- id: preset_tv_logic
  label: Preset TV Logic
  kind: action
  command: "PN10\r"
  params: []

- id: preset_pliix_music
  label: Preset PLIIx Music
  kind: action
  command: "PN11\r"
  params: []

- id: preset_pliix_movie
  label: Preset PLIIx Movie
  kind: action
  command: "PN12\r"
  params: []

- id: preset_pliix_thx
  label: Preset PLIIx THX
  kind: action
  command: "PN13\r"
  params: []

- id: preset_discrete
  label: Preset Discrete
  kind: action
  command: "PN14\r"
  params: []

- id: preset_cinema
  label: Preset Cinema
  kind: action
  command: "PN15\r"
  params: []

- id: preset_pliix_music6
  label: Preset PLIIx Music6
  kind: action
  command: "PN16\r"
  params: []

- id: preset_pliix_movie6
  label: Preset PLIIx Movie6
  kind: action
  command: "PN17\r"
  params: []

- id: preset_thx
  label: Preset THX
  kind: action
  command: "PN18\r"
  params: []

- id: preset_thx_ex
  label: Preset THX EX
  kind: action
  command: "PN19\r"
  params: []

- id: preset_thx_ultra_cinema
  label: Preset THX Ultra Cinema
  kind: action
  command: "PN20\r"
  params: []

- id: preset_thx_music
  label: Preset THX Music
  kind: action
  command: "PN21\r"
  params: []

# Direct Access commands (APnnxx syntax)
- id: direct_access
  label: Direct Access Control
  kind: action
  command: "AP{nn}{xx}\r"
  params:
    - name: nn
      type: string
      description: Menu option hex (e.g. 00=Preset, 01=Treble, 02=Bass, etc.)
    - name: xx
      type: string
      description: Value hex (range depends on menu option)

# Current Status queries
- id: status_source_dsp_volume
  label: Status - Source, DSP Mode & Volume
  kind: query
  command: "CS1\r"
  params: []

- id: status_source_dsp_gain
  label: Status - Source, DSP Mode & Gain
  kind: query
  command: "CS2\r"
  params: []

- id: status_source_audio_rate
  label: Status - Source, Incoming Audio & Rate
  kind: query
  command: "CS3\r"
  params: []
```

## Feedbacks
```yaml
- id: display_feedback
  type: string
  description: >
    Twenty-character feedback string mirroring front-panel display.
    Returned after every basic command. Format varies by command -
    typically shows Source, DSP Mode, and Volume/Gain on separate lines.
  # UNRESOLVED: exact parsing grammar for 20-char feedback not specified

- id: standby_feedback
  type: string
  values: ["."]
  description: Feedback from standby command is a single period.

- id: mute_feedback
  type: string
  values: ["Mute"]
  description: Feedback when mute is engaged.

- id: status_1_response
  type: string
  description: "Source, DSP Mode & Volume (e.g. CD\\nTrifield\\n65)"

- id: status_2_response
  type: string
  description: "Source, DSP Mode & Gain (e.g. CD\\nTrifield\\n-22)"

- id: status_3_response
  type: string
  description: "Source, Incoming Audio & Rate (e.g. CD\\nPCM 2-ch\\n44K)"
```

## Variables
```yaml
- id: volume
  type: integer
  min: 1
  max: 99
  description: Master volume level

- id: preset_number
  type: integer
  min: 0
  max: 21
  description: DSP preset index

- id: treble
  type: float
  min: -10.0
  max: 10.0
  step: 0.5
  unit: dB
  hex_min: EC
  hex_max: "14"
  description: Treble level (direct access AP01xx)

- id: bass
  type: float
  min: -5.0
  max: 5.0
  step: 0.5
  unit: dB
  hex_min: F6
  hex_max: "0A"
  description: Bass level (direct access AP02xx)

- id: lr_balance
  type: string
  description: Left/right balance (10L-10R, direct access AP04xx)

- id: lipsync
  type: float
  min: 0.0
  max: 30.0
  step: 0.5
  unit: ms
  description: Lip-sync delay (direct access AP1Dxx)

- id: rear_level
  type: string
  description: Rear level (30R-10F, direct access AP05xx)

- id: centre_level
  type: float
  min: -3.0
  max: 3.0
  step: 0.5
  unit: dB
  description: Centre level (direct access AP09xx)

- id: centre_delay
  type: float
  min: -2.5
  max: 5.0
  step: 0.5
  unit: ms
  description: Centre delay (direct access AP0Axx)

- id: side_level
  type: integer
  min: -30
  max: 10
  step: 1
  unit: dB
  description: Side level (direct access AP19xx)

- id: lfe_level
  type: integer
  min: -18
  max: 10
  step: 1
  unit: dB
  description: LFE level (direct access AP4Axx)
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source describes restrictions on direct access commands per DSP mode
# but does not describe safety interlocks or power sequencing
```

## Notes
- All basic commands are two ASCII characters terminated with carriage return (`\r`).
- Direct access commands use `APnnxx` syntax where `nn` (menu option) and `xx` (value) are hex.
- Direct access commands are context-sensitive — availability depends on incoming audio stream and selected DSP preset (see Restrictions column in source tables).
- The 861 sends a twenty-character feedback after each basic command, mirroring the front-panel display.
- Physical connection requires a null modem RS-232C cable.
- Some direct access parameters share the same menu name but different hex codes depending on DSP mode context (e.g. Rear Delay has three variants: `06`, `2C`, `44`).
- Lowercase commands (e.g. `rp`, `su`, `cl`, `sr`, `di`, `mu`, `mp`, `mm`, `ml`, `mr`, `vp`, `vm`) appear to be Function-combo variants of their uppercase counterparts.

<!-- UNRESOLVED: exact firmware versions or hardware revisions this doc covers -->
<!-- UNRESOLVED: whether 562 shares identical protocol (title says "Meridian 861" only) -->
<!-- UNRESOLVED: full parsing grammar for 20-char feedback string -->

## Provenance

```yaml
source_domains:
  - meridian-audio.info
  - meridian-audio.com
source_urls:
  - "https://www.meridian-audio.info/public/meridian861v6rs232%5B4342%5D.pdf"
  - https://meridian-audio.com/meridian-uploads/download/AppNotes/861v4_232.pdf
  - https://meridian-audio.com/meridian-uploads/download/Handbooks/500_Series/562v2user.pdf
retrieved_at: 2026-06-12T01:42:23.409Z
last_checked_at: 2026-06-12T19:25:11.057Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:25:11.057Z
matched_actions: 103
action_count: 103
confidence: medium
summary: "All 103 spec actions matched verbatim to source commands; transport parameters fully verified; complete coverage of source protocol. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no TCP/IP or other transport mentioned; RS-232 only"
- "firmware version compatibility not stated in source"
- "exact parsing grammar for 20-char feedback not specified"
- "no unsolicited notification protocol described in source"
- "no multi-step sequences described in source"
- "source describes restrictions on direct access commands per DSP mode"
- "exact firmware versions or hardware revisions this doc covers"
- "whether 562 shares identical protocol (title says \"Meridian 861\" only)"
- "full parsing grammar for 20-char feedback string"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
