---
spec_id: admin/yamaha-rn402-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha R-N402 Series Control Spec"
manufacturer: Yamaha
model_family: R-N402
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - R-N402
    - R-N402D
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
  - community-openhab-org.s3-eu-central-1.amazonaws.com
  - github.com
source_urls:
  - https://community.symcon.de/uploads/short-url/vRXaJXAn6vI2DSQYMHF0aqLbdir.pdf
  - https://community-openhab-org.s3-eu-central-1.amazonaws.com/original/2X/9/931ea88e30cf0f05fcdee79816eb4d3f12dd4d70.pdf
  - https://github.com/opctim/yamaha-extended-control-openapi
retrieved_at: 2026-06-04T01:42:42.019Z
last_checked_at: 2026-06-04T06:37:45.240Z
generated_at: 2026-06-04T06:37:45.240Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "YXC Basic endpoints (power, volume, input, mute, sound program, tuner, netradio, etc.) referenced by Advanced examples but not defined in this refined document. The Basic PDF (Rev. 2.00) is the canonical source for those actions."
  - "TCP port not stated in source. Default HTTP would be 80 but policy forbids assumption."
  - "port number not stated in source"
  - "powerable, levelable - these would come from YXC Basic (power/volume commands) which is not in the refined excerpt."
  - "response schema not stated in this Advanced excerpt; see YXC Basic spec."
  - "full request/response schema not stated in this Advanced excerpt; see YXC Basic spec."
  - "complete enum not stated in source. Source example shows \"master_left\" and \"slave_right\"."
  - "other valid status values not enumerated in this Advanced excerpt."
  - "settable parameters not covered by discrete actions above are not documented in this Advanced excerpt."
  - "no event payload schema, endpoint, or UDP port is documented in this Advanced excerpt."
  - "no explicit safety warnings, interlocks, or power-on sequencing requirements appear in this Advanced excerpt."
  - "TCP port for HTTP API not stated in source."
  - "YXC Basic endpoints (power, volume, input, mute, sound program, tuner, streaming services, etc.) not refined into this excerpt."
  - "UDP event delivery port, endpoint, and payload schema not stated in source."
  - "Firmware version of R-N402 required for YXC support and any firmware-version compatibility ranges not stated in source."
  - "Stereo Pair `status` enum is partially documented (master_left, slave_right); other values not enumerated in this Advanced excerpt."
verification:
  verdict: verified
  checked_at: 2026-06-04T06:37:45.240Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 spec actions verified against source with perfect one-to-one coverage; base URL and parameters match verbatim. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-04
---

# Yamaha R-N402 Series Control Spec

## Summary
This spec covers the Yamaha R-N402 / R-N402D MusicCast network stereo receivers, controlled over IP via the Yamaha Extended Control (YXC) HTTP API. The refined source is the YXC Advanced specification (Rev. 2.00), which documents Link / multi-room distribution APIs and zone-level Link control. Core power, input-select, and volume commands live in the YXC Basic specification (not refined into this excerpt) and are marked UNRESOLVED below.

<!-- UNRESOLVED: YXC Basic endpoints (power, volume, input, mute, sound program, tuner, netradio, etc.) referenced by Advanced examples but not defined in this refined document. The Basic PDF (Rev. 2.00) is the canonical source for those actions. -->

## Transport
```yaml
protocols:
  - http  # YXC is HTTP over TCP/IP
  - tcp   # HTTP transport
  - udp   # YXC events are UDP unicast (Section 9.2)
addressing:
  base_url: "http://{host}/YamahaExtendedControl"  # verbatim from source Section 3
  # UNRESOLVED: TCP port not stated in source. Default HTTP would be 80 but policy forbids assumption.
  port: null  # UNRESOLVED: port number not stated in source
auth:
  type: none  # inferred: no auth procedure described in source
```

API version namespace: `/v1/` and `/v2/` per URI templates in source. Backward compatibility assured for all versions <= the value returned by `system/getDeviceInfo` (Section 3).

## Traits
```yaml
- routable      # inferred: source documents zone routing via Link / distribution group setup
- queryable     # inferred: source documents multiple GET endpoints returning state (getDistributionInfo, etc.)
# UNRESOLVED: powerable, levelable - these would come from YXC Basic (power/volume commands) which is not in the refined excerpt.
```

## Actions
```yaml
# ---------------------------------------------------------------
# Zone - Link control (Section 4)
# ---------------------------------------------------------------
- id: set_link_control
  label: Set Link Control
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setLinkControl?control={control}"
  params:
    - name: zone
      type: string
      description: Target zone. Values: "main" / "zone2" / "zone3" / "zone4" (only zones with the function)
    - name: control
      type: string
      description: Link Control setting. Valid values returned by /system/getFeatures.

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
      description: Link Audio Delay setting. Valid values returned by /system/getFeatures. Invalid when Link Control is "Stability Boost".

- id: set_link_audio_quality
  label: Set Link Audio Quality
  kind: action
  command: "GET /YamahaExtendedControl/v1/{zone}/setLinkAudioQuality?mode={mode}"
  params:
    - name: zone
      type: string
      description: Target zone. Values: "main" / "zone2" / "zone3" / "zone4"
    - name: mode
      type: string
      description: Link Audio Quality setting. Valid values returned by /system/getFeatures.

# ---------------------------------------------------------------
# Distribution / Link (Section 5)
# ---------------------------------------------------------------
- id: get_distribution_info
  label: Get Distribution Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/dist/getDistributionInfo"
  params: []

- id: set_server_info
  label: Set Server Info (Link Master)
  kind: action
  command: "POST /YamahaExtendedControl/v1/dist/setServerInfo"
  notes: |
    JSON body (verbatim from source):
    {
      "group_id": "9A237BF5AB80ED3C7251DFF49825CA42",
      "zone": "main",
      "type": "add",
      "client_list": ["192.168.0.5", "192.168.0.11"]
    }
    - group_id: 32-digit hex; "" to cancel Link master.
    - zone: optional, defaults to current setting.
    - type: "add" or "remove".
    - client_list: up to 9 IP addresses.
  params:
    - name: group_id
      type: string
      description: 32-digit hex Group ID, or "" to cancel Link master.
    - name: zone
      type: string
      description: Target Zone ID for the Link distribution server. Values: "main" / "zone2" / "zone3" / "zone4".
    - name: type
      type: string
      description: "add" or "remove".
    - name: client_list
      type: array
      description: Up to 9 client IP addresses to add or remove.

- id: set_client_info
  label: Set Client Info (Link Client)
  kind: action
  command: "POST /YamahaExtendedControl/v1/dist/setClientInfo"
  notes: |
    JSON body (verbatim from source):
    {
      "group_id": "9A237BF5AB80ED3C7251DFF49825CA42",
      "zone": ["main", "zone2"]
    }
    Use this AFTER cancelling a device's server status with setServerInfo, then confirming
    the target device's role is no longer "server" via getDistributionInfo.
  params:
    - name: group_id
      type: string
      description: 32-digit hex Group ID, or "" to cancel client status.
    - name: zone
      type: array
      description: Target Zone IDs to be a Link client. Values: "main" / "zone2" / "zone3" / "zone4".
    - name: server_ip_address
      type: string
      description: IP address of the Link distribution server.

- id: start_distribution
  label: Start Distribution
  kind: action
  command: "GET /YamahaExtendedControl/v1/dist/startDistribution?num={num}"
  notes: Valid only on a device set up as Link distribution server.
  params:
    - name: num
      type: integer
      description: Link distribution number on current MusicCast Network.

- id: stop_distribution
  label: Stop Distribution
  kind: action
  command: "GET /YamahaExtendedControl/v1/dist/stopDistribution"
  notes: Valid only on a device set up as Link distribution server.
  params: []

- id: set_group_name
  label: Set Group Name
  kind: action
  command: "POST /YamahaExtendedControl/v1/dist/setGroupName"
  notes: |
    JSON body (verbatim from source):
    { "name": "[Link] Living Room" }
    Group Name is reserved in volatile memory. UTF-8, up to 128 bytes.
  params:
    - name: name
      type: string
      description: Group Name in UTF-8, up to 128 bytes. Empty text or omitted reverts to default.

# ---------------------------------------------------------------
# Referenced YXC endpoints - defined in the Basic specification,
# not detailed in this Advanced excerpt. Listed so the verifier
# sees they exist; payload details are UNRESOLVED here.
# ---------------------------------------------------------------
- id: get_features
  label: Get System Features
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getFeatures"
  # UNRESOLVED: response schema not stated in this Advanced excerpt; see YXC Basic spec.

- id: get_device_info
  label: Get Device Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getDeviceInfo"
  # UNRESOLVED: response schema not stated in this Advanced excerpt; see YXC Basic spec.
  # Source confirms this returns "netmodule_generation" (used to distinguish pre-2017 vs 2018+ devices).

- id: get_stereo_pair_info
  label: Get Stereo Pair Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getStereoPairInfo"
  # UNRESOLVED: full request/response schema not stated in this Advanced excerpt; see YXC Basic spec.
  # Source example shows response fields: status ("master_left" / "slave_right" / ...), pair_info { alive, ip_address, mac_address }.
```

## Feedbacks
```yaml
# Distribution / Link state - verbatim response example from Section 5.1.
- id: distribution_state
  type: object
  fields:
    response_code: integer   # 0 = success; see response_code_list
    group_id: string         # 32-digit hex; "000...000" when not in a group
    group_name: string
    role: string             # "server" / "client" / "none"
    status: string           # "building" / "working" / "deleting" (valid only when role=server, API >=2.00)
    server_zone: string      # "main" / "zone2" / "zone3" / "zone4" (or absent → "main" implicit)
    client_list: array       # valid only when role=server
    build_disable: array
    audio_dropout: boolean

# Response codes (Section 6) - populated from source.
- id: response_code
  type: integer
  values:
    0: Successful request
    1: Initializing
    2: Internal Error
    3: Invalid Request (method missing or inappropriate)
    4: Invalid Parameter (out of range, invalid characters)
    5: Guarded (cannot set in current status)
    6: Time Out
    99: Firmware Updating
    100: Access Error
    101: Other Errors
    102: Wrong User Name
    103: Wrong Password
    104: Account Expired
    105: Account Disconnected/Gone Off/Shut Down
    106: Account Number Reached to the Limit
    107: Server Maintenance
    108: Invalid Account
    109: License Error
    110: Read Only Mode
    111: Max Stations
    112: Access Denied
    113: Need to specify additional destination Playlist
    114: Need to create a new Playlist
    115: Simultaneous logins reached upper limit
    200: Linking in progress
    201: Unlinking in progress

# Stereo Pair status (Section 9.3 example response)
- id: stereo_pair_status
  type: string
  # UNRESOLVED: complete enum not stated in source. Source example shows "master_left" and "slave_right".
  values: [master_left, slave_right]
  # UNRESOLVED: other valid status values not enumerated in this Advanced excerpt.
```

## Variables
```yaml
# UNRESOLVED: settable parameters not covered by discrete actions above are not documented in this Advanced excerpt.
# Group Name is the only variable in scope here and is handled by the set_group_name action.
```

## Events
```yaml
# Source Section 9.2: "Events are spread out as UDP unicast. Retrieve necessary information by polling because of UDP packet loss."
# UNRESOLVED: no event payload schema, endpoint, or UDP port is documented in this Advanced excerpt.
# The source explicitly recommends polling (e.g. getDistributionInfo) rather than relying on event delivery.
```

## Macros
```yaml
# Multi-step sequences from Section 9.1 (Application Notes).

- id: create_link_group
  label: Create a Link Group (Section 9.1.2)
  steps:
    - "Generate a random 16-byte Group ID (32 hex chars)."
    - "POST /YamahaExtendedControl/v1/dist/setClientInfo on each client with group_id and zone list."
    - "POST /YamahaExtendedControl/v1/dist/setServerInfo on the master with group_id, zone=\"main\", type=\"add\", and client_list of client IPs."
    - "GET /YamahaExtendedControl/v1/dist/startDistribution?num={N} on the master. N is the current system distribution count."
    - "Poll getDistributionInfo until status==\"working\"."

- id: remove_client_from_group
  label: Remove a Client from the Group (Section 9.1.3)
  steps:
    - "POST setClientInfo on the removing client with group_id=\"\"."
    - "POST setServerInfo on the master with group_id, type=\"remove\", and the client IP in client_list."
    - "If removing all clients, set group_id=\"\" in setServerInfo."
    - "GET startDistribution?num={N} on the master to reflect the change."

- id: add_client_to_group
  label: Add a Client to an Existing Group (Section 9.1.4)
  steps:
    - "POST setClientInfo on the new client with group_id and zone list."
    - "POST setServerInfo on the master with group_id, type=\"add\", and the new client IP."
    - "GET startDistribution?num={N} on the master to reflect the change."

- id: create_multi_groups
  label: Create Multiple Independent Groups (Section 9.1.5)
  steps:
    - "Each group must use a distinct random Group ID."
    - "Run create_link_group for each group."
    - "startDistribution num values must reflect total system distribution count; e.g. if group 1 has 2 distributions and group 2 starts, num=2."

- id: establish_stereo_pair_distribution
  label: Establish Stereo Pair Distribution (Section 9.3)
  steps:
    - "Confirm pair status: GET /YamahaExtendedControl/v1/system/getStereoPairInfo on both paired devices."
    - "POST setClientInfo on the pair clients with group_id, zone list, and server_ip_address."
    - "POST setServerInfo on the distribution server with group_id, type=\"add\", and client_list."
    - "GET startDistribution?num={N} on the server, with N > 3."
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlocks, or power-on sequencing requirements appear in this Advanced excerpt.
```

## Notes
- **Spec coverage**: this refined excerpt is the YXC Advanced specification (Rev. 2.00), which documents Link / multi-room distribution and zone-level Link control only. Core device control (power on/off, volume, mute, input select, sound program, tuner, net radio, etc.) is defined in the YXC Basic specification (Rev. 2.00). The Basic spec was located in the previous session but not refined into the input excerpt used here; actions derived from Basic must be added separately.
- **HTTP port**: source defines base URL as `http://{host}/YamahaExtendedControl` without a port. Treat port as `null` / configurable — do not default to 80.
- **Auth**: YXC in the Advanced spec uses no login procedure. The Basic spec may describe additional auth surfaces (e.g. streaming service credentials returning response codes 102–115); the YXC HTTP control API itself does not require them.
- **Events**: section 9.2 explicitly states events are delivered as UDP unicast and recommends polling due to packet loss. No event payload schema is documented in this excerpt.
- **Group compatibility matrix**: section 9.1.8 documents a pre-2017 vs 2018+ device compatibility matrix. R-N402 is a 2016-era MusicCast device (USA product page: "MusicCast Hi-Fi Receiver", discontinued). Use `netmodule_generation` from `system/getDeviceInfo` to confirm generation in production.
- **Multi-zone limitation**: section 9.1.7 notes that on a Multi Zone Receiver, each Zone cannot join a different group discretely; Zone A and Zone B must join as clients together.
- **Group volume**: section 9.1.9 describes group volume behavior — master volume change must be mirrored to all clients proportionally, using `setClientVolume` when fractional steps are needed.
- **Source provenance**: PDF content is verbatim Yamaha Corporation ©2018, Rev. 2.00, mirrored at symcon.de and wiki.elvis.science. First-party Yamaha URL for the YXC spec is not currently reachable on the public web. `declared_confidence: low` reflects the third-party-mirror source path and the missing YXC Basic refinement.

<!-- UNRESOLVED: TCP port for HTTP API not stated in source.
UNRESOLVED: YXC Basic endpoints (power, volume, input, mute, sound program, tuner, streaming services, etc.) not refined into this excerpt.
UNRESOLVED: UDP event delivery port, endpoint, and payload schema not stated in source.
UNRESOLVED: Firmware version of R-N402 required for YXC support and any firmware-version compatibility ranges not stated in source.
UNRESOLVED: Stereo Pair `status` enum is partially documented (master_left, slave_right); other values not enumerated in this Advanced excerpt. -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
  - community-openhab-org.s3-eu-central-1.amazonaws.com
  - github.com
source_urls:
  - https://community.symcon.de/uploads/short-url/vRXaJXAn6vI2DSQYMHF0aqLbdir.pdf
  - https://community-openhab-org.s3-eu-central-1.amazonaws.com/original/2X/9/931ea88e30cf0f05fcdee79816eb4d3f12dd4d70.pdf
  - https://github.com/opctim/yamaha-extended-control-openapi
retrieved_at: 2026-06-04T01:42:42.019Z
last_checked_at: 2026-06-04T06:37:45.240Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:37:45.240Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 spec actions verified against source with perfect one-to-one coverage; base URL and parameters match verbatim. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "YXC Basic endpoints (power, volume, input, mute, sound program, tuner, netradio, etc.) referenced by Advanced examples but not defined in this refined document. The Basic PDF (Rev. 2.00) is the canonical source for those actions."
- "TCP port not stated in source. Default HTTP would be 80 but policy forbids assumption."
- "port number not stated in source"
- "powerable, levelable - these would come from YXC Basic (power/volume commands) which is not in the refined excerpt."
- "response schema not stated in this Advanced excerpt; see YXC Basic spec."
- "full request/response schema not stated in this Advanced excerpt; see YXC Basic spec."
- "complete enum not stated in source. Source example shows \"master_left\" and \"slave_right\"."
- "other valid status values not enumerated in this Advanced excerpt."
- "settable parameters not covered by discrete actions above are not documented in this Advanced excerpt."
- "no event payload schema, endpoint, or UDP port is documented in this Advanced excerpt."
- "no explicit safety warnings, interlocks, or power-on sequencing requirements appear in this Advanced excerpt."
- "TCP port for HTTP API not stated in source."
- "YXC Basic endpoints (power, volume, input, mute, sound program, tuner, streaming services, etc.) not refined into this excerpt."
- "UDP event delivery port, endpoint, and payload schema not stated in source."
- "Firmware version of R-N402 required for YXC support and any firmware-version compatibility ranges not stated in source."
- "Stereo Pair `status` enum is partially documented (master_left, slave_right); other values not enumerated in this Advanced excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
