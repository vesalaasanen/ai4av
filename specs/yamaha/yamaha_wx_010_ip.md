---
spec_id: admin/yamaha-wx-010
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha WX-010 Control Spec"
manufacturer: Yamaha
model_family: WX-010
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - WX-010
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
  - forum.smartapfel.de
  - github.com
source_urls:
  - https://community.symcon.de/uploads/short-url/vRXaJXAn6vI2DSQYMHF0aqLbdir.pdf
  - https://forum.smartapfel.de/attachment/4358-yamaha-musiccast-http-simplified-api-for-controlsystems-pdf/
  - https://github.com/honnel/yamaha-commands
retrieved_at: 2026-06-02T00:22:34.684Z
last_checked_at: 2026-06-04T06:37:48.064Z
generated_at: 2026-06-04T06:37:48.064Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "HTTP port, authentication, and basic-control endpoints not present in this refined source."
  - "HTTP port not stated in source. Source only specifies host as IP address, no port."
  - "powerable, levelable not directly evidenced in this refined excerpt (handled by YXC Basic spec)."
  - "source describes API queries that return state values; no explicit"
  - "no explicit safety warnings, interlocks, or power-on sequencing"
  - "HTTP port number, basic-control endpoints (power, input, volume), firmware compatibility range — not present in this refined excerpt."
verification:
  verdict: verified
  checked_at: 2026-06-04T06:37:48.064Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 spec actions found with exact command paths and methods in source; no drift or fabrication detected. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Yamaha WX-010 Control Spec

## Summary
Yamaha WX-010 is a MusicCast-enabled wireless speaker controllable over Ethernet/Wi-Fi using the Yamaha Extended Control (YXC) HTTP API. This spec covers the Link / distribution surface of YXC API Rev. 2.00 (Advanced). Basic control endpoints (power, input, volume) are described in the separate YXC Basic specification, which is not part of this source.

<!-- UNRESOLVED: HTTP port, authentication, and basic-control endpoints not present in this refined source. -->

## Transport
```yaml
# Protocol inferred from "BaseURL" definition and example requests using http://{host}/...
protocols:
  - http  # inferred from BaseURL definition: http://{host}/YamahaExtendedControl
addressing:
  base_url: /YamahaExtendedControl
auth:
  type: none  # inferred: no auth procedure described for YXC API endpoints in source
```

<!-- UNRESOLVED: HTTP port not stated in source. Source only specifies host as IP address, no port. -->

## Traits
```yaml
- routable    # inferred: input/routing and Link distribution control commands present
- queryable   # inferred: getDistributionInfo, getFeatures, getDeviceInfo, getStereoPairInfo queries
```

<!-- UNRESOLVED: powerable, levelable not directly evidenced in this refined excerpt (handled by YXC Basic spec). -->

## Actions
```yaml
- id: set_link_control
  label: Set Link Control
  kind: action
  command: "GET /v1/{zone}/setLinkControl?control={control}"
  params:
    - name: zone
      type: string
      description: Target zone
      values: [main, zone2, zone3, zone4]
    - name: control
      type: string
      description: Link Control setting (values from /system/getFeatures)

- id: set_link_audio_delay
  label: Set Link Audio Delay
  kind: action
  command: "GET /v1/{zone}/setLinkAudioDelay?delay={delay}"
  params:
    - name: zone
      type: string
      description: Target zone
      values: [main, zone2, zone3, zone4]
    - name: delay
      type: string
      description: Link Audio Delay setting (values from /system/getFeatures)

- id: set_link_audio_quality
  label: Set Link Audio Quality
  kind: action
  command: "GET /v1/{zone}/setLinkAudioQuality?mode={mode}"
  params:
    - name: zone
      type: string
      description: Target zone
      values: [main, zone2, zone3, zone4]
    - name: mode
      type: string
      description: Link Audio Quality setting (values from /system/getFeatures)
  notes: "URI may include /secure segment per source"

- id: get_distribution_info
  label: Get Distribution Info
  kind: query
  command: "GET /v1/dist/getDistributionInfo"
  params: []

- id: set_server_info
  label: Set Server Info (Link master)
  kind: action
  command: "POST /v1/dist/setServerInfo"
  params:
    - name: group_id
      type: string
      required: yes
      description: Group ID in 32-digit hex (empty string to cancel)
    - name: zone
      type: string
      required: no
      description: Target Zone ID for Link distribution server
      values: [main, zone2, zone3, zone4]
    - name: type
      type: string
      required: no
      description: "Add or remove clients"
      values: [add, remove]
    - name: client_list
      type: array<string>
      required: no
      description: IP addresses of clients to add/remove (up to 9)

- id: set_client_info
  label: Set Client Info (Link distributed client)
  kind: action
  command: "POST /v1/dist/setClientInfo"
  params:
    - name: group_id
      type: string
      required: yes
      description: Group ID in 32-digit hex (empty string to cancel)
    - name: zone
      type: array<string>
      required: no
      description: Target Zone ID(s) to be Link distributed client
      values: [main, zone2, zone3, zone4]
    - name: server_ip_address
      type: string
      required: no
      description: IP address of the Link distribution server

- id: start_distribution
  label: Start Distribution
  kind: action
  command: "GET /v1/dist/startDistribution?num={num}"
  params:
    - name: num
      type: integer
      required: yes
      description: Link distribution number on current MusicCast Network

- id: stop_distribution
  label: Stop Distribution
  kind: action
  command: "GET /v1/dist/stopDistribution"
  params: []

- id: set_group_name
  label: Set Group Name
  kind: action
  command: "POST /v1/dist/setGroupName"
  params:
    - name: name
      type: string
      required: yes
      description: "Group Name (UTF-8, up to 128 bytes). Empty text reverts to default."

- id: get_features
  label: Get Features
  kind: query
  command: "GET /v1/system/getFeatures"
  params: []
  notes: "Referenced in compatibility check; not detailed in this excerpt."

- id: get_device_info
  label: Get Device Info
  kind: query
  command: "GET /v1/system/getDeviceInfo"
  params: []
  notes: "Referenced for netmodule_generation check; not detailed in this excerpt."

- id: get_stereo_pair_info
  label: Get Stereo Pair Info
  kind: query
  command: "GET /v1/system/getStereoPairInfo"
  params: []
  notes: "Referenced in Stereo Pair application note; not detailed in this excerpt."
```

## Feedbacks
```yaml
- id: response_code
  type: integer
  description: "Returned in every response. 0 = successful request."
  values:
    - 0   # Successful request
    - 1   # Initializing
    - 2   # Internal Error
    - 3   # Invalid Request
    - 4   # Invalid Parameter
    - 5   # Guarded
    - 6   # Time Out
    - 99  # Firmware Updating
    - 100 # Access Error
    - 101 # Other Errors
    - 102 # Wrong User Name
    - 103 # Wrong Password
    - 104 # Account Expired
    - 105 # Account Disconnected
    - 106 # Account Number Reached to the Limit
    - 107 # Server Maintenance
    - 108 # Invalid Account
    - 109 # License Error
    - 110 # Read Only Mode
    - 111 # Max Stations
    - 112 # Access Denied
    - 113 # Additional destination Playlist required
    - 114 # New Playlist required
    - 115 # Simultaneous logins reached upper limit
    - 200 # Linking in progress
    - 201 # Unlinking in progress

- id: distribution_group_id
  type: string
  description: "Group ID in 32-digit hex"

- id: distribution_group_name
  type: string
  description: "Group Name"

- id: distribution_role
  type: string
  description: "Link distribution role"
  values: [server, client, none]

- id: distribution_status
  type: string
  description: "Construction state of distribution system (valid only when role is server, API v2.00+)"
  values: [building, working, deleting]

- id: distribution_server_zone
  type: string
  description: "Target Zone ID working as distributing server"
  values: [main, zone2, zone3, zone4]

- id: distribution_client_list
  type: array
  description: "Registered client IP address list (valid only when role is server)"

- id: distribution_build_disable
  type: array
  description: "Information on whether distribution construction is prohibited"

- id: distribution_audio_dropout
  type: boolean
  description: "Whether sound interruption was detected during distribution"

- id: stereo_pair_status
  type: string
  description: "Stereo Pair status (e.g. master_left, slave_right)"
```

## Variables
```yaml
# UNRESOLVED: source describes API queries that return state values; no explicit
# settable continuous variables are documented in this refined excerpt.
```

## Events
```yaml
- id: distribution_event
  description: "MusicCast events spread as UDP unicast. Poll getDistributionInfo to retrieve because of UDP packet loss."
  transport: udp
  notes: "Source §9.2. Polling is required due to packet loss."
```

## Macros
```yaml
- id: make_group
  label: Make a Group (Link master + clients)
  steps:
    - "Create a random 16-byte Group ID"
    - "set_client_info on each client device with the Group ID and target zone"
    - "set_server_info (type=add) on master with Group ID and client_list"
    - "start_distribution with num=total client count on master"
  source: §9.1.2

- id: remove_client_from_group
  label: Remove a client from Group
  steps:
    - "set_client_info on client with empty group_id"
    - "set_server_info (type=remove) on master with Group ID and client IP"
    - "start_distribution with updated num on master"
  source: §9.1.3

- id: add_client_to_group
  label: Add a client to Group
  steps:
    - "set_client_info on new client with the Group ID and target zone"
    - "set_server_info (type=add) on master with Group ID and client IP"
    - "start_distribution with updated num on master"
  source: §9.1.4

- id: compatibility_check
  label: Compatibility check before creating group
  steps:
    - "get_features on master - note distribution.compatible_client list"
    - "get_features on each client - note distribution.version major"
    - "If master's compatible_client contains client major versions, group can be created"
    - "Otherwise update devices to latest firmware"
  source: §9.1.1
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlocks, or power-on sequencing
# requirements in this refined excerpt. Source notes group creation cannot be
# cancelled once in progress (§9.1.8) but this is operational, not a safety lock.
```

## Notes
- YXC API is HTTP-based; JSON bodies in source are shown with whitespace/newlines for readability, but actual responses are compact JSON.
- API versioning: paths include `/v1/` or `/v2/`; backward compatibility is assured for versions ≤ what `getDeviceInfo` reports.
- `setLinkAudioQuality` URI may include a `/secure` segment per source.
- Group creation on post-2018 masters can take 2–3 minutes depending on number of units and Link control setting; `getDistributionInfo.status` should be polled until `"working"`. The "speed" Link control setting assumes wired network.
- Devices not in the group may still report `role: client`; use `group_id` to disambiguate (empty group_id ⇒ not in group).
- "Zone A" = `main`, "Zone B" = `zone2`.
- Source: Yamaha Extended Control API Specification (Advanced) Rev. 2.00.

<!-- UNRESOLVED: HTTP port number, basic-control endpoints (power, input, volume), firmware compatibility range — not present in this refined excerpt. -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
  - forum.smartapfel.de
  - github.com
source_urls:
  - https://community.symcon.de/uploads/short-url/vRXaJXAn6vI2DSQYMHF0aqLbdir.pdf
  - https://forum.smartapfel.de/attachment/4358-yamaha-musiccast-http-simplified-api-for-controlsystems-pdf/
  - https://github.com/honnel/yamaha-commands
retrieved_at: 2026-06-02T00:22:34.684Z
last_checked_at: 2026-06-04T06:37:48.064Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:37:48.064Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 spec actions found with exact command paths and methods in source; no drift or fabrication detected. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "HTTP port, authentication, and basic-control endpoints not present in this refined source."
- "HTTP port not stated in source. Source only specifies host as IP address, no port."
- "powerable, levelable not directly evidenced in this refined excerpt (handled by YXC Basic spec)."
- "source describes API queries that return state values; no explicit"
- "no explicit safety warnings, interlocks, or power-on sequencing"
- "HTTP port number, basic-control endpoints (power, input, volume), firmware compatibility range — not present in this refined excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
