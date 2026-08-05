---
spec_id: admin/seura-shd2-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Seura SHD2 Series Control Spec"
manufacturer: Seura
model_family: SHD2-43
aliases: []
compatible_with:
  manufacturers:
    - Seura
  models:
    - SHD2-43
    - SHD2-65
    - UB4-50
    - UB4-85
    - SHD2-55
    - SHD2-75
    - UB4-65
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - storage.googleapis.com
source_urls:
  - https://storage.googleapis.com/wp-stateless/2021/09/IPControl-SHD290.pdf
retrieved_at: 2026-07-16T08:34:33.466Z
last_checked_at: 2026-07-22T00:46:47.437Z
generated_at: 2026-07-22T00:46:47.437Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "whether HDMI inputs support 4K/60Hz querying not stated in source"
  - "no unsolicited event notifications described in source"
  - "no multi-step sequences described in source"
verification:
  verdict: verified
  checked_at: 2026-07-22T00:46:47.437Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions matched verbatim source command tokens; transport (TCP/HTTP port 3000) verified; coverage complete. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Seura SHD2 Series Control Spec

## Summary
IP-controlled outdoor TV series supporting TCP over HTTP on port 3000. Compatible models are SHD2 and UB4 series displays. Control is performed via JSON POST requests over HTTP; the device returns state information in the response body.

<!-- UNRESOLVED: whether HDMI inputs support 4K/60Hz querying not stated in source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 3000
  base_url: http://{ip_address}
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
powerable: true   # inferred: power commands PWD:1, PWD:0, PWD:3 present
routable: true    # inferred: input selection commands INP:N present
queryable: true   # inferred: query commands PWD:?, CHA:?, INP:?, VOL:?, MUT:? present
levelable: true   # inferred: volume commands VOL:+, VOL:-, VOL:XX present
```

## Actions
```yaml
# Power
- id: power_on
  label: Power On
  kind: action
  command: "PWD:1"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "PWD:0"
  params: []

- id: power_toggle
  label: Power Toggle
  kind: action
  command: "PWD:3"
  params: []

- id: power_status_query
  label: Power Status Query
  kind: query
  command: "PWD:?"
  params: []

# Channel
- id: channel_up
  label: Increase Channel
  kind: action
  command: "CHA:+"
  params: []

- id: channel_down
  label: Decrease Channel
  kind: action
  command: "CHA:-"
  params: []

- id: channel_set
  label: Set Channel
  kind: action
  command: "CHA:{channel}"
  params:
    - name: channel
      type: string
      description: Channel as XX.Y (X and Y are numbers 0-9; primary.secondary for digital channel)

- id: channel_status_query
  label: Channel Status Query
  kind: query
  command: "CHA:?"
  params: []

# Inputs
- id: input_select
  label: Select Input
  kind: action
  command: "INP:{input}"
  params:
    - name: input
      type: integer
      description: |
        Input number (source-documented mapping):
        0=TV, 1=HDMI 1, 2=HDMI 2, 3=HDMI 3, 4=Component, 5=AV, 7=USB Media

- id: input_query
  label: Input Query
  kind: query
  command: "INP:?"
  params: []

# Volume
- id: volume_up
  label: Volume Up
  kind: action
  command: "VOL:+"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "VOL:-"
  params: []

- id: volume_set
  label: Set Volume
  kind: action
  command: "VOL:{level}"
  params:
    - name: level
      type: integer
      description: Volume level (VOL:XX, X is number 0-9); response reports 0-100

- id: volume_status_query
  label: Volume Status Query
  kind: query
  command: "VOL:?"
  params: []

# Mute
- id: mute_on
  label: Mute On
  kind: action
  command: "MUT:1"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "MUT:0"
  params: []

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "MUT:3"
  params: []

- id: mute_status_query
  label: Mute Status Query
  kind: query
  command: "MUT:?"
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

- id: current_input
  label: Current Input
  type: integer
  description: Current input number (0=TV,1=HDMI1,2=HDMI2,3=HDMI3,4=Component,5=AV,7=USB Media)

- id: current_channel
  label: Current Channel
  type: string
  description: Current tuner channel as primary.secondary (e.g. "24.2")

- id: volume_level
  label: Volume Level
  type: integer
  range: [0, 100]

- id: mute_state
  label: Mute State
  type: enum
  values:
    - 0  # unmute
    - 1  # muted
```

## Variables
```yaml
# State is queried via the same command with "?" suffix, response is embedded
# in the HTTP response body under "state" key.
# No standalone settable parameters beyond actions.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # recommended before adjusting network settings
interlocks:
  - type: power_cycle_after_static_ip
    description: "For static IP installations, power cycle the display after entering new IP address information to ensure proper control system operation."
```

## Notes

**Command format:** All commands are POSTed as JSON to `http://{ip}:3000/` with body `{"command": "<cmd>", "id": <optional-int>}`.

**Response format:** Response contains `result` ("SUCCESS", "INVALID VALUE", "INVALID JSON", or "UPDATE"), optional `state` object with current values, and optional `info` object with device metadata.

**State query:** No separate state query command exists; client sends any command and reads `state` block from response. A bare query command like `PWD:?` can be used to retrieve full state.

**Model/serial info:** Model (`SHD2-55A`) and serial are set at production; firmware version readable via `info.firmware` in response.

**Channel format:** Digital channels use primary.secondary notation (e.g., "24.2"). Analog channels use single number.

**Runtime tracking:** Device reports cumulative runtime in hours via `info.runtime` in response.

<!-- UNRESOLVED: whether HDMI inputs support 4K/60Hz querying not stated in source -->
````

Changes vs on-disk:
- Added verbatim `command:` to all 13 existing actions (was payload-less → now implementable)
- Added 5 query actions documented as separate source rows: `power_status_query` (PWD:?), `channel_status_query` (CHA:?), `input_query` (INP:?), `volume_status_query` (VOL:?), `mute_status_query` (MUT:?)
- Resolved input-table UNRESOLVED — source confirms full mapping incl. `4=Component`
- Deduped accidental double `confirmation_required_for` key in Safety
- Preserved all IDs, shapes, transport, models, dates

## Provenance

```yaml
source_domains:
  - storage.googleapis.com
source_urls:
  - https://storage.googleapis.com/wp-stateless/2021/09/IPControl-SHD290.pdf
retrieved_at: 2026-07-16T08:34:33.466Z
last_checked_at: 2026-07-22T00:46:47.437Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:46:47.437Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions matched verbatim source command tokens; transport (TCP/HTTP port 3000) verified; coverage complete. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "whether HDMI inputs support 4K/60Hz querying not stated in source"
- "no unsolicited event notifications described in source"
- "no multi-step sequences described in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
