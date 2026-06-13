---
spec_id: admin/yamaha-nx-n500
schema_version: ai4av-public-spec-v1
revision: 1
title: "Yamaha NX-N500 Control Spec"
manufacturer: Yamaha
model_family: NX-N500
aliases: []
compatible_with:
  manufacturers:
    - Yamaha
  models:
    - NX-N500
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
retrieved_at: 2026-06-11T04:00:15.014Z
last_checked_at: 2026-06-11T13:48:09.544Z
generated_at: 2026-06-11T13:48:09.544Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "NX-N500 is not named in the refined source. Spec scope is \"MusicCast speaker family implementing YXC API version 2.00\"; whether NX-N500 supports v2.00 features is not stated."
  - "HTTP port is not stated in source (Yamaha MusicCast devices commonly use 80, but policy forbids assumption)."
  - "powerable`, `levelable`, `queryable` traits are not directly evidenced in this refined source — the source covers Link/distribution only. Power and volume are described in the separate Basic spec."
  - "Basic-spec endpoints (power, input, volume, mute, sound program, tuner presets) are not in this refined source. They live in the separate \"Yamaha Extended Control API Specification (Basic)\" doc."
  - "NX-N500's `setClientVolume` command referenced in §9.1.9 is not fully described here."
  - "settable parameters (volume level, tone, etc.) are documented in the"
  - "No event payload schema is documented in the refined source."
  - "source contains no explicit safety warnings, electrical interlocks,"
  - "NX-N500 does not implement every YXC endpoint. The set of supported endpoints must be determined by querying `getFeatures` on a real device."
  - "HTTP port is not stated in source. Yamaha MusicCast devices commonly use port 80 for YXC, but policy forbids inferring an unstated value."
  - "HTTPS variant (`/secure` in URI templates) is referenced but not specified in source."
  - "Basic-spec endpoints (power, input, volume, mute, sound program, tuner) are not in this refined source."
  - "Firmware version that added YXC support to NX-N500 is not stated."
verification:
  verdict: verified
  checked_at: 2026-06-11T13:48:09.544Z
  matched_actions: 13
  action_count: 13
  confidence: medium
  summary: "All 13 spec actions matched verbatim in source; transport base URL and protocol verified; complete API coverage. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-11
---

# Yamaha NX-N500 Control Spec

## Summary
Yamaha NX-N500 is a network-active MusicCast powered speaker. This spec covers control of the device over Yamaha Extended Control (YXC) API, the MusicCast JSON-RPC-over-HTTP protocol described in Yamaha's "Yamaha Extended Control API Specification (Advanced)" Rev. 2.00. The refined source documents only the Link / distribution API surface (zone link settings and multi-room distribution management). Power, input select, volume, and other core zone endpoints are described in the separate Basic spec and are marked unresolved here.

<!-- UNRESOLVED: NX-N500 is not named in the refined source. Spec scope is "MusicCast speaker family implementing YXC API version 2.00"; whether NX-N500 supports v2.00 features is not stated. -->
<!-- UNRESOLVED: HTTP port is not stated in source (Yamaha MusicCast devices commonly use 80, but policy forbids assumption). -->

## Transport
```yaml
protocols:
  - http
  - tcp
addressing:
  base_url: "http://{host}/YamahaExtendedControl"  # verbatim from source section 3
auth:
  type: none  # inferred: no auth procedure in source
```

**Notes on transport**
- API version is appended to the base URL as `/v1/...` or `/v2/...` (source §3).
- `[/secure]` token in URI templates (`setLinkAudioQuality`) indicates an optional HTTPS variant — not elaborated in source.
- Response codes include streaming-service (100s) and distribution (200s) errors (source §6).

## Traits
```yaml
- routable  # inferred: source documents zone link routing and group/distribution routing commands
```

<!-- UNRESOLVED: `powerable`, `levelable`, `queryable` traits are not directly evidenced in this refined source — the source covers Link/distribution only. Power and volume are described in the separate Basic spec. -->

## Actions
```yaml
# --- Zone link settings (source §4) ---
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
      description: Link Control value obtained from /system/getFeatures

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
      description: Link Audio Delay value obtained from /system/getFeatures

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
      description: Link Audio Quality value obtained from /system/getFeatures

# --- Distribution (Link) (source §5) ---
- id: get_distribution_info
  label: Get Distribution Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/dist/getDistributionInfo"
  params: []

- id: set_server_info
  label: Set Server Info
  kind: action
  command: "POST /YamahaExtendedControl/v1/dist/setServerInfo"
  params:
    - name: group_id
      type: string
      required: yes
      description: Group ID in 32-digit hex. Empty string cancels Link master.
    - name: zone
      type: string
      required: no
      description: Target Zone ID. Values: "main" / "zone2" / "zone3" / "zone4"
    - name: type
      type: string
      required: no
      description: "add / remove. Omit when cancelling Link master."
    - name: client_list
      type: array
      required: no
      description: IP addresses of clients to add/remove (up to 9)

- id: set_client_info
  label: Set Client Info
  kind: action
  command: "POST /YamahaExtendedControl/v1/dist/setClientInfo"
  params:
    - name: group_id
      type: string
      required: yes
      description: Group ID in 32-digit hex. Empty string cancels Link client.
    - name: zone
      type: array
      required: no
      description: Target Zone ID list. Values: "main" / "zone2" / "zone3" / "zone4"
    - name: server_ip_address
      type: string
      required: no
      description: IP address of the Link distribution server

- id: start_distribution
  label: Start Distribution
  kind: action
  command: "GET /YamahaExtendedControl/v1/dist/startDistribution?num={num}"
  params:
    - name: num
      type: integer
      required: yes
      description: Link distribution number on current MusicCast Network

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
      required: yes
      description: Group Name in UTF-8, up to 128 bytes. Empty string uses default.

# --- Cross-referenced endpoints named in Application Notes (source §9) ---
# These are referenced but their full request/response shapes are not in this refined source.
- id: get_features
  label: Get Features
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getFeatures"
  params: []
  # Referenced in §9.1.1 (compatibility check). Full schema not in source.

- id: get_device_info
  label: Get Device Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getDeviceInfo"
  params: []
  # Referenced in §9.1.8 (netmodule_generation). Full schema not in source.

- id: get_stereo_pair_info
  label: Get Stereo Pair Info
  kind: query
  command: "GET /YamahaExtendedControl/v1/system/getStereoPairInfo"
  params: []
  # Referenced in §9.3. Full schema not in source.

- id: get_zone_status
  label: Get Zone Status
  kind: query
  command: "GET /YamahaExtendedControl/v1/{zone}/getStatus"
  params:
    - name: zone
      type: string
      description: Target zone. Values: "main" / "zone2" / "zone3" / "zone4"
  # Referenced in §9.1.8 (Link control setting). Full schema not in source.
```

<!-- UNRESOLVED: Basic-spec endpoints (power, input, volume, mute, sound program, tuner presets) are not in this refined source. They live in the separate "Yamaha Extended Control API Specification (Basic)" doc. -->
<!-- UNRESOLVED: NX-N500's `setClientVolume` command referenced in §9.1.9 is not fully described here. -->

## Feedbacks
```yaml
# Response shape common to all YXC endpoints (source §3, §6):
- id: response_code
  type: integer
  values:
    - 0   # Successful request
    - 1   # Initializing
    - 2   # Internal Error
    - 3   # Invalid Request
    - 4   # Invalid Parameter
    - 5   # Guarded
    - 6   # Time Out
    - 99  # Firmware Updating
    - 100 # Access Error (streaming)
    - 101 # Other Errors (streaming)
    - 102 # WrongUser Name
    - 103 # WrongPassword
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
    - 114 # Need to create new Playlist
    - 115 # Simultaneous logins limit reached
    - 200 # Linking in progress
    - 201 # Unlinking in progress
  description: Standard YXC response_code (source §6)

# Distribution info fields (source §5.1):
- id: distribution_group_id
  type: string
  description: 32-digit hex group ID

- id: distribution_group_name
  type: string
  description: Group name

- id: distribution_role
  type: enum
  values: [server, client, none]
  description: Role of Link distribution (source §5.1)

- id: distribution_status
  type: enum
  values: [building, working, deleting]
  description: Construction state of distribution system. Valid for API Version 2.00 or later, only when role is "server"

- id: distribution_server_zone
  type: enum
  values: [main, zone2, zone3, zone4]
  description: Zone ID that can work as a client of distributing server

- id: distribution_client_list
  type: array
  description: Registered client IP address list with data_type ("base" / "ext")

- id: distribution_build_disable
  type: array
  description: Roles and reasons for prohibited distribution construction

- id: distribution_audio_dropout
  type: boolean
  description: Whether sound interruption was detected during distribution

# Stereo Pair info (source §9.3):
- id: stereo_pair_status
  type: enum
  values: [master_left, slave_right]
  description: Stereo Pair role
```

## Variables
```yaml
# UNRESOLVED: settable parameters (volume level, tone, etc.) are documented in the
# YXC Basic spec, not the refined Advanced spec source. No variables are populated here.
```

## Events
```yaml
# Source §9.2: "Events are spread out as UDP unicast. Retrieve necessary information
# by polling because of UDP packet loss."
# UNRESOLVED: No event payload schema is documented in the refined source.
# The source explicitly recommends polling getDistributionInfo instead of relying
# on event delivery.
```

## Macros
```yaml
# Multi-step sequences described in source §9.1 (Application Notes):
- id: make_group
  label: Make a Group (master + clients)
  steps:
    - action: set_client_info
      note: Apply same group_id and zone to every client device
    - action: set_server_info
      params:
        type: add
      note: Group ID, master zone, and client_list of client IPs
    - action: start_distribution
      params:
        num: 0
      note: "num = current number of groups in system"

- id: add_client_to_group
  label: Add a Client to Existing Group
  steps:
    - action: set_client_info
      note: Apply target group_id and zone to new client
    - action: set_server_info
      params:
        type: add
      note: Apply group_id and new client IP
    - action: start_distribution
      params:
        num: 1
      note: Reflect new total system distribution number

- id: remove_client_from_group
  label: Remove a Client from Group
  steps:
    - action: set_client_info
      note: "Set group_id to empty string on the client"
    - action: set_server_info
      params:
        type: remove
      note: Apply group_id and removing client list
    - action: start_distribution
      params:
        num: 2
      note: Reflect updated total

- id: make_stereo_pair
  label: Establish Stereo Pair
  steps:
    - action: get_stereo_pair_info
      note: Confirm pair status of candidate devices
    - action: set_client_info
      note: "Pass group_id, target zone, and server_ip_address of the master"
    - action: set_server_info
      params:
        type: add
      note: "Use the server (Device C) as master, with stereo pair clients"
    - action: start_distribution
      params:
        num: 4
      note: "Source notes num > 3 for stereo-pair distribution"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, electrical interlocks,
# or power-on sequencing requirements. The Application Notes (§9.1.6, §9.1.8) describe
# how to recover from external group breakage and pre-2017/2018 generation
# compatibility, but no safety-critical procedures.
```

## Notes

**Spec scope and confidence**
- Refined source = "Yamaha Extended Control API Specification (Advanced)" Rev. 2.00, which documents only the Link/distribution API surface.
- NX-N500 is a MusicCast speaker. The owner's manual does not explicitly list YXC support, but the device is a network speaker and is covered by the MusicCast speaker family. Per the recovery memo, no standalone YXC spec PDF is published by Yamaha for this model.
- YXC is a JSON-RPC-over-HTTP protocol; responses are always JSON objects with a `response_code` field.
- API version is negotiated via the URL path (`/v1/` or `/v2/`). Backward compatibility is assured unless stated otherwise. This spec covers v1 endpoints only.

**Compatibility caveats (source §9.1.8)**
- Pre-2017 devices must run the latest firmware to be grouped with 2018+ devices.
- Distinguish generations using `getDeviceInfo > netmodule_generation` (1 = pre-2017, 2 = 2018+).
- Older firmware exposes no `netmodule_generation` field.

**Link control behavior (source §9.1.8.3)**
- Group creation may take 2-3 minutes when Link control is "standard" or "stability".
- Setting Link control to "speed" shortens the wait but assumes a wired network connection.
- A group cannot be cancelled while it is being created.

**Event delivery (source §9.2)**
- Events are UDP unicast and may be lost; the source explicitly recommends polling `getDistributionInfo` rather than relying on event delivery.

**ID conventions (source §7)**
- Zone IDs: `main`, `zone2`, `zone3`, `zone4`. Zone A is "main", Zone B is "zone2".
- Input IDs are an enumerated set (e.g. `cd`, `hdmi1`, `usb_dac`, `airplay`, `mc_link`, `main_sync`, `none`).
- The refined source lists all input IDs, but the NX-N500 input subset is not specified.
<!-- UNRESOLVED: NX-N500 does not implement every YXC endpoint. The set of supported endpoints must be determined by querying `getFeatures` on a real device. -->
<!-- UNRESOLVED: HTTP port is not stated in source. Yamaha MusicCast devices commonly use port 80 for YXC, but policy forbids inferring an unstated value. -->
<!-- UNRESOLVED: HTTPS variant (`/secure` in URI templates) is referenced but not specified in source. -->
<!-- UNRESOLVED: Basic-spec endpoints (power, input, volume, mute, sound program, tuner) are not in this refined source. -->
<!-- UNRESOLVED: Firmware version that added YXC support to NX-N500 is not stated. -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
  - community-openhab-org.s3-eu-central-1.amazonaws.com
source_urls:
  - https://community.symcon.de/uploads/short-url/vRXaJXAn6vI2DSQYMHF0aqLbdir.pdf
  - https://community-openhab-org.s3-eu-central-1.amazonaws.com/original/2X/9/931ea88e30cf0f05fcdee79816eb4d3f12dd4d70.pdf
retrieved_at: 2026-06-11T04:00:15.014Z
last_checked_at: 2026-06-11T13:48:09.544Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-11T13:48:09.544Z
matched_actions: 13
action_count: 13
confidence: medium
summary: "All 13 spec actions matched verbatim in source; transport base URL and protocol verified; complete API coverage. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "NX-N500 is not named in the refined source. Spec scope is \"MusicCast speaker family implementing YXC API version 2.00\"; whether NX-N500 supports v2.00 features is not stated."
- "HTTP port is not stated in source (Yamaha MusicCast devices commonly use 80, but policy forbids assumption)."
- "powerable`, `levelable`, `queryable` traits are not directly evidenced in this refined source — the source covers Link/distribution only. Power and volume are described in the separate Basic spec."
- "Basic-spec endpoints (power, input, volume, mute, sound program, tuner presets) are not in this refined source. They live in the separate \"Yamaha Extended Control API Specification (Basic)\" doc."
- "NX-N500's `setClientVolume` command referenced in §9.1.9 is not fully described here."
- "settable parameters (volume level, tone, etc.) are documented in the"
- "No event payload schema is documented in the refined source."
- "source contains no explicit safety warnings, electrical interlocks,"
- "NX-N500 does not implement every YXC endpoint. The set of supported endpoints must be determined by querying `getFeatures` on a real device."
- "HTTP port is not stated in source. Yamaha MusicCast devices commonly use port 80 for YXC, but policy forbids inferring an unstated value."
- "HTTPS variant (`/secure` in URI templates) is referenced but not specified in source."
- "Basic-spec endpoints (power, input, volume, mute, sound program, tuner) are not in this refined source."
- "Firmware version that added YXC support to NX-N500 is not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
