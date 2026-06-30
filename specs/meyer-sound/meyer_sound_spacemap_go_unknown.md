---
spec_id: admin/meyer-sound-spacemap-go
schema_version: ai4av-public-spec-v1
revision: 1
title: "Meyer Sound Spacemap Go Control Spec"
manufacturer: "Meyer Sound"
model_family: "Spacemap Go"
aliases: []
compatible_with:
  manufacturers:
    - "Meyer Sound"
  models:
    - "Spacemap Go"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.meyersound.com
source_urls:
  - https://docs.meyersound.com/products/en/user-guide---spacemap-go.html
retrieved_at: 2026-06-30T04:19:54.480Z
last_checked_at: 2026-06-30T07:12:09.324Z
generated_at: 2026-06-30T07:12:09.324Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source documents no query/response feedback strings, no unsolicited event notifications, and no power or configuration commands beyond the OSC command table."
  - "source documents no query-response feedback strings or state echo."
  - "source documents no settable parameters beyond the discrete actions above."
  - "source documents no unsolicited notifications pushed by the device."
  - "source documents no explicit multi-step command sequences."
  - "source contains no safety warnings, interlock procedures, or"
  - "UDP-vs-TCP transport for OSC not explicitly stated in source (OSC conventionally UDP); only port and Ethernet/IPv4/IPv6 details given."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-30T07:12:09.324Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 spec actions matched exactly in source table; all parameter shapes and transport port verified. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# Meyer Sound Spacemap Go Control Spec

## Summary
Spacemap Go is an iPad application that controls the Meyer Sound Galileo GALAXY processor in "Spacemap Mode" over Ethernet. External controllers (consoles, DAWs, QLab, OSCar) communicate with the Spacemap System using OSC (Open Sound Control). This spec documents the general-purpose OSC commands the system responds to: per-channel panner position, level, mute, crossfade, spread, trajectory control, mix/system level and mute, and snapshot recall.

<!-- UNRESOLVED: source documents no query/response feedback strings, no unsolicited event notifications, and no power or configuration commands beyond the OSC command table. -->

## Transport
```yaml
protocols:
  - osc
addressing:
  port: 38033  # Spacemap Go OSC receive port (source: "Spacemap Go receives OSC commands via port 38033")
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - levelable  # inferred: channel/mix/system level control commands present
```

## Actions
```yaml
# Channel-scoped commands use {channel} in place of the documented 1-32 range.
# Snapshot recall commands use the External Recall ID assigned in-app (900-3000).

- id: channel_position
  label: Channel Panner Position
  kind: action
  command: "/channel/{channel}/position"
  params:
    - name: channel
      type: integer
      description: Channel number (1-32)
    - name: x
      type: integer
      description: X position value (-1000 to 1000), 1st OSC argument
    - name: y
      type: integer
      description: Y position value (-1000 to 1000), 2nd OSC argument

- id: channel_level
  label: Channel Level
  kind: action
  command: "/channel/{channel}/level"
  params:
    - name: channel
      type: integer
      description: Channel number (1-32)
    - name: level
      type: number
      description: Level in dB (-90 to +10)

- id: channel_mute
  label: Channel Mute
  kind: action
  command: "/channel/{channel}/mute"
  params:
    - name: channel
      type: integer
      description: Channel number (1-32)
    - name: mute
      type: integer
      description: 0 = OFF (unmute), 1 = ON (mute)

- id: channel_crossfade
  label: Channel Crossfade
  kind: action
  command: "/channel/{channel}/crossfade"
  params:
    - name: channel
      type: integer
      description: Channel number (1-32)
    - name: crossfade
      type: integer
      description: Crossfade between two Spacemaps (-100 = Left Map 100%, 100 = Right Map 100%)

- id: channel_spread
  label: Channel Spread
  kind: action
  command: "/channel/{channel}/spread"
  params:
    - name: channel
      type: integer
      description: Channel number (1-32)
    - name: spread
      type: integer
      description: Spread percentage (0 to 100); logarithmic, 14% optimal for most cases

- id: channel_trajectory_status
  label: Channel Trajectory Status
  kind: action
  command: "/channel/{channel}/trajectory/status"
  params:
    - name: channel
      type: integer
      description: Channel number (1-32)
    - name: status
      type: enum
      description: Trajectory status
      values:
        - play
        - pause
        - stop  # stop and restart from start point

- id: mix_level
  label: Mix Level
  kind: action
  command: "/mix/level"
  params:
    - name: level
      type: number
      description: Mix level in dB (-90 to +10)

- id: mix_mute
  label: Mix Mute
  kind: action
  command: "/mix/mute"
  params:
    - name: mute
      type: integer
      description: 0 = OFF (unmute), 1 = ON (mute)

- id: system_level
  label: System Trim Level
  kind: action
  command: "/system/level"
  params:
    - name: level
      type: number
      description: System trim level in dB (-90 to +10)

- id: recall_channel_snapshot
  label: Recall Channel Snapshot
  kind: action
  command: "/recall/channel"
  params:
    - name: recall_id
      type: integer
      description: External Recall ID for the Channel Snapshot (e.g. 3003); assigned in-app

- id: recall_mix_snapshot
  label: Recall Mix Snapshot
  kind: action
  command: "/recall/mix"
  params:
    - name: recall_id
      type: integer
      description: External Recall ID for the Mix Snapshot (e.g. 2002); assigned in-app

- id: recall_system_snapshot
  label: Recall System Snapshot
  kind: action
  command: "/recall/system"
  params:
    - name: recall_id
      type: integer
      description: External Recall ID for the System Snapshot (e.g. 1001); assigned in-app
```

## Feedbacks
```yaml
# UNRESOLVED: source documents no query-response feedback strings or state echo.
```

## Variables
```yaml
# UNRESOLVED: source documents no settable parameters beyond the discrete actions above.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications pushed by the device.
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Never infer.
```

## Notes
- Spacemap Go is an iPad app; the controlled device is the Galileo GALAXY processor running in Spacemap Mode. The Spacemap Server runs on the GALAXY network platform.
- Control connection is exclusive: the Spacemap server only accepts OSC messages from the single configured external-controller IPv4 address, and only replies to that address.
- Spacemap Go receives OSC on port **38033**. The external controller (client) receiving port is configured in-app (suggested/default **4001**); QLab receives on 53000; the OSCar plugin input port is 4000.
- System uses IPv6 by default between iPads and GALAXY processors; IPv4 is enabled by entering a Spacemap System IPv4 address + subnet mask in SETTINGS > EXTERNAL DEVICE CONNECTION.
- Snapshot External Recall IDs are auto-assigned between 900 and 3000: Channel (e.g. 3xxx), Mix (e.g. 2xxx), System (e.g. 1xxx). IDs are shown in the Setlist view.
- QLab supports channel-range cues via regular expressions (e.g. `/channel/[1-9]/position`, `/channel/1[0-9]/position`, `/channel/2[0-9]/position`).
- The bare `/channel` address appears in the source table as a parent/header and carries no documented payload of its own.
<!-- UNRESOLVED: UDP-vs-TCP transport for OSC not explicitly stated in source (OSC conventionally UDP); only port and Ethernet/IPv4/IPv6 details given. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - docs.meyersound.com
source_urls:
  - https://docs.meyersound.com/products/en/user-guide---spacemap-go.html
retrieved_at: 2026-06-30T04:19:54.480Z
last_checked_at: 2026-06-30T07:12:09.324Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:12:09.324Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 spec actions matched exactly in source table; all parameter shapes and transport port verified. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source documents no query/response feedback strings, no unsolicited event notifications, and no power or configuration commands beyond the OSC command table."
- "source documents no query-response feedback strings or state echo."
- "source documents no settable parameters beyond the discrete actions above."
- "source documents no unsolicited notifications pushed by the device."
- "source documents no explicit multi-step command sequences."
- "source contains no safety warnings, interlock procedures, or"
- "UDP-vs-TCP transport for OSC not explicitly stated in source (OSC conventionally UDP); only port and Ethernet/IPv4/IPv6 details given."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
