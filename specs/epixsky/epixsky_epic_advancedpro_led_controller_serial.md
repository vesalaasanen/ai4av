---
spec_id: admin/epixsky-epic-advancedpro-led-controller
schema_version: ai4av-public-spec-v1
revision: 1
title: "EpixSky Epic AdvancedPro LED Controller Control Spec"
manufacturer: EpixSky
model_family: "EpiX AdvancedPro RS232 Serial LED Controller"
aliases: []
compatible_with:
  manufacturers:
    - EpixSky
  models:
    - "EpiX AdvancedPro RS232 Serial LED Controller"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - epixsky.com
source_urls:
  - https://www.epixsky.com/wp-content/uploads/2024/03/epiXsky_Advanced-Pro-RS232-Serial-LED-Control-Command.pdf
  - https://www.epixsky.com/wp-content/uploads/2023/02/epiXsky_Advanced-Pro-RS232-Serial-LED-Product-Manual.pdf
  - https://www.epixsky.com/specification-literature/
  - https://www.epixsky.com/product/advanced-pro/
  - https://www.epixsky.com/wp-content/uploads/2024/03/dip-switch-and-command-settings.pdf
retrieved_at: 2026-06-15T12:37:14.432Z
last_checked_at: 2026-10-01T11:04:15.832Z
generated_at: 2026-10-01T11:04:15.832Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a command sheet only — no power/voltage specs, no firmware compatibility ranges, no flow_control line stated."
  - "flow control not stated in source"
  - "exact response string format not stated in source"
  - "no read-back variable semantics documented beyond Xstat"
  - "no events section applicable based on source"
  - "no macros section applicable based on source"
  - "source command sheet contains no safety warnings, interlock"
  - "source is the Command Sheet only — full Product Manual may contain additional commands, electrical specs, response formats, and timing requirements not captured here."
  - "exact response string format for Xstat and addr not documented."
  - "ramp/rate unit (seconds? ticks?) and valid range for YY not stated."
  - "flow_control, firmware compatibility, and protocol version not stated."
verification:
  verdict: verified
  checked_at: 2026-10-01T11:04:15.832Z
  matched_actions: 61
  action_count: 61
  confidence: medium
  summary: "All 61 spec commands are present in the source command reference (X-red/green/blue/white/wht1-4 YYY, named colors, shows, ramp/rate, brighten/dim, presets, off, queries). Transport params (9600 8N1, \\r, universal 9) are verbatim in source. Coverage 61/61. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-14
---

# EpixSky Epic AdvancedPro LED Controller Control Spec

## Summary
RGB/W LED controller driven over RS-232C serial at 9600 8N1. Single-byte address prefix (`X`, 0–9, where 9 is universal) precedes each ASCII command; all commands terminated with carriage return (`\r`). Commands daisy-chain out the serial port to downstream controllers. Covers per-channel level set, named colors, color/show presets, ramp/rate timing, save/recall presets, status query, and various off commands.

<!-- UNRESOLVED: source is a command sheet only — no power/voltage specs, no firmware compatibility ranges, no flow_control line stated. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
  termination: "\r"   # all commands terminated with carriage return
  addressing: single-byte decimal prefix (0-9); 9 = universal (all units respond)
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
# - levelable   (per-channel RGBW level set + brighten/dim by 4%)
# - queryable   (Xstat returns levels/rates; addr returns controller address)
# - presettable (5 save slots A-E, 3 recall slots A-C) - not a standard trait, noted for reference
traits:
  - levelable
  - queryable
```

## Actions
```yaml
# Convention: `{addr}` = controller address (single digit 0-9; 9 = universal).
# `{level}` = percent 000-100 (3-digit, zero-padded) unless noted.
# All commands terminated with `\r`.

# --- Color / Level set (parameterized) ---
- id: set_red_level
  label: Red to N%
  kind: action
  command: "{addr}red{level}"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)
    - name: level
      type: integer
      description: Red level percent (000-100, 3-digit zero-padded)

- id: set_green_level
  label: Green to N%
  kind: action
  command: "{addr}green{level}"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)
    - name: level
      type: integer
      description: Green level percent (000-100, 3-digit zero-padded)

- id: set_blue_level
  label: Blue to N%
  kind: action
  command: "{addr}blue{level}"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)
    - name: level
      type: integer
      description: Blue level percent (000-100, 3-digit zero-padded)

- id: set_white_level
  label: White to N%
  kind: action
  command: "{addr}white{level}"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)
    - name: level
      type: integer
      description: White level percent (000-100, 3-digit zero-padded)

- id: set_wht1_level
  label: White (Wht1) to N%
  kind: action
  command: "{addr}wht1{level}"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)
    - name: level
      type: integer
      description: White (Wht1) level percent (000-100, 3-digit zero-padded)

- id: set_wht2_level
  label: Wht2 (Blue) to N%
  kind: action
  command: "{addr}wht2{level}"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)
    - name: level
      type: integer
      description: Wht2 (mapped to Blue) level percent (000-100, 3-digit zero-padded)

- id: set_wht3_level
  label: Wht3 (Green) to N%
  kind: action
  command: "{addr}wht3{level}"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)
    - name: level
      type: integer
      description: Wht3 (mapped to Green) level percent (000-100, 3-digit zero-padded)

- id: set_wht4_level
  label: Wht4 (Red) to N%
  kind: action
  command: "{addr}wht4{level}"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)
    - name: level
      type: integer
      description: Wht4 (mapped to Red) level percent (000-100, 3-digit zero-padded)

# --- Named colors (fixed levels per source) ---
- id: color_all_red
  label: All Red (R on, G&B off)
  kind: action
  command: "{addr}allred"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: color_all_green
  label: All Green (G on, R&B off)
  kind: action
  command: "{addr}allgreen"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: color_all_blue
  label: All Blue (B on, R&G off)
  kind: action
  command: "{addr}allblue"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: color_magenta
  label: Magenta
  kind: action
  command: "{addr}magenta"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: color_cyan
  label: Cyan
  kind: action
  command: "{addr}cyan"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: color_gold
  label: Gold
  kind: action
  command: "{addr}gold"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: color_rgb_white
  label: RGB White
  kind: action
  command: "{addr}rgbwht"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: color_orange
  label: Orange
  kind: action
  command: "{addr}orange"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: color_light_blue
  label: Light Blue
  kind: action
  command: "{addr}ltblue"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: color_light_green
  label: Light Green
  kind: action
  command: "{addr}ltgreen"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: color_violet
  label: Violet
  kind: action
  command: "{addr}violet"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: color_pink
  label: Pink
  kind: action
  command: "{addr}pink"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: color_warm_white
  label: Warm White
  kind: action
  command: "{addr}rgbww"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

# --- Color cycle / shows ---
- id: cycle_start
  label: Color Cycle
  kind: action
  command: "{addr}cycle"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: cycle_pause
  label: Pause Color Cycle
  kind: action
  command: "{addr}pause"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: show_sunset
  label: Sunset Show
  kind: action
  command: "{addr}sun"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: show_tranquility
  label: Tranquility Show
  kind: action
  command: "{addr}ocean"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: show_morning_sky
  label: Morning Sky Show
  kind: action
  command: "{addr}sky"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: show_royal
  label: Royal Show
  kind: action
  command: "{addr}royal"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: show_usa
  label: USA Show
  kind: action
  command: "{addr}usa"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: show_twilight
  label: Twilight Show
  kind: action
  command: "{addr}twilight"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: show_valentines
  label: Valentines Day Show
  kind: action
  command: "{addr}val"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: show_easter
  label: Easter Show
  kind: action
  command: "{addr}east"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: show_autumn
  label: Autumn Show
  kind: action
  command: "{addr}atm"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: show_christmas
  label: Christmas Show
  kind: action
  command: "{addr}xmas"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: show_mardi_gras
  label: Mardi Gras Show
  kind: action
  command: "{addr}party"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: show_cool_cabaret
  label: Cool Cabaret Show
  kind: action
  command: "{addr}disco"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: show_rainbow
  label: Rainbow Show
  kind: action
  command: "{addr}rainbow"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

# --- Adjustment / Rate (parameterized) ---
- id: set_ramp_time
  label: Set Ramp Time
  kind: action
  command: "{addr}ramp{rate}"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)
    - name: rate
      type: integer
      description: Ramp rate of change (2-digit per source `YY`); unit not stated in source

- id: set_rate_time
  label: Set Rate Time
  kind: action
  command: "{addr}rate{rate}"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)
    - name: rate
      type: integer
      description: Speed of all shows (2-digit per source `YY`); unit not stated in source

# --- Brighten (+4%) ---
- id: brighten_rgb
  label: Brighten RGB (+4%)
  kind: action
  command: "{addr}brt"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: brighten_white
  label: Brighten White (+4%)
  kind: action
  command: "{addr}btw"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: brighten_red
  label: Brighten Red (+4%)
  kind: action
  command: "{addr}btr"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: brighten_green
  label: Brighten Green (+4%)
  kind: action
  command: "{addr}btg"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: brighten_blue
  label: Brighten Blue (+4%)
  kind: action
  command: "{addr}btb"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

# --- Dim (-4%) ---
- id: dim_rgb
  label: Dim RGB (-4%)
  kind: action
  command: "{addr}dim"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: dim_white
  label: Dim White (-4%)
  kind: action
  command: "{addr}dmw"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: dim_red
  label: Dim Red (-4%)
  kind: action
  command: "{addr}dmr"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: dim_green
  label: Dim Green (-4%)
  kind: action
  command: "{addr}dmg"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: dim_blue
  label: Dim Blue (-4%)
  kind: action
  command: "{addr}dmb"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

# --- Preset save ---
- id: save_preset_a
  label: Save Preset A
  kind: action
  command: "{addr}sprea"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: save_preset_b
  label: Save Preset B
  kind: action
  command: "{addr}spreb"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: save_preset_c
  label: Save Preset C
  kind: action
  command: "{addr}sprec"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: save_preset_d
  label: Save Preset D
  kind: action
  command: "{addr}spred"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: save_preset_e
  label: Save Preset E
  kind: action
  command: "{addr}spree"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

# --- Preset recall ---
- id: recall_preset_a
  label: Recall Preset A
  kind: action
  command: "{addr}rprea"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: recall_preset_b
  label: Recall Preset B
  kind: action
  command: "{addr}rpreb"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: recall_preset_c
  label: Recall Preset C
  kind: action
  command: "{addr}rprec"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

# --- Off commands ---
- id: all_off
  label: All LEDs Off (addressed)
  kind: action
  command: "{addr}alloff"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: rgb_off
  label: RGB Off (R, G, B off)
  kind: action
  command: "{addr}rgboff"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)

- id: global_off
  label: Global Off (all addresses)
  kind: action
  command: "globaloff"
  params: []
  notes: Source documents this without an address prefix - affects all controllers on the bus.

# --- Status queries ---
- id: query_status
  label: Query Status
  kind: query
  command: "{addr}stat"
  params:
    - name: addr
      type: integer
      description: Controller address (0-9; 9 = universal/all units)
  returns: Status of all levels and rates (format unspecified)

- id: query_address
  label: Query Address
  kind: query
  command: "addr"
  params: []
  returns: Controller address
  notes: Source documents this without an address prefix.
```

## Feedbacks
```yaml
# Source documents two query responses but no enumerated unsolicited feedback or
# response-string format. Documenting only what source states.
- id: status_response
  type: string
  description: Response to Xstat query - "Status of all levels, and rates"
  # UNRESOLVED: exact response string format not stated in source

- id: address_response
  type: integer
  description: Response to `addr` query - controller address (0-9)
  # UNRESOLVED: exact response string format not stated in source
```

## Variables
```yaml
# Per-channel levels (red/green/blue/white/wht1-4) and ramp/rate are set via
# discrete Actions above, not as standalone Variables - source documents them
# as direct command strings, not query/set pairs. No additional variables stated.
# UNRESOLVED: no read-back variable semantics documented beyond Xstat
```

## Events
```yaml
# Source documents no unsolicited notifications from the controller.
# UNRESOLVED: no events section applicable based on source
```

## Macros
```yaml
# Source documents no multi-step command sequences.
# UNRESOLVED: no macros section applicable based on source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source command sheet contains no safety warnings, interlock
# procedures, or power-on sequencing requirements.
```

## Notes
- Address `X` is a single-byte decimal prefix substituted into each command (0–9); address `9` is the universal/broadcast address — all controllers on the bus respond.
- Commands are repeated out the serial port for daisy-chaining to downstream controllers — a host should expect its own commands to be echoed on RX.
- All commands terminated with a single carriage return (`\r`).
- `Xwhite` and `Xwht1` both map to White; `Xwht2`→Blue, `Xwht3`→Green, `Xwht4`→Red (per source NOTES column — appears to support alternate 4-channel white/RGBW wiring mappings).
- Source table lists `Xltgreen` with green=255% which exceeds 100% — likely a typo in the vendor sheet; treat 100% as the practical max until verified on-device.
- Brighten/Dim steps are fixed ±4% per command invocation (no parameter).

<!-- UNRESOLVED: source is the Command Sheet only — full Product Manual may contain additional commands, electrical specs, response formats, and timing requirements not captured here. -->
<!-- UNRESOLVED: exact response string format for Xstat and addr not documented. -->
<!-- UNRESOLVED: ramp/rate unit (seconds? ticks?) and valid range for YY not stated. -->
<!-- UNRESOLVED: flow_control, firmware compatibility, and protocol version not stated. -->
````

## Provenance

```yaml
source_domains:
  - epixsky.com
source_urls:
  - https://www.epixsky.com/wp-content/uploads/2024/03/epiXsky_Advanced-Pro-RS232-Serial-LED-Control-Command.pdf
  - https://www.epixsky.com/wp-content/uploads/2023/02/epiXsky_Advanced-Pro-RS232-Serial-LED-Product-Manual.pdf
  - https://www.epixsky.com/specification-literature/
  - https://www.epixsky.com/product/advanced-pro/
  - https://www.epixsky.com/wp-content/uploads/2024/03/dip-switch-and-command-settings.pdf
retrieved_at: 2026-06-15T12:37:14.432Z
last_checked_at: 2026-10-01T11:04:15.832Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T11:04:15.832Z
matched_actions: 61
action_count: 61
confidence: medium
summary: "All 61 spec commands are present in the source command reference (X-red/green/blue/white/wht1-4 YYY, named colors, shows, ramp/rate, brighten/dim, presets, off, queries). Transport params (9600 8N1, \\r, universal 9) are verbatim in source. Coverage 61/61. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a command sheet only — no power/voltage specs, no firmware compatibility ranges, no flow_control line stated."
- "flow control not stated in source"
- "exact response string format not stated in source"
- "no read-back variable semantics documented beyond Xstat"
- "no events section applicable based on source"
- "no macros section applicable based on source"
- "source command sheet contains no safety warnings, interlock"
- "source is the Command Sheet only — full Product Manual may contain additional commands, electrical specs, response formats, and timing requirements not captured here."
- "exact response string format for Xstat and addr not documented."
- "ramp/rate unit (seconds? ticks?) and valid range for YY not stated."
- "flow_control, firmware compatibility, and protocol version not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
