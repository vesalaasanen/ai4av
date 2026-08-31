---
spec_id: admin/primare-systems-spa20
schema_version: ai4av-public-spec-v1
revision: 1
title: "Primare Systems SPA20 Control Spec"
manufacturer: Primare
model_family: SPA20
aliases: []
compatible_with:
  manufacturers:
    - Primare
    - "Primare Systems"
  models:
    - SPA20
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - github.com
source_urls:
  - https://github.com/openhab/openhab1-addons/wiki/Primare-binding
retrieved_at: 2026-08-30T10:30:34.208Z
last_checked_at: 2026-08-30T22:17:05.118Z
generated_at: 2026-08-30T22:17:05.118Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "wire-format byte sequences for each mnemonic not stated in source. Source names command mnemonics (POWER_QUERY, VOLUME_UP, etc.) but does not give payload bytes."
  - "payload bytes not stated in source"
  - "valid input range not stated in source"
  - "valid range not stated in source (UI shows /100)"
  - "valid range not stated in source"
  - "full mode list not confirmed in source - only the 8 values above"
  - "payload bytes not stated in source; valid menu values not stated"
  - "payload bytes not stated in source; memory slot parameter not documented"
  - "response/acknowledgement byte sequences not stated in source."
  - "source does not list settable parameters beyond the actions above."
  - "source notes that device does NOT automatically send status messages"
  - "source describes no multi-step sequences."
  - "source contains no safety warnings or interlock procedures."
  - "- Wire-format (byte sequence) for every command mnemonic not in source."
verification:
  verdict: verified
  checked_at: 2026-08-30T22:17:05.118Z
  matched_actions: 79
  action_count: 79
  confidence: medium
  summary: "All 79 spec actions map 1:1 to source command mnemonics; transport parameters verbatim in source; bidirectional coverage complete. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - community_report
license: ODbL-1.0
created_at: 2026-08-30
---

# Primare Systems SPA20 Control Spec

## Summary
RS-232 serial control interface for the Primare SPA20 home theatre amplifier, shared with SP31, SP31.7, and SPA21 per Primare documentation. Asynchronous serial at 4800 bit/s, 8-N-1; no authentication. This spec is derived from the openHAB1 Primare binding wiki which enumerates the command set.

<!-- UNRESOLVED: wire-format byte sequences for each mnemonic not stated in source. Source names command mnemonics (POWER_QUERY, VOLUME_UP, etc.) but does not give payload bytes. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # POWER_ON / POWER_OFF / POWER_TOGGLE present
- queryable       # *_QUERY commands returning state present
- routable        # MAIN_INPUT_*, RECORD_INPUT_* input select present
- levelable       # VOLUME_*, BALANCE_*, CENTER_*, SURROUND_*, BACK_*, SUB_* level controls present
```

## Actions
```yaml
# Wire-format bytes for each command are NOT documented in the source. The source
# only enumerates the high-level command mnemonics used by the openHAB binding.
# Each mnemonic below maps to ONE action; payload bytes are marked UNRESOLVED.

- id: power_query
  label: Power Query
  kind: query
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: power_toggle
  label: Power Toggle
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: power_on
  label: Power On
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: power_off
  label: Power Off
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: main_input_query
  label: Main Input Query
  kind: query
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: main_input_up
  label: Main Input Up
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: main_input_down
  label: Main Input Down
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: main_input_set
  label: Main Input Set
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params:
    - name: input
      type: integer
      # UNRESOLVED: valid input range not stated in source

- id: volume_query
  label: Volume Query
  kind: query
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: volume_up
  label: Volume Up
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: volume_set
  label: Volume Set
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params:
    - name: level
      type: integer
      # UNRESOLVED: valid range not stated in source (UI shows /100)

- id: balance_query
  label: Balance Query
  kind: query
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: balance_up
  label: Balance Up
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: balance_down
  label: Balance Down
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: balance_set
  label: Balance Set
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params:
    - name: value
      type: integer
      # UNRESOLVED: valid range not stated in source

- id: center_query
  label: Center Query
  kind: query
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: center_up
  label: Center Up
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: center_down
  label: Center Down
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: center_set
  label: Center Set
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params:
    - name: level
      type: integer
      # UNRESOLVED: valid range not stated in source (UI shows /100)

- id: surround_query
  label: Surround Query
  kind: query
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: surround_up
  label: Surround Up
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: surround_down
  label: Surround Down
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: surround_set
  label: Surround Set
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params:
    - name: level
      type: integer
      # UNRESOLVED: valid range not stated in source (UI shows /100)

- id: back_query
  label: Back Query
  kind: query
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: back_up
  label: Back Up
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: back_down
  label: Back Down
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: back_set
  label: Back Set
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params:
    - name: level
      type: integer
      # UNRESOLVED: valid range not stated in source (UI shows /100)

- id: sub_query
  label: Sub Query
  kind: query
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: sub_up
  label: Sub Up
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: sub_down
  label: Sub Down
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: sub_set
  label: Sub Set
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params:
    - name: level
      type: integer
      # UNRESOLVED: valid range not stated in source (UI shows /100)

- id: mute_query
  label: Mute Query
  kind: query
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: mute_toggle
  label: Mute Toggle
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: mute_on
  label: Mute On
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: dim_query
  label: Dim Query
  kind: query
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: dim_toggle
  label: Dim Toggle
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: dim_on
  label: Dim On
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: dim_off
  label: Dim Off
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: record_input_query
  label: Record Input Query
  kind: query
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: record_input_up
  label: Record Input Up
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: record_input_down
  label: Record Input Down
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: record_input_set
  label: Record Input Set
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params:
    - name: input
      type: integer
      # UNRESOLVED: valid input range not stated in source

- id: surround_mode_query
  label: Surround Mode Query
  kind: query
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: surround_mode_up
  label: Surround Mode Up
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: surround_mode_set
  label: Surround Mode Set
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params:
    - name: mode
      type: integer
      # Mapping from openHAB example: 99=Bypass, 0=Stereo, 1=ProLogicII PL emulation,
      # 2=ProLogicII Cinema, 3=ProLogicII Music, 4=Party,
      # 5=DTS NEO:6 Cinema, 6=DTS NEO:6 Music
      # UNRESOLVED: full mode list not confirmed in source - only the 8 values above

- id: verbose_query
  label: Verbose Mode Query
  kind: query
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: verbose_toggle
  label: Verbose Mode Toggle
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: verbose_on
  label: Verbose Mode On
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: verbose_off
  label: Verbose Mode Off
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: menu_query
  label: Menu Query
  kind: query
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: menu_toggle
  label: Menu Toggle
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: menu_set
  label: Menu Set
  kind: action
  # UNRESOLVED: payload bytes not stated in source; valid menu values not stated
  params: []

- id: extra_surround_mode_query
  label: Extra Surround Mode Query
  kind: query
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: extra_surround_mode_toggle
  label: Extra Surround Mode Toggle
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: extra_surround_mode_on
  label: Extra Surround Mode On
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: extra_surround_mode_off
  label: Extra Surround Mode Off
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: front_panel_lock_query
  label: Front Panel Lock Query
  kind: query
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: front_panel_lock_toggle
  label: Front Panel Lock Toggle
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: front_panel_lock_on
  label: Front Panel Lock On
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: front_panel_lock_off
  label: Front Panel Lock Off
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: ir_input_query
  label: IR Input Query
  kind: query
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: ir_input_toggle
  label: IR Input Toggle
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: ir_input_front
  label: IR Input Front
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: ir_input_back
  label: IR Input Back
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: recall_memory
  label: Recall Memory
  kind: action
  # UNRESOLVED: payload bytes not stated in source; memory slot parameter not documented
  params: []

- id: recall_memory_direct_user_settings
  label: Recall Memory Direct User Settings
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: recall_memory_direct_factory_settings
  label: Recall Memory Direct Factory Settings
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: recall_memory_direct_installer_settings
  label: Recall Memory Direct Installer Settings
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: current_input_name_query
  label: Current Input Name Query
  kind: query
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: productline_query
  label: Productline Query
  kind: query
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: model_query
  label: Model Query
  kind: query
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: sw_version_query
  label: SW Version Query
  kind: query
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: late_night_mode_query
  label: Late Night Mode Query
  kind: query
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: late_night_mode_toggle
  label: Late Night Mode Toggle
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: late_night_mode_on
  label: Late Night Mode On
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: late_night_mode_off
  label: Late Night Mode Off
  kind: action
  # UNRESOLVED: payload bytes not stated in source
  params: []

- id: all_query
  label: Query All Variables
  kind: query
  # UNRESOLVED: payload bytes not stated in source
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: response/acknowledgement byte sequences not stated in source.
# Source states device emits status messages but does not give wire format.
```

## Variables
```yaml
# UNRESOLVED: source does not list settable parameters beyond the actions above.
```

## Events
```yaml
# UNRESOLVED: source notes that device does NOT automatically send status messages
# for all affected variables on power-on or input change; explicit *_QUERY
# commands required. Wire-format of unsolicited events not documented.
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures.
```

## Notes
- Source: openHAB1 Primare binding wiki. Documented as tested with SPA20 software v1.50 (Nov 2 2003).
- RS-232 link parameters per source: null modem cable, 4800 bit/s, 8 data bits, no parity, 1 stop bit.
- Source notes SP31, SP31.7, SPA20, SPA21 share the same serial control interface per Primare documentation; commands listed here apply to all four.
- IP-to-serial gateway usage supported (e.g. RPi running socat); the device itself is serial-only — there is no native TCP/IP control.
- Device does NOT push unsolicited status for all affected variables on power-on or input change; controllers must re-query with ALL_QUERY or individual *_QUERY commands after such events.
- Source names command mnemonics only; actual wire-format byte sequences per mnemonic are not documented in this source and would need Primare's proprietary protocol reference.

<!-- UNRESOLVED:
- Wire-format (byte sequence) for every command mnemonic not in source.
- Valid numeric ranges for VOLUME_SET, BALANCE_SET, CENTER_SET, SURROUND_SET, BACK_SET, SUB_SET, MAIN_INPUT_SET, RECORD_INPUT_SET (UI suggests /100 but not confirmed).
- Complete surround mode list (only 8 mappings from openHAB example confirmed).
- Firmware version compatibility — only v1.50 explicitly tested.
- Response/acknowledgement byte format.
-->

## Provenance

```yaml
source_domains:
  - github.com
source_urls:
  - https://github.com/openhab/openhab1-addons/wiki/Primare-binding
retrieved_at: 2026-08-30T10:30:34.208Z
last_checked_at: 2026-08-30T22:17:05.118Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-30T22:17:05.118Z
matched_actions: 79
action_count: 79
confidence: medium
summary: "All 79 spec actions map 1:1 to source command mnemonics; transport parameters verbatim in source; bidirectional coverage complete. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "wire-format byte sequences for each mnemonic not stated in source. Source names command mnemonics (POWER_QUERY, VOLUME_UP, etc.) but does not give payload bytes."
- "payload bytes not stated in source"
- "valid input range not stated in source"
- "valid range not stated in source (UI shows /100)"
- "valid range not stated in source"
- "full mode list not confirmed in source - only the 8 values above"
- "payload bytes not stated in source; valid menu values not stated"
- "payload bytes not stated in source; memory slot parameter not documented"
- "response/acknowledgement byte sequences not stated in source."
- "source does not list settable parameters beyond the actions above."
- "source notes that device does NOT automatically send status messages"
- "source describes no multi-step sequences."
- "source contains no safety warnings or interlock procedures."
- "- Wire-format (byte sequence) for every command mnemonic not in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
