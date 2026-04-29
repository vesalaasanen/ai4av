---
schema_version: ai4av-public-spec-v1
device_id: eiki/lc-xg100
entity_id: eiki_lc_xg100_north_america
spec_id: admin/eiki-lc-xg100-north-america
revision: 1
author: admin
title: "Eiki LC-XG100 (North America) Control Spec"
status: published
manufacturer: Eiki
manufacturer_key: eiki
model_family: LC-XG100
aliases: []
compatible_with:
  manufacturers:
    - Eiki
  models:
    - LC-XG100
    - LC-XG200
    - LC-XG110
    - LC-XG210
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://eiki.com/lc-xg100-rs-232-basic-serial-commands
  - https://eiki.com/lc-xg100-rs-232-extended-serial-commands
  - https://applicationmarket.crestron.com/eiki-lc-xg100-north-america
source_documents:
  - title: "Eiki public source"
    url: https://eiki.com/lc-xg100-rs-232-basic-serial-commands
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T17:42:18.802Z
  - title: "Eiki public source"
    url: https://eiki.com/lc-xg100-rs-232-extended-serial-commands
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T17:42:20.115Z
  - title: "Eiki public source"
    url: https://applicationmarket.crestron.com/eiki-lc-xg100-north-america
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T17:42:20.892Z
  - title: "Eiki public source"
    url: https://eiki.com/lc-xg100-rs-232-basic-serial-commands
    stage: download
    content_type: unknown
    checked_at: 2026-04-26T17:42:40.812Z
  - title: "Eiki public source"
    url: https://eiki.com/lc-xg100-rs-232-basic-serial-commands
    stage: spec
    content_type: unknown
    checked_at: 2026-04-26T17:44:41.466Z
retrieved_at: 2026-04-26T17:44:41.466Z
last_checked_at: 2026-04-27T09:04:47.374Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T09:04:47.374Z
  matched_actions: 48
  action_count: 48
  confidence: high
  summary: "All 48 spec actions matched verbatim to source command table; all transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-26
---

# Eiki LC-XG100 (North America) Control Spec

## Summary
RS-232 and IR control spec for Eiki G Series projectors (LC-XG210, LC-XG110, LC-XG200, LC-XG100). Serial at 19,200 baud 8N1, CR delimiter. IR controller: CXMA. Supports power, input routing, volume, display modes, image adjustments, and queryable status.

<!-- UNRESOLVED: USB, network, or other control interfaces not mentioned in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
  delimiter: CR  # CR after each command
addressing:
  port: null  # UNRESOLVED: port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
timing:
  command_interval_ms: 1000  # 1 second between commands
  status_read_interval_ms: 2000  # 2 seconds between status reads
  input_mode_change_interval_ms: 5000  # 5 seconds for input/mode changes
```

## Traits
```yaml
- powerable  # power ON/OFF/Compulsory OFF commands present
- routable  # input selection and source routing commands present
- queryable  # status read commands (CR0, CR1, CR3, CR4, CR6) present
- levelable  # volume, zoom, focus, keystone, lens shift adjustments present
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

- id: power_compulsory_off
  label: Compulsory Power Off
  kind: action
  params: []

- id: input_1
  label: Input 1
  kind: action
  params: []

- id: input_2
  label: Input 2
  kind: action
  params: []

- id: input_3
  label: Input 3
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

- id: audio_mute_on
  label: Audio Mute On
  kind: action
  params: []

- id: audio_mute_off
  label: Audio Mute Off
  kind: action
  params: []

- id: no_show_on
  label: No Show On
  kind: action
  params: []

- id: no_show_off
  label: No Show Off
  kind: action
  params: []

- id: video_mode_4x3
  label: Video Image 4:3
  kind: action
  params: []

- id: video_mode_16x9
  label: Video Image 16:9
  kind: action
  params: []

- id: menu_on
  label: Menu On
  kind: action
  params: []

- id: menu_off
  label: Menu Off
  kind: action
  params: []

- id: display_clear
  label: Display Clear
  kind: action
  params: []

- id: image_toggle
  label: Image Toggle
  kind: action
  params: []

- id: digital_zoom_in
  label: Digital Zoom In
  kind: action
  params: []

- id: digital_zoom_out
  label: Digital Zoom Out
  kind: action
  params: []

- id: pointer_right
  label: Pointer Right
  kind: action
  params: []

- id: pointer_left
  label: Pointer Left
  kind: action
  params: []

- id: pointer_up
  label: Pointer Up
  kind: action
  params: []

- id: pointer_down
  label: Pointer Down
  kind: action
  params: []

- id: select
  label: Select
  kind: action
  params: []

- id: freeze_on
  label: Freeze On
  kind: action
  params: []

- id: freeze_off
  label: Freeze Off
  kind: action
  params: []

- id: zoom_down
  label: Zoom Down
  kind: action
  params: []

- id: zoom_up
  label: Zoom Up
  kind: action
  params: []

- id: focus_down
  label: Focus Down
  kind: action
  params: []

- id: focus_up
  label: Focus Up
  kind: action
  params: []

- id: lens_shift_up
  label: Lens Shift Up
  kind: action
  params: []

- id: lens_shift_down
  label: Lens Shift Down
  kind: action
  params: []

- id: auto_pc_adj
  label: Auto PC Adjustment
  kind: action
  params: []

- id: presentation_timer
  label: Presentation Timer On/Off
  kind: action
  params: []

- id: keystone_plus
  label: Digital Keystone Plus
  kind: action
  params: []

- id: keystone_minus
  label: Digital Keystone Minus
  kind: action
  params: []

- id: keystone_left
  label: Digital Keystone Left
  kind: action
  params: []

- id: keystone_right
  label: Digital Keystone Right
  kind: action
  params: []

- id: source_digital
  label: Source Digital
  kind: action
  params: []

- id: source_analog
  label: Source Analog
  kind: action
  params: []

- id: source_wireless
  label: Source Wireless
  kind: action
  params: []

- id: source_mci
  label: Source MCI
  kind: action
  params: []

- id: source_auto
  label: Source Auto
  kind: action
  params: []

- id: source_video
  label: Source Video
  kind: action
  params: []

- id: source_s_video
  label: Source S-Video
  kind: action
  params: []

- id: source_component
  label: Source Component
  kind: action
  params: []

- id: lamp_mode_full
  label: Lamp Mode Full
  kind: action
  params: []

- id: lamp_mode_eco
  label: Lamp Mode Eco
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status Read
  type: enum
  values:
    - "00"  # Power ON
    - "80"  # Stand by
    - "40"  # Count down
    - "20"  # Cooling down
    - "10"  # Power abnormality
    - "28"  # Temperature abnormality
    - "08"  # Temperature abnormality
    - "88"  # Temperature abnormality
    - "02"  # Key input prohibition
    - "24"  # Power Management Cooling
    - "04"  # Power Management

- id: input_mode
  label: Input Mode Read
  type: enum
  values:
    - "1"  # Computer - Input 1
    - "3"  # Computer - Input 2
    - "2"  # Video - Input 3

- id: lamp_time
  label: Lamp Time Read
  type: string
  pattern: "^####$"
  description: 4-digit lamp usage hour counter

- id: setting_read
  label: Setting Read
  type: enum
  values:
    - "11"  # Normally
    - "10"  # Top/Bottom reversal
    - "01"  # Left/Right reversal
    - "00"  # Top/Bottom & Left/Right reversal

- id: temp_read
  label: Temperature Read
  type: string
  pattern: "^_##\\.#_##\\.#_##\\.#$"
  description: Three temperature sensors in Celsius, format _##.#_##.#_##.#
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters found in source beyond on/off commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: compulsory_power_off
    description: Compulsory Power OFF (C01) immediately cuts power without cooling cycle
  - id: input_mode_change_delay
    description: Wait 5 seconds after input or mode change before sending another command
  - id: status_read_delay
    description: Wait 2 seconds between status read commands
# UNRESOLVED: additional safety procedures not documented in source
```

## Notes
- IR controller model: CXMA
- Cable: DB9 (computer) to 8-pin DIN (projector); Projector pin 6 = TX, pin 1 = RX, pin 4 = Ground
- Commands with "(none)" in IR column have no IR equivalent — RS-232 only
- Lamp mode Eco reduces brightness for extended lamp life
- Digital keystone corrections are optical adjustments
- Source Auto performs automatic input detection
- Lens shift adjustment only available on certain lens configurations
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: USB or network control interfaces not mentioned in source -->
<!-- UNRESOLVED: lamp hour reset procedure not documented in source -->
<!-- UNRESOLVED: error recovery sequences not documented in source -->

## Provenance

```yaml
source_urls:
  - https://eiki.com/lc-xg100-rs-232-basic-serial-commands
  - https://eiki.com/lc-xg100-rs-232-extended-serial-commands
  - https://applicationmarket.crestron.com/eiki-lc-xg100-north-america
source_documents:
  - title: "Eiki public source"
    url: https://eiki.com/lc-xg100-rs-232-basic-serial-commands
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T17:42:18.802Z
  - title: "Eiki public source"
    url: https://eiki.com/lc-xg100-rs-232-extended-serial-commands
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T17:42:20.115Z
  - title: "Eiki public source"
    url: https://applicationmarket.crestron.com/eiki-lc-xg100-north-america
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T17:42:20.892Z
  - title: "Eiki public source"
    url: https://eiki.com/lc-xg100-rs-232-basic-serial-commands
    stage: download
    content_type: unknown
    checked_at: 2026-04-26T17:42:40.812Z
  - title: "Eiki public source"
    url: https://eiki.com/lc-xg100-rs-232-basic-serial-commands
    stage: spec
    content_type: unknown
    checked_at: 2026-04-26T17:44:41.466Z
retrieved_at: 2026-04-26T17:44:41.466Z
last_checked_at: 2026-04-27T09:04:47.374Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T09:04:47.374Z
matched_actions: 48
action_count: 48
confidence: high
summary: "All 48 spec actions matched verbatim to source command table; all transport parameters verified."
```

## Known Gaps

```yaml
[]
```
