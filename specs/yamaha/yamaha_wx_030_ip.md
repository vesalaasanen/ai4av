---
spec_id: admin/yamaha-wx-030
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha WX-030 Control Spec"
manufacturer: Yamaha
model_family: WX-030
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - WX-030
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
  - community-openhab-org.s3-eu-central-1.amazonaws.com
  - jp.yamaha.com
source_urls:
  - https://community.symcon.de/uploads/short-url/vRXaJXAn6vI2DSQYMHF0aqLbdir.pdf
  - https://community-openhab-org.s3-eu-central-1.amazonaws.com/original/2X/9/931ea88e30cf0f05fcdee79816eb4d3f12dd4d70.pdf
  - https://jp.yamaha.com/products/contents/audio_visual/musiccast/index.html
retrieved_at: 2026-06-12T02:38:16.476Z
last_checked_at: 2026-06-12T20:01:03.992Z
generated_at: 2026-06-12T20:01:03.992Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "basic YXC commands (power, input select, volume, mute) are described in the YXC Basic spec, not this advanced document. Those are out of scope for this revision."
  - "TCP port not stated in source. Default HTTP port (80) is not explicitly stated; do not assume."
  - "TLS/HTTPS not stated in source. The source mentions a `[/secure]` path prefix in section 4.3 but does not specify the port or cert handling."
  - "powerable not directly evidenced in this (advanced) document. The basic YXC spec covers power commands but is not part of this source."
  - "this source documents discrete actions only; no settable scalar parameters beyond those"
  - "source states \"Events are spread out as UDP unicast\" but does not document"
  - "HTTP port not stated in source."
  - "HTTPS/secure-channel details (port, cert) not stated in source."
  - "firmware version compatible with API 2.00 on WX-030 not stated in source."
  - "netmodule_generation and distribution version values are referenced but not enumerated as ID values in this excerpt."
verification:
  verdict: verified
  checked_at: 2026-06-12T20:01:03.992Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 spec actions matched exactly against source endpoints with correct methods, parameters, and transport; no additional commands in source. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Yamaha WX-030 Control Spec

## Summary
Yamaha WX-030 wireless speaker with MusicCast. Controlled over TCP/IP via the Yamaha Extended Control (YXC) HTTP API. This spec covers the advanced/Link-distribution API subset (`/v1/...`) applicable to WX-030 firmware that supports API version 2.00 or later. Basic functions (power, input, volume, etc.) are described in a separate "Basic" YXC specification, not included here.

<!-- UNRESOLVED: basic YXC commands (power, input select, volume, mute) are described in the YXC Basic spec, not this advanced document. Those are out of scope for this revision. -->

## Transport
```yaml
protocols:
  - http  # YXC is an HTTP-based REST API per source Section 3
addressing:
  base_url: http://{host}/YamahaExtendedControl  # Source Section 3 "Base URL"
auth:
  type: none  # inferred: no auth procedure in source
```

<!-- UNRESOLVED: TCP port not stated in source. Default HTTP port (80) is not explicitly stated; do not assume. -->
<!-- UNRESOLVED: TLS/HTTPS not stated in source. The source mentions a `[/secure]` path prefix in section 4.3 but does not specify the port or cert handling. -->

## Traits
```yaml
- routable  # inferred: source documents Link control, setLinkControl, setLinkAudioQuality, setLinkAudioDelay
- queryable  # inferred: getDistributionInfo returns live state
```

<!-- UNRESOLVED: powerable not directly evidenced in this (advanced) document. The basic YXC spec covers power commands but is not part of this source. -->

## Actions
```yaml
- id: set_link_control
  label: Set Link Control (per Zone)
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setLinkControl?control={control}"
  params:
    - name: zone
      type: string
      description: Target zone ("main" / "zone2" / "zone3" / "zone4")
    - name: control
      type: string
      description: Link Control setting value; values reported by /system/getFeatures

- id: set_link_audio_delay
  label: Set Link Audio Delay (per Zone)
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/{zone}/setLinkAudioDelay?delay={delay}"
  params:
    - name: zone
      type: string
      description: Target zone ("main" / "zone2" / "zone3" / "zone4")
    - name: delay
      type: string
      description: Link Audio Delay setting; values reported by /system/getFeatures

- id: set_link_audio_quality
  label: Set Link Audio Quality (per Zone)
  kind: action
  command: "GET http://{host}/YamahaExtendedControl[/secure]/v1/{zone}/setLinkAudioQuality?mode={mode}"
  params:
    - name: zone
      type: string
      description: Target zone ("main" / "zone2" / "zone3" / "zone4")
    - name: mode
      type: string
      description: Link Audio Quality setting; values reported by /system/getFeatures

- id: get_distribution_info
  label: Get Distribution (Link) Info
  kind: query
  command: "GET http://{host}/YamahaExtendedControl/v1/dist/getDistributionInfo"
  params: []

- id: set_server_info
  label: Set Link Distribution Server (Master)
  kind: action
  command: "POST http://{host}/YamahaExtendedControl/v1/dist/setServerInfo"
  body:
    group_id: string  # 32-digit hex; "" to cancel
    zone: string     # optional ("main" / "zone2" / "zone3" / "zone4")
    type: string     # "add" | "remove"
    client_list: array  # up to 9 client IP addresses
  params: []

- id: set_client_info
  label: Set Link Distribution Client(s)
  kind: action
  command: "POST http://{host}/YamahaExtendedControl/v1/dist/setClientInfo"
  body:
    group_id: string  # 32-digit hex; "" to cancel
    zone: array       # ["main", "zone2", ...]
    server_ip_address: string  # optional
  params: []

- id: start_distribution
  label: Start Link Distribution
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/dist/startDistribution?num={num}"
  params:
    - name: num
      type: integer
      description: Current total number of Link distributions on the MusicCast Network

- id: stop_distribution
  label: Stop Link Distribution
  kind: action
  command: "GET http://{host}/YamahaExtendedControl/v1/dist/stopDistribution"
  params: []

- id: set_group_name
  label: Set Group Name
  kind: action
  command: "POST http://{host}/YamahaExtendedControl/v1/dist/setGroupName"
  body:
    name: string  # UTF-8, up to 128 bytes; "" = default
  params: []
```

## Feedbacks
```yaml
- id: distribution_info
  label: Distribution Info
  type: object
  description: |
    Returned by getDistributionInfo. Fields per source Section 5.1:
    - response_code: integer (0 = success, see Section 6)
    - group_id: string (32-digit hex)
    - group_name: string
    - role: enum ("server" | "client" | "none")
    - status: enum ("building" | "working" | "deleting")  # valid only when role=server, API >= 2.00
    - server_zone: enum ("main" | "zone2" | "zone3" | "zone4")
    - client_list: array of {ip_address: string, data_type: enum("base"|"ext")}
    - build_disable: array of {role: enum("server"|"client"), reasons: string[]}
    - audio_dropout: boolean

- id: response_code
  label: Response Code
  type: enum
  values:
    - 0    # Successful request
    - 1    # Initializing
    - 2    # Internal Error
    - 3    # Invalid Request
    - 4    # Invalid Parameter
    - 5    # Guarded
    - 6    # Time Out
    - 99   # Firmware Updating
    - 100  # Access Error
    - 101  # Other Errors
    - 102  # WrongUser Name
    - 103  # WrongPassword
    - 104  # Account Expired
    - 105  # Account Disconnected
    - 106  # Account Number Reached to the Limit
    - 107  # Server Maintenance
    - 108  # Invalid Account
    - 109  # License Error
    - 110  # Read Only Mode
    - 111  # Max Stations
    - 112  # Access Denied
    - 113  # Need additional destination Playlist
    - 114  # Need to create new Playlist
    - 115  # Simultaneous logins reached upper limit
    - 200  # Linking in progress
    - 201  # Unlinking in progress
```

## Variables
```yaml
# UNRESOLVED: this source documents discrete actions only; no settable scalar parameters beyond those
# encoded into the action query/body fields. Section if not applicable, leave as is.
```

## Events
```yaml
# Source Section 9.2 describes polling rather than push events.
# UNRESOLVED: source states "Events are spread out as UDP unicast" but does not document
# a specific event subscription endpoint or payload schema for WX-030. Treat as polling-based.
```

## Macros
```yaml
- id: make_group
  label: Make a Link Group
  description: |
    Sequence from source Section 9.1.2.
  steps:
    - create_group_id: random 16-byte (32 hex char) Group ID
    - set_client_info: POST /v1/dist/setClientInfo on each client (group_id, zone)
    - set_server_info: POST /v1/dist/setServerInfo on master (group_id, zone, type=add, client_list)
    - start_distribution: GET /v1/dist/startDistribution?num=N on master

- id: remove_client
  label: Remove a Client from a Group
  description: |
    Sequence from source Section 9.1.3.
  steps:
    - clear_client: POST /v1/dist/setClientInfo on removed client (group_id="")
    - update_server: POST /v1/dist/setServerInfo on master (type=remove, client_list=[ip])
    - start_distribution: GET /v1/dist/startDistribution?num=N on master

- id: add_client
  label: Add a Client to a Group
  description: |
    Sequence from source Section 9.1.4.
  steps:
    - set_client_info: POST /v1/dist/setClientInfo on new client (group_id, zone)
    - set_server_info: POST /v1/dist/setServerInfo on master (type=add, client_list=[ip])
    - start_distribution: GET /v1/dist/startDistribution?num=N on master
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: |
      If a Device is already setup as the Link distribution server, setClientInfo
      on that device is denied. Caller must first call setServerInfo to cancel
      server status, then verify role != "server" via getDistributionInfo before
      re-issuing setClientInfo. (Source Section 5.3)
  - description: |
      Group creation with 2018+ master can take 2-3 minutes when Link control
      is "standard" or "stability". Source recommends prohibiting other
      operations on the controller UI until getDistributionInfo status == "working".
      (Source Section 9.1.8 #3)
  - description: |
      You cannot cancel creating a Group while it is being processed. (Source 9.1.8 #3)
```

## Notes
- This spec covers the **advanced** YXC API only. The basic YXC spec (power, input, volume, mute, etc.) is a separate document.
- API version 2.00+ is required for fields like `status`, max Group size >10, and the documented `num` parameter behavior.
- Source documents a `[/secure]` path segment on setLinkAudioQuality (Section 4.3) but does not specify the port, certificate, or auth mechanism for the secure variant — leave as UNRESOLVED.
- Group Name is stored in **volatile** memory (Section 5.6).
- Source Section 9.1.7 notes multi-zone receivers have restrictions on which zones can join which groups; WX-030 is single-zone so this is informational only.
- Compatibility between master and client requires `compatible_client` (master) to contain client's distribution `version(major)`; see Section 9.1.1.

<!-- UNRESOLVED: HTTP port not stated in source. -->
<!-- UNRESOLVED: HTTPS/secure-channel details (port, cert) not stated in source. -->
<!-- UNRESOLVED: firmware version compatible with API 2.00 on WX-030 not stated in source. -->
<!-- UNRESOLVED: netmodule_generation and distribution version values are referenced but not enumerated as ID values in this excerpt. -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
  - community-openhab-org.s3-eu-central-1.amazonaws.com
  - jp.yamaha.com
source_urls:
  - https://community.symcon.de/uploads/short-url/vRXaJXAn6vI2DSQYMHF0aqLbdir.pdf
  - https://community-openhab-org.s3-eu-central-1.amazonaws.com/original/2X/9/931ea88e30cf0f05fcdee79816eb4d3f12dd4d70.pdf
  - https://jp.yamaha.com/products/contents/audio_visual/musiccast/index.html
retrieved_at: 2026-06-12T02:38:16.476Z
last_checked_at: 2026-06-12T20:01:03.992Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T20:01:03.992Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 spec actions matched exactly against source endpoints with correct methods, parameters, and transport; no additional commands in source. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "basic YXC commands (power, input select, volume, mute) are described in the YXC Basic spec, not this advanced document. Those are out of scope for this revision."
- "TCP port not stated in source. Default HTTP port (80) is not explicitly stated; do not assume."
- "TLS/HTTPS not stated in source. The source mentions a `[/secure]` path prefix in section 4.3 but does not specify the port or cert handling."
- "powerable not directly evidenced in this (advanced) document. The basic YXC spec covers power commands but is not part of this source."
- "this source documents discrete actions only; no settable scalar parameters beyond those"
- "source states \"Events are spread out as UDP unicast\" but does not document"
- "HTTP port not stated in source."
- "HTTPS/secure-channel details (port, cert) not stated in source."
- "firmware version compatible with API 2.00 on WX-030 not stated in source."
- "netmodule_generation and distribution version values are referenced but not enumerated as ID values in this excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
