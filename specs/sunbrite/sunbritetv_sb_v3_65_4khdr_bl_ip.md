---
spec_id: admin/sunbritetv-veranda-3-65-4khdr-bl
schema_version: ai4av-public-spec-v1
revision: 1
title: "SunBriteTV Veranda 3 65\" 4K HDR Control Spec"
manufacturer: SunBrite
model_family: SB-V3-55-4KHDR-BL
aliases: []
compatible_with:
  manufacturers:
    - SunBrite
    - SunBriteTV
  models:
    - SB-V3-55-4KHDR-BL
    - SB-V3-65-4KHDR-BL
    - SB-V3-75-4KHDR-BL
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sunbritetv.com
source_urls:
  - https://www.sunbritetv.com/content/RS232-control-codes.pdf
retrieved_at: 2026-05-04T15:18:20.447Z
last_checked_at: 2026-05-31T22:43:11.729Z
generated_at: 2026-05-31T22:43:11.729Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T22:43:11.729Z
  matched_actions: 60
  action_count: 60
  confidence: high
  summary: "All 60 spec actions matched cleanly to source commands; transport port verified; complete one-to-one coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# SunBriteTV Veranda 3 65" 4K HDR Control Spec

## Summary
Veranda 3 outdoor TV series controllable via TCP/IP on port 60028. Commands cover power, input selection, menu navigation, volume, tuning, and status queries. No authentication required. WakeOn LAN required for power-on from external systems (ON command only works with official Control4 driver).

<!-- UNRESOLVED: no firmware version compatibility stated -->
<!-- UNRESOLVED: no binary protocol encoding details -->
<!-- UNRESOLVED: no unsolicited event notifications documented -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 60028
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_on
  label: Power On (WoL only via external control systems)
  kind: action
  params: []
  note: ON command only supported via official Control4 driver; use WakeOn LAN packet for other control systems

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: input_toggle
  label: Input Toggle
  kind: action
  params: []

- id: tv_video
  label: TV/Video Source
  kind: action
  params: []

- id: select_input
  label: Select Input by Number
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (200001=TV/Video, 200002=HDMI1, 200003=HDMI2, 200004=HDMI3, 200005=HDMI4, 200006=AV)

- id: info
  label: Info
  kind: action
  params: []

- id: guide
  label: Guide
  kind: action
  params: []

- id: menu
  label: Menu
  kind: action
  params: []

- id: cancel
  label: Cancel
  kind: action
  params: []

- id: nav_up
  label: Navigate Up
  kind: action
  params: []

- id: nav_down
  label: Navigate Down
  kind: action
  params: []

- id: nav_left
  label: Navigate Left
  kind: action
  params: []

- id: nav_right
  label: Navigate Right
  kind: action
  params: []

- id: enter
  label: Enter
  kind: action
  params: []

- id: recall
  label: Recall
  kind: action
  params: []

- id: prev_channel
  label: Previous Channel
  kind: action
  params: []

- id: program_a
  label: Program A
  kind: action
  params: []

- id: program_b
  label: Program B
  kind: action
  params: []

- id: program_c
  label: Program C
  kind: action
  params: []

- id: program_d
  label: Program D
  kind: action
  params: []

- id: closed_captioned
  label: Closed Captioned
  kind: action
  params: []

- id: page_up
  label: Page Up
  kind: action
  params: []

- id: page_down
  label: Page Down
  kind: action
  params: []

- id: home
  label: Home
  kind: action
  params: []

- id: all_apps
  label: All Apps
  kind: action
  params: []

- id: digit_0
  label: Digit 0
  kind: action
  params: []

- id: digit_1
  label: Digit 1
  kind: action
  params: []

- id: digit_2
  label: Digit 2
  kind: action
  params: []

- id: digit_3
  label: Digit 3
  kind: action
  params: []

- id: digit_4
  label: Digit 4
  kind: action
  params: []

- id: digit_5
  label: Digit 5
  kind: action
  params: []

- id: digit_6
  label: Digit 6
  kind: action
  params: []

- id: digit_7
  label: Digit 7
  kind: action
  params: []

- id: digit_8
  label: Digit 8
  kind: action
  params: []

- id: digit_9
  label: Digit 9
  kind: action
  params: []

- id: star
  label: Star
  kind: action
  params: []

- id: dot
  label: Dot
  kind: action
  params: []

- id: hyphen
  label: Hyphen
  kind: action
  params: []

- id: pound
  label: Pound
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

- id: mute_toggle
  label: Mute Toggle
  kind: action
  params: []

- id: pulse_vol_down
  label: Pulse Volume Down
  kind: action
  params: []

- id: pulse_vol_up
  label: Pulse Volume Up
  kind: action
  params: []

- id: set_volume_level
  label: Set Volume Level
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level value

- id: set_channel
  label: Set Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number

- id: pulse_ch_up
  label: Pulse Channel Up
  kind: action
  params: []

- id: start_ch_up
  label: Start Channel Up
  kind: action
  params: []

- id: pulse_ch_down
  label: Pulse Channel Down
  kind: action
  params: []

- id: start_ch_down
  label: Start Channel Down
  kind: action
  params: []

- id: skip_fwd
  label: Skip Forward
  kind: action
  params: []

- id: scan_fwd
  label: Scan Forward
  kind: action
  params: []

- id: skip_rev
  label: Skip Reverse
  kind: action
  params: []

- id: scan_rev
  label: Scan Reverse
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

- id: keep_alive
  label: Keep Alive
  kind: action
  params: []

- id: get_volume_status
  label: Get Volume Status
  kind: query
  params: []

- id: get_mute_status
  label: Get Mute Status
  kind: query
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: source states no confirmation response is returned for any command
# No response format documented
```

## Variables
```yaml
# UNRESOLVED: no settable parameters documented as independent variables
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Note: WakeOn LAN (WoL) packet required to power on from external control systems (ON command only works with Control4 driver)
```

## Notes
Commands must be terminated by a carriage return. No confirmation response is returned for any command. Compatible only with Veranda 3 models (SB-V3-55-4KHDR-BL, SB-V3-65-4KHDR-BL, SB-V3-75-4KHDR-BL). Control API port must be enabled in TV settings before use. TV must be powered on and connected to the local network for initial SDDP setup.

## Provenance

```yaml
source_domains:
  - sunbritetv.com
source_urls:
  - https://www.sunbritetv.com/content/RS232-control-codes.pdf
retrieved_at: 2026-05-04T15:18:20.447Z
last_checked_at: 2026-05-31T22:43:11.729Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:43:11.729Z
matched_actions: 60
action_count: 60
confidence: high
summary: "All 60 spec actions matched cleanly to source commands; transport port verified; complete one-to-one coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
