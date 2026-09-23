---
spec_id: admin/seura-stm3-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Séura STM3 Series Control Spec"
manufacturer: Seura
model_family: STM3-49-S
aliases: []
compatible_with:
  manufacturers:
    - Seura
    - "Séura"
  models:
    - STM3-49-S
    - STM3-49-U
    - STM3-55-S
    - STM3-55-U
    - STM3-65-S
    - STM3-65-U
    - STM3-86-S
    - STM3-86-U
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - storage.googleapis.com
  - seura.com
  - cdn.shopify.com
source_urls:
  - https://storage.googleapis.com/wp-stateless/2019/10/seura-rs232protocol-stm32.pdf
  - https://storage.googleapis.com/wp-stateless/2019/10/ip-control-for-stm3-outdoor-displays.pdf
  - https://seura.com/pages/for-professionals-residential-downloads
  - "https://cdn.shopify.com/s/files/1/0857/1099/5767/files/ir-codes_1.doc?v=1713286096"
retrieved_at: 2026-09-07T00:23:24.407Z
last_checked_at: 2026-09-19T22:16:31.748Z
generated_at: 2026-09-19T22:16:31.748Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "No service-menu commands documented. No RS-232/serial documented. Firmware compatibility not stated."
  - "source contains no safety warnings, interlocks, or power-on sequencing requirements."
  - "manufacturer name in source uses accent (\"Séura\"); entity_id uses plain \"seura\" — operator reconcile if needed."
  - "no serial/RS-232 config in source; only UDP/IP documented."
  - "no response timing, retry, or timeout behavior documented."
  - "Service Menu / Factory Menu commands not exposed in this source."
verification:
  verdict: verified
  checked_at: 2026-09-19T22:16:31.748Z
  matched_actions: 16
  action_count: 16
  confidence: medium
  summary: "All 16 spec actions map literally to source PWD/INP/VOL/MUT commands; transport (UDP/3000) verbatim; source has no extra command tokens. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-25
---

# Séura STM3 Series Control Spec

## Summary
Séura STM3 Series outdoor displays (49/55/65/86 inch, S and U SKU variants). Controlled via IP (IPv4 UDP, port 3000) using ASCII command strings framed by STX/ETX with a `WO3` prefix. Covers power, input selection, volume, and mute.

<!-- UNRESOLVED: No service-menu commands documented. No RS-232/serial documented. Firmware compatibility not stated. -->

## Transport
```yaml
protocols:
  - udp
addressing:
  port: 3000  # IPv4
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred from PWD power commands
  - queryable   # inferred from PWD?/INP?/VOL?/MUT? queries
  - levelable   # inferred from VOL 0-100 continuous level
  - routable    # inferred from INP input selection
```

## Actions
```yaml
# Framing: every payload = "WO3" + [0x02] + <command>:<param> + [0x03].
# [0x02]=STX and [0x03]=ETX sent as hex; command/param as ASCII.
# Optional unit ID (000-255) may be inserted as "WO3<ID>;" before STX (e.g. global = 000).
# Source lists PWD/INP/VOL/MUT commands as separate rows; each input is enumerated.

# --- POWER (PWD) ---
- id: power_off
  label: Power Off
  kind: action
  command: "WO3[0x02]PWD:0[0x03]"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "WO3[0x02]PWD:1[0x03]"
  params: []

- id: power_toggle
  label: Power Toggle
  kind: action
  command: "WO3[0x02]PWD:3[0x03]"
  params: []

- id: power_query
  label: Power Status Query
  kind: query
  command: "WO3[0x02]PWD:?[0x03]"
  params: []

# --- INPUT (INP) ---
- id: select_input_hdmi1
  label: Select Input HDMI 1
  kind: action
  command: "WO3[0x02]INP:1[0x03]"
  params: []

- id: select_input_hdmi2
  label: Select Input HDMI 2
  kind: action
  command: "WO3[0x02]INP:6[0x03]"
  params: []

- id: select_input_hdmi3
  label: Select Input HDMI 3
  kind: action
  command: "WO3[0x02]INP:9[0x03]"
  params: []

- id: select_input_displayport
  label: Select Input DisplayPort
  kind: action
  command: "WO3[0x02]INP:10[0x03]"
  params: []

- id: select_input_component
  label: Select Input Component
  kind: action
  command: "WO3[0x02]INP:7[0x03]"
  params: []

- id: select_input_hdbaset
  label: Select Input HDBaseT
  kind: action
  command: "WO3[0x02]INP:11[0x03]"
  params: []

- id: input_query
  label: Input Status Query
  kind: query
  command: "WO3[0x02]INP:?[0x03]"
  params: []

# --- VOLUME (VOL) ---
- id: set_volume
  label: Set Volume
  kind: action
  command: "WO3[0x02]VOL:{level}[0x03]"
  params:
    - name: level
      type: integer
      description: "Volume level 0-100. Leading zeros optional."

- id: volume_query
  label: Volume Level Query
  kind: query
  command: "WO3[0x02]VOL:?[0x03]"
  params: []

# --- MUTE (MUT) ---
- id: mute_on
  label: Mute
  kind: action
  command: "WO3[0x02]MUT:1[0x03]"
  params: []

- id: mute_off
  label: Un-mute
  kind: action
  command: "WO3[0x02]MUT:0[0x03]"
  params: []

- id: mute_query
  label: Mute Status Query
  kind: query
  command: "WO3[0x02]MUT:?[0x03]"
  params: []
```

## Feedbacks
```yaml
# Responses to queries: [0x02]<Word>(<value>)[0x03]
- id: power_state
  type: enum
  values: ["0", "1"]  # 0=off, 1=on
  response_format: "[0x02]Power(<0|1>)[0x03]"

- id: input_state
  type: enum
  values: ["1", "6", "7", "9", "10", "11"]  # code → input name per INP table
  response_format: "[0x02]Input(<code>)[0x03]"

- id: volume_level
  type: integer
  range: [0, 100]
  response_format: "[0x02]Volume(<level>)[0x03]"

- id: mute_state
  type: enum
  values: ["0", "1"]  # 0=unmuted, 1=muted
  response_format: "[0x02]Mute(<0|1>)[0x03]"

- id: command_ack
  type: enum
  values: [OK, ER, INVALID]
  description: "OK=success. ER=error (optional detail after colon). INVALID=command unsupported by device (e.g. tuner on monitor)."
  response_format: "[0x02]<OK|ER|INVALID>[:detail][0x03]"
```

## Variables
```yaml
# No settable parameter exists that is not already a discrete action above.
# Volume is exposed via set_volume action per source.
```

## Events
```yaml
# Unsolicited state-change responses sent during transitions (no query needed):
- id: power_change_event
  description: "During power state change, TV emits [0x02]Power(<0|1>)[0x03]."
  format: "[0x02]Power(<0|1>)[0x03]"

- id: input_change_event
  description: "During power-on, TV emits current input as [0x02]Input(<code>)[0x03]."
  format: "[0x02]Input(<code>)[0x03]"

- id: power_toggle_event
  description: "On PWD:3 toggle, TV emits new power state [0x02]Power(<0|1>)[0x03] (and Input event if powering on)."
  format: "[0x02]Power(<0|1>)[0x03]"
```

## Macros
```yaml
# No multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing requirements.
# Service Menu access requires contacting Séura Technical Support (800-957-3872 / techsupport@seura.com) - not documented.
```

## Notes
- Framing: every transmission begins with ASCII `WO3`, then hex `0x02` (STX), then ASCII command + `:` + parameter, then hex `0x03` (ETX). Data outside STX/ETX is ignored by the TV.
- `[ ]` brackets in source denote hex bytes — brackets themselves are NOT sent.
- Parameter length: 1–5 ASCII chars; colon separates command from parameter.
- Acknowledgement: after each command, TV replies `[0x02]OK[0x03]` on success. Errors return `[0x02]ER[0x03]` (optional detail after colon). Unsupported commands (e.g. tuner on a monitor) return `[0x02]INVALID[0x03]`.
- Optional Unit ID: three ASCII digits `000-255`, configurable in Factory/Service Menu. Inserted after `WO3` and separated from the command by a semicolon (`;`). `000` = global (all devices).
- Source title: "STM3 OUTDOOR DISPLAYS". Heading "IP CONTROL" + prefix `WO3` distinguish this from any IR variant.
- Compatible SKUs listed: STM3-49-S, STM3-49-U, STM3-55-S, STM3-55-U, STM3-65-S, STM3-65-U, STM3-86-S, STM3-86-U.

<!-- UNRESOLVED: manufacturer name in source uses accent ("Séura"); entity_id uses plain "seura" — operator reconcile if needed. -->
<!-- UNRESOLVED: no serial/RS-232 config in source; only UDP/IP documented. -->
<!-- UNRESOLVED: no response timing, retry, or timeout behavior documented. -->
<!-- UNRESOLVED: Service Menu / Factory Menu commands not exposed in this source. -->

## Provenance

```yaml
source_domains:
  - storage.googleapis.com
  - seura.com
  - cdn.shopify.com
source_urls:
  - https://storage.googleapis.com/wp-stateless/2019/10/seura-rs232protocol-stm32.pdf
  - https://storage.googleapis.com/wp-stateless/2019/10/ip-control-for-stm3-outdoor-displays.pdf
  - https://seura.com/pages/for-professionals-residential-downloads
  - "https://cdn.shopify.com/s/files/1/0857/1099/5767/files/ir-codes_1.doc?v=1713286096"
retrieved_at: 2026-09-07T00:23:24.407Z
last_checked_at: 2026-09-19T22:16:31.748Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-19T22:16:31.748Z
matched_actions: 16
action_count: 16
confidence: medium
summary: "All 16 spec actions map literally to source PWD/INP/VOL/MUT commands; transport (UDP/3000) verbatim; source has no extra command tokens. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "No service-menu commands documented. No RS-232/serial documented. Firmware compatibility not stated."
- "source contains no safety warnings, interlocks, or power-on sequencing requirements."
- "manufacturer name in source uses accent (\"Séura\"); entity_id uses plain \"seura\" — operator reconcile if needed."
- "no serial/RS-232 config in source; only UDP/IP documented."
- "no response timing, retry, or timeout behavior documented."
- "Service Menu / Factory Menu commands not exposed in this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
