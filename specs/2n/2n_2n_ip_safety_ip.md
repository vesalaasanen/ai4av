---
spec_id: admin/2n-2n-ip-safety
schema_version: ai4av-public-spec-v1
revision: 1
title: "2N 2N-IP-SAFETY Control Spec"
manufacturer: 2N
model_family: 2N-IP-Safety
aliases: []
compatible_with:
  manufacturers:
    - 2N
  models:
    - 2N-IP-Safety
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - wiki.2n.com
source_urls:
  - https://wiki.2n.com/download/attachments/123498082/2N_IP_HTTP_API_manual_EN_2.50_LTS.pdf
  - https://wiki.2n.com/hip/hapi/latest/en
  - https://wiki.2n.com/hip/auto/latest/en
  - https://wiki.2n.com/download/attachments/123496966/2N_IP_Automation_Manual_EN_2.50_LTS.pdf
  - https://wiki.2n.com/hip/conf/latest/en/5-konfigurace-interkomu/5-4-sluzby/5-4-5-http-api
retrieved_at: 2026-07-02T03:25:14.740Z
last_checked_at: 2026-07-07T10:58:21.316Z
generated_at: 2026-07-07T10:58:21.316Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "/api/holidays (GET)"
  - "GET /api/system/time/set"
  - "/api/holidays (PUT)"
  - "firmware version compatibility not stated in source"
  - "most variable fields are returned in /api/dir/template responses;"
  - "source does not document multi-step macros explicit sequences beyond"
  - "source mentions \"do not reset or switch off during ~15s after PUT /api/config"
verification:
  verdict: verified
  checked_at: 2026-07-07T10:58:21.316Z
  matched_actions: 85
  action_count: 85
  confidence: medium
  summary: "All 85 spec actions match source endpoints verbatim; transport values (base /api, Digest auth) confirmed; 3 source endpoint+method combinations not represented are below the short threshold. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-02
---

# 2N 2N-IP-SAFETY Control Spec

## Summary
HTTP API control surface for the 2N 2N-IP-SAFETY intercom (and other 2N IP intercom models in the same family). Commands sent as HTTP/HTTPS requests with absolute paths under the `/api` prefix; replies in JSON or XML per endpoint. Optional per-service authentication (None / Basic / Digest).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: /api
auth:
  type: digest  # inferred from source documenting Digest as default auth method
  notes: Per-service configuration: None, Basic, Digest. Recommended HTTPS+Digest.
```

## Traits
```yaml
# - powerable       not supported (no dedicated power command; system restart only)
# - routable        not supported
# - queryable       supported
# - levelable       not supported
```

## Actions
```yaml
- id: system_info
  label: System Info
  kind: query
  command: "GET /api/system/info"
  params: []

- id: system_status
  label: System Status
  kind: query
  command: "GET /api/system/status"
  params: []

- id: system_restart
  label: System Restart
  kind: action
  command: "GET /api/system/restart"
  params: []

- id: system_caps
  label: System Capabilities
  kind: query
  command: "GET /api/system/caps"
  params: []

- id: system_time_get
  label: Get System Time
  kind: query
  command: "GET /api/system/time"
  params: []

- id: system_time_set
  label: Set System Time
  kind: action
  command: "PUT /api/system/time"
  params:
    - name: automatic
      type: integer
      description: "0 or 1. If true, no more parameters required."
    - name: utcTime
      type: integer
      description: "Unix time (seconds since 1970-01-01), range min BuildTime..2147483647."
    - name: server
      type: string
      description: "NTP server IPv4 address or domain."

- id: system_timezone_get
  label: Get Timezone
  kind: query
  command: "GET /api/system/timezone"
  params: []

- id: system_timezone_set
  label: Set Timezone
  kind: action
  command: "PUT /api/system/timezone"
  params:
    - name: automatic
      type: integer
      description: "0 or 1."
    - name: zone
      type: string
      description: "Timezone name (see /api/system/timezone/caps) or 'custom'."
    - name: custom
      type: string
      description: "UTC offset string, e.g. UTC-08:00. Available when zone='custom'."

- id: system_timezone_caps
  label: List Available Timezones
  kind: query
  command: "GET /api/system/timezone/caps"
  params: []

- id: firmware_upload
  label: Upload Firmware
  kind: action
  command: "PUT /api/firmware"
  params:
    - name: blob-fw
      type: file
      description: "Firmware binary file (multipart/form-data)."

- id: firmware_apply
  label: Apply Uploaded Firmware
  kind: action
  command: "GET /api/firmware/apply"
  params:
    - name: fileid
      type: string
      description: "Firmware file identifier (8 HEX characters)."

- id: firmware_reject
  label: Reject Uploaded Firmware
  kind: action
  command: "GET /api/firmware/reject"
  params:
    - name: fileId
      type: string
      description: "Firmware file identifier."

- id: config_get
  label: Get Device Configuration
  kind: query
  command: "GET /api/config"
  params: []

- id: config_put
  label: Upload Device Configuration
  kind: action
  command: "PUT /api/config"
  params:
    - name: blob-cfg
      type: file
      description: "Device configuration file (XML)."

- id: config_factoryreset
  label: Factory Reset
  kind: action
  command: "GET /api/config/factoryreset"
  params:
    - name: section
      type: string
      description: "Optional 'network' resets network settings too (incl. certificates)."

- id: config_holidays_get
  label: Get Bank Holidays
  kind: query
  command: "GET /api/config/holidays"
  params: []

- id: config_holidays_set
  label: Set Bank Holidays
  kind: action
  command: "PUT /api/config/holidays"
  params:
    - name: blob-json
      type: json
      description: "Bank holidays definition JSON: {\"dates\": [\"01/01\", \"24/12\"]}."

- id: switch_caps
  label: Switch Capabilities
  kind: query
  command: "GET /api/switch/caps"
  params:
    - name: switch
      type: integer
      description: "Optional switch id (typically 1..4)."

- id: switch_status
  label: Switch Status
  kind: query
  command: "GET /api/switch/status"
  params:
    - name: switch
      type: integer
      description: "Optional switch id (typically 1..4). Returns all if omitted."

- id: switch_ctrl
  label: Switch Control
  kind: action
  command: "GET /api/switch/ctrl"
  params:
    - name: switch
      type: integer
      description: "Switch id (typically 1..4). Required."
    - name: action
      type: string
      description: "One of: on, off, trigger, lock, unlock, hold, release."
    - name: response
      type: string
      description: "Optional text to return instead of standard JSON."
    - name: timeout
      type: integer
      description: "1..86400 seconds, applies when action=hold."

- id: io_caps
  label: I/O Capabilities
  kind: query
  command: "GET /api/io/caps"
  params:
    - name: port
      type: string
      description: "Optional I/O identifier."

- id: io_status
  label: I/O Status
  kind: query
  command: "GET /api/io/status"
  params:
    - name: port
      type: string
      description: "Optional I/O identifier."

- id: io_ctrl
  label: I/O Control
  kind: action
  command: "GET /api/io/ctrl"
  params:
    - name: port
      type: string
      description: "I/O identifier (see /api/io/caps). Required."
    - name: action
      type: string
      description: "on or off."
    - name: response
      type: string
      description: "Optional text to return instead of standard JSON."

- id: phone_status
  label: Phone Status
  kind: query
  command: "GET /api/phone/status"
  params:
    - name: account
      type: integer
      description: "Optional SIP account (1..4). All accounts if omitted."

- id: phone_calllog_get
  label: Get Call Log
  kind: query
  command: "GET /api/phone/calllog"
  params: []

- id: phone_calllog_delete
  label: Delete Call Log Records
  kind: action
  command: "DELETE /api/phone/calllog"
  params:
    - name: id
      type: string
      description: "Unique identifier of the record to delete."

- id: phone_config_get
  label: Get SIP Account Configuration
  kind: query
  command: "GET /api/phone/config"
  params:
    - name: account
      type: integer
      description: "Optional SIP account id (1..2)."

- id: phone_config_set
  label: Set SIP Account Configuration
  kind: action
  command: "PUT /api/phone/config"
  params:
    - name: blob-json
      type: json
      description: "SIP account configuration JSON object (see source for field map)."

- id: call_status
  label: Active Call Status
  kind: query
  command: "GET /api/call/status"
  params:
    - name: session
      type: integer
      description: "Optional call session id."

- id: call_dial
  label: Initiate Call
  kind: action
  command: "GET /api/call/dial"
  params:
    - name: number
      type: string
      description: "Destination phone number or sip uri. Mutually exclusive with users."
    - name: users
      type: string
      description: "Comma-separated user uuids. Mutually exclusive with number."

- id: call_answer
  label: Answer Call
  kind: action
  command: "GET /api/call/answer"
  params:
    - name: session
      type: integer
      description: "Active incoming call session id."

- id: call_hangup
  label: Hangup Call
  kind: action
  command: "GET /api/call/hangup"
  params:
    - name: session
      type: integer
      description: "Active call session id."
    - name: reason
      type: string
      description: "normal (default) | rejected | busy."

- id: camera_caps
  label: Camera Capabilities
  kind: query
  command: "GET /api/camera/caps"
  params: []

- id: camera_snapshot
  label: Camera Snapshot
  kind: action
  command: "GET /api/camera/snapshot"
  params:
    - name: width
      type: integer
      description: "Horizontal JPEG resolution in pixels (must match /api/camera/caps)."
    - name: height
      type: integer
      description: "Vertical JPEG resolution in pixels (must match /api/camera/caps)."
    - name: source
      type: string
      description: "internal | external."
    - name: fps
      type: integer
      description: "Optional frame rate; ≥1 enables push mode."
    - name: time
      type: integer
      description: "Snapshot time offset <-30,0> seconds. Max resolution 1280x960."

- id: display_caps
  label: Display Capabilities
  kind: query
  command: "GET /api/display/caps"
  params: []

- id: display_image_put
  label: Upload Display Image/Video
  kind: action
  command: "PUT /api/display/image"
  params:
    - name: display
      type: string
      description: "Display identifier (e.g. internal, ext1)."
    - name: blob-image
      type: file
      description: "JPEG/BMP/PNG image. 2N IP Style: 1280x800; Verso: 320x214; Vario: 320x240."
    - name: blob-video
      type: file
      description: "MPEG4/H264 video (Verso), 320x214, max 60s, 15fps."
    - name: duration
      type: integer
      description: "Display time in milliseconds."
    - name: repeat
      type: integer
      description: "Video repeat count (Verso only)."
    - name: displayLayer
      type: string
      description: "top | popup | main | default."

- id: display_image_delete
  label: Delete Display Image
  kind: action
  command: "DELETE /api/display/image"
  params:
    - name: display
      type: string
      description: "Display identifier."
    - name: displayLayer
      type: string
      description: "top | popup | main | default | all."

- id: display_language
  label: Display Language Info
  kind: query
  command: "GET /api/display/language"
  params: []

- id: display_text_set
  label: Set Display Message
  kind: action
  command: "GET /api/display/text"
  params:
    - name: uid
      type: string
      description: "Optional 3rd-party message id, max 40 chars."
    - name: message
      type: array
      description: "Array of {language, text} objects (ISO 639 language codes)."
    - name: text
      type: string
      description: "Freetext alternative, max 1024 chars."
    - name: response
      type: boolean
      description: "Whether message requires response."
    - name: timeout
      type: integer
      description: "Seconds. Max 3600 (response=true) or 1209600 (response=false)."
    - name: icon
      type: string
      description: "none | operator | technician."

- id: display_text_delete
  label: Delete Display Message
  kind: action
  command: "DELETE /api/display/text"
  params: []

- id: log_caps
  label: Log Capabilities
  kind: query
  command: "GET /api/log/caps"
  params: []

- id: log_subscribe
  label: Subscribe to Event Log
  kind: action
  command: "GET /api/log/subscribe"
  params:
    - name: include
      type: string
      description: "new | all | -t (last t seconds)."
    - name: filter
      type: string
      description: "Comma-separated event types."
    - name: duration
      type: integer
      description: "Channel duration in seconds, max 3600."

- id: log_unsubscribe
  label: Unsubscribe Event Log
  kind: action
  command: "GET /api/log/unsubscribe"
  params:
    - name: id
      type: integer
      description: "Subscription channel id."

- id: log_pull
  label: Pull Events from Log
  kind: query
  command: "GET /api/log/pull"
  params:
    - name: id
      type: integer
      description: "Subscription channel id."
    - name: timeout
      type: integer
      description: "Reply delay in seconds if queue empty (default 0)."

- id: audio_test
  label: Audio Loop Test
  kind: action
  command: "GET /api/audio/test"
  params: []

- id: email_send
  label: Send Email
  kind: action
  command: "GET /api/email/send"
  params:
    - name: to
      type: string
      description: "Delivery address. Required."
    - name: subject
      type: string
      description: "Message subject. Required."
    - name: body
      type: string
      description: "Message body, may include HTML."
    - name: pictureCount
      type: integer
      description: "0 or 5 camera snapshots to enclose."
    - name: timeSpan
      type: integer
      description: "Snapshot timespan seconds, default 0."
    - name: width
      type: integer
      description: "Snapshot width in pixels."
    - name: height
      type: integer
      description: "Snapshot height in pixels."

- id: pcap_get
  label: Download Pcap
  kind: action
  command: "GET /api/pcap"
  params: []

- id: pcap_restart
  label: Restart Pcap Recording
  kind: action
  command: "GET /api/pcap/restart"
  params: []

- id: pcap_stop
  label: Stop Pcap Recording
  kind: action
  command: "GET /api/pcap/stop"
  params: []

- id: pcap_live
  label: Start Chunked Pcap
  kind: action
  command: "GET /api/pcap/live"
  params:
    - name: duration
      type: integer
      description: "Capture duration seconds; 0/omitted = indefinite."

- id: pcap_live_stop
  label: Stop Chunked Pcap
  kind: action
  command: "GET /api/pcap/live/stop"
  params: []

- id: pcap_live_stats
  label: Chunked Pcap Stats
  kind: query
  command: "GET /api/pcap/live/stats"
  params: []

- id: dir_template
  label: Directory Entry Template
  kind: query
  command: "GET /api/dir/template"
  params: []

- id: dir_create
  label: Create Directory Entries
  kind: action
  command: "PUT /api/dir/create"
  params:
    - name: force
      type: integer
      description: "Query param: 1 to overwrite existing uuid entry, 0 to error."
    - name: users
      type: array
      description: "JSON array of directory entry objects (see /api/dir/template)."

- id: dir_update
  label: Update Directory Entries
  kind: action
  command: "PUT /api/dir/update"
  params:
    - name: users
      type: array
      description: "JSON array, each object must include uuid."

- id: dir_delete
  label: Delete Directory Entries
  kind: action
  command: "PUT /api/dir/delete"
  params:
    - name: owner
      type: string
      description: "Owner string; deletes all entries with that owner."
    - name: users
      type: array
      description: "JSON array of {uuid} objects."

- id: dir_get
  label: Get Directory Entries
  kind: query
  command: "POST /api/dir/get"
  params:
    - name: fields
      type: array
      description: "JSON array of field names."
    - name: users
      type: array
      description: "JSON array of {uuid} objects."

- id: dir_query
  label: Query Directory by Timestamp
  kind: query
  command: "POST /api/dir/query"
  params:
    - name: series
      type: string
      description: "Optional series token."
    - name: fields
      type: array
      description: "JSON array of field names."
    - name: iterator
      type: object
      description: "{\"timestamp\": int} iterator."

- id: mobilekey_config_get
  label: Get Mobile Key Config
  kind: query
  command: "GET /api/mobilekey/config"
  params: []

- id: mobilekey_config_set
  label: Set Mobile Key Config
  kind: action
  command: "PUT /api/mobilekey/config"
  params:
    - name: location
      type: string
      description: "Location ID, max 127 chars."
    - name: key
      type: object
      description: "Primary encryption key {type, key, ctime}."
    - name: keys
      type: array
      description: "Array of encryption key objects; max 4."

- id: mobilekey_compatibility_get
  label: Get WaveKey Compatibility
  kind: query
  command: "GET /api/mobilekey/compatibility"
  params: []

- id: mobilekey_compatibility_set
  label: Set WaveKey Compatibility
  kind: action
  command: "PUT /api/mobilekey/compatibility"
  params:
    - name: compatibilityMode
      type: boolean
      description: "true or false."

- id: lpr_licenseplate
  label: Submit LPR Event
  kind: action
  command: "POST /api/lpr/licenseplate"
  params:
    - name: lprUuid
      type: string
      description: "Uuid of the LPR event."
    - name: lprID
      type: integer
      description: "Unique ID within one arrival."
    - name: accessPoint
      type: integer
      description: "0 = entry, 1 = exit."
    - name: plateText
      type: string
      description: "License plate, 1..12 chars."
    - name: lprDir
      type: integer
      description: "0..3 motion direction."
    - name: plateImage
      type: string
      description: "Base64-encoded image, max 256 kB."

- id: lpr_image
  label: Get LPR Image
  kind: action
  command: "GET /api/lpr/image"
  params:
    - name: plateText
      type: string
      description: "License plate text."

- id: accesspoint_blocking_ctrl
  label: Access Point Blocking Control
  kind: action
  command: "GET /api/accesspoint/blocking/ctrl"
  params:
    - name: id
      type: integer
      description: "0 = Entry, 1 = Exit."
    - name: action
      type: string
      description: "on | off."

- id: accesspoint_blocking_status
  label: Access Point Blocking Status
  kind: query
  command: "GET /api/accesspoint/blocking/status"
  params:
    - name: id
      type: integer
      description: "Optional 0 or 1. All access points if omitted."

- id: accesspoint_grantaccess
  label: Grant Remote Access
  kind: action
  command: "GET /api/accesspoint/grantaccess"
  params:
    - name: id
      type: integer
      description: "0 = Entry, 1 = Exit."
    - name: user
      type: string
      description: "User uuid."

- id: lift_grantaccess
  label: Lift Floor Access
  kind: action
  command: "GET /api/lift/grantaccess"
  params:
    - name: uuid
      type: string
      description: "User uuid."
    - name: duration
      type: integer
      description: "1..600 seconds; default per device config."

- id: automation_trigger
  label: Trigger Automation
  kind: action
  command: "GET /api/automation/trigger"
  params:
    - name: triggerId
      type: string
      description: "HttpTrigger block name (user defined)."

- id: cert_ca_get
  label: List CA Certificates
  kind: query
  command: "GET /api/cert/ca"
  params:
    - name: id
      type: string
      description: "Optional certificate id (user defined, internal, or fingerprint)."

- id: cert_ca_put
  label: Upload CA Certificate
  kind: action
  command: "PUT /api/cert/ca"
  params:
    - name: blob-cert
      type: file
      description: "Certificate DER or PEM."
    - name: id
      type: string
      description: "Optional user defined id starting with '@', 1..40 chars."

- id: cert_ca_delete
  label: Delete CA Certificate
  kind: action
  command: "DELETE /api/cert/ca"
  params:
    - name: id
      type: string
      description: "Certificate id or fingerprint. Required."

- id: cert_user_get
  label: List User Certificates
  kind: query
  command: "GET /api/cert/user"
  params:
    - name: id
      type: string
      description: "Optional certificate id."

- id: cert_user_put
  label: Upload User Certificate
  kind: action
  command: "PUT /api/cert/user"
  params:
    - name: blob-cert
      type: file
      description: "Certificate DER or PEM."
    - name: blob-pk
      type: file
      description: "Private key DER or PEM."
    - name: password
      type: string
      description: "Optional private key password."
    - name: id
      type: string
      description: "Optional user defined id starting with '@'."

- id: cert_user_delete
  label: Delete User Certificate
  kind: action
  command: "DELETE /api/cert/user"
  params:
    - name: id
      type: string
      description: "Certificate id or fingerprint. Required."

- id: cert_csr_post
  label: Create CSR
  kind: action
  command: "POST /api/cert/csr"
  params:
    - name: commonName
      type: string
      description: "FQDN of device. Required."
    - name: sanMdns
      type: integer
      description: "0|1, include mDNS SAN, default 1."
    - name: sanIp
      type: integer
      description: "0|1, include IPv4 SAN, default 1."
    - name: algorithm
      type: string
      description: "P-256 | P-384 | RSA-2048 | RSA-3072."
    - name: id
      type: string
      description: "Optional user id '@' + 1..40 chars."
    - name: country
      type: string
      description: "ISO 3166 Alpha-2."
    - name: state
      type: string
      description: "1..128 chars."
    - name: locality
      type: string
      description: "1..128 chars."
    - name: organization
      type: string
      description: "1..64 chars."
    - name: organizationalUnit
      type: string
      description: "1..64 chars."
    - name: email
      type: string
      description: "1..254 chars, valid email format."

- id: cert_csr_get
  label: List CSRs
  kind: query
  command: "GET /api/cert/csr"
  params:
    - name: id
      type: string
      description: "Optional CSR id or fingerprint."

- id: cert_csr_put
  label: Upload Certificate to CSR
  kind: action
  command: "PUT /api/cert/csr"
  params:
    - name: id
      type: string
      description: "CSR id or fingerprint. Required."
    - name: blob-cert
      type: file
      description: "Certificate PEM, must match CSR private key."

- id: cert_csr_delete
  label: Delete CSR
  kind: action
  command: "DELETE /api/cert/csr"
  params:
    - name: id
      type: string
      description: "CSR id or fingerprint. Required."

- id: system_user_get
  label: List System Users
  kind: query
  command: "GET /api/system/user"
  params: []

- id: system_user_put
  label: Update System User
  kind: action
  command: "PUT /api/system/user"
  params: []

- id: system_user_delete
  label: Delete System User
  kind: action
  command: "DELETE /api/system/user"
  params: []

- id: system_ca_get
  label: List System CAs
  kind: query
  command: "GET /api/system/ca"
  params: []

- id: system_ca_put
  label: Update System CA
  kind: action
  command: "PUT /api/system/ca"
  params: []

- id: system_ca_delete
  label: Delete System CA
  kind: action
  command: "DELETE /api/system/ca"
  params: []
```

## Feedbacks
```yaml
- id: system_info
  type: object
  description: "Device identification block (devType, variant, variantId, serialNumber, hwVersion, swVersion, buildType, firmwarePackage, deviceName, macAddr)."

- id: system_status
  type: object
  description: "systemTime (Unix seconds), upTime (seconds since last restart)."

- id: switch_state
  type: object
  description: "Per-switch {switch, active, locked, held}."

- id: io_state
  type: object
  description: "Per-port {port, state (0|1)}."

- id: sip_account_status
  type: object
  description: "Per-account {account, enabled, sipNumber, registered}."

- id: call_session
  type: object
  description: "Active call session info (session, direction, state, calls[])."

- id: camera_caps
  type: object
  description: "Available jpegResolution[] and sources[]."

- id: display_caps
  type: object
  description: "Available displays[] with resolution."

- id: display_language
  type: object
  description: "sessionCurrently, default, supported {system, custom}, enabled[]."

- id: success_flag
  type: boolean
  description: "Standard JSON reply {\"success\": true|false}."

- id: error_object
  type: object
  description: "Standard error {\"code\", \"param\", \"description\", \"data?\"}."
```

## Variables
```yaml
# UNRESOLVED: most variable fields are returned in /api/dir/template responses;
# this spec treats them as opaque action payloads rather than typed variables.
```

## Events
```yaml
- id: DeviceState
  payload: {state: "startup"}

- id: AudioLoopTest
  payload: {result: "passed|failed"}

- id: MotionDetected
  payload: {state: "in|out", id: integer}

- id: NoiseDetected
  payload: {state: "in|out"}

- id: KeyPressed
  payload: {key: "0-9|%1-%150|*|#"}

- id: KeyReleased
  payload: {key: "0-9|%1-%150|*|#"}

- id: CodeEntered
  payload: {ap: "0|1", session: int, direction: "in|out|any", code: string, type: string, uuid: string, valid: boolean}

- id: CardEntered
  payload: {ap: "0|1", session: int, direction: "in|out|any", reader: string, uid: string, uuid: string, valid: boolean}

- id: InputChanged
  payload: {port: string, state: boolean}

- id: OutputChanged
  payload: {port: string, state: boolean}

- id: SwitchStateChanged
  payload: {switch: "1-4", state: boolean, originator: "profile|api|ap|rex|idt|dtmf|auth|uni|zone|automation"}

- id: CallStateChanged
  payload: {direction: "incoming|outgoing", state: "connecting|ringing|connected|terminated", peer: string, session: int, call: int}

- id: RegistrationStateChanged
  payload: {sipAccount: "1|2", state: "registered|unregistered|registering|unregistering"}

- id: TamperSwitchActivated
  payload: {state: "in|out"}

- id: UnauthorizedDoorOpen
  payload: {state: "in|out"}

- id: DoorOpenTooLong
  payload: {state: "in|out"}

- id: LoginBlocked
  payload: {address: string}

- id: UserAuthenticated
  payload: {ap: "0|1", session: int, name: string, uuid: string, apbBroken: boolean}

- id: CardHeld
  payload: {ap: "0|1", session: int, direction: "in|out|any", reader: string, uid: string, valid: boolean}

- id: SilentAlarm
  payload: {ap: "0|1", session: int, name: string, uuid: string}

- id: AccessLimited
  payload: {ap: "0|1", type: "card|code|finger", state: "in|out"}

- id: PairingStateChanged
  payload: {state: "pending|inactive|pending_blocked|expired|paired", authId: string}

- id: SwitchesBlocked
  payload: {state: "in|out"}

- id: FingerEntered
  payload: {ap: "0|1", session: int, direction: "in|out|any", uuid: string, valid: boolean}

- id: MobKeyEntered
  payload: {ap: "0|1", session: int, direction: "in|out|any", authid: string, uuid: string, valid: boolean}

- id: DoorStateChanged
  payload: {state: "opened|closed"}

- id: UserRejected
  payload: {ap: "0|1", session: int, name: string, uuid: string, reason: "accessBlocked|switchLocked|invalidTime|invalidProfile|invalidSequence|invalidCredential|authInterrupted|timeout|switchDisabled"}

- id: DisplayTouched
  payload: {x: int, y: int, dx: int, dy: int}

- id: DtmfEntered
  payload: {code: string, type: "uni|user", call: string, valid: boolean}

- id: AccessTaken
  payload: {}

- id: ApLockStateChanged
  payload: {ap: "0|1", state: "in|out"}

- id: RexActivated
  payload: {ap: "0|1", session: int}

- id: LiftStatusChanged
  payload: {module: int, ready: boolean}

- id: LiftFloorsEnabled
  payload: {type: "public|user", floors: array, uuid?: string}

- id: LiftConfigChanged
  payload: {hash: int}

- id: CapabilitiesChanged
  payload: {}

- id: ConfigurationChanged
  payload: {}

- id: HardwareChanged
  payload: {reason: int, class: int, id: string}

- id: DirectoryChanged
  payload: {series: string, timestamp?: int}

- id: DirectorySaved
  payload: {series: string, timestamp?: int}

- id: LicensePlateRecognized
  payload: {ap: int, valid: boolean, licensePlate: string, session?: string, uuid?: string}

- id: ApiAccessRequested
  payload: {ap: int, valid: boolean, session?: string, uuid?: string}

- id: UserActionActivated
  payload: {id: string, state: boolean}

- id: VirtualInput
  payload: {port: string, state: boolean}

- id: VirtualOutput
  payload: {port: string, state: boolean}

- id: WaveKeyActivated
  payload: {type: string}

- id: CallSessionStateChanged
  payload: {session: int, state: string, originator?: string, info?: object}

- id: SwitchOperationChanged
  payload: {switch: int, enabled?: bool, locked?: bool, held?: bool, hold_timeout?: int, originator?: string}

- id: RescueStateChanged
  payload: {state: string, reason: string}

- id: MotionDetectionEvents
  payload: {state: "in|out"}
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macros explicit sequences beyond
# the call flow (dial -> hangup, grant_access -> switch activation).
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset  # /api/config/factoryreset is destructive; ~15s delay during which device must not be powered off
interlocks: []
# UNRESOLVED: source mentions "do not reset or switch off during ~15s after PUT /api/config
# or factoryreset" but exposes no explicit safety flags. No other interlocks documented.
```

## Notes
All endpoints share the `/api` prefix under the device base URL. Endpoints accept GET, POST, PUT, DELETE per the source table; some function as both download (GET) and config upload (PUT/POST). Replies are JSON by default; XML only for `/api/config` download and binary pcap streams. Requests for protected services require authentication (None/Basic/Digest per service). Source recommends HTTPS+Digest for all services. Source documents endpoints shared across 2N IP intercom family (Verso, Vario, Style, Safety) — endpoint availability per device depends on installed firmware/licensing.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - wiki.2n.com
source_urls:
  - https://wiki.2n.com/download/attachments/123498082/2N_IP_HTTP_API_manual_EN_2.50_LTS.pdf
  - https://wiki.2n.com/hip/hapi/latest/en
  - https://wiki.2n.com/hip/auto/latest/en
  - https://wiki.2n.com/download/attachments/123496966/2N_IP_Automation_Manual_EN_2.50_LTS.pdf
  - https://wiki.2n.com/hip/conf/latest/en/5-konfigurace-interkomu/5-4-sluzby/5-4-5-http-api
retrieved_at: 2026-07-02T03:25:14.740Z
last_checked_at: 2026-07-07T10:58:21.316Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T10:58:21.316Z
matched_actions: 85
action_count: 85
confidence: medium
summary: "All 85 spec actions match source endpoints verbatim; transport values (base /api, Digest auth) confirmed; 3 source endpoint+method combinations not represented are below the short threshold. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "/api/holidays (GET)"
- "GET /api/system/time/set"
- "/api/holidays (PUT)"
- "firmware version compatibility not stated in source"
- "most variable fields are returned in /api/dir/template responses;"
- "source does not document multi-step macros explicit sequences beyond"
- "source mentions \"do not reset or switch off during ~15s after PUT /api/config"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
