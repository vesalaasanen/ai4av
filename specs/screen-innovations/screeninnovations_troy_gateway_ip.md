---
spec_id: admin/screeninnovations-troy-gateway
schema_version: ai4av-public-spec-v1
revision: 1
title: "Screen Innovations Troy Gateway Control Spec"
manufacturer: "Screen Innovations"
model_family: "Troy Gateway"
aliases: []
compatible_with:
  manufacturers:
    - "Screen Innovations"
  models:
    - "Troy Gateway"
    - "TRO.Y / 2"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.screeninnovations.com
source_urls:
  - "https://files.screeninnovations.com/Downloads/Programming%20Guides/Shade/troy-programming-guide.pdf"
retrieved_at: 2026-04-30T04:31:21.363Z
last_checked_at: 2026-10-07T12:55:02.731Z
generated_at: 2026-10-07T12:55:02.731Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device firmware version compatibility not stated in source"
  - "RS-485 bus node ID assignment and validation procedure not detailed in source"
  - "Telnet client connection persistence and keepalive behavior not documented"
  - "broadcast command response handling not documented"
  - "flow control not stated in source"
  - "Telnet client capture is documented as a UI procedure, not as an API action"
  - "explicit query commands and response format not stated in source"
  - "no settable parameters documented as discrete variables"
  - "event types and unsolicited event notifications are not documented in source"
  - "safety warnings and interlock procedures not found in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T12:55:02.731Z
  matched_actions: 8
  action_count: 8
  confidence: medium
  summary: "All 8 actions map to the HTTP CGI and keypad command list; transport values (port 23, troy.cgi, serial 4800-56K/8/N/1) are in the source. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# Screen Innovations Troy Gateway Control Spec

## Summary
The Troy Gateway (TRO.Y / 2) sends commands to RS485 devices over IP. The source documents HTTP CGI commands for motor UP, DOWN, and STOP; keypad commands for presets, percentage positioning, and target designation; Telnet client/server settings; and serial settings and pin assignments.

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
  port: 23  # Telnet server default stated in source
  base_url: "http://{ip}/troy.cgi"  # HTTP CGI path stated in source
serial:
  baud_rate: "4800-56K"  # stated: range 4800 to 56K baud
  data_bits: 8  # stated
  parity: none  # stated
  stop_bits: 1  # stated
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: UNRESOLVED  # Source mentions configurable Telnet usernames and passwords but does not establish authentication behavior or HTTP authentication
```

## Traits
```yaml
# powerable: UNRESOLVED - power on/off commands not found in source
# routable: preset and target designation commands are documented
# queryable: UNRESOLVED - no query command or response format is documented
# levelable: MOVE TO % command is documented
```

## Actions
```yaml
- id: move_up
  label: Move Up
  kind: action
  params:
    - name: node_id
      type: string
      description: 6-character alphanumeric RS485 node ID; some addresses are reserved
  http_path: "/troy.cgi?cmd=70&str1={node_id}&str2=up"

- id: move_down
  label: Move Down
  kind: action
  params:
    - name: node_id
      type: string
      description: 6-character alphanumeric RS485 node ID; some addresses are reserved
  http_path: "/troy.cgi?cmd=70&str1={node_id}&str2=down"

- id: move_stop
  label: Stop
  kind: action
  params:
    - name: node_id
      type: string
      description: 6-character alphanumeric RS485 node ID; some addresses are reserved
  http_path: "/troy.cgi?cmd=70&str1={node_id}&str2=stop"

- id: move_to_preset
  label: Move to Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: IP number specified in the command data field
    - name: target
      type: string
      description: Available motor or group target

- id: move_to_next_higher_preset
  label: Move to Next Higher Preset
  kind: action
  params:
    - name: target
      type: string
      description: Available motor or group target

- id: move_to_next_lower_preset
  label: Move to Next Lower Preset
  kind: action
  params:
    - name: target
      type: string
      description: Available motor or group target

- id: move_to_percent
  label: Move to Percentage
  kind: action
  params:
    - name: percent
      type: integer
      description: Target position as a percentage, specified in the command data field
    - name: target
      type: string
      description: Available motor or group target

- id: designate_target
  label: Designate Target
  kind: action
  params:
    - name: target
      type: string
      description: Motor or group to receive subsequent commands

# UNRESOLVED: Telnet client capture is documented as a UI procedure, not as an API action
```

## Feedbacks
```yaml
# UNRESOLVED: explicit query commands and response format not stated in source
# Source documents HTTP commands with str2=up/down/stop but no response format
# Telnet client capture returns captured command data; response format not documented
```

## Variables
```yaml
# UNRESOLVED: no settable parameters documented as discrete variables
# Source mentions configurable Telnet port, username/password, and IP settings; these are not documented as API variables
```

## Events
```yaml
# UNRESOLVED: event types and unsolicited event notifications are not documented in source
```

## Macros
```yaml
- id: scene_config
  label: Scene Configuration
  description: Scenes can contain up to eight selected commands, with available targets and delays, and are configured via the web UI
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety warnings and interlock procedures not found in source
# Source states that TROY must be restarted after Telnet settings changes
```

## Notes
Serial port data output (WHT/BLUE) is transmit (TX) from TRO.Y / 2 DCE on pin 5. Serial port data input (GRN) is receive (RX) to TRO.Y / 2 DCE on pin 6.

MAC addresses start with "70:B3:D5" for TRO.Y / 2 discovery. Device will not respond to static pings or ARP unless security bypass is activated via reset button with status LED flashing.

Telnet port defaults to 23. After changing Telnet settings, device restart is required. Telnet client and server settings include username and password fields; authentication behavior is not specified.

Special groups: FFFFFF (basic RS485 broadcast), FFFFF0 (all motors), FFFFF1 (RS485 motors only), FFFFF2 (RTS motors only), FFFFF3 (Zigbee motors only), FFFF00 (all ports), FFFF01 (port 1 capture only), FFFF02 (port 2 capture only), FFFF03 (port 3 capture only), FFFF04 (port 4 capture only).

IP address default (without DHCP): 169.254.169.254.

## Provenance

```yaml
source_domains:
  - files.screeninnovations.com
source_urls:
  - "https://files.screeninnovations.com/Downloads/Programming%20Guides/Shade/troy-programming-guide.pdf"
retrieved_at: 2026-04-30T04:31:21.363Z
last_checked_at: 2026-10-07T12:55:02.731Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:55:02.731Z
matched_actions: 8
action_count: 8
confidence: medium
summary: "All 8 actions map to the HTTP CGI and keypad command list; transport values (port 23, troy.cgi, serial 4800-56K/8/N/1) are in the source. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device firmware version compatibility not stated in source"
- "RS-485 bus node ID assignment and validation procedure not detailed in source"
- "Telnet client connection persistence and keepalive behavior not documented"
- "broadcast command response handling not documented"
- "flow control not stated in source"
- "Telnet client capture is documented as a UI procedure, not as an API action"
- "explicit query commands and response format not stated in source"
- "no settable parameters documented as discrete variables"
- "event types and unsolicited event notifications are not documented in source"
- "safety warnings and interlock procedures not found in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
