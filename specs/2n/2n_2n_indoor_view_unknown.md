---
spec_id: admin/2n-2n-indoor-view
schema_version: ai4av-public-spec-v1
revision: 1
title: "2N 2N-INDOOR-VIEW Control Spec"
manufacturer: 2N
model_family: 2N-INDOOR-VIEW
aliases: []
compatible_with:
  manufacturers:
    - 2N
  models:
    - 2N-INDOOR-VIEW
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - developer.2n.com
source_urls:
  - https://developer.2n.com/docs/2n-os/api/2-n-os-http-api
retrieved_at: 2026-08-16T15:04:15.438Z
last_checked_at: 2026-08-19T08:26:35.387Z
generated_at: 2026-08-19T08:26:35.387Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes the 2N OS HTTP API generically across 2N devices; per-device capability differences (which endpoints 2N-INDOOR-VIEW actually implements) cannot be determined from this document alone."
  - "source does not state a TCP port number for HTTP/HTTPS API; port depends on"
  - "source does not document unsolicited device-pushed notifications;"
  - "source does not document device-side macro sequences."
  - "source does not contain explicit safety warnings, interlock procedures,"
  - "HTTP/HTTPS TCP port not stated in source (follows device web server port). Firmware version compatibility not stated."
verification:
  verdict: verified
  checked_at: 2026-08-19T08:26:35.387Z
  matched_actions: 68
  action_count: 68
  confidence: medium
  summary: "All 68 spec action units match HTTP method + absolute path in source table; transport base_url /api and Basic auth confirmed verbatim. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-16
---

# 2N 2N-INDOOR-VIEW Control Spec

## Summary

The 2N 2N-INDOOR-VIEW is a 2N OS device controllable over HTTP/HTTPS via the 2N OS HTTP API. This spec covers the device-side HTTP API: REST-style endpoints under `/api/...` for system, switch, I/O, call, audio, display, access, automation, firmware, logging, and configuration control.

<!-- UNRESOLVED: source describes the 2N OS HTTP API generically across 2N devices; per-device capability differences (which endpoints 2N-INDOOR-VIEW actually implements) cannot be determined from this document alone. -->

## Transport

```yaml
protocols:
  - http
# UNRESOLVED: source does not state a TCP port number for HTTP/HTTPS API; port depends on
# device web configuration in Services / HTTP API section.
addressing:
  base_url: "/api"  # source: "absolute path completed with the /api prefix"
auth:
  type: basic  # source: HTTP Basic Auth configurable per-service; Digest also available
  # notes: up to 5 user accounts configurable in Services / HTTP API tab
```

## Traits

```yaml
- powerable  # inferred from /api/system/restart endpoint
- routable   # inferred from /api/switch/ctrl, /api/io/ctrl routing endpoints
- queryable  # inferred from GET endpoints returning device state (status, caps, info)
```

## Actions

```yaml
# Access control
- id: accesspoint_blocking_ctrl
  label: Access Point Blocking Control
  kind: action
  command: "POST /api/accesspoint/blocking/ctrl"
  params: []
- id: accesspoint_blocking_status
  label: Access Point Blocking Status
  kind: query
  command: "GET /api/accesspoint/blocking/status"
  params: []
- id: accesspoint_grantaccess
  label: Access Point Grant Access
  kind: action
  command: "POST /api/accesspoint/grantaccess"
  params: []
- id: lift_grantaccess
  label: Lift Grant Access
  kind: action
  command: "POST /api/lift/grantaccess"
  params: []
- id: lpr_image
  label: LPR Image Upload/Get
  kind: action
  command: "POST /api/lpr/image"
  params: []
- id: lpr_licenseplate
  label: LPR License Plate Submit
  kind: action
  command: "POST /api/lpr/licenseplate"
  params: []

# Audio
- id: audio_test
  label: Audio Test
  kind: action
  command: "POST /api/audio/test"
  params: []

# Automation
- id: automation_trigger
  label: Automation Trigger
  kind: action
  command: "POST /api/automation/trigger/{triggerId}"
  params:
    - name: triggerId
      type: string
      description: Automation trigger identifier (path parameter)

# Phone/Call
- id: call_answer
  label: Call Answer
  kind: action
  command: "POST /api/call/answer"
  params: []
- id: call_dial
  label: Call Dial
  kind: action
  command: "POST /api/call/dial"
  params: []
- id: call_hangup
  label: Call Hangup
  kind: action
  command: "POST /api/call/hangup"
  params: []
- id: call_status
  label: Call Status
  kind: query
  command: "GET /api/call/status"
  params: []

# Camera
- id: camera_caps
  label: Camera Capabilities
  kind: query
  command: "GET /api/camera/caps"
  params: []
- id: camera_snapshot
  label: Camera Snapshot
  kind: query
  command: "GET /api/camera/snapshot"
  params: []

# Certificates
- id: cert_ca
  label: CA Certificate
  kind: action
  command: "PUT /api/cert/ca"
  params: []
- id: cert_csr
  label: Certificate Signing Request
  kind: action
  command: "POST /api/cert/csr"
  params: []
- id: cert_user
  label: User Certificate
  kind: action
  command: "PUT /api/cert/user"
  params: []

# Configuration
- id: config_get
  label: Configuration Get
  kind: query
  command: "GET /api/config"
  params: []
- id: config_set
  label: Configuration Update
  kind: action
  command: "PUT /api/config"
  params: []
- id: config_factoryreset
  label: Configuration Factory Reset
  kind: action
  command: "POST /api/config/factoryreset"
  params: []
- id: config_holidays
  label: Configuration Holidays
  kind: action
  command: "PUT /api/config/holidays"
  params: []

# Directory (Phonebook)
- id: dir_create
  label: Directory Entry Create
  kind: action
  command: "PUT /api/dir/create"
  params: []
- id: dir_delete
  label: Directory Entry Delete
  kind: action
  command: "PUT /api/dir/delete"
  params: []
- id: dir_get
  label: Directory Entry Get
  kind: action
  command: "POST /api/dir/get"
  params: []
- id: dir_query
  label: Directory Query
  kind: action
  command: "POST /api/dir/query"
  params: []
- id: dir_template
  label: Directory Template
  kind: action
  command: "POST /api/dir/template"
  params: []
- id: dir_update
  label: Directory Entry Update
  kind: action
  command: "PUT /api/dir/update"
  params: []

# Display
- id: display_caps
  label: Display Capabilities
  kind: query
  command: "GET /api/display/caps"
  params: []
- id: display_image
  label: Display Image
  kind: action
  command: "PUT /api/display/image"
  params: []
- id: display_language
  label: Display Language
  kind: query
  command: "GET /api/display/language"
  params: []
- id: display_text
  label: Display Text
  kind: action
  command: "PUT /api/display/text"
  params: []

# Email
- id: email_send
  label: Email Send
  kind: action
  command: "POST /api/email/send"
  params: []

# Firmware
- id: firmware_upload
  label: Firmware Upload
  kind: action
  command: "PUT /api/firmware"
  params: []
- id: firmware_apply
  label: Firmware Apply
  kind: action
  command: "POST /api/firmware/apply"
  params: []
- id: firmware_reject
  label: Firmware Reject
  kind: action
  command: "POST /api/firmware/reject"
  params: []

# I/O
- id: io_caps
  label: I/O Capabilities
  kind: query
  command: "GET /api/io/caps"
  params: []
- id: io_ctrl
  label: I/O Control
  kind: action
  command: "POST /api/io/ctrl"
  params: []
- id: io_status
  label: I/O Status
  kind: query
  command: "GET /api/io/status"
  params: []

# Logging
- id: log_caps
  label: Log Capabilities
  kind: query
  command: "GET /api/log/caps"
  params: []
- id: log_pull
  label: Log Pull
  kind: query
  command: "GET /api/log/pull"
  params: []
- id: log_subscribe
  label: Log Subscribe
  kind: action
  command: "POST /api/log/subscribe"
  params: []
- id: log_unsubscribe
  label: Log Unsubscribe
  kind: action
  command: "POST /api/log/unsubscribe"
  params: []

# Packet capture
- id: pcap_get
  label: Packet Capture Get
  kind: action
  command: "POST /api/pcap"
  params: []
- id: pcap_live
  label: Packet Capture Live Start
  kind: action
  command: "POST /api/pcap/live"
  params: []
- id: pcap_live_stats
  label: Packet Capture Live Stats
  kind: action
  command: "POST /api/pcap/live/stats"
  params: []
- id: pcap_live_stop
  label: Packet Capture Live Stop
  kind: action
  command: "POST /api/pcap/live/stop"
  params: []
- id: pcap_restart
  label: Packet Capture Restart
  kind: action
  command: "POST /api/pcap/restart"
  params: []
- id: pcap_stop
  label: Packet Capture Stop
  kind: action
  command: "POST /api/pcap/stop"
  params: []

# Phone
- id: phone_calllog
  label: Phone Call Log
  kind: action
  command: "DELETE /api/phone/calllog"
  params: []
- id: phone_calllog_get
  label: Phone Call Log Get
  kind: query
  command: "GET /api/phone/calllog"
  params: []
- id: phone_config_get
  label: Phone Config Get
  kind: query
  command: "GET /api/phone/config"
  params: []
- id: phone_config_set
  label: Phone Config Update
  kind: action
  command: "PUT /api/phone/config"
  params: []
- id: phone_status
  label: Phone Status
  kind: query
  command: "GET /api/phone/status"
  params: []

# Switch
- id: switch_caps
  label: Switch Capabilities
  kind: query
  command: "GET /api/switch/caps"
  params: []
- id: switch_ctrl
  label: Switch Control
  kind: action
  command: "POST /api/switch/ctrl"
  params: []
- id: switch_status
  label: Switch Status
  kind: query
  command: "GET /api/switch/status"
  params: []

# System
- id: system_caps
  label: System Capabilities
  kind: query
  command: "GET /api/system/caps"
  params: []
- id: system_devicename_get
  label: System Device Name Get
  kind: query
  command: "GET /api/system/devicename"
  params: []
- id: system_devicename_set
  label: System Device Name Set
  kind: action
  command: "POST /api/system/devicename"
  params: []
- id: system_info
  label: System Info
  kind: query
  command: "GET /api/system/info"
  params: []
- id: system_restart
  label: System Restart
  kind: action
  command: "POST /api/system/restart"
  params: []
- id: system_status
  label: System Status
  kind: query
  command: "GET /api/system/status"
  params: []
- id: system_time_get
  label: System Time Get
  kind: query
  command: "GET /api/system/time"
  params: []
- id: system_time_set
  label: System Time Set
  kind: action
  command: "PUT /api/system/time"
  params: []
- id: system_time_set_post
  label: System Time Set (POST)
  kind: action
  command: "POST /api/system/time/set"
  params: []
- id: system_timezone_get
  label: System Timezone Get
  kind: query
  command: "GET /api/system/timezone"
  params: []
- id: system_timezone_set
  label: System Timezone Set
  kind: action
  command: "PUT /api/system/timezone"
  params: []
- id: system_timezone_caps
  label: System Timezone Capabilities
  kind: query
  command: "GET /api/system/timezone/caps"
  params: []
```

## Feedbacks

```yaml
- id: accesspoint_blocking_status
  type: object
  description: Current blocking state for access point
- id: call_status
  type: object
  description: Active call state
- id: camera_caps
  type: object
  description: Camera capability descriptor
- id: camera_snapshot
  type: binary
  description: Snapshot image (Content-Type specified per response)
- id: io_status
  type: object
  description: Current input/output pin states
- id: io_caps
  type: object
  description: I/O capability descriptor
- id: switch_status
  type: object
  description: Switch state(s)
- id: switch_caps
  type: object
  description: Switch capability descriptor
- id: phone_status
  type: object
  description: Phone registration/line state
- id: phone_calllog
  type: array
  description: Call history entries
- id: system_status
  type: object
  description: System-wide status
- id: system_info
  type: object
  description: Serial number, MAC, firmware info
- id: system_caps
  type: object
  description: Device capability descriptor
- id: system_devicename
  type: string
  description: Configured device name
- id: system_time
  type: string
  description: Current device time
- id: system_timezone
  type: string
  description: Configured IANA timezone
- id: display_caps
  type: object
  description: Display capability descriptor
- id: display_language
  type: string
  description: Active display language
- id: log_caps
  type: object
  description: Log facility capabilities
```

## Variables

```yaml
# No continuous settable parameters (e.g. volume, brightness, gain) documented
# in the source API surface for this device class.
```

## Events

```yaml
# UNRESOLVED: source does not document unsolicited device-pushed notifications;
# /api/log/subscribe exists but its event payload shape not described in source.
```

## Macros

```yaml
# UNRESOLVED: source does not document device-side macro sequences.
```

## Safety

```yaml
confirmation_required_for:
  - config_factoryreset
  - firmware_apply
  - firmware_reject
  - cert_ca
  - cert_user
  - cert_csr
  - system_restart
interlocks: []
# UNRESOLVED: source does not contain explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Items above inferred from destructive nature
# of documented operations - flag for operator review before deploying in production.
```

## Notes

- 2N OS HTTP API is a generic interface shared across multiple 2N device families; per-device capability matrix for the 2N-INDOOR-VIEW is not enumerated in this source.
- Successful JSON responses return `{"success": true}` (with optional `result`); errors return `{"success": false, "error": {"code", "description", "param"}}`. Common error codes include 1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19.
- HTTP method semantics in this API: GET/POST both used for command execution and content download (GET via query string, POST via form body); PUT for uploads; DELETE for removal.
- Parameters transfer via URI query string (all methods), `application/x-www-form-urlencoded` body (POST/PUT), or `multipart/form-data` body (POST/PUT). Large blob parameters always prefixed `blob-` and require multipart.
- Authentication configurable per-service: None, Basic, or Digest. Up to 5 user accounts. HTTPS required when service auth is set to methods requiring secure transport (error code 7).
- Built-in test tool: `http(s)://<device_ip>/apitest`.

<!-- UNRESOLVED: HTTP/HTTPS TCP port not stated in source (follows device web server port). Firmware version compatibility not stated. -->

## Provenance

```yaml
source_domains:
  - developer.2n.com
source_urls:
  - https://developer.2n.com/docs/2n-os/api/2-n-os-http-api
retrieved_at: 2026-08-16T15:04:15.438Z
last_checked_at: 2026-08-19T08:26:35.387Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:26:35.387Z
matched_actions: 68
action_count: 68
confidence: medium
summary: "All 68 spec action units match HTTP method + absolute path in source table; transport base_url /api and Basic auth confirmed verbatim. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes the 2N OS HTTP API generically across 2N devices; per-device capability differences (which endpoints 2N-INDOOR-VIEW actually implements) cannot be determined from this document alone."
- "source does not state a TCP port number for HTTP/HTTPS API; port depends on"
- "source does not document unsolicited device-pushed notifications;"
- "source does not document device-side macro sequences."
- "source does not contain explicit safety warnings, interlock procedures,"
- "HTTP/HTTPS TCP port not stated in source (follows device web server port). Firmware version compatibility not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
