---
spec_id: admin/tasmota-smart-plug-controller
schema_version: ai4av-public-spec-v1
revision: 1
title: "Tasmota Smart Plug Controller Control Spec"
manufacturer: Tasmota
model_family: "Tasmota Smart Plug Controller"
aliases: []
compatible_with:
  manufacturers:
    - Tasmota
  models:
    - "Tasmota Smart Plug Controller"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - tasmota.github.io
source_urls:
  - https://tasmota.github.io/docs/Commands/
  - https://tasmota.github.io/docs/MQTT/
  - https://tasmota.github.io/docs/
retrieved_at: 2026-05-22T20:58:49.428Z
last_checked_at: 2026-06-10T03:17:41.479Z
generated_at: 2026-06-10T03:17:41.479Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "MQTT port not stated in source"
  - "configurable via SerialConfig, default not explicitly stated"
  - "Tasmota publishes telemetry (tele/%topic%/STATE, tele/%topic%/SENSOR) periodically"
  - "Backlog supports multi-command sequences but no named macros documented in source."
  - "MQTT default port not stated in source"
  - "Serial default data_bits/parity/stop_bits not explicitly stated (SerialConfig is configurable)"
  - "Firmware version compatibility not stated"
  - "Full telemetry/event JSON schema not documented in this source"
verification:
  verdict: verified
  checked_at: 2026-06-10T03:17:41.479Z
  matched_actions: 121
  action_count: 121
  confidence: medium
  summary: "All 121 spec actions matched source commands at spec granularity; Power variants expanded by spec are all documented in source; parameterized families collapsed by spec are represented one-to-one. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Tasmota Smart Plug Controller Control Spec

## Summary
Tasmota open-source firmware for ESP8266/ESP32-based smart plugs and relay modules. Control via HTTP web requests (`/cm?cmnd=`), MQTT over TCP (topic `cmnd/%topic%/<command>`), and serial bridge at 115200 bps. Supports power on/off/toggle, pulse timers, interlock groups, backlog command sequencing, and telemetry.

## Transport
```yaml
protocols:
  - http
  - tcp
  - serial
addressing:
  base_url: "http://{host}/cm"
  port: null  # UNRESOLVED: MQTT port not stated in source
serial:
  baud_rate: 115200
  data_bits: null  # UNRESOLVED: configurable via SerialConfig, default not explicitly stated
  parity: null  # UNRESOLVED
  stop_bits: null  # UNRESOLVED
auth:
  type: optional  # Web password optional; when set, pass ?user=<username>&password=<password> in HTTP URL. MQTT uses MqttUser/MqttPassword.
```

## Traits
```yaml
traits:
  - powerable    # inferred from Power on/off/toggle commands
  - queryable    # inferred from Status/State query commands
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    description: "Turn on relay output. Power<x> 1 or Power<x> on or Power<x> true"
    params:
      - name: index
        type: integer
        description: "Relay index (1-based). Omit for first relay."

  - id: power_off
    label: Power Off
    kind: action
    description: "Turn off relay output. Power<x> 0 or Power<x> off or Power<x> false"
    params:
      - name: index
        type: integer
        description: "Relay index (1-based). Omit for first relay."

  - id: power_toggle
    label: Power Toggle
    kind: action
    description: "Toggle relay output. Power<x> 2 or Power<x> toggle"
    params:
      - name: index
        type: integer
        description: "Relay index (1-based). Omit for first relay."

  - id: power_blink
    label: Power Blink
    kind: action
    description: "Blink relay for BlinkCount times each BlinkTime duration. Power<x> 3 or Power<x> blink"
    params:
      - name: index
        type: integer
        description: "Relay index (1-based). Omit for first relay."

  - id: power_blink_off
    label: Stop Blink
    kind: action
    description: "Stop blink sequence and restore pre-blink state. Power<x> 4 or Power<x> blinkoff"
    params:
      - name: index
        type: integer
        description: "Relay index (1-based). Omit for first relay."

  - id: power_all_on
    label: All Power On
    kind: action
    description: "Turn ON all power outputs simultaneously. Power0 1"

  - id: power_all_off
    label: All Power Off
    kind: action
    description: "Turn OFF all power outputs simultaneously. Power0 0"

  - id: power_all_toggle
    label: All Power Toggle
    kind: action
    description: "Toggle all power outputs simultaneously. Power0 2"

  - id: set_power_on_state
    label: Set Power-On State
    kind: action
    description: "Control power state when device is powered up"
    params:
      - name: mode
        type: integer
        description: "0=OFF, 1=ON, 2=TOGGLE, 3=last saved state (default), 4=ON locked, 5=ON after PulseTime"

  - id: set_pulse_time
    label: Set Pulse Time
    kind: action
    description: "Set auto-off timer for relay. After Power ON, relay turns off after this duration."
    params:
      - name: index
        type: integer
        description: "Relay index (1-based)"
      - name: value
        type: integer
        description: "0=disable, 1..111=in 0.1s increments, 112..64900=offset by 100 in 1s increments"

  - id: timed_power
    label: Timed Power
    kind: action
    description: "Execute Power action then invert after specified milliseconds"
    params:
      - name: index
        type: integer
        description: "Relay index (1-based)"
      - name: action
        type: integer
        description: "0=OFF, 1=ON, 2=TOGGLE, 3=BLINK"
      - name: duration_ms
        type: integer
        description: "Duration in milliseconds (50ms granularity)"

  - id: set_blink_count
    label: Set Blink Count
    kind: action
    description: "Number of relay toggles during blink"
    params:
      - name: count
        type: integer
        description: "0=many times, 1..32000=number of blinks (default 10)"

  - id: set_blink_time
    label: Set Blink Time
    kind: action
    description: "Duration of each blink toggle in 0.1s increments"
    params:
      - name: value
        type: integer
        description: "2..3600 in 0.1s increments"

  - id: set_interlock
    label: Set Interlock
    kind: action
    description: "Configure relay interlock groups"
    params:
      - name: config
        type: string
        description: "0=disable, 1=enable with groups e.g. '1,2 3,4'"

  - id: backlog
    label: Backlog
    kind: action
    description: "Execute up to 30 consecutive commands separated by semicolons"
    params:
      - name: commands
        type: string
        description: "Semicolon-separated list of commands"

  - id: delay
    label: Delay
    kind: action
    description: "Set delay between backlog commands in 0.1s increments"
    params:
      - name: value
        type: integer
        description: "2..3600 in 0.1s increments, -1=next second tick"

  - id: restart
    label: Restart
    kind: action
    description: "Restart device"
    params:
      - name: mode
        type: integer
        description: "1=restart with config save, 2=halt, 3=safeboot (ESP32), 9=save+deepsleep"

  - id: status
    label: Status
    kind: action
    description: "Query device status information"
    params:
      - name: type
        type: integer
        description: "0=all, 1=device params, 2=firmware, 3=logging, 4=memory, 5=network, 6=MQTT, 7=time, 9=power thresholds, 10=sensors, 11=telemetry"

  - id: state
    label: State
    kind: action
    description: "Display current device state and publish to result topic"

  - id: set_deep_sleep
    label: Set Deep Sleep
    kind: action
    description: "Configure deep sleep mode"
    params:
      - name: seconds
        type: integer
        description: "0=disable, 11..86400=sleep period in seconds"

  - id: set_power_lock
    label: Set Power Lock
    kind: action
    description: "Lock/unlock power state to prevent changes"
    params:
      - name: index
        type: integer
        description: "Relay index. 0=lock/unlock ALL"
      - name: state
        type: integer
        description: "0=unlocked, 1=locked"
  - id: backlog0
    label: Backlog Immediate
    kind: action
    description: "Execute commands without any delay in sequence, separated by ;"
    params:
      - name: commands
        type: string
        description: "Semicolon-separated list of commands to execute without delay"

  - id: backlog2
    label: Backlog Silent Immediate
    kind: action
    description: "Like Backlog0 but without result published, same as prefixing all commands with _"
    params:
      - name: commands
        type: string
        description: "Semicolon-separated list of commands to execute silently without delay"

  - id: backlog3
    label: Backlog Silent
    kind: action
    description: "Like Backlog but without result published, same as prefixing all commands with _"
    params:
      - name: commands
        type: string
        description: "Semicolon-separated list of commands to execute silently"

  - id: no_delay
    label: No Delay
    kind: action
    description: "Omit SetOption34 inter-command delay for the command immediately following in a backlog sequence"

  - id: reset
    label: Reset
    kind: action
    description: "Reset device settings to firmware defaults and restart"
    params:
      - name: mode
        type: integer
        description: "1=reset settings and restart, 2=erase flash and reset, 3=erase System Parameter Area and restart, 4=reset but retain Wi-Fi and restart, 5=erase all flash keep Wi-Fi and restart, 6=erase all flash keep Wi-Fi and MQTT and restart, 99=reset bootcount to zero"

  - id: save_data
    label: Save Data
    kind: action
    description: "Control frequency of parameter changes saved to flash"
    params:
      - name: value
        type: integer
        description: "0=save only manually, 1=save every second (default), 2..3600=save every x seconds"

  - id: serial_log
    label: Serial Log
    kind: action
    description: "Disable hardware serial bridge and configure serial logging level"
    params:
      - name: level
        type: integer
        description: "0=disable serial logging, 1=errors only, 2=error and info (default), 3=error info and debug, 4=error info and more debug"

  - id: sleep
    label: Sleep
    kind: action
    description: "Configure device sleep duration in milliseconds for energy saving"
    params:
      - name: value
        type: integer
        description: "0=turn sleep off, 1..250=set sleep duration in milliseconds (default=50)"

  - id: status0
    label: Status0
    kind: query
    description: "Show all status information in a single line"

  - id: template
    label: Template
    kind: action
    description: "Show or configure device template"
    params:
      - name: value
        type: string
        description: "0=create from active module, x=create from supported module, 255=merge module and template settings, JSON payload=store template. Does not activate; use Module 0 to activate."

  - id: module
    label: Module
    kind: action
    description: "Display active module by name and index or switch to a different module and restart"
    params:
      - name: value
        type: integer
        description: "0=switch to defined template and restart, value=switch to module value and restart"

  - id: module2
    label: Module2
    kind: action
    description: "Display or set fast reboot fallback module by name and index"
    params:
      - name: value
        type: integer
        description: "0=set fast reboot fallback to defined template, value=set fast reboot fallback module to value"

  - id: gpios
    label: GPIOs
    kind: query
    description: "Show list of available GPIO components by name and index"
    params:
      - name: value
        type: string
        description: "255 or All = show list of all components by name and index"

  - id: gpio
    label: GPIO
    kind: query
    description: "Show current component assignments of the Module configurable GPIO"
    params:
      - name: value
        type: string
        description: "255 or All = show component assignments for all device available GPIO"

  - id: gpio_assign
    label: GPIO Assign
    kind: action
    description: "Assign a component to a configurable GPIO pin"
    params:
      - name: index
        type: integer
        description: "GPIO pin number (x in GPIO<x>)"
      - name: component
        type: string
        description: "Component to assign to the GPIO pin"

  - id: gpio_read
    label: GPIO Read
    kind: query
    description: "Perform a digitalRead on a configured GPIO to show input state"
    params:
      - name: index
        type: integer
        description: "GPIO pin number (x in GPIORead<x>)"

  - id: friendly_name
    label: Friendly Name
    kind: action
    description: "Set device friendly name displayed in webUI"
    params:
      - name: index
        type: integer
        description: "Name index (x in FriendlyName<x>). Omit for first."
      - name: value
        type: string
        description: "1=reset to firmware default, value=set friendly name (32 char limit)"

  - id: device_name
    label: Device Name
    kind: action
    description: "Set device name displayed in webUI and used for HA autodiscovery"
    params:
      - name: value
        type: string
        description: "Set device name (default = FriendlyName1 value)"

  - id: hostname
    label: Hostname
    kind: action
    description: "Set device hostname and restart"
    params:
      - name: value
        type: string
        description: "1=reset to MQTT_TOPIC-4digits and restart, value=set hostname (32 char limit) and restart"

  - id: ip_address
    label: IP Address
    kind: action
    description: "Configure device network IP addresses (follow with Restart 1 to apply)"
    params:
      - name: index
        type: integer
        description: "1=device IP address, 2=gateway IP address, 3=subnet mask, 4=DNS server, 5=secondary DNS server"
      - name: value
        type: string
        description: "0.0.0.0=use dynamic IP (DHCP), XXX.XXX.XXX.XXX=set static IP address"

  - id: wifi
    label: Wi-Fi
    kind: action
    description: "Enable or disable Wi-Fi"
    params:
      - name: value
        type: integer
        description: "0=disable Wi-Fi, 1=enable Wi-Fi (default)"

  - id: wifi_config
    label: Wi-Fi Config
    kind: action
    description: "Configure Wi-Fi connection method"
    params:
      - name: value
        type: integer
        description: "0=disable Wi-Fi Manager and reboot, 2=start Wi-Fi Manager at 192.168.4.1 for 3 min, 4=retry other AP without reboot (default), 5=wait for AP without reboot, 6=serial console config only, 7=Wi-Fi Manager restricted to reset settings only"

  - id: wifi_power
    label: Wi-Fi Power
    kind: action
    description: "Set Wi-Fi transmit power level in dBm"
    params:
      - name: value
        type: number
        description: "0=dynamic power based on RSSI, 1=restore default Wi-Fi power, value=set power level in dBm (default=17)"

  - id: wifi_scan
    label: Wi-Fi Scan
    kind: action
    description: "Start a Wi-Fi network scan; results sent as JSON payload"
    params:
      - name: value
        type: integer
        description: "1=start a network scan"

  - id: wifi_test
    label: Wi-Fi Test
    kind: action
    description: "Test Wi-Fi SSID and Password credentials (only available in AP mode)"
    params:
      - name: index
        type: integer
        description: "0=test and save to slot 1 and restart, 1=test and save to slot 1 no restart, 2=test and save to slot 2 no restart, 3=test without storing"
      - name: credentials
        type: string
        description: "ssid+password for testing where + is the separator (not allowed in SSID names)"

  - id: ssid
    label: SSID
    kind: action
    description: "Set Wi-Fi Access Point SSID for AP slot 1 or 2"
    params:
      - name: index
        type: integer
        description: "AP index: 1 or 2"
      - name: value
        type: string
        description: "0=clear SSID and restart, 1=reset to firmware default and restart, value=set Wi-Fi SSID and restart (max 32 chars)"

  - id: password
    label: Password
    kind: action
    description: "Set Wi-Fi Access Point password for AP slot 1 or 2"
    params:
      - name: index
        type: integer
        description: "AP index: 1 or 2"
      - name: value
        type: string
        description: "1=reset to firmware default and restart, value=set Wi-Fi password and restart (max 64 chars)"

  - id: ap
    label: Access Point Select
    kind: action
    description: "Switch between configured Wi-Fi Access Points"
    params:
      - name: value
        type: integer
        description: "0=switch to other AP, 1=select AP1, 2=select AP2"

  - id: mqtt_host
    label: MQTT Host
    kind: action
    description: "Set MQTT broker host address and restart"
    params:
      - name: value
        type: string
        description: "0=clear host field and allow mDNS to find MQTT host, 1=reset to firmware default and restart, value=set MQTT host and restart"

  - id: mqtt_port
    label: MQTT Port
    kind: action
    description: "Set MQTT broker port and restart"
    params:
      - name: value
        type: integer
        description: "1=reset to firmware default and restart, value=set MQTT port 2..32766 and restart"

  - id: mqtt_user
    label: MQTT User
    kind: action
    description: "Set MQTT username"
    params:
      - name: value
        type: string
        description: "0=clear MQTT user name, 1=reset to firmware default and restart, value=set MQTT user name and restart"

  - id: mqtt_password
    label: MQTT Password
    kind: action
    description: "Set MQTT password"
    params:
      - name: value
        type: string
        description: "0=clear MQTT password, 1=reset to firmware default and restart, value=set MQTT password and restart (min 5 chars)"

  - id: mqtt_client
    label: MQTT Client
    kind: action
    description: "Set MQTT client identifier and restart"
    params:
      - name: value
        type: string
        description: "1=reset to firmware default and restart, value=set MQTT client and restart"

  - id: mqtt_keep_alive
    label: MQTT Keep Alive
    kind: action
    description: "Set MQTT Keep Alive timer"
    params:
      - name: value
        type: integer
        description: "1..100 = set MQTT Keep Alive timer (default=30)"

  - id: mqtt_timeout
    label: MQTT Timeout
    kind: action
    description: "Set MQTT socket timeout"
    params:
      - name: value
        type: integer
        description: "1..100 = set MQTT socket timeout (default=4)"

  - id: mqtt_retry
    label: MQTT Retry
    kind: action
    description: "Set MQTT connection retry timer in seconds"
    params:
      - name: value
        type: integer
        description: "10..32000 = set MQTT connection retry timer in seconds (default=10)"

  - id: mqtt_wifi_timeout
    label: MQTT Wi-Fi Timeout
    kind: action
    description: "Set MQTT Wi-Fi connection timeout in milliseconds"
    params:
      - name: value
        type: integer
        description: "100..20000 = set MQTT Wi-Fi connection timeout in milliseconds (default=200)"

  - id: topic
    label: Topic
    kind: action
    description: "Set MQTT device topic and ButtonTopic and restart"
    params:
      - name: value
        type: string
        description: "1=reset to firmware default and restart, value=set MQTT topic and ButtonTopic and restart"

  - id: group_topic
    label: Group Topic
    kind: action
    description: "Set MQTT group topic for device group communications"
    params:
      - name: index
        type: integer
        description: "Group topic index (x in GroupTopic<x>)"
      - name: value
        type: string
        description: "1=reset to firmware default and restart, value=set MQTT group topic and restart"

  - id: full_topic
    label: Full Topic
    kind: action
    description: "Set MQTT full topic format with optional substitution tokens"
    params:
      - name: value
        type: string
        description: "1=reset to firmware default and restart, value=set MQTT fulltopic and restart. Tokens: %prefix%, %topic%, %hostname%, %id%"

  - id: prefix
    label: Prefix
    kind: action
    description: "Set MQTT command, status, or telemetry topic prefix"
    params:
      - name: index
        type: integer
        description: "1=command subscription prefix (SUB_PREFIX), 2=status prefix (PUB_PREFIX), 3=telemetry prefix (PUB_PREFIX2)"
      - name: value
        type: string
        description: "1=reset to firmware default and restart, value=set MQTT prefix and restart"

  - id: button_topic
    label: Button Topic
    kind: action
    description: "Set MQTT button topic"
    params:
      - name: value
        type: string
        description: "0=disable, 1=set to device topic, 2=reset to firmware default (default=0), value=set MQTT button topic"

  - id: switch_topic
    label: Switch Topic
    kind: action
    description: "Set MQTT switch topic"
    params:
      - name: value
        type: string
        description: "0=disable (default), 1=set to device topic, 2=reset to firmware default, value=set MQTT switch topic"

  - id: button_retain
    label: Button Retain
    kind: action
    description: "Configure MQTT retain flag for button press messages"
    params:
      - name: value
        type: integer
        description: "0=disable retain flag (default), 1=enable MQTT retain flag on button press"

  - id: switch_retain
    label: Switch Retain
    kind: action
    description: "Configure MQTT retain flag for switch press messages"
    params:
      - name: value
        type: integer
        description: "0=disable retain flag (default), 1=enable MQTT retain flag on switch press"

  - id: power_retain
    label: Power Retain
    kind: action
    description: "Configure MQTT retain flag for power state status updates"
    params:
      - name: value
        type: integer
        description: "0/off=disable MQTT power retain on status update (default), 1/on=enable MQTT power retain on status update"

  - id: sensor_retain
    label: Sensor Retain
    kind: action
    description: "Configure MQTT retain flag for sensor telemetry messages"
    params:
      - name: value
        type: integer
        description: "0=disable retain flag (default), 1=enable retain flag on tele/%topic%/SENSOR"

  - id: state_retain
    label: State Retain
    kind: action
    description: "Configure MQTT retain flag for state telemetry messages"
    params:
      - name: value
        type: integer
        description: "0=disable retain flag (default), 1=enable retain flag on tele/%topic%/STATE"

  - id: info_retain
    label: Info Retain
    kind: action
    description: "Configure MQTT retain flag for info telemetry messages"
    params:
      - name: value
        type: integer
        description: "0=disable retain flag (default), 1=enable retain flag on tele/%topic%/INFO<x>"

  - id: status_retain
    label: Status Retain
    kind: action
    description: "Configure MQTT retain flag for status messages"
    params:
      - name: value
        type: integer
        description: "0=disable retain flag (default), 1=enable retain flag on stat/%topic%/STATUS[n]"

  - id: publish
    label: Publish
    kind: action
    description: "Publish any MQTT topic with optional payload"
    params:
      - name: topic
        type: string
        description: "MQTT topic to publish to"
      - name: payload
        type: string
        description: "Optional payload"

  - id: publish2
    label: Publish Retain
    kind: action
    description: "Publish any MQTT topic with optional payload and retain flag"
    params:
      - name: topic
        type: string
        description: "MQTT topic to publish to"
      - name: payload
        type: string
        description: "Optional payload"

  - id: publish3
    label: Publish Retain Hex
    kind: action
    description: "Publish any MQTT topic with optional payload with retain flag encoded in Hex (disabled in MINIMAL and SAFEBOOT)"
    params:
      - name: topic
        type: string
        description: "MQTT topic to publish to"
      - name: payload
        type: string
        description: "Optional payload"

  - id: subscribe
    label: Subscribe
    kind: action
    description: "Subscribe to an MQTT topic, append /# if not already present, and assign an Event name"
    params:
      - name: value
        type: string
        description: "eventName, mqttTopic [, key] = subscribe with event binding. Empty = list all subscribed topics"

  - id: subscribe2
    label: Subscribe2
    kind: action
    description: "Subscribe to an MQTT topic without appending /# and assign an Event name"
    params:
      - name: value
        type: string
        description: "eventName, mqttTopic [, key] = subscribe with event binding. Empty = list all subscribed topics"

  - id: unsubscribe
    label: Unsubscribe
    kind: action
    description: "Unsubscribe from topics subscribed to with Subscribe"
    params:
      - name: value
        type: string
        description: "Empty = unsubscribe all topics, eventName = unsubscribe from a specific MQTT topic"

  - id: tele_period
    label: Tele Period
    kind: action
    description: "Set telemetry publish period and force publish STATE and SENSOR message"
    params:
      - name: value
        type: integer
        description: "0=disable telemetry messages, 1=reset to firmware default, 10..3600=set period in seconds (default=300)"

  - id: state_text
    label: State Text
    kind: action
    description: "Set state text labels used in MQTT messages"
    params:
      - name: index
        type: integer
        description: "1=OFF state text, 2=ON state text, 3=TOGGLE state text, 4=HOLD state text"
      - name: value
        type: string
        description: "Set state text string value"

  - id: baudrate
    label: Baudrate
    kind: action
    description: "Set hardware serial bridge baud rate"
    params:
      - name: value
        type: integer
        description: "1=set to default 115200 bps, value=set baud rate (multiple of 300, max 19660500)"

  - id: sbaudrate
    label: SBaudrate
    kind: action
    description: "Set software serial bridge baud rate"
    params:
      - name: value
        type: integer
        description: "1=set to default 9600 bps, value=set baud rate (multiple of 300, max 19660500)"

  - id: serial_buffer
    label: Serial Buffer
    kind: action
    description: "Set hardware serial bridge buffer size (not persisted across restarts)"
    params:
      - name: value
        type: integer
        description: "256..520 = set the serial buffer size"

  - id: sserial_buffer
    label: SSerial Buffer
    kind: action
    description: "Set software serial bridge buffer size (not persisted across restarts)"
    params:
      - name: value
        type: integer
        description: "256..SERIAL_BRIDGE_BUFFER_SIZE = set the software serial bridge buffer size"

  - id: serial_config
    label: Serial Config
    kind: action
    description: "Set hardware serial protocol using data/parity/stop notation"
    params:
      - name: value
        type: string
        description: "data/parity/stop notation e.g. 8N1 or 702; 0..23=set serial protocol (3 equals 8N1)"

  - id: sserial_config
    label: SSerial Config
    kind: action
    description: "Set software serial protocol using data/parity/stop notation"
    params:
      - name: value
        type: string
        description: "data/parity/stop notation e.g. 8N1 or 702; 0..23=set serial protocol (3 equals 8N1)"

  - id: serial_delimiter
    label: Serial Delimiter
    kind: action
    description: "Set serial delimiter character for hardware serial bridge"
    params:
      - name: value
        type: integer
        description: "1..127=set delimiter to decimal ASCII, 128=allow only ASCII 32-127, 254=disable delimiter post HEX string, 129..253 or 255=disable delimiter (default=255)"

  - id: serial_send
    label: Serial Send
    kind: action
    description: "Disable serial logging and send data via hardware serial bridge"
    params:
      - name: mode
        type: integer
        description: "1=send with newline, 2=send, 3=replace escape chars and send, 4=send as binary, 5=send as hex, 6=send as comma-delimited decimal string"
      - name: data
        type: string
        description: "String data to send via hardware serial"

  - id: sserial_send
    label: SSerial Send
    kind: action
    description: "Send data via software serial bridge"
    params:
      - name: mode
        type: integer
        description: "1=send with newline, 2=send, 3=replace escape chars and send, 4=send as binary, 5=send as hex, 6=send as comma-delimited decimal string, 9=enable Serial Bridge console Tee for debugging"
      - name: data
        type: string
        description: "String data to send via software serial"

  - id: web_password
    label: Web Password
    kind: action
    description: "Configure web server user interface access password"
    params:
      - name: value
        type: string
        description: "0=disable password for webUI, 1=reset to firmware default, value=set webUI password (32 char limit)"

  - id: web_server
    label: Web Server
    kind: action
    description: "Start or stop the built-in web server"
    params:
      - name: value
        type: integer
        description: "0=stop web server, 1=start in user mode, 2=start in admin mode"

  - id: web_query
    label: Web Query
    kind: action
    description: "Send HTTP GET, POST, PUT, or PATCH requests to external URLs"
    params:
      - name: url
        type: string
        description: "HTTP URL to query"
      - name: method
        type: string
        description: "HTTP method: GET, POST, PUT, or PATCH"
      - name: headers
        type: string
        description: "Optional header1Name:header1Value|header2Name:header2Value pairs"
      - name: body
        type: string
        description: "Optional HTTP request body (ignored for GET)"

  - id: web_send
    label: Web Send
    kind: action
    description: "Send a command to a Tasmota host over HTTP"
    params:
      - name: target
        type: string
        description: "[host:port,user:password] command. If command starts with / it is used as a link."

  - id: web_get_config
    label: Web Get Config
    kind: action
    description: "Download a configuration .dmp file from an HTTP URL"
    params:
      - name: url
        type: string
        description: "HTTP URL to download configuration from; %id% is substituted with device MAC address without dots"

  - id: web_log
    label: Web Log
    kind: action
    description: "Configure web server logging level"
    params:
      - name: level
        type: integer
        description: "0=disable web logging, 1=errors only, 2=error and info (default), 3=error info and debug, 4=error info and more debug"

  - id: web_refresh
    label: Web Refresh
    kind: action
    description: "Set web page auto-refresh interval in milliseconds"
    params:
      - name: value
        type: integer
        description: "1000..10000 = set refresh time in milliseconds (default=2345)"

  - id: web_time
    label: Web Time
    kind: action
    description: "Show part of date and/or time in webUI based on ISO 8601 string"
    params:
      - name: range
        type: string
        description: "start_pos,end_pos = show part of date/time string based on 2017-03-07T11:08:02-07:00"

  - id: set_option
    label: Set Option
    kind: action
    description: "Configure a Tasmota firmware option by index number"
    params:
      - name: index
        type: integer
        description: "Option index (x in SetOption<x>)"
      - name: value
        type: integer
        description: "Option value (typically 0=disable, 1=enable; see source for per-index specifics)"

  - id: rule
    label: Rule
    kind: action
    description: "Define or manage automation rule sets"
    params:
      - name: index
        type: integer
        description: "Rule set index (x in Rule<x>, typically 1..3)"
      - name: value
        type: string
        description: "0=disable, 1=enable, 2=toggle, 4=disable one-shot, 5=enable one-shot, 8=disable stop-on-error, 9=enable stop-on-error, value=define rule, +value=append to rule"

  - id: rule0
    label: Rule0
    kind: action
    description: "Apply Rule control to all rulesets simultaneously"
    params:
      - name: value
        type: string
        description: "Same as Rule<x> but affects all rulesets at once"

  - id: rule_timer
    label: Rule Timer
    kind: action
    description: "Set countdown event timer for use in rules"
    params:
      - name: index
        type: integer
        description: "Timer index (x in RuleTimer<x>, 1..8)"
      - name: value
        type: integer
        description: "0..65535 = set countdown rule timer in seconds"

  - id: rule_timer0
    label: Rule Timer0
    kind: action
    description: "Stop and clear all rule timers simultaneously"

  - id: event
    label: Event
    kind: action
    description: "Execute a named event to trigger a rule"
    params:
      - name: event_name
        type: string
        description: "Event name to trigger as documented in Rules"

  - id: var
    label: Var
    kind: action
    description: "Manage up to 16 string variables stored in memory"
    params:
      - name: index
        type: integer
        description: "Variable index (x in Var<x>, 1..16). Omit index to return all values."
      - name: value
        type: string
        description: "string=store string value in variable, empty string=clear stored value"

  - id: mem
    label: Mem
    kind: action
    description: "Manage up to 16 string variables stored on flash"
    params:
      - name: index
        type: integer
        description: "Variable index (x in Mem<x>, 1..16). Omit index to return all values."
      - name: value
        type: string
        description: "value=store string value in variable, empty string=clear stored value"

  - id: add
    label: Add
    kind: action
    description: "Add a numeric value to a Var<x> variable"
    params:
      - name: index
        type: integer
        description: "Variable index (x in Add<x>)"
      - name: value
        type: string
        description: "Value to add to Var<x>"

  - id: sub
    label: Sub
    kind: action
    description: "Subtract a numeric value from a Var<x> variable"
    params:
      - name: index
        type: integer
        description: "Variable index (x in Sub<x>)"
      - name: value
        type: string
        description: "Value to subtract from Var<x>"

  - id: mult
    label: Mult
    kind: action
    description: "Multiply a Var<x> variable by a numeric value"
    params:
      - name: index
        type: integer
        description: "Variable index (x in Mult<x>)"
      - name: value
        type: string
        description: "Value to multiply Var<x> by"

  - id: scale
    label: Scale
    kind: action
    description: "Scale a value from one numeric range to another and save in Var<x>"
    params:
      - name: index
        type: integer
        description: "Variable index (x in Scale<x>)"
      - name: args
        type: string
        description: "v,fl,fh,tl,th = value, fromLow, fromHigh, toLow, toHigh"

  - id: timers
    label: Timers
    kind: action
    description: "Enable, disable, or toggle all hardware timers"
    params:
      - name: value
        type: integer
        description: "0=disable all timers, 1=enable all timers, 2=toggle all timers"

  - id: timer
    label: Timer
    kind: action
    description: "Configure hardware timer parameters"
    params:
      - name: index
        type: integer
        description: "Timer index (x in Timer<x>, 1..16)"
      - name: value
        type: string
        description: "0=clear parameters, 1..16=copy Timer<y> parameters to Timer<x>, JSON payload=set individual parameters"

  - id: latitude
    label: Latitude
    kind: action
    description: "Set device latitude for sunrise/sunset calculations"
    params:
      - name: value
        type: number
        description: "Latitude in decimal degrees format, e.g. -33.893681"

  - id: longitude
    label: Longitude
    kind: action
    description: "Set device longitude for sunrise/sunset calculations"
    params:
      - name: value
        type: number
        description: "Longitude in decimal degrees format, e.g. 18.619954"

  - id: sunrise
    label: Sunrise
    kind: action
    description: "Set sunrise/sunset calculation type"
    params:
      - name: value
        type: integer
        description: "0=Normal (default), 1=Civil, 2=Nautical, 3=Astronomical"

  - id: time_std
    label: TimeStd
    kind: action
    description: "Set policy for return to standard time"
    params:
      - name: value
        type: string
        description: "0=reset to firmware defaults, H,W,M,D,h,T = hemisphere, week, month, day-of-week, hour, timezone-offset-minutes (-780..780)"

  - id: time_dst
    label: TimeDst
    kind: action
    description: "Set policy for beginning of daylight saving time"
    params:
      - name: value
        type: string
        description: "0=reset to firmware defaults, H,W,M,D,h,T = hemisphere, week, month, day-of-week, hour, timezone-offset-minutes (-780..780)"

  - id: timezone
    label: Timezone
    kind: action
    description: "Set device time zone offset from UTC"
    params:
      - name: value
        type: string
        description: "-13..+13=time zone offset in hours, -13:00..+13:00=offset in hours and minutes, 99=use TimeDst and TimeStd"

  - id: dev_group_name
    label: Device Group Name
    kind: action
    description: "Set device group name and restart"
    params:
      - name: index
        type: integer
        description: "Device group index (x in DevGroupName<x>)"
      - name: value
        type: string
        description: "0=clear group name and restart, value=set device group name and restart"

  - id: dev_group_send
    label: Device Group Send
    kind: action
    description: "Send an update to a device group"
    params:
      - name: index
        type: integer
        description: "Device group index (x in DevGroupSend<x>)"
      - name: value
        type: string
        description: "item=value pairs separated by space. Item 128=relay power bitmask with bits set for relays to be powered on."

  - id: dev_group_share
    label: Device Group Share
    kind: action
    description: "Set incoming and outgoing shared items bitmask for device groups"
    params:
      - name: value
        type: string
        description: "in,out bitmask: 1=Power, 2=Light brightness, 4=Light fade/speed, 8=Light scheme, 16=Light color, 32=Dimmer settings, 64=Event (default=0xffffffff,0xffffffff)"

  - id: dev_group_status
    label: Device Group Status
    kind: query
    description: "Show status of a device group including list of currently known members"
    params:
      - name: index
        type: integer
        description: "Device group index (x in DevGroupStatus<x>)"

  - id: dev_group_tie
    label: Device Group Tie
    kind: action
    description: "Tie a relay to a device group (requires SetOption88 enabled)"
    params:
      - name: index
        type: integer
        description: "Device group index (x in DevGroupTie<x>)"
      - name: relay
        type: integer
        description: "Relay number to tie to the device group"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: ["on", "off"]
    description: "Current power state of relay. Queried via Power<x> with no parameter."

  - id: pulse_time_remaining
    type: integer
    description: "Remaining PulseTime on relay in tenths of seconds. Queried via PulseTime<x> with no parameter."

  - id: timed_power_remaining
    type: integer
    description: "Remaining time on TimedPower timer. Queried via TimedPower with no parameter."

  - id: device_status
    type: object
    description: "Full status response. Queried via Status <type>. Returns JSON object."

  - id: device_state
    type: object
    description: "Current device state. Queried via State. Returns JSON object."
```

## Variables
```yaml
variables:
  - id: power_on_state
    type: integer
    description: "Power state after device power-up. 0=OFF, 1=ON, 2=TOGGLE, 3=last saved, 4=ON locked, 5=ON after PulseTime"

  - id: blink_count
    type: integer
    description: "Number of blink toggles. 0=many, 1..32000 (default 10)"

  - id: blink_time
    type: integer
    description: "Blink toggle duration in 0.1s increments. 2..3600"

  - id: tele_period
    type: integer
    description: "Telemetry publish period in seconds. 0=disabled, 10..3600 (default 300)"
```

## Events
```yaml
# UNRESOLVED: Tasmota publishes telemetry (tele/%topic%/STATE, tele/%topic%/SENSOR) periodically
# and rule-triggered events, but unsolicited event format details are not fully documented in source.
```

## Macros
```yaml
# UNRESOLVED: Backlog supports multi-command sequences but no named macros documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# PowerLock<x> can lock relay state. Interlock command can group relays to prevent simultaneous activation.
# No explicit safety warnings or interlock procedures in source.
```

## Notes
- HTTP command format: `http://<ip>/cm?cmnd=<command>%20<param>` — spaces encoded as `%20`, semicolons as `%3B`.
- MQTT command topic: `cmnd/%topic%/<command>` with payload as parameter. Empty payload queries current value.
- Serial bridge default 115200 bps. Configurable via `Baudrate` command.
- `Backlog` executes up to 30 sequential commands separated by `;`. `Backlog` with no argument clears the queue.
- Command prefix `_` suppresses result logging and MQTT publish.
- Boolean values: `0`/`off`/`false` = OFF, `1`/`on`/`true` = ON, `2`/`toggle` = toggle.
- `Power<x>` and `Power` (no index) both control first relay. `Power0` controls all relays simultaneously.
<!-- UNRESOLVED: MQTT default port not stated in source -->
<!-- UNRESOLVED: Serial default data_bits/parity/stop_bits not explicitly stated (SerialConfig is configurable) -->
<!-- UNRESOLVED: Firmware version compatibility not stated -->
<!-- UNRESOLVED: Full telemetry/event JSON schema not documented in this source -->

## Provenance

```yaml
source_domains:
  - tasmota.github.io
source_urls:
  - https://tasmota.github.io/docs/Commands/
  - https://tasmota.github.io/docs/MQTT/
  - https://tasmota.github.io/docs/
retrieved_at: 2026-05-22T20:58:49.428Z
last_checked_at: 2026-06-10T03:17:41.479Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T03:17:41.479Z
matched_actions: 121
action_count: 121
confidence: medium
summary: "All 121 spec actions matched source commands at spec granularity; Power variants expanded by spec are all documented in source; parameterized families collapsed by spec are represented one-to-one. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "MQTT port not stated in source"
- "configurable via SerialConfig, default not explicitly stated"
- "Tasmota publishes telemetry (tele/%topic%/STATE, tele/%topic%/SENSOR) periodically"
- "Backlog supports multi-command sequences but no named macros documented in source."
- "MQTT default port not stated in source"
- "Serial default data_bits/parity/stop_bits not explicitly stated (SerialConfig is configurable)"
- "Firmware version compatibility not stated"
- "Full telemetry/event JSON schema not documented in this source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
