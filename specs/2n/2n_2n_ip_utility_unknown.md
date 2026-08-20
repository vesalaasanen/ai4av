---
spec_id: admin/2n-2n-ip-utility
schema_version: ai4av-public-spec-v1
revision: 1
title: "2N 2N-IP-UTILITY Control Spec"
manufacturer: 2N
model_family: 2N-IP-UTILITY
aliases: []
compatible_with:
  manufacturers:
    - 2N
  models:
    - 2N-IP-UTILITY
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - developer.2n.com
source_urls:
  - https://developer.2n.com/docs/2n-os/api/2.50/2-n-ip-http-api
retrieved_at: 2026-08-16T15:04:15.399Z
last_checked_at: 2026-08-19T08:26:43.685Z
generated_at: 2026-08-19T08:26:43.685Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP port not stated in source (default HTTP 80 / HTTPS 443 assumed by user agent)"
  - "parameter schemas for most endpoints not provided in this excerpt"
  - "response body schemas not provided in this excerpt"
  - "port number not stated in source"
  - "per-service auth method not enumerable from this excerpt"
  - "parameter schemas for endpoints not provided in source excerpt"
  - "unsolicited event streams not described in source excerpt (log/subscribe mentioned but event schema absent)"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures stated in source"
  - "TCP port number not stated in source"
  - "per-endpoint request/response payload schemas not in this excerpt"
  - "log/subscribe event push format not described"
verification:
  verdict: verified
  checked_at: 2026-08-19T08:26:43.685Z
  matched_actions: 77
  action_count: 77
  confidence: medium
  summary: "All 77 spec action paths and methods appear verbatim in the source command table; transport base_url and basic auth are supported. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-16
---

# 2N 2N-IP-UTILITY Control Spec

## Summary
Spec covers 2N IP HTTP API for control of 2N devices via HTTP/HTTPS. All requests target absolute paths under `/api` on the device IP. Functions span system, firmware, config, directory, switch, I/O, call, camera, display, email, log, and access control services. Authentication via Basic or Digest per service configuration.

<!-- UNRESOLVED: TCP port not stated in source (default HTTP 80 / HTTPS 443 assumed by user agent) -->
<!-- UNRESOLVED: parameter schemas for most endpoints not provided in this excerpt -->
<!-- UNRESOLVED: response body schemas not provided in this excerpt -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "/api"  # absolute path prefix; full URL = http(s)://<device_ip>/api
  # UNRESOLVED: port number not stated in source
auth:
  type: basic  # Basic or Digest per-service, configured in Services / HTTP API
  # UNRESOLVED: per-service auth method not enumerable from this excerpt
```

## Traits
```yaml
- powerable  # inferred from /api/system/restart (POST)
- queryable  # inferred from /api/system/status, /api/system/info (GET)
- routable  # inferred from /api/switch/ctrl, /api/io/ctrl
```

## Actions
```yaml
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
- id: automation_trigger
  label: Automation Trigger
  kind: action
  command: "POST /api/automation/trigger"
  params: []
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
- id: cert_ca_get
  label: Certificate CA Get
  kind: query
  command: "GET /api/cert/ca"
  params: []
- id: cert_ca_put
  label: Certificate CA Upload
  kind: action
  command: "PUT /api/cert/ca"
  params: []
- id: cert_ca_delete
  label: Certificate CA Delete
  kind: action
  command: "DELETE /api/cert/ca"
  params: []
- id: cert_csr_get
  label: Certificate CSR Get
  kind: query
  command: "GET /api/cert/csr"
  params: []
- id: cert_csr_post
  label: Certificate CSR Submit
  kind: action
  command: "POST /api/cert/csr"
  params: []
- id: cert_csr_put
  label: Certificate CSR Upload
  kind: action
  command: "PUT /api/cert/csr"
  params: []
- id: cert_csr_delete
  label: Certificate CSR Delete
  kind: action
  command: "DELETE /api/cert/csr"
  params: []
- id: cert_user_get
  label: Certificate User Get
  kind: query
  command: "GET /api/cert/user"
  params: []
- id: cert_user_put
  label: Certificate User Upload
  kind: action
  command: "PUT /api/cert/user"
  params: []
- id: cert_user_delete
  label: Certificate User Delete
  kind: action
  command: "DELETE /api/cert/user"
  params: []
- id: config_get
  label: Config Get
  kind: query
  command: "GET /api/config"
  params: []
- id: config_put
  label: Config Upload
  kind: action
  command: "PUT /api/config"
  params: []
- id: config_factoryreset
  label: Factory Reset
  kind: action
  command: "POST /api/config/factoryreset"
  params: []
- id: config_holidays_get
  label: Holidays Config Get
  kind: query
  command: "GET /api/config/holidays"
  params: []
- id: config_holidays_put
  label: Holidays Config Upload
  kind: action
  command: "PUT /api/config/holidays"
  params: []
- id: dir_create
  label: Directory Create
  kind: action
  command: "PUT /api/dir/create"
  params: []
- id: dir_delete
  label: Directory Delete
  kind: action
  command: "PUT /api/dir/delete"
  params: []
- id: dir_get
  label: Directory Get
  kind: query
  command: "POST /api/dir/get"
  params: []
- id: dir_query
  label: Directory Query
  kind: query
  command: "POST /api/dir/query"
  params: []
- id: dir_template
  label: Directory Template Get
  kind: query
  command: "GET /api/dir/template"
  params: []
- id: dir_update
  label: Directory Update
  kind: action
  command: "PUT /api/dir/update"
  params: []
- id: display_caps
  label: Display Capabilities
  kind: query
  command: "GET /api/display/caps"
  params: []
- id: display_image_put
  label: Display Image Upload
  kind: action
  command: "PUT /api/display/image"
  params: []
- id: display_image_delete
  label: Display Image Delete
  kind: action
  command: "DELETE /api/display/image"
  params: []
- id: display_language
  label: Display Language Get
  kind: query
  command: "GET /api/display/language"
  params: []
- id: display_text_put
  label: Display Text Set
  kind: action
  command: "PUT /api/display/text"
  params: []
- id: display_text_delete
  label: Display Text Delete
  kind: action
  command: "DELETE /api/display/text"
  params: []
- id: email_send
  label: Send Email
  kind: action
  command: "POST /api/email/send"
  params: []
- id: firmware_put
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
- id: lift_grantaccess
  label: Lift Grant Access
  kind: action
  command: "POST /api/lift/grantaccess"
  params: []
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
- id: lpr_image
  label: LPR Image Get
  kind: query
  command: "GET /api/lpr/image"
  params: []
- id: lpr_licenseplate
  label: LPR License Plate Submit
  kind: action
  command: "POST /api/lpr/licenseplate"
  params: []
- id: pcap_get
  label: Packet Capture Get
  kind: query
  command: "GET /api/pcap"
  params: []
- id: pcap_live
  label: Packet Capture Live
  kind: query
  command: "GET /api/pcap/live"
  params: []
- id: pcap_live_stats
  label: Packet Capture Live Stats
  kind: query
  command: "GET /api/pcap/live/stats"
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
- id: phone_calllog_get
  label: Phone Call Log Get
  kind: query
  command: "GET /api/phone/calllog"
  params: []
- id: phone_calllog_delete
  label: Phone Call Log Delete
  kind: action
  command: "DELETE /api/phone/calllog"
  params: []
- id: phone_config_get
  label: Phone Config Get
  kind: query
  command: "GET /api/phone/config"
  params: []
- id: phone_config_put
  label: Phone Config Upload
  kind: action
  command: "PUT /api/phone/config"
  params: []
- id: phone_status
  label: Phone Status
  kind: query
  command: "GET /api/phone/status"
  params: []
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
- id: system_devicename_post
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
- id: system_time_put
  label: System Time Set
  kind: action
  command: "PUT /api/system/time"
  params: []
- id: system_time_set
  label: System Time Apply
  kind: action
  command: "POST /api/system/time/set"
  params: []
- id: system_timezone_get
  label: System Timezone Get
  kind: query
  command: "GET /api/system/timezone"
  params: []
- id: system_timezone_put
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
- id: http_status_ok
  type: integer
  values: [200]
  description: "Returned for every successful response AND every application-level error per source."
- id: http_status_unauthorized
  type: integer
  values: [401]
  description: "Returned only when authentication is required and credentials missing/invalid."
- id: success_flag
  type: boolean
  description: "JSON body `success` field - true on success, false on application error."
- id: error_code
  type: integer
  description: "Application-level error code (1-22) from `error.code` when success=false."
- id: error_param
  type: string
  description: "Specific parameter name triggering the error, when applicable."
```

## Variables
```yaml
<!-- UNRESOLVED: parameter schemas for endpoints not provided in source excerpt -->
```

## Events
```yaml
<!-- UNRESOLVED: unsolicited event streams not described in source excerpt (log/subscribe mentioned but event schema absent) -->
```

## Macros
```yaml
<!-- UNRESOLVED: no multi-step sequences described in source -->
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
<!-- UNRESOLVED: no safety warnings or interlock procedures stated in source -->
```

## Notes
HTTP API surface covers 2N devices via `/api/*` absolute paths. Protocol (HTTP vs HTTPS) and per-service auth method (None, Basic, Digest) configured in **Services / HTTP API**. Up to 5 user accounts for granular access control. Built-in tester at `http(s)://<device_ip>/apitest`. Responses: JSON for most endpoints, XML for binary/configuration. GET/POST equivalent for parameter transfer; PUT/DELETE for large objects (firmware, images, sound, config).

<!-- UNRESOLVED: TCP port number not stated in source -->
<!-- UNRESOLVED: per-endpoint request/response payload schemas not in this excerpt -->
<!-- UNRESOLVED: log/subscribe event push format not described -->

## Provenance

```yaml
source_domains:
  - developer.2n.com
source_urls:
  - https://developer.2n.com/docs/2n-os/api/2.50/2-n-ip-http-api
retrieved_at: 2026-08-16T15:04:15.399Z
last_checked_at: 2026-08-19T08:26:43.685Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:26:43.685Z
matched_actions: 77
action_count: 77
confidence: medium
summary: "All 77 spec action paths and methods appear verbatim in the source command table; transport base_url and basic auth are supported. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP port not stated in source (default HTTP 80 / HTTPS 443 assumed by user agent)"
- "parameter schemas for most endpoints not provided in this excerpt"
- "response body schemas not provided in this excerpt"
- "port number not stated in source"
- "per-service auth method not enumerable from this excerpt"
- "parameter schemas for endpoints not provided in source excerpt"
- "unsolicited event streams not described in source excerpt (log/subscribe mentioned but event schema absent)"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures stated in source"
- "TCP port number not stated in source"
- "per-endpoint request/response payload schemas not in this excerpt"
- "log/subscribe event push format not described"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
