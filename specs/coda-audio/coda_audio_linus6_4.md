---
spec_id: admin/coda-audio-linus6-4
schema_version: ai4av-public-spec-v1
revision: 1
title: "CODA Audio LINUS6.4 Control Spec"
manufacturer: "CODA Audio"
model_family: LINUS6.4
aliases: []
compatible_with:
  manufacturers:
    - "CODA Audio"
  models:
    - LINUS6.4
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - codaaudio.cn
source_urls:
  - https://www.codaaudio.cn/uploads/soft/LINUS_Control_v2.9.1_Third_Party_Control.pdf
retrieved_at: 2026-04-29T23:14:25.650Z
last_checked_at: 2026-04-27T14:40:22.749Z
generated_at: 2026-04-27T14:40:22.749Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-27T14:40:22.749Z
  matched_actions: 16
  action_count: 16
  confidence: high
  summary: "All 16 spec actions matched verbatim to source commands with correct parameter ranges and transport verified on UDP port 3000."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# CODA Audio LINUS6.4 Control Spec

## Summary
CODA Audio LINUS6.4 amplifier controlled via UDP datagrams on port 3000. ASCII commands prefixed with `*`. SET commands unacknowledged; GET commands return reply to host IP. Supports gain, mute, delay, snapshot recall, fallback switching, power sequencing, and group clearing across 4 output channels.

<!-- UNRESOLVED: separate "LINUS Control v2.8 Third Party Control for LINUS6.4" document contains additional commands not covered here -->

## Transport
```yaml
protocols:
  - udp
addressing:
  port: 3000  # stated: UDP Port 3000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # SET_POWER with delay param
- routable        # snapshot loading per channel
- queryable       # GETDEVINFO, GET_MUTE, GET_GAIN, GET_DELAY, GET_FALLBACK, GET_ACT_SNAPSHOT
- levelable       # SET_GAIN, SET_MUTE, SET_DELAY
```

## Actions
```yaml
- id: getdevinfo
  label: Get Device Info
  kind: action
  params: []

- id: changeip
  label: Change IP Address
  kind: action
  params:
    - name: ip
      type: string
      description: Desired IP (15-char padded, e.g. 192.168.001.001)
    - name: mac
      type: string
      description: Target amplifier MAC address

- id: loadsnapshot
  label: Load Snapshot
  kind: action
  params:
    - name: snapshot
      type: integer
      description: Snapshot number (1-20), or 21 for previous state

- id: set_mute
  label: Set Mute
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel (1-4)
    - name: muted
      type: integer
      description: 1 = muted, 0 = unmuted

- id: set_gain
  label: Set Gain
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel (1-4)
    - name: reserved
      type: integer
      description: Must be 0
    - name: gain
      type: integer
      description: Gain in 10ths of dB (-990 to 150)

- id: set_delay
  label: Set Delay
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel (1-4)
    - name: reserved
      type: integer
      description: Must be 0
    - name: delay
      type: integer
      description: Delay in samples @96kHz (0-96000, max 200ms/19200 for LINUS5-C/10-C)

- id: set_fallback
  label: Set Fallback State
  kind: action
  params:
    - name: enabled
      type: integer
      description: 1 = enabled, 0 = disabled

- id: set_fallbackforce
  label: Force Fallback to Analog
  kind: action
  params: []

- id: set_fallbackrecover
  label: Recover from Fallback
  kind: action
  params: []

- id: set_power
  label: Set Power State
  kind: action
  params:
    - name: state
      type: integer
      description: 1 = ON, 0 = STANDBY
    - name: delay
      type: integer
      description: Time delay in seconds (0-30), only for power ON

- id: cleargroup
  label: Clear Group Parameters
  kind: action
  params: []
- id: get_act_snapshot
  label: Get Active Snapshot
  kind: query
  params: []

- id: get_mute
  label: Get Mute State
  kind: query
  params:
    - name: channel
      type: integer
      description: Channel (1-4)

- id: get_gain
  label: Get Gain
  kind: query
  params:
    - name: channel
      type: integer
      description: Channel (1-4)
    - name: reserved
      type: integer
      description: Must be 0

- id: get_delay
  label: Get Delay
  kind: query
  params:
    - name: channel
      type: integer
      description: Channel (1-4)
    - name: reserved
      type: integer
      description: Must be 0

- id: get_fallback
  label: Get Fallback State
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: devinfo
  type: object
  fields:
    - name: model
      type: string
    - name: mac
      type: string

- id: mute_state
  type: enum
  values: [0, 1]

- id: gain_value
  type: integer
  description: Gain in 10ths of dB

- id: delay_value
  type: integer
  description: Delay in samples @96kHz

- id: fallback_state
  type: enum
  values: [0, 1]

- id: active_snapshot
  type: object
  fields:
    - name: number
      type: integer
    - name: name
      type: string
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters beyond discrete actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented - device only responds to GET commands
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Note: only LINUS14/LINUS14D/LINUS12C/LINUS5-C/LINUS10-C support standby.
# LINUS10 and LINUS CON cannot be remotely controlled due to hardware design.
# UNRESOLVED: power sequencing safety not explicitly documented beyond delay param
```

## Notes
- Port 3000 stated in source
- Commands ASCII, prefixed with `*`, sent one per UDP datagram
- SET commands: no reply
- GET commands: reply to host IP (not broadcast)
- Broadcast support: device responds to own IP or subnet broadcast
- IP must be padded to 15 chars in CHANGEIP command
- Snapshot 1-20 supported; 21 recalls previous LINUS Control state
- Gain range: -990 to +150 (10ths of dB)
- Delay max: 96000 samples @96kHz; LINUS5-C/10-C capped at 200ms (19200)
- Power delay max: 30 seconds
- <!-- UNRESOLVED: full command set for LINUS6.4 requires separate v2.8 document not included here -->
- <!-- UNRESOLVED: firmware version not stated in source -->

## Provenance

```yaml
source_domains:
  - codaaudio.cn
source_urls:
  - https://www.codaaudio.cn/uploads/soft/LINUS_Control_v2.9.1_Third_Party_Control.pdf
retrieved_at: 2026-04-29T23:14:25.650Z
last_checked_at: 2026-04-27T14:40:22.749Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T14:40:22.749Z
matched_actions: 16
action_count: 16
confidence: high
summary: "All 16 spec actions matched verbatim to source commands with correct parameter ranges and transport verified on UDP port 3000."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
