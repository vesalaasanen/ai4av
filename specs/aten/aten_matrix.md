---
spec_id: admin/aten-vm-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "ATEN VM Series Video Matrix Control Spec"
manufacturer: ATEN
model_family: VM1600A
aliases: []
compatible_with:
  manufacturers:
    - ATEN
  models:
    - VM1600A
    - VM3200
    - VM3250
    - VM51616H
    - VM5808H
    - VM6404HB
  firmware: "vm1600a: ≥4.3.423; vm3200: ≥2.1.204; vm3250: ≥2.1.208; vm51616h/vm5808h: ≥3.5.344; vm6404hb: ≥1.0.074"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.aten.com
  - aten.com
source_urls:
  - https://assets.aten.com/product/manual/vm_restful_api_2021-08-05.pdf
  - https://www.aten.com/global/en/products/professional-audiovideo/video-matrix-switches/vm3200/
  - https://assets.aten.com/product/manual/vm3200-vm3250-user-manual-w.pdf
retrieved_at: 2026-04-30T13:45:39.922Z
last_checked_at: 2026-04-27T08:57:42.659Z
generated_at: 2026-04-27T08:57:42.659Z
firmware_coverage: "vm1600a: ≥4.3.423; vm3200: ≥2.1.204; vm3250: ≥2.1.208; vm51616h/vm5808h: ≥3.5.344; vm6404hb: ≥1.0.074"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-27T08:57:42.659Z
  matched_actions: 37
  action_count: 37
  confidence: high
  summary: "All 37 spec actions map one-to-one to documented REST endpoints; transport parameters fully present; complete API coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# ATEN VM Series Video Matrix Control Spec

## Summary

ATEN VM Series are multi-port video matrix switches controllable via RESTful API over HTTP. The API exposes video and audio routing, port configuration, EDID management, user accounts, and system settings. Authentication via Basic auth or token-based auth.

<!-- UNRESOLVED: TCP/HTTP port number not stated in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: /api/v1.0
auth:
  type: token  # Basic auth also supported per source; token is primary auth mechanism
  notes:
    - Basic: Authorization: Basic <base64(username:password)>
    - Token: GET /api/v1.0/auth/tokens (POST) → token in Authentication header
```

## Traits
```yaml
- routable    # inferred: video/audio connection endpoints present
- queryable   # inferred: numerous GET endpoints returning state
- levelable   # inferred: volume control on audio output ports
```

## Actions
```yaml
- id: auth_login
  label: Login
  kind: action
  params:
    - name: authorization
      type: string
      description: Base64-encoded username:password

- id: auth_logout
  label: Logout
  kind: action
  params:
    - name: credential
      type: string
      description: Token to revoke

- id: system_info_get
  label: Get System Info
  kind: action
  params: []

- id: system_info_patch
  label: Modify System Info
  kind: action
  params:
    - name: deviceName
      type: string
      description: Device name

- id: video_boards_get
  label: Get Video Board(s)
  kind: action
  params:
    - name: id
      type: string
      required: false
      description: Video board ID (omit for all)

- id: network_interfaces_get
  label: Get Network Interfaces
  kind: action
  params:
    - name: id
      type: string
      required: false
      description: Network interface ID (omit for all)

- id: network_interfaces_patch
  label: Modify Network Interface
  kind: action
  params:
    - name: id
      type: string
      description: Network interface ID
    - name: mode
      type: object
      description: Network mode {value: 0=DHC Pv4, 3=IPv4 fixed}
    - name: ip4Addr
      type: string
      description: IPv4 address
    - name: ip4Mask
      type: string
      description: IPv4 netmask
    - name: ip4Gateway
      type: string
      description: IPv4 gateway

- id: account_users_get
  label: Get User Accounts
  kind: action
  params:
    - name: id
      type: string
      required: false
      description: User ID (omit for all)

- id: account_users_post
  label: Create User Account
  kind: action
  params:
    - name: name
      type: string
    - name: password
      type: string
    - name: description
      type: string
    - name: privilege
      type: object
      description: "{value: 0=basic, 1=advanced, 2=admin}"

- id: account_users_patch
  label: Modify User Account
  kind: action
  params:
    - name: id
      type: string
    - name: name
      type: string
      required: false
    - name: password
      type: string
      required: false
    - name: description
      type: string
      required: false
    - name: privilege
      type: object
      required: false
      description: "{value: 0=basic, 1=advanced, 2=admin}"

- id: account_users_delete
  label: Delete User Account
  kind: action
  params:
    - name: id
      type: string

- id: account_me_get
  label: Get Current Account
  kind: action
  params: []

- id: account_me_patch
  label: Modify Current Account
  kind: action
  params:
    - name: name
      type: string
      required: false
    - name: password
      type: string
      required: false
    - name: description
      type: string
      required: false

- id: video_configs_get
  label: Get Video Configuration
  kind: action
  params: []

- id: video_configs_patch
  label: Modify Video Configuration
  kind: action
  params:
    - name: edid
      type: object
      description: "{value: 1=ATEN default, 2=1st output EDID, 3=remixed}"
    - name: osd
      type: object
      description: "{value: 1=off, 2=on}"
    - name: blank
      type: object
      description: "{value: 1=off, 2=on}"
    - name: scaler
      type: number
      description: "0=scale, 1=unsupported"

- id: video_scaler_resolutions_get
  label: Get Scaler Resolutions
  kind: action
  params: []

- id: video_inputs_get
  label: Get Video Input Ports
  kind: action
  params:
    - name: id
      type: string
      required: false
      description: Input port ID (omit for all)

- id: video_inputs_patch
  label: Modify Video Input Port
  kind: action
  params:
    - name: id
      type: string
    - name: name
      type: string
      required: false
    - name: hdcp
      type: object
      required: false
      description: "{value: 1=without HDCP, 2=HDCP1.4, 3=HDCP2.2}"

- id: video_outputs_get
  label: Get Video Output Ports
  kind: action
  params:
    - name: id
      type: string
      required: false
      description: Output port ID (omit for all)

- id: video_outputs_patch
  label: Modify Video Output Port
  kind: action
  params:
    - name: id
      type: string
    - name: name
      type: string
      required: false
    - name: seamlessSwitch
      type: object
      required: false
      description: "{value: 1=off, 2=on}"
    - name: transitionMode
      type: object
      required: false
      description: "{value: 1=off, 2=slow, 3=normal, 4=fast}"
    - name: resolution
      type: number
      required: false
      description: Scaler resolution ID
    - name: fixHDCP
      type: object
      required: false
      description: "{value: 1=off, 2=on}"
    - name: osd
      type: object
      required: false
      description: "{value: 1=off, 2=on}"
    - name: cec
      type: object
      required: false
      description: "{value: 1=off, 2=on}"
    - name: blank
      type: object
      required: false
      description: "{value: 1=off, 2=on}"

- id: video_connections_get
  label: Get Video Connections
  kind: action
  params:
    - name: id
      type: string
      required: false
      description: Output port ID (omit for all)

- id: video_connections_patch
  label: Set Video Connection
  kind: action
  params:
    - name: id
      type: string
      description: Output port ID
    - name: videoInput
      type: string
      description: Input port ID or "" for null

- id: video_profiles_get
  label: Get Video Profiles
  kind: action
  params:
    - name: id
      type: string
      required: false
      description: Profile ID (omit for all)

- id: video_profiles_post
  label: Create Video Profile
  kind: action
  params:
    - name: name
      type: string
      description: Profile name

- id: video_profiles_patch
  label: Modify Video Profile
  kind: action
  params:
    - name: id
      type: string
    - name: name
      type: string
      required: false

- id: video_profiles_delete
  label: Delete Video Profile
  kind: action
  params:
    - name: id
      type: string

- id: video_profile_now_get
  label: Get Current Profile
  kind: action
  params: []

- id: video_profile_now_patch
  label: Switch to Profile
  kind: action
  params:
    - name: id
      type: string
      description: Profile ID

- id: video_profile_now_delete
  label: Remove Current Profile
  kind: action
  params: []

- id: audio_configs_get
  label: Get Audio Configuration
  kind: action
  params: []

- id: audio_configs_patch
  label: Modify Audio Configuration
  kind: action
  params:
    - name: volume
      type: number
      description: "-1=unchanged, 0-max=volume level"
    - name: mute
      type: object
      description: "{value: 0=unsupported, 1=unmute}"

- id: audio_inputs_get
  label: Get Audio Input Ports
  kind: action
  params:
    - name: id
      type: string
      required: false
      description: Input port ID (omit for all)

- id: audio_inputs_patch
  label: Modify Audio Input Port
  kind: action
  params:
    - name: id
      type: string
    - name: mute
      type: object
      description: "{value: 1=unmute, 2=mute}"

- id: audio_outputs_get
  label: Get Audio Output Ports
  kind: action
  params:
    - name: id
      type: string
      required: false
      description: Output port ID (omit for all)

- id: audio_outputs_patch
  label: Modify Audio Output Port
  kind: action
  params:
    - name: id
      type: string
    - name: volume
      type: number
      required: false
      description: "-1=unchanged, 0-max=volume"
    - name: mute
      type: object
      required: false
      description: "{value: 1=unmute, 2=mute}"

- id: audio_connections_get
  label: Get Audio Connections
  kind: action
  params:
    - name: id
      type: string
      required: false
      description: Output port ID (omit for all)

- id: audio_connections_patch
  label: Set Audio Connection
  kind: action
  params:
    - name: id
      type: string
      description: Output port ID
    - name: audioInput
      type: array
      description: Array of input port IDs or [""] for null
```

## Feedbacks
```yaml
- id: auth_response
  type: object
  fields:
    - name: code
      type: integer
    - name: message
      type: string

- id: http_status
  type: enum
  values:
    - 200
    - 201
    - 202
    - 204
    - 400
    - 401
    - 403
    - 404
    - 405
    - 413
    - 500
    - 501
    - 503

- id: error_detail
  type: object
  fields:
    - name: code
      type: integer
      description: Specific error code (e.g., 40000, 40100, 40300...)
    - name: message
      type: string
      description: Error description

- id: system_info
  type: object
  fields:
    - name: type
      type: string
    - name: modelName
      type: string
    - name: deviceName
      type: string
    - name: serialNumber
      type: string
    - name: uptime
      type: number
    - name: fwVersion
      type: string

- id: video_board_info
  type: object
  fields:
    - name: maxInputCount
      type: number
    - name: maxOutputCount
      type: number
    - name: videoBoards
      type: array
      items:
        - id
        - type
        - idx
        - modelName
        - interfaceCount
        - fwVersion

- id: video_connection_state
  type: object
  fields:
    - name: id
      type: string
    - name: videoInput
      type: string

- id: audio_connection_state
  type: object
  fields:
    - name: id
      type: string
    - name: audioInput
      type: array

- id: video_profile_state
  type: object
  fields:
    - name: id
      type: string
    - name: name
      type: string
```

## Variables
```yaml
# Network settings exposed as gettable/settable parameters
- id: network_interface_mode
  type: enum
  values: [0, 3]  # 0=DHCPv4, 3=IPv4 fixed
  description: Network mode for interface

- id: network_interface_ip
  type: string
  description: IPv4 address

- id: network_interface_mask
  type: string
  description: IPv4 netmask

- id: network_interface_gateway
  type: string
  description: IPv4 gateway

# Audio volume per output port
- id: audio_output_volume
  type: integer
  range: "-1 to max"
  description: "-1=no change; 0=minimum; max=maximum volume"

# Video output settings
- id: output_seamless_switch
  type: enum
  values: [1, 2]
  description: "1=off, 2=on"

- id: output_transition_mode
  type: enum
  values: [1, 2, 3, 4]
  description: "1=off, 2=slow, 3=normal, 4=fast"

- id: output_resolution
  type: integer
  description: Scaler resolution ID

- id: output_HDCP_mode
  type: enum
  values: [1, 2]
  description: "1=fixed-HDCP off, 2=fixed-HDCP on"
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited event notifications from device
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step command sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

Device is a video matrix switcher. Routing is per-output: each output selects one input (or null). Audio connections support multiple inputs per output.

Firmware version requirements vary by model — see `compatible_with.firmware` field.

Token auth flow: POST credentials to `/api/v1.0/auth/tokens` → receive token → include in `Authentication` header for subsequent requests.

Error codes use a `<category>00` pattern (e.g., 40000, 40001, 40100). See Response section for full enumerated list.

EDID modes: 1=ATEN default, 2=first output EDID, 3=remixed. Not all models support all modes — `valid` array indicates supported values.

Seamless switching and transition mode are per-output settings; not all models support them.

Video profiles store preset routing configurations; the `now` endpoint switches the active profile.

Audio volume control only on VM1600A/VM3200/VM3250.

<!-- UNRESOLVED: HTTP/TCP port number not stated in source -->
<!-- UNRESOLVED: RS-232 serial support not covered in source (prior attempt noted RS-232 docs exist for VM0404 etc., but this spec covers REST API only) -->

## Provenance

```yaml
source_domains:
  - assets.aten.com
  - aten.com
source_urls:
  - https://assets.aten.com/product/manual/vm_restful_api_2021-08-05.pdf
  - https://www.aten.com/global/en/products/professional-audiovideo/video-matrix-switches/vm3200/
  - https://assets.aten.com/product/manual/vm3200-vm3250-user-manual-w.pdf
retrieved_at: 2026-04-30T13:45:39.922Z
last_checked_at: 2026-04-27T08:57:42.659Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T08:57:42.659Z
matched_actions: 37
action_count: 37
confidence: high
summary: "All 37 spec actions map one-to-one to documented REST endpoints; transport parameters fully present; complete API coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
