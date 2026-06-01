---
spec_id: admin/adder-infinity-management-server
schema_version: ai4av-public-spec-v1
revision: 1
title: "Adder Infinity Management Server Control Spec"
manufacturer: Adder
model_family: "Infinity Management Server"
aliases: []
compatible_with:
  manufacturers:
    - Adder
  models:
    - "Infinity Management Server"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.adder.com
source_urls:
  - "https://support.adder.com/tiki/tiki-index.php?page=ALIF%3A%20AIM%20API"
retrieved_at: 2026-05-04T18:05:14.063Z
last_checked_at: 2026-05-27T06:52:01.446Z
generated_at: 2026-05-27T06:52:01.446Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-27T06:52:01.446Z
  matched_actions: 26
  action_count: 26
  confidence: high
  summary: "All 26 spec methods match source API catalog 1:1; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Adder Infinity Management Server Control Spec

## Summary
The AIM Server exposes a REST API at `http://<IPADDRESS>/api` for managing KVM extenders, channels, presets, and C-USB LAN network extenders. Token-based auth; login returns a session token reused across requests. Manages receiver (rx) and transmitter (tx) devices, channel-to-receiver mappings, connection presets, and high-availability server pairs.

<!-- UNRESOLVED: physical connectivity (RS-232/USB local config) not documented in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http://<IPADDRESS>/api  # IP address set via DHCP/static on AIM web interface
auth:
  type: token  # login returns token; token reused per best-practice note in source
```

## Traits
```yaml
- queryable  # inferred: get_devices, get_channels, get_presets, disk_usage, get_servers return state
- routable   # inferred: connect_channel, disconnect_channel, connect_preset, disconnect_preset manage routing
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
      description: "rx (receivers) or tx (transmitters). Default = rx"
    - name: filter_d_name
      type: string
      description: Device name search string
    - name: filter_d_description
      type: string
    - name: filter_d_location
      type: string
    - name: sort
      type: string
      description: "name/description/location. Default = name"
    - name: sort_dir
      type: string
      description: "asc/desc. Default = asc"
    - name: status
      type: string
    - name: show_all
      type: string
    - name: page
      type: integer
    - name: results_per_page
      type: integer

- id: disk_usage
  label: Get Disk Usage
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
    - name: results_per_page
      type: integer
    - name: device_id
      type: integer
      description: Receiver ID
    - name: filter_c_name
      type: string
    - name: filter_c_description
      type: string
    - name: filter_c_location
      type: string
    - name: filter_favourites
      type: string

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
    - name: page
      type: integer

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
      description: "v (video-only), s (shared), e (exclusive), p (private). Default = s"

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
    - name: force
      type: integer
      description: "0/1. Default = 0"

- id: disconnect_channel
  label: Disconnect Channel
  kind: action
  params:
    - name: token
      type: string
    - name: v
      type: integer
    - name: rx_id
      type: string
      description: Receiver ID(s), comma-separated, or omit for all
    - name: force
      type: integer

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
    - name: pairs
      type: string
      description: Comma-separated channel_id-receiver_id pairs (e.g. "1-1,1-2")
    - name: allowed
      type: string
      description: "Permitted modes: v/s/e/p, any combination"

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
    - name: loc
      type: string
    - name: allowed
      type: string
    - name: video1
      type: integer
    - name: video1head
      type: integer
    - name: video2
      type: integer
    - name: video2head
      type: integer
    - name: audio
      type: integer
    - name: usb
      type: integer
    - name: serial
      type: integer
    - name: groupname
      type: string

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
    - name: desc
      type: string
    - name: loc
      type: string

- id: promote
  label: Promote Backup to Primary
  kind: action
  params:
    - name: token
      type: string
    - name: v
      type: integer

- id: get_all_c_usb
  label: Get All C-USB LAN Extenders
  kind: query
  params:
    - name: token
      type: string
    - name: v
      type: integer

- id: delete_c_usb
  label: Delete C-USB LAN Extender
  kind: action
  params:
    - name: token
      type: string
    - name: v
      type: integer
    - name: mac
      type: string
      description: C-USB MAC address

- id: update_c_usb
  label: Update C-USB LAN Extender Name
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
  label: Connect C-USB LAN Extender
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
  label: Disconnect C-USB LAN Extender
  kind: action
  params:
    - name: token
      type: string
    - name: v
      type: integer
    - name: mac
      type: string
      description: Receiver MAC address

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
    - name: results_per_page
      type: integer

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
```

## Feedbacks
```yaml
# UNRESOLVED: no unsolicited push notifications documented; API is polling-based (RESTful)
# All responses include: version, timestamp, success, errors (on failure)
```

## Variables
```yaml
# UNRESOLVED: no persistent configuration parameters exposed as standalone settable variables;
# device/channel/preset config managed via create/update/delete actions above
```

## Events
```yaml
# UNRESOLVED: no server-push events documented; client must poll and diff responses
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
AIM API is RESTful HTTP; best practice per doc: login once, reuse token across requests, close connection after each request. Do not generate new token per request — session accumulation fills SSD over time. Connection modes: v=video-only, s=shared, e=exclusive, p=private. High-availability supports primary/backup/solo/unconfigured roles. C-USB LAN extenders provide USB over IP extension. API version parameter `v` required on all requests.
<!-- UNRESOLVED: physical port config (RS-232 local management), voltage/power specs, firmware compatibility ranges not in source -->

## Provenance

```yaml
source_domains:
  - support.adder.com
source_urls:
  - "https://support.adder.com/tiki/tiki-index.php?page=ALIF%3A%20AIM%20API"
retrieved_at: 2026-05-04T18:05:14.063Z
last_checked_at: 2026-05-27T06:52:01.446Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-27T06:52:01.446Z
matched_actions: 26
action_count: 26
confidence: high
summary: "All 26 spec methods match source API catalog 1:1; transport verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
