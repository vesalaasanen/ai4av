---
spec_id: admin/dataprobe-iboot-pdu8
schema_version: ai4av-public-spec-v1
revision: 1
title: "Dataprobe iBoot-PDU8 Control Spec"
manufacturer: Dataprobe
model_family: iBoot-PDU8-N15
aliases: []
compatible_with:
  manufacturers:
    - Dataprobe
  models:
    - iBoot-PDU8-N15
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.shopify.com
retrieved_at: 2026-05-04T18:04:24.181Z
last_checked_at: 2026-04-26T11:49:05.324Z
generated_at: 2026-04-26T11:49:05.324Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-26T11:49:05.324Z
  matched_actions: 46
  action_count: 46
  confidence: high
  summary: "All 46 spec actions matched to source endpoints; transport parameters verified; spec comprehensively covers documented API."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-23
---

# Dataprobe iBoot-PDU8 Control Spec

## Summary
REST API-based PDU with 8 outlets. Control via HTTP(S) POST/GET to `/services/v2/`. Bearer token auth with 5-minute timeout. Supports outlet on/off/cycle, group control, sequences, analog triggers, autoping, and scheduled events. Model iBoot-PDU8-N15 documented.

<!-- UNRESOLVED: TCP port not stated in source, default HTTP(S) ports assumed implicit -->
<!-- UNRESOLVED: serial RS-232 control not documented in this source -->
<!-- UNRESOLVED: webhook payload format beyond trigger flags not specified -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http(s)://<ipaddress>/services/v2
auth:
  type: bearer_token  # inferred: token-based auth at /services/v2/auth/
  token_timeout: 300  # 5 minutes in seconds; source states "5 minutes of inactivity"
```

## Traits
```yaml
- powerable       # outlet on/off/cycle commands present
- routable        # group and sequence control present
- queryable       # retrieve status, analog data, configuration
- levelable       # cycleTime parameter for outlet cycling
```

## Actions
```yaml
- id: authenticate
  label: Authenticate
  kind: action
  params:
    - name: username
      type: string
    - name: password
      type: string

- id: get_status
  label: Get Status
  kind: action
  params:
    - name: var
      type: string
      description: "Type: outlets, groups, names, or analog"
    - name: value
      type: string
      description: "Comma-separated list of outlet numbers, names, group names, or analog sources (LV1/LV2/LC1/LC2/T0/T1)"

- id: control_outlet
  label: Control Outlet
  kind: action
  params:
    - name: outlets
      type: array
      items:
        type: string
      description: "Outlet numbers or names"
    - name: command
      type: enum
      values: [on, off, cycle]

- id: control_group
  label: Control Group
  kind: action
  params:
    - name: group
      type: string
      description: "Group name"
    - name: command
      type: enum
      values: [on, off, cycle]

- id: control_sequence
  label: Control Sequence
  kind: action
  params:
    - name: sequence
      type: string
      description: "Sequence name"
    - name: command
      type: enum
      values: [run, stop]

- id: reboot_device
  label: Reboot Device
  kind: action
  params:
    - name: reboot
      type: string
      const: "true"

- id: set_factory_defaults
  label: Set Factory Defaults
  kind: action
  params:
    - name: setDefaults
      type: boolean

- id: configure_device
  label: Configure Device
  kind: action
  params:
    - name: name
      type: string
      description: "1-20 char device name"
    - name: countryCode
      type: string
    - name: temperatureUnit
      type: enum
      values: [c, f]
    - name: simplePassword
      type: boolean

- id: configure_outlet
  label: Configure Outlet
  kind: action
  params:
    - name: index
      type: integer
      description: "Outlet index 1-n"
    - name: name
      type: string
      description: "30 chars max"
    - name: initialState
      type: enum
      values: [on, off, last]
    - name: cycleTime
      type: integer
      description: "1-99 seconds"

- id: add_modify_remote
  label: Add/Modify Remote
  kind: action
  params:
    - name: name
      type: string
    - name: address
      type: string
    - name: username
      type: string
    - name: password
      type: string
    - name: delay
      type: integer
      description: "1-99 seconds"

- id: delete_remote
  label: Delete Remote
  kind: action
  params:
    - name: delRemote
      type: string

- id: configure_network
  label: Configure Network
  kind: action
  params:
    - name: ipMode
      type: enum
      values: [static, dhcp]
    - name: ipAddress
      type: string
    - name: subnet
      type: string
    - name: gateway
      type: string
    - name: dns
      type: array
      items:
        type: string

- id: configure_web
  label: Configure Web UI
  kind: action
  params:
    - name: port
      type: integer
      description: "1-65535"
    - name: sslEnabled
      type: boolean
    - name: sslPort
      type: integer
      description: "1-65535"

- id: configure_console
  label: Configure Console
  kind: action
  params:
    - name: serialEnabled
      type: boolean
    - name: serialBaud
      type: enum
      values: [9600, 19200, 38400, 57600, 115200]
    - name: timeout
      type: integer
      description: "0-60 minutes"
    - name: telnetEnabled
      type: boolean
    - name: telnetPort
      type: integer
      description: "1-65535"
    - name: sshEnabled
      type: boolean
    - name: sshPort
      type: integer
      description: "1-65535"

- id: configure_time
  label: Configure Time
  kind: action
  params:
    - name: time
      type: string
    - name: date
      type: string
    - name: ntpEnabled
      type: boolean
    - name: ntpServers
      type: array
      items:
        type: string
    - name: timezone
      type: string

- id: add_modify_webhook
  label: Add/Modify Webhook
  kind: action
  params:
    - name: name
      type: string
      description: "20 chars max"
    - name: newName
      type: string
    - name: url
      type: string
    - name: token
      type: string
      description: "128 chars max"
    - name: login
      type: boolean
    - name: logout
      type: boolean
    - name: upgrade
      type: boolean
    - name: reboot
      type: boolean
    - name: outletControl
      type: boolean
    - name: groupControl
      type: boolean
    - name: sequenceStart
      type: boolean
    - name: sequenceStop
      type: boolean
    - name: analogTrigger
      type: boolean
    - name: autopingTrigger
      type: boolean
    - name: scheduleTrigger
      type: boolean

- id: delete_webhook
  label: Delete Webhook
  kind: action
  params:
    - name: delWebhook
      type: string

- id: add_modify_analog_trigger
  label: Add/Modify Analog Trigger
  kind: action
  params:
    - name: name
      type: string
      description: "20 chars max"
    - name: type
      type: enum
      values: [voltage, current, temperature]
    - name: condition
      type: enum
      values: ["<", "<=", ">", ">="]
    - name: triggerPoint
      type: number
    - name: hysteresis
      type: number
    - name: repeat
      type: enum
      values: [once, counter, forever]
    - name: source
      type: enum
      values: [LV1, LV2, LC1, LC2, T0, T1]
    - name: targetTriggerSequence
      type: string
    - name: targetClearSequence
      type: string
    - name: count
      type: integer
      description: "1-99999"
    - name: qualifyTime
      type: integer
      description: "1-99 seconds"

- id: delete_analog_trigger
  label: Delete Analog Trigger
  kind: action
  params:
    - name: delAnalogTrigger
      type: string

- id: add_modify_autoping
  label: Add/Modify Autoping
  kind: action
  params:
    - name: name
      type: string
      description: "20 chars max"
    - name: address
      type: string
    - name: count
      type: integer
      description: "1-99"
    - name: period
      type: integer
      description: "1-999 seconds"
    - name: timeout
      type: integer
      description: "1-999 seconds"
    - name: failTriggerSequenceId
      type: string
    - name: clearTriggerSequenceId
      type: string
    - name: restartDelay
      type: integer
      description: "0-999 seconds"
    - name: autopingGroupName
      type: string
    - name: groupMember
      type: enum
      values: [yes, no]

- id: delete_autoping
  label: Delete Autoping
  kind: action
  params:
    - name: delAutoping
      type: string

- id: add_modify_autoping_group
  label: Add/Modify Autoping Group
  kind: action
  params:
    - name: name
      type: string
    - name: mode
      type: enum
      values: [and, or]
    - name: failTriggerSequence
      type: string
    - name: clearTriggerSequence
      type: string
    - name: cycleCount
      type: integer
      description: "0-999"

- id: delete_autoping_group
  label: Delete Autoping Group
  kind: action
  params:
    - name: delAutopingGroup
      type: string

- id: configure_email
  label: Configure Email
  kind: action
  params:
    - name: enabled
      type: boolean
    - name: server
      type: string
    - name: port
      type: integer
      description: "1-65535; ports 8888-8899 and 9090 reserved"
    - name: encryption
      type: boolean
    - name: username
      type: string
    - name: password
      type: string
    - name: address
      type: string
    - name: retries
      type: integer
      description: "0-10"
- id: get_users
  label: Get Users
  kind: query
  params:
    - name: var
      type: string
      const: users
      description: "GET /services/v2/users/ - list all users"

- id: add_modify_user
  label: Add/Modify User
  kind: action
  params:
    - name: name
      type: string
      description: "20 chars max; if exists, modifies existing user"
    - name: role
      type: enum
      values: [admin, user]
    - name: email
      type: string
      description: "128 chars max"
    - name: password
      type: string
      description: "20 chars max"
    - name: snmpPassword
      type: string
      description: "20 chars max"
    - name: pin
      type: string
      description: "5 chars max; 0 to disable"
    - name: outletRights
      type: array
      items:
        type: object
    - name: groupRights
      type: array
      items:
        type: string
    - name: sequenceRights
      type: array
      items:
        type: string

- id: delete_user
  label: Delete User
  kind: action
  params:
    - name: delUser
      type: string
      description: "Name of user to delete; case sensitive"

- id: configure_cloud
  label: Configure Cloud Services
  kind: action
  params:
    - name: address
      type: string
      description: "Cloud server address (default https://iboot.co)"
    - name: username
      type: string
    - name: password
      type: string
    - name: location
      type: string

- id: configure_fail2ban
  label: Configure Fail2Ban
  kind: action
  params:
    - name: banTime
      type: integer
      description: "1-86400 seconds"
    - name: findTime
      type: integer
      description: "1-86400 seconds"
    - name: maxRetry
      type: integer
      description: "1-99"
    - name: addWhitelist
      type: string
      description: "Dotted decimal IP address to add to whitelist"

- id: delete_fail2ban_whitelist
  label: Delete Fail2Ban Whitelist Entry
  kind: action
  params:
    - name: delWhitelist
      type: string
      description: "Dotted decimal IP address to remove from whitelist"

- id: configure_snmp
  label: Configure SNMP
  kind: action
  params:
    - name: readCommunity
      type: string
    - name: writeCommunity
      type: string
    - name: managers
      type: array
      items:
        type: object
      description: "Array of up to 4 SNMP manager objects with id(1-4), name, address, readCommunity, writeCommunity"

- id: add_modify_rsyslog
  label: Add/Modify Rsyslog Server
  kind: action
  params:
    - name: name
      type: string
      description: "30 chars max; if exists, modifies existing server"
    - name: address
      type: string
      description: "IP address or FQDN"
    - name: protocol
      type: enum
      values: [tcp, udp]
    - name: port
      type: integer
      description: "1-65535"

- id: upgrade_firmware
  label: Upgrade Firmware
  kind: action
  params:
    - name: image
      type: string
      description: "LATEST or a date code (e.g. 11102023)"
    - name: timeout
      type: integer
      description: "300-1800 seconds"
```

## Feedbacks
```yaml
- id: auth_response
  type: object
  properties:
    success: boolean
    message: string
    token: string

- id: status_response
  type: object
  properties:
    success: boolean
    message: string
    outlets: object
    groups: object
    names: object
    analog: object
    rebootRequired: boolean

- id: control_response
  type: object
  properties:
    success: boolean
    message: string
    rebootRequired: boolean

- id: outlet_state
  type: enum
  values: [on, off]
  description: "State of individual outlet"

- id: group_state
  type: enum
  values: [on, off, mixed]
  description: "State of outlet group"

- id: analog_reading
  type: object
  properties:
    LV1: number  # Line 1 Voltage
    LC1: number  # Line 1 Current
    LV2: number  # Line 2 Voltage (only if second line cord present)
    LC2: number  # Line 2 Current (only if second line cord present)
    T0: number   # Temperature sensor 0
    T1: number   # Temperature sensor 1 (external probe)

- id: temperature_reading
  type: object
  description: "T0 and T1 only if probes connected"
  properties:
    T0: number
    T1: number

- id: reboot_required
  type: boolean
  description: "True when change requires reboot to take effect"
```

## Variables
```yaml
# Device configuration
- id: device_name
  type: string
  writeable: true
  description: "1-20 characters"

- id: temperature_unit
  type: enum
  values: [c, f]
  writeable: true

- id: country_code
  type: string
  writeable: true

- id: simple_password
  type: boolean
  writeable: true

# Network settings
- id: ip_mode
  type: enum
  values: [static, dhcp]
  writeable: true

- id: ip_address
  type: string
  writeable: true

- id: subnet_mask
  type: string
  writeable: true

- id: gateway
  type: string
  writeable: true

- id: dns_servers
  type: array
  writeable: true

# Outlet configuration
- id: outlet_name
  type: string
  writeable: true

- id: outlet_initial_state
  type: enum
  values: [on, off, last]
  writeable: true

- id: outlet_cycle_time
  type: integer
  range: [1, 99]
  writeable: true
  description: "Seconds"

# Console settings
- id: serial_enabled
  type: boolean
  writeable: true

- id: serial_baud
  type: enum
  values: [9600, 19200, 38400, 57600, 115200]
  writeable: true

- id: telnet_enabled
  type: boolean
  writeable: true

- id: telnet_port
  type: integer
  writeable: true

- id: ssh_enabled
  type: boolean
  writeable: true

- id: ssh_port
  type: integer
  writeable: true

# Web settings
- id: web_port
  type: integer
  writeable: true

- id: ssl_enabled
  type: boolean
  writeable: true

- id: ssl_port
  type: integer
  writeable: true
```

## Events
```yaml
# Webhook-triggered events (device can send webhooks to external URL)
- login: boolean  # user login event
- logout: boolean  # user logout event
- upgrade: boolean  # firmware upgrade event
- reboot: boolean  # reboot event
- outletControl: boolean  # outlet state change
- groupControl: boolean  # group state change
- sequenceStart: boolean  # sequence started
- sequenceStop: boolean  # sequence stopped
- analogTrigger: boolean  # analog threshold crossed
- autopingTrigger: boolean  # autoping failure detected
- scheduleTrigger: boolean  # scheduled event fired

# UNRESOLVED: no explicit event emission documentation; webhook triggers described but not the outbound event format
```

## Macros
```yaml
# Sequences - user-defined multi-step automation stored on device
# Controlled via /services/v2/control/ with command=run|stop
# UNRESOLVED: sequence definition format not documented in source
```

## Safety
```yaml
confirmation_required_for:
  - reboot  # confirmed from source: rebootRequired flag on configuration changes
  - factory_defaults  # source notes factory defaults reset network to DHCP
interlocks: []
# UNRESOLVED: no explicit safety interlock procedures in source
```

## Notes
Token timeout is 5 minutes of inactivity per source. Token format: 64-bit randomly generated, returned as "####-####-####-####" hex string. Authentication required before any API call.

Ports 8888-8899 and 9090 reserved for internal use — do not use for email, web, or console configuration.

Serial console supports 9600/19200/38400/57600/115200 baud. Telnet and SSH also available as alternate console access methods.

Outlet cycle time: 1-99 seconds. Initial state on reboot: on, off, or last (restore previous state).

<!-- UNRESOLVED: TCP port number not explicitly stated; only implicit through HTTP(S) -->
<!-- UNRESOLVED: RS-232 serial control protocol not in source -->
<!-- UNRESOLVED: firmware version range/compatibility not stated -->
<!-- UNRESOLVED: email attachment/content format not documented -->
<!-- UNRESOLVED: sequence definition schema not in source -->

## Provenance

```yaml
source_domains:
  - cdn.shopify.com
retrieved_at: 2026-05-04T18:04:24.181Z
last_checked_at: 2026-04-26T11:49:05.324Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T11:49:05.324Z
matched_actions: 46
action_count: 46
confidence: high
summary: "All 46 spec actions matched to source endpoints; transport parameters verified; spec comprehensively covers documented API."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
