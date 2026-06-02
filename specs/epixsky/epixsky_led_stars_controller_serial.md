---
spec_id: admin/epixsky-epixsky-led-stars-controller
schema_version: ai4av-public-spec-v1
revision: 1
title: "EpixSky EpixSky LED Stars Controller Control Spec"
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
  - https://www.epixsky.com/wp-content/uploads/2024/04/EpiXsky_Advanced-Pro-RS232-Serial-LED-Control-Marketing.pdf
retrieved_at: 2026-05-27T13:25:55.753Z
last_checked_at: 2026-05-27T15:36:44.922Z
generated_at: 2026-05-27T15:36:44.922Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no power-on sequence, fault behavior, or error response codes stated in source"
  - "no settable discrete parameters beyond action commands"
  - "no unsolicited notifications described in source"
  - "no explicit multi-step sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "response format for Xstat and addr commands not documented"
verification:
  verdict: verified
  checked_at: 2026-05-27T15:36:44.922Z
  matched_actions: 59
  action_count: 59
  confidence: medium
  summary: "All 59 spec actions matched verbatim in source; transport parameters verified; complete command coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# EpixSky EpixSky LED Stars Controller Control Spec

## Summary
LED controller supporting RGB and White channels via RS-232C serial. Commands use an address prefix (`X` = controller address, `9` = universal broadcast). All commands terminated with carriage return (`\r`). Daisy-chain repeat output for cascading controllers.

<!-- UNRESOLVED: no power-on sequence, fault behavior, or error response codes stated in source -->

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
- levelable  # brightness/ramp/rate adjustment commands present
```

## Actions
```yaml
- id: red
  label: Red Level
  kind: action
  params:
    - name: level
      type: integer
      description: Red level 0-100%

- id: green
  label: Green Level
  kind: action
  params:
    - name: level
      type: integer
      description: Green level 0-100%

- id: blue
  label: Blue Level
  kind: action
  params:
    - name: level
      type: integer
      description: Blue level 0-100%

- id: white
  label: White Level
  kind: action
  params:
    - name: level
      type: integer
      description: White level 0-100%

- id: wht1
  label: White 1 Level
  kind: action
  params:
    - name: level
      type: integer
      description: White 1 level 0-100%

- id: wht2
  label: White 2 Level
  kind: action
  params:
    - name: level
      type: integer
      description: White 2 level 0-100%

- id: wht3
  label: White 3 Level
  kind: action
  params:
    - name: level
      type: integer
      description: White 3 level 0-100%

- id: wht4
  label: White 4 Level
  kind: action
  params:
    - name: level
      type: integer
      description: White 4 level 0-100%

- id: allred
  label: All Red
  kind: action
  params: []

- id: allgreen
  label: All Green
  kind: action
  params: []

- id: allblue
  label: All Blue
  kind: action
  params: []

- id: magenta
  label: Magenta
  kind: action
  params: []

- id: cyan
  label: Cyan
  kind: action
  params: []

- id: gold
  label: Gold
  kind: action
  params: []

- id: rgbwht
  label: RGB White
  kind: action
  params: []

- id: orange
  label: Orange
  kind: action
  params: []

- id: ltblue
  label: Light Blue
  kind: action
  params: []

- id: ltgreen
  label: Light Green
  kind: action
  params: []

- id: violet
  label: Violet
  kind: action
  params: []

- id: pink
  label: Pink
  kind: action
  params: []

- id: rgbww
  label: Warm White
  kind: action
  params: []

- id: xcycle
  label: Color Cycle
  kind: action
  params: []

- id: xpause
  label: Pause
  kind: action
  params: []

- id: xsun
  label: Sunset Show
  kind: action
  params: []

- id: xocean
  label: Tranquility Show
  kind: action
  params: []

- id: xsky
  label: Morning Sky Show
  kind: action
  params: []

- id: xroyal
  label: Royal Show
  kind: action
  params: []

- id: xusa
  label: USA Show
  kind: action
  params: []

- id: xtwilight
  label: Twilight Show
  kind: action
  params: []

- id: xval
  label: Valentines Day Show
  kind: action
  params: []

- id: xeast
  label: Easter Show
  kind: action
  params: []

- id: xatm
  label: Autumn Show
  kind: action
  params: []

- id: xxmas
  label: Christmas Show
  kind: action
  params: []

- id: xparty
  label: Mardi Gras Show
  kind: action
  params: []

- id: xdisco
  label: Cool Cabaret Show
  kind: action
  params: []

- id: xrainbow
  label: Rainbow Show
  kind: action
  params: []

- id: xramp
  label: Ramp Time
  kind: action
  params:
    - name: rate
      type: integer
      description: Ramp rate of change (00-99)

- id: xrate
  label: Rate Time
  kind: action
  params:
    - name: rate
      type: integer
      description: Speed of all shows (00-99)

- id: xbrt
  label: Brighten RGB
  kind: action
  params: []

- id: xbtw
  label: Brighten White
  kind: action
  params: []

- id: xbtr
  label: Brighten Red
  kind: action
  params: []

- id: xbtg
  label: Brighten Green
  kind: action
  params: []

- id: xbtb
  label: Brighten Blue
  kind: action
  params: []

- id: xdim
  label: Dim RGB
  kind: action
  params: []

- id: xdmw
  label: Dim White
  kind: action
  params: []

- id: xdmr
  label: Dim Red
  kind: action
  params: []

- id: xdmg
  label: Dim Green
  kind: action
  params: []

- id: xdmb
  label: Dim Blue
  kind: action
  params: []

- id: xsprea
  label: Save Preset A
  kind: action
  params: []

- id: xspreb
  label: Save Preset B
  kind: action
  params: []

- id: xsprec
  label: Save Preset C
  kind: action
  params: []

- id: xspred
  label: Save Preset D
  kind: action
  params: []

- id: xspree
  label: Save Preset E
  kind: action
  params: []

- id: xrprea
  label: Recall Preset A
  kind: action
  params: []

- id: xrpreb
  label: Recall Preset B
  kind: action
  params: []

- id: xrprec
  label: Recall Preset C
  kind: action
  params: []

- id: xalloff
  label: LEDs Off
  kind: action
  params: []

- id: xrgboff
  label: RGB Off
  kind: action
  params: []

- id: globaloff
  label: Global Off
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: xstat
  label: Query Status
  type: string
  description: Returns status of all levels and rates

- id: addr
  label: Returns Address
  type: string
  description: Returns the controller address
```

## Variables
```yaml
# UNRESOLVED: no settable discrete parameters beyond action commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Address prefix `X` = controller address (1–8); `9` = universal broadcast (all units respond). Commands repeated out serial port for daisy-chain downstream devices. All commands terminated with carriage return (`\r`). Percentage levels (YYY) range 0–100.
<!-- UNRESOLVED: response format for Xstat and addr commands not documented -->

## Provenance

```yaml
source_domains:
  - epixsky.com
source_urls:
  - https://www.epixsky.com/wp-content/uploads/2024/03/epiXsky_Advanced-Pro-RS232-Serial-LED-Control-Command.pdf
  - https://www.epixsky.com/wp-content/uploads/2023/02/epiXsky_Advanced-Pro-RS232-Serial-LED-Product-Manual.pdf
  - https://www.epixsky.com/wp-content/uploads/2024/04/EpiXsky_Advanced-Pro-RS232-Serial-LED-Control-Marketing.pdf
retrieved_at: 2026-05-27T13:25:55.753Z
last_checked_at: 2026-05-27T15:36:44.922Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-27T15:36:44.922Z
matched_actions: 59
action_count: 59
confidence: medium
summary: "All 59 spec actions matched verbatim in source; transport parameters verified; complete command coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no power-on sequence, fault behavior, or error response codes stated in source"
- "no settable discrete parameters beyond action commands"
- "no unsolicited notifications described in source"
- "no explicit multi-step sequences described in source"
- "no safety warnings or interlock procedures in source"
- "response format for Xstat and addr commands not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
