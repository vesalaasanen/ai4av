---
spec_id: admin/adder-aim
schema_version: ai4av-public-spec-v1
revision: 1
title: "Adder AIM Control Spec"
manufacturer: Adder
model_family: "AIM Manager"
aliases: []
compatible_with:
  manufacturers:
    - Adder
  models:
    - "AIM Manager"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.adder.com
source_urls:
  - "https://support.adder.com/tiki/tiki-index.php?page=ALIF%3A%20AIM%20API"
retrieved_at: 2026-04-30T04:40:32.650Z
last_checked_at: 2026-05-14T18:17:13.857Z
generated_at: 2026-05-14T18:17:13.857Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "physical transport port number not stated in source; no RS-232 or serial control documented"
  - "no settable runtime parameters documented in source"
  - "no unsolicited event notifications documented in source"
  - "no multi-step macro sequences documented in source"
  - "no safety warnings or interlock procedures in source"
  - "physical HTTP port number (default 80/443) not stated in source"
  - "no RS-232 serial control documented"
  - "API version compatibility ranges not fully enumerated in source"
  - "error code字典 not provided in source beyond example codes 2, 3, 9, 17, 210, 231"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:13.857Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 30 spec actions matched their documented API method counterparts; transport base URL and auth type verified against source. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Adder AIM Control Spec

## Summary
The Adder AIM (ALIF) is a KVM-over-IP matrix switching system. The AIM API is an HTTP REST interface available at `http://<IPADDRESS>/api` providing access to device management, channel/preset configuration, and receiver/transmitter connectivity control. Token-based authentication is used; anonymous login is supported.

<!-- UNRESOLVED: physical transport port number not stated in source; no RS-232 or serial control documented -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://{ipaddress}/api"  # IP address is the AIM Manager IP
auth:
  type: token  # token returned by login method; anonymous login available
```

## Traits
```yaml
- queryable  # inferred from get_devices, get_channels, get_presets, disk_usage methods
- routable   # inferred from connect_channel, disconnect_channel, connect_preset, disconnect_preset methods
```

## Actions
```yaml
- id: login
  label: Login
  kind: action
  params:
    - name: username
      type: string
    - name: password
      type: string
    - name: v
      type: integer
      description: API version (e.g. 1)

- id: logout
  label: Logout
  kind: action
  params:
    - name: token
      type: string
    - name: v
      type: integer

- id: logout_device
  label: Logout Device
  kind: action
  params:
    - name: token
      type: string
    - name: v
      type: integer
    - name: rx_id
      type: integer
      description: Receiver ID

- id: connect_channel
  label: Connect Channel
  kind: action
  params:
    - name: token
      type: string
    - name: v
      type: integer
    - name: c_id
      type: integer
      description: Channel ID
    - name: rx_id
      type: integer
      description: Receiver ID
    - name: mode
      type: string
      description: "Connection mode: v=video-only, s=shared, e=exclusive, p=private (default: s)"

- id: connect_preset
  label: Connect Preset
  kind: action
  params:
    - name: token
      type: string
    - name: v
      type: integer
    - name: id
      type: integer
      description: Preset ID
    - name: mode
      type: string
      description: "Connection mode: v=video-only, s=shared, e=exclusive, p=private (default: s)"
    - name: force
      type: integer
      description: "0=abort on error, 1=ignore errors (default: 0)"

- id: disconnect_channel
  label: Disconnect Channel
  kind: action
  params:
    - name: token
      type: string
    - name: v
      type: integer
    - name: rx_id
      type: integer
      description: "Receiver ID(s), integer or comma-separated. Omit to disconnect all."
    - name: force
      type: integer
      description: "0=disconnect own online connections, 1=force disconnect all"

- id: disconnect_preset
  label: Disconnect Preset
  kind: action
  params:
    - name: token
      type: string
    - name: v
      type: integer
    - name: id
      type: integer
      description: "Preset ID. Omit to disconnect all."
    - name: force
      type: integer

- id: create_preset
  label: Create Preset
  kind: action
  params:
    - name: token
      type: string
    - name: v
      type: integer
    - name: name
      type: string
      description: Preset display name
    - name: pairs
      type: string
      description: "Comma-separated channel-receiver pairs (e.g. 1-1,1-2)"
    - name: allowed
      type: string
      description: "Permitted modes: v=video-only, s=shared, e=exclusive, p=private"

- id: delete_preset
  label: Delete Preset
  kind: action
  params:
    - name: token
      type: string
    - name: v
      type: integer
    - name: id
      type: integer
      description: Preset ID

- id: create_channel
  label: Create Channel
  kind: action
  params:
    - name: token
      type: string
    - name: v
      type: integer
    - name: name
      type: string
    - name: desc
      type: string
      description: Channel description (optional)
    - name: loc
      type: string
      description: Channel location (optional)
    - name: allowed
      type: string
      description: "Permitted modes: v=video-only, s=shared, e=exclusive, p=private"
    - name: video1
      type: integer
      description: Video source 1 device ID (optional)
    - name: video1head
      type: integer
      description: Video head number (default 1)
    - name: video2
      type: integer
      description: Video source 2 device ID (optional)
    - name: audio
      type: integer
      description: Audio source device ID (optional)
    - name: usb
      type: integer
      description: USB source device ID (optional)
    - name: serial
      type: integer
      description: Serial source device ID (optional)
    - name: groupname
      type: string
      description: Channel group name (optional)

- id: delete_channel
  label: Delete Channel
  kind: action
  params:
    - name: token
      type: string
    - name: v
      type: integer
    - name: id
      type: integer
      description: Channel ID

- id: update_device
  label: Update Device
  kind: action
  params:
    - name: token
      type: string
    - name: v
      type: integer
    - name: id
      type: integer
      description: Device ID
    - name: desc
      type: string
      description: Device description (use _ to delete)
    - name: loc
      type: string
      description: Device location (use _ to delete)

- id: promote
  label: Promote Backup to Primary
  kind: action
  params:
    - name: token
      type: string
    - name: v
      type: integer

- id: reboot_devices
  label: Reboot Devices
  kind: action
  params:
    - name: token
      type: string
    - name: v
      type: integer
    - name: ids
      type: string
      description: Comma-separated device IDs

- id: replace_device
  label: Replace Device
  kind: action
  params:
    - name: token
      type: string
    - name: v
      type: integer
    - name: d_id
      type: integer
      description: Device ID to replace
    - name: r_d_id
      type: integer
      description: Replacement device ID

- id: identify_device
  label: Identify Device
  kind: action
  params:
    - name: token
      type: string
    - name: v
      type: integer
    - name: id
      type: integer
      description: Device ID

- id: delete_c_usb
  label: Delete C-USB Extender
  kind: action
  params:
    - name: token
      type: string
    - name: v
      type: integer
    - name: mac
      type: string
      description: C-USB LAN extender MAC address

- id: update_c_usb
  label: Update C-USB Extender
  kind: action
  params:
    - name: token
      type: string
    - name: v
      type: integer
    - name: mac
      type: string
    - name: name
      type: string

- id: connect_c_usb
  label: Connect C-USB Extender
  kind: action
  params:
    - name: token
      type: string
    - name: v
      type: integer
    - name: rx
      type: string
      description: Receiver MAC address
    - name: tx
      type: string
      description: Transmitter MAC address

- id: disconnect_c_usb
  label: Disconnect C-USB Extender
  kind: action
  params:
    - name: token
      type: string
    - name: v
      type: integer
    - name: mac
      type: string
      description: Receiver MAC address
- id: get_devices
  label: Get Devices
  kind: query
  params:
    - name: token
      type: string
    - name: v
      type: integer
    - name: device_type
      type: string
      description: "'rx' = receivers, 'tx' = transmitters. Default = 'rx'"
    - name: filter_d_name
      type: string
      description: Optional. Device name search string
    - name: filter_d_description
      type: string
      description: Optional. Device description search string
    - name: filter_d_location
      type: string
      description: Optional. Device location search string
    - name: sort
      type: string
      description: "Optional. Sort results by 'name'/'description'/'location'. Default = 'name'"
    - name: sort_dir
      type: string
      description: "Optional. Sort direction 'asc'/'desc'. Default = 'asc'"
    - name: status
      type: string
      description: Optional. Device status filter
    - name: show_all
      type: string
      description: Optional. If set, shows all receivers not just permitted ones
    - name: page
      type: integer
      description: Page number, default = 1
    - name: results_per_page
      type: integer
      description: Number of results per page, default = 1000

- id: disk_usage
  label: Disk Usage
  kind: query
  params:
    - name: token
      type: string
    - name: v
      type: integer

- id: get_channels
  label: Get Channels
  kind: query
  params:
    - name: token
      type: string
    - name: v
      type: integer
    - name: page
      type: integer
      description: Page number, default = 1
    - name: results_per_page
      type: integer
      description: Number of results per page, default = 1000
    - name: device_id
      type: integer
      description: ID of the receiver for connection mode availability checks
    - name: filter_c_name
      type: string
      description: Channel name search string
    - name: filter_c_description
      type: string
      description: Channel description search string
    - name: filter_c_location
      type: string
      description: Channel location search string
    - name: filter_favourites
      type: string
      description: Set non-empty to show only favourites

- id: get_presets
  label: Get Presets
  kind: query
  params:
    - name: token
      type: string
    - name: v
      type: integer
    - name: results_per_page
      type: integer
      description: Number of results per page, default = 1000
    - name: page
      type: integer
      description: Page number, default = 1

- id: get_all_c_usb
  label: Get All C-USB Extenders
  kind: query
  params:
    - name: token
      type: string
    - name: v
      type: integer

- id: get_servers
  label: Get Servers
  kind: query
  params:
    - name: token
      type: string
    - name: v
      type: integer
    - name: page
      type: integer
      description: Page number, default = 1
    - name: results_per_page
      type: integer
      description: Number of results per page, default = 1000
```

## Feedbacks
```yaml
- id: login_response
  type: object
  fields:
    - timestamp
    - version
    - token
    - success

- id: device_list
  type: array
  description: "Array of device objects; fields include d_id, d_name, d_type (rx/tx), d_online, d_status, d_firmware, d_ip_address, d_mac_address, and connection info for receivers"

- id: channel_list
  type: array
  description: "Array of channel objects; fields include c_id, c_name, c_description, c_location, c_favourite, view_button/shared_button/control_button/exclusive_button status"

- id: preset_list
  type: array
  description: "Array of preset objects; fields include cp_id, cp_name, cp_description, cp_active, view_button/shared_button/control_button/exclusive_button status"

- id: disk_usage_response
  type: object
  fields:
    - mainUsedPercent
    - backupUsedPercent
    - dbsize
    - dbeventlogsize
    - backupssize
    - firmwaresize
    - aimupgradesize

- id: server_list
  type: array
  description: "Array of AIM server objects; fields include name, role (primary/backup/solo), status (active/standby/failed), ip, mac"

- id: c_usb_list
  type: array
  description: "Array of C-USB LAN extender objects; fields include mac, type (rx/tx), name, online, ip, connectedTo"

- id: success_flag
  type: enum
  values: [0, 1]
  description: "0=fail, 1=success"

- id: error_response
  type: object
  fields:
    - code
    - msg
```

## Variables
```yaml
# UNRESOLVED: no settable runtime parameters documented in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- API base path is `http://<IPADDRESS>/api` where IPADDRESS is the AIM Manager IP
- Token returned by `login` must be passed in all subsequent requests; valid until `logout` is called
- Anonymous login is supported: omit username/password to get an anonymous token
- Connection modes: `v`=video-only, `s`=shared, `e`=exclusive, `p`=private
- Device types: `rx`=receiver, `tx`=transmitter
- API version is passed via `v` parameter in each request
- Many methods require admin privileges (`create_preset`, `delete_preset`, `create_channel`, `delete_channel`, `update_device`, `promote`, `delete_c_usb`, `update_c_usb`)
- `disconnect_channel` with no `rx_id` disconnects all connections for the authenticated user
- `disconnect_preset` with no `id` disconnects all connections in the AIM network
- `connect_c_usb` requires both receiver and transmitter to be disconnected first
<!-- UNRESOLVED: physical HTTP port number (default 80/443) not stated in source -->
<!-- UNRESOLVED: no RS-232 serial control documented -->
<!-- UNRESOLVED: API version compatibility ranges not fully enumerated in source -->
<!-- UNRESOLVED: error code字典 not provided in source beyond example codes 2, 3, 9, 17, 210, 231 -->

## Provenance

```yaml
source_domains:
  - support.adder.com
source_urls:
  - "https://support.adder.com/tiki/tiki-index.php?page=ALIF%3A%20AIM%20API"
retrieved_at: 2026-04-30T04:40:32.650Z
last_checked_at: 2026-05-14T18:17:13.857Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:13.857Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 30 spec actions matched their documented API method counterparts; transport base URL and auth type verified against source. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "physical transport port number not stated in source; no RS-232 or serial control documented"
- "no settable runtime parameters documented in source"
- "no unsolicited event notifications documented in source"
- "no multi-step macro sequences documented in source"
- "no safety warnings or interlock procedures in source"
- "physical HTTP port number (default 80/443) not stated in source"
- "no RS-232 serial control documented"
- "API version compatibility ranges not fully enumerated in source"
- "error code字典 not provided in source beyond example codes 2, 3, 9, 17, 210, 231"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
