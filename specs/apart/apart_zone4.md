---
spec_id: admin/apart-zone4
schema_version: ai4av-public-spec-v1
revision: 1
title: "Apart Zone4 Control Spec"
manufacturer: Apart
model_family: ZONE4
aliases: []
compatible_with:
  manufacturers:
    - Apart
  models:
    - ZONE4
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
last_checked_at: 2026-06-02T07:36:14.155Z
generated_at: 2026-06-02T07:36:14.155Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source documents only CH1 (prefix `a`) examples for status queries; CH2/3/4 query variants (prefixes b/c/d) follow the same $xR N pattern but are not explicitly listed."
  - "source does not document the full numeric range for VOL (V), MICVOL (C), or TRE/BAS values; only the example bounds 01/79 and -7..+7 are stated."
  - "source does not document any unsolicited device-initiated notifications."
  - "source does not document any multi-step sequences."
  - "source does not contain safety warnings, interlock procedures, or power-on sequencing requirements."
  - "source lists $aR 1..$aR 9 (CH1) status queries but does not explicitly list $bR/$cR/$dR query variants for CH2/3/4; the symmetric a/b/c/d prefix pattern is implied."
  - "full numeric range of VOL and MICVOL is not stated — only \"01\" and \"79\" are given as concrete examples."
  - "full numeric range of TRE and BAS is documented only for CH1 (-7..+7); CH2/3/4 only have a single \"0\" example each."
  - "source does not document DB-9 pinout, cable type (null modem vs straight-through), or any electrical interface details beyond 9600/8/N/1."
  - "source does not document device firmware version, baud-rate auto-negotiation, or behavior on malformed input."
verification:
  verdict: verified
  checked_at: 2026-06-02T07:36:14.155Z
  matched_actions: 85
  action_count: 85
  confidence: medium
  summary: "All 85 spec actions matched exactly to source command tokens; transport parameters (9600/8/N/1) verified; complete coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Apart Zone4 Control Spec

## Summary
The Apart Zone4 is a 4-zone commercial audio preamp/matrix with an RS-232 control port. This spec documents the ASCII command set ("IC245" protocol, dated 2009-09-15) for remote control of global power, paging page-routing LEDs, per-channel mute and mic-mute, line and microphone volume, source select (FUN_1..4), and treble/bass EQ, plus per-channel status queries.

<!-- UNRESOLVED: source documents only CH1 (prefix `a`) examples for status queries; CH2/3/4 query variants (prefixes b/c/d) follow the same $xR N pattern but are not explicitly listed. -->
<!-- UNRESOLVED: source does not document the full numeric range for VOL (V), MICVOL (C), or TRE/BAS values; only the example bounds 01/79 and -7..+7 are stated. -->

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
- powerable       # inferred from PW1/PW2 power commands
- routable        # inferred from PAGE1..4 and FUN_1..4 source-select commands
- queryable       # inferred from $aR N status query commands
- levelable       # inferred from vol, micvol, treble, bass commands
```

## Actions
```yaml
# All commands below are 5-byte ASCII strings, transmitted verbatim on the RS-232
# link. Hex equivalents are listed in the source document.

- id: power_on
  label: Power On (all)
  kind: action
  command: "$hPW1"
  params: []

- id: power_off
  label: Power Off (all)
  kind: action
  command: "$hPW2"
  params: []

- id: discon_led_on
  label: DISCON LED On
  kind: action
  command: "$hPW3"
  params: []

- id: discon_led_off
  label: DISCON LED Off
  kind: action
  command: "$hPW4"
  params: []

- id: page1_on
  label: PAGE1 On
  kind: action
  command: "$hPW5"
  params: []

- id: page1_off
  label: PAGE1 Off
  kind: action
  command: "$hPW6"
  params: []

- id: page2_on
  label: PAGE2 On
  kind: action
  command: "$hPW7"
  params: []

- id: page2_off
  label: PAGE2 Off
  kind: action
  command: "$hPW8"
  params: []

- id: page3_on
  label: PAGE3 On
  kind: action
  command: "$hPW9"
  params: []

- id: page3_off
  label: PAGE3 Off
  kind: action
  command: "$hPWa"
  params: []

- id: page4_on
  label: PAGE4 On
  kind: action
  command: "$hPWB"
  params: []

- id: page4_off
  label: PAGE4 Off
  kind: action
  command: "$hPWC"
  params: []

- id: ch1_mute_on
  label: CH1 Mute On
  kind: action
  command: "$aM01"
  params: []

- id: ch1_mute_off
  label: CH1 Mute Off
  kind: action
  command: "$aM02"
  params: []

- id: ch2_mute_on
  label: CH2 Mute On
  kind: action
  command: "$bM01"
  params: []

- id: ch2_mute_off
  label: CH2 Mute Off
  kind: action
  command: "$bM02"
  params: []

- id: ch3_mute_on
  label: CH3 Mute On
  kind: action
  command: "$cM01"
  params: []

- id: ch3_mute_off
  label: CH3 Mute Off
  kind: action
  command: "$cM02"
  params: []

- id: ch4_mute_on
  label: CH4 Mute On
  kind: action
  command: "$dM01"
  params: []

- id: ch4_mute_off
  label: CH4 Mute Off
  kind: action
  command: "$dM02"
  params: []

- id: ch1_mic_mute_on
  label: CH1 Mic Mute On
  kind: action
  command: "$aM03"
  params: []

- id: ch1_mic_mute_off
  label: CH1 Mic Mute Off
  kind: action
  command: "$aM04"
  params: []

- id: ch2_mic_mute_on
  label: CH2 Mic Mute On
  kind: action
  command: "$bM03"
  params: []

- id: ch2_mic_mute_off
  label: CH2 Mic Mute Off
  kind: action
  command: "$bM04"
  params: []

- id: ch3_mic_mute_on
  label: CH3 Mic Mute On
  kind: action
  command: "$cM03"
  params: []

- id: ch3_mic_mute_off
  label: CH3 Mic Mute Off
  kind: action
  command: "$cM04"
  params: []

- id: ch4_mic_mute_on
  label: CH4 Mic Mute On
  kind: action
  command: "$dM03"
  params: []

- id: ch4_mic_mute_off
  label: CH4 Mic Mute Off
  kind: action
  command: "$dM04"
  params: []

- id: ch1_vol_up
  label: CH1 Volume Up
  kind: action
  command: "$avup"
  params: []

- id: ch1_vol_down
  label: CH1 Volume Down
  kind: action
  command: "$avdn"
  params: []

- id: ch2_vol_up
  label: CH2 Volume Up
  kind: action
  command: "$bvup"
  params: []

- id: ch2_vol_down
  label: CH2 Volume Down
  kind: action
  command: "$bvdn"
  params: []

- id: ch3_vol_up
  label: CH3 Volume Up
  kind: action
  command: "$cvup"
  params: []

- id: ch3_vol_down
  label: CH3 Volume Down
  kind: action
  command: "$cvdn"
  params: []

- id: ch4_vol_up
  label: CH4 Volume Up
  kind: action
  command: "$dvup"
  params: []

- id: ch4_vol_down
  label: CH4 Volume Down
  kind: action
  command: "$dvdn"
  params: []

- id: ch1_micvol_up
  label: CH1 Mic Volume Up
  kind: action
  command: "$acup"
  params: []

- id: ch1_micvol_down
  label: CH1 Mic Volume Down
  kind: action
  command: "$acdn"
  params: []

- id: ch2_micvol_up
  label: CH2 Mic Volume Up
  kind: action
  command: "$bcup"
  params: []

- id: ch2_micvol_down
  label: CH2 Mic Volume Down
  kind: action
  command: "$bcdn"
  params: []

- id: ch3_micvol_up
  label: CH3 Mic Volume Up
  kind: action
  command: "$ccup"
  params: []

- id: ch3_micvol_down
  label: CH3 Mic Volume Down
  kind: action
  command: "$ccdn"
  params: []

- id: ch4_micvol_up
  label: CH4 Mic Volume Up
  kind: action
  command: "$dcup"
  params: []

- id: ch4_micvol_down
  label: CH4 Mic Volume Down
  kind: action
  command: "$dcdn"
  params: []

- id: ch1_volume_set
  label: CH1 Volume Set
  kind: action
  command: "$aV{level}"
  params:
    - name: level
      type: string
      description: Two-digit decimal volume value (e.g. "01".."79"); full range not stated in source

- id: ch2_volume_set
  label: CH2 Volume Set
  kind: action
  command: "$bV{level}"
  params:
    - name: level
      type: string
      description: Two-digit decimal volume value; source shows "??" placeholder, format same as CH1

- id: ch3_volume_set
  label: CH3 Volume Set
  kind: action
  command: "$cV{level}"
  params:
    - name: level
      type: string
      description: Two-digit decimal volume value; source shows "??" placeholder, format same as CH1

- id: ch4_volume_set
  label: CH4 Volume Set
  kind: action
  command: "$dV{level}"
  params:
    - name: level
      type: string
      description: Two-digit decimal volume value; source shows "??" placeholder, format same as CH1

- id: ch1_micvol_set
  label: CH1 Mic Volume Set
  kind: action
  command: "$aC{level}"
  params:
    - name: level
      type: string
      description: Two-digit decimal mic volume value (e.g. "01".."79")

- id: ch2_micvol_set
  label: CH2 Mic Volume Set
  kind: action
  command: "$bC{level}"
  params:
    - name: level
      type: string
      description: Two-digit decimal mic volume value; source shows "??" placeholder

- id: ch3_micvol_set
  label: CH3 Mic Volume Set
  kind: action
  command: "$cC{level}"
  params:
    - name: level
      type: string
      description: Two-digit decimal mic volume value; source shows "??" placeholder

- id: ch4_micvol_set
  label: CH4 Mic Volume Set
  kind: action
  command: "$dC{level}"
  params:
    - name: level
      type: string
      description: Two-digit decimal mic volume value; source shows "??" placeholder

- id: ch1_fun_1
  label: CH1 Source Select FUN 1
  kind: action
  command: "$aS01"
  params: []

- id: ch1_fun_2
  label: CH1 Source Select FUN 2
  kind: action
  command: "$aS02"
  params: []

- id: ch1_fun_3
  label: CH1 Source Select FUN 3
  kind: action
  command: "$aS03"
  params: []

- id: ch1_fun_4
  label: CH1 Source Select FUN 4
  kind: action
  command: "$aS04"
  params: []

- id: ch2_fun_1
  label: CH2 Source Select FUN 1
  kind: action
  command: "$bS01"
  params: []

- id: ch2_fun_2
  label: CH2 Source Select FUN 2
  kind: action
  command: "$bS02"
  params: []

- id: ch2_fun_3
  label: CH2 Source Select FUN 3
  kind: action
  command: "$bS03"
  params: []

- id: ch2_fun_4
  label: CH2 Source Select FUN 4
  kind: action
  command: "$bS04"
  params: []

- id: ch3_fun_1
  label: CH3 Source Select FUN 1
  kind: action
  command: "$cS01"
  params: []

- id: ch3_fun_2
  label: CH3 Source Select FUN 2
  kind: action
  command: "$cS02"
  params: []

- id: ch3_fun_3
  label: CH3 Source Select FUN 3
  kind: action
  command: "$cS03"
  params: []

- id: ch3_fun_4
  label: CH3 Source Select FUN 4
  kind: action
  command: "$cS04"
  params: []

- id: ch4_fun_1
  label: CH4 Source Select FUN 1
  kind: action
  command: "$dS01"
  params: []

- id: ch4_fun_2
  label: CH4 Source Select FUN 2
  kind: action
  command: "$dS02"
  params: []

- id: ch4_fun_3
  label: CH4 Source Select FUN 3
  kind: action
  command: "$dS03"
  params: []

- id: ch4_fun_4
  label: CH4 Source Select FUN 4
  kind: action
  command: "$dS04"
  params: []

- id: ch1_treble
  label: CH1 Treble
  kind: action
  command: "$aT{value}"
  params:
    - name: value
      type: string
      description: Integer -7..+7; encoded with ASCII space (0x20) for non-negative and hyphen (0x2D) for negative. Source shows "$aT 0".."$aT 7" and "$aT-1".."$aT-7".

- id: ch2_treble
  label: CH2 Treble
  kind: action
  command: "$bT{value}"
  params:
    - name: value
      type: string
      description: Integer -7..+7; same sign encoding as CH1. Source only documents the "$bT 0" example.

- id: ch3_treble
  label: CH3 Treble
  kind: action
  command: "$cT{value}"
  params:
    - name: value
      type: string
      description: Integer -7..+7; same sign encoding as CH1. Source only documents the "$cT 0" example.

- id: ch4_treble
  label: CH4 Treble
  kind: action
  command: "$dT{value}"
  params:
    - name: value
      type: string
      description: Integer -7..+7; same sign encoding as CH1. Source only documents the "$dT 0" example.

- id: ch1_bass
  label: CH1 Bass
  kind: action
  command: "$aU{value}"
  params:
    - name: value
      type: string
      description: Integer -7..+7; same sign encoding as treble (space for non-negative, hyphen for negative)

- id: ch2_bass
  label: CH2 Bass
  kind: action
  command: "$bU{value}"
  params:
    - name: value
      type: string
      description: Integer -7..+7; same sign encoding. Source only documents the "$bU 0" example.

- id: ch3_bass
  label: CH3 Bass
  kind: action
  command: "$cU{value}"
  params:
    - name: value
      type: string
      description: Integer -7..+7; same sign encoding. Source only documents the "$cU 0" example.

- id: ch4_bass
  label: CH4 Bass
  kind: action
  command: "$dU{value}"
  params:
    - name: value
      type: string
      description: Integer -7..+7; same sign encoding. Source only documents the "$dU 0" example.

- id: query_power_status
  label: Power Status Query
  kind: query
  command: "$aR 1"
  params: []

- id: query_ch1_mute_status
  label: CH1 Mute Status Query
  kind: query
  command: "$aR 2"
  params: []

- id: query_ch1_treble_status
  label: CH1 Treble Status Query
  kind: query
  command: "$aR 3"
  params: []

- id: query_ch1_bass_status
  label: CH1 Bass Status Query
  kind: query
  command: "$aR 4"
  params: []

- id: query_ch1_source_status
  label: CH1 Source Status Query
  kind: query
  command: "$aR 5"
  params: []

- id: query_ch1_vol_status
  label: CH1 Volume Status Query
  kind: query
  command: "$aR 6"
  params: []

- id: query_ch1_micvol_status
  label: CH1 Mic Volume Status Query
  kind: query
  command: "$aR 7"
  params: []

- id: query_ch1_micmute_status
  label: CH1 Mic Mute Status Query
  kind: query
  command: "$aR 8"
  params: []

- id: query_ch1_page_status
  label: CH1 Page Status Query
  kind: query
  command: "$aR 9"
  params: []
```

## Feedbacks
```yaml
# ACK responses returned by the device after a status query.
# Each feedback is keyed by the same channel letter the query used (a=CH1, b=CH2, c=CH3, d=CH4, h=ALL).

- id: power_state
  type: enum
  values: [on, off]
  description: |
    Returned for query_power_status ($aR 1). Device returns "$hPW1" for on, "$hPW2" for off.

- id: ch1_mute_state
  type: enum
  values: [on, off]
  description: |
    Returned for query_ch1_mute_status ($aR 2). Device returns "$aM01" for on, "$aM02" for off.

- id: ch1_treble_state
  type: string
  description: |
    Returned for query_ch1_treble_status ($aR 3). Device returns "$aT {n}" (n in -7..+7, space for non-negative).

- id: ch1_bass_state
  type: string
  description: |
    Returned for query_ch1_bass_status ($aR 4). Device returns "$aU {n}" (n in -7..+7, space for non-negative).

- id: ch1_source_state
  type: enum
  values: ["1", "2", "3", "4"]
  description: |
    Returned for query_ch1_source_status ($aR 5). Device returns "$aS01".."$aS04".

- id: ch1_volume_state
  type: string
  description: |
    Returned for query_ch1_vol_status ($aR 6). Device returns "$aV{nn}" (two-digit decimal, "01".."79" shown).

- id: ch1_micvol_state
  type: string
  description: |
    Returned for query_ch1_micvol_status ($aR 7). Device returns "$aC{nn}" (two-digit decimal).

- id: ch1_micmute_state
  type: enum
  values: [on, off]
  description: |
    Returned for query_ch1_micmute_status ($aR 8). Device returns "$aM03" for on, "$aM04" for off.

- id: page_state
  type: enum
  values: ["1", "2", "3", "4"]
  description: |
    Returned for query_ch1_page_status ($aR 9). Active page is echoed as the corresponding "$hPW5".."$hPWC" command.
```

## Variables
```yaml
# Discrete set/level commands are modeled as parameterized Actions above (vol_set, micvol_set, treble, bass).
# No additional ambient variables documented in the source.
```

## Events
```yaml
# UNRESOLVED: source does not document any unsolicited device-initiated notifications.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
All commands in this spec are fixed 5-byte ASCII strings. The protocol header in the source is "IC245 (ZONE4) ASCII (090915)" — IC245 is the internal protocol code and 090915 is the protocol revision date (2009-09-15). The dollar sign `$` is a literal first byte (0x24) of every command. The prefix letter selects the channel: `a`=CH1, `b`=CH2, `c`=CH3, `d`=CH4, `h`=ALL/global. Treble and bass values use a sign-encoded single digit with ASCII space (0x20) for non-negative and ASCII hyphen (0x2D) for negative; e.g. "$aT 3" is treble +3 and "$aT-3" is treble -3. Volume and mic-volume use two decimal digits ("$aV79" is level 79, "$aV01" is level 1).

<!-- UNRESOLVED: source lists $aR 1..$aR 9 (CH1) status queries but does not explicitly list $bR/$cR/$dR query variants for CH2/3/4; the symmetric a/b/c/d prefix pattern is implied. -->
<!-- UNRESOLVED: full numeric range of VOL and MICVOL is not stated — only "01" and "79" are given as concrete examples. -->
<!-- UNRESOLVED: full numeric range of TRE and BAS is documented only for CH1 (-7..+7); CH2/3/4 only have a single "0" example each. -->
<!-- UNRESOLVED: source does not document DB-9 pinout, cable type (null modem vs straight-through), or any electrical interface details beyond 9600/8/N/1. -->
<!-- UNRESOLVED: source does not document device firmware version, baud-rate auto-negotiation, or behavior on malformed input. -->

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
last_checked_at: 2026-06-02T07:36:14.155Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:36:14.155Z
matched_actions: 85
action_count: 85
confidence: medium
summary: "All 85 spec actions matched exactly to source command tokens; transport parameters (9600/8/N/1) verified; complete coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source documents only CH1 (prefix `a`) examples for status queries; CH2/3/4 query variants (prefixes b/c/d) follow the same $xR N pattern but are not explicitly listed."
- "source does not document the full numeric range for VOL (V), MICVOL (C), or TRE/BAS values; only the example bounds 01/79 and -7..+7 are stated."
- "source does not document any unsolicited device-initiated notifications."
- "source does not document any multi-step sequences."
- "source does not contain safety warnings, interlock procedures, or power-on sequencing requirements."
- "source lists $aR 1..$aR 9 (CH1) status queries but does not explicitly list $bR/$cR/$dR query variants for CH2/3/4; the symmetric a/b/c/d prefix pattern is implied."
- "full numeric range of VOL and MICVOL is not stated — only \"01\" and \"79\" are given as concrete examples."
- "full numeric range of TRE and BAS is documented only for CH1 (-7..+7); CH2/3/4 only have a single \"0\" example each."
- "source does not document DB-9 pinout, cable type (null modem vs straight-through), or any electrical interface details beyond 9600/8/N/1."
- "source does not document device firmware version, baud-rate auto-negotiation, or behavior on malformed input."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
