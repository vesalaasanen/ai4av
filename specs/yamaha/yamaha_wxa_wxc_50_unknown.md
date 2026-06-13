---
spec_id: admin/yamaha-wxa-wxc-50
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha WXA-50 / WXC-50 MusicCast Extended Control (Advanced) Spec"
manufacturer: Yamaha
model_family: WXA-50
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - WXA-50
    - WXC-50
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
  - usa.yamaha.com
  - manua.ls
  - raw.githubusercontent.com
source_urls:
  - https://community.symcon.de/uploads/short-url/vRXaJXAn6vI2DSQYMHF0aqLbdir.pdf
  - https://usa.yamaha.com/files/download/other_assets/5/805545/web_WXA-50_Advanced_om_UCABGLV_En.pdf
  - https://usa.yamaha.com/files/download/other_assets/0/805550/web_ZU47670_WXA-50_WXC-50_Basic_UCABGLV_EnFrEs.pdf
  - https://www.manua.ls/yamaha/wxc-50/manual
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Basic.pdf
retrieved_at: 2026-06-12T00:29:18.342Z
last_checked_at: 2026-06-12T20:02:35.409Z
generated_at: 2026-06-12T20:02:35.409Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "basic power/input/volume commands live in the separate YXC Basic spec, not in this document. Firmware compatibility range not stated beyond \"API version 2.00 or later\"."
  - "powerable/routable/levelable/queryable traits depend on the separate"
  - "this document documents no settable scalar parameters beyond the"
  - "source mentions UDP unicast events in section 9.2 but does not"
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "firmware version ranges per device generation; YXC Basic spec endpoints; event subscription schema; the [/secure] segment semantics; exact transport port."
verification:
  verdict: verified
  checked_at: 2026-06-12T20:02:35.409Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All nine YXC Advanced API endpoints matched verbatim to source; transport parameters verified; bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Yamaha WXA-50 / WXC-50 MusicCast Extended Control (Advanced) Spec

## Summary
Yamaha Extended Control (YXC) Advanced API specification (Rev. 2.00) for MusicCast-enabled devices including the WXA-50 and WXC-50. This document covers Link/Distribution (multi-room audio grouping) and Zone advanced control over HTTP/TCP. Basic control (power, input, volume) is described in a separate "Yamaha Extended Control API Specification (Basic)" document and is not included here.

<!-- UNRESOLVED: basic power/input/volume commands live in the separate YXC Basic spec, not in this document. Firmware compatibility range not stated beyond "API version 2.00 or later". -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  base_url: http://{host}/YamahaExtendedControl  # per source: <BaseURL> = http://{host}/YamahaExtendedControl
  port: 80  # inferred: HTTP default; source does not state a port number
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# UNRESOLVED: powerable/routable/levelable/queryable traits depend on the separate
# YXC Basic spec, not in this document. Source only evidences:
routable: true  # inferred from distribution / link routing commands
```

## Actions
```yaml
# CRITICAL: this spec covers ONLY the YXC Advanced API endpoints documented in
# the source (Link control + Distribution). Basic control (power, input, volume,
# mute, etc.) is documented in a separate YXC Basic spec and is intentionally
# not enumerated here.

# --- Section 4: Zone Link control ---

- id: set_link_control
  label: Set Link Control
  kind: action
  command: "GET /YamahaExtendedControl/v1/<zone>/setLinkControl?control=<control>"
  params:
    - name: zone
      type: string
      description: Target zone. Values: main / zone2 / zone3 / zone4
    - name: control
      type: string
      description: Link Control setting (values from /system/getFeatures)

- id: set_link_audio_delay
  label: Set Link Audio Delay
  kind: action
  command: "GET /YamahaExtendedControl/v1/<zone>/setLinkAudioDelay?delay=<delay>"
  params:
    - name: zone
      type: string
      description: Target zone. Values: main / zone2 / zone3 / zone4
    - name: delay
      type: string
      description: Link Audio Delay setting (values from /system/getFeatures). Invalid when Link Control is "Stability Boost".

- id: set_link_audio_quality
  label: Set Link Audio Quality
  kind: action
  command: "GET /YamahaExtendedControl[/secure]/v1/<zone>/setLinkAudioQuality?mode=<mode>"
  params:
    - name: zone
      type: string
      description: Target zone. Values: main / zone2 / zone3 / zone4
    - name: mode
      type: string
      description: Link Audio Quality setting (values from /system/getFeatures)

# --- Section 5: Distribution (Link) ---

- id: get_distribution_info
  label: Get Distribution Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/dist/getDistributionInfo"
  params: []

- id: set_server_info
  label: Set Server (Link Master) Info
  kind: action
  command: "POST /YamahaExtendedControl/v1/dist/setServerInfo"
  params:
    - name: group_id
      type: string
      description: Group ID, 32-digit hex. Empty string cancels Link master status.
    - name: zone
      type: string
      description: Target Zone ID (main/zone2/zone3/zone4). Omit to keep current.
    - name: type
      type: string
      description: "add | remove - adds/removes clients. Omit when cancelling."
    - name: client_list
      type: string[]
      description: IP addresses of clients to add/remove. Up to 9.

- id: set_client_info
  label: Set Client (Link Client) Info
  kind: action
  command: "POST /YamahaExtendedControl/v1/dist/setClientInfo"
  params:
    - name: group_id
      type: string
      description: Group ID, 32-digit hex. Empty string cancels client status.
    - name: zone
      type: string[]
      description: Target Zone IDs to be a Link distributed client. main/zone2/zone3/zone4.
    - name: server_ip_address
      type: string
      description: IP address of the Link distribution server.

- id: start_distribution
  label: Start Distribution
  kind: action
  command: "GET /YamahaExtendedControl/v1/dist/startDistribution?num=<num>"
  params:
    - name: num
      type: integer
      description: Current MusicCast Network distribution number.

- id: stop_distribution
  label: Stop Distribution
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
      description: Group Name, UTF-8, up to 128 bytes. Empty uses default.
```

## Feedbacks
```yaml
# Distribution info response (5.1) - observable via get_distribution_info
- id: distribution_group_id
  type: string
  description: Group ID in 32-digit hex.
- id: distribution_group_name
  type: string
  description: Group Name.
- id: distribution_role
  type: enum
  values: [server, client, none]
  description: Role of Link distribution for this device.
- id: distribution_status
  type: enum
  values: [building, working, deleting]
  description: Construction state of distribution. Valid only when role is server.
- id: distribution_server_zone
  type: enum
  values: [main, zone2, zone3, zone4]
  description: Zone ID that can work as a client of distributing server.
- id: distribution_audio_dropout
  type: boolean
  description: Whether sound interruption was detected during distribution.

# Response code (universal across endpoints)
- id: response_code
  type: integer
  description: "0 = success. See Response Code List (200s are distribution-related)."
```

## Variables
```yaml
# UNRESOLVED: this document documents no settable scalar parameters beyond the
# action params above (group_id, delay, control, mode, etc.). No section needed.
```

## Events
```yaml
# UNRESOLVED: source mentions UDP unicast events in section 9.2 but does not
# document a concrete event endpoint, payload schema, or subscription method.
# Section retained as placeholder pending YXC Basic spec or YXC Event spec.
```

## Macros
```yaml
# Multi-step sequences from source section 9.1:
- id: create_group
  label: Create a Link Group (master + clients)
  steps:
    - "POST /v1/dist/setClientInfo on each client with new group_id and target zone"
    - "POST /v1/dist/setServerInfo on master with group_id, type=add, client_list"
    - "GET /v1/dist/startDistribution?num=N on master (N = current network distribution number)"

- id: remove_client_from_group
  label: Remove a client from an existing Group
  steps:
    - "POST /v1/dist/setClientInfo on the client with group_id=\"\" and target zone"
    - "POST /v1/dist/setServerInfo on master with group_id, type=remove, client_list=[client_ip]"
    - "GET /v1/dist/startDistribution?num=N on master"

- id: add_client_to_group
  label: Add a client to an existing Group
  steps:
    - "POST /v1/dist/setClientInfo on the new client with existing group_id and target zone"
    - "POST /v1/dist/setServerInfo on master with group_id, type=add, client_list=[client_ip]"
    - "GET /v1/dist/startDistribution?num=N on master"

- id: cancel_link_master
  label: Cancel this device's Link master status
  steps:
    - "POST /v1/dist/setServerInfo with group_id=\"\" (empty)"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# documented in this (Advanced) spec. Safety material may live in the separate
# YXC Basic spec.
```

## Notes
- YXC Advanced spec (Rev 2.00) covers Link/Distribution only. Basic control (power on/off, input select, volume, mute, sleep, etc.) is in a separate "Yamaha Extended Control API Specification (Basic)" document and is out of scope for this spec.
- Base URL: `http://{host}/YamahaExtendedControl`. Source does not state a port; HTTP default 80 inferred.
- API version is encoded in the URI path (e.g. `/v1/...`). All v1 endpoints listed; v2 endpoints (if any) not in this excerpt.
- `[/secure]` in `setLinkAudioQuality` URI is literal in the source — likely an HTTPS variant, not a placeholder.
- Group volume control (section 9.1.9) requires client-side coordination: temporarily store per-room volumes, change LinkServer and LinkClient volumes at the same ratio, use `setClientVolume` for sub-1-dB steps. The `setClientVolume` endpoint itself is not in this document (likely in YXC Basic).
- Compatibility for Group creation across pre-2017 vs 2018+ devices requires firmware update to latest; see source section 9.1.8 table.
- Group creation can take up to 2-3 minutes when Link Control is "standard" or "stability"; poll `getDistributionInfo` until `status` becomes `working`.
- 2018+ master with pre-2017 client requires latest firmware on the pre-2017 client. Determine via `getDeviceInfo > netmodule_generation` (1 = pre-2017, 2 = 2018+).
- 9.1.7.3: cannot mix master and client zones within the same group on one device. "Main Zone Sync" can form a pseudo-Group (Main Zone as master, Zone2/Zone3 with Main Zone Sync as client) with no actual network distribution.
- Section 9.2 states events are spread as UDP unicast and recommends polling for recovery. No event schema documented here.

<!-- UNRESOLVED: firmware version ranges per device generation; YXC Basic spec endpoints; event subscription schema; the [/secure] segment semantics; exact transport port. -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
  - usa.yamaha.com
  - manua.ls
  - raw.githubusercontent.com
source_urls:
  - https://community.symcon.de/uploads/short-url/vRXaJXAn6vI2DSQYMHF0aqLbdir.pdf
  - https://usa.yamaha.com/files/download/other_assets/5/805545/web_WXA-50_Advanced_om_UCABGLV_En.pdf
  - https://usa.yamaha.com/files/download/other_assets/0/805550/web_ZU47670_WXA-50_WXC-50_Basic_UCABGLV_EnFrEs.pdf
  - https://www.manua.ls/yamaha/wxc-50/manual
  - https://raw.githubusercontent.com/rsc-dev/pyamaha/master/doc/YXC_API_Spec_Basic.pdf
retrieved_at: 2026-06-12T00:29:18.342Z
last_checked_at: 2026-06-12T20:02:35.409Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T20:02:35.409Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All nine YXC Advanced API endpoints matched verbatim to source; transport parameters verified; bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "basic power/input/volume commands live in the separate YXC Basic spec, not in this document. Firmware compatibility range not stated beyond \"API version 2.00 or later\"."
- "powerable/routable/levelable/queryable traits depend on the separate"
- "this document documents no settable scalar parameters beyond the"
- "source mentions UDP unicast events in section 9.2 but does not"
- "no safety warnings, interlock procedures, or power-on sequencing"
- "firmware version ranges per device generation; YXC Basic spec endpoints; event subscription schema; the [/secure] segment semantics; exact transport port."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
