---
spec_id: admin/parasound-jc-2-bp
schema_version: ai4av-public-spec-v1
revision: 1
title: "Parasound Halo JC 2 BP Control Spec"
manufacturer: Parasound
model_family: "Halo JC 2 BP"
aliases: []
compatible_with:
  manufacturers:
    - Parasound
  models:
    - "Halo JC 2 BP"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.shopify.com
source_urls:
  - "https://cdn.shopify.com/s/files/1/0763/0864/4159/files/JC2RS232.pdf?v=1718653094"
retrieved_at: 2026-06-14T18:38:53.862Z
last_checked_at: 2026-06-14T19:39:44.600Z
generated_at: 2026-06-14T19:39:44.600Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document does not explicitly name \"JC 2 BP\"; applicability is based on the shared \"JC2/JC2BP RS232\" doc link, not on a BP-specific command table. Firmware version compatibility not stated. Absolute volume level not reported (motor-driven potentiometer)."
  - "motor-driven volume has no absolute level feedback; only"
  - "none documented."
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version compatibility not stated in source."
  - "\"JC 2 BP\" not named in source text; applicability inferred from shared product-page document link."
  - "absolute volume level not reportable (hardware limitation)."
verification:
  verdict: verified
  checked_at: 2026-06-14T19:39:44.600Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions match literal commands in source; transport parameters fully verified. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-14
---

# Parasound Halo JC 2 BP Control Spec

## Summary
RS-232C serial control spec for the Parasound Halo JC 2 BP stereo preamplifier. Covers power, volume (motor-driven, up/down only), mute, polarity, 12V trigger, and balanced input selection (1–6), plus status queries and unsolicited feedback. The source protocol document is titled "Halo JC 2 RS-232 Protocol" and is the shared JC2/JC2BP RS-232 document referenced on Parasound's product page.

<!-- UNRESOLVED: source document does not explicitly name "JC 2 BP"; applicability is based on the shared "JC2/JC2BP RS232" doc link, not on a BP-specific command table. Firmware version compatibility not stated. Absolute volume level not reported (motor-driven potentiometer). -->

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
  # Pin connections (DB9): TxD=Pin 2, RxD=Pin 3, Gnd=Pin 5
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: power on/off/toggle commands present
  - levelable    # inferred: volume up/down commands present
  - queryable    # inferred: status request commands present
  - routable     # inferred: input 1-6 select / next / previous commands present
```

## Actions
```yaml
# All command payloads are ASCII, space-delimited, terminated by <CR> (carriage
# return, hex 0D). A space separates each token; two-digit values are not split.
actions:
  # --- Power ---
  - id: power_on
    label: Power On
    kind: action
    command: "W 1 1 2<CR>"
    params: []
  - id: power_off
    label: Power Off
    kind: action
    command: "W 1 1 1<CR>"
    params: []
  - id: power_toggle
    label: Power Toggle
    kind: action
    command: "W 1 1 3<CR>"
    params: []

  # --- Volume (motor-driven; no absolute set, up/down only) ---
  - id: volume_up
    label: Volume Up
    kind: action
    command: "W 1 9 1<CR>"
    params: []
  - id: volume_down
    label: Volume Down
    kind: action
    command: "W 1 9 2<CR>"
    params: []

  # --- Mute ---
  - id: mute_on
    label: Mute On
    kind: action
    command: "W 1 10 2<CR>"
    params: []
  - id: mute_off
    label: Mute Off
    kind: action
    command: "W 1 10 1<CR>"
    params: []
  - id: mute_toggle
    label: Mute Toggle
    kind: action
    command: "W 1 10 3<CR>"
    params: []

  # --- Polarity (0 = normal, 180 = inverted) ---
  - id: polarity_normal
    label: Polarity Normal (0 degrees)
    kind: action
    command: "W 1 2 13<CR>"
    params: []
  - id: polarity_invert
    label: Polarity Invert (180 degrees)
    kind: action
    command: "W 1 2 14<CR>"
    params: []
  - id: polarity_toggle
    label: Polarity Toggle
    kind: action
    command: "W 1 2 15<CR>"
    params: []

  # --- 12V Trigger ---
  - id: trigger_on
    label: 12V Trigger On
    kind: action
    command: "W 1 3 1<CR>"
    params: []
  - id: trigger_off
    label: 12V Trigger Off
    kind: action
    command: "W 1 3 2<CR>"
    params: []

  # --- Input Selection ---
  - id: select_input_1
    label: Select Input 1
    kind: action
    command: "W 1 2 6<CR>"
    params: []
  - id: select_input_2
    label: Select Input 2
    kind: action
    command: "W 1 2 7<CR>"
    params: []
  - id: select_input_3
    label: Select Input 3
    kind: action
    command: "W 1 2 8<CR>"
    params: []
  - id: select_input_4
    label: Select Input 4
    kind: action
    command: "W 1 2 9<CR>"
    params: []
  - id: select_input_5
    label: Select Input 5
    kind: action
    command: "W 1 2 10<CR>"
    params: []
  - id: select_input_6
    label: Select Input 6
    kind: action
    command: "W 1 2 11<CR>"
    params: []
  - id: next_input
    label: Next Input
    kind: action
    command: "W 1 2 4<CR>"
    params: []
  - id: previous_input
    label: Previous Input
    kind: action
    command: "W 1 2 5<CR>"
    params: []

  # --- Status Queries (R prefix) ---
  - id: query_current_input
    label: Query Current Input
    kind: query
    command: "R 1 2<CR>"
    params: []
  - id: query_power_status
    label: Query Power Status
    kind: query
    command: "R 1 1<CR>"
    params: []
  - id: query_polarity_status
    label: Query Polarity Status
    kind: query
    command: "R 1 3<CR>"
    params: []
  - id: query_mute_status
    label: Query Mute Status
    kind: query
    command: "R 1 10<CR>"
    params: []
  - id: query_trigger_status
    label: Query 12V Trigger Status
    kind: query
    command: "R 1 4<CR>"
    params: []
  - id: query_full_status
    label: Query Full Status
    kind: query
    command: "R 1 13<CR>"
    params: []
```

## Feedbacks
```yaml
# Observable states returned by R-prefix query responses. Token format: *<code><CR>
feedbacks:
  - id: power_state
    type: enum
    values: ["on", "off"]
    # *G1 = on, *G0 = off
  - id: input_state
    type: enum
    values: [1, 2, 3, 4, 5, 6]
    # *S1..*S6
  - id: mute_state
    type: enum
    values: ["on", "off"]
    # *M1 = on, *M0 = off
  - id: polarity_state
    type: enum
    values: ["normal", "invert"]
    # *P0 = normal, *P1 = invert
  - id: trigger_state
    type: enum
    values: ["on", "off"]
    # *T1 = on, *T0 = off
  - id: volume_level
    type: unknown
    # UNRESOLVED: motor-driven volume has no absolute level feedback; only
    # increase/decrease deltas are reported (see Events).
```

## Variables
```yaml
# No continuously settable parameter is exposed. Volume is up/down only (no
# absolute set value); power, mute, polarity, trigger, and input are discrete
# actions. Section left empty - not applicable per source.
```

## Events
```yaml
# Unsolicited feedback emitted whenever the unit is controlled by IR remote,
# front panel, or RS-232. Start-of-transmission marker is '*'.
events:
  - id: full_status_update
    description: >-
      Combined status broadcast in the form '*G1 S3 M1 P1 T0<CR>' where
      G=power (G0/G1), S=input (S1-S6), M=mute (M0/M1), P=polarity (P0/P1),
      T=12V trigger (T0/T1).
    trigger: on_any_control_change
  - id: volume_increase
    description: Volume was increased (motor moved up).
    payload: "*V1<CR>"
  - id: volume_decrease
    description: Volume was decreased (motor moved down).
    payload: "*V0<CR>"
```

## Macros
```yaml
# No multi-step sequences described in source.
# UNRESOLVED: none documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. None inferred.
```

## Notes
- **Command format:** ASCII, space-delimited tokens, terminated by carriage return (`<CR>`, hex `0D`). A space separates every number/letter except within two-digit values (e.g. `10`, `13`). Hex form uses `20` for the space; commas in the source's hex column are for readability only and are not transmitted.
- **DB9 pinout:** TxD = Pin 2, RxD = Pin 3, Gnd = Pin 5.
- **Trigger parameter discrepancy:** the 12V trigger *write* commands use the `3` parameter group (`W 1 3 1` / `W 1 3 2`), but the trigger *status query* uses parameter `4` (`R 1 4`). This is reproduced verbatim from the source table.
- **Volume:** motor-driven potentiometer — there is no absolute volume-level feedback. Only `*V0<CR>` (decrease) / `*V1<CR>` (increase) deltas are broadcast; a controller cannot read back the current setting.
- **Polarity:** "Normal (0)" = 0° absolute phase; "Invert (180)" = 180° phase inversion.
- **Source applicability:** the protocol document is titled "Halo JC 2 RS-232 Protocol" and does not itself print the string "JC 2 BP". It is the shared "JC2/JC2BP RS232" document linked from Parasound's JC 2 BP product page; treat BP-specific applicability as unverified against a physical unit.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: "JC 2 BP" not named in source text; applicability inferred from shared product-page document link. -->
<!-- UNRESOLVED: absolute volume level not reportable (hardware limitation). -->
```

## Provenance

```yaml
source_domains:
  - cdn.shopify.com
source_urls:
  - "https://cdn.shopify.com/s/files/1/0763/0864/4159/files/JC2RS232.pdf?v=1718653094"
retrieved_at: 2026-06-14T18:38:53.862Z
last_checked_at: 2026-06-14T19:39:44.600Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-14T19:39:44.600Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions match literal commands in source; transport parameters fully verified. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document does not explicitly name \"JC 2 BP\"; applicability is based on the shared \"JC2/JC2BP RS232\" doc link, not on a BP-specific command table. Firmware version compatibility not stated. Absolute volume level not reported (motor-driven potentiometer)."
- "motor-driven volume has no absolute level feedback; only"
- "none documented."
- "source contains no safety warnings, interlock procedures, or"
- "firmware version compatibility not stated in source."
- "\"JC 2 BP\" not named in source text; applicability inferred from shared product-page document link."
- "absolute volume level not reportable (hardware limitation)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
