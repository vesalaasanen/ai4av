---
spec_id: admin/philips-electronics-smartlink-2-institutional-tv-na
schema_version: ai4av-public-spec-v1
revision: 1
title: "Philips Electronics Smartlink 2 Institutional Television Control Spec"
manufacturer: Philips
model_family: "PC9219 C125"
aliases: []
compatible_with:
  manufacturers:
    - Philips
    - "Philips Electronics"
  models:
    - "PC9219 C125"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.xibo.org.uk
source_urls:
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
retrieved_at: 2026-06-12T02:49:05.649Z
last_checked_at: 2026-06-12T19:32:46.281Z
generated_at: 2026-06-12T19:32:46.281Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "raw serial command strings are not documented — only Crestron module I/O signals are described"
  - "single control mode operation untested per source"
  - "no true device feedback exists — all feedback in the Crestron module is simulated"
  - "flow control not stated in source"
  - "no unsolicited notification events documented in source"
  - "no multi-step sequences documented in source"
  - "source does not document safety warnings, interlock procedures, or power-on sequencing"
  - "raw serial command byte format/strings not documented"
  - "protocol version not stated"
  - "flow control setting not stated"
  - "single control mode operation unverified"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:32:46.281Z
  matched_actions: 15
  action_count: 15
  confidence: medium
  summary: "All 15 spec actions matched cleanly to Crestron module signals; all transport parameters verified verbatim in source; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-14
---

# Philips Electronics Smartlink 2 Institutional Television Control Spec

## Summary
Philips Institutional Television (ITV) with NET1CCI card, controlled via the Smartlink 2 RS-232 serial interface through a Crestron SIMPLWindows module. Provides power, source selection, volume, mute, channel tuning, and control mode switching. This spec is derived from a Crestron module integration document; the raw serial command protocol between the Crestron controller and the NET1CCI card is not documented here.

<!-- UNRESOLVED: raw serial command strings are not documented — only Crestron module I/O signals are described -->
<!-- UNRESOLVED: single control mode operation untested per source -->
<!-- UNRESOLVED: no true device feedback exists — all feedback in the Crestron module is simulated -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 1200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from power on/off/toggle commands
  - routable     # inferred from input selection commands (antenna, aux, svideo, vga)
  - levelable    # inferred from volume up/down commands
  - queryable    # inferred from channel and volume feedback (simulated)
```

## Actions
```yaml
actions:
  - id: power_toggle
    label: Power Toggle
    kind: action
    params: []
    notes: Pulse to turn TV on or off

  - id: select_input
    label: Select Input
    kind: action
    params:
      - name: input
        type: enum
        values: [antenna, aux, svideo, vga]
        description: Input source to select
    notes: INPUT-* signal in Crestron module

  - id: channel_key
    label: Channel Key Entry
    kind: action
    params:
      - name: digit
        type: integer
        description: Digit 0-9 for direct channel entry
    notes: CHANNEL-KEY-0 through CHANNEL-KEY-9 and CLEAR

  - id: channel_enter
    label: Channel Enter
    kind: action
    params: []
    notes: Pulse to send the entered channel number to the TV

  - id: channel_up
    label: Channel Up
    kind: action
    params: []

  - id: channel_down
    label: Channel Down
    kind: action
    params: []

  - id: volume_up
    label: Volume Up
    kind: action
    params: []
    notes: Press and hold to ramp volume up

  - id: volume_down
    label: Volume Down
    kind: action
    params: []
    notes: Press and hold to ramp volume down

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

  - id: control_single
    label: Control Single Mode
    kind: action
    params: []
    notes: Single unit control mode - untested per source

  - id: control_dual
    label: Control Dual (Global) Mode
    kind: action
    params: []
    notes: Global control mode for all TVs in the same group

  - id: tune_cable
    label: Tune Cable Mode
    kind: action
    params: []

  - id: tune_broadcast
    label: Tune Broadcast Mode
    kind: action
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [on, off]
    notes: Simulated feedback - no true feedback from Philips system

  - id: input_state
    type: enum
    values: [antenna, aux, svideo, vga]
    notes: Simulated feedback

  - id: channel
    type: integer
    notes: Simulated analog value showing current channel

  - id: volume_level
    type: integer
    notes: Simulated analog value showing relative volume level

  - id: mute_state
    type: enum
    values: [on, off]
    notes: Simulated feedback

  - id: control_mode
    type: enum
    values: [single, dual]
    notes: Indicates control mode selected

  - id: tune_mode
    type: enum
    values: [cable, broadcast]
    notes: Indicates tuning mode selected
```

## Variables
```yaml
variables:
  - id: channel_upper_limit
    type: integer
    description: Maximum channel number +1 (e.g. enter 126 for 125 channels max)
    notes: CHANNEL-UPPER-LIMIT parameter in Crestron module
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlock procedures, or power-on sequencing
```

## Notes
- This spec is derived from a Crestron SIMPLWindows module document, not from raw Philips serial protocol documentation. The actual serial command strings sent between the Crestron controller and the NET1CCI card are not documented here.
- Crestron hardware required: CNXCOM or ST-COM serial port.
- Cable: CNSP-614.
- Vendor firmware tested: NET1CCI card Version 1.000 on Philips ITV model PC9219 C125.
- Single control mode is untested — only global (dual) control mode has been verified.
- All feedback signals are simulated by the Crestron module; the Philips system provides no true feedback.
- TV must be set to commercial mode and control mode to "Receive" via the IR remote "A" button menu. Groups must be enabled via the "D" button menu.

<!-- UNRESOLVED: raw serial command byte format/strings not documented -->
<!-- UNRESOLVED: protocol version not stated -->
<!-- UNRESOLVED: flow control setting not stated -->
<!-- UNRESOLVED: single control mode operation unverified -->

## Provenance

```yaml
source_domains:
  - community.xibo.org.uk
source_urls:
  - https://community.xibo.org.uk/uploads/short-url/vwVq2nPyhJKL4kTCYpa6VYhQUa8.pdf
retrieved_at: 2026-06-12T02:49:05.649Z
last_checked_at: 2026-06-12T19:32:46.281Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:32:46.281Z
matched_actions: 15
action_count: 15
confidence: medium
summary: "All 15 spec actions matched cleanly to Crestron module signals; all transport parameters verified verbatim in source; complete bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "raw serial command strings are not documented — only Crestron module I/O signals are described"
- "single control mode operation untested per source"
- "no true device feedback exists — all feedback in the Crestron module is simulated"
- "flow control not stated in source"
- "no unsolicited notification events documented in source"
- "no multi-step sequences documented in source"
- "source does not document safety warnings, interlock procedures, or power-on sequencing"
- "raw serial command byte format/strings not documented"
- "protocol version not stated"
- "flow control setting not stated"
- "single control mode operation unverified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
