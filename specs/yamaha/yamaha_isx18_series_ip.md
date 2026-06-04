---
spec_id: admin/yamaha-isx18-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha ISX18 Series Control Spec (YXC Advanced API)"
manufacturer: Yamaha
model_family: "ISX18 Series"
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - "ISX18 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
  - community-openhab-org.s3-eu-central-1.amazonaws.com
source_urls:
  - https://community.symcon.de/uploads/short-url/vRXaJXAn6vI2DSQYMHF0aqLbdir.pdf
  - https://community-openhab-org.s3-eu-central-1.amazonaws.com/original/2X/9/931ea88e30cf0f05fcdee79816eb4d3f12dd4d70.pdf
retrieved_at: 2026-06-01T23:52:20.049Z
last_checked_at: 2026-06-04T06:32:27.313Z
generated_at: 2026-06-04T06:32:27.313Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "basic endpoints (power, input, volume, system/getDeviceInfo, system/getFeatures, system/getStatus, system/getStereoPairInfo) are referenced in application notes but not formally defined in this document"
  - "no discrete settable parameters in this Advanced spec beyond the action params above"
  - "no safety warnings, interlock procedures, or power-on sequencing in this source"
  - "explicit TCP port not stated in source (HTTP default 80 implied by http:// scheme but not declared); system endpoints getDeviceInfo / getFeatures / getStatus / getStereoPairInfo are referenced but their request/response schemas are not defined in this Advanced document; firmware version for ISX18 not stated."
verification:
  verdict: verified
  checked_at: 2026-06-04T06:32:27.313Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 spec actions matched exactly to source sections 4.1-5.6; transport URL verified; no missing commands. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Yamaha ISX18 Series Control Spec

## Summary
Yamaha ISX18 Series (MusicCast-enabled). Spec covers the Yamaha Extended Control (YXC) "Advanced" HTTP API (Rev. 2.00), focusing on Link distribution and per-zone Link Control/Audio Delay/Audio Quality endpoints. Basic endpoints (power, input, volume, etc.) live in the separate YXC Basic spec and are out of scope here.

<!-- UNRESOLVED: basic endpoints (power, input, volume, system/getDeviceInfo, system/getFeatures, system/getStatus, system/getStereoPairInfo) are referenced in application notes but not formally defined in this document -->

## Transport
```yaml
protocols:
  - http
  - tcp  # inferred from "communication protocol sent over Ethernet and Wi-Fi"
addressing:
  base_url: "http://{host}/YamahaExtendedControl"  # literal from source; {host} = device IP
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
routable: true  # inferred from Link Control / distribution commands
queryable: true  # inferred from getDistributionInfo query example
# powerable, levelable: out of scope for this Advanced spec
```

## Actions
```yaml
- id: set_link_control
  label: Set Link Control (per zone)
  kind: action
  command: "GET {base_url}/v1/{zone}/setLinkControl?control={control}"
  params:
    - name: zone
      type: string
      description: Target zone
      enum: [main, zone2, zone3, zone4]
    - name: control
      type: string
      description: Link Control setting; valid values from /system/getFeatures

- id: set_link_audio_delay
  label: Set Link Audio Delay (per zone)
  kind: action
  command: "GET {base_url}/v1/{zone}/setLinkAudioDelay?delay={delay}"
  params:
    - name: zone
      type: string
      enum: [main, zone2, zone3, zone4]
    - name: delay
      type: string
      description: Link Audio Delay setting; valid values from /system/getFeatures
  notes: "Invalid when Link Control setting is 'Stability Boost'"

- id: set_link_audio_quality
  label: Set Link Audio Quality (per zone)
  kind: action
  command: "GET {base_url}/v1/{zone}/setLinkAudioQuality?mode={mode}"
  params:
    - name: zone
      type: string
      enum: [main, zone2, zone3, zone4]
    - name: mode
      type: string
      description: Link Audio Quality setting; valid values from /system/getFeatures
  notes: "URI may include /secure prefix per source"

- id: get_distribution_info
  label: Get Distribution Info
  kind: query
  command: "GET {base_url}/v1/dist/getDistributionInfo"
  params: []

- id: set_server_info
  label: Set Link Server (Master)
  kind: action
  command: "POST {base_url}/v1/dist/setServerInfo"
  params:
    - name: group_id
      type: string
      description: Group ID in 32-digit hex; empty string cancels master
    - name: zone
      type: string
      required: false
      enum: [main, zone2, zone3, zone4]
    - name: type
      type: string
      required: false
      enum: [add, remove]
    - name: client_list
      type: array
      required: false
      description: IP addresses of clients; up to 9

- id: set_client_info
  label: Set Link Client
  kind: action
  command: "POST {base_url}/v1/dist/setClientInfo"
  params:
    - name: group_id
      type: string
      description: Group ID in 32-digit hex; empty string cancels client
    - name: zone
      type: array
      required: false
      description: Target zone IDs
    - name: server_ip_address
      type: string
      required: false
      description: IP address of Link distribution server

- id: start_distribution
  label: Start Link Distribution
  kind: action
  command: "GET {base_url}/v1/dist/startDistribution?num={num}"
  params:
    - name: num
      type: integer
      description: Current MusicCast Network distribution number

- id: stop_distribution
  label: Stop Link Distribution
  kind: action
  command: "GET {base_url}/v1/dist/stopDistribution"
  params: []

- id: set_group_name
  label: Set Group Name
  kind: action
  command: "POST {base_url}/v1/dist/setGroupName"
  params:
    - name: name
      type: string
      description: Group name, UTF-8 within 128 bytes; empty = default
  notes: "Group Name stored in volatile memory"
```

## Feedbacks
```yaml
# All actions return response_code; distribution queries also return these:
- id: distribution_role
  type: enum
  values: [server, client, none]

- id: distribution_status
  type: enum
  values: [building, working, deleting]
  description: Valid only when role is Server; API 2.00+

- id: distribution_server_zone
  type: enum
  values: [main, zone2, zone3, zone4]

- id: audio_dropout
  type: boolean
  description: "Cleared on CONNECT or Network Module reset; not cleared on distribution cancel"

- id: response_code
  type: integer
  values: [0, 1, 2, 3, 4, 5, 6, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 200, 201]
  description: "0 = success. 1=init, 2=internal err, 3=invalid req, 4=invalid param, 5=guarded, 6=timeout, 99=fw updating. 100s=streaming, 200s=distribution"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters in this Advanced spec beyond the action params above
```

## Events
```yaml
# Source states: "Events are spread out as UDP unicast. Retrieve necessary information by polling because of UDP packet loss."
# No event subscription/push schema is documented in this source; polling via getDistributionInfo is the documented pattern.
```

## Macros
```yaml
# Source documents a multi-step "Making a Group" sequence:
#   1. setClientInfo on each client (group_id + zone)
#   2. setServerInfo (add) on master (group_id + zone + client_list)
#   3. startDistribution?num=N on master
# See source section 9.1.2 for full ordering; status reaches "working" on completion.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing in this source
```

## Notes
- API version 2.00 required for this Advanced spec. Backward compatibility with prior versions assured unless noted.
- Multi-zone receivers: each zone cannot join another group discretely; Zone A and B must join as clients together.
- Group creation on 2018+ devices as master can take 2-3 minutes; polling getDistributionInfo.status until "working" is the documented sync pattern.
- 2015-2017 devices need latest firmware to interop with 2018+ devices; see source section 9.1.8 compatibility matrix.
- Group max size = getFeatures.get_max + 1 (API 2.00+); was capped at 10 prior to 2.00.
- Source includes ID lists for Zone / Input / Sound Program in section 7 (not reproduced here as structured YAML — these are reference data, not action interfaces).

<!-- UNRESOLVED: explicit TCP port not stated in source (HTTP default 80 implied by http:// scheme but not declared); system endpoints getDeviceInfo / getFeatures / getStatus / getStereoPairInfo are referenced but their request/response schemas are not defined in this Advanced document; firmware version for ISX18 not stated. -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
  - community-openhab-org.s3-eu-central-1.amazonaws.com
source_urls:
  - https://community.symcon.de/uploads/short-url/vRXaJXAn6vI2DSQYMHF0aqLbdir.pdf
  - https://community-openhab-org.s3-eu-central-1.amazonaws.com/original/2X/9/931ea88e30cf0f05fcdee79816eb4d3f12dd4d70.pdf
retrieved_at: 2026-06-01T23:52:20.049Z
last_checked_at: 2026-06-04T06:32:27.313Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:32:27.313Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 spec actions matched exactly to source sections 4.1-5.6; transport URL verified; no missing commands. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "basic endpoints (power, input, volume, system/getDeviceInfo, system/getFeatures, system/getStatus, system/getStereoPairInfo) are referenced in application notes but not formally defined in this document"
- "no discrete settable parameters in this Advanced spec beyond the action params above"
- "no safety warnings, interlock procedures, or power-on sequencing in this source"
- "explicit TCP port not stated in source (HTTP default 80 implied by http:// scheme but not declared); system endpoints getDeviceInfo / getFeatures / getStatus / getStereoPairInfo are referenced but their request/response schemas are not defined in this Advanced document; firmware version for ISX18 not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
