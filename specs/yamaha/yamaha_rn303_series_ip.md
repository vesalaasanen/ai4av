---
spec_id: admin/yamaha-rn303-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha R-N303 Series Control Spec"
manufacturer: Yamaha
model_family: R-N303
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - R-N303
    - R-N303D
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
  - forum.iobroker.net
source_urls:
  - https://community.symcon.de/uploads/short-url/vRXaJXAn6vI2DSQYMHF0aqLbdir.pdf
  - https://forum.iobroker.net/assets/uploads/files/1540_yxc_api_spec_basic.pdf
retrieved_at: 2026-06-04T01:25:01.333Z
last_checked_at: 2026-06-04T06:35:02.156Z
generated_at: 2026-06-04T06:35:02.156Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "YXC Basic spec (power, input, volume, mute, playback) not present in refined source; only Link/Distribution/Group endpoints from YXC Advanced Rev. 2.00 are documented here."
  - "TCP port number not stated in source (default 80 implied by http:// scheme; not explicitly confirmed for R-N303)"
  - "YXC Basic variable set (volume level, sound program ID, input ID) not in source"
  - "specific event payload schema not in refined source"
  - "no explicit safety warnings in refined source."
  - "HTTP port not stated in source (default 80 assumed by http:// scheme, unverified)."
  - "No firmware version range stated for R-N303 compatibility with this spec; source only states the spec applies to devices on firmware that supports API >= 2.00."
verification:
  verdict: verified
  checked_at: 2026-06-04T06:35:02.156Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 spec actions matched literally in source sections 4-5; transport URL verified; 100% command coverage achieved. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-04
---

# Yamaha R-N303 Series Control Spec

## Summary
The Yamaha R-N303 / R-N303D is a MusicCast-enabled network stereo receiver. This spec covers the Yamaha Extended Control (YXC) HTTP API used to control Link distribution and grouping functions. Power, input, and volume control are documented in the separate "YXC Basic" specification, which is not part of this source.

<!-- UNRESOLVED: YXC Basic spec (power, input, volume, mute, playback) not present in refined source; only Link/Distribution/Group endpoints from YXC Advanced Rev. 2.00 are documented here. -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http://{host}/YamahaExtendedControl  # from source section 3 "Base URL"
# UNRESOLVED: TCP port number not stated in source (default 80 implied by http:// scheme; not explicitly confirmed for R-N303)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# No direct power/volume/routing commands documented in the refined source (those live in YXC Basic).
# Traits supported by the source:
- routable  # inferred from Link/Distribution routing commands
- queryable  # inferred from getDistributionInfo query
```

## Actions
```yaml
- id: set_link_control
  label: Set Link Control
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setLinkControl?control={control}"
  params:
    - name: zone
      type: string
      description: Target zone. Values: "main" / "zone2" / "zone3" / "zone4"
    - name: control
      type: string
      description: Link Control setting; values from /system/getFeatures

- id: set_link_audio_delay
  label: Set Link Audio Delay
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setLinkAudioDelay?delay={delay}"
  params:
    - name: zone
      type: string
      description: Target zone. Values: "main" / "zone2" / "zone3" / "zone4"
    - name: delay
      type: string
      description: Link Audio Delay setting; values from /system/getFeatures. Example: "lip_sync"

- id: set_link_audio_quality
  label: Set Link Audio Quality
  kind: action
  command: "GET /YamahaExtendedControl[/secure]/v1/{zone}/setLinkAudioQuality?mode={mode}"
  params:
    - name: zone
      type: string
      description: Target zone. Values: "main" / "zone2" / "zone3" / "zone4"
    - name: mode
      type: string
      description: Link Audio Quality setting; values from /system/getFeatures. Example: "compressed"

- id: get_distribution_info
  label: Get Distribution Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/dist/getDistributionInfo"
  params: []

- id: set_server_info
  label: Set Link Server Info
  kind: action
  command: "POST /YamahaExtendedControl/v1/dist/setServerInfo"
  params:
    - name: group_id
      type: string
      description: Group ID in 32-digit hex; "" to cancel link server
    - name: zone
      type: string
      description: Target Zone ID for the link server. Values: "main" / "zone2" / "zone3" / "zone4"
    - name: type
      type: string
      description: "add or remove clients. Values: \"add\" / \"remove\""
    - name: client_list
      type: array
      description: IP addresses of adding/removing clients (up to 9)

- id: set_client_info
  label: Set Link Client Info
  kind: action
  command: "POST /YamahaExtendedControl/v1/dist/setClientInfo"
  params:
    - name: group_id
      type: string
      description: Group ID in 32-digit hex; "" to cancel client
    - name: zone
      type: array
      description: Target Zone IDs. Values: "main" / "zone2" / "zone3" / "zone4"
    - name: server_ip_address
      type: string
      description: IP Address of the link distribution server

- id: start_distribution
  label: Start Link Distribution
  kind: action
  command: "GET /YamahaExtendedControl/v1/dist/startDistribution?num={num}"
  params:
    - name: num
      type: integer
      description: Link distribution number on current MusicCast Network

- id: stop_distribution
  label: Stop Link Distribution
  kind: action
  command: "GET /YamahaExtendedControl/v1/dist/stopDistribution"
  params: []

- id: set_group_name
  label: Set Group Name
  kind: action
  command: "POST /YamahaExtendedControl/v1/dist/setGroupName"
  params:
    - name: name
      type: string
      description: Group Name, UTF-8 within 128 bytes
```

## Feedbacks
```yaml
- id: distribution_info
  type: object
  description: |
    Returned by getDistributionInfo. Fields:
    - group_id (string): Group ID in 32-digit hex
    - group_name (string): Group Name
    - role (enum): "server" / "client" / "none"
    - status (enum): "building" / "working" / "deleting" (only when role is Server, API v2.00+)
    - server_zone (enum): "main" / "zone2" / "zone3" / "zone4"
    - client_list (array): {ip_address, data_type ("base"/"ext")}
    - build_disable (array): {role, reasons[]}
    - audio_dropout (boolean)
    - response_code (integer): see Response Code List

- id: response_code
  type: enum
  description: Standard YXC response code returned in every API response.
  values:
    - "0: Successful request"
    - "1: Initializing"
    - "2: Internal Error"
    - "3: Invalid Request (method missing/inappropriate)"
    - "4: Invalid Parameter"
    - "5: Guarded (unable to setup in current status)"
    - "6: Time Out"
    - "99: Firmware Updating"
    - "100: Access Error (streaming)"
    - "101: Other Errors"
    - "102: Wrong User Name"
    - "103: Wrong Password"
    - "104: Account Expired"
    - "105: Account Disconnected"
    - "106: Account Number Reached Limit"
    - "107: Server Maintenance"
    - "108: Invalid Account"
    - "109: License Error"
    - "110: Read Only Mode"
    - "111: Max Stations"
    - "112: Access Denied"
    - "113: Need additional destination Playlist"
    - "114: Need to create new Playlist"
    - "115: Simultaneous logins limit reached"
    - "200: Linking in progress"
    - "201: Unlinking in progress"
```

## Variables
```yaml
# No settable device-level parameters documented in the refined source
# beyond the action params above. The Basic spec (not present) covers
# volume, sound program, input selection, etc.
# UNRESOLVED: YXC Basic variable set (volume level, sound program ID, input ID) not in source
```

## Events
```yaml
# Source section 9.2: events are spread as UDP unicast; spec recommends
# polling rather than relying on event packets.
# UNRESOLVED: specific event payload schema not in refined source
```

## Macros
```yaml
# Multi-step sequences from source section 9.1:
- id: make_group
  label: Make a Link Group
  description: |
    1. Generate a random 16-byte Group ID.
    2. POST /v1/dist/setClientInfo on each client with {group_id, zone:["main"]}.
    3. POST /v1/dist/setServerInfo on the master with {group_id, zone, type:"add", client_list}.
    4. GET /v1/dist/startDistribution?num=<current group count> on the master.
  steps: []

- id: remove_client_from_group
  label: Remove Client From Group
  description: |
    1. POST /v1/dist/setClientInfo on the client with group_id="".
    2. POST /v1/dist/setServerInfo on the master with type:"remove" and client_list.
    3. GET /v1/dist/startDistribution?num=<new total> on the master.
  steps: []

- id: add_client_to_group
  label: Add Client To Group
  description: |
    1. POST /v1/dist/setClientInfo on the new client with {group_id, zone}.
    2. POST /v1/dist/setServerInfo on the master with type:"add" and client_list.
    3. GET /v1/dist/startDistribution?num=<new total> on the master.
  steps: []

- id: cancel_link_master
  label: Cancel Link Master
  description: |
    POST /v1/dist/setServerInfo on the master with group_id="" to cancel link master.
  steps: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings in refined source.
# Source notes (section 9.1.8) that group creation cannot be cancelled
# once initiated and may take 2-3 minutes; treat as operational caveat, not safety interlock.
```

## Notes
- Source is YXC Advanced Rev. 2.00. YXC Basic spec is required for power, input, volume, mute, playback, and tuner/network functions but is not in the refined source.
- Base URL pattern: `http://{host}/YamahaExtendedControl` (HTTP, port not stated).
- API version segment (`/v1/`, `/v2/`) is mandatory in every URI; backward compatibility for <= version returned by `/system/getDeviceInfo` is assumed.
- All request and response bodies are JSON (no spaces/newlines in actual wire format).
- Group ID is a 16-byte (32-hex-digit) value, application-generated.
- Max 32 MusicCast Devices per Location, max 9 clients per setServerInfo call.
- For Multi Zone Receivers, Zones cannot independently join different groups (Zone A and B must join/leave together).
- Pre-2017 devices require latest firmware to interoperate with 2018+ devices in a group; check `getDeviceInfo` → `netmodule_generation` (1 = pre-2017, 2 = 2018+).

<!-- UNRESOLVED: HTTP port not stated in source (default 80 assumed by http:// scheme, unverified). -->
<!-- UNRESOLVED: No firmware version range stated for R-N303 compatibility with this spec; source only states the spec applies to devices on firmware that supports API >= 2.00. -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
  - forum.iobroker.net
source_urls:
  - https://community.symcon.de/uploads/short-url/vRXaJXAn6vI2DSQYMHF0aqLbdir.pdf
  - https://forum.iobroker.net/assets/uploads/files/1540_yxc_api_spec_basic.pdf
retrieved_at: 2026-06-04T01:25:01.333Z
last_checked_at: 2026-06-04T06:35:02.156Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:35:02.156Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 spec actions matched literally in source sections 4-5; transport URL verified; 100% command coverage achieved. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "YXC Basic spec (power, input, volume, mute, playback) not present in refined source; only Link/Distribution/Group endpoints from YXC Advanced Rev. 2.00 are documented here."
- "TCP port number not stated in source (default 80 implied by http:// scheme; not explicitly confirmed for R-N303)"
- "YXC Basic variable set (volume level, sound program ID, input ID) not in source"
- "specific event payload schema not in refined source"
- "no explicit safety warnings in refined source."
- "HTTP port not stated in source (default 80 assumed by http:// scheme, unverified)."
- "No firmware version range stated for R-N303 compatibility with this spec; source only states the spec applies to devices on firmware that supports API >= 2.00."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
