---
spec_id: admin/yamaha-tsxn237-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha TSXN237 Series Control Spec"
manufacturer: Yamaha
model_family: "TSXN237 Series"
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - "TSXN237 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - wiki.elvis.science
  - community.symcon.de
  - github.com
source_urls:
  - "https://wiki.elvis.science/images/5/5c/Yamaha_Extended_Control_API_Specification_%28Advanced%29.pdf"
  - https://community.symcon.de/uploads/short-url/vRXaJXAn6vI2DSQYMHF0aqLbdir.pdf
  - https://github.com/opctim/yamaha-extended-control-openapi/blob/main/yamaha-extended-control.yaml
retrieved_at: 2026-06-02T00:21:26.799Z
last_checked_at: 2026-06-04T06:37:46.185Z
generated_at: 2026-06-04T06:37:46.185Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP port number not stated (HTTP base URL given without explicit port)"
  - "authentication details — source hints at optional `[/secure]` URI prefix in setLinkAudioQuality but no auth procedure is described in this Advanced document"
  - "Basic API commands (power, input, volume, etc.) are referenced but defined in a separate document not provided here"
  - "port number not stated in source"
  - "source mentions optional `[/secure]` URI prefix for setLinkAudioQuality but auth procedure is not described in this Advanced document"
  - "source shows \"master_left\" and \"slave_right\" examples only; full enum not enumerated"
  - "full value set not enumerated in source"
  - "settable parameters are exposed via the action commands above; no separate variable surface documented in this Advanced spec"
  - "event payload formats and UDP port not specified in source"
  - "no safety warnings, interlocks, or power-sequencing requirements stated in source."
  - "TCP port for HTTP base URL not stated"
  - "authentication mechanism for `/secure` URI variant not described in this document"
  - "full enum of stereo pair status values; only \"master_left\" and \"slave_right\" appear in examples"
  - "UDP port for event unicast not stated"
  - "setClientVolume command referenced in section 9.1.9 but defined in Basic spec (not included here)"
  - "getFeatures, getDeviceInfo, getStatus referenced throughout but defined in Basic spec"
verification:
  verdict: verified
  checked_at: 2026-06-04T06:37:46.185Z
  matched_actions: 10
  action_count: 10
  confidence: medium
  summary: "All 10 advanced API commands matched verbatim in source with correct transport and method signatures. Spec is complete for Advanced API surface. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Yamaha TSXN237 Series Control Spec

## Summary
MusicCast-enabled Yamaha A/V device controlled via Yamaha Extended Control (YXC), an HTTP/REST API over Ethernet/Wi-Fi. This spec covers the Advanced API surface (Link distribution, zone link control, stereo pair query). Basic playback/zone/power commands live in the YXC Basic specification and are not represented here.

<!-- UNRESOLVED: TCP port number not stated (HTTP base URL given without explicit port) -->
<!-- UNRESOLVED: authentication details — source hints at optional `[/secure]` URI prefix in setLinkAudioQuality but no auth procedure is described in this Advanced document -->
<!-- UNRESOLVED: Basic API commands (power, input, volume, etc.) are referenced but defined in a separate document not provided here -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "http://{host}/YamahaExtendedControl"
  port: null  # UNRESOLVED: port number not stated in source
auth:
  type: null  # UNRESOLVED: source mentions optional `[/secure]` URI prefix for setLinkAudioQuality but auth procedure is not described in this Advanced document
```

## Traits
```yaml
- queryable  # inferred from query command examples (getDistributionInfo, getStereoPairInfo)
```

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
      description: Target zone
    - name: control
      type: string
      description: Link Control setting; valid values returned by /system/getFeatures (e.g. "normal", "stability")

- id: set_link_audio_delay
  label: Set Link Audio Delay
  kind: action
  command: "GET /v1/{zone}/setLinkAudioDelay?delay={delay}"
  params:
    - name: zone
      type: enum
      values: [main, zone2, zone3, zone4]
      description: Target zone
    - name: delay
      type: string
      description: Link Audio Delay setting; valid values returned by /system/getFeatures (e.g. "lip_sync")
  notes: Setting is invalid when Link Control is "Stability Boost"

- id: set_link_audio_quality
  label: Set Link Audio Quality
  kind: action
  command: "GET /v1/{zone}/setLinkAudioQuality?mode={mode}"
  params:
    - name: zone
      type: enum
      values: [main, zone2, zone3, zone4]
      description: Target zone
    - name: mode
      type: string
      description: Link Audio Quality setting; valid values returned by /system/getFeatures (e.g. "compressed")
  notes: Source documents an optional secure variant `<BaseURL>/secure/v1/<zone>/setLinkAudioQuality?mode=<mode>`

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
      description: 32-digit hex Group ID; empty string ("") cancels Link distribution server status
    - name: zone
      type: enum
      values: [main, zone2, zone3, zone4]
      description: Target zone for Link distribution server (optional; keeps current setting if omitted)
    - name: type
      type: enum
      values: [add, remove]
      description: Add or remove clients (optional; not needed when cancelling master status)
    - name: client_list
      type: array
      description: IP addresses of clients to add/remove; up to 9 entries (optional)
  notes: JSON POST body. Example body shown in source.

- id: set_client_info
  label: Set Client Info
  kind: action
  command: "POST /v1/dist/setClientInfo"
  params:
    - name: group_id
      type: string
      description: 32-digit hex Group ID; empty string ("") cancels Link distributed client status
    - name: zone
      type: array
      description: Array of zone IDs to be Link distributed client; values from [main, zone2, zone3, zone4] (optional when cancelling client status)
    - name: server_ip_address
      type: string
      description: IP address of the Link distribution server (optional)
  notes: JSON POST body. If device is already configured as Link server, this call is denied - cancel server first via setServerInfo.

- id: start_distribution
  label: Start Distribution
  kind: action
  command: "GET /v1/dist/startDistribution?num={num}"
  params:
    - name: num
      type: integer
      description: Link distribution number on current MusicCast Network
  notes: Valid only on a device configured as Link distribution server

- id: stop_distribution
  label: Stop Distribution
  kind: action
  command: "GET /v1/dist/stopDistribution"
  params: []
  notes: Valid only on a device configured as Link distribution server

- id: set_group_name
  label: Set Group Name
  kind: action
  command: "POST /v1/dist/setGroupName"
  params:
    - name: name
      type: string
      description: Group Name in UTF-8, up to 128 bytes; empty string ("") restores default. Stored in volatile memory.
  notes: JSON POST body.

- id: get_stereo_pair_info
  label: Get Stereo Pair Info
  kind: query
  command: "GET /v1/system/getStereoPairInfo"
  params: []
  notes: Referenced in Application Notes section 9.3; documented via example only
```

## Feedbacks
```yaml
- id: response_code
  type: integer
  description: Returned by every API call. 0 = success; non-zero = error per Response Code List
  values:
    - 0    # Successful request
    - 1    # Initializing
    - 2    # Internal Error
    - 3    # Invalid Request
    - 4    # Invalid Parameter
    - 5    # Guarded
    - 6    # Time Out
    - 99   # Firmware Updating
    - 100  # Access Error (streaming)
    - 101  # Other Errors (streaming)
    - 102  # Wrong User Name
    - 103  # Wrong Password
    - 104  # Account Expired
    - 105  # Account Disconnected
    - 106  # Account Number Limit
    - 107  # Server Maintenance
    - 108  # Invalid Account
    - 109  # License Error
    - 110  # Read Only Mode
    - 111  # Max Stations
    - 112  # Access Denied
    - 113  # Additional Playlist destination required
    - 114  # New Playlist required
    - 115  # Simultaneous login limit reached
    - 200  # Linking in progress
    - 201  # Unlinking in progress

- id: distribution_role
  type: enum
  description: Returned by getDistributionInfo - role of device in Link distribution
  values: [server, client, none]

- id: distribution_status
  type: enum
  description: Returned by getDistributionInfo when role is server - construction state of distribution system (valid for API >= 2.00)
  values: [building, working, deleting]

- id: distribution_server_zone
  type: enum
  description: Returned by getDistributionInfo - target zone that can act as client of distributing server
  values: [main, zone2, zone3, zone4]

- id: distribution_client_list
  type: array
  description: Returned by getDistributionInfo when role is server - array of {ip_address, data_type} where data_type is "base" or "ext"

- id: distribution_group_id
  type: string
  description: Returned by getDistributionInfo - 32-digit hex Group ID; all-zeros means no group

- id: distribution_group_name
  type: string
  description: Returned by getDistributionInfo - current Group Name

- id: distribution_build_disable
  type: array
  description: Returned by getDistributionInfo - array of {role, reasons[]} indicating distribution construction prohibitions; reasons include "unknown", "not_implemented"

- id: distribution_audio_dropout
  type: boolean
  description: Returned by getDistributionInfo - true if sound interruption was detected during distribution. Cleared on CONNECT or Network Module reset.

- id: stereo_pair_status
  type: enum
  description: Returned by getStereoPairInfo - stereo pair role
  values: [master_left, master_right, slave_left, slave_right]  # UNRESOLVED: source shows "master_left" and "slave_right" examples only; full enum not enumerated
  # UNRESOLVED: full value set not enumerated in source

- id: stereo_pair_info
  type: object
  description: Returned by getStereoPairInfo - {alive: boolean, ip_address: string, mac_address: string} for the paired device
```

## Variables
```yaml
# UNRESOLVED: settable parameters are exposed via the action commands above; no separate variable surface documented in this Advanced spec
```

## Events
```yaml
# Source section 9.2 states events are spread as UDP unicast and recommends polling because of UDP packet loss.
# Specific event payload formats are not enumerated in this Advanced document.
# UNRESOLVED: event payload formats and UDP port not specified in source
```

## Macros
```yaml
# Source documents the following multi-step procedures in Application Notes (section 9.1):
- id: create_group
  label: Make a Group (Link Master + Clients)
  description: |
    1. Create a random 16-byte Group ID.
    2. For each client: POST setClientInfo with group_id and zone.
    3. POST setServerInfo on master with group_id, zone, type="add", client_list of client IPs.
    4. GET startDistribution?num=<N> on master with current system distribution number.
    When complete, getDistributionInfo status changes to "working".

- id: remove_client_from_group
  label: Remove Client from Group
  description: |
    1. On the client: POST setClientInfo with group_id="" and the zone array.
    2. On the master: POST setServerInfo with group_id, zone, type="remove", client_list of IPs to remove.
       (If removing all clients, set group_id="" in setServerInfo instead.)
    3. GET startDistribution?num=<N> on master to reflect new distribution number.

- id: add_client_to_group
  label: Add Client to Existing Group
  description: |
    1. On the new client: POST setClientInfo with group_id and zone.
    2. On the master: POST setServerInfo with group_id, zone, type="add", client_list of new client IPs.
    3. GET startDistribution?num=<N> on master to reflect new distribution number.

- id: stereo_pair_distribution
  label: Distribute to Stereo Pair as Clients
  description: |
    1. Confirm pair status via GET getStereoPairInfo on each pair member.
    2. On one pair member (e.g. master_left): POST setClientInfo with group_id, zone, and server_ip_address.
    3. On the distribution server: POST setServerInfo with group_id, zone, type="add", client_list containing the pair-member IP.
    4. GET startDistribution?num=<N> (>=3 per source example) on server.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-sequencing requirements stated in source.
# Source notes operational cautions (e.g. group creation may take up to 2-3 minutes when Link control is "standard"/"stability"; do not interrupt) but no device-safety hazards.
```

## Notes
- Source is "Yamaha Extended Control API Specification (Advanced) Rev. 2.00". Basic playback, volume, input, and power commands are defined in a separate Basic specification not provided here.
- Backward compatibility statement: all APIs with version <= the value returned by getDeviceInfo are supported on a given device.
- JSON responses in the source are formatted for readability; actual responses contain no spaces, indents, or carriage returns.
- Group creation between mixed-generation MusicCast devices (pre-2017 vs 2018+) requires firmware compatibility checks via getFeatures.distribution.compatible_client and getDeviceInfo.netmodule_generation (source section 9.1.1, 9.1.8). For pre-API-2.00 devices, max Group size is 10; for API >= 2.00, max is dictated by getFeatures get_max + 1.
- Group Name is stored in volatile memory only (lost on power cycle).
- Multi-Zone receivers: each zone cannot join a different group independently; Zone A and B must join together as clients; one zone cannot be master and another client in the same group (section 9.1.7).
- Events arrive as UDP unicast with potential packet loss — polling is recommended.
- Group volume control: master records all room volumes at start of operation, then scales client volumes proportionally; sub-unit changes use setClientVolume (defined in Basic spec).

<!-- UNRESOLVED: TCP port for HTTP base URL not stated -->
<!-- UNRESOLVED: authentication mechanism for `/secure` URI variant not described in this document -->
<!-- UNRESOLVED: full enum of stereo pair status values; only "master_left" and "slave_right" appear in examples -->
<!-- UNRESOLVED: UDP port for event unicast not stated -->
<!-- UNRESOLVED: setClientVolume command referenced in section 9.1.9 but defined in Basic spec (not included here) -->
<!-- UNRESOLVED: getFeatures, getDeviceInfo, getStatus referenced throughout but defined in Basic spec -->

## Provenance

```yaml
source_domains:
  - wiki.elvis.science
  - community.symcon.de
  - github.com
source_urls:
  - "https://wiki.elvis.science/images/5/5c/Yamaha_Extended_Control_API_Specification_%28Advanced%29.pdf"
  - https://community.symcon.de/uploads/short-url/vRXaJXAn6vI2DSQYMHF0aqLbdir.pdf
  - https://github.com/opctim/yamaha-extended-control-openapi/blob/main/yamaha-extended-control.yaml
retrieved_at: 2026-06-02T00:21:26.799Z
last_checked_at: 2026-06-04T06:37:46.185Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:37:46.185Z
matched_actions: 10
action_count: 10
confidence: medium
summary: "All 10 advanced API commands matched verbatim in source with correct transport and method signatures. Spec is complete for Advanced API surface. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP port number not stated (HTTP base URL given without explicit port)"
- "authentication details — source hints at optional `[/secure]` URI prefix in setLinkAudioQuality but no auth procedure is described in this Advanced document"
- "Basic API commands (power, input, volume, etc.) are referenced but defined in a separate document not provided here"
- "port number not stated in source"
- "source mentions optional `[/secure]` URI prefix for setLinkAudioQuality but auth procedure is not described in this Advanced document"
- "source shows \"master_left\" and \"slave_right\" examples only; full enum not enumerated"
- "full value set not enumerated in source"
- "settable parameters are exposed via the action commands above; no separate variable surface documented in this Advanced spec"
- "event payload formats and UDP port not specified in source"
- "no safety warnings, interlocks, or power-sequencing requirements stated in source."
- "TCP port for HTTP base URL not stated"
- "authentication mechanism for `/secure` URI variant not described in this document"
- "full enum of stereo pair status values; only \"master_left\" and \"slave_right\" appear in examples"
- "UDP port for event unicast not stated"
- "setClientVolume command referenced in section 9.1.9 but defined in Basic spec (not included here)"
- "getFeatures, getDeviceInfo, getStatus referenced throughout but defined in Basic spec"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
