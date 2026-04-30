---
schema_version: ai4av-public-spec-v1
device_id: symetrix/audio-symnet-north-america
entity_id: symetrix_audio_symnet_north_america
spec_id: admin/symetrix-audio-symnet
revision: 1
author: admin
title: "Symetrix Audio Symnet Control Spec"
status: published
manufacturer: Symetrix
manufacturer_key: symetrix
model_family: "Audio Symnet (North America)"
aliases: []
compatible_with:
  manufacturers:
    - Symetrix
  models:
    - "Audio Symnet (North America)"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: symetrix_audio_symnet_north_america.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T15:36:58.534Z
retrieved_at: 2026-04-27T15:36:58.534Z
last_checked_at: 2026-04-27T15:36:58.534Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T15:36:58.534Z
  matched_actions: 19
  action_count: 19
  confidence: high
  summary: "All 19 spec actions match source commands one-to-one with correct wire tokens, parameters, and transport (UDP port 48630)."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Symetrix Audio Symnet Control Spec

## Summary
Audio DSP matrix processor supporting Ethernet-based control via a text-based UDP protocol. Commands are ASCII strings sent to UDP port 48630. The protocol supports querying, setting, and pushing controller values for faders, buttons, meters, and other DSP parameters. This document describes the Jupiter 4/8/12 control protocol; specific Symnet model controller number maps are not included in this source.

<!-- UNRESOLVED: controller number maps for Symnet models not present in source; only generic Jupiter protocol described -->

## Transport
```yaml
protocols:
  - udp
addressing:
  port: 48630  # stated: "Commands should be sent to UDP port number 48630"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable       # GS, GSB, GSB2 commands return controller values
- routable        # input selectors controllable via CS command
- levelable       # faders (volume), meters readable
```

## Actions
```yaml
- id: controller_set
  label: Controller Set
  kind: action
  params:
    - name: controller_number
      type: integer
      description: Decimal controller number (1-10000)
    - name: controller_position
      type: integer
      description: 16-bit position value (0-65535)

- id: change_controller
  label: Change Controller
  kind: action
  params:
    - name: controller_number
      type: integer
      description: Decimal controller number (1-10000)
    - name: dec_inc
      type: integer
      description: 0 to decrement, 1 to increment
    - name: amount
      type: integer
      description: Amount to change (0-65535)

- id: load_preset
  label: Load Preset
  kind: action
  params:
    - name: preset_number
      type: integer
      description: Preset number (1-50)

- id: flash_unit
  label: Flash Unit
  kind: action
  params: []

- id: global_push_enable
  label: Global Push Enable/Disable
  kind: action
  params:
    - name: on_off
      type: integer
      description: 0=OFF, 1=ON
    - name: low
      type: integer
      description: Optional lowest controller number
    - name: high
      type: integer
      description: Optional highest controller number

- id: push_enable
  label: Push Enable
  kind: action
  params:
    - name: low
      type: integer
      description: Optional lowest controller number
    - name: high
      type: integer
      description: Optional highest controller number

- id: push_disable
  label: Push Disable
  kind: action
  params:
    - name: low
      type: integer
      description: Optional lowest controller number
    - name: high
      type: integer
      description: Optional highest controller number

- id: push_refresh
  label: Push Refresh
  kind: action
  params:
    - name: low
      type: integer
      description: Optional lowest controller number
    - name: high
      type: integer
      description: Optional highest controller number

- id: push_clear
  label: Push Clear
  kind: action
  params:
    - name: low
      type: integer
      description: Optional lowest controller number
    - name: high
      type: integer
      description: Optional highest controller number

- id: set_push_interval
  label: Set Push Interval
  kind: action
  params:
    - name: milliseconds
      type: integer
      description: Push interval in ms (20-30000)

- id: set_push_threshold
  label: Set Push Threshold
  kind: action
  params:
    - name: parameter_thresh
      type: integer
      description: Optional threshold for non-meter parameters (0-65535)
    - name: meter_thresh
      type: integer
      description: Optional threshold for meters (0-65535)

- id: set_quiet_mode
  label: Set Quiet Mode
  kind: action
  params:
    - name: on_off
      type: integer
      description: 0=OFF, 1=ON

- id: set_echo_mode
  label: Set Echo Mode
  kind: action
  params:
    - name: on_off
      type: integer
      description: 0=OFF, 1=ON
- id: get_controller
  label: Get Controller
  kind: query
  params:
    - name: controller_number
      type: integer
      description: Decimal controller number (1-10000)

- id: get_controller_with_number
  label: Get Controller with Controller Number
  kind: query
  params:
    - name: controller_number
      type: integer
      description: Decimal controller number (1-10000)

- id: get_controller_block
  label: Get Controller Block
  kind: query
  params:
    - name: controller_number
      type: integer
      description: Starting decimal controller number (1-10000)
    - name: block_size
      type: integer
      description: Number of consecutive controllers to return (1-256)

- id: get_controller_block_with_number
  label: Get Controller Block with Controller Number
  kind: query
  params:
    - name: controller_number
      type: integer
      description: Starting decimal controller number (1-10000)
    - name: block_size
      type: integer
      description: Number of consecutive controllers to return (1-256)

- id: get_preset
  label: Get Preset
  kind: query
  params: []

- id: get_push_enabled_controllers
  label: Get Push-enabled Controllers
  kind: query
  params:
    - name: low
      type: integer
      description: Optional lowest controller number to inquire about (1-10000)
    - name: high
      type: integer
      description: Optional highest controller number to inquire about (1-10000)
```

## Feedbacks
```yaml
- id: ack_response
  label: Acknowledgement
  type: string
  values:
    - "ACK"

- id: nak_response
  label: Negative Acknowledgement
  type: string
  values:
    - "NAK"

- id: controller_value
  label: Get Controller Response
  type: string
  description: Returns "<CONTROLLER NUMBER> <CONTROLLER POSITION>"

- id: controller_block_response
  label: Get Controller Block Response
  type: string
  description: Returns multiple lines of "<CONTROLLER POSITION><CR>"

- id: controller_block_with_number_response
  label: Get Controller Block with Number Response
  type: string
  description: Returns "#<CONTROLLER NUMBER>=<CONTROLLER POSITION><CR>" per controller

- id: preset_response
  label: Get Preset Response
  type: string
  description: Returns "PrstD=<PRESET NUMBER>"

- id: push_data
  label: Push Data
  type: string
  description: Unsolicited "#<CONTROLLER NUMBER>=<CONTROLLER POSITION><CR>" format
```

## Variables
```yaml
# Controller positions are read/writable via CS/GS commands; treated as actions above.
# No discrete settable parameters separate from controller numbers.
```

## Events
```yaml
- id: push_notification
  label: Push Notification
  type: string
  description: |
    Unsolicited controller value changes sent to originating IP/port.
    Format: "#<CONTROLLER NUMBER>=<CONTROLLER POSITION><CR>"
    Up to 64 controllers may be batched per push interval (default 100ms).
    Only sent after at least one command has been received from the controller.
```

## Macros
```yaml
# No explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Protocol is UDP-based (not TCP/Telnet), port 48630. Commands may include optional zero-termination.
- Response routing: device stores last received IP address and port in non-volatile memory.
- Default quiet mode ON, echo mode OFF — most commands assume quiet mode ON.
- Fader positions: 0 = minimum, 65535 = maximum. Volume formula: dB = MIN + (MAX-MIN)*(pos/65535).
- Meter reading formula: Level dBu = 72*(value/65535) - 48; 0 value = -48 dBu or less.
- Push interval default: 100ms, range 20-30000ms.
- Push threshold default: 1 (both parameters and meters).
- Controller numbers 1-10000 addressable.

<!-- UNRESOLVED: RS-485 control mentioned but no RS-485 protocol details; ARC devices referenced but not covered -->
<!-- UNRESOLVED: specific Symnet model controller number maps not in source; generic Jupiter mapping only -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: symetrix_audio_symnet_north_america.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T15:36:58.534Z
retrieved_at: 2026-04-27T15:36:58.534Z
last_checked_at: 2026-04-27T15:36:58.534Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T15:36:58.534Z
matched_actions: 19
action_count: 19
confidence: high
summary: "All 19 spec actions match source commands one-to-one with correct wire tokens, parameters, and transport (UDP port 48630)."
```

## Known Gaps

```yaml
[]
```
