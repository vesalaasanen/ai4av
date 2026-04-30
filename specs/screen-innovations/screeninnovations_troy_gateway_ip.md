---
schema_version: ai4av-public-spec-v1
device_id: screen-innovations/troy-gateway
entity_id: screeninnovations_troy_gateway
spec_id: admin/screeninnovations-troy-gateway
revision: 1
author: admin
title: "Screen Innovations Troy Gateway Control Spec"
status: published
manufacturer: "Screen Innovations"
manufacturer_key: screen-innovations
model_family: "Troy Gateway"
aliases: []
compatible_with:
  manufacturers:
    - "Screen Innovations"
  models:
    - "Troy Gateway"
    - "TRO.Y / 2"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: screeninnovations_troy_gateway_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:50:03.475Z
retrieved_at: 2026-04-25T21:50:03.475Z
last_checked_at: 2026-04-25T21:50:03.475Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:50:03.475Z
  matched_actions: 9
  action_count: 9
  confidence: low
  summary: "All 9 spec actions found verbatim in source; transport parameters verified"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# Screen Innovations Troy Gateway Control Spec

## Summary
The Troy Gateway (TRO.Y / 2) is a network-to-RS485 bridge device enabling IP control of motors and RS485 devices. Supports HTTP CGI commands, Telnet client/server, and direct serial RS-232/RS-485 communication. Motor control commands include UP, DOWN, STOP, and preset positioning.

<!-- UNRESOLVED: device firmware version compatibility not stated in source -->
<!-- UNRESOLVED: RS-485 bus node ID assignment and validation procedure not detailed in source -->
<!-- UNRESOLVED: Telnet client connection persistence and keepalive behavior not documented -->
<!-- UNRESOLVED: broadcast command response handling not documented -->

## Transport
```yaml
protocols:
  - http
  - tcp
  - serial
addressing:
  port: 23  # Telnet default; stated in source
  base_url: "http://{ip}/troy.cgi?cmd=70"  # HTTP CGI endpoint stated in source
serial:
  baud_rate: "4800-56K"  # stated: range 4800 to 56K baud
  data_bits: 8  # stated
  parity: none  # stated
  stop_bits: 1  # stated
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: null  # UNRESOLVED: Telnet username/password mentioned but credentials not stated; HTTP has no auth
```

## Traits
```yaml
# powerable: UNRESOLVED — power on/off commands not found in source
# routable: presets and target designation commands present
# queryable: Telnet client capture and command acknowledgment implied
# levelable: MOVE TO % command present
```

## Actions
```yaml
- id: move_up
  label: Move Up
  kind: action
  params:
    - name: node_id
      type: string
      description: 6-character alphanumeric RS485 node ID
    - name: target
      type: string
      description: Target motor or group ID
  http_path: "/troy.cgi?cmd=70&str1={node_id}&str2=up"

- id: move_down
  label: Move Down
  kind: action
  params:
    - name: node_id
      type: string
      description: 6-character alphanumeric RS485 node ID
    - name: target
      type: string
      description: Target motor or group ID
  http_path: "/troy.cgi?cmd=70&str1={node_id}&str2=down"

- id: move_stop
  label: Stop
  kind: action
  params:
    - name: node_id
      type: string
      description: 6-character alphanumeric RS485 node ID
    - name: target
      type: string
      description: Target motor or group ID
  http_path: "/troy.cgi?cmd=70&str1={node_id}&str2=stop"

- id: move_to_preset
  label: Move to Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (IP-based)
    - name: target
      type: string
      description: Target motor or group ID

- id: move_to_next_higher_preset
  label: Move to Next Higher Preset
  kind: action
  params:
    - name: target
      type: string
      description: Target motor or group ID

- id: move_to_next_lower_preset
  label: Move to Next Lower Preset
  kind: action
  params:
    - name: target
      type: string
      description: Target motor or group ID

- id: move_to_percent
  label: Move to Percentage
  kind: action
  params:
    - name: percent
      type: integer
      description: Target position as a percentage (0-100)
    - name: target
      type: string
      description: Target motor or group ID

- id: designate_target
  label: Designate Target
  kind: action
  params:
    - name: target
      type: string
      description: Motor or group to receive subsequent commands

- id: trigger_scene
  label: Trigger Scene
  kind: action
  params:
    - name: scene_index
      type: integer
      description: Scene number (up to 8 commands per scene)
    - name: delay_ms
      type: integer
      description: Delay before execution in milliseconds

# UNRESOLVED: Telnet client capture action — "click capture button" procedure not fully documented as API
# UNRESOLVED: DESIGNATE TARGET command syntax not fully detailed
```

## Feedbacks
```yaml
# UNRESOLVED: explicit query commands and response format not stated in source
# Source shows HTTP commands with str2=up/down/stop; response format not documented
# Telnet client capture returns captured command data; response format not documented
```

## Variables
```yaml
# UNRESOLVED: no settable parameters documented as discrete variables
# Source mentions configurable Telnet port, username/password, IP settings — not exposed as API variables
```

## Events
```yaml
# UNRESOLVED: unsolicited event notifications not documented in source
```

## Macros
```yaml
- id: scene_config
  label: Scene Configuration
  description: Up to 8 commands per scene, configurable via web UI
  steps:
    - action: move_up
    - action: move_down
    - action: move_stop
    - action: move_to_preset
    - action: trigger_scene
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety warnings and interlock procedures not found in source
# Note: source states "you will need to restart TROY for the changes to take effect" after Telnet config changes
```

## Notes
Serial port data output (WHT/BLUE) is transmit (TX) from TRO.Y / 2 DCE on pin 5. Serial port data input (GRN) is receive (RX) to TRO.Y / 2 DCE on pin 6.

MAC addresses start with "70:B3:D5" for TRO.Y / 2 discovery. Device will not respond to static pings or ARP unless security bypass activated via reset button with status LED flashing.

Telnet port defaults to 23. After changing Telnet settings, device restart required.

Special broadcast addresses: FFFFFF (basic RS485 broadcast), FFFFF0 (all motors), FFFFF1 (RS485 only), FFFFF2 (RTS only), FFFFF3 (Zigbee only), FFFF00–FFFF04 (port-specific capture).

IP address default (without DHCP): 169.254.169.254.

## Provenance

```yaml
source_urls: []
source_documents:
  - title: screeninnovations_troy_gateway_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:50:03.475Z
retrieved_at: 2026-04-25T21:50:03.475Z
last_checked_at: 2026-04-25T21:50:03.475Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:50:03.475Z
matched_actions: 9
action_count: 9
confidence: low
summary: "All 9 spec actions found verbatim in source; transport parameters verified"
```

## Known Gaps

```yaml
[]
```
