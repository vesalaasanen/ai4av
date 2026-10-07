---
spec_id: admin/seura-ub4-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Seura UB4 Series Control Spec"
manufacturer: Seura
model_family: UB4-50
aliases: []
compatible_with:
  manufacturers:
    - Seura
  models:
    - UB4-50
    - UB4-65
    - UB4-85
    - SHD2-43
    - SHD2-55
    - SHD2-65
    - SHD2-75
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - storage.googleapis.com
source_urls:
  - https://storage.googleapis.com/wp-stateless/2021/09/IPControl-SHD290.pdf
retrieved_at: 2026-04-30T04:28:57.688Z
last_checked_at: 2026-09-27T14:59:54.710Z
generated_at: 2026-09-27T14:59:54.710Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Safety interlock procedures not documented"
  - "encoding for 100 is not established by the two-digit setter template.\""
  - "no unsolicited notification mechanism documented in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings or interlock procedures in source"
  - "firmware version compatibility not stated in source"
  - "fault behavior and error recovery sequences not documented"
  - "binary command encoding not applicable (text-based JSON over HTTP)"
  - "source SET VOLUME is VOL:XX with X digits 0-9, while response volume is described as 0-100. Do not infer a wire encoding for setting 100."
verification:
  verdict: verified
  checked_at: 2026-09-27T14:59:54.710Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 command units match the IP guide; setter encoding for 100 remains explicitly unknown. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Seura UB4 Series Control Spec

## Summary
IP-controlled outdoor TV series supporting TCP over HTTP (port 3000). Compatible with multiple Seura Pro and UB4 models. Control via JSON commands over HTTP POST requests; responses include power state, input, channel, volume, mute, and device info (model, serial, firmware, runtime).

<!-- UNRESOLVED: Safety interlock procedures not documented -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  port: 3000
  base_url: /  # explicit POST / HTTP/1.1 request path
auth:
  type: UNRESOLVED  # Authentication requirements are not stated in the source
```

## Traits
```yaml
- powerable  # power on/off/toggle commands present
- queryable  # status query commands present (PWD:?, CHA:?, INP:?, VOL:?, MUT:?)
- routable   # input selection commands present (INP:0-7)
- levelable  # volume control commands present (VOL:+-/XX)
```

## Actions
```yaml
- id: power_on
  command: "PWD:1"
  label: Power On
  kind: action
  params: []

- id: power_off
  command: "PWD:0"
  label: Power Off
  kind: action
  params: []

- id: power_toggle
  command: "PWD:3"
  label: Power Toggle
  kind: action
  params: []

- id: power_query
  command: "PWD:?"
  label: Power Status Query
  kind: query
  params: []

- id: channel_up
  command: "CHA:+"
  label: Channel Up
  kind: action
  params: []

- id: channel_down
  command: "CHA:-"
  label: Channel Down
  kind: action
  params: []

- id: channel_set
  command: "CHA:XX.Y"
  wire_template: "CHA:{channel}"
  label: Set Channel
  kind: action
  params:
    - name: channel
      type: string
      description: Channel in XX.Y format (primary.secondary for digital)

- id: channel_query
  command: "CHA:?"
  label: Channel Status Query
  kind: query
  params: []

- id: input_query
  command: "INP:?"
  label: Input Status Query
  kind: query
  params: []

- id: input_select
  command: "INP:"
  wire_template: "INP:{input}"
  label: Select Input
  kind: action
  params:
    - name: input
      type: integer
      values: [0, 1, 2, 3, 4, 5, 7]
      description: Input number (0=TV, 1=HDMI 1, 2=HDMI 2, 3=HDMI 3, 4=Component, 5=AV, 7=USB Media)

- id: volume_up
  command: "VOL:+"
  label: Volume Up
  kind: action
  params: []

- id: volume_down
  command: "VOL:-"
  label: Volume Down
  kind: action
  params: []

- id: volume_set
  command: "VOL:XX"
  wire_template: "VOL:{level}"
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: "Volume setting XX; UNRESOLVED: encoding for 100 is not established by the two-digit setter template."

- id: volume_query
  command: "VOL:?"
  label: Volume Status Query
  kind: query
  params: []

- id: mute_on
  command: "MUT:1"
  label: Mute On
  kind: action
  params: []

- id: mute_off
  command: "MUT:0"
  label: Mute Off
  kind: action
  params: []

- id: mute_toggle
  command: "MUT:3"
  label: Mute Toggle
  kind: action
  params: []

- id: mute_query
  command: "MUT:?"
  label: Mute Status Query
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - 0  # off
    - 1  # on

- id: input_state
  label: Input State
  type: integer
  description: Current input number

- id: channel_state
  label: Channel State
  type: string
  description: Current channel in XX.Y format (primary.secondary for digital)

- id: volume_state
  label: Volume State
  type: integer
  description: Current volume level 0-100

- id: mute_state
  label: Mute State
  type: enum
  values:
    - 0  # off
    - 1  # on

- id: device_info
  label: Device Info
  type: object
  properties:
    - model: string
    - serial: string
    - firmware: string
    - runtime:
        type: number
        description: Runtime in hours
```

## Variables
```yaml
# No discrete settable parameters beyond direct commands.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification mechanism documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
**Static IP requirement:** Power cycle the display after entering static IP address information to ensure proper control system operation.

**HTTP request format:** POST to `/` with JSON body `{"command": "<cmd>", "id": <optional-int>}`. Response includes result status ("SUCCESS", "INVALID VALUE", "INVALID JSON", "UPDATE") and state object with power, input, channel, volume, mute fields. Info object contains model, serial, firmware version, and runtime hours.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: fault behavior and error recovery sequences not documented -->
<!-- UNRESOLVED: binary command encoding not applicable (text-based JSON over HTTP) -->

<!-- UNRESOLVED: source SET VOLUME is VOL:XX with X digits 0-9, while response volume is described as 0-100. Do not infer a wire encoding for setting 100. -->

## Provenance

```yaml
source_domains:
  - storage.googleapis.com
source_urls:
  - https://storage.googleapis.com/wp-stateless/2021/09/IPControl-SHD290.pdf
retrieved_at: 2026-04-30T04:28:57.688Z
last_checked_at: 2026-09-27T14:59:54.710Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-27T14:59:54.710Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 command units match the IP guide; setter encoding for 100 remains explicitly unknown. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Safety interlock procedures not documented"
- "encoding for 100 is not established by the two-digit setter template.\""
- "no unsolicited notification mechanism documented in source"
- "no multi-step sequences documented in source"
- "no safety warnings or interlock procedures in source"
- "firmware version compatibility not stated in source"
- "fault behavior and error recovery sequences not documented"
- "binary command encoding not applicable (text-based JSON over HTTP)"
- "source SET VOLUME is VOL:XX with X digits 0-9, while response volume is described as 0-100. Do not infer a wire encoding for setting 100."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
