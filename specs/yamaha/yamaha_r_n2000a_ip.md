---
spec_id: admin/yamaha-r-n2000a
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha R-N2000A Control Spec"
manufacturer: Yamaha
model_family: R-N2000A
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - R-N2000A
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community-openhab-org.s3-eu-central-1.amazonaws.com
  - forum.iobroker.net
source_urls:
  - https://community-openhab-org.s3-eu-central-1.amazonaws.com/original/2X/f/f788d96dc1d4c3caaadd4eb1d87457c0b253d7f2.pdf
  - https://forum.iobroker.net/assets/uploads/files/1540_yxc_api_spec_basic.pdf
retrieved_at: 2026-06-04T01:21:04.557Z
last_checked_at: 2026-06-04T06:35:00.650Z
generated_at: 2026-06-04T06:35:00.650Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source document is the YXC Advanced spec only. The companion \"Yamaha Extended Control API Specification (Basic)\" referenced in §1 — which contains the bulk of the device control surface (power, volume, mute, input select, status query, getFeatures, getDeviceInfo, etc.) — is NOT included in the source provided. Power, transport audio, input selection, volume, tuner, status query, and device-info actions are therefore absent from this revision."
  - "TCP port for HTTP control not stated in source."
  - "Authentication scheme not described; inferred `none` per Tier 2."
  - "port number not stated in source (scheme is http://, but policy forbids assuming 80)"
  - "powerable, routable, levelable traits cannot be supported from this source — relevant commands live in the YXC Basic spec, which is not included."
  - "no standalone settable parameters distinct from the Actions above are documented in this source."
  - "unsolicited events / notifications are not documented in the YXC Advanced spec; they may live in the YXC Basic spec (not provided)."
  - "no explicit safety warnings, interlock procedures, or power sequencing requirements are stated in the YXC Advanced source."
  - "TCP port for HTTP control not stated; scheme `http://` implies 80 by default but policy forbids assuming."
  - "Authentication / authorization model not described; inferred `none`."
  - "Firmware version compatibility range not stated."
  - "Power, volume, mute, input select, transport, tuner, status query, getDeviceInfo, getFeatures, and unsolicited-event endpoints are defined in the companion \"YXC API Specification (Basic)\" document — NOT provided as source for this revision. A second revision sourced from the Basic spec is required for full device coverage."
  - "Applicability of zone2/zone3/zone4 endpoints to the R-N2000A (a 2-channel stereo receiver) is not explicitly stated in the source; the Advanced spec is shared across all MusicCast products."
verification:
  verdict: verified
  checked_at: 2026-06-04T06:35:00.650Z
  matched_actions: 8
  action_count: 8
  confidence: medium
  summary: "All 8 spec actions match their source counterparts with correct HTTP methods, URIs, and parameters; base_url confirmed; coverage is complete. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-04
---

# Yamaha R-N2000A Control Spec

## Summary
The Yamaha R-N2000A is a network-enabled stereo receiver and MusicCast device controllable over Ethernet/Wi-Fi via Yamaha Extended Control (YXC), an HTTP/REST JSON API. This spec covers the YXC Advanced API (Rev. 1.00) — specifically the Link / multi-room distribution endpoints and per-zone Link Control settings.

<!-- UNRESOLVED: Source document is the YXC Advanced spec only. The companion "Yamaha Extended Control API Specification (Basic)" referenced in §1 — which contains the bulk of the device control surface (power, volume, mute, input select, status query, getFeatures, getDeviceInfo, etc.) — is NOT included in the source provided. Power, transport audio, input selection, volume, tuner, status query, and device-info actions are therefore absent from this revision. -->

<!-- UNRESOLVED: TCP port for HTTP control not stated in source. -->
<!-- UNRESOLVED: Authentication scheme not described; inferred `none` per Tier 2. -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://{host}/YamahaExtendedControl/v1"
  port: null  # UNRESOLVED: port number not stated in source (scheme is http://, but policy forbids assuming 80)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred from getDistributionInfo query endpoint
```
<!-- UNRESOLVED: powerable, routable, levelable traits cannot be supported from this source — relevant commands live in the YXC Basic spec, which is not included. -->

## Actions
```yaml
- id: set_link_control
  label: Set Link Control
  kind: action
  command: "GET /v1/{zone}/setLinkControl?control={control}"
  params:
    - name: zone
      type: enum
      values: [main, zone2, zone3, zone4]
      description: Target zone (only zones supporting the function)
    - name: control
      type: string
      description: Link Control setting; valid values returned by /system/getFeatures

- id: set_link_audio_delay
  label: Set Link Audio Delay
  kind: action
  command: "GET /v1/{zone}/setLinkAudioDelay?delay={delay}"
  params:
    - name: zone
      type: enum
      values: [main, zone2, zone3, zone4]
      description: Target zone (only zones supporting the function)
    - name: delay
      type: string
      description: Link Audio Delay setting; valid values returned by /system/getFeatures. Invalid when Link Control is "Stability Boost".

- id: get_distribution_info
  label: Get Distribution Info
  kind: query
  command: "GET /v1/dist/getDistributionInfo"
  params: []

- id: set_server_info
  label: Set Server Info (Link Master)
  kind: action
  command: "POST /v1/dist/setServerInfo"
  params:
    - name: group_id
      type: string
      description: 32-digit hex Group ID; empty string "" cancels Link distribution server role
      required: true
    - name: zone
      type: enum
      values: [main, zone2, zone3, zone4]
      description: Zone to act as Link distribution server (current setting kept if omitted)
      required: false
    - name: type
      type: enum
      values: [add, remove]
      description: Add or remove clients; omit when cancelling master status
      required: false
    - name: client_list
      type: array
      description: Client IP addresses (up to 9)
      required: false

- id: set_client_info
  label: Set Client Info (Link Client)
  kind: action
  command: "POST /v1/dist/setClientInfo"
  params:
    - name: group_id
      type: string
      description: 32-digit hex Group ID; empty string "" cancels Link distributed client role
      required: true
    - name: zone
      type: array
      description: Target zones to act as Link distributed client (omit when cancelling)
      required: false
    - name: server_ip_address
      type: string
      description: IP address of the Link distribution server
      required: false

- id: start_distribution
  label: Start Link Distribution
  kind: action
  command: "GET /v1/dist/startDistribution?num={num}"
  params:
    - name: num
      type: integer
      description: Link distribution number on current MusicCast Network
      required: true

- id: stop_distribution
  label: Stop Link Distribution
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
      description: Group Name; UTF-8, up to 128 bytes. Empty string "" reverts to default. Stored in volatile memory.
      required: true
```

## Feedbacks
```yaml
- id: response_code
  label: API Response Code
  type: enum
  description: Returned in every YXC response body.
  values:
    - { code: 0,   meaning: "Successful request" }
    - { code: 1,   meaning: "Initializing" }
    - { code: 2,   meaning: "Internal Error" }
    - { code: 3,   meaning: "Invalid Request (method did not exist or was inappropriate)" }
    - { code: 4,   meaning: "Invalid Parameter (out of range, invalid characters)" }
    - { code: 5,   meaning: "Guarded (unable to setup in current status)" }
    - { code: 6,   meaning: "Time Out" }
    - { code: 99,  meaning: "Firmware Updating" }
    - { code: 100, meaning: "Access Error (streaming service)" }
    - { code: 101, meaning: "Other Errors (streaming service)" }
    - { code: 102, meaning: "Wrong User Name" }
    - { code: 103, meaning: "Wrong Password" }
    - { code: 104, meaning: "Account Expired" }
    - { code: 105, meaning: "Account Disconnected/Gone Off/Shut Down" }
    - { code: 106, meaning: "Account Number Reached to the Limit" }
    - { code: 107, meaning: "Server Maintenance" }
    - { code: 108, meaning: "Invalid Account" }
    - { code: 109, meaning: "License Error" }
    - { code: 110, meaning: "Read Only Mode" }
    - { code: 111, meaning: "Max Stations" }
    - { code: 112, meaning: "Access Denied" }

- id: distribution_info
  label: Distribution Info
  type: object
  description: Returned by getDistributionInfo.
  fields:
    - { name: response_code,  type: integer, description: "Response code (see response_code feedback)" }
    - { name: group_id,       type: string,  description: "Group ID in 32-digit hex" }
    - { name: group_name,     type: string,  description: "Group Name" }
    - { name: role,           type: enum,    values: [server, client, none], description: "Role of Link distribution" }
    - { name: server_zone,    type: enum,    values: [main, zone2, zone3, zone4], description: "Zone acting as distributing server (defaults to main if absent)" }
    - { name: client_list,    type: array,   description: "Registered client list - valid only when role is server. Each entry: { ip_address: string, data_type: 'base' | 'ext' }" }
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters distinct from the Actions above are documented in this source.
```

## Events
```yaml
# UNRESOLVED: unsolicited events / notifications are not documented in the YXC Advanced spec; they may live in the YXC Basic spec (not provided).
```

## Macros
```yaml
# Multi-step Link-management procedures are described narratively in §9.1 of the source.
- id: make_group
  label: Make a Link Group (§9.1.1)
  description: Establish a distribution Group with one master and one or more clients.
  steps:
    - "Create a random 16-byte Group ID."
    - "For each client device: POST setClientInfo with group_id and target zone."
    - "On master device: POST setServerInfo with group_id, zone, type=add, and client_list."
    - "On master device: GET startDistribution?num=<current system distribution count>."

- id: remove_client_from_group
  label: Remove Client from Group (§9.1.2)
  description: Detach one client from an existing Group.
  steps:
    - "On the client to remove: POST setClientInfo with group_id=\"\" (empty) and its current zone."
    - "On master device: POST setServerInfo with group_id, zone, type=remove, client_list containing the removed client IP."
    - "On master device: GET startDistribution?num=<updated system distribution count>."

- id: add_client_to_group
  label: Add Client to Group (§9.1.3)
  description: Attach a new client to an existing Group.
  steps:
    - "On the new client: POST setClientInfo with group_id and target zone."
    - "On master device: POST setServerInfo with group_id, zone, type=add, client_list containing the new client IP."
    - "On master device: GET startDistribution?num=<updated system distribution count>."
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power sequencing requirements are stated in the YXC Advanced source.
```

## Notes
- Source: Yamaha Extended Control API Specification (Advanced), Rev. 1.00. Refined excerpt at `docs/pdfs/yamaha_r_n2000a_ip.refined.md`.
- YXC is JSON-over-HTTP; transport is Ethernet or Wi-Fi. Base URL pattern: `http://{host}/YamahaExtendedControl/v1/...`. `{host}` is the device IP.
- API versioning is path-segment-based (`v1`, `v2`). Backward compatibility is asserted by the spec: all API versions ≤ the value reported by `getDeviceInfo` are supported. `getDeviceInfo` itself lives in the Basic spec (not included here).
- Per-zone Link endpoints (`setLinkControl`, `setLinkAudioDelay`) accept any of `main`, `zone2`, `zone3`, `zone4`, but only zones actually equipped with the feature are valid. The R-N2000A is a 2-channel stereo receiver — multi-zone applicability of these endpoints on this specific model is not confirmed by the source.
- Per §9.1.6: in a multi-zone receiver, each zone cannot join discrete separate Groups; Zone A and Zone B are not both available as Client simultaneously; one zone cannot be both Master and Client in the same Group. Pseudo-Groups with Main Zone as Master and Zone2/3 (with Main Zone Sync) as Client are allowed but carry no network distribution.
- Group Name (`setGroupName`) is stored in **volatile memory** per §5.6 — it does not persist across power cycles.
- Max 10 MusicCast devices per Location and per Group.
- Group ID is described as "32-digit hex" in the endpoint params but as "16 byte" in the §9.1.1 worked example — both are consistent (16 bytes = 32 hex digits).
- A response body returns only `response_code` when the code is non-zero.

<!-- UNRESOLVED: TCP port for HTTP control not stated; scheme `http://` implies 80 by default but policy forbids assuming. -->
<!-- UNRESOLVED: Authentication / authorization model not described; inferred `none`. -->
<!-- UNRESOLVED: Firmware version compatibility range not stated. -->
<!-- UNRESOLVED: Power, volume, mute, input select, transport, tuner, status query, getDeviceInfo, getFeatures, and unsolicited-event endpoints are defined in the companion "YXC API Specification (Basic)" document — NOT provided as source for this revision. A second revision sourced from the Basic spec is required for full device coverage. -->
<!-- UNRESOLVED: Applicability of zone2/zone3/zone4 endpoints to the R-N2000A (a 2-channel stereo receiver) is not explicitly stated in the source; the Advanced spec is shared across all MusicCast products. -->

## Provenance

```yaml
source_domains:
  - community-openhab-org.s3-eu-central-1.amazonaws.com
  - forum.iobroker.net
source_urls:
  - https://community-openhab-org.s3-eu-central-1.amazonaws.com/original/2X/f/f788d96dc1d4c3caaadd4eb1d87457c0b253d7f2.pdf
  - https://forum.iobroker.net/assets/uploads/files/1540_yxc_api_spec_basic.pdf
retrieved_at: 2026-06-04T01:21:04.557Z
last_checked_at: 2026-06-04T06:35:00.650Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:35:00.650Z
matched_actions: 8
action_count: 8
confidence: medium
summary: "All 8 spec actions match their source counterparts with correct HTTP methods, URIs, and parameters; base_url confirmed; coverage is complete. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source document is the YXC Advanced spec only. The companion \"Yamaha Extended Control API Specification (Basic)\" referenced in §1 — which contains the bulk of the device control surface (power, volume, mute, input select, status query, getFeatures, getDeviceInfo, etc.) — is NOT included in the source provided. Power, transport audio, input selection, volume, tuner, status query, and device-info actions are therefore absent from this revision."
- "TCP port for HTTP control not stated in source."
- "Authentication scheme not described; inferred `none` per Tier 2."
- "port number not stated in source (scheme is http://, but policy forbids assuming 80)"
- "powerable, routable, levelable traits cannot be supported from this source — relevant commands live in the YXC Basic spec, which is not included."
- "no standalone settable parameters distinct from the Actions above are documented in this source."
- "unsolicited events / notifications are not documented in the YXC Advanced spec; they may live in the YXC Basic spec (not provided)."
- "no explicit safety warnings, interlock procedures, or power sequencing requirements are stated in the YXC Advanced source."
- "TCP port for HTTP control not stated; scheme `http://` implies 80 by default but policy forbids assuming."
- "Authentication / authorization model not described; inferred `none`."
- "Firmware version compatibility range not stated."
- "Power, volume, mute, input select, transport, tuner, status query, getDeviceInfo, getFeatures, and unsolicited-event endpoints are defined in the companion \"YXC API Specification (Basic)\" document — NOT provided as source for this revision. A second revision sourced from the Basic spec is required for full device coverage."
- "Applicability of zone2/zone3/zone4 endpoints to the R-N2000A (a 2-channel stereo receiver) is not explicitly stated in the source; the Advanced spec is shared across all MusicCast products."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
