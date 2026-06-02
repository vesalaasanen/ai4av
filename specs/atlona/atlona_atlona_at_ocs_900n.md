---
spec_id: admin/atlona-at-ocs-900n
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-OCS-900N Control Spec"
manufacturer: Atlona
model_family: AT-OCS-900N
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-OCS-900N
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-OCS-900N_API.pdf
retrieved_at: 2026-04-30T04:26:20.426Z
last_checked_at: 2026-06-02T21:40:03.401Z
generated_at: 2026-06-02T21:40:03.401Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "MQTT command/topic structure not covered in source document"
  - "firmware version compatibility range not stated"
  - "exact JSON payload structure of unsolicited UDP event messages not shown in source"
  - "no multi-step sequences documented in source"
  - "no additional safety warnings or interlock procedures stated in source"
  - "MQTT topic/payload schema not in source"
  - "Maximum number of concurrent WebSocket connections not stated"
  - "Rate limiting or command throttling behavior not stated"
  - "export_config / import_config / upgrade methods listed in method:help reply but not individually documented in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:40:03.401Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec action units (16 actions + 14 feedbacks with query_command) match verbatim source commands; transport parameters confirmed; source catalogue is exactly 30 commands. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Atlona AT-OCS-900N Control Spec

## Summary
The AT-OCS-900N is a networked occupancy, light, and temperature sensor. This spec covers the JSON-over-WebSocket (ws/wss) and JSON-over-TCP/UDP API (port 9000), including all get, set, and method commands for sensor data retrieval, LED control, and device configuration. MQTT is also supported on port 1883 but the MQTT command structure is not documented in the source.

<!-- UNRESOLVED: MQTT command/topic structure not covered in source document -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->

## Transport
```yaml
protocols:
  - tcp
  - udp
  - http  # WebSocket (ws/wss) - HTTP Upgrade
addressing:
  port: 9000  # TCP and UDP JSON API port
  base_url: "ws://[device-ip]/ws"  # TLS disabled; use wss://[device-ip]/ws when TLS enabled
  # WebSocket plain: port 80; WebSocket TLS (default): port 443
  # MQTT: port 1883 (protocol structure not documented in source)
auth:
  type: credentials  # username/password passed as JSON fields in each request
  # Example: {"get":"info","username":"admin","password":"<password>"}
  # Credentials configurable via set:user command
```

## Traits
```yaml
- queryable   # inferred from extensive get: command set returning sensor/device state
- levelable   # inferred from set:light sensitivity, set:temperature threshold, set:motion delay
```

## Actions
```yaml
- id: set_led
  label: Set LED
  kind: action
  params:
    - name: rgb
      type: string
      description: "Hex RGB color string (e.g. '98f542'). Optional."
    - name: center
      type: boolean
      description: Enable center LED ring
    - name: outer
      type: boolean
      description: Enable outer LED ring
    - name: auto
      type: boolean
      description: Auto LED mode (LED reflects motion state)
    - name: motionTrue
      type: string
      description: "Hex RGB color when motion detected (e.g. 'FF0000')"
    - name: motionFalse
      type: string
      description: "Hex RGB color when no motion (e.g. '000000')"
  command: '{ "set": { "name": "led", "config": { "outer": true, "auto": false, "motionTrue": "98f542", "motionFalse": "000000" } } }'

- id: set_motion
  label: Set Motion Sensor Config
  kind: action
  params:
    - name: delay
      type: integer
      description: Motion occupancy delay in seconds
  command: '{ "set": { "name": "motion", "config": { "delay": 5 } } }'

- id: set_light
  label: Set Light Sensor Config
  kind: action
  params:
    - name: sensitivity
      type: integer
      description: Light sensor sensitivity (1-10 scale implied)
    - name: threshold
      type: integer
      description: Light event threshold in ADC units
    - name: unit
      type: string
      description: "Threshold unit - always 'ADC' in source"
  command: '{ "set": { "name": "light", "config": { "sensitivity": 5, "events": { "threshold": 500 } } } }'

- id: set_temperature
  label: Set Temperature Sensor Config
  kind: action
  params:
    - name: unit
      type: string
      description: "Temperature event unit: 'F' or 'C'"
    - name: threshold
      type: number
      description: Temperature change threshold that triggers an event
  command: '{ "set": { "name": "temperature", "config": { "events": { "unit": "C", "threshold": 5 } } } }'

- id: set_sensors
  label: Set All Sensors Config
  kind: action
  params:
    - name: config
      type: object
      description: "JSON object with 'motion', 'light', and/or 'temperature' sub-objects"
  command: '{ "set": { "name": "sensors", "config": { "motion": { "delay": 5 }, "light": { "sensitivity": 5, "events": { "threshold": 500 } }, "temperature": { "events": { "unit": "C", "threshold": 5 } } } } }'

- id: set_network
  label: Set Network Settings
  kind: action
  params:
    - name: hostname
      type: string
      description: Device hostname
    - name: tls
      type: boolean
      description: Enable TLS (uses wss:// on port 443 when true)
    - name: dhcp
      type: boolean
      description: Use DHCP
    - name: ip
      type: string
      description: Static IP address
    - name: netmask
      type: string
      description: "Subnet mask (CIDR notation also accepted, e.g. '/24')"
    - name: gateway
      type: string
      description: Default gateway IP
    - name: primary_dns
      type: string
      description: Primary DNS server IP
    - name: secondary_dns
      type: string
      description: Secondary DNS server IP
  command: '{ "set": { "name": "network", "config": { "hostname": "sensor1", "tls": false, "ipSettings": { "dhcp": false, "ip": "192.168.1.254", "netmask": "/24", "gateway": "192.168.1.1", "dns": { "primary": "192.168.1.1", "secondary": "10.1.1.1" } } } } }'

- id: set_systemInfo
  label: Set System Info
  kind: action
  params:
    - name: name
      type: string
      description: Friendly device name
    - name: location
      type: string
      description: Device location label
  command: '{ "set": { "name": "systemInfo", "config": { "name": "sensor1", "location": "Executive Conference Room" } } }'

- id: set_user
  label: Set User Credentials
  kind: action
  params:
    - name: username
      type: string
      description: Username for API authentication
    - name: password
      type: string
      description: Password for API authentication
  command: '{ "set": { "name": "user", "config": { "username": "admin", "password": "Atlona" } } }'

- id: set_protocols
  label: Set Protocol Config
  kind: action
  params:
    - name: config
      type: object
      description: "Protocol configuration object (tcp, udp with subscriber list, ws)"
  command: '{ "set": { "name": "protocols", "config": { "udp": { "subscribers": { "1": { "enabled": true, "ip": "192.168.1.50", "port": 9000, "motion": true, "light": true, "temperature": true } } } } } }'

- id: set_info
  label: Set Aggregate Device Info
  kind: action
  params:
    - name: config
      type: object
      description: "Composite info object containing networkInfo and/or protocolInfo sub-objects"
  command: '{ "set": { "name": "info", "config": { "networkInfo": { "hostname": "sensor1", "tls": false, "ipSettings": { "dhcp": true } }, "protocolInfo": { "tcp": false } } } }'

- id: set_networkInfo
  label: Set Network Info
  kind: action
  params:
    - name: hostname
      type: string
      description: Device hostname
    - name: tls
      type: boolean
      description: Enable TLS (uses wss:// on port 443 when true)
    - name: dhcp
      type: boolean
      description: Use DHCP
    - name: ip
      type: string
      description: Static IP address
    - name: netmask
      type: string
      description: "Subnet mask (CIDR notation also accepted, e.g. '/24')"
    - name: gateway
      type: string
      description: Default gateway IP
    - name: primary_dns
      type: string
      description: Primary DNS server IP
    - name: secondary_dns
      type: string
      description: Secondary DNS server IP
  command: '{ "set": { "name": "networkInfo", "config": { "hostname": "sensor1", "tls": false, "ipSettings": { "dhcp": false, "ip": "192.168.1.254", "netmask": "/24", "gateway": "192.168.1.1", "dns": { "primary": "192.168.1.1", "secondary": "10.1.1.1" } } } } }'

- id: set_protocolInfo
  label: Set Protocol Info
  kind: action
  params:
    - name: tcp
      type: boolean
      description: Enable or disable TCP protocol support
    - name: udp
      type: boolean
      description: Enable or disable UDP protocol support
    - name: ws
      type: boolean
      description: Enable or disable WebSocket protocol support
    - name: mqtt
      type: boolean
      description: Enable or disable MQTT protocol support
  command: '{ "set": { "name": "protocolInfo", "config": { "tcp": false } } }'

- id: method_reboot
  label: Reboot
  kind: action
  params: []
  command: '{"method":"reboot"}'
  feedback: '{ "error": false, "reply": "Rebooting…" }'

- id: method_factory_default
  label: Factory Reset
  kind: action
  params: []
  command: '{"method":"factory_default"}'
  feedback: '{ "error": false, "reply": "Resetting to Factory Default and Rebooting…" }'

- id: method_identify
  label: Identify (Blink / Light Sensor Readout)
  kind: action
  params: []
  command: '{"method":"identify"}'

- id: method_help
  label: List Available Nodes
  kind: action
  params: []
  command: '{"method":"help"}'
```

## Feedbacks
```yaml
- id: device_info
  label: Device Info
  type: object
  query_command: '{"get":"deviceInfo"}'
  fields:
    - name: model
      type: string
    - name: hardwareRevision
      type: string
    - name: serialNumber
      type: string
    - name: firmwareVersion
      type: string
    - name: uptime
      type: string
      description: "Format: D:HH:MM:SS"

- id: hardware_info
  label: Hardware Info
  type: object
  query_command: '{"get":"hardwareInfo"}'
  fields:
    - name: sensors.motion.detected
      type: boolean
    - name: sensors.motion.lastDetection
      type: string
      description: "Time since last motion detection, format D:HH:MM:SS"
    - name: sensors.light.values.white
      type: integer
    - name: sensors.light.values.red
      type: integer
    - name: sensors.light.values.green
      type: integer
    - name: sensors.light.values.blue
      type: integer
    - name: sensors.temperature.values.ADC
      type: integer
    - name: sensors.temperature.values.F
      type: number
    - name: sensors.temperature.values.C
      type: number
    - name: led.rgb
      type: string
    - name: led.center
      type: boolean
    - name: led.outer
      type: boolean
    - name: led.auto
      type: boolean

- id: info_state
  label: Aggregate Info
  type: object
  query_command: '{"get":"info"}'
  fields:
    - name: deviceInfo
      type: object
      description: Aggregate device info object including model, hardwareRevision, serialNumber, firmwareVersion, and uptime
    - name: systemInfo
      type: object
      description: Aggregate system info object including name and location
    - name: networkInfo
      type: object
      description: Aggregate network info object including MAC address, hostname, TLS, and IP settings
    - name: protocolInfo
      type: object
      description: Aggregate protocol state object including tcp, udp, ws, and mqtt flags

- id: motion_state
  label: Motion Sensor State
  type: object
  query_command: '{"get":"motion"}'
  fields:
    - name: detected
      type: boolean
      description: True if motion is currently detected
    - name: lastDetection
      type: string
      description: "Time since last detection, format D:HH:MM:SS"
    - name: activeDelay
      type: integer
      description: Active occupancy delay in seconds
    - name: noDelay
      type: integer
      description: No-occupancy delay in seconds

- id: light_state
  label: Light Sensor State
  type: object
  query_command: '{"get":"light"}'
  fields:
    - name: values.white
      type: integer
      description: White channel ADC value
    - name: values.red
      type: integer
    - name: values.green
      type: integer
    - name: values.blue
      type: integer
    - name: sensitivity
      type: integer
    - name: events.unit
      type: string
    - name: events.threshold
      type: integer

- id: temperature_state
  label: Temperature Sensor State
  type: object
  query_command: '{"get":"temperature"}'
  fields:
    - name: values.ADC
      type: integer
      description: Raw ADC reading (or string "Stabilizing" on startup)
    - name: values.F
      type: number
      description: Temperature in Fahrenheit
    - name: values.C
      type: number
      description: Temperature in Celsius
    - name: events.unit
      type: string
      description: "Event threshold unit: 'F' or 'C'"
    - name: events.threshold
      type: number

- id: led_state
  label: LED State
  type: object
  query_command: '{"get":"led"}'
  fields:
    - name: rgb
      type: string
      description: Current LED hex RGB color
    - name: center
      type: boolean
    - name: outer
      type: boolean
    - name: auto
      type: boolean
    - name: motionTrue
      type: string
    - name: motionFalse
      type: string

- id: network_state
  label: Network Settings
  type: object
  query_command: '{"get":"network"}'
  fields:
    - name: macAddress
      type: string
    - name: hostname
      type: string
    - name: tls
      type: boolean
    - name: ipSettings.dhcp
      type: boolean
    - name: ipSettings.ip
      type: string
    - name: ipSettings.netmask
      type: string
    - name: ipSettings.gateway
      type: string

- id: network_info_state
  label: Network Info
  type: object
  query_command: '{"get":"networkInfo"}'
  fields:
    - name: macAddress
      type: string
    - name: hostname
      type: string
    - name: tls
      type: boolean
    - name: ipSettings.dhcp
      type: boolean
    - name: ipSettings.ip
      type: string
    - name: ipSettings.netmask
      type: string
    - name: ipSettings.gateway
      type: string
    - name: ipSettings.dns.primary
      type: string
    - name: ipSettings.dns.secondary
      type: string

- id: protocol_info
  label: Active Protocol State
  type: object
  query_command: '{"get":"protocolInfo"}'
  fields:
    - name: tcp
      type: boolean
    - name: udp
      type: boolean
    - name: ws
      type: boolean
    - name: mqtt
      type: boolean

- id: protocols_state
  label: Protocol Configuration
  type: object
  query_command: '{"get":"protocols"}'
  fields:
    - name: tcp.enabled
      type: boolean
    - name: tcp.port
      type: integer
    - name: udp.enabled
      type: boolean
    - name: udp.port
      type: integer
    - name: udp.subscribers
      type: object
      description: Subscriber map keyed by slot number, each with enabled/ip/port and motion/light/temperature flags
    - name: ws.enabled
      type: boolean
    - name: ws.port
      type: integer

- id: sensors_state
  label: All Sensors State
  type: object
  query_command: '{"get":"sensors"}'
  fields:
    - name: motion.detected
      type: boolean
    - name: motion.lastDetection
      type: string
      description: "Time since last motion detection, format D:HH:MM:SS"
    - name: motion.activeDelay
      type: integer
    - name: motion.noDelay
      type: integer
    - name: light.values.white
      type: integer
    - name: light.values.red
      type: integer
    - name: light.values.green
      type: integer
    - name: light.values.blue
      type: integer
    - name: light.sensitivity
      type: integer
    - name: light.events.unit
      type: string
    - name: light.events.threshold
      type: integer
    - name: temperature.values.ADC
      type: integer
      description: Raw ADC reading (or string "Stabilizing" on startup)
    - name: temperature.values.F
      type: number
    - name: temperature.values.C
      type: number
    - name: temperature.events.unit
      type: string
    - name: temperature.events.threshold
      type: number

- id: system_info
  label: System Info
  type: object
  query_command: '{"get":"systemInfo"}'
  fields:
    - name: name
      type: string
    - name: location
      type: string

- id: user_info
  label: User Account Info
  type: object
  query_command: '{"get":"user"}'
  fields:
    - name: username
      type: string
    - name: passwordHash
      type: string
      description: "Always 'N/A' in source examples"

- id: error_flag
  label: Command Error Flag
  type: boolean
  description: >
    Every reply includes an "error" field. If true, the request failed.
    If the command is malformed or fails, the device replies with "Invalid command".
```

## Variables
```yaml
- id: motion_delay
  label: Motion Occupancy Delay
  type: integer
  description: Seconds before occupied→unoccupied transition is declared
  set_command_template: '{ "set": { "name": "motion", "config": { "delay": {value} } } }'

- id: light_sensitivity
  label: Light Sensor Sensitivity
  type: integer
  description: Sensitivity level for light sensor
  set_command_template: '{ "set": { "name": "light", "config": { "sensitivity": {value} } } }'

- id: light_threshold
  label: Light Event Threshold (ADC)
  type: integer
  set_command_template: '{ "set": { "name": "light", "config": { "events": { "threshold": {value} } } } }'

- id: temperature_threshold
  label: Temperature Event Threshold
  type: number
  set_command_template: '{ "set": { "name": "temperature", "config": { "events": { "threshold": {value} } } } }'

- id: temperature_unit
  label: Temperature Event Unit
  type: enum
  values: [F, C]
  set_command_template: '{ "set": { "name": "temperature", "config": { "events": { "unit": "{value}" } } } }'
```

## Events
```yaml
# The device supports UDP push subscriptions for unsolicited sensor events.
# Up to 2 UDP subscribers can be registered (subscriber keys "1" and "2").
# Each subscriber can independently subscribe to motion, light, and/or temperature events.
# Configure via set:protocols - example:
# { "set": { "name": "protocols", "config": { "udp": { "subscribers": {
#   "1": { "enabled": true, "ip": "192.168.1.50", "port": 9000,
#          "motion": true, "light": true, "temperature": true } } } } } }
# UNRESOLVED: exact JSON payload structure of unsolicited UDP event messages not shown in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for:
  - method_factory_default  # irreversible - resets all config and reboots
  - method_reboot           # causes device downtime
interlocks: []
# UNRESOLVED: no additional safety warnings or interlock procedures stated in source
```

## Notes
- All commands are JSON objects, terminated with a carriage return. Commands are case-sensitive.
- Every response from the device includes an `"error"` boolean field. `true` = request failed.
- Requests may include an optional `"id"` field (arbitrary string) for async correlation; the device echoes it in the reply unchanged.
- Asynchronous use is not supported for `method:` requests.
- TLS is enabled by default. When TLS is enabled, WebSocket connects on port 443 (`wss://`); when disabled, port 80 (`ws://`). TCP/UDP JSON API is always on port 9000.
- MQTT is supported on port 1883 (default disabled per `get:protocolInfo` example). The MQTT topic/payload structure is not documented in the source.
- The `id` field in async requests can be any value; uniqueness across concurrent requests is the client's responsibility.
- On startup, temperature sensor may report `"ADC": "Stabilizing"` / `"F": "Stabilizing"` / `"C": "Stabilizing"` before the sensor is ready.
- The `set:networkInfo` and `set:network` nodes appear to be aliases for the same operation based on source examples.
- `method:identify` returns a stream of light sensor readings (the reply stream is truncated in source).

<!-- UNRESOLVED: MQTT topic/payload schema not in source -->
<!-- UNRESOLVED: Maximum number of concurrent WebSocket connections not stated -->
<!-- UNRESOLVED: Rate limiting or command throttling behavior not stated -->
<!-- UNRESOLVED: export_config / import_config / upgrade methods listed in method:help reply but not individually documented in source -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-OCS-900N_API.pdf
retrieved_at: 2026-04-30T04:26:20.426Z
last_checked_at: 2026-06-02T21:40:03.401Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:40:03.401Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec action units (16 actions + 14 feedbacks with query_command) match verbatim source commands; transport parameters confirmed; source catalogue is exactly 30 commands. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "MQTT command/topic structure not covered in source document"
- "firmware version compatibility range not stated"
- "exact JSON payload structure of unsolicited UDP event messages not shown in source"
- "no multi-step sequences documented in source"
- "no additional safety warnings or interlock procedures stated in source"
- "MQTT topic/payload schema not in source"
- "Maximum number of concurrent WebSocket connections not stated"
- "Rate limiting or command throttling behavior not stated"
- "export_config / import_config / upgrade methods listed in method:help reply but not individually documented in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
