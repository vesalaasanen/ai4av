---
spec_id: admin/symetrix-jupiter
schema_version: ai4av-public-spec-v1
revision: 1
title: "Symetrix Jupiter Control Spec"
manufacturer: Symetrix
model_family: "Jupiter 4"
aliases: []
compatible_with:
  manufacturers:
    - Symetrix
  models:
    - "Jupiter 4"
    - "Jupiter 8"
    - "Jupiter 12"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - symetrixinc.com
  - audiobrains.com
  - aca.im
source_urls:
  - https://www.symetrixinc.com/wp-content/uploads/2023/05/Symetrix_PROTOCOL_Jupiter_cp2.pdf
  - https://audiobrains.com/data/symetrix/others/Composer-Control-Protocol-v7.0-080918.pdf
  - https://aca.im/driver_docs/Symetrix/SymNet_Composer_control_prot_2.0.pdf
retrieved_at: 2026-06-12T01:38:22.997Z
last_checked_at: 2026-06-12T20:01:00.985Z
generated_at: 2026-06-12T20:01:00.985Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document covers Jupiter 4/8/12; user-specified device name \"Symetrix 322 DSP Engine\" does not appear in source text — model mapping unclear"
  - "firmware version compatibility not stated in source"
  - "RS-485 control mentioned only for ARC devices, not documented for external control"
  - "controller numbers are app-specific and listed per Jupiter App in the"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures found in source"
  - "Appendix with per-product controller number assignments not included in refined source"
  - "device name mismatch — user specified \"Symetrix 322 DSP Engine\" but source covers Jupiter 4/8/12"
verification:
  verdict: verified
  checked_at: 2026-06-12T20:01:00.985Z
  matched_actions: 19
  action_count: 19
  confidence: medium
  summary: "All 19 spec actions matched literal source commands with correct parameter shapes and ranges; transport declared UDP port 48630 confirmed. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Symetrix Jupiter Control Spec

## Summary
Symetrix Jupiter series DSP processors (Jupiter 4, 8, 12) controlled via UDP text protocol on port 48630. Human-readable ASCII commands with CR terminators. Controller-number-based addressing for faders, buttons, selectors, meters, and presets. Supports unsolicited push notifications for parameter changes.

<!-- UNRESOLVED: source document covers Jupiter 4/8/12; user-specified device name "Symetrix 322 DSP Engine" does not appear in source text — model mapping unclear -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: RS-485 control mentioned only for ARC devices, not documented for external control -->

## Transport
```yaml
protocols:
  - udp
addressing:
  port: 48630
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred: GS, GS2, GSB, GSB2, GPR, GPU return values
- levelable  # inferred: CS controls faders with 0-65535 range
```

## Actions
```yaml
- id: controller_set
  label: Controller Set
  kind: action
  command: "CS {controller_number} {position}"
  params:
    - name: controller_number
      type: integer
      description: "Decimal controller number (1-10000)"
    - name: position
      type: integer
      description: "16-bit controller position (0-65535)"

- id: controller_change
  label: Change Controller
  kind: action
  command: "CC {controller_number} {dec_inc} {amount}"
  params:
    - name: controller_number
      type: integer
      description: "Decimal controller number (1-10000)"
    - name: dec_inc
      type: integer
      description: "0 = decrement, 1 = increment"
    - name: amount
      type: integer
      description: "Amount to change (0-65535)"

- id: controller_get
  label: Get Controller
  kind: query
  command: "GS {controller_number}"
  params:
    - name: controller_number
      type: integer
      description: "Decimal controller number (1-10000)"

- id: controller_get_with_number
  label: Get Controller with Controller Number
  kind: query
  command: "GS2 {controller_number}"
  params:
    - name: controller_number
      type: integer
      description: "Decimal controller number (1-10000)"

- id: controller_block_get
  label: Get Controller Block
  kind: query
  command: "GSB {controller_number} {block_size}"
  params:
    - name: controller_number
      type: integer
      description: "Starting decimal controller number (1-10000)"
    - name: block_size
      type: integer
      description: "Number of consecutive controllers to read (max 256)"

- id: controller_block_get_with_number
  label: Get Controller Block with Controller Number
  kind: query
  command: "GSB2 {controller_number} {block_size}"
  params:
    - name: controller_number
      type: integer
      description: "Starting decimal controller number (1-10000)"
    - name: block_size
      type: integer
      description: "Number of consecutive controllers to read (max 256)"

- id: preset_get
  label: Get Preset
  kind: query
  command: "GPR D"
  params: []

- id: preset_load
  label: Load Preset
  kind: action
  command: "LP {preset_number}"
  params:
    - name: preset_number
      type: integer
      description: "Preset number (1-50)"

- id: flash_unit
  label: Flash Unit
  kind: action
  command: "FU"
  params: []

- id: push_global_enable
  label: Global Push Enable/Disable
  kind: action
  command: "PU {on_off} {low} {high}"
  params:
    - name: on_off
      type: integer
      description: "0 = OFF, 1 = ON"
    - name: low
      type: integer
      description: "Lowest controller number to push (optional, 1-10000)"
    - name: high
      type: integer
      description: "Highest controller number to push (optional, 1-10000)"

- id: push_enable
  label: Push Enable
  kind: action
  command: "PUE {low} {high}"
  params:
    - name: low
      type: integer
      description: "Lowest controller number to enable (optional, 1-10000)"
    - name: high
      type: integer
      description: "Highest controller number to enable (optional, 1-10000)"

- id: push_disable
  label: Push Disable
  kind: action
  command: "PUD {low} {high}"
  params:
    - name: low
      type: integer
      description: "Lowest controller number to disable (optional, 1-10000)"
    - name: high
      type: integer
      description: "Highest controller number to disable (optional, 1-10000)"

- id: push_get_enabled
  label: Get Push-enabled Controllers
  kind: query
  command: "GPU {low} {high}"
  params:
    - name: low
      type: integer
      description: "Lowest controller number to inquire (optional, 1-10000)"
    - name: high
      type: integer
      description: "Highest controller number to inquire (optional, 1-10000)"

- id: push_refresh
  label: Push Refresh
  kind: action
  command: "PUR {low} {high}"
  params:
    - name: low
      type: integer
      description: "Lowest controller number to refresh (optional, 1-10000)"
    - name: high
      type: integer
      description: "Highest controller number to refresh (optional, 1-10000)"

- id: push_clear
  label: Push Clear
  kind: action
  command: "PUC {low} {high}"
  params:
    - name: low
      type: integer
      description: "Lowest controller number to clear (optional, 1-10000)"
    - name: high
      type: integer
      description: "Highest controller number to clear (optional, 1-10000)"

- id: push_set_interval
  label: Set Push Interval
  kind: action
  command: "PUI {milliseconds}"
  params:
    - name: milliseconds
      type: integer
      description: "Push interval in ms (20-30000)"

- id: push_set_threshold
  label: Set Push Threshold
  kind: action
  command: "PUT {parameter_threshold} {meter_threshold}"
  params:
    - name: parameter_threshold
      type: integer
      description: "Threshold for non-meter parameters (0-65535, optional)"
    - name: meter_threshold
      type: integer
      description: "Threshold for meter parameters (0-65535, optional)"

- id: set_quiet_mode
  label: Set Quiet Mode
  kind: action
  command: "SQ {on_off}"
  params:
    - name: on_off
      type: integer
      description: "0 = OFF, 1 = ON"

- id: set_echo_mode
  label: Set Echo Mode
  kind: action
  command: "EH {on_off}"
  params:
    - name: on_off
      type: integer
      description: "0 = OFF, 1 = ON"
```

## Feedbacks
```yaml
- id: controller_position
  type: integer
  description: "16-bit controller position (0-65535) returned from GS query"

- id: controller_number_and_position
  type: string
  description: "Format: #<CONTROLLER NUMBER>=<CONTROLLER POSITION> returned from GS2"

- id: controller_block_positions
  type: string
  description: "Multiple CR-separated 5-digit values (0-65535 or -1) returned from GSB"

- id: controller_block_with_numbers
  type: string
  description: "Multiple CR-separated #NNNNN=VVVVV strings returned from GSB2"

- id: preset_number
  type: integer
  description: "Last loaded preset number (0-50), 0 = no preset recalled, from GPR response format PrstD=<PRESET NUMBER>"

- id: push_enabled_list
  type: string
  description: "CR-separated list of enabled controller numbers from GPU"

- id: push_settings
  type: string
  description: "Global push state and settings from GPU 0, format: Global=<0/1> followed by lower/upper/threshold_param/threshold_meter/interval_ms"

- id: push_data
  type: string
  description: "Unsolicited push data, format: #NNNNN=VVVVV, up to 64 entries per push"

- id: ack
  type: enum
  values: ["ACK"]
  description: "Command accepted"

- id: nak
  type: enum
  values: ["NAK"]
  description: "Command failed or not understood"
```

## Variables
```yaml
# UNRESOLVED: controller numbers are app-specific and listed per Jupiter App in the
# Appendix of the source document, which was not included in the refined excerpt.
# Controller positions map to faders, buttons, selectors, meters etc. but the
# specific controller number assignments are not documented in this source excerpt.
```

## Events
```yaml
- id: push_notification
  description: "Unsolicited push of controller value changes. Format: #NNNNN=VVVVV<CR>. Up to 64 entries per push interval (default 100ms). Requires global push enabled and individual controller push enabled."
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
- All commands terminated with `<CR>` (ASCII 13 / hex $0D). Responses also CR-terminated.
- Commands must not be split across multiple UDP packets.
- Zero-termination character optional in commands; never present in responses.
- Responses sent to IP and source port of last received packet; saved in non-volatile memory across power cycles.
- Push data not sent until first command received (device needs return address).
- Controller values are 16-bit (0–65535). Fader mapping: 0 = min, 65535 = max, linear in dB. Volume faders typically -72dB to +12dB.
- Buttons use 0 = off, 65535 = on (some use inverse logic, noted per-product in Appendix).
- Meters are read-only. Level mapping: 65535 = +24dBu (0dBFS), 0 = -48dBu (-72dBFS) or less.
- Preset range 1–50 per control application definition.
- Push interval default 100ms, adjustable 20–30000ms. Shorter intervals may degrade system performance.
- Quiet mode ON and echo OFF are defaults and recommended for normal operation.
- Default push state: globally enabled at power-on, but individual controllers disabled for Jupiter devices.
- Source document title references "Jupiter 4, Jupiter 8, Jupiter 12" — no mention of "322 DSP Engine" in source text.

<!-- UNRESOLVED: Appendix with per-product controller number assignments not included in refined source -->
<!-- UNRESOLVED: device name mismatch — user specified "Symetrix 322 DSP Engine" but source covers Jupiter 4/8/12 -->

## Provenance

```yaml
source_domains:
  - symetrixinc.com
  - audiobrains.com
  - aca.im
source_urls:
  - https://www.symetrixinc.com/wp-content/uploads/2023/05/Symetrix_PROTOCOL_Jupiter_cp2.pdf
  - https://audiobrains.com/data/symetrix/others/Composer-Control-Protocol-v7.0-080918.pdf
  - https://aca.im/driver_docs/Symetrix/SymNet_Composer_control_prot_2.0.pdf
retrieved_at: 2026-06-12T01:38:22.997Z
last_checked_at: 2026-06-12T20:01:00.985Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T20:01:00.985Z
matched_actions: 19
action_count: 19
confidence: medium
summary: "All 19 spec actions matched literal source commands with correct parameter shapes and ranges; transport declared UDP port 48630 confirmed. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document covers Jupiter 4/8/12; user-specified device name \"Symetrix 322 DSP Engine\" does not appear in source text — model mapping unclear"
- "firmware version compatibility not stated in source"
- "RS-485 control mentioned only for ARC devices, not documented for external control"
- "controller numbers are app-specific and listed per Jupiter App in the"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures found in source"
- "Appendix with per-product controller number assignments not included in refined source"
- "device name mismatch — user specified \"Symetrix 322 DSP Engine\" but source covers Jupiter 4/8/12"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
