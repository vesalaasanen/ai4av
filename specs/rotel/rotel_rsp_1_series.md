---
spec_id: admin/rotel-rsp-1582
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RSP-1582 Control Spec"
manufacturer: Rotel
model_family: RSP-1582
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RSP-1582
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RSP1582%20Protocol_0.pdf"
retrieved_at: 2026-05-04T16:42:05.997Z
last_checked_at: 2026-06-02T22:13:35.853Z
generated_at: 2026-06-02T22:13:35.853Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "power-on sequencing requirements not documented"
  - "no discrete settable parameters beyond action commands - all level trims"
  - "no unsolicited event descriptions in source - device sends responses"
  - "no multi-step macro sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "entity_id placeholder — fill in from Convex dashboard before ingestion"
  - "full firmware compatibility range not stated — only V2.xx and V5.xx mentioned"
  - "fault behavior and error recovery sequences not documented"
  - "binary command encoding not applicable — this is ASCII protocol only"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:13:35.853Z
  matched_actions: 67
  action_count: 67
  confidence: medium
  summary: "All 67 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# Rotel RSP-1582 Control Spec

## Summary
The Rotel RSP-1582 is a surround sound processor / preamplifier supporting both RS-232 and IP (TCP) control. Commands are ASCII-based, terminated by `!`. Volume format differs between HDMI 1.4 (V2.xx, dB range) and HDMI 2.0a (V5.xx, flat 0–96 range).

<!-- UNRESOLVED: power-on sequencing requirements not documented -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 9596
serial:
  baud_rate: 115200
  parity: none
  data_bits: 8
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# inferred from command presence
- powerable
- levelable
- queryable
- routable
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
- id: power_toggle
  label: Power Toggle
  kind: action
  params: []
- id: volume_up
  label: Volume Up
  kind: action
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  params: []
- id: set_volume_db
  label: Set Volume (dB, V2.xx)
  kind: action
  params:
    - name: level
      type: number
      description: dB level, -90.0 (min) to 0.0 (max). Applies to SW V2.xx only.
- id: set_volume_flat
  label: Set Volume (flat, V5.xx)
  kind: action
  params:
    - name: level
      type: integer
      description: Flat level 0 (min) - 96 (max). Applies to SW V5.xx only.
- id: mute_toggle
  label: Mute Toggle
  kind: action
  params: []
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: source_cd
  label: Source CD
  kind: action
  params: []
- id: source_video1
  label: Source Video 1
  kind: action
  params: []
- id: source_video2
  label: Source Video 2
  kind: action
  params: []
- id: source_video3
  label: Source Video 3
  kind: action
  params: []
- id: source_video4
  label: Source Video 4
  kind: action
  params: []
- id: source_video5
  label: Source Video 5
  kind: action
  params: []
- id: source_video6
  label: Source Video 6
  kind: action
  params: []
- id: source_video7
  label: Source Video 7
  kind: action
  params: []
- id: source_video8
  label: Source Video 8
  kind: action
  params: []
- id: source_tuner
  label: Source Tuner
  kind: action
  params: []
- id: source_phono
  label: Source Phono
  kind: action
  params: []
- id: source_usb
  label: Source Front USB
  kind: action
  params: []
- id: source_pc_usb
  label: Source PC-USB
  kind: action
  params: []
- id: source_bal_xlr
  label: Source XLR
  kind: action
  params: []
- id: source_bluetooth
  label: Source Bluetooth
  kind: action
  params: []
- id: source_multi_input
  label: Source Multi Input
  kind: action
  params: []
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
- id: track_fwd
  label: Track Forward / Tune Up
  kind: action
  params: []
- id: track_back
  label: Track Backward / Tune Down
  kind: action
  params: []
- id: menu
  label: Display Menu
  kind: action
  params: []
- id: exit
  label: Exit Key
  kind: action
  params: []
- id: cursor_up
  label: Cursor Up
  kind: action
  params: []
- id: cursor_down
  label: Cursor Down
  kind: action
  params: []
- id: cursor_left
  label: Cursor Left
  kind: action
  params: []
- id: cursor_right
  label: Cursor Right
  kind: action
  params: []
- id: enter
  label: Enter Key
  kind: action
  params: []
- id: dsp_2channel
  label: Select 2 Channel Stereo
  kind: action
  params: []
- id: dsp_3channel
  label: Select 3 Channel Stereo
  kind: action
  params: []
- id: dsp_5channel
  label: Select 5 Channel Stereo
  kind: action
  params: []
- id: dsp_7channel
  label: Select 7 Channel Stereo
  kind: action
  params: []
- id: dsp_prologic_music
  label: Select Pro Logic II Music
  kind: action
  params: []
- id: dsp_prologic_movie
  label: Select Pro Logic II Movie
  kind: action
  params: []
- id: dsp_prologic_game
  label: Select Pro Logic II Game
  kind: action
  params: []
- id: dsp_prologic_iiz
  label: Select Pro Logic IIz
  kind: action
  params: []
- id: dsp_neo6_music
  label: Select dts Neo:6 Music
  kind: action
  params: []
- id: dsp_neo6_cinema
  label: Select dts Neo:6 Cinema
  kind: action
  params: []
- id: dsp_bypass
  label: Select Analog Bypass
  kind: action
  params: []
- id: dsp_surround_next
  label: Cycle DSP Mode
  kind: action
  params: []
- id: subwoofer_up
  label: Subwoofer Level +0.5dB
  kind: action
  params: []
- id: subwoofer_down
  label: Subwoofer Level -0.5dB
  kind: action
  params: []
- id: center_up
  label: Center Level +0.5dB
  kind: action
  params: []
- id: center_down
  label: Center Level -0.5dB
  kind: action
  params: []
- id: surround_right_up
  label: Surround Right Level +0.5dB
  kind: action
  params: []
- id: surround_right_down
  label: Surround Right Level -0.5dB
  kind: action
  params: []
- id: surround_left_up
  label: Surround Left Level +0.5dB
  kind: action
  params: []
- id: surround_left_down
  label: Surround Left Level -0.5dB
  kind: action
  params: []
- id: center_back_right_up
  label: Center Back Right Level +0.5dB
  kind: action
  params: []
- id: center_back_right_down
  label: Center Back Right Level -0.5dB
  kind: action
  params: []
- id: center_back_left_up
  label: Center Back Left Level +0.5dB
  kind: action
  params: []
- id: center_back_left_down
  label: Center Back Left Level -0.5dB
  kind: action
  params: []
- id: dimmer_toggle
  label: Toggle Display Dimmer
  kind: action
  params: []
- id: dimmer_0
  label: Set Display to Neutral
  kind: action
  params: []
- id: dimmer_minus
  label: Set Display Dimmer Negative
  kind: action
  params:
    - name: level
      type: integer
      description: Dimmer level 1-10
- id: dimmer_plus
  label: Set Display Dimmer Positive
  kind: action
  params:
    - name: level
      type: integer
      description: Dimmer level 1-10
- id: factory_default_on
  label: Reset to Factory Defaults
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [on, standby]
- id: current_source
  label: Current Source
  type: enum
  values:
    - cd
    - coax1
    - coax2
    - coax3
    - opt1
    - opt2
    - opt3
    - tuner
    - phono
    - usb
    - pc_usb
    - video1
    - video2
    - video3
    - video4
    - video5
    - video6
    - video7
    - video8
    - bluetooth
    - bal_xlr
    - multi_input
- id: volume_level
  label: Volume Level
  type: string
  description: Format varies by firmware - dB string (V2.xx) or flat integer (V5.xx)
- id: mute_status
  label: Mute Status
  type: enum
  values: [on, off]
- id: dsp_mode
  label: DSP Mode
  type: enum
  values:
    - stereo
    - dolby_3_stereo
    - 5_channel_stereo
    - 7_channel_stereo
    - dolby_plii_music
    - dolby_pliix_music
    - dolby_plii_movie
    - dolby_pliix_movie
    - dolby_plii_game
    - dolby_pliix_game
    - dolby_pliiz
    - dts_neo:6_music
    - dts_neo:6_cinema
    - analog_bypass
    - source_dependent
- id: subwoofer_level
  label: Subwoofer Level Trim
  type: string
  description: Format +/-##.#db
- id: center_level
  label: Center Level Trim
  type: string
  description: Format +/-##.#db
- id: surround_right_level
  label: Surround Right Level Trim
  type: string
  description: Format +/-##.#db
- id: surround_left_level
  label: Surround Left Level Trim
  type: string
  description: Format +/-##.#db
- id: center_back_right_level
  label: Center Back Right Level Trim
  type: string
  description: Format +/-##.#db
- id: center_back_left_level
  label: Center Back Left Level Trim
  type: string
  description: Format +/-##.#db
- id: dimmer_level
  label: Display Dimmer Level
  type: string
  description: Format +/-## or 0
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond action commands - all level trims
# are incremental (up/down) not absolute-set commands in the source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event descriptions in source - device sends responses
# to commands only; no standing notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
RS-232 hardware does not support flow control — avoid packet loss by pacing command traffic. All commands terminated by `!` only — no carriage return or line feed. Status responses terminated by `!` or a byte count for variable-length text. IP control response is slower when Front USB input is selected — use RS-232 instead if Front USB is needed.

Volume command format changed with HDMI 2.0a update: V2.xx uses dB format `volume_-90.0db!`, V5.xx uses flat range `volume_96!`. Ensure control application handles both formats or verifies firmware version before sending commands.

<!-- UNRESOLVED: entity_id placeholder — fill in from Convex dashboard before ingestion -->
<!-- UNRESOLVED: full firmware compatibility range not stated — only V2.xx and V5.xx mentioned -->
<!-- UNRESOLVED: fault behavior and error recovery sequences not documented -->
<!-- UNRESOLVED: binary command encoding not applicable — this is ASCII protocol only -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RSP1582%20Protocol_0.pdf"
retrieved_at: 2026-05-04T16:42:05.997Z
last_checked_at: 2026-06-02T22:13:35.853Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:13:35.853Z
matched_actions: 67
action_count: 67
confidence: medium
summary: "All 67 spec actions traced to source (dip-safe re-verify). (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "power-on sequencing requirements not documented"
- "no discrete settable parameters beyond action commands - all level trims"
- "no unsolicited event descriptions in source - device sends responses"
- "no multi-step macro sequences described in source"
- "no safety warnings or interlock procedures in source"
- "entity_id placeholder — fill in from Convex dashboard before ingestion"
- "full firmware compatibility range not stated — only V2.xx and V5.xx mentioned"
- "fault behavior and error recovery sequences not documented"
- "binary command encoding not applicable — this is ASCII protocol only"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
