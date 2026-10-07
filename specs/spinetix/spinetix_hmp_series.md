---
spec_id: admin/spinetix-hmp-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "SpinetiX HMP Series Control Spec"
manufacturer: SpinetiX
model_family: HMP400
aliases: []
compatible_with:
  manufacturers:
    - SpinetiX
  models:
    - HMP400
    - HMP400W
    - HMP350
    - HMP300
    - DiVA
    - iBX410
    - iBX410W
    - iBX440
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.spinetix.com
source_urls:
  - "https://support.spinetix.com/w/index.php?title=RPC_API"
  - "https://support.spinetix.com/w/index.php?title=Configuration_API"
  - "https://support.spinetix.com/w/index.php?title=Status_API"
  - "https://support.spinetix.com/w/index.php?title=Player_APIs"
retrieved_at: 2026-10-07T20:33:25.538Z
last_checked_at: 2026-10-07T20:33:25.538Z
generated_at: 2026-10-07T20:33:25.538Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "default HTTP/HTTPS port not explicitly stated"
  - "firmware version compatibility ranges not stated per command"
  - "default TCP port not stated in source (standard HTTP 80 / HTTPS 443 implied but not confirmed)"
  - "no discrete settable numeric parameters identified (set_config takes XML blob)"
  - "no multi-step sequences described in source"
  - "no explicit safety interlock procedures documented in source"
  - "default HTTP/HTTPS port not stated in source"
  - "firmware version compatibility range not stated; RPC API added in firmware 2.2.1"
  - "TLS/HTTPS configuration details not specified beyond mention of http(s)"
  - "RPC Concentrator connection configuration details not fully documented"
verification:
  verdict: verified
  checked_at: 2026-10-07T20:33:25.538Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 action units (19 actions plus 7 query feedbacks) match the 19 documented RPC commands, and transport values are supported. The source has no uncovered commands. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-14
---

# SpinetiX HMP Series Control Spec

## Summary
SpinetiX HMP media players are controlled via an HTTP-based JSON-RPC v1.0 API. Commands are sent as HTTP POST requests to the `/rpc` endpoint with content type `application/json`. The API supports device management, configuration, firmware updates, content publishing (Pull Mode), Wi-Fi management, and web storage operations. Players can also push event notifications to a configured RPC Concentrator.

<!-- UNRESOLVED: default HTTP/HTTPS port not explicitly stated -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated per command -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http://{player_address}/rpc
  # UNRESOLVED: default TCP port not stated in source (standard HTTP 80 / HTTPS 443 implied but not confirmed)
auth:
  type: basic
  description: HTTP Basic or TLS-SRP authentication. Most RPC methods require admin rights. CORS requests also require an API key via the spx-api-key query parameter.
  notes: >
    Access to the RPC endpoint is protected by default. The client must provide
    credentials of a user with appropriate rights. API key for CORS:
    http://{player_address}/rpc?spx-api-key={rpcApiKey}
```

## Traits
```yaml
traits:
  - powerable    # restart and shutdown commands present
  - queryable    # get_info, get_config, firmware_update_status, webstorage_get commands present
  - configurable # set_config command present
```

## Actions
```yaml
actions:
  - id: restart
    label: Restart Player
    kind: action
    description: Initiates a clean restart of the device one minute after the call is received
    params: []
    request_example:
      method: restart
      params: []
      id: 1
    response_example:
      result: {}
      error: null
      id: 1

  - id: shutdown
    label: Shutdown Player
    kind: action
    description: Initiates a clean shutdown of the device one minute after the call is received
    params: []

  - id: firmware_update
    label: Firmware Update
    kind: action
    description: Starts a firmware update process from SpinetiX server in the background. Returns a handle usable with firmware_update_status.
    params: []

  - id: set_config
    label: Set Configuration
    kind: action
    description: Sends a configuration string (partial or complete XML) to be applied onto the player
    params:
      - name: xmlconfig
        type: string
        description: XML configuration string
    request_example:
      method: set_config
      params:
        - xmlconfig: '<?xml version="1.0"?><configuration version="2.0">...</configuration>'
      id: 2

  - id: set_password
    label: Set Password
    kind: action
    description: Sets or removes the password for a user on the player
    params: []

  - id: reset
    label: Factory Reset
    kind: action
    description: Resets the player to factory default settings or selectively clears user content, network cache, web storage, clock calibration, or logs
    params: []

  - id: add_pull_action
    label: Add Pull Mode Action
    kind: action
    description: Sends a Pull Mode action to update HMP content
    params:
      - name: type
        type: string
        description: Action type (e.g. "publish")
      - name: uri
        type: string
        description: URI of the content to pull
    request_example:
      method: add_pull_action
      params:
        - type: publish
          uri: "http://demo.spinetix.com/sample_projects/Office/spx-listing.xml"
      id: "get office content"

  - id: webstorage_set
    label: Web Storage Set
    kind: action
    description: Sets the value of one or more items in the web storage (localStorage / Shared Variables). Does not apply to HMP300 and DiVA.
    params: []

  - id: webstorage_cmpxchg
    label: Web Storage Compare-And-Exchange
    kind: action
    description: Sets the value of one or more web storage items only if the current value matches an expected value. Does not apply to HMP300 and DiVA.
    params: []

  - id: webstorage_remove
    label: Web Storage Remove
    kind: action
    description: Removes one or more items from the web storage. Does not apply to HMP300 and DiVA.
    params: []

  - id: wifi_connect
    label: Wi-Fi Connect
    kind: action
    description: Instructs the player to connect to the provided Wi-Fi network
    params: []

  - id: wifi_disconnect
    label: Wi-Fi Disconnect
    kind: action
    description: Instructs the player to disconnect from the Wi-Fi network
    params: []

  - id: get_config
    label: Get Configuration
    kind: action
    description: Returns the device configuration, similar to the configuration backup feature.
    params: []

  - id: get_info
    label: Get Info
    kind: action
    description: Returns device info, such as: serial number, name, model, operation mode, firmware version, firmware status, up time, temperature, storage, etc.
    params: []

  - id: firmware_update_status
    label: Firmware Update Status
    kind: action
    description: Returns the status of a previously started firmware update process.
    params: []

  - id: webstorage_get
    label: Web Storage Get
    kind: action
    description: Gets the value of one or more items from the web storage.
    params: []

  - id: webstorage_list
    label: Web Storage List
    kind: action
    description: Gets the list of items currently available in the web storage.
    params: []

  - id: wifi_get_info
    label: Wi-Fi Get Info
    kind: action
    description: Returns information about the Wi-Fi networks configured on the player.
    params: []

  - id: wifi_scan
    label: Wi-Fi Scan
    kind: action
    description: Triggers a scan for Wi-Fi networks.
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: device_info
    type: object
    description: Device info returned by get_info including serial number, name, model, operation mode, firmware version, firmware status, up time, temperature, storage, etc.
    query_command: get_info

  - id: device_config
    type: object
    description: Device configuration returned by get_config, similar to the configuration backup feature
    query_command: get_config

  - id: firmware_update_status
    type: object
    description: Status of a previously started firmware update process
    query_command: firmware_update_status

  - id: webstorage_get
    type: object
    description: Value of one or more items from the web storage. Does not apply to HMP300 and DiVA.
    query_command: webstorage_get

  - id: webstorage_list
    type: array
    description: List of items currently available in the web storage. Does not apply to HMP300 and DiVA.
    query_command: webstorage_list

  - id: wifi_info
    type: object
    description: Information about the Wi-Fi networks configured on the player
    query_command: wifi_get_info

  - id: wifi_scan_results
    type: array
    description: Results of a Wi-Fi network scan triggered by wifi_scan
    query_command: wifi_scan
```

## Variables
```yaml
# UNRESOLVED: no discrete settable numeric parameters identified (set_config takes XML blob)
```

## Events
```yaml
events:
  - id: ready
    description: Heartbeat-like notification sent each time the player contacts the RPC Concentrator. Can convey the response to previous RPC calls. Includes player serial number.

  - id: restarted
    description: Notification sent upon player restart containing the time at which the player restarted. Includes player serial number.

  - id: info
    description: Periodic notification returning the same information as get_info at predefined intervals. Includes player serial number.

  - id: pull_status
    description: Notification sent to the RPC Concentrator when a Pull Mode action is completed. Includes player serial number.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - restart    # restart takes effect after a 1-minute delay
  - shutdown   # shutdown takes effect after a 1-minute delay
  - reset      # factory reset is destructive
interlocks: []
# UNRESOLVED: no explicit safety interlock procedures documented in source
```

## Notes
- The RPC API is based on JSON-RPC v1.0 over HTTP POST. Each request is a JSON object with `method`, `params` (array), and `id` fields. Responses contain `result`, `error`, `id`, and optionally `errorDetails` (firmware 4.7.1+).
- RPC commands can be sent via three mechanisms: direct HTTP POST to `/rpc`, indirect RPC via the `ready` notification (player-initiated, useful behind firewalls/NAT), and inline RPC within ICS Pull Mode files.
- The `errorDetails` property (firmware 4.7.1+) contains `code` and `data` fields for additional error information.
- The `webstorage_*` commands do not apply to HMP300 and DiVA models.
- CORS support was added in firmware 3.0.5. CSRF protection via `spx-api-key` was added in firmware 4.2.0/3.4.0.
- The `Authorization` header support was added in firmware 4.5.0.
- For legacy players (HMP200, HMP130, HMP100), document revision 2.3 applies.

<!-- UNRESOLVED: default HTTP/HTTPS port not stated in source -->
<!-- UNRESOLVED: firmware version compatibility range not stated; RPC API added in firmware 2.2.1 -->
<!-- UNRESOLVED: TLS/HTTPS configuration details not specified beyond mention of http(s) -->
<!-- UNRESOLVED: RPC Concentrator connection configuration details not fully documented -->

## Provenance

```yaml
source_domains:
  - support.spinetix.com
source_urls:
  - "https://support.spinetix.com/w/index.php?title=RPC_API"
  - "https://support.spinetix.com/w/index.php?title=Configuration_API"
  - "https://support.spinetix.com/w/index.php?title=Status_API"
  - "https://support.spinetix.com/w/index.php?title=Player_APIs"
retrieved_at: 2026-10-07T20:33:25.538Z
last_checked_at: 2026-10-07T20:33:25.538Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:33:25.538Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 action units (19 actions plus 7 query feedbacks) match the 19 documented RPC commands, and transport values are supported. The source has no uncovered commands. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "default HTTP/HTTPS port not explicitly stated"
- "firmware version compatibility ranges not stated per command"
- "default TCP port not stated in source (standard HTTP 80 / HTTPS 443 implied but not confirmed)"
- "no discrete settable numeric parameters identified (set_config takes XML blob)"
- "no multi-step sequences described in source"
- "no explicit safety interlock procedures documented in source"
- "default HTTP/HTTPS port not stated in source"
- "firmware version compatibility range not stated; RPC API added in firmware 2.2.1"
- "TLS/HTTPS configuration details not specified beyond mention of http(s)"
- "RPC Concentrator connection configuration details not fully documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
