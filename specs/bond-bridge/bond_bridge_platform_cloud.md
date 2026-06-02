---
spec_id: admin/bond_bridge-platform
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bond Bridge Platform Control Spec"
manufacturer: "Bond Bridge"
model_family: "Bond Bridge Platform"
aliases: []
compatible_with:
  manufacturers:
    - "Bond Bridge"
  models:
    - "Bond Bridge Platform"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs-local.appbond.com
  - github.com
  - bondhome-product-docs.s3.amazonaws.com
source_urls:
  - https://docs-local.appbond.com/
  - https://github.com/bondhome/api-v2
  - "https://bondhome-product-docs.s3.amazonaws.com/BD-1000/%5BBond+Bridge%5D+Spec+Sheet.pdf"
retrieved_at: 2026-04-29T13:01:15.036Z
last_checked_at: 2026-05-14T18:17:14.785Z
generated_at: 2026-05-14T18:17:14.785Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "port number not stated in source (HTTP defaults assumed)"
  - "token expiration/renewal policy not stated"
  - "no safety warnings or interlock procedures found in source"
  - "HTTP port not explicitly stated in source"
  - "firmware version compatibility ranges not stated"
  - "max concurrent connections or rate limits not stated"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:14.785Z
  matched_actions: 167
  action_count: 182
  confidence: medium
  summary: "All 167 semantic-id actions map to documented REST API endpoints; transport parameters verified. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# Bond Bridge Platform Control Spec

## Summary
Bond Bridge is a local API hub for controlling IR/RF devices (fans, shades, fireplaces, lights). Control via REST HTTP API. Token-based auth; token obtained from `/v2/token`. Devices discovered via mDNS or BPUP UDP push protocol. Supports MQTT for cloud integration.

<!-- UNRESOLVED: port number not stated in source (HTTP defaults assumed) -->

## Transport
```yaml
protocols:
  - http
  - udp  # BPUP push protocol on port 30007
addressing:
  base_url: http://{bond_ip}/v2/
auth:
  type: token  # BOND-Token header or _token body field
  token_endpoint: /v2/token
  # UNRESOLVED: token expiration/renewal policy not stated
```

## Traits
```yaml
- powerable
- queryable
- routable  # motorized shades, groups
- levelable  # speed, brightness, color_temp
```

## Actions
```yaml
- id: turn_on
  label: Turn On
  kind: action
  params: []

- id: turn_off
  label: Turn Off
  kind: action
  params: []

- id: toggle_power
  label: Toggle Power
  kind: action
  params: []

- id: set_speed
  label: Set Speed
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 1-max_speed

- id: increase_speed
  label: Increase Speed
  kind: action
  params:
    - name: speeds
      type: integer
      description: Amount to increase

- id: decrease_speed
  label: Decrease Speed
  kind: action
  params:
    - name: speeds
      type: integer
      description: Amount to decrease (minimum 1)

- id: set_timer
  label: Set Timer
  kind: action
  params:
    - name: s
      type: integer
      description: Seconds; 0 cancels

- id: set_breeze
  label: Set Breeze
  kind: action
  params:
    - name: breeze
      type: object
      description: "[mode, mean, var] - mode 0=disabled, mean 0-100, var 0-100"

- id: breeze_on
  label: Breeze On
  kind: action
  params: []

- id: breeze_off
  label: Breeze Off
  kind: action
  params: []

- id: set_direction
  label: Set Direction
  kind: action
  params:
    - name: direction
      type: integer
      description: "1=forward, -1=reverse"

- id: toggle_direction
  label: Toggle Direction
  kind: action
  params: []

- id: turn_light_on
  label: Turn Light On
  kind: action
  params: []

- id: turn_light_off
  label: Turn Light Off
  kind: action
  params: []

- id: toggle_light
  label: Toggle Light
  kind: action
  params: []

- id: turn_up_light_on
  label: Turn Up Light On
  kind: action
  params: []

- id: turn_down_light_on
  label: Turn Down Light On
  kind: action
  params: []

- id: turn_up_light_off
  label: Turn Up Light Off
  kind: action
  params: []

- id: turn_down_light_off
  label: Turn Down Light Off
  kind: action
  params: []

- id: toggle_up_light
  label: Toggle Up Light
  kind: action
  params: []

- id: toggle_down_light
  label: Toggle Down Light
  kind: action
  params: []

- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: brightness
      type: integer
      description: 1-100 percentage

- id: increase_brightness
  label: Increase Brightness
  kind: action
  params:
    - name: amount
      type: integer
      description: Amount to increase

- id: decrease_brightness
  label: Decrease Brightness
  kind: action
  params:
    - name: amount
      type: integer
      description: Minimum 1%

- id: cycle_brightness
  label: Cycle Brightness
  kind: action
  params:
    - name: amount
      type: integer
      description: Cycle step amount

- id: set_up_light_brightness
  label: Set Up Light Brightness
  kind: action
  params:
    - name: brightness
      type: integer
      description: 1-100%

- id: set_down_light_brightness
  label: Set Down Light Brightness
  kind: action
  params:
    - name: brightness
      type: integer
      description: 1-100%

- id: increase_up_light_brightness
  label: Increase Up Light Brightness
  kind: action
  params:
    - name: amount
      type: integer

- id: decrease_up_light_brightness
  label: Decrease Up Light Brightness
  kind: action
  params:
    - name: amount
      type: integer

- id: increase_down_light_brightness
  label: Increase Down Light Brightness
  kind: action
  params:
    - name: amount
      type: integer

- id: decrease_down_light_brightness
  label: Decrease Down Light Brightness
  kind: action
  params:
    - name: amount
      type: integer

- id: set_color_temp
  label: Set Color Temperature
  kind: action
  params:
    - name: color_temp
      type: integer
      description: Kelvin (resolution 100K)

- id: increase_color_temp
  label: Increase Color Temperature
  kind: action
  params:
    - name: amount
      type: integer

- id: decrease_color_temp
  label: Decrease Color Temperature
  kind: action
  params:
    - name: amount
      type: integer

- id: cycle_color_temp
  label: Cycle Color Temperature
  kind: action
  params:
    - name: amount
      type: integer

- id: cycle_color_temp_preset
  label: Cycle Color Temperature Preset
  kind: action
  params: []

- id: set_hsv
  label: Set HSV Color
  kind: action
  params:
    - name: h
      type: integer
      description: Hue 0-359
    - name: s
      type: integer
      description: Saturation 0-100
    - name: v
      type: integer
      description: Value 0-100

- id: cycle_color_preset
  label: Cycle Color Preset
  kind: action
  params: []

- id: cycle_color
  label: Cycle Color
  kind: action
  params:
    - name: amount
      type: integer
      description: Hue increase amount

- id: set_flame
  label: Set Flame Level
  kind: action
  params:
    - name: flame
      type: integer
      description: 1-100

- id: increase_flame
  label: Increase Flame
  kind: action
  params:
    - name: flame
      type: integer

- id: decrease_flame
  label: Decrease Flame
  kind: action
  params:
    - name: flame
      type: integer

- id: set_heat
  label: Set Heat Level
  kind: action
  params:
    - name: heat
      type: integer
      description: 1-100

- id: increase_heat
  label: Increase Heat
  kind: action
  params:
    - name: heat
      type: integer

- id: decrease_heat
  label: Decrease Heat
  kind: action
  params:
    - name: heat
      type: integer

- id: heat_preset_next
  label: Heat Preset Next
  kind: action
  params: []

- id: heat_preset_prev
  label: Heat Preset Previous
  kind: action
  params: []

- id: open
  label: Open
  kind: action
  params: []

- id: close
  label: Close
  kind: action
  params: []

- id: toggle_open
  label: Toggle Open/Close
  kind: action
  params: []

- id: raise
  label: Raise
  kind: action
  params: []

- id: lower
  label: Lower
  kind: action
  params: []

- id: retract
  label: Retract
  kind: action
  params: []

- id: extend
  label: Extend
  kind: action
  params: []

- id: set_position
  label: Set Position
  kind: action
  params:
    - name: position
      type: integer
      description: 0-100 (0=retracted, 100=extended)

- id: increase_position
  label: Increase Position
  kind: action
  params:
    - name: amount
      type: integer

- id: decrease_position
  label: Decrease Position
  kind: action
  params:
    - name: amount
      type: integer

- id: set_upper_rail_position
  label: Set Upper Rail Position
  kind: action
  params:
    - name: position
      type: integer
      description: 0-100

- id: set_lower_rail_position
  label: Set Lower Rail Position
  kind: action
  params:
    - name: position
      type: integer
      description: 0-100

- id: raise_upper_rail
  label: Raise Upper Rail
  kind: action
  params: []

- id: lower_upper_rail
  label: Lower Upper Rail
  kind: action
  params: []

- id: raise_lower_rail
  label: Raise Lower Rail
  kind: action
  params: []

- id: lower_lower_rail
  label: Lower Lower Rail
  kind: action
  params: []

- id: set_tilt_position
  label: Set Tilt Position
  kind: action
  params:
    - name: position
      type: integer
      description: Degrees

- id: toggle_tilt
  label: Toggle Tilt
  kind: action
  params: []

- id: set_blackout_position
  label: Set Blackout Position
  kind: action
  params:
    - name: position
      type: integer
      description: 0-100

- id: set_sheer_position
  label: Set Sheer Position
  kind: action
  params:
    - name: position
      type: integer
      description: 0-100

- id: turn_fp_fan_on
  label: Turn Floor Fan On
  kind: action
  params: []

- id: turn_fp_fan_off
  label: Turn Floor Fan Off
  kind: action
  params: []

- id: set_fp_fan
  label: Set Floor Fan Speed
  kind: action
  params:
    - name: speed
      type: integer
      description: 1-100

- id: pair
  label: Pair
  kind: action
  params: []

- id: unpair
  label: Unpair
  kind: action
  params: []

- id: unpair_self
  label: Unpair Self
  kind: action
  params: []

- id: hold
  label: Hold (Stop Motion)
  kind: action
  params: []

- id: preset
  label: Preset Position
  kind: action
  params: []

- id: stop
  label: Stop Transmission
  kind: action
  params: []

- id: start_dimmer
  label: Start Dimmer
  kind: action
  params: []

- id: start_up_light_dimmer
  label: Start Up Light Dimmer
  kind: action
  params: []

- id: start_down_light_dimmer
  label: Start Down Light Dimmer
  kind: action
  params: []

- id: start_increasing_brightness
  label: Start Increasing Brightness
  kind: action
  params: []

- id: start_decreasing_brightness
  label: Start Decreasing Brightness
  kind: action
  params: []

# Device management actions
- id: create_device
  label: Create Device
  kind: action
  params:
    - name: name
      type: string
    - name: type
      type: string
      description: "CF=Ceiling Fan, FP=Fireplace, HT=Heater, MS=Shades, GX=Generic, SW=Switch, LT=Light, BD=Bidet"
    - name: subtype
      type: string
    - name: template
      type: string
    - name: location
      type: string

- id: delete_device
  label: Delete Device
  kind: action
  params:
    - name: device_id
      type: string

- id: patch_device
  label: Patch Device
  kind: action
  params:
    - name: device_id
      type: string
    - name: patch
      type: object

- id: reload_device
  label: Reload Device
  kind: action
  params:
    - name: device_id
      type: string

# Group actions
- id: create_group
  label: Create Group
  kind: action
  params:
    - name: name
      type: string
    - name: devices
      type: array
      description: Array of device IDs

- id: delete_group
  label: Delete Group
  kind: action
  params:
    - name: group_id
      type: string

- id: execute_scene
  label: Execute Scene
  kind: action
  params:
    - name: scene_id
      type: string

# Schedule actions
- id: create_schedule
  label: Create Schedule
  kind: action
  params:
    - name: device_id
      type: string
    - name: enabled
      type: boolean
    - name: action
      type: string
    - name: argument
      type: integer
    - name: seconds
      type: integer
    - name: days_of_week
      type: array
      description: "[Sun,Mon,Tue,Wed,Thu,Fri,Sat]"
    - name: mark
      type: string
      description: "midnight/sunrise/sunset/dawn/dusk"

- id: delete_schedule
  label: Delete Schedule
  kind: action
  params:
    - name: device_id
      type: string
    - name: sked_id
      type: string

# Bridge actions
- id: modify_bridge
  label: Modify Bridge
  kind: action
  params:
    - name: location
      type: string
    - name: name
      type: string
    - name: bluelight
      type: integer

# System actions
- id: reboot
  label: Reboot
  kind: action
  params: []

- id: factory_reset
  label: Factory Reset
  kind: action
  params: []

- id: backup
  label: Backup
  kind: action
  params:
    - name: host
      type: string
    - name: http_port
      type: string
    - name: path
      type: string
    - name: timestamp
      type: string
    - name: dev_ids
      type: array

- id: restore
  label: Restore
  kind: action
  params:
    - name: host
      type: string
    - name: http_port
      type: string
    - name: path
      type: string
    - name: timestamp
      type: string
    - name: dev_ids
      type: array
- id: list_devices
  label: List Devices
  kind: action
  params: []

- id: get_device
  label: Get Device
  kind: action
  params:
    - name: device_id
      type: string

- id: get_device_state
  label: Get Device State
  kind: action
  params:
    - name: device_id
      type: string

- id: patch_device_state
  label: Update Device State Belief
  kind: action
  params:
    - name: device_id
      type: string
    - name: state
      type: object
      description: State variables to update; use _lock_priority and _lock_expiration for locking

- id: get_device_properties
  label: Get Device Properties
  kind: action
  params:
    - name: device_id
      type: string

- id: patch_device_properties
  label: Update Device Properties
  kind: action
  params:
    - name: device_id
      type: string
    - name: properties
      type: object
      description: Properties to update (e.g. trust_state, addr, freq, bps)

- id: get_device_addr
  label: Get Device Remote Address
  kind: action
  params:
    - name: device_id
      type: string

- id: patch_device_addr
  label: Modify Device Remote Address
  kind: action
  params:
    - name: device_id
      type: string
    - name: addr
      type: array
      description: Array of address strings
    - name: learn_window_open
      type: boolean
    - name: addr0_is_dip
      type: boolean

- id: delete_device_addr
  label: Reset Device Remote Address
  kind: action
  params:
    - name: device_id
      type: string

- id: get_device_power_cycle_state
  label: Get Device Power Cycle State
  kind: action
  params:
    - name: device_id
      type: string

- id: patch_device_power_cycle_state
  label: Update Device Power Cycle State
  kind: action
  params:
    - name: device_id
      type: string
    - name: enabled
      type: boolean
    - name: state
      type: object

- id: delete_device_power_cycle_state
  label: Delete Device Power Cycle State
  kind: action
  params:
    - name: device_id
      type: string

- id: list_device_skeds
  label: List Device Schedules
  kind: action
  params:
    - name: device_id
      type: string

- id: list_device_commands
  label: List Device Commands
  kind: action
  params:
    - name: device_id
      type: string

- id: create_device_command
  label: Create Device Command
  kind: action
  params:
    - name: device_id
      type: string
    - name: name
      type: string
    - name: action
      type: string
    - name: argument
      type: integer
    - name: icon
      type: string
    - name: category_name
      type: string
    - name: button_type
      type: string
    - name: hidden
      type: boolean

- id: get_device_command
  label: Get Device Command
  kind: action
  params:
    - name: device_id
      type: string
    - name: command_id
      type: string

- id: patch_device_command
  label: Modify Device Command
  kind: action
  params:
    - name: device_id
      type: string
    - name: command_id
      type: string
    - name: patch
      type: object

- id: delete_device_command
  label: Delete Device Command
  kind: action
  params:
    - name: device_id
      type: string
    - name: command_id
      type: string

- id: get_command_signal
  label: Get Command Signal
  kind: action
  params:
    - name: device_id
      type: string
    - name: command_id
      type: string

- id: put_command_signal
  label: Store Command Signal
  kind: action
  params:
    - name: device_id
      type: string
    - name: command_id
      type: string
    - name: freq
      type: integer
      description: Frequency in kHz
    - name: modulation
      type: string
      description: "OOK or GFSK"
    - name: data
      type: string
    - name: encoding
      type: string
      description: "cq or hex"
    - name: bps
      type: integer
      description: Bitrate 100-40000
    - name: reps
      type: integer

- id: tx_command_signal
  label: Transmit Command Signal
  kind: action
  params:
    - name: device_id
      type: string
    - name: command_id
      type: string

- id: get_device_vrc
  label: Get Device VRC Info
  kind: action
  params:
    - name: device_id
      type: string

- id: patch_device_vrc
  label: Enable/Disable Device VRC
  kind: action
  params:
    - name: device_id
      type: string
    - name: enabled
      type: boolean

- id: send_vrc_keystream
  label: Send Virtual Key Event
  kind: action
  params:
    - name: device_id
      type: string
    - name: seq
      type: integer
    - name: event
      type: string
      description: "TAP, HOLD_START, HOLD, HOLD_END"
    - name: key
      type: array
    - name: hold_ms
      type: integer

- id: list_groups
  label: List Groups
  kind: action
  params: []

- id: get_group
  label: Get Group
  kind: action
  params:
    - name: group_id
      type: string

- id: get_group_state
  label: Get Group State
  kind: action
  params:
    - name: group_id
      type: string

- id: execute_group_action
  label: Execute Group Action
  kind: action
  params:
    - name: group_id
      type: string
    - name: action_name
      type: string
    - name: argument
      type: integer

- id: list_scenes
  label: List Scenes
  kind: action
  params: []

- id: create_scene
  label: Create Scene
  kind: action
  params:
    - name: name
      type: string
    - name: actors
      type: array
      description: "Array of {device, action, argument} or {group, action, argument}"

- id: add_sidekick
  label: Add Sidekick
  kind: action
  params:
    - name: _id
      type: string
    - name: name
      type: string
    - name: location
      type: string
    - name: chan_links
      type: object
    - name: key_links
      type: object

- id: get_sidekick
  label: Get Sidekick
  kind: action
  params:
    - name: sk_id
      type: string

- id: patch_sidekick
  label: Modify Sidekick
  kind: action
  params:
    - name: sk_id
      type: string
    - name: patch
      type: object

- id: get_sidekick_learn
  label: Get Sidekick Learn Status
  kind: action
  params: []

- id: patch_sidekick_learn
  label: Open/Close Sidekick Learn Window
  kind: action
  params:
    - name: learn_window_open
      type: boolean
    - name: pattern
      type: string

- id: list_channels
  label: List Channels
  kind: action
  params: []

- id: get_channel
  label: Get Channel
  kind: action
  params:
    - name: channel_id
      type: string

- id: patch_channel
  label: Modify Channel
  kind: action
  params:
    - name: channel_id
      type: string
    - name: name
      type: string
    - name: label
      type: string
    - name: template
      type: string
    - name: enabled
      type: boolean

- id: execute_channel_action
  label: Execute Channel Action
  kind: action
  params:
    - name: channel_id
      type: string
    - name: action_name
      type: string

- id: tx_signal
  label: Transmit Signal
  kind: action
  params:
    - name: freq
      type: integer
    - name: modulation
      type: string
      description: "OOK or GFSK"
    - name: data
      type: string
    - name: encoding
      type: string
      description: "cq or hex"
    - name: bps
      type: integer
    - name: reps
      type: integer

- id: cancel_tx_signal
  label: Cancel Signal Transmission
  kind: action
  params: []

- id: start_scan
  label: Start Signal Scan
  kind: action
  params:
    - name: freq
      type: integer
    - name: modulation
      type: string
      description: "OOK or GFSK"

- id: get_scan_progress
  label: Check Scan Progress
  kind: action
  params: []

- id: get_scan_result
  label: Get Scan Result
  kind: action
  params: []

- id: get_rssi
  label: Get RSSI
  kind: action
  params: []

- id: get_token
  label: Get Token
  kind: action
  params: []

- id: patch_token
  label: Unlock Token / Add to Account
  kind: action
  params:
    - name: locked
      type: integer
    - name: account_code
      type: string
    - name: pin
      type: string
    - name: disable
      type: boolean

- id: get_mqtt_config
  label: Get MQTT Config
  kind: action
  params: []

- id: patch_mqtt_config
  label: Configure MQTT
  kind: action
  params:
    - name: host
      type: string
    - name: port
      type: integer
    - name: cert
      type: string
    - name: key
      type: string
    - name: enabled
      type: boolean
    - name: server_cert
      type: string
    - name: server_cert_check
      type: boolean

- id: delete_mqtt_config
  label: Reset MQTT Config
  kind: action
  params: []

- id: get_bpup_config
  label: Get BPUP Config
  kind: action
  params: []

- id: patch_bpup_config
  label: Configure BPUP
  kind: action
  params:
    - name: broadcast
      type: boolean

- id: get_homekit_config
  label: Get HomeKit Config
  kind: action
  params: []

- id: patch_homekit_config
  label: Enable/Disable HomeKit
  kind: action
  params:
    - name: enabled
      type: boolean

- id: get_sys_version
  label: Get System Version
  kind: action
  params: []

- id: get_wifi_scan
  label: Wi-Fi Scan
  kind: action
  params: []

- id: get_wifi_sta
  label: Get Wi-Fi Station Settings
  kind: action
  params: []

- id: patch_wifi_sta
  label: Connect to Wi-Fi
  kind: action
  params:
    - name: status
      type: integer
    - name: ssid
      type: string
      description: Base64 encoded
    - name: bssid
      type: string
    - name: static_ip_set
      type: boolean
    - name: ip
      type: string
    - name: gw
      type: string
    - name: netmask
      type: string
    - name: dns_set
      type: boolean
    - name: dns
      type: string
    - name: dns_alt
      type: string
    - name: password
      type: string
      description: Base64 encoded

- id: get_wifi_ap
  label: Get Wi-Fi AP Config
  kind: action
  params: []

- id: patch_wifi_ap
  label: Configure Wi-Fi AP
  kind: action
  params:
    - name: auto
      type: boolean
    - name: enabled
      type: boolean

- id: get_eth
  label: Get Ethernet Settings
  kind: action
  params: []

- id: patch_eth
  label: Update Ethernet Settings
  kind: action
  params:
    - name: patch
      type: object

- id: get_wifi_watchdog
  label: Get Network Watchdog
  kind: action
  params: []

- id: patch_wifi_watchdog
  label: Update Network Watchdog
  kind: action
  params:
    - name: rwdg_disable
      type: boolean

- id: get_sys_upgrade
  label: Get Firmware Upgrade Status
  kind: action
  params: []

- id: put_sys_upgrade
  label: Start Firmware Upgrade
  kind: action
  params:
    - name: host
      type: string
    - name: port
      type: string
    - name: http_port
      type: string
    - name: path
      type: string
    - name: info
      type: string
    - name: sig
      type: string
    - name: reboot
      type: integer

- id: delete_sys_upgrade
  label: Cancel Firmware Upgrade
  kind: action
  params: []

- id: get_sys_backup
  label: Get Backup Info
  kind: action
  params: []

- id: get_sys_time
  label: Get System Time
  kind: action
  params: []

- id: patch_sys_time
  label: Set System Time
  kind: action
  params:
    - name: unix_time
      type: integer
    - name: time_set
      type: boolean
    - name: tz
      type: string
    - name: grid
      type: string

- id: get_sys_power
  label: Get Power Supply Info
  kind: action
  params: []

- id: get_sys_locale
  label: Get System Locale
  kind: action
  params: []

- id: patch_sys_locale
  label: Set System Locale
  kind: action
  params:
    - name: compliance_region
      type: string
    - name: compliance_regions
      type: array

- id: get_sys_indicate
  label: Get Indicate Status
  kind: action
  params: []

- id: patch_sys_indicate
  label: Indicate
  kind: action
  params:
    - name: identify
      type: integer

- id: get_sys_vitals
  label: Get System Vitals
  kind: action
  params: []

- id: delete_sys_vitals
  label: Delete System Vitals
  kind: action
  params: []

- id: get_debug_beau
  label: Get Debug Database
  kind: action
  params:
    - name: partition
      type: string
      description: "db, id, or state"

- id: get_debug_livelog
  label: Get Debug LiveLog
  kind: action
  params: []

- id: put_debug_livelog
  label: Set Debug LiveLog
  kind: action
  params:
    - name: ip
      type: string
    - name: port
      type: integer
    - name: keyphrase
      type: string

- id: get_debug_leds
  label: Get Debug LEDs
  kind: action
  params: []

- id: patch_debug_leds
  label: Set Debug LEDs
  kind: action
  params:
    - name: manual
      type: integer
    - name: value
      type: string
      description: Hex string of LED values

- id: get_debug_wifi
  label: Get Debug Wi-Fi Power
  kind: action
  params: []

- id: patch_debug_wifi
  label: Set Debug Wi-Fi Power
  kind: action
  params:
    - name: shutdown
      type: integer

- id: get_debug_rfman
  label: Get RF Manager
  kind: action
  params: []

- id: patch_debug_rfman
  label: Set RF Manager
  kind: action
  params:
    - name: log_signals
      type: boolean
    - name: silence_tx
      type: boolean

- id: delete_debug_rfman
  label: Reset RF Manager
  kind: action
  params: []
```

## Feedbacks
```yaml
# State variables observed via GET /v2/devices/{id}/state or BPUP push
- id: power_state
  type: enum
  values: [1, 0]
  description: "1=on, 0=off"

- id: speed_state
  type: integer
  description: "1 to max_speed"

- id: brightness_state
  type: integer
  description: "1-100%"

- id: light_state
  type: enum
  values: [1, 0]
  description: "1=on, 0=off"

- id: direction_state
  type: enum
  values: [1, -1]
  description: "1=forward, -1=reverse"

- id: breeze_state
  type: object
  description: "[mode, mean, var]"

- id: timer_state
  type: integer
  description: "seconds remaining, 0=no timer"

- id: color_temp_state
  type: integer
  description: "Kelvin"

- id: hsv_state
  type: object
  description: "{h: 0-359, s: 0-100, v: 0-100}"

- id: flame_state
  type: integer
  description: "1-100"

- id: heat_state
  type: integer
  description: "1-100"

- id: position_state
  type: integer
  description: "0-100"

- id: open_state
  type: enum
  values: [1, 0]
  description: "1=open, 0=closed"

- id: tilt_position_state
  type: integer
  description: "Degrees"

- id: blackout_position_state
  type: integer
  description: "0-100"

- id: sheer_position_state
  type: integer
  description: "0-100"

- id: upper_rail_position_state
  type: integer
  description: "0-100"

- id: lower_rail_position_state
  type: integer
  description: "0-100"

- id: up_light_state
  type: enum
  values: [1, 0]

- id: down_light_state
  type: enum
  values: [1, 0]

- id: up_light_brightness_state
  type: integer
  description: "1-100%"

- id: down_light_brightness_state
  type: integer
  description: "1-100%"

- id: fpfan_power_state
  type: enum
  values: [1, 0]

- id: fpfan_speed_state
  type: integer
  description: "1-100"

- id: battery_state
  type: integer
  description: "0-100%"

- id: signal_state
  type: integer
  description: "0-100 signal quality"
```

## Variables
```yaml
# Settable properties (read via GET /v2/devices/{id}/properties)
- id: max_speed
  type: integer
  description: "Read-only highest speed"

- id: max_color_temp
  type: integer
  description: "Kelvin maximum"

- id: min_color_temp
  type: integer
  description: "Kelvin minimum"

- id: default_auto_timer_s
  type: integer
  description: "Heater devices (HT) only"

- id: course_time
  type: integer
  description: "Milliseconds for full open/close, -1=unconfigured"

- id: min_tilt
  type: integer
  description: "Minimum tilt degrees (default 0)"

- id: max_tilt
  type: integer
  description: "Maximum tilt degrees (default 90)"

- id: open_raises
  type: boolean
  description: "Default true"

- id: open_retracts
  type: boolean
  description: "Default true"

- id: feature_light
  type: boolean
  description: "PATCHable"

- id: feature_up_down_light
  type: boolean
  description: "PATCHable"

- id: feature_brightness
  type: boolean
  description: "PATCHable"

- id: feature_heat
  type: boolean
  description: "PATCHable"

- id: low_end_trim
  type: integer
  description: "1-90% minimum brightness; PATCH null to restore factory default"

- id: trust_state
  type: boolean
  description: "Device property"

- id: addr
  type: string
  description: "Device property - remote address"

- id: freq
  type: integer
  description: "Device property - frequency in Hz"

- id: bps
  type: integer
  description: "Device property - baud rate"
```

## Events
```yaml
# BPUP UDP push notifications on port 30007
# Subscription: send newline to Bond UDP socket
- id: device_state_update
  type: object
  description: "BPUP push update format: {\"B\":\"BondID\",\"t\":\"devices/xx/state\",\"b\":{state vars}}"

- id: bpup_error
  type: object
  description: "BPUP error format: {\"B\":\"BondID\",\"err_id\":631,\"err_msg\":\"message\"}"

# MQTT topic structure
- id: mqtt_up
  type: object
  description: "Publishes to v2/{bond_id}/up/<subtopic>"
```

## Macros
```yaml
# Scenes API - multi-device action sequences
- id: run_scene
  label: Run Scene
  params:
    - name: scene_id
      type: string
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
Device types: CF (Ceiling Fan), FP (Fireplace), HT (Heater), MS (Motorized Shades), GX (Generic), SW (Smart Switch), LT (Light), BD (Bidet).

Action execution endpoint (`PUT /v2/devices/{id}/actions/{action}`) blocks up to 7 seconds for confirmation.

BPUP keep-alive every 60 seconds; Bond stops push after 125 seconds without keep-alive.

MQTT broker is trusted — token auth not required for MQTT.

Request ID (`_request_id`) enables retry-safe non-idempotent requests.

64-bit (16-hex) resource IDs in v3.0.0+; API accepts both 32-bit and 64-bit.

Device signal encoding: CQ format or hex. CQ uses `0`/`1` for single bits, `C`-`Q` for zero runs, `c`-`q` for one runs, `A`/`B` for 3-bit patterns.

<!-- UNRESOLVED: HTTP port not explicitly stated in source -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: token expiration/renewal policy not stated -->
<!-- UNRESOLVED: max concurrent connections or rate limits not stated -->

## Provenance

```yaml
source_domains:
  - docs-local.appbond.com
  - github.com
  - bondhome-product-docs.s3.amazonaws.com
source_urls:
  - https://docs-local.appbond.com/
  - https://github.com/bondhome/api-v2
  - "https://bondhome-product-docs.s3.amazonaws.com/BD-1000/%5BBond+Bridge%5D+Spec+Sheet.pdf"
retrieved_at: 2026-04-29T13:01:15.036Z
last_checked_at: 2026-05-14T18:17:14.785Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:14.785Z
matched_actions: 167
action_count: 182
confidence: medium
summary: "All 167 semantic-id actions map to documented REST API endpoints; transport parameters verified. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "port number not stated in source (HTTP defaults assumed)"
- "token expiration/renewal policy not stated"
- "no safety warnings or interlock procedures found in source"
- "HTTP port not explicitly stated in source"
- "firmware version compatibility ranges not stated"
- "max concurrent connections or rate limits not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
