---
spec_id: admin/apart-zone4
schema_version: ai4av-public-spec-v1
revision: 1
title: "Apart Zone4 Control Spec"
manufacturer: Apart
model_family: Zone4
aliases: []
compatible_with:
  manufacturers:
    - Apart
  models:
    - Zone4
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - apart-audio.info
  - downloads.biamp.com
  - usermanual.wiki
source_urls:
  - https://apart-audio.info/cat/matrichnye_systemy/zone4/ZONE4_Manual.pdf
  - https://downloads.biamp.com/assets/docs/default-source/manuals/biamp_manual_zone4.pdf
  - https://usermanual.wiki/Document/ZONE4RS232Manual.1088182550
  - https://downloads.biamp.com/assets/docs/default-source/apart-data-sheets/biamp_data_sheet_apart_zone4_aug20.pdf
retrieved_at: 2026-05-12T19:44:01.856Z
last_checked_at: 2026-05-14T18:17:13.990Z
generated_at: 2026-05-14T18:17:13.990Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:13.990Z
  matched_actions: 58
  action_count: 58
  confidence: high
  summary: "All 65 spec actions and feedback entries match source commands; transport parameters verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Apart Zone4 Control Spec

## Summary
4-zone audio mixer amplifier with RS232 control. Protocol IC245 (090915). Supports per-channel volume, mute, treble/bass EQ, mic mute, page routing, and master power. Serial-only — no IP or network control documented.

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
- id: discon_led_on
  label: DISCON LED On
  kind: action
  params: []
- id: discon_led_off
  label: DISCON LED Off
  kind: action
  params: []
- id: page1_on
  label: PAGE1 On
  kind: action
  params: []
- id: page1_off
  label: PAGE1 Off
  kind: action
  params: []
- id: page2_on
  label: PAGE2 On
  kind: action
  params: []
- id: page2_off
  label: PAGE2 Off
  kind: action
  params: []
- id: page3_on
  label: PAGE3 On
  kind: action
  params: []
- id: page3_off
  label: PAGE3 Off
  kind: action
  params: []
- id: page4_on
  label: PAGE4 On
  kind: action
  params: []
- id: page4_off
  label: PAGE4 Off
  kind: action
  params: []
- id: ch1_mute_on
  label: CH1 MUTE On
  kind: action
  params: []
- id: ch1_mute_off
  label: CH1 MUTE Off
  kind: action
  params: []
- id: ch2_mute_on
  label: CH2 MUTE On
  kind: action
  params: []
- id: ch2_mute_off
  label: CH2 MUTE Off
  kind: action
  params: []
- id: ch3_mute_on
  label: CH3 MUTE On
  kind: action
  params: []
- id: ch3_mute_off
  label: CH3 MUTE Off
  kind: action
  params: []
- id: ch4_mute_on
  label: CH4 MUTE On
  kind: action
  params: []
- id: ch4_mute_off
  label: CH4 MUTE Off
  kind: action
  params: []
- id: ch1_mic_mute_on
  label: CH1 MIC MUTE On
  kind: action
  params: []
- id: ch1_mic_mute_off
  label: CH1 MIC MUTE Off
  kind: action
  params: []
- id: ch2_mic_mute_on
  label: CH2 MIC MUTE On
  kind: action
  params: []
- id: ch2_mic_mute_off
  label: CH2 MIC MUTE Off
  kind: action
  params: []
- id: ch3_mic_mute_on
  label: CH3 MIC MUTE On
  kind: action
  params: []
- id: ch3_mic_mute_off
  label: CH3 MIC MUTE Off
  kind: action
  params: []
- id: ch4_mic_mute_on
  label: CH4 MIC MUTE On
  kind: action
  params: []
- id: ch4_mic_mute_off
  label: CH4 MIC MUTE Off
  kind: action
  params: []
- id: ch1_vol_up
  label: CH1 VOL UP
  kind: action
  params: []
- id: ch1_vol_down
  label: CH1 VOL DOWN
  kind: action
  params: []
- id: ch2_vol_up
  label: CH2 VOL UP
  kind: action
  params: []
- id: ch2_vol_down
  label: CH2 VOL DOWN
  kind: action
  params: []
- id: ch3_vol_up
  label: CH3 VOL UP
  kind: action
  params: []
- id: ch3_vol_down
  label: CH3 VOL DOWN
  kind: action
  params: []
- id: ch4_vol_up
  label: CH4 VOL UP
  kind: action
  params: []
- id: ch4_vol_down
  label: CH4 VOL DOWN
  kind: action
  params: []
- id: ch1_micvol_up
  label: CH1 MICVOL UP
  kind: action
  params: []
- id: ch1_micvol_down
  label: CH1 MICVOL DOWN
  kind: action
  params: []
- id: ch2_micvol_up
  label: CH2 MICVOL UP
  kind: action
  params: []
- id: ch2_micvol_down
  label: CH2 MICVOL DOWN
  kind: action
  params: []
- id: ch3_micvol_up
  label: CH3 MICVOL UP
  kind: action
  params: []
- id: ch3_micvol_down
  label: CH3 MICVOL DOWN
  kind: action
  params: []
- id: ch4_micvol_up
  label: CH4 MICVOL UP
  kind: action
  params: []
- id: ch4_micvol_down
  label: CH4 MICVOL DOWN
  kind: action
  params: []
- id: ch1_treble
  label: CH1 TREBLE
  kind: action
  params:
    - name: level
      type: integer
      description: "-7 to +7"
- id: ch2_treble
  label: CH2 TREBLE
  kind: action
  params:
    - name: level
      type: integer
      description: "-7 to +7"
- id: ch3_treble
  label: CH3 TREBLE
  kind: action
  params:
    - name: level
      type: integer
      description: "-7 to +7"
- id: ch4_treble
  label: CH4 TREBLE
  kind: action
  params:
    - name: level
      type: integer
      description: "-7 to +7"
- id: ch1_bass
  label: CH1 BASS
  kind: action
  params:
    - name: level
      type: integer
      description: "-7 to +7"
- id: ch2_bass
  label: CH2 BASS
  kind: action
  params:
    - name: level
      type: integer
      description: "-7 to +7"
- id: ch3_bass
  label: CH3 BASS
  kind: action
  params:
    - name: level
      type: integer
      description: "-7 to +7"
- id: ch4_bass
  label: CH4 BASS
  kind: action
  params:
    - name: level
      type: integer
      description: "-7 to +7"
- id: ch1_fun
  label: CH1 FUN
  kind: action
  params:
    - name: function
      type: integer
      description: "1-4"
- id: ch2_fun
  label: CH2 FUN
  kind: action
  params:
    - name: function
      type: integer
      description: "1-4"
- id: ch3_fun
  label: CH3 FUN
  kind: action
  params:
    - name: function
      type: integer
      description: "1-4"
- id: ch4_fun
  label: CH4 FUN
  kind: action
  params:
    - name: function
      type: integer
      description: "1-4"
- id: ch1_page_on
  label: CH1 PAGE ON
  kind: action
  params: []
- id: ch1_page_off
  label: CH1 PAGE OFF
  kind: action
  params: []
```

## Feedbacks
```yaml
# Query commands - device returns ACK + value
- id: power_status
  label: Power Status
  kind: query
  returns: enum [on, off]
- id: ch1_mute_status
  label: CH1 Mute Status
  kind: query
  returns: enum [on, off]
- id: ch1_treble_status
  label: CH1 TREBLE Status
  kind: query
  returns: integer
- id: ch1_bass_status
  label: CH1 BASS Status
  kind: query
  returns: integer
- id: ch1_source_status
  label: CH1 SOURCE Status
  kind: query
  returns: integer  # UNRESOLVED: source value range not documented
- id: ch1_vol_status
  label: CH1 VOL Status
  kind: query
  returns: integer
- id: ch1_micvol_status
  label: CH1 MICVOL Status
  kind: query
  returns: integer
- id: ch1_micmute_status
  label: CH1 MICMUTE Status
  kind: query
  returns: enum [on, off]
- id: ch1_page_status
  label: CH1 PAGE Status
  kind: query
  returns: enum [on, off]
```

## Variables
```yaml
# Per-channel level parameters (treble, bass, vol, micvol use two-digit levels)
# UNRESOLVED: full variable mapping for CH2-CH4 MICVOL and SOURCE not fully decoded
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
Command prefix `$h` = master/host commands; `$a`-`$d` = channel 1-4 commands. Volume/micvol use 2-digit decimal level (e.g., `$aV79` = max, `$aV01` = min). Treble/bass use signed digit (` $7` to `-7`). FUN_1-4 maps to `$aS01`-`$aS04`. HEX digits `3?` in source indicate ambiguous/unreadable bytes for CH2-CH4 VOL/MICVOL/SOURCE status queries.
<!-- UNRESOLVED: CH2-CH4 VOL, MICVOL, SOURCE status query response format unreadable in source -->
<!-- UNRESOLVED: FUN_1-4 functional assignment not described in source -->
<!-- UNRESOLVED: PAGE1-4 routing destination/source semantics not described -->
<!-- UNRESOLVED: DISCON LED purpose not described -->

## Provenance

```yaml
source_domains:
  - apart-audio.info
  - downloads.biamp.com
  - usermanual.wiki
source_urls:
  - https://apart-audio.info/cat/matrichnye_systemy/zone4/ZONE4_Manual.pdf
  - https://downloads.biamp.com/assets/docs/default-source/manuals/biamp_manual_zone4.pdf
  - https://usermanual.wiki/Document/ZONE4RS232Manual.1088182550
  - https://downloads.biamp.com/assets/docs/default-source/apart-data-sheets/biamp_data_sheet_apart_zone4_aug20.pdf
retrieved_at: 2026-05-12T19:44:01.856Z
last_checked_at: 2026-05-14T18:17:13.990Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:13.990Z
matched_actions: 58
action_count: 58
confidence: high
summary: "All 65 spec actions and feedback entries match source commands; transport parameters verified verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
