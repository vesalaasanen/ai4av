---
spec_id: admin/panasonic-aw-xe20-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic AW-xE20 Series Control Spec"
manufacturer: Panasonic
model_family: AW-HE20
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - AW-HE20
    - AW-UE20
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - eww.pass.panasonic.co.jp
source_urls:
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/UE20_CGI/Supplement_for_Web_Control-UE4UE20HE20E.pdf
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/UE20/AW-UE20HE20_InterfaceSpecification_E.pdf
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/RP50_120/RemoteControllerInterfaceSpecifications-E.pdf
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/HE50_120_SERIAL/ConvertibleProtocol.pdf
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/EN/top.html
retrieved_at: 2026-06-15T01:26:21.778Z
last_checked_at: 2026-06-16T07:10:06.081Z
generated_at: 2026-06-16T07:10:06.081Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "PTZ/serial/RS-232/VISCA command set not in this source; covered in separate volume not provided"
  - "HTTP port not stated (URL examples use 192.168.0.10 with no explicit port; configurable 1-65535 via /cgi-bin/network)"
  - "auth mechanism (basic/digest) not specified; only that ID/password may be required for Admin/Live"
  - "port not stated in source (default 80 assumed by http:// examples but not declared; configurable via /cgi-bin/network port=1..65535)"
  - "source describes optional User auth (factory OFF = no auth; ON = ID/password required for Live/Admin). Mechanism (basic/digest) not specified. See Notes."
  - "device may push events via other protocols (not in this CGI supplement)."
  - "source contains no explicit safety warnings, interlock procedures, or power-on sequencing."
  - "PTZ/serial/VISCA command set not in this source (separate volume)"
  - "HTTP port not stated (configurable 1-65535 via /cgi-bin/network)"
  - "auth mechanism (basic/digest) not specified"
  - "firmware version compatibility ranges not stated beyond Ver.1.27 (HE20/UE20) and Ver.2.05 (UE4)"
verification:
  verdict: verified
  checked_at: 2026-06-16T07:10:06.081Z
  matched_actions: 22
  action_count: 22
  confidence: medium
  summary: "All 22 spec CGI endpoints matched literally in source with complete parameter and transport verification. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Panasonic AW-xE20 Series Control Spec

## Summary
Panasonic AW-HE20/AW-UE20 integrated PTZ camera web control interface (CGI supplement for web/network control). HTTP GET/POST CGI endpoints for video transmission (MJPEG/JPEG/H.264/H.265), basic/network/stream settings, restart, RTMP control, and system-log retrieval; RTSP stream URLs for H.264/H.265. This supplement covers network application operation only — pan/tilt/zoom and general camera control live in the separate "HD Integrated Camera Interface Specifications" volume and are NOT covered here.

<!-- UNRESOLVED: PTZ/serial/RS-232/VISCA command set not in this source; covered in separate volume not provided -->
<!-- UNRESOLVED: HTTP port not stated (URL examples use 192.168.0.10 with no explicit port; configurable 1-65535 via /cgi-bin/network) -->
<!-- UNRESOLVED: auth mechanism (basic/digest) not specified; only that ID/password may be required for Admin/Live -->

## Transport
```yaml
protocols:
  - http
# RTSP also supported for stream pull (see Events/Notes); listed below as separate transport.
addressing:
  base_url: "http://<cam_ip>/cgi-bin/"  # <cam_ip> = camera IP address; verbatim from source
  port: null  # UNRESOLVED: port not stated in source (default 80 assumed by http:// examples but not declared; configurable via /cgi-bin/network port=1..65535)
auth:
  type: null  # UNRESOLVED: source describes optional User auth (factory OFF = no auth; ON = ID/password required for Live/Admin). Mechanism (basic/digest) not specified. See Notes.
```

Additional RTSP transport (informational):
```yaml
# RTSP pull URLs from source §6.1 (stream consumption, not control)
# rtsp://<cam_ip>/mediainput/h264/stream_1
# rtsp://<cam_ip>/mediainput/h265/stream_1
```

## Traits
```yaml
# - queryable   # inferred: many GET query CGIs (getuid, get_basic, get_priority_mode, get_video_over_ip, get_network, get_systemlog, get_rtmp_status, get_rtmp_param)
# No powerable/routable/levelable traits inferable from this source (PTZ control in separate volume).
traits:
  - queryable  # inferred from query CGI examples
```

## Actions
```yaml
# All CGIs documented in source. HTTP GET (Live) or GET/POST (Admin).
# command = full path verbatim; params enumerated where the source lists them.

# ===== §2.1 Transmission User Management (Live, GET) =====
- id: get_uid
  label: Get User ID
  kind: query
  command: "/cgi-bin/getuid"
  params:
    - name: FILE
      type: integer
      description: "Fixed value 2"
    - name: vcodec
      type: string
      description: "jpeg | h264 | h265 - codec in use"
    - name: reply
      type: string
      description: "browser | info - response format (omittable)"
  notes: "Response: UID=<id>[CR][LF]"

# ===== §2.2 JPEG / MJPEG transmission (Live, GET) =====
- id: jpeg_stream_connect
  label: JPEG (MJPEG) Stream Connect
  kind: action
  command: "/cgi-bin/jpeg"
  params:
    - name: connect
      type: string
      description: "start | stop"
    - name: framerate
      type: integer
      description: "60Hz/59.94Hz: 10, 30; 50Hz: 10, 25"
    - name: resolution
      type: integer
      description: "640 (640x360) | 1280 (1280x720)"
    - name: UID
      type: integer
      description: "User ID from /cgi-bin/getuid"

- id: mjpeg_stream
  label: MJPEG Stream
  kind: action
  command: "/cgi-bin/mjpeg"
  params:
    - name: resolution
      type: integer
      description: "640 (640x360) | 1280 (1280x720)"
    - name: framerate
      type: integer
      description: "60Hz/59.94Hz: 10, 30; 50Hz: 10, 25 (params omittable)"

- id: jpeg_oneshot_viewcgi
  label: JPEG 1-shot (view.cgi)
  kind: action
  command: "/cgi-bin/view.cgi"
  params:
    - name: action
      type: string
      description: "snapshot"
    - name: page
      type: integer
      description: "Dummy for disabling cache"

- id: jpeg_oneshot_camera
  label: JPEG 1-shot (camera)
  kind: action
  command: "/cgi-bin/camera"
  params:
    - name: resolution
      type: integer
      description: "640 (640x360) | 1280 (1280x720)"
    - name: page
      type: integer
      description: "Dummy for disabling cache"

# ===== §3.1 Basic settings (Admin) =====
- id: set_basic
  label: Set Basic Settings (camera title)
  kind: action
  command: "/cgi-bin/set_basic"
  params:
    - name: cam_title
      type: string
      description: "Camera title (within 20 double-byte characters)"

- id: set_priority_mode
  label: Set Priority Mode
  kind: action
  command: "/cgi-bin/set_priority_mode"
  params:
    - name: mode
      type: string
      description: "ip | usb | ip_4k | usb_4k | hdmi_4k | usb_video_conference"

# ===== §3.2 Video over IP settings (Admin) =====
- id: set_jpeg
  label: JPEG Stream Settings
  kind: action
  command: "/cgi-bin/set_jpeg"
  params:
    - name: resol_stream1
      type: integer
      description: "640 | 1280"
    - name: jpeg_transmit1
      type: integer
      description: "0 (OFF) | 1 (ON)"
    - name: jpeg_interval1
      type: integer
      description: "60Hz/59.94Hz: 10, 30; 50Hz: 10, 25"

- id: set_h264
  label: H.264 Stream Settings
  kind: action
  command: "/cgi-bin/set_h264"
  params:
    - name: h264_transmit
      type: integer
      description: "0 (OFF) | 1 (ON)"
    - name: h264_resolution
      type: integer
      description: "640 | 1280 | 1920 | 3840 (3840 NOT available on AW-HE20)"
    - name: framerate
      type: integer
      description: "60Hz/59.94Hz: 5, 15, 30, 60; 50Hz: 5, 10, 25, 50"

- id: set_h265
  label: H.265 Stream Settings
  kind: action
  command: "/cgi-bin/set_h265"
  params:
    - name: h265_transmit
      type: integer
      description: "0 (OFF) | 1 (ON)"
    - name: h265_resolution
      type: integer
      description: "640 | 1280 | 1920 | 3840 (3840 NOT available on AW-HE20)"
    - name: framerate
      type: integer
      description: "60Hz/59.94Hz: 5, 15, 30, 60; 50Hz: 5, 10, 25, 50"

# ===== §3.3 Network settings (Admin) =====
- id: network_set
  label: Network Settings
  kind: action
  command: "/cgi-bin/network"
  params:
    - name: dhcp
      type: integer
      description: "0 (OFF/static) | 1 (ON)"
    - name: IP_addr1
      type: integer
      description: "IP address first octet (0-255)"
    - name: IP_addr2
      type: integer
      description: "IP address second octet (0-255)"
    - name: IP_addr3
      type: integer
      description: "IP address third octet (0-255)"
    - name: IP_addr4
      type: integer
      description: "IP address fourth octet (0-255)"
    - name: netmask1
      type: integer
      description: "Subnet mask first octet (0-255)"
    - name: netmask2
      type: integer
      description: "Subnet mask second octet (0-255)"
    - name: netmask3
      type: integer
      description: "Subnet mask third octet (0-255)"
    - name: netmask4
      type: integer
      description: "Subnet mask fourth octet (0-255)"
    - name: gateway1
      type: integer
      description: "Default gateway first octet (0-255)"
    - name: gateway2
      type: integer
      description: "Default gateway second octet (0-255)"
    - name: gateway3
      type: integer
      description: "Default gateway third octet (0-255)"
    - name: gateway4
      type: integer
      description: "Default gateway fourth octet (0-255)"
    - name: port
      type: integer
      description: "Port number (1-65535)"
    - name: dns
      type: string
      description: "manual | auto"
    - name: pri_server1
      type: integer
      description: "IPv4 primary DNS first octet (0-255)"
    - name: pri_server2
      type: integer
      description: "IPv4 primary DNS second octet (0-255)"
    - name: pri_server3
      type: integer
      description: "IPv4 primary DNS third octet (0-255)"
    - name: pri_server4
      type: integer
      description: "IPv4 primary DNS fourth octet (0-255)"
    - name: sec_server1
      type: integer
      description: "IPv4 secondary DNS first octet (0-255)"
    - name: sec_server2
      type: integer
      description: "IPv4 secondary DNS second octet (0-255)"
    - name: sec_server3
      type: integer
      description: "IPv4 secondary DNS third octet (0-255)"
    - name: sec_server4
      type: integer
      description: "IPv4 secondary DNS fourth octet (0-255)"
    - name: ip6_addr
      type: string
      description: "IPv6 address (*:*:*:*:*:*:*:* format)"
    - name: ip6_gateway
      type: string
      description: "IPv6 default gateway (*:*:*:*:*:*:*:* format)"
    - name: ip6_pri_server
      type: string
      description: "IPv6 primary server (*:*:*:*:*:*:*:* format)"
    - name: ip6_sec_server
      type: string
      description: "IPv6 secondary server (*:*:*:*:*:*:*:* format)"

- id: easyipset
  label: Easy IP Setup Protocol Setting
  kind: action
  command: "/cgi-bin/easyipset"
  params:
    - name: time
      type: string
      description: "20 (20 min) | unlimited"

# ===== §3.4 Restarting (Admin) =====
- id: initial_reset
  label: Camera Restart
  kind: action
  command: "/cgi-bin/initial"
  params:
    - name: cmd
      type: string
      description: "reset - camera restart"
    - name: Randomnum
      type: string
      description: "Hexadecimal string, 16 single-byte characters"

# ===== §4 Information acquisition (Live/Admin, GET) =====
- id: get_basic
  label: Get Basic Settings
  kind: query
  command: "/cgi-bin/get_basic"
  params: []
  notes: "Response: cam_title=<title>"

- id: get_priority_mode
  label: Get Priority Mode
  kind: query
  command: "/cgi-bin/get_priority_mode"
  params: []
  notes: "Response: priority_mode=<xxx> (see set_priority_mode values)"

- id: get_video_over_ip
  label: Get VideoOverIP Screen Info
  kind: query
  command: "/cgi-bin/get_video_over_ip"
  params: []
  notes: "Response fields in random order; missing ch if transmission not possible. e.g. livestart_stream=jpeg/h264/h265, h264_resolution_ch1=1920, h264_framerate_ch1=5/15(10)/30(25)/60(50)"

- id: get_network
  label: Get Network Settings
  kind: query
  command: "/cgi-bin/get_network"
  params: []
  notes: "Admin level. Response includes ip4_dhcp, ip4_addr, ip4_netmask, ip4_gateway, ip4_pri_server, ip4_sec_server, port, dns, ip6_* fields, time."

- id: get_systemlog
  label: Get System Log
  kind: query
  command: "/cgi-bin/get_systemlog"
  params:
    - name: type
      type: string
      description: "eventlog | errorlog"
    - name: num
      type: integer
      description: "100 (fixed)"
    - name: index
      type: integer
      description: "1 (fixed)"
  notes: "Not available on AW-UE4. Format: no\\mm/dd/yyyy hh:mm\\event code\\description$... (no line feed; \\ between params, $ between entries)"

# ===== §5 RTMP control =====
- id: rtmp_ctrl
  label: RTMP Stream Control
  kind: action
  command: "/cgi-bin/rtmp_ctrl"
  params:
    - name: cmd
      type: string
      description: "start | stop"

- id: get_rtmp_status
  label: Get RTMP Stream Status
  kind: query
  command: "/cgi-bin/get_rtmp_status"
  params: []
  notes: "Response: status=0 (suspended) | 1 (streaming)"

- id: set_rtmp_param
  label: Set RTMP Server
  kind: action
  command: "/cgi-bin/set_rtmp_param"
  params:
    - name: type
      type: integer
      description: "0 (URL+key concatenation) | 1 (URL+key split)"
    - name: url
      type: string
      description: "Server URL"
    - name: key
      type: string
      description: "Stream Key (optional if type=0)"

- id: get_rtmp_param
  label: Get RTMP Server Setting
  kind: query
  command: "/cgi-bin/get_rtmp_param"
  params: []
  notes: "Response: type=0/1, url=<string>, key=<string>"
```

## Feedbacks
```yaml
# Observable states returned by GET queries.
- id: uid_response
  field: UID
  type: integer
  source_query: get_uid
  description: "User ID returned as UID=<n>[CR][LF]"

- id: cam_title_state
  field: cam_title
  type: string
  source_query: get_basic
  description: "Camera title string"

- id: priority_mode_state
  field: priority_mode
  type: enum
  values: [ip, usb, ip_4k, usb_4k, hdmi_4k, usb_video_conference]
  source_query: get_priority_mode

- id: livestart_stream_state
  field: livestart_stream
  type: enum
  values: [jpeg, h264, h265]
  source_query: get_video_over_ip

- id: rtmp_status_state
  field: status
  type: enum
  values: ["0", "1"]
  source_query: get_rtmp_status
  description: "0=stream suspended, 1=during stream"

- id: network_state
  field: network
  type: object
  source_query: get_network
  description: "ip4_*, ip6_*, port, dns, time fields"

- id: rtmp_param_state
  field: rtmp_param
  type: object
  source_query: get_rtmp_param
  description: "type, url, key"

- id: systemlog_state
  field: systemlog
  type: string
  source_query: get_systemlog
  description: "Event/error log entries (see get_systemlog notes for format)"
```

## Variables
```yaml
# Settable parameters exposed via Admin CGIs (not discrete actions).
- id: cam_title
  set_via: set_basic
  type: string
  description: "Camera title (within 20 double-byte characters)"

- id: priority_mode
  set_via: set_priority_mode
  type: enum
  values: [ip, usb, ip_4k, usb_4k, hdmi_4k, usb_video_conference]

- id: jpeg_resolution
  set_via: set_jpeg
  type: enum
  values: ["640", "1280"]

- id: h264_resolution
  set_via: set_h264
  type: enum
  values: ["640", "1280", "1920", "3840"]  # 3840 NOT on AW-HE20

- id: h265_resolution
  set_via: set_h265
  type: enum
  values: ["640", "1280", "1920", "3840"]  # 3840 NOT on AW-HE20

- id: rtmp_server_type
  set_via: set_rtmp_param
  type: enum
  values: ["0", "1"]
```

## Events
```yaml
# No unsolicited notifications documented in this source.
# UNRESOLVED: device may push events via other protocols (not in this CGI supplement).
```

## Macros
```yaml
# MJPEG acquisition sequence documented in §2.3:
#   1. GET /cgi-bin/getuid?FILE=2&vcodec=jpeg&page=<page>
#   2. receive UID=<id>
#   3. GET /cgi-bin/jpeg?connect=start&framerate=30&resolution=640&UID=<UID>
#   4. receive HTTP JPEG stream
#
# JPEG 1-shot sequence documented in §2.4:
#   repeat GET /cgi-bin/camera?resolution=640&page=<n>, <n+1>, <n+2>... with standby between each.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or power-on sequencing.
# Note: /cgi-bin/initial?cmd=reset reboots the camera - treat as disruptive (no explicit warning in source).
```

## Notes
- Source is the "Integrated Camera Interface Specifications — Supplement for Web Control" covering AW-HE20/AW-UE20 (Ver.1.27) and AW-UE4 (Ver.2.05). The companion "HD Integrated Camera Interface Specifications" volume (NOT provided) covers PTZ, serial/RS-232/VISCA, and general camera operation.
- User auth is optional (User auth. menu). Factory default = OFF (no auth needed for Live; Admin requires ID/password). When ON, Live also requires ID/password. Mechanism (HTTP basic/digest) not specified.
- Access levels: Live (video acquisition + camera control) vs Admin (all SETUP controls).
- Priority mode affects which CGIs can execute and parameter value ranges (details in instruction manual, not in source).
- H.264/H.265 3840 (4K) resolution NOT available on AW-HE20.
- get_systemlog NOT available on AW-UE4.
- AW-xE20 series product/family page not found on pro-av.panasonic.net under that exact name; AW-UE20 is the confirmed global sibling. xE20 may be a regional model designation.

<!-- UNRESOLVED: PTZ/serial/VISCA command set not in this source (separate volume) -->
<!-- UNRESOLVED: HTTP port not stated (configurable 1-65535 via /cgi-bin/network) -->
<!-- UNRESOLVED: auth mechanism (basic/digest) not specified -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated beyond Ver.1.27 (HE20/UE20) and Ver.2.05 (UE4) -->
````

## Provenance

```yaml
source_domains:
  - eww.pass.panasonic.co.jp
source_urls:
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/UE20_CGI/Supplement_for_Web_Control-UE4UE20HE20E.pdf
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/UE20/AW-UE20HE20_InterfaceSpecification_E.pdf
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/RP50_120/RemoteControllerInterfaceSpecifications-E.pdf
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/HE50_120_SERIAL/ConvertibleProtocol.pdf
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/EN/top.html
retrieved_at: 2026-06-15T01:26:21.778Z
last_checked_at: 2026-06-16T07:10:06.081Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:10:06.081Z
matched_actions: 22
action_count: 22
confidence: medium
summary: "All 22 spec CGI endpoints matched literally in source with complete parameter and transport verification. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "PTZ/serial/RS-232/VISCA command set not in this source; covered in separate volume not provided"
- "HTTP port not stated (URL examples use 192.168.0.10 with no explicit port; configurable 1-65535 via /cgi-bin/network)"
- "auth mechanism (basic/digest) not specified; only that ID/password may be required for Admin/Live"
- "port not stated in source (default 80 assumed by http:// examples but not declared; configurable via /cgi-bin/network port=1..65535)"
- "source describes optional User auth (factory OFF = no auth; ON = ID/password required for Live/Admin). Mechanism (basic/digest) not specified. See Notes."
- "device may push events via other protocols (not in this CGI supplement)."
- "source contains no explicit safety warnings, interlock procedures, or power-on sequencing."
- "PTZ/serial/VISCA command set not in this source (separate volume)"
- "HTTP port not stated (configurable 1-65535 via /cgi-bin/network)"
- "auth mechanism (basic/digest) not specified"
- "firmware version compatibility ranges not stated beyond Ver.1.27 (HE20/UE20) and Ver.2.05 (UE4)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
